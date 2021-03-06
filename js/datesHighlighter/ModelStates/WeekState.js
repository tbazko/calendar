'use strict';
const calendarAPI = require('./../../calendar/CalendarAPI');

class WeekState {
	constructor(highlightModel) {
		this.model = highlightModel;
		this._setFirstAndLastDay(this.model.today.getTime());
	}

	get rangeDescription() {
		var first = this.firstDay;
		var last = this.lastDay;

		return calendarAPI.getMonthName(first.getMonth()).shortName + ' ' +
			first.getDate() + ' - ' +
			calendarAPI.getMonthName(last.getMonth()).shortName + ' ' +
			last.getDate() + ', ' +
			last.getFullYear();
	}

	set firstDay(day) {
		this._firstDay = day;
	}

	set lastDay(day) {
		this._lastDay = day;
	}

	get firstDayStamp() {
		return this.firstDay.getTime();
	}

	get lastDayStamp() {
		return this.lastDay.getTime();
	}

	get firstDay() {
		return this._firstDay;
	}

	get lastDay() {
		return this._lastDay;
	}

	_changeDatesRange() {
		var step = 60 * 60 * 24 * 7 * 1000,
			direction = this.model.direction;
		this.firstDay = new Date(this.firstDayStamp + step * direction);
		this.lastDay = new Date(this.lastDayStamp + step * direction);
	}

	resetDatesToDefault() {
		this._setFirstAndLastDay(this.model.today.getTime());
	}

	_setFirstAndLastDay(timeStamp) {
		var dayOfWeek = new Date(timeStamp).getDay();
		this.firstDay = new Date(timeStamp - 60 * 60 * 24 * dayOfWeek * 1000);
		this.lastDay = new Date(this.firstDay.getTime() + 60 * 60 * 24 * 6 * 1000);
	}
}
module.exports = WeekState;
