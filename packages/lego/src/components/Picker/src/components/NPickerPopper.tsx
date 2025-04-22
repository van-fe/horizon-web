import {
  cls,
  ComponentClassBlock,
  isBoolean,
  sizeUnitTransform,
  useNamespace,
  safelyGetEventTarget,
} from '@nio-fe/shared';
import { defineComponent, inject, ref, watch } from 'vue';
import {
  NPickerDomRefInjectKey,
  NPickerEmitsInjectKey,
  NPickerPopContentDomRefInjectKey,
  NPickerPopperVisibleInjectKey,
  NPickerPropsInjectKey,
  NPickerSlotsInjectKey,
  NPickerStatusInjectKey,
} from '../utils/InjectKeys';
import { NPopContent } from '~/components/Popover';
import { IconLoadingLine, IconSearch } from '@nio-fe/icon';
import ClickOutside from '~/directives/v-click-outside';
import Loading from '~/directives/v-loading';
import useLocaleLang from '~/utils/useLocaleLang';
import { NButton } from '~/components/Button';
import { NInput } from '~/components/Input';
import { unrefElement } from '@vueuse/core';

export default defineComponent({
  name: `${useNamespace()}PickerPopper`,
  directives: {
    ClickOutside,
    Loading,
  },
  components: {
    NPopContent,
    IconLoadingLine,
    NInput,
    NButton,
  },
  emits: {
    /**
     * 切换 popper 显隐通知
     * @param visible 是否显示
     */
    switchPopperVisible: (visible: boolean) => isBoolean(visible),
    /**
     * 失焦事件
     * @param evt 失焦事件对象
     */
    blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('picker');

    const buildInInputDomRef = ref<null | typeof NInput>(null);

    const inputValue = ref('');
    const isInputFocus = ref(false);

    const parentProps = inject(NPickerPropsInjectKey)!;
    const parentEmits = inject(NPickerEmitsInjectKey)!;
    const parentSlots = inject(NPickerSlotsInjectKey)!;
    const popperVisible = inject(NPickerPopperVisibleInjectKey)!;
    const pickerStatus = inject(NPickerStatusInjectKey)!;
    const pickerDomRef = inject(NPickerDomRefInjectKey)!;
    const popContentDomRef = inject(NPickerPopContentDomRefInjectKey)!;

    watch(inputValue, val => {
      parentEmits('update:modelValue', val);
    });

    function onInput(evt: Event) {
      parentEmits('input', evt as InputEvent);
    }

    function onInputFocus() {
      isInputFocus.value = true;
    }

    function onInputBlur(evt: FocusEvent) {
      isInputFocus.value = false;

      if (
        evt.relatedTarget &&
        !unrefElement(popContentDomRef.value)?.contains(evt.relatedTarget as Node)
      ) {
        emit('switchPopperVisible', false);
      }
    }

    function onClickOutside(evt: MouseEvent) {
      const target = safelyGetEventTarget(evt);
      if (
        popContentDomRef.value?.contains(target as Node | null) ||
        pickerDomRef.value?.contains(target as Node | null)
      ) {
        return;
      }

      emit('switchPopperVisible', false);
    }

    function removeClickOutsideListener() {
      document.removeEventListener('mousedown', onClickOutside);
    }

    function setClickOutsideListener() {
      document.addEventListener('mousedown', onClickOutside);
    }

    function onClickWrapper(evt: MouseEvent) {
      evt.stopPropagation();
    }

    watch(
      popperVisible,
      val => {
        if (val) {
          setClickOutsideListener();

          if (parentProps.usePanelInput) {
            buildInInputDomRef.value?.focus();
          }
        } else {
          removeClickOutsideListener();
          inputValue.value = '';
        }
      },
      {
        immediate: true,
      },
    );

    return () => (
      <div
        ref={popContentDomRef}
        class={cls(classHelper.em('pop-content', 'wrapper'), parentProps.panelClass)}
        tabindex={-1}
        onClick={onClickWrapper}
        onKeydown={evt => parentEmits('keydown', evt)}
      >
        {parentSlots.panel?.(parentProps.modelValue, pickerStatus.value) ?? (
          <NPopContent
            v-loading={{
              isShow: parentProps.panelStatus === 'loading' || parentProps.loading,
              text: parentProps.loadingText,
            }}
            class={classHelper.e('pop-content')}
            style={[
              {
                width: sizeUnitTransform(parentProps.panelWidth),
                minWidth: sizeUnitTransform(parentProps.panelMinWidth),
                maxWidth: sizeUnitTransform(parentProps.panelMaxWidth),
              },
              parentProps.panelStyle,
            ]}
          >
            {parentSlots.panelLeftSide ? (
              <div class={classHelper.em('pop-content', 'left-side')}>
                {parentSlots.panelLeftSide()}
              </div>
            ) : undefined}

            <div class={classHelper.em('pop-content', 'center')}>
              {parentProps.usePanelInput && (
                <div
                  class={classHelper.e('panel-input')}
                  onKeydown={evt => {
                    if (evt.key === 'Backspace') {
                      evt.stopPropagation();
                    }
                  }}
                >
                  <NInput
                    ref={buildInInputDomRef}
                    v-model={inputValue.value}
                    placeholder={parentProps.panelInputPlaceholder}
                    prefixIcon={parentProps.panelInputPrefixIcon}
                    onInput={(val: string, evt: Event) => onInput(evt)}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                  >
                    {{
                      prefix: () => <IconSearch />,
                    }}
                  </NInput>
                </div>
              )}
              <div
                class={cls(
                  classHelper.em('pop-content', 'container'),
                  classHelper.is('loading', parentProps.panelStatus === 'loading'),
                )}
              >
                {parentSlots.panelPrefix && (
                  <div class={classHelper.em('pop-content', 'prefix')}>
                    {parentSlots.panelPrefix(parentProps.modelValue, pickerStatus.value)}
                  </div>
                )}
                <div
                  v-show={
                    parentProps.panelStatus === 'empty'
                      ? parentProps.hideContentInnerWhenEmpty === false
                      : true
                  }
                  class={classHelper.em('pop-content', 'inner')}
                >
                  {parentSlots.default?.(parentProps.modelValue, pickerStatus.value)}
                </div>
                {parentProps.panelStatus === 'empty' &&
                  (parentSlots.panelEmpty?.(parentProps.modelValue, pickerStatus.value) ?? (
                    <div class={classHelper.em('pop-content', 'empty')}>
                      {parentProps.emptyText ?? useLocaleLang('select.noData', 'no data').value}
                    </div>
                  ))}
                {parentSlots.panelSuffix && (
                  <div class={classHelper.em('pop-content', 'suffix')}>
                    {parentSlots.panelSuffix(parentProps.modelValue, pickerStatus.value)}
                  </div>
                )}
              </div>
              {(parentProps.needConfirm || parentSlots.panelConfirmLeft) &&
                (parentProps.needConfirm && parentSlots.panelConfirm ? (
                  parentSlots.panelConfirm?.({
                    cancelHandle: () => parentEmits('cancel'),
                    enterHandle: () => parentEmits('confirm'),
                    confirmHandle: () => parentEmits('confirm'),
                  })
                ) : (
                  <div
                    class={cls(
                      classHelper.em('pop-content', 'confirm-wrapper'),
                      classHelper.is(parentProps.confirmAreaSize),
                    )}
                    style={{ padding: sizeUnitTransform(parentProps.confirmAreaPadding) }}
                  >
                    {parentSlots.panelConfirmLeft?.() ??
                      (parentProps.confirmNeedClear ? (
                        <NButton
                          size="small"
                          link={true}
                          onClick={evt => parentEmits('clear', evt)}
                        >
                          {parentProps.clearBtnText ?? useLocaleLang('global.clear').value}
                        </NButton>
                      ) : (
                        <i />
                      ))}
                    {parentProps.needConfirm && (
                      <div class={classHelper.em('pop-content', 'confirm-wrapper-buttons')}>
                        {parentProps.confirmNeedCancel && (
                          <NButton
                            size="small"
                            plain={true}
                            type="normal"
                            disabled={parentProps.cancelDisabled}
                            {...(parentProps.cancelButtonProps ?? {})}
                            onClick={evt => parentEmits('cancel', evt)}
                          >
                            {parentProps.cancelButtonText ??
                              parentProps.cancelBtnText ??
                              useLocaleLang('global.cancel').value}
                          </NButton>
                        )}
                        {parentProps.confirmNeedConfirm && (
                          <NButton
                            size="small"
                            disabled={parentProps.confirmDisabled}
                            {...(parentProps.confirmButtonProps ?? {})}
                            onClick={evt => parentEmits('confirm', evt)}
                          >
                            {parentProps.confirmButtonText ??
                              parentProps.confirmBtnText ??
                              useLocaleLang('global.confirm').value}
                          </NButton>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {parentSlots.panelRightSide ? (
              <div class={classHelper.em('pop-content', 'right-side')}>
                {parentSlots.panelRightSide()}
              </div>
            ) : undefined}
          </NPopContent>
        )}
      </div>
    );
  },
});
