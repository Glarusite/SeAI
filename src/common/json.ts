export function safeJsonParse<T>(json: string | null, reviver?: (key: string, value: unknown) => unknown) {
  if (json) {
    try {
      return JSON.parse(json, reviver) as T;
    } catch {}
  }
}
