(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/HPCCPlatformOpsWidget":"./eclwatch/HPCCPlatformOpsWidget.js",
	"src/ws_elk":"./lib/src/ws_elk.js",
	"dojo/text!templates/HPCCPlatformOpsWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformOpsWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[116],{

/***/ "./eclwatch/HPCCPlatformOpsWidget.js":
/*!*******************************************!*\
  !*** ./eclwatch/HPCCPlatformOpsWidget.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
    __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"),
    __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"),
    __webpack_require__(/*! dojo/i18n!./nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"),

    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_TabContainerWidget */ "./eclwatch/_TabContainerWidget.js"),
    __webpack_require__(/*! src/ESPRequest */ "./lib/src/ESPRequest.js"),
    __webpack_require__(/*! src/ws_elk */ "./lib/src/ws_elk.js"),

    __webpack_require__(/*! dojo/text!../templates/HPCCPlatformOpsWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformOpsWidget.html"),

    __webpack_require__(/*! hpcc/UserQueryWidget */ "./eclwatch/UserQueryWidget.js"),
    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),

    __webpack_require__(/*! hpcc/DelayLoadWidget */ "./eclwatch/DelayLoadWidget.js")

], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare, lang, i18n, nlsHPCC,
    registry,
    _TabContainerWidget, ESPRequest, WsELK,
    template) {
        return declare("HPCCPlatformOpsWidget", [_TabContainerWidget], {
            templateString: template,
            baseClass: "HPCCPlatformOpsWidget",
            i18n: nlsHPCC,

            postCreate: function (args) {
                this.inherited(arguments);
                registry.byId(this.id + "_Permissions").set("disabled", true);
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            getTitle: function () {
                return this.i18n.title_HPCCPlatformOps;
            },

            //  Hitched actions  ---

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                this.refresh();
                this.initTab();
            },

            refresh: function (params) {
                if (dojoConfig.isAdmin) {
                    registry.byId(this.id + "_Permissions").set("disabled", false);
                }
            },

            initTab: function () {
                var currSel = this.getSelectedChild();
                if (currSel && !currSel.initalized) {
                    if (currSel.id === this.id + "_TargetClusters") {
                        currSel.set("content", dojo.create("iframe", {
                            src: dojoConfig.urlInfo.pathname + "?Widget=IFrameWidget&src=" + encodeURIComponent(ESPRequest.getBaseURL("WsTopology") + "/TpTargetClusterQuery?Type=ROOT"),
                            style: "border: 0; width: 100%; height: 100%"
                        }));
                    } else if (currSel.id === this.id + "_ClusterProcesses") {
                        currSel.set("content", dojo.create("iframe", {
                            src: dojoConfig.urlInfo.pathname + "?Widget=IFrameWidget&src=" + encodeURIComponent(ESPRequest.getBaseURL("WsTopology") + "/TpClusterQuery?Type=ROOT"),
                            style: "border: 0; width: 100%; height: 100%"
                        }));
                    } else if (currSel.id === this.id + "_SystemServers") {
                        currSel.set("content", dojo.create("iframe", {
                            src: dojoConfig.urlInfo.pathname + "?Widget=IFrameWidget&src=" + encodeURIComponent(ESPRequest.getBaseURL("WsTopology") + "/TpServiceQuery?Type=ALLSERVICES"),
                            style: "border: 0; width: 100%; height: 100%"
                        }));
                    } else if (currSel.id === this.id + "_LogVisualization") {
                        var context = this;
                        WsELK.GetConfigDetails({
                            request: {}
                        }).then(function (response) {
                            if (lang.exists("GetConfigDetailsResponse.IntegrateKibana", response) && response.GetConfigDetailsResponse.IntegrateKibana === true) {
                                var elk = response.GetConfigDetailsResponse;
                                currSel.set("content", dojo.create("iframe", {
                                    src: dojoConfig.urlInfo.pathname + "?Widget=IFrameWidget&src=" + encodeURIComponent(elk.KibanaAddress + ":" + elk.KibanaPort + elk.KibanaEntryPointURI),
                                    style: "border: 0; width: 100%; height: 100%"
                                }));
                            } else {
                                currSel.set("content", dojo.create ("div",{
                                    innerHTML: "<p>" + context.i18n.LogVisualizationUnconfigured + "</p> <br> <a href = 'https://hpccsystems.com/blog/ELK_visualizations'>" + context.i18n.LearnMore + "</a>",
                                    style: "margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: medium; color: #c91312"
                                }));
                            }
                        });
                    } else if (currSel.init) {
                        currSel.init({});
                    }
                    currSel.initalized = true;
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./lib/src/ws_elk.js":
/*!***************************!*\
  !*** ./lib/src/ws_elk.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! ./ESPRequest */ "./lib/src/ESPRequest.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ESPRequest) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function GetConfigDetails(params) {
        return ESPRequest.send("ws_elk", "GetConfigDetails", params);
    }
    exports.GetConfigDetails = GetConfigDetails;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ws_elk.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/HPCCPlatformOpsWidget.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/HPCCPlatformOpsWidget.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%; margin:0; padding:0\" data-dojo-props=\"gutters:false, liveSplitters:false\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}TitlebarMini\" class=\"miniTitlebar\" data-dojo-props=\"region: 'top'\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div id=\"${id}StackController\" style=\"width: 100%\" data-dojo-props=\"containerId:'${id}TabContainer'\" data-dojo-type=\"dijit.layout.StackController\"></div>\n        </div>\n        <div id=\"${id}TabContainer\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.StackContainer\">\n            <div id=\"${id}_Topology\" title=\"${i18n.Topology}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"delayWidget: 'TopologyWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_DiskUsage\" title=\"${i18n.DiskUsage}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"delayWidget: 'DiskUsageWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_TargetClusters\" title=\"${i18n.TargetClusters}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_ClusterProcesses\" title=\"${i18n.ClusterProcesses}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_SystemServers\" title=\"${i18n.SystemServers}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-type=\"dijit.layout.ContentPane\">\n            </div>\n            <div id=\"${id}_Permissions\" title=\"${i18n.Security}\" data-dojo-type=\"UserQueryWidget\">\n            </div>\n            <div id=\"${id}_Monitoring\" title=\"${i18n.Monitoring}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"delayWidget: 'MonitoringWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_DESDL\" title=\"${i18n.DESDL}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"delayWidget: 'DynamicESDLQueryWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n            <div id=\"${id}_LogVisualization\" title=\"${i18n.LogVisualization}\" style=\"padding: 0px; border:0px; border-color:none; overflow: hidden\" data-dojo-props=\"delayWidget: 'LogVisualizationWidget'\" data-dojo-type=\"DelayLoadWidget\">\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ })

}]);