# MIMO - 个人工程工具生态

一个开源、免费、全栈的个人工程工具生态，包含 6 个旗舰项目级工具、6 个组合 Quick Utilities、技术博客和完整后端 API。

## 🚀 旗舰项目

| 项目 | 定位 | 技术亮点 |
|------|------|----------|
| **LaunchGuard** | Site Release QA Auditor | 链接审计、Base Path 检测、404 风险评估、SEO 检查 |
| **RepoLens** | Codebase Quality Auditor | 仓库质量分析、评分、改进建议、报告导出 |
| **DataForge** | Browser Data Workbench | 数据画像、SQL 查询、图表建议、CSV/JSON 导入 |
| **SpecPilot** | API Contract & Mock Studio | OpenAPI 解析、Mock 生成、Schema 校验、代码生成 |
| **IncidentLab** | Log & Incident Analyzer | 日志解析、异常检测、时间线、根因分析、报告导出 |
| **KnowledgeBase Studio** | Local RAG & Citation Search | 文档索引、关键词搜索、检索问答、引用生成 |

## 🛠️ Quick Utilities

| 工具 | 功能 |
|------|------|
| **Format Studio** | JSON/YAML/TOML 格式化与验证 |
| **Markdown Studio** | Markdown 预览、TOC、统计 |
| **Regex Studio** | 正则表达式测试与模板 |
| **Encode Studio** | URL/Base64/HTML 编码解码 |
| **Time & ID Studio** | 时间戳、Cron、UUID 生成 |
| **Design Utility** | 颜色、对比度、Token 预览 |

## 🏗️ 技术栈

- **前端**: Astro + Tailwind CSS + TypeScript
- **后端**: Fastify + Node.js + TypeScript
- **测试**: Vitest + Playwright
- **部署**: GitHub Pages (前端) + Render (后端)

## 🚀 快速开始

### 前端开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 测试
npm test
```

### 后端 API

```bash
# 安装依赖
npm install

# 开发模式
npm run dev:api

# 构建
npm run build:api

# 测试
npm run test:api
```

## 📡 API Endpoints

| Endpoint | 方法 | 功能 |
|----------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/launchguard/audit` | POST | 链接审计 |
| `/api/repolens/analyze` | POST | 仓库质量分析 |
| `/api/dataforge/profile` | POST | 数据画像 |
| `/api/dataforge/query` | POST | 数据查询 |
| `/api/specpilot/parse` | POST | OpenAPI 解析 |
| `/api/specpilot/validate` | POST | Schema 校验 |
| `/api/incidentlab/analyze` | POST | 日志分析 |
| `/api/knowledgebase/index` | POST | 文档索引 |
| `/api/knowledgebase/ask` | POST | 检索问答 |

## 🔧 运行模式

### Static Demo Mode (GitHub Pages)
- 前端静态部署
- 使用前端 fallback 逻辑
- 按钮真实产生结果
- 不依赖后端

### API Mode (本地/Render)
- 前端连接后端 API
- 完整功能支持
- 需要启动 `npm run dev:api`

## 📚 文档

- [GitHub Pages 部署](docs/deploy-frontend-github-pages.md)
- [Render API 部署](docs/deploy-api-render.md)
- [数据路径说明](docs/data-paths.md)

## 🔒 安全

- 不暴露 token
- 不写 C 盘
- `.data/` 目录已加入 `.gitignore`
- CORS 白名单限制
- 输入校验

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。