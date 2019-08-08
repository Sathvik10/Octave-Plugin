(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/QuerySetQueryWidget":"./eclwatch/QuerySetQueryWidget.js",
	"hpcc/SelectionGridWidget":"./eclwatch/SelectionGridWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/QuerySetQueryWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetQueryWidget.html",
	"dojo/text!templates/SelectionGridWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[140],{

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

/***/ "./eclwatch/QuerySetQueryWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/QuerySetQueryWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! hpcc/SelectionGridWidget */ "./eclwatch/SelectionGridWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/QuerySetQueryWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetQueryWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),

    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, on, topic, arrayUtil, domForm, topic,
    registry, Menu, MenuItem, MenuSeparator, PopupMenuItem,
    selector,
    _TabContainerWidget, DelayLoadWidget, WsWorkunits, ESPQuery, ESPUtil, Utility, SelectionGridWidget,
    template) {
        return declare("QuerySetQueryWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "QuerySetQueryWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            queriesTab: null,
            querySetGrid: null,
            recreateQueriesGrid: null,
            clusterTargetSelect: null,
            recreateQueryTargetSelect: null,
            filter: null,

            initalized: false,
            loaded: false,
            userName: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            _onMine: function (event) {
                if (event) {
                    this.filter.setValue(this.id + "PublishedBy", this.userName);
                    this.filter._onFilterApply();
                } else {
                    this.filter._onFilterClear();
                    this.filter._onFilterApply();
                }
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.queriesTab = registry.byId(this.id + "_PublishedQueries");
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
                this.recreateQueryTargetSelect = registry.byId(this.id + "RecreateTargetSelect");
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.filter = registry.byId(this.id + "Filter");
                this.downloadToList = registry.byId(this.id + "DownloadToList");
                this.downloadToListDialog = registry.byId(this.id + "DownloadToListDialog");
                this.downListForm = registry.byId(this.id + "DownListForm");
                this.fileName = registry.byId(this.id + "CSVFileName");
                this.recreateQueriesGrid = registry.byId(this.id + "RecreateQueriesGrid");
                this.recreateForm = registry.byId(this.id + "RecreateForm");
                this.mineControl = registry.byId(this.id + "Mine");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initContextMenu();
            },

            _onDownloadToListCancelDialog: function (event) {
                this.downloadToListDialog.hide();
            },

            _onDownloadToList: function (event) {
                this.downloadToListDialog.show();
            },

            _buildCSV: function (event) {
                var selections = this.querySetGrid.getSelected();
                var row = [];
                var fileName = this.fileName.get("value") + ".csv";

                arrayUtil.forEach(selections, function (cell, idx) {
                    var rowData = [cell.Suspended, cell.ErrorCount, cell.MixedNodeStates, cell.Activated, cell.Id, cell.Name, cell.QuerySetId, cell.Wuid, cell.Dll, cell.PublishedBy, cell.Status];
                    row.push(rowData);
                });

                Utility.downloadToCSV(this.querySetGrid, row, fileName);
                this._onDownloadToListCancelDialog();
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

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

                if (params.Wuid) {
                    this.filter.setValue(this.id + "Wuid", params.Wuid);
                } else if (params.LogicalName) {
                    this.filter.setValue(this.id + "FileName", params.LogicalName);
                }
                this.initQuerySetGrid();

                var context = this;
                this.filter.on("clear", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                topic.subscribe("hpcc/ecl_wu_published", function (topic) {
                    context.refreshGrid();
                });

                this.userName = dojoConfig.username;
                if (this.userName === null) {
                    this.mineControl.set("disabled", true);
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.queriesTab.id) {
                        this.refreshGrid();
                    } else {
                        currSel.init(currSel.hpcc.params);
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
                    targetNodeIds: [this.id + "QuerySetGrid"]
                });
                this.menuOpen = this.addMenuItem(pMenu, {
                    label: this.i18n.Open,
                    onClick: function () { context._onOpen(); }
                });
                this.menuDelete = this.addMenuItem(pMenu, {
                    label: this.i18n.Delete,
                    onClick: function () { context._onDelete(); }
                });
                pMenu.addChild(new MenuSeparator());
                this.menuUnsuspend = this.addMenuItem(pMenu, {
                    label: this.i18n.Unsuspend,
                    onClick: function () { context._onUnsuspend(); }
                });
                this.menuSuspend = this.addMenuItem(pMenu, {
                    label: this.i18n.Suspend,
                    onClick: function () { context._onSuspend(); }
                });
                pMenu.addChild(new MenuSeparator());
                this.menuActivate = this.addMenuItem(pMenu, {
                    label: this.i18n.Activate,
                    onClick: function () { context._onActivate(); }
                });
                this.menuDeactivate = this.addMenuItem(pMenu, {
                    label: this.i18n.Deactivate,
                    onClick: function () { context._onDeactivate(); }
                });
                pMenu.addChild(new MenuSeparator());
                {
                    var pSubMenu = new Menu();

                    this.menuFilterCluster = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "ClusterTargetSelect", context.menuFilterCluster.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterSuspended = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "SuspendedStates", context.menuFilterSuspended.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterUnsuspend = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "SuspendedStates", context.menuFilterUnsuspend.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterActive = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "ActiveStates", context.menuFilterActive.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterDeactivate = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "ActiveStates", context.menuFilterDeactivate.get("hpcc_value"));
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

            /*Not Applicable*/
            _onRowContextMenu: function (item, colField, mystring) {
                this.menuFilterCluster.set("disabled", false);
                this.menuFilterSuspended.set("disabled", false);
                this.menuFilterUnsuspend.set("disabled", false);
                this.menuFilterActive.set("disabled", false);
                this.menuFilterDeactivate.set("disabled", false);

                if (item) {
                    this.menuFilterCluster.set("label", "Cluster: " + item.QuerySetId);
                    this.menuFilterCluster.set("hpcc_value", item.QuerySetId);
                    this.menuFilterSuspended.set("label", this.i18n.Suspended + ":  " + item.Suspended);
                    this.menuFilterSuspended.set("hpcc_value", 1);
                    this.menuFilterUnsuspend.set("label", this.i18n.Unsuspended + ":  true ");
                    this.menuFilterUnsuspend.set("hpcc_value", 0);
                    this.menuFilterActive.set("label", this.i18n.Active + ":  " + item.Activated);
                    this.menuFilterActive.set("hpcc_value", 1);
                    this.menuFilterDeactivate.set("label", this.i18n.Inactive + ":  true");
                    this.menuFilterDeactivate.set("hpcc_value", 0);
                }
                if (item.Cluster === "") {
                    this.menuFilterCluster.set("disabled", true);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + this.i18n.NA);
                }
                if (item.Suspended === false) {
                    this.menuFilterSuspended.set("disabled", true);
                    this.menuFilterSuspended.set("label", this.i18n.Suspended + ":  " + this.i18n.NA);
                }
                if (item.Suspended === true) {
                    this.menuFilterUnsuspend.set("disabled", true);
                    this.menuFilterUnsuspend.set("label", this.i18n.Unsuspended + ":  " + this.i18n.NA);
                }
                if (item.Activated === false) {
                    this.menuFilterActive.set("disabled", true);
                    this.menuFilterActive.set("label", this.i18n.Active + ":  " + this.i18n.NA);
                }
                if (item.Activated === true) {
                    this.menuFilterDeactivate.set("disabled", true);
                    this.menuFilterDeactivate.set("label", this.i18n.Inactive + ":  " + this.i18n.NA);
                }
            },

            initQuerySetGrid: function (params) {
                var context = this;
                var store = this.params.searchResults ? this.params.searchResults : ESPQuery.CreateQueryStore();
                this.querySetGrid = new declare([ESPUtil.Grid(true, true)])({
                    store: store,
                    query: this.getGridQuery(),
                    sort: [{ attribute: "Id" }],
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        Suspended: {
                            label: this.i18n.Suspended,
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("suspended.png", context.i18n.Suspended);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (suspended) {
                                if (suspended === true) {
                                    return Utility.getImageHTML("suspended.png");
                                }
                                return "";
                            }
                        },
                        ErrorCount: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("errwarn.png", context.i18n.ErrorWarnings);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (error) {
                                if (error > 0) {
                                    return Utility.getImageHTML("errwarn.png");
                                }
                                return "";
                            }
                        },
                        MixedNodeStates: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("mixwarn.png", context.i18n.MixedNodeStates);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (mixed) {
                                if (mixed === true) {
                                    return Utility.getImageHTML("mixwarn.png");
                                }
                                return "";
                            }
                        },
                        Activated: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("active.png", context.i18n.Active);
                            },
                            width: 25,
                            formatter: function (activated) {
                                if (activated === true) {
                                    return Utility.getImageHTML("active.png");
                                }
                                return Utility.getImageHTML("inactive.png");
                            }
                        },
                        Id: {
                            label: this.i18n.ID,
                            width: 380,
                            formatter: function (Id, idx) {
                                return "<a href='#' class='dgrid-row-url'>" + Id + "</a>";
                            }
                        },
                        Name: {
                            label: this.i18n.Name
                        },
                        QuerySetId: {
                            width: 140,
                            label: this.i18n.Target,
                            sortable: true
                        },
                        Wuid: {
                            width: 160,
                            label: this.i18n.WUID,
                            formatter: function (Wuid, idx) {
                                return "<a href='#' class='dgrid-row-url2'>" + Wuid + "</a>";
                            }
                        },
                        Dll: {
                            width: 180,
                            label: this.i18n.Dll
                        },
                        PublishedBy: {
                            width: 100,
                            label: this.i18n.PublishedBy,
                            sortable: false
                        },
                        Status: {
                            width: 100,
                            label: this.i18n.Status,
                            sortable: false
                        }
                    }
                }, this.id + "QuerySetGrid");
                this.querySetGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.querySetGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.querySetGrid.on(".dgrid-row-url2:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.querySetGrid.row(evt).data;
                        context._onRowDblClick(item, true);
                    }
                });
                this.querySetGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.querySetGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.querySetGrid.on(".dgrid-row:contextmenu", function (evt) {
                    if (context._onRowContextMenu) {
                        var item = context.querySetGrid.row(evt).data;
                        var cell = context.querySetGrid.cell(evt);
                        var colField = cell.column.field;
                        var mystring = "item." + colField;
                        context._onRowContextMenu(item, colField, mystring);
                    }
                });
                this.querySetGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                    var selection = context.querySetGrid.getSelected();
                    if (selection.length > 0) {
                        context.downloadToList.set("disabled", false);
                    } else {
                        context.downloadToList.set("disabled", true);
                    }
                });
                ESPUtil.goToPageUserPreference(this.querySetGrid, "QuerySetQueryWidget");
                this.querySetGrid.startup();

                this.recreateQueriesGrid.createGrid({
                    idProperty: "Name",
                    columns: {
                        Name: {
                            label: this.i18n.ID
                        },
                        QuerySetId: {
                            label: this.i18n.Target
                        }
                    }
                });

                this.refreshActionState();
            },

            refreshActionState: function () {
                var selection = this.querySetGrid.getSelected();
                var data = [];
                var hasSelection = false;
                var isSuspended = false;
                var isNotSuspended = false;
                var isActive = false;
                var isNotActive = false;
                for (var i = 0; i < selection.length; ++i) {
                    hasSelection = true;
                    if (selection[i].Suspended !== true) {
                        isSuspended = true;
                    } else {
                        isNotSuspended = true;
                    }
                    if (selection[i].Activated !== true) {
                        isActive = true;
                    } else {
                        isNotActive = true;
                    }
                }

                registry.byId(this.id + "Delete").set("disabled", !hasSelection);
                registry.byId(this.id + "UnSuspend").set("disabled", !isNotSuspended);
                registry.byId(this.id + "OnSuspend").set("disabled", !isSuspended);
                registry.byId(this.id + "Activate").set("disabled", !isActive);
                registry.byId(this.id + "Deactivate").set("disabled", !isNotActive);
                registry.byId(this.id + "Open").set("disabled", !hasSelection);
                registry.byId(this.id + "RecreateQueryDropDown").set("disabled", !hasSelection);

                this.menuUnsuspend.set("disabled", !isNotSuspended);
                this.menuSuspend.set("disabled", !isSuspended);
                this.menuActivate.set("disabled", !isActive);
                this.menuDeactivate.set("disabled", !isNotActive);

                if (hasSelection) {
                    arrayUtil.forEach(selection, function (item, idx) {
                        data.push(item);
                    });
                    this.recreateQueriesGrid.setData(data);
                }
            },

            _onRefresh: function (params) {
                this.refreshGrid();
            },

            _onRecreateQueriesSuccess: function (status) {
                var context = this;
                if (status) {
                    dojo.publish("hpcc/brToaster", {
                        Severity: "Message",
                        Source: "WsWorkunits.WURecreateQuery",
                        Exceptions: [{ Source: context.i18n.RecreateQuery, Message: context.i18n.SuccessfullySaved }]
                    });
                }
            },

            _onRecreateQueries: function () {
                if (this.recreateForm.validate()) {
                    var context = this;
                    var success = false;
                    arrayUtil.forEach(this.recreateQueriesGrid.store.data, function (item, idx) {
                        var request = domForm.toObject(context.id + "RecreateForm");
                        request.Republish === "on" ? request.Republish = 0 : request.Republish = 1;
                        request.AllowForeignFiles === "off" ? request.AllowForeignFiles = 0 : request.AllowForeignFiles = 1;
                        request.UpdateDfs === "off" ? request.UpdateDfs = 0 : request.UpdateDfs = 1;
                        request.UpdateSuperFiles === "off" ? request.UpdateSuperFiles = 0 : request.UpdateSuperFiles = 1;
                        request.QueryId = item.Name;
                        request.Target = item.QuerySetId;
                        request.IncludeFileErrors = 1;
                        WsWorkunits.WURecreateQuery({
                            request: request
                        }).then(function (response) {
                            if (lang.exists("WURecreateQueryResponse.Wuid", response)) {
                                success = true;
                            }
                            context._onRecreateQueriesSuccess(success);
                        });
                    });
                    registry.byId(this.id + "RecreateQueryDropDown").closeDropDown();
                }
            },

            _onDelete: function () {
                var selection = this.querySetGrid.getSelected();
                var list = this.arrayToList(selection, "Id");
                if (confirm(this.i18n.DeleteSelectedQueries + "\n" + list)) {
                    var context = this;
                    WsWorkunits.WUQuerysetQueryAction(selection, "Delete").then(function (response) {
                        context.refreshGrid(true);
                    });
                }
            },

            refreshGrid: function (clearSelection) {
                this.querySetGrid.set("query", this.getGridQuery());
                if (clearSelection) {
                    this.querySetGrid.clearSelection();
                }
            },

            _onSuspend: function () {
                var context = this;
                WsWorkunits.WUQuerysetQueryAction(this.querySetGrid.getSelected(), "Suspend").then(function (response) {
                    context.refreshGrid();
                });
            },

            _onUnsuspend: function () {
                var context = this;
                WsWorkunits.WUQuerysetQueryAction(this.querySetGrid.getSelected(), "Unsuspend").then(function (response) {
                    context.refreshGrid();
                });
            },

            _onActivate: function () {
                var context = this;
                WsWorkunits.WUQuerysetQueryAction(this.querySetGrid.getSelected(), "Activate").then(function (response) {
                    context.refreshGrid();
                });
            },

            _onDeactivate: function () {
                var context = this;
                WsWorkunits.WUQuerysetQueryAction(this.querySetGrid.getSelected(), "Deactivate").then(function (response) {
                    context.refreshGrid();
                });
            },

            _onOpen: function () {
                var selections = this.querySetGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensurePane(selections[i].Id, selections[i]);
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab);
                }
            },

            _onSetOptions: function (event) {
                if (registry.byId(this.id + "OptionsForm").validate()) {
                    this.refreshGrid();
                    registry.byId(this.id + "Options").closeDropDown();
                }
            },


            _onRowDblClick: function (item, workunitTab) {
                var tab = null;
                if (workunitTab) {
                    tab = this.ensurePane(item.Wuid, item, true);
                } else {
                    tab = this.ensurePane(item.Id, item, false);
                }
                this.selectChild(tab);
            },

            getGridQuery: function () {
                if (this.params.searchResults) {
                    return {};
                }
                var optionsForm = registry.byId(this.id + "OptionsForm");
                var optionsValues = optionsForm.getValues();
                return lang.mixin(this.filter.toObject(), optionsValues);
            },

            ensurePane: function (id, params, workunitTab) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    if (workunitTab) {
                        retVal = new DelayLoadWidget({
                            id: id,
                            title: params.Wuid,
                            closable: true,
                            delayWidget: "WUDetailsWidget",
                            hpcc: {
                                type: "WUDetailsWidget",
                                params: {
                                    Wuid: params.Wuid
                                }
                            }
                        });
                    } else {
                        retVal = new DelayLoadWidget({
                            id: id,
                            title: params.Id,
                            closable: true,
                            delayWidget: "QuerySetDetailsWidget",
                            hpcc: {
                                type: "QuerySetDetailsWidget",
                                params: {
                                    QuerySetId: params.QuerySetId,
                                    Id: params.Id
                                }
                            }
                        });
                    }
                    this.addChild(retVal, 1);
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetQueryWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/QuerySetQueryWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_PublishedQueries\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.title_QuerySetQuery}', iconClass:'iconCluster'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}QueryToolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-type=\"dijit.form.Button\" data-dojo-props='iconClass:\"iconRefresh\"'>${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}OnSuspend\" data-dojo-attach-event=\"onClick:_onSuspend\" data-dojo-type=\"dijit.form.Button\">${i18n.Suspend}</div>\n                    <div id=\"${id}UnSuspend\" data-dojo-attach-event=\"onClick:_onUnsuspend\" data-dojo-type=\"dijit.form.Button\">${i18n.Unsuspend}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Activate\" data-dojo-attach-event=\"onClick:_onActivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Activate}</div>\n                    <div id=\"${id}Deactivate\" data-dojo-attach-event=\"onClick:_onDeactivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Deactivate}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <input id=\"${id}QueryID\" title=\"${i18n.ID}:\" name=\"QueryID\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder: '${i18n.QueryIDPlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}QueryName\" title=\"${i18n.Name}:\" name=\"QueryName\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder: '${i18n.QueryNamePlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}PublishedBy\" title=\"${i18n.PublishedBy}:\" name=\"PublishedBy\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder: '${i18n.PublishedBy}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Wuid\" title=\"${i18n.WUID}:\" name=\"WUID\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'W20130222-171723'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"QuerySetName\" colspan=\"2\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}FileName\" title=\"${i18n.LogicalFile}:\" name=\"FileName\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder: '${i18n.TargetNamePlaceholder}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}LibraryName\" title=\"${i18n.LibrariesUsed}:\" name=\"LibraryName\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <select id=\"${id}SuspendedStates\" title=\"${i18n.Suspended}:\" name=\"SuspendedByUser\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                            <option value=\"\" selected=\"selected\">${i18n.All}</option>\n                            <option value=\"1\">${i18n.SuspendedByUser}</option>\n                            <option value=\"0\">${i18n.NotSuspendedbyUser}</option>\n                        </select>\n                        <select id=\"${id}ActiveStates\" title=\"${i18n.Active}:\" name=\"Activated\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                            <option value=\"\" selected=\"selected\">${i18n.All}</option>\n                            <option value=\"1\">${i18n.Active}</option>\n                            <option value=\"0\">${i18n.NotActive}</option>\n                        </select>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Options\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Options}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}OptionsForm\" style=\"width: 530px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <select id=\"${id}CheckAllNodes\" title=\"${i18n.Status}:\" name=\"CheckAllNodes\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                        <option value=\"0\" selected=\"selected\">${i18n.CheckSingleNode}</option>\n                                        <option value=\"1\">${i18n.CheckAllNodes}</option>\n                                    </select>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSetOptions\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}RecreateQueryDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.RecreateQuery}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}RecreateForm\" style=\"width: 530px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Queries}</legend>\n                                    <div id=\"${id}RecreateQueriesGrid\" data-dojo-type=\"SelectionGridWidget\"></div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}RemoteDali\" title=\"${i18n.RemoteDali}:\" name=\"RemoteDali\" colspan=\"2\" style=\"width:100%\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input id=\"${id}SourceProcess\" title=\"${i18n.SourceProcess}:\" name=\"SourceProcess\" colspan=\"2\" style=\"width:100%\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                        <input id=\"${id}AllowForeignFiles\" title=\"${i18n.AllowForeignFiles}:\" name=\"AllowForeignFiles\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}UpdateDFs\" title=\"${i18n.UpdateDFs}:\" name=\"UpdateDfs\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}UpdateSuperFiles\" title=\"${i18n.UpdateSuperFiles}:\" name=\"UpdateSuperFiles\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}SetRepublish\" title=\"${i18n.DoNotRepublish}:\" name=\"Republish\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onRecreateQueries\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <img src=\"${dojoConfig.urlInfo.resourcePath}/img/person.png\" style=\"vertical-align: middle\" alt=\"${i18n.Mine}\">\n                    <label for=\"Mine\" class=\"bold\" style=\"vertical-align: middle;\">${i18n.PublishedByMe}</label>\n                    <input id=\"${id}Mine\" name=\"PublishedBy\" title=\"${i18n.Mine}\" data-dojo-attach-event=\"onChange:_onMine\" data-dojo-type=\"dijit.form.CheckBox\"/>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                    <div id=\"${id}DownloadToList\" class=\"right\" data-dojo-attach-event=\"onClick:_onDownloadToList\" data-dojo-type=\"dijit.form.Button\">\n                        <span>${i18n.DownloadToCSV}</span>\n                    </div>\n                </div>\n                <div id=\"${id}GridCP\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}QuerySetGrid\"></div>\n                </div>\n                <div id=\"${id}DownloadToListDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.ExportSelectionsToList}\">\n                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                        <input id=\"${id}CSVFileName\" title=\"${i18n.FileName}:\" name=\"FileName\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <div class=\"dijitDialogPaneActionBar\">\n                        <button id=\"${id}onDownloadSubmit\" data-dojo-attach-event=\"onClick:_buildCSV\" class=\"bottomFormButtons\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                        <button class=\"bottomFormButtons\" data-dojo-attach-event=\"onClick:_onDownloadToListCancelDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div><!--end of border container-->\n</div>"

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