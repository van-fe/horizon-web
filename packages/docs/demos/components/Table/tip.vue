<template>
  <h-table :data="data">
    <h-table-column title="Name" field="name" tip="Without family name" />
    <h-table-column title="Age" field="age" tip="The people's age" />
    <h-table-column title="Location" field="location" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  location: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, location: 'Shanghai'},
  {name: 'Jacob', age: 16, location: 'Shenzhen'},
  {name: 'Guang', age: 22, location: 'Hangzhou'},
  {name: 'Alice', age: 26, location: 'Beijing'},
]);
</script>
