<template>
  <n-table-v3 :data="data" height="500" row-key="uuid">
    <n-table-column-v3 title="Seq" type="index" :index="(oriIndex) => oriIndex * 2" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender" field="gender" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  uuid: string;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
}

const createData = (amount: number, childAmount: number, level = 0): TableData[] => new Array(amount).fill(0).map(() => ({
  uuid: faker.datatype.uuid(),
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  children: childAmount > 0 && level < 4 ? createData(childAmount, childAmount - 2, level + 1) : [],
}));

const data = ref<TableData[]>(createData(20, 6));
</script>
