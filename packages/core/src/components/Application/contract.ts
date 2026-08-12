import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const APPLICATION_SIZES = ['small', 'medium', 'large'] as const;
export const APPLICATION_TIME_ZONE_FEATURES = ['date-picker', 'timeline'] as const;

export type ApplicationSize = (typeof APPLICATION_SIZES)[number];
export type ApplicationTimeZoneFeature = (typeof APPLICATION_TIME_ZONE_FEATURES)[number];
export type ApplicationShowTimeZone = boolean | readonly ApplicationTimeZoneFeature[];

export interface ApplicationCommonProps<Locale = string> {
  /** 后代组件使用的语言。 @en Locale used by descendant components. */
  locale?: Locale;
  /** 后代组件的默认尺寸。 @en Default size for descendant components. */
  size?: ApplicationSize;
  /** 组件 CSS 命名空间。 @en Component CSS namespace. */
  namespace?: string;
  /** 需要显示时区的功能范围。 @en Features that should display time-zone information. */
  showTimeZone?: ApplicationShowTimeZone;
}

export type ApplicationEventMap = EmptyComponentApi;
export interface ApplicationRegionMap {
  /** 应用配置作用域内容。 @en Content within the application configuration scope. */
  content: EmptyComponentApi;
}
export type ApplicationCommandMap = EmptyComponentApi;

export const APPLICATION_DEFAULTS = Object.freeze({
  size: 'medium',
  showTimeZone: false,
} as const satisfies Partial<ApplicationCommonProps>);

export function isApplicationSize(value: unknown): value is ApplicationSize {
  return APPLICATION_SIZES.includes(value as ApplicationSize);
}

export function isApplicationShowTimeZone(value: unknown): value is ApplicationShowTimeZone {
  return (
    typeof value === 'boolean' ||
    (Array.isArray(value) &&
      value.every(item =>
        APPLICATION_TIME_ZONE_FEATURES.includes(item as ApplicationTimeZoneFeature),
      ))
  );
}

export const applicationApiContract = defineComponentApiContract<
  ApplicationCommonProps,
  ApplicationEventMap,
  ApplicationRegionMap,
  ApplicationCommandMap
>({
  defaults: APPLICATION_DEFAULTS,
  validators: {
    size: isApplicationSize,
    showTimeZone: isApplicationShowTimeZone,
  },
});
