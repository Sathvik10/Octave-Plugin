(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"src/WsTopology":"./lib/src/WsTopology.js",
	"dijit/Fieldset":"./node_modules/dijit/Fieldset.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/TooltipDialog":"./node_modules/dijit/TooltipDialog.js",
	"dijit/form/CheckBox":"./node_modules/dijit/form/CheckBox.js",
	"dijit/form/ComboBox":"./node_modules/dijit/form/ComboBox.js",
	"dijit/form/DropDownButton":"./node_modules/dijit/form/DropDownButton.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dijit/form/_CheckBoxMixin":"./node_modules/dijit/form/_CheckBoxMixin.js",
	// "/home/sathvik/hpcc/HPCC-Platform/build/esp/src/tmp/node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js" = "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js"
	"dojo/text!dijit/form/templates/CheckBox.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/CheckBox.html",
	"dojo/text!dijit/form/templates/DropDownButton.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html",
	"dojo/text!dijit/templates/Fieldset.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html",
	"dojo/text!dijit/templates/TooltipDialog.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[123],{

/***/ "./lib/src/WsTopology.js":
/*!*******************************!*\
  !*** ./lib/src/WsTopology.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"), __webpack_require__(/*! dojo/store/Memory */ "./node_modules/dojo/store/Memory.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"), __webpack_require__(/*! dojo/Evented */ "./node_modules/dojo/Evented.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, lang, arrayUtil, Deferred, Memory, Observable, QueryResults, Evented, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var TpLogFileStore = declare([Memory, Evented], {
        constructor: function () {
            this.idProperty = "__hpcc_id";
        },
        query: function (query, options) {
            var deferredResults = new Deferred();
            deferredResults.total = new Deferred();
            function nextItem(itemParts) {
                var part = "";
                while (itemParts.length && part.trim() === "") {
                    part = itemParts[0];
                    itemParts.shift();
                }
                return part;
            }
            if (!query.Name) {
                deferredResults.resolve([]);
                deferredResults.total.resolve(0);
            }
            else {
                TpLogFile({
                    request: lang.mixin({}, query, {
                        PageNumber: options.start / options.count
                    })
                }).then(lang.hitch(this, function (response) {
                    var data = [];
                    if (lang.exists("TpLogFileResponse.LogData", response)) {
                        this.lastPage = response.TpLogFileResponse.LogData;
                        this.emit("pageLoaded", this.lastPage);
                        arrayUtil.forEach(response.TpLogFileResponse.LogData.split("\n"), function (item, idx) {
                            if (options.start === 0 || idx > 0) {
                                //  Throw away first line as it will probably only be a partial line  ---
                                var itemParts = item.split(" ");
                                var lineNo, date, time, pid, tid, details;
                                if (itemParts.length)
                                    lineNo = nextItem(itemParts);
                                if (itemParts.length)
                                    date = nextItem(itemParts);
                                if (itemParts.length)
                                    time = nextItem(itemParts);
                                if (itemParts.length)
                                    pid = nextItem(itemParts);
                                if (itemParts.length)
                                    tid = nextItem(itemParts);
                                if (itemParts.length)
                                    details = itemParts.join(" ");
                                data.push({
                                    __hpcc_id: response.TpLogFileResponse.PageNumber + "_" + idx,
                                    lineNo: lineNo,
                                    date: date,
                                    time: time,
                                    pid: pid,
                                    tid: tid,
                                    details: details
                                });
                            }
                        }, this);
                    }
                    this.setData(data);
                    if (lang.exists("TpLogFileResponse.TotalPages", response)) {
                        deferredResults.total.resolve(response.TpLogFileResponse.TotalPages * options.count);
                    }
                    else {
                        deferredResults.total.resolve(data.length);
                    }
                    return deferredResults.resolve(this.data);
                }));
            }
            return QueryResults(deferredResults);
        }
    });
    function TpServiceQuery(params) {
        lang.mixin(params.request, {
            Type: "ALLSERVICES"
        });
        return ESPRequest.send("WsTopology", "TpServiceQuery", params);
    }
    exports.TpServiceQuery = TpServiceQuery;
    function TpClusterQuery(params) {
        lang.mixin(params.request, {
            Type: "ROOT"
        });
        return ESPRequest.send("WsTopology", "TpClusterQuery", params);
    }
    exports.TpClusterQuery = TpClusterQuery;
    function GetESPServiceBaseURL(type) {
        var deferred = new Deferred();
        this.TpServiceQuery({}).then(function (response) {
            var retVal = ESPRequest.getURL({
                port: window.location.protocol === "https:" ? 18002 : 8002,
                pathname: ""
            });
            if (lang.exists("TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer", response)) {
                arrayUtil.forEach(response.TpServiceQueryResponse.ServiceList.TpEspServers.TpEspServer, function (item, idx) {
                    if (lang.exists("TpBindings.TpBinding", item)) {
                        arrayUtil.forEach(item.TpBindings.TpBinding, function (binding, idx) {
                            if (binding.Service === type && binding.Protocol + ":" === location.protocol) {
                                retVal = ESPRequest.getURL({
                                    port: binding.Port,
                                    pathname: ""
                                });
                                return true;
                            }
                        });
                    }
                    if (retVal !== "")
                        return true;
                });
            }
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }
    exports.GetESPServiceBaseURL = GetESPServiceBaseURL;
    exports.WsEclURL = "";
    function GetWsEclURL(type) {
        var deferred = new Deferred();
        if (this.WsEclURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclURL = response + "/WsEcl/";
                deferred.resolve(context.WsEclURL + type + "/query/");
            });
        }
        else {
            deferred.resolve(this.WsEclURL + type + "/query/");
        }
        return deferred.promise;
    }
    exports.GetWsEclURL = GetWsEclURL;
    exports.WsEclIFrameURL = "";
    function GetWsEclIFrameURL(type) {
        var deferred = new Deferred();
        if (this.WsEclIFrameURL === "") {
            var context = this;
            this.GetESPServiceBaseURL("ws_ecl").then(function (response) {
                context.WsEclIFrameURL = response + dojoConfig.urlInfo.basePath + "/stub.htm?Widget=IFrameWidget&src=" + encodeURIComponent("/WsEcl/");
                deferred.resolve(context.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
            });
        }
        else {
            deferred.resolve(this.WsEclIFrameURL + encodeURIComponent(type + "/query/"));
        }
        return deferred.promise;
    }
    exports.GetWsEclIFrameURL = GetWsEclIFrameURL;
    function TpTargetClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpTargetClusterQuery", params);
    }
    exports.TpTargetClusterQuery = TpTargetClusterQuery;
    function TpGroupQuery(params) {
        return ESPRequest.send("WsTopology", "TpGroupQuery", params);
    }
    exports.TpGroupQuery = TpGroupQuery;
    function TpLogicalClusterQuery(params) {
        return ESPRequest.send("WsTopology", "TpLogicalClusterQuery", params).then(function (response) {
            var best = null;
            var hthor = null;
            if (lang.exists("TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster", response)) {
                arrayUtil.forEach(response.TpLogicalClusterQueryResponse.TpLogicalClusters.TpLogicalCluster, function (item, idx) {
                    if (!best) {
                        best = item;
                    }
                    if (item.Name.indexOf("hthor") !== -1) {
                        hthor = item;
                        return false;
                    }
                    else if (item.Name.indexOf("thor") !== -1) {
                        best = item;
                    }
                });
            }
            if (hthor) {
                response.TpLogicalClusterQueryResponse["default"] = hthor;
            }
            else if (best) {
                response.TpLogicalClusterQueryResponse["default"] = best;
            }
            else {
                response.TpLogicalClusterQueryResponse["default"] = null;
            }
            return response;
        });
    }
    exports.TpLogicalClusterQuery = TpLogicalClusterQuery;
    function TpClusterInfo(params) {
        return ESPRequest.send("WsTopology", "TpClusterInfo", params);
    }
    exports.TpClusterInfo = TpClusterInfo;
    function TpThorStatus(params) {
        return ESPRequest.send("WsTopology", "TpThorStatus", params);
    }
    exports.TpThorStatus = TpThorStatus;
    function TpGetServicePlugins(params) {
        return ESPRequest.send("WsTopology", "TpGetServicePlugins", params);
    }
    exports.TpGetServicePlugins = TpGetServicePlugins;
    function TpDropZoneQuery(params) {
        return ESPRequest.send("WsTopology", "TpDropZoneQuery", params);
    }
    exports.TpDropZoneQuery = TpDropZoneQuery;
    function TpGetComponentFile(params) {
        params.handleAs = "text";
        return ESPRequest.send("WsTopology", "TpGetComponentFile", params);
    }
    exports.TpGetComponentFile = TpGetComponentFile;
    function TpLogFile(params) {
        return ESPRequest.send("WsTopology", "TpLogFile", params);
    }
    exports.TpLogFile = TpLogFile;
    function CreateTpLogFileStore() {
        var store = new TpLogFileStore();
        return Observable(store);
    }
    exports.CreateTpLogFileStore = CreateTpLogFileStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=WsTopology.js.map

/***/ }),

/***/ "./node_modules/dijit/Fieldset.js":
/*!****************************************!*\
  !*** ./node_modules/dijit/Fieldset.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
	__webpack_require__(/*! dojo/query!css2 */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./"),
	__webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
	__webpack_require__(/*! dojo/text!./templates/Fieldset.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html"),
	__webpack_require__(/*! ./a11yclick */ "./node_modules/dijit/a11yclick.js")	// template uses ondijitclick
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, query, TitlePane, template){


	return declare("dijit.Fieldset", TitlePane, {
		// summary:
		//		An accessible fieldset that can be expanded or collapsed via
		//		its legend.  Fieldset extends `dijit.TitlePane`.

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: 'dijitFieldset',

		// title: String
		//		Content of the legend tag. Overrides <legend> tag if not empty.
		title: '',

		// open: Boolean
		//		Whether fieldset is opened or closed.
		open: true,

		templateString: template,

		postCreate: function() {
			if(!this.title){
				var legends = query('legend', this.containerNode);
				if(legends.length) { // oops, no legend?
					this.set('title', legends[0].innerHTML);
					legends[0].parentNode.removeChild(legends[0]);
				}
			}

			this.inherited(arguments);
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

/***/ "./node_modules/dijit/TooltipDialog.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/TooltipDialog.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.replace
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! ./focus */ "./node_modules/dijit/focus.js"),
	__webpack_require__(/*! ./layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
	__webpack_require__(/*! ./_DialogMixin */ "./node_modules/dijit/_DialogMixin.js"),
	__webpack_require__(/*! ./form/_FormMixin */ "./node_modules/dijit/form/_FormMixin.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! dojo/text!./templates/TooltipDialog.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html"),
	__webpack_require__(/*! ./main */ "./node_modules/dijit/main.js")        // exports methods to dijit global
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, has, keys, lang, on, focus, ContentPane, _DialogMixin, _FormMixin, _TemplatedMixin, template, dijit){

	// module:
	//		dijit/TooltipDialog


	var TooltipDialog = declare("dijit.TooltipDialog",
		[ContentPane, _TemplatedMixin, _FormMixin, _DialogMixin], {
			// summary:
			//		Pops up a dialog that appears like a Tooltip

			// title: String
			//		Description of tooltip dialog (required for a11y)
			title: "",

			// doLayout: [protected] Boolean
			//		Don't change this parameter from the default value.
			//		This ContentPane parameter doesn't make sense for TooltipDialog, since TooltipDialog
			//		is never a child of a layout container, nor can you specify the size of
			//		TooltipDialog in order to control the size of an inner widget.
			doLayout: false,

			// autofocus: Boolean
			//		A Toggle to modify the default focus behavior of a Dialog, which
			//		is to focus on the first dialog element after opening the dialog.
			//		False will disable autofocusing.  Default: true.
			autofocus: true,

			// baseClass: [protected] String
			//		The root className to use for the various states of this widget
			baseClass: "dijitTooltipDialog",

			// _firstFocusItem: [private readonly] DomNode
			//		The pointer to the first focusable node in the dialog.
			//		Set by `dijit/_DialogMixin._getFocusItems()`.
			_firstFocusItem: null,

			// _lastFocusItem: [private readonly] DomNode
			//		The pointer to which node has focus prior to our dialog.
			//		Set by `dijit/_DialogMixin._getFocusItems()`.
			_lastFocusItem: null,

			templateString: template,

			_setTitleAttr: "containerNode",

			postCreate: function(){
				this.inherited(arguments);
				this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKey")));
			},

			orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ tooltipCorner){
				// summary:
				//		Configure widget to be displayed in given position relative to the button.
				//		This is called from the dijit.popup code, and should not be called
				//		directly.
				// tags:
				//		protected

				// Note: intentionally not using dijitTooltip class since that sets position:absolute, which
				// confuses dijit/popup trying to get the size of the tooltip.
				var newC = {
					// Real around node
					"MR-ML": "dijitTooltipRight",
					"ML-MR": "dijitTooltipLeft",
					"TM-BM": "dijitTooltipAbove",
					"BM-TM": "dijitTooltipBelow",
					"BL-TL": "dijitTooltipBelow dijitTooltipABLeft",
					"TL-BL": "dijitTooltipAbove dijitTooltipABLeft",
					"BR-TR": "dijitTooltipBelow dijitTooltipABRight",
					"TR-BR": "dijitTooltipAbove dijitTooltipABRight",
					"BR-BL": "dijitTooltipRight",
					"BL-BR": "dijitTooltipLeft",

					// Positioning "around" a point, ex: mouse position
					"BR-TL": "dijitTooltipBelow dijitTooltipABLeft",
					"BL-TR": "dijitTooltipBelow dijitTooltipABRight",
					"TL-BR": "dijitTooltipAbove dijitTooltipABRight",
					"TR-BL": "dijitTooltipAbove dijitTooltipABLeft"
				}[aroundCorner + "-" + tooltipCorner];

				domClass.replace(this.domNode, newC, this._currentOrientClass || "");
				this._currentOrientClass = newC;

				// Tooltip.orient() has code to reposition connector for when Tooltip is before/after anchor.
				// Not putting here to avoid code bloat, and since TooltipDialogs are generally above/below.
				// Should combine code from Tooltip and TooltipDialog.
			},

			focus: function(){
				// summary:
				//		Focus on first field
				this._getFocusItems();
				focus.focus(this._firstFocusItem);
			},

			onOpen: function(/*Object*/ pos){
				// summary:
				//		Called when dialog is displayed.
				//		This is called from the dijit.popup code, and should not be called directly.
				// tags:
				//		protected

				this.orient(this.domNode, pos.aroundCorner, pos.corner);

				// Position the tooltip connector for middle alignment.
				// This could not have been done in orient() since the tooltip wasn't positioned at that time.
				var aroundNodeCoords = pos.aroundNodePos;
				if(pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M'){
					this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
					this.connectorNode.style.left = "";
				}else if(pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M'){
					this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
				}

				this._onShow(); // lazy load trigger  (TODO: shouldn't we load before positioning?)
			},

			onClose: function(){
				// summary:
				//		Called when dialog is hidden.
				//		This is called from the dijit.popup code, and should not be called directly.
				// tags:
				//		protected
				this.onHide();
			},

			_onKey: function(/*Event*/ evt){
				// summary:
				//		Handler for keydown events
				// description:
				//		Keep keyboard focus in dialog; close dialog on escape key
				// tags:
				//		private

				if(evt.keyCode == keys.ESCAPE){
					// Use defer to avoid crash on IE, see #10396.  Not sure if this is still needed or not.
					// If this if() wasn't here, presumably dijit/popup would catch the ESCAPE key and close the popup.
					this.defer("onCancel");
					evt.stopPropagation();
					evt.preventDefault();
				}else if(evt.keyCode == keys.TAB){
					var node = evt.target;
					this._getFocusItems();
					if(this._firstFocusItem == this._lastFocusItem){
						evt.stopPropagation();
						evt.preventDefault();
					}else if(node == this._firstFocusItem && evt.shiftKey){
						focus.focus(this._lastFocusItem); // send focus to last item in dialog
						evt.stopPropagation();
						evt.preventDefault();
					}else if(node == this._lastFocusItem && !evt.shiftKey){
						focus.focus(this._firstFocusItem); // send focus to first item in dialog
						evt.stopPropagation();
						evt.preventDefault();
					}else{
						// we want the browser's default tab handling to move focus
						// but we don't want the tab to propagate upwards
						evt.stopPropagation();
					}
				}
			}
		});

	if(has("dojo-bidi")){
		TooltipDialog.extend({
			_setTitleAttr: function(/*String*/ title){
				this.containerNode.title = (this.textDir && this.enforceTextDirWithUcc) ? this.enforceTextDirWithUcc(null, title) : title;
				this._set("title", title);
			},

			_setTextDirAttr: function(/*String*/ textDir){
				if(!this._created || this.textDir != textDir){
					this._set("textDir", textDir);
					if(this.textDir && this.title){
						this.containerNode.title = this.enforceTextDirWithUcc(null, this.title);
					}
				}
			}
		});
	}

	return TooltipDialog;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/CheckBox.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/form/CheckBox.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__.dj.c(module.i),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"), // domAttr.set
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),		// has("dijit-legacy-requires")
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! dojo/ready */ "./node_modules/dojo/ready.js"),
	__webpack_require__(/*! ./ToggleButton */ "./node_modules/dijit/form/ToggleButton.js"),
	__webpack_require__(/*! ./_CheckBoxMixin */ "./node_modules/dijit/form/_CheckBoxMixin.js"),
	__webpack_require__(/*! dojo/text!./templates/CheckBox.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/CheckBox.html"),
	__webpack_require__(/*! dojo/NodeList-dom */ "./node_modules/dojo/NodeList-dom.js"), // NodeList.addClass/removeClass
	__webpack_require__(/*! ../a11yclick */ "./node_modules/dijit/a11yclick.js")	// template uses ondijitclick
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(require, declare, domAttr, has, query, ready, ToggleButton, _CheckBoxMixin, template){

	// module:
	//		dijit/form/CheckBox

	// Back compat w/1.6, remove for 2.0
	if(has("dijit-legacy-requires")){
		ready(0, function(){
			var requires = ["dijit/form/RadioButton"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	return declare("dijit.form.CheckBox", [ToggleButton, _CheckBoxMixin], {
		// summary:
		//		Same as an HTML checkbox, but with fancy styling.
		//
		// description:
		//		User interacts with real html inputs.
		//		On onclick (which occurs by mouse click, space-bar, or
		//		using the arrow keys to switch the selected radio button),
		//		we update the state of the checkbox/radio.
		//
		//		There are two modes:
		//
		//		1. High contrast mode
		//		2. Normal mode
		//
		//		In case 1, the regular html inputs are shown and used by the user.
		//		In case 2, the regular html inputs are invisible but still used by
		//		the user. They are turned quasi-invisible and overlay the background-image.

		templateString: template,

		baseClass: "dijitCheckBox",

		_setValueAttr: function(/*String|Boolean*/ newValue, /*Boolean*/ priorityChange){
			// summary:
			//		Handler for value= attribute to constructor, and also calls to
			//		set('value', val).
			// description:
			//		During initialization, just saves as attribute to the `<input type=checkbox>`.
			//
			//		After initialization,
			//		when passed a boolean, controls whether or not the CheckBox is checked.
			//		If passed a string, changes the value attribute of the CheckBox (the one
			//		specified as "value" when the CheckBox was constructed
			//		(ex: `<input data-dojo-type="dijit/CheckBox" value="chicken">`).
			//
			//		`widget.set('value', string)` will check the checkbox and change the value to the
			//		specified string.
			//
			//		`widget.set('value', boolean)` will change the checked state.

			if(typeof newValue == "string"){
				this.inherited(arguments);
				newValue = true;
			}
			if(this._created){
				this.set('checked', newValue, priorityChange);
			}
		},
		_getValueAttr: function(){
			// summary:
			//		Hook so get('value') works.
			// description:
			//		If the CheckBox is checked, returns the value attribute.
			//		Otherwise returns false.
			return this.checked && this._get("value");
		},

		// Override behavior from Button, since we don't have an iconNode or valueNode
		_setIconClassAttr: null,
		_setNameAttr: "focusNode",

		postMixInProperties: function(){
			this.inherited(arguments);

			// Need to set initial checked state via node.setAttribute so that form submit works
			// and IE8 radio button tab order is preserved.
			// domAttr.set(node, "checked", bool) doesn't work on IE until node has been attached
			// to <body>, see #8666
			this.checkedAttrSetting = "";
		},

		 _fillContent: function(){
			// Override Button::_fillContent() since it doesn't make sense for CheckBox,
			// since CheckBox doesn't even have a container
		},

		_onFocus: function(){
			if(this.id){
				query("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
			}
			this.inherited(arguments);
		},

		_onBlur: function(){
			if(this.id){
				query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/ComboBox.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/form/ComboBox.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! ./ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
	__webpack_require__(/*! ./ComboBoxMixin */ "./node_modules/dijit/form/ComboBoxMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, ValidationTextBox, ComboBoxMixin){

	// module:
	//		dijit/form/ComboBox

	return declare("dijit.form.ComboBox", [ValidationTextBox, ComboBoxMixin], {
		// summary:
		//		Auto-completing text box
		//
		// description:
		//		The drop down box's values are populated from an class called
		//		a data provider, which returns a list of values based on the characters
		//		that the user has typed into the input box.
		//		If OPTION tags are used as the data provider via markup,
		//		then the OPTION tag's child text node is used as the widget value
		//		when selected.  The OPTION tag's value attribute is ignored.
		//		To set the default value when using OPTION tags, specify the selected
		//		attribute on 1 of the child OPTION tags.
		//
		//		Some of the options to the ComboBox are actually arguments to the data
		//		provider.
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/DropDownButton.js":
/*!***************************************************!*\
  !*** ./node_modules/dijit/form/DropDownButton.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // hitch
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! ../registry */ "./node_modules/dijit/registry.js"), // registry.byNode
	__webpack_require__(/*! ../popup */ "./node_modules/dijit/popup.js"), // dijit.popup2.hide
	__webpack_require__(/*! ./Button */ "./node_modules/dijit/form/Button.js"),
	__webpack_require__(/*! ../_Container */ "./node_modules/dijit/_Container.js"),
	__webpack_require__(/*! ../_HasDropDown */ "./node_modules/dijit/_HasDropDown.js"),
	__webpack_require__(/*! dojo/text!./templates/DropDownButton.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html"),
	__webpack_require__(/*! ../a11yclick */ "./node_modules/dijit/a11yclick.js")	// template uses ondijitclick
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, kernel, lang, query, registry, popup, Button, _Container, _HasDropDown, template){

	// module:
	//		dijit/form/DropDownButton

	return declare("dijit.form.DropDownButton", [Button, _Container, _HasDropDown], {
		// summary:
		//		A button with a drop down
		//
		// example:
		// |	<button data-dojo-type="dijit/form/DropDownButton">
		// |		Hello world
		// |		<div data-dojo-type="dijit/Menu">...</div>
		// |	</button>
		//
		// example:
		// |	var button1 = new DropDownButton({ label: "hi", dropDown: new dijit.Menu(...) });
		// |	win.body().appendChild(button1);
		//

		baseClass: "dijitDropDownButton",

		templateString: template,

		_fillContent: function(){
			// Overrides _TemplatedMixin#_fillContent().
			// My inner HTML possibly contains both the button label and/or a drop down widget, like
			// <DropDownButton>  <span>push me</span>  <Menu> ... </Menu> </DropDownButton>

			var source = this.srcNodeRef;
			var dest = this.containerNode;
			if(source && dest){
				while(source.hasChildNodes()){
					var child = source.firstChild;
					if(child.hasAttribute && (child.hasAttribute("data-dojo-type") || child.hasAttribute("dojoType") ||
							child.hasAttribute("data-" + kernel._scopeName + "-type") ||
							child.hasAttribute(kernel._scopeName + "Type"))){
						// The parser hasn't gotten to this node yet, so save it in a wrapper <div>
						// and then grab the instantiated widget in startup().
						this.dropDownContainer = this.ownerDocument.createElement("div");
						this.dropDownContainer.appendChild(child);
					}else{
						dest.appendChild(child);
					}
				}
			}
		},

		startup: function(){
			if(this._started){
				return;
			}

			// the child widget from srcNodeRef is the dropdown widget.  Insert it in the page DOM,
			// make it invisible, and store a reference to pass to the popup code.
			if(!this.dropDown && this.dropDownContainer){
				this.dropDown = registry.byNode(this.dropDownContainer.firstChild);
				delete this.dropDownContainer;
			}
			if(this.dropDown){
				popup.hide(this.dropDown);
			}

			this.inherited(arguments);
		},

		isLoaded: function(){
			// Returns whether or not we are loaded - if our dropdown has an href,
			// then we want to check that.
			var dropDown = this.dropDown;
			return (!!dropDown && (!dropDown.href || dropDown.isLoaded));
		},

		loadDropDown: function(/*Function*/ callback){
			// Default implementation assumes that drop down already exists,
			// but hasn't loaded it's data (ex: ContentPane w/href).
			// App must override if the drop down is lazy-created.
			var dropDown = this.dropDown;
			var handler = dropDown.on("load", lang.hitch(this, function(){
				handler.remove();
				callback();
			}));
			dropDown.refresh();		// tell it to load
		},

		isFocusable: function(){
			// Overridden so that focus is handled by the _HasDropDown mixin, not by
			// the _FormWidget mixin.
			return this.inherited(arguments) && !this._mouseDown;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/SimpleTextarea.js":
/*!***************************************************!*\
  !*** ./node_modules/dijit/form/SimpleTextarea.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie") has("opera")
	__webpack_require__(/*! ./TextBox */ "./node_modules/dijit/form/TextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, has, TextBox){

	// module:
	//		dijit/form/SimpleTextarea

	return declare("dijit.form.SimpleTextarea", TextBox, {
		// summary:
		//		A simple textarea that degrades, and responds to
		//		minimal LayoutContainer usage, and works with dijit/form/Form.
		//		Doesn't automatically size according to input, like Textarea.
		//
		// example:
		//	|	<textarea data-dojo-type="dijit/form/SimpleTextarea" name="foo" value="bar" rows=30 cols=40></textarea>
		//
		// example:
		//	|	new SimpleTextarea({ rows:20, cols:30 }, "foo");

		baseClass: "dijitTextBox dijitTextArea",

		// rows: Number
		//		The number of rows of text.
		rows: "3",

		// rows: Number
		//		The number of characters per line.
		cols: "20",

		templateString: "<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",

		postMixInProperties: function(){
			// Copy value from srcNodeRef, unless user specified a value explicitly (or there is no srcNodeRef)
			// TODO: parser will handle this in 2.0
			if(!this.value && this.srcNodeRef){
				this.value = this.srcNodeRef.value;
			}
			this.inherited(arguments);
		},

		buildRendering: function(){
			this.inherited(arguments);
			if(has("ie") && this.cols){ // attribute selectors is not supported in IE6
				domClass.add(this.textbox, "dijitTextAreaCols");
			}
		},

		filter: function(/*String*/ value){
			// Override TextBox.filter to deal with newlines... specifically (IIRC) this is for IE which writes newlines
			// as \r\n instead of just \n
			if(value){
				value = value.replace(/\r/g, "");
			}
			return this.inherited(arguments);
		},

		_onInput: function(/*Event?*/ e){
			// Override TextBox._onInput() to enforce maxLength restriction
			if(this.maxLength){
				var maxLength = parseInt(this.maxLength);
				var value = this.textbox.value.replace(/\r/g, '');
				var overflow = value.length - maxLength;
				if(overflow > 0){
					var textarea = this.textbox;
					if(textarea.selectionStart){
						var pos = textarea.selectionStart;
						var cr = 0;
						if(has("opera")){
							cr = (this.textbox.value.substring(0, pos).match(/\r/g) || []).length;
						}
						this.textbox.value = value.substring(0, pos - overflow - cr) + value.substring(pos - cr);
						textarea.setSelectionRange(pos - overflow, pos - overflow);
					}else if(this.ownerDocument.selection){ //IE
						textarea.focus();
						var range = this.ownerDocument.selection.createRange();
						// delete overflow characters
						range.moveStart("character", -overflow);
						range.text = '';
						// show cursor
						range.select();
					}
				}
			}
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_CheckBoxMixin.js":
/*!***************************************************!*\
  !*** ./node_modules/dijit/form/_CheckBoxMixin.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js") // domAttr.set
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domAttr){

	// module:
	//		dijit/form/_CheckBoxMixin

	return declare("dijit.form._CheckBoxMixin", null, {
		// summary:
		//		Mixin to provide widget functionality corresponding to an HTML checkbox
		//
		// description:
		//		User interacts with real html inputs.
		//		On onclick (which occurs by mouse click, space-bar, or
		//		using the arrow keys to switch the selected radio button),
		//		we update the state of the checkbox/radio.
		//

		// type: [private] String
		//		type attribute on `<input>` node.
		//		Overrides `dijit/form/Button.type`.  Users should not change this value.
		type: "checkbox",

		// value: String
		//		As an initialization parameter, equivalent to value field on normal checkbox
		//		(if checked, the value is passed as the value when form is submitted).
		value: "on",

		// readOnly: Boolean
		//		Should this widget respond to user input?
		//		In markup, this is specified as "readOnly".
		//		Similar to disabled except readOnly form values are submitted.
		readOnly: false,

		// aria-pressed for toggle buttons, and aria-checked for checkboxes
		_aria_attr: "aria-checked",

		_setReadOnlyAttr: function(/*Boolean*/ value){
			this._set("readOnly", value);
			domAttr.set(this.focusNode, 'readOnly', value);
		},

		// Override dijit/form/Button._setLabelAttr() since we don't even have a containerNode.
		// Normally users won't try to set label, except when CheckBox or RadioButton is the child of a dojox/layout/TabContainer
		_setLabelAttr: undefined,

		_getSubmitValue: function(/*String*/ value){
			return (value == null || value === "") ? "on" : value;
		},

		_setValueAttr: function(newValue){
			newValue = this._getSubmitValue(newValue);	// "on" to match browser native behavior when value unspecified
			this._set("value", newValue);
			domAttr.set(this.focusNode, "value", newValue);
		},

		reset: function(){
			this.inherited(arguments);
			// Handle unlikely event that the <input type=checkbox> value attribute has changed
			this._set("value", this._getSubmitValue(this.params.value));
			domAttr.set(this.focusNode, 'value', this.value);
		},

		_onClick: function(/*Event*/ e){
			// summary:
			//		Internal function to handle click actions - need to check
			//		readOnly, since button no longer does that check.
			if(this.readOnly){
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			return this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * (C) Copyright IBM Corp. 2012, 2016 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function(loader, name, req) {
	var result, resultSet;
	loader.load(name,  req, function(data) {
		result = data;
		resultSet = true;
	}, {isBuild:true});

	if (!resultSet) {
		throw new Error(name + ' unavailable');
	}
	return result;
};


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/CheckBox.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/form/templates/CheckBox.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" role=\"${type}\" aria-checked=\"false\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n/></div>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/form/templates/DropDownButton.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\" data-dojo-attach-point=\"valueNode\" aria-hidden=\"true\"\n/></span>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Fieldset.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fieldset>\n\t<legend data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tdata-dojo-attach-point=\"titleBarNode, titleNode\">\n\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t><span data-dojo-attach-point=\"titleNode, focusNode\" class=\"dijitFieldsetLegendNode\" id=\"${id}_titleNode\"></span>\n\t</legend>\n\t<div class=\"dijitFieldsetContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitFieldsetContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\"\n\t\t\t\t \tid=\"${id}_pane\" aria-labelledby=\"${id}_titleNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</fieldset>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/TooltipDialog.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"contentsNode\" class=\"dijitTooltipContents dijitTooltipFocusNode\">\n\t\t\t<div data-dojo-attach-point=\"containerNode\"></div>\n\t\t\t${!actionBarTemplate}\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n"

/***/ })

}]);