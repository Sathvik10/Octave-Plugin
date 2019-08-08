(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"d3-array":"./node_modules/d3-array/dist/d3-array.min.js",
	"d3-collection":"./node_modules/d3-collection/dist/d3-collection.min.js",
	"dijit/Fieldset":"./node_modules/dijit/Fieldset.js",
	// "/home/sathvik/hpcc/HPCC-Platform/build/esp/src/tmp/node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js" = "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js"
	"dojo/text!dijit/templates/Fieldset.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/d3-array/dist/d3-array.min.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-array/dist/d3-array.min.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://d3js.org/d3-array/ v1.2.4 Copyright 2018 Mike Bostock
!function(n,r){ true?r(exports):undefined}(this,function(n){"use strict";function r(n,r){return n<r?-1:n>r?1:n>=r?0:NaN}function t(n){var t;return 1===n.length&&(t=n,n=function(n,e){return r(t(n),e)}),{left:function(r,t,e,o){for(null==e&&(e=0),null==o&&(o=r.length);e<o;){var u=e+o>>>1;n(r[u],t)<0?e=u+1:o=u}return e},right:function(r,t,e,o){for(null==e&&(e=0),null==o&&(o=r.length);e<o;){var u=e+o>>>1;n(r[u],t)>0?o=u:e=u+1}return e}}}var e=t(r),o=e.right,u=e.left;function f(n,r){return[n,r]}function l(n){return null===n?NaN:+n}function i(n,r){var t,e,o=n.length,u=0,f=-1,i=0,a=0;if(null==r)for(;++f<o;)isNaN(t=l(n[f]))||(a+=(e=t-i)*(t-(i+=e/++u)));else for(;++f<o;)isNaN(t=l(r(n[f],f,n)))||(a+=(e=t-i)*(t-(i+=e/++u)));if(u>1)return a/(u-1)}function a(n,r){var t=i(n,r);return t?Math.sqrt(t):t}function h(n,r){var t,e,o,u=n.length,f=-1;if(null==r){for(;++f<u;)if(null!=(t=n[f])&&t>=t)for(e=o=t;++f<u;)null!=(t=n[f])&&(e>t&&(e=t),o<t&&(o=t))}else for(;++f<u;)if(null!=(t=r(n[f],f,n))&&t>=t)for(e=o=t;++f<u;)null!=(t=r(n[f],f,n))&&(e>t&&(e=t),o<t&&(o=t));return[e,o]}var c=Array.prototype,s=c.slice,g=c.map;function v(n){return function(){return n}}function M(n){return n}function p(n,r,t){n=+n,r=+r,t=(o=arguments.length)<2?(r=n,n=0,1):o<3?1:+t;for(var e=-1,o=0|Math.max(0,Math.ceil((r-n)/t)),u=new Array(o);++e<o;)u[e]=n+e*t;return u}var d=Math.sqrt(50),y=Math.sqrt(10),N=Math.sqrt(2);function m(n,r,t){var e=(r-n)/Math.max(0,t),o=Math.floor(Math.log(e)/Math.LN10),u=e/Math.pow(10,o);return o>=0?(u>=d?10:u>=y?5:u>=N?2:1)*Math.pow(10,o):-Math.pow(10,-o)/(u>=d?10:u>=y?5:u>=N?2:1)}function w(n,r,t){var e=Math.abs(r-n)/Math.max(0,t),o=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),u=e/o;return u>=d?o*=10:u>=y?o*=5:u>=N&&(o*=2),r<n?-o:o}function A(n){return Math.ceil(Math.log(n.length)/Math.LN2)+1}function x(n,r,t){if(null==t&&(t=l),e=n.length){if((r=+r)<=0||e<2)return+t(n[0],0,n);if(r>=1)return+t(n[e-1],e-1,n);var e,o=(e-1)*r,u=Math.floor(o),f=+t(n[u],u,n);return f+(+t(n[u+1],u+1,n)-f)*(o-u)}}function b(n,r){var t,e,o=n.length,u=-1;if(null==r){for(;++u<o;)if(null!=(t=n[u])&&t>=t)for(e=t;++u<o;)null!=(t=n[u])&&e>t&&(e=t)}else for(;++u<o;)if(null!=(t=r(n[u],u,n))&&t>=t)for(e=t;++u<o;)null!=(t=r(n[u],u,n))&&e>t&&(e=t);return e}function q(n){if(!(o=n.length))return[];for(var r=-1,t=b(n,L),e=new Array(t);++r<t;)for(var o,u=-1,f=e[r]=new Array(o);++u<o;)f[u]=n[u][r];return e}function L(n){return n.length}n.bisect=o,n.bisectRight=o,n.bisectLeft=u,n.ascending=r,n.bisector=t,n.cross=function(n,r,t){var e,o,u,l,i=n.length,a=r.length,h=new Array(i*a);for(null==t&&(t=f),e=u=0;e<i;++e)for(l=n[e],o=0;o<a;++o,++u)h[u]=t(l,r[o]);return h},n.descending=function(n,r){return r<n?-1:r>n?1:r>=n?0:NaN},n.deviation=a,n.extent=h,n.histogram=function(){var n=M,r=h,t=A;function e(e){var u,f,l=e.length,i=new Array(l);for(u=0;u<l;++u)i[u]=n(e[u],u,e);var a=r(i),h=a[0],c=a[1],s=t(i,h,c);Array.isArray(s)||(s=w(h,c,s),s=p(Math.ceil(h/s)*s,c,s));for(var g=s.length;s[0]<=h;)s.shift(),--g;for(;s[g-1]>c;)s.pop(),--g;var v,M=new Array(g+1);for(u=0;u<=g;++u)(v=M[u]=[]).x0=u>0?s[u-1]:h,v.x1=u<g?s[u]:c;for(u=0;u<l;++u)h<=(f=i[u])&&f<=c&&M[o(s,f,0,g)].push(e[u]);return M}return e.value=function(r){return arguments.length?(n="function"==typeof r?r:v(r),e):n},e.domain=function(n){return arguments.length?(r="function"==typeof n?n:v([n[0],n[1]]),e):r},e.thresholds=function(n){return arguments.length?(t="function"==typeof n?n:Array.isArray(n)?v(s.call(n)):v(n),e):t},e},n.thresholdFreedmanDiaconis=function(n,t,e){return n=g.call(n,l).sort(r),Math.ceil((e-t)/(2*(x(n,.75)-x(n,.25))*Math.pow(n.length,-1/3)))},n.thresholdScott=function(n,r,t){return Math.ceil((t-r)/(3.5*a(n)*Math.pow(n.length,-1/3)))},n.thresholdSturges=A,n.max=function(n,r){var t,e,o=n.length,u=-1;if(null==r){for(;++u<o;)if(null!=(t=n[u])&&t>=t)for(e=t;++u<o;)null!=(t=n[u])&&t>e&&(e=t)}else for(;++u<o;)if(null!=(t=r(n[u],u,n))&&t>=t)for(e=t;++u<o;)null!=(t=r(n[u],u,n))&&t>e&&(e=t);return e},n.mean=function(n,r){var t,e=n.length,o=e,u=-1,f=0;if(null==r)for(;++u<e;)isNaN(t=l(n[u]))?--o:f+=t;else for(;++u<e;)isNaN(t=l(r(n[u],u,n)))?--o:f+=t;if(o)return f/o},n.median=function(n,t){var e,o=n.length,u=-1,f=[];if(null==t)for(;++u<o;)isNaN(e=l(n[u]))||f.push(e);else for(;++u<o;)isNaN(e=l(t(n[u],u,n)))||f.push(e);return x(f.sort(r),.5)},n.merge=function(n){for(var r,t,e,o=n.length,u=-1,f=0;++u<o;)f+=n[u].length;for(t=new Array(f);--o>=0;)for(r=(e=n[o]).length;--r>=0;)t[--f]=e[r];return t},n.min=b,n.pairs=function(n,r){null==r&&(r=f);for(var t=0,e=n.length-1,o=n[0],u=new Array(e<0?0:e);t<e;)u[t]=r(o,o=n[++t]);return u},n.permute=function(n,r){for(var t=r.length,e=new Array(t);t--;)e[t]=n[r[t]];return e},n.quantile=x,n.range=p,n.scan=function(n,t){if(e=n.length){var e,o,u=0,f=0,l=n[f];for(null==t&&(t=r);++u<e;)(t(o=n[u],l)<0||0!==t(l,l))&&(l=o,f=u);return 0===t(l,l)?f:void 0}},n.shuffle=function(n,r,t){for(var e,o,u=(null==t?n.length:t)-(r=null==r?0:+r);u;)o=Math.random()*u--|0,e=n[u+r],n[u+r]=n[o+r],n[o+r]=e;return n},n.sum=function(n,r){var t,e=n.length,o=-1,u=0;if(null==r)for(;++o<e;)(t=+n[o])&&(u+=t);else for(;++o<e;)(t=+r(n[o],o,n))&&(u+=t);return u},n.ticks=function(n,r,t){var e,o,u,f,l=-1;if(t=+t,(n=+n)==(r=+r)&&t>0)return[n];if((e=r<n)&&(o=n,n=r,r=o),0===(f=m(n,r,t))||!isFinite(f))return[];if(f>0)for(n=Math.ceil(n/f),r=Math.floor(r/f),u=new Array(o=Math.ceil(r-n+1));++l<o;)u[l]=(n+l)*f;else for(n=Math.floor(n*f),r=Math.ceil(r*f),u=new Array(o=Math.ceil(n-r+1));++l<o;)u[l]=(n-l)/f;return e&&u.reverse(),u},n.tickIncrement=m,n.tickStep=w,n.transpose=q,n.variance=i,n.zip=function(){return q(arguments)},Object.defineProperty(n,"__esModule",{value:!0})});


/***/ }),

/***/ "./node_modules/d3-collection/dist/d3-collection.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-collection/dist/d3-collection.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://d3js.org/d3-collection/ v1.0.7 Copyright 2018 Mike Bostock
!function(n,t){ true?t(exports):undefined}(this,function(n){"use strict";function t(){}function e(n,e){var r=new t;if(n instanceof t)n.each(function(n,t){r.set(t,n)});else if(Array.isArray(n)){var i,u=-1,o=n.length;if(null==e)for(;++u<o;)r.set(u,n[u]);else for(;++u<o;)r.set(e(i=n[u],u,n),i)}else if(n)for(var s in n)r.set(s,n[s]);return r}function r(){return{}}function i(n,t,e){n[t]=e}function u(){return e()}function o(n,t,e){n.set(t,e)}function s(){}t.prototype=e.prototype={constructor:t,has:function(n){return"$"+n in this},get:function(n){return this["$"+n]},set:function(n,t){return this["$"+n]=t,this},remove:function(n){var t="$"+n;return t in this&&delete this[t]},clear:function(){for(var n in this)"$"===n[0]&&delete this[n]},keys:function(){var n=[];for(var t in this)"$"===t[0]&&n.push(t.slice(1));return n},values:function(){var n=[];for(var t in this)"$"===t[0]&&n.push(this[t]);return n},entries:function(){var n=[];for(var t in this)"$"===t[0]&&n.push({key:t.slice(1),value:this[t]});return n},size:function(){var n=0;for(var t in this)"$"===t[0]&&++n;return n},empty:function(){for(var n in this)if("$"===n[0])return!1;return!0},each:function(n){for(var t in this)"$"===t[0]&&n(this[t],t.slice(1),this)}};var f=e.prototype;function c(n,t){var e=new s;if(n instanceof s)n.each(function(n){e.add(n)});else if(n){var r=-1,i=n.length;if(null==t)for(;++r<i;)e.add(n[r]);else for(;++r<i;)e.add(t(n[r],r,n))}return e}s.prototype=c.prototype={constructor:s,has:f.has,add:function(n){return this["$"+(n+="")]=n,this},remove:f.remove,clear:f.clear,values:f.keys,size:f.size,empty:f.empty,each:f.each},n.nest=function(){var n,t,s,f=[],c=[];function a(r,i,u,o){if(i>=f.length)return null!=n&&r.sort(n),null!=t?t(r):r;for(var s,c,h,l=-1,v=r.length,p=f[i++],y=e(),d=u();++l<v;)(h=y.get(s=p(c=r[l])+""))?h.push(c):y.set(s,[c]);return y.each(function(n,t){o(d,t,a(n,i,u,o))}),d}return s={object:function(n){return a(n,0,r,i)},map:function(n){return a(n,0,u,o)},entries:function(n){return function n(e,r){if(++r>f.length)return e;var i,u=c[r-1];return null!=t&&r>=f.length?i=e.entries():(i=[],e.each(function(t,e){i.push({key:e,values:n(t,r)})})),null!=u?i.sort(function(n,t){return u(n.key,t.key)}):i}(a(n,0,u,o),0)},key:function(n){return f.push(n),s},sortKeys:function(n){return c[f.length-1]=n,s},sortValues:function(t){return n=t,s},rollup:function(n){return t=n,s}}},n.set=c,n.map=e,n.keys=function(n){var t=[];for(var e in n)t.push(e);return t},n.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},n.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},Object.defineProperty(n,"__esModule",{value:!0})});


/***/ }),

/***/ "./node_modules/dijit/Fieldset.js":
/*!****************************************!*\
  !*** ./node_modules/dijit/Fieldset.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
	__webpack_require__(/*! dojo/query!css2 */ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/index.js?loader=dojo%2Fquery&name=css2!./"),
	__webpack_require__(/*! dijit/TitlePane */ "./node_modules/dijit/TitlePane.js"),
	__webpack_require__(/*! dojo/text!./templates/Fieldset.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html"),
	__webpack_require__(/*! ./a11yclick */ "./node_modules/dijit/a11yclick.js")	// template uses ondijitclick
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, query, TitlePane, template){


	return declare("dijit.Fieldset", TitlePane, {
		// summary:
		//		An accessible fieldset that can be expanded or collapsed via
		//		its legend.  Fieldset extends `dijit.TitlePane`.

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: 'dijitFieldset',

		// title: String
		//		Content of the legend tag. Overrides <legend> tag if not empty.
		title: '',

		// open: Boolean
		//		Whether fieldset is opened or closed.
		open: true,

		templateString: template,

		postCreate: function() {
			if(!this.title){
				var legends = query('legend', this.containerNode);
				if(legends.length) { // oops, no legend?
					this.set('title', legends[0].innerHTML);
					legends[0].parentNode.removeChild(legends[0]);
				}
			}

			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/loaderProxy/runner.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * (C) Copyright IBM Corp. 2012, 2016 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function(loader, name, req) {
	var result, resultSet;
	loader.load(name,  req, function(data) {
		result = data;
		resultSet = true;
	}, {isBuild:true});

	if (!resultSet) {
		throw new Error(name + ' unavailable');
	}
	return result;
};


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Fieldset.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Fieldset.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fieldset>\n\t<legend data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tdata-dojo-attach-point=\"titleBarNode, titleNode\">\n\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t><span data-dojo-attach-point=\"titleNode, focusNode\" class=\"dijitFieldsetLegendNode\" id=\"${id}_titleNode\"></span>\n\t</legend>\n\t<div class=\"dijitFieldsetContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitFieldsetContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\"\n\t\t\t\t \tid=\"${id}_pane\" aria-labelledby=\"${id}_titleNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</fieldset>\n"

/***/ })

}]);