<script setup lang="ts">
import { ref } from 'vue';

const startTime = ref('09:30');
const endTime = ref('11:00');
</script>

<template>
  <div class="time-range">
    <h-time-select
      v-model="startTime"
      :max-time="endTime"
      start="08:30"
      step="00:15"
      end="18:30"
      :to-body="false"
      placeholder="开始时间"
    />
    <span>–</span>
    <h-time-select
      v-model="endTime"
      :min-time="startTime"
      start="08:30"
      step="00:15"
      end="18:30"
      :to-body="false"
      placeholder="结束时间"
    />
  </div>
</template>

<style scoped>
.time-range {
  display: flex;
  align-items: center;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
