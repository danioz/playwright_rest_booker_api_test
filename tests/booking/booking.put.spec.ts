import { test, expect } from '../fixtures';
import { Booking, BookingModel } from '@helpers/booking/booking-model';
import Tag from 'lib/tag';

test.describe('PUT /booking', () => {
  test(
    'PUT booking',
    { tag: Tag.SMOKE_TEST },
    async ({ bookingRequests, bookingData, validHeaders, createdBookingId }) => {
      //Act
      const res = await bookingRequests.updateBooking(createdBookingId, bookingData, validHeaders);

      //Assert
      expect(res.response.status()).toBe(200);

      const booking: Booking = res.responseBody;
      expect(booking).toMatchObject(bookingData);

      await test.step('Verify booking was updated', async () => {
        const updatedBooking = await bookingRequests.getBookingById(createdBookingId);
        expect(updatedBooking.response.status()).toBe(200);
        expect(updatedBooking.responseBody).toMatchObject(bookingData);
      });
    }
  );

  test(
    'PUT booking with invalid credentials',
    { tag: Tag.SMOKE_TEST },
    async ({ bookingRequests, bookingData, invalidHeaders, createdBookingId }) => {
      //Act
      const res = await bookingRequests.updateBooking(createdBookingId, bookingData, invalidHeaders);
      //Assert
      expect(res.response.status()).toBe(403);
      expect(res.responseBody).toBe('Forbidden');
    }
  );

  test(
    'PUT booking with an id that does not exist',
    { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] },
    async ({ bookingRequests, bookingData, validHeaders }) => {
      //Act
      const res = await bookingRequests.updateBooking(999999, bookingData, validHeaders);
      //Assert
      expect(res.response.status()).toBe(405);
      expect(res.responseBody).toBe('Method Not Allowed');
    }
  );

  test(
    'PUT booking without body',
    { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] },
    async ({ bookingRequests, createdBookingId, validHeaders }) => {
      //Act
      const res = await bookingRequests.updateBooking(createdBookingId, undefined, validHeaders);
      //Assert
      expect(res.response.status()).toBe(400);
      expect(res.responseBody).toBe('Bad Request');
    }
  );
});
