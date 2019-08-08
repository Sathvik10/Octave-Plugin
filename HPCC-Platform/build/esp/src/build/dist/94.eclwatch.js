(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/ECLPlaygroundWidget":"./eclwatch/ECLPlaygroundWidget.js",
	"hpcc/ECLSourceWidget":"./eclwatch/ECLSourceWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"dojo/text!templates/ECLPlaygroundWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundWidget.html",
	"dojo/text!templates/ECLSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[94],{

/***/ "./eclwatch/ECLPlaygroundWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/ECLPlaygroundWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/xhr */ "./node_modules/dojo/_base/xhr.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! hpcc/ECLSourceWidget */ "./eclwatch/ECLSourceWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! src/Graph7Widget */ "./lib/src/Graph7Widget.js"),
    __webpack_require__(/*! hpcc/ECLPlaygroundResultsWidget */ "./eclwatch/ECLPlaygroundResultsWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/ECLPlaygroundWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundWidget.html"),

    __webpack_require__(/*! hpcc/InfoGridWidget */ "./eclwatch/InfoGridWidget.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, xhr, dom, query,
    BorderContainer, TabContainer, ContentPane, registry,
    _Widget, EclSourceWidget, TargetSelectWidget, Graph7Widget, ResultsWidget, ESPWorkunit, ESPQuery, Utility,
    template) {
        return declare("ECLPlaygroundWidget", [_Widget], {
            templateString: template,
            baseClass: "ECLPlaygroundWidget",
            i18n: nlsHPCC,

            graphType: "Graph7Widget",
            wu: null,
            editorControl: null,
            graphControl: null,
            resultsWidget: null,
            targetSelectWidget: null,
            sampleSelectWidget: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this._initControls();
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

            //  Implementation  ---
            getTitle: function () {
                return this.i18n.title_ECLPlayground;
            },

            _initControls: function () {
                var context = this;
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.targetSelectWidget = registry.byId(this.id + "TargetSelect");

                this.stackController = registry.byId(this.id + "StackController");
                this.stackContainer = registry.byId(this.id + "StackContainer");
                this.errWarnWidget = registry.byId(this.id + "_ErrWarn");
                this.errWarnWidget.onErrorClick = function (line, col) {
                    context.editorControl.setCursor(line, col);
                };
                this.resultsWidget = registry.byId(this.id + "_Results");
                this.visualizeWidget = registry.byId(this.id + "_Visualize");
            },

            hideTitle: function () {
                var topPane = dom.byId(this.id + "TopPane");
                dojo.destroy(topPane);
                this.borderContainer.resize();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.Wuid) {
                    this.hideTitle();
                }

                this.Wuid = params.Wuid;
                this.targetSelectWidget.init(params);

                this.initEditor();
                this.editorControl.init(params);

                var context = this;
                this.initGraph();

                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    var data = this.wu.getData();
                    for (var key in data) {
                        this.updateInput(key, null, data[key]);
                    }
                    this.watchWU();
                } else {
                    this.initSamples();
                }

                this.graphControl.onDoubleClick = function (globalID, keyState) {
                    if (keyState && context.main.KeyState_Shift) {
                        context.graphControl._onSyncSelection();
                    } else {
                        context.graphControl.centerOn(globalID);
                    }
                };
            },

            initSamples: function () {
                var context = this;
                this.sampleSelectWidget = registry.byId(this.id + "SampleSelect");
                this.sampleSelectWidget.onNewSelection = function (eclText) {
                    context.resetPage();
                    context.editorControl.setText(eclText);
                };
                this.sampleSelectWidget.init({
                    ECLSamples: true,
                    Target: "default.ecl"
                });
            },

            initEditor: function () {
                this.editorControl = registry.byId(this.id + "Source");
            },

            initGraph: function () {
                var context = this;
                this.graphControl = registry.byId(this.id + "GraphControl");
                this.graphControl.init({});
                this.graphControl.onSelectionChanged = function (items) {
                    context.editorControl.clearHighlightLines();
                    for (var i = 0; i < items.length; ++i) {
                        var props = context.graphControl.getProperties(items[i]);
                        if (props.definition) {
                            var startPos = props.definition.indexOf("(");
                            var endPos = props.definition.lastIndexOf(")");
                            var pos = props.definition.slice(startPos + 1, endPos).split(",");
                            var lineNo = parseInt(pos[0], 10);
                            context.editorControl.highlightLine(lineNo);
                            context.editorControl.setCursor(lineNo, 0);
                        }
                    }
                };
            },

            getGraph: function () {
                return registry.byId(this.id + "GraphControl");
            },

            resetPage: function () {
                this.editorControl.clearErrors();
                this.editorControl.clearHighlightLines();
                this.graphControl.clear();
                this.resultsWidget.clear();
                this.updateInput("State", null, "...");

                this.stackContainer.selectChild(this.resultsWidget);
                this.errWarnWidget.set("disabled", true);
                this.resultsWidget.set("disabled", true);
                this.visualizeWidget.set("disabled", true);
            },

            watchWU: function () {
                if (this.watching) {
                    this.watching.unwatch();
                }
                var context = this;
                this.watching = this.wu.watch(function (name, oldValue, newValue) {
                    context.updateInput(name, oldValue, newValue);
                    if (name === "Exceptions" && newValue) {
                        context.stackContainer.selectChild(context.errWarnWidget);
                        context.errWarnWidget.set("disabled", false);
                        context.errWarnWidget.reset();
                        context.errWarnWidget.init({
                            Wuid: context.wu.Wuid
                        });
                    } else if (name === "Results" && newValue) {
                        context.stackContainer.selectChild(context.resultsWidget);
                        context.resultsWidget.set("disabled", false);
                        context.visualizeWidget.set("disabled", false);
                        context.visualizeWidget.reset();
                        context.visualizeWidget.init({
                            Wuid: context.wu.Wuid,
                            Sequence: 0
                        });
                    }
                });
                this.wu.monitor();
            },

            updateInput: function (name, oldValue, newValue) {
                var input = query("input[id=" + this.id + name + "]", this.summaryForm)[0];
                if (input) {
                    var dijitInput = registry.byId(this.id + name);
                    if (dijitInput) {
                        dijitInput.set("value", newValue);
                    } else {
                        input.value = newValue;
                    }
                } else {
                    var a = query("a[id=" + this.id + name + "]", this.summaryForm)[0];
                    if (a) {
                        a.textContent = newValue;
                        if (newValue === "...") {
                            a.style.visibility = "hidden"
                        } else if (this.wu && this.wu.Wuid) {
                            a.style.visibility = "visible"
                            a.href = dojoConfig.urlInfo.pathname + "?Widget=WUDetailsWidget&Wuid=" + this.wu.Wuid;
                        }
                    }
                }
                if (name === "hasCompleted") {
                    this.checkIfComplete();
                }
            },

            checkIfComplete: function () {
                var context = this;
                if (this.wu.isComplete()) {
                    this.wu.getInfo({
                        onGetWUExceptions: function (exceptions) {
                            context.displayExceptions(exceptions);
                        },
                        onGetResults: function (results) {
                            context.displayResults(results);
                        },
                        onGetGraphs: function (graphs) {
                            context.displayGraphs(graphs);
                        },
                        onAfterSend: function (workunit) {
                            context.displayAll(workunit);
                        }
                    });
                }
            },

            displayExceptions: function (exceptions) {
            },

            displayResults: function (results) {
            },

            displayGraphs: function (graphs) {
                this.graphControl.params = {
                    Wuid: this.wu.Wuid
                };
                this.graphControl.doInit(this.wu.Wuid);
            },

            displayAll: function (workunit) {
                if (lang.exists("Exceptions.ECLException", this.wu)) {
                    this.editorControl.setErrors(this.wu.Exceptions.ECLException);
                }
                this.resultsWidget.refresh({
                    Wuid: this.wu.Wuid
                });
            },

            _onSubmit: function (evt) {
                this.resetPage();

                var text = this.editorControl.getText();
                var espQuery = ESPQuery.GetFromRequestXML(this.targetSelectWidget.get("value"), text);

                if (espQuery) {
                    this.stackContainer.selectChild(this.resultsWidget);
                    this.resultsWidget.set("disabled", false);
                    this.resultsWidget.refresh({
                        QuerySetId: espQuery.QuerySetId,
                        Id: espQuery.Id,
                        RequestXml: text
                    });
                } else {
                    var context = this;
                    this.wu = ESPWorkunit.Create({
                        onCreate: function () {
                            context.wu.update({
                                QueryText: text
                            });
                            context.watchWU();
                        },
                        onUpdate: function () {
                            context.wu.submit(context.targetSelectWidget.getValue());
                        },
                        onSubmit: function () {
                        }
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/ECLSourceWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/ECLSourceWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! src/CodeMirror */ "./lib/src/CodeMirror.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),

    __webpack_require__(/*! dojo/text!../templates/ECLSourceWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html"),

    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, xhr, topic,
    BorderContainer, ContentPane, registry,
    CodeMirror,
    _Widget, ESPWorkunit,
    template) {
        return declare("ECLSourceWidget", [_Widget], {
            templateString: template,
            baseClass: "ECLSourceWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            eclSourceContentPane: null,
            wu: null,
            editor: null,
            markers: [],
            highlightLines: [],
            readOnly: false,

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
                if (this.editor) {
                    this.editor.setSize("100%", "100%");
                }
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var mode = "ecl";
                if (params.sourceMode !== undefined) {
                    mode = params.sourceMode;
                } else if (this.WUXml) {
                    mode = "xml";
                }

                if (params.readOnly !== undefined)
                    this.readOnly = params.readOnly;

                this.editor = CodeMirror.fromTextArea(document.getElementById(this.id + "EclCode"), {
                    tabMode: "indent",
                    matchBrackets: true,
                    lineNumbers: true,
                    mode: mode,
                    readOnly: this.readOnly,
                    foldGutter: mode === "xml" ? true : false,
                    gutters: mode === "xml" ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : ["CodeMirror-linenumbers"]
                });
                dom.byId(this.id + "EclContent").style.backgroundColor = this.readOnly ? 0xd0d0d0 : 0xffffff;
                this.editor.setSize("100%", "100%");

                var context = this;
                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    if (this.WUXml) {
                        this.wu.fetchXML(function (xml) {
                            context.setText(xml);
                        });
                    } else {
                        this.wu.fetchText(function (text) {
                            context.setText(text);
                        });
                    }
                } else if (lang.exists("ECL", params)) {
                    this.setText(params.ECL ? params.ECL : "");
                } else if (lang.exists("Usergenerated", params)) {
                    this.setText(params.Usergenerated);
                } else if (lang.exists("sourceURL", params)) {
                    xhr(params.sourceURL, {
                        handleAs: "text"
                    }).then(function (data) {
                        context.setText(data);
                    });
                }
            },

            clearErrors: function (errWarnings) {
                for (var i = 0; i < this.markers.length; ++i) {
                    this.markers[i].clear();
                }
                this.markers = [];
            },

            setErrors: function (errWarnings) {
                for (var i = 0; i < errWarnings.length; ++i) {
                    var line = parseInt(errWarnings[i].LineNo, 10);
                    this.markers.push(this.editor.doc.markText({
                        line: line - 1,
                        ch: 0
                    }, {
                            line: line,
                            ch: 0
                        }, {
                            className: errWarnings[i].Severity + "Line"
                        }));
                }
            },

            setCursor: function (line, col) {
                this.editor.setCursor(line - 1, col - 1);
                this.editor.focus();
            },

            clearHighlightLines: function () {
                for (var i = 0; i < this.highlightLines.length; ++i) {
                    this.highlightLines[i].clear();
                }
            },

            highlightLine: function (line) {
                this.highlightLines.push(this.editor.doc.markText({
                    line: line - 1,
                    ch: 0
                }, {
                        line: line,
                        ch: 0
                    }, {
                        className: "highlightline"
                    }));
            },

            setText: function (text) {
                try {
                    this.editor.setValue(text);
                } catch (e) {
                    topic.publish("hpcc/brToaster", {
                        Severity: "Error",
                        Source: "ECLSourceWidget.setText",
                        Exceptions: [
                            { Message: this.i18n.SetTextError },
                            { Message: e.toString ? (this.i18n.Details + ":\n" + e.toString()) : e }
                        ]
                    });
                }
            },

            setReadOnly: function (readonly) {
                this.editor.readOnly(readonly);
            },

            getText: function () {
                return this.editor.getValue();
            }

        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/CodeMirror.js":
/*!*******************************!*\
  !*** ./lib/src/CodeMirror.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! codemirror/lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! codemirror/mode/ecl/ecl */ "./node_modules/codemirror/mode/ecl/ecl.js"), __webpack_require__(/*! codemirror/mode/xml/xml */ "./node_modules/codemirror/mode/xml/xml.js"), __webpack_require__(/*! codemirror/addon/dialog/dialog */ "./node_modules/codemirror/addon/dialog/dialog.js"), __webpack_require__(/*! codemirror/addon/fold/brace-fold */ "./node_modules/codemirror/addon/fold/brace-fold.js"), __webpack_require__(/*! codemirror/addon/fold/comment-fold */ "./node_modules/codemirror/addon/fold/comment-fold.js"), __webpack_require__(/*! codemirror/addon/fold/foldcode */ "./node_modules/codemirror/addon/fold/foldcode.js"), __webpack_require__(/*! codemirror/addon/fold/foldgutter */ "./node_modules/codemirror/addon/fold/foldgutter.js"), __webpack_require__(/*! codemirror/addon/fold/indent-fold */ "./node_modules/codemirror/addon/fold/indent-fold.js"), __webpack_require__(/*! codemirror/addon/fold/xml-fold */ "./node_modules/codemirror/addon/fold/xml-fold.js"), __webpack_require__(/*! codemirror/addon/scroll/annotatescrollbar */ "./node_modules/codemirror/addon/scroll/annotatescrollbar.js"), __webpack_require__(/*! codemirror/addon/search/jump-to-line */ "./node_modules/codemirror/addon/search/jump-to-line.js"), __webpack_require__(/*! codemirror/addon/search/matchesonscrollbar */ "./node_modules/codemirror/addon/search/matchesonscrollbar.js"), __webpack_require__(/*! codemirror/addon/search/search */ "./node_modules/codemirror/addon/search/search.js"), __webpack_require__(/*! codemirror/addon/search/searchcursor */ "./node_modules/codemirror/addon/search/searchcursor.js"), __webpack_require__(/*! css!codemirror/lib/codemirror.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/lib/codemirror.css"), __webpack_require__(/*! css!codemirror/addon/dialog/dialog.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/dialog/dialog.css"), __webpack_require__(/*! css!codemirror/addon/fold/foldgutter.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/fold/foldgutter.css")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, codemirror_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    tslib_1.__exportStar(codemirror_1, exports);
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=CodeMirror.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLPlaygroundWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ECLPlaygroundWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TopPane\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <span id=\"${id}Title\" style=\"font-weight: bold; font-size: x-large\">${i18n.title_ECLPlayground}</span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n            <div style=\"float: right; display: block;\">\n                <label id=\"${id}SampleSelectLabel\" for=\"${id}SampleSelect\">${i18n.Sample}:</label>\n                <div id=\"${id}SampleSelect\" data-dojo-type=\"TargetSelectWidget\">\n                </div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            </div>\n        </div>\n        <div id=\"${id}Source\" class=\"centerPanel\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"ECLSourceWidget\">\n        </div>\n        <div id=\"${id}GraphControl\" style=\"width: 240px;\" data-dojo-props=\"minSize:120, region: 'right', splitter:true\" data-dojo-type=\"${graphType}\">\n        </div>\n        <div id=\"${id}StackContainer\" style=\"height: 240px;\" data-dojo-props=\"minSize:120, region: 'bottom', splitter:true\" data-dojo-type=\"dijit.layout.StackContainer\">\n            <div id=\"${id}_ErrWarn\" data-dojo-props=\"iconClass:'iconErrWarn', showTitle: false, disabled: true, title: '${i18n.ErrorWarnings}'\" data-dojo-type=\"InfoGridWidget\">\n            </div>\n            <div id=\"${id}_Results\" data-dojo-props=\"iconClass:'iconResult', showTitle: false, selected: true, disabled: true, title: '${i18n.Results}'\" data-dojo-type=\"ECLPlaygroundResultsWidget\">\n            </div>\n            <div id=\"${id}_Visualize\" data-dojo-props=\"iconClass:'iconChart', showTitle: false, disabled: true, title: '${i18n.Visualize}'\" data-dojo-type=\"VizWidget\">\n            </div>\n        </div>\n        <div id=\"${id}SubmitPane\" class=\"edgePanel\" data-dojo-props=\"region: 'bottom'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div style=\"display: inline-block; vertical-align: middle\">\n                <button id=\"${id}SubmitBtn\" data-dojo-attach-event=\"onClick:_onSubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                <label for=\"Target\">${i18n.Target}:</label>\n                <div id=\"${id}TargetSelect\" style=\"display: inline-block; vertical-align: middle\" data-dojo-type=\"TargetSelectWidget\">\n                </div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                <div id=\"${id}StackController\" data-dojo-props=\"containerId:'${id}StackContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n                <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            </div>\n            <div style=\"float: right; vertical-align: middle\">\n                <a id=\"${id}State\" target=\"_blank\">...</a>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ECLSourceWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}EclContent\" class=\"centerPanel\" style=\"padding:0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <textarea id=\"${id}EclCode\">...${i18n.Loading}...</textarea>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);