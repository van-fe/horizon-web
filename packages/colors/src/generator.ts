import type { TinyColor, HSVA } from '@ctrl/tinycolor';
import { inputToRGB, rgbToHex, default as tinyColor } from '@ctrl/tinycolor';

export interface GeneratorOptions {
  /**
   * @default light
   */
  theme?: 'light' | 'dark';
  /**
   * The background color, this color will affect the generated colors.
   * @default #141414(dark) | #FFFFFF(light)
   */
  backgroundColor?: string;
  /**
   * The light color amount
   * @default 5
   */
  lightColorAmount?: number;
  /**
   * The dark color amount
   * @default 4
   */
  darkColorAmount?: number;
  /**
   * The grads for generate colors
   */
  grads?: {
    /**
     * @default 2
     */
    hue?: number;
    /**
     * @default 0.16
     */
    saturation?: number;
    /**
     * @default 0.05
     */
    saturationDark?: number;
    /**
     * @default 0.05;
     */
    brightness?: number;
    /**
     * @default 0.15
     */
    brightnessDark?: number;
  };
}

export default function generateFactory(value: string, options?: GeneratorOptions) {
  return new Generator(value, options);
}

export class Generator {
  public baseColor!: ReturnType<typeof inputToRGB>;
  public colorIns!: TinyColor;
  public colorHsv!: HSVA;
  public readonly options: GeneratorOptions;

  public colors: string[] = [];

  constructor(value: string, options: GeneratorOptions = {}) {
    this.options = options;
    this.setColor(value);
  }

  public get primary() {
    return `#${this.colorIns.toHex(false)}`;
  }

  public get lightColorAmount() {
    return this.options.lightColorAmount || 5;
  }

  public get darkColorAmount() {
    return this.options.darkColorAmount || 4;
  }

  public get grads() {
    return {
      hue: 2,
      saturation: 0.16,
      saturationDark: 0.05,
      brightness: 0.05,
      brightnessDark: 0.15,
      ...(this.options.grads || {}),
    };
  }

  public toString() {
    return this.getColors().toString();
  }

  public setColor(value: string) {
    this.baseColor = inputToRGB(value);
    this.colorIns = tinyColor(value);
    this.colorHsv = this.colorIns.toHsv();
    this.getColors(true);

    return this;
  }

  public getColors(force = false) {
    if (!this.colors.length || force) {
      this.generateLightColors();
      this.colors.push('#' + this.colorIns.toHex(false));
      this.generateDarkColors();
    }

    return this.colors;
  }

  private generateLightColors() {
    for (let i = this.lightColorAmount; i > 0; i -= 1) {
      const rgb = inputToRGB({
        h: this.colorSetHue(i),
        s: this.colorSetSaturation(i),
        v: this.colorSetBrightness(i),
      });

      this.colors.push('#' + rgbToHex(rgb.r, rgb.g, rgb.b, false));
    }
  }

  private generateDarkColors() {
    for (let i = 1; i <= this.darkColorAmount; i++) {
      const rgb = inputToRGB({
        h: this.colorSetHue(i, false),
        s: this.colorSetSaturation(i, false),
        v: this.colorSetBrightness(i, false),
      });

      this.colors.push('#' + rgbToHex(rgb.r, rgb.g, rgb.b, false));
    }
  }

  private colorSetHue(depth: number, light = true) {
    const hue = Math.round(Number(this.colorHsv.h));
    const diff = this.grads.hue * depth;
    let res: number;

    if (hue >= 60 && hue <= 240) {
      res = light ? hue - diff : hue + diff;
    } else {
      res = light ? hue + diff : hue - diff;
    }

    if (res < 0) res += 360;
    else if (res >= 360) res -= 360;

    return res;
  }

  private colorSetSaturation(depth: number, light = true) {
    // gray
    if (Number(this.colorHsv.h) === 0 && Number(this.colorHsv.s) === 0) {
      return Number(this.colorHsv.s);
    }

    const diff = (light ? -this.grads.saturation : this.grads.saturationDark) * depth;

    let res: number;

    if (!light && depth === this.darkColorAmount) {
      res = Number(this.colorHsv.s) + this.grads.saturation;
    } else {
      res = Number(this.colorHsv.s) + diff;
    }

    // fix number
    res = Math.min(res, 1);

    // if the color is the first color, the result must limit between 0.06 and 0.1
    if (light && depth === this.lightColorAmount && res > 0.1) {
      res = 0.1;
    }

    // fix number
    res = Math.max(res, 0.06);

    return Number(res.toFixed(2));
  }

  private colorSetBrightness(depth: number, light = true) {
    const diff = light ? this.grads.brightness * depth : this.grads.brightnessDark * depth;

    let res = light ? Number(this.colorHsv.v) + diff : Number(this.colorHsv.v) - diff;

    res = Math.min(res, 1);

    return Number(res.toFixed(2));
  }
}
