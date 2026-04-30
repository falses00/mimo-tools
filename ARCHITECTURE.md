# 架构设计

## 技术栈
- Astro 5.x - 静态站点生成
- React 19.x - 工具交互界面
- Tailwind CSS 3.x - 样式
- TypeScript 5.x - 类型安全
- Vitest - 单元测试
- npm - 包管理器

## 项目结构
```
mimo/
├── apps/blog/           # Astro 博客/门户
│   ├── src/pages/       # 路由页面
│   ├── src/layouts/     # 布局组件
│   ├── src/data/        # 工具数据
│   └── src/styles/      # 全局样式
├── packages/ui/         # 共享 UI 组件
├── .github/workflows/   # CI/CD
└── docs/                # 文档
```

## 路由
- / - 首页
- /tools - 工具索引
- /tools/json-formatter - JSON 工具
- /tools/markdown-previewer - Markdown 工具
- /tools/cron-helper - Cron 工具
- /tools/color-palette - 调色板工具
- /tools/regex-tester - 正则工具
- /blog - 博客列表
- /blog/[slug] - 文章详情

## 组件模式
每个工具遵循：ToolContainer > ToolHeader > ToolInterface(Input+Output) > ToolExamples

## CI/CD
GitHub Actions: checkout -> npm ci -> npm run build -> deploy to GitHub Pages
