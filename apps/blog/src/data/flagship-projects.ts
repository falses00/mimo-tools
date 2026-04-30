export interface FlagshipProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'life' | 'interview' | 'quality' | 'data' | 'api' | 'incident' | 'knowledge';
  tags: string[];
  path: string;
  featured: boolean;
  status: 'available' | 'coming-soon';
  techStack: string[];
  capabilities: string[];
  highlights: string[];
  isFrontendOnly: boolean;
  hasBackend: boolean;
  hasRAG: boolean;
}

export const flagshipProjects: FlagshipProject[] = [
  {
    id: 'lifepilot',
    name: 'LifePilot',
    tagline: 'AI 生活管家',
    description: '用一句话记录今天做了什么、接下来要做什么，自动生成已办、待办、提醒和生活计划。',
    icon: '🎯',
    category: 'life',
    tags: ['AI', '生活管理', '自然语言', '待办', '习惯'],
    path: '/projects/lifepilot',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'NLP', 'localStorage', 'Fastify'],
    capabilities: ['自然语言解析', '自动分类', '待办管理', '习惯追踪', '账单记录', '日报导出'],
    highlights: ['一句话输入', '智能分类', '本地优先', 'API Mode', '历史记录'],
    isFrontendOnly: false,
    hasBackend: true,
    hasRAG: false,
  },
  {
    id: 'interviewpilot',
    name: 'InterviewPilot',
    tagline: 'AI 面试教练',
    description: '粘贴简历和岗位 JD，自动分析技能匹配度、生成面试问题、提供 STAR 回答建议。',
    icon: '🎤',
    category: 'interview',
    tags: ['AI', '面试', '简历', 'JD', 'STAR'],
    path: '/projects/interviewpilot',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'NLP', 'localStorage', 'Fastify'],
    capabilities: ['简历分析', 'JD 匹配', '面试问题', 'STAR 建议', '报告导出'],
    highlights: ['技能匹配', '缺口分析', '面试准备', 'STAR 框架', '历史记录'],
    isFrontendOnly: false,
    hasBackend: true,
    hasRAG: false,
  },
  {
    id: 'launchguard',
    name: 'LaunchGuard',
    tagline: 'Site Release QA Auditor',
    description: '上线质量与路由审计工具，专门检查 GitHub Pages / Astro base path / 内部链接 / 404 / SEO meta / 可点击性。',
    icon: '🛡️',
    category: 'quality',
    tags: ['QA', '审计', '路由', '链接检查', 'SEO'],
    path: '/projects/launchguard',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'HTML Parser', 'Link Checker'],
    capabilities: ['链接审计', 'Base Path 检测', '404 风险评估', 'SEO 检查', '报告导出'],
    highlights: ['检测错误根路径', '计算 Launch QA Score', '生成修复建议', '导出 Markdown 报告'],
    isFrontendOnly: true,
    hasBackend: false,
    hasRAG: false,
  },
  {
    id: 'repolens',
    name: 'RepoLens',
    tagline: 'Codebase Quality Auditor',
    description: '代码仓库质量审计台。分析 repo 的工程质量、文档、CI、测试、部署风险。',
    icon: '🔍',
    category: 'quality',
    tags: ['代码质量', '仓库分析', 'CI/CD', '文档', '测试'],
    path: '/projects/repolens',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'GitHub API', 'Manifest Analyzer'],
    capabilities: ['仓库分析', '质量评分', '改进建议', '报告导出'],
    highlights: ['检查 README/LICENSE', '分析 package.json', '检查测试覆盖', '评估 CI/CD 配置'],
    isFrontendOnly: false,
    hasBackend: true,
    hasRAG: false,
  },
  {
    id: 'dataforge',
    name: 'DataForge',
    tagline: 'Browser Data Workbench',
    description: '浏览器内数据分析工作台。上传 CSV/JSON，自动数据画像，SQL 查询，图表建议，导出报告。',
    icon: '⚒️',
    category: 'data',
    tags: ['数据分析', 'CSV', 'JSON', 'SQL', '可视化'],
    path: '/projects/dataforge',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'DuckDB-WASM', 'SQL Parser'],
    capabilities: ['数据上传', 'Schema 推断', 'SQL 查询', '数据画像', '报告导出'],
    highlights: ['自动识别字段类型', '缺失值分析', 'SQL 查询引擎', '图表推荐'],
    isFrontendOnly: true,
    hasBackend: false,
    hasRAG: false,
  },
  {
    id: 'specpilot',
    name: 'SpecPilot',
    tagline: 'API Contract & Mock Studio',
    description: 'API 合约、Mock、Schema 校验工作台。解析 OpenAPI，生成 mock，校验 response。',
    icon: '✈️',
    category: 'api',
    tags: ['API', 'OpenAPI', 'JSON Schema', 'Mock', '校验'],
    path: '/projects/specpilot',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'Ajv', 'OpenAPI Parser'],
    capabilities: ['Spec 解析', 'Mock 生成', 'Schema 校验', '代码生成', '报告导出'],
    highlights: ['解析 OpenAPI endpoints', '生成 mock response', '校验 response schema', '生成 curl/fetch 示例'],
    isFrontendOnly: true,
    hasBackend: false,
    hasRAG: false,
  },
  {
    id: 'incidentlab',
    name: 'IncidentLab',
    tagline: 'Log & Incident Analyzer',
    description: '日志异常分析与故障复盘生成器。解析日志，检测异常，生成 incident report。',
    icon: '🔬',
    category: 'incident',
    tags: ['日志分析', '故障排查', '异常检测', '时间线', '复盘'],
    path: '/projects/incidentlab',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'Log Parser', 'Anomaly Detector'],
    capabilities: ['日志解析', '异常检测', '时间线生成', '根因分析', '报告导出'],
    highlights: ['自动解析 timestamp/level/service', '统计 error/warn/info', '检测异常峰值', '生成 action items'],
    isFrontendOnly: true,
    hasBackend: false,
    hasRAG: false,
  },
  {
    id: 'knowledgebase-studio',
    name: 'KnowledgeBase Studio',
    tagline: 'Local RAG & Citation Search',
    description: '本地文档检索和带引用问答。上传文档，构建索引，搜索，生成带引用的回答。',
    icon: '📚',
    category: 'knowledge',
    tags: ['RAG', '检索', '引用', '文档', '问答'],
    path: '/projects/knowledgebase-studio',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'MiniSearch', 'TF-IDF'],
    capabilities: ['文档上传', '索引构建', '关键词搜索', '引用问答', '报告导出'],
    highlights: ['本地全文检索', '检索增强生成', '带引用回答', '导出索引'],
    isFrontendOnly: true,
    hasBackend: false,
    hasRAG: true,
  },
];

export const projectCategories = [
  { id: 'quality', name: '质量审计', icon: '🛡️' },
  { id: 'data', name: '数据分析', icon: '⚒️' },
  { id: 'api', name: 'API 工具', icon: '✈️' },
  { id: 'incident', name: '故障分析', icon: '🔬' },
  { id: 'knowledge', name: '知识检索', icon: '📚' },
] as const;

export function getFeaturedProjects(): FlagshipProject[] {
  return flagshipProjects.filter(p => p.featured && p.status === 'available');
}

export function getProjectsByCategory(category: string): FlagshipProject[] {
  return flagshipProjects.filter(p => p.category === category);
}

export function searchProjects(query: string): FlagshipProject[] {
  const q = query.toLowerCase();
  return flagshipProjects.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q))
  );
}