import type { ComputedRef, InjectionKey, SetupContext } from 'vue';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import type { UploadV2Props } from '../composables/useProps';
import type UploadFileHelper from './UploadFileHelper';
import type { UploadV2Slots } from '../composables/useSlots';
import type { UploadV2Emits } from '../composables/useEmits';
import type { NUploadV2FileType } from './fileDefines';

export const NUploadV2PropsInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'props'),
) as InjectionKey<UploadV2Props | undefined>;

export const NUploadV2EmitsInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'emits'),
) as InjectionKey<SetupContext<UploadV2Emits>['emit']>;

export const NUploadV2SlotsInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'slots'),
) as InjectionKey<SetupContext<{}, UploadV2Slots>['slots']>;

export const NUploadV2SizeInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'size'),
) as InjectionKey<ComputedRef<Exclude<UploadV2Props['size'], undefined>>>;

export const NUploadV2UploadFileHelperInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'upload file helper'),
) as InjectionKey<UploadFileHelper>;

export const NUploadV2OpenViewerInjectKey = Symbol(
  generatorInjectedKeyName('upload-v2', 'open viewer'),
) as InjectionKey<(file: NUploadV2FileType) => void>;
