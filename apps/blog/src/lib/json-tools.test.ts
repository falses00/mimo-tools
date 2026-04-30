import { describe, it, expect } from 'vitest';
import { validateJson, formatJson, minifyJson, jsonDiff, EXAMPLE_JSON } from './json-tools';

describe('validateJson', () => {
  it('validates correct JSON', () => {
    const result = validateJson('{"name":"test"}');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('rejects empty input', () => {
    const result = validateJson('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('输入不能为空');
  });

  it('rejects whitespace-only input', () => {
    const result = validateJson('   ');
    expect(result.valid).toBe(false);
  });

  it('rejects invalid JSON with position info', () => {
    const result = validateJson('{"name": test}');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('handles nested objects', () => {
    const result = validateJson('{"a":{"b":{"c":1}}}');
    expect(result.valid).toBe(true);
  });

  it('handles arrays', () => {
    const result = validateJson('[1,2,3]');
    expect(result.valid).toBe(true);
  });
});

describe('formatJson', () => {
  it('formats JSON with default indent', () => {
    const result = formatJson('{"name":"test","age":1}');
    expect(result).toContain('  "name": "test"');
    expect(result).toContain('  "age": 1');
  });

  it('formats JSON with custom indent', () => {
    const result = formatJson('{"a":1}', 4);
    expect(result).toContain('    "a": 1');
  });

  it('throws on invalid JSON', () => {
    expect(() => formatJson('{invalid}')).toThrow();
  });
});

describe('minifyJson', () => {
  it('removes whitespace', () => {
    const result = minifyJson('{\n  "a": 1\n}');
    expect(result).toBe('{"a":1}');
  });

  it('throws on invalid JSON', () => {
    expect(() => minifyJson('{invalid}')).toThrow();
  });
});

describe('jsonDiff', () => {
  it('shows no diff for identical objects', () => {
    expect(jsonDiff('{"a":1}', '{"a":1}')).toBe('无差异');
  });

  it('detects added keys', () => {
    const diff = jsonDiff('{"a":1}', '{"a":1,"b":2}');
    expect(diff).toContain('+ b');
  });

  it('detects removed keys', () => {
    const diff = jsonDiff('{"a":1,"b":2}', '{"a":1}');
    expect(diff).toContain('- b');
  });

  it('detects changed values', () => {
    const diff = jsonDiff('{"a":1}', '{"a":2}');
    expect(diff).toContain('~ a');
  });

  it('handles nested diffs', () => {
    const diff = jsonDiff('{"a":{"b":1}}', '{"a":{"b":2}}');
    expect(diff).toContain('~ a.b');
  });
});

describe('EXAMPLE_JSON', () => {
  it('is valid JSON', () => {
    expect(() => JSON.parse(EXAMPLE_JSON)).not.toThrow();
  });
});
