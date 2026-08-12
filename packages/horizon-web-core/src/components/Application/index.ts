export type ApplicationPopupContainerGetter = (
  triggerNode?: HTMLElement,
) => HTMLElement | null | undefined;

/** 解析应用级弹层容器，并在 getter 缺省或返回空值时回退 document.body。 @en Resolves the application popup container and falls back to document.body when absent. */
export function resolveApplicationPopupContainer(
  getter: ApplicationPopupContainerGetter | undefined,
  triggerNode: HTMLElement | undefined,
  document: Document,
): HTMLElement {
  return getter?.(triggerNode) ?? document.body;
}
