import { FastifyInstance } from 'fastify';

interface AuditRequest {
  baseUrl?: string;
  html?: string;
}

interface AuditResult {
  score: number;
  totalLinks: number;
  correctLinks: number;
  errorLinks: number;
  warnings: number;
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    category: string;
    message: string;
  }>;
  recommendations: string[];
  markdownReport: string;
}

function analyzeHtml(html: string): AuditResult {
  const issues: AuditResult['issues'] = [];
  const recommendations: string[] = [];

  // Extract hrefs
  const hrefRegex = /href="([^"]*)"/g;
  let match;
  const allHrefs: string[] = [];

  while ((match = hrefRegex.exec(html)) !== null) {
    allHrefs.push(match[1]);
  }

  // Check for incorrect root paths
  const incorrectPatterns = [
    /^\/projects$/,
    /^\/projects\//,
    /^\/tools$/,
    /^\/tools\//,
    /^\/blog$/,
    /^\/blog\//,
    /^\/about$/,
  ];

  let correctLinks = 0;
  let errorLinks = 0;
  let warnings = 0;

  for (const href of allHrefs) {
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
      correctLinks++;
      continue;
    }

    let isIncorrect = false;
    for (const pattern of incorrectPatterns) {
      if (pattern.test(href)) {
        issues.push({
          type: 'error',
          category: '链接错误',
          message: `错误根路径: ${href}`,
        });
        errorLinks++;
        isIncorrect = true;
        break;
      }
    }

    if (!isIncorrect) correctLinks++;
  }

  // Check h1
  if (!html.includes('<h1')) {
    issues.push({ type: 'warning', category: 'SEO', message: '缺少 h1 标签' });
    warnings++;
  }

  // Check meta
  if (!html.includes('<title>')) {
    issues.push({ type: 'warning', category: 'SEO', message: '缺少 title 标签' });
    warnings++;
  }

  const totalLinks = allHrefs.length;
  const score = totalLinks > 0 ? Math.round((correctLinks / totalLinks) * 100) : 100;

  if (errorLinks > 0) {
    recommendations.push('修复所有错误根路径链接');
  }
  if (score === 100) {
    recommendations.push('所有链接正确，可以安全部署');
  }

  const markdownReport = `# LaunchGuard 审计报告

## 总分: ${score}/100

## 链接统计:
- 总链接: ${totalLinks}
- 正确: ${correctLinks}
- 错误: ${errorLinks}

## 问题:
${issues.map(i => `- [${i.type}] ${i.message}`).join('\n')}

## 建议:
${recommendations.map(r => `- ${r}`).join('\n')}
`;

  return {
    score,
    totalLinks,
    correctLinks,
    errorLinks,
    warnings,
    issues,
    recommendations,
    markdownReport,
  };
}

export async function launchguardRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: AuditRequest }>('/audit', async (request) => {
    const { html } = request.body;

    if (!html) {
      return { error: '请提供 HTML 内容' };
    }

    return analyzeHtml(html);
  });
}