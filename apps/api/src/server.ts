import Fastify from 'fastify';
import cors from '@fastify/cors';
import { launchguardRoutes } from './routes/launchguard.js';
import { repolensRoutes } from './routes/repolens.js';
import { dataforgeRoutes } from './routes/dataforge.js';
import { specpilotRoutes } from './routes/specpilot.js';
import { incidentlabRoutes } from './routes/incidentlab.js';
import { knowledgebaseRoutes } from './routes/knowledgebase.js';
import { healthRoutes } from './routes/health.js';

const fastify = Fastify({ logger: true });

// CORS
await fastify.register(cors, {
  origin: [
    'http://localhost:4321',
    'http://localhost:3000',
    'https://falses00.github.io',
  ],
  methods: ['GET', 'POST'],
});

// Routes
await fastify.register(healthRoutes);
await fastify.register(launchguardRoutes, { prefix: '/api/launchguard' });
await fastify.register(repolensRoutes, { prefix: '/api/repolens' });
await fastify.register(dataforgeRoutes, { prefix: '/api/dataforge' });
await fastify.register(specpilotRoutes, { prefix: '/api/specpilot' });
await fastify.register(incidentlabRoutes, { prefix: '/api/incidentlab' });
await fastify.register(knowledgebaseRoutes, { prefix: '/api/knowledgebase' });

// Start
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '8787');
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 MIMO API running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();