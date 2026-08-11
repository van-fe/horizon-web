export function jsonParse<T extends object = object>(json: string): T | undefined {
  try {
    return JSON.parse(json) as T;
  } catch {
    const runtime = globalThis as {
      console?: { warn(message: string): void };
    };
    runtime.console?.warn('Not a valid json string.');
    return undefined;
  }
}

export function jsonStringify(value: object): string {
  const ancestors = new WeakSet<object>();

  return JSON.stringify(value, (_key, currentValue: unknown) => {
    if (typeof currentValue !== 'object' || currentValue === null) return currentValue;
    if (ancestors.has(currentValue)) return '[Circular]';

    ancestors.add(currentValue);
    return currentValue;
  });
}
