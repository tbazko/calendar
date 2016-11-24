const CalendarModel = require('./CalendarModel');
const calendarAPI = require('./CalendarAPI');

class MonthModel extends CalendarModel {
	constructor() {
		super();
		this._currentMonth = {
			month: this.today.getMonth(),
			year: this.today.getFullYear(),
			monthName: this.today.monthName
		}
		this._monthToShow = {
			month: this._currentMonth.month,
			year: this._currentMonth.year,
			monthName: this._currentMonth.monthName
		}
	}

	get monthToShow() {
		return this._monthToShow;
	}

	set monthToShow(monthToShow) {
		this._monthToShow = {
			month: monthToShow.month,
			year: monthToShow.year,
			monthName: monthToShow.monthName
		};
	}

	get currentMonth() {
		return this._currentMonth;
	}

	get nextMonth() {
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
		}
	}

	get prevMonth() {
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
		}
	}

	// @param  {Integer}   Month 0 - 11
	// @param  {Integer}   Year
	// @return {Array}     Array of objects {date, timestamp, isToday}
	// Weeks includes dates of prev/current/next monthes
	get allDatesOfWeeks() {
		var month = this.monthToShow;
		return [].concat(this._getPrevMonthDatesLeftover(), this._getAllDatesOfMonth(), this._getDatesLastWeekLeftover());
	}

	_getPrevMonthDatesLeftover() {
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

	_getAllDatesOfMonth() {
		var monthToShow = this.monthToShow,
			end = this.totalDaysInMonth(monthToShow.month, monthToShow.year);

		return this._generateDates(1, end, monthToShow.month, monthToShow.year);
	}

	_getDatesLastWeekLeftover() {
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

	_generateDates(start, end, month, year) {
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

}

module.exports = MonthModel;
