export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'formatting' | 'text' | 'devops' | 'design' | 'testing';
  tags: string[];
  path: string;
  featured: boolean;
  status: 'available' | 'available';
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: '格式化、压缩、验证 JSON 数据，支持差异比较',
    icon: '{ }',
    category: 'formatting',
    tags: ['JSON', '格式化', '验证'],
    path: '/tools/json-formatter',
    featured: true,
    status: 'available',
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: '实时预览 Markdown，支持代码高亮和数学公式',
    icon: 'M↓',
    category: 'text',
    tags: ['Markdown', '预览', '写作'],
    path: '/tools/markdown-previewer',
    featured: true,
    status: 'available',
  },
  {
    id: 'cron-helper',
    name: 'Cron Helper',
    description: '可视化生成 Cron 表达式，查看未来执行时间',
    icon: '⏰',
    category: 'devops',
    tags: ['Cron', '定时任务', '调度'],
    path: '/tools/cron-helper',
    featured: true,
    status: 'available',
  },
  {
    id: 'color-palette',
    name: 'Color Palette',
    description: '生成协调调色板，支持 HEX/RGB/HSL 转换',
    icon: '🎨',
    category: 'design',
    tags: ['颜色', '调色板', '设计'],
    path: '/tools/color-palette',
    featured: true,
    status: 'available',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: '实时测试正则表达式，高亮匹配结果',
    icon: '.*',
    category: 'testing',
    tags: ['正则', 'Regex', '测试'],
    path: '/tools/regex-tester',
    featured: true,
    status: 'available',
  },
];

export const categories = [
  { id: 'formatting', name: '格式化', icon: '📝' },
  { id: 'text', name: '文本', icon: '📄' },
  { id: 'devops', name: '运维', icon: '⚙️' },
  { id: 'design', name: '设计', icon: '🎨' },
  { id: 'testing', name: '测试', icon: '🧪' },
] as const;

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured && t.status === 'available');
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );
}
