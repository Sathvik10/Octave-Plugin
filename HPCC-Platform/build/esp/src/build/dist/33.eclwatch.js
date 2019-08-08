(function(){
(this||window)["webpackJsonp"].registerAbsMids({
	"dijit/Calendar":"./node_modules/dijit/Calendar.js",
	"dijit/CalendarLite":"./node_modules/dijit/CalendarLite.js",
	"dijit/ToolbarSeparator":"./node_modules/dijit/ToolbarSeparator.js",
	"dijit/_TimePicker":"./node_modules/dijit/_TimePicker.js",
	"dijit/form/DateTextBox":"./node_modules/dijit/form/DateTextBox.js",
	"dijit/form/MappedTextBox":"./node_modules/dijit/form/MappedTextBox.js",
	"dijit/form/RangeBoundTextBox":"./node_modules/dijit/form/RangeBoundTextBox.js",
	"dijit/form/TimeTextBox":"./node_modules/dijit/form/TimeTextBox.js",
	"dijit/form/_DateTimeTextBox":"./node_modules/dijit/form/_DateTimeTextBox.js",
	"dojo/i18n!dojo/cldr/nls/gregorian":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojo/cldr/nls/gregorian.js",
	"dojo/cldr/nls/gregorian":"./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=en%7Cen-au%7Cen-ca%7Cen-gb%7Cbs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-hant%7Czh-hk%7Czh-tw!./node_modules/dojo/cldr/nls/gregorian.js",
	"dojo/text!dijit/templates/Calendar.html":"./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Calendar.html",
	"dojo/cldr/nls/bs/gregorian":"./node_modules/dojo/cldr/nls/bs/gregorian.js",
	"dojo/cldr/nls/en-au/gregorian":"./node_modules/dojo/cldr/nls/en-au/gregorian.js",
	"dojo/cldr/nls/en-ca/gregorian":"./node_modules/dojo/cldr/nls/en-ca/gregorian.js",
	"dojo/cldr/nls/en-gb/gregorian":"./node_modules/dojo/cldr/nls/en-gb/gregorian.js",
	"dojo/cldr/nls/en/gregorian":"./node_modules/dojo/cldr/nls/en/gregorian.js",
	"dojo/cldr/nls/es/gregorian":"./node_modules/dojo/cldr/nls/es/gregorian.js",
	"dojo/cldr/nls/hr/gregorian":"./node_modules/dojo/cldr/nls/hr/gregorian.js",
	"dojo/cldr/nls/hu/gregorian":"./node_modules/dojo/cldr/nls/hu/gregorian.js",
	"dojo/cldr/nls/pt/gregorian":"./node_modules/dojo/cldr/nls/pt/gregorian.js",
	"dojo/cldr/nls/sr/gregorian":"./node_modules/dojo/cldr/nls/sr/gregorian.js",
	"dojo/cldr/nls/zh-hant/gregorian":"./node_modules/dojo/cldr/nls/zh-hant/gregorian.js",
	"dojo/cldr/nls/zh-hk/gregorian":"./node_modules/dojo/cldr/nls/zh-hk/gregorian.js",
	"dojo/cldr/nls/zh-tw/gregorian":"./node_modules/dojo/cldr/nls/zh-tw/gregorian.js",
	"dojo/cldr/nls/zh/gregorian":"./node_modules/dojo/cldr/nls/zh/gregorian.js",
	"dojo/cldr/supplemental":"./node_modules/dojo/cldr/supplemental.js",
	"dojo/date":"./node_modules/dojo/date.js",
	"dojo/date/locale":"./node_modules/dojo/date/locale.js"
})
})(),(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/dijit/Calendar.js":
/*!****************************************!*\
  !*** ./node_modules/dijit/Calendar.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.map
	__webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"),
	__webpack_require__(/*! dojo/date/locale */ "./node_modules/dojo/date/locale.js"),
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"), // domAttr.get
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add domClass.contains domClass.remove domClass.toggle
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"),	// create
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), // kernel.deprecated
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie")
	__webpack_require__(/*! ./CalendarLite */ "./node_modules/dijit/CalendarLite.js"),
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_CssStateMixin */ "./node_modules/dijit/_CssStateMixin.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! ./form/DropDownButton */ "./node_modules/dijit/form/DropDownButton.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, date, local, declare, domAttr, domClass, domConstruct, kernel, keys, lang, on, has,
			CalendarLite, _Widget, _CssStateMixin, _TemplatedMixin, DropDownButton){

	// module:
	//		dijit/Calendar

	// _Widget for deprecated methods like setAttribute()
	var Calendar = declare("dijit.Calendar", [CalendarLite, _Widget, _CssStateMixin], {
		// summary:
		//		A simple GUI for choosing a date in the context of a monthly calendar.
		//
		// description:
		//		See CalendarLite for general description.   Calendar extends CalendarLite, adding:
		//
		//		- month drop down list
		//		- keyboard navigation
		//		- CSS classes for hover/mousepress on date, month, and year nodes
		//		- support of deprecated methods (will be removed in 2.0)

		baseClass: "dijitCalendar",

		// Set node classes for various mouse events, see dijit._CssStateMixin for more details
		cssStateNodes: {
			"decrementMonth": "dijitCalendarArrow",
			"incrementMonth": "dijitCalendarArrow",
			"previousYearLabelNode": "dijitCalendarPreviousYear",
			"nextYearLabelNode": "dijitCalendarNextYear"
		},

		setValue: function(/*Date*/ value){
			// summary:
			//		Deprecated.   Use set('value', ...) instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
			this.set('value', value);
		},

		_createMonthWidget: function(){
			// summary:
			//		Creates the drop down button that displays the current month and lets user pick a new one

			return new Calendar._MonthDropDownButton({
				id: this.id + "_mddb",
				tabIndex: -1,
				onMonthSelect: lang.hitch(this, "_onMonthSelect"),
				lang: this.lang,
				dateLocaleModule: this.dateLocaleModule
			}, this.monthNode);
		},

		postCreate: function(){
			this.inherited(arguments);

			// Events specific to Calendar, not used in CalendarLite
			this.own(
				on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")),
				on(this.dateRowsNode, "mouseover", lang.hitch(this, "_onDayMouseOver")),
				on(this.dateRowsNode, "mouseout", lang.hitch(this, "_onDayMouseOut")),
				on(this.dateRowsNode, "mousedown", lang.hitch(this, "_onDayMouseDown")),
				on(this.dateRowsNode, "mouseup", lang.hitch(this, "_onDayMouseUp"))
			);
		},

		_onMonthSelect: function(/*Number*/ newMonth){
			// summary:
			//		Handler for when user selects a month from the drop down list
			// tags:
			//		protected

			// move to selected month, bounding by the number of days in the month
			// (ex: jan 31 --> feb 28, not feb 31)
			var date = new this.dateClassObj(this.currentFocus);
			date.setDate(1);
			date.setMonth(newMonth);
			var daysInMonth = this.dateModule.getDaysInMonth(date);
			var currentDate = this.currentFocus.getDate();
			date.setDate(Math.min(currentDate, daysInMonth));
			this._setCurrentFocusAttr(date);
		},

		_onDayMouseOver: function(/*Event*/ evt){
			// summary:
			//		Handler for mouse over events on days, sets hovered style
			// tags:
			//		protected

			// event can occur on <td> or the <span> inside the td,
			// set node to the <td>.
			var node =
				domClass.contains(evt.target, "dijitCalendarDateLabel") ?
					evt.target.parentNode :
					evt.target;

			if(node && (
				(node.dijitDateValue && !domClass.contains(node, "dijitCalendarDisabledDate"))
					|| node == this.previousYearLabelNode || node == this.nextYearLabelNode
				)){
				domClass.add(node, "dijitCalendarHoveredDate");
				this._currentNode = node;
			}
		},

		_onDayMouseOut: function(/*Event*/ evt){
			// summary:
			//		Handler for mouse out events on days, clears hovered style
			// tags:
			//		protected

			if(!this._currentNode){
				return;
			}

			// if mouse out occurs moving from <td> to <span> inside <td>, ignore it
			if(evt.relatedTarget && evt.relatedTarget.parentNode == this._currentNode){
				return;
			}
			var cls = "dijitCalendarHoveredDate";
			if(domClass.contains(this._currentNode, "dijitCalendarActiveDate")){
				cls += " dijitCalendarActiveDate";
			}
			domClass.remove(this._currentNode, cls);
			this._currentNode = null;
		},

		_onDayMouseDown: function(/*Event*/ evt){
			var node = evt.target.parentNode;
			if(node && node.dijitDateValue && !domClass.contains(node, "dijitCalendarDisabledDate")){
				domClass.add(node, "dijitCalendarActiveDate");
				this._currentNode = node;
			}
		},

		_onDayMouseUp: function(/*Event*/ evt){
			var node = evt.target.parentNode;
			if(node && node.dijitDateValue){
				domClass.remove(node, "dijitCalendarActiveDate");
			}
		},

		handleKey: function(/*Event*/ evt){
			// summary:
			//		Provides keyboard navigation of calendar.
			// description:
			//		Called from _onKeyDown() to handle keydown on a stand alone Calendar,
			//		and also from `dijit/form/_DateTimeTextBox` to pass a keydown event
			//		from the `dijit/form/DateTextBox` to be handled in this widget
			// returns:
			//		False if the key was recognized as a navigation key,
			//		to indicate that the event was handled by Calendar and shouldn't be propagated
			// tags:
			//		protected
			var increment = -1,
				interval,
				newValue = this.currentFocus;
			switch(evt.keyCode){
				case keys.RIGHT_ARROW:
					increment = 1;
				//fallthrough...
				case keys.LEFT_ARROW:
					interval = "day";
					if(!this.isLeftToRight()){
						increment *= -1;
					}
					break;
				case keys.DOWN_ARROW:
					increment = 1;
				//fallthrough...
				case keys.UP_ARROW:
					interval = "week";
					break;
				case keys.PAGE_DOWN:
					increment = 1;
				//fallthrough...
				case keys.PAGE_UP:
					interval = evt.ctrlKey || evt.altKey ? "year" : "month";
					break;
				case keys.END:
					// go to the next month
					newValue = this.dateModule.add(newValue, "month", 1);
					// subtract a day from the result when we're done
					interval = "day";
				//fallthrough...
				case keys.HOME:
					newValue = new this.dateClassObj(newValue);
					newValue.setDate(1);
					break;
				default:
					return true;
			}

			if(interval){
				newValue = this.dateModule.add(newValue, interval, increment);
			}

			this._setCurrentFocusAttr(newValue);

			return false;
		},

		_onKeyDown: function(/*Event*/ evt){
			// summary:
			//		For handling keydown events on a stand alone calendar
			if(!this.handleKey(evt)){
				evt.stopPropagation();
				evt.preventDefault();
			}
		},

		onValueSelected: function(/*Date*/ /*===== date =====*/){
			// summary:
			//		Deprecated.   Notification that a date cell was selected.  It may be the same as the previous value.
			// description:
			//		Formerly used by `dijit/form/_DateTimeTextBox` (and thus `dijit/form/DateTextBox`)
			//		to get notification when the user has clicked a date.  Now onExecute() (above) is used.
			// tags:
			//		protected
		},

		onChange: function(value){
			this.onValueSelected(value);	// remove in 2.0
		},

		getClassForDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to return CSS classes to associate with the date entry for the given dateObject,
			//		for example to indicate a holiday in specified locale.
			// dateObject: Date
			// locale: String?
			// tags:
			//		extension

			/*=====
			 return ""; // String
			 =====*/
		}
	});

	Calendar._MonthDropDownButton = declare("dijit.Calendar._MonthDropDownButton", DropDownButton, {
		// summary:
		//		DropDownButton for the current month.    Displays name of current month
		//		and a list of month names in the drop down

		onMonthSelect: function(){
		},

		postCreate: function(){
			this.inherited(arguments);
			this.dropDown = new Calendar._MonthDropDown({
				id: this.id + "_mdd", //do not change this id because it is referenced in the template
				onChange: this.onMonthSelect
			});
		},
		_setMonthAttr: function(month){
			// summary:
			//		Set the current month to display as a label
			var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month);
			this.dropDown.set("months", monthNames);

			// Set name of current month and also fill in spacer element with all the month names
			// (invisible) so that the maximum width will affect layout.   But not on IE6 because then
			// the center <TH> overlaps the right <TH> (due to a browser bug).
			this.containerNode.innerHTML =
				(has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + this.dropDown.domNode.innerHTML + "</div>") +
					"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" + monthNames[month.getMonth()] + "</div>";
		}
	});

	Calendar._MonthDropDown = declare("dijit.Calendar._MonthDropDown", [_Widget, _TemplatedMixin, _CssStateMixin], {
		// summary:
		//		The list-of-months drop down from the MonthDropDownButton

		// months: String[]
		//		List of names of months, possibly w/some undefined entries for Hebrew leap months
		//		(ex: ["January", "February", undefined, "April", ...])
		months: [],

		baseClass: "dijitCalendarMonthMenu dijitMenu",

		templateString: "<div data-dojo-attach-event='ondijitclick:_onClick'></div>",

		_setMonthsAttr: function(/*String[]*/ months){
			this.domNode.innerHTML = "";
			array.forEach(months, function(month, idx){
				var div = domConstruct.create("div", {
					className: "dijitCalendarMonthLabel",
					month: idx,
					innerHTML: month
				}, this.domNode);
				div._cssState = "dijitCalendarMonthLabel";	// trigger _CSSStateMixin magic; property, not attribute.
			}, this);
		},

		_onClick: function(/*Event*/ evt){
			this.onChange(domAttr.get(evt.target, "month"));
		},

		onChange: function(/*Number*/ /*===== month =====*/){
			// summary:
			//		Callback when month is selected from drop down
		}
	});

	return Calendar;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/CalendarLite.js":
/*!********************************************!*\
  !*** ./node_modules/dijit/CalendarLite.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.forEach array.map
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/cldr/supplemental */ "./node_modules/dojo/cldr/supplemental.js"), // cldrSupplemental.getFirstDayOfWeek
	__webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"), // date
	__webpack_require__(/*! dojo/date/locale */ "./node_modules/dojo/date/locale.js"),
	__webpack_require__(/*! dojo/date/stamp */ "./node_modules/dojo/date/stamp.js"), // stamp.fromISOString
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.contains
	__webpack_require__(/*! dojo/dom-attr */ "./node_modules/dojo/dom-attr.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.getObject, lang.hitch
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("ie") has("webkit")
	__webpack_require__(/*! dojo/string */ "./node_modules/dojo/string.js"), // string.substitute
	__webpack_require__(/*! ./_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js"),
	__webpack_require__(/*! dojo/text!./templates/Calendar.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Calendar.html"),
	__webpack_require__(/*! ./a11yclick */ "./node_modules/dijit/a11yclick.js"),	// not used directly, but template has ondijitclick in it
	__webpack_require__(/*! ./hccss */ "./node_modules/dijit/hccss.js")    // not used directly, but sets CSS class on <body>
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, declare, cldrSupplemental, date, locale, stamp, dom, domClass, domAttr, lang, on, has, string, _WidgetBase, _TemplatedMixin, template){


	// module:
	//		dijit/CalendarLite

	var CalendarLite = declare("dijit.CalendarLite", [_WidgetBase, _TemplatedMixin], {
		// summary:
		//		Lightweight version of Calendar widget aimed towards mobile use
		//
		// description:
		//		A simple GUI for choosing a date in the context of a monthly calendar.
		//		This widget can't be used in a form because it doesn't serialize the date to an
		//		`<input>` field.  For a form element, use dijit/form/DateTextBox instead.
		//
		//		Note that the parser takes all dates attributes passed in the
		//		[RFC 3339 format](http://www.faqs.org/rfcs/rfc3339.html), e.g. `2005-06-30T08:05:00-07:00`
		//		so that they are serializable and locale-independent.
		//
		//		Also note that this widget isn't keyboard accessible; use dijit.Calendar for that
		// example:
		//	|	var calendar = new dijit.CalendarLite({}, dojo.byId("calendarNode"));
		//
		// example:
		//	|	<div data-dojo-type="dijit/CalendarLite"></div>

		// Template for main calendar
		templateString: template,

		// Template for cell for a day of the week (ex: M)
		dowTemplateString: '<th class="dijitReset dijitCalendarDayLabelTemplate" role="columnheader" scope="col"><span class="dijitCalendarDayLabel">${d}</span></th>',

		// Templates for a single date (ex: 13), and for a row for a week (ex: 20 21 22 23 24 25 26)
		dateTemplateString: '<td class="dijitReset" role="gridcell" data-dojo-attach-point="dateCells"><span class="dijitCalendarDateLabel" data-dojo-attach-point="dateLabels"></span></td>',
		weekTemplateString: '<tr class="dijitReset dijitCalendarWeekTemplate" role="row">${d}${d}${d}${d}${d}${d}${d}</tr>',

		// value: Date
		//		The currently selected Date, initially set to invalid date to indicate no selection.
		value: new Date(""),
		// TODO: for 2.0 make this a string (ISO format) rather than a Date

		// datePackage: String
		//		JavaScript namespace to find calendar routines.	 If unspecified, uses Gregorian calendar routines
		//		at dojo/date and dojo/date/locale.
		datePackage: "",
		//		TODO: for 2.0, replace datePackage with dateModule and dateLocalModule attributes specifying MIDs,
		//		or alternately just get rid of this completely and tell user to use module ID remapping
		//		via require

		// dayWidth: String
		//		How to represent the days of the week in the calendar header. See locale
		dayWidth: "narrow",

		// tabIndex: String
		//		Order fields are traversed when user hits the tab key
		tabIndex: "0",

		// dayOffset: Integer
		//		(Optional) The first day of week override. By default the first day of week is determined
		//		for the current locale (extracted from the CLDR).
		//		Special value -1 (default value), means use locale dependent value.
		dayOffset: -1,

		// currentFocus: Date
		//		Date object containing the currently focused date, or the date which would be focused
		//		if the calendar itself was focused.   Also indicates which year and month to display,
		//		i.e. the current "page" the calendar is on.
		currentFocus: new Date(),

		// Put the summary to the node with role=grid
		_setSummaryAttr: "gridNode",

		baseClass: "dijitCalendar dijitCalendarLite",

		_isValidDate: function(/*Date*/ value){
			// summary:
			//		Runs various tests on the value, checking that it's a valid date, rather
			//		than blank or NaN.
			// tags:
			//		private
			return value && !isNaN(value) && typeof value == "object" &&
				value.toString() != this.constructor.prototype.value.toString();
		},

		_getValueAttr: function(){
			// summary:
			//		Support get('value')

			// this.value is set to 1AM, but return midnight, local time for back-compat
			var storedVal = this._get("value");
			if(storedVal && !isNaN(storedVal)){
				var value = new this.dateClassObj(storedVal);
				value.setHours(0, 0, 0, 0);

				// If daylight savings pushes midnight to the previous date, fix the Date
				// object to point at 1am so it will represent the correct day. See #9366
				if(value.getDate() < storedVal.getDate()){
					value = this.dateModule.add(value, "hour", 1);
				}
				return value;
			}else{
				return null;
			}
		},

		_setValueAttr: function(/*Date|Number*/ value, /*Boolean*/ priorityChange){
			// summary:
			//		Support set("value", ...)
			// description:
			//		Set the current date and update the UI.  If the date is disabled, the value will
			//		not change, but the display will change to the corresponding month.
			// value:
			//		Either a Date or the number of seconds since 1970.
			// tags:
			//		protected
			if(typeof value == "string"){
				value = stamp.fromISOString(value);
			}
			value = this._patchDate(value);

			if(this._isValidDate(value) && !this.isDisabledDate(value, this.lang)){
				this._set("value", value);

				// Set focus cell to the new value.   Arguably this should only happen when there isn't a current
				// focus point.   This will also repopulate the grid to new month/year if necessary.
				this.set("currentFocus", value);

				// Mark the selected date
				this._markSelectedDates([value]);

				if(this._created && (priorityChange || typeof priorityChange == "undefined")){
					this.onChange(this.get('value'));
				}
			}else{
				// clear value, and mark all dates as unselected
				this._set("value", null);
				this._markSelectedDates([]);
			}
		},

		_patchDate: function(/*Date|Number*/ value){
			// summary:
			//		Convert Number into Date, or copy Date object.   Then, round to nearest day,
			//		setting to 1am to avoid issues when DST shift occurs at midnight, see #8521, #9366)
			if(value || value === 0){
				value = new this.dateClassObj(value);
				value.setHours(1, 0, 0, 0);
			}
			return value;
		},

		_setText: function(node, text){
			// summary:
			//		This just sets the content of node to the specified text.
			//		Can't do "node.innerHTML=text" because of an IE bug w/tables, see #3434.
			// tags:
			//		private
			while(node.firstChild){
				node.removeChild(node.firstChild);
			}
			node.appendChild(node.ownerDocument.createTextNode(text));
		},

		_populateGrid: function(){
			// summary:
			//		Fills in the calendar grid with each day (1-31).
			//		Call this on creation, when moving to a new month.
			// tags:
			//		private

			var month = new this.dateClassObj(this.currentFocus);
			month.setDate(1);
			month = this._patchDate(month);	// needed if currentFocus is start or end of DST, see #17033

			var firstDay = month.getDay(),
				daysInMonth = this.dateModule.getDaysInMonth(month),
				daysInPreviousMonth = this.dateModule.getDaysInMonth(this.dateModule.add(month, "month", -1)),
				today = new this.dateClassObj(),
				dayOffset = this.dayOffset >= 0 ? this.dayOffset : cldrSupplemental.getFirstDayOfWeek(this.lang);
			if(dayOffset > firstDay){
				dayOffset -= 7;
			}

			// If they didn't provide a summary, change the default summary to match with the new month
			if(!this.summary){
				var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month)
				this.gridNode.setAttribute("summary", monthNames[month.getMonth()]);
			}

			// Mapping from date (as specified by number returned from Date.valueOf()) to corresponding <td>
			this._date2cell = {};

			// Iterate through dates in the calendar and fill in date numbers and style info
			array.forEach(this.dateCells, function(template, idx){
				var i = idx + dayOffset;
				var date = new this.dateClassObj(month),
					number, clazz = "dijitCalendar", adj = 0;

				if(i < firstDay){
					number = daysInPreviousMonth - firstDay + i + 1;
					adj = -1;
					clazz += "Previous";
				}else if(i >= (firstDay + daysInMonth)){
					number = i - firstDay - daysInMonth + 1;
					adj = 1;
					clazz += "Next";
				}else{
					number = i - firstDay + 1;
					clazz += "Current";
				}

				if(adj){
					date = this.dateModule.add(date, "month", adj);
				}
				date.setDate(number);

				if(!this.dateModule.compare(date, today, "date")){
					clazz = "dijitCalendarCurrentDate " + clazz;
				}

				if(this.isDisabledDate(date, this.lang)){
					clazz = "dijitCalendarDisabledDate " + clazz;
					template.setAttribute("aria-disabled", "true");
				}else{
					clazz = "dijitCalendarEnabledDate " + clazz;
					template.removeAttribute("aria-disabled");
					template.setAttribute("aria-selected", "false");
				}

				var clazz2 = this.getClassForDate(date, this.lang);
				if(clazz2){
					clazz = clazz2 + " " + clazz;
				}

				template.className = clazz + "Month dijitCalendarDateTemplate";

				// Each cell has an associated integer value representing it's date
				var dateVal = date.valueOf();
				this._date2cell[dateVal] = template;
				template.dijitDateValue = dateVal;

				// Set Date string (ex: "13").

				var localizedDate = date.getDateLocalized ? date.getDateLocalized(this.lang) : date.getDate()
				this._setText(this.dateLabels[idx], localizedDate);
				domAttr.set(template, 'aria-label', locale.format(date, {
					selector: 'date',
					formatLength: 'long'
				}));
			}, this);
		},

		_populateControls: function(){
			// summary:
			//		Fill in localized month, and prev/current/next years
			// tags:
			//		protected

			var month = new this.dateClassObj(this.currentFocus);
			month.setDate(1);

			// set name of this month
			this.monthWidget.set("month", month);

			var y = month.getFullYear() - 1;
			var d = new this.dateClassObj();
			array.forEach(["previous", "current", "next"], function(name){
				d.setFullYear(y++);
				this._setText(this[name + "YearLabelNode"],
					this.dateLocaleModule.format(d, {selector: 'year', locale: this.lang}));
			}, this);
		},

		goToToday: function(){
			// summary:
			//		Sets calendar's value to today's date
			this.set('value', new this.dateClassObj());
		},

		constructor: function(params /*===== , srcNodeRef =====*/){
			// summary:
			//		Create the widget.
			// params: Object|null
			//		Hash of initialization parameters for widget, including scalar values (like title, duration etc.)
			//		and functions, typically callbacks like onClick.
			//		The hash can contain any of the widget's properties, excluding read-only properties.
			// srcNodeRef: DOMNode|String?
			//		If a srcNodeRef (DOM node) is specified, replace srcNodeRef with my generated DOM tree

			this.dateModule = params.datePackage ? lang.getObject(params.datePackage, false) : date;
			this.dateClassObj = this.dateModule.Date || Date;
			this.dateLocaleModule = params.datePackage ? lang.getObject(params.datePackage + ".locale", false) : locale;
		},

		_createMonthWidget: function(){
			// summary:
			//		Creates the drop down button that displays the current month and lets user pick a new one

			return CalendarLite._MonthWidget({
				id: this.id + "_mddb",
				lang: this.lang,
				dateLocaleModule: this.dateLocaleModule
			}, this.monthNode);
		},

		buildRendering: function(){
			// Markup for days of the week (referenced from template)
			var d = this.dowTemplateString,
				dayNames = this.dateLocaleModule.getNames('days', this.dayWidth, 'standAlone', this.lang),
				dayOffset = this.dayOffset >= 0 ? this.dayOffset : cldrSupplemental.getFirstDayOfWeek(this.lang);
			this.dayCellsHtml = string.substitute([d, d, d, d, d, d, d].join(""), {d: ""}, function(){
				return dayNames[dayOffset++ % 7];
			});

			// Markup for dates of the month (referenced from template), but without numbers filled in
			var r = string.substitute(this.weekTemplateString, {d: this.dateTemplateString});
			this.dateRowsHtml = [r, r, r, r, r, r].join("");

			// Instantiate from template.
			// dateCells and dateLabels arrays filled when _Templated parses my template.
			this.dateCells = [];
			this.dateLabels = [];
			this.inherited(arguments);

			dom.setSelectable(this.domNode, false);

			var dateObj = new this.dateClassObj(this.currentFocus);

			this.monthWidget = this._createMonthWidget();

			this.set('currentFocus', dateObj, false);	// draw the grid to the month specified by currentFocus
		},

		postCreate: function(){
			this.inherited(arguments);
			this._connectControls();
		},

		_connectControls: function(){
			// summary:
			//		Set up connects for increment/decrement of months/years
			// tags:
			//		protected

			var connect = lang.hitch(this, function(nodeProp, part, amount){
				this[nodeProp].dojoClick = true;
				return on(this[nodeProp], "click", lang.hitch(this, function(){
					this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus, part, amount));
				}));
			});

			this.own(
				connect("incrementMonth", "month", 1),
				connect("decrementMonth", "month", -1),
				connect("nextYearLabelNode", "year", 1),
				connect("previousYearLabelNode", "year", -1)
			);
		},

		_setCurrentFocusAttr: function(/*Date*/ date, /*Boolean*/ forceFocus){
			// summary:
			//		If the calendar currently has focus, then focuses specified date,
			//		changing the currently displayed month/year if necessary.
			//		If the calendar doesn't have focus, updates currently
			//		displayed month/year, and sets the cell that will get focus
			//		when Calendar is focused.
			// forceFocus:
			//		If true, will focus() the cell even if calendar itself doesn't have focus

			var oldFocus = this.currentFocus,
				oldCell = this._getNodeByDate(oldFocus);
			date = this._patchDate(date);

			this._set("currentFocus", date);

			// If the focus is on a different month than the current calendar month, switch the displayed month.
			// Also will populate the grid initially, on Calendar creation.
			if(!this._date2cell || this.dateModule.difference(oldFocus, date, "month") != 0){
				this._populateGrid();
				this._populateControls();
				this._markSelectedDates([this.value]);
			}

			// set tabIndex=0 on new cell, and focus it (but only if Calendar itself is focused)
			var newCell = this._getNodeByDate(date);
			newCell.setAttribute("tabIndex", this.tabIndex);
			if(this.focused || forceFocus){
				newCell.focus();
			}

			// set tabIndex=-1 on old focusable cell
			if(oldCell && oldCell != newCell){
				if(has("webkit")){    // see #11064 about webkit bug
					oldCell.setAttribute("tabIndex", "-1");
				}else{
					oldCell.removeAttribute("tabIndex");
				}
			}
		},

		focus: function(){
			// summary:
			//		Focus the calendar by focusing one of the calendar cells
			this._setCurrentFocusAttr(this.currentFocus, true);
		},

		_onDayClick: function(/*Event*/ evt){
			// summary:
			//		Handler for day clicks, selects the date if appropriate
			// tags:
			//		protected
			evt.stopPropagation();
			evt.preventDefault();
			for(var node = evt.target; node && !node.dijitDateValue && node.dijitDateValue !== 0; node = node.parentNode){
				;
			}
			if(node && !domClass.contains(node, "dijitCalendarDisabledDate")){
				this.set('value', node.dijitDateValue);
			}
		},

		_getNodeByDate: function(/*Date*/ value){
			// summary:
			//		Returns the cell corresponding to the date, or null if the date is not within the currently
			//		displayed month.
			value = this._patchDate(value);
			return value && this._date2cell ? this._date2cell[value.valueOf()] : null;
		},

		_markSelectedDates: function(/*Date[]*/ dates){
			// summary:
			//		Marks the specified cells as selected, and clears cells previously marked as selected.
			//		For CalendarLite at most one cell is selected at any point, but this allows an array
			//		for easy subclassing.

			// Function to mark a cell as selected or unselected
			function mark(/*Boolean*/ selected, /*DomNode*/ cell){
				domClass.toggle(cell, "dijitCalendarSelectedDate", selected);
				cell.setAttribute("aria-selected", selected ? "true" : "false");
			}

			// Clear previously selected cells.
			array.forEach(this._selectedCells || [], lang.partial(mark, false));

			// Mark newly selected cells.  Ignore dates outside the currently displayed month.
			this._selectedCells = array.filter(array.map(dates, this._getNodeByDate, this), function(n){
				return n;
			});
			array.forEach(this._selectedCells, lang.partial(mark, true));
		},

		onChange: function(/*Date*/ /*===== date =====*/){
			// summary:
			//		Called only when the selected date has changed
		},

		isDisabledDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to disable certain dates in the calendar e.g. `isDisabledDate=dojo.date.locale.isWeekend`
			// dateObject: Date
			// locale: String?
			// tags:
			//		extension
			/*=====
			 return false; // Boolean
			 =====*/
		},

		getClassForDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to return CSS classes to associate with the date entry for the given dateObject,
			//		for example to indicate a holiday in specified locale.
			// dateObject: Date
			// locale: String?
			// tags:
			//		extension

			/*=====
			 return ""; // String
			 =====*/
		}
	});

	CalendarLite._MonthWidget = declare("dijit.CalendarLite._MonthWidget", _WidgetBase, {
		// summary:
		//		Displays name of current month padded to the width of the month
		//		w/the longest name, so that changing months doesn't change width.
		//
		//		Create as:
		// |	new Calendar._MonthWidget({
		// |			lang: ...,
		// |			dateLocaleModule: ...
		// |		})

		_setMonthAttr: function(month){
			// summary:
			//		Set the current month to display as a label
			var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month),
				spacer =
					(has("ie") == 6 ? "" : "<div class='dijitSpacer'>" +
						array.map(monthNames,function(s){
							return "<div>" + s + "</div>";
						}).join("") + "</div>");

			// Set name of current month and also fill in spacer element with all the month names
			// (invisible) so that the maximum width will affect layout.   But not on IE6 because then
			// the center <TH> overlaps the right <TH> (due to a browser bug).
			this.domNode.innerHTML =
				spacer +
					"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" +
					monthNames[month.getMonth()] + "</div>";
		}
	});

	return CalendarLite;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/ToolbarSeparator.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/ToolbarSeparator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom */ "./node_modules/dojo/dom.js"), // dom.setSelectable
	__webpack_require__(/*! ./_Widget */ "./node_modules/dijit/_Widget.js"),
	__webpack_require__(/*! ./_TemplatedMixin */ "./node_modules/dijit/_TemplatedMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, dom, _Widget, _TemplatedMixin){

	// module:
	//		dijit/ToolbarSeparator


	return declare("dijit.ToolbarSeparator", [_Widget, _TemplatedMixin], {
		// summary:
		//		A spacer between two `dijit.Toolbar` items

		templateString: '<div class="dijitToolbarSeparator dijitInline" role="presentation"></div>',

		buildRendering: function(){
			this.inherited(arguments);
			dom.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		This widget isn't focusable, so pass along that fact.
			// tags:
			//		protected
			return false;
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/_TimePicker.js":
/*!*******************************************!*\
  !*** ./node_modules/dijit/_TimePicker.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/array */ "./node_modules/dojo/_base/array.js"), // array.forEach
	__webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"), // date.compare
	__webpack_require__(/*! dojo/date/locale */ "./node_modules/dojo/date/locale.js"), // locale.format
	__webpack_require__(/*! dojo/date/stamp */ "./node_modules/dojo/date/stamp.js"), // stamp.fromISOString stamp.toISOString
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/dom-class */ "./node_modules/dojo/dom-class.js"), // domClass.add domClass.contains domClass.toggle
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), // domConstruct.create
	__webpack_require__(/*! dojo/_base/kernel */ "./node_modules/dojo/_base/kernel.js"), // deprecated
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.mixin
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has(...)
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"), // query
	__webpack_require__(/*! dojo/mouse */ "./node_modules/dojo/mouse.js"), // mouse.wheel
	__webpack_require__(/*! dojo/on */ "./node_modules/dojo/on.js"),
	__webpack_require__(/*! ./_WidgetBase */ "./node_modules/dijit/_WidgetBase.js"),
	__webpack_require__(/*! ./form/_ListMouseMixin */ "./node_modules/dijit/form/_ListMouseMixin.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(array, ddate, locale, stamp, declare, domClass, domConstruct, kernel, keys, lang, has, query, mouse, on,
			_WidgetBase, _ListMouseMixin){

	// module:
	//		dijit/_TimePicker


	var TimePicker = declare("dijit._TimePicker", [_WidgetBase, _ListMouseMixin], {
		// summary:
		//		A time picker dropdown, used by dijit/form/TimeTextBox.
		//		This widget is not available as a standalone widget due to lack of accessibility support.

		// baseClass: [protected] String
		//		The root className to use for the various states of this widget
		baseClass: "dijitTimePicker",

		// pickerMin: String
		//		ISO-8601 string representing the time of the first
		//		visible element in the time picker.
		//		Set in local time, without a time zone.
		pickerMin: "T00:00:00",

		// pickerMax: String
		//		ISO-8601 string representing the last (possible) time
		//		added to the time picker.
		//		Set in local time, without a time zone.
		pickerMax: "T23:59:59",

		// clickableIncrement: String
		//		ISO-8601 string representing the interval between choices in the time picker.
		//		Set in local time, without a time zone.
		//		Example: `T00:15:00` creates 15 minute increments
		//		Must divide dijit/_TimePicker.visibleIncrement evenly
		clickableIncrement: "T00:15:00",

		// visibleIncrement: String
		//		ISO-8601 string representing the interval between "major" choices in the time picker.
		//		Each theme will highlight the major choices with a larger font / different color / etc.
		//		Set in local time, without a time zone.
		//		Example: `T01:00:00` creates text in every 1 hour increment
		visibleIncrement: "T01:00:00",

		// value: String
		//		Time to display.
		//		Defaults to current time.
		//		Can be a Date object or an ISO-8601 string.
		//		If you specify the GMT time zone (`-01:00`),
		//		the time will be converted to the local time in the local time zone.
		//		Otherwise, the time is considered to be in the local time zone.
		//		If you specify the date and isDate is true, the date is used.
		//		Example: if your local time zone is `GMT -05:00`,
		//		`T10:00:00` becomes `T10:00:00-05:00` (considered to be local time),
		//		`T10:00:00-01:00` becomes `T06:00:00-05:00` (4 hour difference),
		//		`T10:00:00Z` becomes `T05:00:00-05:00` (5 hour difference between Zulu and local time)
		//		`yyyy-mm-ddThh:mm:ss` is the format to set the date and time
		//		Example: `2007-06-01T09:00:00`
		value: new Date(),

		_visibleIncrement: 2,
		_clickableIncrement: 1,
		_totalIncrements: 10,

		// constraints: TimePicker.__Constraints
		//		Specifies valid range of times (start time, end time), and also used by TimeTextBox to pass other
		//		options to the TimePicker: pickerMin, pickerMax, clickableIncrement, and visibleIncrement.
		constraints: {},

		/*=====
		 serialize: function(val, options){
			 // summary:
			 //		User overridable function used to convert the attr('value') result to a String
			 // val: Date
			 //		The current value
			 // options: Object?
			 // tags:
			 //		protected
		 },
		 =====*/
		serialize: stamp.toISOString,

		/*=====
		 // filterString: string
		 //		The string to filter by
		 filterString: "",
		 =====*/

		buildRendering: function(){
			this.inherited(arguments);
			this.containerNode = this.domNode;	// expected by _ListBase
			this.timeMenu = this.domNode;	// for back-compat
		},

		setValue: function(/*Date*/ value){
			// summary:
			//		Deprecated.  Used set('value') instead.
			// tags:
			//		deprecated
			kernel.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
			this.set('value', value);
		},

		_setValueAttr: function(/*Date*/ date){
			// summary:
			//		Hook so set('value', ...) works.
			// description:
			//		Set the value of the TimePicker.
			//		Redraws the TimePicker around the new date.
			// tags:
			//		protected
			this._set("value", date);
			this._showText();
		},

		_setFilterStringAttr: function(val){
			// summary:
			//		Called by TimeTextBox to filter the values shown in my list
			this._set("filterString", val);
			this._showText();
		},

		isDisabledDate: function(/*===== dateObject, locale =====*/){
			// summary:
			//		May be overridden to disable certain dates in the TimePicker e.g. `isDisabledDate=locale.isWeekend`
			// dateObject: Date
			// locale: String?
			// type:
			//		extension
			return false; // Boolean
		},

		_getFilteredNodes: function(/*number*/ start, /*number*/ maxNum, /*Boolean*/ before, /*DOMNode*/ lastNode){
			// summary:
			//		Returns a DocumentFragment of nodes with the filter applied.  At most maxNum nodes
			//		will be returned - but fewer may be returned as well.  If the
			//		before parameter is set to true, then it will return the elements
			//		before the given index
			// tags:
			//		private

			var nodes = this.ownerDocument.createDocumentFragment();

			for(var i = 0 ; i < this._maxIncrement; i++){
				var n = this._createOption(i);
				if(n){
					nodes.appendChild(n);
				}
			}

			return nodes;
		},

		_showText: function(){
			// summary:
			//		Displays the relevant choices in the drop down list
			// tags:
			//		private
			var fromIso = stamp.fromISOString;
			this.domNode.innerHTML = "";
			this._clickableIncrementDate = fromIso(this.clickableIncrement);
			this._visibleIncrementDate = fromIso(this.visibleIncrement);
			// get the value of the increments to find out how many divs to create
			var
				sinceMidnight = function(/*Date*/ date){
					return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
				},
				clickableIncrementSeconds = sinceMidnight(this._clickableIncrementDate),
				visibleIncrementSeconds = sinceMidnight(this._visibleIncrementDate),
				// round reference date to previous visible increment
				time = (this.value || this.currentFocus).getTime();

			this._refDate = fromIso(this.pickerMin);
			this._refDate.setFullYear(1970, 0, 1); // match parse defaults

			// assume clickable increment is the smallest unit
			this._clickableIncrement = 1;
			// divide the visible range by the clickable increment to get the number of divs to create
			// example: 10:00:00/00:15:00 -> display 40 divs
			// divide the visible increments by the clickable increments to get how often to display the time inline
			// example: 01:00:00/00:15:00 -> display the time every 4 divs
			this._visibleIncrement = visibleIncrementSeconds / clickableIncrementSeconds;

			// get the number of increments (i.e. number of entries in the picker)
			var endDate = fromIso(this.pickerMax);
			endDate.setFullYear(1970, 0, 1);
			var visibleRange = (endDate.getTime() - this._refDate.getTime()) * 0.001;
			this._maxIncrement = Math.ceil((visibleRange + 1) / clickableIncrementSeconds);

			var nodes = this._getFilteredNodes();

			// never show empty due to a bad filter
			if(!nodes.firstChild && this.filterString){
				this.filterString = '';
				this._showText();
			}else{
				this.domNode.appendChild(nodes);
			}
		},

		constructor: function(/*===== params, srcNodeRef =====*/){
			// summary:
			//		Create the widget.
			// params: Object|null
			//		Hash of initialization parameters for widget, including scalar values (like title, duration etc.)
			//		and functions, typically callbacks like onClick.
			//		The hash can contain any of the widget's properties, excluding read-only properties.
			// srcNodeRef: DOMNode|String?
			//		If a srcNodeRef (DOM node) is specified, replace srcNodeRef with my generated DOM tree

			this.constraints = {};
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			this._setConstraintsAttr(this.constraints); // this needs to happen now (and later) due to codependency on _set*Attr calls
		},

		// For historical reasons TimeTextBox sends all the options for the _TimePicker inside of a constraints{} object
		_setConstraintsAttr: function(/* Object */ constraints){
			// brings in increments, etc.
			for (var key in { clickableIncrement: 1, visibleIncrement: 1, pickerMin: 1, pickerMax: 1 }) {
				if (key in constraints) {
					this[key] = constraints[key];
				}
			}

			// locale needs the lang in the constraints as locale
			if(!constraints.locale){
				constraints.locale = this.lang;
			}
		},

		_createOption: function(/*Number*/ index){
			// summary:
			//		Creates a clickable time option, or returns null if the specified index doesn't match the filter
			// tags:
			//		private
			var date = new Date(this._refDate);
			var incrementDate = this._clickableIncrementDate;
			date.setHours(date.getHours() + incrementDate.getHours() * index,
				date.getMinutes() + incrementDate.getMinutes() * index,
				date.getSeconds() + incrementDate.getSeconds() * index);
			if(this.constraints.selector == "time"){
				date.setFullYear(1970, 0, 1); // make sure each time is for the same date
			}
			var dateString = locale.format(date, this.constraints);
			if(this.filterString && dateString.toLowerCase().indexOf(this.filterString) !== 0){
				// Doesn't match the filter - return null
				return null;
			}

			var div = this.ownerDocument.createElement("div");
			div.className = this.baseClass + "Item";
			div.date = date;
			div.idx = index;
			domConstruct.create('div', {
				"class": this.baseClass + "ItemInner",
				innerHTML: dateString
			}, div);

			var marker = index % this._visibleIncrement < 1 && index % this._visibleIncrement > -1,
				tick = !marker && !(index % this._clickableIncrement);
			if(marker){
				div.className += " " + this.baseClass + "Marker";
			}else if(tick){
				div.className += " " + this.baseClass + "Tick";
			}

			if(this.isDisabledDate(date)){
				// set disabled
				div.className += " " + this.baseClass + "ItemDisabled";
			}
			if(this.value && !ddate.compare(this.value, date, this.constraints.selector)){
				div.selected = true;
				div.className += " " + this.baseClass + "ItemSelected";
				this._selectedDiv = div;
				if(marker){
					div.className += " " + this.baseClass + "MarkerSelected";
				}else if(tick){
					div.className += " " + this.baseClass + "TickSelected";
				}

				// Initially highlight the current value.   User can change highlight by up/down arrow keys
				// or mouse movement.
				this._highlightOption(div, true);
			}
			return div;
		},

		onOpen: function(){
			this.inherited(arguments);

			// Since _ListBase::_setSelectedAttr() calls scrollIntoView(), shouldn't call it until list is visible.
			this.set("selected", this._selectedDiv);
		},

		_onOptionSelected: function(/*Object*/ tgt, /*Boolean*/ change){
			// summary:
			//		Called when user clicks or keys to an option in the drop down list
			// tgt: Object
			//		tgt.target specifies the node that was clicked
			// change: Boolean
			//		If true, fire "change" event, otherwise just fire "input" event.
			// tags:
			//		private
			var tdate = tgt.target.date || tgt.target.parentNode.date;
			if(!tdate || this.isDisabledDate(tdate)){
				return;
			}
			this._set('value', tdate);
			this.emit("input");
			if(change) {
				this._highlighted_option = null;
				this.set('value', tdate);
				this.onChange(tdate);
			}
		},

		onChange: function(/*Date*/ /*===== time =====*/){
			// summary:
			//		Notification that a time was selected.  It may be the same as the previous value.
			// tags:
			//		public
		},

		_highlightOption: function(/*node*/ node, /*Boolean*/ highlight){
			// summary:
			//		Turns on/off highlight effect on a node based on mouse out/over event
			// tags:
			//		private
			if(!node){
				return;
			}
			if(highlight){
				if(this._highlighted_option){
					this._highlightOption(this._highlighted_option, false);
				}
				this._highlighted_option = node;
			}else if(this._highlighted_option !== node){
				return;
			}else{
				this._highlighted_option = null;
			}
			domClass.toggle(node, this.baseClass + "ItemHover", highlight);
			if(domClass.contains(node, this.baseClass + "Marker")){
				domClass.toggle(node, this.baseClass + "MarkerHover", highlight);
			}else{
				domClass.toggle(node, this.baseClass + "TickHover", highlight);
			}
		},

		handleKey: function(/*Event*/ e){
			// summary:
			//		Called from `dijit/form/_DateTimeTextBox` to pass a keypress event
			//		from the `dijit/form/TimeTextBox` to be handled in this widget
			// tags:
			//		protected
			if(e.keyCode == keys.DOWN_ARROW){
				this.selectNextNode();
				this._onOptionSelected({target: this._highlighted_option}, false);
				e.stopPropagation();
				e.preventDefault();
				return false;
			}else if(e.keyCode == keys.UP_ARROW){
				this.selectPreviousNode();
				this._onOptionSelected({target: this._highlighted_option}, false);
				e.stopPropagation();
				e.preventDefault();
				return false;
			}else if(e.keyCode == keys.ENTER || e.keyCode === keys.TAB){
				// mouse hover followed by TAB is NO selection
				if(!this._keyboardSelected && e.keyCode === keys.TAB){
					return true;	// true means don't call stopEvent()
				}

				// Accept the currently-highlighted option as the value
				if(this._highlighted_option){
					this._onOptionSelected({target: this._highlighted_option}, true);
				}

				// Call stopEvent() for ENTER key so that form doesn't submit,
				// but not for TAB, so that TAB does switch focus
				return e.keyCode === keys.TAB;
			}
			return undefined;
		},

		// Implement abstract methods for _ListBase
		onHover: function(/*DomNode*/ node){
			this._highlightOption(node, true);
		},

		onUnhover: function(/*DomNode*/ node){
			this._highlightOption(node, false);
		},

		onSelect: function(/*DomNode*/ node){
			this._highlightOption(node, true);
		},

		onDeselect: function(/*DomNode*/ node){
			this._highlightOption(node, false);
		},

		onClick: function(/*DomNode*/ node){
			this._onOptionSelected({target: node}, true);
		}
	});

	/*=====
	 TimePicker.__Constraints = declare(locale.__FormatOptions, {
		 // clickableIncrement: String
		 //		See `dijit/_TimePicker.clickableIncrement`
		 clickableIncrement: "T00:15:00"
	 });
	 =====*/

	return TimePicker;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/DateTextBox.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/form/DateTextBox.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! ../Calendar */ "./node_modules/dijit/Calendar.js"),
	__webpack_require__(/*! ./_DateTimeTextBox */ "./node_modules/dijit/form/_DateTimeTextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, Calendar, _DateTimeTextBox){

	// module:
	//		dijit/form/DateTextBox

	return declare("dijit.form.DateTextBox", _DateTimeTextBox, {
		// summary:
		//		A validating, serializable, range-bound date text box with a drop down calendar
		// example:
		// |	new DateTextBox({value: new Date(2009, 0, 20)})
		// example:
		// |	<input data-dojo-type='dijit/form/DateTextBox' value='2009-01-20'>

		baseClass: "dijitTextBox dijitComboBox dijitDateTextBox",
		popupClass: Calendar,
		_selector: "date",

		// Prevent scrollbar on Calendar dropdown.  On iPad it often gets a scrollbar unnecessarily because Viewport
		// thinks the keyboard is showing.  Even if the keyboard is showing, it disappears when the calendar gets focus.
		maxHeight: Infinity,

		// value: Date
		//		The value of this widget as a JavaScript Date object, with only year/month/day specified.
		//		If specified in markup, use the format specified in `stamp.fromISOString`.
		//		set("value", ...) accepts either a Date object or a string.
		value: new Date("")	// value.toString()="NaN"
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/MappedTextBox.js":
/*!**************************************************!*\
  !*** ./node_modules/dijit/form/MappedTextBox.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/sniff */ "./node_modules/dojo/sniff.js"), // has("msapp")
	__webpack_require__(/*! dojo/dom-construct */ "./node_modules/dojo/dom-construct.js"), // domConstruct.place
	__webpack_require__(/*! ./ValidationTextBox */ "./node_modules/dijit/form/ValidationTextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, has, domConstruct, ValidationTextBox){

	// module:
	//		dijit/form/MappedTextBox

	return declare("dijit.form.MappedTextBox", ValidationTextBox, {
		// summary:
		//		A dijit/form/ValidationTextBox subclass which provides a base class for widgets that have
		//		a visible formatted display value, and a serializable
		//		value in a hidden input field which is actually sent to the server.
		// description:
		//		The visible display may
		//		be locale-dependent and interactive.  The value sent to the server is stored in a hidden
		//		input field which uses the `name` attribute declared by the original widget.  That value sent
		//		to the server is defined by the dijit/form/MappedTextBox.serialize() method and is typically
		//		locale-neutral.
		// tags:
		//		protected

		postMixInProperties: function(){
			this.inherited(arguments);

			// We want the name attribute to go to the hidden <input>, not the displayed <input>,
			// so override _FormWidget.postMixInProperties() setting of nameAttrSetting for IE.
			this.nameAttrSetting = "";
		},

		// Remap name attribute to be mapped to hidden node created in buildRendering(), rather than this.focusNode
		_setNameAttr: "valueNode",

		serialize: function(val /*=====, options =====*/){
			// summary:
			//		Overridable function used to convert the get('value') result to a canonical
			//		(non-localized) string.  For example, will print dates in ISO format, and
			//		numbers the same way as they are represented in javascript.
			// val: anything
			// options: Object?
			// tags:
			//		protected extension
			return val.toString ? val.toString() : ""; // String
		},

		toString: function(){
			// summary:
			//		Returns widget as a printable string using the widget's value
			// tags:
			//		protected
			var val = this.filter(this.get('value')); // call filter in case value is nonstring and filter has been customized
			return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; // String
		},

		validate: function(){
			// Overrides `dijit/form/TextBox.validate`
			this.valueNode.value = this.toString();
			return this.inherited(arguments);
		},

		buildRendering: function(){
			// Overrides `dijit/_TemplatedMixin/buildRendering`

			this.inherited(arguments);

			// Create a hidden <input> node with the serialized value used for submit
			// (as opposed to the displayed value).
			// Passing in name as markup rather than relying on _setNameAttr custom setter above
			// to make query(input[name=...]) work on IE. (see #8660).
			// But not doing that for Windows 8 Store apps because it causes a security exception (see #16452).
			this.valueNode = domConstruct.place("<input type='hidden'" +
				((this.name && !has("msapp")) ? ' name="' + this.name.replace(/"/g, "&quot;") + '"' : "") + "/>",
				this.textbox, "after");
		},

		reset: function(){
			// Overrides `dijit/form/ValidationTextBox.reset` to
			// reset the hidden textbox value to ''
			this.valueNode.value = '';
			this.inherited(arguments);
		}
	});
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/RangeBoundTextBox.js":
/*!******************************************************!*\
  !*** ./node_modules/dijit/form/RangeBoundTextBox.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/i18n */ "./node_modules/dojo/i18n.js"), // i18n.getLocalization
	__webpack_require__(/*! ./MappedTextBox */ "./node_modules/dijit/form/MappedTextBox.js"),
	__webpack_require__(/*! dojo/i18n!./nls/validate */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dijit/form/nls/validate.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, i18n, MappedTextBox){

	// module:
	//		dijit/form/RangeBoundTextBox


	var RangeBoundTextBox = declare("dijit.form.RangeBoundTextBox", MappedTextBox, {
		// summary:
		//		Base class for textbox form widgets which defines a range of valid values.

		// rangeMessage: String
		//		The message to display if value is out-of-range
		rangeMessage: "",

		/*=====
		// constraints: RangeBoundTextBox.__Constraints
		constraints: {},
		======*/

		rangeCheck: function(/*Number*/ primitive, /*dijit/form/RangeBoundTextBox.__Constraints*/ constraints){
			// summary:
			//		Overridable function used to validate the range of the numeric input value.
			// tags:
			//		protected
			return	("min" in constraints? (this.compare(primitive,constraints.min) >= 0) : true) &&
				("max" in constraints? (this.compare(primitive,constraints.max) <= 0) : true); // Boolean
		},

		isInRange: function(/*Boolean*/ /*===== isFocused =====*/){
			// summary:
			//		Tests if the value is in the min/max range specified in constraints
			// tags:
			//		protected
			return this.rangeCheck(this.get('value'), this.constraints);
		},

		_isDefinitelyOutOfRange: function(){
			// summary:
			//		Returns true if the value is out of range and will remain
			//		out of range even if the user types more characters
			var val = this.get('value');
			if(val == null){ return false; } // not yet valid enough to compare to
			var outOfRange = false;
			if("min" in this.constraints){
				var min = this.constraints.min;
				outOfRange = this.compare(val, ((typeof min == "number") && min >= 0 && val != 0) ? 0 : min) < 0;
			}
			if(!outOfRange && ("max" in this.constraints)){
				var max = this.constraints.max;
				outOfRange = this.compare(val, ((typeof max != "number") || max > 0) ? max : 0) > 0;
			}
			return outOfRange;
		},

		_isValidSubset: function(){
			// summary:
			//		Overrides `dijit/form/ValidationTextBox._isValidSubset()`.
			//		Returns true if the input is syntactically valid, and either within
			//		range or could be made in range by more typing.
			return this.inherited(arguments) && !this._isDefinitelyOutOfRange();
		},

		isValid: function(/*Boolean*/ isFocused){
			// Overrides dijit/form/ValidationTextBox.isValid() to check that the value is also in range.
			return this.inherited(arguments) &&
				((this._isEmpty(this.textbox.value) && !this.required) || this.isInRange(isFocused)); // Boolean
		},

		getErrorMessage: function(/*Boolean*/ isFocused){
			// Overrides dijit/form/ValidationTextBox.getErrorMessage() to print "out of range" message if appropriate
			var v = this.get('value');
			if(v != null /* and !undefined */ && v !== '' && (typeof v != "number" || !isNaN(v)) && !this.isInRange(isFocused)){ // don't check isInRange w/o a real value
				return this.rangeMessage; // String
			}
			return this.inherited(arguments);
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			if(!this.rangeMessage){
				this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
				this.rangeMessage = this.messages.rangeMessage;
			}
		}
	});
	/*=====
	RangeBoundTextBox.__Constraints = declare(null, {
		// min: Number
		//		Minimum signed value.  Default is -Infinity
		// max: Number
		//		Maximum signed value.  Default is +Infinity
	});
	=====*/
	return RangeBoundTextBox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/TimeTextBox.js":
/*!************************************************!*\
  !*** ./node_modules/dijit/form/TimeTextBox.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/keys */ "./node_modules/dojo/keys.js"), // keys.DOWN_ARROW keys.ENTER keys.ESCAPE keys.TAB keys.UP_ARROW
	__webpack_require__(/*! dojo/query */ "./node_modules/dojo/query.js"),
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.hitch
	__webpack_require__(/*! ../_TimePicker */ "./node_modules/dijit/_TimePicker.js"),
	__webpack_require__(/*! ./_DateTimeTextBox */ "./node_modules/dijit/form/_DateTimeTextBox.js")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(declare, keys, query, lang, _TimePicker, _DateTimeTextBox){

	// module:
	//		dijit/form/TimeTextBox


	var TimeTextBox = declare("dijit.form.TimeTextBox", _DateTimeTextBox, {
		// summary:
		//		A validating, serializable, range-bound time text box with a drop down time picker

		baseClass: "dijitTextBox dijitComboBox dijitTimeTextBox",
		popupClass: _TimePicker,
		_selector: "time",

/*=====
		// constraints: TimeTextBox.__Constraints
		//		Despite the name, this parameter specifies both constraints on the input
		//		(including minimum/maximum allowed values) as well as
		//		formatting options.  See `dijit/form/TimeTextBox.__Constraints` for details.
		constraints:{},
=====*/

		// value: Date
		//		The value of this widget as a JavaScript Date object.  Note that the date portion implies time zone and daylight savings rules.
		//
		//		Example:
		// |	new dijit/form/TimeTextBox({value: stamp.fromISOString("T12:59:59", new Date())})
		//
		//		When passed to the parser in markup, must be specified according to locale-independent
		//		`stamp.fromISOString` format.
		//
		//		Example:
		// |	<input data-dojo-type='dijit/form/TimeTextBox' value='T12:34:00'>
		value: new Date(""),		// value.toString()="NaN"
		//FIXME: in markup, you have no control over daylight savings

		// Add scrollbars if necessary so that dropdown doesn't cover the <input>
		maxHeight: -1,

		openDropDown: function(/*Function*/ callback){
			this.inherited(arguments);

			// Fix #18683
			var selectedNode = query(".dijitTimePickerItemSelected", this.dropDown.domNode),
				parentNode=this.dropDown.domNode.parentNode;
			if(selectedNode[0]){
				// Center the selected node in the client area of the popup.
				parentNode.scrollTop=selectedNode[0].offsetTop-(parentNode.clientHeight-selectedNode[0].clientHeight)/2;
			}else{
				// There is no currently selected value. Position the list so that the median
				// node is visible.
				parentNode.scrollTop=(parentNode.scrollHeight-parentNode.clientHeight)/2;
            }

			// For screen readers, as user arrows through values, populate <input> with latest value.
			this.dropDown.on("input", lang.hitch(this, function(){
				this.set('value', this.dropDown.get("value"), false);
			}));
		},

		_onInput: function(){
			this.inherited(arguments);

			// set this.filterString to the filter to apply to the drop down list;
			// it will be used in openDropDown()
			var val = this.get('displayedValue');
			this.filterString = (val && !this.parse(val, this.constraints)) ? val.toLowerCase() : "";

			// close the drop down and reopen it, in order to filter the items shown in the list
			// and also since the drop down may need to be repositioned if the number of list items has changed
			// and it's being displayed above the <input>
			if(this._opened){
				this.closeDropDown();
			}
			this.openDropDown();
		}
	});

	/*=====
	 TimeTextBox.__Constraints = declare([_DateTimeTextBox.__Constraints, _TimePicker.__Constraints], {
		 // summary:
		 //		Specifies both the rules on valid/invalid values (first/last time allowed),
		 //		and also formatting options for how the time is displayed.
	 });
	 =====*/

	return TimeTextBox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dijit/form/_DateTimeTextBox.js":
/*!*****************************************************!*\
  !*** ./node_modules/dijit/form/_DateTimeTextBox.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! dojo/date */ "./node_modules/dojo/date.js"), // date date.compare
	__webpack_require__(/*! dojo/date/locale */ "./node_modules/dojo/date/locale.js"), // locale.regexp
	__webpack_require__(/*! dojo/date/stamp */ "./node_modules/dojo/date/stamp.js"), // stamp.fromISOString stamp.toISOString
	__webpack_require__(/*! dojo/_base/declare */ "./node_modules/dojo/_base/declare.js"), // declare
	__webpack_require__(/*! dojo/_base/lang */ "./node_modules/dojo/_base/lang.js"), // lang.getObject
	__webpack_require__(/*! ./RangeBoundTextBox */ "./node_modules/dijit/form/RangeBoundTextBox.js"),
	__webpack_require__(/*! ../_HasDropDown */ "./node_modules/dijit/_HasDropDown.js"),
	__webpack_require__(/*! dojo/text!./templates/DropDownBox.html */ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/form/templates/DropDownBox.html")
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(date, locale, stamp, declare, lang, RangeBoundTextBox, _HasDropDown, template){

	// module:
	//		dijit/form/_DateTimeTextBox

	new Date("X"); // workaround for #11279, new Date("") == NaN

	var _DateTimeTextBox = declare("dijit.form._DateTimeTextBox", [RangeBoundTextBox, _HasDropDown], {
		// summary:
		//		Base class for validating, serializable, range-bound date or time text box.

		templateString: template,

		// hasDownArrow: [const] Boolean
		//		Set this textbox to display a down arrow button, to open the drop down list.
		hasDownArrow: true,

		// Set classes like dijitDownArrowButtonHover depending on mouse action over button node
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},

		/*=====
		// constraints: _DateTimeTextBox.__Constraints
		//		Despite the name, this parameter specifies both constraints on the input
		//		(including starting/ending dates/times allowed) as well as
		//		formatting options like whether the date is displayed in long (ex: December 25, 2005)
		//		or short (ex: 12/25/2005) format.  See `dijit/form/_DateTimeTextBox.__Constraints` for details.
		constraints: {},
		======*/

		// The constraints without the min/max properties. Used by the compare() method
		_unboundedConstraints: {},

		// Override ValidationTextBox.pattern.... we use a reg-ex generating function rather
		// than a straight regexp to deal with locale  (plus formatting options too?)
		pattern: locale.regexp,

		// datePackage: String
		//		JavaScript namespace to find calendar routines.	 If unspecified, uses Gregorian calendar routines
		//		at dojo/date and dojo/date/locale.
		datePackage: "",
		//		TODO: for 2.0, replace datePackage with dateModule and dateLocalModule attributes specifying MIDs,
		//		or alternately just get rid of this completely and tell user to use module ID remapping
		//		via require

		postMixInProperties: function(){
			this.inherited(arguments);
			this._set("type", "text"); // in case type="date"|"time" was specified which messes up parse/format
		},

		// Override _FormWidget.compare() to work for dates/times
		compare: function(/*Date*/ val1, /*Date*/ val2){
			var isInvalid1 = this._isInvalidDate(val1);
			var isInvalid2 = this._isInvalidDate(val2);
			if (isInvalid1 || isInvalid2){
				return (isInvalid1 && isInvalid2) ? 0 : (!isInvalid1 ? 1 : -1);
			}
			// Format and parse the values before comparing them to make sure that only the parts of the
			// date that will make the "round trip" get compared.
			var fval1 = this.format(val1, this._unboundedConstraints),
				fval2 = this.format(val2, this._unboundedConstraints),
				pval1 = this.parse(fval1, this._unboundedConstraints),
				pval2 = this.parse(fval2, this._unboundedConstraints);

			return fval1 == fval2 ? 0 : date.compare(pval1, pval2, this._selector);
		},

		// flag to _HasDropDown to make drop down Calendar width == <input> width
		autoWidth: true,

		format: function(/*Date*/ value, /*locale.__FormatOptions*/ constraints){
			// summary:
			//		Formats the value as a Date, according to specified locale (second argument)
			// tags:
			//		protected
			if(!value){ return ''; }
			return this.dateLocaleModule.format(value, constraints);
		},

		"parse": function(/*String*/ value, /*locale.__FormatOptions*/ constraints){
			// summary:
			//		Parses as string as a Date, according to constraints
			// tags:
			//		protected

			return this.dateLocaleModule.parse(value, constraints) || (this._isEmpty(value) ? null : undefined);	 // Date
		},

		// Overrides ValidationTextBox.serialize() to serialize a date in canonical ISO format.
		serialize: function(/*anything*/ val, /*Object?*/ options){
			if(val.toGregorian){
				val = val.toGregorian();
			}
			return stamp.toISOString(val, options);
		},

		// dropDownDefaultValue: Date
		//		The default value to focus in the popupClass widget when the textbox value is empty.
		dropDownDefaultValue : new Date(),

		// value: Date
		//		The value of this widget as a JavaScript Date object.  Use get("value") / set("value", val) to manipulate.
		//		When passed to the parser in markup, must be specified according to `dojo/date/stamp.fromISOString()`
		value: new Date(""),	// value.toString()="NaN"

		_blankValue: null,	// used by filter() when the textbox is blank

		// popupClass: [protected extension] String
		//		Name of the popup widget class used to select a date/time.
		//		Subclasses should specify this.
		popupClass: "", // default is no popup = text only


		// _selector: [protected extension] String
		//		Specifies constraints.selector passed to dojo.date functions, should be either
		//		"date" or "time".
		//		Subclass must specify this.
		_selector: "",

		constructor: function(params /*===== , srcNodeRef =====*/){
			// summary:
			//		Create the widget.
			// params: Object|null
			//		Hash of initialization parameters for widget, including scalar values (like title, duration etc.)
			//		and functions, typically callbacks like onClick.
			//		The hash can contain any of the widget's properties, excluding read-only properties.
			// srcNodeRef: DOMNode|String?
			//		If a srcNodeRef (DOM node) is specified, replace srcNodeRef with my generated DOM tree

			params = params || {};
			this.dateModule = params.datePackage ? lang.getObject(params.datePackage, false) : date;
			this.dateClassObj = this.dateModule.Date || Date;
			if(!(this.dateClassObj instanceof Date)){
				this.value = new this.dateClassObj(this.value);
			}
			this.dateLocaleModule = params.datePackage ? lang.getObject(params.datePackage+".locale", false) : locale;
			this._set('pattern', this.dateLocaleModule.regexp);
			this._invalidDate = this.constructor.prototype.value.toString();
		},

		buildRendering: function(){
			this.inherited(arguments);

			if(!this.hasDownArrow){
				this._buttonNode.style.display = "none";
			}

			// If hasDownArrow is false, we basically just want to treat the whole widget as the
			// button.
			if(!this.hasDownArrow){
				this._buttonNode = this.domNode;
				this.baseClass += " dijitComboBoxOpenOnClick";
			}
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			constraints.selector = this._selector;
			constraints.fullYear = true; // see #5465 - always format with 4-digit years
			var fromISO = stamp.fromISOString;
			if(typeof constraints.min == "string"){
				constraints.min = fromISO(constraints.min);
				if(!(this.dateClassObj instanceof Date)){
					constraints.min = new this.dateClassObj(constraints.min);
				}
			}
			if(typeof constraints.max == "string"){
				constraints.max = fromISO(constraints.max);
				if(!(this.dateClassObj instanceof Date)){
					constraints.max = new this.dateClassObj(constraints.max);
				}
			}
			this.inherited(arguments);
			this._unboundedConstraints = lang.mixin({}, this.constraints, {min: null, max: null});
		},

		_isInvalidDate: function(/*Date*/ value){
			// summary:
			//		Runs various tests on the value, checking for invalid conditions
			// tags:
			//		private
			return !value || isNaN(value) || typeof value != "object" || value.toString() == this._invalidDate;
		},

		_setValueAttr: function(/*Date|String*/ value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			// summary:
			//		Sets the date on this textbox. Note: value can be a JavaScript Date literal or a string to be parsed.
			if(value !== undefined){
				if(typeof value == "string"){
					value = stamp.fromISOString(value);
				}
				if(this._isInvalidDate(value)){
					value = null;
				}
				if(value instanceof Date && !(this.dateClassObj instanceof Date)){
					value = new this.dateClassObj(value);
				}
			}
			this.inherited(arguments, [value, priorityChange, formattedValue]);
			if(this.value instanceof Date){
				this.filterString = "";
			}

			// Set the dropdown's value to match, unless we are being updated due to the user navigating the TimeTextBox
			// dropdown via up/down arrow keys.
			if(priorityChange !== false && this.dropDown){
				this.dropDown.set('value', value, false);
			}
		},

		_set: function(attr, value){
			// Avoid spurious watch() notifications when value is changed to new Date object w/the same value
			if(attr == "value"){
				if(value instanceof Date && !(this.dateClassObj instanceof Date)){
					value = new this.dateClassObj(value);
				}
				var oldValue = this._get("value");
				if(oldValue instanceof this.dateClassObj && this.compare(value, oldValue) == 0){
					return;
				}
			}
			this.inherited(arguments);
		},

		_setDropDownDefaultValueAttr: function(/*Date*/ val){
			if(this._isInvalidDate(val)){
				// convert null setting into today's date, since there needs to be *some* default at all times.
				 val = new this.dateClassObj();
			}
			this._set("dropDownDefaultValue", val);
		},

		openDropDown: function(/*Function*/ callback){
			// rebuild drop down every time, so that constraints get copied (#6002)
			if(this.dropDown){
				this.dropDown.destroy();
			}
			var PopupProto = lang.isString(this.popupClass) ? lang.getObject(this.popupClass, false) : this.popupClass,
				textBox = this,
				value = this.get("value");
			this.dropDown = new PopupProto({
				onChange: function(value){
					// this will cause InlineEditBox and other handlers to do stuff so make sure it's last
					textBox.set('value', value, true);
				},
				id: this.id + "_popup",
				dir: textBox.dir,
				lang: textBox.lang,
				value: value,
				textDir: textBox.textDir,
				currentFocus: !this._isInvalidDate(value) ? value : this.dropDownDefaultValue,
				constraints: textBox.constraints,
				filterString: textBox.filterString, // for TimeTextBox, to filter times shown
				datePackage: textBox.datePackage,
				isDisabledDate: function(/*Date*/ date){
					// summary:
					//		disables dates outside of the min/max of the _DateTimeTextBox
					return !textBox.rangeCheck(date, textBox.constraints);
				}
			});

			this.inherited(arguments);
		},

		_getDisplayedValueAttr: function(){
			return this.textbox.value;
		},

		_setDisplayedValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange){
			this._setValueAttr(this.parse(value, this.constraints), priorityChange, value);
		}
	});


	/*=====
	 _DateTimeTextBox.__Constraints = declare([RangeBoundTextBox.__Constraints, locale.__FormatOptions], {
		 // summary:
		 //		Specifies both the rules on valid/invalid values (first/last date/time allowed),
		 //		and also formatting options for how the date/time is displayed.
		 // example:
		 //		To restrict to dates within 2004, displayed in a long format like "December 25, 2005":
		 //	|		{min:'2004-01-01',max:'2004-12-31', formatLength:'long'}
	 });
	 =====*/

	return _DateTimeTextBox;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojo/cldr/nls/gregorian.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n!./node_modules/dojo/cldr/nls/gregorian.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/dojo/cldr/nls/en/gregorian.js?absMid=dojo/cldr/nls/en/gregorian */ "./node_modules/dojo/cldr/nls/en/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/en-au/gregorian.js?absMid=dojo/cldr/nls/en-au/gregorian */ "./node_modules/dojo/cldr/nls/en-au/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/en-ca/gregorian.js?absMid=dojo/cldr/nls/en-ca/gregorian */ "./node_modules/dojo/cldr/nls/en-ca/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/en-gb/gregorian.js?absMid=dojo/cldr/nls/en-gb/gregorian */ "./node_modules/dojo/cldr/nls/en-gb/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/bs/gregorian.js?absMid=dojo/cldr/nls/bs/gregorian */ "./node_modules/dojo/cldr/nls/bs/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/es/gregorian.js?absMid=dojo/cldr/nls/es/gregorian */ "./node_modules/dojo/cldr/nls/es/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/hr/gregorian.js?absMid=dojo/cldr/nls/hr/gregorian */ "./node_modules/dojo/cldr/nls/hr/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/hu/gregorian.js?absMid=dojo/cldr/nls/hu/gregorian */ "./node_modules/dojo/cldr/nls/hu/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/pt/gregorian.js?absMid=dojo/cldr/nls/pt/gregorian */ "./node_modules/dojo/cldr/nls/pt/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/sr/gregorian.js?absMid=dojo/cldr/nls/sr/gregorian */ "./node_modules/dojo/cldr/nls/sr/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/zh/gregorian.js?absMid=dojo/cldr/nls/zh/gregorian */ "./node_modules/dojo/cldr/nls/zh/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/zh-hant/gregorian.js?absMid=dojo/cldr/nls/zh-hant/gregorian */ "./node_modules/dojo/cldr/nls/zh-hant/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/zh-hk/gregorian.js?absMid=dojo/cldr/nls/zh-hk/gregorian */ "./node_modules/dojo/cldr/nls/zh-hk/gregorian.js");
__webpack_require__(/*! ./node_modules/dojo/cldr/nls/zh-tw/gregorian.js?absMid=dojo/cldr/nls/zh-tw/gregorian */ "./node_modules/dojo/cldr/nls/zh-tw/gregorian.js");
__webpack_require__(/*! dojo/i18nRootModifier?absMid=dojo/cldr/nls/gregorian&bundledLocales=en|en-au|en-ca|en-gb|bs|es|hr|hu|pt|sr|zh|zh-hant|zh-hk|zh-tw!dojo/cldr/nls/gregorian */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=en%7Cen-au%7Cen-ca%7Cen-gb%7Cbs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-hant%7Czh-hk%7Czh-tw!./node_modules/dojo/cldr/nls/gregorian.js");
var req = __webpack_require__.dj.c();
module.exports = __webpack_require__(/*! ./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/runner.js")("dojo/cldr/nls/gregorian", req);

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier/index.js?bundledLocales=en%7Cen-au%7Cen-ca%7Cen-gb%7Cbs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-hant%7Czh-hk%7Czh-tw!./node_modules/dojo/cldr/nls/gregorian.js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/i18nRootModifier?bundledLocales=en%7Cen-au%7Cen-ca%7Cen-gb%7Cbs%7Ces%7Chr%7Chu%7Cpt%7Csr%7Czh%7Czh-hant%7Czh-hk%7Czh-tw!./node_modules/dojo/cldr/nls/gregorian.js ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
 "root": {
  "dateFormatItem-Ehm": "E h:mm a",
  "days-standAlone-short": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "months-format-narrow": [
   "1",
   "2",
   "3",
   "4",
   "5",
   "6",
   "7",
   "8",
   "9",
   "10",
   "11",
   "12"
  ],
  "field-second-relative+0": "now",
  "quarters-standAlone-narrow": [
   "1",
   "2",
   "3",
   "4"
  ],
  "field-weekday": "Day of the Week",
  "dateFormatItem-yQQQ": "y QQQ",
  "dateFormatItem-yMEd": "y-MM-dd, E",
  "field-wed-relative+0": "this Wednesday",
  "field-wed-relative+1": "next Wednesday",
  "dateFormatItem-GyMMMEd": "G y MMM d, E",
  "dateFormatItem-MMMEd": "MMM d, E",
  "eraNarrow": [
   "BCE",
   "CE"
  ],
  "field-tue-relative+-1": "last Tuesday",
  "days-format-short": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "dateTimeFormats-appendItem-Day-Of-Week": "{0} {1}",
  "dateFormat-long": "y MMMM d",
  "field-fri-relative+-1": "last Friday",
  "field-wed-relative+-1": "last Wednesday",
  "months-format-wide": [
   "M01",
   "M02",
   "M03",
   "M04",
   "M05",
   "M06",
   "M07",
   "M08",
   "M09",
   "M10",
   "M11",
   "M12"
  ],
  "dateTimeFormat-medium": "{1} {0}",
  "dayPeriods-format-wide-pm": "PM",
  "dateFormat-full": "y MMMM d, EEEE",
  "field-thu-relative+-1": "last Thursday",
  "dateFormatItem-Md": "MM-dd",
  "dayPeriods-format-abbr-am": "AM",
  "dateTimeFormats-appendItem-Second": "{0} ({2}: {1})",
  "dayPeriods-format-wide-noon": "noon",
  "dateFormatItem-yMd": "y-MM-dd",
  "field-era": "Era",
  "dateFormatItem-yM": "y-MM",
  "months-standAlone-wide": [
   "M01",
   "M02",
   "M03",
   "M04",
   "M05",
   "M06",
   "M07",
   "M08",
   "M09",
   "M10",
   "M11",
   "M12"
  ],
  "timeFormat-short": "HH:mm",
  "quarters-format-wide": [
   "Q1",
   "Q2",
   "Q3",
   "Q4"
  ],
  "dateFormatItem-yQQQQ": "y QQQQ",
  "timeFormat-long": "HH:mm:ss z",
  "field-year": "Year",
  "dateFormatItem-yMMM": "y MMM",
  "dateTimeFormats-appendItem-Era": "{1} {0}",
  "field-hour": "Hour",
  "months-format-abbr": [
   "M01",
   "M02",
   "M03",
   "M04",
   "M05",
   "M06",
   "M07",
   "M08",
   "M09",
   "M10",
   "M11",
   "M12"
  ],
  "field-sat-relative+0": "this Saturday",
  "field-sat-relative+1": "next Saturday",
  "timeFormat-full": "HH:mm:ss zzzz",
  "dateTimeFormats-appendItem-Week": "{0} ({2}: {1})",
  "field-day-relative+0": "today",
  "field-thu-relative+0": "this Thursday",
  "field-day-relative+1": "tomorrow",
  "field-thu-relative+1": "next Thursday",
  "dateFormatItem-GyMMMd": "G y MMM d",
  "dateFormatItem-H": "HH",
  "months-standAlone-abbr": [
   "M01",
   "M02",
   "M03",
   "M04",
   "M05",
   "M06",
   "M07",
   "M08",
   "M09",
   "M10",
   "M11",
   "M12"
  ],
  "quarters-format-abbr": [
   "Q1",
   "Q2",
   "Q3",
   "Q4"
  ],
  "quarters-standAlone-wide": [
   "Q1",
   "Q2",
   "Q3",
   "Q4"
  ],
  "dateFormatItem-Gy": "G y",
  "dateFormatItem-M": "L",
  "days-standAlone-wide": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "dayPeriods-format-abbr-noon": "noon",
  "timeFormat-medium": "HH:mm:ss",
  "field-sun-relative+0": "this Sunday",
  "dateFormatItem-Hm": "HH:mm",
  "field-sun-relative+1": "next Sunday",
  "quarters-standAlone-abbr": [
   "Q1",
   "Q2",
   "Q3",
   "Q4"
  ],
  "eraAbbr": [
   "BCE",
   "CE"
  ],
  "field-minute": "Minute",
  "field-dayperiod": "Dayperiod",
  "days-standAlone-abbr": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "dateFormatItem-d": "d",
  "dateFormatItem-ms": "mm:ss",
  "quarters-format-narrow": [
   "1",
   "2",
   "3",
   "4"
  ],
  "field-day-relative+-1": "yesterday",
  "dateTimeFormat-long": "{1} {0}",
  "dayPeriods-format-narrow-am": "a",
  "dateFormatItem-h": "h a",
  "dateFormatItem-MMMd": "MMM d",
  "dateFormatItem-MEd": "MM-dd, E",
  "dateTimeFormat-full": "{1} {0}",
  "field-fri-relative+0": "this Friday",
  "field-fri-relative+1": "next Friday",
  "field-day": "Day",
  "days-format-wide": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "field-zone": "Zone",
  "months-standAlone-narrow": [
   "1",
   "2",
   "3",
   "4",
   "5",
   "6",
   "7",
   "8",
   "9",
   "10",
   "11",
   "12"
  ],
  "dateFormatItem-y": "y",
  "dateTimeFormats-appendItem-Day": "{0} ({2}: {1})",
  "field-year-relative+-1": "last year",
  "field-month-relative+-1": "last month",
  "dateTimeFormats-appendItem-Year": "{1} {0}",
  "dateFormatItem-hm": "h:mm a",
  "dateTimeFormats-appendItem-Hour": "{0} ({2}: {1})",
  "dayPeriods-format-abbr-pm": "PM",
  "days-format-abbr": [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thu",
   "Fri",
   "Sat"
  ],
  "eraNames": [
   "BCE",
   "CE"
  ],
  "dateFormatItem-yMMMd": "y MMM d",
  "days-format-narrow": [
   "S",
   "M",
   "T",
   "W",
   "T",
   "F",
   "S"
  ],
  "field-month": "Month",
  "days-standAlone-narrow": [
   "S",
   "M",
   "T",
   "W",
   "T",
   "F",
   "S"
  ],
  "dateFormatItem-MMM": "LLL",
  "field-tue-relative+0": "this Tuesday",
  "dateTimeFormats-appendItem-Quarter": "{0} ({2}: {1})",
  "field-tue-relative+1": "next Tuesday",
  "dayPeriods-format-wide-am": "AM",
  "dateTimeFormats-appendItem-Month": "{0} ({2}: {1})",
  "dateTimeFormats-appendItem-Minute": "{0} ({2}: {1})",
  "dateFormatItem-EHm": "E HH:mm",
  "field-mon-relative+0": "this Monday",
  "field-mon-relative+1": "next Monday",
  "dateFormat-short": "y-MM-dd",
  "dateFormatItem-EHms": "E HH:mm:ss",
  "dateFormatItem-Ehms": "E h:mm:ss a",
  "dayPeriods-format-narrow-noon": "n",
  "field-second": "Second",
  "field-sat-relative+-1": "last Saturday",
  "dateFormatItem-yMMMEd": "y MMM d, E",
  "field-sun-relative+-1": "last Sunday",
  "field-month-relative+0": "this month",
  "field-month-relative+1": "next month",
  "dateTimeFormats-appendItem-Timezone": "{0} {1}",
  "dateFormatItem-Ed": "d, E",
  "field-week": "Week",
  "dateFormat-medium": "y MMM d",
  "field-week-relative+-1": "last week",
  "field-year-relative+0": "this year",
  "field-year-relative+1": "next year",
  "dayPeriods-format-narrow-pm": "p",
  "dateTimeFormat-short": "{1} {0}",
  "dateFormatItem-Hms": "HH:mm:ss",
  "dateFormatItem-hms": "h:mm:ss a",
  "dateFormatItem-GyMMM": "G y MMM",
  "field-mon-relative+-1": "last Monday",
  "field-week-relative+0": "this week",
  "field-week-relative+1": "next week"
 },
 "ar": false,
 "bs": true,
 "ca": false,
 "cs": false,
 "da": false,
 "de": false,
 "el": false,
 "en": true,
 "en-au": true,
 "en-ca": true,
 "en-gb": true,
 "es": true,
 "fi": false,
 "fr": false,
 "fr-ch": false,
 "he": false,
 "hr": true,
 "hu": true,
 "id": false,
 "it": false,
 "ja": false,
 "ko": false,
 "mk": false,
 "nb": false,
 "nl": false,
 "pl": false,
 "pt": true,
 "pt-pt": false,
 "ro": false,
 "ru": false,
 "sk": false,
 "sl": false,
 "sr": true,
 "sv": false,
 "th": false,
 "tr": false,
 "zh": true,
 "zh-hant": true,
 "zh-hk": true,
 "zh-tw": true
})

/***/ }),

/***/ "./node_modules/dojo-webpack-plugin/loaders/dojo/text/index.js!./node_modules/dijit/templates/Calendar.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/dojo-webpack-plugin/loaders/dojo/text!./node_modules/dijit/templates/Calendar.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dijitCalendarContainer dijitInline\" role=\"presentation\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<div class=\"dijitReset dijitCalendarMonthContainer\" role=\"presentation\">\n\t\t<div class='dijitReset dijitCalendarArrow dijitCalendarDecrementArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t</div>\n\t\t<div class='dijitReset dijitCalendarArrow dijitCalendarIncrementArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t</div>\n\t\t<div data-dojo-attach-point=\"monthNode\" class=\"dijitInline\"></div>\n\t</div>\n\t<table cellspacing=\"0\" cellpadding=\"0\" role=\"grid\" data-dojo-attach-point=\"gridNode\">\n\t\t<thead>\n\t\t\t<tr role=\"row\">\n\t\t\t\t${!dayCellsHtml}\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"ondijitclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t\t${!dateRowsHtml}\n\t\t</tbody>\n\t</table>\n\t<div class=\"dijitReset dijitCalendarYearContainer\" role=\"presentation\">\n\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/bs/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/bs/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-yM": "MM.y.",
	"field-dayperiod": "prijepodne/poslijepodne",
	"dayPeriods-format-wide-pm": "popodne",
	"field-minute": "minut",
	"eraNames": [
		"Prije nove ere",
		"Nove ere"
	],
	"dateFormatItem-MMMEd": "E, dd. MMM",
	"field-day-relative+-1": "juče",
	"field-weekday": "dan u sedmici",
	"dateFormatItem-hms": "hh:mm:ss a",
	"dateFormatItem-yQQQ": "y QQQ",
	"field-day-relative+-2": "prekjuče",
	"days-standAlone-wide": [
		"nedjelja",
		"ponedjeljak",
		"utorak",
		"srijeda",
		"četvrtak",
		"petak",
		"subota"
	],
	"dateFormatItem-MMM": "LLL",
	"months-standAlone-narrow": [
		"j",
		"f",
		"m",
		"a",
		"m",
		"j",
		"j",
		"a",
		"s",
		"o",
		"n",
		"d"
	],
	"field-era": "era",
	"dateFormatItem-Gy": "y. G",
	"field-hour": "sat",
	"dayPeriods-format-wide-am": "prije podne",
	"quarters-standAlone-abbr": [
		"K1",
		"K2",
		"K3",
		"K4"
	],
	"dateFormatItem-y": "y.",
	"timeFormat-full": "HH:mm:ss zzzz",
	"months-standAlone-abbr": [
		"jan",
		"feb",
		"mar",
		"apr",
		"maj",
		"jun",
		"jul",
		"aug",
		"sep",
		"okt",
		"nov",
		"dec"
	],
	"dateFormatItem-Ed": "E, dd.",
	"dateFormatItem-yMMM": "MMM y.",
	"field-day-relative+0": "danas",
	"field-day-relative+1": "sutra",
	"eraAbbr": [
		"p. n. e.",
		"n. e."
	],
	"field-day-relative+2": "prekosutra",
	"dateFormatItem-GyMMMd": "dd. MMM y. G",
	"dateFormat-long": "dd. MMMM y.",
	"timeFormat-medium": "HH:mm:ss",
	"field-zone": "zona",
	"dateFormatItem-Hm": "HH:mm",
	"dateFormat-medium": "dd. MMM. y.",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-yMd": "dd.MM.y.",
	"quarters-standAlone-wide": [
		"Prvi kvartal",
		"Drugi kvartal",
		"Treći kvartal",
		"Četvrti kvartal"
	],
	"dateFormatItem-ms": "mm:ss",
	"field-year": "godina",
	"field-week": "sedmica",
	"months-standAlone-wide": [
		"januar",
		"februar",
		"mart",
		"april",
		"maj",
		"juni",
		"juli",
		"august",
		"septembar",
		"oktobar",
		"novembar",
		"decembar"
	],
	"dateFormatItem-MMMd": "dd. MMM",
	"timeFormat-long": "HH:mm:ss z",
	"months-format-abbr": [
		"jan",
		"feb",
		"mar",
		"apr",
		"maj",
		"jun",
		"jul",
		"aug",
		"sep",
		"okt",
		"nov",
		"dec"
	],
	"dateFormatItem-yQQQQ": "y QQQQ",
	"timeFormat-short": "HH:mm",
	"field-month": "mjesec",
	"quarters-format-abbr": [
		"K1",
		"K2",
		"K3",
		"K4"
	],
	"days-format-abbr": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormatItem-M": "L",
	"dateFormatItem-yMMMd": "dd. MMM y.",
	"field-second": "sekund",
	"dateFormatItem-GyMMMEd": "E, dd. MMM y. G",
	"dateFormatItem-GyMMM": "MMM y. G",
	"field-day": "dan",
	"dateFormatItem-MEd": "E, dd.MM.",
	"months-format-narrow": [
		"j",
		"f",
		"m",
		"a",
		"m",
		"j",
		"j",
		"a",
		"s",
		"o",
		"n",
		"d"
	],
	"days-standAlone-short": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormatItem-hm": "hh:mm a",
	"days-standAlone-abbr": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormat-short": "dd.MM.yy.",
	"dateFormatItem-yMMMEd": "E, dd. MMM y.",
	"dateFormat-full": "EEEE, dd. MMMM y.",
	"dateFormatItem-Md": "dd.MM.",
	"dateFormatItem-yMEd": "E, dd.MM.y.",
	"months-format-wide": [
		"januar",
		"februar",
		"mart",
		"april",
		"maj",
		"juni",
		"juli",
		"august",
		"septembar",
		"oktobar",
		"novembar",
		"decembar"
	],
	"days-format-short": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormatItem-d": "d",
	"quarters-format-wide": [
		"Prvi kvartal",
		"Drugi kvartal",
		"Treći kvartal",
		"Četvrti kvartal"
	],
	"days-format-wide": [
		"nedjelja",
		"ponedjeljak",
		"utorak",
		"srijeda",
		"četvrtak",
		"petak",
		"subota"
	],
	"eraNarrow": [
		"p. n. e.",
		"n. e."
	]
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/en-au/gregorian.js":
/*!*******************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/en-au/gregorian.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-yMd": "d/M/y",
	"dateFormat-medium": "d MMM y",
	"field-year-relative+-1": "Last year",
	"dateFormatItem-yMEd": "E, d/M/y",
	"field-month-relative+-1": "Last month",
	"field-day-relative+-1": "Yesterday",
	"timeFormat-full": "h:mm:ss a zzzz",
	"field-week-relative+0": "This week",
	"field-week-relative+1": "Next week",
	"timeFormat-medium": "h:mm:ss a",
	"field-week-relative+-1": "Last week",
	"field-day-relative+0": "Today",
	"field-day-relative+1": "Tomorrow",
	"dateFormat-long": "d MMMM y",
	"field-month-relative+0": "This month",
	"field-month-relative+1": "Next month",
	"dateFormat-short": "d/MM/y",
	"field-year-relative+0": "This year",
	"field-year-relative+1": "Next year",
	"timeFormat-short": "h:mm a",
	"timeFormat-long": "h:mm:ss a z",
	"dateFormat-full": "EEEE, d MMMM y"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/en-ca/gregorian.js":
/*!*******************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/en-ca/gregorian.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-yMEd": "E, y-MM-dd",
	"dateFormatItem-yMd": "y-MM-dd",
	"dateFormat-short": "y-MM-dd",
	"dateFormatItem-MEd": "E, MM-dd",
	"dateFormatItem-yM": "y-MM",
	"dateFormatItem-Md": "MM-dd"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/en-gb/gregorian.js":
/*!*******************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/en-gb/gregorian.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormat-medium": "d MMM y",
	"dateFormatItem-yMd": "dd/MM/y",
	"dateFormatItem-MMMEd": "E d MMM",
	"dateFormatItem-MEd": "E dd/MM",
	"dateFormatItem-MMdd": "dd/MM",
	"dateFormatItem-yMEd": "E, dd/MM/y",
	"dateTimeFormat-medium": "{1} {0}",
	"dateFormatItem-GyMMMd": "d MMM y G",
	"timeFormat-full": "HH:mm:ss zzzz",
	"dateFormatItem-yMMMd": "d MMM y",
	"dateFormatItem-Md": "dd/MM",
	"dateFormatItem-GyMMMEd": "E, d MMM y G",
	"dateFormatItem-M": "LL",
	"dayPeriods-format-wide-pm": "p.m.",
	"dateFormatItem-MMMMd": "d MMMM",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-wide-am": "a.m.",
	"timeFormat-medium": "HH:mm:ss",
	"dateFormat-long": "d MMMM y",
	"field-dayperiod": "a.m./p.m.",
	"dateFormat-short": "dd/MM/y",
	"dateFormatItem-yMMMEd": "E, d MMM y",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-yMMMM": "MMMM y",
	"dateTimeFormat-full": "{1} {0}",
	"dateFormatItem-yM": "MM/y",
	"timeFormat-short": "HH:mm",
	"timeFormat-long": "HH:mm:ss z",
	"dateFormat-full": "EEEE, d MMMM y",
	"dateFormatItem-MMMd": "d MMM",
	"dateFormatItem-Ed": "E d"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/en/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/en/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E h:mm a",
	"days-standAlone-short": [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	"months-format-narrow": [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-second-relative+0": "now",
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "Day of the Week",
	"dateFormatItem-yQQQ": "QQQ y",
	"dateFormatItem-yMEd": "E, M/d/y",
	"field-wed-relative+0": "this Wednesday",
	"field-wed-relative+1": "next Wednesday",
	"dateFormatItem-GyMMMEd": "E, MMM d, y G",
	"dateFormatItem-MMMEd": "E, MMM d",
	"eraNarrow": [
		"B",
		"A"
	],
	"field-tue-relative+-1": "last Tuesday",
	"days-format-short": [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	"dateTimeFormats-appendItem-Day-Of-Week": "{0} {1}",
	"dateFormat-long": "MMMM d, y",
	"field-fri-relative+-1": "last Friday",
	"field-wed-relative+-1": "last Wednesday",
	"months-format-wide": [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	"dateTimeFormat-medium": "{1}, {0}",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, MMMM d, y",
	"field-thu-relative+-1": "last Thursday",
	"dateFormatItem-Md": "M/d",
	"dateTimeFormats-appendItem-Second": "{0} ({2}: {1})",
	"dayPeriods-format-wide-noon": "noon",
	"dateFormatItem-yMd": "M/d/y",
	"field-era": "Era",
	"dateFormatItem-yM": "M/y",
	"months-standAlone-wide": [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	"timeFormat-short": "h:mm a",
	"quarters-format-wide": [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	],
	"dateFormatItem-yQQQQ": "QQQQ y",
	"timeFormat-long": "h:mm:ss a z",
	"field-year": "Year",
	"dateFormatItem-yMMM": "MMM y",
	"dateTimeFormats-appendItem-Era": "{0} {1}",
	"field-hour": "Hour",
	"months-format-abbr": [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	"field-sat-relative+0": "this Saturday",
	"field-sat-relative+1": "next Saturday",
	"timeFormat-full": "h:mm:ss a zzzz",
	"dateTimeFormats-appendItem-Week": "{0} ({2}: {1})",
	"field-day-relative+0": "today",
	"field-thu-relative+0": "this Thursday",
	"field-day-relative+1": "tomorrow",
	"field-thu-relative+1": "next Thursday",
	"dateFormatItem-GyMMMd": "MMM d, y G",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	"quarters-format-abbr": [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	"quarters-standAlone-wide": [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	],
	"dateFormatItem-Gy": "y G",
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	"timeFormat-medium": "h:mm:ss a",
	"field-sun-relative+0": "this Sunday",
	"dateFormatItem-Hm": "HH:mm",
	"field-sun-relative+1": "next Sunday",
	"eraAbbr": [
		"BC",
		"AD"
	],
	"field-minute": "Minute",
	"field-dayperiod": "am/pm",
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"field-day-relative+-1": "yesterday",
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} 'at' {0}",
	"dayPeriods-format-narrow-am": "a",
	"dateFormatItem-MMMd": "MMM d",
	"dateFormatItem-MEd": "E, M/d",
	"dateTimeFormat-full": "{1} 'at' {0}",
	"field-fri-relative+0": "this Friday",
	"field-fri-relative+1": "next Friday",
	"field-day": "Day",
	"days-format-wide": [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	"field-zone": "Time Zone",
	"dateTimeFormats-appendItem-Day": "{0} ({2}: {1})",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-year-relative+-1": "last year",
	"field-month-relative+-1": "last month",
	"dateFormatItem-hm": "h:mm a",
	"dateTimeFormats-appendItem-Year": "{0} {1}",
	"dateTimeFormats-appendItem-Hour": "{0} ({2}: {1})",
	"days-format-abbr": [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	"dateFormatItem-yMMMd": "MMM d, y",
	"eraNames": [
		"Before Christ",
		"Anno Domini"
	],
	"days-standAlone-narrow": [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "Month",
	"field-tue-relative+0": "this Tuesday",
	"dateTimeFormats-appendItem-Quarter": "{0} ({2}: {1})",
	"field-tue-relative+1": "next Tuesday",
	"dayPeriods-format-wide-am": "AM",
	"dateTimeFormats-appendItem-Month": "{0} ({2}: {1})",
	"dateTimeFormats-appendItem-Minute": "{0} ({2}: {1})",
	"dateFormatItem-EHm": "E HH:mm",
	"field-mon-relative+0": "this Monday",
	"field-mon-relative+1": "next Monday",
	"dateFormat-short": "M/d/yy",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-Ehms": "E h:mm:ss a",
	"dayPeriods-format-narrow-noon": "n",
	"field-second": "Second",
	"field-sat-relative+-1": "last Saturday",
	"dateFormatItem-yMMMEd": "E, MMM d, y",
	"field-sun-relative+-1": "last Sunday",
	"field-month-relative+0": "this month",
	"field-month-relative+1": "next month",
	"dateFormatItem-Ed": "d E",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "Week",
	"dateFormat-medium": "MMM d, y",
	"field-year-relative+0": "this year",
	"field-week-relative+-1": "last week",
	"field-year-relative+1": "next year",
	"dayPeriods-format-narrow-pm": "p",
	"dateTimeFormat-short": "{1}, {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a",
	"dateFormatItem-GyMMM": "MMM y G",
	"field-mon-relative+-1": "last Monday",
	"field-week-relative+0": "this week",
	"field-week-relative+1": "next week"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/es/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/es/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E, h:mm a",
	"days-standAlone-short": [
		"DO",
		"LU",
		"MA",
		"MI",
		"JU",
		"VI",
		"SA"
	],
	"months-format-narrow": [
		"E",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-second-relative+0": "ahora",
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "Día de la semana",
	"dateFormatItem-yQQQ": "QQQ y",
	"dateFormatItem-yMEd": "EEE, d/M/y",
	"field-wed-relative+0": "este miércoles",
	"field-wed-relative+1": "el próximo miércoles",
	"dateFormatItem-GyMMMEd": "E, d MMM y G",
	"dateFormatItem-MMMEd": "E, d MMM",
	"eraNarrow": [
		"a. C.",
		"d. C."
	],
	"dateFormatItem-yMM": "M/y",
	"field-tue-relative+-1": "el martes pasado",
	"dateFormatItem-MMMdd": "dd-MMM",
	"days-format-short": [
		"DO",
		"LU",
		"MA",
		"MI",
		"JU",
		"VI",
		"SA"
	],
	"dateFormat-long": "d 'de' MMMM 'de' y",
	"field-fri-relative+-1": "el viernes pasado",
	"field-wed-relative+-1": "el miércoles pasado",
	"months-format-wide": [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "p. m.",
	"dateFormat-full": "EEEE, d 'de' MMMM 'de' y",
	"field-thu-relative+-1": "el jueves pasado",
	"dateFormatItem-Md": "d/M",
	"dateFormatItem-yMd": "d/M/y",
	"field-era": "Era",
	"dateFormatItem-yM": "M/y",
	"months-standAlone-wide": [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	],
	"timeFormat-short": "H:mm",
	"quarters-format-wide": [
		"1.er trimestre",
		"2.º trimestre",
		"3.er trimestre",
		"4.º trimestre"
	],
	"dateFormatItem-yQQQQ": "QQQQ 'de' y",
	"timeFormat-long": "H:mm:ss z",
	"field-year": "Año",
	"dateFormatItem-yMMM": "MMM y",
	"field-hour": "Hora",
	"dateFormatItem-MMdd": "d/M",
	"months-format-abbr": [
		"ene.",
		"feb.",
		"mar.",
		"abr.",
		"may.",
		"jun.",
		"jul.",
		"ago.",
		"sept.",
		"oct.",
		"nov.",
		"dic."
	],
	"field-sat-relative+0": "este sábado",
	"field-sat-relative+1": "el próximo sábado",
	"timeFormat-full": "H:mm:ss (zzzz)",
	"field-day-relative+0": "hoy",
	"field-thu-relative+0": "este jueves",
	"field-day-relative+1": "mañana",
	"field-thu-relative+1": "el próximo jueves",
	"dateFormatItem-GyMMMd": "d MMM y G",
	"field-day-relative+2": "pasado mañana",
	"dateFormatItem-H": "H",
	"months-standAlone-abbr": [
		"Ene.",
		"Feb.",
		"Mar.",
		"Abr.",
		"May.",
		"Jun.",
		"Jul.",
		"Ago.",
		"Sept.",
		"Oct.",
		"Nov.",
		"Dic."
	],
	"quarters-format-abbr": [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	"quarters-standAlone-wide": [
		"1.er trimestre",
		"2.º trimestre",
		"3.er trimestre",
		"4.º trimestre"
	],
	"dateFormatItem-Gy": "y G",
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado"
	],
	"dateFormatItem-MMMMd": "d 'de' MMMM",
	"timeFormat-medium": "H:mm:ss",
	"field-sun-relative+0": "este domingo",
	"dateFormatItem-Hm": "H:mm",
	"field-sun-relative+1": "el próximo domingo",
	"quarters-standAlone-abbr": [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	"eraAbbr": [
		"a. C.",
		"d. C."
	],
	"field-minute": "Minuto",
	"field-dayperiod": "a. m./p. m.",
	"days-standAlone-abbr": [
		"Dom.",
		"Lun.",
		"Mar.",
		"Mié.",
		"Jue.",
		"Vie.",
		"Sáb."
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1T",
		"2T",
		"3T",
		"4T"
	],
	"field-day-relative+-1": "ayer",
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1}, {0}",
	"dayPeriods-format-narrow-am": "a.m.",
	"field-day-relative+-2": "anteayer",
	"dateFormatItem-MMMd": "d MMM",
	"dateFormatItem-MEd": "E, d/M",
	"dateTimeFormat-full": "{1}, {0}",
	"field-fri-relative+0": "este viernes",
	"dateFormatItem-yMMMM": "MMMM 'de' y",
	"field-fri-relative+1": "el próximo viernes",
	"field-day": "Día",
	"days-format-wide": [
		"domingo",
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado"
	],
	"field-zone": "Zona horaria",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"E",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-year-relative+-1": "el año pasado",
	"field-month-relative+-1": "el mes pasado",
	"dateFormatItem-hm": "h:mm a",
	"days-format-abbr": [
		"dom.",
		"lun.",
		"mar.",
		"mié.",
		"jue.",
		"vie.",
		"sáb."
	],
	"eraNames": [
		"antes de Cristo",
		"después de Cristo"
	],
	"dateFormatItem-yMMMd": "d MMM y",
	"days-format-narrow": [
		"D",
		"L",
		"M",
		"X",
		"J",
		"V",
		"S"
	],
	"days-standAlone-narrow": [
		"D",
		"L",
		"M",
		"X",
		"J",
		"V",
		"S"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "Mes",
	"field-tue-relative+0": "este martes",
	"field-tue-relative+1": "el próximo martes",
	"dayPeriods-format-wide-am": "a. m.",
	"dateFormatItem-EHm": "E, H:mm",
	"field-mon-relative+0": "este lunes",
	"field-mon-relative+1": "el próximo lunes",
	"dateFormat-short": "d/M/yy",
	"dateFormatItem-MMd": "d/M",
	"dateFormatItem-EHms": "E, H:mm:ss",
	"dateFormatItem-Ehms": "E, h:mm:ss a",
	"field-second": "Segundo",
	"field-sat-relative+-1": "el sábado pasado",
	"dateFormatItem-yMMMEd": "EEE, d MMM y",
	"field-sun-relative+-1": "el domingo pasado",
	"field-month-relative+0": "este mes",
	"field-month-relative+1": "el próximo mes",
	"dateFormatItem-Ed": "E d",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "Semana",
	"dateFormat-medium": "d MMM y",
	"field-year-relative+0": "este año",
	"field-week-relative+-1": "la semana pasada",
	"field-year-relative+1": "el próximo año",
	"dayPeriods-format-narrow-pm": "p.m.",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "H:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a",
	"dateFormatItem-GyMMM": "MMM y G",
	"field-mon-relative+-1": "el lunes pasado",
	"field-week-relative+0": "esta semana",
	"field-week-relative+1": "la próxima semana"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/hr/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/hr/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E h:mm a",
	"days-standAlone-short": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"months-format-narrow": [
		"1.",
		"2.",
		"3.",
		"4.",
		"5.",
		"6.",
		"7.",
		"8.",
		"9.",
		"10.",
		"11.",
		"12."
	],
	"field-second-relative+0": "sada",
	"quarters-standAlone-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-weekday": "Dan u tjednu",
	"dateFormatItem-yQQQ": "QQQ y.",
	"dateFormatItem-yMEd": "E, dd.MM.y.",
	"field-wed-relative+0": "ova srijeda",
	"dateFormatItem-GyMMMEd": "E, d. MMM y. G",
	"dateFormatItem-MMMEd": "E, d. MMM",
	"field-wed-relative+1": "sljedeća srijeda",
	"eraNarrow": [
		"pr.n.e.",
		"AD"
	],
	"dateFormatItem-yMM": "MM. y.",
	"field-tue-relative+-1": "prošli utorak",
	"days-format-short": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormat-long": "d. MMMM y.",
	"field-fri-relative+-1": "prošli petak",
	"field-wed-relative+-1": "prošla srijeda",
	"months-format-wide": [
		"siječnja",
		"veljače",
		"ožujka",
		"travnja",
		"svibnja",
		"lipnja",
		"srpnja",
		"kolovoza",
		"rujna",
		"listopada",
		"studenoga",
		"prosinca"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, d. MMMM y.",
	"field-thu-relative+-1": "prošli četvrtak",
	"dateFormatItem-Md": "dd.MM.",
	"dayPeriods-format-wide-noon": "podne",
	"dateFormatItem-yMd": "dd.MM.y.",
	"dateFormatItem-yM": "MM.y.",
	"field-era": "Era",
	"months-standAlone-wide": [
		"siječanj",
		"veljača",
		"ožujak",
		"travanj",
		"svibanj",
		"lipanj",
		"srpanj",
		"kolovoz",
		"rujan",
		"listopad",
		"studeni",
		"prosinac"
	],
	"timeFormat-short": "HH:mm",
	"quarters-format-wide": [
		"1. kvartal",
		"2. kvartal",
		"3. kvartal",
		"4. kvartal"
	],
	"timeFormat-long": "HH:mm:ss z",
	"dateFormatItem-yMMM": "LLL y.",
	"dateFormatItem-yQQQQ": "QQQQ y.",
	"field-year": "Godina",
	"dateFormatItem-MMdd": "dd. MM.",
	"field-hour": "Sat",
	"months-format-abbr": [
		"sij",
		"velj",
		"ožu",
		"tra",
		"svi",
		"lip",
		"srp",
		"kol",
		"ruj",
		"lis",
		"stu",
		"pro"
	],
	"field-sat-relative+0": "ova subota",
	"field-sat-relative+1": "sljedeća subota",
	"timeFormat-full": "HH:mm:ss zzzz",
	"dayPeriods-format-narrow-morning": "prijepodne",
	"field-day-relative+0": "danas",
	"field-day-relative+1": "sutra",
	"field-thu-relative+0": "ovaj četvrtak",
	"dateFormatItem-GyMMMd": "d. MMM y. G",
	"field-day-relative+2": "prekosutra",
	"field-thu-relative+1": "sljedeći četvrtak",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"sij",
		"velj",
		"ožu",
		"tra",
		"svi",
		"lip",
		"srp",
		"kol",
		"ruj",
		"lis",
		"stu",
		"pro"
	],
	"quarters-format-abbr": [
		"1kv",
		"2kv",
		"3kv",
		"4kv"
	],
	"quarters-standAlone-wide": [
		"1. kvartal",
		"2. kvartal",
		"3. kvartal",
		"4. kvartal"
	],
	"dateFormatItem-Gy": "y. G",
	"dateFormatItem-M": "L.",
	"days-standAlone-wide": [
		"nedjelja",
		"ponedjeljak",
		"utorak",
		"srijeda",
		"četvrtak",
		"petak",
		"subota"
	],
	"dayPeriods-format-narrow-evening": "navečer",
	"dateFormatItem-MMMMd": "d. MMMM",
	"dayPeriods-format-abbr-noon": "podne",
	"timeFormat-medium": "HH:mm:ss",
	"field-sun-relative+0": "ova nedjelja",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"1kv",
		"2kv",
		"3kv",
		"4kv"
	],
	"field-sun-relative+1": "sljedeća nedjelja",
	"eraAbbr": [
		"pr. Kr.",
		"p. Kr."
	],
	"field-minute": "Minuta",
	"field-dayperiod": "AM/PM",
	"days-standAlone-abbr": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"dateFormatItem-d": "d.",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-day-relative+-1": "jučer",
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} 'u' {0}",
	"field-day-relative+-2": "prekjučer",
	"dateFormatItem-MMMd": "d. MMM",
	"dateFormatItem-MEd": "E, dd.MM.",
	"dateTimeFormat-full": "{1} 'u' {0}",
	"field-fri-relative+0": "ovaj petak",
	"dateFormatItem-yMMMM": "LLLL y.",
	"field-fri-relative+1": "sljedeći petak",
	"field-day": "Dan",
	"days-format-wide": [
		"nedjelja",
		"ponedjeljak",
		"utorak",
		"srijeda",
		"četvrtak",
		"petak",
		"subota"
	],
	"field-zone": "Vremenska zona",
	"months-standAlone-narrow": [
		"1.",
		"2.",
		"3.",
		"4.",
		"5.",
		"6.",
		"7.",
		"8.",
		"9.",
		"10.",
		"11.",
		"12."
	],
	"dateFormatItem-y": "y.",
	"field-year-relative+-1": "prošle godine",
	"dayPeriods-format-narrow-night": "noću",
	"field-month-relative+-1": "prošli mjesec",
	"dateFormatItem-hm": "hh:mm a",
	"days-format-abbr": [
		"ned",
		"pon",
		"uto",
		"sri",
		"čet",
		"pet",
		"sub"
	],
	"eraNames": [
		"Prije Krista",
		"Poslije Krista"
	],
	"dateFormatItem-yMMMd": "d. MMM y.",
	"days-format-narrow": [
		"N",
		"P",
		"U",
		"S",
		"Č",
		"P",
		"S"
	],
	"dayPeriods-format-narrow-earlyMorning": "ujutro",
	"days-standAlone-narrow": [
		"n",
		"p",
		"u",
		"s",
		"č",
		"p",
		"s"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "Mjesec",
	"field-tue-relative+0": "ovaj utorak",
	"field-tue-relative+1": "sljedeći utorak",
	"dayPeriods-format-wide-am": "AM",
	"dateFormatItem-MMMMEd": "E, d. MMMM",
	"dateFormatItem-EHm": "E HH:mm",
	"field-mon-relative+0": "ovaj ponedjeljak",
	"field-mon-relative+1": "sljedeći ponedjeljak",
	"dateFormat-short": "dd.MM.y.",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-Ehms": "E h:mm:ss a",
	"dayPeriods-format-narrow-afternoon": "popodne",
	"dayPeriods-format-narrow-noon": "P",
	"field-second": "Sekunda",
	"field-sat-relative+-1": "prošla subota",
	"dateFormatItem-yMMMEd": "E, d. MMM y.",
	"field-sun-relative+-1": "prošla nedjelja",
	"field-month-relative+0": "ovaj mjesec",
	"field-month-relative+1": "sljedeći mjesec",
	"dateFormatItem-Ed": "E, d.",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "Tjedan",
	"dateFormat-medium": "d. MMM y.",
	"field-year-relative+0": "ove godine",
	"field-week-relative+-1": "prošli tjedan",
	"field-year-relative+1": "sljedeće godine",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "hh:mm:ss a",
	"dateFormatItem-GyMMM": "LLL y. G",
	"field-mon-relative+-1": "prošli ponedjeljak",
	"field-week-relative+0": "ovaj tjedan",
	"field-week-relative+1": "sljedeći tjedan"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/hu/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/hu/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E h:mm a",
	"days-standAlone-short": [
		"V",
		"H",
		"K",
		"Sze",
		"Cs",
		"P",
		"Szo"
	],
	"months-format-narrow": [
		"J",
		"F",
		"M",
		"Á",
		"M",
		"J",
		"J",
		"A",
		"Sz",
		"O",
		"N",
		"D"
	],
	"field-second-relative+0": "most",
	"quarters-standAlone-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-weekday": "hét napja",
	"dateFormatItem-yQQQ": "y. QQQ",
	"dateFormatItem-yMEd": "y. MM. dd., E",
	"field-wed-relative+0": "ez a szerda",
	"dateFormatItem-GyMMMEd": "G y. MMM d., E",
	"dateFormatItem-MMMEd": "MMM d., E",
	"field-wed-relative+1": "következő szerda",
	"eraNarrow": [
		"ie.",
		"isz."
	],
	"field-tue-relative+-1": "előző kedd",
	"days-format-short": [
		"V",
		"H",
		"K",
		"Sze",
		"Cs",
		"P",
		"Szo"
	],
	"dateFormat-long": "y. MMMM d.",
	"field-fri-relative+-1": "előző péntek",
	"field-wed-relative+-1": "előző szerda",
	"months-format-wide": [
		"január",
		"február",
		"március",
		"április",
		"május",
		"június",
		"július",
		"augusztus",
		"szeptember",
		"október",
		"november",
		"december"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "du.",
	"dateFormat-full": "y. MMMM d., EEEE",
	"field-thu-relative+-1": "előző csütörtök",
	"dateFormatItem-Md": "M. d.",
	"dateFormatItem-yMd": "y. MM. dd.",
	"dateFormatItem-yM": "y. M.",
	"field-era": "éra",
	"months-standAlone-wide": [
		"január",
		"február",
		"március",
		"április",
		"május",
		"június",
		"július",
		"augusztus",
		"szeptember",
		"október",
		"november",
		"december"
	],
	"timeFormat-short": "H:mm",
	"quarters-format-wide": [
		"I. negyedév",
		"II. negyedév",
		"III. negyedév",
		"IV. negyedév"
	],
	"timeFormat-long": "H:mm:ss z",
	"dateFormatItem-yMMM": "y. MMM",
	"dateFormatItem-yQQQQ": "y. QQQQ",
	"field-year": "év",
	"field-hour": "óra",
	"months-format-abbr": [
		"jan.",
		"febr.",
		"márc.",
		"ápr.",
		"máj.",
		"jún.",
		"júl.",
		"aug.",
		"szept.",
		"okt.",
		"nov.",
		"dec."
	],
	"field-sat-relative+0": "ez a szombat",
	"field-sat-relative+1": "következő szombat",
	"timeFormat-full": "H:mm:ss zzzz",
	"field-day-relative+0": "ma",
	"field-day-relative+1": "holnap",
	"field-thu-relative+0": "ez a csütörtök",
	"dateFormatItem-GyMMMd": "G y. MMM d.",
	"field-day-relative+2": "holnapután",
	"field-thu-relative+1": "következő csütörtök",
	"dateFormatItem-H": "H",
	"months-standAlone-abbr": [
		"jan.",
		"febr.",
		"márc.",
		"ápr.",
		"máj.",
		"jún.",
		"júl.",
		"aug.",
		"szept.",
		"okt.",
		"nov.",
		"dec."
	],
	"quarters-format-abbr": [
		"N1",
		"N2",
		"N3",
		"N4"
	],
	"quarters-standAlone-wide": [
		"1. negyedév",
		"2. negyedév",
		"3. negyedév",
		"4. negyedév"
	],
	"dateFormatItem-Gy": "G y.",
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"vasárnap",
		"hétfő",
		"kedd",
		"szerda",
		"csütörtök",
		"péntek",
		"szombat"
	],
	"dateFormatItem-MMMMd": "MMMM d.",
	"timeFormat-medium": "H:mm:ss",
	"field-sun-relative+0": "ez a vasárnap",
	"dateFormatItem-Hm": "H:mm",
	"quarters-standAlone-abbr": [
		"N1",
		"N2",
		"N3",
		"N4"
	],
	"field-sun-relative+1": "következő vasárnap",
	"eraAbbr": [
		"i. e.",
		"i. sz."
	],
	"field-minute": "perc",
	"field-dayperiod": "napszak",
	"days-standAlone-abbr": [
		"V",
		"H",
		"K",
		"Sze",
		"Cs",
		"P",
		"Szo"
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-day-relative+-1": "tegnap",
	"dateFormatItem-h": "a h",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "de.",
	"field-day-relative+-2": "tegnapelőtt",
	"dateFormatItem-MMMd": "MMM d.",
	"dateFormatItem-MEd": "M. d., E",
	"dateTimeFormat-full": "{1} {0}",
	"field-fri-relative+0": "ez a péntek",
	"dateFormatItem-yMMMM": "y. MMMM",
	"field-fri-relative+1": "következő péntek",
	"field-day": "nap",
	"days-format-wide": [
		"vasárnap",
		"hétfő",
		"kedd",
		"szerda",
		"csütörtök",
		"péntek",
		"szombat"
	],
	"field-zone": "időzóna",
	"dateFormatItem-y": "y.",
	"months-standAlone-narrow": [
		"J",
		"F",
		"M",
		"Á",
		"M",
		"J",
		"J",
		"A",
		"Sz",
		"O",
		"N",
		"D"
	],
	"field-year-relative+-1": "előző év",
	"field-month-relative+-1": "előző hónap",
	"dateFormatItem-hm": "a h:mm",
	"days-format-abbr": [
		"V",
		"H",
		"K",
		"Sze",
		"Cs",
		"P",
		"Szo"
	],
	"dateFormatItem-yMMMd": "y. MMM d.",
	"eraNames": [
		"időszámításunk előtt",
		"időszámításunk szerint"
	],
	"days-format-narrow": [
		"V",
		"H",
		"K",
		"Sz",
		"Cs",
		"P",
		"Sz"
	],
	"days-standAlone-narrow": [
		"V",
		"H",
		"K",
		"Sz",
		"Cs",
		"P",
		"Sz"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "hónap",
	"field-tue-relative+0": "ez a kedd",
	"field-tue-relative+1": "következő kedd",
	"dayPeriods-format-wide-am": "de.",
	"dateFormatItem-EHm": "E HH:mm",
	"field-mon-relative+0": "ez a hétfő",
	"field-mon-relative+1": "következő hétfő",
	"dateFormat-short": "y. MM. dd.",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-Ehms": "E h:mm:ss a",
	"field-second": "másodperc",
	"field-sat-relative+-1": "előző szombat",
	"dateFormatItem-yMMMEd": "y. MMM d., E",
	"field-sun-relative+-1": "előző vasárnap",
	"field-month-relative+0": "ez a hónap",
	"field-month-relative+1": "következő hónap",
	"dateFormatItem-Ed": "d., E",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "hét",
	"dateFormat-medium": "y. MMM d.",
	"field-year-relative+0": "ez az év",
	"field-week-relative+-1": "előző hét",
	"field-year-relative+1": "következő év",
	"dateFormatItem-mmss": "mm:ss",
	"dayPeriods-format-narrow-pm": "du.",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "H:mm:ss",
	"dateFormatItem-hms": "a h:mm:ss",
	"dateFormatItem-GyMMM": "G y. MMM",
	"field-mon-relative+-1": "előző hétfő",
	"field-week-relative+0": "ez a hét",
	"field-week-relative+1": "következő hét"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/pt/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/pt/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E, h:mm a",
	"days-standAlone-short": [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sáb"
	],
	"months-format-narrow": [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-second-relative+0": "agora",
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "Dia da semana",
	"dateFormatItem-yQQQ": "y QQQ",
	"dateFormatItem-yMEd": "E, dd/MM/y",
	"field-wed-relative+0": "esta quarta-feira",
	"field-wed-relative+1": "próxima quarta-feira",
	"dateFormatItem-GyMMMEd": "E, d 'de' MMM 'de' y G",
	"dateFormatItem-MMMEd": "E, d 'de' MMM",
	"eraNarrow": [
		"a.C.",
		"d.C."
	],
	"dateFormatItem-yMM": "MM/y",
	"field-tue-relative+-1": "terça-feira passada",
	"dayPeriods-format-wide-morning": "manhã",
	"days-format-short": [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sáb"
	],
	"dateFormat-long": "d 'de' MMMM 'de' y",
	"field-fri-relative+-1": "sexta-feira passada",
	"field-wed-relative+-1": "quarta-feira passada",
	"months-format-wide": [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "PM",
	"dateFormat-full": "EEEE, d 'de' MMMM 'de' y",
	"field-thu-relative+-1": "quinta-feira passada",
	"dateFormatItem-Md": "d/M",
	"dayPeriods-format-abbr-am": "AM",
	"dayPeriods-format-wide-noon": "meio-dia",
	"dateFormatItem-yMd": "dd/MM/y",
	"field-era": "Era",
	"dateFormatItem-yM": "MM/y",
	"months-standAlone-wide": [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	],
	"timeFormat-short": "HH:mm",
	"quarters-format-wide": [
		"1º trimestre",
		"2º trimestre",
		"3º trimestre",
		"4º trimestre"
	],
	"dateFormatItem-yQQQQ": "y QQQQ",
	"timeFormat-long": "HH:mm:ss z",
	"field-year": "Ano",
	"dateFormatItem-yMMM": "MMM 'de' y",
	"field-hour": "Hora",
	"dateFormatItem-MMdd": "dd/MM",
	"months-format-abbr": [
		"jan",
		"fev",
		"mar",
		"abr",
		"mai",
		"jun",
		"jul",
		"ago",
		"set",
		"out",
		"nov",
		"dez"
	],
	"field-sat-relative+0": "este sábado",
	"field-sat-relative+1": "próximo sábado",
	"timeFormat-full": "HH:mm:ss zzzz",
	"field-day-relative+0": "hoje",
	"field-thu-relative+0": "esta quinta-feira",
	"field-day-relative+1": "amanhã",
	"field-thu-relative+1": "próxima quinta-feira",
	"dateFormatItem-GyMMMd": "d 'de' MMM 'de' y G",
	"field-day-relative+2": "depois de amanhã",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"jan",
		"fev",
		"mar",
		"abr",
		"mai",
		"jun",
		"jul",
		"ago",
		"set",
		"out",
		"nov",
		"dez"
	],
	"quarters-format-abbr": [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	"quarters-standAlone-wide": [
		"1º trimestre",
		"2º trimestre",
		"3º trimestre",
		"4º trimestre"
	],
	"dateFormatItem-Gy": "y G",
	"dateFormatItem-HHmmss": "HH:mm:ss",
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado"
	],
	"timeFormat-medium": "HH:mm:ss",
	"field-sun-relative+0": "este domingo",
	"dateFormatItem-Hm": "HH:mm",
	"field-sun-relative+1": "próximo domingo",
	"quarters-standAlone-abbr": [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	"eraAbbr": [
		"a.C.",
		"d.C."
	],
	"field-minute": "Minuto",
	"field-dayperiod": "AM/PM",
	"days-standAlone-abbr": [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sáb"
	],
	"dayPeriods-format-wide-night": "noite",
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-day-relative+-1": "ontem",
	"dateFormatItem-h": "h a",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "a",
	"field-day-relative+-2": "anteontem",
	"dateFormatItem-MMMd": "d 'de' MMM",
	"dateFormatItem-MEd": "E, dd/MM",
	"dateTimeFormat-full": "{1} {0}",
	"field-fri-relative+0": "esta sexta-feira",
	"field-fri-relative+1": "próxima sexta-feira",
	"field-day": "Dia",
	"days-format-wide": [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado"
	],
	"field-zone": "Fuso horário",
	"dateFormatItem-y": "y",
	"months-standAlone-narrow": [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	"field-year-relative+-1": "ano passado",
	"field-month-relative+-1": "mês passado",
	"dateFormatItem-hm": "h:mm a",
	"dayPeriods-format-abbr-pm": "PM",
	"days-format-abbr": [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sáb"
	],
	"eraNames": [
		"Antes de Cristo",
		"Ano do Senhor"
	],
	"dateFormatItem-yMMMd": "d 'de' MMM 'de' y",
	"days-format-narrow": [
		"D",
		"S",
		"T",
		"Q",
		"Q",
		"S",
		"S"
	],
	"days-standAlone-narrow": [
		"D",
		"S",
		"T",
		"Q",
		"Q",
		"S",
		"S"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "Mês",
	"dateFormatItem-HHmm": "HH:mm",
	"field-tue-relative+0": "esta terça-feira",
	"field-tue-relative+1": "próxima terça-feira",
	"dayPeriods-format-wide-am": "AM",
	"dateFormatItem-EHm": "E, HH:mm",
	"field-mon-relative+0": "esta segunda-feira",
	"field-mon-relative+1": "próxima segunda-feira",
	"dateFormat-short": "dd/MM/yy",
	"dayPeriods-format-wide-afternoon": "tarde",
	"dateFormatItem-EHms": "E, HH:mm:ss",
	"dateFormatItem-Ehms": "E, h:mm:ss a",
	"field-second": "Segundo",
	"field-sat-relative+-1": "sábado passado",
	"dateFormatItem-yMMMEd": "E, d 'de' MMM 'de' y",
	"field-sun-relative+-1": "domingo passado",
	"field-month-relative+0": "este mês",
	"field-month-relative+1": "próximo mês",
	"dateFormatItem-Ed": "E, d",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "Semana",
	"dateFormat-medium": "d 'de' MMM 'de' y",
	"field-year-relative+0": "este ano",
	"field-week-relative+-1": "semana passada",
	"field-year-relative+1": "próximo ano",
	"dayPeriods-format-narrow-pm": "p",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "h:mm:ss a",
	"dateFormatItem-GyMMM": "MMM 'de' y G",
	"field-mon-relative+-1": "segunda-feira passada",
	"field-week-relative+0": "esta semana",
	"field-week-relative+1": "próxima semana"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/sr/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/sr/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E, h:mm a",
	"days-standAlone-short": [
		"не",
		"по",
		"ут",
		"ср",
		"че",
		"пе",
		"су"
	],
	"months-format-narrow": [
		"ј",
		"ф",
		"м",
		"а",
		"м",
		"ј",
		"ј",
		"а",
		"с",
		"о",
		"н",
		"д"
	],
	"field-second-relative+0": "сада",
	"quarters-standAlone-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-weekday": "дан у недељи",
	"dateFormatItem-yQQQ": "QQQ. y",
	"dateFormatItem-yMEd": "E, d.M.y.",
	"field-wed-relative+0": "у среду",
	"dateFormatItem-GyMMMEd": "E, d. MMM y. G",
	"dateFormatItem-MMMEd": "E d. MMM",
	"field-wed-relative+1": "следеће среде",
	"eraNarrow": [
		"п.н.е.",
		"н.е."
	],
	"dateFormatItem-yMM": "MM.y.",
	"field-tue-relative+-1": "прошлог уторка",
	"dateFormatItem-MMMdd": "dd.MMM",
	"days-format-short": [
		"нед",
		"пон",
		"уто",
		"сре",
		"чет",
		"пет",
		"суб"
	],
	"dateFormat-long": "dd. MMMM y.",
	"field-fri-relative+-1": "прошлог петка",
	"field-wed-relative+-1": "прошле среде",
	"months-format-wide": [
		"јануар",
		"фебруар",
		"март",
		"април",
		"мај",
		"јун",
		"јул",
		"август",
		"септембар",
		"октобар",
		"новембар",
		"децембар"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "по подне",
	"dateFormat-full": "EEEE, dd. MMMM y.",
	"field-thu-relative+-1": "прошлог четвртка",
	"dateFormatItem-Md": "d/M",
	"dateFormatItem-yMd": "d.M.y.",
	"dateFormatItem-yM": "M.y.",
	"field-era": "ера",
	"months-standAlone-wide": [
		"јануар",
		"фебруар",
		"март",
		"април",
		"мај",
		"јун",
		"јул",
		"август",
		"септембар",
		"октобар",
		"новембар",
		"децембар"
	],
	"timeFormat-short": "HH.mm",
	"quarters-format-wide": [
		"Прво тромесечје",
		"Друго тромесечје",
		"Треће тромесечје",
		"Четврто тромесечје"
	],
	"timeFormat-long": "HH.mm.ss z",
	"dateFormatItem-yMMM": "MMM y.",
	"dateFormatItem-yQQQQ": "QQQQ. y",
	"field-year": "година",
	"dateFormatItem-MMdd": "MM-dd",
	"field-hour": "сат",
	"months-format-abbr": [
		"јан",
		"феб",
		"мар",
		"апр",
		"мај",
		"јун",
		"јул",
		"авг",
		"сеп",
		"окт",
		"нов",
		"дец"
	],
	"field-sat-relative+0": "у суботу",
	"field-sat-relative+1": "следеће суботе",
	"timeFormat-full": "HH.mm.ss zzzz",
	"field-day-relative+0": "данас",
	"field-day-relative+1": "сутра",
	"field-thu-relative+0": "у четвртак",
	"dateFormatItem-GyMMMd": "d. MMM y. G",
	"field-day-relative+2": "прекосутра",
	"field-thu-relative+1": "следећег четвртка",
	"dateFormatItem-H": "HH",
	"months-standAlone-abbr": [
		"јан",
		"феб",
		"мар",
		"апр",
		"мај",
		"јун",
		"јул",
		"авг",
		"сеп",
		"окт",
		"нов",
		"дец"
	],
	"quarters-format-abbr": [
		"К1",
		"К2",
		"К3",
		"К4"
	],
	"quarters-standAlone-wide": [
		"Прво тромесечје",
		"Друго тромесечје",
		"Треће тромесечје",
		"Четврто тромесечје"
	],
	"dateFormatItem-Gy": "y. G",
	"dateFormatItem-M": "L",
	"days-standAlone-wide": [
		"недеља",
		"понедељак",
		"уторак",
		"среда",
		"четвртак",
		"петак",
		"субота"
	],
	"dateFormatItem-MMMMd": "d. MMMM",
	"timeFormat-medium": "HH.mm.ss",
	"dateFormatItem-yMMdd": "dd.MM.y.",
	"field-sun-relative+0": "у недељу",
	"dateFormatItem-Hm": "HH.mm",
	"quarters-standAlone-abbr": [
		"К1",
		"К2",
		"К3",
		"К4"
	],
	"field-sun-relative+1": "следеће недеље",
	"eraAbbr": [
		"п. н. е.",
		"н. е."
	],
	"field-minute": "минут",
	"field-dayperiod": "пре подне/по подне",
	"days-standAlone-abbr": [
		"нед",
		"пон",
		"уто",
		"сре",
		"чет",
		"пет",
		"суб"
	],
	"dateFormatItem-d": "d",
	"dateFormatItem-ms": "mm.ss",
	"quarters-format-narrow": [
		"1.",
		"2.",
		"3.",
		"4."
	],
	"field-day-relative+-1": "јуче",
	"dateFormatItem-h": "hh a",
	"dateTimeFormat-long": "{1} {0}",
	"field-day-relative+-2": "прекјуче",
	"dateFormatItem-MMMd": "d. MMM",
	"dateFormatItem-MEd": "E, M-d",
	"dateTimeFormat-full": "{1} {0}",
	"field-fri-relative+0": "у петак",
	"dateFormatItem-yMMMM": "MMMM y.",
	"field-fri-relative+1": "следећег петка",
	"field-day": "дан",
	"days-format-wide": [
		"недеља",
		"понедељак",
		"уторак",
		"среда",
		"четвртак",
		"петак",
		"субота"
	],
	"field-zone": "временска зона",
	"dateFormatItem-y": "y.",
	"months-standAlone-narrow": [
		"ј",
		"ф",
		"м",
		"а",
		"м",
		"ј",
		"ј",
		"а",
		"с",
		"о",
		"н",
		"д"
	],
	"field-year-relative+-1": "прошле године",
	"field-month-relative+-1": "прошлог месеца",
	"dateFormatItem-hm": "hh.mm a",
	"days-format-abbr": [
		"нед",
		"пон",
		"уто",
		"сре",
		"чет",
		"пет",
		"суб"
	],
	"eraNames": [
		"Пре нове ере",
		"п. н. е.",
		"Нове ере",
		"н. е."
	],
	"dateFormatItem-yMMMd": "d. MMM y.",
	"days-format-narrow": [
		"н",
		"п",
		"у",
		"с",
		"ч",
		"п",
		"с"
	],
	"days-standAlone-narrow": [
		"н",
		"п",
		"у",
		"с",
		"ч",
		"п",
		"с"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "месец",
	"field-tue-relative+0": "у уторак",
	"field-tue-relative+1": "следећег уторка",
	"dayPeriods-format-wide-am": "пре подне",
	"dateFormatItem-MMMMEd": "E d. MMMM",
	"dateFormatItem-EHm": "E, HH:mm",
	"field-mon-relative+0": "у понедељак",
	"field-mon-relative+1": "следећег понедељка",
	"dateFormat-short": "d.M.yy.",
	"dateFormatItem-EHms": "E, HH:mm:ss",
	"dateFormatItem-Ehms": "E, h:mm:ss a",
	"field-second": "секунд",
	"field-sat-relative+-1": "прошле суботе",
	"dateFormatItem-yMMMEd": "E, d. MMM y.",
	"field-sun-relative+-1": "прошле недеље",
	"field-month-relative+0": "овог месеца",
	"field-month-relative+1": "следећег месеца",
	"dateFormatItem-Ed": "E d.",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "недеља",
	"dateFormat-medium": "dd.MM.y.",
	"field-year-relative+0": "ове године",
	"field-week-relative+-1": "прошле недеље",
	"field-year-relative+1": "следеће године",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH.mm.ss",
	"dateFormatItem-hms": "hh.mm.ss a",
	"dateFormatItem-GyMMM": "MMM y. G",
	"field-mon-relative+-1": "прошлог понедељка",
	"field-week-relative+0": "ове недеље",
	"field-week-relative+1": "следеће недеље"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/zh-hant/gregorian.js":
/*!*********************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/zh-hant/gregorian.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "E a h:mm",
	"days-standAlone-short": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"months-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"field-second-relative+0": "現在",
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "週天",
	"dateFormatItem-yQQQ": "y年QQQ",
	"dateFormatItem-yMEd": "y/M/d（E）",
	"field-wed-relative+0": "本週三",
	"dateFormatItem-GyMMMEd": "Gy年M月d日 E",
	"dateFormatItem-MMMEd": "M月d日 E",
	"field-wed-relative+1": "下週三",
	"eraNarrow": [
		"西元前",
		"公元前",
		"西元",
		"公元"
	],
	"dateFormatItem-yMM": "y-MM",
	"dayPeriods-format-wide-earlyMorning": "清晨",
	"field-tue-relative+-1": "上週二",
	"dayPeriods-format-wide-morning": "上午",
	"days-format-short": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"dateFormat-long": "y年M月d日",
	"field-fri-relative+-1": "上週五",
	"field-wed-relative+-1": "上週三",
	"months-format-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "下午",
	"dateFormat-full": "y年M月d日 EEEE",
	"field-thu-relative+-1": "上週四",
	"dateFormatItem-Md": "M/d",
	"dayPeriods-format-narrow-midDay": "中午",
	"dayPeriods-format-wide-noon": "中午",
	"dateFormatItem-yMd": "y/M/d",
	"dateFormatItem-yM": "y/M",
	"field-era": "年代",
	"months-standAlone-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"timeFormat-short": "ah:mm",
	"quarters-format-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"timeFormat-long": "ah:mm:ss [z]",
	"dateFormatItem-yMMM": "y年M月",
	"dateFormatItem-yQQQQ": "y年QQQQ",
	"field-year": "年",
	"dateFormatItem-MMdd": "MM/dd",
	"field-hour": "小時",
	"months-format-abbr": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-sat-relative+0": "本週六",
	"field-sat-relative+1": "下週六",
	"timeFormat-full": "ah:mm:ss [zzzz]",
	"dayPeriods-format-narrow-morning": "上午",
	"field-day-relative+0": "今天",
	"field-day-relative+1": "明天",
	"field-thu-relative+0": "本週四",
	"dateFormatItem-GyMMMd": "Gy年M月d日",
	"field-day-relative+2": "後天",
	"field-thu-relative+1": "下週四",
	"dateFormatItem-H": "H時",
	"months-standAlone-abbr": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"quarters-format-abbr": [
		"1季",
		"2季",
		"3季",
		"4季"
	],
	"quarters-standAlone-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"dateFormatItem-Gy": "Gy年",
	"dateFormatItem-M": "M月",
	"days-standAlone-wide": [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	],
	"timeFormat-medium": "ah:mm:ss",
	"field-sun-relative+0": "本週日",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"1季",
		"2季",
		"3季",
		"4季"
	],
	"field-sun-relative+1": "下週日",
	"eraAbbr": [
		"西元前",
		"西元"
	],
	"field-minute": "分鐘",
	"field-dayperiod": "上午/下午",
	"days-standAlone-abbr": [
		"週日",
		"週一",
		"週二",
		"週三",
		"週四",
		"週五",
		"週六"
	],
	"dayPeriods-format-wide-night": "晚上",
	"dateFormatItem-d": "d日",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-day-relative+-1": "昨天",
	"dateFormatItem-h": "ah時",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "上午",
	"field-day-relative+-2": "前天",
	"dateFormatItem-MMMd": "M月d日",
	"dayPeriods-format-wide-midDay": "中午",
	"dateFormatItem-MEd": "M/d（E）",
	"dateTimeFormat-full": "{1} {0}",
	"field-fri-relative+0": "本週五",
	"dateFormatItem-yMMMM": "y年M月",
	"field-fri-relative+1": "下週五",
	"field-day": "日",
	"days-format-wide": [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	],
	"field-zone": "時區",
	"months-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"dateFormatItem-y": "y年",
	"field-year-relative+-1": "去年",
	"dayPeriods-format-narrow-night": "晚上",
	"field-month-relative+-1": "上個月",
	"dateFormatItem-hm": "ah:mm",
	"dayPeriods-format-narrow-weeHours": "凌晨",
	"days-format-abbr": [
		"週日",
		"週一",
		"週二",
		"週三",
		"週四",
		"週五",
		"週六"
	],
	"eraNames": [
		"西元前",
		"西元"
	],
	"dateFormatItem-yMMMd": "y年M月d日",
	"days-format-narrow": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"dayPeriods-format-narrow-earlyMorning": "清晨",
	"days-standAlone-narrow": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "月",
	"field-tue-relative+0": "本週二",
	"field-tue-relative+1": "下週二",
	"dayPeriods-format-wide-am": "上午",
	"dateFormatItem-EHm": "E HH:mm",
	"dayPeriods-format-wide-weeHours": "凌晨",
	"dateFormatItem-MMMMdd": "M月dd日",
	"field-mon-relative+0": "本週一",
	"field-mon-relative+1": "下週一",
	"dateFormat-short": "y/M/d",
	"dayPeriods-format-wide-afternoon": "下午",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-Ehms": "E a h:mm:ss",
	"dayPeriods-format-narrow-afternoon": "下午",
	"dayPeriods-format-narrow-noon": "中午",
	"field-second": "秒",
	"field-sat-relative+-1": "上週六",
	"dateFormatItem-yMMMEd": "y年M月d日 E",
	"field-sun-relative+-1": "上週日",
	"field-month-relative+0": "本月",
	"field-month-relative+1": "下個月",
	"dateFormatItem-Ed": "d日（E）",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"field-week": "週",
	"dateFormat-medium": "y年M月d日",
	"field-year-relative+0": "今年",
	"field-week-relative+-1": "上週",
	"field-year-relative+1": "明年",
	"dayPeriods-format-narrow-pm": "下午",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "ah:mm:ss",
	"dateFormatItem-GyMMM": "Gy年M月",
	"field-mon-relative+-1": "上週一",
	"field-week-relative+0": "本週",
	"field-week-relative+1": "下週"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/zh-hk/gregorian.js":
/*!*******************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/zh-hk/gregorian.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"field-sat-relative+0": "本週六",
	"field-sat-relative+1": "下週六",
	"field-sun-relative+-1": "上週日",
	"field-mon-relative+-1": "上週一",
	"field-minute": "分鐘",
	"eraNames": [
		"西元前",
		"西元"
	],
	"dateTimeFormat-full": "{1}{0}",
	"field-weekday": "週天",
	"dateFormatItem-yQQQ": "y年QQQ",
	"field-era": "年代",
	"dateFormatItem-Gy": "G y 年",
	"field-hour": "小時",
	"quarters-standAlone-abbr": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"timeFormat-full": "ah:mm:ss [zzzz]",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"dateFormatItem-yMM": "y-MM",
	"field-sun-relative+0": "本週日",
	"field-sun-relative+1": "下週日",
	"field-wed-relative+-1": "上週三",
	"dateFormatItem-Ed": "d日（E）",
	"eraAbbr": [
		"西元前",
		"西元"
	],
	"field-day-relative+2": "後天",
	"dateFormatItem-GyMMMd": "G y 年 M 月 d 日",
	"field-zone": "時區",
	"field-tue-relative+0": "本週二",
	"dateFormatItem-Ehm": "E a h:mm",
	"field-tue-relative+1": "下週二",
	"field-week-relative+-1": "上週",
	"field-sat-relative+-1": "上週六",
	"$locale": "zh-hant-hk",
	"quarters-standAlone-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"field-fri-relative+0": "本週五",
	"field-fri-relative+1": "下週五",
	"months-standAlone-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-week": "週",
	"field-week-relative+0": "本週",
	"dateFormatItem-Ehms": "E a h:mm:ss",
	"field-week-relative+1": "下週",
	"timeFormat-long": "ah:mm:ss [z]",
	"dateFormatItem-yQQQQ": "y年QQQQ",
	"field-month-relative+1": "下個月",
	"dateFormatItem-H": "H時",
	"field-fri-relative+-1": "上週五",
	"quarters-format-abbr": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"field-second": "秒",
	"dateFormatItem-GyMMMEd": "Gy年M月d日 E",
	"field-tue-relative+-1": "上週二",
	"dateFormatItem-GyMMM": "G y 年 M 月",
	"dateFormatItem-MEd": "M/d（E）",
	"field-mon-relative+0": "本週一",
	"field-mon-relative+1": "下週一",
	"field-second-relative+0": "現在",
	"field-thu-relative+0": "本週四",
	"dateFormat-short": "y/M/d",
	"field-thu-relative+1": "下週四",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-EHm": "E HH:mm",
	"dateFormatItem-yMEd": "y/M/d（E）",
	"field-wed-relative+0": "本週三",
	"months-format-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-wed-relative+1": "下週三",
	"field-month-relative+-1": "上個月",
	"quarters-format-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"eraNarrow": [
		"西元前",
		"西元"
	],
	"dateFormatItem-h": "ah時",
	"field-thu-relative+-1": "上週四"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/zh-tw/gregorian.js":
/*!*******************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/zh-tw/gregorian.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"field-sat-relative+0": "本週六",
	"field-sat-relative+1": "下週六",
	"field-sun-relative+-1": "上週日",
	"field-mon-relative+-1": "上週一",
	"field-minute": "分鐘",
	"eraNames": [
		"西元前",
		"西元"
	],
	"dateTimeFormat-full": "{1}{0}",
	"field-weekday": "週天",
	"dateFormatItem-yQQQ": "y年QQQ",
	"field-era": "年代",
	"dateFormatItem-Gy": "G y 年",
	"field-hour": "小時",
	"quarters-standAlone-abbr": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"timeFormat-full": "ah:mm:ss [zzzz]",
	"dateTimeFormats-appendItem-Timezone": "{0} {1}",
	"dateFormatItem-yMM": "y-MM",
	"field-sun-relative+0": "本週日",
	"field-sun-relative+1": "下週日",
	"field-wed-relative+-1": "上週三",
	"dateFormatItem-Ed": "d日（E）",
	"eraAbbr": [
		"西元前",
		"西元"
	],
	"field-day-relative+2": "後天",
	"dateFormatItem-GyMMMd": "G y 年 M 月 d 日",
	"field-zone": "時區",
	"field-tue-relative+0": "本週二",
	"dateFormatItem-Ehm": "E a h:mm",
	"field-tue-relative+1": "下週二",
	"field-week-relative+-1": "上週",
	"field-sat-relative+-1": "上週六",
	"$locale": "zh-hant-tw",
	"quarters-standAlone-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"field-fri-relative+0": "本週五",
	"field-fri-relative+1": "下週五",
	"months-standAlone-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-week": "週",
	"field-week-relative+0": "本週",
	"dateFormatItem-Ehms": "E a h:mm:ss",
	"field-week-relative+1": "下週",
	"timeFormat-long": "ah:mm:ss [z]",
	"dateFormatItem-yQQQQ": "y年QQQQ",
	"field-month-relative+1": "下個月",
	"dateFormatItem-H": "H時",
	"field-fri-relative+-1": "上週五",
	"quarters-format-abbr": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"field-second": "秒",
	"dateFormatItem-GyMMMEd": "Gy年M月d日 E",
	"field-tue-relative+-1": "上週二",
	"dateFormatItem-GyMMM": "G y 年 M 月",
	"dateFormatItem-MEd": "M/d（E）",
	"field-mon-relative+0": "本週一",
	"field-mon-relative+1": "下週一",
	"field-second-relative+0": "現在",
	"field-thu-relative+0": "本週四",
	"dateFormat-short": "y/M/d",
	"field-thu-relative+1": "下週四",
	"dateFormatItem-EHms": "E HH:mm:ss",
	"dateFormatItem-EHm": "E HH:mm",
	"dateFormatItem-yMEd": "y/M/d（E）",
	"field-wed-relative+0": "本週三",
	"months-format-wide": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-wed-relative+1": "下週三",
	"field-month-relative+-1": "上個月",
	"quarters-format-wide": [
		"第1季",
		"第2季",
		"第3季",
		"第4季"
	],
	"eraNarrow": [
		"西元前",
		"西元"
	],
	"dateFormatItem-h": "ah時",
	"field-thu-relative+-1": "上週四"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/nls/zh/gregorian.js":
/*!****************************************************!*\
  !*** ./node_modules/dojo/cldr/nls/zh/gregorian.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(module.exports = {
	"dateFormatItem-Ehm": "Eah:mm",
	"days-standAlone-short": [
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	],
	"months-format-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"field-second-relative+0": "现在",
	"quarters-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-weekday": "工作日",
	"dateFormatItem-yQQQ": "y年第Q季度",
	"dateFormatItem-yMEd": "y/M/dE",
	"field-wed-relative+0": "本周三",
	"dateFormatItem-GyMMMEd": "Gy年M月d日E",
	"dateFormatItem-MMMEd": "M月d日E",
	"field-wed-relative+1": "下周三",
	"eraNarrow": [
		"公元前",
		"公元"
	],
	"dateFormatItem-yMM": "y年M月",
	"dayPeriods-format-wide-earlyMorning": "清晨",
	"field-tue-relative+-1": "上周二",
	"dayPeriods-format-wide-morning": "上午",
	"days-format-short": [
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	],
	"dateFormat-long": "y年M月d日",
	"field-fri-relative+-1": "上周五",
	"field-wed-relative+-1": "上周三",
	"months-format-wide": [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月"
	],
	"dateTimeFormat-medium": "{1} {0}",
	"dayPeriods-format-wide-pm": "下午",
	"dateFormat-full": "y年M月d日EEEE",
	"field-thu-relative+-1": "上周四",
	"dateFormatItem-Md": "M/d",
	"dayPeriods-format-narrow-midDay": "中午",
	"dayPeriods-format-wide-noon": "中午",
	"dateFormatItem-yMd": "y/M/d",
	"dateFormatItem-yM": "y年M月",
	"field-era": "纪元",
	"months-standAlone-wide": [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月"
	],
	"timeFormat-short": "ah:mm",
	"quarters-format-wide": [
		"第一季度",
		"第二季度",
		"第三季度",
		"第四季度"
	],
	"timeFormat-long": "z ah:mm:ss",
	"dateFormatItem-yMMM": "y年M月",
	"dateFormatItem-yQQQQ": "y年第Q季度",
	"field-year": "年",
	"dateFormatItem-MMdd": "MM/dd",
	"field-hour": "小时",
	"months-format-abbr": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"field-sat-relative+0": "本周六",
	"field-sat-relative+1": "下周六",
	"timeFormat-full": "zzzz ah:mm:ss",
	"dayPeriods-format-narrow-morning": "上午",
	"field-day-relative+0": "今天",
	"field-day-relative+1": "明天",
	"field-thu-relative+0": "本周四",
	"dateFormatItem-GyMMMd": "Gy年M月d日",
	"field-day-relative+2": "后天",
	"field-thu-relative+1": "下周四",
	"dateFormatItem-H": "H时",
	"months-standAlone-abbr": [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	"quarters-format-abbr": [
		"1季度",
		"2季度",
		"3季度",
		"4季度"
	],
	"quarters-standAlone-wide": [
		"第一季度",
		"第二季度",
		"第三季度",
		"第四季度"
	],
	"dateFormatItem-Gy": "Gy年",
	"dateFormatItem-M": "M月",
	"days-standAlone-wide": [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	],
	"timeFormat-medium": "ah:mm:ss",
	"field-sun-relative+0": "本周日",
	"dateFormatItem-Hm": "HH:mm",
	"quarters-standAlone-abbr": [
		"1季度",
		"2季度",
		"3季度",
		"4季度"
	],
	"field-sun-relative+1": "下周日",
	"eraAbbr": [
		"公元前",
		"公元"
	],
	"field-minute": "分钟",
	"field-dayperiod": "上午/下午",
	"days-standAlone-abbr": [
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	],
	"dayPeriods-format-wide-night": "晚上",
	"dateFormatItem-d": "d日",
	"dateFormatItem-ms": "mm:ss",
	"quarters-format-narrow": [
		"1",
		"2",
		"3",
		"4"
	],
	"field-day-relative+-1": "昨天",
	"dateFormatItem-h": "ah时",
	"dateTimeFormat-long": "{1} {0}",
	"dayPeriods-format-narrow-am": "上午",
	"field-day-relative+-2": "前天",
	"dateFormatItem-MMMd": "M月d日",
	"dayPeriods-format-wide-midDay": "中午",
	"dateFormatItem-MEd": "M/dE",
	"dateTimeFormat-full": "{1} {0}",
	"field-fri-relative+0": "本周五",
	"dateFormatItem-yMMMM": "y年M月",
	"field-fri-relative+1": "下周五",
	"field-day": "日",
	"days-format-wide": [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	],
	"field-zone": "时区",
	"months-standAlone-narrow": [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	],
	"dateFormatItem-y": "y年",
	"field-year-relative+-1": "去年",
	"dayPeriods-format-narrow-night": "晚上",
	"field-month-relative+-1": "上个月",
	"dateFormatItem-hm": "ah:mm",
	"dayPeriods-format-narrow-weeHours": "凌晨",
	"days-format-abbr": [
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	],
	"eraNames": [
		"公元前",
		"公元"
	],
	"dateFormatItem-yMMMd": "y年M月d日",
	"days-format-narrow": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"dayPeriods-format-narrow-earlyMorning": "清晨",
	"days-standAlone-narrow": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"dateFormatItem-MMM": "LLL",
	"field-month": "月",
	"field-tue-relative+0": "本周二",
	"field-tue-relative+1": "下周二",
	"dayPeriods-format-wide-am": "上午",
	"dateFormatItem-EHm": "EHH:mm",
	"dayPeriods-format-wide-weeHours": "凌晨",
	"dateFormatItem-MMMMdd": "M月dd日",
	"field-mon-relative+0": "本周一",
	"field-mon-relative+1": "下周一",
	"dateFormat-short": "yy/M/d",
	"dayPeriods-format-wide-afternoon": "下午",
	"dateFormatItem-EHms": "EHH:mm:ss",
	"dateFormatItem-Ehms": "Eah:mm:ss",
	"dayPeriods-format-narrow-afternoon": "下午",
	"dayPeriods-format-narrow-noon": "中午",
	"field-second": "秒钟",
	"field-sat-relative+-1": "上周六",
	"dateFormatItem-yMMMEd": "y年M月d日E",
	"field-sun-relative+-1": "上周日",
	"field-month-relative+0": "本月",
	"field-month-relative+1": "下个月",
	"dateFormatItem-Ed": "d日E",
	"dateTimeFormats-appendItem-Timezone": "{1}{0}",
	"field-week": "周",
	"dateFormat-medium": "y年M月d日",
	"field-year-relative+0": "今年",
	"field-week-relative+-1": "上周",
	"field-year-relative+1": "明年",
	"dayPeriods-format-narrow-pm": "下午",
	"dateTimeFormat-short": "{1} {0}",
	"dateFormatItem-Hms": "HH:mm:ss",
	"dateFormatItem-hms": "ah:mm:ss",
	"dateFormatItem-GyMMM": "Gy年M月",
	"field-mon-relative+-1": "上周一",
	"field-week-relative+0": "本周",
	"field-week-relative+1": "下周"
});

/***/ }),

/***/ "./node_modules/dojo/cldr/supplemental.js":
/*!************************************************!*\
  !*** ./node_modules/dojo/cldr/supplemental.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"), __webpack_require__(/*! ../i18n */ "./node_modules/dojo/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, i18n){

// module:
//		dojo/cldr/supplemental


var supplemental = {
	// summary:
	//		TODOC
};
lang.setObject("dojo.cldr.supplemental", supplemental);

supplemental.getFirstDayOfWeek = function(/*String?*/locale){
	// summary:
	//		Returns a zero-based index for first day of the week
	// description:
	//		Returns a zero-based index for first day of the week, as used by the local (Gregorian) calendar.
	//		e.g. Sunday (returns 0), or Monday (returns 1)

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/firstDay
	var firstDay = {/*default is 1=Monday*/
		bd:5,mv:5,
		ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,
		ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,
		ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,
		co:0,dm:0,'do':0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,'in':0,
		jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,
		ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,
		tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0
	};

	var country = supplemental._region(locale);
	var dow = firstDay[country];
	return (dow === undefined) ? 1 : dow; /*Number*/
};

supplemental._region = function(/*String?*/locale){
	locale = i18n.normalizeLocale(locale);
	var tags = locale.split('-');
	var region = tags[1];
	if(!region){
		// IE often gives language only (#2269)
		// Arbitrary mappings of language-only locales to a country:
		region = {
			aa:"et", ab:"ge", af:"za", ak:"gh", am:"et", ar:"eg", as:"in", av:"ru", ay:"bo", az:"az", ba:"ru",
			be:"by", bg:"bg", bi:"vu", bm:"ml", bn:"bd", bo:"cn", br:"fr", bs:"ba", ca:"es", ce:"ru", ch:"gu",
			co:"fr", cr:"ca", cs:"cz", cv:"ru", cy:"gb", da:"dk", de:"de", dv:"mv", dz:"bt", ee:"gh", el:"gr",
			en:"us", es:"es", et:"ee", eu:"es", fa:"ir", ff:"sn", fi:"fi", fj:"fj", fo:"fo", fr:"fr", fy:"nl",
			ga:"ie", gd:"gb", gl:"es", gn:"py", gu:"in", gv:"gb", ha:"ng", he:"il", hi:"in", ho:"pg", hr:"hr",
			ht:"ht", hu:"hu", hy:"am", ia:"fr", id:"id", ig:"ng", ii:"cn", ik:"us", "in":"id", is:"is", it:"it",
			iu:"ca", iw:"il", ja:"jp", ji:"ua", jv:"id", jw:"id", ka:"ge", kg:"cd", ki:"ke", kj:"na", kk:"kz",
			kl:"gl", km:"kh", kn:"in", ko:"kr", ks:"in", ku:"tr", kv:"ru", kw:"gb", ky:"kg", la:"va", lb:"lu",
			lg:"ug", li:"nl", ln:"cd", lo:"la", lt:"lt", lu:"cd", lv:"lv", mg:"mg", mh:"mh", mi:"nz", mk:"mk",
			ml:"in", mn:"mn", mo:"ro", mr:"in", ms:"my", mt:"mt", my:"mm", na:"nr", nb:"no", nd:"zw", ne:"np",
			ng:"na", nl:"nl", nn:"no", no:"no", nr:"za", nv:"us", ny:"mw", oc:"fr", om:"et", or:"in", os:"ge",
			pa:"in", pl:"pl", ps:"af", pt:"br", qu:"pe", rm:"ch", rn:"bi", ro:"ro", ru:"ru", rw:"rw", sa:"in",
			sd:"in", se:"no", sg:"cf", si:"lk", sk:"sk", sl:"si", sm:"ws", sn:"zw", so:"so", sq:"al", sr:"rs",
			ss:"za", st:"za", su:"id", sv:"se", sw:"tz", ta:"in", te:"in", tg:"tj", th:"th", ti:"et", tk:"tm",
			tl:"ph", tn:"za", to:"to", tr:"tr", ts:"za", tt:"ru", ty:"pf", ug:"cn", uk:"ua", ur:"pk", uz:"uz",
			ve:"za", vi:"vn", wa:"be", wo:"sn", xh:"za", yi:"il", yo:"ng", za:"cn", zh:"cn", zu:"za",
			ace:"id", ady:"ru", agq:"cm", alt:"ru", amo:"ng", asa:"tz", ast:"es", awa:"in", bal:"pk",
			ban:"id", bas:"cm", bax:"cm", bbc:"id", bem:"zm", bez:"tz", bfq:"in", bft:"pk", bfy:"in",
			bhb:"in", bho:"in", bik:"ph", bin:"ng", bjj:"in", bku:"ph", bqv:"ci", bra:"in", brx:"in",
			bss:"cm", btv:"pk", bua:"ru", buc:"yt", bug:"id", bya:"id", byn:"er", cch:"ng", ccp:"in",
			ceb:"ph", cgg:"ug", chk:"fm", chm:"ru", chp:"ca", chr:"us", cja:"kh", cjm:"vn", ckb:"iq",
			crk:"ca", csb:"pl", dar:"ru", dav:"ke", den:"ca", dgr:"ca", dje:"ne", doi:"in", dsb:"de",
			dua:"cm", dyo:"sn", dyu:"bf", ebu:"ke", efi:"ng", ewo:"cm", fan:"gq", fil:"ph", fon:"bj",
			fur:"it", gaa:"gh", gag:"md", gbm:"in", gcr:"gf", gez:"et", gil:"ki", gon:"in", gor:"id",
			grt:"in", gsw:"ch", guz:"ke", gwi:"ca", haw:"us", hil:"ph", hne:"in", hnn:"ph", hoc:"in",
			hoj:"in", ibb:"ng", ilo:"ph", inh:"ru", jgo:"cm", jmc:"tz", kaa:"uz", kab:"dz", kaj:"ng",
			kam:"ke", kbd:"ru", kcg:"ng", kde:"tz", kdt:"th", kea:"cv", ken:"cm", kfo:"ci", kfr:"in",
			kha:"in", khb:"cn", khq:"ml", kht:"in", kkj:"cm", kln:"ke", kmb:"ao", koi:"ru", kok:"in",
			kos:"fm", kpe:"lr", krc:"ru", kri:"sl", krl:"ru", kru:"in", ksb:"tz", ksf:"cm", ksh:"de",
			kum:"ru", lag:"tz", lah:"pk", lbe:"ru", lcp:"cn", lep:"in", lez:"ru", lif:"np", lis:"cn",
			lki:"ir", lmn:"in", lol:"cd", lua:"cd", luo:"ke", luy:"ke", lwl:"th", mad:"id", mag:"in",
			mai:"in", mak:"id", man:"gn", mas:"ke", mdf:"ru", mdh:"ph", mdr:"id", men:"sl", mer:"ke",
			mfe:"mu", mgh:"mz", mgo:"cm", min:"id", mni:"in", mnk:"gm", mnw:"mm", mos:"bf", mua:"cm",
			mwr:"in", myv:"ru", nap:"it", naq:"na", nds:"de", "new":"np", niu:"nu", nmg:"cm", nnh:"cm",
			nod:"th", nso:"za", nus:"sd", nym:"tz", nyn:"ug", pag:"ph", pam:"ph", pap:"bq", pau:"pw",
			pon:"fm", prd:"ir", raj:"in", rcf:"re", rej:"id", rjs:"np", rkt:"in", rof:"tz", rwk:"tz",
			saf:"gh", sah:"ru", saq:"ke", sas:"id", sat:"in", saz:"in", sbp:"tz", scn:"it", sco:"gb",
			sdh:"ir", seh:"mz", ses:"ml", shi:"ma", shn:"mm", sid:"et", sma:"se", smj:"se", smn:"fi",
			sms:"fi", snk:"ml", srn:"sr", srr:"sn", ssy:"er", suk:"tz", sus:"gn", swb:"yt", swc:"cd",
			syl:"bd", syr:"sy", tbw:"ph", tcy:"in", tdd:"cn", tem:"sl", teo:"ug", tet:"tl", tig:"er",
			tiv:"ng", tkl:"tk", tmh:"ne", tpi:"pg", trv:"tw", tsg:"ph", tts:"th", tum:"mw", tvl:"tv",
			twq:"ne", tyv:"ru", tzm:"ma", udm:"ru", uli:"fm", umb:"ao", unr:"in", unx:"in", vai:"lr",
			vun:"tz", wae:"ch", wal:"et", war:"ph", xog:"ug", xsr:"np", yao:"mz", yap:"fm", yav:"cm", zza:"tr"
		}[tags[0]];
	}else if(region.length == 4){
		// The ISO 3166 country code is usually in the second position, unless a
		// 4-letter script is given. See http://www.ietf.org/rfc/rfc4646.txt
		region = tags[2];
	}
	return region;
};

supplemental.getWeekend = function(/*String?*/locale){
	// summary:
	//		Returns a hash containing the start and end days of the weekend
	// description:
	//		Returns a hash containing the start and end days of the weekend according to local custom using locale,
	//		or by default in the user's locale.
	//		e.g. {start:6, end:0}

	// from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/weekend{Start,End}
	var weekendStart = {/*default is 6=Saturday*/
			'in':0,
			af:4,dz:4,ir:4,om:4,sa:4,ye:4,
			ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5
		},

		weekendEnd = {/*default is 0=Sunday*/
			af:5,dz:5,ir:5,om:5,sa:5,ye:5,
			ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6
		},

		country = supplemental._region(locale),
		start = weekendStart[country],
		end = weekendEnd[country];

	if(start === undefined){start=6;}
	if(end === undefined){end=0;}
	return {start:start, end:end}; /*Object {start,end}*/
};

return supplemental;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/date.js":
/*!***********************************!*\
  !*** ./node_modules/dojo/date.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./has */ "./node_modules/dojo/has.js"), __webpack_require__(/*! ./_base/lang */ "./node_modules/dojo/_base/lang.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(has, lang){
// module:
//		dojo/date

var date = {
	// summary:
	//		Date manipulation utilities
};

date.getDaysInMonth = function(/*Date*/dateObject){
	// summary:
	//		Returns the number of days in the month used by dateObject
	var month = dateObject.getMonth();
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(month == 1 && date.isLeapYear(dateObject)){ return 29; } // Number
	return days[month]; // Number
};

date.isLeapYear = function(/*Date*/dateObject){
	// summary:
	//		Determines if the year of the dateObject is a leap year
	// description:
	//		Leap years are years with an additional day YYYY-02-29, where the
	//		year number is a multiple of four with the following exception: If
	//		a year is a multiple of 100, then it is only a leap year if it is
	//		also a multiple of 400. For example, 1900 was not a leap year, but
	//		2000 is one.

	var year = dateObject.getFullYear();
	return !(year%400) || (!(year%4) && !!(year%100)); // Boolean
};

// FIXME: This is not localized
date.getTimezoneName = function(/*Date*/dateObject){
	// summary:
	//		Get the user's time zone as provided by the browser
	// dateObject:
	//		Needed because the timezone may vary with time (daylight savings)
	// description:
	//		Try to get time zone info from toString or toLocaleString method of
	//		the Date object -- UTC offset is not a time zone.  See
	//		http://www.twinsun.com/tz/tz-link.htm Note: results may be
	//		inconsistent across browsers.

	var str = dateObject.toString(); // Start looking in toString
	var tz = ''; // The result -- return empty string if nothing found
	var match;

	// First look for something in parentheses -- fast lookup, no regex
	var pos = str.indexOf('(');
	if(pos > -1){
		tz = str.substring(++pos, str.indexOf(')'));
	}else{
		// If at first you don't succeed ...
		// If IE knows about the TZ, it appears before the year
		// Capital letters or slash before a 4-digit year
		// at the end of string
		var pat = /([A-Z\/]+) \d{4}$/;
		if((match = str.match(pat))){
			tz = match[1];
		}else{
		// Some browsers (e.g. Safari) glue the TZ on the end
		// of toLocaleString instead of putting it in toString
			str = dateObject.toLocaleString();
			// Capital letters or slash -- end of string,
			// after space
			pat = / ([A-Z\/]+)$/;
			if((match = str.match(pat))){
				tz = match[1];
			}
		}
	}

	// Make sure it doesn't somehow end up return AM or PM
	return (tz == 'AM' || tz == 'PM') ? '' : tz; // String
};

// Utility methods to do arithmetic calculations with Dates

date.compare = function(/*Date*/date1, /*Date?*/date2, /*String?*/portion){
	// summary:
	//		Compare two date objects by date, time, or both.
	// description:
	//		Returns 0 if equal, positive if a > b, else negative.
	// date1:
	//		Date object
	// date2:
	//		Date object.  If not specified, the current Date is used.
	// portion:
	//		A string indicating the "date" or "time" portion of a Date object.
	//		Compares both "date" and "time" by default.  One of the following:
	//		"date", "time", "datetime"

	// Extra step required in copy for IE - see #3112
	date1 = new Date(+date1);
	date2 = new Date(+(date2 || new Date()));

	if(portion == "date"){
		// Ignore times and compare dates.
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);
	}else if(portion == "time"){
		// Ignore dates and compare times.
		date1.setFullYear(0, 0, 0);
		date2.setFullYear(0, 0, 0);
	}

	if(date1 > date2){ return 1; } // int
	if(date1 < date2){ return -1; } // int
	return 0; // int
};

date.add = function(/*Date*/date, /*String*/interval, /*int*/amount){
	// summary:
	//		Add to a Date in intervals of different size, from milliseconds to years
	// date: Date
	//		Date object to start with
	// interval:
	//		A string representing the interval.  One of the following:
	//		"year", "month", "day", "hour", "minute", "second",
	//		"millisecond", "quarter", "week", "weekday"
	// amount:
	//		How much to add to the date.

	var sum = new Date(+date); // convert to Number before copying to accommodate IE (#3112)
	var fixOvershoot = false;
	var property = "Date";

	switch(interval){
		case "day":
			break;
		case "weekday":
			//i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo/cldr/supplemental

			// Divide the increment time span into weekspans plus leftover days
			// e.g., 8 days is one 5-day weekspan / and two leftover days
			// Can't have zero leftover days, so numbers divisible by 5 get
			// a days value of 5, and the remaining days make up the number of weeks
			var days, weeks;
			var mod = amount % 5;
			if(!mod){
				days = (amount > 0) ? 5 : -5;
				weeks = (amount > 0) ? ((amount-5)/5) : ((amount+5)/5);
			}else{
				days = mod;
				weeks = parseInt(amount/5);
			}
			// Get weekday value for orig date param
			var strt = date.getDay();
			// Orig date is Sat / positive incrementer
			// Jump over Sun
			var adj = 0;
			if(strt == 6 && amount > 0){
				adj = 1;
			}else if(strt == 0 && amount < 0){
			// Orig date is Sun / negative incrementer
			// Jump back over Sat
				adj = -1;
			}
			// Get weekday val for the new date
			var trgt = strt + days;
			// New date is on Sat or Sun
			if(trgt == 0 || trgt == 6){
				adj = (amount > 0) ? 2 : -2;
			}
			// Increment by number of weeks plus leftover days plus
			// weekend adjustments
			amount = (7 * weeks) + days + adj;
			break;
		case "year":
			property = "FullYear";
			// Keep increment/decrement from 2/29 out of March
			fixOvershoot = true;
			break;
		case "week":
			amount *= 7;
			break;
		case "quarter":
			// Naive quarter is just three months
			amount *= 3;
			// fallthrough...
		case "month":
			// Reset to last day of month if you overshoot
			fixOvershoot = true;
			property = "Month";
			break;
//		case "hour":
//		case "minute":
//		case "second":
//		case "millisecond":
		default:
			property = "UTC"+interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
	}

	if(property){
		sum["set"+property](sum["get"+property]()+amount);
	}

	if(fixOvershoot && (sum.getDate() < date.getDate())){
		sum.setDate(0);
	}

	return sum; // Date
};

date.difference = function(/*Date*/date1, /*Date?*/date2, /*String?*/interval){
	// summary:
	//		Get the difference in a specific unit of time (e.g., number of
	//		months, weeks, days, etc.) between two dates, rounded to the
	//		nearest integer.
	// date1:
	//		Date object
	// date2:
	//		Date object.  If not specified, the current Date is used.
	// interval:
	//		A string representing the interval.  One of the following:
	//		"year", "month", "day", "hour", "minute", "second",
	//		"millisecond", "quarter", "week", "weekday"
	//
	//		Defaults to "day".

	date2 = date2 || new Date();
	interval = interval || "day";
	var yearDiff = date2.getFullYear() - date1.getFullYear();
	var delta = 1; // Integer return value

	switch(interval){
		case "quarter":
			var m1 = date1.getMonth();
			var m2 = date2.getMonth();
			// Figure out which quarter the months are in
			var q1 = Math.floor(m1/3) + 1;
			var q2 = Math.floor(m2/3) + 1;
			// Add quarters for any year difference between the dates
			q2 += (yearDiff * 4);
			delta = q2 - q1;
			break;
		case "weekday":
			var days = Math.round(date.difference(date1, date2, "day"));
			var weeks = parseInt(date.difference(date1, date2, "week"));
			var mod = days % 7;

			// Even number of weeks
			if(mod == 0){
				days = weeks*5;
			}else{
				// Weeks plus spare change (< 7 days)
				var adj = 0;
				var aDay = date1.getDay();
				var bDay = date2.getDay();

				weeks = parseInt(days/7);
				mod = days % 7;
				// Mark the date advanced by the number of
				// round weeks (may be zero)
				var dtMark = new Date(date1);
				dtMark.setDate(dtMark.getDate()+(weeks*7));
				var dayMark = dtMark.getDay();

				// Spare change days -- 6 or less
				if(days > 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = -1;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 0;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = -1;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = -2;
							break;
						// Range contains weekend
						case (dayMark + mod) > 5:
							adj = -2;
					}
				}else if(days < 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = 0;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 1;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = 2;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = 1;
							break;
						// Range contains weekend
						case (dayMark + mod) < 0:
							adj = 2;
					}
				}
				days += adj;
				days -= (weeks*2);
			}
			delta = days;
			break;
		case "year":
			delta = yearDiff;
			break;
		case "month":
			delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
			break;
		case "week":
			// Truncate instead of rounding
			// Don't use Math.floor -- value may be negative
			delta = parseInt(date.difference(date1, date2, "day")/7);
			break;
		case "day":
			delta /= 24;
			// fallthrough
		case "hour":
			delta /= 60;
			// fallthrough
		case "minute":
			delta /= 60;
			// fallthrough
		case "second":
			delta /= 1000;
			// fallthrough
		case "millisecond":
			delta *= date2.getTime() - date1.getTime();
	}

	// Round for fractional values and DST leaps
	return Math.round(delta); // Number (integer)
};

// Don't use setObject() because it may overwrite dojo/date/stamp (if that has already been loaded)
has("extend-dojo") && lang.mixin(lang.getObject("dojo.date", true), date);

return date;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./node_modules/dojo/date/locale.js":
/*!******************************************!*\
  !*** ./node_modules/dojo/date/locale.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	__webpack_require__(/*! ../_base/lang */ "./node_modules/dojo/_base/lang.js"),
	__webpack_require__(/*! ../_base/array */ "./node_modules/dojo/_base/array.js"),
	__webpack_require__(/*! ../date */ "./node_modules/dojo/date.js"),
	/*===== "../_base/declare", =====*/
	__webpack_require__(/*! ../cldr/supplemental */ "./node_modules/dojo/cldr/supplemental.js"),
	__webpack_require__(/*! ../i18n */ "./node_modules/dojo/i18n.js"),
	__webpack_require__(/*! ../regexp */ "./node_modules/dojo/regexp.js"),
	__webpack_require__(/*! ../string */ "./node_modules/dojo/string.js"),
	__webpack_require__(/*! ../i18n!../cldr/nls/gregorian */ "./node_modules/dojo-webpack-plugin/loaders/dojo/i18n/index.js!./node_modules/dojo/cldr/nls/gregorian.js"),
	__webpack_require__.dj.m(module)
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(lang, array, date, /*===== declare, =====*/ supplemental, i18n, regexp, string, gregorian, module){

// module:
//		dojo/date/locale

var exports = {
	// summary:
	//		This modules defines dojo/date/locale, localization methods for Date.
};
lang.setObject(module.i.replace(/\//g, "."), exports);

// Localization methods for Date.   Honor local customs using locale-dependent dojo.cldr data.

// Load the bundles containing localization information for
// names and formats

//NOTE: Everything in this module assumes Gregorian calendars.
// Other calendars will be implemented in separate modules.

	// Format a pattern without literals
	function formatPattern(dateObject, bundle, options, pattern){
		return pattern.replace(/([a-z])\1*/ig, function(match){
			var s, pad,
				c = match.charAt(0),
				l = match.length,
				widthList = ["abbr", "wide", "narrow"];
			switch(c){
				case 'G':
					s = bundle[(l < 4) ? "eraAbbr" : "eraNames"][dateObject.getFullYear() < 0 ? 0 : 1];
					break;
				case 'y':
					s = dateObject.getFullYear();
					switch(l){
						case 1:
							break;
						case 2:
							if(!options.fullYear){
								s = String(s); s = s.substr(s.length - 2);
								break;
							}
							// fallthrough
						default:
							pad = true;
					}
					break;
				case 'Q':
				case 'q':
					s = Math.ceil((dateObject.getMonth()+1)/3);
//					switch(l){
//						case 1: case 2:
							pad = true;
//							break;
//						case 3: case 4: // unimplemented
//					}
					break;
				case 'M':
				case 'L':
					var m = dateObject.getMonth();
					if(l<3){
						s = m+1; pad = true;
					}else{
						var propM = [
							"months",
							c == 'L' ? "standAlone" : "format",
							widthList[l-3]
						].join("-");
						s = bundle[propM][m];
					}
					break;
				case 'w':
					var firstDay = 0;
					s = exports._getWeekOfYear(dateObject, firstDay); pad = true;
					break;
				case 'd':
					s = dateObject.getDate(); pad = true;
					break;
				case 'D':
					s = exports._getDayOfYear(dateObject); pad = true;
					break;
				case 'e':
				case 'c':
					var d = dateObject.getDay();
					if(l<2){
						s = (d - supplemental.getFirstDayOfWeek(options.locale) + 8) % 7
						break;
					}
					// fallthrough
				case 'E':
					d = dateObject.getDay();
					if(l<3){
						s = d+1; pad = true;
					}else{
						var propD = [
							"days",
							c == 'c' ? "standAlone" : "format",
							widthList[l-3]
						].join("-");
						s = bundle[propD][d];
					}
					break;
				case 'a':
					var timePeriod = dateObject.getHours() < 12 ? 'am' : 'pm';
					s = options[timePeriod] || bundle['dayPeriods-format-wide-' + timePeriod];
					break;
				case 'h':
				case 'H':
				case 'K':
				case 'k':
					var h = dateObject.getHours();
					// strange choices in the date format make it impossible to write this succinctly
					switch (c){
						case 'h': // 1-12
							s = (h % 12) || 12;
							break;
						case 'H': // 0-23
							s = h;
							break;
						case 'K': // 0-11
							s = (h % 12);
							break;
						case 'k': // 1-24
							s = h || 24;
							break;
					}
					pad = true;
					break;
				case 'm':
					s = dateObject.getMinutes(); pad = true;
					break;
				case 's':
					s = dateObject.getSeconds(); pad = true;
					break;
				case 'S':
					s = Math.round(dateObject.getMilliseconds() * Math.pow(10, l-3)); pad = true;
					break;
				case 'v': // FIXME: don't know what this is. seems to be same as z?
				case 'z':
					// We only have one timezone to offer; the one from the browser
					s = exports._getZone(dateObject, true, options);
					if(s){break;}
					l=4;
					// fallthrough... use GMT if tz not available
				case 'Z':
					var offset = exports._getZone(dateObject, false, options);
					var tz = [
						(offset<=0 ? "+" : "-"),
						string.pad(Math.floor(Math.abs(offset)/60), 2),
						string.pad(Math.abs(offset)% 60, 2)
					];
					if(l==4){
						tz.splice(0, 0, "GMT");
						tz.splice(3, 0, ":");
					}
					s = tz.join("");
					break;
//				case 'Y': case 'u': case 'W': case 'F': case 'g': case 'A':
//					console.log(match+" modifier unimplemented");
				default:
					throw new Error("dojo.date.locale.format: invalid pattern char: "+pattern);
			}
			if(pad){ s = string.pad(s, l); }
			return s;
		});
	}

/*=====
var __FormatOptions = exports.__FormatOptions = declare(null, {
	// selector: String
	//		choice of 'time','date' (default: date and time)
	// formatLength: String
	//		choice of long, short, medium or full (plus any custom additions).  Defaults to 'short'
	// datePattern:String
	//		override pattern with this string
	// timePattern:String
	//		override pattern with this string
	// am: String
	//		override strings for am in times
	// pm: String
	//		override strings for pm in times
	// locale: String
	//		override the locale used to determine formatting rules
	// fullYear: Boolean
	//		(format only) use 4 digit years whenever 2 digit years are called for
	// strict: Boolean
	//		(parse only) strict parsing, off by default
});
=====*/

exports._getZone = function(/*Date*/ dateObject, /*boolean*/ getName, /*__FormatOptions?*/ options){
	// summary:
	//		Returns the zone (or offset) for the given date and options.  This
	//		is broken out into a separate function so that it can be overridden
	//		by timezone-aware code.
	//
	// dateObject:
	//		the date and/or time being formatted.
	//
	// getName:
	//		Whether to return the timezone string (if true), or the offset (if false)
	//
	// options:
	//		The options being used for formatting
	if(getName){
		return date.getTimezoneName(dateObject);
	}else{
		return dateObject.getTimezoneOffset();
	}
};


exports.format = function(/*Date*/ dateObject, /*__FormatOptions?*/ options){
	// summary:
	//		Format a Date object as a String, using locale-specific settings.
	//
	// description:
	//		Create a string from a Date object using a known localized pattern.
	//		By default, this method formats both date and time from dateObject.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo/date/locale.addCustomFormats() method.
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//
	// dateObject:
	//		the date and/or time to be formatted.  If a time only is formatted,
	//		the values in the year, month, and day fields are irrelevant.  The
	//		opposite is true when formatting only dates.

	options = options || {};

	var locale = i18n.normalizeLocale(options.locale),
		formatLength = options.formatLength || 'short',
		bundle = exports._getGregorianBundle(locale),
		str = [],
		sauce = lang.hitch(this, formatPattern, dateObject, bundle, options);
	if(options.selector == "year"){
		return _processPattern(bundle["dateFormatItem-yyyy"] || "yyyy", sauce);
	}
	var pattern;
	if(options.selector != "date"){
		pattern = options.timePattern || bundle["timeFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}
	if(options.selector != "time"){
		pattern = options.datePattern || bundle["dateFormat-"+formatLength];
		if(pattern){str.push(_processPattern(pattern, sauce));}
	}

	return str.length == 1 ? str[0] : bundle["dateTimeFormat-"+formatLength].replace(/\'/g,'').replace(/\{(\d+)\}/g,
		function(match, key){ return str[key]; }); // String
};

exports.regexp = function(/*__FormatOptions?*/ options){
	// summary:
	//		Builds the regular needed to parse a localized date

	return exports._parseInfo(options).regexp; // String
};

exports._parseInfo = function(/*__FormatOptions?*/ options){
	options = options || {};
	var locale = i18n.normalizeLocale(options.locale),
		bundle = exports._getGregorianBundle(locale),
		formatLength = options.formatLength || 'short',
		datePattern = options.datePattern || bundle["dateFormat-" + formatLength],
		timePattern = options.timePattern || bundle["timeFormat-" + formatLength],
		pattern;
	if(options.selector == 'date'){
		pattern = datePattern;
	}else if(options.selector == 'time'){
		pattern = timePattern;
	}else{
		pattern = bundle["dateTimeFormat-"+formatLength].replace(/\{(\d+)\}/g,
			function(match, key){ return [timePattern, datePattern][key]; });
	}

	var tokens = [],
		re = _processPattern(pattern, lang.hitch(this, _buildDateTimeRE, tokens, bundle, options));
	return {regexp: re, tokens: tokens, bundle: bundle};
};

exports.parse = function(/*String*/ value, /*__FormatOptions?*/ options){
	// summary:
	//		Convert a properly formatted string to a primitive Date object,
	//		using locale-specific settings.
	//
	// description:
	//		Create a Date object from a string using a known localized pattern.
	//		By default, this method parses looking for both date and time in the string.
	//		Formatting patterns are chosen appropriate to the locale.  Different
	//		formatting lengths may be chosen, with "full" used by default.
	//		Custom patterns may be used or registered with translations using
	//		the dojo/date/locale.addCustomFormats() method.
	//
	//		Formatting patterns are implemented using [the syntax described at
	//		unicode.org](http://www.unicode.org/reports/tr35/tr35-4.html#Date_Format_Patterns)
	//		When two digit years are used, a century is chosen according to a sliding
	//		window of 80 years before and 20 years after present year, for both `yy` and `yyyy` patterns.
	//		year < 100CE requires strict mode.
	//
	// value:
	//		A string representation of a date

	// remove non-printing bidi control chars from input and pattern
	var controlChars = /[\u200E\u200F\u202A\u202E]/g,
		info = exports._parseInfo(options),
		tokens = info.tokens, bundle = info.bundle,
		re = new RegExp("^" + info.regexp.replace(controlChars, "") + "$",
			info.strict ? "" : "i"),
		match = re.exec(value && value.replace(controlChars, ""));

	if(!match){ return null; } // null

	var widthList = ['abbr', 'wide', 'narrow'],
		result = [1970,0,1,0,0,0,0], // will get converted to a Date at the end
		amPm = "",
		valid = array.every(match, function(v, i){
		if(!i){return true;}
		var token = tokens[i-1],
			l = token.length,
			c = token.charAt(0);
		switch(c){
			case 'y':
				if(l != 2 && options.strict){
					//interpret year literally, so '5' would be 5 A.D.
					result[0] = v;
				}else{
					if(v<100){
						v = Number(v);
						//choose century to apply, according to a sliding window
						//of 80 years before and 20 years after present year
						var year = '' + new Date().getFullYear(),
							century = year.substring(0, 2) * 100,
							cutoff = Math.min(Number(year.substring(2, 4)) + 20, 99);
						result[0] = (v < cutoff) ? century + v : century - 100 + v;
					}else{
						//we expected 2 digits and got more...
						if(options.strict){
							return false;
						}
						//interpret literally, so '150' would be 150 A.D.
						//also tolerate '1950', if 'yyyy' input passed to 'yy' format
						result[0] = v;
					}
				}
				break;
			case 'M':
			case 'L':
				if(l>2){
					var months = bundle['months-' +
							    (c == 'L' ? 'standAlone' : 'format') +
							    '-' + widthList[l-3]].concat();
					if(!options.strict){
						//Tolerate abbreviating period in month part
						//Case-insensitive comparison
						v = v.replace(".","").toLowerCase();
						months = array.map(months, function(s){ return s.replace(".","").toLowerCase(); } );
					}
					v = array.indexOf(months, v);
					if(v == -1){
//						console.log("dojo/date/locale.parse: Could not parse month name: '" + v + "'.");
						return false;
					}
				}else{
					v--;
				}
				result[1] = v;
				break;
			case 'E':
			case 'e':
			case 'c':
				var days = bundle['days-' +
						  (c == 'c' ? 'standAlone' : 'format') +
						  '-' + widthList[l-3]].concat();
				if(!options.strict){
					//Case-insensitive comparison
					v = v.toLowerCase();
					days = array.map(days, function(d){return d.toLowerCase();});
				}
				v = array.indexOf(days, v);
				if(v == -1){
//					console.log("dojo/date/locale.parse: Could not parse weekday name: '" + v + "'.");
					return false;
				}

				//TODO: not sure what to actually do with this input,
				//in terms of setting something on the Date obj...?
				//without more context, can't affect the actual date
				//TODO: just validate?
				break;
			case 'D':
				result[1] = 0;
				// fallthrough...
			case 'd':
				result[2] = v;
				break;
			case 'a': //am/pm
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
				if(!options.strict){
					var period = /\./g;
					v = v.replace(period,'').toLowerCase();
					am = am.replace(period,'').toLowerCase();
					pm = pm.replace(period,'').toLowerCase();
				}
				if(options.strict && v != am && v != pm){
//					console.log("dojo/date/locale.parse: Could not parse am/pm part.");
					return false;
				}

				// we might not have seen the hours field yet, so store the state and apply hour change later
				amPm = (v == pm) ? 'p' : (v == am) ? 'a' : '';
				break;
			case 'K': //hour (1-24)
				if(v == 24){ v = 0; }
				// fallthrough...
			case 'h': //hour (1-12)
			case 'H': //hour (0-23)
			case 'k': //hour (0-11)
				//TODO: strict bounds checking, padding
				if(v > 23){
//					console.log("dojo/date/locale.parse: Illegal hours value");
					return false;
				}

				//in the 12-hour case, adjusting for am/pm requires the 'a' part
				//which could come before or after the hour, so we will adjust later
				result[3] = v;
				break;
			case 'm': //minutes
				result[4] = v;
				break;
			case 's': //seconds
				result[5] = v;
				break;
			case 'S': //milliseconds
				result[6] = v;
//				break;
//			case 'w':
//TODO				var firstDay = 0;
//			default:
//TODO: throw?
//				console.log("dojo/date/locale.parse: unsupported pattern char=" + token.charAt(0));
		}
		return true;
	});

	var hours = +result[3];
	if(amPm === 'p' && hours < 12){
		result[3] = hours + 12; //e.g., 3pm -> 15
	}else if(amPm === 'a' && hours == 12){
		result[3] = 0; //12am -> 0
	}

	//TODO: implement a getWeekday() method in order to test
	//validity of input strings containing 'EEE' or 'EEEE'...

	var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
	if(options.strict){
		dateObject.setFullYear(result[0]);
	}

	// Check for overflow.  The Date() constructor normalizes things like April 32nd...
	//TODO: why isn't this done for times as well?
	var allTokens = tokens.join(""),
		dateToken = allTokens.indexOf('d') != -1,
		monthToken = allTokens.indexOf('M') != -1;

	if(!valid ||
		(monthToken && dateObject.getMonth() > result[1]) ||
		(dateToken && dateObject.getDate() > result[2])){
		return null;
	}

	// Check for underflow, due to DST shifts.  See #9366
	// This assumes a 1 hour dst shift correction at midnight
	// We could compare the timezone offset after the shift and add the difference instead.
	if((monthToken && dateObject.getMonth() < result[1]) ||
		(dateToken && dateObject.getDate() < result[2])){
		dateObject = date.add(dateObject, "hour", 1);
	}

	return dateObject; // Date
};

function _processPattern(pattern, applyPattern, applyLiteral, applyAll){
	//summary: Process a pattern with literals in it

	// Break up on single quotes, treat every other one as a literal, except '' which becomes '
	var identity = function(x){return x;};
	applyPattern = applyPattern || identity;
	applyLiteral = applyLiteral || identity;
	applyAll = applyAll || identity;

	//split on single quotes (which escape literals in date format strings)
	//but preserve escaped single quotes (e.g., o''clock)
	var chunks = pattern.match(/(''|[^'])+/g),
		literal = pattern.charAt(0) == "'";

	array.forEach(chunks, function(chunk, i){
		if(!chunk){
			chunks[i]='';
		}else{
			chunks[i]=(literal ? applyLiteral : applyPattern)(chunk.replace(/''/g, "'"));
			literal = !literal;
		}
	});
	return applyAll(chunks.join(''));
}

var widthList = ['abbr', 'wide', 'narrow'];
function _buildDateTimeRE(tokens, bundle, options, pattern){
	pattern = regexp.escapeString(pattern);
	if(!options.strict){ pattern = pattern.replace(" a", " ?a"); } // kludge to tolerate no space before am/pm
	return pattern.replace(/([a-z])\1*/ig, function(match){
		// Build a simple regexp.  Avoid captures, which would ruin the tokens list
		var s,
			c = match.charAt(0),
			l = match.length,
			p2 = '', p3 = '';
		if(options.strict){
			if(l > 1){ p2 = '0' + '{'+(l-1)+'}'; }
			if(l > 2){ p3 = '0' + '{'+(l-2)+'}'; }
		}else{
			p2 = '0?'; p3 = '0{0,2}';
		}
		switch(c){
			case 'y':
				s = '\\d{2,4}';
				break;
			case 'M':
			case 'L':
				if(l>2){
					var months = bundle[
						'months-' +
						(c == 'L' ? 'standAlone' : 'format') +
						'-' + widthList[l-3]
					].slice(0);
					s = months.join('|');
					if(!options.strict){
						s = s.replace(/\./g, '');
						//Tolerate abbreviating period in month part
						s = '(?:' + s + ')\\.?';
					}
				}else{
					s = '1[0-2]|'+p2+'[1-9]';
				}
				break;
			case 'D':
				s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|'+p2+'[1-9][0-9]|'+p3+'[1-9]';
				break;
			case 'd':
				s = '3[01]|[12]\\d|'+p2+'[1-9]';
				break;
			case 'w':
				s = '[1-4][0-9]|5[0-3]|'+p2+'[1-9]';
				break;
			case 'E':
			case 'e':
			case 'c':
				s = '.+?'; // match anything including spaces until the first pattern delimiter is found such as a comma or space
				break;
			case 'h': //hour (1-12)
				s = '1[0-2]|'+p2+'[1-9]';
				break;
			case 'k': //hour (0-11)
				s = '1[01]|'+p2+'\\d';
				break;
			case 'H': //hour (0-23)
				s = '1\\d|2[0-3]|'+p2+'\\d';
				break;
			case 'K': //hour (1-24)
				s = '1\\d|2[0-4]|'+p2+'[1-9]';
				break;
			case 'm':
			case 's':
				s = '[0-5]\\d';
				break;
			case 'S':
				s = '\\d{'+l+'}';
				break;
			case 'a':
				var am = options.am || bundle['dayPeriods-format-wide-am'],
					pm = options.pm || bundle['dayPeriods-format-wide-pm'];
					s = am + '|' + pm;
				if(!options.strict){
					if(am != am.toLowerCase()){ s += '|' + am.toLowerCase(); }
					if(pm != pm.toLowerCase()){ s += '|' + pm.toLowerCase(); }
					if(s.indexOf('.') != -1){ s += '|' + s.replace(/\./g, ""); }
				}
				s = s.replace(/\./g, "\\.");
				break;
			default:
			// case 'v':
			// case 'z':
			// case 'Z':
				s = ".*";
//				console.log("parse of date format, pattern=" + pattern);
		}

		if(tokens){ tokens.push(match); }

		return "(" + s + ")"; // add capture
	}).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
}

var _customFormats = [];
var _cachedGregorianBundles = {};
exports.addCustomFormats = function(/*String*/ packageName, /*String*/ bundleName){
	// summary:
	//		Add a reference to a bundle containing localized custom formats to be
	//		used by date/time formatting and parsing routines.
	//
	// description:
	//		The user may add custom localized formats where the bundle has properties following the
	//		same naming convention used by dojo.cldr: `dateFormat-xxxx` / `timeFormat-xxxx`
	//		The pattern string should match the format used by the CLDR.
	//		See dojo/date/locale.format() for details.
	//		The resources must be loaded by dojo.requireLocalization() prior to use

	_customFormats.push({pkg:packageName,name:bundleName});
	_cachedGregorianBundles = {};
};

exports._getGregorianBundle = function(/*String*/ locale){
	if(_cachedGregorianBundles[locale]){
		return _cachedGregorianBundles[locale];
	}
	var gregorian = {};
	array.forEach(_customFormats, function(desc){
		var bundle = i18n.getLocalization(desc.pkg, desc.name, locale);
		gregorian = lang.mixin(gregorian, bundle);
	}, this);
	return _cachedGregorianBundles[locale] = gregorian; /*Object*/
};

exports.addCustomFormats(module.i.replace(/\/date\/locale$/, ".cldr"),"gregorian");

exports.getNames = function(/*String*/ item, /*String*/ type, /*String?*/ context, /*String?*/ locale){
	// summary:
	//		Used to get localized strings from dojo.cldr for day or month names.
	//
	// item:
	//	'months' || 'days'
	// type:
	//	'wide' || 'abbr' || 'narrow' (e.g. "Monday", "Mon", or "M" respectively, in English)
	// context:
	//	'standAlone' || 'format' (default)
	// locale:
	//	override locale used to find the names

	var label,
		lookup = exports._getGregorianBundle(locale),
		props = [item, context, type];
	if(context == 'standAlone'){
		var key = props.join('-');
		label = lookup[key];
		// Fall back to 'format' flavor of name
		if(label[0] == 1){ label = undefined; } // kludge, in the absence of real aliasing support in dojo.cldr
	}
	props[1] = 'format';

	// return by copy so changes won't be made accidentally to the in-memory model
	return (label || lookup[props.join('-')]).concat(); /*Array*/
};

exports.isWeekend = function(/*Date?*/ dateObject, /*String?*/ locale){
	// summary:
	//	Determines if the date falls on a weekend, according to local custom.

	var weekend = supplemental.getWeekend(locale),
		day = (dateObject || new Date()).getDay();
	if(weekend.end < weekend.start){
		weekend.end += 7;
		if(day < weekend.start){ day += 7; }
	}
	return day >= weekend.start && day <= weekend.end; // Boolean
};

// These are used only by format and strftime.  Do they need to be public?  Which module should they go in?

exports._getDayOfYear = function(/*Date*/ dateObject){
	// summary:
	//		gets the day of the year as represented by dateObject
	return date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject) + 1; // Number
};

exports._getWeekOfYear = function(/*Date*/ dateObject, /*Number*/ firstDayOfWeek){
	if(arguments.length == 1){ firstDayOfWeek = 0; } // Sunday

	var firstDayOfYear = new Date(dateObject.getFullYear(), 0, 1).getDay(),
		adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
		week = Math.floor((exports._getDayOfYear(dateObject) + adj - 1) / 7);

	// if year starts on the specified day, start counting weeks at 1
	if(firstDayOfYear == firstDayOfWeek){ week++; }

	return week; // Number
};

return exports;
}).apply(null, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);