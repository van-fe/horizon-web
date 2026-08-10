<script setup lang="ts">
import { ref } from 'vue';

const checkInTime = ref('09:30');
const maintenanceWindow = ref<[string, string]>(['14:00', '16:30']);
</script>

<template>
  <section class="time-picker-time-demo">
    <label>
      <span>单值</span>
      <h-time-picker
        v-model="checkInTime"
        type="time"
        value-format="HH:mm"
        :clearable="false"
        :to-body="false"
        aria-label="单列单值时间"
      />
    </label>
    <label>
      <span>范围</span>
      <h-time-picker
        v-model="maintenanceWindow"
        type="time"
        value-format="HH:mm"
        is-range
        :clearable="false"
        :to-body="false"
        aria-label="单列时间范围"
      />
    </label>
  </section>
</template>

<style scoped>
.time-picker-time-demo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--h-spacing-4);
}

.time-picker-time-demo label {
  display: grid;
  gap: var(--h-spacing-2);
  min-inline-size: 0;
}

.time-picker-time-demo span {
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}

@media (max-width: 390px) {
  .time-picker-time-demo {
    grid-template-columns: 1fr;
  }
}
</style>
