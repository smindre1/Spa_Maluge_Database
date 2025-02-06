const { Reservation, Schedule, Inventory } = require("../models");
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
  async addReservation(req, res) {

    let reStatus = [];
    let reEmail = {};
    let priceList = [];

    const priceCheck = async () => {
      let itemList = [];
      let serviceList = [];
      for(let i=0; i < req.body.length; i++) {
        let ele = req.body[i].services[0];
        serviceList.push(ele.type);
        !itemList.includes(ele.itemCategory) ? itemList.push(ele.itemCategory) : null;

        if(ele?.addOns?.length > 0) {
          for(let q=0; q < ele.addOns.length; q++) {
            serviceList.push(ele.addOns[q].addition);
          }
          // If there is an add-on then include add-on item category 4
          itemList.push(4);
        } 
      }
      
      try {
        const itemLogs = await Inventory.aggregate([
          // Filter by ItemCategory
            { $match: { ItemCategory: { $in: itemList }}},
            // Deconstruct Items array
            { $unwind: "$Items"},
            // Filter by Items.Item value
            { $match: { "Items.Item": { $in: serviceList }}},
            // Return only the Items objects
            { $replaceRoot: { newRoot: "$Items" }}
        ]);
        return itemLogs;
    } catch (error) {
        console.error("Error fetching items:", error);
    }

    }

    // Runs a check on if the reserved schedule is available or not
    const checkTimeSlots = async (appointmentTime, year, month, dayOfMonth, room) => {
      const resultRecords = await Promise.all(
        appointmentTime.map(async (time) => {
          let status = await checkAvailability(time, year, month, dayOfMonth, room);
          return status;
        })
      );
      if (resultRecords.includes(false)) {
        // If a timeslot in unavailable, return false
        return false;
      } else {
        return true;
      }
    };

    // Checks a specific timeslot's availability
    const checkAvailability = async (time, year, month, dayOfMonth, room) => {
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
    const reserveTimeslot = async (timeSlot, year, month, dayOfMonth, updatedAvailability, room) => {
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
        // console.log("initial check");
        // console.log("transport: ", transporter);
        const info = await transporter.sendMail(mailOptions);
        // Returns true if email was sent
        // console.log("check 1");
        // console.log("info: ", info);
        // console.log("check 2");

        return info;

      } catch (error) {
        // res.status(500).json({message: 'Error sending email', error: error })
        console.error('Error sending email:', error.message);
        throw error;
      }
    };

    const reserveAppointmentTimes = async (appointmentTime, year, month, dayOfMonth, updatedAvailability, room) => {
      let scheduleStatus = await checkTimeSlots(appointmentTime, year, month, dayOfMonth, room);
      if (scheduleStatus) {
        //Schedule timeslots were confirmed to be available
        const scheduleResults = await Promise.all(
          //Reserves all appointment times and returns an array of true or false for if each timeslot was successfully reserved.
          appointmentTime.map(async (time) => {
            let updated = reserveTimeslot(time, year, month, dayOfMonth, updatedAvailability, room);
            return updated;
          })
        );
        if (scheduleResults.includes(false)) {
          //Checks to see if any timeslot failed to be reserved
          res.status(502);
          reStatus.push({schedule: "false, failed to reserve", success: false});
          return false;
        } else {
          //All timeslots were reserved properly
          reStatus.push({schedule: "true, timeslots reserved", success: true});
          return true;
        }
      } else {
        //Records schedule as false, meaning: One or more of the requested timeslots have been reserved by someone else already.
        res.status(406);
        reStatus.push({schedule: "false, already reserved", success: false});
        return false;
      }
    };

    const makeReservation = async (appointmentTime, year, month, dayOfMonth, updatedAvailability, room, index) => {
      try {
        let scheduleStatus = await reserveAppointmentTimes(appointmentTime, year, month, dayOfMonth, updatedAvailability, room);
        if (scheduleStatus) {
          priceList.length === 0 ? priceList = await priceCheck() : null;
          priceList.map((ele) => {
            //Checks the service price against database
            if(ele.Item == req.body[index].services[0].type) {
              //Checks that there is a matching service name
              let duration = parseInt((appointmentTime.length) * 15)
              //tag.time is set to a range for service rate times that aren't a multiple of 15
              let rate = ele.Prices.filter((tag) => tag.time < duration + 15 && tag.time > duration - 15)
              if(rate.length > 0) {
                rate[0].cost == req.body[index].services[0].price ? null : req.body[index].services[0].price = parseInt(rate[0].cost);
              } else {
                console.log("Making new rate...")

                let maxRate = 0;
                let minutes = 0;
                for(let i = 0; ele.Prices.length > i; i++) {
                  if(ele.Prices[i].cost > maxRate) {
                    maxRate = ele.Prices[i].cost;
                    minutes = ele.Prices[i].time
                  }
                }
                minutes = (Math.round(minutes/15));
                maxRate = maxRate / minutes;
                req.body[index].services[0].price = parseInt(maxRate * duration);
              }
            }
          })
          const reservations = await Reservation.create(req.body[index]);
          if (reservations) {
            //Checking Response
            res.status(201);
            reStatus[index].reservation = "Reservation added successfully";
          }
        }
      } catch (error) {
        res.status(502);
        reStatus[index].reservation = "Reservation failed to be created";
        reStatus[index].success = false;
      }
    }

    for(let i=0; i<req.body.length; i++) {
      // Extracts the room key from the req object
      let { room } = req.body[i];
      room = Number(room);
      delete req.body[i].room;

      const { day, appointmentTime } = req.body[i];
      const date = day.split(", ");
      const newDate = date[0].split(" ");

      const year = Number(date[1]);
      const month = newDate[0];
      const dayOfMonth = Number(newDate[1]);
      const updatedAvailability = { available: false };
      // console.log("for loop arg: ", appointmentTime, year, month, dayOfMonth, updatedAvailability, room, i);
      await makeReservation(appointmentTime, year, month, dayOfMonth, updatedAvailability, room, i);

      if(i === req.body.length - 1) {
        try {
          if(reStatus.find((ele) => ele.success === true )) {
            const emailReceipt = await sendEmail(req.body[i].email);
            // console.log("final: ", reStatus);
            // console.log("Email Sent ");
            reEmail = {email: "Email Sent", send: true};
            
            res.json({reservations: reStatus, reEmail});
          } else {
            reEmail = {email: "Reservation failed, email not sent", send: false};
            res.json({reservations: reStatus, reEmail});

          }

        } catch (error) {
          res.status(500);
          reEmail = {email: "Error sending email", send: false};
        }
      }
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
