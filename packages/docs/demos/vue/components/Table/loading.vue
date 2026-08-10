<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(true);
const payouts = [
  { batch: 'PAY-2048', region: 'APAC', transfers: 184, amount: '$248,920' },
  { batch: 'PAY-2051', region: 'EMEA', transfers: 127, amount: '$186,440' },
  { batch: 'PAY-2054', region: 'AMER', transfers: 211, amount: '$322,180' },
  { batch: 'PAY-2058', region: 'APAC', transfers: 96, amount: '$141,760' },
];
</script>

<template>
  <div class="table-loading-demo">
    <h-switch v-model="loading" label="Loading" status />
    <h-table
      :data="payouts"
      row-key="batch"
      height="300"
      :loading="loading"
      loading-text="Reconciling payout batches…"
    >
      <h-table-column title="Batch" field="batch" width="120" />
      <h-table-column title="Region" field="region" width="110" />
      <h-table-column
        title="Transfers"
        field="transfers"
        width="120"
        align="right"
        header-align="right"
      />
      <h-table-column
        title="Amount"
        field="amount"
        min-width="140"
        align="right"
        header-align="right"
      />
    </h-table>
  </div>
</template>

<style scoped>
.table-loading-demo {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-loading-demo > .h-switch {
  justify-self: start;
}
</style>
