(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/QueryTestWidget":"./eclwatch/QueryTestWidget.js",
	"hpcc/_TabContainerWidget":"./eclwatch/_TabContainerWidget.js",
	"dojo/text!templates/QueryTestWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QueryTestWidget.html",
	"dojo/request/script":"./node_modules/dojo/request/script.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[142],{

/***/ "./eclwatch/QueryTestWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/QueryTestWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! src/ESPQuery */ "./lib/src/ESPQuery.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! dojo/text!../templates/QueryTestWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QueryTestWidget.html")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil,
    registry,
    _TabContainerWidget, WsTopology, ESPQuery,
    BorderContainer, TabContainer, ContentPane,
    template) {
        return declare("QueryTestWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "QueryTestWidget",
            i18n: nlsHPCC,

            initalized: false,
            soapTab: null,
            jsonTab: null,
            requestTab: null,
            responseTab: null,
            requestSchemaTab: null,
            responseSchemaTab: null,
            wsdlTab: null,
            paramXmlTab: null,
            formTab: null,
            linksTab: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.soapTab = registry.byId(this.id + "_SOAP");
                this.jsonTab = registry.byId(this.id + "_JSON");
                this.wsdlTab = registry.byId(this.id + "_WSDL");
                this.requestSchemaTab = registry.byId(this.id + "_RequestSchema");
                this.responseSchemaTab = registry.byId(this.id + "ResponseSchema");
                this.requestTab = registry.byId(this.id + "_Request");
                this.responseTab = registry.byId(this.id + "_Response");
                this.paramXmlTab = registry.byId(this.id + "_ParamXML");
                this.formTab = registry.byId(this.id + "_Form");
                this.linksTab = registry.byId(this.id + "_Links");
            },

            //  Hitched actions  ---
            _onRefresh: function () {
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.query = ESPQuery.Get(params.QuerySetId, params.Id);
                this.initTab();
            },

            setContent: function (target, type, postfix) {
                var context = this;
                WsTopology.GetWsEclIFrameURL(type).then(function (response) {
                    var src = response + encodeURIComponent(context.params.QuerySetId + "/" + context.params.Id + (postfix ? postfix : ""));
                    target.set("content", dojo.create("iframe", {
                        src: src,
                        style: "border: 0; width: 100%; height: 100%"
                    }));
                });
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (!currSel.initalized) {
                    if (currSel.id === this.id + "_SOAP") {
                        //  .../WsEcl/forms/soap/query/roxie/countydeeds.1
                        this.setContent(currSel, "forms/soap");
                    } else if (currSel.id === this.id + "_JSON") {
                        //  .../WsEcl/forms/json/query/roxie/countydeeds.1
                        this.setContent(currSel, "forms/json");
                    } else if (currSel.id === this.id + "_WSDL") {
                        //  .../WsEcl/definitions/query/roxie/countydeeds.1/main/countydeeds.1.wsdl?display
                        this.setContent(currSel, "definitions", "/main/" + this.params.Id + ".wsdl?display");
                    } else if (currSel.id === this.id + "_RequestSchema") {
                        //  .../WsEcl/definitions/query/roxie/countydeeds.1/main/countydeeds.1.xsd?display
                        this.setContent(currSel, "definitions", "/main/" + this.params.Id + ".xsd?display");
                    } else if (currSel.id === this.id + "_ResponseSchemaBorder") {
                        var wu = this.query.getWorkunit();
                        var context = this;
                        wu.fetchResults(function (response) {
                            arrayUtil.forEach(response, function (item, idx) {
                                var responseSchema = new ContentPane({
                                    id: context.id + "ResponseSchema" + item.Name,
                                    title: item.Name,
                                    closable: false
                                });
                                context.responseSchemaTab.addChild(responseSchema);
                                //  .../WsEcl/definitions/query/roxie/countydeeds.1/result/jo_orig.xsd?display
                                context.setContent(responseSchema, "definitions", "/result/" + item.Name.replace(/ /g, '_') + ".xsd?display");
                            });
                        });
                    } else if (currSel.id === this.id + "_Request") {
                        // .../WsEcl/example/request/query/roxie/countydeeds.1?display
                        this.setContent(currSel, "example/request", "?display");
                    } else if (currSel.id === this.id + "_Response") {
                        //  .../WsEcl/example/response/query/roxie/countydeeds.1?display
                        this.setContent(currSel, "example/response", "?display");
                    } else if (currSel.id === this.id + "_ParamXML") {
                        //  .../WsEcl/definitions/query/roxie/countydeeds.1/resource/soap/countydeeds.1.xml?display
                        this.setContent(currSel, "definitions", "/resource/soap/" + this.params.Id + ".xml?display");
                    } else if (currSel.id === this.id + "_Form") {
                        //  .../WsEcl/forms/ecl/query/roxie/countydeeds.1
                        this.setContent(currSel, "forms/ecl");
                    } else if (currSel.id === this.id + "_Links") {
                        //  .../WsEcl/links/query/roxie/countydeeds.1
                        this.setContent(currSel, "links");
                    } else if (currSel.init) {
                        currSel.init(this.params);
                    }
                    currSel.initalized = true;
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/_TabContainerWidget.js":
/*!*****************************************!*\
  !*** ./eclwatch/_TabContainerWidget.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/hash */ "./node_modules/dojo/hash.js"),
    __webpack_require__(/*! dojo/router */ "./node_modules/dojo/router.js"),
    __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, arrayUtil, dom, hash, router, aspect,
    _Widget,
    registry) {

        return declare("_TabContainerWidget", [_Widget], {
            //  Assumptions:
            //    this.id + "BorderContainer" may exist.
            //    this.id + "TabContainer" exits.
            //    Child Tab Widgets ID have an underbar after the parent ID -> "${ID}_thisid" (this id for automatic back/forward button support.

            baseClass: "_TabContainerWidget",
            borderContainer: null,
            _tabContainer: null,

            disableHashing: 0,

            //  String helpers  ---
            idToPath: function (id) {
                var parts = id.split("_");
                return "/" + parts.join("/");
            },

            pathToId: function (path) {
                var obj = path.split("/");
                obj.splice(0, 1);
                return obj.join("_");
            },

            getFirstChildID: function (id) {
                if (id.indexOf(this.id) === 0) {
                    var childParts = id.substring(this.id.length).split("_");
                    return this.id + "_" + childParts[1];
                }
                return "";
            },

            startsWith: function (tst, str) {
                if (!tst || !str || tst.length > str.length) {
                    return false;
                }
                for (var i = 0; i < tst.length; ++i) {
                    if (tst.charAt(i) !== str.charAt(i)) {
                        return false;
                    }
                }
                return true;
            },

            buildRendering: function () {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this._tabContainer = registry.byId(this.id + "TabContainer");

                var context = this;
                this._tabContainer.watch("selectedChildWidget", function (name, oval, nval) {
                    context.onNewTabSelection({
                        oldWidget: oval,
                        newWidget: nval
                    });
                });
            },

            startup: function () {
                this.inherited(arguments);
                var context = this;
                var d = location;
                aspect.after(this, "init", function (args) {
                    this.onNewTabSelection();
                    router.register(this.getPath() + "/:sel", function (evt) {
                        context.routerCallback(evt, true);
                    });
                    router.registerBefore(this.getPath() + "/:sel/*other", function (evt) {
                        context.routerCallback(evt, false);
                    });
                    router.startup();
                });
            },

            resize: function (args) {
                this.inherited(arguments);
                if (this.borderContainer) {
                    this.borderContainer.resize();
                } else {
                    this._tabContainer.resize();
                }
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            destroy: function (args) {
                this.inherited(arguments);
            },

            //  Hash Helpers  ---
            onNewTabSelection: function (notification) {
                var currHash = hash();
                var newHash = this.getSelectedPath();
                if (this.disableHashing) {
                    this.go(this.getSelectedPath(), false, true);
                } else {
                    var overwrite = this.startsWith(currHash, newHash);
                    this.go(this.getSelectedPath(), overwrite);
                }
            },

            go: function (path, replace, noHash) {
                //console.log(this.id + ".go(" + path + ", " + replace + ", " + noHash + ")");
                if (!path)
                    return;

                if (noHash) {
                    var d = 0;
                } else {
                    hash(path, replace);
                }
                router._handlePathChange(path);
            },

            routerCallback: function (evt) {
                var currSel = this.getSelectedChild();
                var newSel = this.id + "_" + evt.params.sel;
                if (this.endsWith(newSel, "-DL")) {
                    newSel = newSel.substring(0, newSel.length - 3);
                }
                if (!currSel || currSel.id !== newSel) {
                    this.selectChild(newSel, null);
                } else if (this.initTab) {
                    this.initTab();
                }
            },

            getPath: function () {
                return this.idToPath(this.id);
            },

            getSelectedPath: function () {
                var selWidget = this._tabContainer.get("selectedChildWidget");
                if (!selWidget || selWidget === this._tabContainer) {
                    return null;
                }
                if (selWidget.getPath) {
                    return selWidget.getPath();
                }
                return this.idToPath(selWidget.id);
            },

            //  Tab Helpers ---
            getSelectedChild: function () {
                return this._tabContainer.get("selectedChildWidget");
            },

            getTabChildren: function () {
                return this._tabContainer.getChildren();
            },

            addChild: function (child, pos) {
                //this.disableHashing++;
                var retVal = this._tabContainer.addChild(child, pos);
                //this.disableHashing--;
                return retVal;
            },

            removeChild: function (child) {
                this._tabContainer.removeChild(child);
                child.destroyRecursive();
            },

            removeAllChildren: function () {
                var tabs = this._tabContainer.getChildren();
                for (var i = 0; i < tabs.length; ++i) {
                    this.removeChild(tabs[i]);
                }
            },

            selectChild: function (childID, doHash) {
                if (!doHash) {
                    this.disableHashing++;
                }
                var currSel = this.getSelectedChild();
                var child = registry.byId(childID);
                if (currSel !== child) {
                    var childIndex = this._tabContainer.getIndexOfChild(child);
                    if (childIndex >= 0) {
                        this._tabContainer.selectChild(child);
                    }
                } else {
                    this.onNewTabSelection({
                        oldWidget: null,
                        newWidget: child
                    })
                }
                if (!doHash) {
                    this.disableHashing--;
                }
                return child;
            },
            restoreFromHash: function (hash) {
                if (hash) {
                    var hashID = this.pathToId(hash);
                    var firstChildID = this.getFirstChildID(hashID);
                    if (firstChildID) {
                        if (this.endsWith(firstChildID, "-DL")) {
                            firstChildID = firstChildID.substring(0, firstChildID.length - 3);
                        }
                        var child = this.selectChild(firstChildID, false);
                        if (child) {
                            if (this.initTab) {
                                this.initTab();
                            }
                            if (child.restoreFromHash) {
                                child.restoreFromHash(hash);
                            }
                        }
                    }
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/QueryTestWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/QueryTestWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_SOAP\" title=\"${i18n.SOAP}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_JSON\" title=\"${i18n.JSON}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_WSDL\" title=\"${i18n.WSDL}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_RequestSchema\" title=\"${i18n.RequestSchema}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_ResponseSchemaBorder\" title=\"${i18n.ResponseSchema}\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}ResponseSchema\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n                </div>\n            </div>\n            <div id=\"${id}_Request\" title=\"${i18n.SampleRequest}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_Response\" title=\"${i18n.SampleResponse}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_ParamXML\" title=\"${i18n.ParameterXML}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_Form\" title=\"${i18n.LegacyForm}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_Links\" title=\"${i18n.Links}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/dojo/request/script.js":
/*!*********************************************!*\
  !*** ./node_modules/dojo/request/script.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__.dj.m(module),
	__webpack_require__(/*! ./watch */ "./node_modules/dojo/request/watch.js"),
	__webpack_require__(/*! ./util */ "./node_modules/dojo/request/util.js"),
	__webpack_require__(/*! ../_base/kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! ../dom */ "./node_modules/dojo/dom.js"),
	__webpack_require__(/*! ../dom-construct */ "./node_modules/dojo/dom-construct.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ../_base/window */ "./node_modules/dojo/_base/window.js")/*=====,
	'../request',
	'../_base/declare' =====*/
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(module, watch, util, kernel, array, lang, on, dom, domConstruct, has, win/*=====, request, declare =====*/){
	has.add('script-readystatechange', function(global, document){
		var script = document.createElement('script');
		return typeof script['onreadystatechange'] !== 'undefined' &&
			(typeof global['opera'] === 'undefined' || global['opera'].toString() !== '[object Opera]');
	});

	var mid = module.i.replace(/[\/\.\-]/g, '_'),
		counter = 0,
		loadEvent = has('script-readystatechange') ? 'readystatechange' : 'load',
		readyRegExp = /complete|loaded/,
		callbacks = kernel.global[mid + '_callbacks'] = {},
		deadScripts = [];

	function attach(id, url, frameDoc, errorHandler){
		var doc = (frameDoc || win.doc),
			element = doc.createElement('script');

		if (errorHandler) {
			on.once(element, 'error', errorHandler);
		}

		element.type = 'text/javascript';
		try {
			element.src = url;
		} catch(err) {
			errorHandler && errorHandler(element);
		}

		element.id = id;
		element.async = true;
		element.charset = 'utf-8';

		return doc.getElementsByTagName('head')[0].appendChild(element);
	}

	function remove(id, frameDoc, cleanup){
		domConstruct.destroy(dom.byId(id, frameDoc));

		if(callbacks[id]){
			if(cleanup){
				// set callback to a function that deletes itself so requests that
				// are in-flight don't error out when returning and also
				// clean up after themselves
				callbacks[id] = function(){
					delete callbacks[id];
				};
			}else{
				delete callbacks[id];
			}
		}
	}

	function _addDeadScript(dfd){
		// Be sure to check ioArgs because it can dynamically change in the dojox/io plugins.
		// See http://bugs.dojotoolkit.org/ticket/15890.
		var options = dfd.response.options,
			frameDoc = options.ioArgs ? options.ioArgs.frameDoc : options.frameDoc;

		deadScripts.push({ id: dfd.id, frameDoc: frameDoc });

		if(options.ioArgs){
			options.ioArgs.frameDoc = null;
		}
		options.frameDoc = null;
	}

	function canceler(dfd, response){
		if(dfd.canDelete){
			//For timeouts and cancels, remove the script element immediately to
			//avoid a response from it coming back later and causing trouble.
			script._remove(dfd.id, response.options.frameDoc, true);
		}
	}
	function isValid(response){
		//Do script cleanup here. We wait for one inflight pass
		//to make sure we don't get any weird things by trying to remove a script
		//tag that is part of the call chain (IE 6 has been known to
		//crash in that case).
		if(deadScripts && deadScripts.length){
			array.forEach(deadScripts, function(_script){
				script._remove(_script.id, _script.frameDoc);
				_script.frameDoc = null;
			});
			deadScripts = [];
		}

		return response.options.jsonp ? !response.data : true;
	}
	function isReadyScript(response){
		return !!this.scriptLoaded;
	}
	function isReadyCheckString(response){
		var checkString = response.options.checkString;

		return checkString && eval('typeof(' + checkString + ') !== "undefined"');
	}
	function handleResponse(response, error){
		if(this.canDelete){
			_addDeadScript(this);
		}
		if(error){
			this.reject(error);
		}else{
			this.resolve(response);
		}
	}

	function script(url, options, returnDeferred){
		var response = util.parseArgs(url, util.deepCopy({}, options));
		url = response.url;
		options = response.options;

		var dfd = util.deferred(
			response,
			canceler,
			isValid,
			options.jsonp ? null : (options.checkString ? isReadyCheckString : isReadyScript),
			handleResponse
		);

		lang.mixin(dfd, {
			id: mid + (counter++),
			canDelete: false
		});

		if(options.jsonp){
			var queryParameter = new RegExp('[?&]' + options.jsonp + '=');
			if(!queryParameter.test(url)){
				url += (~url.indexOf('?') ? '&' : '?') +
					options.jsonp + '=' +
					(options.frameDoc ? 'parent.' : '') +
					mid + '_callbacks.' + dfd.id;
			}

			dfd.canDelete = true;
			callbacks[dfd.id] = function(json){
				response.data = json;
				dfd.handleResponse(response);
			};
		}

		if(util.notify){
			util.notify.emit('send', response, dfd.promise.cancel);
		}

		if(!options.canAttach || options.canAttach(dfd)){
			var node = script._attach(dfd.id, url, options.frameDoc, function (error) {
				if (!(error instanceof Error)) {
					var newError = new Error('Error loading ' + (error.target ? error.target.src : 'script'));
					newError.source = error;
					error = newError;
				}
				dfd.reject(error);
				script._remove(dfd.id, options.frameDoc, true);
			});

			if(!options.jsonp && !options.checkString){
				var handle = on(node, loadEvent, function(evt){
					if(evt.type === 'load' || readyRegExp.test(node.readyState)){
						handle.remove();
						dfd.scriptLoaded = evt;
					}
				});
			}
		}

		watch(dfd);

		return returnDeferred ? dfd : dfd.promise;
	}
	script.get = script;
	/*=====
	script = function(url, options){
		// summary:
		//		Sends a request using a script element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/script.__Options?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	script.__BaseOptions = declare(request.__BaseOptions, {
		// jsonp: String?
		//		The URL parameter name that indicates the JSONP callback string.
		//		For instance, when using Yahoo JSONP calls it is normally,
		//		jsonp: "callback". For AOL JSONP calls it is normally
		//		jsonp: "c".
		// checkString: String?
		//		A string of JavaScript that when evaluated like so:
		//		"typeof(" + checkString + ") != 'undefined'"
		//		being true means that the script fetched has been loaded.
		//		Do not use this if doing a JSONP type of call (use `jsonp` instead).
		// frameDoc: Document?
		//		The Document object of a child iframe. If this is passed in, the script
		//		will be attached to that document. This can be helpful in some comet long-polling
		//		scenarios with Firefox and Opera.
	});
	script.__MethodOptions = declare(null, {
		// method: String?
		//		This option is ignored. All requests using this transport are
		//		GET requests.
	});
	script.__Options = declare([script.__BaseOptions, script.__MethodOptions]);

	script.get = function(url, options){
		// summary:
		//		Send an HTTP GET request using a script element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/script.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	=====*/

	// TODO: Remove in 2.0
	script._attach = attach;
	script._remove = remove;
	script._callbacksProperty = mid + '_callbacks';

	return script;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);