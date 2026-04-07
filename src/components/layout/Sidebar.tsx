import { Code2, Terminal as TerminalIcon, Users, Layers, Brain, Workflow, Puzzle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

const navItems = [
  { id: 'editor', icon: Code2, label: 'Editor' },
  { id: 'terminal', icon: TerminalIcon, label: 'Terminal' },
  { id: 'agents', icon: Users, label: 'Agents' },
  { id: 'sessions', icon: Layers, label: 'Sessions' },
  { id: 'memory', icon: Brain, label: 'Memory' },
  { id: 'workflow', icon: Workflow, label: 'Workflow' },
  { id: 'plugins', icon: Puzzle, label: 'Plugins' },
]

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
      <div className="text-2xl font-bold text-primary mb-4">🦞</div>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center transition-colors',
              currentView === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            title={item.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        )
      })}
    </aside>
  )
}
