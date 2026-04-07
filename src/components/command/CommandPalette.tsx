import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useCommandStore } from '@/stores/commandStore';
import { commandRegistry } from '@/commands/registry';
import { commandExecutor } from '@/commands/executor';
import { commandHistory } from '@/commands/history';
import type { RegisteredCommand } from '@/commands/types';

export function CommandPalette() {
  const { isPaletteOpen, paletteQuery, closePalette, setPaletteQuery, addRecentCommand } = useCommandStore();
  const [filteredCommands, setFilteredCommands] = useState<RegisteredCommand[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 搜索命令
  useEffect(() => {
    if (!isPaletteOpen) return;

    if (paletteQuery.trim() === '') {
      setFilteredCommands(commandRegistry.getAll().slice(0, 10));
    } else {
      const results = commandRegistry.search(paletteQuery);
      setFilteredCommands(results.slice(0, 10));
    }
    setSelectedIndex(0);
  }, [paletteQuery, isPaletteOpen]);

  // 执行命令
  const executeCommand = useCallback(async (command: RegisteredCommand) => {
    const startTime = Date.now();

    try {
      const result = await commandExecutor.execute(command.id);
      const duration = Date.now() - startTime;

      // 添加到历史
      commandHistory.add(command.id, undefined, result, duration);
      addRecentCommand({
        commandId: command.id,
        executedAt: new Date(),
        args: undefined,
        result,
        duration,
      });

      // 关闭面板
      closePalette();

      // 显示结果
      if (result.message) {
        console.log(`[CommandPalette] ${result.message}`);
      }
    } catch (error) {
      console.error('[CommandPalette] Failed to execute command:', error);
    }
  }, [closePalette, addRecentCommand]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closePalette();
        break;
    }
  }, [filteredCommands, selectedIndex, executeCommand, closePalette]);

  // 点击背景关闭
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePalette();
    }
  }, [closePalette]);

  if (!isPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
        {/* 搜索框 */}
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search commands..."
            value={paletteQuery}
            onChange={(e) => setPaletteQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            onClick={closePalette}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 命令列表 */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => executeCommand(command)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {/* 图标 */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded">
                  <span className="text-sm">{command.icon || '⚡'}</span>
                </div>

                {/* 命令信息 */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{command.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {command.description}
                  </div>
                </div>

                {/* 快捷键 */}
                {command.shortcut && (
                  <div className="flex-shrink-0 px-2 py-1 text-xs bg-background border border-border rounded">
                    {command.shortcut}
                  </div>
                )}

                {/* 分类标签 */}
                <div className="flex-shrink-0 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                  {command.category}
                </div>
              </button>
            ))
          )}
        </div>

        {/* 底部提示 */}
        <div className="flex items-center justify-between p-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>⏎ Execute</span>
            <span>Esc Close</span>
          </div>
          <div>
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
