(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FileHistoryWidget":"./eclwatch/FileHistoryWidget.js",
	"src/ESPBase":"./lib/src/ESPBase.js",
	"src/WsDfu":"./lib/src/WsDfu.js",
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[98],{

/***/ "./eclwatch/FileHistoryWidget.js":
/*!***************************************!*\
  !*** ./eclwatch/FileHistoryWidget.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),

    __webpack_require__(/*! hpcc/GridDetailsWidget */ "./eclwatch/GridDetailsWidget.js"),
    __webpack_require__(/*! src/WsDfu */ "./lib/src/WsDfu.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil,
    registry, Button, ToolbarSeparator,
    GridDetailsWidget, WsDfu, ESPUtil) {
        return declare("FileHistoryWidget", [GridDetailsWidget], {
            i18n: nlsHPCC,
            gridTitle: nlsHPCC.History,
            idProperty: "Name",

            init: function (params) {
                if (this.inherited(arguments))
                    return;
                this._refreshActionState();
                this.refreshGrid();
                this.initTab();
            },

            _onRefresh: function (event) {
                this.refreshGrid();
            },

            createGrid: function (domID) {
                var context = this;

                this.openButton = registry.byId(this.id + "Open");

                this.eraseHistory = new Button({
                    label: context.i18n.EraseHistory,
                    onClick: function () { context._onErase(); }
                }).placeAt(this.openButton, "after");

                dojo.destroy(this.id + "Open");

                var retVal = new declare([ESPUtil.Grid(true, true)])({
                    store: this.store,
                    columns: {
                        Name: { label: this.i18n.Name, width: 70, sortable: false },
                        IP: { label: this.i18n.IP, width: 30, sortable: false },
                        Operation: { label: this.i18n.Operation, width: 30, sortable: false },
                        Owner: { label: this.i18n.Owner, width: 30, sortable: false },
                        Path: { label: this.i18n.Path, width: 70, sortable: false },
                        Timestamp: { label: this.i18n.TimeStamp, width: 30, sortable: false },
                        Workunit: { label: this.i18n.Workunit, width: 30, sortable: false }
                    }
                }, domID);

                return retVal;
            },

            _onErase: function (event) {
                var context = this;
                if (confirm(this.i18n.EraseHistoryQ + "\n" + this.params.Name + "?")) {
                    WsDfu.EraseHistory({
                        request: {
                            Name: context.params.Name
                        }
                    }).then(function (response) {
                        if (response) {
                            context.refreshGrid();
                        }
                    });
                }
            },

            refreshGrid: function () {
                var context = this;

                WsDfu.ListHistory({
                    request: {
                        Name: context.params.Name
                    }
                }).then(function (response) {
                    var results = [];
                    var newRows = [];
                    if (lang.exists("ListHistoryResponse.History.Origin", response)) {
                        results = response.ListHistoryResponse.History.Origin;
                    }

                    if (results.length) {
                        arrayUtil.forEach(results, function (row, idx) {
                            newRows.push({
                                Name: row.Name,
                                IP: row.IP,
                                Operation: row.Operation,
                                Owner: row.Owner,
                                Path: row.Path,
                                Timestamp: row.Timestamp,
                                Workunit: row.Workunit
                            });
                        });
                    }

                    context.store.setData(newRows);
                    context.grid.set("query", {});
                });
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

/***/ "./node_modules/dijit/Toolbar.js":
/*!***************************************!*\
  !*** ./node_modules/dijit/Toolbar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__.dj.c(module.i),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys.LEFT_ARROW keys.RIGHT_ARROW
	__webpack_require__(/*! dojo/ready */ "./node_modules/dojo/ready.js"),
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_KeyNavContainer */ "./node_modules/dijit/_KeyNavContainer.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require, declare, has, keys, ready, _Widget, _KeyNavContainer, _TemplatedMixin){

	// module:
	//		dijit/Toolbar


	// Back compat w/1.6, remove for 2.0
	if(has("dijit-legacy-requires")){
		ready(0, function(){
			var requires = ["dijit/ToolbarSeparator"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return declare("dijit.Toolbar", [_Widget, _TemplatedMixin, _KeyNavContainer], {
		// summary:
		//		A Toolbar widget, used to hold things like `dijit/Editor` buttons

		templateString:
			'<div class="dijit" role="toolbar" tabIndex="${tabIndex}" data-dojo-attach-point="containerNode">' +
			'</div>',

		baseClass: "dijitToolbar",

		_onLeftArrow: function(){
			this.focusPrev();
		},

		_onRightArrow: function(){
			this.focusNext();
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/ToolbarSeparator.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/ToolbarSeparator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _Widget, _TemplatedMixin){

	// module:
	//		dijit/ToolbarSeparator


	return declare("dijit.ToolbarSeparator", [_Widget, _TemplatedMixin], {
		// summary:
		//		A spacer between two `dijit.Toolbar` items

		templateString: '<div class="dijitToolbarSeparator dijitInline" role="presentation"></div>',

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
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