const Month = require('./MonthPresenter');

class CalendarFactory {
	constructor() {
		this.calendarClass = Month;
	}

	createCalendar(options) {
		switch (options.type) {
		case "year":
			this.calendarClass = 'Year';
			break;
		case "month":
			this.calendarClass = Month;
			break;
		}

		return new this.calendarClass(options);
	}
}

module.exports = CalendarFactory;
