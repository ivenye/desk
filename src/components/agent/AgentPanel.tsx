import { useState } from 'react'
import { Plus, Loader2, AlertCircle } from 'lucide-react'
import { useSpawnAgent } from '@/hooks/useDesk'

export function AgentPanel() {
  const [isCreating, setIsCreating] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState<string | null>(null)
  const spawnAgent = useSpawnAgent()

  const handleCreateAgent = async () => {
    if (!newTask.trim()) return

    setError(null)
    try {
      await spawnAgent.mutateAsync(newTask)
      setNewTask('')
      setIsCreating(false)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to spawn agent'
      setError(errorMsg)
    }
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Agents</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          <span>New Agent</span>
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Create New Agent</h3>
          {error && (
            <div className="mb-2 p-2 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <textarea
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Describe the agent's task..."
            className="w-full p-2 bg-background border border-border rounded-lg mb-2 min-h-[100px]"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateAgent}
              disabled={spawnAgent.isPending}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {spawnAgent.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Create'
              )}
            </button>
            <button
              onClick={() => {
                setIsCreating(false)
                setError(null)
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Code Assistant</h3>
            <span className="text-xs text-green-500">● Active</span>
          </div>
          <p className="text-sm text-muted-foreground">Helping with code review and refactoring</p>
        </div>
      </div>
    </div>
  )
}
