import { FastifyInstance } from 'fastify';
interface IndexRequest {
  documents?: Array<{ id: string; title: string; content: string }>;
}
interface AskRequest {
  question?: string;
  documents?: Array<{ id: string; title: string; content: string }>;
}
export async function knowledgebaseRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: IndexRequest }>('/index', async (request) => {
    const { documents } = request.body;
    if (!documents) return { error: '请提供文档' };
    const chunks = documents.flatMap(doc => {
      const sentences = doc.content.split(/[.!?。！？]+/).filter(s => s.trim());
      return sentences.map((sentence, i) => ({
        docId: doc.id,
        docTitle: doc.title,
        chunkId: `${doc.id}-${i}`,
        content: sentence.trim(),
      }));
    });
    return {
      documentCount: documents.length,
      chunkCount: chunks.length,
      indexSummary: `已索引 ${documents.length} 个文档，${chunks.length} 个片段`,
    };
  });
  fastify.post<{ Body: AskRequest }>('/ask', async (request) => {
    const { question, documents } = request.body;
    if (!question || !documents) return { error: '请提供问题和文档' };
    // Extract keywords, remove punctuation, convert to lowercase
    const keywords = question.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(k => k.length > 1); // Filter out single characters

    const chunks = documents.flatMap(doc => {
      // Split by sentences, newlines, or just use the whole content if no split points
      const sentences = doc.content.split(/[.!?。！？\n]+/).filter(s => s.trim());
      const chunks = sentences.length > 0 ? sentences : [doc.content];
      return chunks.map((sentence, i) => ({
        docId: doc.id || 'unknown',
        docTitle: doc.title,
        chunkId: `${doc.id || 'unknown'}-${i}`,
        content: sentence.trim(),
      }));
    });
    const scored = chunks.map(chunk => {
      const lowerContent = chunk.content.toLowerCase();
      const score = keywords.filter(k => lowerContent.includes(k)).length;
      return { ...chunk, score };
    }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);
    const sources = scored.slice(0, 5);
    const answer = sources.length > 0
      ? `根据检索结果，找到 ${sources.length} 个相关片段:\n${sources.map(s => `- ${s.content}`).join('\n')}`
      : '未找到相关内容';
    return {
      answer,
      sources: sources.map(s => ({
        docId: s.docId,
        docTitle: s.docTitle,
        chunkId: s.chunkId,
        snippet: s.content.substring(0, 200),
      })),
      confidence: sources.length > 0 ? sources[0].score / keywords.length : 0,
      mode: 'retrieval-only',
    };
  });
}
