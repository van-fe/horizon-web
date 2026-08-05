<template>
  <section class="docs-demo">
    <label class="docs-demo__control">
      <span class="docs-demo__control-label">
        尺寸 ·
        <code>size</code>
      </span>
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item value="small" label="Small" />
        <h-segmented-item value="medium" label="Medium" />
        <h-segmented-item value="large" label="Large" />
      </h-segmented>
    </label>

    <div class="description-preview">
      <h-descriptions title="Environment" type="vertical" :size="size" :column="3">
        <h-description-item label="Name" value="Production" />
        <h-description-item label="Region" value="Singapore" />
        <h-description-item label="Version" value="v3.8.0" />
      </h-descriptions>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref<'small' | 'medium' | 'large'>('medium');
</script>

<style scoped>
.description-preview {
  overflow-x: auto;
}
</style>
