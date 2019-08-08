(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/form/ComboBox":"./node_modules/dijit/form/ComboBox.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dojo/request/script":"./node_modules/dojo/request/script.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

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