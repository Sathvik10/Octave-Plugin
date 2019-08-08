(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DFUWUDetailsWidget":"./eclwatch/DFUWUDetailsWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dojo/text!templates/DFUWUDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUWUDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[84],{

/***/ "./eclwatch/DFUWUDetailsWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/DFUWUDetailsWidget.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    exports,
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/ProgressBar */ "./node_modules/dijit/ProgressBar.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! src/ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/DFUWUDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUWUDetailsWidget.html"),

    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports, declare, lang, i18n, nlsHPCC, arrayUtil, dom, domAttr, domClass, domStyle, query,
    BorderContainer, TabContainer, ContentPane, Toolbar, Textarea, TitlePane, registry, ProgressBar,
    _TabContainerWidget, Clippy, FileSpray, ESPDFUWorkunit, DelayLoadWidget,
    template) {
        exports.fixCircularDependency = declare("DFUWUDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "DFUWUDetailsWidget",
            i18n: nlsHPCC,

            summaryWidget: null,
            xmlWidget: null,

            wu: null,
            loaded: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.xmlWidget = registry.byId(this.id + "_XML");
                var stateOptions = [];
                for (var key in FileSpray.States) {
                    stateOptions.push({
                        label: FileSpray.States[key],
                        value: FileSpray.States[key]
                    });
                }
                var stateSelect = registry.byId(this.id + "StateMessage");
                stateSelect.addOption(stateOptions);

                Clippy.attach(this.id + "ClippyButton");
            },

            getTitle: function () {
                return this.i18n.title_DFUWUDetails;
            },

            //  Hitched actions  ---
            _onAutoRefresh: function (event) {
                this.wu.disableMonitor(!this.widget.AutoRefresh.get("checked"));
            },
            _onRefresh: function (event) {
                this.wu.refresh(true);
            },
            _onSave: function (event) {
                var protectedCheckbox = registry.byId(this.id + "isProtected");
                var context = this;
                this.wu.update({
                    JobName: dom.byId(context.id + "JobName").value,
                    isProtected: protectedCheckbox.get("value")
                }, null);
            },
            _onDelete: function (event) {
                if (confirm(this.i18n.YouAreAboutToDeleteThisWorkunit)) {
                    this.wu.doDelete();
                }
            },
            _onAbort: function (event) {
                this.wu.abort();
            },
            _onResubmit: function (event) {
                //TODO once HPCC-15504
            },
            _onModify: function (event) {
                //TODO once HPCC-15504
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                //dom.byId("showWuid").innerHTML = params.Wuid;
                if (params.Wuid) {
                    this.summaryWidget.set("title", params.Wuid);

                    dom.byId(this.id + "Wuid").textContent = params.Wuid;

                    this.clearInput();
                    this.wu = ESPDFUWorkunit.Get(params.Wuid);
                    var data = this.wu.getData();
                    for (var key in data) {
                        this.updateInput(key, null, data[key]);
                    }
                    var context = this;
                    this.wu.watch(function (name, oldValue, newValue) {
                        context.updateInput(name, oldValue, newValue);
                    });
                    this.wu.refresh();
                }
            },

            initTab: function () {
                if (!this.wu) {
                    return
                }

                var currSel = this.getSelectedChild();
                if (!currSel.initalized) {
                    if (currSel.id === this.summaryWidget.id) {
                    } else if (currSel.id === this.xmlWidget.id) {
                        var context = this;
                        this.wu.fetchXML(function (response) {
                            context.xmlWidget.init({
                                ECL: response
                            });
                        });
                    } else {
                        currSel.init(currSel._hpccParams);
                    }
                }
            },

            objectToText: function (obj) {
                var text = ""
                for (var key in obj) {
                    text += "<tr><td>" + key + ":</td>";
                    if (typeof obj[key] === "object") {
                        text += "[<br/>";
                        for (var i = 0; i < obj[key].length; ++i) {
                            text += this.objectToText(obj[key][i]);
                        }
                        text += "<br/>]<br/>";
                    } else {
                        text += "<td>" + obj[key] + "</td></tr>";

                    }
                }
                return text;
            },

            resetPage: function () {
            },

            getAncestor: function (node, type) {
                if (node) {
                    if (node.tagName === type) {
                        return node;
                    }
                    return this.getAncestor(node.parentNode, type);
                }
                return null;
            },

            setTextContent: function (id, value) {
                var domNode = dom.byId(this.id + id);
                var pNode = this.getAncestor(domNode, "LI");
                if (typeof value !== 'undefined') {
                    if (pNode) {
                        domClass.remove(pNode, "hidden");
                    }
                    domNode.textContent = value;
                } else {
                    if (pNode) {
                        domClass.add(pNode, "hidden");
                    }
                }
            },

            setValue: function (id, value) {
                var domNode = dom.byId(this.id + id);
                var pNode = this.getAncestor(domNode, "LI");
                if (typeof value !== 'undefined') {
                    if (pNode) {
                        domClass.remove(pNode, "hidden");
                    }
                    var registryNode = registry.byId(this.id + id);
                    if (registryNode) {
                        registryNode.set("value", value);
                    } else {
                        domNode.value = value;
                    }
                } else {
                    if (pNode) {
                        domClass.add(pNode, "hidden");
                    }
                }
            },

            clearInput: function () {
                var list = query("div#" + this.id + "_Summary form > ul > li");
                arrayUtil.forEach(list, function (item, idx) {
                    domClass.add(item, "hidden");
                });
            },

            updateInput: function (name, oldValue, newValue) {
                var registryNode = registry.byId(this.id + name);
                if (registryNode) {
                    this.setValue(name, newValue);
                } else {
                    var domNode = dom.byId(this.id + name);
                    if (domNode) {
                        switch (domNode.tagName) {
                            case "SPAN":
                            case "DIV":
                                this.setTextContent(name, newValue);
                                break;
                            case "INPUT":
                            case "TEXTAREA":
                                this.setValue(name, newValue);
                                break;
                            default:
                                alert(domNode.tagName + ":" + name);
                        }
                    }
                }
                switch (name) {
                    case "CommandMessage":
                        this.setTextContent("CommandMessage2", newValue);
                        break;
                    case "isProtected":
                        dom.byId(this.id + "ProtectedImage").src = this.wu.getProtectedImage();
                        break;
                    case "State":
                    case "hasCompleted":
                        this.refreshActionState();
                        break;
                    case "__hpcc_changedCount":
                        if (this.wu.SourceLogicalName) {
                            this.ensurePane("SourceLogicalName", this.i18n.Source, {
                                NodeGroup: this.wu.SourceGroupName,
                                Name: this.wu.SourceLogicalName
                            });
                        }
                        if (this.wu.DestLogicalName) {
                            this.ensurePane("DestLogicalName", this.i18n.Target, {
                                NodeGroup: this.wu.DestGroupName,
                                Name: this.wu.DestLogicalName
                            });
                        }
                        break;
                }
            },

            refreshActionState: function () {
                this.setDisabled(this.id + "AutoRefresh", this.wu.isComplete(), "iconAutoRefresh", "iconAutoRefreshDisabled");
                registry.byId(this.id + "Save").set("disabled", false);
                registry.byId(this.id + "Delete").set("disabled", !this.wu.isComplete() || this.wu.isDeleted());
                registry.byId(this.id + "Abort").set("disabled", this.wu.isComplete() || this.wu.isDeleted());
                //registry.byId(this.id + "Resubmit").set("disabled", !this.wu.isComplete() || this.wu.isDeleted()); //TODO
                //registry.byId(this.id + "Modify").set("disabled", true);  //TODO
                registry.byId(this.id + "JobName").set("readOnly", false);
                registry.byId(this.id + "isProtected").set("readOnly", !this.wu.isComplete() || this.wu.isDeleted());

                this.summaryWidget.set("iconClass", this.wu.getStateIconClass());
                dom.byId(this.id + "StateIdImage").src = this.wu.getStateImage();
            },

            checkIfComplete: function () {
            },

            monitorWorkunit: function (response) {
            },

            ensurePane: function (id, title, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: title,
                        closable: false,
                        delayWidget: "LFDetailsWidget",
                        _hpccParams: params
                    });
                    this.addChild(retVal);
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUWUDetailsWidget.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DFUWUDetailsWidget.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Summary}\", iconClass:\"iconWorkunit\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}AutoRefresh\" data-dojo-attach-event=\"onClick:_onAutoRefresh\" data-dojo-props=\"iconClass:'iconAutoRefresh', showLabel:false\" checked=true data-dojo-type=\"dijit.form.ToggleButton\">${i18n.AutoRefresh}</div>\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Save\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Abort\" data-dojo-attach-event=\"onClick:_onAbort\" data-dojo-type=\"dijit.form.Button\">${i18n.Abort}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                        <h2>\n                            <img id=\"${id}ProtectedImage\" src=\"${dojoConfig.urlInfo.resourcePath}/img/locked.png\" />&nbsp;<img id=\"${id}StateIdImage\" src=\"${dojoConfig.urlInfo.resourcePath}/img/workunit.png\" />&nbsp<span id=\"${id}Wuid\" class=\"bold\">WUID</span>&nbsp<span id=\"${id}CommandMessage2\" class=\"bold\">${i18n.Command}</span>\n                            <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}Wuid\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                        </h2>\n                        <form>\n                            <ul>\n                                <li>\n                                    <label for=\"${id}ID\">${i18n.ID}:</label>\n                                    <div id=\"${id}ID\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}ClusterName\">${i18n.ClusterName}:</label>\n                                    <div id=\"${id}ClusterName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}JobName\">${i18n.JobName}:</label>\n                                    <input id=\"${id}JobName\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                </li>\n                                <li>\n                                    <label for=\"${id}DFUServerName\">${i18n.DFUServerName}:</label>\n                                    <div id=\"${id}DFUServerName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}Queue\">${i18n.Queue}:</label>\n                                    <div id=\"${id}Queue\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}User\">${i18n.User}:</label>\n                                    <div id=\"${id}User\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"isProtected\">${i18n.Protected}:</label>\n                                    <input id=\"${id}isProtected\" value=true data-dojo-type=\"dijit.form.CheckBox\" />\n                                </li>\n                                <li>\n                                    <label for=\"${id}CommandMessage\">${i18n.Command}:</label>\n                                    <div id=\"${id}CommandMessage\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}StateMessage\">${i18n.State}:</label>\n                                    <select id=\"${id}StateMessage\" name=\"SelectType\" data-dojo-type=\"dijit.form.Select\">\n                                    </select>\n                                </li>\n                                <li>\n                                    <label for=\"${id}TimeStarted\">${i18n.TimeStarted}:</label>\n                                    <div id=\"${id}TimeStarted\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}TimeStopped\">${i18n.TimeStopped}:</label>\n                                    <div id=\"${id}TimeStopped\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}PercentDone\">${i18n.PercentDone}:</label>\n                                    <div id=\"${id}PercentDone\" style=\"width: 190px\" data-dojo-props=\"maximum:100\" data-dojo-type=\"dijit.ProgressBar\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}ProgressMessage\">${i18n.ProgressMessage}:</label>\n                                    <div id=\"${id}ProgressMessage\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SecsLeft\">${i18n.SecondsRemaining}:</label>\n                                    <div id=\"${id}SecsLeft\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"Summary Message\">${i18n.SummaryMessage}:</label>\n                                    <div id=\"${id}SummaryMessage\"></div>\n                                </li>\n                            </ul>\n                        </form>\n                    <hr class=\"dashedLine\">\n                        <form>\n                            <h1>Source</h1>\n                            <ul>\n                                <li>\n                                    <label for=\"${id}SourceIP\">${i18n.IP}:</label>\n                                    <div id=\"${id}SourceIP\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceDirectory\">${i18n.Directory}:</label>\n                                    <div id=\"${id}SourceDirectory\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceFilePath\">${i18n.FilePath}:</label>\n                                    <div id=\"${id}SourceFilePath\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceLogicalName\">${i18n.LogicalName}:</label>\n                                    <div id=\"${id}SourceLogicalName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceNumParts\">${i18n.NumberofParts}:</label>\n                                    <div id=\"${id}SourceNumParts\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceDali\">${i18n.Dali}:</label>\n                                    <div id=\"${id}SourceDali\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceFormatMessage\">${i18n.Format}:</label>\n                                    <div id=\"${id}SourceFormatMessage\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceRecordSize\">${i18n.RecordSize}:</label>\n                                    <div id=\"${id}SourceRecordSize\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}RowTag\">${i18n.RowTag}:</label>\n                                    <div id=\"${id}RowTag\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceCsvSeparate\">${i18n.Separators}:</label>\n                                    <div id=\"${id}SourceCsvSeparate\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceCsvEscape\">${i18n.Escape}:</label>\n                                    <div id=\"${id}SourceCsvEscape\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceCsvTerminate\">${i18n.Terminators}:</label>\n                                    <div id=\"${id}SourceCsvTerminate\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}SourceCsvQuote\">${i18n.Quote}:</label>\n                                    <div id=\"${id}SourceCsvQuote\"></div>\n                                </li>\n                            </ul>\n                        </form>\n                    <hr class=\"dashedLine\">\n                        <form>\n                            <h1>Target</h1>\n                            <ul>\n                                <li>\n                                    <label for=\"${id}DestIP\">${i18n.IP}:</label>\n                                    <div id=\"${id}DestIP\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestDirectory\">${i18n.Directory}:</label>\n                                    <div id=\"${id}DestDirectory\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestFilePath\">${i18n.FilePath}:</label>\n                                    <div id=\"${id}DestFilePath\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestLogicalName\">${i18n.LogicalName}:</label>\n                                    <div id=\"${id}DestLogicalName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestGroupName\">${i18n.GroupName}:</label>\n                                    <div id=\"${id}DestGroupName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestNumParts\">${i18n.NumberofParts}:</label>\n                                    <div id=\"${id}DestNumParts\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestFormatMessage\">${i18n.Format}:</label>\n                                    <div id=\"${id}DestFormatMessage\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}DestRecordSize\">${i18n.RecordSize}:</label>\n                                    <div id=\"${id}DestRecordSize\"></div>\n                                </li>\n                            </ul>\n                        </form>\n                        <hr class=\"dashedLine\">\n                        <form>\n                            <h1>Other</h1>\n                            <ul>\n                                <li>\n                                    <label for=\"${id}MonitorEventName\">${i18n.MonitorEventName}:</label>\n                                    <div id=\"${id}MonitorEventName\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}MonitorSub\">${i18n.MonitorSub}:</label>\n                                    <div id=\"${id}MonitorSub\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}MonitorShotLimit\">${i18n.MonitorShotLimit}:</label>\n                                    <div id=\"${id}MonitorShotLimit\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}Overwrite\">${i18n.Overwrite}:</label>\n                                    <div id=\"${id}Overwrite\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}Replicate\">${i18n.Replicate}:</label>\n                                    <div id=\"${id}Replicate\"></div>\n                                </li>\n                                <li>\n                                    <label for=\"${id}Compress\">${i18n.Compress}:</label>\n                                    <div id=\"${id}Compress\"></div>\n                                </li>\n                            </ul>\n                        </form>\n                </div>\n            </div>\n            <div id=\"${id}_XML\" title=\"XML\" data-dojo-props=\"delayProps: {WUXml: true}, delayWidget: 'ECLSourceWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);