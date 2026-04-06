import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { CodeEditor } from './components/code-editor/CodeEditor'
import { Terminal } from './components/terminal/Terminal'
import { AgentPanel } from './components/agent/AgentPanel'
import { SessionManager } from './components/session/SessionManager'
import { MemoryBrowser } from './components/memory/MemoryBrowser'
import { WorkflowEditor } from './components/workflow/WorkflowEditor'

type View = 'editor' | 'terminal' | 'agents' | 'sessions' | 'memory' | 'workflow'

function App() {
  const [currentView, setCurrentView] = useState<View>('editor')

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
      default:
        return <CodeEditor />
    }
  }

  return (
    <AppLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </AppLayout>
  )
}

export default App
