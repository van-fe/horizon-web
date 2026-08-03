<template>
  <h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender">
      <template #default="scope">
        <h-tag :type="scope.row.gender === 'male' ? 'info' : 'error'" plain>{{ scope.row.gender }}</h-tag>
      </template>
    </h-table-column>
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
    <h-table-column title="Action">
      <template #default="scope">
        <h-button type="normal" size="small" @click="view(scope)">View</h-button>
        <h-button type="normal" size="small" @click="edit(scope)">Edit</h-button>
      </template>
    </h-table-column>
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, HTableCellScopeSlots } from '@aurora/horizon-web';
import { faker } from '@faker-js/faker';

interface TableData {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
  address: string;
}

const data = ref<TableData[]>(new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.location.streetAddress(),
})));

function view(data: HTableCellScopeSlots) {
  $message(`view ${data.row.name}`);
  console.info('view: ', data);
}

function edit(data: HTableCellScopeSlots) {
  $message(`edit ${data.row.name}`);
  console.info('edit: ', data);
}
</script>
