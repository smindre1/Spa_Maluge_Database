const router = require('express').Router();
const {reservations, addReservation, dailyReservations, getReservation, updateReservation, cancelReservation} = require('../../controllers/reservationControllers');

router.route('/').get(reservations).post(addReservation);

router.route('/:year/:month/:day').get(dailyReservations);


router.route('/:reservationId').get(getReservation).put(updateReservation).delete(cancelReservation);




module.exports = router;
