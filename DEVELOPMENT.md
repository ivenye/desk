# OpenClaw Studio - Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust 1.77+ and Cargo

### Installation

```bash
# Clone the repository
git clone https://github.com/openclaw/openclaw-studio.git
cd openclaw-studio

# Install dependencies
npm install

# Start development server
npm run tauri:dev
```

## Project Structure

```
openclaw-studio/
├── src/                    # React frontend
│   ├── components/         # UI components
│   │   ├── layout/        # Layout components
│   │   ├── code-editor/   # Code editor components
│   │   ├── terminal/      # Terminal components
│   │   ├── agent/         # Agent management
│   │   ├── session/       # Session management
│   │   ├── memory/        # Memory browser
│   │   └── workflow/      # Workflow editor
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand state stores
│   ├── services/          # API clients
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── src-tauri/             # Rust backend
│   └── src/
│       ├── main.rs        # Entry point
│       ├── commands.rs    # Tauri commands
│       ├── openclaw/      # OpenClaw API client
│       └── state.rs       # Application state
└── public/                # Static assets
```

## Development Workflow

### Running in Development Mode

```bash
npm run tauri:dev
```

This will:
1. Start Vite dev server on port 1420
2. Launch Tauri window with hot reload
3. Enable React DevTools

### Building for Production

```bash
npm run tauri:build
```

Output locations:
- Windows: `src-tauri/target/release/bundle/msi/`
- macOS: `src-tauri/target/release/bundle/dmg/`
- Linux: `src-tauri/target/release/bundle/appimage/`

## Adding New Features

### 1. Create a New Component

```tsx
// src/components/my-feature/MyFeature.tsx
export function MyFeature() {
  return <div>My Feature</div>
}
```

### 2. Add Tauri Command (if needed)

```rust
// src-tauri/src/commands.rs
#[tauri::command]
pub async fn my_command(param: String) -> Result<String, String> {
    Ok(format!("Received: {}", param))
}
```

Register in `main.rs`:
```rust
.invoke_handler(tauri::generate_handler![
    my_command,
    // ... other commands
])
```

### 3. Create API Hook

```typescript
// src/hooks/useMyFeature.ts
export function useMyFeature() {
  return useMutation({
    mutationFn: (param: string) => invoke('my_command', { param }),
  })
}
```

## State Management

We use Zustand for state management:

```typescript
// src/stores/myStore.ts
import { create } from 'zustand'

interface MyState {
  value: string
  setValue: (value: string) => void
}

export const useMyStore = create<MyState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}))
```

## Styling

We use Tailwind CSS with shadcn/ui components:

```tsx
<div className="flex items-center space-x-2 p-4 bg-card rounded-lg">
  <Button variant="default">Click me</Button>
</div>
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Debugging

### Frontend Debugging

1. Open DevTools in Tauri window (Ctrl+Shift+I)
2. Use React DevTools extension
3. Check console for errors

### Backend Debugging

1. Add `println!` statements in Rust code
2. Check terminal output
3. Use `RUST_LOG=debug` for verbose logging

## Common Issues

### Port Already in Use

If port 1420 is taken:
```bash
# Change port in vite.config.ts
server: {
  port: 1421,
}
```

### Tauri Build Fails

1. Check Rust version: `rustc --version`
2. Update dependencies: `cargo update`
3. Clean build: `cargo clean`

### Hot Reload Not Working

1. Restart dev server
2. Clear browser cache
3. Check file watchers limit (Linux)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## Resources

- [Tauri Documentation](https://tauri.app/v1/guides/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenClaw Docs](https://docs.openclaw.ai/)
