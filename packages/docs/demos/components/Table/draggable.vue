<template>
  <h-table v-model:data="data" row-key="id">
    <h-table-column type="drag" width="44" />
    <h-table-column title="ID" field="id" width="80" draggable />
    <h-table-column title="Name" field="name" draggable />
    <h-table-column title="Role" field="role" draggable />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { id: 1, name: 'Alice', role: 'Designer' },
  { id: 2, name: 'Bob', role: 'Engineer' },
  { id: 3, name: 'Carol', role: 'Product manager' },
]);
</script>
