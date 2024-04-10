import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';

export type RequestHeaders = {
  cookie: string;
};

export async function createHeaders(): Promise<RequestHeaders> {
  const token = await createToken();

  return {
    cookie: `cookie=${token}`,
  };
}

export async function createInvalidHeaders(): Promise<RequestHeaders> {
  return {
    cookie: 'cookie=invalid',
  };
}

type TokenResponse = {
  token: string;
};

async function createToken(): Promise<string> {
  const contextRequest: APIRequestContext = await request.newContext();
  const response: APIResponse = await contextRequest.post('auth', {
    data: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  });

  expect(response.status()).toBe(200);
  const body: TokenResponse = await response.json();
  return body.token;
}
