(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/PackageMapQueryWidget":"./eclwatch/PackageMapQueryWidget.js",
	"src/ESPPackageProcess":"./lib/src/ESPPackageProcess.js",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/PackageMapQueryWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapQueryWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[131],{

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

/***/ "./eclwatch/PackageMapQueryWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/PackageMapQueryWidget.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/data/ObjectStore */ "./node_modules/dojo/data/ObjectStore.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),

    __webpack_require__(/*! dijit/layout/_LayoutWidget */ "./node_modules/dijit/layout/_LayoutWidget.js"),
    __webpack_require__(/*! dijit/_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
    __webpack_require__(/*! dijit/_WidgetsInTemplateMixin */ "./node_modules/dijit/_WidgetsInTemplateMixin.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! dojox/form/Uploader */ "./node_modules/dojox/form/Uploader.js"),
    __webpack_require__(/*! dojox/form/uploader/FileList */ "./node_modules/dojox/form/uploader/FileList.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! hpcc/PackageMapValidateWidget */ "./eclwatch/PackageMapValidateWidget.js"),
    __webpack_require__(/*! src/WsPackageMaps */ "./lib/src/WsPackageMaps.js"),
    __webpack_require__(/*! src/ESPPackageProcess */ "./lib/src/ESPPackageProcess.js"),
    __webpack_require__(/*! hpcc/SFDetailsWidget */ "./eclwatch/SFDetailsWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/PackageMapQueryWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapQueryWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domConstruct, domForm, ObjectStore, on, topic,
    _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, registry,
    selector,
    Uploader, FileUploader,
    _TabContainerWidget, DelayLoadWidget, PackageMapValidateWidget, WsPackageMaps, ESPPackageProcess, SFDetailsWidget, ESPUtil, FilterDropDownWidget,
    template) {
        return declare("PackageMapQueryWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "PackageMapQueryWidget",
            i18n: nlsHPCC,
            packagesTab: null,
            packagesGrid: null,
            tabMap: [],
            addPackageMapDialog: null,
            validateTab: null,
            validateTabInitialized: false,
            filter: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.tabContainer = registry.byId(this.id + "TabContainer");
                this.packagesTab = registry.byId(this.id + "_Packages");
                this.packagesGrid = registry.byId(this.id + "PackagesGrid");
                this.targetSelect = registry.byId(this.id + "TargetSelect");
                this.processSelect = registry.byId(this.id + "ProcessSelect");
                this.processSelectFilter = registry.byId(this.id + "ProcessFilterSelect");
                this.addPackageTargetSelect = registry.byId(this.id + "AddProcessMapTargetSelect");
                this.addPackageProcessSelect = registry.byId(this.id + "AddProcessMapProcessSelect");
                this.addPackageProcessFilter = registry.byId(this.id + "AddProcessMapProcessFilter");
                this.addPackageMapDialog = registry.byId(this.id + "AddProcessMapDialog");
                this.filter = registry.byId(this.id + "Filter");
            },

            onRowDblClick: function (item) {
                var tab = this.showPackageMapDetails(item.Id, {
                    target: item.Target,
                    process: item.Process,
                    active: item.Active,
                    packageMap: item.Id
                });
                this.tabContainer.selectChild(tab);
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            _onOpen: function (event) {
                var selections = this.packagesGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensurePane(selections[i].Id, {
                        target: selections[i].Target,
                        process: selections[i].Process,
                        active: selections[i].Active,
                        packageMap: selections[i].Id
                    });
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab);
                }
            },

            _onAdd: function (event) {
                this.addPackageMapDialog.show();

                var context = this;
                var addPackageMapUploader = registry.byId(this.id + "AddProcessMapFileUploader");
                dojo.connect(addPackageMapUploader, "onComplete", this, function (e) {
                    registry.byId(this.id + "AddProcessMapDialogSubmit").set('disabled', false);
                    return context.addPackageMapCallback();
                });
                dojo.connect(addPackageMapUploader, "onBegin", this, function (e) {
                    registry.byId(this.id + "AddProcessMapDialogSubmit").set('disabled', true);
                    return;
                });
                var addPackageMapSubmitButton = registry.byId(this.id + "AddProcessMapDialogSubmit");
                dojo.connect(addPackageMapSubmitButton, "onClick", this, function (e) {
                    return context._onAddPackageMapSubmit();
                });
                var addPackageMapCloseButton = registry.byId(this.id + "AddProcessMapDialogClose");
                dojo.connect(addPackageMapCloseButton, "onClick", this, function (e) {
                    this.addPackageMapDialog.onCancel();
                });
            },

            _onAddProcessMapIdKeyUp: function () {
                this._onCheckAddProcessMapInput();
            },

            _onCheckAddProcessMapInput: function () {
                var id = registry.byId(this.id + "AddProcessMapId").get('value');
                var files = registry.byId(this.id + "AddProcessMapFileUploader").getFileList();
                if (files.length > 1) {
                    alert(this.i18n.Only1PackageFileAllowed);
                    return;
                }
                var fileName = '';
                if (files.length > 0)
                    fileName = files[0].name;
                if ((fileName !== '') && (id === '')) {
                    registry.byId(this.id + "AddProcessMapId").set('value', fileName);
                    registry.byId(this.id + "AddProcessMapDialogSubmit").set('disabled', false);
                } else if ((id === '') || (files.length < 1))
                    registry.byId(this.id + "AddProcessMapDialogSubmit").set('disabled', true);
                else
                    registry.byId(this.id + "AddProcessMapDialogSubmit").set('disabled', false);
            },

            _onAddPackageMapSubmit: function () {
                var target = this.addPackageMapTargetSelect.getValue();
                var id = registry.byId(this.id + "AddProcessMapId").get('value');
                var process = this.addPackageMapProcessSelect.getValue();
                var daliIp = registry.byId(this.id + "AddProcessMapDaliIP").get('value');
                var activate = registry.byId(this.id + "AddProcessMapActivate").get('checked');
                var overwrite = registry.byId(this.id + "AddProcessMapOverWrite").get('checked');
                if ((id === '') || (target === ''))
                    return false;
                if ((process === '') || (process === this.i18n.ANY))
                    process = '*';

                var action = "/WsPackageProcess/AddPackage?upload_&PackageMap=" + id + "&Target=" + target;
                if (process !== '')
                    action += "&Process=" + process;
                if (daliIp !== '')
                    action += "&DaliIp=" + daliIp;
                if (activate)
                    action += "&Activate=1";
                else
                    action += "&Activate=0";
                if (overwrite)
                    action += "&OverWrite=1";
                else
                    action += "&OverWrite=0";
                var theForm = registry.byId(this.id + "AddProcessMapForm");
                if (theForm === undefined)
                    return false;
                theForm.set('action', action);
                return true;
            },

            _onDelete: function (event) {
                var context = this;
                var selection = this.packagesGrid.getSelected();

                if (confirm(this.i18n.DeleteSelectedPackages)) {
                    arrayUtil.forEach(selection, function (item, idx) {
                        WsPackageMaps.deletePackageMap({
                            request: {
                                PackageMap: item.Id,
                                Target: item.Target,
                                Process: item.Process
                            }
                        }).then(function(response){
                            if (lang.exists("DeletePackageResponse.status", response)) {
                                if (response.DeletePackageResponse.status.Code === 0) {
                                    context.refreshGrid();
                                }
                            }
                        });
                    });
                }
            },

            _onActivate: function (event) {
                var context = this;
                var selection = this.packagesGrid.getSelected();

                WsPackageMaps.activatePackageMap({
                    request: {
                        Target: selection[0].Target,
                        Process: selection[0].Process,
                        PackageMap: selection[0].Id
                    }
                }).then(function (response){
                    if (lang.exists("ActivatePackageResponse.status", response)) {
                        if (response.ActivatePackageResponse.status.Code === 0) {
                            context.refreshGrid();
                        }
                    }
                });
            },
            _onDeactivate: function (event) {
                var context = this;
                var selection = this.packagesGrid.getSelected();

                WsPackageMaps.deactivatePackageMap({
                    request: {
                        Target: selection[0].Target,
                        Process: selection[0].Process,
                        PackageMap: selection[0].Id
                    }
                }).then(function (response){
                    if (lang.exists("DeActivatePackageResponse.status", response)) {
                        if (response.DeActivatePackageResponse.status.Code === 0) {
                            context.refreshGrid();
                        }
                    }
                });
            },

            showErrors: function (err) {
                topic.publish("hpcc/brToaster", {
                    Severity: "Error",
                    Source: err.message,
                    Exceptions: [{ Message: err.stack }]
                });
            },

            addProcessSelections: function (processSelect, processes, processData) {
                for (var i = 0; i < processData.length; ++i) {
                    var process = processData[i];
                    if ((processes != null) && (processes.indexOf(process) !== -1))
                        continue;
                    processes.push(process);
                    processSelect.options.push({ label: process, value: process });
                }
            },

            init: function (params) {
                var context = this;
                if (this.inherited(arguments))
                    return;

                this.params = params;

                this.targetSelect.init({
                    GetPackageMapTargets: true
                });
                
                this.processSelect.init({
                    GetPackageMapProcesses: true
                });

                this.processSelectFilter.init({
                    GetPackageMapProcessFilter: true
                })

                this.addPackageTargetSelect.init({
                    GetPackageMapTargets: true
                });

                this.addPackageProcessSelect.init({
                    GetPackageMapProcesses: true
                });

                this.initPackagesGrid();

                this.filter.on("clear", function (evt) {
                    context._onFilterType();
                    context.refreshHRef();
                    context.refreshGrid();
                });
                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    context.refreshGrid();
                });
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.packagesTab.id) {
                    } else {
                        if (!currSel.initalized) {
                            currSel.init(currSel.params);
                        }
                    }
                }
            },

            initValidateTab: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = new DelayLoadWidget({
                    id: id,
                    title: params.title,
                    closable: false,
                    delayWidget: "PackageMapValidateWidget",
                    params: params
                });
                this.tabContainer.addChild(retVal, 1);
                return retVal;
            },

            initPackagesGrid: function () {
                var context = this;
                this.store = ESPPackageProcess.CreatePackageMapQueryObjectStore();
                this.packagesGrid = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    query: this.getFilter(),
                    columns: {
                        col1: selector({
                            width: 27,
                            selectorType: 'checkbox'
                        }),
                        Id: {
                            width: "40%",
                            sortable: false,
                            label: this.i18n.PackageMap,
                            formatter: function (Id, idx) {
                                return "<a href='#' class='dgrid-row-url'>" + Id + "</a>";
                            }
                        },
                        Target: {
                            width: "15%",
                            sortable: false,
                            label: this.i18n.Target
                        },
                        Process: {
                            width: "15%",
                            sortable: false,
                            label: this.i18n.ProcessFilter
                        },
                        Active: {
                            width: "10%",
                            sortable: false,
                            label: this.i18n.Active,
                            formatter: function (active) {
                                if (active === true) {
                                    return "A";
                                }
                                return "";
                            }
                        },
                        Description: {
                            width: "20%",
                            sortable: false,
                            label: this.i18n.Description,
                        }
                    }
                }, this.id + "PackagesGrid");

                this.packagesGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.packagesGrid.row(evt).data;
                        context._onRowDblClick(item.Id, item.Target, item.Process, item.Active);
                    }
                });
                this.packagesGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.packagesGrid.row(evt).data;
                        context._onRowDblClick(item.Id, item.Target, item.Process, item.Active);
                    }
                });

                this.packagesGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                });

                this.packagesGrid.startup();
            },

            _onRowDblClick: function (id, target, process, active) {
                var packageTab = this.ensurePane(id, {
                    target: target,
                    process: process,
                    active: active,
                    packageMap: id
                });
                this.selectChild(packageTab);
            },

            getFilter: function () {
                return {
                    Target: this.targetSelect.getValue(),
                    Process: this.processSelect.getValue(),
                    ProcessFilter: this.processSelectFilter.getValue()
                };
            },

            refreshGrid: function (clearSelection) {
                this.packagesGrid.set("query", this.getFilter());
                if (clearSelection) {
                    this.packagesGrid.clearSelection();
                }
            },

            refreshActionState: function () {
                var selection = this.packagesGrid.getSelected();
                var hasSelection = (selection.length > 0);
                registry.byId(this.id + "Open").set("disabled", !hasSelection);
                registry.byId(this.id + "Delete").set("disabled", !hasSelection);
                registry.byId(this.id + "Activate").set("disabled", selection.length !== 1);
                registry.byId(this.id + "Deactivate").set("disabled", selection.length !== 1);
            },

            packageMapDeleted: function (tabId) {
                if (this.tabMap[tabId] == null)
                    return;
                this.tabContainer.removeChild(this.tabMap[tabId]);
                this.tabMap[tabId].destroyRecursive();
                delete this.tabMap[tabId];

                this.tabContainer.selectChild(this.packagesTab);
                this.packagesGrid.rowSelectCell.toggleAllSelection(false);
                this.refreshGrid();
            },

            addPackageMapCallback: function (event) {
                this.addPackageMapDialog.onCancel();
                this.refreshGrid();
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    var context = this;
                    retVal = new DelayLoadWidget({
                        id: id,
                        title: params.packageMap,
                        closable: true,
                        delayWidget: "PackageMapDetailsWidget",
                        params: params
                    });
                    this.addChild(retVal, 1);
                }
                return retVal;
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ESPPackageProcess.js":
/*!**************************************!*\
  !*** ./lib/src/ESPPackageProcess.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, Observable, nlsHPCC, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = declare([ESPRequest.Store], {
        i18n: nlsHPCC,
        service: "WsPackageProcess",
        action: "ListPackages",
        responseQualifier: "ListPackagesResponse.PackageMapList.PackageListMapData",
        idProperty: "Id",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        SortbyProperty: 'SortBy'
    });
    function CreatePackageMapQueryObjectStore(options) {
        var store = new Store(options);
        return Observable(store);
    }
    exports.CreatePackageMapQueryObjectStore = CreatePackageMapQueryObjectStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPPackageProcess.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/PackageMapQueryWidget.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/PackageMapQueryWidget.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Packages\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.PackageMaps}\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Reload}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}AddNew\" data-dojo-attach-event=\"onClick:_onAdd\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</div>\n                    <div id=\"${id}Delete\" data-dojo-attach-event=\"onClick:_onDelete\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Activate\" data-dojo-attach-event=\"onClick:_onActivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Activate}</div>\n                    <div id=\"${id}Deactivate\" data-dojo-attach-event=\"onClick:_onDeactivate\" data-dojo-type=\"dijit.form.Button\">${i18n.Deactivate}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\" style=\"width:50%\">\n                        <div id=\"${id}TargetSelect\" title=\"${i18n.Target}:\" name=\"Target\" colspan=\"2\" style=\"width:50%\" data-dojo-type=\"TargetSelectWidget\"></div>\n                        <div id=\"${id}ProcessSelect\" title=\"${i18n.Process}:\" name=\"Process\" colspan=\"2\" style=\"width:50%\" data-dojo-type=\"TargetSelectWidget\"></div>\n                        <div id=\"${id}ProcessFilterSelect\" title=\"${i18n.ProcessFilter}:\" name=\"ProcessFilter\" colspan=\"2\" style=\"width:50%\" data-dojo-type=\"TargetSelectWidget\"></div>\n                    </div>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}PackageMapsGridCP\" style=\"border:0px; padding: 0px; border-color:none\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}PackagesGrid\"></div>\n                </div>\n                <div id=\"${id}AddProcessMapDialog\" data-dojo-type=\"dijit.Dialog\" data-dojo-id=\"${id}AddProcessMapDialog\" title=\"${i18n.AddProcessMap}\">\n                    <div data-dojo-type=\"dijit.form.Form\" id=\"${id}AddProcessMapForm\" data-dojo-id=\"${id}AddProcessMapForm\" method=\"post\" enctype=\"multipart/form-data\" >\n                       <table id=\"${id}AddProcessMapTable\" class=\"dijitDialogPaneContentArea\">\n                            <tr>\n                                <td><input id=\"${id}AddProcessMapFileUploader\" name=\"${id}AddProcessMapFileUploader\" multiple=\"false\" type=\"file\" data-dojo-type=\"dojox.form.Uploader\" data-dojo-attach-event=\"onChange:_onCheckAddProcessMapInput\" label=\"${i18n.SelectPackageFile}\"/></td>\n                            </tr>\n                            <tr>\n                                <td><div id=\"${id}AddProcessMapFileToUpload\" data-dojo-type=\"dojox.form.uploader.FileList\" data-dojo-props='uploaderId:\"${id}AddProcessMapFileUploader\"'>\n                                </div></td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapId\" style=\"width: 15em;\">${i18n.ID}:</label></td>\n                                <td><input name=\"${id}AddProcessMapId\" id=\"${id}AddProcessMapId\" data-dojo-attach-event=\"onKeyUp:_onAddProcessMapIdKeyUp\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\"</td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapTargetSelect\">${i18n.Target}:</label></td>\n                                <td><div id=\"${id}AddProcessMapTargetSelect\" name=\"${id}AddProcessMapTargetSelect\" data-dojo-type=\"TargetSelectWidget\">\n                                </div></td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapProcessSelect\">${i18n.ProcessFilter}:</label></td>\n                                <td>\n                                    <div id=\"${id}AddProcessMapProcessSelect\" name=\"${id}AddProcessMapProcessSelect\" data-dojo-type=\"TargetSelectWidget\">\n                                    </div>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapDaliIP\">${i18n.RemoteDaliIP}:</label></td>\n                                <td><input name=\"${id}AddProcessMapDaliIP\" id=\"${id}AddProcessMapDaliIP\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\"></td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapActivate\">${i18n.Activate}:</label></td>\n                                <td><input id=\"${id}AddProcessMapActivate\" name=\"${id}AddProcessMapActivate\" data-dojo-type=\"dijit.form.CheckBox\" value=\"\" checked/></td>\n                            </tr>\n                            <tr>\n                                <td><label for=\"${id}AddProcessMapOverWrite\">${i18n.Overwrite}:</label></td>\n                                <td><input id=\"${id}AddProcessMapOverWrite\" name=\"${id}AddProcessMapOverWrite\" data-dojo-type=\"dijit.form.CheckBox\" value=\"\"/></td>\n                            </tr>\n                            <tr>\n                                <td/>\n                                <td><input id=\"${id}AddProcessMapDialogSubmit\" type=\"submit\" label=\"${i18n.Submit}\" data-dojo-type=\"dijit.form.Button\"/>\n                                <input id=\"${id}AddProcessMapDialogClose\" type=\"button\" label=\"${i18n.Close}\" data-dojo-type=\"dijit.form.Button\"/></td>\n                            </tr>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);