(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/ESPQuery":"./lib/src/ESPQuery.js",
	"src/WsEcl":"./lib/src/WsEcl.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./lib/src/ESPQuery.js":
/*!*****************************!*\
  !*** ./lib/src/ESPQuery.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dojox/xml/parser */ "./node_modules/dojox/xml/parser.js"), __webpack_require__(/*! ./WsWorkunits */ "./lib/src/WsWorkunits.js"), __webpack_require__(/*! ./WsEcl */ "./lib/src/WsEcl.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPWorkunit */ "./lib/src/ESPWorkunit.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, arrayUtil, lang, nlsHPCC, Deferred, Observable, topic, parser, WsWorkunits, WsEcl, ESPRequest, ESPUtil, ESPWorkunit) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = declare([ESPRequest.Store], {
        i18n: nlsHPCC,
        service: "WsWorkunits",
        action: "WUListQueries",
        responseQualifier: "WUListQueriesResponse.QuerysetQueries.QuerySetQuery",
        responseTotalQualifier: "WUListQueriesResponse.NumberOfQueries",
        idProperty: "__hpcc_id",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        _watched: [],
        create: function (__hpcc_id) {
            var tmp = __hpcc_id.split(":");
            return new Query({
                __hpcc_id: __hpcc_id,
                QuerySetId: tmp[0],
                Id: tmp[1]
            });
        },
        update: function (id, item) {
            var storeItem = this.get(id);
            storeItem.updateData(item);
            if (!this._watched[id]) {
                var context = this;
                this._watched[id] = storeItem.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        context.notify(storeItem, id);
                    }
                });
            }
        },
        preProcessRow: function (item, request, query, options) {
            var context = this;
            var ErrorCount = 0;
            var StatusMessage;
            var MixedNodeStates;
            item[this.idProperty] = item.QuerySetId + ":" + item.Id;
            if (lang.exists("Clusters", item)) {
                arrayUtil.some(item.Clusters.ClusterQueryState, function (cqs, idx) {
                    if (lang.exists("Errors", cqs) && cqs.Errors || cqs.State !== "Available") {
                        ErrorCount++;
                        StatusMessage = context.i18n.SuspendedByCluster;
                        return false;
                    }
                    if (lang.exists("MixedNodeStates", cqs) && cqs.MixedNodeStates === true) {
                        StatusMessage = context.i18n.MixedNodeStates;
                        MixedNodeStates = true;
                    }
                });
            }
            if (item.Suspended === true) {
                StatusMessage = this.i18n.SuspendedByUser;
            }
            lang.mixin(item, {
                ErrorCount: ErrorCount,
                Status: StatusMessage,
                MixedNodeStates: MixedNodeStates
            });
        }
    });
    var Query = declare([ESPUtil.Singleton], {
        i18n: nlsHPCC,
        constructor: ESPUtil.override(function (inherited, args) {
            inherited(arguments);
            if (args) {
                declare.safeMixin(this, args);
            }
            this.queries = {};
        }),
        refresh: function (full) {
            return this.getDetails();
        },
        getDetails: function (args) {
            var context = this;
            return WsWorkunits.WUQueryDetails({
                request: {
                    QueryId: this.Id,
                    QuerySet: this.QuerySetId,
                    IncludeSuperFiles: 1,
                    IncludeStateOnClusters: 1
                }
            }).then(function (response) {
                if (lang.exists("WUQueryDetailsResponse", response)) {
                    context.updateData(response.WUQueryDetailsResponse);
                }
                return response;
            });
        },
        getWorkunit: function () {
            return ESPWorkunit.Get(this.Wuid);
        },
        SubmitXML: function (xml) {
            var deferred = new Deferred();
            if (this.queries[xml]) {
                deferred.resolve(this.queries[xml]);
            }
            else {
                var domXml = parser.parse(xml);
                var query = {};
                arrayUtil.forEach(domXml.firstChild.childNodes, function (item, idx) {
                    if (item.tagName) {
                        query[item.tagName] = item.textContent;
                    }
                });
                var context = this;
                WsEcl.Submit(this.QuerySetId, this.Id, query).then(function (response) {
                    context.queries[xml] = response;
                    deferred.resolve(response);
                    return response;
                });
            }
            return deferred.promise;
        },
        showResetQueryStatsResponse: function (responses) {
            var sv = "Error";
            var msg = "Invalid response";
            if (lang.exists("WUQuerySetQueryActionResponse.Results", responses[0])) {
                var result = responses[0].WUQuerySetQueryActionResponse.Results.Result[0];
                if (result.Success === 0) {
                    msg = this.i18n.Exception + ": code=" + result.Code + " message=" + result.Message;
                }
                else {
                    sv = "Message";
                    msg = result.Message;
                }
            }
            topic.publish("hpcc/brToaster", {
                Severity: sv,
                Source: "WsWorkunits.WUQuerysetQueryAction",
                Exceptions: [{ Source: "ResetQueryStats", Message: msg }]
            });
        },
        doAction: function (action) {
            var context = this;
            return WsWorkunits.WUQuerysetQueryAction([{
                    QuerySetId: this.QuerySetId,
                    Id: this.Id,
                    Name: this.Name
                }], action).then(function (responses) {
                context.refresh();
                if (action === "ResetQueryStats")
                    context.showResetQueryStatsResponse(responses);
                return responses;
            });
        },
        setSuspended: function (suspended) {
            return this.doAction(suspended ? "Suspend" : "Unsuspend");
        },
        setActivated: function (activated) {
            return this.doAction(activated ? "Activate" : "Deactivate");
        },
        doReset: function () {
            return this.doAction("ResetQueryStats");
        },
        doDelete: function () {
            return this.doAction("Delete");
        }
    });
    function Get(QuerySetId, Id, data) {
        var store = new Store();
        var retVal = store.get(QuerySetId + ":" + Id);
        if (data) {
            retVal.updateData(data);
        }
        return retVal;
    }
    exports.Get = Get;
    function GetFromRequestXML(QuerySetId, requestXml) {
        try {
            var domXml = parser.parse(requestXml);
            //  Not all XML is a "Request"  ---
            if (lang.exists("firstChild.tagName", domXml) && domXml.firstChild.tagName.indexOf("Request") === domXml.firstChild.tagName.length - 7) {
                return this.Get(QuerySetId, domXml.firstChild.tagName.slice(0, -7));
            }
        }
        catch (e) {
        }
        return null;
    }
    exports.GetFromRequestXML = GetFromRequestXML;
    function CreateQueryStore(options) {
        var store = new Store(options);
        return new Observable(store);
    }
    exports.CreateQueryStore = CreateQueryStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPQuery.js.map

/***/ }),

/***/ "./lib/src/WsEcl.js":
/*!**************************!*\
  !*** ./lib/src/WsEcl.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/request */ "./node_modules/dojo/request.js"), __webpack_require__(/*! dojo/request/script */ "./node_modules/dojo/request/script.js"), __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"), __webpack_require__(/*! ./WsTopology */ "./lib/src/WsTopology.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, lang, arrayUtil, Deferred, request, script, xhr, WsTopology) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _flattenResults(results) {
        if (Object.prototype.toString.call(results) === '[object Array]') {
            for (var i = 0; i < results.length; ++i) {
                results[i] = this._flattenResults(results[i]);
            }
        }
        else if (Object.prototype.toString.call(results) === '[object Object]') {
            for (var key in results) {
                results[key] = this._flattenResults(results[key]);
                if (key === "Row") {
                    return results.Row;
                }
            }
        }
        return results;
    }
    exports._flattenResults = _flattenResults;
    //http://192.168.1.201:8002/WsEcl/submit/query/roxie/countydeeds.1/json?year=2013&jsonp=XYZ
    function Call(target, method, query) {
        var deferred = new Deferred();
        var context = this;
        var request = null;
        if (dojoConfig.urlInfo.baseHost) {
            request = script.get(dojoConfig.urlInfo.baseHost + "/WsEcl/submit/query/" + target + "/" + method + "/json", {
                query: query,
                jsonp: "jsonp"
            });
        }
        else {
            request = xhr.get("/WsEcl/submit/query/" + target + "/" + method + "/json", {
                query: query,
                handleAs: "json"
            });
        }
        request.then(function (response) {
            var results = response[method + "Response"] && response[method + "Response"].Results ? response[method + "Response"].Results : {};
            results = context._flattenResults(results);
            deferred.resolve(results);
        });
        return deferred.promise;
    }
    exports.Call = Call;
    function CallURL(url, query) {
        //  http://X.X.X.X:8002/WsEcl/submit/query/roxie/method/json
        var urlParts = url.split("/");
        var method = urlParts[urlParts.length - 2];
        var context = this;
        return script.get(url, {
            query: query,
            jsonp: "jsonp"
        }).then(function (response) {
            var results = response[method + "Response"] && response[method + "Response"].Results ? response[method + "Response"].Results : {};
            return context._flattenResults(results);
        });
    }
    exports.CallURL = CallURL;
    function Submit(target, method, query) {
        var deferred = new Deferred();
        var context = this;
        WsTopology.GetWsEclURL("submit").then(function (response) {
            var url = response + target + "/" + method + "/json";
            script.get(url, {
                query: query,
                jsonp: "jsonp"
            }).then(function (response) {
                var results = response[method + "Response"] && response[method + "Response"].Results ? response[method + "Response"].Results : {};
                results = context._flattenResults(results);
                if (lang.exists("Exceptions.Exception", response)) {
                    results.Exception = response.Exceptions.Exception;
                }
                deferred.resolve(results);
            });
        });
        return deferred.promise;
    }
    exports.Submit = Submit;
    function SubmitXML(target, domXml) {
        domXml = domXml.firstChild;
        var method = domXml.tagName;
        method = method.slice(0, -7); //"Request"
        var query = {};
        arrayUtil.forEach(domXml.childNodes, function (item, idx) {
            query[item.tagName] = item.textContent;
        });
        return this.Submit(target, method, query);
    }
    exports.SubmitXML = SubmitXML;
    //http://192.168.1.201:8002/WsEcl/example/request/query/roxie/countydeeds.1
    function ExampleRequest(target, method) {
        var deferred = new Deferred();
        WsTopology.GetWsEclURL("example/request").then(function (response) {
            var url = response + target + "/" + method;
            //  HPCC-10488  ---
            //  script.get(url, {
            //    query: query,
            //    jsonp: "jsonp"
            request.get(url, {
                handleAs: "xml"
            }).then(function (response) {
                var fields = [];
                arrayUtil.forEach(response.getElementsByTagName(method + "Request"), function (item, idx) {
                    arrayUtil.forEach(item.childNodes, function (child_item, idx) {
                        fields.push(child_item.tagName);
                    });
                });
                deferred.resolve(fields);
            });
        });
        return deferred.promise;
    }
    exports.ExampleRequest = ExampleRequest;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsEcl.js.map

/***/ })

}]);