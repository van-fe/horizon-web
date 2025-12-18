<script lang="ts" setup>
import { inject } from 'vue';
import { defaultLocale, localeInjectKey } from '@aurora/horizon-web';
import { LocaleSupportLang } from '@aurora/locale-vue';

const locale = inject(localeInjectKey, defaultLocale);
</script>

<template>
  <n-tooltip content="仅切换组件内的语言">
    <n-select v-model="locale.current" size="small" class="mr-2">
      <n-option v-for="[key, value] of Object.entries(LocaleSupportLang)" :key="key" :value="value" :label="key" />
    </n-select>
  </n-tooltip>
</template>
