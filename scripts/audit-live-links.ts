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

async function checkPage(path: string, name: string, requiredContent?: string[], forbiddenContent?: string[]) {
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
    
    // Check required content
    if (requiredContent) {
      for (const content of requiredContent) {
        if (!html.includes(content)) {
          ERRORS.push(`[${name}] Missing required content: ${content}`);
        }
      }
    }
    
    // Check forbidden content
    if (forbiddenContent) {
      for (const content of forbiddenContent) {
        if (html.includes(content)) {
          ERRORS.push(`[${name}] Contains forbidden content: ${content}`);
        }
      }
    }
    
    console.log(`  ✅ ${name} passed`);
  } catch (error) {
    ERRORS.push(`[${name}] Failed to fetch: ${error}`);
  }
}

async function main() {
  console.log('🔍 Auditing live site links...\n');
  
  // New flagship projects (current Portfolio Hub)
  const newProjects = [
    'LifePilot',
    'InterviewPilot',
    'RepoPilot',
    'KnowledgePilot',
    'OpsPilot',
    'MIMO Utilities'
  ];
  
  // Old projects that should NOT be on homepage
  const oldProjects = [
    'AI Interview Studio',
    'GitHub Repo Insight',
    'AI Research Navigator',
    'API Health Dashboard',
    'Design Token Studio'
  ];
  
  // Check main pages
  await checkPage('/', 'Home', newProjects, oldProjects);
  await checkPage('/projects', 'Projects');
  await checkPage('/tools', 'Tools');
  await checkPage('/blog', 'Blog');
  await checkPage('/about', 'About');
  await checkPage('/learning', 'Learning');
  await checkPage('/analysis', 'Analysis');
  
  // Check standalone project pages
  await checkPage('/projects/lifepilot', 'LifePilot');
  await checkPage('/projects/interviewpilot', 'InterviewPilot');
  await checkPage('/projects/repopilot', 'RepoPilot');
  await checkPage('/projects/knowledgepilot', 'KnowledgePilot');
  await checkPage('/projects/opspilot', 'OpsPilot');
  
  // Check old project compatibility pages
  await checkPage('/projects/launchguard', 'LaunchGuard (compat)');
  await checkPage('/projects/repolens', 'RepoLens (compat)');
  await checkPage('/projects/dataforge', 'DataForge (compat)');
  await checkPage('/projects/specpilot', 'SpecPilot (compat)');
  await checkPage('/projects/incidentlab', 'IncidentLab (compat)');
  await checkPage('/projects/knowledgebase-studio', 'KnowledgeBase Studio (compat)');
  
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
  
  // Check learning pages
  await checkPage('/learning/why-portfolio-platform', 'Learning: Why Portfolio');
  await checkPage('/learning/github-pages-render-api', 'Learning: GitHub Pages');
  
  // Check analysis pages
  await checkPage('/analysis/rag-solutions-analysis', 'Analysis: RAG Solutions');
  await checkPage('/analysis/github-security-audit', 'Analysis: GitHub Security');
  
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
    console.log('✅ New flagship projects are present');
    console.log('✅ Old projects are not in homepage');
    console.log('✅ No incorrect root paths found');
    process.exit(0);
  }
}

main().catch(console.error);
