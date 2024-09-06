const { Reservation, Schedule } = require("../models");
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

module.exports = {
  //get all reservations
  async reservations(req, res) {
    await Reservation.find()
      .populate("services")
      .then((reservations) => res.json(reservations))
      .catch((err) => res.status(500).json(err));
  },
  // req body should include:
  // { name: string, email: string, phone: string, day: string (eg. "January 1, 2024"), appointmentTime: [Int], services: [{type: string, client: string, price: Int (unit of dollars)}], specialRequests: string, payment: {cardOwner: "Bob", cardNumber: 1000, cardExpiration: 1000, securityCode: 123, billingAddress: "Confusion"} (prefilled because it currently does not take payment information), room: Int };
  async addReservation(req, res) {
    // Extracts the room key from the req object
    let { room } = req.body;
    room = Number(room);
    delete req.body.room;

    const { day, appointmentTime } = req.body;
    const date = day.split(", ");
    const newDate = date[0].split(" ");

    const year = Number(date[1]);
    const month = newDate[0];
    const dayOfMonth = Number(newDate[1]);
    const updatedAvailability = { available: false };

    // Runs a check on if the reserved schedule is available or not
    const checkTimeSlots = async () => {
      const resultRecords = await Promise.all(
        appointmentTime.map(async (time) => {
          let status = await checkAvailability(time);
          return status;
        })
      );
      // console.log("Schedule Timeslots Available: ", resultRecords);
      if (resultRecords.includes(false)) {
        // If a timeslot in unavailable, return false
        return false;
      } else {
        return true;
      }
    };

    // Checks a specific timeslot's availability
    const checkAvailability = async (time) => {
      try {
        const result = await Schedule.aggregate([
          { $match: { year, [`${month}.day`]: dayOfMonth } },
          { $unwind: `$${month}` },
          { $match: { [`${month}.day`]: dayOfMonth } },
          { $unwind: `$${month}.timeSlots` },
          { $match: { [`${month}.timeSlots.time`]: time } },
          { $unwind: `$${month}.timeSlots.availability` },
          { $match: { [`${month}.timeSlots.availability.room`]: room } },
          {
            $project: {
              _id: 0,
              available: `$${month}.timeSlots.availability.available`,
            },
          },
        ]);
        return result[0].available;
      } catch (error) {
        console.error("Error during availability check", error);
        return false;
      }
    };

    // Reserves the given timeslot by changing the element 'available' to false
    const reserveTimeslot = async (timeSlot) => {
      try {
        const result = await Schedule.updateOne(
          { year, [`${month}.day`]: dayOfMonth, [`${month}.timeSlots.time`]: timeSlot },
          {
            $set: {
              [`${month}.$[day].timeSlots.$[slot].availability.$[room].available`]: updatedAvailability.available,
            },
          },
          {
            arrayFilters: [{ "day.day": dayOfMonth }, { "slot.time": timeSlot }, { "room.room": room }],
          }
        );

        if (!result.acknowledged) {
          console.log("MongoDB server has denied the update operation.");
          return false;
        } else if (result.matchedCount == 0) {
          console.log("No document found with the specified criteria.");
          return false;
        } else if (result.modifiedCount == 0) {
          console.log("Failed to modify schedule.");
          return false;
        } else {
          // console.log("Schedule timeslot has been updated.");
          return true;
        }
      } catch (error) {
        console.error("Error during update.", error);
      }
    };

    const createTransporter = async () => {
      try {
          // const oauth2Client = new OAuth2( process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
          
          // oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
          // console.log("Auth test: ", oauth2Client);
          // const accessToken = await oauth2Client.getAccessToken();
          // console.log('test 3:', accessToken.token);
          // if (accessToken.token) {
              const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      // type: 'OAuth2',
                      user: process.env.EMAIL_ACC,
                      // clientId: process.env.CLIENT_ID,
                      // clientSecret: process.env.CLIENT_SECRET,
                      // refreshToken: process.env.REFRESH_TOKEN,
                      // accessToken: accessToken.token,
                      pass: process.env.EMAIL_PASS
                  },
              });
              // console.log("Transporter: ", transporter)
              return transporter;
          // } else {
          //     throw new Error('Failed to retrieve access token');
          // }
      } catch (error) {
          console.error('Error creating transporter:', error.message);
          throw error; // rethrow the error to handle it in your calling function
      }
  };

    const sendEmail = async (emailAddress) => {
      //To, subject, text, email
      // const  = String(req.body.email);
      try {
        // Setting up a transporter
        let transporter = await createTransporter();
        // Email format
        let mailOptions = {
          from: process.env.EMAIL_ACC,
          to: String(emailAddress),
          subject: 'Your Reservation To Spa Maluge!',
          text: 'Testing email software',
          html: `<h1>Welcome!</h1>`,
        };
        // Sending the email
        console.log("initial check");
        // console.log("transport: ", transporter);
        const info = await transporter.sendMail(mailOptions);
        // Returns true if email was sent
        console.log("check 1");
        console.log("info: ", info);
        console.log("check 2");

        return info;

      } catch (error) {
        // res.status(500).json({message: 'Error sending email', error: error })
        console.error('Error sending email:', error.message);
        throw error;
      }
    };

    const reserveAppointmentTimes = async () => {
      let scheduleStatus = await checkTimeSlots();
      if (scheduleStatus) {
        // console.log(scheduleStatus, "Schedule Status: Available");
        const scheduleResults = await Promise.all(
          appointmentTime.map(async (time) => {
            let updated = reserveTimeslot(time);
            return updated;
          })
        );
        // console.log(Updated Schedule Timeslots: ", scheduleResults);
        if (scheduleResults.includes(false)) {
          res.status(502).json({ success: scheduleResults, message: "Failed to reserve timeslots for reservation." });
          // If a timeslot failed to be reserved, return false
          return false;
        } else {
          return true;
        }
      } else {
        // console.log(scheduleStatus, "Schedule Status: Unavailable");
        res.status(406).json({ success: scheduleStatus, message: "One or more of the requested timeslots have been reserved by someone else already." });
      }
    };
//portfoliopage3001@gmail.com
//portfoliopage3001@gmail.com
    try {
      let scheduleStatus = await reserveAppointmentTimes();
      // console.log("All timeslots updated: ", scheduleStatus);
      if (scheduleStatus) {
        const reservations = await Reservation.create(req.body);
        if (reservations) {
          try {
            const emailReceipt = await sendEmail(req.body.email);
            console.log("Email Receipt: ", emailReceipt);
            //Checking Response
            res.status(201).json({ message: "Reservation added successfully", data: reservations });
          } catch (error) {
            res.status(500).json({ message: 'Error sending email', error: error.message });
          }
        }

      }
    } catch (error) {
      res.status(502).json({ success: false, message: "Reservation failed to be created", error });
    }
  },
  async getReservation(req, res) {
    try {
      const reservation = await Reservation.findById(req.params.reservationId);

      if (!reservation) {
        console.log("Reservation Not Found!");
        return res.status(404).json({ error: "Reservation Not Found" });
      }
      // Send the reservation as a JSON response to the client
      res.status(200).json(reservation);
    } catch (error) {
      console.error("Error getting specific reservation", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async dailyReservations(req, res) {
    //Creates an array of seven days to do a total reservation count
    const year = Number(req.params.year);
    const day = Number(req.params.day);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthData = {
      January: { month: 0, days: 31 },
      February: { month: 1, days: 28 },
      March: { month: 2, days: 31 },
      April: { month: 3, days: 30 },
      May: { month: 4, days: 31 },
      June: { month: 5, days: 30 },
      July: { month: 6, days: 31 },
      August: { month: 7, days: 31 },
      September: { month: 8, days: 30 },
      October: { month: 9, days: 31 },
      November: { month: 10, days: 30 },
      December: { month: 11, days: 31 },
    };
    year % 4 > 0 ? null : monthData.February.days == 29;
    let week = [];
    for (let i = 0; i < 7; i++) {
      if (day + i <= monthData[req.params.month].days) {
        week.push(`${req.params.month} ${day + i}, ${req.params.year}`);
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
      const weekCount = await Reservation.countDocuments({ day: { $in: week } });

      const date = `${req.params.month} ${req.params.day}, ${req.params.year}`;
      const reservation = await Reservation.find({ day: date });

      if (!reservation) {
        console.log("Daily Reservations Not Found!");
        return res.status(404).json({ error: "Daily Reservation Not Found" });
      }
      // Send the reservation as a JSON response to the client
      res.status(200).json({ data: reservation, weekCount: weekCount });
    } catch (error) {
      console.error("Error getting specific daily reservations", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updateReservation(req, res) {
    try {
      if (req.body) {
        const reservation = await Reservation.findOneAndUpdate({ _id: req.params.reservationId }, { ...req.body }, { new: true });

        res.status(200).json(reservation);
      } else {
        console.error("Updated reservation not properly provided", error);
        res.status(404).json({ error: "Updated reservation not properly provided" });
      }
    } catch (error) {
      console.error("Error updating reservation", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async cancelReservation(req, res) {
    try {
      const reservation = await Reservation.findOneAndDelete({
        _id: req.params.reservationId,
      });
      res.status(200).json({ message: "The reservation has been cancelled/deleted" });
    } catch (error) {
      console.error("Error deleting reservation", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
