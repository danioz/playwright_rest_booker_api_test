import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';
import { DataFactory } from '@helpers/data/data-factory';

let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;
let bookingRequests: BookingRequests;
let createdBookings: number[] = [];

test.describe('POST /booking', () => {
  test.beforeAll(async () => {
    validHeaders = await createHeaders();
    invalidHeaders = await createInvalidHeaders();
  });

  test.beforeEach(async () => {
    bookingRequests = new BookingRequests();
  });

  test.afterAll(async () => {
    if (createdBookings) {
      for (const bookingId of createdBookings) {
        console.log('Deleting booking with id:', bookingId);
        await bookingRequests.deleteBooking(bookingId, validHeaders);
      }
      createdBookings = [];
    }
  });

  test('POST new booking', async () => {
    //Arrange
    const bookingData: Booking = DataFactory.getBooking();
    //Act
    const res = await bookingRequests.createBooking(bookingData);
    //Assert
    expect(res.response.status()).toBe(200);

    const body = res.responseBody;
    expect(body.bookingid).not.toBeNull();

    const booking: Booking = body.booking;
    expect(booking).toMatchObject(bookingData);

    // Add the created booking to the array
    createdBookings.push(body.bookingid);
  });

  test('POST new booking with random data', async () => {
    //Act
    const res = await bookingRequests.createBooking();
    //Assert
    expect(res.response.status()).toBe(200);

    const body = res.responseBody;
    expect(body.bookingid).not.toBeNull();

    // Add the created booking to the array
    createdBookings.push(body.bookingid);
  });

  // test('BOOKING new', async () => {});
});
