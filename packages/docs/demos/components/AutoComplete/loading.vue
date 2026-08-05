<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { HAutoCompleteOption } from '@aurora/horizon-web';

const catalog = ['Customer dashboard', 'Campaign report', 'Design system', 'Mobile release'];
const options = ref<HAutoCompleteOption[]>([]);
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function search(query: string | null | undefined) {
  if (timer) clearTimeout(timer);
  const keyword = query?.trim().toLowerCase() ?? '';
  if (!keyword) {
    options.value = [];
    loading.value = false;
    return;
  }

  loading.value = true;
  options.value = [];
  timer = setTimeout(() => {
    options.value = catalog
      .filter(item => item.toLowerCase().includes(keyword))
      .map((label, index) => ({ label, value: `result-${index + 1}` }));
    loading.value = false;
  }, 600);
}

onBeforeUnmount(() => timer && clearTimeout(timer));
</script>

<template>
  <h-auto-complete
    :options="options"
    :loading="loading"
    loading-text="正在检索工作区…"
    placeholder="输入 design 或 mobile"
    search-icon="search"
    @search="search"
  />
</template>
