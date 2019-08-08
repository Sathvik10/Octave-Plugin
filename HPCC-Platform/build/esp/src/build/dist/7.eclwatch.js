(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/WsWorkunits":"./lib/src/WsWorkunits.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./lib/src/WsWorkunits.js":
/*!********************************!*\
  !*** ./lib/src/WsWorkunits.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, nlsHPCC, Deferred, all, Observable, topic, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventScheduleStore = declare([ESPRequest.Store], {
        service: "WsWorkunits",
        action: "WUShowScheduled",
        responseQualifier: "WUShowScheduledResponse.Workunits.ScheduledWU",
        idProperty: "calculatedID",
        preProcessRow: function (row) {
            lang.mixin(row, {
                calculatedID: row.Wuid + row.EventText
            });
        }
    });
    //  From common/workunit/workunit.hpp
    //  (not actually used - just for reference)
    exports.States = {
        0: "unknown",
        1: "compiled",
        2: "running",
        3: "completed",
        4: "failed",
        5: "archived",
        6: "aborting",
        7: "aborted",
        8: "blocked",
        9: "submitted",
        10: "scheduled",
        11: "compiling",
        12: "wait",
        13: "uploading_files",
        14: "debug_paused",
        15: "debug_running",
        16: "paused",
        999: "not found"
    };
    function WUCreate(params) {
        return ESPRequest.send("WsWorkunits", "WUCreate", params).then(function (response) {
            topic.publish("hpcc/ecl_wu_created", {
                wuid: response.WUCreateResponse.Workunit.Wuid
            });
            return response;
        });
    }
    exports.WUCreate = WUCreate;
    function WUUpdate(params) {
        ESPRequest.flattenMap(params.request, "ApplicationValues");
        return ESPRequest.send("WsWorkunits", "WUUpdate", params);
    }
    exports.WUUpdate = WUUpdate;
    function WUSubmit(params) {
        return ESPRequest.send("WsWorkunits", "WUSubmit", params);
    }
    exports.WUSubmit = WUSubmit;
    function WUResubmit(params) {
        return ESPRequest.send("WsWorkunits", "WUResubmit", params);
    }
    exports.WUResubmit = WUResubmit;
    function WUQueryDetails(params) {
        return ESPRequest.send("WsWorkunits", "WUQueryDetails", params);
    }
    exports.WUQueryDetails = WUQueryDetails;
    function WUGetZAPInfo(params) {
        return ESPRequest.send("WsWorkunits", "WUGetZAPInfo", params);
    }
    exports.WUGetZAPInfo = WUGetZAPInfo;
    function WUShowScheduled(params) {
        return ESPRequest.send("WsWorkunits", "WUShowScheduled", params);
    }
    exports.WUShowScheduled = WUShowScheduled;
    function WUPushEvent(params) {
        return ESPRequest.send("WsWorkunits", "WUPushEvent", params);
    }
    exports.WUPushEvent = WUPushEvent;
    function WUQuerysetAliasAction(selection, action) {
        var requests = [];
        arrayUtil.forEach(selection, function (item, idx) {
            var request = {
                QuerySetName: item.QuerySetId,
                Action: action,
                "Aliases.QuerySetAliasActionItem.0.Name": item.Name,
                "Aliases.QuerySetAliasActionItem.itemcount": 1
            };
            requests.push(ESPRequest.send("WsWorkunits", "WUQuerysetAliasAction", {
                request: request
            }));
        });
        return all(requests);
    }
    exports.WUQuerysetAliasAction = WUQuerysetAliasAction;
    function WUQuerysetQueryAction(selection, action) {
        if (action === "Deactivate") {
            return this.WUQuerysetAliasAction(selection, action);
        }
        var requests = [];
        arrayUtil.forEach(selection, function (item, idx) {
            var request = {
                QuerySetName: item.QuerySetId,
                Action: action,
                "Queries.QuerySetQueryActionItem.0.QueryId": item.Id,
                "Queries.QuerySetQueryActionItem.itemcount": 1
            };
            requests.push(ESPRequest.send("WsWorkunits", "WUQuerysetQueryAction", {
                request: request
            }));
        });
        return all(requests);
    }
    exports.WUQuerysetQueryAction = WUQuerysetQueryAction;
    function WUListQueries(params) {
        return ESPRequest.send("WsWorkunits", "WUListQueries", params);
    }
    exports.WUListQueries = WUListQueries;
    function WURecreateQuery(params) {
        return ESPRequest.send("WsWorkunits", "WURecreateQuery", params);
    }
    exports.WURecreateQuery = WURecreateQuery;
    function WUGetNumFileToCopy(params) {
        return ESPRequest.send("WsWorkunits", "WUGetNumFileToCopy", params);
    }
    exports.WUGetNumFileToCopy = WUGetNumFileToCopy;
    function WUPublishWorkunit(params) {
        return ESPRequest.send("WsWorkunits", "WUPublishWorkunit", params).then(function (response) {
            if (lang.exists("WUPublishWorkunitResponse", response)) {
                if (response.WUPublishWorkunitResponse.ErrorMesssage) {
                    topic.publish("hpcc/brToaster", {
                        Severity: "Error",
                        Source: "WsWorkunits.WUPublishWorkunit",
                        Exceptions: response.Exceptions
                    });
                }
                else {
                    dojo.publish("hpcc/brToaster", {
                        Severity: "Message",
                        Source: "WsWorkunits.WUPublishWorkunit",
                        Exceptions: [{ Source: params.request.Wuid, Message: nlsHPCC.Published + ":  " + response.WUPublishWorkunitResponse.QueryId }]
                    });
                    topic.publish("hpcc/ecl_wu_published", {
                        wuid: params.request.Wuid
                    });
                }
            }
            return response;
        });
    }
    exports.WUPublishWorkunit = WUPublishWorkunit;
    function WUQuery(params) {
        return ESPRequest.send("WsWorkunits", "WUQuery", params).then(function (response) {
            if (lang.exists("Exceptions.Exception", response)) {
                arrayUtil.forEach(response.Exceptions.Exception, function (item, idx) {
                    if (item.Code === 20081) {
                        lang.mixin(response, {
                            WUQueryResponse: {
                                Workunits: {
                                    ECLWorkunit: [{
                                            Wuid: params.request.Wuid,
                                            StateID: 999,
                                            State: "not found"
                                        }]
                                }
                            }
                        });
                    }
                });
            }
            return response;
        });
    }
    exports.WUQuery = WUQuery;
    function WUInfo(params) {
        return ESPRequest.send("WsWorkunits", "WUInfo", params).then(function (response) {
            if (lang.exists("Exceptions.Exception", response)) {
                arrayUtil.forEach(response.Exceptions.Exception, function (item, idx) {
                    if (item.Code === 20080) {
                        lang.mixin(response, {
                            WUInfoResponse: {
                                Workunit: {
                                    Wuid: params.request.Wuid,
                                    StateID: 999,
                                    State: "not found"
                                }
                            }
                        });
                    }
                });
            }
            return response;
        });
    }
    exports.WUInfo = WUInfo;
    function WUGetGraph(params) {
        return ESPRequest.send("WsWorkunits", "WUGetGraph", params);
    }
    exports.WUGetGraph = WUGetGraph;
    function WUResult(params) {
        return ESPRequest.send("WsWorkunits", "WUResult", params);
    }
    exports.WUResult = WUResult;
    function WUQueryGetGraph(params) {
        return ESPRequest.send("WsWorkunits", "WUQueryGetGraph", params);
    }
    exports.WUQueryGetGraph = WUQueryGetGraph;
    function WUFile(params) {
        lang.mixin(params, {
            handleAs: "text"
        });
        return ESPRequest.send("WsWorkunits", "WUFile", params);
    }
    exports.WUFile = WUFile;
    function WUAction(workunits, actionType, callback) {
        var request = {
            Wuids: workunits,
            WUActionType: actionType
        };
        ESPRequest.flattenArray(request, "Wuids", "Wuid");
        return ESPRequest.send("WsWorkunits", "WUAction", {
            request: request,
            load: function (response) {
                if (lang.exists("WUActionResponse.ActionResults.WUActionResult", response)) {
                    var wuMap = {};
                    arrayUtil.forEach(workunits, function (item, index) {
                        wuMap[item.Wuid] = item;
                    });
                    arrayUtil.forEach(response.WUActionResponse.ActionResults.WUActionResult, function (item, index) {
                        if (item.Result.indexOf("Failed:") === 0) {
                            topic.publish("hpcc/brToaster", {
                                Severity: "Error",
                                Source: "WsWorkunits.WUAction",
                                Exceptions: [{ Source: item.Action + " " + item.Wuid, Message: item.Result }]
                            });
                        }
                        else {
                            var wu = wuMap[item.Wuid];
                            if (actionType === "delete" && item.Result === "Success") {
                                wu.set("StateID", 999);
                                wu.set("State", "not found");
                            }
                            else if (wu.refresh) {
                                wu.refresh();
                            }
                        }
                    });
                }
                if (callback && callback.load) {
                    callback.load(response);
                }
            },
            error: function (err) {
                if (callback && callback.error) {
                    callback.error(err);
                }
            }
        });
    }
    exports.WUAction = WUAction;
    function WUGetStats(params) {
        return ESPRequest.send("WsWorkunits", "WUGetStats", params);
    }
    exports.WUGetStats = WUGetStats;
    function WUCDebug(wuid, command) {
        return ESPRequest.send("WsWorkunits", "WUCDebug", {
            skipExceptions: true,
            request: {
                Wuid: wuid,
                Command: command
            }
        }).then(function (response) {
            console.log(JSON.stringify(response));
            return response;
        });
    }
    exports.WUCDebug = WUCDebug;
    //  Stub waiting for HPCC-10308
    exports.visualisations = [
        { value: "DojoD3NDChart COLUMN", label: "Column Chart" },
        { value: "DojoD3NDChart BAR", label: "Bar Chart" },
        { value: "DojoD3NDChart LINE", label: "Line Chart" },
        { value: "DojoD3NDChart AREA", label: "Area Chart" },
        { value: "DojoD3NDChart STEP", label: "Step Chart" },
        { value: "DojoD3NDChart SCATTER", label: "Scatter Chart" },
        { value: "DojoD3NDChart RADAR", label: "Radar Chart" },
        { value: "DojoD32DChart BUBBLE", label: "Bubble Chart" },
        { value: "DojoD32DChart PIE", label: "Pie Chart" },
        { value: "DojoD32DChart RADIAL_BAR", label: "Radial Bar" },
        { value: "DojoD32DChart WORD_CLOUD", label: "Word Cloud" },
        { value: "DojoD32DChart HEX_BIN", label: "Hex Bin" },
        { value: "DojoD32DChart CONTOUR", label: "Contour" },
        { value: "DojoD3Choropleth COUNTRY", label: "Country Choropleth" },
        { value: "DojoD3Choropleth STATE", label: "US State Choropleth" },
        { value: "DojoD3Choropleth COUNTY", label: "US County Choropleth" }
    ];
    function GetVisualisations() {
        var deferred = new Deferred();
        if (this.visualisations) {
            deferred.resolve(this.visualisations);
        }
        return deferred.promise;
    }
    exports.GetVisualisations = GetVisualisations;
    function CreateEventScheduleStore(options) {
        var store = new EventScheduleStore(options);
        return Observable(store);
    }
    exports.CreateEventScheduleStore = CreateEventScheduleStore;
    //  Helpers  ---
    function isComplete(stateID, actionEx, archived) {
        if (archived) {
            return true;
        }
        switch (stateID) {
            case 1: //WUStateCompiled
                if (actionEx && actionEx === "compile") {
                    return true;
                }
                break;
            case 3: //WUStateCompleted:
            case 4: //WUStateFailed:
            case 5: //WUStateArchived:
            case 7: //WUStateAborted:
            case 999: //WUStateDeleted:
                return true;
        }
        return false;
    }
    exports.isComplete = isComplete;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsWorkunits.js.map

/***/ })

}]);