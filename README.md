# Spa Maluge Database API
By: Shane Mindreau [GitHub Profile](https://github.com/smindre1)

**Side Note:** To avoid others using my deployed RESTful API and potentially overloading it, I am only going to be documenting the route endpoints.

## Description:
This here is a RESTful API working with a Mongoose Massage Salon Database, for the business [Spa Maluge](https://spamaluge.com/). I built this API simply so the website I made for the business, Spa Maluge, could manage it's clients and employees.

## Routes:
There are five groupings/collections for the API:
- `Inventory Routes`:
    These control 'inventories' or item lists for different items/services. I decided to make them into groupings as a way for the business to decide how to allocate different rooms in their building. For example one item list could be for a specific room or specific multiple rooms depending on the service.
    - `Enpoint:` /api/inventory/
        - **GET**: Fetches a list of all the inventories/item lists.
        - **POST**: Creates a new inventory/item list.
    - `Enpoint:` /api/inventory/:itemCategory/
        - **GET**: Fetches a specific inventory based on it's identifier: itemCategory.
        - **PUT**: Updates a specific inventory by adding a new item.
        - **DELETE**: Deletes an item from a specific inventory.

- `Calendar Routes`:
    This is a database collection for calendar days for the next five years. Each day can be updated as an open or closed status.
    
    (Side Note): In order to minimize memory/data, this calendar model schema will likely be replaced with a schema of simple calendar settings rather then logging everyday.

    - `Enpoint:` /api/calendar/
        - **GET**: Fetches five calendar years.
        - **POST**: Creates a new calendar year.
    - `Enpoint:` /api/calendar/:year/:month/
        - **GET**: Fetches a specific calendar month.
    - `Enpoint:` /api/calendar/specific-calendar-day/
        - **PUT**: Updates a specific day to be either closed or open based on the Boolean value for 'open' in the calendar schema.
    - `Enpoint:` /api/calendar/calendar-weekdays
        - **PUT**: Updates the open status for the seven days of the week.

- `Schedule Routes`:
    Almost a mirror to the calendar, however, instead of the weekday and open keys for each day object in a calendar month there is an array called timeSlots. In the timeSlots array there are object with the following format: {time: Int!, availability: [{ room: Int!, available: Bool! }] }.

    (Side Note): Like the calendar model, I can see a way to improve the schedule model/database by creating settings/rules that can imitate the hard data. Also, instead of filling the collection with data for the available time-slots, it may be more cost effective to only record the negative data (the unavailable time-slots which will be smaller in quantity by comparison). However, this may not be updated for a long while as there don't seem to be any current problems with what is already set up and I would like to start working on other projects.

    - `Enpoint:` /api/schedule/:year/:month/:day/:itemCategory/
        - **GET**: Fetches the schedule of (all) available time-slots based on the day and itemCategory specified by the endpoint parameters.
    - `Enpoint:` /api/schedule/
        - **POST**: Creates a new schedule year. I have used this route in my seed.js file (/seeder/seed.js), which you can use for reference.
    - `Enpoint:` /api/schedule/update-schedule-day/
        - **PUT**: Updates the available time-slots of a specific day based on the request body object: {year, month, day, openingTime: Int (0-95), closingTime: Int (0-95)}.
    - `Enpoint:` /api/schedule/update-schedule-day/update-schedule-hours
        - **PUT**: Updates the general business hours with the request body object: {open: Int (0-95), close: Int (0-95)}.

- `Reservation Routes`:
    These are the routes for the database/collection containing all the client's information, their appointment date and time, the service they would like and the recipient for the service, add-ons, and Special Requests.

    (Side Note): More routes will be added later on for better ease of use.

    - `Enpoint:` /api/reservations/
        - **GET**: Fetches a list of all the reservations.
        - **POST**: Creates a new reservation.
    - `Enpoint:` /api/reservations/:reservationId/
        - **GET**: Fetches a specific reservations data based on the reservation id.
        - **PUT**: Updates a specific reservation.
        - **DELETE**: Cancels/deletes a specific reservation.

- `User Routes`:
    These users will the staff of the Spa Maluge business (Boss, Manager, Employees, etc...). The data here will be used as a way to authenticate who can access certain data on the [Spa Maluge Website](https://spamaluge.com/).

    - `Enpoint:` /api/users/
        - **GET**: Fetches a list of all users.
        - **POST**: Creates a new user.
    - `Enpoint:` /api/users/login/
        - **POST**: Compares the login information of the request body to what is registered in the database. If it is correct it sends back a jwt-web token that contains the user's name, position and an access token.
    - `Enpoint:` /api/users/:userId/
        - **GET**: Fetches a specific user's general information based on userId.
        - **PUT**: Updates a specific user's information.
        - **DELETE**: Deletes a specific user's account.
