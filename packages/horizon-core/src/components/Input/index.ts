const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events:none !important;
`;

const SIZING_STYLE_PROPERTIES = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break',
  'white-space',
] as const;

export interface InputNodeStyling {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

export interface InputAutoSizeStyle {
  height: string;
  overflowY?: '' | 'hidden';
  resize: 'none';
  minHeight?: string;
  maxHeight?: string;
}

const computedStyleCache: Record<string, InputNodeStyling> = {};
let hiddenTextarea: HTMLTextAreaElement | undefined;

export function calculateInputNodeStyling(node: HTMLElement, useCache = false): InputNodeStyling {
  const nodeRef =
    node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');
  if (useCache && nodeRef && computedStyleCache[nodeRef]) return computedStyleCache[nodeRef];

  const style = window.getComputedStyle(node);
  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');
  const paddingSize =
    Number.parseFloat(style.getPropertyValue('padding-bottom')) +
    Number.parseFloat(style.getPropertyValue('padding-top'));
  const borderSize =
    Number.parseFloat(style.getPropertyValue('border-bottom-width')) +
    Number.parseFloat(style.getPropertyValue('border-top-width'));
  const sizingStyle = SIZING_STYLE_PROPERTIES.map(
    name => `${name}:${style.getPropertyValue(name)}`,
  ).join(';');
  const nodeInfo = { sizingStyle, paddingSize, borderSize, boxSizing };
  if (useCache && nodeRef) computedStyleCache[nodeRef] = nodeInfo;
  return nodeInfo;
}

export function calculateInputAutoSizeStyle(
  node: HTMLTextAreaElement,
  useCache = false,
  minRows: number | null | undefined = null,
  maxRows: number | null | undefined = null,
): InputAutoSizeStyle {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tabindex', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hiddenTextarea);
  }

  const wrap = node.getAttribute('wrap');
  if (wrap) hiddenTextarea.setAttribute('wrap', wrap);
  else hiddenTextarea.removeAttribute('wrap');

  const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateInputNodeStyling(
    node,
    useCache,
  );
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = node.value || node.placeholder || '';

  let height = hiddenTextarea.scrollHeight;
  if (boxSizing === 'border-box') height += borderSize;
  else if (boxSizing === 'content-box') height -= paddingSize;

  let minHeight: number | undefined;
  let maxHeight: number | undefined;
  let overflowY: '' | 'hidden' | undefined;
  if (minRows != null || maxRows != null) {
    hiddenTextarea.value = ' ';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows != null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') minHeight += paddingSize + borderSize;
      height = Math.max(minHeight, height);
    }
    if (maxRows != null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') maxHeight += paddingSize + borderSize;
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }

  return {
    height: `${height}px`,
    overflowY,
    resize: 'none',
    ...(minHeight === undefined ? {} : { minHeight: `${minHeight}px` }),
    ...(maxHeight === undefined ? {} : { maxHeight: `${maxHeight}px` }),
  };
}

export function focusInputElement(element: HTMLInputElement | HTMLTextAreaElement | null): void {
  element?.focus();
}

export function blurInputElement(element: HTMLInputElement | HTMLTextAreaElement | null): void {
  element?.blur();
}

export function selectInputElement(element: HTMLInputElement | HTMLTextAreaElement | null): void {
  element?.select();
}
