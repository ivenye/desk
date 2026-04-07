import type { z } from 'zod';
import type EventEmitter from 'eventemitter3';

/**
 * 插件类型
 */
export type PluginKind =
  | 'provider'   // AI 模型提供者
  | 'tool'       // Agent 工具
  | 'command'    // 命令
  | 'panel'      // UI 面板
  | 'service';   // 后台服务

/**
 * 插件定义
 */
export interface DeskPluginDefinition {
  /** 唯一标识符 */
  id: string;

  /** 显示名称 */
  name: string;

  /** 描述 */
  description: string;

  /** 版本 */
  version: string;

  /** 插件类型 */
  kind: PluginKind;

  /** 作者 */
  author?: string;

  /** 主页 */
  homepage?: string;

  /** 配置模式（Zod schema） */
  configSchema: z.ZodSchema;

  /** 注册函数 */
  register: (api: DeskPluginApi) => void | Promise<void>;

  /** 卸载函数（可选） */
  unregister?: (api: DeskPluginApi) => void | Promise<void>;
}

/**
 * 插件 API
 */
export interface DeskPluginApi {
  /** 插件 ID */
  readonly pluginId: string;

  /** 获取插件配置 */
  getConfig<T = unknown>(): T;

  /** 更新插件配置 */
  updateConfig<T = unknown>(config: Partial<T>): Promise<void>;

  /** 日志记录器 */
  logger: PluginLogger;

  /** 事件总线 */
  events: {
    on<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
    off<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
    emit<K extends keyof PluginEvents>(event: K, ...args: Parameters<PluginEvents[K]>): void;
    once<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
  };

  /** 注册 Provider */
  registerProvider(config: ProviderConfig): void;

  /** 注册工具 */
  registerTool(tool: ToolDefinition): void;

  /** 注册命令 */
  registerCommand(command: CommandDefinition): void;

  /** 注册面板 */
  registerPanel(panel: PanelDefinition): void;

  /** 注册服务 */
  registerService(service: ServiceDefinition): void;
}

/**
 * 插件日志记录器
 */
export interface PluginLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Provider 配置
 */
export interface ProviderConfig {
  id: string;
  name: string;
  description: string;
  models: ModelDefinition[];
  authenticate?: (credentials: unknown) => Promise<AuthResult>;
}

/**
 * 模型定义
 */
export interface ModelDefinition {
  id: string;
  name: string;
  description?: string;
  contextWindow?: number;
  maxTokens?: number;
}

/**
 * 认证结果
 */
export interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * 工具定义
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  execute: (input: unknown, context: ToolContext) => Promise<unknown>;
}

/**
 * 工具上下文
 */
export interface ToolContext {
  logger: PluginLogger;
  config: unknown;
}

/**
 * 命令定义
 */
export interface CommandDefinition {
  id: string;
  name: string;
  description: string;
  category?: string;
  icon?: string;
  shortcut?: string;
  execute: (args: unknown, context: CommandContext) => Promise<unknown>;
  validate?: (args: unknown) => boolean;
}

/**
 * 命令上下文
 */
export interface CommandContext {
  logger: PluginLogger;
  config: unknown;
}

/**
 * 面板定义
 */
export interface PanelDefinition {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<PanelProps>;
  position?: 'left' | 'right' | 'bottom' | 'center';
}

/**
 * 面板属性
 */
export interface PanelProps {
  api: DeskPluginApi;
  config: unknown;
}

/**
 * 服务定义
 */
export interface ServiceDefinition {
  id: string;
  name: string;
  start: (context: ServiceContext) => Promise<void>;
  stop: (context: ServiceContext) => Promise<void>;
}

/**
 * 服务上下文
 */
export interface ServiceContext {
  logger: PluginLogger;
  config: unknown;
  events: {
    on<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
    off<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
    emit<K extends keyof PluginEvents>(event: K, ...args: Parameters<PluginEvents[K]>): void;
  };
}

/**
 * 已加载的插件
 */
export interface LoadedPlugin {
  definition: DeskPluginDefinition;
  api: DeskPluginApi;
  config: unknown;
  status: PluginStatus;
  error?: Error;
}

/**
 * 插件状态
 */
export type PluginStatus =
  | 'loading'
  | 'loaded'
  | 'active'
  | 'error'
  | 'unloading'
  | 'unloaded';

/**
 * 插件事件
 */
export interface PluginEvents {
  'plugin:loading': (pluginId: string) => void;
  'plugin:loaded': (pluginId: string) => void;
  'plugin:activated': (pluginId: string) => void;
  'plugin:error': (pluginId: string, error: Error) => void;
  'plugin:unloading': (pluginId: string) => void;
  'plugin:unloaded': (pluginId: string) => void;
  'config:updated': (pluginId: string, config: unknown) => void;
  'provider:registered': (providerId: string) => void;
  'tool:registered': (toolName: string) => void;
  'command:registered': (commandId: string) => void;
  'panel:registered': (panelId: string) => void;
  'service:registered': (serviceId: string) => void;
}
