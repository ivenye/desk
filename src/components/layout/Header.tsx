import { Settings, Bell } from 'lucide-react'

export function Header() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">Desk</h1>
        <span className="text-xs text-muted-foreground">v0.1.0</span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
