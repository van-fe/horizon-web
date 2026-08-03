import {
  computed,
  defineComponent,
  inject,
  nextTick,
  provide,
  ref,
  watch,
} from 'vue';
import { ComponentClassBlock, isBoolean, useNamespace } from '@aurora/utils';
import CascaderPanel from './CascaderPanel';
import {
  HCascaderActivatedChildNodeInjectKey,
  HCascaderEmitsInjectKey,
  HCascaderExpandNodeInjectKey,
  HCascaderFocusedOptionInjectKey,
  HCascaderFocusedOptionsStackInjectKey,
  HCascaderLoadingNodesInjectKey,
  HCascaderModelValueInjectKey,
  HCascaderModifyOptionChildrenListInjectKey,
  HCascaderMouseOverOptionInjectKey,
  HCascaderOnClickNodeInjectKey,
  HCascaderOptionListInjectKey,
  HCascaderOptionListMapInjectKey,
  HCascaderPickOptionInjectKey,
  HCascaderPopperVisibleInjectKey,
  HCascaderPresetModelValueInjectKey,
  HCascaderPropsInjectKey,
  HCascaderTreeHelperInjectKey,
  HCascaderVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import type {
  HCascaderExtendOption,
  HCascaderUuidType,
  ModelValueSingleType,
} from '../utils/types';
import CascaderSearchPanel from './CascaderSearchPanel';
import { clamp } from '@vueuse/core';
import { useCascaderPanelsExposes } from '../composables/useExposes';
import VLoading from '~/directives/v-loading/src';

export default defineComponent({
  name: `${useNamespace()}CascaderPanels`,
  components: {
    CascaderPanel,
  },
  directives: {
    VLoading,
  },
  props: {
    duringInput: {
      type: Boolean,
      required: true,
    },
    inputValue: {
      type: String,
      default: '',
    },
    duringComposition: {
      type: Boolean,
    },
    isFocusing: {
      type: Boolean,
    },
  },
  emits: {
    mouseEnter: (evt: MouseEvent) => evt instanceof MouseEvent,
    switchPanelStatus: (status: boolean) => isBoolean(status),
    confirm: (hidePopper: boolean, isTriggerByConfirmClick: boolean) =>
      isBoolean(hidePopper) && isBoolean(isTriggerByConfirmClick),
  },
  exposes: useCascaderPanelsExposes,
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('cascader-panels');

    const parentProps = inject(HCascaderPropsInjectKey)!;
    const parentEmits = inject(HCascaderEmitsInjectKey)!;
    const optionList = inject(HCascaderOptionListInjectKey)!;
    const optionListMap = inject(HCascaderOptionListMapInjectKey)!;
    const pickOption = inject(HCascaderPickOptionInjectKey)!;
    const popperVisible = inject(HCascaderPopperVisibleInjectKey)!;
    const presetModelValueSet = inject(HCascaderPresetModelValueInjectKey)!;
    const modelValueSet = inject(HCascaderModelValueInjectKey)!;
    const modifyChildrenList = inject(HCascaderModifyOptionChildrenListInjectKey)!;
    const visibleOptions = inject(HCascaderVisibleOptionsInjectKey)!;
    const treeHelper = inject(HCascaderTreeHelperInjectKey)!;

    const wrapperDomRef = ref<HTMLDivElement | null>(null);

    const activatedChildNode = ref<HCascaderExtendOption>();
    const loadingNodes = ref(new Set<HCascaderExtendOption>());

    watch(popperVisible, val => {
      if (val) {
        if (presetModelValueSet.value.size > 0) {
          const firstUuid = presetModelValueSet.value.values().next().value!;
          const option = optionListMap.value.get(firstUuid);

          if (parentProps.checkStrictly && parentProps.expandStrictly) {
            expandPanel(option?.parent);
          } else {
            expandPanel(option);
          }
        } else {
          expandPanel();
        }

        presetActiveIndex();
      } else {
        resetActiveIndex();
      }
    });

    watch(optionList, () => {
      refreshCurrentExpandedPanel();
    });

    const defaultRenderPanels = computed(() => {
      const panels: HCascaderExtendOption[][] = [];

      if (optionListMap.value.size > 0) {
        panels.push(optionList.value.filter(curr => curr.level === 0));
      }

      return panels;
    });

    const customRenderPanels = ref<HCascaderExtendOption[][]>([]);
    const renderPanels = computed(() => defaultRenderPanels.value.concat(customRenderPanels.value));

    let currentExpandNode: HCascaderExtendOption | null | undefined = null;

    function expandPanel(currentNode?: HCascaderExtendOption | null) {
      const panels: HCascaderExtendOption[][] = [];

      if (currentNode) {
        const uuidPath = currentNode.uuidPath.concat();

        uuidPath.forEach(uuid => {
          const target = optionListMap.value.get(uuid);
          const childrenList = target?.transformedChildren;
          if ((Array.isArray(childrenList) && childrenList.length > 0) || !target?.isLeaf) {
            panels.push(childrenList || []);
          }
        });
      }

      customRenderPanels.value = panels;
      currentExpandNode = currentNode;
    }

    function refreshCurrentExpandedPanel() {
      if (currentExpandNode) {
        expandPanel(currentExpandNode);
      }
    }

    function shouldAsyncGetChildren(option: HCascaderExtendOption) {
      if (!option.isLeaf && option.transformedChildren.length === 0 && parentProps.dynamicLoad) {
        loadingNodes.value.add(option);

        Promise.resolve(
          parentProps.dynamicLoad?.({
            level: option.level,
            options: option.paths.map(curr => curr.originOption),
            vnode: option.vNodeGetter?.(),
          }),
        )
          .then(res => {
            if (res) {
              modifyChildrenList(option, res);

              if (res.length) {
                nextTick(() => {
                  onClickChildNode(option);
                });
              } else {
                expandPanel(option);
              }
            }
          })
          .finally(() => {
            loadingNodes.value.delete(option);
          });

        return true;
      } else {
        return false;
      }
    }

    function expandChildren(
      currentNode: HCascaderExtendOption,
      onRadioOrCheckbox = false,
      forceExpandChildren = false,
    ) {
      if (currentNode.isLeaf) {
        if (customRenderPanels.value.length > currentNode.level) {
          customRenderPanels.value = customRenderPanels.value.slice(0, currentNode.level);
        }
        return;
      }

      if (shouldAsyncGetChildren(currentNode)) {
        return;
      }

      if (onRadioOrCheckbox && parentProps.checkStrictly && !forceExpandChildren) {
        if (parentProps.expandStrictly) {
          expandPanel(currentNode.parent);
          return;
        }
      }

      if (currentNode.passingDisabled && !parentProps.checkStrictly) {
        return;
      }

      expandPanel(currentNode);
    }

    function getChildrenCheckedStatus(
      childrenList: HCascaderExtendOption[],
    ): 'all' | 'none' | 'ind' {
      const checkedAmount: number = childrenList.reduce((prev, curr) => {
        if (!curr.isLeaf && Array.isArray(curr.transformedChildren)) {
          const status = getChildrenCheckedStatus(curr.transformedChildren);
          return prev + (status === 'all' ? 1 : 0);
        } else {
          return prev + (presetModelValueSet.value.has(curr._uuid) ? 1 : 0);
        }
      }, 0);

      return checkedAmount === childrenList.length ? 'all' : checkedAmount === 0 ? 'none' : 'ind';
    }

    function pickAllLeafChildren(node: HCascaderExtendOption, positive: boolean) {
      if (node.disabled || node.selectable === false) return;

      if (node.isLeaf) {
        if (
          (positive && !presetModelValueSet.value.has(node._uuid)) ||
          (!positive && presetModelValueSet.value.has(node._uuid))
        ) {
          pickOption(node._uuid, true, false, false);
        }
      } else {
        node.transformedChildren.forEach(item => pickAllLeafChildren(item, positive));
      }
    }

    function onClickChildNode(
      childNodeOption: HCascaderExtendOption,
      onRadioOrCheckbox = false,
      forceExpandChildren = false,
    ) {
      if (childNodeOption.disabled || childNodeOption.passingDisabled) {
        if (!parentProps.checkStrictly) return;
      }

      expandChildren(childNodeOption, onRadioOrCheckbox, forceExpandChildren);

      if (childNodeOption.selectable === false) return;

      if (onRadioOrCheckbox) {
        if (!parentProps.multiple && presetModelValueSet.value.has(childNodeOption._uuid)) {
          return;
        }

        if (!childNodeOption.isLeaf) {
          if (parentProps.checkStrictly) {
            pickOption(childNodeOption._uuid);
          } else if (
            !childNodeOption.disabled &&
            !parentProps.checkStrictly &&
            !childNodeOption.passingDisabled
          ) {
            pickAllLeafChildren(
              childNodeOption,
              getChildrenCheckedStatus(childNodeOption.transformedChildren) !== 'all',
            );

            const checkedUuids = Array.from(presetModelValueSet.value.values());

            const isFullChecked = treeHelper.isNodeCheckedForCheckbox(
              childNodeOption,
              checkedUuids,
              false,
            );

            parentEmits(
              'change',
              isFullChecked ||
                treeHelper.isNodeIndeterminateForCheckbox(childNodeOption, checkedUuids),
              childNodeOption,
            );
          }
        } else {
          // 叶子结点
          pickOption(childNodeOption._uuid);
        }
      } else if (
        childNodeOption.isLeaf ||
        (parentProps.checkStrictly && !parentProps.multiple && !parentProps.showRadio)
      ) {
        if (!parentProps.multiple && presetModelValueSet.value.has(childNodeOption._uuid)) {
          return;
        }
        pickOption(childNodeOption._uuid, false);
      }

      focusOption(childNodeOption._uuid);
    }

    /*** keyboard events ***/
    const activePanelIndex = ref(0);
    const activeItemIndex = ref(-1);
    const focusedFilterOption = ref<HCascaderExtendOption>();
    const activePanelChildren = computed(() =>
      renderPanels.value
        ?.at(activePanelIndex.value)
        ?.filter(
          curr =>
            !curr.disabled &&
            (parentProps.checkStrictly || !curr.passingDisabled) &&
            !curr.groupLabel,
        ),
    );
    const activeItemOption = computed(
      () =>
        focusedFilterOption.value ??
        (activeItemIndex.value > -1
          ? activePanelChildren.value?.at(activeItemIndex.value)
          : undefined),
    );
    const activeItemsStack = ref<HCascaderExtendOption[]>([]);

    function resetActiveIndex() {
      activePanelIndex.value = 0;
      activeItemIndex.value = -1;
      focusedFilterOption.value = undefined;
      activeItemsStack.value = [];
    }

    watch(
      () => props.duringInput,
      () => {
        void nextTick(() => {
          presetActiveIndex();
        });
      },
    );

    /*** in filter mode***/
    function focusOptionWhileFilter(uuid: HCascaderUuidType) {
      focusedFilterOption.value = optionListMap.value.get(uuid);
    }

    provide(HCascaderMouseOverOptionInjectKey, focusOptionWhileFilter);

    function onArrowUpOrDownOnSearchingResults(evt: KeyboardEvent) {
      let index = -1;

      const filteredVisibleOptions = visibleOptions.value.filter(
        curr =>
          !curr.disabled &&
          (parentProps.checkStrictly || !curr.passingDisabled) &&
          !curr.groupLabel,
      );

      if (filteredVisibleOptions.length === 0) return;

      if (focusedFilterOption.value) {
        index = filteredVisibleOptions.indexOf(focusedFilterOption.value);
      }

      index =
        index === -1
          ? evt.key === 'ArrowUp'
            ? filteredVisibleOptions.length - 1
            : 0
          : clamp(
              index + (evt.key === 'ArrowUp' ? -1 : 1),
              0,
              filteredVisibleOptions.length - 1,
            );

      focusedFilterOption.value = filteredVisibleOptions.at(index);
    }

    /*** in normal mode***/
    function presetActiveIndex() {
      const uuid = modelValueSet.value.values().next().value;

      resetActiveIndex();

      if (uuid !== undefined) {
        if (props.duringInput) {
          focusOptionWhileFilter(uuid);
        } else {
          focusOption(uuid);
        }
      }
    }

    function focusOption(uuid: HCascaderUuidType) {
      activeItemsStack.value = [];

      const currentActiveNode = optionListMap.value.get(uuid) || null;

      activePanelIndex.value = currentActiveNode?.level || 0;

      activeItemsStack.value = currentActiveNode?.paths.concat() || [];

      activeItemIndex.value =
        activePanelChildren.value?.findIndex(item => item._uuid === currentActiveNode?._uuid) ?? -1;
    }

    function onArrowUpOrDown(evt: KeyboardEvent) {
      const itemCount = activePanelChildren.value?.length ?? 0;
      if (itemCount === 0) return;

      activeItemIndex.value =
        activeItemIndex.value === -1
          ? evt.key === 'ArrowUp'
            ? itemCount - 1
            : 0
          : clamp(
              activeItemIndex.value + (evt.key === 'ArrowUp' ? -1 : 1),
              0,
              itemCount - 1,
            );

      if (activeItemOption.value) {
        activeItemsStack.value.splice(activePanelIndex.value, 1, activeItemOption.value);
      }
    }

    function onArrowLeftOrRight(evt: KeyboardEvent) {
      if (evt.key === 'ArrowRight') {
        if (activeItemOption.value && !activeItemOption.value.isLeaf) {
          expandChildren(activeItemOption.value, false);
          if (activeItemOption.value.transformedChildren.length > 0) {
            activeItemsStack.value.splice(activePanelIndex.value, 1, activeItemOption.value);
            activePanelIndex.value = Math.min(
              activePanelIndex.value + 1,
              renderPanels.value.length - 1,
            );
            activeItemIndex.value = activePanelChildren.value?.length ? 0 : -1;
            if (activeItemOption.value) {
              activeItemsStack.value.splice(activePanelIndex.value, 1, activeItemOption.value);
            }
          }
        }
      } else if (activePanelIndex.value > 0) {
        activeItemsStack.value.pop();
        activePanelIndex.value -= 1;
        const parent = activeItemsStack.value.at(-1);
        activeItemIndex.value =
          activePanelChildren.value?.findIndex(item => item._uuid === parent?._uuid) ?? -1;
      }
    }

    function onHomeOrEnd(evt: KeyboardEvent) {
      const options = props.duringInput
        ? visibleOptions.value.filter(
            curr =>
              !curr.disabled &&
              (parentProps.checkStrictly || !curr.passingDisabled) &&
              !curr.groupLabel,
          )
        : activePanelChildren.value;

      if (!options?.length) return;

      const index = evt.key === 'Home' ? 0 : options.length - 1;
      if (props.duringInput) {
        focusedFilterOption.value = options[index];
      } else {
        activeItemIndex.value = index;
        activeItemsStack.value.splice(activePanelIndex.value, 1, options[index]);
      }
    }

    function onKeyboard(evt: KeyboardEvent) {
      if (
        evt.key === 'Backspace' &&
        props.inputValue?.length === 0 &&
        !props.duringComposition &&
        parentProps.panelFilterOption === false
      ) {
        if (modelValueSet.value.size > 0) {
          pickOption(Array.from(modelValueSet.value.values()).at(-1)!, true, true);
        }
      }

      if (['ArrowDown', 'ArrowUp'].includes(evt.key)) {
        evt.preventDefault();

        if (!popperVisible.value) {
          emit('switchPanelStatus', true);
          return;
        }

        if (props.duringInput) {
          onArrowUpOrDownOnSearchingResults(evt);
        } else {
          onArrowUpOrDown(evt);
        }
      }

      if (['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
        evt.preventDefault();
        if (popperVisible.value && !props.duringInput) {
          onArrowLeftOrRight(evt);
        }
      }

      if (['Home', 'End'].includes(evt.key) && popperVisible.value) {
        evt.preventDefault();
        onHomeOrEnd(evt);
      }

      if (evt.key === 'Enter') {
        evt.preventDefault();
        if (popperVisible.value && activeItemOption.value) {
          onClickChildNode(activeItemOption.value, true, true);
        } else {
          emit('switchPanelStatus', true);
        }
      }

      if (evt.key === 'Escape') {
        emit('switchPanelStatus', false);
      }
    }

    function onMouseEnter(evt: MouseEvent) {
      emit('mouseEnter', evt);
      // resetActiveIndex();
    }

    expose({
      keyboardEventDeal: onKeyboard,
      focusOption: (valuePath: ModelValueSingleType) => {
        const target = treeHelper.getInfoByPath(valuePath);

        if (target) {
          expandPanel(target);
          focusOption(target._uuid);
        }
      },
    });

    provide(HCascaderLoadingNodesInjectKey, loadingNodes);
    provide(HCascaderOnClickNodeInjectKey, onClickChildNode);
    provide(HCascaderExpandNodeInjectKey, expandChildren);
    provide(HCascaderActivatedChildNodeInjectKey, activatedChildNode);
    provide(HCascaderFocusedOptionInjectKey, activeItemOption);
    provide(HCascaderFocusedOptionsStackInjectKey, activeItemsStack);

    return () =>
      props.duringInput ? (
        <CascaderSearchPanel onConfirm={() => emit('confirm', false, false)} />
      ) : (
        <div
          v-loading={parentProps.panelsLoading}
          ref={wrapperDomRef}
          class={classHelper.block}
          onMouseenter={onMouseEnter}
        >
          {renderPanels.value.map((panelList, index) => (
            <CascaderPanel list={panelList} data-index={index} />
          ))}
        </div>
      );
  },
});
