const router = require('express').Router();
const {getSchedule, addScheduleYear, updateScheduleDay, updateScheduleHours} = require('../../controllers/scheduleControllers');

router.route('/:year/:month/:day/:itemCategory').get(getSchedule);

router.route('/').post(addScheduleYear);

router.route('/update-schedule-day').put(updateScheduleDay);

//Takes around 130 seconds to process this request
router.route('/update-schedule-hours').put(updateScheduleHours);

module.exports = router;
