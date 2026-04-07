import type { StateCreator } from 'zustand';
import type { PluginSlice } from '@/types/store';

/**
 * 插件状态切片
 */
export const createPluginSlice: StateCreator<PluginSlice> = (set) => ({
  // State
  loaded: new Map(),
  loading: new Set(),
  errors: new Map(),

  // Actions
  setPluginLoading: (pluginId: string, loading: boolean) => {
    console.log(`[PluginSlice] Setting plugin loading: ${pluginId} = ${loading}`);

    set((state) => {
      const newLoading = new Set(state.loading);

      if (loading) {
        newLoading.add(pluginId);
      } else {
        newLoading.delete(pluginId);
      }

      return { loading: newLoading };
    });
  },

  setPluginLoaded: (pluginId: string, plugin: unknown) => {
    console.log(`[PluginSlice] Plugin loaded: ${pluginId}`);

    set((state) => {
      const newLoaded = new Map(state.loaded);
      newLoaded.set(pluginId, plugin);

      const newLoading = new Set(state.loading);
      newLoading.delete(pluginId);

      const newErrors = new Map(state.errors);
      newErrors.delete(pluginId);

      return {
        loaded: newLoaded,
        loading: newLoading,
        errors: newErrors,
      };
    });
  },

  setPluginError: (pluginId: string, error: Error) => {
    console.error(`[PluginSlice] Plugin error: ${pluginId}`, error);

    set((state) => {
      const newErrors = new Map(state.errors);
      newErrors.set(pluginId, error);

      const newLoading = new Set(state.loading);
      newLoading.delete(pluginId);

      return {
        errors: newErrors,
        loading: newLoading,
      };
    });
  },

  removePlugin: (pluginId: string) => {
    console.log(`[PluginSlice] Removing plugin: ${pluginId}`);

    set((state) => {
      const newLoaded = new Map(state.loaded);
      newLoaded.delete(pluginId);

      const newLoading = new Set(state.loading);
      newLoading.delete(pluginId);

      const newErrors = new Map(state.errors);
      newErrors.delete(pluginId);

      return {
        loaded: newLoaded,
        loading: newLoading,
        errors: newErrors,
      };
    });
  },
});
