# Spline 3D 视觉集成指南

## 当前状态

Spline 组件已创建，但需要用户提供 scene URL 才能启用真实 3D 场景。

## 如何添加 Spline 场景

### 步骤 1：创建 Spline 场景

1. 访问 [spline.design](https://spline.design)
2. 登录或注册账号
3. 创建新场景或使用社区模板
4. 设计你的 3D 视觉效果

### 步骤 2：获取嵌入 URL

1. 在 Spline 编辑器中，点击 "Export"
2. 选择 "Viewer" 或 "Code"
3. 复制公开访问的 URL

### 步骤 3：配置场景

编辑 `apps/blog/src/data/splineScenes.ts`：

```typescript
export const splineScenes = {
  portfolio: {
    label: 'Portfolio Hub',
    sceneUrl: 'https://my.spline.design/your-scene-id',  // 填入你的场景 URL
    status: 'ready',
    // ...
  },
  // ...
};
```

### 步骤 4：使用组件

在页面中使用 SplineScene 组件：

```astro
---
import SplineScene from '../components/visual/SplineScene.astro';
import { getSplineSceneUrl } from '../data/splineScenes';
---

<SplineScene 
  sceneKey="portfolio"
  sceneUrl={getSplineSceneUrl('portfolio')}
  title="3D 视觉效果"
  height="500px"
/>
```

## 当前场景配置

| 项目 | 状态 | 说明 |
|------|------|------|
| Portfolio Hub | ⏳ 需要 URL | 主站 Hero 3D |
| LifePilot | ⏳ 需要 URL | 生活计划视觉 |
| InterviewPilot | ⏳ 需要 URL | 面试对话视觉 |
| RepoPilot | ⏳ 需要 URL | 代码网络视觉 |
| KnowledgePilot | ⏳ 需要 URL | 知识图谱视觉 |
| OpsPilot | ⏳ 需要 URL | 监控面板视觉 |
| Utilities | ✅ Fallback | 工具箱几何 |

## Fallback 方案

当没有 Spline URL 时，自动使用 CSS 3D 效果：
- 金色光球脉冲
- 网格背景
- 文字标题

## 性能建议

1. 首页最多 1 个重型 Spline 场景
2. 其他页面使用 lazy loading
3. 移动端优先 fallback
4. `prefers-reduced-motion` 时禁用动画

## 版权注意

- 不复制付费模板
- 不下载不明授权资源
- 只使用自己创建或公开可嵌入的场景
- 所有来源必须记录