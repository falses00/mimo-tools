import { FastifyInstance } from 'fastify';
interface AnalyzeRequest {
  logs?: string;
}
export async function incidentlabRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: AnalyzeRequest }>('/analyze', async (request) => {
    const { logs } = request.body;
    if (!logs) return { error: '请提供日志内容' };
    const lines = logs.split('\n').filter(l => l.trim());
    const entries = lines.map(line => {
      const timestampMatch = line.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
      const levelMatch = line.match(/\b(ERROR|WARN|INFO|DEBUG)\b/i);
      return {
        timestamp: timestampMatch ? timestampMatch[0] : 'unknown',
        level: levelMatch ? levelMatch[1].toUpperCase() : 'INFO',
        message: line,
      };
    });
    const severityCounts = {
      ERROR: entries.filter(e => e.level === 'ERROR').length,
      WARN: entries.filter(e => e.level === 'WARN').length,
      INFO: entries.filter(e => e.level === 'INFO').length,
      DEBUG: entries.filter(e => e.level === 'DEBUG').length,
    };
    return {
      totalEntries: entries.length,
      severityCounts,
      entries: entries.slice(0, 100),
      anomalies: severityCounts.ERROR > 5 ? ['检测到异常多的 ERROR 日志'] : [],
    };
  });
}
