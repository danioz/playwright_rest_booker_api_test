import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import Tag from 'lib/tag';

let bookingRequests: BookingRequests;

test.describe('GET /booking', () => {
  test.beforeEach(async () => {
    bookingRequests = new BookingRequests();
  });

  test('GET all bookings', { tag: Tag.SMOKE_TEST }, async () => {
    //Act
    const res = await bookingRequests.getBookings();
    //Assert
    expect(res.response.status()).toBe(200);

    const body: Booking[] = res.responseBody;
    expect(body.length, `Response was: ${JSON.stringify(res.responseBody)}`).toBeGreaterThan(0);
  });

  test('GET booking for specific booking based upon the booking id provided', { tag: Tag.SMOKE_TEST }, async () => {
    //Act
    const res = await bookingRequests.getBookingById(1);

    //Assert
    expect(res.response.status()).toBe(200);

    const body: Booking = res.responseBody;
    expect(
      Date.parse(body.bookingdates.checkin),
      `Booking dates were ${JSON.stringify(body.bookingdates)}`
    ).toBeLessThan(Date.parse(body.bookingdates.checkout));
  });

  test('GET booking with non existing room', { tag: Tag.SMOKE_TEST }, async () => {
    //Act
    const res = await bookingRequests.getBookingById(99999);

    //Assert
    expect(res.response.status()).toBe(404);
    expect(res.responseBody, `Response was: ${JSON.stringify(res.responseBody)}`).toBe('Not Found');
  });
});
