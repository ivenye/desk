# Desk

🚀 AI-powered desktop application with complete plugin system, command palette, and state management.

## ✨ Features

### Core Features
- 🎨 **Code Editor** - Monaco Editor with syntax highlighting
- 💻 **Terminal** - Integrated xterm.js terminal
- 🤖 **Agent Management** - Visual agent orchestration
- 📊 **Session Manager** - Real-time session monitoring
- 🧠 **Memory Browser** - Search and edit MEMORY.md
- 🔄 **Workflow Editor** - Drag-and-drop agent workflows

### New Features (Optimized)
- 🔌 **Plugin System** - 5 plugin types (Provider, Tool, Command, Panel, Service)
- ⌨️ **Command Palette** - Quick access to all commands (Ctrl+Shift+P)
- 🎨 **Theme System** - Light/Dark themes with CSS variables
- ⚙️ **Configuration Management** - Type-safe config with Zod validation
- 📦 **State Management** - Zustand with Redux DevTools integration
- 🎯 **UI Extension System** - Panel, component, and layout management

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Monaco Editor + xterm.js
- React Flow
- Zustand (State Management)
- Zod (Validation)

**Backend:**
- Tauri 2.0 (Rust)
- Standalone desktop application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Rust 1.77+ (for Tauri desktop app)

### Installation

```bash
# Clone the repository
git clone https://github.com/ivenye/desk.git
cd desk

# Install dependencies
npm install

# Install new dependencies for optimized features
npm install zod eventemitter3

# Run in development mode (Web)
npm run dev

# Or run Tauri desktop app
npm run tauri:dev

# Build for production
npm run tauri:build
```

### Quick Test (3 Steps)

1. **Start the app**: `npm run dev`
2. **Open command palette**: Press `Ctrl+Shift+P`
3. **Test plugins**: Click 🧩 icon in sidebar

See [快速测试-3步开始.md](./快速测试-3步开始.md) for detailed testing guide.

## 📁 Project Structure

```
desk/
├── src/
│   ├── plugin-sdk/          # Plugin SDK (Phase 1)
│   ├── commands/            # Command system (Phase 2)
│   ├── store/               # State management (Phase 3)
│   ├── config/              # Configuration system (Phase 4)
│   ├── ui/                  # UI extension system (Phase 5)
│   ├── themes/              # Theme definitions
│   ├── components/          # React components
│   ├── hooks/               # Custom hooks
│   ├── stores/              # Legacy Zustand stores
│   └── services/            # Core services
├── src-tauri/               # Rust backend
│   └── src/
│       ├── commands/        # Tauri commands
│       └── main.rs          # Entry point
├── plugins/                 # Plugin examples
│   └── example-plugin/      # Example plugin
└── docs/                    # Documentation
```

## Development

```bash
# Start dev server
npm run dev

# Run Tauri dev
npm run tauri:dev

# Lint
npm run lint

# Build
npm run build
```

## Building

### Windows
```bash
npm run tauri:build
# Output: src-tauri/target/release/bundle/msi/
```

### macOS
```bash
npm run tauri:build
# Output: src-tauri/target/release/bundle/dmg/
```

### Linux
```bash
npm run tauri:build
# Output: src-tauri/target/release/bundle/appimage/
```

## 📚 Documentation

- **[终极完成报告.md](./终极完成报告.md)** - Complete project summary
- **[完整测试指南.md](./完整测试指南.md)** - Comprehensive testing guide
- **[快速测试-3步开始.md](./快速测试-3步开始.md)** - Quick start testing
- **[DESIGN.md](./DESIGN.md)** - Architecture and design decisions
- **Phase Documents**: PHASE1-5 implementation guides

## 🎯 Key Features

### Plugin System (Phase 1)
- 5 plugin types: Provider, Tool, Command, Panel, Service
- Hot reload support
- Zod configuration validation
- Event-driven architecture

### Command System (Phase 2)
- Command palette (Ctrl+Shift+P)
- 20 built-in commands
- Keyboard shortcuts
- Command history

### State Management (Phase 3)
- Zustand root store
- 5 state slices
- Redux DevTools integration
- State persistence

### Configuration System (Phase 4)
- Type-safe configuration
- 4 config templates
- Settings panel UI
- Import/export support

### UI Extension System (Phase 5)
- Panel registry
- Component registry
- Theme manager (Light/Dark)
- Layout manager

## 📊 Statistics

- **Files**: 92 TypeScript/TSX files
- **Code**: ~4700+ lines
- **Docs**: 30 markdown files
- **Plugin Types**: 5
- **Commands**: 20
- **Themes**: 2

## 🏗️ Architecture

Built with modern best practices:
- 100% TypeScript
- Modular design
- Plugin-based architecture
- Type-safe with Zod validation
- Redux DevTools support
- Hot reload

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📄 License

MIT

## 🙏 Acknowledgments

This project was optimized by learning from:
- **OpenClaw** - Plugin system architecture
- **Claude Code** - Command palette and registry patterns
