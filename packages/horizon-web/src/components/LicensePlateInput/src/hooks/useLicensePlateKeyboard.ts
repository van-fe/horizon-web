import type { Ref } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { normalizeLicensePlate } from '../utils';

const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
const DIGITS = '0123456789'.split('');
const SPECIAL_SUFFIXES = ['挂', '学', '警', '港', '澳'];

export interface LicensePlatePopoverInstance {
  popoverDom?: HTMLElement;
}

export interface UseLicensePlateKeyboardOptions {
  modelValue: () => string;
  provinces: () => string[];
  newEnergy: () => boolean;
  disabled: () => boolean;
  readonly: () => boolean;
  rootRef: Ref<HTMLElement | undefined>;
  popoverRef: Ref<LicensePlatePopoverInstance | undefined>;
  onInput: (value: string) => void;
  onChange: (value: string) => void;
  onProvinceChange: (province: string) => void;
  onClear: () => void;
  onTouched: () => void;
}

export function sanitizeLicensePlateInput(value: string, provinces: string[]) {
  const normalized = normalizeLicensePlate(value);
  const result: string[] = [];
  for (const character of normalized) {
    if (result.length === 0) {
      if (provinces.includes(character)) result.push(character);
      continue;
    }
    if (result.length === 1) {
      if (LETTERS.includes(character)) result.push(character);
      continue;
    }
    if (
      LETTERS.includes(character) ||
      DIGITS.includes(character) ||
      SPECIAL_SUFFIXES.includes(character)
    ) {
      result.push(character);
    }
    if (result.length === 8) break;
  }
  return result.join('');
}

export function getLicensePlateKeyboardKeys(activeIndex: number, provinces: string[]) {
  if (activeIndex === 0) return provinces;
  if (activeIndex === 1) return LETTERS;
  return activeIndex === 6 ? [...DIGITS, ...LETTERS, ...SPECIAL_SUFFIXES] : [...DIGITS, ...LETTERS];
}

export function useLicensePlateKeyboard(options: UseLicensePlateKeyboardOptions) {
  const draft = ref(sanitizeLicensePlateInput(options.modelValue(), options.provinces()));
  const activeIndex = ref(Math.min(draft.value.length, 7));
  const panelVisible = ref(false);
  const expandedForNewEnergy = ref(options.newEnergy() || draft.value.length === 8);
  const openedValue = ref(draft.value);

  const maxLength = computed(() =>
    options.newEnergy() || expandedForNewEnergy.value || draft.value.length === 8 ? 8 : 7,
  );
  const keyboardKeys = computed(() =>
    getLicensePlateKeyboardKeys(activeIndex.value, options.provinces()),
  );

  watch(
    () => options.modelValue(),
    value => {
      const normalized = sanitizeLicensePlateInput(value, options.provinces());
      if (normalized !== draft.value) draft.value = normalized;
      if (normalized.length === 8) expandedForNewEnergy.value = true;
      activeIndex.value = Math.min(activeIndex.value, Math.max(normalized.length, 0), 7);
    },
  );

  watch(
    () => [options.disabled(), options.readonly()] as const,
    ([disabled, readonly]) => {
      if (disabled || readonly) close();
    },
  );

  function emitInput(value: string) {
    draft.value = value;
    options.onInput(value);
  }

  function open(index = Math.min(draft.value.length, 7)) {
    if (options.disabled() || options.readonly()) return;
    const nextIndex = Math.max(0, Math.min(index, draft.value.length, 7));
    if (nextIndex === 7) expandedForNewEnergy.value = true;
    activeIndex.value = nextIndex;
    if (!panelVisible.value) openedValue.value = draft.value;
    panelVisible.value = true;
  }

  function close() {
    if (!panelVisible.value) return;
    panelVisible.value = false;
    options.onTouched();
    if (openedValue.value !== draft.value) options.onChange(draft.value);
  }

  function choose(character: string) {
    if (!panelVisible.value || !keyboardKeys.value.includes(character)) return;
    const characters = draft.value.split('');
    const index = activeIndex.value;
    characters[index] = character;
    const nextValue = characters.slice(0, maxLength.value).join('');
    emitInput(nextValue);
    if (index === 0) options.onProvinceChange(character);
    activeIndex.value = Math.min(index + 1, maxLength.value - 1);
  }

  function remove() {
    if (!draft.value) return;
    const characters = draft.value.split('');
    const index = Math.min(activeIndex.value, characters.length - 1);
    characters.splice(index, 1);
    emitInput(characters.join(''));
    activeIndex.value = Math.max(0, Math.min(index, characters.length));
  }

  function clear() {
    if (!draft.value) return;
    emitInput('');
    activeIndex.value = 0;
    expandedForNewEnergy.value = options.newEnergy();
    options.onClear();
  }

  function activateNewEnergy() {
    expandedForNewEnergy.value = true;
    open(Math.min(draft.value.length, 7));
  }

  function replaceFromText(value: string) {
    const normalized = sanitizeLicensePlateInput(value, options.provinces());
    if (normalized === draft.value) return;
    if (normalized.length === 8) expandedForNewEnergy.value = true;
    emitInput(normalized);
    activeIndex.value = Math.min(normalized.length, maxLength.value - 1);
  }

  function handleKeydown(evt: KeyboardEvent) {
    if (options.disabled() || options.readonly()) return;
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
      return;
    }
    if (evt.key === 'Backspace' || evt.key === 'Delete') {
      evt.preventDefault();
      open(activeIndex.value);
      remove();
      return;
    }
    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight') {
      evt.preventDefault();
      const offset = evt.key === 'ArrowLeft' ? -1 : 1;
      open(Math.max(0, Math.min(activeIndex.value + offset, draft.value.length, 7)));
      return;
    }
    const character = evt.key.toUpperCase();
    if (keyboardKeys.value.includes(character)) {
      evt.preventDefault();
      open(activeIndex.value);
      choose(character);
    }
  }

  function handleDocumentPointerDown(evt: MouseEvent) {
    if (!panelVisible.value) return;
    const target = evt.target as Node | null;
    if (
      target &&
      (options.rootRef.value?.contains(target) ||
        options.popoverRef.value?.popoverDom?.contains(target))
    ) {
      return;
    }
    close();
  }

  onMounted(() => document.addEventListener('mousedown', handleDocumentPointerDown));
  onBeforeUnmount(() => document.removeEventListener('mousedown', handleDocumentPointerDown));

  return {
    activeIndex,
    activateNewEnergy,
    choose,
    clear,
    close,
    draft,
    expandedForNewEnergy,
    handleKeydown,
    keyboardKeys,
    maxLength,
    open,
    panelVisible,
    remove,
    replaceFromText,
  };
}
