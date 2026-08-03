<script setup lang="ts">
import { ref } from 'vue';
import { IconTriangleDownFilled } from '@aurora/icon';

const customIconValue = ref('latest');
const textOnlyValue = ref('popular');
const sortOptions = [
  { value: 'latest', label: 'Latest activity' },
  { value: 'popular', label: 'Most viewed' },
  { value: 'updated', label: 'Recently updated' },
];
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>自定义图标</span>
      <h-select v-model="customIconValue" :dropdown-icon="IconTriangleDownFilled" :to-body="false">
        <h-option v-for="option in sortOptions" :key="option.value" v-bind="option" />
      </h-select>
    </label>
    <label>
      <span>隐藏图标</span>
      <h-select v-model="textOnlyValue" :dropdown-icon="false" :to-body="false">
        <h-option v-for="option in sortOptions" :key="option.value" v-bind="option" />
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
