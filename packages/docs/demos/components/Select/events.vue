<script setup lang="ts">
import { ref } from 'vue';

const countries = [
  { value: 'cn', label: '中国' },
  { value: 'sg', label: '新加坡' },
  { value: 'de', label: '德国' },
  { value: 'br', label: '巴西' },
];
const selected = ref<string[]>(['cn']);
const lastEvent = ref('等待操作');

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : '空数组';
  return value === undefined || value === null || value === '' ? '空值' : String(value);
}

function record(name: string, detail: unknown) {
  lastEvent.value = `${name} · ${displayValue(detail)}`;
}
</script>

<template>
  <div class="select-demo">
    <h-select
      v-model="selected"
      multiple
      filterable
      allow-create
      clearable
      collapse-tags
      :to-body="false"
      placeholder="选择或创建国家"
      @focus="record('focus', '已聚焦')"
      @blur="record('blur', '已失焦')"
      @change="record('change', $event)"
      @clear="record('clear', selected)"
      @deselect="record('deselect', $event)"
      @dropdown-visible-change="record('dropdown', $event ? 'open' : 'closed')"
    >
      <h-option v-for="country in countries" :key="country.value" v-bind="country" />
    </h-select>
    <p class="docs-demo__status" role="status">{{ lastEvent }}</p>
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
