(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/EventScheduleWorkunitWidget":"./eclwatch/EventScheduleWorkunitWidget.js",
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"dojo/text!templates/EventScheduleWorkunitWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/EventScheduleWorkunitWidget.html",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[96],{

/***/ "./eclwatch/EventScheduleWorkunitWidget.js":
/*!*************************************************!*\
  !*** ./eclwatch/EventScheduleWorkunitWidget.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/WUDetailsWidget */ "./eclwatch/WUDetailsWidget.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/EventScheduleWorkunitWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/EventScheduleWorkunitWidget.html"),

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
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domForm, arrayUtil, on,
    registry, Menu, MenuItem,
    selector,
    _TabContainerWidget, TargetSelectWidget, WUDetailsWidget, WsWorkunits, ESPUtil, FilterDropDownWidget,
    template) {
        return declare("EventScheduleWorkunitWidget", [_TabContainerWidget], {
            i18n: nlsHPCC,
            templateString: template,
            baseClass: "EventScheduleWorkunitWidget",

            eventTab: null,
            eventGrid: null,
            filter: null,
            clusterTargetSelect: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filter = registry.byId(this.id + "Filter");
                this.eventTab = registry.byId(this.id + "_EventScheduledWorkunits");
                this.clusterTargetSelect = registry.byId(this.id + "ClusterTargetSelect");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.initContextMenu();
            },

            init: function (params) {
                var context = this;
                if (this.inherited(arguments))
                    return;

                this.clusterTargetSelect.init({
                    Targets: true,
                    includeBlank: true,
                    Target: params.Cluster
                });
                this.initEventGrid();

                this.filter.on("clear", function (evt) {
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
                    if (currSel.id === this.eventTab.id) {
                    } else {
                        currSel.init(currSel.params);
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
                    targetNodeIds: [this.id + "EventGrid"]
                });
                this.menuOpen = this.addMenuItem(pMenu, {
                    label: this.i18n.Open,
                    onClick: function () { context._onOpen(); }
                });
                this.menuDeschedule = this.addMenuItem(pMenu, {
                    label: this.i18n.Deschedule,
                    onClick: function () { context._onDeschedule(); }
                });
                pMenu.startup();
            },

            initEventGrid: function (params) {
                var context = this;
                var store = WsWorkunits.CreateEventScheduleStore();
                this.eventGrid = new declare([ESPUtil.Grid(true, true)])({
                    store: store,
                    query: this.getFilter(),
                    columns: {
                        col1: selector({ width: 27, selectorType: 'checkbox' }),
                        Wuid: {
                            label: this.i18n.Workunit, width: 180, sortable: false,
                            formatter: function (Wuid) {
                                return "<a href='#' class='dgrid-row-url'>" + Wuid + "</a>";
                            }
                        },
                        Cluster: { label: this.i18n.Cluster, width: 100, sortable: false },
                        JobName: { label: this.i18n.JobName, sortable: false },
                        EventName: { label: this.i18n.EventName, width: 180, sortable: false },
                        EventText: { label: this.i18n.EventText, width: 180, sortable: false },
                        Owner: { label: this.i18n.Owner, width: 180, sortable: false },
                        State: { label: this.i18n.State, width: 180, sortable: false }
                    }
                }, this.id + "EventGrid");

                this.eventGrid.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.eventGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.eventGrid.on(".dgrid-row:dblclick", function (evt) {
                    if (context._onRowDblClick) {
                        var item = context.eventGrid.row(evt).data;
                        context._onRowDblClick(item);
                    }
                });
                this.eventGrid.on(".dgrid-row:contextmenu", function (evt) {
                    if (context._onRowContextMenu) {
                        var item = context.eventGrid.row(evt).data;
                        var cell = context.eventGrid.cell(evt);
                        var colField = cell.column.field;
                        var mystring = "item." + colField;
                        context._onRowContextMenu(item, colField, mystring);
                    }
                });
                this.eventGrid.onSelectionChanged(function (event) {
                    context.refreshActionState();
                });
                this.eventGrid.startup();
                this.refreshActionState();
            },

            refreshActionState: function () {
                var selection = this.eventGrid.getSelected();
                var hasSelection = selection.length > 0;
                registry.byId(this.id + "Deschedule").set("disabled", !hasSelection);
                registry.byId(this.id + "Open").set("disabled", !hasSelection);
            },

            _onRefresh: function (params) {
                this.refreshGrid();
            },

            _onEventClear: function (event) {
                arrayUtil.forEach(registry.byId(this.id + "FilterForm").getDescendants(), function (item, idx) {
                    item.set('value', null);
                });
            },

            _onEventApply: function (event) {
                var filterInfo = domForm.toObject(this.id + "FilterForm");
                WsWorkunits.WUPushEvent({
                    request: {
                        EventName: filterInfo.EventName,
                        EventText: filterInfo.EventText
                    }
                });
                registry.byId(this.id + "FilterDropDown").closeDropDown();
            },

            _onOpen: function (event) {
                var selections = this.eventGrid.getSelected();
                var firstTab = null;
                for (var i = selections.length - 1; i >= 0; --i) {
                    var tab = this.ensurePane(selections[i].Wuid, selections[i]);
                    if (i === 0) {
                        firstTab = tab;
                    }
                }
                if (firstTab) {
                    this.selectChild(firstTab, true);
                }
            },

            _onDeschedule: function (event) {
                var context = this;
                var selection = this.eventGrid.getSelected();
                var list = this.arrayToList(selection, "Wuid");
                if (confirm(this.i18n.DescheduleSelectedWorkunits + "\n" + list)) {
                    WsWorkunits.WUAction(selection, "Deschedule").then(function (response) {
                        context.refreshGrid(response);
                    });
                }
            },

            refreshGrid: function (args) {
                this.eventGrid.set("query", this.getFilter());
            },

            _onRowDblClick: function (item) {
                var wuTab = this.ensurePane(item.Wuid, item);
                this.selectChild(wuTab);
            },

            getFilter: function () {
                return this.filter.toObject();
            },

            ensurePane: function (id, params) {
                id = this.createChildTabID(id);
                var retVal = registry.byId(id);
                if (!retVal) {
                    retVal = new WUDetailsWidget({
                        id: id,
                        title: params.Wuid,
                        closable: true,
                        params: {
                            Wuid: params.Wuid
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/EventScheduleWorkunitWidget.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/EventScheduleWorkunitWidget.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n  <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n    <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n      <div id=\"${id}_EventScheduledWorkunits\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.title_EventScheduleWorkunit}\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}QueryToolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n          <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-type=\"dijit.form.Button\" data-dojo-props='iconClass:\"iconRefresh\"'>${i18n.Refresh}</div>\n          <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n          <div id=\"${id}Open\" data-dojo-attach-event=\"onClick:_onOpen\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n          <div id=\"${id}Deschedule\" data-dojo-attach-event=\"onClick:_onDeschedule\" data-dojo-type=\"dijit.form.Button\">${i18n.Deschedule}</div>\n          <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n          <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n            <input id=\"${id}EventName\" title=\"${i18n.EventName}:\" name=\"EventName\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.EventNamePH}'\" data-dojo-type=\"dijit.form.TextBox\" />\n            <input id=\"${id}State\" title=\"${i18n.State}:\" name=\"State\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.State}'\" data-dojo-type=\"dijit.form.TextBox\" />\n            <input id=\"${id}ClusterTargetSelect\" title=\"${i18n.Cluster}:\" name=\"Cluster\" colspan=\"2\" data-dojo-props=\"trim:true, placeHolder:'${i18n.ClusterPlaceholder}'\" data-dojo-type=\"TargetSelectWidget\" />\n          </div>\n          <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n          <img id=\"${id}IconFilter\" src=\"/esp/files/eclwatch/img/noFilter.png\" class=\"iconNoFilter\"/>\n          <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n            <span>${i18n.PushEvent}</span>\n            <div data-dojo-type=\"dijit.TooltipDialog\" class=\"toolTip\">\n              <div id=\"${id}FilterForm\" style=\"width:460px\" data-dojo-type=\"dijit.form.Form\">\n                <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                  <input id=\"${id}EventPushName\" title=\"${i18n.EventName}:\" name=\"EventName\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.EventNamePH}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                  <input id=\"${id}EventText\" title=\"${i18n.EventText}:\" name=\"EventText\" colspan=\"2\" data-dojo-props=\"trim: true, placeHolder:'${i18n.EventTextPH}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                  <button id=\"${id}FilterApply\" data-dojo-attach-event=\"onClick:_onEventApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                  <button id=\"${id}FilterClear\" data-dojo-attach-event=\"onClick:_onEventClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}GridCP\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n          <div id=\"${id}EventGrid\"></div>\n        </div>\n      </div>\n    </div>\n  </div><!--end of border container-->\n</div>"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ })

}]);