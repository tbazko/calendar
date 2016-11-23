const calendarAPI = require('./../calendar/CalendarAPI');

class DayState {
	constructor(highlightModel) {
		this.model = highlightModel;
		this._firstDayStamp = this.model.today.getTime();
		this._lastDayStamp = this.model.today.getTime();
	}

	get rangeDescription() {
		var date = new Date(this.firstDayStamp);
		var dayOfWeek = calendarAPI.getDayName(date.getDay()).name;
		var monthName = calendarAPI.getMonthName(date.getMonth()).name;

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

	changeDatesRange(direction) {

		var first = new Date(this.firstDayStamp + 60 * 60 * 24 * 1000 * direction);

		// To make sure day starts from 00:00:00 (due to Day Light Saving Time
		// you get +/- additional hour in specific monthes in some countries)
		this.firstDayStamp = new Date(first.getFullYear(), first.getMonth(), first.getDate(), 0, 0, 0, 0).getTime();
		this.lastDayStamp = this.firstDayStamp;
	}

}

module.exports = DayState;
