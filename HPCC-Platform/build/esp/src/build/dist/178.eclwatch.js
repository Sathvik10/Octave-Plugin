(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/CheckedMenuItem":"./node_modules/dijit/CheckedMenuItem.js",
	"dijit/PopupMenuItem":"./node_modules/dijit/PopupMenuItem.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dijit/TooltipDialog":"./node_modules/dijit/TooltipDialog.js",
	"dijit/form/CheckBox":"./node_modules/dijit/form/CheckBox.js",
	"dijit/form/DropDownButton":"./node_modules/dijit/form/DropDownButton.js",
	"dijit/form/FilteringSelect":"./node_modules/dijit/form/FilteringSelect.js",
	"dijit/form/MappedTextBox":"./node_modules/dijit/form/MappedTextBox.js",
	"dijit/form/SimpleTextarea":"./node_modules/dijit/form/SimpleTextarea.js",
	"dijit/form/Textarea":"./node_modules/dijit/form/Textarea.js",
	"dijit/form/_CheckBoxMixin":"./node_modules/dijit/form/_CheckBoxMixin.js",
	"dijit/form/_ExpandingTextAreaMixin":"./node_modules/dijit/form/_ExpandingTextAreaMixin.js",
	"dojo/text!dijit/form/templates/CheckBox.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/CheckBox.html",
	"dojo/text!dijit/form/templates/DropDownButton.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html",
	"dojo/text!dijit/templates/CheckedMenuItem.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html",
	"dojo/text!dijit/templates/TooltipDialog.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html",
	"dojo/store/Observable":"./node_modules/dojo/store/Observable.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[178],{

/***/ "./node_modules/dijit/CheckedMenuItem.js":
/*!***********************************************!*\
  !*** ./node_modules/dijit/CheckedMenuItem.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.toggle
	__webpack_require__(/*! ./MenuItem */ "./node_modules/dijit/MenuItem.js"),
	__webpack_require__(/*! dojo/text!./templates/CheckedMenuItem.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html"),
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domClass, MenuItem, template){

	// module:
	//		dijit/CheckedMenuItem

	return declare("dijit.CheckedMenuItem", MenuItem, {
		// summary:
		//		A checkbox-like menu item for toggling on and off

		// Use both base classes so we get styles like dijitMenuItemDisabled
		baseClass: "dijitMenuItem dijitCheckedMenuItem",

		templateString: template,

		// checked: Boolean
		//		Our checked state
		checked: false,
		_setCheckedAttr: function(/*Boolean*/ checked){
			this.domNode.setAttribute("aria-checked", checked ? "true" : "false");
			this._set("checked", checked);	// triggers CSS update via _CssStateMixin
		},

		iconClass: "",	// override dijitNoIcon

		role: "menuitemcheckbox",

		// checkedChar: String
		//		Character (or string) used in place of checkbox icon when display in high contrast mode
		checkedChar: "&#10003;",

		onChange: function(/*Boolean*/ /*===== checked =====*/){
			// summary:
			//		User defined function to handle check/uncheck events
			// tags:
			//		callback
		},

		_onClick: function(evt){
			// summary:
			//		Clicking this item just toggles its state
			// tags:
			//		private
			if(!this.disabled){
				this.set("checked", !this.checked);
				this.onChange(this.checked);
			}
			this.onClick(evt);
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

/***/ "./node_modules/dijit/form/FilteringSelect.js":
/*!****************************************************!*\
  !*** ./node_modules/dijit/form/FilteringSelect.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.mixin
	__webpack_require__(/*! dojo/when */ "./node_modules/dojo/when.js"),
	__webpack_require__(/*! ./MappedTextBox */ "./node_modules/dijit/form/MappedTextBox.js"),
	__webpack_require__(/*! ./ComboBoxMixin */ "./node_modules/dijit/form/ComboBoxMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, lang, when, MappedTextBox, ComboBoxMixin){

	// module:
	//		dijit/form/FilteringSelect

	return declare("dijit.form.FilteringSelect", [MappedTextBox, ComboBoxMixin], {
		// summary:
		//		An enhanced version of the HTML SELECT tag, populated dynamically
		//
		// description:
		//		An enhanced version of the HTML SELECT tag, populated dynamically. It works
		//		very nicely with very large data sets because it can load and page data as needed.
		//		It also resembles ComboBox, but does not allow values outside of the provided ones.
		//		If OPTION tags are used as the data provider via markup, then the
		//		OPTION tag's child text node is used as the displayed value when selected
		//		while the OPTION tag's value attribute is used as the widget value on form submit.
		//		To set the default value when using OPTION tags, specify the selected
		//		attribute on 1 of the child OPTION tags.
		//
		//		Similar features:
		//
		//		- There is a drop down list of possible values.
		//		- You can only enter a value from the drop down list.  (You can't
		//			enter an arbitrary value.)
		//		- The value submitted with the form is the hidden value (ex: CA),
		//			not the displayed value a.k.a. label (ex: California)
		//
		//		Enhancements over plain HTML version:
		//
		//		- If you type in some text then it will filter down the list of
		//			possible values in the drop down list.
		//		- List can be specified either as a static list or via a javascript
		//			function (that can get the list from a server)

		// required: Boolean
		//		True (default) if user is required to enter a value into this field.
		required: true,

		_lastDisplayedValue: "",

		_isValidSubset: function(){
			return this._opened;
		},

		isValid: function(){
			// Overrides ValidationTextBox.isValid()
			return !!this.item || (!this.required && this.get('displayedValue') == ""); // #5974
		},

		_refreshState: function(){
			if(!this.searchTimer){ // state will be refreshed after results are returned
				this.inherited(arguments);
			}
		},

		_callbackSetLabel: function(
						/*Array*/ result,
						/*Object*/ query,
						/*Object*/ options,
						/*Boolean?*/ priorityChange){
			// summary:
			//		Callback from dojo.store after lookup of user entered value finishes

			// setValue does a synchronous lookup,
			// so it calls _callbackSetLabel directly,
			// and so does not pass dataObject
			// still need to test against _lastQuery in case it came too late
			if((query && query[this.searchAttr] !== this._lastQuery) || (!query && result.length && this.store.getIdentity(result[0]) != this._lastQuery)){
				return;
			}
			if(!result.length){
				//#3268: don't modify display value on bad input
				//#3285: change CSS to indicate error
				this.set("value", '', priorityChange || (priorityChange === undefined && !this.focused), this.textbox.value, null);
			}else{
				this.set('item', result[0], priorityChange);
			}
		},

		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			// Callback when a data store query completes.
			// Overrides ComboBox._openResultList()

			// #3285: tap into search callback to see if user's query resembles a match
			if(query[this.searchAttr] !== this._lastQuery){
				return;
			}
			this.inherited(arguments);

			if(this.item === undefined){ // item == undefined for keyboard search
				// If the search returned no items that means that the user typed
				// in something invalid (and they can't make it valid by typing more characters),
				// so flag the FilteringSelect as being in an invalid state
				this.validate(true);
			}
		},

		_getValueAttr: function(){
			// summary:
			//		Hook for get('value') to work.

			// don't get the textbox value but rather the previously set hidden value.
			// Use this.valueNode.value which isn't always set for other MappedTextBox widgets until blur
			return this.valueNode.value;
		},

		_getValueField: function(){
			// Overrides ComboBox._getValueField()
			return "value";
		},

		_setValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
			// summary:
			//		Hook so set('value', value) works.
			// description:
			//		Sets the value of the select.
			//		Also sets the label to the corresponding value by reverse lookup.
			if(!this._onChangeActive){ priorityChange = null; }

			if(item === undefined){
				if(value === null || value === ''){
					value = '';
					if(!lang.isString(displayedValue)){
						this._setDisplayedValueAttr(displayedValue||'', priorityChange);
						return;
					}
				}

				var self = this;
				this._lastQuery = value;
				when(this.store.get(value), function(item){
					self._callbackSetLabel(item? [item] : [], undefined, undefined, priorityChange);
				});
			}else{
				this.valueNode.value = value;
				this.inherited(arguments, [value, priorityChange, displayedValue, item]);
			}
		},

		_setItemAttr: function(/*item*/ item, /*Boolean?*/ priorityChange, /*String?*/ displayedValue){
			// summary:
			//		Set the displayed valued in the input box, and the hidden value
			//		that gets submitted, based on a dojo.data store item.
			// description:
			//		Users shouldn't call this function; they should be calling
			//		set('item', value)
			// tags:
			//		private
			this.inherited(arguments);
			this._lastDisplayedValue = this.textbox.value;
		},

		_getDisplayQueryString: function(/*String*/ text){
			return text.replace(/([\\\*\?])/g, "\\$1");
		},

		_setDisplayedValueAttr: function(/*String*/ label, /*Boolean?*/ priorityChange){
			// summary:
			//		Hook so set('displayedValue', label) works.
			// description:
			//		Sets textbox to display label. Also performs reverse lookup
			//		to set the hidden value.  label should corresponding to item.searchAttr.

			if(label == null){ label = ''; }

			// This is called at initialization along with every custom setter.
			// Usually (or always?) the call can be ignored.   If it needs to be
			// processed then at least make sure that the XHR request doesn't trigger an onChange()
			// event, even if it returns after creation has finished
			if(!this._created){
				if(!("displayedValue" in this.params)){
					return;
				}
				priorityChange = false;
			}

			// Do a reverse lookup to map the specified displayedValue to the hidden value.
			// Note that if there's a custom labelFunc() this code
			if(this.store){
				this.closeDropDown();
				var query = lang.clone(this.query); // #6196: populate query with user-specifics

				// Generate query
				var qs = this._getDisplayQueryString(label), q;
				if(this.store._oldAPI){
					// remove this branch for 2.0
					q = qs;
				}else{
					// Query on searchAttr is a regex for benefit of dojo/store/Memory,
					// but with a toString() method to help dojo/store/JsonRest.
					// Search string like "Co*" converted to regex like /^Co.*$/i.
					q = this._patternToRegExp(qs);
					q.toString = function(){ return qs; };
				}
				this._lastQuery = query[this.searchAttr] = q;

				// If the label is not valid, the callback will never set it,
				// so the last valid value will get the warning textbox.   Set the
				// textbox value now so that the impending warning will make
				// sense to the user
				this.textbox.value = label;
				this._lastDisplayedValue = label;
				this._set("displayedValue", label);	// for watch("displayedValue") notification
				var _this = this;
				var options = {
					queryOptions: {
						ignoreCase: this.ignoreCase,
						deep: true
					}
				};
				lang.mixin(options, this.fetchProperties);
				this._fetchHandle = this.store.query(query, options);
				when(this._fetchHandle, function(result){
					_this._fetchHandle = null;
					_this._callbackSetLabel(result || [], query, options, priorityChange);
				}, function(err){
					_this._fetchHandle = null;
					if(!_this._cancelingQuery){	// don't treat canceled query as an error
						console.error('dijit.form.FilteringSelect: ' + err.toString());
					}
				});
			}
		},

		undo: function(){
			this.set('displayedValue', this._lastDisplayedValue);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/CheckedMenuItem.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/CheckedMenuItem.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${!checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/TooltipDialog.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"contentsNode\" class=\"dijitTooltipContents dijitTooltipFocusNode\">\n\t\t\t<div data-dojo-attach-point=\"containerNode\"></div>\n\t\t\t${!actionBarTemplate}\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo/store/Observable.js":
/*!***********************************************!*\
  !*** ./node_modules/dojo/store/Observable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ../when */ "./node_modules/dojo/when.js"), __webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js") /*=====, "./api/Store" =====*/
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel, lang, when, array /*=====, Store =====*/){

// module:
//		dojo/store/Observable

var Observable = function(/*Store*/ store){
	// summary:
	//		The Observable store wrapper takes a store and sets an observe method on query()
	//		results that can be used to monitor results for changes.
	//
	// description:
	//		Observable wraps an existing store so that notifications can be made when a query
	//		is performed.
	//
	// example:
	//		Create a Memory store that returns an observable query, and then log some
	//		information about that query.
	//
	//	|	var store = Observable(new Memory({
	//	|		data: [
	//	|			{id: 1, name: "one", prime: false},
	//	|			{id: 2, name: "two", even: true, prime: true},
	//	|			{id: 3, name: "three", prime: true},
	//	|			{id: 4, name: "four", even: true, prime: false},
	//	|			{id: 5, name: "five", prime: true}
	//	|		]
	//	|	}));
	//	|	var changes = [], results = store.query({ prime: true });
	//	|	var observer = results.observe(function(object, previousIndex, newIndex){
	//	|		changes.push({previousIndex:previousIndex, newIndex:newIndex, object:object});
	//	|	});
	//
	//		See the Observable tests for more information.

	var undef, queryUpdaters = [], revision = 0;
	// a Comet driven store could directly call notify to notify observers when data has
	// changed on the backend
	// create a new instance
	store = lang.delegate(store);
	
	store.notify = function(object, existingId){
		revision++;
		var updaters = queryUpdaters.slice();
		for(var i = 0, l = updaters.length; i < l; i++){
			updaters[i](object, existingId);
		}
	};
	var originalQuery = store.query;
	store.query = function(query, options){
		options = options || {};
		var results = originalQuery.apply(this, arguments);
		if(results && results.forEach){
			var nonPagedOptions = lang.mixin({}, options);
			delete nonPagedOptions.start;
			delete nonPagedOptions.count;

			var queryExecutor = store.queryEngine && store.queryEngine(query, nonPagedOptions);
			var queryRevision = revision;
			var listeners = [], queryUpdater;
			results.observe = function(listener, includeObjectUpdates){
				if(listeners.push(listener) == 1){
					// first listener was added, create the query checker and updater
					queryUpdaters.push(queryUpdater = function(changed, existingId){
						when(results, function(resultsArray){
							var atEnd = resultsArray.length != options.count;
							var i, l, listener;
							if(++queryRevision != revision){
								throw new Error("Query is out of date, you must observe() the query prior to any data modifications");
							}
							var removedObject, removedFrom = -1, insertedInto = -1;
							if(existingId !== undef){
								// remove the old one
								var filteredArray = [].concat(resultsArray);
								if(queryExecutor && !changed){
									filteredArray = queryExecutor(resultsArray);
								}
								for(i = 0, l = resultsArray.length; i < l; i++){
									var object = resultsArray[i];
									if(store.getIdentity(object) == existingId){
										if(filteredArray.indexOf(object)<0) continue;
										removedObject = object;
										removedFrom = i;
										if(queryExecutor || !changed){// if it was changed and we don't have a queryExecutor, we shouldn't remove it because updated objects would be eliminated
											resultsArray.splice(i, 1);
										}
										break;
									}
								}
							}
							if(queryExecutor){
								// add the new one
								if(changed &&
										// if a matches function exists, use that (probably more efficient)
										(queryExecutor.matches ? queryExecutor.matches(changed) : queryExecutor([changed]).length)){

									var firstInsertedInto = removedFrom > -1 ? 
										removedFrom : // put back in the original slot so it doesn't move unless it needs to (relying on a stable sort below)
										resultsArray.length;
									resultsArray.splice(firstInsertedInto, 0, changed); // add the new item
									insertedInto = array.indexOf(queryExecutor(resultsArray), changed); // sort it
									// we now need to push the change back into the original results array
									resultsArray.splice(firstInsertedInto, 1); // remove the inserted item from the previous index
									
									if((options.start && insertedInto == 0) ||
										(!atEnd && insertedInto == resultsArray.length)){
										// if it is at the end of the page, assume it goes into the prev or next page
										insertedInto = -1;
									}else{
										resultsArray.splice(insertedInto, 0, changed); // and insert into the results array with the correct index
									}
								}
							}else if(changed){
								// we don't have a queryEngine, so we can't provide any information
								// about where it was inserted or moved to. If it is an update, we leave it's position alone, other we at least indicate a new object
								if(existingId !== undef){
									// an update, keep the index the same
									insertedInto = removedFrom;
								}else if(!options.start){
									// a new object
									insertedInto = store.defaultIndex || 0;
									resultsArray.splice(insertedInto, 0, changed);
								}
							}
							if((removedFrom > -1 || insertedInto > -1) &&
									(includeObjectUpdates || !queryExecutor || (removedFrom != insertedInto))){
								var copyListeners = listeners.slice();
								for(i = 0;listener = copyListeners[i]; i++){
									listener(changed || removedObject, removedFrom, insertedInto);
								}
							}
						});
					});
				}
				var handle = {};
				// TODO: Remove cancel in 2.0.
				handle.remove = handle.cancel = function(){
					// remove this listener
					var index = array.indexOf(listeners, listener);
					if(index > -1){ // check to make sure we haven't already called cancel
						listeners.splice(index, 1);
						if(!listeners.length){
							// no more listeners, remove the query updater too
							queryUpdaters.splice(array.indexOf(queryUpdaters, queryUpdater), 1);
						}
					}
				};
				return handle;
			};
		}
		return results;
	};
	var inMethod;
	function whenFinished(method, action){
		var original = store[method];
		if(original){
			store[method] = function(value){
				var originalId;
				if(method === 'put'){
					originalId = store.getIdentity(value);
				}
				if(inMethod){
					// if one method calls another (like add() calling put()) we don't want two events
					return original.apply(this, arguments);
				}
				inMethod = true;
				try{
					var results = original.apply(this, arguments);
					when(results, function(results){
						action((typeof results == "object" && results) || value, originalId);
					});
					return results;
				}finally{
					inMethod = false;
				}
			};
		}
	}
	// monitor for updates by listening to these methods
	whenFinished("put", function(object, originalId){
		store.notify(object, originalId);
	});
	whenFinished("add", function(object){
		store.notify(object);
	});
	whenFinished("remove", function(id){
		store.notify(undefined, id);
	});

	return store;
};

lang.setObject("dojo.store.Observable", Observable);

return Observable;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);