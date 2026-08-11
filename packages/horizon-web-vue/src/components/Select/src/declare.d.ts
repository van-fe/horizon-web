import type { SelectCollectedOptionData } from './utils/injectKeys';

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    selectOptionData: SelectCollectedOptionData<'option'>;
  }
}
