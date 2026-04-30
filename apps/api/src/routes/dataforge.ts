import { FastifyInstance } from 'fastify';

interface ProfileRequest {
  dataset?: Record<string, unknown>[];
  format?: string;
}

interface ProfileResult {
  rowCount: number;
  columnCount: number;
  fields: Array<{
    name: string;
    type: string;
    missing: number;
    unique: number;
  }>;
  duplicateRows: number;
  suggestedCharts: string[];
}

function profileDataset(dataset: Record<string, unknown>[]): ProfileResult {
  if (!dataset || dataset.length === 0) {
    return {
      rowCount: 0,
      columnCount: 0,
      fields: [],
      duplicateRows: 0,
      suggestedCharts: [],
    };
  }

  const columns = Object.keys(dataset[0]);
  const fields = columns.map(col => {
    const values = dataset.map(row => row[col]);
    const nonNull = values.filter(v => v !== null && v !== undefined && v !== '');
    const unique = new Set(nonNull).size;

    // Infer type
    let type = 'string';
    if (nonNull.every(v => typeof v === 'number')) type = 'number';
    else if (nonNull.every(v => typeof v === 'boolean')) type = 'boolean';
    else if (nonNull.every(v => !isNaN(Date.parse(String(v))))) type = 'date';

    return {
      name: col,
      type,
      missing: dataset.length - nonNull.length,
      unique,
    };
  });

  // Count duplicates
  const stringified = dataset.map(row => JSON.stringify(row));
  const duplicateRows = stringified.length - new Set(stringified).size;

  // Suggest charts
  const suggestedCharts: string[] = [];
  const numericFields = fields.filter(f => f.type === 'number');
  const categoricalFields = fields.filter(f => f.type === 'string' && f.unique < 20);

  if (numericFields.length > 0 && categoricalFields.length > 0) {
    suggestedCharts.push('柱状图: 分类 vs 数值');
  }
  if (numericFields.length >= 2) {
    suggestedCharts.push('散点图: 数值 vs 数值');
  }
  if (categoricalFields.length > 0) {
    suggestedCharts.push('饼图: 分类分布');
  }

  return {
    rowCount: dataset.length,
    columnCount: columns.length,
    fields,
    duplicateRows,
    suggestedCharts,
  };
}

interface QueryRequest {
  dataset?: Record<string, unknown>[];
  query?: string;
}

interface QueryResult {
  rows: Record<string, unknown>[];
  columns: string[];
  rowCount: number;
  executionTime: number;
}

function executeQuery(dataset: Record<string, unknown>[], query: string): QueryResult {
  const startTime = Date.now();

  // Simple SQL parser for demo
  const limitMatch = query.match(/LIMIT\s+(\d+)/i);
  const limit = limitMatch ? parseInt(limitMatch[1]) : 100;

  const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*['"]?([^'"]+)['"]?/i);

  let filtered = [...dataset];

  if (whereMatch) {
    const [, field, value] = whereMatch;
    filtered = filtered.filter(row => String(row[field]) === value);
  }

  const rows = filtered.slice(0, limit);
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return {
    rows,
    columns,
    rowCount: rows.length,
    executionTime: Date.now() - startTime,
  };
}

export async function dataforgeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ProfileRequest }>('/profile', async (request) => {
    const { dataset } = request.body;
    return profileDataset(dataset || []);
  });

  fastify.post<{ Body: QueryRequest }>('/query', async (request) => {
    const { dataset, query } = request.body;
    if (!dataset || !query) {
      return { error: '请提供 dataset 和 query' };
    }
    return executeQuery(dataset, query);
  });
}