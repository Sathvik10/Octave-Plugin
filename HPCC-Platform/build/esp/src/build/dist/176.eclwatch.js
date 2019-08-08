(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"ganglia/GangliaFilterDropDownWidget":"./ganglia/GangliaFilterDropDownWidget.js",
	"ganglia/GangliaWidget":"./ganglia/GangliaWidget.js",
	"ganglia/nls/bs/ganglia":"./ganglia/nls/bs/ganglia.js",
	"ganglia/nls/es/ganglia":"./ganglia/nls/es/ganglia.js",
	"ganglia/nls/ganglia":"./ganglia/nls/ganglia.js",
	"ganglia/nls/hr/ganglia":"./ganglia/nls/hr/ganglia.js",
	"ganglia/nls/hu/ganglia":"./ganglia/nls/hu/ganglia.js",
	"ganglia/nls/pt-br/ganglia":"./ganglia/nls/pt-br/ganglia.js",
	"ganglia/nls/sr/ganglia":"./ganglia/nls/sr/ganglia.js",
	"ganglia/nls/zh/ganglia":"./ganglia/nls/zh/ganglia.js",
	"ganglia/ws_rrd":"./ganglia/ws_rrd.js",
	"dojo/i18n!ganglia/nls/ganglia":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./ganglia/nls/ganglia.js",
	"dojo/text!ganglia/templates/GangliaFilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaFilterDropDownWidget.html",
	"dojo/text!ganglia/templates/GangliaWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[176],{

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

/***/ "./ganglia/GangliaFilterDropDownWidget.js":
/*!************************************************!*\
  !*** ./ganglia/GangliaFilterDropDownWidget.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/ganglia */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./ganglia/nls/ganglia.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dojo/text!./templates/GangliaFilterDropDownWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaFilterDropDownWidget.html"),

    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm,
    registry, Select,
    _Widget,
    template) {
        return declare("GangliaFilterDropDownWidget", [_Widget], {
            templateString: template,
            baseClass: "GangliaFilterDropDownWidget",
            i18n: nlsHPCC,

            _width: "660px",
            iconFilter: null,
            filterDropDown: null,
            filterForm: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filterDropDown = registry.byId(this.id + "FilterDropDown");
                this.filterForm = registry.byId(this.id + "FilterForm");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.iconFilter = dom.byId(this.id + "IconFilter");
            },

            //  Hitched actions  ---
            _onFilterClear: function (event) {
                this.clear();
            },

            _onFilterApply: function (event) {
                this.filterDropDown.closeDropDown();
                this.emit("apply");
            },

            //  Implementation  ---
            clear: function () {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    if (item instanceof Select) {
                        item.set("value", "");
                    } else {
                        item.set("value", null);
                    }
                });
            },

            setValue: function (id, value) {
                registry.byId(id).set("value", value);
                this.refreshState();
            },

            exists: function () {
                var filter = this.toObject();
                for (var key in filter) {
                    if (filter[key] != "") {
                        return true;
                    }
                }
                return false;
            },

            toObject: function () {
                if (this.filterDropDown.get("disabled")) {
                    return {};
                }
                return domForm.toObject(this.filterForm.id);
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;
            },

            open: function (event) {
                this.filterDropDown.openDropDown();
            },

            close: function (event) {
                this.filterDropDown.closeDropDown();
            },

            disable: function (disable) {
                this.filterDropDown.set("disabled", disable);
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./ganglia/GangliaWidget.js":
/*!**********************************!*\
  !*** ./ganglia/GangliaWidget.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/ganglia */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./ganglia/nls/ganglia.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),

    __webpack_require__(/*! ./GangliaFilterDropDownWidget */ "./ganglia/GangliaFilterDropDownWidget.js"),
    __webpack_require__(/*! ./ws_rrd */ "./ganglia/ws_rrd.js"),
    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),

    __webpack_require__(/*! dojo/text!./templates/GangliaWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/FilteringSelect */ "./node_modules/dijit/form/FilteringSelect.js"),
    __webpack_require__(/*! dijit/CheckedMenuItem */ "./node_modules/dijit/CheckedMenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, arrayUtil, lang, i18n, nlsHPCC, dom, arrayUtil, domConstruct, Memory, xhr, query,
    registry, Menu, MenuItem,
    GangliaFilterDropDownWidget, WsRrd, _TabContainerWidget,
    template,
    BorderContainer, TabContainer, ContentPane, Toolbar, Button) {
        return declare("GangliaWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "GangliaWidget",
            i18n: nlsHPCC,

            initalized: false,

            filter: null,
            server: "",
            cluster: "",
            metrics: null,
            epochFilter: null,
            epochNow: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
                this.serverTargetSelect = registry.byId(this.id + "ServerTargetSelect");
                this.metricsTargetSelect = registry.byId(this.id + "MetricsTargetSelect");
                this.fromGanliaDateRange = registry.byId(this.id + "FromGanliaDateRange");
                this.tabContainer = registry.byId(this.id + "TabContainer");
                this.defaultTab = registry.byId(this.id + "_Custom");
                this.filter = registry.byId(this.id + "Filter");
            },

            //  Hitched actions  ---

            //  Implementation  ---
            init: function (params) {
                var context = this;
                if (this.inherited(arguments))
                    return;

                this._buildClusters();
                this._buildMetrics();
                this._buildTabs();

                this.clusterTargetSelect.on('change', function (newValue) {
                    context.serverTargetSelect.set("value", "");
                    context.cluster = newValue;
                    context._buildServers();
                });

                this.serverTargetSelect.on('change', function (newValue) {
                    context.server = newValue;
                    context._buildMetrics();
                });

                this.metricsTargetSelect.on('change', function (newValue) {
                    context.metrics = newValue;
                });

                this.filter.on("apply", function (evt) {
                    context._onFilterApply();
                });

                this.fromGanliaDateRange.set("value", "Year");

                this.fromGanliaDateRange.on('change', function (newValue) {
                    context._calculateEpoch(newValue);
                });
            },

            _calculateEpoch: function (newValue) {
                var context = this;
                this.epochNow = Math.round(new Date().getTime() / 1000.0);
                switch (newValue) {
                    case "Year":
                        context.epochFilter = context.epochNow - 31556926;
                        break;
                    case "Month":
                        context.epochFilter = context.epochNow - 2629743;
                        break;
                    case "Week":
                        context.epochFilter = context.epochNow - 604800;
                        break;
                    case "Day":
                        context.epochFilter = context.epochNow - 86400;
                        break;
                    case "Hour":
                        context.epochFilter = context.epochNow - 3600;
                        break;
                    default:
                        context.epocFilter = context.epochNow - 31556926;
                }
            },

            _buildClusters: function () {
                var context = this;
                this.clusterTargetSelect.required = false;
                WsRrd.GangliaClusterList({
                    request: {
                        Cluster: "",
                        Server: ""
                    },
                }).then(function (response) {
                    if (lang.exists("GetAvailableClustersResponse.Clusters.Item", response)) {
                        var output = arrayUtil.map(response.GetAvailableClustersResponse.Clusters.Item, function (item, idx) {
                            return {
                                name: item,
                                id: item
                            };
                        });
                        var myStore = new Memory({
                            data: output
                        });
                        context.clusterTargetSelect.set("store", myStore);
                    }
                });
            },

            _buildServers: function (newValue) {
                var context = this;
                this.serverTargetSelect.required = false;
                WsRrd.GangliaServerList({
                    request: {
                        Cluster: this.cluster
                    },
                }).then(function (response) {
                    if (lang.exists("GetAvailableServersForMetricsResponse.Servers.Item", response)) {
                        var output = arrayUtil.map(response.GetAvailableServersForMetricsResponse.Servers.Item, function (item, idx) {
                            return {
                                name: item,
                                id: item
                            };
                        });
                        var myStore = new Memory({
                            data: output
                        });
                        context.serverTargetSelect.set("store", myStore);
                    }
                });
            },

            _buildMetrics: function (newValue) {
                var context = this;
                this.metricsTargetSelect.required = true;
                WsRrd.GangliaMetricList({
                    request: {
                        Cluster: this.cluster,
                        Server: this.server
                    },
                }).then(function (response) {
                    if (lang.exists("GetAvailableMetricsResponse.Metrics.Item", response)) {
                        var output = arrayUtil.map(response.GetAvailableMetricsResponse.Metrics.Item.sort(), function (item, idx) {
                            return {
                                name: item,
                                id: item
                            };
                        });

                        var myStore = new Memory({
                            data: output
                        });
                        context.metricsTargetSelect.set("store", myStore);
                    }
                });
            },

            _buildTabs: function () {
                var context = this;
                var tabs = registry.byId(this.id + "TabContainer");
                xhr("/esp/files/ganglia/ganglia.json", {
                    handleAs: "json"
                }).then(function (data) {
                    arrayUtil.forEach(data.tabs, function (tabItem, idx) {
                        var cleanId = tabItem.name.split(' ').join('_');
                        arrayUtil.forEach(tabItem.metrics, function (metricItem) {
                            var clean = metricItem.join('\n');
                            arrayUtil.forEach(tabItem.time, function (timeItem) {
                                context._calculateEpoch(timeItem)
                                WsRrd.GangliaRRDGraphList({
                                    request: {
                                        Clusters: "",
                                        Servers: "",
                                        RRDMetrics: clean,
                                        StartTime: context.epochFilter,
                                        EndTime: context.epochNow,
                                        Width: data.width,
                                        Height: data.height,
                                        Title: timeItem
                                    },
                                }).then(function (response) {
                                    if (lang.exists("GraphSVGDataResponse.Graph", response)) {
                                        var node = dom.byId(tabItem.name + idx);
                                        var graph = domConstruct.create("div", {
                                            innerHTML: response.GraphSVGDataResponse.Graph,
                                            id: cleanId + node.children.length,
                                            class: 'left'
                                        }, tabItem.name + idx);
                                    }
                                });
                            });
                        });
                        var bordercontainer = new BorderContainer({
                            style: "height: 100%; width: 100%;",
                            title: cleanId,
                            id: cleanId,
                            closable: true
                        });
                        var toolbar = new Toolbar({
                            region: "top"
                        });
                        var button = new Button({
                            label: "Refresh",
                            showLabel: true,
                            iconClass: "iconRefresh",
                            onClick: function () {
                                var node = dom.byId(tabItem.name + idx);
                                query(".left", node).forEach(domConstruct.destroy);
                                if (node.children.length === 0) {
                                    context._genGraphRefresh(tabItem.name + idx);
                                }
                            }
                        });
                        var contentpane = new ContentPane({
                            id: tabItem.name + idx,
                            region: "center"
                        });

                        bordercontainer.addChild(contentpane);
                        bordercontainer.addChild(toolbar);
                        toolbar.addChild(button);
                        bordercontainer.placeAt(context.tabContainer, idx);
                        bordercontainer.startup();
                    });
                    context.tabContainer.selectChild(data.tabs[0].name.split(' ').join('_'));
                    /*TODO add interval refreshes of each tab
                    setInterval(function () {
                        var node = dom.byId(tabItem.name+idx);
                        query(".left", node).forEach(domConstruct.destroy);
                        context._genGraphRefresh();
                    }, data.refreshInterval);*/
                });
            },

            _genGraphRefresh: function (id) {
                var context = this;
                xhr("/esp/files/ganglia/ganglia.json", {
                    handleAs: "json"
                }).then(function (data) {
                    arrayUtil.forEach(data.tabs, function (tabItem, idx) {
                        arrayUtil.forEach(tabItem.metrics, function (metricItem) {
                            arrayUtil.forEach(tabItem.time, function (timeItem) {
                                var clean = metricItem.join('\n');
                                context._calculateEpoch(timeItem)
                                WsRrd.GangliaRRDGraphList({
                                    request: {
                                        Clusters: "",
                                        Servers: "",
                                        RRDMetrics: clean,
                                        StartTime: context.epochFilter,
                                        EndTime: context.epochNow,
                                        Width: data.width,
                                        Height: data.height,
                                        Title: timeItem
                                    },
                                }).then(function (response) {
                                    if (lang.exists("GraphSVGDataResponse.Graph", response)) {
                                        var graph = domConstruct.create("div", {
                                            innerHTML: response.GraphSVGDataResponse.Graph,
                                            class: 'left'
                                        }, tabItem.name + idx);
                                    }
                                });
                            });
                        });
                    });
                });
            },

            _onFilterApply: function () {
                var context = this;
                var cluster = this.cluster;
                var server = this.server;
                var metrics = this.metrics;
                var epochFilter = this.epochFilter;
                var epochNow = this.epochNow;
                var graphId = this.cluster + "_" + this.server + "_" + this.metrics + "_" + this.epochFilter;

                WsRrd.GangliaRRDGraphList({
                    request: {
                        Clusters: this.cluster,
                        Servers: this.server,
                        RRDMetrics: this.metrics,
                        StartTime: this.epochFilter,
                        EndTime: this.epochNow,
                        Width: 300,
                        Height: 120,
                        Title: this.cluster + ":" + this.server + ":" + this.metrics
                    },
                }).then(function (response) {
                    if (dojo.byId(graphId)) {
                        alert(context.i18n.GraphExists);
                    } else {
                        if (lang.exists("GraphSVGDataResponse.Graph", response)) {
                            var graph = domConstruct.create("div", {
                                id: graphId,
                                innerHTML: response.GraphSVGDataResponse.Graph,
                                class: 'left'
                            }, dom.byId(context.id + "graphs"));
                        }
                    }

                    var pMenu;
                    pMenu = new Menu({
                        targetNodeIds: [graphId]
                    });
                    pMenu.addChild(new MenuItem({
                        label: "Delete Graph",
                        onClick: function () {
                            domConstruct.destroy(this.getParent().currentTarget);
                        }

                    }));
                    pMenu.addChild(new MenuItem({
                        label: "Pop Out Graph",
                        onClick: function () {
                            context._onNewGraphPage(cluster, server, metrics, epochFilter, epochNow);
                        }
                    }));
                    pMenu.startup();
                });
            },

            _onNewGraphPage: function (cluster, server, metrics, epochFilter, epochNow) {
                xhr("/esp/files/ganglia/ganglia.json", {
                    handleAs: "json"
                }).then(function (data) {
                    WsRrd.GangliaRRDGraphList({
                        request: {
                            Clusters: cluster,
                            Servers: server,
                            RRDMetrics: metrics,
                            StartTime: epochFilter,
                            EndTime: epochNow,
                            Width: data.width,
                            Height: data.height
                        },
                    }).then(function (response) {
                        if (lang.exists("GraphSVGDataResponse.Graph", response)) {
                            var newWindow = window.open('', '_blank', 'width=200,height=100');
                            var newContent = "<HTML><HEAD><TITLE>Graph</TITLE></HEAD>";
                            newContent += "<BODY><div>" + response.GraphSVGDataResponse.Graph + "</div>";
                            newContent += "</BODY></HTML>";
                            newWindow.document.write(newContent);
                            newWindow.document.close();
                        }
                    });
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./ganglia/nls/bs/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/bs/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/es/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/es/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/ganglia.js":
/*!********************************!*\
  !*** ./ganglia/nls/ganglia.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {root:
({
    AddMetric: "Add Metric",
    Clear: "Clear",
    Cluster: "Cluster",
    CurrentEpoch: "Current Epoch Time",
    CustomMonitoring: "Custom Monitoring",
    Default: "Default",
    FromDate: "From Date",
    Ganglia: "Ganglia",
    GenerateGraph: "Generate Graph",
    GraphExists: "Graph already exists. Please generate another.",
    Metrics: "Metrics",
    OpenInNewpage: "Open in new page",
    Server: "Server"
}),
"bs": true,
"es": true,
"hu": true,
"hr": true,
"pt-br": true,
"sr": true,
"zh": true
});


/***/ }),

/***/ "./ganglia/nls/hr/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/hr/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/hu/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/hu/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/pt-br/ganglia.js":
/*!**************************************!*\
  !*** ./ganglia/nls/pt-br/ganglia.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/sr/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/sr/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/nls/zh/ganglia.js":
/*!***********************************!*\
  !*** ./ganglia/nls/zh/ganglia.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
});



/***/ }),

/***/ "./ganglia/ws_rrd.js":
/*!***************************!*\
  !*** ./ganglia/ws_rrd.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, Observable,
    ESPRequest) {
        var GangliaMetricStore = declare([ESPRequest.Store], {
            service: "ws_rrd",
            action: "getAvailableMetrics",
            responseQualifier: "GetAvailableMetricsResponse.Metrics",
            idProperty: "Item",
        });

        var GangliaServerStore = declare([ESPRequest.Store], {
            service: "ws_rrd",
            action: "getAvailableServers",
            responseQualifier: "GetAvailableServersForMetricsResponse.Servers",
            idProperty: "Item",
        });

        return {
            GangliaClusterList: function (params) {
                return ESPRequest.send("ws_rrd", "getAvailableClusters", params);
            },

            GangliaServerList: function (params) {
                return ESPRequest.send("ws_rrd", "getAvailableServers", params);
            },

            GangliaMetricList: function (params) {
                return ESPRequest.send("ws_rrd", "getAvailableMetrics", params);
            },

            GangliaRRDGraphList: function (params) {
                return ESPRequest.send("ws_rrd", "getGraphSVG", params);
            },

            CreateGangliaServerStore: function (options) {
                var store = new GangliaServerStore(options);
                return Observable(store);
            },

            CreateGangliaMetricStore: function (options) {
                var store = new GangliaMetricStore(options);
                return Observable(store);
            }
        };
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./ganglia/nls/ganglia.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n!./ganglia/nls/ganglia.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./ganglia/nls/bs/ganglia.js?absMid=ganglia/nls/bs/ganglia */ "./ganglia/nls/bs/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/es/ganglia.js?absMid=ganglia/nls/es/ganglia */ "./ganglia/nls/es/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/hr/ganglia.js?absMid=ganglia/nls/hr/ganglia */ "./ganglia/nls/hr/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/hu/ganglia.js?absMid=ganglia/nls/hu/ganglia */ "./ganglia/nls/hu/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/pt-br/ganglia.js?absMid=ganglia/nls/pt-br/ganglia */ "./ganglia/nls/pt-br/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/sr/ganglia.js?absMid=ganglia/nls/sr/ganglia */ "./ganglia/nls/sr/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/zh/ganglia.js?absMid=ganglia/nls/zh/ganglia */ "./ganglia/nls/zh/ganglia.js");
__webpack_require__(/*! ./ganglia/nls/ganglia.js?absMid=ganglia/nls/ganglia */ "./ganglia/nls/ganglia.js");
var req = __webpack_require__.dj.c();
module.exports = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js")("ganglia/nls/ganglia", req);

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaFilterDropDownWidget.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./ganglia/templates/GangliaFilterDropDownWidget.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <!-- <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter.png\" class=\"iconNoFilter\" /> -->\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span>${i18n.Metrics}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.GenerateGraph}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./ganglia/templates/GangliaWidget.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./ganglia/templates/GangliaWidget.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Custom\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.CustomMonitoring}', iconClass:'iconGanglia'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Filter\" data-dojo-type=\"GangliaFilterDropDownWidget\">\n                       <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"Clusters\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Cluster}'\" data-dojo-type=\"dijit.form.FilteringSelect\" />\n                        <input id=\"${id}ServerTargetSelect\" title=\"${i18n.Server}:\" name=\"Servers\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Server}'\" data-dojo-type=\"dijit.form.FilteringSelect\" />\n                        <input id=\"${id}MetricsTargetSelect\" title=\"${i18n.Metrics}:\" name=\"Metrics\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Metrics}'\" data-dojo-type=\"dijit.form.FilteringSelect\" />\n                        <select id=\"${id}FromGanliaDateRange\" style=\"width:197px;\" title=\"${i18n.FromDate}:\" name=\"From\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.FromDate}'\" data-dojo-type=\"dijit.form.Select\" />\n                            <option value=\"Year\" id=\"${id}Year\">Year</option>\n                            <option value=\"Month\" id=\"${id}Month\">Month</option>\n                            <option value=\"Week\" id=\"${id}Week\">Week</option>\n                            <option value=\"Day\" id=\"${id}Day\">Day</option>\n                            <option value=\"Hour\" id=\"${id}Hour\">Hour</option>\n                        </select>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <!-- <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewpage}</div> -->\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}graphs\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);