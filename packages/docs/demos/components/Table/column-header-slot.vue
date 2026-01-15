<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address">
      <template #header>
        <h-input v-model="searchedAddress" placeholder="Please search" />
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { faker } from '@faker-js/faker';

const searchedAddress = ref();

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const originData: TableData[] = new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
}));

const data = ref<TableData[]>(originData);

watch(searchedAddress, val => {
  data.value = val ? originData.filter(row => row.address.includes(val)) : originData;
});
</script>
