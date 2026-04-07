# 🚀 Phase 3: 状态管理优化 - 实施计划

## 📋 概述

Phase 3 将优化 Desk 的状态管理系统，建立统一的根状态 Store，实现状态持久化和中间件支持。

---

## 🎯 目标

### 核心功能
1. **根状态 Store** - 统一管理所有应用状态
2. **状态持久化** - 保存状态到本地存储
3. **状态中间件** - 日志、调试、时间旅行
4. **状态同步** - 跨组件状态同步
5. **状态选择器** - 优化性能的状态选择

### 借鉴最佳实践
- Zustand 中间件模式
- Redux DevTools 集成
- 状态持久化策略
- 性能优化技巧

---

## 📁 将要创建的文件

### 状态管理核心 (src/store/)
```
src/store/
├── index.ts              # 根 Store 导出
├── rootStore.ts          # 根状态定义
├── middleware/           # 中间件
│   ├── logger.ts         # 日志中间件
│   ├── persist.ts        # 持久化中间件
│   ├── devtools.ts       # 开发工具中间件
│   └── index.ts          # 导出所有中间件
├── slices/               # 状态切片
│   ├── app.ts            # 应用状态
│   ├── editor.ts         # 编辑器状态
│   ├── terminal.ts       # 终端状态
│   ├── plugin.ts         # 插件状态
│   ├── command.ts        # 命令状态
│   └── index.ts          # 导出所有切片
└── selectors/            # 状态选择器
    ├── app.ts            # 应用选择器
    ├── editor.ts         # 编辑器选择器
    └── index.ts          # 导出所有选择器
```

### 类型定义 (src/types/)
```
src/types/
└── store.ts              # Store 类型定义
```

---

## 🏗️ 架构设计

### 根状态结构

```typescript
interface RootState {
  // 应用状态
  app: {
    currentView: View;
    sidebarVisible: boolean;
    theme: 'light' | 'dark';
    settings: AppSettings;
  };

  // 编辑器状态
  editor: {
    openFiles: File[];
    activeFile: string | null;
    unsavedChanges: Set<string>;
  };

  // 终端状态
  terminal: {
    sessions: TerminalSession[];
    activeSession: string | null;
  };

  // 插件状态
  plugins: {
    loaded: Map<string, LoadedPlugin>;
    loading: Set<string>;
    errors: Map<string, Error>;
  };

  // 命令状态
  commands: {
    isPaletteOpen: boolean;
    recentCommands: CommandHistoryEntry[];
    executingCommand: string | null;
  };
}
```

### 中间件架构

```
Action → Logger → Persist → DevTools → Reducer → State
```

### 状态持久化策略

```typescript
// 持久化配置
const persistConfig = {
  name: 'desk-state',
  storage: localStorage,
  partialize: (state) => ({
    app: {
      theme: state.app.theme,
      settings: state.app.settings,
    },
    editor: {
      openFiles: state.editor.openFiles,
    },
    commands: {
      recentCommands: state.commands.recentCommands,
    },
  }),
};
```

---

## 📝 实施步骤

### Step 1: 创建类型定义 (15 分钟)
- RootState 接口
- 各个切片的状态类型
- Action 类型定义

### Step 2: 创建状态切片 (60 分钟)
- app 切片
- editor 切片
- terminal 切片
- plugin 切片（整合现有 pluginStore）
- command 切片（整合现有 commandStore）

### Step 3: 创建根 Store (30 分钟)
- 组合所有切片
- 配置中间件
- 导出 hooks

### Step 4: 实现日志中间件 (20 分钟)
- 记录状态变化
- 格式化输出
- 条件启用

### Step 5: 实现持久化中间件 (30 分钟)
- 状态序列化
- 本地存储
- 状态恢复
- 版本管理

### Step 6: 实现 DevTools 中间件 (20 分钟)
- Redux DevTools 集成
- 时间旅行调试
- 状态快照

### Step 7: 创建状态选择器 (30 分钟)
- 性能优化的选择器
- 派生状态计算
- Memoization

### Step 8: 迁移现有 Store (45 分钟)
- 迁移 appStore
- 迁移 editorStore
- 迁移 pluginStore
- 迁移 commandStore
- 更新组件引用

### Step 9: 集成到应用 (30 分钟)
- 更新 App.tsx
- 更新所有组件
- 测试状态同步

---

## 🎨 使用示例

### 使用根 Store

```typescript
import { useStore } from '@/store';

function MyComponent() {
  // 使用选择器获取状态
  const theme = useStore(state => state.app.theme);
  const openFiles = useStore(state => state.editor.openFiles);
  
  // 使用 actions
  const { setTheme } = useStore();
  
  return (
    <div>
      <button onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
    </div>
  );
}
```

### 使用选择器

```typescript
import { useStore } from '@/store';
import { selectActiveFile, selectUnsavedFiles } from '@/store/selectors';

function EditorComponent() {
  const activeFile = useStore(selectActiveFile);
  const unsavedFiles = useStore(selectUnsavedFiles);
  
  return (
    <div>
      <p>Active: {activeFile?.name}</p>
      <p>Unsaved: {unsavedFiles.length}</p>
    </div>
  );
}
```

### 持久化状态

```typescript
// 状态自动保存到 localStorage
// 应用重启后自动恢复

// 手动清除持久化状态
import { clearPersistedState } from '@/store';
clearPersistedState();
```

---

## 📊 预期收益

### 性能优化
- ✅ 减少不必要的重渲染
- ✅ 优化的状态选择
- ✅ 批量状态更新

### 开发体验
- ✅ 统一的状态管理
- ✅ 类型安全
- ✅ 时间旅行调试
- ✅ 状态日志

### 用户体验
- ✅ 状态持久化
- ✅ 快速恢复
- ✅ 更流畅的交互

---

## 🔄 与 Phase 1-2 的集成

### 插件状态整合

```typescript
// 将 pluginStore 整合到根 Store
const rootStore = create<RootState>((set, get) => ({
  plugins: {
    loaded: new Map(),
    loading: new Set(),
    errors: new Map(),
    
    loadPlugin: async (path: string) => {
      // 使用统一的状态更新
      set(state => ({
        plugins: {
          ...state.plugins,
          loading: new Set([...state.plugins.loading, path]),
        },
      }));
    },
  },
}));
```

### 命令状态整合

```typescript
// 将 commandStore 整合到根 Store
const rootStore = create<RootState>((set, get) => ({
  commands: {
    isPaletteOpen: false,
    recentCommands: [],
    
    openPalette: () => {
      set(state => ({
        commands: {
          ...state.commands,
          isPaletteOpen: true,
        },
      }));
    },
  },
}));
```

---

## ⏱️ 预计时间

- **类型定义**: 15 分钟
- **状态切片**: 60 分钟
- **根 Store**: 30 分钟
- **中间件**: 70 分钟
- **选择器**: 30 分钟
- **迁移**: 45 分钟
- **集成**: 30 分钟
- **总计**: 约 4.5 小时

---

## 📚 技术栈

- **Zustand** - 状态管理库
- **Immer** - 不可变状态更新
- **Zustand Middleware** - 中间件支持
- **localStorage** - 状态持久化

---

## ✅ 完成标准

- [ ] 根 Store 创建完成
- [ ] 所有状态切片实现
- [ ] 日志中间件实现
- [ ] 持久化中间件实现
- [ ] DevTools 中间件实现
- [ ] 状态选择器实现
- [ ] 现有 Store 迁移完成
- [ ] 所有组件更新完成
- [ ] 状态持久化工作正常
- [ ] 文档完成

---

**准备好了吗？** 让我开始实施 Phase 3！🚀
