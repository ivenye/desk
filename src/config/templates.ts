import type { DeskConfig } from './schema';
import { defaultConfig } from './defaults';

/**
 * 配置模板
 */

/**
 * 开发者模板
 */
export const developerTemplate: DeskConfig = {
  ...defaultConfig,
  editor: {
    ...defaultConfig.editor,
    fontSize: 12,
    tabSize: 4,
    minimap: false,
    wordWrap: false,
  },
  terminal: {
    ...defaultConfig.terminal,
    scrollback: 5000,
  },
  plugins: {
    ...defaultConfig.plugins,
    autoLoad: true,
  },
};

/**
 * 极简模板
 */
export const minimalTemplate: DeskConfig = {
  ...defaultConfig,
  editor: {
    ...defaultConfig.editor,
    minimap: false,
    autoSave: false,
  },
  app: {
    ...defaultConfig.app,
    autoUpdate: false,
  },
};

/**
 * 高性能模板
 */
export const performanceTemplate: DeskConfig = {
  ...defaultConfig,
  editor: {
    ...defaultConfig.editor,
    minimap: false,
    autoSave: false,
  },
  terminal: {
    ...defaultConfig.terminal,
    scrollback: 500,
  },
};

/**
 * 所有模板
 */
export const configTemplates = {
  default: defaultConfig,
  developer: developerTemplate,
  minimal: minimalTemplate,
  performance: performanceTemplate,
};

export type ConfigTemplateName = keyof typeof configTemplates;
