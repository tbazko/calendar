# MVP Calendar
<img src="https://github.com/tbazko/calendar/blob/master/calendar-example.png" width="300">

This is very simple implementation of calendar made with MVP design pattern in mind.
Features:
* Shows one month per view
* Highlights 'today' date
* Week starts from Sunday
* Has button to return user to current month

Idea is create a calendar module to which other module (features) can be connected.
Communication done through observer in CalendarModel and some public functions.

# MVP Calendar highlighter (optional)
Can be added to calendar to highlight different amount of days in calendar.

