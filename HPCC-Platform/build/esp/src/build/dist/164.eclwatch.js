(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"dijit/TooltipDialog":"./node_modules/dijit/TooltipDialog.js",
	"dijit/form/DropDownButton":"./node_modules/dijit/form/DropDownButton.js",
	"dojo/query!css2":"./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./",
	"dojo/text!dijit/form/templates/DropDownButton.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html",
	"dojo/text!dijit/templates/TooltipDialog.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[164],{

/***/ "./dgrid/selector.js":
/*!***************************!*\
  !*** ./dgrid/selector.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! dojo/_base/sniff */ "./node_modules/dojo/_base/sniff.js"), __webpack_require__(/*! put-selector/put */ "./put-selector/put.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(kernel, arrayUtil, on, aspect, has, put){
	return function(column, type){
		
		var listeners = [],
			grid, headerCheckbox;
		
		if(!column){ column = {}; }
		
		if(column.type){
			column.selectorType = column.type;
			kernel.deprecated("columndef.type", "use columndef.selectorType instead", "dgrid 0.4");
		}
		// accept type as argument to Selector function, or from column def
		column.selectorType = type = type || column.selectorType || "checkbox";
		column.sortable = false;

		function disabled(item) {
			return !grid.allowSelect(grid.row(item));
		}
		
		function changeInput(value){
			// creates a function that modifies the input on an event
			return function(event){
				var rows = event.rows,
					len = rows.length,
					state = "false",
					selection, mixed, i;
				
				for(i = 0; i < len; i++){
					var element = grid.cell(rows[i], column.id).element;
					if(!element){ continue; } // skip if row has been entirely removed
					element = (element.contents || element).input;
					if(element && !element.disabled){
						// only change the value if it is not disabled
						element.checked = value;
						element.setAttribute("aria-checked", value);
					}
				}
				if(headerCheckbox.type == "checkbox"){
					selection = grid.selection;
					mixed = false;
					// see if the header checkbox needs to be indeterminate
					for(i in selection){
						// if there is anything in the selection, than it is indeterminate
						if(selection[i] != grid.allSelected){
							mixed = true;
							break;
						}
					}
					headerCheckbox.indeterminate = mixed;
					headerCheckbox.checked = grid.allSelected;
					if (mixed) {
						state = "mixed";
					} else if (grid.allSelected) {
						state = "true";
					}
					headerCheckbox.setAttribute("aria-checked", state);
				}
			};
		}
		
		function onSelect(event){
			// we would really only care about click, since other input sources, like spacebar
			// trigger a click, but the click event doesn't provide access to the shift key in firefox, so
			// listen for keydown's as well to get an event in firefox that we can properly retrieve
			// the shiftKey property from
			if(event.type == "click" || event.keyCode == 32 || (!has("opera") && event.keyCode == 13) || event.keyCode === 0){
				var row = grid.row(event);
				grid._selectionTriggerEvent = event;
				
				if(row){
					if(grid.allowSelect(row)){
						var lastRow = grid._lastSelected && grid.row(grid._lastSelected);
						
						if(type == "radio"){
							if(!lastRow || lastRow.id != row.id){
								grid.clearSelection();
								grid.select(row, null, true);
								grid._lastSelected = row.element;
							}
						}else{
							if(row){
								if(event.shiftKey){
									// make sure the last input always ends up checked for shift key
									changeInput(true)({rows: [row]});
								}else{
									// no shift key, so no range selection
									lastRow = null;
								}
								lastRow = event.shiftKey ? lastRow : null;
								grid.select(lastRow || row, row, lastRow ? undefined : null);
								grid._lastSelected = row.element;
							}
						}
					}
				}else{
					// No row resolved; must be the select-all checkbox.
					put(this, (grid.allSelected ? "!" : ".") + "dgrid-select-all");
					grid[grid.allSelected ? "clearSelection" : "selectAll"]();
				}
				grid._selectionTriggerEvent = null;
			}
		}
		
		function setupSelectionEvents(){
			// register one listener at the top level that receives events delegated
			grid._hasSelectorInputListener = true;
			listeners.push(grid.on(".dgrid-selector:click,.dgrid-selector:keydown", onSelect));
			var handleSelect = grid._handleSelect;
			grid._handleSelect = function(event){
				// ignore the default select handler for events that originate from the selector column
				if(this.cell(event).column != column){
					handleSelect.apply(this, arguments);
				}
			};
			
			// Set up disabled and grid.allowSelect to match each other's behaviors
			if(typeof column.disabled == "function"){
				var originalAllowSelect = grid.allowSelect,
					originalDisabled = column.disabled;

				// Wrap allowSelect to consult both the original allowSelect and disabled
				grid.allowSelect = function(row){
					var allow = originalAllowSelect.call(this, row);

					if (originalDisabled === disabled) {
						return allow;
					} else {
						return allow && !originalDisabled.call(column, row.data);
					}
				};

				// Then wrap disabled to simply call the new allowSelect
				column.disabled = disabled;
			}else{
				// If no disabled function was specified, institute a default one
				// which honors allowSelect
				column.disabled = disabled;
			}
			// register listeners to the select and deselect events to change the input checked value
			listeners.push(grid.on("dgrid-select", changeInput(true)));
			listeners.push(grid.on("dgrid-deselect", changeInput(false)));
		}
		
		var renderInput = typeof type == "function" ? type : function(value, cell, object){
			var parent = cell.parentNode,
				disabled;
			
			if(!grid._hasSelectorInputListener){
				setupSelectionEvents();
			}
			
			// column.disabled gets initialized or wrapped in setupSelectionEvents
			disabled = column.disabled;

			// must set the class name on the outer cell in IE for keystrokes to be intercepted
			put(parent && parent.contents ? parent : cell, ".dgrid-selector");
			var input = cell.input || (cell.input = put(cell, "input[type="+type + "]", {
				tabIndex: isNaN(column.tabIndex) ? -1 : column.tabIndex,
				disabled: disabled && (typeof disabled == "function" ?
					disabled.call(column, object) : disabled),
				checked: value
			}));
			input.setAttribute("aria-checked", !!value);
			
			return input;
		};
		
		aspect.after(column, "init", function(){
			grid = column.grid;
		});
		
		aspect.after(column, "destroy", function(){
			arrayUtil.forEach(listeners, function(l){ l.remove(); });
			grid._hasSelectorInputListener = false;
		});
		
		column.renderCell = function(object, value, cell, options, header){
			var row = object && grid.row(object);
			value = row && grid.selection[row.id];
			renderInput(value, cell, object);
		};
		column.renderHeaderCell = function(th){
			var label = "label" in column ? column.label :
				column.field || "";
			
			if(type == "radio" || !grid.allowSelectAll){
				th.appendChild(document.createTextNode(label));
				if(!grid._hasSelectorInputListener){
					setupSelectionEvents();
				}
			}else{
				renderInput(false, th, {});
			}
			headerCheckbox = th.lastChild;
		};
		
		return column;
	};
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./":
/*!*************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy?loader=dojo%2Fquery&name=css2 ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var runner = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js");
var loader = __webpack_require__(/*! dojo/query?absMid=dojo/query */ "./node_modules/dojo/query.js");
var req = __webpack_require__.dj.c();
module.exports = runner(loader, "css2", req)

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownButton.html":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/form/templates/DropDownButton.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\" data-dojo-attach-point=\"valueNode\" aria-hidden=\"true\"\n/></span>\n"

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