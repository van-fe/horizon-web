<template>
  <h-space>
    <h-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:30"
      step="00:15"
      end="18:30"
      style="width: 240px"
    />
    <h-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:30"
      step="00:15"
      end="18:30"
      style="width: 240px"
    />
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const startTime = ref<string>();
const endTime = ref<string>();
</script>
