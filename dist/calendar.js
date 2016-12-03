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
			if (typeof callback === 'function') {
				this._observerList.push(callback);
			}
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
		key: '_changeMonth',
		value: function _changeMonth(direction) {
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
			    isCurrentMonth = monthToShow.month === this._currentMonth.month;

			this._monthToShow = {
				month: monthToShow.month,
				year: monthToShow.year,
				monthName: calendarAPI.getMonthName(monthToShow.month).name
			};

			this.notifyObservers({
				isCurrentMonth: isCurrentYear && isCurrentMonth
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
			return this._changeMonth(-1);
		}
	}, {
		key: 'nextMonth',
		get: function get() {
			return this._changeMonth(1);
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

},{"./CalendarView":5}]},{},[1,2,3,4,5,6,7,8]);
