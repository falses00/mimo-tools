# Render 部署指南

## 概述
MIMO API 使用 Fastify 构建，可部署到 Render Web Service。

## 部署步骤

### 1. 准备工作
1. 注册 [Render](https://render.com) 账号
2. 连接 GitHub 仓库: `falses00/mimo-tools`

### 2. 创建 Web Service
1. 在 Render Dashboard 点击 "New +"
2. 选择 "Web Service"
3. 连接 GitHub 仓库
4. 配置如下:

| 配置项 | 值 |
|--------|-----|
| Name | `mimo-tools-api` |
| Runtime | `Node` |
| Build Command | `npm ci && npm run build:api` |
| Start Command | `npm run start:api` |
| Instance Type | `Free` |

### 3. 环境变量
在 Render Dashboard → Environment 中添加:

| 变量 | 值 |
|------|-----|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MIMO_DATA_DIR` | `/tmp/mimo-data` |
| `CORS_ORIGIN` | `https://falses00.github.io` |
| `SUPABASE_ANON_KEY` | `your-supabase-anon-key` |

### 4. 部署
1. 点击 "Create Web Service"
2. 等待构建完成
3. 获取服务 URL，例如: `https://mimo-tools-api.onrender.com`

### 5. 验证部署
```bash
# 健康检查
curl https://mimo-tools-api.onrender.com/api/health

# 测试 LaunchGuard
curl -X POST https://mimo-tools-api.onrender.com/api/launchguard/audit \
  -H "Content-Type: application/json" \
  -d '{"html":"<a href=\"/projects\">bad</a>"}'
```

### 6. 更新前端配置
在 Render 环境中添加:
```
PUBLIC_API_BASE_URL=https://mimo-tools-api.onrender.com
```

## API Endpoints
- `GET /api/health`
- `POST /api/launchguard/audit`
- `POST /api/repolens/analyze`
- `POST /api/dataforge/profile`
- `POST /api/dataforge/query`
- `POST /api/specpilot/parse`
- `POST /api/specpilot/validate`
- `POST /api/incidentlab/analyze`
- `POST /api/knowledgebase/index`
- `POST /api/knowledgebase/ask`

## 注意事项

### 持久化存储
- Render Free 计划使用 `/tmp` 存储，重启后数据会丢失
- 如需持久化，使用 Render Disk 或迁移到 Supabase

### 冷启动
- Render Free 计划有冷启动延迟
- 首次请求可能需要 30-60 秒
- 建议使用 Supabase Edge Functions 作为备选方案

### CORS
- 已配置允许 `https://falses00.github.io`
- 如需其他域名，更新 `CORS_ORIGIN` 环境变量