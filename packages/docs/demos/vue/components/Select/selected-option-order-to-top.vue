<script setup lang="ts">
import { ref } from 'vue';

const serviceGroups = [
  {
    label: '在线服务',
    children: [
      { value: 'gateway', label: 'API Gateway' },
      { value: 'identity', label: 'Identity Service' },
      { value: 'billing', label: 'Billing API' },
    ],
  },
  {
    label: '异步任务',
    children: [
      { value: 'catalog', label: 'Catalog Indexer' },
      { value: 'analytics', label: 'Analytics Pipeline' },
      { value: 'notifications', label: 'Notification Worker' },
    ],
  },
];
const selected = ref<string[]>(['catalog', 'billing']);
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      clearable
      collapse-tags
      selected-option-order-to-top
      :to-body="false"
    >
      <h-option-group v-for="group in serviceGroups" :key="group.label" :label="group.label">
        <h-option v-for="service in group.children" :key="service.value" v-bind="service" />
      </h-option-group>
    </h-select>
    <p class="docs-demo__status">重新打开面板，已选项会在各组内置顶</p>
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
