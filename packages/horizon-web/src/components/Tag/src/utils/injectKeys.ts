import type { ComputedRef, InjectionKey } from 'vue';
import type { TagGroupProps, TagProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@aurora/utils';

export const HTagGroupPropsInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'props'),
) as InjectionKey<TagGroupProps>;

export const HTagGroupSizeInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'size'),
) as InjectionKey<ComputedRef<Exclude<TagGroupProps['size'], undefined>>>;

export const HTagGroupEditingNoticeInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'editing notice'),
) as InjectionKey<(uid: string, status: boolean) => void>;

export const HTagGroupEditCallbackInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'edit callback'),
) as InjectionKey<(newVal: string, oldVal: string, id: TagProps['id']) => Promise<void>>;

export const HTagGroupCloseCallbackInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'close callback'),
) as InjectionKey<(id: TagProps['id']) => Promise<void>>;

export const HTagGroupNoticeTagMountedInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'notice tag mounted'),
) as InjectionKey<(uid: string, props: TagProps) => void>;

export const HTagGroupNoticeTagUnmountedInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'notice tag unmounted'),
) as InjectionKey<(uid: string) => void>;

export const HTagGroupDoCollapseInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'do-collapse'),
) as InjectionKey<() => void>;
