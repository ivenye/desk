import { useRef, useCallback } from 'react'
import type { Terminal } from 'xterm'

interface UseTerminalInputProps {
  onCommand: (command: string) => Promise<void>
  onAddToHistory: (line: string) => void
}

export function useTerminalInput({ onCommand, onAddToHistory }: UseTerminalInputProps) {
  const currentLineRef = useRef('')

  const handleData = useCallback(
    (term: Terminal) => async (data: string) => {
      const code = data.charCodeAt(0)

      // Enter key
      if (code === 13) {
        term.write('\r\n')
        const command = currentLineRef.current.trim()

        if (command) {
          onAddToHistory(`$ ${command}`)
          await onCommand(command)
        }

        currentLineRef.current = ''
        term.write('$ ')
      }
      // Backspace
      else if (code === 127) {
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1)
          term.write('\b \b')
        }
      }
      // Ctrl+C
      else if (code === 3) {
        term.write('^C\r\n$ ')
        currentLineRef.current = ''
      }
      // Ctrl+L (clear)
      else if (code === 12) {
        term.clear()
        term.write('$ ')
      }
      // Regular character
      else if (code >= 32 && code < 127) {
        currentLineRef.current += data
        term.write(data)
      }
    },
    [onCommand, onAddToHistory]
  )

  const reset = useCallback(() => {
    currentLineRef.current = ''
  }, [])

  return { handleData, reset }
}
