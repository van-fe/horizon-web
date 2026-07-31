import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import HButton from '~/components/Button/src/Button';
import HInput from '~/components/Input/src/Input';
import useLocaleLang from '~/utils/useLocaleLang';
import type { TypographyEmits } from './composables/useEmits';
import { useTypographyEmits } from './composables/useEmits';
import type { TypographyExposes } from './composables/useExposes';
import { useTypographyExposes } from './composables/useExposes';
import { useTypographyProps } from './composables/useProps';
import type { TypographySlots } from './composables/useSlots';
import { useTypographySlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Typography`,
  desc: '统一展示标题、正文和辅助文本，并提供省略、复制与编辑能力',
  descLocales: { en: 'Displays semantic text with ellipsis, copy, and edit actions.' },
  inheritAttrs: false,
  props: useTypographyProps,
  emits: useTypographyEmits,
  slots: useTypographySlots,
  exposes: useTypographyExposes,
  setup(
    props,
    {
      attrs,
      slots,
      emit,
      expose,
    }: HorizonWebSetupContext<TypographyEmits, TypographySlots, TypographyExposes>,
  ) {
    const classHelper = new ComponentClassBlock('typography');
    const editing = ref(false);
    const draft = ref(props.modelValue ?? '');
    const inputRef = ref<any>();
    const contentRef = ref<HTMLElement>();
    const copyText = useLocaleLang('typography.copy', 'Copy');
    const editText = useLocaleLang('typography.edit', 'Edit');

    watch(
      () => props.modelValue,
      value => {
        if (!editing.value) draft.value = value ?? '';
      },
    );

    const rootTag = computed(() => (props.level ? `h${props.level}` : props.tag));
    const ellipsisLines = computed(() =>
      props.ellipsis === true ? 1 : typeof props.ellipsis === 'number' ? props.ellipsis : 0,
    );
    const getContent = () => props.modelValue ?? contentRef.value?.textContent ?? '';

    const edit = () => {
      if (!props.editable || props.disabled) return;
      draft.value = props.modelValue ?? '';
      editing.value = true;
      nextTick(() => inputRef.value?.focus?.());
    };

    const cancelEdit = () => {
      draft.value = props.modelValue ?? '';
      editing.value = false;
    };

    const commitEdit = () => {
      if (!editing.value) return;
      editing.value = false;
      emit('update:modelValue', draft.value);
      emit('change', draft.value);
    };

    const copy = async () => {
      if (props.disabled) return false;
      const value = getContent();
      let success = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          success = true;
        } else if (typeof document !== 'undefined') {
          const textarea = document.createElement('textarea');
          textarea.value = value;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          success = document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      } catch {
        success = false;
      }
      emit('copy', value, success);
      return success;
    };

    expose({ edit, cancelEdit, copy });

    return () => {
      const RootTag = rootTag.value as any;
      const lines = ellipsisLines.value;
      const classes = [
        classHelper.block,
        classHelper.m(props.type),
        classHelper.m(props.size),
        classHelper.m(props.weight),
        classHelper.m(`heading-${props.level}`, !!props.level),
        classHelper.is('block', props.block || !!props.level),
        classHelper.is('italic', props.italic),
        classHelper.is('underline', props.underline),
        classHelper.is('deleted', props.deleted),
        classHelper.is('code', props.code),
        classHelper.is('ellipsis', lines > 0),
        classHelper.is('disabled', props.disabled),
      ];

      if (editing.value) {
        return (
          <HInput
            ref={inputRef}
            class={classHelper.e('editor')}
            modelValue={draft.value}
            aria-label={editText.value as string}
            onUpdate:modelValue={(value: string) => (draft.value = value)}
            onBlur={commitEdit}
            onKeydown={(event: KeyboardEvent) => {
              if (event.key === 'Enter' && !event.isComposing) commitEdit();
              if (event.key === 'Escape') cancelEdit();
            }}
          />
        );
      }

      return (
        <RootTag
          {...attrs}
          class={[classes, attrs.class]}
          style={[
            lines > 1 ? { WebkitLineClamp: lines, '--h-typography-lines': lines } : undefined,
            attrs.style,
          ]}
        >
          {slots.prefix?.()}
          <span ref={contentRef} class={classHelper.e('content')}>
            {props.modelValue !== undefined ? props.modelValue : slots.default?.()}
          </span>
          {slots.suffix?.()}
          {(props.copyable || props.editable) && (
            <span class={classHelper.e('actions')}>
              {props.copyable && (
                <HButton
                  link
                  type="normal"
                  size="small"
                  icon="copy"
                  disabled={props.disabled}
                  aria-label={copyText.value as string}
                  onClick={copy}
                />
              )}
              {props.editable && (
                <HButton
                  link
                  type="normal"
                  size="small"
                  icon="edit"
                  disabled={props.disabled}
                  aria-label={editText.value as string}
                  onClick={edit}
                />
              )}
            </span>
          )}
        </RootTag>
      );
    };
  },
});
