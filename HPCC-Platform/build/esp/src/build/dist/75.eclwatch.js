(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/ResultsWidget":"./eclwatch/ResultsWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[75],{

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

/***/ "./eclwatch/ResultsWidget.js":
/*!***********************************!*\
  !*** ./eclwatch/ResultsWidget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),

    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on,
    ContentPane, Button,
    selector,
    GridDetailsWidget, ESPRequest, ESPWorkunit, DelayLoadWidget, ESPUtil) {
        return declare("ResultsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_Results,
            idProperty: "Sequence",

            wu: null,

            _onRowDblClickFile: function (row) {
                var tab = this.ensurePane(row, {
                    logicalFile: true
                });
                this.selectChild(tab);
            },

            _onRowDblClickView: function (row, viewName) {
                var tab = this.ensurePane(row, {
                    resultView: true,
                    viewName: viewName
                });
                this.selectChild(tab);
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.alphanumSort["Name"] = true;
                this.alphanumSort["Value"] = true;

                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    var monitorCount = 4;
                    var context = this;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.refreshGrid();
                        }
                    });
                }
                this._refreshActionState();
            },

            createGrid: function (domID) {
                var context = this;
                this.openViz = new Button({
                    label: this.i18n.Visualize,
                    onClick: function (event) {
                        context._onOpen(event, {
                            vizMode: true
                        });
                    }
                }).placeAt(this.widget.Open.domNode, "after");

                this.openLegacy = new Button({
                    label: this.i18n.OpenLegacyMode,
                    onClick: function (event) {
                        context._onOpen(event, {
                            legacyMode: true
                        });
                    }
                }).placeAt(this.widget.Open.domNode, "after");

                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        Name: {
                            label: this.i18n.Name, width: 180, sortable: true,
                            formatter: function (Name, idx) {
                                return "<a href='#' class='dgrid-row-url'>" + Name + "</a>";
                            }
                        },
                        FileName: {
                            label: this.i18n.FileName, sortable: true,
                            formatter: function (FileName, idx) {
                                return "<a href='#' class='dgrid-row-url2'>" + FileName + "</a>";
                            }
                        },
                        Value: {
                            label: this.i18n.Value,
                            width: 360,
                            sortable: true
                        },
                        ResultViews: {
                            label: this.i18n.Views, sortable: true,
                            formatter: function (ResultViews, idx) {
                                var retVal = "";
                                arrayUtil.forEach(ResultViews, function (item, idx) {
                                    retVal += "<a href='#' viewName=" + encodeURIComponent(item) + " class='dgrid-row-url3'>" + item + "</a>&nbsp;";
                                });
                                return retVal;
                            }
                        }
                    }
                }, domID);

                retVal.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = context.grid.row(evt).data;
                        context._onRowDblClick(row);
                    }
                });
                retVal.on(".dgrid-row-url2:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = context.grid.row(evt).data;
                        context._onRowDblClickFile(row);
                    }
                });
                retVal.on(".dgrid-row-url3:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = context.grid.row(evt).data;
                        context._onRowDblClickView(row, evt.srcElement.getAttribute("viewName"));
                    }
                });
                return retVal;
            },

            getDetailID: function (row, params) {
                var retVal = "Detail" + row[this.idProperty];
                if (params) {
                    if (params.vizMode) {
                        retVal += "Viz";
                    } else if (params.legacyMode) {
                        retVal += "Legacy";
                    }
                }
                return retVal;
            },

            createDetail: function (id, row, params) {
                if (params && params.vizMode) {
                    return new DelayLoadWidget({
                        id: id,
                        title: "[V] " + row.Name,
                        closable: true,
                        delayWidget: "VizWidget",
                        hpcc: {
                            type: "VizWidget",
                            params: {
                                Wuid: row.Wuid,
                                Sequence: row.Sequence
                            }
                        }
                    });
                } else if (params && params.legacyMode) {
                    return new DelayLoadWidget({
                        id: id,
                        title: "[L] " + row.Name,
                        closable: true,
                        delayWidget: "IFrameWidget",
                        hpcc: {
                            type: "IFrameWidget",
                            params: {
                                src: "/WsWorkunits/WUResult?Wuid=" + row.Wuid + "&Sequence=" + row.Sequence
                            }
                        }
                    });
                } else if (row.FileName && params && params.logicalFile) {
                    return new DelayLoadWidget({
                        id: id,
                        title: "[F] " + row.Name,
                        closable: true,
                        delayWidget: "LFDetailsWidget",
                        hpcc: {
                            type: "LFDetailsWidget",
                            params: {
                                Name: row.FileName
                            }
                        }
                    });
                } else if (params && params.resultView && params.viewName) {
                    return new ContentPane({
                        id: id,
                        title: row.Name + " [" + decodeURIComponent(params.viewName) + "]",
                        closable: true,
                        content: dojo.create("iframe", {
                            src: ESPRequest.getBaseURL("WsWorkunits") + "/WUResultView?Wuid=" + row.Wuid + "&ResultName=" + row.Name + "&ViewName=" + params.viewName,
                            style: "border: 0; width: 100%; height: 100%"
                        }),
                        hpcc: {
                            type: "ContentPane",
                            params: {
                                Name: row.Name,
                                viewName: params.viewName
                            }
                        },
                        noRefresh: true
                    });
                } else {
                    return new DelayLoadWidget({
                        id: id,
                        title: row.Name,
                        closable: true,
                        style: "padding: 0px; overflow: hidden",
                        delayWidget: "ResultWidget",
                        hpcc: {
                            type: "ResultWidget",
                            params: {
                                Wuid: row.Wuid,
                                Sequence: row.Sequence
                            }
                        }
                    });
                }
            },

            refreshGrid: function (args) {
                var context = this;
                this.wu.getInfo({
                    onGetResults: function (results) {
                        context.store.setData(results);
                        context.grid.refresh();
                    }
                });
            },

            refreshActionState: function (selection) {
                this.inherited(arguments);

                this.openLegacy.set("disabled", !this.wu || !selection.length);
                this.openViz.set("disabled", !this.wu || !selection.length);
            }

        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);