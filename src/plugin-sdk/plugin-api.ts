import type {
  DeskPluginApi,
  PluginLogger,
  ProviderConfig,
  ToolDefinition,
  CommandDefinition,
  PanelDefinition,
  ServiceDefinition,
  PluginEvents,
} from './types';
import { configManager } from '@/services/config-manager';

/**
 * 插件 API 实现
 */
export class PluginApiImpl implements DeskPluginApi {
  constructor(
    public readonly pluginId: string,
    public readonly logger: PluginLogger,
    public readonly events: {
      on<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
      off<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
      emit<K extends keyof PluginEvents>(event: K, ...args: Parameters<PluginEvents[K]>): void;
      once<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void;
    },
    private providerRegistry: Map<string, ProviderConfig>,
    private toolRegistry: Map<string, ToolDefinition>,
    private commandRegistry: Map<string, CommandDefinition>,
    private panelRegistry: Map<string, PanelDefinition>,
    private serviceRegistry: Map<string, ServiceDefinition>
  ) {}

  getConfig<T = unknown>(): T {
    const config = configManager.get<T>(this.pluginId);
    if (!config) {
      throw new Error(`Config not found for plugin ${this.pluginId}`);
    }
    return config;
  }

  async updateConfig<T = unknown>(updates: Partial<T>): Promise<void> {
    const currentConfig = this.getConfig<T>();
    const newConfig = { ...currentConfig, ...updates };
    await configManager.save(this.pluginId, newConfig);

    this.logger.info('Config updated');
    this.events.emit('config:updated', this.pluginId, newConfig);
  }

  registerProvider(config: ProviderConfig): void {
    if (this.providerRegistry.has(config.id)) {
      throw new Error(`Provider ${config.id} already registered`);
    }

    this.providerRegistry.set(config.id, config);
    this.logger.info(`Provider registered: ${config.id}`);
    this.events.emit('provider:registered', config.id);
  }

  registerTool(tool: ToolDefinition): void {
    if (this.toolRegistry.has(tool.name)) {
      throw new Error(`Tool ${tool.name} already registered`);
    }

    this.toolRegistry.set(tool.name, tool);
    this.logger.info(`Tool registered: ${tool.name}`);
    this.events.emit('tool:registered', tool.name);
  }

  registerCommand(command: CommandDefinition): void {
    if (this.commandRegistry.has(command.id)) {
      throw new Error(`Command ${command.id} already registered`);
    }

    this.commandRegistry.set(command.id, command);
    this.logger.info(`Command registered: ${command.id}`);
    this.events.emit('command:registered', command.id);
  }

  registerPanel(panel: PanelDefinition): void {
    if (this.panelRegistry.has(panel.id)) {
      throw new Error(`Panel ${panel.id} already registered`);
    }

    this.panelRegistry.set(panel.id, panel);
    this.logger.info(`Panel registered: ${panel.id}`);
    this.events.emit('panel:registered', panel.id);
  }

  registerService(service: ServiceDefinition): void {
    if (this.serviceRegistry.has(service.id)) {
      throw new Error(`Service ${service.id} already registered`);
    }

    this.serviceRegistry.set(service.id, service);
    this.logger.info(`Service registered: ${service.id}`);
    this.events.emit('service:registered', service.id);
  }
}
