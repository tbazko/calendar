const calendarAPI = require('./../../calendar/CalendarAPI');

class LastDaysState {
	constructor(highlightModel, daysCount) {
		this.model = highlightModel;
		this.daysCount = daysCount;
		this._setFirstAndLastDay(this.model.today);
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

	changeDatesRange(direction) {
		var first = this.firstDay;
		var last = this.lastDay;
		// console.log(new Date(first.getFullYear(), first.getMonth(), first.getDate() + this.daysCount * direction));
		// console.log(new Date(last.getFullYear(), last.getMonth(), last.getDate() + this.daysCount * direction));
		this.firstDay = new Date(Date.UTC(first.getFullYear(), first.getMonth(), first.getDate() + this.daysCount * direction));
		this.lastDay = new Date(Date.UTC(last.getFullYear(), last.getMonth(), last.getDate() + this.daysCount * direction));

	}

	resetDatesToDefault() {
		this._setFirstAndLastDay(this.model.today);
	}

	_setFirstAndLastDay(date) {
		var y = date.getFullYear(),
			m = date.getMonth();

		this.firstDay = new Date(Date.UTC(y, m, date.getDate() - this.daysCount));
		this.lastDay = new Date(Date.UTC(y, m, date.getDate() - 1));
	}

}

module.exports = LastDaysState;
