import { X } from 'lucide-react'
import { useEditorStore } from '@/stores/editorStore'
import { cn } from '@/lib/utils'

export function TabBar() {
  const { openFiles, activeFile, closeFile, setActiveFile } = useEditorStore()

  if (openFiles.length === 0) {
    return null
  }

  return (
    <div className="flex items-center border-b border-border bg-card">
      {openFiles.map((file) => (
        <div
          key={file}
          className={cn(
            'flex items-center space-x-2 px-4 py-2 border-r border-border cursor-pointer',
            activeFile === file 
              ? 'bg-background text-foreground' 
              : 'bg-card text-muted-foreground hover:bg-accent'
          )}
          onClick={() => setActiveFile(file)}
        >
          <span className="text-sm">{file.split('/').pop()}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeFile(file)
            }}
            className="hover:bg-destructive/20 rounded p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
