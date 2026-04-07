export * from './types';
export * from './registry';
export * from './executor';
export * from './history';
export * from './shortcuts';

// 导出单例
export { commandRegistry } from './registry';
export { commandExecutor } from './executor';
export { commandHistory } from './history';
export { shortcutManager } from './shortcuts';
