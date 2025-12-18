import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';
import { useCascaderItemProp } from '../composables/useProps';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import NRadio from '~/components/Radio/src/Radio';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import useIconRender from '~/utils/useIconRender';
import {
  NCascaderActiveOptionInPanelInjectKey,
  NCascaderChosenOptionListInjectKey,
  NCascaderExpandNodeInjectKey,
  NCascaderFocusedOptionInjectKey,
  NCascaderFocusedOptionsStackInjectKey,
  NCascaderInputStringInjectKey,
  NCascaderIsOutOfLimitInjectKey,
  NCascaderLoadingNodesInjectKey,
  NCascaderMouseOverOptionInjectKey,
  NCascaderOnClickNodeInjectKey,
  NCascaderPropsInjectKey,
  NCascaderRegisterVNodeGetterInjectKey,
  NCascaderSlotsInjectKey,
  NCascaderTreeHelperInjectKey,
} from '../utils/injectKeys';
import { IconArrowRight, IconCheck, NIconSVG } from '@aurora/icon';
import NTransition from '~/components/Transition/src/Transition';
import type { NCascaderUuidType } from '../utils/types';
import { useHighlightCascaderItem } from '../hooks/useHighlight';

export default defineComponent({
  name: `${useNamespace()}CascaderItem`,
  components: {
    NCheckbox,
    NRadio,
    NTooltip,
    IconArrowRight,
    IconCheck,
    NTransition,
  },
  props: useCascaderItemProp,
  setup(props) {
    const classHelper = new ComponentClassBlock('cascader-item');

    const instance = getCurrentInstance();

    const chosenOptionList = inject(NCascaderChosenOptionListInjectKey)!;
    const parentProps = inject(NCascaderPropsInjectKey)!;
    const parentSlots = inject(NCascaderSlotsInjectKey)!;
    const onClickNode = inject(NCascaderOnClickNodeInjectKey)!;
    const expandNode = inject(NCascaderExpandNodeInjectKey)!;
    const inputString = inject(NCascaderInputStringInjectKey)!;
    const focusedOption = inject(NCascaderFocusedOptionInjectKey)!;
    const activeItemsStack = inject(NCascaderFocusedOptionsStackInjectKey)!;
    const registerVNodeGetter = inject(NCascaderRegisterVNodeGetterInjectKey)!;
    const loadingOptions = inject(NCascaderLoadingNodesInjectKey)!;
    const onMouseOverOption = inject(NCascaderMouseOverOptionInjectKey)!;
    const activeOption = inject(NCascaderActiveOptionInPanelInjectKey, ref(undefined));
    const treeHelper = inject(NCascaderTreeHelperInjectKey)!;
    const isOutOfLimit = inject(NCascaderIsOutOfLimitInjectKey)!;

    const itemDomRef = ref<HTMLElement | null>(null);
    const contentDomRef = ref<HTMLElement>();
    const isLoading = computed(() => loadingOptions.value.has(props.extendsOption));

    const isChecked = computed(() =>
      treeHelper.isNodeCheckedForCheckbox(
        props.extendsOption,
        chosenOptionList.value.map(curr => curr._uuid),
        parentProps.checkStrictly,
      ),
    );

    const isIndeterminate = computed(
      () =>
        !props.isLeaf &&
        !isChecked.value &&
        !parentProps.checkStrictly &&
        treeHelper.isNodeIndeterminateForCheckbox(
          props.extendsOption,
          chosenOptionList.value.map(curr => curr._uuid),
        ),
    );

    const isDisabled = computed(() =>
      parentProps.checkStrictly ? props.disabled : props.extendsOption.passingDisabled,
    );

    const isFocus = computed(() =>
      props.duringFilter
        ? focusedOption.value === props.extendsOption
        : focusedOption.value?.paths.includes(props.extendsOption) ??
          activeItemsStack.value?.includes(props.extendsOption) ??
          false,
    );

    const hasIcon = computed(
      () => !props.isLeaf || (isChecked.value && !parentProps.showRadio && !parentProps.multiple),
    );

    watch(
      focusedOption,
      val => {
        if (val && val === props.extendsOption) {
          const doScroll = () =>
            itemDomRef.value?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });

          if (itemDomRef.value) {
            doScroll();
          } else {
            setTimeout(() => {
              doScroll();
            });
          }
        }
      },
      {
        immediate: true,
      },
    );

    const { startWatch, stopWatch } = useHighlightCascaderItem(props, {
      contentDomRef,
    });

    function onClick() {
      if (
        !parentProps.multiple &&
        chosenOptionList.value.some(node => node._uuid === props.extendsOption._uuid) &&
        !parentProps.expandStrictly
      )
        return;

      onClickNode(props.extendsOption, props.isLeaf || props.duringFilter);

      if (!isDisabled.value) {
        activeOption.value = props.extendsOption;
      }
    }

    function onClickCheckboxOrRadio(e: MouseEvent) {
      if (props.extendsOption.selectable === false) return;

      e.stopPropagation();
      onClickNode(props.extendsOption, true);
    }

    function onMouseEnter() {
      if (parentProps.expandTrigger === 'hover' && !props.isLeaf) {
        // just expand
        expandNode(props.extendsOption, false, true);
      }

      if (props.duringFilter && !isDisabled.value) {
        onMouseOverOption(props.extendsOption._uuid as NCascaderUuidType);
      }
    }

    onMounted(() => {
      registerVNodeGetter(props.extendsOption._uuid as NCascaderUuidType, () => instance?.vnode);

      setTimeout(() => {
        startWatch();
      });
    });

    onBeforeUnmount(() => {
      stopWatch();
    });

    return () => {
      const filterResultContent = parentSlots.searchPanelRender ? (
        <div class={classHelper.e('content')}>
          {parentSlots.searchPanelRender?.({
            paths: props.extendsOption.paths.map(option => ({
              label: option.fullPathLabel,
              value: option.value,
              option,
            })),
            inputValue: inputString.value,
          })}
        </div>
      ) : (
        <div ref={contentDomRef} class={classHelper.e('content')}>
          {props.extendsOption.labels.join(' / ')}
        </div>
      );

      const content =
        typeof props.label === 'function'
          ? props.label(props.extendsOption)
          : parentSlots.itemRender?.(props.extendsOption) ??
            props.extendsOption.stringLabel ??
            props.label;

      return (
        <div
          ref={itemDomRef}
          class={cls(
            classHelper.block,
            classHelper.has('icon', hasIcon.value),
            classHelper.is(
              'active',
              activeOption?.value === props.extendsOption || isChecked.value,
            ),
            classHelper.is('disabled', isDisabled.value),
            classHelper.is('focus', activeOption?.value === props.extendsOption || isFocus.value),
            classHelper.is('group-label', !!props.extendsOption.groupLabel),
          )}
          onClick={onClick}
          onMouseenter={onMouseEnter}
        >
          <div class={classHelper.e('inner')}>
            {parentProps.multiple ? (
              <div class={classHelper.e('checkbox')} onClick={onClickCheckboxOrRadio}>
                <NCheckbox
                  true-label={true}
                  false-label={false}
                  indeterminate={isIndeterminate.value}
                  modelValue={isChecked.value}
                  disabled={
                    isDisabled.value ||
                    props.extendsOption.selectable === false ||
                    (isOutOfLimit.value && !isChecked.value)
                  }
                />
              </div>
            ) : parentProps.showRadio ? (
              (parentProps.checkStrictly || props.isLeaf) && (
                <div class={classHelper.e('radio')} onClick={onClickCheckboxOrRadio}>
                  <NRadio
                    value={true}
                    modelValue={isChecked.value}
                    disabled={isDisabled.value || props.extendsOption.selectable === false}
                  />
                </div>
              )
            ) : undefined}
            <div class={classHelper.e('content-wrapper')}>
              <NTooltip
                overflow={true}
                showAfter={parentProps.tooltipShowAfter}
                hideAfter={parentProps.tooltipHideAfter}
              >
                {{
                  content: () =>
                    parentProps.showCheckedStrategy === 'fullPath'
                      ? props.extendsOption.paths.map(curr => curr.stringLabel).join(' / ')
                      : content,
                  default: () =>
                    props.duringFilter ? (
                      filterResultContent
                    ) : (
                      <div class={classHelper.e('content')}>{content}</div>
                    ),
                }}
              </NTooltip>
            </div>
            {props.isLeaf
              ? isChecked.value &&
                !parentProps.multiple &&
                !parentProps.showRadio && (
                  <div class={classHelper.e('icon')}>
                    {useIconRender(parentProps.selectedIcon ?? IconCheck, undefined, {
                      size: 16,
                    })}
                  </div>
                )
              : props.expand && (
                  <div class={classHelper.e('icon')}>
                    {useIconRender(
                      isLoading.value ? (
                        <NIconSVG name="loading" spin="cw"></NIconSVG>
                      ) : (
                        parentProps.expandIcon ?? IconArrowRight
                      ),
                      undefined,
                      {
                        size: 12,
                      },
                    )}
                  </div>
                )}
          </div>
        </div>
      );
    };
  },
});
