<template>
  <h-table :data="data" max-height="500" row-key="id" border="full" :show-summary="true">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Price 1" field="prices[0]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 2" field="prices[1]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 3" field="prices[2]" align="right" footer-align="right" header-align="right" />
  </h-table>
  <h-table
    :data="data"
    max-height="500"
    row-key="id"
    border="full"
    :show-summary="true"
    :summary-row-amount="2"
    :summary-method="summaryMethod"
    class="mt-3"
    table-layout="fixed"
  >
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Price 1" field="prices[0]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 2" field="prices[1]" align="right" footer-align="right" header-align="right" />
    <h-table-column title="Price 3" field="prices[2]" align="right" footer-align="right" header-align="right" />
  </h-table>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import type { VNode } from 'vue';
import { faker } from '@faker-js/faker';
import { NTableSummaryMethodType } from '@aurora/horizon-web';
import { Decimal } from 'decimal.js';
import get from 'lodash/get';

interface TableData {
  id: number;
  name: string;
  prices: [string, string, string];
  children: TableData[];
}

let id = 1;

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.hacker.noun(),
  prices: [faker.finance.amount(), faker.finance.amount(), faker.finance.amount()],
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));

const summaryMethod: NTableSummaryMethodType = ({columns, data, flattenData}) => {
  const average: Array<string | VNode> = [];
  const summary: Array<string | VNode> = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      average.push(h('div', {style: 'font-weight: bolder; color: orange'} , 'Average'));
      summary.push(h('div', {style: 'font-weight: bolder; color: skyblue'} , 'Summary'));
    } else {
      let sum = new Decimal(0);
      let avg = new Decimal(0);
      for (const row of flattenData) {
        const value = get(row, column.props.field);

        if (Number.isNaN(Number(value))) {
          average.push('N/A');
          summary.push('N/A');
          return;
        } else {
          avg = avg.add(value);
          sum = sum.add(value);
        }
      }

      average.push(avg.div(flattenData.length).toFixed(2));
      summary.push(sum.toFixed(2));
    }
  });

  return [average, summary];
};
</script>
