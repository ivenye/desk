import type { PanelDefinition, RegisteredPanel } from './types';

/**
 * 面板注册表
 * 管理所有已注册的面板
 */
export class PanelRegistry {
  private panels: Map<string, RegisteredPanel> = new Map();

  /**
   * 注册面板
   */
  register(
    panel: PanelDefinition,
    source: 'builtin' | 'plugin' = 'builtin',
    pluginId?: string
  ): void {
    if (this.panels.has(panel.id)) {
      console.warn(`Panel ${panel.id} is already registered`);
      return;
    }

    const registered: RegisteredPanel = {
      ...panel,
      registeredAt: new Date(),
      source,
      pluginId,
    };

    this.panels.set(panel.id, registered);
    console.log(`[PanelRegistry] Registered panel: ${panel.id}`);
  }

  /**
   * 注销面板
   */
  unregister(panelId: string): boolean {
    const result = this.panels.delete(panelId);
    if (result) {
      console.log(`[PanelRegistry] Unregistered panel: ${panelId}`);
    }
    return result;
  }

  /**
   * 获取面板
   */
  get(panelId: string): RegisteredPanel | undefined {
    return this.panels.get(panelId);
  }

  /**
   * 获取所有面板
   */
  getAll(): RegisteredPanel[] {
    return Array.from(this.panels.values());
  }

  /**
   * 按位置获取面板
   */
  getByPosition(position: string): RegisteredPanel[] {
    return this.getAll().filter(panel => panel.position === position);
  }

  /**
   * 按来源获取面板
   */
  getBySource(source: 'builtin' | 'plugin'): RegisteredPanel[] {
    return this.getAll().filter(panel => panel.source === source);
  }

  /**
   * 按插件获取面板
   */
  getByPlugin(pluginId: string): RegisteredPanel[] {
    return this.getAll().filter(panel => panel.pluginId === pluginId);
  }

  /**
   * 清空所有面板
   */
  clear(): void {
    this.panels.clear();
    console.log('[PanelRegistry] Cleared all panels');
  }

  /**
   * 获取面板数量
   */
  get size(): number {
    return this.panels.size;
  }
}

// 导出单例
export const panelRegistry = new PanelRegistry();
