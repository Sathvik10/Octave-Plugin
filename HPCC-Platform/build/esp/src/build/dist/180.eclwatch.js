(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html",
	"dojo/request/script":"./node_modules/dojo/request/script.js",
	"dojox/main":"./node_modules/dojox/main.js",
	"dojox/validate":"./node_modules/dojox/validate.js",
	"dojox/validate/_base":"./node_modules/dojox/validate/_base.js",
	"dojox/validate/regexp":"./node_modules/dojox/validate/regexp.js",
	"dojox/widget/Standby":"./node_modules/dojox/widget/Standby.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[180],{

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuSeparator.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"

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


/***/ }),

/***/ "./node_modules/dojox/main.js":
/*!************************************!*\
  !*** ./node_modules/dojox/main.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo) {
	// module:
	//		dojox/main

	/*=====
	return {
		// summary:
		//		The dojox package main module; dojox package is somewhat unusual in that the main module currently just provides an empty object.
		//		Apps should require modules from the dojox packages directly, rather than loading this module.
	};
	=====*/

	return dojo.dojox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/dojox/validate.js":
/*!****************************************!*\
  !*** ./node_modules/dojox/validate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./validate/_base */ "./node_modules/dojox/validate/_base.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(validate){

	/*=====
	 return {
	 // summary:
	 //		Deprecated.  Should require dojox/validate modules directly rather than trying to access them through
	 //		this module.
	 };
	 =====*/

	return validate;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/validate/_base.js":
/*!**********************************************!*\
  !*** ./node_modules/dojox/validate/_base.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! dojo/regexp */ "./node_modules/dojo/regexp.js"), // dojo core expressions
	__webpack_require__(/*! dojo/number */ "./node_modules/dojo/number.js"), // dojo number expressions
	__webpack_require__(/*! ./regexp */ "./node_modules/dojox/validate/regexp.js") // additional expressions
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, regexp, number, xregexp) {

var validate = lang.getObject("dojox.validate", true);

validate.isText = function(value, flags){
	// summary:
	//		Checks if a string has non whitespace characters.
	//		Parameters allow you to constrain the length.
	// value: String
	// flags: Object?
	//		{length: Number, minlength: Number, maxlength: Number}
	//
	//		- flags.length  If set, checks if there are exactly flags.length number of characters.
	//		- flags.minlength  If set, checks if there are at least flags.minlength number of characters.
	//		- flags.maxlength  If set, checks if there are at most flags.maxlength number of characters.
	
	flags = (typeof flags == "object") ? flags : {};
	
	// test for text
	if(/^\s*$/.test(value)){ return false; } // Boolean
	
	// length tests
	if(typeof flags.length == "number" && flags.length != value.length){ return false; } // Boolean
	if(typeof flags.minlength == "number" && flags.minlength > value.length){ return false; } // Boolean
	if(typeof flags.maxlength == "number" && flags.maxlength < value.length){ return false; } // Boolean
	
	return true; // Boolean

};

validate._isInRangeCache = {};
validate.isInRange = function(value, flags){
	// summary:
	//		Validates whether a string denoting a number
	//		is between a max and min.
	// value: String
	// flags: Object?
	//		{max:Number, min:Number, decimal:String}
	//
	//		- flags.max  A number, which the value must be less than or equal to for the validation to be true.
	//		- flags.min  A number, which the value must be greater than or equal to for the validation to be true.
	//		- flags.decimal  The character used for the decimal point.  Default is ".".
	
	value = number.parse(value, flags);
	if(isNaN(value)){
		return false; // Boolean
	}
    
	// assign default values to missing parameters
	flags = (typeof flags == "object") ? flags : {};
	var max = (typeof flags.max == "number") ? flags.max : Infinity,
		min = (typeof flags.min == "number") ? flags.min : -Infinity,
		dec = (typeof flags.decimal == "string") ? flags.decimal : ".",
	
		cache = validate._isInRangeCache,
		cacheIdx = value + "max" + max + "min" + min + "dec" + dec
	;
	if(typeof cache[cacheIdx] != "undefined"){
		return cache[cacheIdx];
	}

	cache[cacheIdx] = !(value < min || value > max);
	return cache[cacheIdx]; // Boolean

};

validate.isNumberFormat = function(value, flags){
	// summary:
	//		Validates any sort of number based format
	// description:
	//		Validates any sort of number based format. Use it for phone numbers,
	//		social security numbers, zip-codes, etc. The value can be validated
	//		against one format or one of multiple formats.
	//
	//		Format Definition
	//		|   #        Stands for a digit, 0-9.
	//		|   ?        Stands for an optional digit, 0-9 or nothing.
	//		All other characters must appear literally in the expression.
	// example:
	// |  "(###) ###-####"       ->   (510) 542-9742
	// |  "(###) ###-#### x#???" ->   (510) 542-9742 x153
	// |  "###-##-####"          ->   506-82-1089       i.e. social security number
	// |  "#####-####"           ->   98225-1649        i.e. zip code
	// value: String
	// flags: Object?
	//		- flags.format  A string or an Array of strings for multiple formats.
	// example:
	// |	require(["dojox/validate/_base"], function(validate){
	// |		// returns true:
	// |		validate.isNumberFormat("123-45", { format:"###-##" });
	// |	});		
	// example:
	//		Check Multiple formats:
	// |	require(["dojox/validate/_base"], function(validate){
	// |		validate.isNumberFormat("123-45", {
	// |			format:["### ##","###-##","## ###"]
	// |	});
	//

	var re = new RegExp("^" + xregexp.numberFormat(flags) + "$", "i");
	return re.test(value); // Boolean
};

validate.isValidLuhn = function(/* String */value){
	// summary:
	//		Validate a String value against the Luhn algorithm.
	// description:
	//		Validate a String value against the Luhn algorithm to verify
	//		its integrity.
	
	var sum = 0, parity, curDigit;
	if(!lang.isString(value)){
		value = String(value);
	}
	value = value.replace(/[- ]/g,''); //ignore dashes and whitespaces
	parity = value.length % 2;

	for(var i = 0; i < value.length; i++){
		curDigit = parseInt(value.charAt(i));
		if(i % 2 == parity){
			curDigit *= 2;
		}
		if(curDigit > 9){
			curDigit -= 9;
		}
		sum += curDigit;
	}
	return !(sum % 10); // Boolean
};

return validate;

}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/validate/regexp.js":
/*!***********************************************!*\
  !*** ./node_modules/dojox/validate/regexp.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/regexp */ "./node_modules/dojo/regexp.js"), __webpack_require__(/*! dojox/main */ "./node_modules/dojox/main.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, regexp, dojox){

var dxregexp = lang.getObject("validate.regexp", true, dojox);
dxregexp = dojox.validate.regexp = {
	
	ipAddress: function(flags){
		// summary:
		//		Builds a RE that matches an IP Address
		// description:
		//		Supports 5 formats for IPv4: dotted decimal, dotted hex, dotted octal, decimal and hexadecimal.
		//		Supports 2 formats for Ipv6.
		// flags: Object?
		//		All flags are boolean with default = true.
		//
		//		- flags.allowDottedDecimal  Example, 207.142.131.235.  No zero padding.
		//		- flags.allowDottedHex  Example, 0x18.0x11.0x9b.0x28.  Case insensitive.  Zero padding allowed.
		//		- flags.allowDottedOctal  Example, 0030.0021.0233.0050.  Zero padding allowed.
		//		- flags.allowDecimal  Example, 3482223595.  A decimal number between 0-4294967295.
		//		- flags.allowHex  Example, 0xCF8E83EB.  Hexadecimal number between 0x0-0xFFFFFFFF.
		//		  Case insensitive.  Zero padding allowed.
		//		- flags.allowIPv6   IPv6 address written as eight groups of four hexadecimal digits.
		
		//	FIXME: ipv6 can be written multiple ways IIRC
		//		- flags.allowHybrid   IPv6 address written as six groups of four hexadecimal digits
		//		-   followed by the usual 4 dotted decimal digit notation of IPv4. x:x:x:x:x:x:d.d.d.d

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};
		if(typeof flags.allowDottedDecimal != "boolean"){ flags.allowDottedDecimal = true; }
		if(typeof flags.allowDottedHex != "boolean"){ flags.allowDottedHex = true; }
		if(typeof flags.allowDottedOctal != "boolean"){ flags.allowDottedOctal = true; }
		if(typeof flags.allowDecimal != "boolean"){ flags.allowDecimal = true; }
		if(typeof flags.allowHex != "boolean"){ flags.allowHex = true; }
		if(typeof flags.allowIPv6 != "boolean"){ flags.allowIPv6 = true; }
		if(typeof flags.allowHybrid != "boolean"){ flags.allowHybrid = true; }

		// decimal-dotted IP address RE.
		var dottedDecimalRE =
			// Each number is between 0-255.  Zero padding is not allowed.
			"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";

		// dotted hex IP address RE.  Each number is between 0x0-0xff.  Zero padding is allowed, e.g. 0x00.
		var dottedHexRE = "(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";

		// dotted octal IP address RE.  Each number is between 0000-0377.
		// Zero padding is allowed, but each number must have at least 4 characters.
		var dottedOctalRE = "(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";

		// decimal IP address RE.  A decimal number between 0-4294967295.
		var decimalRE =  "(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|" +
			"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";

		// hexadecimal IP address RE.
		// A hexadecimal number between 0x0-0xFFFFFFFF. Case insensitive.  Zero padding is allowed.
		var hexRE = "0[xX]0*[\\da-fA-F]{1,8}";

		// IPv6 address RE.
		// The format is written as eight groups of four hexadecimal digits, x:x:x:x:x:x:x:x,
		// where x is between 0000-ffff. Zero padding is optional. Case insensitive.
		var ipv6RE = "([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";

		// IPv6/IPv4 Hybrid address RE.
		// The format is written as six groups of four hexadecimal digits,
		// followed by the 4 dotted decimal IPv4 format. x:x:x:x:x:x:d.d.d.d
		var hybridRE = "([\\da-fA-F]{1,4}\\:){6}" +
			"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";

		// Build IP Address RE
		var a = [];
		if(flags.allowDottedDecimal){ a.push(dottedDecimalRE); }
		if(flags.allowDottedHex){ a.push(dottedHexRE); }
		if(flags.allowDottedOctal){ a.push(dottedOctalRE); }
		if(flags.allowDecimal){ a.push(decimalRE); }
		if(flags.allowHex){ a.push(hexRE); }
		if(flags.allowIPv6){ a.push(ipv6RE); }
		if(flags.allowHybrid){ a.push(hybridRE); }

		var ipAddressRE = "";
		if(a.length > 0){
			ipAddressRE = "(" + a.join("|") + ")";
		}
		return ipAddressRE; // String
	},

	host: function(flags){
		// summary:
		//		Builds a RE that matches a host
		// description:
		//		A host is a named host (A-z0-9_- but not starting with -), a domain name or an IP address, possibly followed by a port number.
		// flags: Object?
		//		- flags.allowNamed Allow a named host for local networks. Default is false.
		//		- flags.allowIP  Allow an IP address for hostname.  Default is true.
		//		- flags.allowLocal  Allow the host to be "localhost".  Default is false.
		//		- flags.allowPort  Allow a port number to be present.  Default is true.
		//		- flags in regexp.ipAddress can be applied.

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};

		if(typeof flags.allowIP != "boolean"){ flags.allowIP = true; }
		if(typeof flags.allowLocal != "boolean"){ flags.allowLocal = false; }
		if(typeof flags.allowPort != "boolean"){ flags.allowPort = true; }
		if(typeof flags.allowNamed != "boolean"){ flags.allowNamed = false; }

		//TODO: support unicode hostnames?
		// Domain name labels can not end with a dash.
		var domainLabelRE = "(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)";
		var domainNameRE = "(?:[a-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)"; // restricted version to allow backwards compatibility with allowLocal, allowIP

		// port number RE
		var portRE = flags.allowPort ? "(\\:\\d+)?" : "";

		// build host RE
		var hostNameRE = "((?:" + domainLabelRE + "\\.)+" + domainNameRE + "\\.?)";
		if(flags.allowIP){ hostNameRE += "|" +  dxregexp.ipAddress(flags); }
		if(flags.allowLocal){ hostNameRE += "|localhost"; }
		if(flags.allowNamed){ hostNameRE += "|^[^-][a-zA-Z0-9_-]*"; }
		return "(" + hostNameRE + ")" + portRE; // String

	},

	url: function(flags){
		// summary:
		//		Builds a regular expression that matches a URL
		// flags: Object?
		//		- flags.scheme  Can be true, false, or [true, false].
		//		-   This means: required, not allowed, or match either one.
		//		- flags in regexp.host can be applied.
		//		- flags in regexp.ipAddress can be applied.

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};
		if(!("scheme" in flags)){ flags.scheme = [true, false]; }

		// Scheme RE
		var protocolRE = regexp.buildGroupRE(flags.scheme,
			function(q){ if(q){ return "(https?|ftps?)\\://"; } return ""; }
		);

		// Path and query and anchor RE
		var pathRE = "(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?";

		return protocolRE + dxregexp.host(flags) + pathRE;
	},

	emailAddress: function(flags){
		// summary:
		//		Builds a regular expression that matches an email address
		// flags: Object?
		//		- flags.allowCruft  Allow address like `<mailto:foo@yahoo.com>`.  Default is false.
		//		- flags in regexp.host can be applied.
		//		- flags in regexp.ipAddress can be applied.

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};
		if (typeof flags.allowCruft != "boolean") { flags.allowCruft = false; }
		flags.allowPort = false; // invalid in email addresses

		// user name RE per rfc5322
		var usernameRE = "([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";

		// build emailAddress RE
		var emailAddressRE = usernameRE + "@" + dxregexp.host(flags);

		// Allow email addresses with cruft
		if ( flags.allowCruft ) {
			emailAddressRE = "<?(mailto\\:)?" + emailAddressRE + ">?";
		}

		return emailAddressRE; // String
	},

	emailAddressList: function(flags){
		// summary:
		//		Builds a regular expression that matches a list of email addresses.
		// flags: Object?
		//		- flags.listSeparator  The character used to separate email addresses.  Default is ";", ",", "\n" or " ".
		//		- flags in regexp.emailAddress can be applied.
		//		- flags in regexp.host can be applied.
		//		- flags in regexp.ipAddress can be applied.

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};
		if(typeof flags.listSeparator != "string"){ flags.listSeparator = "\\s;,"; }

		// build a RE for an Email Address List
		var emailAddressRE = dxregexp.emailAddress(flags);
		var emailAddressListRE = "(" + emailAddressRE + "\\s*[" + flags.listSeparator + "]\\s*)*" +
			emailAddressRE + "\\s*[" + flags.listSeparator + "]?\\s*";

		return emailAddressListRE; // String
	},
	
	numberFormat: function(flags){
		// summary:
		//		Builds a regular expression to match any sort of number based format
		// description:
		//		Use this method for phone numbers, social security numbers, zip-codes, etc.
		//		The RE can match one format or one of multiple formats.
		//
		//		Format:
		//
		//		- #        Stands for a digit, 0-9.
		//		- ?        Stands for an optional digit, 0-9 or nothing.
		//		- All other characters must appear literally in the expression.
		//
		// example:
		//		- "(###) ###-####"		-    ->   (510) 542-9742
		//		- "(###) ###-#### x#???" ->   (510) 542-9742 x153
		//		- "###-##-####"		- 		-   ->   506-82-1089		-    i.e. social security number
		//		- "#####-####"		- 		-    ->   98225-1649		- 		- i.e. zip code
		//
		// flags:  Object?
		//		- flags.format  A string or an Array of strings for multiple formats.

		// assign default values to missing parameters
		flags = (typeof flags == "object") ? flags : {};
		if(typeof flags.format == "undefined"){ flags.format = "###-###-####"; }

		// Converts a number format to RE.
		var digitRE = function(format){
			// escape all special characters, except '?'
			return regexp.escapeString(format, "?")
				// Now replace '?' with Regular Expression
				.replace(/\?/g, "\\d?")
				// replace # with Regular Expression
				.replace(/#/g, "\\d")
			;
		};

		// build RE for multiple number formats
		return regexp.buildGroupRE(flags.format, digitRE); //String
	},
	
	ca: {

		postalCode: function(){
			// summary:
			//		String regular Express to match Canadain Postal Codes
			return "([A-Z][0-9][A-Z] [0-9][A-Z][0-9])";
		},

		province: function(){
			// summary:
			//		a regular expression to match Canadian Province Abbreviations
			return "(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)";
		}

	},
	
	us:{
		state: function(flags){
			// summary:
			//		A regular expression to match US state and territory abbreviations
			// flags: Object?
			//		- flags.allowTerritories  Allow Guam, Puerto Rico, etc.  Default is true.
			//		- flags.allowMilitary  Allow military 'states', e.g. Armed Forces Europe (AE).  Default is true.

			// assign default values to missing parameters
			flags = (typeof flags == "object") ? flags : {};
			if(typeof flags.allowTerritories != "boolean"){ flags.allowTerritories = true; }
			if(typeof flags.allowMilitary != "boolean"){ flags.allowMilitary = true; }

			// state RE
			var statesRE =
				"AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|" +
				"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";

			// territories RE
			var territoriesRE = "AS|FM|GU|MH|MP|PW|PR|VI";

			// military states RE
			var militaryRE = "AA|AE|AP";

			// Build states and territories RE
			if(flags.allowTerritories){ statesRE += "|" + territoriesRE; }
			if(flags.allowMilitary){ statesRE += "|" + militaryRE; }

			return "(" + statesRE + ")"; // String
		}

	}
	
};

return dxregexp;

}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/widget/Standby.js":
/*!**********************************************!*\
  !*** ./node_modules/dojox/widget/Standby.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! dojo/_base/event */ "./node_modules/dojo/_base/event.js"),
	__webpack_require__(/*! dojo/_base/sniff */ "./node_modules/dojo/_base/sniff.js"),
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
	__webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"),
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
	__webpack_require__(/*! dojo/window */ "./node_modules/dojo/window.js"),
	__webpack_require__(/*! dojo/_base/window */ "./node_modules/dojo/_base/window.js"),
	__webpack_require__(/*! dojo/_base/fx */ "./node_modules/dojo/_base/fx.js"),
	__webpack_require__(/*! dojo/fx */ "./node_modules/dojo/fx.js"),
	__webpack_require__(/*! dijit/_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! dijit/_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel,
		declare,
		array,
		event,
		has,
		dom,
		attr,
		construct,
		geometry,
		domStyle,
		window,
		baseWindow,
		baseFx,
		fx,
		_Widget,
		_TemplatedMixin,
		registry) {

kernel.experimental("dojox.widget.Standby");

return declare("dojox.widget.Standby", [_Widget, _TemplatedMixin],{
	// summary:
	//		A widget designed to act as a Standby/Busy/Disable/Blocking widget to indicate a
	//		particular DOM node is processing and cannot be clicked on at this time.
	//		This widget uses absolute positioning to apply the overlay and image.

	// image: String
	//		A URL to an image to center within the blocking overlay.
	//		The default is a basic spinner.
	image: require.toUrl("dojox/widget/Standby/images/loading.gif").toString(),

	// imageText: String
	//		Text to set on the ALT tag of the image.
	//		The default is 'Please wait...'
	imageText: "Please Wait...", // TODO: i18n

	// text: String
	//		Text/HTML to display in the center of the overlay
	//		This is used if image center is disabled.
	//		Defaults to 'Please Wait...'
	text: "Please wait...",

	// centerIndicator: String
	//		Property to define if the image and its alt text should be used, or
	//		a simple Text/HTML node should be used.  Allowable values are 'image'
	//		and 'text'.
	//		Default is 'image'.
	centerIndicator: "image",

	// target: DOMNode||DOMID(String)||WidgetID(String)
	//		The target to overlay when active.  Can be a widget id, a
	//		dom id, or a direct node reference.
	target: "",

	// color:	String
	//		The color to set the overlay.  Should be in #XXXXXX form.
	//		Default color for the translucent overlay is light gray.
	color: "#C0C0C0",

	// duration: Integer
	//		Integer defining how long the show and hide effects should take in milliseconds.
	//		Defaults to 500
	duration: 500,

	// zIndex: String
	//		Control that lets you specify if the zIndex for the overlay
	//		should be auto-computed based off parent zIndex, or should be set
	//		to a particular value.  This is useful when you want to overlay
	//		things in digit.Dialogs, you can specify a base zIndex to append from.
	zIndex: "auto",

	// opacity: float
	//		The opacity to make the overlay when it is displayed/faded in.
	//		The default is 0.75.  This does not affect the image opacity, only the
	//		overlay.
	opacity: 0.75,

	// templateString: [protected] String
	//		The template string defining out the basics of the widget.  No need for an external
	//		file.
	templateString:
		"<div>" +
			"<div style=\"display: none; opacity: 0; z-index: 9999; " +
				"position: absolute; cursor:wait;\" dojoAttachPoint=\"_underlayNode\"></div>" +
			"<img src=\"${image}\" style=\"opacity: 0; display: none; z-index: -10000; " +
				"position: absolute; top: 0px; left: 0px; cursor:wait;\" "+
				"dojoAttachPoint=\"_imageNode\">" +
			"<div style=\"opacity: 0; display: none; z-index: -10000; position: absolute; " +
				"top: 0px;\" dojoAttachPoint=\"_textNode\"></div>" +
		"</div>",

	// _underlayNode: [private] DOMNode
	//		The node that is the translucent underlay for the
	//		image that blocks access to the target.
	_underlayNode: null,

	// _imageNode: [private] DOMNode
	//		The image node where we attach and define the image to display.
	_imageNode: null,

	// _textNode: [private] DOMNode
	//		The div to attach text/HTML in the overlay center item.
	_textNode: null,

	// _centerNode: [private] DOMNode
	//		Which node to use as the center node, the image or the text node.
	_centerNode: null,

	// _displayed: [private] Boolean
	//		Flag to indicate if the overlay is displayed or not.
	_displayed: false,

	// _resizeCheck: [private] Object
	//		Handle to interval function that checks the target for changes.
	_resizeCheck: null,

	// _started: [private] Boolean
	//		Trap flag to ensure startup only processes once.
	_started: false,

	// _parent: [private] DOMNode
	//		Wrapping div for the widget, also used for IE 7 in dealing with the
	//		zoom issue.
	_parent: null,

	startup: function(args){
		// summary:
		//		Over-ride of the basic widget startup function.
		//		Configures the target node and sets the image to use.
		if(!this._started){
			if(typeof this.target === "string"){
				var w = registry.byId(this.target);
				this.target = w ? w.domNode : dom.byId(this.target);
			}

			if(this.text){
				this._textNode.innerHTML = this.text;
			}
			if(this.centerIndicator === "image"){
				this._centerNode = this._imageNode;
				attr.set(this._imageNode, "src", this.image);
				attr.set(this._imageNode, "alt", this.imageText);
			}else{
				this._centerNode = this._textNode;
			}
			domStyle.set(this._underlayNode, {
				display: "none",
				backgroundColor: this.color
			});
			domStyle.set(this._centerNode, "display", "none");
			this.connect(this._underlayNode, "onclick", "_ignore");

			//Last thing to do is move the widgets parent, if any, to the current document body.
			//Avoids having to deal with parent relative/absolute mess.  Otherwise positioning
			//tends to go goofy.
			if(this.domNode.parentNode && this.domNode.parentNode != baseWindow.body()){
				baseWindow.body().appendChild(this.domNode);
			}

			//IE 7 has a horrible bug with zoom, so we have to create this node
			//to cross-check later.  Sigh.
			if(has("ie") == 7){
				this._ieFixNode = construct.create("div");
				domStyle.set(this._ieFixNode, {
					opacity: "0",
					zIndex: "-1000",
					position: "absolute",
					top: "-1000px"
				});
				baseWindow.body().appendChild(this._ieFixNode);
			}
			this.inherited(arguments);
		}
	},

	show: function(){
		// summary:
		//		Function to display the blocking overlay and busy/status icon or text.
		if(!this._displayed){
			if(this._anim){
				this._anim.stop();
				delete this._anim;
			}
			this._displayed = true;
			this._size();
			this._disableOverflow();
			this._fadeIn();
		}
	},

	hide: function(){
		// summary:
		//		Function to hide the blocking overlay and status icon or text.
		if(this._displayed){
			// Ideally would come up with something better than try/catch,
			// but don't see another simple workaround for
			// https://bugs.dojotoolkit.org/ticket/18196 and
			// https://bugs.dojotoolkit.org/ticket/14984
			try{
				if(this._anim){
					this._anim.stop();
					delete this._anim;
				}
				this._size();
			}catch(e){
				console.error(e);
			}finally{
				this._fadeOut();
				this._displayed = false;
				if(this._resizeCheck !== null){
					clearInterval(this._resizeCheck);
					this._resizeCheck = null;
				}
			}
		}
	},

	isVisible: function(){
		// summary:
		//		Helper function so you can test if the widget is already visible or not.
		// returns:
		//		boolean indicating if the widget is in 'show' state or not.
		return this._displayed; // boolean
	},

	onShow: function(){
		// summary:
		//		Event that fires when the display of the Standby completes.
	},

	onHide: function(){
		// summary:
		//		Event that fires when the display of the Standby completes.
	},

	uninitialize: function(){
		// summary:
		//		Over-ride to hide the widget, which clears intervals, before cleanup.
		this._displayed = false;
		if(this._resizeCheck){
			clearInterval(this._resizeCheck);
		}
		domStyle.set(this._centerNode, "display", "none");
		domStyle.set(this._underlayNode, "display", "none");
		if(has("ie") == 7 && this._ieFixNode){
			baseWindow.body().removeChild(this._ieFixNode);
			delete this._ieFixNode;
		}
		if(this._anim){
			this._anim.stop();
			delete this._anim;
		}
		this.target = null;
		this._imageNode = null;
		this._textNode = null;
		this._centerNode = null;
		this.inherited(arguments);
	},

	_size: function(){
		// summary:
		//		Internal function that handles resizing the overlay and
		//		centering of the image on window resizing.
		// tags:
		//		private
		if(this._displayed){
			var dir = attr.get(baseWindow.body(), "dir");
			if(dir){dir = dir.toLowerCase();}
			var _ie7zoom;
			var scrollers = this._scrollerWidths();

			var target = this.target;

			//Show the image and make sure the zIndex is set high.
			var curStyle = domStyle.get(this._centerNode, "display");
			domStyle.set(this._centerNode, "display", "block");
			var box = geometry.position(target, true);
			if(target === baseWindow.body() || target === baseWindow.doc){
				// Target is the whole doc, so scale to viewport.
				box = window.getBox();
				box.x = box.l;
				box.y = box.t;
			}

			var cntrIndicator = geometry.getMarginBox(this._centerNode);
			domStyle.set(this._centerNode, "display", curStyle);

			//IE has a horrible zoom bug.  So, we have to try and account for
			//it and fix up the scaling.
			if(this._ieFixNode){
				_ie7zoom = -this._ieFixNode.offsetTop / 1000;
				box.x = Math.floor((box.x + 0.9) / _ie7zoom);
				box.y = Math.floor((box.y + 0.9) / _ie7zoom);
				box.w = Math.floor((box.w + 0.9) / _ie7zoom);
				box.h = Math.floor((box.h + 0.9) / _ie7zoom);
			}

			//Figure out how to zIndex this thing over the target.
			var zi = domStyle.get(target, "zIndex");
			var ziUl = zi;
			var ziIn = zi;

			if(this.zIndex === "auto"){
				if(zi != "auto"){
					// honor user-defined z-index
					ziUl = parseInt(ziUl, 10);
					ziIn = parseInt(ziIn, 10);
				}else{
					//We need to search up the chain to see if there
					//are any parent zIndexs to overlay.
					var cNode = target;
					if(cNode && cNode !== baseWindow.body() && cNode !== baseWindow.doc){
						cNode = target.parentNode;
						var oldZi = -100000;
						while(cNode && cNode !== baseWindow.body()){
							zi = domStyle.get(cNode, "zIndex");
							if(!zi || zi === "auto"){
								cNode = cNode.parentNode;
							}else{
								var newZi = parseInt(zi, 10);
								if(oldZi < newZi){
									oldZi = newZi;
									ziUl = newZi + 1;
									ziIn = newZi + 1;
								}
								// Keep looking until we run out, we want the highest zIndex.
								cNode = cNode.parentNode;
							}
						}
					}
				}
			}else{
				// honor user-defined z-index
				ziUl = parseInt(this.zIndex, 10);
				ziIn = parseInt(this.zIndex, 10);
			}

			domStyle.set(this._centerNode, "zIndex", ziIn);
			domStyle.set(this._underlayNode, "zIndex", ziUl);


			var pn = target.parentNode;
			if(pn && pn !== baseWindow.body() &&
				target !== baseWindow.body() &&
				target !== baseWindow.doc){

				// If the parent is the body tag itself,
				// we can avoid all this, the body takes
				// care of overflow for me.  Besides, browser
				// weirdness with height and width on body causes
				// problems with this sort of intersect testing
				// anyway.
				var obh = box.h;
				var obw = box.w;
				var pnBox = geometry.position(pn, true);

				//More IE zoom corrections.  Grr.
				if(this._ieFixNode){
					_ie7zoom = -this._ieFixNode.offsetTop / 1000;
					pnBox.x = Math.floor((pnBox.x + 0.9) / _ie7zoom);
					pnBox.y = Math.floor((pnBox.y + 0.9) / _ie7zoom);
					pnBox.w = Math.floor((pnBox.w + 0.9) / _ie7zoom);
					pnBox.h = Math.floor((pnBox.h + 0.9) / _ie7zoom);
				}

				//Shift the parent width/height a bit if scollers are present.
				pnBox.w -= pn.scrollHeight > pn.clientHeight &&
					pn.clientHeight > 0 ? scrollers.v: 0;
				pnBox.h -= pn.scrollWidth > pn.clientWidth &&
					pn.clientWidth > 0 ? scrollers.h: 0;

				//RTL requires a bit of massaging in some cases
				//(and differently depending on browser, ugh!)
				//WebKit and others still need work.
				if(dir === "rtl"){
					if(has("opera")){
						box.x += pn.scrollHeight > pn.clientHeight &&
							pn.clientHeight > 0 ? scrollers.v: 0;
						pnBox.x += pn.scrollHeight > pn.clientHeight &&
							pn.clientHeight > 0 ? scrollers.v: 0;
					}else if(has("ie")){
						pnBox.x += pn.scrollHeight > pn.clientHeight &&
							pn.clientHeight > 0 ? scrollers.v: 0;
					}else if(has("webkit")){
						//TODO:  FIX THIS!
					}
				}

				//Figure out if we need to adjust the overlay to fit a viewable
				//area, then resize it, we saved the original height/width above.
				//This is causing issues on IE.  Argh!
				if(pnBox.w < box.w){
					//Scale down the width if necessary.
					box.w = box.w - pnBox.w;
				}
				if(pnBox.h < box.h){
					//Scale down the width if necessary.
					box.h = box.h - pnBox.h;
				}

				//Look at the y positions and see if we intersect with the
				//viewport borders.  Will have to do computations off it.
				var vpTop = pnBox.y;
				var vpBottom = pnBox.y + pnBox.h;
				var bTop = box.y;
				var bBottom = box.y + obh;
				var vpLeft = pnBox.x;
				var vpRight = pnBox.x + pnBox.w;
				var bLeft = box.x;
				var bRight = box.x + obw;
				var delta;
				//Adjust the height now
				if(bBottom > vpTop &&
					bTop < vpTop){
					box.y = pnBox.y;
					//intersecting top, need to do some shifting.
					delta = vpTop - bTop;
					var visHeight = obh - delta;
					//If the visible height < viewport height,
					//We need to shift it.
					if(visHeight < pnBox.h){
						box.h = visHeight;
					}else{
						//Deal with horizontal scrollbars if necessary.
						box.h -= 2*(pn.scrollWidth > pn.clientWidth &&
							pn.clientWidth > 0? scrollers.h: 0);
					}
				}else if(bTop < vpBottom && bBottom > vpBottom){
					//Intersecting bottom, just figure out how much
					//overlay to show.
					box.h = vpBottom - bTop;
				}else if(bBottom <= vpTop || bTop >= vpBottom){
					//Outside view, hide it.
					box.h = 0;
				}

				//adjust width
				if(bRight > vpLeft && bLeft < vpLeft){
					box.x = pnBox.x;
					//intersecting left, need to do some shifting.
					delta = vpLeft - bLeft;
					var visWidth = obw - delta;
					//If the visible width < viewport width,
					//We need to shift it.
					if(visWidth < pnBox.w){
						box.w = visWidth;
					}else{
						//Deal with horizontal scrollbars if necessary.
						box.w -= 2*(pn.scrollHeight > pn.clientHeight &&
							pn.clientHeight > 0? scrollers.w:0);
					}
				}else if(bLeft < vpRight && bRight > vpRight){
					//Intersecting right, just figure out how much
					//overlay to show.
					box.w = vpRight - bLeft;
				}else if(bRight <= vpLeft || bLeft >= vpRight){
					//Outside view, hide it.
					box.w = 0;
				}
			}

			if(box.h > 0 && box.w > 0){
				//Set position and size of the blocking div overlay.
				domStyle.set(this._underlayNode, {
					display: "block",
					width: box.w + "px",
					height: box.h + "px",
					top: box.y + "px",
					left: box.x + "px"
				});

				var styles = ["borderRadius", "borderTopLeftRadius",
					"borderTopRightRadius","borderBottomLeftRadius",
					"borderBottomRightRadius"];
				this._cloneStyles(styles);
				if(!has("ie")){
					//Browser specific styles to try and clone if non-IE.
					styles = ["MozBorderRadius", "MozBorderRadiusTopleft",
						"MozBorderRadiusTopright","MozBorderRadiusBottomleft",
						"MozBorderRadiusBottomright","WebkitBorderRadius",
						"WebkitBorderTopLeftRadius", "WebkitBorderTopRightRadius",
						"WebkitBorderBottomLeftRadius","WebkitBorderBottomRightRadius"
					];
					this._cloneStyles(styles, this);
				}
				var cntrIndicatorTop = (box.h/2) - (cntrIndicator.h/2);
				var cntrIndicatorLeft = (box.w/2) - (cntrIndicator.w/2);
				//Only show the image if there is height and width room.
				if(box.h >= cntrIndicator.h && box.w >= cntrIndicator.w){
					domStyle.set(this._centerNode, {
						top: (cntrIndicatorTop + box.y) + "px",
						left: (cntrIndicatorLeft + box.x) + "px",
						display: "block"
					});
				}else{
					domStyle.set(this._centerNode, "display", "none");
				}
			}else{
				//Target has no size, display nothing on it!
				domStyle.set(this._underlayNode, "display", "none");
				domStyle.set(this._centerNode, "display", "none");
			}
			if(this._resizeCheck === null){
				//Set an interval timer that checks the target size and scales as needed.
				//Checking every 10th of a second seems to generate a fairly smooth update.
				var self = this;
				this._resizeCheck = setInterval(function(){self._size();}, 100);
			}
		}
	},

	_cloneStyles: function(list){
		// summary:
		//		Internal function to clone a set of styles from the target to
		//		the underlay.
		// list: Array
		//		An array of style names to clone.
		//
		// tags:
		//		private
		array.forEach(list, function(s){
			domStyle.set(this._underlayNode, s, domStyle.get(this.target, s));
		}, this);
	},

	_fadeIn: function(){
		// summary:
		//		Internal function that does the opacity style fade in animation.
		// tags:
		//		private
		var self = this;
		var underlayNodeAnim = baseFx.animateProperty({
			duration: self.duration,
			node: self._underlayNode,
			properties: {opacity: {start: 0, end: self.opacity}}
		});
		var imageAnim = baseFx.animateProperty({
			duration: self.duration,
			node: self._centerNode,
			properties: {opacity: {start: 0, end: 1}},
			onEnd: function(){
				self.onShow();
				delete self._anim;
			}
		});
		this._anim = fx.combine([underlayNodeAnim,imageAnim]);
		this._anim.play();
	},

	_fadeOut: function(){
		// summary:
		//		Internal function that does the opacity style fade out animation.
		// tags:
		//		private
		var self = this;
		var underlayNodeAnim = baseFx.animateProperty({
			duration: self.duration,
			node: self._underlayNode,
			properties: {opacity: {start: self.opacity, end: 0}},
			onEnd: function(){
				domStyle.set(this.node,{"display":"none", "zIndex": "-1000"});
			}
		});
		var imageAnim = baseFx.animateProperty({
			duration: self.duration,
			node: self._centerNode,
			properties: {opacity: {start: 1, end: 0}},
			onEnd: function(){
				domStyle.set(this.node,{"display":"none", "zIndex": "-1000"});
				self.onHide();
				self._enableOverflow();
				delete self._anim;
			}
		});
		this._anim = fx.combine([underlayNodeAnim,imageAnim]);
		this._anim.play();
	},

	_ignore: function(e){
		// summary:
		//		Function to ignore events that occur on the overlay.
		// event: Event
		//		The event to halt
		// tags:
		//		private
		if(e){
			event.stop(e);
		}
	},

	_scrollerWidths: function(){
		// summary:
		//		This function will calculate the size of the vertical and
		//		horizontaol scrollbars.
		// returns:
		//		Object of form: {v: Number, h: Number} where v is vertical scrollbar width
		//		and h is horizontal scrollbar width.
		// tags:
		//		private
		var div = construct.create("div");
		domStyle.set(div, {
			position: "absolute",
			opacity: 0,
			overflow: "hidden",
			width: "50px",
			height: "50px",
			zIndex: "-100",
			top: "-200px",
			padding: "0px",
			margin: "0px"
		});
		var iDiv = construct.create("div");
		domStyle.set(iDiv, {
			width: "200px",
			height: "10px"
		});
		div.appendChild(iDiv);
		baseWindow.body().appendChild(div);

		//Figure out content size before and after
		//scrollbars are there, then just subtract to
		//get width.
		var b = geometry.getContentBox(div);
		domStyle.set(div, "overflow", "scroll");
		var a = geometry.getContentBox(div);
		baseWindow.body().removeChild(div);
		return { v: b.w - a.w, h: b.h - a.h };
	},

	/* The following are functions that tie into _Widget.attr() */

	_setTextAttr: function(text){
		// summary:
		//		Function to allow widget.attr to set the text displayed in center
		//		if using text display.
		// text: String
		//		The text to set.
		this._textNode.innerHTML = text;
		this.text = text;
	},

	_setColorAttr: function(c){
		// summary:
		//		Function to allow widget.attr to set the color used for the translucent
		//		div overlay.
		// c: String
		//		The color to set the background underlay to in #XXXXXX format..
		domStyle.set(this._underlayNode, "backgroundColor", c);
		this.color = c;
	},

	_setImageTextAttr: function(text){
		// summary:
		//		Function to allow widget.attr to set the ALT text text displayed for
		//		the image (if using image center display).
		// text: String
		//		The text to set.
		attr.set(this._imageNode, "alt", text);
		this.imageText = text;
	},

	_setImageAttr: function(url){
		// summary:
		//		Function to allow widget.attr to set the url source for the center image
		// text: String
		//		The url to set for the image.
		attr.set(this._imageNode, "src", url);
		this.image = url;
	},

	_setCenterIndicatorAttr: function(indicator){
		// summary:
		//		Function to allow widget.attr to set the node used for the center indicator,
		//		either the image or the text.
		// indicator: String
		//		The indicator to use, either 'image' or 'text'.
		this.centerIndicator = indicator;
		if(indicator === "image"){
			this._centerNode = this._imageNode;
			domStyle.set(this._textNode, "display", "none");
		}else{
			this._centerNode = this._textNode;
			domStyle.set(this._imageNode, "display", "none");
		}
	},

	_setTargetAttr:function(target){
		// summary:
		//		Function to allow widget.attr to set the target used
		// target: String
		//		The target to use.
	    if(typeof target === "string"){
	        var w = registry.byId(target);
	        this._set("target", w ? w.domNode : dom.byId(target));
	    }
	    else {
			this._set("target", target);
		}
	},

	_disableOverflow: function(){
		 // summary:
		 //		Function to disable scrollbars on the body.  Only used if the overlay
		 //		targets the body or the document.
		 if(this.target === baseWindow.body() || this.target === baseWindow.doc){
			 // Store the overflow state we have to restore later.
			 // IE had issues, so have to check that it's defined.  Ugh.
			 this._overflowDisabled = true;
			 var body = baseWindow.body();
			 if(body.style && body.style.overflow){
				 this._oldOverflow = domStyle.get(body, "overflow");
			 }else{
				 this._oldOverflow = "";
			 }
			 if(has("ie") && !has("quirks")){
				 // IE will put scrollbars in anyway, html (parent of body)
				 // also controls them in standards mode, so we have to
				 // remove them, argh.
				 if(body.parentNode &&
					body.parentNode.style &&
					body.parentNode.style.overflow){
					 this._oldBodyParentOverflow = body.parentNode.style.overflow;
				 }else{
					 try{
						this._oldBodyParentOverflow = domStyle.get(body.parentNode, "overflow");
					 }catch(e){
						 this._oldBodyParentOverflow = "scroll";
					 }
				 }
				 domStyle.set(body.parentNode, "overflow", "hidden");
			 }
			 domStyle.set(body, "overflow", "hidden");
		 }
	},

	_enableOverflow: function(){
		 // summary:
		 //		Function to restore scrollbars on the body.  Only used if the overlay
		 //		targets the body or the document.
		 if(this._overflowDisabled){
			delete this._overflowDisabled;
			var body = baseWindow.body();
			// Restore all the overflow.
			if(has("ie") && !has("quirks")){
				body.parentNode.style.overflow = this._oldBodyParentOverflow;
				delete this._oldBodyParentOverflow;
			}
			domStyle.set(body, "overflow", this._oldOverflow);
			if(has("webkit")){
				//Gotta poke WebKit, or scrollers don't come back. :-(
				var div = construct.create("div", { style: {
						height: "2px"
					}
				});
				body.appendChild(div);
				setTimeout(function(){
					body.removeChild(div);
				}, 0);
			}
			delete this._oldOverflow;
		}
	}
});

}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);