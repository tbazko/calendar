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

	static todayUTC() {
		var date = new Date(),
			month = date.getMonth();
		date.setHours(0);
		var todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		todayUTC.monthName = this.getMonthName(month).name;
		return todayUTC;
	}

	static getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}
}

module.exports = CalendarAPI;
