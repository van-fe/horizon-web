<script setup lang="ts">
import { ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

interface DatePickerInstance {
  confirmHandle: () => void;
}

type NowMode = 'built-in' | 'custom';

const mode = ref<NowMode>('built-in');
const value = ref();
const pickerRef = ref<DatePickerInstance>();

function chooseTomorrow() {
  value.value = dayjs().add(1, 'day').second(0);
  pickerRef.value?.confirmHandle();
}
</script>

<template>
  <section class="date-picker-show-now">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item key="built-in" label="Current time" />
      <h-segmented-item key="custom" label="Tomorrow" />
    </h-segmented>
    <h-date-picker
      ref="pickerRef"
      v-model="value"
      type="date-seconds"
      :show-now="mode === 'built-in'"
      need-confirm
    >
      <template v-if="mode === 'custom'" #showNow>
        <h-button size="small" plain @click="chooseTomorrow">Choose tomorrow</h-button>
      </template>
    </h-date-picker>
  </section>
</template>

<style scoped>
.date-picker-show-now {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-show-now :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-show-now {
    inline-size: 100%;
  }
}
</style>
