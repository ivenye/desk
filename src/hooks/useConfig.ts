import { useEffect, useState } from 'react';
import { configManager } from '@/config/manager';
import { eventBus } from '@/services/event-bus';
import type { DeskConfig } from '@/config/schema';

/**
 * 配置 Hook
 * 提供配置访问和更新功能
 */
export function useConfig() {
  const [config, setConfig] = useState<DeskConfig>(configManager.get());

  useEffect(() => {
    // 监听配置更新
    const handleConfigUpdate = (newConfig: DeskConfig) => {
      setConfig(newConfig);
    };

    eventBus.on('config:updated', handleConfigUpdate);

    return () => {
      eventBus.off('config:updated', handleConfigUpdate);
    };
  }, []);

  const updateConfig = (partial: Partial<DeskConfig>) => {
    configManager.update(partial);
  };

  const updateSection = <K extends keyof DeskConfig>(
    section: K,
    value: Partial<DeskConfig[K]>
  ) => {
    configManager.updateSection(section, value);
  };

  const resetConfig = () => {
    configManager.reset();
  };

  const exportConfig = () => {
    return configManager.export();
  };

  const importConfig = (json: string) => {
    configManager.import(json);
  };

  return {
    config,
    updateConfig,
    updateSection,
    resetConfig,
    exportConfig,
    importConfig,
  };
}

/**
 * 配置分区 Hook
 * 只订阅配置的某个部分
 */
export function useConfigSection<K extends keyof DeskConfig>(section: K) {
  const [value, setValue] = useState<DeskConfig[K]>(
    configManager.getSection(section)
  );

  useEffect(() => {
    const handleConfigUpdate = (newConfig: DeskConfig) => {
      setValue(newConfig[section]);
    };

    eventBus.on('config:updated', handleConfigUpdate);

    return () => {
      eventBus.off('config:updated', handleConfigUpdate);
    };
  }, [section]);

  const update = (newValue: Partial<DeskConfig[K]>) => {
    configManager.updateSection(section, newValue);
  };

  return [value, update] as const;
}
