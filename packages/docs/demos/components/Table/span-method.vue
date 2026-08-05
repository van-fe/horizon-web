<script setup lang="ts">
import type { HTableSpanMethodType } from '@aurora/horizon-web';

const lineItems = [
  { id: 1, order: 'ORD-4821', item: 'Team plan', quantity: 24, state: 'Approved' },
  { id: 2, order: 'ORD-4821', item: 'Audit add-on', quantity: 1, state: 'Approved' },
  { id: 3, order: 'ORD-4821', item: 'Sandbox', quantity: 2, state: 'Approved' },
  { id: 4, order: 'ORD-4828', item: 'Business plan', quantity: 18, state: 'Review' },
  { id: 5, order: 'ORD-4828', item: 'Data retention', quantity: 1, state: 'Review' },
  { id: 6, order: 'ORD-4833', item: 'Enterprise plan', quantity: 80, state: 'Approved' },
];

const spanMethod: HTableSpanMethodType = ({ rowIndex, columnIndex }) => {
  if (columnIndex !== 0) return;
  if (rowIndex === 0) return [3, 1];
  if (rowIndex === 3) return [2, 1];
  if (rowIndex === 5) return [1, 1];
  return [0, 0];
};
</script>

<template>
  <h-table :data="lineItems" row-key="id" border="full" :span-method="spanMethod">
    <h-table-column title="Order" field="order" width="130" />
    <h-table-column title="Item" field="item" min-width="190" />
    <h-table-column
      title="Quantity"
      field="quantity"
      width="110"
      align="right"
      header-align="right"
    />
    <h-table-column title="State" field="state" width="120" />
  </h-table>
</template>
