<script setup lang="ts">
import { computed, ref } from 'vue';

type BorderChoice = 'default' | 'full' | 'outer' | 'none';

const borderChoice = ref<BorderChoice>('full');
const borderValue = computed(() => (borderChoice.value === 'none' ? false : borderChoice.value));
const items = [
  { item: 'Research interviews', quantity: 8, rate: '$120', total: '$960' },
  { item: 'Prototype review', quantity: 2, rate: '$450', total: '$900' },
  { item: 'Accessibility audit', quantity: 1, rate: '$780', total: '$780' },
  { item: 'Delivery workshop', quantity: 1, rate: '$620', total: '$620' },
];
</script>

<template>
  <div class="table-border-demo">
    <label>
      <span>Border mode</span>
      <h-segmented v-model:active-key="borderChoice" size="small" block>
        <h-segmented-item value="default" label="Default" />
        <h-segmented-item value="full" label="Full" />
        <h-segmented-item value="outer" label="Outer" />
        <h-segmented-item value="none" label="None" />
      </h-segmented>
    </label>

    <h-table :data="items" :border="borderValue">
      <h-table-column title="Line item" field="item" min-width="210" />
      <h-table-column title="Qty" field="quantity" width="76" align="right" header-align="right" />
      <h-table-column title="Rate" field="rate" width="100" align="right" header-align="right" />
      <h-table-column title="Total" field="total" width="110" align="right" header-align="right" />
    </h-table>
  </div>
</template>

<style scoped>
.table-border-demo,
.table-border-demo label {
  display: grid;
  min-width: 0;
  gap: var(--h-spacing-3);
}

.table-border-demo {
  gap: var(--h-spacing-4);
}

.table-border-demo label {
  max-width: 420px;
}

.table-border-demo label > span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
