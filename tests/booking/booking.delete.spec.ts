import { test, expect } from '@playwright/test';
import { BookingModel } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';
import Tag from 'lib/tag';

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

  test.afterAll(async () => {
    for (const bookingId of createdBookings) {
      const res = await bookingRequests.getBookingById(bookingId);
      if (res.response.status() === 200) {
        await bookingRequests.deleteBooking(bookingId, validHeaders);
      }
    }
    createdBookings = [];
  });

  test('DELETE booking', { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] }, async () => {
    //Act
    const res = await bookingRequests.deleteBooking(bookingId, validHeaders);
    //Assert
    expect(res.status()).toBe(201);

    await test.step('Verify booking was deleted', async () => {
      const deletedBooking = await bookingRequests.getBookingById(bookingId);
      expect(deletedBooking.response.status()).toBe(404);
    });
  });

  test('DELETE booking without valid credentials', { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] }, async () => {
    //Act
    const res = await bookingRequests.deleteBooking(bookingId, invalidHeaders);
    //Assert
    expect(res.status()).toBe(403);
  });
});
