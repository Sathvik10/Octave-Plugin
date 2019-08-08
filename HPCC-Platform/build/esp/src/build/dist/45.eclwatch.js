(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/TimingTreeMapWidget":"./eclwatch/TimingTreeMapWidget.js",
	"dojo/text!templates/TimingTreeMapWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingTreeMapWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./eclwatch/TimingTreeMapWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/TimingTreeMapWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
    __webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dojox/treemap/TreeMap */ "./node_modules/dojox/treemap/TreeMap.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),

    __webpack_require__(/*! dojo/text!../templates/TimingTreeMapWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingTreeMapWidget.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Memory, dom, domClass, domStyle, has,
        registry,
        TreeMap,
        _Widget, ESPWorkunit,
        template) {
        return declare("TimingTreeMapWidget", [_Widget], {
            templateString: template,
            baseClass: "TimingTreeMapWidget",
            i18n: nlsHPCC,

            treeMap: null,
            store: null,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.treeMap = registry.byId(this.id + "TreeMap");

                var context = this;
                this.treeMap.on("click", function (evt) {
                    context.onClick(context.treeMap.selectedItems);
                });
                this.treeMap.on("dblclick", function (evt) {
                    context.onDblClick(context.treeMap.selectedItem);
                });
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            calcHeight: function (elmID) {
                var elmHeight, elmMargin, elm = document.getElementById(elmID);
                if (has("ie") === 8) {
                    return elm.clientHeight;
                }
                var computedStyle = domStyle.getComputedStyle(elm);
                elmHeight = parseFloat(computedStyle.getPropertyValue("height"));
                elmMargin = parseFloat(computedStyle.getPropertyValue('margin-top')) + parseInt(computedStyle.getPropertyValue('margin-bottom'));
                return elmHeight + elmMargin;
            },

            resize: function (args) {
                this.inherited(arguments);
                var helpHeight = this.params.hideHelp ? 0 : this.calcHeight(this.id + "Help");
                args.h -= helpHeight + 2;
                this.treeMap._dataChanged = true;
                this.treeMap.resize(args);
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Plugin wrapper  ---
            onClick: function (value) {
            },

            onDblClick: function (value) {
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.hideHelp) {
                    domClass.add(this.id + "Help", "hidden");
                }

                var context = this;
                if (params.Wuid) {
                    this.wu = ESPWorkunit.Get(params.Wuid);
                    var monitorCount = 4;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.refreshTreeMap();
                        }
                    });
                }
            },

            getSelected: function () {
                return this.treeMap.selectedItems;
            },

            setSelectedAsGlobalID: function (selItems) {
                if (this.store) {
                    var selectedItems = [];
                    for (var i = 0; i < selItems.length; ++i) {
                        var item = this.store.get(selItems[i]);
                        if (item) {
                            selectedItems.push(item);
                        }
                    }
                    try {  //  Throws an exception in IE 8
                        this.treeMap.set("selectedItems", selectedItems);
                    } catch (e) {
                    }
                }
            },

            setSelected: function (selItems) {
                if (this.store) {
                    var selectedItems = [];
                    for (var i = 0; i < selItems.length; ++i) {
                        var item = this.store.get(selItems[i].SubGraphId);
                        if (item) {
                            selectedItems.push(item);
                        }
                    }
                    try {  //  Throws an exception in IE 8
                        this.treeMap.set("selectedItems", selectedItems);
                    } catch (e) {
                    }
                }
            },

            setSelectedGraphs: function (selItems) {
                if (this.store) {
                    var selectedItems = [];
                    for (var i = 0; i < selItems.length; ++i) {
                        arrayUtil.forEach(this.store.data, function (item, idx) {
                            if (selItems[i].__hpcc_id && item.__hpcc_id === selItems[i].__hpcc_id) {
                                selectedItems.push(item);
                            } else if (item.GraphName === selItems[i].Name) {
                                selectedItems.push(item);
                            }
                        });
                    }
                    this.treeMap.set("selectedItems", selectedItems);
                }
            },

            setActivityMetric: function (metric) {
                this._activityMetric = metric;
                this.refreshActivities();
            },

            setActivities: function (activities, skipRefresh) {
                this._activities = activities;
                if (!skipRefresh) {
                    this.refreshActivities();
                }
            },

            refreshActivities: function () {
                var context = this;
                setTimeout(function () {
                    context.loadTimers(arrayUtil.map(context._activities, function (activity) {
                        return {
                            __hpcc_prefix: "Activites",
                            __hpcc_id: activity._globalID,
                            ActivityID: activity._globalID,
                            Name: activity.label,
                            Seconds: activity[context._activityMetric || "TimeMaxLocalExecute"]
                        };
                    }));
                }, 20);
            },

            refreshTreeMap: function () {
                var context = this;
                this.wu.fetchTimers(function (timers) {
                    context.timers = timers;
                    context.loadTimers(timers);
                });
            },

            timerFilter: function (timer) {
                if (isNaN(timer.Seconds)) {
                    return false;
                }
                if (lang.exists("params.query.graphsOnly", this) && this.params.query.graphsOnly) {
                    return (timer.SubGraphId && (this.params.query.graphName === "*" || this.params.query.graphName === timer.GraphName) && (this.params.query.subGraphId === "*" || this.params.query.subGraphId === timer.SubGraphId));
                }
                return (timer.Name !== "Process" &&
                    timer.Name !== "compile" &&
                    timer.Name !== "Total thor time" &&
                    timer.Name !== "Total cluster time" &&
                    timer.Name.indexOf(":TimeElapsed") < 0);
            },

            loadTimers: function (_timers) {
                var context = this;
                var timers = arrayUtil.filter(_timers, function (d) { return context.timerFilter(d); });
                var timerData = [];
                if (timers) {
                    this.avg = timers.reduce(function (sum, timer) { return sum + timer.Seconds; }, 0) / timers.length;
                    var sqrDiffs = arrayUtil.map(timers, function (timer) { return Math.pow(timer.Seconds - context.avg, 2); });
                    var variance = sqrDiffs.reduce(function (sum, value) { return sum + value; }, 0) / sqrDiffs.length;
                    this.stdDev = Math.sqrt(variance);
                    for (var i = 0; i < timers.length; ++i) {
                        var prefix = "other";
                        timers[i].__hpcc_name = timers[i].Name;
                        if (timers[i].Name.indexOf("Graph graph") === 0) {
                            timers[i].__hpcc_name = timers[i].SubGraphId;
                            if (!timers[i].SubGraphId) {
                                continue;
                            }
                            prefix = timers[i].GraphName;
                        } else {
                            var nameParts = timers[i].Name.split(":");
                            if (nameParts.length > 1) {
                                prefix = nameParts[0];
                            }
                        }
                        timerData.push(lang.mixin({
                            __hpcc_prefix: prefix
                        }, timers[i]));
                    }
                }
                this.store = new Memory({
                    idProperty: "__hpcc_id",
                    data: timerData
                });

                var context = this;
                this.treeMap.set("store", this.store);
                this.treeMap.set("areaAttr", "Seconds");
                this.treeMap.set("colorFunc", function (item) {
                    var deviation = (item.Seconds - context.avg) / context.stdDev;
                    var redness = 0;
                    var greeness = 0;
                    if (deviation > 0) {
                        redness = Math.min(255, Math.floor(255 * deviation / 3));
                    } else {
                        greeness = -Math.min(255, Math.floor(255 * deviation / 3));
                    }
                    return {
                        r: 255 - greeness,
                        g: 255 - redness,
                        b: 255 - redness - greeness
                    };
                });
                this.treeMap.set("groupAttrs", ["__hpcc_prefix"]);
                this.treeMap.set("labelAttr", "__hpcc_name");
                this.treeMap.set("tooltipFunc", function (item) {
                    return item.Name + " " + item.Seconds;
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/TimingTreeMapWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/TimingTreeMapWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <p id=\"${id}Help\">${i18n.help}</p>\n    <div id=\"${id}TreeMap\" style=\"width: 100%; height: 100%;\" data-dojo-props=\"selectionMode: 'multiple'\" data-dojo-type=\"dojox.treemap.TreeMap\">\n    </div>\n</div>\n"

/***/ })

}]);