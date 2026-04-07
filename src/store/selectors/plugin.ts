import type { RootState } from '@/types/store';

/**
 * 插件状态选择器
 */

export const selectLoadedPlugins = (state: RootState) => {
  return Array.from(state.loaded.values());
};

export const selectPluginById = (pluginId: string) => (state: RootState) => {
  return state.loaded.get(pluginId) || null;
};

export const selectIsPluginLoading = (pluginId: string) => (state: RootState) => {
  return state.loading.has(pluginId);
};

export const selectPluginError = (pluginId: string) => (state: RootState) => {
  return state.errors.get(pluginId) || null;
};

export const selectHasLoadedPlugins = (state: RootState) => {
  return state.loaded.size > 0;
};

export const selectLoadingPluginsCount = (state: RootState) => {
  return state.loading.size;
};

export const selectPluginErrorsCount = (state: RootState) => {
  return state.errors.size;
};
