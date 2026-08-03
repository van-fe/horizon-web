<script setup lang="ts">
import { ref } from 'vue';

type TagType = 'success' | 'info' | 'warning' | 'error' | '';

const statuses: Array<{ value: string; label: string; type: TagType }> = [
  { value: 'planned', label: '待排期', type: '' },
  { value: 'building', label: '开发中', type: 'info' },
  { value: 'blocked', label: '有风险', type: 'warning' },
  { value: 'failed', label: '未通过', type: 'error' },
  { value: 'released', label: '已发布', type: 'success' },
];
const selected = ref<string[]>(['building', 'blocked', 'released']);

function getStatus(value: string) {
  return statuses.find(status => status.value === value) ?? statuses[0];
}
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      clearable
      collapse-tags
      collapse-tags-tooltip
      :to-body="false"
    >
      <h-option v-for="status in statuses" :key="status.value" v-bind="status" />
      <template #tagRender="props">
        <h-tag :type="getStatus(props?.value ?? '').type" plain :clickable="false">
          {{ getStatus(props?.value ?? '').label }}
        </h-tag>
      </template>
    </h-select>
    <p class="docs-demo__status">{{ selected.length }} 种状态</p>
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
