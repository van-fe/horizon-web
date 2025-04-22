<script setup lang="ts">
import { inject } from 'vue';
import { localeInjectKey, defaultLocale } from '@nio-fe/lego';

const locale = inject(localeInjectKey, defaultLocale);
</script>

<template>
  <p>now: {{ td().lego.datePicker.now }}</p>
  <p>cancel: {{ locale?.langService.td().lego.colorPicker.cancel }}</p>
</template>
