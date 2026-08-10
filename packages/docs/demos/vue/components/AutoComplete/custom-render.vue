<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOption } from '@aurora/horizon-web';

const value = ref('');
const options: HAutoCompleteOption[] = [
  { label: 'Mia Chen', value: 'mia.chen', description: 'Design Systems' },
  { label: 'Leo Wang', value: 'leo.wang', description: 'Web Platform' },
  { label: 'Nora Lin', value: 'nora.lin', description: 'Product Operations' },
];
</script>

<template>
  <h-auto-complete v-model="value" :options="options" placeholder="搜索协作者">
    <template #panelHeaderRender>
      <div class="panel-row">
        <strong>推荐协作者</strong>
        <span>{{ options.length }} 位</span>
      </div>
    </template>
    <template #panelFooterRender>
      <div class="panel-row">
        <span>↑ ↓ 选择</span>
        <span>Enter 确认</span>
      </div>
    </template>
  </h-auto-complete>
</template>

<style scoped>
.panel-row {
  display: flex;
  justify-content: space-between;
  gap: var(--h-spacing-4);
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
