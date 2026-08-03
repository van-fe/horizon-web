import { describe, expect, test } from 'vitest';
import { createMockWaveform, extractWaveform, normalizeWaveform } from '../src/utils/waveform';

describe('AudioPlayer waveform utilities', () => {
  test('mock waveform is stable for the same file and varies by seed', () => {
    const first = createMockWaveform('/voice/a.mp3', 32);
    expect(createMockWaveform('/voice/a.mp3', 32)).toEqual(first);
    expect(createMockWaveform('/voice/b.mp3', 32)).not.toEqual(first);
    expect(first).toHaveLength(32);
    expect(first.every(value => value >= 0.1 && value <= 1)).toBe(true);
  });

  test('normalizes and resamples provided values', () => {
    expect(normalizeWaveform([0, -2, Number.NaN, 1], 2)).toEqual([1, 0.5]);
  });

  test('extracts peaks from decoded PCM samples', () => {
    expect(extractWaveform(new Float32Array([0.1, -0.5, 0.2, 1]), 2)).toEqual([0.5, 1]);
  });
});
