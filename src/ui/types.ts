import type { ComponentType } from 'react';

/**
 * 面板位置
 */
export type PanelPosition = 'left' | 'right' | 'bottom' | 'center' | 'floating';

/**
 * 面板定义
 */
export interface PanelDefinition {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  position: PanelPosition;
  component: ComponentType<any>;
  defaultSize?: {
    width?: number;
    height?: number;
  };
  minSize?: {
    width?: number;
    height?: number;
  };
  maxSize?: {
    width?: number;
    height?: number;
  };
  resizable?: boolean;
  closable?: boolean;
  visible?: boolean;
  order?: number;
}

/**
 * 已注册的面板
 */
export interface RegisteredPanel extends PanelDefinition {
  registeredAt: Date;
  source: 'builtin' | 'plugin';
  pluginId?: string;
}

/**
 * 组件定义
 */
export interface ComponentDefinition {
  id: string;
  name: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

/**
 * 主题定义
 */
export interface ThemeDefinition {
  id: string;
  name: string;
  description?: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    border: string;
    muted: string;
    mutedForeground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    destructive: string;
    destructiveForeground: string;
  };
  fonts?: {
    body?: string;
    heading?: string;
    mono?: string;
  };
  spacing?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  borderRadius?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
}

/**
 * 布局定义
 */
export interface LayoutDefinition {
  id: string;
  name: string;
  description?: string;
  areas: {
    left?: {
      panels: string[];
      width?: number;
      visible?: boolean;
    };
    right?: {
      panels: string[];
      width?: number;
      visible?: boolean;
    };
    bottom?: {
      panels: string[];
      height?: number;
      visible?: boolean;
    };
    center: {
      panels: string[];
    };
  };
}
