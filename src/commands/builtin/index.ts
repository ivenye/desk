import { fileCommands } from './file-commands';
import { editorCommands } from './editor-commands';
import { viewCommands } from './view-commands';
import { pluginCommands } from './plugin-commands';
import type { CommandDefinition } from '@/commands/types';

/**
 * 所有内置命令
 */
export const builtinCommands: CommandDefinition[] = [
  ...fileCommands,
  ...editorCommands,
  ...viewCommands,
  ...pluginCommands,
];

export * from './file-commands';
export * from './editor-commands';
export * from './view-commands';
export * from './plugin-commands';
