(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Calendar API

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CalendarAPI = (function () {
	function CalendarAPI() {
		_classCallCheck(this, CalendarAPI);
	}

	CalendarAPI.dayNames = function dayNames() {
		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	};

	CalendarAPI.shortDayNames = function shortDayNames() {
		return ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
	};

	CalendarAPI.monthNames = function monthNames() {
		return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	};

	CalendarAPI.shortMonthNames = function shortMonthNames() {
		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	};

	CalendarAPI.getDayName = function getDayName(day) {
		var names = this.dayNames();
		var shortNames = this.shortDayNames();
		return {
			name: names[day],
			shortName: shortNames[day]
		};
	};

	CalendarAPI.getMonthName = function getMonthName(month) {
		var names = this.monthNames();
		var shortNames = this.shortMonthNames();
		return {
			name: names[month],
			shortName: shortNames[month]
		};
	};

	CalendarAPI.today = function today() {
		var date = new Date(),
		    month = date.getMonth();
		date.setHours(0);
		var today = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		today.monthName = this.getMonthName(month).name;
		return today;
	};

	CalendarAPI.getDaysInMonth = function getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	};

	return CalendarAPI;
})();

module.exports = CalendarAPI;

},{}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Month = require('./MonthPresenter');

var CalendarFactory = (function () {
	function CalendarFactory() {
		_classCallCheck(this, CalendarFactory);

		this.calendarClass = Month;
	}

	CalendarFactory.prototype.createCalendar = function createCalendar(options) {
		switch (options.type) {
			case "year":
				this.calendarClass = 'Year';
				break;
			case "month":
				this.calendarClass = Month;
				break;
		}

		return new this.calendarClass(options);
	};

	return CalendarFactory;
})();

module.exports = CalendarFactory;

},{"./MonthPresenter":7}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./CalendarAPI');

var CalendarModel = (function () {
	function CalendarModel() {
		_classCallCheck(this, CalendarModel);
	}

	CalendarModel.prototype.totalDaysInMonth = function totalDaysInMonth(month, year) {
		return calendarAPI.getDaysInMonth(month, year);
	};

	CalendarModel.prototype.getShortDayNames = function getShortDayNames() {
		return calendarAPI.shortDayNames();
	};

	_createClass(CalendarModel, [{
		key: 'today',
		get: function get() {
			return calendarAPI.today();
		}
	}]);

	return CalendarModel;
})();

module.exports = CalendarModel;

},{"./CalendarAPI":1}],4:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CalendarModel = require('./CalendarModel');
var CalendarView = require('./CalendarView');

var CalendarPresenter = function CalendarPresenter(document) {
	_classCallCheck(this, CalendarPresenter);

	this.document = document;
};

module.exports = CalendarPresenter;

},{"./CalendarModel":3,"./CalendarView":5}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CalendarView = (function () {
	function CalendarView(document) {
		_classCallCheck(this, CalendarView);

		this.document = document;
	}

	CalendarView.prototype.declareViewElements = function declareViewElements() {
		this.calendar = document.getElementById('mvp_calendar');
		this.nextMonth = document.getElementById('next_month');
		this.prevMonth = document.getElementById('prev_month');
		this.calendarSelectedMonth = document.getElementById('calendar_selected_month');
		this.todayTrigger = document.getElementById('calendar_button_today');
	};

	return CalendarView;
})();

module.exports = CalendarView;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarModel = require('./CalendarModel');
var calendarAPI = require('./CalendarAPI');

var MonthModel = (function (_CalendarModel) {
	_inherits(MonthModel, _CalendarModel);

	function MonthModel() {
		_classCallCheck(this, MonthModel);

		_CalendarModel.call(this);
		this._currentMonth = {
			month: this.today.getMonth(),
			year: this.today.getFullYear(),
			monthName: this.today.monthName
		};
		this._monthToShow = {
			month: this._currentMonth.month,
			year: this._currentMonth.year,
			monthName: this._currentMonth.monthName
		};
	}

	MonthModel.prototype._getPrevMonthDatesLeftover = function _getPrevMonthDatesLeftover() {
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
	};

	MonthModel.prototype._getAllDatesOfMonth = function _getAllDatesOfMonth() {
		var monthToShow = this.monthToShow,
		    end = this.totalDaysInMonth(monthToShow.month, monthToShow.year);

		return this._generateDates(1, end, monthToShow.month, monthToShow.year);
	};

	MonthModel.prototype._getDatesLastWeekLeftover = function _getDatesLastWeekLeftover() {
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
	};

	MonthModel.prototype._generateDates = function _generateDates(start, end, month, year) {
		var dates = [],
		   
		// y = this.today.getFullYear(),
		// m = this.today.getMonth(),
		// d = this.today.getDate(),
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
	};

	_createClass(MonthModel, [{
		key: 'monthToShow',
		get: function get() {
			return this._monthToShow;
		},
		set: function set(monthToShow) {
			this._monthToShow = {
				month: monthToShow.month,
				year: monthToShow.year,
				monthName: monthToShow.monthName
			};
		}
	}, {
		key: 'currentMonth',
		get: function get() {
			return this._currentMonth;
		}
	}, {
		key: 'nextMonth',
		get: function get() {
			var toShow = this.monthToShow,
			    date;

			if (toShow.month === 11) {
				date = new Date(toShow.year + 1, 0, 1);
			} else {
				date = new Date(toShow.year, toShow.month + 1, 1);
			}

			return toShow = {
				month: date.getMonth(),
				year: date.getFullYear(),
				monthName: calendarAPI.getMonthName(date.getMonth()).name
			};
		}
	}, {
		key: 'prevMonth',
		get: function get() {
			var toShow = this.monthToShow,
			    date;

			if (toShow.month === 0) {
				date = new Date(toShow.year - 1, 11, 1);
			} else {
				date = new Date(toShow.year, toShow.month - 1, 1);
			}

			return toShow = {
				month: date.getMonth(),
				year: date.getFullYear(),
				monthName: calendarAPI.getMonthName(date.getMonth()).name
			};
		}

		// @param  {Integer}   Month 0 - 11
		// @param  {Integer}   Year
		// @return {Array}     Array of objects {date, timestamp, isToday}
		// Weeks includes dates of prev/current/next monthes
	}, {
		key: 'allDatesOfWeeks',
		get: function get() {
			var month = this.monthToShow;
			return [].concat(this._getPrevMonthDatesLeftover(), this._getAllDatesOfMonth(), this._getDatesLastWeekLeftover());
		}
	}]);

	return MonthModel;
})(CalendarModel);

module.exports = MonthModel;

},{"./CalendarAPI":1,"./CalendarModel":3}],7:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthModel = require('./MonthModel');
var MonthView = require('./MonthView');
var CalendarPresenter = require('./CalendarPresenter');

var MonthPresenter = (function (_CalendarPresenter) {
	_inherits(MonthPresenter, _CalendarPresenter);

	function MonthPresenter() {
		_classCallCheck(this, MonthPresenter);

		_CalendarPresenter.call(this, document);
		this.model = this.createMonthModel();
		this.view = this.createMonthView();
		this.init();
	}

	MonthPresenter.prototype.init = function init() {
		this.view.declareViewElements();
		this.bindEvents();
		this.renderView();
	};

	MonthPresenter.prototype.bindEvents = function bindEvents() {
		this.view.nextMonth.addEventListener('click', this.nextMonth.bind(this), false);
		this.view.prevMonth.addEventListener('click', this.prevMonth.bind(this), false);
		this.view.todayTrigger.addEventListener('click', this.currentMonth.bind(this), false);
	};

	MonthPresenter.prototype.currentMonth = function currentMonth() {
		this.model.monthToShow = this.model.currentMonth;
		this.renderView();
	};

	// Public functions

	MonthPresenter.prototype.setClassesOnElements = function setClassesOnElements(classesString, idsArray, callback) {
		for (var i = 0, x = idsArray.length; i < x; i++) {
			console.log(callback);
			this.view.setClassOnElement(classesString, idsArray[i], callback);
		}
	};

	MonthPresenter.prototype.setClassOnElement = function setClassOnElement(classStr, id, callback) {
		this.view.setClassOnElement(classStr, id, callback);
	};

	MonthPresenter.prototype.removeClassesOnElements = function removeClassesOnElements(classesString, idsArray, callback) {
		for (var i = 0, x = idsArray.length; i < x; i++) {
			this.view.removeClassesOnElement(classesString, idsArray[i], callback);
		}
	};

	MonthPresenter.prototype.nextMonth = function nextMonth() {
		this.model.monthToShow = this.model.nextMonth;
		this.renderView();
	};

	MonthPresenter.prototype.prevMonth = function prevMonth() {
		this.model.monthToShow = this.model.prevMonth;
		this.renderView();
	};

	// Public functions end

	MonthPresenter.prototype.renderView = function renderView() {
		var contentFragment = this.document.createDocumentFragment(),
		    contentFragment = this.getShortDayNamesFragment(contentFragment),
		    contentFragment = this.getDatesFragment(contentFragment);

		this.view.render(this.model.monthToShow, contentFragment);
	};

	MonthPresenter.prototype.getShortDayNamesFragment = function getShortDayNamesFragment(fragment) {
		var dayNames = this.model.getShortDayNames(),
		    child;

		for (var i = 0, x = dayNames.length; i < x; i++) {
			child = document.createElement('div');
			child.textContent = dayNames[i];
			fragment.appendChild(child);
		}

		return fragment;
	};

	MonthPresenter.prototype.getDatesFragment = function getDatesFragment(fragment) {
		var dates = this.model.allDatesOfWeeks,
		    child;

		for (var i = 0, x = dates.length; i < x; i++) {
			child = document.createElement('div');
			child.id = dates[i].timestampUTC;
			child.textContent = dates[i].date;

			if (dates[i].isToday) {
				child.setAttribute('class', 'is_today');
			}
			fragment.appendChild(child);
		}

		return fragment;
	};

	MonthPresenter.prototype.createMonthModel = function createMonthModel() {
		return new MonthModel();
	};

	MonthPresenter.prototype.createMonthView = function createMonthView() {
		return new MonthView(this.document);
	};

	return MonthPresenter;
})(CalendarPresenter);

module.exports = MonthPresenter;

},{"./CalendarPresenter":4,"./MonthModel":6,"./MonthView":8}],8:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarView = require('./CalendarView');

var MonthView = (function (_CalendarView) {
	_inherits(MonthView, _CalendarView);

	function MonthView(document) {
		_classCallCheck(this, MonthView);

		_CalendarView.call(this, document);
	}

	MonthView.prototype.render = function render(dateObj, contentFragment) {
		var month = dateObj.month;
		var year = dateObj.year;
		this.setMonthText(dateObj.monthName, year);

		if (this.calendarContent) {
			this.calendar.removeChild(this.calendarContent);
		}
		this.calendarContent = document.createElement('div');
		this.calendarContent.setAttribute('class', 'calendar_content');
		this.calendar.appendChild(this.calendarContent);

		this.calendarContent.appendChild(contentFragment);
	};

	MonthView.prototype.setMonthText = function setMonthText(monthName, year) {
		this.calendarSelectedMonth.textContent = monthName + ' ' + year;
	};

	MonthView.prototype.setClassOnElement = function setClassOnElement(classString, elementId, callback) {
		var el = this.document.getElementById(elementId);
		if (el) {
			el.className += ' ' + classString;
		} else {
			callback();
		}
	};

	MonthView.prototype.removeClassesOnElement = function removeClassesOnElement(classesString, elementId, callback) {
		var regex = new RegExp('(?:^|\\s)' + classesString + '(?!\\S)', 'gi');
		var el = this.document.getElementById(elementId);
		if (el) {
			el.className = el.className.replace(regex, '');
		} else {
			callback();
		}
	};

	return MonthView;
})(CalendarView);

module.exports = MonthView;

},{"./CalendarView":5}],9:[function(require,module,exports){
'use strict';

var CalendarFactory = require('./CalendarFactory');
var HighlighterPresenter = require('./../datesHighlighter/HighlighterPresenter');

var datesHighlighter = new HighlighterPresenter(document);

var calendarFactory = new CalendarFactory(),
    calendar = calendarFactory.createCalendar({
	type: 'month'
});

datesHighlighter.connectTo(calendar);

},{"./../datesHighlighter/HighlighterPresenter":15,"./CalendarFactory":2}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./../calendar/CalendarAPI');
var DayState = require('./HighlighterModelDayState');

var HighlighterModel = (function () {
	function HighlighterModel(State) {
		_classCallCheck(this, HighlighterModel);

		this.currentState = new DayState(this);
	}

	HighlighterModel.prototype.changeDatesRange = function changeDatesRange(direction) {
		this.currentState.changeDatesRange(direction);
	};

	_createClass(HighlighterModel, [{
		key: 'today',
		get: function get() {
			return calendarAPI.today();
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
		key: 'currentState',
		get: function get() {
			return this._currentState;
		},
		set: function set(newState) {
			this._currentState = newState;
		}
	}, {
		key: 'highlightRangeStamps',
		get: function get() {
			return {
				firstDayStamp: this.currentState.firstDayStamp,
				lastDayStamp: this.currentState.lastDayStamp
			};
		},
		set: function set(range) {}
	}, {
		key: 'rangeDescription',
		get: function get() {
			return this.currentState.rangeDescription;
		}
	}]);

	return HighlighterModel;
})();

module.exports = HighlighterModel;

},{"./../calendar/CalendarAPI":1,"./HighlighterModelDayState":11}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./../calendar/CalendarAPI');

var DayState = (function () {
	function DayState(highlightModel) {
		_classCallCheck(this, DayState);

		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this.model.today.getTime();
	}

	DayState.prototype.changeDatesRange = function changeDatesRange(direction) {
		this.firstDayStamp = this.firstDayStamp + 60 * 60 * 24 * 1000 * direction;
		this.lastDayStamp = this.firstDayStamp;
	};

	_createClass(DayState, [{
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
})();

module.exports = DayState;

},{"./../calendar/CalendarAPI":1}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./../calendar/CalendarAPI');

var DaysState = (function () {
	function DaysState(highlightModel) {
		_classCallCheck(this, DaysState);

		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this._firstDayStamp;
	}

	DaysState.prototype.changeDatesRange = function changeDatesRange(rangeTimestamps, direction) {
		var first = new Date(daysToHighlightStamps.lastStamp + 60 * 60 * 24 * 1000 * direction);

		// To make sure day starts from 00:00:00 (due to Day Light Saving Time
		// you get +/- additional hour in specific monthes in some countries)
		var firstStamp = new Date(first.getFullYear(), first.getMonth(), first.getDate(), 0, 0, 0, 0).getTime();
		var lastStamp = firstStamp;

		return {
			firstStamp: firstStamp,
			lastStamp: lastStamp
		};
	};

	_createClass(DaysState, [{
		key: 'rangeDescription',
		get: function get() {
			var date = new Date(this.firstDayStamp);
			var dayOfWeek = calendarAPI.getDayName(date.getDay()).name;
			var monthName = calendarAPI.getMonthName(date.getMonth());

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

	return DaysState;
})();

module.exports = DaysState;

},{"./../calendar/CalendarAPI":1}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./../calendar/CalendarAPI');

var MonthState = (function () {
	function MonthState(highlightModel) {
		_classCallCheck(this, MonthState);

		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this._firstDayStamp;
	}

	MonthState.prototype.changeDatesRange = function changeDatesRange(rangeTimestamps, direction) {
		var first = new Date(daysToHighlightStamps.lastStamp + 60 * 60 * 24 * 1000 * direction);

		// To make sure day starts from 00:00:00 (due to Day Light Saving Time
		// you get +/- additional hour in specific monthes in some countries)
		var firstStamp = new Date(first.getFullYear(), first.getMonth(), first.getDate(), 0, 0, 0, 0).getTime();
		var lastStamp = firstStamp;

		return {
			firstStamp: firstStamp,
			lastStamp: lastStamp
		};
	};

	_createClass(MonthState, [{
		key: 'rangeDescription',
		get: function get() {
			var date = new Date(this.firstDayStamp);
			var dayOfWeek = calendarAPI.getDayName(date.getDay()).name;
			var monthName = calendarAPI.getMonthName(date.getMonth());

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

	return MonthState;
})();

module.exports = MonthState;

},{"./../calendar/CalendarAPI":1}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calendarAPI = require('./../calendar/CalendarAPI');

var WeekState = (function () {
	function WeekState(highlightModel) {
		_classCallCheck(this, WeekState);

		this.model = highlightModel;
		this._setFirstAndLastDay(this.model.today.getTime());
	}

	WeekState.prototype.changeDatesRange = function changeDatesRange(direction) {
		var step = 60 * 60 * 24 * 7 * 1000;
		this.firstDay = new Date(this.firstDayStamp + step * direction);
		this.lastDay = new Date(this.lastDayStamp + step * direction);
	};

	WeekState.prototype._setFirstAndLastDay = function _setFirstAndLastDay(timeStamp) {
		var dayOfWeek = new Date(timeStamp).getDay();
		this.firstDay = new Date(timeStamp - 60 * 60 * 24 * dayOfWeek * 1000);
		this.lastDay = new Date(this.firstDay.getTime() + 60 * 60 * 24 * 6 * 1000);
	};

	_createClass(WeekState, [{
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
})();

module.exports = WeekState;

},{"./../calendar/CalendarAPI":1}],15:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HighlighterModel = require('./HighlighterModel');
var HighlighterView = require('./HighlighterView');
var DayState = require('./HighlighterModelDayState');
var WeekState = require('./HighlighterModelWeekState');
var MonthState = require('./HighlighterModelMonthState');
var DaysState = require('./HighlighterModelDaysState');

var HighlighterPresenter = (function () {
	function HighlighterPresenter(document) {
		_classCallCheck(this, HighlighterPresenter);

		this.document = document;
		this.model = new HighlighterModel(DayState);
		this.view = new HighlighterView(this.document);
		// this.init();
	}

	HighlighterPresenter.prototype.connectTo = function connectTo(calendar) {
		this.calendar = calendar;
		this.init();
	};

	HighlighterPresenter.prototype.init = function init() {
		this.view.declareViewElements();
		this.bindEvents();
		this.highlight();
		this.renderView(this.view.dayViewTrigger);
	};

	HighlighterPresenter.prototype.removeHighlight = function removeHighlight() {
		this.calendar.removeClassesOnElements('is_highlighted_first', [this.model.firstDayStamp, this.model.lastDayStamp], function () {
			// this.calendar.nextMonth();
			console.log('nothing to remove');
		});
		this.calendar.removeClassesOnElements('is_highlighted_last', [this.model.firstDayStamp, this.model.lastDayStamp], function () {
			// this.calendar.nextMonth();
			console.log('nothing to remove');
		});
	};

	// TODO: Check what's up with recursion

	HighlighterPresenter.prototype.highlight = function highlight(direction) {
		// if (direction === 0) {
		// 	this.calendar.currentMonth();
		// 	this.highlight();
		// 	console.log(new Date(this.model.firstDayStamp));
		// }

		this.calendar.setClassOnElement('is_highlighted_first', this.model.firstDayStamp, (function noElementFound() {
			if (direction === 1) {
				this.calendar.nextMonth();
				this.highlight(1);
			}
		}).bind(this));
		this.calendar.setClassOnElement('is_highlighted_last', this.model.lastDayStamp, (function noElementFound() {
			if (direction === -1) {
				this.calendar.prevMonth();
				this.highlight(-1);
			}
		}).bind(this));
	};

	HighlighterPresenter.prototype.renderView = function renderView(target) {
		this.view.render(target, this.model.rangeDescription);
	};

	HighlighterPresenter.prototype.bindEvents = function bindEvents() {
		this.view.dayViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, DayState), false);
		this.view.weekViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, WeekState), false);
		this.view.monthViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, MonthState), false);
		this.view.prevDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, -1), false);
		this.view.nextDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, 1), false);

		for (var i = 0; i < this.view.lastDaysViewTriggers.length; i++) {
			this.view.lastDaysViewTriggers[i].addEventListener('click', this.onViewTriggerClick.bind(this, DaysState), false);
		}
	};

	HighlighterPresenter.prototype.onDatesRangeClick = function onDatesRangeClick(direction) {
		this.removeHighlight();
		this.model.changeDatesRange(direction);
		this.view.setRangeDescription(this.model.rangeDescription);
		this.highlight(direction);
	};

	HighlighterPresenter.prototype.onViewTriggerClick = function onViewTriggerClick(newState, e) {
		var target = e.target || e.currentTarget,
		    daysCount = target.getAttribute('data-days-count'),
		    state = daysCount ? new newState(this.model, daysCount) : new newState(this.model);

		if (this.model.currentState == state) {
			return;
		}
		this.removeHighlight();
		this.model.currentState = state;
		this.renderView(target);
		this.highlight(0);
	};

	return HighlighterPresenter;
})();

module.exports = HighlighterPresenter;

},{"./HighlighterModel":10,"./HighlighterModelDayState":11,"./HighlighterModelDaysState":12,"./HighlighterModelMonthState":13,"./HighlighterModelWeekState":14,"./HighlighterView":16}],16:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HighlighterView = (function () {
	function HighlighterView(document) {
		_classCallCheck(this, HighlighterView);

		this.document = document;
	}

	HighlighterView.prototype.declareViewElements = function declareViewElements() {
		this.dayViewTrigger = document.getElementById('dayView');
		this.weekViewTrigger = document.getElementById('weekView');
		this.monthViewTrigger = document.getElementById('monthView');
		this.lastDaysViewTriggers = document.getElementsByClassName('js_lastDaysView');
		this.prevDatesRangeTrigger = document.getElementById('prev_dates_range');
		this.nextDatesRangeTrigger = document.getElementById('next_dates_range');
		this.rangeDescription = document.getElementById('calendar_view_descr');
		this.currentStateNameElem = document.getElementById('calendar_view_type');
	};

	HighlighterView.prototype.render = function render(target, rangeStr) {
		this.setRangeTitle(target);
		this.setRangeDescription(rangeStr);
	};

	HighlighterView.prototype.setRangeTitle = function setRangeTitle(target) {
		this.currentStateNameElem.textContent = target.textContent;
		this.deactivateOtherStateNames(target);
		this.addClass(target, 'is_selected');
	};

	HighlighterView.prototype.setRangeDescription = function setRangeDescription(rangeStr) {
		this.rangeDescription.textContent = rangeStr;
	};

	HighlighterView.prototype.deactivateOtherStateNames = function deactivateOtherStateNames(target) {
		var siblings = target.parentNode.children;
		for (var i = 0; i < siblings.length; i++) {
			this.removeClass(siblings[i], 'is_selected');
		}
	};

	HighlighterView.prototype.addClass = function addClass(el, className) {
		var cn = el.className;

		if (cn.indexOf(className) != -1) {
			return;
		}

		if (cn != '') {
			className = ' ' + className;
		}
		el.className = cn + className;
	};

	HighlighterView.prototype.removeClass = function removeClass(el, className) {
		var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
		el.className = el.className.replace(regex, '');
	};

	return HighlighterView;
})();

module.exports = HighlighterView;

},{}]},{},[9]);
