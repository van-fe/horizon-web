<template>
<n-table-v3 :data="data" height="300">
    <n-table-column-v3 title="ID" field="id" />
    <n-table-column-v3 title="Name" field="name" />
    <n-table-column-v3 title="Gender" field="gender" />
    <n-table-column-v3 title="Birthday" field="birthday" />
    <n-table-column-v3 title="Address" field="address" />
  </n-table-v3>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([]);
</script>
