import { test, expect } from '@playwright/test';

test('final review after fixes', async ({ page }) => {
  // Set longer timeout for this test
  test.setTimeout(60000);
  
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  
  // Check navigation bar exists
  const nav = await page.locator('nav').first();
  expect(await nav.isVisible()).toBeTruthy();
  console.log('✓ Navigation bar is visible');
  
  // Check navigation links
  const toolsLink = await page.locator('a[href="/tools"]').first();
  const blogLink = await page.locator('a[href="/blog"]').first();
  const aboutLink = await page.locator('a[href="/about"]').first();
  
  expect(await toolsLink.isVisible()).toBeTruthy();
  expect(await blogLink.isVisible()).toBeTruthy();
  expect(await aboutLink.isVisible()).toBeTruthy();
  console.log('✓ Navigation links are visible');
  
  // Check GitHub link
  const githubLink = await page.locator('a[href="https://github.com/falses00/mimo-tools"]').first();
  expect(await githubLink.isVisible()).toBeTruthy();
  console.log('✓ GitHub link points to correct repository');
  
  // Check favicon
  const favicon = await page.locator('link[rel="icon"]').first();
  const faviconHref = await favicon.getAttribute('href');
  expect(faviconHref).toContain('favicon.svg');
  console.log('✓ Favicon is properly linked');
  
  // Navigate to tools page using navigation
  await toolsLink.click();
  await page.waitForURL('**/tools');
  console.log('✓ Navigation to tools page works');
  
  // Navigate back to home
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  
  // Navigate to blog page
  const blogLink2 = await page.locator('a[href="/blog"]').first();
  await blogLink2.click();
  await page.waitForURL('**/blog');
  console.log('✓ Navigation to blog page works');
  
  // Navigate to about page
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  const aboutLink2 = await page.locator('a[href="/about"]').first();
  await aboutLink2.click();
  await page.waitForURL('**/about');
  console.log('✓ Navigation to about page works');
  
  // Check for 404 errors
  const failedRequests: string[] = [];
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.url()} - ${response.status()}`);
    }
  });
  
  await page.goto('https://falses00.github.io/mimo-tools/');
  await page.waitForLoadState('networkidle');
  
  if (failedRequests.length === 0) {
    console.log('✓ No 404 errors found');
  } else {
    console.log('⚠ Some requests failed:', failedRequests);
  }
  
  // Take final screenshot
  await page.screenshot({ path: 'final-review.png', fullPage: true });
  console.log('✓ Final screenshot taken');
});