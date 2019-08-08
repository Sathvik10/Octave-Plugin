(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/WUStatsWidget":"./eclwatch/WUStatsWidget.js",
	"dojo/text!templates/WUStatsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUStatsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[168],{

/***/ "./eclwatch/WUStatsWidget.js":
/*!***********************************!*\
  !*** ./eclwatch/WUStatsWidget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! crossfilter */ "./node_modules/crossfilter2/crossfilter.min.js"),

    __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/tree */ "./node_modules/@hpcc-js/tree/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/other */ "./node_modules/@hpcc-js/other/dist/index.min.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),

    __webpack_require__(/*! dojo/text!../templates/WUStatsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUStatsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, on,
    registry,
    crossfilter,
    hpccCommon, hpccChart, hpccLayout, hpccTree, hpccOther,
    _Widget, WsWorkunits,
    template) {
        return declare("WUStatsWidget", [_Widget], {
            templateString: template,
            baseClass: "WUStatsWidget",
            i18n: nlsHPCC,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
                if (this.pieCreatorType) this.pieCreatorType.widget.resize().render();
                if (this.pieScopeType) this.pieScopeType.widget.resize().render();
                if (this.scopesSurface) this.scopesSurface.resize().render();
                if (this.bar) this.bar.resize().render();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            //  Implementation  ---
            _onRefresh: function () {
                this.doRefreshData();
            },

            _onReset: function () {
                this.doReset();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                function CFGroup(crossfilter, dimensionID, targetID) {
                    this.targetID = targetID;
                    this.dimensionID = dimensionID;
                    this.dimension = crossfilter.dimension(function (d) { return d[dimensionID]; });
                    this.group = this.dimension.group().reduceSum(function (d) { return d.RawValue; });

                    this.scopes = new hpccTree.SunburstPartition();
                    this.scopesSurface = new hpccLayout.Surface()
                        .target(this.id + "Scope")
                        .title("Scope")
                        .widget(this.scopes)
                        ;

                    this.widgetChart = new hpccChart.Pie()
                        .columns([dimensionID, "Total"])
                        ;
                    this.widget = new hpccLayout.Surface()
                        .target(targetID)
                        .title(dimensionID)
                        .widget(this.widgetChart)
                        ;

                    this.filter = null;
                    var context = this;
                    this.widgetChart.click = function (row, column) {
                        if (context.filter === row[dimensionID]) {
                            context.filter = null;
                        } else {
                            context.filter = row[dimensionID];
                        }
                        context.dimension.filter(context.filter);
                        context.click(row, column);
                        context.render();
                    };
                }
                CFGroup.prototype.click = function (row, column) {
                }
                CFGroup.prototype.resetFilter = function () {
                    this.filter = null;
                    this.dimension.filter(null);
                }
                CFGroup.prototype.render = function () {
                    this.widgetChart
                        .data(this.group.all().map(function (row) {
                            return [row.key, row.value];
                        }))
                        ;
                    this.widget
                        .title(this.dimensionID + (this.filter ? " (" + this.filter + ")" : ""))
                        .resize()
                        .render()
                        ;
                }

                this.stats = crossfilter([]);
                this.summaryByKind = this.stats.dimension(function (d) { return d.Kind; });
                this.groupByKind = this.summaryByKind.group().reduceCount();

                this.select = registry.byId(this.id + "Kind");
                var prevKind = "";
                this.select.on("change", function (newValue) {
                    if (prevKind !== newValue) {
                        context.pieCreatorType.resetFilter();
                        context.pieScopeType.resetFilter();
                        context.prevScope = null;
                        context.summaryByScope.filterAll();
                        context.summaryByKind.filter(newValue);
                        context.doRender(context.select);
                        prevKind = newValue;
                    }
                });

                this.pieCreatorType = new CFGroup(this.stats, "CreatorType", this.id + "CreatorType");
                this.pieCreatorType.click = function (row, column) {
                    context.doRender(context.pieCreatorType);
                }

                this.pieScopeType = new CFGroup(this.stats, "ScopeType", this.id + "ScopeType");
                this.pieScopeType.click = function (row, column) {
                    context.doRender(context.pieScopeType);
                }

                this.summaryByScope = this.stats.dimension(function (d) { return d.Scope; });
                this.groupByScope = this.summaryByScope.group().reduceSum(function (d) { return d.RawValue; });

                this.scopes = new hpccTree.SunburstPartition();
                this.scopesSurface = new hpccLayout.Surface()
                    .target(this.id + "Scope")
                    .title("Scope")
                    .widget(this.scopes)
                    ;

                this.prevScope = null;
                this.scopes.click = hpccCommon.Utility.debounce(function (row, column) {
                    if (row.id === "") {
                        context.prevScope = null;
                        context.summaryByScope.filter(null);
                    } else if (context.prevScope === row.id) {
                        context.prevScope = null;
                        context.summaryByScope.filter(null);
                    } else {
                        context.prevScope = row.id;
                        context.summaryByScope.filter(function (d) {
                            return d.indexOf(context.prevScope + ":") === 0;
                        });
                    }
                    context.doRender(context.scopes);
                }, 250);

                this.barChart = new hpccChart.Bar();
                this.bar = new hpccLayout.Surface()
                    .target(this.id + "Stats")
                    .widget(this.barChart)
                    ;

                this.doRefreshData();
            },

            formatTree: function (data, label) {
                var cache = {};
                var treeDedup = {
                    "": {
                        parentID: null,
                        id: "",
                        label: label,
                        children: [],
                        childrenDedup: {}
                    }
                };
                data.forEach(function (row, idx) {
                    var i = 1;
                    var scopeParts = row.key.split(":");
                    var scope = "";
                    scopeParts.forEach(function (item, idx) {
                        var prevScope = scope;
                        scope += (scope.length ? ":" : "") + item;
                        if (!treeDedup[scope]) {
                            var newTreeItem = {
                                parentID: prevScope,
                                id: scope,
                                children: [],
                                childrenDedup: {}
                            }
                            treeDedup[scope] = newTreeItem;
                            treeDedup[prevScope].children.push(newTreeItem);
                            treeDedup[prevScope].childrenDedup[scope] = newTreeItem;
                        }
                        var scopeItem = treeDedup[scope];
                        if (idx === scopeParts.length - 1) {
                            scopeItem.__data = row;
                            scopeItem.label = row.key;
                            scopeItem.value = row.value;
                        }
                    });
                });
                function trimTree(node) {
                    var newChildren = [];
                    node.children.forEach(function (childNode) {
                        trimTree(childNode);
                        if (childNode.value || childNode.children.length) {
                            newChildren.push(childNode);
                        }
                    })
                    node.children = newChildren;
                    return node;
                }
                var retVal = trimTree(treeDedup[""]);
                return retVal;
            },

            doReset: function () {
                this.pieCreatorType.resetFilter();
                this.pieScopeType.resetFilter();
                this.prevScope = null;
                this.summaryByScope.filterAll();
                if (this.select.get("value") !== "TimeElapsed") {
                    this.select.set("value", "TimeElapsed");
                } else {
                    this.doRender();
                }
            },

            doRender: function (source) {
                if (source !== this.pieCreatorType) this.pieCreatorType.render();
                if (source !== this.pieScopeType) this.pieScopeType.render();

                if (source !== this.scopes) {
                    var tree = this.formatTree(this.groupByScope.all(), this.params.Wuid);
                    this.scopes
                        .data(tree)
                        ;
                    this.scopesSurface
                        .title("Scope" + (this.prevScope ? " (" + this.prevScope + ")" : ""))
                        .render()
                        ;
                } else {
                    this.scopesSurface
                        .title("Scope" + (this.prevScope ? " (" + this.prevScope + ")" : ""))
                        .render()
                        ;
                }

                var scopeData = this.summaryByScope.top(Infinity);
                var columns = ["Creator", "CreatorType", "Scope", "ScopeType", "Description", "TimeStamp", "Measure", "Kind", "Value", "RawValue", "Count", "Max"];
                var data = scopeData.map(function (row, idx) {
                    var rowData = [];
                    columns.forEach(function (column) {
                        rowData.push(row[column]);
                    });
                    return rowData;
                });

                var statsData = [];
                if (this.select.get("value")) {
                    statsData = scopeData.map(function (row) {
                        if (this.prevScope === row.Scope) {
                            return [row.Scope, row.RawValue];
                        }
                        return [(this.prevScope && row.Scope.indexOf(this.prevScope) === 0 ? row.Scope.substring(this.prevScope.length + 1) : row.Scope), row.RawValue];
                    }, this);
                }
                var statsLabel = [this.select.get("value"), this.pieCreatorType.filter, this.pieScopeType.filter, this.prevScope].filter(function (item) {
                    return item;
                }).join(", ") || "Unknown";
                statsLabel += (scopeData[0] ? " (" + scopeData[0].Measure + ")" : "");
                this.barChart
                    .columns(["Stat", statsLabel])
                    .data(statsData)
                    ;
                this.bar
                    .title(statsLabel)
                    .resize()
                    .render()
                    ;
            },

            doRefreshData: function () {
                var context = this;
                this.summaryByKind.filterAll();
                this.pieCreatorType.dimension.filterAll();
                this.pieScopeType.dimension.filterAll();
                this.summaryByScope.filterAll();
                this.stats.remove();

                WsWorkunits.WUGetStats({
                    request: {
                        WUID: this.params.Wuid
                    }
                }).then(function (response) {
                    if (lang.exists("WUGetStatsResponse.Statistics.WUStatisticItem", response)) {
                        context.stats.add(response.WUGetStatsResponse.Statistics.WUStatisticItem.filter(function (row) {
                            return row.ScopeType !== "global" && row.Scope !== "Process";
                        }));

                        var kind = context.select.get("value");
                        context.select.set("options", context.groupByKind.all().map(function (row) {
                            return { label: row.key + " (" + row.value + ")", value: row.key, selected: kind === row.key };
                        }));

                        if (kind) context.summaryByKind.filter(kind);
                        if (context.pieCreatorType.filter) context.pieCreatorType.dimension.filter(context.pieCreatorType.filter);
                        if (context.pieScopeType.filter) context.pieScopeType.dimension.filter(context.pieScopeType.filter);
                        if (context.prevScope) context.summaryByScope.filter(function (d) {
                            return d.indexOf(context.prevScope + ":") === 0;
                        });
                        if (kind === "") {
                            context.select.set("value", "TimeElapsed");
                        } else {
                            context.doRender();
                        }
                    }
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/WUStatsWidget.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/WUStatsWidget.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <select id=\"${id}Kind\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Select\">\n            </select>\n            <div id=\"${id}Reset\" data-dojo-attach-event=\"onClick:_onReset\" data-dojo-type=\"dijit.form.Button\">${i18n.Reset}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div style=\"padding:0px; overflow:hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n            <div id=\"${id}Scope\" style=\"padding:0px; overflow:hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div style=\"width: 50%; padding:0px; overflow:hidden\" data-dojo-props=\"region: 'left'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}CreatorType\" style=\"padding:0px; overflow:hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n                <div id=\"${id}ScopeType\" style=\"height: 50%; padding:0px; overflow:hidden\" data-dojo-props=\"region: 'bottom'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n            </div>\n        </div>\n        <div id=\"${id}Stats\" style=\"height: 50%; padding:0px; overflow:hidden\" data-dojo-props=\"region: 'bottom'\" data-dojo-type=\"dijit.layout.ContentPane\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);