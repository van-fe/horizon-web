<script setup lang="ts">
import { ref } from 'vue';
import { $confirm } from '@aurora/horizon-web';

const current = ref(0);
const status = ref('切换步骤前需要确认');
const labels = ['编辑内容', '预览检查', '发布确认'];

const beforeChange = async (next: number, previous: number) => {
  try {
    const close = await $confirm(
      `确认从“${labels[previous]}”切换到“${labels[next]}”吗？`,
      '切换步骤',
    );
    close();
    status.value = `已切换到：${labels[next]}`;
    return true;
  } catch {
    status.value = `已取消，仍停留在：${labels[previous]}`;
    return false;
  }
};
</script>

<template>
  <div class="docs-demo">
    <div class="steps-stage">
      <h-steps v-model="current" clickable :before-change="beforeChange">
        <h-step title="编辑内容" subtitle="完善版本说明" />
        <h-step title="预览检查" subtitle="核对变更范围" />
        <h-step title="发布确认" subtitle="确认目标环境" />
      </h-steps>
    </div>
    <p class="docs-demo__status" role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.steps-stage {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 480px;
}
</style>
