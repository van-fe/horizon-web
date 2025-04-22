import { ref, defineComponent, toRefs, computed, watch, inject, provide, nextTick } from 'vue';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { useTransferV2Props } from './composables/useProps';
import type { CheckboxUnionType, TransferDataProps, TransferV2Props } from './composables/useProps';
import { useTransferV2Emits } from './composables/useEmits';
import type { TransferV2Emits } from './composables/useEmits';
import { useTransferV2Slots } from './composables/useSlots';
import type { TransferV2Slots } from './composables/useSlots';
import { useTransferV2Exposes } from './composables/useExposes';
import { handleFlatTree } from './utils/useFunc';
import TransferV2Panel from './TransferV2Panel';
import { NCheckbox } from '~/components/Checkbox';
import NButton from '~/components/Button';
import NInput from '~/components/Input';
import {
  NFormItemTriggerInjectedKey,
  NFormDisabledInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { defaultLocale, localeInjectKey } from '~/provides/localable';

export default defineComponent({
  name: `${useNamespace()}TransferV2`,
  desc:
    '需要在多个可选项中进行多选时，用直观的方式在两栏中移动元素，完成选择行为。\n' +
    '比起 `Select` 和 `TreeSelect`，穿梭框占据更大的空间，可以展示可选项的更多信息。',
  author: '@chris.deng',
  components: { TransferV2Panel, NButton, NCheckbox, NInput },
  props: useTransferV2Props,
  emits: useTransferV2Emits,
  slots: useTransferV2Slots,
  exposes: useTransferV2Exposes,
  setup(
    props: TransferV2Props,
    { emit, slots }: LegoSetupContext<TransferV2Emits, TransferV2Slots>,
  ) {
    const {
      data: dataProp,
      modelValue: modelValueProp,
      props: propsProp,
      disabled: disabledProp,
      titles: titlesProp,
      placeholder: placeholderProp,
      emptyTxt: emptyTxtProp,
      breadcrumb: breadcrumbProp,
      filterable: filterableProp,
      draggable: draggableProp,
      filterMethod: filterMethodProp,
      targetOrder: targetOrderProp,
      fieldMap: fieldMappingRef,
      onDragOver: onDragOverProp,
      onDragStart: onDragStartProp,
      onDragLeave: onDragLeaveProp,
      onDrop: onDropProp,
      onDragEnd: onDragEndProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('transfer-v2');

    const locale = inject(localeInjectKey, defaultLocale);

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because transfer use many form element, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => formDisabled?.value || disabledProp.value);

    const itemKeyMap = computed(() => {
      const defaultMap: Record<keyof TransferDataProps, string> = {
        id: 'id',
        key: 'key',
        label: 'label',
        disabled: 'disabled',
        children: 'children',
        isGroup: 'isGroup',
      };

      const propsMap: Partial<Record<keyof TransferDataProps, string>> = {
        ...defaultMap,
        ...propsProp.value,
      };

      if (fieldMappingRef?.value?.key) {
        propsMap.key = fieldMappingRef.value.key;
      }
      if (fieldMappingRef?.value?.label) {
        propsMap.label = fieldMappingRef.value.label;
      }

      if (!propsMap.id) {
        delete propsMap.id;
      }

      return propsMap as Record<keyof TransferDataProps, string>;
    });

    const leftPanelRef = ref<HTMLElement | null>(null);
    const rightPanelRef = ref<HTMLElement | null>(null);

    const leftPanelData = ref<TransferDataProps[]>([]);
    const rightPanelData = ref<TransferDataProps[]>([]);

    const flattenData = computed(() => handleFlatTree(dataProp.value) ?? []);

    // 左侧已选中数据，不包含分组项、禁用项
    const panelCheckedData = computed(() =>
      flattenData.value.filter(
        item =>
          !(
            item[itemKeyMap.value.isGroup] ||
            (item[itemKeyMap.value.disabled] &&
              !modelValueProp.value?.includes(item[itemKeyMap.value.key]))
          ),
      ),
    );

    // 组织架构选择/树状数据选择
    const isWorkType = computed(() =>
      flattenData.value.some(item => !!item[itemKeyMap.value.children]),
    );
    // 计算已选中数据总数
    const checkedDataTotal = computed(() => {
      if (!isWorkType.value) {
        return rightPanelData.value.length;
      }
      const peopleArr = rightPanelData.value.filter(
        item => !item[itemKeyMap.value.children as keyof TransferDataProps],
      );
      const departArr = rightPanelData.value.filter(
        item => item[itemKeyMap.value.children as keyof TransferDataProps],
      );
      if (!peopleArr.length && !departArr.length) return 0;
      let txt = '';
      if (peopleArr.length) {
        txt += `${peopleArr.length} ${locale.value?.langService?.td()?.lego?.transfer?.people}`;
      }
      if (departArr.length) {
        txt += peopleArr.length
          ? `、${departArr.length} ${locale.value?.langService?.td()?.lego?.transfer?.group}`
          : `${departArr.length} ${locale.value?.langService?.td()?.lego?.transfer?.group}`;
      }
      return txt;
    });

    // 过滤方法
    const filterMethod = computed(() => {
      if (filterMethodProp?.value && typeof filterMethodProp.value === 'function') {
        return filterMethodProp.value;
      } else if (typeof filterableProp.value === 'function') {
        return filterableProp.value;
      } else {
        return (inputValue: string, item: TransferDataProps) => {
          return (item[itemKeyMap.value.label as keyof TransferDataProps] as string)
            ?.toLowerCase()
            ?.includes(inputValue);
        };
      }
    });

    function updateModelValue(val: TransferV2Props['modelValue']) {
      emit('update:modelValue', val);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }

    const transformData = (data: any[], keyField: string): TransferDataProps[] => {
      return data.map(item => {
        const idValue = item[keyField];
        // 处理不同类型的 id 值
        let newId: string | number | undefined;
        if (typeof idValue === 'string' || typeof idValue === 'number') {
          newId = idValue;
        } else {
          // 对于 boolean 或复杂对象类型，设置为 undefined 或其他逻辑
          newId = undefined;
        }

        // 递归转换 children
        let children: TransferDataProps[] | undefined;
        if (item.children) {
          children = transformData(item.children, keyField);
        }

        return {
          ...item,
          id: newId,
          children,
        };
      });
    };

    /**
     * check-box stuff
     */
    const checkedAll = ref(false);
    const indeterminate = ref(false);
    const handleCheckedAll = (isCheckedAll: CheckboxUnionType | CheckboxUnionType[]) => {
      if (isCheckedAll) {
        updateModelValue(panelCheckedData.value.map(item => item[itemKeyMap.value.key]));
      } else {
        clearChecked();
      }
    };
    const canClearChecked = computed(() => {
      return (
        rightPanelData.value.filter(
          curr => !curr[itemKeyMap.value.disabled as keyof TransferDataProps],
        ).length > 0
      );
    });
    function clearChecked() {
      const disabledValue = rightPanelData.value
        .filter(
          (item: TransferDataProps) => !item[itemKeyMap.value.disabled as keyof TransferDataProps],
        )
        .map(item => item[itemKeyMap.value.key as keyof TransferDataProps]);
      updateModelValue(
        modelValueProp.value.filter((val: CheckboxUnionType) => !disabledValue.includes(val)),
      );
    }

    /**
     * 左右数据转移
     */
    const handleTransferV2ToLeft = (removeArr: CheckboxUnionType[]) => {
      const checkedArr = modelValueProp.value.filter(
        (item: CheckboxUnionType) => !removeArr.includes(item),
      );
      updateModelValue(checkedArr);
    };
    const handleTransferV2ToRight = (checkedArr: CheckboxUnionType[]) => {
      updateModelValue(checkedArr);
    };

    // 更新右侧面板数据
    const updateRightPanelData = (checkedArr: CheckboxUnionType[]) => {
      const rightOriginData = flattenData.value.filter(item =>
        checkedArr.includes(item[itemKeyMap.value.key]),
      );

      if (targetOrderProp.value === 'unshift') {
        rightPanelData.value = rightOriginData.sort(
          (a, b) =>
            checkedArr.indexOf(b[itemKeyMap.value.key]) -
            checkedArr.indexOf(a[itemKeyMap.value.key]),
        );
        return;
      } else if (targetOrderProp.value === 'original') {
        rightPanelData.value = rightOriginData;
        return;
      } else {
        rightPanelData.value = rightOriginData.sort(
          (a, b) =>
            checkedArr.indexOf(a[itemKeyMap.value.key]) -
            checkedArr.indexOf(b[itemKeyMap.value.key]),
        );
        return;
      }
    };

    const handleExpandChildren = (isExpandRoot: boolean, expandItem?: any) => {
      leftPanelData.value =
        (!isExpandRoot ? expandItem[itemKeyMap.value.children] : dataProp.value) ?? [];
    };
    const handleDrop = (event: DragEvent, dropItem: any, dragItem: any, position: number) => {
      onDropProp?.value?.(event, dropItem, dragItem);
      const oldDragIndex = modelValueProp.value.indexOf(dragItem[itemKeyMap.value.key]);
      const oldDropIndex = modelValueProp.value.indexOf(dropItem[itemKeyMap.value.key]);
      const tempArr = modelValueProp.value.slice(0);
      if (oldDropIndex === 0 && position === -1) {
        tempArr.splice(oldDragIndex, 1);
        tempArr.unshift(dragItem[itemKeyMap.value.key]);
        updateModelValue(tempArr);
        return;
      }
      tempArr.splice(oldDragIndex, 1);
      const dropIndex = tempArr.indexOf(dropItem[itemKeyMap.value.key]);
      tempArr.splice(dropIndex + (position > 0 ? 1 : 0), 0, dragItem[itemKeyMap.value.key]);
      updateModelValue(tempArr);
    };

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    watch(
      () => dataProp.value,
      val => {
        leftPanelData.value = val ?? [];
      },
      {
        immediate: true,
      },
    );

    watch(
      () => modelValueProp.value,
      val => {
        updateRightPanelData(val);
        // 右侧面板有数据,且数据部分被选中(控制表头选择框的半选模式)
        indeterminate.value =
          rightPanelData.value.length > 0 &&
          rightPanelData.value.length !== panelCheckedData.value.length;
        checkedAll.value = rightPanelData.value.length === panelCheckedData.value.length;
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return () => (
      <div
        class={[`${classHelper.block}`, !slots.control && classHelper.m('none-control')]}
        tabindex={0}
        onBlur={onBlur}
      >
        <TransferV2Panel
          data={transformData(leftPanelData.value, itemKeyMap.value.key)}
          ref={leftPanelRef}
          filterable={filterableProp.value}
          filterMethod={filterMethod.value}
          placeholder={placeholderProp.value}
          draggable={false}
          type="left"
          props={itemKeyMap.value}
          breadcrumb={breadcrumbProp.value}
          checkedArr={modelValueProp.value}
          emptyTxt={emptyTxtProp.value[0]}
          class={`${classHelper.m('left')}`}
          onTransfer={handleTransferV2ToRight}
          onExpand={handleExpandChildren}
          disabled={isDisabled.value}
          v-slots={{
            header: () =>
              slots?.leftHeader?.() ??
              (titlesProp.value[0] && (
                <NCheckbox
                  class={classHelper.e('header')}
                  disabled={isDisabled.value}
                  indeterminate={indeterminate.value}
                  onChange={handleCheckedAll}
                  v-model={checkedAll.value}
                >
                  {titlesProp.value[0]}
                </NCheckbox>
              )),
            empty: slots.leftEmpty,
            footer: slots.leftFooter,
            item: slots.item,
            filter: slots.leftFilter,
            body: slots.leftBody,
          }}
        />
        {slots.control && <div class={[classHelper.e('control')]}>{slots.control()}</div>}
        <TransferV2Panel
          data={transformData(rightPanelData.value, itemKeyMap.value.key)}
          ref={rightPanelRef}
          draggable={draggableProp.value}
          type="right"
          props={itemKeyMap.value}
          emptyTxt={emptyTxtProp.value[1]}
          disabled={isDisabled.value}
          class={`${classHelper.m('right')}`}
          onRemove={handleTransferV2ToLeft}
          onDrop={handleDrop}
          onDragLeave={(e: DragEvent, item: TransferDataProps) => onDragLeaveProp?.value?.(e, item)}
          onDragStart={(e: DragEvent, item: TransferDataProps) => onDragStartProp?.value?.(e, item)}
          onDragEnd={(e: DragEvent, item: TransferDataProps) => onDragEndProp?.value?.(e, item)}
          onDragOver={(e: DragEvent, item: TransferDataProps) => onDragOverProp?.value?.(e, item)}
          v-slots={{
            header: () =>
              slots?.rightHeader?.() ?? (
                <div class="flex flex-1 align-center justify-space-between">
                  <div>
                    {titlesProp.value[1]
                      ? titlesProp.value[1]
                      : `${locale.value?.langService?.td()?.lego?.transfer?.hasCheckedFormat}: ${
                          checkedDataTotal.value
                        }`}
                  </div>
                  <div style="min-height: 32px;">
                    <NButton
                      v-show={canClearChecked.value}
                      class={[classHelper.em('header', 'clear')]}
                      size="medium"
                      text={true}
                      forceNewestSize={true}
                      onClick={() => clearChecked()}
                      disabled={isDisabled.value}
                    >
                      {locale.value?.langService?.td()?.lego?.transfer?.clear}
                    </NButton>
                  </div>
                </div>
              ),
            empty: slots.rightEmpty,
            footer: slots.rightFooter,
            item: slots.item,
            body: slots.rightBody,
          }}
        />
      </div>
    );
  },
});
