import type { CSSProperties } from 'vue';
import {
  computed,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useTagProps } from './composables/useProps';
import { useTagEmits } from './composables/useEmits';
import { useTagSlots } from './composables/useSlots';
import { useTagExposes } from './composables/useExposes';
import type { TagEmits } from './composables/useEmits';
import type { TagSlots } from './composables/useSlots';
import type { TagExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { IconClose, IconLoadingLine, AIcon } from '@aurora/icon';
import {
  HTagGroupCloseCallbackInjectKey,
  HTagGroupDoCollapseInjectKey,
  HTagGroupEditCallbackInjectKey,
  HTagGroupEditingNoticeInjectKey,
  HTagGroupNoticeTagMountedInjectKey,
  HTagGroupNoticeTagUnmountedInjectKey,
  HTagGroupPropsInjectKey,
  HTagGroupSizeInjectKey,
} from './utils/injectKeys';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HAvatar from '~/components/Avatar/src/Avatar';
import debounce from 'lodash/debounce';
import { generateColorList } from '~/utils/useColorful';
import InputTag from './components/InputTag';
import { nanoid } from 'nanoid';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { avatarSizeMapping, builtinColorMapping, iconSizeMapping } from './utils/config';
import { useColors } from '~/styles';
import { useResizeObserver } from '@vueuse/core';
import useOverflow from '~/utils/useOverflow';

export default defineComponent({
  name: `${useNamespace()}Tag`,
  desc: '用于标记特定对象的类别、状态或属性',
  descLocales: { en: 'Tag and tag-group components for labels.' },
  components: {
    InputTag,
  },
  props: useTagProps,
  emits: useTagEmits,
  slots: useTagSlots,
  exposes: useTagExposes,
  setup(props, { emit, slots, expose }: HorizonWebSetupContext<TagEmits, TagSlots, TagExposes>) {
    const classHelper = new ComponentClassBlock('tag');

    const { size, tooltip: tooltipRef, modelValue, plain } = toRefs(props);

    const uid = nanoid();
    const wrapperDomRef = ref<HTMLDivElement | null>(null);
    const contentRef = ref<HTMLDivElement | null>(null);
    const tooltipDomRef = ref<typeof HTooltip | null>(null);

    /***** injects *****/
    const parentProps = inject(HTagGroupPropsInjectKey, undefined);
    const parentSize = inject(HTagGroupSizeInjectKey, undefined);
    const onEditingNotice = inject(HTagGroupEditingNoticeInjectKey, undefined);
    const onEditNotice = inject(HTagGroupEditCallbackInjectKey, undefined);
    const onCloseNotice = inject(HTagGroupCloseCallbackInjectKey, undefined);
    const onMountedNotice = inject(HTagGroupNoticeTagMountedInjectKey, undefined);
    const onUnmountedNotice = inject(HTagGroupNoticeTagUnmountedInjectKey, undefined);
    const doCollapse = inject(HTagGroupDoCollapseInjectKey, undefined);

    /***** data *****/
    const sizeRef = useSize(
      computed(() => size?.value ?? parentSize?.value),
      'medium',
      {
        mini: 'small',
      },
    );

    const isOverflow = ref(false);

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const canUseToggled = computed(() => typeof modelValue?.value === 'boolean');
    const isActivated = computed(() => {
      if (canUseToggled.value) {
        return modelValue?.value;
      } else return false;
    });

    const isDisabled = computed(() => parentProps?.disabled ?? props.disabled);

    const equallyShowClose = ref(false);
    const showClose = computed(
      () =>
        props.closable &&
        !isDisabled.value &&
        ((props.equally && equallyShowClose.value) || !props.equally),
    );

    /***** tag status *****/
    const isHover = ref(false);
    const isPress = ref(false);
    const isEditing = ref(false);
    const isWaitingForConfirm = ref(false);
    const isClickable = computed(() => props.clickable || canUseToggled.value);

    /***** watches ******/
    watch(isEditing, val => {
      onEditingNotice?.(uid, val);
    });

    /***** builtin color *****/
    const isColorful = computed(() => !!props.color);
    const isColorBar = (color: string) => color && /\[\d+]$/.test(color);
    const isBuiltinColor = computed(
      () =>
        isColorful.value &&
        ['brand', 'lime', 'indigo', 'purple', 'magenta', 'orange'].includes(props.color!),
    );
    const isAutoFitColor = computed(
      () =>
        isBuiltinColor.value ||
        (!isColorful.value && props.clickable) ||
        (isColorful.value && props.autoColor),
    );

    const colorList = computed(() =>
      generateColorList(
        isColorBar(props.color!)
          ? useColors(props.color!)
          : isBuiltinColor.value
            ? builtinColorMapping[props.color!]
            : props.color!,
        isColorBar(props.background!) ? useColors(props.background!) : props.background || '#FFF',
        plain.value,
      ),
    );

    const style = computed<CSSProperties>(() => {
      if (!props.autoColor) {
        return {
          color: props.color + ' !important',
          background: props.background + ' !important',
        };
      }

      if (isColorful.value) {
        if (isDisabled.value) {
          return {
            color: colorList.value.text.disabled + ' !important',
            background:
              (isColorBar(props.background!)
                ? useColors(props.background!)
                : props.background ?? colorList.value.background.disabled) + ' !important',
            borderColor: colorList.value.border.disabled + ' !important',
          };
        }

        if (isClickable.value) {
          if (isPress.value) {
            return {
              color: colorList.value.text.press,
              background: isColorBar(props.background!)
                ? useColors(props.background!)
                : props.background ?? colorList.value.background.press,
              borderColor: colorList.value.border.press,
            };
          }

          if (isHover.value) {
            return {
              color: colorList.value.text.hover,
              background: isColorBar(props.background!)
                ? useColors(props.background!)
                : props.background ?? colorList.value.background.hover,
              borderColor: colorList.value.border.hover,
            };
          }
        }

        if (isActivated.value) {
          return {
            color: colorList.value.text.active,
            background: isColorBar(props.background!)
              ? useColors(props.background!)
              : props.background ?? colorList.value.background.active,
            borderColor: colorList.value.border.active,
          };
        }

        return {
          color: colorList.value.text.default,
          background: isColorBar(props.background!)
            ? useColors(props.background!)
            : props.background ?? colorList.value.background.default,
          borderColor: colorList.value.border.default,
        };
      } else return {};
    });

    /***** expose *****/
    const inputValue = ref('');
    const inputPreValue = ref('');
    function edit(presetContent?: string) {
      inputValue.value = presetContent ?? contentRef.value?.innerText ?? '';
      inputPreValue.value = inputValue.value;
      isEditing.value = true;
    }

    expose({
      edit,
    });

    /***** events *****/
    let debouncedCancel: null | (() => void) = null;
    function onClickTag(e: MouseEvent) {
      debouncedCancel?.();

      if (isDisabled.value || !isClickable.value) return;

      emit('click', e);
      // @deprecated
      emit('clickTag', e);

      if (typeof modelValue?.value === 'boolean') {
        emit('update:modelValue', !modelValue.value);
        void nextTick(() => {
          formItemTrigger?.('change');
        });
      }
    }

    function onClose(e: MouseEvent) {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (isDisabled.value) return;

      if (onCloseNotice) {
        isWaitingForConfirm.value = true;
        onCloseNotice?.(props.id)
          .then(() => {
            emit('close', e);
            // @deprecated
            emit('closeTag', e);
          })
          .finally(() => {
            isWaitingForConfirm.value = false;
          });
      } else {
        emit('close', e);
        // @deprecated
        emit('closeTag', e);
      }
    }

    function onMouseEnter() {
      isHover.value = true;
      const debouncedShowClose = debounce(() => {
        equallyShowClose.value = true;
        debouncedCancel = null;
      }, props.showCloseDelay);

      debouncedCancel = debouncedShowClose.cancel;

      if (props.equally) {
        if (props.clickable) {
          debouncedShowClose();
        } else {
          equallyShowClose.value = true;
        }
      }

      isOverflow.value = useOverflow(contentRef);
    }

    function onMouseLeave() {
      isHover.value = false;
      equallyShowClose.value = false;
      debouncedCancel?.();
      debouncedCancel = null;
    }

    function onMouseDown() {
      isPress.value = true;

      function onMouseUp() {
        isPress.value = false;

        document.body.removeEventListener('mouseup', onMouseUp);
      }

      document.body.addEventListener('mouseup', onMouseUp);
    }

    function onDoubleClick() {
      if (isDisabled.value || isEditing.value || isWaitingForConfirm.value) return;
      if (parentProps?.editable ?? props.editable) {
        edit();
      }
    }

    function onBlur() {
      isEditing.value = false;

      if (inputValue.value.trim() && inputValue.value !== inputPreValue.value) {
        if (onEditNotice) {
          isWaitingForConfirm.value = true;
          onEditNotice(inputValue.value.trim(), inputPreValue.value.trim(), props.id).finally(
            () => {
              isWaitingForConfirm.value = false;
            },
          );
        }
      }
    }

    const tooltipProps = computed(() => {
      if (typeof tooltipRef?.value === 'string' || typeof tooltipRef?.value === 'boolean') {
        return {};
      } else {
        return tooltipRef?.value ?? {};
      }
    });

    const tooltipDisabled = computed(() => {
      if (!!slots.tooltipContent && tooltipRef.value !== false) return false;

      if (tooltipRef.value === false) {
        return true;
      } else if (!tooltipRef.value) {
        return !isOverflow.value;
      } else {
        return false;
      }
    });

    /******* content change to emit ********/
    watch(
      () => [props.closable, sizeRef.value, props.bold, props.equally, props.icon, props.loading],
      () => {
        doCollapse?.();
      },
    );

    const { stop: stopResizeObserver } = useResizeObserver(contentRef, () => {
      if (!props.isEllipsis && !props.isInPopover) {
        doCollapse?.();
      }
    });

    onMounted(() => {
      !props.isCreateTag && onMountedNotice?.(uid, props);
    });

    onUnmounted(() => {
      !props.isCreateTag && onUnmountedNotice?.(uid);
      stopResizeObserver?.();
    });

    return () => {
      const defaultSlotContent = slots.default?.();

      return props.isPure ? (
        defaultSlotContent
      ) : (
        <div
          ref={wrapperDomRef}
          class={cls(
            classHelper.block,
            classHelper.m(props.type || 'default', !props.color),
            classHelper.m(sizeRef.value),
            classHelper.m('bold', props.bold),
            classHelper.m('round', props.round || props.major),
            classHelper.m('equally', props.equally),
            classHelper.is('active', isActivated.value),
            classHelper.is('loading', props.loading || isWaitingForConfirm.value),
            classHelper.is('plain', props.type === 'hollow' || props.plain || isEditing.value),
            classHelper.is('disabled', isDisabled.value),
            classHelper.is('closable', props.closable),
            classHelper.is('clickable', isClickable.value),
            classHelper.is('disable-transitions', props.disableTransitions),
            classHelper.is('show-close', showClose.value),
            classHelper.is('colorful', isColorful.value),
            classHelper.is('colored', isColorful.value || !!props.type),
            classHelper.is('auto-fit-color', isAutoFitColor.value),
            classHelper.is('editing', isEditing.value),
            classHelper.is('ellipsis', props.isEllipsis),
          )}
          style={style.value}
          onMouseenter={onMouseEnter}
          onMouseleave={onMouseLeave}
          onMousedown={onMouseDown}
          onClick={onClickTag}
          onDblclick={onDoubleClick}
        >
          <HTooltip
            ref={tooltipDomRef}
            enterable={true}
            showAfter={props.tooltipShowAfter}
            hideAfter={props.tooltipHideAfter}
            {...tooltipProps.value}
            disabled={tooltipDisabled.value}
          >
            {{
              content: () => (
                <Fragment>
                  {slots.tooltipContent?.() ??
                    (isOverflow.value
                      ? defaultSlotContent
                      : typeof tooltipRef?.value === 'string'
                        ? tooltipRef.value
                        : defaultSlotContent)}
                </Fragment>
              ),
              default: () => (
                <div class={classHelper.e('inner')}>
                  {isEditing.value ? (
                    <InputTag v-model={inputValue.value} onBlur={onBlur} />
                  ) : isWaitingForConfirm.value ? (
                    <div class={cls(classHelper.e('content'))}>
                      {inputValue.value || defaultSlotContent}
                    </div>
                  ) : (
                    <>
                      {(props.avatar || slots.avatar) && (
                        <div class={cls(classHelper.e('avatar'))}>
                          {slots.avatar?.() ?? (
                            <HAvatar src={props.avatar} size={avatarSizeMapping[sizeRef.value]} />
                          )}
                        </div>
                      )}
                      {(props.icon || slots.icon) && (
                        <div class={cls(classHelper.e('icon'))}>
                          {typeof props.icon === 'string' ? (
                            <AIcon
                              name={props.icon}
                              size={iconSizeMapping[sizeRef.value]}
                              color={style.value?.color}
                            />
                          ) : typeof props.icon === 'object' ? (
                            createVNode(props.icon, {
                              size: iconSizeMapping[sizeRef.value],
                              color: [style.value?.color],
                            })
                          ) : (
                            slots.icon?.(style.value?.color)
                          )}
                        </div>
                      )}
                      {defaultSlotContent && (
                        <div ref={contentRef} class={cls(classHelper.e('content'))}>
                          {defaultSlotContent}
                        </div>
                      )}
                      {showClose.value && (
                        <div
                          class={cls(classHelper.e('icon'), classHelper.e('close'))}
                          onClick={onClose}
                        >
                          <IconClose
                            size={iconSizeMapping[sizeRef.value]}
                            color={style.value?.color || ''}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {(props.loading || isWaitingForConfirm.value) && (
                    <div class={classHelper.e('loading')}>
                      <IconLoadingLine spin="cw" size={iconSizeMapping[sizeRef.value]} />
                    </div>
                  )}
                </div>
              ),
            }}
          </HTooltip>
        </div>
      );
    };
  },
});
