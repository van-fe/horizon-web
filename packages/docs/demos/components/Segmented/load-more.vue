<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const options = ref(['Overview', 'Activity']);
const active = ref('Overview');
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function loadMore() {
  if (loading.value || options.value.length > 2) return;
  loading.value = true;
  timer = setTimeout(() => {
    options.value.push('Analytics', 'Automations');
    loading.value = false;
  }, 500);
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__actions">
      <h-button :loading="loading" :disabled="options.length > 2" @click="loadMore">
        Load more
      </h-button>
    </div>
    <h-segmented v-model:active-key="active" scrollable arrow>
      <h-segmented-item v-for="option in options" :key="option" :label="option" />
    </h-segmented>
  </section>
</template>
