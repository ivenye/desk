import { invoke } from '@tauri-apps/api/core'

export interface Session {
  key: string
  agent_id: string
  label?: string
  active: boolean
}

export interface AgentSpawn {
  session_key: string
  agent_id: string
  task: string
}

export interface ExecResult {
  stdout: string
  stderr: string
  exit_code: number
}

export interface MemoryResult {
  path: string
  content: string
  score: number
}

export class OpenClawAPI {
  static async listSessions(): Promise<Session[]> {
    return await invoke('list_sessions')
  }

  static async spawnAgent(task: string): Promise<AgentSpawn> {
    return await invoke('spawn_agent', { task })
  }

  static async execCommand(command: string): Promise<ExecResult> {
    return await invoke('exec_command', { command })
  }

  static async searchMemory(query: string): Promise<MemoryResult[]> {
    return await invoke('search_memory', { query })
  }
}
