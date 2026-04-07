import type { CommandDefinition } from '@/commands/types';
import { pluginLoader } from '@/services/plugin-loader';

/**
 * 插件管理命令
 */

export const pluginCommands: CommandDefinition[] = [
  {
    id: 'plugin.load',
    name: 'Load Plugin',
    description: 'Load a plugin from file',
    category: 'plugin',
    icon: 'Download',
    keywords: ['plugin', 'load', 'install'],
    execute: async (args) => {
      console.log('[Command] Loading plugin...');

      try {
        const path = args as string;
        if (!path) {
          return {
            success: false,
            error: 'Plugin path is required',
          };
        }

        await pluginLoader.loadPlugin(path);

        return {
          success: true,
          message: 'Plugin loaded successfully',
          data: { path },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to load plugin',
        };
      }
    },
  },

  {
    id: 'plugin.unload',
    name: 'Unload Plugin',
    description: 'Unload a loaded plugin',
    category: 'plugin',
    icon: 'Trash',
    keywords: ['plugin', 'unload', 'remove'],
    execute: async (args) => {
      console.log('[Command] Unloading plugin...');

      try {
        const pluginId = args as string;
        if (!pluginId) {
          return {
            success: false,
            error: 'Plugin ID is required',
          };
        }

        await pluginLoader.unloadPlugin(pluginId);

        return {
          success: true,
          message: 'Plugin unloaded successfully',
          data: { pluginId },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to unload plugin',
        };
      }
    },
  },

  {
    id: 'plugin.reload',
    name: 'Reload Plugin',
    description: 'Reload a plugin',
    category: 'plugin',
    icon: 'RefreshCw',
    keywords: ['plugin', 'reload', 'refresh'],
    execute: async (args) => {
      console.log('[Command] Reloading plugin...');

      try {
        const pluginId = args as string;
        if (!pluginId) {
          return {
            success: false,
            error: 'Plugin ID is required',
          };
        }

        await pluginLoader.reloadPlugin(pluginId);

        return {
          success: true,
          message: 'Plugin reloaded successfully',
          data: { pluginId },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to reload plugin',
        };
      }
    },
  },

  {
    id: 'plugin.list',
    name: 'List Plugins',
    description: 'Show all loaded plugins',
    category: 'plugin',
    icon: 'List',
    keywords: ['plugin', 'list', 'show'],
    execute: async () => {
      console.log('[Command] Listing plugins...');

      const plugins = pluginLoader.getAllPlugins();

      return {
        success: true,
        message: `Found ${plugins.length} plugin(s)`,
        data: { plugins },
      };
    },
  },
];
