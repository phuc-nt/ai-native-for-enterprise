// Path matching for the sensitive-path and ignored-path policies.
// Works on path strings only; nothing here touches the filesystem.

const REGEX_SPECIAL = /[.+^${}()|[\]\\]/g;

/** Normalise a path string so that patterns can be compared against it. */
export function normalizePath(rawPath) {
  let path = String(rawPath).trim();
  if (process.platform === 'win32') path = path.replace(/\\/g, '/');
  path = path.replace(/\/{2,}/g, '/');
  while (path.startsWith('./')) path = path.slice(2);
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

/**
 * Compile a policy glob into a regular expression.
 * `*` stays within one segment, `**` crosses segments, `?` is one character.
 * The pattern may match at any depth, and `dir/**` also matches `dir` itself.
 */
export function compileGlob(pattern) {
  const coversDirectory = pattern.endsWith('/**');
  const source = coversDirectory ? pattern.slice(0, -3) : pattern;
  let body = '';
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === '*' && source[i + 1] === '*') {
      const followedBySlash = source[i + 2] === '/';
      body += followedBySlash ? '(?:.*/)?' : '.*';
      i += followedBySlash ? 2 : 1;
    } else if (char === '*') {
      body += '[^/]*';
    } else if (char === '?') {
      body += '[^/]';
    } else {
      body += char.replace(REGEX_SPECIAL, '\\$&');
    }
  }
  if (coversDirectory) body += '(?:/.*)?';
  return new RegExp(`(?:^|/)${body}$`, 'i');
}

/**
 * Return the sensitive pattern a path matches, or null.
 * An exception pattern always wins over a sensitive pattern.
 */
export function matchSensitivePath(rawPath, sensitivePaths) {
  const path = normalizePath(rawPath);
  if (sensitivePaths.exclude.some((entry) => entry.regex.test(path))) return null;
  const hit = sensitivePaths.include.find((entry) => entry.regex.test(path));
  return hit ? hit.pattern : null;
}

/** Return the first path segment that names an ignored directory, or null. */
export function findIgnoredSegment(rawPath, ignoredDirectories) {
  const segments = normalizePath(rawPath).split('/');
  return segments.find((segment) => ignoredDirectories.has(segment.toLowerCase())) ?? null;
}
