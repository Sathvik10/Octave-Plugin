(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/DropDownMenu":"./node_modules/dijit/DropDownMenu.js",
	"dijit/MenuItem":"./node_modules/dijit/MenuItem.js",
	"dijit/_MenuBase":"./node_modules/dijit/_MenuBase.js",
	"dojo/text!dijit/templates/Menu.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Menu.html",
	"dojo/text!dijit/templates/MenuItem.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuItem.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/dijit/DropDownMenu.js":
/*!********************************************!*\
  !*** ./node_modules/dijit/DropDownMenu.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys
	__webpack_require__(/*! dojo/text!./templates/Menu.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Menu.html"),
	__webpack_require__(/*! ./_MenuBase */ "./node_modules/dijit/_MenuBase.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, keys, template, _MenuBase){

	// module:
	//		dijit/DropDownMenu

	return declare("dijit.DropDownMenu", _MenuBase, {
		// summary:
		//		A menu, without features for context menu (Meaning, drop down menu)

		templateString: template,

		baseClass: "dijitMenu",

		// Arrow key navigation
		_onUpArrow: function(){
			this.focusPrev();
		},
		_onDownArrow: function(){
			this.focusNext();
		},
		_onRightArrow: function(/*Event*/ evt){
			this._moveToPopup(evt);
			evt.stopPropagation();
			evt.preventDefault();
		},
		_onLeftArrow: function(/*Event*/ evt){
			if(this.parentMenu){
				if(this.parentMenu._isMenuBar){
					this.parentMenu.focusPrev();
				}else{
					this.onCancel(false);
				}
			}else{
				evt.stopPropagation();
				evt.preventDefault();
			}
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/MenuItem.js":
/*!****************************************!*\
  !*** ./node_modules/dijit/MenuItem.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"), // domAttr.set
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.toggle
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), // kernel.deprecated
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie")
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! ./_Contained */ "./node_modules/dijit/_Contained.js"),
	__webpack_require__(/*! ./_CssStateMixin */ "./node_modules/dijit/_CssStateMixin.js"),
	__webpack_require__(/*! dojo/text!./templates/MenuItem.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuItem.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, domAttr, domClass, kernel, has, lang,
			_Widget, _TemplatedMixin, _Contained, _CssStateMixin, template){

	// module:
	//		dijit/MenuItem

	var MenuItem = declare("dijit.MenuItem" + (has("dojo-bidi") ? "_NoBidi" : ""),
		[_Widget, _TemplatedMixin, _Contained, _CssStateMixin], {
		// summary:
		//		A line item in a Menu Widget

		// Make 3 columns
		// icon, label, and expand arrow (BiDi-dependent) indicating sub-menu
		templateString: template,

		baseClass: "dijitMenuItem",

		// label: String
		//		Menu text as HTML
		label: "",
		_setLabelAttr: function(val){
			this._set("label", val);
			var shortcutKey = "";
			var text;
			var ndx = val.search(/{\S}/);
			if(ndx >= 0){
				shortcutKey = val.charAt(ndx + 1);
				var prefix = val.substr(0, ndx);
				var suffix = val.substr(ndx + 3);
				text = prefix + shortcutKey + suffix;
				val = prefix + '<span class="dijitMenuItemShortcutKey">' + shortcutKey + '</span>' + suffix;
			}else{
				text = val;
			}
			this.domNode.setAttribute("aria-label", text + " " + this.accelKey);
			this.containerNode.innerHTML = val;
			this._set('shortcutKey', shortcutKey);
		},

		/*=====
		// shortcutKey: [readonly] String
		//		Single character (underlined when the parent Menu is focused) used to navigate directly to this widget,
		//		also known as [a mnemonic](http://en.wikipedia.org/wiki/Mnemonics_(keyboard%29).
		//		This is denoted in the label by surrounding the single character with {}.
		//		For example, if label="{F}ile", then shortcutKey="F".
		shortcutKey: "",
		=====*/

		// iconClass: String
		//		Class to apply to DOMNode to make it display an icon.
		iconClass: "dijitNoIcon",
		_setIconClassAttr: { node: "iconNode", type: "class" },

		// accelKey: String
		//		Text for the accelerator (shortcut) key combination, a control, alt, etc. modified keystroke meant to
		//		execute the menu item regardless of where the focus is on the page.
		//
		//		Note that although Menu can display accelerator keys, there is no infrastructure to actually catch and
		//		execute those accelerators.
		accelKey: "",

		// disabled: Boolean
		//		If true, the menu item is disabled.
		//		If false, the menu item is enabled.
		disabled: false,

		_fillContent: function(/*DomNode*/ source){
			// If button label is specified as srcNodeRef.innerHTML rather than
			// this.params.label, handle it here.
			if(source && !("label" in this.params)){
				this._set('label', source.innerHTML);
			}
		},

		buildRendering: function(){
			this.inherited(arguments);
			var label = this.id + "_text";
			domAttr.set(this.containerNode, "id", label); // only needed for backward compat
			if(this.accelKeyNode){
				domAttr.set(this.accelKeyNode, "id", this.id + "_accel"); // only needed for backward compat
			}
			dom.setSelectable(this.domNode, false);
		},

		onClick: function(/*Event*/){
			// summary:
			//		User defined function to handle clicks
			// tags:
			//		callback
		},

		focus: function(){
			// summary:
			//		Focus on this MenuItem
			try{
				if(has("ie") == 8){
					// needed for IE8 which won't scroll TR tags into view on focus yet calling scrollIntoView creates flicker (#10275)
					this.containerNode.focus();
				}
				this.focusNode.focus();
			}catch(e){
				// this throws on IE (at least) in some scenarios
			}
		},

		_setSelected: function(selected){
			// summary:
			//		Indicate that this node is the currently selected one
			// tags:
			//		private

			domClass.toggle(this.domNode, "dijitMenuItemSelected", selected);
		},

		setLabel: function(/*String*/ content){
			// summary:
			//		Deprecated.   Use set('label', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
			this.set("label", content);
		},

		setDisabled: function(/*Boolean*/ disabled){
			// summary:
			//		Deprecated.   Use set('disabled', bool) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
			this.set('disabled', disabled);
		},

		_setDisabledAttr: function(/*Boolean*/ value){
			// summary:
			//		Hook for attr('disabled', ...) to work.
			//		Enable or disable this menu item.

			this.focusNode.setAttribute('aria-disabled', value ? 'true' : 'false');
			this._set("disabled", value);
		},

		_setAccelKeyAttr: function(/*String*/ value){
			// summary:
			//		Hook for attr('accelKey', ...) to work.
			//		Set accelKey on this menu item.

			if(this.accelKeyNode){
				this.accelKeyNode.style.display = value ? "" : "none";
				this.accelKeyNode.innerHTML = value;
				//have to use colSpan to make it work in IE
				domAttr.set(this.containerNode, 'colSpan', value ? "1" : "2");
			}
			this._set("accelKey", value);
		}
	});

	if(has("dojo-bidi")){
		MenuItem = declare("dijit.MenuItem", MenuItem, {
			_setLabelAttr: function(val){
				this.inherited(arguments);
				if(this.textDir === "auto"){
					this.applyTextDir(this.textDirNode);
				}
			}
		});
	}

	return MenuItem;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/_MenuBase.js":
/*!*****************************************!*\
  !*** ./node_modules/dijit/_MenuBase.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.indexOf
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.isDescendant domClass.replace
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.replace
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/mouse */ "./node_modules/dojo/mouse.js"), // mouse.enter, mouse.leave
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/window */ "./node_modules/dojo/window.js"),
	__webpack_require__(/*! ./a11yclick */ "./node_modules/dijit/a11yclick.js"),
	__webpack_require__(/*! ./registry */ "./node_modules/dijit/registry.js"),
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_CssStateMixin */ "./node_modules/dijit/_CssStateMixin.js"),
	__webpack_require__(/*! ./_KeyNavContainer */ "./node_modules/dijit/_KeyNavContainer.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, declare, dom, domAttr, domClass, lang, mouse, on, winUtils, a11yclick,
			registry, _Widget, _CssStateMixin, _KeyNavContainer, _TemplatedMixin){

	// module:
	//		dijit/_MenuBase

	return declare("dijit._MenuBase", [_Widget, _TemplatedMixin, _KeyNavContainer, _CssStateMixin], {
		// summary:
		//		Abstract base class for Menu and MenuBar.
		//		Subclass should implement _onUpArrow(), _onDownArrow(), _onLeftArrow(), and _onRightArrow().

		// selected: dijit/MenuItem
		//		Currently selected (a.k.a. highlighted) MenuItem, or null if no MenuItem is selected.
		//		If a submenu is open, will be set to MenuItem that displayed the submenu.   OTOH, if
		//		this Menu is in passive mode (i.e. hasn't been clicked yet), will be null, because
		//		"selected" is not merely "hovered".
		selected: null,
		_setSelectedAttr: function(item){
			if(this.selected != item){
				if(this.selected){
					this.selected._setSelected(false);
					this._onChildDeselect(this.selected);
				}
				if(item){
					item._setSelected(true);
				}
				this._set("selected", item);
			}
		},

		// activated: [readonly] Boolean
		//		This Menu has been clicked (mouse or via space/arrow key) or opened as a submenu,
		//		so mere mouseover will open submenus.  Focusing a menu via TAB does NOT automatically make it active
		//		since TAB is a navigation operation and not a selection one.
		//		For Windows apps, pressing the ALT key focuses the menubar menus (similar to TAB navigation) but the
		//		menu is not active (ie no dropdown) until an item is clicked.
		activated: false,
		_setActivatedAttr: function(val){
			domClass.toggle(this.domNode, "dijitMenuActive", val);
			domClass.toggle(this.domNode, "dijitMenuPassive", !val);
			this._set("activated", val);
		},

		// parentMenu: [readonly] Widget
		//		pointer to menu that displayed me
		parentMenu: null,

		// popupDelay: Integer
		//		After a menu has been activated (by clicking on it etc.), number of milliseconds before hovering
		//		(without clicking) another MenuItem causes that MenuItem's popup to automatically open.
		popupDelay: 500,

		// passivePopupDelay: Integer
		//		For a passive (unclicked) Menu, number of milliseconds before hovering (without clicking) will cause
		//		the popup to open.  Default is Infinity, meaning you need to click the menu to open it.
		passivePopupDelay: Infinity,

		// autoFocus: Boolean
		//		A toggle to control whether or not a Menu gets focused when opened as a drop down from a MenuBar
		//		or DropDownButton/ComboButton.   Note though that it always get focused when opened via the keyboard.
		autoFocus: false,

		childSelector: function(/*DOMNode*/ node){
			// summary:
			//		Selector (passed to on.selector()) used to identify MenuItem child widgets, but exclude inert children
			//		like MenuSeparator.  If subclass overrides to a string (ex: "> *"), the subclass must require dojo/query.
			// tags:
			//		protected

			var widget = registry.byNode(node);
			return node.parentNode == this.containerNode && widget && widget.focus;
		},

		postCreate: function(){
			var self = this,
				matches = typeof this.childSelector == "string" ? this.childSelector : lang.hitch(this, "childSelector");
			this.own(
				on(this.containerNode, on.selector(matches, mouse.enter), function(){
					self.onItemHover(registry.byNode(this));
				}),
				on(this.containerNode, on.selector(matches, mouse.leave), function(){
					self.onItemUnhover(registry.byNode(this));
				}),
				on(this.containerNode, on.selector(matches, a11yclick), function(evt){
					self.onItemClick(registry.byNode(this), evt);
					evt.stopPropagation();
				}),
				on(this.containerNode, on.selector(matches, "focusin"), function(){
					self._onItemFocus(registry.byNode(this));
				})
			);
			this.inherited(arguments);
		},

		onKeyboardSearch: function(/*MenuItem*/ item, /*Event*/ evt, /*String*/ searchString, /*Number*/ numMatches){
			// summary:
			//		Attach point for notification about when a menu item has been searched for
			//		via the keyboard search mechanism.
			// tags:
			//		protected
			this.inherited(arguments);
			if(!!item && (numMatches == -1 || (!!item.popup && numMatches == 1))){
				this.onItemClick(item, evt);
			}
		},

		_keyboardSearchCompare: function(/*dijit/_WidgetBase*/ item, /*String*/ searchString){
			// summary:
			//		Compares the searchString to the widget's text label, returning:
			//		-1: a high priority match and stop searching
			//		 0: no match
			//		 1: a match but keep looking for a higher priority match
			// tags:
			//		private
			if(!!item.shortcutKey){
				// accessKey matches have priority
				return searchString == item.shortcutKey.toLowerCase() ? -1 : 0;
			}
			return this.inherited(arguments) ? 1 : 0; // change return value of -1 to 1 so that searching continues
		},

		onExecute: function(){
			// summary:
			//		Attach point for notification about when a menu item has been executed.
			//		This is an internal mechanism used for Menus to signal to their parent to
			//		close them, because they are about to execute the onClick handler.  In
			//		general developers should not attach to or override this method.
			// tags:
			//		protected
		},

		onCancel: function(/*Boolean*/ /*===== closeAll =====*/){
			// summary:
			//		Attach point for notification about when the user cancels the current menu
			//		This is an internal mechanism used for Menus to signal to their parent to
			//		close them.  In general developers should not attach to or override this method.
			// tags:
			//		protected
		},

		_moveToPopup: function(/*Event*/ evt){
			// summary:
			//		This handles the right arrow key (left arrow key on RTL systems),
			//		which will either open a submenu, or move to the next item in the
			//		ancestor MenuBar
			// tags:
			//		private

			if(this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled){
				this.onItemClick(this.focusedChild, evt);
			}else{
				var topMenu = this._getTopMenu();
				if(topMenu && topMenu._isMenuBar){
					topMenu.focusNext();
				}
			}
		},

		_onPopupHover: function(/*Event*/ /*===== evt =====*/){
			// summary:
			//		This handler is called when the mouse moves over the popup.
			// tags:
			//		private

			// if the mouse hovers over a menu popup that is in pending-close state,
			// then stop the close operation.
			// This can't be done in onItemHover since some popup targets don't have MenuItems (e.g. ColorPicker)

			// highlight the parent menu item pointing to this popup (in case user temporarily moused over another MenuItem)
			this.set("selected", this.currentPopupItem);

			// cancel the pending close (if there is one) (in case user temporarily moused over another MenuItem)
			this._stopPendingCloseTimer();
		},

		onItemHover: function(/*MenuItem*/ item){
			// summary:
			//		Called when cursor is over a MenuItem.
			// tags:
			//		protected

			// Don't do anything unless user has "activated" the menu by:
			//		1) clicking it
			//		2) opening it from a parent menu (which automatically activates it)

			if(this.activated){
				this.set("selected", item);
				if(item.popup && !item.disabled && !this.hover_timer){
					this.hover_timer = this.defer(function(){
						this._openItemPopup(item);
					}, this.popupDelay);
				}
			}else if(this.passivePopupDelay < Infinity){
				if(this.passive_hover_timer){
					this.passive_hover_timer.remove();
				}
				this.passive_hover_timer = this.defer(function(){
					this.onItemClick(item, {type: "click"});
				}, this.passivePopupDelay);
			}

			this._hoveredChild = item;

			item._set("hovering", true);
		},

		_onChildDeselect: function(item){
			// summary:
			//		Called when a child MenuItem becomes deselected.   Setup timer to close its popup.

			this._stopPopupTimer();

			// Setup timer to close all popups that are open and descendants of this menu.
			// Will be canceled if user quickly moves the mouse over the popup.
			if(this.currentPopupItem == item){
				this._stopPendingCloseTimer();
				this._pendingClose_timer = this.defer(function(){
					this._pendingClose_timer = null;
					this.currentPopupItem = null;
					item._closePopup(); // this calls onClose
				}, this.popupDelay);
			}
		},

		onItemUnhover: function(/*MenuItem*/ item){
			// summary:
			//		Callback fires when mouse exits a MenuItem
			// tags:
			//		protected

			if(this._hoveredChild == item){
				this._hoveredChild = null;
			}

			if(this.passive_hover_timer){
				this.passive_hover_timer.remove();
				this.passive_hover_timer = null;
			}

			item._set("hovering", false);
		},

		_stopPopupTimer: function(){
			// summary:
			//		Cancels the popup timer because the user has stop hovering
			//		on the MenuItem, etc.
			// tags:
			//		private

			if(this.hover_timer){
				this.hover_timer = this.hover_timer.remove();
			}
		},

		_stopPendingCloseTimer: function(){
			// summary:
			//		Cancels the pending-close timer because the close has been preempted
			// tags:
			//		private
			if(this._pendingClose_timer){
				this._pendingClose_timer = this._pendingClose_timer.remove();
			}
		},

		_getTopMenu: function(){
			// summary:
			//		Returns the top menu in this chain of Menus
			// tags:
			//		private
			for(var top = this; top.parentMenu; top = top.parentMenu){}
			return top;
		},

		onItemClick: function(/*dijit/_WidgetBase*/ item, /*Event*/ evt){
			// summary:
			//		Handle clicks on an item.
			// tags:
			//		private

			if(this.passive_hover_timer){
				this.passive_hover_timer.remove();
			}

			this.focusChild(item);

			if(item.disabled){
				return false;
			}

			if(item.popup){
				this.set("selected", item);
				this.set("activated", true);
				var byKeyboard = /^key/.test(evt._origType || evt.type) ||
					(evt.clientX == 0 && evt.clientY == 0);	// detects accessKey like ALT+SHIFT+F, where type is "click"
				this._openItemPopup(item, byKeyboard);
			}else{
				// before calling user defined handler, close hierarchy of menus
				// and restore focus to place it was when menu was opened
				this.onExecute();

				// user defined handler for click
				item._onClick ? item._onClick(evt) : item.onClick(evt);
			}
		},

		_openItemPopup: function(/*dijit/MenuItem*/ from_item, /*Boolean*/ focus){
			// summary:
			//		Open the popup to the side of/underneath the current menu item, and optionally focus first item
			// tags:
			//		protected

			if(from_item == this.currentPopupItem){
				// Specified popup is already being shown, so just return
				return;
			}
			if(this.currentPopupItem){
				// If another popup is currently shown, then close it
				this._stopPendingCloseTimer();
				this.currentPopupItem._closePopup();
			}
			this._stopPopupTimer();

			var popup = from_item.popup;
			popup.parentMenu = this;

			// detect mouseover of the popup to handle lazy mouse movements that temporarily focus other menu items\c
			this.own(this._mouseoverHandle = on.once(popup.domNode, "mouseover", lang.hitch(this, "_onPopupHover")));

			var self = this;
			from_item._openPopup({
				parent: this,
				orient: this._orient || ["after", "before"],
				onCancel: function(){ // called when the child menu is canceled
					if(focus){
						// put focus back on my node before focused node is hidden
						self.focusChild(from_item);
					}

					// close the submenu (be sure this is done _after_ focus is moved)
					self._cleanUp();
				},
				onExecute: lang.hitch(this, "_cleanUp", true),
				onClose: function(){
					// Remove handler created by onItemHover
					if(self._mouseoverHandle){
						self._mouseoverHandle.remove();
						delete self._mouseoverHandle;
					}
				}
			}, focus);

			this.currentPopupItem = from_item;

			// TODO: focusing a popup should clear tabIndex on Menu (and it's child MenuItems), so that neither
			// TAB nor SHIFT-TAB returns to the menu.  Only ESC or ENTER should return to the menu.
		},

		onOpen: function(/*Event*/ /*===== e =====*/){
			// summary:
			//		Callback when this menu is opened.
			//		This is called by the popup manager as notification that the menu
			//		was opened.
			// tags:
			//		private

			this.isShowingNow = true;
			this.set("activated", true);
		},

		onClose: function(){
			// summary:
			//		Callback when this menu is closed.
			//		This is called by the popup manager as notification that the menu
			//		was closed.
			// tags:
			//		private

			this.set("activated", false);
			this.set("selected", null);
			this.isShowingNow = false;
			this.parentMenu = null;
		},

		_closeChild: function(){
			// summary:
			//		Called when submenu is clicked or focus is lost.  Close hierarchy of menus.
			// tags:
			//		private
			this._stopPopupTimer();

			if(this.currentPopupItem){
				// If focus is on a descendant MenuItem then move focus to me,
				// because IE doesn't like it when you display:none a node with focus,
				// and also so keyboard users don't lose control.
				// Likely, immediately after a user defined onClick handler will move focus somewhere
				// else, like a Dialog.
				if(this.focused){
					domAttr.set(this.selected.focusNode, "tabIndex", this.tabIndex);
					this.selected.focusNode.focus();
				}

				// Close all popups that are open and descendants of this menu
				this.currentPopupItem._closePopup();
				this.currentPopupItem = null;
			}
		},

		_onItemFocus: function(/*MenuItem*/ item){
			// summary:
			//		Called when child of this Menu gets focus from:
			//
			//		1. clicking it
			//		2. tabbing into it
			//		3. being opened by a parent menu.
			//
			//		This is not called just from mouse hover.

			if(this._hoveredChild && this._hoveredChild != item){
				this.onItemUnhover(this._hoveredChild);	// any previous mouse movement is trumped by focus selection
			}
			this.set("selected", item);
		},

		_onBlur: function(){
			// summary:
			//		Called when focus is moved away from this Menu and it's submenus.
			// tags:
			//		protected

			this._cleanUp(true);
			this.inherited(arguments);
		},

		_cleanUp: function(/*Boolean*/ clearSelectedItem){
			// summary:
			//		Called when the user is done with this menu.  Closes hierarchy of menus.
			// tags:
			//		private

			this._closeChild(); // don't call this.onClose since that's incorrect for MenuBar's that never close
			if(typeof this.isShowingNow == 'undefined'){ // non-popup menu doesn't call onClose
				this.set("activated", false);
			}

			if(clearSelectedItem){
				this.set("selected", null);
			}
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Menu.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Menu.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n"

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/MenuItem.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/MenuItem.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"\n\t\trole=\"presentation\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</span>\n\t</td>\n</tr>\n"

/***/ })

}]);