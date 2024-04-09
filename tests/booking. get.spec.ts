import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
import { ErrorResponse, Error } from '@helpers/error-model';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';

let validHeaders: RequestHeaders;
let invalidHeaders: RequestHeaders;

test.beforeAll(async () => {
  validHeaders = await createHeaders();
  invalidHeaders = await createInvalidHeaders();
});

test('GET all bookings', async ({ request }) => {
  //Act
  const response = await request.get('/booking');

  //Assert
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);

  // body.bookings.forEach((booking) => {
  // expect(Date.parse(booking.bookingDates.checkin)).toBeLessThan(Date.parse(booking.bookingDates.checkout));
  // });
});

test('GET booking for specific booking based upon the booking id provided', async ({ request }) => {
  // todo: dynamic booking data so no need to hardcode the expected booking
  
  
  // //Arrange
  // const expectedBooking: Booking = {
  //   firstname: 'Sally',
  //   lastname: 'Ericsson',
  //   totalprice: 299,
  //   depositpaid: true,
  //   bookingdates: {
  //     checkin: '2019-08-16',
  //     checkout: '2023-08-27',
  //   },
  //   additionalneeds: 'Breakfast',
  // };

  //Act
  const response = await request.get('booking/1');

  //Assert
  expect(response.status()).toBe(200);

  const body: Booking = await response.json();
  // expect(body).toEqual(expect.objectContaining(expectedBooking));
  expect(Date.parse(body.bookingdates.checkin)).toBeLessThan(Date.parse(body.bookingdates.checkout));
  
  console.log(body);
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

// test('GET all bookings', async ({ request }) => {
//   //Act
//   const response = await request.get('booking/', { headers: validHeaders });

//   //Assert
//   expect(response.status()).toBe(200);

//   console.log(response);
// });

test('GET all bookings without authentication', async ({ request }) => {
  //Act
  const response = await request.get('booking/');

  //Assert
  expect(response.status()).toBe(403);
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
