(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/ECLSourceWidget":"./eclwatch/ECLSourceWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/PackageMapPartsWidget":"./eclwatch/PackageMapPartsWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"dojo/text!templates/ECLSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[65],{

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

/***/ "./eclwatch/ECLSourceWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/ECLSourceWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! src/CodeMirror */ "./lib/src/CodeMirror.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),

    __webpack_require__(/*! dojo/text!../templates/ECLSourceWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html"),

    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, xhr, topic,
    BorderContainer, ContentPane, registry,
    CodeMirror,
    _Widget, ESPWorkunit,
    template) {
        return declare("ECLSourceWidget", [_Widget], {
            templateString: template,
            baseClass: "ECLSourceWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            eclSourceContentPane: null,
            wu: null,
            editor: null,
            markers: [],
            highlightLines: [],
            readOnly: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
                if (this.editor) {
                    this.editor.setSize("100%", "100%");
                }
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var mode = "ecl";
                if (params.sourceMode !== undefined) {
                    mode = params.sourceMode;
                } else if (this.WUXml) {
                    mode = "xml";
                }

                if (params.readOnly !== undefined)
                    this.readOnly = params.readOnly;

                this.editor = CodeMirror.fromTextArea(document.getElementById(this.id + "EclCode"), {
                    tabMode: "indent",
                    matchBrackets: true,
                    lineNumbers: true,
                    mode: mode,
                    readOnly: this.readOnly,
                    foldGutter: mode === "xml" ? true : false,
                    gutters: mode === "xml" ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : ["CodeMirror-linenumbers"]
                });
                dom.byId(this.id + "EclContent").style.backgroundColor = this.readOnly ? 0xd0d0d0 : 0xffffff;
                this.editor.setSize("100%", "100%");

                var context = this;
                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    if (this.WUXml) {
                        this.wu.fetchXML(function (xml) {
                            context.setText(xml);
                        });
                    } else {
                        this.wu.fetchText(function (text) {
                            context.setText(text);
                        });
                    }
                } else if (lang.exists("ECL", params)) {
                    this.setText(params.ECL ? params.ECL : "");
                } else if (lang.exists("Usergenerated", params)) {
                    this.setText(params.Usergenerated);
                } else if (lang.exists("sourceURL", params)) {
                    xhr(params.sourceURL, {
                        handleAs: "text"
                    }).then(function (data) {
                        context.setText(data);
                    });
                }
            },

            clearErrors: function (errWarnings) {
                for (var i = 0; i < this.markers.length; ++i) {
                    this.markers[i].clear();
                }
                this.markers = [];
            },

            setErrors: function (errWarnings) {
                for (var i = 0; i < errWarnings.length; ++i) {
                    var line = parseInt(errWarnings[i].LineNo, 10);
                    this.markers.push(this.editor.doc.markText({
                        line: line - 1,
                        ch: 0
                    }, {
                            line: line,
                            ch: 0
                        }, {
                            className: errWarnings[i].Severity + "Line"
                        }));
                }
            },

            setCursor: function (line, col) {
                this.editor.setCursor(line - 1, col - 1);
                this.editor.focus();
            },

            clearHighlightLines: function () {
                for (var i = 0; i < this.highlightLines.length; ++i) {
                    this.highlightLines[i].clear();
                }
            },

            highlightLine: function (line) {
                this.highlightLines.push(this.editor.doc.markText({
                    line: line - 1,
                    ch: 0
                }, {
                        line: line,
                        ch: 0
                    }, {
                        className: "highlightline"
                    }));
            },

            setText: function (text) {
                try {
                    this.editor.setValue(text);
                } catch (e) {
                    topic.publish("hpcc/brToaster", {
                        Severity: "Error",
                        Source: "ECLSourceWidget.setText",
                        Exceptions: [
                            { Message: this.i18n.SetTextError },
                            { Message: e.toString ? (this.i18n.Details + ":\n" + e.toString()) : e }
                        ]
                    });
                }
            },

            setReadOnly: function (readonly) {
                this.editor.readOnly(readonly);
            },

            getText: function () {
                return this.editor.getValue();
            }

        });
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

/***/ "./eclwatch/PackageMapPartsWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/PackageMapPartsWidget.js ***!
  \*******************************************/
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
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDFUXref */ "./lib/src/WsDFUXref.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/WsPackageMaps */ "./lib/src/WsPackageMaps.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/ECLSourceWidget */ "./eclwatch/ECLSourceWidget.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domForm, domConstruct, domClass, all,
    registry, ToggleButton, ToolbarSeparator, Button, ValidationTextBox, Textarea, TextBox, CheckBox, Dialog,
    selector,
    GridDetailsWidget, WsDFUXref, DelayLoadWidget, ESPUtil, WsPackageMaps, Utility, FilterDropDownWidget, TargetSelectWidget, ECLSourceWidget) {
        return declare("PackageMapPartsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.Parts,
            idProperty: "Part",
            addPartsDropDown: null,
            addPartsDropDownLoaded: null,

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.packageMap = params.packageMap;
                this._refreshActionState();
                this.refreshGrid();
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.addPartsSelect = registry.byId(this.id + "AddPartsSelect");
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");
                this.addPartsDropDown = new FilterDropDownWidget({
                    id: this.id + "AddParts",
                    disabled: false,
                    label: this.i18n.AddPart
                }).placeAt(this.openButton.domNode, "after");
                this.getPartDialog = new Dialog({
                    title: this.i18n.GetPart,
                    style: "width: 600px;"
                });
                this.addPartsDropDown.on("apply", function (evt) {
                    if (context.addPartsDropDown.filterForm.validate()) {
                        var addPartInput = context.getFilter();
                        var packageMapSearch = context.params.packageMap.search("::");
                        var packageMapClean;

                        packageMapSearch > -1 ? packageMapClean = context.params.packageMap.split('::')[1] : packageMapClean = context.params.packageMap;

                        WsPackageMaps.AddPartToPackageMap({
                            request: {
                                Target: context.params.target,
                                PackageMap: packageMapClean,
                                PartName: addPartInput.PartName,
                                Content: addPartInput.Content,
                                DaliIp: addPartInput.DaliIp,
                                SourceProcess: addPartInput.SourceProcess,
                                DeletePrevious: addPartInput.DeletePrevious === "on" ? 1 : 0,
                                AllowForeignFiles: addPartInput.AllowForeignFiles === "on" ? 1 : 0,
                                PreloadAllPackages: addPartInput.PreloadAllPackages === "on" ? 1 : 0,
                                UpdateSuperFiles: addPartInput.UpdateSuperFiles === "on" ? 1 : 0,
                                UpdateCloneFrom: addPartInput.UpdateCloneFrom === "on" ? 1 : 0,
                                AppendCluster: addPartInput.AppendCluster === "on" ? 1 : 0
                            }
                        }).then(function (response) {
                            if (lang.exists("AddPartToPackageMapResponse.status.Code", response)) {
                                context.refreshGrid();
                                context.addPartsDropDown.filterDropDown.set("label", context.i18n.Add);
                            }
                        });
                    }
                });
                dojo.destroy(this.addPartsDropDown.iconFilter);
                this.addPartsDropDown.placeAt(this.openButton.domNode, "after");
                this.addPartsDropDown.filterForm.set("style", "width:600px;");
                this.addPartsDropDown.filterDropDown.set("label", context.i18n.Add);
                this.addPartsPartName = this.createLabelAndElement("PartName", this.i18n.PartName, "ValidationTextBox", this.i18n.PartName);
                this.addPartsContent = this.createLabelAndElement("Content", this.i18n.Content, "Textarea", this.i18n.Content);
                this.addPartsDaliIp = this.createLabelAndElement("DaliIp", this.i18n.DaliIP, "TextBox", this.i18n.DaliIP);
                this.addPartsSourceProcess = this.createLabelAndElement("SourceProcess", this.i18n.SourceProcess, "TextBox", this.i18n.SourceProcess);
                this.addPartsDeletePrevious = this.createLabelAndElement("DeletePrevious", this.i18n.DeletePrevious, "CheckBox", this.i18n.DeletePrevious);
                this.addPartsAllowForeign = this.createLabelAndElement("AllowForeignFiles", this.i18n.AllowForeignFiles, "CheckBox", this.i18n.AllowForeignFiles);
                this.addPartsPreloadAllPackages = this.createLabelAndElement("PreloadAllPackages", this.i18n.PreloadAllPackages, "CheckBox", this.i18n.PreloadAllPackages);
                this.addPartsUpdateSuperFiles = this.createLabelAndElement("UpdateSuperFiles", this.i18n.UpdateSuperFiles, "CheckBox", this.i18n.UpdateSuperFiles);
                this.addPartsUpdateCloneFrom = this.createLabelAndElement("UpdateCloneFrom", this.i18n.UpdateCloneFrom, "CheckBox", this.i18n.UpdateCloneFrom);
                this.addPartsAppendCluster = this.createLabelAndElement("AppendCluster", this.i18n.AppendCluster, "CheckBox", this.i18n.AppendCluster);

                this.removeParts = new Button({
                    id: this.id + "RemoveParts",
                    disabled: true,
                    onClick: function (val) {
                        context._onRemovePart();
                    },
                    label: this.i18n.RemovePart
                }).placeAt(this.id + "AddParts", "after");

                this.getParts = new Button({
                    id: this.id + "GetParts",
                    disabled: true,
                    onClick: function (val) {
                        context._onGetPart();
                    },
                    label: this.i18n.GetPart
                }).placeAt(this.id + "RemoveParts", "after");
                dojo.destroy(this.id + "Open");

                new ToolbarSeparator().placeAt(this.id + "RemoveParts", "after");
                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox',
                            label: ""
                        }),
                        Part: { label: this.i18n.Parts, sortable: false }
                    }
                }, domID);

                retVal.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = retVal.row(evt).data;
                        WsPackageMaps.GetPartFromPackageMap({
                            request: {
                                Target: context.params.target,
                                PackageMap: context.params.packageMap.split('::')[1],
                                PartName: item.Part
                            }
                        }).then(function (response) {
                            var nameTab = context.ensurePane(item.Part, {
                                Part: item.Part,
                                PartContent: response.GetPartFromPackageMapResponse.Content
                            });
                            context.selectChild(nameTab);
                        });
                    }
                });
                return retVal;
            },

            _onRemovePart: function (event) {
                var context = this;
                var selections = this.grid.getSelected();
                var list = this.arrayToList(selections, "Part");
                if (confirm(this.i18n.YouAreAboutToDeleteThisPart + "\n" + list)) {
                    var promises = [];
                    arrayUtil.forEach(selections, function (row, idx) {
                        promises.push(WsPackageMaps.RemovePartFromPackageMap({
                            request: {
                                Target: context.params.target,
                                PackageMap: context.params.packageMap.split('::')[1],
                                PartName: row.Part
                            }
                        }));
                    });
                    all(promises).then(function () {
                        context._onRefresh();
                    });
                }
            },

            _onGetPart: function (event) {
                var context = this;
                var selections = this.grid.getSelected();
                WsPackageMaps.GetPartFromPackageMap({
                    request: {
                        Target: context.params.target,
                        PackageMap: context.params.packageMap.split('::')[1],
                        PartName: selections[0].Part
                    }
                }).then(function (response) {
                    var nameTab = context.ensurePane(selections[0].Part, {
                        Part: selections[0].Part,
                        PartContent: response.GetPartFromPackageMapResponse.Content
                    });
                    context.selectChild(nameTab);
                });
            },

            getFilter: function () {
                return this.addPartsDropDown.toObject();
            },

            createLabelAndElement: function (id, label, element, placeholder, value) {
                var context = this;
                var control = null;
                switch (element) {
                    case "CheckBox":
                        control = new CheckBox({
                            id: id,
                            name: id,
                            checked: true,
                            title: label
                        });
                        break;
                    case "Textarea":
                        control = new Textarea({
                            id: id,
                            name: id,
                            title: label,
                            style: "height: 20%;width:40%;"
                        });
                        break;
                    case "ValidationTextBox":
                        control = new ValidationTextBox({
                            id: id,
                            name: id,
                            placeholder: placeholder,
                            style: "width: 40%",
                            value: value,
                            required: true
                        });
                        break;
                    case "TextBox":
                        control = new TextBox({
                            id: id,
                            name: id,
                            placeholder: placeholder,
                            style: "width: 40%",
                            value: value
                        });
                        break;
                }

                if (control) {
                    this.addPartsDropDown.tableContainer.domNode.appendChild(
                        dojo.create(label ? "div" : "span", {
                            id: this.id + id,
                            innerHTML: label ? "<label for=" + control + " style='float:left;width:40%'>" + label + ":</label>" : '',
                            style: "vertical-align:middle;padding:2px 0 2px 5px;"
                        })
                    );
                    control.placeAt(this.id + id);
                }
            },

            refreshActionState: function (event) {
                var selection = this.grid.getSelected();
                var hasSelection = selection.length;
                var hasMultipleSelection = selection.length === 1;

                registry.byId(this.id + "RemoveParts").set("disabled", !hasSelection);
                registry.byId(this.id + "GetParts").set("disabled", !hasMultipleSelection);
            },

            refreshGrid: function () {
                var context = this;

                WsPackageMaps.GetPackageMapByIdUpdated({
                    request: {
                        PackageMapId: context.packageMap
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("GetPackageMapByIdResponse.Info", response)) {
                        var xmlConversion = Utility.parseXML(response.GetPackageMapByIdResponse.Info);
                        var items = xmlConversion.getElementsByTagName('Part');
                        var tempObj = {}
                        for (var i = 0; i < items.length; i++) {
                            newRows.push(tempObj[i] = { Part: items[i].attributes[0].nodeValue });
                        }
                    }
                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Part,
                        closable: true,
                        delayWidget: "ECLSourceWidget",
                        hpcc: {
                            params: {
                                sourceMode: "xml",
                                Usergenerated: params.PartContent
                            }
                        }
                    });
                    this.addChild(retVal, 1);
                }
                return retVal;
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


/***/ }),

/***/ "./lib/src/CodeMirror.js":
/*!*******************************!*\
  !*** ./lib/src/CodeMirror.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! codemirror/lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! codemirror/mode/ecl/ecl */ "./node_modules/codemirror/mode/ecl/ecl.js"), __webpack_require__(/*! codemirror/mode/xml/xml */ "./node_modules/codemirror/mode/xml/xml.js"), __webpack_require__(/*! codemirror/addon/dialog/dialog */ "./node_modules/codemirror/addon/dialog/dialog.js"), __webpack_require__(/*! codemirror/addon/fold/brace-fold */ "./node_modules/codemirror/addon/fold/brace-fold.js"), __webpack_require__(/*! codemirror/addon/fold/comment-fold */ "./node_modules/codemirror/addon/fold/comment-fold.js"), __webpack_require__(/*! codemirror/addon/fold/foldcode */ "./node_modules/codemirror/addon/fold/foldcode.js"), __webpack_require__(/*! codemirror/addon/fold/foldgutter */ "./node_modules/codemirror/addon/fold/foldgutter.js"), __webpack_require__(/*! codemirror/addon/fold/indent-fold */ "./node_modules/codemirror/addon/fold/indent-fold.js"), __webpack_require__(/*! codemirror/addon/fold/xml-fold */ "./node_modules/codemirror/addon/fold/xml-fold.js"), __webpack_require__(/*! codemirror/addon/scroll/annotatescrollbar */ "./node_modules/codemirror/addon/scroll/annotatescrollbar.js"), __webpack_require__(/*! codemirror/addon/search/jump-to-line */ "./node_modules/codemirror/addon/search/jump-to-line.js"), __webpack_require__(/*! codemirror/addon/search/matchesonscrollbar */ "./node_modules/codemirror/addon/search/matchesonscrollbar.js"), __webpack_require__(/*! codemirror/addon/search/search */ "./node_modules/codemirror/addon/search/search.js"), __webpack_require__(/*! codemirror/addon/search/searchcursor */ "./node_modules/codemirror/addon/search/searchcursor.js"), __webpack_require__(/*! css!codemirror/lib/codemirror.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/lib/codemirror.css"), __webpack_require__(/*! css!codemirror/addon/dialog/dialog.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/dialog/dialog.css"), __webpack_require__(/*! css!codemirror/addon/fold/foldgutter.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/fold/foldgutter.css")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, codemirror_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    tslib_1.__exportStar(codemirror_1, exports);
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=CodeMirror.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ECLSourceWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}EclContent\" class=\"centerPanel\" style=\"padding:0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <textarea id=\"${id}EclCode\">...${i18n.Loading}...</textarea>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ })

}]);