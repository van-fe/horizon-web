<script setup lang="ts">
import { computed, ref } from 'vue';
import { dayjs } from '@aurora/horizon-web';

type PanelMode = 'linked' | 'independent' | 'single';

const mode = ref<PanelMode>('linked');
const value = ref([dayjs().add(1, 'day'), dayjs().add(6, 'day')]);
const singlePanel = computed(() => mode.value === 'single');
const linkPanels = computed(() => mode.value !== 'independent');
</script>

<template>
  <section class="date-picker-single-trigger">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item key="linked" label="Linked panels" />
      <h-segmented-item key="independent" label="Independent" />
      <h-segmented-item key="single" label="Single panel" />
    </h-segmented>
    <h-date-picker
      v-model="value"
      type="date-range"
      single-trigger
      :single-panel="singlePanel"
      :is-link-panels="linkPanels"
    />
  </section>
</template>

<style scoped>
.date-picker-single-trigger {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
  max-inline-size: 680px;
}

.date-picker-single-trigger :deep(.h-date-picker) {
  inline-size: 100%;
}

@media (max-width: 390px) {
  .date-picker-single-trigger {
    inline-size: 100%;
  }
}
</style>
