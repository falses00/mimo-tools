---
name: playwright-visual-qa
description: 使用 Playwright 启动本地站点、检查页面、截图或 accessibility snapshot、验证关键路径
compatibility: opencode
---

# Playwright Visual QA Skill

## What I do
I use Playwright to test web applications visually, capture screenshots, validate accessibility, and ensure UI components work correctly across different viewports.

## When to use me
- After implementing new UI components
- Before deploying to production
- When testing responsive design
- When validating accessibility compliance
- When checking visual regressions

## Required checks
- Page loads correctly
- Interactive elements work
- Responsive design works on mobile/tablet/desktop
- Accessibility requirements met
- Visual appearance matches design
- No console errors
- Performance acceptable

## Output format
- Test results with pass/fail status
- Screenshots of key pages
- Accessibility audit results
- Performance metrics
- Error logs and recommendations

## Failure handling
- If tests fail, capture screenshots for debugging
- If accessibility issues found, provide specific fixes
- If performance issues, suggest optimizations
- If visual regressions, highlight differences

## Setup and configuration
### Installation
```bash
# Install Playwright
npm install -D playwright @playwright/test

# Install browsers
npx playwright install

# Install specific browser
npx playwright install chromium
```

### Configuration file
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Test patterns
### Basic page test
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check title
  await expect(page).toHaveTitle(/MIMO/);
  
  // Check main heading
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('MIMO');
  
  // Check navigation
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
});
```

### Visual regression test
```typescript
test('homepage visual comparison', async ({ page }) => {
  await page.goto('/');
  
  // Take screenshot
  await page.screenshot({ path: 'homepage.png', fullPage: true });
  
  // Compare with baseline
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### Accessibility test
```typescript
test('homepage accessibility', async ({ page }) => {
  await page.goto('/');
  
  // Check for accessibility violations
  const accessibilityScanResults = await page.accessibility.snapshot();
  
  // Or use axe-core
  // const axe = new AxeBuilder({ page });
  // const results = await axe.analyze();
  // expect(results.violations).toEqual([]);
});
```

### Responsive test
```typescript
test('responsive design', async ({ page }) => {
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.screenshot({ path: 'mobile.png' });
  
  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'tablet.png' });
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: 'desktop.png' });
});
```

### Interaction test
```typescript
test('tool interaction', async ({ page }) => {
  await page.goto('/tools/json-formatter');
  
  // Find input textarea
  const input = page.locator('textarea');
  await input.fill('{"name": "test"}');
  
  // Click format button
  const formatButton = page.locator('button:has-text("Format")');
  await formatButton.click();
  
  // Check output
  const output = page.locator('.output');
  await expect(output).toContainText('"name": "test"');
});
```

## Visual testing
### Screenshot comparison
```typescript
// Take baseline screenshot
await page.screenshot({ path: 'baseline.png' });

// Compare with current screenshot
await expect(page).toHaveScreenshot('baseline.png', {
  maxDiffPixels: 100,
  threshold: 0.2,
});
```

### Element screenshots
```typescript
// Screenshot specific element
const button = page.locator('button');
await button.screenshot({ path: 'button.png' });
```

### Full page screenshots
```typescript
// Full page screenshot
await page.screenshot({ path: 'full-page.png', fullPage: true });
```

## Accessibility testing
### Using built-in accessibility
```typescript
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);
```

### Using axe-core
```typescript
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa'])
  .analyze();

expect(results.violations).toEqual([]);
```

### Manual accessibility checks
```typescript
// Check focus management
await page.keyboard.press('Tab');
const focusedElement = await page.evaluate(() => document.activeElement?.tagName);

// Check ARIA attributes
const button = page.locator('button');
const ariaLabel = await button.getAttribute('aria-label');

// Check color contrast (using axe-core)
```

## Performance testing
### Load time
```typescript
const startTime = Date.now();
await page.goto('/');
const loadTime = Date.now() - startTime;
console.log(`Page load time: ${loadTime}ms`);
```

### Core Web Vitals
```typescript
const performanceTiming = await page.evaluate(() => {
  const timing = performance.timing;
  return {
    loadTime: timing.loadEventEnd - timing.navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
  };
});
```

## Common test scenarios
### Navigation testing
```typescript
test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Click tools link
  await page.click('a[href="/tools"]');
  await expect(page).toHaveURL('/tools');
  
  // Click back to home
  await page.click('a[href="/"]');
  await expect(page).toHaveURL('/');
});
```

### Form testing
```typescript
test('form submission', async ({ page }) => {
  await page.goto('/contact');
  
  // Fill form
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#message', 'Hello World');
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Check success message
  const successMessage = page.locator('.success');
  await expect(successMessage).toBeVisible();
});
```

### Error handling testing
```typescript
test('error handling', async ({ page }) => {
  await page.goto('/tools/json-formatter');
  
  // Enter invalid JSON
  const input = page.locator('textarea');
  await input.fill('{invalid json}');
  
  // Click format button
  await page.click('button:has-text("Format")');
  
  // Check error message
  const errorMessage = page.locator('.error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Invalid JSON');
});
```

## Debugging tests
### Using trace
```typescript
test('debug test', async ({ page }) => {
  await page.context().tracing.start({ screenshots: true, snapshots: true });
  
  await page.goto('/');
  // ... test steps
  
  await page.context().tracing.stop({ path: 'trace.zip' });
});
```

### Using screenshots on failure
```typescript
test('test with screenshot on failure', async ({ page }) => {
  try {
    await page.goto('/');
    // ... test steps
  } catch (error) {
    await page.screenshot({ path: 'failure.png' });
    throw error;
  }
});
```

### Using Playwright Inspector
```bash
# Run tests with inspector
npx playwright test --debug

# Run specific test with inspector
npx playwright test --debug homepage.test.ts
```

## CI/CD integration
### GitHub Actions
```yaml
- name: Run Playwright tests
  run: npx playwright test
  
- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

### Test reports
```bash
# Generate HTML report
npx playwright show-report

# Generate JSON report
npx playwright test --reporter=json
```

## Best practices
### Test organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent
- Clean up after tests

### Performance
- Use page fixtures for common setup
- Parallel test execution
- Reuse browser contexts
- Minimize wait times

### Reliability
- Use auto-waiting assertions
- Avoid fixed timeouts
- Handle flaky tests
- Use test retries

### Maintenance
- Update selectors when UI changes
- Keep tests simple
- Document complex test logic
- Regular test review

## Example test suite
```typescript
import { test, expect } from '@playwright/test';

test.describe('MIMO Tools', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/MIMO/);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.click('a[href="/tools"]');
    await expect(page).toHaveURL('/tools');
  });

  test('tools page shows all tools', async ({ page }) => {
    await page.goto('/tools');
    const toolCards = page.locator('.tool-card');
    await expect(toolCards).toHaveCount(10);
  });

  test('json formatter works', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    const input = page.locator('textarea');
    await input.fill('{"name": "test"}');
    await page.click('button:has-text("Format")');
    const output = page.locator('.output');
    await expect(output).toContainText('"name": "test"');
  });
});
```