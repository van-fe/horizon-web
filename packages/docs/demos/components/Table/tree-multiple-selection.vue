<script setup lang="ts">
import { ref } from 'vue';

const checkStrictly = ref(false);
const selectedResources = ref<string[]>([]);
const resources = [
  {
    id: 'customer-data',
    resource: 'Customer data',
    owner: 'Data governance',
    classification: 'Restricted',
    children: [
      {
        id: 'profiles',
        resource: 'Profiles',
        owner: 'Identity',
        classification: 'Restricted',
        children: [],
      },
      {
        id: 'events',
        resource: 'Product events',
        owner: 'Analytics',
        classification: 'Internal',
        children: [],
      },
    ],
  },
  {
    id: 'operations',
    resource: 'Operations',
    owner: 'Business systems',
    classification: 'Internal',
    children: [
      {
        id: 'billing',
        resource: 'Billing reports',
        owner: 'Finance',
        classification: 'Restricted',
        children: [],
      },
      {
        id: 'runbooks',
        resource: 'Runbooks',
        owner: 'SRE',
        classification: 'Internal',
        children: [],
      },
    ],
  },
];
</script>

<template>
  <div class="table-tree-multiple-demo">
    <h-switch v-model="checkStrictly" label="Independent nodes" status />
    <h-table :data="resources" row-key="id" height="340" default-expand-all>
      <h-table-column
        v-model:selected-keys="selectedResources"
        type="selection"
        column-key="id"
        multiple
        width="48"
        align="center"
        :check-strictly="checkStrictly"
      />
      <h-table-column title="Resource" field="resource" min-width="200" />
      <h-table-column title="Owner" field="owner" min-width="160" />
      <h-table-column title="Classification" field="classification" width="130" />
    </h-table>
    <p aria-live="polite">Selected: {{ selectedResources.length }}.</p>
  </div>
</template>

<style scoped>
.table-tree-multiple-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-tree-multiple-demo > .h-switch {
  justify-self: start;
}

.table-tree-multiple-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
