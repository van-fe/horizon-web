<template>
  <n-application :locale="locale!.current">
    <n-form label-position="left">
      <n-form-item label="current language">
        <n-select v-model="locale!.current" size="small" style="width: 120px; display: inline-block">
          <n-option v-for="item of LocaleSupportLang" :key="item" :value="item" :label="item" />
        </n-select>
      </n-form-item>
    </n-form>
    <p style="margin-top: 20px;">
      {{ td().horizon-web.datePicker.now }}
    </p>
    <p>
      {{ td().horizon-web.datePicker.today }}
    </p>
  </n-application>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { LocaleSupportLang } from '@aurora/locale-vue';
import { localeInjectKey, defaultLocale } from '@aurora/horizon-web';

const locale = inject(localeInjectKey, defaultLocale);
</script>
