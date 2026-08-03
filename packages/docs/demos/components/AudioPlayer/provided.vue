<template>
  <h-audio-player
    src="/aurora-background.mp4"
    :waveform="waveform"
    :bar-count="48"
    @waveform-ready="handleWaveformReady"
  />
</template>

<script setup lang="ts">
const waveform = [
  0.12, 0.24, 0.48, 0.32, 0.72, 0.91, 0.56, 0.38, 0.64, 1, 0.82, 0.44, 0.28, 0.52, 0.76, 0.62, 0.34,
  0.18, 0.42, 0.68, 0.86, 0.58, 0.36, 0.2,
];

function handleWaveformReady(values: number[], source: string) {
  console.info(`waveform source: ${source}, bars: ${values.length}`);
}
</script>
