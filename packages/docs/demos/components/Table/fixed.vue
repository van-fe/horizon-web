<script setup lang="ts">
import { ref } from 'vue';

interface AccountRow {
  id: string;
  account: string;
  owner: string;
  plan: string;
  region: string;
  renewal: string;
  usage: string;
  risk: string;
}

const feedback = ref('Scroll horizontally to compare the fixed columns.');
const accounts: AccountRow[] = [
  {
    id: 'AC-0184',
    account: 'Northwind Retail',
    owner: 'Mina Park',
    plan: 'Enterprise',
    region: 'APAC',
    renewal: 'Sep 12',
    usage: '82%',
    risk: 'Low',
  },
  {
    id: 'AC-0217',
    account: 'Contoso Energy',
    owner: 'Noah Chen',
    plan: 'Business',
    region: 'EMEA',
    renewal: 'Sep 18',
    usage: '64%',
    risk: 'Medium',
  },
  {
    id: 'AC-0249',
    account: 'Fabrikam Health',
    owner: 'Iris Wang',
    plan: 'Enterprise',
    region: 'AMER',
    renewal: 'Oct 02',
    usage: '91%',
    risk: 'High',
  },
  {
    id: 'AC-0273',
    account: 'Globex Studio',
    owner: 'Leo Martin',
    plan: 'Growth',
    region: 'APAC',
    renewal: 'Oct 14',
    usage: '47%',
    risk: 'Low',
  },
];

function chooseAction(row: AccountRow) {
  feedback.value = `View selected for ${row.account}.`;
}
</script>

<template>
  <div class="table-fixed-demo">
    <h-table :data="accounts" row-key="id" stripe>
      <h-table-column title="Account" field="account" width="190" fixed />
      <h-table-column title="ID" field="id" width="100" />
      <h-table-column title="Owner" field="owner" width="150" />
      <h-table-column title="Plan" field="plan" width="140" />
      <h-table-column title="Region" field="region" width="110" />
      <h-table-column title="Renewal" field="renewal" width="120" />
      <h-table-column title="Usage" field="usage" width="100" align="right" header-align="right" />
      <h-table-column title="Risk" field="risk" width="100" />
      <h-table-column
        title="Actions"
        fixed="right"
        width="100"
        align="center"
        header-align="center"
      >
        <template #default="{ row }">
          <h-button link size="small" @click="chooseAction(row)">View</h-button>
        </template>
      </h-table-column>
    </h-table>
    <p aria-live="polite">{{ feedback }}</p>
  </div>
</template>

<style scoped>
.table-fixed-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-fixed-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
