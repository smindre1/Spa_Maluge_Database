const router = require('express').Router();
const calendarRoutes = require('./calendarRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const userRoutes = require('./userRoutes');
const reservationRoutes = require('./reservationRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.use('/calendar', calendarRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/users', userRoutes);
router.use('/reservations', reservationRoutes);
router.use('/inventory', inventoryRoutes);


module.exports = router;