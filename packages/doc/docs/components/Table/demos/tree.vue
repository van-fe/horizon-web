<template>
  <n-table-v3 :data="data" height="500" row-key="uuid" :dynamic-load="dynamicLoad" @update:data="onUpdate">
    <n-table-column-v3 title="Seq" type="index" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender" field="gender" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { NTableTransformedRowDataType } from '@aurora/horizon-web';

interface TableData {
  uuid: string;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
  isLeaf: boolean | undefined;
}

const createData = (amount: number, childAmount: number, level = 0): TableData[] => new Array(amount).fill(0).map(() => ({
  uuid: faker.datatype.uuid(),
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  children: childAmount > 0 && level < 4 ? createData(childAmount, childAmount - 2, level + 1) : [],
  isLeaf: childAmount <= 0 ? (level >= 4 ? true : faker.datatype.boolean()) : undefined,
}));

const data = ref<TableData[]>(createData(20, 6));

function dynamicLoad(rowData: NTableTransformedRowDataType) {
  console.info(rowData);

  return new Promise<TableData[]>(resolve => {
    setTimeout(() => {
      resolve(createData(2, 0));
    }, 2000);
  });
}

function onUpdate(data: any) {
  console.log(data);
}
</script>
