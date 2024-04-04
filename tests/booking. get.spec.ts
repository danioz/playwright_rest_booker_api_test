import { test, expect } from '@playwright/test';
import { Summary, BookingDates, CreatedBooking } from '@helpers/booking/booking-model';
import { ErrorResponse, Error } from '@helpers/error-model';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';

let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;

test.beforeAll(async () => {
  validHeaders = await createHeaders();
  invalidHeaders = await createInvalidHeaders();
});

test('GET booking summary for a room', async ({ request }) => {
  //Act
  const response = await request.get('booking/summary', { params: { roomid: 1 } });

  //Assert
  expect(response.status()).toBe(200);

  const summaryBody: Summary = await response.json();
  expect(summaryBody.bookings.length).toBeGreaterThanOrEqual(1);

  summaryBody.bookings.forEach((booking) => {
    expect(Date.parse(booking.bookingDates.checkin)).toBeLessThan(Date.parse(booking.bookingDates.checkout));
  });
});

test('GET booking summary for a non-existing room', async ({ request }) => {
  //Act
  const response = await request.get('booking/summary', { params: { roomid: 999999 } });

  //Assert
  expect(response.status()).toBe(200);

  const summaryBody: Summary = await response.json();
  expect(summaryBody.bookings.length).toBe(0);
});

test('GET booking summary with None roomid', async ({ request }) => {
  //Arrange
  const expectedError: ErrorResponse = {
    status: 500,
    error: 'Internal Server Error',
    path: '/booking/summary',
  };

  //Act
  const response = await request.get('booking/summary', { params: { roomid: NaN } });

  //Assert
  expect(response.status()).toBe(500);

  const errorBody: ErrorResponse = await response.json();
  expect(errorBody).toEqual(expect.objectContaining(expectedError));
});

test('GET booking summary without roomid', async ({ request }) => {
  //Arrange
  const expectedError: ErrorResponse = {
    status: 400,
    error: 'Bad Request',
    path: '/booking/summary',
  };

  //Act
  const response = await request.get('booking/summary');

  //Assert
  expect(response.status()).toBe(400);

  const errorBody: ErrorResponse = await response.json();
  expect(errorBody).toEqual(expect.objectContaining(expectedError));
});

test('GET all bookings without authentication', async ({ request }) => {
  //Act
  const response = await request.get('booking/');

  //Assert
  expect(response.status()).toBe(403);

  console.log(response);
});

test('GET booking details without authentication', async ({ request }) => {
  //Act
  const response = await request.get('booking/', { params: { roomid: 1 }, headers: invalidHeaders });

  //Assert
  expect(response.status()).toBe(403);
});

test('GET booking by id details without authentication', async ({ request }) => {
  //Act
  const response = await request.get('booking/1', { headers: invalidHeaders });

  //Assert
  expect(response.status()).toBe(403);
});
