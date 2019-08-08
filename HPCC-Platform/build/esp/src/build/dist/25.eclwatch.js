(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/form/MappedTextBox":"./node_modules/dijit/form/MappedTextBox.js",
	"dijit/form/NumberTextBox":"./node_modules/dijit/form/NumberTextBox.js",
	"dijit/form/RangeBoundTextBox":"./node_modules/dijit/form/RangeBoundTextBox.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/dijit/form/MappedTextBox.js":
/*!**************************************************!*\
  !*** ./node_modules/dijit/form/MappedTextBox.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("msapp")
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), // domConstruct.place
	__webpack_require__(/*! ./ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, has, domConstruct, ValidationTextBox){

	// module:
	//		dijit/form/MappedTextBox

	return declare("dijit.form.MappedTextBox", ValidationTextBox, {
		// summary:
		//		A dijit/form/ValidationTextBox subclass which provides a base class for widgets that have
		//		a visible formatted display value, and a serializable
		//		value in a hidden input field which is actually sent to the server.
		// description:
		//		The visible display may
		//		be locale-dependent and interactive.  The value sent to the server is stored in a hidden
		//		input field which uses the `name` attribute declared by the original widget.  That value sent
		//		to the server is defined by the dijit/form/MappedTextBox.serialize() method and is typically
		//		locale-neutral.
		// tags:
		//		protected

		postMixInProperties: function(){
			this.inherited(arguments);

			// We want the name attribute to go to the hidden <input>, not the displayed <input>,
			// so override _FormWidget.postMixInProperties() setting of nameAttrSetting for IE.
			this.nameAttrSetting = "";
		},

		// Remap name attribute to be mapped to hidden node created in buildRendering(), rather than this.focusNode
		_setNameAttr: "valueNode",

		serialize: function(val /*=====, options =====*/){
			// summary:
			//		Overridable function used to convert the get('value') result to a canonical
			//		(non-localized) string.  For example, will print dates in ISO format, and
			//		numbers the same way as they are represented in javascript.
			// val: anything
			// options: Object?
			// tags:
			//		protected extension
			return val.toString ? val.toString() : ""; // String
		},

		toString: function(){
			// summary:
			//		Returns widget as a printable string using the widget's value
			// tags:
			//		protected
			var val = this.filter(this.get('value')); // call filter in case value is nonstring and filter has been customized
			return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; // String
		},

		validate: function(){
			// Overrides `dijit/form/TextBox.validate`
			this.valueNode.value = this.toString();
			return this.inherited(arguments);
		},

		buildRendering: function(){
			// Overrides `dijit/_TemplatedMixin/buildRendering`

			this.inherited(arguments);

			// Create a hidden <input> node with the serialized value used for submit
			// (as opposed to the displayed value).
			// Passing in name as markup rather than relying on _setNameAttr custom setter above
			// to make query(input[name=...]) work on IE. (see #8660).
			// But not doing that for Windows 8 Store apps because it causes a security exception (see #16452).
			this.valueNode = domConstruct.place("<input type='hidden'" +
				((this.name && !has("msapp")) ? ' name="' + this.name.replace(/"/g, "&quot;") + '"' : "") + "/>",
				this.textbox, "after");
		},

		reset: function(){
			// Overrides `dijit/form/ValidationTextBox.reset` to
			// reset the hidden textbox value to ''
			this.valueNode.value = '';
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/NumberTextBox.js":
/*!**************************************************!*\
  !*** ./node_modules/dijit/form/NumberTextBox.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch lang.mixin
	__webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), // i18n.normalizeLocale, i18n.getLocalization
	__webpack_require__(/*! dojo/string */ "./node_modules/dojo/string.js"), // string.rep
	__webpack_require__(/*! dojo/number */ "./node_modules/dojo/number.js"), // number._realNumberRegexp number.format number.parse number.regexp
	__webpack_require__(/*! ./RangeBoundTextBox */ "./node_modules/dijit/form/RangeBoundTextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, lang, i18n, string, number, RangeBoundTextBox){

	// module:
	//		dijit/form/NumberTextBox

	// A private helper function to determine decimal information
	// Returns an object with "sep" and "places" properties
	var getDecimalInfo = function(constraints){
		var constraints = constraints || {},
			bundle = i18n.getLocalization("dojo.cldr", "number", i18n.normalizeLocale(constraints.locale)),
			pattern = constraints.pattern ? constraints.pattern : bundle[(constraints.type || "decimal")+"Format"];

		// The number of places in the constraint can be specified in several ways,
		// the resolution order is:
		//
		// 1. If constraints.places is a number, use that
		// 2. If constraints.places is a string, which specifies a range, use the range max (e.g. 0,4)
		// 3. If a pattern is specified, use the implicit number of places in the pattern.
		// 4. If neither constraints.pattern or constraints.places is specified, use the locale default pattern
		var places;
		if(typeof constraints.places == "number"){
			places = constraints.places;
		}else if(typeof constraints.places === "string" && constraints.places.length > 0){
			places = constraints.places.replace(/.*,/, "");
		}else{
			places = (pattern.indexOf(".") != -1 ? pattern.split(".")[1].replace(/[^#0]/g, "").length : 0);
		}

		return { sep: bundle.decimal, places: places };
	};

	var NumberTextBoxMixin = declare("dijit.form.NumberTextBoxMixin", null, {
		// summary:
		//		A mixin for all number textboxes
		// tags:
		//		protected

		// Override ValidationTextBox.pattern.... we use a reg-ex generating function rather
		// than a straight regexp to deal with locale (plus formatting options too?)
		pattern: function(constraints){
			// if focused, accept either currency data or NumberTextBox format
			return '(' + (this.focused && this.editOptions ? this._regExpGenerator(lang.delegate(constraints, this.editOptions)) + '|' : '')
				+ this._regExpGenerator(constraints) + ')';
		},

		/*=====
		// constraints: NumberTextBox.__Constraints
		//		Despite the name, this parameter specifies both constraints on the input
		//		(including minimum/maximum allowed values) as well as
		//		formatting options like places (the number of digits to display after
		//		the decimal point).
		constraints: {},
		======*/

		// value: Number
		//		The value of this NumberTextBox as a Javascript Number (i.e., not a String).
		//		If the displayed value is blank, the value is NaN, and if the user types in
		//		an gibberish value (like "hello world"), the value is undefined
		//		(i.e. get('value') returns undefined).
		//
		//		Symmetrically, set('value', NaN) will clear the displayed value,
		//		whereas set('value', undefined) will have no effect.
		value: NaN,

		// editOptions: [protected] Object
		//		Properties to mix into constraints when the value is being edited.
		//		This is here because we edit the number in the format "12345", which is
		//		different than the display value (ex: "12,345")
		editOptions: { pattern: '#.######' },

		/*=====
		_formatter: function(value, options){
			// summary:
			//		_formatter() is called by format().  It's the base routine for formatting a number,
			//		as a string, for example converting 12345 into "12,345".
			// value: Number
			//		The number to be converted into a string.
			// options: number.__FormatOptions?
			//		Formatting options
			// tags:
			//		protected extension

			return "12345";		// String
		},
		 =====*/
		_formatter: number.format,

		/*=====
		_regExpGenerator: function(constraints){
			// summary:
			//		Generate a localized regular expression as a string, according to constraints.
			// constraints: number.__ParseOptions
			//		Formatting options
			// tags:
			//		protected

			return "(\d*).(\d*)";	// string
		},
		=====*/
		_regExpGenerator: number.regexp,

		// _decimalInfo: Object
		// summary:
		//		An object containing decimal related properties relevant to this TextBox.
		// tags:
		//		private
		_decimalInfo: getDecimalInfo(),

		postMixInProperties: function(){
			this.inherited(arguments);
			this._set("type", "text"); // in case type="number" was specified which messes up parse/format
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			var places = typeof constraints.places == "number"? constraints.places : 0;
			if(places){ places++; } // decimal rounding errors take away another digit of precision
			if(typeof constraints.max != "number"){
				constraints.max = 9 * Math.pow(10, 15-places);
			}
			if(typeof constraints.min != "number"){
				constraints.min = -9 * Math.pow(10, 15-places);
			}
			this.inherited(arguments, [ constraints ]);
			if(this.focusNode && this.focusNode.value && !isNaN(this.value)){
				this.set('value', this.value);
			}
			// Capture decimal information based on the constraint locale and pattern.
			this._decimalInfo = getDecimalInfo(constraints);
		},

		_onFocus: function(/*String*/ by){
			if(this.disabled || this.readOnly){ return; }
			var val = this.get('value');
			if(typeof val == "number" && !isNaN(val)){
				var formattedValue = this.format(val, this.constraints);
				if(formattedValue !== undefined){
					this.textbox.value = formattedValue;
					// when NumberTextBox or descendants (i.e. CurrencyTextBox) format textbox.value when focused
					// all browsers except Chrome will select textbox contents when tabbed to by keyboard
					// force selection if not focused by mouse
					if (by !== "mouse") {
						this.textbox.select();
					}
				}
			}
			this.inherited(arguments);
		},

		format: function(/*Number*/ value, /*number.__FormatOptions*/ constraints){
			// summary:
			//		Formats the value as a Number, according to constraints.
			// tags:
			//		protected

			var formattedValue = String(value);
			if(typeof value != "number"){ return formattedValue; }
			if(isNaN(value)){ return ""; }
			// check for exponential notation that dojo/number.format() chokes on
			if(!("rangeCheck" in this && this.rangeCheck(value, constraints)) && constraints.exponent !== false && /\de[-+]?\d/i.test(formattedValue)){
				return formattedValue;
			}
			if(this.editOptions && this.focused){
				constraints = lang.mixin({}, constraints, this.editOptions);
			}
			return this._formatter(value, constraints);
		},

		/*=====
		_parser: function(value, constraints){
			// summary:
			//		Parses the string value as a Number, according to constraints.
			// value: String
			//		String representing a number
			// constraints: number.__ParseOptions
			//		Formatting options
			// tags:
			//		protected

			return 123.45;		// Number
		},
		=====*/
		_parser: number.parse,

		parse: function(/*String*/ value, /*number.__FormatOptions*/ constraints){
			// summary:
			//		Replaceable function to convert a formatted string to a number value
			// tags:
			//		protected extension
			var parserOptions = lang.mixin({}, constraints, (this.editOptions && this.focused) ? this.editOptions : {})
			if(this.focused && parserOptions.places != null /* or undefined */){
				var places = parserOptions.places;
				var maxPlaces = typeof places === "number" ? places : Number(places.split(",").pop()); // handle number and range
				parserOptions.places = "0," + maxPlaces;
			}
			var v = this._parser(value, parserOptions);
			if(this.editOptions && this.focused && isNaN(v)){
				v = this._parser(value, constraints); // parse w/o editOptions: not technically needed but is nice for the user
			}
			return v;
		},

		_getDisplayedValueAttr: function(){
			var v = this.inherited(arguments);
			return isNaN(v) ? this.textbox.value : v;
		},

		filter: function(/*Number*/ value){
			// summary:
			//		This is called with both the display value (string), and the actual value (a number).
			//		When called with the actual value it does corrections so that '' etc. are represented as NaN.
			//		Otherwise it dispatches to the superclass's filter() method.
			//
			//		See `dijit/form/TextBox.filter()` for more details.
			if(value == null  /* or undefined */ || typeof value == "string" && value ==''){
				return NaN;
			}else if(typeof value == "number" && !isNaN(value) && value != 0){
				value = number.round(value, this._decimalInfo.places);
			}
			return this.inherited(arguments, [value]);
		},

		serialize: function(/*Number*/ value, /*Object?*/ options){
			// summary:
			//		Convert value (a Number) into a canonical string (ie, how the number literal is written in javascript/java/C/etc.)
			// tags:
			//		protected
			return (typeof value != "number" || isNaN(value)) ? '' : this.inherited(arguments);
		},

		_setBlurValue: function(){
			var val = lang.hitch(lang.delegate(this, { focused: true }), "get")('value'); // parse with editOptions
			this._setValueAttr(val, true);
		},

		_setValueAttr: function(/*Number*/ value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			// summary:
			//		Hook so set('value', ...) works.
			if(value !== undefined && formattedValue === undefined){
				formattedValue = String(value);
				if(typeof value == "number"){
					if(isNaN(value)){ formattedValue = '' }
					// check for exponential notation that number.format chokes on
					else if(("rangeCheck" in this && this.rangeCheck(value, this.constraints)) || this.constraints.exponent === false || !/\de[-+]?\d/i.test(formattedValue)){
						formattedValue = undefined; // lets format compute a real string value
					}
				}else if(!value){ // 0 processed in if branch above, ''|null|undefined flows through here
					formattedValue = '';
					value = NaN;
				}else{ // non-numeric values
					value = undefined;
				}
			}
			this.inherited(arguments, [value, priorityChange, formattedValue]);
		},

		_getValueAttr: function(){
			// summary:
			//		Hook so get('value') works.
			//		Returns Number, NaN for '', or undefined for unparseable text
			var v = this.inherited(arguments); // returns Number for all values accepted by parse() or NaN for all other displayed values

			// If the displayed value of the textbox is gibberish (ex: "hello world"), this.inherited() above
			// returns NaN; this if() branch converts the return value to undefined.
			// Returning undefined prevents user text from being overwritten when doing _setValueAttr(_getValueAttr()).
			// A blank displayed value is still returned as NaN.
			if(isNaN(v) && this.textbox.value !== ''){
				if(this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value) && (new RegExp("^"+number._realNumberRegexp(lang.delegate(this.constraints))+"$").test(this.textbox.value))){	// check for exponential notation that parse() rejected (erroneously?)
					var n = Number(this.textbox.value);
					return isNaN(n) ? undefined : n; // return exponential Number or undefined for random text (may not be possible to do with the above RegExp check)
				}else{
					return undefined; // gibberish
				}
			}else{
				return v; // Number or NaN for ''
			}
		},

		isValid: function(/*Boolean*/ isFocused){
			// Overrides dijit/form/RangeBoundTextBox.isValid() to check that the editing-mode value is valid since
			// it may not be formatted according to the regExp validation rules
			if(!this.focused || this._isEmpty(this.textbox.value)){
				return this.inherited(arguments);
			}else{
				var v = this.get('value');
				if(!isNaN(v) && this.rangeCheck(v, this.constraints)){
					if(this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value)){ // exponential, parse doesn't like it
						return true; // valid exponential number in range
					}else{
						return this.inherited(arguments);
					}
				}else{
					return false;
				}
			}
		},

		_isValidSubset: function(){
			// Overrides dijit/form/ValidationTextBox._isValidSubset()
			//
			// The inherited method only checks that the computed regex pattern is valid, which doesn't
			// take into account that numbers are a special case. Specifically:
			//
			//  (1) An arbitrary amount of leading or trailing zero's can be ignored.
			//  (2) Since numeric input always occurs in the order of most significant to least significant
			//      digits, the maximum and minimum possible values for partially inputted numbers can easily
			//      be determined by using the number of remaining digit spaces available.
			//
			// For example, if an input has a maxLength of 5, and a min value of greater than 100, then the subset
			// is invalid if there are 3 leading 0s. It remains valid for the first two.
			//
			// Another example is if the min value is 1.1. Once a value of 1.0 is entered, no additional trailing digits
			// could possibly satisify the min requirement.
			//
			// See ticket #17923
			var hasMinConstraint = (typeof this.constraints.min == "number"),
				hasMaxConstraint = (typeof this.constraints.max == "number"),
				curVal = this.get('value');

			// If there is no parsable number, or there are no min or max bounds, then we can safely
			// skip all remaining checks
			if(isNaN(curVal) || (!hasMinConstraint && !hasMaxConstraint)){
				return this.inherited(arguments);
			}

			// This block picks apart the values in the text box to be used later to compute the min and max possible
			// values based on the current value and the remaining available digits.
			//
			// Warning: The use of a "num|0" expression, can be confusing. See the link below
			// for an explanation.
			//
			// http://stackoverflow.com/questions/12125421/why-does-a-shift-by-0-truncate-the-decimal
			var integerDigits = curVal|0,
				valNegative = curVal < 0,
				// Check if the current number has a decimal based on its locale
				hasDecimal = this.textbox.value.indexOf(this._decimalInfo.sep) != -1,
				// Determine the max digits based on the textbox length. If no length is
				// specified, chose a huge number to account for crazy formatting.
				maxDigits = this.maxLength || 20,
				// Determine the remaining digits, based on the max digits
				remainingDigitsCount = maxDigits - this.textbox.value.length,
				// avoid approximation issues by capturing the decimal portion of the value as the user-entered string
				fractionalDigitStr = hasDecimal ? this.textbox.value.split(this._decimalInfo.sep)[1].replace(/[^0-9]/g, "") : "";

			// Create a normalized value string in the form of #.###
			var normalizedValueStr = hasDecimal ? integerDigits+"."+fractionalDigitStr : integerDigits+"";

			// The min and max values for the field can be determined using the following
			// logic:
			//
			//  If the number is positive:
			//      min value = the current value
			//      max value = the current value with 9s appended for all remaining possible digits
			//  else
			//      min value = the current value with 9s appended for all remaining possible digits
			//      max value = the current value
			//
			var ninePaddingStr = string.rep("9", remainingDigitsCount),
			    minPossibleValue = curVal,
			    maxPossibleValue = curVal;
			if (valNegative){
				minPossibleValue = Number(normalizedValueStr+ninePaddingStr);
			} else{
				maxPossibleValue = Number(normalizedValueStr+ninePaddingStr);
			}

			return !((hasMinConstraint && maxPossibleValue < this.constraints.min)
					|| (hasMaxConstraint && minPossibleValue > this.constraints.max));
		}
	});

	var NumberTextBox = declare("dijit.form.NumberTextBox", [RangeBoundTextBox, NumberTextBoxMixin], {
		// summary:
		//		A TextBox for entering numbers, with formatting and range checking
		// description:
		//		NumberTextBox is a textbox for entering and displaying numbers, supporting
		//		the following main features:
		//
		//		1. Enforce minimum/maximum allowed values (as well as enforcing that the user types
		//			a number rather than a random string)
		//		2. NLS support (altering roles of comma and dot as "thousands-separator" and "decimal-point"
		//			depending on locale).
		//		3. Separate modes for editing the value and displaying it, specifically that
		//			the thousands separator character (typically comma) disappears when editing
		//			but reappears after the field is blurred.
		//		4. Formatting and constraints regarding the number of places (digits after the decimal point)
		//			allowed on input, and number of places displayed when blurred (see `constraints` parameter).

		baseClass: "dijitTextBox dijitNumberTextBox"
	});

	NumberTextBox.Mixin = NumberTextBoxMixin;	// for monkey patching

	/*=====
	 NumberTextBox.__Constraints = declare([RangeBoundTextBox.__Constraints, number.__FormatOptions, number.__ParseOptions], {
		 // summary:
		 //		Specifies both the rules on valid/invalid values (minimum, maximum,
		 //		number of required decimal places), and also formatting options for
		 //		displaying the value when the field is not focused.
		 // example:
		 //		Minimum/maximum:
		 //		To specify a field between 0 and 120:
		 //	|		{min:0,max:120}
		 //		To specify a field that must be an integer:
		 //	|		{fractional:false}
		 //		To specify a field where 0 to 3 decimal places are allowed on input:
		 //	|		{places:'0,3'}
	 });
	 =====*/

	return NumberTextBox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/RangeBoundTextBox.js":
/*!******************************************************!*\
  !*** ./node_modules/dijit/form/RangeBoundTextBox.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), // i18n.getLocalization
	__webpack_require__(/*! ./MappedTextBox */ "./node_modules/dijit/form/MappedTextBox.js"),
	__webpack_require__(/*! dojo/i18n!./nls/validate */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dijit/form/nls/validate.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, i18n, MappedTextBox){

	// module:
	//		dijit/form/RangeBoundTextBox


	var RangeBoundTextBox = declare("dijit.form.RangeBoundTextBox", MappedTextBox, {
		// summary:
		//		Base class for textbox form widgets which defines a range of valid values.

		// rangeMessage: String
		//		The message to display if value is out-of-range
		rangeMessage: "",

		/*=====
		// constraints: RangeBoundTextBox.__Constraints
		constraints: {},
		======*/

		rangeCheck: function(/*Number*/ primitive, /*dijit/form/RangeBoundTextBox.__Constraints*/ constraints){
			// summary:
			//		Overridable function used to validate the range of the numeric input value.
			// tags:
			//		protected
			return	("min" in constraints? (this.compare(primitive,constraints.min) >= 0) : true) &&
				("max" in constraints? (this.compare(primitive,constraints.max) <= 0) : true); // Boolean
		},

		isInRange: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Tests if the value is in the min/max range specified in constraints
			// tags:
			//		protected
			return this.rangeCheck(this.get('value'), this.constraints);
		},

		_isDefinitelyOutOfRange: function(){
			// summary:
			//		Returns true if the value is out of range and will remain
			//		out of range even if the user types more characters
			var val = this.get('value');
			if(val == null){ return false; } // not yet valid enough to compare to
			var outOfRange = false;
			if("min" in this.constraints){
				var min = this.constraints.min;
				outOfRange = this.compare(val, ((typeof min == "number") && min >= 0 && val != 0) ? 0 : min) < 0;
			}
			if(!outOfRange && ("max" in this.constraints)){
				var max = this.constraints.max;
				outOfRange = this.compare(val, ((typeof max != "number") || max > 0) ? max : 0) > 0;
			}
			return outOfRange;
		},

		_isValidSubset: function(){
			// summary:
			//		Overrides `dijit/form/ValidationTextBox._isValidSubset()`.
			//		Returns true if the input is syntactically valid, and either within
			//		range or could be made in range by more typing.
			return this.inherited(arguments) && !this._isDefinitelyOutOfRange();
		},

		isValid: function(/*Boolean*/ isFocused){
			// Overrides dijit/form/ValidationTextBox.isValid() to check that the value is also in range.
			return this.inherited(arguments) &&
				((this._isEmpty(this.textbox.value) && !this.required) || this.isInRange(isFocused)); // Boolean
		},

		getErrorMessage: function(/*Boolean*/ isFocused){
			// Overrides dijit/form/ValidationTextBox.getErrorMessage() to print "out of range" message if appropriate
			var v = this.get('value');
			if(v != null /* and !undefined */ && v !== '' && (typeof v != "number" || !isNaN(v)) && !this.isInRange(isFocused)){ // don't check isInRange w/o a real value
				return this.rangeMessage; // String
			}
			return this.inherited(arguments);
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			if(!this.rangeMessage){
				this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
				this.rangeMessage = this.messages.rangeMessage;
			}
		}
	});
	/*=====
	RangeBoundTextBox.__Constraints = declare(null, {
		// min: Number
		//		Minimum signed value.  Default is -Infinity
		// max: Number
		//		Maximum signed value.  Default is +Infinity
	});
	=====*/
	return RangeBoundTextBox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);