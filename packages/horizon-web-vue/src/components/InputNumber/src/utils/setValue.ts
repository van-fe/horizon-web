import { Decimal } from 'decimal.js';
import { ref } from 'vue';
import { areInputNumberValuesEqual, verifyInputNumberValue } from '@aurora/core';
import type { InputNumberProps } from '../composables/useProps';

/** Vue 响应式边界适配；数值规则统一由 Core 实现。 @en Vue reactive boundary over Core numeric rules. */
export default class ValueHandler {
  public props: InputNumberProps;
  public minRef = ref(new Decimal(-Infinity));
  public maxRef = ref(new Decimal(Infinity));

  public constructor(props: InputNumberProps) {
    this.props = props;
    this.updateMinMax();
  }

  public updateMinMax() {
    this.minRef.value = new Decimal(this.props.min);
    this.maxRef.value = new Decimal(this.props.max);
  }

  public verifyValue<T extends Decimal.Value | null | undefined>(value: T, precision?: number) {
    return verifyInputNumberValue(value, {
      max: this.props.max,
      min: this.props.min,
      precision: precision ?? this.props.precision,
      step: this.props.step,
      stepStrictly: this.props.stepStrictly,
      stringMode: this.props.stringMode,
    });
  }

  static maybeNumberIsEqual<T extends Decimal.Value | null | undefined>(a: T, b: T) {
    return areInputNumberValuesEqual(a, b);
  }
}
