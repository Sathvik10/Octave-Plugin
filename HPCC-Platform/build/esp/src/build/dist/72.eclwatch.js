(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/WUDetailsWidget":"./eclwatch/WUDetailsWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"src/WUStatus":"./lib/src/WUStatus.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dijit/form/Textarea":"./node_modules/dijit/form/Textarea.js",
	"dijit/form/_ExpandingTextAreaMixin":"./node_modules/dijit/form/_ExpandingTextAreaMixin.js",
	"dojo/text!templates/WUDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[72],{

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

/***/ "./eclwatch/WUDetailsWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/WUDetailsWidget.js ***!
  \*************************************/
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
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
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

    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPActivity */ "./lib/src/ESPActivity.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/InfoGridWidget */ "./eclwatch/InfoGridWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),

    __webpack_require__(/*! src/WUStatus */ "./lib/src/WUStatus.js"),

    __webpack_require__(/*! dojo/text!../templates/WUDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUDetailsWidget.html"),

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
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domForm, domAttr, iframe, domClass, on, query, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    Clippy,
    _TabContainerWidget, ESPWorkunit, ESPActivity, ESPRequest, TargetSelectWidget, DelayLoadWidget, InfoGridWidget, WsWorkunits,
    WUStatusModule,
    template) {
        return declare("WUDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "WUDetailsWidget",
            i18n: nlsHPCC,

            summaryWidget: null,
            resultsWidget: null,
            resultsWidgetLoaded: false,
            filesWidget: null,
            filesWidgetLoaded: false,
            timersWidget: null,
            timersWidgetLoaded: false,
            graphsWidget: null,
            graphsWidgetLoaded: false,
            logsWidget: null,
            logsWidgetLoaded: false,
            eclWidget: null,
            eclWidgetLoaded: false,
            xmlWidget: null,
            xmlWidgetLoaded: false,
            publishForm: null,

            wu: null,
            buildVersion: null,
            espIPAddress: null,
            thorIPAddress: null,
            zapDescription: null,
            warnHistory: null,
            warnTimings: null,
            logDate: null,
            clusterGroup: null,
            maxSlaves: null,

            prevState: "",

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.resultsWidget = registry.byId(this.id + "_Results");
                this.filesWidget = registry.byId(this.id + "_Files");
                this.timersWidget = registry.byId(this.id + "_Timers");
                this.graphsWidget = registry.byId(this.id + "_Graphs");
                this.logsWidget = registry.byId(this.id + "_Logs");
                this.eclWidget = registry.byId(this.id + "_ECL");
                this.xmlWidget = registry.byId(this.id + "_XML");
                this.publishForm = registry.byId(this.id + "PublishForm");
                this.zapDescription = registry.byId(this.id + "ZapDescription");
                this.zapForm = registry.byId(this.id + "ZapForm");
                this.warnHistory = registry.byId(this.id + "WarnHistory");
                this.warnTimings = registry.byId(this.id + "WarnTimings");
                this.clusters = registry.byId(this.id + "Clusters");
                this.allowedClusters = registry.byId(this.id + "AllowedClusters");
                this.thorProcess = registry.byId(this.id + "ThorProcess");
                this.slaveNumber = registry.byId(this.id + "SlaveNumber");
                this.fileFormat = registry.byId(this.id + "FileFormat");
                this.slaveLogs = registry.byId(this.id + "SlaveLogs");
                this.includeSlaveLogsCheckbox = registry.byId(this.id + "IncludeSlaveLogsCheckbox");
                this.logsForm = registry.byId(this.id + "LogsForm");
                this.allowOnlyNumber = registry.byId(this.id + "AllowOnlyNumber");
                this.emailCheckbox = registry.byId(this.id + "EmailCheckbox");
                this.emailTo = registry.byId(this.id + "EmailTo");
                this.emailFrom = registry.byId(this.id + "EmailFrom");
                this.emailSubject = registry.byId(this.id + "EmailSubject");
                this.emailBody = registry.byId(this.id + "EmailBody");
                this.protected = registry.byId(this.id + "Protected");

                this.infoGridWidget = registry.byId(this.id + "InfoContainer");
                this.zapDialog = registry.byId(this.id + "ZapDialog");

                Clippy.attach(this.id + "ClippyButton");

                this.wuStatus = new WUStatusModule.WUStatus()
                    .baseUrl("")
                    ;
            },

            startup: function (args) {
                this.inherited(arguments);
                this.__globalActivities = ESPActivity.Get();
            },

            destroy: function (args) {
                this.zapDialog.destroyRecursive();
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_WUDetails;
            },

            _onCancelDialog: function () {
                this.zapDialog.hide();
                this.checkThorLogStatus();
            },

            _onSubmitDialog: function(){
                var includeSlaveLogsCheckbox = this.includeSlaveLogsCheckbox.get("checked");
                if (this.zapForm.validate()) {
                    //WUCreateAndDownloadZAPInfo is not a webservice so relying on form to submit.
                    //Server treats "on" and '' as the same thing.
                    this.includeSlaveLogsCheckbox.set("value", includeSlaveLogsCheckbox ? "on" : "off");
                    this.zapForm.set("action", "/WsWorkunits/WUCreateAndDownloadZAPInfo");
                    this.zapDialog.hide();
                    this.checkThorLogStatus();
                }
            },

            //  Hitched actions  ---
            _onSave: function(event) {
                var protectedCheckbox = registry.byId(this.id + "Protected");
                var context = this;
                this.wu.update({
                    State: dom.byId(this.id + "State").innerHTML,
                    Jobname: dom.byId(context.id + "Jobname").value,
                    Description: dom.byId(context.id + "Description").value,
                    Protected: protectedCheckbox.get("value"),
                    Scope: dom.byId(context.id + "Scope").value,
                    ClusterSelection: this.allowedClusters.get("value")
                }, null);
            },
            _onRestore: function (event) {
                this.wu.restore();
            },
            _onAutoRefresh: function (event) {
                this.wu.disableMonitor(!this.widget.AutoRefresh.get("checked"));
            },
            _onRefresh: function (event) {
                this.wu.refresh(true);
            },
            _onClone: function (event) {
                this.wu.clone();
            },
            _onDelete: function (event) {
                if (confirm(this.i18n.YouAreAboutToDeleteThisWorkunit)) {
                    this.wu.doDelete();
                }
            },
            _onResubmit: function (event) {
                this.wu.resubmit();
            },
            _onSetToFailed: function (event) {
                this.wu.setToFailed();
            },
            _onAbort: function (event) {
                this.wu.abort();
            },
            _onRecover: function (event) {
                this.wu.recover();
            },
            _onDeschedule: function (event) {
                this.wu.doDeschedule();
            },
            _onReschedule: function (event) {
                this.wu.doReschedule();
            },
            _onPublish: function (event) {
                var allowForeign = registry.byId(this.id + "AllowForeignFiles");
                if (allowForeign.checked === true) {
                    allowForeign.value = 1;
                } else {
                    allowForeign.value = 0;
                }
                var updateSupers = registry.byId(this.id + "UpdateSuperFiles");
                if (updateSupers.checked === true) {
                    updateSupers.value = 1;
                } else {
                    updateSupers.value = 0;
                }
                if (this.publishForm.validate()) {
                    registry.byId(this.id + "Publish").closeDropDown();
                    this.wu.publish(
                        dom.byId(this.id + "Jobname2").value,
                        dom.byId(this.id + "RemoteDali").value,
                        dom.byId(this.id + "SourceProcess").value,
                        registry.byId(this.id + "Priority").value,
                        dom.byId(this.id + "Comment").value,
                        allowForeign.value,
                        updateSupers.value
                    );
                }
            },
            _onActiveGraph: function() {
                this.graphsWidgetLoaded = true;
                var context = this;
                this.graphsWidget.init({
                    Wuid: this.wu.Wuid
                }).then(function(w) {
                    w.openGraph(context.wu.GraphName, "sg" + context.wu.GID);
                });
                this.selectChild(this.graphsWidget.id);
            },

            _onZapReport: function (event) {
                var context = this;
                WsWorkunits.WUGetZAPInfo({
                    request: {
                        WUID: this.wu.Wuid
                    }
                }).then(function (response) {
                    context.zapDialog.show();
                    context.emailCheckbox.on("change", function(evt){
                        if (context.emailCheckbox.get("checked")){
                            context.emailSubject.set("required", true);
                        } else {
                            context.emailSubject.set("required", false);
                        }
                    });
                    if (lang.exists("WUGetZAPInfoResponse", response)) {
                        if (response.WUGetZAPInfoResponse.EmailTo) {
                            context.emailCheckbox.set("disabled", false);
                            context.emailTo.set("disabled", false);
                            context.emailFrom.set("disabled", false);
                            context.emailSubject.set("disabled", false);
                            context.emailBody.set("disabled", false);
                        } else {
                            context.emailCheckbox.set("disabled", true);
                            context.emailTo.set("disabled", true);
                            context.emailFrom.set("disabled", true);
                            context.emailSubject.set("disabled", true);
                            context.emailBody.set("disabled", true);
                        }
                        context.updateInput("ZapWUID", null, response.WUGetZAPInfoResponse.WUID);
                        context.updateInput("BuildVersion", null, response.WUGetZAPInfoResponse.BuildVersion);
                        context.updateInput("ESPIPAddress", null, response.WUGetZAPInfoResponse.ESPIPAddress);
                        context.updateInput("ThorIPAddress", null, response.WUGetZAPInfoResponse.ThorIPAddress);
                        context.updateInput("EmailTo", null, response.WUGetZAPInfoResponse.EmailTo);
                        context.updateInput("EmailFrom", null, response.WUGetZAPInfoResponse.EmailFrom);

                        context.buildVersion = response.WUGetZAPInfoResponse.BuildVersion;
                        context.espIPAddress = response.WUGetZAPInfoResponse.ESPIPAddress;
                        context.thorIPAddress = response.WUGetZAPInfoResponse.ThorIPAddress;
                        context.emailTo = response.WUGetZAPInfoResponse.EmailTo;
                        context.emailFrom = response.WUGetZAPInfoResponse.EmailFrom;
                    }
                });
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.graphLink = dom.byId(this.id + "ActiveGraph");

                if (params.Wuid) {
                    this.summaryWidget.set("title", params.Wuid);

                    dom.byId(this.id + "Wuid").textContent = params.Wuid;
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    var data = this.wu.getData();
                    for (var key in data) {
                        this.updateInput(key, null, data[key]);
                    }
                    var context = this;
                    this.wu.watch(function (name, oldValue, newValue) {
                        context.updateInput(name, oldValue, newValue);
                    });
                    this.wu.refresh();
                }

                this.infoGridWidget.init(params);
                this.checkIfClustersAllowed();
                this.checkThorLogStatus();
                this.wuStatus
                    .target(this.id + "WUStatus")
                    .wuid(params.Wuid)
                    .lazyRender()
                    ;

                this.protected.on("change", function(evt){
                    context._onSave();
                })
            },

            initTab: function () {
                if (!this.wu) {
                    return
                }
                var currSel = this.getSelectedChild();
                if (currSel.id === this.widget._Variables.id && !this.widget._Variables.__hpcc_initalized) {
                    this.widget._Variables.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.widget._Workflows.id && !this.widget._Workflows.__hpcc_initalized) {
                    this.widget._Workflows.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.resultsWidget.id && !this.resultsWidgetLoaded) {
                    this.resultsWidgetLoaded = true;
                    this.resultsWidget.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.filesWidget.id && !this.filesWidgetLoaded) {
                    this.filesWidgetLoaded = true;
                    this.filesWidget.init({
                        Wuid: this.wu.Wuid,
                        SourceFiles: true
                    });
                } else if (currSel.id === this.timersWidget.id && !this.timersWidgetLoaded) {
                    this.timersWidgetLoaded = true;
                    this.timersWidget.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.graphsWidget.id && !this.graphsWidgetLoaded) {
                    this.graphsWidgetLoaded = true;
                    this.graphsWidget.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.widget._Queries.id && !this.widget._Queries.__hpcc_initalized) {
                    this.widget._Queries.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.widget._Resources.id && !this.resourcesWidgetLoaded) {
                    this.resourcesWidgetLoaded = true;
                    this.widget._Resources.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.logsWidget.id && !this.logsWidgetLoaded) {
                    this.logsWidgetLoaded = true;
                    this.logsWidget.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.eclWidget.id && !this.eclWidgetLoaded) {
                    this.eclWidgetLoaded = true;
                    this.eclWidget.init({
                        Wuid: this.wu.Wuid
                    });
                } else if (currSel.id === this.xmlWidget.id && !this.xmlWidgetLoaded) {
                    this.xmlWidgetLoaded = true;
                    this.xmlWidget.init({
                        Wuid: this.wu.Wuid
                    });
                }
            },

            resetPage: function () {
            },

            objectToText: function (obj) {
                var text = ""
                for (var key in obj) {
                    text += "<tr><td>" + key + ":</td>";
                    if (typeof obj[key] === "object") {
                        text += "[<br/>";
                        for (var i = 0; i < obj[key].length; ++i) {
                            text += this.objectToText(obj[key][i]);
                        }
                        text += "<br/>]<br/>";
                    } else {
                        text += "<td>" + obj[key] + "</td></tr>";

                    }
                }
                return text;
            },

            checkIfClustersAllowed: function () {
                var context = this;
                WsWorkunits.WUInfo({
                    request: {
                        Wuid: this.wu.Wuid
                    }
                }).then(function (response) {
                    if (lang.exists("WUInfoResponse.Workunit.AllowedClusters.AllowedCluster", response)) {
                        var targetData = response.WUInfoResponse.Workunit.AllowedClusters.AllowedCluster;
                        if (targetData.length > 1) {
                            context.allowedClusters.options.push({
                                label: "&nbsp;",
                                value: ""
                            });
                            for (var i = 0; i < targetData.length; ++i) {
                                context.allowedClusters.options.push({
                                    label: targetData[i],
                                    value: targetData[i]
                                });
                            }
                            context.allowedClusters.set("value", "")
                            domClass.add(context.id + "Cluster", "hidden");
                        } else {
                            domClass.add(context.id + "AllowedClusters", "hidden");
                        }
                    }
                });
            },

            checkThorLogStatus: function () {
                var context = this;
                WsWorkunits.WUInfo({
                    request: {
                        Wuid: this.wu.Wuid
                    }
                }).then(function (response) {
                    if (lang.exists("WUInfoResponse.Workunit.ThorLogList.ThorLogInfo", response)) {
                        context.maxSlaves = response.WUInfoResponse.Workunit.ThorLogList.ThorLogInfo[0].NumberSlaves;
                        context.slaveNumber.set("maxLength", context.maxSlaves);
                        dom.byId("SlavesMaxNumber").innerHTML = context.i18n.NumberofSlaves + " " + response.WUInfoResponse.Workunit.ThorLogList.ThorLogInfo[0].NumberSlaves;
                        context.logDate = response.WUInfoResponse.Workunit.ThorLogList.ThorLogInfo[0].LogDate;
                        context.clusterGroup = response.WUInfoResponse.Workunit.ThorLogList.ThorLogInfo[0].ProcessName;
                        context.slaveLogs.set("disabled", false);
                        context.includeSlaveLogsCheckbox.set("disabled", false);
                        context.includeSlaveLogsCheckbox.set("checked", false);
                        context.emailCheckbox.set("checked", false);
                        var targetData = response.WUInfoResponse.Workunit.ThorLogList.ThorLogInfo;
                        for (var i = 0; i < targetData.length; ++i) {
                            context.thorProcess.options.push({
                                label: targetData[i].ProcessName,
                                value: targetData[i].ProcessName
                            });
                        }
                        context.thorProcess.set("value", targetData[0].ProcessName);
                    } else {
                        context.slaveLogs.set("disabled", true);
                        context.includeSlaveLogsCheckbox.set("disabled", true);
                    }
                });
            },

            _getURL: function (completeURL) {
                return ESPRequest.getBaseURL() + completeURL;
            },

            _getDownload: function () {
                var context = this;
                if (this.logsForm.validate() && context.slaveNumber.get("value") <= context.maxSlaves) {
                    dom.byId("AllowOnlyNumber").innerHTML = "";
                    var buildURL = "/WUFile?" + "Wuid=" + this.wu.Wuid + "&Type=ThorSlaveLog" + "&Process=" + this.thorProcess.get("value") + "&ClusterGroup=" + this.clusterGroup + "&LogDate=" + this.logDate + "&SlaveNumber=" + this.slaveNumber.get("value") + "&Option=" + this.fileFormat.get("value");
                    window.open(this._getURL(buildURL));
                } else if (context.slaveNumber.get("value") > context.maxSlaves) {
                    dom.byId("AllowOnlyNumber").innerHTML = context.i18n.PleaseEnterANumber + context.maxSlaves;
                }
            },

            updateInput: function (name, oldValue, newValue) {
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
                        }
                    }
                }
                if (name === "Protected") {
                    dom.byId(this.id + "ProtectedImage").src = this.wu.getProtectedImage();
                } else if (name === "Jobname") {
                    this.updateInput("Jobname2", oldValue, newValue);
                    this.summaryWidget.set("tooltip", newValue);
                } else if (name === "WorkflowCount" && newValue) {
                    this.widget._Workflows.set("title", this.i18n.Workflows + " (" + newValue + ")");
                    this.setDisabled(this.widget._Workflows.id, false);
                } else if (name === "variables") {
                    var tooltip = "";
                    for (var key in newValue) {
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[key].Name;
                        if (newValue[key].Value)
                            tooltip += " " + newValue[key].Value;
                    }
                    this.widget._Variables.set("tooltip", tooltip);
                } else if (name === "ResultCount" && newValue) {
                    this.resultsWidget.set("title", this.i18n.Outputs + " (" + newValue + ")");
                    this.setDisabled(this.resultsWidget.id, false);
                } else if (name === "results") {
                    this.resultsWidget.set("title", this.i18n.Outputs + " (" + newValue.length + ")");
                    var tooltip = "";
                    for (var key in newValue) {
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[key].Name;
                        if (newValue[key].Value)
                            tooltip += " " + newValue[key].Value;
                    }
                    this.resultsWidget.set("tooltip", tooltip);
                    this.setDisabled(this.resultsWidget.id, false);
                } else if (name === "SourceFileCount" && newValue) {
                    this.filesWidget.set("title", this.i18n.Inputs + " (" + newValue + ")");
                    this.setDisabled(this.filesWidget.id, false);
                } else if (name === "sourceFiles") {
                    this.filesWidget.set("title", this.i18n.Inputs + " (" + newValue.length + ")");
                    var tooltip = "";
                    for (var i = 0; i < newValue.length; ++i) {
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[i].Name;
                    }
                    this.filesWidget.set("tooltip", tooltip);
                    this.setDisabled(this.filesWidget.id, false);
                } else if (name === "TimerCount" && newValue) {
                    this.timersWidget.set("title", this.i18n.Timers + " (" + newValue + ")");
                    this.setDisabled(this.timersWidget.id, false);
                } else if (name === "timers") {
                    this.timersWidget.set("title", this.i18n.Timers + " (" + newValue.length + ")");
                    var tooltip = "";
                    for (var i = 0; i < newValue.length; ++i) {
                        if (newValue[i].GraphName)
                            continue;
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[i].Name;
                        if (newValue[i].Value)
                            tooltip += " " + newValue[i].Value;
                    }
                    this.timersWidget.set("tooltip", tooltip);
                    this.setDisabled(this.timersWidget.id, false);
                } else if (name === "GraphCount" && newValue) {
                    this.graphsWidget.set("title", this.i18n.Graphs + " (" + newValue + ")");
                    this.setDisabled(this.graphsWidget.id, false);
                } else if (name === "graphs") {
                    this.graphsWidget.set("title", this.i18n.Graphs + " (" + newValue.length + ")");
                    var tooltip = "";
                    for (var i = 0; i < newValue.length; ++i) {
                        if (tooltip !== "")
                            tooltip += "\n";
                        tooltip += newValue[i].Name;
                        if (newValue[i].Time)
                            tooltip += " " + newValue[i].Time;
                    }
                    this.graphsWidget.set("tooltip", tooltip);
                    this.setDisabled(this.graphsWidget.id, false);
                } else if (name === "resourceURLCount" && newValue) {
                    this.widget._Resources.set("title", this.i18n.Resources + " (" + newValue + ")");
                    this.setDisabled(this.widget._Resources.id, false);
                } else if (name === "helpersCount" && newValue) {
                    this.logsWidget.set("title", this.i18n.Helpers + " (" + newValue + ")");
                    this.setDisabled(this.logsWidget.id, false);
                } else if (name === "Archived") {
                    this.refreshActionState();
                } else if (name === "StateID") {
                    this.refreshActionState();
                } else if (name === "GraphName" || name === "GID") {
                    this.graphLink.innerText = this.wu.GraphName && this.wu.GID ? this.wu.GraphName + " - " + this.wu.GID : "";
                } else if (name === "ActionEx") {
                    this.refreshActionState();
                } else if (name === "EventSchedule") {
                    this.refreshActionState();
                } else if (name === "hasCompleted") {
                    this.checkIfComplete();
                } else if (name === "Scope" && newValue) {
                    domClass.remove("scopeOptional", "hidden");
                    domClass.add("scopeOptional", "show");
                }
                if (name === "__hpcc_changedCount" && newValue > 0) {
                    var getInt = function (item) {
                        if (item)
                            return item;
                        return 0;
                    };
                    this.widget._Variables.set("title", this.i18n.Variables + " (" + (getInt(this.wu.VariableCount) + getInt(this.wu.ApplicationValueCount) + getInt(this.wu.DebugValueCount)) + ")");
                    this.setDisabled(this.widget._Variables.id, false);
                }
            },

            refreshActionState: function () {
                var isArchived = this.wu.get("Archived");
                this.setDisabled(this.id + "AutoRefresh", isArchived || this.wu.isComplete(), "iconAutoRefresh", "iconAutoRefreshDisabled");
                registry.byId(this.id + "Save").set("disabled", isArchived || (!this.wu.isComplete() && !this.wu.isBlocked()) || this.wu.isDeleted());
                registry.byId(this.id + "Delete").set("disabled", isArchived || !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Restore").set("disabled", !isArchived);
                registry.byId(this.id + "SetToFailed").set("disabled", isArchived || this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Abort").set("disabled", isArchived || this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Clone").set("disabled", isArchived || !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Resubmit").set("disabled", isArchived || !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Recover").set("disabled", isArchived || !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Publish").set("disabled", isArchived || !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "ZapReport").set("disabled", this.wu.isDeleted());
                registry.byId(this.id + "Reschedule").set("disabled", !this.wu.isAbleToReschedule());
                registry.byId(this.id + "Deschedule").set("disabled", !this.wu.isAbleToDeschedule());

                registry.byId(this.id + "Jobname").set("readOnly", !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Description").set("readOnly", !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Protected").set("readOnly", !this.wu.isComplete() || this.wu.isDeleted());

                this.summaryWidget.set("iconClass", this.wu.getStateIconClass());
                domClass.remove(this.id + "StateIdImage");
                domClass.add(this.id + "StateIdImage", this.wu.getStateIconClass());
            },

            checkIfComplete: function () {
                var context = this;
                if (this.wu.isComplete()) {
                    this.wu.getInfo({
                        onGetVariables: function (response) {
                        }
                    });
                }
            },

            monitorWorkunit: function (response) {
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

/***/ "./lib/src/WUStatus.js":
/*!*****************************!*\
  !*** ./lib/src/WUStatus.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/util */ "./node_modules/@hpcc-js/util/dist/index.min.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, comms_1, graph_1, util_1, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var WUStatus = /** @class */ (function (_super) {
        tslib_1.__extends(WUStatus, _super);
        function WUStatus() {
            var _this = _super.call(this) || this;
            _this
                .zoomable(false)
                .zoomToFitLimit(1)
                .layout("Hierarchy")
                .hierarchyRankDirection("LR")
                .showToolbar(false)
                .allowDragging(false);
            return _this;
        }
        WUStatus.prototype.attachWorkunit = function () {
            var _this = this;
            var hash = util_1.hashSum({
                baseUrl: this.baseUrl(),
                wuid: this.wuid()
            });
            if (this._prevHash !== hash) {
                this._prevHash = hash;
                this._wu = comms_1.Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid());
                if (this._wuHandle) {
                    this._wuHandle.release();
                }
                this._wuHandle = this._wu.watch(function (changes) {
                    _this.lazyRender();
                });
            }
        };
        WUStatus.prototype.createVertex = function (faChar) {
            return new graph_1.Vertex()
                .icon_diameter(32)
                .icon_shape_colorFill("none")
                .icon_shape_colorStroke("none")
                .icon_image_colorFill("darkgray")
                .iconAnchor("middle")
                .textbox_shape_colorFill("none")
                .textbox_shape_colorStroke("none")
                .textbox_text_colorFill("darkgray")
                .faChar(faChar);
        };
        WUStatus.prototype.updateVertex = function (vertex, color) {
            vertex
                .icon_image_colorFill(color)
                .textbox_text_colorFill(color);
        };
        WUStatus.prototype.updateVertexStatus = function (level, active) {
            if (active === void 0) { active = false; }
            var completeColor = this._wu.isFailed() ? "darkred" : "darkgreen";
            this._create.text(nlsHPCC.Created);
            this._compile.text(nlsHPCC.Compiled);
            this._execute.text(nlsHPCC.Executed);
            this._complete.text(nlsHPCC.Completed);
            switch (level) {
                case 0:
                    this.updateVertex(this._create, "darkgray");
                    this.updateVertex(this._compile, "darkgray");
                    this.updateVertex(this._execute, "darkgray");
                    this.updateVertex(this._complete, "darkgray");
                    break;
                case 1:
                    this._create.text(nlsHPCC.Creating);
                    this.updateVertex(this._create, active ? "orange" : completeColor);
                    this.updateVertex(this._compile, "darkgray");
                    this.updateVertex(this._execute, "darkgray");
                    this.updateVertex(this._complete, "darkgray");
                    break;
                case 2:
                    this._compile.text(nlsHPCC.Compiling);
                    this.updateVertex(this._create, completeColor);
                    this.updateVertex(this._compile, active ? "orange" : completeColor);
                    this.updateVertex(this._execute, completeColor);
                    this.updateVertex(this._complete, "darkgray");
                    break;
                case 3:
                    this._execute.text(nlsHPCC.Executing);
                    this.updateVertex(this._create, completeColor);
                    this.updateVertex(this._compile, completeColor);
                    this.updateVertex(this._execute, active ? "orange" : completeColor);
                    this.updateVertex(this._complete, "darkgray");
                    break;
                case 4:
                    this.updateVertex(this._create, completeColor);
                    this.updateVertex(this._compile, completeColor);
                    this.updateVertex(this._execute, completeColor);
                    this.updateVertex(this._complete, completeColor);
                    break;
            }
        };
        WUStatus.prototype.createEdge = function (source, target) {
            return new graph_1.Edge()
                .sourceVertex(source)
                .targetVertex(target)
                .strokeColor("black")
                .showArc(false);
        };
        WUStatus.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._create = this.createVertex("\uf11d");
            this._compile = this.createVertex("\uf085");
            this._execute = this.createVertex("\uf275");
            this._complete = this.createVertex("\uf11e");
            var e1 = this.createEdge(this._create, this._compile);
            var e2 = this.createEdge(this._compile, this._execute);
            var e3 = this.createEdge(this._execute, this._complete);
            this.data({
                vertices: [this._create, this._compile, this._execute, this._complete],
                edges: [e1, e2, e3]
            });
        };
        WUStatus.prototype.update = function (domNode, element) {
            this.attachWorkunit();
            switch (this._wu.StateID) {
                case comms_1.WUStateID.Blocked:
                case comms_1.WUStateID.Wait:
                case comms_1.WUStateID.Scheduled:
                case comms_1.WUStateID.UploadingFiled:
                    this.updateVertexStatus(1);
                    break;
                case comms_1.WUStateID.Compiling:
                    this.updateVertexStatus(2, true);
                    break;
                case comms_1.WUStateID.Submitted:
                    this.updateVertexStatus(1, true);
                    break;
                case comms_1.WUStateID.Compiled:
                    this.updateVertexStatus(2);
                    break;
                case comms_1.WUStateID.Aborting:
                case comms_1.WUStateID.Running:
                    this.updateVertexStatus(3, true);
                    break;
                case comms_1.WUStateID.Aborted:
                case comms_1.WUStateID.Archived:
                case comms_1.WUStateID.Completed:
                    this.updateVertexStatus(4);
                    break;
                case comms_1.WUStateID.Failed:
                    this.updateVertexStatus(4, false);
                    break;
                case comms_1.WUStateID.DebugPaused:
                case comms_1.WUStateID.DebugRunning:
                case comms_1.WUStateID.Paused:
                case comms_1.WUStateID.Unknown:
                default:
                    this.updateVertexStatus(0);
                    break;
            }
            _super.prototype.update.call(this, domNode, element);
            this.zoomToFit();
        };
        WUStatus.prototype.exit = function (domNode, element) {
            if (this._wuHandle) {
                this._wuHandle.release();
            }
            _super.prototype.exit.call(this, domNode, element);
        };
        return WUStatus;
    }(graph_1.Graph));
    exports.WUStatus = WUStatus;
    WUStatus.prototype._class += " eclwatch_WUStatus";
    WUStatus.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
    WUStatus.prototype.publish("wuid", "", "string", "Workunit ID");
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WUStatus.js.map

/***/ }),

/***/ "./node_modules/dijit/form/SimpleTextarea.js":
/*!***************************************************!*\
  !*** ./node_modules/dijit/form/SimpleTextarea.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie") has("opera")
	__webpack_require__(/*! ./TextBox */ "./node_modules/dijit/form/TextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, has, TextBox){

	// module:
	//		dijit/form/SimpleTextarea

	return declare("dijit.form.SimpleTextarea", TextBox, {
		// summary:
		//		A simple textarea that degrades, and responds to
		//		minimal LayoutContainer usage, and works with dijit/form/Form.
		//		Doesn't automatically size according to input, like Textarea.
		//
		// example:
		//	|	<textarea data-dojo-type="dijit/form/SimpleTextarea" name="foo" value="bar" rows=30 cols=40></textarea>
		//
		// example:
		//	|	new SimpleTextarea({ rows:20, cols:30 }, "foo");

		baseClass: "dijitTextBox dijitTextArea",

		// rows: Number
		//		The number of rows of text.
		rows: "3",

		// rows: Number
		//		The number of characters per line.
		cols: "20",

		templateString: "<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",

		postMixInProperties: function(){
			// Copy value from srcNodeRef, unless user specified a value explicitly (or there is no srcNodeRef)
			// TODO: parser will handle this in 2.0
			if(!this.value && this.srcNodeRef){
				this.value = this.srcNodeRef.value;
			}
			this.inherited(arguments);
		},

		buildRendering: function(){
			this.inherited(arguments);
			if(has("ie") && this.cols){ // attribute selectors is not supported in IE6
				domClass.add(this.textbox, "dijitTextAreaCols");
			}
		},

		filter: function(/*String*/ value){
			// Override TextBox.filter to deal with newlines... specifically (IIRC) this is for IE which writes newlines
			// as \r\n instead of just \n
			if(value){
				value = value.replace(/\r/g, "");
			}
			return this.inherited(arguments);
		},

		_onInput: function(/*Event?*/ e){
			// Override TextBox._onInput() to enforce maxLength restriction
			if(this.maxLength){
				var maxLength = parseInt(this.maxLength);
				var value = this.textbox.value.replace(/\r/g, '');
				var overflow = value.length - maxLength;
				if(overflow > 0){
					var textarea = this.textbox;
					if(textarea.selectionStart){
						var pos = textarea.selectionStart;
						var cr = 0;
						if(has("opera")){
							cr = (this.textbox.value.substring(0, pos).match(/\r/g) || []).length;
						}
						this.textbox.value = value.substring(0, pos - overflow - cr) + value.substring(pos - cr);
						textarea.setSelectionRange(pos - overflow, pos - overflow);
					}else if(this.ownerDocument.selection){ //IE
						textarea.focus();
						var range = this.ownerDocument.selection.createRange();
						// delete overflow characters
						range.moveStart("character", -overflow);
						range.text = '';
						// show cursor
						range.select();
					}
				}
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/Textarea.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/form/Textarea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"), // domStyle.set
	__webpack_require__(/*! ./_ExpandingTextAreaMixin */ "./node_modules/dijit/form/_ExpandingTextAreaMixin.js"),
	__webpack_require__(/*! ./SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domStyle, _ExpandingTextAreaMixin, SimpleTextarea){

	// module:
	//		dijit/form/Textarea

	return declare("dijit.form.Textarea", [SimpleTextarea, _ExpandingTextAreaMixin], {
		// summary:
		//		A textarea widget that adjusts it's height according to the amount of data.
		//
		// description:
		//		A textarea that dynamically expands/contracts (changing it's height) as
		//		the user types, to display all the text without requiring a scroll bar.
		//
		//		Takes nearly all the parameters (name, value, etc.) that a vanilla textarea takes.
		//		Rows is not supported since this widget adjusts the height.


		// TODO: for 2.0, rename this to ExpandingTextArea, and rename SimpleTextarea to TextArea

		baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea",

		// Override SimpleTextArea.cols to default to width:100%, for backward compatibility
		cols: "",

		buildRendering: function(){
			this.inherited(arguments);

			// tweak textarea style to reduce browser differences
			domStyle.set(this.textbox, { overflowY: 'hidden', overflowX: 'auto', boxSizing: 'border-box', MsBoxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box' });
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_ExpandingTextAreaMixin.js":
/*!************************************************************!*\
  !*** ./node_modules/dijit/form/_ExpandingTextAreaMixin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), // domConstruct.create
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/_base/window */ "./node_modules/dojo/_base/window.js"), // win.body
	__webpack_require__(/*! ../Viewport */ "./node_modules/dijit/Viewport.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domConstruct, has, lang, on, win, Viewport){

	// module:
	//		dijit/form/_ExpandingTextAreaMixin

	// feature detection, true for mozilla and webkit
	has.add("textarea-needs-help-shrinking", function(){
		var body = win.body(),	// note: if multiple documents exist, doesn't matter which one we use
			te = domConstruct.create('textarea', {
			rows:"5",
			cols:"20",
			value: ' ',
			style: {zoom:1, fontSize:"12px", height:"96px", overflow:'hidden', visibility:'hidden', position:'absolute', border:"5px solid white", margin:"0", padding:"0", boxSizing: 'border-box', MsBoxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box' }
		}, body, "last");
		var needsHelpShrinking = te.scrollHeight >= te.clientHeight;
		body.removeChild(te);
		return needsHelpShrinking;
	});

	return declare("dijit.form._ExpandingTextAreaMixin", null, {
		// summary:
		//		Mixin for textarea widgets to add auto-expanding capability

		_setValueAttr: function(){
			this.inherited(arguments);
			this.resize();
		},

		postCreate: function(){
			this.inherited(arguments);
			var textarea = this.textbox;
			textarea.style.overflowY = "hidden";
			this.own(on(textarea, "focus, resize", lang.hitch(this, "_resizeLater")));
		},

		startup: function(){ 
			this.inherited(arguments);
			this.own(Viewport.on("resize", lang.hitch(this, "_resizeLater")));
			this._resizeLater();
		},

		_onInput: function(e){
			this.inherited(arguments);
			this.resize();
		},

		_estimateHeight: function(){
			// summary:
			//		Approximate the height when the textarea is invisible with the number of lines in the text.
			//		Fails when someone calls setValue with a long wrapping line, but the layout fixes itself when the user clicks inside so . . .
			//		In IE, the resize event is supposed to fire when the textarea becomes visible again and that will correct the size automatically.
			//
			var textarea = this.textbox;
			// #rows = #newlines+1
			textarea.rows = (textarea.value.match(/\n/g) || []).length + 1;
		},

		_resizeLater: function(){
			this.defer("resize");
		},

		resize: function(){
			// summary:
			//		Resizes the textarea vertically (should be called after a style/value change)

			var textarea = this.textbox;

			function textareaScrollHeight(){
				var empty = false;
				if(textarea.value === ''){
					textarea.value = ' ';
					empty = true;
				}
				var sh = textarea.scrollHeight;
				if(empty){ textarea.value = ''; }
				return sh;
			}

			if(textarea.style.overflowY == "hidden"){ textarea.scrollTop = 0; }
			if(this.busyResizing){ return; }
			this.busyResizing = true;
			if(textareaScrollHeight() || textarea.offsetHeight){
				var newH = textareaScrollHeight() + Math.max(textarea.offsetHeight - textarea.clientHeight, 0);
				var newHpx = newH + "px";
				if(newHpx != textarea.style.height){
					textarea.style.height = newHpx;
					textarea.rows = 1; // rows can act like a minHeight if not cleared
				}
				if(has("textarea-needs-help-shrinking")){
					var	origScrollHeight = textareaScrollHeight(),
						newScrollHeight = origScrollHeight,
						origMinHeight = textarea.style.minHeight,
						decrement = 4, // not too fast, not too slow
						thisScrollHeight,
						origScrollTop = textarea.scrollTop;
					textarea.style.minHeight = newHpx; // maintain current height
					textarea.style.height = "auto"; // allow scrollHeight to change
					while(newH > 0){
						textarea.style.minHeight = Math.max(newH - decrement, 4) + "px";
						thisScrollHeight = textareaScrollHeight();
						var change = newScrollHeight - thisScrollHeight;
						newH -= change;
						if(change < decrement){
							break; // scrollHeight didn't shrink
						}
						newScrollHeight = thisScrollHeight;
						decrement <<= 1;
					}
					textarea.style.height = newH + "px";
					textarea.style.minHeight = origMinHeight;
					textarea.scrollTop = origScrollTop;
				}
				textarea.style.overflowY = textareaScrollHeight() > textarea.clientHeight ? "auto" : "hidden";
				if(textarea.style.overflowY == "hidden"){ textarea.scrollTop = 0; }
			}else{
				// hidden content of unknown size
				this._estimateHeight();
			}
			this.busyResizing = false;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUDetailsWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/WUDetailsWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}', iconClass:'iconWorkunit'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}AutoRefresh\" data-dojo-attach-event=\"onClick:_onAutoRefresh\" data-dojo-props=\"iconClass:'iconAutoRefresh', showLabel:false\" checked=true data-dojo-type=\"dijit.form.ToggleButton\">${i18n.AutoRefresh}</div>\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Save\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <div id=\"${id}Restore\" data-dojo-attach-event=\"onClick:_onRestore\" data-dojo-type=\"dijit.form.Button\">${i18n.Restore}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Reschedule\" data-dojo-attach-event=\"onClick:_onReschedule\" data-dojo-type=\"dijit.form.Button\">${i18n.Reschedule}</div>\n                    <div id=\"${id}Deschedule\" data-dojo-attach-event=\"onClick:_onDeschedule\" data-dojo-type=\"dijit.form.Button\">${i18n.Deschedule}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}SetToFailed\" data-dojo-attach-event=\"onClick:_onSetToFailed\" data-dojo-type=\"dijit.form.Button\">${i18n.SetToFailed}</div>\n                    <div id=\"${id}Abort\" data-dojo-attach-event=\"onClick:_onAbort\" data-dojo-type=\"dijit.form.Button\">${i18n.Abort}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Recover\" data-dojo-attach-event=\"onClick:_onRecover\" data-dojo-type=\"dijit.form.Button\">${i18n.Recover}</div>\n                    <div data-dojo-props=\"connectId:'${id}Recover',position:['above']\" data-dojo-type=\"dijit.Tooltip\">${i18n.RecoverTooltip}</div>\n                    <div id=\"${id}Resubmit\" data-dojo-attach-event=\"onClick:_onResubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Resubmit}</div>\n                    <div data-dojo-props=\"connectId:'${id}Resubmit',position:['above']\" data-dojo-type=\"dijit.Tooltip\">${i18n.ResubmitTooltip}</div>\n                    <div id=\"${id}Clone\" data-dojo-attach-event=\"onClick:_onClone\" data-dojo-type=\"dijit.form.Button\">${i18n.Clone}</div>\n                    <div data-dojo-props=\"connectId:'${id}Clone',position:['above']\" data-dojo-type=\"dijit.Tooltip\">${i18n.CloneTooltip}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Publish\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Publish}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}PublishForm\" style=\"width:460px\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                    <input id=\"${id}Jobname2\" title=\"${i18n.JobName}:\" colspan=\"2\" style=\"width:100%\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\"/>\n                                     <input id=\"${id}RemoteDali\" title=\"${i18n.RemoteDali}:\" colspan=\"2\" style=\"width:100%\" required=\"false\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\"/>\n                                     <input id=\"${id}SourceProcess\" title=\"${i18n.SourceProcess}:\" colspan=\"2\" style=\"width:100%\" required=\"false\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\"/>\n                                     <input id=\"${id}Comment\" title=\"${i18n.Comment}:\" colspan=\"2\" style=\"width:100%\" required=\"false\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\"/>\n                                     <select id=\"${id}Priority\" title=\"${i18n.Priority}:\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                                        <option value=\"\" selected=\"selected\">${i18n.None}</option>\n                                        <option value=\"SLA\">${i18n.SLA}</option>\n                                        <option value=\"Low\">${i18n.Low}</option>\n                                        <option value=\"High\">${i18n.High}</option>\n                                    </select>\n                                    <input id=\"${id}AllowForeignFiles\" title=\"${i18n.AllowForeignFiles}:\" name=\"AllowForeignFiles\" colspan=\"2\" checked data-dojo-type=\"dijit.form.CheckBox\" />\n                                    <input id=\"${id}UpdateSuperFiles\" title=\"${i18n.UpdateSuperFiles}:\" name=\"UpdateSuperFiles\" colspan=\"2\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onPublish\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}ZapReport\"  title=\"${i18n.ZippedAnalysisPackage}\" data-dojo-attach-event=\"onClick:_onZapReport\" data-dojo-props=\"iconClass:'iconZap'\" data-dojo-type=\"dijit.form.Button\">${i18n.ZAP}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}SlaveLogs\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.SlaveLogs}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                        <div id=\"${id}LogsForm\" style=\"width:460px\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                            <div class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                <select id=\"${id}ThorProcess\" title=\"${i18n.ThorProcess}:\" name=\"ThorProcess\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\" /></select>\n                                <input id=\"${id}SlaveNumber\" maxlength=\"\" title=\"${i18n.SlaveNumber}:\" name=\"SlaveNumber\" value=\"1\" required=\"true\" data-dojo-props=\"trim: true, placeHolder:'1'\" data-dojo-type=\"dijit.form.NumberTextBox\"/>\n                                <select id=\"${id}FileFormat\" title=\"${i18n.File}:\" name=\"ThorProcess\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\" />\n                                    <option value=\"1\">${i18n.OriginalFile}</option>\n                                    <option value=\"2\">${i18n.Zip}</option>\n                                    <option value=\"3\">${i18n.GZip}</option>\n                                </select>\n                            </div>\n                            </br>\n                            <div><span id=\"SlavesMaxNumber\" class=\"bold\"></span></div>\n                            <div><span id=\"AllowOnlyNumber\" class=\"boldRed\"></span></div>\n                            <div class=\"dijitDialogPaneActionBar\">\n                                <button type=\"submit\" data-dojo-attach-event=\"onClick:_getDownload\" data-dojo-type=\"dijit.form.Button\">${i18n.Download}</button>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div style=\"display:inline-block\">\n                        <h2>\n                            <img id=\"${id}ProtectedImage\" src=\"${dojoConfig.urlInfo.resourcePath}/img/locked.png\" />&nbsp;<div id=\"${id}StateIdImage\" class=\"iconWorkunit\" ></div>&nbsp;<span id=\"${id}Wuid\" class=\"bold\">${i18n.WUID}</span>\n                            <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}Wuid\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                        </h2>\n                    </div>\n                    <div id=\"${id}WUStatus\" style=\"width:512px;height:64px;float:right\">\n                    </div>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}ActionEx\">${i18n.Action}:</label>\n                                <div id=\"${id}ActionEx\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}State\">${i18n.State}:</label>\n                                <div><span id=\"${id}State\"></span>&nbsp;&nbsp;<a id=\"${id}ActiveGraph\" href='#' data-dojo-attach-event=\"onClick:_onActiveGraph\"></a></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Owner\">${i18n.Owner}:</label>\n                                <div id=\"${id}Owner\"></div>\n                            </li>\n                            <li id=\"scopeOptional\" class=\"hidden\">\n                                <label class=\"Prompt\" for=\"${id}Scope\">${i18n.Scope}:</label>\n                                <div><input id=\"${id}Scope\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Jobname\">${i18n.JobName}:</label>\n                                <div><input id=\"${id}Jobname\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Description\">${i18n.Description}:</label>\n                                <div><input id=\"${id}Description\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Protected\">${i18n.Protected}:</label>\n                                <div><input id=\"${id}Protected\" data-dojo-type=\"dijit.form.CheckBox\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Cluster\">${i18n.Cluster}:</label>\n                                <div id=\"${id}Cluster\"></div>\n                                <div id=\"${id}AllowedClusters\" data-dojo-type=\"dijit.form.Select\"/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}TotalClusterTime\">${i18n.TotalClusterTime}:</label>\n                                <div id=\"${id}TotalClusterTime\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}AbortBy\">${i18n.AbortedBy}:</label>\n                                <div id=\"${id}AbortBy\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}AbortTime\">${i18n.AbortedTime}:</label>\n                                <div id=\"${id}AbortTime\"></div>\n                            </li>\n                        </ul>\n                    </form>\n            </div>\n            <div id=\"${id}InfoContainer\" class=\"wrap\" style=\"height: 33%\" data-dojo-props=\"region: 'bottom', splitter: true, minSize: 120, showToolbar: true\" data-dojo-type=\"InfoGridWidget\">\n            </div>\n            </div>\n            <div id=\"${id}_Variables\" title=\"${i18n.Variables}\" data-dojo-props=\"delayWidget: 'VariablesWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Results\" title=\"${i18n.Outputs}\" data-dojo-props=\"delayWidget: 'ResultsWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Files\" title=\"${i18n.Inputs}\" data-dojo-props=\"delayWidget: 'SourceFilesWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Timers\" title=\"${i18n.Timers}\" data-dojo-props=\"delayWidget: 'TimingPageWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Graphs\" title=\"${i18n.Graphs}\" data-dojo-props=\"delayWidget: 'GraphsWUWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Workflows\" title=\"${i18n.Workflows}\" data-dojo-props=\"delayWidget: 'WorkflowsWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Queries\" title=\"${i18n.Queries}\" data-dojo-props=\"delayWidget: 'QuerySetQueryWidget', iconClass:'iconFind'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Resources\" title=\"${i18n.Resources}\" data-dojo-props=\"delayWidget: 'ResourcesWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Logs\" title=\"${i18n.Helpers}\" data-dojo-props=\"delayWidget: 'HelpersWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_ECL\" title=\"${i18n.ECL}\" data-dojo-props=\"delayWidget: 'ECLSourceWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_XML\" title=\"${i18n.XML}\" data-dojo-props=\"delayProps: {WUXml: true}, delayWidget: 'ECLSourceWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}ZapDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.ZippedAnalysisPackage}\">\n        <div id=\"${id}ZapForm\" style=\"width:460px;\" method=\"post\" encType=\"application/x-www-form-urlencoded\" data-dojo-type=\"dijit.form.Form\">\n            <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                <input id=\"${id}ZapName\" title=\"${i18n.FileName}:\" name=\"ZAPFileName\" colspan=\"2\" data-dojo-props=\"trim: true,\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}ZapWUID\" title=\"${i18n.WUID}:\" name=\"Wuid\" colspan=\"2\" data-dojo-props=\"trim: true, readonly: true,\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}BuildVersion\" title=\"${i18n.ESPBuildVersion}:\" name=\"BuildVersion\" colspan=\"2\" data-dojo-props=\"trim: true, readonly: true,\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}ESPIPAddress\" title=\"${i18n.ESPNetworkAddress}:\" name=\"ESPIPAddress\" colspan=\"2\" data-dojo-props=\"trim: true, readonly: true,\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}ThorIPAddress\" title=\"${i18n.ThorNetworkAddress}:\" name=\"ThorIPAddress\" colspan=\"2\" data-dojo-props=\"trim: true, readonly: true,\" data-dojo-type=\"dijit.form.TextBox\" />\n                <input id=\"${id}ZapDescription\" title=\"${i18n.Description}:\" name=\"ProblemDescription\" cols=\"22\" colspan=\"2\" data-dojo-type=\"dijit.form.SimpleTextarea\"/>\n                <input id=\"${id}WarnHistory\" title=\"${i18n.History}:\" name=\"WhatChanged\" cols=\"22\" colspan=\"2\" data-dojo-type=\"dijit.form.SimpleTextarea\"/>\n                <input id=\"${id}WarnTimings\" title=\"${i18n.Timings}:\" name=\"WhereSlow\" cols=\"22\" colspan=\"2\" data-dojo-type=\"dijit.form.SimpleTextarea\"/>\n                <input id=\"${id}Password\" title=\"${i18n.PasswordOpenZAP}:\" name=\"Password\" cols=\"22\" colspan=\"2\" type=\"password\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                <input id=\"${id}IncludeSlaveLogsCheckbox\" title=\"${i18n.IncludeSlaveLogs}:\" name=\"IncludeThorSlaveLog\" cols=\"22\" colspan=\"2\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" />\n                <input id=\"${id}EmailCheckbox\" title=\"${i18n.SendEmail}:\" name=\"SendEmail\" cols=\"22\" colspan=\"2\" type=\"checkbox\" data-dojo-type=\"dijit.form.CheckBox\" />\n                <input id=\"${id}EmailTo\" title=\"${i18n.EmailTo}:\" name=\"EmailTo\" colspan=\"2\" data-dojo-props=\"trim:true, readonly:true, placeHolder:'See Configuration Manager.'\" data-dojo-type=\"dijit.form.TextBox\"/>\n                <input id=\"${id}EmailFrom\" title=\"${i18n.EmailFrom}:\" name=\"EmailFrom\" colspan=\"2\" data-dojo-props=\"trim:true, placeHolder:'See Configuration Manager.'\" data-dojo-type=\"dijit.form.TextBox\"/>\n                <input id=\"${id}EmailSubject\" title=\"${i18n.EmailSubject}:\" name=\"EmailSubject\" colspan=\"2\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.ValidationTextBox\" required=\"false\"/>\n                <input id=\"${id}EmailBody\" title=\"${i18n.EmailBody}:\" name=\"EmailBody\" cols=\"22\" colspan=\"2\" data-dojo-type=\"dijit.form.SimpleTextarea\"/>\n            </div>\n            <div class=\"dijitDialogPaneActionBar\">\n                <button id=\"${id}onZapSubmit\" data-dojo-attach-event=\"onClick:_onSubmitDialog\" type=\"submit\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                <button style=\"float:left\" data-dojo-attach-event=\"onClick:_onCancelDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);