<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import type { GuideItemProps } from '@aurora/horizon-web';

const filterRef = shallowRef<HTMLElement | null>(null);
const shareRef = shallowRef<HTMLElement | null>(null);
const itemList = ref<GuideItemProps[]>([]);
const visible = ref(false);
const status = ref('Ready to start');

onMounted(() => {
  itemList.value = [
    {
      target: filterRef,
      title: 'Choose filters',
      content: 'Focus the report on the customers and period that matter.',
    },
    {
      target: '.guide-preview',
      title: 'Preview the report',
      content: 'Review the result before sharing it.',
      placement: 'top-start',
    },
    {
      target: shareRef,
      title: 'Share with the team',
      content: 'Publish a stable link when the report is ready.',
      placement: 'right-start',
    },
  ];
});
</script>

<template>
  <section class="guide-demo">
    <div class="guide-actions">
      <h-button ref="filterRef" type="normal">Choose filters</h-button>
      <h-button class="guide-preview" type="normal">Preview report</h-button>
      <h-button ref="shareRef" type="normal">Share report</h-button>
      <h-button @click="visible = true">Start tour</h-button>
    </div>
    <output aria-live="polite">{{ status }}</output>

    <h-guide
      v-model:visible="visible"
      :item-list="itemList"
      @close="status = 'Tour skipped'"
      @finish="status = 'Tour completed'"
    />
  </section>
</template>

<style scoped>
.guide-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

.guide-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

output {
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .guide-actions {
    gap: 8px;
  }
}
</style>
