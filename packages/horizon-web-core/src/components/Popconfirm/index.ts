export type PopconfirmAction = 'cancel' | 'confirm';

/** 查找确认浮层中的操作按钮。 @en Finds an action button within a confirmation dialog. */
export function getPopconfirmAction(
  dialog: ParentNode,
  action: PopconfirmAction,
): HTMLButtonElement | null {
  return dialog.querySelector<HTMLButtonElement>(`[data-popconfirm-action="${action}"]`);
}

/** 聚焦首选操作；缺失时回退到另一个可用操作。 @en Focuses the preferred action with an enabled fallback. */
export function focusPopconfirmAction(
  dialog: ParentNode,
  preferred: PopconfirmAction = 'cancel',
): HTMLButtonElement | null {
  const fallback: PopconfirmAction = preferred === 'cancel' ? 'confirm' : 'cancel';
  const target = [preferred, fallback]
    .map(action => getPopconfirmAction(dialog, action))
    .find(button => button && !button.disabled);
  target?.focus();
  return target ?? null;
}
