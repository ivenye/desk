import { lazy, Suspense } from 'react'

const TerminalComponent = lazy(() => import('./Terminal.impl').then(m => ({ default: m.Terminal })))

export function Terminal() {
  return (
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center bg-[#1e1e1e] rounded-lg">
        <div className="text-muted-foreground">Loading terminal...</div>
      </div>
    }>
      <TerminalComponent />
    </Suspense>
  )
}
