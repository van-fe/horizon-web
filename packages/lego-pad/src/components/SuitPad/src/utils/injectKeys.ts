import { generatorInjectedKeyName } from '@aurora/utils';
import type { InjectionKey, Ref } from 'vue';

export const NSuitPadIsPadModeInjectKey = Symbol.for(
  generatorInjectedKeyName('is pad mode'),
) as InjectionKey<Ref<boolean>>;
