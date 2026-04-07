import type { z } from 'zod';

/**
 * 命令分类
 */
export type CommandCategory =
  | 'file'
  | 'edit'
  | 'view'
  | 'terminal'
  | 'agent'
  | 'plugin'
  | 'settings'
  | 'help'
  | 'custom';

/**
 * 命令上下文
 */
export interface CommandContext {
  /** 当前视图 */
  currentView?: string;

  /** 选中的文本 */
  selectedText?: string;

  /** 当前文件路径 */
  currentFile?: string;

  /** 额外数据 */
  [key: string]: unknown;
}

/**
 * 命令执行结果
 */
export interface CommandResult {
  /** 是否成功 */
  success: boolean;

  /** 结果数据 */
  data?: unknown;

  /** 错误信息 */
  error?: string;

  /** 消息 */
  message?: string;
}

/**
 * 命令定义
 */
export interface CommandDefinition {
  /** 唯一标识符 */
  id: string;

  /** 显示名称 */
  name: string;

  /** 描述 */
  description: string;

  /** 分类 */
  category: CommandCategory;

  /** 图标 */
  icon?: string;

  /** 快捷键 (例如: "Ctrl+Shift+P") */
  shortcut?: string;

  /** 参数模式 */
  argsSchema?: z.ZodSchema;

  /** 执行函数 */
  execute: (args?: unknown, context?: CommandContext) => Promise<CommandResult>;

  /** 是否可见 */
  visible?: boolean | ((context: CommandContext) => boolean);

  /** 是否启用 */
  enabled?: boolean | ((context: CommandContext) => boolean);

  /** 权限要求 */
  permissions?: string[];

  /** 关键词（用于搜索） */
  keywords?: string[];
}

/**
 * 已注册的命令
 */
export interface RegisteredCommand extends CommandDefinition {
  /** 注册时间 */
  registeredAt: Date;

  /** 注册来源 */
  source: 'builtin' | 'plugin' | 'user';

  /** 插件 ID（如果来自插件） */
  pluginId?: string;
}

/**
 * 命令历史记录
 */
export interface CommandHistoryEntry {
  /** 命令 ID */
  commandId: string;

  /** 执行时间 */
  executedAt: Date;

  /** 参数 */
  args?: unknown;

  /** 结果 */
  result: CommandResult;

  /** 执行时长（毫秒） */
  duration: number;
}

/**
 * 快捷键绑定
 */
export interface ShortcutBinding {
  /** 快捷键 */
  shortcut: string;

  /** 命令 ID */
  commandId: string;

  /** 是否启用 */
  enabled: boolean;

  /** 上下文条件 */
  when?: string;
}
