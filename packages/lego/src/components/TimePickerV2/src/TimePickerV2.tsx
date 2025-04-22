import type { Component, VNode } from 'vue';
import { defineComponent, provide, ref, toRefs } from 'vue';
import type { LegoSetupContext, LegoComponentInstance, SlotRender } from '@nio-fe/shared';
import { isNil, cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { useTimePickerV2Props } from './composables/useProps';
import { useTimePickerV2Emits } from './composables/useEmits';
import { useTimePickerV2Slots } from './composables/useSlots';
import { useTimePickerV2Exposes } from './composables/useExposes';
import type { TimePickerV2Props } from './composables/useProps';
import type { TimePickerV2Emits } from './composables/useEmits';
import type { TimePickerV2Slots } from './composables/useSlots';
import type { TimePickerV2Exposes, TimePickerV2TimePanelExposes } from './composables/useExposes';
import { NPicker } from '~/components/Picker';
import { NTimePickerV2EmitsInjectKey, NTimePickerV2PropsInjectKey } from './utils/injectKeys';
import useSize from '~/utils/useSize';
import TimePanel from './components/TimePanel';
import useData from './hooks/useData';
import useVisible from './hooks/useVisible';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import { IconTime } from '@nio-fe/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import NPickerPureInput from '~/components/Picker/src/components/NPickerPureInput';
import { renderIcon } from '~/utils/useIcon';
import { NTooltip } from '~/components/Tooltip';
import { NButton } from '~/components/Button';
import useEvent from './hooks/useEvent';
import type {
  ModelValueType,
  PickerInputStatusType,
  PickerStatusType,
} from '~/components/Picker/src/composables/useProps';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: `${useNamespace()}TimePickerV2`,
  desc: '选择或输入时间的控件',
  props: useTimePickerV2Props,
  emits: useTimePickerV2Emits,
  slots: useTimePickerV2Slots,
  exposes: useTimePickerV2Exposes,
  setup(
    props: TimePickerV2Props,
    context: LegoSetupContext<TimePickerV2Emits, TimePickerV2Slots, TimePickerV2Exposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-picker-v2');
    const pickerDomRef = ref<LegoComponentInstance<typeof NPicker, PickerExposes>>();
    const startInputDomRef =
      ref<LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes>>();
    const endInputDomRef =
      ref<LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes>>();
    const startTimePanelDomRef =
      ref<LegoComponentInstance<typeof TimePanel, TimePickerV2TimePanelExposes>>();
    const endTimePanelDomRef =
      ref<LegoComponentInstance<typeof TimePanel, TimePickerV2TimePanelExposes>>();

    const propRefs = toRefs<TimePickerV2Props>(props);

    const size = useSize(propRefs.size, 'medium');

    const { visible, onShow, onHide, modifyPanelVisible } = useVisible(context, pickerDomRef);

    const {
      startTime,
      endTime,
      showValue,
      previewTime,
      isDisabled,
      canConfirmBtnClick,
      dayjsFormat,
      formItemError,
      onUpdateTime,
      doConfirm,
      doCancel,
      doClear,
      onClickNow,
    } = useData(
      propRefs,
      context,
      {
        startTimePanelDomRef,
        endTimePanelDomRef,
        pickerDomRef,
        startInputDomRef,
        endInputDomRef,
      },
      {
        visible,
        modifyPanelVisible,
      },
    );

    const { onKeydown, onInput, onClick, handleFocus, handleBlur } = useEvent(
      propRefs,
      context,
      {
        startTimePanelDomRef,
        endTimePanelDomRef,
        pickerDomRef,
        startInputDomRef,
        endInputDomRef,
      },
      {
        startTime,
        endTime,
        doConfirm,
        dayjsFormat,
      },
    );

    function renderSeparator(
      separatorProp: string | Component | VNode | undefined,
      separatorSlot?: SlotRender,
    ) {
      return typeof separatorProp === 'string'
        ? separatorProp
        : renderIcon(separatorProp, separatorSlot);
    }

    provide(NTimePickerV2PropsInjectKey, props);
    provide(NTimePickerV2EmitsInjectKey, context.emit);

    context.expose({
      clickTimeCell: (
        time: Dayjs,
        triggerType: 'click' | 'input' = 'click',
        type: 'start' | 'end' = 'start',
      ) => {
        if (type === 'start') {
          startTimePanelDomRef.value?.clickTimeCell(time, triggerType);
        } else {
          endTimePanelDomRef.value?.clickTimeCell(time, triggerType);
        }
      },
      changePanelVisible: modifyPanelVisible,
      confirmHandle: doConfirm,
      cancelHandle: doCancel,
      clearHandle: doClear,
      focus: () => {
        pickerDomRef.value?.focus();
      },
      blur: () => {
        pickerDomRef.value?.forceBlur();
      },
      clear: doClear,
    });

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
        panelWidth={propRefs.panelWidth?.value}
        panelMinWidth={propRefs.panelMinWidth.value}
        panelMaxWidth={propRefs.panelMaxWidth.value}
        pickerMinWidth={propRefs.pickerMinWidth?.value ?? (propRefs.isRange.value ? 180 : 160)}
        pickerMaxWidth={propRefs.pickerMaxWidth?.value}
        pickerWidth={propRefs.width?.value}
        pickerPrefixIcon={
          propRefs.prefixIcon?.value ??
          (propRefs.inputStyle.value === 'no-border' ? false : IconTime)
        }
        placeholder={
          propRefs.placeholder?.value ?? (useLocaleLang('timePicker.placeholder').value as string)
        }
        dropdownIcon={propRefs.suffixIcon?.value}
        dropdownIconCanTurned={false}
        preserveSuffixIconSpace={false}
        confirmDisabled={!canConfirmBtnClick.value}
        panelClass={propRefs.panelClass?.value}
        panelStyle={propRefs.panelStyle?.value}
        toBody={propRefs.toBody.value}
        confirmNeedCancel={propRefs.showCancelButton.value}
        confirmButtonText={propRefs.confirmButtonText?.value}
        cancelButtonText={propRefs.cancelButtonText?.value}
        confirmButtonProps={propRefs.confirmButtonProps?.value}
        cancelButtonProps={propRefs.cancelButtonProps?.value}
        popoverOptions={{
          preventOverflow: propRefs.preventOverflow.value,
          fallbackPlacements: propRefs.fallbackPlacements.value,
          ...propRefs.popoverOptions?.value,
        }}
        showPopoverContentOnly={props.showPopoverContentOnly}
        onShow={onShow}
        onHide={onHide}
        onConfirm={() => doConfirm()}
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
                classHelper.e('panels-wrapper'),
                classHelper.is('range', propRefs.isRange.value),
              )}
            >
              <div
                v-show={propRefs.isRange.value}
                class={classHelper.em('panels-wrapper', 'header')}
              >
                <div class={classHelper.em('panels-wrapper', 'header-label')}>
                  {useLocaleLang('timePicker.startTime').value}
                </div>
                <div class={classHelper.em('panels-wrapper', 'header-separator')}>
                  {renderSeparator(
                    propRefs.rangePanelSeparator?.value,
                    context.slots.rangePanelSeparator,
                  )}
                </div>
                <div class={classHelper.em('panels-wrapper', 'header-label')}>
                  {useLocaleLang('timePicker.endTime').value}
                </div>
              </div>
              <div class={classHelper.em('panels-wrapper', 'body')}>
                <TimePanel
                  ref={startTimePanelDomRef}
                  modelValue={startTime.value}
                  type={propRefs.isRange.value ? 'start' : undefined}
                  dateType={propRefs.type.value}
                  timeStep={propRefs.timeStep.value}
                  hourStep={propRefs.hourStep.value}
                  minuteStep={propRefs.minuteStep.value}
                  secondStep={propRefs.secondStep.value}
                  startAt={propRefs.startAt.value}
                  endAt={propRefs.endAt.value}
                  previewTime={previewTime.value}
                  optionListMaxHeight={propRefs.optionListMaxHeight.value}
                  disabledAfter={propRefs.isLinkPanels.value ? endTime.value : undefined}
                  formatCellText={propRefs.formatCellText?.value}
                  disabledTime={propRefs.disabledTime?.value}
                  panelVisible={visible.value}
                  showTimeTooltip={propRefs.showTimeTooltip?.value}
                  tooltipShowAfter={propRefs.tooltipShowAfter.value}
                  tooltipHideAfter={propRefs.tooltipHideAfter.value}
                  onUpdate:modelValue={(val, triggerType) =>
                    onUpdateTime(val, endTime.value, triggerType)
                  }
                  onUpdate:previewTime={val => (previewTime.value = val)}
                />
                {propRefs.isRange.value ? (
                  <TimePanel
                    ref={endTimePanelDomRef}
                    modelValue={endTime.value}
                    type="end"
                    dateType={propRefs.type.value}
                    timeStep={propRefs.timeStep.value}
                    hourStep={propRefs.hourStep.value}
                    minuteStep={propRefs.minuteStep.value}
                    secondStep={propRefs.secondStep.value}
                    startAt={propRefs.startAt.value}
                    endAt={propRefs.endAt.value}
                    previewTime={previewTime.value}
                    optionListMaxHeight={propRefs.optionListMaxHeight.value}
                    disabledBefore={propRefs.isLinkPanels.value ? startTime.value : undefined}
                    formatCellText={propRefs.formatCellText?.value}
                    disabledTime={propRefs.disabledTime?.value}
                    panelVisible={visible.value}
                    showTimeTooltip={propRefs.showTimeTooltip?.value}
                    tooltipShowAfter={propRefs.tooltipShowAfter.value}
                    tooltipHideAfter={propRefs.tooltipHideAfter.value}
                    onUpdate:modelValue={(val, triggerType) =>
                      onUpdateTime(startTime.value, val, triggerType)
                    }
                    onUpdate:previewTime={val => (previewTime.value = val)}
                  />
                ) : undefined}
              </div>
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
          ...(propRefs.isRange.value && !propRefs.singleTrigger.value
            ? {
                pickerInner: (
                  modelValue: ModelValueType,
                  inputStatus: PickerInputStatusType,
                  pickerStatus: PickerStatusType,
                  onInputFocus: (evt: FocusEvent) => void,
                  onInputBlur: (evt: FocusEvent) => void,
                ) => (
                  <div class={classHelper.e('input-wrapper')}>
                    <NTooltip content={showValue.value?.[0]} overflow={true}>
                      <NPickerPureInput
                        ref={startInputDomRef}
                        modelValue={showValue.value?.[0]}
                        placeholder={
                          propRefs.startPlaceholder?.value ??
                          (useLocaleLang('timePicker.startTime').value as string)
                        }
                        readonly={propRefs.readonly.value}
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
                    <NTooltip content={showValue.value?.[1]} overflow={true}>
                      <NPickerPureInput
                        ref={endInputDomRef}
                        modelValue={showValue.value?.[1]}
                        placeholder={
                          propRefs.endPlaceholder?.value ??
                          (useLocaleLang('timePicker.endTime').value as string)
                        }
                        readonly={propRefs.readonly.value}
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
