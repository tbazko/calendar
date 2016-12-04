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
		this.highlightCalendar();
		this.renderView(this.view.dayViewTrigger);
	}

	removeHighlight() {
		this.calendar.removeClassesOnElements('is-highlighted-first', [this.model.firstDayStamp, this.model.lastDayStamp, this.calendar.model.allDatesOfWeeks[0].timestampUTC]);
		this.calendar.removeClassesOnElements('is-highlighted-last', [this.model.firstDayStamp, this.model.lastDayStamp]);
	}

	highlightCalendar(month) {
		if (month && month.isCurrentMonth) {
			this.model.resetDatesToDefault();
		}

		var first = this.model.firstDayStamp,
			last = this.model.lastDayStamp,
			allDatesInView = this.calendar.model.allDatesOfWeeks,
			firstInViewStamp = allDatesInView[0].timestampUTC,
			lastInViewStamp = allDatesInView[allDatesInView.length - 1].timestampUTC,
			isLastInCurrentView = this.isDateInCurrentView(last, firstInViewStamp, lastInViewStamp);

		this.calendar.setClassOnElement('is-highlighted-first', first, function noElementFound() {
			if (this.model.direction === 1) {
				this.moveToMonthOfStamp(first);
			} else if (isLastInCurrentView) {
				this.calendar.setClassOnElement('is-highlighted-first', firstInViewStamp, function () {
					return false;
				});
			}
		}.bind(this));
		this.calendar.setClassOnElement('is-highlighted-last', last, function noElementFound() {
			if (this.model.direction === -1) {
				this.moveToMonthOfStamp(last);
			}
		}.bind(this));
		this.model.direction = 0;
	}

	isDateInCurrentView(dateStamp, firstDateInViewStamp, lastDateInViewStamp) {
		return dateStamp > firstDateInViewStamp && dateStamp < lastDateInViewStamp;
	}

	moveToMonthOfStamp(date) {
		this.model.direction = 0;
		var date = new Date(date);
		this.calendar.model.monthToShow = {
			month: date.getMonth(),
			year: date.getFullYear()
		}
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

	bindCalendarEvents() {
		this.calendar.model.addObserver(this.highlightCalendar.bind(this));
	}

	onDatesRangeClick(direction) {
		this.removeHighlight();
		this.model.direction = direction;
		this.view.setRangeDescription(this.model.rangeDescription);
		this.highlightCalendar();
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
		this.moveToMonthOfStamp(this.model.today.getTime());
	}
}

module.exports = HighlighterPresenter;
