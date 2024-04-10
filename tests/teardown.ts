import { test as teardown, expect } from '@playwright/test';

teardown('teardown everything', async ({ request }) => {
  console.log('teardown everything');
});
