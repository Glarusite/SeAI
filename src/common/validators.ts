export function isBlank(value: string | null | undefined): value is undefined {
  return value == null || value.trim().length === 0;
}

export function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
