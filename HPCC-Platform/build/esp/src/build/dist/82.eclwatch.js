(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DFUQueryWidget":"./eclwatch/DFUQueryWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/SelectionGridWidget":"./eclwatch/SelectionGridWidget.js",
	"hpcc/TargetComboBoxWidget":"./eclwatch/TargetComboBoxWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"src/WsTopology":"./lib/src/WsTopology.js",
	"dijit/Fieldset":"./node_modules/dijit/Fieldset.js",
	"dijit/form/ComboBox":"./node_modules/dijit/form/ComboBox.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!templates/DFUQueryWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUQueryWidget.html",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/SelectionGridWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html",
	"dojo/text!dijit/templates/Fieldset.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[82],{

/***/ "./eclwatch/DFUQueryWidget.js":
/*!************************************!*\
  !*** ./eclwatch/DFUQueryWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),

    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/WsDfu */ "./lib/src/WsDfu.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPLogicalFile */ "./lib/src/ESPLogicalFile.js"),
    __webpack_require__(/*! src/ESPDFUWorkunit */ "./lib/src/ESPDFUWorkunit.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/TargetComboBoxWidget */ "./eclwatch/TargetComboBoxWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! hpcc/SelectionGridWidget */ "./eclwatch/SelectionGridWidget.js"),
    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! put-selector/put */ "./put-selector/put.js"),

    __webpack_require__(/*! dojo/text!../templates/DFUQueryWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUQueryWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/DateTextBox */ "./node_modules/dijit/form/DateTextBox.js"),
    __webpack_require__(/*! dijit/form/TimeTextBox */ "./node_modules/dijit/form/TimeTextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/form/RadioButton */ "./node_modules/dijit/form/RadioButton.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domAttr, domConstruct, domClass, domForm, date, on, topic,
    registry, Dialog, Menu, MenuItem, MenuSeparator, PopupMenuItem, Textarea, ValidationTextBox,
    editor, selector, tree,
    _TabContainerWidget, WsDfu, FileSpray, ESPUtil, ESPLogicalFile, ESPDFUWorkunit, DelayLoadWidget, TargetSelectWidget, TargetComboBoxWidget, FilterDropDownWidget, SelectionGridWidget, WsTopology, Utility,
    put,
    template) {
        return declare("DFUQueryWidget", [_TabContainerWidget, ESPUtil.FormHelper], {
            templateString: template,
            baseClass: "DFUQueryWidget",
            i18n: nlsHPCC,
            pathSepCharG: "/",
            updatedFilter: null,
            username: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.workunitsTab = registry.byId(this.id + "_Workunits");
                this.filter = registry.byId(this.id + "Filter");
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
                this.importForm = registry.byId(this.id + "ImportForm");
                this.importTargetSelect = registry.byId(this.id + "ImportTargetSelect");
                this.copyForm = registry.byId(this.id + "CopyForm");
                this.copyTargetSelect = registry.byId(this.id + "CopyTargetSelect");
                this.copyGrid = registry.byId(this.id + "CopyGrid");
                this.renameForm = registry.byId(this.id + "RenameForm");
                this.renameGrid = registry.byId(this.id + "RenameGrid");
                this.addToSuperFileForm = registry.byId(this.id + "AddToSuperfileForm");
                this.addToSuperfileGrid = registry.byId(this.id + "AddToSuperfileGrid");
                this.desprayForm = registry.byId(this.id + "DesprayForm");
                this.desprayTargetSelect = registry.byId(this.id + "DesprayTargetSelect");
                this.desprayIPSelect = registry.byId(this.id + "DesprayTargetIPAddress");
                this.desprayTooltipDialog = registry.byId(this.id + "DesprayTooltipDialog");
                this.addToSuperfileTargetName = registry.byId(this.id + "AddToSuperfileTargetName")
                this.createNewSuperRadio = registry.byId(this.id + "CreateNewSuperRadio");
                this.addToSuperfileTargetAppendRadio = registry.byId(this.id + "AddToSuperfileTargetAppend");
                this.downloadToList = registry.byId(this.id + "DownloadToList");
                this.downloadToListDialog = registry.byId(this.id + "DownloadToListDialog");
                this.downListForm = registry.byId(this.id + "DownListForm");
                this.fileName = registry.byId(this.id + "FileName");
                this.mineControl = registry.byId(this.id + "Mine");
                var context = this;
                var origOnOpen = this.desprayTooltipDialog.onOpen;
                this.desprayTooltipDialog.onOpen = function () {
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
                    origOnOpen.apply(context.desprayTooltipDialog, arguments);

                    if (!context.desprayIPSelect.initalized) {
                        var pathSepChar;
                        context.desprayIPSelect.init({
                            DropZoneMachines: true,
                            callback: function (value, row) {
                                var path = targetRow.machine.Directory.indexOf("\\");
                                targetRow.machine.Name = value
                                targetRow.machine.Netaddress = value
                                context.desprayTargetPath.placeholder = targetRow.machine.Directory;
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
                this.desprayGrid = registry.byId(this.id + "DesprayGrid");
                this.remoteCopyReplicateCheckbox = registry.byId(this.id + "RemoteCopyReplicate");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initContextMenu();
                this.initFilter();
            },

            _onDownloadToListCancelDialog: function (event) {
                this.downloadToListDialog.hide();
            },

            _onDownloadToList: function (event) {
                this.downloadToListDialog.show();
            },

            _buildCSV: function (event) {
                var selections = this.workunitsGrid.getSelected();
                var row = [];
                var fileName = this.fileName.get("value") + ".csv";

                arrayUtil.forEach(selections, function (cell, idx) {
                    var rowData = [cell.IsProtected, cell.IsCompressed, cell.IsKeyFile, cell.__hpcc_displayName, cell.Owner, cell.Description, cell.NodeGroup, cell.RecordCount, cell.IntSize, cell.Parts, cell.Modified];
                    row.push(rowData);
                });

                Utility.downloadToCSV(this.workunitsGrid, row, fileName);
                this._onDownloadToListCancelDialog();
            },

            getTitle: function () {
                return this.i18n.title_DFUQuery;
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onTree: function (event) {
                this.treeMode = this.widget.Tree.get("checked");
                this.refreshGrid();
                this.refreshActionState();
            },

            _onOpen: function (event) {
                var selections = this.workunitsGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensureLFPane(selections[i].__hpcc_id, selections[i]);
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab, true);
                }
            },

            _onDelete: function (event) {
                var selection = this.workunitsGrid.getSelected();
                var list = this.arrayToList(selection, "Name");
                if (confirm(this.i18n.DeleteSelectedFiles + "\n" + list)) {
                    var context = this;
                    WsDfu.DFUArrayAction(selection, "Delete").then(function (response) {
                        context.refreshGrid(true);
                    });
                }
            },

            _handleResponse: function (wuidQualifier, response) {
                if (lang.exists(wuidQualifier, response)) {
                    var wu = ESPDFUWorkunit.Get(lang.getObject(wuidQualifier, false, response));
                    wu.startMonitor(true);
                    var tab = this.ensureDFUWUPane(wu.ID, {
                        Wuid: wu.ID
                    });
                    return tab
                }
            },

            _onImportOk: function (event) {
                if (this.importForm.validate()) {
                    var request = domForm.toObject(this.importForm.id);
                    var context = this;
                    FileSpray.Copy({
                        request: request
                    }).then(function (response) {
                        context._handleResponse("CopyResponse.result", response);
                    });
                    topic.publish("hpcc/dfu_wu_created");
                    registry.byId(this.id + "ImportDropDown").closeDropDown();
                }
            },

            _onCopyOk: function (event) {
                var copyPreserveCompressionCheckbox = registry.byId(this.id + "CopyPreserveCompression");
                var value = copyPreserveCompressionCheckbox.get("checked") ? 1 : 0;

                if (this.copyForm.validate()) {
                    var context = this;
                    arrayUtil.forEach(this.copyGrid.store.data, function (item, idx) {
                        var logicalFile = ESPLogicalFile.Get(item.NodeGroup, item.Name);
                        var request = domForm.toObject(context.id + "CopyForm");
                        request.RenameSourceName = item.Name;
                        request.destLogicalName = item.targetCopyName;
                        request.preserveCompression = value;
                        logicalFile.copy({
                            request: request
                        }).then(function (response) {
                            context._handleResponse("CopyResponse.result", response);
                        });
                    });
                    topic.publish("hpcc/dfu_wu_created");
                    registry.byId(this.id + "CopyDropDown").closeDropDown();
                }
            },

            _onRenameOk: function (event) {
                if (this.renameForm.validate()) {
                    var context = this;
                    arrayUtil.forEach(this.renameGrid.store.data, function (item, idx) {
                        var logicalFile = ESPLogicalFile.Get(item.NodeGroup, item.Name);
                        var request = domForm.toObject(context.id + "RenameForm");
                        request.RenameSourceName = item.Name;
                        request.dstname = item.targetRenameName;
                        logicalFile.rename({
                            request: request
                        }).then(function (response) {
                            context._handleResponse("RenameResponse.wuid", response);
                        });
                    });
                    topic.publish("hpcc/dfu_wu_created");
                    registry.byId(this.id + "RenameDropDown").closeDropDown();
                }
            },

            _onAddToSuperfileOk: function (event) {
                if (this.addToSuperFileForm.validate()) {
                    var context = this;
                    var formData = domForm.toObject(this.id + "AddToSuperfileForm");
                    WsDfu.AddtoSuperfile(this.workunitsGrid.getSelected(), formData.Superfile, formData.ExistingFile).then(function (response) {
                        context.refreshGrid();
                    });
                    registry.byId(this.id + "AddtoDropDown").closeDropDown();
                }
            },

            _onDesprayOk: function (event) {
                if (this.desprayForm.validate()) {
                    var context = this;
                    arrayUtil.forEach(this.desprayGrid.store.data, function (item, idx) {
                        var request = domForm.toObject(context.id + "DesprayForm");
                        request.destPath = context.desprayTargetPath.getDropZoneFolder();
                        if (!context.endsWith(request.destPath, context.pathSepCharG)) {
                            request.destPath += context.pathSepCharG;
                        }
                        request.destPath += item.targetName;
                        item.despray({
                            request: request
                        }).then(function (response) {
                            context._handleResponse("DesprayResponse.wuid", response);
                        });
                    });
                    topic.publish("hpcc/dfu_wu_created");
                    registry.byId(this.id + "DesprayDropDown").closeDropDown();
                }
            },

            _onRowDblClick: function (item) {
                var wuTab = this.ensureLFPane(item.__hpcc_id, item);
                this.selectChild(wuTab);
            },

            _onRowContextMenu: function (item, colField, mystring) {
                this.menuFilterOwner.set("disabled", false);
                this.menuFilterCluster.set("disabled", false);

                if (item) {
                    this.menuFilterOwner.set("label", this.i18n.Owner + ":  " + item.Owner);
                    this.menuFilterOwner.set("hpcc_value", item.Owner);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + item.NodeGroup);
                    this.menuFilterCluster.set("hpcc_value", item.NodeGroup);
                }
                if (item.Owner === "") {
                    this.menuFilterOwner.set("disabled", true);
                    this.menuFilterOwner.set("label", this.i18n.Owner + ":  " + this.i18n.NA);
                }
                if (item.NodeGroup === "") {
                    this.menuFilterCluster.set("disabled", true);
                    this.menuFilterCluster.set("label", this.i18n.Cluster + ":  " + this.i18n.NA);
                }
            },

            //  Implementation  ---
            getFilter: function () {
                if (this.workunitsGrid){
                    var retVal = this.filter.toObject();
                    if (retVal.Sortby){
                        switch (retVal.Sortby){
                            case "Smallest":
                                this.workunitsGrid.set ("sort", [{ attribute: "FileSize", "descending": false }]);
                                break;
                            case "Largest":
                                this.workunitsGrid.set ("sort", [{ attribute: "FileSize", "descending": true }]);
                                break;
                            case "Oldest":
                                this.workunitsGrid.set ("sort", [{ attribute: "Modified", "descending": false }]);
                                break;
                            case "Newest":
                                /* falls through */
                            default:
                                this.workunitsGrid.set ("sort", [{ attribute: "Modified", "descending": true }]);
                                break;
                            }
                        }
                    }
                var retVal = this.filter.toObject();
                if (retVal.StartDate && retVal.FromTime) {
                    lang.mixin(retVal, {
                        StartDate: this.getISOString("FromDate", "FromTime")
                    });
                } else if (retVal.StartDate && !retVal.FromTime) {
                    lang.mixin(retVal, {
                        StartDate: registry.byId(this.id + "FromDate").attr("value").toISOString().replace(/T.*Z/, '') + "T00:00:00Z"
                    });
                }
                if (retVal.EndDate && retVal.ToTime) {
                    lang.mixin(retVal, {
                        EndDate: this.getISOString("ToDate", "ToTime")
                    });
                } else if (retVal.EndDate && !retVal.ToTime) {
                    lang.mixin(retVal, {
                        EndDate: registry.byId(this.id + "ToDate").attr("value").toISOString().replace(/T.*Z/, '') + "T23:59:59Z"
                    });
                }

                this.updatedFilter = JSON.parse(JSON.stringify(retVal));    // Deep copy as checkIfWarning will append _rawxml to it  ---

                return retVal;
            },

            checkIfWarning: function () {
                var context = this;

                WsDfu.DFUQuery({
                    request: this.updatedFilter
                }).then(function (response) {
                    if (lang.exists("DFUQueryResponse", response)) {
                        if (response.DFUQueryResponse.Warning) {
                            context.filter.open();
                            context.filter.setFilterMessage(context.i18n.FilesWarning);
                        } else {
                            context.filter.setFilterMessage("");
                        }
                    }
                });
            },

            //  Implementation  ---
            init: function (params) {
                var context = this;
                if (this.inherited(arguments))
                    return;

                if (this.params.searchResults) {
                    this.filter.disable(true);
                    this.widget.Tree.set("disabled", true);
                }

                this.clusterTargetSelect.init({
                    Groups: true,
                    includeBlank: true
                });
                var context = this;
                this.importTargetSelect.init({
                    Groups: true
                });

                this.importTargetSelect.on('change', function (value) {
                    context.checkReplicate(value, context.remoteCopyReplicateCheckbox);
                });

                this.copyTargetSelect.init({
                    Groups: true
                });

                this.desprayTargetPath.init({
                    DropZoneFolders: true
                });

                this.initWorkunitsGrid();
                this.checkIfWarning();

                this.filter.on("clear", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
                topic.subscribe("hpcc/dfu_wu_completed", function (topic) {
                    context.refreshGrid();
                });

                this.createNewSuperRadio.on('change', function (value) {
                    if (value) {
                        context.addToSuperfileTargetAppendRadio.set("checked", false);
                    }
                });

                this.addToSuperfileTargetAppendRadio.on('change', function (value) {
                    if (value) {
                        context.createNewSuperRadio.set("checked", false);
                    }
                });

                this.userName = dojoConfig.username;
                if (this.userName === null) {
                    this.mineControl.set("disabled", true);
                }
            },

            _onMine: function (event) {
                if (event) {
                    this.filter.setValue(this.id + "Owner", this.userName);
                    this.filter._onFilterApply();
                } else {
                    this.filter._onFilterClear();
                    this.filter._onFilterApply();
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.workunitsTab.id) {
                        this.refreshGrid();
                    } else {
                        if (!currSel.initalized) {
                            currSel.init(currSel._hpccParams);
                        }
                    }
                }
            },

            addMenuItem: function (menu, details) {
                var menuItem = new MenuItem(details);
                menu.addChild(menuItem);
                return menuItem;
            },

            initContextMenu: function () {
                var context = this;
                var pMenu = new Menu({
                    targetNodeIds: [this.id + "WorkunitsGrid"]
                });
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Refresh,
                    onClick: function (args) { context._onRefresh(); }
                }));
                pMenu.addChild(new MenuSeparator());
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Open,
                    onClick: function (args) { context._onOpen(); }
                }));
                pMenu.addChild(new MenuItem({
                    label: this.i18n.Delete,
                    onClick: function (args) { context._onDelete(); }
                }));
                pMenu.addChild(new MenuItem({
                    label: this.i18n.AddToSuperfile,
                    onClick: function (args) { dijit.byId(context.id + "AddtoDropDown").openDropDown() }
                }));
                pMenu.addChild(new MenuSeparator());
                {
                    var pSubMenu = new Menu();
                    this.menuFilterOwner = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "Owner", context.menuFilterOwner.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    this.menuFilterCluster = this.addMenuItem(pSubMenu, {
                        onClick: function (args) {
                            context.filter.clear();
                            context.filter.setValue(context.id + "ClusterTargetSelect", context.menuFilterCluster.get("hpcc_value"));
                            context.refreshGrid();
                        }
                    });
                    pSubMenu.addChild(new MenuSeparator());
                    this.menuFilterClearFilter = this.addMenuItem(pSubMenu, {
                        label: this.i18n.Clear,
                        onClick: function () {
                            context.filter.clear();
                            context.refreshGrid();
                        }
                    });

                    pMenu.addChild(new PopupMenuItem({
                        label: this.i18n.Filter,
                        popup: pSubMenu
                    }));
                }
                pMenu.startup();
            },

            checkReplicate: function (value, checkBoxValue) {
                WsTopology.TpGroupQuery({
                    request: {}
                }).then(function (response) {
                    if (lang.exists("TpGroupQueryResponse.TpGroups.TpGroup", response)) {
                        var arr = response.TpGroupQueryResponse.TpGroups.TpGroup;
                        for (var index in arr) {
                            if (arr[index].Name === value && arr[index].ReplicateOutputs === true) {
                                checkBoxValue.set("disabled", false);
                                break;
                            } else if (arr[index].Name === value) {
                                checkBoxValue.set("disabled", true);
                                break;
                            }
                        }
                    }
                });
            },

            initWorkunitsGrid: function () {
                var context = this;
                this.listStore = this.params.searchResults ? this.params.searchResults : new ESPLogicalFile.CreateLFQueryStore();
                this.treeStore = new ESPLogicalFile.CreateLFQueryTreeStore();
                this.workunitsGrid = new declare([ESPUtil.Grid(true, true)])({
                    deselectOnRefresh: true,
                    store: this.listStore,
                    query: this.getFilter(),
                    sort: [{ attribute: "Modified", "descending": true }],
                    columns: {
                        col1: selector({
                            width: 27,
                            disabled: function (item) {
                                return item ? item.__hpcc_isDir : true;
                            },
                            selectorType: 'checkbox'
                        }),
                        IsProtected: {
                            renderHeaderCell: function (node) {
                                node.innerHTML = Utility.getImageHTML("locked.png", context.i18n.Protected);
                            },
                            width: 25,
                            sortable: false,
                            formatter: function (_protected) {
                                if (_protected === true) {
                                    return Utility.getImageHTML("locked.png");
                                }
                                return "";
                            }
                        },
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
                        __hpcc_displayName: tree({
                            label: this.i18n.LogicalName,
                            formatter: function (name, row) {
                                if (row.__hpcc_isDir) {
                                    return name;
                                }
                                return (row.getStateImageHTML ? row.getStateImageHTML() + "&nbsp;" : "") + "<a href='#' class='dgrid-row-url'>" + name + "</a>";
                            },
                            renderExpando: function (level, hasChildren, expanded, object) {
                                var dir = this.grid.isRTL ? "right" : "left";
                                var cls = ".dgrid-expando-icon";
                                if (hasChildren) {
                                    cls += ".ui-icon.ui-icon-triangle-1-" + (expanded ? "se" : "e");
                                }
                                var node = put("div" + cls + "[style=margin-" + dir + ": " + (level * (this.indentWidth || 9)) + "px; float: " + dir + (!object.__hpcc_isDir && level === 0 ? ";display: none" : "") + "]");
                                node.innerHTML = "&nbsp;";
                                return node;
                            }
                        }),
                        Owner: { label: this.i18n.Owner, width: 72 },
                        SuperOwners: { label: this.i18n.SuperOwner, width: 150 },
                        Description: { label: this.i18n.Description, width: 153 },
                        NodeGroup: { label: this.i18n.Cluster, width: 108 },
                        RecordCount: { label: this.i18n.Records, width: 72 },
                        IntSize: {
                            label: this.i18n.Size, width: 100,
                            formatter: function (intsize, row) {
                                if (intsize === null) {
                                    return "0 Bytes";
                                } else {
                                    return Utility.convertedSize(intsize);
                                }
                            }
                        },
                        Parts: { label: this.i18n.Parts, width: 45 },
                        Modified: { label: this.i18n.ModifiedUTCGMT, width: 155 }
                    }
                }, this.id + "WorkunitsGrid");
                this.workunitsGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.workunitsGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.workunitsGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.workunitsGrid.on(".dgrid-row:contextmenu", function (evt) {
                    if (context._onRowContextMenu) {
                        var item = context.workunitsGrid.row(evt).data;
                        var cell = context.workunitsGrid.cell(evt);
                        var colField = cell.column.field;
                        var mystring = "item." + colField;
                        context._onRowContextMenu(item, colField, mystring);
                    }
                });
                this.workunitsGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                    var selection = context.workunitsGrid.getSelected();
                    if (selection.length > 0) {
                        context.downloadToList.set("disabled", false);
                    } else {
                        context.downloadToList.set("disabled", true);
                    }
                });
                ESPUtil.goToPageUserPreference(this.workunitsGrid, "DFUQueryWidget");
                this.workunitsGrid.startup();

                this.copyGrid.createGrid({
                    idProperty: "Name",
                    columns: {
                        targetCopyName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.renameGrid.createGrid({
                    idProperty: "Name",
                    columns: {
                        targetRenameName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });

                this.addToSuperfileGrid.createGrid({
                    idProperty: "Name",
                    columns: {
                        Name: {
                            label: this.i18n.LogicalName
                        }
                    }
                });

                this.desprayGrid.createGrid({
                    idProperty: "Name",
                    columns: {
                        Name: {
                            label: this.i18n.LogicalName
                        },
                        targetName: editor({
                            label: this.i18n.TargetName,
                            width: 144,
                            autoSave: true,
                            editor: "text"
                        })
                    }
                });
            },

            initFilter: function () {
                this.validateDialog = new Dialog({
                    title: this.i18n.Filter,
                    content: this.i18n.NoFilterCriteriaSpecified
                });
            },

            refreshGrid: function (clearSelection) {
                this.workunitsGrid.set("store", this.treeMode ? this.treeStore : this.listStore, this.getFilter());
                if (clearSelection) {
                    this.workunitsGrid.clearSelection();
                }
            },

            refreshActionState: function () {
                var selection = this.workunitsGrid.getSelected();
                var hasSelection = false;
                for (var i = 0; i < selection.length; ++i) {
                    hasSelection = true;
                }

                registry.byId(this.id + "Open").set("disabled", !hasSelection);
                registry.byId(this.id + "Delete").set("disabled", !hasSelection);
                registry.byId(this.id + "CopyDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "RenameDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "AddtoDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "AddtoDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "DesprayDropDown").set("disabled", !hasSelection);
                registry.byId(this.id + "FilterFilterDropDown").set("disabled", this.treeMode || this.params.searchResults);

                if (hasSelection) {
                    var context = this;
                    var data = [];
                    var matchedPrefix = [];
                    var filenames = {};
                    arrayUtil.forEach(selection, function (item, idx) {
                        if (item.Name) {
                            var nameParts = item.Name.split("::");
                            if (nameParts.length) {
                                var filename = nameParts[nameParts.length - 1];
                                filenames[filename] = true;
                            }
                            if (idx === 0) {
                                matchedPrefix = nameParts.slice(0, nameParts.length - 1);
                            } else {
                                var i = 0;
                                for (var i = 0; i < matchedPrefix.length && i < nameParts.length - 1; ++i) {
                                    if (matchedPrefix[i] !== nameParts[i]) {
                                        break;
                                    }
                                }
                                matchedPrefix = matchedPrefix.slice(0, i);
                            }
                            lang.mixin(item, {
                                targetName: nameParts[nameParts.length - 1],
                                targetCopyName: item.Name + "_copy",
                                targetRenameName: item.Name + "_rename"
                            });
                            data.push(item);
                        }
                    });
                    var superfileName = "superfile";
                    var i = 1;
                    while (filenames[superfileName]) {
                        superfileName = "superfile_" + i++;
                    }
                    registry.byId(this.id + "AddToSuperfileTargetName").set("value", matchedPrefix.join("::") + "::" + superfileName);
                    this.copyGrid.setData(data);
                    this.renameGrid.setData(data);
                    this.addToSuperfileGrid.setData(data);
                    this.desprayGrid.setData(data);
                }
            },

            ensureDFUWUPane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.Wuid,
                        closable: true,
                        delayWidget: "DFUWUDetailsWidget",
                        _hpccParams: params
                    });
                    this.addChild(retVal, 1);
                }
                return retVal;
            },

            ensureLFPane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    if (params.isSuperfile) {
                        retVal = new DelayLoadWidget({
                            id: id,
                            title: params.Name,
                            closable: true,
                            delayWidget: "SFDetailsWidget",
                            _hpccParams: {
                                Name: params.Name
                            }
                        });
                    } else {
                        retVal = new DelayLoadWidget({
                            id: id,
                            title: params.Name,
                            closable: true,
                            delayWidget: "LFDetailsWidget",
                            _hpccParams: {
                                NodeGroup: params.NodeGroup,
                                Name: params.Name
                            }
                        });
                    }
                    this.addChild(retVal, 1);
                }
                return retVal;
            }

        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/FilterDropDownWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/FilterDropDownWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/FilterDropDownWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"),

    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm, on, domStyle,
    registry, Select, CheckBox,
    _Widget, Utility,
    template) {
        return declare("FilterDropDownWidget", [_Widget], {
            templateString: template,
            baseClass: "FilterDropDownWidget",
            i18n: nlsHPCC,

            _width: "100%",
            iconFilter: null,
            filterDropDown: null,
            filterForm: null,
            filterLabel: null,
            filterMessage: null,
            tableContainer: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filterDropDown = registry.byId(this.id + "FilterDropDown");
                this.filterForm = registry.byId(this.id + "FilterForm");
                this.filterLabel = registry.byId(this.id + "FilterLabel");
                this.tableContainer = registry.byId(this.id + "TableContainer");
                this.filterApply = registry.byId(this.id + "FilterApply");
                this.filterClear = registry.byId(this.id + "FilterClear");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.iconFilter = dom.byId(this.id + "IconFilter");
            },

            //  Hitched actions  ---
            _onFilterClear: function (event) {
                this.emit("clear");
                this.clear();
            },

            _onFilterApply: function (event) {
                this.filterDropDown.closeDropDown();
                this.emit("apply");
                this.refreshState();
            },

            //  Implementation  ---
            clear: function () {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    if (item instanceof Select) {
                        item.set("value", "");
                    } else {
                        item.set("value", null);
                    }
                });
            },

            setValue: function (id, value) {
                registry.byId(id).set("value", value);
                this.refreshState();
            },

            setFilterMessage: function (value) {
                dom.byId("FilterMessage").textContent = value;
                this.refreshState();
            },

            exists: function () {
                var filter = this.toObject();
                for (var key in filter) {
                    if (filter[key] !== "") {
                        return true;
                    }
                }
                return false;
            },

            toObject: function () {
                if (this.filterDropDown.get("disabled")) {
                    return {};
                }
                var retVal = {};
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var name = item.get("name");
                    if (name) {
                        var value = item.get("value");
                        if (value) {
                            retVal[name] = value;
                        }
                    }
                });
                return retVal;
            },

            fromObject: function (obj) {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var value = obj[item.get("name")];
                    if (value) {
                        item.set("value", value);
                        if (item.defaultValue !== undefined) {
                            item.defaultValue = value;
                        }
                    }
                });
                this.refreshState();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;
            },

            open: function (event) {
                this.filterDropDown.focus();
                this.filterDropDown.openDropDown();
            },

            close: function (event) {
                this.filterDropDown.closeDropDown();
            },

            disable: function (disable) {
                this.filterDropDown.set("disabled", disable);
            },

            reset: function (disable) {
                this.filterForm.reset();
            },

            refreshState: function () {
                if (this.exists()) {
                    this.iconFilter.src = Utility.getImageURL("filter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.params.ownLabel !== undefined && this.params.ownLabel !== null ? this.params.ownLabel : this.i18n.FilterSet;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "bold"
                    });
                } else {
                    this.iconFilter.src = Utility.getImageURL("noFilter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.i18n.Filter;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "normal"
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/SelectionGridWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/SelectionGridWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dojo/text!../templates/SelectionGridWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, editor, selector, ColumnResizer, DijitRegistry,
    _Widget,
    template) {
        return declare("SelectionGridWidget", [_Widget], {
            templateString: template,
            store: null,
            idProperty: "Change Me",

            constructor: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            //  Implementation ---
            createGrid: function (args) {
                this.idProperty = args.idProperty;
                var store = new Memory({
                    idProperty: this.idProperty,
                    data: []
                });
                this.store = Observable(store);

                this.grid = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry])({
                    store: this.store,
                    columns: args.columns
                }, this.id + "Grid");
            },

            setData: function (data) {
                this.store.setData(data);
                this.grid.refresh();
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

/***/ "./lib/src/WsTopology.js":
/*!*******************************!*\
  !*** ./lib/src/WsTopology.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Deferred, Memory, Observable, QueryResults, Evented, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var TpLogFileStore = declare([Memory, Evented], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        query: function (query, options) {
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            function nextItem(itemParts) {
                var part = "";
                while (itemParts.length && part.trim() === "") {
                    part = itemParts[0];
                    itemParts.shift();
                }
                return part;
            }
            if (!query.Name) {
                deferredResults.resolve([]);
                deferredResults.total.resolve(0);
            }
            else {
                TpLogFile({
                    request: lang.mixin({}, query, {
                        PageNumber: options.start / options.count
                    })
                }).then(lang.hitch(this, function (response) {
                    var data = [];
                    if (lang.exists("TpLogFileResponse.LogData", response)) {
                        this.lastPage = response.TpLogFileResponse.LogData;
                        this.emit("pageLoaded", this.lastPage);
                        arrayUtil.forEach(response.TpLogFileResponse.LogData.split("\n"), function (item, idx) {
                            if (options.start === 0 || idx > 0) {
                                //  Throw away first line as it will probably only be a partial line  ---
                                var itemParts = item.split(" ");
                                var lineNo, date, time, pid, tid, details;
                                if (itemParts.length)
                                    lineNo = nextItem(itemParts);
                                if (itemParts.length)
                                    date = nextItem(itemParts);
                                if (itemParts.length)
                                    time = nextItem(itemParts);
                                if (itemParts.length)
                                    pid = nextItem(itemParts);
                                if (itemParts.length)
                                    tid = nextItem(itemParts);
                                if (itemParts.length)
                                    details = itemParts.join(" ");
                                data.push({
                                    __hpcc_id: response.TpLogFileResponse.PageNumber + "_" + idx,
                                    lineNo: lineNo,
                                    date: date,
                                    time: time,
                                    pid: pid,
                                    tid: tid,
                                    details: details
                                });
                            }
                        }, this);
                    }
                    this.setData(data);
                    if (lang.exists("TpLogFileResponse.TotalPages", response)) {
                        deferredResults.total.resolve(response.TpLogFileResponse.TotalPages * options.count);
                    }
                    else {
                        deferredResults.total.resolve(data.length);
                    }
                    return deferredResults.resolve(this.data);
                }));
            }
            return QueryResults(deferredResults);
        }
    });
    function TpServiceQuery(params) {
        lang.mixin(params.request, {
            Type: "ALLSERVICES"
        });
        return ESPRequest.send("WsTopology", "TpServiceQuery", params);
    }
    exports.TpServiceQuery = TpServiceQuery;
    function TpClusterQuery(params) {
        lang.mixin(params.request, {
            Type: "ROOT"
        });
        return ESPRequest.send("WsTopology", "TpClusterQuery", params);
    }
    exports.TpClusterQuery = TpClusterQuery;
    function GetESPServiceBaseURL(type) {
        var deferred = new Deferred();
        this.TpServiceQuery({}).then(function (response) {
            var retVal = ESPRequest.getURL({
                port: window.location.protocol === "https:" ? 18002 : 8002,
                pathname: ""
            });
            if (lang.exists("TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer", response)) {
                arrayUtil.forEach(response.TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer, function (item, idx) {
                    if (lang.exists("TpBindings.TpBinding", item)) {
                        arrayUtil.forEach(item.TpBindings.TpBinding, function (binding, idx) {
                            if (binding.Service === type && binding.Protocol + ":" === location.protocol) {
                                retVal = ESPRequest.getURL({
                                    port: binding.Port,
                                    pathname: ""
                                });
                                return true;
                            }
                        });
                    }
                    if (retVal !== "")
                        return true;
                });
            }
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }
    exports.GetESPServiceBaseURL = GetESPServiceBaseURL;
    exports.WsEclURL = "";
    function GetWsEclURL(type) {
        var deferred = new Deferred();
        if (this.WsEclURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclURL = response + "/WsEcl/";
                deferred.resolve(context.WsEclURL + type + "/query/");
            });
        }
        else {
            deferred.resolve(this.WsEclURL + type + "/query/");
        }
        return deferred.promise;
    }
    exports.GetWsEclURL = GetWsEclURL;
    exports.WsEclIFrameURL = "";
    function GetWsEclIFrameURL(type) {
        var deferred = new Deferred();
        if (this.WsEclIFrameURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclIFrameURL = response + dojoConfig.urlInfo.basePath + "/stub.htm?Widget=IFrameWidget&src=" + encodeURIComponent("/WsEcl/");
                deferred.resolve(context.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
            });
        }
        else {
            deferred.resolve(this.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
        }
        return deferred.promise;
    }
    exports.GetWsEclIFrameURL = GetWsEclIFrameURL;
    function TpTargetClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpTargetClusterQuery", params);
    }
    exports.TpTargetClusterQuery = TpTargetClusterQuery;
    function TpGroupQuery(params) {
        return ESPRequest.send("WsTopology", "TpGroupQuery", params);
    }
    exports.TpGroupQuery = TpGroupQuery;
    function TpLogicalClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpLogicalClusterQuery", params).then(function (response) {
            var best = null;
            var hthor = null;
            if (lang.exists("TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster", response)) {
                arrayUtil.forEach(response.TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster, function (item, idx) {
                    if (!best) {
                        best = item;
                    }
                    if (item.Name.indexOf("hthor") !== -1) {
                        hthor = item;
                        return false;
                    }
                    else if (item.Name.indexOf("thor") !== -1) {
                        best = item;
                    }
                });
            }
            if (hthor) {
                response.TpLogicalClusterQueryResponse["default"] = hthor;
            }
            else if (best) {
                response.TpLogicalClusterQueryResponse["default"] = best;
            }
            else {
                response.TpLogicalClusterQueryResponse["default"] = null;
            }
            return response;
        });
    }
    exports.TpLogicalClusterQuery = TpLogicalClusterQuery;
    function TpClusterInfo(params) {
        return ESPRequest.send("WsTopology", "TpClusterInfo", params);
    }
    exports.TpClusterInfo = TpClusterInfo;
    function TpThorStatus(params) {
        return ESPRequest.send("WsTopology", "TpThorStatus", params);
    }
    exports.TpThorStatus = TpThorStatus;
    function TpGetServicePlugins(params) {
        return ESPRequest.send("WsTopology", "TpGetServicePlugins", params);
    }
    exports.TpGetServicePlugins = TpGetServicePlugins;
    function TpDropZoneQuery(params) {
        return ESPRequest.send("WsTopology", "TpDropZoneQuery", params);
    }
    exports.TpDropZoneQuery = TpDropZoneQuery;
    function TpGetComponentFile(params) {
        params.handleAs = "text";
        return ESPRequest.send("WsTopology", "TpGetComponentFile", params);
    }
    exports.TpGetComponentFile = TpGetComponentFile;
    function TpLogFile(params) {
        return ESPRequest.send("WsTopology", "TpLogFile", params);
    }
    exports.TpLogFile = TpLogFile;
    function CreateTpLogFileStore() {
        var store = new TpLogFileStore();
        return Observable(store);
    }
    exports.CreateTpLogFileStore = CreateTpLogFileStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsTopology.js.map

/***/ }),

/***/ "./node_modules/dijit/Fieldset.js":
/*!****************************************!*\
  !*** ./node_modules/dijit/Fieldset.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
	__webpack_require__(/*! dojo/query!css2 */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./"),
	__webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
	__webpack_require__(/*! dojo/text!./templates/Fieldset.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html"),
	__webpack_require__(/*! ./a11yclick */ "./node_modules/dijit/a11yclick.js")	// template uses ondijitclick
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, query, TitlePane, template){


	return declare("dijit.Fieldset", TitlePane, {
		// summary:
		//		An accessible fieldset that can be expanded or collapsed via
		//		its legend.  Fieldset extends `dijit.TitlePane`.

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: 'dijitFieldset',

		// title: String
		//		Content of the legend tag. Overrides <legend> tag if not empty.
		title: '',

		// open: Boolean
		//		Whether fieldset is opened or closed.
		open: true,

		templateString: template,

		postCreate: function() {
			if(!this.title){
				var legends = query('legend', this.containerNode);
				if(legends.length) { // oops, no legend?
					this.set('title', legends[0].innerHTML);
					legends[0].parentNode.removeChild(legends[0]);
				}
			}

			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/ComboBox.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/form/ComboBox.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! ./ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
	__webpack_require__(/*! ./ComboBoxMixin */ "./node_modules/dijit/form/ComboBoxMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, ValidationTextBox, ComboBoxMixin){

	// module:
	//		dijit/form/ComboBox

	return declare("dijit.form.ComboBox", [ValidationTextBox, ComboBoxMixin], {
		// summary:
		//		Auto-completing text box
		//
		// description:
		//		The drop down box's values are populated from an class called
		//		a data provider, which returns a list of values based on the characters
		//		that the user has typed into the input box.
		//		If OPTION tags are used as the data provider via markup,
		//		then the OPTION tag's child text node is used as the widget value
		//		when selected.  The OPTION tag's value attribute is ignored.
		//		To set the default value when using OPTION tags, specify the selected
		//		attribute on 1 of the child OPTION tags.
		//
		//		Some of the options to the ComboBox are actually arguments to the data
		//		provider.
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUQueryWidget.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DFUQueryWidget.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Workunits\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.title_DFUQuery}\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}ImportDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.RemoteCopy}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}ImportForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-props=\"region: 'bottom'\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Source}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input name=\"sourceDali\" title=\"${i18n.Dali}:\" style=\"width:100%\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input name=\"srcusername\" title=\"${i18n.UserID}:\" style=\"width:100%\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input name=\"srcpassword\" title=\"${i18n.Password}:\" style=\"width:100%\" type=\"password\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input name=\"sourceLogicalName\" title=\"${i18n.LogicalName}:\" style=\"width:100%\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}ImportTargetSelect\" title=\"${i18n.Group}:\" name=\"destGroup\" style=\"width:100%\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input name=\"destLogicalName\" title=\"${i18n.LogicalName}:\" style=\"width:100%\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.Wrap}:\" name=\"Wrap\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}RemoteCopyReplicate\"title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input title=\"${i18n.RetainSuperfileStructure}:\" name=\"superCopy\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onImportOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}CopyDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Copy}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}CopyForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-props=\"region: 'bottom'\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}CopyTargetSelect\" title=\"${i18n.Group}:\" name=\"destGroup\" style=\"width:100%;\" data-dojo-type=\"TargetSelectWidget\" style=\"display: inline-block; vertical-align: middle\" />\n                                    </div>\n                                    <div id=\"${id}CopyGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}CopyTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetNoSplit\" title=\"${i18n.NoSplit}:\" name=\"nosplit\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetCompress\" title=\"${i18n.Compress}:\" name=\"compress\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetWrap\" title=\"${i18n.Wrap}:\" name=\"Wrap\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetRetainSuperfileStructure\" title=\"${i18n.RetainSuperfileStructure}:\" name=\"superCopy\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyPreserveCompression\" title=\"${i18n.PreserveCompression}:\" checked=\"true\" name=\"preserveCompression\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}CopyTargetReplicate\" title=\"${i18n.Replicate}:\" name=\"replicate\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onCopyOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Copy}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}RenameDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Rename}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}RenameForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div id=\"${id}RenameGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:1\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}RenameTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onRenameOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Rename}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}AddtoDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.AddToSuperfile}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}AddToSuperfileForm\" style=\"width:680px\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\" >\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}CreateNewSuperRadio\" title=\"${i18n.CreateANewFile}\" checked=\"true\" data-dojo-type=\"dijit.form.RadioButton\"></input>\n                                        <input id=\"${id}AddToSuperfileTargetName\" style=\"width:100%;\" name=\"Superfile\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                        <input id=\"${id}AddToSuperfileTargetAppend\" name=\"ExistingFile\" title=\"${i18n.AddToExistingSuperfile}\" data-dojo-type=\"dijit.form.RadioButton\"></input>\n                                    </div>\n                                    <div id=\"${id}AddToSuperfileGrid\" data-dojo-type=\"SelectionGridWidget\"></div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onAddToSuperfileOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}DesprayDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Despray}</span>\n                        <div id=\"${id}DesprayTooltipDialog\" data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}DesprayForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Target}</legend>\n                                    <div data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}DesprayTargetSelect\" title=\"${i18n.DropZone}:\" name=\"destGroup\" style=\"width: 100%;\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}DesprayTargetIPAddress\" title=\"${i18n.IPAddress}:\" name=\"destIP\" style=\"width: 100%;\" required=\"true\" data-dojo-props=\"trim: true\" data-dojo-type=\"TargetSelectWidget\" />\n                                        <input id=\"${id}DesprayTargetPath\" title=\"${i18n.Path}:\" name=\"destPath\" required=\"false\" style=\"width: 100%;\" data-dojo-props=\"trim: true, readonly: false\" data-dojo-type=\"TargetComboBoxWidget\" />\n                                        <input id=\"${id}DesprayTargetSplitPrefix\" title=\"${i18n.SplitPrefix}:\" name=\"splitprefix\" style=\"width: 100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    </div>\n                                    <div id=\"${id}DesprayGrid\" data-dojo-type=\"SelectionGridWidget\">\n                                    </div>\n                                </div>\n                                <div data-dojo-type=\"dijit.Fieldset\">\n                                    <legend>${i18n.Options}</legend>\n                                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                                        <input id=\"${id}DesprayTargetOverwrite\" title=\"${i18n.Overwrite}:\" name=\"overwrite\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                        <input id=\"${id}DesprayTargetUseSingleConnection\" title=\"${i18n.UseSingleConnection}:\" name=\"SingleConnection\" data-dojo-type=\"dijit.form.CheckBox\" />\n                                    </div>\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onDesprayOk\" data-dojo-type=\"dijit.form.Button\">${i18n.Despray}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <input id=\"${id}Name\" title=\"${i18n.Name}:\" name=\"LogicalName\" colspan=\"2\" style=\"width:100%;\" data-dojo-props=\"trim: true, placeHolder:'${i18n.somefile}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Description\" title=\"${i18n.Description}:\" name=\"Description\" colspan=\"2\" style=\"width:100%;\" data-dojo-props=\"trim: true, placeHolder:'${i18n.SomeDescription}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Owner\" title=\"${i18n.Owner}:\" name=\"Owner\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.JSmith}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}Index\" title=\"${i18n.Index}:\" value=\"key\" name=\"ContentType\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.CheckBox\" />\n                        <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"NodeGroup\" colspan=\"2\" style=\"display: inline-block; vertical-align: middle\" data-dojo-type=\"TargetSelectWidget\" />\n                        <input id=\"${id}FromSize\" title=\"${i18n.FromSizes}:\" name=\"FileSizeFrom\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'4096'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <input id=\"${id}ToSize\" title=\"${i18n.ToSizes}:\" name=\"FileSizeTo\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'16777216'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <select id=\"${id}FileType\" title=\"${i18n.FileType}:\" name=\"FileType\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                            <option value=\"\" selected=\"selected\">${i18n.LogicalFilesAndSuperfiles}</option>\n                            <option value=\"Logical Files Only\">${i18n.LogicalFilesOnly}</option>\n                            <option value=\"Superfiles Only\">${i18n.SuperfilesOnly}</option>\n                            <option value=\"Not in Superfiles\">${i18n.NotInSuperfiles}</option>\n                        </select>\n                        <input id=\"${id}FirstN\" title=\"${i18n.FirstN}:\" name=\"FirstN\" colspan=\"2\" style=\"width:15%\" data-dojo-props=\"trim: true, placeHolder:'-1'\" data-dojo-type=\"dijit.form.TextBox\" />\n                        <select id=\"${id}Sortby\" title=\"\" name=\"Sortby\" colspan=\"2\" data-dojo-type=\"dijit.form.Select\">\n                            <option value=\"Newest\" selected=\"selected\">${i18n.Newest}</option>\n                            <option value=\"Oldest\">${i18n.Oldest}</option>\n                            <option value=\"Smallest\">${i18n.Smallest}</option>\n                            <option value=\"Largest\">${i18n.Largest}</option>\n                        </select>\n                        <input id=\"${id}FromDate\" title=\"${i18n.FromDate}:\" name=\"StartDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                        <input id=\"${id}FromTime\" title=\"\" name=\"FromTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 AM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n                        <input id=\"${id}ToDate\" title=\"${i18n.ToDate}:\" name=\"EndDate\" data-dojo-props=\"trim: true, placeHolder:'7/28/2013'\" data-dojo-type=\"dijit.form.DateTextBox\" />\n                        <input id=\"${id}ToTime\" title=\"\" name=\"ToTime\" data-dojo-props=\"trim: true, placeHolder:'7:30 PM'\" data-dojo-type=\"dijit.form.TimeTextBox\" />\n                    </div>\n                    <div id=\"${id}Tree\" data-dojo-attach-event=\"onClick:_onTree\" data-dojo-props=\"iconClass:'iconFolderTree', showLabel:false\" data-dojo-type=\"dijit.form.ToggleButton\">${i18n.ViewByScope}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <img src=\"${dojoConfig.urlInfo.resourcePath}/img/person.png\" style=\"vertical-align: middle\" alt=\"${i18n.Mine}\">\n                    <label for=\"Mine\" class=\"bold\" style=\"vertical-align: middle;\">${i18n.Mine}</label>\n                    <input id=\"${id}Mine\" name=\"Owner\" title=\"${i18n.Mine}\" data-dojo-attach-event=\"onChange:_onMine\" data-dojo-type=\"dijit.form.CheckBox\"/>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                     <div id=\"${id}DownloadToList\" class=\"right\" data-dojo-attach-event=\"onClick:_onDownloadToList\" data-dojo-type=\"dijit.form.Button\">\n                        <span>${i18n.DownloadToCSV}</span>\n                    </div>\n                </div>\n                <div id=\"${id}WorkunitsGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}WorkunitsGrid\">\n                    </div>\n                </div>\n                <div id=\"${id}DownloadToListDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.ExportSelectionsToList}\">\n                    <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                        <input id=\"${id}FileName\" title=\"${i18n.FileName}:\" name=\"FileName\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <div class=\"dijitDialogPaneActionBar\">\n                        <button id=\"${id}onDownloadSubmit\" data-dojo-attach-event=\"onClick:_buildCSV\" class=\"bottomFormButtons\" data-dojo-type=\"dijit.form.Button\">${i18n.Submit}</button>\n                        <button class=\"bottomFormButtons\" data-dojo-attach-event=\"onClick:_onDownloadToListCancelDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/SelectionGridWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" style=\"width: 100%; height: 280px\" data-dojo-props=\"splitter: false, gutters: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ContentPane\" style=\"padding: 0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Grid\" style=\"margin: 1px\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Fieldset.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fieldset>\n\t<legend data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tdata-dojo-attach-point=\"titleBarNode, titleNode\">\n\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t><span data-dojo-attach-point=\"titleNode, focusNode\" class=\"dijitFieldsetLegendNode\" id=\"${id}_titleNode\"></span>\n\t</legend>\n\t<div class=\"dijitFieldsetContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitFieldsetContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\"\n\t\t\t\t \tid=\"${id}_pane\" aria-labelledby=\"${id}_titleNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</fieldset>\n"

/***/ })

}]);