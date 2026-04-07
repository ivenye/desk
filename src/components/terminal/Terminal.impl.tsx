import { useRef, useEffect } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useExecCommand } from '@/hooks/useDesk'
import { useTerminalStore } from '@/stores/terminalStore'
import { useTerminalInput } from '@/hooks/useTerminalInput'
import 'xterm/css/xterm.css'

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm>()
  const fitAddonRef = useRef<FitAddon>()
  const execCommand = useExecCommand()
  const { addToHistory } = useTerminalStore()

  const handleCommand = async (command: string) => {
    const term = xtermRef.current
    if (!term) return

    try {
      const result = await execCommand.mutateAsync(command)
      if (result.stdout) {
        term.write(result.stdout)
      }
      if (result.stderr) {
        term.write(`\x1b[1;31m${result.stderr}\x1b[0m`)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      term.write(`\x1b[1;31mError: ${errorMsg}\x1b[0m\r\n`)
    }
  }

  const { handleData } = useTerminalInput({
    onCommand: handleCommand,
    onAddToHistory: addToHistory,
  })

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
      },
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    term.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = term
    fitAddonRef.current = fitAddon

    // Welcome message
    term.writeln('\x1b[1;32mWelcome to Desk Terminal\x1b[0m')
    term.writeln('Type "help" for available commands\n')
    term.write('$ ')

    // Handle input
    term.onData(handleData(term))

    // Handle resize
    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [handleData])

  return (
    <div className="h-full w-full bg-[#1e1e1e] rounded-lg p-2">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  )
}
