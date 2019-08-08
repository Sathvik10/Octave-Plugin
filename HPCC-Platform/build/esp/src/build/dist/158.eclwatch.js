(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/TimingPageWidget":"./eclwatch/TimingPageWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"dojo/text!templates/TimingPageWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingPageWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[158],{

/***/ "./eclwatch/TimingPageWidget.js":
/*!**************************************!*\
  !*** ./eclwatch/TimingPageWidget.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/Timings */ "./lib/src/Timings.js"),

    __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/eclwatch */ "./node_modules/@hpcc-js/eclwatch/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"),

    __webpack_require__(/*! dojo/text!../templates/TimingPageWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingPageWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/MultiSelect */ "./node_modules/dijit/form/MultiSelect.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js")


], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, Observable,
    registry, BorderContainer, TabContainer, ContentPane,
    selector,
    _TabContainerWidget, ESPWorkunit, DelayLoadWidget, ESPUtil, srcTimings,
    hpccComms, hpccCommon, hpccEclWatch, hpccChart,
    template) {
        return declare("TimingPageWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "TimingPageWidget",
            i18n: nlsHPCC,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                var context = this;

                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.timingsTab = registry.byId(this.id + "_Timings");
                this.timelinePane = registry.byId(this.id + "TimelinePane");
                this.timingTab2 = registry.byId(this.id + "TimingTab2");

                var origResize = this.timelinePane.resize;
                this.timelinePane.resize = function () {
                    origResize.apply(this, arguments);
                    if (context._timings) {
                        context._timings
                            .resizeTimeline()
                            ;
                    }
                }

                var origResize2 = this.timelinePane.resize;
                this.timingTab2.resize = function () {
                    origResize2.apply(this, arguments);
                    if (context._timings) {
                        context._timings
                            .resizeChart()
                            ;
                    }
                }
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

            //  Implementation  ---
            _onRefresh: function () {
                this.refreshGrid(true);
            },

            _onMetricsType: function (evt) {
                this._metricFilter = this._timings.selectedMetricValues();
                this.refreshGrid();
            },

            _onMetricsClose: function (evt) {
            },

            _onReset: function () {
                this.doReset();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                this._timings = new srcTimings.Timings(params.Wuid, this.id + "TimelinePane", this.id + "Chart", this.id + "MetricsType");
                this._timings.click = function (row, col, sel) {
                    context.refreshGrid();
                }

                var store = new ESPUtil.UndefinedMemory({
                    idProperty: "__hpcc_id",
                    data: []
                });
                this.store = Observable(store);
                this.grid = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store
                }, this.id + "Grid");
                this.grid.on(".dgrid-row-url:click", function (evt) {
                    var row = context.grid.row(evt).data;
                    var tab = context.ensurePane(row.Name, row);
                    if (tab) {
                        context.selectChild(tab);
                    }
                });
                this.grid.startup();

                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    this.wu2 = hpccComms.Workunit.attach({ baseUrl: "" }, params.Wuid);
                    var monitorCount = 4;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.refreshGrid(true);
                        }
                    });
                }
            },

            refreshGrid: function (forceRefresh) {
                var context = this;
                this._timings.refresh(forceRefresh).then(function (args) {
                    var cols = args[0];
                    var data = args[1];
                    var columns = {
                        __hpcc_id: { label: "##", width: 45 },
                        Name: {
                            label: context.i18n.Name,
                            sortable: true,
                            width: 120,
                            formatter: function (cell, row) {
                                switch (row.Type) {
                                    case "graph":
                                    case "subgraph":
                                    case "activity":
                                    case "edge":
                                        return "<a href='#" + cell + "' class='dgrid-row-url'>" + cell + "</a>";
                                }
                                return cell;
                            }
                        }
                    };
                    cols.forEach(function (col) {
                        var formattedID = "__" + col;
                        columns[col] = {
                            label: col,
                            width: 120,
                            formatter: function (cell, row) {
                                var retVal = row[formattedID] && row[formattedID].Formatted || cell;
                                return retVal !== undefined ? retVal : "";
                            }
                        }
                    });
                    context.grid.set("columns", columns);
                    context.store.setData(data.map(function (row, i) {
                        var GraphName;
                        var SubGraphId;
                        var ActivityId;
                        var EdgeId;
                        switch (row.type) {
                            case "graph":
                                GraphName = row.id;
                                break;
                            case "subgraph":
                                GraphName = context._timings.graphID(row.name);
                                SubGraphId = row.id;
                                break;
                            case "activity":
                                GraphName = context._timings.graphID(row.name);
                                SubGraphId = context._timings.subgraphID(row.name);
                                ActivityId = row.id;
                                break;
                            case "edge":
                                GraphName = context._timings.graphID(row.name);
                                SubGraphId = context._timings.subgraphID(row.name);
                                EdgeId = row.id;
                                break;
                        }
                        var dataRow = {
                            __hpcc_id: i + 1,
                            Name: row.id,
                            Type: row.type,
                            Scope: row.name,
                            GraphName: GraphName,
                            SubGraphId: SubGraphId,
                            ActivityId: ActivityId,
                            EdgeId: EdgeId
                        };
                        for (var key in row){
                            dataRow[key] = row[key];
                        }
                        cols.forEach(function(col) {
                            dataRow[col] = row[col];
                        });
                        return dataRow;
                    }));
                    context.grid.refresh();
                });
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.timingsTab.id) {
                    } else {
                        if (!currSel.initalized) {
                            currSel.init(currSel.params);
                        }
                    }
                }
            },

            openGraph: function(graphName, subgraphID) {
                var tab = this.ensurePane(subgraphID + " - " + graphName, {
                    GraphName: graphName,
                    SubGraphId: subgraphID
                });
                if (tab) {
                    this.selectChild(tab);
                }
            },

            ensurePane: function (_id, params) {
                var id = this.createChildTabID(_id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: _id,
                        closable: true,
                        delayWidget: "GraphTree7Widget",
                        delayProps: {
                            _hostPage: this
                        },
                        params: {
                            Wuid: this.wu.Wuid,
                            GraphName: params.GraphName,
                            SubGraphId: params.SubGraphId,
                            ActivityId: params.ActivityId,
                            EdgeId: params.EdgeId
                        }
                    });
                    if (retVal) {
                        this.addChild(retVal);
                    }
                }
                return retVal;
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingPageWidget.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/TimingPageWidget.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Timings\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Timings}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}MetricsDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>Metrics</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}MetricsForm\" style=\"width: 240px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <select id=\"${id}MetricsType\" multiple style=\"box-shadow: none;width:100%;height:320px\" data-dojo-attach-event=\"onChange:_onMetricsType\">\n                                    <option value=\"TimeElapsed\">TimeElapsed</option>\n                                </select>\n                            </div>\n                            <div class=\"dijitDialogPaneActionBar\">\n                                <button type=\"submit\" data-dojo-attach-event=\"onClick:_onMetricsClose\" data-dojo-type=\"dijit.form.Button\">${i18n.Close}</button>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}StackController\" style=\"width: 100%\" data-dojo-props=\"containerId:'${id}OverviewTabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\"\n                        data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}TimelinePane\" style=\"height: 120px; padding:0px; overflow:hidden\" data-dojo-props=\"splitter:true, region: 'top', minSize: 120\"\n                    data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n                <div id=\"${id}OverviewTabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'bottom'\" data-dojo-type=\"dijit.layout.StackContainer\">\n                    <div id=\"${id}TimingTab\" style=\"padding: 0px; border:0px; border-color:none\" data-dojo-props='title:\"${i18n.Table}\",iconClass:\"iconFileList\"'\n                        data-dojo-type=\"dijit.layout.ContentPane\">\n                        <div id=\"${id}Grid\" style=\"padding: 0px; border:0px; border-color:none\">\n                        </div>\n                    </div>\n                    <div id=\"${id}TimingTab2\" style=\"padding: 0px; border:0px; border-color:none\" data-dojo-props='title:\"${i18n.Chart}\",iconClass:\"iconChart\"' data-dojo-type=\"dijit.layout.ContentPane\">\n                        <div id=\"${id}Chart\" style=\"width:100%;height:100%;overflow: hidden;\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);