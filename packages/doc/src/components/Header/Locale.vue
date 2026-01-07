<script lang="ts" setup>
import { inject } from 'vue';
import { defaultLocale, localeInjectKey } from '@aurora/horizon-web';
import { LocaleSupportLang } from '@aurora/locale-vue';

const locale = inject(localeInjectKey, defaultLocale);
</script>

<template>
  <h-tooltip content="仅切换组件内的语言">
    <h-select v-model="locale.current" size="small" class="mr-2">
      <h-option v-for="[key, value] of Object.entries(LocaleSupportLang)" :key="key" :value="value" :label="key" />
    </h-select>
  </h-tooltip>
</template>
