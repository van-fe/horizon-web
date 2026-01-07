<template>
  <h-application :locale="locale!.current">
    <h-form label-position="left">
      <h-form-item label="current language">
        <h-select v-model="locale!.current" size="small" style="width: 120px; display: inline-block">
          <h-option v-for="item of LocaleSupportLang" :key="item" :value="item" :label="item" />
        </h-select>
      </h-form-item>
    </h-form>
    <p style="margih-top: 20px;">
      {{ td()['horizon-web'].datePicker.now }}
    </p>
    <p>
      {{ td()['horizon-web'].datePicker.today }}
    </p>
  </h-application>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { LocaleSupportLang } from '@aurora/locale-vue';
import { localeInjectKey, defaultLocale } from '@aurora/horizon-web';

const locale = inject(localeInjectKey, defaultLocale);
</script>
