(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/LZBrowseWidget":"./eclwatch/LZBrowseWidget.js",
	"hpcc/SelectionGridWidget":"./eclwatch/SelectionGridWidget.js",
	"hpcc/TargetComboBoxWidget":"./eclwatch/TargetComboBoxWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/WsTopology":"./lib/src/WsTopology.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/LZBrowseWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LZBrowseWidget.html",
	"dojo/text!templates/SelectionGridWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[126],{

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

/***/ "./eclwatch/FilterDropDownWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/FilterDropDownWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/FilterDropDownWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"),

    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm, on, domStyle,
    registry, Select, CheckBox,
    _Widget, Utility,
    template) {
        return declare("FilterDropDownWidget", [_Widget], {
            templateString: template,
            baseClass: "FilterDropDownWidget",
            i18n: nlsHPCC,

            _width: "100%",
            iconFilter: null,
            filterDropDown: null,
            filterForm: null,
            filterLabel: null,
            filterMessage: null,
            tableContainer: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filterDropDown = registry.byId(this.id + "FilterDropDown");
                this.filterForm = registry.byId(this.id + "FilterForm");
                this.filterLabel = registry.byId(this.id + "FilterLabel");
                this.tableContainer = registry.byId(this.id + "TableContainer");
                this.filterApply = registry.byId(this.id + "FilterApply");
                this.filterClear = registry.byId(this.id + "FilterClear");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.iconFilter = dom.byId(this.id + "IconFilter");
            },

            //  Hitched actions  ---
            _onFilterClear: function (event) {
                this.emit("clear");
                this.clear();
            },

            _onFilterApply: function (event) {
                this.filterDropDown.closeDropDown();
                this.emit("apply");
                this.refreshState();
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

            setFilterMessage: function (value) {
                dom.byId("FilterMessage").textContent = value;
                this.refreshState();
            },

            exists: function () {
                var filter = this.toObject();
                for (var key in filter) {
                    if (filter[key] !== "") {
                        return true;
                    }
                }
                return false;
            },

            toObject: function () {
                if (this.filterDropDown.get("disabled")) {
                    return {};
                }
                var retVal = {};
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var name = item.get("name");
                    if (name) {
                        var value = item.get("value");
                        if (value) {
                            retVal[name] = value;
                        }
                    }
                });
                return retVal;
            },

            fromObject: function (obj) {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var value = obj[item.get("name")];
                    if (value) {
                        item.set("value", value);
                        if (item.defaultValue !== undefined) {
                            item.defaultValue = value;
                        }
                    }
                });
                this.refreshState();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;
            },

            open: function (event) {
                this.filterDropDown.focus();
                this.filterDropDown.openDropDown();
            },

            close: function (event) {
                this.filterDropDown.closeDropDown();
            },

            disable: function (disable) {
                this.filterDropDown.set("disabled", disable);
            },

            reset: function (disable) {
                this.filterForm.reset();
            },

            refreshState: function () {
                if (this.exists()) {
                    this.iconFilter.src = Utility.getImageURL("filter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.params.ownLabel !== undefined && this.params.ownLabel !== null ? this.params.ownLabel : this.i18n.FilterSet;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "bold"
                    });
                } else {
                    this.iconFilter.src = Utility.getImageURL("noFilter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.i18n.Filter;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "normal"
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/LZBrowseWidget.js":
/*!************************************!*\
  !*** ./eclwatch/LZBrowseWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/request/iframe */ "./node_modules/dojo/request/iframe.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),

    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),
    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! src/ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/TargetComboBoxWidget */ "./eclwatch/TargetComboBoxWidget.js"),
    __webpack_require__(/*! hpcc/SelectionGridWidget */ "./eclwatch/SelectionGridWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/LZBrowseWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LZBrowseWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/RadioButton */ "./node_modules/dijit/form/RadioButton.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"),

    __webpack_require__(/*! dojox/form/Uploader */ "./node_modules/dojox/form/Uploader.js"),
    __webpack_require__(/*! dojox/form/uploader/FileList */ "./node_modules/dojox/form/uploader/FileList.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm, domClass, iframe, on, topic,
    registry, Dialog, Menu, MenuItem, MenuSeparator, PopupMenuItem, TextBox, ValidationTextBox,
    tree, editor, selector,
    _TabContainerWidget, FileSpray, ESPUtil, ESPRequest, ESPDFUWorkunit, DelayLoadWidget, TargetSelectWidget, TargetComboBoxWidget, SelectionGridWidget, FilterDropDownWidget, Utility,
    template) {
        return declare("LZBrowseWidget", [_TabContainerWidget, ESPUtil.FormHelper], {
            templateString: template,
            baseClass: "LZBrowseWidget",
            i18n: nlsHPCC,

            filter: null,
            dropZoneTarget2Select: null,
            serverFilterSelect: null,
            replicateEnabled: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.sprayFixedForm = registry.byId(this.id + "SprayFixedForm");
                this.sprayFixedDestinationSelect = registry.byId(this.id + "SprayFixedDestination");
                this.sprayFixedGrid = registry.byId(this.id + "SprayFixedGrid");
                this.sprayDelimitedForm = registry.byId(this.id + "SprayDelimitedForm");
                this.sprayDelimitedDestinationSelect = registry.byId(this.id + "SprayDelimitedDestination");
                this.sprayDelimitedGrid = registry.byId(this.id + "SprayDelimitedGrid");
                this.sprayXmlForm = registry.byId(this.id + "SprayXmlForm");
                this.sprayXmlDestinationSelect = registry.byId(this.id + "SprayXmlDestinationSelect");
                this.sprayXmlGrid = registry.byId(this.id + "SprayXmlGrid");
                this.sprayJsonForm = registry.byId(this.id + "SprayJsonForm");
                this.sprayJsonDestinationSelect = registry.byId(this.id + "SprayJsonDestinationSelect");
                this.sprayJsonGrid = registry.byId(this.id + "SprayJsonGrid");
                this.sprayVariableForm = registry.byId(this.id + "SprayVariableForm");
                this.sprayVariableDestinationSelect = registry.byId(this.id + "SprayVariableDestination");
                this.sprayVariableGrid = registry.byId(this.id + "SprayVariableGrid");
                this.sprayBlobForm = registry.byId(this.id + "SprayBlobForm");
                this.sprayBlobDestinationSelect = registry.byId(this.id + "SprayBlobDestination");
                this.sprayBlobGrid = registry.byId(this.id + "SprayBlobGrid");
                this.landingZonesTab = registry.byId(this.id + "_LandingZones");
                this.uploader = registry.byId(this.id + "Upload");
                this.uploadFileList = registry.byId(this.id + "UploadFileList");
                this.dropZoneTargetSelect = registry.byId(this.id + "DropZoneTargetSelect");
                this.dropZoneMachineSelect = registry.byId(this.id + "DropZoneMachineSelect");
                this.dropZoneFolderSelect = registry.byId(this.id + "DropZoneFolderSelect");
                this.dfuSprayFixedQueues = registry.byId(this.id + "SprayFixedDFUSprayQueues");
                this.dfuSprayDelimitedQueues = registry.byId(this.id + "SprayDelimitedDFUQueues");
                this.dfuSprayXMLQueues = registry.byId(this.id + "SprayXMLDFUQueues");
                this.dfuSprayJSONQueues = registry.byId(this.id + "SprayJSONDFUQueues");
                this.dfuSprayVariableQueues = registry.byId(this.id + "SprayVariableDFUQueues");
                this.dfuSprayBLOBQueues = registry.byId(this.id + "SprayBLOBDFUQueues");
                this.fileListDialog = registry.byId(this.id + "FileListDialog");
                this.overwriteCheckbox = registry.byId(this.id + "FileOverwriteCheckbox");
                this.fixedSprayReplicateCheckbox = registry.byId(this.id + "FixedSprayReplicate");
                this.delimitedSprayReplicateCheckbox = registry.byId(this.id + "DelimitedSprayReplicate");
                this.xmlSprayReplicateCheckbox = registry.byId(this.id + "XMLSprayReplicate");
                this.sprayXMLButton = registry.byId(this.id + "SprayFixedButton");
                this.sprayFixedButton = registry.byId(this.id + "SprayXMLButton");
                this.jsonSprayReplicate = registry.byId(this.id + "JSONSprayReplicate");
                this.variableSprayReplicateCheckbox = registry.byId(this.id + "VariableSprayReplicate");
                this.blobSprayReplicateCheckbox = registry.byId(this.id + "BlobSprayReplicate");
                this.filter = registry.byId(this.id + "Filter");
                this.dropZoneTarget2Select = registry.byId(this.id + "DropZoneName2");
                this.serverFilterSelect = registry.byId(this.id + "ServerFilter");

                var context = this;
                this.connect(this.uploader, "onComplete", function (response) {
                    if (lang.exists("Exceptions.Source", response)) {
                        topic.publish("hpcc/brToaster", {
                            Severity: "Error",
                            Source: "FileSpray.UploadFile",
                            Exceptions: response.Exceptions.Exception
                        });
                    }
                    context.fileListDialog.hide();
                    context.refreshGrid();
                });

                this.connect(this.uploader, "onError", function (response) {
                    if (response.type === 'error') {
                        topic.publish("hpcc/brToaster", {
                            Severity: "Error",
                            Source: "FileSpray.UploadFile",
                            Exceptions: [{ Message: this.i18n.ErrorUploadingFile }]
                        });
                        this.uploader.reset();
                    }
                });

                this.dropZoneTarget2Select.on("change", function (evt) {
                    if (evt) {
                        context.serverFilterSelect.loadDropZoneMachines(evt);
                    }
                });
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_LZBrowse;
            },

            _handleResponse: function (wuidQualifier, response) {
                if (lang.exists(wuidQualifier, response)) {
                    var wu = ESPDFUWorkunit.Get(lang.getObject(wuidQualifier, false, response));
                    wu.startMonitor(true);
                    var tab = this.ensurePane("dfu", wu.ID, wu.ID, {
                        Wuid: wu.ID
                    });
                    if (tab) {
                        this.selectChild(tab);
                    }
                }
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onUpload: function (event) {
                var context = this;
                var targetRow;
                if (!this.dropZoneTargetSelect.initalized) {
                    this.dropZoneFolderSelect.set("disabled", true);
                    this.dropZoneTargetSelect.init({
                        DropZones: true,
                        callback: function (value, row) {
                            if (context.dropZoneMachineSelect) {
                                context.dropZoneMachineSelect.defaultValue = context.dropZoneMachineSelect.get("value");
                                context.dropZoneMachineSelect.loadDropZoneMachines(value);
                                targetRow = row;
                            }
                        }
                    });
                }

                if (!this.dropZoneMachineSelect.initalized) {
                    var pathSepChar;
                    this.dropZoneMachineSelect.init({
                        DropZoneMachines: true,
                        callback: function (value, row) {
                            var path = targetRow.machine.Directory.indexOf("\\");
                            targetRow.machine.Name = value
                            targetRow.machine.Netaddress = value
                            if (!value) {
                                context.dropZoneFolderSelect.set("disabled", true);
                            } else {
                                context.dropZoneFolderSelect.set("disabled", false);
                                if (context.dropZoneFolderSelect) {
                                    context.dropZoneFolderSelect._dropZoneTarget = targetRow;
                                    if (path > -1) {
                                        context.dropZoneFolderSelect.defaultValue = "\\"
                                        pathSepChar = "\\"
                                    } else {
                                        context.dropZoneFolderSelect.defaultValue = "/"
                                        pathSepChar = "/"
                                    }
                                    context.dropZoneFolderSelect.loadDropZoneFolders(pathSepChar);
                                }
                            }
                        }
                    });
                }

                var fileList = registry.byId(this.id + "Upload").getFileList();
                var totalFileSize = 0;

                this.uploadFileList.hideProgress();
                this.fileListDialog.show();

                arrayUtil.forEach(fileList, function (file, idx) {
                    totalFileSize += file.size;
                });

                if (totalFileSize >= 2147483648) {
                    domClass.remove("BrowserSizeMessage", "hidden");
                } else {
                    domClass.add("BrowserSizeMessage", "hidden");
                }
            },

            _onUploadBegin: function (dataArray) {
                this.fileListDialog.hide();
                this.uploadString = this.i18n.FileUploadStillInProgress + ":";
                arrayUtil.forEach(dataArray, function (item, idx) {
                    this.uploadString += "\n" + item.name;
                }, this);
            },

            _onCheckUploadSubmit: function () {
                var context = this;
                var fileList = registry.byId(this.id + "Upload").getFileList();
                var list = this.arrayToList(fileList, "name");
                if (this.overwriteCheckbox.checked) {
                    this._onUploadSubmit();
                    this.fileListDialog.hide();
                } else {
                    var target = context.dropZoneTargetSelect.get("row");
                    FileSpray.FileList({
                        request: {
                            Netaddr: target.machine.Netaddress,
                            Path: context.getUploadPath()
                        }
                    }).then(function (response) {
                        var fileName = "";
                        if (lang.exists("FileListResponse.files.PhysicalFileStruct", response)) {
                            arrayUtil.forEach(response.FileListResponse.files.PhysicalFileStruct, function (item, index) {
                                arrayUtil.forEach(fileList, function (file, idx) {
                                    if (item.name === file.name) {
                                        fileName = file.name;
                                    }
                                });
                            });
                        }
                        if (fileName === "") {
                            context._onUploadSubmit();
                            context.fileListDialog.hide();
                        } else {
                            alert(context.i18n.OverwriteMessage + "\n" + list);
                        }
                    });
                }
            },

            _onUploadProgress: function (progress) {
                if (progress.decimal < 1) {
                    this.widget.Upload.set("label", this.i18n.Upload + " " + progress.percent);
                    var context = this;
                    window.onbeforeunload = function (e) {
                        return context.uploadString;
                    };
                } else {
                    this.widget.Upload.set("label", this.i18n.Upload);
                    window.onbeforeunload = null;
                }
            },

            getUploadPath: function () {
                return this.dropZoneFolderSelect.getDropZoneFolder();
            },

            _onUploadSubmit: function (event) {
                var target = this.dropZoneTargetSelect.get("row");
                this.uploader.set("uploadUrl", "/FileSpray/UploadFile.json?upload_&rawxml_=1&NetAddress=" + target.machine.Netaddress + "&OS=" + target.machine.OS + "&Path=" + this.getUploadPath());
                this.uploader.upload();
            },

            _onUploadCancel: function (event) {
                this.fileListDialog.hide();
                this.uploader.reset();
            },

            _onDownload: function (event) {
                var context = this;
                arrayUtil.forEach(this.landingZonesGrid.getSelected(), function (item, idx) {
                    var downloadIframeName = "downloadIframe_" + item.calculatedID;
                    var frame = iframe.create(downloadIframeName);
                    var url = ESPRequest.getBaseURL("FileSpray") + "/DownloadFile?Name=" + encodeURIComponent(item.name) + "&NetAddress=" + item.NetAddress + "&Path=" + encodeURIComponent(item.fullFolderPath) + "&OS=" + item.OS;
                    iframe.setSrc(frame, url, true);
                });
            },

            _onDelete: function (event) {
                var selection = this.landingZonesGrid.getSelected();
                var list = this.arrayToList(selection, "displayName");
                if (confirm(this.i18n.DeleteSelectedFiles + "\n" + list)) {
                    var context = this;
                    var doRefresh = false;
                    arrayUtil.forEach(selection, function (item, idx) {
                        if (item._isUserFile) {
                            context.landingZoneStore.removeUserFile(item);
                            doRefresh = true;
                        } else {
                            FileSpray.DeleteDropZoneFile({
                                request: {
                                    NetAddress: item.NetAddress,
                                    Path: item.fullFolderPath,
                                    OS: item.OS,
                                    Names: item.name
                                },
                                load: function (response) {
                                    context.refreshGrid(true);
                                }
                            });
                        }
                    });
                    if (doRefresh) {
                        this.refreshGrid(true);
                    }
                }
            },

            _onHexPreview: function (event) {
                var selections = this.landingZonesGrid.getSelected();
                var firstTab = null;
                var context = this;
                arrayUtil.forEach(selections, function (item, idx) {
                    var tab = context.ensurePane("hex", item.calculatedID, item.displayName, {
                        logicalFile: item.getLogicalFile()
                    });
                    if (firstTab === null) {
                        firstTab = tab;
                    }
                });
                if (firstTab) {
                    this.selectChild(firstTab);
                }
            },

            _spraySelectedOneAtATime: function (dropDownID, formID, doSpray) {
                if (registry.byId(this.id + formID).validate()) {
                    var selections = this.landingZonesGrid.getSelected();
                    var context = this;
                    arrayUtil.forEach(selections, function (item, idx) {
                        var request = domForm.toObject(context.id + formID);
                        lang.mixin(request, {
                            sourceIP: item.NetAddress,
                            sourcePath: item.fullPath,
                            destLogicalName: request.namePrefix + (request.namePrefix && !context.endsWith(request.namePrefix, "::") && item.targetName && !context.startsWith(item.targetName, "::") ? "::" : "") + item.targetName
                        });
                        doSpray(request, item);
                    });
                    registry.byId(this.id + dropDownID).closeDropDown();
                }
            },

            _spraySelected: function (dropDownID, formID, doSpray) {
                if (registry.byId(this.id + formID).validate()) {
                    var selections = this.landingZonesGrid.getSelected();
                    if (selections.length) {
                        var request = domForm.toObject(this.id + formID);
                        var item = selections[0];
                        lang.mixin(request, {
                            sourceIP: item.NetAddress,
                            nosplit: true
                        });
                        var sourcePath = "";
                        arrayUtil.forEach(selections, function (item, idx) {
                            if (sourcePath.length)
                                sourcePath += ",";
                            sourcePath += item.fullPath;
                        });
                        lang.mixin(request, {
                            sourcePath: sourcePath
                        });
                        doSpray(request, item);
                        registry.byId(this.id + dropDownID).closeDropDown();
                    }
                }
            },

            _onAddFile: function (event) {
                if (registry.byId(this.id + "AddFileForm").validate()) {
                    var tmpFile = domForm.toObject(this.id + "AddFileForm");
                    var dropZone = lang.mixin(this.landingZoneStore.get(tmpFile.NetAddress), {
                        NetAddress: tmpFile.NetAddress
                    });
                    var fullPathParts = tmpFile.fullPath.split("/");
                    if (fullPathParts.length === 1) {
                        fullPathParts = tmpFile.fullPath.split("\\");
                    }
                    var file = lang.mixin(this.landingZoneStore.get(tmpFile.NetAddress + tmpFile.fullPath), {
                        displayName: fullPathParts[fullPathParts.length - 1],
                        fullPath: tmpFile.fullPath,
                        isDir: false,
                        DropZone: dropZone
                    });
                    this.landingZoneStore.addUserFile(file);
                    this.refreshGrid();
                    registry.byId(this.id + "AddFileDropDown").closeDropDown();
                }
            },

            _onSprayFixed: function (event) {
                var context = this;
                this._spraySelectedOneAtATime("SprayFixedDropDown", "SprayFixedForm", function (request, item) {
                    lang.mixin(request, {
                        sourceRecordSize: item.targetRecordLength
                    });
                    FileSpray.SprayFixed({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayFixedResponse.wuid", response);
                    });
                });
            },

            _onSprayDelimited: function (event) {
                var context = this;
                this._spraySelectedOneAtATime("SprayDelimitedDropDown", "SprayDelimitedForm", function (request, item) {
                    FileSpray.SprayVariable({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayResponse.wuid", response);
                    });
                });
            },

            _onSprayXml: function (event) {
                var context = this;
                this._spraySelectedOneAtATime("SprayXmlDropDown", "SprayXmlForm", function (request, item) {
                    lang.mixin(request, {
                        sourceRowTag: item.targetRowTag
                    });
                    FileSpray.SprayVariable({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayResponse.wuid", response);
                    });
                });
            },

            _onSprayJson: function (event) {
                var context = this;
                this._spraySelectedOneAtATime("SprayJsonDropDown", "SprayJsonForm", function (request, item) {
                    lang.mixin(request, {
                        sourceRowPath: item.targetRowPath,
                        isJSON: true
                    });
                    FileSpray.SprayVariable({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayResponse.wuid", response);
                    });
                });
            },

            _onSprayVariable: function (event) {
                var context = this;
                this._spraySelectedOneAtATime("SprayVariableDropDown", "SprayVariableForm", function (request, item) {
                    FileSpray.SprayFixed({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayFixedResponse.wuid", response);
                    });
                });
            },

            _onSprayBlob: function (event) {
                var context = this;
                this._spraySelected("SprayBlobDropDown", "SprayBlobForm", function (request, item) {
                    FileSpray.SprayFixed({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("SprayFixedResponse.wuid", response);
                    });
                });
            },

            _onRowContextMenu: function (item, colField, mystring) {
            },

            //  Implementation  ---
            getFilter: function () {
                var retVal = this.filter.toObject();
                var dropZoneInfo = arrayUtil.filter(this.dropZoneTarget2Select.options, function (option) {
                    return option.selected === true;
                });
                var dropZoneMachineInfo = arrayUtil.filter(this.serverFilterSelect.options, function (option) {
                    return option.selected === true;
                });
                if (dropZoneInfo.length && dropZoneMachineInfo.length) {
                    retVal.__dropZone = dropZoneInfo[0];
                    retVal.__dropZoneMachine = dropZoneMachineInfo[0];
                }
                return retVal;
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                var context = this;

                this.initLandingZonesGrid();
                this.serverFilterSelect.init({
                    DropZoneMachines: true,
                    includeBlank: true
                });
                this.dropZoneTarget2Select.init({
                    DropZones: true,
                    includeBlank: true
                });
                this.filter.on("clear", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.landingZonesGrid.clearSelection();
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.sprayFixedDestinationSelect.init({
                    SprayTargets: true
                });
                this.dfuSprayFixedQueues.init({
                    DFUSprayQueues: true
                });
                this.dfuSprayDelimitedQueues.init({
                    DFUSprayQueues: true
                });
                this.dfuSprayXMLQueues.init({
                    DFUSprayQueues: true
                });
                this.dfuSprayJSONQueues.init({
                    DFUSprayQueues: true
                });
                this.dfuSprayVariableQueues.init({
                    DFUSprayQueues: true
                });
                this.dfuSprayBLOBQueues.init({
                    DFUSprayQueues: true
                });
                this.sprayDelimitedDestinationSelect.init({
                    SprayTargets: true
                });
                this.sprayXmlDestinationSelect.init({
                    SprayTargets: true
                });
                this.sprayJsonDestinationSelect.init({
                    SprayTargets: true
                });
                this.sprayVariableDestinationSelect.init({
                    SprayTargets: true
                });
                this.sprayBlobDestinationSelect.init({
                    SprayTargets: true
                });
                var context = this;
                this.dropZoneFolderSelect.init({
                    DropZoneFolders: true,
                    includeBlank: true
                });

                this.sprayFixedDestinationSelect.on('change', function (value) {
                    context.checkReplicate(value, context.fixedSprayReplicateCheckbox);
                });

                this.sprayDelimitedDestinationSelect.on('change', function (value) {
                    context.checkReplicate(value, context.delimitedSprayReplicateCheckbox);
                });

                this.sprayXmlDestinationSelect.on('change', function (value) {
                    context.checkReplicate(value, context.xmlSprayReplicateCheckbox);
                });

                this.sprayVariableDestinationSelect.on('change', function (value) {
                    context.checkReplicate(value, context.variableSprayReplicateCheckbox);
                });

                this.sprayBlobDestinationSelect.on('change', function (value) {
                    context.checkReplicate(value, context.blobSprayReplicateCheckbox);
                });

                this.checkReplicate();
            },

            checkReplicate: function (value, checkBoxValue) {
                var context = this;
                FileSpray.GetSprayTargets({
                    request: {}
                }).then(function (response) {
                    if (lang.exists("GetSprayTargetsResponse.GroupNodes.GroupNode", response)) {
                        var arr = response.GetSprayTargetsResponse.GroupNodes.GroupNode;
                        for (var index in arr) {
                            if (arr[index].Name === value && arr[index].ReplicateOutputs === true) {
                                checkBoxValue.set("disabled", false);
                                context.replicateEnabled = true;
                                break;
                            } else if (arr[index].Name === value) {
                                checkBoxValue.set("disabled", true);
                                break;
                            } else if (!arr[index].ReplicateOutputs) {
                                context.replicateEnabled = false;
                            }
                        }
                    }
                });
                this.fixedSprayReplicateCheckbox.set("disabled", !this.replicateEnabled);
                this.delimitedSprayReplicateCheckbox.set("disabled", !this.replicateEnabled);
                this.xmlSprayReplicateCheckbox.set("disabled", !this.replicateEnabled);
                this.variableSprayReplicateCheckbox.set("disabled", !this.replicateEnabled);
                this.blobSprayReplicateCheckbox.set("disabled", !this.replicateEnabled);
                this.jsonSprayReplicate.set("disabled", !this.replicateEnabled);

            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.landingZonesTab.id) {
                    } else {
                        if (!currSel.initalized) {
                            currSel.init(currSel.params);
                        }
                    }
                }
            },

            addMenuItem: function (menu, details) {
                var menuItem = new MenuItem(details);
                menu.addChild(menuItem);
                return menuItem;
            },

            initLandingZonesGrid: function () {
                var context = this;
                this.landingZoneStore = new FileSpray.CreateLandingZonesStore();
                this.landingZonesGrid = new declare([ESPUtil.Grid(false, true)])({
                    store: this.landingZoneStore,
                    query: {
                        id: "*",
                        filter: this.filter.exists() ? this.getFilter() : null
                    },
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox',
                            disabled: function (item) {
                                if (item.type) {
                                    switch (item.type) {
                                        case "dropzone":
                                        case "folder":
                                        case "machine":
                                            return true;
                                    }
                                }
                                return false;
                            },
                            sortable: false
                        }),
                        displayName: tree({
                            label: this.i18n.Name,
                            sortable: false,
                            formatter: function (_name, row) {
                                var img = "";
                                var name = _name;
                                if (row.isDir === undefined) {
                                    img = Utility.getImageHTML("server.png");
                                    name += " [" + row.Path + "]";
                                } else if (row.isMachine) {
                                    img = Utility.getImageHTML("machine.png");
                                } else if (row.isDir) {
                                    img = Utility.getImageHTML("folder.png");
                                } else {
                                    img = Utility.getImageHTML("file.png");
                                }
                                return img + "&nbsp;" + name;
                            }
                        }),
                        filesize: {
                            label: this.i18n.Size, width: 108, sortable: false,
                            formatter: function (fsize, row) {
                                if (!fsize || fsize === -1) {
                                    return ""
                                }
                                return Utility.convertedSize(fsize);
                            }
                        },
                        modifiedtime: { label: this.i18n.Date, width: 180, sortable: false }
                    },
                    getSelected: function () {
                        if (context.filter.exists()) {
                            return this.inherited(arguments, [FileSpray.CreateLandingZonesFilterStore()]);
                        }
                        return this.inherited(arguments, [FileSpray.CreateFileListStore()]);
                    }
                }, this.id + "LandingZonesGrid");

                var context = this;
                this.landingZonesGrid.on(".dgrid-row:contextmenu", function (evt) {
                    if (context._onRowContextMenu) {
                        var item = context.landingZonesGrid.row(evt).data;
                        var cell = context.landingZonesGrid.cell(evt);
                        var colField = cell.column.field;
                        var mystring = "item." + colField;
                        context._onRowContextMenu(item, colField, mystring);
                    }
                });
                this.landingZonesGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                });
                this.landingZonesGrid.startup();

                this.sprayFixedGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        targetName: editor({
                            label: this.i18n.TargetName,
                            autoSave: true,
                            editor: "text",
                            editorArgs: {
                                style: "width: 100%;"
                            }
                        }, TextBox),
                        targetRecordLength: editor({
                            editorArgs: {
                                required: true,
                                placeholder: this.i18n.RequiredForXML,
                                promptMessage: this.i18n.RequiredForXML,
                                style: "width: 100%;"
                            },
                            label: this.i18n.RecordLength,
                            autoSave: true,
                        }, ValidationTextBox)
                    }
                });

                this.sprayDelimitedGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        targetName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.sprayXmlGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        targetName: editor({
                            label: this.i18n.TargetName,
                            width: 120,
                            autoSave: true,
                            editor: "text"
                        }),
                        targetRowTag: editor({
                            label: this.i18n.RowTag,
                            width: 100,
                            autoSave: true
                        })
                    }
                });

                this.sprayJsonGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        targetName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        }),
                        targetRowPath: editor({
                            label: this.i18n.RowPath,
                            width: 72,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.sprayVariableGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        targetName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.sprayBlobGrid.createGrid({
                    idProperty: "calculatedID",
                    columns: {
                        fullPath: editor({
                            label: this.i18n.SourcePath,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.refreshActionState();
            },

            refreshGrid: function (clearSelection) {
                this.landingZonesGrid.set("query", {
                    id: "*",
                    filter: this.filter.exists() ? this.getFilter() : null
                });
                if (clearSelection) {
                    this.landingZonesGrid.clearSelection();
                }
            },

            refreshActionState: function () {
                var selection = this.landingZonesGrid.getSelected();
                var hasSelection = selection.length;
                registry.byId(this.id + "HexPreview").set("disabled", !hasSelection);
                registry.byId(this.id + "Download").set("disabled", !hasSelection);
                registry.byId(this.id + "Delete").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayFixedDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayDelimitedDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayXmlDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayJsonDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayVariableDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "SprayBlobDropDown").set("disabled", !hasSelection);

                if (hasSelection) {
                    var context = this;
                    var data = [];
                    arrayUtil.forEach(selection, function (item, idx) {
                        lang.mixin(item, lang.mixin({
                            targetName: item.displayName,
                            targetRecordLength: "",
                            targetRowTag: "Row",
                            targetRowPath: "/"
                        }, item));
                        data.push(item);
                    });
                    this.sprayFixedGrid.setData(data);
                    this.sprayDelimitedGrid.setData(data);
                    this.sprayXmlGrid.setData(data);
                    this.sprayJsonGrid.setData(data);
                    this.sprayVariableGrid.setData(data);
                    this.sprayBlobGrid.setData(data);
                }
            },

            ensurePane: function (type, id, title, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    switch (type) {
                        case "hex":
                            retVal = new DelayLoadWidget({
                                id: id,
                                title: title,
                                closable: true,
                                delayWidget: "HexViewWidget",
                                params: params
                            });
                            break;
                        case "dfu":
                            retVal = new DelayLoadWidget({
                                id: id,
                                title: title,
                                closable: true,
                                delayWidget: "DFUWUDetailsWidget",
                                params: params
                            });
                            break;
                    }
                    if (retVal) {
                        this.addChild(retVal);
                    }
                }
                return retVal;
            }

        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/SelectionGridWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/SelectionGridWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dojo/text!../templates/SelectionGridWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, editor, selector, ColumnResizer, DijitRegistry,
    _Widget,
    template) {
        return declare("SelectionGridWidget", [_Widget], {
            templateString: template,
            store: null,
            idProperty: "Change Me",

            constructor: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            //  Implementation ---
            createGrid: function (args) {
                this.idProperty = args.idProperty;
                var store = new Memory({
                    idProperty: this.idProperty,
                    data: []
                });
                this.store = Observable(store);

                this.grid = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry])({
                    store: this.store,
                    columns: args.columns
                }, this.id + "Grid");
            },

            setData: function (data) {
                this.store.setData(data);
                this.grid.refresh();
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/TargetComboBoxWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/TargetComboBoxWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/form/ComboBox */ "./node_modules/dijit/form/ComboBox.js"),

    __webpack_require__(/*! hpcc/TargetSelectClass */ "./eclwatch/TargetSelectClass.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    ComboBox,
    TargetSelectClass) {

        return declare("TargetComboBoxWidget", [ComboBox], TargetSelectClass);
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


/***/ }),

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

/***/ "./lib/src/WsTopology.js":
/*!*******************************!*\
  !*** ./lib/src/WsTopology.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Deferred, Memory, Observable, QueryResults, Evented, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var TpLogFileStore = declare([Memory, Evented], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        query: function (query, options) {
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            function nextItem(itemParts) {
                var part = "";
                while (itemParts.length && part.trim() === "") {
                    part = itemParts[0];
                    itemParts.shift();
                }
                return part;
            }
            if (!query.Name) {
                deferredResults.resolve([]);
                deferredResults.total.resolve(0);
            }
            else {
                TpLogFile({
                    request: lang.mixin({}, query, {
                        PageNumber: options.start / options.count
                    })
                }).then(lang.hitch(this, function (response) {
                    var data = [];
                    if (lang.exists("TpLogFileResponse.LogData", response)) {
                        this.lastPage = response.TpLogFileResponse.LogData;
                        this.emit("pageLoaded", this.lastPage);
                        arrayUtil.forEach(response.TpLogFileResponse.LogData.split("\n"), function (item, idx) {
                            if (options.start === 0 || idx > 0) {
                                //  Throw away first line as it will probably only be a partial line  ---
                                var itemParts = item.split(" ");
                                var lineNo, date, time, pid, tid, details;
                                if (itemParts.length)
                                    lineNo = nextItem(itemParts);
                                if (itemParts.length)
                                    date = nextItem(itemParts);
                                if (itemParts.length)
                                    time = nextItem(itemParts);
                                if (itemParts.length)
                                    pid = nextItem(itemParts);
                                if (itemParts.length)
                                    tid = nextItem(itemParts);
                                if (itemParts.length)
                                    details = itemParts.join(" ");
                                data.push({
                                    __hpcc_id: response.TpLogFileResponse.PageNumber + "_" + idx,
                                    lineNo: lineNo,
                                    date: date,
                                    time: time,
                                    pid: pid,
                                    tid: tid,
                                    details: details
                                });
                            }
                        }, this);
                    }
                    this.setData(data);
                    if (lang.exists("TpLogFileResponse.TotalPages", response)) {
                        deferredResults.total.resolve(response.TpLogFileResponse.TotalPages * options.count);
                    }
                    else {
                        deferredResults.total.resolve(data.length);
                    }
                    return deferredResults.resolve(this.data);
                }));
            }
            return QueryResults(deferredResults);
        }
    });
    function TpServiceQuery(params) {
        lang.mixin(params.request, {
            Type: "ALLSERVICES"
        });
        return ESPRequest.send("WsTopology", "TpServiceQuery", params);
    }
    exports.TpServiceQuery = TpServiceQuery;
    function TpClusterQuery(params) {
        lang.mixin(params.request, {
            Type: "ROOT"
        });
        return ESPRequest.send("WsTopology", "TpClusterQuery", params);
    }
    exports.TpClusterQuery = TpClusterQuery;
    function GetESPServiceBaseURL(type) {
        var deferred = new Deferred();
        this.TpServiceQuery({}).then(function (response) {
            var retVal = ESPRequest.getURL({
                port: window.location.protocol === "https:" ? 18002 : 8002,
                pathname: ""
            });
            if (lang.exists("TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer", response)) {
                arrayUtil.forEach(response.TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer, function (item, idx) {
                    if (lang.exists("TpBindings.TpBinding", item)) {
                        arrayUtil.forEach(item.TpBindings.TpBinding, function (binding, idx) {
                            if (binding.Service === type && binding.Protocol + ":" === location.protocol) {
                                retVal = ESPRequest.getURL({
                                    port: binding.Port,
                                    pathname: ""
                                });
                                return true;
                            }
                        });
                    }
                    if (retVal !== "")
                        return true;
                });
            }
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }
    exports.GetESPServiceBaseURL = GetESPServiceBaseURL;
    exports.WsEclURL = "";
    function GetWsEclURL(type) {
        var deferred = new Deferred();
        if (this.WsEclURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclURL = response + "/WsEcl/";
                deferred.resolve(context.WsEclURL + type + "/query/");
            });
        }
        else {
            deferred.resolve(this.WsEclURL + type + "/query/");
        }
        return deferred.promise;
    }
    exports.GetWsEclURL = GetWsEclURL;
    exports.WsEclIFrameURL = "";
    function GetWsEclIFrameURL(type) {
        var deferred = new Deferred();
        if (this.WsEclIFrameURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclIFrameURL = response + dojoConfig.urlInfo.basePath + "/stub.htm?Widget=IFrameWidget&src=" + encodeURIComponent("/WsEcl/");
                deferred.resolve(context.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
            });
        }
        else {
            deferred.resolve(this.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
        }
        return deferred.promise;
    }
    exports.GetWsEclIFrameURL = GetWsEclIFrameURL;
    function TpTargetClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpTargetClusterQuery", params);
    }
    exports.TpTargetClusterQuery = TpTargetClusterQuery;
    function TpGroupQuery(params) {
        return ESPRequest.send("WsTopology", "TpGroupQuery", params);
    }
    exports.TpGroupQuery = TpGroupQuery;
    function TpLogicalClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpLogicalClusterQuery", params).then(function (response) {
            var best = null;
            var hthor = null;
            if (lang.exists("TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster", response)) {
                arrayUtil.forEach(response.TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster, function (item, idx) {
                    if (!best) {
                        best = item;
                    }
                    if (item.Name.indexOf("hthor") !== -1) {
                        hthor = item;
                        return false;
                    }
                    else if (item.Name.indexOf("thor") !== -1) {
                        best = item;
                    }
                });
            }
            if (hthor) {
                response.TpLogicalClusterQueryResponse["default"] = hthor;
            }
            else if (best) {
                response.TpLogicalClusterQueryResponse["default"] = best;
            }
            else {
                response.TpLogicalClusterQueryResponse["default"] = null;
            }
            return response;
        });
    }
    exports.TpLogicalClusterQuery = TpLogicalClusterQuery;
    function TpClusterInfo(params) {
        return ESPRequest.send("WsTopology", "TpClusterInfo", params);
    }
    exports.TpClusterInfo = TpClusterInfo;
    function TpThorStatus(params) {
        return ESPRequest.send("WsTopology", "TpThorStatus", params);
    }
    exports.TpThorStatus = TpThorStatus;
    function TpGetServicePlugins(params) {
        return ESPRequest.send("WsTopology", "TpGetServicePlugins", params);
    }
    exports.TpGetServicePlugins = TpGetServicePlugins;
    function TpDropZoneQuery(params) {
        return ESPRequest.send("WsTopology", "TpDropZoneQuery", params);
    }
    exports.TpDropZoneQuery = TpDropZoneQuery;
    function TpGetComponentFile(params) {
        params.handleAs = "text";
        return ESPRequest.send("WsTopology", "TpGetComponentFile", params);
    }
    exports.TpGetComponentFile = TpGetComponentFile;
    function TpLogFile(params) {
        return ESPRequest.send("WsTopology", "TpLogFile", params);
    }
    exports.TpLogFile = TpLogFile;
    function CreateTpLogFileStore() {
        var store = new TpLogFileStore();
        return Observable(store);
    }
    exports.CreateTpLogFileStore = CreateTpLogFileStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsTopology.js.map

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LZBrowseWidget.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/LZBrowseWidget.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_LandingZones\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.title_LZBrowse}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <b>${i18n.Preview}:</b>\n                    <div id=\"${id}HexPreview\" data-dojo-attach-event=\"onClick:_onHexPreview\" data-dojo-type=\"dijit.form.Button\">${i18n.Hex}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <input id=\"${id}Upload\" label=\"${i18n.Upload}\" type=\"file\" data-dojo-attach-event=\"onChange:_onUpload, onBegin: _onUploadBegin, onProgress: _onUploadProgress\" data-dojo-props='multiple: true' data-dojo-type=\"dojox.form.Uploader\" />\n                    <div id=\"${id}Download\" data-dojo-attach-event=\"onClick:_onDownload\" data-dojo-type=\"dijit.form.Button\">${i18n.Download}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <input id=\"${id}DropZoneName2\" title=\"${i18n.DropZone}:\" name=\"DropZoneName\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Created}'\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}ServerFilter\" title=\"${i18n.Server}:\" name=\"Server\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Server}'\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}NameFilter\" title=\"${i18n.FileName}:\" name=\"NameFilter\" colspan=\"2\" style=\"width:100%\" data-dojo-props=\"trim: true, required:true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}AddFileDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.AddFile}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}AddFileForm\" style=\"width:600px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <input id=\"${id}AddFileIP\" title=\"${i18n.IP}:\" style=\"width: 95%;\" name=\"NetAddress\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    <input id=\"${id}AddFilePath\" title=\"${i18n.Path}:\" style=\"width: 95%;\" name=\"fullPath\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onAddFile\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <b>${i18n.Spray}:</b>\n                    <div id=\"${id}SprayFixedDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Fixed}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayFixedForm\" style=\"width:600px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayFixedDestination\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayFixedDFUSprayQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayFixedDestinationNamePrefix\" title=\"${i18n.TargetScope}:\" style=\"width: 95%;\" name=\"namePrefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayFixedGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}FixedSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSprayFixed\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}SprayDelimitedDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Delimited}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayDelimitedForm\" style=\"width: 600px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayDelimitedDestination\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayDelimitedDFUQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input title=\"${i18n.TargetScope}:\" style=\"width: 95%;\" name=\"namePrefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayDelimitedGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <select id=\"${id}sourceFormat\" title=\"${i18n.Format}:\" name=\"sourceFormat\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                            <option value=\"1\">ASCII</option>\n                                            <option value=\"2\">UTF-8</option>\n                                            <option value=\"3\">UTF-8N</option>\n                                            <option value=\"4\">UTF-16</option>\n                                            <option value=\"5\">UTF-16LE</option>\n                                            <option value=\"6\">UTF-16BE</option>\n                                            <option value=\"7\">UTF-32</option>\n                                            <option value=\"8\">UTF-32LE</option>\n                                            <option value=\"9\">UTF-32BE</option>\n                                        </select>\n                                        <input id=\"${id}SprayDelimitedMaxRecordLength\" title=\"${i18n.MaxRecordLength}:\" style=\"width: 95%;\" name=\"sourceMaxRecordSize\" required=\"false\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'8192'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input id=\"${id}SprayDelimitedSeparators\" title=\"${i18n.Separators}:\" style=\"width: 95%;\" name=\"sourceCsvSeparate\" value=\"\\,\" data-dojo-props=\"trim: true, placeHolder:'\\,'\" colspan=\"2\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input title=\"${i18n.OmitSeparator}:\" name=\"NoSourceCsvSeparator\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}SprayDelimitedEscape\" title=\"${i18n.Escape}:\" style=\"width: 95%;\" name=\"sourceCsvEscape\" data-dojo-props=\"trim: true\" colspan=\"2\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input id=\"${id}SprayDelimitedTerminators\" title=\"${i18n.LineTerminators}:\" name=\"sourceCsvTerminate\" style=\"width: 95%;\" value=\"\\n,\\r\\n\" required=\"true\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'\\\\n,\\\\r\\\\n'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input id=\"${id}SprayDelimitedQuote\" title=\"${i18n.Quote}:\" style=\"width: 95%;\" name=\"sourceCsvQuote\" value='\"' data-data-dojo-props=\"trim: true, placeHolder:'\\''\" colspan=\"2\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}DelimitedSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.RecordStructurePresent}:\" name=\"recordStructurePresent\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.QuotedTerminator}:\" name=\"quotedTerminator\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSprayDelimited\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}SprayXmlDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.XML}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayXmlForm\" style=\"width:600px;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayXmlDestinationSelect\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayXMLDFUQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input title=\"${i18n.TargetScope}:\" style=\"width: 95%;\" name=\"namePrefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayXmlGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <select id=\"${id}xmlsourceFormat\" title=\"${i18n.Format}:\" name=\"sourceFormat\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                            <option value=\"2\">UTF-8</option>\n                                            <option value=\"3\">UTF-8N</option>\n                                            <option value=\"4\">UTF-16</option>\n                                            <option value=\"5\">UTF-16LE</option>\n                                            <option value=\"6\">UTF-16BE</option>\n                                            <option value=\"7\">UTF-32</option>\n                                            <option value=\"8\">UTF-32LE</option>\n                                            <option value=\"9\">UTF-32BE</option>\n                                        </select>\n                                        <input id=\"${id}SprayXmlMaxRecordLength\" title=\"${i18n.MaxRecordLength}:\" style=\"width: 95%;\" name=\"sourceMaxRecordSize\" required=\"false\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'8192'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}XMLSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button id=\"${id}SprayXMLButton\" data-dojo-attach-event=\"onClick:_onSprayXml\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}SprayJsonDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.JSON}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayJsonForm\" style=\"width:600px;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayJsonDestinationSelect\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayJSONDFUQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input title=\"${i18n.TargetScope}:\" style=\"width: 95%;\" name=\"namePrefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayJsonGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <select id=\"${id}jsonsourceFormat\" title=\"${i18n.Format}:\" name=\"sourceFormat\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                            <option value=\"2\">UTF-8</option>\n                                            <option value=\"3\">UTF-8N</option>\n                                            <option value=\"4\">UTF-16</option>\n                                            <option value=\"5\">UTF-16LE</option>\n                                            <option value=\"6\">UTF-16BE</option>\n                                            <option value=\"7\">UTF-32</option>\n                                            <option value=\"8\">UTF-32LE</option>\n                                            <option value=\"9\">UTF-32BE</option>\n                                        </select>\n                                        <input id=\"${id}SprayJsonMaxRecordLength\" title=\"${i18n.MaxRecordLength}:\" value=\"\" style=\"width: 95%;\" name=\"sourceMaxRecordSize\" required=\"false\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'8192'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}JSONSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button data-dojo-attach-event=\"onClick:_onSprayJson\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}SprayVariableDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Variable}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayVariableForm\" style=\"width:600px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayVariableDestination\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayVariableDFUQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input title=\"${i18n.TargetScope}:\" style=\"width: 95%;\" name=\"namePrefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.NamePrefixPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayVariableGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <select title=\"${i18n.VariableSourceType}:\" name=\"sourceFormat\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                            <option value=\"recfmv\" selected=\"true\">recfmv</option>\n                                            <option value=\"recfmvb\">recfmvb</option>\n                                            <option value=\"variable\">${i18n.Variable}</option>\n                                            <option value=\"variablebigendian\">${i18n.VariableBigendian}</option>\n                                        </select>\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}VariableSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSprayVariable\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}SprayBlobDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Blob}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}SprayBlobForm\" style=\"width:600px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}SprayBlobDestination\" title=\"${i18n.Group}:\" style=\"width: 95%;\" name=\"destGroup\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}SprayBLOBDFUQueues\" title=\"${i18n.Queue}:\" style=\"width: 95%;\" name=\"DFUServerQueue\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input title=\"${i18n.TargetName}:\" style=\"width: 95%;\" name=\"destLogicalName\" data-dojo-props=\"trim: true, placeHolder:'${i18n.TargetNamePlaceholder}'\" required=\"true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                    <div id=\"${id}SprayBlobGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input title=\"${i18n.BlobPrefix}:\" style=\"width: 95%;\" name=\"prefix\" data-dojo-props=\"trim: true, placeHolder:'${i18n.PrefixPlaceholder}'\" colspan=\"2\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}BlobSprayReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.FailIfNoSourceFile}:\" name=\"failIfNoSourceFile\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.ExpireDays}:\" type=\"number\" name=\"expireDays\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input title=\"${i18n.DelayedReplication}:\" name=\"delayedReplication\" data-dojo-props=\"disabled: true, checked: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSprayBlob\" data-dojo-type=\"dijit.form.Button\">${i18n.Spray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}LandingZonesGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}LandingZonesGrid\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}FileListDialog\" title=\"${i18n.FileUploader}\" data-dojo-type=\"dijit.Dialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <div data-dojo-props=\"cols:1\" data-dojo-type=\"hpcc.TableContainer\">\n                <input id=\"${id}DropZoneTargetSelect\" title=\"${i18n.LandingZone}:\" style=\"width: 95%;\" data-dojo-type=\"TargetSelectWidget\" />\n                <input id=\"${id}DropZoneMachineSelect\" title=\"${i18n.Machines}:\" style=\"width: 95%;\" data-dojo-type=\"TargetSelectWidget\" />\n                <input id=\"${id}DropZoneFolderSelect\" title=\"${i18n.Folder}:\" style=\"width: 95%;\" data-dojo-type=\"TargetComboBoxWidget\" />\n            </div>\n            <p>\n            <div id=\"${id}UploadFileList\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"uploaderId: '${id}Upload'\" data-dojo-type=\"dojox.form.uploader.FileList\"></div>\n            </p>\n            <span id=\"BrowserSizeMessage\" class=\"hidden\">${i18n.YourBrowserMayNotSupport}</span>\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <label>${i18n.Overwrite}</label>\n            <input id=\"${id}FileOverwriteCheckbox\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n            <button id=\"${id}FileListDialogUpload\" data-dojo-attach-event=\"onClick:_onCheckUploadSubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Start}</button>\n            <button id=\"${id}FileListDialogCancel\" type=\"button\" data-dojo-attach-event=\"onClick:_onUploadCancel\" data-dojo-type=\"dijit.form.Button\">${i18n.Close}</button>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/SelectionGridWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" style=\"width: 100%; height: 280px\" data-dojo-props=\"splitter: false, gutters: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ContentPane\" style=\"padding: 0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Grid\" style=\"margin: 1px\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);