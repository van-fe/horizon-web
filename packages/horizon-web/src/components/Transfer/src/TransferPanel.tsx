import { defineComponent, toRefs, ref, watch, computed, inject, Fragment } from 'vue';
import type {
  TransferDataProps,
  CheckboxUnionType,
  TransferPanelProps,
} from './composables/useProps';
import { useTransferPanelProps } from './composables/useProps';
import { useTransferPanelEmits } from './composables/useEmits';
import type { TransferPanelEmits } from './composables/useEmits';
import { cls, cssVariable, type LegoSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import NCheckboxGroup from '~/components/Checkbox/src/CheckboxGroup';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NButton from '~/components/Button/src/Button';
import NTree from '~/components/Tree/src/Tree';
import NInput from '~/components/Input/src/Input';
import NBreadcrumb from '~/components/Breadcrumb/src/Breadcrumb';
import NBreadcrumbItem from '~/components/Breadcrumb/src/BreadcrumbItem';
import { NIcon } from '@aurora/icon';
import type { TransferPanelSlots } from './composables/useSlots';
import { useTransferPanelSlots } from './composables/useSlots';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import { nanoid } from 'nanoid';
import NVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import NVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerDefaultSlotRowType } from '~/components/VirtualScroller/src/composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}TransferPanel`,
  components: {
    NCheckbox,
    NTooltip,
    NCheckboxGroup,
    NButton,
    NTree,
    NIcon,
    NInput,
    NBreadcrumb,
    NBreadcrumbItem,
    NVirtualScroller,
    NVirtualScrollerItem,
  },
  props: useTransferPanelProps,
  emits: useTransferPanelEmits,
  slots: useTransferPanelSlots,
  setup(
    props: TransferPanelProps,
    { slots, emit, expose }: LegoSetupContext<TransferPanelEmits, TransferPanelSlots>,
  ) {
    const locale = inject(localeInjectKey, defaultLocale);

    const {
      data: dataProp,
      type: typeProp,
      checkedArr: checkedArrProp,
      filterable: filterableProp,
      filterMethod: filterMethodProp,
      placeholder: placeholderProp,
      draggable: draggableProp,
      emptyTxt: emptyTxtProp,
      props: propsProp,
      onDrop: onDropProp,
      onDragOver: onDragOverProp,
      onDragLeave: onDragLeaveProp,
      onDragStart: onDragStartProp,
      breadcrumb: breadcrumbProp,
      onDragEnd: onDragEndProp,
      disabled: disabledProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('transfer-panel');
    const searchInput = ref('');
    const checkedItemKeyArr = ref<CheckboxUnionType[]>([]);
    const showBreadcrumb = ref(false);
    const breadcrumbArr = ref<TransferDataProps[]>([]);
    const dragOver = ref(false);
    const dragPosition = ref(0);
    const dragItem = ref<TransferDataProps | null>(null);

    const filterDataComputed = computed(() => {
      if (typeProp.value === 'right') return dataProp.value;
      return dataProp.value.filter((item: any) => {
        if (!!filterMethodProp?.value) {
          return filterMethodProp.value(searchInput.value, item);
        } else {
          return (item[propsProp.value.label as keyof TransferDataProps] as string)
            ?.toLowerCase()
            ?.includes(searchInput.value);
        }
      });
    });
    const handleCheckedItem = (checkedArr: CheckboxUnionType | CheckboxUnionType[]) => {
      emit('transfer', checkedArr as CheckboxUnionType[]);
    };
    const handleRemoveItem = (key: CheckboxUnionType) => {
      emit('remove', [key]);
    };
    const handleExpandItem = (item: TransferDataProps) => {
      showBreadcrumb.value = true;
      breadcrumbArr.value = [...breadcrumbArr.value, item];
      emit('expand', false, item);
    };
    const handleClickBreadcrumbItem = (item: TransferDataProps, index: number) => {
      breadcrumbArr.value = breadcrumbArr.value.filter(
        (breadcrumbItem, breadcrumbIndex) => index >= breadcrumbIndex,
      );
      emit('expand', false, item);
    };
    const handleCollapseItem = () => {
      showBreadcrumb.value = false;
      breadcrumbArr.value = [];
      emit('expand', true);
    };

    const handleDragstart = (event: DragEvent, item: TransferDataProps) => {
      event.stopPropagation();
      dragItem.value = item;
      onDragStartProp?.value?.(event, item);
    };
    const handleDrop = (event: DragEvent, item: TransferDataProps) => {
      if (!draggableProp.value) return;
      event.stopPropagation();
      event.preventDefault();
      dragOver.value = false;
      onDropProp?.value?.(event, item, dragItem.value, dragPosition.value);
    };
    const dragOverKey = ref(nanoid());
    const handleDragover = (event: DragEvent, item: TransferDataProps) => {
      if (!draggableProp.value) return;
      event.stopPropagation();
      event.preventDefault();
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      dragOver.value = true;
      const position = event.pageY > window.pageYOffset + rect.top + rect.height / 4 ? 1 : -1; // -1上 1下
      dragPosition.value = dataProp.value[0].key === dragOverKey.value ? position : 1;
      dragOverKey.value = item[propsProp.value.key as keyof TransferDataProps] as string;
      onDragOverProp?.value?.(event, item);
    };
    const handleDragleave = (event: DragEvent, item: TransferDataProps) => {
      if (!draggableProp.value) return;
      event.stopPropagation();
      dragOver.value = false;
      onDragLeaveProp?.value?.(event, item);
    };
    const handleDragend = (event: DragEvent, item: TransferDataProps) => {
      event.stopPropagation();
      dragOver.value = false;
      dragItem.value = null;
      dragOverKey.value = nanoid();
      onDragEndProp?.value?.(event, item);
    };

    watch(
      () => checkedArrProp.value,
      val => {
        checkedItemKeyArr.value = val;
      },
      {
        immediate: true,
      },
    );

    expose({
      showBreadcrumb,
      breadcrumbArr,
    });
    return () => {
      const headerContent = slots?.header?.();
      return (
        <div
          class={[
            `${classHelper.block}`,
            !filterDataComputed.value.length && classHelper.m('empty'),
          ]}
        >
          {
            <div
              class={[
                classHelper.e('header'),
                !headerContent?.[0].children && classHelper.em('header', 'empty'),
              ]}
            >
              {slots?.header?.()}
            </div>
          }
          {slots?.filter?.() ??
            (!!(filterableProp.value as any) && (
              <div class={[classHelper.e('input')]}>
                <NInput
                  v-model={searchInput.value}
                  clearable={true}
                  disabled={disabledProp.value}
                  placeholder={
                    placeholderProp.value ||
                    locale.value?.langService?.td()?.horizon-web?.transfer?.filterPlaceholder
                  }
                />
              </div>
            ))}
          {showBreadcrumb.value && (
            <div class={classHelper.e('breadcrumb')}>
              <NBreadcrumb>
                <NBreadcrumbItem
                  clickable={true}
                  v-slots={{
                    separator: () => <NIcon name="arrow_right" size="12" />,
                  }}
                >
                  <span onClick={handleCollapseItem}>{breadcrumbProp.value}</span>
                </NBreadcrumbItem>
                {breadcrumbArr.value.map((item: any, index) => {
                  return (
                    <NBreadcrumbItem
                      key={index}
                      clickable={true}
                      v-slots={{
                        separator: () => <NIcon name="arrow_right" size="12" />,
                      }}
                    >
                      <span onClick={() => handleClickBreadcrumbItem(item, index)}>
                        {item[propsProp.value.label as string]}
                      </span>
                    </NBreadcrumbItem>
                  );
                })}
              </NBreadcrumb>
            </div>
          )}
          <div class={[classHelper.e('body')]}>
            {(dataProp.value.length && typeProp.value === 'right') ||
            (filterDataComputed.value.length && typeProp.value === 'left') ? (
              typeProp.value === 'left' ? (
                slots?.body?.({
                  data: filterDataComputed.value,
                }) ?? (
                  <NVirtualScroller items={filterDataComputed.value} minItemSize={38}>
                    {{
                      default: ({ item, index }: VirtualScrollerDefaultSlotRowType) => {
                        if (item[propsProp.value.isGroup as string]) {
                          return (
                            <NVirtualScrollerItem item={item} data-index={index}>
                              <NTooltip overflow content={item[propsProp.value.label as string]}>
                                <div
                                  class={[classHelper.e('item-label'), classHelper.e('item-group')]}
                                  key={index}
                                >
                                  {item[propsProp.value.label as string]}
                                  {item[propsProp.value.isGroup as string]}
                                </div>
                              </NTooltip>
                            </NVirtualScrollerItem>
                          );
                        } else {
                          return (
                            <NVirtualScrollerItem
                              class={[classHelper.e('item')]}
                              key={index}
                              item={item}
                              data-index={index}
                            >
                              <NCheckbox
                                disabled={
                                  item[propsProp.value.disabled as string] || disabledProp.value
                                }
                                label={item[propsProp.value.key as string]}
                                v-model={checkedItemKeyArr.value}
                                onChange={handleCheckedItem}
                              >
                                {slots?.item?.({ item, type: typeProp.value }) ?? (
                                  <NTooltip
                                    overflow
                                    content={item[propsProp.value.label as string]}
                                  >
                                    <div class={[classHelper.e('item-label')]}>
                                      {item[propsProp.value.label as string]}
                                    </div>
                                  </NTooltip>
                                )}
                              </NCheckbox>
                              {item[propsProp.value.children as string]?.length ? (
                                <NButton
                                  text
                                  size="medium"
                                  icon="arrow_right"
                                  onClick={() => handleExpandItem(item)}
                                />
                              ) : (
                                ''
                              )}
                            </NVirtualScrollerItem>
                          );
                        }
                      },
                    }}
                  </NVirtualScroller>
                )
              ) : (
                slots?.body?.({
                  data: dataProp.value,
                }) ?? (
                  <NVirtualScroller items={dataProp.value} minItemSize={38}>
                    {{
                      default: ({ item, index }: VirtualScrollerDefaultSlotRowType) => {
                        return (
                          <NVirtualScrollerItem item={item} data-index={index}>
                            <div
                              class={cls(
                                classHelper.e('item'),
                                classHelper.em('item', 'right'),
                                classHelper.is(
                                  'draggable',
                                  draggableProp.value && !disabledProp.value,
                                ),
                              )}
                              key={item[propsProp.value.key as keyof TransferDataProps] as string}
                              draggable={draggableProp.value && !disabledProp.value}
                              onDragstart={e => handleDragstart(e, item)}
                              onDragend={e => handleDragend(e, item)}
                              onDragover={e => handleDragover(e, item)}
                              onDragleave={e => handleDragleave(e, item)}
                              onDrop={e => handleDrop(e, item)}
                            >
                              {item[propsProp.value.key as keyof TransferDataProps] ===
                                dragOverKey.value && (
                                <Fragment>
                                  <div
                                    class={cls(
                                      classHelper.e('item-drag-over-wrap'),
                                      classHelper.is('sibling'),
                                    )}
                                  >
                                    <div
                                      class={cls(
                                        classHelper.e('item-drag-over-cursor'),
                                        dragPosition.value === 1
                                          ? classHelper.is('bottom')
                                          : classHelper.is('top'),
                                      )}
                                      style={{
                                        width: `calc(100% - 16px - ((${cssVariable(
                                          'transfer-size--drag-over-cursor-arrow',
                                        )} + ${cssVariable('transfer-height--drag-over-cursor')} * 2))`,
                                      }}
                                    />
                                  </div>
                                </Fragment>
                              )}
                              {draggableProp.value && !disabledProp.value && (
                                <NIcon class={'mr-3'} name="drag_form" />
                              )}
                              <NTooltip
                                overflow
                                content={
                                  item[propsProp.value.label as keyof TransferDataProps] as string
                                }
                              >
                                <div class={[classHelper.e('item-label'), 'flex-1']}>
                                  {slots?.item?.({ item, type: typeProp.value }) ??
                                    item[propsProp.value.label as keyof TransferDataProps]}
                                </div>
                              </NTooltip>
                              {!item[propsProp.value.disabled as keyof TransferDataProps] &&
                                !disabledProp.value && (
                                  <NIcon
                                    name="close"
                                    class={'ml-3'}
                                    onClick={() =>
                                      handleRemoveItem(
                                        item[
                                          propsProp.value.key as keyof TransferDataProps
                                        ] as CheckboxUnionType,
                                      )
                                    }
                                  />
                                )}
                            </div>
                          </NVirtualScrollerItem>
                        );
                      },
                    }}
                  </NVirtualScroller>
                )
              )
            ) : (
              <div class={classHelper.e('body--empty')}>
                {slots?.empty?.() ?? emptyTxtProp.value}
              </div>
            )}
          </div>
          {slots.footer && (
            <div class={[classHelper.e('footer')]}>
              {slots.footer({ filterData: dataProp.value ?? [], type: typeProp.value })}
            </div>
          )}
        </div>
      );
    };
  },
});
