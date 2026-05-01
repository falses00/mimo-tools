export interface LearningArticle {
  slug: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'agent' | 'review';
  tags: string[];
  date: string;
  readingTime: string;
  content: string;
}

export const learningArticles: LearningArticle[] = [
  {
    slug: 'why-portfolio-platform',
    title: '为什么把工具站重构为项目展示平台',
    description: '从普通工具集合到独立项目生态的思考过程，以及如何让面试官看到工程能力。',
    category: 'review',
    tags: ['架构', '产品', '面试', '重构'],
    date: '2026-05-01',
    readingTime: '5 分钟',
    content: `
## 背景

最初 MIMO 只是一个工具集合站，包含 JSON Formatter、Markdown Previewer 等小工具。

但这些工具太基础，无法展示真正的工程能力。

## 问题

1. 小工具没有技术深度
2. 无法展示全栈能力
3. 无法展示 AI/RAG 能力
4. 面试官看不到产品思维

## 解决方案

把项目拆分为独立完整产品：
- LifePilot - AI 生活管家
- InterviewPilot - AI 面试教练
- RepoPilot - GitHub 安全审查
- KnowledgePilot - RAG 助手
- OpsPilot - 监控台

每个项目都有完整的前后端、数据库、测试、部署。

## 收获

1. 展示了全栈能力
2. 展示了 AI/RAG 能力
3. 展示了产品设计能力
4. 展示了 DevOps 能力
    `,
  },
  {
    slug: 'github-pages-render-api',
    title: 'GitHub Pages 与 Render API 的全栈部署边界',
    description: '理解静态前端和动态后端的部署边界，以及如何实现 API Mode 和 Static Demo Mode。',
    category: 'devops',
    tags: ['部署', 'GitHub Pages', 'Render', 'API'],
    date: '2026-04-28',
    readingTime: '8 分钟',
    content: `
## GitHub Pages 限制

GitHub Pages 只能托管静态文件，不能运行 Node.js 后端。

## 解决方案

1. 前端部署到 GitHub Pages
2. 后端部署到 Render
3. 前端通过 PUBLIC_API_BASE_URL 连接后端

## API Mode vs Static Demo Mode

- API Mode: 调用真实后端 API
- Static Demo Mode: 使用本地规则解析

## 经验

1. 不要把后端逻辑写死在前端
2. 始终提供 fallback
3. 明确告诉用户当前模式
    `,
  },
  {
    slug: 'rag-retrieval-first',
    title: 'RAG 项目为什么要先做 retrieval-only',
    description: 'RAG 系统的渐进式实现策略，从关键词检索到向量检索的演进。',
    category: 'ai',
    tags: ['RAG', '检索', 'AI', '架构'],
    date: '2026-04-25',
    readingTime: '6 分钟',
    content: `
## RAG 全称

Retrieval-Augmented Generation

## 为什么先做 retrieval-only

1. 不需要 LLM API key
2. 不需要向量数据库
3. 可以快速验证检索逻辑
4. 用户可以看到真实结果

## 渐进式实现

1. 阶段 1: 关键词检索
2. 阶段 2: TF-IDF 检索
3. 阶段 3: 向量检索 (pgvector)
4. 阶段 4: LLM 生成

## 经验

1. 先让检索工作
2. 再优化排序
3. 最后加生成
    `,
  },
  {
    slug: 'repopilot-security-boundary',
    title: 'RepoPilot 的安全边界设计',
    description: '如何设计一个安全的本地部署管家，避免自动执行危险命令。',
    category: 'devops',
    tags: ['安全', '部署', '本地运行', '设计'],
    date: '2026-04-22',
    readingTime: '7 分钟',
    content: `
## 安全风险

1. 自动执行未知脚本
2. 覆盖用户文件
3. 读取用户密钥
4. 写入 C 盘

## 安全设计

1. 默认 dry-run
2. 用户确认机制
3. 路径安全检查
4. 危险命令检测
5. 不自动执行 install/start

## 检测的危险命令

- curl | sh
- sudo
- rm -rf
- postinstall
- preinstall
- eval
- base64 -d

## 经验

1. 安全优先
2. 用户确认
3. 最小权限
    `,
  },
  {
    slug: 'lifepilot-nlp-design',
    title: 'LifePilot 的自然语言解析思考',
    description: '如何设计一个简单但有效的自然语言解析器，识别已完成、待办、习惯、账单。',
    category: 'ai',
    tags: ['NLP', '自然语言', '解析', '设计'],
    date: '2026-04-20',
    readingTime: '6 分钟',
    content: `
## 设计目标

用户输入一句话，系统自动解析成结构化数据。

## 解析策略

1. 关键词匹配
2. 上下文分析
3. 置信度计算

## 关键词分类

- 已完成: 完成了、写完了、做完了
- 待办: 要、需要、计划、准备
- 习惯: 跑步、健身、阅读
- 账单: 花了、买了、续费

## 经验

1. 先做规则解析
2. 再做 AI 增强
3. 始终提供 fallback
    `,
  },
];

export function getLearningByCategory(category: string): LearningArticle[] {
  return learningArticles.filter(a => a.category === category);
}

export function getLearningBySlug(slug: string): LearningArticle | undefined {
  return learningArticles.find(a => a.slug === slug);
}

export function getRecentLearning(count: number = 3): LearningArticle[] {
  return learningArticles.slice(0, count);
}