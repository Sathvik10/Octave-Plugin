(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/QuerySetSuperFilesWidget":"./eclwatch/QuerySetSuperFilesWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[141],{

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

/***/ "./eclwatch/QuerySetSuperFilesWidget.js":
/*!**********************************************!*\
  !*** ./eclwatch/QuerySetSuperFilesWidget.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"),

    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! hpcc/SFDetailsWidget */ "./eclwatch/SFDetailsWidget.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, QueryResults,
    tree, selector,
    GridDetailsWidget, DelayLoadWidget, ESPUtil, ESPQuery, SFDetailsWidget) {
        return declare("QuerySetSuperFilesWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            query: null,

            gridTitle: nlsHPCC.title_QuerySetSuperFiles,
            idProperty: "__hpcc_id",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.query = ESPQuery.Get(params.QuerySetId, params.Id);
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;
                this.store.getChildren = function (parent, options) {
                    var children = [];
                    arrayUtil.forEach(parent.SubFiles.File, function (item, idx) {
                        children.push({
                            __hpcc_id: item,
                            __hpcc_display: item,
                            __hpcc_type: "LF"
                        });
                    });
                    return QueryResults(children);
                }
                this.store.mayHaveChildren = function (object) {
                    return object.__hpcc_type;
                };
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        __hpcc_display: tree({
                            label: this.i18n.SuperFiles,
                            collapseOnRefresh: true,
                            sortable: false
                        })
                    }
                }, domID);
                return retVal;
            },

            createDetail: function (id, row, params) {
                switch (row.__hpcc_type) {
                    case "SF": {
                        return new DelayLoadWidget({
                            id: id,
                            title: row.__hpcc_id,
                            closable: true,
                            delayWidget: "SFDetailsWidget",
                            hpcc: {
                                type: "SFDetailsWidget",
                                params: {
                                    Name: row.__hpcc_id
                                }
                            }
                        });
                    }
                    case "LF": {
                        return new SFDetailsWidget.fixCircularDependency({
                            id: id,
                            title: row.__hpcc_id,
                            closable: true,
                            delayWidget: "LFDetailsWidget",
                            hpcc: {
                                type: "LFDetailsWidget",
                                params: {
                                    Name: row.__hpcc_id
                                }
                            }
                        });
                    }
                }
                return null;
            },

            refreshGrid: function (args) {
                var context = this;
                this.query.refresh().then(function (response) {
                    var superfiles = [];
                    if (lang.exists("SuperFiles.SuperFile", context.query)) {
                        arrayUtil.forEach(context.query.SuperFiles.SuperFile, function (item, idx) {
                            superfiles.push(lang.mixin({
                                __hpcc_id: item.Name,
                                __hpcc_display: item.Name,
                                __hpcc_type: "SF"
                            }, item));
                        });
                    }
                    context.store.setData(superfiles);
                    context.grid.refresh();
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);