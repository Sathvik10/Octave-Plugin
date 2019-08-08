(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/ActivityWidget":"./eclwatch/ActivityWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"src/DiskUsage":"./lib/src/DiskUsage.js",
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dojo/text!templates/ActivityPageWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ActivityPageWidget.html",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[79],{

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

/***/ "./eclwatch/ActivityWidget.js":
/*!************************************!*\
  !*** ./eclwatch/ActivityWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/Tooltip */ "./node_modules/dijit/Tooltip.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPActivity */ "./lib/src/ESPActivity.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! src/DiskUsage */ "./lib/src/DiskUsage.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),

    __webpack_require__(/*! dojo/text!../templates/ActivityPageWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ActivityPageWidget.html"),

    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, domAttr,
    registry, Button, ToggleButton, ToolbarSeparator, Tooltip,
    selector, tree,
    GridDetailsWidget, ESPActivity, DelayLoadWidget, ESPUtil, Utility, DiskUsage, Clippy,
    template
) {
        var DelayedRefresh = declare("DelayedRefresh", [], {
            _activityWidget: null,
            _promises: null,

            constructor: function (activityWidget) {
                this._activityWidget = activityWidget;
                this._promises = [];
            },

            push: function (promise) {
                this._promises.push(promise);
            },

            refresh: function () {
                if (this._promises.length) {
                    var context = this;
                    Promise.all(this._promises).then(function () {
                        context._activityWidget.refreshGrid();
                        setTimeout(function () {
                            context._activityWidget._refreshActionState();
                        }, 100);
                    });
                }
            }
        });

        return declare("ActivityWidget", [GridDetailsWidget], {
            templateString: template,
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.title_Activity,
            idProperty: "__hpcc_id",
            firstLoad: true,

            _onAutoRefresh: function (event) {
                this.activity.disableMonitor(!this.autoRefreshButton.get("checked"));
                this.createStackControllerTooltip(this.id + "AutoRefresh", this.i18n.AutoRefresh + ": " + this.autoRefreshButton.get("checked"));
                if (this.autoRefreshButton.get("checked")) {
                    domAttr.set(this.autoRefreshButton, "iconClass", "iconAutoRefreshTrue");
                } else {
                    domAttr.set(this.autoRefreshButton, "iconClass", "iconAutoRefresh");
                }
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.inherited(arguments);
                this.refreshUsage();
            },

            _onPause: function (event, params) {
                var context = this;
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfQueue(item)) {
                        promises.push(item.pause());
                    }
                }, this);
                promises.refresh();
            },

            _onResume: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfQueue(item)) {
                        promises.push(item.resume());
                    }
                }, this);
                promises.refresh();
            },

            _onClear: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfQueue(item)) {
                        promises.push(item.clear());
                    }
                }, this);
                promises.refresh();
            },

            _onWUPause: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        promises.push(item.pause());
                    }
                }, this);
                promises.refresh();
            },

            _onWUPauseNow: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        promises.push(item.pauseNow());
                    }
                }, this);
                promises.refresh();
            },

            _onWUResume: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        promises.push(item.resume());
                    }
                }, this);
                promises.refresh();
            },

            _onWUAbort: function (event, params) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        promises.push(item.abort());
                    }
                }, this);
                promises.refresh();
            },

            _onWUPriority: function (event, priority) {
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            promises.push(queue.setPriority(item.Wuid, priority));
                        }
                    }
                }, this);
                promises.refresh();
            },

            _onWUTop: function (event, params) {
                var context = this;
                var promises = new DelayedRefresh(this);
                var selected = this.grid.getSelected();
                for (var i = selected.length - 1; i >= 0; --i) {
                    var item = selected[i];
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            promises.push(queue.moveTop(item.Wuid));
                        }
                    }
                }
                promises.refresh();
            },

            _onWUUp: function (event, params) {
                var context = this;
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            promises.push(queue.moveUp(item.Wuid));
                        }
                    }
                }, this);
                promises.refresh();
            },

            _onWUDown: function (event, params) {
                var context = this;
                var promises = new DelayedRefresh(this);
                var selected = this.grid.getSelected();
                for (var i = selected.length - 1; i >= 0; --i) {
                    var item = selected[i];
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            promises.push(queue.moveDown(item.Wuid));
                        }
                    }
                }
                promises.refresh();
            },

            _onWUBottom: function (event, params) {
                var context = this;
                var promises = new DelayedRefresh(this);
                arrayUtil.forEach(this.grid.getSelected(), function (item, idx) {
                    if (this.activity.isInstanceOfWorkunit(item)) {
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            promises.push(queue.moveBottom(item.Wuid));
                        }
                    }
                }, this);
                promises.refresh();
            },

            postCreate: function (args) {
                this.inherited(arguments);
                var context = this;

                this._diskSummaryPane = registry.byId(this.id + "DiskSummaryCP");

                var origResize = this._diskSummaryPane.resize;
                this._diskSummaryPane.resize = function (size) {
                    origResize.apply(this, arguments);
                    if (context._diskUsage && context._diskUsage.renderCount()) {
                        context._diskUsage
                            .resize({ width: size.w, height: size.h })
                            .lazyRender()
                            ;
                    }
                }
            },

            doSearch: function (searchText) {
                this.searchText = searchText;
                this.selectChild(this.gridTab);
                this.refreshGrid();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                this._diskUsage = new DiskUsage.Summary()
                    .target(this.id + "DiskSummary")
                    .on("click", function (gauge, details) {
                        var tab = context.ensurePane({ details: details, __hpcc_id: "Usage:" + details.Name }, { usage: true });
                        if (tab) {
                            context.selectChild(tab);
                        }
                    })
                    .render()
                    .refresh()
                    ;

                this.autoRefreshButton = registry.byId(this.id + "AutoRefresh");
                this.activity.disableMonitor(true);
                this.activity.watch("__hpcc_changedCount", function (item, oldValue, newValue) {
                    context.grid.set("query", {});
                    context._refreshActionState();
                });

                this._refreshActionState();
                ESPUtil.MonitorVisibility(this.gridTab, function (visibility) {
                    if (visibility) {
                        context.refreshGrid();
                        if (!context._diskUsage.renderCount()) {
                            context._diskUsage.lazyRender();
                        }
                    }
                });
                this.createStackControllerTooltip(this.id + "AutoRefresh", this.i18n.AutoRefresh + ": " + this.autoRefreshButton.get("checked"));
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");
                this.refreshButton = registry.byId(this.id + "Refresh");
                this.autoRefreshButton = new ToggleButton({
                    id: this.id + "AutoRefresh",
                    iconClass: 'iconAutoRefresh',
                    showLabel: false,
                    checked: false,
                    onClick: function (event) {
                        context._onAutoRefresh(event);
                    }
                }).placeAt(this.refreshButton.domNode, "before");
                var tmpSplitter = new ToolbarSeparator().placeAt(this.refreshButton.domNode, "before");
                this.clusterPauseButton = new Button({
                    id: this.id + "PauseButton",
                    label: this.i18n.Pause,
                    onClick: function (event) {
                        context._onPause(event);
                    }
                }).placeAt(this.openButton.domNode, "before");
                this.clusterResumeButton = new Button({
                    id: this.id + "ResumeButton",
                    label: this.i18n.Resume,
                    onClick: function (event) {
                        context._onResume(event);
                    }
                }).placeAt(this.openButton.domNode, "before");
                this.clusterClearButton = new Button({
                    id: this.id + "ClearButton",
                    label: this.i18n.Clear,
                    onClick: function (event) {
                        context._onClear(event);
                    }
                }).placeAt(this.openButton.domNode, "before");
                tmpSplitter = new ToolbarSeparator().placeAt(this.openButton.domNode, "before");

                this.wuMoveBottomButton = new Button({
                    id: this.id + "MoveBottomButton",
                    label: this.i18n.Bottom,
                    onClick: function (event) {
                        context._onWUBottom(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuMoveDownButton = new Button({
                    id: this.id + "MoveDownButton",
                    label: this.i18n.Down,
                    onClick: function (event) {
                        context._onWUDown(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuMoveUpButton = new Button({
                    id: this.id + "MoveUpButton",
                    label: this.i18n.Up,
                    onClick: function (event) {
                        context._onWUUp(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuMoveTopButton = new Button({
                    id: this.id + "MoveTopButton",
                    label: this.i18n.Top,
                    onClick: function (event) {
                        context._onWUTop(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                tmpSplitter = new ToolbarSeparator().placeAt(this.openButton.domNode, "after");
                this.wuLowPriorityButton = new Button({
                    id: this.id + "LowPriorityButton",
                    label: this.i18n.Low,
                    onClick: function (event) {
                        context._onWUPriority(event, "low");
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuNormalPriorityButton = new Button({
                    id: this.id + "NormalPriorityButton",
                    label: this.i18n.Normal,
                    onClick: function (event) {
                        context._onWUPriority(event, "normal");
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuHighPriorityButton = new Button({
                    id: this.id + "HighPriorityButton",
                    label: this.i18n.High,
                    onClick: function (event) {
                        context._onWUPriority(event, "high");
                    }
                }).placeAt(this.openButton.domNode, "after");
                tmpSplitter = new ToolbarSeparator().placeAt(this.openButton.domNode, "after");
                this.wuAbortButton = new Button({
                    id: this.id + "AbortButton",
                    label: this.i18n.Abort,
                    onClick: function (event) {
                        context._onWUAbort(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuResumeButton = new Button({
                    id: this.id + "WUResumeButton",
                    label: this.i18n.Resume,
                    onClick: function (event) {
                        context._onWUResume(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuPauseNowButton = new Button({
                    id: this.id + "WUPauseNowButton",
                    label: this.i18n.PauseNow,
                    onClick: function (event) {
                        context._onWUPauseNow(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuPauseButton = new Button({
                    id: this.id + "WUPauseButton",
                    label: this.i18n.Pause,
                    onClick: function (event) {
                        context._onWUPause(event);
                    }
                }).placeAt(this.openButton.domNode, "after");
                this.wuCopyButton = new Button({
                    id: this.id + "WUCopyButton",
                    showLabel: false,
                    iconClass: 'iconCopy',
                    title: this.i18n.CopyWUIDs
                }).placeAt(this.openButton.domNode, "before");
                Clippy.attachDomNode(this.wuCopyButton.domNode, function () {
                    var wuids = [];
                    arrayUtil.forEach(context.grid.getSelected(), function (item, idx) {
                        if (context.activity.isInstanceOfWorkunit(item)) {
                            wuids.push(item.Wuid);
                        }
                    });
                    return wuids.join("\n");
                });

                this.activity = ESPActivity.Get();
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.activity.getStore(),
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox',
                            sortable: false
                        }),
                        Priority: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("priority.png", context.i18n.Priority);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (Priority) {
                                switch (Priority) {
                                    case "high":
                                        return Utility.getImageHTML("priority_high.png");
                                    case "low":
                                        return Utility.getImageHTML("priority_low.png");
                                }
                                return "";
                            }
                        },
                        DisplayName: tree({
                            label: this.i18n.TargetWuid,
                            width: 300,
                            sortable: true,
                            shouldExpand: function (row, level, previouslyExpanded) {
                                if (level === 0) {
                                    return previouslyExpanded === undefined ? true : previouslyExpanded;
                                }
                                return previouslyExpanded;
                            },
                            formatter: function (_name, row) {
                                var img = row.getStateImage();
                                if (context.activity.isInstanceOfQueue(row)) {
                                    if (row.ClusterType === 3) {
                                        return "<img src='" + img + "'/>&nbsp;<a href='#' class='dgrid-row-url'>" + _name + "</a>";
                                    } else {
                                        return "<img src='" + img + "'/>&nbsp;" + _name;
                                    }
                                }
                                return "<img src='" + img + "'/>&nbsp;<a href='#' class='dgrid-row-url'>" + row.Wuid + "</a>";
                            }
                        }),
                        GID: {
                            label: this.i18n.Graph, width: 90, sortable: true,
                            formatter: function (_gid, row) {
                                if (context.activity.isInstanceOfWorkunit(row)) {
                                    if (row.GraphName) {
                                        return "<a href='#' class='dgrid-row-url2'>" + row.GraphName + "-" + row.GID + "</a>";
                                    }
                                }
                                return "";
                            }
                        },
                        State: {
                            label: this.i18n.State,
                            sortable: false,
                            formatter: function (state, row) {
                                if (context.activity.isInstanceOfQueue(row)) {
                                    return row.isNormal() ? "" : row.StatusDetails;
                                }
                                if (row.Duration) {
                                    return state + " (" + row.Duration + ")";
                                } else if (row.Instance && !(state.indexOf && state.indexOf(row.Instance) !== -1)) {
                                    return state + " [" + row.Instance + "]";
                                }
                                return state;
                            }
                        },
                        Owner: { label: this.i18n.Owner, width: 90, sortable: false },
                        Jobname: { label: this.i18n.JobName, sortable: false }
                    },
                    getSelected: function () {
                        var retVal = [];
                        for (var id in this.selection) {
                            var item = context.activity.resolve(id)
                            if (item) {
                                retVal.push(item);
                            }
                        }
                        return retVal;
                    }
                }, domID);

                retVal.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = retVal.row(evt).data;
                        context._onRowDblClick(row, {
                            OpenMode: "WU"
                        });
                    }
                });

                retVal.on(".dgrid-row-url2:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = retVal.row(evt).data;
                        context._onRowDblClick(row, {
                            OpenMode: "Graph"
                        });
                    }
                });

                return retVal;
            },

            createDetail: function (id, row, params) {
                if (params.usage) {
                    return new DelayLoadWidget({
                        id: id,
                        title: row.details.Name,
                        closable: true,
                        delayWidget: "DiskUsageDetails",
                        hpcc: {
                            params: {
                                details: row.details
                            }
                        }
                    });
                } else if (this.activity.isInstanceOfQueue(row) && row.ClusterType === 3) {
                    return new DelayLoadWidget({
                        id: id,
                        title: row.ClusterName,
                        closable: true,
                        delayWidget: "TpClusterInfoWidget",
                        hpcc: {
                            params: {
                                ClusterName: row.ClusterName
                            }
                        }
                    });
                } else if (this.activity.isInstanceOfWorkunit(row)) {
                    if (lang.exists("OpenMode", params) && params.OpenMode === "Graph") {
                        return new DelayLoadWidget({
                            id: id,
                            title: row.GraphName + " - " + "sg" + row.GID,
                            closable: true,
                            delayWidget: "GraphTree7Widget",
                            hpcc: {
                                params: {
                                    Wuid: row.Wuid,
                                    GraphName: row.GraphName,
                                    SubGraphId: "sg" + row.GID
                                }
                            }
                        });
                    }
                    if (row.Server === "DFUserver") {
                        return new DelayLoadWidget({
                            id: id,
                            title: row.ID,
                            closable: true,
                            delayWidget: "DFUWUDetailsWidget",
                            hpcc: {
                                params: {
                                    Wuid: row.ID
                                }
                            }
                        });
                    }
                    return new DelayLoadWidget({
                        id: id,
                        title: row.Wuid,
                        closable: true,
                        delayWidget: "WUDetailsWidget",
                        hpcc: {
                            params: {
                                Wuid: row.Wuid
                            }
                        }
                    });
                }
                return null;
            },

            refreshUsage: function () {
                this._diskUsage
                    .refresh()
                    ;
            },

            refreshGrid: function () {
                this.firstLoad = false;
                this.activity.refresh();
            },

            refreshActionState: function (selection) {
                var clusterSelected = false;
                var thorClusterSelected = false;
                var wuSelected = false;
                var clusterPausedSelected = false;
                var clusterNotPausedSelected = false;
                var clusterHasItems = false;
                var wuCanHigh = false;
                var wuCanNormal = false;
                var wuCanLow = false;
                var wuCanUp = false;
                var wuCanDown = false;
                var context = this;
                arrayUtil.forEach(selection, function (item, idx) {
                    if (context.activity.isInstanceOfQueue(item)) {
                        clusterSelected = true;
                        if (item.isPaused()) {
                            clusterPausedSelected = true;
                        } else {
                            clusterNotPausedSelected = true;
                        }
                        if (item.getChildCount()) {
                            clusterHasItems = true;
                        }
                        if (item.ClusterType === 3) {
                            thorClusterSelected = true;
                        }
                    } else if (context.activity.isInstanceOfWorkunit(item)) {
                        wuSelected = true;
                        var queue = item.get("ESPQueue");
                        if (queue) {
                            if (queue.canChildMoveUp(item.__hpcc_id)) {
                                wuCanUp = true;
                            }
                            if (queue.canChildMoveDown(item.__hpcc_id)) {
                                wuCanDown = true;
                            }
                        }
                        if (item.get("Priority") !== "high") {
                            wuCanHigh = true;
                        }
                        if (item.get("Priority") !== "normal") {
                            wuCanNormal = true;
                        }
                        if (item.get("Priority") !== "low") {
                            wuCanLow = true;
                        }
                    }
                });

                this.wuCopyButton.set("disabled", !wuSelected)
                this.wuCopyButton.set("iconClass", !wuSelected ? "iconCopyDisabled" : "iconCopy")
                this.clusterPauseButton.set("disabled", !clusterNotPausedSelected);
                this.clusterResumeButton.set("disabled", !clusterPausedSelected);
                this.clusterClearButton.set("disabled", !clusterHasItems);
                this.openButton.set("disabled", !wuSelected && !thorClusterSelected);
                this.wuPauseButton.set("disabled", !wuSelected);
                this.wuPauseNowButton.set("disabled", !wuSelected);
                this.wuResumeButton.set("disabled", !wuSelected);
                this.wuAbortButton.set("disabled", !wuSelected);
                this.wuHighPriorityButton.set("disabled", !wuCanHigh);
                this.wuNormalPriorityButton.set("disabled", !wuCanNormal);
                this.wuLowPriorityButton.set("disabled", !wuCanLow);
                this.wuMoveTopButton.set("disabled", !wuCanUp);
                this.wuMoveUpButton.set("disabled", !wuCanUp);
                this.wuMoveDownButton.set("disabled", !wuCanDown);
                this.wuMoveBottomButton.set("disabled", !wuCanDown);
            },

            createStackControllerTooltip: function (widgetID, text) {
                return new Tooltip({
                    connectId: [widgetID],
                    label: text,
                    showDelay: 1,
                    position: ["below"]
                });
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

/***/ "./lib/src/DiskUsage.js":
/*!******************************!*\
  !*** ./lib/src/DiskUsage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/dgrid */ "./node_modules/@hpcc-js/dgrid/dist/index.min.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, common_1, chart_1, comms_1, layout_1, dgrid_1, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    common_1.Palette.rainbow("DiskUsage", ["green", "green", "green", "green", "green", "green", "green", "green", "orange", "red", "red"]);
    var Summary = /** @class */ (function (_super) {
        tslib_1.__extends(Summary, _super);
        function Summary() {
            var _this = _super.call(this) || this;
            _this._connection = new comms_1.MachineService({ baseUrl: "" });
            _this._usage = {};
            _this
                .itemMinHeight(100)
                .itemMinWidth(100)
                .forceYScroll(true)
                .widgetsFlexGrow([1, 1, 1]);
            return _this;
        }
        Summary.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._loadingMsg = element.append("div")
                .style("float", "left")
                .style("margin-left", "4px")
                .style("margin-top", "4px")
                .style("color", "darkgray")
                .style("font-size", "14px")
                .attr("title", nlsHPCC.DiskUsage);
        };
        Summary.prototype.update = function (domNode, element) {
            var widgets = [];
            for (var key in this._usage) {
                widgets.push(this._usage[key].gauge);
            }
            this
                .widgets(widgets)
                .flexBasis(100 / widgets.length + "%")
                .flexBasis("100px");
            _super.prototype.update.call(this, domNode, element);
        };
        Summary.prototype.refresh = function () {
            var _this = this;
            var hasGauge = false;
            for (var key in this._usage) {
                hasGauge = true;
                this._usage[key].gauge
                    .value(0)
                    .tickValue(0)
                    .render();
            }
            if (!hasGauge) {
                this._loadingMsg && this._loadingMsg
                    .text(nlsHPCC.loadingMessage);
            }
            this._connection.GetTargetClusterUsageEx().then(function (response) {
                _this._loadingMsg && _this._loadingMsg
                    .html("<i class=\"fa fa-database\"></i>");
                response.forEach(function (details) {
                    if (!_this._usage[details.Name]) {
                        _this._usage[details.Name] = {
                            details: details,
                            gauge: new chart_1.Gauge()
                                .title(details.Name)
                                .showTick(true)
                                .on("click", function (gauge) {
                                _this.click(gauge, details);
                            })
                        };
                    }
                    _this._usage[details.Name].gauge
                        .value(details.max / 100)
                        .valueDescription(nlsHPCC.Max)
                        .tickValue(details.mean / 100)
                        .tickValueDescription(nlsHPCC.Mean);
                });
                _this.render();
            });
            return this;
        };
        //  Events
        Summary.prototype.click = function (gauge, details) {
        };
        return Summary;
    }(layout_1.FlexGrid));
    exports.Summary = Summary;
    var Details = /** @class */ (function (_super) {
        tslib_1.__extends(Details, _super);
        function Details(_targetCluster) {
            var _this = _super.call(this) || this;
            _this._targetCluster = _targetCluster;
            _this._connection = new comms_1.MachineService({ baseUrl: "" });
            _this
                .sortable(true)
                .columnFormats([
                new dgrid_1.ColumnFormat()
                    .column("% Used")
                    .paletteID("DiskUsage")
            ])
                .columns([nlsHPCC.PercentUsed, nlsHPCC.Component, nlsHPCC.Type, nlsHPCC.IPAddress, nlsHPCC.Path, nlsHPCC.InUse, nlsHPCC.Total]);
            return _this;
        }
        Details.prototype.details = function (_) {
            this._details = _;
            var data = [];
            this._details.ComponentUsages.forEach(function (cu) {
                cu.MachineUsages.forEach(function (mu) {
                    mu.DiskUsages.forEach(function (du) {
                        data.push([du.PercentUsed, cu.Name, du.Name, mu.NetAddress !== "." ? mu.NetAddress : mu.Name, du.Path, du.InUse, du.Total]);
                    });
                });
            });
            this.data(data);
            return this;
        };
        Details.prototype.refresh = function () {
            var _this = this;
            this
                .noDataMessage(nlsHPCC.loadingMessage)
                .data([])
                .render();
            this._connection.GetTargetClusterUsageEx([this._targetCluster]).then(function (details) {
                _this
                    .noDataMessage(nlsHPCC.noDataMessage)
                    .details(details[0])
                    .render();
            });
            return this;
        };
        return Details;
    }(dgrid_1.Table));
    exports.Details = Details;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=DiskUsage.js.map

/***/ }),

/***/ "./node_modules/dijit/MenuSeparator.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/MenuSeparator.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! ./_Contained */ "./node_modules/dijit/_Contained.js"),
	__webpack_require__(/*! dojo/text!./templates/MenuSeparator.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _WidgetBase, _TemplatedMixin, _Contained, template){

	// module:
	//		dijit/MenuSeparator

	return declare("dijit.MenuSeparator", [_WidgetBase, _TemplatedMixin, _Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/PopupMenuItem.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/PopupMenuItem.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"), // domStyle.set
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! ./popup */ "./node_modules/dijit/popup.js"),
	__webpack_require__(/*! ./registry */ "./node_modules/dijit/registry.js"),	// registry.byNode
	__webpack_require__(/*! ./MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domStyle, lang, query, pm, registry, MenuItem){

	// module:
	//		dijit/PopupMenuItem

	return declare("dijit.PopupMenuItem", MenuItem, {
		// summary:
		//		An item in a Menu that spawn a drop down (usually a drop down menu)

		baseClass: "dijitMenuItem dijitPopupMenuItem",

		_fillContent: function(){
			// summary:
			//		When Menu is declared in markup, this code gets the menu label and
			//		the popup widget from the srcNodeRef.
			// description:
			//		srcNodeRef.innerHTML contains both the menu item text and a popup widget
			//		The first part holds the menu item text and the second part is the popup
			// example:
			// |	<div data-dojo-type="dijit/PopupMenuItem">
			// |		<span>pick me</span>
			// |		<popup> ... </popup>
			// |	</div>
			// tags:
			//		protected

			if(this.srcNodeRef){
				var nodes = query("*", this.srcNodeRef);
				this.inherited(arguments, [nodes[0]]);

				// save pointer to srcNode so we can grab the drop down widget after it's instantiated
				this.dropDownContainer = this.srcNodeRef;
			}
		},

		_openPopup: function(/*Object*/ params, /*Boolean*/ focus){
			// summary:
			//		Open the popup to the side of/underneath this MenuItem, and optionally focus first item
			// tags:
			//		protected

			var popup = this.popup;

			pm.open(lang.delegate(params, {
				popup: this.popup,
				around: this.domNode
			}));

			if(focus && popup.focus){
				popup.focus();
			}
		},

		_closePopup: function(){
			pm.close(this.popup);
			this.popup.parentMenu = null;
		},

		startup: function(){
			if(this._started){ return; }
			this.inherited(arguments);

			// We didn't copy the dropdown widget from the this.srcNodeRef, so it's in no-man's
			// land now.  Move it to <body>.
			if(!this.popup){
				var node = query("[widgetId]", this.dropDownContainer)[0];
				this.popup = registry.byNode(node);
			}
			this.ownerDocumentBody.appendChild(this.popup.domNode);
			this.popup.domNode.setAttribute("aria-labelledby", this.containerNode.id);
			this.popup.startup();

			this.popup.domNode.style.display="none";
			if(this.arrowWrapper){
				domStyle.set(this.arrowWrapper, "visibility", "");
			}
			this.focusNode.setAttribute("aria-haspopup", "true");
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			if(this.popup){
				// Destroy the popup, unless it's already been destroyed.  This can happen because
				// the popup is a direct child of <body> even though it's logically my child.
				if(!this.popup._destroyed){
					this.popup.destroyRecursive(preserveDom);
				}
				delete this.popup;
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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

/***/ "./node_modules/dijit/ToolbarSeparator.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/ToolbarSeparator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _Widget, _TemplatedMixin){

	// module:
	//		dijit/ToolbarSeparator


	return declare("dijit.ToolbarSeparator", [_Widget, _TemplatedMixin], {
		// summary:
		//		A spacer between two `dijit.Toolbar` items

		templateString: '<div class="dijitToolbarSeparator dijitInline" role="presentation"></div>',

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ActivityPageWidget.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ActivityPageWidget.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Grid\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${gridTitle}\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}DiskSummaryCP\" style=\"height: 100px; padding:0px; overflow:hidden\" data-dojo-props=\"splitter:true, region: 'top', minSize: 100\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}DiskSummary\">\n                    </div>\n                </div>\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <span id=\"${id}ContainerNode\" data-dojo-attach-point=\"containerNode\"></span>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}GridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}Grid\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuSeparator.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"

/***/ })

}]);