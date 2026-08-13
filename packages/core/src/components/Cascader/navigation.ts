import type { CascaderNormalizedOption, CascaderOption } from './contract';

export type CascaderNavigationKey =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End'
  | 'Enter'
  | 'Escape';

export interface CascaderNavigationState {
  open: boolean;
  activeId?: number;
}

export type CascaderNavigationAction = 'none' | 'open' | 'close' | 'focus' | 'activate';

export interface CascaderNavigationResult {
  state: CascaderNavigationState;
  action: CascaderNavigationAction;
}

function navigable<Option extends CascaderOption<unknown>>(
  options: readonly CascaderNormalizedOption<Option>[],
  checkStrictly: boolean,
): CascaderNormalizedOption<Option>[] {
  return options.filter(
    option =>
      option.groupLabel === undefined &&
      !option.disabled &&
      (checkStrictly || !option.passingDisabled),
  );
}

/**
 * 计算单面板扁平结果（例如搜索结果）的键盘活动节点状态。
 * @en Reduces keyboard active-node state for a flat panel such as search results.
 * @param options 当前面板中的规范化选项。
 * @paramEn options Normalized options in the current panel.
 * @param state 当前导航状态。
 * @paramEn state Current navigation state.
 * @param key 键盘按键。
 * @paramEn key Keyboard key.
 * @param checkStrictly 是否忽略祖先禁用传递。
 * @paramEn checkStrictly Whether inherited disabled state is ignored.
 */
export function reduceCascaderFlatNavigation<Option extends CascaderOption<unknown>>(
  options: readonly CascaderNormalizedOption<Option>[],
  state: CascaderNavigationState,
  key: CascaderNavigationKey,
  checkStrictly = false,
): CascaderNavigationResult {
  if (key === 'Escape') return { state: { ...state, open: false }, action: 'close' };
  const candidates = navigable(options, checkStrictly);
  if (!state.open) {
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter') {
      const target = key === 'ArrowUp' ? candidates.at(-1) : candidates[0];
      return { state: { open: true, activeId: target?.id }, action: 'open' };
    }
    return { state, action: 'none' };
  }
  const activeIndex = candidates.findIndex(option => option.id === state.activeId);
  if (key === 'Enter') {
    return { state, action: activeIndex >= 0 ? 'activate' : 'none' };
  }
  let index = activeIndex;
  if (key === 'Home') index = 0;
  else if (key === 'End') index = candidates.length - 1;
  else if (key === 'ArrowUp') {
    index = activeIndex < 0 ? candidates.length - 1 : Math.max(0, activeIndex - 1);
  } else if (key === 'ArrowDown') {
    index = activeIndex < 0 ? 0 : Math.min(candidates.length - 1, activeIndex + 1);
  } else {
    return { state, action: 'none' };
  }
  const target = candidates[index];
  return target
    ? { state: { ...state, activeId: target.id }, action: 'focus' }
    : { state, action: 'none' };
}

/**
 * 计算多面板 Cascader 的键盘活动节点状态。
 * @en Reduces keyboard active-node state for a multi-panel Cascader.
 * @param roots 规范化根节点。
 * @paramEn roots Normalized root nodes.
 * @param state 当前导航状态。
 * @paramEn state Current navigation state.
 * @param key 键盘按键。
 * @paramEn key Keyboard key.
 * @param checkStrictly 是否忽略祖先禁用传递。
 * @paramEn checkStrictly Whether inherited disabled state is ignored.
 */
export function reduceCascaderNavigation<Option extends CascaderOption<unknown>>(
  roots: readonly CascaderNormalizedOption<Option>[],
  state: CascaderNavigationState,
  key: CascaderNavigationKey,
  checkStrictly = false,
): CascaderNavigationResult {
  if (key === 'Escape') return { state: { ...state, open: false }, action: 'close' };
  const all: CascaderNormalizedOption<Option>[] = [];
  const stack = roots.slice().reverse();
  while (stack.length) {
    const option = stack.pop()!;
    all.push(option);
    for (let index = option.children.length - 1; index >= 0; index--)
      stack.push(option.children[index]);
  }
  const active =
    state.activeId === undefined ? undefined : all.find(option => option.id === state.activeId);
  if (!state.open) {
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter') {
      const candidates = navigable(roots, checkStrictly);
      const target = key === 'ArrowUp' ? candidates.at(-1) : candidates[0];
      return { state: { open: true, activeId: target?.id }, action: 'open' };
    }
    return { state, action: 'none' };
  }
  if (key === 'Enter') return { state, action: active ? 'activate' : 'none' };
  if (key === 'ArrowRight') {
    const target = active ? navigable(active.children, checkStrictly)[0] : undefined;
    return target
      ? { state: { ...state, activeId: target.id }, action: 'focus' }
      : { state, action: 'none' };
  }
  if (key === 'ArrowLeft') {
    return active?.parent
      ? { state: { ...state, activeId: active.parent.id }, action: 'focus' }
      : { state, action: 'none' };
  }
  const siblings = navigable(active?.parent?.children ?? roots, checkStrictly);
  if (siblings.length === 0) return { state, action: 'none' };
  let index = active ? siblings.findIndex(option => option.id === active.id) : -1;
  if (key === 'Home') index = 0;
  else if (key === 'End') index = siblings.length - 1;
  else if (key === 'ArrowUp') index = index < 0 ? siblings.length - 1 : Math.max(0, index - 1);
  else if (key === 'ArrowDown') index = index < 0 ? 0 : Math.min(siblings.length - 1, index + 1);
  else return { state, action: 'none' };
  return { state: { ...state, activeId: siblings[index].id }, action: 'focus' };
}
