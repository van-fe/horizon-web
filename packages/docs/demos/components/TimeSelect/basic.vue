<template>
  <h-time-select
    v-model="value"
    start="08:30"
    step="00:15"
    end="18:30"
    placeholder="请选择时间"
    style="width: 240px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<string>();
</script>
