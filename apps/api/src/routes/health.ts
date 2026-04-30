import { FastifyInstance } from 'fastify';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/api/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        launchguard: 'available',
        repolens: 'available',
        dataforge: 'available',
        specpilot: 'available',
        incidentlab: 'available',
        knowledgebase: 'available',
      },
    };
  });
}