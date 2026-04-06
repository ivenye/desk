import { invoke } from '@tauri-apps/api/core'
import type { Session, AgentSpawn, ExecResult, MemoryResult } from '@/types/shared'

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

export type { Session, AgentSpawn, ExecResult, MemoryResult } from '@/types/shared'
