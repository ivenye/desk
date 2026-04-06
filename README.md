# Desk

AI-powered desktop environment combining Claude Code architecture with OpenClaw capabilities.

## Features

- 🎨 **Code Editor** - Monaco Editor with syntax highlighting
- 💻 **Terminal** - Integrated xterm.js terminal
- 🤖 **Agent Management** - Visual agent orchestration
- 📊 **Session Manager** - Real-time session monitoring
- 🧠 **Memory Browser** - Search and edit MEMORY.md
- 🔄 **Workflow Editor** - Drag-and-drop agent workflows

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Monaco Editor + xterm.js
- React Flow

**Backend:**
- Tauri 2.0 (Rust)
- OpenClaw API integration

## Quick Start

### Prerequisites

- Node.js 18+
- Rust 1.77+
- OpenClaw installed and running

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run tauri:dev

# Build for production
npm run tauri:build
```

## Project Structure

```
openclaw-studio/
├── src/                 # React frontend
│   ├── components/      # UI components
│   ├── hooks/          # Custom hooks
│   ├── stores/         # Zustand stores
│   └── services/       # API clients
├── src-tauri/          # Rust backend
│   └── src/
│       ├── commands.rs  # Tauri commands
│       └── openclaw/    # OpenClaw API
└── public/             # Static assets
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

## Documentation

See [DESIGN.md](./DESIGN.md) for detailed architecture and design decisions.

## License

MIT

## Contributing

Contributions welcome! Please read our contributing guidelines first.
