<template>
  <h-table :data="data" height="500" row-key="uuid">
    <h-table-column title="Seq" type="index" :index="(index) => index * 2" />
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
  uuid: string;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map(() => ({
  uuid: faker.string.uuid(),
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));
</script>
