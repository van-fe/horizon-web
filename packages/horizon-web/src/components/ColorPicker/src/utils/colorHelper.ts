import isRegExp from 'lodash/isRegExp';

const INT_HEX_MAP: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

const HEX_INT_MAP: Record<string, number> = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

export function parseHexChannel(hex: string) {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 +
      (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    );
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
}

export function hsv2Hsl(hue: number, sat: number, val: number) {
  return [hue, (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0, hue / 2];
}

export function hexOne(value: number) {
  value = Math.min(Math.round(value), 255);
  const high = Math.floor(value / 16);
  const low = value % 16;
  return `${INT_HEX_MAP[high] || high}${INT_HEX_MAP[low] || low}`;
}

export function toHex({ r, g, b }: { r: number; g: number; b: number }) {
  if (Number.isNaN(+r) || Number.isNaN(+g) || Number.isNaN(+b)) return '';

  return `#${hexOne(r)}${hexOne(g)}${hexOne(b)}`;
}

export function hsl2hsv(hue: number, sat: number, light: number) {
  sat = sat / 100;
  light = light / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);

  light *= 2;
  sat *= light <= 1 ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (light + sat) / 2;
  const sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

  return {
    h: hue,
    s: sv * 100,
    v: v * 100,
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
export function rgb2hsv(r: number, g: number, b: number) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
export function hsv2rgb(h: number, s: number, v: number) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function bound01(value: number | string, max: number | string) {
  if (isOnePointZero(value)) value = '100%';

  const processPercent = isPercentage(value);
  value = Math.min(max as number, Math.max(0, Number.parseFloat(`${value}`)));

  // Automatically convert percentage into number
  if (processPercent) {
    value = Number.parseInt(`${value * (max as number)}`, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(value - (max as number)) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % (max as number)) / Number.parseFloat(max as string);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
export function isOnePointZero(n: unknown) {
  return typeof n === 'string' && n.includes('.') && Number.parseFloat(n) === 1;
}

export function isPercentage(n: unknown) {
  return typeof n === 'string' && n.includes('%');
}

export function combineRegExp(regexpList: Array<string | RegExp>, flags?: string) {
  let source = '';
  for (let i = 0; i < regexpList.length; i++) {
    const item = regexpList[i];
    if (isRegExp(item)) {
      source += item.source;
    } else {
      source += item;
    }
  }
  return new RegExp(source, flags);
}

export function generateRegExp() {
  const searchFlags = 'gi', // ignore case for angles, "rgb" etc
    rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/, // Angle +ive, -ive and angle types
    rSideCornerCapture = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/, // optional 2nd part
    rComma = /\s*,\s*/, // Allow space around comma.
    rColorHex = /\#(?:[a-f0-9]{6,8}|[a-f0-9]{3})/, // 3 or 6 character form
    rDigits3 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)/, // "(1, 2, 3)"
    rDigits4 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)/, // "(1, 2, 3, 4)"
    rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/, // ".9", "-5px", "100%".
    rKeyword = /[_a-z-][_a-z0-9-]*/, // "red", "transparent", "border-collapse".
    rColor = combineRegExp(
      [
        '(?:',
        rColorHex,
        '|',
        '(?:rgb|hsl)',
        rDigits3,
        '|',
        '(?:rgba|hsla)',
        rDigits4,
        '|',
        rKeyword,
        ')',
      ],
      '',
    ),
    rColorStop = combineRegExp([rColor, '(?:\\s+', rValue, '(?:\\s+', rValue, ')?)?'], ''), // Single Color Stop, optional %, optional length.
    rColorStopList = combineRegExp(['(?:', rColorStop, rComma, ')*', rColorStop], ''), // List of color stops min 1.
    rLineCapture = combineRegExp(['(?:(', rAngle, ')|', rSideCornerCapture, ')'], ''), // Angle or SideCorner
    rGradientSearch = combineRegExp(
      ['(?:(', rLineCapture, ')', rComma, ')?(', rColorStopList, ')'],
      searchFlags,
    ), // Capture 1:"line", 2:"angle" (optional), 3:"side corner" (optional) and 4:"stop list".
    rColorStopSearch = combineRegExp(
      ['\\s*(', rColor, ')', '(?:\\s+', '(', rValue, '))?', '(?:', rComma, '\\s*)?'],
      searchFlags,
    ); // Capture 1:"color" and 2:"position" (optional).

  return {
    lineCapture: rLineCapture,
    gradientSearch: rGradientSearch,
    colorStopSearch: rColorStopSearch,
  };
}
