<template>
  <h-table :data="data" header-sticky header-sticky-container=".VPDoc">
    <h-table-column title="Seq" type="index" :fixed="true" />
    <h-table-column title="Name" field="name" fixed />
    <h-table-column title="Birthday" field="birthday" min-width="200px" />
    <h-table-column title="Address" field="address" min-width="500px" />
    <h-table-column title="Message" field="message" show-overflow-tooltip width="800px" />
    <h-table-column title="Operations" fixed="right" min-width="120px" align="center" header-align="center">
      <template #default="scope">
        <h-button link size="small" @click="view(scope.row)">View</h-button>
        <h-button link size="small" @click="edit(scope.row)">Edit</h-button>
      </template>
    </h-table-column>
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

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
</script>
