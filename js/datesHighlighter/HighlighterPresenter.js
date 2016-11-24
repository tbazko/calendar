const HighlighterModel = require('./HighlighterModel');
const HighlighterView = require('./HighlighterView');
const DayState = require('./ModelStates/DayState');
const WeekState = require('./ModelStates/WeekState');
const MonthState = require('./ModelStates/MonthState');
const LastDaysState = require('./ModelStates/LastDaysState');

class HighlighterPresenter {
	constructor(document) {
		this.document = document;
		this.model = new HighlighterModel(DayState);
		this.view = new HighlighterView(this.document);
	}

	connectTo(calendar) {
		this.calendar = calendar;
		this.init();
	}

	init() {
		this.view.declareViewElements();
		this.bindEvents();
		this.bindCalendarEvents();
		this.highlight();
		this.renderView(this.view.dayViewTrigger);
	}

	removeHighlight() {
		this.calendar.removeClassesOnElements('is_highlighted_first', [this.model.firstDayStamp, this.model.lastDayStamp]);
		this.calendar.removeClassesOnElements('is_highlighted_last', [this.model.firstDayStamp, this.model.lastDayStamp]);
	}

	// TODO: Check what's up with recursion
	highlight(direction) {
		if (direction === 0) {
			this.calendar.currentMonth();
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
		this.view.dayViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, DayState), false);
		this.view.weekViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, WeekState), false);
		this.view.monthViewTrigger.addEventListener('click', this.onViewTriggerClick.bind(this, MonthState), false);
		this.view.prevDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, -1), false);
		this.view.nextDatesRangeTrigger.addEventListener('click', this.onDatesRangeClick.bind(this, 1), false);

		for (var i = 0; i < this.view.lastDaysViewTriggers.length; i++) {
			this.view.lastDaysViewTriggers[i].addEventListener('click', this.onViewTriggerClick.bind(this, LastDaysState), false);
		}
	}

	// Maybe use mediator?
	bindCalendarEvents() {
		this.document.addEventListener('newViewRendered', this.highlight.bind(this), false);
		this.document.addEventListener('currentMonthRendered', this.onCalendarCurrentMonthView.bind(this), false);
	}

	onCalendarCurrentMonthView(e) {
		this.model.resetDatesToDefault();
		this.highlight();
	}

	onDatesRangeClick(direction) {
		this.removeHighlight();
		this.model.changeDatesRange(direction);
		this.view.setRangeDescription(this.model.rangeDescription);
		this.highlight(direction);
	}

	onViewTriggerClick(newState, e) {
		var target = e.target || e.currentTarget,
			daysCount = target.getAttribute('data-days-count'),
			state = daysCount ? new newState(this.model, daysCount) : new newState(this.model);

		if (this.model.currentState == state) {
			return;
		}
		this.removeHighlight();
		this.model.currentState = state;
		this.renderView(target);
		this.highlight(0);
	}
}

module.exports = HighlighterPresenter;
