import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { RootState } from '@/types/store';
import {
  createAppSlice,
  createEditorSlice,
  createTerminalSlice,
  createPluginSlice,
  createCommandSlice,
} from './slices';
import { conditionalLogger } from './middleware/logger';

/**
 * 根状态 Store
 * 组合所有状态切片
 */
export const useStore = create<RootState>()(
  devtools(
    conditionalLogger(
      (...a) => ({
        ...createAppSlice(...a),
        ...createEditorSlice(...a),
        ...createTerminalSlice(...a),
        ...createPluginSlice(...a),
        ...createCommandSlice(...a),
      })
    ),
    { name: 'Desk Store' }
  )
);

/**
 * 导出 Store 实例（用于非 React 环境）
 */
export const store = useStore;

/**
 * 获取当前状态（用于非 React 环境）
 */
export const getState = () => useStore.getState();

/**
 * 订阅状态变化（用于非 React 环境）
 */
export const subscribe = useStore.subscribe;
