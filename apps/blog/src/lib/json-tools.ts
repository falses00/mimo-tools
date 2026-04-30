export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export function validateJson(input: string): JsonValidationResult {
  if (!input.trim()) {
    return { valid: false, error: '输入不能为空' };
  }
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e: any) {
    const msg = e.message || 'Invalid JSON';
    const match = msg.match(/position\s+(\d+)/);
    let line: number | undefined;
    let column: number | undefined;
    if (match) {
      const pos = parseInt(match[1]);
      const lines = input.substring(0, pos).split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }
    return { valid: false, error: msg, line, column };
  }
}

export function formatJson(input: string, indent: number = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function jsonDiff(a: string, b: string): string {
  const objA = JSON.parse(a);
  const objB = JSON.parse(b);
  const changes: string[] = [];
  
  function diffObjects(prev: any, curr: any, path: string = '') {
    const allKeys = new Set([...Object.keys(prev || {}), ...Object.keys(curr || {})]);
    for (const key of allKeys) {
      const fullPath = path ? `${path}.${key}` : key;
      if (!(key in (prev || {}))) {
        changes.push(`+ ${fullPath}: ${JSON.stringify(curr[key])}`);
      } else if (!(key in (curr || {}))) {
        changes.push(`- ${fullPath}: ${JSON.stringify(prev[key])}`);
      } else if (typeof prev[key] === 'object' && typeof curr[key] === 'object' && prev[key] !== null && curr[key] !== null) {
        diffObjects(prev[key], curr[key], fullPath);
      } else if (JSON.stringify(prev[key]) !== JSON.stringify(curr[key])) {
        changes.push(`~ ${fullPath}: ${JSON.stringify(prev[key])} → ${JSON.stringify(curr[key])}`);
      }
    }
  }
  
  diffObjects(objA, objB);
  return changes.length === 0 ? '无差异' : changes.join('\n');
}

export const EXAMPLE_JSON = `{
  "name": "MIMO",
  "version": "1.0.0",
  "tools": [
    "JSON Formatter",
    "Markdown Previewer",
    "Cron Helper"
  ],
  "config": {
    "theme": "dark",
    "language": "zh-CN"
  }
}`;
