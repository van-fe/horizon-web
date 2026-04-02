<template>
  <h-table :data="data">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Birthday" field="birthday" width="100px" />
    <h-table-column title="Address" field="address" :show-overflow-tooltip="true" width="100px" />
    <h-table-column title="Message" field="message" />
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

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.location.streetAddress(),
  message: faker.hacker.phrase(),
})));
</script>
