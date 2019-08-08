// *** Include file generated by HIDL Version 1.3 from ws_ecl_client.ecm ***
// *** Not to be hand edited (changes will be lost on re-generation) ***

#ifndef ws_ecl_client_SCM_INCL
#define ws_ecl_client_SCM_INCL

#include "esp.hpp"



#ifndef WS_ECL_CLIENT_API
#define WS_ECL_CLIENT_API DECL_IMPORT
#endif

enum WsEclClientRequestState
{
	ESP_CLIENT_REQUEST_OK = 0,
	ESP_CLIENT_REQUEST_CONNECTION_ERROR = 1,
	ESP_CLIENT_REQUEST_NORMAL_ERROR = 2
};



// IClientHeaderFileSearchResp is used to access the result set of the query
//

interface IClientWsEclResp : extends IInterface
{
	virtual unsigned long getRequestId() = 0;
	virtual unsigned long getClientValue() = 0;
	virtual WsEclClientRequestState getRequestState() = 0;
	virtual const char * getResultsXML() = 0;
	virtual const char * getSoapMessage() = 0;
	virtual const char * getStatusMessage(StringBuffer & message) = 0;
	virtual const char * getHttpMessage(StringBuffer & message) = 0;
};



// IClientHeaderFileSearchRequest is used to set up a simple ECL query
//



interface IClientRequestNode : extends IInterface
{
	virtual void addTag(const char * name, const char * value) = 0;
	virtual void addIntTag(const char * name, int value) = 0;
	virtual void setTag(const char * name, const char * value) = 0;
	virtual bool hasTag(const char * name) = 0;
	virtual void addAttr(const char * name, const char * value) = 0;
	virtual IClientRequestNode & addChild(const char * name) = 0;
	virtual IClientRequestNode & addChild(const char * name, const char * value) = 0;
	virtual void addDataset(const char * name, const char * ds) = 0;
};


interface IClientWsEclRequest : extends IClientRequestNode
{
	virtual void setUrl(const char * URL) = 0;
	virtual void setNamespace(const char * ns) = 0;
	virtual void setNamespaceVar(const char * nsvar) = 0;
	virtual void setSoapAction(const char * action) = 0;
	virtual void setClientValue(unsigned long cv) = 0;
	virtual void addArray(const char * name, StringArray & array) = 0;
	virtual void setNoSecurityHeader(bool noHeader) = 0;
	virtual void setSpecialMethod(const char * method) = 0;
	virtual void disableKeepAlive() = 0;
	virtual const char * getSerializedContent() = 0;
	virtual void setSerializedContent(const char * c) = 0;
	virtual void setItemTag(const char * tag) = 0;
	virtual IClientRequestNode & addHeader(const char * name, const char * ns) = 0;
	virtual void appendSerializedContent(const char * c) = 0;
};




interface IClientWsEclEvents : extends IInterface
{
	virtual int onComplete(IClientWsEclResp & resp) = 0;
	virtual int onError(IClientWsEclResp & resp) = 0;
};


interface IClientWsEclService : extends IInterface
{
	virtual void addServiceUrl(const char * url) = 0;
	virtual void removeServiceUrl(const char * url) = 0;
	virtual const char * queryServiceUrl() = 0;
	virtual IClientWsEclRequest * createRequest(const char * methodName) = 0;
	virtual IClientWsEclResp * search(IClientWsEclRequest * request) = 0;
	virtual void searchAsync(IClientWsEclRequest * request, IClientWsEclEvents & events) = 0;
	virtual IClientWsEclResp * searchEx(IClientWsEclRequest * request, const char * user, const char * pw, const char * relm) = 0;
	virtual IClientWsEclResp * searchEx(IClientWsEclRequest * request, const char * URL, const char * user, const char * pw, const char * relm) = 0;
	virtual IClientWsEclResp * sendHttpRequest(IClientWsEclRequest * request, const char * method, const char * URL, const char * user, const char * pw, const char * realm, const char * httpPostVariableName, bool encodeHttpPostBody) = 0;
};



extern "C" WS_ECL_CLIENT_API IClientWsEclService * getWsEclClient();
extern "C" WS_ECL_CLIENT_API IClientWsEclService * createWsEclClient();





#endif // _ws_ecl_client_SCM_INCL
//end
