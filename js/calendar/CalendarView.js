class CalendarView {
	constructor(document) {
		this.document = document;
	}

	declareViewElements() {
		this.calendar = document.getElementById('mvp_calendar');
		this.nextMonth = document.getElementById('next_month');
		this.prevMonth = document.getElementById('prev_month');
		this.calendarSelectedMonth = document.getElementById('calendar_selected_month');
		this.todayTrigger = document.getElementById('calendar_button_today');
	}
}

module.exports = CalendarView;
