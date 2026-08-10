<script setup lang="ts">
import { ref } from 'vue';
import { dayjs, type HTableColumnData, HTableSortOrderEnum } from '@aurora/horizon-web';

interface MilestoneRow {
  id: number;
  milestone: string;
  owner: string;
  due: string;
  confidence: number;
}

const sortStatus = ref('Click a sortable header; hold Ctrl or Command for another sort.');
const milestones: MilestoneRow[] = [
  { id: 104, milestone: 'Security review', owner: 'Leo Martin', due: '2026-08-12', confidence: 76 },
  { id: 101, milestone: 'Design sign-off', owner: 'Iris Wang', due: '2026-08-06', confidence: 94 },
  { id: 106, milestone: 'Regional rollout', owner: 'Mina Park', due: '2026-08-21', confidence: 68 },
  { id: 103, milestone: 'Load validation', owner: 'Noah Chen', due: '2026-08-09', confidence: 84 },
  {
    id: 108,
    milestone: 'General availability',
    owner: 'Avery Kim',
    due: '2026-08-28',
    confidence: 71,
  },
];

function numberSort(order: HTableSortOrderEnum) {
  return (a: MilestoneRow, b: MilestoneRow) =>
    order === HTableSortOrderEnum.ASC ? a.id - b.id : b.id - a.id;
}

function dateSort(order: HTableSortOrderEnum) {
  return (a: MilestoneRow, b: MilestoneRow) => {
    const difference = dayjs(a.due).valueOf() - dayjs(b.due).valueOf();
    return order === HTableSortOrderEnum.ASC ? difference : -difference;
  };
}

function onSortChange(states: Array<{ column: HTableColumnData; order: HTableSortOrderEnum }>) {
  sortStatus.value = states.length
    ? `Active sort: ${states
        .map(({ column, order }) => `${column.props.title ?? column.props.field} ${order}`)
        .join(', ')}`
    : 'Sort cleared.';
}
</script>

<template>
  <div class="table-sort-demo">
    <h-table :data="milestones" row-key="id" @sort-change="onSortChange">
      <h-table-column title="ID" field="id" width="88" sortable :sort-method="numberSort" />
      <h-table-column title="Milestone" field="milestone" min-width="190" sortable />
      <h-table-column title="Owner" field="owner" min-width="140" sortable />
      <h-table-column title="Due" field="due" width="122" sortable :sort-method="dateSort" />
      <h-table-column
        title="Confidence"
        field="confidence"
        width="122"
        sortable
        align="right"
        header-align="right"
      />
    </h-table>
    <p aria-live="polite">{{ sortStatus }}</p>
  </div>
</template>

<style scoped>
.table-sort-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-sort-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
