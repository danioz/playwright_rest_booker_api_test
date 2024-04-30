import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';

let bookingRequests: BookingRequests;

test.describe('GET /booking', () => {
  test.beforeEach(async () => {
    bookingRequests = new BookingRequests();
  });

  test('GET all bookings', async () => {
    //Act
    const response = await bookingRequests.getBookings();
    //Assert
    expect(response.response.status()).toBe(200);
    const body: Booking[] = response.responseBody;
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET booking for specific booking based upon the booking id provided', async () => {
    //Act
    const response = await bookingRequests.getBookingById(1);

    //Assert
    expect(response.response.status()).toBe(200);
    const body: Booking = response.responseBody;
    expect(Date.parse(body.bookingdates.checkin)).toBeLessThan(Date.parse(body.bookingdates.checkout));
  });

  test('GET booking with non existing room', async () => {
    //Act
    const response = await bookingRequests.getBookingById(99999);

    //Assert
    expect(response.response.status()).toBe(404);
    expect(response.responseBody).toBe('Not Found');
  });
});
