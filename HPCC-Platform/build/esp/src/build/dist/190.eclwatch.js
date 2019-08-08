(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/Fieldset":"./node_modules/dijit/Fieldset.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	// "/home/sathvik/hpcc/HPCC-Platform/build/esp/src/tmp/node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js" = "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js"
	"dojo/text!dijit/templates/Fieldset.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html",
	"dojo/request/script":"./node_modules/dojo/request/script.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[190],{

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Fieldset.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fieldset>\n\t<legend data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tdata-dojo-attach-point=\"titleBarNode, titleNode\">\n\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t><span data-dojo-attach-point=\"titleNode, focusNode\" class=\"dijitFieldsetLegendNode\" id=\"${id}_titleNode\"></span>\n\t</legend>\n\t<div class=\"dijitFieldsetContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitFieldsetContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\"\n\t\t\t\t \tid=\"${id}_pane\" aria-labelledby=\"${id}_titleNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</fieldset>\n"

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