export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'developer' | 'writing' | 'design' | 'datetime' | 'formatting' | 'text' | 'devops' | 'testing';
  tags: string[];
  path: string;
  featured: boolean;
  status: 'available' | 'coming-soon';
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
  {
    id: 'text-utilities',
    name: 'Text Utilities',
    description: '大小写转换、去空行、去首尾空格、统计字符/单词/行数',
    icon: 'Aa',
    category: 'writing',
    tags: ['文本', '大小写', '统计'],
    path: '/tools/text-utilities',
    featured: true,
    status: 'available',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'URL 编码/解码，Query string 解析',
    icon: '🔗',
    category: 'developer',
    tags: ['URL', '编码', '解码'],
    path: '/tools/url-encoder',
    featured: true,
    status: 'available',
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder/Decoder',
    description: 'Base64 编码/解码，支持 UTF-8',
    icon: '🔤',
    category: 'developer',
    tags: ['Base64', '编码', '解码'],
    path: '/tools/base64-tool',
    featured: true,
    status: 'available',
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Unix timestamp 与日期互转，本地时间/UTC 显示',
    icon: '⏱️',
    category: 'datetime',
    tags: ['时间戳', '日期', 'UTC'],
    path: '/tools/timestamp-converter',
    featured: true,
    status: 'available',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: '生成 v4 UUID，批量生成',
    icon: '🆔',
    category: 'developer',
    tags: ['UUID', '生成', '随机'],
    path: '/tools/uuid-generator',
    featured: true,
    status: 'available',
  },
];

export const categories = [
  { id: 'developer', name: '开发者工具', icon: '🛠️' },
  { id: 'writing', name: '写作工具', icon: '✍️' },
  { id: 'design', name: '设计工具', icon: '🎨' },
  { id: 'datetime', name: '日期时间', icon: '📅' },
  { id: 'formatting', name: '格式化', icon: '📝' },
  { id: 'text', name: '文本', icon: '📄' },
  { id: 'devops', name: '运维', icon: '⚙️' },
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
