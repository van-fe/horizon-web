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
import { useResizeObserver } from '@vueuse/core';
import debounce from 'lodash/debounce';
import HPopover from '~/components/Popover/src/Popover';
import HPopContent from '~/components/Popover/src/PopContent';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default defineComponent({
  name: `${useNamespace()}TagGroup`,
  desc: "组织一组相关标签",
  descLocales: { en: "Groups related tags." },
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

    const propsRefs = toRefs(props);

    const sizeRef = useSize(propsRefs.size, 'medium', {
      mini: 'small',
    });

    const editingSet = ref(new Set<string>());
    const onEditing = (uid: string, status: boolean) => {
      if (status) {
        editingSet.value.add(uid);
      } else {
        editingSet.value.delete(uid);
      }
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
        isLoading.value = true;
        if (id === createTagId) {
          Promise.resolve(props.beforeCreate?.(newVal))
            .then((pass?: boolean) => {
              if (pass === false) {
                reject();
                return;
              }

              resolve();
              emit('created', newVal);
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              isLoading.value = false;
              void debouncedDoCollapse();
            });
        } else {
          Promise.resolve(props.beforeEdit?.(newVal, oldVal!, id))
            .then((pass?: boolean) => {
              if (pass === false) {
                reject();
                return;
              }

              resolve();
              emit('edited', newVal, oldVal!, id);
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              isLoading.value = false;
              void debouncedDoCollapse();
            });
        }
      });
    };

    function onClose(id: string | number | symbol | undefined): Promise<void> {
      return new Promise((resolve, reject) => {
        Promise.resolve(props.beforeClose?.(id))
          .then((pass?: boolean) => {
            if (pass === false) {
              reject();
              return;
            }

            resolve();
            emit('closed', id);
          })
          .catch(() => {
            reject();
          })
          .finally(() => {
            isLoading.value = false;
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

    function toggle(expand?: boolean, manual = false) {
      if ((!collapseProp.value || !props.expand) && !manual) return;
      switchCollapsed(expand);
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

    let prevClientWidth = 0;
    let prevTagsAmount = 0;
    async function doCollapseCalculate() {
      const target: Element | null = tagGroupContainerRef.value;
      if (!target || isDuringRenderCalculating.value) return;

      if (isDefined(props.minDisplayed)) {
        visibleItemsAmount.value = props.minDisplayed;
        setLinesOfTags();
        return;
      }

      isDuringRenderCalculating.value = true;

      if (prevClientWidth > target.clientWidth && prevTagsAmount < needRenderedItemsLength.value) {
        while (target.scrollWidth > target.clientWidth && visibleItemsAmount.value > 0) {
          visibleItemsAmount.value--;
          await nextTick();
        }
      } else {
        while (
          target.scrollWidth < target.clientWidth ||
          (target.scrollWidth === target.clientWidth &&
            visibleItemsAmount.value < needRenderedItemsLength.value)
        ) {
          visibleItemsAmount.value++;
          await nextTick();
        }
      }

      while (target.scrollWidth > target.clientWidth && visibleItemsAmount.value > 1) {
        visibleItemsAmount.value--;
        await nextTick();
      }

      setLinesOfTags();

      prevClientWidth = target.clientWidth;
      prevTagsAmount = needRenderedItemsLength.value;
      // to prevent just one tag cannot be displayed fully
      visibleItemsAmount.value = Math.max(1, visibleItemsAmount.value);

      requestAnimationFrame(() => {
        isDuringRenderCalculating.value = false;
      });
    }

    function setLinesOfTags(target: Element | null = tagGroupContainerRef.value) {
      nextTick(() => {
        linesOfTags.value = Math.floor((target?.clientHeight ?? 0) / 24);
      });
    }

    let stopContainerObserve: null | Function = null;
    function setResizeObserver() {
      if (stopContainerObserve) return;
      stopContainerObserve = useResizeObserver(tagGroupContainerRef, async () => {
        await debouncedDoCollapse();
      }).stop;
    }

    function stopResizeObserver() {
      stopContainerObserve?.();
      stopContainerObserve = null;
    }

    function switchCollapsed(status = !useCollapse.value) {
      useCollapse.value = status;
      emit('toggled', !status);
    }

    let prevVisibleItemsAmount = 0;
    function useCollapseChangeCallback() {
      if (useCollapse.value) {
        visibleItemsAmount.value = prevVisibleItemsAmount;
        setResizeObserver();
      } else {
        stopResizeObserver();
        prevVisibleItemsAmount = visibleItemsAmount.value;
        visibleItemsAmount.value = needRenderedItemsLength.value;
      }

      void debouncedDoCollapse();
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
              (props.useCreate && tagsList.value.size < props.maxTags && (
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
