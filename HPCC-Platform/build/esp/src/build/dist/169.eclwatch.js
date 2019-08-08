(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/XrefDetailsWidget":"./eclwatch/XrefDetailsWidget.js",
	"dojo/text!templates/XrefDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/XrefDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[169],{

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

/***/ "./eclwatch/XrefDetailsWidget.js":
/*!***************************************!*\
  !*** ./eclwatch/XrefDetailsWidget.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/request/iframe */ "./node_modules/dojo/request/iframe.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/InfoGridWidget */ "./eclwatch/InfoGridWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDFUXref */ "./lib/src/WsDFUXref.js"),

    __webpack_require__(/*! dojo/text!../templates/XrefDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/XrefDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/NumberTextBox */ "./node_modules/dijit/form/NumberTextBox.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domForm, domAttr, iframe, domClass, query, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    _TabContainerWidget, ESPWorkunit, ESPRequest, TargetSelectWidget, DelayLoadWidget, InfoGridWidget, WsWorkunits, GridDetailsWidget, WsDFUXref,
    template) {
        return declare("XrefDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "XrefDetailsWidget",
            i18n: nlsHPCC,

            initalized: false,
            loaded: false,
            summaryWidget: null,
            foundFilesWidget: null,
            foundFilesWidgetLoaded: null,
            orphanFilesWidget: null,
            orphanFilesWidgetLoaded: null,
            lostFilesWidget: null,
            lostFilesWidgetLoaded: null,
            directoriesWidget: null,
            directoriesWidgetLoaded: null,
            errorsWidget: null,
            errorsWidgetLoaded: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.foundFilesWidget = registry.byId(this.id + "_FoundFiles");
                this.orphanFilesWidget = registry.byId(this.id + "_OrphanFiles");
                this.lostFilesWidget = registry.byId(this.id + "_LostFiles");
                this.directoriesWidget = registry.byId(this.id + "_Directories");
                this.errorsWidget = registry.byId(this.id + "_Errors");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.Name) {
                    dom.byId(this.id + "Cluster").textContent = params.Name;
                    dom.byId(this.id + "LastRun").textContent = params.Modified;
                    dom.byId(this.id + "LastMessage").textContent = params.Status;
                }

                if (params.Status.indexOf('Generated') !== -1){
                    this.setDisabled(this.widget._FoundFiles.id, false);
                    this.setDisabled(this.widget._OrphanFiles.id, false);
                    this.setDisabled(this.widget._LostFiles.id, false);
                    this.setDisabled(this.widget._Directories.id, false);
                    this.setDisabled(this.widget._Errors.id, false);
                } else {
                    this.setDisabled(this.widget._FoundFiles.id, true);
                    this.setDisabled(this.widget._OrphanFiles.id, true);
                    this.setDisabled(this.widget._LostFiles.id, true);
                    this.setDisabled(this.widget._Directories.id, true);
                    this.setDisabled(this.widget._Errors.id, true);
                }
            },

            _onGenerate: function (arg) {
                WsDFUXref.DFUXRefBuild({
                    request: {
                        Cluster: this.params.Name
                    }
                });
            },

            _onCancel: function (arg) {
                WsDFUXref.DFUXRefBuildCancel({
                    request: {}
                });
                alert(this.i18n.AllQueuedItemsCleared);
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel.id === this.widget._FoundFiles.id && !this.widget._FoundFiles.__hpcc_initalized) {
                    this.widget._FoundFiles.init({
                        Name: this.params.Name
                    });
                } else if (currSel.id === this.widget._OrphanFiles.id && !this.widget._OrphanFiles.__hpcc_initalized) {
                    this.widget._OrphanFiles.init({
                        Name: this.params.Name
                    });
                } else if (currSel.id === this.widget._LostFiles.id && !this.widget._LostFiles.__hpcc_initalized) {
                    this.widget._LostFiles.init({
                        Name: this.params.Name
                    });
                } else if (currSel.id === this.widget._Directories.id && !this.widget._Directories.__hpcc_initalized) {
                    this.widget._Directories.init({
                        Name: this.params.Name
                    });
                } else if (currSel.id === this.widget._Errors.id && !this.widget._Errors.__hpcc_initalized) {
                    this.widget._Errors.init({
                        Name: this.params.Name
                    });
                }
            },

        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/XrefDetailsWidget.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/XrefDetailsWidget.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Generate\" data-dojo-attach-event=\"onClick:_onGenerate\" data-dojo-type=\"dijit.form.Button\">${i18n.Generate}</div>\n                    <div id=\"${id}CancelAll\" data-dojo-attach-event=\"onClick:_onCancel\" data-dojo-type=\"dijit.form.Button\">${i18n.CancelAll}</div>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <img src=\"${dojoConfig.urlInfo.resourcePath}/img/cluster.png\" />&nbsp;<span id=\"${id}Cluster\" class=\"bold\">${i18n.Cluster}</span>\n                    </h2>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}LastRun\">${i18n.LastRun}:</label>\n                                <div id=\"${id}LastRun\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}LastMessage\">${i18n.LastMessage}:</label>\n                                <div id=\"${id}LastMessage\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}FoundFile\">${i18n.FoundFile}:</label>\n                                <div id=\"${id}FoundFile\">${i18n.FoundFileMessage}</div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}OrphanFile\">${i18n.OrphanFile2}:</label>\n                                <div id=\"${id}OrphanFile\">${i18n.OrphanMessage}</div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}LostFile\">${i18n.LostFile}:</label>\n                                <div id=\"${id}LostFile\">${i18n.LostFileMessage}</div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_FoundFiles\" title=\"${i18n.FoundFile}\" data-dojo-props=\"delayWidget: 'XrefFoundFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_OrphanFiles\" title=\"${i18n.OrphanFile}\" data-dojo-props=\"delayWidget: 'XrefOrphanFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_LostFiles\" title=\"${i18n.LostFile}\" data-dojo-props=\"delayWidget: 'XrefLostFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Directories\" title=\"${i18n.Directories}\" data-dojo-props=\"delayWidget: 'XrefDirectoriesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Errors\" title=\"${i18n.ErrorWarnings}\" data-dojo-props=\"delayWidget: 'XrefErrorsWarningsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);