import { defineComponent, toRefs, inject } from 'vue';
import { useCheckboxProps, isChecked } from './useProps';
import { ComponentClassBlock } from '@nio-fe/shared';
import { IconCheckboxHalf, IconCheckboxAll } from '@nio-fe/icon';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: 'Checkbox',
  components: { IconCheckboxHalf, IconCheckboxAll },
  props: useCheckboxProps,
  emits: {
    changeInput: () => true,
    blur: (evt: FocusEvent) => evt instanceof FocusEvent,
    click: (evt: MouseEvent) => evt instanceof MouseEvent,
  },
  setup(props, { slots, emit }) {
    const {
      label: propLabel,
      trueLabel: propTrueLabel,
      viewable: propViewable,
      modelValue: propModelValue,
      indeterminate: propIndeterminate,
      disabled: propDisabled,
    } = toRefs(props);

    const uuid = nanoid();

    const type = inject('type', 'checkbox');
    const classHelper = new ComponentClassBlock(`${type}`);
    const handleChange = (e: Event) => {
      e.stopPropagation();
      emit('changeInput');
    };

    const handleBlur = (evt: FocusEvent) => {
      emit('blur', evt);
    };

    function onClickOriginalInput(evt: MouseEvent) {
      evt.stopPropagation();
      emit('click', evt);
    }

    return () => {
      return propViewable.value ? (
        <label
          style={{
            display: isChecked(propModelValue.value, propLabel.value, propTrueLabel.value)
              ? 'inline-flex'
              : 'none',
          }}
        >
          <span class={classHelper.e('label')}>{slots?.default?.()}</span>
        </label>
      ) : (
        <label for={uuid}>
          {type === 'checkbox' &&
            (propIndeterminate.value ? (
              <IconCheckboxHalf color={['$primary']} class={classHelper.e('icon')} />
            ) : isChecked(propModelValue.value, propLabel.value, propTrueLabel.value) ? (
              <IconCheckboxAll color={['$primary']} class={classHelper.e('icon')} />
            ) : (
              <i class={classHelper.e('icon')}></i>
            ))}
          <input
            type="checkbox"
            id={uuid}
            value={propTrueLabel.value ?? propLabel.value}
            checked={isChecked(propModelValue.value, propLabel.value, propTrueLabel.value)}
            disabled={propDisabled.value}
            class={classHelper.e('original')}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={onClickOriginalInput}
          />
          <span class={classHelper.e('label')}>{slots?.default?.()}</span>
        </label>
      );
    };
  },
});
