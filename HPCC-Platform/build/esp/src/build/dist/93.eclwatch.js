(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/DynamicESDLQueryWidget":"./eclwatch/DynamicESDLQueryWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[93],{

/***/ "./eclwatch/DelayLoadWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/DelayLoadWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, dom, domStyle,
    ContentPane,
    Utility) {
        return declare("DelayLoadWidget", [ContentPane], {
            __ensurePromise: undefined,
            __initPromise: undefined,
            refresh: null,

            style: {
                margin: "0px",
                padding: "0px"
            },

            startLoading: function (targetNode) {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "block");
                    domStyle.set(loadingOverlay, "opacity", "255");
                }
            },

            stopLoading: function () {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "none");
                    domStyle.set(loadingOverlay, "opacity", "0");
                }
            },

            ensureWidget: function () {
                if (this.__ensurePromise) return this.__ensurePromise;
                var context = this;
                this.__ensurePromise = new Promise(function (resolve, reject) {
                    context.startLoading();
                    Utility.resolve(context.delayWidget, function (Widget) {
                        var widgetInstance = new Widget(lang.mixin({
                            id: context.childWidgetID,
                            style: {
                                margin: "0px",
                                padding: "0px",
                                width: "100%",
                                height: "100%"
                            }
                        }, context.delayProps ? context.delayProps : {}));
                        context.widget = {};
                        context.widget[widgetInstance.id] = widgetInstance;
                        context.containerNode.appendChild(widgetInstance.domNode);
                        widgetInstance.startup();
                        widgetInstance.resize();
                        if (widgetInstance.refresh) {
                            context.refresh = function (params) {
                                widgetInstance.refresh(params);
                            }
                        }
                        context.stopLoading();
                        resolve(widgetInstance);
                    });
                });
                return this.__ensurePromise;
            },

            //  Implementation  ---
            reset:function() {
                for (var key in this.widget) {
                    this.widget[key].destroyRecursive();
                    delete this.widget[key];
                }
                delete this.widget;
                delete this.deferred;
                delete this.__hpcc_initalized;
                delete this.childWidgetID;
                this.containerNode.innerHTML = "";
            },

            init: function (params) {
                if (this.__initPromise) return this.__initPromise;
                this.childWidgetID = this.id + "-DL";
                var context = this;
                this.__initPromise = new Promise(function (resolve, reject) {
                    context.ensureWidget().then(function (widget) {
                        widget.init(params);
                        if (context.__hpcc_hash) {
                            context.doRestoreFromHash(context.__hpcc_hash);
                            context.__hpcc_hash = null;
                        }
                        //  Let page finish initial render ---
                        setTimeout(function () {
                            resolve(widget);
                        }, 20);
                    });
                });
                return this.__initPromise;
            },

            restoreFromHash: function (hash) {
                if (this.widget && this.widget[this.childWidgetID]) {
                    this.doRestoreFromHash(hash);
                } else {
                    this.__hpcc_hash = hash;
                }
            },
            doRestoreFromHash: function (hash) {
                if (this.widget[this.childWidgetID].restoreFromHash) {
                    this.widget[this.childWidgetID].restoreFromHash(hash);
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/DynamicESDLQueryWidget.js":
/*!********************************************!*\
  !*** ./eclwatch/DynamicESDLQueryWidget.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),

    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/DynamicESDLDefinitionQueryWidget */ "./eclwatch/DynamicESDLDefinitionQueryWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, on, dom, domClass, domConstruct,
    registry, Button, ToolbarSeparator, Dialog, TextBox,
    tree, selector,
    GridDetailsWidget, WsTopology, WsESDLConfig, Utility, DelayLoadWidget, ESPUtil, DynamicESDLDefinitionQueryWidget, TargetSelectWidget, DelayLoadWidget) {
    return declare("DynamicESDLQueryWidget", [GridDetailsWidget, ESPUtil.FormHelper], {
        i18n: nlsHPCC,

        gridTitle: nlsHPCC.title_DESDL,
        idProperty: "__hpcc_id",

        init: function (params) {
            var context = this;
            if (this.inherited(arguments))
                return;

            this._refreshActionState();
            this.refreshGrid();

            ESPUtil.MonitorVisibility(this.gridTab, function (visibility) {
                if (visibility) {
                    context.refreshGrid();
                }
            });
        },

        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id === this.id + "_Grid") {
                    this.refreshGrid()
                } else if (currSel.id === this.definitionQueryWidget.id && !this.definitionQueryWidget.initalized) {
                    this.definitionQueryWidget.init({
                        firstLoad: true
                    });
                } else {
                    currSel.init(currSel.params);
                }
            }
        },

        _onRowDblClick: function (binding) {
            var bindingTab = this.ensurePane(binding.Name, {
                Binding: binding
            });
            this.selectChild(bindingTab);
        },

        postCreate: function (args) {
            var context = this;
            this.inherited(arguments);
            this.openButton = registry.byId(this.id + "Open");
            this.refreshButton = registry.byId(this.id + "Refresh");

            this.addBindingButton = new Button({
                id: this.id + "addBindingQuery",
                label: this.i18n.AddBinding,
                onClick: function (event) {
                    context._onAddBinding(event);
                }
            }).placeAt(this.openButton.domNode, "after");

            var tmpSplitter = new ToolbarSeparator().placeAt(this.openButton.domNode, "after");
            this.deleteButton = new Button({
                id: this.id + "deleteBindingQuery",
                label: this.i18n.DeleteBinding,
                onClick: function (event) {
                    context._onDeleteBinding(event);
                }
            }).placeAt(this.addBindingButton.domNode, "after");
            var tmpSplitter = new ToolbarSeparator().placeAt(this.deleteButton.domNode, "before");

            this.definitionQueryWidget = new DynamicESDLDefinitionQueryWidget({
                id: this.id + "_DynamicESDLDefinitionQueryWidget",
                title: nlsHPCC.title_Definitions
            });
            this.definitionQueryWidget.placeAt(this._tabContainer, "last");
        },

        createGrid: function (domID) {
            var context = this;

            this.store.mayHaveChildren = function (item) {
                return item.children;
            };

            this.store.getChildren = function (parent, options) {
                return this.query({
                    __hpcc_parentName: parent.__hpcc_id
                }, options);
            };
            var retVal = new declare([ESPUtil.Grid(true, true)])({
                store: this.store,
                columns: {
                    col1: selector({
                        width: 30,
                        selectorType: 'checkbox',
                        disabled: function (item) {
                            if (item.type === "binding") {
                                return false;
                            }
                            return true;
                        },
                        sortable: false,
                        unhidable: true
                    }),
                    Name: tree({
                        formatter: function (_name, row) {
                            var img = "";
                            var name = _name;
                            if (row.type === "port") {
                                img = Utility.getImageHTML("machine.png") + context.i18n.Port + ":";
                            } else if (row.type === "binding") {
                                img = Utility.getImageHTML("sync.png");
                                name = "<a href='#' class='dgrid-row-url'>" + _name + "</a>";
                            }
                            return img + "&nbsp;" + name;
                        },
                        collapseOnRefresh: false,
                        label: this.i18n.Process,
                        sortable: false,
                        unhidable: true
                    }),
                    PublishBy: {
                        label: this.i18n.PublishedBy,
                        sortable: false,
                        width: 200
                    },
                    CreatedTime: {
                        label: this.i18n.CreatedTime,
                        sortable: false,
                        width: 200
                    },
                    LastEditBy: {
                        label: this.i18n.LastEditedBy,
                        sortable: false,
                        width: 200
                    },
                    LastEditTime: {
                        label: this.i18n.LastEditTime,
                        sortable: false,
                        width: 200
                    }
                }
            }, domID);

            retVal.on(".dgrid-row-url:click", function (evt) {
                if (context._onRowDblClick) {
                    var item = retVal.row(evt).data;
                    context._onRowDblClick(item);
                }
            });

            retVal.on(".dgrid-row:dblclick", function (evt) {
                evt.preventDefault();
                context.grid.refresh()
            });

            retVal.onSelectionChanged(function (event) {
                var selection = retVal.getSelected();
                if (selection.length > 0) {
                    context.deleteButton.set("disabled", false);
                } else {
                    context.deleteButton.set("disabled", true);
                }
            });

            return retVal;
        },

        _onRefresh: function () {
            this.refreshGrid();
        },

        _onOpen: function (event) {
            var selections = this.grid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var tab = this.ensurePane(selections[i].Name, {
                    Binding: selections[0]
                });
                if (i === 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onAddBinding: function () {
            var context = this;

            this.dialog = new Dialog({
                title: this.i18n.AddBinding,
                style: "width: 480px;"
            });

            this.dialogButton = new Button({
                style: "float:right; padding: 0 10px 10px 20px;",
                innerHTML: context.i18n.Apply,
                onClick: function () {
                    context._onSaveBinding();
                }
            }).placeAt(this.dialog.domNode, "last");

            if (this.definitionDropDown && this.esdlEspDropDown) {
                context.definitionDropDown.destroyRecursive();
                context.esdlEspDropDown.destroyRecursive();
            }

            this.definitionDropDown = new TargetSelectWidget({
                style: "float:left; width:100%;"
            });

            this.esdlEspProcessesDropDown = new TargetSelectWidget({
                style: "float:left; width:100%;"
            })

            this.definitionDropDown.init({
                LoadDESDLDefinitions: true
            });

            this.esdlEspProcessesDropDown.init({
                LoadESDLESPProcesses: true
            });

            var dialogDynamicForm = {
                ESProcess: {
                    label: context.i18n.ESPProcessName,
                    widget: this.esdlEspProcessesDropDown,
                },
                Port: {
                    label: context.i18n.Port,
                    widget: new TextBox({
                        placeholder: this.i18n.Port,
                        id: "PortNB",
                        type: "text",
                        required: true,
                        style: "width:100%;",
                        maxLength: 5
                    })
                },
                DefinitionID: {
                    label: context.i18n.DefinitionID,
                    widget: this.definitionDropDown
                },
                ServiceName: {
                    label: context.i18n.ServiceName,
                    widget: new TextBox({
                        placeholder: this.i18n.ServiceName,
                        id: "ServiceNameTB",
                        required: true,
                        style: "width:100%;"
                    })
                }
            };

            var table = Utility.DynamicDialogForm(dialogDynamicForm);

            this.dialog.set("content", table);
            this.dialog.show();
            this.dialog.on("cancel", function () {
                context.dialog.destroyRecursive();
            });
            this.dialog.on("hide", function () {
                context.dialog.destroyRecursive();
            });
        },

        _onDeleteBinding: function () {
            var context = this;
            var selection = this.grid.getSelected();
            var list = this.arrayToList(selection, "Name");
            if (confirm(this.i18n.YouAreAboutToDeleteBinding + "\n" + list)) {
                WsESDLConfig.DeleteESDLBinding({
                    request: {
                        Id: selection[0].Name
                    }
                }).then(function (response) {
                    if (lang.exists("DeleteESDLRegistryEntryResponse.status", response)) {
                        dojo.publish("hpcc/brToaster", {
                            Severity: "Message",
                            Source: "WsESDLConfig.PublishESDLBinding",
                            Exceptions: [{
                                Source: context.i18n.BindingDeleted,
                                Message: response.DeleteESDLRegistryEntryResponse.status.Description,
                                duration: 1
                            }]
                        });
                        context.refreshGrid();
                    }
                })
            }
        },

        _onSaveBinding: function () {
            var context = this;
            WsESDLConfig.PublishESDLBinding({
                request: {
                    EspProcName: context.esdlEspProcessesDropDown.get("value"),
                    EspPort: dom.byId("PortNB").value,
                    EsdlDefinitionID: context.definitionDropDown.get("value"),
                    EsdlServiceName: dom.byId("ServiceNameTB").value,
                    Overwrite: true
                }
            }).then(function (response) {
                if (lang.exists("PublishESDLBindingResponse.status", response)) {
                    if (response.PublishESDLBindingResponse.status.Code === 0) {
                        dojo.publish("hpcc/brToaster", {
                            Severity: "Message",
                            Source: "WsESDLConfig.PublishESDLBinding",
                            Exceptions: [{
                                Source: context.i18n.SuccessfullySaved,
                                Message: response.PublishESDLBindingResponse.status.Description,
                                duration: 1
                            }]
                        });
                    }
                }
                context.dialog.hide();
                context.refreshGrid();
            });
        },

        refreshGrid: function () {
            var context = this;
            WsESDLConfig.ListESDLBindings({
                request: {
                    ListESDLBindingsRequest: true
                }
            }).then(function (response) {
                var results = [];
                var newRows = [];
                if (lang.exists("ListESDLBindingsResponse.EspProcesses.EspProcess", response)) {
                    results = response.ListESDLBindingsResponse.EspProcesses.EspProcess;
                }

                arrayUtil.forEach(results, function (row, idx) {
                    lang.mixin(row, {
                        __hpcc_parentName: null,
                        __hpcc_id: row.Name + idx,
                        children: row.Ports ? true : false,
                        type: "service"
                    });
                    if (row.Ports) {
                        arrayUtil.forEach(row.Ports.Port, function (Port, portIndex) {
                            newRows.push({
                                __hpcc_parentName: row.Name + idx,
                                __hpcc_id: row.Name + Port.Value + portIndex,
                                Name: Port.Value,
                                children: Port ? true : false,
                                type: "port"
                            });
                            arrayUtil.forEach(Port.Bindings.Binding, function (Binding, bindingIdx) {
                                newRows.push({
                                    ESPProcessName: row.Name,
                                    Port: Port.Value,
                                    __hpcc_parentName: row.Name + Port.Value + portIndex,
                                    __hpcc_id: Binding.Id + bindingIdx,
                                    Name: Binding.Id,
                                    PublishBy: Binding.History.PublishBy,
                                    CreatedTime: Binding.History.CreatedTime,
                                    LastEditBy:Binding.History.LastEditBy,
                                    LastEditTime:Binding.History.LastEditTime,
                                    children: false,
                                    type: "binding"
                                });
                            });
                        });
                    }
                });

                arrayUtil.forEach(newRows, function (newRow) {
                    results.push(newRow);
                });
                context.store.setData(results, context.i18n.ConfigureService);
                context.grid.set("query", {
                    __hpcc_parentName: null
                });
            });
        },

        ensurePane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                var context = this;
                retVal = new DelayLoadWidget({
                    id: id,
                    title: params.Binding.Name,
                    closable: true,
                    delayWidget: "DynamicESDLDetailsWidget",
                    params: params.Binding
                });
                this.addChild(retVal, "last");
            }
            return retVal;
        }
    });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);