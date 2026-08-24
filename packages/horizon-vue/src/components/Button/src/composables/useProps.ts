import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { declarePropType } from '@aurora/utils';
import {
  buttonApiContract,
  buttonGroupApiContract,
  buttonGroupManifest,
  buttonManifest,
} from '@aurora/core';
import type {
  AdaptComponentApiShape,
  ButtonCommonProps,
  ButtonGroupCommonProps,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import { createVuePropsFromManifest, type VuePropDefinitions } from '~/utils/componentManifest';

type ButtonVueCommonProps = AdaptComponentApiShape<
  ButtonCommonProps,
  { variant: 'type'; asyncAction: 'debounceFn'; asyncState: 'debounceType' }
>;

type ButtonVueProps = ButtonVueCommonProps & {
  autofocus?: boolean;
  icon?: Component | string;
  iconSize?: string | number;
  nativeType?: 'button' | 'submit' | 'reset';
  tag?: 'button' | 'div' | 'a';
  to?: RouteLocationRaw;
};

type ButtonGroupVueProps = AdaptComponentApiShape<ButtonGroupCommonProps, { variant: 'type' }>;

const commonButtonProps = createVuePropsFromManifest(
  buttonManifest.contract.props,
  buttonApiContract,
  {
    rename: {
      variant: 'type',
      asyncAction: 'debounceFn',
      asyncState: 'debounceType',
    },
    // ButtonGroup owns the effective size fallback, so the child renderer must preserve undefined.
    omitDefaults: ['size'],
  },
) as VuePropDefinitions<ButtonVueCommonProps>;

export const useButtonProps = declarePropType({
  ...commonButtonProps,
  /** 是否自动聚焦。 @en Whether the native element receives autofocus. */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /** 图标组件或图标名称。 @en Icon component or icon name. */
  icon: {
    type: [Object, String] as PropType<Component | string>,
    validator(value: unknown): boolean {
      return ['object', 'string'].includes(typeof value) && value !== null;
    },
  },
  /** 图标尺寸。 @en Icon size. */
  iconSize: {
    type: [String, Number],
  },
  /** 原生 button type。 @en Native button type. */
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  /** Vue renderer 使用的原生标签。 @en Native tag rendered by the Vue component. */
  tag: {
    type: String as PropType<'button' | 'div' | 'a'>,
    default: 'button',
  },
  /** Vue Router 路由目标。 @en Vue Router navigation target. */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
} satisfies ComponentRendererPropDefinitions<ButtonVueProps>);

export const useButtonGroupProps = declarePropType(
  createVuePropsFromManifest(buttonGroupManifest.contract.props, buttonGroupApiContract, {
    rename: { variant: 'type' },
  }) as VuePropDefinitions<ButtonGroupVueProps>,
);

export type ButtonProps = ExtractPropTypes<typeof useButtonProps>;
export type ButtonGroupProps = ExtractPropTypes<typeof useButtonGroupProps>;
