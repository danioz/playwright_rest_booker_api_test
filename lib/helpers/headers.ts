import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';

export type RequestHeaders = {
  Cookie: string;
};

export async function createHeaders(): Promise<RequestHeaders> {
  const token = await createToken();

  return {
    Cookie: `token=${token}`,
  };
}

export async function createInvalidHeaders(): Promise<RequestHeaders> {
  return {
    Cookie: 'token=invalid',
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
