<template>
  <n-table-v3 :data="data" height="300">
    <n-table-column-v3 title="ID" field="id" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender" field="gender" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address">
      <template #header>
        <n-input v-model="searchedAddress" placeholder="Please search" />
      </template>
    </n-table-column-v3>
  </n-table-v3>
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
