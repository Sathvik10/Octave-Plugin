(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/GridDetailsWidget":"./eclwatch/GridDetailsWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"dojo/text!templates/GridDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GridDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./eclwatch/GridDetailsWidget.js":
/*!***************************************!*\
  !*** ./eclwatch/GridDetailsWidget.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/GridDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GridDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, Memory, Observable,
    registry, Menu, MenuItem, MenuSeparator, PopupMenuItem,
    _TabContainerWidget, Utility,
    template) {
        return declare("GridDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "GridDetailsWidget",
            i18n: nlsHPCC,

            gridTitle: "Change Me",
            idProperty: "Change Me",

            store: null,
            toolbar: null,
            gridTab: null,
            grid: null,
            contextMenu: null,

            constructor: function (args) {
                this.alphanumSort = {};
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.toolbar = registry.byId(this.id + "Toolbar");
                this.gridTab = registry.byId(this.id + "_Grid");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initGrid();
                this.initContextMenu();
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onOpen: function (event, params) {
                var selections = this.grid.getSelected();
                var firstTab = null;
                for (var i = 0; i < selections.length; ++i) {
                    var tab = this.ensurePane(selections[i], params);
                    if (!firstTab && tab) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab);
                }
            },

            _onRowDblClick: function (row, params) {
                var tab = this.ensurePane(row, params);
                if (tab) {
                    this.selectChild(tab);
                }
            },

            //  Implementation  ---
            setGridNoDataMessage: function (msg) {
                if (this.grid && this.grid.store === this.store) {
                    this.grid.noDataMessage = "<span class='dojoxGridNoData'>" + msg + "</span>";
                    if (this.grid.noDataNode) {
                        this.grid.noDataNode.innerHTML = "<span class='dojoxGridNoData'>" + msg + "</span>";
                    }
                }
            },

            initGrid: function () {
                var context = this;
                var MyMemory = declare("MyMemory", [Memory], {
                    idProperty: this.idProperty,
                    data: [],
                    setData: function (data, noDataMessage) {
                        var retVal = this.inherited(arguments);
                        context.setGridNoDataMessage(noDataMessage || context.i18n.noDataMessage);
                        return retVal;
                    },
                    query: function (query, options) {
                        var retVal = this.inherited(arguments);
                        if (lang.exists("sort", options) && options.sort.length && context.alphanumSort[options.sort[0].attribute]) {
                            Utility.alphanumSort(retVal, options.sort[0].attribute, options.sort[0].descending)
                        }
                        return retVal;
                    }
                });
                var store = new MyMemory();
                this.store = Observable(store);
                this.grid = this.createGrid(this.id + "Grid");
                this.setGridNoDataMessage(this.i18n.loadingMessage);

                this.grid.on(".dgrid-row:dblclick", function (evt) {
                    if (!evt.defaultPrevented) {
                        if (context._onRowDblClick) {
                            var row = context.grid.row(evt).data;
                            context._onRowDblClick(row);
                        }
                    }
                });
                this.grid.on(".dgrid-row:dblclick", function (evt) {
                    if (!evt.defaultPrevented) {
                        if (context._onRowDblClick) {
                            var row = context.grid.row(evt).data;
                            context._onRowDblClick(row);
                        }
                    }
                });
                this.grid.onSelectionChanged(function (event) {
                    context._refreshActionState();
                });
                this.grid.startup();
            },

            getTitle: function () {
                return this.gridTitle;
            },

            appendMenuItem: function (menu, label, onClick) {
                var menuItem = new MenuItem({
                    label: label,
                    onClick: onClick
                });
                menu.addChild(menuItem);
                return menuItem;
            },

            appendContextMenuItem: function (label, onClick) {
                return this.appendMenuItem(this.contextMenu, label, onClick);
            },

            initContextMenu: function () {
                var context = this;
                this.contextMenu = new Menu({
                    targetNodeIds: [this.id + "Grid"]
                });
                this.appendContextMenuItem(this.i18n.Refresh, function () {
                    context._onRefresh();
                });
                this.contextMenu.addChild(new MenuSeparator());
                this.appendContextMenuItem(this.i18n.Open, function () {
                    context._onOpen();
                });
                if (this.appendContextMenu) {
                    this.appendContextMenu();
                }
                this.contextMenu.startup();
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel) {
                    if (!currSel.initalized) {
                        if (currSel.init && currSel.hpcc) {
                            currSel.init(currSel.hpcc.params);
                        }
                        currSel.initalized = true;
                    } else if (currSel.refresh && !currSel.noRefresh && lang.exists("hpcc.refreshParams", currSel)) {
                        currSel.refresh(currSel.hpcc.refreshParams);
                    }
                }
            },

            createDetail: function (id, row, params) {
                return null;
            },

            getDetailID: function (row, params) {
                return "Detail" + row[this.idProperty];
            },

            ensurePane: function (row, params) {
                var id = this.createChildTabID(this.getDetailID(row, params));
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = this.createDetail(id, row, params);
                    if (retVal) {
                        this.addChild(retVal);
                    }
                } else {
                    lang.mixin(retVal.hpcc, {
                        refreshParams: params
                    });
                }
                return retVal;
            },

            _refreshActionState: function () {
                var selection = this.grid.getSelected();
                this.refreshActionState(selection);
            },

            refreshActionState: function (selection) {
                registry.byId(this.id + "Open").set("disabled", !selection.length);
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GridDetailsWidget.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GridDetailsWidget.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Grid\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${gridTitle}\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <span id=\"${id}ContainerNode\" data-dojo-attach-point=\"containerNode\"></span>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}GridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}Grid\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);