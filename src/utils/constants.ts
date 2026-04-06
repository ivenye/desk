export const OPENCLAW_API_BASE = import.meta.env.VITE_OPENCLAW_API_BASE || 'http://localhost:3000'

export const QUERY_KEYS = {
  SESSIONS: 'sessions',
  AGENTS: 'agents',
  MEMORY: 'memory',
  FILES: 'files',
} as const

export const TERMINAL_COMMANDS = {
  HELP: 'help',
  CLEAR: 'clear',
  EXIT: 'exit',
  LS: 'ls',
  CD: 'cd',
  PWD: 'pwd',
} as const

export const FILE_EXTENSIONS = {
  TYPESCRIPT: ['.ts', '.tsx'],
  JAVASCRIPT: ['.js', '.jsx'],
  JSON: ['.json'],
  MARKDOWN: ['.md'],
  RUST: ['.rs'],
  PYTHON: ['.py'],
} as const
