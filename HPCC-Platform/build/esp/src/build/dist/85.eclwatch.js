(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DiskUsageWidget":"./eclwatch/DiskUsageWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"src/ESPBase":"./lib/src/ESPBase.js",
	"src/WsDfu":"./lib/src/WsDfu.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dijit/form/_ListBase":"./node_modules/dijit/form/_ListBase.js",
	"dijit/form/_ListMouseMixin":"./node_modules/dijit/form/_ListMouseMixin.js",
	"dojo/text!templates/DiskUsageWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageWidget.html",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!dijit/form/templates/DropDownBox.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownBox.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[85],{

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

/***/ "./eclwatch/DiskUsageWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/DiskUsageWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/WsDfu */ "./lib/src/WsDfu.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/DiskUsageWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, on,
    registry,
    selector,
    _Widget, WsDfu, ESPUtil, FilterDropDownWidget,
    template) {
        return declare("DiskUsageWidget", [_Widget, ESPUtil.FormHelper], {
            templateString: template,
            baseClass: "DiskUsageWidget",
            i18n: nlsHPCC,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filter = registry.byId(this.id + "Filter");
            },

            resize: function (args) {
                this.inherited(arguments);
                this.widget.BorderContainer.resize();
            },

            getTitle: function () {
                return this.i18n.title_DiskUsage;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.initDiskUsageGrid();

                this.filter.refreshState();
                var context = this;
                this.filter.on("clear", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.refreshGrid();
            },

            initDiskUsageGrid: function () {
                var store = new WsDfu.CreateDiskUsageStore();
                this.diskUsageGrid = new declare([ESPUtil.Grid(false, true)])({
                    store: store,
                    query: this.getFilter(),
                    columns: {
                        Name: { label: this.i18n.Grouping, width: 90, sortable: true },
                        NumOfFiles: { label: this.i18n.FileCounts, width: 90, sortable: true },
                        TotalSize: { label: this.i18n.TotalSize, width: 90, sortable: true },
                        LargestFile: { label: this.i18n.LargestFile, sortable: true },
                        LargestSize: { label: this.i18n.LargestSize, width: 90, sortable: true },
                        SmallestFile: { label: this.i18n.SmallestFile, sortable: true },
                        SmallestSize: { label: this.i18n.SmallestSize, width: 90, sortable: true },
                        NumOfFilesUnknown: { label: this.i18n.FilesWithUnknownSize, width: 90, sortable: true }
                    }
                }, this.id + "DiskUsageGrid");
            },

            getFilter: function () {
                var retVal = this.filter.toObject();
                lang.mixin(retVal, {
                    StartDate: this.getISOString("FromDate", "FromTime"),
                    EndDate: this.getISOString("ToDate", "ToTime")
                });
                return retVal;
            },

            refreshGrid: function (clearSelection) {
                this.diskUsageGrid.set("query", this.getFilter());
                if (clearSelection) {
                    this.diskUsageGrid.clearSelection();
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

/***/ "./lib/src/ESPBase.js":
/*!****************************!*\
  !*** ./lib/src/ESPBase.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/config */ "./node_modules/dojo/_base/config.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, config) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ESPBase = /** @class */ (function () {
        function ESPBase(args) {
            if (args) {
                declare.safeMixin(this, args);
            }
        }
        ESPBase.prototype.getParam = function (key) {
            var value = dojo.queryToObject(dojo.doc.location.search.substr((dojo.doc.location.search.substr(0, 1) === "?" ? 1 : 0)))[key];
            if (value)
                return value;
            return config[key];
        };
        ESPBase.prototype.getBaseURL = function (service) {
            if (!service) {
                service = "WsWorkunits";
            }
            var serverIP = this.getParam("serverIP");
            if (serverIP)
                return "http://" + serverIP + ":8010/" + service;
            return "/" + service;
        };
        ESPBase.prototype.getValue = function (domXml, tagName, knownObjectArrays) {
            var retVal = this.getValues(domXml, tagName, knownObjectArrays);
            if (retVal.length === 0) {
                return null;
            }
            else if (retVal.length !== 1) {
                alert("Invalid length:  " + retVal.length);
            }
            return retVal[0];
        };
        ESPBase.prototype.getValues = function (domXml, tagName, knownObjectArrays) {
            var retVal = [];
            var items = domXml.getElementsByTagName(tagName);
            var parentNode = items.length ? items[0].parentNode : null; //  Prevent <Dataset><row><field><row> scenario
            for (var i = 0; i < items.length; ++i) {
                if (items[i].parentNode === parentNode)
                    retVal.push(this.flattenXml(items[i], knownObjectArrays));
            }
            return retVal;
        };
        ESPBase.prototype.flattenXml = function (domXml, knownObjectArrays) {
            var retValArr = [];
            var retValStr = "";
            var retVal = {};
            for (var i = 0; i < domXml.childNodes.length; ++i) {
                var childNode = domXml.childNodes[i];
                if (childNode.childNodes) {
                    if (childNode.nodeName && knownObjectArrays != null && dojo.indexOf(knownObjectArrays, childNode.nodeName) >= 0) {
                        retValArr.push(this.flattenXml(childNode, knownObjectArrays));
                    }
                    else if (childNode.nodeName === "#text") {
                        retValStr += childNode.nodeValue;
                    }
                    else if (childNode.childNodes.length === 0) {
                        retVal[childNode.nodeName] = null;
                    }
                    else {
                        var value = this.flattenXml(childNode, knownObjectArrays);
                        if (retVal[childNode.nodeName] == null) {
                            retVal[childNode.nodeName] = value;
                        }
                        else if (dojo.isArray(retVal[childNode.nodeName])) {
                            retVal[childNode.nodeName].push(value);
                        }
                        else if (dojo.isObject(retVal[childNode.nodeName])) {
                            var tmp = retVal[childNode.nodeName];
                            retVal[childNode.nodeName] = [];
                            retVal[childNode.nodeName].push(tmp);
                            retVal[childNode.nodeName].push(value);
                        }
                    }
                }
            }
            if (retValArr.length)
                return retValArr;
            else if (retValStr.length)
                return retValStr;
            return retVal;
        };
        return ESPBase;
    }());
    exports.default = ESPBase;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPBase.js.map

/***/ }),

/***/ "./lib/src/WsDfu.js":
/*!**************************!*\
  !*** ./lib/src/WsDfu.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojox/xml/parser */ "./node_modules/dojox/xml/parser.js"), __webpack_require__(/*! ./ESPBase */ "./lib/src/ESPBase.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Memory, Observable, QueryResults, topic, Deferred, parser, ESPBase_1, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiskUsageStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        query: function (query, options) {
            switch (query.CountBy) {
                case "Year":
                case "Quarter":
                case "Month":
                case "Day":
                    query.Interval = query.CountBy;
                    query.CountBy = "Date";
                    break;
            }
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            DFUSpace({
                request: query
            }).then(lang.hitch(this, function (response) {
                var data = [];
                if (lang.exists("DFUSpaceResponse.DFUSpaceItems.DFUSpaceItem", response)) {
                    arrayUtil.forEach(response.DFUSpaceResponse.DFUSpaceItems.DFUSpaceItem, function (item, idx) {
                        data.push(lang.mixin(item, {
                            __hpcc_id: item.Name
                        }));
                    }, this);
                }
                if (options.sort && options.sort.length) {
                    data.sort(function (_l, _r) {
                        var l = _l[options.sort[0].attribute];
                        var r = _r[options.sort[0].attribute];
                        if (l === r) {
                            return 0;
                        }
                        switch (options.sort[0].attribute) {
                            case "TotalSize":
                            case "LargestSize":
                            case "SmallestSize":
                            case "NumOfFiles":
                            case "NumOfFilesUnknown":
                                l = parseInt(l.split(",").join(""));
                                r = parseInt(r.split(",").join(""));
                        }
                        if (options.sort[0].descending) {
                            return r < l ? -1 : 1;
                        }
                        return l < r ? -1 : 1;
                    });
                }
                this.setData(data);
                deferredResults.resolve(data);
                deferredResults.total.resolve(data.length);
            }));
            return QueryResults(deferredResults);
        }
    });
    function CreateDiskUsageStore() {
        var store = new DiskUsageStore();
        return Observable(store);
    }
    exports.CreateDiskUsageStore = CreateDiskUsageStore;
    function DFUArrayAction(logicalFiles, actionType) {
        arrayUtil.forEach(logicalFiles, function (item, idx) {
            if (item.isSuperfile) {
                item.qualifiedName = item.Name;
            }
            else {
                item.qualifiedName = item.Name + "@" + item.NodeGroup;
            }
        });
        var request = {
            LogicalFiles: logicalFiles,
            Type: actionType
        };
        ESPRequest.flattenArray(request, "LogicalFiles", "qualifiedName");
        return ESPRequest.send("WsDfu", "DFUArrayAction", {
            request: request
        }).then(function (response) {
            if (lang.exists("DFUArrayActionResponse.ActionResults.DFUActionInfo", response)) {
                var exceptions = [];
                arrayUtil.forEach(response.DFUArrayActionResponse.ActionResults.DFUActionInfo, function (item, idx) {
                    if (item.Failed) {
                        exceptions.push({
                            Source: item.FileName,
                            Message: item.ActionResult
                        });
                    }
                });
                if (exceptions.length) {
                    topic.publish("hpcc/brToaster", {
                        Severity: "Error",
                        Source: "WsDfu.DFUArrayAction",
                        Exceptions: exceptions
                    });
                }
            }
            return response;
        });
    }
    exports.DFUArrayAction = DFUArrayAction;
    function SuperfileAction(action, superfile, subfiles, removeSuperfile) {
        var request = {
            action: action,
            superfile: superfile,
            subfiles: subfiles,
            removeSuperfile: removeSuperfile
        };
        ESPRequest.flattenArray(request, "subfiles", "Name");
        return ESPRequest.send("WsDfu", "SuperfileAction", {
            request: request
        });
    }
    exports.SuperfileAction = SuperfileAction;
    function AddtoSuperfile(logicalFiles, superfile, existingFile) {
        var request = {
            names: logicalFiles,
            Superfile: superfile,
            ExistingFile: existingFile ? 1 : 0
        };
        ESPRequest.flattenArray(request, "names", "Name");
        return ESPRequest.send("WsDfu", "AddtoSuperfile", {
            request: request
        });
    }
    exports.AddtoSuperfile = AddtoSuperfile;
    function DFUQuery(params) {
        return ESPRequest.send("WsDfu", "DFUQuery", params);
    }
    exports.DFUQuery = DFUQuery;
    function DFUFileView(params) {
        return ESPRequest.send("WsDfu", "DFUFileView", params);
    }
    exports.DFUFileView = DFUFileView;
    function DFUSpace(params) {
        return ESPRequest.send("WsDfu", "DFUSpace", params);
    }
    exports.DFUSpace = DFUSpace;
    function ListHistory(params) {
        return ESPRequest.send("WsDfu", "ListHistory", params);
    }
    exports.ListHistory = ListHistory;
    function EraseHistory(params) {
        return ESPRequest.send("WsDfu", "EraseHistory", params);
    }
    exports.EraseHistory = EraseHistory;
    function DFUInfo(params) {
        return ESPRequest.send("WsDfu", "DFUInfo", params).then(function (response) {
            if (lang.exists("Exceptions.Exception", response)) {
                arrayUtil.forEach(response.Exceptions.Exception, function (item, idx) {
                    if (item.Code === 20038) {
                        lang.mixin(response, {
                            DFUInfoResponse: {
                                FileDetail: {
                                    Name: params.request.Name,
                                    StateID: 999,
                                    State: "not found"
                                }
                            }
                        });
                    }
                });
            }
            else if (lang.exists("DFUInfoResponse.FileDetail", response)) {
                response.DFUInfoResponse.FileDetail.StateID = 0;
                response.DFUInfoResponse.FileDetail.State = "";
            }
            return response;
        });
    }
    exports.DFUInfo = DFUInfo;
    function DFUDefFile(params) {
        lang.mixin(params, {
            handleAs: "text"
        });
        return ESPRequest.send("WsDfu", "DFUDefFile", params).then(function (response) {
            try {
                var domXml = parser.parse(response);
                var espBase = new ESPBase_1.default();
                var exceptions = espBase.getValues(domXml, "Exception", ["Exception"]);
                if (exceptions.length) {
                    response = "";
                    arrayUtil.forEach(exceptions, function (item, idx) {
                        response += item.Message + "\n";
                    });
                }
            }
            catch (e) {
                //  No errors  ---
            }
            return response;
        });
    }
    exports.DFUDefFile = DFUDefFile;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsDfu.js.map

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DiskUsageWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                <select id=\"${id}GroupBy\" title=\"${i18n.GroupBy}:\" name=\"CountBy\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                    <option selected=\"selected\" value=\"Owner\">${i18n.Owner}</option>\n                    <option value=\"Scope\">${i18n.Scope}</option>\n                    <option value=\"Year\">${i18n.Year}</option>\n                    <option value=\"Quarter\">${i18n.Quarter}</option>\n                    <option value=\"Month\">${i18n.Month}</option>\n                    <option value=\"Day\">${i18n.Day}</option>\n                </select>\n                <input id=\"${id}ScopeUnder\" title=\"${i18n.Scope}:\" name=\"ScopeUnder\" colspan=\"2\" style=\"width:100%\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}OwnerUnder\" title=\"${i18n.Owner}:\" name=\"OwnerUnder\" colspan=\"2\" style=\"width:100%\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}FromDate\" title=\"${i18n.FromDate}:\" name=\"StartDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                <input id=\"${id}FromTime\" name=\"FromTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 AM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n                <input id=\"${id}ToDate\" title=\"${i18n.ToDate}:\" name=\"EndDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                <input id=\"${id}ToTime\" name=\"ToTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 PM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n            </div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}DiskUsageGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}DiskUsageGrid\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

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