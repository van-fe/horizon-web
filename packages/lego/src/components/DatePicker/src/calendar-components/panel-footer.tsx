import { defineComponent, toRefs, ref, computed, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import PanelTable from './panel-table';
import { NButton } from '../../../Button';
import { NDatejs } from '../composables/NDatejs';
import { usePanelFooterProps } from '../composables/useProps';
import type { FooterSlotsParamsType } from '../composables/useProps';
import { defaultLocale, localeInjectKey } from '~/provides/localable';

export default defineComponent({
  name: `${useNamespace()}PanelFooter`,
  components: {
    PanelTable,
    NButton,
  },
  props: usePanelFooterProps,
  emits: ['handleNow', 'cancel', 'confirm'],
  setup(props, { slots, emit }) {
    const classHelper = new ComponentClassBlock('date-picker-footer');
    const locale = inject(localeInjectKey, defaultLocale);
    const legoLocale = computed(() => locale.value?.langService.td()?.lego);
    const {
      confirmDisabled,
      nowButtonText,
      confirmButtonText,
      cancelButtonText,
      confirmButtonProps,
      showNow,
      showCancelButton,
      cancelButtonProps,
      disabledDate,
      disabledTime,
    } = toRefs(props);

    const footerSlots: undefined | ((params: FooterSlotsParamsType) => void) = slots.footer;
    const defaultConfirmText = computed(
      () => confirmButtonText.value || legoLocale.value?.datePicker.confirm || 'confirm',
    );
    const defaultCancelText = computed(
      () => cancelButtonText.value || legoLocale.value?.datePicker.cancel || 'cancel',
    );
    const mergeConfirmButtonProps = computed(() => ({
      ...confirmButtonProps.value,
      disabled: confirmDisabled.value,
    }));
    const today = ref(new Date());
    const nowDisabled = computed(() => {
      if (disabledDate?.value?.(today.value)) {
        return true;
      }
      let currentDate = NDatejs.dayjsToObject(today.value);

      currentDate = {
        ...currentDate,
        year: currentDate.years, //暂时保留原参数，后期大版本废弃
        month: currentDate.months,
        day: currentDate.date,
      };
      if (disabledTime?.value?.(currentDate)) {
        return true;
      }
      return false;
    });

    function onHandleNow() {
      today.value = new Date();
      emit('handleNow', today.value);
    }
    function onCancel() {
      emit('cancel');
    }
    function onConfirm() {
      emit('confirm');
    }

    return () => (
      <div class={classHelper.block}>
        {footerSlots ? (
          footerSlots({ disabled: confirmDisabled.value })
        ) : (
          <div class={cls(classHelper.e('default-footer'))}>
            <div class={cls(classHelper.m('left'))}>
              <NButton
                v-show={showNow.value}
                class={cls(classHelper.e('left-button'))}
                link={true}
                disabled={nowDisabled.value}
                v-text={nowButtonText.value}
                onClick={onHandleNow}
              ></NButton>
            </div>
            <div class={cls(classHelper.m('right'))}>
              <NButton
                v-show={showCancelButton.value}
                {...cancelButtonProps.value}
                v-text={defaultCancelText.value}
                forceNewestSize={true}
                onClick={onCancel}
              ></NButton>
              <NButton
                {...mergeConfirmButtonProps.value}
                v-text={defaultConfirmText.value}
                forceNewestSize={true}
                onClick={onConfirm}
              ></NButton>
            </div>
          </div>
        )}
      </div>
    );
  },
});
