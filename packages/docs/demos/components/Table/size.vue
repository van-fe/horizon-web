<template>
  <h-form label-position="left">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="mini"></h-radio>
        <h-radio label="small"></h-radio>
        <h-radio label="medium"></h-radio>
        <h-radio label="large"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-table :data="data" :size="size">
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

const size = ref('medium');

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
</script>
