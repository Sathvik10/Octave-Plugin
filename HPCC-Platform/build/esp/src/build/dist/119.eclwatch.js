(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/HPCCPlatformWidget":"./eclwatch/HPCCPlatformWidget.js",
	"src/CodeMirror":"./lib/src/CodeMirror.js",
	"src/ws_machine":"./lib/src/ws_machine.js",
	"dojo/text!templates/HPCCPlatformWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[119],{

/***/ "./eclwatch/HPCCPlatformWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/HPCCPlatformWidget.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),
    __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"),
    __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"),
    __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),
    __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"),
    __webpack_require__(/*! dojo/dom-form */ "./node_modules/dojo/dom-form.js"),
    __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
    __webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"),
    __webpack_require__(/*! dojo/cookie */ "./node_modules/dojo/cookie.js"),
    __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
    __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),
    __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"),
    __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),
    __webpack_require__(/*! dijit/Tooltip */ "./node_modules/dijit/Tooltip.js"),

    __webpack_require__(/*! dojox/widget/UpgradeBar */ "./node_modules/dojox/widget/UpgradeBar.js"),
    __webpack_require__(/*! dojox/widget/ColorPicker */ "./node_modules/dojox/widget/ColorPicker.js"),

    __webpack_require__(/*! src/CodeMirror */ "./lib/src/CodeMirror.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! src/ESPActivity */ "./lib/src/ESPActivity.js"),
    __webpack_require__(/*! src/ESPUtil */ "./lib/src/ESPUtil.js"),
    __webpack_require__(/*! src/ws_account */ "./lib/src/ws_account.js"),
    __webpack_require__(/*! src/ws_access */ "./lib/src/ws_access.js"),
    __webpack_require__(/*! src/WsSMC */ "./lib/src/WsSMC.js"),
    __webpack_require__(/*! src/WsTopology */ "./lib/src/WsTopology.js"),
    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js"),
    __webpack_require__(/*! src/ws_machine */ "./lib/src/ws_machine.js"),
    __webpack_require__(/*! hpcc/LockDialogWidget */ "./eclwatch/LockDialogWidget.js"),

    __webpack_require__(/*! dojo/text!../templates/HPCCPlatformWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformWidget.html"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/StackContainer */ "./node_modules/dijit/layout/StackContainer.js"),
    __webpack_require__(/*! dijit/layout/StackController */ "./node_modules/dijit/layout/StackController.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/form/Form */ "./node_modules/dijit/form/Form.js"),
    __webpack_require__(/*! dijit/form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js"),
    __webpack_require__(/*! dijit/form/TextBox */ "./node_modules/dijit/form/TextBox.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/form/CheckBox */ "./node_modules/dijit/form/CheckBox.js"),
    __webpack_require__(/*! dijit/Dialog */ "./node_modules/dijit/Dialog.js"),
    __webpack_require__(/*! dijit/ConfirmDialog */ "./node_modules/dijit/ConfirmDialog.js"),
    __webpack_require__(/*! dijit/MenuSeparator */ "./node_modules/dijit/MenuSeparator.js"),
    __webpack_require__(/*! dijit/PopupMenuItem */ "./node_modules/dijit/PopupMenuItem.js"),

    __webpack_require__(/*! hpcc/HPCCPlatformMainWidget */ "./eclwatch/HPCCPlatformMainWidget.js"),
    __webpack_require__(/*! hpcc/TableContainer */ "./eclwatch/TableContainer.js"),
    __webpack_require__(/*! hpcc/InfoGridWidget */ "./eclwatch/InfoGridWidget.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC, arrayUtil, dom, domConstruct, domClass, domForm, domStyle, domGeo, cookie, on, query, topic, xhr,
    registry, Tooltip,
    UpgradeBar, ColorPicker,
    CodeMirror,
    _TabContainerWidget, ESPRequest, ESPActivity, ESPUtil, WsAccount, WsAccess, WsSMC, WsTopology, DelayLoadWidget, WsMachine, LockDialogWidget,
    template) {

        declare("HPCCColorPicker", [ColorPicker], {
            _underlay: "/esp/files/eclwatch/img/underlay.png",
            _hueUnderlay: "/esp/files/eclwatch/img/hue.png",
            _pickerPointer: "/esp/files/eclwatch/img/pickerPointer.png",
            _huePickerPointer: "/esp/files/eclwatch/img/hueHandle.png",
            _huePickerPointerAlly: "/esp/files/eclwatch/img/hueHandleA11y.png"
        });

        return declare("HPCCPlatformWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "HPCCPlatformWidget",
            i18n: nlsHPCC,

            bannerContent: "",
            upgradeBar: null,
            storage: null,

            postCreate: function (args) {
                this.inherited(arguments);
                this.searchText = registry.byId(this.id + "FindText");
                this.logoutBtn = registry.byId(this.id + "Logout");
                this.aboutDialog = registry.byId(this.id + "AboutDialog");
                this.setBannerDialog = registry.byId(this.id + "SetBannerDialog");
                this.stackContainer = registry.byId(this.id + "TabContainer");
                this.mainPage = registry.byId(this.id + "_Main");
                this.errWarnPage = registry.byId(this.id + "_ErrWarn");
                this.pluginsPage = registry.byId(this.id + "_Plugins");
                this.operationsPage = registry.byId(this.id + "_OPS");
                registry.byId(this.id + "SetBanner").set("disabled", true);
                this.sessionBackground = registry.byId(this.id + "SessionBackground");
                this.unlockDialog = registry.byId(this.id + "UnlockDialog");
                this.unlockUserName = registry.byId(this.id + "UnlockUserName");
                this.unlockPassword = registry.byId(this.id + "UnlockPassword");
                this.logoutConfirm = registry.byId(this.id + "LogoutConfirm");
                this.unlockForm = registry.byId(this.id + "UnlockForm");

                this.upgradeBar = new UpgradeBar({
                    notifications: [],
                    noRemindButton: ""
                });
            },

            startup: function (args) {
                this.inherited(arguments);
                domStyle.set(dom.byId(this.id + "StackController_stub_Plugins").parentNode.parentNode, {
                    visibility: "hidden"
                });
                domStyle.set(dom.byId(this.id + "StackController_stub_ErrWarn").parentNode.parentNode, {
                    visibility: "hidden"
                });
                domStyle.set(dom.byId(this.id + "StackController_stub_Config").parentNode.parentNode, {
                    visibility: "hidden"
                });
            },

            //  Implementation  ---
            refreshBanner: function (activity) {
                if (this.showBanner !== activity.ShowBanner ||
                    this.bannerContent !== activity.BannerContent ||
                    this.bannerScroll !== activity.BannerScroll ||
                    this.bannerColor !== activity.BannerColor ||
                    this.bannerSize !== activity.BannerSize) {

                    this.showBanner = activity.ShowBanner;
                    this.bannerContent = activity.BannerContent;
                    this.bannerScroll = activity.BannerScroll;
                    this.bannerColor = activity.BannerColor;
                    this.bannerSize = activity.BannerSize;
                    if (this.showBanner) {
                        var msg = "<marquee id='" + this.id + "Marquee' width='100%' direction='left' scrollamount='" + activity.BannerScroll + "' style='color:" + activity.BannerColor + ";font-size:" + ((activity.BannerSize / 2) * 100) + "%'>" + activity.BannerContent + "</marquee>";
                        this.upgradeBar.notify(msg);
                        var marquee = dom.byId(this.id + "Marquee");
                        var height = domGeo.getContentBox(marquee).h;
                        domStyle.set(this.upgradeBar.domNode, "height", height + "px");
                        domStyle.set(marquee.parentNode, { top: "auto", "margin-top": "auto" });
                    } else {
                        this.upgradeBar.notify("");
                        domStyle.set(this.upgradeBar.domNode, "height", "0px");
                    }
                }
            },

            refreshUserName: function () {
                if (this.userName) {
                    dom.byId(this.id + "UserID").textContent = this.userName;
                } else if (cookie("ESPUserName")) {
                    domConstruct.place("<span>" + cookie("ESPUserName") + "</span>", this.id + "UserID", "replace");
                    dojoConfig.username = cookie("ESPUserName");
                } else {
                    dom.byId(this.id + "UserID").textContent = "";
                }
            },

            init: function (params) {
                if (this.inherited(arguments))
                    return;

                var context = this;

                WsMachine.GetComponentStatus({
                    request: {}
                }).then(function (response) {
                    if (lang.exists("GetComponentStatusResponse.ComponentStatus", response)) {
                        var status = response.GetComponentStatusResponse.ComponentStatus
                        context.checkMonitoring(status);
                    }
                });

                WsAccount.MyAccount({
                }).then(function (response) {
                    if (lang.exists("MyAccountResponse.username", response)) {
                        context.userName = response.MyAccountResponse.username;
                        dojoConfig.username = response.MyAccountResponse.username;
                        cookie("User", response.MyAccountResponse.username);
                        context.checkIfAdmin(context.userName);
                        context.refreshUserName();
                        if (!cookie("PasswordExpiredCheck")) {
                            cookie("PasswordExpiredCheck", "true", { expires: 1 });
                            if (lang.exists("MyAccountResponse.passwordDaysRemaining", response)) {
                                switch (response.MyAccountResponse.passwordDaysRemaining) {
                                    case null:
                                        break;
                                    case -1:
                                        alert(context.i18n.PasswordExpired);
                                        context._onUserID();
                                        break;
                                    case -2:
                                        break;
                                    default:
                                        if (response.MyAccountResponse.passwordDaysRemaining <= response.MyAccountResponse.passwordExpirationWarningDays) {
                                            if (confirm(context.i18n.PasswordExpirePrefix + response.MyAccountResponse.passwordDaysRemaining + context.i18n.PasswordExpirePostfix)) {
                                                context._onUserID();
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                    }
                });

                WsTopology.TpGetServicePlugins({
                    request: {
                    }
                }).then(function (response) {
                    if (lang.exists("TpGetServicePluginsResponse.Plugins.Plugin", response) && response.TpGetServicePluginsResponse.Plugins.Plugin.length) {
                        domStyle.set(dom.byId(context.id + "StackController_stub_Plugins").parentNode.parentNode, {
                            visibility: "visible"
                        });
                    }
                });

                this.activity = ESPActivity.Get();
                this.activity.watch("Build", function (name, oldValue, newValue) {
                    context.build = WsSMC.parseBuildString(newValue);
                });
                this.activity.watch("__hpcc_changedCount", function (name, oldValue, newValue) {
                    context.refreshBanner(context.activity);
                });

                this.createStackControllerTooltip(this.id + "_Main", this.i18n.Activity);
                this.createStackControllerTooltip(this.id + "_ECL", this.i18n.ECL);
                this.createStackControllerTooltip(this.id + "_Files", this.i18n.Files);
                this.createStackControllerTooltip(this.id + "_RoxieQueries", this.i18n.PublishedQueries);
                this.createStackControllerTooltip(this.id + "_OPS", this.i18n.Operations);
                this.createStackControllerTooltip(this.id + "_Plugins", this.i18n.Plugins);
                this.initTab();
                this.checkIfSessionsAreActive();

                topic.subscribe("hpcc/monitoring_component_update", function (topic) {
                    context.checkMonitoring(topic.status);
                });
                this.storage = new ESPUtil.LocalStorage();
                this.storage.on("storageUpdate", function(msg) {
                    context._onUpdateFromStorage(msg)
                });
                this.storage.setItem("Status", "Unlocked");
            },

            _onUpdateFromStorage: function (msg){
                var context = this;
                if (msg.event.newValue === "logged_out") {
                    window.location.reload();
                } else if (msg.event.newValue === "Locked") {
                    context._onShowLock();
                } else if (msg.event.newValue === "Unlocked" || msg.event.oldValue === "Locked") {
                    context._onHideLock();
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.init) {
                        currSel.init({});
                    }
                }
            },

            getTitle: function () {
                return "ECL Watch";
            },

            checkMonitoring: function (status) {
                if (status) {
                    domClass.remove("MonitorStatus");
                    domClass.add("MonitorStatus", status);
                }
            },

            checkIfAdmin: function (user) {
                var context = this;
                if (user == null) {
                    registry.byId(context.id + "SetBanner").set("disabled", false);
                    dojo.destroy(this.monitorStatus);
                } else {
                    WsAccess.UserEdit({
                        suppressExceptionToaster: true,
                        request: {
                            username: user
                        }
                    }).then(function (response) {
                        if (lang.exists("UserEditResponse.Groups.Group", response)) {
                            arrayUtil.some(response.UserEditResponse.Groups.Group, function (item, idx) {
                                if (item.name === "Administrators" || item.name === "Directory Administrators") {
                                    dojoConfig.isAdmin = true;
                                    registry.byId(context.id + "SetBanner").set("disabled", false);
                                    if (context.widget._OPS.refresh) {
                                        context.widget._OPS.refresh();
                                    }
                                    return false;
                                }
                            });
                        }
                    });
                }
            },

            checkIfSessionsAreActive: function () {
                if (cookie("ESPSessionTimeoutSeconds")) {
                    this.logoutBtn.set("disabled", false);
                    dom.byId("UserDivider").textContent = " / ";
                    dom.byId("Lock").textContent = this.i18n.Lock;
                }
            },

            //  Hitched actions  ---
            _onUserID: function (evt) {
                var userDialog = registry.byId(this.id + "UserDialog");
                var userInfo = registry.byId(this.id + "UserInfo");
                if (!userInfo.init({ Username: this.userName })) {
                    userInfo.refresh();
                }
                userDialog.show();
            },

            _onFind: function (evt) {
                var context = this;
                this.stackContainer.selectChild(this.mainPage);
                this.mainPage.ensureWidget().then(function (mainPage) {
                    mainPage.widget.TabContainer.selectChild(mainPage.widget._Search);
                    mainPage.widget._Search.ensureWidget().then(function (searchPage) {
                        searchPage.doSearch(context.searchText.get("value"));
                    });
                });
            },

            _openNewTab: function (url) {
                var win = window.open(url, "_blank");
                if (win && win.focus) {
                    win.focus();
                }
            },

            _onOpenResources: function (evt) {
                this._openNewTab("https://hpccsystems.com/download");
            },

            _onOpenDocuments: function (evt) {
                this._openNewTab("https://hpccsystems.com/training/documentation");
            },

            _onOpenJira: function (evt) {
                this._openNewTab("https://track.hpccsystems.com/issues");
            },

            _onOpenForums: function (evt) {
                this._openNewTab("https://hpccsystems.com/bb/");
            },

            _onOpenRedBook: function (evt) {
                this._openNewTab("https://wiki.hpccsystems.com/x/fYAb");
            },

            _onOpenReleaseNotes: function (evt) {
                this._openNewTab("https://hpccsystems.com/download/release-notes");
            },

            _onOpenTransitionGuide: function (evt) {
                this._openNewTab("https://wiki.hpccsystems.com/display/hpcc/HPCC+ECL+Watch+5.0+Transition+Guide");
            },

            _onOpenConfiguration: function (evt) {
                var context = this;
                if (!this.configText) {
                    ESPRequest.send("main", "", {
                        request: {
                            config_: "",
                            PlainText: "yes"
                        },
                        handleAs: "text"
                    }).then(function (response) {
                        context.configText = context.formatXml(response);
                        context.configSourceCM = CodeMirror.fromTextArea(dom.byId(context.id + "ConfigTextArea"), {
                            tabMode: "indent",
                            matchBrackets: true,
                            lineNumbers: true,
                            mode: "xml",
                            readOnly: true,
                            foldGutter: true,
                            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
                        });
                        context.configSourceCM.setSize("100%", "100%");
                        context.configSourceCM.setValue(context.configText);
                    });
                }
                this.stackContainer.selectChild(this.widget._Config);
            },

            _onOpenErrWarn: function (evt) {
                this.stackContainer.selectChild(this.errWarnPage);
            },

            _ondebugLanguageFiles: function () {
                var context = this;
                Promise.resolve(/*! AMD require */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! hpcc/nls/hpcc */ "./eclwatch/nls/hpcc.js")]; (function (lang) {
                    var languageID = [];
                    var languageRequire = [];
                    for (var key in lang) {
                        if (key !== "root") {
                            languageID.push(key);
                            languageRequire.push("hpcc/nls/" + key + "/hpcc");
                        }
                    }
                    require(languageRequire, function () {
                        var errWarnGrid = registry.byId(context.id + "ErrWarnGrid");
                        arrayUtil.forEach(arguments, function (otherLang, idx) {
                            var langID = languageID[idx];
                            for (var key in lang.root) {
                                if (!otherLang[key]) {
                                    errWarnGrid.loadTopic({
                                        Severity: "Error",
                                        Source: context.i18n.Missing,
                                        Exceptions: [{
                                            Code: langID,
                                            FileName: languageRequire[idx] + ".js - " + key,
                                            Message: "'" + lang.root[key] + "'",
                                            Javascript: key + ": \"\","
                                        }]
                                    }, true);
                                } else if (otherLang[key] === lang.root[key]) {
                                    errWarnGrid.loadTopic({
                                        Severity: /[a-z]/.test(otherLang[key]) ? "Warning" : "Info",
                                        Source: context.i18n.EnglishQ,
                                        Exceptions: [{
                                            Code: langID,
                                            FileName: languageRequire[idx] + ".js - " + key,
                                            Message: otherLang[key],
                                            Javascript: key + ": \"\","
                                        }]
                                    }, true);
                                }
                            }
                        });
                        errWarnGrid.refreshTopics();
                    });
                }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);
                this.stackContainer.selectChild(this.errWarnPage);
            },

            _onAboutLoaded: false,
            _onAbout: function (evt) {
                if (!this._onAboutLoaded) {
                    this._onAboutLoaded = true;
                    dom.byId(this.id + "ServerVersion").value = this.build.version;
                }
                this.aboutDialog.show();
            },

            _onAboutClose: function (evt) {
                this.aboutDialog.hide();
            },

            _onShowLock: function (evt) {
                var LockDialog = new LockDialogWidget({});
                LockDialog.show()
            },

            _onLock: function (evt) {
                var LockDialog = new LockDialogWidget({});
                LockDialog._onLock();
            },

            _onHideLock: function (evt) {
                var LockDialog = new LockDialogWidget({});
                LockDialog.hide();
            },

            _onLogout: function (evt) {
                var context = this;
                this.logoutConfirm.show();
                query(".dijitDialogUnderlay").style("opacity", "0.5");
                this.logoutConfirm.on("execute", function () {
                    xhr("esp/logout", {
                        method: "post"
                    }).then(function (data) {
                        if (data) {
                            cookie("ECLWatchUser", "", { expires: -1 });
                            cookie("ESPSessionID" + location.port + " = '' ", "", { expires: -1 });
                            window.location.reload();
                            context.storage.setItem("Status", "logged_out");
                            cookie("Status", "", { expires: -1 });
                            cookie("User", "", { expires: -1 });
                        }
                    });
                });
            },

            _onMonitoring: function (evt) {
                this.stackContainer.selectChild(this.operationsPage);
                this.operationsPage.ensureWidget().then(function (operationsPage) {
                    operationsPage.widget._Topology.ensureWidget().then(function (topologyPage) {  //  This is needed otherwise topology will steal focus the first time it is delay loaded
                        operationsPage.selectChild(operationsPage.widget._Monitoring);
                    });
                });
            },

            _onSetBanner: function (evt) {
                registry.byId(this.id + "ShowBanner").set("value", this.activity.ShowBanner);
                dom.byId(this.id + "BannerContent").value = this.activity.BannerContent;
                dom.byId(this.id + "BannerColor").value = this.activity.BannerColor;
                dom.byId(this.id + "BannerSize").value = this.activity.BannerSize;
                dom.byId(this.id + "BannerScroll").value = this.activity.BannerScroll;
                this.setBannerDialog.show();
            },

            _onSetBannerOk: function (evt) {
                this.activity.setBanner(domForm.toObject(this.id + "SetBannerForm"));
                this.setBannerDialog.hide();
            },

            _onSetBannerCancel: function (evt) {
                this.setBannerDialog.hide();
            },

            createStackControllerTooltip: function (widgetID, text) {
                return new Tooltip({
                    connectId: [this.id + "StackController_" + widgetID],
                    label: text,
                    showDelay: 1,
                    position: ["below"]
                });
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/CodeMirror.js":
/*!*******************************!*\
  !*** ./lib/src/CodeMirror.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.js"), __webpack_require__(/*! codemirror/lib/codemirror */ "./node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! codemirror/mode/ecl/ecl */ "./node_modules/codemirror/mode/ecl/ecl.js"), __webpack_require__(/*! codemirror/mode/xml/xml */ "./node_modules/codemirror/mode/xml/xml.js"), __webpack_require__(/*! codemirror/addon/dialog/dialog */ "./node_modules/codemirror/addon/dialog/dialog.js"), __webpack_require__(/*! codemirror/addon/fold/brace-fold */ "./node_modules/codemirror/addon/fold/brace-fold.js"), __webpack_require__(/*! codemirror/addon/fold/comment-fold */ "./node_modules/codemirror/addon/fold/comment-fold.js"), __webpack_require__(/*! codemirror/addon/fold/foldcode */ "./node_modules/codemirror/addon/fold/foldcode.js"), __webpack_require__(/*! codemirror/addon/fold/foldgutter */ "./node_modules/codemirror/addon/fold/foldgutter.js"), __webpack_require__(/*! codemirror/addon/fold/indent-fold */ "./node_modules/codemirror/addon/fold/indent-fold.js"), __webpack_require__(/*! codemirror/addon/fold/xml-fold */ "./node_modules/codemirror/addon/fold/xml-fold.js"), __webpack_require__(/*! codemirror/addon/scroll/annotatescrollbar */ "./node_modules/codemirror/addon/scroll/annotatescrollbar.js"), __webpack_require__(/*! codemirror/addon/search/jump-to-line */ "./node_modules/codemirror/addon/search/jump-to-line.js"), __webpack_require__(/*! codemirror/addon/search/matchesonscrollbar */ "./node_modules/codemirror/addon/search/matchesonscrollbar.js"), __webpack_require__(/*! codemirror/addon/search/search */ "./node_modules/codemirror/addon/search/search.js"), __webpack_require__(/*! codemirror/addon/search/searchcursor */ "./node_modules/codemirror/addon/search/searchcursor.js"), __webpack_require__(/*! css!codemirror/lib/codemirror.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/lib/codemirror.css"), __webpack_require__(/*! css!codemirror/addon/dialog/dialog.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/dialog/dialog.css"), __webpack_require__(/*! css!codemirror/addon/fold/foldgutter.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/codemirror/addon/fold/foldgutter.css")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, tslib_1, codemirror_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    tslib_1.__exportStar(codemirror_1, exports);
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=CodeMirror.js.map

/***/ }),

/***/ "./lib/src/ws_machine.js":
/*!*******************************!*\
  !*** ./lib/src/ws_machine.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! dojo/store/Observable */ "./node_modules/dojo/store/Observable.js"), __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, declare, topic, Observable, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var NagiosStore = declare([ESPRequest.Store], {
        service: "ws_machine",
        action: "GetComponentStatus",
        responseQualifier: "GetComponentStatusResponse.ComponentStatusList.ComponentStatus",
        idProperty: "__hpcc_id"
    });
    var monitorHandle;
    function GetComponentStatus(params) {
        return ESPRequest.send("ws_machine", "GetComponentStatus", params);
    }
    exports.GetComponentStatus = GetComponentStatus;
    function GetTargetClusterInfo(params) {
        return ESPRequest.send("ws_machine", "GetTargetClusterInfo", params);
    }
    exports.GetTargetClusterInfo = GetTargetClusterInfo;
    function GetMachineInfo(params) {
        return ESPRequest.send("ws_machine", "GetMachineInfo", params);
    }
    exports.GetMachineInfo = GetMachineInfo;
    function MonitorComponentStatus(params) {
        var prevResponse = null;
        if (!monitorHandle) {
            var context = this;
            monitorHandle = setInterval(function () {
                context.GetComponentStatus(params).then(function (response) {
                    if (response && response.GetComponentStatusResponse.ComponentStatus) {
                        response.GetComponentStatusResponse.ComponentStatusList.ComponentStatus.forEach(function (row) {
                            topic.publish("hpcc/monitoring_component_update", {
                                response: response,
                                status: response.GetComponentStatusResponse.ComponentStatus
                            });
                        });
                    }
                    prevResponse = response;
                });
            }, 60000);
        }
        return prevResponse;
    }
    exports.MonitorComponentStatus = MonitorComponentStatus;
    function CreateNagiosStore(options) {
        var store = new NagiosStore(options);
        return Observable(store);
    }
    exports.CreateNagiosStore = CreateNagiosStore;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ws_machine.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformWidget.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/HPCCPlatformWidget.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"hpccMainpage\" data-dojo-props=\"gutters:false, liveSplitters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}Titlebar\" class=\"hpccTitlebar\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}StackController\" class=\"left glow\" data-dojo-props=\"containerId:'${id}TabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n            <div class=\"searchUserMoreComponents\">\n                <div id=\"${id}plugin_32-32\" class=\"left\" style=\"margin-top:9px;width:32px;height:32px;overflow:hidden\"></div>\n                <div id=\"MonitorStatus\" class=\"None\" data-dojo-attach-event=\"onClick:_onMonitoring\"></div>\n                <div class=\"seperator grey\"></div>\n                <form id=\"search-form\" onsubmit=\"return false;\">\n                    <input id=\"${id}FindText\" class=\"roundForm\" data-dojo-props=\"placeHolder: '${i18n.PlaceholderFindText}', trim: true\" data-dojo-type=\"dijit.form.TextBox\" />\n                    <button id=\"${id}Find\" type=\"submit\" data-dojo-props=\"iconClass:'iconFind', showLabel: false\" data-dojo-attach-event=\"onClick:_onFind\" data-dojo-type=\"dijit.form.Button\">${i18n.Find}</button>\n                </form>\n                <div class=\"seperator grey\"></div>\n                <div id=\"userAccount\">\n                    <span class=\"navBarLoggedin\">${i18n.LoggedInAs}:  </span>\n                    <a id=\"${id}UserID\" href=\"#\" data-dojo-attach-event=\"onClick:_onUserID\"></a>\n                    <span id=\"UserDivider\"></span>\n                    <a id=\"Lock\" href=\"#\" data-dojo-attach-event=\"onClick:_onLock\"/></a>\n                </div>\n                <div class=\"seperator grey\"></div>\n                <div id=\"${id}More\" class=\"left glow\" data-dojo-props=\"iconClass:'iconAdvanced', showLabel:false\" data-dojo-type=\"dijit.form.DropDownButton\">\n                    <span>${i18n.Advanced}</span>\n                    <div data-dojo-type=\"dijit.DropDownMenu\">\n                        <div id=\"${id}SetBanner\" data-dojo-attach-event=\"onClick:_onSetBanner\" data-dojo-type=\"dijit.MenuItem\">${i18n.SetBanner}</div>\n                        <div id=\"${id}ErrWarn\" data-dojo-attach-event=\"onClick:_onOpenErrWarn\" data-dojo-type=\"dijit.MenuItem\">${i18n.ErrorWarnings}</div>\n                        <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                        <div data-dojo-attach-event=\"onClick:_onOpenReleaseNotes\" data-dojo-type=\"dijit.MenuItem\">${i18n.ReleaseNotes}</div>\n                        <div data-dojo-attach-event=\"onClick:_onOpenDocuments\" data-dojo-type=\"dijit.MenuItem\">${i18n.Documentation}</div>\n                        <div data-dojo-attach-event=\"onClick:_onOpenResources\" data-dojo-type=\"dijit.MenuItem\">${i18n.Downloads}</div>\n                        <div data-dojo-type=\"dijit.PopupMenuItem\">\n                            <span>${i18n.AdditionalResources}</span>\n                            <div data-dojo-type=\"dijit.Menu\">\n                                <div data-dojo-attach-event=\"onClick:_onOpenRedBook\" data-dojo-type=\"dijit.MenuItem\">${i18n.RedBook}</div>\n                                <div data-dojo-attach-event=\"onClick:_onOpenForums\" data-dojo-type=\"dijit.MenuItem\">${i18n.Forums}</div>\n                                <div data-dojo-attach-event=\"onClick:_onOpenJira\" data-dojo-type=\"dijit.MenuItem\">${i18n.IssueReporting}</div>\n                                <div data-dojo-attach-event=\"onClick:_onOpenTransitionGuide\" data-dojo-type=\"dijit.MenuItem\">${i18n.TransitionGuide}</div>\n                            </div>\n                        </div>\n                        <span data-dojo-type=\"dijit.MenuSeparator\"></span>\n                        <div id=\"${id}Configuration\" data-dojo-attach-event=\"onClick:_onOpenConfiguration\" data-dojo-type=\"dijit.MenuItem\">${i18n.Configuration}</div>\n                        <div id=\"${id}About\" data-dojo-attach-event=\"onClick:_onAbout\" data-dojo-type=\"dijit.MenuItem\">${i18n.About}</div>\n                        <div id=\"${id}Logout\" data-dojo-attach-event=\"onClick:_onLogout\" data-dojo-type=\"dijit.MenuItem\" data-dojo-props=\"disabled:'true'\">Logout</div>\n                        <div data-dojo-props=\"hidden:true\" data-dojo-type=\"dijit.PopupMenuItem\">\n                            <span>${i18n.Debug}</span>\n                            <div data-dojo-type=\"dijit.Menu\">\n                                <div data-dojo-attach-event=\"onClick:_ondebugLanguageFiles\" data-dojo-type=\"dijit.MenuItem\">${i18n.LanguageFiles}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"${id}TabContainer\" style=\"width: 100%; height: 100%\" data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.StackContainer\">\n            <div id=\"${id}_Main\" data-dojo-props=\"iconClass: 'iconLogo', delayWidget: 'HPCCPlatformMainWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_ECL\" data-dojo-props=\"iconClass: 'iconWu', showLabel: false, delayWidget: 'HPCCPlatformECLWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Files\" data-dojo-props=\"iconClass: 'iconLandingZone', showLabel: false, delayWidget: 'HPCCPlatformFilesWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_RoxieQueries\" data-dojo-props=\"iconClass: 'iconTargets', showLabel: false, delayWidget: 'HPCCPlatformRoxieWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_OPS\" data-dojo-props=\"iconClass: 'iconOperations', showLabel: false, delayWidget: 'HPCCPlatformOpsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_Plugins\" data-dojo-props=\"iconClass: 'iconPlugins', showLabel: false, delayWidget: 'HPCCPlatformServicesPluginWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_ErrWarn\" data-dojo-props=\"showLabel: false\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <div id=\"${id}ErrWarnGrid\" data-dojo-props=\"title: 'Error/Warning(s)', errWarn: true, showToolbar: true\" data-dojo-type=\"InfoGridWidget\">\n                </div>\n            </div>\n            <div id=\"${id}_Config\" data-dojo-props=\"showLabel: false\" data-dojo-type=\"dijit.layout.TabContainer\">\n                <textarea id=\"${id}ConfigTextArea\">...${i18n.Loading}...</textarea>\n            </div>\n        </div>\n    </div>\n    <div id=\"${id}AboutDialog\" title=\"${i18n.AboutHPCCSystems}\" style=\"width: 480px;\" data-dojo-type=\"dijit.Dialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <div data-dojo-props=\"cols:2\" data-dojo-type=\"hpcc.TableContainer\">\n                <input id=\"${id}ServerVersion\" title=\"${i18n.Server}\" name=\"ServerVersion\" colspan=\"2\" style=\"width:100%;\" data-dojo-props=\"trim: true, readonly: true\" data-dojo-type=\"dijit.form.Textarea\" />\n            </div>\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button id=\"${id}Close\" type=\"submit\" data-dojo-attach-event=\"onClick:_onAboutClose\" data-dojo-type=\"dijit.form.Button\">${i18n.Close}</button>\n        </div>\n    </div>\n    <div id=\"${id}LogoutConfirm\" title=\"${i18n.LoggingOut}\" style=\"width: 480px;\" data-dojo-type=\"dijit.ConfirmDialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <p>${i18n.AboutToLoseSessionInformation}</p>\n        </div>\n    </div>\n    <div style=\"padding-bottom:10px;\"></div>\n    <div id=\"${id}SetBannerDialog\" title=\"Set Banner\" style=\"width: 580px;\" data-dojo-type=\"dijit.Dialog\">\n        <div class=\"dijitDialogPaneContentArea\">\n            <div id=\"${id}SetBannerForm\" onsubmit=\"return false;\" data-dojo-type=\"dijit.form.Form\">\n                <div data-dojo-type=\"hpcc.TableContainer\">\n                    <input id=\"${id}ShowBanner\" title=\"${i18n.Enable}:\" name=\"BannerAction\" data-dojo-type=\"dijit.form.CheckBox\" />\n                    <input id=\"${id}BannerContent\" title=\"${i18n.BannerMessage}:\" name=\"BannerContent\" style=\"width:100%;\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.Textarea\" />\n                    <input id=\"${id}BannerColor\" title=\"${i18n.BannerColor}:\" name=\"BannerColor\" style=\"width:100%;\" value=\"red\" data-dojo-props=\"trim: true\" data-dojo-type=\"HPCCColorPicker\" />\n                    <input id=\"${id}BannerSize\" title=\"${i18n.BannerSize}:\" name=\"BannerSize\" style=\"width:100%;\" value=\"4\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.Textarea\" />\n                    <input id=\"${id}BannerScroll\" title=\"${i18n.BannerScroll}:\" name=\"BannerScroll\" style=\"width:100%;\" value=\"2\" data-dojo-props=\"trim: true\" data-dojo-type=\"dijit.form.Textarea\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"dijitDialogPaneActionBar\">\n            <button type=\"submit\" data-dojo-attach-event=\"onClick:_onSetBannerOk\" data-dojo-type=\"dijit.form.Button\">${i18n.OK}</button>\n            <button data-dojo-attach-event=\"onClick:_onSetBannerCancel\" data-dojo-type=\"dijit.form.Button\">${i18n.Cancel}</button>\n        </div>\n    </div>\n    <div id=\"${id}UserDialog\" title=\"${i18n.UserDetails}\" data-dojo-type=\"dijit.Dialog\">\n        <div id=\"${id}UserInfo\" style=\"padding:0px; width:640px; height:480px\" data-dojo-props=\"delayWidget: 'CurrentUserDetailsWidget'\" data-dojo-type=\"DelayLoadWidget\">\n        </div>\n    </div>\n</div>"

/***/ })

}]);