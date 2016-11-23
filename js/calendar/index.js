const CalendarFactory = require('./CalendarFactory');
const HighlighterPresenter = require('./../datesHighlighter/HighlighterPresenter');

let datesHighlighter = new HighlighterPresenter(document);

let calendarFactory = new CalendarFactory(),
	calendar = calendarFactory.createCalendar({
		type: 'month'
	});

datesHighlighter.connectTo(calendar);
