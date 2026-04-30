# MIMO 项目重构主计划

## 总目标

将当前 MIMO 项目重构为：
1. **Portfolio Hub** - 个人作品集、学习资料、项目展示、工具入口导航
2. **Standalone Projects** - 6 个独立完整项目

## 阶段规划

### 阶段 0：全局审计 ✅
- 确认当前仓库状态
- 确认 GitHub Pages 部署
- 确认 Render API 状态
- 创建 harness 结构

### 阶段 1：重构 Portfolio Hub
- 首页改为展示型
- /projects 改为项目卡片与跳转
- /tools 改为工具集合入口
- 新增 /learning 学习资料中心
- 新增 /analysis 资料分析总结
- /about 个人资料总结
- 旧 URL 兼容
- 运行测试和部署

### 阶段 2：创建独立项目工作区
- /i/MIMO-standalone-projects
- 创建 6 个项目目录
- 初始化基础工程

### 阶段 3：创建或连接 GitHub 仓库
- gh repo create 或记录 blockers
- 设置 remote
- 初始 commit

### 阶段 4-9：独立项目开发
- mimo-lifepilot
- mimo-interviewpilot
- mimo-repopilot
- mimo-knowledgepilot
- mimo-opspilot
- mimo-utilities

### 阶段 10：最终总验收

## 门禁系统

| Gate | 名称 | 状态 |
|------|------|------|
| 0 | Discovery | ✅ 通过 |
| 1 | Portfolio Hub 分离 | ⏳ 待执行 |
| 2 | Standalone Project Scaffolds | ⏳ 待执行 |
| 3 | Product Specs | ⏳ 待执行 |
| 4 | Implementation | ⏳ 待执行 |
| 5 | Testing | ⏳ 待执行 |
| 6 | Deployment Readiness | ⏳ 待执行 |
| 7 | Final Review | ⏳ 待执行 |