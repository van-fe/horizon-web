import { ref, type Ref } from 'vue';
import type { TagProps } from './useProps';

interface TagGroupRegistry {
  editingSet: Ref<Set<string>>;
  tagsList: Ref<Map<string, TagProps>>;
  onEditing(uid: string, status: boolean): void;
  onTagMounted(uid: string, props: TagProps): void;
  onTagUnmounted(uid: string): void;
}

/** Tracks rendered child Tags and active inline editors for TagGroup coordination. */
export function useTagGroupRegistry(): TagGroupRegistry {
  const editingSet = ref(new Set<string>());
  const tagsList = ref(new Map<string, TagProps>());

  function onEditing(uid: string, status: boolean) {
    const nextEditingSet = new Set(editingSet.value);
    if (status) nextEditingSet.add(uid);
    else nextEditingSet.delete(uid);
    editingSet.value = nextEditingSet;
  }

  function onTagMounted(uid: string, props: TagProps) {
    tagsList.value.set(uid, props);
  }

  function onTagUnmounted(uid: string) {
    tagsList.value.delete(uid);
  }

  return { editingSet, onEditing, onTagMounted, onTagUnmounted, tagsList };
}
