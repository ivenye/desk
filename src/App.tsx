import { useState, Suspense } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { CodeEditor } from './components/code-editor/CodeEditor'
import { Terminal } from './components/terminal/Terminal'
import { AgentPanel } from './components/agent/AgentPanel'
import { SessionManager } from './components/session/SessionManager'
import { MemoryBrowser } from './components/memory/MemoryBrowser'
import { WorkflowEditor } from './components/workflow/WorkflowEditor'
import { PluginTest } from './components/plugin/PluginTest'
import { CommandPalette } from './components/command/CommandPalette'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useCommandSystem } from './hooks/useCommandSystem'

type View = 'editor' | 'terminal' | 'agents' | 'sessions' | 'memory' | 'workflow' | 'plugins'

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="text-muted-foreground">Loading...</div>
  </div>
)

function App() {
  const [currentView, setCurrentView] = useState<View>('editor')

  // 初始化命令系统
  useCommandSystem()

  const renderView = () => {
    switch (currentView) {
      case 'editor':
        return <CodeEditor />
      case 'terminal':
        return <Terminal />
      case 'agents':
        return <AgentPanel />
      case 'sessions':
        return <SessionManager />
      case 'memory':
        return <MemoryBrowser />
      case 'workflow':
        return <WorkflowEditor />
      case 'plugins':
        return <PluginTest />
      default:
        return <CodeEditor />
    }
  }

  return (
    <ErrorBoundary>
      <AppLayout currentView={currentView} onViewChange={setCurrentView}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </AppLayout>

      {/* 命令面板 */}
      <CommandPalette />
    </ErrorBoundary>
  )
}

export default App
