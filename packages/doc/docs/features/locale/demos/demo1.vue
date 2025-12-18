<script setup lang="ts">
import { inject } from 'vue';
import { localeInjectKey, defaultLocale } from '@aurora/horizon-web';

const locale = inject(localeInjectKey, defaultLocale);
</script>

<template>
  <p>now: {{ td().horizon-web.datePicker.now }}</p>
  <p>cancel: {{ locale?.langService.td().horizon-web.colorPicker.cancel }}</p>
</template>
