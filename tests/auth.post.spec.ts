import { test, expect } from '@playwright/test';

test('POST validate', async ({ request }) => {
  const response = await request.post('/auth/validate');

  expect(response.ok()).toBeTruthy();
});

test('POST login', async ({ request }) => {
  const response = await request.post('/auth/login');

  expect(response.ok()).toBeTruthy();
});

test('POST logout', async ({ request }) => {
  const response = await request.post('/auth/logout');

  expect(response.ok()).toBeTruthy();
});
