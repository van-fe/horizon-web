import type { ComputedRef, InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { UploadProps } from '../composables/useProps';
import type UploadFileHelper from './UploadFileHelper';
import type { UploadSlots } from '../composables/useSlots';
import type { UploadEmits } from '../composables/useEmits';
import type { NUploadFileType } from './fileDefines';

export const NUploadPropsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'props'),
) as InjectionKey<UploadProps | undefined>;

export const NUploadEmitsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'emits'),
) as InjectionKey<SetupContext<UploadEmits>['emit']>;

export const NUploadSlotsInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'slots'),
) as InjectionKey<SetupContext<{}, UploadSlots>['slots']>;

export const NUploadSizeInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'size'),
) as InjectionKey<ComputedRef<Exclude<UploadProps['size'], undefined>>>;

export const NUploadUploadFileHelperInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'upload file helper'),
) as InjectionKey<UploadFileHelper>;

export const NUploadOpenViewerInjectKey = Symbol(
  generatorInjectedKeyName('upload', 'open viewer'),
) as InjectionKey<(file: NUploadFileType) => void>;
