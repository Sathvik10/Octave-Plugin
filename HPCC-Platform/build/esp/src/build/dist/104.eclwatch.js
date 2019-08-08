(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/GraphPageWidget":"./eclwatch/GraphPageWidget.js",
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dojo/text!templates/GraphPageWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphPageWidget.html",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[104],{

/***/ "./eclwatch/GraphPageWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/GraphPageWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/html */ "./node_modules/dojo/html.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),

    __webpack_require__(/*! dojox/html/entities */ "./node_modules/dojox/html/entities.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! hpcc/JSGraphWidget */ "./eclwatch/JSGraphWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! hpcc/TimingTreeMapWidget */ "./eclwatch/TimingTreeMapWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/GraphPageWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphPageWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),
    __webpack_require__(/*! dijit/form/NumberSpinner */ "./node_modules/dijit/form/NumberSpinner.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Deferred, dom, domConstruct, on, html,
    registry, Dialog,
    entities,
    _Widget, JSGraphWidget, ESPUtil, ESPWorkunit, TimingTreeMapWidget, WsWorkunits, Utility,
    template) {
        return declare("GraphPageWidget", [_Widget], {
            templateString: template,
            baseClass: "GraphPageWidget",
            i18n: nlsHPCC,

            graphType: "JSGraphWidget",
            borderContainer: null,
            rightBorderContainer: null,
            graphName: "",
            wu: null,
            editorControl: null,
            global: null,
            main: null,
            overview: null,
            local: null,
            timingTreeMap: null,
            subgraphsGrid: null,
            verticesGrid: null,
            edgesGrid: null,
            xgmmlDialog: null,
            infoDialog: null,
            findField: null,
            findText: "",
            found: [],
            foundIndex: 0,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.rightBorderContainer = registry.byId(this.id + "RightBorderContainer");
                this.overviewTabContainer = registry.byId(this.id + "OverviewTabContainer");
                this.localTabContainer = registry.byId(this.id + "LocalTabContainer");
                this.properties = registry.byId(this.id + "Properties");
                this.findField = registry.byId(this.id + "FindField");
                this._initGraphControls();
                this._initTimings();
                this._initDialogs();
            },

            startup: function (args) {
                this.inherited(arguments);

                this._initSubgraphs();
                this._initVertices();
                this._initEdges();

                var splitter = this.borderContainer.getSplitter("right");
                this.main.watchSplitter(splitter);
                this.overview.watchSplitter(splitter);
                this.local.watchSplitter(splitter);

                splitter = this.rightBorderContainer.getSplitter("bottom");
                this.main.watchSplitter(splitter);
                this.overview.watchSplitter(splitter);
                this.local.watchSplitter(splitter);

                this.main.watchSelect(registry.byId(this.id + "AdvancedMenu"));

                this.overview.showNextPrevious(false);
                this.overview.showDistance(false);
                this.overview.showSyncSelection(false);
                this.overview.showOptions(false);

                this.refreshActionState();
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.xgmmlDialog.destroyRecursive();
                this.infoDialog.destroyRecursive();
                this.inherited(arguments);
            },

            //  Implementation  ---
            _initGraphControls: function () {
                var context = this;
                this.global = registry.byId(this.id + "GlobalGraphWidget");

                this.overview = registry.byId(this.id + "MiniGraphWidget");
                this.overview._persistID = "overview";
                this.overview.onSelectionChanged = function (items) {
                    context.syncSelectionFrom(context.overview);
                };
                this.overview.onDoubleClick = function (globalID, keyState) {
                    var mainItem = context.main.getItem(globalID);
                    if (mainItem) {
                        context.main.centerOnItem(mainItem, true);
                    }
                };

                this.main = registry.byId(this.id + "MainGraphWidget");
                this.main._persistID = "";  //  Share with GraphTreeWidget
                this.main.onSelectionChanged = function (items) {
                    context.syncSelectionFrom(context.main);
                };
                this.main.onDoubleClick = function (globalID, keyState) {
                    if (keyState && context.main.KeyState_Shift) {
                        context.main._onSyncSelection();
                    } else {
                        context.main.centerOn(globalID);
                    }
                    context.syncSelectionFrom(context.main);
                };

                this.local = registry.byId(this.id + "LocalGraphWidget");
                this.local._persistID = "local";
                this.local.onSelectionChanged = function (items) {
                    context.syncSelectionFrom(context.local);
                };
                this.local.onDoubleClick = function (globalID, keyState) {
                    if (keyState && context.main.KeyState_Shift) {
                        context.local._onSyncSelection();
                    } else {
                        context.local.centerOn(globalID);
                    }
                    context.syncSelectionFrom(context.local);
                };
            },

            _initTimings: function () {
                var context = this;
                this.timingTreeMap = registry.byId(this.id + "TimingsTreeMap");
                this.timingTreeMap.onClick = function (value) {
                    context.syncSelectionFrom(context.timingTreeMap);
                }
                this.timingTreeMap.onDblClick = function (value) {
                    var mainItem = context.main.getItem(value.SubGraphId);
                    context.main.centerOnItem(mainItem, true);
                }
            },

            _initDialogs: function () {
                var context = this;

                this.infoDialog = registry.byId(this.id + "InfoDialog");
                on(dom.byId(this.id + "InfoDialogCancel"), "click", function (event) {
                    context.infoDialog.hide();
                });

                this.xgmmlDialog = registry.byId(this.id + "XGMMLDialog");
                this.xgmmlTextArea = registry.byId(this.id + "XGMMLTextArea");
                on(dom.byId(this.id + "XGMMLDialogApply"), "click", function (event) {
                    context.xgmmlDialog.hide();
                    if (context.xgmmlDialog.get("hpccMode") === "XGMML") {
                        var xgmml = context.xgmmlTextArea.get("value");
                        context.loadGraphFromXGMML(xgmml);
                    } else if (context.xgmmlDialog.get("hpccMode") === "DOT") {
                        var dot = context.xgmmlTextArea.get("value");
                        context.loadGraphFromDOT(dot);
                    } else if (context.xgmmlDialog.get("hpccMode") === "DOTATTRS") {
                        var dotAttrs = context.xgmmlTextArea.get("value");
                        context.global.setDotMetaAttributes(dotAttrs);
                        context.main.setDotMetaAttributes(dotAttrs);
                        context.overview.setDotMetaAttributes(dotAttrs);
                        context.local.setDotMetaAttributes(dotAttrs);
                        context._onMainSync();
                    }
                });
                on(dom.byId(this.id + "XGMMLDialogCancel"), "click", function (event) {
                    context.xgmmlDialog.hide();
                });
            },

            _initItemGrid: function (grid) {
                var context = this;
                grid.on("dgrid-select, dgrid-deselect", function (event) {
                    context.syncSelectionFrom(grid);
                });
                grid.on(".dgrid-row:dblclick", function (evt) {
                    var item = grid.row(evt).data;
                    if (item._globalID) {
                        var mainItem = context.main.getItem(item._globalID);
                        context.main.centerOnItem(mainItem, true);
                    }
                });
            },

            _initSubgraphs: function () {
                this.subgraphsStore = this.global.createStore();
                this.subgraphsGrid = new declare([ESPUtil.Grid(false, true)])({
                    store: this.subgraphsStore
                }, this.id + "SubgraphsGrid");

                this._initItemGrid(this.subgraphsGrid);
            },

            _initVertices: function () {
                this.verticesStore = this.global.createStore();
                this.verticesGrid = new declare([ESPUtil.Grid(false, true)])({
                    store: this.verticesStore
                }, this.id + "VerticesGrid");

                this._initItemGrid(this.verticesGrid);
            },

            _initEdges: function () {
                this.edgesStore = this.global.createStore();
                this.edgesGrid = new declare([ESPUtil.Grid(false, true)])({
                    store: this.edgesStore
                }, this.id + "EdgesGrid");

                this._initItemGrid(this.edgesGrid);
            },

            _onRefresh: function () {
                this.refreshData();
            },

            _doFind: function (prev) {
                if (this.findText !== this.findField.value) {
                    this.findText = this.findField.value;
                    this.found = this.global.findAsGlobalID(this.findText);
                    this.global.setSelectedAsGlobalID(this.found);
                    this.syncSelectionFrom(this.global);
                    this.foundIndex = -1;
                }
                this.foundIndex += prev ? -1 : +1;
                if (this.foundIndex < 0) {
                    this.foundIndex = this.found.length - 1;
                } else if (this.foundIndex >= this.found.length) {
                    this.foundIndex = 0;
                }
                if (this.found.length) {
                    this.main.centerOnGlobalID(this.found[this.foundIndex], true);
                    this.setLocalRootItems([this.found[this.foundIndex]]);
                }
                this.refreshActionState();
            },

            _onFind: function (prev) {
                this.findText = "";
                this._doFind(false);
            },

            _onFindNext: function () {
                this._doFind(false);
            },

            _onFindPrevious: function () {
                this._doFind(true);
            },

            _onAbout: function () {
                html.set(dom.byId(this.id + "InfoDialogContent"), "<div style='width: 320px; height: 120px; text-align: center;'><p>" + this.i18n.Version + ":  " + this.main.getVersion() + "</p><p>" + this.main.getResourceLinks() + "</p>");
                this.infoDialog.set("title", this.i18n.AboutHPCCSystemsGraphControl);
                this.infoDialog.show();
            },

            _onGetSVG: function () {
                html.set(dom.byId(this.id + "InfoDialogContent"), "<textarea rows='25' cols='80'>" + entities.encode(this.main.getSVG()) + "</textarea>");
                this.infoDialog.set("title", this.i18n.SVGSource);
                this.infoDialog.show();
            },

            _onRenderSVG: function () {
                var context = this
                this.main.localLayout(function (svg) {
                    html.set(dom.byId(context.id + "InfoDialogContent"), "<div style='border: 1px inset grey; width: 640px; height: 480px; overflow : auto; '>" + svg + "</div>");
                    context.infoDialog.set("title", this.i18n.RenderedSVG);
                    context.infoDialog.show();
                });
            },

            _onGetXGMML: function () {
                this.xgmmlDialog.set("title", this.i18n.XGMML);
                this.xgmmlDialog.set("hpccMode", "XGMML");
                this.xgmmlTextArea.set("value", this.main.getXGMML());
                this.xgmmlDialog.show();
            },

            _onEditDOT: function () {
                this.xgmmlDialog.set("title", this.i18n.DOT);
                this.xgmmlDialog.set("hpccMode", "DOT");
                this.xgmmlTextArea.set("value", this.main.getDOT());
                this.xgmmlDialog.show();
            },

            _onGetGraphAttributes: function () {
                this.xgmmlDialog.set("title", this.i18n.DOTAttributes);
                this.xgmmlDialog.set("hpccMode", "DOTATTRS");
                this.xgmmlTextArea.set("value", this.global.getDotMetaAttributes());
                this.xgmmlDialog.show();
            },

            isWorkunit: function () {
                return lang.exists("params.Wuid", this);
            },

            isQuery: function () {
                return lang.exists("params.QueryId", this);
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (this.global._plugin) {
                    this.doInit(params);
                } else {
                    this.global.on("ready", lang.hitch(this, function (evt) {
                        this.doInit(params);
                    }));
                }
            },

            doInit: function (params) {
                if (this.global.version.major < 5) {
                    dom.byId(this.id + "Warning").textContent = this.i18n.WarnOldGraphControl + " (" + this.global.version.version + ")";
                }

                if (params.SafeMode && params.SafeMode !== "false") {
                    this.overviewTabContainer.selectChild(this.widget.SubgraphsGridCP);
                    this.localTabContainer.selectChild(this.properties);
                    this.overview.depth.set("value", 0);
                    this.main.depth.set("value", 1);
                    this.local.depth.set("value", 0);
                    this.local.distance.set("value", 0);
                    var dotAttrs = this.global.getDotMetaAttributes();
                    dotAttrs = dotAttrs.replace("\n//graph[splines=\"line\"];", "\ngraph[splines=\"line\"];");
                    this.global.setDotMetaAttributes(dotAttrs);
                } else {
                    this.overview.depth.set("value", -1);
                    var dotAttrs = this.global.getDotMetaAttributes();
                    dotAttrs = dotAttrs.replace("\ngraph[splines=\"line\"];", "\n//graph[splines=\"line\"];");
                    this.global.setDotMetaAttributes(dotAttrs);
                }
                if (this.isWorkunit()) {
                    this.graphName = params.GraphName;
                    this.wu = ESPWorkunit.Get(params.Wuid);

                    var firstLoad = true;
                    var context = this;
                    this.wu.monitor(function () {
                        context.wu.getInfo({
                            onGetApplicationValues: function (applicationValues) {
                            },
                            onGetGraphs: function (graphs) {
                                if (firstLoad === true) {
                                    firstLoad = false;
                                    context.loadGraphFromWu(context.wu, context.graphName);
                                } else {
                                    context.refreshGraphFromWU(context.wu, context.graphName);
                                }
                            },
                            onGetTimers: function (timers) {
                                context.graphTimers = context.wu.getGraphTimers(context.GraphName);
                            }
                        });
                    });
                } else if (this.isQuery()) {
                    this.targetQuery = params.Target;
                    this.queryId = params.QueryId;
                    this.graphName = params.GraphName;

                    this.loadGraphFromQuery(this.targetQuery, this.queryId, this.graphName);
                }

                this.timingTreeMap.init(lang.mixin({
                    query: {
                        graphsOnly: true,
                        graphName: this.graphName,
                        subGraphId: "*"
                    },
                    hideHelp: true
                }, params));
            },

            refreshData: function () {
                if (this.isWorkunit()) {
                    this.loadGraphFromWu(this.wu, this.graphName, true);
                } else if (this.isQuery()) {
                    this.loadGraphFromQuery(this.targetQuery, this.queryId, this.graphName);
                }
            },

            loadGraphFromXGMML: function (xgmml) {
                if (this.global.loadXGMML(xgmml, false, this.graphTimers)) {
                    this.global.setMessage("...");  //  Just in case it decides to render  ---
                    var initialSelection = [];
                    if (this.overview.depth.get("value") === -1) {
                        var newDepth = 0;
                        for (; newDepth < 5; ++newDepth) {
                            var xgmml = this.global.getLocalisedXGMML([this.global.getItem(0)], newDepth, this.overview.distance.get("value"));
                            if (xgmml !== "" && xgmml !== "<graph></graph>") {
                                break;
                            }
                        }
                        this.overview.depth.set("value", newDepth);
                        if (this.params.SubGraphId) {
                            initialSelection = [this.params.SubGraphId];
                        }
                    }
                    var mainRoot = [0];
                    this.setOverviewRootItems([0], initialSelection);
                    var complexityInfo = this.global.getComplexityInfo();
                    if (complexityInfo.isComplex()) {
                        if (confirm(lang.replace(this.i18n.ComplexityWarning, complexityInfo) + "\n" + this.i18n.ManualOverviewSelection)) {
                            mainRoot = [];
                        }
                    }
                    this.setMainRootItems(mainRoot, initialSelection);
                    this.setLocalRootItems([]);
                    this.loadSubgraphs();
                    this.loadVertices();
                    this.loadEdges();
                }
            },

            mergeGraphFromXGMML: function (xgmml) {
                if (this.global.loadXGMML(xgmml, true, this.graphTimers)) {
                    this.global.setMessage("...");  //  Just in case it decides to render  ---
                    this.refreshOverviewXGMML();
                    this.refreshMainXGMML();
                    this.refreshLocalXGMML();
                    this.loadSubgraphs();
                    this.loadVertices();
                    this.loadEdges();
                }
            },

            loadGraphFromDOT: function (dot) {
                this.global.loadDOT(dot);
                this.global.setMessage("...");  //  Just in case it decides to render  ---
                this.setOverviewRootItems([0]);
                this.setMainRootItems([]);
                this.setLocalRootItems([]);
                this.loadSubgraphs();
                this.loadVertices();
                this.loadEdges();
            },

            loadGraphFromWu: function (wu, graphName, refresh) {
                var deferred = new Deferred();
                this.overview.setMessage(this.i18n.FetchingData);
                this.main.setMessage(this.i18n.FetchingData);
                this.local.setMessage(this.i18n.FetchingData);
                var context = this;
                wu.fetchGraphXgmmlByName(graphName, null, function (xgmml, svg) {
                    context.overview.setMessage("");
                    context.main.setMessage("");
                    context.local.setMessage("");
                    context.loadGraphFromXGMML(xgmml, svg);
                    deferred.resolve();
                }, refresh);
                return deferred.promise;
            },

            refreshGraphFromWU: function (wu, graphName) {
                var context = this;
                wu.fetchGraphXgmmlByName(graphName, null, function (xgmml) {
                    context.mergeGraphFromXGMML(xgmml);
                }, true);
            },

            loadGraphFromQuery: function (targetQuery, queryId, graphName) {
                this.overview.setMessage(this.i18n.FetchingData);
                this.main.setMessage(this.i18n.FetchingData);
                this.local.setMessage(this.i18n.FetchingData);
                var context = this;
                WsWorkunits.WUQueryGetGraph({
                    request: {
                        Target: targetQuery,
                        QueryId: queryId,
                        GraphName: graphName
                    }
                }).then(function (response) {
                    context.overview.setMessage("");
                    context.main.setMessage("");
                    context.local.setMessage("");
                    if (lang.exists("WUQueryGetGraphResponse.Graphs.ECLGraphEx", response)) {
                        if (response.WUQueryGetGraphResponse.Graphs.ECLGraphEx.length > 0) {
                            context.loadGraphFromXGMML(response.WUQueryGetGraphResponse.Graphs.ECLGraphEx[0].Graph, "");
                        }
                    }
                });
            },

            refreshGraphFromQuery: function (targetQuery, queryId, graphName) {
                var context = this;
                WsWorkunits.WUQueryGetGraph({
                    request: {
                        Target: targetQuery,
                        QueryId: queryId,
                        GraphName: graphName
                    }
                }).then(function (response) {
                    if (lang.exists("WUQueryGetGraphResponse.Graphs.ECLGraphEx", response)) {
                        if (response.WUQueryGetGraphResponse.Graphs.ECLGraphEx.length > 0) {
                            context.mergeGraphFromXGMML(response.WUQueryGetGraphResponse.Graphs.ECLGraphEx[0].Graph);
                        }
                    }
                });
            },

            loadSubgraphs: function () {
                var subgraphs = this.global.getSubgraphsWithProperties();
                this.subgraphsStore.setData(subgraphs);
                var columns = [
                    {
                        label: this.i18n.ID, field: "id", width: 54,
                        formatter: function (_id, row) {
                            var img = Utility.getImageURL("folder.png");
                            return "<img src='" + img + "'/>&nbsp;" + _id;
                        }
                    }
                ];
                this.subgraphsStore.appendColumns(columns, [this.i18n.TimeSeconds, "DescendantCount", "SubgraphCount", "ActivityCount"], ["ChildCount", "Depth"]);
                this.subgraphsGrid.set("columns", columns);
                this.subgraphsGrid.refresh();
            },

            loadVertices: function () {
                var vertices = this.global.getVerticesWithProperties();
                this.verticesStore.setData(vertices);
                var columns = [
                    {
                        label: this.i18n.ID, field: "id", width: 54,
                        formatter: function (_id, row) {
                            var img = Utility.getImageURL("file.png");
                            return "<img src='" + img + "'/>&nbsp;" + _id;
                        }
                    },
                    { label: this.i18n.Label, field: "label", width: 150 }
                ];
                if (this.isWorkunit()) {
                    this.verticesStore.appendColumns(columns, ["name"], ["ecl", "definition"], null, true);
                } else if (this.isQuery()) {
                    this.verticesStore.appendColumns(columns, ["localTime", "totalTime", "label", "ecl"], ["definition"], null, true);
                }
                this.verticesGrid.set("columns", columns);
                this.verticesGrid.refresh();
            },

            loadEdges: function () {
                var edges = this.global.getEdgesWithProperties();
                this.edgesStore.setData(edges);
                var columns = [
                    { label: this.i18n.ID, field: "id", width: 50 }
                ];
                this.edgesStore.appendColumns(columns, ["label", "count"], ["source", "target"]);
                this.edgesGrid.set("columns", columns);
                this.edgesGrid.refresh();
            },

            inSyncSelectionFrom: false,
            syncSelectionFrom: function (sourceControl) {
                if (!this.inSyncSelectionFrom) {
                    this._syncSelectionFrom(sourceControl);
                }
            },

            _syncSelectionFrom: Utility.debounce(function (sourceControl) {
                this.inSyncSelectionFrom = true;
                var selectedGlobalIDs = [];

                //  Get Selected Items  ---
                if (sourceControl === this.timingTreeMap) {
                    var items = sourceControl.getSelected();
                    for (var i = 0; i < items.length; ++i) {
                        if (items[i].SubGraphId) {
                            selectedGlobalIDs.push(items[i].SubGraphId);
                        }
                    }
                } else if (sourceControl === this.verticesGrid || sourceControl === this.edgesGrid || sourceControl === this.subgraphsGrid) {
                    var items = sourceControl.getSelected();
                    for (var i = 0; i < items.length; ++i) {
                        if (lang.exists("_globalID", items[i])) {
                            selectedGlobalIDs.push(items[i]._globalID);
                        }
                    }
                } else {
                    selectedGlobalIDs = sourceControl.getSelectionAsGlobalID();
                }

                //  Set Selected Items  ---
                if (sourceControl !== this.timingTreeMap) {
                    this.timingTreeMap.setSelectedAsGlobalID(selectedGlobalIDs);
                }
                if (sourceControl !== this.subgraphsGrid && this.subgraphsGrid.store) {
                    this.subgraphsGrid.setSelection(selectedGlobalIDs);
                }
                if (sourceControl !== this.verticesGrid && this.verticesGrid.store) {
                    this.verticesGrid.setSelection(selectedGlobalIDs);
                }
                if (sourceControl !== this.edgesGrid && this.edgesGrid.store) {
                    this.edgesGrid.setSelection(selectedGlobalIDs);
                }

                //  Refresh Graph Controls  ---
                if (sourceControl !== this.overview) {
                    this.overview.setSelectedAsGlobalID(selectedGlobalIDs);
                }
                if (sourceControl !== this.main) {
                    switch (sourceControl) {
                        case this.local:
                            this.main.setSelectedAsGlobalID(selectedGlobalIDs);
                            break;
                        default:
                            this.setMainRootItems(selectedGlobalIDs);
                    }
                }
                if (sourceControl !== this.local) {
                    switch (sourceControl) {
                        case this.overview:
                            this.setLocalRootItems([]);
                            break;
                        default:
                            this.setLocalRootItems(selectedGlobalIDs);
                    }
                }

                var propertiesDom = dom.byId(this.id + "Properties");
                propertiesDom.textContent = "";
                for (var i = 0; i < selectedGlobalIDs.length; ++i) {
                    this.global.displayProperties(this.wu, selectedGlobalIDs[i], propertiesDom);
                }
                this.inSyncSelectionFrom = false;
            }, 500, false),

            resetPage: function () {
                this.main.clear();
            },

            setOverviewRootItems: function (globalIDs, selection) {
                var graphView = this.global.getGraphView(globalIDs, this.overview.depth.get("value"), 3, this.overview.option("subgraph"), this.overview.option("vhidespills"), selection);
                graphView.navigateTo(this.overview);
            },

            refreshOverviewXGMML: function () {
                var graphView = this.overview.getCurrentGraphView();
                graphView.refreshXGMML(this.overview);
            },

            setMainRootItems: function (globalIDs) {
                var graphView = this.global.getGraphView(globalIDs, this.main.depth.get("value"), this.main.distance.get("value"), this.main.option("subgraph"), this.main.option("vhidespills"));
                graphView.navigateTo(this.main);
            },

            refreshMainXGMML: function () {
                var graphView = this.main.getCurrentGraphView();
                graphView.refreshXGMML(this.main);
            },

            setLocalRootItems: function (globalIDs) {
                var graphView = this.global.getGraphView(globalIDs, this.local.depth.get("value"), this.local.distance.get("value"), this.local.option("subgraph"), this.local.option("vhidespills"));
                graphView.navigateTo(this.local);
            },

            refreshLocalXGMML: function () {
                var graphView = this.local.getCurrentGraphView();
                graphView.refreshXGMML(this.local);
            },

            displayGraphs: function (graphs) {
                for (var i = 0; i < graphs.length; ++i) {
                    this.wu.fetchGraphXgmml(i, null, function (xgmml) {
                        this.main.loadXGMML(xgmml, true);
                    });
                }
            },

            refreshActionState: function (selection) {
                this.setDisabled(this.id + "FindPrevious", this.foundIndex <= 0, "iconLeft", "iconLeftDisabled");
                this.setDisabled(this.id + "FindNext", this.foundIndex >= this.found.length - 1, "iconRight", "iconRightDisabled");
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/MenuSeparator.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/MenuSeparator.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! ./_Contained */ "./node_modules/dijit/_Contained.js"),
	__webpack_require__(/*! dojo/text!./templates/MenuSeparator.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _WidgetBase, _TemplatedMixin, _Contained, template){

	// module:
	//		dijit/MenuSeparator

	return declare("dijit.MenuSeparator", [_WidgetBase, _TemplatedMixin, _Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/PopupMenuItem.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/PopupMenuItem.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"), // domStyle.set
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! ./popup */ "./node_modules/dijit/popup.js"),
	__webpack_require__(/*! ./registry */ "./node_modules/dijit/registry.js"),	// registry.byNode
	__webpack_require__(/*! ./MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domStyle, lang, query, pm, registry, MenuItem){

	// module:
	//		dijit/PopupMenuItem

	return declare("dijit.PopupMenuItem", MenuItem, {
		// summary:
		//		An item in a Menu that spawn a drop down (usually a drop down menu)

		baseClass: "dijitMenuItem dijitPopupMenuItem",

		_fillContent: function(){
			// summary:
			//		When Menu is declared in markup, this code gets the menu label and
			//		the popup widget from the srcNodeRef.
			// description:
			//		srcNodeRef.innerHTML contains both the menu item text and a popup widget
			//		The first part holds the menu item text and the second part is the popup
			// example:
			// |	<div data-dojo-type="dijit/PopupMenuItem">
			// |		<span>pick me</span>
			// |		<popup> ... </popup>
			// |	</div>
			// tags:
			//		protected

			if(this.srcNodeRef){
				var nodes = query("*", this.srcNodeRef);
				this.inherited(arguments, [nodes[0]]);

				// save pointer to srcNode so we can grab the drop down widget after it's instantiated
				this.dropDownContainer = this.srcNodeRef;
			}
		},

		_openPopup: function(/*Object*/ params, /*Boolean*/ focus){
			// summary:
			//		Open the popup to the side of/underneath this MenuItem, and optionally focus first item
			// tags:
			//		protected

			var popup = this.popup;

			pm.open(lang.delegate(params, {
				popup: this.popup,
				around: this.domNode
			}));

			if(focus && popup.focus){
				popup.focus();
			}
		},

		_closePopup: function(){
			pm.close(this.popup);
			this.popup.parentMenu = null;
		},

		startup: function(){
			if(this._started){ return; }
			this.inherited(arguments);

			// We didn't copy the dropdown widget from the this.srcNodeRef, so it's in no-man's
			// land now.  Move it to <body>.
			if(!this.popup){
				var node = query("[widgetId]", this.dropDownContainer)[0];
				this.popup = registry.byNode(node);
			}
			this.ownerDocumentBody.appendChild(this.popup.domNode);
			this.popup.domNode.setAttribute("aria-labelledby", this.containerNode.id);
			this.popup.startup();

			this.popup.domNode.style.display="none";
			if(this.arrowWrapper){
				domStyle.set(this.arrowWrapper, "visibility", "");
			}
			this.focusNode.setAttribute("aria-haspopup", "true");
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			if(this.popup){
				// Destroy the popup, unless it's already been destroyed.  This can happen because
				// the popup is a direct child of <body> even though it's logically my child.
				if(!this.popup._destroyed){
					this.popup.destroyRecursive(preserveDom);
				}
				delete this.popup;
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/SimpleTextarea.js":
/*!***************************************************!*\
  !*** ./node_modules/dijit/form/SimpleTextarea.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie") has("opera")
	__webpack_require__(/*! ./TextBox */ "./node_modules/dijit/form/TextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, has, TextBox){

	// module:
	//		dijit/form/SimpleTextarea

	return declare("dijit.form.SimpleTextarea", TextBox, {
		// summary:
		//		A simple textarea that degrades, and responds to
		//		minimal LayoutContainer usage, and works with dijit/form/Form.
		//		Doesn't automatically size according to input, like Textarea.
		//
		// example:
		//	|	<textarea data-dojo-type="dijit/form/SimpleTextarea" name="foo" value="bar" rows=30 cols=40></textarea>
		//
		// example:
		//	|	new SimpleTextarea({ rows:20, cols:30 }, "foo");

		baseClass: "dijitTextBox dijitTextArea",

		// rows: Number
		//		The number of rows of text.
		rows: "3",

		// rows: Number
		//		The number of characters per line.
		cols: "20",

		templateString: "<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",

		postMixInProperties: function(){
			// Copy value from srcNodeRef, unless user specified a value explicitly (or there is no srcNodeRef)
			// TODO: parser will handle this in 2.0
			if(!this.value && this.srcNodeRef){
				this.value = this.srcNodeRef.value;
			}
			this.inherited(arguments);
		},

		buildRendering: function(){
			this.inherited(arguments);
			if(has("ie") && this.cols){ // attribute selectors is not supported in IE6
				domClass.add(this.textbox, "dijitTextAreaCols");
			}
		},

		filter: function(/*String*/ value){
			// Override TextBox.filter to deal with newlines... specifically (IIRC) this is for IE which writes newlines
			// as \r\n instead of just \n
			if(value){
				value = value.replace(/\r/g, "");
			}
			return this.inherited(arguments);
		},

		_onInput: function(/*Event?*/ e){
			// Override TextBox._onInput() to enforce maxLength restriction
			if(this.maxLength){
				var maxLength = parseInt(this.maxLength);
				var value = this.textbox.value.replace(/\r/g, '');
				var overflow = value.length - maxLength;
				if(overflow > 0){
					var textarea = this.textbox;
					if(textarea.selectionStart){
						var pos = textarea.selectionStart;
						var cr = 0;
						if(has("opera")){
							cr = (this.textbox.value.substring(0, pos).match(/\r/g) || []).length;
						}
						this.textbox.value = value.substring(0, pos - overflow - cr) + value.substring(pos - cr);
						textarea.setSelectionRange(pos - overflow, pos - overflow);
					}else if(this.ownerDocument.selection){ //IE
						textarea.focus();
						var range = this.ownerDocument.selection.createRange();
						// delete overflow characters
						range.moveStart("character", -overflow);
						range.text = '';
						// show cursor
						range.select();
					}
				}
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphPageWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GraphPageWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}FindField\" style=\"width: 120px\" data-dojo-props=\"placeHolder:'${i18n.Find}'\" data-dojo-type=\"dijit.form.TextBox\">${i18n.Find}</div>\n            <div id=\"${id}Find\" data-dojo-attach-event=\"onClick:_onFind\" data-dojo-props=\"iconClass:'iconFind', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Find}</div>\n            <div id=\"${id}FindPrevious\" data-dojo-attach-event=\"onClick:_onFindPrevious\" data-dojo-props=\"iconClass:'iconLeft', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindPrevious}</div>\n            <div id=\"${id}FindNext\" data-dojo-attach-event=\"onClick:_onFindNext\" data-dojo-props=\"iconClass:'iconRight', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindNext}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}AdvancedMenu\" data-dojo-type=\"dijit.form.DropDownButton\">\n                <span>${i18n.Advanced}</span>\n                <div data-dojo-type=\"dijit.Menu\" >\n                    <div id=\"${id}GetSVG\" data-dojo-attach-event=\"onClick:_onGetSVG\" data-dojo-type=\"dijit.MenuItem\">${i18n.ShowSVG}</div>\n                    <div id=\"${id}RenderSVG\" data-dojo-attach-event=\"onClick:_onRenderSVG\" data-dojo-type=\"dijit.MenuItem\">${i18n.RenderSVG}</div>\n                    <div id=\"${id}GetXGMML\" data-dojo-attach-event=\"onClick:_onGetXGMML\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditXGMML}</div>\n                    <div id=\"${id}EditDOT\" data-dojo-attach-event=\"onClick:_onEditDOT\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditDOT}</div>\n                    <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                    <div id=\"${id}GetGraphAttributes\" data-dojo-attach-event=\"onClick:_onGetGraphAttributes\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditGraphAttributes}</div>\n                    <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                    <div id=\"${id}About\" data-dojo-attach-event=\"onClick:_onAbout\" data-dojo-type=\"dijit.MenuItem\">${i18n.AboutGraphControl}</div>\n                </div>\n            </div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <label id=\"${id}Warning\"></label>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}MainGraphWidget\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"${graphType}\">\n        </div>\n        <div id=\"${id}RightBorderContainer\" style=\"width: 33%; padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'right', splitter:true, minSize: 120\" data-dojo-type=\"dijit.layout.BorderContainer\">\n            <div id=\"${id}OverviewTabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <div id=\"${id}MiniGraphWidget\" title=\"${i18n.Overview}\" data-dojo-type=\"${graphType}\">\n                </div>\n                <div id=\"${id}SubgraphsGridCP\" title=\"${i18n.Subgraphs}\" style=\"padding: 0px; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}SubgraphsGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}VerticesGridCP\" title=\"${i18n.Activities}\" style=\"padding: 0px; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}VerticesGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}EdgesGridCP\" title=\"${i18n.Edges}\" style=\"padding: 0px; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}EdgesGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}TimingsTreeMap\" title=\"${i18n.TimingsMap}\" data-dojo-type=\"TimingTreeMapWidget\">\n                </div>\n            </div>\n            <div id=\"${id}LocalTabContainer\" style=\"height: 66%\" data-dojo-props=\"region: 'bottom', splitter:true, minSize: 120, tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <div id=\"${id}LocalGraphWidget\" title=\"${i18n.Local}\" data-dojo-type=\"${graphType}\">\n                </div>\n                <div id=\"${id}Properties\" title=\"${i18n.Properties}\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}GlobalGraphWidget\" data-dojo-type=\"${graphType}\">\n    </div>\n    <div id=\"${id}XGMMLDialog\" title=\"${i18n.XGMML}\" data-dojo-type=\"dijit.Dialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <textarea id=\"${id}XGMMLTextArea\" rows=\"25\" cols=\"80\" data-dojo-type=\"dijit.form.SimpleTextarea\">\n            </textarea>\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button id=\"${id}XGMMLDialogApply\" type=\"submit\" data-dojo-type=\"dijit.form.Button\" >${i18n.Apply}</button>\n            <button id=\"${id}XGMMLDialogCancel\" type=\"button\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n        </div>\n    </div>\n    <div id=\"${id}InfoDialog\" title=\"${i18n.InfoDialog}\" data-dojo-type=\"dijit.Dialog\">\n        <div id=\"${id}InfoDialogContent\" class=\"dijitDialogPaneContentArea\">\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button id=\"${id}InfoDialogCancel\" type=\"button\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuSeparator.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"

/***/ })

}]);