<template>
  <h-button class="mb-2" @click="insertData()">Increase Data</h-button>
  <h-table :data="data" :max-height="300">
    <h-table-column title="Seq" type="index" :fixed="true" />
    <h-table-column title="Name" field="name" fixed />
    <h-table-column title="Birthday" field="birthday" mih-width="200px" />
    <h-table-column title="Address" field="address" mih-width="500px" />
    <h-table-column title="Message" field="message" show-overflow-tooltip width="800px" />
    <h-table-column title="Operations" fixed="right" mih-width="120px" align="center" header-align="center">
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


const data = ref<TableData[]>([]);

function insertData(amount = 1) {
  data.value.push(...(new Array(amount).fill(0).map(_ => ({
    name: faker.name.firstName(),
    birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
    address: faker.address.streetAddress(true),
    message: faker.hacker.phrase(),
  }))));
}

insertData(2);

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
</script>
