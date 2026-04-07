# Example Plugin

这是一个示例插件，展示了如何创建 Desk 插件。

## 功能

- ✅ 注册一个示例工具 (`example_tool`)
- ✅ 注册一个示例命令 (`example-command`)
- ✅ 展示配置管理
- ✅ 展示事件监听

## 配置

```json
{
  "apiKey": "optional-api-key",
  "enabled": true,
  "maxRetries": 3
}
```

### 配置选项

- `apiKey` (可选): API 密钥
- `enabled` (默认: true): 是否启用插件
- `maxRetries` (默认: 3): 最大重试次数 (0-10)

## 使用

### 加载插件

```typescript
import { pluginLoader } from '@/services/plugin-loader';

// 加载插件
await pluginLoader.loadPlugin('./plugins/example-plugin/index.ts');
```

### 使用工具

```typescript
import { pluginRegistry } from '@/services/plugin-registry';

const tool = pluginRegistry.getTool('example_tool');
if (tool) {
  const result = await tool.execute(
    { message: 'Hello', uppercase: true },
    { logger: console, config: {} }
  );
  console.log(result); // { success: true, result: "Processed: HELLO", ... }
}
```

### 执行命令

```typescript
import { pluginRegistry } from '@/services/plugin-registry';

const command = pluginRegistry.getCommand('example-command');
if (command) {
  const result = await command.execute(
    {},
    { logger: console, config: {} }
  );
  console.log(result); // { message: "Hello from example plugin!", ... }
}
```

## 开发

这个插件演示了以下最佳实践：

1. **类型安全**: 使用 Zod 验证配置和输入
2. **错误处理**: 检查配置状态
3. **日志记录**: 使用插件日志记录器
4. **事件监听**: 监听配置更新事件
5. **清理资源**: 实现 unregister 函数

## 扩展

你可以基于这个示例创建自己的插件：

1. 复制 `plugins/example-plugin` 目录
2. 修改 `package.json` 中的名称和描述
3. 更新 `index.ts` 中的插件定义
4. 实现你的工具、命令或服务
5. 测试插件功能

## 许可证

MIT
