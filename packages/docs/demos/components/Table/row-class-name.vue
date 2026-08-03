<template>
  <h-table :data="data" :row-class-name="rowClassNameSet">
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
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);

function rowClassNameSet(row: TableData) {
  if (row.age >= 25) {
    return 'bg-weak-success';
  }
  
  if (row.age < 18) {
    return 'bg-weak-error';
  }
}
</script>

<style>
.bg-weak-success {
  background: var(--h-bg-success-weak-activated);
}

.bg-weak-error {
  background: var(--h-bg-error-weak-activated);
}
</style>