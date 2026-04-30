# MIMO - 项目架构

## 📁 目录结构

```
mimo-tools/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages 部署
│
├── .opencode/                      # OpenCode 配置
│   ├── prompts/                    # Agent 提示词
│   │   ├── swarm-master.md
│   │   ├── builder-agent.md
│   │   ├── ui-agent.md
│   │   ├── qa-agent.md
│   │   ├── security-agent.md
│   │   └── release-agent.md
│   └── skills/                     # Skills 定义
│       ├── accessibility-review/
│       ├── frontend-ui-engineer/
│       ├── github-workflow-debug/
│       ├── playwright-visual-qa/
│       ├── security-release-guard/
│       ├── tool-product-design/
│       └── visual-design-review/
│
├── apps/
│   ├── api/                        # 后端 API (Fastify)
│   │   ├── src/
│   │   │   ├── server.ts           # 服务入口
│   │   │   └── routes/             # API 路由
│   │   │       ├── health.ts
│   │   │       ├── launchguard.ts
│   │   │       ├── repolens.ts
│   │   │       ├── dataforge.ts
│   │   │       ├── specpilot.ts
│   │   │       ├── incidentlab.ts
│   │   │       └── knowledgebase.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── blog/                       # 前端 (Astro)
│       ├── src/
│       │   ├── components/
│       │   │   ├── home/           # 首页组件
│       │   │   │   ├── Hero.astro
│       │   │   │   └── FeaturedTools.astro
│       │   │   ├── layout/         # 布局组件
│       │   │   │   ├── SiteHeader.astro
│       │   │   │   ├── SiteFooter.astro
│       │   │   │   └── ThemeToggle.astro
│       │   │   ├── tools/          # 工具组件
│       │   │   │   └── ToolLayout.astro
│       │   │   └── visual/         # 视觉组件
│       │   │       ├── DynamicBackground.astro
│       │   │       └── ThreeDCard.astro
│       │   ├── content/
│       │   │   └── blog/           # 博客文章
│       │   │       ├── why-mimo.md
│       │   │       ├── ai-workflow.md
│       │   │       └── opencode-mimo.md
│       │   ├── data/
│       │   │   ├── flagship-projects.ts  # 旗舰项目数据
│       │   │   ├── projects.ts           # 旧项目数据
│       │   │   └── tools.ts              # 工具数据
│       │   ├── layouts/
│       │   │   └── Layout.astro
│       │   ├── lib/
│       │   │   ├── paths.ts        # 路径工具
│       │   │   └── json-tools.ts
│       │   ├── pages/
│       │   │   ├── index.astro     # 首页
│       │   │   ├── about.astro     # 关于
│       │   │   ├── blog.astro      # 博客列表
│       │   │   ├── projects.astro  # 项目列表
│       │   │   ├── tools.astro     # 工具列表
│       │   │   ├── blog/
│       │   │   │   └── [slug].astro
│       │   │   ├── projects/       # 旗舰项目
│       │   │   │   ├── launchguard.astro
│       │   │   │   ├── repolens.astro
│       │   │   │   ├── dataforge.astro
│       │   │   │   ├── specpilot.astro
│       │   │   │   ├── incidentlab.astro
│       │   │   │   └── knowledgebase-studio.astro
│       │   │   └── tools/          # 工具页面
│       │   │       ├── json-formatter.astro
│       │   │       ├── markdown-previewer.astro
│       │   │       ├── regex-tester.astro
│       │   │       ├── url-encoder.astro
│       │   │       ├── base64-tool.astro
│       │   │       ├── timestamp-converter.astro
│       │   │       ├── uuid-generator.astro
│       │   │       ├── cron-helper.astro
│       │   │       ├── color-palette.astro
│       │   │       └── text-utilities.astro
│       │   └── styles/
│       │       ├── tokens.css      # 设计 Tokens
│       │       ├── theme-3d.css    # 3D 主题
│       │       └── theme.css       # 基础主题
│       ├── tests/
│       │   └── e2e/                # E2E 测试
│       ├── astro.config.mjs
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                           # 文档
│   ├── deploy-frontend-github-pages.md
│   ├── deploy-api-render.md
│   └── data-paths.md
│
├── scripts/                        # 脚本
│   ├── audit-dist-links.ts         # Dist 链接审计
│   └── audit-live-links.ts         # 线上链接审计
│
├── .env.example                    # 环境变量示例
├── .gitignore
├── opencode.json                   # OpenCode 配置
├── package.json                    # 根 package.json
├── playwright.config.ts            # Playwright 配置
├── vitest.config.ts                # Vitest 配置
├── README.md
├── ARCHITECTURE.md
├── PROJECT_SPEC.md
├── TASKS.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

## 🚀 旗舰项目

| 项目 | 路由 | 功能 |
|------|------|------|
| LaunchGuard | /projects/launchguard | 链接审计、Base Path 检测 |
| RepoLens | /projects/repolens | 仓库质量分析 |
| DataForge | /projects/dataforge | 数据画像、SQL 查询 |
| SpecPilot | /projects/specpilot | OpenAPI 解析、Mock 生成 |
| IncidentLab | /projects/incidentlab | 日志分析、故障复盘 |
| KnowledgeBase Studio | /projects/knowledgebase-studio | RAG 检索、引用问答 |

## 🛠️ Quick Utilities

| 工具 | 路由 | 功能 |
|------|------|------|
| Format Studio | /tools/json-formatter | JSON 格式化 |
| Markdown Studio | /tools/markdown-previewer | Markdown 预览 |
| Regex Studio | /tools/regex-tester | 正则测试 |
| Encode Studio | /tools/url-encoder | URL/Base64 编码 |
| Time & ID Studio | /tools/timestamp-converter | 时间戳转换 |
| Design Utility | /tools/color-palette | 颜色工具 |

## 🔌 API Endpoints

| Endpoint | 方法 | 功能 |
|----------|------|------|
| /api/health | GET | 健康检查 |
| /api/launchguard/audit | POST | 链接审计 |
| /api/repolens/analyze | POST | 仓库分析 |
| /api/dataforge/profile | POST | 数据画像 |
| /api/dataforge/query | POST | 数据查询 |
| /api/specpilot/parse | POST | OpenAPI 解析 |
| /api/specpilot/validate | POST | Schema 校验 |
| /api/incidentlab/analyze | POST | 日志分析 |
| /api/knowledgebase/index | POST | 文档索引 |
| /api/knowledgebase/ask | POST | 检索问答 |

## 🎨 设计系统

- **主题**: 3D 暗金深灰高级风格
- **Tokens**: tokens.css
- **组件**: ThreeDCard, DynamicBackground
- **动效**: animate-float, glass-panel

## 🔧 运行命令

```bash
# 前端
npm run dev          # 开发
npm run build        # 构建
npm test             # 测试

# 后端
npm run dev:api      # 开发
npm run build:api    # 构建
npm run test:api     # 测试

# 验证
npm run test:links   # 链接审计
npm run test:live-links  # 线上验证
```