/**
 * 配置相关类型定义
 */

export interface ConfigTemplate {
  name: string;
  description: string;
  icon: string;
}

export const configTemplateInfo: Record<string, ConfigTemplate> = {
  default: {
    name: 'Default',
    description: 'Balanced settings for general use',
    icon: '⚙️',
  },
  developer: {
    name: 'Developer',
    description: 'Optimized for development work',
    icon: '👨‍💻',
  },
  minimal: {
    name: 'Minimal',
    description: 'Minimal features for maximum simplicity',
    icon: '✨',
  },
  performance: {
    name: 'Performance',
    description: 'Optimized for speed and performance',
    icon: '⚡',
  },
};
