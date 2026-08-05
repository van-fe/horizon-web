import type { Component, Ref, SetupContext, VNode } from 'vue';
import { computed, Fragment, defineComponent, provide, ref, toRefs } from 'vue';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { isNil, cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useDatePickerProps } from './composables/useProps';
import { useDatePickerEmits } from './composables/useEmits';
import { useDatePickerSlots } from './composables/useSlots';
import { useDatePickerExposes } from './composables/useExposes';
import type { DatePickerProps } from './composables/useProps';
import type { DatePickerEmits } from './composables/useEmits';
import type { DatePickerSlots } from './composables/useSlots';
import type { DatePickerExposes, DatePickerDatePanelExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import {
  HDatePickerEmitsInjectKey,
  HDatePickerFormatInjectKey,
  HDatePickerPropsInjectKey,
  HDatePickerSlotsInjectKey,
} from './utils/injectKeys';
import useSize from '~/utils/useSize';
import useData, { useDate, useTime } from './hooks/useData';
import useVisible from './hooks/useVisible';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import { IconCalendar } from '@aurora/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import HPickerPureInput from '~/components/Picker/src/components/PickerPureInput';
import { renderIcon } from '~/utils/useIcon';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HButton from '~/components/Button/src/Button';
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
  name: `${useNamespace()}DatePicker`,
  desc: '当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择',
  descLocales: { en: "The DatePicker provides date selection by default." },
  props: useDatePickerProps,
  emits: useDatePickerEmits,
  slots: useDatePickerSlots,
  exposes: useDatePickerExposes,
  setup(
    props: DatePickerProps,
    context: HorizonWebSetupContext<DatePickerEmits, DatePickerSlots, DatePickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker');
    const pickerDomRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes>>();
    const startInputDomRef =
      ref<HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes>>();
    const endInputDomRef =
      ref<HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes>>();
    const startDatePanelsDomRef =
      ref<HorizonWebComponentInstance<typeof DatePanel, DatePickerDatePanelExposes>>();
    const endDatePanelsDomRef =
      ref<HorizonWebComponentInstance<typeof DatePanel, DatePickerDatePanelExposes>>();

    const propRefs = toRefs<DatePickerProps>(props);

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
      separatorSlot?: SetupContext<{}, DatePickerSlots>['slots']['rangeSeparator'],
    ) {
      return typeof separatorProp === 'string'
        ? separatorProp
        : renderIcon(separatorProp, separatorSlot);
    }

    provide(HDatePickerPropsInjectKey, props);
    provide(HDatePickerEmitsInjectKey, context.emit);
    provide(HDatePickerSlotsInjectKey, context.slots);
    provide(HDatePickerFormatInjectKey, pickerType);

    return () => (
      <HPicker
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
                    <HButton size="small" link={true} onClick={onClickNow}>
                      {useLocaleLang('datePicker.now').value}
                    </HButton>
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
                    <HTooltip
                      content={showValue.value?.[0]}
                      overflow={true}
                      showAfter={propRefs.tooltipShowAfter.value}
                      hideAfter={propRefs.tooltipHideAfter.value}
                    >
                      <HPickerPureInput
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
                    </HTooltip>
                    <div class={classHelper.em('input-wrapper', 'separator')}>
                      {renderSeparator(
                        propRefs.rangeSeparator?.value,
                        context.slots.rangeSeparator,
                      )}
                    </div>
                    <HTooltip
                      content={showValue.value?.[1]}
                      overflow={true}
                      showAfter={propRefs.tooltipShowAfter.value}
                      hideAfter={propRefs.tooltipHideAfter.value}
                    >
                      <HPickerPureInput
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
                    </HTooltip>
                  </div>
                ),
              }
            : {}),
        }}
      </HPicker>
    );
  },
});
