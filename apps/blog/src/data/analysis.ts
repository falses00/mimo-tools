export interface AnalysisReport {
  slug: string;
  title: string;
  description: string;
  category: 'competitor' | 'tech-selection' | 'opensource' | 'dataset' | 'architecture' | 'security';
  tags: string[];
  date: string;
  conclusion: string;
  content: string;
}

export const analysisReports: AnalysisReport[] = [
  {
    slug: 'rag-solutions-analysis',
    title: '个人知识库 RAG 方案分析',
    description: '对比主流 RAG 方案，包括本地检索、Supabase pgvector、Pinecone、Weaviate 等。',
    category: 'tech-selection',
    tags: ['RAG', '向量数据库', '技术选型', 'AI'],
    date: '2026-04-30',
    conclusion: '个人项目优先使用本地检索，进阶使用 Supabase pgvector。',
    content: `
## 背景

需要为 KnowledgePilot 选择 RAG 方案。

## 方案对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| 本地关键词 | 简单、无依赖 | 精度低 |
| TF-IDF | 较准确 | 需要索引 |
| Supabase pgvector | 云端、可扩展 | 需要 Supabase |
| Pinecone | 专业向量数据库 | 付费 |
| Weaviate | 功能丰富 | 复杂 |

## 结论

个人项目优先本地检索，进阶用 Supabase pgvector。
    `,
  },
  {
    slug: 'github-security-audit',
    title: 'GitHub 开源项目安全审查方法',
    description: '如何审查开源项目的安全性，包括 package.json、Dockerfile、GitHub Actions。',
    category: 'security',
    tags: ['安全', 'GitHub', '审查', '开源'],
    date: '2026-04-28',
    conclusion: '重点检查 scripts、dependencies、Dockerfile、GitHub Actions。',
    content: `
## 审查重点

1. package.json scripts
2. dependencies 漏洞
3. Dockerfile 危险命令
4. GitHub Actions 权限

## 危险关键词

- postinstall
- preinstall
- curl | sh
- sudo
- rm -rf
- eval

## 工具

- npm audit
- Snyk
- Socket.dev
- Dependabot
    `,
  },
  {
    slug: 'deployment-platforms',
    title: '全栈项目部署平台对比',
    description: '对比 Render、Vercel、Cloudflare Pages、Supabase 等部署平台。',
    category: 'tech-selection',
    tags: ['部署', 'Render', 'Vercel', 'Cloudflare', 'Supabase'],
    date: '2026-04-25',
    conclusion: '前端用 GitHub Pages，后端用 Render，数据库用 Supabase。',
    content: `
## 平台对比

| 平台 | 前端 | 后端 | 数据库 | 价格 |
|------|------|------|--------|------|
| GitHub Pages | ✅ | ❌ | ❌ | 免费 |
| Render | ✅ | ✅ | ❌ | 免费层 |
| Vercel | ✅ | ✅ | ❌ | 免费层 |
| Cloudflare Pages | ✅ | ✅ | ❌ | 免费 |
| Supabase | ❌ | ✅ | ✅ | 免费层 |

## 推荐方案

- 前端: GitHub Pages
- 后端: Render
- 数据库: Supabase
    `,
  },
  {
    slug: 'theme-system-analysis',
    title: '前端主题系统与 3D 视觉设计分析',
    description: '如何设计一个支持多主题的 3D 暗金深灰高级视觉系统。',
    category: 'architecture',
    tags: ['主题', '3D', '设计系统', 'CSS'],
    date: '2026-04-22',
    conclusion: '使用 CSS variables + 主题文件 + 组件库实现统一视觉。',
    content: `
## 设计目标

- 暗金深灰高级风格
- 支持多主题
- 3D 层次感
- 响应式

## 实现方案

1. CSS variables 定义 token
2. 主题文件切换变量
3. 组件库统一风格
4. Three.js 实现 3D 效果

## 关键 token

--bg-page: #0f1115
--gold: #d4af37
--text-primary: #f7f2e8
    `,
  },
  {
    slug: 'multi-agent-workflow',
    title: '多 Agent 长链路开发流程复盘',
    description: '使用 OpenCode 多 Agent 系统进行长链路自主开发的经验总结。',
    category: 'architecture',
    tags: ['Agent', '工作流', '自动化', 'OpenCode'],
    date: '2026-04-20',
    conclusion: '多 Agent 流程提高了开发效率，但需要严格的门禁和证据验证。',
    content: `
## 流程

1. swarm-master 分派任务
2. product-agent 做产品规划
3. frontend-agent 实现 UI
4. backend-agent 实现 API
5. qa-agent 测试
6. critic-agent 审查
7. release-agent 部署

## 经验

1. 门禁必须严格
2. 证据必须真实
3. 不能自称完成
4. 自动循环修复
    `,
  },
];

export function getAnalysisByCategory(category: string): AnalysisReport[] {
  return analysisReports.filter(r => r.category === category);
}

export function getAnalysisBySlug(slug: string): AnalysisReport | undefined {
  return analysisReports.find(r => r.slug === slug);
}

export function getRecentAnalysis(count: number = 3): AnalysisReport[] {
  return analysisReports.slice(0, count);
}