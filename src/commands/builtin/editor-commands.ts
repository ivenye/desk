import type { CommandDefinition } from '@/commands/types';

/**
 * 编辑器命令
 */

export const editorCommands: CommandDefinition[] = [
  {
    id: 'editor.format',
    name: 'Format Document',
    description: 'Format the current document',
    category: 'edit',
    icon: 'Code',
    shortcut: 'Ctrl+Shift+F',
    keywords: ['format', 'beautify', 'code'],
    execute: async () => {
      console.log('[Command] Formatting document...');
      return {
        success: true,
        message: 'Document formatted',
      };
    },
  },

  {
    id: 'editor.undo',
    name: 'Undo',
    description: 'Undo the last action',
    category: 'edit',
    icon: 'Undo',
    shortcut: 'Ctrl+Z',
    keywords: ['undo', 'revert'],
    execute: async () => {
      console.log('[Command] Undo...');
      return {
        success: true,
        message: 'Undone',
      };
    },
  },

  {
    id: 'editor.redo',
    name: 'Redo',
    description: 'Redo the last undone action',
    category: 'edit',
    icon: 'Redo',
    shortcut: 'Ctrl+Y',
    keywords: ['redo', 'repeat'],
    execute: async () => {
      console.log('[Command] Redo...');
      return {
        success: true,
        message: 'Redone',
      };
    },
  },

  {
    id: 'editor.find',
    name: 'Find',
    description: 'Find text in the current document',
    category: 'edit',
    icon: 'Search',
    shortcut: 'Ctrl+F',
    keywords: ['find', 'search'],
    execute: async () => {
      console.log('[Command] Opening find...');
      return {
        success: true,
        message: 'Find opened',
      };
    },
  },

  {
    id: 'editor.replace',
    name: 'Replace',
    description: 'Find and replace text',
    category: 'edit',
    icon: 'Replace',
    shortcut: 'Ctrl+H',
    keywords: ['replace', 'find', 'substitute'],
    execute: async () => {
      console.log('[Command] Opening replace...');
      return {
        success: true,
        message: 'Replace opened',
      };
    },
  },
];
