export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: 'ai' | 'data' | 'backend' | 'design' | 'devops';
  tags: string[];
  path: string;
  featured: boolean;
  status: 'available' | 'coming-soon';
  techStack: string[];
  capabilities: string[];
  hasBackend: boolean;
  hasDatabase: boolean;
  hasRAG: boolean;
}

export const projects: Project[] = [
  {
    id: 'ai-interview-studio',
    name: 'AI Interview Studio',
    description: 'AI 驱动的面试准备平台，分析简历与岗位匹配度',
    longDescription: '输入简历和岗位 JD，自动分析技能匹配度、生成面试问题、提供 STAR 回答建议。展示 AI 工程、前后端、数据处理能力。',
    icon: '🎯',
    category: 'ai',
    tags: ['AI', '面试', 'NLP', '简历分析'],
    path: '/projects/ai-interview-studio',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'Node.js', 'NLP', 'localStorage'],
    capabilities: ['简历分析', '技能匹配', '面试问题生成', 'STAR 建议'],
    hasBackend: true,
    hasDatabase: false,
    hasRAG: false,
  },
  {
    id: 'github-repo-insight',
    name: 'GitHub Repo Insight',
    description: '输入 GitHub 仓库 URL，生成项目质量分析报告',
    longDescription: '分析 GitHub 仓库的代码质量、活跃度、文档完整性、CI/CD 配置等，生成可视化报告。展示 API 集成、数据分析、可视化能力。',
    icon: '📊',
    category: 'data',
    tags: ['GitHub', 'API', '数据分析', '可视化'],
    path: '/projects/github-repo-insight',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'GitHub API', 'Chart.js'],
    capabilities: ['仓库分析', '健康评分', '改进建议', '语言分布'],
    hasBackend: true,
    hasDatabase: false,
    hasRAG: false,
  },
  {
    id: 'research-navigator',
    name: 'AI Research Navigator',
    description: '基于 RAG 的学术论文检索与问答系统',
    longDescription: '使用 arXiv 论文数据，实现关键词搜索、相关论文推荐、带引用的问答。展示 RAG、检索、数据处理能力。',
    icon: '🔬',
    category: 'ai',
    tags: ['RAG', '检索', '学术', 'NLP'],
    path: '/projects/research-navigator',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'MiniSearch', 'TF-IDF'],
    capabilities: ['论文搜索', '相关性排序', '引用生成', '摘要提取'],
    hasBackend: true,
    hasDatabase: false,
    hasRAG: true,
  },
  {
    id: 'api-health-dashboard',
    name: 'API Health Dashboard',
    description: 'API 端点健康检查与状态监控仪表板',
    longDescription: '添加 API 端点，实时检查状态码、延迟、可用性。展示后端、定时任务、数据可视化能力。',
    icon: '💓',
    category: 'devops',
    tags: ['监控', 'API', '健康检查', '仪表板'],
    path: '/projects/api-health-dashboard',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'Node.js', 'Chart.js'],
    capabilities: ['状态检查', '延迟监控', '历史记录', '导出报告'],
    hasBackend: true,
    hasDatabase: false,
    hasRAG: false,
  },
  {
    id: 'design-token-studio',
    name: 'Design Token Studio',
    description: '设计系统 Token 生成与预览工具',
    longDescription: '输入主色，生成完整的颜色系统、阴影、间距等设计 Token，实时预览组件效果。展示前端设计系统能力。',
    icon: '🎨',
    category: 'design',
    tags: ['设计系统', 'Token', 'CSS', 'Tailwind'],
    path: '/projects/design-token-studio',
    featured: true,
    status: 'available',
    techStack: ['TypeScript', 'CSS Variables', 'Tailwind'],
    capabilities: ['颜色生成', 'Token 导出', '组件预览', '主题切换'],
    hasBackend: false,
    hasDatabase: false,
    hasRAG: false,
  },
];

export const projectCategories = [
  { id: 'ai', name: 'AI & 数据', icon: '🤖' },
  { id: 'data', name: '数据分析', icon: '📊' },
  { id: 'backend', name: '后端服务', icon: '⚙️' },
  { id: 'design', name: '设计系统', icon: '🎨' },
  { id: 'devops', name: '运维监控', icon: '💓' },
] as const;

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured && p.status === 'available');
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q))
  );
}