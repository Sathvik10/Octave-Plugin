(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/ShowInheritedPermissionsWidget":"./eclwatch/ShowInheritedPermissionsWidget.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./eclwatch/ShowInheritedPermissionsWidget.js":
/*!****************************************************!*\
  !*** ./eclwatch/ShowInheritedPermissionsWidget.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),

    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Memory, Observable,
    registry, CheckBox,
    editor,
    GridDetailsWidget, WsAccess, ESPUtil) {
        return declare("ShowInheritedPermissionsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_Permissions,
            idProperty: "__hpcc_id",
            store: null,

            //  Hitched Actions  ---
            _onRefresh: function (args) {
                this.grid.refresh();
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.store = WsAccess.CreateInheritedPermissionsStore(params.IsGroup, params.IncludeGroup, params.AccountName, params.TabName);

                this.grid.setStore(this.store);
                this._refreshActionState();
            },

            createGrid: function (domID) {
                var context = this;
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    sort: [{ attribute: "ResourceName" }],
                    columns: {
                        ResourceName: {
                            label: this.i18n.Resource,
                            formatter: function (_name, row) {
                                return _name;
                            }
                        },
                        PermissionName: {
                            label: this.i18n.Permissions,
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

/***/ })

}]);