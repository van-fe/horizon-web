<template>
  <n-table-v3 :data="data" height="300">
    <n-table-column-v3 title="ID" field="id" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender">
      <template #default="scope">
        <n-tag :type="scope.row.gender === 'male' ? 'info' : 'error'" plain>{{ scope.row.gender }}</n-tag>
      </template>
    </n-table-column-v3>
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
    <n-table-column-v3 title="Action">
      <template #default="scope">
        <n-button type="normal" size="small" @click="view(scope)">View</n-button>
        <n-button type="normal" size="small" @click="edit(scope)">Edit</n-button>
      </template>
    </n-table-column-v3>
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message, NTableCellScopeSlots } from '@nio-fe/lego';
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
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  gender: faker.helpers.arrayElement(['male', 'female']),
  address: faker.address.streetAddress(true),
})));

function view(data: NTableCellScopeSlots) {
  $message(`view ${data.row.name}`);
  console.log('view: ', data);
}

function edit(data: NTableCellScopeSlots) {
  $message(`edit ${data.row.name}`);
  console.log('edit: ', data);
}
</script>
