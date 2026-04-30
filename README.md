# MIMO - 3D 高级全栈工程工具生态

一个开源、免费、全栈的个人工程工具生态，包含 6 个旗舰项目级工具、6 个组合 Quick Utilities、完整后端 API、RAG 检索系统和 3D 暗金深灰高级视觉设计。

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

- **前端**: Astro + Tailwind CSS + TypeScript + 3D 暗金深灰主题
- **后端**: Fastify + Node.js + TypeScript
- **数据库**: Supabase Postgres + pgvector (可选)
- **测试**: Vitest + Playwright
- **部署**: GitHub Pages (前端) + Render/Supabase (后端)

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
- 前端静态部署到 GitHub Pages
- 使用前端 fallback 逻辑
- 按钮真实产生结果
- 不依赖后端
- URL: https://falses00.github.io/mimo-tools/

### API Mode (本地/Render/Supabase)
- 前端连接后端 API
- 完整功能支持
- 本地开发: `npm run dev:api`
- 线上部署: Render 或 Supabase Edge Functions

## 🗄️ 数据库策略

### 浏览器本地存储 (默认)
- localStorage / IndexedDB
- 适用于临时数据、用户偏好
- 无需后端

### Supabase Postgres (云端)
- 持久化存储
- 多设备同步
- 支持 pgvector 向量搜索

### 本地文件系统 (开发)
- SQLite / JSON 文件
- 路径: `.data/` 目录
- 通过 `MIMO_DATA_DIR` 配置

详见 [数据库策略文档](docs/database-strategy.md)

## 🔍 RAG 检索策略

### Local Retrieval-Only (默认)
- 内存索引 + 关键词匹配
- 无需后端
- 即时响应

### Supabase Full-Text Search
- Supabase Postgres 全文搜索
- 数据持久化
- 支持复杂查询

### pgvector (进阶)
- Supabase pgvector + OpenAI Embeddings
- 语义搜索
- 更准确的检索

详见 [RAG 策略文档](docs/rag-strategy.md)

## 🎨 3D 视觉设计

- 暗金深灰高级风格
- 3D 卡片悬停效果
- 玻璃拟态面板
- 动态金色光球背景
- 响应式设计
- 支持深色/浅色模式

## 📚 文档

- [GitHub Pages 部署](docs/deploy-frontend-github-pages.md)
- [Render API 部署](docs/deploy-api-render.md)
- [Supabase 部署](docs/deploy-api-supabase.md)
- [数据库策略](docs/database-strategy.md)
- [RAG 策略](docs/rag-strategy.md)
- [数据路径说明](docs/data-paths.md)

## 🔒 安全

- 不暴露 token
- 不写 C 盘
- `.data/` 目录已加入 `.gitignore`
- CORS 白名单限制
- 输入校验
- `SUPABASE_SERVICE_ROLE_KEY` 只在后端使用

## 🧪 测试

```bash
# 前端测试
npm test

# 后端测试
npm run test:api

# 链接审计
npm run test:links

# 线上验证
npm run test:live-links

# E2E 测试
npm run test:e2e
```

## 📦 部署

### 前端 (GitHub Pages)
- 自动部署: 推送到 main 分支
- URL: https://falses00.github.io/mimo-tools/

### 后端 (Render)
1. 在 Render 连接 GitHub 仓库
2. 配置环境变量
3. 部署 Web Service

### 后端 (Supabase Edge Functions)
1. 创建 Supabase 项目
2. 运行数据库迁移
3. 部署 Edge Function

详见 [部署文档](docs/deploy-api-render.md)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。