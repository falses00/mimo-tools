-- MIMO Tools - Supabase Schema
-- Run this migration to set up the database

-- Enable pgvector extension (optional, for RAG embeddings)
-- CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Project Reports
CREATE TABLE IF NOT EXISTS project_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT NOT NULL,
  report JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Saved Datasets
CREATE TABLE IF NOT EXISTS saved_datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  schema JSONB,
  rows JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Incident Reports
CREATE TABLE IF NOT EXISTS incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  report JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Knowledge Documents
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Knowledge Chunks
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  -- embedding VECTOR(1536),  -- Uncomment when pgvector is enabled
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. API Audit Logs
CREATE TABLE IF NOT EXISTS api_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL,
  duration_ms INT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_reports_project ON project_reports(project);
CREATE INDEX IF NOT EXISTS idx_project_reports_created_at ON project_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_document_id ON knowledge_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_api_audit_logs_endpoint ON api_audit_logs(endpoint);
CREATE INDEX IF NOT EXISTS idx_api_audit_logs_created_at ON api_audit_logs(created_at DESC);

-- Create full-text search index for knowledge chunks
-- This is the fallback when pgvector is not available
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_content_fts 
ON knowledge_chunks 
USING gin(to_tsvector('english', content));

-- Row Level Security (RLS)
ALTER TABLE project_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for anon key in demo, restrict in production)
CREATE POLICY "Allow all for demo" ON project_reports FOR ALL USING (true);
CREATE POLICY "Allow all for demo" ON saved_datasets FOR ALL USING (true);
CREATE POLICY "Allow all for demo" ON incident_reports FOR ALL USING (true);
CREATE POLICY "Allow all for demo" ON knowledge_documents FOR ALL USING (true);
CREATE POLICY "Allow all for demo" ON knowledge_chunks FOR ALL USING (true);
CREATE POLICY "Allow all for demo" ON api_audit_logs FOR ALL USING (true);