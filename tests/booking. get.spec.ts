import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';

let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;
let bookingResponse: BookingRequests;

test.describe('GET /booking', () => {
  test.beforeAll(async () => {
    validHeaders = await createHeaders();
    invalidHeaders = await createInvalidHeaders();
  });

  test.beforeEach(async () => {
    bookingResponse = new BookingRequests();
  });

  test('GET all bookings', async () => {
    //Act
    const response = await bookingResponse.getBookings();
    //Assert
    expect(response.status()).toBe(200);

    const body: Booking[] = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET booking for specific booking based upon the booking id provided', async () => {
    //Act
    const response = await bookingResponse.getBookingById(1);

    //Assert
    expect(response.status()).toBe(200);

    const body: Booking = await response.json();
    expect(Date.parse(body.bookingdates.checkin)).toBeLessThan(Date.parse(body.bookingdates.checkout));
  });

  test('GET booking with non existing room', async () => {
    //Act
    const response = await bookingResponse.getBookingById(99999);

    //Assert
    expect(response.status()).toBe(404);
    const body = await response.text();
    expect(body).toBe('Not Found');
  });
});
