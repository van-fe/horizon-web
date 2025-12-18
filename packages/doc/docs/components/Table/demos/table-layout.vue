<template>
  <n-radio-group v-model="tableLayout" class="mb-4">
    <n-radio-button label="auto" />
    <n-radio-button label="fixed" />
  </n-radio-group>

  <n-table-v3 :data="data" :table-layout="tableLayout" cell-class-name="custom-cell">
    <n-table-column-v3 title="ID" field="id" width="80" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender" field="gender" />
    <n-table-column-v3 title="Birthday" field="birthday" width="120" />
    <n-table-column-v3 title="Message" field="message" width="120" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TableProps } from '@nio-fe/lego';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  message: string;
}

const tableLayout = ref<TableProps['tableLayout']>('fixed');

const data = ref<TableData[]>(new Array(10).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  message: faker.hacker.phrase(),
})));
</script>

<style>
td.custom-cell {
  .n-table-v3__cell-inner {
    white-space: nowrap;
  }
}
</style>