(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/ResultWidget":"./eclwatch/ResultWidget.js",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/ResultWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ResultWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[57],{

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

/***/ "./eclwatch/ResultWidget.js":
/*!**********************************!*\
  !*** ./eclwatch/ResultWidget.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/io-query */ "./node_modules/dojo/io-query.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),

    __webpack_require__(/*! dgrid/Grid */ "./dgrid/Grid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/CompoundColumns */ "./dgrid/extensions/CompoundColumns.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),
    __webpack_require__(/*! src/Pagination */ "./lib/src/Pagination.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPBase */ "./lib/src/ESPBase.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js"),

    __webpack_require__(/*! dojo/text!../templates/ResultWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ResultWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, arrayUtil, i18n, nlsHPCC, ioQuery, dom,
    registry, TextBox,
    Grid, Keyboard, Selection, selector, ColumnResizer, CompoundColumns, DijitRegistry, PaginationModule,
    _Widget, ESPBase, ESPWorkunit, ESPLogicalFile, FilterDropDownWidget, TableContainer,
    template) {
        return declare("ResultWidget", [_Widget], {
            templateString: template,
            baseClass: "ResultWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            grid: null,

            loaded: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.filter = registry.byId(this.id + "Filter");
                this.grid = registry.byId(this.id + "Grid");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            _onRefresh: function () {
                this.refresh(true);
            },

            _doDownload: function (type) {
                var base = new ESPBase.default();
                if (lang.exists("params.Sequence", this)) {
                    window.open(base.getBaseURL() + "/WUResultBin?Format=" + type + "&Wuid=" + this.params.Wuid + "&Sequence=" + this.params.Sequence, "_blank");
                } else if (lang.exists("params.LogicalName", this)) {
                    window.open(base.getBaseURL() + "/WUResultBin?Format=" + type + "&LogicalName=" + this.params.LogicalName, "_blank");
                }
            },

            _onDownloadZip: function (args) {
                this._doDownload("zip");
            },

            _onDownloadGZip: function (args) {
                this._doDownload("gzip");
            },

            _onDownloadXLS: function (args) {
                this._doDownload("xls");
            },

            _onDownloadCSV: function (args) {
                this._doDownload("csv");
            },

            _onFileDetails: function (args) {
                alert("todo");
            },

            //  Implementation  ---
            onErrorClick: function (line, col) {
            },

            init: function (params) {
                this.__filter = params.__filter;
                if (this.inherited(arguments))
                    return;

                this.result = params.result;
                //TODO:  Encapsulate this IF into ESPResult.js
                var context = this;
                if (params.result && params.result.canShowResults()) {
                    this.initResult(params.result);
                } else if (params.Wuid && (lang.exists("Sequence", params) || params.Name)) {
                    var wu = ESPWorkunit.Get(params.Wuid);
                    wu.fetchSequenceResults(function (results) {
                        if (lang.exists("Sequence", params)) {
                            context.initResult(results[params.Sequence]);
                        } else {
                            context.initResult(wu.namedResults[params.Name]);
                        }
                    });
                } else if (params.LogicalName) {
                    var logicalFile = ESPLogicalFile.Get(params.NodeGroup, params.LogicalName);
                    logicalFile.getInfo({
                        onAfterSend: function (response) {
                            context.initResult(logicalFile.result);
                        }
                    });
                } else if (params.result && params.result.Name) {
                    var logicalFile = ESPLogicalFile.Get(params.result.NodeGroup, params.result.Name);
                    logicalFile.getInfo({
                        onAfterSend: function (response) {
                            context.initResult(logicalFile.result);
                        }
                    });
                } else {
                    this.initResult(null);
                }
            },

            initResult: function (result) {
                if (result) {
                    var context = this;
                    result.fetchStructure(function (structure) {
                        var filterForm = registry.byId(context.filter.id + "FilterForm");
                        var origTableContainer = registry.byId(context.filter.id + "TableContainer");
                        var tableContainer = new TableContainer({
                        });
                        var filterObj = {};
                        if (lang.exists("__filter", context) && lang.exists("filter.toObject", context)) {
                            filterObj = ioQuery.queryToObject(context.__filter);
                        }
                        arrayUtil.forEach(structure, function (item, idx) {
                            if (item.label !== "##") {
                                var textBox = new TextBox({
                                    title: item.label,
                                    label: item.label + (item.__hpcc_keyed ? " (i)" : ""),
                                    name: item.field,
                                    value: filterObj[item.field],
                                    colSpan: 2
                                });
                                tableContainer.addChild(textBox);
                            }
                        });
                        tableContainer.placeAt(origTableContainer.domNode, "replace");
                        origTableContainer.destroyRecursive();
                        context.filter.on("clear", function (evt) {
                            context.refreshHRef();
                            context.refresh();
                        });
                        context.filter.on("apply", function (evt) {
                            context.refreshHRef();
                            context.refresh();
                        });
                        context.filter.refreshState();

                        context.grid = new declare([Grid, PaginationModule.Pagination, Keyboard, ColumnResizer, CompoundColumns, DijitRegistry])({
                            columns: structure,
                            rowsPerPage: 50,
                            pagingLinks: 1,
                            pagingTextBox: true,
                            firstLastArrows: true,
                            pageSizeOptions: [25, 50, 100, 1000],
                            store: result.getStore(),
                            query: {
                                FilterBy: context.getFilter()
                            }
                        }, context.id + "Grid");
                        context.grid.startup();
                    });
                } else {
                    this.grid = new declare([Grid, DijitRegistry])({
                        columns: [
                            {
                                label: "##",
                                width: 54
                            }
                        ]
                    }, this.id + "Grid");
                    this.grid.set("noDataMessage", "<span class='dojoxGridNoData'>[" + this.i18n.undefined + "]</span>");
                    this.grid.startup();
                }
            },

            getFilter: function () {
                return this.filter.toObject();
            },

            refresh: function (bypassCachedResult) {
                bypassCachedResult = bypassCachedResult || false;
                if (this.result && !this.result.isComplete()) {
                    this.grid.showMessage(this.result.getLoadingMessage());
                } else if (this.loaded !== this.getFilter() || bypassCachedResult) {
                    this.loaded = this.getFilter();
                    this.grid.set("query", {
                        FilterBy: this.getFilter(),
                        BypassCachedResult: bypassCachedResult
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ResultWidget.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ResultWidget.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"splitter: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <b>${i18n.Download}:</b>\n            <div data-dojo-attach-event=\"onClick:_onDownloadZip\" data-dojo-type=\"dijit.form.Button\">${i18n.Zip}</div>\n            <div data-dojo-attach-event=\"onClick:_onDownloadGZip\" data-dojo-type=\"dijit.form.Button\">${i18n.GZip}</div>\n            <div data-dojo-attach-event=\"onClick:_onDownloadXLS\" data-dojo-type=\"dijit.form.Button\">${i18n.XLS}</div>\n            <div data-dojo-attach-event=\"onClick:_onDownloadCSV\" data-dojo-type=\"dijit.form.Button\">${i18n.CSV}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n            </div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}GridCP\" style=\"padding: 0px; border:0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Grid\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);