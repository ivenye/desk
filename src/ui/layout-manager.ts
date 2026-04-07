import type { LayoutDefinition } from './types';
import { eventBus } from '@/services/event-bus';

/**
 * 布局管理器
 * 管理应用布局
 */
export class LayoutManager {
  private layouts: Map<string, LayoutDefinition> = new Map();
  private currentLayout: string = 'default';

  /**
   * 注册布局
   */
  register(layout: LayoutDefinition): void {
    this.layouts.set(layout.id, layout);
    console.log(`[LayoutManager] Registered layout: ${layout.id}`);
  }

  /**
   * 获取布局
   */
  get(layoutId: string): LayoutDefinition | undefined {
    return this.layouts.get(layoutId);
  }

  /**
   * 获取所有布局
   */
  getAll(): LayoutDefinition[] {
    return Array.from(this.layouts.values());
  }

  /**
   * 应用布局
   */
  apply(layoutId: string): void {
    const layout = this.layouts.get(layoutId);
    if (!layout) {
      console.error(`[LayoutManager] Layout not found: ${layoutId}`);
      return;
    }

    console.log(`[LayoutManager] Applying layout: ${layoutId}`);

    this.currentLayout = layoutId;

    // 触发布局更新事件
    eventBus.emit('layout:changed', layout);
  }

  /**
   * 获取当前布局
   */
  getCurrent(): LayoutDefinition | undefined {
    return this.layouts.get(this.currentLayout);
  }

  /**
   * 获取当前布局 ID
   */
  getCurrentId(): string {
    return this.currentLayout;
  }

  /**
   * 更新布局区域
   */
  updateArea(
    layoutId: string,
    area: 'left' | 'right' | 'bottom',
    updates: Partial<LayoutDefinition['areas']['left']>
  ): void {
    const layout = this.layouts.get(layoutId);
    if (!layout) {
      console.error(`[LayoutManager] Layout not found: ${layoutId}`);
      return;
    }

    if (layout.areas[area]) {
      layout.areas[area] = {
        ...layout.areas[area],
        ...updates,
      } as typeof layout.areas[typeof area];

      // 如果是当前布局，触发更新
      if (layoutId === this.currentLayout) {
        eventBus.emit('layout:changed', layout);
      }
    }
  }
}

// 导出单例
export const layoutManager = new LayoutManager();
