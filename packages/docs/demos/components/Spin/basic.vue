<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
</script>

<template>
  <section class="spin-basic-demo">
    <h-segmented v-model:active-key="size" size="small" block aria-label="Spinner size">
      <h-segmented-item key="small" label="Small" />
      <h-segmented-item key="medium" label="Medium" />
      <h-segmented-item key="large" label="Large" />
    </h-segmented>
    <div class="spin-basic-demo__preview">
      <h-spin :size="size" tip="Loading" />
    </div>
  </section>
</template>

<style scoped>
.spin-basic-demo {
  display: grid;
  gap: var(--h-spacing-4);
  max-inline-size: 420px;
}

.spin-basic-demo__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 120px;
}
</style>
