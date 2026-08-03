<template>
  <h-table :data="data" :span-method="arraySpanMethod" row-key="id" :height="400" border>
    <h-table-column title="Part No." field="partNo" width="120" />
    <h-table-column title="Parent SV Number" field="parentSVNumber" />
    <h-table-column title="Status">
      <template #default="scope">
        <h-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </h-tag>
      </template>
    </h-table-column>
  </h-table>

  <h-table :data="data" :span-method="objectSpanMethod" row-key="id" :max-height="400" class="mt-3" border>
    <h-table-column title="Part No." field="partNo" width="120" />
    <h-table-column title="Parent SV Number" field="parentSVNumber" />
    <h-table-column title="Status">
      <template #default="scope">
        <h-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </h-tag>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { type HTableSpanMethodType } from '@aurora/horizon-web';

interface TableData {
  id: string;
  partNo: string;
  parentSVNumber: string;
  status: string;
}

let count = 2;
let partNo = '';
function createPartNo() {
  if (count === 2) {
    count = 0;
    partNo = `P${faker.helpers.rangeToNumber({min: 1000000, max: 9999999})}`;
  } else {
    count++;
  }

  return partNo;
}

const data = ref<TableData[]>((new Array(20)).fill(0).map(() => ({
  id: faker.string.uuid(),
  partNo: createPartNo(),
  parentSVNumber: `P${faker.helpers.rangeToNumber({min: 1000000, max: 9999999})}`,
  status: faker.helpers.arrayElement(['released', 'working']),
})));

const arraySpanMethod: HTableSpanMethodType = (scope) => {
  if (scope.columnIndex === 0) {
    if (scope.rowIndex % 3 === 0) {
      return [Math.min(3, data.value.length - scope.rowIndex), 1];
    } else {
      return [0, 0];
    }
  }
};

const objectSpanMethod: HTableSpanMethodType = (scope) => {
  if (scope.rowIndex % 2 === 0) {
    if (scope.columnIndex === 0) {
      return { rowSpan: 1, colSpan: 2 };
    } else if (scope.columnIndex === 1) {
      return { rowSpan: 0, colSpan: 0 };
    }
  }
};
</script>
