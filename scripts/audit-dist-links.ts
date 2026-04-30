import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const DIST_DIR = resolve('apps/blog/dist');
const BASE = '/mimo-tools';
const ERRORS: string[] = [];
const WARNINGS: string[] = [];

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
    
    // Skip external URLs, anchors, and mailto/tel
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    
    // Skip asset URLs (css, js, images)
    if (href.startsWith('/mimo-tools/_astro/') || href.endsWith('.css') || href.endsWith('.js')) {
      continue;
    }
    
    // Check if internal link starts with base
    if (href.startsWith('/') && !href.startsWith(BASE)) {
      // This is an internal link without base path
      if (href === '/favicon.svg' || href === '/og-image.png') {
        // These are special assets, just warn
        WARNINGS.push(`[${relativePath}] Asset link without base: ${href}`);
      } else {
        ERRORS.push(`[${relativePath}] Internal link missing base path: ${href}`);
      }
    }
  }
}

console.log('🔍 Auditing dist links...\n');

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files\n`);

for (const file of htmlFiles) {
  checkFile(file);
}

if (WARNINGS.length > 0) {
  console.log('⚠️  Warnings:');
  for (const warning of WARNINGS) {
    console.log(`  ${warning}`);
  }
  console.log('');
}

if (ERRORS.length > 0) {
  console.log('❌ Errors:');
  for (const error of ERRORS) {
    console.log(`  ${error}`);
  }
  console.log(`\n❌ Found ${ERRORS.length} links missing base path`);
  process.exit(1);
} else {
  console.log('✅ All internal links correctly use base path');
  process.exit(0);
}