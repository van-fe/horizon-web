import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import HWatermark from '..';
import { getDpr, rotateCanvas, setWaterMarkStyle } from '../src/utils/base';

const context = {
  drawImage: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({
    width: 40,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: 40,
  })),
  restore: vi.fn(),
  rotate: vi.fn(),
  translate: vi.fn(),
};

describe('Watermark', () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(320);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(180);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,test');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    context.fillText.mockClear();
  });

  test('renders slot content and a non-interactive watermark layer', async () => {
    const content = ref<string | string[]>(['Aurora', 'Internal']);
    const wrapper = mount(() => (
      <HWatermark content={content.value} offset={[12, 24]} opacity={0.25} zIndex={7}>
        <p>Protected content</p>
      </HWatermark>
    ));

    await nextTick();

    expect(wrapper.text()).toContain('Protected content');
    expect(context.fillText).toHaveBeenCalledWith('Aurora', expect.any(Number), expect.any(Number), 40);
    expect(context.fillText).toHaveBeenCalledWith(
      'Internal',
      expect.any(Number),
      expect.any(Number),
      40,
    );

    const layer = wrapper.element.lastElementChild as HTMLElement;
    expect(layer).not.toBeNull();
    expect(layer.style.pointerEvents).toBe('none');
    expect(layer.style.position).toBe('absolute');
    expect(layer.style.backgroundPosition).toBe('12px 24px');
    expect(layer.style.opacity).toBe('0.25');
    expect(layer.style.zIndex).toBe('7');

    content.value = [];
    await nextTick();
    expect(context.fillText).toHaveBeenLastCalledWith(
      '',
      expect.any(Number),
      expect.any(Number),
      40,
    );
  });

  test('global mode mounts to body and cleans up on unmount', async () => {
    const wrapper = mount(() => <HWatermark global={true}>content</HWatermark>);
    await nextTick();

    const layer = Array.from(document.body.children).find(
      element => element !== wrapper.element.parentElement && (element as HTMLElement).style.zIndex === '99999',
    ) as HTMLElement | undefined;

    expect(layer?.style.position).toBe('fixed');
    wrapper.unmount();
    expect(layer?.isConnected).toBe(false);
  });
});

describe('watermark canvas helpers', () => {
  test('serializes the watermark style', () => {
    const element = document.createElement('div');

    setWaterMarkStyle(element, 'data:test', 12, 0.4, [3, 5], true);

    expect(element.style.backgroundImage).toBe('url("data:test")');
    expect(element.style.backgroundPosition).toBe('3px 5px');
    expect(element.style.position).toBe('fixed');
    expect(element.style.zIndex).toBe('12');
  });

  test('rotates around the requested origin and keeps dpr at least two', () => {
    const canvasContext = {
      rotate: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    rotateCanvas(canvasContext, 10, 20, 90);

    expect(canvasContext.translate).toHaveBeenNthCalledWith(1, 10, 20);
    expect(canvasContext.rotate).toHaveBeenCalledWith(Math.PI / 2);
    expect(canvasContext.translate).toHaveBeenNthCalledWith(2, -10, -20);
    expect(getDpr()).toBeGreaterThanOrEqual(2);
  });
});
