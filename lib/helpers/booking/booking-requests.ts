import { APIResponse } from '@playwright/test';
import { BookingClient } from './booking-client';
import { DataFactory } from '@helpers/data/data-factory';
import { Booking } from './booking-model';
import { RequestHeaders } from '@helpers/headers';

export class BookingRequests {
  async getBookings() {
    const client = await new BookingClient().getClient();
    const response = await client.get('/booking');
    const responseBody = await getResponseBody(response);

    return { response, responseBody };
  }

  async getBookingById(bookingId: number) {
    const client = await new BookingClient().getClient();
    const response = await client.get(`/booking/${bookingId}`);
    const responseBody = await getResponseBody(response);

    return { response, responseBody };
  }

  async createBooking(bookingData?: Booking) {
    if (!bookingData) {
      bookingData = DataFactory.getBooking();
    }
    const client = await new BookingClient().getClient();
    const response = await client.post('/booking', { data: bookingData });
    const responseBody = await getResponseBody(response);

    return { response, responseBody };
  }

  async deleteBooking(bookingId: number, headers: RequestHeaders) {
    const client = await new BookingClient().getClient();
    return await client.delete(`/booking/${bookingId}`, { headers: headers });
  }

  async updateBooking(bookingId: number, bookingData?: Booking, headers?: RequestHeaders) {
    const client = await new BookingClient().getClient();
    const response = await client.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers: { ...headers, Accept: 'application/json' },
    });
    const responseBody = await getResponseBody(response);

    return { response, responseBody };
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
