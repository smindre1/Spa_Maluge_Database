const router = require('express').Router();
const {schedule, addScheduleYear, updateScheduleDay, scheduleHours} = require('../../controllers/scheduleControllers');

router.route('/:year/:month/:day/:itemCategory').get(schedule);

router.route('/').post(addScheduleYear);

router.route('/update-schedule-day').put(updateScheduleDay);

router.route('/update-schedule-hours').put(scheduleHours);

module.exports = router;
