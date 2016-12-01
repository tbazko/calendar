'use strict';
describe('Calendar Factory', function () {
	'use strict';
	var CalendarFactory = require('../../js/calendar/CalendarFactory');
	var MonthPresenter = require('../../js/calendar/MonthPresenter');

	it('calendar factory class should exist', function () {
		expect(CalendarFactory).not.toBeUndefined();
		expect(CalendarFactory).not.toBeNull();
	});

	it('should create calendar, if options type is passed, otherwise throw error', function () {
		var cf = new CalendarFactory();
		var doc = {};

		spyOn(cf, 'createCalendar').and.callThrough();
		var calendar = cf.createCalendar({
			type: 'month'
		});

		expect(cf.createCalendar).toHaveBeenCalled();
		expect(cf.createCalendar).not.toBeNull();
		expect(cf.createCalendar).not.toBeUndefined();
		expect(calendar).toEqual(jasmine.any(MonthPresenter));
		expect(function () {
			cf.createCalendar();
		}).toThrowError(TypeError);
	});

});
