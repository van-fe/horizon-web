import { defineComponent } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useMentionsProps } from './composables/useProps';
import { useMentionsEmits } from './composables/useEmits';
import { useMentionsSlots } from './composables/useSlots';
import { useMentions } from './hooks/useMentions';

export default defineComponent({
  name: `${useNamespace()}Mentions`,
  desc: '支持通过触发字符插入候选项的多行输入框',
  descLocales: { en: 'A textarea with trigger-based mention suggestions.' },
  props: useMentionsProps,
  emits: useMentionsEmits,
  slots: useMentionsSlots,
  setup(props, { slots, emit }) {
    const c = new ComponentClassBlock('mentions');
    const state = useMentions(props, emit as any);
    return () => (
      <div class={[c.block, c.is('disabled', props.disabled)]}>
        <textarea
          ref={state.textarea}
          class={c.e('input')}
          value={props.modelValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          maxlength={props.maxlength}
          aria-autocomplete="list"
          aria-expanded={state.visible.value}
          onInput={state.onInput}
          onKeydown={state.onKeydown}
        />
        {state.visible.value && (
          <div class={c.e('dropdown')} role="listbox" style={{ maxHeight: `${props.maxHeight}px` }}>
            {state.filteredOptions.value.length ? (
              state.filteredOptions.value.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={index === state.activeIndex.value}
                  aria-disabled={option.disabled}
                  class={[
                    c.e('option'),
                    c.is('active', index === state.activeIndex.value),
                    c.is('disabled', option.disabled),
                  ]}
                  onMousedown={(event: MouseEvent) => {
                    event.preventDefault();
                    void state.select(option);
                  }}
                >
                  {slots.option?.({ option, active: index === state.activeIndex.value }) ??
                    option.label ??
                    option.value}
                </div>
              ))
            ) : (
              <div class={c.e('empty')}>{slots.empty?.()}</div>
            )}
          </div>
        )}
      </div>
    );
  },
});
