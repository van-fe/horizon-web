import type { Component, Slot, VNode } from 'vue';
import { defineComponent, provide, ref, toRefs } from 'vue';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { isNil, cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useTimePickerProps } from './composables/useProps';
import { useTimePickerEmits } from './composables/useEmits';
import { useTimePickerSlots } from './composables/useSlots';
import { useTimePickerExposes } from './composables/useExposes';
import type { TimePickerProps } from './composables/useProps';
import type { TimePickerEmits } from './composables/useEmits';
import type { TimePickerSlots } from './composables/useSlots';
import type { TimePickerExposes, TimePickerTimePanelExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import { HTimePickerEmitsInjectKey, HTimePickerPropsInjectKey } from './utils/injectKeys';
import useSize from '~/utils/useSize';
import TimePanel from './components/TimePanel';
import useData from './hooks/useData';
import useVisible from './hooks/useVisible';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import { IconTime } from '@aurora/icon';
import useLocaleLang from '~/utils/useLocaleLang';
import HPickerPureInput from '~/components/Picker/src/components/PickerPureInput';
import { renderIcon } from '~/utils/useIcon';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HButton from '~/components/Button/src/Button';
import useEvent from './hooks/useEvent';
import type {
  ModelValueType,
  PickerInputStatusType,
  PickerStatusType,
} from '~/components/Picker/src/composables/useProps';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: `${useNamespace()}TimePicker`,
  desc: '选择或输入时间的控件',
  descLocales: { en: "The time picker supports three sizes, multiple input styles, and a disabled state. When binding strings, set `value-format` explicitly." },
  props: useTimePickerProps,
  emits: useTimePickerEmits,
  slots: useTimePickerSlots,
  exposes: useTimePickerExposes,
  setup(
    props: TimePickerProps,
    context: HorizonWebSetupContext<TimePickerEmits, TimePickerSlots, TimePickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-picker');
    const pickerDomRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes>>();
    const startInputDomRef =
      ref<HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes>>();
    const endInputDomRef =
      ref<HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes>>();
    const startTimePanelDomRef =
      ref<HorizonWebComponentInstance<typeof TimePanel, TimePickerTimePanelExposes>>();
    const endTimePanelDomRef =
      ref<HorizonWebComponentInstance<typeof TimePanel, TimePickerTimePanelExposes>>();

    const propRefs = toRefs<TimePickerProps>(props);

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
      separatorSlot?: Slot,
    ) {
      return typeof separatorProp === 'string'
        ? separatorProp
        : renderIcon(separatorProp, separatorSlot);
    }

    provide(HTimePickerPropsInjectKey, props);
    provide(HTimePickerEmitsInjectKey, context.emit);

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
                    <HButton size="small" link={true} onClick={onClickNow}>
                      {useLocaleLang('datePicker.now').value}
                    </HButton>
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
                    <HTooltip content={showValue.value?.[0]} overflow={true}>
                      <HPickerPureInput
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
                    </HTooltip>
                    <div class={classHelper.em('input-wrapper', 'separator')}>
                      {renderSeparator(
                        propRefs.rangeSeparator?.value,
                        context.slots.rangeSeparator,
                      )}
                    </div>
                    <HTooltip content={showValue.value?.[1]} overflow={true}>
                      <HPickerPureInput
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
