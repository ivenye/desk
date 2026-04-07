import type { ComponentDefinition } from './types';
import type { ComponentType } from 'react';

/**
 * 组件注册表
 * 管理可复用的 React 组件
 */
export class ComponentRegistry {
  private components: Map<string, ComponentDefinition> = new Map();

  /**
   * 注册组件
   */
  register(definition: ComponentDefinition): void {
    if (this.components.has(definition.id)) {
      console.warn(`Component ${definition.id} is already registered`);
      return;
    }

    this.components.set(definition.id, definition);
    console.log(`[ComponentRegistry] Registered component: ${definition.id}`);
  }

  /**
   * 注销组件
   */
  unregister(componentId: string): boolean {
    const result = this.components.delete(componentId);
    if (result) {
      console.log(`[ComponentRegistry] Unregistered component: ${componentId}`);
    }
    return result;
  }

  /**
   * 获取组件
   */
  get(componentId: string): ComponentType<any> | undefined {
    return this.components.get(componentId)?.component;
  }

  /**
   * 获取组件定义
   */
  getDefinition(componentId: string): ComponentDefinition | undefined {
    return this.components.get(componentId);
  }

  /**
   * 获取所有组件
   */
  getAll(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  /**
   * 清空所有组件
   */
  clear(): void {
    this.components.clear();
    console.log('[ComponentRegistry] Cleared all components');
  }

  /**
   * 获取组件数量
   */
  get size(): number {
    return this.components.size;
  }
}

// 导出单例
export const componentRegistry = new ComponentRegistry();
