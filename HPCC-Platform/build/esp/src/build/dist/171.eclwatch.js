(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/XrefErrorsWarningsWidget":"./eclwatch/XrefErrorsWarningsWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[171],{

/***/ "./eclwatch/XrefErrorsWarningsWidget.js":
/*!**********************************************!*\
  !*** ./eclwatch/XrefErrorsWarningsWidget.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDFUXref */ "./lib/src/WsDFUXref.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domConstruct, domClass,
    registry, ToggleButton, ToolbarSeparator, Button,
    GridDetailsWidget, WsDFUXref, DelayLoadWidget, ESPUtil) {
        return declare("XrefErrorsWarningsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.title_ErrorsWarnings,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this._refreshActionState();
                this.refreshGrid();

                this.gridTab.set("title", this.i18n.title_ErrorsWarnings + ":" + this.params.Name);
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                this.openButton = registry.byId(this.id + "Open");
                dojo.destroy(this.id + "Open");
                dojo.destroy("dijit_ToolbarSeparator_18");

                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        File: { label: this.i18n.File, width: 100, sortable: false },
                        Text: { label: this.i18n.Message, width: 100, sortable: false },
                        Status: {
                            label: this.i18n.Status, width: 10, sortable: true,
                            renderCell: function (object, value, node, options) {
                                switch (value) {
                                    case "Error":
                                        domClass.add(node, "ErrorCell");
                                        break;
                                    case "Warning":
                                        domClass.add(node, "WarningCell");
                                        break;
                                    case "Normal":
                                        domClass.add(node, "NormalCell");
                                        break;
                                }
                                node.innerText = value;
                            }
                        }
                    }
                }, domID);

                return retVal;
            },

            refreshGrid: function () {
                var context = this;

                WsDFUXref.DFUXRefMessages({
                    request: {
                        Cluster: this.params.Name
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("DFUXRefMessagesQueryResponse.DFUXRefMessagesQueryResult", response)) {
                        results = response.DFUXRefMessagesQueryResponse.DFUXRefMessagesQueryResult;
                    }

                    if (lang.exists("Warning.length", results)) {
                        arrayUtil.forEach(results.Warning, function (row, idx) {
                            newRows.push({
                                File: row.File,
                                Text: row.Text,
                                Status: context.i18n.Warning
                            });
                        });
                    } else if (results.Warning) {
                        newRows.push({
                            File: results.Warning.File,
                            Text: results.Warning.Text,
                            Status: context.i18n.Warning
                        });
                    }
                    if (lang.exists("Error.length", results)) {
                        arrayUtil.forEach(results.Error, function (row, idx) {
                            newRows.push({
                                File: row.File,
                                Text: row.Text,
                                Status: context.i18n.Error
                            });
                        });
                    } else if (results.Error) {
                        newRows.push({
                            File: results.Error.File,
                            Text: results.Error.Text,
                            Status: context.i18n.Error
                        });
                    }
                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);