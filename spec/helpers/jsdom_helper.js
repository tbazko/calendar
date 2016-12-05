var jsdom = require('jsdom');
var calendarMock = '<html><head></head><body><div class="calendar" id="mvp-calendar">' +
	'<div class="calendar-header">' +
	'<div id="test">I am here just for testing purposes</div>' +
	'<div id="calendar-month-select" class="calendar-monthSelect">' +
	'<span id="prev-month" class="calendar-header-leftArrow icon-arrow-left"></span>' +
	'<span id="calendar-selected-month" class="calendar-month"></span>' +
	'<span id="next-month" class="calendar-header-rightArrow icon-arrow-right"></span>' +
	'</div>' +
	'<button id="calendar-button-today" class="calendar-button">Today</button>' +
	'</div>' +
	'</div></body></html>';
window = jsdom.jsdom(calendarMock).defaultView;

if (Object.keys(window).length === 0) {
	// this hapens if contextify, one of jsdom's dependencies doesn't install correctly
	// (it installs different code depending on the OS, so it cannot get checked in.);
	throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it";
}

global.window = window;
global.document = window.document;
