<template>
<h-table-v3 :data="data" height="300">
    <h-table-column-v3 title="ID" field="id" />
    <h-table-column-v3 title="Name" field="name" />
    <h-table-column-v3 title="Gender" field="gender" />
    <h-table-column-v3 title="Birthday" field="birthday" />
    <h-table-column-v3 title="Address" field="address" />
  </h-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([]);
</script>
