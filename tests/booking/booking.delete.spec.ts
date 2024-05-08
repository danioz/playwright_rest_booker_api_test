import { test, expect } from '../fixtures';
import Tag from 'lib/tag';

test.describe('DELETE /booking', () => {
  test(
    'DELETE booking',
    { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] },
    async ({ bookingRequests, createdBookingId, validHeaders }) => {
      //Act
      const res = await bookingRequests.deleteBooking(createdBookingId, validHeaders);
      //Assert
      expect(res.status()).toBe(201);

      await test.step('Verify booking was deleted', async () => {
        const deletedBooking = await bookingRequests.getBookingById(createdBookingId);
        expect(deletedBooking.response.status()).toBe(404);
      });
    }
  );

  test(
    'DELETE booking without valid credentials',
    { tag: [Tag.SMOKE_TEST, Tag.REGRESSION_TEST] },
    async ({ bookingRequests, createdBookingId, invalidHeaders }) => {
      //Act
      const res = await bookingRequests.deleteBooking(createdBookingId, invalidHeaders);
      //Assert
      expect(res.status()).toBe(403);
    }
  );
});
