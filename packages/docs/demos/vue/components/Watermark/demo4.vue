<script setup lang="ts">
import { ref } from 'vue';

const watermarkHost = ref<HTMLElement | null>(null);
const status = ref('Watermark intact');

function simulateTamper() {
  const root = watermarkHost.value?.firstElementChild;
  const layer = root?.lastElementChild as HTMLElement | null;

  if (layer?.style.pointerEvents === 'none') {
    layer.remove();
  } else {
    status.value = 'Watermark is still loading';
  }
}
</script>

<template>
  <div class="watermark-tamper-demo">
    <div class="watermark-tamper-demo-action">
      <h-button size="small" @click="simulateTamper">Simulate tampering</h-button>
      <span aria-live="polite">{{ status }}</span>
    </div>

    <div ref="watermarkHost">
      <h-watermark
        content="Confidential · Review copy"
        :opacity="0.14"
        :gap="[96, 56]"
        @tampered="status = 'Watermark restored'"
      >
        <div class="watermark-tamper-demo-document">
          <strong>Production access</strong>
          <p>Temporary deployment access expires after release.</p>
        </div>
      </h-watermark>
    </div>
  </div>
</template>

<style scoped>
.watermark-tamper-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.watermark-tamper-demo-action {
  display: flex;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
  align-items: center;
}

.watermark-tamper-demo-action span,
.watermark-tamper-demo-document p {
  color: var(--h-text-secondary);
}

.watermark-tamper-demo-document {
  min-height: 240px;
  padding: var(--h-spacing-6);
  background: var(--h-bg-weak-default);
}

@media (width <= 520px) {
  .watermark-tamper-demo-document {
    padding: var(--h-spacing-4);
  }
}
</style>
