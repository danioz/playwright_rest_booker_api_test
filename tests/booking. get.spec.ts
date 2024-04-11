import { test, expect } from '@playwright/test';
import { Booking } from '@helpers/booking/booking-model';
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

  const body: Booking[] = await response.json();
  expect(body.length).toBeGreaterThan(0);
});

test('GET booking for specific booking based upon the booking id provided', async ({ request }) => {
  //Act
  const response = await request.get('booking/1');

  //Assert
  expect(response.status()).toBe(200);

  const body: Booking = await response.json();
  expect(Date.parse(body.bookingdates.checkin)).toBeLessThan(Date.parse(body.bookingdates.checkout));
});

test('GET booking summary with non existing room', async ({ request }) => {
  //Act
  const response = await request.get('booking/99999');
  
  //Assert
  expect(response.status()).toBe(404);
});
