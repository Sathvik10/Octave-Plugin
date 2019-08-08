(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dgrid/selector":"./dgrid/selector.js",
	"hpcc/DelayLoadWidget":"./eclwatch/DelayLoadWidget.js",
	"hpcc/UserDetailsWidget":"./eclwatch/UserDetailsWidget.js",
	"src/Clippy":"./lib/src/Clippy.js",
	"dojo/text!templates/UserDetailsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserDetailsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

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

/***/ "./eclwatch/DelayLoadWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/DelayLoadWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),

    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! src/Utility */ "./lib/src/Utility.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, dom, domStyle,
    ContentPane,
    Utility) {
        return declare("DelayLoadWidget", [ContentPane], {
            __ensurePromise: undefined,
            __initPromise: undefined,
            refresh: null,

            style: {
                margin: "0px",
                padding: "0px"
            },

            startLoading: function (targetNode) {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "block");
                    domStyle.set(loadingOverlay, "opacity", "255");
                }
            },

            stopLoading: function () {
                var loadingOverlay = dom.byId("loadingOverlay");
                if (loadingOverlay) {
                    domStyle.set(loadingOverlay, "display", "none");
                    domStyle.set(loadingOverlay, "opacity", "0");
                }
            },

            ensureWidget: function () {
                if (this.__ensurePromise) return this.__ensurePromise;
                var context = this;
                this.__ensurePromise = new Promise(function (resolve, reject) {
                    context.startLoading();
                    Utility.resolve(context.delayWidget, function (Widget) {
                        var widgetInstance = new Widget(lang.mixin({
                            id: context.childWidgetID,
                            style: {
                                margin: "0px",
                                padding: "0px",
                                width: "100%",
                                height: "100%"
                            }
                        }, context.delayProps ? context.delayProps : {}));
                        context.widget = {};
                        context.widget[widgetInstance.id] = widgetInstance;
                        context.containerNode.appendChild(widgetInstance.domNode);
                        widgetInstance.startup();
                        widgetInstance.resize();
                        if (widgetInstance.refresh) {
                            context.refresh = function (params) {
                                widgetInstance.refresh(params);
                            }
                        }
                        context.stopLoading();
                        resolve(widgetInstance);
                    });
                });
                return this.__ensurePromise;
            },

            //  Implementation  ---
            reset:function() {
                for (var key in this.widget) {
                    this.widget[key].destroyRecursive();
                    delete this.widget[key];
                }
                delete this.widget;
                delete this.deferred;
                delete this.__hpcc_initalized;
                delete this.childWidgetID;
                this.containerNode.innerHTML = "";
            },

            init: function (params) {
                if (this.__initPromise) return this.__initPromise;
                this.childWidgetID = this.id + "-DL";
                var context = this;
                this.__initPromise = new Promise(function (resolve, reject) {
                    context.ensureWidget().then(function (widget) {
                        widget.init(params);
                        if (context.__hpcc_hash) {
                            context.doRestoreFromHash(context.__hpcc_hash);
                            context.__hpcc_hash = null;
                        }
                        //  Let page finish initial render ---
                        setTimeout(function () {
                            resolve(widget);
                        }, 20);
                    });
                });
                return this.__initPromise;
            },

            restoreFromHash: function (hash) {
                if (this.widget && this.widget[this.childWidgetID]) {
                    this.doRestoreFromHash(hash);
                } else {
                    this.__hpcc_hash = hash;
                }
            },
            doRestoreFromHash: function (hash) {
                if (this.widget[this.childWidgetID].restoreFromHash) {
                    this.widget[this.childWidgetID].restoreFromHash(hash);
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/UserDetailsWidget.js":
/*!***************************************!*\
  !*** ./eclwatch/UserDetailsWidget.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! dgrid/OnDemandGrid */ "./dgrid/OnDemandGrid.js"),
    __webpack_require__(/*! dgrid/Keyboard */ "./dgrid/Keyboard.js"),
    __webpack_require__(/*! dgrid/Selection */ "./dgrid/Selection.js"),
    __webpack_require__(/*! dgrid/selector */ "./dgrid/selector.js"),
    __webpack_require__(/*! dgrid/extensions/ColumnResizer */ "./dgrid/extensions/ColumnResizer.js"),
    __webpack_require__(/*! dgrid/extensions/DijitRegistry */ "./dgrid/extensions/DijitRegistry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/Clippy */ "./lib/src/Clippy.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/UserDetailsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserDetailsWidget.html"),

    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Button */ "./node_modules/dijit/form/Button.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/TooltipDialog */ "./node_modules/dijit/TooltipDialog.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),

    __webpack_require__(/*! dojox/form/PasswordValidator */ "./node_modules/dojox/form/PasswordValidator.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, dom, domAttr, domForm,
    registry,
    OnDemandGrid, Keyboard, Selection, selector, ColumnResizer, DijitRegistry,
    _TabContainerWidget, Clippy, WsAccess, DelayLoadWidget,
    template) {
        return declare("UserDetailsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "UserDetailsWidget",
            i18n: nlsHPCC,

            summaryWidget: null,
            memberOfWidget: null,
            permissionsWidget: null,
            activePermissionsWidget: null,
            user: null,

            getTitle: function () {
                return this.i18n.UserDetails;
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.summaryWidget = registry.byId(this.id + "_Summary");
                this.testWidget = registry.byId(this.id + "_Test");
                this.memberOfWidget = registry.byId(this.id + "_MemberOf");
                this.permissionsWidget = registry.byId(this.id + "_UserPermissions");
                this.activePermissionsWidget = registry.byId(this.id + "_ActivePermissions");
                this.userForm = registry.byId(this.id + "UserForm");

                Clippy.attach(this.id + "ClippyButton");
            },

            //  Hitched actions  ---
            _onSave: function (event) {
                var context = this;
                if (this.userForm.validate()) {
                    var formInfo = domForm.toObject(this.id + "UserForm");
                    WsAccess.UserInfoEdit({
                        showOkMsg: true,
                        request: {
                            username: this.user,
                            firstname: formInfo.firstname,
                            lastname: formInfo.lastname,
                            employeeID: formInfo.employeeID
                        }
                    });

                    if (formInfo.newPassword) {
                        WsAccess.UserResetPass({
                            showOkMsg: true,
                            request: {
                                username: this.user,
                                newPassword: formInfo.newPassword,
                                newPasswordRetype: formInfo.newPassword
                            }
                        }).then(function(response){
                            if (lang.exists("UserResetPassResponse", response)) {
                                if (response.UserResetPassResponse.retcode === 0) {
                                    context.getLatestUserData(context.user);
                                }
                            }
                        });
                    }
                }
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.user = params.Username;
                if (this.user) {
                    this.updateInput("User", null, this.user);
                    this.updateInput("EmployeeID", null, params.EmployeeID);
                    this.updateInput("Username", null, this.user);
                    this.updateInput("PasswordExpiration", null, params.Passwordexpiration);

                   this.getLatestUserData(this.user);
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();

                if (currSel.id === this.memberOfWidget.id) {
                    this.memberOfWidget.init({
                        username: this.user
                    });
                } else if (currSel.id === this.permissionsWidget.id) {
                    this.permissionsWidget.init({
                        username: this.user
                    });
                } else if (currSel.id === this.activePermissionsWidget.id) {
                    this.activePermissionsWidget.init({
                        IsGroup: false,
                        IncludeGroup: true,
                        AccountName: this.user
                    });
                }
            },

            getLatestUserData: function (user) {
                var context = this;
                WsAccess.UserInfoEditInput({
                    request: {
                        username: user
                    }
                }).then(function (response) {
                    if (lang.exists("UserInfoEditInputResponse.firstname", response)) {
                        context.updateInput("FirstName", null, response.UserInfoEditInputResponse.firstname);
                    }
                    if (lang.exists("UserInfoEditInputResponse.lastname", response)) {
                        context.updateInput("LastName", null, response.UserInfoEditInputResponse.lastname);
                    }
                    if (lang.exists("UserInfoEditInputResponse.employeeID", response)) {
                        context.updateInput("EmployeeID", null, response.UserInfoEditInputResponse.employeeID);
                    }
                    if (lang.exists("UserInfoEditInputResponse.PasswordExpiration", response)) {
                        context.updateInput("PasswordExpiration", null, response.UserInfoEditInputResponse.PasswordExpiration);
                    }
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./lib/src/Clippy.js":
/*!***************************!*\
  !*** ./lib/src/Clippy.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js"), __webpack_require__(/*! dijit/Tooltip */ "./node_modules/dijit/Tooltip.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/mouse */ "./node_modules/dojo/mouse.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Clipboard, Tooltip, dom, mouse, on, nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function attach(domID) {
        var clipboard = new Clipboard("#" + domID);
        clipboard.on("success", function (e) {
            e.clearSelection();
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.Copied, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
        clipboard.on("error", function (e) {
            var node = dom.byId(domID);
            Tooltip.show(nlsHPCC.PressCtrlCToCopy, node);
            on.once(node, mouse.leave, function () {
                Tooltip.hide(node);
            });
        });
    }
    exports.attach = attach;
    function attachDomNode(domNode, callback) {
        var clipboard = new Clipboard(domNode, {
            text: function (trigger) { return callback(); }
        });
        clipboard.on("success", function (e) {
            Tooltip.show(nlsHPCC.Copied, domNode);
            on.once(domNode, mouse.leave, function () {
                Tooltip.hide(domNode);
            });
        });
        clipboard.on("error", function (e) {
        });
    }
    exports.attachDomNode = attachDomNode;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=Clippy.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/UserDetailsWidget.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/UserDetailsWidget.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%;\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.TabContainer\">\n            <div id=\"${id}_Summary\" style=\"width: 100%; height: 100%\" data-dojo-props='title:\"${i18n.Summary}\", iconClass:\"iconUsers\"' data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div id=\"${id}Toolbar\" class=\"topPanel\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.Toolbar\">\n                    <div id=\"${id}SaveUsers\" data-dojo-attach-event=\"onClick:_onSave\" data-dojo-type=\"dijit.form.Button\">${i18n.Save}</div>\n                    <span data-dojo-type=\"dijit.ToolbarSeparator\"></span>\n                    <div id=\"${id}NewPage\" class=\"right\" data-dojo-attach-event=\"onClick:_onNewPage\" data-dojo-props=\"iconClass:'iconNewPage', showLabel:false\" data-dojo-type=\"dijit.form.Button\">${i18n.OpenInNewPage}</div>\n                </div>\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">\n                    <h2>\n                        <span id=\"${id}User\" class=\"bold\">${i18n.UserName}</span>\n                        <button id=\"${id}ClippyButton\" class=\"clippy\" data-clipboard-target=\"#${id}User\"><img src=\"${dojoConfig.urlInfo.resourcePath}/img/clippy.png\" alt=\"${i18n.CopyToClipboard}\"></button>\n                    </h2>\n                    <form id=\"${id}UserForm\" data-dojo-type=\"dijit.form.Form\">\n                        <ul>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}Username\">${i18n.Username}:</label>\n                                <div id=\"${id}Username\"></div>\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}EmployeeID\">${i18n.EmployeeID}:</label>\n                                <input id=\"${id}EmployeeID\" name=\"employeeID\" data-dojo-props=\"trim: true, placeHolder:'${i18n.EmployeeID}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}FirstName\">${i18n.FirstName}:</label>\n                                <input id=\"${id}FirstName\" name=\"firstname\" data-dojo-props=\"trim: true, placeHolder:'${i18n.PlaceholderFirstName}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                            </li>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}LastName\">${i18n.LastName}:</label>\n                                <input id=\"${id}LastName\" name=\"lastname\" data-dojo-props=\"trim: true, placeHolder:'${i18n.PlaceholderLastName}'\" data-dojo-type=\"dijit.form.TextBox\" />\n                            </li>\n                            <div name=\"newPassword\" data-dojo-props=\"required: false\" data-dojo-type=\"dojox.form.PasswordValidator\">\n                                <li>\n                                    <label class=\"Prompt\" for=\"${id}NewPassword\">${i18n.NewPassword}:</label>\n                                    <input name=\"newPassword\" type=\"password\" pwtype=\"new\" data-dojo-props=\"invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                </li>\n                                <li>\n                                    <label class=\"Prompt\" for=\"${id}VerifyPassword\">${i18n.ConfirmPassword}:</label>\n                                    <input name=\"newPasswordRetype\" type=\"password\" pwtype=\"verify\" data-dojo-props=\"invalidMessage:'${i18n.PasswordsDoNotMatch}', placeHolder:'${i18n.MustContainUppercaseAndSymbol}'\" data-dojo-type=\"dijit.form.ValidationTextBox\" />\n                                </li>\n                            </div>\n                            <li>\n                                <label class=\"Prompt\" for=\"${id}PasswordExpiration\">${i18n.PasswordExpiration}:</label>\n                                <div id=\"${id}PasswordExpiration\"></div>\n                            </li>\n                        </ul>\n                    </form>\n                </div>\n            </div>\n            <div id=\"${id}_MemberOf\" data-dojo-props=\"delayWidget: 'MemberOfWidget', title:'${i18n.MemberOf}', iconClass:'iconGroups'\" data-dojo-type=\"DelayLoadWidget\"></div>\n            <div id=\"${id}_ActivePermissions\" data-dojo-props=\"delayWidget: 'ShowAccountPermissionsWidget', title:'${i18n.title_ActivePermissions}', iconClass:'iconFolder'\" data-dojo-type=\"DelayLoadWidget\"></div>\n            <div id=\"${id}_UserPermissions\" data-dojo-props=\"delayWidget: 'PermissionsWidget', title:'${i18n.title_AvailablePermissions}', iconClass:'iconFolder'\" data-dojo-type=\"DelayLoadWidget\"></div>\n        </div>\n    </div>\n</div>"

/***/ })

}]);