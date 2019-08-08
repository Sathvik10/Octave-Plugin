(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/PreflightDetailsWidget":"./eclwatch/PreflightDetailsWidget.js",
	"src/ESPPreflight":"./lib/src/ESPPreflight.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[76],{

/***/ "./eclwatch/PreflightDetailsWidget.js":
/*!********************************************!*\
  !*** ./eclwatch/PreflightDetailsWidget.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"),
    __webpack_require__(/*! dojo/_base/window */ "./node_modules/dojo/_base/window.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ESPPreflight */ "./lib/src/ESPPreflight.js"),

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, domClass, domConstruct, domGeom, win,
    registry, TextBox,
    GridDetailsWidget, ESPUtil, ESPPreflight
    ) {
        return declare("PreflightDetailsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            preflightTab: null,
            preflightWidgetLoaded: false,
            gridTitle: nlsHPCC.title_PreflightResults,
            idProperty: "__hpcc_id",

            init: function (params, route) {
                if (this.inherited(arguments))
                    return;
                this.initalized = false;
                this.params = params;
                this.setColumns(params);
                this.refresh(params, route);
            },

            refresh: function (params, route) {
                route === "machines" ? this.refreshMachinesGrid(params) : this.refreshClusterGrid(params);
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");
                this.openButton.set("disabled", true);

                var retVal = new declare([ESPUtil.Grid(true, false, {rowsPerPage:1000}, true)])({
                    store: this.store,
                    columns: this.setColumns()
                }, domID);
                return retVal;
            },

            calculateColumnWidth: function (grid) {
                for (var key in grid.columns) {
                    console.log(grid.columns[key].id)
                    if (grid.columns[key].label !== "Location" && grid.columns[key].label !== "Component") { //this needs improvement
                        var node = domConstruct.toDom('<div style="position:absolute;visibility:hidden">' + grid.columns[key].label + '</div>');
                        domConstruct.place(node, win.body());
                        var p = domGeom.position(node);
                        domConstruct.destroy(node);
                        grid.resizeColumnWidth(grid.columns[key].id, (Math.ceil(p.w) + 20));
                    }
                }
            },

            setColumns: function (params) {
                var context = this;
                var dynamicColumns = {
                    Location: {label: this.i18n.Location, id: this.i18n.Location, width: 350},
                    Component: {label: this.i18n.Component, id: this.i18n.Component, width: 275},
                    ComputerUpTime: { label: this.i18n.ComputerUpTime, width: 75 }
                }

                function handleResponse(response, dynamicColumns) {
                    arrayUtil.forEach(response, function (row, idx) {
                        if (row.Storage) {
                            var request = params.RequestInfo.DiskThreshold;
                            arrayUtil.forEach(row.Storage.StorageInfo, function(storageitem, storageidx) {
                                var swap = storageitem.Description === "Swap"; //swap if === 0 should be N/A (data needs restructuring in HPCC-21667)
                                var tempObj =  {};
                                var cleanColumnName = context.cleanColumn(storageitem.Description);
                                tempObj[cleanColumnName] = {
                                    label: storageitem.Description,
                                    renderCell: function(object, value, node, options) {
                                        switch (request > value && value !== 0) {
                                            case true:
                                                domClass.add(node, "WarningCell");
                                            break;
                                        }
                                        if (swap && value !== 0) {
                                            node.innerText = value + "%" || "N/A"
                                        } else if (!value) {
                                            node.innerText = "";
                                        } else {
                                            node.innerText = value + "%";
                                        }
                                    }
                                }
                                lang.mixin(dynamicColumns, tempObj);
                            });
                        }
                    });
                    return dynamicColumns;
                }

                if (params) {
                    if (params.TargetClusterInfoList) {
                        handleResponse(params.TargetClusterInfoList.TargetClusterInfo[0].Processes.MachineInfoEx, dynamicColumns)
                    } else {
                        handleResponse(params.Machines.MachineInfoEx, dynamicColumns)
                    }

                    var finalColumns = params.Columns.Item;
                    for (var index in finalColumns) {
                        var clean = this.cleanColumn(finalColumns[index]);

                        if (clean === "Condition") {
                            lang.mixin(dynamicColumns, {
                                "Condition": {
                                    label: this.i18n.Condition,
                                    renderCell: function(object, value, node, options) {
                                        switch (value) {
                                            case 'Unknown':
                                            case 'Warning':
                                            case 'Minor':
                                            case 'Major':
                                            case 'Critical':
                                            case 'Fatal':
                                                domClass.add(node, "WarningCell");
                                            break;
                                        }
                                        node.innerText = value || "";
                                    }
                                }
                            });
                        }

                        if (clean === "State") {
                            lang.mixin(dynamicColumns, {
                                "State": {
                                    label: this.i18n.State,
                                    renderCell: function(object, value, node, options) {
                                        switch (value) {
                                            case 'Unknown':
                                            case 'Starting':
                                            case 'Stopping':
                                            case 'Suspended':
                                            case 'Recycling':
                                            case 'Busy':
                                            case 'NA':
                                                domClass.add(node, "WarningCell");
                                            break;
                                        }
                                        node.innerText = value || "";
                                    }
                                }
                            });
                        }

                        if (clean === "CPULoad") {
                            var request = params.RequestInfo.CpuThreshold;
                            lang.mixin(dynamicColumns, {
                                CPULoad: {
                                    label: this.i18n.CPULoad,
                                    renderCell: function (object, value, node, options) {
                                        switch (request < value) {
                                            case true:
                                                domClass.add(node, "WarningCell");
                                            break;
                                        }
                                        node.innerText = value + "%";
                                    }
                                }
                            });
                        }

                        if (clean === "RoxieState") {
                            lang.mixin(dynamicColumns, {
                                RoxieState: {
                                    label: this.i18n.RoxieState,
                                    renderCell: function (object, value, node, options) {
                                        switch (value) {
                                            case "State hash mismatch ...":
                                            case "Not attached to DALI...":
                                            case "empty state hash ...":
                                            case "Node State: not ok ...":
                                                domClass.add(node, "WarningCell");
                                            break;
                                        }
                                        node.innerText = value || "N/A";
                                    }
                                }
                            });
                        }
                    }
                     context.grid.set("columns", dynamicColumns);
                     context.calculateColumnWidth(context.grid);
                }
            },

            cleanColumn: function (str) {
                var clean = str.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g, '');
                return clean;
            },

            refreshMachinesGrid: function (params) {
                var context = this;
                var params = this.params;
                var results = [];

                if (params) {
                    arrayUtil.forEach(params.Machines.MachineInfoEx, function (row, idx) {
                        var dynamicRowsObj = {};
                        row.RoxieState ? lang.mixin(dynamicRowsObj, {
                            RoxieState: row.RoxieState
                        }) : "";
                        lang.mixin(dynamicRowsObj, {
                            Location: row.Address + " " + row.ComponentPath,
                            Component: row.DisplayType + "[" + row.ComponentName + "]",
                            ComputerUpTime: row.UpTime
                        });
                        if (row.Processors) {
                            arrayUtil.forEach(row.Processors.ProcessorInfo, function (processor, idx) {
                                lang.mixin(dynamicRowsObj, {
                                    CPULoad: processor.Load
                                });
                            });
                        }
                        if (row.Storage) {
                            arrayUtil.forEach(row.Storage.StorageInfo, function (storage, idx) {
                                var cleanColumn = context.cleanColumn(storage.Description);
                                var tmpObj = {};
                                tmpObj[cleanColumn] = storage.PercentAvail;
                                lang.mixin(dynamicRowsObj, tmpObj);
                            });
                        }
                        results.push(dynamicRowsObj);
                    });
                }

                context.store.setData(results);
                context.grid.set("query", {});
            },

            refreshClusterGrid: function (params) {
                var context = this;
                var params = this.params;
                var results = [];

                if (params) {
                    arrayUtil.forEach(params.TargetClusterInfoList.TargetClusterInfo, function (row, idx) {
                        arrayUtil.forEach(row.Processes.MachineInfoEx, function (setRows, idx) {
                            var dynamicRowsObj = {};
                            setRows.RoxieState ? lang.mixin(dynamicRowsObj, {
                                RoxieState: setRows.RoxieState
                            }) : "";
                            lang.mixin(dynamicRowsObj, {
                                Location: setRows.Address + " " + setRows.ComponentPath,
                                Component: setRows.DisplayType + "[" + setRows.ComponentName + "]",
                                ComputerUpTime: setRows.UpTime
                            });

                            if (setRows.ComponentInfo) {
                                lang.mixin(dynamicRowsObj, {
                                    Condition: ESPPreflight.getCondition(setRows.ComponentInfo.Condition),
                                    State: ESPPreflight.getState(setRows.ComponentInfo.State),
                                    UpTime: setRows.ComponentInfo.UpTime
                                });
                            }
                            if (setRows.Processors) {
                                arrayUtil.forEach(setRows.Processors.ProcessorInfo, function (processor, idx) {
                                    lang.mixin(dynamicRowsObj, {
                                        CPULoad: processor.Load
                                    });
                                });
                            }
                            if (setRows.Storage) {
                                arrayUtil.forEach(setRows.Storage.StorageInfo, function (storage, idx) {
                                    var cleanColumn = context.cleanColumn(storage.Description)
                                    var tmpObj = {};
                                    tmpObj[cleanColumn] = storage.PercentAvail
                                    lang.mixin(dynamicRowsObj, tmpObj);
                                });
                            }
                            results.push(dynamicRowsObj);
                        });
                    });
                }
                context.store.setData(results);
                context.grid.set("query", {});
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./lib/src/ESPPreflight.js":
/*!*********************************!*\
  !*** ./lib/src/ESPPreflight.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var i18n = nlsHPCC;
    function getCondition(int) {
        switch (int) {
            case 1:
                return i18n.Normal;
            case 2:
                return i18n.Warning;
            case 3:
                return i18n.Minor;
            case 4:
                return i18n.Major;
            case 5:
                return i18n.Critical;
            case 6:
                return i18n.Fatal;
            default:
                return i18n.Unknown;
        }
    }
    exports.getCondition = getCondition;
    function getState(int) {
        switch (int) {
            case 0:
                return i18n.Unknown;
            case 1:
                return i18n.Starting;
            case 2:
                return i18n.Stopping;
            case 3:
                return i18n.Suspended;
            case 4:
                return i18n.Recycling;
            case 5:
                return i18n.Ready;
            case 6:
                return i18n.Busy;
            default:
                return i18n.Unknown;
        }
    }
    exports.getState = getState;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ESPPreflight.js.map

/***/ })

}]);