import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getBooleanProp, isVNodeEmpty, useNamespace } from '@aurora/utils';
import {
  cloneVNode,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  type VNode,
  type VNodeRef,
} from 'vue';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { useTabEmits, type TabEmits } from './composables/useEmits';
import { useTabProps, type HTabValue } from './composables/useProps';
import type { TabSlots } from './composables/useSlots';
import { useTabSlots } from './composables/useSlots';
import { tabsContextKey } from './constants';

export default defineComponent({
  name: `${useNamespace()}Tab`,
  components: {
    AIcon,
    HTooltip,
  },
  inheritAttrs: false,
  props: useTabProps,
  slots: useTabSlots,
  emits: useTabEmits,
  setup(props, { slots, emit, attrs }: HorizonWebSetupContext<TabEmits, TabSlots>) {
    const ctx = inject(tabsContextKey);
    if (!ctx) throw new Error('Please using <h-tab> in the <h-tabs>');

    const cls = new ComponentClassBlock('tabs');

    const instance = getCurrentInstance();

    const key = computed(() => instance?.vnode.key as HTabValue);
    const closable = computed(() => props.closable);

    const dragActivated = computed(
      () =>
        ctx.draggable.value &&
        ctx.dragging.value &&
        props.draggable &&
        ctx.moveKey.value === key.value,
    );
    const dropActivated = computed(
      () =>
        ctx.draggable.value &&
        ctx.dragging.value &&
        props.draggable &&
        ctx.overKey.value === key.value &&
        ctx.overKey.value !== ctx.moveKey.value,
    );

    const onClick = () => {
      if (getBooleanProp(props.disabled)) return;

      emit('click', key.value);
      ctx.onClick?.(key.value);
    };

    const onKeydown = (evt: KeyboardEvent) => {
      if (evt.key !== 'Enter' && evt.key !== ' ') return;
      evt.preventDefault();
      onClick();
    };

    const onClose = (evt: Event) => {
      evt.stopPropagation();
      emit('close', key.value);
      ctx.onClose?.(key.value);
    };

    const isActivated = computed(() => ctx.activeKey.value === key.value);

    const addTab = ctx.createTab(key.value) as VNodeRef;
    const dndContext = ctx.createDraggable(key.value);

    const conditionProps = computed(() => {
      const condition = {} as any;
      if (ctx.draggable.value && props.draggable) {
        condition.draggable = true;
      }
      return condition;
    });

    return () => {
      const slotDefault = slots?.default?.({
        state: isActivated.value,
        activeKey: ctx.activeKey.value!,
      }) as VNode[] | VNode;
      const slotDefaults = Array.isArray(slotDefault) ? slotDefault : [slotDefault].filter(Boolean);

      return (
        <div
          role="tab"
          {...attrs}
          ref={addTab}
          data-name={key.value}
          {...conditionProps.value}
          class={[
            cls.e('tab'),
            isActivated.value && cls.em('tab', 'active'),
            props.disabled && cls.em('tab', 'disabled'),
            dragActivated.value && cls.em('tab', 'dragging'),
            dropActivated.value && cls.em('tab', 'dropping'),
          ]}
          tabindex={props.disabled ? -1 : isActivated.value ? 0 : -1}
          aria-selected={isActivated.value}
          aria-disabled={props.disabled}
          onClick={onClick}
          onKeydown={onKeydown}
          onDragstart={dndContext.onDragstart}
          onDrag={dndContext.onDrag}
          onDragover={dndContext.onDragover}
          onDragend={dndContext.onDragend}
          onDragenter={dndContext.onDragenter}
          onDragleave={dndContext.onDragleave}
          onDrop={dndContext.onDrop}
        >
          <div class={cls.e('tab-inner')}>
            {slots.icon
              ? cloneVNode(slots.icon()[0], { class: cls.e('icon') })
              : props.icon && (
                  <AIcon class={cls.e('icon')} name={props.icon} size={props.iconSize} />
                )}

            {isVNodeEmpty(slotDefaults) ? (
              <HTooltip
                content={props.label === undefined ? '' : String(props.label)}
                overflow={true}
              >
                <div class={cls.e('tab-text')}>{props.label}</div>
              </HTooltip>
            ) : (
              slotDefaults
            )}

            {closable.value && (
              <span
                class={[cls.e('icon'), cls.e('close')]}
                role="button"
                tabindex={0}
                aria-label={`Close ${props.label || 'tab'}`}
                onClick={onClose}
                onKeydown={(evt: KeyboardEvent) => {
                  if (evt.key === 'Enter' || evt.key === ' ') {
                    evt.preventDefault();
                    onClose(evt);
                  }
                }}
              >
                <AIcon name="close" />
              </span>
            )}
          </div>
        </div>
      );
    };
  },
});
