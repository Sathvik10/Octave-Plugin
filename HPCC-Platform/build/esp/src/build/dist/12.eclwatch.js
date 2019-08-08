(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/MenuSeparator":"./node_modules/dijit/MenuSeparator.js",
	"dijit/form/Select":"./node_modules/dijit/form/Select.js",
	"dijit/form/_FormSelectWidget":"./node_modules/dijit/form/_FormSelectWidget.js",
	"dojo/text!dijit/form/templates/Select.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/Select.html",
	"dojo/text!dijit/templates/MenuSeparator.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html",
	"dojo/data/util/sorter":"./node_modules/dojo/data/util/sorter.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

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

/***/ "./node_modules/dijit/form/Select.js":
/*!*******************************************!*\
  !*** ./node_modules/dijit/form/Select.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.forEach
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"), // domAttr.set
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add domClass.remove domClass.toggle
	__webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"), // domGeometry.setMarginBox
	__webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), // i18n.getLocalization
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie")
	__webpack_require__(/*! ./_FormSelectWidget */ "./node_modules/dijit/form/_FormSelectWidget.js"),
	__webpack_require__(/*! ../_HasDropDown */ "./node_modules/dijit/_HasDropDown.js"),
	__webpack_require__(/*! ../DropDownMenu */ "./node_modules/dijit/DropDownMenu.js"),
	__webpack_require__(/*! ../MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! ../MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
	__webpack_require__(/*! ../Tooltip */ "./node_modules/dijit/Tooltip.js"),
	__webpack_require__(/*! ../_KeyNavMixin */ "./node_modules/dijit/_KeyNavMixin.js"),
	__webpack_require__(/*! ../registry */ "./node_modules/dijit/registry.js"), // registry.byNode
	__webpack_require__(/*! dojo/text!./templates/Select.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/Select.html"),
	__webpack_require__(/*! dojo/i18n!./nls/validate */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dijit/form/nls/validate.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, declare, domAttr, domClass, domGeometry, i18n, keys, lang, on, has,
			_FormSelectWidget, _HasDropDown, DropDownMenu, MenuItem, MenuSeparator, Tooltip, _KeyNavMixin, registry, template){

	// module:
	//		dijit/form/Select

	var _SelectMenu = declare("dijit.form._SelectMenu", DropDownMenu, {
		// summary:
		//		An internally-used menu for dropdown that allows us a vertical scrollbar

		// Override Menu.autoFocus setting so that opening a Select highlights the current value.
		autoFocus: true,

		buildRendering: function(){
			this.inherited(arguments);

			this.domNode.setAttribute("role", "listbox");
		},

		postCreate: function(){
			this.inherited(arguments);

			// stop mousemove from selecting text on IE to be consistent with other browsers
			this.own(on(this.domNode, "selectstart", function(evt){
				evt.preventDefault();
				evt.stopPropagation();
			}));
		},

		focus: function(){
			// summary:
			//		Overridden so that the previously selected value will be focused instead of only the first item
			var found = false,
				val = this.parentWidget.value;
			if(lang.isArray(val)){
				val = val[val.length - 1];
			}
			if(val){ // if focus selected
				array.forEach(this.parentWidget._getChildren(), function(child){
					if(child.option && (val === child.option.value)){ // find menu item widget with this value
						found = true;
						this.focusChild(child, false); // focus previous selection
					}
				}, this);
			}
			if(!found){
				this.inherited(arguments); // focus first item by default
			}
		}
	});

	var Select = declare("dijit.form.Select" + (has("dojo-bidi") ? "_NoBidi" : ""), [_FormSelectWidget, _HasDropDown, _KeyNavMixin], {
		// summary:
		//		This is a "styleable" select box - it is basically a DropDownButton which
		//		can take a `<select>` as its input.

		baseClass: "dijitSelect dijitValidationTextBox",

		templateString: template,

		_buttonInputDisabled: has("ie") ? "disabled" : "", // allows IE to disallow focus, but Firefox cannot be disabled for mousedown events

		// required: Boolean
		//		Can be true or false, default is false.
		required: false,

		// state: [readonly] String
		//		"Incomplete" if this select is required but unset (i.e. blank value), "" otherwise
		state: "",

		// message: String
		//		Currently displayed error/prompt message
		message: "",

		// tooltipPosition: String[]
		//		See description of `dijit/Tooltip.defaultPosition` for details on this parameter.
		tooltipPosition: [],

		// emptyLabel: string
		//		What to display in an "empty" dropdown
		emptyLabel: "&#160;", // &nbsp;

		// _isLoaded: Boolean
		//		Whether or not we have been loaded
		_isLoaded: false,

		// _childrenLoaded: Boolean
		//		Whether or not our children have been loaded
		_childrenLoaded: false,

		// labelType: String
		//		Specifies how to interpret the labelAttr in the data store items.
		//		Can be "html" or "text".
		labelType: "html",

		_fillContent: function(){
			// summary:
			//		Set the value to be the first, or the selected index
			this.inherited(arguments);
			// set value from selected option
			if(this.options.length && !this.value && this.srcNodeRef){
				var si = this.srcNodeRef.selectedIndex || 0; // || 0 needed for when srcNodeRef is not a SELECT
				this._set("value", this.options[si >= 0 ? si : 0].value);
			}
			// Create the dropDown widget
			this.dropDown = new _SelectMenu({ id: this.id + "_menu", parentWidget: this });
			domClass.add(this.dropDown.domNode, this.baseClass.replace(/\s+|$/g, "Menu "));
		},

		_getMenuItemForOption: function(/*_FormSelectWidget.__SelectOption*/ option){
			// summary:
			//		For the given option, return the menu item that should be
			//		used to display it.  This can be overridden as needed
			if(!option.value && !option.label){
				// We are a separator (no label set for it)
				return new MenuSeparator({ownerDocument: this.ownerDocument});
			}else{
				// Just a regular menu option
				var click = lang.hitch(this, "_setValueAttr", option);
				var item = new MenuItem({
					option: option,
					label: (this.labelType === 'text' ? (option.label || '').toString()
						.replace(/&/g, '&amp;').replace(/</g, '&lt;') :
						option.label) || this.emptyLabel,
					onClick: click,
					ownerDocument: this.ownerDocument,
					dir: this.dir,
					textDir: this.textDir,
					disabled: option.disabled || false
				});
				item.focusNode.setAttribute("role", "option");
				return item;
			}
		},

		_addOptionItem: function(/*_FormSelectWidget.__SelectOption*/ option){
			// summary:
			//		For the given option, add an option to our dropdown.
			//		If the option doesn't have a value, then a separator is added
			//		in that place.
			if(this.dropDown){
				this.dropDown.addChild(this._getMenuItemForOption(option));
			}
		},

		_getChildren: function(){
			if(!this.dropDown){
				return [];
			}
			return this.dropDown.getChildren();
		},

		focus: function(){
			// Override _KeyNavMixin::focus(), which calls focusFirstChild().
			// We just want the standard form widget behavior.
			if(!this.disabled && this.focusNode.focus){
				try{
					this.focusNode.focus();
				}catch(e){
					/*squelch errors from hidden nodes*/
				}
			}
		},

		focusChild: function(/*dijit/_WidgetBase*/ widget){
			// summary:
			//		Sets the value to the given option, used during search by letter.
			// widget:
			//		Reference to option's widget
			// tags:
			//		protected
			if(widget){
				this.set('value', widget.option);
			}
		},

		_getFirst: function(){
			// summary:
			//		Returns the first child widget.
			// tags:
			//		abstract extension
			var children = this._getChildren();
			return children.length ? children[0] : null;
		},

		_getLast: function(){
			// summary:
			//		Returns the last child widget.
			// tags:
			//		abstract extension
			var children = this._getChildren();
			return children.length ? children[children.length-1] : null;
		},

		childSelector: function(/*DOMNode*/ node){
			// Implement _KeyNavMixin.childSelector, to identify focusable child nodes.
			// If we allowed a dojo/query dependency from this module this could more simply be a string "> *"
			// instead of this function.

			var node = registry.byNode(node);
			return node && node.getParent() == this.dropDown;
		},

		onKeyboardSearch: function(/*dijit/_WidgetBase*/ item, /*Event*/ evt, /*String*/ searchString, /*Number*/ numMatches){
			// summary:
			//		When a key is pressed that matches a child item,
			//		this method is called so that a widget can take appropriate action is necessary.
			// tags:
			//		protected
			if(item){
				this.focusChild(item);
			}
		},

		_loadChildren: function(/*Boolean*/ loadMenuItems){
			// summary:
			//		Resets the menu and the length attribute of the button - and
			//		ensures that the label is appropriately set.
			// loadMenuItems: Boolean
			//		actually loads the child menu items - we only do this when we are
			//		populating for showing the dropdown.

			if(loadMenuItems === true){
				// this.inherited destroys this.dropDown's child widgets (MenuItems).
				// Avoid this.dropDown (Menu widget) having a pointer to a destroyed widget (which will cause
				// issues later in _setSelected). (see #10296)
				if(this.dropDown){
					delete this.dropDown.focusedChild;
					this.focusedChild = null;
				}
				if(this.options.length){
					this.inherited(arguments);
				}else{
					// Drop down menu is blank but add one blank entry just so something appears on the screen
					// to let users know that they are no choices (mimicing native select behavior)
					array.forEach(this._getChildren(), function(child){
						child.destroyRecursive();
					});
					var item = new MenuItem({
						ownerDocument: this.ownerDocument,
						label: this.emptyLabel
					});
					this.dropDown.addChild(item);
				}
			}else{
				this._updateSelection();
			}

			this._isLoaded = false;
			this._childrenLoaded = true;

			if(!this._loadingStore){
				// Don't call this if we are loading - since we will handle it later
				this._setValueAttr(this.value, false);
			}
		},

		_refreshState: function(){
			if(this._started){
				this.validate(this.focused);
			}
		},

		startup: function(){
			this.inherited(arguments);
			this._refreshState(); // after all _set* methods have run
		},

		_setValueAttr: function(value){
			this.inherited(arguments);
			domAttr.set(this.valueNode, "value", this.get("value"));
			this._refreshState();	// to update this.state
		},

		_setNameAttr: "valueNode",

		_setDisabledAttr: function(/*Boolean*/ value){
			this.inherited(arguments);
			this._refreshState();	// to update this.state
		},

		_setRequiredAttr: function(/*Boolean*/ value){
			this._set("required", value);
			this.focusNode.setAttribute("aria-required", value);
			this._refreshState();	// to update this.state
		},

		_setOptionsAttr: function(/*Array*/ options){
			this._isLoaded = false;
			this._set('options', options);
		},

		_setDisplay: function(/*String*/ newDisplay){
			// summary:
			//		sets the display for the given value (or values)

			var lbl = (this.labelType === 'text' ? (newDisplay || '')
					.replace(/&/g, '&amp;').replace(/</g, '&lt;') :
					newDisplay) || this.emptyLabel;
			this.containerNode.innerHTML = '<span role="option" aria-selected="true" class="dijitReset dijitInline ' + this.baseClass.replace(/\s+|$/g, "Label ") + '">' + lbl + '</span>';
		},

		validate: function(/*Boolean*/ isFocused){
			// summary:
			//		Called by oninit, onblur, and onkeypress, and whenever required/disabled state changes
			// description:
			//		Show missing or invalid messages if appropriate, and highlight textbox field.
			//		Used when a select is initially set to no value and the user is required to
			//		set the value.

			var isValid = this.disabled || this.isValid(isFocused);
			this._set("state", isValid ? "" : (this._hasBeenBlurred ? "Error" : "Incomplete"));
			this.focusNode.setAttribute("aria-invalid", isValid ? "false" : "true");
			var message = isValid ? "" : this._missingMsg;
			if(message && this.focused && this._hasBeenBlurred){
				Tooltip.show(message, this.domNode, this.tooltipPosition, !this.isLeftToRight());
			}else{
				Tooltip.hide(this.domNode);
			}
			this._set("message", message);
			return isValid;
		},

		isValid: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Whether or not this is a valid value.  The only way a Select
			//		can be invalid is when it's required but nothing is selected.
			return (!this.required || this.value === 0 || !(/^\s*$/.test(this.value || ""))); // handle value is null or undefined
		},

		reset: function(){
			// summary:
			//		Overridden so that the state will be cleared.
			this.inherited(arguments);
			Tooltip.hide(this.domNode);
			this._refreshState();	// to update this.state
		},

		postMixInProperties: function(){
			// summary:
			//		set the missing message
			this.inherited(arguments);
			this._missingMsg = i18n.getLocalization("dijit.form", "validate", this.lang).missingMessage;
		},

		postCreate: function(){
			this.inherited(arguments);

			// stop mousemove from selecting text on IE to be consistent with other browsers
			this.own(on(this.domNode, "selectstart", function(evt){
				evt.preventDefault();
				evt.stopPropagation();
			}));

			this.domNode.setAttribute("aria-expanded", "false");

			// Prevent _KeyNavMixin from calling stopPropagation() on left and right arrow keys, thus breaking
			// navigation when Select inside Toolbar.
			var keyNavCodes = this._keyNavCodes;
			delete keyNavCodes[keys.LEFT_ARROW];
			delete keyNavCodes[keys.RIGHT_ARROW];
		},

		_setStyleAttr: function(/*String||Object*/ value){
			this.inherited(arguments);
			domClass.toggle(this.domNode, this.baseClass.replace(/\s+|$/g, "FixedWidth "), !!this.domNode.style.width);
		},

		isLoaded: function(){
			return this._isLoaded;
		},

		loadDropDown: function(/*Function*/ loadCallback){
			// summary:
			//		populates the menu
			this._loadChildren(true);
			this._isLoaded = true;
			loadCallback();
		},

		destroy: function(preserveDom){
			if(this.dropDown && !this.dropDown._destroyed){
				this.dropDown.destroyRecursive(preserveDom);
				delete this.dropDown;
			}
			Tooltip.hide(this.domNode);	// in case Select (or enclosing Dialog) destroyed while tooltip shown
			this.inherited(arguments);
		},

		_onFocus: function(){
			this.validate(true);	// show tooltip if second focus of required tooltip, but no selection
			// Note: not calling superclass _onFocus() to avoid _KeyNavMixin::_onFocus() setting tabIndex --> -1
		},

		_onBlur: function(){
			Tooltip.hide(this.domNode);
			this.inherited(arguments);
			this.validate(false);
		}
	});

	if(has("dojo-bidi")){
		Select = declare("dijit.form.Select", Select, {
			_setDisplay: function(/*String*/ newDisplay){
				this.inherited(arguments);
				this.applyTextDir(this.containerNode);
			}
		});
	}

	Select._Menu = _SelectMenu;	// for monkey patching

	// generic event helper to ensure the dropdown items are loaded before the real event handler is called
	function _onEventAfterLoad(method){
		return function(evt){
			if(!this._isLoaded){
				this.loadDropDown(lang.hitch(this, method, evt));
			}else{
				this.inherited(method, arguments);
			}
		};
	}
	Select.prototype._onContainerKeydown = _onEventAfterLoad("_onContainerKeydown");
	Select.prototype._onContainerKeypress = _onEventAfterLoad("_onContainerKeypress");

	return Select;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_FormSelectWidget.js":
/*!******************************************************!*\
  !*** ./node_modules/dijit/form/_FormSelectWidget.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.filter array.forEach array.map array.some
	__webpack_require__(/*! dojo/_base/Deferred */ "./node_modules/dojo/_base/Deferred.js"),
	__webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), // aspect.after
	__webpack_require__(/*! dojo/data/util/sorter */ "./node_modules/dojo/data/util/sorter.js"), // util.sorter.createSortFunction
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.toggle
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"),	// _scopeName
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.delegate lang.isArray lang.isObject lang.hitch
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! dojo/when */ "./node_modules/dojo/when.js"),
	__webpack_require__(/*! dojo/store/util/QueryResults */ "./node_modules/dojo/store/util/QueryResults.js"),
	__webpack_require__(/*! ./_FormValueWidget */ "./node_modules/dijit/form/_FormValueWidget.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, Deferred, aspect, sorter, declare, dom, domClass, kernel, lang, query, when,
			QueryResults, _FormValueWidget){

	// module:
	//		dijit/form/_FormSelectWidget

	/*=====
	var __SelectOption = {
		// value: String
		//		The value of the option.  Setting to empty (or missing) will
		//		place a separator at that location
		// label: String
		//		The label for our option.  It can contain html tags.
		// selected: Boolean
		//		Whether or not we are a selected option
		// disabled: Boolean
		//		Whether or not this specific option is disabled
	};
	=====*/

	var _FormSelectWidget = declare("dijit.form._FormSelectWidget", _FormValueWidget, {
		// summary:
		//		Extends _FormValueWidget in order to provide "select-specific"
		//		values - i.e., those values that are unique to `<select>` elements.
		//		This also provides the mechanism for reading the elements from
		//		a store, if desired.

		// multiple: [const] Boolean
		//		Whether or not we are multi-valued
		multiple: false,

		// options: __SelectOption[]
		//		The set of options for our select item.  Roughly corresponds to
		//		the html `<option>` tag.
		options: null,

		// store: dojo/store/api/Store
		//		A store to use for getting our list of options - rather than reading them
		//		from the `<option>` html tags.   Should support getIdentity().
		//		For back-compat store can also be a dojo/data/api/Identity.
		store: null,
		_setStoreAttr: function(val){
			if(this._created){		// don't repeat work that will happen in postCreate()
				this._deprecatedSetStore(val);
			}
		},

		// query: object
		//		A query to use when fetching items from our store
		query: null,
		_setQueryAttr: function(query){
			if(this._created){		// don't repeat work that will happen in postCreate()
				this._deprecatedSetStore(this.store, this.selectedValue, {query: query});
			}
		},

		// queryOptions: object
		//		Query options to use when fetching from the store
		queryOptions: null,
		_setQueryOptionsAttr: function(queryOptions){
			if(this._created){		// don't repeat work that will happen in postCreate()
				this._deprecatedSetStore(this.store, this.selectedValue, {queryOptions: queryOptions});
			}
		},

		// labelAttr: String?
		//		The entries in the drop down list come from this attribute in the dojo.store items.
		//		If ``store`` is set, labelAttr must be set too, unless store is an old-style
		//		dojo.data store rather than a new dojo/store.
		labelAttr: "",

		// onFetch: Function
		//		A callback to do with an onFetch - but before any items are actually
		//		iterated over (i.e. to filter even further what you want to add)
		onFetch: null,

		// sortByLabel: Boolean
		//		Flag to sort the options returned from a store by the label of
		//		the store.
		sortByLabel: true,


		// loadChildrenOnOpen: Boolean
		//		By default loadChildren is called when the items are fetched from the
		//		store.  This property allows delaying loadChildren (and the creation
		//		of the options/menuitems) until the user clicks the button to open the
		//		dropdown.
		loadChildrenOnOpen: false,

		// onLoadDeferred: [readonly] dojo.Deferred
		//		This is the `dojo.Deferred` returned by setStore().
		//		Calling onLoadDeferred.then() registers your
		//		callback to be called only once, when the prior setStore completes.
		onLoadDeferred: null,

		getOptions: function(/*anything*/ valueOrIdx){
			// summary:
			//		Returns a given option (or options).
			// valueOrIdx:
			//		If passed in as a string, that string is used to look up the option
			//		in the array of options - based on the value property.
			//		(See dijit/form/_FormSelectWidget.__SelectOption).
			//
			//		If passed in a number, then the option with the given index (0-based)
			//		within this select will be returned.
			//
			//		If passed in a dijit/form/_FormSelectWidget.__SelectOption, the same option will be
			//		returned if and only if it exists within this select.
			//
			//		If passed an array, then an array will be returned with each element
			//		in the array being looked up.
			//
			//		If not passed a value, then all options will be returned
			//
			// returns:
			//		The option corresponding with the given value or index.
			//		null is returned if any of the following are true:
			//
			//		- A string value is passed in which doesn't exist
			//		- An index is passed in which is outside the bounds of the array of options
			//		- A dijit/form/_FormSelectWidget.__SelectOption is passed in which is not a part of the select

			// NOTE: the compare for passing in a dijit/form/_FormSelectWidget.__SelectOption checks
			//		if the value property matches - NOT if the exact option exists
			// NOTE: if passing in an array, null elements will be placed in the returned
			//		array when a value is not found.
			var opts = this.options || [];

			if(valueOrIdx == null){
				return opts; // __SelectOption[]
			}
			if(lang.isArrayLike(valueOrIdx)){
				return array.map(valueOrIdx, "return this.getOptions(item);", this); // __SelectOption[]
			}
			if(lang.isString(valueOrIdx)){
				valueOrIdx = { value: valueOrIdx };
			}
			if(lang.isObject(valueOrIdx)){
				// We were passed an option - so see if it's in our array (directly),
				// and if it's not, try and find it by value.

				if(!array.some(opts, function(option, idx){
					for(var a in valueOrIdx){
						if(!(a in option) || option[a] != valueOrIdx[a]){ // == and not === so that 100 matches '100'
							return false;
						}
					}
					valueOrIdx = idx;
					return true; // stops iteration through opts
				})){
					valueOrIdx = -1;
				}
			}
			if(valueOrIdx >= 0 && valueOrIdx < opts.length){
				return opts[valueOrIdx]; // __SelectOption
			}
			return null; // null
		},

		addOption: function(/*__SelectOption|__SelectOption[]*/ option){
			// summary:
			//		Adds an option or options to the end of the select.  If value
			//		of the option is empty or missing, a separator is created instead.
			//		Passing in an array of options will yield slightly better performance
			//		since the children are only loaded once.
			array.forEach(lang.isArrayLike(option) ? option : [option], function(i){
				if(i && lang.isObject(i)){
					this.options.push(i);
				}
			}, this);
			this._loadChildren();
		},

		removeOption: function(/*String|__SelectOption|Number|Array*/ valueOrIdx){
			// summary:
			//		Removes the given option or options.  You can remove by string
			//		(in which case the value is removed), number (in which case the
			//		index in the options array is removed), or select option (in
			//		which case, the select option with a matching value is removed).
			//		You can also pass in an array of those values for a slightly
			//		better performance since the children are only loaded once.
			//		For numeric option values, specify {value: number} as the argument.
			var oldOpts = this.getOptions(lang.isArrayLike(valueOrIdx) ? valueOrIdx : [valueOrIdx]);
			array.forEach(oldOpts, function(option){
				// We can get null back in our array - if our option was not found.  In
				// that case, we don't want to blow up...
				if(option){
					this.options = array.filter(this.options, function(node){
						return (node.value !== option.value || node.label !== option.label);
					});
					this._removeOptionItem(option);
				}
			}, this);
			this._loadChildren();
		},

		updateOption: function(/*__SelectOption|__SelectOption[]*/ newOption){
			// summary:
			//		Updates the values of the given option.  The option to update
			//		is matched based on the value of the entered option.  Passing
			//		in an array of new options will yield better performance since
			//		the children will only be loaded once.
			array.forEach(lang.isArrayLike(newOption) ? newOption : [newOption], function(i){
				var oldOpt = this.getOptions({ value: i.value }), k;
				if(oldOpt){
					for(k in i){
						oldOpt[k] = i[k];
					}
				}
			}, this);
			this._loadChildren();
		},

		setStore: function(store, selectedValue, fetchArgs){
			kernel.deprecated(this.declaredClass+"::setStore(store, selectedValue, fetchArgs) is deprecated. Use set('query', fetchArgs.query), set('queryOptions', fetchArgs.queryOptions), set('store', store), or set('value', selectedValue) instead.", "", "2.0");
			this._deprecatedSetStore(store, selectedValue, fetchArgs);
		},

		_deprecatedSetStore: function(store, selectedValue, fetchArgs){
			// summary:
			//		Sets the store you would like to use with this select widget.
			//		The selected value is the value of the new store to set.  This
			//		function returns the original store, in case you want to reuse
			//		it or something.
			// store: dojo/store/api/Store
			//		The dojo.store you would like to use - it MUST implement getIdentity()
			//		and MAY implement observe().
			//		For backwards-compatibility this can also be a data.data store, in which case
			//		it MUST implement dojo/data/api/Identity,
			//		and MAY implement dojo/data/api/Notification.
			// selectedValue: anything?
			//		The value that this widget should set itself to *after* the store
			//		has been loaded
			// fetchArgs: Object?
			//		Hash of parameters to set filter on store, etc.
			//
			//		- query: new value for Select.query,
			//		- queryOptions: new value for Select.queryOptions,
			//		- onFetch: callback function for each item in data (Deprecated)
			var oStore = this.store;
			fetchArgs = fetchArgs || {};

			if(oStore !== store){
				// Our store has changed, so cancel any listeners on old store (remove for 2.0)
				var h;
				while((h = this._notifyConnections.pop())){
					h.remove();
				}

				// For backwards-compatibility, accept dojo.data store in addition to dojo.store.store.  Remove in 2.0.
				if(!store.get){
					lang.mixin(store, {
						_oldAPI: true,
						get: function(id){
							// summary:
							//		Retrieves an object by it's identity. This will trigger a fetchItemByIdentity.
							//		Like dojo.store.DataStore.get() except returns native item.
							var deferred = new Deferred();
							this.fetchItemByIdentity({
								identity: id,
								onItem: function(object){
									deferred.resolve(object);
								},
								onError: function(error){
									deferred.reject(error);
								}
							});
							return deferred.promise;
						},
						query: function(query, options){
							// summary:
							//		Queries the store for objects.   Like dojo/store/DataStore.query()
							//		except returned Deferred contains array of native items.
							var deferred = new Deferred(function(){
								if(fetchHandle.abort){
									fetchHandle.abort();
								}
							});
							deferred.total = new Deferred();
							var fetchHandle = this.fetch(lang.mixin({
								query: query,
								onBegin: function(count){
									deferred.total.resolve(count);
								},
								onComplete: function(results){
									deferred.resolve(results);
								},
								onError: function(error){
									deferred.reject(error);
								}
							}, options));
							return new QueryResults(deferred);
						}
					});

					if(store.getFeatures()["dojo.data.api.Notification"]){
						this._notifyConnections = [
							aspect.after(store, "onNew", lang.hitch(this, "_onNewItem"), true),
							aspect.after(store, "onDelete", lang.hitch(this, "_onDeleteItem"), true),
							aspect.after(store, "onSet", lang.hitch(this, "_onSetItem"), true)
						];
					}
				}
				this._set("store", store);			// Our store has changed, so update our notifications
			}

			// Remove existing options (if there are any)
			if(this.options && this.options.length){
				this.removeOption(this.options);
			}

			// Cancel listener for updates to old (dojo.data) store
			if(this._queryRes && this._queryRes.close){
				this._queryRes.close();
			}

			// Cancel listener for updates to new (dojo.store) store
			if(this._observeHandle && this._observeHandle.remove){
				this._observeHandle.remove();
				this._observeHandle = null;
			}

			// If user has specified new query and query options along with this new store, then use them.
			if(fetchArgs.query){
				this._set("query", fetchArgs.query);
			}
			if(fetchArgs.queryOptions){
				this._set("queryOptions", fetchArgs.queryOptions);
			}

			// Add our new options
			if(store && store.query){
				this._loadingStore = true;
				this.onLoadDeferred = new Deferred();

				// Run query
				// Save result in this._queryRes so we can cancel the listeners we register below
				this._queryRes = store.query(this.query, this.queryOptions);
				when(this._queryRes, lang.hitch(this, function(items){

					if(this.sortByLabel && !fetchArgs.sort && items.length){
						if(store.getValue){
							// Old dojo.data API to access items, remove for 2.0
							items.sort(sorter.createSortFunction([
								{
									attribute: store.getLabelAttributes(items[0])[0]
								}
							], store));
						}else{
							// TODO: remove sortByLabel completely for 2.0?  It can be handled by queryOptions: {sort: ... }.
							var labelAttr = this.labelAttr;
							items.sort(function(a, b){
								return a[labelAttr] > b[labelAttr] ? 1 : b[labelAttr] > a[labelAttr] ? -1 : 0;
							});
						}
					}

					if(fetchArgs.onFetch){
						items = fetchArgs.onFetch.call(this, items, fetchArgs);
					}

					// TODO: Add these guys as a batch, instead of separately
					array.forEach(items, function(i){
						this._addOptionForItem(i);
					}, this);

					// Register listener for store updates
					if(this._queryRes.observe){
						// observe returns yet another handle that needs its own explicit gc
						this._observeHandle = this._queryRes.observe(lang.hitch(this, function(object, deletedFrom, insertedInto){
							if(deletedFrom == insertedInto){
								this._onSetItem(object);
							}else{
								if(deletedFrom != -1){
									this._onDeleteItem(object);
								}
								if(insertedInto != -1){
									this._onNewItem(object);
								}
							}
						}), true);
					}

					// Set our value (which might be undefined), and then tweak
					// it to send a change event with the real value
					this._loadingStore = false;
					this.set("value", "_pendingValue" in this ? this._pendingValue : selectedValue);
					delete this._pendingValue;

					if(!this.loadChildrenOnOpen){
						this._loadChildren();
					}else{
						this._pseudoLoadChildren(items);
					}
					this.onLoadDeferred.resolve(true);
					this.onSetStore();
				}), lang.hitch(this, function(err){
					console.error('dijit.form.Select: ' + err.toString());
					this.onLoadDeferred.reject(err);
				}));
			}
			return oStore;	// dojo/data/api/Identity
		},

		_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		set the value of the widget.
			//		If a string is passed, then we set our value from looking it up.
			if(!this._onChangeActive){
				priorityChange = null;
			}
			if(this._loadingStore){
				// Our store is loading - so save our value, and we'll set it when
				// we're done
				this._pendingValue = newValue;
				return;
			}
			if(newValue == null){
				return;
			}
			if(lang.isArrayLike(newValue)){
				newValue = array.map(newValue, function(value){
					return lang.isObject(value) ? value : { value: value };
				}); // __SelectOption[]
			}else if(lang.isObject(newValue)){
				newValue = [newValue];
			}else{
				newValue = [
					{ value: newValue }
				];
			}
			newValue = array.filter(this.getOptions(newValue), function(i){
				return i && i.value;
			});
			var opts = this.getOptions() || [];
			if(!this.multiple && (!newValue[0] || !newValue[0].value) && !!opts.length){
				newValue[0] = opts[0];
			}
			array.forEach(opts, function(opt){
				opt.selected = array.some(newValue, function(v){
					return v.value === opt.value;
				});
			});
			var val = array.map(newValue, function(opt){
				return opt.value;
			});

			if(typeof val == "undefined" || typeof val[0] == "undefined"){
				return;
			} // not fully initialized yet or a failed value lookup
			var disp = array.map(newValue, function(opt){
				return opt.label;
			});
			this._setDisplay(this.multiple ? disp : disp[0]);
			this.inherited(arguments, [ this.multiple ? val : val[0], priorityChange ]);
			this._updateSelection();
		},

		_getDisplayedValueAttr: function(){
			// summary:
			//		returns the displayed value of the widget
			var ret = array.map([].concat(this.get('selectedOptions')), function(v){
				if(v && "label" in v){
					return v.label;
				}else if(v){
					return v.value;
				}
				return null;
			}, this);
			return this.multiple ? ret : ret[0];
		},

		_setDisplayedValueAttr: function(label){
			// summary:
			//		Sets the displayed value of the widget
			this.set('value', this.getOptions(typeof label == "string" ? { label: label } : label));
		},

		_loadChildren: function(){
			// summary:
			//		Loads the children represented by this widget's options.
			//		reset the menu to make it populatable on the next click
			if(this._loadingStore){
				return;
			}
			array.forEach(this._getChildren(), function(child){
				child.destroyRecursive();
			});
			// Add each menu item
			array.forEach(this.options, this._addOptionItem, this);

			// Update states
			this._updateSelection();
		},

		_updateSelection: function(){
			// summary:
			//		Sets the "selected" class on the item for styling purposes
			this.focusedChild = null;
			this._set("value", this._getValueFromOpts());
			var val = [].concat(this.value);
			if(val && val[0]){
				var self = this;
				array.forEach(this._getChildren(), function(child){
					var isSelected = array.some(val, function(v){
						return child.option && (v === child.option.value);
					});
					if(isSelected && !self.multiple){
						self.focusedChild = child;
					}
					domClass.toggle(child.domNode, this.baseClass.replace(/\s+|$/g, "SelectedOption "), isSelected);
					child.domNode.setAttribute("aria-selected", isSelected ? "true" : "false");
				}, this);
			}
		},

		_getValueFromOpts: function(){
			// summary:
			//		Returns the value of the widget by reading the options for
			//		the selected flag
			var opts = this.getOptions() || [];
			if(!this.multiple && opts.length){
				// Mirror what a select does - choose the first one
				var opt = array.filter(opts, function(i){
					return i.selected;
				})[0];
				if(opt && opt.value){
					return opt.value;
				}else{
					opts[0].selected = true;
					return opts[0].value;
				}
			}else if(this.multiple){
				// Set value to be the sum of all selected
				return array.map(array.filter(opts, function(i){
					return i.selected;
				}), function(i){
					return i.value;
				}) || [];
			}
			return "";
		},

		// Internal functions to call when we have store notifications come in
		_onNewItem: function(/*item*/ item, /*Object?*/ parentInfo){
			if(!parentInfo || !parentInfo.parent){
				// Only add it if we are top-level
				this._addOptionForItem(item);
			}
		},
		_onDeleteItem: function(/*item*/ item){
			var store = this.store;
			this.removeOption({value: store.getIdentity(item) });
		},
		_onSetItem: function(/*item*/ item){
			this.updateOption(this._getOptionObjForItem(item));
		},

		_getOptionObjForItem: function(item){
			// summary:
			//		Returns an option object based off the given item.  The "value"
			//		of the option item will be the identity of the item, the "label"
			//		of the option will be the label of the item.

			// remove getLabel() call for 2.0 (it's to support the old dojo.data API)
			var store = this.store,
				label = (this.labelAttr && this.labelAttr in item) ? item[this.labelAttr] : store.getLabel(item),
				value = (label ? store.getIdentity(item) : null);
			return {value: value, label: label, item: item}; // __SelectOption
		},

		_addOptionForItem: function(/*item*/ item){
			// summary:
			//		Creates (and adds) the option for the given item
			var store = this.store;
			if(store.isItemLoaded && !store.isItemLoaded(item)){
				// We are not loaded - so let's load it and add later.
				// Remove for 2.0 (it's the old dojo.data API)
				store.loadItem({item: item, onItem: function(i){
					this._addOptionForItem(i);
				},
					scope: this});
				return;
			}
			var newOpt = this._getOptionObjForItem(item);
			this.addOption(newOpt);
		},

		constructor: function(params /*===== , srcNodeRef =====*/){
			// summary:
			//		Create the widget.
			// params: Object|null
			//		Hash of initialization parameters for widget, including scalar values (like title, duration etc.)
			//		and functions, typically callbacks like onClick.
			//		The hash can contain any of the widget's properties, excluding read-only properties.
			// srcNodeRef: DOMNode|String?
			//		If a srcNodeRef (DOM node) is specified, replace srcNodeRef with my generated DOM tree

			//		Saves off our value, if we have an initial one set so we
			//		can use it if we have a store as well (see startup())
			this._oValue = (params || {}).value || null;
			this._notifyConnections = [];	// remove for 2.0
		},

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.focusNode, false);
		},

		_fillContent: function(){
			// summary:
			//		Loads our options and sets up our dropdown correctly.  We
			//		don't want any content, so we don't call any inherit chain
			//		function.
			if(!this.options){
				this.options =
					this.srcNodeRef
						? query("> *", this.srcNodeRef).map(
						function(node){
							if(node.getAttribute("type") === "separator"){
								return { value: "", label: "", selected: false, disabled: false };
							}
							return {
								value: (node.getAttribute("data-" + kernel._scopeName + "-value") || node.getAttribute("value")),
								label: String(node.innerHTML),
								// FIXME: disabled and selected are not valid on complex markup children (which is why we're
								// looking for data-dojo-value above.  perhaps we should data-dojo-props="" this whole thing?)
								// decide before 1.6
								selected: node.getAttribute("selected") || false,
								disabled: node.getAttribute("disabled") || false
							};
						},
						this)
						: [];
			}
			if(!this.value){
				this._set("value", this._getValueFromOpts());
			}else if(this.multiple && typeof this.value == "string"){
				this._set("value", this.value.split(","));
			}
		},

		postCreate: function(){
			// summary:
			//		sets up our event handling that we need for functioning
			//		as a select
			this.inherited(arguments);

			// Make our event connections for updating state
			aspect.after(this, "onChange", lang.hitch(this, "_updateSelection"));

			//		Connects in our store, if we have one defined
			var store = this.store;
			if(store && (store.getIdentity || store.getFeatures()["dojo.data.api.Identity"])){
				// Temporarily set our store to null so that it will get set
				// and connected appropriately
				this.store = null;
				this._deprecatedSetStore(store, this._oValue, {query: this.query, queryOptions: this.queryOptions});
			}

			this._storeInitialized = true;
		},

		startup: function(){
			// summary:
			this._loadChildren();
			this.inherited(arguments);
		},

		destroy: function(){
			// summary:
			//		Clean up our connections

			var h;
			while((h = this._notifyConnections.pop())){
				h.remove();
			}

			// Cancel listener for store updates
			if(this._queryRes && this._queryRes.close){
				this._queryRes.close();
			}

			// Cancel listener for updates to new (dojo.store) store
			if(this._observeHandle && this._observeHandle.remove){
				this._observeHandle.remove();
				this._observeHandle = null;
			}

			this.inherited(arguments);
		},

		_addOptionItem: function(/*__SelectOption*/ /*===== option =====*/){
			// summary:
			//		User-overridable function which, for the given option, adds an
			//		item to the select.  If the option doesn't have a value, then a
			//		separator is added in that place.  Make sure to store the option
			//		in the created option widget.
		},

		_removeOptionItem: function(/*__SelectOption*/ /*===== option =====*/){
			// summary:
			//		User-overridable function which, for the given option, removes
			//		its item from the select.
		},

		_setDisplay: function(/*String or String[]*/ /*===== newDisplay =====*/){
			// summary:
			//		Overridable function which will set the display for the
			//		widget.  newDisplay is either a string (in the case of
			//		single selects) or array of strings (in the case of multi-selects)
		},

		_getChildren: function(){
			// summary:
			//		Overridable function to return the children that this widget contains.
			return [];
		},

		_getSelectedOptionsAttr: function(){
			// summary:
			//		hooks into this.attr to provide a mechanism for getting the
			//		option items for the current value of the widget.
			return this.getOptions({ selected: true });
		},

		_pseudoLoadChildren: function(/*item[]*/ /*===== items =====*/){
			// summary:
			//		a function that will "fake" loading children, if needed, and
			//		if we have set to not load children until the widget opens.
			// items:
			//		An array of items that will be loaded, when needed
		},

		onSetStore: function(){
			// summary:
			//		a function that can be connected to in order to receive a
			//		notification that the store has finished loading and all options
			//		from that store are available
		}
	});

	/*=====
	_FormSelectWidget.__SelectOption = __SelectOption;
	=====*/

	return _FormSelectWidget;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/Select.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/form/templates/Select.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode,_popupStateNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,textDirNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuSeparator.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuSeparator.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n"

/***/ }),

/***/ "./node_modules/dojo/data/util/sorter.js":
/*!***********************************************!*\
  !*** ./node_modules/dojo/data/util/sorter.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../../_base/lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang){
	// module:
	//		dojo/data/util/sorter
	// summary:
	//		TODOC

var sorter = {};
lang.setObject("dojo.data.util.sorter", sorter);

sorter.basicComparator = function(	/*anything*/ a,
													/*anything*/ b){
	// summary:
	//		Basic comparison function that compares if an item is greater or less than another item
	// description:
	//		returns 1 if a > b, -1 if a < b, 0 if equal.
	//		'null' values (null, undefined) are treated as larger values so that they're pushed to the end of the list.
	//		And compared to each other, null is equivalent to undefined.

	//null is a problematic compare, so if null, we set to undefined.
	//Makes the check logic simple, compact, and consistent
	//And (null == undefined) === true, so the check later against null
	//works for undefined and is less bytes.
	var r = -1;
	if(a === null){
		a = undefined;
	}
	if(b === null){
		b = undefined;
	}
	if(a == b){
		r = 0;
	}else if(a > b || a == null){
		r = 1;
	}
	return r; //int {-1,0,1}
};

sorter.createSortFunction = function(	/* attributes[] */sortSpec, /*dojo/data/api/Read*/ store){
	// summary:
	//		Helper function to generate the sorting function based off the list of sort attributes.
	// description:
	//		The sort function creation will look for a property on the store called 'comparatorMap'.  If it exists
	//		it will look in the mapping for comparisons function for the attributes.  If one is found, it will
	//		use it instead of the basic comparator, which is typically used for strings, ints, booleans, and dates.
	//		Returns the sorting function for this particular list of attributes and sorting directions.
	// sortSpec:
	//		A JS object that array that defines out what attribute names to sort on and whether it should be descenting or asending.
	//		The objects should be formatted as follows:
	// |	{
	// |		attribute: "attributeName-string" || attribute,
	// |		descending: true|false;   // Default is false.
	// |	}
	// store:
	//		The datastore object to look up item values from.

	var sortFunctions=[];

	function createSortFunction(attr, dir, comp, s){
		//Passing in comp and s (comparator and store), makes this
		//function much faster.
		return function(itemA, itemB){
			var a = s.getValue(itemA, attr);
			var b = s.getValue(itemB, attr);
			return dir * comp(a,b); //int
		};
	}
	var sortAttribute;
	var map = store.comparatorMap;
	var bc = sorter.basicComparator;
	for(var i = 0; i < sortSpec.length; i++){
		sortAttribute = sortSpec[i];
		var attr = sortAttribute.attribute;
		if(attr){
			var dir = (sortAttribute.descending) ? -1 : 1;
			var comp = bc;
			if(map){
				if(typeof attr !== "string" && ("toString" in attr)){
					 attr = attr.toString();
				}
				comp = map[attr] || bc;
			}
			sortFunctions.push(createSortFunction(attr,
				dir, comp, store));
		}
	}
	return function(rowA, rowB){
		var i=0;
		while(i < sortFunctions.length){
			var ret = sortFunctions[i++](rowA, rowB);
			if(ret !== 0){
				return ret;//int
			}
		}
		return 0; //int
	}; // Function
};

return sorter;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);