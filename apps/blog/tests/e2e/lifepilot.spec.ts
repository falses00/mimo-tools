import { test, expect } from '@playwright/test';

test.describe('LifePilot - AI 生活管家', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/projects/lifepilot');
    await page.waitForLoadState('networkidle');
  });

  test('页面加载正确', async ({ page }) => {
    // 检查标题
    await expect(page.locator('h1')).toContainText('LifePilot');
    
    // 检查副标题
    await expect(page.locator('text=AI 生活管家')).toBeVisible();
    
    // 检查输入区
    await expect(page.locator('#life-input')).toBeVisible();
    
    // 检查生成按钮
    await expect(page.locator('#btn-generate')).toBeVisible();
    
  });

  test('新手引导可用', async ({ page }) => {
    // 检查新手引导
    await expect(page.locator('text=新手引导')).toBeVisible();
    
    // 点击使用示例
    await page.click('#btn-use-example');
    
    // 检查输入框有内容
    const input = page.locator('#life-input');
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
    
  });

  test('生成生活计划', async ({ page }) => {
    // 输入示例
    await page.fill('#life-input', '我今天写完了博客，跑了3公里，明天要投简历');
    
    // 点击生成
    await page.click('#btn-generate');
    
    // 等待结果
    await page.waitForTimeout(1000);
    
    // 检查已完成区域
    await expect(page.locator('#done-section')).toBeVisible();
    
    // 检查待办区域
    await expect(page.locator('#todos-section')).toBeVisible();
    
  });

  test('编辑事项', async ({ page }) => {
    // 生成计划
    await page.fill('#life-input', '我今天写完了博客');
    await page.click('#btn-generate');
    await page.waitForTimeout(1000);
    
    // 检查事项存在
    const items = page.locator('.item-card');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    
  });

  test('保存功能', async ({ page }) => {
    // 生成计划
    await page.fill('#life-input', '我今天写完了博客，明天要投简历');
    await page.click('#btn-generate');
    await page.waitForTimeout(1000);
    
    // 点击保存
    await page.click('#btn-save');
    
    // 检查 alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('已保存');
      await dialog.accept();
    });
    
  });

  test('导出 Markdown', async ({ page }) => {
    // 生成计划
    await page.fill('#life-input', '我今天写完了博客，明天要投简历');
    await page.click('#btn-generate');
    await page.waitForTimeout(1000);
    
    // 检查导出按钮
    await expect(page.locator('#btn-export')).toBeVisible();
    
  });

  test('清空功能', async ({ page }) => {
    // 输入内容
    await page.fill('#life-input', '测试内容');
    
    // 点击清空
    await page.click('#btn-clear');
    
    // 检查输入框为空
    const input = page.locator('#life-input');
    const value = await input.inputValue();
    expect(value).toBe('');
    
  });

  test('localStorage 保存和恢复', async ({ page }) => {
    // 生成计划
    await page.fill('#life-input', '我今天写完了博客');
    await page.click('#btn-generate');
    await page.waitForTimeout(1000);
    
    // 保存
    await page.click('#btn-save');
    await page.waitForTimeout(500);
    
    // 检查 localStorage
    const history = await page.evaluate(() => {
      return localStorage.getItem('mimo_lifepilot_history');
    });
    expect(history).toBeTruthy();
    
  });

  test('移动端布局', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    
    // 检查页面无横向滚动
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
    
  });

  test('控制台无错误', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/projects/lifepilot');
    await page.waitForLoadState('networkidle');
    
    // 过滤非关键错误
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('404') &&
      !e.includes('Failed to load resource')
    );
    
    if (criticalErrors.length > 0) {
    } else {
    }
    
    expect(criticalErrors).toHaveLength(0);
  });
});