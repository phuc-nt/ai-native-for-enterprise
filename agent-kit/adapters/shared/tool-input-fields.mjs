// Pulls locations and text out of a tool call's arguments when the harness
// does not publish the argument schema of its built-in tools. Field names
// are recognised by what they are called rather than by a fixed schema, so a
// renamed or added tool still gets checked.

// Compared after lowercasing and removing underscores and dashes.
const LOCATION_KEYS = new Set([
  'path', 'paths', 'filepath', 'filepaths', 'file', 'files', 'filename', 'notebookpath',
  'directory', 'directorypath', 'dir', 'dirpath', 'targetfile', 'relativepath', 'absolutepath',
  'glob', 'include', 'includepattern',
]);
// For tools that find files by name, the query itself is a location.
const FILE_QUERY_KEYS = new Set(['pattern', 'query']);

const normalizeKey = (key) => key.toLowerCase().replace(/[_-]/g, '');

function walk(value, key, visit) {
  if (typeof value === 'string') visit(key, value);
  else if (Array.isArray(value)) value.forEach((item) => walk(item, key, visit));
  else if (value && typeof value === 'object') {
    for (const [childKey, child] of Object.entries(value)) walk(child, normalizeKey(childKey), visit);
  }
}

/** Arguments may arrive as an object or as a JSON-encoded string. */
export function parseToolArguments(raw) {
  if (typeof raw !== 'string') return raw && typeof raw === 'object' ? raw : {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : { text: raw };
  } catch {
    return { text: raw };
  }
}

/** Every string argument that names a file, directory, or file glob. */
export function locationsIn(toolInput, { fileQuery = false } = {}) {
  const locations = [];
  walk(toolInput, '', (key, value) => {
    if (LOCATION_KEYS.has(key) || (fileQuery && FILE_QUERY_KEYS.has(key))) locations.push(value);
  });
  return locations;
}

/** Every other string argument, joined: the text a write would put on disk. */
export function textIn(toolInput) {
  const parts = [];
  walk(toolInput, '', (key, value) => {
    if (!LOCATION_KEYS.has(key)) parts.push(value);
  });
  return parts.join('\n');
}

/** The command line of a shell tool call. */
export function commandIn(toolInput) {
  const command = toolInput.command ?? toolInput.cmd ?? toolInput.script;
  return typeof command === 'string' ? command : '';
}

/** Build the neutral action for a tool, given which kind of tool it is. */
export function toNeutralAction(kind, toolInput) {
  switch (kind) {
    case 'read': return { kind: 'read', paths: locationsIn(toolInput) };
    case 'search': return { kind: 'search', paths: locationsIn(toolInput) };
    case 'find-files': return { kind: 'search', paths: locationsIn(toolInput, { fileQuery: true }) };
    case 'write': return { kind: 'write', paths: locationsIn(toolInput), content: textIn(toolInput) };
    case 'shell': return { kind: 'shell', command: commandIn(toolInput) };
    default: throw new Error(`Unknown tool kind "${kind}"`);
  }
}
