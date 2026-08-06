import type { ComponentPublicInstance, CSSProperties } from 'vue';
import {
  computed,
  defineComponent,
  ref,
  resolveDynamicComponent,
  toRef,
  TransitionGroup,
} from 'vue';
import { ComponentClassBlock, cls, useLowCaseNamespace, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { IconDragForm } from '@aurora/icon';
import { useSortableListProps } from './composables/useProps';
import { useSortableListEmits } from './composables/useEmits';
import type { HSortableListSortContext, SortableListEmits } from './composables/useEmits';
import { useSortableListSlots } from './composables/useSlots';
import type { SortableListSlots } from './composables/useSlots';
import { useSortableListExposes } from './composables/useExposes';
import type { SortableListExposes } from './composables/useExposes';
import useSortableList from './hooks/useSortableList';
import useLocaleLang from '~/utils/useLocaleLang';

const SortableTransitionGroup = TransitionGroup as any;

export default defineComponent({
  name: `${useNamespace()}SortableList`,
  desc: '带有明确落点提示与排序过渡动画的可拖拽排序列表',
  descLocales: {
    en: 'A drag-sortable list with a clear drop indicator and animated reordering.',
  },
  inheritAttrs: false,
  props: useSortableListProps,
  emits: useSortableListEmits,
  slots: useSortableListSlots,
  exposes: useSortableListExposes,
  setup(
    props,
    {
      attrs,
      emit,
      expose,
      slots,
    }: HorizonWebSetupContext<SortableListEmits, SortableListSlots, SortableListExposes>,
  ) {
    const classHelper = new ComponentClassBlock('sortable-list');
    const handleRefs = new Map<string | number, HTMLElement>();
    const announcement = ref('');
    const dragHandleText = useLocaleLang('sortableList.dragHandle');
    const movedText = useLocaleLang('sortableList.moved');

    const focusHandle = (key: string | number) => handleRefs.get(key)?.focus();
    const setHandleRef = (
      key: string | number,
      element: Element | ComponentPublicInstance | null,
    ) => {
      if (element instanceof HTMLElement) handleRefs.set(key, element);
      else handleRefs.delete(key);
    };

    const onSort = (context: HSortableListSortContext) => {
      emit('update:modelValue', context.list);
      emit('sort', context);
      announcement.value = String(movedText.value ?? '')
        .replace('{from}', String(context.oldIndex + 1))
        .replace('{to}', String(context.newIndex + 1))
        .replace('{total}', String(context.list.length));
    };

    const sortable = useSortableList({
      items: toRef(props, 'modelValue'),
      disabled: toRef(props, 'disabled'),
      itemKey: toRef(props, 'itemKey'),
      itemDisabled: toRef(props, 'itemDisabled'),
      onSort,
      onDragStart: (event, item, index, key) => emit('dragStart', event, item, index, key),
      onDragEnd: (event, item, index, key) => emit('dragEnd', event, item, index, key),
      focusHandle,
    });

    const moveClass = computed(() =>
      props.animated ? classHelper.e('item-move') : classHelper.e('item-move-disabled'),
    );

    expose({
      move: (oldIndex: number, newIndex: number) => sortable.move(oldIndex, newIndex),
    });

    return () => {
      const RootTag = resolveDynamicComponent(props.tag) as any;
      const ItemTag = resolveDynamicComponent(props.itemTag) as any;
      const items = props.modelValue.map((item, index) => {
        const key = sortable.getKey(item, index);
        const itemDisabled = sortable.isItemDisabled(item, index);
        const dragging = sortable.draggingKey.value === key;
        const dropPosition =
          sortable.dropTarget.value?.key === key ? sortable.dropTarget.value.position : undefined;
        const scope = { item, index, dragging, disabled: itemDisabled };
        const draggable = !itemDisabled && !props.dragOnHandler;

        return (
          <ItemTag
            key={key}
            role="listitem"
            data-sortable-key={String(key)}
            class={cls(
              classHelper.e('item'),
              classHelper.is('dragging', dragging),
              classHelper.is('disabled', itemDisabled),
              classHelper.is('drag-over', !!dropPosition),
            )}
            draggable={draggable}
            onDragstart={
              draggable ? (event: DragEvent) => sortable.onDragStart(event, item, index) : undefined
            }
            onDragend={
              draggable ? (event: DragEvent) => sortable.onDragEnd(event, item, index) : undefined
            }
            onDragover={(event: DragEvent) => sortable.onDragOver(event, item, index)}
            onDragleave={(event: DragEvent) => sortable.onDragLeave(event, item, index)}
            onDrop={(event: DragEvent) => sortable.onDrop(event, item, index)}
          >
            {dropPosition && (
              <span
                aria-hidden="true"
                class={cls(classHelper.e('drop-indicator'), classHelper.is(dropPosition))}
              />
            )}
            <span
              ref={(element: Element | ComponentPublicInstance | null) =>
                setHandleRef(key, element)
              }
              role="button"
              tabindex={itemDisabled ? -1 : 0}
              aria-disabled={itemDisabled || undefined}
              aria-label={String(dragHandleText.value ?? '').replace('{index}', String(index + 1))}
              class={cls(classHelper.e('handle'), classHelper.is('disabled', itemDisabled))}
              draggable={!itemDisabled && props.dragOnHandler}
              onDragstart={
                !itemDisabled && props.dragOnHandler
                  ? (event: DragEvent) => sortable.onDragStart(event, item, index)
                  : undefined
              }
              onDragend={
                !itemDisabled && props.dragOnHandler
                  ? (event: DragEvent) => sortable.onDragEnd(event, item, index)
                  : undefined
              }
              onKeydown={(event: KeyboardEvent) => sortable.onHandleKeydown(event, item, index)}
            >
              {slots.handle?.(scope) ?? <IconDragForm />}
            </span>
            <div class={classHelper.e('content')}>{slots.item?.(scope) ?? String(item)}</div>
          </ItemTag>
        );
      });

      return (
        <>
          {items.length ? (
            <SortableTransitionGroup
              {...attrs}
              tag={props.tag}
              role="list"
              aria-disabled={props.disabled || undefined}
              name={`${useLowCaseNamespace()}-sortable-list`}
              moveClass={moveClass.value}
              class={cls(
                classHelper.block,
                attrs.class as any,
                classHelper.is('disabled', props.disabled),
              )}
              style={attrs.style as CSSProperties}
            >
              {items}
            </SortableTransitionGroup>
          ) : (
            <RootTag
              {...attrs}
              role="list"
              aria-disabled={props.disabled || undefined}
              class={cls(
                classHelper.block,
                attrs.class as any,
                classHelper.is('disabled', props.disabled),
              )}
              style={attrs.style as CSSProperties}
            >
              {slots.empty?.()}
            </RootTag>
          )}
          <span class={`${useLowCaseNamespace()}-sr-only`} role="status" aria-live="polite">
            {announcement.value}
          </span>
        </>
      );
    };
  },
});
