(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/PackageMapDetailsWidget":"./eclwatch/PackageMapDetailsWidget.js",
	"hpcc/PackageSourceWidget":"./eclwatch/PackageSourceWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dojo/text!templates/PackageMapDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapDetailsWidget.html",
	"dojo/text!templates/PackageSourceWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageSourceWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[130],{

/***/ "./eclwatch/PackageMapDetailsWidget.js":
/*!*********************************************!*\
  !*** ./eclwatch/PackageMapDetailsWidget.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/PackageSourceWidget */ "./eclwatch/PackageSourceWidget.js"),
    __webpack_require__(/*! hpcc/PackageMapPartsWidget */ "./eclwatch/PackageMapPartsWidget.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),
    __webpack_require__(/*! src/WsPackageMaps */ "./lib/src/WsPackageMaps.js"),

    __webpack_require__(/*! dojo/text!../templates/PackageMapDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domAttr, domClass, topic, registry,
    _TabContainerWidget, DelayLoadWidget, PackageSourceWidget, PackageMapPartsWidget, Clippy, WsPackageMaps, template) {
        return declare("PackageMapDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "PackageMapDetailsWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            tabContainer: null,
            validateWidget: null,
            validateWidgetLoaded: false,
            xmlWidget: null,
            xmlWidgetLoaded: false,
            partsWidget: null,
            partsWidgetLoaded: false,

            tabId: "",
            packageMap: "",
            target: "",
            process: "",
            active: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.tabContainer = registry.byId(this.id + "TabContainer");
                this.validateWidget = registry.byId(this.id + "Validate");
                this.xmlWidget = registry.byId(this.id + "XML");
                this.partsWidget = registry.byId(this.id + "Parts");

                var context = this;
                this.tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                    if (nval.id === context.id + "Validate" && !context.validateWidgetLoaded) {
                        context.validateWidgetLoaded = true;
                        context.validateWidget.init({
                            target: context.target,
                            process: context.process,
                            packageMap: context.packageMap
                        });
                    } else if (nval.id === context.id + "XML" && !context.xmlWidgetLoaded) {
                        context.xmlWidgetLoaded = true;
                        context.xmlWidget.init({
                            target: context.target,
                            process: context.process,
                            packageMap: context.packageMap
                        });
                    } else if (nval.id === context.id + "Parts" && !context.partsWidgetLoaded) {
                        context.partsWidgetLoaded = true;
                        context.partsWidget.init({
                            target: context.target,
                            process: context.process,
                            packageMap: context.packageMap
                        });
                    }
                });
                Clippy.attach(this.id + "ClippyButton");
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

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.tabId = params.tabId;
                this.packageMap = params.packageMap;
                this.target = params.target;
                this.process = params.process;
                this.active = params.active;
                if (params.packageMap) {
                    registry.byId(this.id + "_Summary").set("title", params.packageMap);
                    domAttr.set(this.id + "PMID", "innerHTML", params.packageMap);
                    domAttr.set(this.id + "Target", "value", params.target);
                    domAttr.set(this.id + "Process", "value", params.process);
                    if (params.active === true)
                        domClass.add(this.id + "StateIdImage", "iconRunning");
                    else
                        domClass.add(this.id + "StateIdImage", "iconArchived");
                }
                this.refreshActionState();
            },

            refreshActionState: function () {
                registry.byId(this.id + "Activate").set("disabled", this.active);
                registry.byId(this.id + "Deactivate").set("disabled", !this.active);
                domAttr.set(this.id + "StateIdImage", "title", this.active ? this.i18n.Active : this.i18n.NotActive);
            },

            showErrors: function (err) {
                topic.publish("hpcc/brToaster", {
                    Severity: "Error",
                    Source: err.message,
                    Exceptions: [{ Message: err.stack }]
                });
            },

            _onActivate: function (event) {
                var context = this;
                var packageMaps = [];
                packageMaps[0] = {
                    Target: this.target,
                    Process: this.process, Id: this.packageMap
                };

                WsPackageMaps.activatePackageMap(packageMaps).then(function (response) {
                    domClass.replace(context.id + "StateIdImage", "iconRunning");
                    context.active = true;
                    context.refreshActionState();
                    return response;
                }, function (err) {
                    context.showErrors(err);
                    return err;
                });
            },
            _onDeactivate: function (event) {
                var context = this;
                var packageMaps = [];
                packageMaps[0] = {
                    Target: this.target,
                    Process: this.process, Id: this.packageMap
                };

                WsPackageMaps.deactivatePackageMap(packageMaps).then(function (response) {
                    domClass.replace(context.id + "StateIdImage", "iconArchived");
                    context.active = false;
                    context.refreshActionState();
                    return response;
                }, function (err) {
                    context.showErrors(err);
                    return err;
                });
            },
            _onDelete: function (event) {
                if (confirm(this.i18n.DeleteThisPackage)) {
                    var context = this;
                    var packageMaps = [];
                    packageMaps[0] = {
                        Target: this.target,
                        Process: this.process, Id: this.packageMap
                    };

                    WsPackageMaps.deletePackageMap(packageMaps).then(function (response) {
                        topic.publish("packageMapDeleted", context.tabId);
                        return response;
                    }, function (err) {
                        context.showErrors(err);
                        return err;
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

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

/***/ "./lib/src/Clippy.js":
/*!***************************!*\
  !*** ./lib/src/Clippy.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js"), __webpack_require__(/*! dijit/Tooltip */ "./node_modules/dijit/Tooltip.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/mouse */ "./node_modules/dojo/mouse.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Clipboard, Tooltip, dom, mouse, on, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function attach(domID) {
        var clipboard = new Clipboard("#" + domID);
        clipboard.on("success", function (e) {
            e.clearSelection();
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.Copied, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
        clipboard.on("error", function (e) {
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.PressCtrlCToCopy, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
    }
    exports.attach = attach;
    function attachDomNode(domNode, callback) {
        var clipboard = new Clipboard(domNode, {
            text: function (trigger) { return callback(); }
        });
        clipboard.on("success", function (e) {
            Tooltip.show(nlsHPCC.Copied, domNode);
            on.once(domNode, mouse.leave, function () {
                Tooltip.hide(domNode);
            });
        });
        clipboard.on("error", function (e) {
        });
    }
    exports.attachDomNode = attachDomNode;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=Clippy.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapDetailsWidget.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/PackageMapDetailsWidget.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Summary}\", iconClass:\"iconWorkunit\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Activate\" data-dojo-attach-event=\"onClick:_onActivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Activate}</div>\n                    <div id=\"${id}Deactivate\" data-dojo-attach-event=\"onClick:_onDeactivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Deactivate}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <div id=\"${id}StateIdImage\" title=\"\" class=\"iconWorkunit\" ></div>&nbsp<span id=\"${id}PMID\" class=\"bold\">PMID</span>\n                        <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}PMID\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                    </h2>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"Target\">${i18n.Target}:</label>\n                                <div><input id=\"${id}Target\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\" disabled/></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"Process\">${i18n.ProcessFilter}:</label>\n                                <div><input id=\"${id}Process\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\" disabled/></div>\n                            </li>\n                            <!--li>\n                                <label class=\"Prompt\" for=\"Description\">Description:</label>\n                                <div><input id=\"${id}Description\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\"/></div>\n                            </li-->\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}XML\" title=\"XML\" data-dojo-props=\"isXmlContent: true\" data-dojo-type=\"PackageSourceWidget\">\n            </div>\n            <div id=\"${id}Validate\" title=\"${i18n.Validate}\" data-dojo-type=\"PackageSourceWidget\">\n            </div>\n            <div id=\"${id}Parts\" title=\"${i18n.title_PackageParts}\" data-dojo-type=\"PackageMapPartsWidget\">\n            </div>\n        </div>\n    </div>\n</div>\n"

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