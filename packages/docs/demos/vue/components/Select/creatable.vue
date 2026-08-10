<script setup lang="ts">
import { ref } from 'vue';

const existingLabels = [
  { value: 'frontend', label: '前端' },
  { value: 'backend', label: '后端' },
  { value: 'design', label: '设计' },
  { value: 'quality', label: '质量保障' },
];
const selected = ref<string[]>(['frontend', 'quality']);
const feedback = ref('输入新名称后按 Enter 创建');
const reservedNames = new Set(['管理员', 'admin']);

function beforeCreate(value: string, optionMap: Map<unknown, unknown>) {
  const normalized = value.trim();
  if (!normalized) {
    feedback.value = '名称不能为空';
    return false;
  }
  if (optionMap.has(normalized)) {
    feedback.value = `“${normalized}”已经存在`;
    return false;
  }
  if (reservedNames.has(normalized.toLowerCase())) {
    feedback.value = `“${normalized}”是保留名称`;
    return false;
  }
  feedback.value = `可以创建“${normalized}”`;
}
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      allow-create
      filterable
      clearable
      collapse-tags
      :before-create="beforeCreate"
      :to-body="false"
      placeholder="选择或创建标签"
    >
      <h-option v-for="item in existingLabels" :key="item.value" v-bind="item" />
    </h-select>
    <p class="docs-demo__status" role="status">{{ feedback }} · {{ selected.length }} 项</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
