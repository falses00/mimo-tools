import { test, expect } from '@playwright/test';
import { mkdirSync } from 'fs';

const SCREENSHOT_DIR = '/i/MIMO-validation/gate-12-screenshots';
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const apps = [
  { name: 'lifepilot', url: 'https://falses00.github.io/mimo-lifepilot/', title: 'LifePilot', hero: 'LifePilot', hasInput: true, hasButton: true },
  { name: 'interviewpilot', url: 'https://falses00.github.io/mimo-interviewpilot/', title: 'InterviewPilot', hero: 'InterviewPilot', hasInput: true, hasButton: true },
  { name: 'repopilot', url: 'https://falses00.github.io/mimo-repopilot/', title: 'RepoPilot', hero: 'RepoPilot', hasInput: true, hasButton: true },
  { name: 'knowledgepilot', url: 'https://falses00.github.io/mimo-knowledgepilot/', title: 'KnowledgePilot', hero: 'KnowledgePilot', hasInput: true, hasButton: true },
  { name: 'opspilot', url: 'https://falses00.github.io/mimo-opspilot/', title: 'OpsPilot', hero: 'OpsPilot', hasInput: true, hasButton: true },
  { name: 'utilities', url: 'https://falses00.github.io/mimo-utilities/', title: 'MIMO Utilities', hero: 'Utilities', hasInput: false, hasButton: false },
  { name: 'portfolio', url: 'https://falses00.github.io/mimo-tools/', title: 'MIMO', hero: 'MIMO', hasInput: false, hasButton: false },
];

test.describe('Gate 12: Online Product Validation', () => {
  for (const app of apps) {
    test(`${app.name} - 页面加载和基础验证`, async ({ page }) => {
      test.setTimeout(60000);
      
      // Navigate
      await page.goto(app.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Check not 404
      const title = await page.title();
      expect(title).not.toContain('404');
      expect(title).not.toContain('Not Found');
      
      // Check has h1
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible({ timeout: 10000 });
      
      // Check hero text
      const heroText = await h1.textContent();
      expect(heroText).toBeTruthy();
      
      // Screenshot
      await page.screenshot({ path: `${SCREENSHOT_DIR}/${app.name}-home.png`, fullPage: true });
      
      console.log(`✅ ${app.name}: ${title}`);
    });

    if (app.hasInput && app.hasButton) {
      test(`${app.name} - 核心交互验证`, async ({ page }) => {
        test.setTimeout(60000);
        
        await page.goto(app.url, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Find and click example button if exists
        const exampleBtn = page.locator('button:has-text("示例"), button:has-text("Example"), #btn-example').first();
        if (await exampleBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
          await exampleBtn.click();
          await page.waitForTimeout(500);
        }
        
        // Find primary action button
        const actionBtn = page.locator('button:has-text("生成"), button:has-text("分析"), button:has-text("开始"), button:has-text("搜索"), button.btn-primary').first();
        if (await actionBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
          await actionBtn.click();
          await page.waitForTimeout(2000);
          
          // Screenshot after action
          await page.screenshot({ path: `${SCREENSHOT_DIR}/${app.name}-result.png`, fullPage: true });
          console.log(`✅ ${app.name}: 交互测试完成`);
        }
      });
    }
  }

  test('Portfolio Hub - 项目链接验证', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('https://falses00.github.io/mimo-tools/projects', { waitUntil: 'networkidle' });
    
    // Check all project links
    const links = await page.locator('a[href*="github.io"]').all();
    const hrefs = await Promise.all(links.map(l => l.getAttribute('href')));
    
    console.log('项目链接:', hrefs.filter(h => h).join(', '));
    
    await page.screenshot({ path: `${SCREENSHOT_DIR}/portfolio-projects.png`, fullPage: true });
  });

  test('移动端验证', async ({ browser }) => {
    test.setTimeout(60000);
    
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    
    // Test mobile on each app
    for (const app of apps.slice(0, 3)) {
      await page.goto(app.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Check no horizontal scroll
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 20);
      
      await page.screenshot({ path: `${SCREENSHOT_DIR}/mobile-${app.name}.png`, fullPage: true });
      console.log(`✅ ${app.name}: 移动端验证通过`);
    }
    
    await context.close();
  });
});
