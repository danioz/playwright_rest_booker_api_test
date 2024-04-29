import { APIResponse } from '@playwright/test';
import { BookingClient } from './booking-client';
import { Booking } from '@helpers/booking/booking-model';

export class BookingRequests {

  async getBookings(): Promise<APIResponse> {
    const client = await new BookingClient().getClient();
    return await client.get('/booking');
  }

  async getBookingById(bookingId: number): Promise<APIResponse> {
    const client = await new BookingClient().getClient();
    return await client.get(`/booking/${bookingId}`);
  }
}
