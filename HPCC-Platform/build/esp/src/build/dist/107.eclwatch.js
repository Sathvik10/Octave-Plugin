(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/GraphTreeWidget":"./lib/src/GraphTreeWidget.js",
	"dijit/CheckedMenuItem":"./node_modules/dijit/CheckedMenuItem.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dojo/text!hpcc/templates/GraphTreeWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTreeWidget.html",
	"dojo/text!dijit/templates/CheckedMenuItem.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[107],{

/***/ "./lib/src/GraphTreeWidget.js":
/*!************************************!*\
  !*** ./lib/src/GraphTreeWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/html */ "./node_modules/dojo/html.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"), __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"), __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"), __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"), __webpack_require__(/*! dijit/CheckedMenuItem */ "./node_modules/dijit/CheckedMenuItem.js"), __webpack_require__(/*! dojox/html/entities */ "./node_modules/dojox/html/entities.js"), __webpack_require__(/*! ../dgrid/tree */ "./dgrid/tree.js"), __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPWorkunit */ "./lib/src/ESPWorkunit.js"), __webpack_require__(/*! ./WsWorkunits */ "./lib/src/WsWorkunits.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js"), __webpack_require__(/*! dojo/text!hpcc/templates/GraphTreeWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTreeWidget.html"), __webpack_require__(/*! ./DeclareDecorator */ "./lib/src/DeclareDecorator.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), __webpack_require__(/*! hpcc/JSGraphWidget */ "./eclwatch/JSGraphWidget.js"), __webpack_require__(/*! hpcc/TimingTreeMapWidget */ "./eclwatch/TimingTreeMapWidget.js"), __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"), __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"), __webpack_require__(/*! dijit/layout/StackContainer */ "./node_modules/dijit/layout/StackContainer.js"), __webpack_require__(/*! dijit/layout/StackController */ "./node_modules/dijit/layout/StackController.js"), __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"), __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"), __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"), __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"), __webpack_require__(/*! dijit/form/NumberSpinner */ "./node_modules/dijit/form/NumberSpinner.js"), __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"), __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"), __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"), __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, declare, lang, nlsHPCC, arrayUtil, Deferred, dom, on, html, topic, registry, Menu, MenuItem, MenuSeparator, CheckedMenuItem, entities, tree, _Widget, ESPUtil, ESPWorkunit, WsWorkunits, Utility, template, DeclareDecorator_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphTreeWidget = /** @class */ (function () {
        function GraphTreeWidget() {
            this.templateString = template;
            this.baseClass = "GraphTreeWidget";
            this.i18n = nlsHPCC;
            this.graphType = "JSGraphWidget";
            this.graphName = "";
            this.wu = null;
            this.global = null;
            this.main = null;
            this.subgraphsGrid = null;
            this.verticesGrid = null;
            this.edgesGrid = null;
            this.xgmmlDialog = null;
            this.infoDialog = null;
            this.findText = "";
            this.found = [];
            this.foundIndex = 0;
            this.inSyncSelectionFrom = false;
        }
        GraphTreeWidget.prototype.buildRendering = function (args) {
            this.inherited(arguments);
        };
        GraphTreeWidget.prototype.postCreate = function (args) {
            this.inherited(arguments);
            this._initGraphControls();
            this._initTimings();
            this._initActivitiesMap();
            this._initDialogs();
            var context = this;
            topic.subscribe(this.id + "OverviewTabContainer-selectChild", function (topic) {
                context.refreshActionState();
            });
        };
        GraphTreeWidget.prototype.startup = function (args) {
            this.inherited(arguments);
            this._initTree();
            this._initSubgraphs();
            this._initVertices();
            this._initEdges();
            var splitter = this.widget.BorderContainer.getSplitter("left");
            this.main.watchSplitter(splitter);
            splitter = this.widget.SideBorderContainer.getSplitter("bottom");
            this.main.watchSplitter(splitter);
            this.main.watchSelect(registry.byId(this.id + "AdvancedMenu"));
            this.refreshActionState();
        };
        GraphTreeWidget.prototype.resize = function (args) {
            this.inherited(arguments);
            this.widget.BorderContainer.resize();
        };
        GraphTreeWidget.prototype.layout = function (args) {
            this.inherited(arguments);
        };
        GraphTreeWidget.prototype.destroy = function (args) {
            this.xgmmlDialog.destroyRecursive();
            this.infoDialog.destroyRecursive();
            this.inherited(arguments);
        };
        //  Implementation  ---
        GraphTreeWidget.prototype._initGraphControls = function () {
            var context = this;
            this.global = registry.byId(this.id + "GlobalGraphWidget");
            this.main = registry.byId(this.id + "MainGraphWidget");
            this.main.onSelectionChanged = function (items) {
                context.syncSelectionFrom(context.main);
            };
            this.main.onDoubleClick = function (globalID, keyState) {
                if (keyState && context.main.KeyState_Shift) {
                    context.main._onSyncSelection();
                }
                else {
                    context.main.centerOn(globalID);
                }
                context.syncSelectionFrom(context.main);
            };
        };
        GraphTreeWidget.prototype._initTimings = function () {
            var context = this;
            this.widget.TimingsTreeMap.onClick = function (value) {
                context.syncSelectionFrom(context.widget.TimingsTreeMap);
            };
        };
        GraphTreeWidget.prototype._initActivitiesMap = function () {
            var context = this;
            this.widget.ActivitiesTreeMap.onClick = function (value) {
                context.syncSelectionFrom(context.widget.ActivitiesTreeMap);
            };
        };
        GraphTreeWidget.prototype._initDialogs = function () {
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
                }
                else if (context.xgmmlDialog.get("hpccMode") === "DOT") {
                    var dot = context.xgmmlTextArea.get("value");
                    context.loadGraphFromDOT(dot);
                }
                else if (context.xgmmlDialog.get("hpccMode") === "DOTATTRS") {
                    var dotAttrs = context.xgmmlTextArea.get("value");
                    context.global.setDotMetaAttributes(dotAttrs);
                    context.main.setDotMetaAttributes(dotAttrs);
                    context._onMainSync();
                }
            });
            on(dom.byId(this.id + "XGMMLDialogCancel"), "click", function (event) {
                context.xgmmlDialog.hide();
            });
        };
        GraphTreeWidget.prototype._initItemGrid = function (grid) {
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
        };
        GraphTreeWidget.prototype._initTree = function () {
            this.treeStore = this.global.createTreeStore();
            this.treeGrid = new declare([ESPUtil.Grid(false, true)])({
                treeDepth: this.main.getDepth(),
                store: this.treeStore
            }, this.id + "TreeGrid");
            this._initItemGrid(this.treeGrid);
            this.initContextMenu();
        };
        GraphTreeWidget.prototype.initContextMenu = function () {
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.id + "TreeGrid"]
            });
            pMenu.addChild(new MenuItem({
                label: this.i18n.ExpandAll,
                onClick: function (evt) {
                    context.treeGrid.set("treeDepth", 9999);
                    context.treeGrid.refresh();
                }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.CollapseAll,
                onClick: function (evt) {
                    context.treeGrid.set("treeDepth", 1);
                    context.treeGrid.refresh();
                }
            }));
            pMenu.addChild(new MenuSeparator());
            pMenu.addChild(new CheckedMenuItem({
                label: this.i18n.Activities,
                checked: false,
                onClick: function (evt) {
                    if (this.checked) {
                        context.treeGrid.set("query", {
                            id: "0"
                        });
                    }
                    else {
                        context.treeGrid.set("query", {
                            id: "0",
                            __hpcc_notActivity: true
                        });
                    }
                }
            }));
        };
        GraphTreeWidget.prototype._initSubgraphs = function () {
            this.subgraphsStore = this.global.createStore();
            this.subgraphsGrid = new declare([ESPUtil.Grid(false, true)])({
                store: this.subgraphsStore
            }, this.id + "SubgraphsGrid");
            this._initItemGrid(this.subgraphsGrid);
        };
        GraphTreeWidget.prototype._initVertices = function () {
            this.verticesStore = this.global.createStore();
            this.verticesGrid = new declare([ESPUtil.Grid(false, true)])({
                store: this.verticesStore
            }, this.id + "VerticesGrid");
            this._initItemGrid(this.verticesGrid);
        };
        GraphTreeWidget.prototype._initEdges = function () {
            this.edgesStore = this.global.createStore();
            this.edgesGrid = new declare([ESPUtil.Grid(false, true)])({
                store: this.edgesStore
            }, this.id + "EdgesGrid");
            this._initItemGrid(this.edgesGrid);
        };
        GraphTreeWidget.prototype._onRefresh = function () {
            this.refreshData();
        };
        GraphTreeWidget.prototype._onTreeRefresh = function () {
            this.treeGrid.set("treeDepth", this.main.getDepth());
            this.treeGrid.refresh();
        };
        GraphTreeWidget.prototype._onChangeActivityMetric = function () {
            var metric = this.widget.ActivityMetric.get("value");
            this.widget.ActivitiesTreeMap.setActivityMetric(metric);
        };
        GraphTreeWidget.prototype._doFind = function (prev) {
            if (this.findText !== this.widget.FindField.value) {
                this.findText = this.widget.FindField.value;
                this.found = this.global.findAsGlobalID(this.findText);
                this.syncSelectionFrom(this.found);
                this.foundIndex = -1;
            }
            this.foundIndex += prev ? -1 : +1;
            if (this.foundIndex < 0) {
                this.foundIndex = this.found.length - 1;
            }
            else if (this.foundIndex >= this.found.length) {
                this.foundIndex = 0;
            }
            if (this.found.length) {
                this.main.centerOnGlobalID(this.found[this.foundIndex], true);
            }
            this.refreshActionState();
        };
        GraphTreeWidget.prototype._onFind = function (prev) {
            this.findText = "";
            this._doFind(false);
        };
        GraphTreeWidget.prototype._onFindNext = function () {
            this._doFind(false);
        };
        GraphTreeWidget.prototype._onFindPrevious = function () {
            this._doFind(true);
        };
        GraphTreeWidget.prototype._onAbout = function () {
            html.set(dom.byId(this.id + "InfoDialogContent"), "<div style='width: 320px; height: 120px; text-align: center;'><p>" + this.i18n.Version + ":  " + this.main.getVersion() + "</p><p>" + this.main.getResourceLinks() + "</p>");
            this.infoDialog.set("title", this.i18n.AboutHPCCSystemsGraphControl);
            this.infoDialog.show();
        };
        GraphTreeWidget.prototype._onGetSVG = function () {
            html.set(dom.byId(this.id + "InfoDialogContent"), "<textarea rows='25' cols='80'>" + entities.encode(this.main.getSVG()) + "</textarea>");
            this.infoDialog.set("title", this.i18n.SVGSource);
            this.infoDialog.show();
        };
        GraphTreeWidget.prototype._onRenderSVG = function () {
            var context = this;
            this.main.localLayout(function (svg) {
                html.set(dom.byId(context.id + "InfoDialogContent"), "<div style='border: 1px inset grey; width: 640px; height: 480px; overflow : auto; '>" + svg + "</div>");
                context.infoDialog.set("title", this.i18n.RenderedSVG);
                context.infoDialog.show();
            });
        };
        GraphTreeWidget.prototype._onGetXGMML = function () {
            this.xgmmlDialog.set("title", this.i18n.XGMML);
            this.xgmmlDialog.set("hpccMode", "XGMML");
            this.xgmmlTextArea.set("value", this.main.getXGMML());
            this.xgmmlDialog.show();
        };
        GraphTreeWidget.prototype._onEditDOT = function () {
            this.xgmmlDialog.set("title", this.i18n.DOT);
            this.xgmmlDialog.set("hpccMode", "DOT");
            this.xgmmlTextArea.set("value", this.main.getDOT());
            this.xgmmlDialog.show();
        };
        GraphTreeWidget.prototype._onGetGraphAttributes = function () {
            this.xgmmlDialog.set("title", this.i18n.DOTAttributes);
            this.xgmmlDialog.set("hpccMode", "DOTATTRS");
            this.xgmmlTextArea.set("value", this.global.getDotMetaAttributes());
            this.xgmmlDialog.show();
        };
        GraphTreeWidget.prototype.isWorkunit = function () {
            return lang.exists("params.Wuid", this);
        };
        GraphTreeWidget.prototype.isQuery = function () {
            return lang.exists("params.QueryId", this);
        };
        GraphTreeWidget.prototype.init = function (params) {
            if (this.inherited(arguments))
                return;
            if (this.global._plugin) {
                this.doInit(params);
            }
            else {
                this.global.on("ready", lang.hitch(this, function (evt) {
                    this.doInit(params);
                }));
            }
        };
        GraphTreeWidget.prototype.refresh = function (params) {
            if (params.SubGraphId) {
                this.syncSelectionFrom([params.SubGraphId]);
            }
        };
        GraphTreeWidget.prototype.doInit = function (params) {
            if (this.global.version.major < 5) {
                dom.byId(this.id + "Warning").innerHTML = this.i18n.WarnOldGraphControl + " (" + this.global.version.version + ")";
            }
            if (params.SafeMode && params.SafeMode !== "false") {
                this.main.depth.set("value", 1);
                var dotAttrs = this.global.getDotMetaAttributes();
                dotAttrs = dotAttrs.replace("\n//graph[splines=\"line\"];", "\ngraph[splines=\"line\"];");
                this.global.setDotMetaAttributes(dotAttrs);
            }
            else {
                var dotAttrs = this.global.getDotMetaAttributes();
                dotAttrs = dotAttrs.replace("\ngraph[splines=\"line\"];", "\n//graph[splines=\"line\"];");
                this.global.setDotMetaAttributes(dotAttrs);
            }
            this.graphName = params.GraphName;
            this.subGraphId = params.SubGraphId;
            this.widget.TimingsTreeMap.init(lang.mixin({
                query: {
                    graphsOnly: true,
                    graphName: this.graphName,
                    subGraphId: "*"
                },
                hideHelp: true
            }, params));
            this.widget.ActivitiesTreeMap.init(lang.mixin({
                query: {
                    activitiesOnly: true,
                    graphName: this.graphName,
                    subGraphId: "*"
                },
                hideHelp: true
            }, params));
            if (this.isWorkunit()) {
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
                                context.loadGraphFromWu(context.wu, context.graphName, context.subGraphId);
                            }
                            else {
                                context.refreshGraphFromWU(context.wu, context.graphName, context.subGraphId);
                            }
                        },
                        onGetTimers: function (timers) {
                            context.graphTimers = context.wu.getGraphTimers(context.GraphName);
                        }
                    });
                });
            }
            else if (this.isQuery()) {
                this.targetQuery = params.Target;
                this.queryId = params.QueryId;
                this.loadGraphFromQuery(this.targetQuery, this.queryId, this.graphName);
            }
        };
        GraphTreeWidget.prototype.refreshData = function () {
            if (this.isWorkunit()) {
                this.loadGraphFromWu(this.wu, this.graphName, this.subGraphId, true);
            }
            else if (this.isQuery()) {
                this.loadGraphFromQuery(this.targetQuery, this.queryId, this.graphName);
            }
        };
        GraphTreeWidget.prototype.loadGraphFromXGMML = function (xgmml) {
            if (this.global.loadXGMML(xgmml, false, this.graphTimers, true)) {
                this.global.setMessage("..."); //  Just in case it decides to render  ---
                var mainRoot = [0];
                var complexityInfo = this.global.getComplexityInfo();
                if (this.params.SubGraphId) {
                    mainRoot = [this.params.SubGraphId];
                }
                else if (complexityInfo.isComplex()) {
                    if (confirm(lang.replace(this.i18n.ComplexityWarning, complexityInfo) + "\n" + this.i18n.ManualTreeSelection)) {
                        mainRoot = [];
                    }
                }
                this.loadTree();
                this.loadSubgraphs();
                this.loadVertices();
                this.loadEdges();
                this.syncSelectionFrom(mainRoot);
            }
        };
        GraphTreeWidget.prototype.mergeGraphFromXGMML = function (xgmml) {
            if (this.global.loadXGMML(xgmml, true, this.graphTimers, true)) {
                this.global.setMessage("..."); //  Just in case it decides to render  ---
                this.refreshMainXGMML();
                this.loadSubgraphs();
                this.loadVertices();
                this.loadEdges();
            }
        };
        GraphTreeWidget.prototype.loadGraphFromDOT = function (dot) {
            this.global.loadDOT(dot);
            this.global.setMessage("..."); //  Just in case it decides to render  ---
            this.setMainRootItems([]);
            this.loadSubgraphs();
            this.loadVertices();
            this.loadEdges();
        };
        GraphTreeWidget.prototype.loadGraphFromWu = function (wu, graphName, subGraphId, refresh) {
            if (refresh === void 0) { refresh = false; }
            var deferred = new Deferred();
            this.main.setMessage(this.i18n.FetchingData);
            var context = this;
            wu.fetchGraphXgmmlByName(graphName, subGraphId, function (xgmml, svg) {
                context.main.setMessage("");
                context.loadGraphFromXGMML(xgmml);
                deferred.resolve();
            }, refresh);
            return deferred.promise;
        };
        GraphTreeWidget.prototype.refreshGraphFromWU = function (wu, graphName, subGraphId) {
            var context = this;
            wu.fetchGraphXgmmlByName(graphName, subGraphId, function (xgmml) {
                context.mergeGraphFromXGMML(xgmml);
            }, true);
        };
        GraphTreeWidget.prototype.loadGraphFromQuery = function (targetQuery, queryId, graphName) {
            this.main.setMessage(this.i18n.FetchingData);
            var context = this;
            WsWorkunits.WUQueryGetGraph({
                request: {
                    Target: targetQuery,
                    QueryId: queryId,
                    GraphName: graphName
                }
            }).then(function (response) {
                context.main.setMessage("");
                if (lang.exists("WUQueryGetGraphResponse.Graphs.ECLGraphEx", response)) {
                    if (response.WUQueryGetGraphResponse.Graphs.ECLGraphEx.length > 0) {
                        context.loadGraphFromXGMML(response.WUQueryGetGraphResponse.Graphs.ECLGraphEx[0].Graph);
                    }
                }
            });
        };
        GraphTreeWidget.prototype.refreshGraphFromQuery = function (targetQuery, queryId, graphName) {
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
        };
        GraphTreeWidget.prototype.loadTree = function () {
            var treeData = this.global.getTreeWithProperties();
            this.treeStore.setTree(treeData);
            var context = this;
            var columns = [
                tree({
                    field: "id",
                    label: this.i18n.ID, width: 150,
                    collapseOnRefresh: true,
                    shouldExpand: function (row, level, previouslyExpanded) {
                        if (previouslyExpanded !== undefined) {
                            return previouslyExpanded;
                        }
                        else if (level < context.treeGrid.get("treeDepth")) {
                            return true;
                        }
                        return false;
                    },
                    formatter: function (_id, row) {
                        var img = Utility.getImageURL("file.png");
                        var label = _id + " - ";
                        switch (row._globalType) {
                            case "Graph":
                                img = Utility.getImageURL("server.png");
                                label = context.params.GraphName + " (" + row._children.length + ")";
                                break;
                            case "Cluster":
                                img = Utility.getImageURL("folder.png");
                                label += context.i18n.Subgraph + " (" + row._children.length + ")";
                                break;
                            case "Vertex":
                                label += row.label;
                                break;
                        }
                        return "<img src='" + img + "'/>&nbsp;" + label;
                    }
                })
            ];
            if (this.isWorkunit()) {
                this.treeStore.appendColumns(columns, ["name"], ["DescendantCount", "ecl", "definition", "SubgraphCount", "ActivityCount", "ChildCount", "Depth"]);
            }
            else if (this.isQuery()) {
                this.treeStore.appendColumns(columns, ["localTime", "totalTime", "label", "ecl"], ["DescendantCount", "definition", "SubgraphCount", "ActivityCount", "ChildCount", "Depth"]);
            }
            this.treeGrid.set("query", {
                id: "0",
                __hpcc_notActivity: true
            });
            this.treeGrid.set("columns", columns);
            this.treeGrid.refresh();
        };
        GraphTreeWidget.prototype.loadSubgraphs = function () {
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
        };
        GraphTreeWidget.prototype.loadVertices = function () {
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
            this.verticesStore.appendColumns(columns, ["name"], ["ecl", "definition"], null, true);
            this.verticesGrid.set("columns", columns);
            this.verticesGrid.refresh();
            this.widget.ActivityMetric.set("options", arrayUtil.map(arrayUtil.filter(columns, function (col, idx) {
                return col.label.indexOf("Time") === 0 ||
                    col.label.indexOf("Size") === 0 ||
                    col.label.indexOf("Skew") === 0 ||
                    col.label.indexOf("Num") === 0;
            }), function (col, idx) {
                return {
                    label: col.label,
                    value: col.label,
                    selected: col.label === "TimeMaxLocalExecute"
                };
            }).sort(function (l, r) {
                if (l.label < r.label) {
                    return -1;
                }
                else if (l.label > r.label) {
                    return 1;
                }
                return 0;
            }));
            this.widget.ActivitiesTreeMap.setActivities(vertices, true);
            this.widget.ActivityMetric.set("value", "TimeMaxLocalExecute");
        };
        GraphTreeWidget.prototype.loadEdges = function () {
            var edges = this.global.getEdgesWithProperties();
            this.edgesStore.setData(edges);
            var columns = [
                { label: this.i18n.ID, field: "id", width: 50 }
            ];
            this.edgesStore.appendColumns(columns, ["label", "count"], ["source", "target"]);
            this.edgesGrid.set("columns", columns);
            this.edgesGrid.refresh();
        };
        GraphTreeWidget.prototype.syncSelectionFrom = function (sourceControl) {
            if (!this.inSyncSelectionFrom) {
                this._syncSelectionFrom(sourceControl);
            }
        };
        // _syncSelectionFrom: Utility.debounce(function (sourceControlOrGlobalIDs) {
        GraphTreeWidget.prototype._syncSelectionFrom = function (sourceControlOrGlobalIDs) {
            this.inSyncSelectionFrom = true;
            var sourceControl = sourceControlOrGlobalIDs instanceof Array ? null : sourceControlOrGlobalIDs;
            var selectedGlobalIDs = sourceControlOrGlobalIDs instanceof Array ? sourceControlOrGlobalIDs : [];
            if (sourceControl) {
                //  Get Selected Items  ---
                if (sourceControl === this.widget.TimingsTreeMap) {
                    var items = sourceControl.getSelected();
                    for (var i = 0; i < items.length; ++i) {
                        if (items[i].SubGraphId) {
                            selectedGlobalIDs.push(items[i].SubGraphId);
                        }
                    }
                }
                else if (sourceControl === this.widget.ActivitiesTreeMap) {
                    var items = sourceControl.getSelected();
                    for (var i = 0; i < items.length; ++i) {
                        if (items[i].ActivityID) {
                            selectedGlobalIDs.push(items[i].ActivityID);
                        }
                    }
                }
                else if (sourceControl === this.verticesGrid || sourceControl === this.edgesGrid || sourceControl === this.subgraphsGrid || sourceControl === this.treeGrid) {
                    var items = sourceControl.getSelected();
                    for (var i = 0; i < items.length; ++i) {
                        if (lang.exists("_globalID", items[i])) {
                            selectedGlobalIDs.push(items[i]._globalID);
                        }
                    }
                }
                else if (sourceControl === this.found) {
                    selectedGlobalIDs = this.found;
                }
                else {
                    selectedGlobalIDs = sourceControl.getSelectionAsGlobalID();
                }
            }
            //  Set Selected Items  ---
            if (sourceControl !== this.treeGrid) {
                this.treeGrid.setSelection(selectedGlobalIDs);
            }
            if (sourceControl !== this.widget.TimingsTreeMap) {
                this.widget.TimingsTreeMap.setSelectedAsGlobalID(selectedGlobalIDs);
            }
            if (sourceControl !== this.widget.ActivitiesTreeMap) {
                this.widget.ActivitiesTreeMap.setSelectedAsGlobalID(selectedGlobalIDs);
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
            if (sourceControl !== this.main) {
                this.setMainRootItems(selectedGlobalIDs);
            }
            var propertiesDom = dom.byId(this.id + "Properties");
            propertiesDom.innerHTML = "";
            for (var i = 0; i < selectedGlobalIDs.length; ++i) {
                this.global.displayProperties(this.wu, selectedGlobalIDs[i], propertiesDom);
            }
            var context = this;
            if (selectedGlobalIDs.length) {
                var edges = arrayUtil.filter(selectedGlobalIDs, function (id) {
                    return id && id.indexOf && id.indexOf("_") >= 0;
                });
                if (edges.length === 1) {
                    WsWorkunits.WUCDebug(context.params.Wuid, "<debug:print edgeId='" + edges[0] + "'/>").then(function (response) {
                        if (lang.exists("WUDebugResponse.Result", response)) {
                            context.global.displayTrace(response.WUDebugResponse.Result, propertiesDom);
                        }
                    });
                }
            }
            this.inSyncSelectionFrom = false;
            //}, 500, false)
        };
        GraphTreeWidget.prototype.resetPage = function () {
            this.main.clear();
        };
        GraphTreeWidget.prototype.setMainRootItems = function (globalIDs) {
            var graphView = this.global.getGraphView(globalIDs, this.main.getDepth(), this.main.distance.get("value"), this.main.option("subgraph"), this.main.option("vhidespills"));
            return graphView.navigateTo(this.main);
        };
        GraphTreeWidget.prototype.refreshMainXGMML = function () {
            var graphView = this.main.getCurrentGraphView();
            graphView.refreshXGMML(this.main);
        };
        GraphTreeWidget.prototype.displayGraphs = function (graphs) {
            for (var i = 0; i < graphs.length; ++i) {
                this.wu.fetchGraphXgmml(i, null, function (xgmml) {
                    this.main.loadXGMML(xgmml, true);
                });
            }
        };
        GraphTreeWidget.prototype.refreshActionState = function () {
            var tab = this.widget.OverviewTabContainer.get("selectedChildWidget");
            this.setDisabled(this.id + "FindPrevious", this.foundIndex <= 0, "iconLeft", "iconLeftDisabled");
            this.setDisabled(this.id + "FindNext", this.foundIndex >= this.found.length - 1, "iconRight", "iconRightDisabled");
            this.setDisabled(this.id + "ActivityMetric", tab.id !== this.id + "ActivitiesTreeMap");
        };
        GraphTreeWidget = tslib_1.__decorate([
            DeclareDecorator_1.declareDecorator("GraphTreeWidget", _Widget)
        ], GraphTreeWidget);
        return GraphTreeWidget;
    }());
    exports.GraphTreeWidget = GraphTreeWidget;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=GraphTreeWidget.js.map

/***/ }),

/***/ "./node_modules/dijit/CheckedMenuItem.js":
/*!***********************************************!*\
  !*** ./node_modules/dijit/CheckedMenuItem.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.toggle
	__webpack_require__(/*! ./MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! dojo/text!./templates/CheckedMenuItem.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html"),
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, MenuItem, template){

	// module:
	//		dijit/CheckedMenuItem

	return declare("dijit.CheckedMenuItem", MenuItem, {
		// summary:
		//		A checkbox-like menu item for toggling on and off

		// Use both base classes so we get styles like dijitMenuItemDisabled
		baseClass: "dijitMenuItem dijitCheckedMenuItem",

		templateString: template,

		// checked: Boolean
		//		Our checked state
		checked: false,
		_setCheckedAttr: function(/*Boolean*/ checked){
			this.domNode.setAttribute("aria-checked", checked ? "true" : "false");
			this._set("checked", checked);	// triggers CSS update via _CssStateMixin
		},

		iconClass: "",	// override dijitNoIcon

		role: "menuitemcheckbox",

		// checkedChar: String
		//		Character (or string) used in place of checkbox icon when display in high contrast mode
		checkedChar: "&#10003;",

		onChange: function(/*Boolean*/ /*===== checked =====*/){
			// summary:
			//		User defined function to handle check/uncheck events
			// tags:
			//		callback
		},

		_onClick: function(evt){
			// summary:
			//		Clicking this item just toggles its state
			// tags:
			//		private
			if(!this.disabled){
				this.set("checked", !this.checked);
				this.onChange(this.checked);
			}
			this.onClick(evt);
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTreeWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GraphTreeWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ToolbarContentPane\" class=\"${baseClass}ToolbarContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Toolbar\" class=\"topPanel dijit dijitToolbar\" role=\"toolbar\">\n                <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}FindField\" style=\"width: 120px\" data-dojo-props=\"placeHolder:'${i18n.Find}'\" data-dojo-type=\"dijit.form.TextBox\">${i18n.Find}</div>\n                <div id=\"${id}Find\" data-dojo-attach-event=\"onClick:_onFind\" data-dojo-props=\"iconClass:'iconFind', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Find}</div>\n                <div id=\"${id}FindPrevious\" data-dojo-attach-event=\"onClick:_onFindPrevious\" data-dojo-props=\"iconClass:'iconLeft', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindPrevious}</div>\n                <div id=\"${id}FindNext\" data-dojo-attach-event=\"onClick:_onFindNext\" data-dojo-props=\"iconClass:'iconRight', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindNext}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}AdvancedMenu\" data-dojo-type=\"dijit.form.DropDownButton\">\n                    <span>${i18n.Advanced}</span>\n                    <div data-dojo-type=\"dijit.Menu\">\n                        <div id=\"${id}GetSVG\" data-dojo-attach-event=\"onClick:_onGetSVG\" data-dojo-type=\"dijit.MenuItem\">${i18n.ShowSVG}</div>\n                        <div id=\"${id}RenderSVG\" data-dojo-attach-event=\"onClick:_onRenderSVG\" data-dojo-type=\"dijit.MenuItem\">${i18n.RenderSVG}</div>\n                        <div id=\"${id}GetXGMML\" data-dojo-attach-event=\"onClick:_onGetXGMML\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditXGMML}</div>\n                        <div id=\"${id}EditDOT\" data-dojo-attach-event=\"onClick:_onEditDOT\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditDOT}</div>\n                        <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                        <div id=\"${id}GetGraphAttributes\" data-dojo-attach-event=\"onClick:_onGetGraphAttributes\" data-dojo-type=\"dijit.MenuItem\">${i18n.EditGraphAttributes}</div>\n                        <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                        <div id=\"${id}About\" data-dojo-attach-event=\"onClick:_onAbout\" data-dojo-type=\"dijit.MenuItem\">${i18n.AboutGraphControl}</div>\n                    </div>\n                </div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <label id=\"${id}Warning\"></label>\n                <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n            </div>\n        </div>\n        <div id=\"${id}MainGraphWidget\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"${graphType}\">\n        </div>\n        <div id=\"${id}SideBorderContainer\" style=\"width: 33%\" data-dojo-props=\"region: 'left', splitter:true, minSize: 120\" data-dojo-type=\"dijit.layout.BorderContainer\">\n            <div id=\"${id}TreeToolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                <div data-dojo-attach-event=\"onClick:_onTreeRefresh\" data-dojo-props=\"iconClass:'iconRefresh', showLabel: false\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}StackController\" style=\"width: 100%\" data-dojo-props=\"containerId:'${id}OverviewTabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <select id=\"${id}ActivityMetric\" style=\"width: 108px\" class=\"smallSelect\" data-dojo-attach-event=\"onChange:_onChangeActivityMetric\" data-dojo-type=\"dijit.form.Select\">\n                </select>\n            </div>\n            <div id=\"${id}OverviewTabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.StackContainer\">\n                <div id=\"${id}SubgraphsGridCP\" tooltip=\"${i18n.Subgraphs}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconFolderList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}SubgraphsGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}VerticesGridCP\" tooltip=\"${i18n.Activities}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconFileList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}VerticesGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}EdgesGridCP\" tooltip=\"${i18n.Edges}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconEdgeList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}EdgesGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}TreeGridCP\" tooltip=\"${i18n.Tree}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconFolderTree', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}TreeGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}TimingsTreeMap\" tooltip=\"${i18n.TimingsMap}\" data-dojo-props=\"iconClass:'iconTreeMap', showTitle: false\" data-dojo-type=\"TimingTreeMapWidget\">\n                </div>\n                <div id=\"${id}ActivitiesTreeMap\" tooltip=\"${i18n.ActivityMap}\" data-dojo-props=\"iconClass:'iconTreeMap', showTitle: false\" data-dojo-type=\"TimingTreeMapWidget\">\n                </div>\n            </div>\n            <div id=\"${id}LocalTabContainer\" style=\"height: 33%\" data-dojo-props=\"region: 'bottom', splitter:true, minSize: 120, tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <div id=\"${id}Properties\" title=\"${i18n.Properties}\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}GlobalGraphWidget\" data-dojo-type=\"${graphType}\">\n    </div>\n    <div id=\"${id}XGMMLDialog\" title=\"${i18n.XGMML}\" data-dojo-type=\"dijit.Dialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <textarea id=\"${id}XGMMLTextArea\" rows=\"25\" cols=\"80\" data-dojo-type=\"dijit.form.SimpleTextarea\"></textarea>\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button id=\"${id}XGMMLDialogApply\" type=\"submit\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n            <button id=\"${id}XGMMLDialogCancel\" type=\"button\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n        </div>\n    </div>\n    <div id=\"${id}InfoDialog\" title=\"${i18n.InfoDialog}\" data-dojo-type=\"dijit.Dialog\">\n        <div id=\"${id}InfoDialogContent\" class=\"dijitDialogPaneContentArea\">\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button id=\"${id}InfoDialogCancel\" type=\"button\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/CheckedMenuItem.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${!checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"

/***/ })

}]);