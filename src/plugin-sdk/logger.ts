import type { PluginLogger } from './types';

/**
 * 创建插件日志记录器
 */
export function createPluginLogger(pluginId: string): PluginLogger {
  const prefix = `[Plugin:${pluginId}]`;

  return {
    debug(message: string, ...args: unknown[]): void {
      console.debug(prefix, message, ...args);
    },

    info(message: string, ...args: unknown[]): void {
      console.info(prefix, message, ...args);
    },

    warn(message: string, ...args: unknown[]): void {
      console.warn(prefix, message, ...args);
    },

    error(message: string, ...args: unknown[]): void {
      console.error(prefix, message, ...args);
    },
  };
}
