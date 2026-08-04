<script setup lang="ts">
import { ref } from 'vue';

const align = ref('center');

const alignments = ['start', 'center', 'end', 'baseline'];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span>对齐方式</span>
        <h-segmented v-model:active-key="align" size="small">
          <h-segmented-item v-for="item in alignments" :key="item" :value="item" :label="item" />
        </h-segmented>
      </label>
    </div>

    <h-space block :align="align" size="large">
      <span>文本</span>
      <h-button>按钮</h-button>
      <span class="large-text">Aa</span>
    </h-space>
  </div>
</template>

<style scoped>
.large-text {
  color: var(--h-text-primary);
  font-size: var(--h-text-2xl);
}
</style>
