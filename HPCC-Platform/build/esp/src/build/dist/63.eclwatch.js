(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/GraphsWUWidget":"./eclwatch/GraphsWUWidget.js",
	"hpcc/GraphsWidget":"./eclwatch/GraphsWidget.js",
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ "./eclwatch/GraphsWUWidget.js":
/*!************************************!*\
  !*** ./eclwatch/GraphsWUWidget.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),

    __webpack_require__(/*! hpcc/GraphsWidget */ "./eclwatch/GraphsWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),
    __webpack_require__(/*! src/Timings */ "./lib/src/Timings.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    ContentPane,
    selector,
    GraphsWidget, ESPWorkunit,
    srcTimings) {
        return declare("GraphsWUWidget", [GraphsWidget], {
            wu: null,
            _graphsData: null,
            _timelineData: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.timelinePane = new ContentPane({
                    id: this.id + "TimelinePane",
                    region: "top",
                    splitter: true,
                    style: "height: 120px",
                    minSize: 120
                });
                this.timelinePane.placeAt(this.gridTab, "last");
                var context = this;
                var origResize = this.timelinePane.resize;
                this.timelinePane.resize = function () {
                    origResize.apply(this, arguments);
                    if (context.timeline) {
                        context.timeline
                            .resize()
                            .lazyRender()
                            ;
                    }
                }
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.Wuid) {
                    var context = this;
                    this.wu = ESPWorkunit.Get(params.Wuid);

                    this.timeline = new srcTimings.WUTimelineEx()
                        .target(this.id + "TimelinePane")
                        .maxZoom(Number.MAX_SAFE_INTEGER)
                        .overlapTolerence(1)
                        .baseUrl("")
                        .wuid(params.Wuid)
                        .on("dblclick", function (row, col, sel) {
                            if (row && row.__lparam && event && event.ctrlKey) {
                                var scope = row.__lparam;
                                switch (scope.ScopeType) {
                                    case "graph":
                                        var tab = context.ensurePane({ Name: row.label });
                                        context.selectChild(tab);
                                        break;
                                    default:
                                        var descendents = scope.ScopeName.split(":");
                                        for (var i = 0; i < descendents.length; ++i) {
                                            var scopeName = descendents[i];
                                            if (scopeName.indexOf("graph") === 0) {
                                                var tab = context.ensurePane({ Name: scopeName }, { SubGraphId: row.label });
                                                context.selectChild(tab);
                                                break;
                                            }
                                        }
                                }
                            }
                        }, true)
                        .on("setData", function (_) {
                            context._timelineData = _;
                            context.updateGrid();
                        })
                        ;

                    var monitorCount = 4;
                    this.wu.monitor(function () {
                        if (context.wu.isComplete() || ++monitorCount % 5 === 0) {
                            context.refreshGrid();
                        }
                    });
                }

                this._refreshActionState();
            },

            createGridColumns: function () {
                var context = this;
                return {
                    col1: selector({
                        width: 27,
                        selectorType: 'checkbox'
                    }),
                    Name: {
                        label: this.i18n.Name, width: 99, sortable: true,
                        formatter: function (Name, row) {
                            return context.getStateImageHTML(row) + "&nbsp;<a href='#' class='dgrid-row-url'>" + Name + "</a>";
                        }
                    },
                    Label: { label: this.i18n.Label, sortable: true },
                    WhenStarted: {
                        label: this.i18n.Started, width: 90,
                        formatter: function (whenStarted) {
                            if (whenStarted) {
                                var dateTime = new Date(whenStarted);
                                return dateTime.toLocaleTimeString();
                            }
                            return "";
                        }
                    },
                    WhenFinished: {
                        label: this.i18n.Finished, width: 90,
                        formatter: function (whenFinished, idx) {
                            if (whenFinished) {
                                var dateTime = new Date(whenFinished);
                                return dateTime.toLocaleTimeString();
                            }
                            return "";
                        }
                    },
                    Time: {
                        label: this.i18n.Duration, width: 90, sortable: true,
                        formatter: function (totalSeconds, idx) {
                            var hours = Math.floor(totalSeconds / 3600);
                            totalSeconds %= 3600;
                            var minutes = Math.floor(totalSeconds / 60);
                            var seconds = (totalSeconds % 60).toFixed(2);
                            return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                        }
                    },
                    Type: { label: this.i18n.Type, width: 72, sortable: true }
                };
            },

            localParams: function (_id, row, params) {
                return {
                    Wuid: this.wu.Wuid,
                    GraphName: row.Name,
                    SubGraphId: (params && params.SubGraphId) ? params.SubGraphId : null,
                    SafeMode: (params && params.safeMode) ? true : false
                };
            },

            refreshGrid: function (args) {
                this._timelineData = null;
                this._graphsData = null;

                this.timeline.refresh();

                var context = this;
                this.wu.getInfo({
                    onGetTimers: function (timers) {
                        //  Required to calculate Graphs Total Time  ---
                    },
                    onGetGraphs: function (graphs) {
                        context._graphsData = graphs;
                        context.updateGrid();
                    }
                });
            },

            updateGrid: function () {
                if (this._timelineData && this._graphsData) {
                    var context = this;
                    this.store.setData(this._graphsData.map(function (row) {
                        var timelineData = context._timelineData[row.Name];
                        if (timelineData) {
                            row.WhenStarted = timelineData.started;
                            row.WhenFinished = timelineData.finished;
                        }
                        return row;
                    }));
                    this.grid.refresh();
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/GraphsWidget.js":
/*!**********************************!*\
  !*** ./eclwatch/GraphsWidget.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),


    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, i18n, nlsHPCC, arrayUtil,
    Button, 
    GridDetailsWidget, DelayLoadWidget, ESPUtil, Utility) {
        return declare("GraphsWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,

            gridTitle: nlsHPCC.title_Graphs,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.alphanumSort["Name"] = true;
            },

            getStateImageName: function (row) {
                if (row.Complete) {
                    return "workunit_completed.png";
                } else if (row.Running) {
                    return "workunit_running.png";
                } else if (row.Failed) {
                    return "workunit_failed.png";
                }
                return "workunit.png";
            },

            getStateImageHTML: function (row) {
                return Utility.getImageHTML(this.getStateImageName(row));
            },

            createGridColumns: function () {
                //  Abstract  ---
            },

            createGrid: function (domID) {
                var context = this;
                this.openLegacyMode = new Button({
                    label: this.i18n.OpenLegacyMode,
                    onClick: function (event) {
                        context._onOpen(event, {
                            legacyMode: true
                        });
                    }
                }).placeAt(this.widget.Open.domNode, "after");
                var retVal = new declare([ESPUtil.Grid(false, true)])({
                    store: this.store,
                    columns: this.createGridColumns()
                }, domID);

                retVal.on(".dgrid-row:click", function (evt) {
                    context.syncSelectionFrom(context.grid);
                });

                retVal.on(".dgrid-row-url:click", function (evt) {
                    if (context._onRowDblClick) {
                        var row = retVal.row(evt).data;
                        context._onRowDblClick(row);
                    }
                });
                return retVal;
            },

            getDetailID: function (row, params) {
                var retVal = "Detail" + row[this.idProperty];
                if (params && params.SubGraphId) {
                    retVal += params.SubGraphId;
                }
                if (params && params.legacyMode) {
                    retVal += "Legacy";
                }
                return retVal;
            },

            openGraph: function(graphName, subgraphID) {
                this._onRowDblClick({ Name: graphName }, { SubGraphId: subgraphID });
            },

            createDetail: function (_id, row, params) {
                params = params || {};
                var localParams = this.localParams(_id, row, params);
                var title = row.Name;
                var delayWidget = "GraphTree7Widget";
                var delayProps = {
                    _hostPage: this,
                    forceJS: true
                };
                if (params && params.SubGraphId) {
                    title = params.SubGraphId + " - " + title;
                }
                if (params && params.legacyMode) {
                    delayWidget = "GraphTreeWidget";
                    title += " (L)";
                    delayProps = {};
                }
                return new DelayLoadWidget({
                    id: _id,
                    title: title,
                    closable: true,
                    delayWidget: delayWidget,
                    delayProps: delayProps,
                    hpcc: {
                        type: "graph",
                        params: localParams
                    }
                });
            },

            refreshGrid: function (args) {
                //  Abstract  ---
            },

            refreshActionState: function (selection) {
                this.inherited(arguments);

                this.openLegacyMode.set("disabled", !selection.length);
            },

            syncSelectionFrom: function (sourceControl) {
                var graphItems = [];
                var timingItems = [];

                //  Get Selected Items  ---
                if (sourceControl === this.grid) {
                    arrayUtil.forEach(sourceControl.getSelected(), function (item, idx) {
                        timingItems.push(item);
                    });
                }

                //  Set Selected Items  ---
                if (sourceControl !== this.grid) {
                    this.grid.setSelected(graphItems);
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/MenuSeparator.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/MenuSeparator.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! ./_Contained */ "./node_modules/dijit/_Contained.js"),
	__webpack_require__(/*! dojo/text!./templates/MenuSeparator.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _WidgetBase, _TemplatedMixin, _Contained, template){

	// module:
	//		dijit/MenuSeparator

	return declare("dijit.MenuSeparator", [_WidgetBase, _TemplatedMixin, _Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/PopupMenuItem.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/PopupMenuItem.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"), // domStyle.set
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! ./popup */ "./node_modules/dijit/popup.js"),
	__webpack_require__(/*! ./registry */ "./node_modules/dijit/registry.js"),	// registry.byNode
	__webpack_require__(/*! ./MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domStyle, lang, query, pm, registry, MenuItem){

	// module:
	//		dijit/PopupMenuItem

	return declare("dijit.PopupMenuItem", MenuItem, {
		// summary:
		//		An item in a Menu that spawn a drop down (usually a drop down menu)

		baseClass: "dijitMenuItem dijitPopupMenuItem",

		_fillContent: function(){
			// summary:
			//		When Menu is declared in markup, this code gets the menu label and
			//		the popup widget from the srcNodeRef.
			// description:
			//		srcNodeRef.innerHTML contains both the menu item text and a popup widget
			//		The first part holds the menu item text and the second part is the popup
			// example:
			// |	<div data-dojo-type="dijit/PopupMenuItem">
			// |		<span>pick me</span>
			// |		<popup> ... </popup>
			// |	</div>
			// tags:
			//		protected

			if(this.srcNodeRef){
				var nodes = query("*", this.srcNodeRef);
				this.inherited(arguments, [nodes[0]]);

				// save pointer to srcNode so we can grab the drop down widget after it's instantiated
				this.dropDownContainer = this.srcNodeRef;
			}
		},

		_openPopup: function(/*Object*/ params, /*Boolean*/ focus){
			// summary:
			//		Open the popup to the side of/underneath this MenuItem, and optionally focus first item
			// tags:
			//		protected

			var popup = this.popup;

			pm.open(lang.delegate(params, {
				popup: this.popup,
				around: this.domNode
			}));

			if(focus && popup.focus){
				popup.focus();
			}
		},

		_closePopup: function(){
			pm.close(this.popup);
			this.popup.parentMenu = null;
		},

		startup: function(){
			if(this._started){ return; }
			this.inherited(arguments);

			// We didn't copy the dropdown widget from the this.srcNodeRef, so it's in no-man's
			// land now.  Move it to <body>.
			if(!this.popup){
				var node = query("[widgetId]", this.dropDownContainer)[0];
				this.popup = registry.byNode(node);
			}
			this.ownerDocumentBody.appendChild(this.popup.domNode);
			this.popup.domNode.setAttribute("aria-labelledby", this.containerNode.id);
			this.popup.startup();

			this.popup.domNode.style.display="none";
			if(this.arrowWrapper){
				domStyle.set(this.arrowWrapper, "visibility", "");
			}
			this.focusNode.setAttribute("aria-haspopup", "true");
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			if(this.popup){
				// Destroy the popup, unless it's already been destroyed.  This can happen because
				// the popup is a direct child of <body> even though it's logically my child.
				if(!this.popup._destroyed){
					this.popup.destroyRecursive(preserveDom);
				}
				delete this.popup;
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuSeparator.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"

/***/ })

}]);