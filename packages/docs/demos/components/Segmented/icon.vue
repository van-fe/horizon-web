<script setup lang="ts">
import { ref } from 'vue';

const active = ref('board');
</script>

<template>
  <h-segmented v-model:active-key="active">
    <h-segmented-item value="board" label="Board" icon="layout" />
    <h-segmented-item value="list" icon="list">
      <template #default><h-badge type="num" :content="4">List</h-badge></template>
    </h-segmented-item>
    <h-segmented-item value="calendar" label="Calendar" icon="calendar" />
  </h-segmented>
</template>
