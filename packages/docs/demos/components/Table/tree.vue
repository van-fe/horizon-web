<script setup lang="ts">
import { ref } from 'vue';
import type { HTableTransformedRowDataType } from '@aurora/horizon-web';

interface ServiceRow {
  id: string;
  service: string;
  owner: string;
  environment: string;
  health: string;
  children: ServiceRow[];
  isLeaf?: boolean;
}

const loadStatus = ref('Expand Data services to lazy-load its children.');
const services = ref<ServiceRow[]>([
  {
    id: 'commerce',
    service: 'Commerce',
    owner: 'Mina Park',
    environment: 'Production',
    health: 'Healthy',
    children: [
      {
        id: 'checkout',
        service: 'Checkout API',
        owner: 'Platform',
        environment: 'Production',
        health: 'Healthy',
        children: [],
        isLeaf: true,
      },
      {
        id: 'catalog',
        service: 'Catalog index',
        owner: 'Search',
        environment: 'Production',
        health: 'Watch',
        children: [],
        isLeaf: true,
      },
    ],
  },
  {
    id: 'data',
    service: 'Data services',
    owner: 'Noah Chen',
    environment: 'Production',
    health: 'Healthy',
    children: [],
    isLeaf: false,
  },
  {
    id: 'internal',
    service: 'Internal tools',
    owner: 'Iris Wang',
    environment: 'Staging',
    health: 'Healthy',
    children: [
      {
        id: 'admin',
        service: 'Admin console',
        owner: 'Operations',
        environment: 'Staging',
        health: 'Healthy',
        children: [],
        isLeaf: true,
      },
    ],
  },
]);

function dynamicLoad(row: HTableTransformedRowDataType) {
  loadStatus.value = `Loaded child services for ${String(row.service)}.`;
  return Promise.resolve<ServiceRow[]>([
    {
      id: 'warehouse',
      service: 'Warehouse sync',
      owner: 'Data Infra',
      environment: 'Production',
      health: 'Healthy',
      children: [],
      isLeaf: true,
    },
    {
      id: 'metrics',
      service: 'Metrics pipeline',
      owner: 'Observability',
      environment: 'Production',
      health: 'Watch',
      children: [],
      isLeaf: true,
    },
  ]);
}
</script>

<template>
  <div class="table-tree-demo">
    <h-table :data="services" row-key="id" :dynamic-load="dynamicLoad" height="360">
      <h-table-column title="Service" field="service" min-width="220" />
      <h-table-column title="Owner" field="owner" min-width="145" />
      <h-table-column title="Environment" field="environment" width="130" />
      <h-table-column title="Health" field="health" width="108" />
    </h-table>
    <p aria-live="polite">{{ loadStatus }}</p>
  </div>
</template>

<style scoped>
.table-tree-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-tree-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
