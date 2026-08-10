<script setup lang="ts">
import { ref } from 'vue';

const resizeStatus = ref('Drag a header divider to resize a column.');
const campaigns = [
  { campaign: 'Summer launch', channel: 'Paid social', owner: 'Mina Park', budget: '$42,000' },
  {
    campaign: 'Customer stories',
    channel: 'Lifecycle email',
    owner: 'Noah Chen',
    budget: '$18,500',
  },
  { campaign: 'Partner week', channel: 'Co-marketing', owner: 'Iris Wang', budget: '$27,250' },
  {
    campaign: 'Developer report',
    channel: 'Organic search',
    owner: 'Leo Martin',
    budget: '$14,800',
  },
];

function onResize(newWidth: number, oldWidth: number, column: { props?: { title?: string } }) {
  const label = column.props?.title ?? 'Column';
  resizeStatus.value = `${label} resized from ${Math.round(oldWidth)}px to ${Math.round(newWidth)}px.`;
}
</script>

<template>
  <div class="table-resize-demo">
    <h-table :data="campaigns" row-key="campaign" show-header-divider @header-dragend="onResize">
      <h-table-column title="Campaign" field="campaign" width="190" resizable />
      <h-table-column title="Channel" field="channel" width="170" resizable />
      <h-table-column title="Owner" field="owner" width="140" resizable />
      <h-table-column
        title="Budget"
        field="budget"
        width="120"
        align="right"
        header-align="right"
      />
    </h-table>
    <p aria-live="polite">{{ resizeStatus }}</p>
  </div>
</template>

<style scoped>
.table-resize-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-resize-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
