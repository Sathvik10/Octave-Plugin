(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"src/WsDFUXref":"./lib/src/WsDFUXref.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

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

/***/ "./lib/src/WsDFUXref.js":
/*!******************************!*\
  !*** ./lib/src/WsDFUXref.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, arrayUtil, lang, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function WUGetXref(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefList", params);
    }
    exports.WUGetXref = WUGetXref;
    function DFUXRefBuild(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefBuild", params);
    }
    exports.DFUXRefBuild = DFUXRefBuild;
    function DFUXRefUnusedFiles(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefUnusedFiles", params);
    }
    exports.DFUXRefUnusedFiles = DFUXRefUnusedFiles;
    function DFUXRefFoundFiles(params) {
        var request = {
            Cluster: params
        };
        return ESPRequest.send("WsDFUXRef", "DFUXRefFoundFiles", {
            request: request
        }).then(function (response) {
            var newRows = [];
            if (lang.exists("DFUXRefFoundFilesQueryResponse.DFUXRefFoundFilesQueryResult.File", response)) {
                var results = response.DFUXRefFoundFilesQueryResponse.DFUXRefFoundFilesQueryResult.File;
                if (results.length) {
                    arrayUtil.forEach(results, function (row, idx) {
                        newRows.push({
                            Name: row.Partmask,
                            Modified: row.Modified,
                            Parts: row.Numparts,
                            Size: row.Size
                        });
                    });
                }
                else if (results.Partmask) {
                    newRows.push({
                        Name: results.Partmask,
                        Modified: results.Modified,
                        Parts: results.Numparts,
                        Size: results.Size
                    });
                }
            }
            return newRows;
        });
    }
    exports.DFUXRefFoundFiles = DFUXRefFoundFiles;
    function DFUXRefOrphanFiles(params) {
        var request = {
            Cluster: params
        };
        return ESPRequest.send("WsDFUXRef", "DFUXRefOrphanFiles", {
            request: request
        }).then(function (response) {
            var newRows = [];
            if (lang.exists("DFUXRefOrphanFilesQueryResponse.DFUXRefOrphanFilesQueryResult.File", response)) {
                var results = response.DFUXRefOrphanFilesQueryResponse.DFUXRefOrphanFilesQueryResult.File;
                if (results.length) {
                    arrayUtil.forEach(results, function (row, idx) {
                        newRows.push({
                            Name: row.Partmask,
                            Modified: row.Modified,
                            PartsFound: row.Partsfound,
                            TotalParts: row.Numparts,
                            Size: row.Size
                        });
                    });
                }
                else if (results.Partmask) {
                    newRows.push({
                        Name: results.Partmask,
                        Modified: results.Modified,
                        PartsFound: results.Partsfound,
                        TotalParts: results.Numparts,
                        Size: results.Size
                    });
                }
            }
            return newRows;
        });
    }
    exports.DFUXRefOrphanFiles = DFUXRefOrphanFiles;
    function DFUXRefMessages(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefMessages", params);
    }
    exports.DFUXRefMessages = DFUXRefMessages;
    function DFUXRefCleanDirectories(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefCleanDirectories", params);
    }
    exports.DFUXRefCleanDirectories = DFUXRefCleanDirectories;
    function DFUXRefLostFiles(params) {
        var request = {
            Cluster: params
        };
        return ESPRequest.send("WsDFUXRef", "DFUXRefLostFiles", {
            request: request
        }).then(function (response) {
            var newRows = [];
            if (lang.exists("DFUXRefLostFilesQueryResponse.DFUXRefLostFilesQueryResult.File", response)) {
                var results = response.DFUXRefLostFilesQueryResponse.DFUXRefLostFilesQueryResult.File;
                if (results.length) {
                    arrayUtil.forEach(results, function (row, idx) {
                        newRows.push({
                            Name: row.Name,
                            Modified: row.Modified,
                            Numparts: row.Numparts,
                            Size: row.Size,
                            Partslost: row.Partslost,
                            Primarylost: row.Primarylost,
                            Replicatedlost: row.Replicatedlost
                        });
                    });
                }
                else if (results.Name) {
                    newRows.push({
                        Name: results.Name,
                        Modified: results.Modified,
                        Numparts: results.Numparts,
                        Size: results.Size,
                        Partslost: results.Partslost,
                        Primarylost: results.Primarylost,
                        Replicatedlost: results.Replicatedlost
                    });
                }
            }
            return newRows;
        });
    }
    exports.DFUXRefLostFiles = DFUXRefLostFiles;
    function DFUXRefDirectories(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefDirectories", params);
    }
    exports.DFUXRefDirectories = DFUXRefDirectories;
    function DFUXRefBuildCancel(params) {
        return ESPRequest.send("WsDFUXRef", "DFUXRefBuildCancel", params);
    }
    exports.DFUXRefBuildCancel = DFUXRefBuildCancel;
    function DFUXRefArrayAction(xrefFiles, actionType, cluster, type) {
        arrayUtil.forEach(xrefFiles, function (item, idx) {
            item.qualifiedName = item.Name;
        });
        var request = {
            XRefFiles: xrefFiles,
            Action: actionType,
            Cluster: cluster,
            Type: type
        };
        ESPRequest.flattenArray(request, "XRefFiles", "qualifiedName");
        return ESPRequest.send("WsDFUXRef", "DFUXRefArrayAction", {
            request: request
        }).then(function (response) {
            if (lang.exists("DFUXRefArrayActionResponse.DFUXRefArrayActionResult", response)) {
                if (response.DFUXRefArrayActionResponse.DFUXRefArrayActionResult.Value) {
                    dojo.publish("hpcc/brToaster", {
                        Severity: "Message",
                        Source: "WsDfu.DFUXRefArrayAction",
                        Exceptions: [{ Message: response.DFUXRefArrayActionResponse.DFUXRefArrayActionResult.Value }]
                    });
                }
            }
            return response;
        });
    }
    exports.DFUXRefArrayAction = DFUXRefArrayAction;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsDFUXref.js.map

/***/ })

}]);