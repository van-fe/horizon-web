export const DEFAULT_NAMESPACE = 'H';

let namespace = DEFAULT_NAMESPACE;

export function useNamespace(): string {
  return namespace;
}

export function useLowCaseNamespace(): string {
  return namespace.toLowerCase();
}

export function setNamespace(value: string): void {
  namespace = value;
}

export function cssVariableKey(...segments: string[]): string {
  return ['-', useLowCaseNamespace(), ...segments].join('-');
}

export function cssVariable(...segments: string[]): string {
  return `var(${cssVariableKey(...segments)})`;
}
