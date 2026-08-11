import { describe, expect, test } from 'vitest';
import { createMockWaveform, extractWaveform, normalizeWaveform } from '../src/utils/waveform';
import { useAudioPlayerProps } from '../src/composables/useProps';
import { useAudioPlayerEmits } from '../src/composables/useEmits';

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
    expect(normalizeWaveform([], 8)).toEqual([]);
    expect(normalizeWaveform([1], 0)).toEqual([]);
    expect(normalizeWaveform([0, 0], 4)).toEqual([0.08, 0.08, 0.08, 0.08]);
  });

  test('extracts peaks from decoded PCM samples', () => {
    expect(extractWaveform(new Float32Array([0.1, -0.5, 0.2, 1]), 2)).toEqual([0.5, 1]);
    expect(extractWaveform(new Float32Array(), 8)).toEqual([]);
  });

  test('uses deterministic defaults for empty seeds and single-bar waveforms', () => {
    expect(createMockWaveform('', 1)).toEqual(createMockWaveform('', 1));
    expect(createMockWaveform('', 1)).toHaveLength(1);
    expect(createMockWaveform('', 0)).toEqual([]);
  });

  test('validates prop boundaries', () => {
    expect(useAudioPlayerProps.barCount.validator?.(8)).toBe(true);
    expect(useAudioPlayerProps.barCount.validator?.(300)).toBe(true);
    expect(useAudioPlayerProps.barCount.validator?.(7)).toBe(false);
    expect(useAudioPlayerProps.barCount.validator?.(8.5)).toBe(false);
    expect(useAudioPlayerProps.barCount.validator?.(301)).toBe(false);
    expect(useAudioPlayerProps.volume.validator?.(0)).toBe(true);
    expect(useAudioPlayerProps.volume.validator?.(1)).toBe(true);
    expect(useAudioPlayerProps.volume.validator?.(-0.1)).toBe(false);
    expect(useAudioPlayerProps.volume.validator?.(1.1)).toBe(false);
  });

  test('validates all emit payload boundaries', () => {
    const audio = document.createElement('audio');
    const event = new Event('play');
    expect(useAudioPlayerEmits.ready(audio)).toBe(true);
    expect(useAudioPlayerEmits.ready({} as HTMLAudioElement)).toBe(false);
    for (const name of ['play', 'pause', 'ended', 'error'] as const) {
      expect(useAudioPlayerEmits[name](event)).toBe(true);
      expect(useAudioPlayerEmits[name]({} as Event)).toBe(false);
    }
    expect(useAudioPlayerEmits.timeupdate(1, 2)).toBe(true);
    expect(useAudioPlayerEmits.timeupdate(Number.NaN, 2)).toBe(false);
    expect(useAudioPlayerEmits.timeupdate(1, Number.POSITIVE_INFINITY)).toBe(false);
    expect(useAudioPlayerEmits.seek(0)).toBe(true);
    expect(useAudioPlayerEmits.seek(Number.NaN)).toBe(false);
    expect(useAudioPlayerEmits.volumeChange(0, true)).toBe(true);
    expect(useAudioPlayerEmits.volumeChange(1, false)).toBe(true);
    expect(useAudioPlayerEmits.volumeChange(-1, false)).toBe(false);
    expect(useAudioPlayerEmits.volumeChange(2, false)).toBe(false);
    expect(useAudioPlayerEmits.volumeChange(0.5, 'false' as never)).toBe(false);
    expect(useAudioPlayerEmits.rateChange(1)).toBe(true);
    expect(useAudioPlayerEmits.rateChange(Number.NaN)).toBe(false);
    expect(useAudioPlayerEmits.rateChange(0)).toBe(false);
    expect(useAudioPlayerEmits.waveformReady([0.5], 'provided')).toBe(true);
    expect(useAudioPlayerEmits.waveformReady(null as never, 'provided')).toBe(false);
    expect(useAudioPlayerEmits.waveformReady([], 'invalid' as never)).toBe(false);
  });
});
