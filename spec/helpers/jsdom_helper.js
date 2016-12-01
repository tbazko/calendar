var jsdom = require("jsdom");

window = jsdom.jsdom('<html><head></head><body><div class="mvp_calendar" id="mvp_calendar"><div id="mvp_calendar_month_select" class="mvp_calendar_month_select"><span id="prev_month" class="left_arrow">&lt;</span><span id="calendar_selected_month" class="mvp_calendar_month"></span><span id="next_month" class="right_arrow">&gt;</span></div><button id="calendar_button_today">Today</button></div></body></html>').defaultView;
if (Object.keys(window).length === 0) {
	// this hapens if contextify, one of jsdom's dependencies doesn't install correctly
	// (it installs different code depending on the OS, so it cannot get checked in.);
	throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it";
}

global.window = window;
global.document = window.document;
