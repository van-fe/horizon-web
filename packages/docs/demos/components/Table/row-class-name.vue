<script setup lang="ts">
interface IncidentRow {
  id: string;
  service: string;
  owner: string;
  severity: 'Critical' | 'Warning' | 'Resolved';
  updated: string;
}

const incidents: IncidentRow[] = [
  {
    id: 'INC-1842',
    service: 'Payment gateway',
    owner: 'SRE East',
    severity: 'Critical',
    updated: '2 min ago',
  },
  {
    id: 'INC-1840',
    service: 'Search indexing',
    owner: 'Core Search',
    severity: 'Warning',
    updated: '11 min ago',
  },
  {
    id: 'INC-1837',
    service: 'Email delivery',
    owner: 'Messaging',
    severity: 'Resolved',
    updated: '36 min ago',
  },
  {
    id: 'INC-1835',
    service: 'Analytics ingest',
    owner: 'Data Infra',
    severity: 'Warning',
    updated: '48 min ago',
  },
];

function rowClassName(row: IncidentRow) {
  return `table-state-row--${row.severity.toLowerCase()}`;
}
</script>

<template>
  <h-table
    class="table-row-state-demo"
    :data="incidents"
    row-key="id"
    :row-class-name="rowClassName"
  >
    <h-table-column title="Incident" field="id" width="112" />
    <h-table-column title="Service" field="service" min-width="180" />
    <h-table-column title="Owner" field="owner" min-width="130" />
    <h-table-column title="Severity" width="112">
      <template #default="{ row }">
        <h-tag
          :type="
            row.severity === 'Critical'
              ? 'error'
              : row.severity === 'Warning'
                ? 'warning'
                : 'success'
          "
          plain
        >
          {{ row.severity }}
        </h-tag>
      </template>
    </h-table-column>
    <h-table-column title="Updated" field="updated" width="112" />
  </h-table>
</template>

<style scoped>
.table-row-state-demo :deep(.table-state-row--critical td) {
  background: var(--h-bg-error-weak-default);
}

.table-row-state-demo :deep(.table-state-row--warning td) {
  background: var(--h-bg-warning-weak-default);
}

.table-row-state-demo :deep(.table-state-row--resolved td) {
  color: var(--h-text-tertiary);
}
</style>
