import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { persist as zustandPersist, createJSONStorage } from 'zustand/middleware';

/**
 * 持久化配置
 */
export interface PersistConfig<T> {
  name: string;
  storage?: Storage;
  partialize?: (state: T) => Partial<T>;
  version?: number;
  migrate?: (persistedState: any, version: number) => T;
}

/**
 * 持久化中间件
 * 将状态保存到 localStorage
 */
export const createPersist = <T>(config: PersistConfig<T>) => {
  return zustandPersist<T>(
    (state) => state,
    {
      name: config.name,
      storage: createJSONStorage(() => config.storage || localStorage),
      partialize: config.partialize,
      version: config.version || 1,
      migrate: config.migrate,
    }
  );
};

/**
 * 清除持久化状态
 */
export const clearPersistedState = (name: string, storage: Storage = localStorage) => {
  storage.removeItem(name);
  console.log(`[Persist] Cleared persisted state: ${name}`);
};

/**
 * 获取持久化状态
 */
export const getPersistedState = <T>(name: string, storage: Storage = localStorage): T | null => {
  try {
    const item = storage.getItem(name);
    if (!item) return null;

    const parsed = JSON.parse(item);
    return parsed.state as T;
  } catch (error) {
    console.error('[Persist] Failed to get persisted state:', error);
    return null;
  }
};
