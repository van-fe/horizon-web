<script setup lang="ts">
import { ref } from 'vue';

const value = ref('10:30');
</script>

<template>
  <h-time-select
    v-model="value"
    start="08:30"
    step="00:15"
    end="18:30"
    :to-body="false"
    placeholder="选择时间"
  />
</template>
