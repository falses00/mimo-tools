import { FastifyInstance } from 'fastify';

interface ParseRequest {
  openapi?: Record<string, unknown>;
}

interface ValidateRequest {
  schema?: Record<string, unknown>;
  response?: unknown;
}

export async function specpilotRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ParseRequest }>('/parse', async (request) => {
    const { openapi } = request.body;
    if (!openapi) return { error: '请提供 OpenAPI spec' };

    const paths = (openapi.paths as Record<string, Record<string, unknown>>) || {};
    const endpoints: Array<{ method: string; path: string; summary: string }> = [];

    for (const [path, methods] of Object.entries(paths)) {
      for (const [method, details] of Object.entries(methods)) {
        endpoints.push({
          method: method.toUpperCase(),
          path,
          summary: (details as Record<string, string>).summary || '',
        });
      }
    }

    return {
      title: openapi.info && (openapi.info as Record<string, string>).title,
      version: openapi.info && (openapi.info as Record<string, string>).version,
      endpoints,
      endpointCount: endpoints.length,
    };
  });

  fastify.post<{ Body: ValidateRequest }>('/validate', async (request) => {
    const { schema, response } = request.body;
    if (!schema || response === undefined) return { error: '请提供 schema 和 response' };

    // Simple validation
    const required = (schema.required as string[]) || [];
    const properties = (schema.properties as Record<string, unknown>) || {};
    const responseObj = response as Record<string, unknown>;
    const errors: string[] = [];

    for (const field of required) {
      if (!(field in responseObj)) {
        errors.push(`缺少必需字段: ${field}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      mockResponse: response,
    };
  });
}
