(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/SFDetailsWidget":"./eclwatch/SFDetailsWidget.js",
	"dojo/text!templates/SFDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SFDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./eclwatch/SFDetailsWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/SFDetailsWidget.js ***!
  \*************************************/
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
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/SFDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SFDetailsWidget.html"),

    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports, declare, lang, i18n, nlsHPCC, arrayUtil, dom, domAttr, domClass, domForm, query, Memory, Observable, all,
    BorderContainer, TabContainer, ContentPane, Toolbar, ToolbarSeparator, TooltipDialog, Form, SimpleTextarea, TextBox, Button, DropDownButton, TitlePane, registry,
    selector,
    _TabContainerWidget,
    ESPUtil, ESPLogicalFile, DelayLoadWidget, Utility,
    template) {
        exports.fixCircularDependency = declare("SFDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "SFDetailsWidget",
            i18n: nlsHPCC,

            borderContainer: null,
            tabContainer: null,
            summaryWidget: null,
            subfilesGrid: null,

            logicalFile: null,
            prevState: "",

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.deleteBtn = registry.byId(this.id + "Delete");
                this.removeBtn = registry.byId(this.id + "Remove");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initSubfilesGrid();
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.logicalFile.refresh();
            },

            _onSave: function (event) {
                var context = this;
                var protectedCheckbox = registry.byId(this.id + "isProtected");
                this.logicalFile.save({
                    Description: dom.byId(context.id + "Description").value,
                    isProtected: protectedCheckbox.get("checked")
                }, null);
            },
            _onDelete: function (event) {
                if (confirm(this.i18n.DeleteSuperfile)) {
                    this.logicalFile.removeSubfiles(this.subfilesGrid.store.data, true);
                }
            },
            _onRemove: function (event) {
                if (confirm(this.i18n.RemoveSubfiles2)) {
                    this.logicalFile.removeSubfiles(this.subfilesGrid.getSelected());
                }
            },
            _onOpen: function (event) {
                var selections = this.subfilesGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensureLFPane(selections[i].Name, selections[i]);
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab, true);
                }
            },
            _onCopyOk: function (event) {
                this.logicalFile.copy({
                    request: domForm.toObject(this.id + "CopyDialog")
                });
                registry.byId(this.id + "CopyDropDown").closeDropDown();
            },
            _onCopyCancel: function (event) {
                registry.byId(this.id + "CopyDropDown").closeDropDown();
            },
            _onDesprayOk: function (event) {
                this.logicalFile.despray({
                    request: domForm.toObject(this.id + "DesprayDialog")
                });
                registry.byId(this.id + "DesprayDropDown").closeDropDown();
            },
            _onDesprayCancel: function (event) {
                registry.byId(this.id + "DesprayDropDown").closeDropDown();
            },
            _onRenameOk: function (event) {
                this.logicalFile.rename({
                    request: domForm.toObject(this.id + "RenameDialog")
                });
                registry.byId(this.id + "RenameDropDown").closeDropDown();
            },
            _onRenameCancel: function (event) {
                registry.byId(this.id + "RenameDropDown").closeDropDown();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                if (params.Name) {
                    this.logicalFile = ESPLogicalFile.Get("", params.Name);
                    var data = this.logicalFile.getData();
                    for (var key in data) {
                        this.updateInput(key, null, data[key]);
                    }
                    this.logicalFile.watch(function (name, oldValue, newValue) {
                        context.updateInput(name, oldValue, newValue);
                    });
                    this.logicalFile.refresh();
                }
                this.subfilesGrid.startup();
            },

            initSubfilesGrid: function () {
                var context = this;
                var store = new Memory({
                    idProperty: "Name",
                    data: []
                });
                this.subfilesStore = Observable(store);
                this.subfilesGrid = new declare([ESPUtil.Grid(false, true)])({
                    columns: {
                        sel: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        IsCompressed: {
                            width: 25, sortable: false,
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("compressed.png", context.i18n.Compressed);
                            },
                            formatter: function (compressed) {
                                if (compressed === true) {
                                    return Utility.getImageHTML("compressed.png");
                                }
                                return "";
                            }
                        },
                        IsKeyFile: {
                            width: 25, sortable: false,
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("index.png", context.i18n.Index);
                            },
                            formatter: function (keyfile, row) {
                                if (row.ContentType === "key") {
                                    return Utility.getImageHTML("index.png");
                                }
                                return "";
                            }
                        },
                        isSuperfile: {
                            width: 25, sortable: false,
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("superfile.png", context.i18n.Superfile);
                            },
                            formatter: function (superfile) {
                                if (superfile === true) {
                                    return Utility.getImageHTML("superfile.png");
                                }
                                return "";
                            }
                        },
                        Name: {
                            label: this.i18n.LogicalName,
                            formatter: function (name, row) {
                                return "<a href='#' class='dgrid-row-url'>" + name + "</a>";
                            }
                        },
                        Owner: { label: this.i18n.Owner, width: 72 },
                        Description: { label: this.i18n.Description, width: 153 },
                        RecordCount: { label: this.i18n.Records, width: 72, sortable: false },
                        Totalsize: { label: this.i18n.Size, width: 72, sortable: false },
                        Parts: { label: this.i18n.Parts, width: 45, sortable: false },
                        Modified: { label: this.i18n.ModifiedUTCGMT, width: 155, sortable: false }
                    },
                    store: this.subfilesStore
                }, this.id + "SubfilesGrid");
                var context = this;
                this.subfilesGrid.on(".dgrid-row-url:click", function (evt) {
                    var item = context.subfilesGrid.row(evt).data;
                    var tab = context.ensureLFPane(item.Name, item);
                    context.selectChild(tab, true);
                });
                this.subfilesGrid.on("dgrid-select", function (evt) {
                    context.deleteBtn.set("disabled", true);
                    context.removeBtn.set("disabled", false);
                });
                this.subfilesGrid.on("dgrid-deselect", function (evt) {
                    var selections = context.subfilesGrid.getSelected();
                    if (selections.length === 0) {
                        context.deleteBtn.set("disabled", false);
                        context.removeBtn.set("disabled", true);
                    }
                });
                this.subfilesGrid.on(".dgrid-row:dblclick", function (evt) {
                    var item = context.subfilesGrid.row(evt).data;
                    var tab = context.ensureLFPane(item.Name, item);
                    context.selectChild(tab, true);
                });
                this.subfilesGrid.startup();
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.summaryWidget.id) {
                    } else {
                        if (!currSel.initalized) {
                            currSel.init(currSel._hpccParams);
                        }
                    }
                }
            },

            showMessage: function (msg) {
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
                if (name === "subfiles") {
                    var dataPromise = [];
                    var data = [];
                    arrayUtil.forEach(newValue.Item, function (item, idx) {
                        var logicalFile = ESPLogicalFile.Get("", item);
                        dataPromise.push(logicalFile.getInfo2({
                            onAfterSend: function (response) {
                            }
                        }));
                        data.push(logicalFile);
                    });
                    var context = this;
                    all(dataPromise).then(function (logicalFiles) {
                        context.subfilesStore.setData(data);
                        context.subfilesGrid.refresh();
                    })
                } else if (name === "StateID") {
                    this.summaryWidget.set("iconClass", this.logicalFile.getStateIconClass());
                    domClass.remove(this.id + "StateIdImage");
                    domClass.add(this.id + "StateIdImage", this.logicalFile.getStateIconClass());
                } else if (name === "ProtectList") {
                    dom.byId(this.id + "ProtectedImage").src = this.logicalFile.getProtectedImage();
                } else if (name === "IsProtected") {
                    this.updateInput("isProtected", oldValue, newValue);
                } else if (name === "IsCompressed") {
                    dom.byId(this.id + "CompressedImage").src = this.logicalFile.getCompressedImage();
                }
            },

            ensureLFPane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Name,
                        closable: true,
                        delayWidget: params.isSuperfile ? "SFDetailsWidget" : "LFDetailsWidget",
                        _hpccParams: {
                            NodeGroup: params.NodeGroup,
                            Name: params.Name
                        }
                    });
                    this.addChild(retVal, 1);
                }
                return retVal;
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SFDetailsWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/SFDetailsWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'${i18n.Summary}', iconClass:'iconSuperFile'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Save\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.DeleteSuperfile2}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <img id=\"${id}ProtectedImage\" src=\"${dojoConfig.urlInfo.resourcePath}/img/unlocked.png\" />&nbsp;\n                        <img id=\"${id}CompressedImage\"/>&nbsp;\n                        <img id=\"${id}StateIdImage\" class=\"iconSuperFile\" />&nbsp;<span id=\"${id}Name\" class=\"bold\"></span>\n                    </h2>\n                    <form id=\"${id}SummaryForm\">\n                        <ul>\n                            <li>\n                                <label for=\"${id}Description\">${i18n.Description}: </label>\n                                <input id=\"${id}Description\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.SimpleTextarea\" cols=\"55\" rows=\"4\" />\n                            </li>\n                            <li>\n                                <label for=\"${id}Filesize\">${i18n.FileSize}:</label>\n                                <div id=\"${id}Filesize\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}isProtected\">${i18n.Protected}:</label>\n                                <div><input id=\"${id}isProtected\" data-dojo-type=\"dijit.form.CheckBox\"/></div>\n                                </li>\n                            <li>\n                                <label for=\"${id}IsCompressed\">${i18n.IsCompressed}:</label>\n                                <div id=\"${id}IsCompressed\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}PercentCompressed\">${i18n.PercentCompressed}:</label>\n                                <div id=\"${id}PercentCompressed\"></div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n                <div style=\"width: 100%; height: 66%\" data-dojo-props=\"region: 'bottom', splitter: true, minSize: 120\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                    <div class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                        <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                        <div id=\"${id}Remove\" data-dojo-attach-event=\"onClick:_onRemove\" data-dojo-type=\"dijit.form.Button\">${i18n.RemoveSubfiles}</div>\n                        <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    </div>\n                    <div id=\"${id}SubfilesGridCP\" style=\"padding: 0px; border:0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                        <div id=\"${id}SubfilesGrid\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);