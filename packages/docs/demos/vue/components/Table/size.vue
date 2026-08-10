<script setup lang="ts">
import { ref } from 'vue';

type TableSize = 'mini' | 'small' | 'medium' | 'large';

const size = ref<TableSize>('medium');
const densityOptions: Array<{ key: TableSize; label: string }> = [
  { key: 'mini', label: 'Mini' },
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
];
const deployments = [
  { service: 'Identity API', environment: 'Production', version: 'v4.18.2' },
  { service: 'Billing worker', environment: 'Production', version: 'v2.9.0' },
  { service: 'Search indexer', environment: 'Staging', version: 'v7.4.1' },
  { service: 'Email gateway', environment: 'Staging', version: 'v3.12.6' },
];
</script>

<template>
  <div class="table-size-demo">
    <label>
      <span>Table size</span>
      <h-segmented v-model:active-key="size" size="small" block>
        <h-segmented-item
          v-for="option in densityOptions"
          :key="option.key"
          :value="option.key"
          :label="option.label"
        />
      </h-segmented>
    </label>

    <h-table :data="deployments" :size="size" row-key="service" stripe>
      <h-table-column title="Service" field="service" min-width="160" />
      <h-table-column title="Environment" field="environment" min-width="140" />
      <h-table-column title="Version" field="version" width="110" />
    </h-table>
  </div>
</template>

<style scoped>
.table-size-demo,
.table-size-demo label {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-size-demo {
  gap: var(--h-spacing-4);
}

.table-size-demo label {
  max-width: 420px;
}

.table-size-demo label > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
