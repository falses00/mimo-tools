export interface PlatformLink {
  label: string;
  description: string;
  href: string;
  kind: 'internal' | 'external' | 'pending';
  status: 'live' | 'ready' | 'pending';
}

export interface WorkbenchLane {
  title: string;
  description: string;
  href: string;
  metric: string;
  status: string;
}

export const platformLinks: PlatformLink[] = [
  {
    label: 'GitHub Pages Frontend',
    description: 'Static demo mode is live and can present the full tool and blog catalog.',
    href: 'https://falses00.github.io/mimo-tools/',
    kind: 'external',
    status: 'live',
  },
  {
    label: 'GitHub Repository',
    description: 'Source, Actions, deployment workflow, issues, and future public roadmap.',
    href: 'https://github.com/falses00/mimo-tools',
    kind: 'external',
    status: 'live',
  },
  {
    label: 'Render API Service',
    description: 'Fastify API is configured; connect the repo in Render and verify the URL.',
    href: 'https://render.com',
    kind: 'external',
    status: 'pending',
  },
  {
    label: 'Supabase RAG Layer',
    description: 'Migration is ready; pgvector can be enabled later for semantic retrieval.',
    href: 'https://github.com/falses00/mimo-tools/tree/main/supabase',
    kind: 'external',
    status: 'ready',
  },
];

export const workbenchLanes: WorkbenchLane[] = [
  {
    title: 'Showcase',
    description: 'A public executive view for flagship projects, quick utilities, and proof of engineering depth.',
    href: '/projects',
    metric: '6 flagship systems',
    status: 'Live',
  },
  {
    title: 'Operate',
    description: 'Browser-first utilities for formatting, encoding, time, IDs, regex, markdown, and design checks.',
    href: '/tools',
    metric: '10+ utilities',
    status: 'Live',
  },
  {
    title: 'Explain',
    description: 'Blog posts that turn the toolchain into a readable portfolio and long-form technical narrative.',
    href: '/blog',
    metric: '3 launch notes',
    status: 'Live',
  },
  {
    title: 'Extend',
    description: 'Optional API, Supabase, RAG, and future large projects plug into the same front door by link.',
    href: '/about',
    metric: '7 verified endpoints',
    status: 'Ready',
  },
];

export const deploymentChecklist = [
  'Render Web Service: npm ci && npm run build:api, then npm run start:api',
  'Environment: NODE_ENV, CORS_ORIGIN, MIMO_DATA_DIR, MIMO_API_KEY',
  'Verification: npm run verify:api https://<render-url>',
  'Frontend API mode: set PUBLIC_API_BASE_URL in GitHub repository secrets',
  'Supabase: create project, run migration, enable pgvector only when semantic search is needed',
];
