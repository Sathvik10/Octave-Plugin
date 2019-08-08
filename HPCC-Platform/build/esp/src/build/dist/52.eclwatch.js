(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FileBelongsToWidget":"./eclwatch/FileBelongsToWidget.js",
	"hpcc/FileHistoryWidget":"./eclwatch/FileHistoryWidget.js",
	"hpcc/LFDetailsWidget":"./eclwatch/LFDetailsWidget.js",
	"hpcc/TargetComboBoxWidget":"./eclwatch/TargetComboBoxWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/LFDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LFDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./eclwatch/FileBelongsToWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/FileBelongsToWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/SFDetailsWidget */ "./eclwatch/SFDetailsWidget.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, i18n, nlsHPCC,
    selector,
    DelayLoadWidget, GridDetailsWidget, ESPLogicalFile, ESPUtil, SFDetailsWidget) {
        return declare("FileBelongsToWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            logicalFile: null,

            gridTitle: nlsHPCC.SuperFilesBelongsTo,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.logicalFile = ESPLogicalFile.Get(params.NodeGroup, params.Name);
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    columns: {
                        sel: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        Name: { label: this.i18n.Name }
                    }
                }, domID);
                return retVal;
            },

            createDetail: function (id, row, params) {
                return new DelayLoadWidget({
                    id: id,
                    title: row.Name,
                    closable: true,
                    delayWidget: "SFDetailsWidget",
                    hpcc: {
                        type: "SFDetailsWidget",
                        params: {
                            Name: row.Name
                        }
                    }
                });
            },

            refreshGrid: function (args) {
                var context = this;
                if (this.logicalFile.Superfiles.DFULogicalFile) {
                    context.store.setData(this.logicalFile.Superfiles.DFULogicalFile);
                    context.grid.refresh();
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/FileHistoryWidget.js":
/*!***************************************!*\
  !*** ./eclwatch/FileHistoryWidget.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDfu */ "./lib/src/WsDfu.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil,
    registry, Button, ToolbarSeparator,
    GridDetailsWidget, WsDfu, ESPUtil) {
        return declare("FileHistoryWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.History,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this._refreshActionState();
                this.refreshGrid();
                this.initTab();
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");

                this.eraseHistory = new Button({
                    label: context.i18n.EraseHistory,
                    onClick: function () { context._onErase(); }
                }).placeAt(this.openButton, "after");

                dojo.destroy(this.id + "Open");

                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        Name: { label: this.i18n.Name, width: 70, sortable: false },
                        IP: { label: this.i18n.IP, width: 30, sortable: false },
                        Operation: { label: this.i18n.Operation, width: 30, sortable: false },
                        Owner: { label: this.i18n.Owner, width: 30, sortable: false },
                        Path: { label: this.i18n.Path, width: 70, sortable: false },
                        Timestamp: { label: this.i18n.TimeStamp, width: 30, sortable: false },
                        Workunit: { label: this.i18n.Workunit, width: 30, sortable: false }
                    }
                }, domID);

                return retVal;
            },

            _onErase: function (event) {
                var context = this;
                if (confirm(this.i18n.EraseHistoryQ + "\n" + this.params.Name + "?")) {
                    WsDfu.EraseHistory({
                        request: {
                            Name: context.params.Name
                        }
                    }).then(function (response) {
                        if (response) {
                            context.refreshGrid();
                        }
                    });
                }
            },

            refreshGrid: function () {
                var context = this;

                WsDfu.ListHistory({
                    request: {
                        Name: context.params.Name
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("ListHistoryResponse.History.Origin", response)) {
                        results = response.ListHistoryResponse.History.Origin;
                    }

                    if (results.length) {
                        arrayUtil.forEach(results, function (row, idx) {
                            newRows.push({
                                Name: row.Name,
                                IP: row.IP,
                                Operation: row.Operation,
                                Owner: row.Owner,
                                Path: row.Path,
                                Timestamp: row.Timestamp,
                                Workunit: row.Workunit
                            });
                        });
                    }

                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/LFDetailsWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/LFDetailsWidget.js ***!
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

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/TargetComboBoxWidget */ "./eclwatch/TargetComboBoxWidget.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! src/ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"),
    __webpack_require__(/*! hpcc/FileBelongsToWidget */ "./eclwatch/FileBelongsToWidget.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! hpcc/FileHistoryWidget */ "./eclwatch/FileHistoryWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/LFDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LFDetailsWidget.html"),

    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/form/NumberTextBox */ "./node_modules/dijit/form/NumberTextBox.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports, declare, lang, i18n, nlsHPCC, arrayUtil, dom, domAttr, domClass, domForm, query,
    BorderContainer, TabContainer, ContentPane, Toolbar, TooltipDialog, Form, SimpleTextarea, TextBox, Button, DropDownButton, TitlePane, registry,
    _TabContainerWidget, DelayLoadWidget, TargetSelectWidget, TargetComboBoxWidget, Clippy, ESPLogicalFile, ESPDFUWorkunit, FileBelongsToWidget, FileSpray, FileHistoryWidget,
    template) {
        exports.fixCircularDependency = declare("LFDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "LFDetailsWidget",
            i18n: nlsHPCC,

            borderContainer: null,

            copyForm: null,
            renameForm: null,
            desprayForm: null,
            replicateForm: null,
            summaryWidget: null,
            contentWidget: null,
            sourceWidget: null,
            defWidget: null,
            xmlWidget: null,
            filePartsWidget: null,
            queriesWidget: null,
            workunitWidget: null,
            dfuWorkunitWidget: null,
            fileBelongsTo: null,
            fileHistoryWidget: null,

            logicalFile: null,
            prevState: "",

            postCreate: function (args) {
                this.inherited(arguments);
                this.copyForm = registry.byId(this.id + "CopyForm");
                this.renameForm = registry.byId(this.id + "RenameForm");
                this.desprayForm = registry.byId(this.id + "DesprayForm");
                this.replicateForm = registry.byId(this.id + "ReplicateForm");
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.contentWidget = registry.byId(this.id + "_Content");
                this.sourceWidget = registry.byId(this.id + "_Source");
                this.defWidget = registry.byId(this.id + "_DEF");
                this.xmlWidget = registry.byId(this.id + "_XML");
                this.filePartsWidget = registry.byId(this.id + "_FileParts");
                this.queriesWidget = registry.byId(this.id + "_Queries");
                this.workunitWidget = registry.byId(this.id + "_Workunit");
                this.dfuWorkunitWidget = registry.byId(this.id + "_DFUWorkunit");
                this.fileHistoryWidget = registry.byId(this.id + "_FileHistory");
                this.copyTargetSelect = registry.byId(this.id + "CopyTargetSelect");
                this.desprayTargetSelect = registry.byId(this.id + "DesprayTargetSelect");
                this.desprayTooltiopDialog = registry.byId(this.id + "DesprayTooltipDialog");
                this.replicateTargetSelect = registry.byId(this.id + "ReplicateCluster");
                this.replicateSourceLogicalFile = registry.byId(this.id + "ReplicateSourceLogicalFile");
                this.replicateDropDown = registry.byId(this.id + "ReplicateDropDown");
                this.desprayIPSelect = registry.byId(this.id + "DesprayTargetIPAddress");
                var context = this;
                var origOnOpen = this.desprayTooltiopDialog.onOpen;
                this.desprayTooltiopDialog.onOpen = function () {
                    var targetRow;
                    if (!context.desprayTargetSelect.initalized) {
                        context.desprayTargetSelect.init({
                            DropZones: true,
                            callback: function (value, item) {
                                if (context.desprayIPSelect) {
                                    context.desprayIPSelect.defaultValue = context.desprayIPSelect.get("value");
                                    context.desprayIPSelect.loadDropZoneMachines(value);
                                    targetRow = item;
                                }
                            }
                        });
                    }
                    origOnOpen.apply(context.desprayTooltiopDialog, arguments);

                    if (!context.desprayIPSelect.initalized) {
                        var pathSepChar;
                        context.desprayIPSelect.init({
                            DropZoneMachines: true,
                            callback: function (value, row) {
                                var path = targetRow.machine.Directory.indexOf("\\");
                                targetRow.machine.Name = value
                                targetRow.machine.Netaddress = value
                                if (context.desprayTargetPath) {
                                    context.desprayTargetPath._dropZoneTarget = targetRow;
                                    if (path > -1) {
                                        pathSepChar = "\\"
                                        context.pathSepCharG = "\\"
                                    } else {
                                        pathSepChar = "/";
                                        context.pathSepCharG = "/"
                                    }
                                    context.desprayTargetPath.loadDropZoneFolders(pathSepChar, targetRow.machine.Directory);
                                }
                            }
                        });
                    }
                }
                this.desprayTargetPath = registry.byId(this.id + "DesprayTargetPath");
                this.fileBelongsToWidget = registry.byId(this.id + "_FileBelongs");

                Clippy.attach(this.id + "ClippyButton");
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
                if (confirm(this.i18n.YouAreAboutToDeleteThisFile)) {
                    this.logicalFile.doDelete({
                    });
                }
            },

            getTitle: function () {
                return this.i18n.title_LFDetails;
            },

            _handleResponse: function (wuidQualifier, response) {
                if (lang.exists(wuidQualifier, response)) {
                    var wu = ESPDFUWorkunit.Get(lang.getObject(wuidQualifier, false, response));
                    wu.startMonitor(true);
                    var tab = this.ensurePane(wu.ID, {
                        Wuid: wu.ID
                    });
                    if (tab) {
                        this.selectChild(tab);
                    }
                }
            },
            _onCopyOk: function (event) {
                if (this.copyForm.validate()) {
                    var context = this;
                    this.logicalFile.copy({
                        request: domForm.toObject(this.id + "CopyForm")
                    }).then(function (response) {
                        context._handleResponse("CopyResponse.result", response);
                    });
                    registry.byId(this.id + "CopyDropDown").closeDropDown();
                }
            },
            _onRenameOk: function (event) {
                if (this.renameForm.validate()) {
                    var context = this;
                    this.logicalFile.rename({
                        request: domForm.toObject(this.id + "RenameForm")
                    }).then(function (response) {
                        context._handleResponse("RenameResponse.wuid", response);
                    });
                    registry.byId(this.id + "RenameDropDown").closeDropDown();
                }
            },
            _onDesprayOk: function (event) {
                if (this.desprayForm.validate()) {
                    var context = this;
                    var request = domForm.toObject(this.id + "DesprayForm");
                    request.destPath = this.desprayTargetPath.getDropZoneFolder();
                    if (!context.endsWith(request.destPath, "/")) {
                        request.destPath += "/";
                    }
                    request.destPath += registry.byId(this.id + "DesprayTargetName").get("value");
                    this.logicalFile.despray({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("DesprayResponse.wuid", response);
                    });
                    registry.byId(this.id + "DesprayDropDown").closeDropDown();
                }
            },

            _onReplicateOk: function (event) {
                if (this.replicateForm.validate()) {
                    var context = this;
                    var request = domForm.toObject(this.id + "ReplicateForm");
                    FileSpray.Replicate({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("ReplicateResponse.wuid", response);
                    });
                    registry.byId(this.id + "ReplicateDropDown").closeDropDown();
                }
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;
                if (params.Name) {
                    this.logicalFile = ESPLogicalFile.Get(params.NodeGroup, params.Name);
                    var data = this.logicalFile.getData();
                    for (var key in data) {
                        this.updateInput(key, null, data[key]);
                    }
                    this.logicalFile.watch(function (name, oldValue, newValue) {
                        context.updateInput(name, oldValue, newValue);
                    });
                    this.replicateSourceLogicalFile.set("value", params.Name);
                }
                this.copyTargetSelect.init({
                    Groups: true
                });
                this.desprayTargetPath.init({
                    DropZoneFolders: true
                });
                this.replicateTargetSelect.init({
                    Groups: true
                });
                this.logicalFile.refresh();
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.summaryWidget.id) {
                    } else if (currSel.id === this.contentWidget.id) {
                        this.contentWidget.init({
                            NodeGroup: this.logicalFile.NodeGroup,
                            LogicalName: this.logicalFile.Name
                        });
                    } else if (currSel.id === this.sourceWidget.id) {
                        this.sourceWidget.init({
                            ECL: this.logicalFile.Ecl
                        });
                    } else if (currSel.id === this.defWidget.id) {
                        var context = this;
                        this.logicalFile.fetchDEF(function (response) {
                            context.defWidget.init({
                                ECL: response
                            });
                        });
                    } else if (currSel.id === this.xmlWidget.id) {
                        var context = this;
                        this.logicalFile.fetchXML(function (response) {
                            context.xmlWidget.init({
                                ECL: response
                            });
                        });
                    } else if (currSel.id === this.filePartsWidget.id) {
                        this.filePartsWidget.init({
                            fileParts: lang.exists("logicalFile.DFUFileParts.DFUPart", this) ? this.logicalFile.DFUFileParts.DFUPart : []
                        });
                    } else if (currSel.id === this.widget._Queries.id && !this.widget._Queries.__hpcc_initalized) {
                        this.widget._Queries.init({
                            LogicalName: this.logicalFile.Name
                        });
                    } else if (currSel.id === this.widget._Graphs.id && !this.widget._Graphs.__hpcc_initalized) {
                        this.widget._Graphs.init({
                            NodeGroup: this.logicalFile.NodeGroup,
                            LogicalName: this.logicalFile.Name
                        });
                    } else if (this.workunitWidget && currSel.id === this.workunitWidget.id) {
                        this.workunitWidget.init({
                            Wuid: this.logicalFile.Wuid
                        });
                    } else if (this.dfuWorkunitWidget && currSel.id === this.dfuWorkunitWidget.id) {
                        this.dfuWorkunitWidget.init({
                            Wuid: this.logicalFile.Wuid
                        });
                    } else if (currSel.id === this.fileBelongsToWidget.id) {
                        this.fileBelongsToWidget.init({
                            NodeGroup: this.logicalFile.NodeGroup,
                            Name: this.logicalFile.Name
                        });
                    } else if (currSel.id === this.fileHistoryWidget.id) {
                        this.fileHistoryWidget.init({
                            Name: this.logicalFile.Name
                        });
                    } else {
                        currSel.init(currSel.params);
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
                if (name === "Wuid") {
                    if (!newValue) {
                        this.removeChild(this.workunitWidget);
                        this.workunitWidget = null;
                        this.removeChild(this.dfuWorkunitWidget);
                        this.dfuWorkunitWidget = null;
                    } else if (this.workunitWidget && newValue[0] === "D") {
                        this.removeChild(this.workunitWidget);
                        this.workunitWidget = null;
                    } else if (this.dfuWorkunitWidget) {
                        this.removeChild(this.dfuWorkunitWidget);
                        this.dfuWorkunitWidget = null;
                    }
                    this.contentWidget.reset();
                    this.sourceWidget.reset();
                    this.defWidget.reset();
                    this.xmlWidget.reset();
                    this.filePartsWidget.reset();
                    this.widget._Queries.reset();
                    this.widget._Graphs.reset();
                    if (this.workunitWidget) {
                        this.workunitWidget.reset();
                    }
                    if (this.dfuWorkunitWidget) {
                        this.dfuWorkunitWidget.reset();
                    }
                    this.fileBelongsToWidget.reset();
                    this.fileHistoryWidget.reset();
                } else if (name === "Name") {
                    this.updateInput("RenameSourceName", oldValue, newValue);
                    this.updateInput("RenameTargetName", oldValue, newValue);
                    this.updateInput("DespraySourceName", oldValue, newValue);
                    this.updateInput("CopySourceName", oldValue, newValue);
                    this.updateInput("CopyTargetName", oldValue, newValue);
                } else if (name === "ProtectList") {
                    dom.byId(this.id + "ProtectedImage").src = this.logicalFile.getProtectedImage();
                } else if (name === "IsCompressed") {
                    dom.byId(this.id + "CompressedImage").src = this.logicalFile.getCompressedImage();
                } else if (name === "IsProtected") {
                    this.updateInput("isProtected", oldValue, newValue);
                } else if (name === "Ecl" && newValue) {
                    this.setDisabled(this.id + "_Source", false);
                    this.setDisabled(this.id + "_DEF", false);
                    this.setDisabled(this.id + "_XML", false);
                } else if (name === "StateID") {
                    this.summaryWidget.set("iconClass", this.logicalFile.getStateIconClass());
                    domClass.remove(this.id + "StateIdImage");
                    domClass.add(this.id + "StateIdImage", this.logicalFile.getStateIconClass());
                    domAttr.set(this.id + "Name", "innerHTML", this.logicalFile.Name + (this.logicalFile.isDeleted() ? " (" + this.i18n.Deleted + ")" : ""));
                } else if (name === "Superfiles") {
                    this.fileBelongsToWidget.set("title", this.i18n.Superfile + " (" + newValue.DFULogicalFile.length + ")");
                    var superOwner = [];
                    if (newValue.DFULogicalFile.length > 0) {
                        this.setDisabled(this.id + "_FileBelongs", false);
                        for (var i = 0; newValue.DFULogicalFile.length; ++i) {
                            superOwner.push(newValue.DFULogicalFile[i].Name);
                            this.updateInput("SuperOwner", oldValue, superOwner);
                        }
                    }
                } else if (name === "__hpcc_changedCount" && newValue > 0) {
                    this.refreshActionState();
                    //  Force Icon to Show (I suspect its not working due to Circular Reference Loading)
                    this.queriesWidget.set("iconClass", "dijitInline dijitIcon dijitTabButtonIcon iconFind");
                } else if (name === "DFUFilePartsOnClusters") {
                    // Currently only checking first cluster may add loop through clusters and add a tab at a later date
                    if (lang.exists("DFUFilePartsOnCluster", newValue) && newValue.DFUFilePartsOnCluster.length) {
                        this.updateInput("DFUFilePartsOnClusters", oldValue, newValue.DFUFilePartsOnCluster[0].Replicate);
                    }
                } else if (name === "RecordSize" && newValue === "0") {
                    this.updateInput("RecordSize", oldValue, this.i18n.NoPublishedSize);
                }
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Wuid,
                        closable: true,
                        delayWidget: "DFUWUDetailsWidget",
                        params: params
                    });
                    this.addChild(retVal);
                }
                return retVal;
            },

            refreshActionState: function () {
                this.setDisabled(this.id + "Save", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "Delete", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "CopyDropDown", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "RenameDropDown", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "DesprayDropDown", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "_Content", this.logicalFile.isDeleted()  || !this.logicalFile.Ecl);
                this.setDisabled(this.id + "_Source", this.logicalFile.isDeleted() || !this.logicalFile.Ecl);
                this.setDisabled(this.id + "_DEF", this.logicalFile.isDeleted() || !this.logicalFile.Ecl);
                this.setDisabled(this.id + "_XML", this.logicalFile.isDeleted() || !this.logicalFile.Ecl);
                this.setDisabled(this.id + "_FileBelongs", this.logicalFile.isDeleted() || !this.logicalFile.Superfiles);
                this.setDisabled(this.id + "_FileParts", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "_Queries", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "_Graphs", this.logicalFile.isDeleted() || !this.logicalFile.Graphs);
                this.setDisabled(this.id + "_Workunit", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "_DFUWorkunit", this.logicalFile.isDeleted());
                this.setDisabled(this.id + "ReplicateDropDown", !this.logicalFile.CanReplicateFlag || this.logicalFile.ReplicateFlag === false);
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/TargetComboBoxWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/TargetComboBoxWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/form/ComboBox */ "./node_modules/dijit/form/ComboBox.js"),

    __webpack_require__(/*! hpcc/TargetSelectClass */ "./eclwatch/TargetSelectClass.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    ComboBox,
    TargetSelectClass) {

        return declare("TargetComboBoxWidget", [ComboBox], TargetSelectClass);
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/TargetSelectWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/TargetSelectWidget.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! hpcc/TargetSelectClass */ "./eclwatch/TargetSelectClass.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    Select,
    TargetSelectClass) {

        return declare("TargetSelectWidget", [Select], TargetSelectClass);
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/LFDetailsWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/LFDetailsWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Summary}\", iconClass:\"iconLogicalFile\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Save\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}CopyDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Copy}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}CopyForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}CopyTargetSelect\" title=\"${i18n.Group}:\" name=\"destGroup\" colspan=\"2\" style=\"width:100%;\" data-dojo-type=\"TargetSelectWidget\" style=\"display: inline-block; vertical-align: middle\" />\n                                        <input id=\"${id}CopyTargetName\" title=\"${i18n.TargetName}:\" name=\"destLogicalName\" colspan=\"2\" style=\"width:100%;\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}CopyTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetNoSplit\" title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetCompress\" title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetWrap\" title=\"${i18n.Wrap}:\" name=\"Wrap\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetRetainSuperfileStructure\" title=\"${i18n.RetainSuperfileStructure}:\" name=\"superCopy\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyPreserveCompression\" title=\"${i18n.PreserveCompression}:\" checked=\"true\" name=\"preserveCompression\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onCopyOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Copy}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}RenameDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Rename}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}RenameForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}RenameTargetName\" title=\"${i18n.TargetName}:\" style=\"width: 100%;\" name=\"dstname\" colspan=\"2\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}RenameTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onRenameOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Rename}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}DesprayDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Despray}</span>\n                        <div id=\"${id}DesprayTooltipDialog\" data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}DesprayForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}DesprayTargetSelect\" title=\"${i18n.DropZone}:\" name=\"destGroup\" colspan=\"2\" style=\"width: 100%;\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}DesprayTargetIPAddress\" title=\"${i18n.IPAddress}:\" name=\"destIP\" style=\"width: 100%;\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}DesprayTargetPath\" title=\"${i18n.Path}:\" name=\"destPath\" colspan=\"2\" required=\"false\" style=\"width: 100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"TargetComboBoxWidget\" />\n                                        <input id=\"${id}DesprayTargetName\" title=\"${i18n.TargetName}:\" colspan=\"2\" required=\"true\" style=\"width: 100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input id=\"${id}DesprayTargetSplitPrefix\" title=\"${i18n.SplitPrefix}:\" name=\"splitprefix\" colspan=\"2\" style=\"width: 100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}DesprayTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}DesprayTargetUseSingleConnection\" title=\"${i18n.UseSingleConnection}:\" name=\"SingleConnection\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onDesprayOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Despray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}ReplicateDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Replicate}</span>\n                        <div id=\"${id}ReplicateTooltipDialog\" data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}ReplicateForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Replicate}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}ReplicateSourceLogicalFile\" title=\"${i18n.SourceLogicalFile}:\" name=\"sourceLogicalName\" colspan=\"2\" required=\"true\" style=\"width: 100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input id=\"${id}ReplicateOffset\" title=\"${i18n.ReplicateOffset}:\" name=\"replicateOffset\" colspan=\"2\" required=\"false\" value=\"1\" style=\"width: 100%;\" data-dojo-type=\"dijit.form.NumberTextBox\" />\n                                        <input id=\"${id}ReplicateCluster\" title=\"${i18n.Cluster}:\" name=\"cluster\" colspan=\"2\" style=\"width: 100%;\" data-dojo-type=\"TargetSelectWidget\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onReplicateOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Replicate}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <img id=\"${id}CompressedImage\"/>&nbsp;\n                        <img id=\"${id}ProtectedImage\" src=\"${dojoConfig.urlInfo.resourcePath}/img/unlocked.png\" />&nbsp;<img id=\"${id}StateIdImage\" class=\"iconLogicalFile\" />&nbsp;<span id=\"${id}Name\" class=\"bold\"></span>\n                        <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}Name\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                    </h2>\n                    <form id=\"${id}SummaryForm\" class=\"leftAlignFields\">\n                        <ul>\n                            <li>\n                                <label for=\"${id}Wuid\">${i18n.Workunit}: </label>\n                                <div id=\"${id}Wuid\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Owner\">${i18n.Owner}: </label>\n                                <div id=\"${id}Owner\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}SuperOwner\">${i18n.SuperOwner}: </label>\n                                <div id=\"${id}SuperOwner\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}NodeGroup\">${i18n.ClusterName}: </label>\n                                <div id=\"${id}NodeGroup\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Description\">${i18n.Description}: </label>\n                                <input id=\"${id}Description\" data-dojo-props=\"trim:true\" data-dojo-type=\"dijit.form.SimpleTextarea\" cols=\"55\" rows=\"4\" />\n                            </li>\n                            <li>\n                                <label for=\"${id}JobName\">${i18n.JobName}: </label>\n                                <div id=\"${id}JobName\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}isProtected\">${i18n.Protected}:</label>\n                                <div><input id=\"${id}isProtected\" data-dojo-type=\"dijit.form.CheckBox\"/></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}ContentType\">${i18n.ContentType}: </label>\n                                <div id=\"${id}ContentType\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}KeyType\">${i18n.KeyType}: </label>\n                                <div id=\"${id}KeyType\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Filesize\">${i18n.FileSize}: </label>\n                                <div id=\"${id}Filesize\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Format\">${i18n.Format}: </label>\n                                <div id=\"${id}Format\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}IsCompressed\">${i18n.IsCompressed}: </label>\n                                <div id=\"${id}IsCompressed\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}CompressedFileSize\">${i18n.CompressedFileSize}: </label>\n                                <div id=\"${id}CompressedFileSize\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}PercentCompressed\">${i18n.PercentCompressed}: </label>\n                                <div id=\"${id}PercentCompressed\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Modified\">${i18n.Modified}: </label>\n                                <div id=\"${id}Modified\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}ExpireDays\">${i18n.ExpireDays}: </label>\n                                <div id=\"${id}ExpireDays\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}Directory\">${i18n.Directory}: </label>\n                                <div id=\"${id}Directory\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}PathMask\">${i18n.PathMask}: </label>\n                                <div id=\"${id}PathMask\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}RecordSize\">${i18n.RecordSize}: </label>\n                                <div id=\"${id}RecordSize\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}RecordCount\">${i18n.RecordCount}: </label>\n                                <div id=\"${id}RecordCount\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}DFUFilePartsOnClusters\">${i18n.IsReplicated}: </label>\n                                <div id=\"${id}DFUFilePartsOnClusters\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}NumParts\">${i18n.FileParts}: </label>\n                                <div id=\"${id}NumParts\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}MinSkew\">${i18n.MinSkew}: </label>\n                                <div id=\"${id}MinSkew\"></div>\n                            </li>\n                            <li>\n                                <label for=\"${id}MaxSkew\">${i18n.MaxSkew}: </label>\n                                <div id=\"${id}MaxSkew\"></div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_Content\" title=\"${i18n.Contents}\" data-dojo-props=\"delayWidget: 'ResultWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Source\" title=\"${i18n.ECL}\" data-dojo-props=\"delayWidget: 'ECLSourceWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_DEF\" title=\"${i18n.DEF}\" data-dojo-props=\"delayWidget: 'ECLSourceWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_XML\" title=\"${i18n.XML}\" data-dojo-props=\"delayProps: {WUXml: true}, delayWidget: 'ECLSourceWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_FileBelongs\" title=\"${i18n.Superfiles}\" data-dojo-props=\"delayWidget: 'FileBelongsToWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_FileParts\" title=\"${i18n.FileParts}\" data-dojo-props=\"delayWidget: 'FilePartsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Queries\" title=\"${i18n.Queries}\" data-dojo-props=\"delayWidget: 'QuerySetQueryWidget', iconClass:'iconFind'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Graphs\" title=\"${i18n.Graphs}\" data-dojo-props=\"delayWidget: 'GraphsLFWidget', disabled: true\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Workunit\" title=\"${i18n.Workunit}\" data-dojo-props=\"delayWidget: 'WUDetailsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_DFUWorkunit\" title=\"${i18n.Workunit}\" data-dojo-props=\"delayWidget: 'DFUWUDetailsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_FileHistory\" title=\"${i18n.History}\" data-dojo-props=\"delayWidget: 'FileHistoryWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);