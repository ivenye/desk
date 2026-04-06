#!/bin/bash

echo "🚀 Starting OpenClaw Studio Development Environment"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed. Please install Rust 1.77+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Rust version: $(rustc --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start development server
echo "🔥 Starting Tauri development server..."
echo "   Frontend: http://localhost:1420"
echo "   Press Ctrl+C to stop"
echo ""

npm run tauri:dev
