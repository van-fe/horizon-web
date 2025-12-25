let namespace = 'H';

export function useNamespace() {
  return namespace;
}

export function useLowCaseNamespace() {
  return namespace.toLowerCase();
}

export function setNamespace(ns: string) {
  namespace = ns;
}
