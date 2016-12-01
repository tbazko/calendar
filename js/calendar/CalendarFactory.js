'use strict';
const MonthPresenter = require('./MonthPresenter');

class CalendarFactory {
	constructor() {
		this.calendarClass = MonthPresenter;
	}

	createCalendar(options) {
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
}

module.exports = CalendarFactory;
