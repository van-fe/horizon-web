<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="activeType" size="small">
        <h-segmented-item v-for="item in items" :key="item.type" :label="item.type" />
      </h-segmented>
    </div>
    <h-result
      :title="activeItem.title"
      :subtitle="activeItem.subtitle"
      :type="activeItem.type"
      size="small"
      :primary-button="false"
      :secondary-button="false"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const items = [
  { type: 'success', title: 'Import complete', subtitle: '248 customer records are ready.' },
  { type: 'info', title: 'Review scheduled', subtitle: 'The request is queued for tomorrow.' },
  { type: 'warning', title: 'Two fields skipped', subtitle: 'Review the import mapping.' },
  { type: 'error', title: 'Import failed', subtitle: 'Correct the source file and retry.' },
] as const;

const activeType = ref<(typeof items)[number]['type']>('success');
const activeItem = computed(() => items.find(item => item.type === activeType.value) ?? items[0]);
</script>
