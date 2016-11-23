// Calendar API

class CalendarAPI {
	static dayNames() {
		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	}

	static shortDayNames() {
		return ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
	}

	static monthNames() {
		return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December'
		];
	}

	static shortMonthNames() {
		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
			'Dec'
		];
	}

	static getDayName(day) {
		var names = this.dayNames();
		var shortNames = this.shortDayNames();
		return {
			name: names[day],
			shortName: shortNames[day]
		};
	}

	static getMonthName(month) {
		var names = this.monthNames();
		var shortNames = this.shortMonthNames();
		return {
			name: names[month],
			shortName: shortNames[month]
		}
	}

	static today() {
		var date = new Date(),
			month = date.getMonth(),
			today = new Date(date.getFullYear(), month, date.getDate(), 0, 0, 0, 0);
		today.monthName = this.getMonthName(month).name;
		return today;
	}

	static getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}
}

module.exports = CalendarAPI;
