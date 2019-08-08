(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/GetDFUWorkunitsWidget":"./eclwatch/GetDFUWorkunitsWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/WsTopology":"./lib/src/WsTopology.js",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/GetDFUWorkunitsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GetDFUWorkunitsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[102],{

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

/***/ "./eclwatch/GetDFUWorkunitsWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/GetDFUWorkunitsWidget.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/GetDFUWorkunitsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GetDFUWorkunitsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domClass, domForm, date, on, topic,
    registry, Dialog, Menu, MenuItem, MenuSeparator, PopupMenuItem,
    selector,
    _TabContainerWidget, ESPUtil, ESPDFUWorkunit, FileSpray, DelayLoadWidget, TargetSelectWidget, FilterDropDownWidget, Utility,
    template) {
        return declare("GetDFUWorkunitsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "GetDFUWorkunitsWidget",
            i18n: nlsHPCC,

            workunitsTab: null,
            workunitsGrid: null,
            filter: null,
            clusterTargetSelect: null,
            stateTargetSelect: null,
            username: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.workunitsTab = registry.byId(this.id + "_Workunits");
                this.filter = registry.byId(this.id + "Filter");
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
                this.stateSelect = registry.byId(this.id + "StateSelect");
                this.downloadToList = registry.byId(this.id + "DownloadToList");
                this.downloadToListDialog = registry.byId(this.id + "DownloadToListDialog");
                this.downListForm = registry.byId(this.id + "DownListForm");
                this.fileName = registry.byId(this.id + "FileName");
                this.mineControl = registry.byId(this.id + "Mine");
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

            startup: function (args) {
                this.inherited(arguments);
                this.initContextMenu();
                this._idleWatcher = new ESPUtil.IdleWatcher();
                this._idleWatcher.start();
                var context = this;
                this._idleWatcherHandle = this._idleWatcher.on("idle", function () {
                    context._onRefresh();
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
                    var rowData = [cell.isProtected, cell.ID, cell.CommandMessage, cell.User, cell.JobName, cell.ClusterName, cell.StateMessage, cell.PercentDone];
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
                return this.i18n.title_GetDFUWorkunits;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onOpen: function (event) {
                var selections = this.workunitsGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensurePane(selections[i].ID, {
                        Wuid: selections[i].ID
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
                var list = this.arrayToList(selection, "ID");
                if (confirm(this.i18n.DeleteSelectedWorkunits + "\n" + list)) {
                    var context = this;
                    FileSpray.DFUWorkunitsAction(selection, this.i18n.Delete, {
                        load: function (response) {
                            context.refreshGrid(true);
                        }
                    });
                }
            },

            _onSetToFailed: function (event) {
                FileSpray.DFUWorkunitsAction(this.workunitsGrid.getSelected(), "SetToFailed");
            },

            _onProtect: function (event) {
                FileSpray.DFUWorkunitsAction(this.workunitsGrid.getSelected(), "Protect");
            },

            _onUnprotect: function (event) {
                FileSpray.DFUWorkunitsAction(this.workunitsGrid.getSelected(), "Unprotect");
            },

            _onRowDblClick: function (id) {
                var wuTab = this.ensurePane(id, {
                    Wuid: id
                });
                this.selectChild(wuTab);
            },

            _onRowContextMenu: function (item, colField, mystring) {
                this.menuFilterJobname.set("disabled", false);
                this.menuFilterCluster.set("disabled", false);
                this.menuFilterState.set("disabled", false);

                if (item) {
                    this.menuFilterJobname.set("label", this.i18n.Jobname + ":  " + item.JobName);
                    this.menuFilterJobname.set("hpcc_value", item.JobName);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + item.ClusterName);
                    this.menuFilterCluster.set("hpcc_value", item.ClusterName);
                    this.menuFilterState.set("label", this.i18n.State + ":  " + item.StateMessage);
                    this.menuFilterState.set("hpcc_value", item.StateMessage);
                }
                if (item.Owner === "") {
                    this.menuFilterOwner.set("disabled", true);
                    this.menuFilterOwner.set("label", this.i18n.Owner + ":  " + this.i18n.NA);
                }
                if (item.JobName === "") {
                    this.menuFilterJobname.set("disabled", true);
                    this.menuFilterJobname.set("label", this.i18n.Jobname + ":  " + this.i18n.NA);
                }
                if (item.ClusterName === "") {
                    this.menuFilterCluster.set("disabled", true);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + this.i18n.NA);
                }
                if (item.StateMessage === "") {
                    this.menuFilterState.set("disabled", true);
                    this.menuFilterState.set("label", this.i18n.State + ":  " + this.i18n.NA);
                }
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (this.params.searchResults) {
                    this.filter.disable(true);
                }
                if (params.ClusterName) {
                    registry.byId(this.id + "Cluster").set("value", params.ClusterName);
                }
                this.initContextMenu();
                this.initWorkunitsGrid();
                this.clusterTargetSelect.init({
                    Groups: true,
                    includeBlank: true
                });
                this.stateSelect.init({
                    DFUState: true,
                    includeBlank: true
                });

                var context = this;
                this.filter.on("clear", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                topic.subscribe("hpcc/dfu_wu_created", function (topic) {
                    context.refreshGrid();
                });
                ESPUtil.MonitorVisibility(this.workunitsTab, function (visibility) {
                    if (visibility) {
                        context.refreshGrid();
                    }
                });

                topic.subscribe("hpcc/session_management_status", function (publishedMessage) {
                    if (publishedMessage.status === "Unlocked") {
                        context.refreshGrid();
                        context._idleWatcher.start();
                    } else if (publishedMessage.status === "Locked") {
                        context._idleWatcher.stop();
                    }
                });

                this.userName = dojoConfig.username;
                if (this.userName === null) {
                    this.mineControl.set("disabled", true);
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.workunitsTab.id) {
                    } else {
                        currSel.init(currSel.params);
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
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Open,
                    onClick: function () { context._onOpen(); }
                }));
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Delete,
                    onClick: function () { context._onDelete(); }
                }));
                pMenu.addChild(new MenuItem({
                    label: this.i18n.SetToFailed,
                    onClick: function () { context._onRename(); }
                }));
                pMenu.addChild(new MenuSeparator());
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Protect,
                    onClick: function () { context._onProtect(); }
                }));
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Unprotect,
                    onClick: function () { context._onUnprotect(); }
                }));
                pMenu.addChild(new MenuSeparator());
                {
                    var pSubMenu = new Menu();
                    /*this.menuFilterType = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context._onFilterClear(null, true);
                            registry.byId(context.id + "Type").set("value", context.menuFilterType.get("hpcc_value"));
                            context.applyFilter();
                        }
                    });
                    this.menuFilterOwner = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context._onFilterClear(null, true);
                            registry.byId(context.id + "Owner").set("value", context.menuFilterOwner.get("hpcc_value"));
                            context.applyFilter();
                        }
                    });*/
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
                var store = this.params.searchResults ? this.params.searchResults : new ESPDFUWorkunit.CreateWUQueryStore();
                this.workunitsGrid = new declare([ESPUtil.Grid(true, true)])({
                    store: store,
                    query: this.filter.toObject(),
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        isProtected: {
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
                        ID: {
                            label: this.i18n.ID,
                            width: 180,
                            formatter: function (ID, idx) {
                                var wu = ESPDFUWorkunit.Get(ID);
                                return "<img src='" + wu.getStateImage() + "'>&nbsp;<a href='#' class='dgrid-row-url'>" + ID + "</a>";
                            }
                        },
                        Command: {
                            label: this.i18n.Type,
                            width: 117,
                            formatter: function (command) {
                                if (command in FileSpray.CommandMessages) {
                                    return FileSpray.CommandMessages[command];
                                }
                                return "Unknown";
                            }
                        },
                        User: { label: this.i18n.Owner, width: 90 },
                        JobName: { label: this.i18n.JobName },
                        ClusterName: { label: this.i18n.Cluster, width: 126 },
                        StateMessage: { label: this.i18n.State, width: 72 },
                        PercentDone: { label: this.i18n.PctComplete, width: 90, sortable: false }
                    }
                }, this.id + "WorkunitsGrid");
                this.workunitsGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item.ID);
                    }
                });
                this.workunitsGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item.ID);
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
                ESPUtil.goToPageUserPreference(this.workunitsGrid, "GetDFUWorkunitsWidget");
                this.workunitsGrid.startup();
            },

            refreshGrid: function (clearSelection) {
                this.workunitsGrid.set("query", this.filter.toObject());
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
                for (var i = 0; i < selection.length; ++i) {
                    hasSelection = true;
                    if (selection[i] && selection[i].isProtected && selection[i].isProtected !== false) {
                        hasProtected = true;
                    } else {
                        hasNotProtected = true;
                    }
                    if (selection[i] && selection[i].State && selection[i].State === 5) {
                        hasFailed = true;
                    } else {
                        hasNotFailed = true;
                    }
                }

                registry.byId(this.id + "Open").set("disabled", !hasSelection);
                registry.byId(this.id + "Delete").set("disabled", !hasNotProtected);
                registry.byId(this.id + "SetToFailed").set("disabled", !hasNotProtected);
                registry.byId(this.id + "Protect").set("disabled", !hasNotProtected);
                registry.byId(this.id + "Unprotect").set("disabled", !hasProtected);
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Wuid,
                        closable: true,
                        delayWidget: "DFUWUDetailsWidget",
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GetDFUWorkunitsWidget.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GetDFUWorkunitsWidget.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Workunits\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"Workunits\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <div id=\"${id}SetToFailed\" data-dojo-attach-event=\"onClick:_onSetToFailed\" data-dojo-type=\"dijit.form.Button\">${i18n.SetToFailed}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Protect\" data-dojo-attach-event=\"onClick:_onProtect\" data-dojo-type=\"dijit.form.Button\">${i18n.Protect}</div>\n                    <div id=\"${id}Unprotect\" data-dojo-attach-event=\"onClick:_onUnprotect\" data-dojo-type=\"dijit.form.Button\">${i18n.Unprotect}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <input id=\"${id}Type\" title=\"${i18n.ArchivedOnly}\" name=\"Type\" colspan=\"2\" data-dojo-props=\"value:'archived workunits'\" data-dojo-type=\"dijit.form.CheckBox\" />\n                        <input id=\"${id}Wuid\" title=\"${i18n.WUID}:\" name=\"Wuid\" colspan=\"2\" data-dojo-props=\"trim: true, uppercase: true, placeHolder:'D20130222-171723'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Owner\" title=\"${i18n.Owner}:\" name=\"Owner\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.JSmith}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Jobname\" title=\"${i18n.Jobname}:\" name=\"Jobname\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.log_analysis_1}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"Cluster\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.ClusterPlaceholder}'\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}StateSelect\" title=\"${i18n.State}\" name=\"StateReq\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.Created}'\" data-dojo-type=\"TargetSelectWidget\" />\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <img src=\"${dojoConfig.urlInfo.resourcePath}/img/person.png\" style=\"vertical-align: middle\" alt=\"${i18n.Mine}\">\n                    <label for=\"Mine\" class=\"bold\" style=\"vertical-align: middle;\">${i18n.Mine}</label>\n                    <input id=\"${id}Mine\" name=\"Owner\" title=\"${i18n.Mine}\" data-dojo-attach-event=\"onChange:_onMine\" data-dojo-type=\"dijit.form.CheckBox\"/>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                    <div id=\"${id}DownloadToList\" class=\"right\" data-dojo-attach-event=\"onClick:_onDownloadToList\" data-dojo-type=\"dijit.form.Button\">\n                        <span>${i18n.DownloadToCSV}</span>\n                    </div>\n                </div>\n                <div id=\"${id}WorkunitsGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}WorkunitsGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}DownloadToListDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.ExportSelectionsToList}\">\n                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                        <input id=\"${id}FileName\" title=\"${i18n.FileName}:\" name=\"FileName\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <div class=\"dijitDialogPaneActionBar\">\n                        <button id=\"${id}onDownloadSubmit\" data-dojo-attach-event=\"onClick:_buildCSV\" class=\"bottomFormButtons\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                        <button class=\"bottomFormButtons\" data-dojo-attach-event=\"onClick:_onDownloadToListCancelDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);