import { configSchema, type DeskConfig } from './schema';
import { defaultConfig } from './defaults';
import { eventBus } from '@/services/event-bus';

const CONFIG_STORAGE_KEY = 'desk-config';
const CONFIG_VERSION = 1;

/**
 * 配置管理器
 */
export class ConfigManager {
  private config: DeskConfig;

  constructor() {
    this.config = this.load();
  }

  /**
   * 加载配置
   */
  load(): DeskConfig {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);

      if (!stored) {
        console.log('[ConfigManager] No stored config, using defaults');
        return defaultConfig;
      }

      const parsed = JSON.parse(stored);

      // 验证配置
      const validated = configSchema.parse(parsed.config);

      console.log('[ConfigManager] Loaded config from storage');
      return validated;
    } catch (error) {
      console.error('[ConfigManager] Failed to load config:', error);
      return defaultConfig;
    }
  }

  /**
   * 保存配置
   */
  save(config: DeskConfig): void {
    try {
      // 验证配置
      const validated = configSchema.parse(config);

      // 保存到 localStorage
      const data = {
        version: CONFIG_VERSION,
        config: validated,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(data));

      this.config = validated;

      // 触发配置更新事件
      eventBus.emit('config:updated', validated as unknown);

      console.log('[ConfigManager] Config saved');
    } catch (error) {
      console.error('[ConfigManager] Failed to save config:', error);
      throw error;
    }
  }

  /**
   * 获取配置
   */
  get(): DeskConfig {
    return this.config;
  }

  /**
   * 更新配置（部分）
   */
  update(partial: Partial<DeskConfig>): void {
    const updated = {
      ...this.config,
      ...partial,
    };

    this.save(updated);
  }

  /**
   * 重置为默认配置
   */
  reset(): void {
    console.log('[ConfigManager] Resetting to defaults');
    this.save(defaultConfig);
  }

  /**
   * 导出配置
   */
  export(): string {
    return JSON.stringify(this.config, null, 2);
  }

  /**
   * 导入配置
   */
  import(json: string): void {
    try {
      const parsed = JSON.parse(json);
      const validated = configSchema.parse(parsed);

      this.save(validated);
      console.log('[ConfigManager] Config imported successfully');
    } catch (error) {
      console.error('[ConfigManager] Failed to import config:', error);
      throw new Error('Invalid configuration format');
    }
  }

  /**
   * 获取配置的某个部分
   */
  getSection<K extends keyof DeskConfig>(section: K): DeskConfig[K] {
    return this.config[section];
  }

  /**
   * 更新配置的某个部分
   */
  updateSection<K extends keyof DeskConfig>(
    section: K,
    value: Partial<DeskConfig[K]>
  ): void {
    const updated = {
      ...this.config,
      [section]: {
        ...this.config[section],
        ...value,
      },
    };

    this.save(updated);
  }
}

// 导出单例
export const configManager = new ConfigManager();
