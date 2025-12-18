import type { InjectionKey, Ref, ComputedRef } from 'vue';
import { generatorInjectedKeyName } from '@aurora/shared';
import type { GroupedBasicToken } from '~/config/themes/Tokens';
import type { CurrentConfigType } from '~/components/Header/ThemeSetting/utils/oldTokenTransform';

export const sizeChangeInjectedKey = Symbol(
  generatorInjectedKeyName('doc', 'size-change'),
) as InjectionKey<(size: string) => void>;

export const themeDataInjectedKey = Symbol(
  generatorInjectedKeyName('doc', 'theme data'),
) as InjectionKey<Ref<CurrentConfigType>>;

export const groupedBasicTokenInjectedKey = Symbol(
  generatorInjectedKeyName('doc', 'grouped basic token'),
) as InjectionKey<ComputedRef<GroupedBasicToken[]>>;

export const padModeInjectedKey = Symbol(
  generatorInjectedKeyName('doc', 'pad mode'),
) as InjectionKey<Ref<boolean>>;

export const showTimeZoneInjectedKey = Symbol(
  generatorInjectedKeyName('doc', 'show timezone'),
) as InjectionKey<Ref<boolean>>;
