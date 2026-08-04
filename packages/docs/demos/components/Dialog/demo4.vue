<script setup lang="ts">
import { ref } from 'vue';

type DialogSize = 'small' | 'medium' | 'large' | 'huge';

const visible = ref(false);
const size = ref<DialogSize>('medium');
</script>

<template>
  <section class="dialog-size-demo">
    <h-segmented v-model:active-key="size" size="small">
      <h-segmented-item value="small" label="Small" />
      <h-segmented-item value="medium" label="Medium" />
      <h-segmented-item value="large" label="Large" />
      <h-segmented-item value="huge" label="Huge" />
    </h-segmented>
    <h-button @click="visible = true">预览尺寸</h-button>

    <h-dialog
      v-model:visible="visible"
      :title="`${size} 对话框`"
      :size="size"
      @ok="visible = false"
    >
      <p class="dialog-copy">根据内容密度选择尺寸，窄屏下会自动适应可用空间。</p>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-size-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-size-demo {
    inline-size: 100%;
  }
}
</style>
