(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/SelectionGridWidget":"./eclwatch/SelectionGridWidget.js",
	"hpcc/VizWidget":"./eclwatch/VizWidget.js",
	"dojo/text!templates/SelectionGridWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html",
	"dojo/text!templates/VizWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/VizWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./eclwatch/SelectionGridWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/SelectionGridWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;﻿!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"),
    __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dojo/text!../templates/SelectionGridWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, Memory, Observable,
    registry,
    OnDemandGrid, Keyboard, Selection, editor, selector, ColumnResizer, DijitRegistry,
    _Widget,
    template) {
        return declare("SelectionGridWidget", [_Widget], {
            templateString: template,
            store: null,
            idProperty: "Change Me",

            constructor: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            //  Implementation ---
            createGrid: function (args) {
                this.idProperty = args.idProperty;
                var store = new Memory({
                    idProperty: this.idProperty,
                    data: []
                });
                this.store = Observable(store);

                this.grid = new declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, DijitRegistry])({
                    store: this.store,
                    columns: args.columns
                }, this.id + "Grid");
            },

            setData: function (data) {
                this.store.setData(data);
                this.grid.refresh();
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/VizWidget.js":
/*!*******************************!*\
  !*** ./eclwatch/VizWidget.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/io-query */ "./node_modules/dojo/io-query.js"),
    __webpack_require__(/*! dojo/promise/all */ "./node_modules/dojo/promise/all.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! dgrid/editor */ "./dgrid/editor.js"),

    __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/dist/d3-collection.min.js"),
    __webpack_require__(/*! d3-array */ "./node_modules/d3-array/dist/d3-array.min.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/WsWorkunits */ "./lib/src/WsWorkunits.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/VizWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/VizWidget.html"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js"),
    __webpack_require__(/*! hpcc/SelectionGridWidget */ "./eclwatch/SelectionGridWidget.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/form/NumberSpinner */ "./node_modules/dijit/form/NumberSpinner.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/Fieldset */ "./node_modules/dijit/Fieldset.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, Deferred, domConstruct, domForm, ioQuery, all,
    registry, Select,
    editor,
    d3Collection, d3Array,
    _Widget, ESPWorkunit, WsWorkunits, Utility,
    template) {
        return declare("VizWidget", [_Widget], {
            templateString: template,
            i18n: nlsHPCC,

            borderContainer: null,
            grid: null,

            foundMatchingViz: false,
            foundMatchingFields: false,

            loaded: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.limit = registry.byId(this.id + "Limit");
                this.aggregateMode = registry.byId(this.id + "AggregateMode");
                this.vizSelect = registry.byId(this.id + "VizSelect");

                this.vizSelect = registry.byId(this.id + "VizSelect");
                this.mappingDropDown = registry.byId(this.id + "Mappings");
                this.mappingForm = registry.byId(this.id + "MappingForm");
                this.mappingLabel = registry.byId(this.id + "MappingLabel");
                this.mappingValues = registry.byId(this.id + "MappingValues");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
                if (this.d3Viz) {
                    this.d3Viz.resize();
                }
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            _onRefresh: function (evt) {
                this.refreshData();
            },

            _onRefreshData: function (evt) {
                this.refreshData();
            },

            _onVizSelect: function (value) {
                this.vizOnChange(value, true);
            },

            _onMappingsApply: function (evt) {
                this.refreshData();
                this.mappingDropDown.closeDropDown();
            },

            //  Implementation  ---
            onErrorClick: function (line, col) {
            },

            reset: function () {
                this.initalized = false;
                this.params = null;
                this.wu = null;
                this.vizType = null;
                this.vizSelect.set("options", []);
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.rows = [];

                this.loading = true;

                var context = this;
                if (params.limit) {
                    this.limit.set("value", params.limit);
                }
                WsWorkunits.GetVisualisations().then(function (vizResponse) {
                    context.vizSelect.set("options", vizResponse);
                    if (params.viz) {
                        context.vizSelect.set("value", params.viz);
                    } else {
                        context.vizSelect.set("value", vizResponse[0].value);
                    }
                    if (params.mapping) {
                        context.defaultSelection = ioQuery.queryToObject(params.mapping);
                    }
                    if (params.Wuid) {
                        context.wu = ESPWorkunit.Get(params.Wuid);
                        context.wu.fetchResults(function (response) {
                            var newSel = null;
                            arrayUtil.forEach(response, function (item, idx) {
                                arrayUtil.forEach(vizResponse, function (vizItem, idx) {
                                    if (vizItem.label.split(" ").join("").indexOf(item.Name) >= 0) {
                                        newSel = vizItem.value;
                                        return true;
                                    }
                                });
                                if (newSel) {
                                    return true;
                                }
                            });
                            if (newSel) {
                                context.foundMatchingViz = true;
                                context.vizSelect.set("value", newSel);
                            }
                            context.doFetchAllStructures().then(function (response) {
                                context.loading = false;
                                context.vizOnChange(context.vizSelect.get("value"), true);
                            });
                        });
                    }
                });
            },

            doFetchStructure: function (result) {
                var deferred = new Deferred();
                result.fetchStructure(function (response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            doFetchAllStructures: function () {
                var promiseArray = [];
                var context = this;
                this.resultStructures = {};
                arrayUtil.forEach(this.wu.results, function (item, idx) {
                    promiseArray.push(context.doFetchStructure(item).then(function (response) {
                        context.resultStructures[item.Sequence] = response;
                        return response;
                    }));
                });
                return all(promiseArray);
            },

            getResultOptions: function () {
                var retVal = [];
                arrayUtil.forEach(this.wu.results, function (item, idx) {
                    retVal.push({
                        label: item.Name,
                        value: item.Sequence
                    });
                });
                return retVal;
            },

            getFieldOptions: function (sequence, optional) {
                var retVal = optional ? [{ label: "&nbsp;", value: "" }] : [];
                arrayUtil.forEach(this.resultStructures[sequence], function (item, idx) {
                    if (item.field.indexOf("_") !== 0) {
                        retVal.push({
                            label: item.field,
                            value: item.field
                        });
                    }
                });
                return retVal;
            },

            getFieldValue: function (options, id, defIdx) {
                defIdx = defIdx || 0;
                var retVal = options[defIdx].value;
                if (lang.exists("defaultSelection." + id, this)) {
                    retVal = this.defaultSelection[id];
                } else {
                    arrayUtil.forEach(options, function (optionItem, idx) {
                        if (optionItem.label === id) {
                            retVal = optionItem.value;
                            return true;
                        }
                    });
                }
                return retVal;
            },

            getFieldAggregation: function (id) {
                if (lang.exists("defaultSelection." + id + "_aggr", this)) {
                    return this.defaultSelection[id + "_aggr"];
                }
                return "mean";
            },

            vizOnChange: function (value, autoShow) {
                if (this.loading)
                    return;

                var context = this;
                return this.refreshVizType(value).then(function (vizWidget) {
                    context.refreshMappings();
                    if (autoShow || (context.foundMatchingViz && context.foundMatchingFields)) {
                        setTimeout(function () {
                            context.refreshData();
                        }, 1);
                    } else {
                        var isVisible = document.getElementById(context.id).offsetHeight !== 0;
                        if (isVisible) {
                            context.mappingDropDown.focus();
                            context.mappingDropDown.loadAndOpenDropDown();
                        }
                    }
                });
            },

            refreshMappings: function () {
                this.datasetMappings = this.d3Viz.cloneDatasetMappings();

                var context = this;
                arrayUtil.forEach(this.datasetMappings, function (datasetMapping, idx) {
                    context.datasetOnChange(datasetMapping.getFieldMappings(), context.params.Sequence);
                });
            },

            datasetOnChange: function (fieldMappings, sequence) {
                if (this.loading)
                    return;

                if (sequence != null) {
                    var result = this.wu.results[sequence];
                    var data = null;

                    this.foundMatchingFields = false;
                    var foundMatchingFieldCount = 0;
                    var options = this.getFieldOptions(sequence);
                    this.mappingLabel.set("options", options)
                    var value = this.getFieldValue(options, "label");
                    this.mappingLabel.set("value", value);

                    var options2 = this.getFieldOptions(sequence, true);
                    if (!this.mappingValues.grid) {
                        this.mappingValues.createGrid({
                            idProperty: "id",
                            columns: {
                                field: editor({
                                    label: "Field",
                                    autoSave: true,
                                    editorArgs: {
                                        style: "width:75px;",
                                        options: options2
                                    }
                                }, Select),
                                aggregation: editor({
                                    label: "Value",
                                    autoSave: true,
                                    editorArgs: {
                                        style: "width:75px;",
                                        options: [
                                            { value: "", label: "&nbsp;" },
                                            { value: "mean", label: "Mean" },
                                            { value: "sum", label: "Sum" },
                                            { value: "max", label: "Max" },
                                            { value: "min", label: "Min" },
                                            { value: "median", label: "Median" },
                                            { value: "variance", label: "Variance" },
                                            { value: "deviation", label: "Deviation" },
                                            { value: "cnt", label: "Count" }
                                        ]
                                    }
                                }, Select)
                            }
                        });
                    }

                    var data = [];
                    var context = this;
                    arrayUtil.forEach(fieldMappings, function (fieldMapping, idx) {
                        if (idx > 0) {
                            var value = context.getFieldValue(options2, fieldMapping._id, idx === 1 ? 2 : 0);
                            var aggr = context.getFieldAggregation(fieldMapping._id);
                            data.push({
                                id: "value" + (idx > 1 ? idx : ""),
                                field: value,
                                aggregation: value ? aggr : ""
                            });
                        }
                    });
                    this.mappingValues.setData(data);
                    if (foundMatchingFieldCount === fieldMappings.length) {
                        this.foundMatchingFields = true;
                    }
                }
            },

            fieldOnChange: function (select, value) {
                if (this.loading)
                    return;

                this.d3Viz.setFieldMapping(select.fieldMapping.getID(), value, select.datasetMapping.getID());
            },

            vizType: "",
            refreshVizType: function (_value) {
                var valueParts = _value.split(" ");
                var value = valueParts[0];
                var chartType = valueParts[1];
                var deferred = new Deferred();
                var context = this;

                function requireWidget() {
                    Utility.resolve("viz/" + context.vizType, function (D3Viz) {
                        context.d3Viz = new D3Viz();
                        context.d3Viz._chartType = chartType;
                        domConstruct.empty(context.id + "VizCP");
                        context.d3Viz.renderTo({
                            domNodeID: context.id + "VizCP"
                        });
                        deferred.resolve(context.vizType);
                    });
                }

                if (this.vizType !== value || this.chartType !== chartType) {
                    this.vizType = value;
                    this.chartType = chartType;
                    requireWidget();
                }

                return deferred.promise;
            },

            getFilter: function () {
                var filter = domForm.toObject(this.id + "FilterDialog");
                var retVal = {};
                for (var key in filter) {
                    if (filter[key]) {
                        retVal[key] = filter[key];
                    }
                }
                return retVal;
            },

            refreshData: function () {
                if (this.limit.get("value") > this.rows.length) {
                    var result = this.wu.results[this.params.Sequence];
                    var context = this;
                    result.fetchNRows(this.rows.length, this.limit.get("value")).then(function (response) {
                        context.rows = context.rows.concat(response);
                        context.loadData();
                    });
                } else {
                    this.loadData();
                }
            },

            loadData: function () {
                var request = domForm.toObject(this.id + "MappingForm");
                arrayUtil.forEach(this.mappingValues.store.data, function (row, idx) {
                    if (row.field) {
                        request[row.id] = row.field;
                        request[row.id + "_aggr"] = row.aggregation;
                    }
                }, this);
                var context = this;
                var data = d3Collection.nest()
                    .key(function (d) { return d[request.label] })
                    .rollup(function (leaves) {
                        var retVal = {
                        };
                        arrayUtil.forEach(context.mappingValues.store.data, function (row, idx) {
                            if (row.field) {
                                switch (row.aggregation) {
                                    case "cnt":
                                        retVal[row.id] = leaves.length;
                                        break;
                                    default:
                                        retVal[row.id] = d3Array[row.aggregation || "mean"](leaves, function (d) {
                                            return d[row.field];
                                        });
                                        break;
                                }
                            }
                        }, this);
                        return retVal;
                    })
                    .entries(this.rows).map(function (d) {
                        var retVal = d.value;
                        retVal.label = d.key;
                        return retVal;
                    })
                    ;
                this.d3Viz.setData(data, null, request);

                this.params.limit = this.limit.get("value");
                this.params.viz = this.vizSelect.get("value");
                this.params.mapping = ioQuery.objectToQuery(request);
                this.defaultSelection = request;
                this.refreshHRef();
                this.d3Viz.display();
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/SelectionGridWidget.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/SelectionGridWidget.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" style=\"width: 100%; height: 280px\" data-dojo-props=\"splitter: false, gutters: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ContentPane\" style=\"padding: 0px\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}Grid\" style=\"margin: 1px\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/VizWidget.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/VizWidget.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"splitter: false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" style=\"padding: 0px; overflow: hidden\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <label class=\"Prompt\" for=\"${id}Limit\">Limit:</label>\n            <input id=\"${id}Limit\" value=\"500\" style=\"width:80px\" data-dojo-props=\"smallDelta:10, constraints:{min:1,max:100000,places:0}\" data-dojo-type=\"dijit.form.NumberSpinner\" />\n            <select id=\"${id}VizSelect\" data-dojo-attach-event=\"onChange:_onVizSelect\" data-dojo-type=\"dijit.form.Select\"></select>\n            <div id=\"${id}Mappings\" data-dojo-type=\"dijit.form.DropDownButton\">\n                <span>${i18n.Mappings}</span>\n                <div data-dojo-type=\"dijit.TooltipDialog\">\n                    <div id=\"${id}MappingForm\" style=\"width: 460px;\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                        <div data-dojo-type=\"dijit.Fieldset\">\n                            <legend>Data Domain</legend>\n                            <div data-dojo-type=\"hpcc.TableContainer\">\n                                <select id=\"${id}MappingLabel\" title=\"Label:\" name=\"label\" style=\"width: 100%;\" data-dojo-type=\"dijit.form.Select\">\n                                </select>\n                            </div>\n                        </div>\n                        <div data-dojo-type=\"dijit.Fieldset\">\n                            <legend>Value Domain</legend>\n                            <div id=\"${id}MappingValues\" data-dojo-type=\"SelectionGridWidget\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Refresh}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n        </div>\n        <div id=\"${id}VizCP\" style=\"padding: 15px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);