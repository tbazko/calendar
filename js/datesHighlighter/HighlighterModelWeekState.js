const calendarAPI = require('./../calendar/CalendarAPI');

class WeekState {
	constructor(highlightModel) {
		this.model = highlightModel;
		var currentWeek = this._getWeekOfStamp(this.model.today.getTime());
		this.firstDay = currentWeek.firstDay;
		this.lastDay = currentWeek.lastDay;
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
		var step = 60 * 60 * 24 * 7 * 1000;
		this.firstDay = new Date(this.firstDayStamp + step * direction);
		this.firstDay.setHours(0);
		this.lastDay = new Date(this.lastDayStamp + step * direction);
		this.lastDay.setHours(0);
		console.log(this.firstDay);
		console.log(this.lastDay);
	}

	_getWeekOfStamp(timeStamp) {
		var dayOfWeek = new Date(timeStamp).getDay();
		var firstDay = new Date(timeStamp - 60 * 60 * 24 * dayOfWeek * 1000);
		var lastDay = new Date(firstDay.getTime() + 60 * 60 * 24 * 6 * 1000);
		console.log(firstDay);
		console.log(lastDay);

		return {
			firstDay: firstDay,
			lastDay: lastDay
		}
	}

}

module.exports = WeekState;
