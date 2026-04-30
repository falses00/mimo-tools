import https from 'https';

const BASE_URL = 'https://falses00.github.io/mimo-tools';
const ERRORS: string[] = [];

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkPage(path: string, name: string) {
  const url = `${BASE_URL}${path}`;
  console.log(`Checking: ${url}`);
  
  try {
    const html = await fetchUrl(url);
    
    // Check for incorrect root paths
    const incorrectPatterns = [
      /href="\/projects"/,
      /href="\/projects\//,
      /href="\/tools"/,
      /href="\/tools\//,
      /href="\/blog"/,
      /href="\/blog\//,
      /href="\/about"/,
    ];
    
    for (const pattern of incorrectPatterns) {
      if (pattern.test(html)) {
        ERRORS.push(`[${name}] Found incorrect root path matching: ${pattern}`);
      }
    }
    
    // Check for h1
    if (!html.includes('<h1')) {
      ERRORS.push(`[${name}] Missing h1 tag`);
    }
    
    // Check for 404
    if (html.includes('Page not found') || html.includes('404')) {
      ERRORS.push(`[${name}] Contains 404 content`);
    }
    
    console.log(`  ✅ ${name} passed`);
  } catch (error) {
    ERRORS.push(`[${name}] Failed to fetch: ${error}`);
  }
}

async function main() {
  console.log('🔍 Auditing live site links...\n');
  
  // Check main pages
  await checkPage('/', 'Home');
  await checkPage('/projects', 'Projects');
  await checkPage('/tools', 'Tools');
  await checkPage('/blog', 'Blog');
  await checkPage('/about', 'About');
  
  // Check project pages
  await checkPage('/projects/ai-interview-studio', 'AI Interview Studio');
  await checkPage('/projects/github-repo-insight', 'GitHub Repo Insight');
  await checkPage('/projects/research-navigator', 'Research Navigator');
  await checkPage('/projects/api-health-dashboard', 'API Health Dashboard');
  await checkPage('/projects/design-token-studio', 'Design Token Studio');
  
  // Check tool pages
  await checkPage('/tools/json-formatter', 'JSON Formatter');
  await checkPage('/tools/markdown-previewer', 'Markdown Previewer');
  await checkPage('/tools/cron-helper', 'Cron Helper');
  await checkPage('/tools/color-palette', 'Color Palette');
  await checkPage('/tools/regex-tester', 'Regex Tester');
  await checkPage('/tools/text-utilities', 'Text Utilities');
  await checkPage('/tools/url-encoder', 'URL Encoder');
  await checkPage('/tools/base64-tool', 'Base64 Tool');
  await checkPage('/tools/timestamp-converter', 'Timestamp Converter');
  await checkPage('/tools/uuid-generator', 'UUID Generator');
  
  // Check blog pages
  await checkPage('/blog/why-mimo', 'Blog: Why MIMO');
  await checkPage('/blog/ai-workflow', 'Blog: AI Workflow');
  await checkPage('/blog/opencode-mimo', 'Blog: OpenCode MIMO');
  
  console.log('\n');
  
  if (ERRORS.length > 0) {
    console.log('❌ Errors found:');
    for (const error of ERRORS) {
      console.log(`  ${error}`);
    }
    console.log(`\n❌ Found ${ERRORS.length} errors`);
    process.exit(1);
  } else {
    console.log('✅ All live pages passed verification');
    process.exit(0);
  }
}

main().catch(console.error);
