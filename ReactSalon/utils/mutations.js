import { gql } from "@apollo/client";

export const LOGIN_EMPLOYEE = gql`
  mutation login($phone: String, $email: String, $password: String!) {
    login(phone: $phone, email: $email, password: $password) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addUser($fullName: String!, $email: String!, $phone: String!, $password: String!, $position: String!) {
    addUser(fullName: $fullName, email: $email, phone: $phone, password: $password, position: $position) {
      token
      user {
        _id
        fullName
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateUser($userId: ID!, $fullName: String, $email: String, $phone: String, $password: String, $position: String) {
    updateUser(userId: $userId, fullName: $fullName, email: $email, phone: $phone, password: $password, position: $position) {
      user {
        _id
        fullName
      }
    }
  }
`;

export const DEL_EMPLOYEE = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      fullName
      email
      phone
      position
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation($name: String!, $email: String!, $phone: String!, $day: String!, $appointmentTime: [Int!], $services: [serviceData!], $specialRequests: String, $payment: paymentData!, $room: Int!) {
    addReservation(name: $name, email: $email, phone: $phone, day: $day, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment, room: $room) {
      _id
      name
      email
      phone
      day
      appointmentTime
      specialRequests
    }
  }
`;

export const UPDATE_RESERVATION = gql`
  mutation updateReservation($reservationId: ID!, $name: String!, $email: String!, $phone: String!, $day: String!, $appointmentTime: [Int!], $services: serviceData!, $specialRequests: String, $payment: paymentData!) {
    updateReservation(reservationId: $reservationId, name: $name, email: $email, phone: $phone, day: $day, appointmentTime: $appointmentTime, services: $services, specialRequests: $specialRequests, payment: $payment) {
      _id
      name
      email
      phone
      day
      appointmentTime
      services {
        type
        client
        price
        addOns {
          addition
          price
        }
      }
      specialRequests
      payment {
        _id
        cardOwner
        cardNumber
        cardExpiration
        securityCode
        billingAddress
      }
    }
  }
`;

export const DEL_RESERVATION = gql`
  mutation cancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId) {
        _id
        name
        email
        phone
        day
        appointmentTime
        services {
          type
          client
          price
        }
        specialRequests
        payment {
          _id
          cardOwner
          cardNumber
          cardExpiration
          securityCode
          billingAddress
        }
    }
  }
`;

export const UPDATE_DAY_STATUS = gql`
  mutation calendarDayOpenStatus($year: Int!, $month: String!, $day: Int!, $open: Boolean!) {
    calendarDayOpenStatus(year: $year,  month: $month, day: $day, open: $open) {
      year
      January {
        day
        open
      }
    }
  }
`;

export const UPDATE_SCHEDULE_DAY = gql`
  mutation updateScheduleDay($year: Int!, $month: String!, $day: Int!, $openingTime: Int!, $closingTime: Int!) {
    updateScheduleDay(year: $year,  month: $month, day: $day, openingTime: $openingTime, closingTime: $closingTime) {
      timeSlots {
        time
        availability {
          room
          available
        }
      }
    }
  }
`;

export const UPDATE_CALENDAR_WEEKDAYS = gql`
  mutation calendarWeekdays($Sun: Boolean!, $Mon: Boolean!, $Tue: Boolean!, $Wed: Boolean!, $Thu: Boolean!, $Fri: Boolean!, $Sat: Boolean!) {
    calendarWeekdays(Sun: $Sun, Mon: $Mon, Tue: $Tue, Wed: $Wed, Thu: $Thu, Fri: $Fri, Sat: $Sat) {
      year
      January {
        day
        weekday
        open
      }
    }
  }
`;



export const UPDATE_SCHEDULE_HOURS = gql`
  mutation scheduleHours($open: Int!, $close: Int!) {
    scheduleHours(open: $open, close: $close) {
      year
      January {
        day
        timeSlots {
          time
          availability {
            room
            available
          }
        }
      }
    }
  }
`;

export const CREATE_INVENTORY = gql`
  mutation createInventory($ItemCategory: Int!, $Rooms: [LinkedRoomData]!, $Items: [ItemData!]) {
    createInventory(ItemCategory: $ItemCategory, Rooms: $Rooms, Items: $Items) {
      ItemCategory
      Rooms{
        Room
      }
      Items {
        Item
        Prices {
          time
          cost
        }
      }
    }
  }
`;

export const ADD_TO_INVENTORY = gql`
  mutation addToInventory($ItemCategory: Int!, $Item: ItemData!) {
    addToInventory(ItemCategory: $ItemCategory, Item: $Item) {
      ItemCategory
      Items {
        Item
        Prices {
          time
          cost
        }
      }
    }
  }
`;

export const REMOVE_FROM_INVENTORY = gql`
  mutation removeFromInventory($ItemCategory: Int!, $Item: String!) {
    removeFromInventory(ItemCategory: $ItemCategory, Item: $Item) {
      ItemCategory
      Items {
        Item
        Prices {
          time
          cost
        }
      }
    }
  }
`;