(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dijit/form/Textarea":"./node_modules/dijit/form/Textarea.js",
	"dijit/form/_ExpandingTextAreaMixin":"./node_modules/dijit/form/_ExpandingTextAreaMixin.js",
	"dojo/i18n!dojox/form/nls/PasswordValidator":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojox/form/nls/PasswordValidator.js",
	"dojox/form/nls/PasswordValidator":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=bs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-tw!./node_modules/dojox/form/nls/PasswordValidator.js",
	"dojo/text!dojox/form/resources/PasswordValidator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dojox/form/resources/PasswordValidator.html",
	"dojox/form/PasswordValidator":"./node_modules/dojox/form/PasswordValidator.js",
	"dojox/form/nls/bs/PasswordValidator":"./node_modules/dojox/form/nls/bs/PasswordValidator.js",
	"dojox/form/nls/es/PasswordValidator":"./node_modules/dojox/form/nls/es/PasswordValidator.js",
	"dojox/form/nls/hr/PasswordValidator":"./node_modules/dojox/form/nls/hr/PasswordValidator.js",
	"dojox/form/nls/hu/PasswordValidator":"./node_modules/dojox/form/nls/hu/PasswordValidator.js",
	"dojox/form/nls/pt/PasswordValidator":"./node_modules/dojox/form/nls/pt/PasswordValidator.js",
	"dojox/form/nls/sr/PasswordValidator":"./node_modules/dojox/form/nls/sr/PasswordValidator.js",
	"dojox/form/nls/zh-tw/PasswordValidator":"./node_modules/dojox/form/nls/zh-tw/PasswordValidator.js",
	"dojox/form/nls/zh/PasswordValidator":"./node_modules/dojox/form/nls/zh/PasswordValidator.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

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

/***/ "./node_modules/dijit/form/Textarea.js":
/*!*********************************************!*\
  !*** ./node_modules/dijit/form/Textarea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"), // domStyle.set
	__webpack_require__(/*! ./_ExpandingTextAreaMixin */ "./node_modules/dijit/form/_ExpandingTextAreaMixin.js"),
	__webpack_require__(/*! ./SimpleTextarea */ "./node_modules/dijit/form/SimpleTextarea.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domStyle, _ExpandingTextAreaMixin, SimpleTextarea){

	// module:
	//		dijit/form/Textarea

	return declare("dijit.form.Textarea", [SimpleTextarea, _ExpandingTextAreaMixin], {
		// summary:
		//		A textarea widget that adjusts it's height according to the amount of data.
		//
		// description:
		//		A textarea that dynamically expands/contracts (changing it's height) as
		//		the user types, to display all the text without requiring a scroll bar.
		//
		//		Takes nearly all the parameters (name, value, etc.) that a vanilla textarea takes.
		//		Rows is not supported since this widget adjusts the height.


		// TODO: for 2.0, rename this to ExpandingTextArea, and rename SimpleTextarea to TextArea

		baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea",

		// Override SimpleTextArea.cols to default to width:100%, for backward compatibility
		cols: "",

		buildRendering: function(){
			this.inherited(arguments);

			// tweak textarea style to reduce browser differences
			domStyle.set(this.textbox, { overflowY: 'hidden', overflowX: 'auto', boxSizing: 'border-box', MsBoxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box' });
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_ExpandingTextAreaMixin.js":
/*!************************************************************!*\
  !*** ./node_modules/dijit/form/_ExpandingTextAreaMixin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), // domConstruct.create
	__webpack_require__(/*! dojo/has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/_base/window */ "./node_modules/dojo/_base/window.js"), // win.body
	__webpack_require__(/*! ../Viewport */ "./node_modules/dijit/Viewport.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domConstruct, has, lang, on, win, Viewport){

	// module:
	//		dijit/form/_ExpandingTextAreaMixin

	// feature detection, true for mozilla and webkit
	has.add("textarea-needs-help-shrinking", function(){
		var body = win.body(),	// note: if multiple documents exist, doesn't matter which one we use
			te = domConstruct.create('textarea', {
			rows:"5",
			cols:"20",
			value: ' ',
			style: {zoom:1, fontSize:"12px", height:"96px", overflow:'hidden', visibility:'hidden', position:'absolute', border:"5px solid white", margin:"0", padding:"0", boxSizing: 'border-box', MsBoxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box' }
		}, body, "last");
		var needsHelpShrinking = te.scrollHeight >= te.clientHeight;
		body.removeChild(te);
		return needsHelpShrinking;
	});

	return declare("dijit.form._ExpandingTextAreaMixin", null, {
		// summary:
		//		Mixin for textarea widgets to add auto-expanding capability

		_setValueAttr: function(){
			this.inherited(arguments);
			this.resize();
		},

		postCreate: function(){
			this.inherited(arguments);
			var textarea = this.textbox;
			textarea.style.overflowY = "hidden";
			this.own(on(textarea, "focus, resize", lang.hitch(this, "_resizeLater")));
		},

		startup: function(){ 
			this.inherited(arguments);
			this.own(Viewport.on("resize", lang.hitch(this, "_resizeLater")));
			this._resizeLater();
		},

		_onInput: function(e){
			this.inherited(arguments);
			this.resize();
		},

		_estimateHeight: function(){
			// summary:
			//		Approximate the height when the textarea is invisible with the number of lines in the text.
			//		Fails when someone calls setValue with a long wrapping line, but the layout fixes itself when the user clicks inside so . . .
			//		In IE, the resize event is supposed to fire when the textarea becomes visible again and that will correct the size automatically.
			//
			var textarea = this.textbox;
			// #rows = #newlines+1
			textarea.rows = (textarea.value.match(/\n/g) || []).length + 1;
		},

		_resizeLater: function(){
			this.defer("resize");
		},

		resize: function(){
			// summary:
			//		Resizes the textarea vertically (should be called after a style/value change)

			var textarea = this.textbox;

			function textareaScrollHeight(){
				var empty = false;
				if(textarea.value === ''){
					textarea.value = ' ';
					empty = true;
				}
				var sh = textarea.scrollHeight;
				if(empty){ textarea.value = ''; }
				return sh;
			}

			if(textarea.style.overflowY == "hidden"){ textarea.scrollTop = 0; }
			if(this.busyResizing){ return; }
			this.busyResizing = true;
			if(textareaScrollHeight() || textarea.offsetHeight){
				var newH = textareaScrollHeight() + Math.max(textarea.offsetHeight - textarea.clientHeight, 0);
				var newHpx = newH + "px";
				if(newHpx != textarea.style.height){
					textarea.style.height = newHpx;
					textarea.rows = 1; // rows can act like a minHeight if not cleared
				}
				if(has("textarea-needs-help-shrinking")){
					var	origScrollHeight = textareaScrollHeight(),
						newScrollHeight = origScrollHeight,
						origMinHeight = textarea.style.minHeight,
						decrement = 4, // not too fast, not too slow
						thisScrollHeight,
						origScrollTop = textarea.scrollTop;
					textarea.style.minHeight = newHpx; // maintain current height
					textarea.style.height = "auto"; // allow scrollHeight to change
					while(newH > 0){
						textarea.style.minHeight = Math.max(newH - decrement, 4) + "px";
						thisScrollHeight = textareaScrollHeight();
						var change = newScrollHeight - thisScrollHeight;
						newH -= change;
						if(change < decrement){
							break; // scrollHeight didn't shrink
						}
						newScrollHeight = thisScrollHeight;
						decrement <<= 1;
					}
					textarea.style.height = newH + "px";
					textarea.style.minHeight = origMinHeight;
					textarea.scrollTop = origScrollTop;
				}
				textarea.style.overflowY = textareaScrollHeight() > textarea.clientHeight ? "auto" : "hidden";
				if(textarea.style.overflowY == "hidden"){ textarea.scrollTop = 0; }
			}else{
				// hidden content of unknown size
				this._estimateHeight();
			}
			this.busyResizing = false;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojox/form/nls/PasswordValidator.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n!./node_modules/dojox/form/nls/PasswordValidator.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/dojox/form/nls/bs/PasswordValidator.js?absMid=dojox/form/nls/bs/PasswordValidator */ "./node_modules/dojox/form/nls/bs/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/es/PasswordValidator.js?absMid=dojox/form/nls/es/PasswordValidator */ "./node_modules/dojox/form/nls/es/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/hr/PasswordValidator.js?absMid=dojox/form/nls/hr/PasswordValidator */ "./node_modules/dojox/form/nls/hr/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/hu/PasswordValidator.js?absMid=dojox/form/nls/hu/PasswordValidator */ "./node_modules/dojox/form/nls/hu/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/pt/PasswordValidator.js?absMid=dojox/form/nls/pt/PasswordValidator */ "./node_modules/dojox/form/nls/pt/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/sr/PasswordValidator.js?absMid=dojox/form/nls/sr/PasswordValidator */ "./node_modules/dojox/form/nls/sr/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/zh/PasswordValidator.js?absMid=dojox/form/nls/zh/PasswordValidator */ "./node_modules/dojox/form/nls/zh/PasswordValidator.js");
__webpack_require__(/*! ./node_modules/dojox/form/nls/zh-tw/PasswordValidator.js?absMid=dojox/form/nls/zh-tw/PasswordValidator */ "./node_modules/dojox/form/nls/zh-tw/PasswordValidator.js");
__webpack_require__(/*! dojo/i18nRootModifier?absMid=dojox/form/nls/PasswordValidator&bundledLocales=bs|es|hr|hu|pt|sr|zh|zh-tw!dojox/form/nls/PasswordValidator */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=bs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-tw!./node_modules/dojox/form/nls/PasswordValidator.js");
var req = __webpack_require__.dj.c();
module.exports = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js")("dojox/form/nls/PasswordValidator", req);

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=bs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-tw!./node_modules/dojox/form/nls/PasswordValidator.js":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier?bundledLocales=bs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-tw!./node_modules/dojox/form/nls/PasswordValidator.js ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
 "root": {
  "nomatchMessage": "Passwords do not match.",
  "badPasswordMessage": "Invalid Password."
 },
 "bs": true,
 "mk": false,
 "sr": true,
 "ar": false,
 "az": false,
 "bg": false,
 "ca": false,
 "cs": false,
 "da": false,
 "de": false,
 "eu": false,
 "el": false,
 "es": true,
 "fi": false,
 "fr": false,
 "he": false,
 "hu": true,
 "hr": true,
 "it": false,
 "id": false,
 "ja": false,
 "kk": false,
 "ko": false,
 "nb": false,
 "nl": false,
 "pl": false,
 "pt-pt": false,
 "pt": true,
 "ro": false,
 "ru": false,
 "sk": false,
 "sl": false,
 "sv": false,
 "th": false,
 "tr": false,
 "uk": false,
 "zh": true,
 "zh-tw": true
})

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dojox/form/resources/PasswordValidator.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dojox/form/resources/PasswordValidator.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div dojoAttachPoint=\"containerNode\">\n\t<input type=\"hidden\" name=\"${name}\" value=\"\" dojoAttachPoint=\"focusNode\" />\n</div>"

/***/ }),

/***/ "./node_modules/dojox/form/PasswordValidator.js":
/*!******************************************************!*\
  !*** ./node_modules/dojox/form/PasswordValidator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
	__webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"),
	__webpack_require__(/*! dijit/form/_FormValueWidget */ "./node_modules/dijit/form/_FormValueWidget.js"),
	__webpack_require__(/*! dijit/form/ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js"),
	__webpack_require__(/*! dojo/text!./resources/PasswordValidator.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dojox/form/resources/PasswordValidator.html"),
	__webpack_require__(/*! dojo/i18n!./nls/PasswordValidator */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojox/form/nls/PasswordValidator.js"),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, lang, domAttr, i18n, query, keys, FormValueWidget, ValidationTextBox, template, formNlsPasswordValidator, declare){

var _ChildTextBox = declare("dojox.form._ChildTextBox", ValidationTextBox, {
	// summary:
	//		A class that is shared between all our children - extends
	//		ValidationTextBox and provides some shared functionality

	// containerWidget: widget
	//		Our parent (the PasswordValidator)
	containerWidget: null,

	// type: string
	//		Don't override this - we are all "password" types
	type: "password",

	reset: function(){
		// summary:
		//		Force-set to empty string (we don't save passwords EVER)...and
		//		since _OldPWBox overrides _setValueAttr to check for empty string,
		//		call our parent class directly (not this.inherited())
		ValidationTextBox.prototype._setValueAttr.call(this, "", true);
		this._hasBeenBlurred = false;
	},

	postCreate: function(){
		// summary:
		//		We want to remove the "name" attribute from our focus node if
		//		we don't have one set - this prevents all our extra values
		//		from being posted on submit
		this.inherited(arguments);
		if(!this.name){
			domAttr.remove(this.focusNode, "name");
		}
		this.connect(this.focusNode, "onkeypress", "_onChildKeyPress");
	},

	_onChildKeyPress: function(e){
		// Check if we pressed <enter> - if so, set our blur value so that
		// the parent widget will be updated correctly.
		if(e && e.keyCode == keys.ENTER){
			this._setBlurValue();
		}
	}
});



var _OldPWBox = declare("dojox.form._OldPWBox", _ChildTextBox, {
	// summary:
	//		A class representing our "old password" box.
	//
	// _isPWValid: boolean
	//		Whether or not the password is valid
	_isPWValid: false,

	_setValueAttr: function(/*anything*/ newVal, /*Boolean?*/ priority){
		// summary:
		//		Updates _isPWValid if this isn't our initial update by calling
		//		our PasswordValidator's pwCheck function
		if(newVal === ""){
			newVal = _OldPWBox.superclass.attr.call(this, "value");
		}
		if(priority !== null){
			// Priority is passed in as null, explicitly when this is an
			// update (not initially set).  We want to check our password now.
			this._isPWValid = this.containerWidget.pwCheck(newVal);
		}
		this.inherited(arguments);
		// Trigger the containerWidget to recheck its value, if needed
		this.containerWidget._childValueAttr(this.containerWidget._inputWidgets[1].get("value"));
	},

	isValid: function(/*Boolean*/ isFocused){
		// Take into account the isPWValid setting
		return this.inherited("isValid", arguments) && this._isPWValid;
	},

	_update: function(/*Event*/ e){
		// Only call validate() if we've been blurred or else we get popups
		// too early.
		if(this._hasBeenBlurred){ this.validate(true); }
		this._onMouse(e);
	},

	_getValueAttr: function(){
		if(this.containerWidget._started && this.containerWidget.isValid()){
			return this.inherited(arguments);
		}
		return "";
	},

	_setBlurValue: function(){
		// TextBox._setBlurValue calls this._setValueAttr(this.get('value'), ...)
		// Because we are overriding _getValueAttr to return "" when the containerWidget
		// is not valid, TextBox._setBlurValue will cause OldPWBox's value to be set to ""
		//
		// So, we directly call ValidationTextBox._getValueAttr to bypass our _getValueAttr
		var value = ValidationTextBox.prototype._getValueAttr.call(this);
		this._setValueAttr(value, (this.isValid ? this.isValid() : true));
	}
});


var _NewPWBox = declare("dojox.form._NewPWBox", _ChildTextBox, {
	// summary:
	//		A class representing our new password textbox

	// required: boolean
	//		Whether or not this widget is required (default: true)
	required: true,

	onChange: function(){
		// summary:
		//		Validates our verify box - to make sure that a change to me is
		//		reflected there
		this.containerWidget._inputWidgets[2].validate(false);
		this.inherited(arguments);
	}
});

var _VerifyPWBox = declare("dojox.form._VerifyPWBox", _ChildTextBox, {
	// summary:
	//		A class representing our verify textbox

	isValid: function(isFocused){
		// summary:
		//		Validates that we match the "real" password
		return this.inherited("isValid", arguments) &&
			(this.get("value") == this.containerWidget._inputWidgets[1].get("value"));
	}
});

return declare("dojox.form.PasswordValidator", FormValueWidget, {
	// summary:
	//		A password validation widget that simplifies the "old/new/verify"
	//		style of requesting passwords.  You will probably want to override
	//		this class and implement your own pwCheck function.

	// required: boolean
	//		Whether or not it is required for form submission
	required: true,

	// inputWidgets: TextBox[]
	//		An array of text boxes that are our components
	_inputWidgets: null,

	// oldName: string?
	//		The name to send our old password as (when form is posted)
	oldName: "",

	templateString: template,

	_hasBeenBlurred: false,

	isValid: function(/*Boolean*/ isFocused){
		// summary:
		//		we are valid if ALL our children are valid
		return array.every(this._inputWidgets, function(i){
			if(i && i._setStateClass){ i._setStateClass(); }
			return (!i || i.isValid());
		});
	},

	validate: function(/*Boolean*/ isFocused){
		// summary:
		//		Validating this widget validates all our children
		return array.every(array.map(this._inputWidgets, function(i){
			if(i && i.validate){
				i._hasBeenBlurred = (i._hasBeenBlurred || this._hasBeenBlurred);
				return i.validate();
			}
			return true;
		}, this), function(item){ return item; });
	},

	reset: function(){
		// summary:
		//		Resetting this widget resets all our children
		this._hasBeenBlurred = false;
		array.forEach(this._inputWidgets, function(i){
			if(i && i.reset){ i.reset(); }
		}, this);
	},

	_createSubWidgets: function(){
		// summary:
		//		Turns the inputs inside this widget into "real" validation
		//		widgets - and sets up the needed connections.
		var widgets = this._inputWidgets,
			msg = i18n.getLocalization("dojox.form", "PasswordValidator", this.lang);
		array.forEach(widgets, function(i, idx){
			if(i){
				var p = {containerWidget: this}, c;
				if(idx === 0){
					p.name = this.oldName;
					p.invalidMessage = msg.badPasswordMessage;
					c = _OldPWBox;
				}else if(idx === 1){
					p.required = this.required;
					c = _NewPWBox;
				}else if(idx === 2){
					p.invalidMessage = msg.nomatchMessage;
					c = _VerifyPWBox;
				}
				widgets[idx] = new c(p, i);
			}
		}, this);
	},

	pwCheck: function(/*String*/ password){
		// summary:
		//		Overridable function for validation of the old password box.
		//
		//		This function is called and passed the old password.  Return
		//		true if it's OK to continue, and false if it is not.
		//
		//		IMPORTANT SECURITY NOTE:  Do NOT EVER EVER EVER check this in
		//		HTML or JavaScript!!!
		//
		//		You will probably want to override this function to callback
		//		to a server to verify the password (the callback will need to
		//		be synchronous) - and it's probably a good idea to validate
		//		it again on form submission before actually doing
		//		anything destructive - that's why the "oldName" value
		//		is available.
		//
		//		And don't just fetch the password from the server
		//		either :)  Send the test password (probably hashed, for
		//		security) and return from the server a status instead.
		//
		//		Again - DON'T BE INSECURE!!!  Security is left as an exercise
		//		for the reader :)
		return false;
	},

	postCreate: function(){
		// summary:
		//		Sets up the correct widgets.  You *MUST* specify one child
		//		text box (a simple HTML `<input>` element) with pwType="new"
		//		*and* one child text box with pwType="verify".  You *MAY*
		//		specify a third child text box with pwType="old" in order to
		//		prompt the user to enter in their old password before the
		//		widget returns that it is valid.

		this.inherited(arguments);

		// Turn my inputs into the correct stuff....
		var widgets = this._inputWidgets = [];
		array.forEach(["old","new","verify"], function(i){
			widgets.push(query("input[pwType=" + i + "]", this.containerNode)[0]);
		}, this);
		if(!widgets[1] || !widgets[2]){
			throw new Error("Need at least pwType=\"new\" and pwType=\"verify\"");
		}
		if(this.oldName && !widgets[0]){
			throw new Error("Need to specify pwType=\"old\" if using oldName");
		}
		this.containerNode = this.domNode;
		this._createSubWidgets();
		this.connect(this._inputWidgets[1], "_setValueAttr", "_childValueAttr");
		this.connect(this._inputWidgets[2], "_setValueAttr", "_childValueAttr");
	},

	_childValueAttr: function(v){
		this.set("value", this.isValid() ? v : "");
	},

	_setDisabledAttr: function(value){
		this.inherited(arguments);
		array.forEach(this._inputWidgets, function(i){
			if(i && i.set){ i.set("disabled", value);}
		});
	},

	_setRequiredAttr: function(value){
		this.required = value;
		domAttr.set(this.focusNode, "required", value);
		this.focusNode.setAttribute("aria-required", value);
		array.forEach(this._inputWidgets, function(i){
			if(i && i.set){ i.set("required", value);}
		});
	},

	_setValueAttr: function(v){
		this.inherited(arguments);
		domAttr.set(this.focusNode, "value", v);
	},

	_getValueAttr: function(){
		// Make sure we don't return undefined.... maybe should do conversion in _setValueAttr() instead?
		return this.value||"";
	},

	focus: function(){
		// summary:
		//		places focus on the first invalid input widget - if all
		//		input widgets are valid, the first widget is focused.
		var f = false;
		array.forEach(this._inputWidgets, function(i){
			if(i && !i.isValid() && !f){
				i.focus();
				f = true;
			}
		});
		if(!f){ this._inputWidgets[1].focus(); }
	}
});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/form/nls/bs/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/bs/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {      
//begin v1.x content
        nomatchMessage: "Lozinka ne odgovara.",
	badPasswordMessage: "Nevažeća lozinka."
//end v1.x content
});



/***/ }),

/***/ "./node_modules/dojox/form/nls/es/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/es/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "Las contraseñas no coinciden.",
	badPasswordMessage: "Contraseña no válida."
});


/***/ }),

/***/ "./node_modules/dojox/form/nls/hr/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/hr/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "Lozinke se ne podudaraju.",
	badPasswordMessage: "Neispravna lozinka."
});


/***/ }),

/***/ "./node_modules/dojox/form/nls/hu/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/hu/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "A jelszavak nem egyeznek.",
	badPasswordMessage: "Érvénytelen jelszó."
});


/***/ }),

/***/ "./node_modules/dojox/form/nls/pt/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/pt/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "As senhas não correspondem.",
	badPasswordMessage: "Senha Inválida."
});


/***/ }),

/***/ "./node_modules/dojox/form/nls/sr/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/sr/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {      
//begin v1.x content
        nomatchMessage: "Lozinke se ne podudaraju.",
	badPasswordMessage: "Nevažeća lozinka."
//end v1.x content
});



/***/ }),

/***/ "./node_modules/dojox/form/nls/zh-tw/PasswordValidator.js":
/*!****************************************************************!*\
  !*** ./node_modules/dojox/form/nls/zh-tw/PasswordValidator.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "密碼不符合。",
	badPasswordMessage: "無效的密碼。"
});


/***/ }),

/***/ "./node_modules/dojox/form/nls/zh/PasswordValidator.js":
/*!*************************************************************!*\
  !*** ./node_modules/dojox/form/nls/zh/PasswordValidator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
        nomatchMessage: "密码不匹配。",
	badPasswordMessage: "密码无效。"
});


/***/ })

}]);