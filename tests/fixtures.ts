import { test as base } from '@playwright/test';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';
import { Booking } from '@helpers/booking/booking-model';
import { DataFactory } from '@helpers/data/data-factory';

type MyFixtures = {
  bookingRequests: BookingRequests;
  validHeaders: RequestHeaders;
  invalidHeaders: RequestHeaders;
  bookingData: Booking;
  createdBookingId: number;
};

export const test = base.extend<MyFixtures>({
  bookingRequests: async ({}, use) => {
    await use(new BookingRequests());
  },
  validHeaders: async ({}, use) => {
    await use(await createHeaders());
  },
  invalidHeaders: async ({}, use) => {
    await use(await createInvalidHeaders());
  },
  bookingData: async ({}, use) => {
    await use(DataFactory.getBooking());
  },
  createdBookingId: async ({ bookingRequests, bookingData, validHeaders }, use) => {
    const res = await bookingRequests.createBooking(bookingData);
    const body = res.responseBody;
    const bookingId = body.bookingid;
    await use(bookingId);

    //Delete the booking after the test
    const response = await bookingRequests.getBookingById(bookingId);
    if (response.response.status() === 200) {
      await bookingRequests.deleteBooking(bookingId, validHeaders);
    }
  },
});

export { expect } from '@playwright/test';
