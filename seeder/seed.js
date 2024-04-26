const db = require('../config/connection');
require('dotenv').config();
const { Calendar, Schedule, Inventory } = require('../models');
// import { defaultTimeSlots } from './timeSlots.js';
const defaultTimeSlots = require('./timeSlots');
const defaultInventoryItems = require('./services');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

//Builds Default Inventory for Massage Salon
const buildInventories = async () => {
  for(let i =0; i < defaultInventoryItems.length; i++) {
    await Inventory.create(defaultInventoryItems[i]);
  }
}

//This function builds the test calendar year 1000 which will be used as a control variable to check and record user adjustments to the overall calendar, specifically which weekdays to be open for.
const buildTestCalendarYear = (year) => {
  let builtYear = {year};
  months.forEach((month) => {
    //Each test month will be 7 days long and each start on Sunday
    let numOfDays = 7;
    const weekdayIndex = 0;
    const finishedMonth = buildCalendarMonth(numOfDays, weekdayIndex);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

//This function builds the data object for a specific year to be used for the Calendar model
const buildCalendarYear = (year) => {
  let builtYear = {year};
  let leapYear;
  year % 4 > 0 ? leapYear = false : leapYear = true;
  months.forEach((month) => {
    let numOfDays;
    //Checks which month (and if it's a leap year) and establishes a number of days allocated to that month
    if(month == 'January' || month == 'March' || month == 'May' || month == 'July' || month == 'August' || month == 'October' || month == 'December') {
      numOfDays = 31;
    } else if( month == 'February' ) {
      leapYear ? numOfDays = 29 : numOfDays = 28;
    } else {
      numOfDays = 30;
    }
    const firstDay = new Date(year, months.indexOf(month), 1);
    const weekdayIndex = firstDay.getDay();
    const finishedMonth = buildCalendarMonth(numOfDays, weekdayIndex);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

//This function creates an array of objects representing each indiidual day for a specific month's traits
//'iterations' represent the number of days in the month
//'weekday' represents the day of the week that belongs to the first day of the specific month
const buildCalendarMonth = (iterations, weekday) => {
  const month = [];
  for(let i = 1; i < iterations + 1; i++) {
    const buildDay = {
      day: i,
      weekday: weekday,
      open: true,
    };
    weekday == 6 ? weekday = 0 : weekday = weekday + 1;
    month.push(buildDay);
  }
  return month;
}

//Builds a calendar consisting of 5 years starting from the current year
const buildCalendar = async () => {
  let count = currentYear;
  for(i = 0; i < 5; i++) {
    let newYear = buildCalendarYear(count);
    await Calendar.create(newYear);
    console.log(`Calendar Year: ${count} Done`);
    count = count + 1;
  }
}

//This function builds the test schedule year 1000 which will be used as a control variable to check and record user adjustments to the overall schedule, specifically the general opening hours for a business day.
const buildTestScheduleYear = (year) => {
  let builtYear = {year};
  months.forEach((month) => {
    let numOfDays = 7;
    const finishedMonth = buildScheduleMonth(numOfDays);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

//This function builds the data object for a specific year to be used for the Schedule model
const buildScheduleYear = (year) => {
  let builtYear = {year};
  let leapYear;
  year % 4 > 0 ? leapYear = false : leapYear = true;
  months.forEach((month) => {
    let numOfDays;
    //Checks which month (and if it's a leap year) and establishes a number of days allocated to that month
    if(month == 'January' || month == 'March' || month == 'May' || month == 'July' || month == 'August' || month == 'October' || month == 'December') {
      numOfDays = 31;
    } else if( month == 'February' ) {
      leapYear ? numOfDays = 29 : numOfDays = 28;
    } else {
      numOfDays = 30;
    }
    const finishedMonth = buildScheduleMonth(numOfDays);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

const buildScheduleMonth = (iterations) => {
  const month = [];
  for(let i = 1; i < iterations + 1; i++) {
    const buildDay = {
      day: i,
      timeSlots: defaultTimeSlots
    };
    month.push(buildDay);
  }
  return month;
}

//Builds a schedule consisting of 5 years starting from the current year
const buildSchedule = async () => {
  let count = currentYear;
  for(i = 0; i < 5; i++) {
    let newYear = buildScheduleYear(count);
    await Schedule.create(newYear);
    console.log(`Schedule Year: ${count} Done`);
    count = count + 1;
  }
}



//Process exit code 1 means failure, 0 means success
db.once('open', async () => {
  try {

  // Check if there are any documents in the Calendar collection
  let calendarCount = 0;
  await Calendar.countDocuments({})
  .then(count => {
      if (count > 0) {
          calendarCount = count;
          console.log('Data already exists in the Calendar collection.');
      } else {
          console.log('No data found in the Calendar collection.');
      }
  })
  .catch(err => {
      console.error(err);
  });

  //Seeds an Calendar database
  if(calendarCount < 2) {
    console.log("Now Building Calendar");
    await buildCalendar();
    console.log("Calendar Done");

    let testCalendarYear = buildTestCalendarYear(1000);
    testCalendarYear ? console.log("Now Building Test Calendar Year") : null;
    await Calendar.create(testCalendarYear);
    testCalendarYear ? console.log("Test Calendar Year Done") : null;
  } else {
    console.log("Calendar has not been re-seeded")}


  // Check if there are any documents in the Schedule collection
  let scheduleCount = 0;
  await Schedule.countDocuments({})
  .then(count => {
      if (count > 0) {
          scheduleCount = count;
          console.log('Data already exists in the Schedule collection.');
      } else {
          console.log('No data found in the Schedule collection.');
      }
  })
  .catch(err => {
      console.error(err);
  });

  //Seeds a Schedule database
  if(scheduleCount < 3) {
      console.log("Now Building Schedule");
      await buildSchedule();
      console.log("Schedule Done");
      //Seeds a test schedule
      let testScheduleYear = buildTestScheduleYear(1000);
      testScheduleYear ? console.log("Now Building Test Schedule Year") : null;
      await Schedule.create(testScheduleYear);
      testScheduleYear ? console.log("Test Schedule Year Done") : null;
  } else {
      console.log("Schedule has not been re-seeded")}

  // Check if there are any documents in the Inventory collection
  let inventoryCount = 0;
  await Inventory.countDocuments({})
  .then(count => {
      if (count > 0) {
          inventoryCount = count;
          console.log('Data already exists in the Inventory collection.');
      } else {
          console.log('No data found in the Inventory collection.');
      }
  })
  .catch(err => {
      console.error(err);
  });

  //Seeds an Inventory database
  if(inventoryCount < 2) {
    console.log("Now Building Inventories");
    await buildInventories();
    console.log("Inventories Done");
  } else {
    console.log("Inventory has not been re-seeded")}


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});