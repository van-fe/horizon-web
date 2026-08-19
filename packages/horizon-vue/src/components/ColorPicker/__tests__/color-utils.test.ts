import { describe, expect, test, vi } from 'vitest';
import type { ColorPickerProps } from '../src/composables/useProps';
import ColorPickerColor, { ColorTypeEnum } from '../src/utils/ColorPickerColor';
import SingleColor from '../src/utils/SingleColor';
import {
  bound01,
  combineRegExp,
  generateRegExp,
  hexOne,
  hsl2hsv,
  hsv2Hsl,
  hsv2rgb,
  isOnePointZero,
  isPercentage,
  parseHexChannel,
  rgb2hsv,
  toHex,
} from '../src/utils/colorHelper';
import {
  getCustomStoredColors,
  getRecentlyColors,
  recordCustomStoredColor,
  recordRecentlyColor,
  removeCustomStoredColor,
} from '../src/utils/useStorageColor';

const props = (overrides: Partial<ColorPickerProps> = {}) =>
  ({
    modelValue: '',
    alpha: false,
    format: 'hex',
    gradientList: ['linear', 'radial', 'conic'],
    ...overrides,
  }) as ColorPickerProps;

describe('ColorPicker color utilities', () => {
  test('converts every supported channel representation and boundary form', () => {
    expect(parseHexChannel('FF')).toBe(255);
    expect(parseHexChannel('0a')).toBe(10);
    expect(parseHexChannel('00')).toBe(0);
    expect(parseHexChannel('0F0')).toBe(15);
    expect(parseHexChannel('000')).toBe(0);
    expect(hexOne(0)).toBe('00');
    expect(hexOne(255.8)).toBe('FF');
    expect(toHex({ r: 255, g: 16, b: 0 })).toBe('#FF1000');
    expect(toHex({ r: Number.NaN, g: 0, b: 0 })).toBe('');
    expect(hsv2Hsl(20, 0, 0)).toEqual([20, 0, 0]);
    expect(hsl2hsv(180, 50, 25)).toEqual(expect.objectContaining({ h: 180 }));
    expect(hsl2hsv(180, 50, 75)).toEqual(expect.objectContaining({ h: 180 }));
    expect(hsl2hsv(180, 50, 150)).toEqual(expect.objectContaining({ h: 180 }));
    expect(hsl2hsv(180, 0, 0)).toEqual({ h: 180, s: 0, v: 0 });
    expect(rgb2hsv(255, 0, 0)).toEqual({ h: 0, s: 100, v: 100 });
    expect(rgb2hsv(0, 255, 0)).toEqual({ h: 120, s: 100, v: 100 });
    expect(rgb2hsv(0, 0, 255)).toEqual({ h: 240, s: 100, v: 100 });
    expect(rgb2hsv(42, 42, 42).s).toBe(0);
    expect(rgb2hsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
    expect(rgb2hsv(255, 0, 128).h).toBeGreaterThan(300);
    expect(hsv2rgb(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
    expect(hsv2rgb(120, 100, 100)).toEqual({ r: 0, g: 255, b: 0 });
    expect(hsv2rgb(240, 100, 100)).toEqual({ r: 0, g: 0, b: 255 });
    expect(bound01('1.0', 255)).toBe(1);
    expect(bound01('50%', 255)).toBeCloseTo(0.498, 2);
    expect(bound01(-10, 255)).toBe(0);
    expect(isOnePointZero('1.0')).toBe(true);
    expect(isOnePointZero(1)).toBe(false);
    expect(isPercentage('10%')).toBe(true);
    expect(isPercentage(10)).toBe(false);
  });

  test('builds the documented color and gradient regular expressions', () => {
    expect(combineRegExp(['^', /rgb/, '$'], 'i').test('RGB')).toBe(true);
    const expressions = generateRegExp();
    expect('90deg'.match(expressions.lineCapture)?.[0]).toBe('90deg');
    expect('to right, #fff 0%, rgba(0,0,0,0.5) 100%'.match(expressions.gradientSearch)).toBeTruthy();
    expect(expressions.colorStopSearch.exec('#fff 25%,')?.[1]).toBe('#fff');
  });

  test.each([
    ['hex', '#33669980'],
    ['rgb', 'rgba(51, 102, 153, 0.5)'],
    ['hsl', 'hsla(210, 50%, 40%, 0.5)'],
    ['hsv', 'hsva(210, 67%, 60%, 0.5)'],
  ] as const)('SingleColor renders %s with alpha', (format, expected) => {
    const change = vi.fn();
    const color = new SingleColor(props({ alpha: true, format }), change, '#33669980');

    expect(color.value).toBe(expected);
    expect(color.toHexArr()).toEqual(['33', '66', '99']);
    expect(color.toRgbArr()).toEqual([51, 102, 153]);
    expect(color.toHsvArr()).toEqual([210, 67, 60]);
    expect(color.valueWithoutAlpha).toBe('hsl(210, 50%, 40%)');
    expect(color.pureValue).toBe('hsl(210, 100%, 50%)');
    expect(color.pureValueWithAlpha).toBe('hsla(210, 100%, 50%, 0.5)');
  });

  test('SingleColor supports both setters, manual notification, clamps HSV and clears', () => {
    const change = vi.fn();
    const color = SingleColor.getDefaultValue(props(), change);
    const manual = vi.fn();
    color.eventCenter.on('manual-change', manual);

    color.set({ hue: 400, saturation: 20, value: 30 }, true);
    expect(manual).toHaveBeenCalledOnce();
    color.set('alpha', 45, true);
    expect(color.get('alpha')).toBe(45);
    expect(manual).toHaveBeenCalledTimes(2);
    expect(color.fromHSV(-10, 120, 50)).toEqual({ hue: 0, saturation: 100, value: 50 });
    expect(color.fromHSV(500, -1, 120)).toEqual({ hue: 360, saturation: 0, value: 100 });
    color.analysis('rgba(255, 0, 0, 0.8)', 25);
    expect(color.get('alpha')).toBe(25);
    expect(color.value).toBe('#FF0000');
    color.clearColor();
    expect(color.value).toBe('');
    expect(change).toHaveBeenCalled();
  });

  test('SingleColor uses non-alpha output paths and its default format fallback', () => {
    const color = new SingleColor(props({ alpha: false, format: 'invalid' as never }), vi.fn(), '#336699');

    expect(color.value).toBe('rgb(51, 102, 153)');
    expect(color.toRgb(true)).toBe('rgb(51, 102, 153)');
    expect(color.toHex(true)).toBe('#336699');
    expect(color.toHsl(true)).toBe('hsl(210, 50%, 40%)');
    expect(color.toHsv(true)).toBe('hsv(210, 67%, 60%)');
  });

  test.each([
    ['linear-gradient(45deg, #000 0%, #fff 100%)', ColorTypeEnum.Linear, 45],
    ['linear-gradient(to bottom left, #000, #fff)', ColorTypeEnum.Linear, 225],
    ['radial-gradient(ellipse, #000 0%, #fff 100%)', ColorTypeEnum.Radial, 90],
    ['conic-gradient(#000 0deg, #fff 360deg)', ColorTypeEnum.Conic, 90],
  ] as const)('parses and serializes %s', (value, type, degree) => {
    const color = new ColorPickerColor(props({ modelValue: value, enableGradient: true }));

    expect(ColorPickerColor.isGradientColor(value)).toBe(true);
    expect(color.colorType.value).toBe(type);
    expect(color.degree.value).toBe(degree);
    expect(color.values.value).toHaveLength(2);
    expect(color.value).toContain(`${type}-gradient`);
    expect(color.getTrackResultColor()).toContain('linear-gradient(to right');
  });

  test('manages gradient stops and public color state transitions', () => {
    const color = new ColorPickerColor(props({ modelValue: '#FF0000', enableGradient: true }));
    expect(ColorPickerColor.isGradientColor(' #fff ')).toBe(false);
    expect(color.value).toBe('#FF0000');
    expect(color.getTrackResultColor()).toBe('#FF0000');

    color.setColorType(ColorTypeEnum.Linear);
    expect(color.values.value).toHaveLength(2);
    color.addColor('#00FF00', 50);
    const id = color.values.value[2].id;
    color.setCurrentActiveColorTarget(1);
    expect(color.activeIndex.value).toBe(1);
    color.setCurrentActiveColorTargetById(id);
    expect(color.currentActiveColorTarget.id).toBe(id);
    color.setColorPercent(75);
    expect(color.currentActiveColorTarget.percent).toBe(75);
    color.setDegree(180);
    expect(color.value).toContain('180deg');
    color.removeColor();
    expect(color.activeIndex.value).toBe(0);
    color.setColorType(ColorTypeEnum.Radial);
    color.setRadialType('ellipse');
    expect(color.value).toContain('radial-gradient(ellipse');
    color.setColorType(ColorTypeEnum.Conic);
    expect(color.value).toContain('deg');
    color.value = '#123456';
    expect(color.value).toBe('#123456');
    color.clearValue();
    expect(color.resultsValue.value).toBe('');
  });

  test('covers omitted and unconventional gradient descriptors defensively', () => {
    const color = new ColorPickerColor(props({ enableGradient: true }));
    color.setDefaultValue();
    expect(color.value).toBe('');

    color.analyseGradientColor('linear-gradient(0deg, #000, #fff)');
    expect(color.degree.value).toBe(90);
    expect(color.values.value[0].percent).toBe(0);
    color.analyseGradientColor('radial-gradient(#000, #fff)');
    expect(color.radialType.value).toBe('circle');
    color.analyseGradientColor('conic-gradient(#000, #fff)');
    expect(color.values.value[1].percent).toBe(0.5);
    color.analyseGradientColor('custom-gradient(#000 0%, #fff 100%)');
    expect(color.colorType.value).toBe(ColorTypeEnum.Conic);
    color.analyseGradientColor('not a gradient');
    expect(color.values.value).toHaveLength(1);
  });

  test('maintains recent and custom color capacity, ordering and removal', () => {
    const recent = getRecentlyColors();
    const custom = getCustomStoredColors();
    recent.value = [];
    custom.value = [];

    for (let index = 0; index < 12; index++) recordRecentlyColor(`#${index}`);
    expect(recent.value).toHaveLength(10);
    recordRecentlyColor('#5');
    expect(recent.value[0]).toBe('#5');

    for (let index = 0; index < 42; index++) recordCustomStoredColor(`#${index}`);
    expect(custom.value).toHaveLength(40);
    recordCustomStoredColor('#5');
    expect(custom.value[0]).toBe('#5');
    removeCustomStoredColor('#5');
    expect(custom.value).not.toContain('#5');
    removeCustomStoredColor('missing');
  });
});
