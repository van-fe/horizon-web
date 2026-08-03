<script setup lang="ts">
import { ref } from 'vue';

const value = ref(75);
</script>

<template>
  <h-slider
    v-model="value"
    input-enable
    :min="5"
    :max="200"
    :step="5"
    :input-props="{ controls: true, precision: 0 }"
    :tooltip-formatter="item => `${item} seats`"
  />
</template>
