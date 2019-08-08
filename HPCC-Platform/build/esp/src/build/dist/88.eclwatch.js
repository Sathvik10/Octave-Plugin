(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/viz/DojoD3":"./eclwatch/viz/DojoD3.js",
	"hpcc/viz/DojoD32DChart":"./eclwatch/viz/DojoD32DChart.js",
	"hpcc/viz/Mapping":"./eclwatch/viz/Mapping.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[88],{

/***/ "./eclwatch/viz/DojoD3.js":
/*!********************************!*\
  !*** ./eclwatch/viz/DojoD3.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"),
    __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"),

    __webpack_require__(/*! @hpcc-js/common */ "./node_modules/@hpcc-js/common/dist/index.min.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, dom, domConstruct, domGeom, Evented,
    hpccCommon) {
        return declare([Evented], {
            constructor: function () {
            },

            resize: function () {
                var _debounce = function (fn, timeout) {
                    var timeoutID = -1;
                    return function () {
                        if (timeoutID > -1) {
                            window.clearTimeout(timeoutID);
                        }
                        timeoutID = window.setTimeout(fn, timeout);
                    }
                };

                var _debounced_draw = _debounce(lang.hitch(this, function () {
                    domConstruct.empty(this.target.domNodeID);
                    this.renderTo(this._target);
                    if (this.hasData()) {
                        this.display();
                    }
                }), 125);

                _debounced_draw();
            },

            renderTo: function (_target) {
                this._target = _target;
                this.calcGeom();
                this.injectStyleSheet();
                this.Svg = hpccCommon.select(this.target.domDivID).append("svg")
                    .attr("width", this.target.width)
                    .attr("height", this.target.height)
                    ;
                this.SvgG = this.Svg.append("g");
            },

            calcGeom: function () {
                var node = dom.byId(this._target.domNodeID);
                var pos = domGeom.position(node);
                var pad = domGeom.getPadExtents(node);
                this.target = lang.mixin({
                    domDivID: "#" + this._target.domNodeID,
                    width: pos.w - pad.w,
                    height: pos.h - pad.h,
                    margin: { top: 0, right: 0, bottom: 0, left: 0 }
                }, this._target);
                lang.mixin(this.target, {
                    diameter: Math.min(this.target.width, this.target.height)
                });
                lang.mixin(this.target, {
                    radius: this.target.diameter / 2
                });
                return this.target;
            },

            injectStyleSheet: function () {
                if (this.target.css) {
                    var styleNode = dom.byId(this.target.domNodeID + "Style");
                    if (styleNode) {
                        domConstruct.destroy(this.target.domNodeID + "Style");
                    }
                    var style = domConstruct.create("style", {
                        id: this.target.domNodeID + "Style",
                        innerHTML: this.target.css
                    });
                    dojo.query("head").some(function (item, idx) {
                        item.appendChild(style);
                        return false;
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/viz/DojoD32DChart.js":
/*!***************************************!*\
  !*** ./eclwatch/viz/DojoD32DChart.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),

    __webpack_require__(/*! @hpcc-js/chart */ "./node_modules/@hpcc-js/chart/dist/index.min.js"),
    __webpack_require__(/*! @hpcc-js/other */ "./node_modules/@hpcc-js/other/dist/index.min.js"),

    __webpack_require__(/*! ./DojoD3 */ "./eclwatch/viz/DojoD3.js"),
    __webpack_require__(/*! ./Mapping */ "./eclwatch/viz/Mapping.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, arrayUtil, Deferred,
    hpccChart, hpccOther,
    DojoD3, Mapping) {
        return declare([Mapping, DojoD3], {
            mapping: {
                _2DChart: {
                    display: "2D Chart Data",
                    fields: {
                        label: "Label",
                        value: "Value"
                    }
                }
            },

            constructor: function (mappings, target) {
                if (mappings)
                    this.setFieldMappings(mappings);

                if (target)
                    this.renderTo(target);
            },

            renderTo: function (_target) {
                var deferred = new Deferred();
                switch (this._chartType) {
                    case "BUBBLE":
                        this.chart = new hpccChart.Bubble()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    case "PIE":
                        this.chart = new hpccChart.Pie()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    case "RADIAL_BAR":
                        this.chart = new hpccChart.RadialBar()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    case "WORD_CLOUD":
                        this.chart = new hpccChart.WordCloud()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    case "HEX_BIN":
                        this.chart = new hpccChart.HexBin()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    case "CONTOUR":
                        this.chart = new hpccChart.Contour()
                            .target(_target.domNodeID)
                            ;
                        deferred.resolve(this.chart);
                        break;
                    default:
                        console.log("Invalid visualization:  " + this._chartType)
                        deferred.resolve(null);
                }
                return deferred.promise;
            },

            display: function (data) {
                if (data)
                    this.setData(data);

                var data = this.getMappedData();

                var columns = [this.getFieldMapping("label"), this.getFieldMapping("value")];
                var chartData = [];
                arrayUtil.forEach(data, function (row, idx) {
                    chartData.push([row.label, row.value]);
                });
                this.chart
                    .columns(columns)
                    .data(chartData)
                    .render()
                    ;
                return;
            },

            resize: function () {
                var _debounce = function (fn, timeout) {
                    var timeoutID = -1;
                    return function () {
                        if (timeoutID > -1) {
                            window.clearTimeout(timeoutID);
                        }
                        timeoutID = window.setTimeout(fn, timeout);
                    }
                };

                var _debounced_draw = _debounce(lang.hitch(this, function () {
                    this.chart
                        .resize()
                        .render()
                        ;
                }), 125);

                _debounced_draw();
            },

            update: function (data) {
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/viz/Mapping.js":
/*!*********************************!*\
  !*** ./eclwatch/viz/Mapping.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, lang, arrayUtil) {
    var Entity = declare(null, {
        _id: null,
        _display: null,
        _attrs: null,

        constructor: function(id, display) {
            this._id = id;
            this._display = display;
            this._attrs = {};
        },

        getID: function() {
            return this._id;
        },

        getDisplay: function() {
            return this._display.split(" ").join("&nbsp;");
        },

        setAttr: function(attr, val) {
            this._attrs[attr] = val;
        },

        getAttr: function(attr) {
            return this._attrs[attr];
        }
    });

    var EntityArray = declare(null, {
        entities: null,

        constructor: function(id, display) {
            this.entities = {}
        },

        add: function(entity) {
            this.entities[entity.getID()] = entity;
            return entity;
        },

        getOne: function() {
            for (var key in this.entities) {
                return this.entities[key];
            }
            return null;
        },

        get: function(id) {
            if (id) {
                return this.entities[id];
            }
            return this.getOne();
        },

        getAll: function() {
            return this.entities;
        },

        getArray: function() {
            var retVal = [];
            for (var key in this.entities) {
                retVal.push(this.entities[key]);
            }
            return retVal;
        },

        setAttr: function(id, attr, val) {
            this.entities[id].setAttr(attr, val);
        },

        getAttr: function(id, attr) {
            return this.entities[id].getAttr(attr);
        }
    });

    var Field = declare(Entity, {
        constructor: function() {
        }
    });

    var Dataset = declare(Entity, {
        fields: null,

        constructor: function(id, display, fields) {
            this.fields = new EntityArray();
            for (var key in fields) {
                this.addField(key, fields[key]);
            }
        },

        addField: function(id, display) {
            return this.fields.add(new Field(id, display));
        },

        setFieldMapping: function(id, field) {
            this.fields.setAttr(id, "field", field);
        },

        getFieldMapping: function(id) {
            return this.fields.getAttr(id, "field");
        },

        getFieldMappings: function(id) {
            return this.fields.getArray();
        },

        setData: function(data) {
            this.data = data;
        },

        getMappedData: function() {
            return this._mapArray(this.data)
        },

        hasData: function() {
            if (this.data && this.data.length) {
                return true;
            }
        },

        _mapItem: function(item) {
            if (!item)
                return item;

            var retVal = {};
            for (var key in this.fields.getAll()) {
                var field = this.fields.getAttr(key, "field");
                var val;
                if (field && lang.exists(field, item)) {
                    val = item[field];
                } else {
                    val = item[key];
                }
                if (val === null || val === undefined) {
                } else if (Object.prototype.toString.call(val) === '[object Array]') {
                    retVal[key] = this.delegateArray(val);
                } else if (!isNaN(parseFloat(val))) {
                    retVal[key] = parseFloat(val);
                } else {
                    retVal[key] = val.trim();
                }
            }
            return retVal;
        },

        _mapArray: function(arr) {
            if (!arr)
                return arr;

            return arr.map(lang.hitch(this, function(item) {
                return this._mapItem(item);
            }));
        }
    });

    return declare(null, {
        datasets: null,

        constructor: function() {
            this.datasets = new EntityArray();
            this.setDatasetMappings(this.mapping);
        },

        //  Datasets  ---
        setDatasetMappings: function(datasets) {
            for (var key in datasets) {
                this.setDatasetMapping(key, datasets[key].display, datasets[key].fields);
            }
        },

        setDatasetMapping: function(id, display, fields) {
            return this.datasets.add(new Dataset(id, display, fields));
        },

        getDatasetMappings: function() {
            return this.datasets.getArray();
        },

        cloneDatasetMappings: function() {
            return lang.clone(this.datasets.getArray());
        },

        //  Fields  ---
        setFieldMappings: function(mappings, datasetID) {
            var dataset = this.datasets.get(datasetID);
            for (var key in mappings) {
                dataset.setFieldMapping(key, mappings[key]);
            }
        },

        setFieldMapping: function(id, field, datasetID) {
            var dataset = this.datasets.get(datasetID);
            dataset.setFieldMapping(id, field);
        },

        getFieldMapping: function(id, datasetID) {
            var dataset = this.datasets.get(datasetID);
            return dataset.getFieldMapping(id) || id;
        },

        //  Data  ---
        setData: function(data, datasetID) {
            var dataset = this.datasets.get(datasetID);
            dataset.setData(data);
        },

        getMappedData: function(datasetID) {
            var dataset = this.datasets.get(datasetID);
            return dataset.getMappedData();
        },

        hasData: function() {
            var retVal = false;
            arrayUtil.forEach(this.datasets.getArray(), function(item, idx) {
                retVal = true;
                if (!item.hasData()) {
                    retVal = false;
                    return true;
                }
            });
            return retVal;
        }
    });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);