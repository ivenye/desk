export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateFilePath(path: string): boolean {
  if (!path || path.length === 0) return false

  // Normalize path separators
  const normalized = path.replace(/\\/g, '/')

  // Block path traversal attempts
  if (normalized.includes('..') || normalized.includes('./')) return false

  // Block absolute paths outside allowed directories
  if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) return false

  // Block special characters that could be dangerous
  if (/[<>:"|?*\x00-\x1f]/.test(normalized)) return false

  return true
}

export function sanitizeInput(input: string): string {
  // Remove HTML tags and dangerous characters
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}
