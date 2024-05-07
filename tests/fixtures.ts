import {test as base } from '@playwright/test'
import { BookingRequests } from '@helpers/booking/booking-requests'

export const test = base.extend<{ bookingRequests: BookingRequests }>({
    bookingRequests: async ({}, use) => {
        // const bookingRequests = new BookingRequests()
        await use(new BookingRequests())
    },
    })

export { expect } from '@playwright/test';