# GitHub Pages 部署指南

## 概述
MIMO 前端使用 Astro 构建，部署到 GitHub Pages。

## 配置
- `site`: `https://falses00.github.io`
- `base`: `/mimo-tools`

## 部署步骤
1. 推送代码到 main 分支
2. GitHub Actions 自动构建和部署
3. 访问 https://falses00.github.io/mimo-tools/

## 注意事项
- 所有内部链接必须使用 `/mimo-tools/` 前缀
- 使用 `import.meta.env.BASE_URL` 获取 base path
