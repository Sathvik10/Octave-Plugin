(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DynamicESDLDefinitionDetailsWidget":"./eclwatch/DynamicESDLDefinitionDetailsWidget.js",
	"hpcc/ECLSourceWidget":"./eclwatch/ECLSourceWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"dojo/text!templates/DynamicESDLDefinitionDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDefinitionDetailsWidget.html",
	"dojo/text!templates/ECLSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/ECLSourceWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[59],{

/***/ "./eclwatch/DynamicESDLDefinitionDetailsWidget.js":
/*!********************************************************!*\
  !*** ./eclwatch/DynamicESDLDefinitionDetailsWidget.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/ECLSourceWidget */ "./eclwatch/ECLSourceWidget.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),

    __webpack_require__(/*! dojo/text!../templates/DynamicESDLDefinitionDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDefinitionDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC,
    _TabContainerWidget, ECLSourceWidget, WsESDLConfig,
    template) {
        return declare("DynamicESDLDefinitionDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "DynamicESDLDefinitionDetailsWidget",
            i18n: nlsHPCC,

            //  Implementation  ---
            init: function (params) {
                var context = this;
                this.inherited(arguments);

                if (params.Id) {
                    this.widget._Summary.set("title", params.Id);
                }
                WsESDLConfig.GetESDLDefinition({
                    request: {
                        Id: params.Id
                    }
                }).then(function (response) {
                    var xml = context.formatXml(response.GetESDLDefinitionResponse.Definition.Interface);
                    context.widget._XML.init({
                        sourceMode: "xml",
                        readOnly: true
                    });
                    context.widget._XML.setText(xml);
                });
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDefinitionDetailsWidget.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DynamicESDLDefinitionDetailsWidget.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.XML}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}_XML\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"ECLSourceWidget\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n"

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