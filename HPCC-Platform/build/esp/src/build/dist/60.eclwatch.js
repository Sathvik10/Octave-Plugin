(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"src/Timings":"./lib/src/Timings.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ "./dgrid/selector.js":
/*!***************************!*\
  !*** ./dgrid/selector.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! dojo/_base/sniff */ "./node_modules/dojo/_base/sniff.js"), __webpack_require__(/*! put-selector/put */ "./put-selector/put.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel, arrayUtil, on, aspect, has, put){
	return function(column, type){
		
		var listeners = [],
			grid, headerCheckbox;
		
		if(!column){ column = {}; }
		
		if(column.type){
			column.selectorType = column.type;
			kernel.deprecated("columndef.type", "use columndef.selectorType instead", "dgrid 0.4");
		}
		// accept type as argument to Selector function, or from column def
		column.selectorType = type = type || column.selectorType || "checkbox";
		column.sortable = false;

		function disabled(item) {
			return !grid.allowSelect(grid.row(item));
		}
		
		function changeInput(value){
			// creates a function that modifies the input on an event
			return function(event){
				var rows = event.rows,
					len = rows.length,
					state = "false",
					selection, mixed, i;
				
				for(i = 0; i < len; i++){
					var element = grid.cell(rows[i], column.id).element;
					if(!element){ continue; } // skip if row has been entirely removed
					element = (element.contents || element).input;
					if(element && !element.disabled){
						// only change the value if it is not disabled
						element.checked = value;
						element.setAttribute("aria-checked", value);
					}
				}
				if(headerCheckbox.type == "checkbox"){
					selection = grid.selection;
					mixed = false;
					// see if the header checkbox needs to be indeterminate
					for(i in selection){
						// if there is anything in the selection, than it is indeterminate
						if(selection[i] != grid.allSelected){
							mixed = true;
							break;
						}
					}
					headerCheckbox.indeterminate = mixed;
					headerCheckbox.checked = grid.allSelected;
					if (mixed) {
						state = "mixed";
					} else if (grid.allSelected) {
						state = "true";
					}
					headerCheckbox.setAttribute("aria-checked", state);
				}
			};
		}
		
		function onSelect(event){
			// we would really only care about click, since other input sources, like spacebar
			// trigger a click, but the click event doesn't provide access to the shift key in firefox, so
			// listen for keydown's as well to get an event in firefox that we can properly retrieve
			// the shiftKey property from
			if(event.type == "click" || event.keyCode == 32 || (!has("opera") && event.keyCode == 13) || event.keyCode === 0){
				var row = grid.row(event);
				grid._selectionTriggerEvent = event;
				
				if(row){
					if(grid.allowSelect(row)){
						var lastRow = grid._lastSelected && grid.row(grid._lastSelected);
						
						if(type == "radio"){
							if(!lastRow || lastRow.id != row.id){
								grid.clearSelection();
								grid.select(row, null, true);
								grid._lastSelected = row.element;
							}
						}else{
							if(row){
								if(event.shiftKey){
									// make sure the last input always ends up checked for shift key
									changeInput(true)({rows: [row]});
								}else{
									// no shift key, so no range selection
									lastRow = null;
								}
								lastRow = event.shiftKey ? lastRow : null;
								grid.select(lastRow || row, row, lastRow ? undefined : null);
								grid._lastSelected = row.element;
							}
						}
					}
				}else{
					// No row resolved; must be the select-all checkbox.
					put(this, (grid.allSelected ? "!" : ".") + "dgrid-select-all");
					grid[grid.allSelected ? "clearSelection" : "selectAll"]();
				}
				grid._selectionTriggerEvent = null;
			}
		}
		
		function setupSelectionEvents(){
			// register one listener at the top level that receives events delegated
			grid._hasSelectorInputListener = true;
			listeners.push(grid.on(".dgrid-selector:click,.dgrid-selector:keydown", onSelect));
			var handleSelect = grid._handleSelect;
			grid._handleSelect = function(event){
				// ignore the default select handler for events that originate from the selector column
				if(this.cell(event).column != column){
					handleSelect.apply(this, arguments);
				}
			};
			
			// Set up disabled and grid.allowSelect to match each other's behaviors
			if(typeof column.disabled == "function"){
				var originalAllowSelect = grid.allowSelect,
					originalDisabled = column.disabled;

				// Wrap allowSelect to consult both the original allowSelect and disabled
				grid.allowSelect = function(row){
					var allow = originalAllowSelect.call(this, row);

					if (originalDisabled === disabled) {
						return allow;
					} else {
						return allow && !originalDisabled.call(column, row.data);
					}
				};

				// Then wrap disabled to simply call the new allowSelect
				column.disabled = disabled;
			}else{
				// If no disabled function was specified, institute a default one
				// which honors allowSelect
				column.disabled = disabled;
			}
			// register listeners to the select and deselect events to change the input checked value
			listeners.push(grid.on("dgrid-select", changeInput(true)));
			listeners.push(grid.on("dgrid-deselect", changeInput(false)));
		}
		
		var renderInput = typeof type == "function" ? type : function(value, cell, object){
			var parent = cell.parentNode,
				disabled;
			
			if(!grid._hasSelectorInputListener){
				setupSelectionEvents();
			}
			
			// column.disabled gets initialized or wrapped in setupSelectionEvents
			disabled = column.disabled;

			// must set the class name on the outer cell in IE for keystrokes to be intercepted
			put(parent && parent.contents ? parent : cell, ".dgrid-selector");
			var input = cell.input || (cell.input = put(cell, "input[type="+type + "]", {
				tabIndex: isNaN(column.tabIndex) ? -1 : column.tabIndex,
				disabled: disabled && (typeof disabled == "function" ?
					disabled.call(column, object) : disabled),
				checked: value
			}));
			input.setAttribute("aria-checked", !!value);
			
			return input;
		};
		
		aspect.after(column, "init", function(){
			grid = column.grid;
		});
		
		aspect.after(column, "destroy", function(){
			arrayUtil.forEach(listeners, function(l){ l.remove(); });
			grid._hasSelectorInputListener = false;
		});
		
		column.renderCell = function(object, value, cell, options, header){
			var row = object && grid.row(object);
			value = row && grid.selection[row.id];
			renderInput(value, cell, object);
		};
		column.renderHeaderCell = function(th){
			var label = "label" in column ? column.label :
				column.field || "";
			
			if(type == "radio" || !grid.allowSelectAll){
				th.appendChild(document.createTextNode(label));
				if(!grid._hasSelectorInputListener){
					setupSelectionEvents();
				}
			}else{
				renderInput(false, th, {});
			}
			headerCheckbox = th.lastChild;
		};
		
		return column;
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

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

/***/ "./lib/src/Timings.js":
/*!****************************!*\
  !*** ./lib/src/Timings.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/eclwatch */ "./node_modules/@hpcc-js/eclwatch/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"), __webpack_require__(/*! d3-array */ "./node_modules/d3-array/dist/d3-array.min.js"), __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/build/d3-scale.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, comms_1, hpccCommon, eclwatch_1, layout_1, chart_1, d3_array_1, d3_scale_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var d3Select = hpccCommon.select;
    var TimingColumn = /** @class */ (function (_super) {
        tslib_1.__extends(TimingColumn, _super);
        function TimingColumn() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._columnsMetric = {};
            return _this;
        }
        TimingColumn.prototype.layerEnter = function (host, element, duration) {
            var _this = this;
            _super.prototype.layerEnter.call(this, host, element, duration);
            this.tooltipHTML(function (d) {
                var lparam = d.origRow[d.origRow.length - 1];
                var metric = _this._columnsMetric[d.column];
                var prop = lparam["__" + metric.Name];
                var formattedValue = prop.Formatted;
                var rawValue = prop.RawValue;
                return d.column + ":  " + (formattedValue !== rawValue ? formattedValue + " (" + rawValue + " " + prop.Measure + ")" : "" + formattedValue);
            });
        };
        return TimingColumn;
    }(chart_1.Column));
    var Timings = /** @class */ (function () {
        function Timings(wuid, timelineTarget, chartTarget, metricsSelectTarget) {
            var _this = this;
            this.timeline = new eclwatch_1.WUTimeline()
                .maxZoom(Number.MAX_SAFE_INTEGER)
                .overlapTolerence(1)
                .baseUrl("")
                .request({
                ScopeFilter: {
                    MaxDepth: 3,
                    ScopeTypes: []
                },
                NestedFilter: {
                    Depth: 0,
                    ScopeTypes: []
                },
                PropertiesToReturn: {
                    AllProperties: false,
                    AllStatistics: true,
                    AllHints: false,
                    Properties: ["WhenStarted", "TimeElapsed"]
                },
                ScopeOptions: {
                    IncludeId: true,
                    IncludeScope: true,
                    IncludeScopeType: true
                },
                PropertyOptions: {
                    IncludeName: true,
                    IncludeRawValue: true,
                    IncludeFormatted: true,
                    IncludeMeasure: true,
                    IncludeCreator: true,
                    IncludeCreatorType: false
                }
            })
                .on("click", function (row, col, sel) {
                _this.refresh();
            });
            this.chart = new TimingColumn()
                .yAxisDomainLow(0);
            this.chartPanel = new layout_1.ChartPanel()
                .dataButtonVisible(false)
                .downloadButtonVisible(false)
                .legendButtonVisible(false)
                .legendVisible(true)
                .titleOverlay(true)
                .widget(this.chart);
            this._rawColumns = {};
            this._scopeFilter = "";
            this._metricSelectLabel = "";
            this._metricSelectValues = ["TimeElapsed"];
            this._graphLookup = {};
            this._subgraphLookup = {};
            this.wu = comms_1.Workunit.attach({ baseUrl: "" }, wuid);
            this.timeline
                .target(timelineTarget)
                .wuid(wuid);
            delete this.timeline.__prop_tickFormat;
            this.chartPanel
                .target(chartTarget);
            this.metricsSelect = d3Select("#" + metricsSelectTarget);
        }
        Timings.prototype.selectedMetricValues = function () {
            this._metricSelectValues = this.metricsSelect.selectAll("option").nodes()
                .filter(function (n) { return n.selected === true; })
                .map(function (n) { return n.value; });
            return this._metricSelectValues;
        };
        Timings.prototype.init = function (wuid) {
        };
        Timings.prototype.walkScopeName = function (id, visitor) {
            var parts = id.split(":");
            while (parts.length > 1) {
                parts.pop();
                if (visitor(parts.join(":"))) {
                    break;
                }
            }
        };
        Timings.prototype.graphID = function (id) {
            var _this = this;
            var retVal;
            this.walkScopeName(id, function (partialID) {
                retVal = _this._graphLookup[partialID];
                if (retVal)
                    return true;
            });
            return retVal;
        };
        Timings.prototype.subgraphID = function (id) {
            var _this = this;
            var retVal;
            this.walkScopeName(id, function (partialID) {
                retVal = _this._subgraphLookup[partialID];
                if (retVal)
                    return true;
            });
            return retVal;
        };
        Timings.prototype.refresh = function (force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (force) {
                this.timeline
                    .clear()
                    .on("click", function (row, col, sel) {
                    _this._scopeFilter = sel ? row.__lparam.ScopeName : undefined;
                    _this.click(row, col, sel);
                })
                    .render();
            }
            if (force || !this.fetchDetailsNormalizedPromise) {
                this.fetchDetailsNormalizedPromise = Promise.all([this.wu.fetchDetailsMeta(), this.wu.fetchDetailsRaw({
                        ScopeFilter: {
                            MaxDepth: 999999,
                            ScopeTypes: []
                        },
                        NestedFilter: {
                            Depth: 0,
                            ScopeTypes: []
                        },
                        PropertiesToReturn: {
                            AllProperties: false,
                            AllStatistics: true,
                            AllHints: false,
                            Properties: []
                        },
                        ScopeOptions: {
                            IncludeId: true,
                            IncludeScope: true,
                            IncludeScopeType: true
                        },
                        PropertyOptions: {
                            IncludeName: true,
                            IncludeRawValue: true,
                            IncludeFormatted: true,
                            IncludeMeasure: true,
                            IncludeCreator: false,
                            IncludeCreatorType: false
                        }
                    })]).then(function (promises) {
                    var meta = promises[0];
                    var scopes = promises[1];
                    var columns = {
                        id: {
                            Measure: "label"
                        },
                        name: {
                            Measure: "label"
                        },
                        type: {
                            Measure: "label"
                        }
                    };
                    var data = [];
                    for (var _i = 0, scopes_1 = scopes; _i < scopes_1.length; _i++) {
                        var scope = scopes_1[_i];
                        var props = {};
                        if (scope && scope.Id && scope.Properties && scope.Properties.Property) {
                            for (var key in scope.Properties.Property) {
                                var scopeProperty = scope.Properties.Property[key];
                                columns[scopeProperty.Name] = tslib_1.__assign({}, scopeProperty);
                                delete columns[scopeProperty.Name].RawValue;
                                delete columns[scopeProperty.Name].Formatted;
                                switch (scopeProperty.Measure) {
                                    case "bool":
                                        props[scopeProperty.Name] = !!+scopeProperty.RawValue;
                                        break;
                                    case "sz":
                                        props[scopeProperty.Name] = +scopeProperty.RawValue;
                                        break;
                                    case "ns":
                                        props[scopeProperty.Name] = +scopeProperty.RawValue;
                                        break;
                                    case "ts":
                                        props[scopeProperty.Name] = new Date(+scopeProperty.RawValue / 1000).toISOString();
                                        break;
                                    case "cnt":
                                        props[scopeProperty.Name] = +scopeProperty.RawValue;
                                        break;
                                    case "cpu":
                                    case "skw":
                                    case "node":
                                    case "ppm":
                                    case "ip":
                                    case "cy":
                                    case "en":
                                    case "txt":
                                    case "id":
                                    case "fname":
                                    default:
                                        props[scopeProperty.Name] = scopeProperty.RawValue;
                                }
                                props["__" + scopeProperty.Name] = scopeProperty;
                            }
                            data.push(tslib_1.__assign({ id: scope.Id, name: scope.ScopeName, type: scope.ScopeType }, props));
                        }
                    }
                    return {
                        meta: meta,
                        columns: columns,
                        data: data
                    };
                });
            }
            return this.fetchDetailsNormalizedPromise.then(function (response) {
                _this._rawColumns = response.columns;
                _this._graphLookup = {};
                _this._subgraphLookup = {};
                var rawData = response.data.filter(function (row) {
                    if (row.type === "graph")
                        _this._graphLookup[row.name] = row.id;
                    if (row.type === "subgraph")
                        _this._subgraphLookup[row.name] = row.id;
                    if (!row.id)
                        return false;
                    if (_this._scopeFilter && row.name !== _this._scopeFilter && row.name.indexOf(_this._scopeFilter + ":") !== 0)
                        return false;
                    if (_this._metricSelectValues.every(function (m) { return row[m] === undefined; }))
                        return false;
                    return true;
                }).sort(function (l, r) {
                    if (l.WhenStarted === undefined && r.WhenStarted !== undefined || l.WhenStarted < r.WhenStarted)
                        return -1;
                    if (l.WhenStarted !== undefined && r.WhenStarted === undefined || l.WhenStarted > r.WhenStarted)
                        return 1;
                    if (l.id < r.id)
                        return -1;
                    if (l.id > r.id)
                        return 1;
                    return 0;
                });
                var measure = "";
                var colArr = [];
                for (var key in response.columns) {
                    if (response.columns[key].Measure && response.columns[key].Measure !== "label") {
                        colArr.push(key);
                    }
                }
                colArr.sort(d3_array_1.ascending);
                _this._metricSelectLabel = _this._metricSelectValues + (measure ? " (" + measure + ")" : "");
                var options = _this.metricsSelect.selectAll("option").data(colArr, function (d) { return d; });
                options.enter().append("option")
                    .merge(options)
                    .property("value", function (d) { return d; })
                    .property("selected", function (d) { return _this._metricSelectValues.indexOf(d) >= 0; })
                    .text(function (d) { return d; });
                options.exit().remove();
                var filteredData = rawData.filter(function (row, i) { return row.name !== _this._scopeFilter; });
                if (_this.needsNormalize()) {
                    _this.chart.yAxisTickFormat(".0%");
                    filteredData = _this.normalize(filteredData);
                }
                else {
                    _this.chart.yAxisTickFormat(".02s");
                }
                _this.chart._columnsMetric = {};
                var columns = ["id"].concat(_this._metricSelectValues.map(function (mv) {
                    var retVal = mv + "(" + _this._rawColumns[mv].Measure + ")";
                    _this.chart._columnsMetric[retVal] = _this._rawColumns[mv];
                    return retVal;
                }));
                _this.chartPanel
                    .columns(columns)
                    .data(filteredData.map(function (row, i) {
                    return [row.id].concat(_this._metricSelectValues.map(function (metric) { return row[metric]; }), [row]);
                }))
                    .lazyRender();
                return [_this._metricSelectValues, rawData];
            });
        };
        Timings.prototype.needsNormalize = function () {
            var _this = this;
            var measures = {};
            this._metricSelectValues.forEach(function (metricLabel) {
                var metric = _this._rawColumns[metricLabel];
                measures[metric.Measure] = true;
            });
            return Object.keys(measures).length > 1;
        };
        Timings.prototype.normalize = function (data) {
            var normalizedData = data.map(function (row) {
                return tslib_1.__assign({}, row);
            });
            this._metricSelectValues.forEach(function (metric) {
                var max = d3_array_1.max(data.map(function (row) { return row[metric]; }));
                var scale = d3_scale_1.scaleLinear().domain([0, max]).range([0, 1]);
                normalizedData.forEach(function (row) {
                    row[metric] = scale(row[metric]);
                });
            });
            return normalizedData;
        };
        Timings.prototype.resizeTimeline = function () {
            this.timeline
                .resize()
                .lazyRender();
        };
        Timings.prototype.resizeChart = function () {
            this.chartPanel
                .resize()
                .lazyRender();
        };
        //  Events ---
        Timings.prototype.click = function (row, col, sel) {
        };
        return Timings;
    }());
    exports.Timings = Timings;
    var WUTimelineEx = /** @class */ (function (_super) {
        tslib_1.__extends(WUTimelineEx, _super);
        function WUTimelineEx() {
            return _super.call(this) || this;
        }
        WUTimelineEx.prototype.data = function (_) {
            var retVal = _super.prototype.data.apply(this, arguments);
            if (arguments.length) {
                var timeData_1 = {};
                _.map(function (row) {
                    timeData_1[row[0]] = {
                        started: row[1],
                        finished: row[2]
                    };
                });
                this.setData(timeData_1);
            }
            return retVal;
        };
        WUTimelineEx.prototype.refresh = function () {
            this.clear();
            this.fetchScopes();
        };
        //  Events  ---
        WUTimelineEx.prototype.setData = function (timeData) {
        };
        return WUTimelineEx;
    }(eclwatch_1.WUTimeline));
    exports.WUTimelineEx = WUTimelineEx;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=Timings.js.map

/***/ })

}]);