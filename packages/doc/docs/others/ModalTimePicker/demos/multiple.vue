<template>
  <h-row>
    <h-col :span="6">
      <h-modal-time-picker v-model="value" type="time" :multiple="true" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
</script>
