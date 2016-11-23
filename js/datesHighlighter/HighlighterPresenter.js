const HighlighterModel = require('./HighlighterModel');
const HighlighterView = require('./HighlighterView');
const DayState = require('./HighlighterModelDayState');
const WeekState = require('./HighlighterModelWeekState');
const MonthState = require('./HighlighterModelMonthState');
const DaysState = require('./HighlighterModelDaysState');

class HighlighterPresenter {
	constructor(document) {
		this.document = document;
		this.model = new HighlighterModel(DayState);
		this.view = new HighlighterView(this.document);
		// this.init();
	}

	connectTo(calendar) {
		this.calendar = calendar;
		this.init();
	}

	init() {
		this.view.declareViewElements();
		this.bindEvents();
		this.highlight();
		this.renderView(this.view.dayViewTrigger);
	}

	removeHighlight() {
		this.calendar.removeClassesOnElements('is_highlighted_first', [this.model.firstDayStamp, this.model.lastDayStamp], function () {
			// this.calendar.nextMonth();
			console.log('nothing to remove');
		});
		this.calendar.removeClassesOnElements('is_highlighted_last', [this.model.firstDayStamp, this.model.lastDayStamp], function () {
			// this.calendar.nextMonth();
			console.log('nothing to remove');
		});
	}

	highlight(direction) {
		if (direction === 0) {
			this.calendar.currentMonth();
			this.highlight();
			console.log(new Date(this.model.firstDayStamp));
		}

		this.calendar.setClassOnElement('is_highlighted_first', this.model.firstDayStamp, function noElementFound() {
			if (direction === 1) {
				this.calendar.nextMonth();
				this.highlight(1);
			}
		}.bind(this));
		this.calendar.setClassOnElement('is_highlighted_last', this.model.lastDayStamp, function noElementFound() {
			if (direction === -1) {
				this.calendar.prevMonth();
				this.highlight(-1);
			}
		}.bind(this));
	}

	renderView(target) {
		this.view.render(target, this.model.rangeDescription);
	}

	bindEvents() {
		this.view.dayViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, new DayState(this.model)), false);
		this.view.weekViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, new WeekState(this.model)), false);
		this.view.monthViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, new MonthState(this.model)), false);
		this.view.prevDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, -1), false);
		this.view.nextDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, 1), false);

		for (var i = 0; i < this.view.lastDaysViewTriggers.length; i++) {
			this.view.lastDaysViewTriggers[i].addEventListener('click', function (e) {
				var target = e.target || e.currentTarget;
				var daysCount = target.getAttribute('data-days-count');
				this.onViewTriggerClick(new DaysState(this.model, daysCount), e);
			}.bind(this));
		}
	}

	onDatesRangeClick(direction) {
		this.removeHighlight();
		this.model.changeDatesRange(direction);
		this.view.setRangeDescription(this.model.rangeDescription);
		this.highlight(direction);
	}

	onViewTriggerClick(newState, e) {
		if (this.model.currentState == newState) {
			return;
		}
		var target = e.target || e.currentTarget;
		this.removeHighlight();
		this.model.currentState = newState;
		this.renderView(target);
		this.highlight(0);
	}
}

module.exports = HighlighterPresenter;
