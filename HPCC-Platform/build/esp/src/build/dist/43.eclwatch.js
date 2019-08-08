(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/ESPActivity":"./lib/src/ESPActivity.js",
	"src/ESPQueue":"./lib/src/ESPQueue.js",
	"src/WsSMC":"./lib/src/WsSMC.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ "./lib/src/ESPActivity.js":
/*!********************************!*\
  !*** ./lib/src/ESPActivity.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! ./WsSMC */ "./lib/src/WsSMC.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPQueue */ "./lib/src/ESPQueue.js"), __webpack_require__(/*! ./ESPWorkunit */ "./lib/src/ESPWorkunit.js"), __webpack_require__(/*! ./ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"), __webpack_require__(/*! ./WsWorkunits */ "./lib/src/WsWorkunits.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, arrayUtil, lang, Memory, Observable, WsSMC, ESPUtil, ESPQueue, ESPWorkunit, ESPDFUWorkunit, WsWorkunits) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = declare([Memory], {
        idProperty: "__hpcc_id",
        mayHaveChildren: function (item) {
            return (item.getChildCount && item.getChildCount());
        },
        getChildren: function (parent, options) {
            return parent.queryChildren();
        }
    });
    var Activity = declare([ESPUtil.Singleton, ESPUtil.Monitor], {
        //  Asserts  ---
        _assertHasWuid: function () {
            if (!this.Wuid) {
                throw new Error("Wuid cannot be empty.");
            }
        },
        //  Attributes  ---
        _StateIDSetter: function (StateID) {
            this.StateID = StateID;
            var actionEx = lang.exists("ActionEx", this) ? this.ActionEx : null;
            this.set("hasCompleted", WsWorkunits.isComplete(this.StateID, actionEx));
        },
        //  ---  ---  ---
        constructor: function (args) {
            this._watched = [];
            this.store = new Store();
            this.observableStore = new Observable(this.store);
        },
        isInstanceOfQueue: function (obj) {
            return ESPQueue.isInstanceOfQueue(obj);
        },
        isInstanceOfWorkunit: function (obj) {
            return ESPWorkunit.isInstanceOfWorkunit(obj) || ESPDFUWorkunit.isInstanceOfWorkunit(obj);
        },
        setBanner: function (request) {
            lang.mixin(request, {
                FromSubmitBtn: true,
                BannerAction: request.BannerAction ? 1 : 0,
                EnableChatURL: 0
            });
            this.getActivity(request);
        },
        resolve: function (id) {
            var queue = this.observableStore.get(id);
            if (queue) {
                return queue;
            }
            var wu = id[0] === "D" ? ESPDFUWorkunit.Get(id) : ESPWorkunit.Get(id);
            if (wu) {
                //  is wu still in a queue?
                queue = wu.get("ESPQueue");
                if (queue) {
                    return queue.getChild(id);
                }
            }
            return null;
        },
        monitor: function (callback) {
            if (callback && this.__hpcc_changedCount) {
                callback(this);
            }
            if (!this.hasCompleted) {
                var context = this;
                this.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue && newValue) {
                        if (callback) {
                            callback(context);
                        }
                    }
                });
            }
        },
        getActivity: function (request) {
            var context = this;
            return WsSMC.Activity({
                request: request
            }).then(function (response) {
                if (lang.exists("ActivityResponse", response)) {
                    var targetClusters = [];
                    var targetClusterMap = {};
                    context.refreshTargetClusters(lang.getObject("ActivityResponse.HThorClusterList.TargetCluster", false, response), targetClusters, targetClusterMap);
                    context.refreshTargetClusters(lang.getObject("ActivityResponse.ThorClusterList.TargetCluster", false, response), targetClusters, targetClusterMap);
                    context.refreshTargetClusters(lang.getObject("ActivityResponse.RoxieClusterList.TargetCluster", false, response), targetClusters, targetClusterMap);
                    context.refreshTargetClusters(lang.getObject("ActivityResponse.ServerJobQueues.ServerJobQueue", false, response), targetClusters, targetClusterMap);
                    context.refreshActiveWorkunits(lang.getObject("ActivityResponse.Running.ActiveWorkunit", false, response), targetClusters, targetClusterMap);
                    context.store.setData(targetClusters);
                    context.updateData(response.ActivityResponse);
                }
                return response;
            });
        },
        refreshTargetClusters: function (responseTargetClusters, targetClusters, targetClusterMap) {
            var context = this;
            if (responseTargetClusters) {
                arrayUtil.forEach(responseTargetClusters, function (item, idx) {
                    if (lang.exists("Queues.ServerJobQueue", item)) {
                        arrayUtil.forEach(item.Queues.ServerJobQueue, function (queueItem) {
                            context.refreshTargetCluster(item, queueItem, targetClusters, targetClusterMap);
                        });
                    }
                    else {
                        context.refreshTargetCluster(item, undefined, targetClusters, targetClusterMap);
                    }
                });
            }
        },
        refreshTargetCluster: function (item, queueItem, targetClusters, targetClusterMap) {
            var queue = null;
            if (item.ClusterName) {
                queue = ESPQueue.GetTargetCluster(item.ClusterName, true);
            }
            else {
                queue = ESPQueue.GetServerJobQueue(queueItem ? queueItem.QueueName : item.ServerName, true);
            }
            queue.updateData(item);
            if (queueItem) {
                queue.updateData(queueItem);
            }
            queue.set("DisplayName", queue.getDisplayName());
            queue.clearChildren();
            targetClusters.push(queue);
            targetClusterMap[queue.__hpcc_id] = queue;
            var context = this;
            if (!this._watched[queue.__hpcc_id]) {
                this._watched[queue.__hpcc_id] = queue.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        if (context.observableStore.get(queue.__hpcc_id)) {
                            context.observableStore.notify(queue, queue.__hpcc_id);
                        }
                    }
                });
            }
        },
        refreshActiveWorkunits: function (responseActiveWorkunits, targetClusters, targetClusterMap) {
            if (responseActiveWorkunits) {
                arrayUtil.forEach(responseActiveWorkunits, function (item, idx) {
                    item["__hpcc_id"] = item.Wuid;
                    var queue = null;
                    if (item.QueueName) {
                        queue = ESPQueue.GetServerJobQueue(item.QueueName);
                    }
                    if (!queue) {
                        if (item.ClusterName) {
                            queue = ESPQueue.GetTargetCluster(item.ClusterName);
                        }
                        else {
                            queue = ESPQueue.GetServerJobQueue(item.ServerName);
                        }
                    }
                    var wu = item.Server === "DFUserver" ? ESPDFUWorkunit.Get(item.Wuid) : ESPWorkunit.Get(item.Wuid);
                    wu.updateData(lang.mixin({
                        __hpcc_id: item.Wuid
                    }, item));
                    if (!wu.isComplete || !wu.isComplete()) {
                        queue.addChild(wu);
                    }
                });
            }
        },
        inRefresh: false,
        refresh: function (full) {
            var context = this;
            if (this.inRefresh) {
                return;
            }
            this.inRefresh = true;
            this.getActivity({}).then(function (response) {
                context.inRefresh = false;
            }, function (err) {
                context.inRefresh = false;
            });
        },
        getStore: function () {
            return this.observableStore;
        }
    });
    var globalActivity = null;
    function Get() {
        if (!globalActivity) {
            globalActivity = new Activity;
            globalActivity.startMonitor();
            globalActivity.refresh();
        }
        return globalActivity;
    }
    exports.Get = Get;
    function CreateActivityStore(options) {
        var store = new Store(options);
        return Observable(store);
    }
    exports.CreateActivityStore = CreateActivityStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPActivity.js.map

/***/ }),

/***/ "./lib/src/ESPQueue.js":
/*!*****************************!*\
  !*** ./lib/src/ESPQueue.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! ./WsSMC */ "./lib/src/WsSMC.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Memory, WsSMC, ESPUtil, Utility) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = declare([Memory], {
        idProperty: "__hpcc_id"
    });
    var Queue = declare([ESPUtil.Singleton, ESPUtil.Monitor], {
        constructor: function (id) {
            this.__hpcc_id = id;
            this._watched = [];
            this.children = new Memory({
                idProperty: "__hpcc_id",
                parent: this,
                data: []
            });
        },
        pause: function () {
            var context = this;
            return WsSMC.PauseQueue({
                request: {
                    ClusterType: this.ServerType,
                    QueueName: this.QueueName,
                    Cluster: this.ClusterName,
                    ServerType: this.ServerType,
                    NetworkAddress: this.NetworkAddress
                }
            }).then(function (response) {
                context.refresh();
            });
        },
        resume: function () {
            var context = this;
            return WsSMC.ResumeQueue({
                request: {
                    ClusterType: this.ServerType,
                    QueueName: this.QueueName,
                    Cluster: this.ClusterName,
                    ServerType: this.ServerType,
                    NetworkAddress: this.NetworkAddress
                }
            }).then(function (response) {
                context.refresh();
            });
        },
        clear: function () {
            var context = this;
            return WsSMC.ClearQueue({
                request: {
                    QueueName: this.QueueName,
                    ServerType: this.ServerType,
                    NetworkAddress: this.NetworkAddress,
                    Port: this.Port
                }
            }).then(function (response) {
                context.clearChildren();
                return response;
            });
        },
        setPriority: function (wuid, priority) {
            return WsSMC.SetJobPriority({
                request: {
                    QueueName: this.QueueName,
                    Wuid: wuid,
                    Priority: priority
                }
            });
        },
        moveTop: function (wuid) {
            return WsSMC.MoveJobFront({
                request: {
                    QueueName: this.QueueName,
                    Wuid: wuid
                }
            });
        },
        moveUp: function (wuid) {
            return WsSMC.MoveJobUp({
                request: {
                    QueueName: this.QueueName,
                    Wuid: wuid
                }
            });
        },
        moveDown: function (wuid) {
            return WsSMC.MoveJobDown({
                request: {
                    QueueName: this.QueueName,
                    Wuid: wuid
                }
            });
        },
        moveBottom: function (wuid) {
            return WsSMC.MoveJobBack({
                request: {
                    QueueName: this.QueueName,
                    Wuid: wuid
                }
            });
        },
        canChildMoveUp: function (id) {
            return (this.getChildIndex(id) > 0);
        },
        canChildMoveDown: function (id) {
            return (this.getChildIndex(id) < this.getChildCount() - 1);
        },
        clearChildren: function () {
            this.children.setData([]);
            this.set("DisplaySize", "");
        },
        tmp: 0,
        addChild: function (wu) {
            wu.set("ESPQueue", this);
            if (!this.children.get(wu.__hpcc_id)) {
                this.children.add(wu);
            }
            if (!this._watched[wu.__hpcc_id]) {
                var context = this;
                this._watched[wu.__hpcc_id] = wu.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        //  If child changes force the parent to refresh...
                        context.updateData({
                            childChangedCount: ++context.tmp
                        });
                    }
                });
            }
            this.set("DisplaySize", this.getChildCount());
        },
        getChild: function (id) {
            return this.children.get(id);
        },
        getChildIndex: function (id) {
            return this.children.index[id];
        },
        getChildCount: function () {
            return this.children.data.length;
        },
        queryChildren: function () {
            return this.children.query();
        }
    });
    var TargetCluster = declare([Queue], {
        _QueueNameSetter: function (QueueName) {
            this.QueueName = QueueName;
            this.ServerName = QueueName;
        },
        _ClusterTypeSetter: function (ClusterType) {
            this.ClusterType = ClusterType;
            switch (this.ClusterType) {
                case 1:
                    this.ServerType = "HThorServer";
                    break;
                case 2:
                    this.ServerType = "RoxieServer";
                    break;
                case 3:
                    this.ServerType = "ThorMaster";
                    break;
                default:
                    this.ServerType = "";
            }
        },
        refresh: function () {
            var context = this;
            return WsSMC.GetStatusServerInfo({
                request: {
                    ServerName: this.ClusterName,
                    ServerType: this.ServerType,
                    NetworkAddress: this.NetworkAddress
                }
            }).then(function (response) {
                if (lang.exists("GetStatusServerInfoResponse.StatusServerInfo.TargetClusterInfo", response)) {
                    context.updateData(response.GetStatusServerInfoResponse.StatusServerInfo.TargetClusterInfo);
                }
                return response;
            });
        },
        getDisplayName: function () {
            return this.ServerType + (this.ClusterName ? " - " + this.ClusterName : "");
        },
        isNormal: function () {
            return this.ClusterStatus === 0;
        },
        isPaused: function () {
            switch (this.ClusterStatus) {
                case 1:
                case 2:
                    return true;
            }
            return false;
        },
        pause: ESPUtil.override(function (inherited) {
            var context = this;
            return inherited(arguments).then(function (response) {
                context.updateData({
                    ClusterStatus: 2
                });
                return response;
            });
        }),
        resume: ESPUtil.override(function (inherited) {
            var context = this;
            return inherited(arguments).then(function (response) {
                context.updateData({
                    ClusterStatus: 0
                });
                return response;
            });
        }),
        getStateImageName: function () {
            switch (this.ClusterStatus) {
                case 1:
                case 2:
                    return "server_paused.png";
                case 3:
                case 4:
                    return "server_notfound.png";
            }
            return "server.png";
        },
        getStateImage: function () {
            return Utility.getImageURL(this.getStateImageName());
        }
    });
    var ServerJobQueue = declare([Queue], {
        _ServerNameSetter: function (ServerName) {
            this.ServerName = ServerName;
            this.ClusterName = ServerName;
        },
        refresh: function () {
            var context = this;
            return WsSMC.GetStatusServerInfo({
                request: {
                    ServerName: this.ServerName,
                    ServerType: this.ServerType,
                    NetworkAddress: this.NetworkAddress
                }
            }).then(function (response) {
                if (lang.exists("GetStatusServerInfoResponse.StatusServerInfo.ServerInfo.Queues.ServerJobQueue", response)) {
                    arrayUtil.forEach(response.GetStatusServerInfoResponse.StatusServerInfo.ServerInfo.Queues.ServerJobQueue, function (queueItem) {
                        if (queueItem.QueueName === context.QueueName) {
                            context.updateData(response.GetStatusServerInfoResponse.StatusServerInfo.ServerInfo);
                            context.updateData(queueItem);
                        }
                    });
                }
                return response;
            });
        },
        getDisplayName: function () {
            return this.ServerName + (this.QueueName ? " - " + this.QueueName : "");
        },
        isNormal: function () {
            return this.QueueStatus === "running";
        },
        isPaused: function () {
            if (this.QueueStatus === "paused") {
                return true;
            }
            return false;
        },
        pause: ESPUtil.override(function (inherited) {
            var context = this;
            return inherited(arguments).then(function (response) {
                context.updateData({
                    QueueStatus: "paused"
                });
                return response;
            });
        }),
        resume: ESPUtil.override(function (inherited) {
            var context = this;
            return inherited(arguments).then(function (response) {
                context.updateData({
                    QueueStatus: null
                });
                return response;
            });
        }),
        getStateImageName: function () {
            switch (this.QueueStatus) {
                case "running":
                    return "server.png";
                case "paused":
                    return "server_paused.png";
                default:
                    console.log("ESPQueue:  New State - " + this.QueueStatus);
            }
            return "server.png";
        },
        getStateImage: function () {
            return Utility.getImageURL(this.getStateImageName());
        }
    });
    var globalQueueStore = null;
    var GetGlobalQueueStore = function () {
        if (!globalQueueStore) {
            globalQueueStore = new Store();
        }
        return globalQueueStore;
    };
    function isInstanceOfQueue(obj) {
        return obj && obj.isInstanceOf && obj.isInstanceOf(Queue);
    }
    exports.isInstanceOfQueue = isInstanceOfQueue;
    function GetTargetCluster(name, createIfMissing) {
        if (createIfMissing === void 0) { createIfMissing = false; }
        var store = GetGlobalQueueStore();
        var id = "TargetCluster::" + name;
        var retVal = store.get(id);
        if (!retVal && createIfMissing) {
            retVal = new TargetCluster(id);
            store.put(retVal);
        }
        return retVal;
    }
    exports.GetTargetCluster = GetTargetCluster;
    function GetServerJobQueue(name, createIfMissing) {
        if (createIfMissing === void 0) { createIfMissing = false; }
        var store = GetGlobalQueueStore();
        var id = "ServerJobQueue::" + name;
        var retVal = store.get(id);
        if (!retVal && createIfMissing) {
            retVal = new ServerJobQueue(id);
            store.put(retVal);
        }
        return retVal;
    }
    exports.GetServerJobQueue = GetServerJobQueue;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPQueue.js.map

/***/ }),

/***/ "./lib/src/WsSMC.js":
/*!**************************!*\
  !*** ./lib/src/WsSMC.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function Activity(params) {
        return ESPRequest.send("WsSMC", "Activity", params);
    }
    exports.Activity = Activity;
    function GetStatusServerInfo(params) {
        return ESPRequest.send("WsSMC", "GetStatusServerInfo", params);
    }
    exports.GetStatusServerInfo = GetStatusServerInfo;
    function PauseQueue(params) {
        return ESPRequest.send("WsSMC", "PauseQueue", params);
    }
    exports.PauseQueue = PauseQueue;
    function ResumeQueue(params) {
        return ESPRequest.send("WsSMC", "ResumeQueue", params);
    }
    exports.ResumeQueue = ResumeQueue;
    function ClearQueue(params) {
        return ESPRequest.send("WsSMC", "ClearQueue", params);
    }
    exports.ClearQueue = ClearQueue;
    function SetJobPriority(params) {
        return ESPRequest.send("WsSMC", "SetJobPriority", params);
    }
    exports.SetJobPriority = SetJobPriority;
    function MoveJobFront(params) {
        return ESPRequest.send("WsSMC", "MoveJobFront", params);
    }
    exports.MoveJobFront = MoveJobFront;
    function MoveJobUp(params) {
        return ESPRequest.send("WsSMC", "MoveJobUp", params);
    }
    exports.MoveJobUp = MoveJobUp;
    function MoveJobDown(params) {
        return ESPRequest.send("WsSMC", "MoveJobDown", params);
    }
    exports.MoveJobDown = MoveJobDown;
    function MoveJobBack(params) {
        return ESPRequest.send("WsSMC", "MoveJobBack", params);
    }
    exports.MoveJobBack = MoveJobBack;
    function parseBuildString(build) {
        var retVal = {
            orig: build,
            prefix: "",
            postfix: "",
            version: ""
        };
        if (!build) {
            return retVal;
        }
        retVal.orig = build;
        retVal.prefix = "";
        retVal.postfix = "";
        var verArray = build.split("[");
        if (verArray.length > 1) {
            retVal.postfix = verArray[1].split("]")[0];
        }
        verArray = verArray[0].split("_");
        if (verArray.length > 1) {
            retVal.prefix = verArray[0];
            verArray.splice(0, 1);
        }
        retVal.version = verArray.join("_");
        return retVal;
    }
    exports.parseBuildString = parseBuildString;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsSMC.js.map

/***/ })

}]);