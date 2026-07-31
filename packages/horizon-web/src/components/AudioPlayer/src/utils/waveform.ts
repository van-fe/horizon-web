export function normalizeWaveform(values: readonly number[], count: number): number[] {
  if (!values.length || count <= 0) return [];

  const safe = values.map(value => (Number.isFinite(value) ? Math.abs(value) : 0));
  const max = Math.max(...safe, 0.0001);
  const result: number[] = [];

  for (let index = 0; index < count; index += 1) {
    const start = Math.floor((index * safe.length) / count);
    const end = Math.max(start + 1, Math.floor(((index + 1) * safe.length) / count));
    let peak = 0;
    for (let sourceIndex = start; sourceIndex < Math.min(end, safe.length); sourceIndex += 1) {
      peak = Math.max(peak, safe[sourceIndex]);
    }
    result.push(Math.max(0.08, Math.min(1, peak / max)));
  }

  return result;
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** 生成可复现且更接近语音节奏的模拟波形。 */
export function createMockWaveform(seed: string, count: number): number[] {
  let state = hashSeed(seed || 'horizon-audio-player') || 1;
  const random = () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => {
    const envelope = 0.48 + Math.sin((index / Math.max(1, count - 1)) * Math.PI) * 0.32;
    return Math.max(0.1, Math.min(1, envelope * (0.38 + random() * 0.72)));
  });
}

export function extractWaveform(channelData: Float32Array, count: number): number[] {
  if (!channelData.length) return [];
  const peaks = Array.from({ length: count }, (_, index) => {
    const start = Math.floor((index * channelData.length) / count);
    const end = Math.max(start + 1, Math.floor(((index + 1) * channelData.length) / count));
    let peak = 0;
    for (let sample = start; sample < Math.min(end, channelData.length); sample += 1) {
      peak = Math.max(peak, Math.abs(channelData[sample]));
    }
    return peak;
  });
  return normalizeWaveform(peaks, count);
}
