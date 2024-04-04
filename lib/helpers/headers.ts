import { expect, request } from '@playwright/test';

export type RequestHeaders = {
  cookie: string;
};

export async function createHeaders(): Promise<RequestHeaders> {
  const contextRequest = await request.newContext();
  const response = await contextRequest.post('auth/login', {
    data: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  });

  expect(response.status()).toBe(200);
  const headers = response.headers();
  const tokenString = headers['set-cookie'].split(':')[0];
  const token = tokenString.split('=')[1];

  return {
    cookie: `cookie=${token}`,
  };
}

export async function createInvalidHeaders(): Promise<RequestHeaders> {
  return {
    cookie: 'cookie=invalid',
  };
}
