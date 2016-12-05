'use strict';
describe('Calendar Presenter', function () {
	var MonthPresenter = require('../../js/calendar/MonthPresenter');
	var mp = new MonthPresenter(document);

	it('when initialised, model created', function () {
		expect(mp.model).not.toBeNull();
		expect(mp.model).not.toBeUndefined();
	});

	it('when initialised, view created', function () {
		expect(mp.view).not.toBeNull();
		expect(mp.view).not.toBeUndefined();
	});
});
