const { User, Reservation, Calendar, Schedule, Inventory } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    reservations: async () => {
      return Reservation.find().populate("services");
    },
    reservation: async (parent, { reservationId }) => {
      return Reservation.findById(reservationId);
    },
    schedule: async (parent, { year, month, day, itemCategory }) => {
      const schedule = await Schedule.findOne({year});
      if(!schedule) {
        throw new Error('Schedule Not Found!');
      }

      const monthData = schedule[month];

      if(!monthData) {
        throw new Error('Month Not Found!');
      }

      const dayPlans = monthData.find((dayPlan) => dayPlan.day == day);
      if(!dayPlans) {
        throw new Error('Day Not Found!');
      }

      if(itemCategory) {
        const inventory = await Inventory.find({ItemCategory: itemCategory});
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
        return availableTimeSlots;
      } else {
        const availableTimeSlots = dayPlans.timeSlots.filter((timeSlot) => timeSlot.availability[0].available == true);
        //To fit according to the typeDefs query return it needed to be formatted like the following
        return [{timeSlots: availableTimeSlots}];
        // return [{timeSlots: dayPlans.timeSlots}];
      }
      // const availableTimeSlots = dayPlans.timeSlots.filter((timeSlot) => timeSlot.availability[itemCategory] == true && );

      // return availableTimeSlots;
    },
    calendar: async () => {
      return await Calendar.find();
    },
    getCalendarMonth: async (parent, { year, month }) => {
      const calendar = await Calendar.findOne({year});
      if(!calendar) {
        throw new Error('Calendar Not Found!');
      }

      const monthData = calendar[month];
      if(!monthData) {
        throw new Error('Month Not Found!');
      }

      return monthData;
    },
    getInventoryList: async () => {
      return await Inventory.find();
    },
    getItemList: async (parent, ItemCategory) => {
      return await Inventory.findOne({ItemCategory});
    },
  },

  Mutation: {
    addUser: async (parent, { fullName, email, phone, password, position }) => {
      const user = await User.create({ fullName, email, phone, password, position });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, context) => {
      if (context.userId) {

        const user = await User.findOneAndUpdate({ _id: context.userId }, context );

        return user;
      }
      // throw AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (parent, { userId }) => {
      const user = await User.findOneAndDelete({
          _id: userId,
        });
      return user;
    },
    login: async (parent, { phone = null, email = null, password }) => {
      var user;
      //It will check if a phone number is provided, if not it will search based on the email input.
      phone ? user = await User.findOne({ phone }) : user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console("Incorrect Password");
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addReservation: async (parent, context) => {
      const {room} = context;
      delete context.room;
      const reservation = await Reservation.create(context);
      
      const {day, appointmentTime} = context;
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

      const updatedSchedule = await Schedule.findOneAndUpdate({ year }, {[month]: monthData});

      return reservation;
    },
    updateReservation: async (parent, context) => {
      if (context.reservation) {
        const reservation = await Reservation.findOneAndUpdate(
          { _id: context.reservation.reservationId },
          context.reservation );

        return reservation;
      }
    },
    cancelReservation: async (parent, { reservationId }) => {
      const reservation = await Reservation.findOneAndDelete({
          _id: reservationId,
        });
      return reservation;
    },
    addCalendarYear: async (parent, { year, January, February, March, April, May, June, July, August, September, October, November, December }) => {
      const schedule = await Calendar.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
    addScheduleYear: async (parent, { year, January, February, March, April, May, June, July, August, September, October, November, December }) => {
      const schedule = await Schedule.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
    calendarDayOpenStatus: async (parent, { year, month, day, open }) => {
      //Finds the calendar year
      let calendar = await Calendar.find({year});
      //Creates an array with the specific day of the month targeted to have it's open status changed (to either true or false)
      let updatedMonth = calendar[0][month].map((days) => {
        days.day == day ? days.open = open : days;
        return days;
      });
      const updatedCalendar = await Calendar.findOneAndUpdate({ year }, {[month]: updatedMonth});
      return updatedCalendar;
    },
    updateScheduleDay: async (parent, { year, month, day, openingTime, closingTime }) => {
      const schedule = await Schedule.findOne({year});
      if(!schedule) {
        throw new Error('Schedule Not Found!');
      }
      let monthData = schedule[month];

      if(!monthData) {
        throw new Error('Month Not Found!');
      }
      let dayPlans = monthData.find((dayPlan) => dayPlan.day == day);
      if(!dayPlans) {
        throw new Error('Day Not Found!');
      }

      dayPlans.timeSlots.map((timeSlot) => {
        if(timeSlot.time < openingTime || timeSlot.time > closingTime) {
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
      monthData[day-1].timeSlots = dayPlans.timeSlots;

      const updatedSchedule = await Schedule.findOneAndUpdate({ year }, {[month]: monthData});
      return updatedSchedule;
    },
    calendarWeekdays: async (parent, { Sun, Mon, Tue, Wed, Thu, Fri, Sat }) => {
      let calendar = await Calendar.find();
      if(!calendar) {
        throw new Error('Calendar Not Found!');
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
            day.open = Sun;
          } else if(day.weekday == 1) {
            day.open = Mon;
          } else if(day.weekday == 2) {
            day.open = Tue;
          } else if(day.weekday == 3) {
            day.open = Wed;
          } else if(day.weekday == 4) {
            day.open = Thu;
          } else if(day.weekday == 5) {
            day.open = Fri;
          } else {
            day.open = Sat;
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
      
      // return updatedCalendar;
    },
    scheduleHours: async (parent, { open, close }) => {
      let schedule = await Schedule.find();
      if(!schedule) {
        throw new Error('Schedule Not Found!');
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
            if(timeSlot.time < open || timeSlot.time > close) {
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
      
      // return updatedSchedule;
    },
    createInventory: async (parent, { ItemCategory, Rooms, Items }) => {
      const inventory = await Inventory.create({ ItemCategory, Rooms, Items });
      return inventory;
    },
    addToInventory: async (parent, { ItemCategory, Item }) => {

      let inventory = await Inventory.find({ItemCategory});
      // console.log(inventory, "inventory");
      let originalInventory = inventory[0][Items];
      let newInventory = [...originalInventory, Item];

      const updatedInventory = await Calendar.findOneAndUpdate({ ItemCategory }, {Items: newInventory});
      return updatedInventory;
    },
    removeFromInventory: async (parent, { ItemCategory, Item }) => {
      const updatedInventory = await Inventory.findOneAndUpdate({ ItemCategory },
        { $pull: { Items: Item } },
        {new:true});

      return updatedInventory;
    },
  },
};


module.exports = resolvers;
