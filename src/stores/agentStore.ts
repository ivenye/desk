import { create } from 'zustand'

interface AgentState {
  agents: Agent[]
  selectedAgent: string | null
  addAgent: (agent: Agent) => void
  removeAgent: (id: string) => void
  selectAgent: (id: string) => void
}

interface Agent {
  id: string
  name: string
  task: string
  status: 'active' | 'idle' | 'error'
  createdAt: Date
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  selectedAgent: null,
  
  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, agent],
  })),
  
  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter(a => a.id !== id),
    selectedAgent: state.selectedAgent === id ? null : state.selectedAgent,
  })),
  
  selectAgent: (id) => set({ selectedAgent: id }),
}))
