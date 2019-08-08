(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/WUScopeController":"./lib/src/WUScopeController.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./lib/src/WUScopeController.js":
/*!**************************************!*\
  !*** ./lib/src/WUScopeController.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/comms */ "./node_modules/@hpcc-js/comms/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/graph */ "./node_modules/@hpcc-js/graph/dist/index.min.js"), __webpack_require__(/*! @hpcc-js/util */ "./node_modules/@hpcc-js/util/dist/index.min.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, common_1, comms_1, graph_1, util_1, Utility_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var UNKNOWN_STROKE = "darkgray";
    var UNKNOWN_FILL = "lightgray";
    var ACTIVE_STROKE = "#fea201";
    var ACTIVE_FILL = "#fed080";
    var FINISHED_STROKE = "darkgreen";
    var FINISHED_FILL = "lightgreen";
    function faCharFactory(kind) {
        switch (kind) {
            case "2": return "\uf0c7"; //  Disk Write
            case "3": return "\uf15d"; //  sort
            case "5": return "\uf0b0"; //  Filter
            case "6": return "\uf1e0"; //  Split
            case "12": return "\uf039"; //  First N
            case "15": return "\uf126"; //  Lightweight Join
            case "17": return "\uf126"; //  Lookup Join
            case "22": return "\uf1e6"; //  Pipe Output
            case "23": return "\uf078"; //  Funnel
            case "25": return "\uf0ce"; //  Inline Dataset
            case "26": return "\uf074"; //  distribute
            case "29": return "\uf005"; //  Store Internal Result
            case "36": return "\uf128"; //  If
            case "44": return "\uf0c7"; //  write csv
            case "47": return "\uf0c7"; //  write
            case "54": return "\uf013"; //  Workunit Read
            case "56": return "\uf0c7"; //  Spill
            case "59": return "\uf126"; //  Merge
            case "61": return "\uf0c7"; //  write xml
            case "82": return "\uf1c0"; //  Projected Disk Read Spill
            case "88": return "\uf1c0"; //  Projected Disk Read Spill
            case "92": return "\uf129"; //  Limted Index Read
            case "93": return "\uf129"; //  Limted Index Read
            case "99": return "\uf1c0"; //  CSV Read
            case "105": return "\uf1c0"; //  CSV Read
            case "7": return "\uf090"; //  Project
            case "9": return "\uf0e2"; //  Local Iterate
            case "16": return "\uf005"; //  Output Internal
            case "19": return "\uf074"; //  Hash Distribute
            case "21": return "\uf275"; //  Normalize
            case "35": return "\uf0c7"; //  CSV Write
            case "37": return "\uf0c7"; //  Index Write
            case "71": return "\uf1c0"; //  Disk Read Spill
            case "133": return "\uf0ce"; //  Inline Dataset
            case "148": return "\uf0ce"; //  Inline Dataset
            case "168": return "\uf275"; //  Local Denormalize
        }
        return "\uf063";
    }
    var WUScopeController = /** @class */ (function () {
        function WUScopeController() {
            this.subgraphsMap = {};
            this.rSubgraphsMap = {};
            this.verticesMap = {};
            this.rVerticesMap = {};
            this.edgesMap = {};
            this.rEdgesMap = {};
            this.kindMap = {};
            this._disabled = {};
            this._showSubgraphs = true;
            this._showIcon = true;
            this._vertexLabelTpl = "%Label%";
            this._edgeLabelTpl = "%Label%\n%NumRowsProcessed%";
            this.collapsedOnce = false;
        }
        WUScopeController.prototype.clear = function () {
            this.subgraphsMap = {};
            this.rSubgraphsMap = {};
            this.verticesMap = {};
            this.rVerticesMap = {};
            this.edgesMap = {};
            this.rEdgesMap = {};
        };
        WUScopeController.prototype.set = function (masterGraph) {
            var _this = this;
            this.graphDB = masterGraph;
            this.graphGui(this.graphDB);
            this.kindMap = {};
            this.graphDB.walk(function (item) {
                if (item instanceof util_1.Subgraph) {
                }
                else if (item instanceof util_1.Vertex) {
                    var kind = item._.attr("Kind").RawValue;
                    if (!_this.kindMap[kind]) {
                        _this.kindMap[kind] = [];
                    }
                    _this.kindMap[kind].push(item);
                }
                else if (item instanceof util_1.Edge) {
                }
            });
        };
        WUScopeController.prototype.showSubgraphs = function (_) {
            if (!arguments.length)
                return this._showSubgraphs;
            this._showSubgraphs = _;
            return this;
        };
        WUScopeController.prototype.showIcon = function (_) {
            if (!arguments.length)
                return this._showIcon;
            this._showIcon = _;
            return this;
        };
        WUScopeController.prototype.vertexLabelTpl = function (_) {
            if (!arguments.length)
                return this._vertexLabelTpl;
            this._vertexLabelTpl = _;
            return this;
        };
        WUScopeController.prototype.edgeLabelTpl = function (_) {
            if (!arguments.length)
                return this._edgeLabelTpl;
            this._edgeLabelTpl = _;
            return this;
        };
        WUScopeController.prototype.disabled = function (_) {
            var _this = this;
            if (!arguments.length) {
                var retVal = [];
                for (var key in this._disabled) {
                    if (this._disabled[key]) {
                        retVal.push(key);
                    }
                }
                return retVal;
            }
            this._disabled = {};
            _.forEach(function (kind) { return _this._disabled[kind] = true; });
            return this;
        };
        WUScopeController.prototype.splitTerm = function (term) {
            var termParts = term.toLowerCase().split(":");
            return [
                termParts.length > 1 ? termParts[0].trim() : undefined,
                termParts.length > 1 ? termParts[1].trim() : termParts[0].trim()
            ];
        };
        WUScopeController.prototype.find = function (term) {
            var _a = this.splitTerm(term), findScope = _a[0], findTerm = _a[1];
            function compare(attr) {
                if (typeof attr === "string") {
                    return attr.toLowerCase().indexOf(findTerm) >= 0;
                }
                return attr == findTerm;
            }
            function test(scopeItem) {
                var attrs = scopeItem._.rawAttrs();
                attrs["ID"] = scopeItem._.Id;
                attrs["Parent ID"] = scopeItem.parent._.Id;
                attrs["Scope"] = scopeItem._.ScopeName;
                for (var key in attrs) {
                    if (findScope === undefined || findScope === key.toLowerCase()) {
                        if (compare(attrs[key])) {
                            return true;
                        }
                    }
                }
                return false;
            }
            return this.graphDB.subgraphs.filter(test).concat(this.graphDB.vertices.filter(test), this.graphDB.edges.filter(test)).map(function (scopeItem) { return scopeItem._.Id; });
        };
        WUScopeController.prototype.graphGui = function (graphDB) {
            var _this = this;
            var retVal = {
                subgraphs: [],
                vertices: [],
                edges: [],
                hierarchy: []
            };
            graphDB.walk(function (item) {
                if (item instanceof util_1.Subgraph) {
                    var subgraph = _this.appendSubgraph(item, retVal.hierarchy, retVal.subgraphs);
                    subgraph.showMinMax(item.vertices.length > 3 || subgraph.minState() !== "normal");
                }
                else if (item instanceof util_1.Vertex) {
                    _this.appendVertex(item, retVal.hierarchy, retVal.vertices);
                }
                else if (item instanceof util_1.Edge) {
                    _this.appendEdge(item, retVal.edges);
                }
            });
            var sgColors = {};
            retVal.hierarchy.forEach(function (h) {
                var sgColor = sgColors[h.parent.id()];
                if (!sgColor) {
                    sgColor = sgColors[h.parent.id()] = {
                        sg: h.parent,
                        total: 0,
                        started: 0,
                        finished: 0
                    };
                }
                if (h.child instanceof graph_1.Vertex) {
                    sgColor.total++;
                    sgColor.started += h.child.__started ? 1 : 0;
                    sgColor.finished += h.child.__finished ? 1 : 0;
                }
            });
            for (var key in sgColors) {
                var sgColor = sgColors[key];
                if (sgColor.total === sgColor.finished) {
                    sgColor.sg.border_colorStroke(FINISHED_STROKE);
                }
                else if (sgColor.finished > 0) {
                    sgColor.sg.border_colorStroke(ACTIVE_STROKE);
                }
                else {
                    sgColor.sg.border_colorStroke(UNKNOWN_STROKE);
                }
            }
            if (!this.showSubgraphs()) {
                retVal.subgraphs = [];
            }
            if (!this.collapsedOnce && retVal.vertices.length >= 100) {
                this.collapsedOnce = true;
                retVal.subgraphs.forEach(function (sg) {
                    sg.minState("partial");
                });
            }
            return retVal;
        };
        WUScopeController.prototype.format = function (labelTpl, obj) {
            labelTpl = labelTpl.split("\\n").join("\n");
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
            return retVal.split("\n").filter(function (d) { return d.trim().length > 0; }).map(function (d) { return Utility_1.decodeHtml(d); }).join("\n");
        };
        WUScopeController.prototype.createSubgraph = function (subgraph) {
            var _this = this;
            var sg = this.subgraphsMap[subgraph._.Id];
            if (!sg) {
                sg = new graph_1.Subgraph()
                    .title(subgraph._.Id)
                    .on("minClick", function () {
                    _this.minClick(sg);
                });
                this.subgraphsMap[subgraph._.Id] = sg;
                this.rSubgraphsMap[sg.id()] = subgraph;
            }
            return sg;
        };
        WUScopeController.prototype.createVertex = function (vertex) {
            var _this = this;
            var attrs = vertex._.rawAttrs();
            attrs["ID"] = vertex._.Id;
            attrs["Parent ID"] = vertex.parent && vertex.parent._.Id;
            attrs["Scope"] = vertex._.ScopeName;
            var v = this.verticesMap[vertex._.Id];
            if (!v) {
                if (vertex._.ScopeType === "dummy") {
                    var parent_1 = this.subgraphsMap[vertex.parent._.Id];
                    v = new common_1.Icon()
                        .shape_colorFill("darkred")
                        .shape_colorStroke("darkred")
                        .image_colorFill("white")
                        .faChar("\uf067")
                        .on("click", function () {
                        parent_1.minState("normal");
                        _this.minClick(parent_1);
                    });
                }
                else {
                    v = new graph_1.Vertex()
                        .icon_shape_colorStroke(UNKNOWN_STROKE)
                        .icon_shape_colorFill(UNKNOWN_STROKE)
                        .icon_image_colorFill(common_1.Palette.textColor(UNKNOWN_STROKE))
                        .faChar(faCharFactory(attrs["Kind"]))
                        .textbox_shape_colorStroke(UNKNOWN_STROKE)
                        .textbox_shape_colorFill(UNKNOWN_FILL)
                        .textbox_text_colorFill(common_1.Palette.textColor(UNKNOWN_FILL));
                    var annotations = [];
                    if (vertex._.hasAttr("Definition")) {
                        annotations.push({
                            faChar: "\uf036",
                            tooltip: "Definition",
                            shape_colorFill: UNKNOWN_FILL,
                            shape_colorStroke: UNKNOWN_FILL,
                            image_colorFill: common_1.Palette.textColor(UNKNOWN_FILL)
                        });
                    }
                    if (vertex._.hasAttr("IsInternal")) {
                        annotations.push({
                            faChar: "\uf085",
                            tooltip: "IsInternal",
                            shape_colorFill: "red",
                            shape_colorStroke: "red",
                            image_colorFill: common_1.Palette.textColor("red")
                        });
                    }
                    v.annotationIcons(annotations);
                }
                this.verticesMap[vertex._.Id] = v;
                this.rVerticesMap[v.id()] = vertex;
            }
            if (v instanceof graph_1.Vertex) {
                var label = this.format(this.vertexLabelTpl(), attrs);
                v
                    .icon_diameter(this.showIcon() ? 24 : 0)
                    .text(label);
            }
            return v;
        };
        WUScopeController.prototype.isSpill = function (edge) {
            var sourceKind = edge.source._.attr("Kind").RawValue;
            var targetKind = edge.target._.attr("Kind").RawValue;
            return sourceKind === "2" || targetKind === "71";
        };
        WUScopeController.prototype.spansSubgraph = function (edge) {
            return edge.source.parent._.Id !== edge.target.parent._.Id;
        };
        WUScopeController.prototype.createEdge = function (edge) {
            var attrs = edge._.rawAttrs();
            attrs["ID"] = edge._.Id;
            attrs["Parent ID"] = edge.parent && edge.parent._.Id;
            attrs["Scope"] = edge._.ScopeName;
            var e = this.edgesMap[edge._.Id];
            if (!e) {
                var sourceV = this.verticesMap[edge.source._.Id];
                var targetV = this.verticesMap[edge.target._.Id];
                if (sourceV && targetV) {
                    var isSpill = this.isSpill(edge);
                    var spansSubgraph = this.spansSubgraph(edge);
                    var strokeDasharray = null;
                    var weight = 100;
                    if (attrs["IsDependency"]) {
                        weight = 10;
                        strokeDasharray = "1,2";
                    }
                    else if (attrs["_childGraph"]) {
                        strokeDasharray = "5,5";
                    }
                    else if (isSpill) {
                        weight = 25;
                        strokeDasharray = "5,5,10,5";
                    }
                    else if (spansSubgraph) {
                        weight = 5;
                        strokeDasharray = "5,5";
                    }
                    e = new graph_1.Edge()
                        .sourceVertex(sourceV)
                        .targetVertex(targetV)
                        .sourceMarker("circle")
                        .targetMarker("arrow")
                        .weight(weight)
                        .strokeDasharray(strokeDasharray);
                    this.edgesMap[edge._.Id] = e;
                    this.rEdgesMap[e.id()] = edge;
                }
            }
            if (e instanceof graph_1.Edge) {
                var label = this.format(this.edgeLabelTpl(), attrs);
                e.text(label);
            }
            return e;
        };
        WUScopeController.prototype.appendSubgraph = function (subgraph, hierarchy, subgraphs) {
            var sg = this.createSubgraph(subgraph);
            subgraphs.push(sg);
            var parent = this.subgraphsMap[subgraph.parent._.Id];
            if (parent) {
                hierarchy.push({ parent: parent, child: sg });
            }
            return sg;
        };
        WUScopeController.prototype.appendVertex = function (vertex, hierarchy, vertices) {
            var v = this.createVertex(vertex);
            vertices.push(v);
            var parent = this.subgraphsMap[vertex.parent._.Id];
            if (parent) {
                hierarchy.push({ parent: parent, child: v });
            }
            return v;
        };
        WUScopeController.prototype.appendEdge = function (edge, edges) {
            var e = this.createEdge(edge);
            if (e) {
                var attrs = edge._.rawAttrs();
                var numSlaves = parseInt(attrs["NumSlaves"]);
                var numStarts = parseInt(attrs["NumStarts"]);
                var numStops = parseInt(attrs["NumStops"]);
                if (!isNaN(numSlaves) && !isNaN(numStarts) && !isNaN(numStops)) {
                    var started_1 = numStarts > 0;
                    var finished_1 = numStops === numSlaves;
                    var active_1 = started_1 && !finished_1;
                    var strokeColor_1 = active_1 ? ACTIVE_STROKE : finished_1 ? FINISHED_STROKE : UNKNOWN_STROKE;
                    var lightColor_1 = active_1 ? ACTIVE_FILL : finished_1 ? FINISHED_FILL : UNKNOWN_FILL;
                    e.strokeColor(strokeColor_1);
                    var vInOut = [e.sourceVertex(), e.targetVertex()];
                    vInOut.forEach(function (v) {
                        if (v instanceof graph_1.Vertex) {
                            v["__started"] = started_1;
                            v["__finished"] = finished_1;
                            v["__active"] = active_1;
                            v
                                .icon_shape_colorStroke(strokeColor_1)
                                .icon_shape_colorFill(strokeColor_1)
                                .icon_image_colorFill(common_1.Palette.textColor(strokeColor_1))
                                .textbox_shape_colorStroke(strokeColor_1)
                                .textbox_shape_colorFill(lightColor_1)
                                .textbox_text_colorFill(common_1.Palette.textColor(lightColor_1));
                        }
                    });
                }
                edges.push(e);
            }
            return e;
        };
        WUScopeController.prototype.filterLegend = function (graphDB) {
            var _loop_1 = function (i) {
                var vertex = graphDB.vertices[i];
                var kind = vertex._.attr("Kind").RawValue;
                if (this_1._disabled[kind]) {
                    vertex.remove(false, function (source, target) {
                        return new comms_1.BaseScope({
                            ScopeName: vertex._.ScopeName + ":in",
                            Id: source.Id + "->" + target.Id,
                            ScopeType: "dummy-edge",
                            Properties: {
                                Property: [vertex._.attr("Label")]
                            }
                        });
                    });
                }
            };
            var this_1 = this;
            for (var i = graphDB.vertices.length - 1; i >= 0; --i) {
                _loop_1(i);
            }
        };
        WUScopeController.prototype.filterPartial = function (graphDB) {
            for (var _i = 0, _a = graphDB.subgraphs; _i < _a.length; _i++) {
                var subgraph = _a[_i];
                var sg = this.subgraphsMap[subgraph._.Id];
                switch (sg.minState()) {
                    case "partial":
                        var childVertices = subgraph.vertices;
                        var vShow = [];
                        var vHide = [];
                        for (var _b = 0, childVertices_1 = childVertices; _b < childVertices_1.length; _b++) {
                            var vertex = childVertices_1[_b];
                            if (vertex.inEdges.length === 0 || vertex.inEdges.some(function (edge) { return edge.source.parent !== edge.target.parent; }) ||
                                vertex.outEdges.length === 0 || vertex.outEdges.some(function (edge) { return edge.source.parent !== edge.target.parent; })) {
                                vShow.push(vertex);
                            }
                            else {
                                vHide.push(vertex);
                            }
                        }
                        if (vHide.length > 1) {
                            var dummyDetails = {
                                ScopeName: subgraph._.ScopeName,
                                Id: subgraph._.Id + ":dummy",
                                ScopeType: "dummy",
                                Properties: {
                                    Property: [{
                                            Name: "Activities",
                                            RawValue: "" + vHide.length,
                                            Formatted: "" + vHide.length,
                                            Measure: "count",
                                            Creator: "",
                                            CreatorType: ""
                                        }]
                                }
                            };
                            var dummyScope = new comms_1.BaseScope(dummyDetails);
                            var dummyVertex = subgraph.createVertex(dummyScope);
                            for (var _c = 0, vHide_1 = vHide; _c < vHide_1.length; _c++) {
                                var vertex = vHide_1[_c];
                                for (var _d = 0, _e = vertex.inEdges; _d < _e.length; _d++) {
                                    var edge = _e[_d];
                                    if (vShow.indexOf(edge.source) >= 0) {
                                        var dummyEdgeScope = new comms_1.BaseScope({
                                            ScopeName: edge.source._.ScopeName,
                                            Id: edge.source._.Id + "->" + dummyVertex._.Id,
                                            ScopeType: "dummy-in",
                                            Properties: {
                                                Property: []
                                            }
                                        });
                                        console.log(dummyEdgeScope.Id);
                                        subgraph.createEdge(edge.source, dummyVertex, dummyEdgeScope);
                                    }
                                }
                                for (var _f = 0, _g = vertex.outEdges; _f < _g.length; _f++) {
                                    var edge = _g[_f];
                                    if (vShow.indexOf(edge.target) >= 0) {
                                        var dummyEdgeScope = new comms_1.BaseScope({
                                            ScopeName: edge.target._.ScopeName,
                                            Id: dummyVertex._.Id + "->" + edge.target._.Id,
                                            ScopeType: "dummy-out",
                                            Properties: {
                                                Property: []
                                            }
                                        });
                                        console.log(dummyEdgeScope.Id);
                                        subgraph.createEdge(dummyVertex, edge.target, dummyEdgeScope);
                                    }
                                }
                            }
                            vHide.forEach(function (vertex) { return vertex.remove(true); });
                        }
                        break;
                }
            }
        };
        WUScopeController.prototype.filterEmptySubgraphs = function (graphDB) {
            while (true) {
                var emptySubgraphs = graphDB.subgraphs.filter(function (subgraph) { return subgraph.subgraphs.length === 0 && subgraph.vertices.length === 0; });
                if (emptySubgraphs.length === 0)
                    break;
                emptySubgraphs.forEach(function (subgraph) { return subgraph.remove(true); });
            }
        };
        WUScopeController.prototype.removeObsoleteSubgraphs = function (graphDB) {
            for (var _i = 0, _a = graphDB.subgraphs.slice(); _i < _a.length; _i++) {
                var subgraph = _a[_i];
                if (subgraph.vertices.length === 0) {
                    subgraph.remove(false);
                }
            }
        };
        WUScopeController.prototype.graphData = function () {
            var graphDB = this.graphDB.clone();
            this.filterLegend(graphDB);
            this.filterPartial(graphDB);
            this.filterEmptySubgraphs(graphDB);
            this.removeObsoleteSubgraphs(graphDB);
            return this.graphGui(graphDB);
        };
        WUScopeController.prototype.calcLegend = function () {
            var retVal = [];
            for (var kind in this.kindMap) {
                retVal.push({
                    kind: parseInt(kind),
                    faChar: faCharFactory(kind),
                    label: this.kindMap[kind][0]._.attr("Label").RawValue.split("\n")[0],
                    count: this.kindMap[kind].length
                });
            }
            return retVal;
        };
        WUScopeController.prototype.subgraphs = function (_) {
            var retVal = [];
            for (var _i = 0, _1 = _; _i < _1.length; _i++) {
                var id = _1[_i];
                if (this.subgraphsMap[id]) {
                    retVal.push(this.subgraphsMap[id]);
                }
            }
            return retVal;
        };
        WUScopeController.prototype.rSubgraphs = function (_) {
            var retVal = [];
            for (var _i = 0, _2 = _; _i < _2.length; _i++) {
                var sg = _2[_i];
                if (this.rSubgraphsMap[sg.id()]) {
                    retVal.push(this.rSubgraphsMap[sg.id()]);
                }
            }
            return retVal;
        };
        WUScopeController.prototype.vertices = function (_) {
            var retVal = [];
            if (typeof _ === "number") {
                for (var _i = 0, _a = this.kindMap[_]; _i < _a.length; _i++) {
                    var v = _a[_i];
                    retVal.push(this.verticesMap[v._.Id]);
                }
            }
            else {
                for (var _b = 0, _3 = _; _b < _3.length; _b++) {
                    var id = _3[_b];
                    if (this.verticesMap[id]) {
                        retVal.push(this.verticesMap[id]);
                    }
                }
            }
            return retVal;
        };
        WUScopeController.prototype.rVertices = function (_) {
            var retVal = [];
            for (var _i = 0, _4 = _; _i < _4.length; _i++) {
                var v = _4[_i];
                if (this.rVerticesMap[v.id()]) {
                    retVal.push(this.rVerticesMap[v.id()]);
                }
            }
            return retVal;
        };
        WUScopeController.prototype.edges = function (_) {
            var retVal = [];
            for (var _i = 0, _5 = _; _i < _5.length; _i++) {
                var id = _5[_i];
                if (this.edgesMap[id]) {
                    retVal.push(this.edgesMap[id]);
                }
            }
            return retVal;
        };
        WUScopeController.prototype.rEdges = function (_) {
            var retVal = [];
            for (var _i = 0, _6 = _; _i < _6.length; _i++) {
                var e = _6[_i];
                if (this.rEdgesMap[e.id()]) {
                    retVal.push(this.rEdgesMap[e.id()]);
                }
            }
            return retVal;
        };
        WUScopeController.prototype.scopeItem = function (_) {
            var widget = this.item(_);
            return widget ? this.rItem(widget) : undefined;
        };
        WUScopeController.prototype.item = function (_) {
            return this.subgraphsMap[_] || this.verticesMap[_] || this.edgesMap[_];
        };
        WUScopeController.prototype.rItem = function (_) {
            return this.rSubgraphsMap[_.id()] || this.rVerticesMap[_.id()] || this.rEdgesMap[_.id()];
        };
        WUScopeController.prototype.items = function (_) {
            return this.subgraphs(_).concat(this.vertices(_), this.edges(_));
        };
        WUScopeController.prototype.rItems = function (_) {
            return this.rSubgraphs(_).concat(this.rVertices(_), this.rEdges(_));
        };
        WUScopeController.prototype.formatStoreRow = function (item) {
            var retVal = item._.rawAttrs();
            retVal["Id"] = item._.Id;
            for (var key in retVal) {
                //  TODO Move into BaseScope  ---
                retVal[key] = Utility_1.decodeHtml(retVal[key]);
            }
            retVal.__formatted = item._.formattedAttrs();
            return retVal;
        };
        WUScopeController.prototype.formatRow = function (item, columns, row) {
            var attrs = item._.formattedAttrs();
            for (var key in attrs) {
                var idx = columns.indexOf(key);
                if (idx === -1) {
                    columns.push(key);
                    row.push(attrs[key]);
                }
                else {
                    row[idx] = attrs[key];
                }
            }
            for (var i = 0; i < 100; ++i) {
                if (row[i] === undefined) {
                    row[i] = "";
                }
            }
            return row;
        };
        WUScopeController.prototype.subgraphStoreData = function () {
            var _this = this;
            return this.graphDB.subgraphs.map(function (sg) {
                return _this.formatStoreRow(sg);
            });
        };
        WUScopeController.prototype.subgraphData = function () {
            var _this = this;
            var columns = ["Id", "Label"];
            var data = this.graphDB.subgraphs.map(function (sg) {
                var row = [sg._.Id];
                return _this.formatRow(sg, columns, row);
            });
            return { columns: columns, data: data };
        };
        WUScopeController.prototype.activityStoreData = function () {
            var _this = this;
            return this.graphDB.vertices.map(function (v) {
                return _this.formatStoreRow(v);
            });
        };
        WUScopeController.prototype.activityData = function () {
            var _this = this;
            var columns = ["Id", "Kind", "Label"];
            var data = this.graphDB.vertices.map(function (v) {
                var row = [parseInt(v._.Id.split("a")[1])];
                return _this.formatRow(v, columns, row);
            });
            return { columns: columns, data: data };
        };
        WUScopeController.prototype.edgeStoreData = function () {
            var _this = this;
            return this.graphDB.edges.map(function (e) {
                return _this.formatStoreRow(e);
            });
        };
        WUScopeController.prototype.edgeData = function () {
            var _this = this;
            var columns = ["Id", "Label"];
            var data = this.graphDB.edges.map(function (e) {
                var row = [e._.Id];
                return _this.formatRow(e, columns, row);
            });
            return { columns: columns, data: data };
        };
        WUScopeController.prototype.treeData = function () {
            // TODO  ---
            return this.subgraphData();
        };
        WUScopeController.prototype.calcTooltip = function (scope, parentScope, term) {
            if (term === void 0) { term = ""; }
            var _a = this.splitTerm(term), findScope = _a[0], findTerm = _a[1];
            function highlightText(key, _text) {
                if (!findTerm)
                    return _text;
                var text = "" + _text;
                if (findScope && findScope !== key.toLowerCase())
                    return _text;
                var found = text.toLowerCase().indexOf(findTerm.toLowerCase());
                if (found >= 0) {
                    return text.substring(0, found) + "<span style='background:#fff2a8'>" + text.substring(found, found + findTerm.length) + "</span>" + text.substring(found + findTerm.length);
                }
                return _text;
            }
            var label = "";
            var rows = [];
            label = scope.Id;
            rows.push("<tr><td class=\"key\">ID:</td><td class=\"value\">" + highlightText("ID", scope.Id) + "</td></tr>");
            if (parentScope) {
                rows.push("<tr><td class=\"key\">Parent ID:</td><td class=\"value\">" + highlightText("Parent ID", parentScope.Id) + "</td></tr>");
            }
            rows.push("<tr><td class=\"key\">Scope:</td><td class=\"value\">" + highlightText("Scope", scope.ScopeName) + "</td></tr>");
            var attrs = scope.formattedAttrs();
            for (var key in attrs) {
                if (key === "Label") {
                    label = attrs[key];
                }
                else {
                    rows.push("<tr><td class=\"key\">" + key + "</td><td class=\"value\">" + highlightText(key, attrs[key]) + "</td></tr>");
                }
            }
            return "<div class=\"eclwatch_WUGraph_Tooltip\" style=\"max-width:480px\">\n            <h4 align=\"center\">" + highlightText("Label", label) + "</h4>\n            <table>\n                " + rows.join("") + "\n            </table>\n        </div>";
        };
        WUScopeController.prototype.calcGraphTooltip = function (id, findText) {
            var item = this.scopeItem(id);
            if (item) {
                var scope = item._;
                var parentScope = item.parent._;
                if (scope) {
                    return this.calcTooltip(scope, parentScope, findText);
                }
            }
            return "";
        };
        WUScopeController.prototype.calcGraphTooltip2 = function (item) {
            var scope;
            var parentScope;
            if (item instanceof graph_1.Subgraph) {
                var subgraph = this.rSubgraphsMap[item.id()];
                scope = subgraph._;
                parentScope = subgraph.parent._;
            }
            else if (item instanceof graph_1.Vertex || item instanceof common_1.Icon) {
                var vertex = this.rVerticesMap[item.id()];
                scope = vertex._;
                parentScope = vertex.parent._;
            }
            else if (item instanceof graph_1.Edge) {
                var edge = this.rEdgesMap[item.id()];
                scope = edge._;
                parentScope = edge.parent._;
            }
            if (scope) {
                return this.calcTooltip(scope, parentScope);
            }
            return "";
        };
        WUScopeController.prototype.subgraph = function (id) {
            return this.subgraphsMap[id];
        };
        WUScopeController.prototype.vertex = function (id) {
            return this.verticesMap[id];
        };
        WUScopeController.prototype.edge = function (id) {
            return this.edgesMap[id];
        };
        //  Events  ---
        WUScopeController.prototype.minClick = function (sg) {
        };
        return WUScopeController;
    }());
    exports.WUScopeController = WUScopeController;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WUScopeController.js.map

/***/ })

}]);