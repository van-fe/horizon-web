<script setup lang="ts">
import { ref } from 'vue';
import type { HAutoCompleteOption } from '@aurora/horizon-web';

const value = ref('');
const allOptions: HAutoCompleteOption[] = [
  { label: '上海虹桥国际机场', value: 'SHA', description: '上海 · SHA' },
  { label: '上海浦东国际机场', value: 'PVG', description: '上海 · PVG' },
  { label: '北京首都国际机场', value: 'PEK', description: '北京 · PEK' },
  { label: '深圳宝安国际机场', value: 'SZX', description: '深圳 · SZX' },
];
const options = ref(allOptions);

function search(query: string | null | undefined) {
  const keyword = query?.trim().toLowerCase() ?? '';
  options.value = keyword
    ? allOptions.filter(option => `${option.label} ${option.value}`.toLowerCase().includes(keyword))
    : allOptions;
}
</script>

<template>
  <h-auto-complete
    v-model="value"
    :options="options"
    placeholder="输入城市或机场代码"
    search-icon="search"
    clearable
    @search="search"
  />
</template>
