#!/usr/bin/env node
// API Deployment Verification Script
// Usage: node scripts/verify-api-deployment.ts <api-url>

const API_URL = process.argv[2] || 'http://localhost:8787';

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  durationMs: number;
  pass: boolean;
  summary: string;
}

const results: TestResult[] = [];

async function testEndpoint(
  path: string,
  method: string = 'GET',
  body?: Record<string, unknown>
): Promise<TestResult> {
  const start = Date.now();
  const url = `${API_URL}${path}`;

  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    const data = await response.json();
    const durationMs = Date.now() - start;

    const pass = response.ok && data.status !== 'error';
    const summary = pass
      ? `OK - ${JSON.stringify(data).substring(0, 80)}...`
      : `FAIL - ${data.error || response.statusText}`;

    return { endpoint: path, method, status: response.status, durationMs, pass, summary };
  } catch (error) {
    return {
      endpoint: path,
      method,
      status: 0,
      durationMs: Date.now() - start,
      pass: false,
      summary: `ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function runTests() {
  console.log(`\n🔍 Verifying API at: ${API_URL}\n`);

  // Test Health
  results.push(await testEndpoint('/api/health'));

  // Test LaunchGuard
  results.push(
    await testEndpoint('/api/launchguard/audit', 'POST', {
      html: '<h1>Test</h1><a href="/projects">bad</a><a href="/mimo-tools/tools">good</a>',
    })
  );

  // Test RepoLens
  results.push(
    await testEndpoint('/api/repolens/analyze', 'POST', {
      manifest: { name: 'mimo-tools', readme: true, license: true, ci: true, tests: true },
    })
  );

  // Test DataForge Profile
  results.push(
    await testEndpoint('/api/dataforge/profile', 'POST', {
      dataset: [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
      ],
    })
  );

  // Test SpecPilot Parse
  results.push(
    await testEndpoint('/api/specpilot/parse', 'POST', {
      openapi: { openapi: '3.0.0', paths: { '/health': { get: { summary: 'Health' } } } },
    })
  );

  // Test IncidentLab Analyze
  results.push(
    await testEndpoint('/api/incidentlab/analyze', 'POST', {
      logs: '2026-01-01T00:00:00Z ERROR api failed\n2026-01-01T00:01:00Z INFO api recovered',
    })
  );

  // Test KnowledgeBase Ask
  results.push(
    await testEndpoint('/api/knowledgebase/ask', 'POST', {
      question: 'What is LaunchGuard?',
      documents: [
        { title: 'LaunchGuard', content: 'LaunchGuard audits GitHub Pages routes and release readiness.' },
      ],
    })
  );

  // Print results
  console.log('┌─────────────────────────────────────┬────────┬──────────┬────────┬───────────────────────────────────┐');
  console.log('│ Endpoint                            │ Method │ Status   │ Time   │ Result                            │');
  console.log('├─────────────────────────────────────┼────────┼──────────┼────────┼───────────────────────────────────┤');

  let allPassed = true;
  for (const r of results) {
    const passIcon = r.pass ? '✅' : '❌';
    const endpoint = r.endpoint.padEnd(35);
    const method = r.method.padEnd(6);
    const status = String(r.status).padEnd(8);
    const time = `${r.durationMs}ms`.padEnd(6);
    const summary = r.summary.substring(0, 33).padEnd(33);

    console.log(`│ ${endpoint} │ ${method} │ ${status} │ ${time} │ ${passIcon} ${summary} │`);

    if (!r.pass) allPassed = false;
  }

  console.log('└─────────────────────────────────────┴────────┴──────────┴────────┴───────────────────────────────────┘');

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;

  console.log(`\n📊 Results: ${passed}/${total} passed`);

  if (allPassed) {
    console.log('✅ All API endpoints verified successfully!\n');
    process.exit(0);
  } else {
    console.log('❌ Some endpoints failed. Check the results above.\n');
    process.exit(1);
  }
}

runTests().catch(console.error);
