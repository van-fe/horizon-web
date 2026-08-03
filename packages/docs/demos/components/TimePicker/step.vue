<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const type = ref<'time' | 'minutes' | 'seconds'>('time');
const value = ref('10:00');
const valueFormat = computed(() => (type.value === 'seconds' ? 'HH:mm:ss' : 'HH:mm'));

watch(type, nextType => {
  value.value = nextType === 'seconds' ? '10:20:30' : '10:00';
});
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="type" size="small">
        <h-segmented-item key="time" label="30 min" />
        <h-segmented-item key="minutes" label="3 h / 5 min" />
        <h-segmented-item key="seconds" label="3 h / 5 min / 10 s" />
      </h-segmented>
    </div>

    <h-time-picker
      v-model="value"
      :type="type"
      :value-format="valueFormat"
      :time-step="30"
      :hour-step="3"
      :minute-step="5"
      :second-step="10"
      :clearable="false"
      :to-body="false"
    />
    <p class="docs-demo__status">{{ value }}</p>
  </section>
</template>
