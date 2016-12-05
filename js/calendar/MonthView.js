'use strict';
var CalendarView = require('./CalendarView');

class MonthView extends CalendarView {
	constructor(document) {
		super(document);
	}

	appendContent(contentFragment) {
		if (this.calendarContent) {
			this.calendar.removeChild(this.calendarContent);
		}

		this.calendarContent = this.document.createElement('div');
		this.calendarContent.setAttribute('class', 'calendar-content');
		this.calendar.appendChild(this.calendarContent);
		this.calendarContent.appendChild(contentFragment);
	}

	/*
	 * @param {Object} dateObj 					Properties: {month, year, monthName}
	 * @param {Object} contentFragment  Document Fragment
	 */
	render(dateObj, contentFragment) {
		var month = dateObj.month;
		var year = dateObj.year;
		this.setMonthText(dateObj.monthName, year);
		this.appendContent(contentFragment);
	}

	setMonthText(monthName, year) {
		this.calendarSelectedMonth.textContent = monthName + ' ' + year;
	}

	setClassOnElement(classString, elementId, callback) {
		var el = this.document.getElementById(elementId);
		if (el && el.className != '') {
			el.className += ' ' + classString;
		} else if (el) {
			el.className = classString;
		} else {
			callback();
		}
	}

	removeClassFromElement(classString, elementId) {
		var regex = new RegExp('(?:^|\\s)' + classString + '(?!\\S)', 'gi');
		var el = this.document.getElementById(elementId);
		if (el) {
			el.className = el.className.replace(regex, '');
		}
	}
}

module.exports = MonthView;
