<script setup lang="ts">
import { ref } from 'vue';

const current = ref(0);
const status = ref('点击可用步骤进行切换');
const steps = [
  { title: '资料填写', description: '已完成' },
  { title: '系统审核', description: '进行中' },
  { title: '结果确认', description: '等待中' },
  { title: '完成归档', description: '等待中' },
];

const change = (value: number) => {
  status.value = `已切换到：${steps[value]?.title ?? value}`;
};
</script>

<template>
  <div class="docs-demo">
    <div class="steps-scroll">
      <h-steps v-model="current" clickable @change="change">
        <h-step
          v-for="item in steps"
          :key="item.title"
          :title="item.title"
          :description="item.description"
        />
      </h-steps>
    </div>
    <p class="docs-demo__status" role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.steps-scroll {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-scroll :deep(.h-steps) {
  min-width: 560px;
}
</style>
