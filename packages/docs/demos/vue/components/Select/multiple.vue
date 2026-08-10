<script setup lang="ts">
import { ref } from 'vue';

const regular = ref(['design', 'engineering']);
const collapsed = ref(['design', 'engineering', 'research', 'operations']);
const disciplines = [
  { value: 'design', label: 'Product Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'User Research' },
  { value: 'operations', label: 'Operations' },
  { value: 'analytics', label: 'Analytics' },
];
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>普通多选</span>
      <h-select v-model="regular" multiple clearable :to-body="false">
        <h-option v-for="item in disciplines" :key="item.value" v-bind="item" />
      </h-select>
    </label>
    <label>
      <span>折叠标签</span>
      <h-select
        v-model="collapsed"
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
        :to-body="false"
      >
        <h-option v-for="item in disciplines" :key="item.value" v-bind="item" />
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
