<template>
  <h-row>
    <h-col :span="6">
      <h-modal-time-picker v-model="value" readonly />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('20:30');
</script>
