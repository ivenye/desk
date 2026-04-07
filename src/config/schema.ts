import { z } from 'zod';

/**
 * 应用配置模式
 */
export const appConfigSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('dark'),
  language: z.string().default('en'),
  autoUpdate: z.boolean().default(true),
});

/**
 * 编辑器配置模式
 */
export const editorConfigSchema = z.object({
  fontSize: z.number().min(8).max(32).default(14),
  fontFamily: z.string().default('Monaco, Consolas, monospace'),
  lineHeight: z.number().min(1).max(3).default(1.5),
  tabSize: z.number().min(1).max(8).default(2),
  autoSave: z.boolean().default(true),
  autoSaveDelay: z.number().min(100).max(10000).default(1000),
  wordWrap: z.boolean().default(true),
  minimap: z.boolean().default(true),
});

/**
 * 终端配置模式
 */
export const terminalConfigSchema = z.object({
  shell: z.string().default('bash'),
  fontSize: z.number().min(8).max(32).default(14),
  fontFamily: z.string().default('Monaco, Consolas, monospace'),
  cursorStyle: z.enum(['block', 'underline', 'bar']).default('block'),
  scrollback: z.number().min(100).max(10000).default(1000),
});

/**
 * 插件配置模式
 */
export const pluginsConfigSchema = z.object({
  autoLoad: z.boolean().default(false),
  loadOnStartup: z.array(z.string()).default([]),
  pluginPaths: z.array(z.string()).default(['./plugins']),
});

/**
 * 快捷键配置模式
 */
export const keybindingsConfigSchema = z.record(z.string(), z.string()).default({});

/**
 * 完整配置模式
 */
export const configSchema = z.object({
  app: appConfigSchema,
  editor: editorConfigSchema,
  terminal: terminalConfigSchema,
  plugins: pluginsConfigSchema,
  keybindings: keybindingsConfigSchema,
});

/**
 * 配置类型
 */
export type DeskConfig = z.infer<typeof configSchema>;
export type AppConfig = z.infer<typeof appConfigSchema>;
export type EditorConfig = z.infer<typeof editorConfigSchema>;
export type TerminalConfig = z.infer<typeof terminalConfigSchema>;
export type PluginsConfig = z.infer<typeof pluginsConfigSchema>;
export type KeybindingsConfig = z.infer<typeof keybindingsConfigSchema>;
