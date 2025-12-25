<template>
  <n-switch
    v-model="showHeaderDivider"
    class="mb-2"
    status
    status-on-text="Shown Header Divider"
    status-off-text="Hidden Header Divider"
  />

  <n-table-v3 :data="data" :show-header-divider="showHeaderDivider">
    <n-table-column-v3 title="Seq" type="index" :fixed="true" :resizable="false" />
    <n-table-column-v3 title="Name" field="name" fixed resizable />
    <n-table-column-v3 title="Birthday" field="birthday" width="200px" resizable show-overflow-tooltip />
    <n-table-column-v3 title="Address" field="address" min-width="500px" resizable />
    <n-table-column-v3 title="Message" field="message" show-overflow-tooltip width="800px" />
    <n-table-column-v3 title="Operations" fixed="right" min-width="120px" align="center" header-align="center" resizable>
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

const showHeaderDivider = ref(true);

const data = ref<TableData[]>(new Array(5).fill(0).map(_ => ({
  name: faker.name.firstName(),
  birthday: faker.date.birthdate({ min: 22, max: 50, mode: 'age' }).toDateString(),
  address: faker.address.streetAddress(true),
  message: faker.hacker.phrase(),
})));

function view(data: TableData) {
  console.info('view:', data.name);
}

function edit(data: TableData) {
  console.info('edit:', data.name);
}
</script>
