import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { StepProps, StepsProps } from '../composables/useProps';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';

export interface StepInstance {
  /**
   * 子步骤元素唯一标识
   */
  uuid: string;
  /**
   * 子步骤元素 `props`
   */
  props: StepProps;
  /**
   * 设置子元素下标
   * @param index 下标
   */
  setIndex: (index: number) => void;
  /**
   * 获取当前子元素下标
   */
  getIndex: () => number;
}

export const NStepsPropsInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'props'),
) as InjectionKey<StepsProps>;

export const NStepsSizeInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'size'),
) as InjectionKey<ComputedRef<NApplicationSizeType>>;

export const NStepsItemsInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'items'),
) as InjectionKey<Ref<StepInstance[]>>;

export const NStepsCollectInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'collect step item'),
) as InjectionKey<
  (
    props: StepProps,
    uuid: string,
    setIndex: (index: number) => void,
    getIndex: () => number,
  ) => void
>;

export const NStepsRemoveInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'remove step item'),
) as InjectionKey<(props: StepProps, uuid: string) => void>;

export const NStepsActiveIndexInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'active index'),
) as InjectionKey<Ref<number>>;

export const NStepsOnClickStepInjectKey = Symbol(
  generatorInjectedKeyName('steps', 'on click step'),
) as InjectionKey<(index: number) => void>;
