import { test, expect } from '../fixtures';
import { Booking } from '@helpers/booking/booking-model';
import Tag from 'lib/tag';

test.describe('PATCH /booking', () => {
  test(
    'PATCH booking',
    { tag: Tag.SMOKE_TEST },
    async ({ bookingRequests, bookingData, validHeaders, createdBookingId }) => {
      const createBooking = await bookingRequests.createBooking(bookingData);
      const createdBookingBody = createBooking.responseBody.booking;

      const bodyToPatch = {
        firstname: 'John',
        lastname: 'Doe',
      };

      const patchedBookingBody = { ...createdBookingBody, ...bodyToPatch };

      //Act
      const res = await bookingRequests.patchBooking(createdBookingId, bodyToPatch, validHeaders);

      //Assert
      expect(res.response.status()).toBe(200);

      const booking: Booking = res.responseBody;
      expect(booking).toMatchObject(patchedBookingBody);

      await test.step('Verify booking was updated', async () => {
        const updatedBooking = await bookingRequests.getBookingById(createdBookingId);
        expect(updatedBooking.response.status()).toBe(200);
        expect(updatedBooking.responseBody).toMatchObject(patchedBookingBody);
      });
    }
  );
});
