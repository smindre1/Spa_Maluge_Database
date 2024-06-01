const { Reservation, Schedule } = require("../models");

module.exports = {
  //get all reservations
  async reservations(req, res) {
    await Reservation.find().populate("services")
    .then((reservations) => res.json(reservations))
    .catch((err) => res.status(500).json(err));
  },
  // req body should include:
  // { name: string, email: string, phone: string, day: string (eg. "January 1, 2024"), appointmentTime: [Int], services: [{type: string, client: string, price: Int (unit of dollars)}], specialRequests: string, payment: {cardOwner: "Bob", cardNumber: 1000, cardExpiration: 1000, securityCode: 123, billingAddress: "Confusion"} (prefilled because it currently does not take payment information), room: Int };
  async addReservation(req, res) {
    try {
      const {room} = req.body;
      delete req.body.room;
      
      
      const {day, appointmentTime} = req.body;
      const date = day.split(", ");
      const newDate = date[0].split(" ");

      const year = Number(date[1]);
      const month = newDate[0];
      const dayOfMonth = Number(newDate[1]);
      const schedule = await Schedule.findOne({year});

      let monthData = schedule[month];
      let dayPlans = monthData.find((dayPlan) => dayPlan.day == dayOfMonth);
    
      dayPlans.timeSlots.map((timeSlot) => {
        for(let i=0; i<appointmentTime.length; i++) {
            if(timeSlot.time == appointmentTime[i]) {
            timeSlot.availability[room-1].available = false;
          }
        }
      });
      
      //[dayOfMonth-1] because that is the difference between the day and the day's place in the month array
      monthData[dayOfMonth-1].timeSlots = dayPlans.timeSlots;

      await Schedule.findOneAndUpdate({ year }, {[month]: monthData}).then(async () => {
        const reservations = await Reservation.create(req.body);
        //Checking Response
        res.status(201).json({ message: 'Reservation added successfully', data: reservations });
      }, () => console.error('Reservation failed to be created'))
      .catch((err) => res.status(500).json(err));
      
    } catch (error) {
        console.error('Error adding reservation and updating cooresponding schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },
  async getReservation(req, res) {
    try {
      const reservation = await Reservation.findById(req.params.reservationId);

      if(!reservation) {
        console.log('Reservation Not Found!');
        return res.status(404).json({ error: 'Reservation Not Found' });
      }
      // Send the reservation as a JSON response to the client
      res.status(200).json(reservation);
    } catch (error) {
      console.error('Error getting specific reservation', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async dailyReservations(req, res) {
    //Creates an array of seven days to do a total reservation count
    const year = Number(req.params.year);
    const day = Number(req.params.day);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthData = {January: {month: 0, days: 31}, February: {month: 1, days: 28}, March: {month: 2, days: 31}, April: {month: 3, days: 30}, May: {month: 4, days: 31}, June: {month: 5, days: 30}, July: {month: 6, days: 31}, August: {month: 7, days: 31}, September: {month: 8, days: 30}, October: {month: 9, days: 31}, November: {month: 10, days: 30}, December: {month: 11, days: 31}};
    year % 4 > 0 ? null : monthData.February.days == 29;
    let week = [];
    for(let i=0; i < 7; i++) {
      if(day + i <= monthData[req.params.month].days) {
        week.push(`${req.params.month} ${day + i}, ${req.params.year}`)
      } else {
        let inputYear = monthData[req.params.month].month + 1 > 11 ? year + 1 : year;
        let index = monthData[req.params.month].month + 1 > 11 ? 0 : monthData[req.params.month].month + 1;
        let nextMonth = months[index];
        let newDay = day + i - monthData[req.params.month].days;
        week.push(`${nextMonth} ${newDay}, ${inputYear}`);
      }
    }
    
    try {
      //checks the total number of reservations for the next seven days (includes the initial day)
      const weekCount = await Reservation.countDocuments({day: { $in: week}});

      const date = `${req.params.month} ${req.params.day}, ${req.params.year}`;
      const reservation = await Reservation.find({day: date});

      if(!reservation) {
        console.log('Daily Reservations Not Found!');
        return res.status(404).json({ error: 'Daily Reservation Not Found' });
      }
      // Send the reservation as a JSON response to the client
      res.status(200).json({data: reservation, weekCount: weekCount});
    } catch (error) {
      console.error('Error getting specific daily reservations', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async updateReservation(req, res) {
    try {
      if (req.body) {
        const reservation = await Reservation.findOneAndUpdate(
          { _id: req.params.reservationId },
          {...req.body}, {new: true} );

          res.status(200).json(reservation);
      } else {
        console.error('Updated reservation not properly provided', error);
        res.status(404).json({ error: 'Updated reservation not properly provided' });
      }
    } catch (error) {
      console.error('Error updating reservation', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async cancelReservation(req, res) {
    try {
      const reservation = await Reservation.findOneAndDelete({
        _id: req.params.reservationId,
      });
      res.status(200).json({ message: "The reservation has been cancelled/deleted" });
      
    } catch (error) {
      console.error('Error deleting reservation', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};