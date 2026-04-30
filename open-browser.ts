import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // 首页
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  console.log('✅ 首页已打开: http://localhost:4321');

  // 保持浏览器打开
  console.log('\n浏览器已打开，请查看以下页面:');
  console.log('- 首页: http://localhost:4321');
  console.log('- 工具页: http://localhost:4321/tools');
  console.log('- 博客页: http://localhost:4321/blog');
  console.log('- 关于页: http://localhost:4321/about');
  console.log('- JSON工具: http://localhost:4321/tools/json-formatter');
  console.log('\n按 Ctrl+C 关闭浏览器');

  // 等待用户关闭
  await new Promise(() => {});
})();