export interface SplineSceneConfig {
  label: string;
  purpose: string;
  sceneUrl: string;
  embedUrl: string;
  fallback: string;
  source: string;
  sourceType: 'official-demo' | 'official-homepage-demo';
  licenseConfidence: 'medium';
  usageDecision: 'use-temporary';
  license: string;
  status: 'temporary-demo-scene';
  replaceNote: string;
}

export const temporaryDemoReplaceNote =
  '当前使用公开 Spline demo scene 作为临时 3D 视觉，用于验证嵌入与性能。最终品牌视觉建议在 Spline 中创建自有场景后替换。';

export const splineScenes: Record<string, SplineSceneConfig> = {
  portfolio: {
    label: 'Portfolio Hub 个人网站',
    purpose: '主站 Hero 3D 视觉',
    sceneUrl: 'https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode',
    embedUrl: 'https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode',
    fallback: 'three-hero',
    source: 'https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode',
    sourceType: 'official-homepage-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  lifepilot: {
    label: 'LifePilot AI 生活管家',
    purpose: '日历、任务、生活计划、AI 助手',
    sceneUrl: 'https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode',
    embedUrl: 'https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode',
    fallback: 'calendar-orb',
    source: 'https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  interviewpilot: {
    label: 'InterviewPilot AI 面试教练',
    purpose: '对话、职业、面试、能力矩阵',
    sceneUrl: 'https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode',
    embedUrl: 'https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode',
    fallback: 'interview-panels',
    source: 'https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  repopilot: {
    label: 'RepoPilot GitHub 热榜与安全审查',
    purpose: '代码节点、仓库网络、安全盾牌',
    sceneUrl: 'https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode',
    embedUrl: 'https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode',
    fallback: 'repo-network',
    source: 'https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  knowledgepilot: {
    label: 'KnowledgePilot 知识库/RAG 助手',
    purpose: '知识图谱、文档、引用节点',
    sceneUrl: 'https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode',
    embedUrl: 'https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode',
    fallback: 'knowledge-graph',
    source: 'https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  opspilot: {
    label: 'OpsPilot API/日志/监控',
    purpose: '服务器、监控面板、API 流',
    sceneUrl: 'https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode',
    embedUrl: 'https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode',
    fallback: 'server-grid',
    source: 'https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
  utilities: {
    label: 'MIMO Utilities 工具集合',
    purpose: '工具箱、几何组件、格式化工具',
    sceneUrl: 'https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode',
    embedUrl: 'https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode',
    fallback: 'toolbox-geometry',
    source: 'https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode',
    sourceType: 'official-demo',
    licenseConfidence: 'medium',
    usageDecision: 'use-temporary',
    license: 'public-demo-temporary-validation',
    status: 'temporary-demo-scene',
    replaceNote: temporaryDemoReplaceNote,
  },
};

export function getSplineScene(key: string): SplineSceneConfig | undefined {
  return splineScenes[key];
}

export function hasSplineScene(key: string): boolean {
  const scene = splineScenes[key];
  return !!scene && !!scene.sceneUrl && scene.status === 'temporary-demo-scene';
}

export function getSplineSceneUrl(key: string): string {
  return splineScenes[key]?.sceneUrl || '';
}
