'use strict';
describe('Calendar Model', function () {
	'use strict';
	var calendarAPI = require('../../js/calendar/CalendarAPI');
	var CalendarModel = require('../../js/calendar/CalendarModel');
	var MonthModel = require('../../js/calendar/MonthModel');
	var calendarModel = new CalendarModel();

	it('shoud return today Date object (in UTC) and have monthName property', function () {
		var date = new Date();
		date.setHours(0);
		date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		expect(calendarModel.today).toEqual(date);
		expect(calendarModel.today.monthName).toEqual(jasmine.any(String));
	});

	it('should return quantity of days in month, "out of bounds" numbers allowed', function () {
		expect(calendarModel.totalDaysInMonth(0, 2015)).toEqual(31);
		expect(calendarModel.totalDaysInMonth(-4, 2015)).toEqual(30);
		expect(calendarModel.totalDaysInMonth(-20, 2015)).toEqual(31);
		expect(calendarModel.totalDaysInMonth(-20, -2)).toEqual(31);
		expect(calendarModel.totalDaysInMonth(30, 3000)).toEqual(31);
	});

	it('return short names of week days in Array', function () {
		expect(calendarModel.getShortDayNames()).toEqual(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
	});

	// Maybe needs to sit in MonthModel.spec? What about string/num check?
	it('notify observers when model changes', function () {
		var monthModel = new MonthModel(),
			callback1 = jasmine.createSpy('callback1');
		spyOn(monthModel, 'notifyObservers').and.callThrough();

		monthModel.addObserver(callback1);
		monthModel.monthToShow = {
			month: 0,
			year: 2014
		}
		expect(monthModel.notifyObservers).toHaveBeenCalledTimes(1);
		expect(monthModel.notifyObservers).toHaveBeenCalledWith({
			isCurrentMonth: false
		});
		expect(callback1).toHaveBeenCalledTimes(1);
	});

});
