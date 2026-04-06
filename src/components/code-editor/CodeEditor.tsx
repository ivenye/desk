import { lazy, Suspense } from 'react'

const CodeEditorComponent = lazy(() => import('./CodeEditor.impl').then(m => ({ default: m.CodeEditor })))

export function CodeEditor() {
  return (
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center bg-card">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    }>
      <CodeEditorComponent />
    </Suspense>
  )
}
