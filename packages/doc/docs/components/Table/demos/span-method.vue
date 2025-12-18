<template>
  <n-table-v3 :data="data" :span-method="arraySpanMethod" row-key="id" :height="400" border>
    <n-table-column-v3 title="Part No." field="partNo" width="120" />
    <n-table-column-v3 title="Parent SV Number" field="parentSVNumber" />
    <n-table-column-v3 title="Status">
      <template #default="scope">
        <n-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </n-tag>
      </template>
    </n-table-column-v3>
  </n-table-v3>

  <n-table-v3 :data="data" :span-method="objectSpanMethod" row-key="id" :max-height="400" class="mt-3" border>
    <n-table-column-v3 title="Part No." field="partNo" width="120" />
    <n-table-column-v3 title="Parent SV Number" field="parentSVNumber" />
    <n-table-column-v3 title="Status">
      <template #default="scope">
        <n-tag :type="scope.row.status === 'released' ? 'success' : 'info'" :clickable="false">
          {{ scope.row.status }}
        </n-tag>
      </template>
    </n-table-column-v3>
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import { type NTableSpanMethodType } from '@aurora/horizon-web';

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
    partNo = `P${faker.datatype.number({min: 1000000, max: 9999999})}`;
  } else {
    count++;
  }

  return partNo;
}

const data = ref<TableData[]>((new Array(20)).fill(0).map(() => ({
  id: faker.datatype.uuid(),
  partNo: createPartNo(),
  parentSVNumber: `P${faker.datatype.number({min: 1000000, max: 9999999})}`,
  status: faker.helpers.arrayElement(['released', 'working']),
})));

const arraySpanMethod: NTableSpanMethodType = (data) => {
  if (data.columnIndex === 0) {
    if (data.rowIndex % 3 === 0) {
      return [3, 1];
    } else {
      return [0, 0];
    }
  }
};

const objectSpanMethod: NTableSpanMethodType = (data) => {
  if (data.rowIndex % 2 === 0) {
    if (data.columnIndex === 0) {
      return [1, 2];
    } else if (data.columnIndex === 1) {
      return [0, 0];
    }
  }
};
</script>
