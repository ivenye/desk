import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export type View = 'editor' | 'terminal' | 'agents' | 'sessions' | 'memory' | 'workflow' | 'plugins'

interface AppLayoutProps {
  children: ReactNode
  currentView: View
  onViewChange: (view: View) => void
}

export function AppLayout({ children, currentView, onViewChange }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
