(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dojo/hash":"./node_modules/dojo/hash.js",
	"dojo/router":"./node_modules/dojo/router.js",
	"dojo/router/RouterBase":"./node_modules/dojo/router/RouterBase.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/dojo/hash.js":
/*!***********************************!*\
  !*** ./node_modules/dojo/hash.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./_base/kernel */ "./node_modules/dojo/_base/kernel.js"), __webpack_require__.dj.c(module.i), __webpack_require__(/*! ./_base/config */ "./node_modules/dojo/_base/config.js"), __webpack_require__(/*! ./aspect */ "./node_modules/dojo/aspect.js"), __webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ./topic */ "./node_modules/dojo/topic.js"), __webpack_require__(/*! ./domReady */ "./node_modules/dojo/domReady.js"), __webpack_require__(/*! ./sniff */ "./node_modules/dojo/sniff.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dojo, require, config, aspect, lang, topic, domReady, has){

	// module:
	//		dojo/hash

	dojo.hash = function(/* String? */ hash, /* Boolean? */ replace){
		// summary:
		//		Gets or sets the hash string in the browser URL.
		// description:
		//		Handles getting and setting of location.hash.
		//
		//		 - If no arguments are passed, acts as a getter.
		//		 - If a string is passed, acts as a setter.
		// hash:
		//		the hash is set - #string.
		// replace:
		//		If true, updates the hash value in the current history
		//		state instead of creating a new history state.
		// returns:
		//		when used as a getter, returns the current hash string.
		//		when used as a setter, returns the new hash string.
		// example:
		//	|	topic.subscribe("/dojo/hashchange", context, callback);
		//	|
		//	|	function callback (hashValue){
		//	|		// do something based on the hash value.
		//	|	}

		// getter
		if(!arguments.length){
			return _getHash();
		}
		// setter
		if(hash.charAt(0) == "#"){
			hash = hash.substring(1);
		}
		if(replace){
			_replace(hash);
		}else{
			location.hash = "#" + hash;
		}
		return hash; // String
	};

	// Global vars
	var _recentHash, _ieUriMonitor, _connect,
		_pollFrequency = config.hashPollFrequency || 100;

	//Internal functions
	function _getSegment(str, delimiter){
		var i = str.indexOf(delimiter);
		return (i >= 0) ? str.substring(i+1) : "";
	}

	function _getHash(){
		return _getSegment(location.href, "#");
	}

	function _dispatchEvent(){
		topic.publish("/dojo/hashchange", _getHash());
	}

	function _pollLocation(){
		if(_getHash() === _recentHash){
			return;
		}
		_recentHash = _getHash();
		_dispatchEvent();
	}

	function _replace(hash){
		if(_ieUriMonitor){
			if(_ieUriMonitor.isTransitioning()){
				setTimeout(lang.hitch(null,_replace,hash), _pollFrequency);
				return;
			}
			var href = _ieUriMonitor.iframe.location.href;
			var index = href.indexOf('?');
			// main frame will detect and update itself
			_ieUriMonitor.iframe.location.replace(href.substring(0, index) + "?" + hash);
			return;
		}
		var href = location.href.replace(/#.*/, "");
		location.replace(href + "#" + hash);
		!_connect && _pollLocation();
	}

	function IEUriMonitor(){
		// summary:
		//		Determine if the browser's URI has changed or if the user has pressed the
		//		back or forward button. If so, call _dispatchEvent.
		//
		// description:
		//		IE doesn't add changes to the URI's hash into the history unless the hash
		//		value corresponds to an actual named anchor in the document. To get around
		//		this IE difference, we use a background IFrame to maintain a back-forward
		//		history, by updating the IFrame's query string to correspond to the
		//		value of the main browser location's hash value.
		//
		//		E.g. if the value of the browser window's location changes to
		//
		//		#action=someAction
		//
		//		... then we'd update the IFrame's source to:
		//
		//		?action=someAction
		//
		//		This design leads to a somewhat complex state machine, which is
		//		described below:
		//
		//		####s1
		//
		//		Stable state - neither the window's location has changed nor
		//		has the IFrame's location. Note that this is the 99.9% case, so
		//		we optimize for it.
		//
		//		Transitions: s1, s2, s3
		//
		//		####s2
		//
		//		Window's location changed - when a user clicks a hyperlink or
		//		code programmatically changes the window's URI.
		//
		//		Transitions: s4
		//
		//		####s3
		//
		//		Iframe's location changed as a result of user pressing back or
		//		forward - when the user presses back or forward, the location of
		//		the background's iframe changes to the previous or next value in
		//		its history.
		//
		//		Transitions: s1
		//
		//		####s4
		//
		//		IEUriMonitor has programmatically changed the location of the
		//		background iframe, but it's location hasn't yet changed. In this
		//		case we do nothing because we need to wait for the iframe's
		//		location to reflect its actual state.
		//
		//		Transitions: s4, s5
		//
		//		####s5
		//
		//		IEUriMonitor has programmatically changed the location of the
		//		background iframe, and the iframe's location has caught up with
		//		reality. In this case we need to transition to s1.
		//
		//		Transitions: s1
		//
		//		The hashchange event is always dispatched on the transition back to s1.


		// create and append iframe
		var ifr = document.createElement("iframe"),
			IFRAME_ID = "dojo-hash-iframe",
			ifrSrc = config.dojoBlankHtmlUrl || require.toUrl("./resources/blank.html");

		if(config.useXDomain && !config.dojoBlankHtmlUrl){
			console.warn("dojo/hash: When using cross-domain Dojo builds,"
				+ " please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"
				+ " to the path on your domain to blank.html");
		}

		ifr.id = IFRAME_ID;
		ifr.src = ifrSrc + "?" + _getHash();
		ifr.style.display = "none";
		document.body.appendChild(ifr);

		this.iframe = dojo.global[IFRAME_ID];
		var recentIframeQuery, transitioning, expectedIFrameQuery, docTitle, ifrOffline,
			iframeLoc = this.iframe.location;

		function resetState(){
			_recentHash = _getHash();
			recentIframeQuery = ifrOffline ? _recentHash : _getSegment(iframeLoc.href, "?");
			transitioning = false;
			expectedIFrameQuery = null;
		}

		this.isTransitioning = function(){
			return transitioning;
		};

		this.pollLocation = function(){
			if(!ifrOffline){
				try{
					//see if we can access the iframe's location without a permission denied error
					var iframeSearch = _getSegment(iframeLoc.href, "?");
					//good, the iframe is same origin (no thrown exception)
					if(document.title != docTitle){ //sync title of main window with title of iframe.
						docTitle = this.iframe.document.title = document.title;
					}
				}catch(e){
					//permission denied - server cannot be reached.
					ifrOffline = true;
					console.error("dojo/hash: Error adding history entry. Server unreachable.");
				}
			}
			var hash = _getHash();
			if(transitioning && _recentHash === hash){
				// we're in an iframe transition (s4 or s5)
				if(ifrOffline || iframeSearch === expectedIFrameQuery){
					// s5 (iframe caught up to main window or iframe offline), transition back to s1
					resetState();
					_dispatchEvent();
				}else{
					// s4 (waiting for iframe to catch up to main window)
					setTimeout(lang.hitch(this,this.pollLocation),0);
					return;
				}
			}else if(_recentHash === hash && (ifrOffline || recentIframeQuery === iframeSearch)){
				// we're in stable state (s1, iframe query == main window hash), do nothing
			}else{
				// the user has initiated a URL change somehow.
				// sync iframe query <-> main window hash
				if(_recentHash !== hash){
					// s2 (main window location changed), set iframe url and transition to s4
					_recentHash = hash;
					transitioning = true;
					expectedIFrameQuery = hash;
					ifr.src = ifrSrc + "?" + expectedIFrameQuery;
					ifrOffline = false; //we're updating the iframe src - set offline to false so we can check again on next poll.
					setTimeout(lang.hitch(this,this.pollLocation),0); //yielded transition to s4 while iframe reloads.
					return;
				}else if(!ifrOffline){
					// s3 (iframe location changed via back/forward button), set main window url and transition to s1.
					location.href = "#" + iframeLoc.search.substring(1);
					resetState();
					_dispatchEvent();
				}
			}
			setTimeout(lang.hitch(this,this.pollLocation), _pollFrequency);
		};
		resetState(); // initialize state (transition to s1)
		setTimeout(lang.hitch(this,this.pollLocation), _pollFrequency);
	}
	domReady(function(){
		if("onhashchange" in dojo.global && (!has("ie") || (has("ie") >= 8 && document.compatMode != "BackCompat"))){	//need this IE browser test because "onhashchange" exists in IE8 in IE7 mode
			_connect = aspect.after(dojo.global,"onhashchange",_dispatchEvent, true);
		}else{
			if(document.addEventListener){ // Non-IE
				_recentHash = _getHash();
				setInterval(_pollLocation, _pollFrequency); //Poll the window location for changes
			}else if(document.attachEvent){ // IE7-
				//Use hidden iframe in versions of IE that don't have onhashchange event
				_ieUriMonitor = new IEUriMonitor();
			}
			// else non-supported browser, do nothing.
		}
	});

	return dojo.hash;

}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/router.js":
/*!*************************************!*\
  !*** ./node_modules/dojo/router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ./router/RouterBase */ "./node_modules/dojo/router/RouterBase.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(RouterBase){

	// module:
	//		dojo/router

/*=====
return {
	// summary:
	//		A singleton-style instance of dojo/router/RouterBase. See that
	//		module for specifics.
	// example:
	//	|	router.register("/widgets/:id", function(evt){
	//	|		// If "/widgets/3" was matched,
	//	|		// evt.params.id === "3"
	//	|		xhr.get({
	//	|			url: "/some/path/" + evt.params.id,
	//	|			load: function(data){
	//	|				// ...
	//	|			}
	//	|		});
	//	|	});
};
=====*/

	return new RouterBase({});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/router/RouterBase.js":
/*!************************************************!*\
  !*** ./node_modules/dojo/router/RouterBase.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"),
	__webpack_require__(/*! dojo/hash */ "./node_modules/dojo/hash.js"),
	__webpack_require__(/*! dojo/topic */ "./node_modules/dojo/topic.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, hash, topic){

	// module:
	//		dojo/router/RouterBase

	// Creating a basic trim to avoid needing the full dojo/string module
	// similarly to dojo/_base/lang's trim
	var trim;
	if(String.prototype.trim){
		trim = function(str){ return str.trim(); };
	}else{
		trim = function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
	}

	// Firing of routes on the route object is always the same,
	// no clean way to expose this on the prototype since it's for the
	// internal router objects.
	function fireRoute(params, currentPath, newPath){
		var queue, isStopped, isPrevented, eventObj, callbackArgs, i, l;

		queue = this.callbackQueue;
		isStopped = false;
		isPrevented = false;
		eventObj = {
			stopImmediatePropagation: function(){ isStopped = true; },
			preventDefault: function(){ isPrevented = true; },
			oldPath: currentPath,
			newPath: newPath,
			params: params
		};

		callbackArgs = [eventObj];

		if(params instanceof Array){
			callbackArgs = callbackArgs.concat(params);
		}else{
			for(var key in params){
				callbackArgs.push(params[key]);
			}
		}

		for(i=0, l=queue.length; i<l; ++i){
			if(!isStopped){
				queue[i].apply(null, callbackArgs);
			}
		}

		return !isPrevented;
	}

	// Our actual class-like object
	var RouterBase = declare(null, {
		// summary:
		//		A module that allows one to easily map hash-based structures into
		//		callbacks. The router module is a singleton, offering one central
		//		point for all registrations of this type.
		// example:
		//	|	var router = new RouterBase({});
		//	|	router.register("/widgets/:id", function(evt){
		//	|		// If "/widgets/3" was matched,
		//	|		// evt.params.id === "3"
		//	|		xhr.get({
		//	|			url: "/some/path/" + evt.params.id,
		//	|			load: function(data){
		//	|				// ...
		//	|			}
		//	|		});
		//	|	});

		_routes: null,
		_routeIndex: null,
		_started: false,
		_currentPath: "",

		idMatch: /:(\w[\w\d]*)/g,
		idReplacement: "([^\\/]+)",
		globMatch: /\*(\w[\w\d]*)/,
		globReplacement: "(.+)",

		constructor: function(kwArgs){
			// A couple of safety initializations
			this._routes = [];
			this._routeIndex = {};

			// Simple constructor-style "Decorate myself all over" for now
			for(var i in kwArgs){
				if(kwArgs.hasOwnProperty(i)){
					this[i] = kwArgs[i];
				}
			}
		},

		register: function(/*String|RegExp*/ route, /*Function*/ callback){
			// summary:
			//		Registers a route to a handling callback
			// description:
			//		Given either a string or a regular expression, the router
			//		will monitor the page's hash and respond to changes that
			//		match the string or regex as provided.
			//
			//		When provided a regex for the route:
			//
			//		- Matching is performed, and the resulting capture groups
			//		are passed through to the callback as an array.
			//
			//		When provided a string for the route:
			//
			//		- The string is parsed as a URL-like structure, like
			//		"/foo/bar"
			//		- If any portions of that URL are prefixed with a colon
			//		(:), they will be parsed out and provided to the callback
			//		as properties of an object.
			//		- If the last piece of the URL-like structure is prefixed
			//		with a star (*) instead of a colon, it will be replaced in
			//		the resulting regex with a greedy (.+) match and
			//		anything remaining on the hash will be provided as a
			//		property on the object passed into the callback. Think of
			//		it like a basic means of globbing the end of a route.
			// example:
			//	|	router.register("/foo/:bar/*baz", function(object){
			//	|		// If the hash was "/foo/abc/def/ghi",
			//	|		// object.bar === "abc"
			//	|		// object.baz === "def/ghi"
			//	|	});
			// returns: Object
			//		A plain JavaScript object to be used as a handle for
			//		either removing this specific callback's registration, as
			//		well as to add new callbacks with the same route initially
			//		used.
			// route: String|RegExp
			//		A string or regular expression which will be used when
			//		monitoring hash changes.
			// callback: Function
			//		When the hash matches a pattern as described in the route,
			//		this callback will be executed. It will receive an event
			//		object that will have several properties:
			//
			//		- params: Either an array or object of properties pulled
			//		from the new hash
			//		- oldPath: The hash in its state before the change
			//		- newPath: The new hash being shifted to
			//		- preventDefault: A method that will stop hash changes
			//		from being actually applied to the active hash. This only
			//		works if the hash change was initiated using `router.go`,
			//		as changes initiated more directly to the location.hash
			//		property will already be in place
			//		- stopImmediatePropagation: When called, will stop any
			//		further bound callbacks on this particular route from
			//		being executed. If two distinct routes are bound that are
			//		different, but both happen to match the current hash in
			//		some way, this will *not* keep other routes from receiving
			//		notice of the change.

			return this._registerRoute(route, callback);
		},

		registerBefore: function(/*String|RegExp*/ route, /*Function*/ callback){
			// summary:
			//		Registers a route to a handling callback, except before
			//		any previously registered callbacks
			// description:
			//		Much like the `register` method, `registerBefore` allows
			//		us to register route callbacks to happen before any
			//		previously registered callbacks. See the documentation for
			//		`register` for more details and examples.

			return this._registerRoute(route, callback, true);
		},

		go: function(path, replace){
			// summary:
			//		A simple pass-through to make changing the hash easy,
			//		without having to require dojo/hash directly. It also
			//		synchronously fires off any routes that match.
			// example:
			//	|	router.go("/foo/bar");

			var applyChange;

			if(typeof path !== "string"){return false;}

			path = trim(path);
			applyChange = this._handlePathChange(path);

			if(applyChange){
				hash(path, replace);
			}

			return applyChange;
		},

		startup: function(defaultPath){
			// summary:
			//		This method must be called to activate the router. Until
			//		startup is called, no hash changes will trigger route
			//		callbacks.

			if(this._started){ return; }

			var self = this,
				startingPath = hash();

			this._started = true;
			this._hashchangeHandle = topic.subscribe("/dojo/hashchange", function(){
				self._handlePathChange.apply(self, arguments);
			});

			if(!startingPath){
				// If there is no initial starting point, push our defaultPath into our
				// history as the starting point
				this.go(defaultPath, true);
			}else{
				// Handle the starting path
				this._handlePathChange(startingPath);
			}
		},

		destroy: function(){
			if(this._hashchangeHandle){
				this._hashchangeHandle.remove();
			} 			
			this._routes = null;
			this._routeIndex = null;
		},

		_handlePathChange: function(newPath){
			var i, j, li, lj, routeObj, result,
				allowChange, parameterNames, params,
				routes = this._routes,
				currentPath = this._currentPath;

			if(!this._started || newPath === currentPath){ return allowChange; }

			allowChange = true;

			for(i=0, li=routes.length; i<li; ++i){
				routeObj = routes[i];
				result = routeObj.route.exec(newPath);

				if(result){
					if(routeObj.parameterNames){
						parameterNames = routeObj.parameterNames;
						params = {};

						for(j=0, lj=parameterNames.length; j<lj; ++j){
							params[parameterNames[j]] = result[j+1];
						}
					}else{
						params = result.slice(1);
					}
					allowChange = routeObj.fire(params, currentPath, newPath);
				}
			}

			if(allowChange){
				this._currentPath = newPath;
			}

			return allowChange;
		},

		_convertRouteToRegExp: function(route){
			// Sub in based on IDs and globs
			route = route.replace(this.idMatch, this.idReplacement);
			route = route.replace(this.globMatch, this.globReplacement);
			// Make sure it's an exact match
			route = "^" + route + "$";

			return new RegExp(route);
		},

		_getParameterNames: function(route){
			var idMatch = this.idMatch,
				globMatch = this.globMatch,
				parameterNames = [], match;

			idMatch.lastIndex = 0;

			while((match = idMatch.exec(route)) !== null){
				parameterNames.push(match[1]);
			}
			if((match = globMatch.exec(route)) !== null){
				parameterNames.push(match[1]);
			}

			return parameterNames.length > 0 ? parameterNames : null;
		},

		_indexRoutes: function(){
			var i, l, route, routeIndex, routes = this._routes;

			// Start a new route index
			routeIndex = this._routeIndex = {};

			// Set it up again
			for(i=0, l=routes.length; i<l; ++i){
				route = routes[i];
				routeIndex[route.route] = i;
			}
		},

		_registerRoute: function(/*String|RegExp*/route, /*Function*/callback, /*Boolean?*/isBefore){
			var index, exists, routeObj, callbackQueue, removed,
				self = this, routes = this._routes,
				routeIndex = this._routeIndex;

			// Try to fetch the route if it already exists.
			// This works thanks to stringifying of regex
			index = this._routeIndex[route];
			exists = typeof index !== "undefined";
			if(exists){
				routeObj = routes[index];
			}

			// If we didn't get one, make a default start point
			if(!routeObj){
				routeObj = {
					route: route,
					callbackQueue: [],
					fire: fireRoute
				};
			}

			callbackQueue = routeObj.callbackQueue;

			if(typeof route == "string"){
				routeObj.parameterNames = this._getParameterNames(route);
				routeObj.route = this._convertRouteToRegExp(route);
			}

			if(isBefore){
				callbackQueue.unshift(callback);
			}else{
				callbackQueue.push(callback);
			}

			if(!exists){
				index = routes.length;
				routeIndex[route] = index;
				routes.push(routeObj);
			}

			// Useful in a moment to keep from re-removing routes
			removed = false;

			return { // Object
				remove: function(){
					var i, l;

					if(removed){ return; }

					for(i=0, l=callbackQueue.length; i<l; ++i){
						if(callbackQueue[i] === callback){
							callbackQueue.splice(i, 1);
						}
					}


					if(callbackQueue.length === 0){
						routes.splice(index, 1);
						self._indexRoutes();
					}

					removed = true;
				},
				register: function(callback, isBefore){
					return self.register(route, callback, isBefore);
				}
			};
		}
	});

	return RouterBase;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);