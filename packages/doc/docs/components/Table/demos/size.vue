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
  <h-table-v3 :data="data" :size="size">
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Age" field="age" />
    <h-table-column-v3 title="Address" field="address" />
  </h-table-v3>
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
