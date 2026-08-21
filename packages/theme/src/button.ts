import { generator, tinyColor } from '@aurora/colors';
import { useLowCaseNamespace } from './namespace';

export const BUTTON_BUILTIN_COLORS = Object.freeze({
  brand: '#3475F8',
  indigo: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  orange: '#FF772E',
} as const);

export type ButtonColorAppearance = 'default' | 'plain' | 'text' | 'link' | 'ghost';
export type ButtonColorVariant = 'primary' | 'normal' | 'danger';

export interface ButtonColorStyleOptions {
  /** 颜色名称或颜色字面量。 @en Built-in color name or color literal. */
  color: string;
  /** 按钮外观。 @en Button appearance. */
  appearance?: ButtonColorAppearance;
  /** 按钮视觉类型。 @en Button visual variant. */
  variant?: ButtonColorVariant;
  /** CSS 变量命名空间。 @en CSS variable namespace. */
  namespace?: string;
}

export function resolveButtonColor(color: string): string | undefined {
  if (Object.hasOwn(BUTTON_BUILTIN_COLORS, color)) {
    return BUTTON_BUILTIN_COLORS[color as keyof typeof BUTTON_BUILTIN_COLORS];
  }
  return tinyColor(color).isValid ? color : undefined;
}

/**
 * 创建按钮自定义颜色所需的 CSS 变量。
 * @en Creates the CSS variables required by a custom button palette.
 */
export function createButtonColorStyle(
  options: ButtonColorStyleOptions,
): Readonly<Record<string, string>> | undefined {
  const color = resolveButtonColor(options.color);
  if (!color) return undefined;

  const appearance = options.appearance ?? 'default';
  const variant = options.variant ?? 'primary';
  const namespace = (options.namespace ?? useLowCaseNamespace()).toLowerCase();
  const generatedColor = generator(color);
  const colorList = generatedColor.colors;
  const isColorDark = generatedColor.colorIns.isDark();
  const variable = (...segments: string[]) => `--${namespace}-${['button', ...segments].join('-')}`;
  const token = (...segments: string[]) => `var(--${namespace}-${segments.join('-')})`;

  switch (appearance) {
    case 'default': {
      const mainColor = isColorDark ? token('text-inverse') : token('text-primary');
      const borderColor = token('border-transparent');
      return {
        [variable('color', variant)]: mainColor,
        [variable('background', variant)]: colorList[5],
        [variable('border-color', variant)]: borderColor,
        [variable('color', variant, 'activated')]: mainColor,
        [variable('background', variant, 'activated')]: colorList[5],
        [variable('border-color', variant, 'activated')]: borderColor,
        [variable('color', variant, 'hover')]: mainColor,
        [variable('background', variant, 'hover')]: colorList[4],
        [variable('border-color', variant, 'hover')]: borderColor,
        [variable('color', variant, 'press')]: mainColor,
        [variable('background', variant, 'press')]: colorList[6],
        [variable('border-color', variant, 'press')]: borderColor,
        [variable('color', variant, 'disabled')]: mainColor,
        [variable('background', variant, 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
        [variable('border-color', variant, 'disabled')]: borderColor,
      };
    }
    case 'plain': {
      const backgroundColor = isColorDark ? token('bg-default') : token('bg-inverse');
      const disabledColor = generatedColor.colorIns.mix('#FFF', 70).toHex8String();
      return {
        [variable('color', variant, 'plain')]: colorList[5],
        [variable('background', variant, 'plain')]: backgroundColor,
        [variable('border-color', variant, 'plain')]: colorList[5],
        [variable('color', variant, 'plain', 'activated')]: colorList[5],
        [variable('background', variant, 'plain', 'activated')]: backgroundColor,
        [variable('border-color', variant, 'plain', 'activated')]: colorList[5],
        [variable('color', variant, 'plain', 'hover')]: colorList[4],
        [variable('background', variant, 'plain', 'hover')]: backgroundColor,
        [variable('border-color', variant, 'plain', 'hover')]: colorList[4],
        [variable('color', variant, 'plain', 'press')]: colorList[6],
        [variable('background', variant, 'plain', 'press')]: backgroundColor,
        [variable('border-color', variant, 'plain', 'press')]: colorList[6],
        [variable('color', variant, 'plain', 'disabled')]: disabledColor,
        [variable('background', variant, 'plain', 'disabled')]: backgroundColor,
        [variable('border-color', variant, 'plain', 'disabled')]: disabledColor,
      };
    }
    case 'ghost': {
      const mainColor = isColorDark
        ? generatedColor.colorIns.mix('#FFF', 80).toHex8String()
        : colorList[5];
      const disabledColor = generatedColor.colorIns.setAlpha(0.5).toHex8String();
      return {
        [variable('color', variant, 'plain', 'ghost')]: mainColor,
        [variable('border-color', variant, 'plain', 'ghost')]: mainColor,
        [variable('color', variant, 'plain', 'ghost', 'activated')]: mainColor,
        [variable('border-color', variant, 'plain', 'ghost', 'activated')]: mainColor,
        [variable('color', variant, 'plain', 'ghost', 'hover')]: colorList[4],
        [variable('border-color', variant, 'plain', 'ghost', 'hover')]: colorList[4],
        [variable('color', variant, 'plain', 'ghost', 'press')]: colorList[6],
        [variable('border-color', variant, 'plain', 'ghost', 'press')]: colorList[6],
        [variable('color', variant, 'plain', 'ghost', 'disabled')]: disabledColor,
        [variable('border-color', variant, 'plain', 'ghost', 'disabled')]: disabledColor,
      };
    }
    case 'link':
      return {
        [variable('color', variant, 'link')]: colorList[5],
        [variable('color', variant, 'link', 'activated')]: colorList[5],
        [variable('color', variant, 'link', 'hover')]: colorList[4],
        [variable('color', variant, 'link', 'press')]: colorList[6],
        [variable('color', variant, 'link', 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
      };
    case 'text':
      return {
        [variable('color', variant, 'text')]: colorList[5],
        [variable('color', variant, 'text', 'activated')]: colorList[5],
        [variable('color', variant, 'text', 'activated', 'hover')]: colorList[4],
        [variable('color', variant, 'text', 'activated', 'press')]: colorList[6],
        [variable('color', variant, 'text', 'hover')]: colorList[4],
        [variable('color', variant, 'text', 'press')]: colorList[6],
        [variable('color', variant, 'text', 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
        [variable('border-color', variant, 'text', 'disabled')]: 'transparent',
      };
  }
}
