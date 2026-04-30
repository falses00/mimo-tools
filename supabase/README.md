# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 获取以下信息：
   - Project URL: `https://<project-ref>.supabase.co`
   - Anon Key: 项目设置 → API → anon public
   - Service Role Key: 项目设置 → API → service_role (仅后端使用)

## 2. 运行数据库迁移

1. 进入 Supabase Dashboard → SQL Editor
2. 复制 `supabase/migrations/001_initial_schema.sql` 内容
3. 执行 SQL 创建表

## 3. 启用 pgvector (可选，用于 RAG embeddings)

```sql
-- 在 SQL Editor 中执行
CREATE EXTENSION IF NOT EXISTS vector;
```

然后取消注释 `001_initial_schema.sql` 中的 embedding 列。

## 4. 部署 Edge Function

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 部署函数
supabase functions deploy mimo-api --project-ref <your-project-ref>
```

## 5. 设置环境变量

### 本地开发 (.env)
```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

### Render 部署
在 Render Dashboard → Environment 中添加：
```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

## 6. 前端配置

在 `.env` 或 Render 环境中设置：
```
PUBLIC_API_BASE_URL=https://<project-ref>.supabase.co/functions/v1/mimo-api
```

## 7. 验证部署

```bash
# 健康检查
curl https://<project-ref>.supabase.co/functions/v1/mimo-api/health

# 测试 KnowledgeBase
curl -X POST https://<project-ref>.supabase.co/functions/v1/mimo-api/api/knowledgebase/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is MIMO?","documents":[{"title":"MIMO","content":"MIMO is a fullstack engineering tools workbench."}]}'
```

## 安全注意事项

- ⚠️ **SUPABASE_SERVICE_ROLE_KEY** 只能在后端/Edge Function 中使用
- ⚠️ 绝不能将 Service Role Key 暴露到前端
- ✅ Anon Key 可以在前端使用（配合 RLS 策略）
- ✅ 所有敏感操作通过 Edge Function 代理