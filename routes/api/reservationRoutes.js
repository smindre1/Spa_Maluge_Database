const router = require('express').Router();
const {reservations, addReservation, reservation, updateReservation, cancelReservation} = require('../../controllers/reservationControllers');

router.route('/').get(reservations).post(addReservation);

router.route('/:reservationId').get(reservation).put(updateReservation).delete(cancelReservation);




module.exports = router;
