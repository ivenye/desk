import type { CommandDefinition } from '@/commands/types';

/**
 * 文件操作命令
 */

export const fileCommands: CommandDefinition[] = [
  {
    id: 'file.new',
    name: 'New File',
    description: 'Create a new file',
    category: 'file',
    icon: 'FileText',
    shortcut: 'Ctrl+N',
    keywords: ['create', 'new', 'file'],
    execute: async () => {
      console.log('[Command] Creating new file...');
      // TODO: 实现新建文件逻辑
      return {
        success: true,
        message: 'New file created',
      };
    },
  },

  {
    id: 'file.open',
    name: 'Open File',
    description: 'Open an existing file',
    category: 'file',
    icon: 'FolderOpen',
    shortcut: 'Ctrl+O',
    keywords: ['open', 'file', 'browse'],
    execute: async () => {
      console.log('[Command] Opening file...');
      // TODO: 实现打开文件逻辑
      return {
        success: true,
        message: 'File opened',
      };
    },
  },

  {
    id: 'file.save',
    name: 'Save File',
    description: 'Save the current file',
    category: 'file',
    icon: 'Save',
    shortcut: 'Ctrl+S',
    keywords: ['save', 'file'],
    execute: async () => {
      console.log('[Command] Saving file...');
      // TODO: 实现保存文件逻辑
      return {
        success: true,
        message: 'File saved',
      };
    },
  },

  {
    id: 'file.saveAs',
    name: 'Save As',
    description: 'Save the current file with a new name',
    category: 'file',
    icon: 'Save',
    shortcut: 'Ctrl+Shift+S',
    keywords: ['save', 'file', 'as'],
    execute: async () => {
      console.log('[Command] Save as...');
      // TODO: 实现另存为逻辑
      return {
        success: true,
        message: 'File saved as',
      };
    },
  },

  {
    id: 'file.close',
    name: 'Close File',
    description: 'Close the current file',
    category: 'file',
    icon: 'X',
    shortcut: 'Ctrl+W',
    keywords: ['close', 'file'],
    execute: async () => {
      console.log('[Command] Closing file...');
      // TODO: 实现关闭文件逻辑
      return {
        success: true,
        message: 'File closed',
      };
    },
  },
];
