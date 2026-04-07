import { invoke } from '@tauri-apps/api/core';
import type { z } from 'zod';

/**
 * 配置管理器
 */
export class ConfigManager {
  private configs = new Map<string, unknown>();

  /**
   * 加载插件配置
   */
  async load<T>(pluginId: string, schema: z.ZodSchema<T>): Promise<T> {
    try {
      // 从 Tauri 后端加载配置
      const rawConfig = await invoke<unknown>('load_plugin_config', {
        pluginId
      });

      // 验证配置
      const validated = schema.parse(rawConfig);

      // 缓存配置
      this.configs.set(pluginId, validated);

      return validated;
    } catch (error) {
      console.error(`Failed to load config for plugin ${pluginId}:`, error);

      // 如果加载失败，尝试使用默认配置
      const defaultConfig = this.getDefaultConfig(schema);
      this.configs.set(pluginId, defaultConfig);

      return defaultConfig;
    }
  }

  /**
   * 获取插件配置
   */
  get<T>(pluginId: string): T | undefined {
    return this.configs.get(pluginId) as T | undefined;
  }

  /**
   * 保存插件配置
   */
  async save(pluginId: string, config: unknown): Promise<void> {
    try {
      // 更新缓存
      this.configs.set(pluginId, config);

      // 保存到 Tauri 后端
      await invoke('save_plugin_config', {
        pluginId,
        config: JSON.stringify(config)
      });
    } catch (error) {
      console.error(`Failed to save config for plugin ${pluginId}:`, error);
      throw error;
    }
  }

  /**
   * 更新插件配置
   */
  async update<T>(
    pluginId: string,
    updates: Partial<T>,
    schema: z.ZodSchema<T>
  ): Promise<T> {
    const currentConfig = this.get<T>(pluginId) || {} as T;
    const newConfig = { ...currentConfig, ...updates };

    // 验证新配置
    const validated = schema.parse(newConfig);

    // 保存
    await this.save(pluginId, validated);

    return validated;
  }

  /**
   * 删除插件配置
   */
  async remove(pluginId: string): Promise<void> {
    this.configs.delete(pluginId);

    try {
      await invoke('remove_plugin_config', { pluginId });
    } catch (error) {
      console.error(`Failed to remove config for plugin ${pluginId}:`, error);
    }
  }

  /**
   * 获取默认配置
   */
  private getDefaultConfig<T>(schema: z.ZodSchema<T>): T {
    try {
      // 尝试使用 schema 的默认值
      return schema.parse({});
    } catch {
      return {} as T;
    }
  }
}

// 单例实例
export const configManager = new ConfigManager();
