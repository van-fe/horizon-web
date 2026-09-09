import { generator, tinyColor } from '@aurora/colors';

export const TAG_BUILTIN_COLORS = Object.freeze({
  brand: '#3475F8',
  lime: '#A0D911',
  indigo: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  orange: '#FF772E',
} as const);

export interface TagColorPalette {
  text: Record<'default' | 'hover' | 'press' | 'disabled' | 'active', string>;
  background: Record<'default' | 'hover' | 'press' | 'disabled' | 'active', string>;
  border: Record<'default' | 'hover' | 'press' | 'disabled' | 'active', string>;
}

export interface TagColorStyleOptions {
  color?: string;
  background?: string;
  plain?: boolean;
  disabled?: boolean;
  active?: boolean;
  hovered?: boolean;
  pressed?: boolean;
  clickable?: boolean;
}

export function resolveTagColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  if (Object.hasOwn(TAG_BUILTIN_COLORS, color)) {
    return TAG_BUILTIN_COLORS[color as keyof typeof TAG_BUILTIN_COLORS];
  }
  return tinyColor(color).isValid ? color : undefined;
}

/** Creates the five-state palette shared by Tag renderers. */
export function createTagColorPalette(
  baseColor: string,
  background = '#FFF',
  plain = false,
): TagColorPalette {
  const target = generator(baseColor, { backgroundColor: background });
  const colors = target.colors;
  if (plain) {
    return {
      text: {
        default: colors[5],
        hover: colors[4],
        press: colors[6],
        disabled: colors[2],
        active: colors[5],
      },
      background: {
        default: '#FFF',
        hover: '#FFF',
        press: '#FFF',
        disabled: '#FFF',
        active: target.colorIns.mix('#FFF', 85).toHexString(),
      },
      border: {
        default: colors[5],
        hover: colors[4],
        press: colors[6],
        disabled: colors[2],
        active: colors[5],
      },
    };
  }
  return {
    text: {
      default: tinyColor(colors[1]).isLight() ? colors[5] : '#FFF',
      hover: '#FFF',
      press: '#FFF',
      disabled: colors[2],
      active: '#FFF',
    },
    background: {
      default: colors[0],
      hover: colors[4],
      press: colors[6],
      disabled: target.colorIns.setAlpha(0.15).toHex8String(),
      active: colors[5],
    },
    border: {
      default: 'transparent',
      hover: 'transparent',
      press: 'transparent',
      disabled: 'transparent',
      active: 'transparent',
    },
  };
}

/** Resolves the inline visual state for a custom-color Tag. */
export function createTagColorStyle(
  options: TagColorStyleOptions,
): Readonly<Record<string, string>> | undefined {
  const color = resolveTagColor(options.color);
  const background = resolveTagColor(options.background) ?? options.background;
  if (!color) return background ? { background: `${background} !important` } : undefined;
  const palette = createTagColorPalette(color, background ?? '#FFF', options.plain);
  const state = options.disabled
    ? 'disabled'
    : options.clickable && options.pressed
      ? 'press'
      : options.clickable && options.hovered
        ? 'hover'
        : options.active
          ? 'active'
          : 'default';
  return {
    color: `${palette.text[state]}${state === 'disabled' ? ' !important' : ''}`,
    background: `${background ?? palette.background[state]}${state === 'disabled' ? ' !important' : ''}`,
    borderColor: `${palette.border[state]}${state === 'disabled' ? ' !important' : ''}`,
  };
}
