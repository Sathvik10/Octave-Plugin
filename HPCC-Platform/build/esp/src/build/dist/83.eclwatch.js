(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"hpcc/DFUSearchWidget":"./eclwatch/DFUSearchWidget.js",
	"hpcc/TargetSelectWidget":"./eclwatch/TargetSelectWidget.js",
	"dojo/text!templates/DFUSearchWidget.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUSearchWidget.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[83],{

/***/ "./eclwatch/DFUSearchWidget.js":
/*!*************************************!*\
  !*** ./eclwatch/DFUSearchWidget.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/layout/BorderContainer */ "./node_modules/dijit/layout/BorderContainer.js"),
    __webpack_require__(/*! dijit/layout/TabContainer */ "./node_modules/dijit/layout/TabContainer.js"),
    __webpack_require__(/*! dijit/layout/ContentPane */ "./node_modules/dijit/layout/ContentPane.js"),
    __webpack_require__(/*! dijit/Toolbar */ "./node_modules/dijit/Toolbar.js"),
    __webpack_require__(/*! dijit/form/Textarea */ "./node_modules/dijit/form/Textarea.js"),
    __webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
    __webpack_require__(/*! dijit/registry */ "./node_modules/dijit/registry.js"),

    __webpack_require__(/*! hpcc/_Widget */ "./eclwatch/_Widget.js"),
    __webpack_require__(/*! hpcc/TargetSelectWidget */ "./eclwatch/TargetSelectWidget.js"),
    __webpack_require__(/*! hpcc/ResultsWidget */ "./eclwatch/ResultsWidget.js"),
    __webpack_require__(/*! hpcc/InfoGridWidget */ "./eclwatch/InfoGridWidget.js"),
    __webpack_require__(/*! src/ESPWorkunit */ "./lib/src/ESPWorkunit.js"),

    __webpack_require__(/*! dojo/text!../templates/DFUSearchWidget.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUSearchWidget.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    BorderContainer, TabContainer, ContentPane, Toolbar, Textarea, TitlePane, registry,
    _Widget, TargetSelectWidget, ResultsWidget, InfoGridWidget, Workunit,
    template) {
        return declare("DFUSearchWidget", [_Widget], {
            templateString: template,
            baseClass: "DFUSearchWidget",
            borderContainer: null,
            tabContainer: null,

            wu: null,
            loaded: false,

            buildRendering: function (args) {
                this.inherited(arguments);
            },

            postCreate: function (args) {
                this.inherited(arguments);
                this.borderContainer = registry.byId(this.id + "BorderContainer");
            },

            startup: function (args) {
                this.inherited(arguments);
            },

            resize: function (args) {
                this.inherited(arguments);
                this.borderContainer.resize();
            },

            layout: function (args) {
                this.inherited(arguments);
            },

            //  Hitched actions  ---
            _onSave: function (event) {
            },
            _onReset: function (event) {
            },
            _onClone: function (event) {
            },
            _onDelete: function (event) {
            },
            _onAbort: function (event) {
            },
            _onResubmit: function (event) {
            },
            _onRestart: function (event) {
            },
            _onPublish: function (event) {
            },

            //  Implementation  ---
            init: function (params) {
                if (this.inherited(arguments))
                    return;

                if (params.Wuid) {
                    this.wu = new Workunit({
                        wuid: params.Wuid
                    });
                    var context = this;
                    this.wu.monitor(function (workunit) {
                        context.monitorWorkunit(workunit);
                    });
                }
                // this.infoGridWidget.init(params);
            },

            resetPage: function () {
            },

            objectToText: function (obj) {
                var text = ""
                for (var key in obj) {
                    text += "<tr><td>" + key + ":</td>";
                    if (typeof obj[key] === "object") {
                        text += "[<br/>";
                        for (var i = 0; i < obj[key].length; ++i) {
                            text += this.objectToText(obj[key][i]);
                        }
                        text += "<br/>]<br/>";
                    } else {
                        text += "<td>" + obj[key] + "</td></tr>";

                    }
                }
                return text;

            },

            monitorWorkunit: function (response) {
                if (!this.loaded) {
                    this.loaded = true;
                }

                var context = this;
                if (this.wu.isComplete()) {
                    this.wu.getInfo({
                        onGetResults: function (response) {

                        },

                        onGetSourceFiles: function (response) {

                        },

                        onGetTimers: function (response) {

                        },

                        onGetGraphs: function (response) {

                        },

                        onAfterSend: function (response) {
                        }
                    });
                }
            }
        });
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./eclwatch/TargetSelectWidget.js":
/*!****************************************!*\
  !*** ./eclwatch/TargetSelectWidget.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),

    __webpack_require__(/*! dijit/form/Select */ "./node_modules/dijit/form/Select.js"),

    __webpack_require__(/*! hpcc/TargetSelectClass */ "./eclwatch/TargetSelectClass.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (declare,
    Select,
    TargetSelectClass) {

        return declare("TargetSelectWidget", [Select], TargetSelectClass);
    }).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./eclwatch/templates/DFUSearchWidget.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./eclwatch/templates/DFUSearchWidget.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"${baseClass}\">\n    <div id=\"${id}BorderContainer\" class=\"${baseClass}BorderContainer\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n        <div id=\"${id}ContentPane\" data-dojo-props=\"region: 'center', tabPosition: 'top'\" style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.ContentPane\">\n            <div style=\"width: 100%; height: 100%\" data-dojo-type=\"dijit.layout.BorderContainer\">\n                <div data-dojo-props=\"region: 'center'\" data-dojo-type=\"dijit.layout.ContentPane\">                \t                    \n                    <form>\n                    \t<ul>\n                    \t\t<li>\n\t\t                    \t<h2>Open DFU Workunit</h2>\n\t\t\t                    <label for=\"WorkUnitId\" class=\"Prompt\">Workunit ID:</label>\n\t\t\t                    <div><input name=\"FindDfuWu\" type=\"text\" data-dojo-type=\"dijit.form.TextBox\" placeholder=\"enter workunit id\"\n\t\t\t                    data-dojo-props=\"trim:true, propercase:true\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<button data-dojo-type=\"dijit.form.Button\" type=\"button\">Load Below\n\t\t\t                </button>\n\t\t\t                \t</div>\n\t\t\t                </li>\n\t\t\t\t\t\t</ul>\t\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\t\t\t\n\t\t\t\t\t\t<h2>Search DFU Workunits</h2>\n\t\t\t\t\t\t<label for=\"Type\" class=\"Prompt\">Type:</label>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<select name=\"SelectType\" data-dojo-type=\"dijit.form.Select\">\n    \t\t\t\t\t\t\t<option value=\"NA\">Non&ndash;Archived Workunits</option>\n    \t\t\t\t\t\t\t<option value=\"A\" selected=\"Selected\">Archived Workunits</option>    \n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t<label for=\"Username\" class=\"Prompt\">Username:</label>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<input id=\"Username\" data-dojo-type=\"dijit.form.TextBox\" placeholder=\"enter username\"\n                                data-dojo-props=\"trim:true, propercase:true\">\n                        </div>\n                        </li>\n                        <li>\n                        <label for=\"Cluster\" class=\"Prompt\">Cluster:</label>\n                        <div>\n                        \t<select name=\"SelectCluster\" data-dojo-type=\"TargetSelectWidget\">    \t\t\t\t\t\t\t\t  \n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t<label for=\"State\" class=\"Prompt\">State:</label>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<select name=\"SelectState\" data-dojo-type=\"dijit.form.Select\">\n\t                            \t<option>unknown</option>\n\t\t\t\t\t\t\t\t\t<option>scheduled</option>\n\t\t\t\t\t\t\t\t\t<option>compiled</option>\n\t\t\t\t\t\t\t\t\t<option>running</option>\n\t\t\t\t\t\t\t\t\t<option>finished</option>\n\t\t\t\t\t\t\t\t\t<option>failed</option>\n\t\t\t\t\t\t\t\t\t<option>aborting</option>\n\t\t\t\t\t\t\t\t\t<option>aborted</option>\n\t\t\t\t\t\t\t\t\t<option>blocked</option>\n\t\t\t\t\t\t\t\t\t<option>monitoring</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<label for=\"Jobname\" class=\"Prompt\">Jobname:</label>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<input id=\"FindJobName\" data-dojo-type=\"dijit.form.TextBox\" placeholder=\"enter jobname\"\n                                data-dojo-props=\"trim:true, propercase:true\">\n                        </div>\n                    </li>\n                     <li>\n                        <div>\n                        \t<button data-dojo-type=\"dijit.form.Button\" type=\"button\">Search\n                            </button>\n                        </div>\n                       </li>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n             \t<div id=\"${id}InfoContainer\" style=\"height: 35%\" data-dojo-props=\"region: 'bottom', splitter: true, minSize: 120\" data-dojo-type=\"InfoGridWidget\">  </div>\n     \t\t\n        </div>\n\t</div>\n</div>\n"

/***/ })

}]);