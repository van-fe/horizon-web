<template>
  <p>
    <h-switch v-model="checkStrictly" status status-oh-text="check strictly" status-off-text="not check strictly" />
  </p>
  <p>
    Checked row's id: {{ checkedRow }}
  </p>

  <h-table-v3 :data="data" height="500" row-key="id">
    <h-table-column-v3
      v-model:selected-keys="checkedRow"
      title="ID"
      field="id"
      type="selection"
      column-key="id"
      :check-strictly="checkStrictly"
    />
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Gender" field="gender" />
    <h-table-column-v3 title="Birthday" field="birthday" />
    <h-table-column-v3 title="Address" field="address" />
  </h-table-v3>
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
const checkedRow = ref();

const createData = (amount: number, childAmount: number): TableData[] => new Array(amount).fill(0).map(() => ({
  id: id++,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  children: childAmount > 0 ? createData(childAmount, childAmount - 2) : [],
}));

const data = ref<TableData[]>(createData(20, 6));
</script>
