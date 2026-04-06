#!/bin/bash

echo "📦 Building OpenClaw Studio for Production"
echo ""

# Check prerequisites
if ! command -v node &> /dev/null || ! command -v cargo &> /dev/null; then
    echo "❌ Missing prerequisites. Please install Node.js and Rust."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Build Tauri app
echo "🦀 Building Tauri application..."
npm run tauri:build

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 Output locations:"
echo "   Windows: src-tauri/target/release/bundle/msi/"
echo "   macOS:   src-tauri/target/release/bundle/dmg/"
echo "   Linux:   src-tauri/target/release/bundle/appimage/"
