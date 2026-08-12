export interface ScrollFormFieldOptions {
  /** 滚动行为。 @en Scroll behavior. */
  behavior?: ScrollBehavior;
  /** 垂直对齐位置。 @en Vertical alignment. */
  block?: ScrollLogicalPosition;
}

/** 将错误字段滚动到视口内。 @en Scrolls an invalid field into view. */
export function scrollFormFieldIntoView(
  element: Element | null | undefined,
  options: ScrollFormFieldOptions = {},
): boolean {
  if (!element || typeof element.scrollIntoView !== 'function') return false;
  element.scrollIntoView({
    behavior: options.behavior ?? 'smooth',
    ...(options.block === undefined ? {} : { block: options.block }),
  });
  return true;
}
