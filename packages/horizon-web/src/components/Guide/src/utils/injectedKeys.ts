import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';
import type { GuideItemProps, GuideProps } from '../composables/useProps';

export interface NGuideCollectedItems {
  uuid: string;
  props: GuideItemProps;
  getIndex: () => number;
  setIndex: (index: number) => void;
}

export const NGuidePropsInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'props'),
) as InjectionKey<GuideProps>;

export const NGuideCollectItemInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'collect-item'),
) as InjectionKey<(item: NGuideCollectedItems) => void>;

export const NGuideRemoveItemInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'remove-item'),
) as InjectionKey<(uuid: string) => void>;

export const NGuideItemsInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'items'),
) as InjectionKey<NGuideCollectedItems[]>;

export const NGuideCurrentIndexInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'current-index'),
) as InjectionKey<Ref<number>>;

export const NGuideIsStartedInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'is-started'),
) as InjectionKey<Ref<boolean>>;

export const NGuideOnCloseInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'on-close'),
) as InjectionKey<() => void>;

export const NGuideOnFinishInjectKey = Symbol(
  generatorInjectedKeyName('guide', 'on-finish'),
) as InjectionKey<() => void>;
