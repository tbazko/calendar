(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Calendar API
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarAPI = function () {
	function CalendarAPI() {
		_classCallCheck(this, CalendarAPI);
	}

	_createClass(CalendarAPI, null, [{
		key: 'dayNames',
		value: function dayNames() {
			return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		}
	}, {
		key: 'shortDayNames',
		value: function shortDayNames() {
			return ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
		}
	}, {
		key: 'monthNames',
		value: function monthNames() {
			return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		}
	}, {
		key: 'shortMonthNames',
		value: function shortMonthNames() {
			return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		}
	}, {
		key: 'getDayName',
		value: function getDayName(day) {
			var names = this.dayNames();
			var shortNames = this.shortDayNames();
			return {
				name: names[day],
				shortName: shortNames[day]
			};
		}
	}, {
		key: 'getMonthName',
		value: function getMonthName(month) {
			var names = this.monthNames();
			var shortNames = this.shortMonthNames();
			return {
				name: names[month],
				shortName: shortNames[month]
			};
		}
	}, {
		key: 'todayUTC',
		value: function todayUTC() {
			var date = new Date(),
			    month = date.getMonth();
			date.setHours(0);
			var todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
			todayUTC.monthName = this.getMonthName(month).name;
			return todayUTC;
		}
	}, {
		key: 'getDaysInMonth',
		value: function getDaysInMonth(month, year) {
			return new Date(year, month + 1, 0).getDate();
		}
	}]);

	return CalendarAPI;
}();

module.exports = CalendarAPI;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../calendar/CalendarAPI');
var DayState = require('./ModelStates/DayState');

var HighlighterModel = function () {
	function HighlighterModel(State) {
		_classCallCheck(this, HighlighterModel);

		this._currentState = new State(this);
		this._direction = 0;
	}

	_createClass(HighlighterModel, [{
		key: 'resetDatesToDefault',
		value: function resetDatesToDefault() {
			this.currentState.resetDatesToDefault();
		}
	}, {
		key: 'currentState',
		set: function set(newState) {
			this._currentState = newState;
		},
		get: function get() {
			return this._currentState;
		}
	}, {
		key: 'today',
		get: function get() {
			return calendarAPI.todayUTC();
		}
	}, {
		key: 'firstDayStamp',
		get: function get() {
			return this.currentState.firstDayStamp;
		}
	}, {
		key: 'lastDayStamp',
		get: function get() {
			return this.currentState.lastDayStamp;
		}
	}, {
		key: 'highlightRangeStamps',
		get: function get() {
			return {
				firstDayStamp: this.currentState.firstDayStamp,
				lastDayStamp: this.currentState.lastDayStamp
			};
		}
	}, {
		key: 'rangeDescription',
		get: function get() {
			return this.currentState.rangeDescription;
		}
	}, {
		key: 'direction',
		get: function get() {
			return this._direction;
		},
		set: function set(direction) {
			this._direction = direction;
			this.currentState._changeDatesRange();
		}
	}]);

	return HighlighterModel;
}();

module.exports = HighlighterModel;

},{"./../calendar/CalendarAPI":1,"./ModelStates/DayState":5}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlighterModel = require('./HighlighterModel');
var HighlighterView = require('./HighlighterView');
var DayState = require('./ModelStates/DayState');
var WeekState = require('./ModelStates/WeekState');
var MonthState = require('./ModelStates/MonthState');
var LastDaysState = require('./ModelStates/LastDaysState');

var HighlighterPresenter = function () {
	function HighlighterPresenter(document) {
		_classCallCheck(this, HighlighterPresenter);

		this.document = document;
		this.model = new HighlighterModel(DayState);
		this.view = new HighlighterView(this.document);
	}

	_createClass(HighlighterPresenter, [{
		key: 'connectTo',
		value: function connectTo(calendar) {
			this.calendar = calendar;
			this.init();
		}
	}, {
		key: 'init',
		value: function init() {
			this.view.declareViewElements();
			this.bindEvents();
			this.bindCalendarEvents();
			this.highlightCalendar();
			this.renderView(this.view.dayViewTrigger);
		}
	}, {
		key: 'removeHighlight',
		value: function removeHighlight() {
			this.calendar.removeClassFromElements('is-highlighted-first', [this.model.firstDayStamp, this.model.lastDayStamp, this.calendar.model.allDatesOfWeeks[0].timestampUTC]);
			this.calendar.removeClassFromElements('is-highlighted-last', [this.model.firstDayStamp, this.model.lastDayStamp]);
		}
	}, {
		key: 'highlightCalendar',
		value: function highlightCalendar(month) {
			if (month && month.isCurrentMonth) {
				this.model.resetDatesToDefault();
			}

			var first = this.model.firstDayStamp,
			    last = this.model.lastDayStamp,
			    allDatesInView = this.calendar.model.allDatesOfWeeks,
			    firstInViewStamp = allDatesInView[0].timestampUTC,
			    lastInViewStamp = allDatesInView[allDatesInView.length - 1].timestampUTC,
			    isLastInCurrentView = this.isDateInCurrentView(last, firstInViewStamp, lastInViewStamp);

			this.calendar.setClassOnElement('is-highlighted-first', first, function noElementFound() {
				if (this.model.direction === 1) {
					this.moveToMonthOfStamp(first);
				} else if (isLastInCurrentView) {
					this.calendar.setClassOnElement('is-highlighted-first', firstInViewStamp, function () {
						return false;
					});
				}
			}.bind(this));
			this.calendar.setClassOnElement('is-highlighted-last', last, function noElementFound() {
				if (this.model.direction === -1) {
					this.moveToMonthOfStamp(last);
				}
			}.bind(this));
			this.model.direction = 0;
		}
	}, {
		key: 'isDateInCurrentView',
		value: function isDateInCurrentView(dateStamp, firstDateInViewStamp, lastDateInViewStamp) {
			return dateStamp > firstDateInViewStamp && dateStamp < lastDateInViewStamp;
		}
	}, {
		key: 'moveToMonthOfStamp',
		value: function moveToMonthOfStamp(date) {
			this.model.direction = 0;
			var date = new Date(date);
			this.calendar.model.monthToShow = {
				month: date.getMonth(),
				year: date.getFullYear()
			};
		}
	}, {
		key: 'renderView',
		value: function renderView(target) {
			this.view.render(target, this.model.rangeDescription);
		}
	}, {
		key: 'bindEvents',
		value: function bindEvents() {
			this.view.dayViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, DayState), false);
			this.view.weekViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, WeekState), false);
			this.view.monthViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, MonthState), false);
			this.view.prevDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, -1), false);
			this.view.nextDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, 1), false);

			for (var i = 0; i < this.view.lastDaysViewTriggers.length; i++) {
				this.view.lastDaysViewTriggers[i].addEventListener('click', this.onViewTriggerClick.bind(this, LastDaysState), false);
			}
		}
	}, {
		key: 'bindCalendarEvents',
		value: function bindCalendarEvents() {
			this.calendar.model.addObserver(this.highlightCalendar.bind(this));
		}
	}, {
		key: 'onDatesRangeClick',
		value: function onDatesRangeClick(direction) {
			this.removeHighlight();
			this.model.direction = direction;
			this.view.setRangeDescription(this.model.rangeDescription);
			this.highlightCalendar();
		}
	}, {
		key: 'onViewTriggerClick',
		value: function onViewTriggerClick(newState, e) {
			var target = e.target || e.currentTarget,
			    daysCount = target.getAttribute('data-days-count'),
			    state = daysCount ? new newState(this.model, daysCount) : new newState(this.model);

			if (this.model.currentState == state) {
				return;
			}

			this.removeHighlight();
			this.model.currentState = state;
			this.renderView(target);
			this.moveToMonthOfStamp(this.model.today.getTime());
		}
	}]);

	return HighlighterPresenter;
}();

module.exports = HighlighterPresenter;

},{"./HighlighterModel":2,"./HighlighterView":4,"./ModelStates/DayState":5,"./ModelStates/LastDaysState":6,"./ModelStates/MonthState":7,"./ModelStates/WeekState":8}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlighterView = function () {
	function HighlighterView(document) {
		_classCallCheck(this, HighlighterView);

		this.document = document;
	}

	_createClass(HighlighterView, [{
		key: 'declareViewElements',
		value: function declareViewElements() {
			this.dayViewTrigger = document.getElementById('dayView');
			this.weekViewTrigger = document.getElementById('weekView');
			this.monthViewTrigger = document.getElementById('monthView');
			this.lastDaysViewTriggers = document.getElementsByClassName('js-lastDaysView');
			this.prevDatesRangeTrigger = document.getElementById('prev-dates-range');
			this.nextDatesRangeTrigger = document.getElementById('next-dates-range');
			this.rangeDescription = document.getElementById('js-rangeDescription');
			this.currentStateNameElem = document.getElementById('calendar-view-type');
		}
	}, {
		key: 'render',
		value: function render(target, rangeStr) {
			this.setRangeTitle(target);
			this.setRangeDescription(rangeStr);
		}
	}, {
		key: 'setRangeTitle',
		value: function setRangeTitle(target) {
			this.currentStateNameElem.textContent = target.textContent;
			this.deactivateOtherStateNames(target);
			this.addClass(target, 'is_selected');
		}
	}, {
		key: 'setRangeDescription',
		value: function setRangeDescription(rangeStr) {
			this.rangeDescription.textContent = rangeStr;
		}
	}, {
		key: 'deactivateOtherStateNames',
		value: function deactivateOtherStateNames(target) {
			var siblings = target.parentNode.children;
			for (var i = 0; i < siblings.length; i++) {
				this.removeClass(siblings[i], 'is_selected');
			}
		}
	}, {
		key: 'addClass',
		value: function addClass(el, className) {
			var cn = el.className;

			if (cn.indexOf(className) != -1) {
				return;
			}

			if (cn != '') {
				className = ' ' + className;
			}
			el.className = cn + className;
		}
	}, {
		key: 'removeClass',
		value: function removeClass(el, className) {
			var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
			el.className = el.className.replace(regex, '');
		}
	}]);

	return HighlighterView;
}();

module.exports = HighlighterView;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../../calendar/CalendarAPI');

var DayState = function () {
	function DayState(highlightModel) {
		_classCallCheck(this, DayState);

		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this.model.today.getTime();
	}

	_createClass(DayState, [{
		key: '_changeDatesRange',
		value: function _changeDatesRange() {
			this.firstDayStamp = this.firstDayStamp + 60 * 60 * 24 * 1000 * this.model.direction;
			this.lastDayStamp = this.firstDayStamp;
		}
	}, {
		key: 'resetDatesToDefault',
		value: function resetDatesToDefault() {
			this.firstDayStamp = this.model.today.getTime();
			this.lastDayStamp = this.model.today.getTime();
		}
	}, {
		key: 'rangeDescription',
		get: function get() {
			var date = new Date(this.firstDayStamp);
			var dayOfWeek = calendarAPI.getDayName(date.getDay()).name;
			var monthName = calendarAPI.getMonthName(date.getMonth()).name;

			return dayOfWeek + ', ' + monthName + ' ' + date.getDate() + ', ' + date.getFullYear();
		}
	}, {
		key: 'firstDayStamp',
		get: function get() {
			return this._firstDayStamp;
		},
		set: function set(timeStamp) {
			this._firstDayStamp = timeStamp;
		}
	}, {
		key: 'lastDayStamp',
		get: function get() {
			return this._lastDayStamp;
		},
		set: function set(timeStamp) {
			this._lastDayStamp = timeStamp;
		}
	}]);

	return DayState;
}();

module.exports = DayState;

},{"./../../calendar/CalendarAPI":1}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../../calendar/CalendarAPI');

var LastDaysState = function () {
	function LastDaysState(highlightModel, daysCount) {
		_classCallCheck(this, LastDaysState);

		this.model = highlightModel;
		this.daysCount = daysCount;
		this._setFirstAndLastDay(this.model.today);
	}

	_createClass(LastDaysState, [{
		key: '_changeDatesRange',
		value: function _changeDatesRange() {
			var first = this.firstDay,
			    last = this.lastDay,
			    direction = this.model.direction;
			this.firstDay = new Date(Date.UTC(first.getFullYear(), first.getMonth(), first.getDate() + this.daysCount * direction));
			this.lastDay = new Date(Date.UTC(last.getFullYear(), last.getMonth(), last.getDate() + this.daysCount * direction));
		}
	}, {
		key: 'resetDatesToDefault',
		value: function resetDatesToDefault() {
			this._setFirstAndLastDay(this.model.today);
		}
	}, {
		key: '_setFirstAndLastDay',
		value: function _setFirstAndLastDay(date) {
			var y = date.getFullYear(),
			    m = date.getMonth();

			this.firstDay = new Date(Date.UTC(y, m, date.getDate() - this.daysCount));
			this.lastDay = new Date(Date.UTC(y, m, date.getDate() - 1));
		}
	}, {
		key: 'rangeDescription',
		get: function get() {
			var first = this.firstDay;
			var last = this.lastDay;

			return calendarAPI.getMonthName(first.getMonth()).shortName + ' ' + first.getDate() + ' - ' + calendarAPI.getMonthName(last.getMonth()).shortName + ' ' + last.getDate() + ', ' + last.getFullYear();
		}
	}, {
		key: 'firstDay',
		set: function set(day) {
			this._firstDay = day;
		},
		get: function get() {
			return this._firstDay;
		}
	}, {
		key: 'lastDay',
		set: function set(day) {
			this._lastDay = day;
		},
		get: function get() {
			return this._lastDay;
		}
	}, {
		key: 'firstDayStamp',
		get: function get() {
			return this.firstDay.getTime();
		}
	}, {
		key: 'lastDayStamp',
		get: function get() {
			return this.lastDay.getTime();
		}
	}]);

	return LastDaysState;
}();

module.exports = LastDaysState;

},{"./../../calendar/CalendarAPI":1}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../../calendar/CalendarAPI');

var MonthState = function () {
	function MonthState(highlightModel) {
		_classCallCheck(this, MonthState);

		this.model = highlightModel;
		this._setFirstAndLastDay(this.model.today);
	}

	_createClass(MonthState, [{
		key: '_changeDatesRange',
		value: function _changeDatesRange() {
			var y = this.firstDay.getFullYear(),
			    m = this.firstDay.getMonth(),
			    direction = this.model.direction,
			    date = new Date(y, m + direction, 1);

			this._setFirstAndLastDay(date);
		}
	}, {
		key: 'resetDatesToDefault',
		value: function resetDatesToDefault() {
			this._setFirstAndLastDay(this.model.today);
		}
	}, {
		key: '_setFirstAndLastDay',
		value: function _setFirstAndLastDay(date) {
			var y = date.getFullYear(),
			    m = date.getMonth();

			this.firstDay = new Date(Date.UTC(y, m, 1));
			this.lastDay = new Date(Date.UTC(y, m, calendarAPI.getDaysInMonth(m, y)));
		}
	}, {
		key: 'rangeDescription',
		get: function get() {
			var date = this.firstDay;
			var monthName = calendarAPI.getMonthName(date.getMonth()).name;

			return monthName + ', ' + date.getFullYear();
		}
	}, {
		key: 'firstDay',
		set: function set(day) {
			this._firstDay = day;
		},
		get: function get() {
			return this._firstDay;
		}
	}, {
		key: 'lastDay',
		set: function set(day) {
			this._lastDay = day;
		},
		get: function get() {
			return this._lastDay;
		}
	}, {
		key: 'firstDayStamp',
		get: function get() {
			return this.firstDay.getTime();
		}
	}, {
		key: 'lastDayStamp',
		get: function get() {
			return this.lastDay.getTime();
		}
	}]);

	return MonthState;
}();

module.exports = MonthState;

},{"./../../calendar/CalendarAPI":1}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../../calendar/CalendarAPI');

var WeekState = function () {
	function WeekState(highlightModel) {
		_classCallCheck(this, WeekState);

		this.model = highlightModel;
		this._setFirstAndLastDay(this.model.today.getTime());
	}

	_createClass(WeekState, [{
		key: '_changeDatesRange',
		value: function _changeDatesRange() {
			var step = 60 * 60 * 24 * 7 * 1000,
			    direction = this.model.direction;
			this.firstDay = new Date(this.firstDayStamp + step * direction);
			this.lastDay = new Date(this.lastDayStamp + step * direction);
		}
	}, {
		key: 'resetDatesToDefault',
		value: function resetDatesToDefault() {
			this._setFirstAndLastDay(this.model.today.getTime());
		}
	}, {
		key: '_setFirstAndLastDay',
		value: function _setFirstAndLastDay(timeStamp) {
			var dayOfWeek = new Date(timeStamp).getDay();
			this.firstDay = new Date(timeStamp - 60 * 60 * 24 * dayOfWeek * 1000);
			this.lastDay = new Date(this.firstDay.getTime() + 60 * 60 * 24 * 6 * 1000);
		}
	}, {
		key: 'rangeDescription',
		get: function get() {
			var first = this.firstDay;
			var last = this.lastDay;

			return calendarAPI.getMonthName(first.getMonth()).shortName + ' ' + first.getDate() + ' - ' + calendarAPI.getMonthName(last.getMonth()).shortName + ' ' + last.getDate() + ', ' + last.getFullYear();
		}
	}, {
		key: 'firstDay',
		set: function set(day) {
			this._firstDay = day;
		},
		get: function get() {
			return this._firstDay;
		}
	}, {
		key: 'lastDay',
		set: function set(day) {
			this._lastDay = day;
		},
		get: function get() {
			return this._lastDay;
		}
	}, {
		key: 'firstDayStamp',
		get: function get() {
			return this.firstDay.getTime();
		}
	}, {
		key: 'lastDayStamp',
		get: function get() {
			return this.lastDay.getTime();
		}
	}]);

	return WeekState;
}();

module.exports = WeekState;

},{"./../../calendar/CalendarAPI":1}]},{},[2,3,4]);
