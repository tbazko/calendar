'use strict';
describe('Calendar Model', function () {
	'use strict';
	var CalendarFactory = require('../../js/calendar/CalendarModel');
	var MonthPresenter = require('../../js/calendar/CalendarAPI');

	it('calendar factory class should exist', function () {
		expect(CalendarFactory).not.toBeUndefined();
		expect(CalendarFactory).not.toBeNull();
	});
});
