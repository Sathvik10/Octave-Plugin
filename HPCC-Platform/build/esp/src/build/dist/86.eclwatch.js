(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DiskUsageDetails":"./eclwatch/DiskUsageDetails.js",
	"src/DiskUsage":"./lib/src/DiskUsage.js",
	"dojo/text!templates/DiskUsageDetails.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageDetails.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[86],{

/***/ "./eclwatch/DiskUsageDetails.js":
/*!**************************************!*\
  !*** ./eclwatch/DiskUsageDetails.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/DiskUsage */ "./lib/src/DiskUsage.js"),

    __webpack_require__(/*! dojo/text!../templates/DiskUsageDetails.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageDetails.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC,
    registry,
    _Widget, ESPUtil, DiskUsage,
    template) {
        return declare("DiskUsageDetails", [_Widget, ESPUtil.FormHelper], {
            templateString: template,
            baseClass: "DiskUsageDetails",
            i18n: nlsHPCC,

            postCreate: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.widget.BorderContainer.resize();
            },

            getTitle: function () {
                return this.i18n.title_DiskUsage;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;

                this._diskUsage = new DiskUsage.Details(params.details.Name)
                    .target(this.id + "DiskUsageGrid")
                    .details(params.details)
                    ;

                this._diskUsagePane = registry.byId(this.id + "DiskUsageGridCP");
                var origResize = this._diskUsagePane.resize;
                this._diskUsagePane.resize = function (size) {
                    origResize.apply(this, arguments);
                    if (context._diskUsage) {
                        context._diskUsage
                            .resize({ width: size.w, height: size.h })
                            .lazyRender()
                            ;
                    }
                }

                this.widget.BorderContainer.resize();
            },

            refreshGrid: function (clearSelection) {
                this._diskUsage.refresh();
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/DiskUsage.js":
/*!******************************!*\
  !*** ./lib/src/DiskUsage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/dgrid */ "./node_modules/@hpcc-js/dgrid/dist/index.min.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, common_1, chart_1, comms_1, layout_1, dgrid_1, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    common_1.Palette.rainbow("DiskUsage", ["green", "green", "green", "green", "green", "green", "green", "green", "orange", "red", "red"]);
    var Summary = /** @class */ (function (_super) {
        tslib_1.__extends(Summary, _super);
        function Summary() {
            var _this = _super.call(this) || this;
            _this._connection = new comms_1.MachineService({ baseUrl: "" });
            _this._usage = {};
            _this
                .itemMinHeight(100)
                .itemMinWidth(100)
                .forceYScroll(true)
                .widgetsFlexGrow([1, 1, 1]);
            return _this;
        }
        Summary.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._loadingMsg = element.append("div")
                .style("float", "left")
                .style("margin-left", "4px")
                .style("margin-top", "4px")
                .style("color", "darkgray")
                .style("font-size", "14px")
                .attr("title", nlsHPCC.DiskUsage);
        };
        Summary.prototype.update = function (domNode, element) {
            var widgets = [];
            for (var key in this._usage) {
                widgets.push(this._usage[key].gauge);
            }
            this
                .widgets(widgets)
                .flexBasis(100 / widgets.length + "%")
                .flexBasis("100px");
            _super.prototype.update.call(this, domNode, element);
        };
        Summary.prototype.refresh = function () {
            var _this = this;
            var hasGauge = false;
            for (var key in this._usage) {
                hasGauge = true;
                this._usage[key].gauge
                    .value(0)
                    .tickValue(0)
                    .render();
            }
            if (!hasGauge) {
                this._loadingMsg && this._loadingMsg
                    .text(nlsHPCC.loadingMessage);
            }
            this._connection.GetTargetClusterUsageEx().then(function (response) {
                _this._loadingMsg && _this._loadingMsg
                    .html("<i class=\"fa fa-database\"></i>");
                response.forEach(function (details) {
                    if (!_this._usage[details.Name]) {
                        _this._usage[details.Name] = {
                            details: details,
                            gauge: new chart_1.Gauge()
                                .title(details.Name)
                                .showTick(true)
                                .on("click", function (gauge) {
                                _this.click(gauge, details);
                            })
                        };
                    }
                    _this._usage[details.Name].gauge
                        .value(details.max / 100)
                        .valueDescription(nlsHPCC.Max)
                        .tickValue(details.mean / 100)
                        .tickValueDescription(nlsHPCC.Mean);
                });
                _this.render();
            });
            return this;
        };
        //  Events
        Summary.prototype.click = function (gauge, details) {
        };
        return Summary;
    }(layout_1.FlexGrid));
    exports.Summary = Summary;
    var Details = /** @class */ (function (_super) {
        tslib_1.__extends(Details, _super);
        function Details(_targetCluster) {
            var _this = _super.call(this) || this;
            _this._targetCluster = _targetCluster;
            _this._connection = new comms_1.MachineService({ baseUrl: "" });
            _this
                .sortable(true)
                .columnFormats([
                new dgrid_1.ColumnFormat()
                    .column("% Used")
                    .paletteID("DiskUsage")
            ])
                .columns([nlsHPCC.PercentUsed, nlsHPCC.Component, nlsHPCC.Type, nlsHPCC.IPAddress, nlsHPCC.Path, nlsHPCC.InUse, nlsHPCC.Total]);
            return _this;
        }
        Details.prototype.details = function (_) {
            this._details = _;
            var data = [];
            this._details.ComponentUsages.forEach(function (cu) {
                cu.MachineUsages.forEach(function (mu) {
                    mu.DiskUsages.forEach(function (du) {
                        data.push([du.PercentUsed, cu.Name, du.Name, mu.NetAddress !== "." ? mu.NetAddress : mu.Name, du.Path, du.InUse, du.Total]);
                    });
                });
            });
            this.data(data);
            return this;
        };
        Details.prototype.refresh = function () {
            var _this = this;
            this
                .noDataMessage(nlsHPCC.loadingMessage)
                .data([])
                .render();
            this._connection.GetTargetClusterUsageEx([this._targetCluster]).then(function (details) {
                _this
                    .noDataMessage(nlsHPCC.noDataMessage)
                    .details(details[0])
                    .render();
            });
            return this;
        };
        return Details;
    }(dgrid_1.Table));
    exports.Details = Details;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=DiskUsage.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DiskUsageDetails.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DiskUsageDetails.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}DiskUsageGridCP\" style=\"border:0px; padding: 0px; border-color:none; overflow:hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}DiskUsageGrid\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);