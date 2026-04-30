import { test, expect } from '@playwright/test';

test('MIMO Site - Comprehensive Review', async ({ page }) => {
  test.setTimeout(120000);
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Check page structure
  console.log('\n========== HOMEPAGE STRUCTURE ==========');
  
  // Header
  const header = page.locator('header, nav').first();
  console.log('✅ Header exists:', await header.isVisible());
  
  // Hero section
  const h1 = page.locator('h1');
  console.log('✅ H1 text:', await h1.textContent());
  
  // Navigation links
  const navLinks = await page.locator('nav a').allTextContents();
  console.log('✅ Nav links:', navLinks.join(', '));
  
  // Featured tools
  const toolCards = await page.locator('[href^="/tools/"]').count();
  console.log('✅ Tool cards:', toolCards);
  
  // Footer
  const footer = page.locator('footer');
  console.log('✅ Footer exists:', await footer.isVisible());
  
  // Check CSS variables
  console.log('\n========== DESIGN TOKENS ==========');
  const bgColor = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });
  console.log('✅ Background color:', bgColor);
  
  const textColor = await page.evaluate(() => {
    return getComputedStyle(document.body).color;
  });
  console.log('✅ Text color:', textColor);
  
  // Check responsive classes
  console.log('\n========== RESPONSIVE CHECK ==========');
  const container = page.locator('.container, .max-w-7xl').first();
  const containerWidth = await container.evaluate(el => el.getBoundingClientRect().width);
  console.log('✅ Container width:', containerWidth);
  
  // Check tools page
  console.log('\n========== TOOLS PAGE ==========');
  await page.goto('/tools');
  await page.waitForLoadState('networkidle');
  
  const toolsH1 = await page.locator('h1').textContent();
  console.log('✅ Tools page H1:', toolsH1);
  
  const toolCount = await page.locator('a[href^="/tools/"]').count();
  console.log('✅ Total tools:', toolCount);
  
  // List all tools
  const toolNames = await page.locator('a[href^="/tools/"] h3, a[href^="/tools/"] .text-lg').allTextContents();
  console.log('✅ Tool names:', toolNames.join(', '));
  
  // Check blog page
  console.log('\n========== BLOG PAGE ==========');
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  
  const blogH1 = await page.locator('h1').textContent();
  console.log('✅ Blog page H1:', blogH1);
  
  const blogCount = await page.locator('a[href^="/blog/"]').count();
  console.log('✅ Blog posts:', blogCount);
  
  // Check individual tool pages
  console.log('\n========== TOOL PAGES CHECK ==========');
  const toolPaths = [
    '/tools/json-formatter',
    '/tools/text-utilities',
    '/tools/url-encoder',
    '/tools/base64-tool',
    '/tools/timestamp-converter',
    '/tools/uuid-generator',
    '/tools/markdown-previewer',
    '/tools/regex-tester',
    '/tools/cron-helper',
    '/tools/color-palette'
  ];
  
  for (const path of toolPaths) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent();
    console.log(`✅ ${path}: ${h1}`);
  }
  
  // Check dark mode
  console.log('\n========== DARK MODE CHECK ==========');
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const themeToggle = page.locator('#theme-toggle');
  if (await themeToggle.isVisible()) {
    console.log('✅ Theme toggle found');
    
    // Check initial state
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log('✅ Initial dark mode:', isDark);
    
    // Toggle
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const isDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    console.log('✅ After toggle dark mode:', isDarkAfter);
  }
  
  // Performance check
  console.log('\n========== PERFORMANCE CHECK ==========');
  const performanceTiming = await page.evaluate(() => {
    const timing = performance.timing;
    return {
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    };
  });
  console.log('✅ Load time:', performanceTiming.loadTime, 'ms');
  console.log('✅ DOMContentLoaded:', performanceTiming.domContentLoaded, 'ms');
  
  console.log('\n========== REVIEW COMPLETE ==========');
});