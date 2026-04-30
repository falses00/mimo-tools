# 数据库策略

## 概述
MIMO 项目采用分层数据存储策略，根据功能需求选择合适的存储方式。

## 存储层级

### 1. 浏览器本地存储 (默认)
- **用途**: 临时数据、用户偏好、最近操作
- **技术**: localStorage / IndexedDB
- **适用项目**:
  - DataForge: 保存最近 dataset 和 query
  - IncidentLab: 保存最近 incident report
  - RepoLens: 保存最近 repo 分析报告
  - LaunchGuard: 保存最近审计报告

**优点**:
- 无需后端
- 即时响应
- 离线可用

**限制**:
- 数据仅在当前浏览器
- 清除浏览器数据会丢失
- 存储容量有限

### 2. Supabase Postgres (云端)
- **用途**: 持久化数据、多设备同步、团队协作
- **技术**: Supabase Postgres + pgvector
- **适用项目**:
  - KnowledgeBase Studio: 文档、chunks、embeddings
  - 所有项目: 可选的报告保存

**优点**:
- 数据持久化
- 多设备同步
- 支持复杂查询
- pgvector 支持向量搜索

**限制**:
- 需要 Supabase 账号
- 有免费额度限制
- 需要网络连接

### 3. 本地文件系统 (开发/自托管)
- **用途**: 本地开发、自托管部署
- **技术**: SQLite / JSON 文件
- **路径**: `.data/` 目录 (通过 MIMO_DATA_DIR 配置)

**优点**:
- 完全控制数据
- 无需外部服务
- 适合开发测试

**限制**:
- 不支持多设备
- 需要手动备份
- 不适合生产环境

## 各项目数据需求

### LaunchGuard
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| 审计报告 | localStorage | ❌ 可选 |
| 审计历史 | Supabase project_reports | ❌ 可选 |

### RepoLens
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| 分析报告 | localStorage | ❌ 可选 |
| 分析历史 | Supabase project_reports | ❌ 可选 |

### DataForge
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| 用户数据集 | IndexedDB | ✅ 默认 |
| 查询历史 | localStorage | ❌ 可选 |
| 数据集快照 | Supabase saved_datasets | ❌ 可选 |

### SpecPilot
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| API Spec | 内存 | ✅ 默认 |
| Contract Report | localStorage | ❌ 可选 |

### IncidentLab
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| 日志数据 | 内存 | ✅ 默认 |
| Incident Report | localStorage | ❌ 可选 |
| 报告历史 | Supabase incident_reports | ❌ 可选 |

### KnowledgeBase Studio
| 数据类型 | 存储方式 | 必需 |
|----------|----------|------|
| 文档 | 内存 / Supabase | ✅ 默认 |
| Chunks | 内存 / Supabase | ✅ 默认 |
| Embeddings | Supabase pgvector | ❌ 可选 |
| 搜索索引 | 内存 / Supabase | ✅ 默认 |

## 数据路径安全

### 默认路径
- `.data/` - 项目根目录下
- 通过 `MIMO_DATA_DIR` 环境变量配置

### 安全规则
- ✅ 默认使用项目内 `.data/` 目录
- ✅ 支持 `MIMO_DATA_DIR` 自定义路径
- ❌ 禁止写入 C 盘根目录
- ❌ 禁止写入用户主目录
- ❌ 禁止写入 AppData

### .gitignore
```
.data/
*.db
*.sqlite
*.sqlite3
```

## Supabase 配置

### 环境变量
```bash
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # 仅后端使用
```

### 安全注意事项
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` 只能在后端使用
- ⚠️ 绝不能暴露到前端
- ✅ `SUPABASE_ANON_KEY` 可以在前端使用 (配合 RLS)

## 迁移策略

### 从 localStorage 迁移到 Supabase
1. 用户在前端点击 "同步到云端"
2. 前端调用 API 保存数据
3. 后端写入 Supabase
4. 前端更新本地缓存

### 从 Supabase 导出
1. 用户在前端点击 "导出"
2. 前端调用 API 获取数据
3. 生成 JSON/CSV 文件
4. 浏览器下载

## 最佳实践

1. **优先本地存储**: 默认使用 localStorage/IndexedDB
2. **按需云端同步**: 用户主动选择同步到 Supabase
3. **离线优先**: 无网络时仍可使用本地功能
4. **数据安全**: 敏感数据不上传云端
5. **容量管理**: 定期清理过期数据