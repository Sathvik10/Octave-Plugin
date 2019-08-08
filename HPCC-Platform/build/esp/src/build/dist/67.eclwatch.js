(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"hpcc/GroupDetailsWidget":"./eclwatch/GroupDetailsWidget.js",
	"hpcc/ShowIndividualPermissionsWidget":"./eclwatch/ShowIndividualPermissionsWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"hpcc/UserQueryWidget":"./eclwatch/UserQueryWidget.js",
	"src/ESPBase":"./lib/src/ESPBase.js",
	"src/WsTopology":"./lib/src/WsTopology.js",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html",
	"dojo/text!templates/GroupDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GroupDetailsWidget.html",
	"dojo/text!templates/UserQueryWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserQueryWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[67],{

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

/***/ "./eclwatch/GroupDetailsWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/GroupDetailsWidget.js ***!
  \****************************************/
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

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/GroupDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GroupDetailsWidget.html"),

    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domAttr,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    _TabContainerWidget, WsAccess, DelayLoadWidget,
    template) {
        return declare("GroupDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "GroupDetailsWidget",
            i18n: nlsHPCC,

            summaryWidget: null,
            membersWidget: null,
            activePermissionsWidget: null,
            groupPermissionsWidget: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.membersWidget = registry.byId(this.id + "_Members");
                this.activePermissionsWidget = registry.byId(this.id + "_ActivePermissions");
                this.groupPermissionsWidget = registry.byId(this.id + "_GroupPermissions");
            },

            getTitle: function () {
                return this.i18n.GroupDetails;
            },

            //  Hitched actions  ---
            _onSave: function (event) {
                //  Currently disabled.  TODO:  Add ESP Method to rename group?  ---
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.group = params.Name;
                if (this.group) {
                    this.updateInput("Group", null, this.group);
                    this.updateInput("Name", null, this.group);
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();

                if (currSel.id === this.membersWidget.id) {
                    this.membersWidget.init({
                        groupname: this.group
                    });
                } else if (currSel.id === this.activePermissionsWidget.id) {
                    this.activePermissionsWidget.init({
                        IsGroup: true,
                        IncludeGroup: false,
                        AccountName: this.group
                    });
                } else if (currSel.id === this.groupPermissionsWidget.id) {
                    this.groupPermissionsWidget.init({
                        IsGroup: true,
                        IncludeGroup: false,
                        groupname: this.group
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./eclwatch/ShowIndividualPermissionsWidget.js":
/*!*****************************************************!*\
  !*** ./eclwatch/ShowIndividualPermissionsWidget.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),

    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC,
    registry, CheckBox,
    editor,
    GridDetailsWidget, WsAccess, ESPUtil) {
        return declare("ShowIndividualPermissionsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_Permissions,
            idProperty: "__hpcc_id",

            //  Hitched Actions  ---
            _onRefresh: function (args) {
                this.grid.refresh();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this.store = WsAccess.CreateIndividualPermissionsStore(params.Basedn, params.Rtype, params.Rtitle, params.Name);
                this.grid.setStore(this.store);
                this._refreshActionState();
            },

            createGrid: function (domID) {
                var context = this;
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    sort: [{ attribute: "account_name" }],
                    columns: {
                        account_name: {
                            label: this.i18n.Account,
                            formatter: function (_name, row) {
                                return _name;
                            }
                        },
                        allow_access: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.AllowAccess;
                            }
                        }, CheckBox),
                        allow_read: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.AllowRead;
                            }
                        }, CheckBox),
                        allow_write: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.AllowWrite;
                            }
                        }, CheckBox),
                        allow_full: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.AllowFull;
                            }
                        }, CheckBox),
                        padding: {
                            width: 20,
                            label: " "
                        },
                        deny_access: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.DenyAccess
                            }
                        }, CheckBox),
                        deny_read: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.DenyRead
                            }
                        }, CheckBox),
                        deny_write: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.DenyWrite
                            }
                        }, CheckBox),
                        deny_full: editor({
                            width: 54,
                            editor: "checkbox",
                            editorArgs: { value: true },
                            className: "hpccCentered",
                            autoSave: true,
                            canEdit: function (object, value) { return object.__hpcc_type !== "Permission"; },
                            renderHeaderCell: function (node) {
                                node.innerHTML = context.i18n.DenyFull
                            }
                        }, CheckBox)
                    }
                }, domID);

                retVal.on("dgrid-datachange", function (evt) {
                    evt.preventDefault();
                    context.calcPermissionState(evt.cell.column.field, evt.value, evt.cell.row.data);
                    evt.grid.store.put(evt.cell.row.data);
                });
                return retVal;
            },

            calcPermissionState: function (field, value, row) {
                switch (field) {
                    case "allow_access":
                        row.allow_full = value && row.allow_read && row.allow_write;
                        if (value)
                            this.calcPermissionState("deny_access", false, row);
                        break;
                    case "allow_read":
                        row.allow_full = row.allow_access && value && row.allow_write;
                        if (value)
                            this.calcPermissionState("deny_read", false, row);
                        break;
                    case "allow_write":
                        row.allow_full = row.allow_access && row.allow_read && value;
                        if (value)
                            this.calcPermissionState("deny_write", false, row);
                        break;
                    case "allow_full":
                        row.allow_access = value;
                        row.allow_read = value;
                        row.allow_write = value;
                        if (value)
                            this.calcPermissionState("deny_full", false, row);
                        break;
                    case "deny_access":
                        row.deny_full = value && row.deny_read && row.deny_write;
                        if (value)
                            this.calcPermissionState("allow_access", false, row);
                        break;
                    case "deny_read":
                        row.deny_full = row.deny_access && value && row.deny_write;
                        if (value)
                            this.calcPermissionState("allow_read", false, row);
                        break;
                    case "deny_write":
                        row.deny_full = row.deny_access && row.deny_read && value;
                        if (value)
                            this.calcPermissionState("allow_write", false, row);
                        break;
                    case "deny_full":
                        row.deny_access = value;
                        row.deny_read = value;
                        row.deny_write = value;
                        if (value)
                            this.calcPermissionState("allow_full", false, row);
                        break;
                }
                row[field] = value;
            },

            refreshActionState: function (selection) {
                registry.byId(this.id + "Open").set("disabled", true);
            }
        });
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

/***/ "./eclwatch/UserQueryWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/UserQueryWidget.js ***!
  \*************************************/
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
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Menu */ "./node_modules/dijit/Menu.js"),
    __webpack_require__(/*! dijit/MenuItem */ "./node_modules/dijit/MenuItem.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! dgrid/tree */ "./dgrid/tree.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! src/ws_account */ "./lib/src/ws_account.js"),
    __webpack_require__(/*! src/ESPBase */ "./lib/src/ESPBase.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! hpcc/UserDetailsWidget */ "./eclwatch/UserDetailsWidget.js"),
    __webpack_require__(/*! hpcc/GroupDetailsWidget */ "./eclwatch/GroupDetailsWidget.js"),
    __webpack_require__(/*! hpcc/FilterDropDownWidget */ "./eclwatch/FilterDropDownWidget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/ShowAccountPermissionsWidget */ "./eclwatch/ShowAccountPermissionsWidget.js"),
    __webpack_require__(/*! hpcc/ShowIndividualPermissionsWidget */ "./eclwatch/ShowIndividualPermissionsWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/UserQueryWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserQueryWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),

    __webpack_require__(/*! dojox/form/PasswordValidator */ "./node_modules/dojox/form/PasswordValidator.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm, on, all,
                registry, Menu, MenuItem, MenuSeparator, Select,
                tree, selector,
                _TabContainerWidget, WsAccess, WsAccount, ESPBase, ESPUtil, ESPRequest, UserDetailsWidget, GroupDetailsWidget, FilterDropDownWidget, TargetSelectWidget, ShowAccountPermissionsWidget, ShowIndividualPermissionsWidget,
                template) {
    return declare("UserQueryWidget", [_TabContainerWidget], {
        templateString: template,
        baseClass: "UserQueryWidget",
        i18n: nlsHPCC,

        usersTab: null,
        usersGrid: null,

        postCreate: function (args) {
            this.inherited(arguments);
            this.addGroupForm = registry.byId(this.id + "AddGroupForm");
            this.groupsTab = registry.byId(this.id + "_Groups");
            this.addUserForm = registry.byId(this.id + "AddUserForm");
            this.filePermissionsForm = registry.byId(this.id + "FilePermissionForm");
            this.usersTab = registry.byId(this.id + "_Users");
            this.addPermissionForm = registry.byId(this.id + "AddPermissionForm");
            this.addPermissionType = registry.byId(this.id + "AddPermissionType");
            this.permissionsTab = registry.byId(this.id + "_Permissions");
            this.filter = registry.byId(this.id + "Filter");
            this.filePermissionDialog = registry.byId(this.id + "FilePermissionDialog");
            this.showPermissionDialog = registry.byId(this.id + "ShowPermissionDialog");
            this.usersSelect = registry.byId(this.id + "UsersSelect");
            this.groupsSelect = registry.byId(this.id + "GroupsSelect");
            this.showPermissionsGrid = registry.byId(this.id + "ShowPermissionsGrid");
            this.checkFileSubmit = registry.byId(this.id + "CheckFileSubmit");
            this.nameSelect = registry.byId(this.id + "NameSelect");
            this.addGroupOwner = registry.byId(this.id + "AddGroupOwner");
        },

        //  Hitched actions  ---

        _onClearPermissionsCache: function () {
            if (confirm(this.i18n.ClearPermissionsCacheConfirm)) {
                WsAccess.ClearPermissionsCache();
            }
        },

        _onEnableScopeScans: function () {
            if (confirm(this.i18n.EnableScopeScansConfirm)) {
                WsAccess.EnableScopeScans();
                this.refreshPermissionsGrid();
            }
        },

        _onDisableScopeScans: function () {
            if (confirm(this.i18n.DisableScopeScanConfirm)) {
                WsAccess.DisableScopeScans();
                this.refreshPermissionsGrid();
            }
        },

        _onFileScopeDefaultPermissions: function () {
            var row = this.getRow("FileScope");
            if (row) {
                var clean = row.basedn.split(/,(.+)?/)[1] //the request does not like the ou with prefix have to issue JIRA to fix this
                var fileScopeDefaultPermissionsTab = this.ensurePermissionsPane(row.basedn + "FileScope", {
                    Basedn: clean,
                    Rtype: "file",
                    Rtitle: "",
                    Name: "files",
                    TabName: this.i18n.title_FileScopeDefaultPermissions,
                    DefaultPermissions: true
                });
                this.selectChild(fileScopeDefaultPermissionsTab);
            }
        },

        _onWorkunitScopeDefaultPermissions: function () {
            var row = this.getRow("WorkunitScope");
            if (row) {
                var clean = row.basedn.split(/,(.+)?/)[1] //the request does not like the ou with prefix have to issue JIRA to fix this
                var workunitScopeDefaultPermissionsTab = this.ensurePermissionsPane(row.basedn + "WUScope", {
                    Basedn: clean,
                    Rtype: "workunit",
                    Rtitle: "",
                    Name: "workunits",
                    TabName: this.i18n.title_WorkunitScopeDefaultPermissions,
                    DefaultPermissions: true
                });
                this.selectChild(workunitScopeDefaultPermissionsTab);
            }
        },

        _onPhysicalFiles: function () {
            var row = this.getRow("FileScope");
            if (row) {
                var physicalPermissionsTab = this.ensurePermissionsPane(row.basedn + "PhysicalFiles", {
                    Basedn: row.basedn,
                    Rtype: "file",
                    Rtitle: "FileScope",
                    Name: "file",
                    TabName: "Physical Files"
                });
                this.selectChild(physicalPermissionsTab);
            }
        },

       _onCloseFilePermissions: function () {
            this.filePermissionDialog.hide();
            this.nameSelect.reset();
            this.usersSelect.set("value","");
            this.groupsSelect.set("value","");
        },
        _onCheckFilePermissions: function () {
            this.filePermissionDialog.show();
        },
        _onCheckFileSubmit: function () {
            var context = this;
            if (this.filePermissionsForm.validate()) {
                WsAccess.FilePermission({
                    request:{
                        FileName: this.nameSelect.get("value"),
                        UserName: this.usersSelect.get("value"),
                        GroupName: this.groupsSelect.get("value")
                    }
                }).then(function (response) {
                    dojo.byId("PermissionResponse").innerHTML = context.i18n.FilePermission + ": " + response.FilePermissionResponse.UserPermission;
                });
            }
        },

        getRow: function (rtitle) {
            for (var i = 0; i < this.permissionsStore.data.length; ++i) {
                if (this.permissionsStore.data[i].rtitle === rtitle) {
                    return this.permissionsStore.data[i];
                }
            }
            return null;
        },

        _onCodeGenerator: function () {
            var row = this.getRow("Module");
            if (row) {
                var codeGeneratorPermissionsTab = this.ensurePermissionsPane(row.basedn, {
                    Basedn: row.basedn,
                    Rtype: "service",
                    Rtitle: "CodeGenerator Permission",
                    Name: "",
                    prefix: "codegenerator.",
                    action: "Code Generator",
                    TabName: this.i18n.title_CodeGeneratorPermissions,

                    DefaultPermissions: true
                });
                this.selectChild(codeGeneratorPermissionsTab);
            }
        },

        //  Groups  ---
        _onRefreshGroups: function () {
            this.refreshGroupsGrid();
        },

        _onEditGroup: function (event) {
            var selections = this.groupsGrid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var tab = this.ensureGroupPane("Group" + selections[i].name, {
                    Name: selections[i].name
                });
                if (i === 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onDeleteGroup: function (params) {
            var selection = this.groupsGrid.getSelected();
            var list = this.arrayToList(selection, "name");
            if (confirm(this.i18n.DeleteSelectedGroups + "\n" + list)) {
                var request = {
                    ActionType: "delete"
                };
                arrayUtil.forEach(selection, function (item, idx) {
                    request["groupnames_i" + idx] = item.name;
                }, this);

                var context = this;
                WsAccess.GroupAction({
                    request: request
                }).then(function (response) {
                    context.refreshGroupsGrid(true);
                    return response;
                });
            }
        },

        _onExportGroup: function (params) {
            var selections = this.groupsGrid.getSelected();
            var groupnames = "";
            arrayUtil.forEach(selections, function (item, idx) {
                if (groupnames.length) {
                    groupnames += "&";
                }
                groupnames += "groupnames_i" + idx + "=" + item.name;
            }, this);
            var base = new ESPBase.default();
            window.open(base.getBaseURL("ws_access") + "/UserAccountExport?" + groupnames);
        },

        _onGroupsRowDblClick: function (name) {
            var groupTab = this.ensureGroupPane("Group" + name, {
                Name: name
            });
            this.selectChild(groupTab);
        },

        _onAddGroupSubmit: function () {
            if (this.addGroupForm.validate()) {
                var context = this;
                var request = domForm.toObject(this.addGroupForm.id);
                WsAccess.GroupAdd({
                    request: request
                }).then(function (response) {
                    if (lang.exists("GroupAddResponse.retcode", response) && response.GroupAddResponse.retcode === 0) {
                        context.refreshGroupsGrid();
                        context._onGroupsRowDblClick(response.GroupAddResponse.groupname);
                    }
                    return response;
                });
                registry.byId(this.id + "AddGroupsDropDown").closeDropDown();
            }
        },

        //  Users  ---
        _onRefreshUsers: function () {
            this.refreshUsersGrid();
        },

        _onEditUser: function (event) {
            var selections = this.usersGrid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var tab = this.ensureUserPane(selections[i].username, {
                    Username: selections[i].username,
                    EmployeeID: selections[i].employeeID,
                    Fullname: selections[i].fullname,
                    Passwordexpiration: selections[i].passwordexpiration
                });
                if (i === 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onDeleteUser: function (params) {
            var selection = this.usersGrid.getSelected();
            var list = this.arrayToList(selection, "username");
            if (confirm(this.i18n.DeleteSelectedUsers + "\n" + list)) {
                var request = {
                    ActionType: "delete"
                };
                arrayUtil.forEach(selection, function (item, idx) {
                    request["usernames_i" + idx] = item.username;
                }, this);
                var context = this;
                WsAccess.UserAction({
                    request: request
                }).then(function (response) {
                    context.refreshUsersGrid(true);
                });
            }
        },

        _onExportUser: function (params) {
            var selections = this.usersGrid.getSelected();
            var usernames = "";
            arrayUtil.forEach(selections, function (item, idx) {
                if (usernames.length) {
                    usernames += "&";
                }
                usernames += "usernames_i" + idx + "=" + item.username;
            }, this);
            var base = new ESPBase.default();
            window.open(base.getBaseURL("ws_access") + "/UserAccountExport?" + usernames);
        },

        _onUsersRowDblClick: function (username, employeeID, fullname, passwordexpiration) {
            var userTab = this.ensureUserPane(username, {
                Username: username,
                EmployeeID: employeeID,
                Fullname: fullname,
                Passwordexpiration: passwordexpiration
            });
            this.selectChild(userTab);
        },

        _onSubmitAddUserDialog: function (event) {
            if (this.addUserForm.validate()) {
                var context = this;
                var request = domForm.toObject(this.addUserForm.id);
                lang.mixin(request, {
                    password1: request.password,
                    password2: request.password
                })
                WsAccess.AddUser({
                    request: request
                }).then(function (response) {
                    if (lang.exists("AddUserResponse.retcode", response) && response.AddUserResponse.retcode === 0) {
                        context.refreshUsersGrid();
                        context._onUsersRowDblClick(request.username);
                    }
                    return response;
                });
                registry.byId(this.id + "AddUsersDropDown").closeDropDown();
            }
        },

        //  Groups  ---
        _onRefreshPermissions: function () {
            this.refreshPermissionsGrid();
        },

        _onAddPermissionSubmit: function (event) {
            var selRow = this.addPermissionType.__hpcc_data[this.addPermissionType.get("value")];
            if (selRow) {
                var request = lang.mixin(selRow, domForm.toObject(this.id + "AddPermissionForm"));
                var context = this;
                WsAccess.ResourceAdd({
                    request: request
                }).then(function (response) {
                    context.refreshPermissionsGrid();
                    return response;
                });
                registry.byId(this.id + "AddPermissionsDropDown").closeDropDown();
            }
        },

        _onEditPermission: function (event) {
            var selections = this.permissionsGrid.getSelected();
            var firstTab = null;
            for (var i = selections.length - 1; i >= 0; --i) {
                var tab = this.ensurePermissionsPane("Permissions" + selections[i].name, {
                    Name: selections[i].name
                });
                if (i === 0) {
                    firstTab = tab;
                }
            }
            if (firstTab) {
                this.selectChild(firstTab);
            }
        },

        _onDeletePermission: function (params) {
            var selection = this.permissionsGrid.getSelected();
            var list = this.arrayToList(selection, "DisplayName");
            if (confirm(this.i18n.DeleteSelectedPermissions + "\n" + list)) {
                var deleteRequests = {};
                arrayUtil.forEach(selection, function (item, idx) {
                    if (!deleteRequests[item.__hpcc_id]) {
                        deleteRequests[item.__hpcc_id] = {
                            action: "Delete",
                            basedn: item.__hpcc_parent.basedn,
                            rtype: item.__hpcc_parent.rtype,
                            rtitle: item.__hpcc_parent.rtitle
                        }
                    }
                    deleteRequests[item.__hpcc_id]["names_i" + idx] = item.name;
                }, this);
                var context = this;
                var requests = [];
                for (var key in deleteRequests) {
                    requests.push(WsAccess.ResourceDelete({
                        request: deleteRequests[key]
                    }));
                }
                all(requests).then(function () {
                    context.refreshPermissionsGrid(true);
                });
            }
        },

        _onPermissionsRowDblClick: function (basedn, rtype, rtitle, name, description) {
            var permissionsTab = this.ensurePermissionsPane(name, {
                Basedn: basedn,
                Rtype: rtype,
                Rtitle: rtitle,
                Name: name,
                Description: description
            });
            this.selectChild(permissionsTab);
        },

        _onSubmitAddPermissionDialog: function (event) {
        },

        //  Implementation  ---
        init: function (params) {
            if (this.inherited(arguments))
                return;

            this.initGroupsGrid();
            this.initUsersGrid();
            this.initPermissionsGrid();

            var context = this;
            this.usersGrid.on("dgrid-refresh-complete", function (evt) {
                if (context.usersStore.ldapTooMany) {
                    context.setVisible(context.id + "LDAPWarning", true);
                    context.filter.open();
                } else {
                    context.setVisible(context.id + "LDAPWarning", false);
                }
            });

            this.usersSelect.init({
                Users: true,
                includeBlank: true
            });

            this.groupsSelect.init({
                UserGroups: true,
                includeBlank: true
            });

            this.filter.on("clear", function (evt) {
                context.refreshHRef();
                context.refreshUsersGrid();
            });
            this.filter.on("apply", function (evt) {
                context.refreshHRef();
                context.refreshUsersGrid();
            });

            this.filePermissionDialog.on("cancel", function(evt){
                context._onCloseFilePermissions();
            });

            this.groupsSelect.on("click", function(evt){
                context.usersSelect.set("value", "");
            });

            this.usersSelect.on("click", function(evt){
                context.groupsSelect.set("value", "");
            });

            WsAccount.MyAccount({
            }).then(function (response){
                if (lang.exists("MyAccountResponse.distinguishedName", response)) {
                    context.addGroupOwner.set("value", response.MyAccountResponse.distinguishedName);
                }
            });

            this.refreshActionState();
        },

        //  Groups  ---
        initGroupsGrid: function () {
            this.initGroupsContextMenu();
            var store = WsAccess.CreateGroupsStore(null, true);
            this.groupsGrid = declare([ESPUtil.Grid(true, true)])({
                sort: [{ attribute: "name" }],
                store: store,
                columns: {
                    check: selector({
                        width: 27,
                        label: " "
                    }, "checkbox"),
                    name: {
                        label: this.i18n.GroupName,
                        formatter: function (_name, idx) {
                            return "<a href='#' class='dgrid-row-url'>" + _name + "</a>"
                        }
                    },
                    groupOwner: {
                        label: this.i18n.ManagedBy
                    },
                    groupDesc: {
                        label: this.i18n.Description
                    }
                }
            }, this.id + "GroupsGrid");
            var context = this;
            this.groupsGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onGroupsRowDblClick) {
                    var item = context.groupsGrid.row(evt).data;
                    context._onGroupsRowDblClick(item.name);
                }
            });
            this.groupsGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onGroupsRowDblClick) {
                    var item = context.groupsGrid.row(evt).data;
                    context._onGroupsRowDblClick(item.name);
                }
            });
            this.groupsGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.groupsGrid.startup();
        },

        initGroupsContextMenu: function () {
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.id + "GroupsGrid"]
            });
            pMenu.addChild(new MenuItem({
                label: this.i18n.Add,
                onClick: function (args) {
                    registry.byId(context.id + "AddGroupsDropDown").openDropDown();
                }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Edit,
                onClick: function (args) { context._onEditGroup(); }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Delete,
                onClick: function (args) { context._onDeleteGroup(); }
            }));
            pMenu.addChild(new MenuSeparator());
            pMenu.addChild(new MenuItem({
                label: this.i18n.Refresh,
                onClick: function (args) { context._onRefreshGroups(); }
            }));
        },

        refreshGroupsGrid: function (clearSelection) {
            this.groupsGrid.set("query", {
                id: "*"
            });
            if (clearSelection) {
                this.groupsGrid.clearSelection();
            }
        },

        ensureGroupPane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                retVal = new GroupDetailsWidget({
                    id: id,
                    title: params.Name,
                    iconClass: 'iconPeople',
                    closable: true,
                    params: params
                });
                this.addChild(retVal, 3);
            }
            return retVal;
        },

        //  Users  ---
        initUsersGrid: function () {
            this.initUsersContextMenu();
            this.usersStore = WsAccess.CreateUsersStore(null, true);
            this.usersGrid = declare([ESPUtil.Grid(true, true)])({
                store: this.usersStore,
                query: this.filter.toObject(),
                sort: [{ attribute: "username" }],
                columns: {
                    check: selector({
                        width: 27,
                        label: " "
                    },"checkbox"),
                    username: {
                        width: 180,
                        label: this.i18n.Username,
                        sortable: true,
                        formatter: function (_name, idx) {
                            return "<a href='#' class='dgrid-row-url'>" + _name + "</a>"
                        }
                    },
                    employeeID: {
                        width: 180,
                        sortable: true,
                        label: this.i18n.EmployeeID
                    },
                    fullname: {
                        label: this.i18n.FullName,
                        sortable: true
                    },
                    passwordexpiration: {
                        width: 180,
                        label: this.i18n.PasswordExpiration,
                        sortable: true
                    }
                }
            }, this.id + "UsersGrid");
            var context = this;

            this.usersGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onUsersRowDblClick) {
                    var item = context.usersGrid.row(evt).data;
                    context._onUsersRowDblClick(item.username,item.employeeID,item.fullname,item.passwordexpiration);
                }
            });
            this.usersGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onUsersRowDblClick) {
                    var item = context.usersGrid.row(evt).data;
                    context._onUsersRowDblClick(item.username,item.employeeID,item.fullname,item.passwordexpiration);
                }
            });
            this.usersGrid.onSelectionChanged(function (event) {
                context.refreshActionState();
            });
            this.usersGrid.startup();
        },

        initUsersContextMenu: function () {
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.id + "UsersGrid"]
            });
            pMenu.addChild(new MenuItem({
                label: this.i18n.Add,
                onClick: function (args) {
                    registry.byId(context.id + "AddUsersDropDown").openDropDown();
                }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Edit,
                onClick: function (args) { context._onEditUser(); }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Delete,
                onClick: function (args) { context._onDeleteUser(); }
            }));
            pMenu.addChild(new MenuSeparator());
            pMenu.addChild(new MenuItem({
                label: this.i18n.Refresh,
                onClick: function (args) { context._onRefreshUsers(); }
            }));
        },

        ensureUserPane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                retVal = new UserDetailsWidget({
                    id: id,
                    title: params.Username,
                    iconClass: 'iconPerson',
                    closable: true,
                    params: params
                });
                this.addChild(retVal, "last");
            }
            return retVal;
        },

        refreshUsersGrid: function (clearSelection) {
            this.usersGrid.set("query", this.filter.toObject());
            if (clearSelection) {
                this.usersGrid.clearSelection();
            }
        },

        //  Permissions  ---
        initPermissionsGrid: function () {
            WsAccess.Permissions().then(lang.hitch(this, function (response) {
                var options = [];
                var optionMap = {};
                if (lang.exists("BasednsResponse.Basedns.Basedn", response)) {
                    arrayUtil.forEach(response.BasednsResponse.Basedns.Basedn, function (item, idx) {
                        options.push({
                            label: item.name,
                            value: item.basedn
                        });
                        optionMap[item.basedn] = item;
                    }, this);
                }
                this.addPermissionType.set("options", options);
                if (options.length) {
                    this.addPermissionType.set("value", options[0].value);
                }
                this.addPermissionType.set("__hpcc_data", optionMap);
                return response;
            }));

            this.initPermissionsContextMenu();
            this.permissionsStore = WsAccess.CreatePermissionsStore();
            this.permissionsGrid = declare([ESPUtil.Grid(false, true)])({
                allowSelectAll: true,
                deselectOnRefresh: true,
                sort: [{ attribute: "DisplayName" }],
                store: this.permissionsStore,
                columns: {
                    check: selector({
                        width: 27,
                        disabled: function (row) {
                            if (row.name === "File Scopes" || row.name === "Workunit Scopes" || row.name === "Repository Modules") {
                                return false;
                            }
                            return row.children ? true : false;
                        }
                    }, "checkbox"),
                    name: tree({
                        width: 360,
                        sortable: false,
                        label: this.i18n.Name,
                        formatter: function (_name, idx) {
                            if (idx.__hpcc_parent) {
                                return "<a href='#' class='dgrid-row-url'>" + _name + "</a>"
                            } else {
                              return _name;
                            }
                        }
                    }),
                    description: {
                        width: 360,
                        sortable: false,
                        label: this.i18n.Description
                    },
                    basedn: {
                        sortable: false,
                        label: "basedn"
                    }
                }
            }, this.id + "PermissionsGrid");
            var context = this;
            this.permissionsGrid.on(".dgrid-row-url:click", function (evt) {
                if (context._onPermissionsRowDblClick) {
                    var item = context.permissionsGrid.row(evt).data;
                    context._onPermissionsRowDblClick(item.__hpcc_parent.basedn, item.__hpcc_parent.rtype, item.__hpcc_parent.rtitle, item.name, item.DisplayName);
                }
            });
            this.permissionsGrid.on(".dgrid-row:dblclick", function (evt) {
                if (context._onPermissionsRowDblClick) {
                    var item = context.permissionsGrid.row(evt).data;
                    context._onPermissionsRowDblClick(item.__hpcc_parent.basedn, item.__hpcc_parent.rtype, item.__hpcc_parent.rtitle, item.name, item.DisplayName);
                }
            });
            this.permissionsGrid.onSelectionChanged(function (event) {
                context.refreshActionState(event);
            });
            this.permissionsGrid.startup();
        },

        initPermissionsContextMenu: function () {
            var context = this;
            var pMenu = new Menu({
                targetNodeIds: [this.id + "PermissionsGrid"]
            });
            pMenu.addChild(new MenuItem({
                label: this.i18n.Add,
                onClick: function (args) {
                    registry.byId(context.id + "AddPermissionsDropDown").openDropDown();
                }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Edit,
                onClick: function (args) { context._onEditPermission(); }
            }));
            pMenu.addChild(new MenuItem({
                label: this.i18n.Delete,
                onClick: function (args) { context._onDeletePermission(); }
            }));
            pMenu.addChild(new MenuSeparator());
            pMenu.addChild(new MenuItem({
                label: this.i18n.Refresh,
                onClick: function (args) { context._onRefreshPermissions(); }
            }));
        },

        refreshPermissionsGrid: function (clearSelection) {
            this.permissionsGrid.set("query", {
                id: "*"
            });
            if (clearSelection) {
                this.permissionsGrid.clearSelection();
            }
        },

        ensurePermissionsPane: function (id, params) {
            id = this.createChildTabID(id);
            var retVal = registry.byId(id);
            if (!retVal) {
                retVal = new ShowIndividualPermissionsWidget({
                    id: id,
                    title: params.TabName ? params.TabName : params.Name,
                    iconClass: 'iconPeople',
                    closable: true,
                    params: params
                });
                this.addChild(retVal, "last");
            }
            return retVal;
        },

        //  ---  ---
        initTab: function () {
            var currSel = this.getSelectedChild();
            if (currSel && !currSel.initalized) {
                if (currSel.id === this.groupsTab.id) {
                } else if (currSel.id === this.usersTab.id) {
                    this.refreshUsersGrid();
                } else if (currSel.id === this.permissionsTab.id) {
                } else {
                    if (!currSel.initalized) {
                        currSel.init(currSel.params);
                    }
                }
            }
        },

        refreshActionState: function (event) {
            var userSelection = this.usersGrid.getSelected();
            var hasUserSelection = userSelection.length;
            registry.byId(this.id + "EditUsers").set("disabled", !hasUserSelection);
            registry.byId(this.id + "DeleteUsers").set("disabled", !hasUserSelection);
            registry.byId(this.id + "ExportUsers").set("disabled", !hasUserSelection);

            var groupSelection = this.groupsGrid.getSelected();
            var hasGroupSelection = groupSelection.length;
            registry.byId(this.id + "EditGroups").set("disabled", !hasGroupSelection);
            registry.byId(this.id + "DeleteGroups").set("disabled", !hasGroupSelection);
            registry.byId(this.id + "ExportGroups").set("disabled", !hasGroupSelection);

            var permissionSelection = this.permissionsGrid.getSelected();
            var hasPermissionSelection = permissionSelection.length;

            if (hasPermissionSelection && permissionSelection[0].name === "File Scopes") {
                var context = this;
                WsAccess.Resources({
                    request: {
                        basedn: event.rows[0].id,
                        rtype: "file",
                        rtitle: "FileScope"
                    }
                }).then(function (response) {
                    if (lang.exists("ResourcesResponse.scopeScansStatus", response)) {
                        var scopeScansEnabled;
                        scopeScansEnabled = response.ResourcesResponse.scopeScansStatus.isEnabled;
                        registry.byId(context.id + "EnableScopeScans").set("disabled", scopeScansEnabled);
                        registry.byId(context.id + "DisableScopeScans").set("disabled", !scopeScansEnabled);
                    }
                });
            }

            registry.byId(this.id + "FileScopeDefaultPermissions").set("disabled", true);
            registry.byId(this.id + "WorkUnitScopeDefaultPermissions").set("disabled", true);
            registry.byId(this.id + "PhysicalFiles").set("disabled", true);
            registry.byId(this.id + "CheckFilePermissions").set("disabled", true);
            registry.byId(this.id + "CodeGenerator").set("disabled", true);
            registry.byId(this.id + "AdvancedPermissions").set("disabled", true);
            registry.byId(this.id + "DeletePermissions").set("disabled", !hasPermissionSelection);

            for (var i = 0; i < permissionSelection.length; ++i) {
                if (permissionSelection[i].children) {
                    registry.byId(this.id + "DeletePermissions").set("disabled", true);
                }
                switch (permissionSelection[i].name) {
                    case "File Scopes":
                        registry.byId(this.id + "PhysicalFiles").set("disabled", !hasPermissionSelection);
                        registry.byId(this.id + "FileScopeDefaultPermissions").set("disabled", !hasPermissionSelection);
                        registry.byId(this.id + "CheckFilePermissions").set("disabled", !hasPermissionSelection);
                        registry.byId(this.id + "AdvancedPermissions").set("disabled", !hasPermissionSelection);
                    break;
                    case "Workunit Scopes":
                        registry.byId(this.id + "WorkUnitScopeDefaultPermissions").set("disabled", !hasPermissionSelection);
                        registry.byId(this.id + "AdvancedPermissions").set("disabled", !hasPermissionSelection);
                    break;
                    case "Repository Modules":
                        registry.byId(this.id + "CodeGenerator").set("disabled", !hasPermissionSelection);
                        registry.byId(this.id + "AdvancedPermissions").set("disabled", !hasPermissionSelection);
                    break;
                }
            }
        }
    });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./lib/src/ESPBase.js":
/*!****************************!*\
  !*** ./lib/src/ESPBase.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/config */ "./node_modules/dojo/_base/config.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, config) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ESPBase = /** @class */ (function () {
        function ESPBase(args) {
            if (args) {
                declare.safeMixin(this, args);
            }
        }
        ESPBase.prototype.getParam = function (key) {
            var value = dojo.queryToObject(dojo.doc.location.search.substr((dojo.doc.location.search.substr(0, 1) === "?" ? 1 : 0)))[key];
            if (value)
                return value;
            return config[key];
        };
        ESPBase.prototype.getBaseURL = function (service) {
            if (!service) {
                service = "WsWorkunits";
            }
            var serverIP = this.getParam("serverIP");
            if (serverIP)
                return "http://" + serverIP + ":8010/" + service;
            return "/" + service;
        };
        ESPBase.prototype.getValue = function (domXml, tagName, knownObjectArrays) {
            var retVal = this.getValues(domXml, tagName, knownObjectArrays);
            if (retVal.length === 0) {
                return null;
            }
            else if (retVal.length !== 1) {
                alert("Invalid length:  " + retVal.length);
            }
            return retVal[0];
        };
        ESPBase.prototype.getValues = function (domXml, tagName, knownObjectArrays) {
            var retVal = [];
            var items = domXml.getElementsByTagName(tagName);
            var parentNode = items.length ? items[0].parentNode : null; //  Prevent <Dataset><row><field><row> scenario
            for (var i = 0; i < items.length; ++i) {
                if (items[i].parentNode === parentNode)
                    retVal.push(this.flattenXml(items[i], knownObjectArrays));
            }
            return retVal;
        };
        ESPBase.prototype.flattenXml = function (domXml, knownObjectArrays) {
            var retValArr = [];
            var retValStr = "";
            var retVal = {};
            for (var i = 0; i < domXml.childNodes.length; ++i) {
                var childNode = domXml.childNodes[i];
                if (childNode.childNodes) {
                    if (childNode.nodeName && knownObjectArrays != null && dojo.indexOf(knownObjectArrays, childNode.nodeName) >= 0) {
                        retValArr.push(this.flattenXml(childNode, knownObjectArrays));
                    }
                    else if (childNode.nodeName === "#text") {
                        retValStr += childNode.nodeValue;
                    }
                    else if (childNode.childNodes.length === 0) {
                        retVal[childNode.nodeName] = null;
                    }
                    else {
                        var value = this.flattenXml(childNode, knownObjectArrays);
                        if (retVal[childNode.nodeName] == null) {
                            retVal[childNode.nodeName] = value;
                        }
                        else if (dojo.isArray(retVal[childNode.nodeName])) {
                            retVal[childNode.nodeName].push(value);
                        }
                        else if (dojo.isObject(retVal[childNode.nodeName])) {
                            var tmp = retVal[childNode.nodeName];
                            retVal[childNode.nodeName] = [];
                            retVal[childNode.nodeName].push(tmp);
                            retVal[childNode.nodeName].push(value);
                        }
                    }
                }
            }
            if (retValArr.length)
                return retValArr;
            else if (retValStr.length)
                return retValStr;
            return retVal;
        };
        return ESPBase;
    }());
    exports.default = ESPBase;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPBase.js.map

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/GroupDetailsWidget.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/GroupDetailsWidget.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Summary}\", iconClass:\"iconUsers\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}SaveGroup\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-props=\"disabled: true\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <span id=\"${id}Group\" class=\"bold\">${i18n.GroupName}</span>\n                    </h2>\n                    <h3>\n                        <span class=\"bold\">${i18n.ContactAdmin}</span>\n                    </h3>\n                    <form>\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Name\">${i18n.Name}:</label>\n                                <input id=\"${id}Name\" name=\"name\" data-dojo-props=\"trim: true, disabled: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_Members\" data-dojo-props=\"delayWidget: 'MembersWidget', title:'${i18n.Members}', iconClass:'iconGroups'\" data-dojo-type=\"DelayLoadWidget\"></div>\n            <div id=\"${id}_ActivePermissions\" data-dojo-props=\"delayWidget: 'ShowAccountPermissionsWidget', title:'${i18n.title_ActiveGroupPermissions}', iconClass:'iconFolder'\" data-dojo-type=\"DelayLoadWidget\"></div>\n            <div id=\"${id}_GroupPermissions\" data-dojo-props=\"delayWidget: 'PermissionsWidget', title:'${i18n.title_AvailableGroupPermissions}', iconClass:'iconFolder'\" data-dojo-type=\"DelayLoadWidget\"></div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserQueryWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/UserQueryWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Users\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Users}\", iconClass:\"iconUser\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}UsersRefresh\" data-dojo-attach-event=\"onClick:_onRefreshUsers\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}EditUsers\" data-dojo-attach-event=\"onClick:_onEditUser\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}AddUsersDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Add}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}AddUserForm\" onsubmit=\"return false;\" style=\"width:400px\" data-dojo-type=\"dijit.form.Form\">\n                                <div name=\"password\" data-dojo-type=\"dojox.form.PasswordValidator\">\n                                    <table cellspacing=\"10\">\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.UserID}:</label></td>\n                                            <td><input id=\"${id}AddUsername\" name=\"username\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.EmployeeID}:</label></td>\n                                            <td><input id=\"${id}employeeID\" name=\"employeeID\" data-dojo-props=\"trim: true, required: false\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.FirstName}:</label></td>\n                                            <td><input id=\"${id}AddUserFirstName\" name=\"firstname\" data-dojo-props=\"trim: true, placeHolder:'${i18n.PlaceholderFirstName}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.LastName}:</label></td>\n                                            <td><input id=\"${id}AddUserLastName\" name=\"lastname\" data-dojo-props=\"trim: true, placeHolder:'${i18n.PlaceholderLastName}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.Password}:</label></td>\n                                            <td><input name=\"password1\" type=\"password\" pwtype=\"new\" data-dojo-props=\"trim: true, required: true, invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                        <tr>\n                                            <td><label for=\"name\">${i18n.RetypePassword}:</label></td>\n                                            <td><input name=\"password2\" type=\"password\" pwtype=\"verify\" data-dojo-props=\"trim: true, required: true, invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" /></td>\n                                        </tr>\n                                    </table>\n                                </div>\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button id=\"${id}_onAddSubmit\" type=\"submit\" data-dojo-attach-event=\"onClick:_onSubmitAddUserDialog\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}DeleteUsers\" data-dojo-attach-event=\"onClick:_onDeleteUser\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}ExportUsers\" data-dojo-attach-event=\"onClick:_onExportUser\" data-dojo-type=\"dijit.form.Button\">${i18n.Export}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}Filter\" data-dojo-type=\"FilterDropDownWidget\">\n                        <p id=\"${id}LDAPWarning\" style=\"display:none\">${i18n.LDAPWarning}</p>\n                        <input id=\"${id}SearchInput\" title=\"${i18n.User}:\" name=\"Name\" colspan=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}GridCP\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}UsersGrid\"></div>\n                </div>\n            </div>\n            <div id=\"${id}_Groups\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Groups}\", iconClass:\"iconGroup\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}GroupsToolbar\" class=\"topPanel\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}GroupsRefresh\" data-dojo-attach-event=\"onClick:_onRefreshGroups\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}EditGroups\" data-dojo-attach-event=\"onClick:_onEditGroup\" data-dojo-type=\"dijit.form.Button\">${i18n.Open}</div>\n                    <div id=\"${id}AddGroupsDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Add}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}AddGroupForm\" onsubmit=\"return false;\" style=\"width:500px\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <input id=\"${id}AddGroupName\" style=\"width:100%\" title=\"${i18n.GroupName}:\" name=\"groupname\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    <input id=\"${id}AddGroupOwner\" style=\"width:100%\" placeholder=\"${i18n.ManagedByPlaceholder}:\" title=\"${i18n.ManagedBy}:\" name=\"groupOwner\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    <input id=\"${id}AddGroupDescription\" style=\"width:100%\" title=\"${i18n.Description}:\" name=\"groupDesc\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onAddGroupSubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}DeleteGroups\" data-dojo-attach-event=\"onClick:_onDeleteGroup\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}ExportGroups\" data-dojo-attach-event=\"onClick:_onExportGroup\" data-dojo-type=\"dijit.form.Button\">${i18n.Export}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}GroupsGridCP\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}GroupsGrid\"></div>\n                </div>\n            </div>\n            <div id=\"${id}_Permissions\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Permissions}\", iconClass:\"iconPermission\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}PermissionsToolbar\" class=\"topPanel\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}PermissionsRefresh\" data-dojo-attach-event=\"onClick:_onRefreshPermissions\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}AddPermissionsDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Add}</span>\n                        <div data-dojo-type=\"dijit.TooltipDialog\">\n                            <div id=\"${id}AddPermissionForm\" onsubmit=\"return false;\" style=\"width:400px\" data-dojo-type=\"dijit.form.Form\">\n                                <div data-dojo-type=\"hpcc.TableContainer\">\n                                    <select id=\"${id}AddPermissionType\" title=\"${i18n.Type}:\" data-dojo-type=\"dijit.form.Select\">\n                                    </select>\n                                    <input id=\"${id}AddPermissionName\" title=\"${i18n.Name}:\" name=\"name\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                    <input id=\"${id}AddPermissionDescription\" title=\"${i18n.Description}:\" name=\"description\" data-dojo-props=\"trim: true, required: true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                </div>\n                                <div class=\"dijitDialogPaneActionBar\">\n                                    <button type=\"submit\" data-dojo-attach-event=\"onClick:_onAddPermissionSubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Add}</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"${id}DeletePermissions\" data-dojo-attach-event=\"onClick:_onDeletePermission\" data-dojo-type=\"dijit.form.Button\">${i18n.Delete}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div data-dojo-attach-event=\"onClick:_onClearPermissionsCache\" data-dojo-type=\"dijit.form.Button\">${i18n.ClearPermissionsCache}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}AdvancedPermissions\" data-dojo-type=\"dijit.form.DropDownButton\">\n                        <span>${i18n.Advanced}</span>\n                        <div data-dojo-type=\"dijit.DropDownMenu\">\n                            <div data-dojo-attach-event=\"onClick:_onEnableScopeScans \"id=\"${id}EnableScopeScans\" data-dojo-type=\"dijit.MenuItem\">${i18n.EnableScopeScans}</div>\n                            <div data-dojo-attach-event=\"onClick:_onDisableScopeScans\" id=\"${id}DisableScopeScans\" data-dojo-type=\"dijit.MenuItem\">${i18n.DisableScopeScans}</div>\n                            <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                            <div data-dojo-attach-event=\"onClick:_onFileScopeDefaultPermissions\" id=\"${id}FileScopeDefaultPermissions\" data-dojo-type=\"dijit.MenuItem\">${i18n.FileScopeDefaultPermissions}</div>\n                            <div data-dojo-attach-event=\"onClick:_onWorkunitScopeDefaultPermissions\" id=\"${id}WorkUnitScopeDefaultPermissions\" data-dojo-type=\"dijit.MenuItem\">${i18n.WorkUnitScopeDefaultPermissions}</div>\n                            <div data-dojo-attach-event=\"onClick:_onPhysicalFiles\" id=\"${id}PhysicalFiles\" data-dojo-type=\"dijit.MenuItem\">${i18n.PhysicalFiles}</div>\n                            <div data-dojo-attach-event=\"onClick:_onCheckFilePermissions\" id=\"${id}CheckFilePermissions\" data-dojo-type=\"dijit.MenuItem\">${i18n.CheckFilePermissions}</div>\n                            <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                            <div data-dojo-attach-event=\"onClick:_onCodeGenerator\" id=\"${id}CodeGenerator\" data-dojo-type=\"dijit.MenuItem\">${i18n.CodeGenerator}</div>\n                        </div>\n                    </div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div id=\"${id}PermissionsGridCP\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <div id=\"${id}PermissionsGrid\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}FilePermissionDialog\" data-dojo-type=\"dijit.Dialog\" title=\"${i18n.CheckFilePermissions}\">\n        <div id=\"${id}FilePermissionForm\" style=\"width:460px\" data-dojo-type=\"dijit.form.Form\">\n            <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                <p>${i18n.PleaseSelectAUserOrGroup}</p>\n                <input id=\"${id}NameSelect\" title=\"${i18n.Name}:\" name=\"FileName\" required=\"true\" colspan=\"2\" data-dojo-props=\"trim: true, required: true\"  data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                <input id=\"${id}UsersSelect\" title=\"${i18n.Users}:\" name=\"UserName\" colspan=\"2\" data-dojo-type=\"TargetSelectWidget\" />\n                <input id=\"${id}GroupsSelect\" title=\"${i18n.Groups}:\" name=\"GroupName\" colspan=\"2\" data-dojo-type=\"TargetSelectWidget\" />\n            </div>\n            <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\" style=\"margin-top:10px;\">\n                <div id=\"PermissionResponse\" colspan=\"1\"></div>\n            </div>\n            <div class=\"dijitDialogPaneActionBar\">\n                <button style=\"float:left\" data-dojo-attach-event=\"onClick:_onCloseFilePermissions\" data-dojo-type=\"dijit.form.Button\">${i18n.Close}</button>\n                <button id=\"${id}CheckFileSubmit\" data-dojo-attach-event=\"onClick:_onCheckFileSubmit\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);