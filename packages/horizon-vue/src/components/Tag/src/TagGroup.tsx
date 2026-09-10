import { cloneVNode, defineComponent, Fragment, provide, ref, toRefs } from 'vue';
import { ComponentClassBlock, cls, useNamespace, isDefined, isUndefined } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useTagGroupProps } from './composables/useProps';
import { useTagGroupEmits } from './composables/useEmits';
import { useTagGroupSlots } from './composables/useSlots';
import { useTagGroupExposes } from './composables/useExposes';
import { useTagGroupCollapse } from './composables/useTagGroupCollapse';
import { useTagGroupMutation } from './composables/useTagGroupMutation';
import { useTagGroupRegistry } from './composables/useTagGroupRegistry';
import type { TagGroupProps } from './composables/useProps';
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
    const propsRefs = toRefs(props);
    const sizeRef = useSize(propsRefs.size, 'medium', {
      mini: 'small',
    });
    const registry = useTagGroupRegistry();
    const collapse = useTagGroupCollapse({
      props,
      slots,
      containerRef: tagGroupContainerRef,
      editingSet: registry.editingSet,
      emitExceeded: () => emit('exceeded'),
      emitToggled: expanded => emit('toggled', expanded),
    });
    const mutation = useTagGroupMutation({
      props,
      createTagId,
      onMutated: collapse.scheduleCalculate,
      emitCreated: value => emit('created', value),
      emitEdited: (value, oldValue, id) => emit('edited', value, oldValue, id),
      emitClosed: id => emit('closed', id),
    });

    function onClickCreateTag() {
      if (mutation.isLoading.value) return;
      createTagRef.value?.edit('');
    }

    provide(HTagGroupPropsInjectKey, props);
    provide(HTagGroupSizeInjectKey, sizeRef);
    provide(HTagGroupEditingNoticeInjectKey, registry.onEditing);
    provide(HTagGroupEditCallbackInjectKey, mutation.onEdit);
    provide(HTagGroupCloseCallbackInjectKey, mutation.onClose);
    provide(HTagGroupNoticeTagMountedInjectKey, registry.onTagMounted);
    provide(HTagGroupNoticeTagUnmountedInjectKey, registry.onTagUnmounted);
    provide(HTagGroupDoCollapseInjectKey, collapse.scheduleCalculate);

    expose({
      toggle: (expand?: boolean) => collapse.toggle(expand, true),
      doCollapseCalculate: collapse.calculate,
    });

    return () => {
      const renderSlotResult = collapse.getNeedRenderedItems();
      return (
        <div
          ref={tagGroupRef}
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.m(
              'collapse',
              isUndefined(props.minDisplayed) && collapse.collapseEnable.value,
            ),
            classHelper.is('fill-up', props.fillUp),
            classHelper.is('collapsed', collapse.useCollapse.value),
            classHelper.has('min-displayed', isDefined(props.minDisplayed)),
          )}
        >
          {slots.prepend?.()}
          <div ref={tagGroupContainerRef} class={cls(classHelper.e('container'))}>
            {slots.prefix?.()}
            {...renderSlotResult
              .slice(0, collapse.visibleItemsAmount.value)
              .map((item, index, array) =>
                cloneVNode(item, {
                  disableTransitions: collapse.isDuringRenderCalculating.value,
                  tooltipShowAfter: props.tooltipShowAfter,
                  tooltipHideAfter: props.tooltipHideAfter,
                  class:
                    index === array.length - 1 &&
                    renderSlotResult.length > collapse.visibleItemsAmount.value &&
                    collapse.collapseProp.value
                      ? 'is-last-tag'
                      : undefined,
                }),
              )}
            {renderSlotResult.length > collapse.visibleItemsAmount.value &&
              collapse.collapseProp.value && (
                <HPopover
                  disabled={props.tooltipRenderType === 'innerText' || !props.collapseUseTooltip}
                >
                  {{
                    reference: () => (
                      <HTag
                        key="collapsed-tags"
                        tooltip={
                          props.tooltipRenderType === 'innerText' && props.collapseUseTooltip
                        }
                        clickable={props.collapseUseTooltip}
                        isEllipsis={true}
                        tooltipShowAfter={props.tooltipShowAfter}
                        tooltipHideAfter={props.tooltipHideAfter}
                        {...(props.collapseTagProps || {})}
                        onClick={() => collapse.toggle()}
                      >
                        {{
                          tooltipContent: () => (
                            <Fragment>
                              {renderSlotResult
                                .slice(collapse.visibleItemsAmount.value)
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
                          default: () =>
                            `+${renderSlotResult.length - collapse.visibleItemsAmount.value}`,
                        }}
                      </HTag>
                    ),
                    popper: () => (
                      <HPopContent style={{ maxWidth: '320px' }}>
                        <HScrollbar maxHeight={152} size="small">
                          <div class={cls(classHelper.e('popper-inner'), props.popperInnerClass)}>
                            {...renderSlotResult
                              .slice(collapse.visibleItemsAmount.value)
                              .map(node =>
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
            {collapse.collapseProp.value &&
              !collapse.useCollapse.value &&
              renderSlotResult.length === collapse.visibleItemsAmount.value &&
              collapse.linesOfTags.value > 1 && (
                <HTag
                  editable={false}
                  clickable={true}
                  icon={IconTriangleUpFilled}
                  equally={true}
                  {...(props.collapseTagProps || {})}
                  key="collapse-tag"
                  onClick={() => collapse.toggle()}
                />
              )}
            {slots.create?.(Array.from(registry.tagsList.value.values())) ??
              (props.useCreate &&
                registry.tagsList.value.size < (props.maxTags ?? Number.POSITIVE_INFINITY) && (
                  <HTag
                    id={createTagId}
                    ref={createTagRef}
                    editable={props.editable}
                    clickable={true}
                    plain={true}
                    icon={IconAdd}
                    class={cls(classHelper.e('create-tag', !mutation.isLoading.value))}
                    {...(props.createTagProps || {})}
                    isCreateTag={true}
                    onClick={onClickCreateTag}
                  >
                    {slots.createText?.(Array.from(registry.tagsList.value.values())) ??
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
