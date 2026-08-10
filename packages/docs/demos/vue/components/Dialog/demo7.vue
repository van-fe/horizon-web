<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const status = ref('尚未导出');

function exportReport() {
  visible.value = false;
  status.value = '报告已加入导出队列';
}
</script>

<template>
  <section class="dialog-class-demo">
    <h-button @click="visible = true">导出报告</h-button>
    <p role="status">{{ status }}</p>

    <h-dialog
      v-model:visible="visible"
      class="report-dialog"
      :class-names="{
        wrapper: 'report-dialog__wrapper',
        header: 'report-dialog__header',
        body: 'report-dialog__body',
        footer: 'report-dialog__footer',
        mask: 'report-dialog__mask',
      }"
      title="确认导出报告"
      ok-text="开始导出"
      @ok="exportReport"
    >
      <p class="dialog-copy">将过去 30 天的 12,480 条记录导出为 CSV。</p>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-class-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-class-demo > p,
.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-class-demo {
    inline-size: 100%;
  }
}
</style>

<style lang="scss">
.report-dialog {
  .report-dialog__wrapper {
    border: 1px solid var(--h-border-brand-default);
  }

  .report-dialog__header,
  .report-dialog__footer {
    background: var(--h-bg-secondary);
  }

  .report-dialog__mask {
    background: var(--h-bg-overlay-default);
  }
}
</style>
