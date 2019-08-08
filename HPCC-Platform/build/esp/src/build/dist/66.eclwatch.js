(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/GetNumberOfFilesToCopyWidget":"./eclwatch/GetNumberOfFilesToCopyWidget.js",
	"hpcc/TopologyDetailsWidget":"./eclwatch/TopologyDetailsWidget.js",
	"dojo/text!templates/TopologyDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TopologyDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[66],{

/***/ "./eclwatch/GetNumberOfFilesToCopyWidget.js":
/*!**************************************************!*\
  !*** ./eclwatch/GetNumberOfFilesToCopyWidget.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),

    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil,
    GridDetailsWidget, ESPUtil, WsWorkunits) {
        return declare("GetNumberOfFilesToCopyWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_FilesPendingCopy,
            idProperty: "__hpcc_id",

            init: function (params) {
                var context = this;
                this.cluster = params.__hpcc_treeItem.Name;
                this._refreshActionState();
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        URL: { label: this.i18n.URL, width: 180, sortable: false },
                        Status: { label: this.i18n.Status, width: 380, sortable: false },
                        NumQueryFileToCopy: { label: this.i18n.FilesPending, sortable: false }
                    }
                }, domID);

                return retVal;
            },

            _onRefresh: function () {
                this.refreshGrid();
            },

            refreshGrid: function () {
                var context = this;

                WsWorkunits.WUGetNumFileToCopy({
                    request: {
                        ClusterName: this.cluster
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("WUGetNumFileToCopyResponse.Endpoints.Endpoint", response)) {
                        results = response.WUGetNumFileToCopyResponse.Endpoints.Endpoint;
                        arrayUtil.forEach(results, function (row, idx) {
                            newRows.push({
                                URL: row.URL,
                                Status: row.Status,
                                NumQueryFileToCopy: row.NumQueryFileToCopy
                            });
                        });
                    }
                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/TopologyDetailsWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/TopologyDetailsWidget.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
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
    __webpack_require__(/*! hpcc/ECLSourceWidget */ "./eclwatch/ECLSourceWidget.js"),
    __webpack_require__(/*! hpcc/LogWidget */ "./eclwatch/LogWidget.js"),
    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! hpcc/GetNumberOfFilesToCopyWidget */ "./eclwatch/GetNumberOfFilesToCopyWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/TopologyDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TopologyDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domConstruct, domForm, domAttr, iframe, domClass, query, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    _TabContainerWidget, ESPWorkunit, ESPRequest, TargetSelectWidget, ECLSourceWidget, LogWidget, WsTopology, GetNumberOfFilesToCopyWidget,
    template) {
        return declare("TopologyDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "TopologyDetailsWidget",
            i18n: nlsHPCC,

            summaryWidget: null,
            configurationWidget: null,
            configurationWidgetLoaded: false,
            logsWidget: null,
            logsWidgetLoaded: false,
            getNumberOfFilesToCopyWidget: null,
            getNumberOfFilesToCopyWidgetLoaded: false,

            postCreate: function (args) {
                this.inherited(arguments);
                this.details = registry.byId(this.id + "_Details");
                this.configurationWidget = registry.byId(this.id + "_Configuration");
                this.logsWidget = registry.byId(this.id + "_Logs");
                this.requestInformationWidget = registry.byId(this.id + "_RequestInformation");
                this.preflightWidget = registry.byId(this.id + "_Preflight");
                this.getNumberOfFilesToCopyWidget = registry.byId(this.id + "_GetNumberOfFilesToCopy");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_TopologyDetails;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
            },

            //  Implementation  ---
            init: function (params) {
                if (this.params.__hpcc_id === params.__hpcc_id)
                    return;

                this.initalized = false;
                this.widget._Summary.__hpcc_initalized = false;
                this.widget._Configuration.__hpcc_initalized = false;
                this.widget._Logs.__hpcc_initalized = false;
                this.widget._RequestInformation.__hpcc_initalized = false;
                this.widget._GetNumberOfFilesToCopy.__hpcc_initalized = false;
                this.widget._RequestInformation.set("disabled", true);
                this.widget._GetNumberOfFilesToCopy.set("disabled", true);

                this.inherited(arguments);

                if (this.params.hasConfig()) {
                    this.widget._Configuration.set("disabled", false);
                } else {
                    this.widget._Configuration.set("disabled", true);
                    if (this.getSelectedChild().id === this.widget._Configuration.id) {
                        this.selectChild(this.widget._Summary.id);
                    }
                }
                if (this.params.hasLogs()) {
                    this.widget._Logs.set("disabled", false);
                } else {
                    this.widget._Logs.set("disabled", true);
                    if (this.getSelectedChild().id === this.widget._Logs.id) {
                        this.selectChild(this.widget._Summary.id);
                    }
                }
                if (this.params.__hpcc_treeItem.Type === "RoxieCluster" && this.params.__hpcc_treeItem.OS) {
                    this.widget._GetNumberOfFilesToCopy.set("disabled", false);
                } else {
                    this.widget._GetNumberOfFilesToCopy.set("disabled", true);
                    if (this.getSelectedChild().id === this.widget._GetNumberOfFilesToCopy.id) {
                        this.selectChild(this.widget._Summary.id);
                    }
                }
                this.initTab();
            },

            initTab: function () {
                var context = this;
                var currSel = this.getSelectedChild();
                if (currSel.id === this.widget._Summary.id && !this.widget._Summary.__hpcc_initalized) {
                    this.widget._Summary.__hpcc_initalized = true;
                    var table = domConstruct.create("table", {});
                    for (var key in this.params.__hpcc_treeItem) {
                        if (this.params.__hpcc_treeItem.hasOwnProperty(key) && !(this.params.__hpcc_treeItem[key] instanceof Object)) {
                            if (key.indexOf("__") !== 0) {
                                switch (key) {
                                    case "Port":
                                    case "Path":
                                    case "ProcessNumber":
                                        break;
                                    default:
                                        var tr = domConstruct.create("tr", {}, table);
                                        domConstruct.create("td", {
                                            innerHTML: "<b>" + key + ":&nbsp;&nbsp;</b>"
                                        }, tr);
                                        domConstruct.create("td", {
                                            innerHTML: this.params.__hpcc_treeItem[key]
                                        }, tr);
                                }
                            }
                        }
                    }
                    var tpMachine = null;
                    if (this.params.__hpcc_treeItem.__hpcc_type === "TpMachine") {
                        tpMachine = this.params.__hpcc_treeItem;
                    } else if (this.params.__hpcc_parentNode && this.params.__hpcc_parentNode.__hpcc_treeItem.__hpcc_type === "TpMachine") {
                        tpMachine = this.params.__hpcc_parentNode.__hpcc_treeItem;
                    }
                    var tpBinding = null;
                    if (this.params.__hpcc_treeItem.__hpcc_type === "TpBinding") {
                        tpBinding = this.params.__hpcc_treeItem;
                    } else if (this.params.__hpcc_parentNode && this.params.__hpcc_parentNode.__hpcc_treeItem.__hpcc_type === "TpBinding") {
                        tpBinding = this.params.__hpcc_parentNode.__hpcc_treeItem;
                    }
                    if (tpBinding && tpMachine) {
                        var tr = domConstruct.create("tr", {}, table);
                        domConstruct.create("td", {
                            innerHTML: "<b>URL:&nbsp;&nbsp;</b>"
                        }, tr);
                        var td = domConstruct.create("td", {
                        }, tr);
                        var url = tpBinding.Protocol + "://" + tpMachine.Netaddress + ":" + tpBinding.Port + "/";
                        domConstruct.create("a", {
                            href: url,
                            innerHTML: url
                        }, td);
                    }
                    this.details.setContent(table);
                } else if (currSel.id === this.widget._Configuration.id && !this.widget._Configuration.__hpcc_initalized) {
                    this.widget._Configuration.__hpcc_initalized = true;
                    this.params.getConfig().then(function (response) {
                        var xml = context.formatXml(response);
                        context.widget._Configuration.init({
                            sourceMode: "xml"
                        });
                        context.widget._Configuration.setText(xml);
                    });
                } else if (currSel.id === this.widget._Logs.id && !this.widget._Logs.__hpcc_initalized) {
                    this.widget._Logs.__hpcc_initalized = true;
                    this.widget._Logs.init(this.params);
                } else if (currSel.id === this.widget._GetNumberOfFilesToCopy.id && !this.widget._GetNumberOfFilesToCopy.__hpcc_initalized) {
                    this.widget._GetNumberOfFilesToCopy.__hpcc_initalized = true;
                    this.widget._GetNumberOfFilesToCopy.init(this.params);
                }
            },

            updateInput: function (name, oldValue, newValue) {
                var registryNode = registry.byId(this.id + name);
                if (registryNode) {
                    registryNode.set("value", newValue);
                }
            },

            refreshActionState: function () {
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TopologyDetailsWidget.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/TopologyDetailsWidget.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}', iconClass:'iconWorkunit'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}_Details\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    ${i18n.PleaseSelectATopologyItem}\n                </div>\n            </div>\n            <div id=\"${id}_Configuration\" title=\"${i18n.Configuration}\" data-dojo-type=\"ECLSourceWidget\">\n            </div>\n            <div id=\"${id}_Logs\" title=\"${i18n.Logs}\" data-dojo-type=\"LogWidget\">\n            </div>\n            <div id=\"${id}_RequestInformation\" title=\"${i18n.Preflight}\" data-dojo-type=\"RequestInformationWidget\">\n            </div>\n            <div id=\"${id}_GetNumberOfFilesToCopy\" title=\"${i18n.RoxieFileCopy}\" data-dojo-type=\"GetNumberOfFilesToCopyWidget\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);