(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DynamicESDLMethodWidget":"./eclwatch/DynamicESDLMethodWidget.js",
	"src/WsESDLConfig":"./lib/src/WsESDLConfig.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[92],{

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

/***/ "./eclwatch/DynamicESDLMethodWidget.js":
/*!*********************************************!*\
  !*** ./eclwatch/DynamicESDLMethodWidget.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, domConstruct, domClass, topic,
    registry, Button, ToolbarSeparator,
    GridDetailsWidget, ESPQuery, ESPUtil, WsESDLConfig,
    selector, editor, tree
) {
        return declare("DynamicESDLMethodWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_Methods,
            idProperty: "__hpcc_id",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.refresh(params);
            },

            refresh: function (params) {
                this._params = params.Binding;
                this.refreshGrid();
                this._refreshActionState();
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            createGrid: function (domID) {
                var context = this;
                this.openButton = registry.byId(this.id + "Open");
                dojo.destroy(this.id + "Open");

                this.store.mayHaveChildren = function (item) {
                    if (!item.__hpcc_parentName) {
                        return true;
                    }
                    return false;
                };

                this.store.getChildren = function (parent, options) {
                    return this.query({ __hpcc_parentName: parent.__hpcc_id }, options);
                };

                this.store.appendChild = function (child) {
                    this.__hpcc_parentName.push(child);
                };

                this.saveButton = new Button({
                    onClick: function (evt) {
                        context.saveMethod();
                    },
                    label: context.i18n.Save
                }).placeAt(this.openButton, "after");

                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    sort: [{ attribute: "Name", descending: false }],
                    columns: {
                        Name: tree({
                            label: context.i18n.Methods,
                            width: 500
                        }),
                        Value: editor({
                            label: this.i18n.MethodConfiguration,
                            autoSave: true,
                            canEdit: function (object, value) {
                                if (object.Attributes || !object.__hpcc_parentName) {
                                    return false;
                                }
                                return true;
                            },
                            editor: 'textarea',
                            editorArgs: {
                                rows: 10
                            }
                        })
                    }
                }, domID);
                return retVal;
            },

            saveMethod: function () {
                var context = this;
                var userXML = "";
                var results = this.store.query();

                arrayUtil.forEach(results, function (row, idx) {
                    if (row.__hpcc_parentName !== null && row.Value !== "") {
                        userXML += row.Value;
                    }
                });

                var xmlBuilder = "<Methods>" + userXML + "</Methods>";
                WsESDLConfig.PublishESDLBinding({
                    request: {
                        EspProcName: this.params.Binding.ESPProcessName,
                        EspBindingName: this.params.Binding.Name,
                        EspPort: this.params.Binding.Port,
                        EsdlDefinitionID: this.params.Definition,
                        Overwrite: true,
                        Config: xmlBuilder
                    }
                }).then(function (response) {
                    if (lang.exists("PublishESDLBindingResponse.status", response)) {
                        if (response.PublishESDLBindingResponse.status.Code === 0) {
                            dojo.publish("hpcc/brToaster", {
                                Severity: "Message",
                                Source: "WsESDLConfig.PublishESDLBinding",
                                Exceptions: [{ Source: context.i18n.SuccessfullySaved, Message: response.PublishESDLBindingResponse.status.Description }]
                            });
                        } else {
                            dojo.publish("hpcc/brToaster", {
                                Severity: "Error",
                                Source: "WsESDLConfig.PublishESDLBinding",
                                Exceptions: [{
                                    Source: context.i18n.Error,
                                    Message: response.PublishESDLBindingResponse.status.Description
                                }]
                            });
                        }
                        context.refreshGrid();
                    }
                });
            },

            refreshGrid: function () {
                var context = this;
                var results = [];
                var newRows = [];

                WsESDLConfig.GetESDLBinding({
                    request: {
                        EsdlBindingId: this._params.Name,
                        IncludeInterfaceDefinition: true,
                        ReportMethodsAvailable: true
                    }
                }).then(function (response) {
                    if (lang.exists("GetESDLBindingResponse.ESDLBinding.Configuration.Methods.Method", response)) {
                        results = response.GetESDLBindingResponse.ESDLBinding.Configuration.Methods.Method;
                    }

                    arrayUtil.forEach(results, function (row, idx) {
                        lang.mixin(row, {
                            __hpcc_parentName: null,
                            __hpcc_id: row.Name
                        });
                        if (row.XML) {
                            newRows.push({
                                __hpcc_parentName: row.Name,
                                __hpcc_id: row.Name + idx,
                                Value: row.XML
                            });
                        } else {
                            newRows.push({
                                __hpcc_parentName: row.Name,
                                __hpcc_id: row.Name + idx,
                                Value: "<Method name=\"" + row.Name + "\"/>"
                            });
                        }
                    });

                    arrayUtil.forEach(newRows, function (newRow) {
                        results.push(newRow);
                    });

                    context.store.setData(results);
                    context.grid.set("query", { __hpcc_parentName: null });
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./lib/src/WsESDLConfig.js":
/*!*********************************!*\
  !*** ./lib/src/WsESDLConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function ListDESDLEspBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListDESDLEspBindings", params);
    }
    exports.ListDESDLEspBindings = ListDESDLEspBindings;
    function DeleteESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLBinding", params);
    }
    exports.DeleteESDLBinding = DeleteESDLBinding;
    function GetESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLBinding", params);
    }
    exports.GetESDLBinding = GetESDLBinding;
    function ConfigureESDLBindingMethod(params) {
        return ESPRequest.send("WsESDLConfig", "ConfigureESDLBindingMethod", params);
    }
    exports.ConfigureESDLBindingMethod = ConfigureESDLBindingMethod;
    function ListESDLDefinitions(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLDefinitions", params);
    }
    exports.ListESDLDefinitions = ListESDLDefinitions;
    function GetESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLDefinition", params);
    }
    exports.GetESDLDefinition = GetESDLDefinition;
    function DeleteESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLDefinition", params);
    }
    exports.DeleteESDLDefinition = DeleteESDLDefinition;
    function PublishESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "PublishESDLBinding", params);
    }
    exports.PublishESDLBinding = PublishESDLBinding;
    //post 1.3 services
    function ListESDLBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLBindings", params);
    }
    exports.ListESDLBindings = ListESDLBindings;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsESDLConfig.js.map

/***/ })

}]);