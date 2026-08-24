import {
  computed,
  createVNode,
  defineComponent,
  getCurrentInstance,
  inject,
  ref,
  toRefs,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { StyleValue } from 'vue';
import { useButtonProps } from './composables/useProps';
import { useButtonEmits } from './composables/useEmits';
import { useButtonSlots } from './composables/useSlots';
import { useButtonExposes } from './composables/useExposes';
import type { ButtonProps } from './composables/useProps';
import type { ButtonEmits } from './composables/useEmits';
import type { ButtonSlots } from './composables/useSlots';
import type { ButtonExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import LoadingIcon from '~/directives/v-loading/src/components/LoadingIcon';
import { iconSizeMapping, onlyIconSizeMapping } from './utils/config';
import { AIcon } from '@aurora/icon';
import { HButtonGroupPropsInjectKey, HButtonGroupSizeInjectKey } from './utils/injectKeys';
import type { Router } from 'vue-router';
import { createButtonColorStyle } from '@aurora/theme';
import { useButtonAction } from './composables/useButtonAction';

export default defineComponent({
  name: `${useNamespace()}Button`,
  desc: '按钮用于开始一个即时操作',
  descLocales: { en: 'Button component for triggering actions.' },
  props: useButtonProps,
  emits: useButtonEmits,
  slots: useButtonSlots,
  exposes: useButtonExposes,
  setup(
    props: ButtonProps,
    { emit, slots, attrs, expose }: HorizonWebSetupContext<ButtonEmits, ButtonSlots, ButtonExposes>,
  ) {
    const { size, color: colorProp, borderStyle: borderStyleProp } = toRefs(props);
    const classHelper = new ComponentClassBlock('button');

    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router as Router | undefined;
    const { onClick, state: actionState } = useButtonAction(props, router, emit);
    const buttonRef = ref<HTMLElement>();

    const parentProps = inject(HButtonGroupPropsInjectKey, undefined);
    const groupSizeRef = inject(HButtonGroupSizeInjectKey, undefined);

    const isOnlyIcon = computed(
      () => !!(props.icon || slots.icon || props.loading) && !slots.default && !slots.suffix,
    );

    const sizeRef = useSize(
      computed(() => size?.value ?? groupSizeRef?.value),
      'medium',
      {},
    );
    const defaultIconSize = computed(() =>
      isOnlyIcon.value ? onlyIconSizeMapping[sizeRef.value] : iconSizeMapping[sizeRef.value],
    );

    const type = computed(() => props.type);
    const effectiveType = computed(() => parentProps?.type ?? type.value);
    const isPlain = computed(() => props.plain);
    const isText = computed(() => props.text);

    const appendStyle = computed(() => {
      if (!colorProp?.value) return undefined;

      let appearance: 'default' | 'plain' | 'text' | 'link' | 'ghost' = 'default';
      if (isPlain.value) {
        appearance = props.ghost ? 'ghost' : 'plain';
      } else if (props.link) appearance = 'link';
      else if (isText.value) appearance = 'text';

      return createButtonColorStyle({
        color: colorProp.value,
        appearance,
        variant: effectiveType.value,
      });
    });

    expose({
      focus: () => buttonRef.value?.focus(),
    });

    return () => (
      <props.tag
        ref={buttonRef}
        class={cls(
          classHelper.block,
          classHelper.m(effectiveType.value),
          classHelper.m(sizeRef.value),
          classHelper.m('block', props.block),
          classHelper.m('round', props.round),
          classHelper.m('plain', isPlain.value),
          classHelper.m('text', isText.value),
          classHelper.m('link', props.link),
          classHelper.m('equally', isOnlyIcon.value),
          classHelper.is(borderStyleProp?.value),
          classHelper.is('loading', actionState.value.loading),
          classHelper.is('with-icon', !!(props.icon || slots.icon || props.loading)),
          classHelper.is('auto-fit', props.autoFit),
          classHelper.is('activated', props.active),
          classHelper.is('ghost', props.ghost),
        )}
        type={props.nativeType}
        disabled={actionState.value.disabled}
        aria-busy={actionState.value.loading || undefined}
        aria-disabled={!actionState.value.interactive || undefined}
        tabindex={props.tag !== 'button' && !actionState.value.interactive ? -1 : 0}
        autofocus={props.autofocus}
        {...attrs}
        style={[appendStyle.value, attrs.style as StyleValue]}
        onClick={onClick}
        onFocus={(e: FocusEvent) => emit('focus', e)}
        onBlur={(e: FocusEvent) => emit('blur', e)}
      >
        {actionState.value.loading ? (
          <div class={cls(classHelper.e('icon'), classHelper.m('loading'))}>
            <LoadingIcon
              class={classHelper.e('loading-icon')}
              style={{
                width: `${defaultIconSize.value}px`,
                height: `${defaultIconSize.value}px`,
              }}
            />
          </div>
        ) : (
          (props.icon || slots.icon) && (
            <div
              class={cls(classHelper.e('icon'), classHelper.is('custom-size', !!props.iconSize))}
            >
              {props.icon ? (
                typeof props.icon === 'string' ? (
                  <AIcon name={props.icon} size={props.iconSize ?? defaultIconSize.value} />
                ) : (
                  createVNode(props.icon, {
                    size: props.iconSize ?? defaultIconSize.value,
                  })
                )
              ) : (
                slots.icon?.()
              )}
            </div>
          )
        )}
        {slots.default && <div class={cls(classHelper.e('content'))}>{slots.default?.()}</div>}
        {slots.suffix && <div class={cls(classHelper.e('suffix'))}>{slots.suffix?.()}</div>}
      </props.tag>
    );
  },
});
