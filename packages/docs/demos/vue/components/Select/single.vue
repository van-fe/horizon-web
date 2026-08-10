<script setup lang="ts">
import { ref } from 'vue';
import { IconPin } from '@aurora/icon';

const checkedValue = ref('engineering');
const pinnedValue = ref('operations');
const teams = [
  { value: 'design', label: 'Product Design' },
  { value: 'engineering', label: 'Web Engineering' },
  { value: 'operations', label: 'Product Operations' },
];
</script>

<template>
  <div class="comparison-row">
    <label>
      <span>默认标识</span>
      <h-select v-model="checkedValue" show-selected-icon :to-body="false">
        <h-option v-for="team in teams" :key="team.value" v-bind="team" />
      </h-select>
    </label>
    <label>
      <span>自定义标识</span>
      <h-select v-model="pinnedValue" show-selected-icon :selected-icon="IconPin" :to-body="false">
        <h-option v-for="team in teams" :key="team.value" v-bind="team" />
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
