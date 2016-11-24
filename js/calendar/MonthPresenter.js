const polyfill = require('./customEventsPolyfill');
const MonthModel = require('./MonthModel');
const MonthView = require('./MonthView');
const CalendarPresenter = require('./CalendarPresenter');

class MonthPresenter extends CalendarPresenter {
	constructor() {
		super(document);
		this.model = this.createMonthModel();
		this.view = this.createMonthView();
		this.init();
	}

	init() {
		this.view.declareViewElements();
		this.bindEvents();
		this.renderView();
	}

	bindEvents() {
		this.view.nextMonth.addEventListener('click', this.nextMonth.bind(this), false);
		this.view.prevMonth.addEventListener('click', this.prevMonth.bind(this), false);
		this.view.todayTrigger.addEventListener('click', this.currentMonth.bind(this), false);
	}

	currentMonth() {
		this.model.monthToShow = this.model.currentMonth;
		this.renderView();
		var event = new CustomEvent("currentMonthRendered", {
			bubbles: true
		});
		this.view.calendar.dispatchEvent(event);
	}

	// Public functions
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
		this.renderView();
	}

	prevMonth() {
			this.model.monthToShow = this.model.prevMonth;
			this.renderView();
		}
		// Public functions end

	renderView() {
		var contentFragment = this.document.createDocumentFragment(),
			contentFragment = this.getShortDayNamesFragment(contentFragment),
			contentFragment = this.getDatesFragment(contentFragment);

		this.view.render(this.model.monthToShow, contentFragment);
		var event = new CustomEvent("newViewRendered", {
			bubbles: true
		});
		this.view.calendar.dispatchEvent(event);
	}

	getShortDayNamesFragment(fragment) {
		var dayNames = this.model.getShortDayNames(),
			child;

		for (var i = 0, x = dayNames.length; i < x; i++) {
			child = document.createElement('div');
			child.textContent = dayNames[i];
			fragment.appendChild(child);
		}

		return fragment;
	}

	getDatesFragment(fragment) {
		var dates = this.model.allDatesOfWeeks,
			child;

		for (var i = 0, x = dates.length; i < x; i++) {
			child = document.createElement('div');
			child.id = dates[i].timestampUTC;
			child.textContent = dates[i].date;

			if (dates[i].isToday) {
				child.setAttribute('class', 'is_today');
			}
			fragment.appendChild(child);
		}

		return fragment;
	}


	createMonthModel() {
		return new MonthModel();
	}

	createMonthView() {
		return new MonthView(this.document);
	}
}

module.exports = MonthPresenter;
