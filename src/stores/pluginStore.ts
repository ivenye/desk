import { create } from 'zustand';
import type { LoadedPlugin } from '@/plugin-sdk/types';
import { pluginLoader } from '@/services/plugin-loader';
import { eventBus } from '@/services/event-bus';

interface PluginState {
  // 状态
  plugins: Map<string, LoadedPlugin>;
  loading: Set<string>;
  errors: Map<string, Error>;

  // 操作
  loadPlugin: (path: string) => Promise<void>;
  unloadPlugin: (id: string) => Promise<void>;
  reloadPlugin: (id: string) => Promise<void>;
  getPlugin: (id: string) => LoadedPlugin | undefined;
  getAllPlugins: () => LoadedPlugin[];

  // 内部方法
  _setPlugin: (id: string, plugin: LoadedPlugin) => void;
  _removePlugin: (id: string) => void;
  _setLoading: (id: string, loading: boolean) => void;
  _setError: (id: string, error: Error | null) => void;
}

export const usePluginStore = create<PluginState>((set, get) => {
  // 监听插件事件
  eventBus.on('plugin:loading', (pluginId) => {
    get()._setLoading(pluginId, true);
  });

  eventBus.on('plugin:loaded', (pluginId) => {
    const plugin = pluginLoader.getPlugin(pluginId);
    if (plugin) {
      get()._setPlugin(pluginId, plugin);
    }
    get()._setLoading(pluginId, false);
  });

  eventBus.on('plugin:error', (pluginId, error) => {
    get()._setError(pluginId, error);
    get()._setLoading(pluginId, false);
  });

  eventBus.on('plugin:unloaded', (pluginId) => {
    get()._removePlugin(pluginId);
  });

  return {
    // 初始状态
    plugins: new Map(),
    loading: new Set(),
    errors: new Map(),

    // 加载插件
    loadPlugin: async (path: string) => {
      try {
        await pluginLoader.loadPlugin(path);
      } catch (error) {
        console.error('Failed to load plugin:', error);
        throw error;
      }
    },

    // 卸载插件
    unloadPlugin: async (id: string) => {
      try {
        await pluginLoader.unloadPlugin(id);
      } catch (error) {
        console.error('Failed to unload plugin:', error);
        throw error;
      }
    },

    // 重新加载插件
    reloadPlugin: async (id: string) => {
      try {
        await pluginLoader.reloadPlugin(id);
      } catch (error) {
        console.error('Failed to reload plugin:', error);
        throw error;
      }
    },

    // 获取插件
    getPlugin: (id: string) => {
      return get().plugins.get(id);
    },

    // 获取所有插件
    getAllPlugins: () => {
      return Array.from(get().plugins.values());
    },

    // 内部方法
    _setPlugin: (id: string, plugin: LoadedPlugin) => {
      set((state) => {
        const newPlugins = new Map(state.plugins);
        newPlugins.set(id, plugin);
        return { plugins: newPlugins };
      });
    },

    _removePlugin: (id: string) => {
      set((state) => {
        const newPlugins = new Map(state.plugins);
        newPlugins.delete(id);
        return { plugins: newPlugins };
      });
    },

    _setLoading: (id: string, loading: boolean) => {
      set((state) => {
        const newLoading = new Set(state.loading);
        if (loading) {
          newLoading.add(id);
        } else {
          newLoading.delete(id);
        }
        return { loading: newLoading };
      });
    },

    _setError: (id: string, error: Error | null) => {
      set((state) => {
        const newErrors = new Map(state.errors);
        if (error) {
          newErrors.set(id, error);
        } else {
          newErrors.delete(id);
        }
        return { errors: newErrors };
      });
    },
  };
});
