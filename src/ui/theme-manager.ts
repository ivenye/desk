import type { ThemeDefinition } from './types';
import { eventBus } from '@/services/event-bus';

/**
 * 主题管理器
 * 管理和应用主题
 */
export class ThemeManager {
  private themes: Map<string, ThemeDefinition> = new Map();
  private currentTheme: string = 'default';

  /**
   * 注册主题
   */
  register(theme: ThemeDefinition): void {
    this.themes.set(theme.id, theme);
    console.log(`[ThemeManager] Registered theme: ${theme.id}`);
  }

  /**
   * 获取主题
   */
  get(themeId: string): ThemeDefinition | undefined {
    return this.themes.get(themeId);
  }

  /**
   * 获取所有主题
   */
  getAll(): ThemeDefinition[] {
    return Array.from(this.themes.values());
  }

  /**
   * 应用主题
   */
  apply(themeId: string): void {
    const theme = this.themes.get(themeId);
    if (!theme) {
      console.error(`[ThemeManager] Theme not found: ${themeId}`);
      return;
    }

    console.log(`[ThemeManager] Applying theme: ${themeId}`);

    // 应用颜色到 CSS 变量
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // 应用字体
    if (theme.fonts) {
      if (theme.fonts.body) {
        root.style.setProperty('--font-body', theme.fonts.body);
      }
      if (theme.fonts.heading) {
        root.style.setProperty('--font-heading', theme.fonts.heading);
      }
      if (theme.fonts.mono) {
        root.style.setProperty('--font-mono', theme.fonts.mono);
      }
    }

    // 应用间距
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }

    // 应用圆角
    if (theme.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
    }

    this.currentTheme = themeId;

    // 触发主题更新事件
    eventBus.emit('theme:changed', theme);
  }

  /**
   * 获取当前主题
   */
  getCurrent(): ThemeDefinition | undefined {
    return this.themes.get(this.currentTheme);
  }

  /**
   * 获取当前主题 ID
   */
  getCurrentId(): string {
    return this.currentTheme;
  }
}

// 导出单例
export const themeManager = new ThemeManager();
