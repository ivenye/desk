import type { ShortcutBinding } from './types';
import { commandExecutor } from './executor';

/**
 * 快捷键管理器
 * 处理键盘快捷键绑定和触发
 */
export class ShortcutManager {
  private bindings: Map<string, ShortcutBinding> = new Map();
  private listeners: Set<(event: KeyboardEvent) => void> = new Set();

  /**
   * 初始化快捷键监听
   */
  initialize(): void {
    const handler = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', handler);
    this.listeners.add(handler);
    console.log('[ShortcutManager] Initialized');
  }

  /**
   * 销毁快捷键监听
   */
  destroy(): void {
    this.listeners.forEach(listener => {
      window.removeEventListener('keydown', listener);
    });
    this.listeners.clear();
    console.log('[ShortcutManager] Destroyed');
  }

  /**
   * 注册快捷键
   */
  register(binding: ShortcutBinding): void {
    const normalized = this.normalizeShortcut(binding.shortcut);

    if (this.bindings.has(normalized)) {
      console.warn(`Shortcut ${normalized} is already registered`);
      return;
    }

    this.bindings.set(normalized, { ...binding, shortcut: normalized });
    console.log(`[ShortcutManager] Registered shortcut: ${normalized} -> ${binding.commandId}`);
  }

  /**
   * 注销快捷键
   */
  unregister(shortcut: string): boolean {
    const normalized = this.normalizeShortcut(shortcut);
    const result = this.bindings.delete(normalized);

    if (result) {
      console.log(`[ShortcutManager] Unregistered shortcut: ${normalized}`);
    }

    return result;
  }

  /**
   * 获取快捷键绑定
   */
  get(shortcut: string): ShortcutBinding | undefined {
    const normalized = this.normalizeShortcut(shortcut);
    return this.bindings.get(normalized);
  }

  /**
   * 获取所有快捷键
   */
  getAll(): ShortcutBinding[] {
    return Array.from(this.bindings.values());
  }

  /**
   * 处理键盘事件
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const shortcut = this.eventToShortcut(event);
    const binding = this.bindings.get(shortcut);

    if (!binding || !binding.enabled) {
      return;
    }

    // 检查上下文条件
    if (binding.when && !this.evaluateWhen(binding.when)) {
      return;
    }

    // 阻止默认行为
    event.preventDefault();
    event.stopPropagation();

    // 执行命令
    console.log(`[ShortcutManager] Triggered: ${shortcut} -> ${binding.commandId}`);
    commandExecutor.execute(binding.commandId).catch(error => {
      console.error(`[ShortcutManager] Failed to execute command:`, error);
    });
  }

  /**
   * 将键盘事件转换为快捷键字符串
   */
  private eventToShortcut(event: KeyboardEvent): string {
    const parts: string[] = [];

    if (event.ctrlKey || event.metaKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');
    if (event.shiftKey) parts.push('Shift');

    // 获取按键
    let key = event.key;

    // 标准化特殊键
    if (key === ' ') key = 'Space';
    else if (key.length === 1) key = key.toUpperCase();

    parts.push(key);

    return parts.join('+');
  }

  /**
   * 标准化快捷键字符串
   */
  private normalizeShortcut(shortcut: string): string {
    const parts = shortcut.split('+').map(p => p.trim());
    const modifiers: string[] = [];
    let key = '';

    for (const part of parts) {
      const lower = part.toLowerCase();
      if (lower === 'ctrl' || lower === 'cmd' || lower === 'meta') {
        modifiers.push('Ctrl');
      } else if (lower === 'alt' || lower === 'option') {
        modifiers.push('Alt');
      } else if (lower === 'shift') {
        modifiers.push('Shift');
      } else {
        key = part.length === 1 ? part.toUpperCase() : part;
      }
    }

    // 按顺序排列修饰键
    const ordered = ['Ctrl', 'Alt', 'Shift'].filter(m => modifiers.includes(m));
    ordered.push(key);

    return ordered.join('+');
  }

  /**
   * 评估 when 条件
   */
  private evaluateWhen(when: string): boolean {
    // 简单的条件评估
    // 可以扩展为更复杂的表达式解析
    try {
      // 例如: "editorFocus", "!terminalFocus"
      const negate = when.startsWith('!');
      // const condition = negate ? when.slice(1) : when;

      // 这里可以根据应用状态评估条件
      // 暂时返回 true
      return !negate || true;
    } catch {
      return false;
    }
  }

  /**
   * 检查快捷键冲突
   */
  hasConflict(shortcut: string): boolean {
    const normalized = this.normalizeShortcut(shortcut);
    return this.bindings.has(normalized);
  }

  /**
   * 清空所有快捷键
   */
  clear(): void {
    this.bindings.clear();
    console.log('[ShortcutManager] Cleared all shortcuts');
  }
}

// 导出单例
export const shortcutManager = new ShortcutManager();
