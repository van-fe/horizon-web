<template>
  <h-radio-group v-model="tableLayout" class="mb-4">
    <h-radio-button label="auto" />
    <h-radio-button label="fixed" />
  </h-radio-group>

  <h-table :data="data" :table-layout="tableLayout" cell-class-name="custom-cell">
    <h-table-column title="ID" field="id" width="80" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" width="120" />
    <h-table-column title="Message" field="message" width="120" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TableProps } from '@aurora/horizon-web';
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
  .h-table__cell-inner {
    white-space: nowrap;
  }
}
</style>