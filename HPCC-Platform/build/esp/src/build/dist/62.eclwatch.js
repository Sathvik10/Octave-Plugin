(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/ECLPlaygroundResultsWidget":"./eclwatch/ECLPlaygroundResultsWidget.js",
	"hpcc/FullResultWidget":"./eclwatch/FullResultWidget.js",
	"dojo/text!templates/ECLPlaygroundResultsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundResultsWidget.html",
	"dojo/text!templates/FullResultWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FullResultWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ "./eclwatch/ECLPlaygroundResultsWidget.js":
/*!************************************************!*\
  !*** ./eclwatch/ECLPlaygroundResultsWidget.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! hpcc/ResultWidget */ "./eclwatch/ResultWidget.js"),
    __webpack_require__(/*! hpcc/FullResultWidget */ "./eclwatch/FullResultWidget.js"),
    __webpack_require__(/*! hpcc/LFDetailsWidget */ "./eclwatch/LFDetailsWidget.js"),
    __webpack_require__(/*! hpcc/VizWidget */ "./eclwatch/VizWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/ECLPlaygroundResultsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundResultsWidget.html"),

    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, dom,
    registry,
    _TabContainerWidget, ESPWorkunit, ESPQuery, ResultWidget, FullResultWidget, LFDetailsWidget, VizWidget,
    template) {
        return declare("ECLPlaygroundResultsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "ECLPlaygroundResultsWidget",

            selectedTab: null,
            TabPosition: "bottom",

            onErrorClick: function (line, col) {
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    currSel.init(currSel.params);
                }
            },

            ensurePane: function (id, title, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    if (lang.exists("Wuid", params) && lang.exists("Sequence", params)) {
                        retVal = new ResultWidget({
                            id: id,
                            title: title,
                            params: params
                        });
                    } else if (lang.exists("QuerySetId", params) && lang.exists("Id", params)) {
                        retVal = new FullResultWidget({
                            id: id,
                            title: title,
                            params: params
                        });
                    }
                    this.addChild(retVal);
                }
                return retVal;
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);

                    var monitorCount = 4;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.wu.getInfo({
                                onGetResults: function (results) {
                                    if (!params.SourceFiles) {
                                        for (var i = 0; i < results.length; ++i) {
                                            var tab = context.ensurePane("result" + i, results[i].Name, {
                                                Wuid: results[i].Wuid,
                                                Sequence: results[i].Sequence
                                            });
                                            if (i === 0) {
                                                context.initTab();
                                            }
                                        }
                                    }
                                }
                            });
                            var currSel = context.getSelectedChild();
                            if (currSel && currSel.refresh) {
                                currSel.refresh();
                            }
                        }
                    });
                } else if (params.QuerySetId && params.Id) {
                    this.query = ESPQuery.Get(params.QuerySetId, params.Id);
                    this.query.SubmitXML(params.RequestXml).then(function (response) {
                        var firstTab = true;
                        for (var key in response) {
                            var tab = context.ensurePane("result" + key, key, {
                                QuerySetId: params.QuerySetId,
                                Id: params.Id,
                                FullResult: response[key]
                            });
                            if (firstTab) {
                                context.initTab();
                            } else {
                                firstTab = false;
                            }
                        }
                    });
                }
            },

            clear: function () {
                this.removeAllChildren();
                this.selectedTab = null;
                this.initalized = false;
            },

            refresh: function (params) {
                if (params.Wuid) {
                    if (!this.wu || (this.wu.Wuid !== params.Wuid)) {
                        this.clear();
                        this.init(params);
                    }
                } else if (params.QuerySetId && params.Id) {
                    this.clear();
                    this.init(params);
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/FullResultWidget.js":
/*!**************************************!*\
  !*** ./eclwatch/FullResultWidget.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/request/iframe */ "./node_modules/dojo/request/iframe.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/Grid */ "./dgrid/Grid.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPBase */ "./lib/src/ESPBase.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),

    __webpack_require__(/*! dojo/text!../templates/FullResultWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FullResultWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, iframe, Memory, Observable,
    registry,
    Grid, selector, DijitRegistry,
    _Widget, ESPBase, ESPWorkunit, ESPLogicalFile, ESPUtil,
    template) {
        return declare("FullResultWidget", [_Widget], {
            templateString: template,
            baseClass: "FullResultWidget",
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

            _doDownload: function (type) {
                //TODO Fix
                var base = new ESPBase.default();
                if (lang.exists("result.Sequence", this)) {
                    var sequence = this.result.Sequence;
                    var downloadPdfIframeName = "downloadIframe_" + sequence;
                    var frame = iframe.create(downloadPdfIframeName);
                    var url = base.getBaseURL() + "/WUResultBin?Format=" + type + "&Wuid=" + this.result.Wuid + "&Sequence=" + sequence;
                    iframe.setSrc(frame, url, true);
                } else if (lang.exists("result.Name", this)) {
                    var logicalName = this.result.Name;
                    var downloadPdfIframeName = "downloadIframe_" + logicalName;
                    var frame = iframe.create(downloadPdfIframeName);
                    var url = base.getBaseURL() + "/WUResultBin?Format=" + type + "&Wuid=" + this.result.Wuid + "&LogicalName=" + logicalName;
                    iframe.setSrc(frame, url, true);
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

            _onFileDetails: function (args) {
                alert("todo");
            },

            //  Implementation  ---
            onErrorClick: function (line, col) {
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.FullResult) {
                    this.initResult(params.FullResult);
                } else {
                    this.initResult(null);
                }
            },

            initResult: function (result) {
                if (result && result.length) {
                    var columns = [];
                    for (var key in result[0]) {
                        if (key.indexOf("__") !== 0) {
                            columns.push({
                                field: key,
                                label: key
                            });
                        }
                    }
                    arrayUtil.forEach(result, function (item, idx) {
                        item["__hpcc_id"] = idx;
                    });
                    var store = new Memory({
                        idProperty: "__hpcc_id",
                        data: result
                    });
                    this.store = Observable(store);
                    this.grid = new declare([ESPUtil.Grid(false, true)])({
                        columns: columns,
                        store: this.store
                    }, this.id + "Grid");
                    this.grid.startup();
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

            refresh: function () {
                if (this.result && !this.result.isComplete()) {
                    this.grid.showMessage(this.result.getLoadingMessage());
                } else if (!this.loaded) {
                    this.loaded = true;
                    this.grid.set("query", {
                        id: "*"
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundResultsWidget.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ECLPlaygroundResultsWidget.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}TabContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"tabPosition: '${TabPosition}'\" data-dojo-type=\"dijit.layout.TabContainer\">\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FullResultWidget.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FullResultWidget.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"splitter: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}GridCP\" style=\"padding: 0px; border:0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Grid\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);