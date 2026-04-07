import type { CommandDefinition, RegisteredCommand, CommandContext } from './types';

/**
 * 命令注册表
 * 管理所有已注册的命令
 */
export class CommandRegistry {
  private commands: Map<string, RegisteredCommand> = new Map();
  private shortcuts: Map<string, string> = new Map(); // shortcut -> commandId

  /**
   * 注册命令
   */
  register(
    command: CommandDefinition,
    source: 'builtin' | 'plugin' | 'user' = 'builtin',
    pluginId?: string
  ): void {
    if (this.commands.has(command.id)) {
      console.warn(`Command ${command.id} is already registered`);
      return;
    }

    const registered: RegisteredCommand = {
      ...command,
      registeredAt: new Date(),
      source,
      pluginId,
    };

    this.commands.set(command.id, registered);

    // 注册快捷键
    if (command.shortcut) {
      this.registerShortcut(command.shortcut, command.id);
    }

    console.log(`[CommandRegistry] Registered command: ${command.id}`);
  }

  /**
   * 注销命令
   */
  unregister(commandId: string): boolean {
    const command = this.commands.get(commandId);
    if (!command) {
      return false;
    }

    // 移除快捷键
    if (command.shortcut) {
      this.shortcuts.delete(command.shortcut);
    }

    this.commands.delete(commandId);
    console.log(`[CommandRegistry] Unregistered command: ${commandId}`);
    return true;
  }

  /**
   * 获取命令
   */
  get(commandId: string): RegisteredCommand | undefined {
    return this.commands.get(commandId);
  }

  /**
   * 获取所有命令
   */
  getAll(): RegisteredCommand[] {
    return Array.from(this.commands.values());
  }

  /**
   * 按分类获取命令
   */
  getByCategory(category: string): RegisteredCommand[] {
    return this.getAll().filter(cmd => cmd.category === category);
  }

  /**
   * 按来源获取命令
   */
  getBySource(source: 'builtin' | 'plugin' | 'user'): RegisteredCommand[] {
    return this.getAll().filter(cmd => cmd.source === source);
  }

  /**
   * 按插件获取命令
   */
  getByPlugin(pluginId: string): RegisteredCommand[] {
    return this.getAll().filter(cmd => cmd.pluginId === pluginId);
  }

  /**
   * 搜索命令
   */
  search(query: string, context?: CommandContext): RegisteredCommand[] {
    const lowerQuery = query.toLowerCase();

    return this.getAll().filter(cmd => {
      // 检查可见性
      if (typeof cmd.visible === 'function') {
        if (!cmd.visible(context || {})) return false;
      } else if (cmd.visible === false) {
        return false;
      }

      // 搜索匹配
      const matchName = cmd.name.toLowerCase().includes(lowerQuery);
      const matchDescription = cmd.description.toLowerCase().includes(lowerQuery);
      const matchId = cmd.id.toLowerCase().includes(lowerQuery);
      const matchKeywords = cmd.keywords?.some(k => k.toLowerCase().includes(lowerQuery));

      return matchName || matchDescription || matchId || matchKeywords;
    });
  }

  /**
   * 注册快捷键
   */
  private registerShortcut(shortcut: string, commandId: string): void {
    const existing = this.shortcuts.get(shortcut);
    if (existing) {
      console.warn(`Shortcut ${shortcut} is already bound to ${existing}`);
      return;
    }
    this.shortcuts.set(shortcut, commandId);
  }

  /**
   * 通过快捷键获取命令
   */
  getByShortcut(shortcut: string): RegisteredCommand | undefined {
    const commandId = this.shortcuts.get(shortcut);
    return commandId ? this.get(commandId) : undefined;
  }

  /**
   * 获取所有快捷键
   */
  getAllShortcuts(): Map<string, string> {
    return new Map(this.shortcuts);
  }

  /**
   * 清空所有命令
   */
  clear(): void {
    this.commands.clear();
    this.shortcuts.clear();
    console.log('[CommandRegistry] Cleared all commands');
  }

  /**
   * 获取命令数量
   */
  get size(): number {
    return this.commands.size;
  }
}

// 导出单例
export const commandRegistry = new CommandRegistry();
