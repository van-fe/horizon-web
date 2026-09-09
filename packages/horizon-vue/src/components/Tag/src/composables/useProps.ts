import type { Component, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  TagCommonProps,
  TagGroupCommonProps,
  TagId,
  TagSize,
  TagVariant,
} from '@aurora/core';
import {
  isNonNegativeNumber,
  isTagSize,
  isTagVariant,
  tagApiContract,
  tagGroupApiContract,
  tagGroupManifest,
  tagManifest,
} from '@aurora/core';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import { createVuePropsFromManifest, type VuePropDefinitions } from '~/utils/componentManifest';
import { warn } from '~/utils/useLog';

type TagVueProps = AdaptComponentApiShape<
  TagCommonProps,
  { active: 'modelValue'; pure: 'isPure' },
  'id' | 'tooltip' | 'size' | 'variant',
  {
    id?: TagId;
    type?: TagVariant | 'hollow';
    size?: TagSize;
    icon?: Component | string;
    tooltip?: string | Partial<TooltipProps> | boolean;
    isCreateTag?: boolean;
    isEllipsis?: boolean;
    isInPopover?: boolean;
  }
>;

type TagGroupVueProps = AdaptComponentApiShape<
  TagGroupCommonProps,
  {},
  'size' | 'editable' | 'disabled' | 'minDisplayed',
  {
    size?: TagSize;
    editable?: boolean;
    disabled?: boolean;
    minDisplayed?: number;
    collapseTagProps?: Partial<TagProps>;
    createTagProps?: Partial<TagProps>;
    popperInnerClass?: string;
  }
>;

const commonTagProps = createVuePropsFromManifest(tagManifest.contract.props, tagApiContract, {
  rename: { active: 'modelValue', pure: 'isPure' },
  omit: ['active', 'id', 'tooltip', 'size', 'variant'],
}) as VuePropDefinitions<
  Omit<
    TagVueProps,
    | 'modelValue'
    | 'id'
    | 'tooltip'
    | 'size'
    | 'type'
    | 'icon'
    | 'isCreateTag'
    | 'isEllipsis'
    | 'isInPopover'
  >
>;

export const useTagProps = declarePropType({
  ...commonTagProps,
  /** 受控激活状态；未传时保持 undefined。 @en Controlled active state; remains undefined when omitted. */
  modelValue: { type: Boolean, default: undefined },
  /** 标签唯一标识符。 @en Tag identifier. */
  id: { type: [String, Number, Symbol] as PropType<TagId> },
  /** 视觉类型；`hollow` 只保留为被拒绝的历史输入。 @en Visual variant; `hollow` remains a rejected legacy input. */
  type: {
    type: String as PropType<TagVariant | 'hollow'>,
    default: '',
    validator(value: unknown): boolean {
      if (value === 'hollow') {
        warn(
          'tag',
          `Tag's prop (type) won't receive 'hollow' value. It will replaced with 'prop.plain'.`,
        );
      }
      return value === undefined || isTagVariant(value);
    },
  },
  /** 标签尺寸。 @en Tag size. */
  size: {
    type: String as PropType<TagSize>,
    validator(value: unknown): boolean {
      if (value === 'mini') {
        warn(
          'tag',
          `Tag's prop (size) won't receive 'mini' value. It will replaced with 'small' value.`,
        );
      }
      return isTagSize(value);
    },
  },
  /** 图标组件或图标名称。 @en Icon component or icon name. */
  icon: {
    type: [Object, String] as PropType<Component | string>,
    validator: (value: unknown) =>
      ['object', 'string'].includes(typeof value) || value === undefined,
  },
  /** Tooltip 文字、状态或 Vue Tooltip 参数。 @en Tooltip text, state, or Vue Tooltip options. */
  tooltip: {
    type: [String, Object, Boolean] as PropType<string | Partial<TooltipProps> | boolean>,
    default: undefined,
  },
  /** 内部创建标签标记。 @en Internal create-tag marker. */
  isCreateTag: { type: Boolean, default: false },
  /** 内部折叠摘要标记。 @en Internal collapsed-summary marker. */
  isEllipsis: { type: Boolean, default: false },
  /** 内部浮层渲染标记。 @en Internal floating-render marker. */
  isInPopover: { type: Boolean, default: false },
} satisfies ComponentRendererPropDefinitions<TagVueProps>);

const commonTagGroupProps = createVuePropsFromManifest(
  tagGroupManifest.contract.props,
  tagGroupApiContract,
  { omit: ['size', 'editable', 'disabled', 'minDisplayed'] },
) as VuePropDefinitions<
  Omit<
    TagGroupVueProps,
    | 'size'
    | 'editable'
    | 'disabled'
    | 'minDisplayed'
    | 'collapseTagProps'
    | 'createTagProps'
    | 'popperInnerClass'
  >
>;

export const useTagGroupProps = declarePropType({
  ...commonTagGroupProps,
  /** 组内尺寸。 @en Grouped tag size. */
  size: {
    type: String as PropType<TagSize>,
    validator(value: unknown): boolean {
      if (value === 'mini') {
        warn(
          'tagGroup',
          `Tag's prop (size) won't receive 'mini' value. It will replaced with 'small' value.`,
        );
      }
      return isTagSize(value);
    },
  },
  /** 组内可编辑状态；未传时不覆盖子标签。 @en Group editable state; omitted values do not override child tags. */
  editable: { type: Boolean, default: undefined },
  /** 组内禁用状态；未传时不覆盖子标签。 @en Group disabled state; omitted values do not override child tags. */
  disabled: { type: Boolean, default: undefined },
  /** 折叠摘要 Tag 参数。 @en Collapsed-summary Tag props. */
  collapseTagProps: { type: Object as PropType<Partial<TagProps>> },
  /** 创建操作 Tag 参数。 @en Create-action Tag props. */
  createTagProps: { type: Object as PropType<Partial<TagProps>> },
  /** 最少展示的 Tag 个数。 @en Minimum visible Tag count. */
  minDisplayed: {
    type: Number,
    validator(value: unknown): boolean {
      if (typeof value !== 'number') {
        console.error('[horizon-web tag-group]: You must pass number value to minDisplayed.');
      } else if (value < 0) {
        console.error(
          `[horizon-web tag-group]: You can't pass number less than 0 to minDisplayed.`,
        );
      }
      return isNonNegativeNumber(value);
    },
  },
  /** 浮层内部 class。 @en Floating content class name. */
  popperInnerClass: { type: String },
} satisfies ComponentRendererPropDefinitions<TagGroupVueProps>);

export type TagProps = ExtractPropTypes<typeof useTagProps>;
export type TagGroupProps = ExtractPropTypes<typeof useTagGroupProps>;
