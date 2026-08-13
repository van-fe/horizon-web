import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  watch,
} from 'vue';
import {
  CascaderDynamicLoadController,
  reduceCascaderNavigation,
  type CascaderNavigationKey,
} from '@aurora/core';
import {
  createCascaderPanelNavigation,
  type CascaderPanelNavigation,
} from '@aurora/horizon-web-core';
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
  HCascaderOption,
  HCascaderUuidType,
  ModelValueSingleType,
} from '../utils/types';
import CascaderSearchPanel from './CascaderSearchPanel';
import { clamp } from '@vueuse/core';
import { useCascaderPanelsExposes } from '../composables/useExposes';
import VLoading from '~/directives/v-loading/src';
import { toCoreCascaderOption } from '../utils/coreAdapter';

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
    treeId: {
      type: String,
      required: true,
    },
  },
  emits: {
    activeOptionIdChange: (id: string | undefined) => id === undefined || typeof id === 'string',
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
    let panelNavigation: CascaderPanelNavigation | undefined;

    const activatedChildNode = ref<HCascaderExtendOption>();
    const loadingNodes = ref(new Set<HCascaderExtendOption>());
    const dynamicLoadController = new CascaderDynamicLoadController<HCascaderOption>();

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
    watch(
      () => [parentProps.options, parentProps.fieldMap, parentProps.dynamicLoad] as const,
      () => dynamicLoadController.invalidate(),
      { deep: true },
    );

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
        const coreOption = toCoreCascaderOption(option);
        loadingNodes.value.add(option);
        void dynamicLoadController
          .load(coreOption, () =>
            parentProps.dynamicLoad!({
              level: option.level,
              options: option.paths.map(curr => curr.originOption),
              vnode: option.vNodeGetter?.(),
            }),
          )
          .then(result => {
            if (result.status !== 'loaded') return;
            if (!Array.isArray(result.children)) return;
            const children = result.children.slice() as HCascaderOption[];
            modifyChildrenList(option, children);
            if (children.length) {
              onClickChildNode(option);
            } else {
              expandPanel(option);
            }
          })
          .finally(() => {
            if (!dynamicLoadController.pendingIds.includes(coreOption.id)) {
              loadingNodes.value.delete(option);
            }
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

    watch(
      wrapperDomRef,
      container => {
        panelNavigation?.destroy();
        panelNavigation = container ? createCascaderPanelNavigation({ container }) : undefined;
      },
      { flush: 'post' },
    );

    watch(activeItemOption, option => {
      emit('activeOptionIdChange', option ? `h-cascader-option-${option._uuid}` : undefined);
      if (option) {
        void nextTick(() => panelNavigation?.scrollOptionIntoView(String(option._uuid)));
      }
    });

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
          : clamp(index + (evt.key === 'ArrowUp' ? -1 : 1), 0, filteredVisibleOptions.length - 1);

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

    function findOptionByCoreId(id: number | undefined) {
      if (id === undefined) return undefined;
      return optionList.value.find(option => toCoreCascaderOption(option).id === id);
    }

    function navigateNormalPanel(key: CascaderNavigationKey) {
      const current = activeItemOption.value;
      const result = reduceCascaderNavigation(
        optionList.value
          .filter(option => option.level === 0)
          .map(option => toCoreCascaderOption(option)),
        {
          open: popperVisible.value,
          activeId: current ? toCoreCascaderOption(current).id : undefined,
        },
        key,
        parentProps.checkStrictly,
      );

      if (result.action === 'open') {
        emit('switchPanelStatus', true);
      } else if (result.action === 'close') {
        emit('switchPanelStatus', false);
      } else if (result.action === 'activate' && current) {
        onClickChildNode(current, true, true);
      } else if (result.action === 'focus') {
        const target = findOptionByCoreId(result.state.activeId);
        if (target) {
          if (key === 'ArrowRight' && current) expandChildren(current, false);
          focusOption(target._uuid);
        }
      } else if (key === 'ArrowRight' && current && !current.isLeaf) {
        // A lazy branch has no Core children until its loader resolves.
        expandChildren(current, false);
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
          const committedValues = Array.from(modelValueSet.value.values());
          presetModelValueSet.value = new Set(committedValues);
          pickOption(committedValues.at(-1)!, true, true);
        }
      }

      if (['ArrowDown', 'ArrowUp'].includes(evt.key)) {
        evt.preventDefault();
        if (props.duringInput) {
          if (!popperVisible.value) emit('switchPanelStatus', true);
          else onArrowUpOrDownOnSearchingResults(evt);
        } else {
          navigateNormalPanel(evt.key as CascaderNavigationKey);
        }
      }

      if (['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
        evt.preventDefault();
        if (popperVisible.value && !props.duringInput) {
          navigateNormalPanel(evt.key as CascaderNavigationKey);
        }
      }

      if (['Home', 'End'].includes(evt.key) && popperVisible.value) {
        evt.preventDefault();
        if (props.duringInput) {
          const options = visibleOptions.value.filter(
            option =>
              !option.disabled &&
              (parentProps.checkStrictly || !option.passingDisabled) &&
              !option.groupLabel,
          );
          focusedFilterOption.value = evt.key === 'Home' ? options[0] : options.at(-1);
        } else {
          navigateNormalPanel(evt.key as CascaderNavigationKey);
        }
      }

      if (evt.key === 'Enter') {
        evt.preventDefault();
        if (!props.duringInput) {
          navigateNormalPanel('Enter');
        } else if (popperVisible.value && activeItemOption.value) {
          onClickChildNode(activeItemOption.value, true, true);
        } else {
          emit('switchPanelStatus', true);
        }
      }

      if (evt.key === 'Escape') {
        if (props.duringInput) emit('switchPanelStatus', false);
        else navigateNormalPanel('Escape');
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

    onBeforeUnmount(() => {
      panelNavigation?.destroy();
      dynamicLoadController.destroy();
      loadingNodes.value.clear();
    });

    return () =>
      props.duringInput ? (
        <CascaderSearchPanel
          treeId={props.treeId}
          onConfirm={() => emit('confirm', false, false)}
        />
      ) : (
        <div
          v-loading={parentProps.panelsLoading}
          ref={wrapperDomRef}
          class={classHelper.block}
          id={props.treeId}
          role="tree"
          aria-multiselectable={parentProps.multiple || undefined}
          aria-busy={loadingNodes.value.size > 0 || undefined}
          aria-activedescendant={
            activeItemOption.value ? `h-cascader-option-${activeItemOption.value._uuid}` : undefined
          }
          onMouseenter={onMouseEnter}
        >
          {renderPanels.value.map((panelList, index) => (
            <CascaderPanel list={panelList} data-index={index} />
          ))}
        </div>
      );
  },
});
