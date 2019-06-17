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


//--------------------------------------------------------------------------------
//                           ECL SERVICE ENTRYPOINTS
//--------------------------------------------------------------------------------
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
   virtual void bindBooleanParam(const char *name, bool val)  
   {
      std::cout << "boolean param " << name << "   "<< val;
      const octave_value binder(val);
      params.append(binder);
   }
    virtual void bindDataParam(const char *name, size32_t len, const void *val)  
     {
        throwUnexpected();
     }
    virtual void bindRealParam(const char *name, double val)  
     {
        throwUnexpected();
     }
    virtual void bindSignedParam(const char *name, __int64 val)   
     {
        throwUnexpected();
     }
    virtual void bindUnsignedParam(const char *name, unsigned __int64 val)  
     {
        throwUnexpected();
     }
    virtual void bindStringParam(const char *name, size32_t len, const char *val)  
     {
        throwUnexpected();
     }
    virtual void bindVStringParam(const char *name, const char *val)  
     {
        throwUnexpected();
     }
    virtual void bindUTF8Param(const char *name, size32_t chars, const char *val)  
     {
        throwUnexpected();
     }
    virtual void bindUnicodeParam(const char *name, size32_t chars, const UChar *val)  
     {
        throwUnexpected();
     }

    virtual void bindSetParam(const char *name, int elemType, size32_t elemSize, bool isAll, size32_t totalBytes, const void *setData)  
     {
        throwUnexpected();
     }

   virtual bool getBooleanResult() 
   {    
      if(!result.isempty())
      {
         if(result.islogical())
               return result.bool_value();
         throwUnexpected();
      }
         throwUnexpected();    
   }
   virtual void getDataResult(size32_t &len, void * &result)   
      {
        throwUnexpected();
      }
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
           throwUnexpected();
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
           throwUnexpected();
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
         if((type_t) elemType != type_string && (type_t) elemType != type_varstring)
            rtlFail(0, "OctaveEmbed: type mismatch - unsupported return type");  
         for ( size_t i = 0; i < cm_size ; i++) 
         {
            temp = cm.row_as_string(i);
            const char * src = temp.c_str();
            size_t slen = temp.length();
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
         statement_list_size += statement.size();
     }
      virtual void callFunction()  
     {
         if(!globalState)
         {
            throw MakeStringException(-1,"%s","Unable to initialize interpreter");
         }
         global=globalState;
         octave_value_list output;
         octave_value temp;
         int parse_status=0;
            try
            {
               for(int i=0;i<statement_list_size;i++)
               {
                  const std::string query=statement.at(i);
                  temp=global->eval_string(query,true,parse_status);
                  parse_status =0;
                  output.prepend(temp);
               }
               result=output(0);
             //  global=nullptr;
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
        throwUnexpected();
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
    virtual void paramWriterCommit(IInterface *writer) 
     {
     }
    virtual void writeResult(IInterface *esdl, const char *esdlservice, const char *esdltype, IInterface *writer) 
     {        
     }
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
    octave_value_list params;
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