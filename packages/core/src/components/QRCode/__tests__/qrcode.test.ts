import { describe, expect, it } from 'vitest';
import {
  isQRCodeLevel,
  isQRCodeMargin,
  isQRCodeSize,
  QR_CODE_DEFAULTS,
  QRCodeGenerationController,
  resolveQRCodeRenderOptions,
} from '..';

describe('QRCode contract', () => {
  it('owns defaults, validators and normalized render options', () => {
    expect(isQRCodeLevel('H')).toBe(true);
    expect(isQRCodeLevel('X')).toBe(false);
    expect(isQRCodeSize(1)).toBe(true);
    expect(isQRCodeSize(0)).toBe(false);
    expect(isQRCodeMargin(0)).toBe(true);
    expect(isQRCodeMargin(1.5)).toBe(false);
    expect(resolveQRCodeRenderOptions({ value: '', ...QR_CODE_DEFAULTS })).toEqual({
      value: ' ',
      size: 160,
      level: 'M',
      color: '#000000',
      background: '#ffffff',
      margin: 1,
    });
  });

  it('accepts only the newest generation and ignores work after destroy', async () => {
    const controller = new QRCodeGenerationController();
    let resolveOlder!: (value: string) => void;
    const older = controller.render(() => new Promise<string>(resolve => (resolveOlder = resolve)));
    const newest = controller.render(() => '<svg id="newest" />');
    resolveOlder('<svg id="older" />');
    await expect(older).resolves.toEqual({ status: 'stale' });
    await expect(newest).resolves.toEqual({ status: 'rendered', svg: '<svg id="newest" />' });

    await expect(
      controller.render(() => Promise.reject(new Error('failed'))),
    ).resolves.toMatchObject({
      status: 'rejected',
    });
    controller.destroy();
    await expect(controller.render(() => '<svg />')).resolves.toEqual({ status: 'stale' });
  });
});
