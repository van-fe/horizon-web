<script setup lang="ts">
import { Decimal } from 'decimal.js';
import type { HTableSummaryMethodType } from '@aurora/horizon-web';

interface SpendRow {
  id: string;
  category: string;
  costs: string[];
}

const spend: SpendRow[] = [
  { id: 'CC-100', category: 'Cloud compute', costs: ['12840.25', '13920.80', '14510.40'] },
  { id: 'CC-110', category: 'Data warehouse', costs: ['8640.10', '8912.30', '9304.75'] },
  { id: 'CC-120', category: 'Observability', costs: ['4280.50', '4490.25', '4712.60'] },
  { id: 'CC-130', category: 'Email delivery', costs: ['1890.00', '2044.90', '1988.30'] },
];

const summaryMethod: HTableSummaryMethodType = ({ columns, flattenData }) => {
  const average: string[] = [];
  const total: string[] = [];
  columns.forEach((_, index) => {
    if (index === 0) {
      average.push('Average');
      total.push('Total');
      return;
    }
    if (index === 1) {
      average.push(`${flattenData.length} categories`);
      total.push('Quarter');
      return;
    }
    const costIndex = index - 2;
    const sum = flattenData.reduce((result, row) => {
      const cost = (row as SpendRow).costs[costIndex] ?? 0;
      return result.add(String(cost));
    }, new Decimal(0));
    average.push(`$${sum.div(flattenData.length).toFixed(2)}`);
    total.push(`$${sum.toFixed(2)}`);
  });
  return [average, total];
};
</script>

<template>
  <h-table
    :data="spend"
    row-key="id"
    border="full"
    show-summary
    :summary-row-amount="2"
    :summary-method="summaryMethod"
  >
    <h-table-column title="Code" field="id" width="100" />
    <h-table-column title="Category" field="category" min-width="180" />
    <h-table-column
      v-for="(month, index) in ['May', 'Jun', 'Jul']"
      :key="month"
      :title="month"
      :field="`costs[${index}]`"
      width="130"
      align="right"
      header-align="right"
      footer-align="right"
    />
  </h-table>
</template>
