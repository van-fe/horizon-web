<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <section class="dialog-position-demo">
    <h-button @click="visible = true">查看顶部位置</h-button>

    <h-dialog v-model:visible="visible" title="创建项目" :top="80" @ok="visible = false">
      <p class="dialog-copy">固定视觉起点适合长表单或需要保留下方空间的任务。</p>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-position-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-position-demo {
    inline-size: 100%;
  }
}
</style>
