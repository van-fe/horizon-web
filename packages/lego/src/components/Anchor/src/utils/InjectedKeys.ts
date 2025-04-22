import type { InjectionKey } from 'vue';
import type { AnchorProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { AnchorContext } from '../Anchor';

export const AnchorPropsInjectedKey = Symbol(
  generatorInjectedKeyName('anchor', 'props'),
) as InjectionKey<AnchorProps>;

export const AnchorContextInjectedKey = Symbol(
  generatorInjectedKeyName('anchor', 'context'),
) as InjectionKey<AnchorContext>;
