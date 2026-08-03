<template>
  <h-table :data="data" :border="true">
    <h-table-column title="Name" field="name" />
    <h-table-column title="Age" field="age" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TableData {
  name: string;
  age: number;
  address: string;
}

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
</script>
