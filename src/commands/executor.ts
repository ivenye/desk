import type { CommandContext, CommandResult, RegisteredCommand } from './types';
import { commandRegistry } from './registry';

/**
 * 命令执行器
 * 负责执行命令并处理错误
 */
export class CommandExecutor {
  /**
   * 执行命令
   */
  async execute(
    commandId: string,
    args?: unknown,
    context?: CommandContext
  ): Promise<CommandResult> {
    const startTime = Date.now();

    try {
      // 获取命令
      const command = commandRegistry.get(commandId);
      if (!command) {
        return {
          success: false,
          error: `Command not found: ${commandId}`,
        };
      }

      // 检查是否启用
      if (!this.isEnabled(command, context)) {
        return {
          success: false,
          error: `Command is disabled: ${commandId}`,
        };
      }

      // 验证参数
      if (command.argsSchema && args) {
        const validation = command.argsSchema.safeParse(args);
        if (!validation.success) {
          return {
            success: false,
            error: `Invalid arguments: ${validation.error.message}`,
          };
        }
      }

      // 执行命令
      console.log(`[CommandExecutor] Executing command: ${commandId}`);
      const result = await command.execute(args, context);

      const duration = Date.now() - startTime;
      console.log(`[CommandExecutor] Command executed in ${duration}ms`);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[CommandExecutor] Command failed after ${duration}ms:`, error);

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * 检查命令是否启用
   */
  private isEnabled(command: RegisteredCommand, context?: CommandContext): boolean {
    if (typeof command.enabled === 'function') {
      return command.enabled(context || {});
    }
    return command.enabled !== false;
  }

  /**
   * 批量执行命令
   */
  async executeMany(
    commands: Array<{ commandId: string; args?: unknown }>,
    context?: CommandContext
  ): Promise<CommandResult[]> {
    const results: CommandResult[] = [];

    for (const { commandId, args } of commands) {
      const result = await this.execute(commandId, args, context);
      results.push(result);

      // 如果有命令失败，停止执行
      if (!result.success) {
        break;
      }
    }

    return results;
  }
}

// 导出单例
export const commandExecutor = new CommandExecutor();
