import { APIResponse } from '@playwright/test';
import { BookingClient } from './booking-client';
import { DataFactory } from '@helpers/data/data-factory';
import { Booking } from './booking-model';

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
