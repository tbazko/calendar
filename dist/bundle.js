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

var MonthPresenter = require('./MonthPresenter');

var CalendarFactory = function () {
	function CalendarFactory() {
		_classCallCheck(this, CalendarFactory);

		this.calendarClass = MonthPresenter;
	}

	_createClass(CalendarFactory, [{
		key: 'createCalendar',
		value: function createCalendar(options) {
			switch (options.type) {
				case "year":
					this.calendarClass = 'Year';
					break;
				case "month":
					this.calendarClass = MonthPresenter;
					break;
			}

			return new this.calendarClass(window.document);
		}
	}]);

	return CalendarFactory;
}();

module.exports = CalendarFactory;

},{"./MonthPresenter":7}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./CalendarAPI');

var CalendarModel = function () {
	function CalendarModel() {
		_classCallCheck(this, CalendarModel);

		this._observerList = [];
	}

	_createClass(CalendarModel, [{
		key: 'totalDaysInMonth',
		value: function totalDaysInMonth(month, year) {
			return calendarAPI.getDaysInMonth(month, year);
		}
	}, {
		key: 'getShortDayNames',
		value: function getShortDayNames() {
			return calendarAPI.shortDayNames();
		}
	}, {
		key: 'addObserver',
		value: function addObserver(callback) {
			this._observerList.push(callback);
		}
	}, {
		key: 'notifyObservers',
		value: function notifyObservers(data) {
			this._observerList.forEach(function (callback) {
				callback(data);
			});
		}
	}, {
		key: 'today',
		get: function get() {
			return calendarAPI.todayUTC();
		}
	}]);

	return CalendarModel;
}();

module.exports = CalendarModel;

},{"./CalendarAPI":1}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarModel = require('./CalendarModel');
var CalendarView = require('./CalendarView');

var CalendarPresenter = function CalendarPresenter(document) {
	_classCallCheck(this, CalendarPresenter);

	this.document = document;
};

module.exports = CalendarPresenter;

},{"./CalendarModel":3,"./CalendarView":5}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarView = function () {
	function CalendarView(document) {
		_classCallCheck(this, CalendarView);

		this.document = document;
	}

	_createClass(CalendarView, [{
		key: 'declareViewElements',
		value: function declareViewElements() {
			this.calendar = document.getElementById('mvp_calendar');
			this.nextMonth = document.getElementById('next_month');
			this.prevMonth = document.getElementById('prev_month');
			this.calendarSelectedMonth = document.getElementById('calendar_selected_month');
			this.todayTrigger = document.getElementById('calendar_button_today');
		}
	}]);

	return CalendarView;
}();

module.exports = CalendarView;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarModel = require('./CalendarModel');
var calendarAPI = require('./CalendarAPI');

var MonthModel = function (_CalendarModel) {
	_inherits(MonthModel, _CalendarModel);

	function MonthModel() {
		_classCallCheck(this, MonthModel);

		var _this = _possibleConstructorReturn(this, (MonthModel.__proto__ || Object.getPrototypeOf(MonthModel)).call(this));

		_this._currentMonth = {
			month: _this.today.getMonth(),
			year: _this.today.getFullYear(),
			monthName: _this.today.monthName
		};
		_this.monthToShow = {
			month: _this._currentMonth.month,
			year: _this._currentMonth.year
		};
		return _this;
	}

	_createClass(MonthModel, [{
		key: 'changeMonth',
		value: function changeMonth(direction) {
			var monthToShow = this.monthToShow,
			    date = new Date(monthToShow.year, monthToShow.month + direction, 1);

			return monthToShow = {
				month: date.getMonth(),
				year: date.getFullYear(),
				monthName: calendarAPI.getMonthName(date.getMonth()).name
			};
		}

		// @return {Array}     Array of objects {date, timestamp, isToday}
		// Weeks includes dates of prev/current/next monthes

	}, {
		key: '_generateDates',
		value: function _generateDates(start, end, month, year) {
			var dates = [],
			    todayStampUTC = this.today.getTime();

			for (var i = start; i <= end; i++) {
				var stampUTC = new Date(Date.UTC(year, month, i)).getTime();

				dates.push({
					date: i,
					timestampUTC: stampUTC,
					isToday: todayStampUTC === stampUTC ? true : false
				});
			}
			return dates;
		}
	}, {
		key: 'monthToShow',
		set: function set(monthToShow) {
			var isCurrentYear = monthToShow.year === this._currentMonth.year,
			    isCrurentMonth = monthToShow.month === this._currentMonth.month;

			this._monthToShow = {
				month: monthToShow.month,
				year: monthToShow.year,
				monthName: calendarAPI.getMonthName(monthToShow.month).name
			};

			this.notifyObservers({
				isCurrentMonth: isCurrentYear && isCrurentMonth
			});
		},
		get: function get() {
			return this._monthToShow;
		}
	}, {
		key: 'currentMonth',
		get: function get() {
			return this._currentMonth;
		}
	}, {
		key: 'prevMonth',
		get: function get() {
			return this.changeMonth(-1);
		}
	}, {
		key: 'nextMonth',
		get: function get() {
			return this.changeMonth(1);
		}
	}, {
		key: 'allDatesOfWeeks',
		get: function get() {
			var month = this.monthToShow;
			return [].concat(this.prevMonthDatesLeftover, this.allDatesOfMonth, this.datesLastWeekLeftover);
		}
	}, {
		key: 'prevMonthDatesLeftover',
		get: function get() {
			var monthToShow = this.monthToShow,
			    firstDayOfMonth = new Date(monthToShow.year, monthToShow.month, 1).getDay(),
			    dates = [];

			if (firstDayOfMonth != 0) {
				var prev = this.prevMonth,
				    totalDaysInPrevMonth = this.totalDaysInMonth(prev.month, prev.year),
				    startDate = totalDaysInPrevMonth - firstDayOfMonth + 1,
				    dates = this._generateDates(startDate, totalDaysInPrevMonth, prev.month, prev.year);
			}
			return dates;
		}
	}, {
		key: 'allDatesOfMonth',
		get: function get() {
			var monthToShow = this.monthToShow,
			    end = this.totalDaysInMonth(monthToShow.month, monthToShow.year);

			return this._generateDates(1, end, monthToShow.month, monthToShow.year);
		}
	}, {
		key: 'datesLastWeekLeftover',
		get: function get() {
			var monthToShow = this.monthToShow,
			    totalDaysInMonth = this.totalDaysInMonth(monthToShow.month, monthToShow.year),
			    lastDayOfMonth = new Date(monthToShow.year, monthToShow.month, totalDaysInMonth).getDay(),
			    dates = [];

			if (lastDayOfMonth != 6) {
				var next = this.nextMonth,
				    end = 6 - lastDayOfMonth,
				    dates = this._generateDates(1, end, next.month, next.year);
			}

			return dates;
		}
	}]);

	return MonthModel;
}(CalendarModel);

module.exports = MonthModel;

},{"./CalendarAPI":1,"./CalendarModel":3}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthModel = require('./MonthModel');
var MonthView = require('./MonthView');
var CalendarPresenter = require('./CalendarPresenter');

var MonthPresenter = function (_CalendarPresenter) {
	_inherits(MonthPresenter, _CalendarPresenter);

	function MonthPresenter(document) {
		_classCallCheck(this, MonthPresenter);

		var _this = _possibleConstructorReturn(this, (MonthPresenter.__proto__ || Object.getPrototypeOf(MonthPresenter)).call(this, document));

		_this.model = _this.createMonthModel();
		_this.view = _this.createMonthView(_this.document);
		_this.init();
		return _this;
	}

	_createClass(MonthPresenter, [{
		key: 'init',
		value: function init() {
			this.view.declareViewElements();
			this.bindEvents();
			this._renderView();
		}
	}, {
		key: 'bindEvents',
		value: function bindEvents() {
			this.view.nextMonth.addEventListener('click', this.nextMonth.bind(this), false);
			this.view.prevMonth.addEventListener('click', this.prevMonth.bind(this), false);
			this.view.todayTrigger.addEventListener('click', this.currentMonth.bind(this), false);
			this.model.addObserver(this._renderView.bind(this));
		}
	}, {
		key: 'currentMonth',
		value: function currentMonth() {
			this.model.monthToShow = this.model.currentMonth;
		}

		// Public functions

	}, {
		key: 'setClassesOnElements',
		value: function setClassesOnElements(classesString, idsArray, callback) {
			for (var i = 0, x = idsArray.length; i < x; i++) {
				this.view.setClassOnElement(classesString, idsArray[i], callback);
			}
		}
	}, {
		key: 'setClassOnElement',
		value: function setClassOnElement(classStr, id, callback) {
			this.view.setClassOnElement(classStr, id, callback);
		}
	}, {
		key: 'removeClassesOnElements',
		value: function removeClassesOnElements(classesString, idsArray) {
			for (var i = 0, x = idsArray.length; i < x; i++) {
				this.view.removeClassesOnElement(classesString, idsArray[i]);
			}
		}
	}, {
		key: 'nextMonth',
		value: function nextMonth() {
			this.model.monthToShow = this.model.nextMonth;
		}
	}, {
		key: 'prevMonth',
		value: function prevMonth() {
			this.model.monthToShow = this.model.prevMonth;
		}

		// Public functions end

	}, {
		key: '_renderView',
		value: function _renderView() {
			var contentFragment = this.document.createDocumentFragment(),
			    contentFragment = this.getShortDayNamesFragment(contentFragment),
			    contentFragment = this.getDatesFragment(contentFragment);

			this.view.render(this.model.monthToShow, contentFragment);
		}
	}, {
		key: 'getShortDayNamesFragment',
		value: function getShortDayNamesFragment(fragment) {
			var dayNames = this.model.getShortDayNames(),
			    child;

			for (var i = 0, x = dayNames.length; i < x; i++) {
				child = this.document.createElement('div');
				child.textContent = dayNames[i];
				fragment.appendChild(child);
			}

			return fragment;
		}
	}, {
		key: 'getDatesFragment',
		value: function getDatesFragment(fragment) {
			var dates = this.model.allDatesOfWeeks,
			    child;

			for (var i = 0, x = dates.length; i < x; i++) {
				child = this.document.createElement('div');
				child.id = dates[i].timestampUTC;
				child.textContent = dates[i].date;

				if (dates[i].isToday) {
					child.setAttribute('class', 'is_today');
				}
				fragment.appendChild(child);
			}

			return fragment;
		}
	}, {
		key: 'createMonthModel',
		value: function createMonthModel() {
			return new MonthModel();
		}
	}, {
		key: 'createMonthView',
		value: function createMonthView() {
			return new MonthView(this.document);
		}
	}]);

	return MonthPresenter;
}(CalendarPresenter);

module.exports = MonthPresenter;

},{"./CalendarPresenter":4,"./MonthModel":6,"./MonthView":8}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarView = require('./CalendarView');

var MonthView = function (_CalendarView) {
	_inherits(MonthView, _CalendarView);

	function MonthView(document) {
		_classCallCheck(this, MonthView);

		return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).call(this, document));
	}

	_createClass(MonthView, [{
		key: 'render',
		value: function render(dateObj, contentFragment) {
			var month = dateObj.month;
			var year = dateObj.year;
			this.setMonthText(dateObj.monthName, year);

			if (this.calendarContent) {
				this.calendar.removeChild(this.calendarContent);
			}
			this.calendarContent = this.document.createElement('div');
			this.calendarContent.setAttribute('class', 'calendar_content');
			this.calendar.appendChild(this.calendarContent);

			this.calendarContent.appendChild(contentFragment);
		}
	}, {
		key: 'setMonthText',
		value: function setMonthText(monthName, year) {
			this.calendarSelectedMonth.textContent = monthName + ' ' + year;
		}
	}, {
		key: 'setClassOnElement',
		value: function setClassOnElement(classString, elementId, callback) {
			var el = this.document.getElementById(elementId);
			if (el) {
				el.className += ' ' + classString;
			} else {
				callback();
			}
		}
	}, {
		key: 'removeClassesOnElement',
		value: function removeClassesOnElement(classesString, elementId) {
			var regex = new RegExp('(?:^|\\s)' + classesString + '(?!\\S)', 'gi');
			var el = this.document.getElementById(elementId);
			if (el) {
				el.className = el.className.replace(regex, '');
			}
		}
	}]);

	return MonthView;
}(CalendarView);

module.exports = MonthView;

},{"./CalendarView":5}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calendarAPI = require('./../calendar/CalendarAPI');
var DayState = require('./ModelStates/DayState');

var HighlighterModel = function () {
	function HighlighterModel(State) {
		_classCallCheck(this, HighlighterModel);

		this._currentState = new DayState(this);
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

},{"./../calendar/CalendarAPI":1,"./ModelStates/DayState":12}],10:[function(require,module,exports){
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
			this.calendar.removeClassesOnElements('is_highlighted_first', [this.model.firstDayStamp, this.model.lastDayStamp, this.calendar.model.allDatesOfWeeks[0].timestampUTC]);
			this.calendar.removeClassesOnElements('is_highlighted_last', [this.model.firstDayStamp, this.model.lastDayStamp]);
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

			this.calendar.setClassOnElement('is_highlighted_first', first, function noElementFound() {
				if (this.model.direction === 1) {
					this.moveToMonthOfStamp(first);
				} else if (isLastInCurrentView) {
					this.calendar.setClassOnElement('is_highlighted_first', firstInViewStamp, function () {
						return false;
					});
				}
			}.bind(this));
			this.calendar.setClassOnElement('is_highlighted_last', last, function noElementFound() {
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

},{"./HighlighterModel":9,"./HighlighterView":11,"./ModelStates/DayState":12,"./ModelStates/LastDaysState":13,"./ModelStates/MonthState":14,"./ModelStates/WeekState":15}],11:[function(require,module,exports){
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
			this.lastDaysViewTriggers = document.getElementsByClassName('js_lastDaysView');
			this.prevDatesRangeTrigger = document.getElementById('prev_dates_range');
			this.nextDatesRangeTrigger = document.getElementById('next_dates_range');
			this.rangeDescription = document.getElementById('calendar_view_descr');
			this.currentStateNameElem = document.getElementById('calendar_view_type');
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

},{}],12:[function(require,module,exports){
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

},{"./../../calendar/CalendarAPI":1}],13:[function(require,module,exports){
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

},{"./../../calendar/CalendarAPI":1}],14:[function(require,module,exports){
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
			var date,
			    y = this.firstDay.getFullYear(),
			    m = this.firstDay.getMonth(),
			    direction = this.model.direction;

			if (direction) {
				date = new Date(y, m + direction, 1);
			} else {
				date = this.model.today;
			}
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

},{"./../../calendar/CalendarAPI":1}],15:[function(require,module,exports){
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

},{"./../../calendar/CalendarAPI":1}],16:[function(require,module,exports){
'use strict';

var CalendarFactory = require('./calendar/CalendarFactory');
var HighlighterPresenter = require('./datesHighlighter/HighlighterPresenter');

var datesHighlighter = new HighlighterPresenter(document);

var calendarFactory = new CalendarFactory(),
    calendar = calendarFactory.createCalendar({
	type: 'month'
});

datesHighlighter.connectTo(calendar);

},{"./calendar/CalendarFactory":2,"./datesHighlighter/HighlighterPresenter":10}]},{},[16,1,2,3,4,5,6,7,8,9,10,11]);
