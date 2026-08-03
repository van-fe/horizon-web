<script setup lang="ts">
import { ref } from 'vue';

const locales = [
  { value: 'zh-CN', label: '简体中文', short: 'ZH' },
  { value: 'en-US', label: 'English (US)', short: 'EN' },
  { value: 'ja-JP', label: '日本語', short: 'JA' },
  { value: 'de-DE', label: 'Deutsch', short: 'DE' },
];
const selected = ref<string[]>(['zh-CN', 'en-US']);
</script>

<template>
  <div class="select-demo">
    <h-select v-model="selected" multiple collapse-tags collapse-tags-tooltip :to-body="false">
      <h-option
        v-for="locale in locales"
        :key="locale.value"
        :value="locale.value"
        :label="locale.label"
        :short="locale.short"
      />
      <template #tagRender="props">
        <h-tag type="info" plain :clickable="false">{{ props?.short || props?.label }}</h-tag>
      </template>
    </h-select>
    <p class="docs-demo__status">已启用 {{ selected.length }} 种语言</p>
  </div>
</template>

<style scoped>
.select-demo {
  display: grid;
  min-width: 0;
  gap: 10px;
}

.select-demo :deep(.h-select) {
  width: 100%;
  min-width: 0;
}
</style>
