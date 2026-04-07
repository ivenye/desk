import type {
  ProviderConfig,
  ToolDefinition,
  CommandDefinition,
  PanelDefinition,
  ServiceDefinition,
} from '@/plugin-sdk/types';

/**
 * 插件注册表
 */
export class PluginRegistry {
  private providers = new Map<string, ProviderConfig>();
  private tools = new Map<string, ToolDefinition>();
  private commands = new Map<string, CommandDefinition>();
  private panels = new Map<string, PanelDefinition>();
  private services = new Map<string, ServiceDefinition>();

  // Provider 方法
  getProviderRegistry(): Map<string, ProviderConfig> {
    return this.providers;
  }

  getProvider(id: string): ProviderConfig | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): ProviderConfig[] {
    return Array.from(this.providers.values());
  }

  // Tool 方法
  getToolRegistry(): Map<string, ToolDefinition> {
    return this.tools;
  }

  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  getAllTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  // Command 方法
  getCommandRegistry(): Map<string, CommandDefinition> {
    return this.commands;
  }

  getCommand(id: string): CommandDefinition | undefined {
    return this.commands.get(id);
  }

  getAllCommands(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  // Panel 方法
  getPanelRegistry(): Map<string, PanelDefinition> {
    return this.panels;
  }

  getPanel(id: string): PanelDefinition | undefined {
    return this.panels.get(id);
  }

  getAllPanels(): PanelDefinition[] {
    return Array.from(this.panels.values());
  }

  // Service 方法
  getServiceRegistry(): Map<string, ServiceDefinition> {
    return this.services;
  }

  getService(id: string): ServiceDefinition | undefined {
    return this.services.get(id);
  }

  getAllServices(): ServiceDefinition[] {
    return Array.from(this.services.values());
  }

  // 清理方法
  clear(): void {
    this.providers.clear();
    this.tools.clear();
    this.commands.clear();
    this.panels.clear();
    this.services.clear();
  }
}

// 单例实例
export const pluginRegistry = new PluginRegistry();
