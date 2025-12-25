import type { StyleValue } from 'vue';
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
import { useButtonProps } from './composables/useProps';
import { useButtonEmits } from './composables/useEmits';
import { useButtonSlots } from './composables/useSlots';
import { useButtonExposes } from './composables/useExposes';
import type { ButtonProps } from './composables/useProps';
import type { ButtonEmits } from './composables/useEmits';
import type { ButtonSlots } from './composables/useSlots';
import type { ButtonExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { iconSizeMapping, onlyIconSizeMapping } from './utils/config';
import { IconLoadingLine, AIcon } from '@aurora/icon';
import { NButtonGroupPropsInjectKey, NButtonGroupSizeInjectKey } from './utils/injectKeys';
import type { Router } from 'vue-router';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { getCssVariableByStatus } from '~/utils/useColorful';
import { builtinColorMapping } from '~/styles';
import { tinyColor } from '@aurora/colors';

export default defineComponent({
  name: `${useNamespace()}Button`,
  desc: '按钮用于开始一个即时操作',
  props: useButtonProps,
  emits: useButtonEmits,
  slots: useButtonSlots,
  exposes: useButtonExposes,
  setup(
    props: ButtonProps,
    { emit, slots, attrs }: HorizonWebSetupContext<ButtonEmits, ButtonSlots, ButtonExposes>,
  ) {
    const { size, color: colorProp, borderStyle: borderStyleProp } = toRefs(props);
    const classHelper = new ComponentClassBlock('button');

    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router as Router | undefined;

    const parentProps = inject(NButtonGroupPropsInjectKey, undefined);
    const groupSizeRef = inject(NButtonGroupSizeInjectKey, undefined);
    const compatibility = inject(NApplicationCompatibilityInjectedKey, undefined);

    const isOnlyIcon = computed(
      () => !!(props.icon || slots.icon || props.loading) && !slots.default && !slots.suffix,
    );

    const isOldStandard = computed(
      () =>
        !!compatibility?.value?.split(',').includes('button.size') &&
        props.forceNewestSize === false,
    );

    const oldStandardSizeRef = useSize(
      computed(() => size?.value ?? groupSizeRef?.value),
      'medium',
      {
        mini: 'small',
        small: 'medium',
        medium: 'large',
        large: 'huge',
      },
    );

    const newStandardSizeRef = useSize(
      computed(() => size?.value ?? groupSizeRef?.value),
      'medium',
      {
        mini: 'small',
      },
    );

    const sizeRef = computed(() => {
      if (isOldStandard.value) {
        return oldStandardSizeRef.value;
      } else {
        return newStandardSizeRef.value;
      }
    });

    const type = computed(() => {
      if (['normal', 'primary', 'danger'].includes(props.type)) {
        return props.type;
      }

      if (props.kind === 'negative') {
        return 'danger';
      }

      if (props.kind === 'neutral') {
        return 'normal';
      }

      return 'primary';
    });
    const isPlain = computed(() => props.plain || props.type === 'secondary');
    const isText = computed(() => props.type === 'text' || props.text);

    const appendStyle = computed(() => {
      if (
        !colorProp?.value ||
        (!tinyColor(colorProp.value).isValid &&
          !Object.keys(builtinColorMapping).includes(colorProp.value))
      )
        return undefined;

      let type: 'default' | 'plain' | 'text' | 'link' | 'ghost' = 'default';
      if (isPlain.value) {
        type = props.ghost ? 'ghost' : 'plain';
      } else if (isText.value) type = 'text';
      else if (props.link) type = 'link';

      return getCssVariableByStatus(
        'button',
        Object.keys(builtinColorMapping).includes(colorProp.value)
          ? builtinColorMapping[colorProp.value]
          : colorProp.value,
        type,
      );
    });

    const debounceLoading = ref(false);
    function onClick(e: MouseEvent) {
      if (props.disabled || props.loading) return;

      if (props.href) {
        e.preventDefault();
        switch (props.target) {
          case '_blank':
            window.open(props.href);
            return;
          case '_self':
            location.href = props.href;
            return;
          case '_parent':
            window.parent.open(props.href);
            return;
          case '_top':
            window.top?.open(props.href);
            return;
        }
      }

      if (props.to) {
        if (router) {
          e.preventDefault();
          props.replace ? router.replace(props.to) : router.push(props.to);
          return;
        } else {
          console.warn(
            `You haven't import "vue-router". The props of 'to' and 'replace' will be ignored.`,
          );
        }
      }

      if (props.debounceFn) {
        e.preventDefault();

        if (debounceLoading.value) {
          return;
        }

        debounceLoading.value = true;

        Promise.resolve(props.debounceFn?.())
          .then(() => {
            emit('debounceFinished');
          })
          .finally(() => {
            debounceLoading.value = false;
          });

        return;
      }

      emit('click', e);
    }

    return () => (
      <props.tag
        class={cls(
          classHelper.block,
          classHelper.m(parentProps?.type ?? type.value),
          classHelper.m(sizeRef.value),
          classHelper.m('block', props.block),
          classHelper.m('round', props.round),
          classHelper.m('plain', isPlain.value),
          classHelper.m('text', props.type === 'tertiary' || isText.value),
          classHelper.m('link', props.link),
          classHelper.m('equally', isOnlyIcon.value),
          classHelper.is(borderStyleProp.value),
          classHelper.is(
            'loading',
            props.loading || (debounceLoading.value && props.debounceType === 'loading'),
          ),
          classHelper.is('with-icon', !!(props.icon || slots.icon || props.loading)),
          classHelper.is('auto-fit', props.autoFit),
          classHelper.is('activated', props.type === 'tertiary' || props.active),
          classHelper.is('old-standard', isOldStandard.value),
          classHelper.is('ghost', props.ghost),
        )}
        type={props.nativeType}
        disabled={props.disabled || (debounceLoading.value && props.debounceType === 'disabled')}
        tabindex={0}
        autofocus={props.autofocus}
        {...attrs}
        style={appendStyle.value}
        onClick={evt => onClick(evt)}
        onFocus={(e: FocusEvent) => emit('focus', e)}
        onBlur={(e: FocusEvent) => emit('blur', e)}
      >
        {props.loading || (debounceLoading.value && props.debounceType === 'loading') ? (
          <div class={cls(classHelper.e('icon'), classHelper.m('loading'))}>
            <IconLoadingLine
              size={
                isOnlyIcon.value
                  ? onlyIconSizeMapping[sizeRef.value]
                  : iconSizeMapping[sizeRef.value]
              }
              spin="cw"
            />
          </div>
        ) : (
          (props.icon || slots.icon) && (
            <div
              class={cls(classHelper.e('icon'), classHelper.is('custom-size', !!props.iconSize))}
            >
              {props.icon ? (
                typeof props.icon === 'string' ? (
                  <AIcon
                    name={props.icon}
                    size={
                      props.iconSize ??
                      (isOnlyIcon.value
                        ? onlyIconSizeMapping[sizeRef.value]
                        : iconSizeMapping[sizeRef.value])
                    }
                  />
                ) : (
                  createVNode(props.icon, {
                    size:
                      props.iconSize ??
                      (isOnlyIcon.value
                        ? onlyIconSizeMapping[sizeRef.value]
                        : iconSizeMapping[sizeRef.value]),
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
