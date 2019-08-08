/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"dojoLib": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".eclwatch.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/esp/files/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	(function() { /* Start undefined extensions */
/******/ 			function mix(dest, src) { // eslint-disable-line no-unused-vars
/******/ 				for(var n in src) dest[n] = src[n];
/******/ 				return src;
/******/ 			}
/******/
/******/ 			function toUrl(name, referenceModule) {
/******/ 				return loaderScope.require.toUrl(name, referenceModule);
/******/ 			}
/******/
/******/ 			function toAbsMid(name, referenceModule) {
/******/ 				return loaderScope.require.toAbsMid(name, referenceModule);
/******/ 			}
/******/
/******/ 			// dojo require function.
/******/ 			function req(config, dependencies, callback) {
/******/ 				return contextRequire(config, dependencies, callback, 0, req);
/******/ 			};
/******/
/******/ 			function createContextRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 				if (req.absMidsById[moduleId]) {
/******/ 					moduleId = req.absMidsById[moduleId];
/******/ 				}
/******/ 				if (!moduleId) return req;
/******/ 				var result = function(a1, a2, a3) {
/******/ 					return contextRequire(a1, a2, a3, moduleId, req);
/******/ 				};
/******/ 				for (var p in req) {
/******/ 					if (req.hasOwnProperty(p)) {
/******/ 						result[p] = req[p];
/******/ 					}
/******/ 				}
/******/ 				result.toUrl = function(name) {
/******/ 					return toUrl(name, moduleId ? {mid: moduleId} : null);
/******/ 				};
/******/ 				result.toAbsMid = function(name) {
/******/ 					return toAbsMid(name, moduleId ? {mid: moduleId} : null);
/******/ 				};
/******/
/******/ 				if (req.undef) {
/******/ 					result.undef = function(mid) {
/******/ 						req.undef(mid, moduleId);
/******/ 					};
/******/ 				}
/******/ 				return result;
/******/ 			}
/******/
/******/ 			function registerAbsMids(absMids) { // eslint-disable-line no-unused-vars
/******/ 				for (var s in absMids) {
/******/ 					req.absMids[s] = absMids[s];
/******/ 					req.absMidsById[absMids[s]] = s;
/******/ 				}
/******/ 			}
/******/
/******/ 			function resolveTernaryHasExpression(expr) { // eslint-disable-line no-unused-vars
/******/ 				// Expects an expression of the form supported by dojo/has.js loader, except that module identifiers are
/******/ 				// integers corresponding to webpack module ids.  Returns a module reference if evaluation of the expression
/******/ 				// using the currently defined features returns a module id, or else undefined.
/******/
/******/ 				var has = req("dojo/has");
/******/ 				var id = has.normalize(expr, function(arg){return arg;});
/******/ 				return id && __webpack_require__(id) || undefined;
/******/ 			}
/******/
/******/ 			function findModule(mid, referenceModule, noInstall, asModuleObj) {
/******/ 				mid = mid.split("!").map(function(segment) {
/******/ 					var isRelative = segment.charAt(0) === '.';
/******/ 					if(isRelative && !referenceModule){
/******/ 						return mid;
/******/ 					}
/******/ 					return toAbsMid(segment, referenceModule ? {mid: referenceModule} : null);
/******/ 				}).join("!");
/******/ 				var result;
/******/ 				if (mid in req.absMids && __webpack_require__.m[req.absMids[mid]]) {
/******/ 					if (noInstall) {
/******/ 						var module = installedModules[req.absMids[mid]];
/******/ 						result = module && module.l && (asModuleObj ? module : module.exports);
/******/ 					} else {
/******/ 						result = __webpack_require__(req.absMids[mid]);
/******/ 					}
/******/ 				}
/******/ 				if (!result) {
/******/ 					throw new Error('Module not found: ' + mid);
/******/ 				}
/******/ 				return result;
/******/ 			}
/******/
/******/ 			function dojoModuleFromWebpackModule(webpackModule) { // eslint-disable-line no-unused-vars
/******/ 				var result = {exports: webpackModule.exports};
/******/ 				var id = webpackModule.i;
/******/ 				if (req.absMidsById[id]) {
/******/ 					id = req.absMidsById[id];
/******/ 				}
/******/ 				result.i = result.id = id;
/******/ 				return result;
/******/ 			}
/******/
/******/ 			function contextRequire(a1, a2, a3, referenceModule, req) { // eslint-disable-line no-shadow
/******/ 				var type = ({}.toString).call(a1);
/******/ 				if (type === '[object String]') {
/******/ 					// a3 is passed by require calls injected into dependency arrays for dependencies specified
/******/ 					// as identifiers (vs. string literals).
/******/ 					var noInstall = !(a3 === false);
/******/ 					return findModule(a1, referenceModule, noInstall);
/******/ 				} else if (type === '[object Object]') {
/******/ 					throw new Error('Require config is not supported by WebPack');
/******/ 				}
/******/ 				if (type === '[object Array]') {
/******/ 					var modules = [], callback = a2, errors = [];
/******/ 					a1.forEach(function (mid) {
/******/ 						try {
/******/ 							modules.push(findModule(mid, referenceModule));
/******/ 						} catch (e) {
/******/ 							errors.push({mid: mid, error: e});
/******/ 						}
/******/ 					});
/******/ 					if (errors.length === 0) {
/******/ 						if (callback) {
/******/ 							callback.apply(this, modules);
/******/ 						}
/******/ 					} else {
/******/ 						var error = new Error("findModules");
/******/ 						error.src = "dojo-webpack-plugin";
/******/ 						error.info = errors;
/******/ 						req.signal("error", error);
/******/ 					}
/******/ 					return req;
/******/ 				} else {
/******/ 					throw new Error('Unsupported require call');
/******/ 				}
/******/ 			}
/******/ 			req.toUrl = toUrl;
/******/ 			req.toAbsMid = toAbsMid;
/******/ 			req.absMids = {};
/******/ 			req.absMidsById = [];
/******/ 			req.async = 1;
/******/ 		var globalObj = this||window;
/******/ 		registerAbsMids({
/******/ 			// "/tmp/tmp-8943N4aShxkxr7Sp/dojo/dojo.js" = "../../../../../../../../tmp/tmp-8943N4aShxkxr7Sp/dojo/dojo.js"
/******/ 			"hpcc/nls/bs/hpcc":"./eclwatch/nls/bs/hpcc.js",
/******/ 			"hpcc/nls/es/hpcc":"./eclwatch/nls/es/hpcc.js",
/******/ 			"hpcc/nls/hpcc":"./eclwatch/nls/hpcc.js",
/******/ 			"hpcc/nls/hr/hpcc":"./eclwatch/nls/hr/hpcc.js",
/******/ 			"hpcc/nls/hu/hpcc":"./eclwatch/nls/hu/hpcc.js",
/******/ 			"hpcc/nls/pt-br/hpcc":"./eclwatch/nls/pt-br/hpcc.js",
/******/ 			"hpcc/nls/sr/hpcc":"./eclwatch/nls/sr/hpcc.js",
/******/ 			"hpcc/nls/zh/hpcc":"./eclwatch/nls/zh/hpcc.js",
/******/ 			"lib/src/dojoLib":"./lib/src/dojoLib.js",
/******/ 			// "/home/sathvik/hpcc/HPCC-Platform/build/esp/src/tmp/node_modules/dojo-webpack-plugin/lib/NoModule.js" = "./node_modules/dojo-webpack-plugin/lib/NoModule.js"
/******/ 			"dojo/i18n!hpcc/nls/hpcc":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js",
/******/ 			// "/home/sathvik/hpcc/HPCC-Platform/build/esp/src/tmp/node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js" = "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js"
/******/ 			"dojo/Deferred":"./node_modules/dojo/Deferred.js",
/******/ 			"dojo/Evented":"./node_modules/dojo/Evented.js",
/******/ 			"dojo/_base/Deferred":"./node_modules/dojo/_base/Deferred.js",
/******/ 			"dojo/_base/array":"./node_modules/dojo/_base/array.js",
/******/ 			"dojo/_base/config":"./node_modules/dojo/_base/config.js",
/******/ 			"dojo/_base/json":"./node_modules/dojo/_base/json.js",
/******/ 			"dojo/_base/kernel":"./node_modules/dojo/_base/kernel.js",
/******/ 			"dojo/_base/lang":"./node_modules/dojo/_base/lang.js",
/******/ 			"dojo/_base/sniff":"./node_modules/dojo/_base/sniff.js",
/******/ 			"dojo/_base/window":"./node_modules/dojo/_base/window.js",
/******/ 			"dojo/_base/xhr":"./node_modules/dojo/_base/xhr.js",
/******/ 			"dojo/aspect":"./node_modules/dojo/aspect.js",
/******/ 			"dojo/dom-form":"./node_modules/dojo/dom-form.js",
/******/ 			"dojo/dom":"./node_modules/dojo/dom.js",
/******/ 			"dojo/domReady":"./node_modules/dojo/domReady.js",
/******/ 			"dojo/errors/CancelError":"./node_modules/dojo/errors/CancelError.js",
/******/ 			"dojo/errors/RequestError":"./node_modules/dojo/errors/RequestError.js",
/******/ 			"dojo/errors/RequestTimeoutError":"./node_modules/dojo/errors/RequestTimeoutError.js",
/******/ 			"dojo/errors/create":"./node_modules/dojo/errors/create.js",
/******/ 			"dojo/global":"./node_modules/dojo/global.js",
/******/ 			"dojo/has":"./node_modules/dojo/has.js",
/******/ 			"dojo/i18n":"./node_modules/dojo/i18n.js",
/******/ 			"dojo/io-query":"./node_modules/dojo/io-query.js",
/******/ 			"dojo/json":"./node_modules/dojo/json.js",
/******/ 			"dojo/on":"./node_modules/dojo/on.js",
/******/ 			"dojo/promise/Promise":"./node_modules/dojo/promise/Promise.js",
/******/ 			"dojo/promise/instrumentation":"./node_modules/dojo/promise/instrumentation.js",
/******/ 			"dojo/promise/tracer":"./node_modules/dojo/promise/tracer.js",
/******/ 			"dojo/ready":"./node_modules/dojo/ready.js",
/******/ 			"dojo/request/handlers":"./node_modules/dojo/request/handlers.js",
/******/ 			"dojo/request/util":"./node_modules/dojo/request/util.js",
/******/ 			"dojo/request/watch":"./node_modules/dojo/request/watch.js",
/******/ 			"dojo/request/xhr":"./node_modules/dojo/request/xhr.js",
/******/ 			"dojo/request/default!":"./node_modules/dojo/request/xhr.js",
/******/ 			"dojo/sniff":"./node_modules/dojo/sniff.js",
/******/ 			"dojo/when":"./node_modules/dojo/when.js"
/******/ 		});
/******/
/******/ 		globalObj.require = req;
/******/ 			(this||window)["webpackJsonp"].registerAbsMids = registerAbsMids;
/******/
/******/ 		// expose the Dojo compatibility functions as a properties of __webpack_require__
/******/ 		if (__webpack_require__.dj) throw new Error("__webpack_require__.dj name collision.")
/******/ 		__webpack_require__.dj = {
/******/ 			r: req,
/******/ 			c: createContextRequire,
/******/ 			m: dojoModuleFromWebpackModule,
/******/ 			h: resolveTernaryHasExpression
/******/ 		};
/******/ 		var loaderScope = {document:globalObj.document};
/******/ 		loaderScope.global = loaderScope.window = loaderScope;
/******/ 		globalObj.dojoConfig = globalObj.dojoConfig || {}
/******/ 		var userConfig = mix(globalObj.dojoConfig, ({'baseUrl':'.','deps':['hpcc/stub'],'async':true,'parseOnLoad':false,'isDebug':false,'vizDebug':false,'selectorEngine':'lite','blankGif':'/esp/files/eclwatch/img/blank.gif','paths':({'hpcc':'./eclwatch','src':'./lib/src','ganglia':'./ganglia','templates':'./eclwatch/templates','ecl':'./eclwatch/ecl','css':'./loader/css','d3-array':'./node_modules/d3-array/dist/d3-array.min','d3-collection':'./node_modules/d3-collection/dist/d3-collection.min','d3-color':'./node_modules/d3-color/dist/d3-color.min','d3-format':'./node_modules/d3-format/dist/d3-format.min','d3-interpolate':'./node_modules/d3-interpolate/dist/d3-interpolate.min','d3-scale':'./node_modules/d3-scale/build/d3-scale.min','d3-selection':'./node_modules/d3-selection/dist/d3-selection.min','d3-time':'./node_modules/d3-time/dist/d3-time.min','d3-time-format':'./node_modules/d3-time-format/dist/d3-time-format.min','@hpcc-js/api':'./node_modules/@hpcc-js/api/dist/index.min','@hpcc-js/chart':'./node_modules/@hpcc-js/chart/dist/index.min','@hpcc-js/common':'./node_modules/@hpcc-js/common/dist/index.min','@hpcc-js/comms':'./node_modules/@hpcc-js/comms/dist/index.min','@hpcc-js/composite':'./node_modules/@hpcc-js/composite/dist/index.min','@hpcc-js/dgrid':'./node_modules/@hpcc-js/dgrid/dist/index.min','@hpcc-js/dgrid-shim':'./node_modules/@hpcc-js/dgrid-shim/dist/index.min','@hpcc-js/eclwatch':'./node_modules/@hpcc-js/eclwatch/dist/index.min','@hpcc-js/form':'./node_modules/@hpcc-js/form/dist/index.min','@hpcc-js/graph':'./node_modules/@hpcc-js/graph/dist/index.min','@hpcc-js/layout':'./node_modules/@hpcc-js/layout/dist/index.min','@hpcc-js/map':'./node_modules/@hpcc-js/map/dist/index.min','@hpcc-js/other':'./node_modules/@hpcc-js/other/dist/index.min','@hpcc-js/timeline':'./node_modules/@hpcc-js/timeline/dist/index.min','@hpcc-js/tree':'./node_modules/@hpcc-js/tree/dist/index.min','@hpcc-js/util':'./node_modules/@hpcc-js/util/dist/index.min','@hpcc-js/TopoJSON':'/esp/files/dist/TopoJSON','clipboard':'./node_modules/clipboard/dist/clipboard','codemirror':'./node_modules/codemirror','crossfilter':'./node_modules/crossfilter2/crossfilter.min','font-awesome':'./node_modules/@hpcc-js/common/font-awesome','tslib':'./node_modules/tslib/tslib'}),'packages':[({'name':'dojo','location':'./node_modules/dojo','lib':'.'}),({'name':'dijit','location':'./node_modules/dijit','lib':'.'}),({'name':'dojox','location':'./node_modules/dojox','lib':'.'}),({'name':'dojo-themes','location':'./node_modules/dojo-themes','lib':'.'}),({'name':'dgrid','location':'./dgrid','lib':'.'}),({'name':'xstyle','location':'./xstyle','lib':'.'}),({'name':'put-selector','location':'./put-selector','lib':'.'})]}));
/******/ 		var defaultConfig = ({'hasCache':({'webpack':1,'host-browser':1,'dom':1,'dojo-loader':1,'dojo-has-api':1,'dojo-dom-ready-api':1,'dojo-sniff':1,'dojo-test-sniff':1,'config-deferredInstrumentation':1,'config-tlmSiblingOfDojo':1})});
/******/ 		var dojoLoader = __webpack_require__("../../../../../../../../tmp/tmp-8943N4aShxkxr7Sp/dojo/dojo.js");
/******/ 		dojoLoader.call(loaderScope, userConfig, defaultConfig, loaderScope, loaderScope);
/******/ 		['baseUrl','has','rawConfig','on','signal'].forEach(function(name) {req[name] = loaderScope.require[name]})
/******/ 	})(); /* End undefined extensions */
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/src/dojoLib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../tmp/tmp-8943N4aShxkxr7Sp/dojo/dojo.js":
/*!**********************************************!*\
  !*** /tmp/tmp-8943N4aShxkxr7Sp/dojo/dojo.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(userConfig, defaultConfig, global, window) { this.loaderVersion = "1.14.2"; (function(
	userConfig,
	defaultConfig
){
	// summary:
	//		This is the "source loader" and is the entry point for Dojo during development. You may also load Dojo with
	//		any AMD-compliant loader via the package main module dojo/main.
	// description:
	//		This is the "source loader" for Dojo. It provides an AMD-compliant loader that can be configured
	//		to operate in either synchronous or asynchronous modes. After the loader is defined, dojo is loaded
	//		IAW the package main module dojo/main. In the event you wish to use a foreign loader, you may load dojo as a package
	//		via the package main module dojo/main and this loader is not required; see dojo/package.json for details.
	//
	//		In order to keep compatibility with the v1.x line, this loader includes additional machinery that enables
	//		the dojo.provide, dojo.require et al API. This machinery is loaded by default, but may be dynamically removed
	//		via the has.js API and statically removed via the build system.
	//
	//		This loader includes sniffing machinery to determine the environment; the following environments are supported:
	//
	//		- browser
	//		- node.js
	//		- rhino
	//
	//		This is the so-called "source loader". As such, it includes many optional features that may be discarded by
	//		building a customized version with the build system.

	// Design and Implementation Notes
	//
	// This is a dojo-specific adaption of bdLoad, donated to the dojo foundation by Altoviso LLC.
	//
	// This function defines an AMD-compliant (http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)
	// loader that can be configured to operate in either synchronous or asynchronous modes.
	//
	// Since this machinery implements a loader, it does not have the luxury of using a load system and/or
	// leveraging a utility library. This results in an unpleasantly long file; here is a road map of the contents:
	//
	//	 1. Small library for use implementing the loader.
	//	 2. Define the has.js API; this is used throughout the loader to bracket features.
	//	 3. Define the node.js and rhino sniffs and sniff.
	//	 4. Define the loader's data.
	//	 5. Define the configuration machinery.
	//	 6. Define the script element sniffing machinery and sniff for configuration data.
	//	 7. Configure the loader IAW the provided user, default, and sniffing data.
	//	 8. Define the global require function.
	//	 9. Define the module resolution machinery.
	//	10. Define the module and plugin module definition machinery
	//	11. Define the script injection machinery.
	//	12. Define the window load detection.
	//	13. Define the logging API.
	//	14. Define the tracing API.
	//	16. Define the AMD define function.
	//	17. Define the dojo v1.x provide/require machinery--so called "legacy" modes.
	//	18. Publish global variables.
	//
	// Language and Acronyms and Idioms
	//
	// moduleId: a CJS module identifier, (used for public APIs)
	// mid: moduleId (used internally)
	// packageId: a package identifier (used for public APIs)
	// pid: packageId (used internally); the implied system or default package has pid===""
	// pack: package is used internally to reference a package object (since javascript has reserved words including "package")
	// prid: plugin resource identifier
	// The integer constant 1 is used in place of true and 0 in place of false.
	//
	// The "foreign-loader" has condition is defined if another loader is being used (e.g. webpack) and this code is only
	// needed for resolving module identifiers based on the config.  In this case, only the functions require.toUrl and 
	// require.toAbsMid are supported.  The require and define functions are not supported.

	// define global
	var globalObject = (function(){
		if (typeof global !== 'undefined' && typeof global !== 'function') {
			// global spec defines a reference to the global object called 'global'
			// https://github.com/tc39/proposal-global
			// `global` is also defined in NodeJS
			return global;
		}
		else if (typeof window !== 'undefined') {
			// window is defined in browsers
			return window;
		}
		else if (typeof self !== 'undefined') {
			// self is defined in WebWorkers
			return self;
		}
		return this;
	})();

	// define a minimal library to help build the loader
	var noop = function(){
		},

		isEmpty = function(it){
			for(var p in it){
				return 0;
			}
			return 1;
		},

		toString = {}.toString,

		isFunction = function(it){
			return toString.call(it) == "[object Function]";
		},

		isString = function(it){
			return toString.call(it) == "[object String]";
		},

		isArray = function(it){
			return toString.call(it) == "[object Array]";
		},

		forEach = function(vector, callback){
			if(vector){
				for(var i = 0; i < vector.length;){
					callback(vector[i++]);
				}
			}
		},

		mix = function(dest, src){
			for(var p in src){
				dest[p] = src[p];
			}
			return dest;
		},

		makeError = function(error, info){
			return mix(new Error(error), {src:"dojoLoader", info:info});
		},

		uidSeed = 1,

		uid = function(){
			// Returns a unique identifier (within the lifetime of the document) of the form /_d+/.
			return "_" + uidSeed++;
		},

		// FIXME: how to doc window.require() api

		// this will be the global require function; define it immediately so we can start hanging things off of it
		req = function(
			config,		  //(object, optional) hash of configuration properties
			dependencies, //(array of commonjs.moduleId, optional) list of modules to be loaded before applying callback
			callback	  //(function, optional) lambda expression to apply to module values implied by dependencies
		){
			return contextRequire(config, dependencies, callback, 0, req);
		},

		// the loader uses the has.js API to control feature inclusion/exclusion; define then use throughout
		global = globalObject,

		doc = global.document,

		element = doc && doc.createElement("DiV"),

		has = req.has = function(name){
			return isFunction(hasCache[name]) ? (hasCache[name] = hasCache[name](global, doc, element)) : hasCache[name];
		},

		hasCache = has.cache = defaultConfig.hasCache;

	if (isFunction(userConfig)) {
		userConfig = userConfig(globalObject);
	}

	has.add = function(name, test, now, force){
		(hasCache[name]===undefined || force) && (hasCache[name] = test);
		return now && has(name);
	};

	 0 && has.add("host-node", userConfig.has && "host-node" in userConfig.has ?
		userConfig.has["host-node"] :
		(typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
	if( 0 ){}

	 0 && has.add("host-rhino", userConfig.has && "host-rhino" in userConfig.has ?
		userConfig.has["host-rhino"] :
		(typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
	if( 0 ){ var baseUrl, arg, rhinoArgs, i; }

	 0 && has.add("host-webworker", ((typeof WorkerGlobalScope !== 'undefined') && (self instanceof WorkerGlobalScope)));
	if( 0 ){}

	// userConfig has tests override defaultConfig has tests; do this after the environment detection because
	// the environment detection usually sets some has feature values in the hasCache.
	for(var p in userConfig.has){
		has.add(p, userConfig.has[p], 0, 1);
	}

	//
	// define the loader data
	//

	// the loader will use these like symbols if the loader has the traceApi; otherwise
	// define magic numbers so that modules can be provided as part of defaultConfig
	var requested = 1,
		arrived = 2,
		nonmodule = 3,
		executing = 4,
		executed = 5;

	if( 0 ){}

	var legacyMode = 0,
		sync = "sync",
		xd = "xd",
		syncExecStack = [],
		dojoRequirePlugin = 0,
		checkDojoRequirePlugin = noop,
		transformToAmd = noop,
		getXhr;
	if( 0 ){ var XMLHTTP_PROGIDS, progid, i, locationProtocol, locationHost; }else{
		req.async = 1;
	}

	//
	// loader eval
	//
	var eval_ =   1  ?
		// noop eval if there are csp restrictions
		function(){} :
		// use the function constructor so our eval is scoped close to (but not in) in the global space with minimal pollution
		undefined;

	req.eval =
		function(text, hint){
			return eval_(text + "\r\n//# sourceURL=" + hint);
		};

	//
	// loader micro events API
	//
	var listenerQueues = {},
		error = "error",
		signal = req.signal = function(type, args){
			var queue = listenerQueues[type];
			// notice we run a copy of the queue; this allows listeners to add/remove
			// other listeners without affecting this particular signal
			forEach(queue && queue.slice(0), function(listener){
				listener.apply(null, isArray(args) ? args : [args]);
			});
		},
		on = req.on = function(type, listener){
			// notice a queue is not created until a client actually connects
			var queue = listenerQueues[type] || (listenerQueues[type] = []);
			queue.push(listener);
			return {
				remove:function(){
					for(var i = 0; i<queue.length; i++){
						if(queue[i]===listener){
							queue.splice(i, 1);
							return;
						}
					}
				}
			};
		};

	// configuration machinery; with an optimized/built defaultConfig, all configuration machinery can be discarded
	// lexical variables hold key loader data structures to help with minification; these may be completely,
	// one-time initialized by defaultConfig for optimized/built versions
	var
		aliases
			// a vector of pairs of [regexs or string, replacement] => (alias, actual)
			= [],

		paths
			// CommonJS paths
			= {},

		pathsMapProg
			// list of (from-path, to-path, regex, length) derived from paths;
			// a "program" to apply paths; see computeMapProg
			= [],

		packs
			// a map from packageId to package configuration object; see fixupPackageInfo
			= {},

		map = req.map
			// AMD map config variable; dojo/_base/kernel needs req.map to figure out the scope map
			= {},

		mapProgs
			// vector of quads as described by computeMapProg; map-key is AMD map key, map-value is AMD map value
			= [],

		modules
			// A hash:(mid) --> (module-object) the module namespace
			//
			// pid: the package identifier to which the module belongs (e.g., "dojo"); "" indicates the system or default package
			// mid: the fully-resolved (i.e., mappings have been applied) module identifier without the package identifier (e.g., "dojo/io/script")
			// url: the URL from which the module was retrieved
			// pack: the package object of the package to which the module belongs
			// executed: 0 => not executed; executing => in the process of traversing deps and running factory; executed => factory has been executed
			// deps: the dependency vector for this module (vector of modules objects)
			// def: the factory for this module
			// result: the result of the running the factory for this module
			// injected: (0 | requested | arrived) the status of the module; nonmodule means the resource did not call define
			// load: plugin load function; applicable only for plugins
			//
			// Modules go through several phases in creation:
			//
			// 1. Requested: some other module's definition or a require application contained the requested module in
			//	  its dependency vector or executing code explicitly demands a module via req.require.
			//
			// 2. Injected: a script element has been appended to the insert-point element demanding the resource implied by the URL
			//
			// 3. Loaded: the resource injected in [2] has been evaluated.
			//
			// 4. Defined: the resource contained a define statement that advised the loader about the module. Notice that some
			//	  resources may just contain a bundle of code and never formally define a module via define
			//
			// 5. Evaluated: the module was defined via define and the loader has evaluated the factory and computed a result.
			= {},

		cacheBust
			// query string to append to module URLs to bust browser cache
			= "",

		cache
			// hash:(mid | url)-->(function | string)
			//
			// A cache of resources. The resources arrive via a config.cache object, which is a hash from either mid --> function or
			// url --> string. The url key is distinguished from the mid key by always containing the prefix "url:". url keys as provided
			// by config.cache always have a string value that represents the contents of the resource at the given url. mid keys as provided
			// by configl.cache always have a function value that causes the same code to execute as if the module was script injected.
			//
			// Both kinds of key-value pairs are entered into cache via the function consumePendingCache, which may relocate keys as given
			// by any mappings *iff* the config.cache was received as part of a module resource request.
			//
			// Further, for mid keys, the implied url is computed and the value is entered into that key as well. This allows mapped modules
			// to retrieve cached items that may have arrived consequent to another namespace.
			//
			 = {},

		urlKeyPrefix
			// the prefix to prepend to a URL key in the cache.
			= "url:",

		pendingCacheInsert
			// hash:(mid)-->(function)
			//
			// Gives a set of cache modules pending entry into cache. When cached modules are published to the loader, they are
			// entered into pendingCacheInsert; modules are then pressed into cache upon (1) AMD define or (2) upon receiving another
			// independent set of cached modules. (1) is the usual case, and this case allows normalizing mids given in the pending
			// cache for the local configuration, possibly relocating modules.
			 = {},

		dojoSniffConfig
			// map of configuration variables
			// give the data-dojo-config as sniffed from the document (if any)
			= {},

		insertPointSibling
			// the nodes used to locate where scripts are injected into the document
			= 0;

	if( 1 ){
		if (false ) { var consumePendingCacheInsert; }
		var escapeString = function(s){
				return s.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(c){ return "\\" + c; });
			},

			computeMapProg = function(map, dest){
				// This routine takes a map as represented by a JavaScript object and initializes dest, a vector of
				// quads of (map-key, map-value, refex-for-map-key, length-of-map-key), sorted decreasing by length-
				// of-map-key. The regex looks for the map-key followed by either "/" or end-of-string at the beginning
				// of a the search source. Notice the map-value is irrelevant to the algorithm
				dest.splice(0, dest.length);
				for(var p in map){
					dest.push([
						p,
						map[p],
						new RegExp("^" + escapeString(p) + "(\/|$)"),
						p.length]);
				}
				dest.sort(function(lhs, rhs){ return rhs[3] - lhs[3]; });
				return dest;
			},

			computeAliases = function(config, dest){
				forEach(config, function(pair){
					// take a fixed-up copy...
					dest.push([isString(pair[0]) ? new RegExp("^" + escapeString(pair[0]) + "$") : pair[0], pair[1]]);
				});
			},


			fixupPackageInfo = function(packageInfo){
				// calculate the precise (name, location, main, mappings) for a package
				var name = packageInfo.name;
				if(!name){
					// packageInfo must be a string that gives the name
					name = packageInfo;
					packageInfo = {name:name};
				}
				packageInfo = mix({main:"main"}, packageInfo);
				packageInfo.location = packageInfo.location ? packageInfo.location : name;

				// packageMap is deprecated in favor of AMD map
				if(packageInfo.packageMap){
					map[name] = packageInfo.packageMap;
				}

				if(!packageInfo.main.indexOf("./")){
					packageInfo.main = packageInfo.main.substring(2);
				}

				// now that we've got a fully-resolved package object, push it into the configuration
				packs[name] = packageInfo;
			},

			delayedModuleConfig
				// module config cannot be consumed until the loader is completely initialized; therefore, all
				// module config detected during booting is memorized and applied at the end of loader initialization
				// TODO: this is a bit of a kludge; all config should be moved to end of loader initialization, but
				// we'll delay this chore and do it with a final loader 1.x cleanup after the 2.x loader prototyping is complete
				= [],


			config = function(config, booting, referenceModule){
				for(var p in config){
					if(p=="waitSeconds"){
						req.waitms = (config[p] || 0) * 1000;
					}
					if(p=="cacheBust"){
						cacheBust = config[p] ? (isString(config[p]) ? config[p] : (new Date()).getTime() + "") : "";
					}
					if(p=="baseUrl" || p=="combo"){
						req[p] = config[p];
					}
					if( false){ var mode; }
					if(config[p]!==hasCache){
						// accumulate raw config info for client apps which can use this to pass their own config
						req.rawConfig[p] = config[p];
						p!="has" && has.add("config-"+p, config[p], 0, booting);
					}
				}

				// make sure baseUrl exists
				if(!req.baseUrl){
					req.baseUrl = "./";
				}
				// make sure baseUrl ends with a slash
				if(!/\/$/.test(req.baseUrl)){
					req.baseUrl += "/";
				}

				// now do the special work for has, packages, packagePaths, paths, aliases, and cache

				for(p in config.has){
					has.add(p, config.has[p], 0, booting);
				}

				// for each package found in any packages config item, augment the packs map owned by the loader
				forEach(config.packages, fixupPackageInfo);

				// for each packagePath found in any packagePaths config item, augment the packageConfig
				// packagePaths is deprecated; remove in 2.0
				for(var baseUrl in config.packagePaths){
					forEach(config.packagePaths[baseUrl], function(packageInfo){
						var location = baseUrl + "/" + packageInfo;
						if(isString(packageInfo)){
							packageInfo = {name:packageInfo};
						}
						packageInfo.location = location;
						fixupPackageInfo(packageInfo);
					});
				}

				// notice that computeMapProg treats the dest as a reference; therefore, if/when that variable
				// is published (see dojo-publish-privates), the published variable will always hold a valid value.

				// this must come after all package processing since package processing may mutate map
				computeMapProg(mix(map, config.map), mapProgs);
				forEach(mapProgs, function(item){
					item[1] = computeMapProg(item[1], []);
					if(item[0]=="*"){
						mapProgs.star = item;
					}
				});

				// push in any paths and recompute the internal pathmap
				computeMapProg(mix(paths, config.paths), pathsMapProg);

				// aliases
				computeAliases(config.aliases, aliases);

				if (false ) { var module; }
				signal("config", [config, req.rawConfig]);
			};

		//
		// execute the various sniffs; userConfig can override and value
		//

		if( false ){ var scripts, i, script, dojoDir, src, match; }

		if( 0 ){ var doh; }

		// configure the loader; let the user override defaults
		req.rawConfig = {};
		config(defaultConfig, 1);

		// do this before setting userConfig/sniffConfig to allow userConfig/sniff overrides
		if( 0 ){}

		config(userConfig, 1);
		config(dojoSniffConfig, 1);

	}else{}


	if (false ) { var injectDependencies, contextRequire, createRequire, execQ, defQ, waiting, setRequested, setArrived, execComplete, comboPending, combosPending, comboPendingTimer; }

	var runMapProg = function(targetMid, map){
			// search for targetMid in map; return the map item if found; falsy otherwise
			if(map){
			for(var i = 0; i < map.length; i++){
				if(map[i][2].test(targetMid)){
					return map[i];
				}
			}
			}
			return 0;
		},

		compactPath = function(path){
			var result = [],
				segment, lastSegment;
			path = path.replace(/\\/g, '/').split('/');
			while(path.length){
				segment = path.shift();
				if(segment==".." && result.length && lastSegment!=".."){
					result.pop();
					lastSegment = result[result.length - 1];
				}else if(segment!="."){
					result.push(lastSegment= segment);
				} // else ignore "."
			}
			return result.join("/");
		},

		makeModuleInfo = function(pid, mid, pack, url){
			if( 0 ){ var xd; }else{
				return {pid:pid, mid:mid, pack:pack, url:url, executed:0, def:0};
			}
		},

		getModuleInfo_ = function(mid, referenceModule, packs, modules, baseUrl, mapProgs, pathsMapProg, aliases, alwaysCreate, fromPendingCache){
			// arguments are passed instead of using lexical variables so that this function my be used independent of the loader (e.g., the builder)
			// alwaysCreate is useful in this case so that getModuleInfo never returns references to real modules owned by the loader
			var pid, pack, midInPackage, mapItem, url, result, isRelative, requestedMid;
			requestedMid = mid;
			isRelative = /^\./.test(mid);
			if(/(^\/)|(\:)|(\.js$)/.test(mid) || (isRelative && !referenceModule)){
				// absolute path or protocol of .js filetype, or relative path but no reference module and therefore relative to page
				// whatever it is, it's not a module but just a URL of some sort
				// note: pid===0 indicates the routine is returning an unmodified mid

				return makeModuleInfo(0, mid, 0, mid);
			}else{
				// relative module ids are relative to the referenceModule; get rid of any dots
				mid = compactPath(isRelative ? (referenceModule.mid + "/../" + mid) : mid);
				if(/^\./.test(mid)){
					throw makeError("irrationalPath", mid);
				}
				// at this point, mid is an absolute mid

				// map the mid
				if(!fromPendingCache && !isRelative && mapProgs.star){
					mapItem = runMapProg(mid, mapProgs.star[1]);
				}
				if(!mapItem && referenceModule){
					mapItem = runMapProg(referenceModule.mid, mapProgs);
					mapItem = mapItem && runMapProg(mid, mapItem[1]);
				}

				if(mapItem){
					mid = mapItem[1] + mid.substring(mapItem[3]);
					}

				match = mid.match(/^([^\/]+)(\/(.+))?$/);
				pid = match ? match[1] : "";
				if((pack = packs[pid])){
					mid = pid + "/" + (midInPackage = (match[3] || pack.main));
				}else{
					pid = "";
				}

				// search aliases
				var candidateLength = 0,
					candidate = 0;
				forEach(aliases, function(pair){
					var match = mid.match(pair[0]);
					if(match && match.length>candidateLength){
						candidate = isFunction(pair[1]) ? mid.replace(pair[0], pair[1]) : pair[1];
					}
				});
				if(candidate){
					return getModuleInfo_(candidate, 0, packs, modules, baseUrl, mapProgs, pathsMapProg, aliases, alwaysCreate);
				}

				result = modules[mid];
				if(result){
					return alwaysCreate ? makeModuleInfo(result.pid, result.mid, result.pack, result.url) : modules[mid];
				}
			}
			// get here iff the sought-after module does not yet exist; therefore, we need to compute the URL given the
			// fully resolved (i.e., all relative indicators and package mapping resolved) module id

			// note: pid!==0 indicates the routine is returning a url that has .js appended unmodified mid
			mapItem = runMapProg(mid, pathsMapProg);
			if(mapItem){
				url = mapItem[1] + mid.substring(mapItem[3]);
			}else if(pid){
				url = (pack.location.slice(-1) === '/' ? pack.location.slice(0, -1) : pack.location) + "/" + midInPackage;
			}else if( 0 ){}else{
				url = mid;
			}
			// if result is not absolute, add baseUrl
			if(!(/(^\/)|(\:)/.test(url))){
				url = baseUrl + url;
			}
			url += ".js";
			return makeModuleInfo(pid, mid, pack, compactPath(url));
		},

		getModuleInfo = function(mid, referenceModule, fromPendingCache){
			return getModuleInfo_(mid, referenceModule, packs, modules, req.baseUrl, mapProgs, pathsMapProg, aliases, undefined, fromPendingCache);
		};

	if (false ) { var resolvePluginResourceId, dynamicPluginUidGenerator, getModule; }

	var toAbsMid = req.toAbsMid = function(mid, referenceModule){
			return getModuleInfo(mid, referenceModule).mid;
		},

		toUrl = req.toUrl = function(name, referenceModule){
			var moduleInfo = getModuleInfo(name+"/x", referenceModule),
				url= moduleInfo.url;
			return fixupUrl(moduleInfo.pid===0 ?
				// if pid===0, then name had a protocol or absolute path; either way, toUrl is the identify function in such cases
				name :
				// "/x.js" since getModuleInfo automatically appends ".js" and we appended "/x" to make name look like a module id
				url.substring(0, url.length-5)
			);
		};

	if (false ) { var nonModuleProps, makeCjs, cjsRequireModule, cjsExportsModule, cjsModuleModule, runFactory, abortExec, defOrder, promoteModuleToPlugin, resolvePluginLoadQ, finishExec, circleTrace, execModule, checkCompleteGuard, guardCheckComplete, checkComplete; }

	var fixupUrl= typeof userConfig.fixupUrl == "function" ? userConfig.fixupUrl : function(url){
			url += ""; // make sure url is a Javascript string (some paths may be a Java string)
			return url + (cacheBust ? ((/\?/.test(url) ? "&" : "?") + cacheBust) : "");
		};



	if( 0 ){}

	if( false ){ var injectPlugin, cached, injectingModule, injectingCachedModule, evalModuleText, injectModule, defineModule, runDefQ; }

	var timerId = 0,
		clearTimer = noop,
		startTimer = noop;
	if( 0 ){}

	if ( 0 ) {}

	if( false){ var scripts, i, script, domOn, windowOnLoadListener; }

	if( 0 ){}else{
		req.log = noop;
	}

	if( 0 ){ var trace; }else{
		req.trace = noop;
	}
	if (false ) { var def; } else {
		var def = noop;
	}
	// allow config to override default implementation of named functions; this is useful for
	// non-browser environments, e.g., overriding injectUrl, getText, log, etc. in node.js, Rhino, etc.
	// also useful for testing and monkey patching loader
	mix(mix(req, defaultConfig.loaderPatch), userConfig.loaderPatch);

	// now that req is fully initialized and won't change, we can hook it up to the error signal
	on(error, function(arg){
		try{
			console.error(arg);
			if(arg instanceof Error){
				for(var p in arg){
					console.log(p + ":", arg[p]);
				}
				console.log(".");
			}
		}catch(e){}
	});

	// always publish these
	mix(req, {
		uid:uid,
		cache:cache,
		packs:packs
	});


	if( 0 ){}

	// the loader can be defined exactly once; look for global define which is the symbol AMD loaders are
	// *required* to define (as opposed to require, which is optional)
	if(global.define){
		if( 0 ){}
		return;
	}else{
		global.define = def;
		global.require = req;
		if( 0 ){}
	}

	if( false){ var plugins, pluginName; }

	if( false ){ var bootDeps, bootCallback; }
	if(false ){}
})
.call(this, userConfig, defaultConfig);};

/***/ }),

/***/ "./eclwatch/nls/bs/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/bs/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

﻿!(module.exports = {
	Abort: "Prekinite",
    AbortedBy: "Prekinuto od strane",
    AbortedTime: "Vrijeme prekida",
    About: "O Aplikaciji",
    AboutGraphControl: "O Grafičkoj Kontroli",
    AboutHPCCSystems: "O HPCC Systems®",
    AboutHPCCSystemsGraphControl: "O Grafičkoj Kontroli HPCC Sistema",
    AboutToLoseSessionInformation: "Vi ćete se odjaviti i izgubiti sve informacije o sesiji. Da li želite da nastavite?",
    Account: "Račun",
    Action: "Akcija",
    Activate: "Aktivirajte",
    Activated: "Aktiviran",
    ActivateQuery: "Aktivirajte Upit",
	ActivateQueryDeletePrevious: "Aktivirajte upit, izbrišite prethodni",
	ActivateQuerySuspendPrevious: "Aktivirajte upit, suspendujte prethodni",
    Active: "Aktivan",
    ActivePackageMap: "Aktivna Mapa Paketa",
    ActiveWorkunit: "Aktivna Radna Jedinica",
    Activities: "Aktivnosti",
    Activity: "Aktivnost",
    ActivityMap: "Mapa Aktivnosti",
    ActualSize: "Tačna Veličina",
    Add: "Dodajte",
    AddAttributes: "Dodajte atribute/vrijednosti vašem metodu",
    AddAttributes2: "Dodajte Atribut(e)",
    AddBinding: "Dodajte Vezivanje",
    AddFile: "Dodajte Datoteku",
    AddGroup: "Dodajte Grupu",
    AdditionalResources: "Dodatni Resursi",
    AddPart: "Dodajte Dio",
    AddProcessMap: "Dodajte Mapu Paketa",
    AddTheseFilesToDali: "Dodajte Te Datoteke na Dali",
    AddtionalProcessesToFilter: "Dodatni Procesi Za Filtriranje",
    AddToExistingSuperfile: "Dodajte na postojeći superfajl",
    AddToSuperfile: "Dodajte na Superdatoteku",
    AddUser: "Dodajte Korisnika",
    Advanced: "Višeg Nivoa",
    All: "Svi",
    AllowAccess: "<center>Dozvolite<br>Pristup</center>",
    AllowForeignFiles: "Dozvolite Korištenje  Datoteka Sa Drugih Klastera",
    AllowFull: "<center>Dozvolite<br>Potpun</center>",
    AllowRead: "<center>Dozvolite<br>Čitanje</center>",
    AllowWrite: "<center>Dozvolite<br>Pisanje</center>",
    AllQueuedItemsCleared: "Svi poslovi iz reda čekanja su očišćeni. Trenutno aktivni posao nastavnja sa izvršavanjem.",
    ANY: "Bilo Koji",
    AnyAdditionalProcessesToFilter: "Ima li još procesa za filtriranje",
    Append: "Dodajte",
    AppendCluster: "Dodajte Klaster",
    Apply: "Primjenite",
    ArchivedOnly: "Samo Arhiviran",
    ArchivedWarning: "Upozorenje: koristite kratak vremenski period. Ako koristite duži vremenski period, pretraživanje radnih jedinica može trajati duže od dozviljenog vremena za pretraživanje .",
    Attach: "Prikačite",
    Attribute: "Atribut",
    AttributesAreRequired: "Atributi su potrebni",
    AutoRefresh: "Osvježi",
    AutoRefreshEvery: "Automatsko osvježivanje svakih x minuta",
    AutoRefreshIncrement: "Automatski korak osvježivanja",
    Back: "Nazad",
    BannerColor: "Boja Reklamnog Bloka",
    BannerMessage: "Poruka za Reklamni Blok",
    BannerScroll: "Kretanje Reklamnog Bloka",
    BannerSize: "Veličina Reklamnog Bloka",
    BinaryInstalls: "Binarne Instalacije",
    Bind: "Vežite",
    Binding: "Vezivanje",
    BindingDeleted: "Vezivanje Obrisano",
    Blob: "BLOB",
    BlobPrefix: "BLOB Prefiks",
    Bottom: "Kraj",
    BoundBy: "ograničen sa:",
    Busy: "Zauzet",
    Cancel: "Poništite",
    CancelAll: "Ukinite Sve",
    CancelAllMessage: "Prekinite tekuće poslove i očistite red čekanja. Želite li nastaviti?",
    Chart: "Grafikon",
    CheckAllNodes: "Provjerite Sve Nodove/Čvorove",
    CheckFilePermissions: "Provjerite Dozvole za Pristup Datoteci",
    CheckSingleNode: "Provjerite Jedan Nod/Čvor",
    Clear: "Očistite",
    ClearPermissionsCache: "Izbrišite Zapamćene Dozvole Za Pristup",
    ClearPermissionsCacheConfirm: "Da li ste sigurni da želite da izbrišete zapamćene dozvole za pristup na DALI i ESP? To može značajno usporiti izvršavanje radnih jedinica.",
    Clone: "Klonirajte",
    ClonedWUID: "Klonirani WUID",
    CloneTooltip: "Kopirajte Radnu Jedinicu",
    Close: "Zatvorite",
    Cluster: "Klaster",
    ClusterName: "Ime Klastera",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Procesi Na Klasteru",
    Code: "Kod",
    CodeGenerator: "Kod Generator",
    Col: "Kolona",
    CollapseAll: "Suzite sve",
    Command: "Komanda",
    Comment: "Komentar",
    Compiled: "Kompajlirano",
    Compiling: "U procesu kompajliranja",
    Completed: "Kompletiran",
    ComplexityWarning: "Više od praga {threshold} aktivnosti ({activityCount}) - zaustavite prikaz podataka?",
    Component: "Komponenta",
    Compress: "Sabijte",
    Compressed: "Komprimirani",
    CompressedFileSize: "Komprimirana Veličina Datoteke",
    Condition: "Uslov",
    Configuration: "Konfiguracija",
    ConfigureService: "Servis za Konfiguraciju",
    ConfirmPassword: "Potvrdite Lozinku",
    ConfirmRemoval: "Jeste li sigurni da to želite učiniti?",
    ContactAdmin: "Ako želite promijeniti naziv ove grupe, kontaktirajte administratora LDAP.",
    Content: "Sadržaj",
    Contents: "Sadržaji",
    ContentType: "Vrsta Sadržaja",
    ContinueWorking: "Nastavite sa radom",
    Copy: "Kopirajte",
    CopyToClipboard: "Kopirajte u clipboard",
    Count: "Izbrojte",
    CreateANewFile: "Kreirajte novi superfile",
    Created: "Proizveden",
    CreatedBy: "Autor",
    CreatedTime: "Vrijeme Kreiranja",
    Creating: "U procesu kreiranja",
    Critical: "Kritično",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "Dali IP adresa",
    dataset: ":=dataset*",
    Date: "Datum",
    Day: "Dan",
    Deactivate: "Isključite",
    Debug: "Otklonite Neispravnosti",
    DEF: "DEF",
    Defaults: "Unaprijed Definisane Vrijednosti",
    Definition: "Definicija",
    DefinitionDeleted: "Definicija je izbrisana",
    DefinitionID: "ID",
    Definitions: "Definicije",
    DelayedReplication: "Odložena replikacija",
    Delete: "Obrišite",
    DeleteBinding: "Izbrišite Vezivanje",
    Deleted: "Izbrisan",
    DeletedBinding: "Izbrisano Vezivanje",
    DeleteDirectories: "Eliminišite prazne direktirije. Želite li nastaviti?",
    DeleteEmptyDirectories: "Želite li izbrisati prazne direktorije?",
    DeletePrevious: "Izbrišite Prethodni",
    DeleteSelectedDefinitions: "Želite izbrisati izabrane definicije?",
    DeleteSelectedFiles: "Obrišite Odabrane Datoteke?",
    DeleteSelectedGroups: "Obrišite odabranu(e) grupu(e)?",
    DeleteSelectedPermissions: "Obrišite Odabrane Dozvole Za Pristup",
    DeleteSelectedQueries: "Obrišite Odabrane Zahtjeve?",
    DeleteSelectedUsers: "Obrišite Odabrane Korisnike?",
    DeleteSelectedWorkunits: "Obrišite Odabrane Radne Jedinice?",
    DeleteSuperfile: "Obrišite Superdatoteke?",
    DeleteSuperfile2: "Izbrišite Super Datoteku",
    DeleteThisPackage: "Obrišite ovaj paket?",
    Delimited: "Razgraničen",
    DenyAccess: "<center>Zabranite<br>Pristup</center>",
    DenyFull: "<center>Zabranite<br>Potpun</center>",
    DenyRead: "<center>Zabranite<br>Čitanje</center>",
    DenyWrite: "<center>Zabranite<br>Pisanje</center>",
    Depth: "Dubina",
    DepthTooltip: "Najveća Dubina Podgrafa",
    Deschedule: "Izbacite Is Reda Za Izvršavanje",
    DescheduleSelectedWorkunits: "Izbacite Odabrane Radne Jedinice Is Reda Za Izvršavanje?",
    Description: "Opis",
    DESDL: "Dinamički ESDL",
    Despray: "Ponovo Objedinite Datoteku",
    Details: "Detalji",
    DFUServerName: "Ime DFU Servera",
    DFUWorkunit: "DFU RadnaJedinica",
    Directories: "Direktorije",
    Directory: "Direktorij",
    DisableScopeScanConfirm: "Da li ste sigurni da želite da onemogućite skaniranje opsega? Promjene će biti prihvaćene poslije restarta DALIja",
    DisableScopeScans: "Onemogućite Skaniranje Opsega",
    DiskUsage: "Iskorištenost Diska",
    Distance: "Razdaljina",
    DistanceTooltip: "Maksimalna Veličina Podgrafa Za Izabranu Aktivnost",
    Dll: "Dll",
	Documentation: "Dokumentacija",
	DoNotActivateQuery: "Ne aktivirajte upit",
	DoNotRepublish: "Ne ponavljajte upit?",
    DOT: "DOT",
    DOTAttributes: "DOT Atributi",
    Down: "Neaktivan",
    Download: "Dobavite",
    Downloads: "Preuzimanje",
    DownloadToCSV: "Preuzmite u CSV formatu",
    DropZone: "Zona Prijema",
    DueToInctivity: "Bićete odjavljeni iz svih ECL Watch sesija za 3 minuta zbog neaktivnosti.",
    Duration: "Trajanje",
    DynamicNoServicesFound: "Servisi Nisu Pronađeni",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "ECL Watch zahtijeva da kolačići budu omogućeni za nastavak",
    ECLWatchSessionManagement: "Upravljanje ECL Watchom",
    ECLWorkunit: "ECL RadnaJedinica",
    Edges: "Ivice",
    Edit: "Editujte",
    EditDOT: "Editujte DOT",
    EditGraphAttributes: "Editujte Atribute Grafova",
    EditXGMML: "Editujte XGMML",
    EmployeeID: "ID Radnika",
    Empty: "(Prazan)",
    Enable: "Omogućite",
    EnableScopeScans: "Omogućite Skaniranje Opsega",
    EnableScopeScansConfirm: "Da li ste sigurni da želite da omogućite skaniranje opsega? Promjene će biti prihvaćene poslije restarta DALIja",
    EnglishQ: "Engleski?",
    EnterAPercentage: "Unesite procenat",
    EnterAPercentageOrMB: "Unesite Procenat ili MB",
    EraseHistory: "Izbrišite Istoriju",
    EraseHistoryQ: "Izbrišite Istoriju Za",
    Error: "Greška",
    Errorparsingserverresult: "Greška u analizi rezultata sa servera",
    Errors: "Greške",
    ErrorsStatus: "Greške/Stanje",
    ErrorUploadingFile: "Greška prilikom prenosa datoteke(a). Pokušajte provjeriti dozvole za prenos.",
    ErrorWarnings: "Greška/Upozorenja",
    Escape: "Eskejp",
    ESPBuildVersion: "ESP Trenutna Verzija",
    ESPNetworkAddress: "ESP Netvork Adresa",
	ESPProcessName: "Ime ESP procesa",
    EventName: "Ime Događaja",
    EventNamePH: "imedogađaja",
    EventScheduler: "Raspoređivač Događaja",
    EventText: "Opis Događaja",
    EventTextPH: "Tekst O Događaju",
    Exception: "Neočekivani Problem",
    Executed: "Izvršeno",
    Executing: "U procesu izvršavanja",
    ExpandAll: "Proširite sve",
	ExpireDays: "Ističe za (u danima)",
    Export: "Izvezite",
    ExportSelectionsToList: "Izvezite Odabrane Stvari u Listu",
    FailIfNoSourceFile: "Neuspjeh Ukoliko Datoteka Ne Postoji",
    Fatal: "Fatalan",
    Fetched: "Preuzet",
    FetchingData: "U Procesu Dobavljnja Podataka...",
    fetchingresults: "dobijeni resultati",
    File: "Datoteka",
    FileCluster: "Klaster Datoteka",
    FileCounts: "Broj Datoteka",
    FileName: "Ime Datoteke",
    FileParts: "Dio Datoteke",
    FilePath: "Lokacija Datoteke",
    FilePermission: "Dozvola Za Pristup Datoteci",
    Files: "Datoteke",
    FileScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor Datoteka",
    FileScopes: "Skop Datoteka",
    FileSize: "Veličina Datoteke",
    FilesNoPackage: "Datoteke koje ne pripadaju paketu",
    FilesPending: "Datoteke u toku",
	FilesWarning: "Broj vraćenih datoteka je preveliki. Vraćeno je samo prvih 100.000 datoteka sortiranih po datumu / vremenu. Ako želite ograničiti rezultate, podesite filter.",
    FilesWithUnknownSize: "Datoteke Sa Nepoznatim Veličinama",
    FileType: "Tip Datoteke",
    FileUploader: "Proces za premiještanje Datoteke na Server (Uploader)",
    FileUploadStillInProgress: "Učitavanje Datoteka je u Toku",
    Filter: "Filter",
    FilterSet: "Definisanje Filtera",
    Find: "Nađite",
    FindNext: "Nađite Slijedeći",
    FindPrevious: "Nađite Prethodni",
    Finished: "Završen",
    FirstN: "Prvih N",
    FirstName: "Ime",
    FirstNRows: "Prvih N Redova",
    Fixed: "Fiksni",
    Folder: "Fascikla",
    Format: "Format",
    Forums: "Forumi",
    Forward: "Naprijed",
    FoundFile: "Fajl Je Pronađen",
    FoundFileMessage: "Pronađeni fajl ima sve svoje dijelove na disku, ali dijelovi nisu poznati Dali serveru. Svi dijelovi fajla mogu biti dodani nazad na Dali server. Dijelovi mogu biti I obrisani sa klastera ako je to potrebno.",
    FromDate: "Od Datuma",
    FromSizes: "Od Veličine",
    FromTime: "Od Vremena",
    FullName: "Ime i Prezime",
    Generate: "Generišite",
    GetPart: "Dobavite Dio",
    GetSoftwareInformation: "Želite li dobiti informacije o softveru",
    Graph: "Graf",
	GraphControl: "Kontrola Grafova",
    Graphs: "Grafikoni",
    GraphView: "Slika Grafikona",
    Group: "Grupa",
    GroupBy: "Grupišite Po",
    GroupDetails: "Detalji o Grupi",
    Grouping: "Grupisanje",
    GroupName: "Naziv Grupe",
    GroupPermissions: "Dozvole za Pristup Grupe",
    Groups: "Grupe",
    GZip: "GZip",
    help: "Ovdje je prikazan grafikon izvršavanja ove radne jedinice. Veličina i nijansa ukazuju na vrijeme izvršavanja svakog grafikona (Veći i tamniji grafikon uzima veći procenat cjelokupnog vremena izvrštavanja.)",
    Helper: "Pomoćnik",
    Helpers: "Pomagači",
    Hex: "Baza16",
    HideSpills: "Sakrijte Upotrebu Diska",
    High: "Visok",
    History: "Istorija",
    HPCCSystems: "HPCC Systems®",
    Icon: "Ikona",
    ID: "Identifikator",
    Inactive: "Neaktivan",
    IncludeSlaveLogs: "Uključite Izvještaje Sa Nodova Izvršilaca",
    Index: "Indeks",
    Info: "Informacija",
    InfoDialog: "Dijalog Informacije",
    InheritedPermissions: "Naslijeđene Dozvole",
    Inputs: "Unosi",
    InvalidResponse: "(Neispravan Odgovor)",
    InvalidUsernamePassword: "Neispravno korisničko ime ili lozinka, pokušajte ponovo.",
    IP: "IP",
    IPAddress: "IP Adresa",
    IsCompressed: "Je li Sabijen",
    IsLibrary: "Jeli Biblioteka",
    IsReplicated: "Repliciran",
    IssueReporting: "Izvještavanje o Problemima",
    JobName: "Naziv Radne Jedinice",
    Jobname: "Nazivradnejedinice",
    jsmi: "jsmi*",
    JSmith: "JSmit*",
    JSON: "JSON",
    KeyFile: "Indeksirana Datoteka",
    Label: "Etiketa",
    LandingZone: "Zona za Pretovar",
    LandingZones: "Zone za Pretovar",
    LanguageFiles: "Datoteke O Jeziku",
    Largest: "Najveći",
    LargestFile: "Najveća Datoteka",
    LargestSize: "Najveća veličina",
	LastEdit: "Poslednja Izmjena",
	LastEditedBy: "Autor Poslednje Izmjene",
	LastEditTime: "Vrijeme Poslednje Izmjene",
    LastMessage: "Zadnja Poruka",
    LastName: "Prezime",
    LastNDays: "Poslijednjih N Dana",
    LastNHours: "Posljednjih N Sati",
    LastNRows: "Posljednjih N Redova",
    LastRun: "Zadnji Ran",
    LDAPWarning: "<b>Greška LDAP Servica:</b>  &lsquo;Previše korisnika&rsquo; - Molimo koristite filter.",
    LearnMore: "Naučite više",
    LegacyForm: "Stari Prevaziđeni Formular",
	Legend: "Legenda",
    LibrariesUsed: "Biblioteke u Korištenju",
    LibraryName: "Ime Biblioteke",
    Line: "Linija",
    LineTerminators: "Krajevi Linija",
    Links: "Linkovi",
    Loading: "Učitavanje...",
    LoadingCachedLayout: "Učitavanje Keširane Strukture (Cached Layout)...",
    LoadingData: "Učitavanje Podataka...",
    loadingMessage: "...Učitavanje...",
    LoadPackageContentHere: "(Dobavite ovamo sadržaj paketa)",
    LoadPackageFromFile: "Dobavite Paket iz Datoteke",
    Local: "Lokalni",
    LocalFileSystemsOnly: "Samo Lokalni Fajl Sistemi",
    Location: "Lokacija",
	Lock: "Zaključaj",
    Log: "Dnevnik (Log)",
    log_analysis_1: "log_analysis_1*",
    LogFile: "Datoteka Aktivnosti",
    LoggedInAs: "Prijavljen kao",
	LoggingOut: "Odjavljivanje",
    LogicalFile: "Logička Datoteka",
    LogicalFiles: "Logičke Datoteke",
    LogicalFilesAndSuperfiles: "Logičke Datoteke i Superdatoteke",
    LogicalFilesOnly: "Samo Logičke Datoteke",
    LogicalFileType: "Tip Logičke Datoteke",
    LogicalName: "Ime Logičke Datoteke",
    Login: "Prijavljivanje",
    Logout: "Odjavite se",
    Logs: "Dnevnici",
    LogVisualization: "Registrujte Vizuelizaciju",
    LogVisualizationUnconfigured: "Vizuelizacija loga nije konfigurisana, proverite kako je menadžer za konfiguraciju podešen",
    LostFile: "Izgubljeni Fajl",
    LostFile2: "Izgubljeni Fajlovi",
    LostFileMessage: "Logički fajl kome nedostaje bar jedan dio ili na primarnoj ili na repliciranoj lokaciji na disku.  Logički file je još uvijek pod kontrolom Dali servera. Brisanje fajla prekida kontrolu Dali servera nad fajlom kao i nad svim preostalim dijelovima fajla na disku.",
    Low: "Nizak",
    MachineInformation: "Informacija o Mašini",
    Machines: "Mašine",
    Major: "Glavni",
    ManagedBy: "Upravljan",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Pritisnite Ctrl+C",
    ManualOverviewSelection: "Nophodno Je Odabrati Pregled",
    ManualTreeSelection: "Nophodno Je Odabrati Drvo",
    Mappings: "Mapiranja",
    Mask: "Maska",
    Max: "Maksimum",
    MaximumNumberOfSlaves: "Maksimalan Broj Izvršilaca",
    MaxNode: "Maksimalni Nod/čvor",
    MaxRecordLength: "Maksimalna Dužina Rekorda",
    MaxSize: "Maksimalna Veličina",
	MaxSkew: "Maksimalni Skju (Distorzija)",
    MemberOf: "Član Od",
    Members: "Članovi",
    Message: "Poruke",
    MethodConfiguration: "Konfiguracija metoda",
    Methods: "Metodi",
    Min: "Minimum",
	Mine: "Moj",
    MinNode: "Minimalni Nod/čvor",
    Minor: "Minoran",
    MinSize: "Minimalna Veličina",
	MinSkew: "Minimalni Skju (Distorzija)",
    Missing: "Nedostaje",
    MixedNodeStates: "Svi Nodovi Nemaju Isti Status ",
    Modification: "Promijena",
    Modified: "Modifikovan",
    ModifiedUTCGMT: "Promijenjen (UTC/GMT)",
    Modify: "Promijeni",
    MonitorEventName: "Nadgledajte Ime Događaja",
    Monitoring: "Nadgledanje",
    MonitorShotLimit: "Nadgledajte Shot Limit",
    MonitorSub: "Nadgledajte Sub",
    Month: "Mjesec",
    More: "Nastavite",
    MustContainUppercaseAndSymbol: "Mora uključiti veliko slovo i simbol",
    NA: "N/A",
    Name: "Ime",
    NamePrefix: "Prefiks Imena",
    NamePrefixPlaceholder: "some::prefix",
    Newest: "Najnoviji",
    NewPassword: "Nova Lozinka",
    NoContent: "(Bez sadržaja)",
    noDataMessage: "...Nema Redova...",
    Node: "Čvor (Node)",
    NodeGroup: "Grupa Čvorova",
    NoErrorFound: "Bez nađenih grešaka\n",
    NoFilterCriteriaSpecified: "Kriterij za filtriranje nije specificiran.",
    None: "Nijedan",
    NoPublishedSize: "Veličina Nije Objavljena",
    Normal: "Normalan",
    NoScheduledEvents: "Nema Definisanih Događaja na Rasporedu.",
    NoSplit: "Nema Podijela (Split)",
    NotActive: "Nije Aktivan",
    NothingSelected: "Ništa Nije Izabrano...",
    NotInSuperfiles: "Nije Dio Superdatoteke",
    NotSuspendedbyUser: "Nije Suspendovan Od Strane Korisnika",
    NoWarningFound: "Poruke Upozorenja (warnings) nisu nađene\n",
    NumberofParts: "Broj Dijelova",
    NumberofSlaves: "Broj Izvršilaca",
    OK: "OK",
    Oldest: "Najstariji",
    OldPassword: "Stara Lozinka",
    OmitSeparator: "Izostavite Separator",
    Only1PackageFileAllowed: "Dozvoljen je samo jedan paket",
    Open: "Otvoren",
    OpenInNewPage: "Otvorite na Novoj Stranici",
    OpenInNewPageNoFrame: "Otvorite na Novoj Stranici",
    OpenLegacyECLWatch: "Otvorite Stari Prevaziđeni ECL Watch",
    OpenLegacyMode: "Otvorite Zastarjeli Mod",
    OpenNativeMode: "Otvorite Normalni Mod",
    OpenSafeMode: "Otvorite (sigurni mod)",
    OpenSource: "Otvoreni Kod",
    OpenTreeMode: "Otvorite (kao drvo)",
    Operation: "Operacija",
    Operations: "Operacije",
    Options: "Opcije",
    OriginalFile: "Originalna datoteka",
    OrphanFile: "Nepotrebne Datoteke",
    OrphanFile2: "Nepotrebna Datoteka",
    OrphanMessage: "Nepotrebni fajl ima neke dijelove na disku. Ali svi dijelovi fajla ne postoje da bi se moglo kompletirati logički fajl. Ne postoji referenca ne nepostijeće dijelove fajla sa Dali servera.",
    Outputs: "Izlazi",
    Overview: "Pregled",
    Overwrite: "Prepišite",
    OverwriteMessage: "Neke Datoteke već postoje. Da biste nastavili morate dozviliti pisanje preko postojećih datoteka ",
    Owner: "Vlasnik",
    PackageContent: "Sadržaj Paketa",
    PackageContentNotSet: "Sadržaj Paketa nije definisan",
    PackageMap: "Mapa Paketa",
    PackageMaps: "Mape Paketa",
    PackagesNoQuery: "Paketi za koje nisu definisani upiti (queries)",
    ParameterXML: "Parametar XML",
    Part: "Dio",
    PartMask: "Djelimična Maska",
    PartName: "Ime Dijela",
    Parts: "Dijelovi",
    PartsFound: "Dijelovi Su Pronađeni",
    PartsLost: "Dijelovi Su Izgubljeni",
    Password: "Lozinka",
    PasswordExpiration: "Lozinka Istiće",
    PasswordExpired: "Vaša lozinka je istekla I mora biti promijenjena",
    PasswordExpirePostfix: "dan(a). Želite li je sada promijeniti?",
    PasswordExpirePrefix: "Vaša lozinka će isteći za",
    PasswordOpenZAP: "Unesite Lozinku Za ZAP (opcionalno)",
    PasswordsDoNotMatch: "Pogrešna Lozinka.",
    Path: "Put",
    PathMask: "Maska za Put",
    Pause: "Pauza",
    PauseNow: "Zaustavite Odmah",
    PctComplete: "% Kompletiran",
    PercentCompressed: "Procenat Kompresije",
    PercentDone: "Procenat Završen",
    PerformingLayout: "Izvršava Layout...",
    Permission: "Dozvola",
    PermissionName: "Naziv Dozvole Za Pristup",
    Permissions: "Dozvole za Pristup",
    PhysicalFiles: "Fizičke Datoteke",
    PlaceholderFindText: "Wuid, Korisnik, Dalje...",
    PlaceholderFirstName: "Jovan",
    PlaceholderLastName: "Smit",
    Playground: "Igralište",
    PleaseEnableCookies: "ECL Watch zahtijeva da kolačići budu omogućeni za nastavak.",
    PleaseEnterANumber: "Unestite Broj 1 -",
	PleaseLogin: "Molimo prijavite se koristeći svoje korisničko ime i lozinku",
    PleaseLogIntoECLWatch: "Molimo prijavite se u ECL Watch",
    PleasePickADefinition: "Izaberite Definiciju",
    PleaseSelectADynamicESDLService: "Izaberite Dinamički ESDL Servis",
    PleaseSelectAGroupToAddUser: "Izaberite grupu u koju želite da dodate ovog korisnika",
	PleaseSelectAServiceToBind: "Izaberite Servis za Upotrebu",
    PleaseSelectATopologyItem: "Izaberite ciljnu platformu, servis ili mašinu.",
    PleaseSelectAUserOrGroup: "Izaberite Korisnika ili Grupu zajedno sa Imenom Datoteke",
    PleaseSelectAUserToAdd: "Izaberite korisnika kojeg  želite da dodate",
    Plugins: "Dopune",
    Port: "Port",
    Prefix: "Prefiks",
    PrefixPlaceholder: "filename{:length}, filesize{:[B|L][1-8]}",
    Preflight: "Provjera prije isporuke",
    PreloadAllPackages: "Učitajte sve pakete",
    PreserveCompression: "Sačuvajte Kompresiju",
    Preview: "Pregled",
    PrimaryLost: "Primarni Je Izgubljen",
    PrimaryMonitoring: "Primarni Nadzor",
    Priority: "Prioritet",
    Process: "Proces",
    Processes: "Procesi",
    ProcessFilter: "Process&nbsp;Filter",
    ProcessorInformation: "Informacija o Procesoru",
    ProgressMessage: "Poruka o Progresu",
    Properties: "Svojstva",
    Property: "Svojstvo",
    Protect: "Zaštitite",
    Protected: "Zašticen",
    Publish: "Objavite",
    Published: "Objavljen",
    PublishedBy: "Objavljivač",
	PublishedByMe: "Moji Objavljeni Servisi",
    PublishedQueries: "Objavljeni Upiti",
    PushEvent: "Puš Događaj",
    Quarter: "Četvrtina",
    Queries: "Upiti",
    QueriesNoPackage: "Upiti bez odgovarajućeg paketa",
    Query: "Upit",
    QueryDetailsfor: "Detalji o Upitu",
    QueryID: "Identifikator Upita",
    QueryIDPlaceholder: "som?q*ry.1",
    QueryName: "Ime Upita",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Kolekcija Upita",
    Queue: "Red (Queue)",
    Quote: "Citat",
    QuotedTerminator: "Završni Karakter",
    RawTextPage: "Neobrađen Tekst (Tekuća Stranica)",
    Ready: "Spreman",
    ReallyWantToRemove: "Zaista želite ukloniti?",
	ReAuthenticate: "Ponovo se prijavite koristeći svoje korisničko ime i lozinku",
    RecordCount: "Broj Rekorda",
    RecordLength: "Dužina Rekorda",
    Records: "Rekordi",
    RecordSize: "Veličina Rekorda",
    RecordStructurePresent: "Struktura Rekorda Postoji",
    Recover: "Vratite Natrag",
    RecoverTooltip: "Pokrenite zaustavljenu radnu jedinicu",
	RecreateQuery: "Ponovo kreirajte upit",
    Recycling: "Recikliranje",
    RedBook: "Crvena Knjiga",
    Refresh: "Osviježite",
    ReleaseNotes: "Napomena o Izdanju",
    Reload: "Ponovo Učitajte",
    Remaining: "Preostali",
    RemoteCopy: "Kopija sa udaljenog servera",
    RemoteDali: "Daleki Dali",
    RemoteDaliIP: "Daleki&nbsp;Dali&nbsp;IP&nbsp;Adresa",
    Remove: "Uklonite",
    RemoveAttributeQ: "Izabrani atribut će biti uklonjen. Da li ste sigurni da to želite?",
    RemoveAtttributes: "Uklonite Atribut(e)",
    RemovePart: "Uklonite Dio",
    RemoveSubfiles: "Uklonite Pod-Datoteku",
    RemoveSubfiles2: "Da li želite ukloniti subfajl(ove)?",
    RemoveUser: "Uklonite Korisnika",
    Rename: "Preimenujte",
    RenderedSVG: "Donesene SVG",
    RenderSVG: "Donesite SVG",
    Replicate: "Replicirajte",
    ReplicatedLost: "Izgubljene Replikacije",
    ReplicateOffset: "Replicirajte Ofset",
	ReportAnError: "Prijavite grešku",
	ReportError: "Prijavite grešku",
    RepresentsASubset: "Predstavlja podskup od ukupnog broja uparenih rezultata .Promjena filtera može smanjiti broj uparenih rezultata",
    RequestSchema: "Shema Zahtjeva",
    RequiredForXML: "Potrebno za distribuciju XML",
    Reschedule: "Ponovo Stavite Na Raspored",
    Reset: "Resetujte",
    ResetThisQuery: "Resetujte Tekući Upit",
    ResetViewToSelection: "Resetujte Odabrani Prikaz",
    Resource: "Resurs",
    Resources: "Resursi",
    ResponseSchema: "Shema Odgovora",
    Restart: "Ponovo Pokrenite",
    Restarted: "Ponovo Pokternut",
    Restore: "Vratite na Staro Stanje",
    Resubmit: "Ponovo Podnesite",
    Resubmitted: "Ponovo Poslat",
    ResubmitTooltip: "Reaktivirajte ovu radnu jedinicu",
    Results: "Rezultat(i)",
    Resume: "Nastavite",
    RetainSuperfileStructure: "Zadržite Strukturu Superdatoteke",
    RetypePassword: "Ponovite Lozinku",
    Reverse: "Idite Unazad",
    RowPath: "Put Do Rekorda",
    Rows: "Redovi",
    RowTag: "Etiketa Reda",
    RoxieCluster: "Roxie Klaster",
    RoxieFileCopy: "Status Kopiranja Roxie Datoteka",
    RunningServerStrain: "Izvršavanje ovog procesa može potrajati dugo vremena i veoma optereti servere. Da li želite nastaviti?",
    Sample: "Primjer",
    SampleRequest: "Primjer Zahtjeva",
    SampleResponse: "Primjer Odgovora",
    Save: "Sačuvajte",
    Scope: "Područje",
    SearchResults: "Rezultati Pretraživanja",
    SecondsRemaining: "Preostalo Sekundi",
    Security: "Sigurnost",
    SelectPackageFile: "Izaberi Paket",
    Separators: "Seperatori",
    Server: "Server",
	ServiceName: "Ime Servisa",
    Services: "Servisi",
    SetBanner: "Postavite Zastavicu",
    SetTextError: "Neuspješno prikazivanje teksta (da li je tekst predug?). Koristite &lsquo;pomagače&rsquo; za preuzimanje datoteka.",
    SetToFailed: "Postavite Na Neuspješan",
    Severity: "Ozbiljnost",
    Show: "Pokažite",
    ShowProcessesUsingFilter: "Prikažite procese koristeći filter",
    ShowSVG: "Pokažite SVG",
    Size: "Veličina",
    Skew: "Skju (Skew)",
    SkewNegative: "Skju(-)",
    SkewPositive: "Skju(+)",
    SLA: "SLA",
    SlaveLogs: "Izvjestaji Izvršilaca",
    SlaveNumber: "Broj Izvršilaca",
    Slaves: "Robovi (Slaves)",
    Smallest: "Najmanji",
    SmallestFile: "Najmanja Datoteka",
    SmallestSize: "Najmanja Veličina",
    SOAP: "SOAP",
    SomeDescription: "Neki*Opis",
    somefile: "*::nekifile*",
    Source: "Izvorna Verzija",
    SourceCode: "Izvorna Verzija Koda",
    SourceLogicalFile: "Ime Izvorne Datoteke",
    SourcePath: "Izvorna Verzija Puta (sa omogucenim *)",
    SourceProcess: "Izvorni Proces",
    Spill: "Zapis na Disk",
    SplitPrefix: "Split Prefiks",
    Spray: "Razbacajte (Spray)",
    Start: "Počnite",
    Started: "Počeo",
    Starting: "Polazak",
    State: "Stanje",
    Stats: "Statistike",
    Status: "Status",
    Stopped: "Zaustavljen",
    Stopping: "Zaustavljanje",
    StorageInformation: "Informacija o prostoru",
    Subgraph: "Pod-Graf",
    Subgraphs: "Podgrafikon",
    Submit: "Podnesite",
    Subtype: "Pod-Vrsta",
    SuccessfullySaved: "Uspješno Sačuvan",
    Summary: "Kratak Pregled",
    SummaryMessage: "Sažeta Poruka",
    Superfile: "Super Datoteka",
    SuperFile: "Super Datoteka",
    SuperFiles: "Super Datoteke",
    Superfiles: "SuperDatoteke",
    SuperFilesBelongsTo: "Pripadnik Superdatoteke",
    SuperfilesOnly: "Samo Superdatoteke",
    SuperOwner: "Super Vlasnik",
    Suspend: "Suspendujte",
    Suspended: "Suspendovan",
    SuspendedBy: "Suspendovan Od",
    SuspendedByCluster: "Suspendovan od strane klastera",
    SuspendedByUser: "Suspendovan Od Strane Korisnika",
    SuspendedReason: "Razlog za Suspendovanje",
    SVGSource: "SVG Izvor",
    SyncSelection: "Sinhronizujte Sa Odabranim",
    SystemServers: "Sistem Servera",
	Table: "Tabela",
    tag: "tag",
    Target: "Cilj",
    TargetClusters: "Ciljni Klasteri",
    TargetName: "Naziv Cilja",
    TargetNamePlaceholder: "neko::logicko::ime",
    TargetRowTagRequired: "Morate označiti ciljni red u tabeli",
    Targets: "Ciljne Platforme",
    TargetScope: "Ciljni Opseg",
    TargetWuid: "Cilj/Wuid",
    Terminators: "Terminatori",
    TestPages: "Test Stranice",
    Text: "Tekst",
    TheReturnedResults: "Vraćeni Rezultati",
    ThorMasterAddress: "Adresa Glavnog Thora",
    ThorNetworkAddress: "Netvork Adresa Thora",
    ThorProcess: "Tor Proces",
    Time: "Vrijeme",
    Timers: "Mjerači Vremena",
    TimeSeconds: "Vrijeme (Sekunde)",
    TimeStamp: "Vremenska Oznaka",
    TimeStarted: "Vrijeme Početka",
    TimeStopped: "Vrijeme Kraja",
    Timings: "Vremena",
    TimingsMap: "Mapa Vremena",
    title_ActiveGroupPermissions: "Dozvole Aktivne Grupe",
    title_ActivePermissions: "Aktivne Dozvole",
    title_Activity: "Aktivnosti",
    title_AvailableGroupPermissions: "Dostupne Dozvole Grupe",
    title_AvailablePermissions: "Dostupne Dozvole",
	title_BindingConfiguration: "Konfiguracija za Povezivanje",
	title_BindingDefinition: "Definicija Povezivanja",
    title_ClusterInfo: "Grupe",
    title_CodeGeneratorPermissions: "Dozvole Kod Generatora",
    title_DefinitionExplorer: "Istraživač Definicija",
    title_Definitions: "Definicije",
    title_DESDL: "Dinamičani ESDL",
    title_DFUQuery: "Logičke Datoteke",
    title_DFUWUDetails: "DFU Radna Jedinica",
    title_DirectoriesFor: "Direktoriji za",
    title_DiskUsage: "Iskorištenost Diska",
    title_ECLPlayground: "ECL Igralište",
    title_ErrorsWarnings: "Pogreške/Upozorenja za",
    title_EventScheduleWorkunit: "Respoređivač Događaja",
    title_FileScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Datoteke",
    title_FilesPendingCopy: "Datoteke na čekanju za kopiranje",
    title_FoundFilesFor: "Pronađen fajl za",
    title_GetDFUWorkunits: "DFU Radne Jedinice",
    title_Graph: "Grafikon",
    title_GraphPage: "naslov",
    title_Graphs: "Grafikoni",
    title_GridDetails: "Promijeni Me",
    title_History: "Istorija",
    title_HPCCPlatformECL: "ECL Watch Platform - Glavna Stranica",
    title_HPCCPlatformFiles: "ECL Watch - Datoteke",
    title_HPCCPlatformMain: "ECL Watch - Glavna Stranica",
    title_HPCCPlatformOps: "ECL Watch - Upravljnje",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Monitor - Dopune",
    title_Inputs: "Unosi",
    title_LFDetails: "Detalji o Logičkol Datoteci",
    title_LibrariesUsed: "Biblioteke U Korištenju",
    title_Log: "Log Fajl",
    title_LostFilesFor: "Izgubljeni fajlovi za",
    title_LZBrowse: "Zona za Pretovar",
    title_MemberOf: "Član Od",
    title_Members: "Članovi",
    title_Methods: "Metode",
    title_OrphanFilesFor: "Nepotrebni fajlovi za",
    title_PackageParts: "Dijelovi paketa",
    title_Permissions: "Dozvole",
    title_PreflightResults: "Rezultati Provjere",
    title_QuerySetDetails: "Detalji Upita",
    title_QuerySetErrors: "Greške",
    title_QuerySetLogicalFiles: "Logičke Datoteke",
    title_QuerySetQuery: "Upiti (Queries)",
    title_QuerySetSuperFiles: "Super Datoteke",
    title_QueryTest: "Super Datoteke",
    title_Result: "Acktivnost",
    title_Results: "Rezultati",
    title_SearchResults: "Rezultati Pretraživanja",
    title_SourceFiles: "Originalni Fajlovi",
    title_Topology: "Topologija",
    title_TpThorStatus: "Stanje Thora",
    title_UserPermissions: "Korisničke Dozvile za Pristup",
    title_UserQuery: "Prava Pristupa",
    title_WorkunitScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Radne Jedinice",
    title_WUDetails: "ECL Detalji o Radnoj Jedinici",
    title_WUQuery: "ECL Radne Jedinice",
    To: "Prema",
    ToDate: "Do Sada",
    Toenablegraphviews: "Da biste mogli vidjeli grafikone, moraćete instalisati Graph View Control plugin",
    Tooltip: "Savjet",
    TooManyFiles: "Previše Datoteka",
    Top: "Vrh",
    Topology: "Topologija",
    ToSizes: "Do Velićina",
    TotalClusterTime: "Ukupno Vrijeme Klastera",
    TotalParts: "Ukupan Broj Dijelova",
    TotalSize: "Totalna Veličina",
    TotalThorTime: "Ukupno Vrijeme Thor-a",
    TransitionGuide: "Vodič",
    Tree: "Drvo",
    Type: "Tip",
	Unbound: "Odvojen",
    undefined: "nedefinisan",
    Unknown: "Nepoznat",
	Unlock: "Otključajte",
    Unprotect: "Ukinite Zaštitu",
    UnsupportedIE9FF: "Nisu Podržani (IE <= 9, FireFox)",
    Unsuspend: "Ukinite Suspenziju",
    Unsuspended: "Suspenzija Ukinuta",
    Up: "Na Gore",
    UpdateCloneFrom: "Ažurirajte Klon Koristeći",
	UpdateDFs: "Ažurirajte DFS",
    UpdateSuperFiles: "Ažurirajte Super Datoteke",
    Upload: "Učitajte",
    URL: "URL",
    Usage: "Upotreba",
    Used: "Korišten",
    User: "Korisnik",
    UserDetails: "Detalji o Korisniku",
    UserID: "Korisnicki ID",
	UserLogin: "Prijavite se samo koristeći svoje korisničko ime",
    UserName: "Ime Korisnika",
    Username: "Imekorisnika",
    UserPermissions: "Dozvole za Korisnikov Pristup",
    Users: "Korisnici",
    UseSingleConnection: "Koristite Samo Jedan Priključak (Connection)",
    Validate: "Potvrdite",
    ValidateActivePackageMap: "Validirajte Mapu Aktivnog Paketa",
    ValidatePackageContent: "Validirajte Saržaj Paketa",
    ValidatePackageMap: "Potvrdite Mapu Paketa",
    ValidateResult: "=====Potvrdite Result=====\n\n",
    ValidateResultHere: "(Rezultati Validiranja)",
    Value: "Vrijednost",
    Variable: "Varijabla",
    VariableBigendian: "Varijabla Big-endian",
    Variables: "Varijable",
    VariableSourceType: "Tip Izvora",
    Version: "Verzija",
    ViewByScope: "Pogled prema Skopu",
    Views: "Pogledi",
    Visualize: "Visualizujte",
    WarnIfAvailableDiskSpaceIsUnder: "Upozori ako raspoloživi disk prostor spadne ispod",
    WarnIfAvailableMemoryIsUnder: "Upozori ako raspoloživa memorija spadne ispod",
    WarnIfCPUUsageIsOver: "Upozori ako je iskorištenost procesora preko",
    Warning: "Upozorenje",
    Warnings: "Upozorenje(a)",
    WarnOldGraphControl: "Upozorenje:  Stara Grafička Kontrola",
    What: "Šta",
    Where: "Gdje",
    Who: "Ko",
    Width: "Širina",
    Workflows: "Tokovi poslova",
    Workunit: "Radna Jedinica",
    Workunits: "Radne Jedinice",
    WorkUnitScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Radne Jedinice",
    Wrap: "Zamotajte",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid Ne Može Biti Prazan.",
    WUSnapShot: "Trenutna Slika Radne Jedinice",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "XRef",
    Year: "Godina",
    YouAreAboutToBeLoggedOut: "Vi ćete biti odjavljeni",
    YouAreAboutToDeleteBinding: "Odabrano vezivanje/binding će biti izbrisano. Jeste li sigurni da želite to učiniti?",
	YouAreAboutToDeleteDefinition: "Vi ste u procesu brisanja ove definicije. Da li ste sigurni da to želite učiniti?",
    YouAreAboutToDeleteThisFile: "Da li ćete obrisati ovu datoteku",
    YouAreAboutToDeleteThisPart: "Da li ćete obrisati ovaj dio",
    YouAreAboutToDeleteThisQueryset: "Da li ćete obrisati ovaj set upita",
    YouAreAboutToDeleteThisWorkunit: "Da li ćete obrisati ovu radnu jedinicu",
	YouAreAboutToRemoveUserFrom: "Vi ste u procesu uklanjanja korisnika iz ove grupe. Da li želite da nastavite?",
    YourBrowserMayNotSupport: "Vaš pretraživač možda ne podržava datoteku (e) ove veličine",
    YourScreenWasLocked: "ESP je zaključao vaš ekran. Podatci su zastarjeli.",
    ZAP: "Z.A.P",
    ZeroLogicalFilesCheckFilter: "Nema ni jedane Logičke Datoteke(provjerite filter)",
    Zip: "Zapakujte (Zip)",
    ZippedAnalysisPackage: "Zapakovani Paket sa Analizama",
    Zoom: "Zum",
    Zoom100Pct: "Zumirajte 100%",
    ZoomAll: "Zumirajte Sve",
    ZoomMinus: "Zum-",
    ZoomPlus: "Zum +",
    ZoomWidth: "Zumirajte Širinu"
});


/***/ }),

/***/ "./eclwatch/nls/es/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/es/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
    Abort: "Aborte",
    AbortedBy: "Abortado por",
    AbortedTime: "Abortado a las",
    About: "Acerca",
    AboutGraphControl: "Acerca del controlador gráfico",
    AboutHPCCSystems: "Acerca de HPCC Systems®",
    AboutHPCCSystemsGraphControl: "Acerca del controlador gráfico de HPCC Systems®",
    AboutToLoseSessionInformation: "Está a punto de cerrar la sesión y perder toda la información de la sesión. ¿Desea continuar?",
    Account: "Cuenta",
    Action: "Acción",
    Activate: "Activar",
    Activated: "Activado",
    ActivateQuery: "Activar Consulta",
    ActivateQueryDeletePrevious: "Activar Consulta, ¿Borrar anterior?",
    ActivateQuerySuspendPrevious: "Activar Consulta, suspender  anterior?",
    Active: "Activo",
    ActivePackageMap: "&lsquo;Package Map&rsquo; Activo",
    ActiveWorkunit: "Unidad activa",
    Activities: "Actividades",
    Activity: "Actividad",
    ActivityMap: "Mapa de Actividades",
    ActualSize: "Tamaño real",
    Add: "Agregar",
    AddAttributes: "Agregar atributos/valores a su método",
    AddAttributes2: "Agregar atributos",
    AddBinding: "Agregar conexión",
    AddFile: "Añadir Archivo",
    AddGroup: "Agregar Grupo",
    AdditionalResources: "Recursos  Adicionales",
    AddPart: "Agregar Parte",
    AddProcessMap: "Agregar &lsquo;Package Map&rsquo;",
    AddTheseFilesToDali: "¿Agregar estos archivos a Dali?",
    AddtionalProcessesToFilter: "Procesos adicionales a filtrar",
    AddToExistingSuperfile: "Agregar a un superarchivo existente",
    AddToSuperfile: "Agregar al Super-archivo",
    AddUser: "Aggregar Usuario",
    Advanced: "Advanzado",
    All: "Todos",
    AllowAccess: "<center>Permitir<br>Acceso</center>",
    AllowForeignFiles: "Permitir Archivo sExtranjeros",
    AllowFull: "<center>Permitir<br>Completo</center>",
    AllowRead: "<center>Permitir<br>Leer</center>",
    AllowWrite: "<center>Permitir<br>Escribir</center>",
    AllQueuedItemsCleared: "Todos los items encolados han sido eliminados. El trabajo en ejecución continuará corriendo",
    ANY: "CUALQUIER",
    AnyAdditionalProcessesToFilter: "Procesos adicionales a filtrar",
    Append: "Agregar",
    AppendCluster: "Agregar Sistema",
    Apply: "Aplicar",
    ArchivedOnly: "Solo archivado",
    ArchivedWarning: "Advertencia: Por favor especifique rango de fechas corto. O si no, la recuperacion de workunits puede ser demorada.",
    Attach: "Adjuntar",
    Attribute: "Atributo",
    AttributesAreRequired: "Atributos son necesarios",
    AutoRefresh: "Actualizar Automaticamente",
    AutoRefreshEvery: "Auto-refrescar cada x minutos",
    AutoRefreshIncrement: "Incrementar auto-refresco",
    Back: "Atras",
    BannerColor: "Color de Banner",
    BannerMessage: "Mensaje del Banner",
    BannerScroll: "Desplazamiento del Banner",
    BannerSize: "Tamaño del Banner",
    BinaryInstalls: "Binarios instalables",
    Bind: "Conectar",
    Binding: "Conexión",
    BindingDeleted: "Conexión eliminada",
    Blob: "BLOB",
    BlobPrefix: "Prefijo de BLOB",
    Bottom: "Abajo",
    BoundBy: "Obligado por",
    Busy: "Ocupado",
    Cancel: "Cancelar",
    CancelAll: "Cancelar todo",
    CancelAllMessage: "Abortar trabajos en ejecución y limpiar la cola. Desearía continuar?",
    Chart: "Gráfico",
    CheckAllNodes: "Escoger todos los Nodos",
    CheckFilePermissions: "Escoger permisos de Archivo",
    CheckSingleNode: "Escoja un Archivo",
    Clear: "Despejar",
    ClearPermissionsCache: "Despejar Los Permisos Del Cache",
    ClearPermissionsCacheConfirm: "Esta seguro que desea despejar los permisos del Cache de DALI y ESP? Workunits en executo pueden demorarse asta que los Caches se actualicen",
    Clone: "Clonar",
    ClonedWUID: "WUID Clonado",
    CloneTooltip: "Duplicar Workunit",
    Close: "Cerrar",
    Cluster: "Sistema",
    ClusterName: "Nombre del sistema",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Procesos de sistema",
    Code: "Código",
    CodeGenerator: "Generador de Código",
    Col: "Columna",
    CollapseAll: "Colapsar Todo",
    Command: "Comando",
    Comment: "Comentario",
    Compiled: "Compilado",
    Compiling: "Compilando",
    Completed: "Completado",
    ComplexityWarning: "Mas de {threshold} actividades ({activityCount}) - ¿suprimir primer visualización?",
    Component: "Componente",
    Compress: "Comprimir",
    Compressed: "Comprimido",
    CompressedFileSize: "Tamaño de Archivo Comprimido",
    Condition: "Condición",
    Configuration: "Configuracion",
    ConfigureService: "Configurar servicio",
    ConfirmPassword: "Confirme la Contraseña",
    ConfirmRemoval: "¿Seguro que quieres hacer esto?",
    ContactAdmin: "Si quiere renombrar este grupo, por favor contacte su administrador de LDAP",
    Content: "Contenido",
    Contents: "Contenidos",
    ContentType: "Tipo de Contenido",
    ContinueWorking: "Sigue trabajando",
    Copy: "Copia",
    CopyToClipboard: "Copiar al portapapeles",
    Count: "Número",
    CreateANewFile: "Crear un nuevo superarchivo",
    Created: "Creado",
    CreatedBy: "Creado por",
    CreatedTime: "Tiempo creado",
    Creating: "Creando",
    Critical: "Crítico",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "IP de Dali",
    dataset: ":=dataset*",
    Date: "Fecha",
    Day: "Dia",
    Deactivate: "Deactivar",
    Debug: "Depurar",
    DEF: "DEF",
    Defaults: "Valores por defecto",
    Definition: "Definición",
    DefinitionDeleted: "Definición eliminada",
    DefinitionID: "ID de definición",
    Definitions: "Definiciones",
    DelayedReplication: "Replicación retrasada",
    Delete: "Eliminar",
    DeleteBinding: "Eliminar conexión",
    Deleted: "Borrado",
    DeletedBinding: "Conexión eliminada",
    DeleteDirectories: "Eliminar directorios vaciós. Quiere continuar?",
    DeleteEmptyDirectories: "Eliminar directorios vaciós?",
    DeletePrevious: "Eliminar previo",
    DeleteSelectedDefinitions: "¿Eliminar definiciónes seleccionadas?",
    DeleteSelectedFiles: "¿Borrar archivos seleccionados?",
    DeleteSelectedGroups: "Eliminar  grupo(s) escojido(s)?",
    DeleteSelectedPermissions: "Borrar permiso(s) escojido(s)?",
    DeleteSelectedQueries: "¿Borrar queries seleccionados?",
    DeleteSelectedUsers: "Eliminar Usuario(s) escojido(s)?",
    DeleteSelectedWorkunits: "¿Borrar unidades de trabajo seleccionadas?",
    DeleteSuperfile: "¿Borrar super-archivo?",
    DeleteSuperfile2: "¿Borrar Super-Archivo?",
    DeleteThisPackage: "Eliminar este paquete?",
    Delimited: "Delimitado",
    DenyAccess: "<center>Negar<br>Access</center>",
    DenyFull: "<center>Negar<br>Completo</center>",
    DenyRead: "<center>Negar<br>Leer</center>",
    DenyWrite: "<center>Negar<br>Escribir</center>",
    Depth: "Profundidad",
    DepthTooltip: "Máxima Profundidad de Subgrafo",
    Deschedule: "Eliminar del plan de ejecución",
    DescheduleSelectedWorkunits: "Desprogramar Workunit(s) escojida(s)?",
    Description: "Descripción",
    DESDL: "ESDL dinámico",
    Despray: "Despray",
    Details: "Detalles",
    DFUServerName: "Nombre del servidor de DFU",
    DFUWorkunit: "Unidad de Trabajo de DFU",
    Directories: "Directorios",
    Directory: "Directorio",
    DisableScopeScanConfirm: "Esta seguro que desea inhabilitar Scope Scans? Cuando DALI se reinicie, las opciones cambiadas se revierten a las opciones de la configuración.",
    DisableScopeScans: "Inhabilitar Scope Scans",
    DiskUsage: "Utilización del disco",
    Distance: "Distancia",
    DistanceTooltip: "Maxima Actividad Distancia de Vecindario",
    Dll: "Dll",
    Documentation: "Documentación",
    DoNotActivateQuery: "¿No activar consulta?",
    DoNotRepublish: "¿No volver a publicar?",
    DOT: "DOT",
    DOTAttributes: "Atributos DOT",
    Down: "Abajo",
    Download: "Descargar",
    Downloads: "Descargas",
    DownloadToCSV: "Bajar en formato CSV",
    DropZone: "Zona de carga",
    DueToInctivity: "Se desconectará de todas las sesiones de ECL Watch en 3 minutos debido a inactividad.",
    Duration: "Duración",
    DynamicNoServicesFound: "No se han encontrado servicios",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "ECL Watch requiere cookies habilitadas para continuar.",
    ECLWatchSessionManagement: "Gestión de sesiones de ECL Watch",
    ECLWorkunit: "Unidad de Trabajo de ECL",
    Edges: "Bordes",
    Edit: "Editar",
    EditDOT: "Editar DOT",
    EditGraphAttributes: "Editar atributos gráficos",
    EditXGMML: "Editar XGMML",
    EmployeeID: "Identificador del empleado",
    Empty: "(Vacío)",
    Enable: "Habilitar",
    EnableScopeScans: "Activar Scope Scans",
    EnableScopeScansConfirm: "Esta seguro que desea activar Scope Scans?  Cuando DALI se reinicie, las opciones cambiadas se revierten a las opciones de la configuración.",
    EnglishQ: "Ingles?",
    EnterAPercentage: "Entre un porcentaje",
    EnterAPercentageOrMB: "Entre un porcentaje o MB",
    EraseHistory: "Borrar Historia",
    EraseHistoryQ: "Borrar historia de archivo:",
    Error: "Error",
    Errorparsingserverresult: "Error analizando los resultados del servidor",
    Errors: "Errores",
    ErrorsStatus: "Errores/Estado",
    ErrorUploadingFile: "Error subiendo archivo(s). Verifique los permisos",
    ErrorWarnings: "Error/Advertencia(s)",
    Escape: "Escapar",
    ESPBuildVersion: "Versión de ESP",
    ESPNetworkAddress: "Dirección de red de ESP",
    ESPProcessName: "Nombre del proceso ESP",
    EventName: "Nombre del Evento",
    EventNamePH: "eventname",
    EventScheduler: "Planificador de eventos",
    EventText: "Texto del Evento",
    EventTextPH: "Texto del evento",
    Exception: "Excepción",
    Executed: "Ejecutado",
    Executing: "Ejecutando",
    ExpandAll: "Expandir Todo",
    ExpireDays: "Se vence en (días)",
    Export: "Exportar",
    ExportSelectionsToList: "Exportar selecciones a lista",
    FailIfNoSourceFile: "Falla si no hay archivo de origen",
    Fatal: "Fatal",
    Fetched: "Obtenido",
    FetchingData: "Obteniendo Data...",
    fetchingresults: "obteniendo resultados",
    File: "Archivo",
    FileCluster: "Racimo de archivos",
    FileCounts: "Numero de Archivos",
    FileName: "Nombre de archivo",
    FileParts: "Partes de archivos",
    FilePath: "Camino del archivo",
    FilePermission: "Permisos de Archivos",
    Files: "Archivos",
    FileScopeDefaultPermissions: "Permisos por defecto de alcance de archivos",
    FileScopes: "Ámbitos de Archivos",
    FileSize: "Tamaño de archivo",
    FilesNoPackage: "Archivos sin ",
    FilesPending: "Archivos pendientes",
    FilesWarning: "La cantidad de archivos devueltos es demasiado grande. Solo se devolvieron los primeros 100000 archivos ordenados por fecha / hora modificada. Si desea limitar los resultados, configure un filtro.",
    FilesWithUnknownSize: "Archivos sin tamaño desconocido.",
    FileType: "Tipo de Archivo",
    FileUploader: "Subidor de archivo",
    FileUploadStillInProgress: "Carga de archivos todavia esta progresando",
    Filter: "Filtro",
    FilterSet: "Filtro definido",
    Find: "Encontrar",
    FindNext: "Encontrar próximo",
    FindPrevious: "Encontrar previo",
    Finished: "Terminado",
    FirstN: "PrimerosN",
    FirstName: "Primer Nombre",
    FirstNRows: "Primeras N Filas",
    Fixed: "Fijo",
    Folder: "Carpeta",
    Format: "Formato",
    Forums: "Foros",
    Forward: "Adelante",
    FoundFile: "Archivo encontrado",
    FoundFileMessage: "Todas las partes en disco del archivo encontrado no estan referenciadas en el servidor Dali. Todas las partes se han encontrado asi que pueden ser agregadas de nuevo al Servidor Dali. Las partes tambien pueden ser removidas del cluster, si es necesario.",
    FromDate: "Desde Fecha",
    FromSizes: "Desde Tamaños",
    FromTime: "Tiempo de Comenzar",
    FullName: "Nombre Entero",
    Generate: "Generar",
    GetPart: "Obtener parte",
    GetSoftwareInformation: "Obtener informacion del software",
    Graph: "Gráfico",
    GraphControl: "Control de gráficos",
    Graphs: "Gráficos",
    GraphView: "Vista del gráfico",
    Group: "Grupo",
    GroupBy: "Ordenar Por",
    GroupDetails: "Detalles del Grupo",
    Grouping: "Agrupacion",
    GroupName: "Nombre del grupo",
    GroupPermissions: "Permisos del Grupo",
    Groups: "Grupos",
    GZip: "GZip",
    help: "Esta área muestra el mapa de árbol de el/los gráfico(s) en esta unidad de trabajo. El tamaño y el tinte indican la duración de cada gráfico (más grande y más oscuro indica un porcentaje mayor de tiempo tomado.)",
    Helper: "Ayudador",
    Helpers: "Ayudantes",
    Hex: "exadecimal",
    HideSpills: "Esconder derrames",
    High: "Alto",
    History: "Historia",
    HPCCSystems: "HPCC Systems®",
    Icon: "Icono",
    ID: "ID",
    Inactive: "Inactivo",
    IncludeSlaveLogs: "Incluir slave logs",
    Index: "Indice",
    Info: "información ",
    InfoDialog: "Diálogo informativo",
    InheritedPermissions: "Heredar Permisos",
    Inputs: "Entradas",
    InvalidResponse: "(Respuesta invalida)",
    InvalidUsernamePassword: "Nombre de usuario o contraseña inválidos, inténtalo de nuevo",
    IP: "IP",
    IPAddress: "Dirección de IP",
    IsCompressed: "Está comprimido",
    IsLibrary: "Es biblioteca",
    IsReplicated: "Es Replicado",
    IssueReporting: "Informes de errores",
    JobName: "Nombre del trabajo",
    Jobname: "Nombre del trabajo",
    jsmi: "jsmi*",
    JSmith: "JSmit*",
    JSON: "JSON",
    KeyFile: "Archivo llave",
    Label: "Etiqueta",
    LandingZone: "Zona de descarga",
    LandingZones: "Zonas de aterrizaje",
    LanguageFiles: "Archivos de idiomas",
    Largest: "Mas Grande",
    LargestFile: "Archivo mas Grande",
    LargestSize: "Tomaño mas Grande",
    LastEdit: "Última edición",
    LastEditedBy: "Última edición por:",
    LastEditTime: "Última hora de edición",
    LastMessage: "Ultimo mensaje",
    LastName: "Apellido",
    LastNDays: "ULtimos N días",
    LastNHours: "Ultimas N Horas",
    LastNRows: "Ultimas N Filas",
    LastRun: "Ultima ejecución",
    LDAPWarning: "<b>Error en Servicios de LDAP:</b>  &lsquo;Demasiados Usuarios&rsquo; - Por favor aplique un Filtro.",
    LearnMore: "Aprende más",
    LegacyForm: "Forma histórica",
    Legend: "Leyanda",
    LibrariesUsed: "Bibliotecas usadas",
    LibraryName: "Nombre de Biblioteca",
    Line: "Línea",
    LineTerminators: "Terminadores de línea",
    Links: "Vínculos",
    Loading: "Cargando...",
    LoadingCachedLayout: "Cargando  Diseño de Memoria...",
    LoadingData: "Cargando data...",
    loadingMessage: "...Cargando...",
    LoadPackageContentHere: "(Cargar aqui el contenido del paquete)",
    LoadPackageFromFile: "Cargar paquete con contenido de archivo",
    Local: "Local",
    LocalFileSystemsOnly: "Sistema de archivos locales solamente",
    Location: "Ubicación",
    Lock: "Cerrar",
    Log: "Registro",
    log_analysis_1: "log_analysis_1*",
    LogFile: "Archivo de registro",
    LoggedInAs: "Conectado como",
    LoggingOut: "Saliendo",
    LogicalFile: "Archivo Lógico",
    LogicalFiles: "Archivos lógicos",
    LogicalFilesAndSuperfiles: "Archivo lógico y Superfiles",
    LogicalFilesOnly: "Archivos logicos Solamente",
    LogicalFileType: "Tipo de archivo lógico",
    LogicalName: "Nombre lógico",
    Login: "Iniciar sesión",
    Logout: "Cerrar sesión",
    Logs: "Registros",
    LogVisualization: "Visualización de registros",
    LogVisualizationUnconfigured: "La visualización del registro no está configurada, verifique las configuraciones de su administrador de configuración.",
    LostFile: "Archivo perdido",
    LostFile2: "Archivos perdidos",
    LostFileMessage: "Un archivo lógico ha perdido al menos una de sus partes en ambas ubicaciones, primary y replicada. El archivo lógico aún está referenciado en el servidor Dali. Eliminando este archivo se remueven la referencia en el servidor Dali y todas las partes existentes en disco.",
    Low: "Bajo",
    MachineInformation: "Información de las máquinas",
    Machines: "Máquinas",
    Major: "Mayor",
    ManagedBy: "Manejado por",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Oprima Crtl_C",
    ManualOverviewSelection: "Seleccion manual sera requirida",
    ManualTreeSelection: "Seleccion manual de arbol sera requirida",
    Mappings: "Mapeados",
    Mask: "Máscara",
    Max: "Máx",
    MaximumNumberOfSlaves: "Numero de esclavo",
    MaxNode: "Nodo máximo",
    MaxRecordLength: "Máx largo de registros",
    MaxSize: "Tamaňo máximo",
    MaxSkew: "Sesgo máximo",
    MemberOf: "Miembro de",
    Members: "Miembros",
    Message: "Mensaje",
    MethodConfiguration: "Configuracion de Método",
    Methods: "Métodos",
    Min: "Minimo",
    Mine: "Mío",
    MinNode: "Nodo mínimo",
    Minor: "Menor",
    MinSize: "Tamaňo mínimo",
    MinSkew: "Sesgo mínimo",
    Missing: "Falta",
    MixedNodeStates: "Estado mixto de nodo",
    Modification: "Modificación",
    Modified: "modificado",
    ModifiedUTCGMT: "Modificado (UTC/GMT)",
    Modify: "Modificar",
    MonitorEventName: "Nombre del evento monitor",
    Monitoring: "Monitoreando",
    MonitorShotLimit: "Límite de disparos del monitor",
    MonitorSub: "Sub monitor",
    Month: "Mez",
    More: "Mas",
    MustContainUppercaseAndSymbol: "Debe Contener mayúscula y símbolo",
    NA: "No Applica",
    Name: "Nombre",
    NamePrefix: "Prefijo del nombre",
    NamePrefixPlaceholder: "algun::prefijo",
    Newest: "El Mas Nuevo",
    NewPassword: "Nueva Contraseña",
    NoContent: "(No hay contenido)",
    noDataMessage: "...Zero Filas...",
    Node: "Nodo",
    NodeGroup: "Grupo de Nodos",
    NoErrorFound: "Ningun Error Detectado",
    NoFilterCriteriaSpecified: "No especificó criterio de filtro.",
    None: "Ninguno",
    NoPublishedSize: "Tamaňo no publicado",
    Normal: "Normal",
    NoScheduledEvents: "Ningun evento programado.",
    NoSplit: "No corte",
    NotActive: "Inacivado",
    NothingSelected: "Nada Seleccionado",
    NotInSuperfiles: "No en las Superfiles",
    NotSuspendedbyUser: "No suspendido por el Usario",
    NoWarningFound: "Ninguna Advertencia Detectada",
    NumberofParts: "Número de partes",
    NumberofSlaves: "Numero de esclavos",
    OK: "Aceptar",
    Oldest: "Mas Antiguo",
    OldPassword: "Contraseña Antigua",
    OmitSeparator: "Omite Separador",
    Only1PackageFileAllowed: "Solo un archivo de paquetes permitido",
    Open: "Abrir",
    OpenInNewPage: "Open In New Page",
    OpenInNewPageNoFrame: "Abrir en nueva pagina (No Marco)",
    OpenLegacyECLWatch: "Abrir ECL Watch viejo",
    OpenLegacyMode: "Abrir (legacia)",
    OpenNativeMode: "Abrir (nativo)",
    OpenSafeMode: "Abrir (modo seguro)",
    OpenSource: "Código Abierto",
    OpenTreeMode: "Abrir (vista en arbol)",
    Operation: "Operación",
    Operations: "Operaciones",
    Options: "Opciones",
    OriginalFile: "Archivo Original",
    OrphanFile: "Archivos huérfanos",
    OrphanFile2: "Archivo huérfano",
    OrphanMessage: "Un archivo huérfano tiene solo algunas de sus partes en disco. Sin embargo, el conjunto completo de partes no esta disponible para construir un archivo logico completo. No hay referencias a estas partes de archivo en el servidor Dali.",
    Outputs: "Salidas",
    Overview: "Visión de conjunto",
    Overwrite: "Sobreescribir",
    OverwriteMessage: "Algunos archivos estan presentes. Por favor Seleccione la casilla de verificación para continuar.",
    Owner: "Dueño",
    PackageContent: "Contenidos del Paquete",
    PackageContentNotSet: "Los Contenidos del Paquete no este definido",
    PackageMap: "Mapa del paquete",
    PackageMaps: "Mapas del paquete",
    PackagesNoQuery: "Paqutes sin correspondiente consulta",
    ParameterXML: "Parámetro XML",
    Part: "Parte",
    PartMask: "Máscara de parte",
    PartName: "Nombre de parte",
    Parts: "Partes",
    PartsFound: "Partes encontradas",
    PartsLost: "Partes perdidas",
    Password: "Contraseña",
    PasswordExpiration: "Expiración de Contraseñas",
    PasswordExpired: "Su contraseña expiro. Por favor cambiela.",
    PasswordExpirePostfix: " dia(s). Desea cambiarla?",
    PasswordExpirePrefix: "Su contraseña expira en",
    PasswordOpenZAP: "Contraseña para abrir ZAP (opcional)",
    PasswordsDoNotMatch: "Las Contraseñas No Coinciden",
    Path: "Camino",
    PathMask: "Máscara del camino",
    Pause: "Pausa",
    PauseNow: "Pausar",
    PctComplete: "% completado",
    PercentCompressed: "Porcentaje comprimido",
    PercentDone: "Porcentaje completado",
    PerformingLayout: "Generando disposición...",
    Permission: "Permiso",
    PermissionName: "Nombre del Permiso",
    Permissions: "Permisos",
    PhysicalFiles: "Archivo físico",
    PlaceholderFindText: "Wuid, usuario, mas...",
    PlaceholderFirstName: "John",
    PlaceholderLastName: "Smith",
    Playground: "Patio de juegos",
    PleaseEnableCookies: "ECL Watch requiere que las cookies esten habilitadas para poder continuar.",
    PleaseEnterANumber: "Por favor escriba un numero 1 -",
    PleaseLogin: "Por favor inicie sesión usando su nombre de usuario y contraseña",
    PleaseLogIntoECLWatch: "Por favor inicie sesión de ECL Watch",
    PleasePickADefinition: "Por favor seleccione una definición",
    PleaseSelectADynamicESDLService: "Por favor seleccione un servicio de ESDL dinámico",
    PleaseSelectAGroupToAddUser: "Por favor escoja un grupo al cual agregar el usario",
    PleaseSelectAServiceToBind: "Seleccione un servicio para conectar",
    PleaseSelectATopologyItem: "Por favor seleccione un destino, servicio o máquina",
    PleaseSelectAUserOrGroup: "Por favor escoja un usario o grupo y nombre de archivo",
    PleaseSelectAUserToAdd: "Por favor escoja el usario para agregar",
    Plugins: "Complementos",
    Port: "Puerto",
    Prefix: "Prefijo",
    PrefixPlaceholder: "filename{:length}, filesize{:[B|L][1-8]}",
    Preflight: "Pre-volado",
    PreloadAllPackages: "Precargar todos los paquetes",
    PreserveCompression: "Preservar Compression",
    Preview: "Presentación Preliminar",
    PrimaryLost: "Primario perdido",
    PrimaryMonitoring: "Monitoreado Principal",
    Priority: "Prioridad",
    Process: "Proceso",
    Processes: "Procesos",
    ProcessFilter: "Filtro de Procesos",
    ProcessorInformation: "Información del procesador",
    ProgressMessage: "Mensaje de progreso",
    Properties: "Propiedades",
    Property: "Propiedad",
    Protect: "Proteger",
    Protected: "Protegido",
    Publish: "Publicar",
    Published: "Publicado",
    PublishedBy: "Publicado por",
    PublishedByMe: "Publicado por mí",
    PublishedQueries: "Queries publicados",
    PushEvent: "Evento de Inserción",
    Quarter: "Cuarto",
    Queries: "Consultas",
    QueriesNoPackage: "Consultas sin correspondiente paquete",
    Query: "Consulta",
    QueryDetailsfor: "Detalles de Consulta por",
    QueryID: "ID de la Consulta",
    QueryIDPlaceholder: "som?q*ry.1",
    QueryName: "Nombre de la Consulta",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Grupo de Consulta",
    Queue: "Cola",
    Quote: "Comilla",
    QuotedTerminator: "Terminador Encomillado",
    RawTextPage: "Texto (Pagina Actual)",
    Ready: "Listo",
    ReallyWantToRemove: "Confirme que quiere eliminar",
    ReAuthenticate: "Reafirmar para abrir",
    RecordCount: "Número de registros",
    RecordLength: "Largo de registro",
    Records: "Registros",
    RecordSize: "Tamaño del registro",
    RecordStructurePresent: "Estructura del Registro esta presente",
    Recover: "Recuperar",
    RecoverTooltip: "Reiniciar workunit en pausa / estancado",
    RecreateQuery:"Recrear consulta",
    Recycling: "Reciclando",
    RedBook: "Red Book",
    Refresh: "Actualizar",
    ReleaseNotes: "Notas de la versión",
    Reload: "Recargar",
    Remaining: "Restante",
    RemoteCopy: "Copia Remota",
    RemoteDali: "Dali remoto",
    RemoteDaliIP: "Remote&nbsp;Dali&nbsp;IP&nbsp;Address",
    Remove: "Remover",
    RemoveAttributeQ: "Está por eliminar este atributo. Está seguro de que desea continuar?",
    RemoveAtttributes: "Eliminar atributo(s)",
    RemovePart: "Eliminar parte(s)",
    RemoveSubfiles: "Quitar Sub-Archivo(s)",
    RemoveSubfiles2: "Quitar subarchivo(s)",
    RemoveUser: "Esta apunto de excluirse del grupo:",
    Rename: "Renombrar",
    RenderedSVG: "SVG creado",
    RenderSVG: "Crear SVG",
    Replicate: "Replicar",
    ReplicatedLost: "Réplica perdida",
    ReplicateOffset: "Offset de Reproducción",
    ReportAnError: "Reportar un error",
    ReportError: "Informe de error",
    RepresentsASubset: "Representar un subconjunto de todas los casamientos. Usando un filtro correcto puede reducir el numero de casamientos",
    RequestSchema: "Esquema del requerimiento",
    RequiredForXML: "Obligatorio para spray data en XML",
    Reschedule: "Re-planear ejecución",
    Reset: "Origen",
    ResetThisQuery: "Reajustar esta Consulta",
    ResetViewToSelection: "Reajustar Vista a la Seleccion",
    Resource: "Recurso",
    Resources: "Recursos",
    ResponseSchema: "Esquema de la respuesta",
    Restart: "Empezar de nuevo",
    Restarted: "Reiniciado",
    Restore: "Restaurar",
    Resubmit: "Reenviar",
    Resubmitted: "Reenviado",
    ResubmitTooltip: "Someter workunit de nuevo ",
    Results: "Resultado(s)",
    Resume: "Continuar",
    RetainSuperfileStructure: "Retener estructura del super-archivo",
    RetypePassword: "Confirme la contraseña",
    Reverse: "Marchar Atrás",
    RowPath: "Ruta de Fila",
    Rows: "Líneas",
    RowTag: "Etiqueta de línea",
    RoxieCluster: "Sistema Roxie",
    RoxieFileCopy: "Estado de copia de archivos de Roxie",
    RunningServerStrain: "La ejecución de este proceso puede tomar un tiempo largo y pondrá una carga significativa en los servidores. Desea continuar?",
    Sample: "Ejemplo",
    SampleRequest: "Ejemplo del requerimiento",
    SampleResponse: "Ejemplo de la respuesta",
    Save: "Guardar",
    Scope: "Ámbito",
    SearchResults: "Resultados de búsqueda",
    SecondsRemaining: "Segundos que faltan",
    Security: "Seguridad",
    SelectPackageFile: "Seleccione &lsquo;Package File&rsquo;",
    Separators: "Seperadores",
    Server: "Servidor",
    ServiceName: "Nombre del servicio",
    Services: "Servicios",
    SetBanner: "Configurar la bandera",
    SetTextError: "No se pudo visualizar el texto (muy grande?). Use &lsquo;helpers&rsquo; para descargar.",
    SetToFailed: "Marcar como fallado",
    Severity: "Severidad",
    Show: "Mostrar",
    ShowProcessesUsingFilter: "Mostrar procesos usando filtro",
    ShowSVG: "Mostrar SVG",
    Size: "Tamaño",
    Skew: "Desbalance",
    SkewNegative: "Desbalanceado(-)",
    SkewPositive: "Desbalanceado(+)",
    SLA: "SLA",
    SlaveLogs: "Slave logs",
    SlaveNumber: "Numero de esclavo",
    Slaves: "Esclavos",
    Smallest: "El Mas Pequeño",
    SmallestFile: "Archivo mas Pequeño",
    SmallestSize: "Tamaño mas Pequeño",
    SOAP: "SOAP",
    SomeDescription: "Alguna*Descripcion",
    somefile: "*::archivo*",
    Source: "Origen",
    SourceCode: "Código fuente",
    SourceLogicalFile: "Nombre logico",
    SourcePath: "Directorio (Se puede usar Asterisco)",
    SourceProcess: "Processo de Origen",
    Spill: "Regar",
    SplitPrefix: "Corte prefijo",
    Spray: "Rociar",
    Start: "Comienzo",
    Started: "Comenzado",
    Starting: "Comenzando",
    State: "Estado",
    Stats: "Estatísticas",
    Status: "Estado",
    Stopped: "Detenido",
    Stopping: "Deteniendo",
    StorageInformation: "Información del almacenamiento",
    Subgraph: "Subgrafo",
    Subgraphs: "Sub-gráficos",
    Submit: "Enviar",
    Subtype: "Subtipo",
    SuccessfullySaved: "Guardado",
    Summary: "Resumen",
    SummaryMessage: "Mensaje resumido",
    SuperFile: "Super File",
    Superfile: "Superfile",
    Superfiles: "Super-Archivos",
    SuperFiles: "Superfiles",
    SuperFilesBelongsTo: "Miembro de Super-Archivo(s)",
    SuperfilesOnly: "Solo Superfiles",
    SuperOwner: "Dueño de Superfiles",
    Suspend: "Suspender",
    Suspended: "Suspendido",
    SuspendedBy: "Suspendido por",
    SuspendedByCluster: "Suspendido  por el Clúster",
    SuspendedByUser: "Suspendido por el Usuario",
    SuspendedReason: "Rason porque se suspendio",
    SVGSource: "Origen del SVG",
    Sync: "Sincronizar",
    SyncSelection: "Sincronizar",
    SystemServers: "Servidores de sistema",
    Table: "Tabla",
    tag: "etiqueta",
    Target: "Destino",
    TargetClusters: "Sistemas de destino",
    TargetName: "Nombre del &lsquo;Target&rsquo;",
    TargetNamePlaceholder: "nombre::dealgunl::archivo::logico",
    TargetRowTagRequired: "Es necesario suministrar el código de fila",
    Targets: "Destinos",
    TargetScope: "Ámbito Objetivo",
    TargetWuid: "Wuid del Objecto",
    Terminators: "Terminadores",
    TestPages: "Páginas de prueba",
    Text: "Texto",
    TheReturnedResults: "Los resultados regresados ",
    ThorMasterAddress: "Direccion del Thor Master",
    ThorNetworkAddress: "Dirección de red de Thor",
    ThorProcess: "Proceso de Thor",
    Time: "Tiempo",
    Timers: "Cronómetros",
    TimeSeconds: "Tiempo (Segundos)",
    TimeStamp: "Marca de tiempo",
    TimeStarted: "Tiempo empezado",
    TimeStopped: "Tiempo detenido",
    Timings: "Tiempos",
    TimingsMap: "Mapa de tiempos",
    title_ActiveGroupPermissions: "Permisos del Grupo Vigente",
    title_ActivePermissions: "Permisos Vigentes",
    title_Activity: "Actividad",
    title_AvailableGroupPermissions: "Permisos de Grupo disponibles",
    title_AvailablePermissions: "Permisos Disponibles",
    title_BindingConfiguration: "Configuración de conexión",
    title_BindingDefinition: "Definición de conexión",
    title_ClusterInfo: "Grupos",
    title_CodeGeneratorPermissions: "Permisos de generador de codigo",
    title_DefinitionExplorer: "Explorador de Definiciónes",
    title_Definitions: "Definiciónes",
    title_DESDL: "ESDL dinámico",
    title_DFUQuery: "Archivos Lógicos",
    title_DFUWUDetails: "Unidad de trabajo DFU",
    title_DirectoriesFor: "Directorios para",
    title_DiskUsage: "Utilización del disco",
    title_ECLPlayground: "ECL Playground",
    title_ErrorsWarnings: "Errores/Advertencias de",
    title_EventScheduleWorkunit: "Planificador de Eventos",
    title_FileScopeDefaultPermissions: "Permisos de archive por defecto",
    title_FilesPendingCopy: "Archivos pendientes para copiar",
    title_FoundFilesFor: "Archivos encontrados para",
    title_GetDFUWorkunits: "Unidades de trabajo DFU",
    title_Graph: "Gráficos",
    title_GraphPage: "título",
    title_Graphs: "Gráficos",
    title_GridDetails: "Cámbieme",
    title_History: "Historia",
    title_HPCCPlatformECL: "ECL Watch - Hogar",
    title_HPCCPlatformFiles: "ECL Watch - Archivos",
    title_HPCCPlatformMain: "ECL Watch - Hogar",
    title_HPCCPlatformOps: "ECL Watch - Operaciones",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Watch - dispositivo opcional",
    title_Inputs: "Entradas",
    title_LFDetails: "Detalles de archivos lógicos",
    title_LibrariesUsed: "Librerias Usadas",
    title_Log: "Archivo de Registro",
    title_LostFilesFor: "Archivos perdidos para",
    title_LZBrowse: "Zonas de descarga",
    title_MemberOf: "Miembros de",
    title_Members: "Miembros",
    title_Methods: "Métodos",
    title_OrphanFilesFor: "Archivos huérfanos para",
    title_PackageParts: "Partes de paquete",
    title_Permissions: "Permisos",
    title_PreflightResults: "Resultados de pre-volado",
    title_QuerySetDetails: "Detalles de Consulta",
    title_QuerySetErrors: "Errores",
    title_QuerySetLogicalFiles: "Archivos lógicos",
    title_QuerySetQuery: "Consultas",
    title_QuerySetSuperFiles: "Super archivos",
    title_QueryTest: "Super Archivos",
    title_Result: "Actividad",
    title_Results: "Salidas",
    title_SearchResults: "Resultados de búsqueda ",
    title_SourceFiles: "Archivo de origen",
    title_Topology: "Topología",
    title_TpThorStatus: "Estatus de Thor",
    title_UserPermissions: "Permisos del Usuario",
    title_UserQuery: "Permisos",
    title_WorkunitScopeDefaultPermissions: "Permisos de workunits por defecto",
    title_WUDetails: "Detalles de las unidades de trabajo ECL",
    title_WUQuery: "Unidades de trabajo ECL",
    To: "A:",
    ToDate: "Hasta fecha",
    Toenablegraphviews: "Para habilitar vista de gráficos, instale el plugin Graph View Control",
    Tooltip: "Globo de información",
    TooManyFiles: "Demasiados archivos",
    Top: "Arriva",
    Topology: "Topología",
    ToSizes: "A tamaño",
    TotalClusterTime: "Tiempo Total del Cluster",
    TotalParts: "Total de partes",
    TotalSize: "Tamaño Total",
    TotalThorTime: "Tiempo total de Thor",
    TransitionGuide: "Guía de transición",
    Tree: "Arbol",
    Type: "Tipo",
    Unbound: "No esta consolidado",
    undefined: "no definido",
    Unknown: "Desconocido",
    Unlock: "Abrir",
    Unprotect: "Desproteger",
    UnsupportedIE9FF: "No se ofrece soporte (IE <= 9, FireFox)",
    Unsuspend: "De-suspender",
    Unsuspended: "Des-suspendido",
    Up: "Arriba",
    UpdateCloneFrom: "Actualizar clon de",
    UpdateDFs: "Actualizar DFS",
    UpdateSuperFiles: "Actualizar superfile",
    Upload: "Subir",
    URL: "URL",
    Usage: "Utilización",
    Used: "Usado",
    User: "Usuario",
    UserDetails: "Detalles del Usuario",
    UserID: "ID del Usuarion",
    UserLogin: "Por favor inicie sesión usando solo su nombre de usuario",
    UserName: "Nombre de Usario",
    Username: "NombreDeUsario",
    UserPermissions: "Permisos del Usuario",
    Users: "Usuarios",
    UseSingleConnection: "Use una sola conexión",
    Validate: "Validar",
    ValidateActivePackageMap: "Validar Package Map Activo",
    ValidatePackageContent: "Validar Contenido de Paquete",
    ValidatePackageMap: "Validar el Package Map",
    ValidateResult: "=====Velida el Resultado=====\n\n",
    ValidateResultHere: "(resultado de la validación)",
    Value: "Valor",
    Variable: "Variable",
    VariableBigendian: "Variable &lsquo;Big-endian&rsquo;",
    Variables: "Variables",
    VariableSourceType: "Formato",
    Version: "Versión",
    ViewByScope: "&lsquo;Ver Por Ámbito&rsquo;",
    Views: "Vistas",
    Visualize: "Visualizar",
    WarnIfAvailableDiskSpaceIsUnder: "Advertencia si disco disponible esta debajo de",
    WarnIfAvailableMemoryIsUnder: "Advertencia si memoria disponible esta debajo de",
    WarnIfCPUUsageIsOver: "Advertencia si uso de CPU esta arriba de",
    Warning: "Advertencia",
    Warnings: "Advertencias",
    WarnOldGraphControl: "Advertencia: Controlador de Graphicas antiguo",
    What: "Que",
    Where: "Donde",
    Who: "Quien",
    Width: "Ancho",
    Workflows: "Flujos de Trabajo",
    Workunit: "Unidad de trabajo",
    Workunits: "Unidades de trabajo",
    WorkUnitScopeDefaultPermissions: "Permisos por defect de alcaces de Workunit",
    Wrap: "Envolver",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid no puede estar vacío.",
    WUSnapShot: "Captura de Unidad de trabajo",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "Referencias cruzadas",
    Year: "Año",
    YouAreAboutToBeLoggedOut: "Estás a punto de ser desconectado",
    YouAreAboutToDeleteBinding: "Está a punto de eliminar esta conexión. Desea continuar?",
    YouAreAboutToDeleteDefinition: "Estás a punto de eliminar esta definición. ¿Estás seguro que quieres hacer esto?",
    YouAreAboutToDeleteThisFile: "Usted esta a punto de eliminar este archivo. ¿Desea continuar?",
    YouAreAboutToDeleteThisPart: "Usted esta a punto de eliminar esta parte. ¿Desea continuar?",
    YouAreAboutToDeleteThisQueryset: "Usted esta a punto de eliminar este grupo de consulta. ¿Desea continuar?",
    YouAreAboutToDeleteThisWorkunit: "Usted esta a punto de eliminar este workunit. ¿Desea continuar?",
    YouAreAboutToRemoveUserFrom: "Usted esta a punto de quitar un(os) usuario(s) de este grupo. ¿Desea continuar?",
    YourBrowserMayNotSupport: "Es posible que su navegador no soporta archivos de este tamaño",
    YourScreenWasLocked: "Tu pantalla fue bloqueada por ESP. Por favor, vuelve a buscar sus datos, que puede estar obsoleto.",
    ZAP: "Z.A.P.",
    ZeroLogicalFilesCheckFilter: "Archivos logicos a cero (chequee filtro)",
    Zip: "Zip",
    ZippedAnalysisPackage: "Paquete de análisis en formato Zip",
    Zoom: "Enfocar",
    Zoom100Pct: "Aumentar a 100%",
    ZoomAll: "Aumentar todo",
    ZoomMinus: "Enfocar menos",
    ZoomPlus: "Enfocar más",
    ZoomWidth: "Aumentar al ancho"
});

/***/ }),

/***/ "./eclwatch/nls/hpcc.js":
/*!******************************!*\
  !*** ./eclwatch/nls/hpcc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {root:
({
    Abort: "Abort",
    AbortedBy: "Aborted by",
    AbortedTime: "Aborted time",
    About: "About",
    AboutGraphControl: "About Graph Control",
    AboutHPCCSystems: "About HPCC Systems®",
    AboutHPCCSystemsGraphControl: "About HPCC Systems® Graph Control",
    AboutToLoseSessionInformation: "You are about to log out and lose all session information. Do you wish to continue?",
    Account: "Account",
    Action: "Action",
    Activate: "Activate",
    ActivateQuery: "Activate Query",
    ActivateQueryDeletePrevious: "Activate query, delete previous",
    ActivateQuerySuspendPrevious: "Activate query, suspend previous",
    Activated: "Activated",
    Active: "Active",
    ActivePackageMap: "Active Package Map",
    ActiveWorkunit: "Active Workunit",
    Activities: "Activities",
    Activity: "Activity",
    ActivityMap: "Activity Map",
    ActualSize: "Actual Size",
    Add: "Add",
    AddAttributes: "Add attributes/values to your method",
    AddAttributes2: "Add Attribute(s)",
    AddBinding: "Add Binding",
    AddFile: "Add File",
    AddGroup: "Add Group",
    AddtionalProcessesToFilter: "Addtional Processes To Filter",
    AdditionalResources: "Additional Resources",
    AddPart: "Add Part",
    AddProcessMap: "Add Package Map",
    AddTheseFilesToDali: "Add these files to Dali?",
    AddToSuperfile: "Add To Superfile",
    AddToExistingSuperfile: "Add to an existing superfile",
    AddUser: "Add User",
    Advanced: "Advanced",
    All: "All",
    AllowAccess: "<center>Allow<br>Access</center>",
    AllowForeignFiles: "Allow Foreign Files",
    AllowFull: "<center>Allow<br>Full</center>",
    AllowRead: "<center>Allow<br>Read</center>",
    AllowWrite: "<center>Allow<br>Write</center>",
    AllQueuedItemsCleared: "All Queued items have been cleared. The current running job will continue to execute.",
    ANY: "ANY",
    AnyAdditionalProcessesToFilter: "Any Addtional Processes To Filter",
    Append: "Append",
    AppendCluster: "Append Cluster",
    Apply: "Apply",
    ArchivedOnly: "Archived Only",
    ArchivedWarning: "Warning: please specify a small date range. If not, it may take some time to retrieve the workunits and the browser may be timed out.",
    Attach: "Attach",
    BinaryInstalls: "Binary Installs",
    Attribute: "Attribute",
    AttributesAreRequired: "Attributes are required",
    AutoRefresh: "Auto Refresh",
    AutoRefreshIncrement: "Auto Refresh Increment",
    AutoRefreshEvery: "Auto refresh every x minutes",
    Back: "Back",
    BannerColor: "Banner Colour",
    BannerMessage: "Banner Message",
    BannerScroll: "Banner Scroll",
    BannerSize: "Banner Size",
    Bind: "Bind",
    Binding: "Binding",
    BindingDeleted: "Binding Deleted",
    Blob: "BLOB",
    BlobPrefix: "BLOB Prefix",
    Bottom: "Bottom",
    BoundBy: "bound by:",
    Busy: "Busy",
    Cancel: "Cancel",
    CancelAll: "Cancel All",
    CancelAllMessage: "Abort running jobs and clear queue. Do you wish to continue?",
    Chart: "Chart",
    CheckAllNodes: "Check All Nodes",
    CheckFilePermissions: "Check File Permissions",
    CheckSingleNode: "Check Single Node",
    Clear: "Clear",
    Clone: "Clone",
    CloneTooltip: "Duplicate workunit",
    Close: "Close",
    Cluster: "Cluster",
    ClusterName: "Cluster Name",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Cluster Processes",
    Code: "Code",
    CodeGenerator: "Code Generator",
    Col: "Col",
    CollapseAll: "Collapse All",
    Command: "Command",
    Comment: "Comment",
    Compiled: "Compiled",
    Compiling: "Compiling",
    Completed: "Completed",
    ComplexityWarning: "More than {threshold} activities ({activityCount}) - suppress initial display?",
    CompressedFileSize: "Compressed File Size",
    Component: "Component",
    Compress: "Compress",
    Compressed: "Compressed",
    ComputerUpTime: "Computer Up Time",
    Condition: "Condition",
    ConfigureService: "Configure service",
    Configuration: "Configuration",
    ConfirmPassword: "Confirm Password",
    ConfirmRemoval: "Are you sure you want to do this?",
    ContactAdmin: "If you wish to rename this group, please contact your LDAP admin.",
    ContinueWorking: "Continue Working",
    Content: "Content",
    Contents: "Contents",
    ContentType: "Content Type",
    Copy: "Copy",
    CopyToClipboard: "Copy to clipboard",
    CopyWUIDs: "Copy WUIDs to clipboard",
    Copied: "Copied!",
    Count: "Count",
    CPULoad: "CPU Load",
    CreateANewFile: "Create a new superfile",
    Created: "Created",
    Creating:"Creating",
    CreatedBy: "Created By",
    CreatedTime: "Created Time",
    Critical: "Critical",
    ClearPermissionsCache: "Clear Permissions Cache",
    ClearPermissionsCacheConfirm: "Are you sure you want to clear the DALI and ESP permissions caches? Running workunit performance might degrade significantly until the caches have been refreshed.",
    ClonedWUID: "Cloned WUID",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "DaliIP",
    dataset: ":=dataset*",
    Date: "Date",
    Day: "Day",
    Deactivate: "Deactivate",
    Debug: "Debug",
    DEF: "DEF",
    Defaults: "Defaults",
    Definition: "Definition",
    DefinitionID: "Definition ID",
    Definitions: "Definitions",
    DefinitionDeleted: "Definition deleted",
    DelayedReplication: "Delayed replication",
    Delete: "Delete",
    DeleteBinding: "Delete Binding",
    DeletedBinding: "Deleted Binding",
    Deleted: "Deleted",
    DeleteEmptyDirectories: "Delete empty directories?",
    DeleteDirectories: "Remove empty directories. Do you wish to continue?",
    DeletePrevious: "Delete Previous",
    DeleteSelectedDefinitions: "Delete selected definitions?",
    DeleteSelectedFiles: "Delete Selected Files?",
    DeleteSelectedGroups: "Delete selected group(s)?",
    DeleteSelectedPackages:"Delete selected packages?",
    DeleteSelectedPermissions: "Delete selected permission(s)?",
    DeleteSelectedQueries: "Delete Selected Queries?",
    DeleteSelectedUsers: "Delete selected user(s)?",
    DeleteSelectedWorkunits: "Delete Selected Workunits?",
    DeleteSuperfile: "Delete Superfile?",
    DeleteSuperfile2: "Delete Superfile",
    DeleteThisPackage: "Delete this package?",
    Delimited: "Delimited",
    DenyAccess: "<center>Deny<br>Access</center>",
    DenyFull: "<center>Deny<br>Full</center>",
    DenyRead: "<center>Deny<br>Read</center>",
    DenyWrite: "<center>Deny<br>Write</center>",
    Depth: "Depth",
    DepthTooltip: "Maximum Subgraph Depth",
    Deschedule: "Deschedule",
    DescheduleSelectedWorkunits: "Deschedule Selected Workunits?",
    Description: "Description",
    DESDL: "Dynamic ESDL",
    Despray: "Despray",
    Details: "Details",
    DFUServerName: "DFU Server Name",
    DFUWorkunit: "DFU Workunit",
    Directories: "Directories",
    Directory: "Directory",
    DisableScopeScans: "Disable Scope Scans",
    DisableScopeScanConfirm: "Are you sure you want to disable Scope Scans?  Changes will revert to configuration settings on DALI reboot.",
    DiskUsage: "Disk Usage",
    Distance: "Distance",
    DistanceTooltip: "Maximum Activity Neighbourhood Distance",
    Dll: "Dll",
    DoNotActivateQuery: "Do not activate query",
    DoNotRepublish: "Do not republish?",
    Documentation: "Documentation",
    DOT: "DOT",
    DOTAttributes: "DOT Attributes",
    Down: "Down",
    Download: "Download",
    Downloads: "Downloads",
    DownloadToCSV: "Download to CSV",
    DropZone: "Drop Zone",
    DueToInctivity: "You will be logged out of all ECL Watch sessions in 3 minutes due to inactivity.",
    Duration: "Duration",
    DynamicNoServicesFound: "No services found",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "ECL Watch requires cookies enabled to continue.",
    ECLWatchSessionManagement: "ECL Watch session management",
    ECLWorkunit: "ECL Workunit",
    Edges: "Edges",
    Edit: "Edit",
    EditDOT: "Edit DOT",
    EditGraphAttributes: "Edit Graph Attributes",
    EditXGMML: "Edit XGMML",
    EmailTo: "Email Address (To)",
    EmailFrom: "Email Address (From)",
    EmailBody: "Email Body",
    EmailSubject: "Email Subject",
    EmployeeID: "Employee ID",
    Empty: "(Empty)",
    Enable: "Enable",
    EnableScopeScans: "Enable Scope Scans",
    EnableScopeScansConfirm: "Are you sure you want to enable Scope Scans? Changes will revert to configuration settings on DALI reboot.",
    EnglishQ: "English?",
    EnterAPercentage: "Enter a percentage",
    EnterAPercentageOrMB: "Enter A Percentage or MB",
    EraseHistory: "Erase History",
    EraseHistoryQ: "Erase history for:",
    Error: "Error",
    Errorparsingserverresult: "Error parsing server result",
    Errors: "Error(s)",
    ErrorsStatus: "Errors/Status",
    ErrorUploadingFile: "Error uploading file(s). Try checking permissions.",
    ErrorWarnings: "Error/Warning(s)",
    Escape: "Escape",
    ESPBuildVersion: "ESP Build Version",
    ESPProcessName: "ESP Process Name",
    ESPNetworkAddress: "ESP Network Address",
    EventName: "Event Name",
    EventNamePH: "Event Name",
    EventScheduler: "Event Scheduler",
    EventText: "Event Text",
    EventTextPH: "Event Text",
    Exception: "Exception",
    ExpireDays: "Expire in (days)",
    FailIfNoSourceFile:"Fail If No Source File",
    Fatal: "Fatal",
    Fetched: "Fetched",
    FetchingData: "Fetching Data...",
    fetchingresults: "fetching results",
    Executed: "Executed",
    Executing: "Executing",
    ExpandAll: "Expand All",
    Export: "Export",
    ExportSelectionsToList: "Export Selections to List",
    File: "File",
    FileCluster: "File Cluster",
    FileCounts: "File Counts",
    FileName: "File Name",
    FileParts: "File Parts",
    FilePath: "File Path",
    Files: "Files",
    FilesPending: "Files pending",
    FileScopes: "File Scopes",
    FileScopeDefaultPermissions: "File Scope Default Permissions",
    FileSize: "File Size",
    FilesNoPackage: "Files without matching package definitions",
    FilePermission: "<b>File Permission</b>",
    FilesWarning: "The number of files returned is too large. Only the first 100,000 files sorted by date/time modified were returned. If you wish to limit results, set a filter.",
    FilesWithUnknownSize: "Files With Unknown Size",
    FileType: "File Type",
    FileUploader: "File Uploader",
    FileUploadStillInProgress: "File upload still in progress",
    Filter: "Filter",
    FilterSet: "Filter Set",
    Find: "Find",
    Finished: "Finished",
    FindNext: "Find Next",
    FindPrevious: "Find Previous",
    FirstN: "First N",
    FirstName: "First Name",
    FirstNRows: "First N Rows",
    Fixed: "Fixed",
    Folder: "Folder",
    Format: "Format",
    Forums: "Forums",
    Forward: "Forward",
    FoundFile: "Found Files",
    FoundFileMessage: "A found file has all of its parts on disk that are not referenced in the Dali server. All the file parts are accounted for so they can be added back to the Dali server. They can also be deleted from the cluster, if required.",
    FromDate: "From Date",
    FromSizes: "From Sizes",
    FromTime: "From Time",
    FullName: "Full Name",
    Generate: "Generate",
    GetPart: "Get Part",
    GetSoftwareInformation: "Get Software Information",
    Graph: "Graph",
    Graphs: "Graphs",
    GraphControl: "Graph Control",
    GraphView: "Graph View",
    Group: "Group",
    GroupBy: "Group By",
    Grouping: "Grouping",
    GroupDetails: "Group Details",
    GroupName: "Group Name",
    GroupPermissions: "Group Permissions",
    Groups: "Groups",
    GZip: "GZip",
    help: "This area displays the treemap for the graph(s) in this workunit. The size and hue indicate the duration of each graph (Larger and darker indicates a greater percentage of the time taken.)",
    Helper: "Helper",
    Helpers: "Helpers",
    Hex: "Hex",
    HideSpills: "Hide Spills",
    High: "High",
    History: "History",
    HPCCSystems: "HPCC Systems®",
    Icon: "Icon",
    ID: "ID",
    Inactive: "Inactive",
    IncludeSlaveLogs: "Include slave logs",
    Index: "Index",
    Info: "Info",
    InfoDialog: "Info Dialog",
    InheritedPermissions: "Inherited permission:",
    Inputs: "Inputs",
    InUse: "In Use",
    InvalidResponse: "(Invalid response)",
    InvalidUsernamePassword: "Invalid username or password, try again.",
    IP: "IP",
    IPAddress: "IP Address",
    IsCompressed: "Is Compressed",
    IsLibrary: "Is Library",
    IsReplicated: "Is Replicated",
    IssueReporting: "Issue Reporting",
    Jobname: "Jobname",
    JobName: "Job Name",
    jsmi: "jsmi*",
    JSmith: "JSmit*",
    JSON: "JSON",
    KeyFile: "Key File",
    KeyType: "Key Type",
    Label: "Label",
    LandingZone: "Landing Zone",
    LandingZones: "Landing Zones",
    LanguageFiles: "Language Files",
    Largest: "Largest",
    LargestFile: "Largest File",
    LargestSize: "Largest Size",
    LastEdit: "Last Edit",
    LastEditedBy: "Last Edited By",
    LastEditTime: "Last Edit Time",
    LastMessage: "Last Message",
    LastName: "Last Name",
    LastNDays: "Last N Days",
    LastNHours: "Last N Hours",
    LastNRows: "Last N Rows",
    LastRun: "Last Run",
    LearnMore: "Learn More",
    LegacyForm: "Legacy Form",
    Legend: "Legend",
    LDAPWarning: "<b>LDAP Services Error:</b>  &lsquo;Too Many Users&rsquo; - Please use a Filter.",
    LibrariesUsed: "Libraries Used",
    LibraryName: "Library Name",
    Line: "Line",
    LineTerminators: "Line Terminators",
    Links: "Links",
    LoadPackageContentHere: "(Load package content here)",
    LoadPackageFromFile: "Load Package from a file",
    Loading: "Loading...",
    LoadingCachedLayout: "Loading Cached Layout...",
    LoadingData: "Loading Data...",
    loadingMessage: "...Loading...",
    Local: "Local",
    LocalFileSystemsOnly: "Local File Systems Only",
    Location: "Location",
    Lock: "Lock",
    LogFile: "Log File",
    LoggedInAs: "Logged in as",
    LogicalFile: "Logical File",
    LogicalFiles: "Logical Files",
    LogicalFilesAndSuperfiles: "Logical Files and Superfiles",
    LogicalFilesOnly: "Logical Files Only",
    LogicalFileType: "Logical File Type",
    LogicalName: "Logical Name",
    Log: "Log",
    LoggingOut: "Logging out",
    Login: "Login",
    Logout: "Log Out",
    Logs: "Logs",
    LogVisualization: "Log Visualization",
    LogVisualizationUnconfigured: "Log Visualization is not configured, please check your configuration manager settings.",
    log_analysis_1: "log_analysis_1*",
    LostFile: "Lost Files",
    LostFile2: "Lost Files",
    LostFileMessage: "A logical file that is missing at least one file part on both the primary and replicated locations in storage. The logical file is still referenced in the Dali server. Deleting the file removes the reference from the Dali server and any remaining parts on disk.",
    Low: "Low",
    Machines: "Machines",
    MachineInformation: "Machine Information",
    Major: "Major",
    ManagedBy: "Managed By",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Press Ctrl+C",
    ManualOverviewSelection: "(Manual overview selection will be required)",
    ManualTreeSelection: "(Manual tree selection will be required)",
    Mappings: "Mappings",
    Mask: "Mask",
    Max: "Max",
    MaxNode: "Max Node",
    MaxSize: "Max Size",
    MaxSkew: "Max Skew",
    MaximumNumberOfSlaves: "Slave Number",
    MaxRecordLength: "Max Record Length",
    Mean: "Mean",
    MemberOf: "Member Of",
    Members: "Members",
    MethodConfiguration: "Method Configuration",
    Message: "Message",
    Methods: "Methods",
    Min: "Min",
    Mine: "Mine",
    MinNode: "Min Node",
    MinSize: "Min Size",
    MinSkew: "Min Skew",
    Minor: "Minor",
    Missing: "Missing",
    MixedNodeStates: "Mixed Node States",
    Modified: "Modified",
    Modification: "Modification",
    ModifiedUTCGMT: "Modified (UTC/GMT)",
    Modify: "Modify",
    Monitoring: "Monitoring",
    MonitorEventName: "Monitor Event Name",
    MonitorShotLimit: "Monitor Shot Limit",
    MonitorSub: "Monitor Sub",
    Month: "Month",
    More: "more",
    MustContainUppercaseAndSymbol: "Must contain uppercase and symbol",
    NA: "N/A",
    Name: "Name",
    NamePrefix: "Name Prefix",
    NamePrefixPlaceholder: "some::prefix",
    Newest: "Newest",
    NewPassword: "New Password",
    NoContent: "(No content)",
    noDataMessage: "...Zero Rows...",
    Node: "Node",
    NodeGroup: "Node Group",
    None: "None",
    NoErrorFound: "No errors found\n",
    NoFilterCriteriaSpecified: "No filter criteria specified.",
    NoPublishedSize: "No published size",
    NoScheduledEvents: "No Scheduled Events.",
    NoSplit: "No Split",
    NotActive: "Not active",
    NothingSelected: "Nothing Selected...",
    NotInSuperfiles: "Not in Superfiles",
    Normal: "Normal",
    NotSuspendedbyUser: "Not Suspended By User",
    NoWarningFound: "No warnings found\n",
    NumberofParts: "Number of Parts",
    NumberofSlaves: "Number of Slaves",
    OK: "OK",
    Oldest: "Oldest",
    OldPassword: "Old Password",
    OmitSeparator: "Omit Separator",
    Only1PackageFileAllowed: "Only one package file allowed",
    Open: "Open",
    OpenInNewPage: "Open in New Page",
    OpenInNewPageNoFrame: "Open in New Page (No Frame)",
    OpenLegacyECLWatch: "Open Legacy ECL Watch",
    OpenLegacyMode: "Open (legacy)",
    OpenNativeMode: "Open (native)",
    OpenSource: "Open Source",
    Operation: "Operation",
    Operations: "Operations",
    Options: "Options",
    OriginalFile: "Original File",
    OrphanFile: "Orphan Files",
    OrphanFile2: "Orphan File",
    OrphanMessage: "An orphan file has partial file parts on disk. However, a full set of parts is not available to construct a complete logical file. There is no reference to these file parts in the Dali server.",
    Outputs: "Outputs",
    Overview: "Overview",
    Overwrite: "Overwrite",
    OverwriteMessage: "Some file(s) already exist. Please check overwrite box to continue.",
    Owner: "Owner",
    PackageContent: "Package Content",
    PackageContentNotSet: "Package content not set",
    PackageMap: "Package Map",
    PackageMaps: "Package Maps",
    PackagesNoQuery: "Packages without matching queries",
    ParameterXML: "Parameter XML",
    Part: "Part",
    PartName: "Part Name",
    PartMask: "Part Mask",
    Parts: "Parts",
    PartsFound: "Parts Found",
    PartsLost: "Parts Lost",
    Password: "Password",
    PasswordExpiration: "Password Expiration",
    PasswordOpenZAP: "Password to open ZAP (optional)",
    PasswordsDoNotMatch: "Passwords do not match.",
    PasswordExpired: "Your password has expired.  Please change now.",
    PasswordExpirePrefix: "Your password will expire in ",
    PasswordExpirePostfix: " day(s). Do you want to change it now?",
    Path: "Path",
    PathMask: "Path Mask",
    Pause: "Pause",
    PauseNow: "Pause Now",
    PctComplete: "% Complete",
    PercentCompressed: "Percent Compressed",
    PercentDone: "Percent Done",
    PercentUsed: "% Used",
    PerformingLayout: "Performing Layout...",
    PermissionName: "Permission Name",
    Permission: "Permission",
    Permissions: "Permissions",
    PhysicalFiles: "Physical Files",
    PlaceholderFindText: "Wuid, User, (ecl:*, file:*, dfu:*, query:*)...",
    PlaceholderFirstName: "John",
    PlaceholderLastName: "Smith",
    Playground: "Playground",
    PleaseEnableCookies: "ECL Watch requires cookies enabled to continue.",
    PleaseLogIntoECLWatch: "Please log into ECL Watch",
    PleasePickADefinition: "Please pick a definition",
    PleaseSelectAGroupToAddUser: "Please select a group to add the user to",
    PleaseSelectAUserOrGroup: "Please select a user or a group along with a file name",
    PleaseSelectAUserToAdd: "Please select a user to add",
    PleaseSelectADynamicESDLService: "Please select a dynamic ESDL service",
    PleaseSelectAServiceToBind: "Please select a service to bind",
    PleaseSelectATopologyItem: "Please select a target, service or machine.",
    Plugins: "Plugins",
    PleaseEnterANumber: "Please enter a number 1 - ",
    PleaseLogin: "Please log in using your username and password",
    Port: "Port",
    Prefix: "Prefix",
    PrefixPlaceholder: "filename{:length}, filesize{:[B|L][1-8]}",
    Preflight: "Preflight",
    PreloadAllPackages: "Preload All Packages",
    PreserveCompression: "Preserve Compression",
    PressCtrlCToCopy: "Press ctrl+c to copy.",
    Preview: "Preview",
    PrimaryLost: "Primary Lost",
    PrimaryMonitoring: "Primary Monitoring",
    Priority: "Priority",
    Process: "Process",
    Processes: "Processes",
    ProcessFilter: "Process Filter",
    ProcessorInformation: "Processor Information",
    ProgressMessage: "Progress Message",
    Properties: "Properties",
    Property: "Property",
    Protect: "Protect",
    Protected: "Protected",
    Publish: "Publish",
    Published: "Published",
    PublishedBy: "Published By",
    PublishedByMe: "Published by me",
    PublishedQueries: "Published Queries",
    PushEvent: "Push Event",
    Quarter: "Quarter",
    Queries: "Queries",
    QueriesNoPackage: "Queries without matching package",
    Query: "Query",
    QueryDetailsfor: "Query Details for",
    QueryID: "Query ID",
    QueryIDPlaceholder: "som?q*ry.1",
    QueryName: "Query Name",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Query Set",
    Queue: "Queue",
    Quote: "Quote",
    QuotedTerminator: "Quoted Terminator",
    RawTextPage: "Raw Text (Current Page)",
    Ready: "Ready",
    ReallyWantToRemove: "Really want to remove?",
    ReAuthenticate: "Reauthenticate to unlock",
    RecreateQuery: "Recreate Query",
    RecordCount: "Record Count",
    RecordLength: "Record Length",
    Records: "Records",
    RecordSize: "Record Size",
    RecordStructurePresent: "Record Structure Present",
    Recover: "Recover",
    RecoverTooltip: "Restart paused / stalled workunit",
    Recycling: "Recycling",
    RedBook: "Red Book",
    Refresh: "Refresh",
    ReleaseNotes: "Release Notes",
    Reload: "Reload",
    Remaining: "Remaining",
    RemoteCopy: "Remote Copy",
    RemoteDali: "Remote Dali",
    RemoteDaliIP: "Remote Dali IP Address",
    Remove: "Remove",
    RemoveAtttributes: "Remove Attribute(s)",
    RemoveAttributeQ: "You are about to remove this attribute. Are you sure you want to do this?",
    RemovePart: "Remove Part",
    RemoveSubfiles: "Remove Subfile(s)",
    RemoveSubfiles2: "Remove Subfile(s)?",
    RemoveUser: "You are about to remove yourself from the group:",
    Rename: "Rename",
    RenderedSVG: "Rendered SVG",
    RenderSVG: "Render SVG",
    Replicate: "Replicate",
    ReplicatedLost: "Replicated Lost",
    ReplicateOffset: "Replicate Offset",
    RepresentsASubset: "represent a subset of the total number of matches. Using a correct filter may reduce the number of matches.",
    RequestSchema: "Request Schema",
    RequiredForXML: "Required for spraying XML",
    Reschedule: "Reschedule",
    Reset: "Reset",
    ResetThisQuery: "Reset This Query?",
    ResetViewToSelection: "Reset View to Selection",
    Resource: "Resource",
    Resources: "Resources",
    ResponseSchema: "Response Schema",
    Restart: "Restart",
    Restarted: "Restarted",
    Restore: "Restore",
    Resubmit: "Resubmit",
    ResubmitTooltip: "Resubmit existing workunit",
    Resubmitted: "Resubmitted",
    Results: "Result(s)",
    Resume: "Resume",
    RetainSuperfileStructure: "Retain Superfile Structure",
    RetypePassword: "Retype Password",
    Reverse: "Reverse",
    RoxieFileCopy: "Roxie Files Copy Status",
    RoxieState: "Roxie State",
    Rows: "Rows",
    RowPath: "Row Path",
    RowTag: "Row Tag",
    RoxieCluster: "Roxie Cluster",
    RunningServerStrain: "Running this process may take a long time and will put a heavy strain on the servers. Do you wish to continue?",
    Sample: "Sample",
    SampleRequest: "Sample Request",
    SampleResponse: "Sample Response",
    Save: "Save",
    Scope: "Scope",
    SearchResults: "Search Results",
    SecondsRemaining: "Seconds Remaining",
    Security: "Security",
    SelectPackageFile: "Select Package File",
    SendEmail: "Send Email",
    Separators: "Separators",
    ServiceName: "Service Name",
    Services: "Services",
    Server: "Server",
    SetBanner: "Set Banner",
    SetTextError: "Failed to display text (too large?).  Use &lsquo;helpers&rsquo; to download.",
    SetToFailed: "Set To Failed",
    Severity: "Severity",
    Show: "Show",
    ShowProcessesUsingFilter: "Show Processes Using Filter",
    ShowSVG: "Show SVG",
    Size: "Size",
    Skew: "Skew",
    SkewNegative: "Skew(-)",
    SkewPositive: "Skew(+)",
    SLA: "SLA",
    Slaves: "Slaves",
    SlaveLogs: "Slave Logs",
    SlaveNumber: "Slave Number",
    Smallest: "Smallest",
    SmallestFile: "Smallest File",
    SmallestSize: "Smallest Size",
    SOAP: "SOAP",
    SomeDescription: "Some*Description",
    somefile: "*::somefile*",
    Source: "Source",
    SourceCode: "Source Code",
    SourceLogicalFile: "Source Logical Name",
    SourcePath: "Source Path (Wildcard Enabled)",
    SourceProcess: "Source Process",
    SparkThor: "SparkThor",
    Spill: "Spill",
    SplitPrefix: "Split Prefix",
    Spray: "Spray",
    Start: "Start",
    Starting: "Starting",
    Started: "Started",
    State: "State",
    Status: "Status",
    Stats: "Stats",
    Stopped: "Stopped",
    Stopping: "Stopping",
    StorageInformation: "Storage Information",
    Subgraph: "Subgraph",
    Subgraphs: "Subgraphs",
    Submit: "Submit",
    Subtype: "Subtype",
    SuccessfullySaved: "Successfully Saved",
    Summary: "Summary",
    SummaryMessage: "Summary Message",
    Superfile: "Superfile",
    Superfiles: "Superfiles",
    SuperFile: "Super File",
    SuperFiles: "Super Files",
    SuperFilesBelongsTo: "Member of Superfile(s)",
    SuperfilesOnly: "Superfiles Only",
    SuperOwner: "Super Owner",
    Suspend: "Suspend",
    Suspended: "Suspended",
    SuspendedBy: "Suspended By",
    SuspendedByCluster: "Suspended By Cluster",
    SuspendedByUser: "Suspended By User",
    SuspendedReason: "Suspended Reason",
    SVGSource: "SVG Source",
    SyncSelection: "Sync To Selection",
    SystemServers: "System Servers",
    tag: "tag",
    Target: "Target",
    Targets: "Targets",
    TargetClusters: "Target Clusters",
    TargetName: "Target Name",
    TargetNamePlaceholder: "some::logical::name",
    TargetRowTagRequired: "You must supply a target row tag",
    TargetScope: "Target Scope",
    TargetWuid: "Target/Wuid",
    Terminators: "Terminators",
    TestPages: "Test Pages",
    TheReturnedResults: "The returned results",
    ThorNetworkAddress: "Thor Network Address",
    ThorMasterAddress: "Thor Master Address",
    ThorProcess: "Thor Process",
    Table: "Table",
    Time: "Time",
    TimeStamp: "Time Stamp",
    TimeSeconds: "Time (Seconds)",
    TimeStarted: "Time Started",
    TimeStopped: "Time Stopped",
    Timers: "Timers",
    Timings: "Timings",
    TimingsMap: "Timings Map",
    title_Activity: "Activity",
    title_ActivePermissions: "Active Permissions",
    title_ActiveGroupPermissions: "Active Group Permissions",
    title_AvailablePermissions: "Available Permissions",
    title_AvailableGroupPermissions: "Available Group Permissions",
    title_BindingConfiguration: "Binding Configuration",
    title_BindingDefinition: "Binding Definition",
    title_ClusterInfo: "Groups",
    title_CodeGeneratorPermissions: "Code Generator Permissions",
    title_DirectoriesFor: "Directories for",
    title_Definitions: "Definitions",
    title_DefinitionExplorer: "Definition Explorer",
    title_DESDL: "Dynamic ESDL",
    title_DFUQuery: "Logical Files",
    title_DFUWUDetails: "DFU Workunit",
    title_DiskUsage: "Disk Usage",
    title_ECLPlayground: "ECL Playground",
    title_ErrorsWarnings: "Errors/Warnings for",
    title_EventScheduleWorkunit: "Event Scheduler",
    title_FileScopeDefaultPermissions: "Default permissions of files",
    title_FilesPendingCopy: "Files pending copy",
    title_FoundFilesFor: "Found files for",
    title_GetDFUWorkunits: "DFU Workunits",
    title_Graph: "Graph",
    title_GraphPage: "title",
    title_Graphs: "Graphs",
    title_GridDetails: "Change Me",
    title_HPCCPlatformECL: "ECL Watch - Home",
    title_HPCCPlatformFiles: "ECL Watch - Files",
    title_HPCCPlatformMain: "ECL Watch - Home",
    title_HPCCPlatformOps: "ECL Watch - Operations",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Watch - Plugins",
    title_History: "History",
    title_Inputs: "Inputs",
    title_Log: "Log File",
    title_LFDetails: "Logical File Details",
    title_LZBrowse: "Landing Zones",
    title_Methods: "Methods",
    title_MemberOf: "Member Of",
    title_Members: "Members",
    title_LostFilesFor: "Lost files for",
    title_LibrariesUsed: "Libraries Used",
    title_OrphanFilesFor: "Orphan files for",
    title_Permissions: "Permissions",
    title_QuerySetDetails: "Query Details",
    title_QuerySetErrors: "Errors",
    title_QuerySetLogicalFiles: "Logical Files",
    title_QuerySetQuery: "Queries",
    title_QuerySetSuperFiles: "Super Files",
    title_QueryTest: "Super Files",
    title_Result: "Activity",
    title_Results: "Outputs",
    title_PackageParts: "Package Parts",
    title_PreflightResults: "Preflight Results",
    title_SearchResults: "Search Results",
    title_SourceFiles: "",
    title_Topology: "Topology",
    title_TpThorStatus: "Thor Status",
    title_UserQuery: "Permissions",
    title_UserPermissions: "User Permissions",
    title_WUDetails: "ECL Workunit Details",
    title_WorkunitScopeDefaultPermissions: "Default permissions of workunits",
    title_WUQuery: "ECL Workunits",
    To: "To",
    ToDate: "To Date",
    Toenablegraphviews: "To enable graph views, please install the Graph View Control plugin",
    Tooltip: "Tooltip",
    TooManyFiles: "Too many files",
    Top: "Top",
    Topology: "Topology",
    ToSizes: "To Sizes",
    Total: "Total",
    TotalParts: "Total Parts",
    TotalSize: "Total Size",
    TotalClusterTime: "Total Cluster Time",
    TransitionGuide: "Transition Guide",
    Text: "Text",
    Tree: "Tree",
    Type: "Type",
    Unbound: "unbound",
    undefined: "undefined",
    Unknown: "Unknown",
    Unlock: "Unlock",
    Unprotect: "Unprotect",
    UnsupportedIE9FF: "Unsupported (IE <= 9, FireFox)",
    Unsuspend: "Unsuspend",
    Unsuspended: "Unsuspended",
    Up: "Up",
    UpdateCloneFrom: "Update Clone From",
    UpdateDFs: "Update DFS",
    UpdateSuperFiles: "Update Super Files",
    Upload: "Upload",
    UpTime: "Up Time",
    URL: "URL",
    Usage: "Usage",
    Used: "Used",
    User: "User",
    UserDetails: "User Details",
    UserID: "User ID",
    UserLogin: "Please log in using your username only",
    Username: "Username",
    UserName: "User Name",
    UserPermissions: "User Permissions",
    Users: "Users",
    UseSingleConnection: "Use Single Connection",
    Validate: "Validate",
    ValidateActivePackageMap: "Validate Active Package Map",
    ValidatePackageContent: "Validate Package Content",
    ValidatePackageMap: "Validate Package Map",
    ValidateResult: "=====Validate Result=====\n\n",
    ValidateResultHere: "(Validation result)",
    Value: "Value",
    Variable: "Variable",
    Variables: "Variables",
    VariableBigendian: "Variable Big-endian",
    VariableSourceType: "Source Type",
    Version: "Version",
    ViewByScope: "View By Scope",
    Views: "Views",
    ViewSparkClusterInfo: "View Spark Cluster Information",
    Visualize: "Visualize",
    Warning: "Warning",
    Warnings: "Warning(s)",
    WarnIfCPUUsageIsOver: "Warn if CPU usage is over",
    WarnIfAvailableMemoryIsUnder: "Warn if available memory is under",
    WarnIfAvailableDiskSpaceIsUnder: "Warn if available disk space is under",
    WarnOldGraphControl: "Warning:  Old Graph Control",
    What: "What",
    Where: "Where",
    Who: "Who",
    Width: "Width",
    Workflows: "Workflows",
    Workunit: "Workunit",
    Workunits: "Workunits",
    WorkUnitScopeDefaultPermissions: "Workunit Scope Default Permissions",
    Wrap: "Wrap",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid Cannot Be Empty.",
    WUSnapShot: "WU Snap Shot",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "XRef",
    Year: "Year",
    YouAreAboutToBeLoggedOut: "You are about to be logged out",
    YouAreAboutToRemoveUserFrom: "You are about to remove a user(s) from this group. Do you wish to continue?",
    YouAreAboutToDeleteBinding: "You are about to delete this binding. Are you sure you want to do this?",
    YouAreAboutToDeleteDefinition: "You are about to delete this definition. Are you sure you want to do this?",
    YouAreAboutToDeleteThisFile: "You are about to delete this file. Are you sure you want to do this?",
    YouAreAboutToDeleteThisPart: "You are about to delete this part(s). Are you sure you want to do this?",
    YouAreAboutToDeleteThisQueryset: "You are about to delete this query set. Are you sure you want to do this?",
    YouAreAboutToDeleteThisWorkunit: "You are about to delete this workunit. Are you sure you want to do this?",
    YourBrowserMayNotSupport: "Your browser may not support file(s) of this size",
    YourScreenWasLocked: "Your screen was locked by ESP. Please re-fetch your data, as it may be stale.",
    ZAP: "Z.A.P",
    ZeroLogicalFilesCheckFilter: "Zero Logical Files(check filter)",
    Zip: "Zip",
    ZippedAnalysisPackage: "Zipped Analysis Package",
    Zoom: "Zoom",
    ZoomPlus: "Zoom +",
    ZoomMinus: "Zoom -",
    Zoom100Pct: "Zoom 100%",
    ZoomAll: "Zoom All",
    ZoomWidth: "Zoom Width"
}),
"bs": true,
"es": true,
"hu": true,
"hr": true,
"pt-br": true,
"sr": true,
"zh": true
});


/***/ }),

/***/ "./eclwatch/nls/hr/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/hr/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

﻿!(module.exports = {
    Abort: "Prekinite",
    AbortedBy: "Prekinuto od strane",
    AbortedTime: "Vrijeme prekida",
    About: "O Aplikaciji",
    AboutGraphControl: "O Grafičkoj Kontroli",
    AboutHPCCSystems: "O tvrtki HPCC Systems®",
    AboutHPCCSystemsGraphControl: "O Grafičkoj Kontroli HPCC Sistema",
    AboutToLoseSessionInformation: "Odjavit ćete se i izgubit ćete sve informacije o sesiji. Želite li nastaviti?",
    Account: "Račun",
    Action: "Akcija",
    Activate: "Aktivirajte",
    Activated: "Aktiviran",
    ActivateQuery: "Aktivirajte Upit",
    ActivateQueryDeletePrevious: "Aktivirajte upit, izbrišite prethodni",
    ActivateQuerySuspendPrevious: "Aktivirajte upit, obustavite prethodni",
    Active: "Aktivan",
    ActivePackageMap: "Aktivna Mapa Paketa",
    ActiveWorkunit: "Aktivna Radna Jedinica",
    Activities: "Aktivnosti",
    Activity: "Aktivnost",
    ActivityMap: "Mapa Aktivnosti",
    ActualSize: "Tačna Veličina",
    Add: "Dodajte",
    AddAttributes: "Dodajte atribute/vrijednosti vašem metodu",
    AddAttributes2: "Dodajte Atribut(e)",
    AddBinding: "Dodajte Vezivanje",
    AddFile: "Dodajte Datoteku",
    AddGroup: "Dodajte Grupu",
    AdditionalResources: "Dodatni Resursi",
    AddPart: "Dodajte Dio",
    AddProcessMap: "Dodajte Mapu Paketa",
    AddTheseFilesToDali: "Dodajte Te Datoteke Na Dali",
    AddtionalProcessesToFilter: "Dodatni Procesi Za Filtriranje",
    AddToExistingSuperfile: "Dodajte na postojeći superfile",
    AddToSuperfile: "Dodajte na Superdatoteku",
    AddUser: "Dodajte Korisnika",
    Advanced: "Višeg Nivoa",
    All: "Svi",
    AllowAccess: "<center>Dozvolite<br>Pristup</center>",
    AllowForeignFiles: "Dozvolite Korištenje  Datoteka Sa Drugih Klastera",
    AllowFull: "<center>Dozvolite<br>Potpun</center>",
    AllowRead: "<center>Dozvolite<br>Čitanje</center>",
    AllowWrite: "<center>Dozvolite<br>Pisanje</center>",
    AllQueuedItemsCleared: "Svi poslovi iz reda čekanja su očišćeni. Trenutno aktivni posao nastavnja sa izvršavanjem.",
    ANY: "Bilo Koji",
    AnyAdditionalProcessesToFilter: "Ima li još procesa za filtriranje",
    Append: "Dodajte",
    AppendCluster: "Dodajte Klaster",
    Apply: "Primjenite",
    ArchivedOnly: "Samo Arhiviran",
    ArchivedWarning: "Upozorenje: koristite kratak vremenski period. Ako koristite duži vremenski period, pretraživanje radnih jedinica može trajati duže od dozviljenog vremena za pretraživanje .",
    Attach: "Prikačite",
    Attribute: "Atribut",
    AttributesAreRequired: "Atributi su potrebni",
    AutoRefresh: "Osvježi",
    AutoRefreshEvery: "Automatsko osvježivanje svakih x minuta",
    AutoRefreshIncrement: "Automatski korak osvježivanja",
    Back: "Natrag",
    BannerColor: "Boja Reklamnog Bloka",
    BannerMessage: "Poruka za Reklamni Blok",
    BannerScroll: "Kretanje Reklamnog Bloka",
    BannerSize: "Veličina Reklamnog Bloka",
    BinaryInstalls: "Binarne Instalacije",
    Bind: "Vežite",
    Binding: "Vezivanje",
    BindingDeleted: "Vezivanje Obrisano",
    Blob: "BLOB",
    BlobPrefix: "BLOB Prefiks",
    Bottom: "Kraj",
    BoundBy: "ograničen sa:",
    Busy: "Zauzet",
    Cancel: "Poništite",
    CancelAll: "Ukinite Sve",
    CancelAllMessage: "Prekinite tekuće poslove i očistite red čekanja. Želite li nastaviti?",
    Chart: "Grafikon",
    CheckAllNodes: "Provjerite Sve Nodove/Čvorove",
    CheckFilePermissions: "Provjerite Dozvole za Pristup Datoteci",
    CheckSingleNode: "Provjerite Jedan Nod/Čvor",
    Clear: "Očistite",
    ClearPermissionsCache: "Izbrišite Zapamćene Dozvole Za Pristup",
    ClearPermissionsCacheConfirm: "Da li ste sigurni da želite da izbrišete zapamćene dozvole za pristup na DALI i ESP? To može značajno usporiti izvršavanje radnih jedinica.",
    Clone: "Klonirajte",
    ClonedWUID: "Klonirani WUID",
    CloneTooltip: "Kopirajte Radnu Jedinicu",
    Close: "Zatvorite",
    Cluster: "Klaster",
    ClusterName: "Ime Klastera",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Procesi Na Klasteru",
    Code: "Kod",
    CodeGenerator: "Kod Generator",
    Col: "Kolona",
    CollapseAll: "Suzite sve",
    Command: "Komanda",
    Comment: "Komentar",
    Compiled: "Kompajlirano",
    Compiling: "U procesu kompajliranja",
    Completed: "Kompletiran",
    ComplexityWarning: "Više od praga {threshold} aktivnosti ({activityCount}) - prekinite prikaz podataka?",
    Component: "Komponenta",
    Compress: "Sabijte",
    Compressed: "Komprimirani",
    CompressedFileSize: "Komprimirana Veličina Datoteke",
    Condition: "Uslov",
    Configuration: "Konfiguracija",
    ConfigureService: "Servis za Konfiguraciju",
    ConfirmPassword: "Potvrdite Lozinku",
    ConfirmRemoval: "Jeste li sigurni da to želite učiniti?",
    ContactAdmin: "Ako želite promijeniti naziv ove grupe, kontaktirajte administratora LDAP.",
    Content: "Sadržaj",
    Contents: "Sadržaji",
    ContentType: "Vrsta Sadržaja",
    ContinueWorking: "Nastavite sa radom",
    Copy: "Kopirajte",
    CopyToClipboard: "Kopirajte u međuspremnik",
    Count: "Izbrojte",
    CreateANewFile: "Kreirajte novi superfile",
    Created: "Proizveden",
    CreatedBy: "Autor",
    CreatedTime: "Vrijeme Izrade",
    Creating: "U procesu stvaranja",
    Critical: "Kritično",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "Dali IP Adresa",
    dataset: ":=dataset*",
    Date: "Datum",
    Day: "Dan",
    Deactivate: "Isključite",
    Debug: "Otklonite Neispravnosti",
    DEF: "DEF",
    Defaults: "Unaprijed Definisane Vrijednosti",
    Definition: "Definicija",
    DefinitionDeleted: "Definicija je izbrisana",
    DefinitionID: "ID",
    Definitions: "Definicije",
    DelayedReplication: "Odgođena replikacija",
    Delete: "Obrišite",
    DeleteBinding: "Izbrišite Vezivanje",
    Deleted: "Obrisan",
    DeletedBinding: "Izbrisano Vezivanje",
    DeleteDirectories: "Eliminišite prazne direktirije. Želite li nastaviti?",
    DeleteEmptyDirectories: "Želite li izbrisati prazne direktorije?",
    DeletePrevious: "Izbrišite Prethodni",
    DeleteSelectedDefinitions: "Želite izbrisati izabrane definicije?",
    DeleteSelectedFiles: "Obrišite Odabrane Datoteke?",
    DeleteSelectedGroups: "Obrišite odabranu(e) grupu(e)?",
    DeleteSelectedPermissions: "Obrišite Odabrane Dozvole Za Pristup",
    DeleteSelectedQueries: "Obrišite Odabrane Zahtjeve?",
    DeleteSelectedUsers: "Obrišite Odabrane Korisnike?",
    DeleteSelectedWorkunits: "Obrišite Odabrane Radne Jedinice?",
    DeleteSuperfile: "Obrišite Superdatoteke?",
    DeleteSuperfile2: "Obrišite Super Datoteku",
    DeleteThisPackage: "Obrišite ovaj paket?",
    Delimited: "Razgraničen",
    DenyAccess: "<center>Zabranite<br>Pristup</center>",
    DenyFull: "<center>Zabranite<br>Potpun</center>",
    DenyRead: "<center>Zabranite<br>Čitanje</center>",
    DenyWrite: "<center>Zabranite<br>Pisanje</center>",
    Depth: "Dubina",
    DepthTooltip: "&lsquo;Najveća Dubina Podgrafa",
    Deschedule: "Izbacite Is Reda Za Izvršavanje",
    DescheduleSelectedWorkunits: "Izbacite Odabrane Radne Jedinice Is Reda Za Izvršavanje?",
    Description: "Opis",
    DESDL: "Dinamički ESDL",
    Despray: "Ponovo Objedinite Datoteku",
    Details: "Detalji",
    DFUServerName: "Ime DFU Servera",
    DFUWorkunit: "DFU RadnaJedinica",
    Directories: "Direktorije",
    Directory: "Direktorij",
    DisableScopeScanConfirm: "Da li ste sigurni da želite da onemogućite skaniranje opsega? Promjene će biti prihvaćene poslije restarta DALIja",
    DisableScopeScans: "Onemogućite Skaniranje Opsega",
    DiskUsage: "Iskorištenost Diska",
    Distance: "Razdaljina",
    DistanceTooltip: "Maksimalna Veličina Podgrafa Za Odabranu Aktivnost",
    Dll: "Dll",
    Documentation: "Dokumentacija",
    DoNotActivateQuery: "Nemojte aktivirati upit",
    DoNotRepublish: "Nemojte ponoviti upit?",
    DOT: "DOT",
    DOTAttributes: "DOT Atributi",
    Down: "Neaktivan",
    Download: "Dobavite",
    Downloads: "Preuzimanje",
    DownloadToCSV: "Preuzmite u CSV formatu",
    DropZone: "Zona Prijema",
    DueToInctivity: "Bit ćete odjavljeni iz svih ECL Watch sjednica za 3 minute zbog neaktivnosti.",
    Duration: "Trajanje",
    DynamicNoServicesFound: "Servisi Nisu Pronađeni",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "ECL Watch zahtijeva da kolačići budu omogućeni za nastavak",
    ECLWatchSessionManagement: "Upravljanje ECL Watchom",
    ECLWorkunit: "ECL RadnaJedinica",
    Edges: "Ivice",
    Edit: "Editujte",
    EditDOT: "Editujte DOT",
    EditGraphAttributes: "Editujte Atribute Grafova",
    EditXGMML: "Editujte XGMML",
    EmployeeID: "ID Zaposlenika",
    Empty: "(Prazan)",
    Enable: "Omogućite",
    EnableScopeScans: "Omogućite Skaniranje Opsega",
    EnableScopeScansConfirm: "Da li ste sigurni da želite da omogućite skaniranje opsega? Promjene će biti prihvaćene poslije restarta DALIja",
    EnglishQ: "Engleski?",
    EnterAPercentage: "Unesite procenat",
    EnterAPercentageOrMB: "Unesite Procenat ili MB",
    EraseHistory: "Brišite Povijest",
    EraseHistoryQ: "Brišite Povijest Za",
    Error: "Greška",
    Errorparsingserverresult: "Greška u analizi rezultata sa servera",
    Errors: "Greške",
    ErrorsStatus: "Greške/Stanje",
    ErrorUploadingFile: "Pogreška prilikom prenosa datoteke(a). Pokušajte provjeriti dozvole za prenos.",
    ErrorWarnings: "Greška/Upozorenja",
    Escape: "Eskejp",
    ESPBuildVersion: "ESP Trenutna Verzija",
    ESPNetworkAddress: "ESP Netvork Adresa",
    ESPProcessName: "Naziv ESP procesa",
    EventName: "Ime Događaja",
    EventNamePH: "imedogađaja",
    EventScheduler: "Raspoređivač Događaja",
    EventText: "Opis Događaja",
    EventTextPH: "Tekst O Događaju",
    Exception: "Neočekivani Problem",
    Executed: "Izvršeno",
    Executing: "U procesu izvršenja",
    ExpandAll: "Proširite sve",
    ExpireDays: "Istječe za (u danima)",
    Export: "Izvezite",
    ExportSelectionsToList: "Izvezite Odabrane Stvari u Listu",
    FailIfNoSourceFile: "Neuspjeh Ukoliko Datoteka Ne Postoji",
    Fatal: "Fatalan",
    Fetched: "Preuzet",
    FetchingData: "U Procesu Dobavljnja Podataka...",
    fetchingresults: "dobijeni resultati",
    File: "Datoteka",
    FileCluster: "Klaster Datoteka",
    FileCounts: "Broj Datoteka",
    FileName: "Ime Datoteke",
    FileParts: "Dio Datoteke",
    FilePath: "Lokacija Datoteke",
    FilePermission: "Dozvola Za Pristup Datoteci",
    Files: "Datoteke",
    FileScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor Datoteka",
    FileScopes: "Skop Datoteka",
    FileSize: "Veličina Datoteke",
    FilesNoPackage: "Datoteke koje ne pripadaju paketu",
    FilesPending: "Datoteke na čekanju",
    FilesWarning: "Broj vraćenih datoteka je preveliki. Vraćeno je samo prvih 100.000 datoteka sortiranih po datumu / vremenu. Ako želite ograničiti rezultate, podesite filter.",
    FilesWithUnknownSize: "Datoteke Sa Nepoznatim Veličinama",
    FileType: "Tip Datoteke",
    FileUploader: "Proces za premiještanje Datoteke na Server (Uploader)",
    FileUploadStillInProgress: "Učitavanje Datoteka je u Toku",
    Filter: "Filter",
    FilterSet: "Definisanje Filtera",
    Find: "Nađite",
    FindNext: "Nađite Slijedeći",
    FindPrevious: "Nađite Prethodni",
    Finished: "Završen",
    FirstN: "Prvih N",
    FirstName: "Ime",
    FirstNRows: "Prvih N Redova",
    Fixed: "Fiksni",
    Folder: "Fascikla",
    Format: "Format",
    Forums: "Forumi",
    Forward: "Naprijed",
    FoundFile: "Datoteka je Pronađena",
    FoundFileMessage: "Pronađena datoteka ima sve svoje dijelove na disku, ali dijelovi nisu poznati Dali serveru. Svi dijelovi datoteke mogu biti dodani natrag na Dali server. Dijelovi mogu biti I obrisani sa klastera ako je to neophodno..",
    FromDate: "Od Datuma",
    FromSizes: "Od Veličine",
    FromTime: "Od Vremena",
    FullName: "Ime i Prezime",
    Generate: "Generirajte",
    GetPart: "Dobavite Dio",
    GetSoftwareInformation: "Želite li dobiti informacije o softveru",
    Graph: "Graf",
    GraphControl: "Kontrola Grafikona",
    Graphs: "Grafikoni",
    GraphView: "Slika Grafikona",
    Group: "Grupa",
    GroupBy: "Grupišite Po",
    GroupDetails: "Detalji o Grupi",
    Grouping: "Grupisanje",
    GroupName: "Naziv Grupe",
    GroupPermissions: "Dozvole za Pristup Grupe",
    Groups: "Grupe",
    GZip: "GZip",
    help: "Ovdje je prikazan grafikon izvršavanja ove radne jedinice. Veličina i nijansa ukazuju na vrijeme izvršavanja svakog grafikona (Veći i tamniji grafikon uzima veći procenat cjelokupnog vremena izvrštavanja.)",
    Helper: "Pomoćnik",
    Helpers: "Pomagači",
    Hex: "Baza16",
    HideSpills: "Sakrijte Upotrebu Diska",
    High: "Visok",
    History: "Istorija",
    HPCCSystems: "HPCC Systems®",
    Icon: "Ikona",
    ID: "Identifikator",
    Inactive: "Neaktivan",
    IncludeSlaveLogs: "Uključite Izvještaje Sa Nodova Izvršilaca",
    Index: "Indeks",
    Info: "Informacija",
    InfoDialog: "Dijalog Informacije",
    InheritedPermissions: "Naslijeđene Dozvole",
    Inputs: "Unosi",
    InvalidResponse: "(Neispravan Odgovor)",
    InvalidUsernamePassword: "Nevažeće korisničko ime ili zaporka, pokušajte ponovo.",
    IP: "IP",
    IPAddress: "IP Adresa",
    IsCompressed: "Je li Komprimiran",
    IsLibrary: "Jeli Biblioteka",
    IsReplicated: "Repliciran",
    IssueReporting: "Izvještavanje o Problemima",
    JobName: "Naziv Radne Jedinice",
    Jobname: "Nazivradnejedinice",
    jsmi: "jsmi*",
    JSmith: "JSmit*",
    JSON: "JSON",
    KeyFile: "Indeksirana Datoteka",
    Label: "Etiketa",
    LandingZone: "Zona za Pretovar",
    LandingZones: "Zone za Pretovar",
    LanguageFiles: "Datoteke O Jeziku",
    Largest: "Najveći",
    LargestFile: "Najveća Datoteka",
    LargestSize: "Najveća veličina",
    LastEdit: "Posljednja Izmjena",
    LastEditedBy: "Autor Zadnje Izmjene",
    LastEditTime: "Vrijeme Posljednje Izmjene",
    LastMessage: "Zadnja Poruka",
    LastName: "Prezime",
    LastNDays: "Poslijednjih N Dana",
    LastNHours: "Posljednjih N Sati",
    LastNRows: "Posljednjih N Redova",
    LastRun: "Zadnji Ran",
    LDAPWarning: "<b>Greška LDAP Servica:</b>  &lsquo;Previše korisnika&rsquo; - Molimo koristite filter.",
    LearnMore: "Naučite više",
    LegacyForm: "Stari Prevaziđeni Formular",
    Legend: "Legenda",
    LibrariesUsed: "Biblioteke u Korištenju",
    LibraryName: "Ime Biblioteke",
    Line: "Linija",
    LineTerminators: "Krajevi Linija",
    Links: "Linkovi",
    Loading: "Učitavanje...",
    LoadingCachedLayout: "Učitavanje Keširane Strukture (Cached Layout)...",
    LoadingData: "Učitavanje Podataka...",
    loadingMessage: "...Učitavanje...",
    LoadPackageContentHere: "(Dobavite ovamo sadržaj paketa)",
    LoadPackageFromFile: "Dobavite Paket iz Datoteke",
    Local: "Lokalni",
    LocalFileSystemsOnly: "Samo Lokalni File Sistemi",
    Location: "Lokacija",
    Lock: "Zaključaj",
    Log: "Dnevnik (Log)",
    log_analysis_1: "log_analysis_1*",
    LogFile: "Datoteka Aktivnosti",
    LoggedInAs: "Prijavljen kao",
    LoggingOut: "Odjavljivanje",
    LogicalFile: "Logička Datoteka",
    LogicalFiles: "Logičke Datoteke",
    LogicalFilesAndSuperfiles: "Logičke Datoteke i Superdatoteke",
    LogicalFilesOnly: "Samo Logičke Datoteke",
    LogicalFileType: "Tip Logičke Datoteke",
    LogicalName: "Ime Logičke Datoteke",
    Login: "Prijavljivanje",
    Logout: "Odjavite se",
    Logs: "Dnevnici",
    LogVisualization: "Registrujte Vizuelizaciju",
    LogVisualizationUnconfigured: "Vizualizacija logotipa nije konfigurirana, provjerite kako je konfiguriran upravitelj konfiguracije",
    LostFile: "Izgubljena Datoteka",
    LostFile2: "Izgubljene Datoteke",
    LostFileMessage: "Logička datoteka kojoj nedostaje bar jedan dio ili na primarnoj ili na repliciranoj lokaciji na disku.  Logička datoteka je još uvijek pod kontrolom Dali servera. Brisanje datoteke uklanja kontrolu Dali servera nad datotekom kao i nad svim preostalim dijelovima datoteke na disku.",
    Low: "Nizak",
    MachineInformation: "Informacija o Mašini",
    Machines: "Mašine",
    Major: "Glavni",
    ManagedBy: "Upravljan",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Pritisnite Ctrl+C",
    ManualOverviewSelection: "Nophodno Je Selektirati Pregled",
    ManualTreeSelection: "Nophodno Je Selektirati Drvo",
    Mappings: "Mapiranja",
    Mask: "Maska",
    Max: "Maksimum",
    MaximumNumberOfSlaves: "Maksimalan Broj Izvršilaca",
    MaxNode: "Maksimalni Nod/čvor",
    MaxRecordLength: "Maksimalna Dužina Rekorda",
    MaxSize: "Maksimalna Veličina",
    MaxSkew: "Maksimalni Skju (Distorzija)",
    MemberOf: "Član Od",
    Members: "Članovi",
    Message: "Poruke",
    MethodConfiguration: "Konfiguracija metode",
    Methods: "Metodi",
    Min: "Minimum",
    Mine: "Moj",
    MinNode: "Minimalni Nod/čvor",
    Minor: "Minoran",
    MinSize: "Minimalna Veličina",
    MinSkew: "Minimalni Skju (Distorzija)",
    Missing: "Nedostaje",
    MixedNodeStates: "Svi Nodovi Nemaju Isti Status ",
    Modification: "Promijena",
    Modified: "Modifikovan",
    ModifiedUTCGMT: "Promijenjen (UTC/GMT)",
    Modify: "Promijeni",
    MonitorEventName: "Nadgledajte Ime Događaja",
    Monitoring: "Nadgledanje",
    MonitorShotLimit: "Nadgledajte Shot Limit",
    MonitorSub: "Nadgledajte Sub",
    Month: "Mjesec",
    More: "Nastavite",
    MustContainUppercaseAndSymbol: "Mora uključiti veliko slovo i simbol",
    NA: "N/A",
    Name: "Ime",
    NamePrefix: "Prefiks Imena",
    NamePrefixPlaceholder: "some::prefix",
    Newest: "Najnoviji",
    NewPassword: "Nova Lozinka",
    NoContent: "(Bez sadržaja)",
    noDataMessage: "...Nema Redova...",
    Node: "Čvor (Node)",
    NodeGroup: "Grupa Čvorova",
    NoErrorFound: "Bez nađenih grešaka\n",
    NoFilterCriteriaSpecified: "Kriterij za filtriranje nije specificiran.",
    None: "Nijedan",
    NoPublishedSize: "nema objavljene veličina",
    Normal: "Normalan",
    NoScheduledEvents: "Nema Definisanih Događaja na Rasporedu.",
    NoSplit: "Nema Podijela (Split)",
    NotActive: "Nije Aktivan",
    NothingSelected: "Ništa Nije Izabrano...",
    NotInSuperfiles: "Nije Dio Superdatoteke",
    NotSuspendedbyUser: "Nije Suspendovan Od Strane Korisnika",
    NoWarningFound: "Poruke Upozorenja (warnings) nisu nađene\n",
    NumberofParts: "Broj Dijelova",
    NumberofSlaves: "Broj Izvršilaca",
    OK: "OK",
    Oldest: "Najstariji",
    OldPassword: "Stara Lozinka",
    OmitSeparator: "Izostavite Separator",
    Only1PackageFileAllowed: "Dozvoljen je samo jedan paket",
    Open: "Otvoren",
    OpenInNewPage: "Otvorite na Novoj Stranici",
    OpenInNewPageNoFrame: "Otvorite na Novoj Stranici",
    OpenLegacyECLWatch: "Otvorite Stari Prevaziđeni ECL Watch",
    OpenLegacyMode: "Otvorite Zastarjeli Mod",
    OpenNativeMode: "Otvorite Normalni Mod",
    OpenSafeMode: "Otvorite (sigurni mod)",
    OpenSource: "Otvoreni Kod",
    OpenTreeMode: "Otvorite (kao stablo)",
    Operation: "Operacija",
    Operations: "Operacije",
    Options: "Opcije",
    OriginalFile: "Originalna datoteka",
    OrphanFile: "Nepotrebne Datoteke",
    OrphanFile2: "Nepotrebna Datoteka",
    OrphanMessage: "Nepotrebna datoteka ima neke dijelove na disku. Ali ne postoje svi dijelovi datoteke na disku da bi se mogla kreirati kompletna logicka datoteka. Ne postoji referenca na te dijelove datoteke sa Dali servera.",
    Outputs: "Izlazi",
    Overview: "Pregled",
    Overwrite: "Prepišite",
    OverwriteMessage: "Neke Datoteke već postoje. Da biste nastavili morate dozviliti pisanje preko postojećih datoteka ",
    Owner: "Vlasnik",
    PackageContent: "Sadržaj Paketa",
    PackageContentNotSet: "Sadržaj Paketa nije definisan",
    PackageMap: "Mapa Paketa",
    PackageMaps: "Mape Paketa",
    PackagesNoQuery: "Paketi za koje nisu definisani upiti (queries)",
    ParameterXML: "Parametar XML",
    Part: "Dio",
    PartMask: "Dio Maske",
    PartName: "Naziv Dijela",
    Parts: "Dijelovi",
    PartsFound: "Dijelovi Su Pronađeni",
    PartsLost: "Dijelovi Su Izgubljeni",
    Password: "Lozinka",
    PasswordExpiration: "Lozinka Istiće",
    PasswordExpired: "Vaša lozinka je istekla I mora biti promijenjena",
    PasswordExpirePostfix: "dan(a). Želite li je sada promijeniti?",
    PasswordExpirePrefix: "Vaša lozinka će isteći za",
    PasswordOpenZAP: "Unesite Lozinku Za ZAP (neobavezno)",
    PasswordsDoNotMatch: "Pogrešna Lozinka.",
    Path: "Put",
    PathMask: "Maska za Put",
    Pause: "Pauza",
    PauseNow: "Zaustavite Odmah",
    PctComplete: "% Kompletiran",
    PercentCompressed: "Procenat Kompresije",
    PercentDone: "Procenat Završen",
    PerformingLayout: "Izvršava Layout...",
    Permission: "Dozvola",
    PermissionName: "Naziv Dozvole Za Pristup",
    Permissions: "Dozvole za Pristup",
    PhysicalFiles: "Fizičke Datoteke",
    PlaceholderFindText: "Wuid, Korisnik, Dalje...",
    PlaceholderFirstName: "Jovan",
    PlaceholderLastName: "Smit",
    Playground: "Igralište",
    PleaseEnableCookies: "ECL Watch zahtijeva da kolačići budu omogućeni za nastavak.",
    PleaseEnterANumber: "Unestite Broj 1 -",
    PleaseLogin: "Molimo prijavite se koristeći svoje korisničko ime i lozinku",
    PleaseLogIntoECLWatch: "Prijavite se na ECL Watch",
    PleasePickADefinition: "Izaberite Definiciju",
    PleaseSelectADynamicESDLService: "Izaberite Dinamički ESDL Servis",
    PleaseSelectAGroupToAddUser: "Izaberite grupu u koju želite da dodate ovog korisnika",
    PleaseSelectAServiceToBind: "Izaberite Servis za Upotrebu",
    PleaseSelectATopologyItem: "Izaberite ciljnu platformu, servis ili mašinu.",
    PleaseSelectAUserOrGroup: "Izaberite Korisnika ili Grupu zajedno sa Imenom Datoteke",
    PleaseSelectAUserToAdd: "Izaberite korisnika koga  želite da dodate",
    Plugins: "Dodatci",
    Port: "Port",
    Prefix: "Prefiks",
    PrefixPlaceholder: "filename{:length}, filesize{:[B|L][1-8]}",
    Preflight: "Provjera prije isporuke",
    PreloadAllPackages: "Učitajte sve pakete",
    PreserveCompression: "Sačuvajte Kompresiju",
    Preview: "Pregled",
    PrimaryLost: "Primarni Je Izgubljen",
    PrimaryMonitoring: "Primarni Nadzor",
    Priority: "Prioritet",
    Process: "Proces",
    Processes: "Procesi",
    ProcessFilter: "Process&nbsp;Filter",
    ProcessorInformation: "Informacija o Procesoru",
    ProgressMessage: "Poruka o Progresu",
    Properties: "Svojstva",
    Property: "Svojstvo",
    Protect: "Zaštitite",
    Protected: "Zašticen",
    Publish: "Objavite",
    Published: "Objavljen",
    PublishedBy: "Objavljivač",
    PublishedByMe: "Moji Objavljeni Servisi",
    PublishedQueries: "Objavljeni Upiti",
    PushEvent: "Puš Događaj",
    Quarter: "Četvrtina",
    Queries: "Upiti",
    QueriesNoPackage: "Upiti bez odgovarajućeg paketa",
    Query: "Upit",
    QueryDetailsfor: "Detalji o Upitu",
    QueryID: "Identifikator Upita",
    QueryIDPlaceholder: "som?q*ry.1",
    QueryName: "Naziv Upita",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Kolekcija Upita",
    Queue: "Red (Queue)",
    Quote: "Citat",
    QuotedTerminator: "Završni Karakter",
    RawTextPage: "Neobrađen Tekst (Tekuća Stranica)",
    Ready: "Spreman",
    ReallyWantToRemove: "Zaista želite ukloniti?",
    ReAuthenticate: "Ponovo se prijavite koristeći svoje korisničko ime i lozinku",
    RecordCount: "Broj Rekorda",
    RecordLength: "Dužina Rekorda",
    Records: "Rekordi",
    RecordSize: "Veličina Rekorda",
    RecordStructurePresent: "Struktura Rekorda Postoji",
    Recover: "Vratite Natrag",
    RecoverTooltip: "Pokrenite zaustavljenu radnu jedinicu",
    RecreateQuery: "Ponovo kreirajte upit",
    Recycling: "Recikliranje",
    RedBook: "Crvena Knjiga",
    Refresh: "Osviježite",
    ReleaseNotes: "Napomena o Izdanju",
    Reload: "Ponovo Učitajte",
    Remaining: "Preostali",
    RemoteCopy: "Kopija sa udaljenog servera",
    RemoteDali: "Daleki Dali",
    RemoteDaliIP: "Daleki&nbsp;Dali&nbsp;IP&nbsp;Adresa",
    Remove: "Uklonite",
    RemoveAttributeQ: "Izabrani atribut će biti uklonjen. Da li ste sigurni da to želite?",
    RemoveAtttributes: "Uklonite Atribut(e)",
    RemovePart: "Uklonite Dio",
    RemoveSubfiles: "Uklonite Pod-Datoteku",
    RemoveSubfiles2: "Da li želite ukloniti subfajl(ove)?",
    RemoveUser: "Uklonite Korisnika",
    Rename: "Preimenujte",
    RenderedSVG: "Donesene SVG",
    RenderSVG: "Donesite SVG",
    Replicate: "Replicirajte",
    ReplicatedLost: "Izgubljene Replikacije",
    ReplicateOffset: "Replicirajte Ofset",
    ReportAnError: "Prijavite grešku",
    ReportError: "Prijavite grešku",
    RepresentsASubset: "Predstavlja podskup od ukupnog broja uparenih rezultata .Promjena filtera može smanjiti broj uparenih rezultata",
    RequestSchema: "Shema Zahtjeva",
    RequiredForXML: "Potrebno za distribuciju XML",
    Reschedule: "Ponovo Stavite Na Raspored",
    Reset: "Resetujte",
    ResetThisQuery: "Resetujte Tekući Upit",
    ResetViewToSelection: "Resetujte Odabrani Prikaz",
    Resource: "Resurs",
    Resources: "Resursi",
    ResponseSchema: "Shema Odgovora",
    Restart: "Ponovo Pokrenite",
    Restarted: "Ponovo Pokternut",
    Restore: "Vratite na Staro Stanje",
    Resubmit: "Ponovo Podnesite",
    Resubmitted: "Ponovo Poslat",
    ResubmitTooltip: "Reaktivirajte ovu radnu jedinicu",
    Results: "Rezultat(i)",
    Resume: "Nastavite",
    RetainSuperfileStructure: "Zadržite Strukturu Superdatoteke",
    RetypePassword: "Ponovite Lozinku",
    Reverse: "Idite Unazad",
    RowPath: "Put Do Rekorda",
    Rows: "Redovi",
    RowTag: "Etiketa Reda",
    RoxieCluster: "Roxie Klaster",
    RoxieFileCopy: "Status Kopiranja Roxie Datoteka",
    RunningServerStrain: "Izvršavanje ovog procesa može potrajati dugo vremena i veoma optereti servere. Da li želite nastaviti?",
    Sample: "Primjer",
    SampleRequest: "Primjer Zahtjeva",
    SampleResponse: "Primjer Odgovora",
    Save: "Sačuvajte",
    Scope: "Područje",
    SearchResults: "Rezultati Pretraživanja",
    SecondsRemaining: "Preostalo Sekundi",
    Security: "Sigurnost",
    SelectPackageFile: "Izaberi Paket",
    Separators: "Seperatori",
    Server: "Server",
    ServiceName: "Ime Servisa",
    Services: "Servisi",
    SetBanner: "Postavite Zastavicu",
    SetTextError: "Neuspješno prikazivanje teksta (da li je tekst predug?). Koristite &lsquo;pomagače&rsquo; za preuzimanje datoteka.",
    SetToFailed: "Postavite Na Neuspješan",
    Severity: "Ozbiljnost",
    Show: "Pokažite",
    ShowProcessesUsingFilter: "Prikažite procese koristeći filter",
    ShowSVG: "Pokažite SVG",
    Size: "Veličina",
    Skew: "Skju (Skew)",
    SkewNegative: "Skju(-)",
    SkewPositive: "Skju(+)",
    SLA: "SLA",
    SlaveLogs: "Izvjestaji Izvršilaca",
    SlaveNumber: "Broj Izvršilaca",
    Slaves: "Robovi (Slaves)",
    Smallest: "Najmanji",
    SmallestFile: "Najmanja Datoteka",
    SmallestSize: "Najmanja Veličina",
    SOAP: "SOAP",
    SomeDescription: "Neki*Opis",
    somefile: "*::nekifile*",
    Source: "Izvorna Verzija",
    SourceCode: "Izvorna Verzija Koda",
    SourceLogicalFile: "Ime Izvorne Datoteke",
    SourcePath: "Izvorna Verzija Puta (sa omogucenim *)",
    SourceProcess: "Izvorni Proces",
    Spill: "Zapis na Disk",
    SplitPrefix: "Split Prefiks",
    Spray: "Razbacajte (Spray)",
    Start: "Počnite",
    Started: "Počeo",
    Starting: "Polazak",
    State: "Stanje",
    Stats: "Statistike",
    Status: "Status",
    Stopped: "Zaustavljen",
    Stopping: "Zaustavljanje",
    StorageInformation: "Informacija o prostoru",
    Subgraph: "Pod-Graf",
    Subgraphs: "Podgrafikon",
    Submit: "Podnesite",
    Subtype: "Pod-Vrsta",
    SuccessfullySaved: "Uspješno Spremljen",
    Summary: "Kratak Pregled",
    SummaryMessage: "Sažeta Poruka",
    SuperFile: "Super Datoteka",
    Superfile: "Super Datoteka",
    SuperFiles: "Super Datoteke",
    Superfiles: "SuperDatoteke",
    SuperFilesBelongsTo: "Pripadnik Superdatoteke",
    SuperfilesOnly: "Samo Superdatoteke",
    SuperOwner: "Super Vlasnik",
    Suspend: "Suspendujte",
    Suspended: "Suspendovan",
    SuspendedBy: "Suspendovan Od",
    SuspendedByCluster: "Suspendovan od strane klastera",
    SuspendedByUser: "Suspendovan Od Strane Korisnika",
    SuspendedReason: "Razlog za Suspendovanje",
    SVGSource: "SVG Izvor",
    SyncSelection: "Sinhronizujte Sa Odabranim",
    SystemServers: "Sistem Servera",
    Table: "Tabela",
    tag: "tag",
    Target: "Cilj",
    TargetClusters: "Ciljni Klasteri",
    TargetName: "Naziv Cilja",
    TargetNamePlaceholder: "neko::logicko::ime",
    TargetRowTagRequired: "Morate označiti ciljni red u tabeli",
    Targets: "Ciljne Platforme",
    TargetScope: "Ciljni Opseg",
    TargetWuid: "Cilj/Wuid",
    Terminators: "Terminatori",
    TestPages: "Test Stranice",
    Text: "Tekst",
    TheReturnedResults: "Vraćeni Rezultati",
    ThorMasterAddress: "Adresa Glavnog Thora",
    ThorNetworkAddress: "Netvork Adresa Thora",
    ThorProcess: "Tor Proces",
    Time: "Vrijeme",
    Timers: "Mjerači Vremena",
    TimeSeconds: "Vrijeme (Sekunde)",
    TimeStamp: "Vremenska Oznaka",
    TimeStarted: "Vrijeme Početka",
    TimeStopped: "Vrijeme Kraja",
    Timings: "Vremena",
    TimingsMap: "Mapa Vremena",
    title_ActiveGroupPermissions: "Dozvole Aktivne Grupe",
    title_ActivePermissions: "Aktivne Dozvole",
    title_Activity: "Aktivnosti",
    title_AvailableGroupPermissions: "Dostupne Dozvole Grupe",
    title_AvailablePermissions: "Dostupne Dozvole",
    title_BindingConfiguration: "Konfiguracija za Povezivanje",
    title_BindingDefinition: "Definicija Povezivanja",
    title_ClusterInfo: "Grupe",
    title_CodeGeneratorPermissions: "Dozvole Kod Generatora",
    title_DefinitionExplorer: "Istraživač Definicija",
    title_Definitions: "Definicije",
    title_DESDL: "Dinamičani ESDL",
    title_DFUQuery: "Logičke Datoteke",
    title_DFUWUDetails: "DFU Radna Jedinica",
    title_DirectoriesFor: "Direktoriji za",
    title_DiskUsage: "Iskorištenost Diska",
    title_ECLPlayground: "ECL Igralište",
    title_ErrorsWarnings: "Pogreške/Upozorenja za",
    title_EventScheduleWorkunit: "Respoređivač Događaja",
    title_FileScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Datoteke",
    title_FilesPendingCopy: "Datoteke na čekanju za kopiranje",
    title_FoundFilesFor: "Pronađena datoteka za",
    title_GetDFUWorkunits: "DFU Radne Jedinice",
    title_Graph: "Grafikon",
    title_GraphPage: "naslov",
    title_Graphs: "Grafikoni",
    title_GridDetails: "Promijeni Me",
    title_History: "Povijest",
    title_HPCCPlatformECL: "ECL Watch - Glavna Stranica",
    title_HPCCPlatformFiles: "ECL Watch - Datoteke",
    title_HPCCPlatformMain: "ECL Watch - Glavna Stranica",
    title_HPCCPlatformOps: "ECL Watch - Upravljnje",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Monitor - Dodatci",
    title_Inputs: "Unosi",
    title_LFDetails: "Detalji o Logičkol Datoteci",
    title_LibrariesUsed: "Biblioteke U Korištenju",
    title_Log: "Log Fajl",
    title_LostFilesFor: "Izgubljene Datoteke za",
    title_LZBrowse: "Zona za Pretovar",
    title_MemberOf: "Član Od",
    title_Members: "Članovi",
    title_Methods: "Metode",
    title_OrphanFilesFor: "Nepotrebne datoteke za",
    title_PackageParts: "Dijelovi paketa",
    title_Permissions: "Dozvole",
    title_PreflightResults: "Rezultati Provjere",
    title_QuerySetDetails: "Detalji Upita",
    title_QuerySetErrors: "Greške",
    title_QuerySetLogicalFiles: "Logičke Datoteke",
    title_QuerySetQuery: "Upiti (Queries)",
    title_QuerySetSuperFiles: "Super Datoteke",
    title_QueryTest: "Super Datoteke",
    title_Result: "Acktivnost",
    title_Results: "Rezultati",
    title_SearchResults: "Rezultati Pretraživanja",
    title_SourceFiles: "Originalni Fajlovi",
    title_Topology: "Topologija",
    title_TpThorStatus: "Stanje Thora",
    title_UserPermissions: "Korisničke Dozvile za Pristup",
    title_UserQuery: "Prava Pristupa",
    title_WorkunitScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Radne Jedinice",
    title_WUDetails: "ECL Detalji o Radnoj Jedinici",
    title_WUQuery: "ECL Radne Jedinice",
    To: "Prema",
    ToDate: "Do Sada",
    Toenablegraphviews: "Da biste mogli vidjeli grafikone, moraćete instalisati Graph View Control plugin",
    Tooltip: "Savjet",
    TooManyFiles: "Previše Datoteka",
    Top: "Vrh",
    Topology: "Topologija",
    ToSizes: "Do Velićina",
    TotalClusterTime: "Ukupno Vrijeme Klastera",
    TotalParts: "Ukupan Broj Dijelova",
    TotalSize: "Totalna Veličina",
    TotalThorTime: "Ukupno Vrijeme Thor-a",
    TransitionGuide: "Vodič",
    Tree: "Drvo",
    Type: "Tip",
    Unbound: "Odvojen",
    undefined: "nedefinisan",
    Unknown: "Nepoznat",
    Unlock: "Otključajte",
    Unprotect: "Ukinite Zaštitu",
    UnsupportedIE9FF: "Nisu Podržani (IE <= 9, FireFox)",
    Unsuspend: "Ukinite Suspenziju",
    Unsuspended: "Suspenzija Ukinuta",
    Up: "Na Gore",
    UpdateCloneFrom: "Ažurirajte Klon Koristeći",
    UpdateDFs: "Ažurirajte DFS",
    UpdateSuperFiles: "Ažurirajte Super Datoteke",
    Upload: "Učitajte",
    URL: "URL",
    Usage: "Upotreba",
    Used: "Korišten",
    User: "Korisnik",
    UserDetails: "Detalji o Korisniku",
    UserID: "Korisnicki ID",
    UserLogin: "Prijavite se samo pomoću korisničkog imena",
    UserName: "Ime Korisnika",
    Username: "Imekorisnika",
    UserPermissions: "Dozvole za Korisnikov Pristup",
    Users: "Korisnici",
    UseSingleConnection: "Koristite Samo Jedan Priključak (Connection)",
    Validate: "Potvrdite",
    ValidateActivePackageMap: "Validirajte Mapu Aktivnog Paketa",
    ValidatePackageContent: "Validirajte Saržaj Paketa",
    ValidatePackageMap: "Potvrdite Mapu Paketa",
    ValidateResult: "=====Potvrdite Result=====\n\n",
    ValidateResultHere: "(Rezultati Validiranja)",
    Value: "Vrijednost",
    Variable: "Varijabla",
    VariableBigendian: "Varijabla Big-endian",
    Variables: "Varijable",
    VariableSourceType: "Tip Izvora",
    Version: "Verzija",
    ViewByScope: "Pogled prema Skopu",
    Views: "Pogledi",
    Visualize: "Visualizujte",
    WarnIfAvailableDiskSpaceIsUnder: "Upozori ako raspoloživi disk prostor spadne ispod",
    WarnIfAvailableMemoryIsUnder: "Upozori ako raspoloživa memorija spadne ispod",
    WarnIfCPUUsageIsOver: "Upozori ako je iskorištenost procesora preko",
    Warning: "Upozorenje",
    Warnings: "Upozorenje(a)",
    WarnOldGraphControl: "Upozorenje:  Stara Grafička Kontrola",
    What: "Šta",
    Where: "Gdje",
    Who: "Ko",
    Width: "Širina",
    Workflows: "Tokovi poslova",
    Workunit: "Radna Jedinica",
    Workunits: "Radne Jedinice",
    WorkUnitScopeDefaultPermissions: "Unaprijed Definisane Dozvole za Prostor za Radne Jedinice",
    Wrap: "Zamotajte",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid Ne Može Biti Prazan.",
    WUSnapShot: "Trenutna Slika Radne Jedinice",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "XRef",
    Year: "Godina",
    YouAreAboutToBeLoggedOut: "Vi ćete biti odjavljeni",
    YouAreAboutToDeleteBinding: "Odabrano vezivanje/binding će biti izbrisano. Jeste li sigurni da želite to učiniti?",
    YouAreAboutToDeleteDefinition: "U tijeku je brisanje ove definicije. Jeste li sigurni da želite to učiniti?",
    YouAreAboutToDeleteThisFile: "Hoćete li izbrisati ovu datoteku",
    YouAreAboutToDeleteThisPart: "Hoćete li izbrisati ovaj dio",
    YouAreAboutToDeleteThisQueryset: "Hoćete li izbrisati ovaj skup upita",
    YouAreAboutToDeleteThisWorkunit: "Hoćete li izbrisati ovu radnu jedinicu",
    YouAreAboutToRemoveUserFrom: "Tražili ste da uklonite korisnika(e) iz ove grupe. Da li želite nastaviti?",
    YourBrowserMayNotSupport: "Vaš pretraživač možda ne podržava datoteku (e) ove veličine",
    YourScreenWasLocked: "ESP je zaključao vaš ekran. Podatci su zastarjeli.",
    ZAP: "Z.A.P",
    ZeroLogicalFilesCheckFilter: "Nema ni jedane Logičke Datoteke(provjerite filter)",
    Zip: "Zapakujte (Zip)",
    ZippedAnalysisPackage: "Zapakovani Paket sa Analizama",
    Zoom: "Zum",
    Zoom100Pct: "Zumirajte 100%",
    ZoomAll: "Zumirajte Sve",
    ZoomMinus: "Zum-",
    ZoomPlus: "Zum +",
    ZoomWidth: "Zumirajte Širinu"
});


/***/ }),

/***/ "./eclwatch/nls/hu/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/hu/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
    Abort: "Megszakít",
    AbortedBy: "Megszakította",
    AbortedTime: "A megszakítás időpontja",
    About: "Névjegy",
    AboutGraphControl: "&lsquo;Graph Control&rsquo; információk",
    AboutHPCCSystems: "HPCC Systems® névjegye",
    AboutHPCCSystemsGraphControl: "HPCC Systems® Graph Control névjegye",
    AboutToLoseSessionInformation: "Ön arra készül, hogy kilépjen a rendszerből és ezzel elveszti az összes aktív folyamatra vonatkozó információt. Kívánja folytatni?",
    Account: "Felhasználói fiók",
    Action: "Művelet",
    Activate: "Aktivál",
    Activated: "Aktivizált",
    ActivateQuery: "Lekérdezés aktiválása",
    ActivateQueryDeletePrevious: "Lekérdezés aktiválása és az előző törlése",
    ActivateQuerySuspendPrevious: "Lekérdezés aktiválása és az előző felfüggesztése",
    Active: "Aktív",
    ActivePackageMap: "Aktív csomagtérkép",
    ActiveWorkunit: "Aktív feladat",
    Activities: "Tevékenységek",
    Activity: "Tevékenység",
    ActivityMap: "Aktivitás-térkép",
    ActualSize: "Aktuális méret",
    Add: "Hozzáad",
    AddAttributes: "Attribútumok/értékek hozzáadása az eljáráshoz",
    AddAttributes2: "Attribútum(ok) hozzáadása",
    AddBinding: "Kötés hozzáadása",
    AddFile: "Fájl hozzáadás",
    AddGroup: "Csoport hozzáadás",
    AdditionalResources: "További erőforrások",
    AddPart: "Fájl rész hozzáadás",
    AddProcessMap: "Csomagtérkép hozzáadás",
    AddTheseFilesToDali: "Kiválasztott fájlok hozzáadása a Dali szerverhez",
    AddtionalProcessesToFilter: "Járulékos szűrő eljárás",
    AddToExistingSuperfile: "Hozzáadás létező szuper-fájlhoz",
    AddToSuperfile: "Superfile-hoz ad",
    AddUser: "Felhasználó hozzáadás",
    Advanced: "Haladó",
    All: "Összes",
    AllowAccess: "<center>Hozzáférés<br>Engedélyezés</center>",
    AllowForeignFiles: "Idegen fájlok engedélyezése",
    AllowFull: "<center>Teljes<br>Hozzáférés</center>",
    AllowRead: "<center>Olvasás<br>Engedélyezés</center>",
    AllowWrite: "<center>Írás<br>Engedélyezés</center>",
    AllQueuedItemsCleared: "A várakozási sorban levő elemek törlésre kerülnek. Az aktuális feldolgozás folytatódik",
    ANY: "Bármelyik",
    AnyAdditionalProcessesToFilter: "További járulékos szűrő eljárások?",
    Append: "Hozzáfűz",
    AppendCluster: "Cluster hozzáadás",
    Apply: "Alkalmaz",
    ArchivedOnly: "Csak tárolt.",
    ArchivedWarning: "Figyelem: Adjon meg rövidebb időintervallumot! Ellenkező esetben a feladatok lekérdezése hosszabb ideig tarthat, mint amit az Ön bőngésző programja engedélyez.",
    Attach: "Csatolás",
    Attribute: "Attribútum",
    AttributesAreRequired: "Kötelező attribútumok",
    AutoRefresh: "Automatikus frissítés",
    AutoRefreshEvery: "Automatikus frissítés minden x percben.",
    AutoRefreshIncrement: "Automatikus frissítés növelése",
    Back: "Vissza",
    BannerColor: "Fejléc szín",
    BannerMessage: "Fejléc szövege",
    BannerScroll: "Fejléc görgetés",
    BannerSize: "Fejléc méret",
    BinaryInstalls: "Bináris telepítőkészlet",
    Bind: "Összekapcsol",
    Binding: "Kötés",
    BindingDeleted: "A kötés törölve",
    Blob: "BLOB",
    BlobPrefix: "BLOB előtag",
    Bottom: "Legalsó",
    BoundBy: "bekötötte:",
    Busy: "Foglalt",
    Cancel: "Mégsem",
    CancelAll: "Az összes megszakítása",
    CancelAllMessage: "A folyamatban levő feldolgozások megszakítása és a várakozási sor törlése. Kívánja folytatni?",
    Chart: "Grafikon",
    CheckAllNodes: "Ellenőrizze az összes csomopontot",
    CheckFilePermissions: "Ellenőrizze a fájl hozzáférési jogokat",
    CheckSingleNode: "Ellenörizze a csomópontot",
    Clear: "Mezők törlése",
    ClearPermissionsCache: "Törli a hozzáférés engedélyek gyorsítótárát",
    ClearPermissionsCacheConfirm: "Biztos, hogy törölni akarja a DALI és az ESP hozzáférési engedélyek gyorsítótárát? A futó feladatok teljesítménye jelentősen csökkenhet, amig a gyorsítótárak tartalma újratöltődik. ",
    Clone: "Klónozás",
    ClonedWUID: "Klónozott WUID",
    CloneTooltip: "Feladat duplikálás",
    Close: "Bezárás",
    Cluster: "Klaszter",
    ClusterName: "Klaszter név",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Klaszter feldolgozások",
    Code: "Kód",
    CodeGenerator: "Kód generátor",
    Col: "Oszlop",
    CollapseAll: "Összes bezárása",
    Command: "Parancs",
    Comment: "Megjegyzés",
    Compiled: "Fordítás kész",
    Compiling: "Fordítás folyamatban",
    Completed: "Kész",
    ComplexityWarning: "Több mint {threshold} aktivitás ({activityCount}) - elnyomjuk a kezdeti megjelenítést?",
    Component: "Komponens",
    Compress: "Tömörít",
    Compressed: "Tömörített",
    CompressedFileSize: "Tömörített fájl méret",
    Condition: "Feltétel",
    Configuration: "Beállítások",
    ConfigureService: "Szolgáltatás konfigurálása",
    ConfirmPassword: "Jelszó jóváhagyás",
    ConfirmRemoval: "Biztos, hogy ezt akarja csinálni?",
    ContactAdmin: "Amennyiben át akarja nevezni ezt a csoportot, lépjen kapcsolatba az LDAP adminisztrátorral.",
    Content: "Tartalom",
    Contents: "Tartalom",
    ContentType: "Tartalom típusa",
    ContinueWorking: "Munka folytatása",
    Copy: "Másolat",
    CopyToClipboard: "Vágólapra másolás",
    Count: "Darab (Count)",
    CreateANewFile: "Új szuper-fájl létrehozása.",
    Created: "Létrehozva",
    CreatedBy: "Létrehozta",
    CreatedTime: "Létrehozás időpontja",
    Creating: "Létrehoz",
    Critical: "Kritikus",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "Dali IP címe",
    dataset: ":=dataset*",
    Date: "Dátum",
    Day: "Nap",
    Deactivate: "Hatástalanít",
    Debug: "Hibakeresés",
    DEF: "DEF",
    Defaults: "Alapértelmezés",
    Definition: "Definíció",
    DefinitionDeleted: "Definíció törölve",
    DefinitionID: "Definíció azonosító",
    Definitions: "Definíciók",
    DelayedReplication: "Késleltetett másolás",
    Delete: "Törlés",
    DeleteBinding: "Kötések törlése",
    Deleted: "Törölt",
    DeletedBinding: "Törölt kötések",
    DeleteDirectories: "Az üres könyvtárak törlése. Kívánja folytatni?",
    DeleteEmptyDirectories: "Töröljük az összes könyvtárakat?",
    DeletePrevious: "Előző törlése",
    DeleteSelectedDefinitions: "Kívánja törölni az összes kiválasztott definíciót?",
    DeleteSelectedFiles: "Töröljük a kiválasztott fájlokat?",
    DeleteSelectedGroups: "Törölni akarja a kijelölt csoporto(ka)t?",
    DeleteSelectedPermissions: "Törli a kiválasztott hozzáférési engedélyeket?",
    DeleteSelectedQueries: "Töröljük a kiválasztott lekérdezéseket?",
    DeleteSelectedUsers: "Törölni akarja a kijelölt felhasználó(ka)t?",
    DeleteSelectedWorkunits: "Törölni akarja a kiválasztott feladatokat?",
    DeleteSuperfile: "Töröljük a Superfile-t?",
    DeleteSuperfile2: "Szuper-fájl törlése",
    DeleteThisPackage: "Törölni akarja ezt a csomagot?",
    Delimited: "Határolt",
    DenyAccess: "<center>Hozzáférés<br>Tiltása</center>",
    DenyFull: "<center>Műveletek<br>Tiltása</center>",
    DenyRead: "<center>Olvasás<br>Tiltása</center>",
    DenyWrite: "<center>Írás<br>Tiltása</center>",
    Depth: "Mélység",
    DepthTooltip: "Maximális al-gráf mélység",
    Deschedule: "Ütemezés törlése",
    DescheduleSelectedWorkunits: "Megszűnteti a kijelőlt feladat ütemezését?",
    Description: "Leírás",
    DESDL: "DESDL",
    Despray: "Összegyűjt",
    Details: "Részletek",
    DFUServerName: "DFU Szerver név",
    DFUWorkunit: "DFU-munkaegység",
    Directories: "Könyvtárak",
    Directory: "Könyvtár",
    DisableScopeScanConfirm: "Biztos, hogy letíltja a hatókör vizsgálatot? DALI újraíndításakor ezek a változtatások elvesznek.",
    DisableScopeScans: "Hatókör vizsgálat letiltása",
    DiskUsage: "Lemez használat",
    Distance: "Távolság",
    DistanceTooltip: "Legnagyobb aktivitás-szomszéd távolság",
    Dll: "Dll",
    Documentation: "Dokumentáció",
    DoNotActivateQuery: "Ne aktiválja a kiválasztott lekérdezést",
    DoNotRepublish: "Ne publikáljuk újra?",
    DOT: "DOT",
    DOTAttributes: "DOT Attribútumok",
    Down: "Le",
    Download: "Letöltés",
    Downloads: "Letöltés",
    DownloadToCSV: "Letöltés CSV fájlba",
    DropZone: "Gyűjtőhely",
    DueToInctivity: "Aktivitás hiányában a rendszer 3 percen belül kilépteti Önt az ECLWatch kapcsolatból.",
    Duration: "Időtartam",
    DynamicNoServicesFound: "A szolgáltatás nem található",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "A folytatáshoz szükséges a sütik engedélyezése",
    ECLWatchSessionManagement: "ECLWatch kapcsolat menedzsment",
    ECLWorkunit: "ECL-munkaegység",
    Edges: "Élek",
    Edit: "Szerkesztés",
    EditDOT: "DOT szerkesztés",
    EditGraphAttributes: "Gráf attribútumok szerkesztése",
    EditXGMML: "XGMML szerkesztés",
    EmployeeID: "Alkalmazott azonosítója",
    Empty: "(Üres)",
    Enable: "Engedélyezés",
    EnableScopeScans: "Hatókör vizsgálat engedélyezése",
    EnableScopeScansConfirm: "Biztos, hogy engedélyezi a hatókör vizsgálatot? DALI újraíndításakor ezek a változtatások elvesznek.",
    EnglishQ: "Angolul?",
    EnterAPercentage: "Adjon meg egy százalékos arányt",
    EnterAPercentageOrMB: "Adjon meg egy százalékos arányt vagy méretet MB-ban",
    EraseHistory: "Előzmények törlése",
    EraseHistoryQ: "Előzményeinek törlése",
    Error: "Hiba",
    Errorparsingserverresult: "Hiba a szerver válasz feldolgozásban",
    Errors: "Hibák",
    ErrorsStatus: "Hibák/Figyelmeztetések",
    ErrorUploadingFile: "Hiba a fájl(ok) feltöltésénél. Ellenőrizze a hozzáférési jogosultságokat.",
    ErrorWarnings: "Hiba/Figyelmeztetés",
    Escape: "Megszakít",
    ESPBuildVersion: "ESP Build verzió",
    ESPNetworkAddress: "ESP hálózati címe",
    ESPProcessName: "ESP feldolgozás neve",
    EventName: "Esemény neve",
    EventNamePH: "eventname",
    EventScheduler: "Esemény ütemező",
    EventText: "Esemény szövege",
    EventTextPH: "Esemény szövege",
    Exception: "Kivétel",
    Executed: "Végrehajtva",
    Executing: "Végrehajtás alatt",
    ExpandAll: "Összes kinyitása",
    ExpireDays: "Lejár (nap)",
    Export: "Exportálás",
    ExportSelectionsToList: "A kijelöltek listába mentése",
    FailIfNoSourceFile: "Hibajelzés, ha nincs bemeneti file",
    Fatal: "Végzetes",
    Fetched: "Hozott",
    FetchingData: "Adat lekérdezés...",
    fetchingresults: "eredemény lekérdezés",
    File: "Fájl",
    FileCluster: "Fájl csomópont",
    FileCounts: "Fájlok száma",
    FileName: "Fájl név",
    FileParts: "Fájl részek",
    FilePath: "Fájl útvonal",
    FilePermission: "Fájl hozzáférési jogok",
    Files: "Fájlok",
    FileScopeDefaultPermissions: "Alapértelmezett fájl-hatókör hozzáférési jogok",
    FileScopes: "Fájl keresési hatókörök",
    FileSize: "Fájl méret",
    FilesNoPackage: "Csomagdefiníció nélküli fájlok",
    FilesPending: "Folyamatban lévő fájlok",
    FilesWarning: "Az eredmény túl sok fájlt tartalmaz. Csak az első 100.000 fájl kerül rendezésre dátum/hozzáférés dátuma alapján. Ha korlátozni szeretné az eredmény méretét, állítson be egy szűrőfeltételt.",
    FilesWithUnknownSize: "Ismeretlen méretű fájlok",
    FileType: "Fájl típus",
    FileUploader: "Fájl feltöltő",
    FileUploadStillInProgress: "Fájl feltöltés folyamatban",
    Filter: "Szűrő",
    FilterSet: "Szűrőfeltétel",
    Find: "Keresés",
    FindNext: "Következőt",
    FindPrevious: "Előzőt",
    Finished: "Befejezett",
    FirstN: "Az első N",
    FirstName: "Keresztnév",
    FirstNRows: "Első N rekord",
    Fixed: "Állandó rekordméret",
    Folder: "Könyvtár",
    Format: "Formátum",
    Forums: "Fórum",
    Forward: "Előre",
    FoundFile: "Megtalált fájl",
    FoundFileMessage: "A megtalált fájlhoz tartozó fizikai részek nincsenek regisztrálva a Dali szerverben. A részek ellenőrzöttek, így visszaállíthatók a szerverben. Igény eseten törölhetők a" ,
    FromDate: "Dátumtól",
    FromSizes: "Mérettől",
    FromTime: "Időponttól",
    FullName: "Teljes név",
    Generate: "Generálás",
    GetPart: "Fájl rész elérés",
    GetSoftwareInformation: "Szoftver információ lekérdezés",
    Graph: "Gráf",
    GraphControl: "Graph Control",
    Graphs: "Gráfok",
    GraphView: "Gráf nézet",
    Group: "Csoport",
    GroupBy: "Csoportosítva",
    GroupDetails: "Csoport jellemzők",
    Grouping: "Csoportosítás",
    GroupName: "Csoport név",
    GroupPermissions: "Csoport engedélyek",
    Groups: "Csoportok",
    GZip: "GZip",
    help: "Ezen a területen a munkaegység gráfjai láthatók. Az egyes blokkok mérete és színe az adott blokk végrehajtási idejével arányos (a nagyobb es sötétebb terület a hosszabb időtartamot jelzi).",
    Helper: "Segítő",
    Helpers: "Segédletek",
    Hex: "Hexa nézet",
    HideSpills: "Rendszer-munkafájl elrejtése",
    High: "Magas",
    History: "Történet",
    HPCCSystems: "HPCC Systems®",
    Icon: "Ikon",
    ID: "Azonosító",
    Inactive: "Inaktív",
    IncludeSlaveLogs: "Slave logok hozzáadása",
    Index: "Index",
    Info: "Információ",
    InfoDialog: "Információk",
    InheritedPermissions: "Örökölt hozzáférési jogok",
    Inputs: "Bemenet",
    InvalidResponse: "(Érvénytelen válasz)",
    InvalidUsernamePassword: "Hibás felhasználói név vagy jelszó. Próbálja újra.",
    IP: "IP",
    IPAddress: "IP cím",
    IsCompressed: "Tömörített?",
    IsLibrary: "Könyvtár?",
    IsReplicated: "Készült másodpéldány?",
    IssueReporting: "Probléma jelentés",
    JobName: "Munka azonosító",
    Jobname: "Munka azonosító",
    jsmi: "jkis*",
    JSmith: "JKis*",
    JSON: "JSON",
    KeyFile: "Kulcs fájl",
    Label: "Címke",
    LandingZone: "Lerakat",
    LandingZones: "Lerakatok",
    LanguageFiles: "Nyelvi fájlok",
    Largest: "Legnagyobb",
    LargestFile: "Legnagyobb fájl",
    LargestSize: "Legnagyobb méret",
    LastEdit: "Utolsó szerkesztés",
    LastEditedBy: "Utoljára szerkesztette:",
    LastEditTime: "Utolsó szerkesztés ideje",
    LastMessage: "Utolsó üzenet",
    LastName: "Vezetéknév",
    LastNDays: "Az utolsó N nap",
    LastNHours: "Utolsó N óra",
    LastNRows: "Utolsó N rekord",
    LastRun: "Utolsó futás",
    LDAPWarning: "<b>LDAP szolgáltatás hiba:</b>  &lsquo;Túl sok felhasználó&rsquo; - Kérem, használjon szűrést!",
    LearnMore: "További ismeretek",
    LegacyForm: "Örökölt űrlap (Legacy Form)",
    Legend: "Jelmagyarázat",
    LibrariesUsed: "Használt könyvtárak",
    LibraryName: "Library név",
    Line: "Sor",
    LineTerminators: "Sorvég karakterek",
    Links: "Linkek",
    Loading: "Betöltés",
    LoadingCachedLayout: "Tárolt elrendezés betöltése",
    LoadingData: "Adat betöltés...",
    loadingMessage: "Betöltés folyamatban...",
    LoadPackageContentHere: "(Csomag tartalmának betöltése erre a helyre)",
    LoadPackageFromFile: "Csomag betöltése fájlból",
    Local: "Helyi",
    LocalFileSystemsOnly: "Csak helyi fájlrendszerbe",
    Location: "Elhelyezkedés",
    Lock: "Lezár",
    Log: "Log",
    log_analysis_1: "log_elemzés_1*",
    LogFile: "Log fájl",
    LoggedInAs: "Bejelentkezve mint ",
    LoggingOut: "Kijelentkezés",
    LogicalFile: "Logikai fájl neve",
    LogicalFiles: "Logikai fájlok",
    LogicalFilesAndSuperfiles: "Logikai és szuper fájlok",
    LogicalFilesOnly: "Csak a logikai fájlokat",
    LogicalFileType: "Logikai fájl típusa",
    LogicalName: "Logikai név",
    Login: "Bejelentkezés",
    Logout: "Kijelentkezés",
    Logs: "Logok",
    LogVisualization: "Log megjelenítés",
    LogVisualizationUnconfigured: "Log megjelenítés nincs konfigurálva. Ellenőrizze a konfigurációs beállításokat.",
    LostFile: "Elveszett fájl",
    LostFile2: "Elveszett fájlok",
    LostFileMessage: "Az elveszett logikai fájl legalább egy fizikai része megtalálható mind az elsődleges mind a másolati tároló helyen. A logikai fájl referencia megtalálható a Dali szerverben. A fájl törlése eltávolítja a hivatkozást a Dali szerverből valamint az összes fizika részt a lemezről.",
    Low: "Alacsony",
    MachineInformation: "Gépek",
    Machines: "Gép",
    Major: "Fő",
    ManagedBy: "Által kezelt",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Használja a Ctr+C-t",
    ManualOverviewSelection: "Gyorsnézet manuális kiválasztása szükséges",
    ManualTreeSelection: "Manuális fa kiválasztás szükséges",
    Mappings: "Leképezések",
    Mask: "Maszk",
    Max: "Maximum",
    MaximumNumberOfSlaves: "Slave-ek maximális száma",
    MaxNode: "Maximális csomópont szám",
    MaxRecordLength: "Maximális rekord méret",
    MaxSize: "Maximális méret",
    MaxSkew: "Maximális elcsúszás",
    MemberOf: "Tagja a",
    Members: "Tagok",
    Message: "Üzenet",
    MethodConfiguration: "Módszer konfiguráció",
    Methods: "Eljárások",
    Min: "Minimum",
    Mine: "Az én",
    MinNode: "Minimális csomópont szám",
    Minor: "Al",
    MinSize: "Minimális méret",
    MinSkew: "Minimális elcsúszás",
    Missing: "Hiányzó",
    MixedNodeStates: "Több komponenst tartalmazó csomópont állapota",
    Modification: "Módosítás",
    Modified: "Módosított",
    ModifiedUTCGMT: "Módosítva (UTC/GMT)",
    Modify: "Módosít",
    MonitorEventName: "Monitor esemény név",
    Monitoring: "Felügyelet",
    MonitorShotLimit: "Monitor találatok limitje",
    MonitorSub: "Almonitor",
    Month: "Hónap",
    More: "Tovább",
    MustContainUppercaseAndSymbol: "Csak nagybetűket és jeleket tartalmazhat",
    NA: "N/A",
    Name: "Név",
    NamePrefix: "Név előtag",
    NamePrefixPlaceholder: "valamilyen::előtag",
    Newest: "Legújabb",
    NewPassword: "Új jelszó",
    NoContent: "(Nincs tartalom)",
    noDataMessage: "Nincs a feltételeknek megfelelő adat...",
    Node: "Csomópont",
    NodeGroup: "Node csoport",
    NoErrorFound: "Nincs hiba",
    NoFilterCriteriaSpecified: "Nincs szűrőfeltétel megadva.",
    None: "Semmi",
    NoPublishedSize: "Nincs publikált méret",
    Normal: "Normál",
    NoScheduledEvents: "Nincs ütmezett esemény",
    NoSplit: "Együtt tart",
    NotActive: "Nem aktív",
    NothingSelected: "Nincs kiválasztva…",
    NotInSuperfiles: "Nincs a szuper fájlban",
    NotSuspendedbyUser: "Nem a felhasználó által felfüggesztett",
    NoWarningFound: "Nincs figyelmeztetés",
    NumberofParts: "Részek száma",
    NumberofSlaves: "Slave-ok száma",
    OK: "Rendben",
    Oldest: "Legrégebbi",
    OldPassword: "Régi jelszó",
    OmitSeparator: "Elválasztójel mellőzése",
    Only1PackageFileAllowed: "Csak egy csomagfájl engedélyezett",
    Open: "Megnyitás",
    OpenInNewPage: "Megnyitás új lapon",
    OpenInNewPageNoFrame: "Megnyitás új lapon (nem keretben)",
    OpenLegacyECLWatch: "Legacy ECL Watch megnyitása",
    OpenLegacyMode: "Megnyitás (hagyományos módon)",
    OpenNativeMode: "Megnyitás (alapértelmezett módon)",
    OpenSafeMode: "Megnyitás (biztonságos módban)",
    OpenSource: "Nyílt forráskódú",
    OpenTreeMode: "Nyitva (fa nézetben)",
    Operation: "Művelet",
    Operations: "Műveletek",
    Options: "Opciók",
    OriginalFile: "Eredtei fájl",
    OrphanFile: "Elhagyott, árva fájlok",
    OrphanFile2: "Elhagyott, árva fájl",
    OrphanMessage: "Az elhagyott, árva file összes fizikai része nem található meg a lemezen. Ezek hiányában a logikai fájl csak részlegesen állítható vissza a Dali szerverben.",
    Outputs: "Kimenet",
    Overview: "Áttekintés",
    Overwrite: "Fellülírás",
    OverwriteMessage: "Néhány fájl már létezik! A folytatáshoz engedélyezze a fellülírást!",
    Owner: "Tulajdonos",
    PackageContent: "Csomag tartalma",
    PackageContentNotSet: "Csomag tartalma nincs megadva",
    PackageMap: "Csomagtérkép",
    PackageMaps: "Csomagtérképek",
    PackagesNoQuery: "Csomagok hozzátartozó lekérdezés nélkül",
    ParameterXML: "Paraméter XML fájl",
    Part: "Rész",
    PartMask: "Fizikai fájl név maszk",
    PartName: "Fájl rész név",
    Parts: "Részek",
    PartsFound: "Megtalált fizikai fájl részek",
    PartsLost: "Elveszett fizikai fájl részek",
    Password: "Jelszó",
    PasswordExpiration: "Jelszó lejár",
    PasswordExpired: "A jelszava lejárt! Adjon meg újat!",
    PasswordExpirePostfix: "napon bellül. Meg akarja változtatni?",
    PasswordExpirePrefix: "Jelszava lejár",
    PasswordOpenZAP: "Jelszó a ZAP megnyitásához (opciónális)",
    PasswordsDoNotMatch: "Jelszó nem egyezik",
    Path: "Útvonal",
    PathMask: "Útvonal maszk",
    Pause: "Szüneteltetés",
    PauseNow: "Azonnali felfüggesztés",
    PctComplete: "% kész",
    PercentCompressed: "Százalék tömörített",
    PercentDone: "% kész",
    PerformingLayout: "Elrendezés generálása...",
    Permission: "Hozzáférési jog",
    PermissionName: "Hozzáférési jog megnevezése",
    Permissions: "Jogosultságok",
    PhysicalFiles: "Fizikai fájlok",
    PlaceholderFindText: "Wuid, felhasználók, egyebek...",
    PlaceholderFirstName: "József",
    PlaceholderLastName: "Kiss",
    Playground: "ECL teszt labor",
    PleaseEnableCookies: "A folytatáshoz szükséges a sütik engedélyezése",
    PleaseEnterANumber: "Adjon meg egy számot",
    PleaseLogin: "Kérem jelentkezzen be a felhasználói nevével és jelszavával",
    PleaseLogIntoECLWatch: "Az ECLWatch használatához be kell jelentkeznie.",
    PleasePickADefinition: "Válasszon egyet a definíciók közül",
    PleaseSelectADynamicESDLService: "Válasszon egyet a dinamikus ESDL szolgáltatások közül.",
    PleaseSelectAGroupToAddUser: "Kérem válasszon csoportot a felhasználó számára",
    PleaseSelectAServiceToBind: "Kérem válasszon egy bekötendő szolgáltatást",
    PleaseSelectATopologyItem: "Válasszon egy célt, szolgáltatást vagy gépet",
    PleaseSelectAUserOrGroup: "A fájlnévvel együtt adjon meg egy felhasználó vagy csoport azonosítót",
    PleaseSelectAUserToAdd: "Válasszon egy felhasználót a hozzáadáshoz.",
    Plugins: "Betölthető modulok",
    Port: "Port",
    Prefix: "Előtag",
    PrefixPlaceholder: "fájlnév{:hossz}, fájlméret{:[B|L][1-8]}",
    Preflight: "Előkészítés",
    PreloadAllPackages: "Az összes csomag előzetes betöltése",
    PreserveCompression: "Tartalom tömörtés megőrzése",
    Preview: "Előnézet",
    PrimaryLost: "Elveszett az elsődleges változat",
    PrimaryMonitoring: "Elsődleges felügyelet",
    Priority: "Prioritás",
    Process: "Feldolgozás",
    Processes: "Folyamatok",
    ProcessFilter: "Process&nbsp;Filter",
    ProcessorInformation: "Processzor információk",
    ProgressMessage: "Állapot",
    Properties: "Tulajdonságok",
    Property: "Tulajdonság",
    Protect: "Megvéd",
    Protected: "Védett",
    Publish: "Publikál",
    Published: "Közzétett",
    PublishedBy: "Közzétette",
    PublishedByMe: "Általam publikált",
    PublishedQueries: "Publikált lekérdezések",
    PushEvent: "Push event",
    Quarter: "Negyed",
    Queries: "Lekérdezések",
    QueriesNoPackage: "Lekérdezések hozzátartozó csomag nélkül",
    Query: "Lekérdezés",
    QueryDetailsfor: "A lekérdezés paraméterei",
    QueryID: "Lekérdezés azonosító",
    QueryIDPlaceholder: "som?q*ry.1&rsquo;",
    QueryName: "Lekérdezés név",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Lekérdezés készlet",
    Queue: "Sor",
    Quote: "Idézőjel",
    QuotedTerminator: "A fájl idézőjelek közötti rekordhatároló karaktert tartalmaz",
    RawTextPage: "Formázatlan szöveg (aktuális lap)",
    Ready: "Kész",
    ReallyWantToRemove: "Biztosan el akarja távolítani?",
    ReAuthenticate: "A folytatáshoz újra azonosítania kell magát",
    RecordCount: "Rekord szám",
    RecordLength: "Rekord méret",
    Records: "Rekordok száma",
    RecordSize: "Rekord méret",
    RecordStructurePresent: "CSV rekord struktúra definiált az fájl első sorában",
    Recover: "Helyreállít",
    RecoverTooltip: "Felfüggesztett/megakadt feldolgozás újraindítása",
    RecreateQuery: "Lekérdezés újrakészítése",
    Recycling: "Újrahasznosítás",
    RedBook: "Referencia kézikönyv (Red Book)",
    Refresh: "Frissítés",
    ReleaseNotes: "Verzió információk (Release Notes)",
    Reload: "Újratölt",
    Remaining: "Hátralévő",
    RemoteCopy: "Távoli másolat",
    RemoteDali: "Távoli Dali hálózati címe",
    RemoteDaliIP: "Remote&nbsp;Dali&nbsp;IP&nbsp;Address",
    Remove: "Eltávolít",
    RemoveAttributeQ: "Törölni készül egy attribútumot. Biztos, hogy folytatni akarja?",
    RemoveAtttributes: "Attribútum(ok) eltávolítása",
    RemovePart: "Fájl rész eltávolítás",
    RemoveSubfiles: "Al-fájl(ok) eltávolítása",
    RemoveSubfiles2: "Töröljük az al-fájlokat?",
    RemoveUser: "Arra készül, hogy eltávolítsa a felhasználói nevét a csoportból!",
    Rename: "Átnevez",
    RenderedSVG: "Generált SVG",
    RenderSVG: "SVG generálás",
    Replicate: "Másolat",
    ReplicatedLost: "Elveszett a másolat",
    ReplicateOffset: "Másodpéldány eltolás (csomópontok között)",
    ReportAnError: "Egy hiba bejelentése",
    ReportError: "Hiba bejelentése",
    RepresentsASubset: "Az összes találat egy részhalmaza került megjelenítésre. Specifkusabb feltéttel megadásával csökkentheti a találatok számát.",
    RequestSchema: "Igénylő séma (Request Schema)",
    RequiredForXML: "Szükséges az XML formátumú importáláshoz",
    Reschedule: "Újraütemez",
    Reset: "Forrás",
    ResetThisQuery: "Vissza akarja állítani ezt a lekérdezést az allapállapotába?",
    ResetViewToSelection: "Vissza akarja állítani ezt a nézetet a kiválasztott elemekre?",
    Resource: "Erőforrás",
    Resources: "Erőforrások",
    ResponseSchema: "Válasz séma (Response Schema)",
    Restart: "Újraindít",
    Restarted: "Újraindított",
    Restore: "Visszaállítás",
    Resubmit: "Újraküld",
    Resubmitted: "Újraküldött",
    ResubmitTooltip: "Létező feldolgozás újraindítása",
    Results: "Eredmény(ek)",
    Resume: "Tovább folytat",
    RetainSuperfileStructure: "Superfile szerkezetének megőrzése",
    RetypePassword: "Jelszó mégegyszer",
    Reverse: "Visszafelé",
    RowPath: "Rekord útvonal",
    Rows: "Sor",
    RowTag: "Sor azonositó",
    RoxieCluster: "Roxie klaszter",
    RoxieFileCopy: "Roxie fájl másolás állapot",
    RunningServerStrain: "Ez a feldolgozás sokig futhat és nagy terhelés okozhat a rendszerben. Kívánja folytatni?",
    Sample: "Minta",
    SampleRequest: "Minta igénylés (Sample Request)",
    SampleResponse: "Minta válasz (Sample Response)",
    Save: "Mentés",
    Scope: "Hatókör",
    SearchResults: "Keresések",
    SecondsRemaining: "másodperc maradt",
    Security: "Biztonság",
    SelectPackageFile: "Csomagfájl választás",
    Separators: "Elválasztó jelek",
    Server: "Szerver",
    ServiceName: "Szolgáltatás megnevezése",
    Services: "Szolgáltatások",
    SetBanner: "Fejléc megadása",
    SetTextError: "Nem sikerült a szöveget megjeleníteni. Lehetséges, hogy túl hosszú. Használja a &lsquo;segédleteket&rsquo; a letöltéshez.",
    SetToFailed: "Elront",
    Severity: "Probléma mértéke",
    Show: "Megjelenít",
    ShowProcessesUsingFilter: "Feldolgozások  megjelenítése szűréssel",
    ShowSVG: "SVG megjelenítés",
    Size: "Méret",
    Skew: "Asszimmetrikus (Skew)",
    SkewNegative: "Negatív elcsúszás",
    SkewPositive: "Pozitív elcsúszás",
    SLA: "SLA",
    SlaveLogs: "Slave logs",
    SlaveNumber: "Slave-ek száma",
    Slaves: "Kiszolgáló",
    Smallest: "Legkisebb",
    SmallestFile: "Legkisebb fájl",
    SmallestSize: "Legkisebb méret",
    SOAP: "SOAP",
    SomeDescription: "Valamennyi leírás",
    somefile: "*::valamilyen_fájl*",
    Source: "Forrás",
    SourceCode: "Forráskód",
    SourceLogicalFile: "Forrás logikai fájl neve",
    SourcePath: "Forrás útvonal (joker karakter engedélyezett)",
    SourceProcess: "Forrás feldolgozás",
    Spill: "Rendszer-munkafájl",
    SplitPrefix: "Elválasztó előtag",
    Spray: "Szétoszt",
    Start: "Indítás",
    Started: "Elindítva",
    Starting: "Kezdés",
    State: "Állapot",
    Stats: "Statisztika",
    Status: "Állapot",
    Stopped: "Megállítva",
    Stopping: "Megállás",
    StorageInformation: "Tárolási információk",
    Subgraph: "Al-gráf",
    Subgraphs: "Algráf",
    Submit: "Elküld",
    Subtype: "Altípus",
    SuccessfullySaved: "Sikeresen mentve",
    Summary: "Összegzés",
    SummaryMessage: "Összegzés",
    SuperFile: "Szuper-fájl",
    Superfile: "Szuper-fájl",
    SuperFiles: "Szuperfájlok",
    Superfiles: "Szuper-fájlok",
    SuperFilesBelongsTo: "Szuperfájl(ok)hoz tartozik",
    SuperfilesOnly: "Kizárólag szuperfájl",
    SuperOwner: "Szuper fájl tulajdonos",
    Suspend: "Felfüggeszt",
    Suspended: "Felfüggesztve",
    SuspendedBy: "Felfüggesztette",
    SuspendedByCluster: "A klaszter által felfüggesztett",
    SuspendedByUser: "Felhansználó által felfüggesztett",
    SuspendedReason: "A felfüggesztés oka",
    SVGSource: "SVG forrás",
    Sync: "Szinkronizálás",
    SyncSelection: "Szinkronizálás a kiválasztottakhoz",
    SystemServers: "Rendszer kiszolgálók",
    Table: "Táblázat",
    tag: "jel",
    Target: "Cél",
    TargetClusters: "Cél klaszterek",
    TargetName: "Cél neve",
    TargetNamePlaceholder: "valamilyen::logikai::fájlnév",
    TargetRowTagRequired: "Meg kell adnia az XML rekord azonositó cimkét",
    Targets: "Célok",
    TargetScope: "Cél hatókör",
    TargetWuid: "Cél/WUID",
    Terminators: "Rekord lezáró jelek",
    TestPages: "Tesztlapok",
    Text: "Szöveg",
    TheReturnedResults: "Az eredmény",
    ThorMasterAddress: "Thor Master hálózati címe",
    ThorNetworkAddress: "Thor hálózati címe",
    ThorProcess: "Thor feldolgozás",
    Time: "Idő",
    Timers: "Időzítések",
    TimeSeconds: "Idő (másodperc)",
    TimeStamp: "Időbélyeg",
    TimeStarted: "Kezdés",
    TimeStopped: "Befejezés",
    Timings: "Időzítések",
    TimingsMap: "Időzítés térkép",
    title_ActiveGroupPermissions: "Érvényes csoport hozzáférési jogok",
    title_ActivePermissions: "Érvényes jogok",
    title_Activity: "Tevékenység",
    title_AvailableGroupPermissions: "Rendelkezésre álló csoportjogok",
    title_AvailablePermissions: "Rendelkezésre álló jogok",
    title_BindingConfiguration: "Kapcsolat konfiguráció",
    title_BindingDefinition: "Kapcsolat definíció",
    title_ClusterInfo: "Csoportok",
    title_CodeGeneratorPermissions: "Kód-generátor hozzáfárási jogok",
    title_DefinitionExplorer: "Definíció böngésző",
    title_Definitions: "Definíciók",
    title_DESDL: "Dinamikus ESDL",
    title_DFUQuery: "Logikai fájlok",
    title_DFUWUDetails: "DFU munka",
    title_DirectoriesFor: "Könyvtárak a(z)",
    title_DiskUsage: "Lemez használat",
    title_ECLPlayground: "ECL teszt labor",
    title_ErrorsWarnings: "Hibák/figyelmeztetések a(z)",
    title_EventScheduleWorkunit: "Esemény ütemező",
    title_FileScopeDefaultPermissions: "Alapértelmezett fájl hozzáférési jogok",
    title_FilesPendingCopy: "Fájlok másolása folyamatban",
    title_FoundFilesFor: "Megtalált fájljai a(z)",
    title_GetDFUWorkunits: "DFU feladatok",
    title_Graph: "Gráfok",
    title_GraphPage: "Cím",
    title_Graphs: "Gráfok",
    title_GridDetails: "Változtass meg!",
    title_History: "Előzmények",
    title_HPCCPlatformECL: "ECL Watch - Kezdőlap",
    title_HPCCPlatformFiles: "ECL Watch - Fájlok",
    title_HPCCPlatformMain: "ECL Watch - Kezdőlap",
    title_HPCCPlatformOps: "ECL Watch - Műveletek",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Watch betölthető modulok",
    title_Inputs: "Bementek",
    title_LFDetails: "Logikai fájl információk",
    title_LibrariesUsed: "Felhasznált kódkönyvtárak",
    title_Log: "Log fájl",
    title_LostFilesFor: "Elveszett fájljai a(z)",
    title_LZBrowse: "Lerakatok",
    title_MemberOf: "Tagja a",
    title_Members: "Tagok",
    title_Methods: "Módszerek",
    title_OrphanFilesFor: "Elhagyott, árva fájljai a(z)",
    title_PackageParts: "Csomag részek",
    title_Permissions: "Hozzáférési jogok",
    title_PreflightResults: "Az előkészítés eredménye",
    title_QuerySetDetails: "Lekérdezés paraméterei",
    title_QuerySetErrors: "Hibák",
    title_QuerySetLogicalFiles: "Logikai fájlok",
    title_QuerySetQuery: "Lekérdezések",
    title_QuerySetSuperFiles: "Szuper fájlok",
    title_QueryTest: "Szuper fájlok",
    title_Result: "Tevékenység",
    title_Results: "Kimenet",
    title_SearchResults: "Keresés eredménye",
    title_SourceFiles: "Forrás fájlok",
    title_Topology: "Topológia",
    title_TpThorStatus: "Thor állapot",
    title_UserPermissions: "Felhasználó engedélyei",
    title_UserQuery: "Engedélyek",
    title_WorkunitScopeDefaultPermissions: "Alapértelmezett feladat hozzáfáresi jogok",
    title_WUDetails: "ECL feladat jellemzők",
    title_WUQuery: "ECL feladatok",
    To: "-ig",
    ToDate: "Dátumig",
    Toenablegraphviews: "A gráfok megjelenítéshez telepiteni kell a &lsquo;Graph View Control&rsquo; bővítményt.",
    Tooltip: "Tipp",
    TooManyFiles: "Túl sok fájl",
    Top: "Felső",
    Topology: "Topológia",
    ToSizes: "Méretig",
    TotalClusterTime: "Teljes cluster idő",
    TotalParts: "Az összes rész",
    TotalSize: "Összméret",
    TotalThorTime: "Összes Thor idő",
    TransitionGuide: "Átmenet útmutató",
    Tree: "Fa",
    Type: "Típus",
    Unbound: "bekötetlen",
    undefined: "nem definiált",
    Unknown: "Ismeretlen",
    Unlock: "Feloldott",
    Unprotect: "Védelem nélkül",
    UnsupportedIE9FF: "Nem támogatott böngészőprogram (IE <= 9, FireFox )",
    Unsuspend: "Folytat",
    Unsuspended: "Folytatva",
    Up: "Fel",
    UpdateCloneFrom: "Duplikátum frissítés forrása",
    UpdateDFs: "DFS frissítés",
    UpdateSuperFiles: "Szuper-fájl frissítés",
    Upload: "Feltöltés",
    URL: "URL",
    Usage: "Használat",
    Used: "Használva",
    User: "Felhasználó",
    UserDetails: "Felhasználó adatai",
    UserID: "Felhasználó azonosítója",
    UserLogin: "Kérem jelentkezzen be a felhasználói nevével",
    UserName: "Felhasználó neve",
    Username: "Felhasználó neve",
    UserPermissions: "Felhasználó engedélyei",
    Users: "Felhasználók",
    UseSingleConnection: "Egy kapcsolat használatával",
    Validate: "Ellenőriz",
    ValidateActivePackageMap: "Csomag-térkép ellenőrzés",
    ValidatePackageContent: "Csomag tartalom ellenőrzés",
    ValidatePackageMap: "Csomagtérkép ellenőrzés",
    ValidateResult: " =====Eredmény ellenőrzés=====",
    ValidateResultHere: "(Az ellenőrzés eredménye)",
    Value: "Érték",
    Variable: "Változó",
    VariableBigendian: "Big-endián változó",
    Variables: "Változók",
    VariableSourceType: "Forrás típus",
    Version: "Verzió",
    ViewByScope: "Megjelenítés hatókör szerint",
    Views: "Nézetek",
    Visualize: "Grafikus megjelenítés",
    WarnIfAvailableDiskSpaceIsUnder: "Figyelmeztetés, ha a szabad lemezkapacitás kevesebb mint",
    WarnIfAvailableMemoryIsUnder: "Figyelmeztetés, ha a rendelkezésre álló memória kevesebb mint",
    WarnIfCPUUsageIsOver: "Figyelmeztetés, ha a CPU használat magasabb mint",
    Warning: "Figyelmeztetés",
    Warnings: "Figyelmeztetések",
    WarnOldGraphControl: "Figyelem: A Graph Control modul elavult!",
    What: "Mit?",
    Where: "Hol?",
    Who: "Ki?",
    Width: "Szélesség",
    Workflows: "Munkafolyamat",
    Workunit: "Feladat",
    Workunits: "Feladatok",
    WorkUnitScopeDefaultPermissions: "Alapértelmezett feldolgozás-hatókör hozzáférési jogok",
    Wrap: "Csomagol (Wrap)",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid megadása kötelező!",
    WUSnapShot: "WU pillanatfelvétel",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "Keresztreferencia (XRef)",
    Year: "Év",
    YouAreAboutToBeLoggedOut: "Ön arra készül, hogy kilépjen a rendszerből ",
    YouAreAboutToDeleteBinding: "Törölni készül egy kötést. Biztos, hogy folytatni akarja?",
    YouAreAboutToDeleteDefinition: "Ön ennek a definíciónak a törlésére készül. Biztos, hogy folytatni akarja?",
    YouAreAboutToDeleteThisFile: "Ennek a fájlnak a törlésére készül. Folytatja?",
    YouAreAboutToDeleteThisPart: "Ennek/ezeknek a fájl részeknek a törlésére készül. Folytatja?",
    YouAreAboutToDeleteThisQueryset: "Ennek a lekérdezés készletnek a törlésére készül. Folytatja?",
    YouAreAboutToDeleteThisWorkunit: "Ennek a munkaegységnek a törlésére készül. Folytatja?",
    YouAreAboutToRemoveUserFrom: "Ön felhasználó(k) csoportból való törlésére készül. Kívánja folytatni?",
    YourBrowserMayNotSupport: "Előfordulhat, hogy az Ön böngészőprogramja nem támogatja az ekkora méretű fájlokat.",
    YourScreenWasLocked: "Az ESP server befagyasztotta az ön képernyőjét. Kérem frissítsen.",
    ZAP: "Z.A.P.",
    ZeroLogicalFilesCheckFilter: "Nincs a megadott feltételnek megfelelő adat! (A jó a szűrőfeltétel?)",
    Zip: "Zip",
    ZippedAnalysisPackage: "Tömörített elemzési csomag",
    Zoom: "Nagyítás",
    Zoom100Pct: "Nagyítás 100%-ra",
    ZoomAll: "Teljes gráf ablakba méretezése",
    ZoomMinus: "Kicsinyítés",
    ZoomPlus: "Nagyítás",
    ZoomWidth: "Gráf nagyítása az ablak szélességére"
});


/***/ }),

/***/ "./eclwatch/nls/pt-br/hpcc.js":
/*!************************************!*\
  !*** ./eclwatch/nls/pt-br/hpcc.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

﻿!(module.exports = {
    Abort: "Abortar",
    AbortedBy: "Abortado pelo",
    AbortedTime: "Hora de Abortar",
    About: "Sobre Plataforma HPCC",
    AboutGraphControl: "Sobre Controle de Gráphico",
    AboutHPCCSystems: "Sobre HPCC Systems",
    AboutHPCCSystemsGraphControl: "Sobre Controle de Gráphico do HPCC Systems®",
    AboutToLoseSessionInformation: "Você está prestes a sair e perder todas as informações da sessão. Você deseja continuar?",
    Account: "Conta",
    Action: "Ação",
    Activate: "Ativar",
    Activated: "Ativa",
    ActivateQuery: "Ativar Consulta",
    ActivateQueryDeletePrevious: "Ativar consulta, excluir anterior",
    ActivateQuerySuspendPrevious: "Ativar consulta, suspender anterior",
    Active: "Ativa",
    ActivePackageMap: "Package Map Ativo",
    ActiveWorkunit: "Tarefa Ativa",
    Activities: "Atividades",
    Activity: "Atividade",
    ActivityMap: "Mapa de Atividade",
    ActualSize: "Tamanho Efectivo",
    Add: "Adicionar",
    AddAttributes: "Adiciona atributos/valores para seu métedo",
    AddAttributes2: "Adiciona atributos",
    AddBinding: "Adiciona ligação",
    AddFile: "Adicionar Arquivo",
    AddGroup: "Adicionar Grupo",
    AdditionalResources: "Recursos Adicionais",
    AddPart: "Adicionar Parte",
    AddProcessMap: "Adicionar Package Map",
    AddTheseFilesToDali: "Adicionar esses arquivos a Dali",
    AddtionalProcessesToFilter: "Processos adicionais para filtrar",
    AddToExistingSuperfile: "Adicionar a um superfile existente",
    AddToSuperfile: "Adicionar ao Superarquivo",
    AddUser: "Adicionar Usuário",
    Advanced: "Avançado",
    All: "Todos",
    AllowAccess: "Permitir Acesso",
    AllowForeignFiles: "Permitir Arquivos Remotos",
    AllowFull: "Permissão Total",
    AllowRead: "Permissão de Leitura",
    AllowWrite: "Permissão de Escrita",
    AllQueuedItemsCleared: "Todos os itens em fila foram apagados. O trabalho em execução atual continuará a ser rodado",
    ANY: "Qualquer",
    AnyAdditionalProcessesToFilter: "Quaisquer processos adicionais para filtrar",
    Append: "Anexar",
    AppendCluster: "Acrescentar o Cluster",
    Apply: "Aplicar",
    ArchivedOnly: "Apenas Arquivadas",
    ArchivedWarning: "Aviso: Por favor especifique intervalos de datas menore. Caso contrário, a operação para buscar workunits pode demorar causando um erro no navegador.",
    Attach: "Anexar",
    Attribute: "Attributo",
    AttributesAreRequired: "Atributos são necessários",
    AutoRefresh: "Recarregar Automático",
    AutoRefreshEvery: "Atualização automática a cada x minutos",
    AutoRefreshIncrement: "Auto Incrementar Atualização",
    Back: "voltar",
    BannerColor: "Cor da Faixa",
    BannerMessage: "Mensagem da Faixa",
    BannerScroll: "Faixa de Paginação",
    BannerSize: "Tamanho da Faixa",
    BinaryInstalls: "Instalação Binária",
    Bind: "Ligar",
    Binding: "Ligação",
    BindingDeleted: "Ligação deletado",
    Blob: "BLOB",
    BlobPrefix: "Prefixo do BLOB",
    Bottom: "fundo",
    BoundBy: "vinculado pela:",
    Busy: "Ocupado",
    Cancel: "Cancelar",
    CancelAll: "Cancela tudo",
    CancelAllMessage: "Abortar trabalhos em execução e limpar a fila. Você deseja continuar?",
    Chart: "Gráfico",
    CheckAllNodes: "Verifique Todos os Nós",
    CheckFilePermissions: "Verifique Permissão de Arquivo",
    CheckSingleNode: "Verifique Nó Singular",
    Clear: "Limpar",
    ClearPermissionsCache: "Limpar Cache de Permissões",
    ClearPermissionsCacheConfirm: "Tem certeza que você quer limpar todos os caches de permissões dos servidores DALI e ESP? Workunits em execução podem ter a performance significantemente prejudicadas até que os caches tenham sido recarregados.",
    Clone: "Clonar",
    ClonedWUID: "WUID clonado",
    CloneTooltip: "Unidade de Trabalho Duplicado",
    Close: "Fechar",
    Cluster: "Cluster (Aglomerado)",
    ClusterName: "Nome do Aglomerado (Cluster)",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Processos de Aglomerados",
    Code: "Código",
    CodeGenerator: "Gerador de Código",
    Col: "Col",
    CollapseAll: "Recolher Tudo",
    Command: "Comando",
    Comment: "Comentário",
    Compiled: "Compilado",
    Compiling: "Compilando",
    Completed: "Completo",
    ComplexityWarning: "Mais de {limite} atividades ({Contador de atividades}) - suprimir amostragem inicial?",
    Component: "Componente",
    Compress: "Compactar",
    Compressed: "Comprimido",
    CompressedFileSize: "Tamanho do Arquivo Comprimido",
    Condition: "Condição",
    Configuration: "Configuração",
    ConfigureService: "Configurar serviço",
    ConfirmPassword: "Confirmar Senha",
    ConfirmRemoval: "Tem certeza que quer fazer isso?",
    ContactAdmin: "Se você deseja renomear este grupo, por favor, entre em contato com o administrador do LDAP",
    Content: "Conteúdo",
    Contents: "Conteúdo",
    ContentType: "Tipo de Conteúdo",
    ContinueWorking: "Contínua Trabalhando",
    Copy: "Copiar",
    CopyToClipboard: "Copiar para área de transferência",
    Count: "Conta",
    CreateANewFile: "Criar um novo superfile",
    Created: "Criado",
    CreatedBy: "Criado Por",
    CreatedTime: "Tempo Criado",
    Creating: "Criando",
    Critical: "Crítico",
    CSV: "CVS",
    Dali: "Dali",
    DaliIP: "IP do Dali",
    dataset: ":=dataset*",
    Date: "Data",
    Day: "Dia",
    Deactivate: "Desativar",
    Debug: "Debug",
    DEF: "DEF",
    Defaults: "Padrões",
    Definition: "Definição",
    DefinitionDeleted: "Definição deletada",
    DefinitionID: "Identidade de definição",
    Definitions: "Definições",
    DelayedReplication: "Replicação atrasada",
    Delete: "Remover",
    DeleteBinding: "Apagar Ligação",
    Deleted: "Removido",
    DeletedBinding: "Ligação Apagado",
    DeleteDirectories: "Remover diretórios vazios. Você deseja continuar?",
    DeleteEmptyDirectories: "Excluir diretórios vazios?",
    DeletePrevious: "Apagar Anterior",
    DeleteSelectedDefinitions: "Deletar definições selecionadas?",
    DeleteSelectedFiles: "Apagar Arquivos Selecionados?",
    DeleteSelectedGroups: "Remover Grupos Selecionados",
    DeleteSelectedPermissions: "Remover Permissões Selecionadas",
    DeleteSelectedQueries: "Apagar Consultas Selecionadas?",
    DeleteSelectedUsers: "Remover Usuários Selecionados",
    DeleteSelectedWorkunits: "Apagar Tarefas Selecionadas?",
    DeleteSuperfile: "Apagar Super Arquivo?",
    DeleteSuperfile2: "Remover Super Arquivo",
    DeleteThisPackage: "Remover Este Pacote",
    Delimited: "Delimitado",
    DenyAccess: "Bloquear",
    DenyFull: "Bloquear Completamente",
    DenyRead: "Bloquear Leitura",
    DenyWrite: "Bloquear Escrita",
    Depth: "Profundidade",
    DepthTooltip: "Profundidade Máxima de Subgrafo",
    Deschedule: "Desagendar",
    DescheduleSelectedWorkunits: "Desagendar Unidades de Trabalho Selecionadas",
    Description: "Descrição",
    DESDL: "Dynamic ESDL",
    Despray: "Despray (Consolidar Dados dos Nós)",
    Details: "Detalhes",
    DFUServerName: "Nome do Servidor DFU",
    DFUWorkunit: "DFU Unidade de Trabalho",
    Directories: "Diretórios",
    Directory: "Diretório",
    DisableScopeScanConfirm: "Tem certeza que quer desabilitar busca de escopo? Alterações de configuração serão aplicadas quando DALI reiniciar.",
    DisableScopeScans: "Desabilitar busca de escopo",
    DiskUsage: "Uso de disco",
    Distance: "Distancia",
    DistanceTooltip: "Distância a vizinhança de máxima atividade",
    Dll: "Dll (Biblioteca de Vínculo Dinâmico)",
    Documentation:  "Documentação",
    DoNotActivateQuery: "Não ative a consulta",
    DoNotRepublish: "Não republicar?",
    DOT: "DOT",
    DOTAttributes: "Propriedades de DOT",
    Down: "Pra baixo",
    Download: "Baixar",
    Downloads: "Abaixamentos",
    DownloadToCSV: "Transferir para o CSV",
    DropZone: "Zona de entrada de arquivos",
    DueToInctivity: "Você será desconectado de todas as sessões do ECL Watch em 3 minutos devido a inatividade.",
    Duration: "Duração",
    DynamicNoServicesFound: "Nenhum Serviço Encontrado",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "O ECL Watch requer cookies habilitados para continuar.",
    ECLWatchSessionManagement: "Gerenciamento de sessão do ECL Watch",
    ECLWorkunit: "ECL Unidade de Trabalho",
    Edges: "Bordas",
    Edit: "Alterar",
    EditDOT: "Editar DOT",
    EditGraphAttributes: "Editar Propriedades do Gráfico",
    EditXGMML: "Editar XGMML",
    EmployeeID: "ID do Empregado",
    Empty: "Vazio",
    Enable: "Ativar",
    EnableScopeScans: "Ativar busca de escopo",
    EnableScopeScansConfirm: "Tem certeza que gostaria de ativar busca de escopo? Alterações serão aplicadas quando DALI reiniciar.",
    EnglishQ: "Inglês?",
    EnterAPercentage: "Digite uma porcentagem",
    EnterAPercentageOrMB: "Digite uma porcentagem ou MB",
    EraseHistory: "Apagar História",
    EraseHistoryQ: "Apagar o histórico para",
    Error: "Erro",
    Errorparsingserverresult: "Erro interpretando o resultado do servidor",
    Errors: "Erros",
    ErrorsStatus: "Erros/Estados",
    ErrorUploadingFile: "Erro ao carregar arquivos. Tente verificar permissões.",
    ErrorWarnings: "Error/Aviso(s)",
    Escape: "Escapar",
    ESPBuildVersion: "Versão‎ do ESP",  // jshint ignore:line
    ESPNetworkAddress: "Endereço de Rede do ESP",
    ESPProcessName: "Nome do Processo ESP",
    EventName: "Nome do Evento",
    EventNamePH: "Nome do Evento",
    EventScheduler: "Gerenciador de Evento",
    EventText: "Texto do Evento",
    EventTextPH: "Texto do Evento",
    Exception: "Exceção",
    Executed: "Executado",
    Executing: "Executando",
    ExpandAll: "Expandir Tudo",
    ExpireDays: "Expira em (dias)",
    Export: "Exportar",
    ExportSelectionsToList: "Exportar Seleções para Lista",
    FailIfNoSourceFile: "Falha em caso de arquivo sem fonte",
    Fatal: "Fatal",
    Fetched: "Buscado",
    FetchingData: "Buscando dados...",
    fetchingresults: "Buscando Resultados",
    File: "Arquivo",
    FileCluster: "Arquivos Cluster",
    FileCounts: "Número de Arquivos",
    FileName: "Nome do Arquivo",
    FileParts: "Partes do Arquivo",
    FilePath: "Caminho e nome do Arquivo",
    FilePermission: "Permissão de Arquivo",
    Files: "Arquivos",
    FileScopeDefaultPermissions: "Permissão Padrão de Arquivo Escopo",
    FileScopes: "Escopo de arquivos",
    FileSize: "Tamanho do Arquivo",
    FilesNoPackage: "Arquivos sem definição de pacotes.",
    FilesPending: "Arquivos pendentes",
    FilesWarning: "O número de arquivos retornados é muito grande. Apenas os primeiros 100.000 arquivos classificados por data / hora modificados foram retornados. Se você deseja limitar os resultados, defina um filtro.",
    FilesWithUnknownSize: "Arquivos com tamanho desconhecido",
    FileType: "Tipo de Arquivo",
    FileUploader: "Uploader(Enviador) de Arquivo",
    FileUploadStillInProgress: "Carregamento de Arquivo em andamento",
    Filter: "Filtro",
    FilterSet: "Conjunto Filtro",
    Find: "Busca",
    FindNext: "Próxima Busca",
    FindPrevious: "Busca Anterior",
    Finished: "Completo",
    FirstN: "Primeiro N",
    FirstName: "Primeiro Nome",
    FirstNRows: "Primeiras N Linhas",
    Fixed: "Fixo",
    Folder: "Pasta",
    Format: "Formato",
    Forums: "Bate Papos",
    Forward: "Avançar",
    FoundFile: "Arquivo Encontrado",
    FoundFileMessage: "Um arquivo encontrado tem todas as suas partes no disco que não são referenciadas no servidor Dali. Todas as partes do arquivo são contabilizadas para que possam ser adicionadas de volta ao servidor Dali. Eles também podem ser excluídos do cluster, se for necessário.",
    FromDate: "Data Inicial",
    FromSizes: "Tamanho Mínimo",
    FromTime: "Tempo inicial",
    FullName: "Nome Completo",
    Generate: "Gerar",
    GetPart: "Obter Parte",
    GetSoftwareInformation: "Obter Informações de Software",
    Graph: "Grafo",
    GraphControl: "Controle Gráfico",
    Graphs: "Gráficos",
    GraphView: "Visão Gráfica",
    Group: "Grupo",
    GroupBy: "Agrupado por",
    GroupDetails: "Detalhe de Grupo",
    Grouping: "Agrupar",
    GroupName: "Nome do Grupo",
    GroupPermissions: "Permissões de Grupo",
    Groups: "Grupos",
    GZip: "GZip",
    help: "Essa area exibi o mapas de arvores (hierarquias) para o gráfico dessa tarefa. O tamanho e cor indicam a duração de cada gráfico (Quanto maior e mais escuro mais tempo levou)",
    Helper: "Ajudante",
    Helpers: "Ajudantes",
    Hex: "Hex",
    HexPreview: "Pré-visualização Hex",
    HideSpills: "Esconde Derramamentos",
    High: "Alto",
    History: "História",
    HPCCSystems: "HPCCSystems",
    Icon: "Ícone",
    ID: "Identidade",
    Inactive: "Inativo",
    IncludeSlaveLogs: "Incluie logs escravos",
    Index: "Índice",
    Info: "Info",
    InfoDialog: "Caixa de Informação",
    InheritedPermissions: "Permissão Herdada",
    Inputs: "Insumos",
    InvalidResponse: "(resposta inválida)",
    InvalidUsernamePassword: "Nome de usuário ou senha inválidos, tente novamente.",
    IP: "IP",
    IPAddress: "Endereço IP",
    IsCompressed: "É Comprimido",
    IsLibrary: "Biblioteca?",
    IsReplicated: "É Replica?",
    IssueReporting: "Reportagem de Problemas",
    Jobname: "Nome da Tarefa",
    JobName: "Nome da Tarefa",
    jsmi: "jsmi*",
    JSmith: "JSilva*",
    JSON: "JSON",
    KeyFile: "Arquivo Chave",
    Label: "Rótulo de Texto",
    LandingZone: "Zona de Entrada de Arquivos",
    LandingZones: "Zona de entrada de arquivos",
    LanguageFiles: "Arquivo de Línguas",
    Largest: "Maior",
    LargestFile: "Maior Arquivo",
    LargestSize: "Maior Tamanho",
    LastEdit: "Última Edição",
    LastEditedBy: "Última Edição Por:",
    LastEditTime: "Última Hora de Edição",
    LastMessage: "Última Mensagem",
    LastName: "Sobrenome",
    LastNDays: "Ultimos N Dias",
    LastNHours: "Últimas N Horas",
    LastNRows: "Últimas N Filas",
    LastRun: "Última Rodada",
    LDAPWarning: "<b>Error do serviço de LDAP</b> &lsquo;Número de usuários excedido&rsquo;. Por favor use um filtro.",
    LearnMore: "Saber Mais",
    LegacyForm: "Formato Antigo",
    Legend: "Lenda",
    LibrariesUsed: "Usa Biblioteca?",
    LibraryName: "Nome da biblioteca",
    Line: "Linha",
    LineTerminators: "Terminador de linhas",
    Links: "Ligações",
    Loading: "Carregando",
    LoadingCachedLayout: "Carregando diagrama do cache",
    LoadingData: "Carragando Dados...",
    loadingMessage: "...carregando...",
    LoadPackageContentHere: "(Carregue conteúdo de pacote aqui)",
    LoadPackageFromFile: "Carregar pacote de arquivo",
    Local: "Local",
    LocalFileSystemsOnly: "Somente Sistemas de Arquivos Locais",
    Location: "Localização",
    Lock: "Bloquear",
    Log: "Registro",
    log_analysis_1: "log_analysis_1*",
    LogFile: "Arquivo de log",
    LoggedInAs: "Entrou no sistema como",
    LoggingOut: "Fazendo um Logout",
    LogicalFile: "Arquivo Lógico",
    LogicalFiles: "Arquivos Lógicos",
    LogicalFilesAndSuperfiles: "Arquivos (super e lógicos)",
    LogicalFilesOnly: "Somente arquivos lógicos",
    LogicalFileType: "Tipo de Arquivo Lógico",
    LogicalName: "Nome Lógico",
    Login: "Fazer um Login",
    Logout: "Fazer um Logout",
    Logs: "Registros",
    LogVisualization: "Visualização de Log",
    LogVisualizationUnconfigured: "Visualização de Registro não está configurado, por favor, verifique as configurações do gerenciador de confguração",
    LostFile: "Arquivo perdido",
    LostFile2: "Arquivos perdidos",
    LostFileMessage: "Um arquivo lógico que está faltando pelo menos uma parte de arquivo em ambos os locais primário e replicado em armazenamento. O arquivo lógico ainda é referenciado no servidor Dali. A exclusão do arquivo remove a referência do servidor Dali e de quaisquer partes restantes no disco.",
    Low: "Baixo",
    MachineInformation: "Informação da máquina",
    Machines: "Máquinas",
    Major: "Principal",
    ManagedBy: "Gerenciado Por",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=usuários,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "Pressione Ctrl+C",
    ManualOverviewSelection: "(Seleção manual será necessária)",
    ManualTreeSelection: "(Seleção manual de árvore será requerida)",
    Mappings: "Mapeamento",
    Mask: "Mask (bloqueador de caracteres)",
    Max: "Max",
    MaximumNumberOfSlaves: "Numero de esclavo",
    MaxNode: "Nó Max",
    MaxRecordLength: "Maximo tamanho do registro",
    MaxSize: "Tamanho máximo",
    MaxSkew: "Viás Max",
    MemberOf: "Membro de",
    Members: "Membros",
    Message: "Mensagem",
    MethodConfiguration: "Configuração do Método",
    Methods: "Métodos",
    Min: "Min",
    Mine: "Meu",
    MinNode: "Nó Min",
    Minor: "Menor",
    MinSize: "Tamanho mínimo",
    MinSkew: "Viás Min",
    Missing: "Não encontrado",
    MixedNodeStates: "Estados de Nós misturados",
    Modification: "Modificação",
    Modified: "Modificado",
    ModifiedUTCGMT: "Modificado (UTC/GMT)",
    Modify: "Modificar",
    MonitorEventName: "Nome do Evento do Monitorador",
    Monitoring: "Monitorador",
    MonitorShotLimit: "Limite do Monitorador",
    MonitorSub: "Sub do Monitorador",
    Month: "Mês",
    More: "Mais",
    MustContainUppercaseAndSymbol: "Deve conter símbolo e caracteres maiúsculos",
    NA: "Não Aplicável",
    Name: "Nome",
    NamePrefix: "Prefixo de nome",
    NamePrefixPlaceholder: "algum::prefixo",
    Newest: "Mais recente",
    NewPassword: "Senha Nova",
    NoContent: "(sem conteúdo)",
    noDataMessage: "... Zero linhas...",
    Node: "Nó (Node)",
    NodeGroup: "Grupo de Nós",
    NoErrorFound: "Nenhum Erro Encontrado",
    NoFilterCriteriaSpecified: "Filtro não especificado",
    None: "Nenhum",
    NoPublishedSize: "Nenhum tamanho publicado",
    Normal: "Normal",
    NoScheduledEvents: "Eventos agendados não encontrados",
    NoSplit: "Sem Separador",
    NotActive: "Inativo",
    NothingSelected: "Nada Selecionado",
    NotInSuperfiles: "Não encontrado em super arquivo",
    NotSuspendedbyUser: "Não suspenso por usuário",
    NoWarningFound: "Nenhuma Advertência Encontrada",
    NumberofParts: "Numero de Partes",
    NumberofSlaves: "Número de Escravos",
    OK: "Aceitar",
    Oldest: "Mais Antigo",
    OldPassword: "Senha antiga",
    OmitSeparator: "Omitir Separador",
    Only1PackageFileAllowed: "Somente one arquivo de pacote permitido",
    Open: "Abrir",
    OpenInNewPage: "Abrir em página nova",
    OpenInNewPageNoFrame: "Abrir em página nova (sem quadro)",
    OpenLegacyECLWatch: "Abrir Antigo ECL Watch",
    OpenLegacyMode: "Modo Legado Aberto",
    OpenNativeMode: "Modo Nativo Aberto",
    OpenSafeMode: "Abrir em Modo de Segurança",
    OpenSource: "Código Público",
    OpenTreeMode: "Abrir (modo árvore)",
    Operation: "Operação",
    Operations: "Operações",
    Options: "Opções",
    OriginalFile: "Arquivo Originál",
    OrphanFile: "Arquivos órfãos",
    OrphanFile2: "Arquivo órfão",
    OrphanMessage: "Um arquivo órfão tem partes de arquivo parcial no disco. No entanto, um conjunto completo de peças não está disponível para construir um arquivo lógico e completo. Isso não faz referência a essas partes de arquivo no servidor Dali.",
    Outputs: "Resultados",
    Overview: "Visão Geral",
    Overwrite: "Sobrescrever",
    OverwriteMessage: "Alguns arquivos já existem. Selecione opção de escrever por cima para continuar.",
    Owner: "Proprietário",
    PackageContent: "Conteúdo de pacote",
    PackageContentNotSet: "Conteúdo de pacote não definido",
    PackageMap: "Mapa de Pacotes",
    PackageMaps: "Mapas do Pacote de Dados",
    PackagesNoQuery: "Pacotes sem queries",
    ParameterXML: "Parametro XML",
    Part: "Parte",
    PartMask: "Parte Máscara",
    PartName: "Nome da Parte",
    Parts: "Partes",
    PartsFound: "Pedaços Encontradas",
    PartsLost: "Pedaços Perdidas",
    Password: "Senha",
    PasswordExpiration: "Validade da Senha",
    PasswordExpired: "Sua senha não é mais válida. Por favor altere agora.",
    PasswordExpirePostfix: "dia(s). Quer trocar agora?",
    PasswordExpirePrefix: "Senha válida até",
    PasswordOpenZAP: "Senha para abrir ZAP (opicional)",
    PasswordsDoNotMatch: "Senhas não são as mesmas",
    Path: "Caminho",
    PathMask: "Bloqueador do Caminho",
    Pause: "Pausar",
    PauseNow: "Pausar agora",
    PctComplete: "% Completo",
    PercentCompressed: "Percentagem Comprimida",
    PercentDone: "Percentual Completo",
    PerformingLayout: "Executando Layout...",
    Permission: "Permissão",
    PermissionName: "Nome da Permissão",
    Permissions: "Permissões",
    PhysicalFiles: "Arquivos Físicos",
    PlaceholderFindText: "Wuid, Usuário‎, Mais...",  // jshint ignore:line
    PlaceholderFirstName: "João",
    PlaceholderLastName: "da Silva",
    Playground: "Area de Recreio",
    PleaseEnableCookies: "O ECL Watch requer cookies habilitados para continuar.",
    PleaseEnterANumber: "Por favor digite o número 1 -",
    PleaseLogin: "Por favor, faça o login usando seu nome de usuário e senha",
    PleaseLogIntoECLWatch: "Por favor, faça o login no ECL Watch",
    PleasePickADefinition: "Por favor, escolha uma definição",
    PleaseSelectADynamicESDLService: "Selecione um serviço ESDL dinâmico",
    PleaseSelectAGroupToAddUser: "Por favor, selecione um grupo para adicionar o usuário a",
    PleaseSelectAServiceToBind: "Por favor, selecione um serviço para ligar",
    PleaseSelectATopologyItem: "Selecione um alvo, serviço ou máquina.",
    PleaseSelectAUserOrGroup: "Por favor selecione um usário ou grupo junto com um nome de arquivo",
    PleaseSelectAUserToAdd: "Por favor, selecione um usuário para adicionar",
    Plugins: "Plugins",
    Port: "Porta",
    Prefix: "Prefixo",
    PrefixPlaceholder: "&lsquo;nomedoarquivo{:comprimento}, tamanho{:[B|L][1-8]}&rsquo;",
    Preflight: "Pré-vôo",
    PreloadAllPackages: "Precarregar Todos os Pacotes",
    PreserveCompression: "Manter Arquivo Comprimido",
    Preview: "Prévia",
    PrimaryLost: "Principal Perdido",
    PrimaryMonitoring: "Monitorador Principal",
    Priority: "Prioridade",
    Process: "Processo",
    Processes: "Processos",
    ProcessFilter: "Filtro de Processo",
    ProcessorInformation: "Informações do Processador",
    ProgressMessage: "Mensagem de Progresso",
    Properties: "Propriedades",
    Property: "Propriedade",
    Protect: "Proteger",
    Protected: "Protegido",
    Publish: "Publicado",
    Published: "Publicado",
    PublishedBy: "Publicado por",
    PublishedByMe: "Publicado por mim",
    PublishedQueries: "Consultas de ECL Publicadas",
    PushEvent: "Evento de publicação",
    Quarter: "Quarto",
    Queries: "Consultas ECL",
    QueriesNoPackage: "Queries sem pacote",
    Query: "Consulta",
    QueryDetailsfor: "Detalhes para",
    QueryID: "Identidade de Consulta",
    QueryIDPlaceholder: "some?q*ry.1",
    QueryName: "Nome da Query",
    QueryNamePlaceholder: "Minha?Su?erQ*ry",
    QuerySet: "Grupo de Consultas",
    Queue: "Fila",
    Quote: "Aspas",
    QuotedTerminator: "Terminador em Aspas",
    RawTextPage: "Texto original (página atual)",
    Ready: "Pronto",
    ReallyWantToRemove: "Realmente quer remover?",
    ReAuthenticate: "Reautenticar para desbloquear",
    RecordCount: "Numero de Registros",
    RecordLength: "Tamanho do Registro",
    Records: "Registros",
    RecordSize: "Tamanho do Registro",
    RecordStructurePresent: "Estrutura de registro disponível",
    Recover: "Recuperar",
    RecoverTooltip: "Reniciar unidade de trabalho pausado / bloqueado",
    RecreateQuery: "Recriar consulta",
    Recycling: "Reciclando",
    RedBook: "Livro Vermelho",
    Refresh: "Recarregar",
    ReleaseNotes: "Notas de Versão",
    Reload: "Recarregar",
    Remaining: "Faltando",
    RemoteCopy: "Cópia Remota",
    RemoteDali: "Dali Remota",
    RemoteDaliIP: "IP Dali Remoto",
    Remove: "Remover",
    RemoveAttributeQ: "Você está prestes a remover esse atributo. Você tem certeza de que quer fazer isso?",
    RemoveAtttributes: "Remover Atributo (s)",
    RemovePart: "Remover parte",
    RemoveSubfiles: "Remover sub-arquivo(s)",
    RemoveSubfiles2: "Remover sub-arquivo(s)?",
    RemoveUser: "Você está próximo de remover-se do grupo",
    Rename: "Renomear",
    RenderedSVG: "Rendered SVG",
    RenderSVG: "Renderização SVG",
    Replicate: "Replicar",
    ReplicatedLost: "Replicado Perdido",
    ReplicateOffset: "Replicar o Deslocamento",
    ReportAnError: "Comunicar um Erro",
    ReportError: "Reportar Erro",
    RepresentsASubset: "Representar un subconjunto de todas los casamientos. Usando un filtro correcto puede reducir el numero de casamientos",
    RequestSchema: "Schema da Busca",
    RequiredForXML: "Manditório para spray de dados em XML",
    Reschedule: "Reagendar",
    Reset: "Limpar",
    ResetThisQuery: "Restaurar esta Pesquisa?",
    ResetViewToSelection: "Restaurar Visão da seleção",
    Resource: "Recurso",
    Resources: "Recursos",
    ResponseSchema: "Schema da Resposta",
    Restart: "Reiniciar",
    Restarted: "Recomeçar",
    Restore: "Restaurar",
    Resubmit: "Resubmeter",
    Resubmitted: "Submeter de novo",
    ResubmitTooltip: "Submeter unidade de trabalho de novo",
    Results: "Resultado(s)",
    Resume: "Continue",
    RetainSuperfileStructure: "Preservar Estrutura do Super Arquivo",
    RetypePassword: "Digite senha de novo",
    Reverse: "Reverter",
    RowPath: "linha de acesso",
    Rows: "Linhas",
    RowTag: "Nome da Linha",
    RoxieCluster: "Roxie Cluster (Aglomerado)",
    RoxieFileCopy: "Estado de Cópia de Archivos Roxie",
    RunningServerStrain: "Executar este processo pode demorar muito tempo e vai sobrecarregar os servidores. Você quer continuar?",
    Sample: "Amostra",
    SampleRequest: "Amostra da Busca",
    SampleResponse: "Amostra de Resposta",
    Save: "Salvar",
    Scope: "Escopo",
    SearchResults: "Resultado da Busca",
    SecondsRemaining: "Segundos Restantes",
    Security: "Segurança",
    SelectPackageFile: "Selecione pacote que arquivos",
    Separators: "Seperadores",
    Server: "Servidor",
    ServiceName: "Nome do Serviço",
    Services: "Serviços",
    SetBanner: "Fixar Banner",
    SetTextError: "Erro para mostrar texto(muito longo?)  Use &lsquo;ajuda&rsquo; para baixar",
    SetToFailed: "Indicar como Falhado",
    Severity: "Severidade",
    Show: "Exibir",
    ShowProcessesUsingFilter: "Mostrar processos usando filtro",
    ShowSVG: "Mostrar SVG",
    Size: "Tamanho",
    Skew: "Distorção",
    SkewNegative: "Inclinar (-)",
    SkewPositive: "Inclinar (+)",
    SLA: "SLA",
    SlaveLogs: "Logs escravos",
    SlaveNumber: "Numero de esclavo",
    Slaves: "Escravos",
    Smallest: "Menor",
    SmallestFile: "Arquivo Menor",
    SmallestSize: "Menor tamanho",
    SOAP: "SOAP",
    SomeDescription: "Alguma descrição",
    somefile: "*::algum_arquivo*",
    Source: "Fonte",
    SourceCode: "Código Fonte",
    SourceLogicalFile: "Nome Lógica do arquivo Fonte",
    SourcePath: "fonte de acesso",
    SourceProcess: "fonte de processo",
    Spill: "Regar",
    SplitPrefix: "Prefixo de separação",
    Spray: "Spray (Distribuir aos Nós)",
    Start: "Começar",
    Started: "Início",
    Starting: "Iniciando",
    State: "Estado",
    Stats: "Estatísticas",
    Status: "estado",
    Stopped: "Parado",
    Stopping: "Parando",
    StorageInformation: "Informações de armazenamento",
    Subgraph: "Sugrafo",
    Subgraphs: "Subgráfico",
    Submit: "Submeter",
    Subtype: "Subtipo",
    SuccessfullySaved: "Guardado com sucesso",
    Summary: "Resumo",
    SummaryMessage: "Mensagem de Resumo",
    Superfile: "Super Arquivo",
    SuperFile: "Super Arquivo",
    Superfiles: "Super Arquivos",
    SuperFiles: "Super Arquivos",
    SuperFilesBelongsTo: "Membro do(s) Super Arquivo(s)",
    SuperfilesOnly: "Apenas Super Arquivos",
    SuperOwner: "Dono Super",
    Suspend: "Suspender",
    Suspended: "Suspendido",
    SuspendedBy: "Suspendido por",
    SuspendedByCluster: "Interrompido pelo Bloco",
    SuspendedByUser: "Interrompido pelo Usuário",
    SuspendedReason: "Razão para interrupção",
    SVGSource: "Fonte de SVG",
    Sync: "Sync",
    SyncSelection: "Sincronizar seleção",
    SystemServers: "Servidores do Sistema",
    Table: "Tabela",
    tag: "tag",
    Target: "Destino",
    TargetClusters: "Aglomeragos de Destino(Alvos)",
    TargetName: "Nome do Destino",
    TargetNamePlaceholder: "algum::lógico::arquivo",
    TargetRowTagRequired: "Tag Obrigatório de Registro de Destino",
    Targets: "Alvos",
    TargetScope: "Escopo de Destino",
    TargetWuid: "Unidade de trabalho alvo",
    Terminators: "Terminadores",
    TestPages: "Páginas de Teste",
    Text: "Texto",
    TheReturnedResults: "Os Resultados Devolvidos",
    ThorMasterAddress: "Endereço de metre thor",
    ThorNetworkAddress: "Endereço de Rede do Thor",
    ThorProcess: "Processo de Thor",
    Time: "Tempo",
    Timers: "Controladores de tempo",
    TimeSeconds: "Tempo (Segundos)",
    TimeStamp: "Timestamp",
    TimeStarted: "Início",
    TimeStopped: "Fim",
    Timings: "Medidas de Tempo",
    TimingsMap: "Mapa das Medidas de Tempo",
    title_ActiveGroupPermissions: "Permissão de Grupo Ativo",
    title_ActivePermissions: "Permissão Ativo",
    title_Activity: "Atividate",
    title_AvailableGroupPermissions: "Permissão de Grupos Disponiveis",
    title_AvailablePermissions: "Permissão Disponiveis",
    title_BindingConfiguration: "Configuração de Ligação",
    title_BindingDefinition: "Definição de Ligação",
    title_ClusterInfo: "grupos",
    title_CodeGeneratorPermissions: "Permissões de Gerador de Código",
    title_DefinitionExplorer: "Explorador de definição",
    title_Definitions: "Definições",
    title_DESDL: "ESDL dinâmica",
    title_DFUQuery: "Arquivos Lógicos",
    title_DFUWUDetails: "Tarefa DFU",
    title_DirectoriesFor: "Diretórios para",
    title_DiskUsage: "uso de disco",
    title_ECLPlayground: "ECL Playground",
    title_ErrorsWarnings: "Erros / Avisos para",
    title_EventScheduleWorkunit: "Escalonador de eventos",
    title_FileScopeDefaultPermissions: "Permissão Padrão de Arquivos",
    title_FilesPendingCopy: "Arquivos pendentes de cópia",
    title_FoundFilesFor: "Arquivos encontrados para",
    title_GetDFUWorkunits: "Tarefas DFU",
    title_Graph: "Gráficos",
    title_GraphPage: "Título",
    title_Graphs: "Gráficos",
    title_GridDetails: "Mude-me",
    title_History: "História",
    title_HPCCPlatformECL: "ECL Watch - Página Inicial",
    title_HPCCPlatformFiles: "ECL Watch - Arquivos",
    title_HPCCPlatformMain: "ECL Watch - Página Inicial",
    title_HPCCPlatformOps: "ECL Watch - Operações",
    title_HPCCPlatformOpsWidget: "ECL Watch - Operações",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Watch - Adaptadores",
    title_Inputs: "Entradas",
    title_LFDetails: "Detalhes dos Arquivos Lógicos",
    title_LibrariesUsed: "Bibliotecas usadas",
    title_Log: "arquivo de registro",
    title_LostFilesFor: "Arquivos perdidos para",
    title_LZBrowse: "Zona de Entrada de Arquivos",
    title_MemberOf: "Membros de",
    title_Members: "Membros",
    title_Methods: "Métodos",
    title_OrphanFilesFor: "Arquivos órfãos para",
    title_PackageParts: "Pacote de peças",
    title_Permissions: "Permissões",
    title_PreflightResults: "Resultados Pré-vôo",
    title_QuerySetDetails: "Detalhes da Consulta ECL",
    title_QuerySetErrors: "Erros",
    title_QuerySetLogicalFiles: "Arquivos Lógicos",
    title_QuerySetQuery: "Consultas ECL",
    title_QuerySetSuperFiles: "Super Arquivos",
    title_QueryTest: "Super Arquivos",
    title_Result: "Resultados",
    title_Results: "Atividade",
    title_SearchResults: "Resultados de busca",
    title_SourceFiles: "Arquivo(s) da Fonte",
    title_Topology: "Topologia",
    title_TpThorStatus: "Estado de Thor",
    title_UserPermissions: "Permissões de usuário",
    title_UserQuery: "Permissões",
    title_WorkunitScopeDefaultPermissions: "Permissão Padrão de Unidades de Trabalho",
    title_WUDetails: "Detalhes da Tarefa ECL",
    title_WUQuery: "Tarefas de ECL",
    To: "Para",
    ToDate: "Data Final",
    Toenablegraphviews: "Para ativar visão gráfica, por favor instalar o plugin",
    Tooltip: "Dica de Ferramenta",
    TooManyFiles: "Inumeros Arquivos",
    Top: "Topo",
    Topology: "Topologia",
    ToSizes: "Tamanho Máximo",
    TotalClusterTime: "Tempo total do bloco",
    TotalParts: "Pedaços totais",
    TotalSize: "Tamanho total",
    TotalThorTime: "Tempo Total do Thor",
    TransitionGuide: "Guia de transição",
    Tree: "Árvore",
    Type: "Tipo",
    Unbound: "Desvinculado",
    undefined: "Indefinido",
    Unknown: "Desconhecido",
    Unlock: "Desbloquear",
    Unprotect: "Desprotege",
    UnsupportedIE9FF: "Não Supportado",
    Unsuspend: "Reativar",
    Unsuspended: "Reativado",
    Up: "Cima",
    UpdateCloneFrom: "Atualizar clone de",
    UpdateDFs: "Atualizar o DFS",
    UpdateSuperFiles: "Actualizar superfile",
    Upload: "Enviar",
    URL: "URL",
    Usage: "Uso",
    Used: "Usado",
    User: "Usuário",
    UserDetails: "Detalhes do usuário",
    UserID: "Identificação do usurario",
    UserLogin: "Por favor, faça o login usando apenas o seu nome de usuário",
    Username: "Nome do usuário",
    UserName: "Nome do usuário",
    UserPermissions: "Permissão do Usuário",
    Users: "Usuários",
    UseSingleConnection: "Usar Conexão Única",
    Validate: "Validar",
    ValidateActivePackageMap: "Validar pacote de mapa ativo",
    ValidatePackageContent: "Validar pacote de conteúdo",
    ValidatePackageMap: "Validar pacote de mapa",
    ValidateResult: "=====Validar Resultado=====\n\n",
    ValidateResultHere: "Validar resultados",
    Value: "Valor",
    Variable: "Variável",
    VariableBigendian: "Variavel Big-edian",
    Variables: "Variáveis",
    VariableSourceType: "Tipo de fonte",
    Version: "Versão",
    ViewByScope: "Visão por escopo",
    Views: "Visões",
    Visualize: "Visualizar",
    WarnIfAvailableDiskSpaceIsUnder: "Avisar se o espaço disponível em disco estiver abaixo de",
    WarnIfAvailableMemoryIsUnder: "Avisar se a memória disponível está abaixo de",
    WarnIfCPUUsageIsOver: "Avisar se o uso da CPU está além",
    Warning: "Atenção",
    Warnings: "Avisos",
    WarnOldGraphControl: "Alerta: Controle de grafico velho",
    What: "O que",
    Where: "Onde",
    Who: "Quem",
    Width: "Largura",
    Workflows: "Fluxo de Trabalho",
    Workunit: "Tarefa",
    Workunits: "Tarefas",
    WorkUnitScopeDefaultPermissions: "Permisos por defect de alcaces de Workunit",
    Wrap: "Embrulho",
    WSDL: "WSDL",
    WUID: "WUID",
    Wuidcannotbeempty: "Wuid não pode estar vazia",
    WUSnapShot: "Instantâneo de WU",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "XRef",
    Year: "Ano",
    YouAreAboutToBeLoggedOut: "Você está prestes a ser desconectado",
    YouAreAboutToDeleteBinding: "Está prestes a eliminar esta ligação. Você tem certeza que quer fazer isso?",
    YouAreAboutToDeleteDefinition: "Você está prestes a deletar essa definição. Você tem certeza de que quer fazer isso?",
    YouAreAboutToDeleteThisFile: "Você está prestes a excluir este arquivo. Você tem certeza de que quer fazer isso?",
    YouAreAboutToDeleteThisPart: "Você está prestes a excluir esta(s) parte(s). Você tem certeza de que quer fazer isso?",
    YouAreAboutToDeleteThisQueryset: "Você está prestes a excluir este conjunto de consultas. Você tem certeza de que quer fazer isso?",
    YouAreAboutToDeleteThisWorkunit: "Você está prestes a excluir esta workunit. Você tem certeza de que quer fazer isso?",
    YouAreAboutToRemoveUserFrom: "Usted esta a punto de quitar un(os) usuario(s) de este grupo. ¿Desea continuar?",
    YourBrowserMayNotSupport: "O seu navegador provavelmente não supporta arquivo(s) deste tamanho",
    YourScreenWasLocked: "Sua tela foi bloqueada por ESP. Por favor re-busque seus dados, pois pode ser obsoleto.",
    ZAP: "Z.A.P",
    ZeroLogicalFilesCheckFilter: "Nenhum Arquivo Lógico (verifique filtro)",
    Zip: "Zip",
    ZippedAnalysisPackage: "Pacote de Análise Zipped",
    Zoom: "Ampliar",
    Zoom100Pct: "Ampliar 100%",
    ZoomAll: "Zoom Completo",
    ZoomMinus: "Ampliar -",
    ZoomPlus: "Ampliar +",
    ZoomWidth: "comprimento do Zoom"
});


/***/ }),

/***/ "./eclwatch/nls/sr/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/sr/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

﻿!(module.exports = {

    Abort: "Прекините",
    AbortedBy: "Прекинуто од стране",
    AbortedTime: "време прекида",
    About: "О Апликацији",
    AboutGraphControl: "О Графичкој Контроли",
    AboutHPCCSystems: "О ХПЦЦ Системс®-у",
    AboutHPCCSystemsGraphControl: "О Графичкој Контроли ХПЦЦ Система",
    AboutToLoseSessionInformation: "Ако се одјавите, изгубићете све информације о сесији. Да ли желите да наставите?",
    Account: "Рачун",
    Action: "Акција",
    Activate: "Активирајте",
    Activated: "Активиран",
    ActivateQuery: "Активирајте упит",
    ActivateQueryDeletePrevious: "Активирајте упит и избришите претходни",
    ActivateQuerySuspendPrevious: "Активирајте упит, суспендујте претходни",
    Active: "Активан",
    ActivePackageMap: "Активна Мапа Пакета",
    ActiveWorkunit: "Активна Радна Јединица",
    Activities: "Активности",
    Activity: "Активност",
    ActivityMap: "Mапа Активности",
    ActualSize: "Тачна Величина",
    Add: "Додајте",
    AddAttributes: "Додајте атрибуте / вредности вашем методу",
    AddAttributes2: "Додајте Атрибут(е)",
    AddBinding: "Додајте Везивање",
    AddFile: "Додајте Датотеку",
    AddGroup: "Додајте Групу",
    AdditionalResources: "Додатни Ресурси",
    AddPart: "Додајте део",
    AddProcessMap: "Додајте Мапу Пакета",
    AddTheseFilesToDali: "Додајте Те Датотеке на Дали",
    AddtionalProcessesToFilter: "Додатни Процеси За Филтрирање",
    AddToExistingSuperfile: "Додајте на постојећи суперфајл",
    AddToSuperfile: "Додајте на Супердатотеку",
    AddUser: "Додајте Корисника",
    Advanced: "Вишег Нивоа",
    All: "Сви",
    AllowAccess: "<center>Дозволите<br>Приступ</center>",
    AllowForeignFiles: "Дозволите Кориштење  Датотека Са Других Кластера",
    AllowFull: "<center>Дозволите<br>Потпун</center>",
    AllowRead: "<center>Дозволите<br>Читање</center>",
    AllowWrite: "<center>Дозволите<br>Писање</center>",
    AllQueuedItemsCleared: "Сви послови из реда чекања су очишћени. Тренутно активни посао наставња са извршавањем.",
    ANY: "Било Који",
    AnyAdditionalProcessesToFilter: "Има ли још процеса за филтрирање",
    Append: "Додајте",
    AppendCluster: "Додајте Кластер",
    Apply: "Примените",
    ArchivedOnly: "Само Архивиран",
    ArchivedWarning: "Упозорење: користите кратак временски период. Ако користите дужи временски период, претраживање радних јединица може трајати дуже од дозвиљеног времена за претраживање.",
    Attach: "Причврстите",
    Attribute: "Атрибут",
    AttributesAreRequired: "Атрибути су потребни",
    AutoRefresh: "Освежи",
    AutoRefreshEvery: "Аутоматско освеживање сваких к минута",
    AutoRefreshIncrement: "Аутоматски корак освежавања",
    Back: "Назад",
    BannerColor: "Боја Рекламног Блока",
    BannerMessage: "Порука за Рекламни Блок",
    BannerScroll: "Кретање Рекламног Блока",
    BannerSize: "Величина Рекламног Блока",
    BinaryInstalls: "Бинарне Инсталације",
    Bind: "Вежите",
    Binding: "Везивање",
    BindingDeleted: "Везивање Избрисанo",
    Blob: "БЛОБ",
    BlobPrefix: "БЛОБ Префикс",
    Bottom: "Крај",
    BoundBy: "ограничено од:",
    Busy: "заузет",
    Cancel: "Поништите",
    CancelAll: "Укините Све",
    CancelAllMessage: "Прекините текуће послове и очистите ред чекања. Желите ли наставити?",
    Chart: "дијаграм",
    CheckAllNodes: "Проверите све чворове",
    CheckFilePermissions: "Проверите дозволе за приступ филу",
    CheckSingleNode: "Проверите Један НОД",
    Clear: "Очистите",
    ClearPermissionsCache: "Избришите Запамћене Дозволе За Приступ",
    ClearPermissionsCacheConfirm: "Да ли сте сигурни да желите да избришете запамћене дозволе за приступ на ДАЛИ и ЕСП? То може значајно успорити извршавање радних јединица.",
    Clone: "Клонирајте",
    ClonedWUID: "Клонирани WУИД",
    CloneTooltip: "Копирање радне јединице",
    Close: "Затворите",
    Cluster: "Кластер",
    ClusterName: "Име Кластера",
    ClusterPH: "r?x*",
    ClusterPlaceholder: "r?x*",
    ClusterProcesses: "Процеси На Кластеру",
    Code: "Код",
    CodeGenerator: "Код Генератор",
    Col: "Колона",
    CollapseAll: "Сузите све",
    Command: "Команда",
    Comment: "Коментар",
    Compiled: "Компајлирано",
    Compiling: "У процесу компајлирања",
    Completed: "Комплетиран",
    ComplexityWarning: "Више од прага {threshold} активности ({activityCount}) - прекините приказ података?",
    Component: "Компонента",
    Compress: "Сабијте",
    Compressed: "Компримирани",
    CompressedFileSize: "Компримирана Величина Датотеке",
    Condition: "услов",
    Configuration: "Конфигурација",
    ConfigureService: "Сервис за Конфигурацију",
    ConfirmPassword: "Потврдите Лозинку",
    ConfirmRemoval: "Јесте ли сигурни да то желите учинити?",
    ContactAdmin: "Ако желите променити назив ове групе, контактирајте администратора ЛДАП.",
    Content: "Садржај",
    Contents: "Садржаји",
    ContentType: "Врста Садржаја",
    ContinueWorking: "Наставите са радом",
    Copy: "Копирајте",
    CopyToClipboard: "Копирај у клипборд",
    Count: "Избројте",
    CreateANewFile: "Креирајте нови суперфајл ",
    Created: "Произведен",
    CreatedBy: "Аутор",
    CreatedTime: "Време стварања",
    Creating: "У процесу креирањa",
    Critical: "Критично",
    CSV: "ЦСВ",
    Dali: "Дали",
    DaliIP: "Дали ИП адресa",
    dataset: ":=датасет*",
    Date: "Датум",
    Day: "Дан",
    Deactivate: "Искљућите",
    Debug: "Отклоните Неисправности",
    DEF: "ДЕФ",
    Defaults: "Унапред Дефинисане Вредности",
    Definition: "Дефиниција",
    DefinitionDeleted: "Дефиниција је избрисана",
    DefinitionID: "ИД",
    Definitions: "Дефиниције",
    DelayedReplication: "Одложена репликација",
    Delete: "Обришите",
    DeleteBinding: "Избришите Везивање",
    Deleted: "Избрисан",
    DeletedBinding: "Избрисано Везивање",
    DeleteDirectories: "Елиминишите празан директириј. Желите ли наставити?",
    DeleteEmptyDirectories: "Желите ли избрисати празне директорије?",
    DeletePrevious: "Избришите Претходни",
    DeleteSelectedDefinitions: "Обришите изабране дефиниције?",
    DeleteSelectedFiles: "Обришите Одабране Датотеке?",
    DeleteSelectedGroups: "Обришите одабрану(е) групу(е)?",
    DeleteSelectedPermissions: "Обришите Одабране Дозволе За Приступ",
    DeleteSelectedQueries: "Обришите Одабране Захтјеве?",
    DeleteSelectedUsers: "Обришите Одабране Кориснике?",
    DeleteSelectedWorkunits: "Обришите Одабране Радне Јединице?",
    DeleteSuperfile: "Обришите Супердатотеке?",
    DeleteSuperfile2: "Избришите Супер Датотеку",
    DeleteThisPackage: "Обришите Овај Пакет?",
    Delimited: "Разграничен",
    DenyAccess: "<center>Забраните<br>Приступ</center>",
    DenyFull: "<center>Забраните<br>Потпун</center>",
    DenyRead: "<center>Забраните<br>Читање</center>",
    DenyWrite: "<center>Забраните<br>Писање</center>",
    Depth: "Дубина",
    DepthTooltip: "&lsquo;Највећа Дубина Подграфа",
    Deschedule: "Избаците Ис Реда За Извршавање",
    DescheduleSelectedWorkunits: "Избаците Одабране Радне Јединице Из Реда За Извршавање?",
    Description: "Опис",
    DESDL: "Динамички ЕСДЛ",
    Despray: "Поново Обjедините Датотеку",
    Details: "Детаљи",
    DFUServerName: "Име ДФУ Сервера",
    DFUWorkunit: "ДФУ РаднаЈединицa",
    Directories: "директорије",
    Directory: "Директориј",
    DisableScopeScanConfirm: "Да ли сте сигурни да желите онемогућити сканирање опсега? Промене ће бити прихваћене после рестарта ДАЛИја",
    DisableScopeScans: "Онемогућите Сканирање Опсега",
    DiskUsage: "Искориштеност Диска",
    Distance: "Раздаљина",
    DistanceTooltip: "Максимална Величина Подграфа За Одабрану Активност",
    Dll: "Длл",
    Documentation: "Документација",
    DoNotActivateQuery: "Не активирајте упит",
    DoNotRepublish: "Не објављујте?",
    DOT: "ДОТ",
    DOTAttributes: "ДОТ Атрибути",
    Down: "Неактиван",
    Download: "Добавите",
    Downloads: "Преузимање",
    DownloadToCSV: "Преузмите у ЦСВ формату",
    DropZone: "Зона Пријема",
    DueToInctivity: "Бићете одјављени из свих ЕЦЛ Вач сесија за 3 минута због неактивности.",
    Duration: "Трајање",
    DynamicNoServicesFound: "Сервиси Нису Пронађени",
    EBCDIC: "ЕБЦДИK",
    ECL: "ЕЦЛ",
    ECLWatchRequiresCookies: "ЕЦЛ Вач захтијева да колачићи буду омогућени за наставак",
    ECLWatchSessionManagement: "Управљање ЕЦЛ  Вачом",
    ECLWorkunit: "ЕЦЛ РаднаЈединица",
    Edges: "Ивице",
    Edit: "Едитујте",
    EditDOT: "Едитујте ДОТ",
    EditGraphAttributes: "Едитујте Атрибуте Графова",
    EditXGMML: "Едитујте XГММЛ",
    EmployeeID: "ИД Радника",
    Empty: "(Празан)",
    Enable: "Омогућите",
    EnableScopeScans: "Омогућите Сканирање Опсега",
    EnableScopeScansConfirm: "Да ли сте сигурни да желите омогућити сканирање опсега? Промене ће бити прихваћене после рестарта ДАЛИја",
    EnglishQ: "Енглески?",
    EnterAPercentage: "Унесите проценат",
    EnterAPercentageOrMB: "Унесите Проценат или МБ",
    EraseHistory: "Избришите историју",
    EraseHistoryQ: "Избришите Историју За",
    Error: "Грешка",
    Errorparsingserverresult: "Грешка у анализи резултата са сервера",
    Errors: "Грешкe",
    ErrorsStatus: "Грешкe/Стање",
    ErrorUploadingFile: "Грешка приликом преноса фајла(а). Покушајте провјерити дозволе за пренос",
    ErrorWarnings: "Грешка/Упозорења",
    Escape: "Ескејп",
    ESPBuildVersion: "ЕСП Тренутна Верзија",
    ESPNetworkAddress: "ЕСП Нетворк Адреса",
    ESPProcessName: "Назив ЕСП процеса",
    EventName: "Име Догађаја",
    EventNamePH: "имедогађаја",
    EventScheduler: "Распоређивач Догађаја",
    EventText: "Опис Догађаја",
    EventTextPH: "Текст О Догађају",
    Exception: "Неочекивани Проблем",
    Executed: "Извршено",
    Executing: "У процесу извршавања",
    ExpandAll: "Проширите све",
    ExpireDays: "Истиче за (у данима)",
    Export: "Извезите",
    ExportSelectionsToList: "Извeзите Одабране Ствари у Листу",
    FailIfNoSourceFile: "Неуспех Уколико Датотека Не Постоји",
    Fatal: "фаталан",
    Fetched: "Преузет",
    FetchingData: "У Процесу Добављња Података...",
    fetchingresults: "добијени ресултати",
    File: "Датотека",
    FileCluster: "Кластер Фајл",
    FileCounts: "Број Датотека",
    FileName: "Име Датотеке",
    FileParts: "Дио Датотеке",
    FilePath: "Локација Датотеке",
    FilePermission: "Дозвола за приступ фајлу",
    Files: "Датотеке",
    FileScopeDefaultPermissions: "Предефинисанe дозволе за простор Фајлова",
    FileScopes: "Скоп Датотека",
    FileSize: "Величина Датотеке",
    FilesNoPackage: "Датотеке које не припадају пакету",
    FilesPending: "Датотеке у току",
    FilesWarning: "Број враћених датотека је превелики. Враћено је само првих 100.000 датотека сортираних по датуму / времену. Ако желите ограничити резултате, подесите филтер.",
    FilesWithUnknownSize: "Датотеке Са Непознатим Величинама",
    FileType: "Тип Датотеке",
    FileUploader: "Процес за премештање Датотеке на Сервер (Aплоyдер)",
    FileUploadStillInProgress: "Учитавање Датотека је у Току",
    Filter: "Филтер",
    FilterSet: "Дефинисање Филтерa",
    Find: "Нађите",
    FindNext: "Нађите Следећи",
    FindPrevious: "Нађите Претходни",
    Finished: "Завршен",
    FirstN: "Првих Н",
    FirstName: "Име",
    FirstNRows: "Првих Н Редова",
    Fixed: "Фиксни",
    Folder: "Фасцикла",
    Format: "Формат",
    Forums: "Форуми",
    Forward: "Напред",
    FoundFile: "Фајл Је Пронађен",
    FoundFileMessage: "Пронађени фајл има све своје делове на диску, или делови нису познати Дали серверу. Сви делови фајлa могу да бити додани назад на Дали серверу. Делови могу да бити и обрисани са kлaстерa aко је то потребно.",
    FromDate: "Од Датума",
    FromSizes: "Од Величине",
    FromTime: "Од Времена",
    FullName: "Име и Презиме",
    Generate: "Генеришите",
    GetPart: "Добавите Део",
    GetSoftwareInformation: "Желите ли да добијетe информације о софтверу",
    Graph: "Граф",
    GraphControl: "Контрола графика",
    Graphs: "Графикони",
    GraphView: "Слика Графикона",
    Group: "Група",
    GroupBy: "Групишите По",
    GroupDetails: "Детаљи о Групи",
    Grouping: "Груписање",
    GroupName: "Назив Групе",
    GroupPermissions: "Дозволе за Приступ Групе",
    Groups: "Групе",
    GZip: "ГЗип",
    help: "Овdе је приказан графикон извршавања ове радне јединице. Величина и нијанса указују на време извршавања сваког графикона (Већи и тамнији графикон узима већи проценат cелокупног времена извршавања.)",
    Helper: "Помоћник",
    Helpers: "Помагаћи",
    Hex: "База16",
    HideSpills: "Сакријте записе на диск",
    High: "Висок",
    History: "Историја",
    HPCCSystems: "ХПЦЦ Системс",
    Icon: "Икона",
    ID: "Идентификатор",
    Inactive: "Неактиван",
    IncludeSlaveLogs: "Укључите Извештаје Са Нодова Извршилаца",
    Index: "Индекс",
    Info: "Информација",
    InfoDialog: "Диалог Информације",
    InheritedPermissions: "Наслеђене Дозволе",
    Inputs: "Уноси",
    InvalidResponse: "(Неисправан Одговор)",
    InvalidUsernamePassword: "Неисправно корисничко име или лозинка, покушајте поново.",
    IP: "ИП",
    IPAddress: "ИП Адреса",
    IsCompressed: "Је ли Сабијен",
    IsLibrary: "Је Библиотека",
    IsReplicated: "Pеплициран",
    IssueReporting: "Извештавање о Проблемима",
    JobName: "Назив Радне Јединице",
    Jobname: "Називраднејединице",
    jsmi: "јсми*",
    JSmith: "ЈСмит*",
    JSON: "ЈСОН",
    KeyFile: "Индексирани Фајл",
    Label: "Етикета",
    LandingZone: "Зона за Претовар",
    LandingZones: "Зонe за Претовар",
    LanguageFiles: "Датотеке О Језику",
    Largest: "Највећи",
    LargestFile: "Највећа Датотека",
    LargestSize: "Највећа величина",
    LastEdit: "Последња измена",
    LastEditedBy: "Аутор последње измене",
    LastEditTime: "Време последњих промена",
    LastMessage: "Задња порука",
    LastName: "Презиме",
    LastNDays: "Последњих Н Дана",
    LastNHours: "Последњих Н Сати",
    LastNRows: "Последњих Н Редова",
    LastRun: "Задњи Ран",
    LDAPWarning: "<б>Грешка ЛДАП Сервица:</б>  &lsquo;Превише корисника&rsquo; - Молимо користите филтер.",
    LearnMore: "Научите више",
    LegacyForm: "Стари Превазиђени Формулар",
    Legend: "Легенда",
    LibrariesUsed: "Библиотеке у Кориштењу",
    LibraryName: "Име Библиотеке",
    Line: "Линија",
    LineTerminators: "Крајеви Линија",
    Links: "Линкови",
    Loading: "Учитавање...",
    LoadingCachedLayout: "Учитавање Кеширане Структуре...",
    LoadingData: "Учитавање Података...",
    loadingMessage: "...Учитавање...",
    LoadPackageContentHere: "(Добавите овамо садржај пакета)",
    LoadPackageFromFile: "Добавите Пакет из Датотеке",
    Local: "Локални",
    LocalFileSystemsOnly: "Само Локални Фајл Системи",
    Location: "Локација",
    Lock: "закључаjтe",
    Log: "Дневник (Лог)",
    log_analysis_1: "лог_аналисис_1*",
    LogFile: "Датотека Активности",
    LoggedInAs: "Пријављен као",
    LoggingOut: "Одјављивањe",
    LogicalFile: "Логичка Датотека",
    LogicalFiles: "Логичке Датотеке",
    LogicalFilesAndSuperfiles: "Логичке Датотеке и Супердатотеке",
    LogicalFilesOnly: "Само Логичке Датотеке",
    LogicalFileType: "Тип Логичке Датотеке",
    LogicalName: "Име Логичке Датотеке",
    Login: "Пријавите се",
    Logout: "Одјавитe се",
    Logs: "Дневници",
    LogVisualization: "Региструјте визуализацију",
    LogVisualizationUnconfigured: "Визуелизација логa није конфигурирана, проверите како је конфигурацијски менаџер подешен",
    LostFile: "Изгубљени Фајл",
    LostFile2: "Изгубљени Фајлови",
    LostFileMessage: "Логички фајл коме недостаје бар један део или на примарној или на реплицираној локацији на диску. Логички фајл је још увек под контролом Дали сервера. Брисање фајлa прекида контролу Дали сервера над фајлом као и над свим преосталим деловима фајлa на диску.",
    Low: "Низак",
    MachineInformation: "Информација о машине",
    Machines: "Машине",
    Major: "Главни",
    ManagedBy: "Управљан",
    ManagedByPlaceholder: "цн = ХПЦЦАдмин, ОУ = Усерс, оу = ХПЦЦ, ДЦ = Мицо, ДЦ = локални",
    ManualCopy: "Притисните Ctrl+C",
    ManualOverviewSelection: "Нопходно Је Одабрати Преглед",
    ManualTreeSelection: "Нопходно Је Одабрати Дрво",
    Mappings: "Мапирања",
    Mask: "Маска",
    Max: "Максимум",
    MaximumNumberOfSlaves: "Максималан Број Извршилаца",
    MaxNode: "Максимални НОД / чвор",
    MaxRecordLength: "Максимална Дужина Рекорда",
    MaxSize: "Максимална величина",
    MaxSkew: "Максимално изобличење",
    MemberOf: "Члан Од",
    Members: "Чланови",
    Message: "Поруке",
    MethodConfiguration: "Конфигурација метода",
    Methods: "Методи",
    Min: "Минимум",
    Mine: "Moj",
    MinNode: "Минимални НОД / чвор",
    Minor: "Миноран",
    MinSize: "Минимална Величина",
    MinSkew: "Минимално изобличење",
    Missing: "Недостаје",
    MixedNodeStates: "Сви Нодови Немају Исти Статус",
    Modification: "Промена",
    Modified: "Модификован",
    ModifiedUTCGMT: "Промењен (УТЦ/ГМТ)",
    Modify: "Промени",
    MonitorEventName: "Надгледајте Име Догађаја",
    Monitoring: "Hадгледање",
    MonitorShotLimit: "Надгледајте Шот Лимит",
    MonitorSub: "Надгледајте Суб",
    Month: "Месец",
    More: "Наставите",
    MustContainUppercaseAndSymbol: "Мораte укључити велико слово и симбол",
    NA: "Н/A",
    Name: "Име",
    NamePrefix: "Префикс Имена",
    NamePrefixPlaceholder: "неки::префиks",
    Newest: "Најнивији",
    NewPassword: "Нова Лозинка",
    NoContent: "(Без садржаја)",
    noDataMessage: "...Нема Редова...",
    Node: "Чвор (Нод)",
    NodeGroup: "Група Чворова",
    NoErrorFound: "Без нађених грешака\n",
    NoFilterCriteriaSpecified: "Критериј за филтрирање није специфициран.",
    None: "Ниједан",
    NoPublishedSize: "Величина Није Објављена",
    Normal: "Нормалан",
    NoScheduledEvents: "Нема Дефинисаних Догађаја (ивентс) на Распореду.",
    NoSplit: "Нема Подијела (Сплит)",
    NotActive: "Није Активан",
    NothingSelected: "Ништа Није Изабрано...",
    NotInSuperfiles: "Није Дио Супердатотеке",
    NotSuspendedbyUser: "Није Суспендован Од Стране Корисника",
    NoWarningFound: "Поруке Упозорења (вoрнингс) нису нађене\n",
    NumberofParts: "Број Делова",
    NumberofSlaves: "Број Извршилаца",
    OK: "OK",
    Oldest: "Најстарији",
    OldPassword: "Стара Лозинка",
    OmitSeparator: "Изоставите Сепаратор",
    Only1PackageFileAllowed: "Дозвољен је само један пакет",
    Open: "Отворен",
    OpenInNewPage: "Отворите на Новој Страници",
    OpenInNewPageNoFrame: "Отворите на Новој Страници",
    OpenLegacyECLWatch: "Отворите Стари Превазиђени ЕЦЛ Вoч",
    OpenLegacyMode: "Отворите Застарели Мод",
    OpenNativeMode: "Отворите Нормални Мод",
    OpenSafeMode: "Отворите (сигурни мод)",
    OpenSource: "Отворени Код",
    OpenTreeMode: "Отворите (као дрво)",
    Operation: "Операција",
    Operations: "Операције",
    Options: "Опције",
    OriginalFile: "Оригинална датотека",
    OrphanFile: "Непотребни Фајлови",
    OrphanFile2: "Непотребaн Фајл",
    OrphanMessage: "Непотребни фајл има неке делове на диску. Али cви делови датотеке не постоје да би се могaо комплетирати логички фајл. Не постоји референца на непостијеће делове фајлa са Дали сервера.",
    Outputs: "Излази",
    Overview: "Преглед",
    Overwrite: "Препишите",
    OverwriteMessage: "Неке Датотеке већ постоје. Да бисте наставили морате дозвилити писање преко постојећих датотека",
    Owner: "Власник",
    PackageContent: "Садржај Пакета",
    PackageContentNotSet: "Садржај Пакета није дефинисан",
    PackageMap: "Мапа Пакета",
    PackageMaps: "Мапe Пакета",
    PackagesNoQuery: "Пакети за које нису дефинисани упити (kуериз)",
    ParameterXML: "Параметар XМЛ",
    Part: "Дио",
    PartMask: "Делимична Маска",
    PartName: "Име Дела",
    Parts: "Делови",
    PartsFound: "Делови Су Пронађени",
    PartsLost: "Делови Су Изгубљени",
    Password: "Лозинка",
    PasswordExpiration: "Лозинка Истиће",
    PasswordExpired: "Ваша лозинка је истекла И мора бити промењена",
    PasswordExpirePostfix: "дан(а). Желите ли је сада променити?",
    PasswordExpirePrefix: "Ваша лозинка ће истећи за",
    PasswordOpenZAP: "Унесите Лозинку За ЗАП (необавезно)",
    PasswordsDoNotMatch: "Погрешна Лозинка.",
    Path: "Пут",
    PathMask: "Маска за Пут",
    Pause: "Пауза",
    PauseNow: "Зауставите Одмах",
    PctComplete: "% Комплетиран",
    PercentCompressed: "Процент Компресије",
    PercentDone: "Проценат Завршен",
    PerformingLayout: "Извршава Лejaут...",
    Permission: "Дозвола",
    PermissionName: "Назив Дозволе За Приступ",
    Permissions: "Дозволе за Приступ",
    PhysicalFiles: "Физички Фајлови",
    PlaceholderFindText: "Pjид (Wuid), Корисник, Даље...",
    PlaceholderFirstName: "Џон",
    PlaceholderLastName: "Смит",
    Playground: "Игралиште",
    PleaseEnableCookies: "ЕЦЛ Вач захтијева да колачићи буду омогућени за наставак",
    PleaseEnterANumber: "Унестите Број 1 -",
    PleaseLogin: "Молимо пријавите се користећи своје корисничко име и лозинку",
    PleaseLogIntoECLWatch: "Молимо пријавите се у ЕЦЛ Вач",
    PleasePickADefinition: "Изаберите дефиницију",
    PleaseSelectADynamicESDLService: "Одаберите Динамички ЕСДЛ сервис",
    PleaseSelectAGroupToAddUser: "Изаберите групу у коју желите да додате корисника",
    PleaseSelectAServiceToBind: "Изаберите Сервис за везивање",
    PleaseSelectATopologyItem: "Одаберите циљну платформу, сервис или машину.",
    PleaseSelectAUserOrGroup: "Изаберите Корисника или Групу заједно са Именом Фајла",
    PleaseSelectAUserToAdd: "Изаберите корисника којeг желите да додате",
    Plugins: "Допуне",
    Port: "Порт",
    Prefix: "Префикс",
    PrefixPlaceholder: "имедатотеке{:дужина}, величинадатотеке{:[B|L][1-8]}",
    Preflight: "Провера пре испоруке",
    PreloadAllPackages: "Учитајте све пакете",
    PreserveCompression: "Сачувајте Компресију",
    Preview: "Преглед",
    PrimaryLost: "Примарни Је Изгубљен",
    PrimaryMonitoring: "Основно Надгледање",
    Priority: "Приоритет",
    Process: "Процес",
    Processes: "Процеси",
    ProcessFilter: "Процес&nbsp;Филтер",
    ProcessorInformation: "Информација о процесору",
    ProgressMessage: "Порука о Прогресу",
    Properties: "Својства",
    Property: "Својствo",
    Protect: "Заштитите",
    Protected: "Заштићен",
    Publish: "Објавите",
    Published: "Објављен",
    PublishedBy: "Објављивач",
    PublishedByMe: "Моjи Сервиси",
    PublishedQueries: "Објављени Упити",
    PushEvent: "Пуш Догађај",
    Quarter: "Четвртина",
    Queries: "Упити",
    QueriesNoPackage: "Упити без одговарајућег пакета",
    Query: "Упит",
    QueryDetailsfor: "Детаљи о Упиту",
    QueryID: "Идентификатор Упита",
    QueryIDPlaceholder: "som?q*ry.1",
    QueryName: "Име Упита",
    QueryNamePlaceholder: "My?Su?erQ*ry",
    QuerySet: "Колекција Упита",
    Queue: "Ред (Kjу)",
    Quote: "Цитат",
    QuotedTerminator: "Завршни Карактер",
    RawTextPage: "Необрађен Текст (Текућа Страница)",
    Ready: "Cпреман",
    ReallyWantToRemove: "Заиста желите уклонити?",
    ReAuthenticate: "Молимо пријавите се опет",
    RecordCount: "Број Рекорда",
    RecordLength: "Дужина Рекорда",
    Records: "Рекорди",
    RecordSize: "Величина Рекорда",
    RecordStructurePresent: "Структура Рекорда Постоји",
    Recover: "Вратите Натраг",
    RecoverTooltip: "Покрените заустављену радну јединицу",
    RecreateQuery: "Креирај упит",
    Recycling: "Рециклажа",
    RedBook: "Црвена Књига",
    Refresh: "Освежите",
    ReleaseNotes: "Напомена о Издању",
    Reload: "Поново Учитајте",
    Remaining: "Преостали",
    RemoteCopy: "Копија са удаљеног сервера",
    RemoteDali: "Далеки Дали",
    RemoteDaliIP: "Далеки&nbsp;Дали&nbsp;ИП&nbsp;Адреса",
    Remove: "Уклоните",
    RemoveAttributeQ: "Изабрани атрибута ће бити уклоњен. Да ли сте сигурни да то желите?",
    RemoveAtttributes: "Уклоните Атрибут(е)",
    RemovePart: "Уклоните Дeо",
    RemoveSubfiles: "Уклоните Поддатотеку",
    RemoveSubfiles2: "Желите ли да уклоните субфајл(ове)?",
    RemoveUser: "Уклоните Корисника",
    Rename: "Преименујте",
    RenderedSVG: "Донесене СВГ",
    RenderSVG: "Донесите СВГ",
    Replicate: "Реплицирајте",
    ReplicatedLost: "Изгубљене Репликације",
    ReplicateOffset: "Реплицирајте Офсет",
    ReportAnError: "Пријавите грешку",
    ReportError: "Пријавите грешку",
    RepresentsASubset: "Представља подскуп од укупног броја упарених резултата .Промена филтера може смањити број упарених резултата",
    RequestSchema: "Шема Захтева",
    RequiredForXML: "Потребно за дистрибуцију XМЛ",
    Reschedule: "Поново Ставите На Распоред",
    Reset: "Ресетујте",
    ResetThisQuery: "Ресетујте Текући Упит",
    ResetViewToSelection: "Ресетујте Одабрани Вју",
    Resource: "Ресурс",
    Resources: "Ресурси",
    ResponseSchema: "Шема Одговора",
    Restart: "Поново Покрените",
    Restarted: "Поново Поктернут",
    Restore: "Вратите на Старо Стање",
    Resubmit: "Поново Поднесите",
    Resubmitted: "Поново Послат",
    ResubmitTooltip: "Реактивирајте ову радну јединицу",
    Results: "Резултат(и)",
    Resume: "Наставите",
    RetainSuperfileStructure: "Задржите Структуру Супердатотеке",
    RetypePassword: "Поновите Лозинку",
    Reverse: "Идите Уназад",
    RowPath: "Пут До Рекорда",
    Rows: "Редови",
    RowTag: "Етикета Реда",
    RoxieCluster: "Роkcи Кластер",
    RoxieFileCopy: "Статус Копирања Роxие Датотека",
    RunningServerStrain: "Извршавање овог процеса може да траје дуго времена и веома оптерети сервере. Желите ли да наставите?",
    Sample: "Пример",
    SampleRequest: "Пример Захтева",
    SampleResponse: "Пример Одговора",
    Save: "Сачувајте",
    Scope: "Подручје",
    SearchResults: "Резултати Претраживања",
    SecondsRemaining: "Преостало Секунди",
    Security: "Сигурност",
    SelectPackageFile: "Изаберитe Пакет",
    Separators: "Сеператори",
    Server: "Сервер",
    ServiceName: "Име Сервисa",
    Services: "Сервиси",
    SetBanner: "Поставите Заставицу",
    SetTextError: "Неуспешно приказивање текста (да ли је текст предуг?). Користите &lsquo;помагаче&rsquo; за преузимање датотека.",
    SetToFailed: "Поставите На Неуспешан",
    Severity: "Озбиљност",
    Show: "Прокажите",
    ShowProcessesUsingFilter: "Прикажи процесе користећи филтер",
    ShowSVG: "Прокажите СВГ",
    Size: "Величина",
    Skew: "Скју",
    SkewNegative: "Скју (-)",
    SkewPositive: "Скју (+) ",
    SLA: "СЛА",
    SlaveLogs: "Извештаји Извршилаца",
    SlaveNumber: "Број Извршилаца",
    Slaves: "Робови (Слejвс)",
    Smallest: "Најмањи",
    SmallestFile: "Најмања Датотека",
    SmallestSize: "Најмања Величина",
    SOAP: "СОАП",
    SomeDescription: "Неки*Опис",
    somefile: "*::некифajл*",
    Source: "Изворна Верзија",
    SourceCode: "Изворна Верзија Кода",
    SourceLogicalFile: "Име Изворног Фајла",
    SourcePath: "Изворна Верзија Пута (са омогућеним *)",
    SourceProcess: "Изворни Процес",
    Spill: "Запис на Диск",
    SplitPrefix: "Сплит Префикс",
    Spray: "Разбацајте (Спрej)",
    Start: "Почните",
    Started: "Почео",
    Starting: "Полазак ",
    State: "Стање",
    Stats: "Статистике",
    Status: "Статус",
    Stopped: "Заустављен",
    Stopping: "Заустављање",
    StorageInformation: "Информација о диск простору",
    Subgraph: "ПодГраф",
    Subgraphs: "Подграфикон",
    Submit: "Поднесите",
    Subtype: "ПодВрста",
    SuccessfullySaved: "Успешно Сачуван",
    Summary: "Кратак Преглед",
    SummaryMessage: "Сажета Порука",
    SuperFile: "Супер Датотека",
    Superfile: "Супер Датотека",
    SuperFiles: "Супер Датотеке",
    Superfiles: "СуперДатотеке",
    SuperFilesBelongsTo: "Припадник Супердатотеке",
    SuperfilesOnly: "Само Супердатотеке",
    SuperOwner: "Супер Власник",
    Suspend: "Суспендујте",
    Suspended: "Суспендован",
    SuspendedBy: "Суспендован Од",
    SuspendedByCluster: "Суспендован од стране кластера",
    SuspendedByUser: "Суспендован Од Стране Корисника",
    SuspendedReason: "Разлог за Суспендовање",
    SVGSource: "СВГ Извор",
    SyncSelection: "Синхронизујте Са Одабраним",
    SystemServers: "Систем Сервера",
    Table: "табела",
    tag: "таг",
    Target: "Циљ",
    TargetClusters: "Циљни Кластери",
    TargetName: "Назив Циља",
    TargetNamePlaceholder: "неко::логићко::име",
    TargetRowTagRequired: "Морате ознацити циљни ред у табели",
    Targets: "Циљне Платформе",
    TargetScope: "Циљни Обим",
    TargetWuid: "Циљ/Pjид",
    Terminators: "Терминатори",
    TestPages: "Тест Странице",
    Text: "Текст",
    TheReturnedResults: "Враћени Резултати",
    ThorMasterAddress: "Адреса Главног Тора",
    ThorNetworkAddress: "Нетворк Адреса Торa",
    ThorProcess: "Тор Процес",
    Time: "Време",
    Timers: "Мерачи Времена",
    TimeSeconds: "Време (Секунде)",
    TimeStamp: "Временска Ознака",
    TimeStarted: "Време Почетка",
    TimeStopped: "Време Краја",
    Timings: "Времена",
    TimingsMap: "Мапа Времена",
    title_ActiveGroupPermissions: "Дозволе активнe групe",
    title_ActivePermissions: "Активнe Дозволе",
    title_Activity: "Активности",
    title_AvailableGroupPermissions: "Доступне Дозволе групе",
    title_AvailablePermissions: "Расположиве Дозволе",
    title_BindingConfiguration: "Конфигурација  Везивањa",
    title_BindingDefinition: "Дефиниција Везивањa",
    title_ClusterInfo: "Групе",
    title_CodeGeneratorPermissions: "Дозволе за генератор кода",
    title_DefinitionExplorer: "Истраживач Дефиниција",
    title_Definitions: "Дефиниције",
    title_DESDL: "Динамичани ЕСДЛ",
    title_DFUQuery: "Логичке Датотеке",
    title_DFUWUDetails: "ДФУ Радна Јединица",
    title_DirectoriesFor: "Директорији за",
    title_DiskUsage: "Искориштеност Диска",
    title_ECLPlayground: "ЕЦЛ Игралиште",
    title_ErrorsWarnings: "Грешке / упозорења за",
    title_EventScheduleWorkunit: "Распоређивач Догађаја",
    title_FileScopeDefaultPermissions: "Предефинисанe дозволе за фајл систем",
    title_FilesPendingCopy: "Датотеке на чекању за копирање",
    title_FoundFilesFor: "Пронађен фајл за",
    title_GetDFUWorkunits: "ДФУ Радне Јединице",
    title_Graph: "Графикон",
    title_GraphPage: "наслов",
    title_Graphs: "Графикони",
    title_GridDetails: "Промени Ме",
    title_History: "Историја",
    title_HPCCPlatformECL: "ECL Watch - Главна Страница",
    title_HPCCPlatformFiles: "ECL Watch - Датотеке",
    title_HPCCPlatformMain: "ECL Watch - Главна Страница",
    title_HPCCPlatformOps: "ECL Watch - Управљње",
    title_HPCCPlatformRoxie: "ECL Watch - Роkcи",
    title_HPCCPlatformServicesPlugin: "ЕЦЛ Монитор - Допуне",
    title_Inputs: "Уноси",
    title_LFDetails: "Детаљи о Логичкоj Датотеци",
    title_LibrariesUsed: "Библиотеке У Кориштењу",
    title_Log: "Лог Фајл",
    title_LostFilesFor: "Изгубљени фајлови за",
    title_LZBrowse: "Зона за Претовар",
    title_MemberOf: "Члан Од",
    title_Members: "Чланови",
    title_Methods: "Методе",
    title_OrphanFilesFor: "Непотребни фајлови за",
    title_PackageParts: "Делови пакета",
    title_Permissions: "Дозволе",
    title_PreflightResults: "Резултати провере",
    title_QuerySetDetails: "Детаљи Упита",
    title_QuerySetErrors: "Грешке",
    title_QuerySetLogicalFiles: "Логичке Датотеке",
    title_QuerySetQuery: "Упити (Kуериз)",
    title_QuerySetSuperFiles: "Супер Датотеке",
    title_QueryTest: "Супер Датотеке",
    title_Result: "Ацктивност",
    title_Results: "Резултати",
    title_SearchResults: "Резултати Претраживања",
    title_SourceFiles: "Оригиналне Датотеке",
    title_Topology: "Топологија",
    title_TpThorStatus: "Стање Тора",
    title_UserPermissions: "Корисничке Дозвиле за Приступ",
    title_UserQuery: "Права Приступа",
    title_WorkunitScopeDefaultPermissions: "Унапред Дефинисане Дозвиле за Aктивности",
    title_WUDetails: "ЕЦЛ Детаљи о Радној Јединици",
    title_WUQuery: "ЕЦЛ Радне Јединице",
    To: "Према",
    ToDate: "До Сада",
    Toenablegraphviews: "Да бисте могли видети графиконе, мораћете инсталисати Граф Вjу Kонтрол плaгин",
    Tooltip: "Савет",
    TooManyFiles: "Превише Фајлова",
    Top: "Врх",
    Topology: "Топологија",
    ToSizes: "До Величина",
    TotalClusterTime: "Укупно Време Кластера",
    TotalParts: "Укупан број делова",
    TotalSize: "Укупна Величина",
    TotalThorTime: "Укупно Време Тора",
    TransitionGuide: "Водич",
    Tree: "Дрво",
    Type: "Тип",
    Unbound: "невезан",
    undefined: "недефинисан",
    Unknown: "Непознат",
    Unlock: "Откључај",
    Unprotect: "Укините Заштиту",
    UnsupportedIE9FF: "Нису Подржани (ИЕ <= 9, ФиреФоx)",
    Unsuspend: "Укините Суспензију",
    Unsuspended: "Суспензија Укинута",
    Up: "На Горе",
    UpdateCloneFrom: "Ажурирајте Клон Користећи",
    UpdateDFs: "Ажурирајте ДФС",
    UpdateSuperFiles: "Ажурирајте Супер Фајл",
    Upload: "Aплоyд",
    URL: "УРЛ",
    Usage: "Употреба",
    Used: "Кориштен",
    User: "Корисник",
    UserDetails: "Детаљи о Кориснику",
    UserID: "Корисницки ИД",
    UserLogin: "Пријавите се само користећи своје корисничко име",
    UserName: "Име Корисника",
    Username: "Имекорисника",
    UserPermissions: "Дозволе за Корисников Приступ",
    Users: "Корисници",
    UseSingleConnection: "Користите Само Једaн Прикључак (конекшн)",
    Validate: "Потврдите",
    ValidateActivePackageMap: "Валидирајте Мапу Активног Пакета",
    ValidatePackageContent: "Валидирајте Саржај Пакета",
    ValidatePackageMap: "Потврдите Мапу Пакета",
    ValidateResult: "=====Потврдите Резултaт=====\n\n",
    ValidateResultHere: "(Резултати Валидирања)",
    Value: "Вредност",
    Variable: "Варијабла",
    VariableBigendian: "Варијабла Биг-ендиан",
    Variables: "Вариабле",
    VariableSourceType: "Тип Извора",
    Version: "Верзија",
    ViewByScope: "Поглед према Скопу",
    Views: "Погледи",
    Visualize: "Визуализујте",
    WarnIfAvailableDiskSpaceIsUnder: "Упозори aко расположиви диск простор спадне испод",
    WarnIfAvailableMemoryIsUnder: "Упозори aко расположива меморија спадне испод",
    WarnIfCPUUsageIsOver: "Упозори ако је искориштеност процесора преко",
    Warning: "Упозорење",
    Warnings: "Упозорење(а)",
    WarnOldGraphControl: "Упозорење:  Стара Графичка Контрола",
    What: "Шта",
    Where: "Где",
    Who: "Ко",
    Width: "Ширина",
    Workflows: "Токови послова",
    Workunit: "Радна Јединица",
    Workunits: "Радне Јединице",
    WorkUnitScopeDefaultPermissions: "Унапред Дефинисане Дозвиле за Простор за Радне Јединице",
    Wrap: "Замотајте",
    WSDL: "WSDL",
    WUID: "PJИД",
    Wuidcannotbeempty: "Pjид Не Може Бити Празан.",
    WUSnapShot: "Тренутна Слика Радне Јединице",
    XGMML: "XГММЛ",
    XLS: "XЛС",
    XML: "XМЛ",
    XRef: "XРеф",
    Year: "Година",
    YouAreAboutToBeLoggedOut: "Ви ћете бити одјављени",
    YouAreAboutToDeleteBinding: "Одабрано везивање ће бити обрисано. Да ли сте сигурни да желите да то урадите?",
    YouAreAboutToDeleteDefinition: "У процесу је брисање ове дефиниције. Да ли сте сигурни да желите то учинити?",
    YouAreAboutToDeleteThisFile: "Да ли ћете обрисати ову датотеку",
    YouAreAboutToDeleteThisPart: "Да ли ћете обрисати овај дeо",
    YouAreAboutToDeleteThisQueryset: "Да ли ћете обрисати овај сет упита",
    YouAreAboutToDeleteThisWorkunit: "Да ли ћете обрисати ову радну јединицу",
    YouAreAboutToRemoveUserFrom: "тражили сте да уклоните корисника(е) из ове групе. Да ли желите да наставите?",
    YourBrowserMayNotSupport: "Ваш претраживач можда не подржава датотеку (е) ове величине",
    YourScreenWasLocked: "ЕСП је закључао ваш екран. Подаци су застарели",
    ZAP: "З.А.П.",
    ZeroLogicalFilesCheckFilter: "Нема ни једане Логичке Датотеке(проверите филтер)",
    Zip: "Запакујте (Зип)",
    ZippedAnalysisPackage: "Запаковани Пакет са Анализама",
    Zoom: "Зум",
    Zoom100Pct: "Зумирајте 100%",
    ZoomAll: "Зумирајте Све",
    ZoomMinus: "Зум -",
    ZoomPlus: "Зум +",
    ZoomWidth: "Зумирајте Ширину"
});


/***/ }),

/***/ "./eclwatch/nls/zh/hpcc.js":
/*!*********************************!*\
  !*** ./eclwatch/nls/zh/hpcc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

﻿!(module.exports = {
    Abort: "终止",
    AbortedBy: "终止者",
    AbortedTime: "终止时间",
    About: "本系统简介",
    AboutGraphControl: "图形控制器简介",
    AboutHPCCSystems: "HPCC Systems®简介",
    AboutHPCCSystemsGraphControl: "HPCC系统图形控制器简介",
    AboutToLoseSessionInformation: "现在退出系统，与当前进程有关的信息将丢失。您确认马上退出系统吗?",
    Account: "账户",
    Action: "操作",
    Activate: "激活",
    Activated: "已激活",
    ActivateQuery: "激活当前查询程序",
    ActivateQueryDeletePrevious: "激活当前查询程序。删除旧版的查询程序。",
    ActivateQuerySuspendPrevious: "激活当前查询程序。暂停旧版的查询程序。",
    Active: "已激活",
    ActivePackageMap: "已激活文件包",
    ActiveWorkunit: "工作单元",
    Activities: "活动",
    Activity: "活动",
    ActivityMap: "活动图",
    ActualSize: "实际长度",
    Add: "添加",
    AddAttributes: "在你得方法中添加属性/值",
    AddAttributes2: "添加属性",
    AddBinding: "添加连接",
    AddFile: "添加文件",
    AddGroup: "添加用户组",
    AdditionalResources: "附加资源",
    AddPart: "添加部件",
    AddProcessMap: "添加文件包",
    AddTheseFilesToDali: "添加这些文件到Dali",
    AddtionalProcessesToFilter: "过滤附加进程",
    AddToExistingSuperfile: "添加到现有文件集",
    AddToSuperfile: "加入文件集",
    AddUser: "添加用户",
    Advanced: "高级",
    All: "全部",
    AllowAccess: "<center>允许<br>有限权限</center>",
    AllowForeignFiles: "允许外部文件",
    AllowFull: "<center>允许<br>全权</center>",
    AllowRead: "<center>允许<br>读</center>",
    AllowWrite: "<center>允许<br>写</center>",
    AllQueuedItemsCleared: "所有队列项都已被清除。当前的运行作业将会继续执行。",
    ANY: "任何一个",
    AnyAdditionalProcessesToFilter: "任何需过滤的附加进程",
    Append: "添加",
    AppendCluster: "添加集群",
    Apply: "使用",
    ArchivedOnly: "仅限已存档的工作单元",
    ArchivedWarning: "警告:请指定一个小的日期范围. 否则, 检索时间可能较长,网页浏览器可能超时",
    Attach: "附加",
    Attribute: "属性",
    AttributesAreRequired: "所需属性",
    AutoRefresh: "自动更新",
    AutoRefreshEvery: "每x分钟自动刷新",
    AutoRefreshIncrement: "自动刷新增量",
    Back: "返回",
    BannerColor: "标语的颜色",
    BannerMessage: "标语的文字",
    BannerScroll: "标语滚动",
    BannerSize: "标语大小",
    BinaryInstalls: "安装图形控制器",
    Bind: "捆绑",
    Binding: "连接",
    BindingDeleted: "连接已删除",
    Blob: "BLOB",
    BlobPrefix: "BLOB前缀",
    Bottom: "下部",
    BoundBy: "捆绑者：",
    Busy: "忙",
    Cancel: "撤消",
    CancelAll: "全部取消",
    CancelAllMessage: "终止运行作业并清除队列。你要继续吗？",
    Chart: "图表",
    CheckAllNodes: "检查所有节点",
    CheckFilePermissions: "检查文件权限",
    CheckSingleNode: "检查单一节点",
    Clear: "清除",
    ClearPermissionsCache: "清除缓存里的权限列表",
    ClearPermissionsCacheConfirm: "你确认要清除缓存里的有关DALI和ESP权限列表吗?缓存刷新之前,运行工作单元的效率可能会明显降低.",
    Clone: "复制",
    ClonedWUID: "复制的工作单元标识",
    CloneTooltip: "复制工作单元",
    Close: "关闭",
    Cluster: "计算机集群",
    ClusterName: "计算机集群名称",
    ClusterPlaceholder: "集群占位符",
    ClusterProcesses: "计算机集群进程",
    Code: "代码",
    CodeGenerator: "代码生成器",
    Col: "列",
    CollapseAll: "隐藏",
    Command: "指令",
    Comment: "注释",
    Compiled: "已编译",
    Compiling: "编译",
    Completed: "完成",
    ComplexityWarning: "超过{}活动（{}）- 重新显示？",
    Component: "组成部分",
    Compress: "压缩",
    Compressed: "已压缩过的",
    CompressedFileSize: "压缩后的文件长度",
    Condition: "条件",
    Configuration: "设置",
    ConfigureService: "配置服务",
    ConfirmPassword: "确认密码",
    ConfirmRemoval: "确认",
    ContactAdmin: "如果你想要重新命名这个群组，请联系你的LDAP管理员",
    Content: "内容",
    Contents: "内容",
    ContentType: "内容类型",
    ContinueWorking: "继续工作",
    Copy: "复制",
    CopyToClipboard: "复制到剪贴板",
    Count: "数量",
    CreateANewFile: "生成一个新超级文件",
    Created: "已创建",
    CreatedBy: "创建者",
    CreatedTime: "创建时间",
    Creating: "创建",
    Critical: "关键的",
    CSV: "CSV",
    Dali: "Dali",
    DaliIP: "Dali IP",
    dataset: ":=数据集*",
    Date: "日期",
    Day: "日",
    Deactivate: "失效",
    Debug: "故障诊断",
    DEF: "DEF",
    Defaults: "默认",
    Definition: "定义",
    DefinitionDeleted: "定义已删除",
    DefinitionID: "定义识别码",
    Definitions: "定义",
    DelayedReplication: "已延迟的复制",
    Delete: "删除",
    DeleteBinding: "删除连接",
    Deleted: "已删除",
    DeletedBinding: "已删除的连接",
    DeleteDirectories: "将要删除空目录。你要继续吗？",
    DeleteEmptyDirectories: "删除空目录",
    DeletePrevious: "删除前面",
    DeleteSelectedDefinitions: "删除所选择的定义",
    DeleteSelectedFiles: "删除所选择的文件?",
    DeleteSelectedGroups: "删除所选择的用户组?",
    DeleteSelectedPermissions: "删除所选的权限?",
    DeleteSelectedQueries: "删除所选择的查询程序?",
    DeleteSelectedUsers: "删除所选择的用户?",
    DeleteSelectedWorkunits: "删除所选择的工作单元?",
    DeleteSuperfile: "删除文件集?",
    DeleteSuperfile2: "删除文件集",
    DeleteThisPackage: "删除文件包?",
    Delimited: "定界的",
    DenyAccess: "<center>拒绝<br>有限权限</center>",
    DenyFull: "<center>拒绝<br>全权</center>",
    DenyRead: "<center>拒绝<br>读</center>",
    DenyWrite: "<center>拒绝<br>写</center>",
    Depth: "深度",
    DepthTooltip: "最大子图深度",
    Deschedule: "取消运行计划",
    DescheduleSelectedWorkunits: "取消所选工作单元的计划?",
    Description: "说明",
    DESDL: "Dynamic ESDL ",
    Despray: "复合原文件",
    Details: "细节",
    DFUServerName: "DFU服务器名",
    DFUWorkunit: "DFU工作单元",
    Directories: "文件目录",
    Directory: "文件目录",
    DisableScopeScanConfirm: "你确认要禁用范围扫描吗?在DALI重新启动后, 将复归原始的系统设置.",
    DisableScopeScans: "禁用范围扫描",
    DiskUsage: "硬盘使用率",
    Distance: "距离",
    DistanceTooltip: "最大相邻活动的距离",
    Dll: "动态联接库",
    Documentation: "文件",
    DoNotActivateQuery: "不激活当前查询程序",
    DoNotRepublish: "不重新公布",
    DOT: "DOT",
    DOTAttributes: "DOT属性",
    Down: "向下",
    Download: "下载",
    Downloads: "下载",
    DownloadToCSV: "下载成CSV",
    DropZone: "文件停放区",
    DueToInctivity: "如果三分钟之内没有活动，您将退出所有ECL Watch进程。",
    Duration: "时间段",
    DynamicNoServicesFound: "找不到服务",
    EBCDIC: "EBCDIC",
    ECL: "ECL",
    ECLWatchRequiresCookies: "ECLWatch需要启用cookie才能继续",
    ECLWatchSessionManagement: "ECLWatch进程管理",
    ECLWorkunit: "ECL工作单元",
    Edges: "连接",
    Edit: "编辑",
    EditDOT: "编辑DOT",
    EditGraphAttributes: "编辑图形属性",
    EditXGMML: "编辑XGMML",
    EmployeeID: "员工ID",
    Empty: "(空白)",
    Enable: "解禁",
    EnableScopeScans: "解禁范围扫描",
    EnableScopeScansConfirm: "你确认要解禁范围扫描吗?在Dali重新启动后, 将复归原始的系统设置.",
    EnglishQ: "英文?",
    EnterAPercentage: "输入百分比",
    EnterAPercentageOrMB: "输入百分比或MB",
    EraseHistory: "擦除历史",
    EraseHistoryQ: "擦除相关历史:",
    Error: "错误",
    Errorparsingserverresult: "服务器结果解析错误",
    Errors: "错误",
    ErrorsStatus: "错误状态",
    ErrorUploadingFile: "上传文件错误。请捡查文件权限",
    ErrorWarnings: "错误/警告",
    Escape: "换码",
    ESPBuildVersion: "ESP构建版本",
    ESPNetworkAddress: "ESP网址",
    ESPProcessName: "ESP 进程名称",
    EventName: "事件名称",
    EventNamePH: "事件名称",
    EventScheduler: "事件计划",
    EventText: "事件内容",
    EventTextPH: "事件文字",
    Exception: "异常",
    Executed: "已执行",
    Executing: "执行",
    ExpandAll: "打开",
    ExpireDays: "过期(天)",
    Export: "输出",
    ExportSelectionsToList: "输出选项为列表",
    FailIfNoSourceFile: "在无源文件时失效",
    Fatal: "严重的",
    Fetched: "已取",
    FetchingData: "提取数据...",
    fetchingresults: "提取结果",
    File: "文件",
    FileCluster: "文件计算机集群",
    FileCounts: "文件数量",
    FileName: "文件名称",
    FileParts: "文件分块",
    FilePath: "文件路径",
    FilePermission: "文件权限",
    Files: "文件",
    FileScopeDefaultPermissions: "文件默认权限",
    FileScopes: "文件范围",
    FileSize: "文件长度",
    FilesNoPackage: "与文件包定义不匹配的文件",
    FilesPending: "文件添加",
    FilesWarning: "系统检索到太多文件。前100,000文件按照修改时间返回。可以指定筛选规则来返回少量文件。",
    FilesWithUnknownSize: "大小未知的文件",
    FileType: "文件类型",
    FileUploader: "文件上传",
    FileUploadStillInProgress: "文件上传中",
    Filter: "过滤器",
    FilterSet: "过滤器集",
    Find: "查找",
    FindNext: "查找下一个",
    FindPrevious: "查找前一个",
    Finished: "已完成",
    FirstN: "前N个",
    FirstName: "名",
    FirstNRows: "初始N行",
    Fixed: "定长的",
    Folder: "文件夹",
    Format: "格式",
    Forums: "论坛",
    Forward: "向前",
    FoundFile: "找到文件",
    FoundFileMessage: "找到的文件的所有部分都在磁盘上且没有在Dali服务器中引用。它们都被记录以便可以加回到Dali服务器上。如果需要它们也可被从集群中删除。",
    FromDate: "起始日期",
    FromSizes: "最小文件长度",
    FromTime: "起始时间",
    FullName: "姓名",
    Generate: "生成",
    GetPart: "获取部件",
    GetSoftwareInformation: "获取软件信息",
    Graph: "图形",
    GraphControl: "图形控制",
    Graphs: "图形",
    GraphView: "图形显示",
    Group: "组",
    GroupBy: "编组方法",
    GroupDetails: "用户组详细信息",
    Grouping: "编组",
    GroupName: "组名",
    GroupPermissions: "用户组权限",
    Groups: "用户组",
    GZip: "GZip",
    help: "本区域显示工作单元的树状图.一个图形的大小和颜色表明该图形所代表的活动的时间跨度 (较大的图形和较暗的颜色表明该图形所代表的活动时间较长.)",
    Helper: "辅助",
    Helpers: "辅助文件",
    Hex: "十六进制预览",
    HideSpills: "隐藏切分",
    High: "高",
    History: "历史",
    HPCCSystems: "HPCC系统",
    Icon: "图标",
    ID: "标识",
    Inactive: "未激活",
    IncludeSlaveLogs: "包括从属服务器日志",
    Index: "索引",
    Info: "信息",
    InfoDialog: "信息对话窗",
    InheritedPermissions: "继承权限",
    Inputs: "输入",
    InvalidResponse: "(无效响应)",
    InvalidUsernamePassword: "用户名或密码错误，请重试。",
    IP: "IP",
    IPAddress: "IP地址",
    IsCompressed: "已压缩",
    IsLibrary: "程序库",
    IsReplicated: "已复制",
    IssueReporting: "问题报告",
    JobName: "任务名",
    Jobname: "任务名",
    jsmi: "李名*",
    JSmith: "李名*",
    JSON: "JSON",
    KeyFile: "密钥文件",
    Label: "标识",
    LandingZone: "文件停放区",
    LandingZones: "文件停放区",
    LanguageFiles: "语言文件",
    Largest: "最大",
    LargestFile: "最大文件",
    LargestSize: "最大尺寸",
    LastEdit: "最新编辑",
    LastEditedBy: "最新编辑者",
    LastEditTime: "最新编辑时间",
    LastMessage: "最后一条信息",
    LastName: "姓",
    LastNDays: "过去若干天以内",
    LastNHours: "最后N小时",
    LastNRows: "最后N行",
    LastRun: "上次运行",
    LDAPWarning: "<b>LDAP服务错误：</b>用户太多无法显示,请选用过滤器.",
    LearnMore: "更多信息",
    LegacyForm: "旧式表格",
    Legend: "传奇",
    LibrariesUsed: "使用程序库",
    LibraryName: "库名",
    Line: "行",
    LineTerminators: "行终止符",
    Links: "联接",
    Loading: "加载",
    LoadingCachedLayout: "加载缓存里的布局...",
    LoadingData: "加载数据...",
    loadingMessage: "加载...",
    LoadPackageContentHere: "（把文件包内容上载到这里）",
    LoadPackageFromFile: "从文件中上载文件包内容",
    Local: "局部",
    LocalFileSystemsOnly: "仅本地文件系统",
    Location: "地点",
    Lock: "锁住",
    Log: "日志",
    log_analysis_1: "日志_分析_1*",
    LogFile: "日志文件",
    LoggedInAs: "登录用户",
    LoggingOut: "退出",
    LogicalFile: "逻辑文件",
    LogicalFiles: "逻辑文件",
    LogicalFilesAndSuperfiles: "逻辑文件和文件集",
    LogicalFilesOnly: "逻辑文件",
    LogicalFileType: "逻辑文件类型",
    LogicalName: "逻辑文件名",
    Login: "登录",
    Logout: "退出",
    Logs: "日志",
    LogVisualization: "日志可视化",
    LogVisualizationUnconfigured: "可视化日志未设置，请检查你的配置管理设置。",
    LostFile: "丢失文件",
    LostFile2: "丢失文件",
    LostFileMessage: "一个逻辑文件同时在主要和复制地的储存区缺少至少一个文件部分。该逻辑文件还在dali服务器中引用。删除该文件去掉dali服务器中引用及在磁盘中的任何余留部分。",
    Low: "低",
    MachineInformation: "机器信息",
    Machines: "机器",
    Major: "主要的",
    ManagedBy: "管理者",
    ManagedByPlaceholder: "CN=HPCCAdmin,OU=users,OU=hpcc,DC=MyCo,DC=local",
    ManualCopy: "按Ctrl+C键",
    ManualOverviewSelection: "要求人工检查选项",
    ManualTreeSelection: "要求人工选择树",
    Mappings: "映像",
    Mask: "掩码",
    Max: "最大",
    MaximumNumberOfSlaves: "最大从属服务器数",
    MaxNode: "最大节点",
    MaxRecordLength: "最大记录长度",
    MaxSize: "最大规格",
    MaxSkew: "最大规格",
    MemberOf: "隶属",
    Members: "成员",
    Message: "信息",
    MethodConfiguration: "方法配置",
    Methods: "方法",
    Min: "最小",
    Mine: "本人所有",
    MinNode: "最小节点",
    Minor: "次要的",
    MinSize: "最小规格",
    MinSkew: "最小偏差",
    Missing: "失踪",
    MixedNodeStates: "多种节点状态",
    Modification: "修改",
    Modified: "修改过",
    ModifiedUTCGMT: "修改时间(UTC/GMT)",
    Modify: "修改",
    MonitorEventName: "监视事件名",
    Monitoring: "监控",
    MonitorShotLimit: "监视发射限制",
    MonitorSub: "监视子文件",
    Month: "月",
    More: "更多",
    MustContainUppercaseAndSymbol: "需含大写字符和符号",
    NA: "不适用",
    Name: "名称",
    NamePrefix: "前缀",
    NamePrefixPlaceholder: "前缀",
    Newest: "最新",
    NewPassword: "新密码",
    NoContent: "(无内容)",
    noDataMessage: "零行...",
    Node: "节点",
    NodeGroup: "节点组",
    NoErrorFound: "没有发现任何错误\n",
    NoFilterCriteriaSpecified: "没有指定筛选规则",
    None: "无",
    NoPublishedSize: "没有公布的规格",
    Normal: "正常",
    NoScheduledEvents: "无事件计划",
    NoSplit: "不分割",
    NotActive: "没有激活",
    NothingSelected: "尚未选择...",
    NotInSuperfiles: "不在文件集里",
    NotSuspendedbyUser: "用户没有暂停使用",
    NoWarningFound: "没有发现任何警告\n",
    NumberofParts: "文件分块数量",
    NumberofSlaves: "从属服务器数",
    OK: "认可",
    Oldest: "最旧",
    OldPassword: "旧密码",
    OmitSeparator: "忽略分割符",
    Only1PackageFileAllowed: "仅允许一个文件包文件",
    Open: "打开",
    OpenInNewPage: "在新页里打开",
    OpenInNewPageNoFrame: "在无框的新页面里打开",
    OpenLegacyECLWatch: "打开旧版本的ECLWatch",
    OpenLegacyMode: "老式显示模式",
    OpenNativeMode: "固有显示模式",
    OpenSafeMode: "打开 (安全模式)",
    OpenSource: "开源",
    OpenTreeMode: "打开 (树状模式)",
    Operation: "操作",
    Operations: "操作",
    Options: "选项",
    OriginalFile: "原文件",
    OrphanFile: "孤立文件",
    OrphanFile2: "孤立文件",
    OrphanMessage: "一个孤立文件会有某些部分存于在磁盘上。然而不可能得到所有部分以建立完整的逻辑文件。它不会引用dali服务器上的文件部分。",
    Outputs: "输出",
    Overview: "覆盖",
    Overwrite: "覆盖",
    OverwriteMessage: "同名的文件已存在。要继续请选择覆盖选项。",
    Owner: "拥有者",
    PackageContent: "文件包内容",
    PackageContentNotSet: "文件包内容没有设置",
    PackageMap: "查询程序文件包",
    PackageMaps: "查询程序文件包",
    PackagesNoQuery: "与查询程序不匹配的文件包",
    ParameterXML: "参数XML",
    Part: "分块",
    PartMask: "组成部分掩模",
    PartName: "部件名称",
    Parts: "文件分块",
    PartsFound: "找到组成部分",
    PartsLost: "组成部分丢失",
    Password: "密码",
    PasswordExpiration: "密码已失效",
    PasswordExpired: "你的密码已过期。请立刻更新。",
    PasswordExpirePostfix: "天过期. 现在更新吗?",
    PasswordExpirePrefix: "你的登录密码将在",
    PasswordOpenZAP: "打开ZAP的口令（选项）",
    PasswordsDoNotMatch: "密码不匹配",
    Path: "路径",
    PathMask: "路径掩码",
    Pause: "暂停",
    PauseNow: "马上暂停",
    PctComplete: "任务完成%",
    PercentCompressed: "压缩百分比",
    PercentDone: "任务完成%",
    PerformingLayout: "图形布局中...",
    Permission: "权限",
    PermissionName: "权限名",
    Permissions: "使用权限",
    PhysicalFiles: "物理文件",
    PlaceholderFindText: "工作单元标识,用户名,等等",
    PlaceholderFirstName: "民",
    PlaceholderLastName: "张",
    Playground: "操作平台",
    PleaseEnableCookies: "ECLWatch需要启用cookie才能继续",
    PleaseEnterANumber: "请输入一个数字",
    PleaseLogin: "请输入用户名和密码登录",
    PleaseLogIntoECLWatch: "请登录ECLWatch",
    PleasePickADefinition: "请挑选定义",
    PleaseSelectADynamicESDLService: "请选择DynamicESDL服务",
    PleaseSelectAGroupToAddUser: "请选择要将用户添加到的组",
    PleaseSelectAServiceToBind: "请选择捆绑一个服务",
    PleaseSelectATopologyItem: "请选择目标，服务或机器。",
    PleaseSelectAUserOrGroup: "请选择用户或用户组",
    PleaseSelectAUserToAdd: "请选择要添加的用户",
    Plugins: "插件",
    Port: "端口",
    Prefix: "前缀",
    PrefixPlaceholder: "文件名{:长度}, 文件大小{:[B|L][1-8]}",
    Preflight: "预检",
    PreloadAllPackages: "预载所有软件包",
    PreserveCompression: "保留压缩模式",
    Preview: "预览",
    PrimaryLost: "主要丢失",
    PrimaryMonitoring: "主监控",
    Priority: "优先级",
    Process: "进程",
    Processes: "流程",
    ProcessFilter: "进程过滤器",
    ProcessorInformation: "处理器信息",
    ProgressMessage: "进展信息",
    Properties: "特性",
    Property: "特性",
    Protect: "保护",
    Protected: "已保护",
    Publish: "公布",
    Published: "已公布",
    PublishedBy: "公布者",
    PublishedByMe: "由本人公布",
    PublishedQueries: "已公布的查询程序",
    PushEvent: "添加事件",
    Quarter: "季",
    Queries: "查询程序",
    QueriesNoPackage: "与文件包不匹配的查询程序",
    Query: "查询",
    QueryDetailsfor: "查询程序的详细说明",
    QueryID: "查询程序标识",
    QueryIDPlaceholder: "某查询程序标识",
    QueryName: "查询程序名",
    QueryNamePlaceholder: "某查询程序名",
    QuerySet: "查询程序集",
    Queue: "队列",
    Quote: "引用",
    QuotedTerminator: "引号里的终止符",
    RawTextPage: "原始文本（当前页）",
    Ready: "就绪",
    ReallyWantToRemove: "确认要删除吗?",
    ReAuthenticate: "登录解锁",
    RecordCount: "记录数量",
    RecordLength: "记录长度",
    Records: "记录",
    RecordSize: "记录长度",
    RecordStructurePresent: "记录结构",
    Recover: "恢复",
    RecoverTooltip: "重新启动停滞的工作单元",
    RecreateQuery: "重建查询程序",
    Recycling: "再循环",
    RedBook: "红皮书",
    Refresh: "更新",
    ReleaseNotes: "版本说明",
    Reload: "重新加载",
    Remaining: "剩余",
    RemoteCopy: "远程复制",
    RemoteDali: "远程Dali",
    RemoteDaliIP: "远程&nbsp;Dali&nbsp;IP&nbsp;地址",
    Remove: "删除",
    RemoveAttributeQ: "你将要删除此属性。你确定要继续？ ",
    RemoveAtttributes: "删除属性",
    RemovePart: "删除部件",
    RemoveSubfiles: "删除子文件",
    RemoveSubfiles2: "删除子文件？",
    RemoveUser: "将把你的用户从用户组里删除：",
    Rename: "更名",
    RenderedSVG: "渲染的SVG",
    RenderSVG: "渲染SVG",
    Replicate: "复制",
    ReplicatedLost: "复制丢失",
    ReplicateOffset: "复制偏移量",
    ReportAnError: "报告一个错误",
    ReportError: "报告错误",
    RepresentsASubset: "查询结果过多, 只能给出其中一部分结果, 选择合适的查询条件才能给出所有查询结果",
    RequestSchema: "请求格式",
    RequiredForXML: "分布XML文件所要求的",
    Reschedule: "再次加入运行计划",
    Reset: "设置更新",
    ResetThisQuery: "清零当前查询程序",
    ResetViewToSelection: "清除",
    Resource: "资源",
    Resources: "资源",
    ResponseSchema: "响应格式",
    Restart: "再启动",
    Restarted: "已重新启动",
    Restore: "恢复",
    Resubmit: "重新提交",
    Resubmitted: "已重新提交",
    ResubmitTooltip: "重新提交现有工作单元",
    Results: "结果",
    Resume: "恢复",
    RetainSuperfileStructure: "保留文件集的结构",
    RetypePassword: "验证密码",
    Reverse: "反转",
    RowPath: "行路径",
    Rows: "行",
    RowTag: "行标记",
    RoxieCluster: "Roxie集群",
    RoxieFileCopy: "Roxie 文件备份的状态",
    RunningServerStrain: "运行此进程可能需很长时间且会给服务器带来沉重的负载。 你确定要继续？",
    Sample: "样本",
    SampleRequest: "请求的样本",
    SampleResponse: "响应的样本",
    Save: "保存",
    Scope: "范围",
    SearchResults: "查询结果",
    SecondsRemaining: "剩余时间(秒)",
    Security: "安全",
    SelectPackageFile: "选择文件包文件",
    Separators: "分割符",
    Server: "服务器",
    ServiceName: "服务名称",
    Services: "服务",
    SetBanner: "标语设置",
    SetTextError: "文本太大无法显示. 请用&lsquo;帮助&rsquo;下载",
    SetToFailed: "设为失误状态",
    Severity: "严重性",
    Show: "显示",
    ShowProcessesUsingFilter: "使用过滤器显示进程",
    ShowSVG: "显示SVG",
    Size: "大小(长度)",
    Skew: "偏差",
    SkewNegative: "偏斜（-）",
    SkewPositive: "偏斜（+）",
    SLA: "SLA",
    SlaveLogs: "从属服务器日志",
    SlaveNumber: "从属服务器号",
    Slaves: "从属服务器",
    Smallest: "最小",
    SmallestFile: "最小文件",
    SmallestSize: "最小尺寸",
    SOAP: "SOAP",
    SomeDescription: "请输入说明",
    somefile: "*::文件名*",
    Source: "文件源",
    SourceCode: "原代码",
    SourceLogicalFile: "逻辑文件源",
    SourcePath: "原路径(可用通配符)",
    SourceProcess: "源进程",
    Spill: "切分",
    SplitPrefix: "分割前缀",
    Spray: "分布",
    Start: "开始",
    Started: "已开始",
    Starting: "开始",
    State: "状态",
    Stats: "统计",
    Status: "状态",
    Stopped: "已结束",
    Stopping: "停止",
    StorageInformation: "存储信息",
    Subgraph: "子图",
    Subgraphs: "子图",
    Submit: "提交",
    Subtype: "子类",
    SuccessfullySaved: "成功保存",
    Summary: "总结",
    SummaryMessage: "总结信息",
    SuperFile: "文件集",
    Superfile: "文件集",
    Superfiles: "文件集",
    SuperFiles: "文件集",
    SuperFilesBelongsTo: "文件集里的文件",
    SuperfilesOnly: "仅含文件集",
    SuperOwner: "超级拥有者",
    Suspend: "暂停使用",
    Suspended: "已暂停使用",
    SuspendedBy: "暂停使用者",
    SuspendedByCluster: "在集群服务器已暂停使用",
    SuspendedByUser: "用户已暂停使用",
    SuspendedReason: "暂停使用的原因",
    SVGSource: "SVG原始数据",
    SyncSelection: "选择同步",
    SystemServers: "系统服务器",
    Table: "表",
    tag: "标记",
    Target: "目标(系统)",
    TargetClusters: "计算机集群服务器",
    TargetName: "目标文件名",
    TargetNamePlaceholder: "某::逻辑文件::名",
    TargetRowTagRequired: "必须提供目标行标识",
    Targets: "目标",
    TargetScope: "目标范围",
    TargetWuid: "系统/工作单元标识",
    Terminators: "终止符",
    TestPages: "测试页面",
    Text: "文本",
    TheReturnedResults: "返回结果",
    ThorMasterAddress: "THOR主服务器的网址",
    ThorNetworkAddress: "Thor网址",
    ThorProcess: "Thor 进程",
    Time: "时间",
    Timers: "定时器",
    TimeSeconds: "时间(秒)",
    TimeStamp: "时间戳",
    TimeStarted: "起始时间",
    TimeStopped: "终止时间",
    Timings: "时间表",
    TimingsMap: "时间图",
    title_ActiveGroupPermissions: "有效用户组权限",
    title_ActivePermissions: "有效权限",
    title_Activity: "当前活动",
    title_AvailableGroupPermissions: "可选用户组权限",
    title_AvailablePermissions: "可选权限",
    title_BindingConfiguration: "捆绑设置",
    title_BindingDefinition: "捆绑定义",
    title_ClusterInfo: "组",
    title_CodeGeneratorPermissions: "代码生成权限",
    title_DefinitionExplorer: "定义延伸",
    title_Definitions: "定义",
    title_DESDL: "Dynamic ESDL",
    title_DFUQuery: "逻辑文件",
    title_DFUWUDetails: "DFU工作单元",
    title_DirectoriesFor: "目录为",
    title_DiskUsage: "硬盘使用率",
    title_ECLPlayground: "ECL操作平台",
    title_ErrorsWarnings: "错误/警告对",
    title_EventScheduleWorkunit: "事件计划",
    title_FileScopeDefaultPermissions: "文件默认权限",
    title_FilesPendingCopy: "待复制文件",
    title_FoundFilesFor: "找到文件为",
    title_GetDFUWorkunits: "DFU工作单元",
    title_Graph: "图形",
    title_GraphPage: "标题",
    title_Graphs: "图形",
    title_GridDetails: "修改",
    title_History: "历史",
    title_HPCCPlatformECL: "ECL Watch - 首页",
    title_HPCCPlatformFiles: "ECL Watch - 文件",
    title_HPCCPlatformMain: "ECL Watch - 首页",
    title_HPCCPlatformOps: "ECL Watch - 运行",
    title_HPCCPlatformRoxie: "ECL Watch - Roxie",
    title_HPCCPlatformServicesPlugin: "ECL Watch插件",
    title_Inputs: "输入",
    title_LFDetails: "逻辑文件的详细说明",
    title_LibrariesUsed: "使用的库文件",
    title_Log: "日志文件",
    title_LostFilesFor: "丢失文件为",
    title_LZBrowse: "文件停放区",
    title_MemberOf: "隶属",
    title_Members: "成员",
    title_Methods: "方法",
    title_OrphanFilesFor: "孤立文件为",
    title_PackageParts: "软件包组分",
    title_Permissions: "权限",
    title_PreflightResults: "预检结果",
    title_QuerySetDetails: "查询程序的详细说明",
    title_QuerySetErrors: "错误",
    title_QuerySetLogicalFiles: "查询程序逻辑文件",
    title_QuerySetQuery: "查询程序",
    title_QuerySetSuperFiles: "查询程序文件集",
    title_QueryTest: "查询程序测试",
    title_Result: "活动",
    title_Results: "结果",
    title_SearchResults: "查询结果",
    title_SourceFiles: "源文件",
    title_Topology: "系统结构",
    title_TpThorStatus: "状态",
    title_UserPermissions: "用户使用权限",
    title_UserQuery: "使用权限",
    title_WorkunitScopeDefaultPermissions: "工作单元默认权限",
    title_WUDetails: "ECL工作单元的详细说明",
    title_WUQuery: "ECL工作单元查询程序",
    To: "到",
    ToDate: "截止日期",
    Toenablegraphviews: "在使用图形阅读器前,请先安装图形控制器",
    Tooltip: "提示",
    TooManyFiles: "文件过多",
    Top: "上部",
    Topology: "系统结构",
    ToSizes: "最大文件长度",
    TotalClusterTime: "集群服务器累积时间",
    TotalParts: "所有部分",
    TotalSize: "总尺寸",
    TotalThorTime: "在Thor上的时间",
    TransitionGuide: "转换指南",
    Tree: "树",
    Type: "类型",
    Unbound: "解除捆绑",
    undefined: "未定义",
    Unknown: "未知",
    Unlock: "解锁",
    Unprotect: "取消保护",
    UnsupportedIE9FF: "不支持（IE <= 9, FireFox）",
    Unsuspend: "未暂停使用",
    Unsuspended: "未暂停使用",
    Up: "上",
    UpdateCloneFrom: "更新复制,从",
    UpdateDFs: "更新DFS",
    UpdateSuperFiles: "更新文件集",
    Upload: "上传",
    URL: "URL",
    Usage: "使用率",
    Used: "已使用",
    User: "用户",
    UserDetails: "用户详细内容",
    UserID: "用户标识",
    UserLogin: "请输入用户名登录",
    Username: "用户名",
    UserName: "用户名",
    UserPermissions: "用户使用权限",
    Users: "用户",
    UseSingleConnection: "使用单一联接",
    Validate: "检验",
    ValidateActivePackageMap: "检测已激活的文件包",
    ValidatePackageContent: "检测文件包内容",
    ValidatePackageMap: "检验文件包",
    ValidateResult: "=====检验结果=====\n\n",
    ValidateResultHere: "（检测结果）",
    Value: "值",
    Variable: "变量",
    VariableBigendian: "大端变量",
    Variables: "变量",
    VariableSourceType: "变量类型",
    Version: "版本",
    ViewByScope: "按范围显示",
    Views: "显示",
    Visualize: "可视化",
    WarnIfAvailableDiskSpaceIsUnder: "警告如果可用磁盘低于",
    WarnIfAvailableMemoryIsUnder: "警告如果可用内存低于",
    WarnIfCPUUsageIsOver: "警告如果CPU使用率超过",
    Warning: "警告",
    Warnings: "警告",
    WarnOldGraphControl: "警告: 旧版图形控制器",
    What: "什么",
    Where: "何处",
    Who: "谁",
    Width: "宽度",
    Workflows: "工作流程",
    Workunit: "工作单元",
    Workunits: "工作单元",
    WorkUnitScopeDefaultPermissions: "工作单元默认权限",
    Wrap: "自动换行",
    WSDL: "WSDL",
    WUID: "工作单元标识",
    Wuidcannotbeempty: "工作单元标识不可空缺.",
    WUSnapShot: "工作单元简单印象",
    XGMML: "XGMML",
    XLS: "XLS",
    XML: "XML",
    XRef: "XRef",
    Year: "年",
    YouAreAboutToBeLoggedOut: "你将要被退出",
    YouAreAboutToDeleteBinding: "你将要删除连接。你确定要继续？ ",
    YouAreAboutToDeleteDefinition: "您即将删除此定义，您要继续吗？",
    YouAreAboutToDeleteThisFile: "你确定要删除此文件？",
    YouAreAboutToDeleteThisPart: "你确定要删除这部分？",
    YouAreAboutToDeleteThisQueryset: "你确定要删除这个查询集？",
    YouAreAboutToDeleteThisWorkunit: "你确定要删除这个工作单元？",
    YouAreAboutToRemoveUserFrom: "您即将从此组中删除用户，您要继续吗？",
    YourBrowserMayNotSupport: "你的网络浏览器不支持这个大小的文件",
    YourScreenWasLocked: "ECLWatch界面被ESP锁死过。你的数据可能已陈旧, 请更新。",
    ZAP: "Z.A.P",
    ZeroLogicalFilesCheckFilter: "无逻辑文件(请检查筛选规则)",
    Zip: "Zip",
    ZippedAnalysisPackage: "压缩后的分析信息包",
    Zoom: "缩放",
    Zoom100Pct: "缩放100%",
    ZoomAll: "整体缩放",
    ZoomMinus: "缩小",
    ZoomPlus: "放大",
    ZoomWidth: "宽度缩放"

});

/***/ }),

/***/ "./lib/src/dojoLib.js":
/*!****************************!*\
  !*** ./lib/src/dojoLib.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.c(module.i), exports, __webpack_require__(/*! dojo/ready */ "./node_modules/dojo/ready.js"), __webpack_require__(/*! dojo/request/handlers */ "./node_modules/dojo/request/handlers.js"), __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"), __webpack_require__(/*! dojo/request/xhr */ "./node_modules/dojo/request/xhr.js"), __webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/i18n!hpcc/nls/hpcc */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js"), __webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, _ready, _handlers, _xhr, _json, _dom, _on, _nlsHPCC) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ready = _ready;
    exports.handlers = _handlers;
    exports.xhr = _xhr;
    exports.json = _json;
    exports.dom = _dom;
    exports.on = _on;
    exports.nlsHPCC = _nlsHPCC;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=dojoLib.js.map

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/lib/NoModule.js":
/*!**********************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/lib/NoModule.js ***!
  \**********************************************************/
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
module.exports = undefined;


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./eclwatch/nls/hpcc.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n!./eclwatch/nls/hpcc.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./eclwatch/nls/bs/hpcc.js?absMid=hpcc/nls/bs/hpcc */ "./eclwatch/nls/bs/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/es/hpcc.js?absMid=hpcc/nls/es/hpcc */ "./eclwatch/nls/es/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/hr/hpcc.js?absMid=hpcc/nls/hr/hpcc */ "./eclwatch/nls/hr/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/hu/hpcc.js?absMid=hpcc/nls/hu/hpcc */ "./eclwatch/nls/hu/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/pt-br/hpcc.js?absMid=hpcc/nls/pt-br/hpcc */ "./eclwatch/nls/pt-br/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/sr/hpcc.js?absMid=hpcc/nls/sr/hpcc */ "./eclwatch/nls/sr/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/zh/hpcc.js?absMid=hpcc/nls/zh/hpcc */ "./eclwatch/nls/zh/hpcc.js");
__webpack_require__(/*! ./eclwatch/nls/hpcc.js?absMid=hpcc/nls/hpcc */ "./eclwatch/nls/hpcc.js");
var req = __webpack_require__.dj.c();
module.exports = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js")("hpcc/nls/hpcc", req);

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js":
/*!**********************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
module.exports = function(name, req) {
	var result, resultSet;
	var loader = __webpack_require__(/*! dojo/i18n?absMid=dojo/i18n */ "./node_modules/dojo/i18n.js");
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

/***/ "./node_modules/dojo/Deferred.js":
/*!***************************************!*\
  !*** ./node_modules/dojo/Deferred.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ./errors/CancelError */ "./node_modules/dojo/errors/CancelError.js"),
	__webpack_require__(/*! ./promise/Promise */ "./node_modules/dojo/promise/Promise.js"),
	__webpack_require__(/*! ./promise/instrumentation */ "./node_modules/dojo/promise/instrumentation.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(has, lang, CancelError, Promise, instrumentation){
	"use strict";

	// module:
	//		dojo/Deferred

	var PROGRESS = 0,
			RESOLVED = 1,
			REJECTED = 2;
	var FULFILLED_ERROR_MESSAGE = "This deferred has already been fulfilled.";

	var freezeObject = Object.freeze || function(){};

	var signalWaiting = function(waiting, type, result, rejection, deferred){
		if(has("config-deferredInstrumentation")){
			if(type === REJECTED && Deferred.instrumentRejected && waiting.length === 0){
				Deferred.instrumentRejected(result, false, rejection, deferred);
			}
		}

		for(var i = 0; i < waiting.length; i++){
			signalListener(waiting[i], type, result, rejection);
		}
	};

	var signalListener = function(listener, type, result, rejection){
		var func = listener[type];
		var deferred = listener.deferred;
		if(func){
			try{
				var newResult = func(result);
				if(type === PROGRESS){
					if(typeof newResult !== "undefined"){
						signalDeferred(deferred, type, newResult);
					}
				}else{
					if(newResult && typeof newResult.then === "function"){
						listener.cancel = newResult.cancel;
						newResult.then(
								// Only make resolvers if they're actually going to be used
								makeDeferredSignaler(deferred, RESOLVED),
								makeDeferredSignaler(deferred, REJECTED),
								makeDeferredSignaler(deferred, PROGRESS));
						return;
					}
					signalDeferred(deferred, RESOLVED, newResult);
				}
			}catch(error){
				signalDeferred(deferred, REJECTED, error);
			}
		}else{
			signalDeferred(deferred, type, result);
		}

		if(has("config-deferredInstrumentation")){
			if(type === REJECTED && Deferred.instrumentRejected){
				Deferred.instrumentRejected(result, !!func, rejection, deferred.promise);
			}
		}
	};

	var makeDeferredSignaler = function(deferred, type){
		return function(value){
			signalDeferred(deferred, type, value);
		};
	};

	var signalDeferred = function(deferred, type, result){
		if(!deferred.isCanceled()){
			switch(type){
				case PROGRESS:
					deferred.progress(result);
					break;
				case RESOLVED:
					deferred.resolve(result);
					break;
				case REJECTED:
					deferred.reject(result);
					break;
			}
		}
	};

	var Deferred = function(canceler){
		// summary:
		//		Creates a new deferred. This API is preferred over
		//		`dojo/_base/Deferred`.
		// description:
		//		Creates a new deferred, as an abstraction over (primarily)
		//		asynchronous operations. The deferred is the private interface
		//		that should not be returned to calling code. That's what the
		//		`promise` is for. See `dojo/promise/Promise`.
		// canceler: Function?
		//		Will be invoked if the deferred is canceled. The canceler
		//		receives the reason the deferred was canceled as its argument.
		//		The deferred is rejected with its return value, or a new
		//		`dojo/errors/CancelError` instance.

		// promise: dojo/promise/Promise
		//		The public promise object that clients can add callbacks to. 
		var promise = this.promise = new Promise();

		var deferred = this;
		var fulfilled, result, rejection;
		var canceled = false;
		var waiting = [];

		if(has("config-deferredInstrumentation") && Error.captureStackTrace){
			Error.captureStackTrace(deferred, Deferred);
			Error.captureStackTrace(promise, Deferred);
		}

		this.isResolved = promise.isResolved = function(){
			// summary:
			//		Checks whether the deferred has been resolved.
			// returns: Boolean

			return fulfilled === RESOLVED;
		};

		this.isRejected = promise.isRejected = function(){
			// summary:
			//		Checks whether the deferred has been rejected.
			// returns: Boolean

			return fulfilled === REJECTED;
		};

		this.isFulfilled = promise.isFulfilled = function(){
			// summary:
			//		Checks whether the deferred has been resolved or rejected.
			// returns: Boolean

			return !!fulfilled;
		};

		this.isCanceled = promise.isCanceled = function(){
			// summary:
			//		Checks whether the deferred has been canceled.
			// returns: Boolean

			return canceled;
		};

		this.progress = function(update, strict){
			// summary:
			//		Emit a progress update on the deferred.
			// description:
			//		Emit a progress update on the deferred. Progress updates
			//		can be used to communicate updates about the asynchronous
			//		operation before it has finished.
			// update: any
			//		The progress update. Passed to progbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently no progress can be emitted.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				signalWaiting(waiting, PROGRESS, update, null, deferred);
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		this.resolve = function(value, strict){
			// summary:
			//		Resolve the deferred.
			// description:
			//		Resolve the deferred, putting it in a success state.
			// value: any
			//		The result of the deferred. Passed to callbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be resolved.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				// Set fulfilled, store value. After signaling waiting listeners unset
				// waiting.
				signalWaiting(waiting, fulfilled = RESOLVED, result = value, null, deferred);
				waiting = null;
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		var reject = this.reject = function(error, strict){
			// summary:
			//		Reject the deferred.
			// description:
			//		Reject the deferred, putting it in an error state.
			// error: any
			//		The error result of the deferred. Passed to errbacks.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be rejected.
			// returns: dojo/promise/Promise
			//		Returns the original promise for the deferred.

			if(!fulfilled){
				if(has("config-deferredInstrumentation") && Error.captureStackTrace){
					Error.captureStackTrace(rejection = {}, reject);
				}
				signalWaiting(waiting, fulfilled = REJECTED, result = error, rejection, deferred);
				waiting = null;
				return promise;
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}else{
				return promise;
			}
		};

		this.then = promise.then = function(callback, errback, progback){
			// summary:
			//		Add new callbacks to the deferred.
			// description:
			//		Add new callbacks to the deferred. Callbacks can be added
			//		before or after the deferred is fulfilled.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved.
			//		Receives the resolution value.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			//		Receives the rejection error.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress
			//		update. Receives the progress update.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback(s).
			//		This can be used for chaining many asynchronous operations.

			var listener = [progback, callback, errback];
			// Ensure we cancel the promise we're waiting for, or if callback/errback
			// have returned a promise, cancel that one.
			listener.cancel = promise.cancel;
			listener.deferred = new Deferred(function(reason){
				// Check whether cancel is really available, returned promises are not
				// required to expose `cancel`
				return listener.cancel && listener.cancel(reason);
			});
			if(fulfilled && !waiting){
				signalListener(listener, fulfilled, result, rejection);
			}else{
				waiting.push(listener);
			}
			return listener.deferred.promise;
		};

		this.cancel = promise.cancel = function(reason, strict){
			// summary:
			//		Inform the deferred it may cancel its asynchronous operation.
			// description:
			//		Inform the deferred it may cancel its asynchronous operation.
			//		The deferred's (optional) canceler is invoked and the
			//		deferred will be left in a rejected state. Can affect other
			//		promises that originate with the same deferred.
			// reason: any
			//		A message that may be sent to the deferred's canceler,
			//		explaining why it's being canceled.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be canceled.
			// returns: any
			//		Returns the rejection reason if the deferred was canceled
			//		normally.

			if(!fulfilled){
				// Cancel can be called even after the deferred is fulfilled
				if(canceler){
					var returnedReason = canceler(reason);
					reason = typeof returnedReason === "undefined" ? reason : returnedReason;
				}
				canceled = true;
				if(!fulfilled){
					// Allow canceler to provide its own reason, but fall back to a CancelError
					if(typeof reason === "undefined"){
						reason = new CancelError();
					}
					reject(reason);
					return reason;
				}else if(fulfilled === REJECTED && result === reason){
					return reason;
				}
			}else if(strict === true){
				throw new Error(FULFILLED_ERROR_MESSAGE);
			}
		};

		freezeObject(promise);
	};

	Deferred.prototype.toString = function(){
		// returns: String
		//		Returns `[object Deferred]`.

		return "[object Deferred]";
	};

	if(instrumentation){
		instrumentation(Deferred);
	}

	return Deferred;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/Evented.js":
/*!**************************************!*\
  !*** ./node_modules/dojo/Evented.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! ./on */ "./node_modules/dojo/on.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(aspect, on){
	// module:
	//		dojo/Evented

 	"use strict";
 	var after = aspect.after;
	function Evented(){
		// summary:
		//		A class that can be used as a mixin or base class,
		//		to add on() and emit() methods to a class
		//		for listening for events and emitting events:
		// example:
		//		|	define(["dojo/Evented", "dojo/_base/declare", "dojo/Stateful"
		//		|	], function(Evented, declare, Stateful){
		//		|		var EventedStateful = declare([Evented, Stateful], {...});
		//		|		var instance = new EventedStateful();
		//		|		instance.on("open", function(event){
		//		|		... do something with event
		//		|	 });
		//		|
		//		|	instance.emit("open", {name:"some event", ...});
	}
	Evented.prototype = {
		on: function(type, listener){
			return on.parse(this, type, listener, function(target, type){
				return after(target, 'on' + type, listener, true);
			});
		},
		emit: function(type, event){
			var args = [this];
			args.push.apply(args, arguments);
			return on.emit.apply(on, args);
		}
	};
	return Evented;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/Deferred.js":
/*!*********************************************!*\
  !*** ./node_modules/dojo/_base/Deferred.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! ../Deferred */ "./node_modules/dojo/Deferred.js"),
	__webpack_require__(/*! ../promise/Promise */ "./node_modules/dojo/promise/Promise.js"),
	__webpack_require__(/*! ../errors/CancelError */ "./node_modules/dojo/errors/CancelError.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ./lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../when */ "./node_modules/dojo/when.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, NewDeferred, Promise, CancelError, has, lang, when){
	// module:
	//		dojo/_base/Deferred

	var mutator = function(){};
	var freeze = Object.freeze || function(){};
	// A deferred provides an API for creating and resolving a promise.
	var Deferred = dojo.Deferred = function(/*Function?*/ canceller){
		// summary:
		//		Deprecated.   This module defines the legacy dojo/_base/Deferred API.
		//		New code should use dojo/Deferred instead.
		// description:
		//		The Deferred API is based on the concept of promises that provide a
		//		generic interface into the eventual completion of an asynchronous action.
		//		The motivation for promises fundamentally is about creating a
		//		separation of concerns that allows one to achieve the same type of
		//		call patterns and logical data flow in asynchronous code as can be
		//		achieved in synchronous code. Promises allows one
		//		to be able to call a function purely with arguments needed for
		//		execution, without conflating the call with concerns of whether it is
		//		sync or async. One shouldn't need to alter a call's arguments if the
		//		implementation switches from sync to async (or vice versa). By having
		//		async functions return promises, the concerns of making the call are
		//		separated from the concerns of asynchronous interaction (which are
		//		handled by the promise).
		//
		//		The Deferred is a type of promise that provides methods for fulfilling the
		//		promise with a successful result or an error. The most important method for
		//		working with Dojo's promises is the then() method, which follows the
		//		CommonJS proposed promise API. An example of using a Dojo promise:
		//
		//		|	var resultingPromise = someAsyncOperation.then(function(result){
		//		|		... handle result ...
		//		|	},
		//		|	function(error){
		//		|		... handle error ...
		//		|	});
		//
		//		The .then() call returns a new promise that represents the result of the
		//		execution of the callback. The callbacks will never affect the original promises value.
		//
		//		The Deferred instances also provide the following functions for backwards compatibility:
		//
		//		- addCallback(handler)
		//		- addErrback(handler)
		//		- callback(result)
		//		- errback(result)
		//
		//		Callbacks are allowed to return promises themselves, so
		//		you can build complicated sequences of events with ease.
		//
		//		The creator of the Deferred may specify a canceller.  The canceller
		//		is a function that will be called if Deferred.cancel is called
		//		before the Deferred fires. You can use this to implement clean
		//		aborting of an XMLHttpRequest, etc. Note that cancel will fire the
		//		deferred with a CancelledError (unless your canceller returns
		//		another kind of error), so the errbacks should be prepared to
		//		handle that error for cancellable Deferreds.
		// example:
		//	|	var deferred = new Deferred();
		//	|	setTimeout(function(){ deferred.callback({success: true}); }, 1000);
		//	|	return deferred;
		// example:
		//		Deferred objects are often used when making code asynchronous. It
		//		may be easiest to write functions in a synchronous manner and then
		//		split code using a deferred to trigger a response to a long-lived
		//		operation. For example, instead of register a callback function to
		//		denote when a rendering operation completes, the function can
		//		simply return a deferred:
		//
		//		|	// callback style:
		//		|	function renderLotsOfData(data, callback){
		//		|		var success = false
		//		|		try{
		//		|			for(var x in data){
		//		|				renderDataitem(data[x]);
		//		|			}
		//		|			success = true;
		//		|		}catch(e){ }
		//		|		if(callback){
		//		|			callback(success);
		//		|		}
		//		|	}
		//
		//		|	// using callback style
		//		|	renderLotsOfData(someDataObj, function(success){
		//		|		// handles success or failure
		//		|		if(!success){
		//		|			promptUserToRecover();
		//		|		}
		//		|	});
		//		|	// NOTE: no way to add another callback here!!
		// example:
		//		Using a Deferred doesn't simplify the sending code any, but it
		//		provides a standard interface for callers and senders alike,
		//		providing both with a simple way to service multiple callbacks for
		//		an operation and freeing both sides from worrying about details
		//		such as "did this get called already?". With Deferreds, new
		//		callbacks can be added at any time.
		//
		//		|	// Deferred style:
		//		|	function renderLotsOfData(data){
		//		|		var d = new Deferred();
		//		|		try{
		//		|			for(var x in data){
		//		|				renderDataitem(data[x]);
		//		|			}
		//		|			d.callback(true);
		//		|		}catch(e){
		//		|			d.errback(new Error("rendering failed"));
		//		|		}
		//		|		return d;
		//		|	}
		//
		//		|	// using Deferred style
		//		|	renderLotsOfData(someDataObj).then(null, function(){
		//		|		promptUserToRecover();
		//		|	});
		//		|	// NOTE: addErrback and addCallback both return the Deferred
		//		|	// again, so we could chain adding callbacks or save the
		//		|	// deferred for later should we need to be notified again.
		// example:
		//		In this example, renderLotsOfData is synchronous and so both
		//		versions are pretty artificial. Putting the data display on a
		//		timeout helps show why Deferreds rock:
		//
		//		|	// Deferred style and async func
		//		|	function renderLotsOfData(data){
		//		|		var d = new Deferred();
		//		|		setTimeout(function(){
		//		|			try{
		//		|				for(var x in data){
		//		|					renderDataitem(data[x]);
		//		|				}
		//		|				d.callback(true);
		//		|			}catch(e){
		//		|				d.errback(new Error("rendering failed"));
		//		|			}
		//		|		}, 100);
		//		|		return d;
		//		|	}
		//
		//		|	// using Deferred style
		//		|	renderLotsOfData(someDataObj).then(null, function(){
		//		|		promptUserToRecover();
		//		|	});
		//
		//		Note that the caller doesn't have to change his code at all to
		//		handle the asynchronous case.

		var result, finished, canceled, fired, isError, head, nextListener;
		var promise = (this.promise = new Promise());

		function complete(value){
			if(finished){
				throw new Error("This deferred has already been resolved");
			}
			result = value;
			finished = true;
			notify();
		}
		function notify(){
			var mutated;
			while(!mutated && nextListener){
				var listener = nextListener;
				nextListener = nextListener.next;
				if((mutated = (listener.progress == mutator))){ // assignment and check
					finished = false;
				}

				var func = (isError ? listener.error : listener.resolved);
				if(has("config-useDeferredInstrumentation")){
					if(isError && NewDeferred.instrumentRejected){
						NewDeferred.instrumentRejected(result, !!func);
					}
				}
				if(func){
					try{
						var newResult = func(result);
						if (newResult && typeof newResult.then === "function"){
							newResult.then(lang.hitch(listener.deferred, "resolve"), lang.hitch(listener.deferred, "reject"), lang.hitch(listener.deferred, "progress"));
							continue;
						}
						var unchanged = mutated && newResult === undefined;
						if(mutated && !unchanged){
							isError = newResult instanceof Error;
						}
						listener.deferred[unchanged && isError ? "reject" : "resolve"](unchanged ? result : newResult);
					}catch(e){
						listener.deferred.reject(e);
					}
				}else{
					if(isError){
						listener.deferred.reject(result);
					}else{
						listener.deferred.resolve(result);
					}
				}
			}
		}

		this.isResolved = promise.isResolved = function(){
			// summary:
			//		Checks whether the deferred has been resolved.
			// returns: Boolean

			return fired == 0;
		};

		this.isRejected = promise.isRejected = function(){
			// summary:
			//		Checks whether the deferred has been rejected.
			// returns: Boolean

			return fired == 1;
		};

		this.isFulfilled = promise.isFulfilled = function(){
			// summary:
			//		Checks whether the deferred has been resolved or rejected.
			// returns: Boolean

			return fired >= 0;
		};

		this.isCanceled = promise.isCanceled = function(){
			// summary:
			//		Checks whether the deferred has been canceled.
			// returns: Boolean

			return canceled;
		};

		// calling resolve will resolve the promise
		this.resolve = this.callback = function(value){
			// summary:
			//		Fulfills the Deferred instance successfully with the provide value
			this.fired = fired = 0;
			this.results = [value, null];
			complete(value);
		};


		// calling error will indicate that the promise failed
		this.reject = this.errback = function(error){
			// summary:
			//		Fulfills the Deferred instance as an error with the provided error
			isError = true;
			this.fired = fired = 1;
			if(has("config-useDeferredInstrumentation")){
				if(NewDeferred.instrumentRejected){
					NewDeferred.instrumentRejected(error, !!nextListener);
				}
			}
			complete(error);
			this.results = [null, error];
		};
		// call progress to provide updates on the progress on the completion of the promise
		this.progress = function(update){
			// summary:
			//		Send progress events to all listeners
			var listener = nextListener;
			while(listener){
				var progress = listener.progress;
				progress && progress(update);
				listener = listener.next;
			}
		};
		this.addCallbacks = function(callback, errback){
			// summary:
			//		Adds callback and error callback for this deferred instance.
			// callback: Function?
			//		The callback attached to this deferred object.
			// errback: Function?
			//		The error callback attached to this deferred object.
			// returns:
			//		Returns this deferred object.
			this.then(callback, errback, mutator);
			return this;	// Deferred
		};
		// provide the implementation of the promise
		promise.then = this.then = function(/*Function?*/resolvedCallback, /*Function?*/errorCallback, /*Function?*/progressCallback){
			// summary:
			//		Adds a fulfilledHandler, errorHandler, and progressHandler to be called for
			//		completion of a promise. The fulfilledHandler is called when the promise
			//		is fulfilled. The errorHandler is called when a promise fails. The
			//		progressHandler is called for progress events. All arguments are optional
			//		and non-function values are ignored. The progressHandler is not only an
			//		optional argument, but progress events are purely optional. Promise
			//		providers are not required to ever create progress events.
			//
			//		This function will return a new promise that is fulfilled when the given
			//		fulfilledHandler or errorHandler callback is finished. This allows promise
			//		operations to be chained together. The value returned from the callback
			//		handler is the fulfillment value for the returned promise. If the callback
			//		throws an error, the returned promise will be moved to failed state.
			//
			// returns:
			//		Returns a new promise that represents the result of the
			//		execution of the callback. The callbacks will never affect the original promises value.
			// example:
			//		An example of using a CommonJS compliant promise:
			//		|	asyncComputeTheAnswerToEverything().
			//		|		then(addTwo).
			//		|		then(printResult, onError);
			//		|	>44
			//
			var returnDeferred = progressCallback == mutator ? this : new Deferred(promise.cancel);
			var listener = {
				resolved: resolvedCallback,
				error: errorCallback,
				progress: progressCallback,
				deferred: returnDeferred
			};
			if(nextListener){
				head = head.next = listener;
			}
			else{
				nextListener = head = listener;
			}
			if(finished){
				notify();
			}
			return returnDeferred.promise; // Promise
		};
		var deferred = this;
		promise.cancel = this.cancel = function(){
			// summary:
			//		Cancels the asynchronous operation
			if(!finished){
				var error = canceller && canceller(deferred);
				if(!finished){
					if (!(error instanceof Error)){
						error = new CancelError(error);
					}
					error.log = false;
					deferred.reject(error);
				}
			}
			canceled = true;
		};
		freeze(promise);
	};
	lang.extend(Deferred, {
		addCallback: function(/*Function*/ callback){
			// summary:
			//		Adds successful callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			return this.addCallbacks(lang.hitch.apply(dojo, arguments));	// Deferred
		},

		addErrback: function(/*Function*/ errback){
			// summary:
			//		Adds error callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			return this.addCallbacks(null, lang.hitch.apply(dojo, arguments));	// Deferred
		},

		addBoth: function(/*Function*/ callback){
			// summary:
			//		Add handler as both successful callback and error callback for this deferred instance.
			// returns:
			//		Returns this deferred object.
			var enclosed = lang.hitch.apply(dojo, arguments);
			return this.addCallbacks(enclosed, enclosed);	// Deferred
		},
		fired: -1
	});

	Deferred.when = dojo.when = when;

	return Deferred;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/array.js":
/*!******************************************!*\
  !*** ./node_modules/dojo/_base/array.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"), __webpack_require__(/*! ./lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, has, lang){
	// module:
	//		dojo/_base/array

	// our old simple function builder stuff
	var cache = {}, u;

	function buildFn(fn){
		return cache[fn] = new Function("item", "index", "array", fn); // Function
	}
	// magic snippet: if(typeof fn == "string") fn = cache[fn] || buildFn(fn);

	// every & some

	function everyOrSome(some){
		var every = !some;
		return function(a, fn, o){
			var i = 0, l = a && a.length || 0, result;
			if(l && typeof a == "string") a = a.split("");
			if(typeof fn == "string") fn = cache[fn] || buildFn(fn);
			if(o){
				for(; i < l; ++i){
					result = !fn.call(o, a[i], i, a);
					if(some ^ result){
						return !result;
					}
				}
			}else{
				for(; i < l; ++i){
					result = !fn(a[i], i, a);
					if(some ^ result){
						return !result;
					}
				}
			}
			return every; // Boolean
		};
	}

	// indexOf, lastIndexOf

	function index(up){
		var delta = 1, lOver = 0, uOver = 0;
		if(!up){
			delta = lOver = uOver = -1;
		}
		return function(a, x, from, last){
			if(last && delta > 0){
				// TODO: why do we use a non-standard signature? why do we need "last"?
				return array.lastIndexOf(a, x, from);
			}
			var l = a && a.length || 0, end = up ? l + uOver : lOver, i;
			if(from === u){
				i = up ? lOver : l + uOver;
			}else{
				if(from < 0){
					i = l + from;
					if(i < 0){
						i = lOver;
					}
				}else{
					i = from >= l ? l + uOver : from;
				}
			}
			if(l && typeof a == "string") a = a.split("");
			for(; i != end; i += delta){
				if(a[i] == x){
					return i; // Number
				}
			}
			return -1; // Number
		};
	}

	var array = {
		// summary:
		//		The Javascript v1.6 array extensions.

		every: everyOrSome(false),
		/*=====
		 every: function(arr, callback, thisObject){
			 // summary:
			 //		Determines whether or not every item in arr satisfies the
			 //		condition implemented by callback.
			 // arr: Array|String
			 //		the array to iterate on. If a string, operates on individual characters.
			 // callback: Function|String
			 //		a function is invoked with three arguments: item, index,
			 //		and array and returns true if the condition is met.
			 // thisObject: Object?
			 //		may be used to scope the call to callback
			 // returns: Boolean
			 // description:
			 //		This function corresponds to the JavaScript 1.6 Array.every() method, with one difference: when
			 //		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			 //		the callback function with a value of undefined. JavaScript 1.6's every skips the holes in the sparse array.
			 //		For more details, see:
			 //		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/every
			 // example:
			 //	|	// returns false
			 //	|	array.every([1, 2, 3, 4], function(item){ return item>1; });
			 // example:
			 //	|	// returns true
			 //	|	array.every([1, 2, 3, 4], function(item){ return item>0; });
		 },
		 =====*/

		some: everyOrSome(true),
		/*=====
		some: function(arr, callback, thisObject){
			// summary:
			//		Determines whether or not any item in arr satisfies the
			//		condition implemented by callback.
			// arr: Array|String
			//		the array to iterate over. If a string, operates on individual characters.
			// callback: Function|String
			//		a function is invoked with three arguments: item, index,
			//		and array and returns true if the condition is met.
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Boolean
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.some() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's some skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/some
			// example:
			//	| // is true
			//	| array.some([1, 2, 3, 4], function(item){ return item>1; });
			// example:
			//	| // is false
			//	| array.some([1, 2, 3, 4], function(item){ return item<1; });
		},
		=====*/

		indexOf: index(true),
		/*=====
		indexOf: function(arr, value, fromIndex, findLast){
			// summary:
			//		locates the first index of the provided value in the
			//		passed array. If the value is not found, -1 is returned.
			// description:
			//		This method corresponds to the JavaScript 1.6 Array.indexOf method, with two differences:
			//
			//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
			//		   whereas JavaScript 1.6's indexOf skips the holes in the sparse array.
			//		2. uses equality (==) rather than strict equality (===)
			//
			//		For details on this method, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/indexOf
			// arr: Array
			// value: Object
			// fromIndex: Integer?
			// findLast: Boolean?
			//		Makes indexOf() work like lastIndexOf().  Used internally; not meant for external usage.
			// returns: Number
		},
		=====*/

		lastIndexOf: index(false),
		/*=====
		lastIndexOf: function(arr, value, fromIndex){
			// summary:
			//		locates the last index of the provided value in the passed
			//		array. If the value is not found, -1 is returned.
			// description:
		 	//		This method corresponds to the JavaScript 1.6 Array.lastIndexOf method, with two differences:
		 	//
		 	//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
		 	//		   whereas JavaScript 1.6's lasIndexOf skips the holes in the sparse array.
		 	//		2. uses equality (==) rather than strict equality (===)
		 	//
		 	//		For details on this method, see:
		 	//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/lastIndexOf
			// arr: Array,
			// value: Object,
			// fromIndex: Integer?
			// returns: Number
		},
		=====*/

		forEach: function(arr, callback, thisObject){
			// summary:
			//		for every item in arr, callback is invoked. Return values are ignored.
			//		If you want to break out of the loop, consider using array.every() or array.some().
			//		forEach does not allow breaking out of the loop over the items in arr.
			// arr:
			//		the array to iterate over. If a string, operates on individual characters.
			// callback:
			//		a function is invoked with three arguments: item, index, and array
			// thisObject:
			//		may be used to scope the call to callback
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.forEach() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's forEach skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach
			// example:
			//	| // log out all members of the array:
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		function(item){
			//	|			console.log(item);
			//	|		}
			//	| );
			// example:
			//	| // log out the members and their indexes
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		function(item, idx, arr){
			//	|			console.log(item, "at index:", idx);
			//	|		}
			//	| );
			// example:
			//	| // use a scoped object member as the callback
			//	|
			//	| var obj = {
			//	|		prefix: "logged via obj.callback:",
			//	|		callback: function(item){
			//	|			console.log(this.prefix, item);
			//	|		}
			//	| };
			//	|
			//	| // specifying the scope function executes the callback in that scope
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		obj.callback,
			//	|		obj
			//	| );
			//	|
			//	| // alternately, we can accomplish the same thing with lang.hitch()
			//	| array.forEach(
			//	|		[ "thinger", "blah", "howdy", 10 ],
			//	|		lang.hitch(obj, "callback")
			//	| );
			// arr: Array|String
			// callback: Function|String
			// thisObject: Object?

			var i = 0, l = arr && arr.length || 0;
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					callback.call(thisObject, arr[i], i, arr);
				}
			}else{
				for(; i < l; ++i){
					callback(arr[i], i, arr);
				}
			}
		},

		map: function(arr, callback, thisObject, Ctr){
			// summary:
			//		applies callback to each element of arr and returns
			//		an Array with the results
			// arr: Array|String
			//		the array to iterate on. If a string, operates on
			//		individual characters.
			// callback: Function|String
			//		a function is invoked with three arguments, (item, index,
			//		array),	 and returns a value
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Array
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.map() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's map skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
			// example:
			//	| // returns [2, 3, 4, 5]
			//	| array.map([1, 2, 3, 4], function(item){ return item+1 });

			// TODO: why do we have a non-standard signature here? do we need "Ctr"?
			var i = 0, l = arr && arr.length || 0, out = new (Ctr || Array)(l);
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					out[i] = callback.call(thisObject, arr[i], i, arr);
				}
			}else{
				for(; i < l; ++i){
					out[i] = callback(arr[i], i, arr);
				}
			}
			return out; // Array
		},

		filter: function(arr, callback, thisObject){
			// summary:
			//		Returns a new Array with those items from arr that match the
			//		condition implemented by callback.
			// arr: Array
			//		the array to iterate over.
			// callback: Function|String
			//		a function that is invoked with three arguments (item,
			//		index, array). The return of this function is expected to
			//		be a boolean which determines whether the passed-in item
			//		will be included in the returned array.
			// thisObject: Object?
			//		may be used to scope the call to callback
			// returns: Array
			// description:
			//		This function corresponds to the JavaScript 1.6 Array.filter() method, with one difference: when
			//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
			//		the callback function with a value of undefined. JavaScript 1.6's filter skips the holes in the sparse array.
			//		For more details, see:
			//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
			// example:
			//	| // returns [2, 3, 4]
			//	| array.filter([1, 2, 3, 4], function(item){ return item>1; });

			// TODO: do we need "Ctr" here like in map()?
			var i = 0, l = arr && arr.length || 0, out = [], value;
			if(l && typeof arr == "string") arr = arr.split("");
			if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
			if(thisObject){
				for(; i < l; ++i){
					value = arr[i];
					if(callback.call(thisObject, value, i, arr)){
						out.push(value);
					}
				}
			}else{
				for(; i < l; ++i){
					value = arr[i];
					if(callback(value, i, arr)){
						out.push(value);
					}
				}
			}
			return out; // Array
		},

		clearCache: function(){
			cache = {};
		}
	};


	has("extend-dojo") && lang.mixin(dojo, array);

	return array;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/config.js":
/*!*******************************************!*\
  !*** ./node_modules/dojo/_base/config.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../global */ "./node_modules/dojo/global.js"), __webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"), __webpack_require__.dj.c(module.i)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(global, has, require){
	// module:
	//		dojo/_base/config

/*=====
return {
	// summary:
	//		This module defines the user configuration during bootstrap.
	// description:
	//		By defining user configuration as a module value, an entire configuration can be specified in a build,
	//		thereby eliminating the need for sniffing and or explicitly setting in the global variable dojoConfig.
	//		Also, when multiple instances of dojo exist in a single application, each will necessarily be located
	//		at an unique absolute module identifier as given by the package configuration. Implementing configuration
	//		as a module allows for specifying unique, per-instance configurations.
	// example:
	//		Create a second instance of dojo with a different, instance-unique configuration (assume the loader and
	//		dojo.js are already loaded).
	//		|	// specify a configuration that creates a new instance of dojo at the absolute module identifier "myDojo"
	//		|	require({
	//		|		packages:[{
	//		|			name:"myDojo",
	//		|			location:".", //assume baseUrl points to dojo.js
	//		|		}]
	//		|	});
	//		|
	//		|	// specify a configuration for the myDojo instance
	//		|	define("myDojo/config", {
	//		|		// normal configuration variables go here, e.g.,
	//		|		locale:"fr-ca"
	//		|	});
	//		|
	//		|	// load and use the new instance of dojo
	//		|	require(["myDojo"], function(dojo){
	//		|		// dojo is the new instance of dojo
	//		|		// use as required
	//		|	});

	// isDebug: Boolean
	//		Defaults to `false`. If set to `true`, ensures that Dojo provides
	//		extended debugging feedback to the console.
	isDebug: false,

	// locale: String
	//		The locale to assume for loading localized resources in this page,
	//		specified according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
	//		Must be specified entirely in lowercase, e.g. `en-us` and `zh-cn`.
	//		See the documentation for `dojo.i18n` and `dojo.requireLocalization`
	//		for details on loading localized resources. If no locale is specified,
	//		Dojo assumes the locale of the user agent, according to `navigator.userLanguage`
	//		or `navigator.language` properties.
	locale: undefined,

	// extraLocale: Array
	//		No default value. Specifies additional locales whose
	//		resources should also be loaded alongside the default locale when
	//		calls to `dojo.requireLocalization()` are processed.
	extraLocale: undefined,

	// baseUrl: String
	//		The directory in which `dojo.js` is located. Under normal
	//		conditions, Dojo auto-detects the correct location from which it
	//		was loaded. You may need to manually configure `baseUrl` in cases
	//		where you have renamed `dojo.js` or in which `<base>` tags confuse
	//		some browsers (e.g. IE 6). The variable `dojo.baseUrl` is assigned
	//		either the value of `djConfig.baseUrl` if one is provided or the
	//		auto-detected root if not. Other modules are located relative to
	//		this path. The path should end in a slash.
	baseUrl: undefined,

	// modulePaths: [deprecated] Object
	//		A map of module names to paths relative to `dojo.baseUrl`. The
	//		key/value pairs correspond directly to the arguments which
	//		`dojo.registerModulePath` accepts. Specifying
	//		`djConfig.modulePaths = { "foo": "../../bar" }` is the equivalent
	//		of calling `dojo.registerModulePath("foo", "../../bar");`. Multiple
	//		modules may be configured via `djConfig.modulePaths`.
	modulePaths: {},

	// addOnLoad: Function|Array
	//		Adds a callback via dojo/ready. Useful when Dojo is added after
	//		the page loads and djConfig.afterOnLoad is true. Supports the same
	//		arguments as dojo/ready. When using a function reference, use
	//		`djConfig.addOnLoad = function(){};`. For object with function name use
	//		`djConfig.addOnLoad = [myObject, "functionName"];` and for object with
	//		function reference use
	//		`djConfig.addOnLoad = [myObject, function(){}];`
	addOnLoad: null,

	// parseOnLoad: Boolean
	//		Run the parser after the page is loaded
	parseOnLoad: false,

	// require: String[]
	//		An array of module names to be loaded immediately after dojo.js has been included
	//		in a page.
	require: [],

	// defaultDuration: Number
	//		Default duration, in milliseconds, for wipe and fade animations within dijits.
	//		Assigned to dijit.defaultDuration.
	defaultDuration: 200,

	// dojoBlankHtmlUrl: String
	//		Used by some modules to configure an empty iframe. Used by dojo/io/iframe and
	//		dojo/back, and dijit/popup support in IE where an iframe is needed to make sure native
	//		controls do not bleed through the popups. Normally this configuration variable
	//		does not need to be set, except when using cross-domain/CDN Dojo builds.
	//		Save dojo/resources/blank.html to your domain and set `djConfig.dojoBlankHtmlUrl`
	//		to the path on your domain your copy of blank.html.
	dojoBlankHtmlUrl: undefined,

	// ioPublish: Boolean?
	//		Set this to true to enable publishing of topics for the different phases of
	//		IO operations. Publishing is done via dojo/topic.publish(). See dojo/main.__IoPublish for a list
	//		of topics that are published.
	ioPublish: false,

	// transparentColor: Array
	//		Array containing the r, g, b components used as transparent color in dojo.Color;
	//		if undefined, [255,255,255] (white) will be used.
	transparentColor: undefined,
	
	// deps: Function|Array
	//		Defines dependencies to be used before the loader has been loaded.
	//		When provided, they cause the loader to execute require(deps, callback) 
	//		once it has finished loading. Should be used with callback.
	deps: undefined,
	
	// callback: Function|Array
	//		Defines a callback to be used when dependencies are defined before 
	//		the loader has been loaded. When provided, they cause the loader to 
	//		execute require(deps, callback) once it has finished loading. 
	//		Should be used with deps.
	callback: undefined,
	
	// deferredInstrumentation: Boolean
	//		Whether deferred instrumentation should be loaded or included
	//		in builds.
	deferredInstrumentation: true,

	// useDeferredInstrumentation: Boolean|String
	//		Whether the deferred instrumentation should be used.
	//
	//		* `"report-rejections"`: report each rejection as it occurs.
	//		* `true` or `1` or `"report-unhandled-rejections"`: wait 1 second
	//			in an attempt to detect unhandled rejections.
	useDeferredInstrumentation: "report-unhandled-rejections"
};
=====*/

	var result = {};
	if(has("dojo-config-api")){
		// must be the dojo loader; take a shallow copy of require.rawConfig
		var src = require.rawConfig, p;
		for(p in src){
			result[p] = src[p];
		}
	}else{
		var adviseHas = function(featureSet, prefix, booting){
			for(p in featureSet){
				p!="has" && has.add(prefix + p, featureSet[p], 0, booting);
			}
		};
		result = has("dojo-loader") ?
			// must be a built version of the dojo loader; all config stuffed in require.rawConfig
			require.rawConfig :
			// a foreign loader
			global.dojoConfig || global.djConfig || {};
		adviseHas(result, "config", 1);
		adviseHas(result.has, "", 1);
	}

	if(!result.locale && typeof navigator != "undefined"){
		// Default locale for browsers (ensure it's read from user-settings not download locale).
		var language = (navigator.languages && navigator.languages.length) ? navigator.languages[0] :
			(navigator.language || navigator.userLanguage);
		if(language){
			result.locale = language.toLowerCase();
		}
	}

	return result;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ }),

/***/ "./node_modules/dojo/_base/json.js":
/*!*****************************************!*\
  !*** ./node_modules/dojo/_base/json.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ../json */ "./node_modules/dojo/json.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, json){

// module:
//		dojo/_base/json

/*=====
return {
	// summary:
	//		This module defines the dojo JSON API.
};
=====*/

dojo.fromJson = function(/*String*/ js){
	// summary:
	//		Parses a JavaScript expression and returns a JavaScript value.
	// description:
	//		Throws for invalid JavaScript expressions. It does not use a strict JSON parser. It
	//		always delegates to eval(). The content passed to this method must therefore come
	//		from a trusted source.
	//		It is recommend that you use dojo/json's parse function for an
	//		implementation uses the (faster) native JSON parse when available.
	// js:
	//		a string literal of a JavaScript expression, for instance:
	//		`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`

	return eval("(" + js + ")"); // Object
};

/*=====
dojo._escapeString = function(){
	// summary:
	//		Adds escape sequences for non-visual characters, double quote and
	//		backslash and surrounds with double quotes to form a valid string
	//		literal.
};
=====*/
dojo._escapeString = json.stringify; // just delegate to json.stringify

dojo.toJsonIndentStr = "\t";
dojo.toJson = function(/*Object*/ it, /*Boolean?*/ prettyPrint){
	// summary:
	//		Returns a [JSON](http://json.org) serialization of an object.
	// description:
	//		Returns a [JSON](http://json.org) serialization of an object.
	//		Note that this doesn't check for infinite recursion, so don't do that!
	//		It is recommend that you use dojo/json's stringify function for an lighter
	//		and faster implementation that matches the native JSON API and uses the
	//		native JSON serializer when available.
	// it:
	//		an object to be serialized. Objects may define their own
	//		serialization via a special "__json__" or "json" function
	//		property. If a specialized serializer has been defined, it will
	//		be used as a fallback.
	//		Note that in 1.6, toJson would serialize undefined, but this no longer supported
	//		since it is not supported by native JSON serializer.
	// prettyPrint:
	//		if true, we indent objects and arrays to make the output prettier.
	//		The variable `dojo.toJsonIndentStr` is used as the indent string --
	//		to use something other than the default (tab), change that variable
	//		before calling dojo.toJson().
	//		Note that if native JSON support is available, it will be used for serialization,
	//		and native implementations vary on the exact spacing used in pretty printing.
	// returns:
	//		A JSON string serialization of the passed-in object.
	// example:
	//		simple serialization of a trivial object
	//		|	var jsonStr = dojo.toJson({ howdy: "stranger!", isStrange: true });
	//		|	doh.is('{"howdy":"stranger!","isStrange":true}', jsonStr);
	// example:
	//		a custom serializer for an objects of a particular class:
	//		|	dojo.declare("Furby", null, {
	//		|		furbies: "are strange",
	//		|		furbyCount: 10,
	//		|		__json__: function(){
	//		|		},
	//		|	});

	// use dojo/json
	return json.stringify(it, function(key, value){
		if(value){
			var tf = value.__json__||value.json;
			if(typeof tf == "function"){
				return tf.call(value);
			}
		}
		return value;
	}, prettyPrint && dojo.toJsonIndentStr);	// String
};

return dojo;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/kernel.js":
/*!*******************************************!*\
  !*** ./node_modules/dojo/_base/kernel.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../global */ "./node_modules/dojo/global.js"), __webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"), __webpack_require__(/*! ./config */ "./node_modules/dojo/_base/config.js"), __webpack_require__.dj.c(module.i), __webpack_require__.dj.m(module)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(global, has, config, require, module){
	// module:
	//		dojo/_base/kernel

	// This module is the foundational module of the dojo boot sequence; it defines the dojo object.

	var
		// loop variables for this module
		i, p,

		// create dojo, dijit, and dojox
		// FIXME: in 2.0 remove dijit, dojox being created by dojo
		dijit = {},
		dojox = {},
		dojo = {
			// summary:
			//		This module is the foundational module of the dojo boot sequence; it defines the dojo object.

			// notice dojo takes ownership of the value of the config module
			config:config,
			global:global,
			dijit:dijit,
			dojox:dojox
		};


	// Configure the scope map. For a 100% AMD application, the scope map is not needed other than to provide
	// a _scopeName property for the dojo, dijit, and dojox root object so those packages can create
	// unique names in the global space.
	//
	// Built, legacy modules use the scope map to allow those modules to be expressed as if dojo, dijit, and dojox,
	// where global when in fact they are either global under different names or not global at all. In v1.6-, the
	// config variable "scopeMap" was used to map names as used within a module to global names. This has been
	// subsumed by the AMD map configuration variable which can relocate packages to different names. For backcompat,
	// only the "*" mapping is supported. See http://livedocs.dojotoolkit.org/developer/design/loader#legacy-cross-domain-mode for details.
	//
	// The following computations contort the packageMap for this dojo instance into a scopeMap.
	var scopeMap =
			// a map from a name used in a legacy module to the (global variable name, object addressed by that name)
			// always map dojo, dijit, and dojox
			{
				dojo:["dojo", dojo],
				dijit:["dijit", dijit],
				dojox:["dojox", dojox]
			},

		packageMap =
			// the package map for this dojo instance; note, a foreign loader or no pacakgeMap results in the above default config
			(require.map && require.map[module.i.match(/[^\/]+/)[0]]),

		item;


	// process all mapped top-level names for this instance of dojo
	for(p in packageMap){
		if(scopeMap[p]){
			// mapped dojo, dijit, or dojox
			scopeMap[p][0] = packageMap[p];
		}else{
			// some other top-level name
			scopeMap[p] = [packageMap[p], {}];
		}
	}

	// publish those names to _scopeName and, optionally, the global namespace
	for(p in scopeMap){
		item = scopeMap[p];
		item[1]._scopeName = item[0];
		if(!config.noGlobals){
			global[item[0]] = item[1];
		}
	}
	dojo.scopeMap = scopeMap;

	/*===== dojo.__docParserConfigureScopeMap(scopeMap); =====*/

	// FIXME: dojo.baseUrl and dojo.config.baseUrl should be deprecated
	dojo.baseUrl = dojo.config.baseUrl = require.baseUrl;
	dojo.isAsync = !has("dojo-loader") || require.async;
	dojo.locale = config.locale;

	var rev = "$Rev: d6e8ff38 $".match(/[0-9a-f]{7,}/);
	dojo.version = {
		// summary:
		//		Version number of the Dojo Toolkit
		// description:
		//		Hash about the version, including
		//
		//		- major: Integer: Major version. If total version is "1.2.0beta1", will be 1
		//		- minor: Integer: Minor version. If total version is "1.2.0beta1", will be 2
		//		- patch: Integer: Patch version. If total version is "1.2.0beta1", will be 0
		//		- flag: String: Descriptor flag. If total version is "1.2.0beta1", will be "beta1"
		//		- revision: Number: The Git rev from which dojo was pulled

		major: 1, minor: 14, patch: 2, flag: "",
		revision: rev ? rev[0] : NaN,
		toString: function(){
			var v = dojo.version;
			return v.major + "." + v.minor + "." + v.patch + v.flag + " (" + v.revision + ")";	// String
		}
	};

	// If has("extend-dojo") is truthy, then as a dojo module is defined it should push it's definitions
	// into the dojo object, and conversely. In 2.0, it will likely be unusual to augment another object
	// as a result of defining a module. This has feature gives a way to force 2.0 behavior as the code
	// is migrated. Absent specific advice otherwise, set extend-dojo to truthy.
	has.add("extend-dojo", 1);

	if(!has("csp-restrictions")){
		(Function("d", "d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(dojo);
	}
	/*=====
	dojo.eval = function(scriptText){
		// summary:
		//		A legacy method created for use exclusively by internal Dojo methods. Do not use this method
		//		directly unless you understand its possibly-different implications on the platforms your are targeting.
		// description:
		//		Makes an attempt to evaluate scriptText in the global scope. The function works correctly for browsers
		//		that support indirect eval.
		//
		//		As usual, IE does not. On IE, the only way to implement global eval is to
		//		use execScript. Unfortunately, execScript does not return a value and breaks some current usages of dojo.eval.
		//		This implementation uses the technique of executing eval in the scope of a function that is a single scope
		//		frame below the global scope; thereby coming close to the global scope. Note carefully that
		//
		//		dojo.eval("var pi = 3.14;");
		//
		//		will define global pi in non-IE environments, but define pi only in a temporary local scope for IE. If you want
		//		to define a global variable using dojo.eval, write something like
		//
		//		dojo.eval("window.pi = 3.14;")
		// scriptText:
		//		The text to evaluation.
		// returns:
		//		The result of the evaluation. Often `undefined`
	};
	=====*/


	if(has("host-rhino")){
		dojo.exit = function(exitcode){
			quit(exitcode);
		};
	}else{
		dojo.exit = function(){
		};
	}

	if(!has("host-webworker")){
		// console is immutable in FF30+, https://bugs.dojotoolkit.org/ticket/18100
		has.add("dojo-guarantee-console",
			// ensure that console.log, console.warn, etc. are defined
			1
		);
	}

	if(has("dojo-guarantee-console")){
		// IE 9 bug: https://bugs.dojotoolkit.org/ticket/18197
		has.add("console-as-object", function () {
			return Function.prototype.bind && console && typeof console.log === "object";
		});

		typeof console != "undefined" || (console = {});  // intentional assignment
		//	Be careful to leave 'log' always at the end
		var cn = [
			"assert", "count", "debug", "dir", "dirxml", "error", "group",
			"groupEnd", "info", "profile", "profileEnd", "time", "timeEnd",
			"trace", "warn", "log"
		];
		var tn;
		i = 0;
		while((tn = cn[i++])){
			if(!console[tn]){
				(function(){
					var tcn = tn + "";
					console[tcn] = ('log' in console) ? function(){
						var a = Array.prototype.slice.call(arguments);
						a.unshift(tcn + ":");
						console["log"](a.join(" "));
					} : function(){};
					console[tcn]._fake = true;
				})();
			}else if(has("console-as-object")){
				console[tn] = Function.prototype.bind.call(console[tn], console);
			}
		}
	}

	has.add("dojo-debug-messages",
		// include dojo.deprecated/dojo.experimental implementations
		!!config.isDebug
	);
	dojo.deprecated = dojo.experimental =  function(){};
	if(has("dojo-debug-messages")){
		dojo.deprecated = function(/*String*/ behaviour, /*String?*/ extra, /*String?*/ removal){
			// summary:
			//		Log a debug message to indicate that a behavior has been
			//		deprecated.
			// behaviour: String
			//		The API or behavior being deprecated. Usually in the form
			//		of "myApp.someFunction()".
			// extra: String?
			//		Text to append to the message. Often provides advice on a
			//		new function or facility to achieve the same goal during
			//		the deprecation period.
			// removal: String?
			//		Text to indicate when in the future the behavior will be
			//		removed. Usually a version number.
			// example:
			//	| dojo.deprecated("myApp.getTemp()", "use myApp.getLocaleTemp() instead", "1.0");

			var message = "DEPRECATED: " + behaviour;
			if(extra){ message += " " + extra; }
			if(removal){ message += " -- will be removed in version: " + removal; }
			console.warn(message);
		};

		dojo.experimental = function(/* String */ moduleName, /* String? */ extra){
			// summary:
			//		Marks code as experimental.
			// description:
			//		This can be used to mark a function, file, or module as
			//		experimental.	 Experimental code is not ready to be used, and the
			//		APIs are subject to change without notice.	Experimental code may be
			//		completed deleted without going through the normal deprecation
			//		process.
			// moduleName: String
			//		The name of a module, or the name of a module file or a specific
			//		function
			// extra: String?
			//		some additional message for the user
			// example:
			//	| dojo.experimental("dojo.data.Result");
			// example:
			//	| dojo.experimental("dojo.weather.toKelvin()", "PENDING approval from NOAA");

			var message = "EXPERIMENTAL: " + moduleName + " -- APIs subject to change without notice.";
			if(extra){ message += " " + extra; }
			console.warn(message);
		};
	}

	has.add("dojo-modulePaths",
		// consume dojo.modulePaths processing
		1
	);
	if(has("dojo-modulePaths")){
		// notice that modulePaths won't be applied to any require's before the dojo/_base/kernel factory is run;
		// this is the v1.6- behavior.
		if(config.modulePaths){
			dojo.deprecated("dojo.modulePaths", "use paths configuration");
			var paths = {};
			for(p in config.modulePaths){
				paths[p.replace(/\./g, "/")] = config.modulePaths[p];
			}
			require({paths:paths});
		}
	}

	has.add("dojo-moduleUrl",
		// include dojo.moduleUrl
		1
	);
	if(has("dojo-moduleUrl")){
		dojo.moduleUrl = function(/*String*/module, /*String?*/url){
			// summary:
			//		Returns a URL relative to a module.
			// example:
			//	|	var pngPath = dojo.moduleUrl("acme","images/small.png");
			//	|	console.dir(pngPath); // list the object properties
			//	|	// create an image and set it's source to pngPath's value:
			//	|	var img = document.createElement("img");
			//	|	img.src = pngPath;
			//	|	// add our image to the document
			//	|	dojo.body().appendChild(img);
			// example:
			//		you may de-reference as far as you like down the package
			//		hierarchy.  This is sometimes handy to avoid lengthy relative
			//		urls or for building portable sub-packages. In this example,
			//		the `acme.widget` and `acme.util` directories may be located
			//		under different roots (see `dojo.registerModulePath`) but the
			//		the modules which reference them can be unaware of their
			//		relative locations on the filesystem:
			//	|	// somewhere in a configuration block
			//	|	dojo.registerModulePath("acme.widget", "../../acme/widget");
			//	|	dojo.registerModulePath("acme.util", "../../util");
			//	|
			//	|	// ...
			//	|
			//	|	// code in a module using acme resources
			//	|	var tmpltPath = dojo.moduleUrl("acme.widget","templates/template.html");
			//	|	var dataPath = dojo.moduleUrl("acme.util","resources/data.json");

			dojo.deprecated("dojo.moduleUrl()", "use require.toUrl", "2.0");

			// require.toUrl requires a filetype; therefore, just append the suffix "/*.*" to guarantee a filetype, then
			// remove the suffix from the result. This way clients can request a url w/out a filetype. This should be
			// rare, but it maintains backcompat for the v1.x line (note: dojo.moduleUrl will be removed in v2.0).
			// Notice * is an illegal filename so it won't conflict with any real path map that may exist the paths config.
			var result = null;
			if(module){
				result = require.toUrl(module.replace(/\./g, "/") + (url ? ("/" + url) : "") + "/*.*").replace(/\/\*\.\*/, "") + (url ? "" : "/");
			}
			return result;
		};
	}

	dojo._hasResource = {}; // for backward compatibility with layers built with 1.6 tooling

	return dojo;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/lang.js":
/*!*****************************************!*\
  !*** ./node_modules/dojo/_base/lang.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"), __webpack_require__(/*! ../sniff */ "./node_modules/dojo/sniff.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, has){
	// module:
	//		dojo/_base/lang

	has.add("bug-for-in-skips-shadowed", function(){
		// if true, the for-in iterator skips object properties that exist in Object's prototype (IE 6 - ?)
		for(var i in {toString: 1}){
			return 0;
		}
		return 1;
	});

	// Helper methods
	var _extraNames =
			has("bug-for-in-skips-shadowed") ?
				"hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split(".") : [],

		_extraLen = _extraNames.length,

		getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
			if(!context){
				if(parts[0] && dojo.scopeMap[parts[0]]) {
					// Voodoo code from the old days where "dojo" or "dijit" maps to some special object
					// rather than just window.dojo
					context = dojo.scopeMap[parts.shift()][1];
				}else{
					context = dojo.global;
				}
			}

			try{
				for(var i = 0; i < parts.length; i++){
					var p = parts[i];
					if(!(p in context)){
						if(create){
							context[p] = {};
						}else{
							return;		// return undefined
						}
					}
					context = context[p];
				}
				return context; // mixed
			}catch(e){
				// "p in context" throws an exception when context is a number, boolean, etc. rather than an object,
				// so in that corner case just return undefined (by having no return statement)
			}
		},

		opts = Object.prototype.toString,

		efficient = function(obj, offset, startWith){
			return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
		},

		_pattern = /\{([^\}]+)\}/g;

	// Module export
	var lang = {
		// summary:
		//		This module defines Javascript language extensions.

		// _extraNames: String[]
		//		Lists property names that must be explicitly processed during for-in iteration
		//		in environments that have has("bug-for-in-skips-shadowed") true.
		_extraNames:_extraNames,

		_mixin: function(dest, source, copyFunc){
			// summary:
			//		Copies/adds all properties of source to dest; returns dest.
			// dest: Object
			//		The object to which to copy/add all properties contained in source.
			// source: Object
			//		The object from which to draw all properties to copy into dest.
			// copyFunc: Function?
			//		The process used to copy/add a property in source; defaults to the Javascript assignment operator.
			// returns:
			//		dest, as modified
			// description:
			//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
			//		found in Object.prototype, are copied/added to dest. Copying/adding each particular property is
			//		delegated to copyFunc (if any); copyFunc defaults to the Javascript assignment operator if not provided.
			//		Notice that by default, _mixin executes a so-called "shallow copy" and aggregate types are copied/added by reference.
			var name, s, i, empty = {};
			for(name in source){
				// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
				// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
				// don't overwrite it with the toString() method that source inherited from Object.prototype
				s = source[name];
				if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
					dest[name] = copyFunc ? copyFunc(s) : s;
				}
			}

			if(has("bug-for-in-skips-shadowed")){
				if(source){
					for(i = 0; i < _extraLen; ++i){
						name = _extraNames[i];
						s = source[name];
						if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
							dest[name] = copyFunc ? copyFunc(s) : s;
						}
					}
				}
			}

			return dest; // Object
		},

		mixin: function(dest, sources){
			// summary:
			//		Copies/adds all properties of one or more sources to dest; returns dest.
			// dest: Object
			//		The object to which to copy/add all properties contained in source. If dest is falsy, then
			//		a new object is manufactured before copying/adding properties begins.
			// sources: Object...
			//		One of more objects from which to draw all properties to copy into dest. sources are processed
			//		left-to-right and if more than one of these objects contain the same property name, the right-most
			//		value "wins".
			// returns: Object
			//		dest, as modified
			// description:
			//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
			//		found in Object.prototype, are copied/added from sources to dest. sources are processed left to right.
			//		The Javascript assignment operator is used to copy/add each property; therefore, by default, mixin
			//		executes a so-called "shallow copy" and aggregate types are copied/added by reference.
			// example:
			//		make a shallow copy of an object
			//	|	var copy = lang.mixin({}, source);
			// example:
			//		many class constructors often take an object which specifies
			//		values to be configured on the object. In this case, it is
			//		often simplest to call `lang.mixin` on the `this` object:
			//	|	declare("acme.Base", null, {
			//	|		constructor: function(properties){
			//	|			// property configuration:
			//	|			lang.mixin(this, properties);
			//	|
			//	|			console.log(this.quip);
			//	|			//	...
			//	|		},
			//	|		quip: "I wasn't born yesterday, you know - I've seen movies.",
			//	|		// ...
			//	|	});
			//	|
			//	|	// create an instance of the class and configure it
			//	|	var b = new acme.Base({quip: "That's what it does!" });
			// example:
			//		copy in properties from multiple objects
			//	|	var flattened = lang.mixin(
			//	|		{
			//	|			name: "Frylock",
			//	|			braces: true
			//	|		},
			//	|		{
			//	|			name: "Carl Brutanananadilewski"
			//	|		}
			//	|	);
			//	|
			//	|	// will print "Carl Brutanananadilewski"
			//	|	console.log(flattened.name);
			//	|	// will print "true"
			//	|	console.log(flattened.braces);

			if(!dest){ dest = {}; }
			for(var i = 1, l = arguments.length; i < l; i++){
				lang._mixin(dest, arguments[i]);
			}
			return dest; // Object
		},

		setObject: function(name, value, context){
			// summary:
			//		Set a property from a dot-separated string, such as "A.B.C"
			// description:
			//		Useful for longer api chains where you have to test each object in
			//		the chain, or when you have an object reference in string format.
			//		Objects are created as needed along `path`. Returns the passed
			//		value if setting is successful or `undefined` if not.
			// name: String
			//		Path to a property, in the form "A.B.C".
			// value: anything
			//		value or object to place at location given by name
			// context: Object?
			//		Optional. Object to use as root of path. Defaults to
			//		`dojo.global`.
			// example:
			//		set the value of `foo.bar.baz`, regardless of whether
			//		intermediate objects already exist:
			//	| lang.setObject("foo.bar.baz", value);
			// example:
			//		without `lang.setObject`, we often see code like this:
			//	| // ensure that intermediate objects are available
			//	| if(!obj["parent"]){ obj.parent = {}; }
			//	| if(!obj.parent["child"]){ obj.parent.child = {}; }
			//	| // now we can safely set the property
			//	| obj.parent.child.prop = "some value";
			//		whereas with `lang.setObject`, we can shorten that to:
			//	| lang.setObject("parent.child.prop", "some value", obj);

			var parts = name.split("."), p = parts.pop(), obj = getProp(parts, true, context);
			return obj && p ? (obj[p] = value) : undefined; // Object
		},

		getObject: function(name, create, context){
			// summary:
			//		Get a property from a dot-separated string, such as "A.B.C"
			// description:
			//		Useful for longer api chains where you have to test each object in
			//		the chain, or when you have an object reference in string format.
			// name: String
			//		Path to an property, in the form "A.B.C".
			// create: Boolean?
			//		Optional. Defaults to `false`. If `true`, Objects will be
			//		created at any point along the 'path' that is undefined.
			// context: Object?
			//		Optional. Object to use as root of path. Defaults to
			//		'dojo.global'. Null may be passed.
			return !name ? context : getProp(name.split("."), create, context); // Object
		},

		exists: function(name, obj){
			// summary:
			//		determine if an object supports a given method
			// description:
			//		useful for longer api chains where you have to test each object in
			//		the chain. Useful for object and method detection.
			// name: String
			//		Path to an object, in the form "A.B.C".
			// obj: Object?
			//		Object to use as root of path. Defaults to
			//		'dojo.global'. Null may be passed.
			// example:
			//	| // define an object
			//	| var foo = {
			//	|		bar: { }
			//	| };
			//	|
			//	| // search the global scope
			//	| lang.exists("foo.bar"); // true
			//	| lang.exists("foo.bar.baz"); // false
			//	|
			//	| // search from a particular scope
			//	| lang.exists("bar", foo); // true
			//	| lang.exists("bar.baz", foo); // false
			return lang.getObject(name, false, obj) !== undefined; // Boolean
		},

		// Crockford (ish) functions

		isString: function(it){
			// summary:
			//		Return true if it is a String
			// it: anything
			//		Item to test.
			return (typeof it == "string" || it instanceof String); // Boolean
		},

		isArray: Array.isArray || function(it){
			// summary:
			//		Return true if it is an Array.
			// it: anything
			//		Item to test.
			return opts.call(it) == "[object Array]"; // Boolean
		},

		isFunction: function(it){
			// summary:
			//		Return true if it is a Function
			// it: anything
			//		Item to test.
			return opts.call(it) === "[object Function]";
		},

		isObject: function(it){
			// summary:
			//		Returns true if it is a JavaScript object (or an Array, a Function
			//		or null)
			// it: anything
			//		Item to test.
			return it !== undefined &&
				(it === null || typeof it == "object" || lang.isArray(it) || lang.isFunction(it)); // Boolean
		},

		isArrayLike: function(it){
			// summary:
			//		similar to isArray() but more permissive
			// it: anything
			//		Item to test.
			// returns:
			//		If it walks like a duck and quacks like a duck, return `true`
			// description:
			//		Doesn't strongly test for "arrayness".  Instead, settles for "isn't
			//		a string or number and has a length property". Arguments objects
			//		and DOM collections will return true when passed to
			//		isArrayLike(), but will return false when passed to
			//		isArray().
			return !!it && // Boolean
				// keep out built-in constructors (Number, String, ...) which have length
				// properties
				!lang.isString(it) && !lang.isFunction(it) &&
				!(it.tagName && it.tagName.toLowerCase() == 'form') &&
				(lang.isArray(it) || isFinite(it.length));
		},

		isAlien: function(it){
			// summary:
			//		Returns true if it is a built-in function or some other kind of
			//		oddball that *should* report as a function but doesn't
			return it && !lang.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it)); // Boolean
		},

		extend: function(ctor, props){
			// summary:
			//		Adds all properties and methods of props to constructor's
			//		prototype, making them available to all instances created with
			//		constructor.
			// ctor: Object
			//		Target constructor to extend.
			// props: Object
			//		One or more objects to mix into ctor.prototype
			for(var i=1, l=arguments.length; i<l; i++){
				lang._mixin(ctor.prototype, arguments[i]);
			}
			return ctor; // Object
		},

		_hitchArgs: function(scope, method){
			var pre = lang._toArray(arguments, 2);
			var named = lang.isString(method);
			return function(){
				// arrayify arguments
				var args = lang._toArray(arguments);
				// locate our method
				var f = named ? (scope||dojo.global)[method] : method;
				// invoke with collected args
				return f && f.apply(scope || this, pre.concat(args)); // mixed
			}; // Function
		},

		hitch: function(scope, method){
			// summary:
			//		Returns a function that will only ever execute in the given scope.
			//		This allows for easy use of object member functions
			//		in callbacks and other places in which the "this" keyword may
			//		otherwise not reference the expected scope.
			//		Any number of default positional arguments may be passed as parameters
			//		beyond "method".
			//		Each of these values will be used to "placehold" (similar to curry)
			//		for the hitched function.
			// scope: Object
			//		The scope to use when method executes. If method is a string,
			//		scope is also the object containing method.
			// method: Function|String...
			//		A function to be hitched to scope, or the name of the method in
			//		scope to be hitched.
			// example:
			//	|	lang.hitch(foo, "bar")();
			//		runs foo.bar() in the scope of foo
			// example:
			//	|	lang.hitch(foo, myFunction);
			//		returns a function that runs myFunction in the scope of foo
			// example:
			//		Expansion on the default positional arguments passed along from
			//		hitch. Passed args are mixed first, additional args after.
			//	|	var foo = { bar: function(a, b, c){ console.log(a, b, c); } };
			//	|	var fn = lang.hitch(foo, "bar", 1, 2);
			//	|	fn(3); // logs "1, 2, 3"
			// example:
			//	|	var foo = { bar: 2 };
			//	|	lang.hitch(foo, function(){ this.bar = 10; })();
			//		execute an anonymous function in scope of foo
			if(arguments.length > 2){
				return lang._hitchArgs.apply(dojo, arguments); // Function
			}
			if(!method){
				method = scope;
				scope = null;
			}
			if(lang.isString(method)){
				scope = scope || dojo.global;
				if(!scope[method]){ throw(['lang.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
				return function(){ return scope[method].apply(scope, arguments || []); }; // Function
			}
			return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
		},

		delegate: (function(){
			// boodman/crockford delegation w/ cornford optimization
			function TMP(){}
			return function(obj, props){
				TMP.prototype = obj;
				var tmp = new TMP();
				TMP.prototype = null;
				if(props){
					lang._mixin(tmp, props);
				}
				return tmp; // Object
			};
		})(),
		/*=====
		delegate: function(obj, props){
			// summary:
			//		Returns a new object which "looks" to obj for properties which it
			//		does not have a value for. Optionally takes a bag of properties to
			//		seed the returned object with initially.
			// description:
			//		This is a small implementation of the Boodman/Crockford delegation
			//		pattern in JavaScript. An intermediate object constructor mediates
			//		the prototype chain for the returned object, using it to delegate
			//		down to obj for property lookup when object-local lookup fails.
			//		This can be thought of similarly to ES4's "wrap", save that it does
			//		not act on types but rather on pure objects.
			// obj: Object
			//		The object to delegate to for properties not found directly on the
			//		return object or in props.
			// props: Object...
			//		an object containing properties to assign to the returned object
			// returns:
			//		an Object of anonymous type
			// example:
			//	|	var foo = { bar: "baz" };
			//	|	var thinger = lang.delegate(foo, { thud: "xyzzy"});
			//	|	thinger.bar == "baz"; // delegated to foo
			//	|	foo.thud == undefined; // by definition
			//	|	thinger.thud == "xyzzy"; // mixed in from props
			//	|	foo.bar = "thonk";
			//	|	thinger.bar == "thonk"; // still delegated to foo's bar
		},
		=====*/

		_toArray: has("ie") ?
			(function(){
				function slow(obj, offset, startWith){
					var arr = startWith||[];
					for(var x = offset || 0; x < obj.length; x++){
						arr.push(obj[x]);
					}
					return arr;
				}
				return function(obj){
					return ((obj.item) ? slow : efficient).apply(this, arguments);
				};
			})() : efficient,
		/*=====
		 _toArray: function(obj, offset, startWith){
			 // summary:
			 //		Converts an array-like object (i.e. arguments, DOMCollection) to an
			 //		array. Returns a new Array with the elements of obj.
			 // obj: Object
			 //		the object to "arrayify". We expect the object to have, at a
			 //		minimum, a length property which corresponds to integer-indexed
			 //		properties.
			 // offset: Number?
			 //		the location in obj to start iterating from. Defaults to 0.
			 //		Optional.
			 // startWith: Array?
			 //		An array to pack with the properties of obj. If provided,
			 //		properties in obj are appended at the end of startWith and
			 //		startWith is the returned array.
		 },
		 =====*/

		partial: function(/*Function|String*/ method /*, ...*/){
			// summary:
			//		similar to hitch() except that the scope object is left to be
			//		whatever the execution context eventually becomes.
			// description:
			//		Calling lang.partial is the functional equivalent of calling:
			//		|	lang.hitch(null, funcName, ...);
			// method:
			//		The function to "wrap"
			var arr = [ null ];
			return lang.hitch.apply(dojo, arr.concat(lang._toArray(arguments))); // Function
		},

		clone: function(/*anything*/ src){
			// summary:
			//		Clones objects (including DOM nodes) and all children.
			//		Warning: do not clone cyclic structures.
			// src:
			//		The object to clone
			if(!src || typeof src != "object" || lang.isFunction(src)){
				// null, undefined, any non-object, or function
				return src;	// anything
			}
			if(src.nodeType && "cloneNode" in src){
				// DOM Node
				return src.cloneNode(true); // Node
			}
			if(src instanceof Date){
				// Date
				return new Date(src.getTime());	// Date
			}
			if(src instanceof RegExp){
				// RegExp
				return new RegExp(src);   // RegExp
			}
			var r, i, l;
			if(lang.isArray(src)){
				// array
				r = [];
				for(i = 0, l = src.length; i < l; ++i){
					if(i in src){
						r[i] = lang.clone(src[i]);
					}
				}
				// we don't clone functions for performance reasons
				//		}else if(d.isFunction(src)){
				//			// function
				//			r = function(){ return src.apply(this, arguments); };
			}else{
				// generic objects
				r = src.constructor ? new src.constructor() : {};
			}
			return lang._mixin(r, src, lang.clone);
		},


		trim: String.prototype.trim ?
			function(str){ return str.trim(); } :
			function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); },
		/*=====
		 trim: function(str){
			 // summary:
			 //		Trims whitespace from both sides of the string
			 // str: String
			 //		String to be trimmed
			 // returns: String
			 //		Returns the trimmed string
			 // description:
			 //		This version of trim() was selected for inclusion into the base due
			 //		to its compact size and relatively good performance
			 //		(see [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript)
			 //		Uses String.prototype.trim instead, if available.
			 //		The fastest but longest version of this function is located at
			 //		lang.string.trim()
		 },
		 =====*/

		replace: function(tmpl, map, pattern){
			// summary:
			//		Performs parameterized substitutions on a string. Throws an
			//		exception if any parameter is unmatched.
			// tmpl: String
			//		String to be used as a template.
			// map: Object|Function
			//		If an object, it is used as a dictionary to look up substitutions.
			//		If a function, it is called for every substitution with following parameters:
			//		a whole match, a name, an offset, and the whole template
			//		string (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/replace
			//		for more details).
			// pattern: RegEx?
			//		Optional regular expression objects that overrides the default pattern.
			//		Must be global and match one item. The default is: /\{([^\}]+)\}/g,
			//		which matches patterns like that: "{xxx}", where "xxx" is any sequence
			//		of characters, which doesn't include "}".
			// returns: String
			//		Returns the substituted string.
			// example:
			//	|	// uses a dictionary for substitutions:
			//	|	lang.replace("Hello, {name.first} {name.last} AKA {nick}!",
			//	|		{
			//	|			nick: "Bob",
			//	|			name: {
			//	|				first:	"Robert",
			//	|				middle: "X",
			//	|				last:		"Cringely"
			//	|			}
			//	|		});
			//	|	// returns: Hello, Robert Cringely AKA Bob!
			// example:
			//	|	// uses an array for substitutions:
			//	|	lang.replace("Hello, {0} {2}!",
			//	|		["Robert", "X", "Cringely"]);
			//	|	// returns: Hello, Robert Cringely!
			// example:
			//	|	// uses a function for substitutions:
			//	|	function sum(a){
			//	|		var t = 0;
			//	|		arrayforEach(a, function(x){ t += x; });
			//	|		return t;
			//	|	}
			//	|	lang.replace(
			//	|		"{count} payments averaging {avg} USD per payment.",
			//	|		lang.hitch(
			//	|			{ payments: [11, 16, 12] },
			//	|			function(_, key){
			//	|				switch(key){
			//	|					case "count": return this.payments.length;
			//	|					case "min":		return Math.min.apply(Math, this.payments);
			//	|					case "max":		return Math.max.apply(Math, this.payments);
			//	|					case "sum":		return sum(this.payments);
			//	|					case "avg":		return sum(this.payments) / this.payments.length;
			//	|				}
			//	|			}
			//	|		)
			//	|	);
			//	|	// prints: 3 payments averaging 13 USD per payment.
			// example:
			//	|	// uses an alternative PHP-like pattern for substitutions:
			//	|	lang.replace("Hello, ${0} ${2}!",
			//	|		["Robert", "X", "Cringely"], /\$\{([^\}]+)\}/g);
			//	|	// returns: Hello, Robert Cringely!

			return tmpl.replace(pattern || _pattern, lang.isFunction(map) ?
				map : function(_, k){ return lang.getObject(k, false, map); });
		}
	};

	has("extend-dojo") && lang.mixin(dojo, lang);

	return lang;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/sniff.js":
/*!******************************************!*\
  !*** ./node_modules/dojo/_base/sniff.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ./lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ../sniff */ "./node_modules/dojo/sniff.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, lang, has){
	// module:
	//		dojo/_base/sniff

	/*=====
	return {
		// summary:
		//		Deprecated.   New code should use dojo/sniff.
		//		This module populates the dojo browser version sniffing properties like dojo.isIE.
	};
	=====*/

	if(!has("host-browser")){
		return has;
	}

	// no idea what this is for, or if it's used
	dojo._name = "browser";

	lang.mixin(dojo, {
		// isBrowser: Boolean
		//		True if the client is a web-browser
		isBrowser: true,

		// isFF: Number|undefined
		//		Version as a Number if client is FireFox. undefined otherwise. Corresponds to
		//		major detected FireFox version (1.5, 2, 3, etc.)
		isFF: has("ff"),

		// isIE: Number|undefined
		//		Version as a Number if client is MSIE(PC). undefined otherwise. Corresponds to
		//		major detected IE version (6, 7, 8, etc.)
		isIE: has("ie"),

		// isKhtml: Number|undefined
		//		Version as a Number if client is a KHTML browser. undefined otherwise. Corresponds to major
		//		detected version.
		isKhtml: has("khtml"),

		// isWebKit: Number|undefined
		//		Version as a Number if client is a WebKit-derived browser (Konqueror,
		//		Safari, Chrome, etc.). undefined otherwise.
		isWebKit: has("webkit"),

		// isMozilla: Number|undefined
		//		Version as a Number if client is a Mozilla-based browser (Firefox,
		//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
		isMozilla: has("mozilla"),
		// isMoz: Number|undefined
		//		Version as a Number if client is a Mozilla-based browser (Firefox,
		//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
		isMoz: has("mozilla"),

		// isOpera: Number|undefined
		//		Version as a Number if client is Opera. undefined otherwise. Corresponds to
		//		major detected version.
		isOpera: has("opera"),

		// isSafari: Number|undefined
		//		Version as a Number if client is Safari or iPhone. undefined otherwise.
		isSafari: has("safari"),

		// isChrome: Number|undefined
		//		Version as a Number if client is Chrome browser. undefined otherwise.
		isChrome: has("chrome"),

		// isMac: Boolean
		//		True if the client runs on Mac
		isMac: has("mac"),

		// isIos: Number|undefined
		//		Version as a Number if client is iPhone, iPod, or iPad. undefined otherwise.
		isIos: has("ios"),

		// isAndroid: Number|undefined
		//		Version as a Number if client is android browser. undefined otherwise.
		isAndroid: has("android"),

		// isWii: Boolean
		//		True if client is Wii
		isWii: has("wii"),

		// isQuirks: Boolean
		//		Page is in quirks mode.
		isQuirks: has("quirks"),

		// isAir: Boolean
		//		True if client is Adobe Air
		isAir: has("air")
	});

	return has;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/window.js":
/*!*******************************************!*\
  !*** ./node_modules/dojo/_base/window.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ./lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ../sniff */ "./node_modules/dojo/sniff.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, lang, has){
// module:
//		dojo/_base/window

var ret = {
	// summary:
	//		API to save/set/restore the global/document scope.

	global: dojo.global,
	/*=====
	 global: {
		 // summary:
		 //		Alias for the current window. 'global' can be modified
		 //		for temporary context shifting. See also withGlobal().
		 // description:
		 //		Use this rather than referring to 'window' to ensure your code runs
		 //		correctly in managed contexts.
	 },
	 =====*/

	doc: dojo.global["document"] || null,
	/*=====
	doc: {
		// summary:
		//		Alias for the current document. 'doc' can be modified
		//		for temporary context shifting. See also withDoc().
		// description:
		//		Use this rather than referring to 'window.document' to ensure your code runs
		//		correctly in managed contexts.
		// example:
		//	|	n.appendChild(dojo.doc.createElement('div'));
	},
	=====*/

	body: function(/*Document?*/ doc){
		// summary:
		//		Return the body element of the specified document or of dojo/_base/window::doc.
		// example:
		//	|	win.body().appendChild(dojo.doc.createElement('div'));

		// Note: document.body is not defined for a strict xhtml document
		// Would like to memoize this, but dojo.doc can change vi dojo.withDoc().
		doc = doc || dojo.doc;
		return doc.body || doc.getElementsByTagName("body")[0]; // Node
	},

	setContext: function(/*Object*/ globalObject, /*DocumentElement*/ globalDocument){
		// summary:
		//		changes the behavior of many core Dojo functions that deal with
		//		namespace and DOM lookup, changing them to work in a new global
		//		context (e.g., an iframe). The varibles dojo.global and dojo.doc
		//		are modified as a result of calling this function and the result of
		//		`dojo.body()` likewise differs.
		dojo.global = ret.global = globalObject;
		dojo.doc = ret.doc = globalDocument;
	},

	withGlobal: function(	/*Object*/ globalObject,
							/*Function*/ callback,
							/*Object?*/ thisObject,
							/*Array?*/ cbArguments){
		// summary:
		//		Invoke callback with globalObject as dojo.global and
		//		globalObject.document as dojo.doc.
		// description:
		//		Invoke callback with globalObject as dojo.global and
		//		globalObject.document as dojo.doc. If provided, globalObject
		//		will be executed in the context of object thisObject
		//		When callback() returns or throws an error, the dojo.global
		//		and dojo.doc will be restored to its previous state.

		var oldGlob = dojo.global;
		try{
			dojo.global = ret.global = globalObject;
			return ret.withDoc.call(null, globalObject.document, callback, thisObject, cbArguments);
		}finally{
			dojo.global = ret.global = oldGlob;
		}
	},

	withDoc: function(	/*DocumentElement*/ documentObject,
						/*Function*/ callback,
						/*Object?*/ thisObject,
						/*Array?*/ cbArguments){
		// summary:
		//		Invoke callback with documentObject as dojo/_base/window::doc.
		// description:
		//		Invoke callback with documentObject as dojo/_base/window::doc. If provided,
		//		callback will be executed in the context of object thisObject
		//		When callback() returns or throws an error, the dojo/_base/window::doc will
		//		be restored to its previous state.

		var oldDoc = ret.doc,
			oldQ = has("quirks"),
			oldIE = has("ie"), isIE, mode, pwin;

		try{
			dojo.doc = ret.doc = documentObject;
			// update dojo.isQuirks and the value of the has feature "quirks".
			// remove setting dojo.isQuirks and dojo.isIE for 2.0
			dojo.isQuirks = has.add("quirks", dojo.doc.compatMode == "BackCompat", true, true); // no need to check for QuirksMode which was Opera 7 only

			if(has("ie")){
				if((pwin = documentObject.parentWindow) && pwin.navigator){
					// re-run IE detection logic and update dojo.isIE / has("ie")
					// (the only time parentWindow/navigator wouldn't exist is if we were not
					// passed an actual legitimate document object)
					isIE = parseFloat(pwin.navigator.appVersion.split("MSIE ")[1]) || undefined;
					mode = documentObject.documentMode;
					if(mode && mode != 5 && Math.floor(isIE) != mode){
						isIE = mode;
					}
					dojo.isIE = has.add("ie", isIE, true, true);
				}
			}

			if(thisObject && typeof callback == "string"){
				callback = thisObject[callback];
			}

			return callback.apply(thisObject, cbArguments || []);
		}finally{
			dojo.doc = ret.doc = oldDoc;
			dojo.isQuirks = has.add("quirks", oldQ, true, true);
			dojo.isIE = has.add("ie", oldIE, true, true);
		}
	}
};

has("extend-dojo") && lang.mixin(dojo, ret);

return ret;

}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/_base/xhr.js":
/*!****************************************!*\
  !*** ./node_modules/dojo/_base/xhr.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! ./sniff */ "./node_modules/dojo/_base/sniff.js"),
	__webpack_require__.dj.c(module.i),
	__webpack_require__(/*! ../io-query */ "./node_modules/dojo/io-query.js"),
	/*===== "./declare", =====*/
	__webpack_require__(/*! ../dom */ "./node_modules/dojo/dom.js"),
	__webpack_require__(/*! ../dom-form */ "./node_modules/dojo/dom-form.js"),
	__webpack_require__(/*! ./Deferred */ "./node_modules/dojo/_base/Deferred.js"),
	__webpack_require__(/*! ./config */ "./node_modules/dojo/_base/config.js"),
	__webpack_require__(/*! ./json */ "./node_modules/dojo/_base/json.js"),
	__webpack_require__(/*! ./lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ./array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! ../aspect */ "./node_modules/dojo/aspect.js"),
	__webpack_require__(/*! ../request/watch */ "./node_modules/dojo/request/watch.js"),
	__webpack_require__(/*! ../request/xhr */ "./node_modules/dojo/request/xhr.js"),
	__webpack_require__(/*! ../request/util */ "./node_modules/dojo/request/util.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, has, require, ioq, /*===== declare, =====*/ dom, domForm, Deferred, config, json, lang, array, on, aspect, watch, _xhr, util){
	// module:
	//		dojo/_base/xhr

	/*=====
	dojo._xhrObj = function(){
		// summary:
		//		does the work of portably generating a new XMLHTTPRequest object.
	};
	=====*/
	dojo._xhrObj = _xhr._create;

	var cfg = dojo.config;

	// mix in io-query and dom-form
	dojo.objectToQuery = ioq.objectToQuery;
	dojo.queryToObject = ioq.queryToObject;
	dojo.fieldToObject = domForm.fieldToObject;
	dojo.formToObject = domForm.toObject;
	dojo.formToQuery = domForm.toQuery;
	dojo.formToJson = domForm.toJson;

	// need to block async callbacks from snatching this thread as the result
	// of an async callback might call another sync XHR, this hangs khtml forever
	// must checked by watchInFlight()

	dojo._blockAsync = false;

	// MOW: remove dojo._contentHandlers alias in 2.0
	var handlers = dojo._contentHandlers = dojo.contentHandlers = {
		// summary:
		//		A map of available XHR transport handle types. Name matches the
		//		`handleAs` attribute passed to XHR calls.
		// description:
		//		A map of available XHR transport handle types. Name matches the
		//		`handleAs` attribute passed to XHR calls. Each contentHandler is
		//		called, passing the xhr object for manipulation. The return value
		//		from the contentHandler will be passed to the `load` or `handle`
		//		functions defined in the original xhr call.
		// example:
		//		Creating a custom content-handler:
		//	|	xhr.contentHandlers.makeCaps = function(xhr){
		//	|		return xhr.responseText.toUpperCase();
		//	|	}
		//	|	// and later:
		//	|	dojo.xhrGet({
		//	|		url:"foo.txt",
		//	|		handleAs:"makeCaps",
		//	|		load: function(data){ /* data is a toUpper version of foo.txt */ }
		//	|	});

		"text": function(xhr){
			// summary:
			//		A contentHandler which simply returns the plaintext response data
			return xhr.responseText;
		},
		"json": function(xhr){
			// summary:
			//		A contentHandler which returns a JavaScript object created from the response data
			return json.fromJson(xhr.responseText || null);
		},
		"json-comment-filtered": function(xhr){
			// summary:
			//		A contentHandler which expects comment-filtered JSON.
			// description:
			//		A contentHandler which expects comment-filtered JSON.
			//		the json-comment-filtered option was implemented to prevent
			//		"JavaScript Hijacking", but it is less secure than standard JSON. Use
			//		standard JSON instead. JSON prefixing can be used to subvert hijacking.
			//
			//		Will throw a notice suggesting to use application/json mimetype, as
			//		json-commenting can introduce security issues. To decrease the chances of hijacking,
			//		use the standard `json` contentHandler, and prefix your "JSON" with: {}&&
			//
			//		use djConfig.useCommentedJson = true to turn off the notice
			if(!config.useCommentedJson){
				console.warn("Consider using the standard mimetype:application/json."
					+ " json-commenting can introduce security issues. To"
					+ " decrease the chances of hijacking, use the standard the 'json' handler and"
					+ " prefix your json with: {}&&\n"
					+ "Use djConfig.useCommentedJson=true to turn off this message.");
			}

			var value = xhr.responseText;
			var cStartIdx = value.indexOf("\/*");
			var cEndIdx = value.lastIndexOf("*\/");
			if(cStartIdx == -1 || cEndIdx == -1){
				throw new Error("JSON was not comment filtered");
			}
			return json.fromJson(value.substring(cStartIdx+2, cEndIdx));
		},
		"javascript": function(xhr){
			// summary:
			//		A contentHandler which evaluates the response data, expecting it to be valid JavaScript

			// FIXME: try Moz and IE specific eval variants?
			return dojo.eval(xhr.responseText);
		},
		"xml": function(xhr){
			// summary:
			//		A contentHandler returning an XML Document parsed from the response data
			var result = xhr.responseXML;

			if(result && has("dom-qsa2.1") && !result.querySelectorAll && has("dom-parser")){
				// http://bugs.dojotoolkit.org/ticket/15631
				// IE9 supports a CSS3 querySelectorAll implementation, but the DOM implementation
				// returned by IE9 xhr.responseXML does not. Manually create the XML DOM to gain
				// the fuller-featured implementation and avoid bugs caused by the inconsistency
				result = new DOMParser().parseFromString(xhr.responseText, "application/xml");
			}

			if(has("ie")){
				if((!result || !result.documentElement)){
					//WARNING: this branch used by the xml handling in dojo.io.iframe,
					//so be sure to test dojo.io.iframe if making changes below.
					var ms = function(n){ return "MSXML" + n + ".DOMDocument"; };
					var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
					array.some(dp, function(p){
						try{
							var dom = new ActiveXObject(p);
							dom.async = false;
							dom.loadXML(xhr.responseText);
							result = dom;
						}catch(e){ return false; }
						return true;
					});
				}
			}
			return result; // DOMDocument
		},
		"json-comment-optional": function(xhr){
			// summary:
			//		A contentHandler which checks the presence of comment-filtered JSON and
			//		alternates between the `json` and `json-comment-filtered` contentHandlers.
			if(xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)){
				return handlers["json-comment-filtered"](xhr);
			}else{
				return handlers["json"](xhr);
			}
		}
	};

	/*=====

	// kwargs function parameter definitions.   Assigning to dojo namespace rather than making them local variables
	// because they are used by dojo/io modules too

	dojo.__IoArgs = declare(null, {
		// url: String
		//		URL to server endpoint.
		// content: Object?
		//		Contains properties with string values. These
		//		properties will be serialized as name1=value2 and
		//		passed in the request.
		// timeout: Integer?
		//		Milliseconds to wait for the response. If this time
		//		passes, the then error callbacks are called.
		// form: DOMNode?
		//		DOM node for a form. Used to extract the form values
		//		and send to the server.
		// preventCache: Boolean?
		//		Default is false. If true, then a
		//		"dojo.preventCache" parameter is sent in the request
		//		with a value that changes with each request
		//		(timestamp). Useful only with GET-type requests.
		// handleAs: String?
		//		Acceptable values depend on the type of IO
		//		transport (see specific IO calls for more information).
		// rawBody: String?
		//		Sets the raw body for an HTTP request. If this is used, then the content
		//		property is ignored. This is mostly useful for HTTP methods that have
		//		a body to their requests, like PUT or POST. This property can be used instead
		//		of postData and putData for dojo/_base/xhr.rawXhrPost and dojo/_base/xhr.rawXhrPut respectively.
		// ioPublish: Boolean?
		//		Set this explicitly to false to prevent publishing of topics related to
		//		IO operations. Otherwise, if djConfig.ioPublish is set to true, topics
		//		will be published via dojo/topic.publish() for different phases of an IO operation.
		//		See dojo/main.__IoPublish for a list of topics that are published.

		load: function(response, ioArgs){
			// summary:
			//		This function will be
			//		called on a successful HTTP response code.
	 		// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
			// response: Object
			//		The response in the format as defined with handleAs.
		},

		error: function(response, ioArgs){
			// summary:
			//		This function will
			//		be called when the request fails due to a network or server error, the url
			//		is invalid, etc. It will also be called if the load or handle callback throws an
			//		exception, unless djConfig.debugAtAllCosts is true.	 This allows deployed applications
			//		to continue to run even when a logic error happens in the callback, while making
			//		it easier to troubleshoot while in debug mode.
			// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
			// response: Object
			//		The response in the format as defined with handleAs.
		},

		handle: function(loadOrError, response, ioArgs){
			// summary:
	 		//		This function will
	 		//		be called at the end of every request, whether or not an error occurs.
			// loadOrError: String
			//		Provides a string that tells you whether this function
			//		was called because of success (load) or failure (error).
			// response: Object
			//		The response in the format as defined with handleAs.
			// ioArgs: dojo/main.__IoCallbackArgs
			//		Provides additional information about the request.
		}
	});

	dojo.__IoCallbackArgs = declare(null, {
		// args: Object
		//		the original object argument to the IO call.
		// xhr: XMLHttpRequest
		//		For XMLHttpRequest calls only, the
		//		XMLHttpRequest object that was used for the
		//		request.
		// url: String
		//		The final URL used for the call. Many times it
		//		will be different than the original args.url
		//		value.
		// query: String
		//		For non-GET requests, the
		//		name1=value1&name2=value2 parameters sent up in
		//		the request.
		// handleAs: String
		//		The final indicator on how the response will be
		//		handled.
		// id: String
		//		For dojo/io/script calls only, the internal
		//		script ID used for the request.
		// canDelete: Boolean
		//		For dojo/io/script calls only, indicates
		//		whether the script tag that represents the
		//		request can be deleted after callbacks have
		//		been called. Used internally to know when
		//		cleanup can happen on JSONP-type requests.
		// json: Object
		//		For dojo/io/script calls only: holds the JSON
		//		response for JSONP-type requests. Used
		//		internally to hold on to the JSON responses.
		//		You should not need to access it directly --
		//		the same object should be passed to the success
		//		callbacks directly.
	});

	dojo.__IoPublish = declare(null, {
		// summary:
		//		This is a list of IO topics that can be published
		//		if djConfig.ioPublish is set to true. IO topics can be
		//		published for any Input/Output, network operation. So,
		//		dojo.xhr, dojo.io.script and dojo.io.iframe can all
		//		trigger these topics to be published.
		// start: String
		//		"/dojo/io/start" is sent when there are no outstanding IO
		//		requests, and a new IO request is started. No arguments
		//		are passed with this topic.
		// send: String
		//		"/dojo/io/send" is sent whenever a new IO request is started.
		//		It passes the dojo.Deferred for the request with the topic.
		// load: String
		//		"/dojo/io/load" is sent whenever an IO request has loaded
		//		successfully. It passes the response and the dojo.Deferred
		//		for the request with the topic.
		// error: String
		//		"/dojo/io/error" is sent whenever an IO request has errored.
		//		It passes the error and the dojo.Deferred
		//		for the request with the topic.
		// done: String
		//		"/dojo/io/done" is sent whenever an IO request has completed,
		//		either by loading or by erroring. It passes the error and
		//		the dojo.Deferred for the request with the topic.
		// stop: String
		//		"/dojo/io/stop" is sent when all outstanding IO requests have
		//		finished. No arguments are passed with this topic.
	});
	=====*/


	dojo._ioSetArgs = function(/*dojo/main.__IoArgs*/args,
			/*Function*/canceller,
			/*Function*/okHandler,
			/*Function*/errHandler){
		// summary:
		//		sets up the Deferred and ioArgs property on the Deferred so it
		//		can be used in an io call.
		// args:
		//		The args object passed into the public io call. Recognized properties on
		//		the args object are:
		// canceller:
		//		The canceller function used for the Deferred object. The function
		//		will receive one argument, the Deferred object that is related to the
		//		canceller.
		// okHandler:
		//		The first OK callback to be registered with Deferred. It has the opportunity
		//		to transform the OK response. It will receive one argument -- the Deferred
		//		object returned from this function.
		// errHandler:
		//		The first error callback to be registered with Deferred. It has the opportunity
		//		to do cleanup on an error. It will receive two arguments: error (the
		//		Error object) and dfd, the Deferred object returned from this function.

		var ioArgs = {args: args, url: args.url};

		//Get values from form if requested.
		var formObject = null;
		if(args.form){
			var form = dom.byId(args.form);
			//IE requires going through getAttributeNode instead of just getAttribute in some form cases,
			//so use it for all. See #2844
			var actnNode = form.getAttributeNode("action");
			ioArgs.url = ioArgs.url || (actnNode ? actnNode.value : (dojo.doc ? dojo.doc.URL : null));
			formObject = domForm.toObject(form);
		}

		// set up the query params
		var miArgs = {};

		if(formObject){
			// potentially over-ride url-provided params w/ form values
			lang.mixin(miArgs, formObject);
		}
		if(args.content){
			// stuff in content over-rides what's set by form
			lang.mixin(miArgs, args.content);
		}
		if(args.preventCache){
			miArgs["dojo.preventCache"] = new Date().valueOf();
		}
		ioArgs.query = ioq.objectToQuery(miArgs);

		// .. and the real work of getting the deferred in order, etc.
		ioArgs.handleAs = args.handleAs || "text";
		var d = new Deferred(function(dfd){
			dfd.canceled = true;
			canceller && canceller(dfd);

			var err = dfd.ioArgs.error;
			if(!err){
				err = new Error("request cancelled");
				err.dojoType="cancel";
				dfd.ioArgs.error = err;
			}
			return err;
		});
		d.addCallback(okHandler);

		//Support specifying load, error and handle callback functions from the args.
		//For those callbacks, the "this" object will be the args object.
		//The callbacks will get the deferred result value as the
		//first argument and the ioArgs object as the second argument.
		var ld = args.load;
		if(ld && lang.isFunction(ld)){
			d.addCallback(function(value){
				return ld.call(args, value, ioArgs);
			});
		}
		var err = args.error;
		if(err && lang.isFunction(err)){
			d.addErrback(function(value){
				return err.call(args, value, ioArgs);
			});
		}
		var handle = args.handle;
		if(handle && lang.isFunction(handle)){
			d.addBoth(function(value){
				return handle.call(args, value, ioArgs);
			});
		}

		// Attach error handler last (not including topic publishing)
		// to catch any errors that may have been generated from load
		// or handle functions.
		d.addErrback(function(error){
			return errHandler(error, d);
		});

		//Plug in topic publishing, if dojo.publish is loaded.
		if(cfg.ioPublish && dojo.publish && ioArgs.args.ioPublish !== false){
			d.addCallbacks(
				function(res){
					dojo.publish("/dojo/io/load", [d, res]);
					return res;
				},
				function(res){
					dojo.publish("/dojo/io/error", [d, res]);
					return res;
				}
			);
			d.addBoth(function(res){
				dojo.publish("/dojo/io/done", [d, res]);
				return res;
			});
		}

		d.ioArgs = ioArgs;

		// FIXME: need to wire up the xhr object's abort method to something
		// analogous in the Deferred
		return d;
	};

	var _deferredOk = function(/*Deferred*/dfd){
		// summary:
		//		okHandler function for dojo._ioSetArgs call.

		var ret = handlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
		return ret === undefined ? null : ret;
	};
	var _deferError = function(/*Error*/error, /*Deferred*/dfd){
		// summary:
		//		errHandler function for dojo._ioSetArgs call.

		if(!dfd.ioArgs.args.failOk){
			console.error(error);
		}
		return error;
	};

	//Use a separate count for knowing if we are starting/stopping io calls.
	var _checkPubCount = function(dfd){
		if(_pubCount <= 0){
			_pubCount = 0;
			if(cfg.ioPublish && dojo.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)){
				dojo.publish("/dojo/io/stop");
			}
		}
	};

	var _pubCount = 0;
	aspect.after(watch, "_onAction", function(){
		_pubCount -= 1;
	});
	aspect.after(watch, "_onInFlight", _checkPubCount);

	dojo._ioCancelAll = watch.cancelAll;
	/*=====
	dojo._ioCancelAll = function(){
		// summary:
		//		Cancels all pending IO requests, regardless of IO type
		//		(xhr, script, iframe).
	};
	=====*/

	dojo._ioNotifyStart = function(/*Deferred*/dfd){
		// summary:
		//		If dojo.publish is available, publish topics
		//		about the start of a request queue and/or the
		//		the beginning of request.
		//
		//		Used by IO transports. An IO transport should
		//		call this method before making the network connection.
		if(cfg.ioPublish && dojo.publish && dfd.ioArgs.args.ioPublish !== false){
			if(!_pubCount){
				dojo.publish("/dojo/io/start");
			}
			_pubCount += 1;
			dojo.publish("/dojo/io/send", [dfd]);
		}
	};

	dojo._ioWatch = function(dfd, validCheck, ioCheck, resHandle){
		// summary:
		//		Watches the io request represented by dfd to see if it completes.
		// dfd: Deferred
		//		The Deferred object to watch.
		// validCheck: Function
		//		Function used to check if the IO request is still valid. Gets the dfd
		//		object as its only argument.
		// ioCheck: Function
		//		Function used to check if basic IO call worked. Gets the dfd
		//		object as its only argument.
		// resHandle: Function
		//		Function used to process response. Gets the dfd
		//		object as its only argument.

		var args = dfd.ioArgs.options = dfd.ioArgs.args;
		lang.mixin(dfd, {
			response: dfd.ioArgs,
			isValid: function(response){
				return validCheck(dfd);
			},
			isReady: function(response){
				return ioCheck(dfd);
			},
			handleResponse: function(response){
				return resHandle(dfd);
			}
		});
		watch(dfd);

		_checkPubCount(dfd);
	};

	var _defaultContentType = "application/x-www-form-urlencoded";

	dojo._ioAddQueryToUrl = function(/*dojo.__IoCallbackArgs*/ioArgs){
		// summary:
		//		Adds query params discovered by the io deferred construction to the URL.
		//		Only use this for operations which are fundamentally GET-type operations.
		if(ioArgs.query.length){
			ioArgs.url += (ioArgs.url.indexOf("?") == -1 ? "?" : "&") + ioArgs.query;
			ioArgs.query = null;
		}
	};

	/*=====
	dojo.__XhrArgs = declare(dojo.__IoArgs, {
		// summary:
		//		In addition to the properties listed for the dojo._IoArgs type,
		//		the following properties are allowed for dojo.xhr* methods.
		// handleAs: String?
		//		Acceptable values are: text (default), json, json-comment-optional,
		//		json-comment-filtered, javascript, xml. See `dojo/_base/xhr.contentHandlers`
	 	// sync: Boolean?
		//		false is default. Indicates whether the request should
		//		be a synchronous (blocking) request.
		// headers: Object?
		//		Additional HTTP headers to send in the request.
		// failOk: Boolean?
		//		false is default. Indicates whether a request should be
		//		allowed to fail (and therefore no console error message in
		//		the event of a failure)
		// contentType: String|Boolean
		//		"application/x-www-form-urlencoded" is default. Set to false to
		//		prevent a Content-Type header from being sent, or to a string
		//		to send a different Content-Type.
	 });
	=====*/

	dojo.xhr = function(/*String*/ method, /*dojo.__XhrArgs*/ args, /*Boolean?*/ hasBody){
		// summary:
		//		Deprecated.   Use dojo/request instead.
		// description:
		//		Sends an HTTP request with the given method.
		//		See also dojo.xhrGet(), xhrPost(), xhrPut() and dojo.xhrDelete() for shortcuts
		//		for those HTTP methods. There are also methods for "raw" PUT and POST methods
		//		via dojo.rawXhrPut() and dojo.rawXhrPost() respectively.
		// method:
		//		HTTP method to be used, such as GET, POST, PUT, DELETE. Should be uppercase.
		// hasBody:
		//		If the request has an HTTP body, then pass true for hasBody.

		var rDfd;
		//Make the Deferred object for this xhr request.
		var dfd = dojo._ioSetArgs(args, function(dfd){
			rDfd && rDfd.cancel();
		}, _deferredOk, _deferError);
		var ioArgs = dfd.ioArgs;

		//Allow for specifying the HTTP body completely.
		if("postData" in args){
			ioArgs.query = args.postData;
		}else if("putData" in args){
			ioArgs.query = args.putData;
		}else if("rawBody" in args){
			ioArgs.query = args.rawBody;
		}else if((arguments.length > 2 && !hasBody) || "POST|PUT".indexOf(method.toUpperCase()) === -1){
			//Check for hasBody being passed. If no hasBody,
			//then only append query string if not a POST or PUT request.
			dojo._ioAddQueryToUrl(ioArgs);
		}

		var options = {
			method: method,
			handleAs: "text",
			timeout: args.timeout,
			withCredentials: args.withCredentials,
			ioArgs: ioArgs
		};

		if(typeof args.headers !== 'undefined'){
			options.headers = args.headers;
		}
		if(typeof args.contentType !== 'undefined'){
			if(!options.headers){
				options.headers = {};
			}
			options.headers['Content-Type'] = args.contentType;
		}
		if(typeof ioArgs.query !== 'undefined'){
			options.data = ioArgs.query;
		}
		if(typeof args.sync !== 'undefined'){
			options.sync = args.sync;
		}

		dojo._ioNotifyStart(dfd);
		try{
			rDfd = _xhr(ioArgs.url, options, true);
		}catch(e){
			// If XHR creation fails, dojo/request/xhr throws
			// When this happens, cancel the deferred
			dfd.cancel();
			return dfd;
		}

		// sync ioArgs
		dfd.ioArgs.xhr = rDfd.response.xhr;

		rDfd.then(function(){
			dfd.resolve(dfd);
		}).otherwise(function(error){
			ioArgs.error = error;
			if(error.response){
				error.status = error.response.status;
				error.responseText = error.response.text;
				error.xhr = error.response.xhr;
			}
			dfd.reject(error);
		});
		return dfd; // dojo/_base/Deferred
	};

	dojo.xhrGet = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP GET request to the server.
		return dojo.xhr("GET", args); // dojo/_base/Deferred
	};

	dojo.rawXhrPost = dojo.xhrPost = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP POST request to the server. In addition to the properties
		//		listed for the dojo.__XhrArgs type, the following property is allowed:
		// postData:
		//		String. Send raw data in the body of the POST request.
		return dojo.xhr("POST", args, true); // dojo/_base/Deferred
	};

	dojo.rawXhrPut = dojo.xhrPut = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP PUT request to the server. In addition to the properties
		//		listed for the dojo.__XhrArgs type, the following property is allowed:
		// putData:
		//		String. Send raw data in the body of the PUT request.
		return dojo.xhr("PUT", args, true); // dojo/_base/Deferred
	};

	dojo.xhrDelete = function(/*dojo.__XhrArgs*/ args){
		// summary:
		//		Sends an HTTP DELETE request to the server.
		return dojo.xhr("DELETE", args); // dojo/_base/Deferred
	};

	/*
	dojo.wrapForm = function(formNode){
		// summary:
		//		A replacement for FormBind, but not implemented yet.

		// FIXME: need to think harder about what extensions to this we might
		// want. What should we allow folks to do w/ this? What events to
		// set/send?
		throw new Error("dojo.wrapForm not yet implemented");
	}
	*/

	dojo._isDocumentOk = function(x){
		return util.checkStatus(x.status);
	};

	dojo._getText = function(url){
		var result;
		dojo.xhrGet({url:url, sync:true, load:function(text){
			result = text;
		}});
		return result;
	};

	// Add aliases for static functions to dojo.xhr since dojo.xhr is what's returned from this module
	lang.mixin(dojo.xhr, {
		_xhrObj: dojo._xhrObj,
		fieldToObject: domForm.fieldToObject,
		formToObject: domForm.toObject,
		objectToQuery: ioq.objectToQuery,
		formToQuery: domForm.toQuery,
		formToJson: domForm.toJson,
		queryToObject: ioq.queryToObject,
		contentHandlers: handlers,
		_ioSetArgs: dojo._ioSetArgs,
		_ioCancelAll: dojo._ioCancelAll,
		_ioNotifyStart: dojo._ioNotifyStart,
		_ioWatch: dojo._ioWatch,
		_ioAddQueryToUrl: dojo._ioAddQueryToUrl,
		_isDocumentOk: dojo._isDocumentOk,
		_getText: dojo._getText,
		get: dojo.xhrGet,
		post: dojo.xhrPost,
		put: dojo.xhrPut,
		del: dojo.xhrDelete	// because "delete" is a reserved word
	});

	return dojo.xhr;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/aspect.js":
/*!*************************************!*\
  !*** ./node_modules/dojo/aspect.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){

	// module:
	//		dojo/aspect

	"use strict";
	var undefined;
	function advise(dispatcher, type, advice, receiveArguments){
		var previous = dispatcher[type];
		var around = type == "around";
		var signal;
		if(around){
			var advised = advice(function(){
				return previous.advice(this, arguments);
			});
			signal = {
				remove: function(){
					if(advised){
						advised = dispatcher = advice = null;
					}
				},
				advice: function(target, args){
					return advised ?
						advised.apply(target, args) :  // called the advised function
						previous.advice(target, args); // cancelled, skip to next one
				}
			};
		}else{
			// create the remove handler
			signal = {
				remove: function(){
					if(signal.advice){
						var previous = signal.previous;
						var next = signal.next;
						if(!next && !previous){
							delete dispatcher[type];
						}else{
							if(previous){
								previous.next = next;
							}else{
								dispatcher[type] = next;
							}
							if(next){
								next.previous = previous;
							}
						}

						// remove the advice to signal that this signal has been removed
						dispatcher = advice = signal.advice = null;
					}
				},
				id: dispatcher.nextId++,
				advice: advice,
				receiveArguments: receiveArguments
			};
		}
		if(previous && !around){
			if(type == "after"){
				// add the listener to the end of the list
				// note that we had to change this loop a little bit to workaround a bizarre IE10 JIT bug
				while(previous.next && (previous = previous.next)){}
				previous.next = signal;
				signal.previous = previous;
			}else if(type == "before"){
				// add to beginning
				dispatcher[type] = signal;
				signal.next = previous;
				previous.previous = signal;
			}
		}else{
			// around or first one just replaces
			dispatcher[type] = signal;
		}
		return signal;
	}
	function aspect(type){
		return function(target, methodName, advice, receiveArguments){
			var existing = target[methodName], dispatcher;
			if(!existing || existing.target != target){
				// no dispatcher in place
				target[methodName] = dispatcher = function(){
					var executionId = dispatcher.nextId;
					// before advice
					var args = arguments;
					var before = dispatcher.before;
					while(before){
						if(before.advice){
							args = before.advice.apply(this, args) || args;
						}
						before = before.next;
					}
					// around advice
					if(dispatcher.around){
						var results = dispatcher.around.advice(this, args);
					}
					// after advice
					var after = dispatcher.after;
					while(after && after.id < executionId){
						if(after.advice){
							if(after.receiveArguments){
								var newResults = after.advice.apply(this, args);
								// change the return value only if a new value was returned
								results = newResults === undefined ? results : newResults;
							}else{
								results = after.advice.call(this, results, args);
							}
						}
						after = after.next;
					}
					return results;
				};
				if(existing){
					dispatcher.around = {advice: function(target, args){
						return existing.apply(target, args);
					}};
				}
				dispatcher.target = target;
				dispatcher.nextId = dispatcher.nextId || 0;
			}
			var results = advise((dispatcher || existing), type, advice, receiveArguments);
			advice = null;
			return results;
		};
	}

	// TODOC: after/before/around return object

	var after = aspect("after");
	/*=====
	after = function(target, methodName, advice, receiveArguments){
		// summary:
		//		The "after" export of the aspect module is a function that can be used to attach
		//		"after" advice to a method. This function will be executed after the original method
		//		is executed. By default the function will be called with a single argument, the return
		//		value of the original method, or the the return value of the last executed advice (if a previous one exists).
		//		The fourth (optional) argument can be set to true to so the function receives the original
		//		arguments (from when the original method was called) rather than the return value.
		//		If there are multiple "after" advisors, they are executed in the order they were registered.
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called after the original method
		// receiveArguments: Boolean?
		//		If this is set to true, the advice function receives the original arguments (from when the original mehtod
		//		was called) rather than the return value of the original/previous method.
		// returns:
		//		A signal object that can be used to cancel the advice. If remove() is called on this signal object, it will
		//		stop the advice function from being executed.
	};
	=====*/

	var before = aspect("before");
	/*=====
	before = function(target, methodName, advice){
		// summary:
		//		The "before" export of the aspect module is a function that can be used to attach
		//		"before" advice to a method. This function will be executed before the original method
		//		is executed. This function will be called with the arguments used to call the method.
		//		This function may optionally return an array as the new arguments to use to call
		//		the original method (or the previous, next-to-execute before advice, if one exists).
		//		If the before method doesn't return anything (returns undefined) the original arguments
		//		will be preserved.
		//		If there are multiple "before" advisors, they are executed in the reverse order they were registered.
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called before the original method
	};
	=====*/

	var around = aspect("around");
	/*=====
	 around = function(target, methodName, advice){
		// summary:
		//		The "around" export of the aspect module is a function that can be used to attach
		//		"around" advice to a method. The advisor function is immediately executed when
		//		the around() is called, is passed a single argument that is a function that can be
		//		called to continue execution of the original method (or the next around advisor).
		//		The advisor function should return a function, and this function will be called whenever
		//		the method is called. It will be called with the arguments used to call the method.
		//		Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
		// example:
		//		If there are multiple "around" advisors, the most recent one is executed first,
		//		which can then delegate to the next one and so on. For example:
		//		|	around(obj, "foo", function(originalFoo){
		//		|		return function(){
		//		|			var start = new Date().getTime();
		//		|			var results = originalFoo.apply(this, arguments); // call the original
		//		|			var end = new Date().getTime();
		//		|			console.log("foo execution took " + (end - start) + " ms");
		//		|			return results;
		//		|		};
		//		|	});
		// target: Object
		//		This is the target object
		// methodName: String
		//		This is the name of the method to attach to.
		// advice: Function
		//		This is function to be called around the original method
	};
	=====*/

	return {
		// summary:
		//		provides aspect oriented programming functionality, allowing for
		//		one to add before, around, or after advice on existing methods.
		// example:
		//	|	define(["dojo/aspect"], function(aspect){
		//	|		var signal = aspect.after(targetObject, "methodName", function(someArgument){
		//	|			this will be called when targetObject.methodName() is called, after the original function is called
		//	|		});
		//
		// example:
		//	The returned signal object can be used to cancel the advice.
		//	|	signal.remove(); // this will stop the advice from being executed anymore
		//	|	aspect.before(targetObject, "methodName", function(someArgument){
		//	|		// this will be called when targetObject.methodName() is called, before the original function is called
		//	|	 });

		before: before,
		around: around,
		after: after
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/dom-form.js":
/*!***************************************!*\
  !*** ./node_modules/dojo/dom-form.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ./dom */ "./node_modules/dojo/dom.js"), __webpack_require__(/*! ./io-query */ "./node_modules/dojo/io-query.js"), __webpack_require__(/*! ./json */ "./node_modules/dojo/json.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, dom, ioq, json){
	// module:
	//		dojo/dom-form

    function setValue(/*Object*/ obj, /*String*/ name, /*String*/ value){
        // summary:
        //		For the named property in object, set the value. If a value
        //		already exists and it is a string, convert the value to be an
        //		array of values.

        // Skip it if there is no value
        if(value === null){
            return;
        }

        var val = obj[name];
        if(typeof val == "string"){ // inline'd type check
            obj[name] = [val, value];
        }else if(lang.isArray(val)){
            val.push(value);
        }else{
            obj[name] = value;
        }
    }

	var exclude = "file|submit|image|reset|button";

	var form = {
		// summary:
		//		This module defines form-processing functions.

		fieldToObject: function fieldToObject(/*DOMNode|String*/ inputNode){
			// summary:
			//		Serialize a form field to a JavaScript object.
			// description:
			//		Returns the value encoded in a form field as
			//		as a string or an array of strings. Disabled form elements
			//		and unchecked radio and checkboxes are skipped.	Multi-select
			//		elements are returned as an array of string values.
			// inputNode: DOMNode|String
			// returns: Object

			var ret = null;
			inputNode = dom.byId(inputNode);
			if(inputNode){
				var _in = inputNode.name, type = (inputNode.type || "").toLowerCase();
				if(_in && type && !inputNode.disabled){
					if(type == "radio" || type == "checkbox"){
						if(inputNode.checked){
							ret = inputNode.value;
						}
					}else if(inputNode.multiple){
						ret = [];
						var nodes = [inputNode.firstChild];
						while(nodes.length){
							for(var node = nodes.pop(); node; node = node.nextSibling){
								if(node.nodeType == 1 && node.tagName.toLowerCase() == "option"){
									if(node.selected){
										ret.push(node.value);
									}
								}else{
									if(node.nextSibling){
										nodes.push(node.nextSibling);
									}
									if(node.firstChild){
										nodes.push(node.firstChild);
									}
									break;
								}
							}
						}
					}else{
						ret = inputNode.value;
					}
				}
			}
			return ret; // Object
		},

		toObject: function formToObject(/*DOMNode|String*/ formNode){
			// summary:
			//		Serialize a form node to a JavaScript object.
			// description:
			//		Returns the values encoded in an HTML form as
			//		string properties in an object which it then returns. Disabled form
			//		elements, buttons, and other non-value form elements are skipped.
			//		Multi-select elements are returned as an array of string values.
			// formNode: DOMNode|String
			// example:
			//		This form:
			//		|	<form id="test_form">
			//		|		<input type="text" name="blah" value="blah">
			//		|		<input type="text" name="no_value" value="blah" disabled>
			//		|		<input type="button" name="no_value2" value="blah">
			//		|		<select type="select" multiple name="multi" size="5">
			//		|			<option value="blah">blah</option>
			//		|			<option value="thud" selected>thud</option>
			//		|			<option value="thonk" selected>thonk</option>
			//		|		</select>
			//		|	</form>
			//
			//		yields this object structure as the result of a call to
			//		formToObject():
			//
			//		|	{
			//		|		blah: "blah",
			//		|		multi: [
			//		|			"thud",
			//		|			"thonk"
			//		|		]
			//		|	};

			var ret = {}, elems = dom.byId(formNode).elements;
			for(var i = 0, l = elems.length; i < l; ++i){
				var item = elems[i], _in = item.name, type = (item.type || "").toLowerCase();
				if(_in && type && exclude.indexOf(type) < 0 && !item.disabled){
					setValue(ret, _in, form.fieldToObject(item));
					if(type == "image"){
						ret[_in + ".x"] = ret[_in + ".y"] = ret[_in].x = ret[_in].y = 0;
					}
				}
			}
			return ret; // Object
		},

		toQuery: function formToQuery(/*DOMNode|String*/ formNode){
			// summary:
			//		Returns a URL-encoded string representing the form passed as either a
			//		node or string ID identifying the form to serialize
			// formNode: DOMNode|String
			// returns: String

			return ioq.objectToQuery(form.toObject(formNode)); // String
		},

		toJson: function formToJson(/*DOMNode|String*/ formNode, /*Boolean?*/ prettyPrint){
			// summary:
			//		Create a serialized JSON string from a form node or string
			//		ID identifying the form to serialize
			// formNode: DOMNode|String
			// prettyPrint: Boolean?
			// returns: String

			return json.stringify(form.toObject(formNode), null, prettyPrint ? 4 : 0); // String
		}
	};

    return form;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/dom.js":
/*!**********************************!*\
  !*** ./node_modules/dojo/dom.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./sniff */ "./node_modules/dojo/sniff.js"), __webpack_require__(/*! ./_base/window */ "./node_modules/dojo/_base/window.js"), __webpack_require__(/*! ./_base/kernel */ "./node_modules/dojo/_base/kernel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(has, win, kernel){
	// module:
	//		dojo/dom

	// FIXME: need to add unit tests for all the semi-public methods

	if(has("ie") <= 7){
		try{
			document.execCommand("BackgroundImageCache", false, true);
		}catch(e){
			// sane browsers don't have cache "issues"
		}
	}

	// =============================
	// DOM Functions
	// =============================

	// the result object
	var dom = {
		// summary:
		//		This module defines the core dojo DOM API.
	};

	if(has("ie")){
		dom.byId = function(id, doc){
			if(typeof id != "string"){
				return id;
			}
			var _d = doc || win.doc, te = id && _d.getElementById(id);
			// attributes.id.value is better than just id in case the
			// user has a name=id inside a form
			if(te && (te.attributes.id.value == id || te.id == id)){
				return te;
			}else{
				var eles = _d.all[id];
				if(!eles || eles.nodeName){
					eles = [eles];
				}
				// if more than 1, choose first with the correct id
				var i = 0;
				while((te = eles[i++])){
					if((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id){
						return te;
					}
				}
			}
		};
	}else{
		dom.byId = function(id, doc){
			// inline'd type check.
			// be sure to return null per documentation, to match IE branch.
			return ((typeof id == "string") ? (doc || win.doc).getElementById(id) : id) || null; // DOMNode
		};
	}
	/*=====
	 dom.byId = function(id, doc){
		// summary:
		//		Returns DOM node with matching `id` attribute or falsy value (ex: null or undefined)
		//		if not found.  If `id` is a DomNode, this function is a no-op.
		//
		// id: String|DOMNode
		//		A string to match an HTML id attribute or a reference to a DOM Node
		//
		// doc: Document?
		//		Document to work in. Defaults to the current value of
		//		dojo/_base/window.doc.  Can be used to retrieve
		//		node references from other documents.
		//
		// example:
		//		Look up a node by ID:
		//	|	require(["dojo/dom"], function(dom){
		//	|		var n = dom.byId("foo");
		//	|	});
		//
		// example:
		//		Check if a node exists, and use it.
		//	|	require(["dojo/dom"], function(dom){
		//	|		var n = dom.byId("bar");
		//	|		if(n){ doStuff() ... }
		//	|	});
		//
		// example:
		//		Allow string or DomNode references to be passed to a custom function:
		//	|	require(["dojo/dom"], function(dom){
		//	|		var foo = function(nodeOrId){
		//	|			nodeOrId = dom.byId(nodeOrId);
		//	|			// ... more stuff
		//	|		}
		//	|	});
	 };
	 =====*/

	// Test for DOMNode.contains() method, available everywhere except FF8-
	// and IE8-, where it's available in general, but not on document itself,
	// and also problems when either ancestor or node are text nodes.

	var doc = kernel.global["document"] || null;
	has.add("dom-contains", !!(doc && doc.contains));
	dom.isDescendant = has("dom-contains") ?
		// FF9+, IE9+, webkit, opera, iOS, Android, Edge, etc.
		function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
			return !!( (ancestor = dom.byId(ancestor)) && ancestor.contains(dom.byId(node)) );
		} :
		function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
			// summary:
			//		Returns true if node is a descendant of ancestor
			// node: DOMNode|String
			//		string id or node reference to test
			// ancestor: DOMNode|String
			//		string id or node reference of potential parent to test against
			//
			// example:
			//		Test is node id="bar" is a descendant of node id="foo"
			//	|	require(["dojo/dom"], function(dom){
			//	|		if(dom.isDescendant("bar", "foo")){ ... }
			//	|	});

			try{
				node = dom.byId(node);
				ancestor = dom.byId(ancestor);
				while(node){
					if(node == ancestor){
						return true; // Boolean
					}
					node = node.parentNode;
				}
			}catch(e){ /* squelch, return false */ }
			return false; // Boolean
		};

	// TODO: do we need setSelectable in the base?

	// Add feature test for user-select CSS property
	// (currently known to work in all but IE < 10 and Opera)
	// TODO: The user-select CSS property as of May 2014 is no longer part of
	// any CSS specification. In IE, -ms-user-select does not do the same thing
	// as the unselectable attribute on elements; namely, dijit Editor buttons
	// do not properly prevent the content of the editable content frame from
	// unblurring. As a result, the -ms- prefixed version is omitted here.
	has.add("css-user-select", function(global, doc, element){
		// Avoid exception when dom.js is loaded in non-browser environments
		if(!element){ return false; }

		var style = element.style;
		var prefixes = ["Khtml", "O", "Moz", "Webkit"],
			i = prefixes.length,
			name = "userSelect",
			prefix;

		// Iterate prefixes from most to least likely
		do{
			if(typeof style[name] !== "undefined"){
				// Supported; return property name
				return name;
			}
		}while(i-- && (name = prefixes[i] + "UserSelect"));

		// Not supported if we didn't return before now
		return false;
	});

	/*=====
	dom.setSelectable = function(node, selectable){
		// summary:
		//		Enable or disable selection on a node
		// node: DOMNode|String
		//		id or reference to node
		// selectable: Boolean
		//		state to put the node in. false indicates unselectable, true
		//		allows selection.
		// example:
		//		Make the node id="bar" unselectable
		//	|	require(["dojo/dom"], function(dom){
		//	|		dom.setSelectable("bar");
		//	|	});
		// example:
		//		Make the node id="bar" selectable
		//	|	require(["dojo/dom"], function(dom){
		//	|		dom.setSelectable("bar", true);
		//	|	});
	};
	=====*/

	var cssUserSelect = has("css-user-select");
	dom.setSelectable = cssUserSelect ? function(node, selectable){
		// css-user-select returns a (possibly vendor-prefixed) CSS property name
		dom.byId(node).style[cssUserSelect] = selectable ? "" : "none";
	} : function(node, selectable){
		node = dom.byId(node);

		// (IE < 10 / Opera) Fall back to setting/removing the
		// unselectable attribute on the element and all its children
		var nodes = node.getElementsByTagName("*"),
			i = nodes.length;

		if(selectable){
			node.removeAttribute("unselectable");
			while(i--){
				nodes[i].removeAttribute("unselectable");
			}
		}else{
			node.setAttribute("unselectable", "on");
			while(i--){
				nodes[i].setAttribute("unselectable", "on");
			}
		}
	};

	return dom;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/domReady.js":
/*!***************************************!*\
  !*** ./node_modules/dojo/domReady.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./global */ "./node_modules/dojo/global.js"), __webpack_require__(/*! ./has */ "./node_modules/dojo/has.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(global, has){
	var doc = document,
		readyStates = { 'loaded': 1, 'complete': 1 },
		fixReadyState = typeof doc.readyState != "string",
		ready = !!readyStates[doc.readyState],
		readyQ = [],
		recursiveGuard;

	function domReady(callback){
		// summary:
		//		Plugin to delay require()/define() callback from firing until the DOM has finished loading.
		readyQ.push(callback);
		if(ready){ processQ(); }
	}
	domReady.load = function(id, req, load){
		domReady(load);
	};

	// Export queue so that ready() can check if it's empty or not.
	domReady._Q = readyQ;
	domReady._onQEmpty = function(){
		// summary:
		//		Private method overridden by dojo/ready, to notify when everything in the
		//		domReady queue has been processed.  Do not use directly.
		//		Will be removed in 2.0, along with domReady._Q.
	};

	// For FF <= 3.5
	if(fixReadyState){ doc.readyState = "loading"; }

	function processQ(){
		// Calls all functions in the queue in order, unless processQ() is already running, in which case just return

		if(recursiveGuard){ return; }
		recursiveGuard = true;

		while(readyQ.length){
			try{
				(readyQ.shift())(doc);
			}catch(err){
				console.error(err, "in domReady callback", err.stack);
			}
		}

		recursiveGuard = false;

		// Notification for dojo/ready.  Remove for 2.0.
		// Note that this could add more tasks to the ready queue.
		domReady._onQEmpty();
	}

	if(!ready){
		var tests = [],
			detectReady = function(evt){
				evt = evt || global.event;
				if(ready || (evt.type == "readystatechange" && !readyStates[doc.readyState])){ return; }

				// For FF <= 3.5
				if(fixReadyState){ doc.readyState = "complete"; }

				ready = 1;
				processQ();
			},
			on = function(node, event){
				node.addEventListener(event, detectReady, false);
				readyQ.push(function(){ node.removeEventListener(event, detectReady, false); });
			};

		if(!has("dom-addeventlistener")){
			on = function(node, event){
				event = "on" + event;
				node.attachEvent(event, detectReady);
				readyQ.push(function(){ node.detachEvent(event, detectReady); });
			};

			var div = doc.createElement("div");
			try{
				if(div.doScroll && global.frameElement === null){
					// the doScroll test is only useful if we're in the top-most frame
					tests.push(function(){
						// Derived with permission from Diego Perini's IEContentLoaded
						// http://javascript.nwbox.com/IEContentLoaded/
						try{
							div.doScroll("left");
							return 1;
						}catch(e){}
					});
				}
			}catch(e){}
		}

		on(doc, "DOMContentLoaded");
		on(global, "load");

		if("onreadystatechange" in doc){
			on(doc, "readystatechange");
		}else if(!fixReadyState){
			// if the ready state property exists and there's
			// no readystatechange event, poll for the state
			// to change
			tests.push(function(){
				return readyStates[doc.readyState];
			});
		}

		if(tests.length){
			var poller = function(){
				if(ready){ return; }
				var i = tests.length;
				while(i--){
					if(tests[i]()){
						detectReady("poller");
						return;
					}
				}
				setTimeout(poller, 30);
			};
			poller();
		}
	}

	return domReady;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/errors/CancelError.js":
/*!*************************************************!*\
  !*** ./node_modules/dojo/errors/CancelError.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./create */ "./node_modules/dojo/errors/create.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(create){
	// module:
	//		dojo/errors/CancelError

	/*=====
	return function(){
		// summary:
		//		Default error if a promise is canceled without a reason.
	};
	=====*/

	return create("CancelError", null, null, { dojoType: "cancel", log: false });
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/errors/RequestError.js":
/*!**************************************************!*\
  !*** ./node_modules/dojo/errors/RequestError.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./create */ "./node_modules/dojo/errors/create.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(create){
	// module:
	//		dojo/errors/RequestError

	/*=====
	 return function(){
		 // summary:
		 //		TODOC
	 };
	 =====*/

	return create("RequestError", function(message, response){
		this.response = response;
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/errors/RequestTimeoutError.js":
/*!*********************************************************!*\
  !*** ./node_modules/dojo/errors/RequestTimeoutError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./create */ "./node_modules/dojo/errors/create.js"), __webpack_require__(/*! ./RequestError */ "./node_modules/dojo/errors/RequestError.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(create, RequestError){
	// module:
	//		dojo/errors/RequestTimeoutError

	/*=====
	 return function(){
		 // summary:
		 //		TODOC
	 };
	 =====*/

	return create("RequestTimeoutError", null, RequestError, {
		dojoType: "timeout"
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/errors/create.js":
/*!********************************************!*\
  !*** ./node_modules/dojo/errors/create.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang){
	return function(name, ctor, base, props){
		base = base || Error;

		var ErrorCtor = function(message){
			if(base === Error){
				if(Error.captureStackTrace){
					Error.captureStackTrace(this, ErrorCtor);
				}

				// Error.call() operates on the returned error
				// object rather than operating on |this|
				var err = Error.call(this, message),
					prop;

				// Copy own properties from err to |this|
				for(prop in err){
					if(err.hasOwnProperty(prop)){
						this[prop] = err[prop];
					}
				}

				// messsage is non-enumerable in ES5
				this.message = message;
				// stack is non-enumerable in at least Firefox
				this.stack = err.stack;
			}else{
				base.apply(this, arguments);
			}
			if(ctor){
				ctor.apply(this, arguments);
			}
		};

		ErrorCtor.prototype = lang.delegate(base.prototype, props);
		ErrorCtor.prototype.name = name;
		ErrorCtor.prototype.constructor = ErrorCtor;

		return ErrorCtor;
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/global.js":
/*!*************************************!*\
  !*** ./node_modules/dojo/global.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
    if (typeof global !== 'undefined' && typeof global !== 'function') {
        // global spec defines a reference to the global object called 'global'
        // https://github.com/tc39/proposal-global
        // `global` is also defined in NodeJS
        return global;
    }
    else if (typeof window !== 'undefined') {
        // window is defined in browsers
        return window;
    }
    else if (typeof self !== 'undefined') {
        // self is defined in WebWorkers
        return self;
    }
    return this;
}).call(null, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/has.js":
/*!**********************************!*\
  !*** ./node_modules/dojo/has.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./global */ "./node_modules/dojo/global.js"), __webpack_require__.dj.c(module.i), __webpack_require__.dj.m(module)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(global, require, module){
	// module:
	//		dojo/has
	// summary:
	//		Defines the has.js API and several feature tests used by dojo.
	// description:
	//		This module defines the has API as described by the project has.js with the following additional features:
	//
	//		- the has test cache is exposed at has.cache.
	//		- the method has.add includes a forth parameter that controls whether or not existing tests are replaced
	//		- the loader's has cache may be optionally copied into this module's has cahce.
	//
	//		This module adopted from https://github.com/phiggins42/has.js; thanks has.js team!

	// try to pull the has implementation from the loader; both the dojo loader and bdLoad provide one
	// if using a foreign loader, then the has cache may be initialized via the config object for this module
	// WARNING: if a foreign loader defines require.has to be something other than the has.js API, then this implementation fail
	var has = require.has || function(){};
	if(!has("dojo-has-api")){
		var
			isBrowser =
				// the most fundamental decision: are we in the browser?
				typeof window != "undefined" &&
				typeof location != "undefined" &&
				typeof document != "undefined" &&
				window.location == location && window.document == document,

			// has API variables
			doc = isBrowser && document,
			element = doc && doc.createElement("DiV"),
			cache = (module.config && module.config()) || {};

		has = function(name){
			// summary:
			//		Return the current value of the named feature.
			//
			// name: String|Integer
			//		The name (if a string) or identifier (if an integer) of the feature to test.
			//
			// description:
			//		Returns the value of the feature named by name. The feature must have been
			//		previously added to the cache by has.add.

			return typeof cache[name] == "function" ? (cache[name] = cache[name](global, doc, element)) : cache[name]; // Boolean
		};

		has.cache = cache;

		has.add = function(name, test, now, force){
			// summary:
			//	 	Register a new feature test for some named feature.
			// name: String|Integer
			//	 	The name (if a string) or identifier (if an integer) of the feature to test.
			// test: Function
			//		 A test function to register. If a function, queued for testing until actually
			//		 needed. The test function should return a boolean indicating
			//	 	the presence of a feature or bug.
			// now: Boolean?
			//		 Optional. Omit if `test` is not a function. Provides a way to immediately
			//		 run the test and cache the result.
			// force: Boolean?
			//	 	Optional. If the test already exists and force is truthy, then the existing
			//	 	test will be replaced; otherwise, add does not replace an existing test (that
			//	 	is, by default, the first test advice wins).
			// example:
			//		A redundant test, testFn with immediate execution:
			//	|	has.add("javascript", function(){ return true; }, true);
			//
			// example:
			//		Again with the redundantness. You can do this in your tests, but we should
			//		not be doing this in any internal has.js tests
			//	|	has.add("javascript", true);
			//
			// example:
			//		Three things are passed to the testFunction. `global`, `document`, and a generic element
			//		from which to work your test should the need arise.
			//	|	has.add("bug-byid", function(g, d, el){
			//	|		// g	== global, typically window, yadda yadda
			//	|		// d	== document object
			//	|		// el == the generic element. a `has` element.
			//	|		return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
			//	|	});

			(typeof cache[name]=="undefined" || force) && (cache[name]= test);
			return now && has(name);
		};

		// since we're operating under a loader that doesn't provide a has API, we must explicitly initialize
		// has as it would have otherwise been initialized by the dojo loader; use has.add to the builder
		// can optimize these away iff desired
		has.add("host-browser", isBrowser);
		has.add("host-node", (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
		has.add("host-rhino", (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
		has.add("dom", isBrowser);
		has.add("dojo-dom-ready-api", 1);
		has.add("dojo-sniff", 1);
	}

	if(has("host-browser")){
		// Common application level tests
		has.add("dom-addeventlistener", !!document.addEventListener);

		// Do the device and browser have touch capability?
		has.add("touch", "ontouchstart" in document
			|| ("onpointerdown" in document && navigator.maxTouchPoints > 0)
			|| window.navigator.msMaxTouchPoints);

		// Touch events support
		has.add("touch-events", "ontouchstart" in document);

		// Test if pointer events are supported and enabled, with either standard names ("pointerdown" etc.) or
		// IE specific names ("MSPointerDown" etc.).  Tests are designed to work on embedded C# WebBrowser Controls
		// in addition to IE, Edge, and future versions of Firefox and Chrome.
		// Note that on IE11, has("pointer-events") and has("MSPointer") are both true.
		has.add("pointer-events", "pointerEnabled" in window.navigator ?
				window.navigator.pointerEnabled : "PointerEvent" in window);
		has.add("MSPointer", window.navigator.msPointerEnabled);
		// The "pointermove"" event is only continuously emitted in a touch environment if
		// the target node's "touch-action"" CSS property is set to "none"
		// https://www.w3.org/TR/pointerevents/#the-touch-action-css-property
		has.add("touch-action", has("touch") && has("pointer-events"));

		// I don't know if any of these tests are really correct, just a rough guess
		has.add("device-width", screen.availWidth || innerWidth);

		// Tests for DOMNode.attributes[] behavior:
		//	 - dom-attributes-explicit - attributes[] only lists explicitly user specified attributes
		//	 - dom-attributes-specified-flag (IE8) - need to check attr.specified flag to skip attributes user didn't specify
		//	 - Otherwise, in IE6-7. attributes[] will list hundreds of values, so need to do outerHTML to get attrs instead.
		var form = document.createElement("form");
		has.add("dom-attributes-explicit", form.attributes.length == 0); // W3C
		has.add("dom-attributes-specified-flag", form.attributes.length > 0 && form.attributes.length < 40);	// IE8
	}

	has.clearElement = function(element){
		// summary:
		//	 Deletes the contents of the element passed to test functions.
		element.innerHTML= "";
		return element;
	};

	has.normalize = function(id, toAbsMid){
		// summary:
		//	 Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		//
		// toAbsMid: Function
		//	 Resolves a relative module id into an absolute module id
		var
			tokens = id.match(/[\?:]|[^:\?]*/g), i = 0,
			get = function(skip){
				var term = tokens[i++];
				if(term == ":"){
					// empty string module name, resolves to 0
					return 0;
				}else{
					// postfixed with a ? means it is a feature to branch on, the term is the name of the feature
					if(tokens[i++] == "?"){
						if(!skip && has(term)){
							// matched the feature, get the first value from the options
							return get();
						}else{
							// did not match, get the second value, passing over the first
							get(true);
							return get(skip);
						}
					}
					// a module
					return term || 0;
				}
			};
		id = get();
		return id && toAbsMid(id);
	};

	has.load = function(id, parentRequire, loaded){
		// summary:
		//		Conditional loading of AMD modules based on a has feature test value.
		// id: String
		//		Gives the resolved module id to load.
		// parentRequire: Function
		//		The loader require function with respect to the module that contained the plugin resource in it's
		//		dependency list.
		// loaded: Function
		//	 Callback to loader that consumes result of plugin demand.

		if(id){
			parentRequire([id], loaded);
		}else{
			loaded();
		}
	};

	return has;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/i18n.js":
/*!***********************************!*\
  !*** ./node_modules/dojo/i18n.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__.dj.c(module.i), __webpack_require__(/*! ./has */ "./node_modules/dojo/has.js"), __webpack_require__(/*! ./_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! ./_base/config */ "./node_modules/dojo/_base/config.js"), __webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ./_base/xhr */ "./node_modules/dojo/_base/xhr.js"), __webpack_require__(/*! ./json */ "./node_modules/dojo/json.js"), __webpack_require__.dj.m(module)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, require, has, array, config, lang, xhr, json, module){

	// module:
	//		dojo/i18n

	has.add("dojo-preload-i18n-Api",
		// if true, define the preload localizations machinery
		1
	);

	has.add("dojo-v1x-i18n-Api",
		// if true, define the v1.x i18n functions
		1
	);

	var
		thisModule = dojo.i18n =
			{
				// summary:
				//		This module implements the dojo/i18n! plugin and the v1.6- i18n API
				// description:
				//		We choose to include our own plugin to leverage functionality already contained in dojo
				//		and thereby reduce the size of the plugin compared to various loader implementations. Also, this
				//		allows foreign AMD loaders to be used without their plugins.
			},

		nlsRe =
			// regexp for reconstructing the master bundle name from parts of the regexp match
			// nlsRe.exec("foo/bar/baz/nls/en-ca/foo") gives:
			// ["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
			// nlsRe.exec("foo/bar/baz/nls/foo") gives:
			// ["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
			// so, if match[5] is blank, it means this is the top bundle definition.
			// courtesy of http://requirejs.org
			/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,

		getAvailableLocales = function(
			root,
			locale,
			bundlePath,
			bundleName
		){
			// summary:
			//		return a vector of module ids containing all available locales with respect to the target locale
			//		For example, assuming:
			//
			//		- the root bundle indicates specific bundles for "fr" and "fr-ca",
			//		-  bundlePath is "myPackage/nls"
			//		- bundleName is "myBundle"
			//
			//		Then a locale argument of "fr-ca" would return
			//
			//			["myPackage/nls/myBundle", "myPackage/nls/fr/myBundle", "myPackage/nls/fr-ca/myBundle"]
			//
			//		Notice that bundles are returned least-specific to most-specific, starting with the root.
			//
			//		If root===false indicates we're working with a pre-AMD i18n bundle that doesn't tell about the available locales;
			//		therefore, assume everything is available and get 404 errors that indicate a particular localization is not available

			for(var result = [bundlePath + bundleName], localeParts = locale.split("-"), current = "", i = 0; i<localeParts.length; i++){
				current += (current ? "-" : "") + localeParts[i];
				if(!root || root[current]){
					result.push(bundlePath + current + "/" + bundleName);
					result.specificity = current;
				}
			}
			return result;
		},

		cache = {},

		getBundleName = function(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		},

		getL10nName = dojo.getL10nName = function(moduleName, bundleName, locale){
			return moduleName = module.i + "!" + getBundleName(moduleName, bundleName, locale);
		},

		doLoad = function(require, bundlePathAndName, bundlePath, bundleName, locale, load){
			// summary:
			//		get the root bundle which instructs which other bundles are required to construct the localized bundle
			require([bundlePathAndName], function(root){
				var current = lang.clone(root.root || root.ROOT),// 1.6 built bundle defined ROOT
					availableLocales = getAvailableLocales(!root._v1x && root, locale, bundlePath, bundleName);
				require(availableLocales, function(){
					for (var i = 1; i<availableLocales.length; i++){
						current = lang.mixin(lang.clone(current), arguments[i]);
					}
					// target may not have been resolve (e.g., maybe only "fr" exists when "fr-ca" was requested)
					var target = bundlePathAndName + "/" + locale;
					cache[target] = current;
					current.$locale = availableLocales.specificity;
					load();
				});
			});
		},

		normalize = function(id, toAbsMid){
			// summary:
			//		id may be relative.
			//		preload has form `*preload*<path>/nls/<module>*<flattened locales>` and
			//		therefore never looks like a relative
			return /^\./.test(id) ? toAbsMid(id) : id;
		},

		getLocalesToLoad = function(targetLocale){
			var list = config.extraLocale || [];
			list = lang.isArray(list) ? list : [list];
			list.push(targetLocale);
			return list;
		},

		load = function(id, require, load){
			// summary:
			//		id is in one of the following formats
			//
			//		1. <path>/nls/<bundle>
			//			=> load the bundle, localized to config.locale; load all bundles localized to
			//			config.extraLocale (if any); return the loaded bundle localized to config.locale.
			//
			//		2. <path>/nls/<locale>/<bundle>
			//			=> load then return the bundle localized to <locale>
			//
			//		3. *preload*<path>/nls/<module>*<JSON array of available locales>
			//			=> for config.locale and all config.extraLocale, load all bundles found
			//			in the best-matching bundle rollup. A value of 1 is returned, which
			//			is meaningless other than to say the plugin is executing the requested
			//			preloads
			//
			//		In cases 1 and 2, <path> is always normalized to an absolute module id upon entry; see
			//		normalize. In case 3, it <path> is assumed to be absolute; this is arranged by the builder.
			//
			//		To load a bundle means to insert the bundle into the plugin's cache and publish the bundle
			//		value to the loader. Given <path>, <bundle>, and a particular <locale>, the cache key
			//
			//			<path>/nls/<bundle>/<locale>
			//
			//		will hold the value. Similarly, then plugin will publish this value to the loader by
			//
			//			define("<path>/nls/<bundle>/<locale>", <bundle-value>);
			//
			//		Given this algorithm, other machinery can provide fast load paths be preplacing
			//		values in the plugin's cache, which is public. When a load is demanded the
			//		cache is inspected before starting any loading. Explicitly placing values in the plugin
			//		cache is an advanced/experimental feature that should not be needed; use at your own risk.
			//
			//		For the normal AMD algorithm, the root bundle is loaded first, which instructs the
			//		plugin what additional localized bundles are required for a particular locale. These
			//		additional locales are loaded and a mix of the root and each progressively-specific
			//		locale is returned. For example:
			//
			//		1. The client demands "dojo/i18n!some/path/nls/someBundle
			//
			//		2. The loader demands load(some/path/nls/someBundle)
			//
			//		3. This plugin require's "some/path/nls/someBundle", which is the root bundle.
			//
			//		4. Assuming config.locale is "ab-cd-ef" and the root bundle indicates that localizations
			//		are available for "ab" and "ab-cd-ef" (note the missing "ab-cd", then the plugin
			//		requires "some/path/nls/ab/someBundle" and "some/path/nls/ab-cd-ef/someBundle"
			//
			//		5. Upon receiving all required bundles, the plugin constructs the value of the bundle
			//		ab-cd-ef as...
			//
			//				mixin(mixin(mixin({}, require("some/path/nls/someBundle"),
			//		  			require("some/path/nls/ab/someBundle")),
			//					require("some/path/nls/ab-cd-ef/someBundle"));
			//
			//		This value is inserted into the cache and published to the loader at the
			//		key/module-id some/path/nls/someBundle/ab-cd-ef.
			//
			//		The special preload signature (case 3) instructs the plugin to stop servicing all normal requests
			//		(further preload requests will be serviced) until all ongoing preloading has completed.
			//
			//		The preload signature instructs the plugin that a special rollup module is available that contains
			//		one or more flattened, localized bundles. The JSON array of available locales indicates which locales
			//		are available. Here is an example:
			//
			//			*preload*some/path/nls/someModule*["root", "ab", "ab-cd-ef"]
			//
			//		This indicates the following rollup modules are available:
			//
			//			some/path/nls/someModule_ROOT
			//			some/path/nls/someModule_ab
			//			some/path/nls/someModule_ab-cd-ef
			//
			//		Each of these modules is a normal AMD module that contains one or more flattened bundles in a hash.
			//		For example, assume someModule contained the bundles some/bundle/path/someBundle and
			//		some/bundle/path/someOtherBundle, then some/path/nls/someModule_ab would be expressed as follows:
			//
			//			define({
			//				some/bundle/path/someBundle:<value of someBundle, flattened with respect to locale ab>,
			//				some/bundle/path/someOtherBundle:<value of someOtherBundle, flattened with respect to locale ab>,
			//			});
			//
			//		E.g., given this design, preloading for locale=="ab" can execute the following algorithm:
			//
			//			require(["some/path/nls/someModule_ab"], function(rollup){
			//				for(var p in rollup){
			//					var id = p + "/ab",
			//					cache[id] = rollup[p];
			//					define(id, rollup[p]);
			//				}
			//			});
			//
			//		Similarly, if "ab-cd" is requested, the algorithm can determine that "ab" is the best available and
			//		load accordingly.
			//
			//		The builder will write such rollups for every layer if a non-empty localeList  profile property is
			//		provided. Further, the builder will include the following cache entry in the cache associated with
			//		any layer.
			//
			//			"*now":function(r){r(['dojo/i18n!*preload*<path>/nls/<module>*<JSON array of available locales>']);}
			//
			//		The *now special cache module instructs the loader to apply the provided function to context-require
			//		with respect to the particular layer being defined. This causes the plugin to hold all normal service
			//		requests until all preloading is complete.
			//
			//		Notice that this algorithm is rarely better than the standard AMD load algorithm. Consider the normal case
			//		where the target locale has a single segment and a layer depends on a single bundle:
			//
			//		Without Preloads:
			//
			//		1. Layer loads root bundle.
			//		2. bundle is demanded; plugin loads single localized bundle.
			//
			//		With Preloads:
			//
			//		1. Layer causes preloading of target bundle.
			//		2. bundle is demanded; service is delayed until preloading complete; bundle is returned.
			//
			//		In each case a single transaction is required to load the target bundle. In cases where multiple bundles
			//		are required and/or the locale has multiple segments, preloads still requires a single transaction whereas
			//		the normal path requires an additional transaction for each additional bundle/locale-segment. However all
			//		of these additional transactions can be done concurrently. Owing to this analysis, the entire preloading
			//		algorithm can be discard during a build by setting the has feature dojo-preload-i18n-Api to false.

			var match = nlsRe.exec(id),
				bundlePath = match[1] + "/",
				bundleName = match[5] || match[4],
				bundlePathAndName = bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale =	localeSpecified || dojo.locale || "",
				loadTarget = bundlePathAndName + "/" + targetLocale,
				loadList = localeSpecified ? [targetLocale] : getLocalesToLoad(targetLocale),
				remaining = loadList.length,
				finish = function(){
					if(!--remaining){
						load(lang.delegate(cache[loadTarget]));
					}
				},
				split = id.split("*"),
				preloadDemand = split[1] == "preload";

			if(has("dojo-preload-i18n-Api")){
				if(preloadDemand){
					if(!cache[id]){
						// use cache[id] to prevent multiple preloads of the same preload; this shouldn't happen, but
						// who knows what over-aggressive human optimizers may attempt
						cache[id] = 1;
						preloadL10n(split[2], json.parse(split[3]), 1, require);
					}
					// don't stall the loader!
					load(1);
				}
				if(preloadDemand || (waitForPreloads(id, require, load) && !cache[loadTarget])){
					return;
				}
			}
			else if (preloadDemand) {
				// If a build is created with nls resources and 'dojo-preload-i18n-Api' has not been set to false,
				// the built file will include a preload in the cache (which looks about like so:)
				// '*now':function(r){r(['dojo/i18n!*preload*dojo/nls/dojo*["ar","ca","cs","da","de","el","en-gb","en-us","es-es","fi-fi","fr-fr","he-il","hu","it-it","ja-jp","ko-kr","nl-nl","nb","pl","pt-br","pt-pt","ru","sk","sl","sv","th","tr","zh-tw","zh-cn","ROOT"]']);}
				// If the consumer of the build sets 'dojo-preload-i18n-Api' to false in the Dojo config, the cached
				// preload will not be parsed and will result in an attempt to call 'require' passing it the unparsed
				// preload, which is not a valid module id.
				// In this case we should skip this request.
				load(1);

				return;
			}

			array.forEach(loadList, function(locale){
				var target = bundlePathAndName + "/" + locale;
				if(has("dojo-preload-i18n-Api")){
					checkForLegacyModules(target);
				}
				if(!cache[target]){
					doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, finish);
				}else{
					finish();
				}
			});
		};

	if(has("dojo-preload-i18n-Api") || has("dojo-v1x-i18n-Api")){
		var normalizeLocale = thisModule.normalizeLocale = function(locale){
				var result = locale ? locale.toLowerCase() : dojo.locale;
				return result == "root" ? "ROOT" : result;
			},

			isXd = function(mid, contextRequire){
				return (has("dojo-sync-loader") && has("dojo-v1x-i18n-Api")) ?
					contextRequire.isXdUrl(require.toUrl(mid + ".js")) :
					true;
			},

			preloading = 0,

			preloadWaitQueue = [],

			preloadL10n = thisModule._preloadLocalizations = function(/*String*/bundlePrefix, /*Array*/localesGenerated, /*boolean?*/ guaranteedAmdFormat, /*function?*/ contextRequire){
				// summary:
				//		Load available flattened resource bundles associated with a particular module for dojo/locale and all dojo/config.extraLocale (if any)
				// description:
				//		Only called by built layer files. The entire locale hierarchy is loaded. For example,
				//		if locale=="ab-cd", then ROOT, "ab", and "ab-cd" are loaded. This is different than v1.6-
				//		in that the v1.6- would only load ab-cd...which was *always* flattened.
				//
				//		If guaranteedAmdFormat is true, then the module can be loaded with require thereby circumventing the detection algorithm
				//		and the extra possible extra transaction.

				// If this function is called from legacy code, then guaranteedAmdFormat and contextRequire will be undefined. Since the function
				// needs a require in order to resolve module ids, fall back to the context-require associated with this dojo/i18n module, which
				// itself may have been mapped.
				contextRequire = contextRequire || require;

				function doRequire(mid, callback){
					if(isXd(mid, contextRequire) || guaranteedAmdFormat){
						contextRequire([mid], callback);
					}else{
						syncRequire([mid], callback, contextRequire);
					}
				}

				function forEachLocale(locale, func){
					// given locale= "ab-cd-ef", calls func on "ab-cd-ef", "ab-cd", "ab", "ROOT"; stops calling the first time func returns truthy
					var parts = locale.split("-");
					while(parts.length){
						if(func(parts.join("-"))){
							return;
						}
						parts.pop();
					}
					func("ROOT");
				}

					function preloadingAddLock(){
						preloading++;
					}

					function preloadingRelLock(){
						--preloading;
						while(!preloading && preloadWaitQueue.length){
							load.apply(null, preloadWaitQueue.shift());
						}
					}

					function cacheId(path, name, loc, require){
						// path is assumed to have a trailing "/"
						return require.toAbsMid(path + name + "/" + loc)
					}

					function preload(locale){
						locale = normalizeLocale(locale);
						forEachLocale(locale, function(loc){
							if(array.indexOf(localesGenerated, loc) >= 0){
								var mid = bundlePrefix.replace(/\./g, "/") + "_" + loc;
								preloadingAddLock();
								doRequire(mid, function(rollup){
									for(var p in rollup){
										var bundle = rollup[p],
											match = p.match(/(.+)\/([^\/]+)$/),
											bundleName, bundlePath;
											
											// If there is no match, the bundle is not a regular bundle from an AMD layer.
											if (!match){continue;}

											bundleName = match[2];
											bundlePath = match[1] + "/";

										// backcompat
										if(!bundle._localized){continue;}

										var localized;
										if(loc === "ROOT"){
											var root = localized = bundle._localized;
											delete bundle._localized;
											root.root = bundle;
											cache[require.toAbsMid(p)] = root;
										}else{
											localized = bundle._localized;
											cache[cacheId(bundlePath, bundleName, loc, require)] = bundle;
										}

										if(loc !== locale){
											// capture some locale variables
											function improveBundle(bundlePath, bundleName, bundle, localized){
												// locale was not flattened and we've fallen back to a less-specific locale that was flattened
												// for example, we had a flattened 'fr', a 'fr-ca' is available for at least this bundle, and
												// locale==='fr-ca'; therefore, we must improve the bundle as retrieved from the rollup by
												// manually loading the fr-ca version of the bundle and mixing this into the already-retrieved 'fr'
												// version of the bundle.
												//
												// Remember, different bundles may have different sets of locales available.
												//
												// we are really falling back on the regular algorithm here, but--hopefully--starting with most
												// of the required bundles already on board as given by the rollup and we need to "manually" load
												// only one locale from a few bundles...or even better...we won't find anything better to load.
												// This algorithm ensures there is nothing better to load even when we can only load a less-specific rollup.
												//
												// note: this feature is only available in async mode

												// inspect the loaded bundle that came from the rollup to see if something better is available
												// for any bundle in a rollup, more-specific available locales are given at localized.
												var requiredBundles = [],
													cacheIds = [];
												forEachLocale(locale, function(loc){
													if(localized[loc]){
														requiredBundles.push(require.toAbsMid(bundlePath + loc + "/" + bundleName));
														cacheIds.push(cacheId(bundlePath, bundleName, loc, require));
													}
												});

												if(requiredBundles.length){
													preloadingAddLock();
													contextRequire(requiredBundles, function(){
														// requiredBundles was constructed by forEachLocale so it contains locales from 
														// less specific to most specific. 
														// the loop starts with the most specific locale, the last one.
														for(var i = requiredBundles.length - 1; i >= 0 ; i--){
															bundle = lang.mixin(lang.clone(bundle), arguments[i]);
															cache[cacheIds[i]] = bundle;
														}
														// this is the best possible (maybe a perfect match, maybe not), accept it
														cache[cacheId(bundlePath, bundleName, locale, require)] = lang.clone(bundle);
														preloadingRelLock();
													});
												}else{
													// this is the best possible (definitely not a perfect match), accept it
													cache[cacheId(bundlePath, bundleName, locale, require)] = bundle;
												}
											}
											improveBundle(bundlePath, bundleName, bundle, localized);
										}
									}
									preloadingRelLock();
								});
								return true;
							}
							return false;
						});
					}

				preload();
				array.forEach(dojo.config.extraLocale, preload);
			},

			waitForPreloads = function(id, require, load){
				if(preloading){
					preloadWaitQueue.push([id, require, load]);
				}
				return preloading;
			},

			checkForLegacyModules = function()
				{};
	}

	if(has("dojo-v1x-i18n-Api")){
		// this code path assumes the dojo loader and won't work with a standard AMD loader
		var amdValue = {},
			evalBundle,

			syncRequire = function(deps, callback, require){
				var results = [];
				array.forEach(deps, function(mid){
					var url = require.toUrl(mid + ".js");

					function load(text){
						if (!evalBundle) {
							// use the function ctor to keep the minifiers away (also come close to global scope, but this is secondary)
							evalBundle = new Function(
								"__bundle",				   // the bundle to evalutate
								"__checkForLegacyModules", // a function that checks if __bundle defined __mid in the global space
								"__mid",				   // the mid that __bundle is intended to define
								"__amdValue",

								// returns one of:
								//		1 => the bundle was an AMD bundle
								//		a legacy bundle object that is the value of __mid
								//		instance of Error => could not figure out how to evaluate bundle

								// used to detect when __bundle calls define
								"var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"
								+ "	   require = function(){define.called = 1;};"

								+ "try{"
								+		"define.called = 0;"
								+		"eval(__bundle);"
								+		"if(define.called==1)"
											// bundle called define; therefore signal it's an AMD bundle
								+			"return __amdValue;"

								+		"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"
											// bundle was probably a v1.6- built NLS flattened NLS bundle that defined __mid in the global space
								+			"return __checkForLegacyModules;"

								+ "}catch(e){}"
								// evaulating the bundle was *neither* an AMD *nor* a legacy flattened bundle
								// either way, re-eval *after* surrounding with parentheses

								+ "try{"
								+		"return eval('('+__bundle+')');"
								+ "}catch(e){"
								+		"return e;"
								+ "}"
							);
						}
						var result = evalBundle(text, checkForLegacyModules, mid, amdValue);
						if(result===amdValue){
							// the bundle was an AMD module; re-inject it through the normal AMD path
							// we gotta do this since it could be an anonymous module and simply evaluating
							// the text here won't provide the loader with the context to know what
							// module is being defined()'d. With browser caching, this should be free; further
							// this entire code path can be circumvented by using the AMD format to begin with
							results.push(cache[url] = amdValue.result);
						}else{
							if(result instanceof Error){
								console.error("failed to evaluate i18n bundle; url=" + url, result);
								result = {};
							}
							// nls/<locale>/<bundle-name> indicates not the root.
							results.push(cache[url] = (/nls\/[^\/]+\/[^\/]+$/.test(url) ? result : {root:result, _v1x:1}));
						}
					}

					if(cache[url]){
						results.push(cache[url]);
					}else{
						var bundle = require.syncLoadNls(mid);
						// need to check for legacy module here because there might be a legacy module for a
						// less specific locale (which was not looked up during the first checkForLegacyModules
						// call in load()).
						// Also need to reverse the locale and the module name in the mid because syncRequire
						// deps parameters uses the AMD style package/nls/locale/module while legacy code uses
						// package/nls/module/locale.
						if(!bundle){
							bundle = checkForLegacyModules(mid.replace(/nls\/([^\/]*)\/([^\/]*)$/, "nls/$2/$1"));
						}
						if(bundle){
							results.push(bundle);
						}else{
							if(!xhr){
								try{
									require.getText(url, true, load);
								}catch(e){
									results.push(cache[url] = {});
								}
							}else{
								xhr.get({
									url:url,
									sync:true,
									load:load,
									error:function(){
										results.push(cache[url] = {});
									}
								});
							}
						}
					}
				});
				callback && callback.apply(null, results);
			};

		checkForLegacyModules = function(target){
			// legacy code may have already loaded [e.g] the raw bundle x/y/z at x.y.z; when true, push into the cache
			for(var result, names = target.split("/"), object = dojo.global[names[0]], i = 1; object && i<names.length-1; object = object[names[i++]]){}
			if(object){
				result = object[names[i]];
				if(!result){
					// fallback for incorrect bundle build of 1.6
					result = object[names[i].replace(/-/g,"_")];
				}
				if(result){
					cache[target] = result;
				}
			}
			return result;
		};

		thisModule.getLocalization = function(moduleName, bundleName, locale){
			var result,
				l10nName = getBundleName(moduleName, bundleName, locale);
			load(
				l10nName,

				// isXd() and syncRequire() need a context-require in order to resolve the mid with respect to a reference module.
				// Since this legacy function does not have the concept of a reference module, resolve with respect to this
				// dojo/i18n module, which, itself may have been mapped.
				(!isXd(l10nName, require) ? function(deps, callback){ syncRequire(deps, callback, require); } : require),

				function(result_){ result = result_; }
			);
			return result;
		};
	}

	return lang.mixin(thisModule, {
		dynamic:true,
		normalize:normalize,
		load:load,
		cache:cache,
		getL10nName: getL10nName
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/io-query.js":
/*!***************************************!*\
  !*** ./node_modules/dojo/io-query.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang){

	// module:
	//		dojo/io-query

	var backstop = {};

	return {
		// summary:
		//		This module defines query string processing functions.

		objectToQuery: function objectToQuery(/*Object*/ map){
			// summary:
			//		takes a name/value mapping object and returns a string representing
			//		a URL-encoded version of that object.
			// example:
			//		this object:
			//
			//	|	{
			//	|		blah: "blah",
			//	|		multi: [
			//	|			"thud",
			//	|			"thonk"
			//	|		]
			//	|	};
			//
			//		yields the following query string:
			//
			//	|	"blah=blah&multi=thud&multi=thonk"

			// FIXME: need to implement encodeAscii!!
			var enc = encodeURIComponent, pairs = [];
			for(var name in map){
				var value = map[name];
				if(value != backstop[name]){
					var assign = enc(name) + "=";
					if(lang.isArray(value)){
						for(var i = 0, l = value.length; i < l; ++i){
							pairs.push(assign + enc(value[i]));
						}
					}else{
						pairs.push(assign + enc(value));
					}
				}
			}
			return pairs.join("&"); // String
		},

		queryToObject: function queryToObject(/*String*/ str){
			// summary:
			//		Create an object representing a de-serialized query section of a
			//		URL. Query keys with multiple values are returned in an array.
			//
			// example:
			//		This string:
			//
			//	|		"foo=bar&foo=baz&thinger=%20spaces%20=blah&zonk=blarg&"
			//
			//		results in this object structure:
			//
			//	|		{
			//	|			foo: [ "bar", "baz" ],
			//	|			thinger: " spaces =blah",
			//	|			zonk: "blarg"
			//	|		}
			//
			//		Note that spaces and other urlencoded entities are correctly
			//		handled.

        	var dec = decodeURIComponent, qp = str.split("&"), ret = {}, name, val;
			for(var i = 0, l = qp.length, item; i < l; ++i){
				item = qp[i];
				if(item.length){
					var s = item.indexOf("=");
					if(s < 0){
						name = dec(item);
						val = "";
					}else{
						name = dec(item.slice(0, s));
						val = dec(item.slice(s + 1));
					}
					if(typeof ret[name] == "string"){ // inline'd type check
						ret[name] = [ret[name]];
					}

					if(lang.isArray(ret[name])){
						ret[name].push(val);
					}else{
						ret[name] = val;
					}
				}
			}
			return ret; // Object
		}
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/dojo/json.js":
/*!***********************************!*\
  !*** ./node_modules/dojo/json.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./has */ "./node_modules/dojo/has.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(has){
	"use strict";
	var hasJSON = typeof JSON != "undefined";
	has.add("json-parse", hasJSON); // all the parsers work fine
		// Firefox 3.5/Gecko 1.9 fails to use replacer in stringify properly https://bugzilla.mozilla.org/show_bug.cgi?id=509184
	has.add("json-stringify", hasJSON && JSON.stringify({a:0}, function(k,v){return v||1;}) == '{"a":1}');

	/*=====
	return {
		// summary:
		//		Functions to parse and serialize JSON

		parse: function(str, strict){
			// summary:
			//		Parses a [JSON](http://json.org) string to return a JavaScript object.
			// description:
			//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
			//		Throws for invalid JSON strings. This delegates to eval() if native JSON
			//		support is not available. By default this will evaluate any valid JS expression.
			//		With the strict parameter set to true, the parser will ensure that only
			//		valid JSON strings are parsed (otherwise throwing an error). Without the strict
			//		parameter, the content passed to this method must come
			//		from a trusted source.
			// str:
			//		a string literal of a JSON item, for instance:
			//		`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`
			// strict:
			//		When set to true, this will ensure that only valid, secure JSON is ever parsed.
			//		Make sure this is set to true for untrusted content. Note that on browsers/engines
			//		without native JSON support, setting this to true will run slower.
		},
		stringify: function(value, replacer, spacer){
			// summary:
			//		Returns a [JSON](http://json.org) serialization of an object.
			// description:
			//		Returns a [JSON](http://json.org) serialization of an object.
			//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
			//		Note that this doesn't check for infinite recursion, so don't do that!
			// value:
			//		A value to be serialized.
			// replacer:
			//		A replacer function that is called for each value and can return a replacement
			// spacer:
			//		A spacer string to be used for pretty printing of JSON
			// example:
			//		simple serialization of a trivial object
			//	|	define(["dojo/json"], function(JSON){
			// 	|		var jsonStr = JSON.stringify({ howdy: "stranger!", isStrange: true });
			//	|		doh.is('{"howdy":"stranger!","isStrange":true}', jsonStr);
		}
	};
	=====*/

	if(has("json-stringify")){
		return JSON;
	}else{
		var escapeString = function(/*String*/str){
			// summary:
			//		Adds escape sequences for non-visual characters, double quote and
			//		backslash and surrounds with double quotes to form a valid string
			//		literal.
			return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
				replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
				replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"); // string
		};
		return {
			parse: has("json-parse") ? JSON.parse : function(str, strict){
				if(strict && !/^([\s\[\{]*(?:"(?:\\.|[^"])*"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(str)){
					throw new SyntaxError("Invalid characters in JSON");
				}
				return eval('(' + str + ')');
			},
			stringify: function(value, replacer, spacer){
				var undef;
				if(typeof replacer == "string"){
					spacer = replacer;
					replacer = null;
				}
				function stringify(it, indent, key){
					if(replacer){
						it = replacer(key, it);
					}
					var val, objtype = typeof it;
					if(objtype == "number"){
						return isFinite(it) ? it + "" : "null";
					}
					if(objtype == "boolean"){
						return it + "";
					}
					if(it === null){
						return "null";
					}
					if(typeof it == "string"){
						return escapeString(it);
					}
					if(objtype == "function" || objtype == "undefined"){
						return undef; // undefined
					}
					// short-circuit for objects that support "json" serialization
					// if they return "self" then just pass-through...
					if(typeof it.toJSON == "function"){
						return stringify(it.toJSON(key), indent, key);
					}
					if(it instanceof Date){
						return '"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z"'.replace(/\{(\w+)(\+)?\}/g, function(t, prop, plus){
							var num = it["getUTC" + prop]() + (plus ? 1 : 0);
							return num < 10 ? "0" + num : num;
						});
					}
					if(it.valueOf() !== it){
						// primitive wrapper, try again unwrapped:
						return stringify(it.valueOf(), indent, key);
					}
					var nextIndent= spacer ? (indent + spacer) : "";
					/* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */ 
				
					var sep = spacer ? " " : "";
					var newLine = spacer ? "\n" : "";
				
					// array
					if(it instanceof Array){
						var itl = it.length, res = [];
						for(key = 0; key < itl; key++){
							var obj = it[key];
							val = stringify(obj, nextIndent, key);
							if(typeof val != "string"){
								val = "null";
							}
							res.push(newLine + nextIndent + val);
						}
						return "[" + res.join(",") + newLine + indent + "]";
					}
					// generic object code path
					var output = [];
					for(key in it){
						var keyStr;
						if(it.hasOwnProperty(key)){
							if(typeof key == "number"){
								keyStr = '"' + key + '"';
							}else if(typeof key == "string"){
								keyStr = escapeString(key);
							}else{
								// skip non-string or number keys
								continue;
							}
							val = stringify(it[key], nextIndent, key);
							if(typeof val != "string"){
								// skip non-serializable values
								continue;
							}
							// At this point, the most non-IE browsers don't get in this branch 
							// (they have native JSON), so push is definitely the way to
							output.push(newLine + nextIndent + keyStr + ":" + sep + val);
						}
					}
					return "{" + output.join(",") + newLine + indent + "}"; // String
				}
				return stringify(value, "", "");
			}
		};
	}
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/on.js":
/*!*********************************!*\
  !*** ./node_modules/dojo/on.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__.dj.h("dom-addeventlistener?:./node_modules/dojo/aspect.js"), __webpack_require__(/*! ./_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ./sniff */ "./node_modules/dojo/sniff.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(aspect, dojo, has){

	"use strict";
	if(has("dom")){ // check to make sure we are in a browser, this module should work anywhere
		var major = window.ScriptEngineMajorVersion;
		has.add("jscript", major && (major() + ScriptEngineMinorVersion() / 10));
		has.add("event-orientationchange", has("touch") && !has("android")); // TODO: how do we detect this?
		has.add("event-stopimmediatepropagation", window.Event && !!window.Event.prototype && !!window.Event.prototype.stopImmediatePropagation);
		has.add("event-focusin", function(global, doc, element){
			return 'onfocusin' in element;
		});

		if(has("touch")){
			has.add("touch-can-modify-event-delegate", function(){
				// This feature test checks whether deleting a property of an event delegate works
				// for a touch-enabled device. If it works, event delegation can be used as fallback
				// for browsers such as Safari in older iOS where deleting properties of the original
				// event does not work.
				var EventDelegate = function(){};
				EventDelegate.prototype =
					document.createEvent("MouseEvents"); // original event
				// Attempt to modify a property of an event delegate and check if
				// it succeeds. Depending on browsers and on whether dojo/on's
				// strict mode is stripped in a Dojo build, there are 3 known behaviors:
				// it may either succeed, or raise an error, or fail to set the property
				// without raising an error.
				try{
					var eventDelegate = new EventDelegate;
					eventDelegate.target = null;
					return eventDelegate.target === null;
				}catch(e){
					return false; // cannot use event delegation
				}
			});
		}
	}
	var on = function(target, type, listener, dontFix){
		// summary:
		//		A function that provides core event listening functionality. With this function
		//		you can provide a target, event type, and listener to be notified of
		//		future matching events that are fired.
		// target: Element|Object
		//		This is the target object or DOM element that to receive events from
		// type: String|Function
		//		This is the name of the event to listen for or an extension event type.
		// listener: Function
		//		This is the function that should be called when the event fires.
		// returns: Object
		//		An object with a remove() method that can be used to stop listening for this
		//		event.
		// description:
		//		To listen for "click" events on a button node, we can do:
		//		|	define(["dojo/on"], function(on){
		//		|		on(button, "click", clickHandler);
		//		|		...
		//		Evented JavaScript objects can also have their own events.
		//		|	var obj = new Evented;
		//		|	on(obj, "foo", fooHandler);
		//		And then we could publish a "foo" event:
		//		|	on.emit(obj, "foo", {key: "value"});
		//		We can use extension events as well. For example, you could listen for a tap gesture:
		//		|	define(["dojo/on", "dojo/gesture/tap", function(on, tap){
		//		|		on(button, tap, tapHandler);
		//		|		...
		//		which would trigger fooHandler. Note that for a simple object this is equivalent to calling:
		//		|	obj.onfoo({key:"value"});
		//		If you use on.emit on a DOM node, it will use native event dispatching when possible.

		if(typeof target.on == "function" && typeof type != "function" && !target.nodeType){
			// delegate to the target's on() method, so it can handle it's own listening if it wants (unless it
			// is DOM node and we may be dealing with jQuery or Prototype's incompatible addition to the
			// Element prototype
			return target.on(type, listener);
		}
		// delegate to main listener code
		return on.parse(target, type, listener, addListener, dontFix, this);
	};
	on.pausable =  function(target, type, listener, dontFix){
		// summary:
		//		This function acts the same as on(), but with pausable functionality. The
		//		returned signal object has pause() and resume() functions. Calling the
		//		pause() method will cause the listener to not be called for future events. Calling the
		//		resume() method will cause the listener to again be called for future events.
		var paused;
		var signal = on(target, type, function(){
			if(!paused){
				return listener.apply(this, arguments);
			}
		}, dontFix);
		signal.pause = function(){
			paused = true;
		};
		signal.resume = function(){
			paused = false;
		};
		return signal;
	};
	on.once = function(target, type, listener, dontFix){
		// summary:
		//		This function acts the same as on(), but will only call the listener once. The
		//		listener will be called for the first
		//		event that takes place and then listener will automatically be removed.
		var signal = on(target, type, function(){
			// remove this listener
			signal.remove();
			// proceed to call the listener
			return listener.apply(this, arguments);
		});
		return signal;
	};
	on.parse = function(target, type, listener, addListener, dontFix, matchesTarget){
		var events;
		if(type.call){
			// event handler function
			// on(node, touch.press, touchListener);
			return type.call(matchesTarget, target, listener);
		}

		if(type instanceof Array){
			// allow an array of event names (or event handler functions)
			events = type;
		}else if(type.indexOf(",") > -1){
			// we allow comma delimited event names, so you can register for multiple events at once
			events = type.split(/\s*,\s*/);
		}
		if(events){
			var handles = [];
			var i = 0;
			var eventName;
			while(eventName = events[i++]){ // intentional assignment
				handles.push(on.parse(target, eventName, listener, addListener, dontFix, matchesTarget));
			}
			handles.remove = function(){
				for(var i = 0; i < handles.length; i++){
					handles[i].remove();
				}
			};
			return handles;
		}
		return addListener(target, type, listener, dontFix, matchesTarget);
	};
	var touchEvents = /^touch/;
	function addListener(target, type, listener, dontFix, matchesTarget){
		// event delegation:
		var selector = type.match(/(.*):(.*)/);
		// if we have a selector:event, the last one is interpreted as an event, and we use event delegation
		if(selector){
			type = selector[2];
			selector = selector[1];
			// create the extension event for selectors and directly call it
			return on.selector(selector, type).call(matchesTarget, target, listener);
		}
		// test to see if it a touch event right now, so we don't have to do it every time it fires
		if(has("touch")){
			if(touchEvents.test(type)){
				// touch event, fix it
				listener = fixTouchListener(listener);
			}
			if(!has("event-orientationchange") && (type == "orientationchange")){
				//"orientationchange" not supported <= Android 2.1,
				//but works through "resize" on window
				type = "resize";
				target = window;
				listener = fixTouchListener(listener);
			}
		}
		if(addStopImmediate){
			// add stopImmediatePropagation if it doesn't exist
			listener = addStopImmediate(listener);
		}
		// normal path, the target is |this|
		if(target.addEventListener){
			// the target has addEventListener, which should be used if available (might or might not be a node, non-nodes can implement this method as well)
			// check for capture conversions
			var capture = type in captures,
				adjustedType = capture ? captures[type] : type;
			target.addEventListener(adjustedType, listener, capture);
			// create and return the signal
			return {
				remove: function(){
					target.removeEventListener(adjustedType, listener, capture);
				}
			};
		}
		type = "on" + type;
		if(fixAttach && target.attachEvent){
			return fixAttach(target, type, listener);
		}
		throw new Error("Target must be an event emitter");
	}
	on.matches = function(node, selector, context, children, matchesTarget) {
		// summary:
		//		Check if a node match the current selector within the constraint of a context
		// node: DOMNode
		//		The node that originate the event
		// selector: String
		//		The selector to check against
		// context: DOMNode
		//		The context to search in.
		// children: Boolean
		//		Indicates if children elements of the selector should be allowed. This defaults to
		//		true
		// matchesTarget: Object|dojo/query?
		//		An object with a property "matches" as a function. Default is dojo/query.
		//		Matching DOMNodes will be done against this function
		//		The function must return a Boolean.
		//		It will have 3 arguments: "node", "selector" and "context"
		//		True is expected if "node" is matching the current "selector" in the passed "context"
		// returns: DOMNode?
		//		The matching node, if any. Else you get false

		// see if we have a valid matchesTarget or default to dojo/query
		matchesTarget = matchesTarget && (typeof matchesTarget.matches == "function") ? matchesTarget : dojo.query;
		children = children !== false;
		// there is a selector, so make sure it matches
		if(node.nodeType != 1){
			// text node will fail in native match selector
			node = node.parentNode;
		}
		while(!matchesTarget.matches(node, selector, context)){
			if(node == context || children === false || !(node = node.parentNode) || node.nodeType != 1){ // intentional assignment
				return false;
			}
		}
		return node;
	};
	on.selector = function(selector, eventType, children){
		// summary:
		//		Creates a new extension event with event delegation. This is based on
		//		the provided event type (can be extension event) that
		//		only calls the listener when the CSS selector matches the target of the event.
		//
		//		The application must require() an appropriate level of dojo/query to handle the selector.
		// selector:
		//		The CSS selector to use for filter events and determine the |this| of the event listener.
		// eventType:
		//		The event to listen for
		// children:
		//		Indicates if children elements of the selector should be allowed. This defaults to
		//		true
		// example:
		// |	require(["dojo/on", "dojo/mouse", "dojo/query!css2"], function(on, mouse){
		// |		on(node, on.selector(".my-class", mouse.enter), handlerForMyHover);
		return function(target, listener){
			// if the selector is function, use it to select the node, otherwise use the matches method
			var matchesTarget = typeof selector == "function" ? {matches: selector} : this,
				bubble = eventType.bubble;
			function select(eventTarget){
				return on.matches(eventTarget, selector, target, children, matchesTarget);
			}
			if(bubble){
				// the event type doesn't naturally bubble, but has a bubbling form, use that, and give it the selector so it can perform the select itself
				return on(target, bubble(select), listener);
			}
			// standard event delegation
			return on(target, eventType, function(event){
				// call select to see if we match
				var eventTarget = select(event.target);
				// if it matches we call the listener
				if (eventTarget) {
					// We save the matching target into the event, so it can be accessed even when hitching (see #18355)
					event.selectorTarget = eventTarget;
					return listener.call(eventTarget, event);
				}
			});
		};
	};

	function syntheticPreventDefault(){
		this.cancelable = false;
		this.defaultPrevented = true;
	}
	function syntheticStopPropagation(){
		this.bubbles = false;
	}
	var slice = [].slice,
		syntheticDispatch = on.emit = function(target, type, event){
		// summary:
		//		Fires an event on the target object.
		// target:
		//		The target object to fire the event on. This can be a DOM element or a plain
		//		JS object. If the target is a DOM element, native event emitting mechanisms
		//		are used when possible.
		// type:
		//		The event type name. You can emulate standard native events like "click" and
		//		"mouseover" or create custom events like "open" or "finish".
		// event:
		//		An object that provides the properties for the event. See https://developer.mozilla.org/en/DOM/event.initEvent
		//		for some of the properties. These properties are copied to the event object.
		//		Of particular importance are the cancelable and bubbles properties. The
		//		cancelable property indicates whether or not the event has a default action
		//		that can be cancelled. The event is cancelled by calling preventDefault() on
		//		the event object. The bubbles property indicates whether or not the
		//		event will bubble up the DOM tree. If bubbles is true, the event will be called
		//		on the target and then each parent successively until the top of the tree
		//		is reached or stopPropagation() is called. Both bubbles and cancelable
		//		default to false.
		// returns:
		//		If the event is cancelable and the event is not cancelled,
		//		emit will return true. If the event is cancelable and the event is cancelled,
		//		emit will return false.
		// details:
		//		Note that this is designed to emit events for listeners registered through
		//		dojo/on. It should actually work with any event listener except those
		//		added through IE's attachEvent (IE8 and below's non-W3C event emitting
		//		doesn't support custom event types). It should work with all events registered
		//		through dojo/on. Also note that the emit method does do any default
		//		action, it only returns a value to indicate if the default action should take
		//		place. For example, emitting a keypress event would not cause a character
		//		to appear in a textbox.
		// example:
		//		To fire our own click event
		//	|	require(["dojo/on", "dojo/dom"
		//	|	], function(on, dom){
		//	|		on.emit(dom.byId("button"), "click", {
		//	|			cancelable: true,
		//	|			bubbles: true,
		//	|			screenX: 33,
		//	|			screenY: 44
		//	|		});
		//		We can also fire our own custom events:
		//	|		on.emit(dom.byId("slider"), "slide", {
		//	|			cancelable: true,
		//	|			bubbles: true,
		//	|			direction: "left-to-right"
		//	|		});
		//	|	});
		var args = slice.call(arguments, 2);
		var method = "on" + type;
		if("parentNode" in target){
			// node (or node-like), create event controller methods
			var newEvent = args[0] = {};
			for(var i in event){
				newEvent[i] = event[i];
			}
			newEvent.preventDefault = syntheticPreventDefault;
			newEvent.stopPropagation = syntheticStopPropagation;
			newEvent.target = target;
			newEvent.type = type;
			event = newEvent;
		}
		do{
			// call any node which has a handler (note that ideally we would try/catch to simulate normal event propagation but that causes too much pain for debugging)
			target[method] && target[method].apply(target, args);
			// and then continue up the parent node chain if it is still bubbling (if started as bubbles and stopPropagation hasn't been called)
		}while(event && event.bubbles && (target = target.parentNode));
		return event && event.cancelable && event; // if it is still true (was cancelable and was cancelled), return the event to indicate default action should happen
	};
	var captures = has("event-focusin") ? {} : {focusin: "focus", focusout: "blur"};
	if(!has("event-stopimmediatepropagation")){
		var stopImmediatePropagation =function(){
			this.immediatelyStopped = true;
			this.modified = true; // mark it as modified so the event will be cached in IE
		};
		var addStopImmediate = function(listener){
			return function(event){
				if(!event.immediatelyStopped){// check to make sure it hasn't been stopped immediately
					event.stopImmediatePropagation = stopImmediatePropagation;
					return listener.apply(this, arguments);
				}
			};
		};
	}
	if(has("dom-addeventlistener")){
		// emitter that works with native event handling
		on.emit = function(target, type, event){
			if(target.dispatchEvent && document.createEvent){
				// use the native event emitting mechanism if it is available on the target object
				// create a generic event
				// we could create branch into the different types of event constructors, but
				// that would be a lot of extra code, with little benefit that I can see, seems
				// best to use the generic constructor and copy properties over, making it
				// easy to have events look like the ones created with specific initializers
				var ownerDocument = target.ownerDocument || document;
				var nativeEvent = ownerDocument.createEvent("HTMLEvents");
				nativeEvent.initEvent(type, !!event.bubbles, !!event.cancelable);
				// and copy all our properties over
				for(var i in event){
					if(!(i in nativeEvent)){
						nativeEvent[i] = event[i];
					}
				}
				return target.dispatchEvent(nativeEvent) && nativeEvent;
			}
			return syntheticDispatch.apply(on, arguments); // emit for a non-node
		};
	}else{
		// no addEventListener, basically old IE event normalization
		on._fixEvent = function(evt, sender){
			// summary:
			//		normalizes properties on the event object including event
			//		bubbling methods, keystroke normalization, and x/y positions
			// evt:
			//		native event object
			// sender:
			//		node to treat as "currentTarget"
			if(!evt){
				var w = sender && (sender.ownerDocument || sender.document || sender).parentWindow || window;
				evt = w.event;
			}
			if(!evt){return evt;}
			try{
				if(lastEvent && evt.type == lastEvent.type  && evt.srcElement == lastEvent.target){
					// should be same event, reuse event object (so it can be augmented);
					// accessing evt.srcElement rather than evt.target since evt.target not set on IE until fixup below
					evt = lastEvent;
				}
			}catch(e){
				// will occur on IE on lastEvent.type reference if lastEvent points to a previous event that already
				// finished bubbling, but the setTimeout() to clear lastEvent hasn't fired yet
			}
			if(!evt.target){ // check to see if it has been fixed yet
				evt.target = evt.srcElement;
				evt.currentTarget = (sender || evt.srcElement);
				if(evt.type == "mouseover"){
					evt.relatedTarget = evt.fromElement;
				}
				if(evt.type == "mouseout"){
					evt.relatedTarget = evt.toElement;
				}
				if(!evt.stopPropagation){
					evt.stopPropagation = stopPropagation;
					evt.preventDefault = preventDefault;
				}
				switch(evt.type){
					case "keypress":
						var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
						if (c==10){
							// CTRL-ENTER is CTRL-ASCII(10) on IE, but CTRL-ENTER on Mozilla
							c=0;
							evt.keyCode = 13;
						}else if(c==13||c==27){
							c=0; // Mozilla considers ENTER and ESC non-printable
						}else if(c==3){
							c=99; // Mozilla maps CTRL-BREAK to CTRL-c
						}
						// Mozilla sets keyCode to 0 when there is a charCode
						// but that stops the event on IE.
						evt.charCode = c;
						_setKeyChar(evt);
						break;
				}
			}
			return evt;
		};
		var lastEvent, IESignal = function(handle){
			this.handle = handle;
		};
		IESignal.prototype.remove = function(){
			delete _dojoIEListeners_[this.handle];
		};
		var fixListener = function(listener){
			// this is a minimal function for closing on the previous listener with as few as variables as possible
			return function(evt){
				evt = on._fixEvent(evt, this);
				var result = listener.call(this, evt);
				if(evt.modified){
					// cache the last event and reuse it if we can
					if(!lastEvent){
						setTimeout(function(){
							lastEvent = null;
						});
					}
					lastEvent = evt;
				}
				return result;
			};
		};
		var fixAttach = function(target, type, listener){
			listener = fixListener(listener);
			if(((target.ownerDocument ? target.ownerDocument.parentWindow : target.parentWindow || target.window || window) != top ||
						has("jscript") < 5.8) &&
					!has("config-_allow_leaks")){
				// IE will leak memory on certain handlers in frames (IE8 and earlier) and in unattached DOM nodes for JScript 5.7 and below.
				// Here we use global redirection to solve the memory leaks
				if(typeof _dojoIEListeners_ == "undefined"){
					_dojoIEListeners_ = [];
				}
				var emitter = target[type];
				if(!emitter || !emitter.listeners){
					var oldListener = emitter;
					emitter = Function('event', 'var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}');
					emitter.listeners = [];
					target[type] = emitter;
					emitter.global = this;
					if(oldListener){
						emitter.listeners.push(_dojoIEListeners_.push(oldListener) - 1);
					}
				}
				var handle;
				emitter.listeners.push(handle = (emitter.global._dojoIEListeners_.push(listener) - 1));
				return new IESignal(handle);
			}
			return aspect.after(target, type, listener, true);
		};

		var _setKeyChar = function(evt){
			evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : '';
			evt.charOrCode = evt.keyChar || evt.keyCode;	// TODO: remove for 2.0
		};
		// Called in Event scope
		var stopPropagation = function(){
			this.cancelBubble = true;
		};
		var preventDefault = on._preventDefault = function(){
			// Setting keyCode to 0 is the only way to prevent certain keypresses (namely
			// ctrl-combinations that correspond to menu accelerator keys).
			// Otoh, it prevents upstream listeners from getting this information
			// Try to split the difference here by clobbering keyCode only for ctrl
			// combinations. If you still need to access the key upstream, bubbledKeyCode is
			// provided as a workaround.
			this.bubbledKeyCode = this.keyCode;
			if(this.ctrlKey){
				try{
					// squelch errors when keyCode is read-only
					// (e.g. if keyCode is ctrl or shift)
					this.keyCode = 0;
				}catch(e){
				}
			}
			this.defaultPrevented = true;
			this.returnValue = false;
			this.modified = true; // mark it as modified  (for defaultPrevented flag) so the event will be cached in IE
		};
	}
	if(has("touch")){
		var EventDelegate = function(){};
		var windowOrientation = window.orientation;
		var fixTouchListener = function(listener){
			return function(originalEvent){
				//Event normalization(for ontouchxxx and resize):
				//1.incorrect e.pageX|pageY in iOS
				//2.there are no "e.rotation", "e.scale" and "onorientationchange" in Android
				//3.More TBD e.g. force | screenX | screenX | clientX | clientY | radiusX | radiusY

				// see if it has already been corrected
				var event = originalEvent.corrected;
				if(!event){
					var type = originalEvent.type;
					try{
						delete originalEvent.type; // on some JS engines (android), deleting properties makes them mutable
					}catch(e){}
					if(originalEvent.type){
						// Deleting the property of the original event did not work (this is the case of
						// browsers such as older Safari iOS), hence fallback:
						if(has("touch-can-modify-event-delegate")){
							// If deleting properties of delegated event works, use event delegation:
							EventDelegate.prototype = originalEvent;
							event = new EventDelegate;
						}else{
							// Otherwise last fallback: other browsers, such as mobile Firefox, do not like
							// delegated properties, so we have to copy
							event = {};
							for(var name in originalEvent){
								event[name] = originalEvent[name];
							}
						}
						// have to delegate methods to make them work
						event.preventDefault = function(){
							originalEvent.preventDefault();
						};
						event.stopPropagation = function(){
							originalEvent.stopPropagation();
						};
					}else{
						// deletion worked, use property as is
						event = originalEvent;
						event.type = type;
					}
					originalEvent.corrected = event;
					if(type == 'resize'){
						if(windowOrientation == window.orientation){
							return null;//double tap causes an unexpected 'resize' in Android
						}
						windowOrientation = window.orientation;
						event.type = "orientationchange";
						return listener.call(this, event);
					}
					// We use the original event and augment, rather than doing an expensive mixin operation
					if(!("rotation" in event)){ // test to see if it has rotation
						event.rotation = 0;
						event.scale = 1;
					}
					if (window.TouchEvent && originalEvent instanceof TouchEvent) {
						// use event.changedTouches[0].pageX|pageY|screenX|screenY|clientX|clientY|target
						var firstChangeTouch = event.changedTouches[0];
						for(var i in firstChangeTouch){ // use for-in, we don't need to have dependency on dojo/_base/lang here
							delete event[i]; // delete it first to make it mutable
							event[i] = firstChangeTouch[i];
						}
					}
				}
				return listener.call(this, event);
			};
		};
	}
	return on;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/promise/Promise.js":
/*!**********************************************!*\
  !*** ./node_modules/dojo/promise/Promise.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang){
	"use strict";

	// module:
	//		dojo/promise/Promise

	function throwAbstract(){
		throw new TypeError("abstract");
	}

	return lang.extend(function Promise(){
		// summary:
		//		The public interface to a deferred.
		// description:
		//		The public interface to a deferred. All promises in Dojo are
		//		instances of this class.
	}, {
		then: function(callback, errback, progback){
			// summary:
			//		Add new callbacks to the promise.
			// description:
			//		Add new callbacks to the deferred. Callbacks can be added
			//		before or after the deferred is fulfilled.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved.
			//		Receives the resolution value.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			//		Receives the rejection error.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress
			//		update. Receives the progress update.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback(s).
			//		This can be used for chaining many asynchronous operations.

			throwAbstract();
		},

		cancel: function(reason, strict){
			// summary:
			//		Inform the deferred it may cancel its asynchronous operation.
			// description:
			//		Inform the deferred it may cancel its asynchronous operation.
			//		The deferred's (optional) canceler is invoked and the
			//		deferred will be left in a rejected state. Can affect other
			//		promises that originate with the same deferred.
			// reason: any
			//		A message that may be sent to the deferred's canceler,
			//		explaining why it's being canceled.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be canceled.
			// returns: any
			//		Returns the rejection reason if the deferred was canceled
			//		normally.

			throwAbstract();
		},

		isResolved: function(){
			// summary:
			//		Checks whether the promise has been resolved.
			// returns: Boolean

			throwAbstract();
		},

		isRejected: function(){
			// summary:
			//		Checks whether the promise has been rejected.
			// returns: Boolean

			throwAbstract();
		},

		isFulfilled: function(){
			// summary:
			//		Checks whether the promise has been resolved or rejected.
			// returns: Boolean

			throwAbstract();
		},

		isCanceled: function(){
			// summary:
			//		Checks whether the promise has been canceled.
			// returns: Boolean

			throwAbstract();
		},

		always: function(callbackOrErrback){
			// summary:
			//		Add a callback to be invoked when the promise is resolved
			//		or rejected.
			// callbackOrErrback: Function?
			//		A function that is used both as a callback and errback.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback/errback.

			return this.then(callbackOrErrback, callbackOrErrback);
		},

		"catch": function(errback){
		    // summary:
		    //		Add new errbacks to the promise. Follows ECMA specification naming.
		    // errback: Function?
		    //		Callback to be invoked when the promise is rejected.
		    // returns: dojo/promise/Promise
		    //		Returns a new promise for the result of the errback.

		    return this.then(null, errback);
		},

		otherwise: function(errback){
			// summary:
			//		Add new errbacks to the promise.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the errback.

			return this.then(null, errback);
		},

		trace: function(){
			return this;
		},

		traceRejected: function(){
			return this;
		},

		toString: function(){
			// returns: string
			//		Returns `[object Promise]`.

			return "[object Promise]";
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/promise/instrumentation.js":
/*!******************************************************!*\
  !*** ./node_modules/dojo/promise/instrumentation.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./tracer */ "./node_modules/dojo/promise/tracer.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(tracer, has, lang, arrayUtil){
	has.add("config-useDeferredInstrumentation", "report-unhandled-rejections");

	function logError(error, rejection, deferred){
		if(error && error.log === false){
			return;
		}
		var stack = "";
		if(error && error.stack){
			stack += error.stack;
		}
		if(rejection && rejection.stack){
			stack += "\n    ----------------------------------------\n    rejected" + rejection.stack.split("\n").slice(1).join("\n").replace(/^\s+/, " ");
		}
		if(deferred && deferred.stack){
			stack += "\n    ----------------------------------------\n" + deferred.stack;
		}
		console.error(error, stack);
	}

	function reportRejections(error, handled, rejection, deferred){
		if(!handled){
			logError(error, rejection, deferred);
		}
	}

	var errors = [];
	var activeTimeout = false;
	var unhandledWait = 1000;
	function trackUnhandledRejections(error, handled, rejection, deferred){
		// try to find the existing tracking object
		if(!arrayUtil.some(errors, function(obj){
			if(obj.error === error){
				// found the tracking object for this error
				if(handled){
					// if handled, update the state
					obj.handled = true;
				}
				return true;
			}
		})){
			// no tracking object has been setup, create one
			errors.push({
				error: error,
				rejection: rejection,
				handled: handled,
				deferred: deferred,
				timestamp: new Date().getTime()
			});
		}

		if(!activeTimeout){
			activeTimeout = setTimeout(logRejected, unhandledWait);
		}
	}

	function logRejected(){
		var now = new Date().getTime();
		var reportBefore = now - unhandledWait;
		errors = arrayUtil.filter(errors, function(obj){
			// only report the error if we have waited long enough and
			// it hasn't been handled
			if(obj.timestamp < reportBefore){
				if(!obj.handled){
					logError(obj.error, obj.rejection, obj.deferred);
				}
				return false;
			}
			return true;
		});

		if(errors.length){
			activeTimeout = setTimeout(logRejected, errors[0].timestamp + unhandledWait - now);
		}else{
			activeTimeout = false;
		}
	}

	return function(Deferred){
		// summary:
		//		Initialize instrumentation for the Deferred class.
		// description:
		//		Initialize instrumentation for the Deferred class.
		//		Done automatically by `dojo/Deferred` if the
		//		`deferredInstrumentation` and `useDeferredInstrumentation`
		//		config options are set.
		//
		//		Sets up `dojo/promise/tracer` to log to the console.
		//
		//		Sets up instrumentation of rejected deferreds so unhandled
		//		errors are logged to the console.

		var usage = has("config-useDeferredInstrumentation");
		if(usage){
			tracer.on("resolved", lang.hitch(console, "log", "resolved"));
			tracer.on("rejected", lang.hitch(console, "log", "rejected"));
			tracer.on("progress", lang.hitch(console, "log", "progress"));

			var args = [];
			if(typeof usage === "string"){
				args = usage.split(",");
				usage = args.shift();
			}
			if(usage === "report-rejections"){
				Deferred.instrumentRejected = reportRejections;
			}else if(usage === "report-unhandled-rejections" || usage === true || usage === 1){
				Deferred.instrumentRejected = trackUnhandledRejections;
				unhandledWait = parseInt(args[0], 10) || unhandledWait;
			}else{
				throw new Error("Unsupported instrumentation usage <" + usage + ">");
			}
		}
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/promise/tracer.js":
/*!*********************************************!*\
  !*** ./node_modules/dojo/promise/tracer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ./Promise */ "./node_modules/dojo/promise/Promise.js"),
	__webpack_require__(/*! ../Evented */ "./node_modules/dojo/Evented.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, Promise, Evented){
	"use strict";

	// module:
	//		dojo/promise/tracer

	/*=====
	return {
		// summary:
		//		Trace promise fulfillment.
		// description:
		//		Trace promise fulfillment. Calling `.trace()` or `.traceError()` on a
		//		promise enables tracing. Will emit `resolved`, `rejected` or `progress`
		//		events.

		on: function(type, listener){
			// summary:
			//		Subscribe to traces.
			// description:
			//		See `dojo/Evented#on()`.
			// type: String
			//		`resolved`, `rejected`, or `progress`
			// listener: Function
			//		The listener is passed the traced value and any arguments
			//		that were used with the `.trace()` call.
		}
	};
	=====*/

	var evented = new Evented;
	var emit = evented.emit;
	evented.emit = null;
	// Emit events asynchronously since they should not change the promise state.
	function emitAsync(args){
		setTimeout(function(){
			emit.apply(evented, args);
		}, 0);
	}

	Promise.prototype.trace = function(){
		// summary:
		//		Trace the promise.
		// description:
		//		Tracing allows you to transparently log progress,
		//		resolution and rejection of promises, without affecting the
		//		promise itself. Any arguments passed to `trace()` are
		//		emitted in trace events. See `dojo/promise/tracer` on how
		//		to handle traces.
		// returns: dojo/promise/Promise
		//		The promise instance `trace()` is called on.

		var args = lang._toArray(arguments);
		this.then(
			function(value){ emitAsync(["resolved", value].concat(args)); },
			function(error){ emitAsync(["rejected", error].concat(args)); },
			function(update){ emitAsync(["progress", update].concat(args)); }
		);
		return this;
	};

	Promise.prototype.traceRejected = function(){
		// summary:
		//		Trace rejection of the promise.
		// description:
		//		Tracing allows you to transparently log progress,
		//		resolution and rejection of promises, without affecting the
		//		promise itself. Any arguments passed to `trace()` are
		//		emitted in trace events. See `dojo/promise/tracer` on how
		//		to handle traces.
		// returns: dojo/promise/Promise
		//		The promise instance `traceRejected()` is called on.

		var args = lang._toArray(arguments);
		this.otherwise(function(error){
			emitAsync(["rejected", error].concat(args));
		});
		return this;
	};

	return evented;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/ready.js":
/*!************************************!*\
  !*** ./node_modules/dojo/ready.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__(/*! ./has */ "./node_modules/dojo/has.js"), __webpack_require__.dj.c(module.i), __webpack_require__(/*! ./domReady */ "./node_modules/dojo/domReady.js"), __webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, has, require, domReady, lang){
	// module:
	//		dojo/ready
	// note:
	//		This module should be unnecessary in dojo 2.0

	var
		// truthy if DOMContentLoaded or better (e.g., window.onload fired) has been achieved
		isDomReady = 0,

		// The queue of functions waiting to execute as soon as dojo.ready conditions satisfied
		loadQ = [],

		// prevent recursion in onLoad
		onLoadRecursiveGuard = 0,

		handleDomReady = function(){
			isDomReady = 1;
			dojo._postLoad = dojo.config.afterOnLoad = true;
			onEvent();
		},

		onEvent = function(){
			// Called when some state changes:
			//		- dom ready
			//		- dojo/domReady has finished processing everything in its queue
			//		- task added to loadQ
			//		- require() has finished loading all currently requested modules
			//
			// Run the functions queued with dojo.ready if appropriate.


			//guard against recursions into this function
			if(onLoadRecursiveGuard){
				return;
			}
			onLoadRecursiveGuard = 1;

			// Run tasks in queue if require() is finished loading modules, the dom is ready, and there are no
			// pending tasks registered via domReady().
			// The last step is necessary so that a user defined dojo.ready() callback is delayed until after the
			// domReady() calls inside of dojo.	  Failure can be seen on dijit/tests/robot/Dialog_ally.html on IE8
			// because the dijit/focus.js domReady() callback doesn't execute until after the test starts running.
			while(isDomReady && (!domReady || domReady._Q.length == 0) && (require.idle ? require.idle() : true) && loadQ.length){
				var f = loadQ.shift();
				try{
					f();
				}catch(e){
					// force the dojo.js on("error") handler do display the message
					e.info = e.message;
					if(require.signal){
						require.signal("error", e);
					}else{
						throw e;
					}
				}
			}

			onLoadRecursiveGuard = 0;
		};

	// Check if we should run the next queue operation whenever require() finishes loading modules or domReady
	// finishes processing it's queue.
	require.on && require.on("idle", onEvent);
	if(domReady){
		domReady._onQEmpty = onEvent;
	}

	var ready = dojo.ready = dojo.addOnLoad = function(priority, context, callback){
		// summary:
		//		Add a function to execute on DOM content loaded and all requested modules have arrived and been evaluated.
		//		In most cases, the `domReady` plug-in should suffice and this method should not be needed.
		//
		//		When called in a non-browser environment, just checks that all requested modules have arrived and been
		//		evaluated.
		// priority: Integer?
		//		The order in which to exec this callback relative to other callbacks, defaults to 1000
		// context: Object?|Function
		//		The context in which to run execute callback, or a callback if not using context
		// callback: Function?
		//		The function to execute.
		//
		// example:
		//	Simple DOM and Modules ready syntax
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(function(){ alert("Dom ready!"); });
		//	|	});
		//
		// example:
		//	Using a priority
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(2, function(){ alert("low priority ready!"); })
		//	|	});
		//
		// example:
		//	Using context
		//	|	require(["dojo/ready"], function(ready){
		//	|		ready(foo, function(){
		//	|			// in here, this == foo
		//	|		});
		//	|	});
		//
		// example:
		//	Using dojo/hitch style args:
		//	|	require(["dojo/ready"], function(ready){
		//	|		var foo = { dojoReady: function(){ console.warn(this, "dojo dom and modules ready."); } };
		//	|		ready(foo, "dojoReady");
		//	|	});

		var hitchArgs = lang._toArray(arguments);
		if(typeof priority != "number"){
			callback = context;
			context = priority;
			priority = 1000;
		}else{
			hitchArgs.shift();
		}
		callback = callback ?
			lang.hitch.apply(dojo, hitchArgs) :
			function(){
				context();
			};
		callback.priority = priority;
		for(var i = 0; i < loadQ.length && priority >= loadQ[i].priority; i++){}
		loadQ.splice(i, 0, callback);
		onEvent();
	};

	has.add("dojo-config-addOnLoad", 1);
	if(has("dojo-config-addOnLoad")){
		var dca = dojo.config.addOnLoad;
		if(dca){
			ready[(lang.isArray(dca) ? "apply" : "call")](dojo, dca);
		}
	}

	if(has("dojo-sync-loader") && dojo.config.parseOnLoad && !dojo.isAsync){
		ready(99, function(){
			if(!dojo.parser){
				dojo.deprecated("Add explicit require(['dojo/parser']);", "", "2.0");
				__webpack_require__.e(/*! AMD require */ 189).then(function() {[__webpack_require__(/*! dojo/parser */ "./node_modules/dojo/parser.js")];}).catch(__webpack_require__.oe);
			}
		});
	}

	if(domReady){
		domReady(handleDomReady);
	}else{
		handleDomReady();
	}

	return ready;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/request/handlers.js":
/*!***********************************************!*\
  !*** ./node_modules/dojo/request/handlers.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ../json */ "./node_modules/dojo/json.js"),
	__webpack_require__(/*! ../_base/kernel */ "./node_modules/dojo/_base/kernel.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ./node_modules/dojo-webpack-plugin/lib/NoModule.js */ "./node_modules/dojo-webpack-plugin/lib/NoModule.js") // only included for has() qsa tests
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(JSON, kernel, array, has){
	has.add('activex', typeof ActiveXObject !== 'undefined');
	has.add('dom-parser', function(global){
		return 'DOMParser' in global;
	});

	var handleXML;
	if(has('activex')){
		// GUIDs obtained from http://msdn.microsoft.com/en-us/library/ms757837(VS.85).aspx
		var dp = [
			'Msxml2.DOMDocument.6.0',
			'Msxml2.DOMDocument.4.0',
			'MSXML2.DOMDocument.3.0',
			'MSXML.DOMDocument' // 2.0
		];
		var lastParser;

		handleXML = function(response){
			var result = response.data;
			var text = response.text;

			if(result && has('dom-qsa2.1') && !result.querySelectorAll && has('dom-parser')){
				// http://bugs.dojotoolkit.org/ticket/15631
				// IE9 supports a CSS3 querySelectorAll implementation, but the DOM implementation
				// returned by IE9 xhr.responseXML does not. Manually create the XML DOM to gain
				// the fuller-featured implementation and avoid bugs caused by the inconsistency
				result = new DOMParser().parseFromString(text, 'application/xml');
			}

			function createDocument(p) {
					try{
						var dom = new ActiveXObject(p);
						dom.async = false;
						dom.loadXML(text);
						result = dom;
						lastParser = p;
					}catch(e){ return false; }
					return true;
			}

			if(!result || !result.documentElement){
				// The creation of an ActiveX object is expensive, so we cache the
				// parser type to avoid trying all parser types each time we handle a
				// document. There is some concern that some parser types might fail
				// depending on the document being parsed. If parsing using the cached
				// parser type fails, we do the more expensive operation of finding one
				// that works for the given document.
				// https://bugs.dojotoolkit.org/ticket/15246
				if(!lastParser || !createDocument(lastParser)) {
					array.some(dp, createDocument);
				}
			}

			return result;
		};
	}

	var handleNativeResponse = function(response) {
		if(!has('native-xhr2-blob') && response.options.handleAs === 'blob' && typeof Blob !== 'undefined'){
			return new Blob([ response.xhr.response ], { type: response.xhr.getResponseHeader('Content-Type') });
		}

		return response.xhr.response;
	}

	var handlers = {
		'javascript': function(response){
			return kernel.eval(response.text || '');
		},
		'json': function(response){
			return JSON.parse(response.text || null);
		},
		'xml': handleXML,
		'blob': handleNativeResponse,
		'arraybuffer': handleNativeResponse,
		'document': handleNativeResponse
	};

	function handle(response){
		var handler = handlers[response.options.handleAs];

		response.data = handler ? handler(response) : (response.data || response.text);

		return response;
	}

	handle.register = function(name, handler){
		handlers[name] = handler;
	};

	return handle;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/request/util.js":
/*!*******************************************!*\
  !*** ./node_modules/dojo/request/util.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	exports,
	__webpack_require__(/*! ../errors/RequestError */ "./node_modules/dojo/errors/RequestError.js"),
	__webpack_require__(/*! ../errors/CancelError */ "./node_modules/dojo/errors/CancelError.js"),
	__webpack_require__(/*! ../Deferred */ "./node_modules/dojo/Deferred.js"),
	__webpack_require__(/*! ../io-query */ "./node_modules/dojo/io-query.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../promise/Promise */ "./node_modules/dojo/promise/Promise.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(exports, RequestError, CancelError, Deferred, ioQuery, array, lang, Promise, has){
	exports.deepCopy = function(target, source) {
		for (var name in source) {
			var tval = target[name],
  			    sval = source[name];
			if (tval !== sval) {
				if (sval && typeof sval === 'object' && !(has('native-formdata') && sval instanceof FormData)) {
					if (Object.prototype.toString.call(sval) === '[object Date]') { // use this date test to handle crossing frame boundaries
						target[name] = new Date(sval);
					} else if (lang.isArray(sval)) {
 						  target[name] = exports.deepCopyArray(sval);
					} else {
						if (tval && typeof tval === 'object') {
							exports.deepCopy(tval, sval);
						} else {
							target[name] = exports.deepCopy({}, sval);
						}
					}
				} else {
					target[name] = sval;
				}
			}
		}
		return target;
	};

	exports.deepCopyArray = function(source) {
		var clonedArray = [];
		source.forEach(function(svalItem) {
			if (typeof svalItem === 'object') {
				clonedArray.push(exports.deepCopy({}, svalItem));
			} else {
				clonedArray.push(svalItem);
			}
		});
		return clonedArray;
	};

	exports.deepCreate = function deepCreate(source, properties){
		properties = properties || {};
		var target = lang.delegate(source),
			name, value;

		for(name in source){
			value = source[name];

			if(value && typeof value === 'object'){
				target[name] = exports.deepCreate(value, properties[name]);
			}
		}
		return exports.deepCopy(target, properties);
	};

	var freeze = Object.freeze || function(obj){ return obj; };
	function okHandler(response){
		return freeze(response);
	}
	function dataHandler (response) {
		return response.data !== undefined ? response.data : response.text;
	}

	exports.deferred = function deferred(response, cancel, isValid, isReady, handleResponse, last){
		var def = new Deferred(function(reason){
			cancel && cancel(def, response);

			if(!reason || !(reason instanceof RequestError) && !(reason instanceof CancelError)){
				return new CancelError('Request canceled', response);
			}
			return reason;
		});

		def.response = response;
		def.isValid = isValid;
		def.isReady = isReady;
		def.handleResponse = handleResponse;

		function errHandler(error){
			error.response = response;
			throw error;
		}
		var responsePromise = def.then(okHandler).otherwise(errHandler);

		if(exports.notify){
			responsePromise.then(
				lang.hitch(exports.notify, 'emit', 'load'),
				lang.hitch(exports.notify, 'emit', 'error')
			);
		}

		var dataPromise = responsePromise.then(dataHandler);

		// http://bugs.dojotoolkit.org/ticket/16794
		// The following works around a leak in IE9 through the
		// prototype using lang.delegate on dataPromise and
		// assigning the result a property with a reference to
		// responsePromise.
		var promise = new Promise();
		for (var prop in dataPromise) {
			if (dataPromise.hasOwnProperty(prop)) {
				promise[prop] = dataPromise[prop];
			}
		}
		promise.response = responsePromise;
		freeze(promise);
		// End leak fix


		if(last){
			def.then(function(response){
				last.call(def, response);
			}, function(error){
				last.call(def, response, error);
			});
		}

		def.promise = promise;
		def.then = promise.then;

		return def;
	};

	exports.addCommonMethods = function addCommonMethods(provider, methods){
		array.forEach(methods||['GET', 'POST', 'PUT', 'DELETE'], function(method){
			provider[(method === 'DELETE' ? 'DEL' : method).toLowerCase()] = function(url, options){
				options = lang.delegate(options||{});
				options.method = method;
				return provider(url, options);
			};
		});
	};

	exports.parseArgs = function parseArgs(url, options, skipData){
		var data = options.data,
			query = options.query;

		if(data && !skipData){
			if(typeof data === 'object' && (!(has('native-xhr2')) || !(data instanceof ArrayBuffer || data instanceof Blob ))){
				options.data = ioQuery.objectToQuery(data);
			}
		}

		if(query){
			if(typeof query === 'object'){
				query = ioQuery.objectToQuery(query);
			}
			if(options.preventCache){
				query += (query ? '&' : '') + 'request.preventCache=' + (+(new Date));
			}
		}else if(options.preventCache){
			query = 'request.preventCache=' + (+(new Date));
		}

		if(url && query){
			url += (~url.indexOf('?') ? '&' : '?') + query;
		}

		return {
			url: url,
			options: options,
			getHeader: function(headerName){ return null; }
		};
	};

	exports.checkStatus = function(stat){
		stat = stat || 0;
		return (stat >= 200 && stat < 300) || // allow any 2XX response code
			stat === 304 ||                 // or, get it out of the cache
			stat === 1223 ||                // or, Internet Explorer mangled the status code
			!stat;                         // or, we're Titanium/browser chrome/chrome extension requesting a local file
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/request/watch.js":
/*!********************************************!*\
  !*** ./node_modules/dojo/request/watch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./util */ "./node_modules/dojo/request/util.js"),
	__webpack_require__(/*! ../errors/RequestTimeoutError */ "./node_modules/dojo/errors/RequestTimeoutError.js"),
	__webpack_require__(/*! ../errors/CancelError */ "./node_modules/dojo/errors/CancelError.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../_base/window */ "./node_modules/dojo/_base/window.js"),
	__webpack_require__.dj.h("dom-addeventlistener?:./node_modules/dojo/on.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(util, RequestTimeoutError, CancelError, array, win, on){
	// avoid setting a timer per request. It degrades performance on IE
	// something fierece if we don't use unified loops.
	var _inFlightIntvl = null,
		_inFlight = [];

	function watchInFlight(){
		// summary:
		//		internal method that checks each inflight XMLHttpRequest to see
		//		if it has completed or if the timeout situation applies.

		var now = +(new Date);

		// we need manual loop because we often modify _inFlight (and therefore 'i') while iterating
		for(var i = 0, dfd; i < _inFlight.length && (dfd = _inFlight[i]); i++){
			var response = dfd.response,
				options = response.options;
			if((dfd.isCanceled && dfd.isCanceled()) || (dfd.isValid && !dfd.isValid(response))){
				_inFlight.splice(i--, 1);
				watch._onAction && watch._onAction();
			}else if(dfd.isReady && dfd.isReady(response)){
				_inFlight.splice(i--, 1);
				dfd.handleResponse(response);
				watch._onAction && watch._onAction();
			}else if(dfd.startTime){
				// did we timeout?
				if(dfd.startTime + (options.timeout || 0) < now){
					_inFlight.splice(i--, 1);
					// Cancel the request so the io module can do appropriate cleanup.
					dfd.cancel(new RequestTimeoutError('Timeout exceeded', response));
					watch._onAction && watch._onAction();
				}
			}
		}

		watch._onInFlight && watch._onInFlight(dfd);

		if(!_inFlight.length){
			clearInterval(_inFlightIntvl);
			_inFlightIntvl = null;
		}
	}

	function watch(dfd){
		// summary:
		//		Watches the io request represented by dfd to see if it completes.
		// dfd: Deferred
		//		The Deferred object to watch.
		// response: Object
		//		The object used as the value of the request promise.
		// validCheck: Function
		//		Function used to check if the IO request is still valid. Gets the dfd
		//		object as its only argument.
		// ioCheck: Function
		//		Function used to check if basic IO call worked. Gets the dfd
		//		object as its only argument.
		// resHandle: Function
		//		Function used to process response. Gets the dfd
		//		object as its only argument.
		if(dfd.response.options.timeout){
			dfd.startTime = +(new Date);
		}

		if(dfd.isFulfilled()){
			// bail out if the deferred is already fulfilled
			return;
		}

		_inFlight.push(dfd);
		if(!_inFlightIntvl){
			_inFlightIntvl = setInterval(watchInFlight, 50);
		}

		// handle sync requests separately from async:
		// http://bugs.dojotoolkit.org/ticket/8467
		if(dfd.response.options.sync){
			watchInFlight();
		}
	}

	watch.cancelAll = function cancelAll(){
		// summary:
		//		Cancels all pending IO requests, regardless of IO type
		try{
			array.forEach(_inFlight, function(dfd){
				try{
					dfd.cancel(new CancelError('All requests canceled.'));
				}catch(e){}
			});
		}catch(e){}
	};

	if(win && on && win.doc.attachEvent){
		// Automatically call cancel all io calls on unload in IE
		// http://bugs.dojotoolkit.org/ticket/2357
		on(win.global, 'unload', function(){
			watch.cancelAll();
		});
	}

	return watch;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/request/xhr.js":
/*!******************************************!*\
  !*** ./node_modules/dojo/request/xhr.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ../errors/RequestError */ "./node_modules/dojo/errors/RequestError.js"),
	__webpack_require__(/*! ./watch */ "./node_modules/dojo/request/watch.js"),
	__webpack_require__(/*! ./handlers */ "./node_modules/dojo/request/handlers.js"),
	__webpack_require__(/*! ./util */ "./node_modules/dojo/request/util.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js")/*=====,
	'../request',
	'../_base/declare' =====*/
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(RequestError, watch, handlers, util, has/*=====, request, declare =====*/){
	has.add('native-xhr', function(){
		// if true, the environment has a native XHR implementation
		return typeof XMLHttpRequest !== 'undefined';
	});
	has.add('dojo-force-activex-xhr', function(){
		return has('activex') && window.location.protocol === 'file:';
	});

	has.add('native-xhr2', function(){
		if(!has('native-xhr') || has('dojo-force-activex-xhr')){ return; }
		var x = new XMLHttpRequest();
		return typeof x['addEventListener'] !== 'undefined' &&
			(typeof opera === 'undefined' || typeof x['upload'] !== 'undefined');
	});

	has.add('native-formdata', function(){
		// if true, the environment has a native FormData implementation
		return typeof FormData !== 'undefined';
	});

	has.add('native-response-type', function(){
		return has('native-xhr') && typeof new XMLHttpRequest().responseType !== 'undefined';
	});

	has.add('native-xhr2-blob', function(){
		if(!has('native-response-type')){ return; }
		var x = new XMLHttpRequest();
		// The URL used here does not have to be reachable as the XHR's `send` method is never called.
		// It does need to be parsable/resolvable in all cases, so it should be an absolute URL.
		// XMLHttpRequest within a Worker created from a Blob does not support relative URL paths.
		x.open('GET', 'https://dojotoolkit.org/', true);
		x.responseType = 'blob';
		// will not be set if unsupported
		var responseType = x.responseType;
		x.abort();
		return responseType === 'blob';
	});

	// Google Chrome doesn't support "json" response type
	// up to version 30, so it's intentionally not included here
	var nativeResponseTypes = {
		'blob': has('native-xhr2-blob') ? 'blob' : 'arraybuffer',
		'document': 'document',
		'arraybuffer': 'arraybuffer'
	};

	function handleResponse(response, error){
		var _xhr = response.xhr;
		response.status = response.xhr.status;

		try {
			// Firefox throws an error when trying to access
			// xhr.responseText if response isn't text
			response.text = _xhr.responseText;
		} catch (e) {}

		if(response.options.handleAs === 'xml'){
			response.data = _xhr.responseXML;
		}

		var handleError;
		if(error){
			this.reject(error);
		}else{
			try{
				handlers(response);
			}catch(e){
				handleError = e;
			}
			if(util.checkStatus(_xhr.status)){
				if(!handleError){
					this.resolve(response);
				}else{
					this.reject(handleError);
				}
			}else{
				if(!handleError){
					error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
					this.reject(error);
				}else{
					error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status +
						' and an error in handleAs: transformation of response', response);
					this.reject(error);
				}
			}
		}
	}

	var isValid, isReady, addListeners, cancel;
	if(has('native-xhr2')){
		// Any platform with XHR2 will only use the watch mechanism for timeout.

		isValid = function(response){
			// summary:
			//		Check to see if the request should be taken out of the watch queue
			return !this.isFulfilled();
		};
		cancel = function(dfd, response){
			// summary:
			//		Canceler for deferred
			response.xhr.abort();
		};
		addListeners = function(_xhr, dfd, response, uploadProgress){
			// summary:
			//		Adds event listeners to the XMLHttpRequest object
			function onLoad(evt){
				dfd.handleResponse(response);
			}
			function onError(evt){
				var _xhr = evt.target;
				var error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
				dfd.handleResponse(response, error);
			}

			function onProgress(transferType, evt){
				response.transferType = transferType;
				if(evt.lengthComputable){
					response.loaded = evt.loaded;
					response.total = evt.total;
					dfd.progress(response);
				} else if(response.xhr.readyState === 3){
					response.loaded = ('loaded' in evt) ? evt.loaded : evt.position;
					dfd.progress(response);
				}
			}

			function onDownloadProgress(evt) {
				return onProgress('download', evt);
			}

			function onUploadProgress(evt) {
				return onProgress('upload', evt);
			}

			_xhr.addEventListener('load', onLoad, false);
			_xhr.addEventListener('error', onError, false);
			_xhr.addEventListener('progress', onDownloadProgress, false);

			if (uploadProgress && _xhr.upload) {
				_xhr.upload.addEventListener('progress', onUploadProgress, false);
			}

			return function(){
				_xhr.removeEventListener('load', onLoad, false);
				_xhr.removeEventListener('error', onError, false);
				_xhr.removeEventListener('progress', onDownloadProgress, false);
				_xhr.upload.removeEventListener('progress', onUploadProgress, false);
				_xhr = null;
			};
		};
	}else{
		isValid = function(response){
			return response.xhr.readyState; //boolean
		};
		isReady = function(response){
			return 4 === response.xhr.readyState; //boolean
		};
		cancel = function(dfd, response){
			// summary:
			//		canceller function for util.deferred call.
			var xhr = response.xhr;
			var _at = typeof xhr.abort;
			if(_at === 'function' || _at === 'object' || _at === 'unknown'){
				xhr.abort();
			}
		};
	}

	function getHeader(headerName){
		return this.xhr.getResponseHeader(headerName);
	}

	var undefined,
		defaultOptions = {
			data: null,
			query: null,
			sync: false,
			method: 'GET'
		};
	function xhr(url, options, returnDeferred){
		var isFormData = has('native-formdata') && options && options.data && options.data instanceof FormData;
		var response = util.parseArgs(
			url,
			util.deepCreate(defaultOptions, options),
			isFormData
		);
		url = response.url;
		options = response.options;
		var hasNoData = !options.data && options.method !== 'POST' && options.method !== 'PUT';

		if(has('ie') <= 10){
			// older IE breaks point 9 in http://www.w3.org/TR/XMLHttpRequest/#the-open()-method and sends fragment, so strip it
			url = url.split('#')[0];
		}

		var remover,
			last = function(){
				remover && remover();
			};

		//Make the Deferred object for this xhr request.
		var dfd = util.deferred(
			response,
			cancel,
			isValid,
			isReady,
			handleResponse,
			last
		);
		var _xhr = response.xhr = xhr._create();

		if(!_xhr){
			// If XHR factory somehow returns nothings,
			// cancel the deferred.
			dfd.cancel(new RequestError('XHR was not created'));
			return returnDeferred ? dfd : dfd.promise;
		}

		response.getHeader = getHeader;

		if(addListeners){
			remover = addListeners(_xhr, dfd, response, options.uploadProgress);
		}

		// IE11 treats data: undefined different than other browsers
		var data = typeof(options.data) === 'undefined' ? null : options.data,
			async = !options.sync,
			method = options.method;

		try{
			// IE6 won't let you call apply() on the native function.
			_xhr.open(method, url, async, options.user || undefined, options.password || undefined);

			if(options.withCredentials){
				_xhr.withCredentials = options.withCredentials;
			}

			if(has('native-response-type') && options.handleAs in nativeResponseTypes) {
				_xhr.responseType = nativeResponseTypes[options.handleAs];
			}

			var headers = options.headers,
				contentType = (isFormData || hasNoData) ? false : 'application/x-www-form-urlencoded';
			if(headers){
				for(var hdr in headers){
					if(hdr.toLowerCase() === 'content-type'){
						contentType = headers[hdr];
					}else if(headers[hdr]){
						//Only add header if it has a value. This allows for instance, skipping
						//insertion of X-Requested-With by specifying empty value.
						_xhr.setRequestHeader(hdr, headers[hdr]);
					}
				}
			}

			if(contentType && contentType !== false){
				_xhr.setRequestHeader('Content-Type', contentType);
			}
			if(!headers || !('X-Requested-With' in headers)){
				_xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			}

			if(util.notify){
				util.notify.emit('send', response, dfd.promise.cancel);
			}
			_xhr.send(data);
		}catch(e){
			dfd.reject(e);
		}

		watch(dfd);
		_xhr = null;

		return returnDeferred ? dfd : dfd.promise;
	}

	/*=====
	xhr = function(url, options){
		// summary:
		//		Sends a request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__Options?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.__BaseOptions = declare(request.__BaseOptions, {
		// sync: Boolean?
		//		Whether to make a synchronous request or not. Default
		//		is `false` (asynchronous).
		// data: String|Object|FormData?
		//		Data to transfer. This is ignored for GET and DELETE
		//		requests.
		// headers: Object?
		//		Headers to use for the request.
		// user: String?
		//		Username to use during the request.
		// password: String?
		//		Password to use during the request.
		// withCredentials: Boolean?
		//		For cross-site requests, whether to send credentials
		//		or not.
		// uploadProgress: Boolean?
		//		Upload progress events cause preflighted requests. This
		//		option enables upload progress event support but also
		//		causes all requests to be preflighted.
	});
	xhr.__MethodOptions = declare(null, {
		// method: String?
		//		The HTTP method to use to make the request. Must be
		//		uppercase. Default is `"GET"`.
	});
	xhr.__Options = declare([xhr.__BaseOptions, xhr.__MethodOptions]);

	xhr.get = function(url, options){
		// summary:
		//		Send an HTTP GET request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.post = function(url, options){
		// summary:
		//		Send an HTTP POST request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.put = function(url, options){
		// summary:
		//		Send an HTTP PUT request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	xhr.del = function(url, options){
		// summary:
		//		Send an HTTP DELETE request using XMLHttpRequest with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/xhr.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	=====*/
	xhr._create = function(){
		// summary:
		//		does the work of portably generating a new XMLHTTPRequest object.
		throw new Error('XMLHTTP not available');
	};
	if(has('native-xhr') && !has('dojo-force-activex-xhr')){
		xhr._create = function(){
			return new XMLHttpRequest();
		};
	}else if(has('activex')){
		try{
			new ActiveXObject('Msxml2.XMLHTTP');
			xhr._create = function(){
				return new ActiveXObject('Msxml2.XMLHTTP');
			};
		}catch(e){
			try{
				new ActiveXObject('Microsoft.XMLHTTP');
				xhr._create = function(){
					return new ActiveXObject('Microsoft.XMLHTTP');
				};
			}catch(e){}
		}
	}

	util.addCommonMethods(xhr);

	return xhr;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/sniff.js":
/*!************************************!*\
  !*** ./node_modules/dojo/sniff.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./has */ "./node_modules/dojo/has.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(has){
	// module:
	//		dojo/sniff

	/*=====
	return function(){
		// summary:
		//		This module sets has() flags based on the current browser.
		//		It returns the has() function.
	};
	=====*/

	if(has("host-browser")){
		var n = navigator,
			dua = n.userAgent,
			dav = n.appVersion,
			tv = parseFloat(dav);
		has.add("air", dua.indexOf("AdobeAIR") >= 0);
		has.add("wp", parseFloat(dua.split("Windows Phone")[1]) || undefined);
		has.add("msapp", parseFloat(dua.split("MSAppHost/")[1]) || undefined);
		has.add("khtml", dav.indexOf("Konqueror") >= 0 ? tv : undefined);
		has.add("edge", parseFloat(dua.split("Edge/")[1]) || undefined);
		has.add("opr", parseFloat(dua.split("OPR/")[1]) || undefined);
		// NOTE: https://dev.opera.com/blog/opera-user-agent-strings-opera-15-and-beyond/
		has.add("webkit", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
			&& !has("edge") && parseFloat(dua.split("WebKit/")[1]) || undefined);
		has.add("chrome", !has("edge") && !has("opr")
				&& parseFloat(dua.split("Chrome/")[1]) || undefined);
		has.add("android", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
				&& parseFloat(dua.split("Android ")[1]) || undefined);
		has.add("safari", dav.indexOf("Safari") >= 0
				&& !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
				&& !has("chrome") && !has("android") && !has("edge") && !has("opr") ?
			parseFloat(dav.split("Version/")[1]) : undefined);
		has.add("mac", dav.indexOf("Macintosh") >= 0);
		has.add("quirks", document.compatMode == "BackCompat");
		if(!has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
				&& dua.match(/(iPhone|iPod|iPad)/)){
			var p = RegExp.$1.replace(/P/, "p");
			var v = dua.match(/OS ([\d_]+)/) ? RegExp.$1 : "1";
			var os = parseFloat(v.replace(/_/, ".").replace(/_/g, ""));
			has.add(p, os);		// "iphone", "ipad" or "ipod"
			has.add("ios", os);
		}
		has.add("bb", (dua.indexOf("BlackBerry") >= 0 || dua.indexOf("BB10") >= 0) && parseFloat(dua.split("Version/")[1]) || undefined);
		has.add("trident", parseFloat(dav.split("Trident/")[1]) || undefined);

		has.add("svg", typeof SVGAngle !== "undefined");

		if(!has("webkit")){
			// Opera
			if(dua.indexOf("Opera") >= 0){
				// see http://dev.opera.com/articles/view/opera-ua-string-changes and http://www.useragentstring.com/pages/Opera/
				// 9.8 has both styles; <9.8, 9.9 only old style
				has.add("opera", tv >= 9.8 ? parseFloat(dua.split("Version/")[1]) || tv : tv);
			}

			// Mozilla and firefox
			if(dua.indexOf("Gecko") >= 0 && !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1
					&& !has("khtml") && !has("trident") && !has("edge")){
				has.add("mozilla", tv);
			}
			if(has("mozilla")){
				//We really need to get away from this. Consider a sane isGecko approach for the future.
				has.add("ff", parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined);
			}

			// IE
			if(document.all && !has("opera")){
				var isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;

				//In cases where the page has an HTTP header or META tag with
				//X-UA-Compatible, then it is in emulation mode.
				//Make sure isIE reflects the desired version.
				//document.documentMode of 5 means quirks mode.
				//Only switch the value if documentMode's major version
				//is different from isIE's major version.
				var mode = document.documentMode;
				if(mode && mode != 5 && Math.floor(isIE) != mode){
					isIE = mode;
				}

				has.add("ie", isIE);
			}

			// Wii
			has.add("wii", typeof opera != "undefined" && opera.wiiremote);
		}
	}

	return has;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/when.js":
/*!***********************************!*\
  !*** ./node_modules/dojo/when.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./Deferred */ "./node_modules/dojo/Deferred.js"),
	__webpack_require__(/*! ./promise/Promise */ "./node_modules/dojo/promise/Promise.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(Deferred, Promise){
	"use strict";

	// module:
	//		dojo/when

	return function when(valueOrPromise, callback, errback, progback){
		// summary:
		//		Transparently applies callbacks to values and/or promises.
		// description:
		//		Accepts promises but also transparently handles non-promises. If no
		//		callbacks are provided returns a promise, regardless of the initial
		//		value. Foreign promises are converted.
		//
		//		If callbacks are provided and the initial value is not a promise,
		//		the callback is executed immediately with no error handling. Returns
		//		a promise if the initial value is a promise, or the result of the
		//		callback otherwise.
		// valueOrPromise:
		//		Either a regular value or an object with a `then()` method that
		//		follows the Promises/A specification.
		// callback: Function?
		//		Callback to be invoked when the promise is resolved, or a non-promise
		//		is received.
		// errback: Function?
		//		Callback to be invoked when the promise is rejected.
		// progback: Function?
		//		Callback to be invoked when the promise emits a progress update.
		// returns: dojo/promise/Promise
		//		Promise, or if a callback is provided, the result of the callback.

		var receivedPromise = valueOrPromise && typeof valueOrPromise.then === "function";
		var nativePromise = receivedPromise && valueOrPromise instanceof Promise;

		if(!receivedPromise){
			if(arguments.length > 1){
				return callback ? callback(valueOrPromise) : valueOrPromise;
			}else{
				return new Deferred().resolve(valueOrPromise);
			}
		}else if(!nativePromise){
			var deferred = new Deferred(valueOrPromise.cancel);
			valueOrPromise.then(deferred.resolve, deferred.reject, deferred.progress);
			valueOrPromise = deferred.promise;
		}

		if(callback || errback || progback){
			return valueOrPromise.then(callback, errback, progback);
		}
		return valueOrPromise;
	};
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });