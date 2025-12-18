<template>
  <n-form label-position="left">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="mini"></n-radio>
        <n-radio label="small"></n-radio>
        <n-radio label="medium"></n-radio>
        <n-radio label="large"></n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-table-v3 :data="data" :size="size">
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

const size = ref('medium');

const data = ref<TableData[]>([
  {name: 'Jon', age: 32, address: 'Shanghai'},
  {name: 'Jacob', age: 16, address: 'Shenzhen'},
  {name: 'Wang', age: 22, address: 'Hangzhou'},
  {name: 'Alice', age: 26, address: 'Beijing'},
]);
</script>
