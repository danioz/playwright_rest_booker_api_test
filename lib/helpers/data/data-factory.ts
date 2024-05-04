import { Booking } from '@helpers/booking/booking-model';
import { faker } from '@faker-js/faker';

export class DataFactory {
  public static getBooking(): Booking {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int(100),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: faker.date.past().toISOString().split('T')[0],
        checkout: faker.date.soon({ days: 10 }).toISOString().split('T')[0],
      },
      additionalneeds: getAdditionalNeeds(),
    };
  }
}

const getAdditionalNeeds = (): string => {
  return additionalNeeds[faker.number.int({ min: 0, max: additionalNeeds.length - 1 })];
};

const additionalNeeds = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Drinks',
  'Dessert',
  'Room Service',
  'Laundry',
  'Cleaning',
  'Transportation',
  'Tickets',
  'Activities',
  'Spa',
  'Gym',
  'Pool',
  'Sauna',
  'Massage',
];
