<template>
  <h-time-select
    v-model="value"
    start="00:00"
    step="00:30"
    end="23:59"
    format="hh:mm A"
    include-end-time
    placeholder="Select time"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<string>();
</script>
