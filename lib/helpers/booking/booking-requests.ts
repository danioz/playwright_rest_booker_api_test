import { APIResponse } from '@playwright/test';
import { BookingClient } from './booking-client';

export class BookingRequests {
  private static client: BookingClient = new BookingClient();

  static async getBookings(): Promise<APIResponse> {
    const client = await this.client.getClient();
    return await client.get('/booking');
  }

  static async getBookingById(bookingId: number): Promise<APIResponse> {
    const client = await this.client.getClient();
    return await client.get(`/booking/${bookingId}`);
  }
}
