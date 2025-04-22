import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@nio-fe/shared';
import {
  computed,
  defineComponent,
  Fragment,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
  toRefs,
} from 'vue';
import { useTreeItemProps } from '../composables/useProps';
import { NTooltip } from '~/components/Tooltip';
import {
  NTreeDragFromNodeInjectKey,
  NTreeDragToNodeUuidInjectKey,
  NTreeEmitsInjectKey,
  NTreeExpandedNodesUuidInjectKey,
  NTreeFilterInputValueInjectKey,
  NTreeFullCheckedValuesInjectKey,
  NTreeHalfCheckedValuesInjectKey,
  NTreeHelperInjectKey,
  NTreeHighlightMethodInjectKey,
  NTreeIsDraggingInjectKey,
  NTreeLoadingNodesInjectKey,
  NTreeOnDragStartInjectKey,
  NTreePropsInjectKey,
  NTreeSizeInjectKey,
  NTreeSlotsInjectKey,
  NTreeSwitchNodeExpandStatusInjectKey,
  NTreeSwitchNodeSelectedStatusInjectKey,
  NTreeVNodeCollectionInjectKey,
} from '../utils/injectKeys';
import { renderIcon } from '~/utils/useIcon';
import { iconSizeMapping } from '../utils/config';
import { NCheckbox } from '~/components/Checkbox';
import { NRadio } from '~/components/Radio';
import { IconLoadingLine } from '@nio-fe/icon';
import SafeHtml from '~/directives/v-safe-html/src';
import usePadding from '../hooks/usePadding';
import useLine from '../hooks/useLine';

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

    const { value: valueProp, shadow: shadowProp, indent: indentProp } = toRefs(props);

    const treeHelper = inject(NTreeHelperInjectKey)!;
    const parentProps = inject(NTreePropsInjectKey)!;
    const parentEmit = inject(NTreeEmitsInjectKey)!;
    const parentSlots = inject(NTreeSlotsInjectKey)!;
    const size = inject(NTreeSizeInjectKey)!;
    const filterInputValue = inject(NTreeFilterInputValueInjectKey)!;
    const expandedNodesUuid = inject(NTreeExpandedNodesUuidInjectKey)!;
    const switchExpandStatus = inject(NTreeSwitchNodeExpandStatusInjectKey)!;
    const switchCheckedStatus = inject(NTreeSwitchNodeSelectedStatusInjectKey)!;
    const highlightMethod = inject(NTreeHighlightMethodInjectKey)!;
    const loadingNodes = inject(NTreeLoadingNodesInjectKey)!;
    const vNodeCollection = inject(NTreeVNodeCollectionInjectKey)!;
    const fullCheckedValues = inject(NTreeFullCheckedValuesInjectKey)!;
    const halfCheckedValues = inject(NTreeHalfCheckedValuesInjectKey)!;
    const onDragStart = inject(NTreeOnDragStartInjectKey)!;
    const isDragging = inject(NTreeIsDraggingInjectKey)!;
    const dragToNodeUuid = inject(NTreeDragToNodeUuidInjectKey)!;
    const dragFromNode = inject(NTreeDragFromNodeInjectKey)!;

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
    });

    return () => {
      const label =
        typeof valueProp.value.label === 'string'
          ? !!filterInputValue?.value
            ? highlightMethod.value(filterInputValue?.value ?? '', valueProp.value)
            : valueProp.value.label
          : valueProp.value.label(valueProp.value);

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
          {parentProps.draggableIcon && parentProps.draggable && isDraggable.value && (
            <div
              class={cls(
                classHelper.e('icon'),
                classHelper.e('draggable-icon'),
                classHelper.is(
                  'always-visible',
                  isDraggable.value && parentProps.draggableIconAlwaysVisible,
                ),
              )}
              onMousedown={parentProps.dragOnHandler ? onMouseDown : undefined}
            >
              {renderIcon(parentProps.draggableIcon, undefined, {
                size: iconSizeMapping[size.value],
              })}
            </div>
          )}
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
                  <NCheckbox
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
                  <NRadio
                    modelValue={isChecked.value}
                    value={true}
                    disabled={isDisabled.value || valueProp.value.selectable === false}
                  />
                </div>
              )}
          <div class={cls(classHelper.em('content', 'wrapper'))}>
            {typeof valueProp.value.label === 'function' || !parentSlots.treeNodeRender ? (
              <NTooltip
                overflow={true}
                showAfter={parentProps.tooltipShowAfter}
                hideAfter={parentProps.tooltipHideAfter}
              >
                {{
                  content: () => label,
                  default: () => (
                    <div
                      class={cls(
                        classHelper.e('content'),
                        classHelper.is('ellipsis', parentProps.tooltip),
                      )}
                    >
                      {label}
                    </div>
                  ),
                }}
              </NTooltip>
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
