(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/FilterDropDownWidget":"./eclwatch/FilterDropDownWidget.js",
	"dijit/form/ToggleButton":"./node_modules/dijit/form/ToggleButton.js",
	"dijit/form/_ToggleButtonMixin":"./node_modules/dijit/form/_ToggleButtonMixin.js",
	"dojo/text!templates/FilterDropDownWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[100],{

/***/ "./eclwatch/FilterDropDownWidget.js":
/*!******************************************!*\
  !*** ./eclwatch/FilterDropDownWidget.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js"),

    __webpack_require__(/*! dojo/text!../templates/FilterDropDownWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html"),

    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),

    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domForm, on, domStyle,
    registry, Select, CheckBox,
    _Widget, Utility,
    template) {
        return declare("FilterDropDownWidget", [_Widget], {
            templateString: template,
            baseClass: "FilterDropDownWidget",
            i18n: nlsHPCC,

            _width: "100%",
            iconFilter: null,
            filterDropDown: null,
            filterForm: null,
            filterLabel: null,
            filterMessage: null,
            tableContainer: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.filterDropDown = registry.byId(this.id + "FilterDropDown");
                this.filterForm = registry.byId(this.id + "FilterForm");
                this.filterLabel = registry.byId(this.id + "FilterLabel");
                this.tableContainer = registry.byId(this.id + "TableContainer");
                this.filterApply = registry.byId(this.id + "FilterApply");
                this.filterClear = registry.byId(this.id + "FilterClear");
            },

            startup: function (args) {
                this.inherited(arguments);
                this.iconFilter = dom.byId(this.id + "IconFilter");
            },

            //  Hitched actions  ---
            _onFilterClear: function (event) {
                this.emit("clear");
                this.clear();
            },

            _onFilterApply: function (event) {
                this.filterDropDown.closeDropDown();
                this.emit("apply");
                this.refreshState();
            },

            //  Implementation  ---
            clear: function () {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    if (item instanceof Select) {
                        item.set("value", "");
                    } else {
                        item.set("value", null);
                    }
                });
            },

            setValue: function (id, value) {
                registry.byId(id).set("value", value);
                this.refreshState();
            },

            setFilterMessage: function (value) {
                dom.byId("FilterMessage").textContent = value;
                this.refreshState();
            },

            exists: function () {
                var filter = this.toObject();
                for (var key in filter) {
                    if (filter[key] !== "") {
                        return true;
                    }
                }
                return false;
            },

            toObject: function () {
                if (this.filterDropDown.get("disabled")) {
                    return {};
                }
                var retVal = {};
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var name = item.get("name");
                    if (name) {
                        var value = item.get("value");
                        if (value) {
                            retVal[name] = value;
                        }
                    }
                });
                return retVal;
            },

            fromObject: function (obj) {
                arrayUtil.forEach(this.filterForm.getDescendants(), function (item, idx) {
                    var value = obj[item.get("name")];
                    if (value) {
                        item.set("value", value);
                        if (item.defaultValue !== undefined) {
                            item.defaultValue = value;
                        }
                    }
                });
                this.refreshState();
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;
            },

            open: function (event) {
                this.filterDropDown.focus();
                this.filterDropDown.openDropDown();
            },

            close: function (event) {
                this.filterDropDown.closeDropDown();
            },

            disable: function (disable) {
                this.filterDropDown.set("disabled", disable);
            },

            reset: function (disable) {
                this.filterForm.reset();
            },

            refreshState: function () {
                if (this.exists()) {
                    this.iconFilter.src = Utility.getImageURL("filter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.params.ownLabel !== undefined && this.params.ownLabel !== null ? this.params.ownLabel : this.i18n.FilterSet;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "bold"
                    });
                } else {
                    this.iconFilter.src = Utility.getImageURL("noFilter1.png");
                    dom.byId(this.id + "FilterDropDown_label").innerHTML = this.i18n.Filter;
                    domStyle.set(this.id + "FilterDropDown_label", {
                        "font-weight": "normal"
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/ToggleButton.js":
/*!*************************************************!*\
  !*** ./node_modules/dijit/form/ToggleButton.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), // kernel.deprecated
	__webpack_require__(/*! ./Button */ "./node_modules/dijit/form/Button.js"),
	__webpack_require__(/*! ./_ToggleButtonMixin */ "./node_modules/dijit/form/_ToggleButtonMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, kernel, Button, _ToggleButtonMixin){

	// module:
	//		dijit/form/ToggleButton


	return declare("dijit.form.ToggleButton", [Button, _ToggleButtonMixin], {
		// summary:
		//		A templated button widget that can be in two states (checked or not).
		//		Can be base class for things like tabs or checkbox or radio buttons.

		baseClass: "dijitToggleButton",

		setChecked: function(/*Boolean*/ checked){
			// summary:
			//		Deprecated.  Use set('checked', true/false) instead.
			kernel.deprecated("setChecked("+checked+") is deprecated. Use set('checked',"+checked+") instead.", "", "2.0");
			this.set('checked', checked);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_ToggleButtonMixin.js":
/*!*******************************************************!*\
  !*** ./node_modules/dijit/form/_ToggleButtonMixin.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js") // domAttr.set
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, domAttr){

	// module:
	//		dijit/form/_ToggleButtonMixin

	return declare("dijit.form._ToggleButtonMixin", null, {
		// summary:
		//		A mixin to provide functionality to allow a button that can be in two states (checked or not).

		// checked: Boolean
		//		Corresponds to the native HTML `<input>` element's attribute.
		//		In markup, specified as "checked='checked'" or just "checked".
		//		True if the button is depressed, or the checkbox is checked,
		//		or the radio button is selected, etc.
		checked: false,

		// aria-pressed for toggle buttons, and aria-checked for checkboxes
		_aria_attr: "aria-pressed",

		_onClick: function(/*Event*/ evt){
			var original = this.checked;
			this._set('checked', !original); // partially set the toggled value, assuming the toggle will work, so it can be overridden in the onclick handler
			var ret = this.inherited(arguments); // the user could reset the value here
			this.set('checked', ret ? this.checked : original); // officially set the toggled or user value, or reset it back
			return ret;
		},

		_setCheckedAttr: function(/*Boolean*/ value, /*Boolean?*/ priorityChange){
			this._set("checked", value);
			var node = this.focusNode || this.domNode;
			if(this._created){ // IE is not ready to handle checked attribute (affects tab order)
				// needlessly setting "checked" upsets IE's tab order
				if(domAttr.get(node, "checked") != !!value){
					domAttr.set(node, "checked", !!value); // "mixed" -> true
				}
			}
			node.setAttribute(this._aria_attr, String(value)); // aria values should be strings
			this._handleOnChange(value, priorityChange);
		},

		postCreate: function(){ // use postCreate instead of startup so users forgetting to call startup are OK
			this.inherited(arguments);
			var node = this.focusNode || this.domNode;
			if(this.checked){
				// need this here instead of on the template so IE8 tab order works
				node.setAttribute('checked', 'checked');
			}

			// Update our reset value if it hasn't yet been set (because this.set()
			// is only called when there *is* a value)
			if(this._resetValue === undefined){
				this._lastValueReported = this._resetValue = this.checked;
			}
		},

		reset: function(){
			// summary:
			//		Reset the widget's value to what it was at initialization time

			this._hasBeenBlurred = false;

			// set checked state to original setting
			this.set('checked', this.params.checked || false);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/FilterDropDownWidget.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/FilterDropDownWidget.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=\"${baseClass}\">\n    <img id=\"${id}IconFilter\" src=\"${dojoConfig.urlInfo.resourcePath}/img/noFilter1.png\" class=\"iconNoFilter\" />\n    <div id=\"${id}FilterDropDown\" data-dojo-type=\"dijit.form.DropDownButton\">\n        <span id=\"${id}FilterLabel\">${i18n.Filter}</span>\n        <div class=\"toolTip\" data-dojo-type=\"dijit.TooltipDialog\">\n            <div id=\"${id}FilterForm\" style=\"width:${_width}\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <p class=\"bold\" id=\"FilterMessage\"></p>\n                <div id=\"${id}TableContainer\" class=\"dijitDialogPaneContentArea\" data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                    <span data-dojo-attach-point=\"containerNode\"></span>\n                </div>\n                <div class=\"dijitDialogPaneActionBar\">\n                    <button id=\"${id}FilterClear\" style=\"float:left\" data-dojo-attach-event=\"onClick:_onFilterClear\" data-dojo-type=\"dijit.form.Button\">${i18n.Clear}</button>\n                    <button id=\"${id}FilterApply\" type=\"submit\" data-dojo-attach-event=\"onClick:_onFilterApply\" data-dojo-type=\"dijit.form.Button\">${i18n.Apply}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</span>\n"

/***/ })

}]);