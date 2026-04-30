// Base path for GitHub Pages project site
const BASE = '/mimo-tools';

/**
 * Generate a base-aware URL path
 * @param path - The path to prepend the base to
 * @returns The full path with base
 */
export function withBase(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base doesn't end with slash unless path is empty
  const cleanBase = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  // Return base + path
  return `${cleanBase}/${cleanPath}`;
}

/**
 * Get the base path
 */
export function getBase(): string {
  return BASE;
}

/**
 * Check if a path is external (starts with http/https)
 */
export function isExternal(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://');
}

/**
 * Generate a safe href that handles both internal and external paths
 */
export function href(path: string): string {
  if (isExternal(path)) {
    return path;
  }
  return withBase(path);
}