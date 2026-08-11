export interface BreadcrumbMeasuredLayout {
  containerWidth: number;
  contentWidth: number;
  collapsibleItemWidths: readonly number[];
  ellipsisWidth: number;
}

export interface MeasureBreadcrumbLayoutOptions {
  itemSelector?: string;
  ellipsisSelector?: string;
}

function getOuterWidth(element: HTMLElement): number {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  const marginLeft = Number.parseFloat(style?.marginLeft ?? '0') || 0;
  const marginRight = Number.parseFloat(style?.marginRight ?? '0') || 0;
  return element.getBoundingClientRect().width + marginLeft + marginRight;
}

/** Reads an expanded breadcrumb DOM tree and returns renderer-neutral width inputs. */
export function measureBreadcrumbLayout(
  root: HTMLElement,
  {
    itemSelector = '[data-breadcrumb-item]',
    ellipsisSelector = '[data-breadcrumb-ellipsis-measure]',
  }: MeasureBreadcrumbLayoutOptions = {},
): BreadcrumbMeasuredLayout {
  const items = Array.from(root.children).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement && element.matches(itemSelector),
  );
  const ellipsis = Array.from(root.children).find(
    (element): element is HTMLElement =>
      element instanceof HTMLElement && element.matches(ellipsisSelector),
  );
  const itemWidths = items.map(getOuterWidth);

  return {
    containerWidth: root.clientWidth,
    contentWidth: itemWidths.reduce((total, width) => total + width, 0),
    collapsibleItemWidths: itemWidths.slice(1, -1),
    ellipsisWidth: ellipsis ? getOuterWidth(ellipsis) : 0,
  };
}
