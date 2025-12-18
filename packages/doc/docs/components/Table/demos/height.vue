<template>
  <n-table-v3 :data="data" height="300px">
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
    <n-table-column-v3 title="Message" field="message" show-overflow-tooltip max-width="300" />
  </n-table-v3>
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
