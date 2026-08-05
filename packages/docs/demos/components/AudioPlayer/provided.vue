<script setup lang="ts">
import { publicAssetUrl } from '../../demo-assets';
import { ref } from 'vue';

const waveform = [
  0.12, 0.24, 0.48, 0.32, 0.72, 0.91, 0.56, 0.38, 0.64, 1, 0.82, 0.44, 0.28, 0.52, 0.76, 0.62, 0.34,
  0.18, 0.42, 0.68, 0.86, 0.58, 0.36, 0.2,
];
const waveformSummary = ref('等待波形就绪');

function handleWaveformReady(values: number[], source: string) {
  waveformSummary.value = `${source} · ${values.length} bars`;
}
</script>

<template>
  <section class="docs-demo">
    <h-audio-player
      :src="publicAssetUrl('aurora-background.mp4')"
      :waveform="waveform"
      :bar-count="48"
      aria-label="周会行动项语音备忘录"
      @waveform-ready="handleWaveformReady"
    />
    <span class="docs-demo__status" aria-live="polite">{{ waveformSummary }}</span>
  </section>
</template>
