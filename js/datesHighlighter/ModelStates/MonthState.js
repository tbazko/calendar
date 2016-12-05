const calendarAPI = require('./../../calendar/CalendarAPI');

class MonthState {
	constructor(highlightModel) {
		this.model = highlightModel;
		this._setFirstAndLastDay(this.model.today);
	}

	get rangeDescription() {
		var date = this.firstDay;
		var monthName = calendarAPI.getMonthName(date.getMonth()).name;

		return monthName + ', ' + date.getFullYear();
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
		var y = this.firstDay.getFullYear(),
			m = this.firstDay.getMonth(),
			direction = this.model.direction,
			date = new Date(y, m + direction, 1);

		this._setFirstAndLastDay(date);
	}

	resetDatesToDefault() {
		this._setFirstAndLastDay(this.model.today);
	}

	_setFirstAndLastDay(date) {
		var y = date.getFullYear(),
			m = date.getMonth();

		this.firstDay = new Date(Date.UTC(y, m, 1));
		this.lastDay = new Date(Date.UTC(y, m, calendarAPI.getDaysInMonth(m, y)));
	}

}

module.exports = MonthState;
