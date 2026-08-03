import { defineComponent, Fragment, inject, nextTick, ref, watch } from 'vue';
import { cls, ComponentClassBlock, isNumber } from '@aurora/utils';
import HInput from '~/components/Input/src/Input';
import HInputNumber from '~/components/InputNumber/src/InputNumber';
import { ColorPickerCurrentValue, ColorPickerEmit, ColorPickerProps } from '../utils/InjectedKeys';
import HSelect from '~/components/Select/src/Select';
import HOption from '~/components/Select/src/Option';

export default defineComponent({
  name: 'ColorEditForm',
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-edit-form');
    const parentProps = inject(ColorPickerProps);
    const parentEmit = inject(ColorPickerEmit);
    const currentValue = inject(ColorPickerCurrentValue);
    const hex = ref(currentValue?.currentActiveColorTarget?.color.toHex().replace('#', '') || '');
    const alpha = ref(
      (currentValue?.currentActiveColorTarget?.color.get('alpha') || 100).toString(),
    );
    const currentFormat = ref<'hex' | 'rgb' | 'hsl' | 'hsv'>(parentProps?.editMode ?? 'hex');

    const input1 = ref<number>(0);
    const input2 = ref<number>(0);
    const input3 = ref<number>(0);

    watch(
      currentFormat,
      (val, oldValue) => {
        void nextTick(() => {
          resetThreeValues();

          oldValue && parentEmit?.('update:editMode', val);
        });
      },
      {
        immediate: true,
      },
    );

    watch(
      () => currentValue?.currentActiveColorTarget.color.value,
      () => {
        initHex();
        initAlpha();
        resetThreeValues();
      },
    );

    watch(
      () => parentProps?.editMode,
      val => {
        if (val) {
          currentFormat.value = val;
        }
      },
    );

    function resetThreeValues() {
      let values = [0, 0, 0];
      switch (currentFormat.value) {
        case 'hsl':
          values = currentValue?.currentActiveColorTarget?.color.toHslArr() ?? [0, 0, 0];
          break;
        case 'rgb':
          values = currentValue?.currentActiveColorTarget?.color.toRgbArr() ?? [0, 0, 0];
          break;
        case 'hsv':
          values = currentValue?.currentActiveColorTarget?.color.toHsvArr() ?? [0, 0, 0];
          break;
      }

      [input1.value, input2.value, input3.value] = values.map(val => Math.round(val));
    }

    watch([input1, input2, input3], ([v1, v2, v3]) => {
      if (isNumber(v1) && isNumber(v2) && isNumber(v3) && parentProps?.updateOnInput) {
        onThreeValuesChange();
      }
    });

    watch(alpha, val => {
      if (isNumber(val) && parentProps?.updateOnInput) {
        onHexChange();
      }
    });

    watch(hex, val => {
      if (val && parentProps?.updateOnInput) {
        onHexChange();
      }
    });

    function onUpdateHex(hex: string) {
      if (hex && parentProps?.updateOnInput) {
        currentValue?.currentActiveColorTarget?.color.analysis(hex, Number(alpha.value));
      }
    }

    function onHexChange() {
      currentValue?.currentActiveColorTarget?.color.analysis(hex.value, Number(alpha.value));
    }

    function onAlphaChange(e: KeyboardEvent | Event) {
      if (e.type === 'keydown' && (e as KeyboardEvent).code !== 'Enter') return;
      if (parseInt(alpha.value) >= 0 && parseInt(alpha.value) <= 100) {
        currentValue?.currentActiveColorTarget?.color.set('alpha', parseInt(alpha.value));
      } else {
        initAlpha();
      }
    }

    function onThreeValuesChange() {
      const alphaStr = parentProps?.alpha ? `,${parseInt(alpha.value) / 100}` : '';
      switch (currentFormat.value) {
        case 'hsl':
          currentValue?.currentActiveColorTarget?.color.analysis(
            `hsl(${input1.value},${input2.value}%,${input3.value}%${alphaStr})`,
          );
          break;
        case 'hsv':
          currentValue?.currentActiveColorTarget?.color.analysis(
            `hsv(${input1.value},${input2.value}%,${input3.value}%${alphaStr})`,
          );
          break;
        case 'rgb':
          currentValue?.currentActiveColorTarget?.color.analysis(
            `rgb(${input1.value},${input2.value},${input3.value}${alphaStr})`,
          );
          break;
      }

      initHex();
    }

    function initHex() {
      hex.value = currentValue?.currentActiveColorTarget?.color.toHex().replace('#', '') || '';
    }

    function initAlpha() {
      alpha.value = (currentValue?.currentActiveColorTarget?.color.get('alpha') || 0).toString();
    }

    return () => (
      <div class={classHelper.block}>
        <div class={classHelper.e('type-picker')}>
          <HSelect v-model={currentFormat.value} size="small" toBody={false}>
            {['hex', ...(parentProps?.editableModes ?? [])]?.map(mode => (
              <HOption value={mode} label={mode.toUpperCase()} />
            ))}
          </HSelect>
        </div>
        <div class={cls(classHelper.e('combine-input'), classHelper.is(currentFormat.value))}>
          {currentFormat.value === 'hex' ? (
            <HInput
              modelValue={hex.value}
              class={cls(classHelper.e('input'), classHelper.em('input', 'hex'))}
              size="small"
              placeholder=""
              onUpdate:modelValue={onUpdateHex}
              onBlur={initHex}
            >
              {{
                prefix: () => <span class={classHelper.e('hex-prefix')}>#</span>,
              }}
            </HInput>
          ) : (
            <Fragment>
              <HInputNumber
                v-model={input1.value}
                class={classHelper.e('input')}
                size="small"
                controls={false}
                precision={0}
                placeholder=""
                min={0}
                max={currentFormat.value === 'rgb' ? 255 : 360}
                onBlur={onThreeValuesChange}
                onKeydown={onThreeValuesChange}
              />
              <HInputNumber
                v-model={input2.value}
                class={classHelper.e('input')}
                size="small"
                controls={false}
                precision={0}
                placeholder=""
                min={0}
                max={currentFormat.value === 'rgb' ? 255 : 100}
                onBlur={onThreeValuesChange}
                onKeydown={onThreeValuesChange}
              />
              <HInputNumber
                v-model={input3.value}
                class={classHelper.e('input')}
                size="small"
                controls={false}
                precision={0}
                placeholder=""
                min={0}
                max={currentFormat.value === 'rgb' ? 255 : 100}
                onBlur={onThreeValuesChange}
                onKeydown={onThreeValuesChange}
              />
            </Fragment>
          )}
          {parentProps?.alpha && (
            <HInputNumber
              v-model={alpha.value}
              class={cls(classHelper.e('input'), classHelper.em('input', 'alpha'))}
              size="small"
              controls={false}
              precision={0}
              min={0}
              max={100}
              placeholder=""
              formatter={val => `${val}%`}
              parser={val => val.replace(/%/g, '')}
              onBlur={onAlphaChange}
              onKeydown={onAlphaChange}
            />
          )}
        </div>
      </div>
    );
  },
});
