import { lazy, Suspense } from 'react'

const WorkflowEditorComponent = lazy(() => import('./WorkflowEditor.impl').then(m => ({ default: m.WorkflowEditor })))

export function WorkflowEditor() {
  return (
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center bg-card">
        <div className="text-muted-foreground">Loading workflow editor...</div>
      </div>
    }>
      <WorkflowEditorComponent />
    </Suspense>
  )
}
