<script setup lang="ts">
import { ref } from 'vue';

const defaultValue = ref(['critical', 'high', 'medium']);
const customValue = ref(['critical', 'high', 'medium', 'low']);
const priorities = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>默认统计</span>
      <h-select v-model="defaultValue" multiple use-statistic :to-body="false">
        <h-option v-for="priority in priorities" :key="priority.value" v-bind="priority" />
      </h-select>
    </label>
    <label>
      <span>自定义文案</span>
      <h-select
        v-model="customValue"
        multiple
        use-statistic
        statistic-text="优先级"
        :to-body="false"
      >
        <h-option v-for="priority in priorities" :key="priority.value" v-bind="priority" />
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
