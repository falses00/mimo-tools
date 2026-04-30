# GitHub Pages 部署指南

## 概述
MIMO 前端使用 Astro 构建，部署到 GitHub Pages。

## 配置
- `site`: `https://falses00.github.io`
- `base`: `/mimo-tools`
- URL: https://falses00.github.io/mimo-tools/

## 部署步骤
1. 推送代码到 main 分支
2. GitHub Actions 自动构建和部署
3. 访问 https://falses00.github.io/mimo-tools/

## API Mode 配置

默认情况下，前端运行在 **Static Demo Mode**。如果要启用 API Mode：

### 1. 部署后端 API
首先将 `apps/api` 部署到 Render 或 Supabase，获取 API URL。

### 2. 设置 GitHub Actions 变量
1. 进入 GitHub repo → Settings
2. Secrets and variables → Actions
3. Variables → New repository variable
4. 设置：
   - Name: `PUBLIC_API_BASE_URL`
   - Value: `https://your-api-url.onrender.com`
5. 保存

### 3. 重新部署
1. 进入 Actions → Deploy to GitHub Pages
2. 点击 "Run workflow"
3. 等待部署完成

### 4. 验证
访问 https://falses00.github.io/mimo-tools/，检查项目页面是否显示 "API Mode" 而不是 "Static Demo Mode"。

## 注意事项
- 所有内部链接必须使用 `/mimo-tools/` 前缀
- 使用 `import.meta.env.BASE_URL` 获取 base path
- `PUBLIC_API_BASE_URL` 不要硬编码到源码中
- 如果 API 不可用，前端会自动 fallback 到 Static Demo Mode

## 故障排除
- 如果看到旧页面，请强制刷新 (Ctrl+Shift+R)
- 如果 API Mode 不工作，检查 `PUBLIC_API_BASE_URL` 是否正确设置
- 详见 [Troubleshooting](troubleshooting.md)