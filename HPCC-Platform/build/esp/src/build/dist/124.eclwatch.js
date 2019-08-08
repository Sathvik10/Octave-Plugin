(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/LibrariesUsedWidget":"./eclwatch/LibrariesUsedWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[124],{

/***/ "./eclwatch/LibrariesUsedWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/LibrariesUsedWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil,
    GridDetailsWidget, ESPQuery, ESPUtil) {
        return declare("LibrariesUsedWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_LibrariesUsed,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.query = ESPQuery.Get(params.QuerySetId, params.Id);

                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    columns: {
                        Name: { label: this.i18n.LibrariesUsed }
                    }
                }, domID);
                return retVal;
            },

            refreshGrid: function (args) {
                var context = this;
                this.query.refresh().then(function (response) {
                    var librariesUsed = [];
                    if (lang.exists("LibrariesUsed.Item", context.query)) {
                        arrayUtil.forEach(context.query.LibrariesUsed.Item, function (item, idx) {
                            var file = {
                                Name: item
                            }
                            librariesUsed.push(file);
                        });
                    }
                    context.store.setData(librariesUsed);
                    context.grid.refresh();
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);