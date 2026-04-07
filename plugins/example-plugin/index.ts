import { definePlugin } from '@/plugin-sdk';
import { z } from 'zod';

export default definePlugin({
  id: 'example-plugin',
  name: 'Example Plugin',
  description: 'A simple example plugin demonstrating Desk plugin system',
  kind: 'tool',

  // 配置模式
  configSchema: z.object({
    apiKey: z.string().optional(),
    enabled: z.boolean().default(true),
    maxRetries: z.number().int().min(0).max(10).default(3),
  }),

  // 注册函数
  register: async (api) => {
    api.logger.info('Example plugin is registering...');

    // 获取配置
    const config = api.getConfig<{
      apiKey?: string;
      enabled: boolean;
      maxRetries: number;
    }>();

    if (!config.enabled) {
      api.logger.warn('Plugin is disabled');
      return;
    }

    api.logger.info(`Plugin config: maxRetries=${config.maxRetries}`);

    // 注册一个工具
    api.registerTool({
      name: 'example_tool',
      description: 'An example tool that processes messages',
      inputSchema: z.object({
        message: z.string().min(1, 'Message is required'),
        uppercase: z.boolean().optional().default(false),
      }),
      execute: async (input, context) => {
        const { message, uppercase } = input as {
          message: string;
          uppercase: boolean;
        };

        context.logger.info(`Executing with message: ${message}`);

        const result = uppercase ? message.toUpperCase() : message;

        return {
          success: true,
          result: `Processed: ${result}`,
          timestamp: new Date().toISOString(),
        };
      },
    });

    // 注册一个命令
    api.registerCommand({
      id: 'example-command',
      name: 'Example Command',
      description: 'Run example command',
      category: 'examples',
      icon: 'star',
      execute: async (args, context) => {
        context.logger.info('Example command executed');

        return {
          message: 'Hello from example plugin!',
          pluginId: api.pluginId,
          timestamp: new Date().toISOString(),
        };
      },
    });

    // 监听事件
    api.events.on('config:updated', (pluginId, newConfig) => {
      if (pluginId === api.pluginId) {
        api.logger.info('Config was updated:', newConfig);
      }
    });

    api.logger.info('Example plugin registered successfully');
  },

  // 卸载函数
  unregister: async (api) => {
    api.logger.info('Example plugin is unregistering...');
    // 清理资源
    api.logger.info('Example plugin unregistered');
  },
});
