import { FastifyInstance } from 'fastify';
interface AnalyzeRequest {
  repo?: string;
  manifest?: {
    name?: string;
    owner?: string;
    readme?: boolean;
    license?: string;
    hasTests?: boolean;
    testFramework?: string;
    hasCI?: boolean;
    ciProvider?: string;
    hasDocs?: boolean;
    languages?: Record<string, number>;
    scripts?: string[];
  };
}
interface AnalyzeResult {
  score: number;
  checks: Array<{ name: string; passed: boolean; details: string }>;
  recommendations: string[];
  info: Record<string, string>;
  markdownReport: string;
}
function analyzeManifest(manifest: AnalyzeRequest['manifest']): AnalyzeResult {
  if (!manifest) {
    return {
      score: 0,
      checks: [],
      recommendations: ['请提供 manifest 数据'],
      info: {},
      markdownReport: '# 错误: 缺少 manifest 数据',
    };
  }
  const checks: AnalyzeResult['checks'] = [];
  const recommendations: string[] = [];
  let score = 0;
  // README
  checks.push({
    name: 'README',
    passed: !!manifest.readme,
    details: manifest.readme ? 'README 存在' : '缺少 README',
  });
  if (manifest.readme) score += 15;
  else recommendations.push('添加 README.md');
  // LICENSE
  checks.push({
    name: 'LICENSE',
    passed: !!manifest.license,
    details: manifest.license ? `许可证: ${manifest.license}` : '缺少 LICENSE',
  });
  if (manifest.license) score += 10;
  else recommendations.push('添加 LICENSE');
  // Tests
  checks.push({
    name: 'Tests',
    passed: !!manifest.hasTests,
    details: manifest.hasTests ? `框架: ${manifest.testFramework}` : '未配置测试',
  });
  if (manifest.hasTests) score += 20;
  else recommendations.push('添加单元测试');
  // CI
  checks.push({
    name: 'CI/CD',
    passed: !!manifest.hasCI,
    details: manifest.hasCI ? `平台: ${manifest.ciProvider}` : '未配置 CI',
  });
  if (manifest.hasCI) score += 20;
  else recommendations.push('配置 GitHub Actions');
  // Docs
  checks.push({
    name: 'Documentation',
    passed: !!manifest.hasDocs,
    details: manifest.hasDocs ? '文档齐全' : '缺少文档',
  });
  if (manifest.hasDocs) score += 15;
  else recommendations.push('添加文档');
  // Scripts
  const essentialScripts = ['dev', 'build', 'test'];
  const hasEssentials = essentialScripts.every(s => manifest.scripts?.includes(s));
  checks.push({
    name: 'Package Scripts',
    passed: hasEssentials,
    details: hasEssentials ? '必需脚本齐全' : '缺少必需脚本',
  });
  if (hasEssentials) score += 10;
  // TypeScript
  const hasTypeScript = manifest.languages && 'TypeScript' in manifest.languages;
  checks.push({
    name: 'TypeScript',
    passed: !!hasTypeScript,
    details: hasTypeScript ? '使用 TypeScript' : '未使用 TypeScript',
  });
  if (hasTypeScript) score += 10;
  const info: Record<string, string> = {
    '仓库': `${manifest.owner}/${manifest.name}`,
    '主要语言': Object.entries(manifest.languages || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || '未知',
    '脚本': manifest.scripts?.join(', ') || '无',
  };
  const markdownReport = `# RepoLens 质量报告
## 评分: ${score}/100
## 检查项:
${checks.map(c => `- ${c.passed ? '✅' : '❌'} ${c.name}: ${c.details}`).join('\n')}
## 建议:
${recommendations.map(r => `- ${r}`).join('\n')}
`;
  return { score: Math.min(100, score), checks, recommendations, info, markdownReport };
}
export async function repolensRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: AnalyzeRequest }>('/analyze', async (request) => {
    const { manifest } = request.body;
    return analyzeManifest(manifest);
  });
}