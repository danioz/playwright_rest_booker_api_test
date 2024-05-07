import { APIRequestContext, APIResponse, expect, request, test } from '@playwright/test';

export type RequestHeaders = {
  Cookie: string;
};

export async function createHeaders(): Promise<RequestHeaders> {
  return await test.step('Create headers', async () => {
    const token = await createToken();

    return {
      Cookie: `token=${token}`,
    };
  });
}

export async function createInvalidHeaders(): Promise<RequestHeaders> {
  return await test.step('Create invalid headers', async () => {
    return {
      Cookie: 'token=invalid',
    };
  });
}

type TokenResponse = {
  token: string;
};

async function createToken(): Promise<string> {
  return await test.step('Create token', async () => {
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
  });
}
