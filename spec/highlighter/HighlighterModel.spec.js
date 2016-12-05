'use strict';
describe('Highlighter Model', function () {
	var HighlighterModel = require('../../js/datesHighlighter/HighlighterModel');
	var DayState = require('../../js/datesHighlighter/ModelStates/DayState');
	var WeekState = require('../../js/datesHighlighter/ModelStates/WeekState');
	var hm = new HighlighterModel(DayState);

	it('should return current state', function () {
		expect(hm.currentState).toEqual(jasmine.any(DayState));
	});

	it('should return new state', function () {
		hm.currentState = new WeekState(hm);
		expect(hm.currentState).toEqual(jasmine.any(WeekState));
	});
});
