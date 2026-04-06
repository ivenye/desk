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

export interface WorkflowNode {
  id: string
  type: 'agent' | 'condition' | 'action' | 'merge'
  data: {
    label: string
    config?: Record<string, any>
  }
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  label?: string
}
