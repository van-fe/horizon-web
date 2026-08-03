<script setup lang="ts">
import { ref } from 'vue';

const active = ref('August');
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
</script>

<template>
  <h-segmented v-model:active-key="active" scrollable arrow focusable>
    <h-segmented-item v-for="month in months" :key="month" :label="month" />
  </h-segmented>
</template>
