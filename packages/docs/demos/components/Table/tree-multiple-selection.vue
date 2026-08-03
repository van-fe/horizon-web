<template>
  <h-switch v-model="checkStrictly" status status-on-text="check strictly" status-off-text="not check strictly" class="mb-4" />

  <h-table :data="data" height="500" row-key="id">
    <h-table-column
      v-model:selected-keys="checkedRows"
      title="ID"
      field="id"
      type="selection"
      column-key="id"
      :multiple="true"
      :check-strictly="checkStrictly"
    />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
  children: TableData[];
}

let id = 1;

const checkStrictly = ref(false);
const checkedRows = ref();

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));
</script>
