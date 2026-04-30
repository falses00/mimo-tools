// MIMO API Client
// Supports both API Mode and Static Demo Mode

export interface ApiResponse<T> {
  data: T;
  mode: 'api' | 'static-fallback';
  durationMs?: number;
  error?: string;
}

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

export function isApiMode(): boolean {
  return !!API_BASE_URL;
}

export function getApiBaseUrl(): string {
  return API_BASE_URL || '';
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    return { data: null as T, mode: 'static-fallback', error: 'No API backend configured' };
  }

  const startTime = Date.now();
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      mode: 'api',
      durationMs: Date.now() - startTime,
    };
  } catch (error) {
    return {
      data: null as T,
      mode: 'static-fallback',
      durationMs: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// LaunchGuard API
export interface LaunchGuardResult {
  score: number;
  totalLinks: number;
  correctLinks: number;
  errorLinks: number;
  warnings: number;
  issues: Array<{ type: string; category: string; message: string }>;
  recommendations: string[];
  markdownReport: string;
}

export async function auditLaunch(html: string): Promise<ApiResponse<LaunchGuardResult>> {
  return fetchApi<LaunchGuardResult>('/api/launchguard/audit', {
    method: 'POST',
    body: JSON.stringify({ html }),
  });
}

// RepoLens API
export interface RepoLensResult {
  score: number;
  checks: Array<{ name: string; passed: boolean; details: string }>;
  recommendations: string[];
  info: Record<string, string>;
  markdownReport: string;
}

export async function analyzeRepo(manifest: Record<string, unknown>): Promise<ApiResponse<RepoLensResult>> {
  return fetchApi<RepoLensResult>('/api/repolens/analyze', {
    method: 'POST',
    body: JSON.stringify({ manifest }),
  });
}

// DataForge API
export interface DataForgeProfileResult {
  rowCount: number;
  columnCount: number;
  fields: Array<{ name: string; type: string; missing: number; unique: number }>;
  duplicateRows: number;
  suggestedCharts: string[];
}

export async function profileDataset(dataset: Record<string, unknown>[]): Promise<ApiResponse<DataForgeProfileResult>> {
  return fetchApi<DataForgeProfileResult>('/api/dataforge/profile', {
    method: 'POST',
    body: JSON.stringify({ dataset }),
  });
}

export interface DataForgeQueryResult {
  rows: Record<string, unknown>[];
  columns: string[];
  rowCount: number;
  executionTime: number;
}

export async function queryDataset(dataset: Record<string, unknown>[], query: string): Promise<ApiResponse<DataForgeQueryResult>> {
  return fetchApi<DataForgeQueryResult>('/api/dataforge/query', {
    method: 'POST',
    body: JSON.stringify({ dataset, query }),
  });
}

// SpecPilot API
export interface SpecPilotParseResult {
  title: string;
  version: string;
  endpoints: Array<{ method: string; path: string; summary: string }>;
  endpointCount: number;
}

export async function parseOpenApi(openapi: Record<string, unknown>): Promise<ApiResponse<SpecPilotParseResult>> {
  return fetchApi<SpecPilotParseResult>('/api/specpilot/parse', {
    method: 'POST',
    body: JSON.stringify({ openapi }),
  });
}

export interface SpecPilotValidateResult {
  valid: boolean;
  errors: string[];
  mockResponse: unknown;
}

export async function validateSchema(schema: Record<string, unknown>, response: unknown): Promise<ApiResponse<SpecPilotValidateResult>> {
  return fetchApi<SpecPilotValidateResult>('/api/specpilot/validate', {
    method: 'POST',
    body: JSON.stringify({ schema, response }),
  });
}

// IncidentLab API
export interface IncidentLabResult {
  totalEntries: number;
  severityCounts: { ERROR: number; WARN: number; INFO: number; DEBUG: number };
  entries: Array<{ timestamp: string; level: string; message: string }>;
  anomalies: string[];
}

export async function analyzeLogs(logs: string): Promise<ApiResponse<IncidentLabResult>> {
  return fetchApi<IncidentLabResult>('/api/incidentlab/analyze', {
    method: 'POST',
    body: JSON.stringify({ logs }),
  });
}

// KnowledgeBase API
export interface KnowledgeBaseIndexResult {
  documentCount: number;
  chunkCount: number;
  indexSummary: string;
}

export async function indexDocuments(documents: Array<{ id: string; title: string; content: string }>): Promise<ApiResponse<KnowledgeBaseIndexResult>> {
  return fetchApi<KnowledgeBaseIndexResult>('/api/knowledgebase/index', {
    method: 'POST',
    body: JSON.stringify({ documents }),
  });
}

export interface KnowledgeBaseAskResult {
  answer: string;
  sources: Array<{ docId: string; docTitle: string; chunkId: string; snippet: string }>;
  confidence: number;
  mode: string;
}

export async function askQuestion(question: string, documents: Array<{ id: string; title: string; content: string }>): Promise<ApiResponse<KnowledgeBaseAskResult>> {
  return fetchApi<KnowledgeBaseAskResult>('/api/knowledgebase/ask', {
    method: 'POST',
    body: JSON.stringify({ question, documents }),
  });
}

// Health check
export interface HealthResult {
  status: string;
  timestamp: string;
  version: string;
  services: Record<string, string>;
}

export async function checkHealth(): Promise<ApiResponse<HealthResult>> {
  return fetchApi<HealthResult>('/api/health');
}