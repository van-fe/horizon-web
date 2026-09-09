import {
  cloneVNode,
  computed,
  defineComponent,
  Fragment,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  toRefs,
  watch,
} from 'vue';
import {
  ComponentClassBlock,
  cls,
  useNamespace,
  getSymbolNodeChildren,
  isDefined,
  isUndefined,
} from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { createTagMutationController } from '@aurora/core';
import {
  createTagCollapseController,
  observeTagResize,
  type TagResizeObserverHandle,
} from '@aurora/horizon-core';
import { useTagGroupProps } from './composables/useProps';
import { useTagGroupEmits } from './composables/useEmits';
import { useTagGroupSlots } from './composables/useSlots';
import { useTagGroupExposes } from './composables/useExposes';
import type { TagGroupProps, TagProps } from './composables/useProps';
import type { TagGroupEmits } from './composables/useEmits';
import type { TagGroupSlots } from './composables/useSlots';
import type { TagGroupExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
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
import HTag from './Tag';
import useLocaleLang from '~/utils/useLocaleLang';
import { IconAdd, IconTriangleUpFilled } from '@aurora/icon';
import { debounce } from 'lodash-es';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default defineComponent({
  name: `${useNamespace()}TagGroup`,
  desc: '组织一组相关标签',
  descLocales: { en: 'Groups related tags.' },
  components: {
    HPopover,
    HScrollbar,
  },
  props: useTagGroupProps,
  emits: useTagGroupEmits,
  slots: useTagGroupSlots,
  exposes: useTagGroupExposes,
  setup(
    props: TagGroupProps,
    { emit, slots, expose }: HorizonWebSetupContext<TagGroupEmits, TagGroupSlots, TagGroupExposes>,
  ) {
    const classHelper = new ComponentClassBlock('tag-group');

    const tagGroupRef = ref<HTMLDivElement | null>(null);
    const tagGroupContainerRef = ref<HTMLElement | null>(null);
    const createTagRef = ref<typeof HTag | null>(null);
    const createTagId = Symbol('create tag');
    const isLoading = ref(false);
    const tagsList = ref(new Map<string, TagProps>());

    const mutationController = createTagMutationController({
      beforeCreate: props.beforeCreate,
      beforeEdit: props.beforeEdit,
      beforeClose: props.beforeClose,
    });
    const unsubscribeMutation = mutationController.subscribe(() => {
      isLoading.value = mutationController.getState().pending;
    });
    watch(
      () => [props.beforeCreate, props.beforeEdit, props.beforeClose] as const,
      ([beforeCreate, beforeEdit, beforeClose]) => {
        mutationController.update({ beforeCreate, beforeEdit, beforeClose });
      },
    );

    const propsRefs = toRefs(props);

    const sizeRef = useSize(propsRefs.size, 'medium', {
      mini: 'small',
    });

    const editingSet = ref(new Set<string>());
    const onEditing = (uid: string, status: boolean) => {
      const nextEditingSet = new Set(editingSet.value);
      if (status) {
        nextEditingSet.add(uid);
      } else {
        nextEditingSet.delete(uid);
      }
      editingSet.value = nextEditingSet;
    };

    watch(editingSet, val => {
      if (val.size > 0) {
        stopResizeObserver();
      } else {
        setResizeObserver();
      }
    });

    const onEdit = (
      newVal: string,
      oldVal: string | undefined,
      id: string | number | symbol | undefined,
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        const mutation =
          id === createTagId
            ? mutationController.create(newVal)
            : mutationController.edit(newVal, oldVal!, id);
        void mutation.then(result => {
          void debouncedDoCollapse();
          if (result.status !== 'accepted') {
            reject(result.status);
            return;
          }
          // Preserve Vue's established ordering: release the child wait state before the result event.
          resolve();
          void nextTick(() => {
            if (id === createTagId) emit('created', newVal);
            else emit('edited', newVal, oldVal!, id);
          });
        });
      });
    };

    function onClose(id: string | number | symbol | undefined): Promise<void> {
      // Keep unguarded closes on the legacy microtask path. Select relies on the
      // child Tag close event being observable as soon as its click trigger settles.
      if (!props.beforeClose) {
        emit('closed', id);
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        void mutationController.close(id).then(result => {
          if (result.status !== 'accepted') {
            reject(result.status);
            return;
          }
          resolve();
          void nextTick(() => emit('closed', id));
        });
      });
    }

    function onTagMounted(uid: string, tagProps: TagProps) {
      tagsList.value.set(uid, tagProps);
    }

    function onTagUnmounted(uid: string) {
      tagsList.value.delete(uid);
    }

    function onClickCreateTag() {
      if (isLoading.value) return;
      createTagRef.value?.edit('');
    }

    provide(HTagGroupPropsInjectKey, props);
    provide(HTagGroupSizeInjectKey, sizeRef);
    provide(HTagGroupEditingNoticeInjectKey, onEditing);
    provide(HTagGroupEditCallbackInjectKey, onEdit);
    provide(HTagGroupCloseCallbackInjectKey, onClose);
    provide(HTagGroupNoticeTagMountedInjectKey, onTagMounted);
    provide(HTagGroupNoticeTagUnmountedInjectKey, onTagUnmounted);

    /***** collapse *****/
    const collapseProp = computed(() => props.collapse);
    const useCollapse = ref(collapseProp.value);
    const collapseEnable = computed(() => collapseProp.value && useCollapse.value);
    const needRenderedItemsLength = ref<number>(0);
    const getNeedRenderedItems = (slots: HorizonWebSetupContext<{}, TagGroupSlots>['slots']) => {
      const result = slots.default
        ? getSymbolNodeChildren(slots.default).map(curr => cloneVNode(curr))
        : [];
      needRenderedItemsLength.value = result.length;

      return result;
    };

    const linesOfTags = ref(1);
    const visibleItemsAmount = ref(0);

    const debouncedDoCollapse = debounce(doCollapseCalculate, 250, {
      leading: true,
      trailing: true,
      maxWait: 500,
    });

    provide(HTagGroupDoCollapseInjectKey, debouncedDoCollapse);

    const isDuringRenderCalculating = ref(false);

    let overflowReported = false;
    const collapseController = createTagCollapseController({
      getContainer: () => tagGroupContainerRef.value,
      getItemCount: () => needRenderedItemsLength.value,
      getVisibleCount: () => visibleItemsAmount.value,
      setVisibleCount: count => {
        visibleItemsAmount.value = count;
      },
      afterRender: nextTick,
      getMinDisplayed: () => props.minDisplayed,
      onLinesChange: lines => {
        linesOfTags.value = lines;
      },
      onOverflowChange: overflowing => {
        if (overflowing && !overflowReported) emit('exceeded');
        overflowReported = overflowing;
      },
    });

    function toggle(expand?: boolean, manual = false) {
      if ((!collapseProp.value || !props.expand) && !manual) return;
      switchCollapsed(isUndefined(expand) ? undefined : !expand);
    }

    watch(
      needRenderedItemsLength,
      val => {
        if (!useCollapse.value) {
          visibleItemsAmount.value = val;
        }

        void doCollapseCalculate();
      },
      {
        flush: 'post',
      },
    );

    watch(
      () => [props.fillUp, props.useCreate],
      () => {
        void nextTick(() => {
          void debouncedDoCollapse();
        });
      },
    );

    async function doCollapseCalculate() {
      isDuringRenderCalculating.value = true;
      try {
        await collapseController.calculate();
      } finally {
        isDuringRenderCalculating.value = false;
      }
    }

    let containerResizeObserver: TagResizeObserverHandle | undefined;
    function setResizeObserver() {
      if (containerResizeObserver || !tagGroupContainerRef.value) return;
      containerResizeObserver = observeTagResize(tagGroupContainerRef.value, () => {
        void debouncedDoCollapse();
      });
    }

    function stopResizeObserver() {
      containerResizeObserver?.destroy();
      containerResizeObserver = undefined;
    }

    watch(
      tagGroupContainerRef,
      () => {
        stopResizeObserver();
        if (
          editingSet.value.size === 0 &&
          !(isDefined(props.minDisplayed) && collapseEnable.value)
        ) {
          setResizeObserver();
        }
      },
      { flush: 'post' },
    );

    function switchCollapsed(status = !useCollapse.value) {
      useCollapse.value = status;
      emit('toggled', !status);
    }

    let prevVisibleItemsAmount = 0;
    function useCollapseChangeCallback() {
      if (useCollapse.value) {
        visibleItemsAmount.value = prevVisibleItemsAmount;
        setResizeObserver();
        void debouncedDoCollapse();
      } else {
        stopResizeObserver();
        prevVisibleItemsAmount = visibleItemsAmount.value;
        visibleItemsAmount.value = needRenderedItemsLength.value;
      }
    }

    watch(
      collapseProp,
      val => {
        useCollapse.value = val;
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.minDisplayed,
      val => {
        if (isDefined(val)) {
          visibleItemsAmount.value = val;
          if (collapseEnable.value) {
            stopResizeObserver();
          }
        } else {
          setResizeObserver();
        }
      },
      {
        immediate: true,
      },
    );

    watch(useCollapse, () => {
      useCollapseChangeCallback();
    });

    expose({
      toggle: (expand?: boolean) => toggle(expand, true),
      doCollapseCalculate,
    });

    onBeforeUnmount(() => {
      stopResizeObserver();
      debouncedDoCollapse.cancel();
      collapseController.destroy();
      unsubscribeMutation();
      mutationController.destroy();
    });

    return () => {
      const renderSlotResult = getNeedRenderedItems(slots);
      return (
        <div
          ref={tagGroupRef}
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.m('collapse', isUndefined(props.minDisplayed) && collapseEnable.value),
            classHelper.is('fill-up', props.fillUp),
            classHelper.is('collapsed', useCollapse.value),
            classHelper.has('min-displayed', isDefined(props.minDisplayed)),
          )}
        >
          {slots.prepend?.()}
          <div ref={tagGroupContainerRef} class={cls(classHelper.e('container'))}>
            {slots.prefix?.()}
            {...renderSlotResult.slice(0, visibleItemsAmount.value).map((item, index, array) =>
              cloneVNode(item, {
                disableTransitions: isDuringRenderCalculating.value,
                tooltipShowAfter: props.tooltipShowAfter,
                tooltipHideAfter: props.tooltipHideAfter,
                class:
                  index === array.length - 1 &&
                  renderSlotResult.length > visibleItemsAmount.value &&
                  collapseProp.value
                    ? 'is-last-tag'
                    : undefined,
              }),
            )}
            {renderSlotResult.length > visibleItemsAmount.value && collapseProp.value && (
              <HPopover
                disabled={props.tooltipRenderType === 'innerText' || !props.collapseUseTooltip}
              >
                {{
                  reference: () => (
                    <HTag
                      key="collapsed-tags"
                      tooltip={props.tooltipRenderType === 'innerText' && props.collapseUseTooltip}
                      clickable={props.collapseUseTooltip}
                      isEllipsis={true}
                      tooltipShowAfter={props.tooltipShowAfter}
                      tooltipHideAfter={props.tooltipHideAfter}
                      {...(props.collapseTagProps || {})}
                      onClick={() => toggle()}
                    >
                      {{
                        tooltipContent: () => (
                          <Fragment>
                            {renderSlotResult
                              .slice(visibleItemsAmount.value)
                              .map((node, index, arr) => (
                                <>
                                  {cloneVNode(node, {
                                    isPure: true,
                                    isInPopover: true,
                                  })}
                                  {index < arr.length - 1 ? props.separator : ''}
                                </>
                              ))}
                          </Fragment>
                        ),
                        default: () => `+${renderSlotResult.length - visibleItemsAmount.value}`,
                      }}
                    </HTag>
                  ),
                  popper: () => (
                    <HPopContent style={{ maxWidth: '320px' }}>
                      <HScrollbar maxHeight={152} size="small">
                        <div class={cls(classHelper.e('popper-inner'), props.popperInnerClass)}>
                          {...renderSlotResult.slice(visibleItemsAmount.value).map(node =>
                            cloneVNode(node, {
                              isInPopover: true,
                              tooltipShowAfter: props.tooltipShowAfter,
                              tooltipHideAfter: props.tooltipHideAfter,
                            }),
                          )}
                        </div>
                      </HScrollbar>
                    </HPopContent>
                  ),
                }}
              </HPopover>
            )}
            {collapseProp.value &&
              !useCollapse.value &&
              renderSlotResult.length === visibleItemsAmount.value &&
              linesOfTags.value > 1 && (
                <HTag
                  editable={false}
                  clickable={true}
                  icon={IconTriangleUpFilled}
                  equally={true}
                  {...(props.collapseTagProps || {})}
                  key="collapse-tag"
                  onClick={() => toggle()}
                />
              )}
            {slots.create?.(Array.from(tagsList.value.values())) ??
              (props.useCreate &&
                tagsList.value.size < (props.maxTags ?? Number.POSITIVE_INFINITY) && (
                  <HTag
                    id={createTagId}
                    ref={createTagRef}
                    editable={props.editable}
                    clickable={true}
                    plain={true}
                    icon={IconAdd}
                    class={cls(classHelper.e('create-tag', !isLoading.value))}
                    {...(props.createTagProps || {})}
                    isCreateTag={true}
                    onClick={onClickCreateTag}
                  >
                    {slots.createText?.(Array.from(tagsList.value.values())) ??
                      props.createText ??
                      useLocaleLang('tag.create').value}
                  </HTag>
                ))}
            {slots.suffix?.()}
          </div>
          {slots.append?.()}
        </div>
      );
    };
  },
});
