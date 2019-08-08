(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/GraphStore":"./lib/src/GraphStore.js",
	"src/GraphTree7Widget":"./lib/src/GraphTree7Widget.js",
	"src/WUGraphLegend":"./lib/src/WUGraphLegend.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!hpcc/templates/GraphTree7Widget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTree7Widget.html",
	"dojo/store/Observable":"./node_modules/dojo/store/Observable.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[108],{

/***/ "./lib/src/GraphStore.js":
/*!*******************************!*\
  !*** ./lib/src/GraphStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, lang, arrayUtil, QueryResults, ESPUtil_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphStore = /** @class */ (function (_super) {
        tslib_1.__extends(GraphStore, _super);
        function GraphStore(idProperty) {
            if (idProperty === void 0) { idProperty = "id"; }
            var _this = _super.call(this) || this;
            _this.cacheColumns = {};
            _this.idProperty = idProperty;
            return _this;
        }
        GraphStore.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
            this.cacheColumns = {};
            this.calcColumns();
        };
        GraphStore.prototype.query = function (query, options) {
            var retVal = _super.prototype.query.call(this, query, options);
            var sortSet = options && options.sort;
            if (sortSet) {
                retVal.sort(typeof sortSet === "function" ? sortSet : function (a, b) {
                    for (var sort, i = 0; sort = sortSet[i]; i++) {
                        var aValue = a[sort.attribute];
                        var bValue = b[sort.attribute];
                        // valueOf enables proper comparison of dates
                        aValue = aValue != null ? aValue.valueOf() : aValue;
                        bValue = bValue != null ? bValue.valueOf() : bValue;
                        if (aValue !== bValue) {
                            return !!sort.descending == (bValue == null || aValue > bValue) ? -1 : 1; // jshint ignore:line
                        }
                    }
                    return 0;
                });
            }
            return retVal;
        };
        //  Helpers  ---
        GraphStore.prototype.isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        GraphStore.prototype.calcColumns = function () {
            arrayUtil.forEach(this.data, function (item, idx) {
                for (var key in item) {
                    if (key !== "id" && key.substring(0, 1) !== "_") {
                        if (!this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                        else if (item[key].length > this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                    }
                    if (this.isNumber(item[key])) {
                        item[key] = parseFloat(item[key]);
                    }
                }
            }, this);
        };
        GraphStore.prototype.getColumnWidth = function (key) {
            var width = this.cacheColumns[key] * 9;
            if (width < 27) {
                width = 27;
            }
            else if (width > 300) {
                width = 300;
            }
            return width;
        };
        GraphStore.prototype.appendColumns = function (target, highPriority, lowPriority, skip, formatTime) {
            if (skip === void 0) { skip = []; }
            if (formatTime === void 0) { formatTime = false; }
            if (!highPriority) {
                highPriority = [];
            }
            if (!lowPriority) {
                lowPriority = [];
            }
            var skip = skip || [];
            arrayUtil.forEach(target, function (item, idx) {
                skip.push(item.field);
            });
            arrayUtil.forEach(highPriority, function (key, idx) {
                if (skip.indexOf(key) === -1 && this.cacheColumns[key]) {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }, this);
            for (var key in this.cacheColumns) {
                if (skip.indexOf(key) === -1 && highPriority.indexOf(key) === -1 && lowPriority.indexOf(key) === -1 && key.substring(0, 1) !== "_") {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }
            arrayUtil.forEach(lowPriority, function (key, idx) {
                if (skip.indexOf(key) === -1 && this.cacheColumns[key]) {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }, this);
            if (formatTime) {
                arrayUtil.forEach(target, function (column, idx) {
                    if (column.label.indexOf("Time") === 0 || column.label.indexOf("Size") === 0 || column.label.indexOf("Skew") === 0) {
                        column.formatter = function (_id, row) {
                            return row["_" + column.field] || "";
                        };
                    }
                });
            }
        };
        return GraphStore;
    }(ESPUtil_1.UndefinedMemory));
    exports.GraphStore = GraphStore;
    var GraphTreeStore = /** @class */ (function (_super) {
        tslib_1.__extends(GraphTreeStore, _super);
        //  Store API  ---
        function GraphTreeStore() {
            var _this = _super.call(this) || this;
            _this.idProperty = "id";
            return _this;
        }
        GraphTreeStore.prototype.query = function (query, options) {
            return _super.prototype.query.call(this, query, options);
        };
        GraphTreeStore.prototype.setTree = function (data) {
            this.setData([]);
            this.cacheColumns = {};
            this.walkData(data);
        };
        GraphTreeStore.prototype.walkData = function (data) {
            arrayUtil.forEach(data, function (item, idx) {
                if (item._children) {
                    item._children.sort(function (l, r) {
                        return l.id - r.id;
                    });
                    this.walkData(item._children);
                    lang.mixin(item, {
                        __hpcc_notActivity: true
                    });
                }
                this.add(item);
                for (var key in item) {
                    if (key !== "id" && key.substring(0, 1) !== "_") {
                        if (!this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                        else if (item[key].length > this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                    }
                    if (this.isNumber(item[key])) {
                        item[key] = parseFloat(item[key]);
                    }
                }
            }, this);
        };
        //  Tree API  ---
        GraphTreeStore.prototype.mayHaveChildren = function (object) {
            return object._children;
        };
        GraphTreeStore.prototype.getChildren = function (parent, options) {
            var filter = {};
            if (options.originalQuery.__hpcc_notActivity) {
                filter = {
                    __hpcc_notActivity: true
                };
            }
            return QueryResults(this.queryEngine(filter, options)(parent._children));
        };
        return GraphTreeStore;
    }(GraphStore));
    exports.GraphTreeStore = GraphTreeStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=GraphStore.js.map

/***/ }),

/***/ "./lib/src/GraphTree7Widget.js":
/*!*************************************!*\
  !*** ./lib/src/GraphTree7Widget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"), __webpack_require__(/*! @hpcc-js/util */ "./node_modules/@hpcc-js/util/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"), __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./WsWorkunits */ "./lib/src/WsWorkunits.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js"), __webpack_require__(/*! ./DeclareDecorator */ "./lib/src/DeclareDecorator.js"), __webpack_require__(/*! ./WUScopeController */ "./lib/src/WUScopeController.js"), __webpack_require__(/*! ./GraphStore */ "./lib/src/GraphStore.js"), __webpack_require__(/*! ./WUGraphLegend */ "./lib/src/WUGraphLegend.js"), __webpack_require__(/*! dojo/text!hpcc/templates/GraphTree7Widget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTree7Widget.html"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"), __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"), __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"), __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"), __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"), __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"), __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"), __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"), __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js"), __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"), __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"), __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"), __webpack_require__(/*! dijit/layout/StackController */ "./node_modules/dijit/layout/StackController.js"), __webpack_require__(/*! dijit/layout/StackContainer */ "./node_modules/dijit/layout/StackContainer.js"), __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, declare, lang, nlsHPCC, arrayUtil, aspect, dom, topic, registry, util_1, comms_1, graph_1, _Widget, ESPUtil_1, WsWorkunits, Utility_1, DeclareDecorator_1, WUScopeController_1, GraphStore_1, WUGraphLegend_1, template) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphTree7Widget = /** @class */ (function () {
        function GraphTree7Widget() {
            var _this = this;
            this.templateString = template;
            this.i18n = nlsHPCC;
            this.wuid = "";
            this.graphName = "";
            this.optionsDropDown = null;
            this.optionsForm = null;
            this._optionsDefault = null;
            this.subgraphsGrid = null;
            this.verticesGrid = null;
            this.edgesGrid = null;
            this.graphStatus = null;
            this.findText = "";
            this.found = [];
            this.foundIndex = 0;
            this._gc = new WUScopeController_1.WUScopeController();
            this.treeStore = new GraphStore_1.GraphTreeStore();
            this.subgraphsStore = new GraphStore_1.GraphStore("Id");
            this.verticesStore = new GraphStore_1.GraphStore("Id");
            this.edgesStore = new GraphStore_1.GraphStore("Id");
            this.persist = new Utility_1.Persist("GraphTree7Widget");
            this.inSyncSelectionFrom = false;
            this._gc.minClick = function (sg) {
                _this.loadGraph(function (w) {
                    _this._graph
                        .selection([sg])
                        .centerOnItem(sg);
                    _this.syncSelectionFrom(_this._graph);
                });
            };
        }
        //  Options ---
        GraphTree7Widget.prototype._onOptionsApply = function () {
            var optionsValues = this.optionsForm.getValues();
            this.persist.setObj("options", optionsValues);
            this.optionsDropDown.closeDropDown();
            this.loadGraph();
        };
        GraphTree7Widget.prototype._onOptionsReset = function () {
            this.optionsForm.setValues(this._optionsDefault);
            this.loadGraph();
        };
        GraphTree7Widget.prototype.fetchScopeGraph = function (wuid, graphID, subgraphID, refresh) {
            var _this = this;
            if (subgraphID === void 0) { subgraphID = ""; }
            if (refresh === void 0) { refresh = false; }
            this.graphStatus.innerText = this.i18n.FetchingData;
            var hash = util_1.hashSum({
                wuid: wuid,
                graphID: graphID,
                subgraphID: subgraphID
            });
            if (!this._prevScopeGraph || refresh || this._prevHashSum !== hash) {
                this._prevHashSum = hash;
                this._gc.clear();
                var wu = comms_1.Workunit.attach({ baseUrl: "" }, wuid);
                this._prevScopeGraph = wu.fetchGraphs().then(function (graphs) {
                    for (var _i = 0, graphs_1 = graphs; _i < graphs_1.length; _i++) {
                        var graph = graphs_1[_i];
                        if (graph.Name === graphID) {
                            return graph.fetchScopeGraph(subgraphID).then(function (scopedGraph) {
                                _this.graphStatus.innerText = _this.i18n.Loading;
                                return new Promise(function (resolve, reject) {
                                    setTimeout(function () {
                                        _this._gc.set(scopedGraph);
                                        _this._legend.data(_this._gc.calcLegend());
                                        resolve(scopedGraph);
                                    }, 0);
                                });
                            });
                        }
                    }
                });
            }
            return this._prevScopeGraph;
        };
        //  --- ---
        GraphTree7Widget.prototype.buildRendering = function (args) {
            this.inherited(arguments);
        };
        GraphTree7Widget.prototype.postCreate = function (args) {
            this.inherited(arguments);
            this._initGraphControls();
            var context = this;
            topic.subscribe(this.id + "OverviewTabContainer-selectChild", function (topic) {
                context.refreshActionState();
            });
            this.optionsDropDown = registry.byId(this.id + "OptionsDropDown");
            this.optionsForm = registry.byId(this.id + "OptionsForm");
            this._optionsDefault = this.optionsForm.getValues();
            var options = this.persist.getObj("options", this._optionsDefault);
            this.optionsForm.setValues(options);
        };
        GraphTree7Widget.prototype.startup = function (args) {
            this.inherited(arguments);
            this.refreshActionState();
        };
        GraphTree7Widget.prototype.resize = function (s) {
            this.inherited(arguments);
            this.widget.BorderContainer.resize();
        };
        GraphTree7Widget.prototype.layout = function (args) {
            this.inherited(arguments);
        };
        GraphTree7Widget.prototype.destroy = function (args) {
            this.inherited(arguments);
        };
        //  Implementation  ---
        GraphTree7Widget.prototype._initGraphControls = function () {
            var _this = this;
            aspect.after(registry.byId(this.id + "MainBorderContainer"), "resize", function () {
                if (_this._graph) {
                    _this._graph
                        .resize()
                        .render();
                }
            });
        };
        GraphTree7Widget.prototype._initItemGrid = function (grid) {
            var context = this;
            grid.on("dgrid-select, dgrid-deselect", function (event) {
                context.syncSelectionFrom(grid);
            });
            grid.on(".dgrid-row:dblclick", function (evt) {
                var item = grid.row(evt).data;
                context.centerOn(item.Id);
            });
        };
        GraphTree7Widget.prototype._onRefresh = function () {
            this.refreshData();
        };
        GraphTree7Widget.prototype._onGraphRefresh = function () {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("normal");
            });
            delete this._graph["_prevLayout"];
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        GraphTree7Widget.prototype._onPartial = function (args) {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("partial");
            });
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        GraphTree7Widget.prototype._onMax = function (args) {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("normal");
            });
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        GraphTree7Widget.prototype._onZoomToFit = function (args) {
            this._graph.zoomToFit();
        };
        GraphTree7Widget.prototype._onZoomToWidth = function (args) {
            this._graph.zoomToWidth();
        };
        GraphTree7Widget.prototype._onZoomToPlus = function (args) {
            this._graph.zoomPlus();
        };
        GraphTree7Widget.prototype._onZoomToMinus = function (args) {
            this._graph.zoomMinus();
        };
        GraphTree7Widget.prototype._doFind = function (prev) {
            if (this.findText !== this.widget.FindField.value) {
                this.findText = this.widget.FindField.value;
                this.found = this._gc.find(this.findText);
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
                this._graph.centerOnItem(this._gc.item(this.found[this.foundIndex]));
            }
            this.refreshActionState();
        };
        GraphTree7Widget.prototype._onFind = function (prev) {
            this.findText = "";
            this._doFind(false);
        };
        GraphTree7Widget.prototype._onFindNext = function () {
            this._doFind(false);
        };
        GraphTree7Widget.prototype._onFindPrevious = function () {
            this._doFind(true);
        };
        GraphTree7Widget.prototype.isWorkunit = function () {
            return lang.exists("params.Wuid", this);
        };
        GraphTree7Widget.prototype.isQuery = function () {
            return lang.exists("params.QueryId", this);
        };
        GraphTree7Widget.prototype.init = function (params) {
            if (this.inherited(arguments))
                return;
            this.initGraph();
            this.initSubgraphs();
            this.initVertices();
            this.initEdges();
            this.doInit(params);
            this.refreshActionState();
        };
        GraphTree7Widget.prototype.refresh = function (params) {
            if (params.SubGraphId) {
                this.syncSelectionFrom(this);
            }
        };
        GraphTree7Widget.prototype.doInit = function (params) {
            var _this = this;
            this.wuid = params.Wuid;
            this.graphName = params.GraphName;
            this.subGraphId = params.SubGraphId;
            this.activityId = params.ActivityId;
            this.edgeId = params.EdgeId;
            this.targetQuery = params.Target;
            this.queryId = params.QueryId;
            this.refreshData().then(function () {
                _this.syncSelectionFrom(_this);
                if (_this.edgeId) {
                    _this.centerOn(_this.edgeId);
                }
                else if (_this.activityId) {
                    _this.centerOn(_this.activityId);
                }
                else if (_this.subGraphId) {
                    _this.centerOn(_this.subGraphId);
                }
            });
        };
        GraphTree7Widget.prototype.refreshData = function () {
            if (this.isWorkunit()) {
                return this.loadGraphFromWu(this.wuid, this.graphName, this.subGraphId, true);
            }
            else if (this.isQuery()) {
            }
            return Promise.resolve();
        };
        GraphTree7Widget.prototype.loadGraphFromWu = function (wuid, graphName, subGraphId, refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return this.fetchScopeGraph(wuid, graphName, subGraphId, refresh).then(function () {
                _this.loadGraph();
                _this.loadSubgraphs();
                _this.loadVertices();
                _this.loadEdges();
            });
        };
        GraphTree7Widget.prototype.initGraph = function () {
            var _this = this;
            this.graphStatus = dom.byId(this.id + "GraphStatus");
            this._graph = new graph_1.Graph()
                .target(this.id + "MainGraphWidget")
                .layout("Hierarchy")
                .applyScaleOnLayout(true)
                .showToolbar(false)
                .allowDragging(false)
                .on("vertex_click", function (sel) {
                _this.syncSelectionFrom(_this._graph);
            })
                .on("edge_click", function (sel) {
                _this.syncSelectionFrom(_this._graph);
            })
                .on("progress", function (what) {
                switch (what) {
                    case "start":
                    case "layout-start":
                    case "layout-tick":
                        _this.graphStatus.innerText = _this.i18n.PerformingLayout;
                        break;
                    case "layout-end":
                    case "end":
                    default:
                        _this.graphStatus.innerText = "";
                        break;
                }
            });
            ;
            this._graph.tooltipHTML(function (v) {
                return _this._gc.calcGraphTooltip2(v);
            });
            this._legend = new WUGraphLegend_1.WUGraphLegend(this)
                .target(this.id + "LegendGrid")
                .on("click", function (kind) {
                _this.loadGraph();
            })
                .on("mouseover", function (kind) {
                var verticesMap = {};
                for (var _i = 0, _a = _this._gc.vertices(kind); _i < _a.length; _i++) {
                    var vertex = _a[_i];
                    verticesMap[vertex.id()] = true;
                }
                _this._graph.highlightVerticies(verticesMap);
            })
                .on("mouseout", function (kind) {
                _this._graph.highlightVerticies();
            });
        };
        GraphTree7Widget.prototype.loadGraph = function (callback) {
            var options = this.optionsForm.getValues();
            this._gc
                .showSubgraphs(options.subgraph.length)
                .showIcon(options.vicon.length)
                .vertexLabelTpl(options.vlabel)
                .edgeLabelTpl(options.elabel)
                .disabled(this._legend.disabled());
            this._graph
                .data(this._gc.graphData(), true)
                .render(callback);
            this._legend
                .render();
        };
        GraphTree7Widget.prototype.formatColumns = function (columns) {
            columns.forEach(function (column) {
                if (column.formatter === undefined) {
                    column.formatter = function (cell, row) {
                        var retVal = (row.__formatted && row.__formatted["" + column.field]) ? row.__formatted["" + column.field] : cell;
                        return retVal !== undefined ? retVal : "";
                    };
                }
            });
        };
        GraphTree7Widget.prototype.initSubgraphs = function () {
            this.subgraphsGrid = new declare([ESPUtil_1.Grid(true, true)])({
                store: this.subgraphsStore
            }, this.id + "SubgraphsGrid");
            var context = this;
            this.subgraphsGrid.on(".dgrid-row-url:click", function (evt) {
                var row = context.subgraphsGrid.row(evt).data;
                context._hostPage.openGraph(context.graphName, row.Id);
            });
            this._initItemGrid(this.subgraphsGrid);
        };
        GraphTree7Widget.prototype.loadSubgraphs = function () {
            var subgraphs = this._gc.subgraphStoreData();
            this.subgraphsStore.setData(subgraphs);
            var context = this;
            var img = Utility_1.getImageURL("folder.png");
            var columns = [
                {
                    label: this.i18n.ID, field: "Id", width: 54,
                    formatter: function (_id, row) {
                        return "<img src='" + img + "'/>&nbsp;" + (context._hostPage ? "<a href='#" + _id + "' class='dgrid-row-url'>" + _id + "</a>" : _id);
                    }
                }
            ];
            this.subgraphsStore.appendColumns(columns, [this.i18n.TimeSeconds, "DescendantCount", "SubgraphCount", "ActivityCount"], ["ChildCount", "Depth"]);
            this.formatColumns(columns);
            this.subgraphsGrid.set("columns", columns);
            this.subgraphsGrid.refresh();
        };
        GraphTree7Widget.prototype.initVertices = function () {
            this.verticesGrid = new declare([ESPUtil_1.Grid(true, true)])({
                store: this.verticesStore
            }, this.id + "VerticesGrid");
            this._initItemGrid(this.verticesGrid);
        };
        GraphTree7Widget.prototype.loadVertices = function () {
            var vertices = this._gc.activityStoreData();
            this.verticesStore.setData(vertices);
            var columns = [
                {
                    label: this.i18n.ID, field: "Id", width: 54,
                    formatter: function (_id, row) {
                        var img = Utility_1.getImageURL("file.png");
                        return "<img src='" + img + "'/>&nbsp;" + _id;
                    }
                },
                { label: this.i18n.Label, field: "Label", width: 150 }
            ];
            this.verticesStore.appendColumns(columns, [], ["Kind", "EclNameList", "EclText", "DefinitionList"]);
            this.formatColumns(columns);
            this.verticesGrid.set("columns", columns);
            this.verticesGrid.refresh();
        };
        GraphTree7Widget.prototype.initEdges = function () {
            this.edgesGrid = new declare([ESPUtil_1.Grid(true, true)])({
                store: this.edgesStore
            }, this.id + "EdgesGrid");
            this._initItemGrid(this.edgesGrid);
        };
        GraphTree7Widget.prototype.loadEdges = function () {
            var edges = this._gc.edgeStoreData();
            this.edgesStore.setData(edges);
            var columns = [
                { label: this.i18n.ID, field: "Id", width: 50 }
            ];
            this.edgesStore.appendColumns(columns, ["Label", "NumRowsProcessed"], ["IdSource", "IdTarget", "SourceIndex", "TargetIndex"]);
            this.formatColumns(columns);
            this.edgesGrid.set("columns", columns);
            this.edgesGrid.refresh();
        };
        GraphTree7Widget.prototype.centerOn = function (itemID) {
            var _this = this;
            if (itemID) {
                var refresh = false;
                var scopeItem = this._gc.scopeItem(itemID);
                while (scopeItem) {
                    var w_1 = this._gc.item(scopeItem._.Id);
                    if (w_1 && w_1 instanceof graph_1.Subgraph && w_1.minState() !== "normal") {
                        w_1.minState("normal");
                        refresh = true;
                    }
                    scopeItem = scopeItem.parent;
                }
                var w = this._gc.item(itemID);
                if (w) {
                    if (refresh) {
                        this._graph
                            .data(this._gc.graphData(), true) //  Force re-render 
                            .render(function (w) {
                            setTimeout(function () {
                                _this._graph
                                    .centerOnItem(w);
                            }, 1000);
                        });
                    }
                    else {
                        this._graph.centerOnItem(w);
                    }
                }
            }
        };
        GraphTree7Widget.prototype.syncSelectionFrom = function (sourceControl) {
            if (!this.inSyncSelectionFrom) {
                this._syncSelectionFrom(sourceControl, this._graph);
            }
        };
        GraphTree7Widget.prototype._syncSelectionFrom = function (sourceControl, graphRef) {
        };
        GraphTree7Widget.prototype.resetPage = function () {
        };
        GraphTree7Widget.prototype.setMainRootItems = function (globalIDs) {
        };
        GraphTree7Widget.prototype.refreshMainXGMML = function () {
        };
        GraphTree7Widget.prototype.displayGraphs = function (graphs) {
        };
        GraphTree7Widget.prototype.refreshActionState = function () {
            var tab = this.widget.OverviewTabContainer.get("selectedChildWidget");
            this.setDisabled(this.id + "FindPrevious", this.foundIndex <= 0, "iconLeft", "iconLeftDisabled");
            this.setDisabled(this.id + "FindNext", this.foundIndex >= this.found.length - 1, "iconRight", "iconRightDisabled");
            this.setDisabled(this.id + "ActivityMetric", tab && tab.id !== this.id + "ActivitiesTreeMap");
        };
        GraphTree7Widget.baseClass = "GraphTree7Widget";
        GraphTree7Widget = tslib_1.__decorate([
            DeclareDecorator_1.declareDecorator("GraphTree7Widget", _Widget)
        ], GraphTree7Widget);
        return GraphTree7Widget;
    }());
    exports.GraphTree7Widget = GraphTree7Widget;
    GraphTree7Widget.prototype._syncSelectionFrom = Utility_1.debounce(function (sourceControlOrGlobalIDs) {
        var _this = this;
        this.inSyncSelectionFrom = true;
        var sourceControl = sourceControlOrGlobalIDs instanceof Array ? null : sourceControlOrGlobalIDs;
        var selectedGlobalIDs = sourceControlOrGlobalIDs instanceof Array ? sourceControlOrGlobalIDs : [];
        if (sourceControl) {
            //  Get Selected Items  ---
            if (sourceControl === this) {
                if (this.edgeId) {
                    selectedGlobalIDs = [this.edgeId];
                }
                else if (this.activityId) {
                    selectedGlobalIDs = [this.activityId];
                }
                else if (this.subGraphId) {
                    selectedGlobalIDs = [this.subGraphId];
                }
            }
            else if (sourceControl === this._graph) {
                selectedGlobalIDs = this._graph.selection()
                    .map(function (w) { return _this._gc.rItem(w); })
                    .filter(function (item) { return !!item; })
                    .map(function (item) { return item._.Id; });
            }
            else if (sourceControl === this.verticesGrid || sourceControl === this.edgesGrid || sourceControl === this.subgraphsGrid) {
                var items = sourceControl.getSelected();
                for (var i = 0; i < items.length; ++i) {
                    if (lang.exists("Id", items[i])) {
                        selectedGlobalIDs.push(items[i].Id);
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
        if (sourceControl !== this._graph) {
            var items_1 = this._gc.items(selectedGlobalIDs);
            this._graph.selection(items_1);
        }
        var propertiesDom = dom.byId(this.id + "Properties");
        propertiesDom.innerHTML = "";
        var html = "";
        for (var _i = 0, selectedGlobalIDs_1 = selectedGlobalIDs; _i < selectedGlobalIDs_1.length; _i++) {
            var id = selectedGlobalIDs_1[_i];
            html += this._gc.calcGraphTooltip(id, this.findText);
        }
        propertiesDom.innerHTML = html;
        var context = this;
        if (selectedGlobalIDs.length) {
            var edges = arrayUtil.filter(selectedGlobalIDs, function (id) {
                return id && id.indexOf && id.indexOf("_") >= 0;
            });
            if (edges.length === 1) {
                WsWorkunits.WUCDebug(context.params.Wuid, "<debug:print edgeId='" + edges[0] + "'/>").then(function (response) {
                    if (lang.exists("WUDebugResponse.Result", response)) {
                        // context.global.displayTrace(response.WUDebugResponse.Result, propertiesDom);
                    }
                });
            }
        }
        this.inSyncSelectionFrom = false;
    }, 500, false);
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=GraphTree7Widget.js.map

/***/ }),

/***/ "./lib/src/WUGraphLegend.js":
/*!**********************************!*\
  !*** ./lib/src/WUGraphLegend.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"), __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/dist/d3-selection.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, graph_1, layout_1, d3_selection_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var LegendVertex = /** @class */ (function (_super) {
        tslib_1.__extends(LegendVertex, _super);
        function LegendVertex() {
            return _super.call(this) || this;
        }
        LegendVertex.prototype.enter = function (domNode, element) {
            var _this = this;
            _super.prototype.enter.call(this, domNode, element);
            this._textBox.text_colorFill("black");
            this._icon.on("click", function () {
                _this.click(_this.data());
            });
        };
        LegendVertex.prototype.click = function (kind) {
        };
        return LegendVertex;
    }(graph_1.Vertex));
    var WUGraphLegend = /** @class */ (function (_super) {
        tslib_1.__extends(WUGraphLegend, _super);
        function WUGraphLegend(owner) {
            var _this = _super.call(this, owner) || this;
            _this.icon = d3_selection_1.local();
            _this._disabled2 = {
            /*  TODO:  Default some to disabled?
            43: true,
            71: true,
            82: true,
            88: true
            */
            };
            return _this;
        }
        WUGraphLegend.prototype.disabled = function (_) {
            var _this = this;
            if (!arguments.length) {
                var retVal = [];
                for (var key in this._disabled2) {
                    if (this._disabled2[key]) {
                        retVal.push(key);
                    }
                }
                return retVal;
            }
            this._disabled2 = {};
            _.forEach(function (kind) { return _this._disabled2[kind] = true; });
            return this;
        };
        WUGraphLegend.prototype.toggle = function (kind) {
            this._disabled2[kind] = !this._disabled2[kind];
        };
        WUGraphLegend.prototype.update = function (domNode, element) {
            _super.prototype.update.call(this, domNode, element);
            var context = this;
            var items = this._g.selectAll(".legendItem").data(this.data(), function (d) { return d.kind; });
            items.enter().append("g")
                .attr("class", "legendItem")
                .each(function (d) {
                context.icon.set(this, new LegendVertex()
                    .target(this)
                    .data(d.kind)
                    .textbox_shape_colorStroke("none")
                    .textbox_shape_colorFill("none")
                    .iconAnchor("left")
                    .faChar(d.faChar)
                    .text(d.label + " (" + d.count + ")")
                    .tooltip(d.kind + " - " + d.label)
                    .on("click", function (kind) {
                    context.toggle(kind);
                    context.render();
                    context.click(kind);
                })
                    .on("mouseover", function (kind) {
                    context.mouseover(kind);
                })
                    .on("mouseout", function (kind) {
                    context.mouseout(kind);
                }));
            })
                .merge(items)
                .each(function (d, i) {
                var bbox = context.icon.get(this)
                    .icon_shape_colorFill(context._disabled2[d.kind] ? "gray" : null)
                    .render().getBBox();
                d3_selection_1.select(this)
                    .attr("transform", "translate(" + +bbox.width / 2 + ", " + i * 30 + ")");
            });
            items.exit()
                .each(function (d) {
                context.icon.get(this)
                    .target(null)
                    .render();
            })
                .remove();
            this._g.attr("transform", "translate(32, 16)");
            var bbox = this.getBBox(true, true);
            this.resize({ width: bbox.width + 32, height: bbox.height + 16 });
        };
        //  Events  ---
        WUGraphLegend.prototype.click = function (kind) {
        };
        WUGraphLegend.prototype.mouseover = function (kind) {
        };
        WUGraphLegend.prototype.mouseout = function (kind) {
        };
        return WUGraphLegend;
    }(layout_1.Legend));
    exports.WUGraphLegend = WUGraphLegend;
    WUGraphLegend.prototype._class += " eclwatch_WUGraphLegend";
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WUGraphLegend.js.map

/***/ }),

/***/ "./node_modules/dijit/ToolbarSeparator.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/ToolbarSeparator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _Widget, _TemplatedMixin){

	// module:
	//		dijit/ToolbarSeparator


	return declare("dijit.ToolbarSeparator", [_Widget, _TemplatedMixin], {
		// summary:
		//		A spacer between two `dijit.Toolbar` items

		templateString: '<div class="dijitToolbarSeparator dijitInline" role="presentation"></div>',

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./":
/*!*************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy?loader=dojo%2Fquery&name=css2 ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var runner = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js");
var loader = __webpack_require__(/*! dojo/query?absMid=dojo/query */ "./node_modules/dojo/query.js");
var req = __webpack_require__.dj.c();
module.exports = runner(loader, "css2", req)

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphTree7Widget.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GraphTree7Widget.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ToolbarContentPane\" class=\"${baseClass}ToolbarContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Toolbar\" class=\"topPanel dijit dijitToolbar\" role=\"toolbar\">\n                <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}FindField\" style=\"width: 120px\" data-dojo-props=\"placeHolder:'${i18n.Find}'\" data-dojo-type=\"dijit.form.TextBox\">${i18n.Find}</div>\n                <div id=\"${id}Find\" data-dojo-attach-event=\"onClick:_onFind\" data-dojo-props=\"iconClass:'iconFind', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Find}</div>\n                <div id=\"${id}FindPrevious\" data-dojo-attach-event=\"onClick:_onFindPrevious\" data-dojo-props=\"iconClass:'iconLeft', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindPrevious}</div>\n                <div id=\"${id}FindNext\" data-dojo-attach-event=\"onClick:_onFindNext\" data-dojo-props=\"iconClass:'iconRight', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.FindNext}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n            </div>\n        </div>\n        <div id=\"${id}MainBorderContainer\" style=\"width: 33%\" data-dojo-props=\"region: 'center', splitter:false, minSize: 120\" data-dojo-type=\"dijit.layout.BorderContainer\">\n            <div id=\"${id}GraphToolbarContentPane\" class=\"${baseClass}ToolbarContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                <div id=\"${id}GraphToolbar\" class=\"topPanel dijit dijitToolbar\" role=\"toolbar\">\n                    <div data-dojo-attach-event=\"onClick:_onGraphRefresh\" data-dojo-props=\"iconClass:'fa fa-refresh', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div data-dojo-attach-event=\"onClick:_onPartial\" data-dojo-props=\"iconClass:'fa fa-window-restore', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.CollapseAll}</div>\n                    <div data-dojo-attach-event=\"onClick:_onMax\" data-dojo-props=\"iconClass:'fa fa-window-maximize', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Restore}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div data-dojo-attach-event=\"onClick:_onZoomToFit\" data-dojo-props=\"iconClass:'fa fa-arrows-alt', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomAll}</div>\n                    <div data-dojo-attach-event=\"onClick:_onZoomToWidth\" data-dojo-props=\"iconClass:'fa fa-arrows-h', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomWidth}</div>\n                    <div data-dojo-attach-event=\"onClick:_onZoomToPlus\" data-dojo-props=\"iconClass:'fa fa-plus', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomPlus}</div>\n                    <div data-dojo-attach-event=\"onClick:_onZoomToMinus\" data-dojo-props=\"iconClass:'fa fa-minus', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomMinus}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}OptionsDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Options}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}OptionsForm\" style=\"width: 530px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <input title=\"${i18n.Subgraphs}:\" name=\"subgraph\" checked data-dojo-type=\"dijit.form.CheckBox\" />\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Activities}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input title=\"${i18n.Icon}:\" name=\"vicon\" checked data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Label}:\" name=\"vlabel\" value=\"%Label%\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Edges}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input title=\"${i18n.Label}:\" name=\"elabel\" value=\"%Label%\\n%NumRowsProcessed%\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onOptionsApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                                    <button data-dojo-attach-event=\"onClick:_onOptionsReset\" data-dojo-type=\"dijit.form.Button\">${i18n.Defaults}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                        <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <span id=\"${id}GraphStatus\" ></span>\n                </div>\n            </div>\n            <div id=\"${id}MainGraphWidget\" style=\"overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n        </div>\n        <div id=\"${id}SideBorderContainer\" style=\"width: 33%\" data-dojo-props=\"region: 'left', splitter:true, minSize: 120\" data-dojo-type=\"dijit.layout.BorderContainer\">\n            <div id=\"${id}TreeToolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                <div id=\"${id}StackController\" style=\"width: 100%\" data-dojo-props=\"containerId:'${id}OverviewTabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            </div>\n            <div id=\"${id}OverviewTabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.StackContainer\">\n                <div id=\"${id}LegendGrid\" tooltip=\"${i18n.Legend}\" style=\"padding: 0px; overflow: auto\" data-dojo-props=\"iconClass:'fa fa-list-ul', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n                <div id=\"${id}SubgraphsGridCP\" tooltip=\"${i18n.Subgraphs}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconFolderList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}SubgraphsGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}VerticesGridCP\" tooltip=\"${i18n.Activities}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconFileList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}VerticesGrid\" style=\"border:none\">\n                    </div>\n                </div>\n                <div id=\"${id}EdgesGridCP\" tooltip=\"${i18n.Edges}\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"iconClass:'iconEdgeList', showTitle: false\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}EdgesGrid\" style=\"border:none\">\n                    </div>\n                </div>\n            </div>\n            <div id=\"${id}LocalTabContainer\" style=\"height: 33%\" data-dojo-props=\"region: 'bottom', splitter:true, minSize: 120, tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <div id=\"${id}Properties\" title=\"${i18n.Properties}\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo/store/Observable.js":
/*!***********************************************!*\
  !*** ./node_modules/dojo/store/Observable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ../when */ "./node_modules/dojo/when.js"), __webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js") /*=====, "./api/Store" =====*/
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel, lang, when, array /*=====, Store =====*/){

// module:
//		dojo/store/Observable

var Observable = function(/*Store*/ store){
	// summary:
	//		The Observable store wrapper takes a store and sets an observe method on query()
	//		results that can be used to monitor results for changes.
	//
	// description:
	//		Observable wraps an existing store so that notifications can be made when a query
	//		is performed.
	//
	// example:
	//		Create a Memory store that returns an observable query, and then log some
	//		information about that query.
	//
	//	|	var store = Observable(new Memory({
	//	|		data: [
	//	|			{id: 1, name: "one", prime: false},
	//	|			{id: 2, name: "two", even: true, prime: true},
	//	|			{id: 3, name: "three", prime: true},
	//	|			{id: 4, name: "four", even: true, prime: false},
	//	|			{id: 5, name: "five", prime: true}
	//	|		]
	//	|	}));
	//	|	var changes = [], results = store.query({ prime: true });
	//	|	var observer = results.observe(function(object, previousIndex, newIndex){
	//	|		changes.push({previousIndex:previousIndex, newIndex:newIndex, object:object});
	//	|	});
	//
	//		See the Observable tests for more information.

	var undef, queryUpdaters = [], revision = 0;
	// a Comet driven store could directly call notify to notify observers when data has
	// changed on the backend
	// create a new instance
	store = lang.delegate(store);
	
	store.notify = function(object, existingId){
		revision++;
		var updaters = queryUpdaters.slice();
		for(var i = 0, l = updaters.length; i < l; i++){
			updaters[i](object, existingId);
		}
	};
	var originalQuery = store.query;
	store.query = function(query, options){
		options = options || {};
		var results = originalQuery.apply(this, arguments);
		if(results && results.forEach){
			var nonPagedOptions = lang.mixin({}, options);
			delete nonPagedOptions.start;
			delete nonPagedOptions.count;

			var queryExecutor = store.queryEngine && store.queryEngine(query, nonPagedOptions);
			var queryRevision = revision;
			var listeners = [], queryUpdater;
			results.observe = function(listener, includeObjectUpdates){
				if(listeners.push(listener) == 1){
					// first listener was added, create the query checker and updater
					queryUpdaters.push(queryUpdater = function(changed, existingId){
						when(results, function(resultsArray){
							var atEnd = resultsArray.length != options.count;
							var i, l, listener;
							if(++queryRevision != revision){
								throw new Error("Query is out of date, you must observe() the query prior to any data modifications");
							}
							var removedObject, removedFrom = -1, insertedInto = -1;
							if(existingId !== undef){
								// remove the old one
								var filteredArray = [].concat(resultsArray);
								if(queryExecutor && !changed){
									filteredArray = queryExecutor(resultsArray);
								}
								for(i = 0, l = resultsArray.length; i < l; i++){
									var object = resultsArray[i];
									if(store.getIdentity(object) == existingId){
										if(filteredArray.indexOf(object)<0) continue;
										removedObject = object;
										removedFrom = i;
										if(queryExecutor || !changed){// if it was changed and we don't have a queryExecutor, we shouldn't remove it because updated objects would be eliminated
											resultsArray.splice(i, 1);
										}
										break;
									}
								}
							}
							if(queryExecutor){
								// add the new one
								if(changed &&
										// if a matches function exists, use that (probably more efficient)
										(queryExecutor.matches ? queryExecutor.matches(changed) : queryExecutor([changed]).length)){

									var firstInsertedInto = removedFrom > -1 ? 
										removedFrom : // put back in the original slot so it doesn't move unless it needs to (relying on a stable sort below)
										resultsArray.length;
									resultsArray.splice(firstInsertedInto, 0, changed); // add the new item
									insertedInto = array.indexOf(queryExecutor(resultsArray), changed); // sort it
									// we now need to push the change back into the original results array
									resultsArray.splice(firstInsertedInto, 1); // remove the inserted item from the previous index
									
									if((options.start && insertedInto == 0) ||
										(!atEnd && insertedInto == resultsArray.length)){
										// if it is at the end of the page, assume it goes into the prev or next page
										insertedInto = -1;
									}else{
										resultsArray.splice(insertedInto, 0, changed); // and insert into the results array with the correct index
									}
								}
							}else if(changed){
								// we don't have a queryEngine, so we can't provide any information
								// about where it was inserted or moved to. If it is an update, we leave it's position alone, other we at least indicate a new object
								if(existingId !== undef){
									// an update, keep the index the same
									insertedInto = removedFrom;
								}else if(!options.start){
									// a new object
									insertedInto = store.defaultIndex || 0;
									resultsArray.splice(insertedInto, 0, changed);
								}
							}
							if((removedFrom > -1 || insertedInto > -1) &&
									(includeObjectUpdates || !queryExecutor || (removedFrom != insertedInto))){
								var copyListeners = listeners.slice();
								for(i = 0;listener = copyListeners[i]; i++){
									listener(changed || removedObject, removedFrom, insertedInto);
								}
							}
						});
					});
				}
				var handle = {};
				// TODO: Remove cancel in 2.0.
				handle.remove = handle.cancel = function(){
					// remove this listener
					var index = array.indexOf(listeners, listener);
					if(index > -1){ // check to make sure we haven't already called cancel
						listeners.splice(index, 1);
						if(!listeners.length){
							// no more listeners, remove the query updater too
							queryUpdaters.splice(array.indexOf(queryUpdaters, queryUpdater), 1);
						}
					}
				};
				return handle;
			};
		}
		return results;
	};
	var inMethod;
	function whenFinished(method, action){
		var original = store[method];
		if(original){
			store[method] = function(value){
				var originalId;
				if(method === 'put'){
					originalId = store.getIdentity(value);
				}
				if(inMethod){
					// if one method calls another (like add() calling put()) we don't want two events
					return original.apply(this, arguments);
				}
				inMethod = true;
				try{
					var results = original.apply(this, arguments);
					when(results, function(results){
						action((typeof results == "object" && results) || value, originalId);
					});
					return results;
				}finally{
					inMethod = false;
				}
			};
		}
	}
	// monitor for updates by listening to these methods
	whenFinished("put", function(object, originalId){
		store.notify(object, originalId);
	});
	whenFinished("add", function(object){
		store.notify(object);
	});
	whenFinished("remove", function(id){
		store.notify(undefined, id);
	});

	return store;
};

lang.setObject("dojo.store.Observable", Observable);

return Observable;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);