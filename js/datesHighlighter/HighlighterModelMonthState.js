const calendarAPI = require('./../calendar/CalendarAPI');

class MonthState {
	constructor(highlightModel) {
		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this._firstDayStamp;
	}

	get rangeDescription() {
		var date = new Date(this.firstDayStamp);
		var dayOfWeek = calendarAPI.getDayName(date.getDay()).name;
		var monthName = calendarAPI.getMonthName(date.getMonth());

		return dayOfWeek + ', ' + monthName + ' ' +
			date.getDate() + ', ' +
			date.getFullYear();
	}

	get firstDayStamp() {
		return this._firstDayStamp;
	}

	set firstDayStamp(timeStamp) {
		this._firstDayStamp = timeStamp;
	}

	get lastDayStamp() {
		return this._lastDayStamp;
	}

	set lastDayStamp(timeStamp) {
		this._lastDayStamp = timeStamp;
	}

	changeDatesRange(rangeTimestamps, direction) {
		var first = new Date(daysToHighlightStamps.lastStamp + 60 * 60 * 24 * 1000 * direction);

		// To make sure day starts from 00:00:00 (due to Day Light Saving Time
		// you get +/- additional hour in specific monthes in some countries)
		var firstStamp = new Date(first.getFullYear(), first.getMonth(), first.getDate(), 0, 0, 0, 0).getTime();
		var lastStamp = firstStamp;

		return {
			firstStamp: firstStamp,
			lastStamp: lastStamp
		}
	}

}

module.exports = MonthState;
