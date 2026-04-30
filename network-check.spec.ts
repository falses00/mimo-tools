import { test, expect } from '@playwright/test';

test('check for 404 errors and network issues', async ({ page }) => {
  const failedRequests: string[] = [];
  
  page.on('requestfailed', request => {
    failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.url()} - ${response.status()}`);
    }
  });
  
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  
  if (failedRequests.length > 0) {
    console.log('Failed requests:');
    failedRequests.forEach(req => console.log('  -', req));
  } else {
    console.log('No failed requests found');
  }
  
  // Check for broken links
  const links = await page.locator('a[href]').all();
  console.log(`Found ${links.length} links`);
  
  for (const link of links.slice(0, 5)) { // Check first 5 links
    const href = await link.getAttribute('href');
    if (href && href.startsWith('http')) {
      try {
        const response = await page.request.get(href);
        console.log(`Link ${href}: ${response.status()}`);
      } catch (error) {
        console.log(`Link ${href}: failed to fetch`);
      }
    }
  }
});