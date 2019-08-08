(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DynamicESDLDetailsWidget":"./eclwatch/DynamicESDLDetailsWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"src/WsESDLConfig":"./lib/src/WsESDLConfig.js",
	"dojo/text!templates/DynamicESDLDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[91],{

/***/ "./eclwatch/DynamicESDLDetailsWidget.js":
/*!**********************************************!*\
  !*** ./eclwatch/DynamicESDLDetailsWidget.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),

    __webpack_require__(/*! dojo/text!../templates/DynamicESDLDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDetailsWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/NumberTextBox */ "./node_modules/dijit/form/NumberTextBox.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domAttr,
    registry,
    Clippy,
    _TabContainerWidget, Utility, WsESDLConfig,
    template) {
    return declare("DynamicESDLDetailsWidget", [_TabContainerWidget], {
        templateString: template,
        baseClass: "DynamicESDLDetailsWidget",
        i18n: nlsHPCC,
        definitionWidget: null,
        definitionWidgetLoaded: false,
        configurationWidget: null,
        configurationLoaded: false,
        bound: false,
        binding: null,
        configuration: null,
        definition: null,
        definitionID: null,

        postCreate: function (args) {
            this.inherited(arguments);
            Clippy.attach(this.id + "ClippyButton");
            this.definitionWidget = registry.byId(this.id + "_Definition");
        },

        startup: function (args) {
            this.inherited(arguments);
        },

        destroy: function (args) {
            this.inherited(arguments);
        },

        getTitle: function () {
            return this.i18n.title_DESDL;
        },

        //  Implementation  ---
        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;
            if (params.Name) {
                dom.byId(context.id + "Id").textContent = params.Name;
                WsESDLConfig.GetESDLBinding({
                    request: {
                        EsdlBindingId: params.Name,
                        IncludeInterfaceDefinition: true,
                        ReportMethodsAvailable: true
                    }
                }).then(function (response) {
                    if (response.GetESDLBindingResponse.ConfigXML) {
                        context.bound = true
                        context.definition = response.GetESDLBindingResponse.ESDLBinding.Definition.Interface;
                        context.configuration = response.GetESDLBindingResponse.ESDLBinding.Configuration.Methods.Method;
                        context.definitionID = response.GetESDLBindingResponse.ESDLBinding.Definition.Id;
                        context.refreshActionState();
                    }
                    for (var key in response.GetESDLBindingResponse) {
                        context.updateInput(key, null, response.GetESDLBindingResponse[key]);
                    }
                });
            }
        },

        initTab: function () {
            var context = this;
            var currSel = this.getSelectedChild();
            if (currSel.id === this.widget._Configuration.id && !this.widget._Configuration.__hpcc_initalized) {
                this.widget._Configuration.init({
                    Binding: this.params,
                    Definition: this.definitionID
                });
            } else if (currSel.id === this.definitionWidget.id && !this.definitionWidgetLoaded) {
                this.definitionWidgetLoaded = true;
                var xml = context.formatXml(this.definition);
                this.definitionWidget.init({
                    sourceMode: "xml",
                    Usergenerated: xml
                });
            }
        },

        _onDeleteBinding: function () {
            var context = this;
            if (confirm(context.i18n.YouAreAboutToDeleteBinding)) {
                WsESDLConfig.DeleteESDLBinding({
                    request: {
                        Id: context.params.Name
                    }
                }).then(function (response) {
                    if (lang.exists("DeleteESDLRegistryEntryResponse.status.Code", response)) {
                        if (response.DeleteESDLRegistryEntryResponse.status.Code === 0) {
                            dojo.publish("hpcc/brToaster", {
                                Severity: "Message",
                                Source: "WsESDLConfig.DeleteESDLBinding",
                                Exceptions: [{
                                    Source: context.i18n.DeletedBinding,
                                    Message: response.DeleteESDLRegistryEntryResponse.status.Description
                                }]
                            });
                            context.bound = false;
                            context.refreshActionState();
                        }
                    }
                });
            }
        },

        updateInput: function (name, oldValue, newValue) {
            var registryNode = registry.byId(this.id + name);
            if (registryNode) {
                registryNode.set("value", newValue);
            } else {
                var domElem = dom.byId(this.id + name);
                if (domElem) {
                    switch (domElem.tagName) {
                        case "SPAN":
                        case "DIV":
                            dom.byId(this.id + name).textContent = newValue;
                            break;
                        case "INPUT":
                        case "TEXTAREA":
                            domAttr.set(this.id + name, "value", newValue);
                            break;
                        default:
                            alert(domElem.tagName);
                    }
                }
            }
        },

        refreshActionState: function () {
            var hasBinding = this.bound;
            registry.byId(this.id + "DeleteBinding").set("disabled", !this.bound);
            registry.byId(this.id + "_Configuration").set("disabled", !this.bound);
            registry.byId(this.id + "_Definition").set("disabled", !this.bound);
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

/***/ "./lib/src/WsESDLConfig.js":
/*!*********************************!*\
  !*** ./lib/src/WsESDLConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function ListDESDLEspBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListDESDLEspBindings", params);
    }
    exports.ListDESDLEspBindings = ListDESDLEspBindings;
    function DeleteESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLBinding", params);
    }
    exports.DeleteESDLBinding = DeleteESDLBinding;
    function GetESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLBinding", params);
    }
    exports.GetESDLBinding = GetESDLBinding;
    function ConfigureESDLBindingMethod(params) {
        return ESPRequest.send("WsESDLConfig", "ConfigureESDLBindingMethod", params);
    }
    exports.ConfigureESDLBindingMethod = ConfigureESDLBindingMethod;
    function ListESDLDefinitions(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLDefinitions", params);
    }
    exports.ListESDLDefinitions = ListESDLDefinitions;
    function GetESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLDefinition", params);
    }
    exports.GetESDLDefinition = GetESDLDefinition;
    function DeleteESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLDefinition", params);
    }
    exports.DeleteESDLDefinition = DeleteESDLDefinition;
    function PublishESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "PublishESDLBinding", params);
    }
    exports.PublishESDLBinding = PublishESDLBinding;
    //post 1.3 services
    function ListESDLBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLBindings", params);
    }
    exports.ListESDLBindings = ListESDLBindings;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsESDLConfig.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DynamicESDLDetailsWidget.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DynamicESDLDetailsWidget.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}DeleteBinding\" data-dojo-attach-event=\"onClick:_onDeleteBinding\" data-dojo-props=\"disabled: true\" data-dojo-type=\"dijit.form.Button\">${i18n.DeleteBinding}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\"\n                        data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <span id=\"${id}Id\" style=\"margin-left:20px;\" class=\"bold\">${i18n.ID}</span>\n                        <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}Id\">\n                            <img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=${i18n.CopyToClipboard}>\n                        </button>\n                    </h2>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}EspProcName\">${i18n.ESPProcessName}:</label>\n                                <div id=\"${id}EspProcName\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}ServiceName\">${i18n.ServiceName}:</label>\n                                <div id=\"${id}ServiceName\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}EspPort\">${i18n.Port}:</label>\n                                <div id=\"${id}EspPort\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Owner\">${i18n.Binding}:</label>\n                                <div id=\"${id}BindingName\"></div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_Configuration\" title=\"${i18n.title_BindingConfiguration}\" data-dojo-props=\"delayWidget: 'DynamicESDLMethodWidget', disabled: true\"\n                data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Definition\" title=\"${i18n.title_BindingDefinition}\" data-dojo-props=\"delayWidget: 'ECLSourceWidget', disabled: true\"\n                data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);