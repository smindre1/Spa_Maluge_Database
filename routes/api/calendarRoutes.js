const router = require('express').Router();
const {getCalendar, addCalendarYear, getCalendarMonth, calendarDayOpenStatus, calendarWeekdays} = require('../../controllers/calendarControllers');

router.route('/').get(getCalendar).post(addCalendarYear);

router.route('/:year/:month').get(getCalendarMonth);

router.route('/specific-calendar-day').put(calendarDayOpenStatus);

router.route('/calendar-weekdays').put(calendarWeekdays);

module.exports = router;