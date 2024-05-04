import { test, expect, APIResponse } from '@playwright/test';
import exp from 'constants';

test.describe('POST /auth', () => {
  test('POST validate with valid credentials', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
  });

  test('POST validate without username', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        password: process.env.PASSWORD,
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate without password', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        username: process.env.USERNAME,
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate without username and password', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {},
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate without body', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {});

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate with invalid username', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        username: 'invalid',
        password: process.env.PASSWORD,
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate with invalid password', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        username: process.env.USERNAME,
        password: 'invalid',
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST validate with invalid username and password', async ({ request }) => {
    //Act
    const response: APIResponse = await request.post('/auth', {
      data: {
        username: 'invalid',
        password: 'invalid',
      },
    });

    //Assert
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.reason).toBe('Bad credentials');
  });
});
