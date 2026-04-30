// MIMO API - Supabase Edge Function
// This is a lightweight version of the API for Supabase Edge Functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const path = url.pathname

  try {
    // Health check
    if (path === '/health' || path === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          mode: 'supabase-edge-function',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // LaunchGuard audit
    if (path === '/api/launchguard/audit' && req.method === 'POST') {
      const { html } = await req.json()
      const startTime = Date.now()

      // Simple link audit
      const hrefRegex = /href="([^"]*)"/g
      let match
      const allHrefs: string[] = []
      while ((match = hrefRegex.exec(html)) !== null) {
        allHrefs.push(match[1])
      }

      const incorrectPatterns = [/^\/projects$/, /^\/projects\//, /^\/tools$/, /^\/tools\//, /^\/blog$/, /^\/blog\//, /^\/about$/]
      let errorLinks = 0
      for (const href of allHrefs) {
        for (const pattern of incorrectPatterns) {
          if (pattern.test(href)) {
            errorLinks++
            break
          }
        }
      }

      const score = allHrefs.length > 0 ? Math.round(((allHrefs.length - errorLinks) / allHrefs.length) * 100) : 100

      return new Response(
        JSON.stringify({
          score,
          totalLinks: allHrefs.length,
          errorLinks,
          durationMs: Date.now() - startTime,
          mode: 'supabase-edge-function',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // KnowledgeBase ask
    if (path === '/api/knowledgebase/ask' && req.method === 'POST') {
      const { question, documents } = await req.json()
      const startTime = Date.now()

      // Simple keyword search
      const keywords = question.toLowerCase().split(/\s+/)
      const chunks = documents.flatMap((doc: any) => {
        const sentences = doc.content.split(/[.!?。！？]+/).filter((s: string) => s.trim())
        return sentences.map((sentence: string, i: number) => ({
          docId: doc.id || 'unknown',
          docTitle: doc.title,
          chunkId: `${doc.id || 'unknown'}-${i}`,
          content: sentence.trim(),
        }))
      })

      const scored = chunks
        .map((chunk: any) => {
          const lowerContent = chunk.content.toLowerCase()
          const score = keywords.filter((k: string) => lowerContent.includes(k)).length
          return { ...chunk, score }
        })
        .filter((c: any) => c.score > 0)
        .sort((a: any, b: any) => b.score - a.score)

      const sources = scored.slice(0, 5)
      const answer =
        sources.length > 0
          ? `Based on retrieved documents, found ${sources.length} relevant chunks:\n${sources.map((s: any) => `- ${s.content}`).join('\n')}`
          : 'No relevant content found.'

      return new Response(
        JSON.stringify({
          answer,
          sources: sources.map((s: any) => ({
            docTitle: s.docTitle,
            chunkId: s.chunkId,
            snippet: s.content.substring(0, 200),
          })),
          confidence: sources.length > 0 ? sources[0].score / keywords.length : 0,
          mode: 'retrieval-only',
          durationMs: Date.now() - startTime,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 404 for unknown routes
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})