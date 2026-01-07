<template>
  <h-table-v3 :data="data" height="300">
    <h-table-column-v3 title="ID" field="id" type="expand">
      <template #expand="scope">
        {{ scope.row.desc }}
      </template>
    </h-table-column-v3>
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Gender">
      <template #default="scope">
        <h-tag :type="scope.row.gender === 'male' ? 'info' : 'error'" plain>{{ scope.row.gender }}</h-tag>
      </template>
    </h-table-column-v3>
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
  desc: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
  desc: faker.hacker.phrase(),
})));
</script>
