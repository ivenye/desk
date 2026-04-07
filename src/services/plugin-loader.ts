import type {
  DeskPluginDefinition,
  LoadedPlugin,
  PluginStatus,
} from '@/plugin-sdk/types';
import { PluginApiImpl } from '@/plugin-sdk/plugin-api';
import { createPluginLogger } from '@/plugin-sdk/logger';
import { configManager } from './config-manager';
import { pluginRegistry } from './plugin-registry';
import { eventBus } from './event-bus';

/**
 * 插件加载器
 */
export class PluginLoader {
  private plugins = new Map<string, LoadedPlugin>();
  private pluginPaths = new Map<string, string>();

  /**
   * 加载插件
   */
  async loadPlugin(path: string): Promise<LoadedPlugin> {
    let pluginId = '';

    try {
      // 动态导入插件模块
      const module = await import(/* @vite-ignore */ path);
      const definition = module.default as DeskPluginDefinition;

      pluginId = definition.id;

      // 验证插件定义
      this.validateDefinition(definition);

      // 检查是否已加载
      if (this.plugins.has(pluginId)) {
        throw new Error(`Plugin ${pluginId} is already loaded`);
      }

      // 触发加载事件
      eventBus.emit('plugin:loading', pluginId);

      // 创建插件状态
      const plugin: LoadedPlugin = {
        definition,
        api: null as any, // 稍后设置
        config: null,
        status: 'loading',
      };

      this.plugins.set(pluginId, plugin);
      this.pluginPaths.set(pluginId, path);

      // 加载配置
      const config = await configManager.load(
        pluginId,
        definition.configSchema
      );
      plugin.config = config;

      // 创建插件 API
      const logger = createPluginLogger(pluginId);
      const api = new PluginApiImpl(
        pluginId,
        logger,
        eventBus,
        pluginRegistry.getProviderRegistry(),
        pluginRegistry.getToolRegistry(),
        pluginRegistry.getCommandRegistry(),
        pluginRegistry.getPanelRegistry(),
        pluginRegistry.getServiceRegistry()
      );
      plugin.api = api;

      // 注册插件
      await definition.register(api);

      // 更新状态
      plugin.status = 'loaded';
      eventBus.emit('plugin:loaded', pluginId);

      logger.info(`Plugin loaded successfully`);

      return plugin;
    } catch (error) {
      const err = error as Error;
      console.error(`Failed to load plugin from ${path}:`, err);

      if (pluginId) {
        const plugin = this.plugins.get(pluginId);
        if (plugin) {
          plugin.status = 'error';
          plugin.error = err;
        }
        eventBus.emit('plugin:error', pluginId, err);
      }

      throw err;
    }
  }

  /**
   * 卸载插件
   */
  async unloadPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);

    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    try {
      eventBus.emit('plugin:unloading', pluginId);

      plugin.status = 'unloading';

      // 调用卸载函数
      if (plugin.definition.unregister) {
        await plugin.definition.unregister(plugin.api);
      }

      // 清理配置
      await configManager.remove(pluginId);

      // 移除插件
      this.plugins.delete(pluginId);
      this.pluginPaths.delete(pluginId);

      eventBus.emit('plugin:unloaded', pluginId);

      plugin.api.logger.info('Plugin unloaded');
    } catch (error) {
      const err = error as Error;
      console.error(`Failed to unload plugin ${pluginId}:`, err);

      plugin.status = 'error';
      plugin.error = err;

      throw err;
    }
  }

  /**
   * 重新加载插件
   */
  async reloadPlugin(pluginId: string): Promise<LoadedPlugin> {
    const path = this.pluginPaths.get(pluginId);

    if (!path) {
      throw new Error(`Plugin path not found for ${pluginId}`);
    }

    // 卸载
    await this.unloadPlugin(pluginId);

    // 重新加载
    return await this.loadPlugin(path);
  }

  /**
   * 获取插件
   */
  getPlugin(pluginId: string): LoadedPlugin | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * 获取所有插件
   */
  getAllPlugins(): LoadedPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * 获取插件状态
   */
  getPluginStatus(pluginId: string): PluginStatus | undefined {
    return this.plugins.get(pluginId)?.status;
  }

  /**
   * 验证插件定义
   */
  private validateDefinition(definition: DeskPluginDefinition): void {
    if (!definition.id) {
      throw new Error('Plugin id is required');
    }

    if (!definition.name) {
      throw new Error('Plugin name is required');
    }

    if (!definition.version) {
      throw new Error('Plugin version is required');
    }

    if (!definition.kind) {
      throw new Error('Plugin kind is required');
    }

    if (!definition.configSchema) {
      throw new Error('Plugin configSchema is required');
    }

    if (!definition.register) {
      throw new Error('Plugin register function is required');
    }
  }
}

// 单例实例
export const pluginLoader = new PluginLoader();
