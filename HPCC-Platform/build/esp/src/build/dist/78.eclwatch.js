(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/Graph7Widget":"./lib/src/Graph7Widget.js",
	"dojo/text!hpcc/templates/Graph7Widget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/Graph7Widget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[78],{

/***/ "./lib/src/Graph7Widget.js":
/*!*********************************!*\
  !*** ./lib/src/Graph7Widget.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"), __webpack_require__(/*! @hpcc-js/util */ "./node_modules/@hpcc-js/util/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"), __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"), __webpack_require__(/*! dojo/text!hpcc/templates/Graph7Widget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/Graph7Widget.html"), __webpack_require__(/*! ./DeclareDecorator */ "./lib/src/DeclareDecorator.js"), __webpack_require__(/*! ./WUScopeController */ "./lib/src/WUScopeController.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"), __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"), __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"), __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, lang, nlsHPCC, aspect, dom, registry, util_1, comms_1, graph_1, _Widget, template, DeclareDecorator_1, WUScopeController_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Graph7Widget = /** @class */ (function () {
        function Graph7Widget() {
            var _this = this;
            this.templateString = template;
            this.i18n = nlsHPCC;
            this.wuid = "";
            this.graphStatus = null;
            this._gc = new WUScopeController_1.WUScopeController();
            this._gc.minClick = function (sg) {
                _this.loadGraph(function (w) {
                    _this._graph
                        .selection([sg])
                        .centerOnItem(sg);
                });
            };
        }
        Graph7Widget.prototype.fetchScopeGraph = function (wuid, graphID, refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            this.graphStatus.innerText = this.i18n.FetchingData;
            var hash = util_1.hashSum({
                wuid: wuid,
                graphID: graphID
            });
            if (!this._prevScopeGraph || refresh || this._prevHashSum !== hash) {
                this._prevHashSum = hash;
                this._gc.clear();
                var wu = comms_1.Workunit.attach({ baseUrl: "" }, wuid);
                this._prevScopeGraph = wu.fetchScopeGraphs(graphID ? [graphID] : []).then(function (scopedGraph) {
                    _this.graphStatus.innerText = _this.i18n.Loading;
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            _this._gc.set(scopedGraph);
                            resolve(scopedGraph);
                        }, 0);
                    });
                });
            }
            return this._prevScopeGraph;
        };
        //  --- ---
        Graph7Widget.prototype.buildRendering = function (args) {
            this.inherited(arguments);
        };
        Graph7Widget.prototype.postCreate = function (args) {
            this.inherited(arguments);
            this._initGraphControls();
        };
        Graph7Widget.prototype.startup = function (args) {
            this.inherited(arguments);
        };
        Graph7Widget.prototype.resize = function (s) {
            this.inherited(arguments);
            this.widget.MainBorderContainer.resize();
        };
        Graph7Widget.prototype.layout = function (args) {
            this.inherited(arguments);
        };
        Graph7Widget.prototype.destroy = function (args) {
            this.inherited(arguments);
        };
        //  Implementation  ---
        Graph7Widget.prototype._initGraphControls = function () {
            var _this = this;
            aspect.after(registry.byId(this.id + "MainBorderContainer"), "resize", function () {
                if (_this._graph) {
                    _this._graph
                        .resize()
                        .render();
                }
            });
        };
        Graph7Widget.prototype._onRefresh = function () {
            this.refreshData();
        };
        Graph7Widget.prototype._onGraphRefresh = function () {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("normal");
            });
            delete this._graph["_prevLayout"];
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        Graph7Widget.prototype._onPartial = function (args) {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("partial");
            });
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        Graph7Widget.prototype._onMax = function (args) {
            var _this = this;
            this._graph.data().subgraphs.forEach(function (sg) {
                sg.minState("normal");
            });
            this.loadGraph(function (w) {
                _this._graph.zoomToFit();
            });
        };
        Graph7Widget.prototype._onZoomToFit = function (args) {
            this._graph.zoomToFit();
        };
        Graph7Widget.prototype._onZoomToWidth = function (args) {
            this._graph.zoomToWidth();
        };
        Graph7Widget.prototype._onZoomToPlus = function (args) {
            this._graph.zoomPlus();
        };
        Graph7Widget.prototype._onZoomToMinus = function (args) {
            this._graph.zoomMinus();
        };
        Graph7Widget.prototype.isWorkunit = function () {
            return lang.exists("params.Wuid", this);
        };
        Graph7Widget.prototype.isQuery = function () {
            return lang.exists("params.QueryId", this);
        };
        Graph7Widget.prototype.init = function (params) {
            if (this.inherited(arguments))
                return;
            this.initGraph();
            this.doInit(params);
        };
        Graph7Widget.prototype.clear = function () {
            this._graph
                .data({ vertices: [], edges: [] })
                .render();
        };
        Graph7Widget.prototype.doInit = function (wuid) {
            this.wuid = wuid;
            this.refreshData();
        };
        Graph7Widget.prototype.refreshData = function () {
            if (this.isWorkunit()) {
                return this.loadGraphFromWu(this.wuid, "", true);
            }
            else if (this.isQuery()) {
            }
            return Promise.resolve();
        };
        Graph7Widget.prototype.loadGraphFromWu = function (wuid, graphName, refresh) {
            var _this = this;
            if (refresh === void 0) { refresh = false; }
            return this.fetchScopeGraph(wuid, graphName, refresh).then(function () {
                _this.loadGraph();
            });
        };
        Graph7Widget.prototype.initGraph = function () {
            var _this = this;
            this.graphStatus = dom.byId(this.id + "GraphStatus");
            this._graph = new graph_1.Graph()
                .target(this.id + "MainGraphWidget")
                .layout("Hierarchy")
                .applyScaleOnLayout(true)
                .showToolbar(false)
                .allowDragging(false)
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
        };
        Graph7Widget.prototype.loadGraph = function (callback) {
            this._graph
                .data(this._gc.graphData(), true)
                .render(callback);
        };
        Graph7Widget.baseClass = "Graph7Widget";
        Graph7Widget = tslib_1.__decorate([
            DeclareDecorator_1.declareDecorator("Graph7Widget", _Widget)
        ], Graph7Widget);
        return Graph7Widget;
    }());
    exports.Graph7Widget = Graph7Widget;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=Graph7Widget.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/Graph7Widget.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/Graph7Widget.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}MainBorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; padding: 0px; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}GraphToolbarContentPane\" class=\"${baseClass}ToolbarContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}GraphToolbar\" class=\"topPanel dijit dijitToolbar\" role=\"toolbar\">\n                <div data-dojo-attach-event=\"onClick:_onGraphRefresh\" data-dojo-props=\"iconClass:'fa fa-refresh', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div data-dojo-attach-event=\"onClick:_onPartial\" data-dojo-props=\"iconClass:'fa fa-window-restore', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.CollapseAll}</div>\n                <div data-dojo-attach-event=\"onClick:_onMax\" data-dojo-props=\"iconClass:'fa fa-window-maximize', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Restore}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div data-dojo-attach-event=\"onClick:_onZoomToFit\" data-dojo-props=\"iconClass:'fa fa-arrows-alt', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomAll}</div>\n                <div data-dojo-attach-event=\"onClick:_onZoomToWidth\" data-dojo-props=\"iconClass:'fa fa-arrows-h', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomWidth}</div>\n                <div data-dojo-attach-event=\"onClick:_onZoomToPlus\" data-dojo-props=\"iconClass:'fa fa-plus', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomPlus}</div>\n                <div data-dojo-attach-event=\"onClick:_onZoomToMinus\" data-dojo-props=\"iconClass:'fa fa-minus', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ZoomMinus}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <span id=\"${id}GraphStatus\" ></span>\n            </div>\n        </div>\n        <div id=\"${id}MainGraphWidget\" style=\"overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);