<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function sync() {
  if (loading.value) return;
  loading.value = true;
  timer = setTimeout(() => (loading.value = false), 700);
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button size="small" :loading="loading" @click="sync">Sync</h-button>
    </div>
    <div class="tag-row">
      <h-tag :loading="loading" :clickable="false">Development</h-tag>
      <h-tag :loading="loading" type="warning" :clickable="false">Staging</h-tag>
      <h-tag :loading="loading" type="success" :clickable="false">Production</h-tag>
    </div>
  </section>
</template>

<style scoped>
.tag-row {
  display: flex;
  gap: var(--h-spacing-3);
  flex-wrap: wrap;
}
</style>
