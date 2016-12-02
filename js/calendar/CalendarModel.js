'use strict';
const calendarAPI = require('./CalendarAPI');

class CalendarModel {
	constructor() {
		this._observerList = [];
	}

	get today() {
		return calendarAPI.todayUTC();
	}

	totalDaysInMonth(month, year) {
		return calendarAPI.getDaysInMonth(month, year);
	}

	getShortDayNames() {
		return calendarAPI.shortDayNames();
	}

	addObserver(callback) {
		if (typeof callback === 'function') {
			this._observerList.push(callback);
		}
	}

	notifyObservers(data) {
		this._observerList.forEach(callback => {
			callback(data);
		});
	}
}

module.exports = CalendarModel;
