/**
 * 色值转换
 * 参考了 element-plus
 * https://github.com/element-plus/element-plus/blob/main/packages/components/color-picker/src/utils/color.ts
 */

import { hexOne, hsv2Hsl, hsv2rgb, toHex } from './colorHelper';
import type { ColorPickerProps } from '../composables/useProps';
import { tinycolor } from '@nio-fe/colors';
import { EventEmitter, isNumber } from '@nio-fe/shared';

export interface ColorPickerColorSettings {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export default class SingleColor {
  /**
   * 所处位置
   */
  public percent = 0;
  /**
   * 设置值
   */
  public settings: ColorPickerColorSettings = {
    hue: 0,
    saturation: 0,
    value: 100,
    alpha: 100,
  };
  /**
   * colorPicker props
   */
  public props: ColorPickerProps;

  /**
   * 当色值改变的通知
   */
  public onValueChange: Function;

  /**
   * 是否是空状态
   * @private
   */
  private isEmpty = true;
  /**
   * 事件通知中心
   */
  public eventCenter = new EventEmitter();

  constructor(props: ColorPickerProps, onChange: Function, passiveColor?: string) {
    this.props = props;
    this.onValueChange = onChange;
    passiveColor && this.analysis(passiveColor);
  }

  public set(
    props: Partial<Record<keyof ColorPickerColorSettings, number>>,
    manual?: boolean,
  ): void;
  public set(key: keyof ColorPickerColorSettings, value: number, manual?: boolean): void;
  public set(
    propsOrKey:
      | Partial<Record<keyof ColorPickerColorSettings, number>>
      | keyof ColorPickerColorSettings,
    valueOrManual?: number | boolean,
    manual?: boolean,
  ) {
    this.isEmpty = false;

    if (typeof propsOrKey === 'string') {
      this.settings[propsOrKey] = valueOrManual as number;
    } else {
      Object.entries(propsOrKey).forEach(([key, value]) => {
        this.settings[key as keyof ColorPickerColorSettings] = value;
      });
    }

    this.doChange((typeof propsOrKey === 'string' ? manual : (valueOrManual as boolean)) ?? false);
  }

  public get(prop: keyof ColorPickerColorSettings) {
    return prop === 'alpha' ? Math.floor(this.settings[prop]) : this.settings[prop];
  }

  public get value() {
    if (this.isEmpty) return '';

    switch (this.props.format) {
      case 'hsl':
        return this.toHsl(true);
      case 'hsv':
        return this.toHsv(true);
      case 'hex':
        return this.toHex(true);
      default:
      case 'rgb':
        return this.toRgb(true);
    }
  }

  public set value(color: string) {
    this.analysis(color);
  }

  public get valueWithoutAlpha() {
    return this.toHsl();
  }

  public get pureValue() {
    const hsl = this.toHslArr();
    return `hsl(${hsl[0]}, 100%, 50%)`;
  }

  public get pureValueWithAlpha() {
    const hsl = this.toHslArr();
    return `hsla(${hsl[0]}, 100%, 50%, ${this.get('alpha') / 100})`;
  }

  public toRgb(withAlpha = false) {
    const [r, g, b] = this.toRgbArr();
    return this.props.alpha && withAlpha
      ? `rgba(${r}, ${g}, ${b}, ${this.get('alpha') / 100})`
      : `rgb(${r}, ${g}, ${b})`;
  }

  public toRgbArr() {
    const { r, g, b } = hsv2rgb(this.settings.hue, this.settings.saturation, this.settings.value);

    return [r, g, b];
  }

  public toHex(withAlpha = false) {
    const { hue, saturation, value } = this.settings;
    return this.props.alpha && withAlpha
      ? `${toHex(hsv2rgb(hue, saturation, value))}${hexOne((this.get('alpha') * 255) / 100)}`
      : toHex(hsv2rgb(hue, saturation, value));
  }

  public toHexArr() {
    return this.toHex().match(/[\dA-F]{2}/g) as [string, string, string];
  }

  public toHsl(withAlpha = false) {
    const hsl = this.toHslArr();
    return this.props.alpha && withAlpha
      ? `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${this.get('alpha') / 100})`
      : `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  }

  public toHslArr() {
    const { hue, saturation, value } = this.settings;
    const hsl = hsv2Hsl(hue, saturation / 100, value / 100);
    return [hue, Math.round(hsl[1] * 100), Math.round(hsl[2] * 100)];
  }

  public toHsv(withAlpha = false) {
    const hsv = this.toHsvArr();
    return this.props.alpha && withAlpha
      ? `hsva(${hsv[0]}, ${hsv[1]}%, ${hsv[2]}%, ${this.get('alpha') / 100})`
      : `hsv(${hsv[0]}, ${hsv[1]}%, ${hsv[2]}%)`;
  }

  public toHsvArr() {
    const { hue, saturation, value } = this.settings;
    return [hue, Math.round(saturation), Math.round(value)];
  }

  static getDefaultValue(props: ColorPickerProps, onChange: Function): SingleColor {
    return new SingleColor(props, onChange);
  }

  public fromHSV(h: number, s: number, v: number) {
    const hue = Math.max(0, Math.min(360, h));
    const saturation = Math.max(0, Math.min(100, s));
    const value = Math.max(0, Math.min(100, v));

    return { hue, saturation, value };
  }

  public analysis(color: string, alpha?: number) {
    this.isEmpty = false;

    const colorFormatted = tinycolor(color);

    if (isNumber(alpha)) {
      colorFormatted.setAlpha(alpha / 100);
    }

    const { h, s, v, a } = colorFormatted.toHsv();

    this.settings.hue = h;
    this.settings.saturation = s * 100;
    this.settings.value = v * 100;
    this.settings.alpha = a * 100;

    this.doChange();
  }

  public doChange(manual = false) {
    this.onValueChange();

    if (manual) {
      this.eventCenter.emit('manual-change');
    }
  }

  public clearColor() {
    this.isEmpty = true;
    this.settings.alpha = 100;
    this.settings.hue = 0;
    this.settings.saturation = 100;
    this.settings.value = 100;
    this.doChange();
  }
}
