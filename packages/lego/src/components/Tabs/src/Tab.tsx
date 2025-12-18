import { NIconSVG } from '@nio-fe/icon';
import type { LegoSetupContext } from '@nio-fe/shared';
import {
  ComponentClassBlock,
  getBooleanProp,
  getUnitString,
  isVNodeEmpty,
  useNamespace,
} from '@nio-fe/shared';
import {
  cloneVNode,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  toRefs,
  type VNode,
  type VNodeRef,
} from 'vue';
import { useTabEmits, type TabEmits } from './composables/useEmits';
import { useTabProps, type NTabValue } from './composables/useProps';
import type { TabSlots } from './composables/useSlots';
import { useTabSlots } from './composables/useSlots';
import { useTabPropsLogWarnProperty } from './composables/useWarning';
import { tabsContextKey } from './constants';

export default defineComponent({
  name: `${useNamespace()}Tab`,
  components: {
    NIconSVG,
  },
  inheritAttrs: false,
  props: useTabProps,
  slots: useTabSlots,
  emits: useTabEmits,
  setup(props, { slots, emit, attrs }: LegoSetupContext<TabEmits, TabSlots>) {
    useTabPropsLogWarnProperty(toRefs(props));

    const ctx = inject(tabsContextKey);
    if (!ctx) throw new Error('Please using <n-tab> in the <n-tabs>');

    const cls = new ComponentClassBlock('tabs');

    const instance = getCurrentInstance();

    const key = computed(() => props.name ?? (instance?.vnode.key as NTabValue));
    const closable = computed(() => props.showClose ?? props.closable);

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

    const onClose = (evt: Event) => {
      evt.stopPropagation();
      emit('close', key.value);
      ctx.onClose?.(key.value);
    };

    const isActivated = computed(() => ctx.activeKey.value === key.value);

    const boundaryStyle = computed(() => {
      if (!props.minWidth && !props.maxWidth) return {};

      // const limitWidth = ctx.wrapperEl.value
      //   ? Math.min(
      //       (ctx.wrapperEl.value.clientWidth || 300) * 0.6,
      //       typeof props.maxWidth === 'number' ? props.maxWidth : 300,
      //     )
      //   : props.maxWidth;

      return {
        minWidth: getUnitString(props.minWidth),
        maxWidth: getUnitString(props.maxWidth),
      };
    });

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
          tabindex={isActivated.value ? -1 : 0}
          aria-selected={isActivated.value}
          aria-disabled={props.disabled}
          style={boundaryStyle.value}
          onClick={onClick}
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
                  <NIconSVG class={cls.e('icon')} name={props.icon} size={props.iconSize} />
                )}

            {isVNodeEmpty(slotDefaults) ? (
              <div class={cls.e('tab-text')}>{props.label}</div>
            ) : (
              slotDefaults
            )}

            {closable.value && ctx.type.value !== 'segment' && (
              <NIconSVG name="close" class={[cls.e('icon'), cls.e('close')]} onClick={onClose} />
            )}
          </div>
        </div>
      );
    };
  },
});
