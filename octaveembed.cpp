#include <iostream>
#include <octave/oct.h>
#include <octave/parse.h>
#include <octave/octave.h>
#include <octave/interpreter.h>

#include "platform.h"
#include "eclrtl.hpp"
#include "jstring.hpp"
#include "hqlplugins.hpp"
#include "eclhelper.hpp"
#include "rtlds_imp.hpp"

#include "jlib.hpp"
#include "jexcept.hpp"
#include "jthread.hpp"

#include "deftype.hpp"

#include <vector>
#include <map>
#include <boost/algorithm/string.hpp>


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
    pb->description = "ECL plugin library for BLAH BLAH BLAH\n";
    return true;
}

__declspec(noreturn) static void UNSUPPORTED(const char *feature) __attribute__((noreturn));

static void UNSUPPORTED(const char *feature)
{
    throw MakeStringException(-1, "UNSUPPORTED feature: %s not supported in Octave plugin", feature);
}

namespace octaveembed {


static octave::interpreter*  globalState=nullptr;
static int status;
MODULE_INIT(INIT_PRIORITY_STANDARD)
{   
   globalState = new octave::interpreter;
   status = globalState->execute();
   return true;
}
MODULE_EXIT()
{
}
class OctaveObjectAccessor
{
public:
   OctaveObjectAccessor()
   : inSet(false),inDataSet(false),idx(0),top(-1)
   {

   }
protected:
   void pushResult(octave_value _result)
   {
      list.prepend(_result);
      top++;
   }
   octave_value popResult()
   {
      if(top < list.length())
         return list(top);
      octave_value empty_result;
      return empty_result;
   }
   void pushIdx()
   {
      idxStack.append(idx);
      idx=0;
   }
   void popIdx()
   {
     idx = idxStack.popGet();
     if(!inDataSet)
     setSize = 0;
   }
   octave_value_list list;
   bool inSet;
   bool inDataSet;
   int setSize;
   int idx;
   IntArray idxStack;
private:
   int top;

};  
class OctaveRowBuilder : public OctaveObjectAccessor, public CInterfaceOf<IFieldSource>
{
public:
   OctaveRowBuilder(octave_value __result, const RtlFieldInfo *__outerRow)
   :outerRow(__outerRow),row(__result)
   {
      keyName = row.map_keys();
      value = row.map_value();
      for(size_t i =0;i<keyName.numel();i++)
      {
         Cell c = value.getfield(keyName.elem(i));
         stack.append(c.checkelem(0));
      }
   }
   ~OctaveRowBuilder()
   {
      //stack.clear();
   }
   
   virtual bool getBooleanResult(const RtlFieldInfo *field)
   {
      if(inSet)
      {
         return vectorSet.elem(idx++);
      }
      if(inDataSet)
      {
         return brow.elem(idx++);
      }
      result = getResult(field);
      if(result.islogical())
      {
         return result.bool_value();
      }
   }
   virtual void getDataResult(const RtlFieldInfo *field, size32_t &len, void * &result){}
   virtual double getRealResult(const RtlFieldInfo *field)
   {
      if(inSet)
      {
         return vectorSet.elem(idx++);
      }
      if(inDataSet)
      {
         return frow.elem(idx++);
      }
      result = getResult(field);
      if(result.is_double_type())
         return result.double_value();
      if(result.is_single_type())
         return result.float_value();
   }
   virtual __int64 getSignedResult(const RtlFieldInfo *field)
   {  
      if(inSet)
      {
         return vectorSet.elem(idx++);
      }
      if(inDataSet)
      {
         return frow.elem(idx++);
      }
      result = getResult(field);
      if(result.isinteger())
         return result.int_value();
   }
   virtual unsigned __int64 getUnsignedResult(const RtlFieldInfo *field)
   {
      if(inSet)
      {
         return vectorSet.elem(idx++);
      }
      if(inDataSet)
      {
         return frow.elem(idx++);
      }
      result = getResult(field);
      if(result.isinteger())
         return result.uint_value();
   }
   virtual void getStringResult(const RtlFieldInfo *field, size32_t &len, char * &__result)
   {
      if(inSet)
      {
         std::string temp = cm.row_as_string(idx++);
         const char * src = temp.c_str();
         size_t slen = temp.length();
         rtlStrToStrX(len,__result,slen,src);
      }
      else
      {
         result = getResult(field);
         if(result.is_string())
         {
            const std::string src= result.string_value();
            unsigned slen = src.length();
            rtlStrToStrX(len, __result, slen, src.c_str());
         }
      }
      
   }
   virtual void getUTF8Result(const RtlFieldInfo *field, size32_t &chars, char * &__result)
   {
      if(inSet)
      {
         std::string temp = cm.row_as_string(idx++);
         const char * src = temp.c_str();
         unsigned slen = rtlUtf8Length(temp.length(),src);
         rtlUtf8ToUtf8X(chars,__result,slen,src);
      }
      else
      {
         result = getResult(field);
         if(result.is_string())
         {
            std::string temp = result.string_value();
            const char * src = temp.c_str();
            unsigned slen = rtlUtf8Length(temp.length(),src);
            rtlUtf8ToUtf8X(chars,__result,slen,src);
         }
      }
   }
   virtual void getUnicodeResult(const RtlFieldInfo *field, size32_t &chars, UChar * &result) {}
   virtual void getDecimalResult(const RtlFieldInfo *field, Decimal &value){}

    //The following are used process the structured fields
   virtual void processBeginSet(const RtlFieldInfo * field, bool &isAll)
   {
      result = getResult(field);
      if(!result.isempty())
      {
         dim_vector vec = result.dims();
         if(vec.isvector())
         {
            if(result.isnumeric())
            {
               inSet = true;
               vectorSet = result.vector_value();
               setSize = vectorSet.numel();
               pushIdx();
            }
            else if(result.islogical())
            {
               inSet = true;
               vectorSet = result.vector_value();
               setSize = vectorSet.numel();
               pushIdx();
            }
         }
         else if (result.is_char_matrix())
         {
            inSet = true;
            cm = result.char_matrix_value();
            setSize = cm.rows();
            pushIdx();
         }
      }
   }
   virtual void processBeginDataset(const RtlFieldInfo * field) 
   {
      result = getResult(field);
      if(!result.isempty())
      {
         if(result.is_real_matrix())
         {
            inDataSet = true ;
            mat = result.float_matrix_value();
            setSize = mat.rows();
            pushIdx();
         }
         else if(result.is_bool_matrix())
         {
            inDataSet = true;
            bmat = result.bool_matrix_value();
            setSize = bmat.rows();
            pushIdx();
         }
      }

   }
   virtual void processBeginRow(const RtlFieldInfo * field) {
      std::string fieldName(field->name);
      if(inDataSet)
      {
         if (!mat.isempty())
            frow = mat.row(idx++);
         if (!bmat.isempty())
            brow = bmat.column(idx++);
         pushIdx();
         return;
      }
      if(fieldName.compare("<row>") == 0)
      {  
         initializeStruct();
      }
      else
      {
         result = getResult(field);
         if(result.isstruct())
         {
            pushResult(row);
            row = result;
            initializeStruct();
         }
      }     
      
   }
   virtual bool processNextSet(const RtlFieldInfo * field) 
   {
      if(vectorSet.isempty() && cm.isempty())
         return false;
      if(idx<setSize)
         return true;
      return false;
   }
   virtual bool processNextRow(const RtlFieldInfo * field)
   {
      if(mat.isempty() && bmat.isempty())
         return false;
      if(idx < setSize)
         return true;
      return false;   
   }
   virtual void processEndSet(const RtlFieldInfo * field) 
   { 
      std::cout << "process end set\n";
      if(inSet == true)
         popIdx();
      inSet = false;
   }
   virtual void processEndDataset(const RtlFieldInfo * field) {
      if(inDataSet == true)
         popIdx();
      inDataSet = false;
   }
   virtual void processEndRow(const RtlFieldInfo * field)
   {
      std::string fieldName(field->name);
      if(inDataSet)
         popIdx();
      if(fieldName.compare("<row>") != 0 && inSet)
      {
         row = popResult();
         initializeStruct();
      }
   }
protected:
   void initializeStruct()
   {
      stack.clear();
      keyName = row.map_keys();
      value = row.map_value();
      for(size_t i =0;i<keyName.numel();i++)
      {
         Cell c = value.getfield(keyName.elem(i));
         stack.append(c.checkelem(0));
      }
   }
   octave_value getResult(const RtlFieldInfo * field)
   {
      Cell c = value.getfield(field->name);
      if (c.isempty())
         rtlFail(0,"OctaveEmbed : Field name Mismatch");
      return c.checkelem(0);
   }
   octave_value row;
   octave_value result;
   octave_value_list stack;
   const RtlFieldInfo *outerRow;
   string_vector keyName;
   octave_map value;
   Array<double> vectorSet;
   FloatMatrix mat;
   FloatRowVector frow;
   boolMatrix bmat;
   Array<bool> brow;
   charMatrix cm;
};

static size32_t getRowResult(octave_value row, ARowBuilder &builder)
{
   if(row.isempty())
      rtlFail(0, "Null Object Returned");
   const RtlTypeInfo *typeInfo = builder.queryAllocator()->queryOutputMeta()->queryTypeInfo();
   assertex(typeInfo);
   RtlFieldStrInfo dummyField("<row>", NULL, typeInfo);
   OctaveRowBuilder ORowBuilder(row, &dummyField);
   return typeInfo->build(builder, 0, &dummyField, ORowBuilder);
}

class OctaveEmbedImportContext : public CInterfaceOf<IEmbedFunctionContext>
{
public:
   OctaveEmbedImportContext()
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
      std::string varname(name);
      if(__val)
         params[varname]="true";
      else 
         params[varname]="false";      
   }
   virtual void bindDataParam(const char *name, size32_t len, const void *val){}
   virtual void bindRealParam(const char *name, double __val)  
   {
      std::string varname (name);
      params[varname]=std::to_string(__val);     
   }
   virtual void bindSignedParam(const char *name, __int64 __val)   
   {
      std::string varname (name);
      params[varname]="int64("+std::to_string(__val)+")";
   }
   virtual void bindUnsignedParam(const char *name, unsigned __int64 __val)  
   {
      std::string varname (name);
      params[varname]="uint64("+std::to_string(__val)+")";
   }
   virtual void bindStringParam(const char *name, size32_t len, const char *__val)  
   {
      std::string varname(name);
      std::string value(__val);
      value = "\""+value +"\"";
      params[varname]= value;
   }
   virtual void bindVStringParam(const char *name, const char *val)  
   {
      bindStringParam(name, strlen(val), val);
   }
   virtual void bindUTF8Param(const char *name, size32_t chars, const char *__val)  
   {
      std::string varname(name);
      std::string value(__val,rtlUtf8Size(chars, __val));
      value = "\""+value+"\"";
      params[varname]=value;
      std::cout << value;
   }
   virtual void bindUnicodeParam(const char *name, size32_t chars, const UChar *__val){}
   virtual void bindSetParam(const char *name, int elemType, size32_t elemSize, bool isAll, size32_t totalBytes, const void *setData)  
   {
      std::string varname(name);
      std::string value="[ ";
      type_t typecode = (type_t) elemType;
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
               thisSize = (* (size32_t *) inData) * sizeof(UChar) + sizeof(size32_t);
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
         inData = (const byte *) setData;
      }
      else 
         numElems = totalBytes / elemSize;
      size32_t thisSize = elemSize ;
      for(int idx=0;idx < numElems;idx++)
      {
         switch(typecode)
         {
         case type_boolean:
         {
            bool val = *(bool *) inData;
            if(val)
               value +=" true ";
            else 
               value +=" false ";
            break;
         }
         case type_int:
         {
            if (elemSize == sizeof(int8_t))
            {
               int8_t val = rtlReadInt(inData,elemSize);
               value +=" int8("+std::to_string(val)+") ";
            }
            else if (elemSize == sizeof(int16_t))
            {
               int16_t val = rtlReadInt(inData,elemSize);
               value +=" int16("+std::to_string(val)+") ";
            }
            else if (elemSize == sizeof(int32_t))
            {
               int32_t val =rtlReadInt (inData , elemSize);
               value +="int32("+std::to_string(val)+") ";
            }
            else
            {
               int64_t val = rtlReadInt(inData, elemSize);
               value +=" int64("+std::to_string(val)+") ";
            }
            break;
         }
         case type_unsigned:
         {
            if (elemSize == sizeof(uint8_t))
            {
               uint8_t val = rtlReadUInt(inData,elemSize);
               value +=" int8("+std::to_string(val)+") ";
            }
            else if (elemSize == sizeof(uint16_t))
            {
               uint16_t val = rtlReadUInt(inData,elemSize);
               value +=" int16("+std::to_string(val)+") ";
            }
            else if (elemSize == sizeof(uint32_t))
            {
               uint32_t val =rtlReadUInt (inData , elemSize);
               value +="int32("+std::to_string(val)+") ";
            }
            else
            {
               uint64_t val = rtlReadUInt(inData, elemSize);
               value +=" int64("+std::to_string(val)+") ";
            }
            break;
         }
         case type_real:
         {
            double val;
            if (elemSize == sizeof(double))
            {
               val = *(double *) inData;
               value += " "+std::to_string(val)+" ";
            }
            else
            {
               val = *(float *) inData;
               value += " single("+std::to_string(val)+") ";
            }  
            break;
         }
         case type_string :
         {
            if (elemSize == UNKNOWN_LENGTH)
            {
               thisSize = * (size32_t *) inData;
               inData += sizeof(size32_t);
            }
            size32_t utfCharCount;
            rtlDataAttr utfText;
            rtlStrToUtf8X(utfCharCount, utfText.refstr(), thisSize, (const char *) inData);
            std::string val(utfText.getstr(),rtlUtf8Size(utfCharCount,utfText.getstr()));
            value += "\"" +val+"\" \n "; 
            break;
         }
         case type_varstring :
         {
            size32_t numChars = strlen((const char *) inData);
            size32_t utfCharCount;
            rtlDataAttr utfText;
            rtlStrToUtf8X(utfCharCount, utfText.refstr(), numChars, (const char *) inData);
            if (elemSize == UNKNOWN_LENGTH)
               thisSize = numChars + 1;
            std::string val(utfText.getstr(),rtlUtf8Size(utfCharCount,utfText.getstr()));
            value += "\""+val+"\" \n";
            break;
         }
         case type_utf8:
         {
            assertex (elemSize == UNKNOWN_LENGTH);
            size32_t numChars = * (size32_t *) inData;
            inData += sizeof(size32_t);
            thisSize = rtlUtf8Size(numChars, inData);
            std::string val((const char *)inData,thisSize);
            value += "\""+val+"\" \n";
            break;
         }
         default :
            rtlFail(0, "Octaveembed: Unsupported parameter type");
            break;
         }
         inData += thisSize;
      }
      value += " ]";
      std::cout << value <<"\n";
      params[varname]=value;
   }
   virtual bool getBooleanResult() 
   {    
      if(!result.isempty())
      {
         if(result.islogical())
               return result.bool_value();
         resultMismatchException("Boolean");
      }
      throwUnexpected();    
   }
   virtual void getDataResult(size32_t &len, void * &result){}
   virtual double getRealResult() 
   {
      if(!result.isempty())
      {
         if(result.isfloat())
         {
            if(result.is_double_type())
               return result.double_value();

            return result.float_value();
         }
         resultMismatchException("Real");
      }
      throwUnexpected();
   }
   virtual __int64 getSignedResult() 
   {
      int64_t ret;
      int16_t s;
      int32_t t;
      int8_t e;
      if(!result.isempty())
      {
         if(result.is_int8_type())
         {
            e=result.int8_scalar_value();
            ret=e;
         }
         else if(result.is_int16_type())
         {
            s=result.int16_scalar_value();
            ret = s;
         }
         else if(result.is_int32_type())
         {
            t=result.int32_scalar_value();
            ret = t;
         }
         else if(result.is_int64_type())
         {
            ret=result.int64_scalar_value();
         }
         else if(result.isinteger())
         {
            ret=result.int_value();
         }
         else
         {
            resultMismatchException("Signed");
         }
         return ret;
      }
      throwUnexpected();
   }
   virtual unsigned __int64 getUnsignedResult() 
   {
      u_int8_t e;
      u_int16_t s;
      u_int32_t t;
      u_int64_t ret;
      if(!result.isempty())
      {
         if(result.is_uint8_type())
         {
            e=result.uint8_scalar_value();
            ret=e;
         }
         else if(result.is_uint16_type())
         {
            s=result.uint16_scalar_value();
            ret = s;
         }
         else if(result.is_uint32_type())
         {
            t=result.uint32_scalar_value();
            ret = t;
         }
         else if(result.is_uint64_type())
         {
            ret=result.uint64_scalar_value();
         }
         else
         {
            ret=result.uint_value();
         }
         return ret;
      }
        throwUnexpected();
   }
   virtual void getStringResult(size32_t &tlen, char * &trg)   
   {  
      if(!result.isempty())
      {
         if(result.is_string())
         {
            const std::string src= result.string_value();
            unsigned slen = src.length();
            rtlStrToStrX(tlen, trg, slen, src.c_str());
         }
         else
         {
         throwUnexpected();

            resultMismatchException("String");
         }
      }
      else
      {
         throwUnexpected();
      }
   }
   virtual void getUTF8Result(size32_t &tlen, char * &trg)   
   {
      if(!result.isempty())
      {  
         if(result.is_string())
        {   
            const std::string src = result.string_value();
            unsigned slen = rtlUtf8Length(src.length(),src.c_str());
            rtlUtf8ToUtf8X(tlen,trg,rtlUtf8Length(src.length(),src.c_str()),src.c_str());
        }
        else
        {
           resultMismatchException("UTF8");
        }
      }
      else
      {
         throwUnexpected();
      }
   }
   virtual void getUnicodeResult(size32_t &tlen, UChar * &trg)   
   {
      if(!result.isempty())
      {  
         if(result.is_string())
        {   
            const std::string src = result.string_value();
            unsigned slen = rtlUtf8Length(src.length(),src.c_str());
            rtlUtf8ToUnicodeX(tlen,trg,rtlUtf8Length(src.length(),src.c_str()),src.c_str());
        }
        else
        {
           resultMismatchException("Unicode");
        }
      }
      else
      {
         throwUnexpected();
      }
   }
   virtual void getSetResult(bool & __isAllResult, size32_t & __resultBytes, void * & __result, int elemType, size32_t elemSize)  
   {
      assertex(!result.isempty());
      rtlRowBuilder out;
      byte *outData = NULL;
      size32_t outBytes = 0;
      if(result.isnumeric())
      {
         dim_vector dims = result.dims();
         if(dims.isvector())
         {
            Array<double> array = result.vector_value();
            size_t array_size = array.numel();
            if (elemSize != UNKNOWN_LENGTH)
            {
               out.ensureAvailable(array_size * elemSize); // MORE - check for overflow?
               outData = out.getbytes();
            }
            for(size_t i = 0 ; i < array_size ; i++)
            {
               switch ((type_t) elemType)
               {
               case type_int :
               case type_unsigned :
                  rtlWriteInt(outData, array.elem(i), elemSize);
                  break;
               case type_real :
                  if (elemSize==sizeof(double))
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
            size_t array_size = array.numel();
            if(elemSize != UNKNOWN_LENGTH)
            {
               out.ensureAvailable(array_size * elemSize);
               outData = out.getbytes();
            }
            if ((type_t) elemType != type_boolean)
               rtlFail(0, "OctaveEmbed: type mismatch - unsupported return type");  
            for(size_t i = 0 ; i < array_size ; i++)
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
         size_t cm_size = cm.rows();
         std::string temp;
         if (elemSize != UNKNOWN_LENGTH)
         {
               out.ensureAvailable(cm_size * elemSize);
               outData = out.getbytes();
         }  
         for ( size_t i = 0; i < cm_size ; i++) 
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
                     rtlStrToStr(elemSize,outData,slen,src);
                  }
                  else
                     rtlStrToVStr(elemSize, outData, slen, src);
                  outData += elemSize;
                  outBytes += elemSize;
               }
               break;
            case type_utf8:
            case type_unicode:
               {
                  size_t numchars = rtlUtf8Length(slen,src);
                  if (elemType == type_utf8)
                  {
                     assertex (elemSize == UNKNOWN_LENGTH);
                     out.ensureAvailable(outBytes + slen + sizeof(size32_t));
                     outData = out.getbytes() + outBytes;
                     * (size32_t *) outData = numchars;
                     rtlStrToStr(slen, outData+sizeof(size32_t), slen, src);
                     outBytes += slen + sizeof(size32_t);
                  }
                  else
                  {
                     if (elemSize == UNKNOWN_LENGTH)
                     {
                        out.ensureAvailable(outBytes + numchars*sizeof(UChar) + sizeof(size32_t));
                        outData = out.getbytes() + outBytes;
                        // You can't assume that number of chars in utf8 matches number in unicode16 ...
                        size32_t numchars16;
                        rtlDataAttr unicode16;
                        rtlUtf8ToUnicodeX(numchars16, unicode16.refustr(), numchars, src);
                        * (size32_t *) outData = numchars16;
                        rtlUnicodeToUnicode(numchars16, (UChar *) (outData+sizeof(size32_t)), numchars16, unicode16.getustr());
                        outBytes += numchars16*sizeof(UChar) + sizeof(size32_t);
                     }
                     else
                        rtlUtf8ToUnicode(elemSize / sizeof(UChar), (UChar *) outData, numchars, src);
                  }
               }
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
      size_t i;
      std::string queries(script);
      std::vector<std::string> preprocess;
      boost::split(preprocess,queries,boost::is_any_of("\n"));
      balancedBrackets(&preprocess);
      cutEmptyLine(&statement);
      statement_list_size += statement.size();
   }
   virtual void callFunction()  
   {
      if(!globalState)
      {
         throw MakeStringException(-1,"%s","Unable to initialize interpreter");
      }
      appendParameters();
      global=globalState;
      octave_value_list output;
      octave_value temp;
      int parse_status=0;
      try
      {
         for(int i=0;i<statement.size();i++)
         {
            const std::string query=statement.at(i);
            temp=global->eval_string(query,true,parse_status);
            parse_status =0;
            output.prepend(temp);
         }
         result=output(0);
         //global=nullptr;
      }
      catch(const octave::execution_exception& e)
      {
         //global=nullptr;
         throw MakeStringException(-1,"%s",e.info().c_str());
      }
   }
   virtual IRowStream *getDatasetResult(IEngineRowAllocator * _resultAllocator)   
   {
      throwUnexpected();
   }
   virtual byte * getRowResult(IEngineRowAllocator * _resultAllocator)   
   {
      RtlDynamicRowBuilder rowBuilder(_resultAllocator);
      size32_t len = octaveembed::getRowResult(result, rowBuilder);
      return (byte *) rowBuilder.finalizeRowClear(len);
   }
   virtual size32_t getTransformResult(ARowBuilder & builder)   
   {
      throwUnexpected();
   }
   virtual void bindRowParam(const char *name, IOutputMetaData & metaVal, const byte *val)   
   {
      throwUnexpected();
   }
   virtual void bindDatasetParam(const char *name, IOutputMetaData & metaVal, IRowStream * val)   
   {
      throwUnexpected();
   }
   virtual void bindFloatParam(const char *name, float val)   
   {
      throwUnexpected();
   }
   virtual void bindSignedSizeParam(const char *name, int size, __int64 val)  
   {
      throwUnexpected();
   }
   virtual void bindUnsignedSizeParam(const char *name, int size, unsigned __int64 val)  
   {
      throwUnexpected();
   }
   virtual IInterface *bindParamWriter(IInterface *esdl, const char *esdlservice, const char *esdltype, const char *name) 
   {
      return nullptr;
   }
   virtual void paramWriterCommit(IInterface *writer) {}
   virtual void writeResult(IInterface *esdl, const char *esdlservice, const char *esdltype, IInterface *writer) {}
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
   IException *resultMismatchException(const char *expected)
   {
      return makeStringExceptionV(0, "OctaveEmbed: type mismatch - unsupported return type(%s expected)",expected );
   }
   void appendParameters()
   {
      std::map<std::string, std::string>::iterator itr=params.begin();
      std::string temp;
      for(size_t i=0;i<params.size();i++,itr++)
      {
         temp="assignin (\"base\",'" + itr->first+"',"+itr->second+")\n";
         statement.insert(statement.begin(),temp);
         statement_list_size++;
      }
   }
   void balancedBrackets(std::vector<std::string>* preprocess)
   {
      size_t top = -1,len,poso,posc;
      std::string query , stmt;
      std::vector<std::string>::iterator x= preprocess->begin();
      for (size_t i =0 ; i<preprocess->size();i++,x++)
      {
         query = preprocess->at(i);
         poso = query.find("[");
         stmt = query;
         if(poso != query.npos)
         {
            top++;
            posc = query.find("]");
            len = 0;
            if(posc != query.npos)
               top--;
            while((posc == query.npos || top != -1) && (i+len) < preprocess->size())
            {
               len++;
               query=preprocess->at(i+len);
               stmt+= "; "+ query;
               posc=query.find("]");
               poso=query.find("[");
               if(poso != query.npos)
               {
                 top++;
               }
               if(posc != query.npos)
                  top--;
            }
            while(len>0)
            {
               len--;
               preprocess->erase(x);
            }
         }
         statement.push_back(stmt);
      }
   }
   void cutEmptyLine(std::vector<std::string> *output)
   {   
      int flag=0;
      std::string temp;
      std::vector<std::string>::iterator p;
      p= output->begin();
      for(int i=0;i<output->size();i++)
      {
        temp=output->at(i);
        flag=0;
        for(int j=0;j<temp.size();j++)
        {    
            if(temp.at(j)!=' ')
            {
                flag=1;break;
            }
        }
        if(flag!=1)
        {
            output->erase(p);
            p--;
            i--;
        }
        p++;
      }
   }
protected:
    const IThorActivityContext *activityCtx=nullptr;
    octave_value result;
    int statement_list_size = 0;
    std::vector<std::string> statement;
    octave::interpreter* global;
    std::map<std::string , std::string> params;
};
static __thread OctaveEmbedImportContext * theFunctionContext;  // We reuse per thread, for speed
static __thread ThreadTermFunc threadHookChain;

static void releaseContext()
{
   if (theFunctionContext)
   {
      ::Release(theFunctionContext);
      theFunctionContext = NULL;
   }
   if (threadHookChain)
   {  
        (*threadHookChain)();
        threadHookChain = NULL;
   }
}
class OctaveEmbedContext : public CInterfaceOf<IEmbedContext>
{
public:
    virtual IEmbedFunctionContext *createFunctionContext(unsigned flags,const char *options) 
    {
        return createFunctionContextEx(nullptr,nullptr,flags,options);
    }
    virtual IEmbedFunctionContext *createFunctionContextEx(ICodeContext *ctx,const IThorActivityContext *activityCtx,unsigned flags,const char *options) 
    {
       if (!theFunctionContext)
        {
            theFunctionContext = new OctaveEmbedImportContext;
            threadHookChain = addThreadTermFunc(releaseContext);
        }
      theFunctionContext->setActivityContext(activityCtx);
      return LINK(theFunctionContext);
    }
    virtual IEmbedServiceContext *createServiceContext(const char *service ,unsigned flags,const char *options) 
    {
        throwUnexpected();
    }
}embedContext;

extern DECL_EXPORT IEmbedContext *queryEmbedContext()
{
    return &embedContext;
}

}