(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/CurrentUserDetailsWidget":"./eclwatch/CurrentUserDetailsWidget.js",
	"dijit/TooltipDialog":"./node_modules/dijit/TooltipDialog.js",
	"dojo/text!templates/CurrentUserDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/CurrentUserDetailsWidget.html",
	"dojo/text!dijit/templates/TooltipDialog.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/TooltipDialog.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[80],{

/***/ "./eclwatch/CurrentUserDetailsWidget.js":
/*!**********************************************!*\
  !*** ./eclwatch/CurrentUserDetailsWidget.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/ws_account */ "./lib/src/ws_account.js"),

    __webpack_require__(/*! dojo/text!../templates/CurrentUserDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/CurrentUserDetailsWidget.html"),

    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),

    __webpack_require__(/*! dojox/form/PasswordValidator */ "./node_modules/dojox/form/PasswordValidator.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domForm,
    registry,
    _Widget, WsAccount,
    template) {
        return declare("CurrentUserDetailsWidget", [_Widget], {
            templateString: template,
            baseClass: "CurrentUserDetailsWidget",
            i18n: nlsHPCC,

            user: null,

            getTitle: function () {
                return this.i18n.UserDetails;
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.userForm = registry.byId(this.id + "UserForm");
            },

            resize: function (args) {
                this.inherited(arguments);
                this.widget.BorderContainer.resize();
            },

            //  Hitched actions  ---
            _onSave: function (event) {
                var dialog = dijit.byId("stubUserDialog");
                if (this.userForm.validate()) {
                    var formInfo = domForm.toObject(this.id + "UserForm");
                    WsAccount.UpdateUser({
                        showOkMsg: true,
                        request: {
                            username: this.user,
                            oldpass: formInfo.oldPassword,
                            newpass1: formInfo.newPassword,
                            newpass2: formInfo.newPassword
                        }
                    });
                    dialog.hide();
                }
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.user = params.Username;
                this.refresh();
            },

            refresh: function () {
                if (this.user) {
                    this.updateInput("User", null, this.user);
                    this.updateInput("Username", null, this.user);

                    var context = this;
                    WsAccount.MyAccount({
                    }).then(function (response) {
                        if (lang.exists("MyAccountResponse.firstName", response)) {
                            context.updateInput("FirstName", null, response.MyAccountResponse.firstName);
                        }
                        if (lang.exists("MyAccountResponse.employeeID", response)) {
                            context.updateInput("EmployeeID", null, response.MyAccountResponse.employeeID);
                        }
                        if (lang.exists("MyAccountResponse.lastName", response)) {
                            context.updateInput("LastName", null, response.MyAccountResponse.lastName);
                        }
                        if (lang.exists("MyAccountResponse.passwordExpiration", response)) {
                            context.updateInput("PasswordExpiration", null, response.MyAccountResponse.passwordExpiration);
                        }
                    });
                }
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/CurrentUserDetailsWidget.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/CurrentUserDetailsWidget.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}SaveUsers\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n        </div>\n        <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <h2>\n                <span id=\"${id}User\" class=\"bold\">${i18n.UserName}</span>\n            </h2>\n            <form id=\"${id}UserForm\" data-dojo-type=\"dijit.form.Form\">\n                <ul>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}Username\">${i18n.Username}:</label>\n                        <div id=\"${id}Username\"></div>\n                    </li>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}EmployeeID\">${i18n.EmployeeID}:</label>\n                        <div id=\"${id}EmployeeID\"></div>\n                    </li>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}FirstName\">${i18n.FirstName}:</label>\n                        <div id=\"${id}FirstName\"></div>\n                    </li>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}LastName\">${i18n.LastName}:</label>\n                        <div id=\"${id}LastName\"></div>\n                    </li>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}OldPassword\">${i18n.OldPassword}:</label>\n                        <input name=\"oldPassword\" type=\"password\" required=\"true\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                    </li>\n                    <div name=\"newPassword\" data-dojo-props=\"required: false\" data-dojo-type=\"dojox.form.PasswordValidator\">\n                        <li>\n                            <label class=\"Prompt\" for=\"${id}NewPassword\">${i18n.NewPassword}:</label>\n                            <input name=\"newPassword\" type=\"password\" required=\"true\" pwtype=\"new\" data-dojo-props=\"invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                        </li>\n                        <li>\n                            <label class=\"Prompt\" for=\"${id}VerifyPassword\">${i18n.ConfirmPassword}:</label>\n                            <input name=\"newPasswordRetype\" type=\"password\" required=\"true\" pwtype=\"verify\" data-dojo-props=\"invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                        </li>\n                    </div>\n                    <li>\n                        <label class=\"Prompt\" for=\"${id}PasswordExpiration\">${i18n.PasswordExpiration}:</label>\n                        <div id=\"${id}PasswordExpiration\"></div>\n                    </li>\n                </ul>\n            </form>\n        </div>\n    </div>\n</div>\n"

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