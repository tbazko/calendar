const calendarAPI = require('./../calendar/CalendarAPI');
const DayState = require('./HighlighterModelDayState');

class HighlighterModel {
	constructor(State) {
		this.currentState = new DayState(this);
	}

	get today() {
		return calendarAPI.today();
	}

	get firstDayStamp() {
		return this.currentState.firstDayStamp;
	}

	get lastDayStamp() {
		return this.currentState.lastDayStamp;
	}

	get currentState() {
		return this._currentState;
	}

	set currentState(newState) {
		this._currentState = newState;
	}

	get highlightRangeStamps() {
		return {
			firstDayStamp: this.currentState.firstDayStamp,
			lastDayStamp: this.currentState.lastDayStamp
		}
	}

	set highlightRangeStamps(range) {

	}

	get rangeDescription() {
		return this.currentState.rangeDescription;
	}

	changeDatesRange(direction) {
		this.currentState.changeDatesRange(direction);
	}
}

module.exports = HighlighterModel;
