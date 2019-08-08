(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DynamicESDLDefinitionQueryWidget":"./eclwatch/DynamicESDLDefinitionQueryWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

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

/***/ "./eclwatch/DynamicESDLDefinitionQueryWidget.js":
/*!******************************************************!*\
  !*** ./eclwatch/DynamicESDLDefinitionQueryWidget.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/DynamicESDLDefinitionDetailsWidget */ "./eclwatch/DynamicESDLDefinitionDetailsWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom,
    registry, Menu, MenuItem, MenuSeparator, PopupMenuItem, Dialog, Checkbox, ToolbarSeparator, Button, TextBox,
    selector,
    GridDetailsWidget, TargetSelectWidget, WsESDLConfig, ESPUtil, DynamicESDLDefinitionDetailsWidget, Utility) {
    return declare("DynamicESDLWidget", [GridDetailsWidget], {
        i18n: nlsHPCC,

        gridTitle: nlsHPCC.title_DefinitionExplorer,
        idProperty: "Name",

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;

            if (params.Id) {
                this.grid.select(params.Id);
                this.definitionWidget.init({
                    Id: params.Id
                });
            }

            this._refreshActionState();
            this.refreshGrid();
            this.addContextMenuItems();
        },

        addContextMenuItems: function () {
            var context = this;
            this.appendContextMenuItem(this.i18n.Delete, function () { context._onDelete()});
            this.contextMenu.addChild(new MenuSeparator());
            this.appendContextMenuItem(this.i18n.Bind, function () { context._onBind()});
        },

        _onBind: function () {
            var context = this;
            var selection = this.grid.getSelected();

            this.dialog = new Dialog({
                title: this.i18n.AddBinding,
                style: "width: 480px;"
            });

            this.dialogButton = new Button({
                style: "float:right; padding: 0 10px 10px 20px;",
                innerHTML: context.i18n.Apply,
                onClick: function () {
                    context._saveBinding();
                }
            }).placeAt(this.dialog.domNode, "last");

            if (this.esdlEspDropDown) {
                this.esdlEspDropDown.destroyRecursive();
            }

            this.esdlEspProcessesDropDown = new TargetSelectWidget({
                style: "float:left; width:100%;"
            });

            this.esdlEspProcessesDropDown.init({
                LoadESDLESPProcesses: true
            });

            var dialogDynamicForm = {
                ESProcess: {
                    label: this.i18n.ESPProcessName,
                    widget: this.esdlEspProcessesDropDown,
                },
                Port: {
                    label: this.i18n.Port,
                    widget: new TextBox({
                        placeholder: this.i18n.Port,
                        id: "PortNB",
                        type: "text",
                        required: true,
                        style: "width:100%;",
                        maxLength: 5
                    })
                },
                DefinitionID: {
                    label: this.i18n.DefinitionID,
                    widget: new TextBox({
                        id: "DefId",
                        type: "text",
                        style: "width:100%;",
                        readOnly: true,
                        value: selection[0].Name
                    })
                },
                ServiceName: {
                    label: this.i18n.ServiceName,
                    widget: new TextBox({
                        placeholder: this.i18n.ServiceName,
                        id: "ServiceNameTB",
                        required: true,
                        style: "width:100%;"
                    })
                }
            };

            var table = Utility.DynamicDialogForm(dialogDynamicForm);

            this.dialog.set("content", table);
            this.dialog.show();
            this.dialog.on("cancel", function () {
                context.dialog.destroyRecursive();
            });
            this.dialog.on("hide", function () {
                context.dialog.destroyRecursive();
            });
        },

        postCreate: function (args) {
            var context = this;
            this.inherited(arguments);
            this.definitionWidget = new DynamicESDLDefinitionDetailsWidget({
                id: this.id + "_DefinitionDetails",
                region: "right",
                splitter: true,
                style: "width: 60%",
                minSize: 240
            });
            this.definitionWidget.placeAt(this.gridTab, "last");
            this.refreshGrid();
        },

        createGrid: function (domID) {
            var context = this;
            this.openButton = registry.byId(this.id + "Open");
            this.deleteDefinitionButton = new Button({
                id: this.id + "DeleteDefinition",
                label: this.i18n.Delete,
                onClick: function (event) {
                    context._onDelete(event);
                }
            }).placeAt(this.openButton.domNode, "after");
            dojo.destroy(this.id + "Open");
            this.addBindingButton = new Button({
                id: this.id + "AddBinding",
                label: this.i18n.AddBinding,
                onClick: function (event) {
                    context._onBind(event);
                }
            }).placeAt(this.deleteDefinitionButton.domNode, "after");
            var tmpSplitter = new ToolbarSeparator().placeAt(this.addBindingButton.domNode, "before");

            var retVal = new declare([ESPUtil.Grid(false, true)])({
                store: this.store,
                selectionMode: "single",
                columns: {
                    col1: selector({
                        width: 27,
                        selectorType: 'radio',
                        unhidable: true,
                        label: ""
                    }),
                    Name: {
                        label: this.i18n.Name,
                        sortable: true,
                        width: 200,
                        unhidable: true
                    },
                    PublishBy: {
                        label: this.i18n.PublishedBy,
                        sortable: false,
                        width: 200
                    },
                    CreatedTime: {
                        label: this.i18n.CreatedTime,
                        sortable: false,
                        width: 200
                    },
                    LastEditBy: {
                        label: this.i18n.LastEditedBy,
                        sortable: false,
                        width: 200,
                        hidden: true
                    },
                    LastEditTime: {
                        label: this.i18n.LastEditTime,
                        sortable: false,
                        width: 200,
                        hidden: true
                    }
                }
            }, domID);

            retVal.on("dgrid-select", function (evt) {
                var selection = context.grid.getSelected();
                if (selection) {
                    context.definitionWidget.init({
                        Id: selection[0].Name
                    });
                }
            });
            return retVal;
        },

        _onRefresh: function () {
            this.refreshGrid();
        },

        _onDelete: function () {
            var selections = this.grid.getSelected();
            var name = selections[0].Name.split(".");
            var list = this.arrayToList(selections, "Name");
            if (confirm(this.i18n.DeleteSelectedDefinitions + "\n" + list)) {
                var context = this;
                WsESDLConfig.DeleteESDLDefinition({
                    request:{
                        Id: selections[0].Name,
                        Name: name[0],
                        Version: name[1]
                    }
                }).then(function(response){
                    if (lang.exists("DeleteESDLRegistryEntryResponse.status", response)) {
                        dojo.publish("hpcc/brToaster", {
                            Severity: "Message",
                            Source: "WsESDLConfig/DeleteESDLDefinition",
                            Exceptions: [{
                                Source: context.i18n.DefinitionDeleted,
                                Message: response.DeleteESDLRegistryEntryResponse.status.Description,
                                duration: 1
                            }]
                        });
                    }
                    context.refreshGrid();
                })
            }
        },

        _saveBinding: function (selection) {
            var context = this;

            WsESDLConfig.PublishESDLBinding({
                request: {
                    EspProcName: this.esdlEspProcessesDropDown.get("value"),
                    EspPort: dom.byId("PortNB").value,
                    EsdlDefinitionID: dom.byId("DefId").value,
                    EsdlServiceName: dom.byId("ServiceNameTB").value,
                    Overwrite: true
                }                
             }).then(function(response){
                if (lang.exists("PublishESDLBindingResponse.status", response)) {
                    if (response.PublishESDLBindingResponse.status.Code === 0) {
                        dojo.publish("hpcc/brToaster", {
                            Severity: "Message",
                            Source: "WsESDLConfig.PublishESDLBinding",
                            Exceptions: [{
                                Source: context.i18n.SuccessfullySaved,
                                Message: response.PublishESDLBindingResponse.status.Description,
                                duration: 1
                            }]
                        });
                    } else {
                        dojo.publish("hpcc/brToaster", {
                            Severity: "Error",
                            Source: "WsESDLConfig.PublishESDLBinding",
                            Exceptions: [{
                                Source: context.i18n.Error,
                                Message: response.PublishESDLBindingResponse.status.Description,
                                duration: 1
                            }]
                        });
                    }
                }
                context.dialog.hide();
             });
        },

        refreshGrid: function (args) {
            var context = this;
            WsESDLConfig.ListESDLDefinitions({
                request: {}
            }).then(function (response) {
                var results = [];
                if (lang.exists("ListESDLDefinitionsResponse.Definitions.Definition", response)) {
                    arrayUtil.forEach(response.ListESDLDefinitionsResponse.Definitions.Definition, function (item, idx) {
                        var Def = {
                            Id: idx,
                            Name: item.Id,
                            PublishBy: item.History.PublishBy,
                            CreatedTime: item.History.CreatedTime,
                            LastEditBy: item.History.LastEditBy,
                            LastEditTime: item.History.LastEditTime
                        }
                        results.push(Def);
                    });
                    Utility.alphanumSort(results, "Name");
                }
                context.store.setData(results);
                context.grid.refresh();
                if (context.params.firstLoad && results.length) {
                    var firstRowSelection = context.store.query({
                        Id: results[0].Id
                    });
                    if (firstRowSelection.length) {
                        context.grid.select({
                            Name: firstRowSelection[0].Name
                        });
                    }
                }
            });
        }
    });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/TargetSelectWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/TargetSelectWidget.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! hpcc/TargetSelectClass */ "./eclwatch/TargetSelectClass.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    Select,
    TargetSelectClass) {

        return declare("TargetSelectWidget", [Select], TargetSelectClass);
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);