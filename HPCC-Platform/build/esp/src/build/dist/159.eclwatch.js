(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/RequestInformationWidget":"./eclwatch/RequestInformationWidget.js",
	"hpcc/TopologyWidget":"./eclwatch/TopologyWidget.js",
	"src/ws_machine":"./lib/src/ws_machine.js",
	"dojo/text!templates/RequestInformationWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/RequestInformationWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[159],{

/***/ "./eclwatch/RequestInformationWidget.js":
/*!**********************************************!*\
  !*** ./eclwatch/RequestInformationWidget.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/RequestInformationWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/RequestInformationWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),

    __webpack_require__(/*! dojox/layout/TableContainer */ "./node_modules/dojox/layout/TableContainer.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domConstruct,
    registry,
    _TabContainerWidget,
    template) {
        return declare("RequestInformationWidget", [_TabContainerWidget], {
            i18n: nlsHPCC,
            templateString: template,
            baseClass: "RequestInformationWidget",

            requestInfoTab: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.requestInfoTab = registry.byId(this.id + "_RequestInfo");
                this.requestDetails = registry.byId(this.id + "_RequestDetails");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            init: function (params) {
                this.generateRequestInfo(params.RequestInfo);
            },

            _onRefresh: function (params) {

            },

            generateRequestInfo: function (params) {
                var table = domConstruct.create("table", {});
                for (var key in params) {
                    if (params[key] === true) {
                        params[key] = "enabled";
                    }
                    if (params[key] === false) {
                        params[key] = "disabled";
                    }

                    switch (key) {
                        case "SecurityString":
                        case "UserName":
                        case "Password":
                        case "Addresses":
                        case "EnableSNMP":
                        case "SortBy":
                        case "OldIP":
                        case "Path":
                        case "ClusterType":
                        case "Cluster":
                            break;
                        default:
                            var tr = domConstruct.create("tr", {}, table);
                            domConstruct.create("td", {
                                innerHTML: "<b>" + key + ":&nbsp;&nbsp;</b>"
                            }, tr);
                            domConstruct.create("td", {
                                innerHTML: params[key]
                            }, tr);
                    }
                }
                this.requestDetails.setContent(table);
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/TopologyWidget.js":
/*!************************************!*\
  !*** ./eclwatch/TopologyWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),

    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! hpcc/PreflightDetailsWidget */ "./eclwatch/PreflightDetailsWidget.js"),
    __webpack_require__(/*! hpcc/RequestInformationWidget */ "./eclwatch/RequestInformationWidget.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! src/ESPTopology */ "./lib/src/ESPTopology.js"),
    __webpack_require__(/*! hpcc/TopologyDetailsWidget */ "./eclwatch/TopologyDetailsWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! src/ws_machine */ "./lib/src/ws_machine.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, i18n, nlsHPCC, on, dom, domConstruct, lang,
    CheckBox, TextBox, ValidationTextBox, registry, ToggleButton, Select, ToolbarSeparator, ContentPane,
    tree, selector,
    GridDetailsWidget, PreflightDetailsWidget, RequestInformationWidget, ESPRequest, ESPTopology, TopologyDetailsWidget, DelayLoadWidget, ESPUtil, FilterDropDownWidget, WsMachine, Utility) {
        return declare("TopologyWidget", [GridDetailsWidget], {

            i18n: nlsHPCC,
            gridTitle: nlsHPCC.title_Topology,
            idProperty: "__hpcc_id",
            filter: null,
            filterLoaded: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.detailsWidget = new TopologyDetailsWidget({
                    id: this.id + "Details",
                    region: "right",
                    splitter: true,
                    style: "width: 80%",
                    minSize: 240
                });
                this.detailsWidget.placeAt(this.gridTab, "last");
                this.filter = new FilterDropDownWidget({});
                this.filter.init({
                    ownLabel: this.i18n.MachineInformation
                });
            },

            init: function (params) {
                var context = this;
                if (this.inherited(arguments))
                    return;
                this.detailsWidget.requestInformationWidget.set("disabled", true);
                this.filter.disable(true);
                this.refreshGrid();

                this.filter.on("apply", function (evt) {
                    context.refreshHRef();
                    var selection = context.grid.getSelected();
                    var filter = context.getFilter();

                    var MachineInformationCount = 0;
                    var TargetClusterCount = 0;
                    for (var i = 0; i < selection.length; ++i) {
                        if (context.viewModeMachines.checked || context.viewModeServices.checked) {
                            var MachineInformationClean = "Addresses." + i;
                            MachineInformationCount++;

                            var request = {
                                Path: selection[i].__hpcc_treeItem.Path,
                                Cluster: selection[i].__hpcc_treeItem.Name,
                                AutoRefresh: filter.AutoRefresh,
                                MemThreshold: filter.MemThreshold,
                                CpuThreshold: filter.CpuThreshold,
                                MemThresholdType: filter.MemThreshold,
                                GetProcessorInfo: filter.GetProcessorInfo,
                                GetStorageInfo: filter.GetStorageInfo,
                                LocalFileSystemsOnly: filter.LocalFileSystemsOnly,
                                GetSoftwareInfo: filter.GetSoftwareInfo,
                                DiskThreshold: filter.DiskThreshold,
                                DiskThresholdType: filter.DiskThresholdType,
                                ApplyProcessFilter: filter.ApplyProcessFilter,
                                AddProcessesToFilter: filter.AddtionalProcessesToFilter,
                                cbAutoRefresh: filter.cbAutoRefresh
                            };

                            if (context.viewModeMachines.checked) {
                                filter[MachineInformationClean] = selection[i].getNetaddress() + "|:" + selection[i].__hpcc_treeItem.Type + ":" + selection[i].__hpcc_treeItem.Name + ":" + 2 + ":" + selection[i].__hpcc_treeItem.Directory + ":" + 0;
                            }
                            if (context.viewModeServices.checked) {
                                filter[MachineInformationClean] = selection[i].getNetaddress() + "|:" + selection[i].getNetaddress() + "|:" + selection[i].__hpcc_treeItem.Type + ":" + selection[i].__hpcc_treeItem.Name + ":" + 2 + ":" + selection[i].__hpcc_treeItem.Directory;
                            }

                            request[MachineInformationClean] = filter[MachineInformationClean];
                            request["Addresses.itemcount"] = MachineInformationCount;
                            WsMachine.GetMachineInfo({
                                request: request
                            }).then(function (response) {
                                var pfTab = context.ensureMIPane(response.GetMachineInfoResponse.Machines.MachineInfoEx[0].Address, {
                                    params: response.GetMachineInfoResponse
                                });
                                pfTab.init(response.GetMachineInfoResponse, "machines");
                            });
                        } else {
                            var TargetClustersClean = "TargetClusters." + i;
                            TargetClusterCount++;
                            filter[TargetClustersClean] = selection[i].__hpcc_treeItem.Type + ":" + selection[i].__hpcc_treeItem.Name;
                            var request = {
                                AutoRefresh: filter.AutoRefresh,
                                MemThreshold: filter.MemThreshold,
                                CpuThreshold: filter.CpuThreshold,
                                MemThresholdType: filter.MemThreshold,
                                GetProcessorInfo: filter.GetProcessorInfo,
                                GetStorageInfo: filter.GetStorageInfo,
                                LocalFileSystemsOnly: filter.LocalFileSystemsOnly,
                                GetSoftwareInfo: filter.GetSoftwareInfo,
                                DiskThreshold: filter.DiskThreshold,
                                DiskThresholdType: filter.DiskThresholdType,
                                ApplyProcessFilter: filter.ApplyProcessFilter,
                                AddProcessesToFilter: filter.AddtionalProcessesToFilter,
                                cbAutoRefresh: filter.cbAutoRefresh
                            };
                            request[TargetClustersClean] = filter[TargetClustersClean];
                            request["TargetClusters.itemcount"] = TargetClusterCount;
                            WsMachine.GetTargetClusterInfo({
                                request: request
                            }).then(function (response) {
                                if (lang.exists("GetTargetClusterInfoResponse", response)) {
                                    var pfTab = context.ensureTCPane(response.GetTargetClusterInfoResponse.TargetClusterInfoList.TargetClusterInfo[0].Name + response.GetTargetClusterInfoResponse.TimeStamp, {
                                        params: response.GetTargetClusterInfoResponse
                                    });
                                    context.detailsWidget.requestInformationWidget.set("disabled", false);
                                    context.detailsWidget.requestInformationWidget.init(response.GetTargetClusterInfoResponse);
                                    pfTab.init(response.GetTargetClusterInfoResponse, "cluster");
                                }
                            });
                        }
                    }
                });
            },

            resetFilter: function () {
                this.filter.filterForm.reset();
                this.filter.iconFilter.src = Utility.getImageURL("noFilter1.png");
                this.filter.disable(true);
            },

            createGrid: function (domID) {
                var context = this;
                this.openButton = registry.byId(this.id + "Open");
                dojo.destroy(this.id + "Open");
                this.filter.placeAt(this.openButton.domNode, "after");
                this.filter.filterForm.set("style", "width:600px;");
                this.filter.filterDropDown.set("label", context.i18n.MachineInformation);
                this.filter.filterClear.set("disabled", true);

                this.viewModeDebug = new ToggleButton({
                    showLabel: true,
                    checked: false,
                    style: { display: "none" },
                    onChange: function (val) {
                        if (val) {
                            context.viewModeMachines.set("checked", false);
                            context.viewModeServices.set("checked", false);
                            context.viewModeTargets.set("checked", false);
                            context.refreshGrid("Debug");
                            context.resetFilter();
                        }
                    },
                    label: "Debug"
                }).placeAt(this.openButton.domNode, "after");
                this.viewModeMachines = new ToggleButton({
                    showLabel: true,
                    checked: false,
                    onChange: function (val) {
                        if (val) {
                            context.viewModeDebug.set("checked", false);
                            context.viewModeServices.set("checked", false);
                            context.viewModeTargets.set("checked", false);
                            context.refreshGrid("Machines");
                            context.resetFilter();
                        }
                    },
                    label: this.i18n.ClusterProcesses
                }).placeAt(this.openButton.domNode, "after");
                this.viewModeServices = new ToggleButton({
                    showLabel: true,
                    checked: false,
                    onChange: function (val) {
                        if (val) {
                            context.viewModeDebug.set("checked", false);
                            context.viewModeMachines.set("checked", false);
                            context.viewModeTargets.set("checked", false);
                            context.refreshGrid("Services");
                            context.resetFilter();
                        }
                    },
                    label: this.i18n.SystemServers
                }).placeAt(this.openButton.domNode, "after");
                this.viewModeTargets = new ToggleButton({
                    showLabel: true,
                    checked: true,
                    onChange: function (val) {
                        if (val) {
                            context.viewModeDebug.set("checked", false);
                            context.viewModeMachines.set("checked", false);
                            context.viewModeServices.set("checked", false);
                            context.refreshGrid("Targets");
                            context.resetFilter();
                        }
                    },
                    label: this.i18n.TargetClusters
                }).placeAt(this.openButton.domNode, "after");

                new ToolbarSeparator().placeAt(this.openButton.domNode, "after");
                new ToolbarSeparator().placeAt(this.viewModeMachines.domNode, "after");

                this.machineInformationDropDown = this.createLabelAndElement("machineinformation", "Machine Information", "Select", this.i18n.MachineInformation, [{ label: this.i18n.MachineInformation, value: "GetMachineInfo", selected: true }])
                this.getProcessorInformation = this.createLabelAndElement("GetProcessorInfo", this.i18n.ProcessorInformation, "CheckBox");
                this.getStorageInformation = this.createLabelAndElement("GetStorageInfo", this.i18n.StorageInformation, "CheckBox");
                this.localFileSystemsOnly = this.createLabelAndElement("LocalFileSystemsOnly", this.i18n.LocalFileSystemsOnly, "CheckBox");
                this.getSoftwareInformation = this.createLabelAndElement("GetSoftwareInfo", this.i18n.GetSoftwareInformation, "CheckBox");
                this.showProcessesUsingFilter = this.createLabelAndElement("ApplyProcessFilter", this.i18n.ShowProcessesUsingFilter, "CheckBox");
                this.additionalProcessesFilter = this.createLabelAndElement("AddProcessesToFilter", this.i18n.AddtionalProcessesToFilter, "TextBox", this.i18n.AnyAdditionalProcessesToFilter);
                this.autoRefresh = this.createLabelAndElement("cbAutoRefresh", this.i18n.AutoRefresh, "CheckBox");
                this.autoRefreshEvery = this.createLabelAndElement("AutoRefresh", this.i18n.AutoRefreshIncrement, "TextBox", this.i18n.AutoRefreshEvery, 5);
                this.warnifcpuusageisover = this.createLabelAndElement("CpuThreshold", this.i18n.WarnIfCPUUsageIsOver, "TextBox", this.i18n.EnterAPercentage, 95);
                this.warnifavailablememoryisunder = this.createLabelAndElement("MemThreshold", this.i18n.WarnIfAvailableMemoryIsUnder, "TextBox", this.i18n.EnterAPercentageOrMB, 5);
                this.warnifavailablememoryisunderthreshold = this.createLabelAndElement("MemThresholdType", "", "SelectMini", "Threshold", [{ label: "%", value: 0, selected: true }, { label: "MB", value: 1 }]);
                this.warnifavailablediskisunder = this.createLabelAndElement("DiskThreshold", this.i18n.WarnIfAvailableDiskSpaceIsUnder, "TextBox", this.i18n.EnterAPercentageOrMB, 5);
                this.warnifdiskspaceisunder = this.createLabelAndElement("DiskThresholdType", "", "SelectMini", "Threshold", [{ label: "%", value: 0, selected: true }, { label: "MB", value: 1 }]);

                this.store = new ESPTopology.Store();
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    deselectOnRefresh: true,
                    columns: [
                        selector({
                            width: 18,
                            selectorType: 'checkbox',
                            sortable: false,
                            disabled: function (item) {
                                if (item.__hpcc_treeItem) {
                                    if (context.viewModeTargets.checked) {
                                        if (item.__hpcc_treeItem.Type === "HoleCluster" || item.__hpcc_treeItem.Type === "ThorCluster" || item.__hpcc_treeItem.Type === "RoxieCluster" || item.hasLogs()) {
                                            return false;
                                        }
                                    }
                                    if (context.viewModeServices.checked) {
                                        if (item.__hpcc_treeItem.getNetaddress()) {
                                            return false;
                                        }
                                    }
                                    if (context.viewModeMachines.checked) {
                                        if (item.__hpcc_children.length > 0 || item.hasLogs()) {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            }
                        }),
                        tree({
                            field: "__hpcc_displayName",
                            label: this.i18n.Topology,
                            width: 130,
                            collapseOnRefresh: false,
                            shouldExpand: function (row, level, previouslyExpanded) {
                                if (previouslyExpanded !== undefined) {
                                    return previouslyExpanded;
                                } else if (level < -1) {
                                    return true;
                                }
                                return false;
                            },
                            formatter: function (_id, row) {
                                return "<img src='" + Utility.getImageURL(row.getIcon()) + "'/>&nbsp;" + row.getLabel();
                            }
                        })
                    ]
                }, domID);

                retVal.on("dgrid-select", function (event) {
                    var selection = context.grid.getSelected();
                    if (selection.length) {
                        context.detailsWidget.init(selection[0]);
                        if (context.viewModeTargets.checked === true && selection[0].__hpcc_parentNode && selection[0].hasLogs().length === 0) {
                            context.filter.disable(false);
                        } else if (context.viewModeServices.checked === true && selection[0].__hpcc_parentNode) {
                            context.filter.disable(false);
                        } else if (context.viewModeMachines.checked === true && selection) {
                            context.filter.disable(false);
                        }
                        else {
                            context.filter.disable(true);
                        }
                    }
                });
                retVal.on("dgrid-deselect", function (event) {
                    var selection = context.grid.getSelected();
                    if (selection.length === 0) {
                        context.filter.disable(true);
                    } else {
                        context.filter.disable(false);
                    }
                });
                return retVal;
            },

            createDetail: function (id, row, params) {
                return new DelayLoadWidget({
                    id: id,
                    title: row.__hpcc_displayName,
                    closable: true,

                    delayWidget: "TopologyDetailsWidget",
                    hpcc: {
                        params: row
                    }
                });
            },

            listenAndDisable: function (state, id) {
                switch (id) {
                    case "GetStorageInfo":
                        if (state === false) {
                            dijit.byId("LocalFileSystemsOnly").set("checked", false);
                            dijit.byId("LocalFileSystemsOnly").set("disabled", true);
                        } else if (state === "on") {
                            dijit.byId("GetStorageInfo").set("checked", true);
                            dijit.byId("LocalFileSystemsOnly").set("checked", true);
                            dijit.byId("LocalFileSystemsOnly").set("disabled", false);
                        }
                        break;
                    case "GetSoftwareInfo":
                        if (state === false) {
                            dijit.byId("ApplyProcessFilter").set("disabled", true);
                            dijit.byId("ApplyProcessFilter").set("checked", false);
                            dijit.byId("AddProcessesToFilter").set("disabled", true);
                        } else {
                            dijit.byId("ApplyProcessFilter").set("disabled", false);
                            dijit.byId("ApplyProcessFilter").set("checked", true);
                            dijit.byId("AddProcessesToFilter").set("disabled", false);
                        }
                        break;
                    case "ApplyProcessFilter":
                        if (state === false) {
                            dijit.byId("AddProcessesToFilter").set("disabled", true);
                        } else {
                            dijit.byId("ApplyProcessFilter").set("checked", true);
                            dijit.byId("AddProcessesToFilter").set("disabled", false);
                        }
                        break;
                    case "cbAutoRefresh":
                        if (state === false) {
                            dijit.byId("AutoRefresh").set("disabled", true);
                        } else {
                            dijit.byId("cbAutoRefresh").set("checked", true);
                            dijit.byId("AutoRefresh").set("disabled", false);
                        }
                }
            },

            createLabelAndElement: function (id, label, element, placeholder, value) {
                var context = this;
                var control = null;
                switch (element) {
                    case "CheckBox":
                        control = new CheckBox({
                            id: id,
                            name: id,
                            checked: true,
                            title: label,
                            onChange: function (b) {
                                var state = this.get('value');
                                context.listenAndDisable(state, id)
                            }
                        });
                        break;
                    case "TextBox":
                        control = new ValidationTextBox({
                            id: id,
                            name: id,
                            placeholder: placeholder,
                            style: "width: 40%",
                            value: value
                        });
                        break;
                    case "Select":
                        control = new Select({
                            id: id,
                            name: id,
                            placeholder: placeholder,
                            style: "width: 40%",
                            options: value
                        });
                        break;
                    case "SelectMini":
                        control = new Select({
                            id: id,
                            name: id,
                            placeholder: placeholder,
                            "class": "miniSelect",
                            options: value
                        });
                        break;
                }
                if (control) {
                    this.filter.tableContainer.domNode.appendChild(
                        dojo.create(label ? "div" : "span", {
                            id: this.id + id,
                            innerHTML: label ? "<label for=" + control + " style='float:left;width:40%'>" + label + ":</label>" : '',
                            style: "vertical-align:middle;padding:2px 0 2px 5px;"
                        })
                    )
                    control.placeAt(this.id + id);
                }
            },

            getFilter: function () {
                var retVal = this.filter.toObject();

                if (retVal.ApplyProcessFilter === "on") {
                    lang.mixin(retVal, {
                        ApplyProcessFilter: 1
                    });
                } if (retVal.GetProcessorInfo === "on") {
                    lang.mixin(retVal, {
                        GetProcessorInfo: 1
                    });
                } if (retVal.GetSoftwareInfo === "on") {
                    lang.mixin(retVal, {
                        GetSoftwareInfo: 1
                    });
                } if (retVal.GetStorageInfo === "on") {
                    lang.mixin(retVal, {
                        GetStorageInfo: 1
                    });
                } if (retVal.LocalFileSystemsOnly === "on") {
                    lang.mixin(retVal, {
                        LocalFileSystemsOnly: 1
                    });
                }
                return retVal;
            },

            ensureTCPane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new PreflightDetailsWidget({
                        id: id,
                        title: this.i18n.Fetched + ": " + params.params.TimeStamp + " <b>(" + params.params.TargetClusterInfoList.TargetClusterInfo[0].Name + ")</b>",
                        closable: true,
                        params: params.params
                    });
                    this._tabContainer.addChild(retVal, "last");
                }
                return retVal;
            },

            ensureMIPane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new PreflightDetailsWidget({
                        id: id,
                        style: "width: 100%",
                        params: params.params,
                        closable: true,
                        title: params.params.Machines.MachineInfoEx[0].Address
                    });
                    this._tabContainer.addChild(retVal, "last");
                }
                return retVal;
            },

            refreshGrid: function (mode) {
                var context = this;
                if (mode) {
                    this.store.viewMode(mode);
                    this.grid.refresh();
                } else if (this.store._viewMode === "Targets") {
                    this.grid.refresh();
                } else if (this.store._viewMode === "Services") {
                    this.grid.refresh();
                } else if (this.store._viewMode === "Machines") {
                    this.grid.refresh();
                }
                else {
                    this.store.viewMode("Targets");
                    this.store.refresh(function () {
                        context.grid.refresh();
                    });
                }
            },

            refreshActionState: function () {

            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ws_machine.js":
/*!*******************************!*\
  !*** ./lib/src/ws_machine.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, topic, Observable, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var NagiosStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.ComponentStatusList.ComponentStatus",
        idProperty: "__hpcc_id"
    });
    var monitorHandle;
    function GetComponentStatus(params) {
        return ESPRequest.send("ws_machine", "GetComponentStatus", params);
    }
    exports.GetComponentStatus = GetComponentStatus;
    function GetTargetClusterInfo(params) {
        return ESPRequest.send("ws_machine", "GetTargetClusterInfo", params);
    }
    exports.GetTargetClusterInfo = GetTargetClusterInfo;
    function GetMachineInfo(params) {
        return ESPRequest.send("ws_machine", "GetMachineInfo", params);
    }
    exports.GetMachineInfo = GetMachineInfo;
    function MonitorComponentStatus(params) {
        var prevResponse = null;
        if (!monitorHandle) {
            var context = this;
            monitorHandle = setInterval(function () {
                context.GetComponentStatus(params).then(function (response) {
                    if (response && response.GetComponentStatusResponse.ComponentStatus) {
                        response.GetComponentStatusResponse.ComponentStatusList.ComponentStatus.forEach(function (row) {
                            topic.publish("hpcc/monitoring_component_update", {
                                response: response,
                                status: response.GetComponentStatusResponse.ComponentStatus
                            });
                        });
                    }
                    prevResponse = response;
                });
            }, 60000);
        }
        return prevResponse;
    }
    exports.MonitorComponentStatus = MonitorComponentStatus;
    function CreateNagiosStore(options) {
        var store = new NagiosStore(options);
        return Observable(store);
    }
    exports.CreateNagiosStore = CreateNagiosStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ws_machine.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/RequestInformationWidget.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/RequestInformationWidget.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_RequestInfo\" style=\"width: 100%; height: 100%\" data-dojo-props=\"title:'Request Information'\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}_RequestDetails\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);