import type { StateCreator, StoreMutatorIdentifier } from 'zustand';

/**
 * 日志中间件
 * 记录所有状态变化
 */
export const logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  config: StateCreator<T, Mps, Mcs>
): StateCreator<T, Mps, Mcs> => {
  return (set, get, api) =>
    config(
      (...args) => {
        const prevState = get();
        console.log('[Store] Previous state:', prevState);
        console.log('[Store] Action:', args);

        set(...args);

        const nextState = get();
        console.log('[Store] Next state:', nextState);
      },
      get,
      api
    );
};

/**
 * 条件日志中间件
 * 仅在开发环境启用
 */
export const conditionalLogger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  config: StateCreator<T, Mps, Mcs>
): StateCreator<T, Mps, Mcs> => {
  if (process.env.NODE_ENV === 'development') {
    return logger(config);
  }
  return config;
};
