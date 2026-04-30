# Troubleshooting

## 浏览器看到旧页面

**问题**: curl 验证线上 HTML 正确，但浏览器仍显示旧内容。

**原因**: 浏览器缓存或 CDN 缓存。

**解决方案**:
1. **强制刷新**: `Ctrl+Shift+R` (Windows/Linux) 或 `Cmd+Shift+R` (Mac)
2. **隐私窗口**: 使用浏览器隐私/无痕模式访问
3. **清除缓存**: 清除浏览器缓存后重新访问
4. **Cache Busting**: 访问带版本号的 URL
   ```
   https://falses00.github.io/mimo-tools/?v=642723e
   ```
5. **等待**: GitHub Pages 部署后可能有 1-5 分钟的 CDN 缓存延迟

## API 连接问题

**问题**: 前端显示 "Static Demo Mode" 而不是 "API Mode"。

**原因**: `PUBLIC_API_BASE_URL` 环境变量未设置。

**解决方案**:
1. 在 GitHub repo → Settings → Secrets and variables → Actions → Variables
2. 添加 `PUBLIC_API_BASE_URL` = 你的 Render API URL
3. 重新运行 GitHub Pages workflow

## 本地 API 启动失败

**问题**: `EADDRINUSE: address already in use`

**解决方案**:
```bash
# 找到占用端口的进程
netstat -ano | findstr :8787

# 终止进程
taskkill /PID <pid> /F

# 或使用不同端口
PORT=8788 npm run dev:api
```

## Render 部署失败

**问题**: Build 失败

**检查**:
1. `package.json` 中的 scripts 是否正确
2. `npm run build:api` 是否在本地通过
3. 环境变量是否设置

**解决方案**:
- Build Command: `npm ci && npm run build:api`
- Start Command: `npm run start:api`
- 确保 `apps/api/package.json` 有 `start` script

## Supabase 连接问题

**问题**: KnowledgeBase Studio 无法保存到 Supabase

**检查**:
1. `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 是否设置
2. 数据库 migration 是否运行
3. RLS 策略是否配置

**解决方案**:
1. 在 Supabase Dashboard → SQL Editor 运行 migration
2. 检查环境变量是否正确
3. 使用 Supabase Dashboard → Table Editor 查看数据

## 写入 C 盘问题

**问题**: 脚本尝试写入 C 盘

**解决方案**:
- 设置 `MIMO_DATA_DIR` 环境变量
- 默认使用 `.data/` 目录
- Render 使用 `/tmp/mimo-data`