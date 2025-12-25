<template>
  <n-button class="mb-2" @click="insertData()">Increase Data</n-button>
  <n-table-v3 :data="data" :max-height="300">
    <n-table-column-v3 title="Seq" type="index" :fixed="true" />
    <n-table-column-v3 title="Name" field="name" fixed />
    <n-table-column-v3 title="Birthday" field="birthday" min-width="200px" />
    <n-table-column-v3 title="Address" field="address" min-width="500px" />
    <n-table-column-v3 title="Message" field="message" show-overflow-tooltip width="800px" />
    <n-table-column-v3 title="Operations" fixed="right" min-width="120px" align="center" header-align="center">
      <template #default="scope">
        <n-button link size="small" @click="view(scope.row)">View</n-button>
        <n-button link size="small" @click="edit(scope.row)">Edit</n-button>
      </template>
    </n-table-column-v3>
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
