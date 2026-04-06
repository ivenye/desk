# OpenClaw Studio - 设计文档

## 项目概述

OpenClaw Studio 是一个集成 AI 代码助手、可视化控制面板、多 Agent 协作的桌面应用，结合了 Claude Code 的终端 UI 架构和 OpenClaw 的强大能力。

## 核心特性

### 1. AI 代码助手
- **智能补全**：基于上下文的代码建议
- **代码审查**：自动检测潜在问题
- **重构建议**：优化代码结构
- **终端集成**：直接执行命令并预览结果

### 2. 可视化控制面板
- **Session 管理**：查看所有活跃会话
- **Agent 编排**：可视化创建和管理 sub-agents
- **实时日志**：流式查看执行日志
- **Memory 浏览**：搜索和编辑 MEMORY.md

### 3. 多 Agent 协作
- **工作流编辑器**：拖拽式设计 Agent 协作流程
- **消息路由**：Agent 间通信可视化
- **任务分发**：自动分配任务给最合适的 Agent
- **结果聚合**：汇总多个 Agent 的输出

### 4. 项目管理
- **文件浏览器**：树形结构查看项目文件
- **Git 集成**：查看 diff、提交历史
- **任务看板**：Kanban 风格的任务管理
- **快速搜索**：全局文件和内容搜索

## 技术架构

### 前端技术栈
```
React 18.3+          # UI 框架
TypeScript 5.4+      # 类型安全
Vite 5.2+            # 构建工具
Zustand 4.5+         # 状态管理
TanStack Query 5.0+  # 数据获取
shadcn/ui            # UI 组件库
Tailwind CSS 3.4+    # 样式
xterm.js 5.3+        # 终端模拟器
Monaco Editor 0.47+  # 代码编辑器
React Flow 11.11+    # 工作流可视化
```

### 后端技术栈
```
Tauri 2.0+           # 桌面框架
Rust 1.77+           # 系统语言
tokio 1.37+          # 异步运行时
serde 1.0+           # 序列化
reqwest 0.12+        # HTTP 客户端
```

### 通信协议
- **REST API**：基础 CRUD 操作
- **WebSocket**：实时日志流、状态更新
- **IPC**：Tauri 前后端通信

## 项目结构

```
openclaw-studio/
├── src-tauri/                    # Rust 后端
│   ├── src/
│   │   ├── main.rs              # 入口
│   │   ├── openclaw/
│   │   │   ├── mod.rs           # OpenClaw API 封装
│   │   │   ├── sessions.rs      # Session 管理
│   │   │   ├── agents.rs        # Agent 操作
│   │   │   ├── exec.rs          # 命令执行
│   │   │   └── memory.rs        # Memory 操作
│   │   ├── commands.rs          # Tauri 命令
│   │   └── state.rs             # 应用状态
│   ├── Cargo.toml
│   └── tauri.conf.json
│
├── src/                          # React 前端
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx    # 主布局
│   │   │   ├── Sidebar.tsx      # 侧边栏
│   │   │   └── Header.tsx       # 顶部栏
│   │   ├── code-editor/
│   │   │   ├── CodeEditor.tsx   # Monaco 编辑器
│   │   │   ├── FileTree.tsx     # 文件树
│   │   │   └── TabBar.tsx       # 标签页
│   │   ├── terminal/
│   │   │   ├── Terminal.tsx     # xterm.js 终端
│   │   │   └── CommandPalette.tsx
│   │   ├── agent/
│   │   │   ├── AgentPanel.tsx   # Agent 列表
│   │   │   ├── AgentCard.tsx    # Agent 卡片
│   │   │   └── AgentCreator.tsx # 创建 Agent
│   │   ├── session/
│   │   │   ├── SessionManager.tsx
│   │   │   ├── SessionList.tsx
│   │   │   └── SessionDetail.tsx
│   │   ├── workflow/
│   │   │   ├── WorkflowEditor.tsx  # React Flow 编辑器
│   │   │   ├── NodeTypes.tsx       # 自定义节点
│   │   │   └── EdgeTypes.tsx       # 自定义连线
│   │   ├── memory/
│   │   │   ├── MemoryBrowser.tsx
│   │   │   ├── MemorySearch.tsx
│   │   │   └── MemoryEditor.tsx
│   │   └── ui/                  # shadcn/ui 组件
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ...
│   │
│   ├── hooks/
│   │   ├── useOpenClaw.ts       # OpenClaw API hooks
│   │   ├── useTerminal.ts       # 终端状态
│   │   ├── useWorkflow.ts       # 工作流状态
│   │   └── useWebSocket.ts      # WebSocket 连接
│   │
│   ├── stores/
│   │   ├── appStore.ts          # 全局应用状态
│   │   ├── editorStore.ts       # 编辑器状态
│   │   ├── terminalStore.ts     # 终端状态
│   │   └── agentStore.ts        # Agent 状态
│   │
│   ├── services/
│   │   ├── openclaw-api.ts      # OpenClaw API 客户端
│   │   ├── tauri-commands.ts    # Tauri 命令封装
│   │   └── websocket.ts         # WebSocket 客户端
│   │
│   ├── types/
│   │   ├── openclaw.ts          # OpenClaw 类型定义
│   │   ├── workflow.ts          # 工作流类型
│   │   └── editor.ts            # 编辑器类型
│   │
│   ├── utils/
│   │   ├── format.ts            # 格式化工具
│   │   ├── validation.ts        # 验证工具
│   │   └── constants.ts         # 常量定义
│   │
│   ├── App.tsx                  # 根组件
│   ├── main.tsx                 # 入口文件
│   └── index.css                # 全局样式
│
├── public/                       # 静态资源
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── components.json              # shadcn/ui 配置
└── README.md
```

## 核心功能实现

### 1. OpenClaw API 集成

**Rust 后端封装**
```rust
// src-tauri/src/openclaw/mod.rs
pub struct OpenClawClient {
    base_url: String,
    gateway_token: Option<String>,
}

impl OpenClawClient {
    pub async fn list_sessions(&self) -> Result<Vec<Session>>;
    pub async fn spawn_agent(&self, task: &str) -> Result<AgentSpawn>;
    pub async fn exec_command(&self, cmd: &str) -> Result<ExecResult>;
    pub async fn search_memory(&self, query: &str) -> Result<Vec<MemoryResult>>;
}
```

**TypeScript 前端调用**
```typescript
// src/services/openclaw-api.ts
export class OpenClawAPI {
  async listSessions(): Promise<Session[]>;
  async spawnAgent(task: string): Promise<AgentSpawn>;
  async execCommand(cmd: string): Promise<ExecResult>;
  async searchMemory(query: string): Promise<MemoryResult[]>;
}
```

### 2. 工作流编辑器

使用 React Flow 实现拖拽式工作流设计：

```typescript
// src/components/workflow/WorkflowEditor.tsx
const nodeTypes = {
  agent: AgentNode,
  condition: ConditionNode,
  action: ActionNode,
  merge: MergeNode,
};

export function WorkflowEditor() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
    />
  );
}
```

### 3. 终端集成

使用 xterm.js 实现终端模拟器：

```typescript
// src/components/terminal/Terminal.tsx
export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm>();
  
  useEffect(() => {
    const term = new XTerm({
      theme: { background: '#1e1e1e' },
      fontSize: 14,
      fontFamily: 'JetBrains Mono',
    });
    
    term.open(terminalRef.current!);
    xtermRef.current = term;
    
    // 连接到 OpenClaw exec
    term.onData((data) => {
      invoke('exec_command', { input: data });
    });
  }, []);
  
  return <div ref={terminalRef} className="h-full" />;
}
```

### 4. 代码编辑器

使用 Monaco Editor：

```typescript
// src/components/code-editor/CodeEditor.tsx
export function CodeEditor({ file }: { file: string }) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  
  return (
    <MonacoEditor
      height="100%"
      language="typescript"
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
      }}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
}
```

## 安装与打包

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run tauri dev
```

### 生产打包
```bash
# 打包为可执行文件
npm run tauri build

# 输出：
# - Windows: .exe 安装包
# - macOS: .dmg 镜像
# - Linux: .AppImage / .deb
```

### 一键安装体验

**Windows**
```
openclaw-studio-setup.exe
```

**macOS**
```
openclaw-studio.dmg
```

**Linux**
```bash
chmod +x openclaw-studio.AppImage
./openclaw-studio.AppImage
```

## 性能优化

1. **虚拟滚动**：大文件列表使用 react-window
2. **代码分割**：按路由懒加载组件
3. **WebSocket 复用**：单一连接多路复用
4. **增量更新**：只更新变化的部分
5. **本地缓存**：Tauri 本地存储缓存数据

## 安全考虑

1. **沙箱隔离**：Tauri 默认沙箱保护
2. **权限控制**：最小权限原则
3. **输入验证**：所有用户输入严格验证
4. **安全通信**：HTTPS + WSS
5. **敏感数据**：本地加密存储

## 未来扩展

1. **插件系统**：支持第三方插件
2. **主题定制**：自定义 UI 主题
3. **快捷键**：全局快捷键支持
4. **多语言**：i18n 国际化
5. **云同步**：配置和工作流云端同步

## 开发路线图

### Phase 1: MVP (4-6 周)
- [x] 项目初始化
- [ ] 基础 UI 框架
- [ ] OpenClaw API 集成
- [ ] 终端组件
- [ ] 代码编辑器

### Phase 2: 核心功能 (6-8 周)
- [ ] Session 管理
- [ ] Agent 编排
- [ ] Memory 浏览
- [ ] 工作流编辑器

### Phase 3: 优化与打包 (4-6 周)
- [ ] 性能优化
- [ ] 测试覆盖
- [ ] 打包配置
- [ ] 文档完善

### Phase 4: 发布 (2-4 周)
- [ ] Beta 测试
- [ ] Bug 修复
- [ ] 正式发布
- [ ] 持续迭代
