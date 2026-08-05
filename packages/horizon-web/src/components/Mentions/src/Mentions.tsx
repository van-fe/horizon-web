import { computed, defineComponent, mergeProps, useId } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import { useMentionsProps } from './composables/useProps';
import { useMentionsEmits } from './composables/useEmits';
import { useMentionsSlots } from './composables/useSlots';
import { useMentions } from './hooks/useMentions';
import { useMentionsMeasure } from './hooks/useMentionsMeasure';

export default defineComponent({
  name: `${useNamespace()}Mentions`,
  desc: '支持通过触发字符插入候选项的多行输入框',
  descLocales: { en: 'A textarea with trigger-based mention suggestions.' },
  inheritAttrs: false,
  props: useMentionsProps,
  emits: useMentionsEmits,
  slots: useMentionsSlots,
  setup(props, { attrs, slots, emit }) {
    const c = new ComponentClassBlock('mentions');
    const dropdownClass = new ComponentClassBlock('dropdown');
    const dropdownItemClass = new ComponentClassBlock('dropdown-item');
    const state = useMentions(props, emit as any);
    const measure = useMentionsMeasure({
      textarea: state.textarea,
      value: state.currentValue,
      cursor: state.cursor,
      visible: state.visible,
    });
    const listboxId = `${useId()}-listbox`;
    const popupVisible = computed(
      () => state.visible.value && (state.filteredOptions.value.length > 0 || Boolean(slots.empty)),
    );
    const popupPlacement = computed<'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'>(
      () => `${props.placement}-${measure.direction.value === 'rtl' ? 'end' : 'start'}`,
    );
    const activeOptionId = computed(() =>
      popupVisible.value && state.activeIndex.value >= 0
        ? `${listboxId}-option-${state.activeIndex.value}`
        : undefined,
    );

    return () => {
      const { class: externalClass, style: externalStyle, ...textareaAttrs } = attrs;
      const inputProps = mergeProps(textareaAttrs, {
        ref: state.textarea,
        class: c.e('input'),
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        maxlength: props.maxlength,
        role: 'combobox',
        'aria-multiline': 'true',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-controls': listboxId,
        'aria-expanded': popupVisible.value,
        'aria-activedescendant': activeOptionId.value,
        onInput: state.onInput,
        onFocus: state.onFocus,
        onBlur: state.onBlur,
        onClick: state.onSelectionChange,
        onSelect: state.onSelectionChange,
        onKeydown: state.onKeydown,
        onKeyup: state.onKeyup,
        onCompositionstart: state.onCompositionStart,
        onCompositionend: state.onCompositionEnd,
        onScroll: measure.onTextareaScroll,
      });

      return (
        <div
          class={[c.block, c.is('disabled', props.disabled), externalClass]}
          style={externalStyle as any}
        >
          <textarea {...inputProps} />
          <div
            ref={measure.measure}
            class={c.e('measure')}
            dir={measure.direction.value}
            aria-hidden="true"
          >
            {measure.textBeforeCaret.value}
            <HPopover
              ref={measure.popover}
              trigger="manual"
              visible={popupVisible.value}
              placement={popupPlacement.value}
              distance={4}
              arrow={false}
              flip
              preventOverflow
              resizeObserve
              toBody
              referenceClass={c.e('caret-reference')}
              popperClass={c.e('popper')}
            >
              {{
                reference: () => <span class={c.e('caret')}>{'\u200b'}</span>,
                popper: () => (
                  <HPopContent
                    class={[
                      c.e('dropdown'),
                      dropdownClass.e('inner'),
                      dropdownClass.em('inner', 'default'),
                      dropdownClass.em('inner', 'medium'),
                    ]}
                  >
                    <HScrollbar maxHeight={props.maxHeight} size="small" horizontalVisible={false}>
                      <div ref={state.listbox} id={listboxId} class={c.e('listbox')} role="listbox">
                        {state.filteredOptions.value.length
                          ? state.filteredOptions.value.map((option, index) => (
                              <div
                                key={`${option.value}-${index}`}
                                role="none"
                                class={[
                                  c.e('option'),
                                  dropdownItemClass.block,
                                  dropdownItemClass.is('active', index === state.activeIndex.value),
                                  dropdownItemClass.is('disabled', Boolean(option.disabled)),
                                  dropdownItemClass.is('focusable', !option.disabled),
                                ]}
                                onMouseenter={() => void state.activate(index)}
                                onPointerdown={(event: PointerEvent) => event.preventDefault()}
                                onMousedown={(event: MouseEvent) => event.preventDefault()}
                                onClick={() => void state.select(option)}
                              >
                                <div
                                  id={`${listboxId}-option-${index}`}
                                  role="option"
                                  aria-selected={index === state.activeIndex.value}
                                  aria-disabled={option.disabled}
                                  data-mention-index={index}
                                  class={dropdownItemClass.e('inner')}
                                >
                                  <div class={dropdownItemClass.e('content')}>
                                    {slots.option?.({
                                      option,
                                      active: index === state.activeIndex.value,
                                    }) ??
                                      option.label ??
                                      option.value}
                                  </div>
                                </div>
                              </div>
                            ))
                          : slots.empty && <div class={c.e('empty')}>{slots.empty()}</div>}
                      </div>
                    </HScrollbar>
                  </HPopContent>
                ),
              }}
            </HPopover>
            {measure.textAfterCaret.value}
          </div>
        </div>
      );
    };
  },
});
