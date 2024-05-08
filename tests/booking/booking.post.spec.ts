import { test, expect } from '../fixtures';
import { Booking, BookingModel } from '@helpers/booking/booking-model';
import { RequestHeaders, createHeaders } from '@helpers/headers';
import { DataFactory } from '@helpers/data/data-factory';
import Tag from 'lib/tag';

let createdBookings: number[] = [];

test.describe('POST /booking', () => {
  test.afterAll(async ({ bookingRequests }) => {
    let validHeaders: RequestHeaders = await createHeaders();
    if (createdBookings) {
      for (const bookingId of createdBookings) {
        await bookingRequests.deleteBooking(bookingId, validHeaders);
      }
      createdBookings = [];
    }
  });

  test('POST new booking', { tag: Tag.SMOKE_TEST }, async ({ bookingRequests, bookingData }) => {
    //Act
    const res = await bookingRequests.createBooking(bookingData);
    //Assert
    expect(res.response.status()).toBe(200);

    const body: BookingModel = res.responseBody;
    expect(body.bookingid).not.toBeNull();

    const booking: Booking = body.booking;
    expect(booking).toMatchObject(bookingData);

    // Add the created booking to the array
    createdBookings.push(body.bookingid);

    await test.step('Verify booking was created', async () => {
      const createdBooking = await bookingRequests.getBookingById(body.bookingid);
      expect(createdBooking.response.status()).toBe(200);
      expect(createdBooking.responseBody).toMatchObject(bookingData);
    });
  });

  test('POST new booking with random data', { tag: Tag.SMOKE_TEST }, async ({ bookingRequests }) => {
    //Act
    const res = await bookingRequests.createBooking();
    //Assert
    expect(res.response.status()).toBe(200);

    const body: BookingModel = res.responseBody;
    expect(body.bookingid).not.toBeNull();

    // Add the created booking to the array
    createdBookings.push(body.bookingid);

    await test.step('Verify booking was created', async () => {
      const createdBooking = await bookingRequests.getBookingById(body.bookingid);
      expect(createdBooking.response.status()).toBe(200);
      // expect(createdBooking.responseBody).toMatchObject(bookingData); todo: fix this
    });
  });
});
