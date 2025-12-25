import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@aurora/utils';
import {
  computed,
  defineComponent,
  Fragment,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
} from 'vue';
import { useTreeItemProps } from '../composables/useProps';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import {
  HTreeDragFromNodeInjectKey,
  HTreeDragToNodeUuidInjectKey,
  HTreeEmitsInjectKey,
  HTreeExpandedNodesUuidInjectKey,
  HTreeFilterInputValueInjectKey,
  HTreeFullCheckedValuesInjectKey,
  HTreeHalfCheckedValuesInjectKey,
  HTreeHelperInjectKey,
  HTreeHighlightMethodInjectKey,
  HTreeIsDraggingInjectKey,
  HTreeLoadingNodesInjectKey,
  HTreeOnDragStartInjectKey,
  HTreePropsInjectKey,
  HTreeSizeInjectKey,
  HTreeSlotsInjectKey,
  HTreeSwitchNodeExpandStatusInjectKey,
  HTreeSwitchNodeSelectedStatusInjectKey,
  HTreeVNodeCollectionInjectKey,
} from '../utils/injectKeys';
import { renderIcon } from '~/utils/useIcon';
import { iconSizeMapping } from '../utils/config';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import HRadio from '~/components/Radio/src/Radio';
import { IconLoadingLine } from '@aurora/icon';
import SafeHtml from '~/directives/v-safe-html/src';
import usePadding from '../hooks/usePadding';
import useLine from '../hooks/useLine';
import { useHighlightTreeItem } from '../hooks/useHighlight';

export default defineComponent({
  name: `${useNamespace()}TreeItem`,
  directives: {
    safeHtml: SafeHtml,
  },
  props: useTreeItemProps,
  setup(props) {
    const classHelper = new ComponentClassBlock('tree-item');

    const instance = getCurrentInstance();

    const wrapperDomRef = ref<HTMLDivElement | null>(null);
    const contentDomRef = ref<HTMLDivElement>();

    const { value: valueProp, shadow: shadowProp, indent: indentProp } = toRefs(props);

    const treeHelper = inject(HTreeHelperInjectKey)!;
    const parentProps = inject(HTreePropsInjectKey)!;
    const parentEmit = inject(HTreeEmitsInjectKey)!;
    const parentSlots = inject(HTreeSlotsInjectKey)!;
    const size = inject(HTreeSizeInjectKey)!;
    const filterInputValue = inject(HTreeFilterInputValueInjectKey)!;
    const expandedNodesUuid = inject(HTreeExpandedNodesUuidInjectKey)!;
    const switchExpandStatus = inject(HTreeSwitchNodeExpandStatusInjectKey)!;
    const switchCheckedStatus = inject(HTreeSwitchNodeSelectedStatusInjectKey)!;
    const highlightMethod = inject(HTreeHighlightMethodInjectKey)!;
    const loadingNodes = inject(HTreeLoadingNodesInjectKey)!;
    const vNodeCollection = inject(HTreeVNodeCollectionInjectKey)!;
    const fullCheckedValues = inject(HTreeFullCheckedValuesInjectKey)!;
    const halfCheckedValues = inject(HTreeHalfCheckedValuesInjectKey)!;
    const onDragStart = inject(HTreeOnDragStartInjectKey)!;
    const isDragging = inject(HTreeIsDraggingInjectKey)!;
    const dragToNodeUuid = inject(HTreeDragToNodeUuidInjectKey)!;
    const dragFromNode = inject(HTreeDragFromNodeInjectKey)!;

    const isLoading = computed(() =>
      loadingNodes.value.some(curr => curr._uuid === valueProp.value._uuid),
    );
    const isExpanded = computed(() => expandedNodesUuid.has(valueProp.value._uuid));

    const { paddingLeft, getPadding } = usePadding(parentProps, {
      treeItem: valueProp,
      isLoading,
      treeHelper,
      indent: indentProp,
    });

    const { renderParentShownLine } = useLine(parentProps, {
      treeItem: valueProp,
      treeHelper,
      getPadding,
      expandedNodesUuid,
    });

    const isChecked = computed(() => fullCheckedValues.value.includes(valueProp.value._uuid));

    const isIndeterminate = computed(() => halfCheckedValues.value.includes(valueProp.value._uuid));

    const isDisabled = computed(
      () =>
        parentProps.disabled ||
        (parentProps.checkStrictly
          ? valueProp.value.disabled
          : valueProp.value.passingDisabled || valueProp.value.disabled) ||
        (!fullCheckedValues.value.includes(valueProp.value._uuid) &&
          fullCheckedValues.value.length >= parentProps.multipleLimit) ||
        false,
    );

    const isDraggable = computed(
      () => parentProps.draggable && !isDisabled.value && valueProp.value.draggable !== false,
    );
    const isDragOver = computed(
      () =>
        isDragging.value &&
        dragToNodeUuid.value?.toString?.() === valueProp.value._uuid.toString() &&
        dragFromNode.value?._uuid.toString() !== valueProp.value._uuid.toString(),
    );
    //  &&
    //         (parentProps.dragToDifferentParent
    //           ? true
    //           : dragFromNode.value?.parent?._uuid.toString() ===
    //             (valueProp.value.isLeaf
    //               ? valueProp.value.parent?._uuid.toString()
    //               : valueProp.value._uuid.toString()))
    const canDragToLeaf = computed(() => parentProps.dragToLeaf);

    const { startWatch, stopWatch } = useHighlightTreeItem(props, {
      contentDomRef,
    });

    function onClick(evt: MouseEvent) {
      if (parentProps.expandOnClickNode && !treeHelper.getOptionValue(valueProp.value, 'isLeaf')) {
        switchExpandStatus(valueProp.value, evt, instance?.vnode);
      }

      if (
        ((!treeHelper.getOptionValue(valueProp.value, 'isLeaf') && parentProps.checkOnClickNode) ||
          (treeHelper.getOptionValue(valueProp.value, 'isLeaf') &&
            ((parentProps.multiple && parentProps.checkOnClickLeaf) ||
              (!parentProps.multiple && parentProps.showRadio && parentProps.checkOnClickLeaf) ||
              (!parentProps.multiple && !parentProps.showRadio)))) &&
        !isDisabled.value
      ) {
        switchCheckedStatus(valueProp.value._uuid, !isChecked.value, evt, instance?.vnode);
      }

      parentEmit('click', evt, valueProp.value.value, valueProp.value, instance?.vnode);
    }

    function onContentMenu(evt: MouseEvent) {
      evt.preventDefault();
      parentEmit('contextmenu', evt, valueProp.value.value, valueProp.value, instance?.vnode);
    }

    function onClickExpandIcon(evt: MouseEvent) {
      evt.stopPropagation();
      switchExpandStatus(valueProp.value, evt, instance?.vnode);
    }

    function onClickCheckbox(evt: MouseEvent) {
      if (!isDisabled.value) {
        evt.stopPropagation();
        switchCheckedStatus(valueProp.value._uuid, !isChecked.value, evt, instance?.vnode);
      }
    }

    function onMouseDown(evt: MouseEvent) {
      if (isDraggable.value) {
        onDragStart(wrapperDomRef, valueProp.value, evt);
      }
    }

    onMounted(() => {
      if (!shadowProp.value) {
        vNodeCollection(valueProp.value._uuid, instance?.vnode);
      }

      setTimeout(() => {
        !highlightMethod.value && startWatch();
      });
    });

    onBeforeUnmount(() => {
      stopWatch();
    });

    return () => {
      const rawLabel = treeHelper.getOptionValue(valueProp.value, 'label');

      const label =
        typeof rawLabel === 'string'
          ? highlightMethod.value
            ? highlightMethod.value(filterInputValue?.value ?? '', valueProp.value)
            : rawLabel
          : rawLabel(valueProp.value);

      return (
        <div
          ref={wrapperDomRef}
          class={cls(
            classHelper.block,
            classHelper.is('checked', isChecked.value),
            classHelper.is(
              'stress',
              parentProps.stress && (parentProps.multiple ? true : valueProp.value.isLeaf),
            ),
            classHelper.is('clickable', parentProps.expandOnClickNode),
            classHelper.is('draggable', isDraggable.value),
            classHelper.is('draggable-whole', !parentProps.dragOnHandler),
            classHelper.is(
              'dragging',
              dragFromNode.value?._uuid?.toString() === valueProp.value._uuid.toString() &&
                isDragging.value,
            ),
            classHelper.is('drag-over', isDragOver.value),
            classHelper.is('disabled', isDisabled.value),
            classHelper.is('shadow', shadowProp.value),
          )}
          style={{
            paddingLeft: paddingLeft.value + 'px',
          }}
          draggable={false}
          data-level={valueProp.value.level}
          data-uuid={valueProp.value._uuid}
          data-children-amount={valueProp.value.transformedChildren.length || 0}
          onClick={onClick}
          onContextmenu={onContentMenu}
          onMousedown={!parentProps.dragOnHandler ? onMouseDown : undefined}
        >
          {renderParentShownLine()}
          {isDragOver.value && (
            <Fragment>
              <div class={cls(classHelper.e('drag-over-wrap'), classHelper.is('sibling'))}>
                <div
                  class={classHelper.e('drag-over-cursor')}
                  style={{
                    width: `calc(100% - ${paddingLeft.value}px - ((${cssVariable(
                      'tree-size--drag-over-cursor-arrow',
                    )} + ${cssVariable('tree-height--drag-over-cursor')} * 2))`,
                  }}
                />
              </div>
              {(!treeHelper.getOptionValue(valueProp.value, 'isLeaf') ||
                (treeHelper.getOptionValue(valueProp.value, 'isLeaf') && canDragToLeaf.value)) && (
                <div
                  class={cls(classHelper.e('drag-over-wrap'), classHelper.is('child'))}
                  style={{
                    width: `calc(100% - ${
                      paddingLeft.value +
                      parentProps.indent +
                      ((parentProps.showCheckbox && parentProps.multiple) ||
                      (parentProps.showRadio &&
                        !treeHelper.getOptionValue(valueProp.value, 'isLeaf') &&
                        !parentProps.multiple) ||
                      !!parentProps.checkable
                        ? 24
                        : 0)
                    }px - (((${cssVariable('tree-size--drag-over-cursor-arrow')} + ${cssVariable(
                      'tree-height--drag-over-cursor',
                    )} * 2) * 2))`,
                  }}
                >
                  <div class={classHelper.e('drag-over-cursor')}></div>
                </div>
              )}
            </Fragment>
          )}
          {parentProps.draggable
            ? isDraggable.value
              ? parentProps.draggableIcon && (
                  <div
                    class={cls(
                      classHelper.e('icon'),
                      classHelper.e('draggable-icon'),
                      classHelper.is('always-visible', parentProps.draggableIconAlwaysVisible),
                    )}
                    onMousedown={parentProps.dragOnHandler ? onMouseDown : undefined}
                  >
                    {renderIcon(parentProps.draggableIcon, undefined, {
                      size: iconSizeMapping[size.value],
                    })}
                  </div>
                )
              : parentProps.undraggableIcon && (
                  <div
                    class={cls(
                      classHelper.e('icon'),
                      classHelper.e('draggable-icon'),
                      classHelper.is('disabled'),
                      classHelper.is('always-visible', parentProps.draggableIconAlwaysVisible),
                    )}
                  >
                    {renderIcon(parentProps.undraggableIcon, undefined, {
                      size: iconSizeMapping[size.value],
                    })}
                  </div>
                )
            : undefined}
          {isLoading.value ? (
            <div
              class={cls(classHelper.e('icon'), classHelper.e('loading-icon'))}
              onMousedown={evt => evt.stopPropagation()}
            >
              <IconLoadingLine />
            </div>
          ) : (
            ((treeHelper.getOptionValue(valueProp.value.originOption, 'isLeaf') === false &&
              treeHelper.getOptionValue(valueProp.value, 'isLeaf') === false) ||
              (treeHelper.getOptionValue(valueProp.value, 'children')?.length || 0) > 0) && (
              <div
                class={cls(
                  classHelper.e('icon'),
                  classHelper.e('expand-icon'),
                  classHelper.is('active', isExpanded.value && !parentProps.expandIcon),
                )}
                onClick={onClickExpandIcon}
                onMousedown={evt => evt.stopPropagation()}
              >
                {renderIcon(
                  !parentProps.expandIcon
                    ? parentProps.foldIcon
                    : isExpanded.value
                      ? parentProps.expandIcon
                      : parentProps.foldIcon,
                  undefined,
                  {
                    size: iconSizeMapping[size.value],
                  },
                )}
              </div>
            )
          )}
          {(!!parentProps.prefixIcon || valueProp.value.prefixIcon) && (
            <div
              class={cls(
                classHelper.e('icon'),
                classHelper.e('prefix-icon'),
                valueProp.value.prefixIconClassName,
              )}
            >
              {renderIcon(valueProp.value.prefixIcon || parentProps.prefixIcon, undefined, {
                size: iconSizeMapping[size.value],
              })}
            </div>
          )}
          {parentProps.multiple
            ? (parentProps.checkable || parentProps.showCheckbox) && (
                <div
                  class={cls(classHelper.e('checkbox'))}
                  onClick={onClickCheckbox}
                  onMousedown={evt => evt.stopPropagation()}
                >
                  <HCheckbox
                    modelValue={isChecked.value}
                    indeterminate={isIndeterminate.value}
                    disabled={isDisabled.value || valueProp.value.selectable === false}
                  />
                </div>
              )
            : parentProps.showRadio &&
              (parentProps.checkStrictly ||
                (!parentProps.checkStrictly &&
                  treeHelper.getOptionValue(valueProp.value, 'isLeaf'))) && (
                <div
                  class={cls(classHelper.e('radio'))}
                  onClick={onClickCheckbox}
                  onMousedown={evt => evt.stopPropagation()}
                >
                  <HRadio
                    modelValue={isChecked.value}
                    value={true}
                    disabled={isDisabled.value || valueProp.value.selectable === false}
                  />
                </div>
              )}
          <div class={cls(classHelper.em('content', 'wrapper'))}>
            {typeof treeHelper.getOptionValue(valueProp.value, 'label') === 'function' ||
            !parentSlots.treeNodeRender ? (
              <HTooltip
                overflow={true}
                showAfter={parentProps.tooltipShowAfter}
                hideAfter={parentProps.tooltipHideAfter}
              >
                {{
                  content: () => label,
                  default: () => (
                    <div
                      ref={contentDomRef}
                      class={cls(
                        classHelper.e('content'),
                        classHelper.is('ellipsis', parentProps.tooltip),
                      )}
                    >
                      {label}
                    </div>
                  ),
                }}
              </HTooltip>
            ) : (
              parentSlots.treeNodeRender?.({
                data: valueProp.value,
                vnode: instance?.vnode,
                vNode: instance?.vnode,
              })
            )}
          </div>
        </div>
      );
    };
  },
});
