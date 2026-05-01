# Spline 3D 视觉资产研究

## 1. Spline 集成方式

### 1.1 Public URL iframe
- 优点: 简单、兼容性好
- 缺点: 无法精细控制、性能一般
- Astro 兼容: ✅
- GitHub Pages: ✅

### 1.2 spline-viewer Web Component
- 优点: 轻量、易于集成
- 缺点: 功能有限
- Astro 兼容: ✅
- GitHub Pages: ✅
- 用法: `<spline-viewer url="https://my.spline.design/xxx"></spline-viewer>`

### 1.3 React @splinetool/react-spline
- 优点: 功能完整、可控性强
- 缺点: 需要 React、增加 bundle
- Astro 兼容: ✅ (client:visible)
- GitHub Pages: ✅

### 1.4 Code Export
- 优点: 完全控制
- 缺点: 文件大、维护难
- 推荐: 不使用

### 1.5 GLB/GLTF Export
- 优点: 标准格式、Three.js 兼容
- 缺点: 需要手动加载
- 推荐: 作为 fallback

## 2. 推荐方案

| 项目 | 推荐方案 | 备注 |
|------|----------|------|
| Portfolio Hub | spline-viewer | 轻量、兼容 |
| LifePilot | spline-viewer + fallback | 主题: 生活计划 |
| InterviewPilot | spline-viewer + fallback | 主题: 面试对话 |
| RepoPilot | spline-viewer + fallback | 主题: 代码网络 |
| KnowledgePilot | spline-viewer + fallback | 主题: 知识图谱 |
| OpsPilot | spline-viewer + fallback | 主题: 监控面板 |
| Utilities | CSS 3D fallback | 工具箱几何 |

## 3. 版权注意
- 不复制付费模板
- 不下载不明授权资源
- 只使用用户自己创建或公开可嵌入的场景
- 所有来源必须记录

## 4. 性能策略
- 首页最多 1 个重型场景
- 其它页面 lazy load
- 移动端优先 fallback
- prefers-reduced-motion 降级

## 5. 当前状态
- 需要用户提供 Spline scene URL
- 当前使用 Three.js / CSS 3D fallback
