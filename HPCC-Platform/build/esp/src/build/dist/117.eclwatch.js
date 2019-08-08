(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/HPCCPlatformRoxieWidget":"./eclwatch/HPCCPlatformRoxieWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"dojo/text!templates/HPCCPlatformRoxieWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformRoxieWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[117],{

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

/***/ "./eclwatch/HPCCPlatformRoxieWidget.js":
/*!*********************************************!*\
  !*** ./eclwatch/HPCCPlatformRoxieWidget.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/HPCCPlatformRoxieWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformRoxieWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC,
    _TabContainerWidget,
    template) {
        return declare("HPCCPlatformRoxieWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "HPCCPlatformRoxieWidget",
            i18n: nlsHPCC,

            postCreate: function (args) {
                this.inherited(arguments);
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_HPCCPlatformRoxie;
            },

            //  Hitched actions  ---

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.initTab();
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.init) {
                        currSel.init({});
                    }
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/_TabContainerWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/_TabContainerWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/hash */ "./node_modules/dojo/hash.js"),
    __webpack_require__(/*! dojo/router */ "./node_modules/dojo/router.js"),
    __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, arrayUtil, dom, hash, router, aspect,
    _Widget,
    registry) {

        return declare("_TabContainerWidget", [_Widget], {
            //  Assumptions:
            //    this.id + "BorderContainer" may exist.
            //    this.id + "TabContainer" exits.
            //    Child Tab Widgets ID have an underbar after the parent ID -> "${ID}_thisid" (this id for automatic back/forward button support.

            baseClass: "_TabContainerWidget",
            borderContainer: null,
            _tabContainer: null,

            disableHashing: 0,

            //  String helpers  ---
            idToPath: function (id) {
                var parts = id.split("_");
                return "/" + parts.join("/");
            },

            pathToId: function (path) {
                var obj = path.split("/");
                obj.splice(0, 1);
                return obj.join("_");
            },

            getFirstChildID: function (id) {
                if (id.indexOf(this.id) === 0) {
                    var childParts = id.substring(this.id.length).split("_");
                    return this.id + "_" + childParts[1];
                }
                return "";
            },

            startsWith: function (tst, str) {
                if (!tst || !str || tst.length > str.length) {
                    return false;
                }
                for (var i = 0; i < tst.length; ++i) {
                    if (tst.charAt(i) !== str.charAt(i)) {
                        return false;
                    }
                }
                return true;
            },

            buildRendering: function () {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this._tabContainer = registry.byId(this.id + "TabContainer");

                var context = this;
                this._tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                    context.onNewTabSelection({
                        oldWidget: oval,
                        newWidget: nval
                    });
                });
            },

            startup: function () {
                this.inherited(arguments);
                var context = this;
                var d = location;
                aspect.after(this, "init", function (args) {
                    this.onNewTabSelection();
                    router.register(this.getPath() + "/:sel", function (evt) {
                        context.routerCallback(evt, true);
                    });
                    router.registerBefore(this.getPath() + "/:sel/*other", function (evt) {
                        context.routerCallback(evt, false);
                    });
                    router.startup();
                });
            },

            resize: function (args) {
                this.inherited(arguments);
                if (this.borderContainer) {
                    this.borderContainer.resize();
                } else {
                    this._tabContainer.resize();
                }
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            //  Hash Helpers  ---
            onNewTabSelection: function (notification) {
                var currHash = hash();
                var newHash = this.getSelectedPath();
                if (this.disableHashing) {
                    this.go(this.getSelectedPath(), false, true);
                } else {
                    var overwrite = this.startsWith(currHash, newHash);
                    this.go(this.getSelectedPath(), overwrite);
                }
            },

            go: function (path, replace, noHash) {
                //console.log(this.id + ".go(" + path + ", " + replace + ", " + noHash + ")");
                if (!path)
                    return;

                if (noHash) {
                    var d = 0;
                } else {
                    hash(path, replace);
                }
                router._handlePathChange(path);
            },

            routerCallback: function (evt) {
                var currSel = this.getSelectedChild();
                var newSel = this.id + "_" + evt.params.sel;
                if (this.endsWith(newSel, "-DL")) {
                    newSel = newSel.substring(0, newSel.length - 3);
                }
                if (!currSel || currSel.id !== newSel) {
                    this.selectChild(newSel, null);
                } else if (this.initTab) {
                    this.initTab();
                }
            },

            getPath: function () {
                return this.idToPath(this.id);
            },

            getSelectedPath: function () {
                var selWidget = this._tabContainer.get("selectedChildWidget");
                if (!selWidget || selWidget === this._tabContainer) {
                    return null;
                }
                if (selWidget.getPath) {
                    return selWidget.getPath();
                }
                return this.idToPath(selWidget.id);
            },

            //  Tab Helpers ---
            getSelectedChild: function () {
                return this._tabContainer.get("selectedChildWidget");
            },

            getTabChildren: function () {
                return this._tabContainer.getChildren();
            },

            addChild: function (child, pos) {
                //this.disableHashing++;
                var retVal = this._tabContainer.addChild(child, pos);
                //this.disableHashing--;
                return retVal;
            },

            removeChild: function (child) {
                this._tabContainer.removeChild(child);
                child.destroyRecursive();
            },

            removeAllChildren: function () {
                var tabs = this._tabContainer.getChildren();
                for (var i = 0; i < tabs.length; ++i) {
                    this.removeChild(tabs[i]);
                }
            },

            selectChild: function (childID, doHash) {
                if (!doHash) {
                    this.disableHashing++;
                }
                var currSel = this.getSelectedChild();
                var child = registry.byId(childID);
                if (currSel !== child) {
                    var childIndex = this._tabContainer.getIndexOfChild(child);
                    if (childIndex >= 0) {
                        this._tabContainer.selectChild(child);
                    }
                } else {
                    this.onNewTabSelection({
                        oldWidget: null,
                        newWidget: child
                    })
                }
                if (!doHash) {
                    this.disableHashing--;
                }
                return child;
            },
            restoreFromHash: function (hash) {
                if (hash) {
                    var hashID = this.pathToId(hash);
                    var firstChildID = this.getFirstChildID(hashID);
                    if (firstChildID) {
                        if (this.endsWith(firstChildID, "-DL")) {
                            firstChildID = firstChildID.substring(0, firstChildID.length - 3);
                        }
                        var child = this.selectChild(firstChildID, false);
                        if (child) {
                            if (this.initTab) {
                                this.initTab();
                            }
                            if (child.restoreFromHash) {
                                child.restoreFromHash(hash);
                            }
                        }
                    }
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformRoxieWidget.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/HPCCPlatformRoxieWidget.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; margin:0; padding:0\" data-dojo-props=\"gutters:false, liveSplitters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TitlebarMini\" class=\"miniTitlebar\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}StackController\" style=\"width: 100%\" data-dojo-props=\"containerId:'${id}TabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n        </div>\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.StackContainer\">\n            <div id=\"${id}_Queries\" title=\"${i18n.Queries}\" data-dojo-props=\"delayWidget: 'QuerySetQueryWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_PackageMaps\" title=\"${i18n.PackageMaps}\" data-dojo-props=\"delayWidget: 'PackageMapQueryWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);