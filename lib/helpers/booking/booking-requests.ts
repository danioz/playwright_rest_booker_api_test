import { APIResponse, test } from '@playwright/test';
import { BookingClient } from './booking-client';
import { DataFactory } from '@helpers/data/data-factory';
import { Booking } from './booking-model';
import { RequestHeaders } from '@helpers/headers';
import endpoints from '@helpers/apiEndpoints';

export class BookingRequests {
  async getBookings() {
    return await test.step('GET all bookings', async () => {
      const client = await new BookingClient().getClient();
      const response = await client.get(endpoints.booking.booking);
      const responseBody = await getResponseBody(response);

      return { response, responseBody };
    });
  }

  async getBookingById(bookingId: number) {
    return await test.step(`GET booking for specific booking based upon the booking id provided: ${bookingId}`, async () => {
      const client = await new BookingClient().getClient();
      const response = await client.get(endpoints.booking.bookingId(bookingId));
      const responseBody = await getResponseBody(response);

      return { response, responseBody };
    });
  }

  async createBooking(bookingData?: Booking) {
    if (!bookingData) {
      bookingData = DataFactory.getBooking();
    }
    return await test.step(`POST new booking with body: ${JSON.stringify(bookingData)}`, async () => {
      const client = await new BookingClient().getClient();
      const response = await client.post(endpoints.booking.booking, { data: bookingData });
      const responseBody = await getResponseBody(response);

      return { response, responseBody };
    });
  }

  async deleteBooking(bookingId: number, headers: RequestHeaders) {
    return test.step(`DELETE booking with booking id: ${bookingId}`, async () => {
      const client = await new BookingClient().getClient();
      return await client.delete(endpoints.booking.bookingId(bookingId), { headers: headers });
    });
  }

  async updateBooking(bookingId: number, bookingData?: Booking, headers?: RequestHeaders) {
    return await test.step(`PUT booking with body: ${JSON.stringify(bookingData)}`, async () => {
      const client = await new BookingClient().getClient();
      const response = await client.put(endpoints.booking.bookingId(bookingId), {
        data: bookingData,
        headers: { ...headers, Accept: 'application/json' },
      });
      const responseBody = await getResponseBody(response);

      return { response, responseBody };
    });
  }

  async patchBooking(bookingId: number, bookingData: any, headers?: RequestHeaders) {
    return await test.step(`PATCH booking with body: ${JSON.stringify(bookingData)}`, async () => {
      const client = await new BookingClient().getClient();
      const response = await client.patch(endpoints.booking.bookingId(bookingId), {
        data: bookingData,
        headers: { ...headers, Accept: 'application/json' },
      });
      const responseBody = await getResponseBody(response);

      return { response, responseBody };
    });
  }
}

const getResponseBody = async (response: APIResponse): Promise<any> => {
  let responseBody = await response.text();
  if (responseBody) {
    try {
      responseBody = await response.json();
    } catch {
      console.error('JSON parsing failed. Returning response body as text.');
    }
  }
  return responseBody;
};
