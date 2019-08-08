(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/WUQueryWidget":"./eclwatch/WUQueryWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dijit/form/_ListBase":"./node_modules/dijit/form/_ListBase.js",
	"dijit/form/_ListMouseMixin":"./node_modules/dijit/form/_ListMouseMixin.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/WUQueryWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUQueryWidget.html",
	"dojo/text!dijit/form/templates/DropDownBox.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownBox.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[167],{

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

/***/ "./eclwatch/WUQueryWidget.js":
/*!***********************************!*\
  !*** ./eclwatch/WUQueryWidget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),
    __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),

    __webpack_require__(/*! dojo/text!../templates/WUQueryWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUQueryWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/RadioButton */ "./node_modules/dijit/form/RadioButton.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, date, topic, aspect,
    registry, Menu, MenuItem, MenuSeparator, PopupMenuItem,
    selector,
    _TabContainerWidget, WsWorkunits, ESPUtil, ESPWorkunit, DelayLoadWidget, TargetSelectWidget, FilterDropDownWidget, Utility, Clippy,
    template) {
        return declare("WUQueryWidget", [_TabContainerWidget, ESPUtil.FormHelper], {
            templateString: template,
            baseClass: "WUQueryWidget",
            i18n: nlsHPCC,

            workunitsTab: null,
            workunitsGrid: null,
            filter: null,
            clusterTargetSelect: null,
            stateSelect: null,
            userName: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.workunitsTab = registry.byId(this.id + "_Workunits");
                this.filter = registry.byId(this.id + "Filter");
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
                this.stateSelect = registry.byId(this.id + "StateSelect");
                this.logicalFileSearchTypeSelect = registry.byId(this.id + "LogicalFileSearchType");
                this.downloadToList = registry.byId(this.id + "DownloadToList");
                this.downloadToListDialog = registry.byId(this.id + "DownloadToListDialog");
                this.downListForm = registry.byId(this.id + "DownListForm");
                this.fileName = registry.byId(this.id + "FileName");
                this.mineControl = registry.byId(this.id + "Mine");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initContextMenu();
                this._idleWatcher = new ESPUtil.IdleWatcher();
                this._idleWatcher.start();
                var context = this;
                this._idleWatcherHandle = this._idleWatcher.on("idle", function () {
                    if (!context.store.busy && !context.filter.exists()) {
                        context._onRefresh();
                    }
                });
            },

            _onDownloadToListCancelDialog: function (event) {
                this.downloadToListDialog.hide();
            },

            _onDownloadToList: function (event) {
                this.downloadToListDialog.show();
            },

            _buildCSV: function (event) {
                var selections = this.workunitsGrid.getSelected();
                var row = [];
                var fileName = this.fileName.get("value") + ".csv";

                arrayUtil.forEach(selections, function (cell, idx) {
                    var rowData = [cell.Protected, cell.Wuid, cell.Owner, cell.Jobname, cell.Cluster, cell.RoxieCluster, cell.State, cell.TotalClusterTime];
                    row.push(rowData);
                });

                Utility.downloadToCSV(this.workunitsGrid, row, fileName);
                this._onDownloadToListCancelDialog();
            },

            destroy: function (args) {
                this._idleWatcherHandle.remove();
                this._idleWatcher.stop();
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_WUQuery;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onOpen: function (event) {
                var selections = this.workunitsGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensurePane(selections[i].Wuid, {
                        Wuid: selections[i].Wuid
                    });
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab);
                }
            },

            _onDelete: function (event) {
                var selection = this.workunitsGrid.getSelected();
                var list = this.arrayToList(selection, "Wuid");
                if (confirm(this.i18n.DeleteSelectedWorkunits + "\n" + list)) {
                    var context = this;
                    WsWorkunits.WUAction(selection, "Delete", {
                        load: function (response) {
                            context.refreshGrid(true);
                        }
                    });
                }
            },

            _onSetToFailed: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "SetToFailed");
            },

            _onAbort: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "Abort");
            },

            _onProtect: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "Protect");
            },

            _onUnprotect: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "Unprotect");
            },

            _onReschedule: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "Reschedule");
            },

            _onDeschedule: function (event) {
                WsWorkunits.WUAction(this.workunitsGrid.getSelected(), "Deschedule");
            },

            _onRowDblClick: function (wuid) {
                var wuTab = this.ensurePane(wuid, {
                    Wuid: wuid
                });
                this.selectChild(wuTab);
            },

            _onRowContextMenu: function (item, colField, mystring) {
                this.menuFilterOwner.set("disabled", false);
                this.menuFilterJobname.set("disabled", false);
                this.menuFilterCluster.set("disabled", false);
                this.menuFilterState.set("disabled", false);

                if (item) {
                    this.menuFilterOwner.set("label", "Owner:  " + item.Owner);
                    this.menuFilterOwner.set("hpcc_value", item.Owner);
                    this.menuFilterJobname.set("label", "Jobname:  " + item.Jobname);
                    this.menuFilterJobname.set("hpcc_value", item.Jobname);
                    this.menuFilterCluster.set("label", "Cluster:  " + item.Cluster);
                    this.menuFilterCluster.set("hpcc_value", item.Cluster);
                    this.menuFilterState.set("label", "State:  " + item.State);
                    this.menuFilterState.set("hpcc_value", item.State);
                }

                if (item.Owner === "") {
                    this.menuFilterOwner.set("disabled", true);
                    this.menuFilterOwner.set("label", this.i18n.Owner + ":  " + this.i18n.NA);
                }
                if (item.Jobname === "") {
                    this.menuFilterJobname.set("disabled", true);
                    this.menuFilterJobname.set("label", this.i18n.JobName + ":  " + this.i18n.NA);
                }
                if (item.Cluster === "") {
                    this.menuFilterCluster.set("disabled", true);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + this.i18n.NA);
                }
                if (item.State === "") {
                    this.menuFilterState.set("disabled", true);
                    this.menuFilterState.set("label", this.i18n.State + ":  " + this.i18n.NA);
                }
            },

            _onFilterType: function (evt) {
                var filter = this.filter.toObject();
                this.setVisible(this.id + "ArchivedWarning", filter.Type);
                this.setDisabled(this.id + "ECL", filter.Type);
                this.setDisabled(this.id + "LogicalFile", filter.Type);
                this.setDisabled(this.id + "LogicalFileSearchType", filter.Type);
            },

            //  Implementation  ---
            getFilter: function () {
                var retVal = this.filter.toObject();
                if (retVal.StartDate && retVal.FromTime) {
                    lang.mixin(retVal, {
                        StartDate: this.getISOString("FromDate", "FromTime")
                    });
                } else if (retVal.StartDate && !retVal.FromTime) {
                    lang.mixin(retVal, {
                        StartDate: registry.byId(this.id + "FromDate").attr("value").toISOString().replace(/T.*Z/, '') + "T00:00:00Z"
                    });
                }
                if (retVal.EndDate && retVal.ToTime) {
                    lang.mixin(retVal, {
                        EndDate: this.getISOString("ToDate", "ToTime")
                    });
                } else if (retVal.EndDate && !retVal.ToTime) {
                    lang.mixin(retVal, {
                        EndDate: registry.byId(this.id + "ToDate").attr("value").toISOString().replace(/T.*Z/, '') + "T23:59:59Z"
                    });
                }
                if (retVal.StartDate && retVal.EndDate) {
                    retVal["DateRB"] = "0";
                } else if (retVal.LastNDays) {
                    retVal["DateRB"] = "0";
                    var now = new Date();
                    retVal.StartDate = date.add(now, "day", retVal.LastNDays * -1).toISOString();
                    retVal.EndDate = now.toISOString();
                }
                return retVal;
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (this.params.searchResults) {
                    this.filter.disable(true);
                }

                this.clusterTargetSelect.init({
                    Targets: true,
                    includeBlank: true,
                    Target: params.Cluster
                });
                this.stateSelect.init({
                    WUState: true,
                    includeBlank: true,
                    Target: ""
                });
                this.logicalFileSearchTypeSelect.init({
                    LogicalFileSearchType: true,
                    includeBlank: true,
                    Target: ""
                });

                this.initWorkunitsGrid();

                var context = this;
                this.filter.on("clear", function (evt) {
                    context._onFilterType();
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });

                topic.subscribe("hpcc/session_management_status", function (publishedMessage) {
                    if (publishedMessage.status === "Unlocked") {
                        context.refreshGrid();
                        context._idleWatcher.start();
                    } else if (publishedMessage.status === "Locked") {
                        context._idleWatcher.stop();
                    }
                });

                topic.subscribe("hpcc/ecl_wu_created", function (topic) {
                    context.refreshGrid();
                });

                ESPUtil.MonitorVisibility(this.workunitsTab, function (visibility) {
                    if (visibility) {
                        context.refreshGrid();
                    }
                });

                this.userName = dojoConfig.username;
                if (this.userName === null) {
                    this.mineControl.set("disabled", true);
                }

                this.wuCopyButton = registry.byId(this.id + "Copy");
                Clippy.attachDomNode(this.wuCopyButton.domNode, function () {
                    var wuids = [];
                    arrayUtil.forEach(context.workunitsGrid.getSelected(), function (item, idx) {
                        wuids.push(item.Wuid);
                    });
                    return wuids.join("\n");
                });
                this.refreshActionState();
            },

            _onMine: function (event) {
                if (event) {
                    this.filter.setValue(this.id + "Owner", this.userName);
                    this.filter._onFilterApply();
                } else {
                    this.filter._onFilterClear();
                    this.filter._onFilterApply();
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.workunitsTab.id) {
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

            initContextMenu: function () {
                var context = this;
                var pMenu = new Menu({
                    targetNodeIds: [this.id + "WorkunitsGrid"]
                });
                this.menuOpen = this.addMenuItem(pMenu, {
                    label: this.i18n.Open,
                    onClick: function () { context._onOpen(); }
                });
                this.menuDelete = this.addMenuItem(pMenu, {
                    label: this.i18n.Delete,
                    onClick: function () { context._onDelete(); }
                });
                this.menuSetToFailed = this.addMenuItem(pMenu, {
                    label: this.i18n.SetToFailed,
                    onClick: function () { context._onSetToFailed(); }
                });
                pMenu.addChild(new MenuSeparator());
                this.menuProtect = this.addMenuItem(pMenu, {
                    label: this.i18n.Protect,
                    onClick: function () { context._onProtect(); }
                });
                this.menuUnprotect = this.addMenuItem(pMenu, {
                    label: this.i18n.Unprotect,
                    onClick: function () { context._onUnprotect(); }
                });
                pMenu.addChild(new MenuSeparator());
                {
                    var pSubMenu = new Menu();
                    this.menuFilterOwner = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "Owner", context.menuFilterOwner.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterJobname = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "Jobname", context.menuFilterJobname.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterCluster = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "ClusterTargetSelect", context.menuFilterCluster.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterState = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "StateSelect", context.menuFilterState.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    pSubMenu.addChild(new MenuSeparator());
                    this.menuFilterClearFilter = this.addMenuItem(pSubMenu, {
                        label: this.i18n.Clear,
                        onClick: function () {
                            context.filter.clear();
                            context.refreshGrid();
                        }
                    });
                    pMenu.addChild(new PopupMenuItem({
                        label: this.i18n.Filter,
                        popup: pSubMenu
                    }));
                }
                pMenu.startup();
            },

            initWorkunitsGrid: function () {
                var context = this;
                this.store = this.params.searchResults ? this.params.searchResults : new ESPWorkunit.CreateWUQueryStore();
                this.workunitsGrid = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    query: this.getFilter(),
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        Protected: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("locked.png", context.i18n.Protected);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (_protected) {
                                if (_protected === true) {
                                    return Utility.getImageHTML("locked.png");
                                }
                                return "";
                            }
                        },
                        Wuid: {
                            label: this.i18n.WUID, width: 180,
                            formatter: function (Wuid, idx) {
                                var wu = ESPWorkunit.Get(Wuid);
                                return wu.getStateImageHTML() + "&nbsp;<a href='#' class='dgrid-row-url'>" + Wuid + "</a>";
                            }
                        },
                        Owner: { label: this.i18n.Owner, width: 90 },
                        Jobname: { label: this.i18n.JobName },
                        Cluster: { label: this.i18n.Cluster, width: 90 },
                        RoxieCluster: { label: this.i18n.RoxieCluster, width: 99 },
                        State: { label: this.i18n.State, width: 90 },
                        TotalClusterTime: { label: this.i18n.TotalClusterTime, width: 117 }
                    }
                }, this.id + "WorkunitsGrid");
                this.workunitsGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item.Wuid);
                    }
                });
                this.workunitsGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item.Wuid);
                    }
                });
                this.workunitsGrid.on(".dgrid-row:contextmenu", function (evt) {
                    if (context._onRowContextMenu) {
                        var item = context.workunitsGrid.row(evt).data;
                        var cell = context.workunitsGrid.cell(evt);
                        var colField = cell.column.field;
                        var mystring = "item." + colField;
                        context._onRowContextMenu(item, colField, mystring);
                    }
                });
                this.workunitsGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                    var selection = context.workunitsGrid.getSelected();
                    if (selection.length > 0) {
                        context.downloadToList.set("disabled", false);
                    } else {
                        context.downloadToList.set("disabled", true);
                    }
                });
                ESPUtil.goToPageUserPreference(this.workunitsGrid, "WUQueryWidget");
                aspect.after(this.workunitsGrid, "gotoPage", function (deferred, args) {
                    return deferred.then(function () {
                        args[0] > 1 ? context._idleWatcher.stop() : context._idleWatcher.start();
                    });
                });
                this.workunitsGrid.startup();
            },

            refreshGrid: function (clearSelection) {
                this.workunitsGrid.set("query", this.getFilter());
                if (clearSelection) {
                    this.workunitsGrid.clearSelection();
                }
            },

            refreshActionState: function () {
                var selection = this.workunitsGrid.getSelected();
                var hasSelection = false;
                var hasProtected = false;
                var hasNotProtected = false;
                var hasFailed = false;
                var hasNotFailed = false;
                var hasCompleted = false;
                var hasNotCompleted = false;

                for (var i = 0; i < selection.length; ++i) {
                    hasSelection = true;
                    if (selection[i] && selection[i].Protected !== null) {
                        if (selection[i].Protected !== false) {
                            hasProtected = true;
                        } else {
                            hasNotProtected = true;
                        }
                    }
                    if (selection[i] && selection[i].StateID !== null) {
                        if (selection[i].StateID === 4) {
                            hasFailed = true;
                        } else {
                            hasNotFailed = true;
                        }
                        if (WsWorkunits.isComplete(selection[i].StateID, selection[i].ActionEx)) {
                            hasCompleted = true;
                        } else {
                            hasNotCompleted = true;
                        }
                    }
                }

                this.wuCopyButton.set("disabled", !hasSelection)
                this.wuCopyButton.set("iconClass", !hasSelection ? "iconCopyDisabled" : "iconCopy")
                registry.byId(this.id + "Open").set("disabled", !hasSelection);
                registry.byId(this.id + "Delete").set("disabled", !hasNotProtected);
                registry.byId(this.id + "Abort").set("disabled", !hasNotCompleted);
                registry.byId(this.id + "SetToFailed").set("disabled", !hasNotProtected);
                registry.byId(this.id + "Protect").set("disabled", !hasNotProtected);
                registry.byId(this.id + "Unprotect").set("disabled", !hasProtected);

                this.menuProtect.set("disabled", !hasNotProtected);
                this.menuUnprotect.set("disabled", !hasProtected);
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Wuid,
                        closable: true,
                        delayWidget: "WUDetailsWidget",
                        params: params
                    });
                    this.addChild(retVal, 1);
                }
                return retVal;
            }

        });
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

/***/ "./lib/src/Clippy.js":
/*!***************************!*\
  !*** ./lib/src/Clippy.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js"), __webpack_require__(/*! dijit/Tooltip */ "./node_modules/dijit/Tooltip.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/mouse */ "./node_modules/dojo/mouse.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Clipboard, Tooltip, dom, mouse, on, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function attach(domID) {
        var clipboard = new Clipboard("#" + domID);
        clipboard.on("success", function (e) {
            e.clearSelection();
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.Copied, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
        clipboard.on("error", function (e) {
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.PressCtrlCToCopy, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
    }
    exports.attach = attach;
    function attachDomNode(domNode, callback) {
        var clipboard = new Clipboard(domNode, {
            text: function (trigger) { return callback(); }
        });
        clipboard.on("success", function (e) {
            Tooltip.show(nlsHPCC.Copied, domNode);
            on.once(domNode, mouse.leave, function () {
                Tooltip.hide(domNode);
            });
        });
        clipboard.on("error", function (e) {
        });
    }
    exports.attachDomNode = attachDomNode;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=Clippy.js.map

/***/ }),

/***/ "./node_modules/dijit/Toolbar.js":
/*!***************************************!*\
  !*** ./node_modules/dijit/Toolbar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__.dj.c(module.i),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys.LEFT_ARROW keys.RIGHT_ARROW
	__webpack_require__(/*! dojo/ready */ "./node_modules/dojo/ready.js"),
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_KeyNavContainer */ "./node_modules/dijit/_KeyNavContainer.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require, declare, has, keys, ready, _Widget, _KeyNavContainer, _TemplatedMixin){

	// module:
	//		dijit/Toolbar


	// Back compat w/1.6, remove for 2.0
	if(has("dijit-legacy-requires")){
		ready(0, function(){
			var requires = ["dijit/ToolbarSeparator"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return declare("dijit.Toolbar", [_Widget, _TemplatedMixin, _KeyNavContainer], {
		// summary:
		//		A Toolbar widget, used to hold things like `dijit/Editor` buttons

		templateString:
			'<div class="dijit" role="toolbar" tabIndex="${tabIndex}" data-dojo-attach-point="containerNode">' +
			'</div>',

		baseClass: "dijitToolbar",

		_onLeftArrow: function(){
			this.focusPrev();
		},

		_onRightArrow: function(){
			this.focusNext();
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_ListBase.js":
/*!**********************************************!*\
  !*** ./node_modules/dijit/form/_ListBase.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/window */ "./node_modules/dojo/window.js") // winUtils.scrollIntoView
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, on, winUtils){

	// module:
	//		dijit/form/_ListBase

	return declare("dijit.form._ListBase", null, {
		// summary:
		//		Focus-less menu to handle UI events consistently.
		//		Abstract methods that must be defined externally:
		//
		//		- onSelect: item is active (mousedown but not yet mouseup, or keyboard arrow selected but no Enter)
		//		- onDeselect:  cancels onSelect
		// tags:
		//		private

		// selected: DOMNode
		//		currently selected node
		selected: null,

		_listConnect: function(/*String|Function*/ eventType, /*String*/ callbackFuncName){
			// summary:
			//		Connects 'containerNode' to specified method of this object
			//		and automatically registers for 'disconnect' on widget destroy.
			// description:
			//		Provide widget-specific analog to 'connect'.
			//		The callback function is called with the normal event object,
			//		but also a second parameter is passed that indicates which list item
			//		actually received the event.
			// returns:
			//		A handle that can be passed to `disconnect` in order to disconnect
			//		before the widget is destroyed.
			// tags:
			//		private

			var self = this;
			return self.own(on(self.containerNode,
				on.selector(
					function(eventTarget, selector, target){
						return eventTarget.parentNode == target;
					},
					eventType
				),
				function(evt){
					self[callbackFuncName](evt, this);
				}
			));
		},

		selectFirstNode: function(){
			// summary:
			//		Select the first displayed item in the list.
			var first = this.containerNode.firstChild;
			while(first && first.style.display == "none"){
				first = first.nextSibling;
			}
			this._setSelectedAttr(first, true);
		},

		selectLastNode: function(){
			// summary:
			//		Select the last displayed item in the list
			var last = this.containerNode.lastChild;
			while(last && last.style.display == "none"){
				last = last.previousSibling;
			}
			this._setSelectedAttr(last, true);
		},

		selectNextNode: function(){
			// summary:
			//		Select the item just below the current selection.
			//		If nothing selected, select first node.
			var selectedNode = this.selected;
			if(!selectedNode){
				this.selectFirstNode();
			}else{
				var next = selectedNode.nextSibling;
				while(next && next.style.display == "none"){
					next = next.nextSibling;
				}
				if(!next){
					this.selectFirstNode();
				}else{
					this._setSelectedAttr(next, true);
				}
			}
		},

		selectPreviousNode: function(){
			// summary:
			//		Select the item just above the current selection.
			//		If nothing selected, select last node (if
			//		you select Previous and try to keep scrolling up the list).
			var selectedNode = this.selected;
			if(!selectedNode){
				this.selectLastNode();
			}else{
				var prev = selectedNode.previousSibling;
				while(prev && prev.style.display == "none"){
					prev = prev.previousSibling;
				}
				if(!prev){
					this.selectLastNode();
				}else{
					this._setSelectedAttr(prev, true);
				}
			}
		},

		_setSelectedAttr: function(/*DomNode*/ node, /*Boolean*/ scroll){
			// summary:
			//		Does the actual select.
			// node:
			//		The option to select
			// scroll:
			//		If necessary, scroll node into view.  Set to false for mouse/touch to
			//		avoid jumping problems on mobile/RTL, see https://bugs.dojotoolkit.org/ticket/17739.
			if(this.selected != node){
				var selectedNode = this.selected;
				if(selectedNode){
					this.onDeselect(selectedNode);
				}
				if(node){
					if(scroll){
						winUtils.scrollIntoView(node);
					}
					this.onSelect(node);
				}
				this._set("selected", node);
			}else if(node){
				this.onSelect(node);
			}
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_ListMouseMixin.js":
/*!****************************************************!*\
  !*** ./node_modules/dijit/form/_ListMouseMixin.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/touch */ "./node_modules/dojo/touch.js"),
	__webpack_require__(/*! ./_ListBase */ "./node_modules/dijit/form/_ListBase.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, on, touch, _ListBase){

	// module:
	//		dijit/form/_ListMouseMixin

	return declare("dijit.form._ListMouseMixin", _ListBase, {
		// summary:
		//		A mixin to handle mouse or touch events for a focus-less menu
		//		Abstract methods that must be defined externally:
		//
		//		- onClick: item was chosen (mousedown somewhere on the menu and mouseup somewhere on the menu)
		// tags:
		//		private

		postCreate: function(){
			this.inherited(arguments);

			// Add flag to use normalized click handling from dojo/touch
			this.domNode.dojoClick = true;

			this._listConnect("click", "_onClick");
			this._listConnect("mousedown", "_onMouseDown");
			this._listConnect("mouseup", "_onMouseUp");
			this._listConnect("mouseover", "_onMouseOver");
			this._listConnect("mouseout", "_onMouseOut");
		},

		_onClick: function(/*Event*/ evt, /*DomNode*/ target){
			this._setSelectedAttr(target, false);
			if(this._deferredClick){
				this._deferredClick.remove();
			}
			this._deferredClick = this.defer(function(){
				this._deferredClick = null;
				this.onClick(target);
			});
		},

		_onMouseDown: function(/*Event*/ evt, /*DomNode*/ target){
			if(this._hoveredNode){
				this.onUnhover(this._hoveredNode);
				this._hoveredNode = null;
			}
			this._isDragging = true;
			this._setSelectedAttr(target, false);
		},

		_onMouseUp: function(/*Event*/ evt, /*DomNode*/ target){
			this._isDragging = false;
			var selectedNode = this.selected;
			var hoveredNode = this._hoveredNode;
			if(selectedNode && target == selectedNode){
				this.defer(function(){
					this._onClick(evt, selectedNode);
				});
			}else if(hoveredNode){ // drag to select
				this.defer(function(){
					this._onClick(evt, hoveredNode);
				});
			}
		},

		_onMouseOut: function(/*Event*/ evt, /*DomNode*/ target){
			if(this._hoveredNode){
				this.onUnhover(this._hoveredNode);
				this._hoveredNode = null;
			}
			if(this._isDragging){
				this._cancelDrag = (new Date()).getTime() + 1000; // cancel in 1 second if no _onMouseOver fires
			}
		},

		_onMouseOver: function(/*Event*/ evt, /*DomNode*/ target){
			if(this._cancelDrag){
				var time = (new Date()).getTime();
				if(time > this._cancelDrag){
					this._isDragging = false;
				}
				this._cancelDrag = null;
			}
			this._hoveredNode = target;
			this.onHover(target);
			if(this._isDragging){
				this._setSelectedAttr(target, false);
			}
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUQueryWidget.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/WUQueryWidget.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Workunits\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Workunits}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Copy\" data-dojo-props=\"iconClass:'iconCopy',showLabel:false\" data-dojo-type=\"dijit.form.Button\"></div>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}SetToFailed\" data-dojo-attach-event=\"onClick:_onSetToFailed\" data-dojo-type=\"dijit.form.Button\">${i18n.SetToFailed}</div>\n                    <div id=\"${id}Abort\" data-dojo-attach-event=\"onClick:_onAbort\" data-dojo-type=\"dijit.form.Button\">${i18n.Abort}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Protect\" data-dojo-attach-event=\"onClick:_onProtect\" data-dojo-type=\"dijit.form.Button\">${i18n.Protect}</div>\n                    <div id=\"${id}Unprotect\" data-dojo-attach-event=\"onClick:_onUnprotect\" data-dojo-type=\"dijit.form.Button\">${i18n.Unprotect}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <p id=\"${id}ArchivedWarning\" style=\"display:none\">${i18n.ArchivedWarning}</p>\n                        <input id=\"${id}Type\" title=\"${i18n.ArchivedOnly}\" name=\"Type\" colspan=\"2\" data-dojo-attach-event=\"onClick:_onFilterType\" data-dojo-props=\"value:'archived workunits'\" data-dojo-type=\"dijit.form.CheckBox\" />\n                        <input id=\"${id}Wuid\" title=\"${i18n.WUID}:\" name=\"Wuid\" colspan=\"2\" style=\"width:100%\" data-dojo-props=\"trim: true, uppercase: true, placeHolder:'W20130222-171723'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Owner\" title=\"${i18n.Owner}:\" name=\"Owner\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.jsmi}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Jobname\" title=\"${i18n.JobName}:\" name=\"Jobname\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.log_analysis_1}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"Cluster\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Owner}'\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}StateSelect\" title=\"${i18n.State}:\" name=\"State\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Created}'\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}ECL\" title=\"${i18n.ECL}:\" name=\"ECL\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.dataset}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}LogicalFile\" title=\"${i18n.LogicalFile}:\" name=\"LogicalFile\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.somefile}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}LogicalFileSearchType\" title=\"${i18n.LogicalFileType}:\" name=\"LogicalFileSearchType\" colspan=\"2\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}FromDate\" title=\"${i18n.FromDate}:\" name=\"StartDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                        <input id=\"${id}FromTime\" name=\"FromTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 AM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n                        <input id=\"${id}ToDate\" title=\"${i18n.ToDate}:\" name=\"EndDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                        <input id=\"${id}ToTime\" name=\"ToTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 PM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n                        <input id=\"${id}LastNDays\" title=\"${i18n.LastNDays}:\" name=\"LastNDays\" data-dojo-props=\"dtrim: true, placeHolder:'2'\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <img src=\"${dojoConfig.urlInfo.resourcePath}/img/person.png\" style=\"vertical-align: middle\" alt=\"${i18n.Mine}\">\n                    <label for=\"Mine\" class=\"bold\" style=\"vertical-align: middle;\">${i18n.Mine}</label>\n                    <input id=\"${id}Mine\" name=\"Owner\" title=\"${i18n.Mine}\" data-dojo-attach-event=\"onChange:_onMine\" data-dojo-type=\"dijit.form.CheckBox\" />\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                    <div id=\"${id}DownloadToList\" class=\"right\" data-dojo-attach-event=\"onClick:_onDownloadToList\" data-dojo-type=\"dijit.form.Button\">\n                        <span>${i18n.DownloadToCSV}</span>\n                    </div>\n                </div>\n                <div id=\"${id}WorkunitsGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}WorkunitsGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}DownloadToListDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.ExportSelectionsToList}\">\n                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                        <input id=\"${id}FileName\" title=\"${i18n.FileName}:\" name=\"FileName\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <div class=\"dijitDialogPaneActionBar\">\n                        <button id=\"${id}onDownloadSubmit\" data-dojo-attach-event=\"onClick:_buildCSV\" class=\"bottomFormButtons\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                        <button class=\"bottomFormButtons\" data-dojo-attach-event=\"onClick:_onDownloadToListCancelDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownBox.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/form/templates/DropDownBox.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\taria-haspopup=\"true\"\n\tdata-dojo-attach-point=\"_popupStateNode\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"button presentation\" aria-hidden=\"true\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"${type}\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\"\n\t/></div\n></div>\n"

/***/ })

}]);