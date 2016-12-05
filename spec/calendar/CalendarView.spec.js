'use strict';
describe('Calendar View', function () {

	var CalendarView = require('../../js/calendar/CalendarView');
	var cv = new CalendarView(document);

	it('calendar DOM elements should exist', function () {
		cv.declareViewElements();
		expect(cv.calendar).not.toBeUndefined();
		expect(cv.nextMonth).not.toBeUndefined();
		expect(cv.prevMonth).not.toBeUndefined();
		expect(cv.calendarSelectedMonth).not.toBeUndefined();
		expect(cv.todayTrigger).not.toBeUndefined();
	});
});
