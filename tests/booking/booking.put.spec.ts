import { test, expect } from '@playwright/test';
import { Booking, BookingModel } from '@helpers/booking/booking-model';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';
import { DataFactory } from '@helpers/data/data-factory';

let bookingRequests: BookingRequests;
let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;
let createdBookings: number[] = [];
let bookingId: number;

test.describe('PUT /booking', () => {
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
      await bookingRequests.deleteBooking(bookingId, validHeaders);
    }
    createdBookings = [];
  });

  test('PUT booking', async () => {
    //Arrange
    const bookingData: Booking = DataFactory.getBooking();

    //Act
    const res = await bookingRequests.updateBooking(bookingId, bookingData, validHeaders);
    //Assert
    expect(res.response.status()).toBe(200);

    const booking: Booking = res.responseBody;
    expect(booking).toMatchObject(bookingData);

    await test.step('Verify booking was updated', async () => {
      const updatedBooking = await bookingRequests.getBookingById(bookingId);
      expect(updatedBooking.response.status()).toBe(200);
      expect(updatedBooking.responseBody).toMatchObject(bookingData);
    });
  });

  test('PUT booking with invalid credentials', async () => {
    //Arrange
    const bookingData: Booking = DataFactory.getBooking();
    //Act
    const res = await bookingRequests.updateBooking(bookingId, bookingData, invalidHeaders);
    //Assert
    expect(res.response.status()).toBe(403);
    expect(res.responseBody).toBe('Forbidden');
  });

  test('PUT booking with an id that does not exist', async () => {
    //Arrange
    const bookingData: Booking = DataFactory.getBooking();
    //Act
    const res = await bookingRequests.updateBooking(999999, bookingData, validHeaders);
    //Assert
    expect(res.response.status()).toBe(405);
    expect(res.responseBody).toBe('Method Not Allowed');
  });

  test('PUT booking without body', async () => {
    //Act
    const res = await bookingRequests.updateBooking(bookingId, undefined, validHeaders);
    //Assert
    expect(res.response.status()).toBe(400);
    expect(res.responseBody).toBe('Bad Request');
  });
});
