<script setup lang="ts">
const approvals = Array.from({ length: 16 }, (_, index) => ({
  id: 'REQ-' + String(820 + index),
  requester: ['Mina Park', 'Noah Chen', 'Iris Wang', 'Leo Martin'][index % 4],
  resource: ['Production logs', 'Billing exports', 'Customer vault', 'API credentials'][index % 4],
  scope: index % 3 === 0 ? '30 days' : 'Read only',
  submitted: index + 3 + ' min ago',
}));
</script>

<template>
  <div
    class="table-sticky-demo__viewport"
    tabindex="0"
    aria-label="Scrollable access request table"
  >
    <h-table
      :data="approvals"
      row-key="id"
      header-sticky
      header-sticky-container=".table-sticky-demo__viewport"
    >
      <h-table-column title="Request" field="id" width="108" />
      <h-table-column title="Requester" field="requester" min-width="145" />
      <h-table-column title="Resource" field="resource" min-width="180" />
      <h-table-column title="Scope" field="scope" width="108" />
      <h-table-column title="Submitted" field="submitted" width="116" />
    </h-table>
  </div>
</template>

<style scoped>
.table-sticky-demo__viewport {
  max-height: 300px;
  overflow: auto;
  outline: none;
}

.table-sticky-demo__viewport:focus-visible {
  box-shadow: 0 0 0 2px var(--h-border-brand-default);
}
</style>
