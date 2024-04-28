import { APIRequestContext, request } from '@playwright/test';

export class BookingClient {
  private clientInstance!: APIRequestContext;

  async getClient(): Promise<APIRequestContext> {
    this.clientInstance = this.clientInstance ? this.clientInstance : await this.initialize();
    return this.clientInstance;
  }

  private initialize = async () => {
    return await request.newContext();
  };
}
