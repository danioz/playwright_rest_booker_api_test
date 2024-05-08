import { test, expect } from '../fixtures';
import { BookingModel, Booking } from '@helpers/booking/booking-model';
import { DataFactory } from '@helpers/data/data-factory';
import Tag from 'lib/tag';

test.describe('e2e tests for booking', () => {
  test(
    'e2e tests for booking',
    { tag: [Tag.REGRESSION_TEST, Tag.SANITY_TEST, Tag.END_TO_END_TEST] },
    async ({ bookingRequests, validHeaders }) => {
      const bookingId = await test.step('Create a booking', async () => {
        //Arrange
        const bookingData: Booking = DataFactory.getBooking();
        //Act
        const res = await bookingRequests.createBooking(bookingData);
        //Assert
        expect(res.response.status()).toBe(200);
        const body: BookingModel = res.responseBody;
        expect(body.bookingid).not.toBeNull();

        const booking: Booking = body.booking;
        expect(booking).toMatchObject(bookingData);
        return res.responseBody.bookingid;
      });

      await test.step('Get booking by id', async () => {
        //Act
        const res = await bookingRequests.getBookingById(bookingId);
        //Assert
        expect(res.response.status()).toBe(200);
        const body: Booking = res.responseBody;
        expect(
          Date.parse(body.bookingdates.checkin),
          `Booking dates were ${JSON.stringify(body.bookingdates)}`
        ).toBeLessThan(Date.parse(body.bookingdates.checkout));
      });

      await test.step('Update booking', async () => {
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

      await test.step('Delete booking', async () => {
        //Act
        const res = await bookingRequests.deleteBooking(bookingId, validHeaders);
        //Assert
        expect(res.status()).toBe(201);

        await test.step('Verify booking was deleted', async () => {
          const deletedBooking = await bookingRequests.getBookingById(bookingId);
          expect(deletedBooking.response.status()).toBe(404);
        });
      });
    }
  );
});
