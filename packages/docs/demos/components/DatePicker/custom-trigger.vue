<script setup lang="ts">
import { computed, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

const publishAt = ref(dayjs().add(1, 'day').hour(9).minute(30));
const label = computed(() => `Publish · ${publishAt.value.format('MMM D, HH:mm')}`);
</script>

<template>
  <section class="date-picker-demo">
    <h-date-picker v-model="publishAt" type="datetime" show-now>
      <template #pickerOuter>
        <h-button plain icon="calendar">{{ label }}</h-button>
      </template>
    </h-date-picker>
  </section>
</template>

<style scoped>
.date-picker-demo {
  max-inline-size: 680px;
}

@media (max-width: 390px) {
  .date-picker-demo {
    inline-size: 100%;
  }
}
</style>
