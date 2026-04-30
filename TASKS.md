# 任务清单

## 状态说明
- [ ] 待办
- [x] 完成
- [~] 进行中

## 第一阶段：基础设施 ✅
- [x] 初始化 monorepo (npm workspaces)
- [x] 创建 Astro 博客应用
- [x] 创建共享 UI 包 (@mimo/ui)
- [x] 配置 Tailwind + 深色模式
- [x] 配置 GitHub Actions deploy.yml
- [x] 创建 README.md / LICENSE / CONTRIBUTING.md / SECURITY.md

## 第二阶段：质量门禁 + 首个工具 ✅
- [x] 补齐质量门禁 (vitest, typecheck, lint scripts)
- [x] 创建工具数据模型 (src/data/tools.ts)
- [x] 创建 /tools 工具索引页面
- [x] 创建 JSON Formatter 工具 (含测试)
- [x] 更新首页 Featured Tools
- [x] 更新 README 工具清单

## 第三阶段：批量工具 ✅
- [x] Markdown Previewer
- [x] Cron Expression Helper
- [x] Color Palette Generator
- [x] Regex Tester
- [x] Text Utilities
- [x] URL Encoder/Decoder
- [x] Base64 Encoder/Decoder
- [x] Timestamp Converter
- [x] UUID Generator

## 第四阶段：博客系统 ✅
- [x] 配置 MDX 博客
- [x] 创建 3 篇初始文章

## 第五阶段：优化与部署 [~]
- [x] 性能优化 (Lighthouse > 90)
- [x] 可访问性检查
- [x] GitHub 仓库创建
- [x] GitHub Pages 部署

## 第六阶段：前端重构与精美化 ✅
- [x] 创建组件目录结构 (components/layout, home, tools, blog, ui)
- [x] 创建 SiteHeader, SiteFooter, ThemeToggle 组件
- [x] 创建 Hero, FeaturedTools 首页组件
- [x] 更新 Layout 使用新组件
- [x] 重构首页为现代 SaaS 风格
- [x] 添加响应式设计和深色模式支持

## 第七阶段：OpenCode Skills 配置 ✅
- [x] 创建 frontend-ui-engineer skill
- [x] 创建 visual-design-review skill
- [x] 创建 accessibility-review skill
- [x] 创建 tool-product-design skill
- [x] 创建 github-workflow-debug skill
- [x] 创建 security-release-guard skill
- [x] 创建 playwright-visual-qa skill
- [x] 更新 agent prompts 引用对应 skills
- [x] 配置 GitHub MCP 和 Playwright MCP

## 第八阶段：多 Agent 自主循环 [~]
- [x] 循环 1: 修复部署问题
- [x] 循环 2: 配置 MCP 和 Skills
- [x] 循环 3: 前端重构
- [x] 循环 4: 扩展工具到 10 个
- [x] 循环 5: 专业展示台与 Playwright 视觉验收
- [ ] 循环 6: 最终部署和验收

## 第九阶段：专业展示台 [~]
- [x] 判断是否需要创建新的大型项目：当前不需要，先以 MIMO 主站作为统一入口
- [x] 新增 `/workbench` 展示台页面，汇总前端、API、Render、Supabase 接入状态
- [x] 首页、导航、页脚接入工作台入口
- [x] 使用 Playwright 验证首页、工作台、移动端导航和关键链接

## 第十阶段：3D 视觉与旗舰项目完整度 [~]
- [x] 首页接入 Three.js 真实 3D 场景，替代纯 CSS 装饰感背景
- [x] 调整暗色/亮色主题，避免纯黑或纯白底色
- [x] 补齐 shadcn/Tailwind 兼容 token，稳定工具页卡片、边框、输入框视觉
- [x] 将 DataForge / SpecPilot / IncidentLab / KnowledgeBase 从占位页升级为可交互 Demo 工作台
- [x] Playwright 验证 3D canvas 非空、项目 Demo 可点击、移动端无横向溢出
- [ ] 发布前确认是否 push 到 GitHub 触发 Pages 部署
