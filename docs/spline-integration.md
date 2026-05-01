# Spline 3D 视觉集成指南

## 当前状态

Portfolio Hub 和 6 个独立项目已经接入公开 Spline demo scene，当前用途是验证真实 Spline Viewer 嵌入、页面视觉和性能表现。

这些场景是 `temporary-demo-scene`，不是最终品牌资产，也不标记为个人自有资产。最终品牌级 3D 视觉建议后续在 Spline 中创建自有场景或 remix 后替换。

## 当前场景配置

| 项目 | 状态 | sourceType | 说明 |
|------|------|------------|------|
| Portfolio Hub | temporary-demo-scene | official-homepage-demo | 主站 Hero 3D |
| LifePilot | temporary-demo-scene | official-demo | 生活计划视觉 |
| InterviewPilot | temporary-demo-scene | official-demo | 面试对话视觉 |
| RepoPilot | temporary-demo-scene | official-demo | 代码网络视觉 |
| KnowledgePilot | temporary-demo-scene | official-demo | 知识图谱视觉 |
| OpsPilot | temporary-demo-scene | official-demo | 监控面板视觉 |
| Utilities | temporary-demo-scene | official-demo | 工具箱几何 |

每个 scene 配置必须保留以下字段：

- `sceneUrl`
- `source`
- `sourceType`
- `licenseConfidence`
- `usageDecision`
- `status`
- `replaceNote`

当前统一元数据：

```ts
licenseConfidence: 'medium'
usageDecision: 'use-temporary'
status: 'temporary-demo-scene'
replaceNote: '当前使用公开 Spline demo scene 作为临时 3D 视觉，用于验证嵌入与性能。最终品牌视觉建议在 Spline 中创建自有场景后替换。'
```

## Fallback 方案

Spline 加载失败、无 scene URL、移动端、省流量模式或 `prefers-reduced-motion` 时，页面保留 CSS/Three.js fallback。

Fallback 视觉包含：

- 深色高级背景
- 金色发光核心
- 网格背景
- 项目名称或场景说明

## 性能策略

1. 首页最多 1 个重型 Spline 场景。
2. 其他页面使用 lazy loading。
3. 移动端优先 fallback，不主动注入 Spline iframe。
4. `prefers-reduced-motion` 时禁用动态 fallback 动画。
5. iframe/canvas 使用非阻塞层级，不遮挡页面按钮和工作台控件。

## 版权注意

- 当前 URL 是公开 Spline demo scene，仅用于临时验证。
- 不复制付费模板。
- 不下载不明授权资源。
- 不写成最终品牌场景。
- 不伪装成个人自有资产。
- 不提交 token 或私有 URL。
- 所有来源必须记录在 `splineScenes.ts`。
