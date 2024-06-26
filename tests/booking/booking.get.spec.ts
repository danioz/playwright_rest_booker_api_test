import { test, expect } from '../fixtures';
import { Booking } from '@helpers/booking/booking-model';
import Tag from 'lib/tag';

test.describe('GET /booking', () => {
  test('GET all bookings', { tag: Tag.SMOKE_TEST }, async ({ bookingRequests }) => {
    //Act
    const res = await bookingRequests.getBookings();
    //Assert
    expect(res.response.status()).toBe(200);

    const body: Booking[] = res.responseBody;
    expect(body.length, `Response was: ${JSON.stringify(res.responseBody)}`).toBeGreaterThan(0);
  });

  test(
    'GET booking for specific booking based upon the booking id provided',
    { tag: Tag.SMOKE_TEST },
    async ({ bookingRequests }) => {
      //Act
      const res = await bookingRequests.getBookingById(1);

      //Assert
      expect(res.response.status()).toBe(200);

      const body: Booking = res.responseBody;
      expect(
        Date.parse(body.bookingdates.checkin),
        `Booking dates were ${JSON.stringify(body.bookingdates)}`
      ).toBeLessThan(Date.parse(body.bookingdates.checkout));
    }
  );

  test('GET booking with non existing room', { tag: Tag.SMOKE_TEST }, async ({ bookingRequests }) => {
    //Act
    const res = await bookingRequests.getBookingById(99999);

    //Assert
    expect(res.response.status()).toBe(404);
    expect(res.responseBody, `Response was: ${JSON.stringify(res.responseBody)}`).toBe('Not Found');
  });

  const bookingIds = [0, 99999, -1];
  for (const bookingId of bookingIds) {
    test(`GET booking with parametrized id: ${bookingId}`, { tag: Tag.SMOKE_TEST }, async ({ bookingRequests }) => {
      //Act
      const res = await bookingRequests.getBookingById(bookingId);

      //Assert
      expect(res.response.status()).toBe(404);
      expect(res.responseBody, `Response was: ${JSON.stringify(res.responseBody)}`).toBe('Not Found');
    });
  }
});
