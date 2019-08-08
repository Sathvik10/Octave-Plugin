(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/IFrameWidget":"./eclwatch/IFrameWidget.js",
	"dijit/Toolbar":"./node_modules/dijit/Toolbar.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dojo/text!templates/IFrameWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/IFrameWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[120],{

/***/ "./eclwatch/IFrameWidget.js":
/*!**********************************!*\
  !*** ./eclwatch/IFrameWidget.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),

    __webpack_require__(/*! dojo/text!../templates/IFrameWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/IFrameWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/ToolbarSeparator */ "./node_modules/dijit/ToolbarSeparator.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, domConstruct,
    registry,
    _Widget,
    template) {
        return declare("IFrameWidget", [_Widget], {
            templateString: template,
            baseClass: "IFrameWidget",
            i18n: nlsHPCC,

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
                this.contentPane = registry.byId(this.id + "ContentPane");
            },

            resize: function (args) {
                this.inherited(arguments);
                if (this.borderContainer) {
                    this.borderContainer.resize();
                }
            },

            _onNewPageNoFrame: function (event) {
                var win = window.open(this.params.src);
                win.focus();
            },

            //  Hitched actions  ---
            _onRefresh: function (event) {
                this.contentPane.set("content", domConstruct.create("iframe", {
                    id: this.id + "IFrame",
                    src: this.params.src,
                    style: "border:1px solid lightgray; width: 100%; height: 100%"
                }));
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.wrapInHRef(this.id + "NewPageNoFrame", this.getURL());
                this._onRefresh();
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

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/IFrameWidget.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/IFrameWidget.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n            <div id=\"${id}Refresh\" data-dojo-attach-event=\"onClick:_onRefresh\" data-dojo-props=\"iconClass:'iconRefresh'\" data-dojo-type=\"dijit.form.Button\">${i18n.Reset}</div>\n            <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n            <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n            <div id=\"${id}NewPageNoFrame\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPageNoFrame\" data-dojo-props=\"iconClass:'iconNewPageNoFrame', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPageNoFrame}</div>\n        </div>\n        <div id=\"${id}ContentPane\" style=\"border:0px; padding: 0px; border-color:none; overflow:hidden\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);