(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/QuerySetDetailsWidget":"./eclwatch/QuerySetDetailsWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dojo/text!templates/QuerySetDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[137],{

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

/***/ "./eclwatch/QuerySetDetailsWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/QuerySetDetailsWidget.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/QuerySetDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domAttr, all, arrayUtil,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    Clippy, ESPQuery, _TabContainerWidget, DelayLoadWidget, Utility,
    template) {
        return declare("QuerySetDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "QuerySetDetailsWidget",
            i18n: nlsHPCC,

            query: null,

            initalized: false,
            summaryTab: null,
            summaryTabLoaded: false,
            errorsTab: null,
            errorsTabLoaded: false,
            graphsTab: null,
            graphsTabLoaded: false,
            logicalFilesTab: null,
            logicalFilesTabLoaded: false,
            superFilesTab: null,
            superFilesTabLoaded: false,
            workunitsTab: null,
            workunitsTabLoaded: false,
            testPagesTab: null,
            testPagesLoaded: false,
            loaded: false,

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryTab = registry.byId(this.id + "_Summary");
                this.errorsTab = registry.byId(this.id + "_Errors");
                this.graphsTab = registry.byId(this.id + "_Graphs");
                this.logicalFilesTab = registry.byId(this.id + "_QuerySetLogicalFiles");
                this.superFilesTab = registry.byId(this.id + "_QuerySetSuperFiles");
                this.librariesUsedTab = registry.byId(this.id + "_LibrariesUsed");
                this.workunitsTab = registry.byId(this.id + "_Workunit");
                this.testPagesTab = registry.byId(this.id + "_TestPages");
                this.suspended = registry.byId(this.id + "Suspended");

                Clippy.attach(this.id + "ClippyButton");
            },

            //  Hitched actions  ---
            _onSave: function (event) {
                var suspended = registry.byId(this.id + "Suspended").get("value");
                var activated = registry.byId(this.id + "Activated").get("value");
                var context = this;
                all({
                    suspend: this.query.setSuspended(suspended),
                    activate: this.query.setActivated(activated)
                });
            },
            _onReset: function () {
                if (confirm(this.i18n.ResetThisQuery)) {
                    this.query.doReset();
                }
            },
            _onDelete: function (event) {
                if (confirm(this.i18n.YouAreAboutToDeleteThisQueryset)) {
                    this.query.doDelete();
                }
            },
            _onRefresh: function () {
                this.query.refresh();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.query = ESPQuery.Get(params.QuerySetId, params.Id);

                var context = this;
                var data = this.query.getData();
                for (var key in data) {
                    this.updateInput(key, null, data[key]);
                }
                this.query.watch(function (name, oldValue, newValue) {
                    context.updateInput(name, oldValue, newValue);
                });
                this.query.refresh();
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel.id === this.summaryTab.id && !this.summaryTabLoaded) {
                    this.summaryTabLoaded = true;
                } else if (currSel.id === this.workunitsTab.id && !this.workunitsTabLoaded) {
                    this.workunitsTabLoaded = true;
                    this.workunitsTab.init({
                        Wuid: this.query.Wuid
                    });
                } else if (currSel.id === this.errorsTab.id && !this.errorsTabLoaded) {
                    this.errorsTabLoaded = true;
                    this.errorsTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.graphsTab.id && !this.graphsTabLoaded) {
                    this.graphsTabLoaded = true;
                    this.graphsTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.logicalFilesTab.id && !this.logicalFilesTabLoaded) {
                    this.logicalFilesTabLoaded = true;
                    this.logicalFilesTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.superFilesTab.id && !this.superFilesTabLoaded) {
                    this.superFilesTabLoaded = true;
                    this.superFilesTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.librariesUsedTab.id && !this.librariesUsedTabLoaded) {
                    this.librariesUsedTabLoaded = true;
                    this.librariesUsedTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.widget._Resources.id && !this.resourcesWidgetLoaded) {
                    this.resourcesWidgetLoaded = true;
                    this.widget._Resources.init({
                        Wuid: this.query.Wuid,
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                } else if (currSel.id === this.testPagesTab.id && !this.testPagesTabLoaded) {
                    this.testPagesTabLoaded = true;
                    this.testPagesTab.init({
                        QuerySetId: this.params.QuerySetId,
                        Id: this.params.Id
                    });
                }
            },

            updateInput: function (name, oldValue, newValue) {
                var context = this;
                var registryNode = registry.byId(this.id + name);
                if (registryNode) {
                    registryNode.set("value", newValue);
                } else {
                    var domElem = dom.byId(this.id + name);
                    if (domElem) {
                        switch (domElem.tagName) {
                            case "SPAN":
                            case "DIV":
                                dom.byId(this.id + name).textContent = newValue;
                                break;
                            case "INPUT":
                            case "TEXTAREA":
                                domAttr.set(this.id + name, "value", newValue);
                                break;
                            default:
                                alert(domElem.tagName);
                                break;
                        }
                    }
                }
                if (name === "Wuid") {
                    this.workunitsTab.set("title", newValue);
                } else if (name === "Suspended") {
                    dom.byId(this.id + "SuspendImg").src = newValue ? Utility.getImageURL("suspended.png") : "";
                } else if (name === "Activated") {
                    dom.byId(this.id + "ActiveImg").src = newValue ? Utility.getImageURL("active.png") : "";
                } else if (name === "SuspendedReason" && newValue === "cluster") {
                    dom.byId(this.id + "SuspendCluster").src = Utility.getImageURL("error-icon.png");
                } else if (name === "CountGraphs" && newValue) {
                    this.graphsTab.set("title", this.i18n.Graphs + " (" + newValue + ")");
                } else if (name === "graphs") {
                    this.graphsTab.set("title", this.i18n.Graphs + " (" + newValue.length + ")");
                    var tooltip = "";
                    for (var i = 0; i < newValue.length; ++i) {
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[i].Name;
                        if (newValue[i].Time)
                            tooltip += " " + newValue[i].Time;
                    }
                    this.graphsTab.set("tooltip", tooltip);
                } else if (name === "ResourceURLCount" && newValue - 1) {
                    this.widget._Resources.set("title", this.i18n.Resources + " (" + (newValue - 1) + ")");
                } else if (name === "SuperFiles") {
                    if (lang.exists("SuperFile.length", newValue)) {
                        this.superFilesTab.set("title", this.i18n.SuperFiles + " (" + newValue.SuperFile.length + ")");
                        var superFileToolTip = "";
                        for (var i = 0; i < newValue.SuperFile.length; ++i) {
                            if (superFileToolTip !== "")
                                superFileToolTip += "\n";
                            superFileToolTip += newValue.SuperFile[i].Name;
                        }
                        this.superFilesTab.set("tooltip", superFileToolTip);
                    }
                    var count = 0;
                    arrayUtil.forEach(context.query.SuperFiles.SuperFile, function (item, idx) {
                        arrayUtil.forEach(item.SubFiles.File, function (item, idx) {
                            count++
                        });
                    });
                } else if (name === "LogicalFiles") {
                    if (lang.exists("Item.length", newValue)) {
                        this.logicalFilesTab.set("title", this.i18n.LogicalFiles + " (" + context.query.LogicalFiles.Item.length + ")");
                        var logicalFileToolTip = "";
                        for (var i = 0; i < newValue.Item.length; ++i) {
                            if (logicalFileToolTip !== "")
                                logicalFileToolTip += "\n";
                            logicalFileToolTip += newValue.Item[i];
                        }
                        this.logicalFilesTab.set("tooltip", logicalFileToolTip);
                    }
                } else if (name === "LibrariesUsed") {
                    if (lang.exists("Item.length", newValue)) {
                        this.librariesUsedTab.set("title", this.i18n.LibrariesUsed + " (" + newValue.Item.length + ")");
                        var tooltip = "";
                        for (var i = 0; i < newValue.Item.length; ++i) {
                            if (tooltip !== "")
                                tooltip += "\n";
                            tooltip += newValue.Item[i];
                        }
                        this.librariesUsedTab.set("tooltip", tooltip);
                    }
                } else if (name === "Clusters") {
                    if (lang.exists("ClusterQueryState.length", newValue)) {
                        var checkIfSuspended = false;
                        if (newValue.ClusterQueryState[0].MixedNodeStates === true) {
                            dom.byId(this.id + "SuspendCluster").src = Utility.getImageURL("mixwarn.png");
                            checkIfSuspended = true;
                        } else if (newValue.ClusterQueryState[0].State === "Suspended") {
                            dom.byId(this.id + "SuspendCluster").src = Utility.getImageURL("errwarn.png");
                            checkIfSuspended = true;
                        }
                        this.suspended.set("checked", checkIfSuspended);
                        this.suspended.set("readOnly", checkIfSuspended);
                        this.errorsTab.set("title", this.i18n.ErrorsStatus + " (" + newValue.ClusterQueryState.length + ")");
                        var tooltip = "";
                        for (var i = 0; i < newValue.ClusterQueryState.length; ++i) {
                            if (tooltip !== "")
                                tooltip += "\n";
                            tooltip += newValue.ClusterQueryState[i].Cluster + " (" + newValue.ClusterQueryState[i].State + ")";
                        }
                        this.errorsTab.set("tooltip", tooltip);
                    }
                }
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QuerySetDetailsWidget.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/QuerySetDetailsWidget.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}', iconClass:'iconLogicalFile'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props='iconClass:\"iconRefresh\"' data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Save\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <div id=\"${id}Reset\" data-dojo-attach-event=\"onClick:_onReset\" data-dojo-type=\"dijit.form.Button\">${i18n.Reset}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <img id=\"${id}SuspendImg\" src=\"\" alt=\"\"/>&nbsp;\n                        <img id=\"${id}SuspendCluster\" src=\"\" alt=\"\"/>&nbsp;\n                        <img id=\"${id}ActiveImg\" src=\"\" alt=\"\"/>&nbsp;\n                        <span id=\"${id}QueryId\" class=\"bold\">${i18n.QueryDetailsfor}</span>\n                        <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}QueryId\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                    </h2>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}QueryName\">${i18n.Name}:</label>\n                                <div id=\"${id}QueryName\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}QuerySet\">${i18n.QuerySet}:</label>\n                                <div id=\"${id}QuerySet\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Priority\">${i18n.Priority}:</label>\n                                <div id=\"${id}Priority\"></div>\n                            </li>\n                            <li> \n                                <label class=\"Prompt\" for=\"${id}PublishedBy\">${i18n.PublishedBy}:</label>\n                                <div id=\"${id}PublishedBy\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Suspended\">${i18n.Suspended}:</label>\n                                <div><input id=\"${id}Suspended\" data-dojo-type=\"dijit.form.CheckBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}SuspendedBy\">${i18n.SuspendedBy}:</label>\n                                <div id=\"${id}SuspendedBy\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Activated\">${i18n.Activated}:</label>\n                                <div><input id=\"${id}Activated\" data-dojo-type=\"dijit.form.CheckBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Comment\">${i18n.Comment}:</label>\n                                <div id=\"${id}Comment\"></div>\n                            </li>\n                            <hr class=\"dashedLine\">\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Wuid\">${i18n.WUID}:</label>\n                                <div id=\"${id}Wuid\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Dll\">${i18n.Dll}:</label>\n                                <div id=\"${id}Dll\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}WUSnapShot\">${i18n.WUSnapShot}:</label>\n                                <div id=\"${id}WUSnapShot\"></div>\n                            </li>\n                             <hr class=\"dashedLine\">\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}IsLibrary\">${i18n.IsLibrary}:</label>\n                                <div id=\"${id}IsLibrary\"></div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_Errors\" title=\"${i18n.Errors}\" data-dojo-props=\"delayWidget: 'QuerySetErrorsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_QuerySetLogicalFiles\" title=\"${i18n.LogicalFiles}\" data-dojo-props=\"delayWidget: 'QuerySetLogicalFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_QuerySetSuperFiles\" title=\"${i18n.SuperFiles}\" data-dojo-props=\"delayWidget: 'QuerySetSuperFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_LibrariesUsed\" title=\"${i18n.LibrariesUsed}\" data-dojo-props=\"delayWidget: 'LibrariesUsedWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Graphs\" title=\"${i18n.Graphs}\" data-dojo-props=\"delayWidget: 'GraphsQueryWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Resources\" title=\"${i18n.Resources}\" data-dojo-props=\"delayWidget: 'ResourcesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_TestPages\" title=\"${i18n.TestPages}\" data-dojo-props=\"delayWidget: 'QueryTestWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Workunit\" title=\"${i18n.Workunit}\" data-dojo-props=\"delayWidget: 'WUDetailsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);