(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dojox/treemap/TreeMap":"./node_modules/dojox/treemap/TreeMap.js",
	"dojox/treemap/_utils":"./node_modules/dojox/treemap/_utils.js",
	"dojox/widget/Selection":"./node_modules/dojox/widget/Selection.js",
	"dojox/widget/_Invalidating":"./node_modules/dojox/widget/_Invalidating.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "./node_modules/dojox/treemap/TreeMap.js":
/*!***********************************************!*\
  !*** ./node_modules/dojox/treemap/TreeMap.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/event */ "./node_modules/dojo/_base/event.js"), __webpack_require__(/*! dojo/_base/Color */ "./node_modules/dojo/_base/Color.js"), __webpack_require__(/*! dojo/touch */ "./node_modules/dojo/touch.js"),
		__webpack_require__(/*! dojo/when */ "./node_modules/dojo/when.js"), __webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"), __webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), __webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), __webpack_require__(/*! dojo/dom-geometry */ "./node_modules/dojo/dom-geometry.js"), __webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), __webpack_require__(/*! dojo/dom-style */ "./node_modules/dojo/dom-style.js"),
		__webpack_require__(/*! ./_utils */ "./node_modules/dojox/treemap/_utils.js"), __webpack_require__(/*! dijit/_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"), __webpack_require__(/*! dojox/widget/_Invalidating */ "./node_modules/dojox/widget/_Invalidating.js"), __webpack_require__(/*! dojox/widget/Selection */ "./node_modules/dojox/widget/Selection.js"),
		__webpack_require__(/*! dojo/_base/sniff */ "./node_modules/dojo/_base/sniff.js"), __webpack_require__(/*! dojo/uacss */ "./node_modules/dojo/uacss.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(arr, lang, declare, event, Color, touch, when, on, query, domConstruct, domGeom, domClass, domStyle,
		utils, _WidgetBase, _Invalidating, Selection, has){

	return declare("dojox.treemap.TreeMap", [_WidgetBase, _Invalidating, Selection], {
		// summary:
		//		A treemap widget.
		
		baseClass: "dojoxTreeMap",
		
		// store: dojo/store/api/Store
		//		The store that contains the items to display.
		store: null,
		
		// query: Object
		//		A query that can be passed to when querying the store.
		query: {},

		// queryOptions: dojo/store/api/Store.QueryOptions?
		//		Options to be applied when querying the store.
		queryOptions: null,
		
		// itemToRenderer: [protected] Object
		//		The associated array item to renderer list.
		itemToRenderer: null,

		// Data
		_dataChanged: false,
	
		// rootItem: Object
		//		The root item of the treemap, that is the first visible item.
		//		If null the entire treemap hierarchy is shown.	
		//		Default is null.
		rootItem: null,
		_rootItemChanged: false,
	
		// tooltipAttr: String
		//		The attribute of the store item that contains the tooltip text of a treemap cell.	
		//		Default is "". 
		tooltipAttr: "",
	
		// areaAttr: String
		//		The attribute of the store item that contains the data used to compute the area of a treemap cell.	
		//		Default is "". 
		areaAttr: "",
		_areaChanged: false,
	
		// labelAttr: String
		//		The attribute of the store item that contains the label of a treemap cell.	
		//		Default is "label". 
		labelAttr: "label",
		
		// labelThreshold: Number
		//		The starting depth level at which the labels are not displayed anymore on cells.  
		//		If NaN no threshold is applied. The depth is the visual depth of the items on the screen not
		//		in the data (i.e. after drill down the depth of an item might change).
		//		Default is NaN.
		labelThreshold: NaN, 
		
		// colorAttr: String
		//		The attribute of the store item that contains the data used to compute the color of a treemap cell.
		//		Default is "". 
		colorAttr: "",
		// colorModel: dojox/color/api/ColorModel
		//		The optional color model that converts data to color.	
		//		Default is null.
		colorModel: null,
		_coloringChanged: false,
		
		// groupAttrs: Array
		//		An array of data attributes used to group data in the treemap.	
		//		Default is []. 
		groupAttrs: [],

		// groupFuncs: Array
		//		An array of grouping functions used to group data in the treemap.
		//		When null, groupAttrs is to compute grouping functions.
		//		Default is null.
		groupFuncs: null,

        _groupFuncs: null,
		_groupingChanged: false,
	
		constructor: function(){
			this.itemToRenderer = {};
			this.invalidatingProperties = [ "colorModel", "groupAttrs", "groupFuncs", "areaAttr", "areaFunc",
				"labelAttr", "labelFunc", "labelThreshold", "tooltipAttr", "tooltipFunc",
				"colorAttr", "colorFunc", "rootItem" ];
		},
		
		getIdentity: function(item){
			return item.__treeID?item.__treeID:this.store.getIdentity(item);
		},
	
		resize: function(box){
			if(box){
				domGeom.setMarginBox(this.domNode, box);
				this.invalidateRendering();						
			}
		},
		
		postCreate: function(){
			this.inherited(arguments);
			this.own(on(this.domNode, "mouseover", lang.hitch(this, this._onMouseOver)));
			this.own(on(this.domNode, "mouseout", lang.hitch(this, this._onMouseOut)));
			this.own(on(this.domNode, touch.release, lang.hitch(this, this._onMouseUp)));
			this.domNode.setAttribute("role", "presentation");
			this.domNode.setAttribute("aria-label", "treemap");
		},
		
		buildRendering: function(){
			this.inherited(arguments);
			this.refreshRendering();
		},
	
		refreshRendering: function(){
			var forceCreate = false;
	
			if(this._dataChanged){
				this._dataChanged = false;
				this._groupingChanged = true;
				this._coloringChanged = true;
			}
	
			if(this._groupingChanged){
				this._groupingChanged = false;
				this._set("rootItem", null);
				this._updateTreeMapHierarchy();
				forceCreate = true;
			}
	
			if(this._rootItemChanged){
				this._rootItemChanged = false;
				forceCreate = true;
			}
	
			if(this._coloringChanged){
				this._coloringChanged = false;			
				if(this.colorModel != null && this._data != null && this.colorModel.initialize){
					this.colorModel.initialize(this._data, lang.hitch(this, function(item){
						return this.colorFunc(item, this.store);
					}));
				}
			}
	
			if(this._areaChanged){
				this._areaChanged = false;
				this._removeAreaForGroup();
			}
	
			if(this.domNode == undefined || this._items == null){
				return;
			}
			
			if(forceCreate){
				domConstruct.empty(this.domNode);
			}
	
			var rootItem = this.rootItem, rootParentItem;
	
			if(rootItem != null){
				var rootItemRenderer = this._getRenderer(rootItem);
				if(rootItemRenderer){
					if(this._isLeaf(rootItem)){
						rootItem = rootItemRenderer.parentItem;
					}
					rootParentItem = rootItemRenderer.parentItem;
				}
			}

			var box = domGeom.getMarginBox(this.domNode);
			if(rootItem != null){
				this._buildRenderer(this.domNode, rootParentItem, rootItem, {
					x: box.l, y: box.t, w: box.w, h: box.h
				}, 0, forceCreate);
			}else{
				this._buildChildrenRenderers(this.domNode, rootItem?rootItem:{ __treeRoot: true, children : this._items },
					0, forceCreate, box);
			}
		},
	
		_setRootItemAttr: function(value){
			this._rootItemChanged = true;
			this._set("rootItem", value);
		},
	
		_setStoreAttr: function(value){
			var r;
			if(this._observeHandler){
				this._observeHandler.remove();
				this._observeHandler = null;
			}
			if(value != null){
				var results = value.query(this.query, this.queryOptions);
				if(results.observe){
					// user asked us to observe the store
					this._observeHandler = results.observe(lang.hitch(this, this._updateItem), true);
				}				
				r = when(results, lang.hitch(this, this._initItems));
			}else{
				r = this._initItems([]);
			}
			this._set("store", value);
			return r;
		},
	
		_initItems: function(items){
			this._dataChanged = true;
			this._data = items;
			this.invalidateRendering();
			return items;
		},

		_updateItem: function(item, previousIndex, newIndex){
			if(previousIndex!=-1){
				if(newIndex!=previousIndex){
					// this is a remove or a move
					this._data.splice(previousIndex, 1);
				}else{
					// this is a put, previous and new index identical
					// we don't know what has change exactly with store API
					this._data[newIndex] = item;
				}
			}else if(newIndex!=-1){
				// this is a add 
				this._data.splice(newIndex, 0, item);
			}
			// as we have no details let's refresh everything...
			this._dataChanged = true;			
			this.invalidateRendering();
		},
	
		_setGroupAttrsAttr: function(value){
			this._groupingChanged = true;
			if(this.groupFuncs == null){
				if(value !=null){
					this._groupFuncs = arr.map(value, function(attr){
						return function(item){
							return item[attr];
						};
					});
				}else{
					this._groupFuncs = null;
				}
			}
			this._set("groupAttrs", value);
		},

        _setGroupFuncsAttr: function(value){
			this._groupingChanged = true;
			this._set("groupFuncs", this._groupFuncs = value);
			if(value == null && this.groupAttrs != null){
				this._groupFuncs = arr.map(this.groupAttrs, function(attr){
					return function(item){
						return item[attr];
					};
				});
			}
		},

		_setAreaAttrAttr: function(value){
			this._areaChanged = true;
			this._set("areaAttr", value);
		},
	
		// areaFunc: Function
		//		A function that returns the value use to compute the area of cell from a store item.
		//		Default implementation is using areaAttr.	
		areaFunc: function(/*Object*/ item, /*dojo/store/api/Store*/ store){
			return (this.areaAttr && this.areaAttr.length > 0)?parseFloat(item[this.areaAttr]):1;
		},
		
		_setAreaFuncAttr: function(value){
			this._areaChanged = true;
			this._set("areaFunc", value);
		},

		// labelFunc: Function
		//		A function that returns the label of cell from a store item.	
		//		Default implementation is using labelAttr.
		labelFunc: function(/*Object*/ item, /*dojo/store/api/Store*/ store){
			var label = (this.labelAttr && this.labelAttr.length > 0)?item[this.labelAttr]:null;
			return label?label.toString():null;
		},
	
		// tooltipFunc: Function
		//		A function that returns the tooltip of cell from a store item.	
		//		Default implementation is using tooltipAttr.
		tooltipFunc: function(/*Object*/ item, /*dojo/store/api/Store*/ store){
			var tooltip = (this.tooltipAttr && this.tooltipAttr.length > 0)?item[this.tooltipAttr]:null;
			return tooltip?tooltip.toString():null;
		},

		_setColorModelAttr: function(value){
			this._coloringChanged = true;
			this._set("colorModel", value);
		},
	
		_setColorAttrAttr: function(value){
			this._coloringChanged = true;
			this._set("colorAttr", value);
		},
	
		// colorFunc: Function
		//		A function that returns from a store item the color value of cell or the value used by the 
		//		ColorModel to compute the cell color. If a color must be returned it must be in form accepted by the
		//		dojo/_base/Color constructor. If a value must be returned it must be a Number.
		//		Default implementation is using colorAttr.
		colorFunc: function(/*Object*/ item, /*dojo/store/api/Store*/ store){
			var color = (this.colorAttr && this.colorAttr.length > 0)?item[this.colorAttr]:0;
			if(color == null){
				color = 0;
			}
			return parseFloat(color);
		},
		
		_setColorFuncAttr: function(value){
			this._coloringChanged = true;
			this._set("colorFunc", value);
		},
		
		createRenderer: function(item, level, kind){
			// summary:
			//		Creates an item renderer of the specified kind. This is called only when the treemap
			//		is created. Default implementation always create div nodes. It also sets overflow
			//		to hidden and position to absolute on non-header renderers.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.		
			// kind: String
			//		The specified kind. This can either be "leaf", "group", "header" or "content". 
			// returns: DomNode
			//		The renderer use for the specified kind.
			// tags:
			//		protected					
			var div = domConstruct.create("div");
			if(kind != "header"){
				domStyle.set(div, "overflow", "hidden");
				domStyle.set(div, "position", "absolute");					
			}
			return div;
		},
		
		styleRenderer: function(renderer, item, level, kind){
			// summary:
			//		Style the item renderer. This is called each time the treemap is refreshed.
			//		For leaf items it colors them with the color computed from the color model. 
			//		For other items it does nothing.
			// renderer: DomNode
			//		The item renderer.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.
			// kind: String
			//		The specified kind. This can either be "leaf", "group", "header" or "content". 
			// tags:
			//		protected
			switch(kind){
				case "leaf":
					domStyle.set(renderer, "background", this.getColorForItem(item).toHex());
				case "header":
					var label = this.getLabelForItem(item);
					if(label && (isNaN(this.labelThreshold) || level < this.labelThreshold)){
						renderer.innerHTML = label;
					}else{
						domConstruct.empty(renderer);
					}
					break;
				default:
				
			}				
		},
		
		_updateTreeMapHierarchy: function(){
			if(this._data == null){
				return;
			}
			if(this._groupFuncs != null && this._groupFuncs.length > 0){
				this._items = utils.group(this._data, this._groupFuncs, lang.hitch(this, this._getAreaForItem)).children;
			}else{
				this._items = this._data;
			}
		},
	
		_removeAreaForGroup: function(item){
			var children;
			if(item != null){
				if(item.__treeValue){
					delete item.__treeValue;
					children = item.children;
				}else{
					// not a grouping item
					return;
				}
			}else{
				children = this._items;
			}
			if(children){
				for(var i = 0; i < children.length; ++i){
					this._removeAreaForGroup(children[i]);
				}
			}
		},
	
		_getAreaForItem: function(item){
			var area = this.areaFunc(item, this.store);
			return isNaN(area) ? 0 : area;
		},

		_computeAreaForItem: function(item){
			var value;
			if(item.__treeID){ // group
				value = item.__treeValue;
				if(!value){
					value = 0;
					var children = item.children;
					for(var i = 0; i < children.length; ++i){
						value += this._computeAreaForItem(children[i]);
					}
					item.__treeValue = value;
				}
			}else{
				value = this._getAreaForItem(item);
			}
			return value;
		},
	
		getColorForItem: function(item){
			// summary:
			//		Returns the color for a given item. This either use the colorModel if not null
			//		or just the result of the colorFunc.
			// item: Object
			//		The data item.
			// tags:
			//		protected	
			var value = this.colorFunc(item, this.store);
			if(this.colorModel != null){
				return this.colorModel.getColor(value);
			}else{
				return new Color(value);
			}
		},
	
		getLabelForItem: function(item){
			// summary:
			//		Returns the label for a given item.
			// item: Object
			//		The data item.
			// tags:
			//		protected	
			return item.__treeName?item.__treeName:this.labelFunc(item, this.store);
		},
	
		_buildChildrenRenderers: function(domNode, item, level, forceCreate, delta, anim){
			var children = item.children;
			var box = domGeom.getMarginBox(domNode);

			var solution = utils.solve(children, box.w, box.h, lang.hitch(this,
					this._computeAreaForItem), !this.isLeftToRight());
					
			var rectangles = solution.rectangles;
			
			if(delta){
				rectangles = arr.map(rectangles, function(item){
					item.x += delta.l;
					item.y += delta.t;
					return item;
				});
			}
	
			var rectangle;
			for(var j = 0; j < children.length; ++j){
				rectangle = rectangles[j];
				this._buildRenderer(domNode, item, children[j], rectangle, level, forceCreate, anim);
			}
		},
		
		_isLeaf: function(item){
			return !item.children;
		},
		
		_isRoot: function(item){
			return item.__treeRoot;
		},
		
		_getRenderer: function(item, anim, parent){
			if(anim){
				// while animating we do that on a copy of the subtree
				// so we can use our hash object to get to the renderer
				for(var i = 0; i < parent.children.length; ++i){
	        		if(parent.children[i].item == item){
	            		return parent.children[i];
	                }
				}	
			}
			return this.itemToRenderer[this.getIdentity(item)];
		},

		_buildRenderer: function(container, parent, child, rect, level, forceCreate, anim){
			var isLeaf = this._isLeaf(child);
			var renderer = !forceCreate ? this._getRenderer(child, anim, container) : null;
			renderer = isLeaf ? this._updateLeafRenderer(renderer, child, level) : this._updateGroupRenderer(renderer,
					child, level);
			if(forceCreate){
				renderer.level = level;
				renderer.item = child;
				renderer.parentItem = parent;
				this.itemToRenderer[this.getIdentity(child)] = renderer;
				// update its selection status
				this.updateRenderers(child);
			}
	
			// in some cases the computation might be slightly incorrect (0.0000...1)
			// and due to the floor this will cause 1px gaps 
	
			var x = Math.floor(rect.x);
			var y = Math.floor(rect.y);
			var w = Math.floor(rect.x + rect.w + 0.00000000001) - x;
			var h = Math.floor(rect.y + rect.h + 0.00000000001) - y;

			// before sizing put the item inside its parent so that styling
			// is applied and taken into account
			if(forceCreate){
				domConstruct.place(renderer, container);
			}

			domGeom.setMarginBox(renderer, {
				l: x, t: y, w: w, h: h
			});
			
			if(!isLeaf){
				var box = domGeom.getContentBox(renderer);
				this._layoutGroupContent(renderer, box.w, box.h, level + 1, forceCreate, anim);
			}
			
			this.onRendererUpdated({ renderer: renderer, item: child, kind: isLeaf?"leaf":"group", level: level });		
		},
	
		_layoutGroupContent: function(renderer, width, height, level, forceCreate, anim){
			var header = query(".dojoxTreeMapHeader", renderer)[0];
			var content = query(".dojoxTreeMapGroupContent", renderer)[0];
			if(header == null || content == null){
				return;
			}
	
			var box = domGeom.getMarginBox(header);
	
			// If the header is too high, reduce its area
			// and don't show the children..
			if(box.h > height){
				// TODO: this might cause pb when coming back to visibility later
				// as the getMarginBox of the header will keep that value?
				box.h = height;
				domStyle.set(content, "display", "none");
			}else{
				domStyle.set(content, "display", "block");
				domGeom.setMarginBox(content, {
					l: 0, t: box.h, w: width, h: (height - box.h)
				});
				this._buildChildrenRenderers(content, renderer.item, level, forceCreate, null, anim);
			}
	
			domGeom.setMarginBox(header, {
				l: 0, t: 0, w: width, h: box.h
			});
		},
	
		_updateGroupRenderer: function(renderer, item, level){
			// summary:
			//		Update a group renderer. This creates the renderer if not already created,
			//		call styleRender for it and recurse into children.
			// renderer: DomNode
			//		The item renderer.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.
			// tags:
			//		private				
			var forceCreate = renderer == null;
			if(renderer == null){
				renderer = this.createRenderer("div", level, "group");
				domClass.add(renderer, "dojoxTreeMapGroup");
			}
			this.styleRenderer(renderer, item, level, "group");
			var header = query(".dojoxTreeMapHeader", renderer)[0];
			header = this._updateHeaderRenderer(header, item, level);
			if(forceCreate){
				domConstruct.place(header, renderer);
			}
			var content = query(".dojoxTreeMapGroupContent", renderer)[0];
			content = this._updateGroupContentRenderer(content, item, level);
			if(forceCreate){
				domConstruct.place(content, renderer);
			}
			return renderer;
		},
	
		_updateHeaderRenderer: function(renderer, item, level){
			// summary:
			//		Update a leaf renderer. This creates the renderer if not already created,
			//		call styleRender for it and set the label as its innerHTML.
			// renderer: DomNode
			//		The item renderer.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.
			// tags:
			//		private			
			if(renderer == null){
				renderer = this.createRenderer(item, level, "header");
				domClass.add(renderer, "dojoxTreeMapHeader");
				domClass.add(renderer, "dojoxTreeMapHeader_" + level);				
			}
			this.styleRenderer(renderer, item, level, "header");
			return renderer;
		},
	
		_updateLeafRenderer: function(renderer, item, level){
			// summary:
			//		Update a leaf renderer. This creates the renderer if not already created,
			//		call styleRender for it and set the label as its innerHTML.
			// renderer: DomNode
			//		The item renderer.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.
			// tags:
			//		private				
			if(renderer == null){
				renderer = this.createRenderer(item, level, "leaf");
				domClass.add(renderer, "dojoxTreeMapLeaf");
				domClass.add(renderer, "dojoxTreeMapLeaf_" + level);
			}		
			this.styleRenderer(renderer, item, level, "leaf");
			var tooltip = this.tooltipFunc(item, this.store);
			if(tooltip){
				renderer.title = tooltip;
			}
			return renderer;
		},
	
		_updateGroupContentRenderer: function(renderer, item, level){
			// summary:
			//		Update a group content renderer. This creates the renderer if not already created,
			//		and call styleRender for it.
			// renderer:
			//		The item renderer.
			// item: Object
			//		The data item.
			// level: Number
			//		The item depth level.
			// tags:
			//		private				
			if(renderer == null){
				renderer = this.createRenderer(item, level, "content");
				domClass.add(renderer, "dojoxTreeMapGroupContent");
				domClass.add(renderer, "dojoxTreeMapGroupContent_" + level);
			}
			this.styleRenderer(renderer, item, level, "content");
			return renderer;
		},
		
		_getRendererFromTarget: function(target){
			var renderer = target;
			while(renderer != this.domNode && !renderer.item){
				renderer = renderer.parentNode;
			}			
			return renderer;
		},

		_onMouseOver: function(e){
			var renderer = this._getRendererFromTarget(e.target);
			if(renderer.item){	
				var item = renderer.item;
				this._hoveredItem = item;
				this.updateRenderers(item);
				this.onItemRollOver({renderer: renderer, item : item, triggerEvent: e});
			}
		},
	
		_onMouseOut: function(e){
			var renderer = this._getRendererFromTarget(e.target);
			if(renderer.item){	
				var item = renderer.item;
				this._hoveredItem = null;
				this.updateRenderers(item);
				this.onItemRollOut({renderer: renderer, item : item, triggerEvent: e});
			}
		},
		
		_onMouseUp: function(e){
			var renderer = this._getRendererFromTarget(e.target);
			if(renderer.item){
				this.selectFromEvent(e, renderer.item, renderer, true);
				//event.stop(e);
			}
		},
		
		onRendererUpdated: function(){
			// summary:
			//		Called when a renderer has been updated. This is called after creation, styling and sizing for 
			//		each group and leaf renderers. For group renders this is also called after creation of children
			//		renderers. 
			// tags:
			//		callback			
		},
		
		onItemRollOver: function(){
			// summary:
			//		Called when an item renderer has been hovered.
			// tags:
			//		callback			
		},
		
		onItemRollOut: function(){
			// summary:
			//		Called when an item renderer has been rolled out.
			// tags:
			//		callback			
		},		
		
		updateRenderers: function(items){
			// summary:
			//		Updates the renderer(s) that represent the specified item(s).
			// item: Object|Array
			//		The item(s).
			if(!items){
				return;
			}			
			if(!lang.isArray(items)){
				items = [items];
			}
			for(var i=0; i<items.length;i++){
				var item = items[i];
				var renderer = this._getRenderer(item);
				// at init time the renderer might not be ready
				if(!renderer){
					continue;
				}
				var selected = this.isItemSelected(item);
				var ie = has("ie");
				var div;
				if(selected){
					domClass.add(renderer, "dojoxTreeMapSelected");
					if(ie && (has("quirks") || ie < 9)){
						// let's do all of this only if not already done
						div = renderer.previousSibling;
						var rStyle = domStyle.get(renderer);
						if(!div || !domClass.contains(div, "dojoxTreeMapIEHack")){
							div = this.createRenderer(item, -10, "group");
							domClass.add(div, "dojoxTreeMapIEHack");
							domClass.add(div, "dojoxTreeMapSelected");
							domStyle.set(div, {
								position: "absolute",
								overflow: "hidden"
							});
							domConstruct.place(div, renderer, "before");
						}
						// TODO: might fail if different border widths for different sides
						var bWidth = 2*parseInt(domStyle.get(div, "border-width"));
						if(this._isLeaf(item)){
							bWidth -= 1;
						}else{
							bWidth += 1;
						}
						// if we just drill down some renders might not be laid out?
						if(rStyle["left"] != "auto"){
							domStyle.set(div, {
								left: (parseInt(rStyle["left"])+1)+"px",
								top: (parseInt(rStyle["top"])+1)+"px",
								width: (parseInt(rStyle["width"])-bWidth)+"px",
								height: (parseInt(rStyle["height"])-bWidth)+"px"
							});
						}
					}
				}else{
					if(ie && (has("quirks") || ie < 9)){
						div = renderer.previousSibling;
						if(div && domClass.contains(div, "dojoxTreeMapIEHack")){
							div.parentNode.removeChild(div);
						}
					}
					domClass.remove(renderer, "dojoxTreeMapSelected");

				}
				if(this._hoveredItem == item){
					domClass.add(renderer, "dojoxTreeMapHovered");
				}else{
					domClass.remove(renderer, "dojoxTreeMapHovered");
				}
				if(selected || this._hoveredItem == item){
					domStyle.set(renderer, "zIndex", 20);
				}else{
					domStyle.set(renderer, "zIndex", (has("ie")<=7)?0:"auto");
				}
			}
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/treemap/_utils.js":
/*!**********************************************!*\
  !*** ./node_modules/dojox/treemap/_utils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(arr){
	var utils = {
		group: function(/*Array*/items, /*Array*/groupingFunctions,  /*Function*/measureFunction){
			var response = {
				children: []
			};
			var merge = function(obj, entry){
				if(!obj.__treeValue){
					obj.__treeValue = 0;
				}
				obj.__treeValue += measureFunction(entry);
				return obj;
			};
			// we go over each entry in the array
			arr.forEach(items, function(entry){
				var r = response;
				// for this entry, for each rowField we
				// look at the actual value for this rowField
				// and create a holding object for this
				// value in response if it does not exist
				arr.forEach(groupingFunctions, function(groupingFunction, j){
					// actual value for the rowField
					var data = groupingFunction(entry);
					// create child if undefined
					var child = utils.find(r.children, function(item){
						return (item.__treeName == data);
					});
					if(!child){
						r.children.push(child = {
							__treeName: data,
							__treeID: data+Math.random(),
							children: []
						});
					}
					child = merge(child, entry);
					if(j != groupingFunctions.length - 1){
						// branch & prepare response for 
						// next call
						r = child;
					}else{
						// add the entry to the leaf!
						child.children.push(entry);
					}
				});
				r = merge(r, entry);
			});
			return response;
		},
		find: function(/*Array*/array, /*Function*/callback){
			var l = array.length;
			for (var i = 0; i < l; ++i) {
				if (callback.call(null, array[i])){ 					
					return array[i];
				}
			}
			return null;
		},
		solve: function(items, width, height, areaFunc, rtl){
			//
			// Create temporary TreeMap elements
			//
			var treeMapElements = utils.initElements(items, areaFunc);
			var dataTotal = treeMapElements.total;
			var elements = treeMapElements.elements;
	
			var realSize = dataTotal;
	
			if(dataTotal == 0){
				if(elements.length == 0){
					return {
						items: items, rects: [], total: 0
					};
				}
				arr.forEach(elements, function(element){
					element.size = element.sizeTmp = 100;
				});
				dataTotal = elements.length * 100;
			}
	
			//
			// 	Sort the TreeMap elements
			//
			elements.sort(function(b, a){
				return a.size - b.size;
			});
	
			utils._compute(width, height, elements, dataTotal);
	
			//
			// Restore initial Sort order
			// 
			elements.sort(function(a, b){
				return a.index - b.index;
			});
	
			var result = {};
			result.elements = elements;
			result.size = realSize;
	
			rects = arr.map(elements, function(element){
				return {
					x: rtl?width - element.x - element.width:element.x, y: element.y, w: element.width, h: element.height
				};
			});
	
			result.rectangles = rects;
	
			return result;
		},
		initElements: function(items, areaFunc){
			var total = 0;
			var elements = arr.map(items, function(item, index){
				var size = areaFunc != null ? areaFunc(item) : 0;
				if(size < 0){
					throw new Error("item size dimension must be positive");
				}
				total += size;
				return {
					index: index, size: size, sizeTmp: size
				};
			});
			return {
				elements: elements, total: total
			};
		},
		_compute: function(width, height, elements, total){
			var valueScale = ((width * height) / total) / 100;
	
			arr.forEach(elements, function(element){
				element.sizeTmp *= valueScale;
			});
	
			var start = 0;
			var end = 0;
			var aspectCurr = -1 >>> 1; // int.MaxValue;
			var aspectLast;
			var offsetX = 0;
			var offsetY = 0;
			var tmp_width = width;
			var tmp_height = height;
	
			var vert = tmp_width > tmp_height;
	
			while(end != elements.length){
				aspectLast = utils._trySolution(elements, start, end, vert, tmp_width, tmp_height);
	
				if((aspectLast > aspectCurr) || (aspectLast < 1)){
					var currX = 0;
					var currY = 0;
	
					for(var n = start; n < end; n++){
						elements[n].x = offsetX + currX;
						elements[n].y = offsetY + currY;
						if(vert){
							currY += elements[n].height;
						}else{
							currX += elements[n].width;
						}
					}
	
					if(vert){
						offsetX += elements[start].width;
					}else{
						offsetY += elements[start].height;
					}
	
					tmp_width = width - offsetX;
					tmp_height = height - offsetY;
	
					vert = tmp_width > tmp_height;
	
					start = end;
					end = start;
	
					aspectCurr = -1 >>> 1; // int.MaxValue;
					continue;
				}else{
					for(var n = start; n <= end; n++){
						elements[n].width = elements[n].widthTmp;
						elements[n].height = elements[n].heightTmp;
					}
					aspectCurr = aspectLast;
				}
				end++;
			}
	
			var currX1 = 0;
			var currY1 = 0;
	
			for(var n = start; n < end; n++){
				elements[n].x = offsetX + currX1;
				elements[n].y = offsetY + currY1;
				if(vert){
					currY1 += elements[n].height;
				}else{
					currX1 += elements[n].width;
				}
			}
	
		},
		_trySolution: function(elements, start, end, vert, tmp_width, tmp_height){
			var total = 0;
			var aspect = 0;
			var localWidth = 0;
			var localHeight = 0;
	
			for(var n = start; n <= end; n++){
				total += elements[n].sizeTmp;
			}
	
			if(vert){
				if(tmp_height == 0){
					localWidth = localHeight = 0;
				}else{
					localWidth = total / tmp_height * 100;
					localHeight = tmp_height;
				}
			}else{
				if(tmp_width == 0){
					localWidth = localHeight = 0;
				}else{
					localHeight = total / tmp_width * 100;
					localWidth = tmp_width;
				}
			}
	
			for(var n = start; n <= end; n++){
				if(vert){
					elements[n].widthTmp = localWidth;
					if(total == 0){
						elements[n].heightTmp = 0;
					}else{
						elements[n].heightTmp = localHeight * elements[n].sizeTmp / total;
					}
				}else{
					if(total == 0){
						elements[n].widthTmp = 0;
					}else{
						elements[n].widthTmp = localWidth * elements[n].sizeTmp / total;
					}
					elements[n].heightTmp = localHeight;
				}
			}
			aspect = Math.max(elements[end].heightTmp / elements[end].widthTmp, elements[end].widthTmp
					/ elements[end].heightTmp);
			if(aspect == undefined){
				return 1;
			}
			return aspect;
		}
	};
	return utils;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/widget/Selection.js":
/*!************************************************!*\
  !*** ./node_modules/dojox/widget/Selection.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), __webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/Stateful */ "./node_modules/dojo/Stateful.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, arr, has, lang, Stateful){

	return declare("dojox.widget.Selection", Stateful, {
		// summary:
		//		Base class for widgets that manage a list of selected data items.

		constructor: function(){
			this.selectedItems = [];
		},

		// selectionMode: String
		//		Valid values are:
		//
		//		1. "none": No selection can be done.
		//		2. "single": Only one item can be selected at a time.
		//		3. "multiple": Several item can be selected using the control key modifier.
		//		Default value is "single".
		selectionMode: "single",

		_setSelectionModeAttr: function(value){
			if(value != "none" && value != "single" && value != "multiple"){
				value = "single"; //default value
			}
			if(value != this.selectionMode){
				this.selectionMode = value;
				if(value == "none"){
					this.set("selectedItems", null);
				}else if(value == "single"){
					this.set("selectedItem", this.selectedItem); // null or last selected item
				}
			}
		},

		// selectedItem: Object
		//		In single selection mode, the selected item or in multiple selection mode the last selected item.
		//		Warning: Do not use this property directly, make sure to call set() or get() methods.
		selectedItem: null,

		_setSelectedItemAttr: function(value){
			if(this.selectedItem != value){
				this._set("selectedItem", value);
				this.set("selectedItems", value ? [value] : null);
			}
		},

		// selectedItems: Object[]
		//		The list of selected items.
		//		Warning: Do not use this property directly, make sure to call set() or get() methods.
		selectedItems: null,

		_setSelectedItemsAttr: function(value){
			var oldSelectedItems = this.selectedItems;

			this.selectedItems = value;
			this.selectedItem = null;

			if(oldSelectedItems != null && oldSelectedItems.length>0){
				this.updateRenderers(oldSelectedItems, true);
			}
			if(this.selectedItems && this.selectedItems.length>0){
				this.selectedItem = this.selectedItems[0];
				this.updateRenderers(this.selectedItems, true);
			}
		},

		_getSelectedItemsAttr: function(){
			return this.selectedItems == null ? [] : this.selectedItems.concat();
		},

		isItemSelected: function(item){
			// summary:
			//		Returns whether an item is selected or not.
			// item: Object
			//		The item to test the selection for.
			if(this.selectedItems == null || this.selectedItems.length== 0){
				return false;
			}

			return arr.some(this.selectedItems, lang.hitch(this, function(sitem){
				return this.getIdentity(sitem) == this.getIdentity(item);
			}));
		},

		getIdentity: function(item){
			// summary:
			//		This function must be implemented to return the id of a item.
			// item: Object
			//		The item to query the identity for.
		},

		setItemSelected: function(item, value){
			// summary:
			//		Change the selection state of an item.
			// item: Object
			//		The item to change the selection state for.
			// value: Boolean
			//		True to select the item, false to deselect it.

			if(this.selectionMode == "none" || item == null){
				return;
			}

			// copy is returned
			var sel = this.get("selectedItems");

			if(this.selectionMode == "single"){
				if(value){
					this.set("selectedItem", item);
				}else if(this.isItemSelected(item)){
					this.set("selectedItems", null);
				}
			}else{ // multiple
				if(value){
					if(this.isItemSelected(item)){
						return; // already selected
					}
					if(sel == null){
						sel = [item];
					}else{
						sel.unshift(item);
					}
					this.set("selectedItems", sel);
				}else{
					var res = arr.filter(sel, function(sitem){
						return sitem.id != item.id;
					});
					if(res == null || res.length == sel.length){
						return; // already not selected
					}
					this.set("selectedItems", res);
				}
			}
		},

		selectFromEvent: function(e, item, renderer, dispatch){
			// summary:
			//		Applies selection triggered by an user interaction
			// e: Event
			//		The source event of the user interaction.
			// item: Object
			//		The render item that has been selected/deselected.
			// renderer: Object
			//		The visual renderer of the selected/deselected item.
			// dispatch: Boolean
			//		Whether an event must be dispatched or not.
			// returns: Boolean
			//		Returns true if the selection has changed and false otherwise.
			// tags:
			//		protected

			if(this.selectionMode == "none"){
				return false;
			}

			var changed;
			var oldSelectedItem = this.get("selectedItem");
			var selected = item ? this.isItemSelected(item): false;
			var evtMultiSelectKey = has("mac") ? e.metaKey : e.ctrlKey;
			if(item == null){
				if(!evtMultiSelectKey && this.selectedItem != null){
					this.set("selectedItem", null);
					changed = true;
				}
			}else if(this.selectionMode == "multiple"){
				 if(evtMultiSelectKey){
					this.setItemSelected(item, !selected);
					changed = true;
				}else{
					this.set("selectedItem", item);
					changed = true;
				}
			}else{ // single
				if(evtMultiSelectKey){
					//if the object is selected deselects it.
					this.set("selectedItem", selected ? null : item);
					changed = true;
				}else{
					if(!selected){
						this.set("selectedItem", item);
						changed = true;
					}
				}
			}

			if(dispatch && changed){
				this.dispatchChange(oldSelectedItem, this.get("selectedItem"), renderer, e);
			}

			return changed;
		},

		dispatchChange: function(oldSelectedItem, newSelectedItem, renderer, triggerEvent){
			// summary:
			//		Dispatch a selection change event.
			// oldSelectedItem: Object
			//		The previously selectedItem.
			// newSelectedItem: Object
			//		The new selectedItem.
			// renderer: Object
			//		The visual renderer of the selected/deselected item.
			// triggerEvent: Event
			//		The event that lead to the selection of the item.
			this.onChange({
				oldValue: oldSelectedItem,
				newValue: newSelectedItem,
				renderer: renderer,
				triggerEvent: triggerEvent
			});
		},

		onChange: function(){
			// summary:
			//		Called when the selection changed.
			// tags:
			//		callback
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojox/widget/_Invalidating.js":
/*!****************************************************!*\
  !*** ./node_modules/dojox/widget/_Invalidating.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), __webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! dojo/Stateful */ "./node_modules/dojo/Stateful.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, lang, Stateful){
		
	return declare("dojox.widget._Invalidating", Stateful, {
		// summary:
		//		Base class for classes (usually widgets) that watch invalidated properties and delay the rendering
		//		after these properties modifications to the next execution frame.
		
		// invalidatingPoperties: String[]
		//		The list of properties to watch for to trigger invalidation. This list must be initialized in the
		//		constructor. Default value is null.
		invalidatingProperties: null,
		// invalidRenderering: Boolean
		//		Whether the rendering is invalid or not. This is a readonly information, one must call 
		//		invalidateRendering to modify this flag. 
		invalidRendering: false,
		postscript: function(mixin){
			this.inherited(arguments);
			if(this.invalidatingProperties){
				var props = this.invalidatingProperties;
				for(var i = 0; i < props.length; i++){
					this.watch(props[i], lang.hitch(this, this.invalidateRendering));
					if(mixin && props[i] in mixin){
						// if the prop happens to have been passed in the ctor mixin we are invalidated
						this.invalidateRendering();
					}
				}
			}
		},
		addInvalidatingProperties: function(/*String[]*/ properties){
			// summary:
			//		Add properties to the watched properties to trigger invalidation. This method must be called in
			//		the constructor. It is typically used by subclasses of a _Invalidating class to add more properties
			//		to watch for.
			// properties:
			//		The list of properties to watch for.
			this.invalidatingProperties = this.invalidatingProperties?this.invalidatingProperties.concat(properties):properties;
		},
		invalidateRendering: function(){
			// summary:
			//		Invalidating the rendering for the next executation frame.
			if(!this.invalidRendering){
				this.invalidRendering = true;
				setTimeout(lang.hitch(this, this.validateRendering), 0);
			}
		},
		validateRendering: function(){
			// summary:
			//		Immediately validate the rendering if it has been invalidated. You generally do not call that method yourself.
			// tags:
			//		protected
			if(this.invalidRendering){
				this.refreshRendering();
				this.invalidRendering = false;
			}
		},
		refreshRendering: function(){
			// summary:
			//		Actually refresh the rendering. Implementation should implement that method.
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);