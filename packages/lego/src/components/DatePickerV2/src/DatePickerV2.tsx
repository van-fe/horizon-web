import type { Component, Ref, SetupContext, VNode } from 'vue';
import { computed, Fragment, defineComponent, provide, ref, toRefs } from 'vue';
import type { LegoSetupContext, LegoComponentInstance } from '@nio-fe/shared';
import { isNil, cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { useDatePickerV2Props } from './composables/useProps';
import { useDatePickerV2Emits } from './composables/useEmits';
import { useDatePickerV2Slots } from './composables/useSlots';
import { useDatePickerV2Exposes } from './composables/useExposes';
import type { DatePickerV2Props } from './composables/useProps';
import type { DatePickerV2Emits } from './composables/useEmits';
import type { DatePickerV2Slots } from './composables/useSlots';
import type { DatePickerV2Exposes, DatePickerV2DatePanelExposes } from './composables/useExposes';
import NPicker from '~/components/Picker/src/Picker';
import {
  NDatePickerV2EmitsInjectKey,
  NDatePickerV2FormatInjectKey,
  NDatePickerV2PropsInjectKey,
  NDatePickerV2SlotsInjectKey,
} from './utils/injectKeys';
import useSize from '~/utils/useSize';
import useData, { useDate, useTime } from './hooks/useData';
import useVisible from './hooks/useVisible';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import { IconCalendar } from '@nio-fe/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import NPickerPureInput from '~/components/Picker/src/components/NPickerPureInput';
import { renderIcon } from '~/utils/useIcon';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NButton from '~/components/Button/src/Button';
import useEvent from './hooks/useEvent';
import DatePanel from './components/DatePanel';
import useFormat from './hooks/useFormat';
import usePanel from './hooks/usePanel';
import DatePanelShortcuts from './components/DatePanelShortcuts';
import type {
  ModelValueType,
  PickerInputStatusType,
  PickerStatusType,
} from '~/components/Picker/src/composables/useProps';
import useExpose from './hooks/useExpose';
import type { MaybeElement } from '@vueuse/core';
import { transformType } from './utils/utils';

export default defineComponent({
  name: `${useNamespace()}DatePickerV2`,
  desc: '当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择',
  props: useDatePickerV2Props,
  emits: useDatePickerV2Emits,
  slots: useDatePickerV2Slots,
  exposes: useDatePickerV2Exposes,
  setup(
    props: DatePickerV2Props,
    context: LegoSetupContext<DatePickerV2Emits, DatePickerV2Slots, DatePickerV2Exposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-v2');
    const pickerDomRef = ref<LegoComponentInstance<typeof NPicker, PickerExposes>>();
    const startInputDomRef =
      ref<LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes>>();
    const endInputDomRef =
      ref<LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes>>();
    const startDatePanelsDomRef =
      ref<LegoComponentInstance<typeof DatePanel, DatePickerV2DatePanelExposes>>();
    const endDatePanelsDomRef =
      ref<LegoComponentInstance<typeof DatePanel, DatePickerV2DatePanelExposes>>();

    const propRefs = toRefs<DatePickerV2Props>(props);

    const size = useSize(propRefs.size, 'medium');

    const pickerType = computed(() => transformType(propRefs.type.value));

    const { visible, onShow, onHide, modifyPanelVisible } = useVisible(context, pickerDomRef);

    const { format, valueFormat } = useFormat(propRefs, {
      visible,
      pickerType,
    });

    const { startDate, endDate, previewDate } = useDate();

    const { startTime, endTime, previewStartTime, previewEndTime } = useTime();

    const {
      showValue,
      isContainTime,
      isRange,
      isDisabled,
      canConfirmBtnClick,
      formItemError,
      onUpdateDate,
      onUpdatePreviewDate,
      onUpdateTime,
      onUpdatePreviewTime,
      doConfirm,
      doCancel,
      doClear,
      doBlur,
      onClickNow,
    } = useData(
      propRefs,
      context,
      {
        startDatePanelsDomRef,
        endDatePanelsDomRef,
        pickerDomRef,
        startInputDomRef,
        endInputDomRef,
      },
      {
        pickerType,
        startDate,
        endDate,
        previewDate,
        startTime,
        endTime,
        previewStartTime,
        previewEndTime,
        format,
        valueFormat,
        visible,
        modifyPanelVisible,
      },
    );

    const {
      startPickerType,
      startPanelShowDate,
      endPickerType,
      endPanelShowDate,
      showBeforeAfterDate,
      switchPanelShowDate,
      refreshPanelShowDate,
    } = usePanel(propRefs, {
      isRange,
      visible,
      startDate,
      endDate,
      pickerType,
    });

    const { onKeydown, onInput, onClick, handleFocus, handleBlur } = useEvent(
      propRefs,
      context,
      {
        startDatePanelsDomRef,
        endDatePanelsDomRef,
        pickerDomRef,
        startInputDomRef,
        endInputDomRef,
      },
      {
        startDate,
        endDate,
        startTime,
        endTime,
        visible,
        format,
        doConfirm,
        doBlur,
        isRange,
        modifyPanelVisible,
      },
    );

    useExpose(context, {
      modifyPanelVisible,
      startPanelShowDate,
      endPanelShowDate,
      switchPanelShowDate,
      refreshPanelShowDate,
      doConfirm,
      doCancel,
      doClear,
    });

    function renderSeparator(
      separatorProp: string | Component | VNode | undefined,
      separatorSlot?: SetupContext<{}, DatePickerV2Slots>['slots']['rangeSeparator'],
    ) {
      return typeof separatorProp === 'string'
        ? separatorProp
        : renderIcon(separatorProp, separatorSlot);
    }

    provide(NDatePickerV2PropsInjectKey, props);
    provide(NDatePickerV2EmitsInjectKey, context.emit);
    provide(NDatePickerV2SlotsInjectKey, context.slots);
    provide(NDatePickerV2FormatInjectKey, pickerType);

    return () => (
      <NPicker
        ref={pickerDomRef}
        modelValue={
          Array.isArray(showValue.value)
            ? showValue.value.length && showValue.value.every(curr => isNil(curr))
              ? undefined
              : showValue.value.join(' - ')
            : showValue.value
        }
        disabled={isDisabled.value}
        clearable={propRefs.clearable.value && !isDisabled.value && !propRefs.readonly.value}
        readonly={propRefs.readonly.value}
        size={size.value}
        class={cls(classHelper.block, classHelper.is('clearable', propRefs.clearable.value))}
        trigger={propRefs.trigger.value}
        inputable={propRefs.inputable.value}
        inputStyle={propRefs.inputStyle.value}
        inputStatus={!!formItemError?.value ? 'error' : propRefs.inputStatus?.value}
        needConfirm={propRefs.needConfirm.value}
        fitInputWidth={propRefs.fitInputWidth.value}
        panelMaxWidth={propRefs.panelMaxWidth.value}
        panelMinWidth={propRefs.panelMinWidth?.value}
        pickerMinWidth={propRefs.pickerMinWidth?.value ?? (isRange.value ? 256 : 160)}
        pickerMaxWidth={propRefs.pickerMaxWidth?.value}
        pickerPrefixIcon={
          propRefs.prefixIcon?.value ??
          (propRefs.inputStyle.value === 'no-border' ? false : IconCalendar)
        }
        dropdownIconCanTurned={false}
        preserveSuffixIconSpace={false}
        placeholder={
          propRefs.placeholder?.value ?? (useLocaleLang('datePicker.placeholder').value as string)
        }
        dropdownIcon={propRefs.suffixIcon?.value}
        confirmDisabled={!canConfirmBtnClick.value}
        panelClass={propRefs.panelClass?.value}
        panelStyle={propRefs.panelStyle?.value}
        confirmNeedCancel={propRefs.showCancelButton.value}
        confirmButtonText={propRefs.confirmButtonText?.value}
        cancelButtonText={propRefs.cancelButtonText?.value}
        confirmButtonProps={propRefs.confirmButtonProps?.value}
        cancelButtonProps={propRefs.cancelButtonProps?.value}
        toBody={propRefs.toBody?.value}
        destroyOnHide={propRefs.destroyOnHide.value}
        hoverShowDelay={propRefs.hoverShowDelay.value}
        hoverHideDelay={propRefs.hoverHideDelay.value}
        popoverOptions={{
          preventOverflow: propRefs.preventOverflow.value,
          fallbackPlacements: propRefs.fallbackPlacements.value,
          ...propRefs.popoverOptions?.value,
        }}
        showPopoverContentOnly={props.showPopoverContentOnly}
        onShow={onShow}
        onHide={onHide}
        onConfirm={() => doConfirm(true)}
        onCancel={doCancel}
        onClear={doClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={onInput}
        onKeydown={onKeydown}
        onClick={onClick}
      >
        {{
          default: () => (
            <div
              class={cls(
                classHelper.e('date-panel-container'),
                classHelper.is('range', isRange.value),
                classHelper.is('show-before-after-date', showBeforeAfterDate.value),
                classHelper.is('visible', visible.value),
              )}
            >
              <DatePanel
                ref={startDatePanelsDomRef}
                startDate={startDate.value}
                endDate={endDate.value}
                startTime={startTime.value}
                endTime={endTime.value}
                previewDate={previewDate.value}
                previewTime={previewStartTime.value}
                startPanelShowDate={startPanelShowDate.value}
                endPanelShowDate={endPanelShowDate.value}
                type={isRange.value && !propRefs.singlePanel.value ? 'start' : 'single'}
                pickerType={startPickerType.value}
                isRange={isRange.value}
                onUpdate:date={(vals, triggerType) => onUpdateDate(vals[0], vals[1], triggerType)}
                onUpdate:time={(vals, triggerType) => onUpdateTime(vals[0], vals[1], triggerType)}
                onUpdate:pickerType={val => (startPickerType.value = val)}
                onUpdate:panelShowDate={val => switchPanelShowDate('start', val)}
                onUpdate:previewDate={onUpdatePreviewDate}
                onUpdate:previewTime={time => onUpdatePreviewTime(time, 'start')}
              />
              {isRange.value && !propRefs.singlePanel.value && (
                <Fragment>
                  <div
                    v-show={isContainTime.value && isRange.value}
                    class={classHelper.e('range-panel-separator')}
                  >
                    {context.slots.rangePanelSeparator?.() ?? props.rangePanelSeparator ?? '-'}
                  </div>
                  <DatePanel
                    ref={endDatePanelsDomRef}
                    startDate={startDate.value}
                    endDate={endDate.value}
                    startTime={startTime.value}
                    endTime={endTime.value}
                    previewDate={previewDate.value}
                    previewTime={previewEndTime.value}
                    startPanelShowDate={startPanelShowDate.value}
                    endPanelShowDate={endPanelShowDate.value}
                    type="end"
                    pickerType={endPickerType.value}
                    isRange={isRange.value}
                    onUpdate:date={(vals, triggerType) =>
                      onUpdateDate(vals[0], vals[1], triggerType)
                    }
                    onUpdate:time={(vals, triggerType) =>
                      onUpdateTime(vals[0], vals[1], triggerType)
                    }
                    onUpdate:pickerType={val => (endPickerType.value = val)}
                    onUpdate:panelShowDate={val => switchPanelShowDate('end', val)}
                    onUpdate:previewDate={onUpdatePreviewDate}
                    onUpdate:previewTime={time => onUpdatePreviewTime(time, 'end')}
                  />
                </Fragment>
              )}
            </div>
          ),
          panelPrefix: context.slots.panelHeaderRender,
          panelSuffix: context.slots.panelFooterRender,
          pickerPrefix: context.slots.prefix,
          pickerSuffix: context.slots.suffix,
          panelConfirm: context.slots.dropConfirmRender,
          pickerContainer: context.slots.pickerContainer,
          pickerInner: context.slots.pickerInner,
          pickerOuter: context.slots.pickerOuter,
          picker: context.slots.picker,
          ...(propRefs.shortcuts?.value?.length
            ? {
                panelLeftSide: () => (
                  <DatePanelShortcuts
                    startDate={startDate.value}
                    endDate={endDate.value}
                    isRange={isRange.value}
                    containTime={isContainTime.value}
                    refreshPanelShowDate={refreshPanelShowDate}
                    mainPanelDomRef={startDatePanelsDomRef as Ref<MaybeElement>}
                    onUpdate:modelValue={vals => onUpdateDate(vals[0], vals[1], 'click')}
                  />
                ),
              }
            : {}),
          ...(propRefs.showNow.value || context.slots.showNow
            ? {
                panelConfirmLeft: () =>
                  context.slots.showNow?.() ?? (
                    <NButton size="small" link={true} onClick={onClickNow}>
                      {useLocaleLang('datePicker.now').value}
                    </NButton>
                  ),
              }
            : {}),
          ...(isRange.value && !propRefs.singleTrigger.value
            ? {
                pickerInner: (
                  modelValue: ModelValueType,
                  inputStatus: PickerInputStatusType,
                  pickerStatus: PickerStatusType,
                  onInputFocus: (evt: FocusEvent) => void,
                  onInputBlur: (evt: FocusEvent) => void,
                ) => (
                  <div class={classHelper.e('input-wrapper')}>
                    <NTooltip
                      content={showValue.value?.[0]}
                      overflow={true}
                      showAfter={propRefs.tooltipShowAfter.value}
                      hideAfter={propRefs.tooltipHideAfter.value}
                    >
                      <NPickerPureInput
                        ref={startInputDomRef}
                        modelValue={showValue.value?.[0]}
                        placeholder={
                          propRefs.startPlaceholder?.value ??
                          (useLocaleLang('datePicker.startDate').value as string)
                        }
                        readonly={propRefs.readonly.value}
                        disabled={isDisabled.value}
                        onInput={onInput}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                      />
                    </NTooltip>
                    <div class={classHelper.em('input-wrapper', 'separator')}>
                      {renderSeparator(
                        propRefs.rangeSeparator?.value,
                        context.slots.rangeSeparator,
                      )}
                    </div>
                    <NTooltip
                      content={showValue.value?.[1]}
                      overflow={true}
                      showAfter={propRefs.tooltipShowAfter.value}
                      hideAfter={propRefs.tooltipHideAfter.value}
                    >
                      <NPickerPureInput
                        ref={endInputDomRef}
                        modelValue={showValue.value?.[1]}
                        placeholder={
                          propRefs.endPlaceholder?.value ??
                          (useLocaleLang('datePicker.endDate').value as string)
                        }
                        readonly={propRefs.readonly.value}
                        disabled={isDisabled.value}
                        onInput={evt => onInput(evt, 'end')}
                        onFocus={onInputFocus}
                        onBlur={onInputBlur}
                      />
                    </NTooltip>
                  </div>
                ),
              }
            : {}),
        }}
      </NPicker>
    );
  },
});
