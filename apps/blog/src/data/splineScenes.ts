export interface SplineSceneConfig {
  label: string;
  purpose: string;
  sceneUrl: string;
  embedUrl: string;
  fallback: string;
  source: string;
  license: string;
  status: 'ready' | 'needs-scene-url' | 'fallback-only';
}

export const splineScenes: Record<string, SplineSceneConfig> = {
  portfolio: {
    label: 'Portfolio Hub 个人网站',
    purpose: '主站 Hero 3D 视觉',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'three-hero',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  lifepilot: {
    label: 'LifePilot AI 生活管家',
    purpose: '日历、任务、生活计划、AI 助手',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'calendar-orb',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  interviewpilot: {
    label: 'InterviewPilot AI 面试教练',
    purpose: '对话、职业、面试、能力矩阵',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'interview-panels',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  repopilot: {
    label: 'RepoPilot GitHub 热榜与安全审查',
    purpose: '代码节点、仓库网络、安全盾牌',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'repo-network',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  knowledgepilot: {
    label: 'KnowledgePilot 知识库/RAG 助手',
    purpose: '知识图谱、文档、引用节点',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'knowledge-graph',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  opspilot: {
    label: 'OpsPilot API/日志/监控',
    purpose: '服务器、监控面板、API 流',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'server-grid',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'needs-scene-url',
  },
  utilities: {
    label: 'MIMO Utilities 工具集合',
    purpose: '工具箱、几何组件、格式化工具',
    sceneUrl: '',
    embedUrl: '',
    fallback: 'toolbox-geometry',
    source: 'pending-user-spline-url',
    license: 'pending',
    status: 'fallback-only',
  },
};

export function getSplineScene(key: string): SplineSceneConfig | undefined {
  return splineScenes[key];
}

export function hasSplineScene(key: string): boolean {
  const scene = splineScenes[key];
  return !!scene && !!scene.sceneUrl && scene.status === 'ready';
}

export function getSplineSceneUrl(key: string): string {
  return splineScenes[key]?.sceneUrl || '';
}