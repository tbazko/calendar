'use strict';
describe('Month View', function () {

	var MonthView = require('../../js/calendar/MonthView'),
		mv = new MonthView(document),
		dateObj,
		docFragment;
	mv.declareViewElements();

	beforeEach(function () {
		dateObj = {
			month: 0,
			year: 2015,
			monthName: 'January'
		};
		docFragment = document.createDocumentFragment('<div>1</div><div>2</div>');
		spyOn(mv, 'appendContent').and.callThrough();
		spyOn(mv, 'setMonthText').and.callThrough();
		mv.render(dateObj, docFragment);
	});

	it('when rendering, content should be appended', function () {
		expect(mv.appendContent).toHaveBeenCalledTimes(1);
		expect(mv.appendContent).toHaveBeenCalledWith(docFragment);
	});

	it('when rendering, month info text should be set', function () {
		expect(mv.setMonthText).toHaveBeenCalledTimes(1);
		expect(mv.setMonthText).toHaveBeenCalledWith('January', 2015);
	});

	it('when element doesn\'t have class, should set class', function () {
		var testEl = document.getElementById('test');
		mv.setClassOnElement('testClass', 'test', 'callback here');
		expect(testEl.className).toEqual('testClass');
	});

	it('when element already has class, should set additional class', function () {
		mv.setClassOnElement('testClass', 'mvp-calendar', 'callback here');
		expect(mv.calendar.className).toEqual('calendar testClass');
	});

	it('when element doesn\'t exist, callback should be called', function () {
		var callback = jasmine.createSpy('callback');
		mv.setClassOnElement('testClass', 'elDoesNotExist', callback);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('remove one class from element, if element only has this class', function () {
		var testEl = document.getElementById('test');
		mv.removeClassFromElement('testClass', 'test');
		expect(testEl.className).toEqual('');
	});

	it('when element has other classes, should remove only specified class', function () {
		mv.removeClassFromElement('testClass', 'mvp-calendar');
		expect(mv.calendar.className).toEqual('calendar');
	});
});
