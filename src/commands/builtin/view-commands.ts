import type { CommandDefinition } from '@/commands/types';

/**
 * 视图切换命令
 */

export const viewCommands: CommandDefinition[] = [
  {
    id: 'view.editor',
    name: 'Show Editor',
    description: 'Switch to editor view',
    category: 'view',
    icon: 'Code2',
    shortcut: 'Ctrl+1',
    keywords: ['view', 'editor', 'code'],
    execute: async () => {
      console.log('[Command] Switching to editor view...');
      // TODO: 实现视图切换逻辑
      return {
        success: true,
        message: 'Switched to editor view',
        data: { view: 'editor' },
      };
    },
  },

  {
    id: 'view.terminal',
    name: 'Show Terminal',
    description: 'Switch to terminal view',
    category: 'view',
    icon: 'Terminal',
    shortcut: 'Ctrl+2',
    keywords: ['view', 'terminal', 'console'],
    execute: async () => {
      console.log('[Command] Switching to terminal view...');
      return {
        success: true,
        message: 'Switched to terminal view',
        data: { view: 'terminal' },
      };
    },
  },

  {
    id: 'view.agents',
    name: 'Show Agents',
    description: 'Switch to agents view',
    category: 'view',
    icon: 'Users',
    shortcut: 'Ctrl+3',
    keywords: ['view', 'agents', 'ai'],
    execute: async () => {
      console.log('[Command] Switching to agents view...');
      return {
        success: true,
        message: 'Switched to agents view',
        data: { view: 'agents' },
      };
    },
  },

  {
    id: 'view.plugins',
    name: 'Show Plugins',
    description: 'Switch to plugins view',
    category: 'view',
    icon: 'Puzzle',
    shortcut: 'Ctrl+4',
    keywords: ['view', 'plugins', 'extensions'],
    execute: async () => {
      console.log('[Command] Switching to plugins view...');
      return {
        success: true,
        message: 'Switched to plugins view',
        data: { view: 'plugins' },
      };
    },
  },

  {
    id: 'view.toggleSidebar',
    name: 'Toggle Sidebar',
    description: 'Show or hide the sidebar',
    category: 'view',
    icon: 'PanelLeft',
    shortcut: 'Ctrl+B',
    keywords: ['toggle', 'sidebar', 'panel'],
    execute: async () => {
      console.log('[Command] Toggling sidebar...');
      return {
        success: true,
        message: 'Sidebar toggled',
      };
    },
  },

  {
    id: 'view.toggleFullscreen',
    name: 'Toggle Fullscreen',
    description: 'Enter or exit fullscreen mode',
    category: 'view',
    icon: 'Maximize',
    shortcut: 'F11',
    keywords: ['fullscreen', 'maximize'],
    execute: async () => {
      console.log('[Command] Toggling fullscreen...');
      return {
        success: true,
        message: 'Fullscreen toggled',
      };
    },
  },
];
