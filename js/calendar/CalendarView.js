'use strict';
class CalendarView {
	constructor(document) {
		this.document = document;
	}

	declareViewElements() {
		this.calendar = document.getElementById('mvp-calendar');
		this.nextMonth = document.getElementById('next-month');
		this.prevMonth = document.getElementById('prev-month');
		this.calendarSelectedMonth = document.getElementById('calendar-selected-month');
		this.todayTrigger = document.getElementById('calendar-button-today');
	}
}

module.exports = CalendarView;
