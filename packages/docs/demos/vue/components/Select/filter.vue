<script setup lang="ts">
import { ref } from 'vue';

type EnvironmentOption = { value: string; label: string; description: string };

const environments: EnvironmentOption[] = [
  { value: 'prod-cn', label: 'Production CN', description: '生产 · 上海' },
  { value: 'prod-eu', label: 'Production EU', description: '生产 · 法兰克福' },
  { value: 'stage-cn', label: 'Staging CN', description: '预发布 · 北京' },
  { value: 'test-ap', label: 'Testing APAC', description: '测试 · 新加坡' },
];
const defaultValue = ref<string>();
const exactValue = ref<string>();

function caseSensitiveFilter(input: string, props: EnvironmentOption) {
  return props.label.includes(input) || props.description.includes(input);
}
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>默认筛选</span>
      <h-select
        v-model="defaultValue"
        filterable
        clearable
        :to-body="false"
        placeholder="输入 production"
      >
        <h-option v-for="item in environments" :key="item.value" v-bind="item" />
      </h-select>
    </label>
    <label>
      <span>区分大小写</span>
      <h-select
        v-model="exactValue"
        filterable
        clearable
        :filter-method="caseSensitiveFilter"
        :to-body="false"
        placeholder="输入 Production"
      >
        <h-option v-for="item in environments" :key="item.value" v-bind="item" />
      </h-select>
    </label>
  </div>
</template>

<style scoped>
.comparison-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.comparison-row label {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.comparison-row span {
  color: var(--h-text-secondary);
  font-size: 12px;
}

.comparison-row :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

@media (max-width: 560px) {
  .comparison-row {
    grid-template-columns: 1fr;
  }
}
</style>
