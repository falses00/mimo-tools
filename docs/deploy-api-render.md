# Render 部署指南

## 概述
MIMO API 使用 Fastify 构建，可部署到 Render Web Service。

## 部署步骤
1. 在 Render 创建 Web Service
2. 连接 GitHub 仓库
3. 配置:
   - Build Command: `npm install && npm run build:api`
   - Start Command: `npm run start --workspace=apps/api`
   - Environment: Node
4. 添加环境变量:
   - `PORT`: 10000
   - `GITHUB_TOKEN`: (可选)
   - `OPENAI_API_KEY`: (可选)

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
