const calendarAPI = require('./CalendarAPI');

class CalendarModel {
	constructor() {}

	get today() {
		return calendarAPI.todayUTC();
	}

	totalDaysInMonth(month, year) {
		return calendarAPI.getDaysInMonth(month, year);
	}

	getShortDayNames() {
		return calendarAPI.shortDayNames();
	}

}

module.exports = CalendarModel;
