<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOption } from '@aurora/horizon-web';

const position = ref<'right' | 'bottom'>('right');
const value = ref('');
const options: HAutoCompleteOption[] = [
  { label: 'Northstar Roadmap', value: 'roadmap', description: 'Updated today' },
  { label: 'Northstar Research', value: 'research', description: '12 documents' },
  { label: 'Northstar Launch Plan', value: 'launch', description: '8 collaborators' },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="position" size="small">
        <h-segmented-item value="right" label="Right" />
        <h-segmented-item value="bottom" label="Bottom" />
      </h-segmented>
    </div>

    <h-auto-complete
      v-model="value"
      :options="options"
      :description-position="position"
      placeholder="搜索项目"
      search-icon="search"
    />
  </section>
</template>
