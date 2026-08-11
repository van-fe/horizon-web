import { describe, expect, test } from 'vitest';
import useZoom from '../src/composables/useZoom';

const createImageState = () => ({
  naturalWidth: 500,
  naturalHeight: 2000,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  ratio: 1,
});

describe('Viewer useZoom', () => {
  test('keeps a long image readable and starts it at the top', () => {
    const viewport = { width: 1000, height: 600 };
    const image = createImageState();
    const { moveToStart, zoomToAdjust } = useZoom(viewport, image);

    zoomToAdjust();
    moveToStart();

    expect(image).toMatchObject({
      width: 500,
      height: 2000,
      ratio: 1,
      left: 250,
      top: 0,
    });
  });

  test('pans an overflowing image and constrains it to viewport edges', () => {
    const viewport = { width: 1000, height: 600 };
    const image = createImageState();
    const { moveToStart, panBy, zoomToAdjust } = useZoom(viewport, image);
    zoomToAdjust();
    moveToStart();

    panBy(0, 120);
    expect(image.top).toBe(-120);

    panBy(0, 2000);
    expect(image.top).toBe(-1400);

    panBy(0, -2000);
    expect(image.top).toBe(0);
  });

  test('keeps the image content under the pinch point while zooming', () => {
    const viewport = { width: 1000, height: 600 };
    const image = {
      ...createImageState(),
      naturalWidth: 1000,
      naturalHeight: 4000,
    };
    const { moveToStart, zoomToAdjust, zoomToRatio } = useZoom(viewport, image);
    zoomToAdjust();
    moveToStart();

    zoomToRatio(2, { x: 400, y: 200 });

    expect(image).toMatchObject({
      width: 2000,
      height: 8000,
      ratio: 2,
      left: -400,
      top: -200,
    });
  });

  test('continues to fit regular images entirely within the viewport', () => {
    const viewport = { width: 1000, height: 600 };
    const image = {
      ...createImageState(),
      naturalWidth: 1600,
      naturalHeight: 900,
    };
    const { moveToStart, zoomToAdjust } = useZoom(viewport, image);

    zoomToAdjust();
    moveToStart();

    expect(image.width).toBeCloseTo(1000);
    expect(image.height).toBeCloseTo(562.5);
    expect(image.left).toBeCloseTo(0);
    expect(image.top).toBeCloseTo(18.75);
  });
});
