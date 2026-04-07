import type { ThemeDefinition } from '@/ui/types';

/**
 * 默认主题
 */
export const defaultTheme: ThemeDefinition = {
  id: 'default',
  name: 'Default',
  description: 'Default Desk theme',
  colors: {
    primary: 'hsl(222, 47%, 11%)',
    secondary: 'hsl(210, 40%, 96%)',
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222, 47%, 11%)',
    accent: 'hsl(210, 40%, 96%)',
    border: 'hsl(214, 32%, 91%)',
    muted: 'hsl(210, 40%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222, 47%, 11%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(222, 47%, 11%)',
    destructive: 'hsl(0, 84%, 60%)',
    destructiveForeground: 'hsl(0, 0%, 98%)',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Monaco, Consolas, "Courier New", monospace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};

/**
 * 暗色主题
 */
export const darkTheme: ThemeDefinition = {
  id: 'dark',
  name: 'Dark',
  description: 'Dark theme for Desk',
  colors: {
    primary: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(217, 33%, 17%)',
    background: 'hsl(222, 47%, 11%)',
    foreground: 'hsl(210, 40%, 98%)',
    accent: 'hsl(217, 33%, 17%)',
    border: 'hsl(217, 33%, 17%)',
    muted: 'hsl(217, 33%, 17%)',
    mutedForeground: 'hsl(215, 20%, 65%)',
    card: 'hsl(222, 47%, 11%)',
    cardForeground: 'hsl(210, 40%, 98%)',
    popover: 'hsl(222, 47%, 11%)',
    popoverForeground: 'hsl(210, 40%, 98%)',
    destructive: 'hsl(0, 63%, 31%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Monaco, Consolas, "Courier New", monospace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};

/**
 * 亮色主题
 */
export const lightTheme: ThemeDefinition = defaultTheme;
