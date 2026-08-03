import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { GuideItemProps, GuideProps } from '../composables/useProps';

export interface HGuideCollectedItems {
  uuid: string;
  props: GuideItemProps;
  getIndex: () => number;
  setIndex: (index: number) => void;
}

export const HGuidePropsInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'props'),
) as InjectionKey<GuideProps>;

export const HGuideCollectItemInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'collect-item'),
) as InjectionKey<(item: HGuideCollectedItems) => void>;

export const HGuideRemoveItemInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'remove-item'),
) as InjectionKey<(uuid: string) => void>;

export const HGuideItemsInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'items'),
) as InjectionKey<HGuideCollectedItems[]>;

export const HGuideCurrentIndexInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'current-index'),
) as InjectionKey<Ref<number>>;

export const HGuideIsStartedInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'is-started'),
) as InjectionKey<Ref<boolean>>;

export const HGuideOnCloseInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'on-close'),
) as InjectionKey<() => void>;

export const HGuideOnFinishInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'on-finish'),
) as InjectionKey<() => void>;
