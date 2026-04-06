import { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import { useEditorStore } from '@/stores/editorStore'
import { TabBar } from './TabBar'
import { FileTree } from './FileTree'

export function CodeEditor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const { activeFile, fileContents, updateFileContent } = useEditorStore()

  useEffect(() => {
    if (!editorRef.current) return

    const editor = monaco.editor.create(editorRef.current, {
      value: activeFile ? (fileContents[activeFile] || '// Welcome to OpenClaw Studio\n\n') : '',
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

    // 监听内容变化
    editor.onDidChangeModelContent(() => {
      if (activeFile) {
        updateFileContent(activeFile, editor.getValue())
      }
    })

    return () => {
      editor.dispose()
    }
  }, [])

  // 当切换文件时更新编辑器内容
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
