'use strict';
describe('Calendar Model', function () {
	'use strict';
	var calendarAPI = require('../../js/calendar/CalendarAPI');
	var MonthModel = require('../../js/calendar/MonthModel');
	var monthModel = new MonthModel();
	var monthToShow = monthModel.monthToShow;
	var today = calendarAPI.todayUTC();

	it('by default month to show should be the current one', function () {
		expect(monthToShow).toEqual(jasmine.any(Object));
		expect(monthToShow.month).toEqual(today.getMonth());
		expect(monthToShow.year).toEqual(today.getFullYear());
		expect(monthToShow.monthName).toEqual(today.monthName);
	});

	it('should return next month object', function () {
		var next = monthModel.nextMonth;
		expect(next).toEqual(jasmine.any(Object));
		if (monthToShow.month === 11) {
			expect(next.month).toEqual(0);
		} else {
			expect(next.month).toEqual(today.getMonth() + 1);
		}
	});

	it('should return prev month object', function () {
		var prev = monthModel.prevMonth;
		expect(prev).toEqual(jasmine.any(Object));
		if (monthToShow.month === 0) {
			expect(prev.month).toEqual(11);
		} else {
			expect(prev.month).toEqual(today.getMonth() - 1);
		}
	});

	it('should return Array of Objects, which are dates of weeks the month contain', function () {
		var allDates = monthModel.allDatesOfWeeks;
		expect(allDates).toEqual(jasmine.any(Array));
		expect(allDates).toEqual(jasmine.arrayContaining([{
			date: 1,
			timestampUTC: new Date(Date.UTC(monthToShow.year, monthToShow.month, 1)).getTime(),
			isToday: today.getDate === 1
		}, {
			date: 2,
			timestampUTC: new Date(Date.UTC(monthToShow.year, monthToShow.month, 2)).getTime(),
			isToday: today.getDate === 2
		}]));
		expect(allDates).not.toEqual(jasmine.arrayContaining([{
			date: 32,
			timestampUTC: new Date(Date.UTC(monthToShow.year, monthToShow.month, 32)).getTime(),
			isToday: today.getDate === 32
		}, {
			date: -1,
			timestampUTC: new Date(Date.UTC(monthToShow.year, monthToShow.month, -1)).getTime(),
			isToday: today.getDate === -1
		}]))
	});
});
