<template>
  <h-table :data="data" height="500" row-key="uuid" :dynamic-load="dynamicLoad" @update:data="onUpdate">
    <h-table-column title="Seq" type="index" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { HTableTransformedRowDataType } from '@aurora/horizon-web';

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
  uuid: faker.string.uuid(),
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  children: childAmount > 0 && level < 4 ? createData(childAmount, childAmount - 2, level + 1) : [],
  isLeaf: childAmount <= 0 ? (level >= 4 ? true : faker.datatype.boolean()) : undefined,
}));

const data = ref<TableData[]>(createData(20, 6));

function dynamicLoad(rowData: HTableTransformedRowDataType) {
  console.info(rowData);

  return new Promise<TableData[]>(resolve => {
    setTimeout(() => {
      resolve(createData(2, 0));
    }, 2000);
  });
}

function onUpdate(data: any) {
  console.info(data);
}
</script>
