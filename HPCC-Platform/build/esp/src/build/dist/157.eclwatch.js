(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/TimingGridWidget":"./eclwatch/TimingGridWidget.js",
	"dojo/text!templates/TimingGridWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingGridWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[157],{

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

/***/ "./eclwatch/TimingGridWidget.js":
/*!**************************************!*\
  !*** ./eclwatch/TimingGridWidget.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),

    __webpack_require__(/*! dojo/text!../templates/TimingGridWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingGridWidget.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Memory, Observable,
        registry,
        selector,
        _Widget, ESPUtil, ESPWorkunit,
        template) {
        return declare("TimingGridWidget", [_Widget], {
            templateString: template,
            baseClass: "TimingGridWidget",
            i18n: nlsHPCC,

            timingGrid: null,
            dataStore: null,
            lastSelection: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
            },

            startup: function (args) {
                this.inherited(arguments);
                var store = new Memory({
                    idProperty: "id",
                    data: []
                });
                this.timingStore = Observable(store);

                this.timingGrid = new declare([ESPUtil.Grid(false, true)])({
                    columns: {
                        id: { label: "##", width: 45 },
                        Name: { label: this.i18n.Component },
                        Seconds: { label: this.i18n.TimeSeconds, width: 124 }
                    },
                    store: this.timingStore
                }, this.id + "TimingGrid");

                var context = this;
                this.timingGrid.on(".dgrid-row:click", function (evt) {
                    var item = context.timingGrid.row(evt).data;
                    context.onClick(item);
                });
                this.timingGrid.on(".dgrid-row:dblclick", function (evt) {
                    var item = context.timingGrid.row(evt).data;
                    context.onDblClick(item);
                });
                this.timingGrid.startup();
            },

            resize: function (args) {
                this.inherited(arguments);
                this.timingGrid.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            onClick: function (items) {
            },

            onDblClick: function (item) {
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.defaultQuery = "*";
                if (params.query) {
                    this.defaultQuery = params.query;
                }

                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    var monitorCount = 4;
                    var context = this;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.wu.getInfo({
                                onGetTimers: function (timers) {
                                    context.loadTimings(timers);
                                }
                            });
                        }
                    });
                }
            },

            setQuery: function (graphName) {
                if (!graphName || graphName === "*") {
                    this.timingGrid.refresh();
                } else {
                    this.timingGrid.set("query", {
                        GraphName: graphName,
                        HasSubGraphId: true
                    });
                }
            },

            getSelected: function () {
                return this.timingGrid.getSelected();
            },

            setSelectedAsGlobalID: function (selItems) {
                var selectedItems = [];
                arrayUtil.forEach(this.timingStore.data, function (item, idx) {
                    if (item.SubGraphId) {
                        if (item.SubGraphId && arrayUtil.indexOf(selItems, item.SubGraphId) >= 0) {
                            selectedItems.push(item);
                        }
                    }
                });
                this.setSelected(selectedItems);
            },

            setSelected: function (selItems) {
                this.timingGrid.setSelected(selItems);
            },

            loadTimings: function (timers) {
                arrayUtil.forEach(timers, function (item, idx) {
                    lang.mixin(item, {
                        id: idx
                    });
                });
                this.timingStore.setData(timers);
                this.setQuery(this.defaultQuery);
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingGridWidget.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/TimingGridWidget.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}TimingGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-type=\"dijit.layout.ContentPane\">\n        <div id=\"${id}TimingGrid\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);