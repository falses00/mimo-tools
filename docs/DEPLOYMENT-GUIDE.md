# 全栈项目部署指南

> 本文档总结了 MIMO 项目从零到全栈上线的完整部署流程，可直接复用于其他项目。

---

## 一、项目架构总览

```
project/
├── apps/
│   ├── web/          # 前端 (Astro/Vite/React)
│   └── api/          # 后端 (Fastify/Express)
├── packages/
│   └── shared/       # 共享类型
├── docs/             # 文档
├── tests/            # 测试
├── supabase/
│   └── migrations/   # 数据库迁移
├── .github/
│   └── workflows/    # CI/CD
├── .env.example      # 环境变量示例
├── .gitignore
├── render.yaml       # Render 部署配置
└── package.json
```

---

## 二、GitHub Pages 前端部署

### 2.1 Astro 配置

```javascript
// apps/web/astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name/',  // 必须与 GitHub 仓库名一致
  output: 'static',
});
```

**关键点**：
- `site`: 你的 GitHub Pages 域名
- `base`: 必须是 `/仓库名/`，否则 CSS/JS 资源路径会 404
- 所有内部链接必须使用 `import.meta.env.BASE_URL` 或 `href()` helper

### 2.2 路径 Helper

```typescript
// apps/web/src/lib/paths.ts
const BASE = import.meta.env.BASE_URL || '/';

export function withBase(path: string): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export const href = withBase;
```

### 2.3 GitHub Actions 部署配置

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      PUBLIC_API_BASE_URL: ${{ vars.PUBLIC_API_BASE_URL }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './apps/web/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**关键点**：
- `workflow_dispatch` 允许手动触发
- `PUBLIC_API_BASE_URL` 从 GitHub Variables 读取
- `path` 必须指向正确的 dist 目录

### 2.4 GitHub Pages 启用

```bash
# 通过 API 启用 Pages
gh api -X POST repos/owner/repo/pages \
  -f build_type=workflow \
  -f source.branch=main \
  -f source.path="/"
```

### 2.5 配置前端 API Mode

在 GitHub repo → Settings → Secrets and variables → Actions → Variables：

- Name: `PUBLIC_API_BASE_URL`
- Value: `https://your-api-url.onrender.com`

然后重新运行 workflow。

---

## 三、Render 后端部署

### 3.1 render.yaml

```yaml
# render.yaml
services:
  - type: web
    name: your-project-api
    runtime: node
    plan: free
    buildCommand: npm ci && npm run build:api
    startCommand: npm run start:api
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MIMO_DATA_DIR
        value: /tmp/mimo-data
      - key: CORS_ORIGIN
        value: https://yourusername.github.io
    healthCheckPath: /api/health
    autoDeploy: true
```

### 3.2 Fastify 服务器配置

```typescript
// apps/api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: [
    'http://localhost:4321',
    'http://localhost:3000',
    'https://yourusername.github.io',
    'https://yourusername.github.io/your-repo-name',
  ],
  methods: ['GET', 'POST'],
});

// Routes...

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '8787');
    await fastify.listen({ port, host: '0.0.0.0' });  // 必须 0.0.0.0
    console.log(`🚀 API running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

**关键点**：
- `host: '0.0.0.0'` 必须，否则 Render 无法访问
- `PORT` 由 Render 提供，必须读取环境变量
- CORS 必须包含前端域名

### 3.3 package.json scripts

```json
{
  "scripts": {
    "dev:api": "npm run dev -w apps/api",
    "build:api": "npm run build -w apps/api",
    "start:api": "npm run start -w apps/api",
    "test:api": "npm run test -w apps/api"
  }
}
```

### 3.4 Render 部署步骤

1. 打开 https://render.com
2. 连接 GitHub 仓库
3. 使用 render.yaml 或手动创建 Web Service
4. 设置环境变量（不要在 yaml 中写真实 key）
5. 部署

### 3.5 验证 Render 部署

```bash
# 健康检查
curl https://your-api-url.onrender.com/api/health

# 完整验证脚本
node scripts/verify-api-deployment.ts https://your-api-url.onrender.com
```

---

## 四、Supabase 数据库配置

### 4.1 Migration SQL

```sql
-- supabase/migrations/001_initial_schema.sql

-- 示例表
CREATE TABLE IF NOT EXISTS project_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT NOT NULL,
  report JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE project_reports ENABLE ROW LEVEL SECURITY;

-- 基础策略（开发用）
CREATE POLICY "Allow all for demo" ON project_reports FOR ALL USING (true);
```

### 4.2 Supabase Edge Function

```typescript
// supabase/functions/mimo-api/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  // 处理请求...
})
```

### 4.3 环境变量

```bash
# .env.example
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
# ⚠️ SUPABASE_SERVICE_ROLE_KEY 只在后端使用，绝不暴露到前端
```

---

## 五、API 验证脚本

```typescript
// scripts/verify-api-deployment.ts
const API_URL = process.argv[2] || 'http://localhost:8787';

const endpoints = [
  { path: '/api/health', method: 'GET' },
  { path: '/api/project/action', method: 'POST', body: { key: 'value' } },
];

async function verify() {
  console.log(`🔍 Verifying API at: ${API_URL}\n`);
  
  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch(`${API_URL}${ep.path}`, {
        method: ep.method,
        headers: { 'Content-Type': 'application/json' },
        body: ep.body ? JSON.stringify(ep.body) : undefined,
      });
      const ms = Date.now() - start;
      console.log(`${res.ok ? '✅' : '❌'} ${ep.path} - ${res.status} (${ms}ms)`);
    } catch (e) {
      console.log(`❌ ${ep.path} - Error: ${e.message}`);
    }
  }
}

verify();
```

---

## 六、链接审计脚本

```typescript
// scripts/audit-dist-links.ts
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'apps/web/dist';
const BASE = '/your-repo-name';

function checkFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const hrefRegex = /href="([^"]*)"/g;
  let match;
  
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    // 跳过外部链接
    if (href.startsWith('http') || href.startsWith('#')) continue;
    // 检查内部链接是否包含 base path
    if (href.startsWith('/') && !href.startsWith(BASE)) {
      console.error(`❌ ${filePath}: ${href} missing base path`);
    }
  }
}
```

---

## 七、独立项目 GitHub Pages 部署

对于独立项目（如 `mimo-lifepilot`），配置类似：

```javascript
// apps/web/astro.config.mjs
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/mimo-lifepilot/',  // 仓库名
  output: 'static',
});
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './apps/web/dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**注意**：独立项目用 `npm install` 而非 `npm ci`，因为可能没有 `package-lock.json`。

---

## 八、常见问题排查

### 8.1 CSS/JS 404

**原因**：`base` 配置错误

**解决**：
```javascript
// astro.config.mjs
export default defineConfig({
  base: '/your-repo-name/',  // 必须与仓库名一致
});
```

### 8.2 页面显示 "This page is taking too long to respond"

**原因**：Render Free 计划冷启动

**解决**：
- 等待 30-60 种
- 或升级 Render 付费计划
- 前端显示 loading 状态

### 8.3 CORS 错误

**原因**：后端 CORS 未包含前端域名

**解决**：
```typescript
await fastify.register(cors, {
  origin: [
    'https://yourusername.github.io',
    'https://yourusername.github.io/your-repo-name',
  ],
});
```

### 8.4 环境变量未生效

**原因**：Astro 需要 `PUBLIC_` 前缀

**解决**：
```typescript
// 正确
const apiUrl = import.meta.env.PUBLIC_API_BASE_URL;

// 错误（不会暴露到客户端）
const apiUrl = import.meta.env.API_BASE_URL;
```

### 8.5 GitHub Actions 部署旧代码

**原因**：缓存问题

**解决**：
```bash
# 手动触发 workflow
gh workflow run "Deploy to GitHub Pages"

# 或在 GitHub UI 点击 "Run workflow"
```

---

## 九、安全检查清单

- [ ] `.env` 在 `.gitignore` 中
- [ ] 真实 API key 未写入代码
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 只在后端使用
- [ ] CORS 只允许必要域名
- [ ] 后端不泄露 stack trace
- [ ] 输入有校验
- [ ] 不写 C 盘根目录
- [ ] 不自动执行危险命令

---

## 十、验证命令汇总

```bash
# 构建
npm run build

# 链接审计
npm run test:links

# 线上验证
npm run test:live-links

# API 验证
npm run verify:api -- https://your-api-url.onrender.com

# E2E 测试
npm run test:e2e

# 安全检查
git check-ignore .env
git ls-files | grep -E '\.env|API_KEY'
```

---

## 十一、部署流程总结

```
1. 配置 astro.config.mjs (base path)
2. 创建 GitHub Actions workflow
3. 启用 GitHub Pages
4. 创建后端 API
5. 配置 CORS
6. 部署到 Render
7. 配置 PUBLIC_API_BASE_URL
8. 重新部署前端
9. 验证线上功能
```

---

## 十二、复用此模板

1. 复制 `render.yaml` 到新项目
2. 复制 `.github/workflows/deploy.yml`
3. 修改 `astro.config.mjs` 的 `site` 和 `base`
4. 修改 `package.json` 的 scripts
5. 创建 `.env.example`
6. 创建 `scripts/verify-api-deployment.ts`
7. 按照本文档步骤部署

---

*本文档基于 MIMO 项目实际部署经验总结，可直接用于 Astro + Fastify + Render + GitHub Pages 技术栈的项目。*