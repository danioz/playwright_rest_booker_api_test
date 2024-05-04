import { test, expect } from '@playwright/test';
import { Booking, BookingModel } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';

let bookingRequests: BookingRequests;
let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;
let createdBookings: number[] = [];
let bookingId: number;

test.describe('DELETE /booking', () => {
  test.beforeAll(async () => {
    validHeaders = await createHeaders();
    invalidHeaders = await createInvalidHeaders();
  });

  test.beforeEach(async () => {
    bookingRequests = new BookingRequests();

    const res = await bookingRequests.createBooking();
    const body: BookingModel = res.responseBody;
    bookingId = body.bookingid;
    createdBookings.push(bookingId);
  });

  test('DELETE booking', async () => {
    //Act
    const res = await bookingRequests.deleteBooking(bookingId, validHeaders);
    //Assert
    expect(res.status()).toBe(200);

    await test.step('Verify booking was deleted', async () => {
      const updatedBooking = await bookingRequests.getBookingById(bookingId);
      expect(updatedBooking.response.status()).toBe(404);
    });
  });
});
