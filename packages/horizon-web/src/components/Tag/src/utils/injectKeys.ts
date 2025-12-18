import type { ComputedRef, InjectionKey } from 'vue';
import type { TagGroupProps, TagProps } from '../composables/useProps';
import { generatorInjectedKeyName } from '@aurora/utils';

export const NTagGroupPropsInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'props'),
) as InjectionKey<TagGroupProps>;

export const NTagGroupSizeInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'size'),
) as InjectionKey<ComputedRef<Exclude<TagGroupProps['size'], undefined>>>;

export const NTagGroupEditingNoticeInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'editing notice'),
) as InjectionKey<(uid: string, status: boolean) => void>;

export const NTagGroupEditCallbackInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'edit callback'),
) as InjectionKey<(newVal: string, oldVal: string, id: TagProps['id']) => Promise<void>>;

export const NTagGroupCloseCallbackInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'close callback'),
) as InjectionKey<(id: TagProps['id']) => Promise<void>>;

export const NTagGroupNoticeTagMountedInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'notice tag mounted'),
) as InjectionKey<(uid: string, props: TagProps) => void>;

export const NTagGroupNoticeTagUnmountedInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'notice tag unmounted'),
) as InjectionKey<(uid: string) => void>;

export const NTagGroupDoCollapseInjectKey = Symbol(
  generatorInjectedKeyName('tag-group', 'do-collapse'),
) as InjectionKey<() => void>;
