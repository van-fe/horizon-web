import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const STEPS_DIRECTIONS = ['horizontal', 'vertical'] as const;
export const STEPS_LABEL_PLACEMENTS = ['horizontal', 'vertical'] as const;
export const STEPS_SIZES = ['medium', 'small'] as const;
export const STEPS_STATUSES = ['wait', 'process', 'finish', 'warning', 'error'] as const;
export const STEPS_LABEL_ALIGNS = ['center', 'left'] as const;

export type StepsDirection = (typeof STEPS_DIRECTIONS)[number];
export type StepsLabelPlacement = (typeof STEPS_LABEL_PLACEMENTS)[number];
export type StepsSize = (typeof STEPS_SIZES)[number];
export type StepsStatus = (typeof STEPS_STATUSES)[number];
export type StepsLabelAlign = (typeof STEPS_LABEL_ALIGNS)[number];
export type StepResolvedStatus = StepsStatus | 'disabled';

export interface StepCommonProps<Title = string, Subtitle = string, Description = string> {
  /** 步骤标题。 @en Step title. */
  title?: Title;
  /** 步骤副标题。 @en Step subtitle. */
  subtitle?: Subtitle;
  /** 步骤详情描述。 @en Step description. */
  description?: Description;
  /** 显式步骤索引，用于动态步骤。 @en Explicit step index used by dynamic steps. */
  index?: number;
  /** 是否覆盖父级可点击设置。 @en Whether this step overrides the parent clickability. */
  clickable?: boolean;
  /** 是否禁用步骤交互。 @en Whether step interaction is disabled. */
  disabled?: boolean;
}

export type StepsBeforeChange<Item = StepCommonProps> = (
  next: number,
  current: number,
  nextItem: Item | undefined,
  currentItem: Item | undefined,
) => boolean | PromiseLike<boolean>;

export interface StepsCommonProps<Item = StepCommonProps> {
  /** 当前步骤索引。 @en Current step index. */
  value?: number;
  /** 非受控模式的初始步骤索引。 @en Initial step index in uncontrolled mode. */
  defaultValue?: number;
  /** 步骤条方向。 @en Steps orientation. */
  direction?: StepsDirection;
  /** 标签相对节点的放置方式。 @en Label placement relative to the node. */
  labelPlacement?: StepsLabelPlacement;
  /** 组件尺寸。 @en Component size. */
  size?: StepsSize;
  /** 当前步骤状态。 @en Status of the current step. */
  status?: StepsStatus;
  /** 是否使用点状节点。 @en Whether dot nodes are used. */
  progressDot?: boolean;
  /** 是否允许步骤交互。 @en Whether steps are interactive. */
  clickable?: boolean;
  /** 点击后是否自动更新当前步骤。 @en Whether clicking automatically updates the current step. */
  controllable?: boolean;
  /** 自动索引的起始值。 @en Starting value for automatic indexes. */
  initial?: number;
  /** 水平布局中的标签对齐方式。 @en Label alignment in horizontal layouts. */
  labelAlign?: StepsLabelAlign;
  /** 切换步骤前的异步守卫。 @en Async guard invoked before changing steps. */
  beforeChange?: StepsBeforeChange<Item>;
}

export interface StepsEventMap {
  /** 当前步骤发生变化。 @en Current step changed. */
  change: [current: number];
}

export interface StepEventMap<Event = unknown> {
  /** 激活可交互步骤。 @en Interactive step activated. */
  click: [event: Event, index: number];
}

export interface StepsRegionMap {
  /** 步骤条目。 @en Step items. */
  content: EmptyComponentApi;
}

export interface StepRegionMap {
  /** 标题内容。 @en Title content. */
  title: EmptyComponentApi;
  /** 副标题内容。 @en Subtitle content. */
  subtitle: EmptyComponentApi;
  /** 描述内容。 @en Description content. */
  description: EmptyComponentApi;
  /** 节点图标内容。 @en Node icon content. */
  icon: EmptyComponentApi;
}

export interface StepsCommandMap {
  /** 聚焦首个或指定索引的可交互步骤。 @en Focuses the first or indexed interactive step. */
  focus: (index?: number) => void;
}

export type StepCommandMap = EmptyComponentApi;

export const STEPS_DEFAULTS = Object.freeze({
  defaultValue: 0,
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  size: 'medium',
  status: 'process',
  progressDot: false,
  clickable: false,
  controllable: true,
  initial: 0,
  labelAlign: 'center',
} as const satisfies Partial<StepsCommonProps>);

export const STEP_DEFAULTS = Object.freeze({
  title: '',
  description: '',
  disabled: false,
} as const satisfies Partial<StepCommonProps>);

export interface StepLayout {
  flex: string;
  maxHeight?: string;
  maxWidth?: string;
}

export type StepsSelectionResult =
  | { accepted: true; value: number; reason: 'change' }
  | {
      accepted: false;
      value: number;
      reason: 'disabled' | 'not-clickable' | 'not-controllable' | 'same';
    };

export function isStepsIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isStepsDirection(value: unknown): value is StepsDirection {
  return STEPS_DIRECTIONS.includes(value as StepsDirection);
}

export function isStepsLabelPlacement(value: unknown): value is StepsLabelPlacement {
  return STEPS_LABEL_PLACEMENTS.includes(value as StepsLabelPlacement);
}

export function isStepsSize(value: unknown): value is StepsSize {
  return STEPS_SIZES.includes(value as StepsSize);
}

export function isStepsStatus(value: unknown): value is StepsStatus {
  return STEPS_STATUSES.includes(value as StepsStatus);
}

export function isStepsLabelAlign(value: unknown): value is StepsLabelAlign {
  return STEPS_LABEL_ALIGNS.includes(value as StepsLabelAlign);
}

export function resolveStepIndexes(
  items: readonly Pick<StepCommonProps, 'index'>[],
  initial: number = STEPS_DEFAULTS.initial,
): number[] {
  let nextIndex = isStepsIndex(initial) ? initial : STEPS_DEFAULTS.initial;
  return items.map(item => {
    const index = isStepsIndex(item.index) ? item.index : nextIndex;
    nextIndex = index + 1;
    return index;
  });
}

export function isStepClickable(
  stepClickable: boolean | undefined,
  parentClickable: boolean,
  disabled = false,
): boolean {
  return !disabled && (stepClickable ?? parentClickable);
}

export function getStepStatus(
  index: number,
  activeIndex: number,
  activeStatus: StepsStatus,
  disabled = false,
): StepResolvedStatus {
  if (disabled) return 'disabled';
  if (activeIndex > index) return 'finish';
  if (activeIndex === index) return activeStatus;
  return 'wait';
}

export function getStepNextStatus(
  index: number,
  activeIndex: number,
  activeStatus: StepsStatus,
): StepsStatus {
  if (activeIndex > index + 1) return 'finish';
  if (activeIndex === index + 1) return activeStatus;
  return 'wait';
}

export function getStepLayout(
  position: number,
  itemCount: number,
  direction: StepsDirection,
  labelPlacement: StepsLabelPlacement,
  labelAlign: StepsLabelAlign,
  progressDot: boolean,
): StepLayout {
  const count = Math.max(1, Math.trunc(itemCount));
  if (labelAlign === 'center' && (labelPlacement === 'vertical' || progressDot)) {
    return { flex: `1 1 ${(1 / count) * 100}%` };
  }
  if (position < count - 1) {
    return { flex: `1 1 ${(1 / Math.max(1, count - 1)) * 100}%` };
  }
  const result: StepLayout = { flex: 'auto 0 0' };
  const maxSize = `${(1 / count) * 100}%`;
  if (direction === 'vertical') result.maxHeight = maxSize;
  else result.maxWidth = maxSize;
  return result;
}

export function getStepDisplayNumber(index: number): number {
  return index + 1;
}

export function resolveStepsSelection(
  current: number,
  next: number,
  options: { clickable: boolean; controllable: boolean; disabled?: boolean },
): StepsSelectionResult {
  if (options.disabled) return { accepted: false, value: current, reason: 'disabled' };
  if (!options.clickable) return { accepted: false, value: current, reason: 'not-clickable' };
  if (!options.controllable) return { accepted: false, value: current, reason: 'not-controllable' };
  if (current === next) return { accepted: false, value: current, reason: 'same' };
  return { accepted: true, value: next, reason: 'change' };
}

export async function resolveStepsBeforeChange<Item>(
  beforeChange: StepsBeforeChange<Item> | undefined,
  next: number,
  current: number,
  nextItem: Item | undefined,
  currentItem: Item | undefined,
): Promise<boolean> {
  if (!beforeChange) return true;
  try {
    return Boolean(await beforeChange(next, current, nextItem, currentItem));
  } catch {
    return false;
  }
}

export const stepsApiContract = defineComponentApiContract<
  StepsCommonProps,
  StepsEventMap,
  StepsRegionMap,
  StepsCommandMap
>({
  defaults: STEPS_DEFAULTS,
  validators: {
    value: isStepsIndex,
    defaultValue: isStepsIndex,
    direction: isStepsDirection,
    labelPlacement: isStepsLabelPlacement,
    size: isStepsSize,
    status: isStepsStatus,
    initial: isStepsIndex,
    labelAlign: isStepsLabelAlign,
  },
});

export const stepApiContract = defineComponentApiContract<
  StepCommonProps,
  StepEventMap,
  StepRegionMap,
  StepCommandMap
>({
  defaults: STEP_DEFAULTS,
  validators: { index: isStepsIndex },
});
