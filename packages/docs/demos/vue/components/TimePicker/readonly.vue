<script setup lang="ts">
import { ref } from 'vue';

const freezeTime = ref('20:30');
</script>

<template>
  <label class="time-picker-readonly-demo">
    <span>已审批时间</span>
    <h-time-picker
      v-model="freezeTime"
      value-format="HH:mm"
      readonly
      :to-body="false"
      aria-label="已审批时间"
    />
    <small>只读，不可修改</small>
  </label>
</template>

<style scoped>
.time-picker-readonly-demo {
  display: grid;
  gap: var(--h-spacing-2);
  max-inline-size: 420px;
}

.time-picker-readonly-demo > span,
.time-picker-readonly-demo > small {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
