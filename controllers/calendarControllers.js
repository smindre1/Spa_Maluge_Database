const { Calendar } = require("../models");
const db = require('../config/connection');

module.exports = {
  //get all caledar years
  async getCalendar(req, res) {
    try {
      let calendar = await Calendar.find();
      res.json(calendar);
    } catch (error) {
      res.status(500).json({message: 'Calendar could not be found'})
    }
    // finally {
    //   db.connection.close()
    // }
  },
  async addCalendarYear(req, res) {
    try {
      const { year, January, February, March, April, May, June, July, August, September, October, November, December } = req.body;
      const newCalendarYear = await Calendar.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      //Checking Response
      res.status(201).json({ message: 'Calendar year added successfully', data: newCalendarYear });
    } catch (error) {
        console.error('Error adding calendar year:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },
  async getCalendarMonth(req, res) {
    try {
      const calendar = await Calendar.findOne({year: req.params.year});
      if(!calendar) {
        console.log('Calendar Not Found!');
        return res.status(404).json({ error: 'Calendar Not Found' });
      }

      const monthData = calendar[req.params.month];
      if(!monthData) {
        console.log('Month Not Found!');
        return res.status(404).json({ error: 'Calendar Month Not Found' });
      }

      // Send the monthData as a JSON response to the client
      res.status(200).json(monthData);
    } catch (error) {
      console.error('Error getting calendar month:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  //calendarDayOpenStatus req objects: year: Int, month: String (eg. "Januaray"), day: Int, open: Boolean
  async calendarDayOpenStatus(req, res) {
    try {
    //Finds the calendar year
    let calendar = await Calendar.find({year: req.body.year});
    //Creates an array with the specific day of the month targeted to have it's open status changed (to either true or false)
    let updatedMonth = calendar[0][req.body.month].map((days) => {
      days.day == req.body.day ? days.open = req.body.open : days;
      return days;
    });
    const updatedCalendar = await Calendar.findOneAndUpdate({ year: req.body.year }, {[req.body.month]: updatedMonth}, {new: true});
    res.status(202).json({ message: 'Calendar year updated successfully', data: updatedCalendar });
    } catch (error) {
      console.error('Error updating calendar day status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  //calendarWeekdays req objects: Sun, Mon, Tue, Wed, Thu, Fri, Sat. (Bool)
  async calendarWeekdays(req, res) {
    try {
      let calendar = await Calendar.find();
      if(!calendar) {
        console.log('Calendar Not Found!');
        return res.status(404).json({ error: 'Calendar Not Found' });
      }
      let calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      //Updates a month with the user's input
      const updateMonth = async (month) => {
        const newMonth = [];
        for(let i=0; i < month.length; i++) {
          let reformedDay = {day: month[i].day, weekday: month[i].weekday, open: month[i].open};
          newMonth.push(reformedDay);
        }
        //Looping through each day of the month
        newMonth.map((day) => {
          if(day.weekday == 0) {
            day.open = req.body.Sun;
          } else if(day.weekday == 1) {
            day.open = req.body.Mon;
          } else if(day.weekday == 2) {
            day.open = req.body.Tue;
          } else if(day.weekday == 3) {
            day.open = req.body.Wed;
          } else if(day.weekday == 4) {
            day.open = req.body.Thu;
          } else if(day.weekday == 5) {
            day.open = req.body.Fri;
          } else {
            day.open = req.body.Sat;
          }
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
          updatedMonths[calendarMonths[i]] = newMonth;
        }
        return updatedMonths;
      }

      //Loops through each calendar year, updates the year, then updates the database with it
      for(let i=0; i < calendar.length; i++) {
        let year = calendar[i].year;
        let {January, February, March, April, May, June, July, August, September, October, November, December} = calendar[i];
        let months = [January, February, March, April, May, June, July, August, September, October, November, December];
        const newYear = await updateYear(months);
        await Calendar.findOneAndUpdate({ year }, newYear);
      }
      
      const results = await Calendar.findOne({year: 1000});
      res.status(201).json({ message: "The updated weekdays", data: results });
      // return updatedCalendar;
    } catch (error) {
      console.error('Error updating calendar weekday(s) open status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};