(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"src/ESPLogicalFile":"./lib/src/ESPLogicalFile.js",
	"src/WsDfu":"./lib/src/WsDfu.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./dgrid/selector.js":
/*!***************************!*\
  !*** ./dgrid/selector.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! dojo/_base/sniff */ "./node_modules/dojo/_base/sniff.js"), __webpack_require__(/*! put-selector/put */ "./put-selector/put.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel, arrayUtil, on, aspect, has, put){
	return function(column, type){
		
		var listeners = [],
			grid, headerCheckbox;
		
		if(!column){ column = {}; }
		
		if(column.type){
			column.selectorType = column.type;
			kernel.deprecated("columndef.type", "use columndef.selectorType instead", "dgrid 0.4");
		}
		// accept type as argument to Selector function, or from column def
		column.selectorType = type = type || column.selectorType || "checkbox";
		column.sortable = false;

		function disabled(item) {
			return !grid.allowSelect(grid.row(item));
		}
		
		function changeInput(value){
			// creates a function that modifies the input on an event
			return function(event){
				var rows = event.rows,
					len = rows.length,
					state = "false",
					selection, mixed, i;
				
				for(i = 0; i < len; i++){
					var element = grid.cell(rows[i], column.id).element;
					if(!element){ continue; } // skip if row has been entirely removed
					element = (element.contents || element).input;
					if(element && !element.disabled){
						// only change the value if it is not disabled
						element.checked = value;
						element.setAttribute("aria-checked", value);
					}
				}
				if(headerCheckbox.type == "checkbox"){
					selection = grid.selection;
					mixed = false;
					// see if the header checkbox needs to be indeterminate
					for(i in selection){
						// if there is anything in the selection, than it is indeterminate
						if(selection[i] != grid.allSelected){
							mixed = true;
							break;
						}
					}
					headerCheckbox.indeterminate = mixed;
					headerCheckbox.checked = grid.allSelected;
					if (mixed) {
						state = "mixed";
					} else if (grid.allSelected) {
						state = "true";
					}
					headerCheckbox.setAttribute("aria-checked", state);
				}
			};
		}
		
		function onSelect(event){
			// we would really only care about click, since other input sources, like spacebar
			// trigger a click, but the click event doesn't provide access to the shift key in firefox, so
			// listen for keydown's as well to get an event in firefox that we can properly retrieve
			// the shiftKey property from
			if(event.type == "click" || event.keyCode == 32 || (!has("opera") && event.keyCode == 13) || event.keyCode === 0){
				var row = grid.row(event);
				grid._selectionTriggerEvent = event;
				
				if(row){
					if(grid.allowSelect(row)){
						var lastRow = grid._lastSelected && grid.row(grid._lastSelected);
						
						if(type == "radio"){
							if(!lastRow || lastRow.id != row.id){
								grid.clearSelection();
								grid.select(row, null, true);
								grid._lastSelected = row.element;
							}
						}else{
							if(row){
								if(event.shiftKey){
									// make sure the last input always ends up checked for shift key
									changeInput(true)({rows: [row]});
								}else{
									// no shift key, so no range selection
									lastRow = null;
								}
								lastRow = event.shiftKey ? lastRow : null;
								grid.select(lastRow || row, row, lastRow ? undefined : null);
								grid._lastSelected = row.element;
							}
						}
					}
				}else{
					// No row resolved; must be the select-all checkbox.
					put(this, (grid.allSelected ? "!" : ".") + "dgrid-select-all");
					grid[grid.allSelected ? "clearSelection" : "selectAll"]();
				}
				grid._selectionTriggerEvent = null;
			}
		}
		
		function setupSelectionEvents(){
			// register one listener at the top level that receives events delegated
			grid._hasSelectorInputListener = true;
			listeners.push(grid.on(".dgrid-selector:click,.dgrid-selector:keydown", onSelect));
			var handleSelect = grid._handleSelect;
			grid._handleSelect = function(event){
				// ignore the default select handler for events that originate from the selector column
				if(this.cell(event).column != column){
					handleSelect.apply(this, arguments);
				}
			};
			
			// Set up disabled and grid.allowSelect to match each other's behaviors
			if(typeof column.disabled == "function"){
				var originalAllowSelect = grid.allowSelect,
					originalDisabled = column.disabled;

				// Wrap allowSelect to consult both the original allowSelect and disabled
				grid.allowSelect = function(row){
					var allow = originalAllowSelect.call(this, row);

					if (originalDisabled === disabled) {
						return allow;
					} else {
						return allow && !originalDisabled.call(column, row.data);
					}
				};

				// Then wrap disabled to simply call the new allowSelect
				column.disabled = disabled;
			}else{
				// If no disabled function was specified, institute a default one
				// which honors allowSelect
				column.disabled = disabled;
			}
			// register listeners to the select and deselect events to change the input checked value
			listeners.push(grid.on("dgrid-select", changeInput(true)));
			listeners.push(grid.on("dgrid-deselect", changeInput(false)));
		}
		
		var renderInput = typeof type == "function" ? type : function(value, cell, object){
			var parent = cell.parentNode,
				disabled;
			
			if(!grid._hasSelectorInputListener){
				setupSelectionEvents();
			}
			
			// column.disabled gets initialized or wrapped in setupSelectionEvents
			disabled = column.disabled;

			// must set the class name on the outer cell in IE for keystrokes to be intercepted
			put(parent && parent.contents ? parent : cell, ".dgrid-selector");
			var input = cell.input || (cell.input = put(cell, "input[type="+type + "]", {
				tabIndex: isNaN(column.tabIndex) ? -1 : column.tabIndex,
				disabled: disabled && (typeof disabled == "function" ?
					disabled.call(column, object) : disabled),
				checked: value
			}));
			input.setAttribute("aria-checked", !!value);
			
			return input;
		};
		
		aspect.after(column, "init", function(){
			grid = column.grid;
		});
		
		aspect.after(column, "destroy", function(){
			arrayUtil.forEach(listeners, function(l){ l.remove(); });
			grid._hasSelectorInputListener = false;
		});
		
		column.renderCell = function(object, value, cell, options, header){
			var row = object && grid.row(object);
			value = row && grid.selection[row.id];
			renderInput(value, cell, object);
		};
		column.renderHeaderCell = function(th){
			var label = "label" in column ? column.label :
				column.field || "";
			
			if(type == "radio" || !grid.allowSelectAll){
				th.appendChild(document.createTextNode(label));
				if(!grid._hasSelectorInputListener){
					setupSelectionEvents();
				}
			}else{
				renderInput(false, th, {});
			}
			headerCheckbox = th.lastChild;
		};
		
		return column;
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ESPLogicalFile.js":
/*!***********************************!*\
  !*** ./lib/src/ESPLogicalFile.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! ./WsDfu */ "./lib/src/WsDfu.js"), __webpack_require__(/*! ./FileSpray */ "./lib/src/FileSpray.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js"), __webpack_require__(/*! ./ESPUtil */ "./lib/src/ESPUtil.js"), __webpack_require__(/*! ./ESPResult */ "./lib/src/ESPResult.js"), __webpack_require__(/*! ./Utility */ "./lib/src/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, arrayUtil, lang, Deferred, QueryResults, Observable, WsDfu, FileSpray, ESPRequest, ESPUtil, ESPResult, Utility) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _logicalFiles = {};
    var createID = function (Cluster, Name) {
        return (Cluster ? Cluster : "") + "--" + Name;
    };
    var create = function (id) {
        if (!lang.exists(id, _logicalFiles)) {
            var idParts = id.split("--");
            _logicalFiles[id] = new LogicalFile({
                Cluster: idParts[0] ? idParts[0] : "",
                NodeGroup: idParts[0] ? idParts[0] : "",
                Name: idParts[1]
            });
        }
        return _logicalFiles[id];
    };
    var Store = declare([ESPRequest.Store], {
        service: "WsDfu",
        action: "DFUQuery",
        responseQualifier: "DFUQueryResponse.DFULogicalFiles.DFULogicalFile",
        responseTotalQualifier: "DFUQueryResponse.NumFiles",
        idProperty: "__hpcc_id",
        startProperty: "PageStartFrom",
        countProperty: "PageSize",
        _watched: [],
        create: function (id) {
            return create(id);
        },
        preRequest: function (request) {
            switch (request.Sortby) {
                case "RecordCount":
                    request.Sortby = "Records";
                    break;
                case "IntSize":
                    request.Sortby = "FileSize";
                    break;
            }
            lang.mixin(request, {
                IncludeSuperOwner: 1
            });
        },
        update: function (id, item) {
            var storeItem = this.get(id);
            storeItem.updateData(item);
            if (!this._watched[id]) {
                var context = this;
                this._watched[id] = storeItem.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        context.notify(storeItem, id);
                    }
                });
            }
        },
        preProcessRow: function (item, request, query, options) {
            lang.mixin(item, {
                __hpcc_id: createID(item.NodeGroup, item.Name),
                __hpcc_isDir: false,
                __hpcc_displayName: item.Name,
                StateID: 0,
                State: ""
            });
        },
        mayHaveChildren: function (object) {
            return object.__hpcc_isDir;
        }
    });
    var TreeStore = declare(null, {
        idProperty: "__hpcc_id",
        cache: null,
        _watched: [],
        constructor: function (options) {
            this.cache = {};
        },
        _fetchFiles: function (scope) {
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            var context = this;
            WsDfu.DFUFileView({
                request: {
                    Scope: scope
                }
            }).then(function (response) {
                var retVal = [];
                if (lang.exists("DFUFileViewResponse.DFULogicalFiles.DFULogicalFile", response)) {
                    arrayUtil.forEach(response.DFUFileViewResponse.DFULogicalFiles.DFULogicalFile, function (item, idx) {
                        var isDir = !(item.Name);
                        var childScope = "";
                        var leafName = "";
                        if (isDir) {
                            childScope = scope;
                            if (childScope)
                                childScope += "::";
                            childScope += item.Directory;
                        }
                        else {
                            var parts = item.Name.split("::");
                            if (parts.length) {
                                leafName = parts[parts.length - 1];
                            }
                        }
                        lang.mixin(item, {
                            __hpcc_id: isDir ? childScope : createID(item.NodeGroup, item.Name),
                            __hpcc_isDir: isDir,
                            __hpcc_childScope: childScope,
                            __hpcc_displayName: isDir ? item.Directory : leafName
                        });
                        var storeItem = null;
                        if (isDir) {
                            storeItem = item;
                        }
                        else {
                            storeItem = create(item.__hpcc_id);
                            if (!context._watched[item.__hpcc_id]) {
                                context._watched[item.__hpcc_id] = storeItem.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                                    if (oldValue !== newValue) {
                                        context.notify(storeItem, storeItem.__hpcc_id);
                                    }
                                });
                            }
                            storeItem.updateData(item);
                        }
                        retVal.push(storeItem);
                        context.cache[context.getIdentity(storeItem)] = storeItem;
                    });
                }
                function boolToNumber(b) {
                    return b ? 1 : 0;
                }
                retVal.sort(function (l, r) {
                    if (l.__hpcc_isDir === r.__hpcc_isDir) {
                        return (boolToNumber(l.__hpcc_displayName > r.__hpcc_displayName) - boolToNumber(l.__hpcc_displayName < r.__hpcc_displayName));
                    }
                    return (boolToNumber(l.__hpcc_isDir < r.__hpcc_isDir) - boolToNumber(l.__hpcc_isDir > r.__hpcc_isDir));
                });
                return retVal;
            }).then(function (response) {
                deferredResults.resolve(response);
                deferredResults.total.resolve(response.length);
            });
            return deferredResults;
        },
        //  Store API ---
        get: function (id) {
            return this.cache[id];
        },
        getIdentity: function (object) {
            return object[this.idProperty];
        },
        put: function (object, directives) {
        },
        add: function (object, directives) {
        },
        remove: function (id) {
        },
        query: function (query, options) {
            return QueryResults(this._fetchFiles(""));
        },
        transaction: function () {
        },
        mayHaveChildren: function (object) {
            return object.__hpcc_isDir;
        },
        getChildren: function (parent, options) {
            return QueryResults(this._fetchFiles(parent.__hpcc_childScope));
        },
        getMetadata: function (object) {
        }
    });
    var LogicalFile = declare([ESPUtil.Singleton], {
        _FileDetailSetter: function (FileDetail) {
            this.FileDetail = FileDetail;
            this.result = ESPResult.Get(FileDetail);
        },
        _DirSetter: function (Dir) {
            this.set("Directory", Dir);
        },
        _DFUFilePartsOnClustersSetter: function (DFUFilePartsOnClusters) {
            var DFUFileParts = {
                DFUPart: []
            };
            if (lang.exists("DFUFilePartsOnCluster", DFUFilePartsOnClusters)) {
                arrayUtil.forEach(DFUFilePartsOnClusters.DFUFilePartsOnCluster, function (DFUFilePartsOnCluster, idx) {
                    if (lang.exists("DFUFileParts.DFUPart", DFUFilePartsOnCluster)) {
                        arrayUtil.forEach(DFUFilePartsOnCluster.DFUFileParts.DFUPart, function (DFUPart, idx) {
                            DFUFileParts.DFUPart.push(lang.mixin({
                                __hpcc_id: DFUPart.Id + "--" + DFUPart.Copy,
                                Cluster: DFUFilePartsOnCluster.Cluster
                            }, DFUPart));
                        }, this);
                    }
                    if (idx === 0) {
                        this.set("CanReplicateFlag", DFUFilePartsOnCluster.CanReplicate);
                        this.set("ReplicateFlag", DFUFilePartsOnCluster.Replicate);
                    }
                }, this);
            }
            this.set("DFUFileParts", DFUFileParts);
        },
        _CompressedFileSizeSetter: function (CompressedFileSize) {
            this.CompressedFileSize = "";
            if (CompressedFileSize) {
                this.CompressedFileSize = CompressedFileSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        _StatSetter: function (Stat) {
            this.set("MinSkew", Stat.MinSkew);
            this.set("MaxSkew", Stat.MaxSkew);
        },
        constructor: function (args) {
            if (args) {
                declare.safeMixin(this, args);
            }
            this.logicalFile = this;
        },
        save: function (request, args) {
            //WsDfu/DFUInfo?FileName=progguide%3A%3Aexampledata%3A%3Akeys%3A%3Apeople.lastname.firstname&UpdateDescription=true&FileDesc=%C2%A0123&Save+Description=Save+Description
            var context = this;
            WsDfu.DFUInfo({
                request: {
                    Name: this.Name,
                    Cluster: this.Cluster,
                    UpdateDescription: true,
                    FileDesc: request.Description,
                    Protect: request.isProtected === true ? 1 : 2
                }
            }).then(function (response) {
                if (lang.exists("DFUInfoResponse.FileDetail", response)) {
                    context.updateData(response.DFUInfoResponse.FileDetail);
                    if (args && args.onAfterSend) {
                        args.onAfterSend(response.DFUInfoResponse.FileDetail);
                    }
                }
            });
        },
        doDelete: function (params) {
            var context = this;
            WsDfu.DFUArrayAction([this], "Delete").then(function (response) {
                if (lang.exists("DFUArrayActionResponse.ActionResults.DFUActionInfo", response) &&
                    response.DFUArrayActionResponse.ActionResults.DFUActionInfo.length &&
                    !response.DFUArrayActionResponse.ActionResults.DFUActionInfo[0].Failed) {
                    context.updateData({ StateID: 999, State: "deleted" });
                }
                else {
                    context.refresh();
                }
            });
        },
        despray: function (params) {
            lang.mixin(params.request, {
                sourceLogicalName: this.Name
            });
            return FileSpray.Despray(params);
        },
        copy: function (params) {
            lang.mixin(params.request, {
                sourceLogicalName: this.Name
            });
            return FileSpray.Copy(params);
        },
        rename: function (params) {
            var context = this;
            lang.mixin(params.request, {
                srcname: this.Name
            });
            return FileSpray.Rename(params).then(function (response) {
                context.set("Name", params.request.dstname); //TODO - need to monitor DFUWorkunit for success (After ESPDFUWorkunit has been updated to proper singleton).
                context.refresh();
                return response;
            });
        },
        removeSubfiles: function (subfiles, removeSuperfile) {
            var context = this;
            return WsDfu.SuperfileAction("remove", this.Name, subfiles, removeSuperfile).then(function (response) {
                context.refresh();
                return response;
            });
        },
        refresh: function (full) {
            return this.getInfo();
        },
        getInfo: function (args) {
            //WsDfu/DFUInfo?Name=progguide::exampledata::keys::people.state.city.zip.lastname.firstname.payload&Cluster=hthor__myeclagent HTTP/1.1
            var context = this;
            return WsDfu.DFUInfo({
                request: {
                    Name: this.Name,
                    Cluster: this.Cluster
                }
            }).then(function (response) {
                if (lang.exists("DFUInfoResponse.FileDetail", response)) {
                    context.updateData(response.DFUInfoResponse.FileDetail);
                    if (args && args.onAfterSend) {
                        args.onAfterSend(response.DFUInfoResponse.FileDetail);
                    }
                }
            });
        },
        getInfo2: function (args) {
            var context = this;
            return WsDfu.DFUQuery({
                request: {
                    LogicalName: this.Name
                }
            }).then(function (response) {
                if (lang.exists("DFUQueryResponse.DFULogicalFiles.DFULogicalFile", response) && response.DFUQueryResponse.DFULogicalFiles.DFULogicalFile.length) {
                    context.updateData(response.DFUQueryResponse.DFULogicalFiles.DFULogicalFile[0]);
                    if (args && args.onAfterSend) {
                        args.onAfterSend(response.DFUQueryResponse.DFULogicalFiles.DFULogicalFile[0]);
                    }
                }
            });
        },
        getLeaf: function () {
            var nameParts = this.Name.split("::");
            return nameParts.length ? nameParts[nameParts.length - 1] : "";
        },
        updateData: ESPUtil.override(function (inherited, data) {
            inherited(data);
            if (!this.result) {
                this.result = ESPResult.Get(data);
            }
        }),
        fetchStructure: function (format, onFetchStructure) {
            WsDfu.DFUDefFile({
                request: {
                    Name: this.Name,
                    Format: format
                }
            }).then(function (response) {
                onFetchStructure(response);
            });
        },
        fetchDEF: function (onFetchXML) {
            this.fetchStructure("def", onFetchXML);
        },
        fetchXML: function (onFetchXML) {
            this.fetchStructure("xml", onFetchXML);
        },
        getStateIconClass: function () {
            if (this.isSuperfile) {
                switch (this.StateID) {
                    case 999:
                        return "iconSuperFileDeleted";
                }
                return "iconSuperFile";
            }
            else {
                switch (this.StateID) {
                    case 999:
                        return "iconLogicalFileDeleted";
                }
                return "iconLogicalFile";
            }
        },
        getStateImageName: function () {
            if (this.isSuperfile) {
                switch (this.StateID) {
                    case 999:
                        return "superfile_deleted.png";
                }
                return "superfile.png";
            }
            else {
                switch (this.StateID) {
                    case 999:
                        return "logicalfile_deleted.png";
                }
                return "logicalfile.png";
            }
        },
        getStateImageHTML: function () {
            return Utility.getImageHTML(this.getStateImageName());
        },
        getProtectedImage: function () {
            if (this.ProtectList.DFUFileProtect.length > 0) {
                return Utility.getImageURL("locked.png");
            }
            return Utility.getImageURL("unlocked.png");
        },
        getCompressedImage: function () {
            if (this.IsCompressed) {
                return Utility.getImageURL("compressed.png");
            }
            return "";
        },
        isDeleted: function () {
            return this.StateID === 999;
        }
    });
    function Get(Cluster, Name, data) {
        if (!Name) {
            throw new Error("Invalid Logical File ID");
        }
        var store = new Store();
        var retVal = store.get(createID(Cluster, Name));
        if (data) {
            lang.mixin(data, {
                __hpcc_id: createID(data.NodeGroup, data.Name),
                __hpcc_isDir: false,
                __hpcc_displayName: data.Name
            });
            retVal.updateData(data);
        }
        return retVal;
    }
    exports.Get = Get;
    function CreateLFQueryStore(options) {
        var store = new Store(options);
        return Observable(store);
    }
    exports.CreateLFQueryStore = CreateLFQueryStore;
    function CreateLFQueryTreeStore(options) {
        var store = new TreeStore(options);
        return Observable(store);
    }
    exports.CreateLFQueryTreeStore = CreateLFQueryTreeStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPLogicalFile.js.map

/***/ }),

/***/ "./lib/src/WsDfu.js":
/*!**************************!*\
  !*** ./lib/src/WsDfu.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojox/xml/parser */ "./node_modules/dojox/xml/parser.js"), __webpack_require__(/*! ./ESPBase */ "./lib/src/ESPBase.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Memory, Observable, QueryResults, topic, Deferred, parser, ESPBase_1, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiskUsageStore = declare([Memory], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        query: function (query, options) {
            switch (query.CountBy) {
                case "Year":
                case "Quarter":
                case "Month":
                case "Day":
                    query.Interval = query.CountBy;
                    query.CountBy = "Date";
                    break;
            }
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            DFUSpace({
                request: query
            }).then(lang.hitch(this, function (response) {
                var data = [];
                if (lang.exists("DFUSpaceResponse.DFUSpaceItems.DFUSpaceItem", response)) {
                    arrayUtil.forEach(response.DFUSpaceResponse.DFUSpaceItems.DFUSpaceItem, function (item, idx) {
                        data.push(lang.mixin(item, {
                            __hpcc_id: item.Name
                        }));
                    }, this);
                }
                if (options.sort && options.sort.length) {
                    data.sort(function (_l, _r) {
                        var l = _l[options.sort[0].attribute];
                        var r = _r[options.sort[0].attribute];
                        if (l === r) {
                            return 0;
                        }
                        switch (options.sort[0].attribute) {
                            case "TotalSize":
                            case "LargestSize":
                            case "SmallestSize":
                            case "NumOfFiles":
                            case "NumOfFilesUnknown":
                                l = parseInt(l.split(",").join(""));
                                r = parseInt(r.split(",").join(""));
                        }
                        if (options.sort[0].descending) {
                            return r < l ? -1 : 1;
                        }
                        return l < r ? -1 : 1;
                    });
                }
                this.setData(data);
                deferredResults.resolve(data);
                deferredResults.total.resolve(data.length);
            }));
            return QueryResults(deferredResults);
        }
    });
    function CreateDiskUsageStore() {
        var store = new DiskUsageStore();
        return Observable(store);
    }
    exports.CreateDiskUsageStore = CreateDiskUsageStore;
    function DFUArrayAction(logicalFiles, actionType) {
        arrayUtil.forEach(logicalFiles, function (item, idx) {
            if (item.isSuperfile) {
                item.qualifiedName = item.Name;
            }
            else {
                item.qualifiedName = item.Name + "@" + item.NodeGroup;
            }
        });
        var request = {
            LogicalFiles: logicalFiles,
            Type: actionType
        };
        ESPRequest.flattenArray(request, "LogicalFiles", "qualifiedName");
        return ESPRequest.send("WsDfu", "DFUArrayAction", {
            request: request
        }).then(function (response) {
            if (lang.exists("DFUArrayActionResponse.ActionResults.DFUActionInfo", response)) {
                var exceptions = [];
                arrayUtil.forEach(response.DFUArrayActionResponse.ActionResults.DFUActionInfo, function (item, idx) {
                    if (item.Failed) {
                        exceptions.push({
                            Source: item.FileName,
                            Message: item.ActionResult
                        });
                    }
                });
                if (exceptions.length) {
                    topic.publish("hpcc/brToaster", {
                        Severity: "Error",
                        Source: "WsDfu.DFUArrayAction",
                        Exceptions: exceptions
                    });
                }
            }
            return response;
        });
    }
    exports.DFUArrayAction = DFUArrayAction;
    function SuperfileAction(action, superfile, subfiles, removeSuperfile) {
        var request = {
            action: action,
            superfile: superfile,
            subfiles: subfiles,
            removeSuperfile: removeSuperfile
        };
        ESPRequest.flattenArray(request, "subfiles", "Name");
        return ESPRequest.send("WsDfu", "SuperfileAction", {
            request: request
        });
    }
    exports.SuperfileAction = SuperfileAction;
    function AddtoSuperfile(logicalFiles, superfile, existingFile) {
        var request = {
            names: logicalFiles,
            Superfile: superfile,
            ExistingFile: existingFile ? 1 : 0
        };
        ESPRequest.flattenArray(request, "names", "Name");
        return ESPRequest.send("WsDfu", "AddtoSuperfile", {
            request: request
        });
    }
    exports.AddtoSuperfile = AddtoSuperfile;
    function DFUQuery(params) {
        return ESPRequest.send("WsDfu", "DFUQuery", params);
    }
    exports.DFUQuery = DFUQuery;
    function DFUFileView(params) {
        return ESPRequest.send("WsDfu", "DFUFileView", params);
    }
    exports.DFUFileView = DFUFileView;
    function DFUSpace(params) {
        return ESPRequest.send("WsDfu", "DFUSpace", params);
    }
    exports.DFUSpace = DFUSpace;
    function ListHistory(params) {
        return ESPRequest.send("WsDfu", "ListHistory", params);
    }
    exports.ListHistory = ListHistory;
    function EraseHistory(params) {
        return ESPRequest.send("WsDfu", "EraseHistory", params);
    }
    exports.EraseHistory = EraseHistory;
    function DFUInfo(params) {
        return ESPRequest.send("WsDfu", "DFUInfo", params).then(function (response) {
            if (lang.exists("Exceptions.Exception", response)) {
                arrayUtil.forEach(response.Exceptions.Exception, function (item, idx) {
                    if (item.Code === 20038) {
                        lang.mixin(response, {
                            DFUInfoResponse: {
                                FileDetail: {
                                    Name: params.request.Name,
                                    StateID: 999,
                                    State: "not found"
                                }
                            }
                        });
                    }
                });
            }
            else if (lang.exists("DFUInfoResponse.FileDetail", response)) {
                response.DFUInfoResponse.FileDetail.StateID = 0;
                response.DFUInfoResponse.FileDetail.State = "";
            }
            return response;
        });
    }
    exports.DFUInfo = DFUInfo;
    function DFUDefFile(params) {
        lang.mixin(params, {
            handleAs: "text"
        });
        return ESPRequest.send("WsDfu", "DFUDefFile", params).then(function (response) {
            try {
                var domXml = parser.parse(response);
                var espBase = new ESPBase_1.default();
                var exceptions = espBase.getValues(domXml, "Exception", ["Exception"]);
                if (exceptions.length) {
                    response = "";
                    arrayUtil.forEach(exceptions, function (item, idx) {
                        response += item.Message + "\n";
                    });
                }
            }
            catch (e) {
                //  No errors  ---
            }
            return response;
        });
    }
    exports.DFUDefFile = DFUDefFile;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsDfu.js.map

/***/ })

}]);