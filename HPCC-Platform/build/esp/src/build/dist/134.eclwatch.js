(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/PackageSourceWidget":"./eclwatch/PackageSourceWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"src/WsPackageMaps":"./lib/src/WsPackageMaps.js",
	"dojo/text!templates/PackageSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageSourceWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[134],{

/***/ "./eclwatch/PackageSourceWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/PackageSourceWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/layout/_LayoutWidget */ "./node_modules/dijit/layout/_LayoutWidget.js"),
    __webpack_require__(/*! dijit/_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
    __webpack_require__(/*! dijit/_WidgetsInTemplateMixin */ "./node_modules/dijit/_WidgetsInTemplateMixin.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! src/CodeMirror */ "./lib/src/CodeMirror.js"),

    __webpack_require__(/*! src/WsPackageMaps */ "./lib/src/WsPackageMaps.js"),

    __webpack_require__(/*! dojo/text!../templates/PackageSourceWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageSourceWidget.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, topic,
        _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin,
        BorderContainer, ContentPane, registry,
        CodeMirror,
        WsPackageMaps, template) {
        return declare("PackageSourceWidget", [_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            baseClass: "PackageSourceWidget",
            i18n: nlsHPCC,
            borderContainer: null,

            editor: null,
            readOnly: true,

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

            init: function (params) {
                if (this.initalized)
                    return;

                this.initalized = true;
                this.editor = CodeMirror.fromTextArea(document.getElementById(this.id + "XMLCode"), {
                    tabMode: "indent",
                    matchBrackets: true,
                    lineNumbers: true,
                    mode: this.isXmlContent ? "xml" : "ecl",
                    readOnly: this.readOnly,
                    foldGutter: this.isXmlContent ? true : false,
                    gutters: this.isXmlContent ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : ["CodeMirror-linenumbers"]
                });
                dom.byId(this.id + "XMLContent").style.backgroundColor = this.readOnly ? 0xd0d0d0 : 0xffffff;
                this.editor.setSize("100%", "100%");

                var context = this;
                if (this.isXmlContent) {
                    WsPackageMaps.getPackageMapById(params).then(function (response) {
                        if (!lang.exists("GetPackageMapByIdResponse.Info", response))
                            context.editor.setValue(i18n.NoContent);
                        else
                            context.editor.setValue(response.GetPackageMapByIdResponse.Info);
                    }, function (err) {
                        context.showErrors(err);
                    });
                }
                else {
                    WsPackageMaps.validatePackage(params).then(function (response) {
                        var responseText = context.validateResponseToText(response.ValidatePackageResponse);
                        if (responseText === '')
                            context.editor.setValue("(Empty)");
                        else
                            context.editor.setValue(responseText);
                    }, function (err) {
                        context.showErrors(err);
                    });
                }
            },

            showErrors: function (err) {
                topic.publish("hpcc/brToaster", {
                    Severity: "Error",
                    Source: err.message,
                    Exceptions: [{ Message: err.stack }]
                });
            },

            addArrayToText: function (arrayTitle, arrayItems, text) {
                if ((arrayItems.Item !== undefined) && (arrayItems.Item.length > 0)) {
                    text += arrayTitle + ":\n";
                    for (var i = 0; i < arrayItems.Item.length; i++)
                        text += "  " + arrayItems.Item[i] + "\n";
                    text += "\n";
                }
                return text;
            },

            validateResponseToText: function (response) {
                var text = "";
                if (!lang.exists("Errors", response) || (response.Errors.length < 1))
                    text += this.i18n.NoErrorFound;
                else
                    text = this.addArrayToText(this.i18n.Errors, response.Errors, text);
                if (!lang.exists("Warnings", response) || (response.Warnings.length < 1))
                    text += this.i18n.NoWarningFound;
                else
                    text = this.addArrayToText(this.i18n.Warnings, response.Warnings, text);

                text += "\n";
                text = this.addArrayToText(this.i18n.QueriesNoPackage, response.queries.Unmatched, text);
                text = this.addArrayToText(this.i18n.PackagesNoQuery, response.packages.Unmatched, text);
                text = this.addArrayToText(this.i18n.FilesNoPackage, response.files.Unmatched, text);
                return text;
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

/***/ "./lib/src/WsPackageMaps.js":
/*!**********************************!*\
  !*** ./lib/src/WsPackageMaps.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, lang, nlsHPCC, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var i18n = nlsHPCC;
    function PackageMapQuery(params) {
        return ESPRequest.send("WsPackageProcess", "ListPackages", params);
    }
    exports.PackageMapQuery = PackageMapQuery;
    function errorMessageCallback(callback, error) {
        if (callback && callback.error) {
            callback.error(error);
        }
    }
    exports.errorMessageCallback = errorMessageCallback;
    function getPackage(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackage", {
            request: {
                Target: params.target,
                Process: params.process
            }
        });
    }
    exports.getPackage = getPackage;
    function getPackageMapById(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapById", {
            request: {
                PackageMapId: params.packageMap
            }
        });
    }
    exports.getPackageMapById = getPackageMapById;
    function GetPackageMapByIdUpdated(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapById", params);
    }
    exports.GetPackageMapByIdUpdated = GetPackageMapByIdUpdated;
    function RemovePartFromPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "RemovePartFromPackageMap", params);
    }
    exports.RemovePartFromPackageMap = RemovePartFromPackageMap;
    function AddPartToPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "AddPartToPackageMap", params);
    }
    exports.AddPartToPackageMap = AddPartToPackageMap;
    function GetPartFromPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "GetPartFromPackageMap", params);
    }
    exports.GetPartFromPackageMap = GetPartFromPackageMap;
    function GetPackageMapSelectTargets(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeTargets: params.request.IncludeTargets
            }
        });
    }
    exports.GetPackageMapSelectTargets = GetPackageMapSelectTargets;
    function GetPackageMapSelectProcesses(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeProcesses: params.request.IncludeProcesses
            }
        });
    }
    exports.GetPackageMapSelectProcesses = GetPackageMapSelectProcesses;
    function GetPackageMapSelectProcessFilter(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeProcessFilters: params.request.IncludeProcessFilters
            }
        });
    }
    exports.GetPackageMapSelectProcessFilter = GetPackageMapSelectProcessFilter;
    //Not used for now. May be used later.
    function listProcessFilters(callback) {
        var context = this;
        return ESPRequest.send("WsPackageProcess", "ListProcessFilters", {
            request: {},
            load: function (response) {
                if (!lang.exists("ListProcessFiltersResponse.ProcessFilters", response))
                    callback.load(i18n.NoContent);
                else
                    callback.load(response.ListProcessFiltersResponse.ProcessFilters);
            },
            error: function (err) {
                context.errorMessageCallback(callback, err);
            }
        });
    }
    exports.listProcessFilters = listProcessFilters;
    function validatePackage(params) {
        var request = { Target: params.target };
        if (params.packageMap)
            request['PMID'] = params.packageMap;
        if (params.process)
            request['Process'] = params.process;
        if (params.content)
            request['Info'] = params.content;
        if (params.active)
            request['Active'] = params.active;
        return ESPRequest.send("WsPackageProcess", "ValidatePackage", {
            request: request
        });
    }
    exports.validatePackage = validatePackage;
    function activatePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "ActivatePackage", params);
    }
    exports.activatePackageMap = activatePackageMap;
    function deactivatePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "DeActivatePackage", params);
    }
    exports.deactivatePackageMap = deactivatePackageMap;
    function deletePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "DeletePackage", params);
    }
    exports.deletePackageMap = deletePackageMap;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsPackageMaps.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageSourceWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/PackageSourceWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; overflow: hidden\" data-dojo-props=\"splitter: false, gutters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}XMLContent\" class=\"centerPanel\" style=\"padding:0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <textarea id=\"${id}XMLCode\">${i18n.Loading}</textarea>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);