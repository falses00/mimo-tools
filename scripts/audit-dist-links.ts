import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const DIST_DIR = resolve('apps/blog/dist');
const BASE = '/mimo-tools';
const ERRORS: string[] = [];

function getAllHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(DIST_DIR, '');
  
  // Find all href="..." patterns
  const hrefRegex = /href="([^"]*)"/g;
  let match;
  
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    
    // Skip external URLs, anchors, mailto, tel
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    
    // Skip Astro assets (css, js, images)
    if (href.startsWith('/mimo-tools/_astro/') || href.includes('.css') || href.includes('.js')) {
      continue;
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
    
    for (const pattern of incorrectPatterns) {
      if (pattern.test(href)) {
        ERRORS.push(`[${relativePath}] Incorrect root path: ${href}`);
      }
    }
  }
}

console.log('🔍 Auditing dist links for incorrect root paths...\n');

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files\n`);

for (const file of htmlFiles) {
  checkFile(file);
}

if (ERRORS.length > 0) {
  console.log('❌ Errors found:');
  for (const error of ERRORS) {
    console.log(`  ${error}`);
  }
  console.log(`\n❌ Found ${ERRORS.length} incorrect root paths`);
  process.exit(1);
} else {
  console.log('✅ All links correctly use /mimo-tools/ base path');
  process.exit(0);
}