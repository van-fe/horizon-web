<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const audioUrl = ref('');
const waveformSummary = ref('正在生成音频…');

function createToneWav() {
  const sampleRate = 8000;
  const duration = 1.2;
  const samples = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const write = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };

  write(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  write(8, 'WAVEfmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, 'data');
  view.setUint32(40, samples * 2, true);

  for (let index = 0; index < samples; index += 1) {
    const envelope = Math.sin((index / samples) * Math.PI);
    const frequency = 220 + (index / samples) * 220;
    const sample = Math.sin((index / sampleRate) * Math.PI * 2 * frequency);
    view.setInt16(44 + index * 2, sample * envelope * 0x5fff, true);
  }

  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

function regenerateAudio() {
  if (audioUrl.value) URL.revokeObjectURL(audioUrl.value);
  waveformSummary.value = '正在解析真实波形…';
  audioUrl.value = createToneWav();
}

function handleWaveformReady(values: number[], source: string) {
  waveformSummary.value = `${source === 'decoded' ? '真实解码' : '模拟降级'} · ${values.length} bars`;
}

onMounted(regenerateAudio);
onBeforeUnmount(() => {
  if (audioUrl.value) URL.revokeObjectURL(audioUrl.value);
});
</script>

<template>
  <section class="docs-demo">
    <h-audio-player
      v-if="audioUrl"
      :key="audioUrl"
      :src="audioUrl"
      waveform-source="auto"
      :bar-count="64"
      aria-label="自动解码波形示例"
      @waveform-ready="handleWaveformReady"
    />
    <div class="docs-demo__actions">
      <h-button size="small" type="normal" icon="refresh" @click="regenerateAudio">
        重新生成
      </h-button>
      <span class="docs-demo__status" aria-live="polite">{{ waveformSummary }}</span>
    </div>
  </section>
</template>
