var CalendarView = require('./CalendarView');

class MonthView extends CalendarView {
	constructor(document) {
		super(document);
	}

	render(dateObj, contentFragment) {
		var month = dateObj.month;
		var year = dateObj.year;
		this.setMonthText(dateObj.monthName, year);

		if (this.calendarContent) {
			this.calendar.removeChild(this.calendarContent);
		}
		this.calendarContent = document.createElement('div');
		this.calendarContent.setAttribute('class', 'calendar_content');
		this.calendar.appendChild(this.calendarContent);

		this.calendarContent.appendChild(contentFragment);
	}

	setMonthText(monthName, year) {
		this.calendarSelectedMonth.textContent = monthName + ' ' + year;
	}

	setClassOnElement(classString, elementId, callback) {
		var el = this.document.getElementById(elementId);
		if (el) {
			el.className += ' ' + classString;
		} else {
			callback();
		}
	}

	removeClassesOnElement(classesString, elementId) {
		var regex = new RegExp('(?:^|\\s)' + classesString + '(?!\\S)', 'gi');
		var el = this.document.getElementById(elementId);
		if (el) {
			el.className = el.className.replace(regex, '');
		}
	}
}

module.exports = MonthView;
