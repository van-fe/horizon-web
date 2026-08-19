export type LinkScrollTarget = string | Element;

export interface LinkAnchorScrollOptions {
  anchor: string;
  link: Element;
  target: LinkScrollTarget;
  offset?: number;
  behavior?: ScrollBehavior;
  updateHash?: boolean;
}

export function calculateLinkAnchorScrollTop(
  linkTop: number,
  targetTop: number,
  targetScrollTop: number,
  offset = 0,
): number {
  return linkTop - offset + targetScrollTop - targetTop;
}

export function resolveLinkScrollTarget(
  target: LinkScrollTarget,
  documentObject: Document | undefined = typeof document === 'undefined' ? undefined : document,
): Element | null {
  if (typeof target !== 'string') return target;
  return documentObject?.querySelector(target) ?? null;
}

export function scrollLinkAnchor({
  anchor,
  link,
  target,
  offset = 0,
  behavior = 'smooth',
  updateHash = true,
}: LinkAnchorScrollOptions): boolean {
  const scrollTarget = resolveLinkScrollTarget(target);
  if (!scrollTarget) return false;

  scrollTarget.scroll({
    top: calculateLinkAnchorScrollTop(
      link.getBoundingClientRect().top,
      scrollTarget.getBoundingClientRect().top,
      scrollTarget.scrollTop,
      offset,
    ),
    behavior,
  });

  if (updateHash && typeof window !== 'undefined') window.location.hash = `#${anchor}`;
  return true;
}
