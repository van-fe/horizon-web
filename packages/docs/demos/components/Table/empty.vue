<template>
<h-table :data="data" height="300">
    <h-table-column title="ID" field="id" />
    <h-table-column title="Name" field="name" />
    <h-table-column title="Gender" field="gender" />
    <h-table-column title="Birthday" field="birthday" />
    <h-table-column title="Address" field="address" />
  </h-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([]);
</script>
