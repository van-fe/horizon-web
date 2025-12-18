<template>
  <n-table-v3 :data="data">
    <n-table-column-v3 title="Name" field="name" tip="Without family name" />
    <n-table-column-v3 title="Age" field="age" tip="The people's age" />
    <n-table-column-v3 title="Location" field="location" />
  </n-table-v3>
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
