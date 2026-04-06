import { useRef, useEffect } from 'react'
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
  const monacoRef = useRef<any>()
  const { activeFile, fileContents, updateFileContent } = useEditorStore()

  useEffect(() => {
    if (!editorRef.current) return

    let editor: any
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
        if (activeFile) {
          updateFileContent(activeFile, editor.getValue())
        }
      })
    })

    return () => {
      disposed = true
      editor?.dispose()
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && activeFile) {
      const content = fileContents[activeFile] || `// ${activeFile}\n\n`
      monacoRef.current.setValue(content)
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
