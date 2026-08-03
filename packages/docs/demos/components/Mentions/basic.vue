<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'design', label: 'Design team' },
];
</script>
<template><h-mentions v-model="value" :options="options" placeholder="输入 @ 提及成员" /></template>
