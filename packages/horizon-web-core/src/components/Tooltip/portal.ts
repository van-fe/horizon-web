export type PortalTarget =
  | string
  | Element
  | null
  | undefined
  | (() => string | Element | null | undefined);

export function resolvePortalContainer(
  target: PortalTarget = 'body',
  ownerDocument: Document | null | undefined = typeof document === 'undefined' ? undefined : document,
): Element | undefined {
  if (!ownerDocument) return undefined;
  const resolved = typeof target === 'function' ? target() : target;
  if (!resolved) return ownerDocument.body;
  if (typeof resolved === 'string') return ownerDocument.querySelector(resolved) ?? undefined;
  return resolved;
}
