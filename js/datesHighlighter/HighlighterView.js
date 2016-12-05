'use strict';
class HighlighterView {
	constructor(document) {
		this.document = document;
	}

	declareViewElements() {
		this.dayViewTrigger = document.getElementById('dayView');
		this.weekViewTrigger = document.getElementById('weekView');
		this.monthViewTrigger = document.getElementById('monthView');
		this.lastDaysViewTriggers = document.getElementsByClassName('js-lastDaysView');
		this.prevDatesRangeTrigger = document.getElementById('prev-dates-range');
		this.nextDatesRangeTrigger = document.getElementById('next-dates-range');
		this.rangeDescription = document.getElementById('js-rangeDescription');
		this.currentStateNameElem = document.getElementById('calendar-view-type');
	}

	render(target, rangeStr) {
		this.setRangeTitle(target);
		this.setRangeDescription(rangeStr);
	}

	setRangeTitle(target) {
		this.currentStateNameElem.textContent = target.textContent;
		this.deactivateOtherStateNames(target);
		this.addClass(target, 'is_selected');
	}

	setRangeDescription(rangeStr) {
		this.rangeDescription.textContent = rangeStr;
	}

	deactivateOtherStateNames(target) {
		var siblings = target.parentNode.children;
		for (var i = 0; i < siblings.length; i++) {
			this.removeClass(siblings[i], 'is_selected');
		}
	}

	addClass(el, className) {
		var cn = el.className;

		if (cn.indexOf(className) != -1) {
			return;
		}

		if (cn != '') {
			className = ' ' + className;
		}
		el.className = cn + className;
	}

	removeClass(el, className) {
		var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
		el.className = el.className.replace(regex, '');
	}

}

module.exports = HighlighterView;
