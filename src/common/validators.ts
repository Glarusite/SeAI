export function isBlank(value: string | null | undefined): value is undefined {
  return !value || value.trim().length === 0;
}

export function isNotEmail(email: string) {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isInvalidDate(date: Date) {
  return Number.isNaN(date.getTime());
}
