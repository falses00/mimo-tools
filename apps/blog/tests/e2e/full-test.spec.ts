import { test, expect } from '@playwright/test';

test.describe('MIMO 全站功能测试 - 有头浏览器', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
  });

  // ==================== 页面加载测试 ====================
  
  test('首页加载正常', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 检查标题
    await expect(page).toHaveTitle(/MIMO/);
    
    // 检查 Hero 区域
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('MIMO');
    
    // 检查导航
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // 检查精选工具
    const featuredSection = page.locator('text=精选工具');
    await expect(featuredSection).toBeVisible();
    
    // 检查工具卡片
    const toolCards = await page.locator('[href^="/tools/"]').count();
    expect(toolCards).toBeGreaterThanOrEqual(10);
    
    // 检查页脚
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
  });

  test('工具页加载正常', async ({ page }) => {
    await page.goto('/tools');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/工具箱/);
    
    const h1 = page.locator('h1');
    await expect(h1).toContainText('工具箱');
    
    // 检查搜索框
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();
    
    // 检查分类按钮
    const categoryBtns = page.locator('button');
    const btnCount = await categoryBtns.count();
    expect(btnCount).toBeGreaterThanOrEqual(5);
    
    // 检查工具卡片
    const toolCards = await page.locator('a[href^="/tools/"]').count();
    expect(toolCards).toBe(10);
    
  });

  test('博客页加载正常', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/博客/);
    
    const h1 = page.locator('h1');
    await expect(h1).toContainText('博客');
    
    // 检查博客文章
    const blogPosts = await page.locator('a[href^="/blog/"]').count();
    expect(blogPosts).toBeGreaterThanOrEqual(3);
    
  });

  test('关于页加载正常', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/关于/);
    
    const h1 = page.locator('h1');
    await expect(h1).toContainText('关于');
    
  });

  // ==================== 工具功能测试 ====================

  test('JSON Formatter 工具可用', async ({ page }) => {
    await page.goto('/tools/json-formatter');
    await page.waitForLoadState('networkidle');
    
    // 检查输入区域
    const input = page.locator('#input-json');
    await expect(input).toBeVisible();
    
    // 检查输出区域
    const output = page.locator('#output-json');
    await expect(output).toBeVisible();
    
    // 测试格式化功能
    await input.fill('{"name":"test","value":123,"nested":{"key":"value"}}');
    
    const formatBtn = page.locator('#btn-format');
    await expect(formatBtn).toBeVisible();
    await formatBtn.click();
    await page.waitForTimeout(500);
    
    const outputValue = await output.inputValue();
    expect(outputValue).toContain('"name"');
    expect(outputValue).toContain('"value"');
    
    // 测试压缩功能
    const minifyBtn = page.locator('#btn-minify');
    await minifyBtn.click();
    await page.waitForTimeout(500);
    
    const minifiedValue = await output.inputValue();
    expect(minifiedValue.length).toBeLessThan(outputValue.length);
    
    // 测试验证功能
    const validateBtn = page.locator('#btn-validate');
    await validateBtn.click();
    await page.waitForTimeout(500);
    
    const statusBar = page.locator('#status-bar');
    const statusText = await statusBar.textContent();
    expect(statusText).toContain('有效');
    
    // 测试示例功能
    const exampleBtn = page.locator('#btn-example');
    await exampleBtn.click();
    await page.waitForTimeout(500);
    
    const exampleValue = await input.inputValue();
    expect(exampleValue.length).toBeGreaterThan(0);
    
    // 测试清空功能
    const clearBtn = page.locator('#btn-clear');
    await clearBtn.click();
    await page.waitForTimeout(300);
    
    const clearedValue = await input.inputValue();
    expect(clearedValue).toBe('');
  });

  test('Text Utilities 工具可用', async ({ page }) => {
    await page.goto('/tools/text-utilities');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#input-text');
    const output = page.locator('#output-text');
    
    // 测试大写转换
    await input.fill('hello world');
    const uppercaseBtn = page.locator('#btn-uppercase');
    await uppercaseBtn.click();
    await page.waitForTimeout(300);
    
    const uppercaseResult = await output.inputValue();
    expect(uppercaseResult).toBe('HELLO WORLD');
    
    // 测试小写转换
    await input.fill('HELLO WORLD');
    const lowercaseBtn = page.locator('#btn-lowercase');
    await lowercaseBtn.click();
    await page.waitForTimeout(300);
    
    const lowercaseResult = await output.inputValue();
    expect(lowercaseResult).toBe('hello world');
    
    // 测试首字母大写
    await input.fill('hello world');
    const capitalizeBtn = page.locator('#btn-capitalize');
    await capitalizeBtn.click();
    await page.waitForTimeout(300);
    
    const capitalizeResult = await output.inputValue();
    expect(capitalizeResult).toBe('Hello World');
    
    // 测试去空行
    await input.fill('line1\n\n\nline2\n\nline3');
    const removeEmptyLinesBtn = page.locator('#btn-remove-empty-lines');
    await removeEmptyLinesBtn.click();
    await page.waitForTimeout(300);
    
    const removeEmptyResult = await output.inputValue();
    expect(removeEmptyResult).toBe('line1\nline2\nline3');
    
    // 测试统计功能
    await input.fill('hello world\nfoo bar');
    await page.waitForTimeout(500);
    
    const charCount = await page.locator('#stat-chars').textContent();
    const wordCount = await page.locator('#stat-words').textContent();
    const lineCount = await page.locator('#stat-lines').textContent();
    
    expect(parseInt(charCount || '0')).toBeGreaterThan(0);
    expect(parseInt(wordCount || '0')).toBeGreaterThan(0);
    expect(parseInt(lineCount || '0')).toBe(2);
  });

  test('URL Encoder 工具可用', async ({ page }) => {
    await page.goto('/tools/url-encoder');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#input-url');
    const output = page.locator('#output-url');
    
    // 测试 URL 编码
    await input.fill('https://example.com/path?name=hello world');
    const encodeBtn = page.locator('#btn-encode');
    await encodeBtn.click();
    await page.waitForTimeout(300);
    
    const encodedValue = await output.inputValue();
    expect(encodedValue).toContain('%20');
    
    // 测试 URL 解码
    await input.fill('https://example.com/path?name=hello%20world');
    const decodeBtn = page.locator('#btn-decode');
    await decodeBtn.click();
    await page.waitForTimeout(300);
    
    const decodedValue = await output.inputValue();
    expect(decodedValue).toContain('hello world');
    
    // 测试 Query 解析
    await input.fill('https://example.com/search?q=test&page=1&lang=zh');
    const parseBtn = page.locator('#btn-parse-query');
    await parseBtn.click();
    await page.waitForTimeout(500);
    
    const queryParser = page.locator('#query-parser');
    const isVisible = await queryParser.isVisible();
    expect(isVisible).toBe(true);
  });

  test('Base64 工具可用', async ({ page }) => {
    await page.goto('/tools/base64-tool');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#input-base64');
    const output = page.locator('#output-base64');
    
    // 测试编码
    await input.fill('Hello, World!');
    const encodeBtn = page.locator('#btn-encode');
    await encodeBtn.click();
    await page.waitForTimeout(300);
    
    const encodedValue = await output.inputValue();
    expect(encodedValue).toBe('SGVsbG8sIFdvcmxkIQ==');
    
    // 测试解码
    await input.fill('SGVsbG8sIFdvcmxkIQ==');
    const decodeBtn = page.locator('#btn-decode');
    await decodeBtn.click();
    await page.waitForTimeout(300);
    
    const decodedValue = await output.inputValue();
    expect(decodedValue).toBe('Hello, World!');
  });

  test('Timestamp Converter 工具可用', async ({ page }) => {
    await page.goto('/tools/timestamp-converter');
    await page.waitForLoadState('networkidle');
    
    // 检查当前时间显示
    const currentTimestamp = page.locator('#current-timestamp-seconds');
    const timestampText = await currentTimestamp.textContent();
    expect(parseInt(timestampText || '0')).toBeGreaterThan(0);
    
    // 测试 timestamp 转日期
    const inputTimestamp = page.locator('#input-timestamp');
    await inputTimestamp.fill('1704067200'); // 2024-01-01 00:00:00 UTC
    
    const convertBtn = page.locator('#btn-convert-to-date');
    await convertBtn.click();
    await page.waitForTimeout(500);
    
    const resultLocal = page.locator('#result-local');
    const localText = await resultLocal.textContent();
    expect(localText).toContain('2024');
    
    // 测试"当前时间"按钮
    const nowBtn = page.locator('#btn-now');
    await nowBtn.click();
    await page.waitForTimeout(500);
    
    const inputValue = await inputTimestamp.inputValue();
    expect(parseInt(inputValue)).toBeGreaterThan(0);
  });

  test('UUID Generator 工具可用', async ({ page }) => {
    await page.goto('/tools/uuid-generator');
    await page.waitForLoadState('networkidle');
    
    const output = page.locator('#uuid-output');
    
    // 测试单个 UUID 生成
    const generateBtn = page.locator('#btn-generate');
    await generateBtn.click();
    await page.waitForTimeout(300);
    
    const uuidValue = await output.inputValue();
    expect(uuidValue).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    
    // 测试批量生成
    const countInput = page.locator('#uuid-count');
    await countInput.fill('5');
    await generateBtn.click();
    await page.waitForTimeout(300);
    
    const uuidLines = (await output.inputValue()).split('\n');
    expect(uuidLines.length).toBeGreaterThanOrEqual(5);
    
    // 测试大写格式
    const uppercaseBtn = page.locator('#btn-generate-uppercase');
    await uppercaseBtn.click();
    await page.waitForTimeout(300);
    
    const uppercaseUuid = (await output.inputValue()).split('\n').pop() || '';
    expect(uppercaseUuid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/);
  });

  test('Regex Tester 工具可用', async ({ page }) => {
    await page.goto('/tools/regex-tester');
    await page.waitForLoadState('networkidle');
    
    // 检查页面标题
    await expect(page).toHaveTitle(/Regex Tester/);
    
    // 检查输入区域存在
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();
    
  });

  test('Cron Helper 工具可用', async ({ page }) => {
    await page.goto('/tools/cron-helper');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/Cron Helper/);
    
  });

  test('Color Palette 工具可用', async ({ page }) => {
    await page.goto('/tools/color-palette');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/Color Palette/);
    
  });

  test('Markdown Previewer 工具可用', async ({ page }) => {
    await page.goto('/tools/markdown-previewer');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveTitle(/Markdown Previewer/);
    
  });

  // ==================== 博客文章测试 ====================

  test('博客文章详情页可用', async ({ page }) => {
    const posts = [
      { slug: 'why-mimo', title: '为什么做这个工具站' },
      { slug: 'ai-workflow', title: '我的 AI 工程工作流' },
      { slug: 'opencode-mimo', title: '如何用 OpenCode' }
    ];
    
    for (const post of posts) {
      await page.goto(`/blog/${post.slug}`);
      await page.waitForLoadState('networkidle');
      
      const title = await page.title();
      expect(title).toContain(post.title.substring(0, 10));
      
      const h1 = page.locator('h1').first();
      const h1Text = await h1.textContent();
      expect(h1Text).toContain(post.title.substring(0, 10));
      
    }
  });

  // ==================== 导航测试 ====================

  test('导航链接全部可用', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 测试工具链接
    const toolsLink = page.locator('a[href="/tools"]').first();
    await toolsLink.click();
    await page.waitForURL('/tools');
    expect(page.url()).toContain('/tools');
    
    // 测试博客链接
    const blogLink = page.locator('a[href="/blog"]').first();
    await blogLink.click();
    await page.waitForURL('/blog');
    expect(page.url()).toContain('/blog');
    
    // 测试关于链接
    const aboutLink = page.locator('a[href="/about"]').first();
    await aboutLink.click();
    await page.waitForURL('/about');
    expect(page.url()).toContain('/about');
    
    // 测试返回首页
    const homeLink = page.locator('a[href="/"]').first();
    await homeLink.click();
    await page.waitForURL('/');
    expect(page.url()).toMatch(/\/$/);
  });

  // ==================== 深色模式测试 ====================

  test('深色模式切换正常', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // 检查初始状态
    const html = page.locator('html');
    const initialDark = await html.evaluate(el => el.classList.contains('dark'));
    
    // 切换主题
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const afterToggle = await html.evaluate(el => el.classList.contains('dark'));
    expect(afterToggle).not.toBe(initialDark);
    
  });

  // ==================== 响应式设计测试 ====================

  test('响应式设计正常', async ({ page }) => {
    // 桌面端
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const desktopNav = page.locator('nav').first();
    await expect(desktopNav).toBeVisible();
    
    // 平板端
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    const tabletNav = page.locator('nav').first();
    await expect(tabletNav).toBeVisible();
    
    // 移动端
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    
    const mobileNav = page.locator('nav').first();
    await expect(mobileNav).toBeVisible();
  });

  // ==================== 性能测试 ====================

  test('页面性能正常', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // 5秒内加载完成
    
    const performanceTiming = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      };
    });
    
  });

  // ==================== 控制台错误测试 ====================

  test('无控制台错误', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
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