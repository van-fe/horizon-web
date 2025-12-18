import { isDefined, isNil } from '@aurora/shared';
import type { InputNumberProps } from '../composables/useProps';
import { error } from '~/utils/useLog';
import { Decimal } from 'decimal.js';
import { ref } from 'vue';

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
    if (value === '' || isNil(value)) {
      return value;
    }

    let res: Decimal.Value = new Decimal(value || 0);

    if (Number.isNaN(value) || res.isNaN()) {
      return null;
    }

    precision = precision || this.props.precision;

    let max, min;

    if (isDefined(precision)) {
      max = new Decimal(this.maxRef.value.toFixed(precision, Decimal.ROUND_DOWN));
      min = new Decimal(this.minRef.value.toFixed(precision, Decimal.ROUND_DOWN));
    } else {
      max = this.maxRef.value;
      min = this.minRef.value;
    }

    if (max.lessThan(min)) {
      error('inputNumber', 'max is less than min! So the limit of min max range will not run.');
    } else {
      res = res.clamp(min, max);
    }

    if (this.props.stepStrictly) {
      res = res.toNearest(this.props.step);
    }

    if (isDefined(precision)) {
      res = res.toFixed(precision);

      if (!this.props.stringMode) {
        res = new Decimal(res);
      }
    }

    return res;
  }

  static maybeNumberIsEqual<T extends Decimal.Value | null | undefined>(a: T, b: T) {
    if (isNil(a)) {
      if (isNil(b)) {
        return true;
      } else return b === '';
    } else {
      if (isNil(b)) {
        return a === '';
      } else if (b === '') {
        return a === b;
      } else {
        const aRaw = Decimal.isDecimal(a) ? a.toString() : a.toString();
        const bRaw = Decimal.isDecimal(b) ? b.toString() : b.toString();

        return aRaw === bRaw;
      }
    }
  }
}
