<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { workspaceOptions } from './options';

interface CascaderInputMethods {
  inputChange: (value: string | null) => void;
}

const cascaderRef = ref<CascaderInputMethods | null>(null);
const value = ref<string[]>(['product', 'design-system', 'components']);
const keyword = ref('');
const selectedLabel = computed(() =>
  value.value.length
    ? `Scope · ${value.value.at(-1)?.replaceAll('-', ' ')}`
    : 'Choose release scope',
);

watch(keyword, nextKeyword => cascaderRef.value?.inputChange(nextKeyword || null));
</script>

<template>
  <h-cascader ref="cascaderRef" v-model="value" :options="workspaceOptions" filter :to-body="false">
    <template #default="{ visible }">
      <div class="custom-trigger">
        <h-button type="normal" @click="visible.value = true">{{ selectedLabel }}</h-button>
        <h-input
          v-model="keyword"
          aria-label="Search release scope"
          placeholder="Filter teams"
          clearable
        />
      </div>
    </template>
  </h-cascader>
</template>

<style scoped>
.custom-trigger {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--h-spacing-2);
  width: 100%;
}

@media (max-width: 390px) {
  .custom-trigger {
    grid-template-columns: 1fr;
  }
}
</style>
