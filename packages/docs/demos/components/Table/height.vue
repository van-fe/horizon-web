<template>
  <h-table :data="data" height="300px">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
    <h-table-column title="Message" field="message" show-overflow-tooltip max-width="300" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

interface TableData {
  name: string;
  birthday: string;
  address: string;
  message: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map(_ => ({
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.address.streetAddress(true),
  message: faker.hacker.phrase(),
})));
</script>
