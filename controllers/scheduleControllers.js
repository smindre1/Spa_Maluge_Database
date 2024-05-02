const { Schedule, Inventory } = require("../models");

module.exports = {
  //Obtains the available timeslots for the specified day and itemCategory.
  //Params: year, month, day, itemcategory
  async getSchedule(req, res) {
    try {
      const schedule = await Schedule.findOne({year: req.params.year});
      if(!schedule) {
        console.log('Schedule Not Found!');
        return res.status(404).json({ error: 'Schedule Not Found' });
      }

      const monthData = schedule[req.params.month];

      if(!monthData) {
        console.log('Month Not Found!');
        return res.status(404).json({ error: 'Schedule Month Not Found' });
      }

      const dayPlans = monthData.find((dayPlan) => dayPlan.day == req.params.day);
      if(!dayPlans) {
        console.log('Day Not Found!');
        return res.status(404).json({ error: 'Schedule Day Not Found' });
      }

      if(req.params.itemCategory) {
        const inventory = await Inventory.find({ItemCategory: req.params.itemCategory});
        const rooms = inventory[0].Rooms;

        const findRooms = () => {
          let selectedSchedule = [...dayPlans.timeSlots];
          let availableRoomTimes = [];
          for(let i=0; i < rooms.length; i++) {
            let timeSlotList = selectedSchedule.filter((timeSlot) => 
              rooms[i].Room == timeSlot.availability[rooms[i].Room - 1].room && timeSlot.availability[rooms[i].Room - 1].available == true
            );

            availableRoomTimes.push({timeSlots: timeSlotList});
          }
          return availableRoomTimes;
        }

        const availableTimeSlots = await findRooms();

        res.status(200).json({ message: 'Schedule obtained successfully', data: availableTimeSlots });
      } else {
        const availableTimeSlots = dayPlans.timeSlots.filter((timeSlot) => timeSlot.availability[0].available == true);

        res.status(200).json({ message: 'Schedule obtained successfully', data: {timeSlots: availableTimeSlots} });
        // return [{timeSlots: dayPlans.timeSlots}];
      }
    } catch (error) {
      console.error('Error getting schedule:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async addScheduleYear(req, res) {
    try {
      const { year, January, February, March, April, May, June, July, August, September, October, November, December } = req.body;
      const newScheduleYear = await Schedule.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      //Checking Response
      res.status(201).json({ message: 'Schedule year added successfully', data: newScheduleYear });
    } catch (error) {
        console.error('Error adding schedule year:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },
  //req body objects: year, month, day, openingTime: Int (0-95), closingTime: Int (0-95)
  async updateScheduleDay(req, res) {
    try {
      const schedule = await Schedule.findOne({year: req.body.year});
      if(!schedule) {
        console.log('Schedule Not Found!');
        return res.status(404).json({ error: 'Schedule Not Found' });
      }
      let monthData = schedule[req.body.month];

      if(!monthData) {
        console.log('Schedule Month Not Found!');
        return res.status(404).json({ error: 'Schedule Month Not Found' });
      }
      let dayPlans = monthData.find((dayPlan) => dayPlan.day == Number(req.body.day));
      if(!dayPlans) {
        console.log('Day Not Found!');
        return res.status(404).json({ error: 'Schedule Day Not Found' });
      }

      dayPlans.timeSlots.map((timeSlot) => {
        if(timeSlot.time < req.body.openingTime || timeSlot.time > req.body.closingTime) {
          let range = timeSlot.availability.length;
          for(let i=0; i<range; i++) {
            timeSlot.availability[i].available = false;
          }
        } else {
          let range = timeSlot.availability.length;
          for(let i=0; i<range; i++) {
            timeSlot.availability[i].available = true;
          }
        }
      });
      //[day-1] because that is the difference between the day and the day's place in the month array
      monthData[Number(req.body.day)-1].timeSlots = dayPlans.timeSlots;

      await Schedule.findOneAndUpdate({ year: req.body.year }, {[req.body.month]: monthData}, {new: true});

      //Grabbing the updated schedule day:
      const newSchedule = await Schedule.findOne({year: req.body.year});
      if(!newSchedule) {
        console.log('Schedule Not Found!');
        return res.status(404).json({ error: 'Schedule Not Found' });
      }

      const newMonthData = newSchedule[req.body.month];

      if(!newMonthData) {
        console.log('Month Not Found!');
        return res.status(404).json({ error: 'Schedule Month Not Found' });
      }

      const newScheduleDay = newMonthData.find((dayPlan) => dayPlan.day == req.body.day);

      if(!newScheduleDay) {
        console.log('Day Not Found!');
        return res.status(404).json({ error: 'Schedule Day Not Found' });
      }

      // Send the updatedSchedule as a JSON response to the client
      res.status(200).json({message: "The updated schedule day.", data: newScheduleDay});
    } catch (error) {
      console.error('Error updating schedule day:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  //
  async updateScheduleHours(req, res) {
    try {
      let schedule = await Schedule.find();
      if(!schedule) {
        console.log('Schedule Not Found!');
        return res.status(404).json({ error: 'Schedule Not Found' });
      }
      let scheduleMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      //Updates a month with the user's input
      const updateMonth = async (month) => {
        const newMonth = [];
        for(let i=0; i < month.length; i++) {
          let reformedDay = {day: month[i].day, timeSlots: month[i].timeSlots};
          newMonth.push(reformedDay);
        }
        //Looping through each day of the month, in which it cycles/updates each timeSlot for each day
        newMonth.map((day) => {
          day.timeSlots.map((timeSlot) => {
            if(timeSlot.time < req.body.open || timeSlot.time > req.body.close) {
              let range = timeSlot.availability.length;
              for(let i=0; i<range; i++) {
                timeSlot.availability[i].available = false;
              }
            } else {
              let range = timeSlot.availability.length;
              for(let i=0; i<range; i++) {
                timeSlot.availability[i].available = true;
              }
            }
          });
        })
        return newMonth;
      }

      //Creates an object for a specific year with the months that have been updated with the user's input
      const updateYear = async (months) => {
        let updatedMonths = {};
        //Looping through each month of the year
        for(let i=0; i < months.length; i++) {
          let month = months[i];
          const newMonth = await updateMonth(month);
          updatedMonths[scheduleMonths[i]] = newMonth;
        }
        return updatedMonths;
      }

      //Loops through each schedule year, updates the year, then updates the database with it
      for(let i=0; i < schedule.length; i++) {
        let year = schedule[i].year;
        let {January, February, March, April, May, June, July, August, September, October, November, December} = schedule[i];
        let months = [January, February, March, April, May, June, July, August, September, October, November, December];
        const newYear = await updateYear(months);
        await Schedule.findOneAndUpdate({ year }, newYear);
      }

      //Grabbing the updated schedule day:
      const newSchedule = await Schedule.findOne({year: 1000});
      if(!newSchedule) {
        console.log('Schedule Not Found!');
        return res.status(404).json({ error: 'Schedule Not Found' });
      }

      const newScheduleDay = newSchedule.January[0];

      if(!newScheduleDay) {
        console.log('Day Not Found!');
        return res.status(404).json({ error: 'Schedule Test Day Not Found' });
      }

      // Send the updatedSchedule as a JSON response to the client
      res.status(200).json({message: "The general updated schedule hours", data: newScheduleDay});
      
      // return updatedSchedule;
    } catch (error) {
      console.error('Error updating schedule hours:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};