(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/XrefDirectoriesWidget":"./eclwatch/XrefDirectoriesWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[170],{

/***/ "./eclwatch/XrefDirectoriesWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/XrefDirectoriesWidget.js ***!
  \*******************************************/
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
        return declare("XrefDirectoriesWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.title_DirectoriesFor + ":",
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this._refreshActionState();
                this.refreshGrid();

                this.gridTab.set("title", this.i18n.title_DirectoriesFor + ":" + this.params.Name);
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");
                this.deleteDirectories = new Button({
                    id: this.id + "Delete",
                    disabled: false,
                    onClick: function (val) {
                        if (confirm(context.i18n.DeleteDirectories)) {
                            var selections = context.grid.getSelected();

                            WsDFUXref.DFUXRefCleanDirectories({
                                request: {
                                    Cluster: context.params.Name
                                }
                            }).then(function (response) {
                                if (response) {
                                    context.refreshGrid();
                                }
                            })

                        }
                    },
                    label: this.i18n.DeleteEmptyDirectories
                }).placeAt(this.openButton.domNode, "after");
                dojo.destroy(this.id + "Open");

                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        Name: { label: this.i18n.Directory, width: 100, sortable: false },
                        Num: { label: this.i18n.Files, width: 30, sortable: false },
                        Size: { label: this.i18n.TotalSize, width: 30, sortable: false },
                        MaxIP: { label: this.i18n.MaxNode, width: 30, sortable: false },
                        MaxSize: { label: this.i18n.MaxSize, width: 30, sortable: false },
                        MinIP: { label: this.i18n.MinNode, width: 30, sortable: false },
                        MinSize: { label: this.i18n.MinSize, width: 30, sortable: false },
                        PositiveSkew: { label: this.i18n.SkewPositive, width: 30, sortable: true },
                        NegativeSkew: { label: this.i18n.SkewNegative, width: 30, sortable: true }
                    }
                }, domID);

                return retVal;
            },

            refreshGrid: function () {
                var context = this;

                WsDFUXref.DFUXRefDirectories({
                    request: {
                        Cluster: this.params.Name
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("DFUXRefDirectoriesQueryResponse.DFUXRefDirectoriesQueryResult.Directory", response)) {
                        results = response.DFUXRefDirectoriesQueryResponse.DFUXRefDirectoriesQueryResult.Directory;
                    }
                    arrayUtil.forEach(results, function (row, idx) {
                        newRows.push({
                            Name: row.Name,
                            Num: row.Num,
                            Size: row.Size,
                            MaxIP: row.MaxIP,
                            MaxSize: row.MaxSize,
                            MinIP: row.MinIP,
                            MinSize: row.MinSize,
                            PositiveSkew: row.PositiveSkew,
                            NegativeSkew: row.NegativeSkew
                        });
                    });
                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);