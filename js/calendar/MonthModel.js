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
		this.monthToShow = {
			month: this._currentMonth.month,
			year: this._currentMonth.year
		}
	}

	set monthToShow(monthToShow) {
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

	}

	get monthToShow() {
		return this._monthToShow;
	}

	get currentMonth() {
		return this._currentMonth;
	}

	get prevMonth() {
		return this.changeMonth(-1);
	}

	get nextMonth() {
		return this.changeMonth(1);
	}

	changeMonth(direction) {
		var monthToShow = this.monthToShow,
			date = new Date(monthToShow.year, monthToShow.month + direction, 1);

		return monthToShow = {
			month: date.getMonth(),
			year: date.getFullYear(),
			monthName: calendarAPI.getMonthName(date.getMonth()).name
		}
	}

	// @return {Array}     Array of objects {date, timestamp, isToday}
	// Weeks includes dates of prev/current/next monthes
	get allDatesOfWeeks() {
		var month = this.monthToShow;
		return [].concat(this.prevMonthDatesLeftover, this.allDatesOfMonth, this.datesLastWeekLeftover);
	}

	get prevMonthDatesLeftover() {
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

	get allDatesOfMonth() {
		var monthToShow = this.monthToShow,
			end = this.totalDaysInMonth(monthToShow.month, monthToShow.year);

		return this._generateDates(1, end, monthToShow.month, monthToShow.year);
	}

	get datesLastWeekLeftover() {
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
