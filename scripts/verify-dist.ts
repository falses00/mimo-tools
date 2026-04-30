#!/usr/bin/env node
// Verify dist contains correct API configuration
// Usage: node scripts/verify-dist.ts

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'apps/blog/dist';
const EXPECTED_API_URL = 'https://mimo-tools-api.onrender.com';
const FORBIDDEN_PATTERNS = ['localhost:8787', '127.0.0.1', 'localhost:3000'];

let errors: string[] = [];
let warnings: string[] = [];

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

console.log('🔍 Verifying dist configuration...\n');

// Check project pages
const projectPages = [
  'launchguard', 'repolens', 'dataforge', 
  'specpilot', 'incidentlab', 'knowledgebase-studio'
];

let apiModeCount = 0;
let staticModeCount = 0;

for (const project of projectPages) {
  const filePath = join(DIST_DIR, `projects/${project}.html`);
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Check for API URL
    if (content.includes(EXPECTED_API_URL)) {
      apiModeCount++;
      console.log(`✅ ${project}: API Mode (${EXPECTED_API_URL})`);
    } else if (content.includes('Static Demo Mode')) {
      staticModeCount++;
      warnings.push(`${project}: Static Demo Mode only`);
    } else {
      errors.push(`${project}: Unknown mode`);
    }
    
    // Check for forbidden patterns
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (content.includes(pattern)) {
        errors.push(`${project}: Contains forbidden pattern: ${pattern}`);
      }
    }
  } catch (e) {
    errors.push(`${project}: File not found`);
  }
}

console.log(`\n📊 Results:`);
console.log(`  API Mode: ${apiModeCount}/${projectPages.length}`);
console.log(`  Static Mode: ${staticModeCount}/${projectPages.length}`);

if (warnings.length > 0) {
  console.log('\n⚠️ Warnings:');
  warnings.forEach(w => console.log(`  ${w}`));
}

if (errors.length > 0) {
  console.log('\n❌ Errors:');
  errors.forEach(e => console.log(`  ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ All project pages verified successfully');
  process.exit(0);
}
