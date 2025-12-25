import type { ComputedRef, InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { UploadProps } from '../composables/useProps';
import type UploadFileHelper from './UploadFileHelper';
import type { UploadSlots } from '../composables/useSlots';
import type { UploadEmits } from '../composables/useEmits';
import type { HUploadFileType } from './fileDefines';

export const HUploadPropsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'props'),
) as InjectionKey<UploadProps | undefined>;

export const HUploadEmitsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'emits'),
) as InjectionKey<SetupContext<UploadEmits>['emit']>;

export const HUploadSlotsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'slots'),
) as InjectionKey<SetupContext<{}, UploadSlots>['slots']>;

export const HUploadSizeInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'size'),
) as InjectionKey<ComputedRef<Exclude<UploadProps['size'], undefined>>>;

export const HUploadUploadFileHelperInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'upload file helper'),
) as InjectionKey<UploadFileHelper>;

export const HUploadOpenViewerInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'open viewer'),
) as InjectionKey<(file: HUploadFileType) => void>;
