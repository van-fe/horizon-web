<script setup lang="ts">
import { computed, ref } from 'vue';

type ReserveMode = boolean | 'reserve-deselect' | 'reserve-special';

const modes = ['true', 'false', 'reserve-deselect', 'reserve-special'] as const;
const activeMode = ref<(typeof modes)[number]>('true');
const selected = ref<string[]>(['prod-cn']);
const query = ref('');
const reserveKeyword = computed<ReserveMode>(() => {
  if (activeMode.value === 'true') return true;
  if (activeMode.value === 'false') return false;
  return activeMode.value;
});
const environments = [
  { value: 'prod-cn', label: 'Production CN' },
  { value: 'prod-eu', label: 'Production EU' },
  { value: 'stage-cn', label: 'Staging CN' },
  { value: 'test-ap', label: 'Testing APAC' },
];
</script>

<template>
  <div class="select-demo">
    <label class="mode-control">
      <span>关键词策略</span>
      <h-select v-model="activeMode" size="small" :to-body="false">
        <h-option v-for="mode in modes" :key="mode" :value="mode" :label="mode" />
      </h-select>
    </label>
    <h-select
      v-model="selected"
      multiple
      filterable
      collapse-tags
      :reserve-keyword="reserveKeyword"
      :to-body="false"
      placeholder="输入 prod"
      @input="query = $event"
    >
      <h-option v-for="item in environments" :key="item.value" v-bind="item" />
    </h-select>
    <p class="docs-demo__status">输入：{{ query || '空' }} · 已选 {{ selected.length }} 项</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 12px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}

.mode-control {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.mode-control > span {
  color: var(--h-text-secondary);
  font-size: 12px;
}
</style>
