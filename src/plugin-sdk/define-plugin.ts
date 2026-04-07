import type { DeskPluginDefinition } from './types';
import { z } from 'zod';

/**
 * 定义插件的辅助函数
 */
export function definePlugin(
  options: Omit<DeskPluginDefinition, 'version'> & { version?: string }
): DeskPluginDefinition {
  return {
    version: '1.0.0',
    ...options,
  };
}

/**
 * 空配置模式（用于不需要配置的插件）
 */
export const emptyConfigSchema = z.object({});
