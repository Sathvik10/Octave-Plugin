#include <iostream>
#include <octave-5.1.0/octave/octave.h>
#include <octave-5.1.0/octave/interpreter.h>
#include <octave-5.1.0/octave/unwind-prot.h>

#include "platform.h"
#include "eclrtl.hpp"
#include "jstring.hpp"
#include "hqlplugins.hpp"
#include "eclhelper.hpp"
#include "rtlds_imp.hpp"
#include "jlib.hpp"
#include "jexcept.hpp"
#include "jthread.hpp"
#include "roxiemem.hpp"
#include "nbcd.hpp"
#include "deftype.hpp"

#define OCTAVE_PLUGIN_VERSION "octave plugin 1.0.0"
 bool getECLPluginDefinition(ECLPluginDefinitionBlock *pb)
{
    /*  Warning:    This function may be called without the plugin being loaded fully.
     *              It should not make any library calls or assume that dependent modules
     *              have been loaded or that it has been initialised.
     *
     *              Specifically:  "The system does not call DllMain for process and thread
     *              initialization and termination.  Also, the system does not load
     *              additional executable modules that are referenced by the specified module."
     */

    if (pb->size != sizeof(ECLPluginDefinitionBlock))
        return false;

    pb->magicVersion = PLUGIN_VERSION;
    pb->version = OCTAVE_PLUGIN_VERSION;
    pb->moduleName = "octave";
    pb->ECL = NULL;
    pb->flags = PLUGIN_IMPLICIT_MODULE;
    pb->description = "ECL plugin library for OCTAVE\n";
    return true;
}

__declspec(noreturn) static void UNSUPPORTED(const char *feature) __attribute__((noreturn));

static void UNSUPPORTED(const char *feature)
{
    throw MakeStringException(-1, "UNSUPPORTED feature: %s not supported in Octave plugin", feature);
}

namespace octaveembed {

static int status;
static __thread octave::interpreter * globalState;  // We reuse per thread, for speed
static __thread ThreadTermFunc threadHookChain;

MODULE_INIT(INIT_PRIORITY_STANDARD)
{
   return true;
}

MODULE_EXIT()
{
}

static void releaseContext()
{
   if (globalState)
   {
      delete globalState;
      globalState = nullptr;
   }

   if (threadHookChain)
   {
      (*threadHookChain)();
      threadHookChain = nullptr;
   }
}

class OctaveObjectAccessor
{
public:
   OctaveObjectAccessor(bool _inDataSet)
   :inSet(false), inDataSet(_inDataSet), idx(0)
   {
   }

protected:
   void pushResult(octave_value _result)
   {
      list.append(_result);
   }

   octave_value popResult()
   {
      octave_value emptyResult;
      if (list.empty())
      {
         return emptyResult;
      }
      emptyResult = list.popGet();
      return emptyResult;
   }

   void pushIdx()
   {
      idxStack.append(idx);
      idx = 0;
   }

   void popIdx()
   {
      idx = idxStack.popGet();
      if (!inDataSet)
         setSize = 0;
   }

   void pushSize()
   {
      sizeStack.append(setSize);
   }

   void popSize()
   {
      setSize = sizeStack.popGet();
   }

   void pushSArray(bool value)
   {
      structStack.append(value);
   }

   bool popSArray()
   {
      return structStack.popGet();
   }

   void pushMapValue(octave_map value)
   {
      mapList.append(value);
   }

   octave_map popMapValue()
   {
      octave_map mResult;
      if (mapList.empty())
         return mResult;
      mResult = mapList.popGet();
      return mResult;
   }

   ArrayOf<octave_map> mapList;
   IntArray sizeStack;
   BoolArray structStack;
   ArrayOf<octave_value> list;
   bool inSet;
   bool inDataSet;
   int setSize;
   int idx;
   IntArray idxStack;
};

class OctaveRowBuilder : public OctaveObjectAccessor, public CInterfaceOf<IFieldSource>
{
public:
   OctaveRowBuilder(octave_value __result, const RtlFieldInfo *__outerRow, bool _inDataset)
   :OctaveObjectAccessor(_inDataset), outerRow(__outerRow), row(__result), structArray(false)
   {
   }

   ~OctaveRowBuilder()
   {
   }

   virtual bool getBooleanResult(const RtlFieldInfo *field)
   {
      if (inSet || inDataSet)
      {
         return vectorSet.elem(idx++);
      }

      result = getResult(field);
      if (result.islogical())
      {
         return result.bool_value();
      }
   }

   virtual void getDataResult(const RtlFieldInfo *field, size32_t &len, void * &result){}
   virtual double getRealResult(const RtlFieldInfo *field)
   {
      if (inSet)
      {
         return vectorSet.elem(idx++);
      }

      if (inDataSet)
      {
         return vectorSet.elem(idx++);
      }

      result = getResult(field);
      if (result.is_double_type())
         return result.double_value();
      if (result.is_single_type())
         return result.float_value();
   }

   virtual __int64 getSignedResult(const RtlFieldInfo *field)
   {
      if (inSet)
      {
         return vectorSet.elem(idx++);
      }

      if (inDataSet)
      {
         return vectorSet.elem(idx++);
      }

      result = getResult(field);
      if (result.isinteger())
         return result.int_value();
   }

   virtual unsigned __int64 getUnsignedResult(const RtlFieldInfo *field)
   {
      if (inSet)
      {
         return vectorSet.elem(idx++);
      }

      if (inDataSet)
      {
         return vectorSet.elem(idx++);
      }

      result = getResult(field);
      if (result.isinteger())
         return result.uint_value();
   }

   virtual void getStringResult(const RtlFieldInfo *field, size32_t &len, char * &__result)
   {
      if (inSet)
      {
         std::string temp = cm.row_as_string(idx++);
         const char * src = temp.c_str();
         size_t slen = temp.length();
         rtlStrToStrX(len, __result, slen, src);
      }
      else
      {
         result = getResult(field);
         if (result.is_string())
         {
            const std::string src = result.string_value();
            unsigned slen = src.length();
            rtlStrToStrX(len, __result, slen, src.c_str());
         }
      }
   }

   virtual void getUTF8Result(const RtlFieldInfo *field, size32_t &chars, char * &__result)
   {
      if (inSet)
      {
         std::string temp = cm.row_as_string(idx++);
         const char * src = temp.c_str();
         unsigned slen = rtlUtf8Length(temp.length(), src);
         rtlUtf8ToUtf8X(chars, __result, slen, src);
      }
      else
      {
         result = getResult(field);
         if (result.is_string())
         {
            std::string temp = result.string_value();
            const char * src = temp.c_str();
            unsigned slen = rtlUtf8Length(temp.length(), src);
            rtlUtf8ToUtf8X(chars, __result, slen, src);
         }
      }
   }

   virtual void getUnicodeResult(const RtlFieldInfo *field, size32_t &chars, UChar * &__result)
   {
      UNSUPPORTED("Unicode");
   }

   virtual void getDecimalResult(const RtlFieldInfo *field, Decimal &value)
   {
      value.setReal(getRealResult(field));
   }

    //The following are used process the structured fields
   virtual void processBeginSet(const RtlFieldInfo * field, bool &isAll)
   {
      if (inDataSet)
      {
         pushSize();
         if (!mat.isempty())           //initialises no of elements is a row
            setSize = mat.columns();
         return;
      }
      
      result = getResult(field);
      if (!result.isempty())
      {
         dim_vector vec = result.dims();
         if (vec.isvector())
         {
            if (result.isnumeric())
            {
               inSet = true;
               vectorSet = result.vector_value();
               pushSize();
               setSize = vectorSet.numel();
               pushIdx();
            }
            else if (result.islogical())
            {
               inSet = true;
               vectorSet = result.vector_value();
               pushSize();
               setSize = vectorSet.numel();
               pushIdx();
            }
         }

         if (result.is_char_matrix())
         {
            inSet = true;
            cm = result.char_matrix_value();
            pushSize();
            setSize = cm.rows();
            pushIdx();
         }
      }
   }

   virtual void processBeginDataset(const RtlFieldInfo * field)
   {
      result = getResult(field);
      if (!result.isempty())
      {
         if (result.isstruct())
         {
            pushSArray(structArray);
            pushMapValue(sArray);            //outer struct-array is pushed on stack
            pushSize();
            pushIdx();                       //Can push the row here instead at next row
            structArray = true;
            sArray = result.map_value();
            setSize = sArray.numel();
            return;
         }
         
         if (result.is_char_matrix())
            rtlFail(0, "OctaveEmbed: Multi-Dimensional char matrix is not supported");
         if (result.is_real_matrix())
         {
            inDataSet = true;
            mat = result.matrix_value();
            pushSize();
            setSize = mat.rows();
            pushIdx();
         }
         else if (result.is_bool_matrix())
         {
            inDataSet = true;
            mat = result.matrix_value();
            pushSize();
            setSize = mat.rows();
            pushIdx();
         }
         else if (result.is_matrix_type() && result.isinteger())
         {
            inDataSet = true;
            mat = result.matrix_value();
            pushSize();
            setSize = mat.rows();
            pushIdx();
         }
         else
            rtlFail(0, "OctaveEmbed: Unsupported Type");
      }
   }

   virtual void processBeginRow(const RtlFieldInfo * field)
   {
      std::string fieldName(field->name);
      if (inDataSet)                   //Represents Matrix type result
      {
         pushIdx();
         return;
      }

      if (structArray)                 //Represents Struct array type Data
         return;
      if (fieldName.compare("<row>") == 0)   
      {
         if (row.isstruct())           //Actual structure output obtained from evaluation 
            initializeStruct();
         else
            rtlFail(0, "OctaveEmbed: Type Mismatch");
      }
      else
      {
         result = getResult(field);       //For Record within a Record condition
         if (result.isstruct())           //Outer structure is pushed on Stack
         {
            pushResult(row);
            row = result;
            initializeStruct();
         }
      }
   }

   virtual bool processNextSet(const RtlFieldInfo * field)
   {
      if (vectorSet.isempty() && cm.isempty() && mat.isempty())
         return false;
      if (idx < setSize)
         return true;
      return false;
   }

   virtual bool processNextRow(const RtlFieldInfo * field)
   {
      if (mat.isempty() && sArray.isempty())
         return false;
      if (idx < setSize)
      {  
         if (!mat.isempty())
         {
            vectorSet = mat.row(idx++).as_row();
            return true;
         }

         if (!sArray.isempty())
         {
            octave_scalar_map sMap = sArray.elem(idx++);    //obtaining single struct within struct-array
            octave_value str(sMap);
            pushResult(row);                                //Pushing the outer struct onto stack
            row = str;
            initializeStruct();
            return true;
         }
      }

      return false;
   }

   virtual void processEndSet(const RtlFieldInfo * field)
   {
      if(inDataSet)
      {
         popSize();
      }

      if (inSet == true)
      {
         popIdx();
         popSize();
         vectorSet.clear();
         cm.clear();
      }

      inSet = false;
   }

   virtual void processEndDataset(const RtlFieldInfo * field)
   {
      if (inDataSet == true)
      {  
         popIdx();
         popSize();
         inDataSet = false;
         mat.clear();
         return;
      }

      if (structArray)
      {
         popIdx();
         popSize();
         initializeStruct();
         structArray = popSArray();       //Can pop the row here
         sArray = popMapValue();
      }
   }

   virtual void processEndRow(const RtlFieldInfo * field)
   {
      if (inDataSet)
      {
         popIdx();
         return;
      }

      if (structArray)
      {
         row = popResult();         //Poping the result pushed at next row(Can be changed)
         return;
      }

      std::string fieldName(field->name);
      if (fieldName.compare("<row>") != 0)
      {
         row = popResult();         //For Record within a Record condition
         initializeStruct();        //Outer Structure is obtained back
      }
   }

   void initializeRow(Array<double> _vectorSet)
   {
      vectorSet = _vectorSet;
      setSize = vectorSet.numel();
   }

protected:
   void initializeStruct()
   {
      value = row.map_value();
   }

   octave_value getResult(const RtlFieldInfo * field)
   {
      Cell c = value.getfield(field->name);
      std::string name(field->name);
      if (c.isempty())
         rtlFail(0, "OctaveEmbed: Field name mismatch");
      return c.checkelem(0);
   }

   octave_value row;
   bool structArray;
   octave_map sArray;
   octave_value result;
   const RtlFieldInfo *outerRow;
   octave_map value;
   Array<double> vectorSet;
   Matrix mat;
   charMatrix cm;
};

static size32_t getRowResult(octave_value row, ARowBuilder &builder, bool inDataSet, Array<double>* vector)
{
   if (row.isempty())
      rtlFail(0, "OctaveEmbed: Result is empty");
   const RtlTypeInfo *typeInfo = builder.queryAllocator()->queryOutputMeta()->queryTypeInfo();
   assertex(typeInfo);
   RtlFieldStrInfo dummyField("<row>", nullptr, typeInfo);
   OctaveRowBuilder ORowBuilder(row, &dummyField, inDataSet);
   if (inDataSet)
      ORowBuilder.initializeRow(*vector);
   return typeInfo->build(builder, 0, &dummyField, ORowBuilder);
}

class OctaveRowStream : public  CInterfaceOf<IRowStream>
{
public:
   OctaveRowStream(octave_value result, IEngineRowAllocator *_resultAllocator)
   :dataSet(result), resultAllocator(_resultAllocator), rowIdx(-1)
   {
      if (dataSet.isempty())
         rtlFail(0, "OctaveEmbed: Result is empty");     //add char matrix check
      if (!dataSet.is_matrix_type() && !dataSet.isstruct())
         rtlFail(0, "OctaveEmbed: Type Mismatch");
      if (dataSet.is_matrix_type())
         mat = dataSet.matrix_value();
      if (dataSet.isstruct())
         sArray = dataSet.map_value();
   }

   virtual const void *nextRow()
   {
      rowIdx++;
      if (!sArray.isempty())
      {
         if (rowIdx >= sArray.numel())
         {
            stop();
            return nullptr;
         }

         octave_scalar_map sMap = sArray.elem(rowIdx);
         octave_value result(sMap);
         RtlDynamicRowBuilder rowBuilder(resultAllocator);
         size32_t len = octaveembed::getRowResult(result, rowBuilder, false, nullptr);
         return (byte*) rowBuilder.finalizeRowClear(len);
      }

      if (rowIdx >= mat.rows())
      {
         stop();
         return nullptr;
      }

      Array<double> vectorSet = mat.row(rowIdx).as_row();
      RtlDynamicRowBuilder rowBuilder(resultAllocator);
      size32_t len = octaveembed::getRowResult(dataSet, rowBuilder, true, &vectorSet);
      return rowBuilder.finalizeRowClear(len);
   }

   virtual void stop()
   {
      resultAllocator.clear();
   }

protected:
   octave_value dataSet;
   Matrix mat;
   octave_map sArray;
   Linked<IEngineRowAllocator> resultAllocator;
   unsigned rowIdx;
};

class OctaveObjectBuilder :   public OctaveObjectAccessor, public CInterfaceOf<IFieldProcessor>
{
public:
   OctaveObjectBuilder(const RtlFieldInfo *__outerRow)
   :OctaveObjectAccessor(false), outerRow(__outerRow), structArray(false)
   {
   }

   virtual void processString(unsigned len, const char *_value, const RtlFieldInfo * field)
   {
      if (inSet)
      {
         std::string value(_value);
         sVec(idx++) =  value;
         return;
      }

      std::string value(_value);
      octave_value val(value);
      std::string temp(field->name);
      sMap.setfield(temp, val);
   }

   virtual void processBool(bool value, const RtlFieldInfo * field)
   {
      octave_value val(value);
      std::string temp(field->name);
      sMap.setfield(temp, val);
   }

   virtual void processData(unsigned len, const void *value, const RtlFieldInfo * field){}
   virtual void processInt(__int64 value, const RtlFieldInfo * field)
   {
      octave_int64 x = value;
      octave_value val(x);
      std::string temp(field->name);
      sMap.setfield(temp, val);
   }

   virtual void processUInt(unsigned __int64 value, const RtlFieldInfo * field)
   {
      octave_uint64 x = value;
      octave_value val(x);
      std::string temp(field->name);
      sMap.setfield(temp, val);
   }

   virtual void processReal(double value, const RtlFieldInfo * field)
   {
      octave_value val(value);
      std::string temp(field->name);
      sMap.setfield(temp, val);
   }

   virtual void processDecimal(const void *value, unsigned digits, unsigned precision, const RtlFieldInfo * field)
   {
      Decimal val;
      val.setDecimal(digits, precision, value);
      octave_value valo(val.getReal());
      std::string temp(field->name);
      sMap.setfield(temp, valo);
   }

   virtual void processUDecimal(const void *value, unsigned digits, unsigned precision, const RtlFieldInfo * field)
   {
      Decimal val;
      val.setUDecimal(digits, precision, value);
      octave_value valo(val.getReal());
      std::string temp(field->name);
      sMap.setfield(temp, valo);
   }

   virtual void processUnicode(unsigned len, const UChar *_value, const RtlFieldInfo * field)
   {
      UNSUPPORTED("Unicode");
   }
   virtual void processQString(unsigned len, const char *_value, const RtlFieldInfo * field){}

   virtual void processUtf8(unsigned len, const char *_value, const RtlFieldInfo * field)
   {
      if (inSet)
      {
         std::string value(_value, rtlUtf8Size(len, _value));
         sVec(idx++) =  value;
         return;
      }

      std::string value(_value, rtlUtf8Size(len, _value));
      octave_value valo(value);
      std::string temp(field->name);
      sMap.setfield(temp, valo);
   }

   virtual bool processBeginSet(const RtlFieldInfo * field, unsigned elements, bool isAll, const byte *inData)
   {
      bool processNext = false;
      if (isAll)
         rtlFail(0, "OctaveEmbed: ALL sets are not supported");
      if (inDataSet && structArray)
      {
         if (flag == 1000)
         {
            structArray = popSArray();
         }
         else
         {
            inDataSet = false;
         }
      }
      
      int numElems = elements;
      const RtlTypeInfo *childType = field->type->queryChildType();
      type_t typeCode = (type_t) childType->getType();
      int elemSize = childType->length;
      size_t thisSize = elemSize;
      
      switch(typeCode)
      {
      case type_boolean:
      {
         boolNDArray arr = boolNDArray(dim_vector(1, numElems));
         for (int i = 0; i < numElems; i++)
         {
            arr(i) = *(bool *)inData;
            inData += thisSize;
         }

         octave_value val(arr);
         std::string name (field->name);
         sMap.setfield(name, val);
         break;
      }

      case type_real:
      {
         RowVector arr = RowVector(numElems);
         for (int i = 0; i < numElems; i++)
         {
            double val;
            if (elemSize == sizeof(double))
            {
               val = *(double *) inData;
               arr(i) = val;
            }
            else
            {
               val = *(float *) inData;
               arr(i) = val;
            }
            inData += thisSize;
         }

         if (inDataSet)
         {
            if (mat.isempty())
               mat = Matrix(dim_vector(row, numElems));
            mat = mat.insert(arr, idx++, 0);
         }
         else
         {
            octave_value val(arr);
            std::string name(field->name);
            sMap.setfield(name, val);
         }
         
         break;
      }

      case type_int:
      {
         if ( elemSize == sizeof(int8_t))
         {
            int8NDArray vec = int8NDArray(dim_vector(1, numElems));
            int8_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData +=thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else if ( elemSize == sizeof(int16_t))
         {
            int16NDArray vec = int16NDArray(dim_vector(1, numElems));
            int16_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData +=thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else if ( elemSize == sizeof(int32_t))
         {
            int32NDArray vec = int32NDArray(dim_vector(1, numElems));
            int32_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData +=thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else 
         {
            int64NDArray vec = int64NDArray(dim_vector(1, numElems));
            int64_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData +=thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         break;
      }

      case type_unsigned:
      {
         if (elemSize == sizeof(uint8_t))
         {
            uint8NDArray vec = uint8NDArray(dim_vector(1, numElems));
            uint8_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else if ( elemSize == sizeof(uint16_t))
         {
            uint16NDArray vec = uint16NDArray(dim_vector(1, numElems));
            uint16_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else if ( elemSize == sizeof(uint32_t))
         {
            uint32NDArray vec = uint32NDArray(dim_vector(1, numElems));
            uint32_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         else 
         {
            uint64NDArray vec = uint64NDArray(dim_vector(1, numElems));
            uint64_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            std::string name(field->name);
            sMap.setfield(name, _val);
            break;
         }
         break;
      }

      case type_string:
      case type_varstring:
      case type_utf8:
         processNext = true;
         inSet = true;
         sVec = string_vector(numElems);
         pushIdx();
         break;

      default :
         rtlFail(0, "Octaveembed: Unsupported parameter type");

      }

      return processNext;
   }

   virtual bool processBeginDataset(const RtlFieldInfo * field, unsigned rows)
   {
      inDataSet = true;
      pushSArray(structArray);
      structArray = true;
      flag = 999;
      pushIdx();
      octave_value push(sMap);
      pushResult(push);
      pushMapValue(map);
      //map.clear();
      row = rows;
      map = octave_map();
      return true;
   }

   virtual bool processBeginRow(const RtlFieldInfo * field)
   {
      if (inDataSet || structArray)
      {
         flag++;
         if (structArray)
         {
            sMap.clear();
         }

         return true;
      }

      std::string fieldName (field->name);
      if (fieldName.compare("<row>") == 0)
      {
         return true;
      }
      
      octave_value push(sMap);
      pushResult(push);
      sMap.clear();
      return true;
   }

   virtual void processEndSet(const RtlFieldInfo * field)
   {
      if (inDataSet)
         return;
      if (inSet)
      {
         inSet = false;
         popIdx();
         std::string name (field->name);
         charMatrix ch = charMatrix(sVec, ' ');
         octave_value val(ch);
         sVec.clear();
         sMap.setfield(name, val);
      }
   }

   virtual void processEndDataset(const RtlFieldInfo * field)
   {
      if (inDataSet && !structArray)
      {
         std::string name = field->name;
         popIdx();
         inDataSet = false;
         octave_value pop = popResult();
         sMap = pop.scalar_map_value();
         octave_value value (mat);
         sMap.setfield(name, value);
         mat.clear();
         map = popMapValue();
         flag = 999;
         return;
      }

      if (structArray)
      {
         popIdx();
         octave_value pop = popResult();
         sMap = pop.scalar_map_value();
         structArray = popSArray();
         std::string name(field->name);      
         octave_value value(map);
         sMap.setfield(name, value);
         map = popMapValue();
         return;
      }
   }

   virtual void processEndRow(const RtlFieldInfo * field)
   {
      std::string fieldName (field->name);
      if (inDataSet && !structArray)
      {
         return;
      }

      if (inDataSet && structArray)
      {
         inDataSet = false;      //By the completion of single row both can't be true,
      }

      if (structArray)
      {
         octave_map newMap(sMap);
         map.assign(idx++, newMap);
         return;
      }

      if (fieldName.compare("<row>") != 0)
      {
         octave_scalar_map newMap = sMap;
         octave_value pop = popResult();
         sMap = pop.scalar_map_value();
         octave_value value (newMap);
         sMap.setfield(fieldName, value);
      }
   }

   octave_scalar_map getScalarMap()
   {
      return sMap;
   }

protected:
   int row;
   int flag;
   bool structArray;
   Matrix mat;
   octave_map map;
   string_vector sVec;
   octave_scalar_map sMap;
   const RtlFieldInfo* outerRow;
};

class OctaveEmbedImportContext : public CInterfaceOf<IEmbedFunctionContext>
{
public:
   OctaveEmbedImportContext()
   :first(""), second("")
   {
   }

   ~OctaveEmbedImportContext()
   {
   }

   void setActivityContext(const IThorActivityContext *_activityCtx)
   {
      activityCtx = _activityCtx;
   }

   virtual void bindBooleanParam(const char *name, bool __val)
   {
      std::string varName(name);
      octave_value value(__val);
      setSymbol.assign(varName, value);
   }

   virtual void bindDataParam(const char *name, size32_t len, const void *val){}
   virtual void bindRealParam(const char *name, double __val)
   {
      std::string varName (name);
      octave_value value(__val);
      setSymbol.assign(varName, value);
   }

   virtual void bindSignedParam(const char *name, __int64 __val)
   {
      std::string varName (name);
      octave_int64 val = __val;
      octave_value value(val);
      setSymbol.assign(varName, value);
   }

   virtual void bindUnsignedParam(const char *name, unsigned __int64 __val)
   {
      std::string varName (name);
      octave_uint64 val = __val;
      octave_value value(val);
      setSymbol.assign(varName, value);        //test unsigned and signed
   }

   virtual void bindStringParam(const char *name, size32_t len, const char *__val)
   {
      std::string varName(name);
      std::string value(__val);
      setSymbol.assign(varName, value);
   }

   virtual void bindVStringParam(const char *name, const char *val)
   {
      bindStringParam(name, strlen(val), val);
   }

   virtual void bindUTF8Param(const char *name, size32_t chars, const char *__val)
   {
      std::string varName(name);
      std::string value(__val, rtlUtf8Size(chars, __val));
      setSymbol.assign(varName, value);
   }

   virtual void bindUnicodeParam(const char *name, size32_t chars, const UChar *__val)
   {
      UNSUPPORTED("Unicode");
   }
   virtual void bindSetParam(const char *name, int elemType, size32_t elemSize, bool isAll, size32_t totalBytes, const void *setData)
   {
      std::string varName(name);
      type_t typeCode = (type_t) elemType;
      const byte *inData = (const byte *) setData;
      const byte *endData = inData + totalBytes;
      int numElems;
      if (elemSize == UNKNOWN_LENGTH)
      {
         numElems = 0;
         // Will need 2 passes to work out how many elements there are in the set :(
         while (inData < endData)
         {
            int thisSize;
            switch (elemType)
            {
            case type_varstring:
               thisSize = strlen((const char *) inData) + 1;
               break;
            case type_string:
               thisSize = * (size32_t *) inData + sizeof(size32_t);
               break;
            case type_unicode:
               UNSUPPORTED("Unicode");
               break;
            case type_utf8:
               thisSize = rtlUtf8Size(* (size32_t *) inData, inData + sizeof(size32_t)) + sizeof(size32_t);
               break;
            default:
               rtlFail(0, "Octaveembed: Unsupported parameter type");
               break;
            }

            inData += thisSize;
            numElems++;
         }

         inData = (const byte*) setData;
      }
      else
         numElems = totalBytes / elemSize;
      size32_t thisSize = elemSize;

      switch(typeCode)
      {
      case type_boolean:
      {
         boolNDArray arr = boolNDArray(dim_vector(1, numElems));
         for (int i = 0; i < numElems; i++)
         {
            arr(i) = *(bool *)inData;
            inData += thisSize;
         }

         octave_value val(arr);
         setSymbol.assign(varName, val);
         break;
      }

      case type_real:
      {
         RowVector arr = RowVector(numElems);
         for (int i = 0; i < numElems; i++)
         {
            double val;
            if (elemSize == sizeof(double))
            {
               val = *(double *) inData;
               arr(i) = val;
            }
            else
            {
               val = *(float *) inData;
               arr(i) = val;
            }

            inData += thisSize;
         }

         octave_value val(arr);
         setSymbol.assign(varName, val);
         break;
      }

      case type_string:
      {
         string_vector vec = string_vector(numElems);
         for (int i = 0; i < numElems; i++)
         {
            if (elemSize == UNKNOWN_LENGTH)
            {
               thisSize = * (size32_t *) inData;
               inData += sizeof(size32_t);
            }

            size32_t utfCharCount;
            rtlDataAttr utfText;
            rtlStrToUtf8X(utfCharCount, utfText.refstr(), thisSize, (const char *) inData);
            std::string val(utfText.getstr(), rtlUtf8Size(utfCharCount, utfText.getstr()));
            vec(i) = val;
            inData += thisSize;
         }

         charMatrix ch = charMatrix(vec, ' ');
         octave_value val(ch);
         setSymbol.assign(varName, val);
         break;
      }

      case type_varstring:
      {
         string_vector vec = string_vector(numElems);
         for (int i = 0; i < numElems; i++)
         {
            size32_t numChars = strlen((const char *) inData);
            size32_t utfCharCount;
            rtlDataAttr utfText;
            rtlStrToUtf8X(utfCharCount, utfText.refstr(), numChars, (const char *) inData);
            if (elemSize == UNKNOWN_LENGTH)
               thisSize = numChars + 1;
            std::string val(utfText.getstr(), rtlUtf8Size(utfCharCount, utfText.getstr()));
            vec(i) = val;
            inData += thisSize;
         }

         charMatrix ch = charMatrix(vec, ' ');
         octave_value val(ch);
         setSymbol.assign(varName, val);
         break;
      }

      case type_utf8:
      {
         assertex (elemSize == UNKNOWN_LENGTH);
         string_vector vec = string_vector(numElems);
         for (int i = 0; i < numElems; i++)
         {
            size32_t numChars = * (size32_t *) inData;
            inData += sizeof(size32_t);
            thisSize = rtlUtf8Size(numChars, inData);
            std::string val((const char *)inData, thisSize);
            vec(i) = val;
            inData += thisSize;
         }

         charMatrix ch = charMatrix(vec, ' ');
         octave_value val(ch);
         setSymbol.assign(varName, val);
         break;
      }

      case type_int:
      {
         if (elemSize == sizeof(int8_t))
         {
            int8NDArray vec = int8NDArray(dim_vector(1, numElems));
            int8_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else if (elemSize == sizeof(int16_t))
         {
            int16NDArray vec = int16NDArray(dim_vector(1, numElems));
            int16_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else if (elemSize == sizeof(int32_t))
         {
            int32NDArray vec = int32NDArray(dim_vector(1, numElems));
            int32_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else 
         {
            int64NDArray vec = int64NDArray(dim_vector(1, numElems));
            int64_t val;
            for (int i = 0; i < numElems; i++)
            {
               val = rtlReadInt(inData, elemSize);
               vec(i) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         break;
      }

      case type_unsigned:
      {
         if (elemSize == sizeof(uint8_t))
         {
            uint8NDArray vec = uint8NDArray(dim_vector(1, numElems));
            uint8_t val;
            for (int idx = 0; idx < numElems; idx++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(idx) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else if (elemSize == sizeof(uint16_t))
         {
            uint16NDArray vec = uint16NDArray(dim_vector(1, numElems));
            uint16_t val;
            for (int idx = 0; idx < numElems; idx++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(idx) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else if (elemSize == sizeof(uint32_t))
         {
            uint32NDArray vec = uint32NDArray(dim_vector(1, numElems));
            uint32_t val;
            for (int idx = 0; idx < numElems; idx++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(idx) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         else
         {
            uint64NDArray vec = uint64NDArray(dim_vector(1, numElems));
            uint64_t val;
            for (int idx = 0; idx < numElems ; idx++)
            {
               val = rtlReadUInt(inData, elemSize);
               vec(idx) = val;
               inData += thisSize;
            }

            octave_value _val(vec);
            setSymbol.assign(varName, _val);
            break;
         }
         break;
      }
      default :
         rtlFail(0, "Octaveembed: Unsupported parameter type");
      }
   }

   virtual bool getBooleanResult()
   {
      if (!result.isempty())
      {
         if (result.islogical())
               return result.bool_value();
         rtlFail(0, "OctaveEmbed : Result type mismatch");
      }
   }

   virtual void getDataResult(size32_t &len, void * &result)
   {
      UNSUPPORTED("Data");
   }

   virtual double getRealResult()
   {
      if (!result.isempty())
      {
         if (result.isfloat())
         {
            if (result.is_double_type())
               return result.double_value();
            return result.float_value();
         }

         rtlFail(0, "OctaveEmbed : Result type mismatch");
      }
   }

   virtual __int64 getSignedResult()
   {
      int64_t ret;
      if (!result.isempty())
      {
         if (result.is_int8_type())
         {
            ret = result.int8_scalar_value();
         }
         else if (result.is_int16_type())
         {
            ret = result.int16_scalar_value();
         }
         else if (result.is_int32_type())
         {
            ret = result.int32_scalar_value();
         }
         else if (result.is_int64_type())
         {
            ret = result.int64_scalar_value();
         }
         else if (result.isinteger())
         {
            ret = result.int_value();
         }
         else
         {
            rtlFail(0, "OctaveEmbed : Result type mismatch");         
         }

         return ret;
      }
   }

   virtual unsigned __int64 getUnsignedResult()
   {
      u_int64_t ret;
      if (!result.isempty())
      {
         if (result.is_uint8_type())
         {
            ret = result.uint8_scalar_value();
         }
         else if (result.is_uint16_type())
         {
            ret = result.uint16_scalar_value();
         }
         else if (result.is_uint32_type())
         {
            ret = result.uint32_scalar_value();
         }
         else if (result.is_uint64_type())
         {
            ret = result.uint64_scalar_value();
         }
         else
         {
            ret = result.uint_value();
         }
         
         return ret;
      }
   }

   virtual void getStringResult(size32_t &tlen, char * &trg)
   {
      if (!result.isempty())
      {
         if (result.is_string())
         {
            const std::string src = result.string_value();
            unsigned slen = src.length();
            rtlStrToStrX(tlen, trg, slen, src.c_str());
         }
         else
         {
            rtlFail(0, "OctaveEmbed : Result type mismatch");
         }
      }
      else
      {
         tlen = 0;
         trg = nullptr;
      }
   }

   virtual void getUTF8Result(size32_t &tlen, char * &trg)
   {
      if (!result.isempty())
      {
         if (result.is_string())
         {
            const std::string src = result.string_value();
            unsigned slen = rtlUtf8Length(src.length(), src.c_str());
            rtlUtf8ToUtf8X(tlen, trg, rtlUtf8Length(src.length(), src.c_str()), src.c_str());
            return;
         }
        else
         {
            rtlFail(0, "OctaveEmbed : Result type mismatch");
         }
      }

      tlen = 0;
      trg = nullptr;
   }

   virtual void getUnicodeResult(size32_t &tlen, UChar * &trg)
   {
      UNSUPPORTED("Unicode");
   }

   virtual void getSetResult(bool & __isAllResult, size32_t & __resultBytes, void * & __result, int elemType, size32_t elemSize)
   {
      assertex(!result.isempty());
      rtlRowBuilder out;
      byte *outData = nullptr;
      size32_t outBytes = 0;
      if (result.isnumeric())
      {
         dim_vector dims = result.dims();
         if (dims.isvector())
         {
            Array<double> array = result.vector_value();
            size_t arraySize = array.numel();
            if (elemSize != UNKNOWN_LENGTH)
            {
               out.ensureAvailable(arraySize * elemSize); // MORE - check for overflow?
               outData = out.getbytes();
            }

            for (size_t i = 0; i < arraySize; i++)
            {
               switch ((type_t) elemType)
               {
               case type_int:
               case type_unsigned:
                  rtlWriteInt(outData, array.elem(i), elemSize);
                  break;
               case type_real:
                  if (elemSize == sizeof(double))
                     * (double *) outData = (double) array.elem(i);
                  else
                  {
                     assertex(elemSize == sizeof(float));
                     * (float *) outData = (float) array.elem(i);
                  }
                  break;
               default:
                  rtlFail(0, "OctaveEmbed: type mismatch - unsupported return type");
               }

               if (elemSize != UNKNOWN_LENGTH)
               {
                  outData += elemSize;
                  outBytes += elemSize;
               }
            }
         }
      }
      else if (result.islogical())
      {
         dim_vector dims = result.dims();
         if (dims.isvector())
         {
            Array<double> array = result.vector_value();
            size_t arraySize = array.numel();
            if (elemSize != UNKNOWN_LENGTH)
            {
               out.ensureAvailable(arraySize * elemSize);
               outData = out.getbytes();
            }

            if ((type_t) elemType != type_boolean)
               rtlFail(0, "OctaveEmbed: type mismatch - unsupported return type");
            for (size_t i = 0; i < arraySize; i++)
            {
               assertex(elemSize == sizeof(bool));
               * (bool *) outData = array.elem(i);
               if (elemSize != UNKNOWN_LENGTH)
               {
                  outData += elemSize;
                  outBytes += elemSize;
               }
            }
         }
      }
      else if (result.is_char_matrix())
      {
         charMatrix cm = result.char_matrix_value();
         size_t cmSize = cm.rows();
         std::string temp;
         if (elemSize != UNKNOWN_LENGTH)
         {
            out.ensureAvailable(cmSize * elemSize);
            outData = out.getbytes();
         }

         for (size_t i = 0; i < cmSize; i++)
         {
            temp = cm.row_as_string(i);
            const char * src = temp.c_str();
            size_t slen = temp.length();
            switch((type_t) elemType)
            {
            case type_string:
            case type_varstring:
               if (elemSize == UNKNOWN_LENGTH)
               {
                  if (elemType == type_string)
                  {
                     out.ensureAvailable(outBytes + slen + sizeof(size32_t));
                     outData = out.getbytes() + outBytes;
                     * (size32_t *) outData = slen;
                     rtlStrToStr(slen, outData+sizeof(size32_t), slen, src);
                     outBytes += slen + sizeof(size32_t);
                  }
                  else
                  {
                     out.ensureAvailable(outBytes + slen + 1);
                     outData = out.getbytes() + outBytes;
                     rtlStrToVStr(0, outData, slen, src);
                     outBytes += slen + 1;
                  }
               }
               else
               {
                  if (elemType == type_string)
                  {
                     rtlStrToStr(elemSize, outData, slen, src);
                  }
                  else
                     rtlStrToVStr(elemSize, outData, slen, src);
                  outData += elemSize;
                  outBytes += elemSize;
               }
               break;
            case type_utf8:
               {
                  size_t numChars = rtlUtf8Length(slen, src);
                  assertex (elemSize == UNKNOWN_LENGTH);
                  out.ensureAvailable(outBytes + slen + sizeof(size32_t));
                  outData = out.getbytes() + outBytes;
                  * (size32_t *) outData = numChars;
                  rtlStrToStr(slen, outData+sizeof(size32_t), slen, src);
                  outBytes += slen + sizeof(size32_t);
               }
               case type_unicode:
                  UNSUPPORTED("Unicode");
                  
               break;
            default :
               rtlFail(0, "OctaveEmbed: type mismatch - unsupported return type");
            }
         }
      }
      __isAllResult = false;
      __resultBytes = outBytes;
      __result = out.detachdata();
   }

   virtual void importFunction(size32_t len, const char *function)
   {
      throwUnexpected();
   }

   virtual void compileEmbeddedScript(size32_t len, const char *script)
   {
      std::string queries(script);
      cutStatements(queries);
      if (!globalState)
      {
         globalState = new octave::interpreter;
         status = globalState->execute();
         threadHookChain = addThreadTermFunc(releaseContext);
      }

      if (!globalState)
      {
         throw MakeStringException(-1, "%s", "Unable to initialize interpreter");
      }

      global = globalState;
      setSymbol = global->get_current_scope();
   }

   virtual void callFunction()
   {
      if (!globalState)
      {
         throw MakeStringException(-1, "%s", "Unable to initialize interpreter");
      }
      
      std::ostringstream buffer;
      std::ostream& outStream = octave_stdout;
      std::ostream& errStream = std::cerr;
      outStream.flush ();
      errStream.flush ();
      std::streambuf* oldOutBuf = outStream.rdbuf(buffer.rdbuf());
      std::streambuf* oldErrBuf = errStream.rdbuf (buffer.rdbuf ());
      octave::unwind_protect frame;
      frame.add_fcn(restore_octave_stdout, oldOutBuf);
      frame.add_fcn(restore_octave_stderr, oldErrBuf);
      global = globalState;
      int parseStatus = 1;
      try
      {
         global->eval_string(first, true, parseStatus, 0);
         result = global->eval_string(second, true, parseStatus);
         setSymbol.clear_variables();
      }
      catch(...)
      {
         throw MakeStringException(-1, "%s", buffer.str().c_str());
      }

      octave_stdout.flush ();
   }

   virtual IRowStream *getDatasetResult(IEngineRowAllocator * _resultAllocator)
   {
      return new OctaveRowStream(result, _resultAllocator);
   }

   virtual byte * getRowResult(IEngineRowAllocator * _resultAllocator)
   {
      RtlDynamicRowBuilder rowBuilder(_resultAllocator);
      size32_t len = octaveembed::getRowResult(result, rowBuilder, false, nullptr);
      return (byte *) rowBuilder.finalizeRowClear(len);
   }

   virtual size32_t getTransformResult(ARowBuilder & builder)
   {
      throwUnexpected();
   }

   virtual void bindRowParam(const char *name, IOutputMetaData & metaVal, const byte *val)
   {
      std::string varName(name);
      const RtlTypeInfo *typeInfo = metaVal.queryTypeInfo();
      assertex(typeInfo);
      RtlFieldStrInfo dummyField("<row>", nullptr, typeInfo);
      OctaveObjectBuilder objBuilder(&dummyField);
      typeInfo->process(val, val, &dummyField, objBuilder);
      octave_scalar_map sMap = objBuilder.getScalarMap();
      octave_value rowParam(sMap);
      setSymbol.assign(varName, rowParam);
   }

   virtual void bindDatasetParam(const char *name, IOutputMetaData & metaVal, IRowStream * val)
   {
      std::string varName(name);
      const RtlTypeInfo *typeInfo = metaVal.queryTypeInfo();
      assertex(typeInfo);
      RtlFieldStrInfo dummyField("<row>", nullptr, typeInfo);
      int idx = 0;
      octave_map map;
      for (;;)
      {
         roxiemem::OwnedConstRoxieRow row = val->ungroupedNextRow();
         if (!row)
             break;
         OctaveObjectBuilder objBuilder(&dummyField);
         const byte *brow = (const byte *) row.get();
         typeInfo->process(brow, brow, &dummyField, objBuilder); // Creates a Octave object from the incoming ECL row
         octave_scalar_map sMap = objBuilder.getScalarMap();
         octave_map newMap(sMap);
         map.assign(idx++, newMap);
      }

      octave_value value(map);
      setSymbol.assign(varName, value);
   }

   virtual void bindFloatParam(const char *name, float val)
   {
      std::string varName(name);
      octave_value value(val);
      setSymbol.assign(varName, value);
   }

   virtual void bindSignedSizeParam(const char *name, int size, __int64 _val)
   {
      std::string varName(name);
      if (size == sizeof(int8_t))
      {
         octave_int8 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int16_t))
      {
         octave_int16 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int32_t))
      {
         octave_int32 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int64_t))
      {
         octave_int64 val = _val;
         octave_value value(val);
         setSymbol.assign(varName,value);
      }
      else
         rtlFail(0,"OctaveEmbed: Only 1,2,4,8 byte sized integer is Supported");
   }

   virtual void bindUnsignedSizeParam(const char *name, int size, unsigned __int64 _val)
   {
      std::string varName(name);
      if (size == sizeof(int8_t))
      {
         octave_uint8 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int16_t))
      {
         octave_uint16 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int32_t))
      {
         octave_uint32 val = _val;
         octave_value value(val);
         setSymbol.assign(varName, value);
      }
      else if (size == sizeof(int64_t))
      {
         octave_uint64 val = _val;
         octave_value value(val);
         setSymbol.assign(varName,value);
      }
      else
         rtlFail(0,"OctaveEmbed: Only 1,2,4,8 byte sized integer is Supported");
   }

   virtual IInterface *bindParamWriter(IInterface *esdl, const char *esdlservice, const char *esdltype, const char *name)
   {
      return nullptr;
   }

   virtual void paramWriterCommit(IInterface *writer){}
   virtual void writeResult(IInterface *esdl, const char *esdlservice, const char *esdltype, IInterface *writer){}
   virtual void loadCompiledScript(size32_t len, const void *script)
   {
      throwUnexpected();
   }
    // If reusing a context, need to call these before using/after using
   virtual void enter()
   {
   }

   virtual void exit()
   {
   }
   
protected:
   void resultMismatchException(const char *expected)
   {
      makeStringExceptionV(0, "OctaveEmbed: type mismatch - unsupported return type(%s expected)",expected );
   }

   static void restore_octave_stdout (std::streambuf *buf)
   {
      octave_stdout.flush ();
      octave_stdout.rdbuf (buf);
   }

   static void restore_octave_stderr (std::streambuf *buf)
   {
      std::cerr.flush ();
      std::cerr.rdbuf (buf);
   }

   bool isEmpty(std::string x)
   {
      for (int i = 0; i < x.length(); i++)
      {
         if (x.at(i) != ' ' && x.at(i) != '\t')
            return false;
      }

      return true;
   }

   void cutStatements(std::string script)
   {
      size_t pos = script.find_last_of("\n");
      while(second.empty())
      {
         if (pos == script.npos)
         {
            second = script;
            first = "";
            break;
         }

         first = script.substr(0, pos);
         second = script.substr(pos+1, script.size()-pos);
         if (isEmpty(second))
            second = "";
         script = first;
         pos = script.find_last_of("\n");
      }
   }

protected:
   const IThorActivityContext *activityCtx = nullptr;
   octave_value result;
   octave::symbol_scope setSymbol;
   std::string first, second;
   octave::interpreter* global;
};


class OctaveEmbedContext : public CInterfaceOf<IEmbedContext>
{
public:
   virtual IEmbedFunctionContext *createFunctionContext(unsigned flags, const char *options)
   {
      return createFunctionContextEx(nullptr, nullptr, flags, options);
   }

   virtual IEmbedFunctionContext *createFunctionContextEx(ICodeContext *ctx, const IThorActivityContext *activityCtx, unsigned flags, const char *options)
   {
      return new OctaveEmbedImportContext;
   }

   virtual IEmbedServiceContext *createServiceContext(const char *service, unsigned flags, const char *options)
   {
      throwUnexpected();
   }
   
} embedContext;

extern DECL_EXPORT IEmbedContext *queryEmbedContext()
{
    return &embedContext;
}

}