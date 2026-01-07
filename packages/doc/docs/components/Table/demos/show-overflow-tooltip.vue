<template>
  <h-table-v3 :data="data">
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Birthday" field="birthday" width="100px" />
    <h-table-column-v3 title="Address" field="address" :show-overflow-tooltip="true" width="100px" />
    <h-table-column-v3 title="Message" field="message" />
  </h-table-v3>
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

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.address.streetAddress(true),
  message: faker.hacker.phrase(),
})));
</script>
