import { useSessions } from '@/hooks/useOpenClaw'
import { Loader2 } from 'lucide-react'

export function SessionManager() {
  const { data: sessions, isLoading, error } = useSessions()

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-destructive">Failed to load sessions</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Sessions</h2>
      <div className="space-y-2">
        {sessions?.map((session) => (
          <div
            key={session.key}
            className="p-4 border border-border rounded-lg bg-card hover:bg-accent cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{session.label || session.key}</h3>
                <p className="text-sm text-muted-foreground">{session.key}</p>
              </div>
              <span className={`text-xs ${session.active ? 'text-green-500' : 'text-gray-500'}`}>
                {session.active ? '● Active' : '○ Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
