# 🚀 Phase 2: 命令系统重构 - 实施计划

## 📋 概述

Phase 2 将重构 Desk 的命令系统，借鉴 Claude Code 的命令注册表架构，提供统一的命令管理、快捷键支持和命令历史功能。

---

## 🎯 目标

### 核心功能
1. **命令注册表** - 统一管理所有命令
2. **命令面板 UI** - 快速搜索和执行命令
3. **快捷键支持** - 为命令绑定快捷键
4. **命令历史** - 记录和重放命令
5. **命令分类** - 按类别组织命令

### 借鉴 Claude Code
- 命令注册表模式
- 命令搜索和过滤
- 快捷键绑定系统
- 命令上下文管理

---

## 📁 将要创建的文件

### 核心系统 (src/commands/)
```
src/commands/
├── types.ts              # 命令类型定义
├── registry.ts           # 命令注册表
├── executor.ts           # 命令执行器
├── history.ts            # 命令历史
├── shortcuts.ts          # 快捷键管理
└── index.ts              # 导出文件
```

### UI 组件 (src/components/command/)
```
src/components/command/
├── CommandPalette.tsx    # 命令面板
├── CommandItem.tsx       # 命令项
├── CommandSearch.tsx     # 命令搜索
└── CommandHistory.tsx    # 命令历史
```

### 状态管理 (src/stores/)
```
src/stores/
└── commandStore.ts       # 命令状态
```

### 内置命令 (src/commands/builtin/)
```
src/commands/builtin/
├── file-commands.ts      # 文件操作命令
├── editor-commands.ts    # 编辑器命令
├── view-commands.ts      # 视图切换命令
├── plugin-commands.ts    # 插件管理命令
└── index.ts              # 导出所有内置命令
```

---

## 🏗️ 架构设计

### 命令注册表架构

```typescript
// 命令定义
interface Command {
  id: string;                    // 唯一标识
  name: string;                  // 显示名称
  description: string;           // 描述
  category: CommandCategory;     // 分类
  icon?: string;                 // 图标
  shortcut?: string;             // 快捷键
  when?: string;                 // 执行条件
  execute: (context: CommandContext) => Promise<void>;
}

// 命令注册表
class CommandRegistry {
  private commands: Map<string, Command>;
  
  register(command: Command): void;
  unregister(id: string): void;
  get(id: string): Command | undefined;
  getAll(): Command[];
  search(query: string): Command[];
  getByCategory(category: CommandCategory): Command[];
}
```

### 命令执行流程

```
用户触发 (快捷键/面板)
    ↓
CommandRegistry.get(id)
    ↓
检查执行条件 (when)
    ↓
CommandExecutor.execute()
    ↓
记录到历史 (CommandHistory)
    ↓
更新状态 (commandStore)
    ↓
返回结果
```

---

## 📝 实施步骤

### Step 1: 创建命令类型定义 (15 分钟)
- 定义 Command 接口
- 定义 CommandCategory 枚举
- 定义 CommandContext 接口
- 定义 CommandResult 类型

### Step 2: 实现命令注册表 (30 分钟)
- CommandRegistry 类
- 命令注册/注销
- 命令搜索和过滤
- 命令分类管理

### Step 3: 实现命令执行器 (20 分钟)
- CommandExecutor 类
- 执行条件检查
- 错误处理
- 结果返回

### Step 4: 实现命令历史 (20 分钟)
- CommandHistory 类
- 历史记录存储
- 历史查询
- 历史重放

### Step 5: 实现快捷键管理 (30 分钟)
- ShortcutManager 类
- 快捷键注册
- 快捷键监听
- 快捷键冲突检测

### Step 6: 创建命令状态管理 (15 分钟)
- commandStore (Zustand)
- 命令执行状态
- 命令历史状态
- 命令面板状态

### Step 7: 创建命令面板 UI (45 分钟)
- CommandPalette 组件
- 命令搜索
- 命令列表
- 快捷键显示

### Step 8: 实现内置命令 (60 分钟)
- 文件操作命令
- 编辑器命令
- 视图切换命令
- 插件管理命令

### Step 9: 集成到应用 (30 分钟)
- 在 App.tsx 中添加命令面板
- 注册全局快捷键 (Ctrl+Shift+P)
- 注册所有内置命令
- 测试命令系统

---

## 🎨 UI 设计

### 命令面板

```
┌─────────────────────────────────────────────────┐
│ 🔍 Search commands...                           │
├─────────────────────────────────────────────────┤
│ 📁 File: Open File                    Ctrl+O    │
│ 📝 Editor: Format Document            Ctrl+S+F  │
│ 👁️  View: Toggle Sidebar              Ctrl+B    │
│ 🧩 Plugins: Load Plugin                         │
│ 💻 Terminal: New Terminal             Ctrl+`    │
├─────────────────────────────────────────────────┤
│ ↑↓ Navigate  ⏎ Execute  Esc Close              │
└─────────────────────────────────────────────────┘
```

---

## 📊 预期收益

### 用户体验
- ✅ 快速访问所有功能
- ✅ 键盘优先的工作流
- ✅ 命令搜索和发现
- ✅ 一致的命令体验

### 开发体验
- ✅ 统一的命令注册
- ✅ 易于扩展
- ✅ 类型安全
- ✅ 插件可注册命令

### 架构改进
- ✅ 解耦命令和 UI
- ✅ 集中式命令管理
- ✅ 可测试性提升

---

## ⏱️ 预计时间

- **核心系统**: 2 小时
- **UI 组件**: 1 小时
- **内置命令**: 1 小时
- **集成测试**: 30 分钟
- **总计**: 约 4.5 小时

---

## 🔄 与 Phase 1 的集成

### 插件命令集成

```typescript
// 插件可以注册命令
api.registerCommand({
  id: 'my-plugin:do-something',
  name: 'Do Something',
  description: 'Does something cool',
  category: 'plugin',
  execute: async (context) => {
    // 命令逻辑
  }
});

// 命令会自动出现在命令面板中
```

---

## 📚 参考资源

- Claude Code 命令系统架构
- VS Code 命令面板设计
- Phase 1 插件系统 API

---

## ✅ 完成标准

- [ ] 命令注册表实现完成
- [ ] 命令执行器实现完成
- [ ] 命令历史实现完成
- [ ] 快捷键管理实现完成
- [ ] 命令面板 UI 完成
- [ ] 内置命令实现完成
- [ ] 与插件系统集成
- [ ] 全局快捷键工作正常
- [ ] 命令搜索工作正常
- [ ] 文档完成

---

**准备好了吗？** 让我开始实施 Phase 2！🚀
