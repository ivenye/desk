import EventEmitter from 'eventemitter3';
import type { PluginEvents } from '@/plugin-sdk/types';

/**
 * 全局事件总线
 */
class EventBus {
  private emitter: EventEmitter<PluginEvents>;
  private static instance: EventBus;

  private constructor() {
    this.emitter = new EventEmitter<PluginEvents>();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void {
    this.emitter.on(event, listener as any);
  }

  off<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void {
    this.emitter.off(event, listener as any);
  }

  emit<K extends keyof PluginEvents>(
    event: K,
    ...args: Parameters<PluginEvents[K]>
  ): void {
    this.emitter.emit(event, ...args);
  }

  once<K extends keyof PluginEvents>(event: K, listener: PluginEvents[K]): void {
    this.emitter.once(event, listener as any);
  }

  removeAllListeners(event?: keyof PluginEvents): void {
    this.emitter.removeAllListeners(event);
  }
}

export const eventBus = EventBus.getInstance();
