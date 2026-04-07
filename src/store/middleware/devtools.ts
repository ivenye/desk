import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { devtools as zustandDevtools } from 'zustand/middleware';

/**
 * DevTools 中间件
 * 集成 Redux DevTools
 */
export const devtools = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  config: StateCreator<T, Mps, Mcs>,
  options?: {
    name?: string;
    enabled?: boolean;
  }
): StateCreator<T, Mps, Mcs> => {
  const enabled = options?.enabled ?? process.env.NODE_ENV === 'development';

  if (!enabled) {
    return config;
  }

  return zustandDevtools(config, {
    name: options?.name || 'Desk Store',
    enabled,
  });
};
