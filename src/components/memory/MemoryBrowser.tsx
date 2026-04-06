import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useMemorySearch } from '@/hooks/useOpenClaw'

export function MemoryBrowser() {
  const [query, setQuery] = useState('')
  const memorySearch = useMemorySearch()

  const handleSearch = async () => {
    if (!query.trim()) return
    await memorySearch.mutateAsync(query)
  }

  return (
    <div className="h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Memory</h2>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search memory..."
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {memorySearch.isPending && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {memorySearch.data && (
        <div className="space-y-2">
          {memorySearch.data.map((result, index) => (
            <div key={index} className="p-4 border border-border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{result.path}</h3>
                <span className="text-xs text-muted-foreground">
                  Score: {(result.score * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{result.content}</p>
            </div>
          ))}
        </div>
      )}

      {!memorySearch.data && !memorySearch.isPending && (
        <div className="space-y-2">
          <div className="p-4 border border-border rounded-lg bg-card">
            <h3 className="font-semibold mb-2">MEMORY.md</h3>
            <p className="text-sm text-muted-foreground">Long-term memory and preferences</p>
          </div>
        </div>
      )}
    </div>
  )
}
