(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dojo/NodeList-manipulate":"./node_modules/dojo/NodeList-manipulate.js",
	"dojo/request/iframe":"./node_modules/dojo/request/iframe.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/dojo/NodeList-manipulate.js":
/*!**************************************************!*\
  !*** ./node_modules/dojo/NodeList-manipulate.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./query */ "./node_modules/dojo/query.js"), __webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ./_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! ./dom-construct */ "./node_modules/dojo/dom-construct.js"), __webpack_require__(/*! ./dom-attr */ "./node_modules/dojo/dom-attr.js"), __webpack_require__(/*! ./NodeList-dom */ "./node_modules/dojo/NodeList-dom.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(dquery, lang, array, construct, attr){
	// module:
	//		dojo/NodeList-manipulate

	/*=====
	return function(){
		// summary:
		//		Adds chainable methods to dojo.query() / NodeList instances for manipulating HTML
		//		and DOM nodes and their properties.
	};
	=====*/

	var NodeList = dquery.NodeList;

	//TODO: add a way to parse for widgets in the injected markup?


	function getWrapInsertion(/*DOMNode*/node){
		// summary:
		//		finds the innermost element to use for wrap insertion.

		//Make it easy, assume single nesting, no siblings.
		while(node.childNodes[0] && node.childNodes[0].nodeType == 1){
			node = node.childNodes[0];
		}
		return node; //DOMNode
	}

	function makeWrapNode(/*DOMNode||String*/html, /*DOMNode*/refNode){
		// summary:
		//		convert HTML into nodes if it is not already a node.
		if(typeof html == "string"){
			html = construct.toDom(html, (refNode && refNode.ownerDocument));
			if(html.nodeType == 11){
				//DocumentFragment cannot handle cloneNode, so choose first child.
				html = html.childNodes[0];
			}
		}else if(html.nodeType == 1 && html.parentNode){
			//This element is already in the DOM clone it, but not its children.
			html = html.cloneNode(false);
		}
		return html; /*DOMNode*/
	}

	lang.extend(NodeList, {
		_placeMultiple: function(/*String||Node||NodeList*/query, /*String*/position){
			// summary:
			//		private method for inserting queried nodes into all nodes in this NodeList
			//		at different positions. Differs from NodeList.place because it will clone
			//		the nodes in this NodeList if the query matches more than one element.
			var nl2 = typeof query == "string" || query.nodeType ? dquery(query) : query;
			var toAdd = [];
			for(var i = 0; i < nl2.length; i++){
				//Go backwards in DOM to make dom insertions easier via insertBefore
				var refNode = nl2[i];
				var length = this.length;
				for(var j = length - 1, item; item = this[j]; j--){
					if(i > 0){
						//Need to clone the item. This also means
						//it needs to be added to the current NodeList
						//so it can also be the target of other chaining operations.
						item = this._cloneNode(item);
						toAdd.unshift(item);
					}
					if(j == length - 1){
						construct.place(item, refNode, position);
					}else{
						refNode.parentNode.insertBefore(item, refNode);
					}
					refNode = item;
				}
			}

			if(toAdd.length){
				//Add the toAdd items to the current NodeList. Build up list of args
				//to pass to splice.
				toAdd.unshift(0);
				toAdd.unshift(this.length - 1);
				Array.prototype.splice.apply(this, toAdd);
			}

			return this; // dojo/NodeList
		},

		innerHTML: function(/*String|DOMNode|NodeList?*/ value){
			// summary:
			//		allows setting the innerHTML of each node in the NodeList,
			//		if there is a value passed in, otherwise, reads the innerHTML value of the first node.
			// description:
			//		This method is simpler than the dojo/NodeList.html() method provided by
			//		`dojo/NodeList-html`. This method just does proper innerHTML insertion of HTML fragments,
			//		and it allows for the innerHTML to be read for the first node in the node list.
			//		Since dojo/NodeList-html already took the "html" name, this method is called
			//		"innerHTML". However, if dojo/NodeList-html has not been loaded yet, this
			//		module will define an "html" method that can be used instead. Be careful if you
			//		are working in an environment where it is possible that dojo/NodeList-html could
			//		have been loaded, since its definition of "html" will take precedence.
			//		The nodes represented by the value argument will be cloned if more than one
			//		node is in this NodeList. The nodes in this NodeList are returned in the "set"
			//		usage of this method, not the HTML that was inserted.
			// returns:
			//		if no value is passed, the result is String, the innerHTML of the first node.
			//		If a value is passed, the return is this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo"></div>
			//	|	<div id="bar"></div>
			//		This code inserts `<p>Hello World</p>` into both divs:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("div").innerHTML("<p>Hello World</p>");
			//	| 	});
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars</p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		This code returns `<p>Hello Mars</p>`:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		var message = query("div").innerHTML();
			//	| 	});
			if(arguments.length){
				return this.addContent(value, "only"); // dojo/NodeList
			}else{
				return this[0].innerHTML; //String
			}
		},

		/*=====
		html: function(value){
			// summary:
			//		see the information for "innerHTML". "html" is an alias for "innerHTML", but is
			//		only defined if dojo/NodeList-html has not been loaded.
			// description:
			//		An alias for the "innerHTML" method, but only defined if there is not an existing
			//		"html" method on dojo/NodeList. Be careful if you are working in an environment
			//		where it is possible that dojo/NodeList-html could have been loaded, since its
			//		definition of "html" will take precedence. If you are not sure if dojo/NodeList-html
			//		could be loaded, use the "innerHTML" method.
			// value: String|DOMNode|NodeList?
			//		The HTML fragment to use as innerHTML. If value is not passed, then the innerHTML
			//		of the first element in this NodeList is returned.
			// returns:
			//		if no value is passed, the result is String, the innerHTML of the first node.
			//		If a value is passed, the return is this dojo/NodeList
			return; // dojo/NodeList|String
		},
		=====*/

		text: function(/*String*/value){
			// summary:
			//		Allows setting the text value of each node in the NodeList,
			//		if there is a value passed in.  Otherwise, returns the text value for all the
			//		nodes in the NodeList in one string.
			// example:
			//		Assume a DOM created by this markup:
			//	|	<div id="foo"></div>
			//	|	<div id="bar"></div>
			//		This code inserts "Hello World" into both divs:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"], function(query){
			//	|		query("div").text("Hello World");
			//	| 	});
			// example:
			//		Assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars <span>today</span></p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		This code writes "Hello Mars todayHello World" to the console:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"], function(query){
			//	|		console.log(query("div").text());
			//	| 	});
			// returns:
			//		If no value is passed, the result is String: the text value of the nodes.
			//		If a value is passed, the return is this dojo/NodeList.
			if(arguments.length){
				for(var i = 0, node; node = this[i]; i++){
					if(node.nodeType == 1){
						attr.set(node, 'textContent', value);
					}
				}
				return this; // dojo/NodeList
			}else{
				var result = "";
				for(i = 0; node = this[i]; i++){
					result += attr.get(node, 'textContent');
				}
				return result; //String
			}
		},

		val: function(/*String||Array*/value){
			// summary:
			//		If a value is passed, allows setting the value property of form elements in this
			//		NodeList, or properly selecting/checking the right value for radio/checkbox/select
			//		elements. If no value is passed, the value of the first node in this NodeList
			//		is returned.
			// returns:
			//		if no value is passed, the result is String or an Array, for the value of the
			//		first node.
			//		If a value is passed, the return is this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<input type="text" value="foo">
			//	|	<select multiple>
			//	|		<option value="red" selected>Red</option>
			//	|		<option value="blue">Blue</option>
			//	|		<option value="yellow" selected>Yellow</option>
			//	|	</select>
			//		This code gets and sets the values for the form fields above:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query('[type="text"]').val(); //gets value foo
			//	|		query('[type="text"]').val("bar"); //sets the input's value to "bar"
			// 	|		query("select").val() //gets array value ["red", "yellow"]
			// 	|		query("select").val(["blue", "yellow"]) //Sets the blue and yellow options to selected.
			//	| 	});

			//Special work for input elements.
			if(arguments.length){
				var isArray = lang.isArray(value);
				for(var index = 0, node; node = this[index]; index++){
					var name = node.nodeName.toUpperCase();
					var type = node.type;
					var newValue = isArray ? value[index] : value;

					if(name == "SELECT"){
						var opts = node.options;
						for(var i = 0; i < opts.length; i++){
							var opt = opts[i];
							if(node.multiple){
								opt.selected = (array.indexOf(value, opt.value) != -1);
							}else{
								opt.selected = (opt.value == newValue);
							}
						}
					}else if(type == "checkbox" || type == "radio"){
						node.checked = (node.value == newValue);
					}else{
						node.value = newValue;
					}
				}
				return this; // dojo/NodeList
			}else{
				//node already declared above.
				node = this[0];
				if(!node || node.nodeType != 1){
					return undefined;
				}
				value = node.value || "";
				if(node.nodeName.toUpperCase() == "SELECT" && node.multiple){
					//A multivalued selectbox. Do the pain.
					value = [];
					//opts declared above in if block.
					opts = node.options;
					//i declared above in if block;
					for(i = 0; i < opts.length; i++){
						//opt declared above in if block
						opt = opts[i];
						if(opt.selected){
							value.push(opt.value);
						}
					}
					if(!value.length){
						value = null;
					}
				}
				return value; //String||Array
			}
		},

		append: function(/*String||DOMNode||NodeList*/content){
			// summary:
			//		appends the content to every node in the NodeList.
			// description:
			//		The content will be cloned if the length of NodeList
			//		is greater than 1. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the appended content.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars</p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("div").append("<span>append</span>");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div id="foo"><p>Hello Mars</p><span>append</span></div>
			//	|	<div id="bar"><p>Hello World</p><span>append</span></div>
			return this.addContent(content, "last"); // dojo/NodeList
		},

		appendTo: function(/*String*/query){
			// summary:
			//		appends nodes in this NodeList to the nodes matched by
			//		the query passed to appendTo.
			// description:
			//		The nodes in this NodeList will be cloned if the query
			//		matches more than one element. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the matched nodes from the query.
			// example:
			//		assume a DOM created by this markup:
			//	|	<span>append</span>
			//	|	<p>Hello Mars</p>
			//	|	<p>Hello World</p>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("span").appendTo("p");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<p>Hello Mars<span>append</span></p>
			//	|	<p>Hello World<span>append</span></p>
			return this._placeMultiple(query, "last"); // dojo/NodeList
		},

		prepend: function(/*String||DOMNode||NodeList*/content){
			// summary:
			//		prepends the content to every node in the NodeList.
			// description:
			//		The content will be cloned if the length of NodeList
			//		is greater than 1. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the appended content.
			//		assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars</p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("div").prepend("<span>prepend</span>");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div id="foo"><span>prepend</span><p>Hello Mars</p></div>
			//	|	<div id="bar"><span>prepend</span><p>Hello World</p></div>
			return this.addContent(content, "first"); // dojo/NodeList
		},

		prependTo: function(/*String*/query){
			// summary:
			//		prepends nodes in this NodeList to the nodes matched by
			//		the query passed to prependTo.
			// description:
			//		The nodes in this NodeList will be cloned if the query
			//		matches more than one element. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the matched nodes from the query.
			// example:
			//		assume a DOM created by this markup:
			//	|	<span>prepend</span>
			//	|	<p>Hello Mars</p>
			//	|	<p>Hello World</p>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("span").prependTo("p");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<p><span>prepend</span>Hello Mars</p>
			//	|	<p><span>prepend</span>Hello World</p>
			return this._placeMultiple(query, "first"); // dojo/NodeList
		},

		after: function(/*String||Element||NodeList*/content){
			// summary:
			//		Places the content after every node in the NodeList.
			// description:
			//		The content will be cloned if the length of NodeList
			//		is greater than 1. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the appended content.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars</p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("div").after("<span>after</span>");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div id="foo"><p>Hello Mars</p></div><span>after</span>
			//	|	<div id="bar"><p>Hello World</p></div><span>after</span>
			return this.addContent(content, "after"); // dojo/NodeList
		},

		insertAfter: function(/*String*/query){
			// summary:
			//		The nodes in this NodeList will be placed after the nodes
			//		matched by the query passed to insertAfter.
			// description:
			//		The nodes in this NodeList will be cloned if the query
			//		matches more than one element. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the matched nodes from the query.
			// example:
			//		assume a DOM created by this markup:
			//	|	<span>after</span>
			//	|	<p>Hello Mars</p>
			//	|	<p>Hello World</p>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("span").insertAfter("p");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<p>Hello Mars</p><span>after</span>
			//	|	<p>Hello World</p><span>after</span>
			return this._placeMultiple(query, "after"); // dojo/NodeList
		},

		before: function(/*String||DOMNode||NodeList*/content){
			// summary:
			//		Places the content before every node in the NodeList.
			// description:
			//		The content will be cloned if the length of NodeList
			//		is greater than 1. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the appended content.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div id="foo"><p>Hello Mars</p></div>
			//	|	<div id="bar"><p>Hello World</p></div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("div").before("<span>before</span>");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<span>before</span><div id="foo"><p>Hello Mars</p></div>
			//	|	<span>before</span><div id="bar"><p>Hello World</p></div>
			return this.addContent(content, "before"); // dojo/NodeList
		},

		insertBefore: function(/*String*/query){
			// summary:
			//		The nodes in this NodeList will be placed after the nodes
			//		matched by the query passed to insertAfter.
			// description:
			//		The nodes in this NodeList will be cloned if the query
			//		matches more than one element. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		dojo/NodeList, the nodes currently in this NodeList will be returned,
			//		not the matched nodes from the query.
			// example:
			//		assume a DOM created by this markup:
			//	|	<span>before</span>
			//	|	<p>Hello Mars</p>
			//	|	<p>Hello World</p>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("span").insertBefore("p");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<span>before</span><p>Hello Mars</p>
			//	|	<span>before</span><p>Hello World</p>
			return this._placeMultiple(query, "before"); // dojo/NodeList
		},

		/*=====
		remove: function(simpleFilter){
			// summary:
			//		alias for dojo/NodeList's orphan method. Removes elements
			//		in this list that match the simple filter from their parents
			//		and returns them as a new NodeList.
			// simpleFilter: String
			//		single-expression CSS rule. For example, ".thinger" or
			//		"#someId[attrName='value']" but not "div > span". In short,
			//		anything which does not invoke a descent to evaluate but
			//		can instead be used to test a single node is acceptable.

			return; // dojo/NodeList
		},
		=====*/
		remove: NodeList.prototype.orphan,

		wrap: function(/*String||DOMNode*/html){
			// summary:
			//		Wrap each node in the NodeList with html passed to wrap.
			// description:
			//		html will be cloned if the NodeList has more than one
			//		element. Only DOM nodes are cloned, not any attached
			//		event handlers.
			// returns:
			//		the nodes in the current NodeList will be returned,
			//		not the nodes from html argument.
			// example:
			//		assume a DOM created by this markup:
			//	|	<b>one</b>
			//	|	<b>two</b>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query("b").wrap("<div><span></span></div>");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div><span><b>one</b></span></div>
			//	|	<div><span><b>two</b></span></div>
			if(this[0]){
				html = makeWrapNode(html, this[0]);

				//Now cycle through the elements and do the insertion.
				for(var i = 0, node; node = this[i]; i++){
					//Always clone because if html is used to hold one of
					//the "this" nodes, then on the clone of html it will contain
					//that "this" node, and that would be bad.
					var clone = this._cloneNode(html);
					if(node.parentNode){
						node.parentNode.replaceChild(clone, node);
					}
					//Find deepest element and insert old node in it.
					var insertion = getWrapInsertion(clone);
					insertion.appendChild(node);
				}
			}
			return this; // dojo/NodeList
		},

		wrapAll: function(/*String||DOMNode*/html){
			// summary:
			//		Insert html where the first node in this NodeList lives, then place all
			//		nodes in this NodeList as the child of the html.
			// returns:
			//		the nodes in the current NodeList will be returned,
			//		not the nodes from html argument.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query(".red").wrapAll('<div class="allRed"></div>');
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div class="container">
			// 	|		<div class="allRed">
			// 	|			<div class="red">Red One</div>
			// 	|			<div class="red">Red Two</div>
			// 	|		</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			if(this[0]){
				html = makeWrapNode(html, this[0]);

				//Place the wrap HTML in place of the first node.
				this[0].parentNode.replaceChild(html, this[0]);

				//Now cycle through the elements and move them inside
				//the wrap.
				var insertion = getWrapInsertion(html);
				for(var i = 0, node; node = this[i]; i++){
					insertion.appendChild(node);
				}
			}
			return this; // dojo/NodeList
		},

		wrapInner: function(/*String||DOMNode*/html){
			// summary:
			//		For each node in the NodeList, wrap all its children with the passed in html.
			// description:
			//		html will be cloned if the NodeList has more than one
			//		element. Only DOM nodes are cloned, not any attached
			//		event handlers.
			// returns:
			//		the nodes in the current NodeList will be returned,
			//		not the nodes from html argument.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query(".red").wrapInner('<span class="special"></span>');
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div class="container">
			// 	|		<div class="red"><span class="special">Red One</span></div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red"><span class="special">Red Two</span></div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			if(this[0]){
				html = makeWrapNode(html, this[0]);
				for(var i = 0; i < this.length; i++){
					//Always clone because if html is used to hold one of
					//the "this" nodes, then on the clone of html it will contain
					//that "this" node, and that would be bad.
					var clone = this._cloneNode(html);

					//Need to convert the childNodes to an array since wrapAll modifies the
					//DOM and can change the live childNodes NodeList.
					this._wrap(lang._toArray(this[i].childNodes), null, this._NodeListCtor).wrapAll(clone);
				}
			}
			return this; // dojo/NodeList
		},

		replaceWith: function(/*String||DOMNode||NodeList*/content){
			// summary:
			//		Replaces each node in ths NodeList with the content passed to replaceWith.
			// description:
			//		The content will be cloned if the length of NodeList
			//		is greater than 1. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		The nodes currently in this NodeList will be returned, not the replacing content.
			//		Note that the returned nodes have been removed from the DOM.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query(".red").replaceWith('<div class="green">Green</div>');
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div class="container">
			// 	|		<div class="green">Green</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="green">Green</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			content = this._normalize(content, this[0]);
			for(var i = 0, node; node = this[i]; i++){
				this._place(content, node, "before", i > 0);
				node.parentNode.removeChild(node);
			}
			return this; // dojo/NodeList
		},

		replaceAll: function(/*String*/query){
			// summary:
			//		replaces nodes matched by the query passed to replaceAll with the nodes
			//		in this NodeList.
			// description:
			//		The nodes in this NodeList will be cloned if the query
			//		matches more than one element. Only the DOM nodes are cloned, not
			//		any attached event handlers.
			// returns:
			//		The nodes currently in this NodeList will be returned, not the matched nodes
			//		from the query. The nodes currently in this NodeLIst could have
			//		been cloned, so the returned NodeList will include the cloned nodes.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query(".red").replaceAll(".blue");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div class="container">
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="spacer">___</div>
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="red">Red Two</div>
			//	|	</div>
			var nl = dquery(query);
			var content = this._normalize(this, this[0]);
			for(var i = 0, node; node = nl[i]; i++){
				this._place(content, node, "before", i > 0);
				node.parentNode.removeChild(node);
			}
			return this; // dojo/NodeList
		},

		clone: function(){
			// summary:
			//		Clones all the nodes in this NodeList and returns them as a new NodeList.
			// description:
			//		Only the DOM nodes are cloned, not any attached event handlers.
			// returns:
			//		a cloned set of the original nodes.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-manipulate"
			//	|	], function(query){
			//	|		query(".red").clone().appendTo(".container");
			//	| 	});
			//		Results in this DOM structure:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="red">Red Two</div>
			//	|	</div>

			//TODO: need option to clone events?
			var ary = [];
			for(var i = 0; i < this.length; i++){
				ary.push(this._cloneNode(this[i]));
			}
			return this._wrap(ary, this, this._NodeListCtor); // dojo/NodeList
		}
	});

	//set up html method if one does not exist
	if(!NodeList.prototype.html){
		NodeList.prototype.html = NodeList.prototype.innerHTML;
	}

	return NodeList;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/request/iframe.js":
/*!*********************************************!*\
  !*** ./node_modules/dojo/request/iframe.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__.dj.m(module),
	__webpack_require__.dj.c(module.i),
	__webpack_require__(/*! ./watch */ "./node_modules/dojo/request/watch.js"),
	__webpack_require__(/*! ./util */ "./node_modules/dojo/request/util.js"),
	__webpack_require__(/*! ./handlers */ "./node_modules/dojo/request/handlers.js"),
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../io-query */ "./node_modules/dojo/io-query.js"),
	__webpack_require__(/*! ../query */ "./node_modules/dojo/query.js"),
	__webpack_require__(/*! ../has */ "./node_modules/dojo/has.js"),
	__webpack_require__(/*! ../dom */ "./node_modules/dojo/dom.js"),
	__webpack_require__(/*! ../dom-construct */ "./node_modules/dojo/dom-construct.js"),
	__webpack_require__(/*! ../_base/window */ "./node_modules/dojo/_base/window.js"),
	// NodeList enhancement modules;
	// must be loaded (but no reference needed)
	__webpack_require__(/*! ../NodeList-dom */ "./node_modules/dojo/NodeList-dom.js"),
        __webpack_require__(/*! ../NodeList-manipulate */ "./node_modules/dojo/NodeList-manipulate.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(module, require, watch, util, handlers, lang, ioQuery, query, has, dom, domConstruct, win){
	var mid = module.i.replace(/[\/\.\-]/g, '_'),
		onload = mid + '_onload';

	if(!win.global[onload]){
		win.global[onload] = function(){
			var dfd = iframe._currentDfd;
			if(!dfd){
				iframe._fireNextRequest();
				return;
			}

			var response = dfd.response,
				options = response.options,
				formNode = dom.byId(options.form) || dfd._tmpForm;

			if(formNode){
				// remove all the hidden content inputs
				var toClean = dfd._contentToClean;
				for(var i=0; i<toClean.length; i++){
					var key = toClean[i];
					//Need to cycle over all nodes since we may have added
					//an array value which means that more than one node could
					//have the same .name value.
					for(var j=0; j<formNode.childNodes.length; j++){
						var childNode = formNode.childNodes[j];
						if(childNode.name === key){
							domConstruct.destroy(childNode);
							break;
						}
					}
				}

				// restore original action + target
				dfd._originalAction && formNode.setAttribute('action', dfd._originalAction);
				if(dfd._originalMethod){
					formNode.setAttribute('method', dfd._originalMethod);
					formNode.method = dfd._originalMethod;
				}
				if(dfd._originalTarget){
					formNode.setAttribute('target', dfd._originalTarget);
					formNode.target = dfd._originalTarget;
				}
			}

			if(dfd._tmpForm){
				domConstruct.destroy(dfd._tmpForm);
				delete dfd._tmpForm;
			}

			dfd._finished = true;
		};
	}

	function create(name, onloadstr, uri){
		if(win.global[name]){
			return win.global[name];
		}

		if(win.global.frames[name]){
			return win.global.frames[name];
		}

		if(!uri){
			if(has('config-useXDomain') && !has('config-dojoBlankHtmlUrl')){
				console.warn('dojo/request/iframe: When using cross-domain Dojo builds,' +
					' please save dojo/resources/blank.html to your domain and set dojoConfig.dojoBlankHtmlUrl' +
					' to the path on your domain to blank.html');
			}
			uri = (has('config-dojoBlankHtmlUrl')||require.toUrl('dojo/resources/blank.html'));
		}

		var frame = domConstruct.place(
			'<iframe id="'+name+'" name="'+name+'" src="'+uri+'" onload="'+onloadstr+
			'" style="position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden">',
			win.body());

		win.global[name] = frame;

		return frame;
	}

	function setSrc(_iframe, src, replace){
		var frame = win.global.frames[_iframe.name];

		if(frame.contentWindow){
			// We have an iframe node instead of the window
			frame = frame.contentWindow;
		}

		try{
			if(!replace){
				frame.location = src;
			}else{
				frame.location.replace(src);
			}
		}catch(e){
			console.log('dojo/request/iframe.setSrc: ', e);
		}
	}

	function doc(iframeNode){
		if(iframeNode.contentDocument){
			return iframeNode.contentDocument;
		}
		var name = iframeNode.name;
		if(name){
			var iframes = win.doc.getElementsByTagName('iframe');
			if(iframeNode.document && iframes[name].contentWindow && iframes[name].contentWindow.document){
				return iframes[name].contentWindow.document;
			}else if(win.doc.frames[name] && win.doc.frames[name].document){
				return win.doc.frames[name].document;
			}
		}
		return null;
	}

	function createForm(){
		return domConstruct.create('form', {
			name: mid + '_form',
			style: {
				position: 'absolute',
				top: '-1000px',
				left: '-1000px'
			}
		}, win.body());
	}

	function fireNextRequest(){
		// summary:
		//		Internal method used to fire the next request in the queue.
		var dfd;
		try{
			if(iframe._currentDfd || !iframe._dfdQueue.length){
				return;
			}
			do{
				dfd = iframe._currentDfd = iframe._dfdQueue.shift();
			}while(dfd && (dfd.canceled || (dfd.isCanceled && dfd.isCanceled())) && iframe._dfdQueue.length);

			if(!dfd || dfd.canceled || (dfd.isCanceled && dfd.isCanceled())){
				iframe._currentDfd = null;
				return;
			}

			var response = dfd.response,
				options = response.options,
				c2c = dfd._contentToClean = [],
				formNode = dom.byId(options.form),
				notify = util.notify,
				data = options.data || null,
				queryStr;

			if(!dfd._legacy && options.method === 'POST' && !formNode){
				formNode = dfd._tmpForm = createForm();
			}else if(options.method === 'GET' && formNode && response.url.indexOf('?') > -1){
				queryStr = response.url.slice(response.url.indexOf('?') + 1);
				data = lang.mixin(ioQuery.queryToObject(queryStr), data);
			}

			if(formNode){
				if(!dfd._legacy){
					var parentNode = formNode;
					do{
						parentNode = parentNode.parentNode;
					}while(parentNode && parentNode !== win.doc.documentElement);

					// Append the form node or some browsers won't work
					if(!parentNode){
						formNode.style.position = 'absolute';
						formNode.style.left = '-1000px';
						formNode.style.top = '-1000px';
						win.body().appendChild(formNode);
					}

					if(!formNode.name){
						formNode.name = mid + '_form';
					}
				}

				// if we have things in data, we need to add them to the form
				// before submission
				if(data){
					var createInput = function(name, value){
						domConstruct.create('input', {
							type: 'hidden',
							name: name,
							value: value
						}, formNode);
						c2c.push(name);
					};
					for(var x in data){
						var val = data[x];
						if(lang.isArray(val) && val.length > 1){
							for(var i=0; i<val.length; i++){
								createInput(x, val[i]);
							}
						}else{
							// Explicitly search for nodes in the dom tree
							// using formNode[x] may access attributes of the
							// form node itself, e.g. formNode['action']
							var n = query("input[name='"+x+"']", formNode);

							// Not found if indexOf == -1
							if(n.indexOf() == -1){
								createInput(x, val);
							}else{
								n.val(val);
							}
						}
					}
				}

				//IE requires going through getAttributeNode instead of just getAttribute in some form cases,
				//so use it for all.  See #2844
				var actionNode = formNode.getAttributeNode('action'),
					methodNode = formNode.getAttributeNode('method'),
					targetNode = formNode.getAttributeNode('target');

				if(response.url){
					dfd._originalAction = actionNode ? actionNode.value : null;
					if(actionNode){
						actionNode.value = response.url;
					}else{
						formNode.setAttribute('action', response.url);
					}
				}

				if(!dfd._legacy){
					dfd._originalMethod = methodNode ? methodNode.value : null;
					if(methodNode){
						methodNode.value = options.method;
					}else{
						formNode.setAttribute('method', options.method);
					}
				}else{
					if(!methodNode || !methodNode.value){
						if(methodNode){
							methodNode.value = options.method;
						}else{
							formNode.setAttribute('method', options.method);
						}
					}
				}

				dfd._originalTarget = targetNode ? targetNode.value : null;
				if(targetNode){
					targetNode.value = iframe._iframeName;
				}else{
					formNode.setAttribute('target', iframe._iframeName);
				}
				formNode.target = iframe._iframeName;

				notify && notify.emit('send', response, dfd.promise.cancel);
				iframe._notifyStart(response);
				formNode.submit();
			}else{
				// otherwise we post a GET string by changing URL location for the
				// iframe

				var extra = '';
				if(response.options.data){
					extra = response.options.data;
					if(typeof extra !== 'string'){
						extra = ioQuery.objectToQuery(extra);
					}
				}
				var tmpUrl = response.url + (response.url.indexOf('?') > -1 ? '&' : '?') + extra;
				notify && notify.emit('send', response, dfd.promise.cancel);
				iframe._notifyStart(response);
				iframe.setSrc(iframe._frame, tmpUrl, true);
			}
		}catch(e){
			dfd.reject(e);
		}
	}

	// dojo/request/watch handlers
	function isValid(response){
		return !this.isFulfilled();
	}
	function isReady(response){
		return !!this._finished;
	}
	function handleResponse(response, error){
		if(!error){
			try{
				var options = response.options,
					doc = iframe.doc(iframe._frame),
					handleAs = options.handleAs;

				if(handleAs !== 'html'){
					if(handleAs === 'xml'){
						// IE6-8 have to parse the XML manually. See http://bugs.dojotoolkit.org/ticket/6334
						if(doc.documentElement.tagName.toLowerCase() === 'html'){
							query('a', doc.documentElement).orphan();
							var xmlText = doc.documentElement.innerText || doc.documentElement.textContent;
							xmlText = xmlText.replace(/>\s+</g, '><');
							response.text = lang.trim(xmlText);
						}else{
							response.data = doc;
						}
					}else{
						// 'json' and 'javascript' and 'text'
						response.text = doc.getElementsByTagName('textarea')[0].value; // text
					}
					handlers(response);
				}else{
					response.data = doc;
				}
			}catch(e){
				error = e;
			}
		}

		if(error){
			this.reject(error);
		}else if(this._finished){
			this.resolve(response);
		}else{
			this.reject(new Error('Invalid dojo/request/iframe request state'));
		}
	}
	function last(response){
		this._callNext();
	}

	var defaultOptions = {
		method: 'POST'
	};
	function iframe(url, options, returnDeferred){
		var response = util.parseArgs(url, util.deepCreate(defaultOptions, options), true);
		url = response.url;
		options = response.options;

		if(options.method !== 'GET' && options.method !== 'POST'){
			throw new Error(options.method + ' not supported by dojo/request/iframe');
		}

		if(!iframe._frame){
			iframe._frame = iframe.create(iframe._iframeName, onload + '();');
		}

		var dfd = util.deferred(response, null, isValid, isReady, handleResponse, last);
		dfd._callNext = function(){
			if(!this._calledNext){
				this._calledNext = true;
				iframe._currentDfd = null;
				iframe._fireNextRequest();
			}
		};
		dfd._legacy = returnDeferred;

		iframe._dfdQueue.push(dfd);
		iframe._fireNextRequest();

		watch(dfd);

		return returnDeferred ? dfd : dfd.promise;
	}

	/*=====
	iframe = function(url, options){
		// summary:
		//		Sends a request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__Options?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	iframe.__BaseOptions = declare(request.__BaseOptions, {
		// form: DOMNode?
		//		A form node to use to submit data to the server.
		// data: String|Object?
		//		Data to transfer. When making a GET request, this will
		//		be converted to key=value parameters and appended to the
		//		URL.
	});
	iframe.__MethodOptions = declare(null, {
		// method: String?
		//		The HTTP method to use to make the request. Must be
		//		uppercase. Only `"GET"` and `"POST"` are accepted.
		//		Default is `"POST"`.
	});
	iframe.__Options = declare([iframe.__BaseOptions, iframe.__MethodOptions]);

	iframe.get = function(url, options){
		// summary:
		//		Send an HTTP GET request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	iframe.post = function(url, options){
		// summary:
		//		Send an HTTP POST request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	=====*/
	iframe.create = create;
	iframe.doc = doc;
	iframe.setSrc = setSrc;

	// TODO: Make these truly private in 2.0
	iframe._iframeName = mid + '_IoIframe';
	iframe._notifyStart = function(){};
	iframe._dfdQueue = [];
	iframe._currentDfd = null;
	iframe._fireNextRequest = fireNextRequest;

	util.addCommonMethods(iframe, ['GET', 'POST']);

	return iframe;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);