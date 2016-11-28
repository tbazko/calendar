const calendarAPI = require('./../calendar/CalendarAPI');
const DayState = require('./ModelStates/DayState');

class HighlighterModel {
	constructor(State) {
		this._currentState = new DayState(this);
		this._direction = 0;
	}

	set currentState(newState) {
		this._currentState = newState;
	}

	get currentState() {
		return this._currentState;
	}

	get today() {
		return calendarAPI.todayUTC();
	}

	get firstDayStamp() {
		return this.currentState.firstDayStamp;
	}

	get lastDayStamp() {
		return this.currentState.lastDayStamp;
	}

	get highlightRangeStamps() {
		return {
			firstDayStamp: this.currentState.firstDayStamp,
			lastDayStamp: this.currentState.lastDayStamp
		}
	}

	get rangeDescription() {
		return this.currentState.rangeDescription;
	}

	get direction() {
		return this._direction;
	}

	set direction(direction) {
		this._direction = direction;
		this.currentState._changeDatesRange();
	}

	resetDatesToDefault() {
		this.currentState.resetDatesToDefault();
	}
}

module.exports = HighlighterModel;
