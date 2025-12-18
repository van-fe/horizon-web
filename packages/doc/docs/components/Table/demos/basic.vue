<template>
  <n-table-v3 :data="data">
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Age" field="age" />
    <n-table-column-v3 title="Address" field="address" />
  </n-table-v3>
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
