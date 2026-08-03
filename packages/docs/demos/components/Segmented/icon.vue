<script setup lang="ts">
import { ref } from 'vue';

const active = ref('board');
</script>

<template>
  <h-segmented v-model:active-key="active">
    <h-segmented-item key="board" label="Board" icon="layout" />
    <h-segmented-item key="list" icon="list">
      <template #default><h-badge type="num" :content="4">List</h-badge></template>
    </h-segmented-item>
    <h-segmented-item key="calendar" label="Calendar" icon="calendar" />
  </h-segmented>
</template>
