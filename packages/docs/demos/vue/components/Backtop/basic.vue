<template>
  <section class="backtop-basic-demo">
    <span class="backtop-basic-demo__status" aria-live="polite">{{ status }}</span>
    <h-backtop :visibility-height="160" @click="status = 'Returned to the top of the page'" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref('The action is hidden until the page is scrolled');
</script>

<style scoped>
.backtop-basic-demo {
  display: flex;
  color: var(--h-text-secondary);
}

.backtop-basic-demo__status {
  padding: var(--h-spacing-2) var(--h-spacing-3);
  border-radius: var(--h-radius-pill);
  background: var(--h-bg-secondary);
  font-size: var(--h-text-sm);
}
</style>
