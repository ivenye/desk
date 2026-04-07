import EventEmitter from 'eventemitter3';
import type { PluginEvents } from '@/plugin-sdk/types';

/**
 * 全局事件总线
 */
class EventBus extends EventEmitter<PluginEvents> {
  private static instance: EventBus;

  private constructor() {
    super();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
}

export const eventBus = EventBus.getInstance();
