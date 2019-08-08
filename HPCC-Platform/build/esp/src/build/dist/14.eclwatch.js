(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/ws_access":"./lib/src/ws_access.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./lib/src/ws_access.js":
/*!******************************!*\
  !*** ./lib/src/ws_access.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/store/util/SimpleQueryEngine */ "./node_modules/dojo/store/util/SimpleQueryEngine.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, all, Memory, Observable, Deferred, QueryResults, SimpleQueryEngine, topic, ESPUtil, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var UsersStore = declare([ESPRequest.Store], {
        service: "ws_access",
        action: "UserQuery",
        responseQualifier: "UserQueryResponse.Users.User",
        responseTotalQualifier: "UserQueryResponse.TotalUsers",
        idProperty: "username",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        SortbyProperty: 'SortBy'
    });
    var GroupsStore = declare([ESPRequest.Store], {
        service: "ws_access",
        action: "GroupQuery",
        responseQualifier: "GroupQueryResponse.Groups.Group",
        responseTotalQualifier: "GroupQueryResponse.TotalGroups",
        idProperty: "name",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        SortbyProperty: 'SortBy',
        preRequest: function (request) {
            switch (request.SortBy) {
                case "name":
                    request.SortBy = "Name";
                    break;
                case "groupOwner":
                    request.SortBy = "ManagedBy";
                    break;
            }
        }
    });
    var CONCAT_SYMBOL = ":";
    var ResourcesStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        put: ESPUtil.override(function (inherited, row) {
            this.get(row.__hpcc_id);
            var retVal = inherited(arguments);
            var request = {
                account_name: this.groupname ? this.groupname : this.username,
                account_type: this.groupname ? 1 : 0,
                basedn: row.__hpcc_parent.basedn,
                rtitle: row.__hpcc_parent.rtitle,
                rtype: row.__hpcc_parent.rtype,
                rname: row.name,
                action: "update"
            };
            lang.mixin(request, row);
            delete request['__hpcc_parent'];
            PermissionAction({
                request: request
            });
            return retVal;
        }),
        query: function (query, options) {
            var results = all([
                this.refreshResources(query),
                this.refreshAccountPermissions(query)
            ]).then(lang.hitch(this, function (response) {
                var accountPermissions = {};
                arrayUtil.forEach(response[1], function (item, idx) {
                    accountPermissions[item.PermissionName] = item;
                }, this);
                var data = [];
                arrayUtil.forEach(response[0], function (item, idx) {
                    var accountPermission = accountPermissions[item.name];
                    data.push(lang.mixin(item, {
                        __hpcc_type: "Resources",
                        __hpcc_id: this.parentRow.__hpcc_id + CONCAT_SYMBOL + item.name,
                        __hpcc_parent: this.parentRow,
                        DisplayName: item.description ? item.description : item.name,
                        AccountName: this.groupname,
                        allow_access: accountPermission ? accountPermission.allow_access : false,
                        allow_read: accountPermission ? accountPermission.allow_read : false,
                        allow_write: accountPermission ? accountPermission.allow_write : false,
                        allow_full: accountPermission ? accountPermission.allow_full : false,
                        deny_access: accountPermission ? accountPermission.deny_access : false,
                        deny_read: accountPermission ? accountPermission.deny_read : false,
                        deny_write: accountPermission ? accountPermission.deny_write : false,
                        deny_full: accountPermission ? accountPermission.deny_full : false
                    }));
                }, this);
                options = options || {};
                this.setData(SimpleQueryEngine({}, { sort: options.sort })(data));
                return this.data;
            }));
            return QueryResults(results);
        },
        refreshResources: function (query) {
            return Resources({
                request: {
                    basedn: this.parentRow.basedn,
                    rtype: this.parentRow.rtype,
                    rtitle: this.parentRow.rtitle
                }
            }).then(lang.hitch(this, function (response) {
                if (lang.exists("ResourcesResponse.Resources.Resource", response)) {
                    return response.ResourcesResponse.Resources.Resource;
                }
                return [];
            }));
        },
        refreshAccountPermissions: function () {
            if (!this.groupname && !this.username) {
                return [];
            }
            return AccountPermissions({
                request: {
                    AccountName: this.groupname ? this.groupname : this.username,
                    IsGroup: this.groupname ? true : false,
                    IncludeGroup: false
                }
            }).then(lang.hitch(this, function (response) {
                if (lang.exists("AccountPermissionsResponse.Permissions.Permission", response)) {
                    return response.AccountPermissionsResponse.Permissions.Permission;
                }
                return [];
            }));
        }
    });
    var InheritedPermissionStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        put: ESPUtil.override(function (inherited, row) {
            this.get(row.__hpcc_id);
            var retVal = inherited(arguments);
            var request = {
                basedn: row.basedn,
                rtype: row.rtype,
                rname: row.rname,
                rtitle: row.rtitle,
                account_name: row.account_name,
                account_type: 0,
                action: "update"
            };
            lang.mixin(request, row);
            PermissionAction({
                request: request
            });
            return retVal;
        }),
        query: function (query, options) {
            var data = [];
            var results = all([
                this.refreshAccountPermissions(query)
            ]).then(lang.hitch(this, function (response) {
                var accountPermissions = {};
                arrayUtil.forEach(response[0], function (item, idx) {
                    accountPermissions[item.PermissionName] = item;
                    data.push(lang.mixin(item, {
                        __hpcc_type: "InheritedPermissions",
                        __hpcc_id: this.TabName + CONCAT_SYMBOL + this.AccountName + CONCAT_SYMBOL + item.PermissionName + CONCAT_SYMBOL + idx,
                        rname: item.PermissionName,
                        rtype: item.RType,
                        rtitle: item.ResourceName,
                        account_name: this.TabName,
                        allow_access: item ? item.allow_access : false,
                        allow_read: item ? item.allow_read : false,
                        allow_write: item ? item.allow_write : false,
                        allow_full: item ? item.allow_full : false,
                        deny_access: item ? item.deny_access : false,
                        deny_read: item ? item.deny_read : false,
                        deny_write: item ? item.deny_write : false,
                        deny_full: item ? item.deny_full : false
                    }));
                }, this);
                options = options || {};
                this.setData(SimpleQueryEngine({}, { sort: options.sort })(data));
                return this.data;
            }));
            return QueryResults(results);
        },
        refreshAccountPermissions: function () {
            if (!this.AccountName) {
                return [];
            }
            return AccountPermissions({
                request: {
                    AccountName: this.AccountName,
                    IsGroup: false,
                    IncludeGroup: true,
                    TabName: this.TabName
                }
            }).then(lang.hitch(this, function (response) {
                if (lang.exists("AccountPermissionsResponse.GroupPermissions.GroupPermission", response)) {
                    var arr = response.AccountPermissionsResponse.GroupPermissions.GroupPermission;
                    for (var index in arr) {
                        if (arr[index].GroupName === this.TabName) {
                            return response.AccountPermissionsResponse.GroupPermissions.GroupPermission[index].Permissions.Permission;
                        }
                    }
                }
                return [];
            }));
        }
    });
    var AccountResourcesStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        put: ESPUtil.override(function (inherited, row) {
            this.get(row.__hpcc_id);
            var retVal = inherited(arguments);
            var request = {
                basedn: row.basedn,
                rtype: row.rtype,
                rname: row.rname,
                rtitle: row.rtitle,
                account_name: row.account_name,
                account_type: 0,
                action: "update"
            };
            lang.mixin(request, row);
            PermissionAction({
                request: request
            });
            return retVal;
        }),
        query: function (query, options) {
            var data = [];
            var results = all([
                this.refreshAccountPermissions(query)
            ]).then(lang.hitch(this, function (response) {
                var accountPermissions = {};
                arrayUtil.forEach(response[0], function (item, idx) {
                    accountPermissions[item.PermissionName] = item;
                    data.push(lang.mixin(item, {
                        __hpcc_type: "AccountPermissions",
                        __hpcc_id: this.AccountName + CONCAT_SYMBOL + item.PermissionName + CONCAT_SYMBOL + idx,
                        rname: item.PermissionName,
                        rtype: item.RType,
                        rtitle: item.ResourceName,
                        account_name: this.AccountName,
                        allow_access: item ? item.allow_access : false,
                        allow_read: item ? item.allow_read : false,
                        allow_write: item ? item.allow_write : false,
                        allow_full: item ? item.allow_full : false,
                        deny_access: item ? item.deny_access : false,
                        deny_read: item ? item.deny_read : false,
                        deny_write: item ? item.deny_write : false,
                        deny_full: item ? item.deny_full : false
                    }));
                }, this);
                options = options || {};
                this.setData(SimpleQueryEngine({}, { sort: options.sort })(data));
                return this.data;
            }));
            return QueryResults(results);
        },
        refreshAccountPermissions: function () {
            if (!this.AccountName) {
                return [];
            }
            return AccountPermissions({
                request: {
                    AccountName: this.AccountName,
                    IsGroup: this.IsGroup ? true : false,
                    IncludeGroup: this.IsGroup ? true : false
                }
            }).then(lang.hitch(this, function (response) {
                if (lang.exists("AccountPermissionsResponse.Permissions.Permission", response)) {
                    return response.AccountPermissionsResponse.Permissions.Permission;
                }
                return [];
            }));
        }
    });
    var IndividualPermissionsStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        put: ESPUtil.override(function (inherited, row) {
            this.get(row.__hpcc_id);
            var retVal = inherited(arguments);
            var request = {
                basedn: row.basedn,
                rtype: row.rtype,
                rtitle: row.rtitle,
                rname: row.name,
                action: "update"
            };
            lang.mixin(request, row);
            PermissionAction({
                request: request
            });
            return retVal;
        }),
        query: function (query, options) {
            var data = [];
            var results = all([
                this.refreshAccountPermissions(query)
            ]).then(lang.hitch(this, function (response) {
                var accountPermissions = {};
                arrayUtil.forEach(response[0], function (item, idx) {
                    accountPermissions[item.account_name] = item;
                    data.push(lang.mixin(item, {
                        __hpcc_type: "IndividualPermissions",
                        __hpcc_id: this.name + CONCAT_SYMBOL + idx,
                        basedn: this.basedn,
                        rtype: this.rtype,
                        rtitle: this.rtitle,
                        rname: this.name,
                        account_name: item.account_name,
                        allow_access: item ? item.allow_access : false,
                        allow_read: item ? item.allow_read : false,
                        allow_write: item ? item.allow_write : false,
                        allow_full: item ? item.allow_full : false,
                        deny_access: item ? item.deny_access : false,
                        deny_read: item ? item.deny_read : false,
                        deny_write: item ? item.deny_write : false,
                        deny_full: item ? item.deny_full : false
                    }));
                }, this);
                options = options || {};
                this.setData(SimpleQueryEngine({}, { sort: options.sort })(data));
                return this.data;
            }));
            return QueryResults(results);
        },
        refreshAccountPermissions: function () {
            if (!this.name) {
                return [];
            }
            return ResourcePermissions({
                request: {
                    basedn: this.basedn,
                    rtype: this.rtype,
                    rtitle: this.rtitle,
                    name: this.name
                }
            }).then(lang.hitch(this, function (response) {
                if (lang.exists("ResourcePermissionsResponse.Permissions.Permission", response)) {
                    return response.ResourcePermissionsResponse.Permissions.Permission;
                }
                return [];
            }));
        }
    });
    var PermissionsStore = declare([Memory], {
        service: "ws_access",
        action: "Permissions",
        responseQualifier: "BasednsResponse.Basedns.Basedn",
        idProperty: "__hpcc_id",
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        get: ESPUtil.override(function (inherited, id) {
            var tmp = id.split(CONCAT_SYMBOL);
            if (tmp.length > 0) {
                var parentID = tmp[0];
                var parent = inherited([parentID]);
                if (tmp.length === 1) {
                    return parent;
                }
                var child = parent.children.get(id);
                if (child) {
                    return child;
                }
                return parent;
            }
            return null;
        }),
        putChild: function (row) {
            var parent = row.__hpcc_parent;
            return parent.children.put(row);
        },
        getChildren: function (parent, options) {
            return parent.children.query();
        },
        mayHaveChildren: function (object) {
            return object.__hpcc_type === "Permission";
        },
        query: function (query, options) {
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            Permissions().then(lang.hitch(this, function (response) {
                var data = [];
                if (lang.exists("BasednsResponse.Basedns.Basedn", response)) {
                    arrayUtil.forEach(response.BasednsResponse.Basedns.Basedn, function (item, idx) {
                        data.push(lang.mixin(item, {
                            __hpcc_type: "Permission",
                            __hpcc_id: item.basedn,
                            DisplayName: item.name,
                            children: lang.mixin(CreateResourcesStore(this.groupname, this.username, item.basedn), {
                                parent: this,
                                parentRow: item
                            })
                        }));
                    }, this);
                }
                options = options || {};
                this.setData(SimpleQueryEngine({}, { sort: options.sort })(data));
                deferredResults.resolve(this.data);
                deferredResults.total.resolve(this.data.length);
            }));
            return QueryResults(deferredResults);
        }
    });
    function checkError(response, sourceMethod, showOkMsg) {
        var retCode = lang.getObject(sourceMethod + "Response.retcode", false, response);
        var retMsg = lang.getObject(sourceMethod + "Response.retmsg", false, response);
        if (retCode) {
            topic.publish("hpcc/brToaster", {
                Severity: "Error",
                Source: "WsAccess." + sourceMethod,
                Exceptions: [{ Message: retMsg }]
            });
        }
        else if (showOkMsg && retMsg) {
            topic.publish("hpcc/brToaster", {
                Severity: "Message",
                Source: "WsAccess." + sourceMethod,
                Exceptions: [{ Message: retMsg }]
            });
        }
    }
    exports.checkError = checkError;
    function _doCall(action, params) {
        return ESPRequest.send("ws_access", action, params).then(function (response) {
            checkError(response, action, params ? params.showOkMsg : false);
            return response;
        });
    }
    exports._doCall = _doCall;
    function Users(params) {
        return _doCall("UserQuery", params);
    }
    exports.Users = Users;
    function UserAction(params) {
        return _doCall("UserAction", params);
    }
    exports.UserAction = UserAction;
    function AddUser(params) {
        return _doCall("AddUser", params);
    }
    exports.AddUser = AddUser;
    function UserEdit(params) {
        return _doCall("UserEdit", params);
    }
    exports.UserEdit = UserEdit;
    function UserInfoEditInput(params) {
        return _doCall("UserInfoEditInput", params);
    }
    exports.UserInfoEditInput = UserInfoEditInput;
    function UserInfoEdit(params) {
        return _doCall("UserInfoEdit", params);
    }
    exports.UserInfoEdit = UserInfoEdit;
    function UserResetPass(params) {
        return _doCall("UserResetPass", params);
    }
    exports.UserResetPass = UserResetPass;
    function UserGroupEdit(params) {
        return _doCall("UserGroupEdit", params);
    }
    exports.UserGroupEdit = UserGroupEdit;
    function UserGroupEditInput(params) {
        return _doCall("UserGroupEditInput", params);
    }
    exports.UserGroupEditInput = UserGroupEditInput;
    function GroupAdd(params) {
        return _doCall("GroupAdd", params);
    }
    exports.GroupAdd = GroupAdd;
    function GroupAction(params) {
        return _doCall("GroupAction", params);
    }
    exports.GroupAction = GroupAction;
    function GroupEdit(params) {
        return _doCall("GroupEdit", params);
    }
    exports.GroupEdit = GroupEdit;
    function GroupMemberEdit(params) {
        return _doCall("GroupMemberEdit", params);
    }
    exports.GroupMemberEdit = GroupMemberEdit;
    function Groups(params) {
        return _doCall("GroupQuery", params);
    }
    exports.Groups = Groups;
    function Members(params) {
        return _doCall("GroupEdit", params);
    }
    exports.Members = Members;
    function GroupMemberEditInput(params) {
        return _doCall("GroupMemberEditInput", params);
    }
    exports.GroupMemberEditInput = GroupMemberEditInput;
    function GroupMemberQuery(params) {
        return _doCall("GroupMemberQuery", params);
    }
    exports.GroupMemberQuery = GroupMemberQuery;
    function Permissions(params) {
        return _doCall("Permissions", params);
    }
    exports.Permissions = Permissions;
    function AccountPermissions(params) {
        return _doCall("AccountPermissions", params);
    }
    exports.AccountPermissions = AccountPermissions;
    function ResourcePermissions(params) {
        return _doCall("ResourcePermissions", params);
    }
    exports.ResourcePermissions = ResourcePermissions;
    function Resources(params) {
        return _doCall("Resources", params);
    }
    exports.Resources = Resources;
    function ResourceAdd(params) {
        return _doCall("ResourceAdd", params);
    }
    exports.ResourceAdd = ResourceAdd;
    function ResourceDelete(params) {
        return _doCall("ResourceDelete", params);
    }
    exports.ResourceDelete = ResourceDelete;
    function PermissionAction(params) {
        return _doCall("PermissionAction", params);
    }
    exports.PermissionAction = PermissionAction;
    function FilePermission(params) {
        return _doCall("FilePermission", params);
    }
    exports.FilePermission = FilePermission;
    function ClearPermissionsCache() {
        return _doCall("ClearPermissionsCache", {
            request: {
                action: "Clear Permissions Cache"
            }
        });
    }
    exports.ClearPermissionsCache = ClearPermissionsCache;
    function EnableScopeScans() {
        return _doCall("EnableScopeScans", {
            request: {
                action: "Enable Scope Scans"
            }
        });
    }
    exports.EnableScopeScans = EnableScopeScans;
    function DisableScopeScans() {
        return _doCall("DisableScopeScans", {
            request: {
                action: "Disable Scope Scans"
            }
        });
    }
    exports.DisableScopeScans = DisableScopeScans;
    function DefaultPermissions() {
        return _doCall("ResourcePermissions", {
            request: {
                basedn: "ou=ecl,dc=hpccdev,dc=local",
                rtype: "file",
                name: "files",
                action: "Default Permissions"
            }
        });
    }
    exports.DefaultPermissions = DefaultPermissions;
    function PhysicalFiles() {
        return _doCall("ResourcePermissions", {
            request: {
                basedn: "ou=files,ou=ecl,dc=hpccdev,dc=local",
                rtype: "file",
                rtitle: "FileScope",
                name: "file",
                action: "Physical Files"
            }
        });
    }
    exports.PhysicalFiles = PhysicalFiles;
    function CheckFilePermissions() {
        return _doCall("FilePermission", {
            request: {
                action: "Check File Permission"
            }
        });
    }
    exports.CheckFilePermissions = CheckFilePermissions;
    function CreateUsersStore(groupname, observable) {
        var store = new UsersStore();
        store.groupname = groupname;
        if (observable) {
            return Observable(store);
        }
        return store;
    }
    exports.CreateUsersStore = CreateUsersStore;
    function CreateGroupsStore(username, observable) {
        var store = new GroupsStore();
        store.username = username;
        if (observable) {
            return Observable(store);
        }
        return store;
    }
    exports.CreateGroupsStore = CreateGroupsStore;
    function CreatePermissionsStore(groupname, username) {
        var store = new PermissionsStore();
        store.groupname = groupname;
        store.username = username;
        return Observable(store);
    }
    exports.CreatePermissionsStore = CreatePermissionsStore;
    function CreateAccountPermissionsStore(IsGroup, IncludeGroup, AccountName) {
        var store = new AccountResourcesStore();
        store.IsGroup = IsGroup;
        store.IncludeGroup = IncludeGroup;
        store.AccountName = AccountName;
        return Observable(store);
    }
    exports.CreateAccountPermissionsStore = CreateAccountPermissionsStore;
    function CreateInheritedPermissionsStore(IsGroup, IncludeGroup, AccountName, TabName) {
        var store = new InheritedPermissionStore();
        store.IsGroup = IsGroup;
        store.IncludeGroup = IncludeGroup;
        store.AccountName = AccountName;
        store.TabName = TabName;
        return Observable(store);
    }
    exports.CreateInheritedPermissionsStore = CreateInheritedPermissionsStore;
    function CreateIndividualPermissionsStore(basedn, rtype, rtitle, name) {
        var store = new IndividualPermissionsStore();
        store.basedn = basedn;
        store.rtype = rtype;
        store.rtitle = rtitle;
        store.name = name;
        return Observable(store);
    }
    exports.CreateIndividualPermissionsStore = CreateIndividualPermissionsStore;
    function CreateResourcesStore(groupname, username, basedn) {
        var store = new ResourcesStore();
        store.groupname = groupname;
        store.username = username;
        store.basedn = basedn;
        return Observable(store);
    }
    exports.CreateResourcesStore = CreateResourcesStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ws_access.js.map

/***/ })

}]);