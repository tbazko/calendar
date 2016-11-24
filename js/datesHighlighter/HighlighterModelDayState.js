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
		this.firstDayStamp = this.firstDayStamp + 60 * 60 * 24 * 1000 * direction;
		this.lastDayStamp = this.firstDayStamp;
	}

}

module.exports = DayState;
