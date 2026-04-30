import { test, expect } from '@playwright/test';

test('MIMO Site - DOM Structure Review', async ({ page }) => {
  test.setTimeout(120000);
  
  console.log('\n========== DETAILED DOM STRUCTURE ==========\n');
  
  // Homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Get full page HTML structure
  const homepageStructure = await page.evaluate(() => {
    const getElementInfo = (el: Element, depth = 0): string => {
      const indent = '  '.repeat(depth);
      const tag = el.tagName.toLowerCase();
      const classes = el.className ? ` class="${el.className.toString().substring(0, 80)}"` : '';
      const id = el.id ? ` id="${el.id}"` : '';
      const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 
        ? ` "${el.textContent?.trim().substring(0, 50)}"` : '';
      
      let result = `${indent}<${tag}${id}${classes}>${text}\n`;
      
      for (const child of el.children) {
        if (depth < 4) { // Limit depth
          result += getElementInfo(child, depth + 1);
        }
      }
      
      return result;
    };
    
    return getElementInfo(document.body);
  });
  
  console.log('--- Homepage Body Structure ---');
  console.log(homepageStructure.substring(0, 2000));
  
  // Check specific elements
  console.log('\n--- Homepage Key Elements ---');
  
  const heroSection = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const section = h1?.closest('section');
    return {
      h1Text: h1?.textContent?.trim(),
      sectionClasses: section?.className,
      hasGradient: section?.innerHTML.includes('gradient') || false
    };
  });
  console.log('Hero Section:', heroSection);
  
  const navInfo = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    return {
      exists: !!nav,
      classes: nav?.className,
      links: Array.from(nav?.querySelectorAll('a') || []).map(a => ({
        text: a.textContent?.trim(),
        href: a.getAttribute('href')
      }))
    };
  });
  console.log('Navigation:', navInfo);
  
  const featuredTools = await page.evaluate(() => {
    const cards = document.querySelectorAll('[href^="/tools/"]');
    return Array.from(cards).map(card => ({
      href: card.getAttribute('href'),
      title: card.querySelector('h3')?.textContent?.trim(),
      description: card.querySelector('p')?.textContent?.trim(),
      tags: Array.from(card.querySelectorAll('span')).map(s => s.textContent?.trim()).filter(Boolean)
    }));
  });
  console.log('\nFeatured Tools:', JSON.stringify(featuredTools, null, 2));
  
  // Tools page
  console.log('\n\n========== TOOLS PAGE STRUCTURE ==========\n');
  await page.goto('/tools');
  await page.waitForLoadState('networkidle');
  
  const toolsPageInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const toolCards = document.querySelectorAll('a[href^="/tools/"]');
    const categoryBtns = document.querySelectorAll('button');
    const searchInput = document.querySelector('#search-input');
    
    return {
      h1Text: h1?.textContent?.trim(),
      toolCount: toolCards.length,
      categoryCount: categoryBtns.length,
      hasSearch: !!searchInput,
      tools: Array.from(toolCards).map(card => ({
        name: card.querySelector('h3')?.textContent?.trim(),
        description: card.querySelector('p')?.textContent?.trim(),
        icon: card.querySelector('span')?.textContent?.trim(),
        status: card.querySelector('.text-xs')?.textContent?.trim()
      }))
    };
  });
  console.log('Tools Page Info:', JSON.stringify(toolsPageInfo, null, 2));
  
  // JSON Formatter page
  console.log('\n\n========== JSON FORMATTER PAGE ==========\n');
  await page.goto('/tools/json-formatter');
  await page.waitForLoadState('networkidle');
  
  const jsonFormatterInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const textarea = document.querySelector('#input-json');
    const buttons = document.querySelectorAll('button');
    const output = document.querySelector('#output-json');
    
    return {
      h1Text: h1?.textContent?.trim(),
      hasInput: !!textarea,
      inputPlaceholder: textarea?.getAttribute('placeholder'),
      buttonCount: buttons.length,
      buttonLabels: Array.from(buttons).map(b => b.textContent?.trim()).slice(0, 8),
      hasOutput: !!output
    };
  });
  console.log('JSON Formatter:', JSON.stringify(jsonFormatterInfo, null, 2));
  
  // Blog page
  console.log('\n\n========== BLOG PAGE STRUCTURE ==========\n');
  await page.goto('/blog');
  await page.waitForLoadState('networkidle');
  
  const blogInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const posts = document.querySelectorAll('a[href^="/blog/"]');
    
    return {
      h1Text: h1?.textContent?.trim(),
      postCount: posts.length,
      posts: Array.from(posts).map(post => ({
        title: post.querySelector('h2')?.textContent?.trim(),
        description: post.querySelector('p')?.textContent?.trim(),
        date: post.querySelector('time')?.textContent?.trim(),
        tags: Array.from(post.querySelectorAll('span')).map(s => s.textContent?.trim()).filter(Boolean)
      }))
    };
  });
  console.log('Blog Info:', JSON.stringify(blogInfo, null, 2));
  
  // Check CSS Custom Properties
  console.log('\n\n========== CSS CUSTOM PROPERTIES ==========\n');
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const vars: Record<string, string> = {};
    const varNames = [
      '--background', '--foreground', '--primary', '--secondary',
      '--muted', '--accent', '--destructive', '--border', '--ring'
    ];
    
    for (const name of varNames) {
      vars[name] = computedStyle.getPropertyValue(name).trim();
    }
    
    return vars;
  });
  console.log('CSS Variables:', JSON.stringify(cssVars, null, 2));
  
  // Check responsive breakpoints
  console.log('\n\n========== RESPONSIVE BREAKPOINTS ==========\n');
  
  const viewports = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForTimeout(300);
    
    const layoutInfo = await page.evaluate(() => {
      const container = document.querySelector('.container, .max-w-7xl, .max-w-screen-2xl');
      const nav = document.querySelector('nav');
      const grid = document.querySelector('.grid');
      
      return {
        containerWidth: container?.getBoundingClientRect().width || 0,
        navVisible: nav ? getComputedStyle(nav).display !== 'none' : false,
        gridColumns: grid ? getComputedStyle(grid).gridTemplateColumns : 'N/A'
      };
    });
    
    console.log(`${viewport.name} (${viewport.width}px):`, layoutInfo);
  }
  
  console.log('\n\n========== REVIEW COMPLETE ==========');
});