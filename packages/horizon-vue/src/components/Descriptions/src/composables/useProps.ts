import {
  DESCRIPTION_ITEM_DEFAULTS,
  DESCRIPTIONS_DEFAULTS,
  isDescriptionGridSpan,
  isDescriptionLabelPosition,
  isDescriptionSize,
  isDescriptionType,
} from '@aurora/core';
import type {
  DescriptionItemCommonProps,
  DescriptionLabelPosition,
  DescriptionSize,
  DescriptionsCommonProps,
  DescriptionType,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

const responsiveProps = {
  xs: { type: Number, validator: isDescriptionGridSpan },
  sm: { type: Number, validator: isDescriptionGridSpan },
  md: { type: Number, validator: isDescriptionGridSpan },
  lg: { type: Number, validator: isDescriptionGridSpan },
  xl: { type: Number, validator: isDescriptionGridSpan },
};

export const useDescriptionsProps = declarePropType({
  /** 标题。 @en Section title. */
  title: { type: String, default: DESCRIPTIONS_DEFAULTS.title },
  /** 是否显示边框。 @en Whether borders are displayed. */
  border: { type: Boolean, default: DESCRIPTIONS_DEFAULTS.border },
  /** 间距尺寸。 @en Spacing size. */
  size: { type: String as PropType<DescriptionSize>, validator: isDescriptionSize },
  /** 排列类型。 @en Layout direction. */
  type: {
    type: String as PropType<DescriptionType>,
    default: DESCRIPTIONS_DEFAULTS.type,
    validator: isDescriptionType,
  },
  /** 默认列数。 @en Default column count. */
  column: {
    type: Number,
    default: DESCRIPTIONS_DEFAULTS.column,
    validator: isDescriptionGridSpan,
  },
  /** 标签位置。 @en Label position. */
  labelPosition: {
    type: String as PropType<DescriptionLabelPosition>,
    default: DESCRIPTIONS_DEFAULTS.labelPosition,
    validator: isDescriptionLabelPosition,
  },
  ...responsiveProps,
  /** 标签附加类名。 @en Additional label class name. */
  labelClass: String,
  /** 值附加类名。 @en Additional value class name. */
  valueClass: String,
} satisfies Record<keyof DescriptionsCommonProps, unknown>);

export const useDescriptionItemProps = declarePropType({
  /** 标签文字。 @en Label text. */
  label: { type: String, default: DESCRIPTION_ITEM_DEFAULTS.label },
  /** 值文字。 @en Value text. */
  value: { type: String, default: DESCRIPTION_ITEM_DEFAULTS.value },
  /** 默认跨列数。 @en Default column span. */
  spanCol: {
    type: Number,
    default: DESCRIPTION_ITEM_DEFAULTS.spanCol,
    validator: isDescriptionGridSpan,
  },
  /** 跨行数。 @en Row span. */
  spanRow: {
    type: Number,
    default: DESCRIPTION_ITEM_DEFAULTS.spanRow,
    validator: isDescriptionGridSpan,
  },
  ...responsiveProps,
} satisfies Record<keyof DescriptionItemCommonProps, unknown>);

export type DescriptionsProps = ExtractPropTypes<typeof useDescriptionsProps>;
export type DescriptionItemProps = ExtractPropTypes<typeof useDescriptionItemProps>;
