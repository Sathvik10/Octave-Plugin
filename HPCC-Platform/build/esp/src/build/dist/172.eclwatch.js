(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/XrefFoundFilesWidget":"./eclwatch/XrefFoundFilesWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[172],{

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

/***/ "./eclwatch/XrefFoundFilesWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/XrefFoundFilesWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDFUXref */ "./lib/src/WsDFUXref.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domConstruct, domClass,
    registry, ToggleButton, ToolbarSeparator, Button,
    selector,
    GridDetailsWidget, WsDFUXref, DelayLoadWidget, ESPUtil) {
        return declare("XrefFoundFilesWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.title_FoundFilesFor,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this._refreshActionState();
                this.refreshGrid();

                this.gridTab.set("title", this.i18n.title_FoundFilesFor + ":" + this.params.Name);
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;
                this.openButton = registry.byId(this.id + "Open");
                this._delete = new Button({
                    id: this.id + "Delete",
                    disabled: false,
                    onClick: function (val) {
                        context._onDeleteFiles();
                    },
                    label: this.i18n.Delete
                }).placeAt(this.openButton.domNode, "after");
                this._attach = new Button({
                    id: this.id + "Attach",
                    disabled: false,
                    onClick: function (val) {
                        context._onAttachFiles();
                    },
                    label: this.i18n.Attach
                }).placeAt(this.openButton.domNode, "after");
                dojo.destroy(this.id + "Open");

                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox',
                            label: ""
                        }),
                        Name: { label: this.i18n.Name, width: 100, sortable: false },
                        Modified: { label: this.i18n.Modified, width: 30, sortable: true },
                        Parts: { label: this.i18n.Parts, width: 30, sortable: true },
                        Size: { label: this.i18n.Size, width: 30, sortable: true }
                    }
                }, domID);

                return retVal;
            },

            refreshActionState: function (event) {
                var selection = this.grid.getSelected();
                var hasSelection = selection.length;

                registry.byId(this.id + "Delete").set("disabled", !hasSelection);
                registry.byId(this.id + "Attach").set("disabled", !hasSelection);
            },

            _onDeleteFiles: function (event) {
                var context = this;
                var selections = this.grid.getSelected();
                var list = this.arrayToList(selections, "Name");
                if (confirm(this.i18n.DeleteSelectedFiles + "\n" + list)) {
                    WsDFUXref.DFUXRefArrayAction(selections, this.i18n.Delete, context.params.Name, "Found").then(function (response) {
                        context.refreshGrid();
                    });
                }
            },

            _onAttachFiles: function (event) {
                var context = this;
                var selections = this.grid.getSelected();
                var list = this.arrayToList(selections, "Name");
                if (confirm(this.i18n.AddTheseFilesToDali + "\n" + list)) {
                    WsDFUXref.DFUXRefArrayAction(selections, "Attach", context.params.Name, "Found").then(function (response) {
                        context.refreshGrid();
                    });
                }
            },

            refreshGrid: function () {
                var context = this;
                WsDFUXref.DFUXRefFoundFiles(this.params.Name).then(function (response) {
                    context.store.setData(response);
                    context.grid.set("query", {});
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);