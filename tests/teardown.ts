import { test as teardown } from '@playwright/test';

teardown('teardown everything', async ({ request }) => {
  console.log('teardown everything');
});
