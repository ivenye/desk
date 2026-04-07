import { useEffect } from 'react';
import { commandRegistry } from '@/commands/registry';
import { shortcutManager } from '@/commands/shortcuts';
import { builtinCommands } from '@/commands/builtin';
import { useCommandStore } from '@/stores/commandStore';

/**
 * 命令系统初始化
 * 注册所有内置命令和快捷键
 */
export function useCommandSystem() {
  const { openPalette } = useCommandStore();

  useEffect(() => {
    console.log('[CommandSystem] Initializing...');

    // 注册所有内置命令
    builtinCommands.forEach(command => {
      commandRegistry.register(command, 'builtin');
    });

    // 初始化快捷键管理器
    shortcutManager.initialize();

    // 注册命令面板快捷键
    shortcutManager.register({
      shortcut: 'Ctrl+Shift+P',
      commandId: 'palette.open',
      enabled: true,
    });

    // 注册打开命令面板的命令
    commandRegistry.register({
      id: 'palette.open',
      name: 'Open Command Palette',
      description: 'Show the command palette',
      category: 'view',
      icon: 'Command',
      shortcut: 'Ctrl+Shift+P',
      keywords: ['command', 'palette', 'search'],
      execute: async () => {
        openPalette();
        return {
          success: true,
          message: 'Command palette opened',
        };
      },
    }, 'builtin');

    console.log(`[CommandSystem] Registered ${commandRegistry.size} commands`);

    // 清理
    return () => {
      shortcutManager.destroy();
      commandRegistry.clear();
      console.log('[CommandSystem] Cleaned up');
    };
  }, [openPalette]);
}
