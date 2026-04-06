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
  return path.length > 0 && !path.includes('..')
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '')
}
