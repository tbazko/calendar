'use strict';
describe('Calendar API', function () {
	var calendarAPI = require('../../js/calendar/CalendarAPI');

	it('calendar API should be defined', function () {
		expect(calendarAPI).not.toBeUndefined();
		expect(calendarAPI).not.toBeNull();
	});

	it('should return names of week days in Array', function () {
		expect(calendarAPI.dayNames()).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
	});

	it('should return short names of week days in Array', function () {
		expect(calendarAPI.shortDayNames()).toEqual(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
	});

	it('should return month names in Array', function () {
		expect(calendarAPI.monthNames()).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December'
		]);
	});

	it('should return short month names in Array', function () {
		expect(calendarAPI.shortMonthNames()).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
			'Dec'
		]);
	});

	it('should return object with day name and short day name', function () {
		var day = 1;
		expect(calendarAPI.getDayName(day)).toEqual({
			name: 'Monday',
			shortName: 'MO'
		});
	});

	it('in case day out of bounds return object with undefined name and shortName', function () {
		var day = -1;
		var day2 = 16;
		expect(calendarAPI.getDayName(day).name).toBeUndefined();
		expect(calendarAPI.getDayName(day).shortName).toBeUndefined();
		expect(calendarAPI.getDayName(day2).name).toBeUndefined();
		expect(calendarAPI.getDayName(day2).shortName).toBeUndefined();
	});

	it('should return object with month name and short month name', function () {
		var month = 1;
		expect(calendarAPI.getMonthName(month)).toEqual({
			name: 'February',
			shortName: 'Feb'
		});
	});

	it('should return object with month name and short month name', function () {
		var month = 1;
		expect(calendarAPI.getMonthName(month)).toEqual({
			name: 'February',
			shortName: 'Feb'
		});
	});

	it('shoud return today Date object (in UTC) and have monthName property', function () {
		var date = new Date();
		date.setHours(0);
		date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		expect(calendarAPI.todayUTC()).toEqual(date);
		expect(calendarAPI.todayUTC().monthName).toEqual(jasmine.any(String));
	});

	it('should return quantity of days in month, "out of bounds" numbers allowed', function () {
		expect(calendarAPI.getDaysInMonth(0, 2015)).toEqual(31);
		expect(calendarAPI.getDaysInMonth(-4, 2015)).toEqual(30);
		expect(calendarAPI.getDaysInMonth(-20, 2015)).toEqual(31);
		expect(calendarAPI.getDaysInMonth(-20, -2)).toEqual(31);
		expect(calendarAPI.getDaysInMonth(30, 3000)).toEqual(31);
	});
});
