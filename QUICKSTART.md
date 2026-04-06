# Quick Start Guide

## Installation

### Step 1: Prerequisites

Make sure you have installed:
- Node.js 18+ ([Download](https://nodejs.org/))
- Rust 1.77+ ([Install](https://rustup.rs/))

Verify installation:
```bash
node --version  # Should be v18+
cargo --version # Should be 1.77+
```

### Step 2: Clone & Install

```bash
cd /home/openclaw/.openclaw/workspace/openclaw-studio
npm install
```

### Step 3: Run Development Server

```bash
# Option 1: Use script
./dev.sh

# Option 2: Use npm
npm run tauri:dev
```

The app will open automatically!

## First Steps

### 1. Explore the Interface

- **Left Sidebar**: Navigate between views
  - 📝 Editor - Code editing
  - 💻 Terminal - Command execution
  - 🤖 Agents - Agent management
  - 📊 Sessions - Session monitoring
  - 🧠 Memory - Memory browser
  - 🔄 Workflow - Visual workflows

### 2. Try the Code Editor

1. Click the **Editor** icon
2. Browse files in the file tree
3. Open a file by clicking
4. Edit and save (auto-save enabled)

### 3. Use the Terminal

1. Click the **Terminal** icon
2. Type commands (e.g., `ls`, `pwd`)
3. Press Enter to execute
4. Use Ctrl+C to cancel
5. Use Ctrl+L to clear

### 4. Create an Agent

1. Click the **Agents** icon
2. Click "New Agent" button
3. Describe the task
4. Click "Create"
5. Monitor agent status

### 5. Browse Memory

1. Click the **Memory** icon
2. Type search query
3. Press Enter
4. View results with scores

## Building for Production

```bash
# Build the app
npm run tauri:build

# Find output:
# Windows: src-tauri/target/release/bundle/msi/
# macOS:   src-tauri/target/release/bundle/dmg/
# Linux:   src-tauri/target/release/bundle/appimage/
```

## Troubleshooting

### Port Already in Use

Edit `vite.config.ts`:
```typescript
server: {
  port: 1421, // Change port
}
```

### Build Fails

```bash
# Clean and rebuild
rm -rf node_modules
npm install
cargo clean
npm run tauri:build
```

### Hot Reload Not Working

1. Restart dev server
2. Clear browser cache
3. Check file permissions

## Next Steps

- Read [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guide
- Check [DESIGN.md](./DESIGN.md) for architecture
- See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview

## Getting Help

- Check documentation in `/docs`
- Open an issue on GitHub
- Join our Discord community

---

**Happy coding with Desk!** 🚀
