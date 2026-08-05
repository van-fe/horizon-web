<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const hostRef = ref<HTMLElement | null>(null);
const cropWidth = ref(520);
const cropHeight = computed(() => Math.round(cropWidth.value * 0.625));
const previewUrl = ref('');
const cropStatus = ref('调整图片后导出裁剪结果');
const cropDetails = ref('');
let resizeObserver: ResizeObserver | undefined;

function onCrop(blob: Blob, dataUrl: string) {
  previewUrl.value = dataUrl;
  cropDetails.value = `${blob.type} · ${Math.max(1, Math.round(blob.size / 1024))} KB`;
  cropStatus.value = '已导出裁剪结果';
}

onMounted(() => {
  if (!hostRef.value || typeof ResizeObserver === 'undefined') return;
  resizeObserver = new ResizeObserver(([entry]) => {
    cropWidth.value = Math.max(280, Math.min(520, Math.floor(entry.contentRect.width)));
  });
  resizeObserver.observe(hostRef.value);
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <section ref="hostRef" class="cropper-demo">
    <h-image-cropper
      :key="`${cropWidth}-${cropHeight}`"
      src="/demo-assets/scene-aurora.svg"
      :width="cropWidth"
      :height="cropHeight"
      @crop="onCrop"
    />

    <div v-if="previewUrl" class="crop-result">
      <img :src="previewUrl" alt="裁剪结果预览" />
      <p role="status">{{ cropStatus }} · {{ cropDetails }}</p>
    </div>
    <p v-else role="status">{{ cropStatus }}</p>
  </section>
</template>

<style scoped>
.cropper-demo {
  display: grid;
  min-width: 0;
  overflow-x: auto;
  gap: var(--h-spacing-4);
}

.crop-result {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
}

.crop-result img {
  width: 72px;
  height: 48px;
  border-radius: var(--h-radius-m);
  object-fit: cover;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .cropper-demo {
    gap: var(--h-spacing-3);
  }

  .crop-result img {
    width: 64px;
    height: 40px;
  }
}
</style>
