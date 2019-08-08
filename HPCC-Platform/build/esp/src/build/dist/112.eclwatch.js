(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/ECLSourceWidget":"./eclwatch/ECLSourceWidget.js",
	"hpcc/HexViewWidget":"./eclwatch/HexViewWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"dojo/text!templates/ECLSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html",
	"dojo/text!templates/HexViewWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HexViewWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[112],{

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

/***/ "./eclwatch/HexViewWidget.js":
/*!***********************************!*\
  !*** ./eclwatch/HexViewWidget.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),
    __webpack_require__(/*! dojo/request/iframe */ "./node_modules/dojo/request/iframe.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! hpcc/ECLSourceWidget */ "./eclwatch/ECLSourceWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/HexViewWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HexViewWidget.html"),

    __webpack_require__(/*! dijit/form/NumberSpinner */ "./node_modules/dijit/form/NumberSpinner.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Memory, Observable, iframe,
        registry,
        _Widget, ESPWorkunit, ECLSourceWidget,
        template) {
        return declare("HexViewWidget", [_Widget], {
            templateString: template,
            baseClass: "HexViewWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            widthField: null,
            hexView: null,
            wu: null,
            unknownChar: String.fromCharCode(8226),
            lineLength: 16,
            showEbcdic: false,
            bufferLength: 16 * 1024,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.widthField = registry.byId(this.id + "Width");
                this.hexView = registry.byId(this.id + "HexView");
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

            _onWidthChange: function (event) {
                if (this.lineLength !== event) {
                    this.lineLength = event;
                    this.displayHex();
                }
            },

            _onEbcdicChange: function (event) {
                if (this.showEbcdic !== event) {
                    this.showEbcdic = event;
                    this.displayHex();
                }
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.logicalFile = params.logicalFile;

                this.hexView.init({
                    sourceMode: ""
                });
                var context = this;
                this.wu = ESPWorkunit.Create({
                    onCreate: function () {
                        context.wu.update({
                            QueryText: context.getQuery()
                        });
                        context.watchWU();
                    },
                    onUpdate: function () {
                        context.wu.submit();
                    },
                    onSubmit: function () {
                    }
                });
            },

            watchWU: function () {
                if (this.watchHandle) {
                    this.watchHandle.unwatch();
                }
                var context = this;
                this.watchHandle = this.wu.watch(function (name, oldValue, newValue) {
                    switch (name) {
                        case "hasCompleted":
                            if (newValue === true) {
                                this.wu.getInfo({
                                    onGetWUExceptions: function (exceptions) {
                                        if (exceptions.length) {
                                            var msg = "";
                                            arrayUtil.forEach(exceptions, function (exception) {
                                                if (exception.Severity === "Error") {
                                                    if (msg) {
                                                        msg += "\n";
                                                    }
                                                    msg += exception.Message;
                                                }
                                            });
                                            if (msg) {
                                                dojo.publish("hpcc/brToaster", {
                                                    Severity: "Error",
                                                    Source: "HexViewWidget.remoteRead",
                                                    Exceptions: [{ Source: context.wu.Wuid, Message: msg }]
                                                });
                                            }
                                        }
                                    }
                                });
                                context.wu.fetchResults(function (results) {
                                    context.cachedResponse = "";
                                    arrayUtil.forEach(results, function (result, idx) {
                                        var store = result.getStore();
                                        var result = store.query({
                                        }, {
                                                start: 0,
                                                count: context.bufferLength
                                            }).then(function (response) {
                                                context.watchHandle.unwatch();
                                                context.cachedResponse = response;
                                                context.displayHex();
                                                context.wu.doDelete();
                                            });
                                    });
                                });
                            }
                            break;
                        case "State":
                            context.hexView.setText("..." + (context.wu.isComplete() ? context.i18n.fetchingresults : newValue) + "...");
                            break;
                    }
                });
            },

            displayHex: function () {
                var context = this;
                var formatRow = function (row, strRow, hexRow, length) {
                    if (row) {
                        for (var i = row.length; i < 4; ++i) {
                            row = "0" + row;
                        }
                        for (var i = strRow.length; i < length; ++i) {
                            strRow += context.unknownChar;
                        }
                        return row + "  " + strRow + "  " + hexRow + "\n";
                    }
                    return "";
                };

                var doc = "";
                var row = "";
                var hexRow = "";
                var strRow = "";
                var charIdx = 0;
                arrayUtil.some(this.cachedResponse, function (item, idx) {
                    if (idx >= context.lineLength * 100) {
                        return false;
                    }
                    if (idx % context.lineLength === 0) {
                        doc += formatRow(row, strRow, hexRow, context.lineLength);
                        row = "";
                        hexRow = "";
                        strRow = "";
                        charIdx = 0;
                        row = idx.toString(16);
                    }
                    if (charIdx % 8 === 0) {
                        if (hexRow)
                            hexRow += " ";
                    }
                    if (hexRow)
                        hexRow += " ";
                    hexRow += item["char"];

                    if (context.showEbcdic) {
                        strRow += context.isCharPrintable(item.estr1) ? item.estr1 : context.unknownChar;
                    } else {
                        strRow += context.isCharPrintable(item.str1) ? item.str1 : context.unknownChar;
                    }
                    ++charIdx;
                });
                doc += formatRow(row, strRow, hexRow, context.lineLength);
                this.hexView.setText(doc);
            },

            getQuery: function () {
                return "data_layout := record\n" +
                    "    data1 char;\n" +
                    "end;\n" +
                    "data_dataset := dataset('" + this.logicalFile + "', data_layout, thor);\n" +
                    "analysis_layout := record\n" +
                    "    data1 char;\n" +
                    "    string1 str1;\n" +
                    "    ebcdic string1 estr1;\n" +
                    "end;\n" +
                    "analysis_layout calcAnalysis(data_layout l) := transform\n" +
                    "    self.char := l.char;\n" +
                    "    self.str1 := transfer(l.char, string1);\n" +
                    "    self.estr1 := transfer(l.char, string1);\n" +
                    "end;\n" +
                    "analysis_dataset := project(data_dataset, calcAnalysis(left));\n" +
                    "choosen(analysis_dataset, " + this.bufferLength + ");\n";
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/ECLSourceWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}EclContent\" class=\"centerPanel\" style=\"padding:0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <textarea id=\"${id}EclCode\">...${i18n.Loading}...</textarea>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HexViewWidget.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/HexViewWidget.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"splitter: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <label class=\"Prompt\" for=\"${id}Width\">${i18n.Width}:</label>\n            <input id=\"${id}Width\" data-dojo-attach-event=\"onChange:_onWidthChange\" data-dojo-props=\"smallDelta:1, constraints:{min:1, max:32000, places:0}, intermediateChanges:true, value:16\" data-dojo-type=\"dijit.form.NumberSpinner\" />\n            <label class=\"Prompt\" for=\"${id}EBCDIC\">${i18n.EBCDIC}:</label>\n            <input id=\"${id}EBCDIC\" data-dojo-attach-event=\"onChange:_onEbcdicChange\" data-dojo-props=\"value:false\" data-dojo-type=\"dijit.form.CheckBox\" />\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}HexView\" data-dojo-props=\"region: 'center', WUXml: true\" data-dojo-type=\"ECLSourceWidget\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);