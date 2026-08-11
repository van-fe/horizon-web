import { inject, ref } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import { LocaleSupportLang } from '@aurora/locale';
import type { ApplicationProps } from './composables/useProps';

export type HApplicationContextOptions = Partial<{
  [K in keyof HApplicationContext]: HApplicationContext[K]['value'];
}>;

/**
 * 当前 Vue App 或最近 HApplication 提供的响应式配置。
 * @en Reactive configuration provided by the current Vue App or nearest HApplication.
 */
export interface HApplicationContext {
  /** 当前组件树声明的语言。 @en Locale declared for the current component tree. */
  readonly locale: Readonly<Ref<ApplicationProps['locale']>>;
  /** 当前组件树的默认组件尺寸。 @en Default component size for the current tree. */
  readonly size: Readonly<Ref<ApplicationProps['size']>>;
  /** 当前组件树声明的样式命名空间。 @en Style namespace declared for the current tree. */
  readonly namespace: Readonly<Ref<ApplicationProps['namespace']>>;
  /** 当前组件树的弹层容器解析器。 @en Popup container resolver for the current tree. */
  readonly getPopupContainer: Readonly<Ref<ApplicationProps['getPopupContainer']>>;
  /** 当前组件树的时区显示配置。 @en Time-zone display setting for the current tree. */
  readonly showTimeZone: Readonly<Ref<ApplicationProps['showTimeZone']>>;
}

/** Application 上下文的公共注入键。 @en Public injection key for Application context. */
export const HApplicationContextInjectedKey = Symbol.for(
  '[horizon-web-application] context',
) as InjectionKey<HApplicationContext>;

export function createHApplicationContext(
  options: HApplicationContextOptions = {},
): HApplicationContext {
  return {
    locale: ref<ApplicationProps['locale']>(options.locale ?? LocaleSupportLang.En),
    size: ref<ApplicationProps['size']>(options.size ?? 'medium'),
    namespace: ref<ApplicationProps['namespace']>(options.namespace),
    getPopupContainer: ref<ApplicationProps['getPopupContainer']>(options.getPopupContainer),
    showTimeZone: ref<ApplicationProps['showTimeZone']>(options.showTimeZone ?? false),
  };
}

/**
 * 读取当前组件树最近的 Application 上下文。
 * @en Read the nearest Application context from the current component tree.
 */
export function useHApplicationContext(): HApplicationContext | undefined {
  return inject(HApplicationContextInjectedKey, undefined);
}
