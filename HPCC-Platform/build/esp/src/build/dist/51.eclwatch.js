(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/GraphWidget":"./eclwatch/GraphWidget.js",
	"hpcc/JSGraphWidget":"./eclwatch/JSGraphWidget.js",
	"src/ESPGraph":"./lib/src/ESPGraph.js",
	"src/GraphStore":"./lib/src/GraphStore.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/GraphWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[51],{

/***/ "./eclwatch/GraphWidget.js":
/*!*********************************!*\
  !*** ./eclwatch/GraphWidget.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),
    __webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),
    __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"),
    __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! dojox/xml/parser */ "./node_modules/dojox/xml/parser.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/GraphStore */ "./lib/src/GraphStore.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/GraphWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphWidget.html"),

    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),

    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/ComboBox */ "./node_modules/dijit/form/ComboBox.js"),
    __webpack_require__(/*! dijit/form/NumberSpinner */ "./node_modules/dijit/form/NumberSpinner.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Deferred, has, dom, domConstruct, domClass, domStyle, Memory, Observable, QueryResults, Evented,
    registry, BorderContainer, ContentPane,
    parser,
    _Widget, ESPUtil, GraphStore, Utility,
    template) {
        var GraphView = declare("GraphView", null, {
            sourceGraphWidget: null,
            rootGlobalIDs: null,
            id: null,
            depth: null,
            distance: null,
            xgmml: null,
            svg: null,

            constructor: function (sourceGraphWidget, rootGlobalIDs, depth, distance, subgraphs, hideSpills, selectedGlobalIDs) {
                depth = depth || 2;
                distance = distance || 2;
                subgraphs = subgraphs || false;
                hideSpills = hideSpills || false;
                this.sourceGraphWidget = sourceGraphWidget;

                rootGlobalIDs.sort();
                this.rootGlobalIDs = rootGlobalIDs;
                this.selectedGlobalIDs = selectedGlobalIDs ? selectedGlobalIDs : rootGlobalIDs;

                var id = "";
                arrayUtil.forEach(this.rootGlobalIDs, function (item, idx) {
                    if (idx > 0) {
                        id += ":";
                    }
                    id += item;
                }, this);
                id += ":" + depth;
                id += ":" + distance;
                id += ":" + subgraphs;
                id += ":" + hideSpills;
                this.id = id;

                this.depth = depth;
                this.distance = distance;
                this.hideSpills = hideSpills;
            },

            changeRootItems: function (globalIDs, depth, distance, subgraphs, hideSpills) {
                return this.sourceGraphWidget.getGraphView(globalIDs, depth, distance, subgraphs, hideSpills);
            },

            changeScope: function (depth, distance, subgraphs, hideSpills) {
                return this.sourceGraphWidget.getGraphView(this.rootGlobalIDs, depth, distance, subgraphs, hideSpills, this.selectedGlobalIDs);
            },

            refreshXGMML: function (targetGraphWidget) {
                targetGraphWidget.setMessage(targetGraphWidget.i18n.FetchingData).then(lang.hitch(this, function (response) {
                    var rootItems = this.sourceGraphWidget.getItems(this.rootGlobalIDs);
                    var xgmml = this.sourceGraphWidget.getLocalisedXGMML(rootItems, this.depth, this.distance, targetGraphWidget.option("vhidespills"));
                    if (targetGraphWidget.loadXGMML(xgmml, true)) {
                        this.svg = "";
                    }
                    targetGraphWidget.setMessage("");
                }));
            },

            refreshLayout: function (targetGraphWidget) {
                var context = this;
                targetGraphWidget.onLayoutFinished = function () {
                    context.svg = this._plugin.getSVG();
                    this.onLayoutFinished = null;
                };
                targetGraphWidget.startLayout("dot");
            },

            navigateTo: function (targetGraphWidget, noModifyHistory) {
                var deferred = new Deferred();
                if (!noModifyHistory) {
                    targetGraphWidget.graphViewHistory.push(this);
                }
                if (targetGraphWidget.onLayoutFinished == null) {
                    targetGraphWidget.setMessage(targetGraphWidget.i18n.FetchingData).then(lang.hitch(this, function (response) {
                        var rootItems = this.sourceGraphWidget.getItems(this.rootGlobalIDs);
                        var xgmml = this.sourceGraphWidget.getLocalisedXGMML(rootItems, this.depth, this.distance, this.hideSpills);
                        targetGraphWidget.setMessage(targetGraphWidget.i18n.LoadingData).then(lang.hitch(this, function (response) {
                            var context = this;
                            if (targetGraphWidget.loadXGMML(xgmml)) {
                                if (xgmml) {
                                    targetGraphWidget.onLayoutFinished = function () {
                                        this.setSelectedAsGlobalID(context.selectedGlobalIDs);
                                        context.svg = this._plugin.getSVG();
                                        this.onLayoutFinished = null;
                                        if (!noModifyHistory && this.graphViewHistory.getLatest() !== context) {
                                            this.graphViewHistory.getLatest().navigateTo(this);
                                        }
                                        deferred.resolve("Layout Complete.");
                                        this.refreshRootState(context.rootGlobalIDs);
                                    };
                                    if (this.svg) {
                                        targetGraphWidget.startCachedLayout(this.svg);
                                    } else {
                                        targetGraphWidget.startLayout("dot");
                                    }
                                } else {
                                    targetGraphWidget.setMessage(targetGraphWidget.i18n.NothingSelected);
                                    deferred.resolve("No Selection.");
                                }
                            } else {
                                targetGraphWidget.setSelectedAsGlobalID(context.selectedGlobalIDs);
                                targetGraphWidget.setMessage("");
                                deferred.resolve("XGMML Did Not Change.");
                                targetGraphWidget.refreshRootState(context.rootGlobalIDs);
                            }
                        }));
                    }));
                } else {
                    deferred.resolve("Graph Already in Layout.");
                }
                return deferred.promise;
            }
        });

        var GraphViewHistory = declare("GraphViewHistory", null, {
            sourceGraphWidget: null,
            history: null,
            index: null,

            constructor: function (sourceGraphWidget) {
                this.sourceGraphWidget = sourceGraphWidget;
                this.historicPos = 0;
                this.history = [];
                this.index = {};
            },

            clear: function () {
                this.history = [];
                this.index = {};
                this.sourceGraphWidget.refreshActionState();
            },

            //  Index  ----
            has: function (id) {
                return this.index[id] != null;
            },

            set: function (id, graphView) {
                return this.index[id] = graphView;
            },

            get: function (id) {
                return this.index[id];
            },

            //  History  ----
            push: function (graphView) {
                this.set(graphView.id, graphView);
                if (this.hasNext()) {
                    this.history.splice(this.historicPos + 1, this.history.length);
                }
                if (this.history[this.history.length - 1] !== graphView) {
                    this.history.push(graphView);
                }
                this.historicPos = this.history.length - 1;
                this.sourceGraphWidget.refreshActionState();
            },

            getCurrent: function () {
                return this.history[this.historicPos];
            },

            getLatest: function () {
                return this.history[this.history.length - 1];
            },

            hasPrevious: function () {
                return this.historicPos > 0;
            },

            hasNext: function () {
                return this.historicPos < this.history.length - 1;
            },

            isRootSubgraph: function () {
                arrayUtil.forEach(this.history[this.historicPos].rootGlobalIDs, function (item, idx) {

                }, this);
            },

            navigatePrevious: function () {
                if (this.hasPrevious()) {
                    this.historicPos -= 1;
                    this.history[this.historicPos].navigateTo(this.sourceGraphWidget, true).then(lang.hitch(this, function (response) {
                        this.sourceGraphWidget.refreshActionState();
                    }));
                }
            },

            navigateNext: function () {
                if (this.hasNext()) {
                    this.historicPos += 1;
                    this.history[this.historicPos].navigateTo(this.sourceGraphWidget, true).then(lang.hitch(this, function (response) {
                        this.sourceGraphWidget.refreshActionState();
                    }));
                }
            }
        });

        return declare("GraphWidget", [_Widget], {
            templateString: template,
            baseClass: "GraphWidget",
            i18n: nlsHPCC,

            KeyState_None: 0,
            KeyState_Shift: 1,
            KeyState_Control: 2,
            KeyState_Menu: 4,

            borderContainer: null,
            graphContentPane: null,
            _plugin: null,
            eventsRegistered: false,
            xgmml: null,
            dot: "",
            svg: "",

            isIE11: false,
            isIE: false,

            //  Known control properties  ---
            DOT_META_ATTR: "DOT_META_ATTR",

            constructor: function () {
                if (has("ie")) {
                    this.isIE = true;
                } else if (has("trident")) {
                    this.isIE11 = true;
                }
                this.graphViewHistory = new GraphViewHistory(this);
                this._options = {};
            },

            option: function (key, _) {
                if (arguments.length < 1) throw Error("Invalid Call:  option");
                if (arguments.length === 1) return this._options[key];
                this._options[key] = _ instanceof Array ? _.length > 0 : _;
                return this;
            },

            _onClickRefresh: function () {
                var graphView = this.getCurrentGraphView();
                graphView.refreshLayout(this);
                this.refreshRootState(graphView.rootGlobalIDs);
            },

            _onClickPrevious: function () {
                this.graphViewHistory.navigatePrevious();
            },

            _onClickNext: function () {
                this.graphViewHistory.navigateNext();
            },

            _onChangeZoom: function (args) {
                var selection = this.zoomDropCombo.get("value");
                switch (selection) {
                    case this.i18n.All:
                        this.centerOnItem(0, true);
                        break;
                    case this.i18n.Width:
                        this.centerOnItem(0, true, true);
                        break;
                    default:
                        var scale = parseFloat(selection);
                        if (!isNaN(scale)) {
                            this.setScale(scale);
                        }
                        break;
                }
            },

            _onDepthChange: function (value) {
                this._onRefreshScope();
            },

            _onDistanceChange: function (value) {
                this._onRefreshScope();
            },

            _onRefreshScope: function () {
                var graphView = this.getCurrentGraphView();
                if (graphView) {
                    var depth = this.getDepth();
                    var distance = this.distance.get("value");
                    graphView = graphView.changeScope(depth, distance, this.option("subgraph"), this.option("vhidespills"));
                    graphView.navigateTo(this, true);
                }
            },

            _onSyncSelection: function () {
                var graphView = this.getCurrentGraphView();
                if (graphView) {
                    var rootItems = this.getSelectionAsGlobalID();
                    var depth = this.getDepth();
                    var distance = this.distance.get("value");
                    graphView = graphView.changeRootItems(rootItems, depth, distance, this.option("subgraph"), this.option("vhidespills"));
                    graphView.navigateTo(this);
                }
            },

            _onOptionsApply: function () {
            },

            _onOptionsReset: function () {
            },

            onSelectionChanged: function (items) {
            },

            onDoubleClick: function (globalID, keyState) {
            },

            onLayoutFinished: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.graphContentPane = registry.byId(this.id + "GraphContentPane");
                this.next = registry.byId(this.id + "Next");
                this.previous = registry.byId(this.id + "Previous");
                this.zoomDropCombo = registry.byId(this.id + "ZoomDropCombo");
                this.depthLabel = registry.byId(this.id + "DepthLabel");
                this.depth = registry.byId(this.id + "Depth");
                this.distance = registry.byId(this.id + "Distance");
                this.syncSelectionSplitter = registry.byId(this.id + "SyncSelectionSplitter");
                this.syncSelection = registry.byId(this.id + "SyncSelection");
                this.optionsDropDown = registry.byId(this.id + "OptionsDropDown");
                this.optionsForm = registry.byId(this.id + "OptionsForm");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.createPlugin();
                this.watchStyleChange();
                this.watchSelect(this.zoomDropCombo);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            hasOptions: function () {
                return false;
            },

            createTreeStore: function () {
                var store = new GraphStore.GraphTreeStore();
                return Observable(store);
            },

            createStore: function () {
                var store = new GraphStore.GraphStore();
                return Observable(store);
            },

            showToolbar: function (show) {
                if (show) {
                    domClass.remove(this.id + "Toolbar", "hidden");
                } else {
                    domClass.add(this.id + "Toolbar", "hidden");
                }
                this.resize();
            },

            showNextPrevious: function (show) {
                if (show) {
                    domStyle.set(this.previous.domNode, 'display', 'block');
                    domStyle.set(this.next.domNode, 'display', 'block');
                } else {
                    domStyle.set(this.previous.domNode, 'display', 'none');
                    domStyle.set(this.next.domNode, 'display', 'none');
                }
                this.resize();
            },

            showDistance: function (show) {
                if (show) {
                    domClass.remove(this.id + "DistanceLabel", "hidden");
                    domStyle.set(this.distance.domNode, 'display', 'block');
                } else {
                    domClass.add(this.id + "DistanceLabel", "hidden");
                    domStyle.set(this.distance.domNode, 'display', 'none');
                }
                this.resize();
            },

            showSyncSelection: function (show) {
                if (show) {
                    domStyle.set(this.syncSelectionSplitter.domNode, 'display', 'block');
                    domStyle.set(this.syncSelection.domNode, 'display', 'block');
                } else {
                    domStyle.set(this.syncSelectionSplitter.domNode, 'display', 'none');
                    domStyle.set(this.syncSelection.domNode, 'display', 'none');
                }
                this.resize();
            },

            showOptions: function (show) {
                if (show) {
                    domStyle.set(this.optionsDropDown.domNode, 'display', 'block');
                } else {
                    domStyle.set(this.optionsDropDown.domNode, 'display', 'none');
                }
                this.resize();
            },

            hasPlugin: function () {
                return this._plugin !== null;
            },

            clear: function () {
                if (this.hasPlugin()) {
                    this.xgmml = "";
                    this.dot = "";
                    this._plugin.clear();
                    this.graphViewHistory.clear();
                }
            },

            loadXGMML: function (xgmml, merge, timers, skipRender) {
                if (this.hasPlugin() && xgmml && this.xgmml !== xgmml) {
                    this.xgmml = xgmml;
                    this._plugin._skipRender = skipRender;
                    if (merge) {
                        this._plugin.mergeXGMML(xgmml);
                    } else {
                        this._plugin.loadXGMML(xgmml);
                    }
                    if (timers) {
                        var totalTime = 0;
                        arrayUtil.forEach(timers, function (timer, idx) {
                            var item = this.getItem(timer.SubGraphId);
                            if (item) {
                                this.setProperty(item, this.i18n.TimeSeconds, timer.Seconds);
                                this.setProperty(item, "Label", timer.SubGraphId + " (" + timer.Seconds + "s)");
                                totalTime += timer.Seconds;
                            }
                        }, this);
                        this.setProperty(0, this.i18n.TimeSeconds, totalTime);
                    }
                    this.refreshActionState();
                    return true;
                }
                return false;
            },

            mergeXGMML: function (xgmml) {
                return this.loadXGMML(xgmml, true);
            },

            getTypeSummary: function (gloablIDs) {
                var retVal = {
                    Graph: 0,
                    Cluster: 0,
                    Vertex: 0,
                    Edge: 0,
                    Unknown: 0
                };
                arrayUtil.forEach(gloablIDs, function (item) {
                    retVal[this.getGlobalType(item)]++;
                }, this);
                return retVal;
            },

            getGlobalType: function (globalID) {
                if (this.hasPlugin()) {
                    return this._plugin.getGlobalType(this._plugin.getItem(globalID));
                }
                return "Unknown";
            },

            getComplexityInfo: function () {
                return {
                    threshold: 200,
                    activityCount: this.getVertices().length,
                    isComplex: function () { return this.activityCount > this.threshold; }
                };
            },

            centerOn: function (globalID) {
                if (this.hasPlugin()) {
                    var item = this.getItem(globalID);
                    if (item) {
                        this.centerOnItem(item, true);
                        var items = [item];
                        this._plugin.setSelected(items, true);
                    }
                }
            },

            getVersion: function () {
                if (this.hasPlugin()) {
                    return this._plugin.version;
                }
                return "";
            },

            getSVG: function () {
                return this._plugin.getSVG();
            },

            getXGMML: function () {
                return this.xgmml;
            },

            getDepth: function () {
                if (this._depthDisabled) {
                    return 999;
                }
                return this.depth.get("value");
            },

            localLayout: function (callback) {
                callback("Deprecated...");
            },

            displayProperties: function (wu, globalID, place) {
                var first = true;
                var table = {};
                var tr = {};
                var context = this;
                function ensureHeader() {
                    if (first) {
                        first = false;
                        table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, place);
                        tr = domConstruct.create("tr", null, table);
                        domConstruct.create("th", { innerHTML: context.i18n.Property }, tr);
                        domConstruct.create("th", { innerHTML: context.i18n.Value }, tr);
                    }
                }

                if (this.hasPlugin()) {
                    var item = this.getItem(globalID);
                    if (item) {
                        var props = this._plugin.getProperties(item);
                        if (props.id) {
                            var table = domConstruct.create("h3", {
                                innerHTML: props.id,
                                align: "center"
                            }, place);
                            delete props.id;
                        }
                        if (props.count) {
                            var table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, place);
                            var tr = domConstruct.create("tr", null, table);
                            var td = domConstruct.create("td", { innerHTML: this.i18n.Count }, tr);
                            var td = domConstruct.create("td", {
                                align: "right",
                                innerHTML: props.count
                            }, tr);
                            delete props.count;
                            domConstruct.create("br", null, place);
                        }
                        if (props.max) {
                            var table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, place);
                            var tr = domConstruct.create("tr", null, table);
                            domConstruct.create("th", { innerHTML: "    " }, tr);
                            domConstruct.create("th", { innerHTML: this.i18n.Skew }, tr);
                            domConstruct.create("th", { innerHTML: this.i18n.Node }, tr);
                            domConstruct.create("th", { innerHTML: this.i18n.Rows }, tr);
                            tr = domConstruct.create("tr", null, table);
                            domConstruct.create("td", { innerHTML: this.i18n.Max }, tr);
                            domConstruct.create("td", { innerHTML: props.maxskew }, tr);
                            domConstruct.create("td", { innerHTML: props.maxEndpoint }, tr);
                            domConstruct.create("td", { innerHTML: props.max }, tr);
                            tr = domConstruct.create("tr", null, table);
                            domConstruct.create("td", { innerHTML: this.i18n.Min }, tr);
                            domConstruct.create("td", { innerHTML: props.minskew }, tr);
                            domConstruct.create("td", { innerHTML: props.minEndpoint }, tr);
                            domConstruct.create("td", { innerHTML: props.min }, tr);
                            delete props.maxskew;
                            delete props.maxEndpoint;
                            delete props.max;
                            delete props.minskew;
                            delete props.minEndpoint;
                            delete props.min;
                            domConstruct.create("br", null, place);
                        }
                        if (props.slaves) {
                            var table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, place);
                            var tr = domConstruct.create("tr", null, table);
                            domConstruct.create("th", { innerHTML: this.i18n.Slaves }, tr);
                            domConstruct.create("th", { innerHTML: this.i18n.Started }, tr);
                            domConstruct.create("th", { innerHTML: this.i18n.Stopped }, tr);
                            tr = domConstruct.create("tr", null, table);
                            domConstruct.create("td", { innerHTML: props.slaves }, tr);
                            domConstruct.create("td", { innerHTML: props.started }, tr);
                            domConstruct.create("td", { innerHTML: props.stopped }, tr);
                            delete props.slaves;
                            delete props.started;
                            delete props.stopped;
                            domConstruct.create("br", null, place);
                        }

                        for (var key in props) {
                            if (key[0] === "_")
                                continue;
                            ensureHeader();
                            tr = domConstruct.create("tr", null, table);
                            domConstruct.create("td", { innerHTML: Utility.xmlEncode(key) }, tr);
                            domConstruct.create("td", { innerHTML: Utility.xmlEncode(props[key]) }, tr);
                        }
                        if (wu && wu.helpers) {
                            arrayUtil.filter(wu.helpers, function (d) {
                                return globalID && d.minActivityId <= globalID && globalID <= d.maxActivityId;
                            }).forEach(function (d) {
                                ensureHeader();
                                tr = domConstruct.create("tr", null, table);
                                domConstruct.create("td", { innerHTML: this.i18n.Helper }, tr);
                                domConstruct.create("td", { innerHTML: "<a href='" + "/WsWorkunits/WUFile?Wuid=" + wu.Wuid + "&Name=" + d.Name + "&IPAddress=" + d.IPAddress + "&Description=" + d.Description + "&Type=" + d.Type + "' target='_blank'>" + d.Description + "</a>" }, tr);
                            }, this);
                        }
                        if (first === false) {
                            domConstruct.create("br", null, place);
                        }
                    }
                }
            },

            walkTrace: function (domNode, results) {
                if (!domNode) return;
                if (domNode.childNodes) {
                    var context = this;
                    switch (domNode.tagName) {
                        case "Row":
                            var row = {};
                            arrayUtil.forEach(domNode.childNodes, function (colNode) {
                                arrayUtil.forEach(colNode.childNodes, function (cellNode) {
                                    row[colNode.tagName] = cellNode.nodeValue;
                                });
                            });
                            results.push(row)
                            break;
                        default:
                            arrayUtil.forEach(domNode.childNodes, function (childNode) {
                                context.walkTrace(childNode, results);
                            });
                    }
                }
            },

            displayTrace: function (xml, place) {
                if (this.hasPlugin()) {
                    var domNode = parser.parse(xml);
                    var results = [];
                    this.walkTrace(domNode, results);

                    var first = true;
                    var table = {};
                    var tr = {};
                    arrayUtil.forEach(results, function (row, idx) {
                        if (idx === 0) {
                            table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, place);
                            tr = domConstruct.create("tr", null, table);
                            for (var key in row) {
                                domConstruct.create("th", { innerHTML: key }, tr);
                            }
                        }
                        tr = domConstruct.create("tr", null, table);
                        for (var key in row) {
                            domConstruct.create("td", { innerHTML: row[key] }, tr);
                        }
                    });
                }
            },

            createPlugin: function () {
                if (!this.hasPlugin()) {
                    domConstruct.create("div", {
                        innerHTML: "<h4>" + this.i18n.GraphView + "</h4>" +
                            "<p>" + this.i18n.Toenablegraphviews + ":</p>" +
                            this.getResourceLinks()
                    }, this.graphContentPane.domNode);
                }
            },

            checkPluginLoaded: function () {
                var deferred = new Deferred();
                var context = this;
                var doCheck = function () {
                    var domNode = dom.byId(context.pluginID);
                    if (domNode && domNode.version) {
                        return {
                            version: domNode.version,
                            major: domNode.version_major,
                            minor: domNode.version_minor,
                            point: domNode.version_point,
                            sequence: domNode.version_sequence
                        };
                    }
                    return null;
                };
                var doBackGroundCheck = function () {
                    setTimeout(function () {
                        var version = doCheck();
                        if (version) {
                            deferred.resolve(version);
                        } else {
                            doBackGroundCheck();
                        }
                    }, 20);
                };
                doBackGroundCheck();
                return deferred.promise;
            },

            getResourceLinks: function () {
                return "<a href=\"http://hpccsystems.com/download/free-community-edition/graph-control\" target=\"_blank\">" + this.i18n.BinaryInstalls + "</a><br/>" +
                    "<a href=\"https://github.com/hpcc-systems/GraphControl\" target=\"_blank\">" + this.i18n.SourceCode + "</a><br/><br/>" +
                    "<a href=\"http://hpccsystems.com\" target=\"_blank\">" + this.i18n.HPCCSystems + "</a>"
            },

            setMessage: function (message) {
                var deferred = new Deferred();
                var retVal = this._plugin ? this._plugin.setMessage(message) : null;
                setTimeout(function () {
                    deferred.resolve(retVal);
                }, 20);
                return deferred.promise;
            },

            getLocalisedXGMML: function (selectedItems, depth, distance, hideSpills) {
                if (this.hasPlugin()) {
                    if (this._plugin.getLocalisedXGMML2) {
                        return this._plugin.getLocalisedXGMML2(selectedItems, depth, distance, hideSpills);
                    }
                    return this._plugin.getLocalisedXGMML(selectedItems, depth, distance);
                }
                return null;
            },

            getCurrentGraphView: function () {
                return this.graphViewHistory.getCurrent();
            },

            getGraphView: function (rootGlobalIDs, depth, distance, subgraphs, hideSpills, selectedGlobalIDs) {
                var retVal = new GraphView(this, rootGlobalIDs, depth, distance, subgraphs, hideSpills, selectedGlobalIDs);
                if (this.graphViewHistory.has(retVal.id)) {
                    retVal = this.graphViewHistory.get(retVal.id);
                    retVal.selectedGlobalIDs = selectedGlobalIDs ? selectedGlobalIDs : rootGlobalIDs;
                } else {
                    this.graphViewHistory.set(retVal.id, retVal);
                }
                return retVal;
            },

            mergeSVG: function (svg) {
                if (this.hasPlugin()) {
                    return this._plugin.mergeSVG(svg);
                }
                return null;
            },

            startCachedLayout: function (svg) {
                if (this.hasPlugin()) {
                    var context = this;
                    this.setMessage(this.i18n.LoadingCachedLayout).then(function (response) {
                        context._plugin.mergeSVG(svg);
                        context._onLayoutFinished();
                    });
                }
            },

            startLayout: function (layout) {
                if (this.hasPlugin()) {
                    this.setMessage(this.i18n.PerformingLayout);
                    this._plugin.startLayout(layout);
                }
            },

            _onLayoutFinished: function () {
                this.setMessage('');
                this.centerOnItem(0, true);
                this.dot = this._plugin.getDOT();
                if (this.onLayoutFinished) {
                    this.onLayoutFinished();
                }
            },

            find: function (findText) {
                if (this.hasPlugin()) {
                    return this._plugin.find(findText);
                }
                return [];
            },

            findAsGlobalID: function (findText) {
                if (this.hasPlugin()) {
                    var items = this.find(findText);
                    var foundItem = this.getItem(findText);
                    if (foundItem) {
                        items.unshift(foundItem);
                    }
                    var globalIDs = [];
                    for (var i = 0; i < items.length; ++i) {
                        globalIDs.push(this._plugin.getGlobalID(items[i]));
                    }
                    return globalIDs;
                }
                return [];
            },

            setScale: function (percent) {
                if (this.hasPlugin()) {
                    return this._plugin.setScale(percent);
                }
                return 100;
            },

            centerOnItem: function (item, scaleToFit, widthOnly) {
                if (this.hasPlugin()) {
                    return this._plugin.centerOnItem(item, scaleToFit, widthOnly);
                }
                return null;
            },

            centerOnGlobalID: function (globalID, scaleToFit, widthOnly) {
                if (this.hasPlugin()) {
                    var item = this.getItem(globalID);
                    if (item) {
                        return this.centerOnItem(item, scaleToFit, widthOnly);
                    }
                }
                return null;
            },

            setSelected: function (items) {
                if (this.hasPlugin()) {
                    return this._plugin.setSelected(items);
                }
                return null;
            },

            setSelectedAsGlobalID: function (items) {
                if (this.hasPlugin()) {
                    var retVal = this._plugin.setSelectedAsGlobalID(items);
                    this.refreshActionState();
                    return retVal;
                }
                return null;
            },

            getSelection: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getSelection();
                }
                return [];
            },

            getSelectionAsGlobalID: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getSelectionAsGlobalID();
                }
                return [];
            },

            getItem: function (globalID) {
                if (this.hasPlugin()) {
                    var retVal = this._plugin.getItem(globalID);
                    if (retVal === -1) {
                        retVal = null;
                    }
                    return retVal;
                }
                return null;
            },

            getItems: function (globalIDs) {
                var retVal = [];
                if (this.hasPlugin()) {
                    arrayUtil.forEach(globalIDs, function (globalID, idx) {
                        var item = this.getItem(globalID);
                        if (item !== null) {
                            retVal.push(item);
                        }
                    }, this);
                }
                return retVal;
            },

            hide: function () {
                if (this.hasPlugin()) {
                    dojo.style(this._plugin, "width", "1px");
                    dojo.style(this._plugin, "height", "1px");
                }
            },

            show: function () {
                if (this.hasPlugin()) {
                    dojo.style(this._plugin, "width", "100%");
                    dojo.style(this._plugin, "height", "100%");
                }
            },

            watchSplitter: function (splitter) {
                if (has("chrome")) {
                    //  Chrome can ignore splitter events
                    return;
                }
                var context = this;
                dojo.connect(splitter, "_startDrag", function () {
                    context.hide();
                });
                dojo.connect(splitter, "_stopDrag", function (evt) {
                    context.show();
                });
            },

            watchSelect: function (select) {
                if (select) {
                    //  Only chrome needs to monitor select drop downs.
                    var context = this;
                    select.watch("_opened", function () {
                        if (select._opened) {
                            context.hide();
                        } else {
                            context.show();
                        }
                    });
                }
            },

            watchStyleChange: function () {
                ESPUtil.MonitorVisibility(this, function (visibility, node) {
                    if (visibility) {
                        dojo.style(node, "width", "100%");
                        dojo.style(node, "height", "100%");
                        dojo.style(node.firstChild, "width", "100%");
                        dojo.style(node.firstChild, "height", "100%");
                        return true;
                    } else {
                        dojo.style(node, "width", "1px");
                        dojo.style(node, "height", "1px");
                        dojo.style(node.firstChild, "width", "1px");
                        dojo.style(node.firstChild, "height", "1px");
                        return true;
                    }
                });
            },

            getDotMetaAttributes: function () {
                if (this._plugin && this._plugin.getControlProperty) {
                    return this._plugin.getControlProperty(this.DOT_META_ATTR);
                }
                return "";
            },

            setDotMetaAttributes: function (dotMetaAttr) {
                if (this._plugin && this._plugin.setControlProperty) {
                    this._plugin.setControlProperty(this.DOT_META_ATTR, dotMetaAttr);
                }
            },

            getProperty: function (item, key) {
                if (this._plugin && this._plugin.getProperty) {
                    return this._plugin.getProperty(item, key);
                }
                return "";
            },

            setProperty: function (item, key, value) {
                if (this._plugin && this._plugin.setProperty) {
                    this._plugin.setProperty(item, key, value);
                }
            },

            getProperties: function (item) {
                if (this.hasPlugin()) {
                    return this._plugin.getProperties(item);
                }
                return [];
            },

            getTreeWithProperties: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getTreeWithProperties();
                }
                return [];
            },

            getSubgraphsWithProperties: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getSubgraphsWithProperties();
                }
                return [];
            },

            getVertices: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getVertices();
                }
                return [];
            },

            getVerticesWithProperties: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getVerticesWithProperties();
                }
                return [];
            },

            getEdgesWithProperties: function () {
                if (this.hasPlugin()) {
                    return this._plugin.getEdgesWithProperties();
                }
                return [];
            },

            registerEvents: function () {
                if (!this.eventsRegistered) {
                    this.eventsRegistered = true;
                    var context = this;
                    this.registerEvent("MouseDoubleClick", function (item, keyState) {
                        context.onDoubleClick(context._plugin.getGlobalID(item), keyState);
                    });
                    this.registerEvent("LayoutFinished", function () {
                        context._onLayoutFinished();
                    });
                    this.registerEvent("SelectionChanged", function (items) {
                        context.refreshActionState();
                        context.onSelectionChanged(items);
                    });
                }
            },

            registerEvent: function (evt, func) {
                if (this.hasPlugin()) {
                    if (this._plugin instanceof Evented) {
                        this._plugin.on(evt, func);
                    } else if (this.isIE11) {
                        this._plugin["on" + evt] = func;
                    } else if (this._plugin.attachEvent !== undefined) {
                        return this._plugin.attachEvent("on" + evt, func);
                    } else {
                        return this._plugin.addEventListener(evt, func, false);
                    }
                }
                return false;
            },

            refreshActionState: function () {
                this.setDisabled(this.id + "Previous", !this.graphViewHistory.hasPrevious(), "iconLeft", "iconLeftDisabled");
                this.setDisabled(this.id + "Next", !this.graphViewHistory.hasNext(), "iconRight", "iconRightDisabled");
                this.setDisabled(this.id + "SyncSelection", !this.getSelection().length, "iconSync", "iconSyncDisabled");
            },

            refreshRootState: function (selectedGlobalIDs) {
                this._depthDisabled = false;
                var distanceDisabled = false;
                if (selectedGlobalIDs) {
                    var typeSummary = this.getTypeSummary(selectedGlobalIDs);
                    this._depthDisabled = !selectedGlobalIDs.length || !(typeSummary.Graph || typeSummary.Cluster);
                    distanceDisabled = !(typeSummary.Vertex || typeSummary.Edge);
                }
                this._depthDisabled = this._depthDisabled || (this.hasOptions() && !this.option("subgraph"))

                this.setDisabled(this.id + "Depth", this._depthDisabled);
                this.setDisabled(this.id + "Distance", distanceDisabled);
                this.setDisabled(this.id + "OptionsDropDown", !this.hasOptions());
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/JSGraphWidget.js":
/*!***********************************!*\
  !*** ./eclwatch/JSGraphWidget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"),

    __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/layout */ "./node_modules/@hpcc-js/layout/dist/index.min.js"),

    __webpack_require__(/*! hpcc/GraphWidget */ "./eclwatch/GraphWidget.js"),
    __webpack_require__(/*! src/ESPGraph */ "./lib/src/ESPGraph.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! css!font-awesome/css/font-awesome.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/@hpcc-js/common/font-awesome/css/font-awesome.css")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Evented,
    hpccCommon, hpccGraph, hpccLayout,
    GraphWidget, ESPGraph, Utility) {

        var faCharFactory = function (kind) {
            switch (kind) {
                case "2": return "\uf0c7";      //  Disk Write
                case "3": return "\uf15d";      //  sort
                case "5": return "\uf0b0";      //  Filter
                case "6": return "\uf1e0";      //  Split
                case "12": return "\uf039";     //  First N
                case "15": return "\uf126";     //  Lightweight Join
                case "17": return "\uf126";     //  Lookup Join
                case "22": return "\uf1e6";     //  Pipe Output
                case "23": return "\uf078";     //  Funnel
                case "25": return "\uf0ce";     //  Inline Dataset
                case "26": return "\uf074";     //  distribute
                case "29": return "\uf005";     //  Store Internal Result
                case "36": return "\uf128";     //  If
                case "44": return "\uf0c7";     //  write csv
                case "47": return "\uf0c7";     //  write 
                case "54": return "\uf013";     //  Workunit Read
                case "56": return "\uf0c7";     //  Spill
                case "59": return "\uf126";     //  Merge
                case "61": return "\uf0c7";     //  write xml
                case "82": return "\uf1c0";     //  Projected Disk Read Spill 
                case "88": return "\uf1c0";     //  Projected Disk Read Spill 
                case "92": return "\uf129";     //  Limted Index Read
                case "93": return "\uf129";     //  Limted Index Read
                case "99": return "\uf1c0";     //  CSV Read
                case "105": return "\uf1c0";    //  CSV Read

                case "7": return "\uf090";      //  Project
                case "9": return "\uf0e2";      //  Local Iterate
                case "16": return "\uf005";     //  Output Internal
                case "19": return "\uf074";     //  Hash Distribute
                case "21": return "\uf275";     //  Normalize
                case "35": return "\uf0c7";     //  CSV Write
                case "37": return "\uf0c7";     //  Index Write
                case "71": return "\uf1c0";     //  Disk Read Spill
                case "133": return "\uf0ce";    //  Inline Dataset
                case "148": return "\uf0ce";    //  Inline Dataset
                case "168": return "\uf275";    //  Local Denormalize
            }
            return "\uf063";
        };

        var JSPlugin = declare([Evented], {
            KeyState_None: 0,
            KeyState_Shift: 1,
            KeyState_Control: 2,
            KeyState_Menu: 4,

            constructor: function (domNode) {
                this.graphData = new ESPGraph.Graph();
                this.graphWidget = new hpccGraph.Graph()
                    .allowDragging(false)
                    .showToolbar(false)
                    ;
                var context = this;
                this.graphWidget.vertex_click = function (item, event) {
                    context.emit("SelectionChanged", [item]);
                }
                this.graphWidget.edge_click = function (item, event) {
                    context.emit("SelectionChanged", [item]);
                }
                this.graphWidget.vertex_dblclick = function (item, event) {
                    context.emit("MouseDoubleClick", item, (event.shiftKey ? context.KeyState_Shift : 0) + (event.ctrlKey ? context.KeyState_Control : 0) + (event.altKey ? context.KeyState_Menu : 0));
                }
                this.messageWidget = new hpccCommon.TextBox()
                    .shape_colorFill("#006CCC")
                    .shape_colorStroke("#003666")
                    .text_colorFill("#FFFFFF")
                    ;
                this.layout = new hpccLayout.Layered()
                    .target(domNode.id)
                    .addLayer(this.messageWidget)
                    .addLayer(this.graphWidget)
                    .render()
                    ;
                this._options = {};
            },

            option: function (key, _) {
                if (arguments.length < 1) throw Error("Invalid Call:  option");
                if (arguments.length === 1) return this._options[key];
                this._options[key] = _ instanceof Array ? _.length > 0 : _;
                return this;
            },

            optionsReset: function (options) {
                options = options || this._optionsDefault;
                for (var key in options) {
                    this.option(key, options[key]);
                }
            },

            setMessage: function (msg) {
                if (msg !== this._prevMsg) {
                    this.messageWidget
                        .text(msg)
                        .visible(msg ? true : false)
                        .render()
                        ;
                    if ((msg && this.graphWidget.visible()) || (!msg && !this.graphWidget.visible())) {
                        this.graphWidget.visible(msg ? false : true).render();
                    }
                    this._prevMsg = msg;
                }
            },

            setScale: function (scale) {
                this.graphWidget.zoomTo(undefined, scale / 100);
            },

            centerOnItem: function (item, scaleToFit, widthOnly) {
                if (item) {
                    if (scaleToFit) {
                        var bbox = item.__widget.getBBox();
                        this.graphWidget.zoomToBBox(bbox);
                    } else {
                        var bounds = this.graphWidget.getBounds([item.__widget]);
                        this.graphWidget.centerOn(bounds);
                    }
                } else {
                    if (scaleToFit) {
                        this.graphWidget.zoomToFit();
                    } else {
                        var bounds = this.graphWidget.getVertexBounds();
                        this.graphWidget.centerOn(bounds);
                    }
                }
            },

            getSelectionAsGlobalID: function () {
                var selection = this.graphWidget.selection();
                return selection.map(function (item) {
                    return item.__hpcc_globalID;
                });
            },

            setSelectedAsGlobalID: function (globalIDs) {
                var selection = [];
                globalIDs.forEach(function (globalID, idx) {
                    var item = this.getItem(globalID);
                    if (item && item.__widget) {
                        selection.push(item.__widget);
                    }
                }, this);
                this.graphWidget.selection(selection);
            },

            getGlobalType: function (item) {
                return this.graphData.getGlobalTypeString(item);
            },

            getGlobalID: function (item) {
                return item.__hpcc_id;
            },

            getItem: function (globalID) {
                return this.graphData.idx[globalID];
            },

            setSelected: function (items) {
                this.graphWidget.selection(items);
            },

            getSelection: function () {
                return this.graphWidget.selection();
            },

            getSVG: function () {
                return "";  //TODO - Should be Serialized Layout to prevent re-calculation on prev/next  ---
            },

            getDOT: function () {
                return "";
            },

            getVertices: function () {
                return this.graphData.vertices;
            },

            find: function (findText) {
                var findProp = "";
                var findTerm = findText;
                var findTextParts = findText.split(":");
                if (findTextParts.length > 1) {
                    findProp = findTextParts[0];
                    findTextParts.splice(0, 1);
                    findTerm = findTextParts.join(":");
                }
                return arrayUtil.filter(this.graphData.vertices, function (item) {
                    if (findProp) {
                        if (item.hasOwnProperty(findProp)) {
                            return (item[findProp].toString().toLowerCase().indexOf(findTerm.toLowerCase()) >= 0);
                        }
                    } else {
                        for (var key in item) {
                            if (item.hasOwnProperty(key) && item[key].toString().toLowerCase().indexOf(findTerm.toLowerCase()) >= 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            },

            cleanObject: function (object) {
                var retVal = {};
                for (var key in object) {
                    if (object.hasOwnProperty(key) && typeof object[key] !== "function") {
                        retVal[key] = object[key];
                    }
                }
                return retVal;
            },

            cleanObjects: function (objects) {
                return objects.map(function (object) {
                    return this.cleanObject(object);
                }, this);
            },

            gatherTreeWithProperties: function (subgraph) {
                subgraph = subgraph || this.graphData.subgraphs[0];
                var retVal = subgraph.getProperties();
                retVal._children = [];
                arrayUtil.forEach(subgraph.__hpcc_subgraphs, function (subgraph, idx) {
                    retVal._children.push(this.gatherTreeWithProperties(subgraph));
                }, this);
                arrayUtil.forEach(subgraph.__hpcc_vertices, function (vertex, idx) {
                    retVal._children.push(vertex.getProperties());
                }, this);
                return retVal;
            },

            getProperties: function (item) {
                return item.getProperties();
            },

            getTreeWithProperties: function () {
                return [this.gatherTreeWithProperties()];
            },

            getSubgraphsWithProperties: function () {
                return this.cleanObjects(this.graphData.subgraphs);
            },

            getVerticesWithProperties: function () {
                return this.cleanObjects(this.graphData.vertices);
            },

            getEdgesWithProperties: function () {
                return this.cleanObjects(this.graphData.edges);
            },

            getLocalisedXGMML2: function (selectedItems, depth, distance, noSpills) {
                return this.graphData.getLocalisedXGMML(selectedItems, depth, distance, noSpills);
            },

            startLayout: function (layout) {
                var context = this;
                setTimeout(function (layout) {
                    context.graphWidget
                        .layout("Hierarchy")
                        .render()
                        ;
                    context.emit("LayoutFinished", {});
                }, 100);
            },

            clear: function () {
                this.graphData.clear();
                this.graphWidget.clear();
            },

            mergeXGMML: function (xgmml) {
                this._loadXGMML(xgmml, true);
            },

            loadXGMML: function (xgmml) {
                this._loadXGMML(xgmml, false);
            },

            _loadXGMML: function (xgmml, merge) {
                if (merge) {
                    this.graphData.merge(xgmml, {});
                } else {
                    this.graphData.load(xgmml, {});
                }
                if (!this._skipRender) {
                    this.rebuild(merge);
                }
            },

            format: function (labelTpl, obj) {
                var retVal = "";
                var lpos = labelTpl.indexOf("%");
                var rpos = -1;
                while (lpos >= 0) {
                    retVal += labelTpl.substring(rpos + 1, lpos);
                    rpos = labelTpl.indexOf("%", lpos + 1);
                    if (rpos < 0) {
                        console.log("Invalid Label Template");
                        break;
                    }
                    var key = labelTpl.substring(lpos + 1, rpos);
                    retVal += !key ? "%" : (obj[labelTpl.substring(lpos + 1, rpos)] || "");
                    lpos = labelTpl.indexOf("%", rpos + 1);
                }
                retVal += labelTpl.substring(rpos + 1, labelTpl.length);
                return retVal.split("\\n").filter(function (line) {
                    return !!line;
                }).join("\n");
            },

            rebuild: function (merge) {
                merge = merge || false;
                var vertices = [];
                var edges = [];
                var hierarchy = [];

                if (this.option("subgraph")) {
                    arrayUtil.forEach(this.graphData.subgraphs, function (subgraph, idx) {
                        if (!merge || !subgraph.__widget) {
                            subgraph.__widget = new hpccGraph.Subgraph()
                                .title(subgraph.__hpcc_id)
                                ;
                            subgraph.__widget.__hpcc_globalID = subgraph.__hpcc_id;
                        }
                        vertices.push(subgraph.__widget);
                    }, this);
                }
                var labelTpl = this.option("vlabel");
                var tooltipTpl = this.option("vtooltip");
                arrayUtil.forEach(this.graphData.vertices, function (item, idx) {
                    if (!this.option("vhidespills") || !item.isSpill()) {
                        if (!merge || !item.__widget) {
                            switch (item._kind) {
                                case "point":
                                    item.__widget = new hpccCommon.Shape()
                                        .radius(7)
                                        ;
                                    break;
                                default:
                                    if (this.option("vicon") && this.option("vlabel")) {
                                        item.__widget = new hpccGraph.Vertex()
                                            .faChar(faCharFactory(item._kind))
                                            ;
                                    } else if (this.option("vicon")) {
                                        item.__widget = new hpccCommon.Icon()
                                            .faChar(faCharFactory(item._kind))
                                            ;
                                    } else if (this.option("vlabel")) {
                                        item.__widget = new hpccCommon.TextBox()
                                            ;
                                    } else {
                                        item.__widget = new hpccCommon.Shape()
                                            .radius(7)
                                            ;
                                    }
                                    break;
                            }
                            item.__widget.__hpcc_globalID = item.__hpcc_id;
                        }
                        if (item.__widget.text) {
                            var label = this.format(labelTpl, item);
                            item.__widget.text(label);
                        }
                        if (item.__widget.tooltip) {
                            var tooltip = this.format(tooltipTpl, item);
                            item.__widget.tooltip(tooltip);
                        }
                        vertices.push(item.__widget);
                    }
                }, this);
                labelTpl = this.option("elabel");
                tooltipTpl = this.option("etooltip");
                arrayUtil.forEach(this.graphData.edges, function (item, idx) {
                    var source = item.getSource();
                    var target = item.getTarget();
                    if (!this.option("vhidespills") || !target.isSpill()) {
                        var label = this.format(labelTpl, item);
                        var tooltip = this.format(tooltipTpl, item);
                        var numSlaves = parseInt(item.NumSlaves);
                        var numStarts = parseInt(item.NumStarts);
                        var numStops = parseInt(item.NumStops);
                        var started = numStarts > 0;
                        var finished = numStops === numSlaves;
                        var active = started && !finished;

                        var strokeDasharray = null;
                        var weight = 100;
                        if (item._dependsOn) {
                            weight = 10;
                            strokeDasharray = "1,5";
                        } else if (item._childGraph) {
                            strokeDasharray = "5,5";
                        } else if (item._isSpill) {
                            weight = 25;
                            strokeDasharray = "5,5,10,5";
                        }
                        if (this.option("vhidespills") && source.isSpill()) {
                            label += "\n(" + nlsHPCC.Spill + ")";
                            weight = 25;
                            strokeDasharray = "5,5,10,5";
                            while (source.isSpill()) {
                                var inputs = source.getInVertices();
                                source = inputs[0];
                            }
                        }
                        if (!merge || !item.__widget) {
                            item.__widget = new hpccGraph.Edge()
                                .sourceVertex(source.__widget)
                                .targetVertex(target.__widget)
                                .targetMarker("arrow")
                                .weight(weight)
                                .strokeDasharray(strokeDasharray)
                                ;
                            item.__widget.__hpcc_globalID = item.__hpcc_id;
                        }
                        item.__widget.text(label);
                        item.__widget.tooltip(tooltip);
                        item.__widget.classed({
                            started: started && !finished && !active,
                            finished: finished && !active,
                            active: active
                        });
                        edges.push(item.__widget);
                    }
                }, this);
                if (this.option("subgraph")) {
                    arrayUtil.forEach(this.graphData.subgraphs, function (subgraph, idx) {
                        arrayUtil.forEach(subgraph.__hpcc_subgraphs, function (item, idx) {
                            if (subgraph.__widget && item.__widget) {
                                hierarchy.push({ parent: subgraph.__widget, child: item.__widget });
                            }
                        }, this);
                        arrayUtil.forEach(subgraph.__hpcc_vertices, function (item, idx) {
                            if (subgraph.__widget && item.__widget) {
                                hierarchy.push({ parent: subgraph.__widget, child: item.__widget });
                            }
                        }, this);
                    }, this);
                }
                this.graphWidget.data({ vertices: vertices, edges: edges, hierarchy: hierarchy, merge: merge });
            }
        });

        return declare("JSGraphWidget", [GraphWidget], {
            baseClass: "JSGraphWidget",
            constructor: function () {
                this.graphData = new ESPGraph.Graph();
            },

            hasOptions: function (key, val) {
                return this.hasPlugin();
            },

            _onOptionsApply: function () {
                var optionsValues = this.optionsForm.getValues();
                this.persist.setObj("options", optionsValues);
                this.optionsDropDown.closeDropDown();
                this._plugin.optionsReset(optionsValues);
                this.refreshRootState();
                delete this.xgmml;
                this._onRefreshScope();
            },

            _onOptionsReset: function () {
                this.optionsForm.setValues(this._plugin._optionsDefault);
                this._plugin.optionsReset(this._plugin._optionsDefault);
            },

            option: function (key, val) {
                return this._plugin.option.apply(this._plugin, arguments);
            },

            resize: function (size) {
                this.inherited(arguments);
                if (this.hasPlugin()) {
                    this._plugin.layout
                        .resize()
                        .render()
                        ;
                }
            },

            createPlugin: function () {
                if (!this.hasPlugin()) {
                    this.persist = new Utility.Persist(this._persistID || "");
                    var context = this;
                    context._plugin = new JSPlugin(context.graphContentPane.domNode);
                    context._plugin._optionsDefault = context.optionsForm.getValues();
                    switch (context._persistID) {
                        case "overview":
                            context._plugin._optionsDefault.subgraph = ["on"];
                            context._plugin._optionsDefault.vlabel = "";
                            break;
                        case "local":
                            context._plugin._optionsDefault.subgraph = ["on"];
                            context._plugin._optionsDefault.vhidespills = ["off"];
                            break;
                        default:
                            context._plugin._optionsDefault.vhidespills = ["on"];
                            break;
                    }
                    var optionsValues = lang.mixin({}, context._plugin._optionsDefault, context.persist.getObj("options"));
                    context._plugin.optionsReset(optionsValues);
                    context.optionsForm.setValues(optionsValues);
                    context.version = {
                        major: 6,
                        minor: 0
                    };
                    context.registerEvents();
                    context.refreshRootState();
                    context.emit("ready");
                }
            },

            watchSplitter: function (splitter) {
            },

            watchSelect: function (select) {
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ESPGraph.js":
/*!*****************************!*\
  !*** ./lib/src/ESPGraph.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojox/xml/parser */ "./node_modules/dojox/xml/parser.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, arrayUtil, parser, Utility) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GRAPH_TYPE = {
        UNKNOWN: 0,
        GRAPH: 1,
        SUBGRAPH: 2,
        VERTEX: 3,
        EDGE: 4,
        LAST: 5
    };
    var GRAPH_TYPE_STRING = {
        UNKNOWN: "Unknown",
        GRAPH: "Graph",
        SUBGRAPH: "Cluster",
        VERTEX: "Vertex",
        EDGE: "Edge",
        LAST: "Last"
    };
    var LocalisedXGMMLWriter = declare([], {
        constructor: function (graph) {
            this.graph = graph;
            this.m_xgmml = "";
            this.m_visibleSubgraphs = {};
            this.m_visibleVertices = {};
            this.m_semiVisibleVertices = {};
            this.m_visibleEdges = {};
        },
        calcVisibility: function (items, localisationDepth, localisationDistance, noSpills) {
            this.noSpills = noSpills;
            arrayUtil.forEach(items, function (item) {
                switch (this.graph.getGlobalType(item)) {
                    case GRAPH_TYPE.VERTEX:
                        this.calcInVertexVisibility(item, localisationDistance);
                        this.calcOutVertexVisibility(item, localisationDistance);
                        break;
                    case GRAPH_TYPE.EDGE:
                        this.calcInVertexVisibility(item.getSource(), localisationDistance - 1);
                        this.calcOutVertexVisibility(item.getTarget(), localisationDistance - 1);
                        break;
                    case GRAPH_TYPE.SUBGRAPH:
                        this.m_visibleSubgraphs[item.__hpcc_id] = item;
                        this.calcSubgraphVisibility(item, localisationDepth - 1);
                        break;
                }
            }, this);
            this.calcVisibility2();
        },
        calcInVertexVisibility: function (vertex, localisationDistance) {
            if (this.noSpills && vertex.isSpill()) {
                localisationDistance++;
            }
            this.m_visibleVertices[vertex.__hpcc_id] = vertex;
            if (localisationDistance > 0) {
                arrayUtil.forEach(vertex.getInEdges(), function (edge, idx) {
                    this.calcInVertexVisibility(edge.getSource(), localisationDistance - 1);
                }, this);
            }
        },
        calcOutVertexVisibility: function (vertex, localisationDistance) {
            if (this.noSpills && vertex.isSpill()) {
                localisationDistance++;
            }
            this.m_visibleVertices[vertex.__hpcc_id] = vertex;
            if (localisationDistance > 0) {
                arrayUtil.forEach(vertex.getOutEdges(), function (edge, idx) {
                    this.calcOutVertexVisibility(edge.getTarget(), localisationDistance - 1);
                }, this);
            }
        },
        calcSubgraphVisibility: function (subgraph, localisationDepth) {
            if (localisationDepth < 0) {
                return;
            }
            if (localisationDepth > 0) {
                arrayUtil.forEach(subgraph.__hpcc_subgraphs, function (subgraph, idx) {
                    this.calcSubgraphVisibility(subgraph, localisationDepth - 1);
                }, this);
            }
            arrayUtil.forEach(subgraph.__hpcc_subgraphs, function (subgraph, idx) {
                this.m_visibleSubgraphs[subgraph.__hpcc_id] = subgraph;
            }, this);
            arrayUtil.forEach(subgraph.__hpcc_vertices, function (vertex, idx) {
                this.m_visibleVertices[vertex.__hpcc_id] = vertex;
            }, this);
            //  Calculate edges that pass through the subgraph  ---
            var dedupEdges = {};
            arrayUtil.forEach(this.graph.edges, function (edge, idx) {
                if (edge.getSource().__hpcc_parent !== edge.getTarget().__hpcc_parent && subgraph === this.getCommonAncestor(edge)) {
                    //  Only include one unique edge between subgraphs  ---
                    if (!dedupEdges[edge.getSource().__hpcc_parent.__hpcc_id + "::" + edge.getTarget().__hpcc_parent.__hpcc_id]) {
                        dedupEdges[edge.getSource().__hpcc_parent.__hpcc_id + "::" + edge.getTarget().__hpcc_parent.__hpcc_id] = true;
                        this.m_visibleEdges[edge.__hpcc_id] = edge;
                    }
                }
            }, this);
        },
        buildVertexString: function (vertex, isPoint) {
            var attrStr = "";
            var propsStr = "";
            var props = vertex.getProperties();
            for (var key in props) {
                if (isPoint && key.indexOf("_kind") >= 0) {
                    propsStr += "<att name=\"_kind\" value=\"point\"/>";
                }
                else if (key === "id" || key === "label") {
                    attrStr += " " + key + "=\"" + Utility.xmlEncode(props[key]) + "\"";
                }
                else {
                    propsStr += "<att name=\"" + key + "\" value=\"" + Utility.xmlEncode(props[key]) + "\"/>";
                }
            }
            return "<node" + attrStr + ">" + propsStr + "</node>";
        },
        buildEdgeString: function (edge) {
            var attrStr = "";
            var propsStr = "";
            var props = edge.getProperties();
            for (var key in props) {
                if (key.toLowerCase() === "id" ||
                    key.toLowerCase() === "label" ||
                    key.toLowerCase() === "source" ||
                    key.toLowerCase() === "target") {
                    attrStr += " " + key + "=\"" + Utility.xmlEncode(props[key]) + "\"";
                }
                else {
                    propsStr += "<att name=\"" + key + "\" value=\"" + Utility.xmlEncode(props[key]) + "\"/>";
                }
            }
            return "<edge" + attrStr + ">" + propsStr + "</edge>";
        },
        getAncestors: function (v, ancestors) {
            var parent = v.__hpcc_parent;
            while (parent) {
                ancestors.push(parent);
                parent = parent.__hpcc_parent;
            }
        },
        getCommonAncestorV: function (v1, v2) {
            var v1_ancestors = [];
            var v2_ancestors = [];
            this.getAncestors(v1, v1_ancestors);
            this.getAncestors(v2, v2_ancestors);
            var finger1 = v1_ancestors.length - 1;
            var finger2 = v2_ancestors.length - 1;
            var retVal = null;
            while (finger1 >= 0 && finger2 >= 0 && v1_ancestors[finger1] === v2_ancestors[finger2]) {
                retVal = v1_ancestors[finger1];
                --finger1;
                --finger2;
            }
            return retVal;
        },
        getCommonAncestor: function (e) {
            return this.getCommonAncestorV(e.getSource(), e.getTarget());
        },
        calcAncestorVisibility: function (vertex) {
            var ancestors = [];
            this.getAncestors(vertex, ancestors);
            arrayUtil.forEach(ancestors, function (item, idx) {
                this.m_visibleSubgraphs[item.__hpcc_id] = item;
            }, this);
        },
        calcVisibility2: function () {
            for (var key in this.m_visibleVertices) {
                var vertex = this.m_visibleVertices[key];
                arrayUtil.forEach(vertex.getInEdges(), function (edge, idx) {
                    this.m_visibleEdges[edge.__hpcc_id] = edge;
                }, this);
                arrayUtil.forEach(vertex.getOutEdges(), function (edge, idx) {
                    this.m_visibleEdges[edge.__hpcc_id] = edge;
                }, this);
                this.calcAncestorVisibility(vertex);
            }
            this.calcSemiVisibleVertices();
        },
        addSemiVisibleEdge: function (edge) {
            if (!this.m_visibleEdges[edge.__hpcc_id]) {
                this.m_visibleEdges[edge.__hpcc_id] = edge;
            }
        },
        addSemiVisibleVertex: function (vertex) {
            if (!this.m_visibleVertices[vertex.__hpcc_id]) {
                this.m_semiVisibleVertices[vertex.__hpcc_id] = vertex;
                this.calcAncestorVisibility(vertex);
            }
        },
        calcSemiVisibleVertices: function () {
            for (var key in this.m_visibleEdges) {
                var edge = this.m_visibleEdges[key];
                var source = edge.getSource();
                this.addSemiVisibleVertex(source);
                while (this.noSpills && source.isSpill()) {
                    var inEdges = source.getInEdges();
                    this.addSemiVisibleEdge(inEdges[0]);
                    source = inEdges[0].getSource();
                    this.addSemiVisibleVertex(source);
                }
                var target = edge.getTarget();
                this.addSemiVisibleVertex(target);
                while (this.noSpills && target.isSpill()) {
                    var outEdges = target.getOutEdges();
                    this.addSemiVisibleEdge(outEdges[0]);
                    target = outEdges[0].getTarget();
                    this.addSemiVisibleVertex(target);
                }
            }
        },
        writeXgmml: function () {
            this.subgraphVisited(this.graph.subgraphs[0], true);
            arrayUtil.forEach(this.graph.edges, function (edge, idx) {
                this.edgeVisited(edge);
            }, this);
        },
        subgraphVisited: function (subgraph, root) {
            if (this.m_visibleSubgraphs[subgraph.__hpcc_id]) {
                var propsStr = "";
                this.m_xgmml += root ? "" : "<node id=\"" + subgraph.__hpcc_id + "\"><att><graph>";
                var xgmmlLen = this.m_xgmml.length;
                subgraph.walkSubgraphs(this);
                subgraph.walkVertices(this);
                if (xgmmlLen === this.m_xgmml.length) {
                    //  Add at least one child otherwise subgraphs will render as a vertex  ---
                    var vertex = subgraph.__hpcc_vertices[0];
                    if (vertex) {
                        this.m_xgmml += this.buildVertexString(vertex, true);
                    }
                }
                var props = subgraph.getProperties();
                for (var key in props) {
                    propsStr += "<att name=\"" + key + "\" value=\"" + Utility.xmlEncode(props[key]) + "\"/>";
                }
                this.m_xgmml += root ? "" : "</graph></att>" + propsStr + "</node>";
            }
            return false;
        },
        vertexVisited: function (vertex) {
            if (this.m_visibleVertices[vertex.__hpcc_id]) {
                this.m_xgmml += this.buildVertexString(vertex, false);
            }
            else if (this.m_semiVisibleVertices[vertex.__hpcc_id]) {
                this.m_xgmml += this.buildVertexString(vertex, true);
            }
        },
        edgeVisited: function (edge) {
            if (this.m_visibleEdges[edge.__hpcc_id]) {
                this.m_xgmml += this.buildEdgeString(edge);
            }
        }
    });
    var GraphItem = declare([], {
        constructor: function (graph, id) {
            this.__hpcc_graph = graph;
            this.__hpcc_id = id;
            this._globalID = id;
        },
        getProperties: function () {
            var retVal = {};
            for (var key in this) {
                if (key.indexOf("__") !== 0 && this.hasOwnProperty(key)) {
                    retVal[key] = this[key];
                }
            }
            return retVal;
        }
    });
    var Subgraph = declare([GraphItem], {
        constructor: function (graph, id) {
            this._globalType = id === "0" ? "Graph" : "Cluster";
            this.__hpcc_subgraphs = [];
            this.__hpcc_vertices = [];
            this.__hpcc_edges = [];
            this.id = id;
        },
        addSubgraph: function (subgraph) {
            subgraph.__hpcc_parent = this;
            if (!arrayUtil.some(this.__hpcc_subgraphs, function (subgraph2) {
                return subgraph === subgraph2;
            })) {
                this.__hpcc_subgraphs.push(subgraph);
            }
        },
        addVertex: function (vertex) {
            vertex.__hpcc_parent = this;
            if (!arrayUtil.some(this.__hpcc_vertices, function (vertex2) {
                return vertex === vertex2;
            })) {
                this.__hpcc_vertices.push(vertex);
            }
        },
        removeVertex: function (vertex) {
            this.__hpcc_vertices = arrayUtil.filter(this.__hpcc_vertices, function (vertex2) {
                return vertex !== vertex2;
            }, this);
        },
        addEdge: function (edge) {
            edge.__hpcc_parent = this;
            if (!arrayUtil.some(this.__hpcc_edges, function (edge2) {
                return edge === edge2;
            })) {
                this.__hpcc_edges.push(edge);
            }
        },
        removeEdge: function (edge) {
            this.__hpcc_edges = arrayUtil.filter(this.__hpcc_edges, function (edge2) {
                return edge !== edge2;
            }, this);
        },
        remove: function () {
            arrayUtil.forEach(this.__hpcc_subgraphs, function (subgraph) {
                subgraph.__hpcc_parent = this.__hpcc_parent;
            }, this);
            arrayUtil.forEach(this.__hpcc_vertices, function (vertex) {
                vertex.__hpcc_parent = this.__hpcc_parent;
            }, this);
            arrayUtil.forEach(this.__hpcc_edges, function (edge) {
                edge.__hpcc_parent = this.__hpcc_parent;
            }, this);
            delete this.__hpcc_parent;
            this.__hpcc_graph.removeItem(this);
        },
        walkSubgraphs: function (visitor) {
            arrayUtil.forEach(this.__hpcc_subgraphs, function (subgraph, idx) {
                if (visitor.subgraphVisited(subgraph)) {
                    subgraph.walkSubgraphs(visitor);
                }
            }, this);
        },
        walkVertices: function (visitor) {
            arrayUtil.forEach(this.__hpcc_vertices, function (vertex, idx) {
                visitor.vertexVisited(vertex);
            }, this);
        }
    });
    var Vertex = declare([GraphItem], {
        constructor: function () {
            this._globalType = "Vertex";
        },
        isSpill: function () {
            return this._isSpill;
        },
        remove: function () {
            var inVertices = this.getInVertices();
            if (inVertices.length <= 1) {
                console.log(this.__hpcc_id + ":  remove only supports single or zero inputs activities...");
            }
            arrayUtil.forEach(this.getInEdges(), function (edge) {
                edge.remove();
            }, this);
            arrayUtil.forEach(this.getOutEdges(), function (edge) {
                edge.setSource(inVertices[0]);
            }, this);
            arrayUtil.forEach(this.subgraphs, function (subgraph) {
                subgraph.removeVertex(subgraph);
            }, this);
            this.__hpcc_graph.removeItem(this);
        },
        getInVertices: function () {
            return arrayUtil.map(this.getInEdges(), function (edge) {
                return edge.getSource();
            }, this);
        },
        getInEdges: function () {
            return arrayUtil.filter(this.__hpcc_graph.edges, function (edge) {
                return edge.getTarget() === this;
            }, this);
        },
        getOutVertices: function () {
            return arrayUtil.map(this.getOutEdges(), function (edge) {
                return edge.getTarget();
            }, this);
        },
        getOutEdges: function () {
            return arrayUtil.filter(this.__hpcc_graph.edges, function (edge) {
                return edge.getSource() === this;
            }, this);
        }
    });
    var Edge = declare([GraphItem], {
        constructor: function (graph, id) {
            this._globalType = "Edge";
        },
        remove: function () {
            arrayUtil.forEach(this.__hpcc_graph.subgraphs, function (subgraph) {
                subgraph.removeEdge(this);
            }, this);
            this.__hpcc_graph.removeItem(this);
        },
        getSource: function () {
            return this.__hpcc_graph.idx[this._sourceActivity || this.source];
        },
        setSource: function (source) {
            if (this._sourceActivity) {
                this._sourceActivity = source.__hpcc_id;
            }
            else if (this.source) {
                this.source = source.__hpcc_id;
            }
            if (this.__widget) {
                this.__widget.setSource(this.getSource().__widget);
            }
        },
        getTarget: function () {
            return this.__hpcc_graph.idx[this._targetActivity || this.target];
        }
    });
    exports.Graph = declare([], {
        constructor: function () {
            this.clear();
        },
        clear: function () {
            this.xgmml = "";
            this.idx = {};
            this.subgraphs = [];
            this.vertices = [];
            this.edges = [];
        },
        load: function (xgmml) {
            this.clear();
            this.merge(xgmml);
        },
        merge: function (xgmml) {
            this.xgmml = xgmml;
            var dom = parser.parse(xgmml);
            this.walkDocument(dom.documentElement, "0");
        },
        getGlobalType: function (item) {
            if (item instanceof Vertex) {
                return GRAPH_TYPE.VERTEX;
            }
            else if (item instanceof Edge) {
                return GRAPH_TYPE.EDGE;
            }
            else if (item instanceof Subgraph) {
                return GRAPH_TYPE.SUBGRAPH;
            }
            else if (item instanceof exports.Graph) {
                return GRAPH_TYPE.GRAPH;
            }
            return GRAPH_TYPE.UNKNOWN;
        },
        getGlobalTypeString: function (item) {
            if (item instanceof Vertex) {
                return GRAPH_TYPE_STRING.VERTEX;
            }
            else if (item instanceof Edge) {
                return GRAPH_TYPE_STRING.EDGE;
            }
            else if (item instanceof Subgraph) {
                return GRAPH_TYPE_STRING.SUBGRAPH;
            }
            else if (item instanceof exports.Graph) {
                return GRAPH_TYPE_STRING.GRAPH;
            }
            return GRAPH_TYPE_STRING.UNKNOWN;
        },
        getItem: function (docNode, id) {
            if (!this.idx[id]) {
                switch (docNode.tagName) {
                    case "graph":
                        var subgraph = new Subgraph(this, id);
                        this.subgraphs.push(subgraph);
                        this.idx[id] = subgraph;
                        break;
                    case "node":
                        var vertex = new Vertex(this, id);
                        this.vertices.push(vertex);
                        this.idx[id] = vertex;
                        break;
                    case "edge":
                        var edge = new Edge(this, id);
                        this.edges.push(edge);
                        this.idx[id] = edge;
                        break;
                    default:
                        console.log("Graph.getItem - Unknown Node Type!");
                        break;
                }
            }
            var retVal = this.idx[id];
            arrayUtil.forEach(docNode.attributes, function (attr, idx) {
                retVal[attr.name] = attr.value;
            }, this);
            return retVal;
        },
        removeItem: function (item) {
            delete this.idx[item.__hpcc_id];
            if (item instanceof Subgraph) {
                this.subgraphs = arrayUtil.filter(this.subgraphs, function (subgraph) {
                    return item !== subgraph;
                }, this);
            }
            else if (item instanceof Vertex) {
                this.vertices = arrayUtil.filter(this.vertices, function (vertex) {
                    return item !== vertex;
                }, this);
            }
            else if (item instanceof Edge) {
                this.edges = arrayUtil.filter(this.edges, function (edge) {
                    return item !== edge;
                }, this);
            }
        },
        getChildByTagName: function (docNode, tagName) {
            var retVal = null;
            arrayUtil.some(docNode.childNodes, function (childNode, idx) {
                if (childNode.tagName === tagName) {
                    retVal = childNode;
                    return true;
                }
            }, this);
            return retVal;
        },
        walkDocument: function (docNode, id) {
            var retVal = this.getItem(docNode, id);
            arrayUtil.forEach(docNode.childNodes, function (childNode, idx) {
                switch (childNode.nodeType) {
                    case 1: //	ELEMENT_NODE
                        switch (childNode.tagName) {
                            case "graph":
                                break;
                            case "node":
                                var isSubgraph = false;
                                var attNode = this.getChildByTagName(childNode, "att");
                                if (attNode) {
                                    var graphNode = this.getChildByTagName(attNode, "graph");
                                    if (graphNode) {
                                        isSubgraph = true;
                                        var subgraph = this.walkDocument(graphNode, childNode.getAttribute("id"));
                                        retVal.addSubgraph(subgraph);
                                    }
                                }
                                if (!isSubgraph) {
                                    var vertex = this.walkDocument(childNode, childNode.getAttribute("id"));
                                    retVal.addVertex(vertex);
                                }
                                break;
                            case "att":
                                var name = childNode.getAttribute("name");
                                var value = childNode.getAttribute("value");
                                if (name.indexOf("Time") === 0) {
                                    retVal["_" + name] = value;
                                    retVal[name] = "" + Utility.espTime2Seconds(value);
                                }
                                else if (name.indexOf("Size") === 0) {
                                    retVal["_" + name] = value;
                                    retVal[name] = "" + Utility.espSize2Bytes(value);
                                }
                                else if (name.indexOf("Skew") === 0) {
                                    retVal["_" + name] = value;
                                    retVal[name] = "" + Utility.espSkew2Number(value);
                                }
                                else {
                                    retVal[name] = value;
                                }
                                break;
                            case "edge":
                                var edge = this.walkDocument(childNode, childNode.getAttribute("id"));
                                if (edge.NumRowsProcessed !== undefined) {
                                    edge._eclwatchCount = edge.NumRowsProcessed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }
                                else if (edge.Count !== undefined) {
                                    edge._eclwatchCount = edge.Count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }
                                else if (edge.count !== undefined) {
                                    edge._eclwatchCount = edge.count.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }
                                if (edge.inputProgress) {
                                    edge._eclwatchInputProgress = "[" + edge.inputProgress.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "]";
                                }
                                if (edge.SkewMaxRowsProcessed && edge.SkewMinRowsProcessed) {
                                    edge._eclwatchSkew = "+" + edge.SkewMaxRowsProcessed + ", " + edge.SkewMinRowsProcessed;
                                }
                                if (edge._dependsOn) {
                                }
                                else if (edge._childGraph) {
                                }
                                else if (edge._sourceActivity || edge._targetActivity) {
                                    edge._isSpill = true;
                                    var source = edge.getSource();
                                    source._isSpill = true;
                                    var target = edge.getTarget();
                                    target._isSpill = true;
                                }
                                retVal.addEdge(edge);
                                break;
                            default:
                                break;
                        }
                        break;
                    case 2: //	ATTRIBUTE_NODE
                    case 3: //	TEXT_NODE
                    case 4: //	CDATA_SECTION_NODE
                    case 5: //	ENTITY_REFERENCE_NODE
                    case 6: //	ENTITY_NODE
                    case 7: //	PROCESSING_INSTRUCTION_NODE
                    case 8: //	COMMENT_NODE
                    case 9: //	DOCUMENT_NODE
                    case 10: //	DOCUMENT_TYPE_NODE
                    case 11: //	DOCUMENT_FRAGMENT_NODE
                    case 12: //	NOTATION_NODE
                        break;
                    default:
                        break;
                }
            }, this);
            return retVal;
        },
        removeSubgraphs: function () {
            var subgraphs = arrayUtil.map(this.subgraphs, function (subgraph) { return subgraph; });
            arrayUtil.forEach(subgraphs, function (subgraph) {
                if (subgraph.__hpcc_parent instanceof Subgraph) {
                    subgraph.remove();
                }
            }, this);
        },
        removeSpillVertices: function () {
            var vertices = arrayUtil.map(this.vertices, function (vertex) { return vertex; });
            arrayUtil.forEach(vertices, function (vertex) {
                if (vertex.isSpill()) {
                    vertex.remove();
                }
            }, this);
        },
        getLocalisedXGMML: function (items, localisationDepth, localisationDistance, noSpills) {
            var xgmmlWriter = new LocalisedXGMMLWriter(this);
            xgmmlWriter.calcVisibility(items, localisationDepth, localisationDistance, noSpills);
            xgmmlWriter.writeXgmml();
            return "<graph>" + xgmmlWriter.m_xgmml + "</graph>";
        }
    });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPGraph.js.map

/***/ }),

/***/ "./lib/src/GraphStore.js":
/*!*******************************!*\
  !*** ./lib/src/GraphStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, lang, arrayUtil, QueryResults, ESPUtil_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GraphStore = /** @class */ (function (_super) {
        tslib_1.__extends(GraphStore, _super);
        function GraphStore(idProperty) {
            if (idProperty === void 0) { idProperty = "id"; }
            var _this = _super.call(this) || this;
            _this.cacheColumns = {};
            _this.idProperty = idProperty;
            return _this;
        }
        GraphStore.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
            this.cacheColumns = {};
            this.calcColumns();
        };
        GraphStore.prototype.query = function (query, options) {
            var retVal = _super.prototype.query.call(this, query, options);
            var sortSet = options && options.sort;
            if (sortSet) {
                retVal.sort(typeof sortSet === "function" ? sortSet : function (a, b) {
                    for (var sort, i = 0; sort = sortSet[i]; i++) {
                        var aValue = a[sort.attribute];
                        var bValue = b[sort.attribute];
                        // valueOf enables proper comparison of dates
                        aValue = aValue != null ? aValue.valueOf() : aValue;
                        bValue = bValue != null ? bValue.valueOf() : bValue;
                        if (aValue !== bValue) {
                            return !!sort.descending == (bValue == null || aValue > bValue) ? -1 : 1; // jshint ignore:line
                        }
                    }
                    return 0;
                });
            }
            return retVal;
        };
        //  Helpers  ---
        GraphStore.prototype.isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        GraphStore.prototype.calcColumns = function () {
            arrayUtil.forEach(this.data, function (item, idx) {
                for (var key in item) {
                    if (key !== "id" && key.substring(0, 1) !== "_") {
                        if (!this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                        else if (item[key].length > this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                    }
                    if (this.isNumber(item[key])) {
                        item[key] = parseFloat(item[key]);
                    }
                }
            }, this);
        };
        GraphStore.prototype.getColumnWidth = function (key) {
            var width = this.cacheColumns[key] * 9;
            if (width < 27) {
                width = 27;
            }
            else if (width > 300) {
                width = 300;
            }
            return width;
        };
        GraphStore.prototype.appendColumns = function (target, highPriority, lowPriority, skip, formatTime) {
            if (skip === void 0) { skip = []; }
            if (formatTime === void 0) { formatTime = false; }
            if (!highPriority) {
                highPriority = [];
            }
            if (!lowPriority) {
                lowPriority = [];
            }
            var skip = skip || [];
            arrayUtil.forEach(target, function (item, idx) {
                skip.push(item.field);
            });
            arrayUtil.forEach(highPriority, function (key, idx) {
                if (skip.indexOf(key) === -1 && this.cacheColumns[key]) {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }, this);
            for (var key in this.cacheColumns) {
                if (skip.indexOf(key) === -1 && highPriority.indexOf(key) === -1 && lowPriority.indexOf(key) === -1 && key.substring(0, 1) !== "_") {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }
            arrayUtil.forEach(lowPriority, function (key, idx) {
                if (skip.indexOf(key) === -1 && this.cacheColumns[key]) {
                    target.push({
                        field: key, label: key, width: this.getColumnWidth(key)
                    });
                }
            }, this);
            if (formatTime) {
                arrayUtil.forEach(target, function (column, idx) {
                    if (column.label.indexOf("Time") === 0 || column.label.indexOf("Size") === 0 || column.label.indexOf("Skew") === 0) {
                        column.formatter = function (_id, row) {
                            return row["_" + column.field] || "";
                        };
                    }
                });
            }
        };
        return GraphStore;
    }(ESPUtil_1.UndefinedMemory));
    exports.GraphStore = GraphStore;
    var GraphTreeStore = /** @class */ (function (_super) {
        tslib_1.__extends(GraphTreeStore, _super);
        //  Store API  ---
        function GraphTreeStore() {
            var _this = _super.call(this) || this;
            _this.idProperty = "id";
            return _this;
        }
        GraphTreeStore.prototype.query = function (query, options) {
            return _super.prototype.query.call(this, query, options);
        };
        GraphTreeStore.prototype.setTree = function (data) {
            this.setData([]);
            this.cacheColumns = {};
            this.walkData(data);
        };
        GraphTreeStore.prototype.walkData = function (data) {
            arrayUtil.forEach(data, function (item, idx) {
                if (item._children) {
                    item._children.sort(function (l, r) {
                        return l.id - r.id;
                    });
                    this.walkData(item._children);
                    lang.mixin(item, {
                        __hpcc_notActivity: true
                    });
                }
                this.add(item);
                for (var key in item) {
                    if (key !== "id" && key.substring(0, 1) !== "_") {
                        if (!this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                        else if (item[key].length > this.cacheColumns[key]) {
                            this.cacheColumns[key] = item[key].length;
                        }
                    }
                    if (this.isNumber(item[key])) {
                        item[key] = parseFloat(item[key]);
                    }
                }
            }, this);
        };
        //  Tree API  ---
        GraphTreeStore.prototype.mayHaveChildren = function (object) {
            return object._children;
        };
        GraphTreeStore.prototype.getChildren = function (parent, options) {
            var filter = {};
            if (options.originalQuery.__hpcc_notActivity) {
                filter = {
                    __hpcc_notActivity: true
                };
            }
            return QueryResults(this.queryEngine(filter, options)(parent._children));
        };
        return GraphTreeStore;
    }(GraphStore));
    exports.GraphTreeStore = GraphTreeStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=GraphStore.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./":
/*!*************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy?loader=dojo%2Fquery&name=css2 ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var runner = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js");
var loader = __webpack_require__(/*! dojo/query?absMid=dojo/query */ "./node_modules/dojo/query.js");
var req = __webpack_require__.dj.c();
module.exports = runner(loader, "css2", req)

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GraphWidget.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GraphWidget.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; padding: 0px; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ToolbarContentPane\" class=\"${baseClass}ToolbarContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Toolbar\" class=\"topPanel dijit dijitToolbar\" role=\"toolbar\">\n                <div data-dojo-attach-event=\"onClick:_onClickRefresh\" data-dojo-props=\"iconClass:'iconRefresh', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                <div id=\"${id}Previous\" data-dojo-attach-event=\"onClick:_onClickPrevious\" data-dojo-props=\"iconClass:'iconLeft', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Back}</div>\n                <div id=\"${id}Next\" data-dojo-attach-event=\"onClick:_onClickNext\" data-dojo-props=\"iconClass:'iconRight', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.Forward}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <select id=\"${id}ZoomDropCombo\" style=\"width: 60px\" data-dojo-props=\"placeHolder:'${i18n.Zoom}'\" data-dojo-attach-event=\"onChange:_onChangeZoom\" data-dojo-type=\"dijit.form.ComboBox\">\n                    <option selected></option>\n                    <option>${i18n.All}</option>\n                    <option>${i18n.Width}</option>\n                    <option>100%</option>\n                    <option>90%</option>\n                    <option>75%</option>\n                    <option>50%</option>\n                    <option>25%</option>\n                    <option>10%</option>\n                    <option>5%</option>\n                </select>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <span data-dojo-attach-point=\"containerNode\"></span>\n                <div id=\"${id}DepthLabel\" title=\"${i18n.DepthTooltip}\" data-dojo-props=\"iconClass:'iconDepth', showLabel:false, disabled: true\" data-dojo-type=\"dijit.form.Button\"></div>\n                <input id=\"${id}Depth\" style=\"width: 60px\" value=\"2\" title=\"${i18n.DepthTooltip}\" data-dojo-attach-event=\"onChange:_onDepthChange\" data-dojo-props=\"intermediateChanges:true, constraints:{min:0,max:1000}\" data-dojo-type=\"dijit.form.NumberSpinner\" />\n                <div id=\"${id}DistanceLabel\" title=\"${i18n.DistanceTooltip}\" data-dojo-props=\"iconClass:'iconDistance', showLabel:false, disabled: true\" data-dojo-type=\"dijit.form.Button\"></div>\n                <input id=\"${id}Distance\" style=\"width: 60px\" value=\"2\" title=\"${i18n.DistanceTooltip}\" data-dojo-attach-event=\"onChange:_onDistanceChange\" data-dojo-props=\"intermediateChanges:true, constraints:{min:0,max:1000}\" data-dojo-type=\"dijit.form.NumberSpinner\" />\n                <span id=\"${id}SyncSelectionSplitter\" data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}SyncSelection\" data-dojo-attach-event=\"onClick:_onSyncSelection\" data-dojo-props=\"iconClass:'iconSync', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.ResetViewToSelection}</div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}OptionsDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                    <span>${i18n.Options}</span>\n                    <div data-dojo-type=\"dijit.TooltipDialog\">\n                        <div id=\"${id}OptionsForm\" style=\"width: 530px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                            <div data-dojo-type=\"hpcc.TableContainer\">\n                                <input id=\"${id}showSubgraphs\" title=\"${i18n.Subgraphs}:\" name=\"subgraph\" data-dojo-type=\"dijit.form.CheckBox\" />\n                            </div>\n                            <div data-dojo-type=\"dijit.Fieldset\">\n                                <legend>${i18n.Activities}</legend>\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <input title=\"${i18n.Icon}:\" name=\"vicon\" checked data-dojo-type=\"dijit.form.CheckBox\" />\n                                    <input title=\"${i18n.Label}:\" name=\"vlabel\" value=\"%label%\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    <input title=\"${i18n.Tooltip}:\" name=\"vtooltip\" value=\"%ecl%\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    <input title=\"${i18n.HideSpills}:\" name=\"vhidespills\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                </div>\n                            </div>\n                            <div data-dojo-type=\"dijit.Fieldset\">\n                                <legend>${i18n.Edges}</legend>\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <input title=\"${i18n.Label}:\" name=\"elabel\" value=\"%label%\\n%_eclwatchCount%\\n%_eclwatchInputProgress%\\n%_eclwatchSkew%\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    <input title=\"${i18n.Tooltip}:\" name=\"etooltip\" value=\"\" style=\"width: 95%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                </div>\n                            </div>\n                            <div class=\"dijitDialogPaneActionBar\">\n                                <button type=\"submit\" data-dojo-attach-event=\"onClick:_onOptionsApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                                <button data-dojo-attach-event=\"onClick:_onOptionsReset\" data-dojo-type=\"dijit.form.Button\">${i18n.Defaults}</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"${id}GraphContentPane\" class=\"${baseClass}GraphContentPane\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);