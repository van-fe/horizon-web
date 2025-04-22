export function jsonParse<T extends object = object>(jsonStr: string): T | undefined {
  let json: T | undefined;

  try {
    json = JSON.parse(jsonStr);
  } catch (e) {
    console.warn('Not a valid json string.');
  }

  return json;
}

export function jsonStringify(obj: object): string {
  function getCircularReplacer() {
    const ancestors = new WeakSet();
    return function (key: string, value: unknown) {
      if (typeof value === 'object' && value !== null) {
        if (ancestors.has(value)) {
          return '[Circular]';
        }

        ancestors.add(value);
      }

      return value;
    };
  }

  return JSON.stringify(obj, getCircularReplacer());
}
