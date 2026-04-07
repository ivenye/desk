import type { CommandHistoryEntry, CommandResult } from './types';

/**
 * 命令历史管理器
 * 记录和管理命令执行历史
 */
export class CommandHistory {
  private history: CommandHistoryEntry[] = [];
  private maxSize: number = 100;

  /**
   * 添加历史记录
   */
  add(
    commandId: string,
    args: unknown,
    result: CommandResult,
    duration: number
  ): void {
    const entry: CommandHistoryEntry = {
      commandId,
      executedAt: new Date(),
      args,
      result,
      duration,
    };

    this.history.unshift(entry);

    // 限制历史记录大小
    if (this.history.length > this.maxSize) {
      this.history = this.history.slice(0, this.maxSize);
    }

    console.log(`[CommandHistory] Added entry for: ${commandId}`);
  }

  /**
   * 获取所有历史记录
   */
  getAll(): CommandHistoryEntry[] {
    return [...this.history];
  }

  /**
   * 获取最近的 N 条记录
   */
  getRecent(count: number = 10): CommandHistoryEntry[] {
    return this.history.slice(0, count);
  }

  /**
   * 按命令 ID 获取历史
   */
  getByCommand(commandId: string): CommandHistoryEntry[] {
    return this.history.filter(entry => entry.commandId === commandId);
  }

  /**
   * 获取成功的命令
   */
  getSuccessful(): CommandHistoryEntry[] {
    return this.history.filter(entry => entry.result.success);
  }

  /**
   * 获取失败的命令
   */
  getFailed(): CommandHistoryEntry[] {
    return this.history.filter(entry => !entry.result.success);
  }

  /**
   * 清空历史
   */
  clear(): void {
    this.history = [];
    console.log('[CommandHistory] Cleared history');
  }

  /**
   * 设置最大历史记录数
   */
  setMaxSize(size: number): void {
    this.maxSize = size;
    if (this.history.length > size) {
      this.history = this.history.slice(0, size);
    }
  }

  /**
   * 获取历史记录数量
   */
  get size(): number {
    return this.history.length;
  }

  /**
   * 获取统计信息
   */
  getStats() {
    const total = this.history.length;
    const successful = this.getSuccessful().length;
    const failed = this.getFailed().length;
    const avgDuration = total > 0
      ? this.history.reduce((sum, entry) => sum + entry.duration, 0) / total
      : 0;

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      avgDuration: Math.round(avgDuration),
    };
  }
}

// 导出单例
export const commandHistory = new CommandHistory();
