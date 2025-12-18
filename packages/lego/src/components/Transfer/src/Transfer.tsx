// @ts-nocheck
// 已经放弃对此文件进行类型检查
import { ref, defineComponent, toRefs, computed, watch, inject, provide, nextTick } from 'vue';
import { useTransferProps } from './composables/useProps';
import type { CheckboxUnionType, TransferDataProps, TransferProps } from './composables/useProps';
import { handleFlatTree } from './composables/useFunc';
import { useTransferEmits } from './composables/useEmits';
import type { TransferEmits } from './composables/useEmits';
import type { LegoSetupContext } from '@nio-fe/shared';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import TransferPanel from './TransferPanel';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import NButton from '~/components/Button/src/Button';
import NInput from '~/components/Input/src/Input';
import {
  NFormItemTriggerInjectedKey,
  NFormDisabledInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { TransferSlots } from './composables/useSlots';
import { useTransferSlots } from './composables/useSlots';
import { defaultLocale, localeInjectKey } from '~/provides/localable';

export default defineComponent({
  name: `${useNamespace()}Transfer`,
  desc:
    '需要在多个可选项中进行多选时，用直观的方式在两栏中移动元素，完成选择行为。\n' +
    '比起 `Select` 和 `TreeSelect`，穿梭框占据更大的空间，可以展示可选项的更多信息。',
  components: { TransferPanel, NButton, NCheckbox, NInput },
  props: useTransferProps,
  emits: useTransferEmits,
  slots: useTransferSlots,
  setup(props: TransferProps, { emit, slots }: LegoSetupContext<TransferEmits, TransferSlots>) {
    const {
      data: dataProp,
      modelValue: modelValueProp,
      titles: titlesProp,
      filterable: filterableProp,
      placeholder: placeholderProp,
      props: propsProp,
      draggable: draggableProp,
      emptyTxt: emptyTxtProp,
      breadcrumb: breadcrumbProp,
      onDrop: onDropProp,
      onDragLeave: onDragLeaveProp,
      onDragEnd: onDragEndProp,
      onDragStart: onDragStartProp,
      onDragOver: onDragOverProp,
      disabled: disabledProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('transfer');

    const locale = inject(localeInjectKey, defaultLocale);

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because transfer use many form element, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabledProp?.value ?? formDisabled?.value ?? false);

    const itemKeyMap = computed<Record<keyof TransferDataProps, keyof TransferDataProps>>(() => ({
      key: 'key',
      label: 'label',
      disabled: 'disabled',
      checked: 'checked',
      children: 'children',
      isGroup: 'isGroup',
      ...propsProp.value,
    }));

    const leftPanelRef = ref<HTMLElement | null>(null);
    const rightPanelRef = ref<HTMLElement | null>(null);

    const flattenData = computed(() => handleFlatTree(dataProp.value) ?? []);

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

    const leftPanelData = ref<TransferDataProps[]>([]);
    const rightPanelData = ref<TransferDataProps[]>([]);

    const isWorkType = computed(() =>
      flattenData.value.some(item => !!item[itemKeyMap.value.children]),
    );
    const checkedDataTotal = computed(() => {
      if (!isWorkType.value) {
        return rightPanelData.value.length;
      }
      const peopleArr = rightPanelData.value.filter(item => !item[itemKeyMap.value.children]);
      const departArr = rightPanelData.value.filter(item => item[itemKeyMap.value.children]);
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

    function updateModelValue(val: TransferProps['modelValue']) {
      emit('update:modelValue', val);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }

    const checkedAll = ref(false);
    const indeterminate = ref(false);
    const handleCheckedAll = (isCheckedAll: CheckboxUnionType | CheckboxUnionType[]) => {
      if (isCheckedAll) {
        updateModelValue(panelCheckedData.value.map(item => item[itemKeyMap.value.key]));
      } else {
        updateModelValue([]);
      }
    };

    const canClearChecked = computed(() => {
      return rightPanelData.value.filter(curr => !curr[itemKeyMap.value.disabled]).length > 0;
    });
    function clearChecked() {
      const disabledValue = rightPanelData.value
        .filter((item: TransferDataProps) => !item[itemKeyMap.value.disabled])
        .map(item => item[itemKeyMap.value.key]);
      updateModelValue(
        modelValueProp.value.filter((val: CheckboxUnionType) => !disabledValue.includes(val)),
      );
    }

    const handleTransferToLeft = (removeArr: CheckboxUnionType[]) => {
      const checkedArr = modelValueProp.value.filter(
        (item: CheckboxUnionType) => !removeArr.includes(item),
      );
      updateModelValue(checkedArr);
    };
    const handleTransferToRight = (checkedArr: CheckboxUnionType[]) => {
      updateModelValue(checkedArr);
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
        rightPanelData.value = flattenData.value
          .filter(item => val.includes(item[itemKeyMap.value.key]))
          .sort(
            (a, b) => val.indexOf(a[itemKeyMap.value.key]) - val.indexOf(b[itemKeyMap.value.key]),
          );

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
        <TransferPanel
          data={leftPanelData.value.map(item => ({ ...item, id: item[itemKeyMap.value.key] }))}
          ref={leftPanelRef}
          filterable={filterableProp.value}
          placeholder={placeholderProp.value}
          draggable={false}
          type="left"
          props={itemKeyMap.value}
          breadcrumb={breadcrumbProp.value}
          checkedArr={modelValueProp.value}
          emptyTxt={emptyTxtProp.value[0]}
          class={`${classHelper.m('left')}`}
          onTransfer={handleTransferToRight}
          onExpand={handleExpandChildren}
          disabled={isDisabled.value}
          v-slots={{
            header: () =>
              slots?.leftHeader?.() ??
              (titlesProp.value[0] && (
                <NCheckbox
                  class={classHelper.e('header')}
                  disabled={isDisabled.value || checkedAll.value}
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
        <TransferPanel
          data={rightPanelData.value.map(item => ({ ...item, id: item[itemKeyMap.value.key] }))}
          ref={rightPanelRef}
          draggable={draggableProp.value}
          type="right"
          props={itemKeyMap.value}
          emptyTxt={emptyTxtProp.value[1]}
          disabled={isDisabled.value}
          class={`${classHelper.m('right')}`}
          onRemove={handleTransferToLeft}
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
