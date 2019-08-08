(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"src/ESPDFUWorkunit":"./lib/src/ESPDFUWorkunit.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./eclwatch/DelayLoadWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/DelayLoadWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, dom, domStyle,
    ContentPane,
    Utility) {
        return declare("DelayLoadWidget", [ContentPane], {
            __ensurePromise: undefined,
            __initPromise: undefined,
            refresh: null,

            style: {
                margin: "0px",
                padding: "0px"
            },

            startLoading: function (targetNode) {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "block");
                    domStyle.set(loadingOverlay, "opacity", "255");
                }
            },

            stopLoading: function () {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "none");
                    domStyle.set(loadingOverlay, "opacity", "0");
                }
            },

            ensureWidget: function () {
                if (this.__ensurePromise) return this.__ensurePromise;
                var context = this;
                this.__ensurePromise = new Promise(function (resolve, reject) {
                    context.startLoading();
                    Utility.resolve(context.delayWidget, function (Widget) {
                        var widgetInstance = new Widget(lang.mixin({
                            id: context.childWidgetID,
                            style: {
                                margin: "0px",
                                padding: "0px",
                                width: "100%",
                                height: "100%"
                            }
                        }, context.delayProps ? context.delayProps : {}));
                        context.widget = {};
                        context.widget[widgetInstance.id] = widgetInstance;
                        context.containerNode.appendChild(widgetInstance.domNode);
                        widgetInstance.startup();
                        widgetInstance.resize();
                        if (widgetInstance.refresh) {
                            context.refresh = function (params) {
                                widgetInstance.refresh(params);
                            }
                        }
                        context.stopLoading();
                        resolve(widgetInstance);
                    });
                });
                return this.__ensurePromise;
            },

            //  Implementation  ---
            reset:function() {
                for (var key in this.widget) {
                    this.widget[key].destroyRecursive();
                    delete this.widget[key];
                }
                delete this.widget;
                delete this.deferred;
                delete this.__hpcc_initalized;
                delete this.childWidgetID;
                this.containerNode.innerHTML = "";
            },

            init: function (params) {
                if (this.__initPromise) return this.__initPromise;
                this.childWidgetID = this.id + "-DL";
                var context = this;
                this.__initPromise = new Promise(function (resolve, reject) {
                    context.ensureWidget().then(function (widget) {
                        widget.init(params);
                        if (context.__hpcc_hash) {
                            context.doRestoreFromHash(context.__hpcc_hash);
                            context.__hpcc_hash = null;
                        }
                        //  Let page finish initial render ---
                        setTimeout(function () {
                            resolve(widget);
                        }, 20);
                    });
                });
                return this.__initPromise;
            },

            restoreFromHash: function (hash) {
                if (this.widget && this.widget[this.childWidgetID]) {
                    this.doRestoreFromHash(hash);
                } else {
                    this.__hpcc_hash = hash;
                }
            },
            doRestoreFromHash: function (hash) {
                if (this.widget[this.childWidgetID].restoreFromHash) {
                    this.widget[this.childWidgetID].restoreFromHash(hash);
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ESPDFUWorkunit.js":
/*!***********************************!*\
  !*** ./lib/src/ESPDFUWorkunit.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! ./FileSpray */ "./lib/src/FileSpray.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, nlsHPCC, Observable, topic, FileSpray, ESPUtil, ESPRequest, Utility) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var i18n = nlsHPCC;
    var Store = declare([ESPRequest.Store], {
        service: "FileSpray",
        action: "GetDFUWorkunits",
        responseQualifier: "GetDFUWorkunitsResponse.results.DFUWorkunit",
        responseTotalQualifier: "GetDFUWorkunitsResponse.NumWUs",
        idProperty: "ID",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        _watched: [],
        preRequest: function (request) {
            switch (request.Sortby) {
                case "ClusterName":
                    request.Sortby = "Cluster";
                    break;
                case "JobName":
                    request.Sortby = "Jobname";
                    break;
                case "Command":
                    request.Sortby = "Type";
                    break;
                case "StateMessage":
                    request.Sortby = "State";
                    break;
            }
        },
        create: function (id) {
            return new Workunit({
                ID: id,
                Wuid: id
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
        }
    });
    var Workunit = declare([ESPUtil.Singleton, ESPUtil.Monitor], {
        //  Asserts  ---
        _assertHasWuid: function () {
            if (!this.Wuid) {
                throw new Error(i18n.Wuidcannotbeempty);
            }
        },
        //  Attributes  ---
        Wuid: "",
        text: "",
        resultCount: 0,
        results: [],
        graphs: [],
        exceptions: [],
        timers: [],
        _StateSetter: function (state) {
            this.State = state;
            this.set("hasCompleted", FileSpray.isComplete(this.State));
        },
        _hasCompletedSetter: function (completed) {
            var justCompleted = lang.exists("hasCompleted", this) && !this.hasCompleted && completed;
            this.hasCompleted = completed;
            if (justCompleted) {
                topic.publish("hpcc/dfu_wu_completed", this);
            }
        },
        _CommandSetter: function (command) {
            this.Command = command;
            if (command in FileSpray.CommandMessages) {
                this.set("CommandMessage", FileSpray.CommandMessages[command]);
            }
            else {
                this.set("CommandMessage", i18n.Unknown + " (" + command + ")");
            }
        },
        _SourceFormatSetter: function (format) {
            this.SourceFormat = format;
            if (format in FileSpray.FormatMessages) {
                this.set("SourceFormatMessage", FileSpray.FormatMessages[format]);
            }
            else {
                this.set("SourceFormatMessage", i18n.Unknown + " (" + format + ")");
            }
        },
        _DestFormatSetter: function (format) {
            this.DestFormat = format;
            if (format in FileSpray.FormatMessages) {
                this.set("DestFormatMessage", FileSpray.FormatMessages[format]);
            }
            else {
                this.set("DestFormatMessage", i18n.Unknown + " (" + format + ")");
            }
        },
        onCreate: function () {
        },
        onUpdate: function () {
        },
        onSubmit: function () {
        },
        constructor: ESPUtil.override(function (inherited, args) {
            inherited(arguments);
            if (args) {
                declare.safeMixin(this, args);
            }
            this.wu = this;
        }),
        isComplete: function () {
            return this.hasCompleted;
        },
        isDeleted: function () {
            return this.State === 999;
        },
        monitor: function (callback) {
            if (callback) {
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
        create: function (ecl) {
        },
        update: function (request) {
            this._assertHasWuid();
            lang.mixin(request, {
                ID: this.Wuid
            });
            var outerRequest = {
                "wu.ID": request.ID,
                "wu.isProtected": request.isProtected,
                "wu.JobName": request.JobName,
                isProtectedOrig: this.isProtected,
                JobNameOrig: this.JobName
            };
            var context = this;
            FileSpray.UpdateDFUWorkunit({
                request: outerRequest
            }).then(function (response) {
                context.refresh();
            });
        },
        submit: function (target) {
        },
        fetchXML: function (onFetchXML) {
            FileSpray.DFUWUFile({
                request: {
                    Wuid: this.Wuid
                }
            }).then(function (response) {
                onFetchXML(response);
            });
        },
        _resubmit: function (clone, resetWorkflow, callback) {
        },
        resubmit: function (callback) {
        },
        _action: function (action) {
            var context = this;
            return FileSpray.DFUWorkunitsAction([this], action, {}).then(function (response) {
                context.refresh();
            });
        },
        abort: function () {
            return FileSpray.AbortDFUWorkunit({
                request: {
                    wuid: this.Wuid
                }
            });
        },
        doDelete: function (callback) {
            return this._action("Delete");
        },
        refresh: function (full) {
            this.getInfo({
                onAfterSend: function () {
                }
            });
        },
        getInfo: function (args) {
            this._assertHasWuid();
            var context = this;
            FileSpray.GetDFUWorkunit({
                request: {
                    wuid: this.Wuid
                }
            }).then(function (response) {
                if (lang.exists("GetDFUWorkunitResponse.result", response)) {
                    context.updateData(response.GetDFUWorkunitResponse.result);
                    if (args.onAfterSend) {
                        args.onAfterSend(context);
                    }
                }
            });
        },
        getState: function () {
            return this.State;
        },
        getProtectedImage: function () {
            if (this.isProtected) {
                return Utility.getImageURL("locked.png");
            }
            return Utility.getImageURL("unlocked.png");
        },
        getStateIconClass: function () {
            switch (this.State) {
                case 1:
                    return "iconWarning";
                case 2:
                    return "iconSubmitted";
                case 3:
                    return "iconRunning";
                case 4:
                    return "iconFailed";
                case 5:
                    return "iconFailed";
                case 6:
                    return "iconCompleted";
                case 7:
                    return "iconRunning";
                case 8:
                    return "iconAborting";
                case 999:
                    return "iconDeleted";
            }
            return "iconWorkunit";
        },
        getStateImage: function () {
            switch (this.State) {
                case 1:
                    return Utility.getImageURL("workunit_warning.png");
                case 2:
                    return Utility.getImageURL("workunit_submitted.png");
                case 3:
                    return Utility.getImageURL("workunit_running.png");
                case 4:
                    return Utility.getImageURL("workunit_failed.png");
                case 5:
                    return Utility.getImageURL("workunit_failed.png");
                case 6:
                    return Utility.getImageURL("workunit_completed.png");
                case 7:
                    return Utility.getImageURL("workunit_running.png");
                case 8:
                    return Utility.getImageURL("workunit_aborting.png");
                case 999:
                    return Utility.getImageURL("workunit_deleted.png");
            }
            return Utility.getImageURL("workunit.png");
        }
    });
    function isInstanceOfWorkunit(obj) {
        return obj && obj.isInstanceOf && obj.isInstanceOf(Workunit);
    }
    exports.isInstanceOfWorkunit = isInstanceOfWorkunit;
    function Get(wuid, data) {
        var store = new Store();
        var retVal = store.get(wuid);
        if (data) {
            retVal.updateData(data);
        }
        return retVal;
    }
    exports.Get = Get;
    function CreateWUQueryStore(options) {
        var store = new Store(options);
        store = Observable(store);
        return store;
    }
    exports.CreateWUQueryStore = CreateWUQueryStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPDFUWorkunit.js.map

/***/ })

}]);