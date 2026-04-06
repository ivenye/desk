# Contributing to OpenClaw Studio

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/openclaw-studio.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test your changes: `./test.sh`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run tauri:dev

# Run tests
./test.sh
```

## Code Style

We use:
- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run linter:
```bash
npm run lint
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

Examples:
```
feat: add dark mode toggle
fix: resolve terminal input bug
docs: update installation guide
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

## Reporting Bugs

Use GitHub Issues with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

## Feature Requests

Open an issue with:
- Clear description
- Use case
- Proposed solution
- Alternative solutions considered

## Questions?

- Open a discussion on GitHub
- Join our Discord community
- Email: support@openclaw.ai

Thank you for contributing! 🙏
