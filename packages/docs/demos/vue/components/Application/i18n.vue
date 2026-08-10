<script setup lang="ts">
import { ref } from 'vue';
import { LocaleSupportLang } from '@aurora/locale-vue';

const currentLocale = ref<LocaleSupportLang>(LocaleSupportLang.ZhCN);
const deadline = ref();
const localeOptions = [
  { label: '简体中文', value: LocaleSupportLang.ZhCN },
  { label: 'English', value: LocaleSupportLang.En },
  { label: 'Deutsch', value: LocaleSupportLang.DE },
];
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Locale</span>
        <h-select v-model="currentLocale" aria-label="界面语言" :to-body="false">
          <h-option
            v-for="option in localeOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </h-select>
      </label>
    </div>

    <h-application :locale="currentLocale">
      <div class="application-fields">
        <h-date-picker v-model="deadline" type="date" />
        <h-button>Confirm</h-button>
      </div>
    </h-application>
  </section>
</template>

<style scoped>
.application-fields {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}
</style>
