(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/TargetSelectClass":"./eclwatch/TargetSelectClass.js",
	"src/WsESDLConfig":"./lib/src/WsESDLConfig.js",
	"src/WsPackageMaps":"./lib/src/WsPackageMaps.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./eclwatch/TargetSelectClass.js":
/*!***************************************!*\
  !*** ./eclwatch/TargetSelectClass.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/xhr */ "./node_modules/dojo/_base/xhr.js"),
    __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),
    __webpack_require__(/*! dojo/data/ItemFileReadStore */ "./node_modules/dojo/data/ItemFileReadStore.js"),
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/FileSpray */ "./lib/src/FileSpray.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! src/WsESDLConfig */ "./lib/src/WsESDLConfig.js"),
    __webpack_require__(/*! src/WsPackageMaps */ "./lib/src/WsPackageMaps.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, xhr, Deferred, ItemFileReadStore, all, Memory, on,
    registry,
    WsTopology, WsWorkunits, FileSpray, WsAccess, WsESDLConfig, WsPackageMaps, Utility) {

        return {
            i18n: nlsHPCC,

            loading: true,
            defaultValue: "",

            //  Implementation  ---
            reset: function () {
                this.initalized = false;
                this.loading = false;
                this.defaultValue = "";
                this.options = [];
            },

            init: function (params) {
                if (this.initalized)
                    return;
                this.initalized = true;
                this.loading = true;
                this.options = [];

                if (params.Target) {
                    this.defaultValue = params.Target;
                    this.set("value", params.Target);
                }

                if (params.includeBlank) {
                    this.includeBlank = params.includeBlank;
                    this.options.push({
                        label: "&nbsp;",
                        value: ""
                    });
                }
                if (params.Groups === true) {
                    this.loadClusterGroups();
                } else if (params.SprayTargets === true) {
                    this.loadSprayTargets();
                } else if (params.DropZones === true) {
                    this.loadDropZones();
                } else if (params.Users === true) {
                    this.loadUsers();
                } else if (params.loadUsersNotInGroup === true) {
                    this.loadUsersNotInGroup(params.groupname);
                } else if (params.loadUsersNotAMemberOfAGroup === true) {
                    this.loadUsersNotAMemberOfAGroup(params.username);
                } else if (params.UserGroups === true) {
                    this.loadUserGroups();
                } else if (params.DropZoneFolders === true) {
                    this.defaultValue = "";
                    this.set("value", "");
                    this.set("placeholder", "/");
                    this.loadDropZoneFolders();
                } else if (params.WUState === true) {
                    this.loadWUState();
                } else if (params.DFUState === true) {
                    this.loadDFUState();
                } else if (params.ECLSamples === true) {
                    this.loadECLSamples();
                } else if (params.LoadDESDLDefinitions === true) {
                    this.loadESDLDefinitions(params);
                } else if (params.LoadESDLESPProcesses === true) {
                    this.loadESDLESPProcesses();
                } else if (params.Logs === true) {
                    this.loadLogs(params);
                } else if (params.DFUSprayQueues === true) {
                    this.loadSprayQueues();
                } else if (params.GetPackageMapTargets === true) {
                    this.loadGetPackageMapTargets();
                } else if (params.GetPackageMapProcesses === true) {
                    this.loadGetPackageMapProcesses();
                } else if (params.GetPackageMapProcessFilter === true) {
                    this.loadGetPackageMapProcessFilter();
                } else if (params.DropZoneMachines === true) {
                    this.defaultValue = "";
                    this.set("value", "");
                    this.set("placeholder", "");
                    this.loadDropZoneMachines();
                } else {
                    this.loadTargets();
                }
                if (params.callback) {
                    this.callback = params.callback;
                }
            },

            _setValueAttr: function (target) {
                if (target === null)
                    target = "";
                this.inherited(arguments);
                if (this.callback) {
                    this.callback(this.value, this._getRowAttr());
                }
            },

            _getValueAttr: function () {
                if (this.loading)
                    return this.defaultValue;

                if (this.textbox)
                    return this.textbox.value;

                return this.value;
            },

            _getRowAttr: function () {
                var context = this;
                var retVal = null;
                arrayUtil.forEach(this.options, function (item, idx) {
                    if (context.value === item.value) {
                        retVal = item;
                        return false;
                    }
                });
                return retVal;
            },

            _postLoad: function () {
                if (this.defaultValue === "" && this.options.length) {
                    this.defaultValue = this.options[0].value;
                }
                this.set("value", this.defaultValue);
                this.loading = false;
            },

            loadGetPackageMapTargets: function () {
                var context = this;
                WsPackageMaps.GetPackageMapSelectTargets({
                    request: {
                        IncludeTargets: true
                    }
                }).then(function (response) {
                    if (lang.exists("GetPackageMapSelectOptionsResponse.Targets.TargetData", response)) {
                        var targetData = response.GetPackageMapSelectOptionsResponse.Targets.TargetData;
                        context.options.push({
                            label: "ANY",
                            value: "*"
                        });
                        for (var i = 0; i < targetData.length; ++i) {
                            context.options.push({
                                label: targetData[i].Name,
                                value: targetData[i].Name
                            });
                        }
                        context._postLoad();
                    }
                });
            },

            loadGetPackageMapProcesses: function () {
                var context = this;
                WsPackageMaps.GetPackageMapSelectProcesses({
                    request: {
                        IncludeProcesses: true
                    }
                }).then(function (response) {
                    if (lang.exists("GetPackageMapSelectOptionsResponse.Targets.TargetData", response)) {
                        var targetData = response.GetPackageMapSelectOptionsResponse.Targets.TargetData;
                        context.options.push({
                            label: "ANY",
                            value: "*"
                        });
                        for (var i = 0; i < targetData.length; ++i) {
                            if (lang.exists("Processes.Item.length", targetData[i])) {
                                for (var j = 0; j < targetData[i].Processes.Item.length; ++j) {
                                    context.options.push({
                                        label: targetData[i].Processes.Item[j],
                                        value: targetData[i].Processes.Item[j]
                                    });
                                }
                            }
                        }
                        context._postLoad();
                    }
                });
            },

            loadGetPackageMapProcessFilter: function () {
                var context = this;
                WsPackageMaps.GetPackageMapSelectProcessFilter({
                    request: {
                        IncludeProcessFilters: true
                    }
                }).then(function (response) {
                    if (lang.exists("GetPackageMapSelectOptionsResponse.ProcessFilters.Item", response)) {
                        var targetData = response.GetPackageMapSelectOptionsResponse.ProcessFilters.Item;
                        for (var i = 0; i < targetData.length; ++i) {
                            context.options.push({
                                label: targetData[i],
                                value: targetData[i]
                            });
                        }
                        context._postLoad();
                    }
                });
            },

            loadUserGroups: function () {
                var context = this;
                WsAccess.FilePermission({
                    load: function (response) {
                        if (lang.exists("FilePermissionResponse.Groups.Group", response)) {
                            var targetData = response.FilePermissionResponse.Groups.Group;
                            Utility.stringLowerSort(targetData, "name");
                            for (var i = 0; i < targetData.length; ++i) {
                                context.options.push({
                                    label: targetData[i].name,
                                    value: targetData[i].name
                                });
                            }
                            context._postLoad();
                        }
                    }
                });
            },

            loadUsers: function () {
                var context = this;
                WsAccess.FilePermission({
                    load: function (response) {
                        if (lang.exists("FilePermissionResponse.Users.User", response)) {
                            var targetData = response.FilePermissionResponse.Users.User;
                            Utility.stringLowerSort(targetData, "username");
                            for (var i = 0; i < targetData.length; ++i) {
                                context.options.push({
                                    label: targetData[i].username,
                                    value: targetData[i].username
                                });
                            }
                            context._postLoad();
                        }
                    }
                });
            },

            loadUsersNotAMemberOfAGroup: function (username) {
                var context = this;
                WsAccess.UserGroupEditInput({
                    request: {
                        username: username
                    }
                }).then(function (response) {
                    if (lang.exists("UserGroupEditInputResponse.Groups.Group", response)) {
                        var targetData = response.UserGroupEditInputResponse.Groups.Group;
                        Utility.stringLowerSort(targetData,"name");
                        for (var i = 0; i < targetData.length; ++i) {
                            context.options.push({
                                label: targetData[i].name,
                                value: targetData[i].name
                            });
                        }
                        context._postLoad();
                    }
                });
            },

            loadUsersNotInGroup: function (groupname) {
                var context = this;
                WsAccess.GroupMemberEditInput({
                    request: {
                        groupname: groupname
                    }
                }).then(function (response) {
                    if (lang.exists("GroupMemberEditInputResponse.Users.User", response)) {
                        var targetData = response.GroupMemberEditInputResponse.Users.User;
                        Utility.stringLowerSort(targetData, "username");
                        for (var i = 0; i < targetData.length; ++i) {
                            context.options.push({
                                label: targetData[i].username,
                                value: targetData[i].username
                            });
                        }
                        context._postLoad();
                    }
                });
            },

            loadDropZones: function () {
                var context = this;
                this.set("disabled", true);
                WsTopology.TpDropZoneQuery({
                }).then(function (response) {
                    context.set("disabled", false);
                    if (lang.exists("TpDropZoneQueryResponse.TpDropZones.TpDropZone", response)) {
                        var targetData = response.TpDropZoneQueryResponse.TpDropZones.TpDropZone;
                        for (var i = 0; i < targetData.length; ++i) {
                            if (lang.exists("TpMachines.TpMachine", targetData[i])) {
                                context.options.push({
                                    label: targetData[i].Name,
                                    value: targetData[i].Name,
                                    machine: targetData[i].TpMachines.TpMachine[0]
                                });
                            }
                        }
                        context._postLoad();
                    }
                });
            },

            loadDropZoneMachines: function (Name) {
                var context = this;
                this.set("disabled", true);
                if (Name) {
                    WsTopology.TpDropZoneQuery({
                        request: {
                            Name: Name
                        }
                    }).then(function (response) {
                        if (lang.exists("TpDropZoneQueryResponse.TpDropZones.TpDropZone", response)) {
                            context.set("disabled", false);
                            context.set("options", []);
                            context.options.push({
                                label: "&nbsp;",
                                value: ""
                            });
                            arrayUtil.forEach(response.TpDropZoneQueryResponse.TpDropZones.TpDropZone, function (item, idx) {
                                var targetData = item.TpMachines.TpMachine;
                                for (var i = 0; i < targetData.length; ++i) {
                                    context.options.push({
                                        label: targetData[i].Netaddress,
                                        value: targetData[i].Netaddress
                                    });
                                }
                                context._postLoad();
                            });
                        }
                    });
                }
            },

            _loadDropZoneFolders: function (pathSepChar, Netaddr, Path, OS, depth) {
                depth = depth || 0;
                var retVal = [];
                retVal.push(Path);
                var deferred = new Deferred();
                if (depth > 2) {
                    setTimeout(function () {
                        deferred.resolve(retVal);
                    }, 20);
                } else {
                    var context = this;
                    FileSpray.FileList({
                        request: {
                            Netaddr: Netaddr,
                            Path: Path,
                            OS: OS
                        },
                        suppressExceptionToaster: true
                    }).then(function (response) {
                        var requests = [];
                        if (lang.exists("FileListResponse.files.PhysicalFileStruct", response)) {
                            var files = response.FileListResponse.files.PhysicalFileStruct;
                            for (var i = 0; i < files.length; ++i) {
                                if (files[i].isDir) {
                                    if (Path + pathSepChar === "//"){
                                        requests.push(context._loadDropZoneFolders(pathSepChar, Netaddr, Path + files[i].name, OS, ++depth));
                                    } else {
                                        requests.push(context._loadDropZoneFolders(pathSepChar, Netaddr, Path + pathSepChar + files[i].name, OS, ++depth));
                                    }
                                }
                            }
                        }
                        all(requests).then(function (responses) {
                            arrayUtil.forEach(responses, function (response) {
                                retVal = retVal.concat(response);
                            });
                            deferred.resolve(retVal);
                        });
                    });
                }
                return deferred.promise;
            },

            endsWith: function (str, suffix) {
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },

            loadDropZoneFolders: function (pathSepChar, defaultPath) {
                var context = this;
                this.getDropZoneFolder = function () {
                    var baseFolder = this._dropZoneTarget.machine.Directory;
                    var selectedFolder = this.get("value");
                    return baseFolder + selectedFolder;
                }
                if (this._dropZoneTarget) {
                    this._loadDropZoneFolders(pathSepChar, this._dropZoneTarget.machine.Netaddress, this._dropZoneTarget.machine.Directory, this._dropZoneTarget.machine.OS).then(function (results) {
                        results.sort();
                        var store = new Memory({
                            data: arrayUtil.map(results, function (_path) {
                                var path = _path.substring(context._dropZoneTarget.machine.Directory.length);
                                return {
                                    name: path,
                                    id: _path
                                };
                            })
                        });
                        context.set("store", store);
                        context.set("placeholder", defaultPath)
                        context._postLoad();
                    });
                }
            },

            loadClusterGroups: function () {
                var context = this;
                WsTopology.TpGroupQuery({
                    load: function (response) {
                        if (lang.exists("TpGroupQueryResponse.TpGroups.TpGroup", response)) {
                            var targetData = response.TpGroupQueryResponse.TpGroups.TpGroup;
                            for (var i = 0; i < targetData.length; ++i) {
                                switch (targetData[i].Kind) {
                                    case "Thor":
                                    case "hthor":
                                    case "Roxie":
                                        context.options.push({
                                            label: targetData[i].Name,
                                            value: targetData[i].Name
                                        });
                                        break;
                                }
                            }
                            context._postLoad();
                        }
                    }
                });
            },

            loadSprayQueues: function () {
                var context = this;
                WsTopology.TpServiceQuery({
                    load: function (response) {
                        if (lang.exists("TpServiceQueryResponse.ServiceList.TpDfuServers", response)) {
                            var targetData = response.TpServiceQueryResponse.ServiceList.TpDfuServers.TpDfuServer;
                            for (var i = 0; i < targetData.length; ++i) {
                                context.options.push({
                                    label: targetData[i].Queue,
                                    value: targetData[i].Queue
                                })
                            }
                            context._postLoad();
                        }
                    }
                })
            },

            loadSprayTargets: function () {
                var context = this;
                FileSpray.GetSprayTargets({
                    load: function (response) {
                        if (lang.exists("GetSprayTargetsResponse.GroupNodes.GroupNode", response)) {
                            var targetData = response.GetSprayTargetsResponse.GroupNodes.GroupNode;
                            for (var i = 0; i < targetData.length; ++i) {
                                context.options.push({
                                    label: targetData[i].Name,
                                    value: targetData[i].Name
                                });
                            }
                            context._postLoad();
                        }
                    }
                });
            },

            loadWUState: function () {
                for (var key in WsWorkunits.States) {
                    this.options.push({
                        label: WsWorkunits.States[key],
                        value: WsWorkunits.States[key]
                    });
                }
                this._postLoad();
            },

            loadDFUState: function () {
                for (var key in FileSpray.States) {
                    this.options.push({
                        label: FileSpray.States[key],
                        value: FileSpray.States[key]
                    });
                }
                this._postLoad();
            },

            LogicalFileSearchType: function () {
                this.options.push({
                    label: "Created",
                    value: "Created"
                });
                this.options.push({
                    label: "Used",
                    value: "Referenced"
                });
                this._postLoad();
            },

            loadTargets: function () {
                var context = this;
                WsTopology.TpLogicalClusterQuery({
                }).then(function (response) {
                    if (lang.exists("TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster", response)) {
                        var targetData = response.TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster;
                        for (var i = 0; i < targetData.length; ++i) {
                            context.options.push({
                                label: targetData[i].Name,
                                value: targetData[i].Name
                            });
                        }

                        if (!context.includeBlank && context._value === "") {
                            if (response.TpLogicalClusterQueryResponse["default"]) {
                                context._value = response.TpLogicalClusterQueryResponse["default"].Name;
                            } else {
                                context._value = context.options[0].value;
                            }
                        }
                    }
                    context._postLoad();
                });
            },

            loadECLSamples: function () {
                var sampleStore = new ItemFileReadStore({
                    url: Utility.getURL("ecl/ECLPlaygroundSamples.json")
                });
                this.setStore(sampleStore);
                var context = this;
                this.on("change", function (evt) {
                    var filename = this.get("value");
                    xhr.get({
                        url: Utility.getURL("ecl/" + filename),
                        handleAs: "text",
                        load: function (eclText) {
                            context.onNewSelection(eclText);
                        },
                        error: function () {
                        }
                    });
                });
                context._postLoad();
            },

            loadLogs: function (params) {
                var context = this;
                this.set("options", []);
                FileSpray.FileList({
                    request: {
                        Mask: "*.log",
                        Netaddr: params.treeNode.getNetaddress(),
                        OS: params.treeNode.getOS(),
                        Path: params.treeNode.getLogDirectory()
                    }
                }).then(function (response) {
                    if (lang.exists("FileListResponse.files.PhysicalFileStruct", response)) {
                        var options = [];
                        var targetData = response.FileListResponse.files.PhysicalFileStruct;
                        var shortestLabelLen = 9999;
                        var shortestLabel = "";
                        for (var i = 0; i < targetData.length; ++i) {
                            options.push({
                                label: targetData[i].name,// + " " + targetData[i].filesize + " " + targetData[i].modifiedtime,
                                value: targetData[i].name
                            });
                            if (shortestLabelLen > targetData[i].name.length) {
                                shortestLabelLen = targetData[i].name.length;
                                shortestLabel = targetData[i].name;
                            }
                        }
                        options.sort(function (l, r) {
                            return -l.label.localeCompare(r.label);
                        });
                        context.set("options", options);
                        context.defaultValue = shortestLabel;
                        context._value = shortestLabel;
                    }
                    context._postLoad();
                });
            },

            loadESDLDefinitions: function () {
                var context = this;
                WsESDLConfig.ListESDLDefinitions({
                    load: function (response) {
                        if (lang.exists("ListESDLDefinitionsResponse.Definitions.Definition", response)) {
                            var targetData = response.ListESDLDefinitionsResponse.Definitions.Definition;
                            Utility.alphanumSort(targetData, "Id");
                            for (var i = 0; i < targetData.length; ++i) {
                                context.options.push({
                                    label: targetData[i].Id,
                                    value: targetData[i].Id
                                });
                            }
                            context._postLoad();
                        }
                    }
                });
            },

            loadESDLESPProcesses: function () {
                var context = this;
                WsESDLConfig.ListESDLBindings({
                    request: {}
                }).then(function (response) {
                    if (lang.exists("ListESDLBindingsResponse.EspProcesses.EspProcess", response)) {
                        arrayUtil.forEach(response.ListESDLBindingsResponse.EspProcesses.EspProcess, function (item, idx) {
                            context.options.push({
                                label: item.Name,
                                value: item.Name
                            });
                        });
                        context._postLoad();
                    }
                });
            }
        };
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/WsESDLConfig.js":
/*!*********************************!*\
  !*** ./lib/src/WsESDLConfig.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function ListDESDLEspBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListDESDLEspBindings", params);
    }
    exports.ListDESDLEspBindings = ListDESDLEspBindings;
    function DeleteESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLBinding", params);
    }
    exports.DeleteESDLBinding = DeleteESDLBinding;
    function GetESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLBinding", params);
    }
    exports.GetESDLBinding = GetESDLBinding;
    function ConfigureESDLBindingMethod(params) {
        return ESPRequest.send("WsESDLConfig", "ConfigureESDLBindingMethod", params);
    }
    exports.ConfigureESDLBindingMethod = ConfigureESDLBindingMethod;
    function ListESDLDefinitions(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLDefinitions", params);
    }
    exports.ListESDLDefinitions = ListESDLDefinitions;
    function GetESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "GetESDLDefinition", params);
    }
    exports.GetESDLDefinition = GetESDLDefinition;
    function DeleteESDLDefinition(params) {
        return ESPRequest.send("WsESDLConfig", "DeleteESDLDefinition", params);
    }
    exports.DeleteESDLDefinition = DeleteESDLDefinition;
    function PublishESDLBinding(params) {
        return ESPRequest.send("WsESDLConfig", "PublishESDLBinding", params);
    }
    exports.PublishESDLBinding = PublishESDLBinding;
    //post 1.3 services
    function ListESDLBindings(params) {
        return ESPRequest.send("WsESDLConfig", "ListESDLBindings", params);
    }
    exports.ListESDLBindings = ListESDLBindings;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsESDLConfig.js.map

/***/ }),

/***/ "./lib/src/WsPackageMaps.js":
/*!**********************************!*\
  !*** ./lib/src/WsPackageMaps.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, lang, nlsHPCC, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var i18n = nlsHPCC;
    function PackageMapQuery(params) {
        return ESPRequest.send("WsPackageProcess", "ListPackages", params);
    }
    exports.PackageMapQuery = PackageMapQuery;
    function errorMessageCallback(callback, error) {
        if (callback && callback.error) {
            callback.error(error);
        }
    }
    exports.errorMessageCallback = errorMessageCallback;
    function getPackage(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackage", {
            request: {
                Target: params.target,
                Process: params.process
            }
        });
    }
    exports.getPackage = getPackage;
    function getPackageMapById(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapById", {
            request: {
                PackageMapId: params.packageMap
            }
        });
    }
    exports.getPackageMapById = getPackageMapById;
    function GetPackageMapByIdUpdated(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapById", params);
    }
    exports.GetPackageMapByIdUpdated = GetPackageMapByIdUpdated;
    function RemovePartFromPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "RemovePartFromPackageMap", params);
    }
    exports.RemovePartFromPackageMap = RemovePartFromPackageMap;
    function AddPartToPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "AddPartToPackageMap", params);
    }
    exports.AddPartToPackageMap = AddPartToPackageMap;
    function GetPartFromPackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "GetPartFromPackageMap", params);
    }
    exports.GetPartFromPackageMap = GetPartFromPackageMap;
    function GetPackageMapSelectTargets(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeTargets: params.request.IncludeTargets
            }
        });
    }
    exports.GetPackageMapSelectTargets = GetPackageMapSelectTargets;
    function GetPackageMapSelectProcesses(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeProcesses: params.request.IncludeProcesses
            }
        });
    }
    exports.GetPackageMapSelectProcesses = GetPackageMapSelectProcesses;
    function GetPackageMapSelectProcessFilter(params) {
        return ESPRequest.send("WsPackageProcess", "GetPackageMapSelectOptions", {
            request: {
                IncludeProcessFilters: params.request.IncludeProcessFilters
            }
        });
    }
    exports.GetPackageMapSelectProcessFilter = GetPackageMapSelectProcessFilter;
    //Not used for now. May be used later.
    function listProcessFilters(callback) {
        var context = this;
        return ESPRequest.send("WsPackageProcess", "ListProcessFilters", {
            request: {},
            load: function (response) {
                if (!lang.exists("ListProcessFiltersResponse.ProcessFilters", response))
                    callback.load(i18n.NoContent);
                else
                    callback.load(response.ListProcessFiltersResponse.ProcessFilters);
            },
            error: function (err) {
                context.errorMessageCallback(callback, err);
            }
        });
    }
    exports.listProcessFilters = listProcessFilters;
    function validatePackage(params) {
        var request = { Target: params.target };
        if (params.packageMap)
            request['PMID'] = params.packageMap;
        if (params.process)
            request['Process'] = params.process;
        if (params.content)
            request['Info'] = params.content;
        if (params.active)
            request['Active'] = params.active;
        return ESPRequest.send("WsPackageProcess", "ValidatePackage", {
            request: request
        });
    }
    exports.validatePackage = validatePackage;
    function activatePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "ActivatePackage", params);
    }
    exports.activatePackageMap = activatePackageMap;
    function deactivatePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "DeActivatePackage", params);
    }
    exports.deactivatePackageMap = deactivatePackageMap;
    function deletePackageMap(params) {
        return ESPRequest.send("WsPackageProcess", "DeletePackage", params);
    }
    exports.deletePackageMap = deletePackageMap;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsPackageMaps.js.map

/***/ })

}]);