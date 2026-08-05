<script setup lang="ts">
import { ref } from 'vue';

const workstreams = [
  { value: 'design', label: '设计系统与交互规范' },
  { value: 'frontend', label: '前端组件库与业务应用集成' },
  { value: 'backend', label: '服务端接口、权限与审计链路' },
  { value: 'quality', label: '跨端自动化测试与发布质量保障' },
  { value: 'operations', label: '生产监控、告警响应与故障复盘流程' },
];
const selected = ref<string[]>(['design', 'frontend', 'backend', 'quality']);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      collapse-tags
      collapse-tags-tooltip
      collapse-tags-fill-up
      :to-body="false"
    >
      <h-option v-for="item in workstreams" :key="item.value" v-bind="item" />
    </h-select>
    <p class="docs-demo__status">{{ selected.length }} 个工作流</p>
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
