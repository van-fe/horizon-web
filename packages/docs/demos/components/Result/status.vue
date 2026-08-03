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
  { type: '403', title: 'Access restricted', subtitle: 'Ask a workspace owner for permission.' },
  { type: '404', title: 'Page not found', subtitle: 'The link may be outdated or moved.' },
  { type: '500', title: 'Service unavailable', subtitle: 'Try again in a few minutes.' },
] as const;

const activeType = ref<(typeof items)[number]['type']>('403');
const activeItem = computed(() => items.find(item => item.type === activeType.value) ?? items[0]);
</script>
