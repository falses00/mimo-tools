# RAG 策略

## 概述
KnowledgeBase Studio 使用 RAG (Retrieval-Augmented Generation) 技术实现文档检索和问答。

## 检索模式

### 1. Local Retrieval-Only (默认)
- **技术**: 内存索引 + 关键词匹配
- **适用**: GitHub Pages 静态部署、无后端场景
- **特点**:
  - 纯前端实现
  - 即时响应
  - 无需网络
  - 无 LLM 依赖

**实现**:
```typescript
// 文档分块
const chunks = documents.flatMap(doc => {
  const sentences = doc.content.split(/[.!?。！？\n]+/).filter(s => s.trim());
  return sentences.map((sentence, i) => ({
    docId: doc.id,
    docTitle: doc.title,
    chunkId: `${doc.id}-${i}`,
    content: sentence.trim(),
  }));
});

// 关键词搜索
const scored = chunks.map(chunk => {
  const lowerContent = chunk.content.toLowerCase();
  const score = keywords.filter(k => lowerContent.includes(k)).length;
  return { ...chunk, score };
}).filter(c => c.score > 0).sort((a, b) => b.score - a.score);
```

### 2. Supabase Full-Text Search
- **技术**: Supabase Postgres + tsvector
- **适用**: 有 Supabase 账号、需要持久化
- **特点**:
  - 数据持久化
  - 支持复杂查询
  - 可扩展

**SQL**:
```sql
-- 全文搜索索引
CREATE INDEX idx_knowledge_chunks_content_fts 
ON knowledge_chunks 
USING gin(to_tsvector('english', content));

-- 搜索查询
SELECT * FROM knowledge_chunks
WHERE to_tsvector('english', content) @@ plainto_tsquery('english', 'search query')
ORDER BY ts_rank(to_tsvector('english', content), plainto_tsquery('english', 'search query')) DESC
LIMIT 5;
```

### 3. Supabase pgvector (进阶)
- **技术**: Supabase Postgres + pgvector + OpenAI Embeddings
- **适用**: 有 OpenAI API Key、需要语义搜索
- **特点**:
  - 语义搜索
  - 更准确的检索
  - 支持多语言

**启用条件**:
1. Supabase 项目启用 pgvector 扩展
2. 配置 `OPENAI_API_KEY`
3. 生成 embeddings

**SQL**:
```sql
-- 启用 pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 添加 embedding 列
ALTER TABLE knowledge_chunks ADD COLUMN embedding vector(1536);

-- 创建向量索引
CREATE INDEX idx_knowledge_chunks_embedding 
ON knowledge_chunks 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 向量搜索
SELECT * FROM knowledge_chunks
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

## 数据流

### 文档索引流程
```
用户输入文档
    ↓
前端分块 (chunk)
    ↓
[本地模式] 内存索引
[Supabase模式] 保存到 knowledge_documents + knowledge_chunks
[pgvector模式] 生成 embeddings → 保存到 knowledge_chunks
```

### 问答流程
```
用户输入问题
    ↓
提取关键词
    ↓
[本地模式] 内存关键词搜索
[Supabase模式] 全文搜索
[pgvector模式] 向量相似度搜索
    ↓
返回 top-k 相关片段
    ↓
生成 answer draft
    ↓
返回 answer + sources + citations
```

## Citations 格式

```json
{
  "answer": "根据检索结果，...",
  "sources": [
    {
      "docId": "doc-1",
      "docTitle": "LaunchGuard 文档",
      "chunkId": "doc-1-0",
      "snippet": "LaunchGuard 审计 GitHub Pages 路由..."
    }
  ],
  "confidence": 0.85,
  "mode": "retrieval-only"
}
```

## 配置选项

### 环境变量
```bash
# Supabase (可选)
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon-key>

# OpenAI (可选，用于 pgvector embeddings)
OPENAI_API_KEY=<openai-key>
EMBEDDING_MODEL=text-embedding-3-small
```

### 前端配置
```typescript
// 检测可用的检索模式
const getRetrievalMode = () => {
  if (hasSupabase && hasPgvector && hasOpenAI) {
    return 'pgvector';
  }
  if (hasSupabase) {
    return 'supabase-fulltext';
  }
  return 'local-retrieval-only';
};
```

## 限制与注意事项

### Local Retrieval-Only
- ✅ 无需后端
- ✅ 即时响应
- ❌ 不支持持久化
- ❌ 搜索精度有限
- ❌ 不支持大规模文档

### Supabase Full-Text
- ✅ 数据持久化
- ✅ 支持复杂查询
- ❌ 需要 Supabase 账号
- ❌ 有免费额度限制

### pgvector
- ✅ 语义搜索
- ✅ 更准确
- ❌ 需要 OpenAI API Key
- ❌ 有成本
- ❌ 需要 Supabase pgvector 扩展

## 最佳实践

1. **默认本地模式**: 无需配置即可使用
2. **按需升级**: 用户可选择连接 Supabase
3. **渐进增强**: 先用关键词搜索，再升级到向量搜索
4. **明确标注**: 始终显示当前检索模式
5. **离线优先**: 无网络时仍可使用本地模式