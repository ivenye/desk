import { useRef, useEffect } from 'react'
import type * as Monaco from 'monaco-editor'
import { useEditorStore } from '@/stores/editorStore'
import { TabBar } from './TabBar'
import { FileTree } from './FileTree'

let monacoPromise: Promise<typeof import('monaco-editor')> | null = null

function loadMonaco() {
  if (!monacoPromise) {
    monacoPromise = import('monaco-editor')
  }
  return monacoPromise
}

export function CodeEditor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<Monaco.editor.IStandaloneCodeEditor>()
  const { activeFile, fileContents, updateFileContent } = useEditorStore()
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!editorRef.current) return

    let editor: Monaco.editor.IStandaloneCodeEditor | undefined
    let disposed = false

    loadMonaco().then((monaco) => {
      if (disposed || !editorRef.current) return

      editor = monaco.editor.create(editorRef.current, {
        value: activeFile ? (fileContents[activeFile] || '// Welcome to Desk\n\n') : '',
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: true },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
      })

      monacoRef.current = editor

      editor.onDidChangeModelContent(() => {
        if (activeFile && editor) {
          // Debounce updates to avoid excessive re-renders
          if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current)
          }
          updateTimeoutRef.current = setTimeout(() => {
            const currentEditor = editor;
            if (currentEditor) {
              updateFileContent(activeFile, currentEditor.getValue())
            }
          }, 300)
        }
      })
    })

    return () => {
      disposed = true
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
      editor?.dispose()
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && activeFile) {
      const content = fileContents[activeFile] || `// ${activeFile}\n\n`
      const currentValue = monacoRef.current.getValue()
      // Only update if content actually changed
      if (currentValue !== content) {
        monacoRef.current.setValue(content)
      }
    }
  }, [activeFile, fileContents])

  return (
    <div className="h-full w-full flex">
      <FileTree />
      <div className="flex-1 flex flex-col">
        <TabBar />
        <div ref={editorRef} className="flex-1 rounded-lg overflow-hidden" />
      </div>
    </div>
  )
}
