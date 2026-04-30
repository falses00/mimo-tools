export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'ai' | 'tools' | 'devops' | 'knowledge';
  tags: string[];
  techStack: string[];
  status: 'production' | 'development' | 'planned';
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  highlights: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'lifepilot',
    name: 'LifePilot',
    tagline: 'AI 生活管家',
    description: '用一句话记录今天做了什么、接下来要做什么，自动生成已办、待办、提醒和生活计划。',
    icon: '🎯',
    category: 'ai',
    tags: ['AI', '生活管理', '自然语言', '待办', '习惯'],
    techStack: ['TypeScript', 'Fastify', 'Tailwind CSS', 'Supabase'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-lifepilot',
    demoUrl: 'https://falses00.github.io/mimo-tools/projects/lifepilot',
    highlights: ['一句话输入', '智能分类', 'API Mode', '历史记录', '导出日报'],
  },
  {
    id: 'interviewpilot',
    name: 'InterviewPilot',
    tagline: 'AI 面试教练',
    description: '粘贴简历和岗位 JD，自动分析技能匹配度、生成面试问题、提供 STAR 回答建议。',
    icon: '🎤',
    category: 'ai',
    tags: ['AI', '面试', '简历', 'JD', 'STAR'],
    techStack: ['TypeScript', 'Fastify', 'Tailwind CSS', 'Supabase'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-interviewpilot',
    demoUrl: 'https://falses00.github.io/mimo-tools/projects/interviewpilot',
    highlights: ['简历分析', 'JD 匹配', '面试问题', 'STAR 建议', '报告导出'],
  },
  {
    id: 'repopilot',
    name: 'RepoPilot',
    tagline: 'GitHub 热榜发现、安全审查与本地部署管家',
    description: '发现热门仓库、审查风险、生成本地部署计划。一站式解决找项目难、评估难、部署难。',
    icon: '🚀',
    category: 'devops',
    tags: ['GitHub', '安全审查', '部署', '热榜', '本地运行'],
    techStack: ['TypeScript', 'Fastify', 'GitHub API', 'Tailwind CSS'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-repopilot',
    demoUrl: 'https://falses00.github.io/mimo-tools/projects/repopilot',
    highlights: ['GitHub 热榜', '危险脚本检测', '部署计划', '本地 Runner'],
  },
  {
    id: 'knowledgepilot',
    name: 'KnowledgePilot',
    tagline: '个人知识库 / RAG 助手',
    description: '文档上传、chunk、检索、引用问答、sources/citations。',
    icon: '📚',
    category: 'knowledge',
    tags: ['RAG', '检索', '文档', '问答', '引用'],
    techStack: ['TypeScript', 'Fastify', 'MiniSearch', 'Tailwind CSS'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-knowledgepilot',
    demoUrl: 'https://falses00.github.io/mimo-tools/projects/knowledgepilot',
    highlights: ['文档检索', '引用来源', '本地优先', 'API Mode'],
  },
  {
    id: 'opspilot',
    name: 'OpsPilot',
    tagline: 'API / 日志 / 服务监控台',
    description: 'API 健康检查、合约校验、日志分析、事故复盘、服务状态 dashboard。',
    icon: '💓',
    category: 'devops',
    tags: ['监控', 'API', '日志', '健康检查', '事故复盘'],
    techStack: ['TypeScript', 'Fastify', 'Chart.js', 'Tailwind CSS'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-opspilot',
    demoUrl: 'https://falses00.github.io/mimo-tools/projects/opspilot',
    highlights: ['API 健康检查', '日志分析', '事故复盘', '服务监控'],
  },
  {
    id: 'utilities',
    name: 'MIMO Utilities',
    tagline: '开发者工具集合',
    description: 'Format Studio、Markdown Studio、Regex Studio、Encode Studio、Time & ID Studio、Design Utility。',
    icon: '🛠️',
    category: 'tools',
    tags: ['工具', '格式化', '编码', '时间', '设计'],
    techStack: ['TypeScript', 'Astro', 'Tailwind CSS'],
    status: 'production',
    githubUrl: 'https://github.com/falses00/mimo-utilities',
    demoUrl: 'https://falses00.github.io/mimo-tools/tools',
    highlights: ['JSON 格式化', 'Markdown 预览', '正则测试', 'URL 编码'],
  },
];

export const projectCategories = [
  { id: 'ai', name: 'AI 应用', icon: '🤖' },
  { id: 'tools', name: '开发者工具', icon: '🛠️' },
  { id: 'devops', name: 'DevOps', icon: '⚙️' },
  { id: 'knowledge', name: '知识管理', icon: '📚' },
] as const;

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter(p => p.status === 'production');
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  return portfolioProjects.filter(p => p.category === category);
}