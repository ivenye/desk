# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: security@openclaw.ai

Include:
- Type of vulnerability
- Full paths of affected files
- Location of the affected code
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

You should receive a response within 48 hours. If the issue is confirmed, we will:
1. Release a fix as soon as possible
2. Credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using OpenClaw Studio:

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables for secrets**
   - Never commit API keys or tokens
   - Use `.env` files (already in `.gitignore`)

3. **Validate user input**
   - All user input is sanitized
   - Use provided validation utilities

4. **Run with least privilege**
   - Don't run as root/administrator
   - Use Tauri's permission system

5. **Enable security features**
   - CSP (Content Security Policy) enabled
   - Sandbox isolation active
   - HTTPS for external requests

## Known Security Considerations

- **Local file access**: App can read/write local files (by design)
- **Command execution**: Terminal can execute system commands (sandboxed)
- **Network requests**: Can make HTTP requests to OpenClaw API

## Security Updates

Security updates will be released as patch versions (e.g., 0.1.1, 0.1.2).

Subscribe to releases to stay informed:
- Watch this repository
- Enable GitHub notifications
- Follow our security advisories

## Acknowledgments

We thank the security researchers who help keep OpenClaw Studio safe.

---

Last updated: 2026-04-06
