'use strict';
const MonthModel = require('./MonthModel');
const MonthView = require('./MonthView');
const CalendarPresenter = require('./CalendarPresenter');

class MonthPresenter extends CalendarPresenter {
	constructor(document) {
		super(document);
		this.model = this._createMonthModel();
		this.view = this._createMonthView(this.document);
		this.init();
	}

	// Public functions
	init() {
		this.view.declareViewElements();
		this._bindEvents();
		this._renderView();
	}

	currentMonth() {
		this.model.monthToShow = this.model.currentMonth;
	}

	setClassesOnElements(classesString, idsArray, callback) {
		for (var i = 0, x = idsArray.length; i < x; i++) {
			this.view.setClassOnElement(classesString, idsArray[i], callback);
		}
	}

	setClassOnElement(classStr, id, callback) {
		this.view.setClassOnElement(classStr, id, callback);
	}

	removeClassesOnElements(classesString, idsArray) {
		for (var i = 0, x = idsArray.length; i < x; i++) {
			this.view.removeClassesOnElement(classesString, idsArray[i]);
		}
	}

	nextMonth() {
		this.model.monthToShow = this.model.nextMonth;
	}

	prevMonth() {
		this.model.monthToShow = this.model.prevMonth;
	}

	// Public functions end

	_bindEvents() {
		this.view.nextMonth.addEventListener('click', this.nextMonth.bind(this), false);
		this.view.prevMonth.addEventListener('click', this.prevMonth.bind(this), false);
		this.view.todayTrigger.addEventListener('click', this.currentMonth.bind(this), false);
		this.model.addObserver(this._renderView.bind(this));
	}

	_createMonthModel() {
		return new MonthModel();
	}

	_createMonthView() {
		return new MonthView(this.document);
	}

	_renderView() {
		var contentFragment = this.document.createDocumentFragment(),
			contentFragment = this._getShortDayNamesFragment(contentFragment),
			contentFragment = this._getDatesFragment(contentFragment);

		this.view.render(this.model.monthToShow, contentFragment);
	}

	_getShortDayNamesFragment(fragment) {
		var dayNames = this.model.getShortDayNames(),
			child;

		for (var i = 0, x = dayNames.length; i < x; i++) {
			child = this.document.createElement('div');
			child.textContent = dayNames[i];
			fragment.appendChild(child);
		}

		return fragment;
	}

	_getDatesFragment(fragment) {
		var dates = this.model.allDatesOfWeeks,
			child;

		for (var i = 0, x = dates.length; i < x; i++) {
			child = this.document.createElement('div');
			child.id = dates[i].timestampUTC;
			child.textContent = dates[i].date;

			if (dates[i].isToday) {
				child.setAttribute('class', 'is-today');
			}
			fragment.appendChild(child);
		}

		return fragment;
	}
}

module.exports = MonthPresenter;
