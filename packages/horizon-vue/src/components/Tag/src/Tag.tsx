import {
  computed,
  createVNode,
  defineComponent,
  Fragment,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useTagProps } from './composables/useProps';
import { useTagEmits } from './composables/useEmits';
import { useTagSlots } from './composables/useSlots';
import { useTagExposes } from './composables/useExposes';
import { useTagEditing } from './composables/useTagEditing';
import { useTagGroupContext } from './composables/useTagGroupContext';
import { useTagInteraction } from './composables/useTagInteraction';
import { useTagStyle } from './composables/useTagStyle';
import { useTagTooltip } from './composables/useTagTooltip';
import type { TagEmits } from './composables/useEmits';
import type { TagSlots } from './composables/useSlots';
import type { TagExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { IconClose, IconLoadingLine, AIcon } from '@aurora/icon';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HAvatar from '~/components/Avatar/src/Avatar';
import InputTag from './components/InputTag';
import { nanoid } from 'nanoid';
import { avatarSizeMapping, iconSizeMapping } from './utils/config';

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

    const { size, tooltip: tooltipRef, modelValue } = toRefs(props);

    const uid = nanoid();
    const wrapperDomRef = ref<HTMLDivElement | null>(null);
    const contentRef = ref<HTMLDivElement | null>(null);
    const tooltipDomRef = ref<typeof HTooltip | null>(null);
    const group = useTagGroupContext();
    const sizeRef = useSize(
      computed(() => size?.value ?? group.parentSize?.value),
      'medium',
      {
        mini: 'small',
      },
    );

    const editing = useTagEditing({
      uid,
      props,
      contentRef,
      getParentEditable: () => group.parentProps?.editable,
      isDisabled: () => group.parentProps?.disabled ?? props.disabled ?? false,
      onEditingNotice: group.onEditingNotice,
      onEditNotice: group.onEditNotice,
    });
    const tooltip = useTagTooltip({
      props,
      size: sizeRef,
      contentRef,
      hasTooltipContent: () => !!slots.tooltipContent,
      doCollapse: group.doCollapse,
    });
    const interaction = useTagInteraction({
      props,
      modelValue,
      wrapperRef: wrapperDomRef,
      isWaitingForConfirm: editing.isWaitingForConfirm,
      getParentDisabled: () => group.parentProps?.disabled,
      onCloseNotice: group.onCloseNotice,
      onEnter: tooltip.measureOverflow,
      emitClick: event => emit('click', event),
      emitClose: event => emit('close', event),
      emitActiveChange: active => emit('update:modelValue', active),
    });
    const tagStyle = useTagStyle({
      props,
      active: interaction.isActivated,
      disabled: interaction.isDisabled,
      hover: interaction.isHover,
      press: interaction.isPress,
      clickable: interaction.isClickable,
    });

    expose({ edit: editing.edit });

    onMounted(() => {
      !props.isCreateTag && group.onMountedNotice?.(uid, props);
    });

    onUnmounted(() => {
      !props.isCreateTag && group.onUnmountedNotice?.(uid);
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
            classHelper.m('round', props.round),
            classHelper.m('equally', props.equally),
            classHelper.is('active', interaction.isActivated.value),
            classHelper.is('loading', props.loading || editing.isWaitingForConfirm.value),
            classHelper.is(
              'plain',
              props.type === 'hollow' || props.plain || editing.isEditing.value,
            ),
            classHelper.is('disabled', interaction.isDisabled.value),
            classHelper.is('closable', props.closable),
            classHelper.is('clickable', interaction.isClickable.value),
            classHelper.is('disable-transitions', props.disableTransitions),
            classHelper.is('show-close', interaction.showClose.value),
            classHelper.is('colorful', tagStyle.isColorful.value),
            classHelper.is('colored', tagStyle.isColorful.value || !!props.type),
            classHelper.is('auto-fit-color', tagStyle.isAutoFitColor.value),
            classHelper.is('editing', editing.isEditing.value),
            classHelper.is('ellipsis', props.isEllipsis),
          )}
          style={tagStyle.style.value}
          onMouseenter={interaction.onMouseEnter}
          onMouseleave={interaction.onMouseLeave}
          onMousedown={interaction.onMouseDown}
          onClick={interaction.onClick}
          onDblclick={editing.onDoubleClick}
        >
          <HTooltip
            ref={tooltipDomRef}
            enterable={true}
            showAfter={props.tooltipShowAfter}
            hideAfter={props.tooltipHideAfter}
            {...tooltip.tooltipProps.value}
            disabled={tooltip.tooltipDisabled.value}
          >
            {{
              content: () => (
                <Fragment>
                  {slots.tooltipContent?.() ??
                    (tooltip.isOverflow.value
                      ? defaultSlotContent
                      : typeof tooltipRef?.value === 'string'
                        ? tooltipRef.value
                        : defaultSlotContent)}
                </Fragment>
              ),
              default: () => (
                <div class={classHelper.e('inner')}>
                  {editing.isEditing.value ? (
                    <InputTag v-model={editing.inputValue.value} onBlur={editing.onBlur} />
                  ) : editing.isWaitingForConfirm.value ? (
                    <div class={cls(classHelper.e('content'))}>
                      {editing.inputValue.value || defaultSlotContent}
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
                              color={tagStyle.style.value?.color}
                            />
                          ) : typeof props.icon === 'object' ? (
                            createVNode(props.icon, {
                              size: iconSizeMapping[sizeRef.value],
                              color: [tagStyle.style.value?.color],
                            })
                          ) : (
                            slots.icon?.(tagStyle.style.value?.color)
                          )}
                        </div>
                      )}
                      {defaultSlotContent && (
                        <div ref={contentRef} class={cls(classHelper.e('content'))}>
                          {defaultSlotContent}
                        </div>
                      )}
                      {interaction.showClose.value && (
                        <div
                          class={cls(classHelper.e('icon'), classHelper.e('close'))}
                          onClick={interaction.onClose}
                        >
                          <IconClose
                            size={iconSizeMapping[sizeRef.value]}
                            color={tagStyle.style.value?.color || ''}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {(props.loading || editing.isWaitingForConfirm.value) && (
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
