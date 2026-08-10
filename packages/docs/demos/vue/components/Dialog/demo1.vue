<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const status = ref('尚未发布');

function publish() {
  visible.value = false;
  status.value = 'v2.4.0 已进入发布队列';
}
</script>

<template>
  <section class="dialog-demo">
    <h-button @click="visible = true">准备发布</h-button>
    <p role="status">{{ status }}</p>

    <h-dialog
      v-model:visible="visible"
      title="确认发布到生产环境？"
      ok-text="确认发布"
      @ok="publish"
    >
      <p class="dialog-copy">本次发布包含 12 项功能与 6 项修复，预计耗时约 4 分钟。</p>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-demo > p,
.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-demo {
    inline-size: 100%;
  }
}
</style>
