<script setup lang="ts">
import { ref } from 'vue';

const current = ref(0);
const completed = ref(false);
const steps = [
  { title: '基本信息', content: '填写项目名称、负责人和计划周期。' },
  { title: '成员权限', content: '邀请协作者并设置项目角色。' },
  { title: '完成创建', content: '核对设置后创建新的工作空间。' },
];

const next = () => {
  if (current.value < steps.length - 1) current.value += 1;
  else completed.value = true;
};

const previous = () => {
  completed.value = false;
  if (current.value > 0) current.value -= 1;
};
</script>

<template>
  <div class="docs-demo">
    <div class="steps-stage">
      <h-steps v-model="current">
        <h-step v-for="item in steps" :key="item.title" :title="item.title" />
      </h-steps>
    </div>
    <p class="step-summary">
      <strong>{{ steps[current]?.title }}</strong>
      <span>{{ steps[current]?.content }}</span>
    </p>
    <div class="step-actions">
      <h-button type="normal" :disabled="current === 0" @click="previous">上一步</h-button>
      <h-button :disabled="completed" @click="next">
        {{ current === steps.length - 1 ? (completed ? '已完成' : '完成创建') : '下一步' }}
      </h-button>
    </div>
    <p v-if="completed" class="docs-demo__status" role="status">工作空间已创建</p>
  </div>
</template>

<style scoped>
.steps-stage {
  overflow-x: auto;
  padding-block: 12px;
}

.steps-stage :deep(.h-steps) {
  min-width: 460px;
}

.step-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin: 0;
  padding: 12px 0;
}

.step-summary span {
  color: var(--h-text-secondary);
  font-size: 13px;
}

.step-summary strong {
  color: var(--h-text-primary);
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
