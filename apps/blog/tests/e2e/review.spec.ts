import { test, expect } from '@playwright/test';

test.describe('MIMO Local Site Review', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
  });

  test('Homepage - Full Review', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ path: 'review/homepage-desktop.png', fullPage: true });
    
    // Check title
    const title = await page.title();
    console.log('✅ Page Title:', title);
    
    // Check hero section
    const hero = page.locator('h1');
    const heroText = await hero.textContent();
    console.log('✅ Hero Text:', heroText);
    
    // Check navigation
    const navLinks = await page.locator('nav a').count();
    console.log('✅ Navigation Links:', navLinks);
    
    // Check featured tools
    const toolCards = await page.locator('[href^="/tools/"]').count();
    console.log('✅ Featured Tool Cards:', toolCards);
    
    // Check footer
    const footer = page.locator('footer');
    const footerVisible = await footer.isVisible();
    console.log('✅ Footer Visible:', footerVisible);
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'review/homepage-mobile.png', fullPage: true });
    console.log('✅ Mobile Screenshot Taken');
  });

  test('Tools Page - Full Review', async ({ page }) => {
    await page.goto('/tools');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/tools-page.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Tools Page Title:', title);
    
    // Count all tool cards
    const toolCards = await page.locator('a[href^="/tools/"]').count();
    console.log('✅ Total Tool Cards:', toolCards);
    
    // Check category filters
    const categoryBtns = await page.locator('button').count();
    console.log('✅ Category Buttons:', categoryBtns);
    
    // Check search input
    const searchInput = page.locator('#search-input');
    const searchVisible = await searchInput.isVisible();
    console.log('✅ Search Input Visible:', searchVisible);
  });

  test('JSON Formatter Tool - Review', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/json-formatter.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ JSON Formatter Title:', title);
    
    // Check input textarea
    const input = page.locator('#input-json');
    console.log('✅ Input Textarea Visible:', await input.isVisible());
    
    // Check buttons
    const formatBtn = page.locator('#btn-format');
    console.log('✅ Format Button Visible:', await formatBtn.isVisible());
    
    // Test formatting
    await input.fill('{"name":"test","value":123,"nested":{"key":"value"}}');
    await formatBtn.click();
    await page.waitForTimeout(300);
    
    const output = page.locator('#output-json');
    const outputValue = await output.inputValue();
    console.log('✅ Output Generated:', outputValue.length > 0);
    
    await page.screenshot({ path: 'review/json-formatter-formatted.png', fullPage: true });
  });

  test('Text Utilities Tool - Review', async ({ page }) => {
    await page.goto('/tools/text-utilities');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/text-utilities.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Text Utilities Title:', title);
    
    // Test uppercase conversion
    const input = page.locator('#input-text');
    await input.fill('hello world\nfoo bar\nbaz qux');
    
    const uppercaseBtn = page.locator('#btn-uppercase');
    await uppercaseBtn.click();
    await page.waitForTimeout(300);
    
    const output = page.locator('#output-text');
    const outputValue = await output.inputValue();
    console.log('✅ Uppercase Conversion:', outputValue.includes('HELLO WORLD'));
    
    // Check statistics
    const charCount = page.locator('#stat-chars');
    const charText = await charCount.textContent();
    console.log('✅ Character Count:', charText);
    
    await page.screenshot({ path: 'review/text-utilities-processed.png', fullPage: true });
  });

  test('URL Encoder Tool - Review', async ({ page }) => {
    await page.goto('/tools/url-encoder');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/url-encoder.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ URL Encoder Title:', title);
    
    // Test encoding
    const input = page.locator('#input-url');
    await input.fill('https://example.com/path?name=hello world&lang=zh-CN');
    
    const encodeBtn = page.locator('#btn-encode');
    await encodeBtn.click();
    await page.waitForTimeout(300);
    
    const output = page.locator('#output-url');
    const outputValue = await output.inputValue();
    console.log('✅ URL Encoded:', outputValue.includes('%'));
    
    // Test query parsing
    const parseBtn = page.locator('#btn-parse-query');
    await parseBtn.click();
    await page.waitForTimeout(300);
    
    await page.screenshot({ path: 'review/url-encoder-parsed.png', fullPage: true });
  });

  test('Blog Page - Review', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/blog-page.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Blog Page Title:', title);
    
    // Count blog posts
    const blogCards = await page.locator('a[href^="/blog/"]').count();
    console.log('✅ Blog Posts Count:', blogCards);
  });

  test('Blog Post - Review', async ({ page }) => {
    await page.goto('/blog/why-mimo');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/blog-post.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Blog Post Title:', title);
    
    // Check content
    const headings = await page.locator('h1, h2, h3').count();
    console.log('✅ Content Headings:', headings);
  });

  test('About Page - Review', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/about-page.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ About Page Title:', title);
    
    const content = page.locator('main');
    const contentText = await content.textContent() || '';
    console.log('✅ About Page Has Content:', contentText.length > 100);
  });

  test('Color Palette Tool - Review', async ({ page }) => {
    await page.goto('/tools/color-palette');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/color-palette.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Color Palette Title:', title);
  });

  test('Regex Tester Tool - Review', async ({ page }) => {
    await page.goto('/tools/regex-tester');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/regex-tester.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Regex Tester Title:', title);
  });

  test('Timestamp Converter Tool - Review', async ({ page }) => {
    await page.goto('/tools/timestamp-converter');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/timestamp-converter.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ Timestamp Converter Title:', title);
    
    // Check current time display
    const currentTimestamp = page.locator('#current-timestamp-seconds');
    const timestampText = await currentTimestamp.textContent();
    console.log('✅ Current Timestamp:', timestampText);
  });

  test('UUID Generator Tool - Review', async ({ page }) => {
    await page.goto('/tools/uuid-generator');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'review/uuid-generator.png', fullPage: true });
    
    const title = await page.title();
    console.log('✅ UUID Generator Title:', title);
    
    // Test UUID generation
    const generateBtn = page.locator('#btn-generate');
    await generateBtn.click();
    await page.waitForTimeout(300);
    
    const output = page.locator('#uuid-output');
    const outputValue = await output.inputValue();
    console.log('✅ UUID Generated:', outputValue.length > 0);
    console.log('✅ UUID Format:', outputValue.includes('-'));
    
    await page.screenshot({ path: 'review/uuid-generator-generated.png', fullPage: true });
  });

  test('Dark Mode Toggle - Review', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check initial theme
    const html = page.locator('html');
    const hasDarkClass = await html.evaluate(el => el.classList.contains('dark'));
    console.log('✅ Initial Dark Mode:', hasDarkClass);
    
    // Toggle theme
    const themeToggle = page.locator('#theme-toggle');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      const hasDarkClassAfter = await html.evaluate(el => el.classList.contains('dark'));
      console.log('✅ After Toggle Dark Mode:', hasDarkClassAfter);
      
      await page.screenshot({ path: 'review/homepage-light-mode.png', fullPage: true });
      
      // Toggle back
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('Responsive Design - Review', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'review/responsive-desktop.png', fullPage: true });
    console.log('✅ Desktop Screenshot Taken');
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'review/responsive-tablet.png', fullPage: true });
    console.log('✅ Tablet Screenshot Taken');
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'review/responsive-mobile.png', fullPage: true });
    console.log('✅ Mobile Screenshot Taken');
  });

  test('Console Errors Check', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter non-critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('404') &&
      !e.includes('Failed to load resource')
    );
    
    console.log('✅ Total Console Errors:', errors.length);
    console.log('✅ Critical Errors:', criticalErrors.length);
    
    if (criticalErrors.length > 0) {
      console.log('⚠️ Critical Errors:', criticalErrors);
    }
  });
});