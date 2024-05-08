import { test as base } from '@playwright/test';
import { BookingRequests } from '@helpers/booking/booking-requests';
import { RequestHeaders, createHeaders, createInvalidHeaders } from '@helpers/headers';

type MyFixtures = {
  bookingRequests: BookingRequests;
  validHeaders: RequestHeaders;
  invalidHeaders: RequestHeaders;
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
});

export { expect } from '@playwright/test';
